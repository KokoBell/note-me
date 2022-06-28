import { useSession } from "next-auth/react"
import { database } from "../firebaseConfig"
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, where, query } from "firebase/firestore"
import styles from "../styles/Notes.module.css"
import { useState, useEffect } from "react"
import Navbar from "../pages/navbar"
import Draggable from 'react-draggable'


export default function NotesPage() {
    const { data: session } = useSession()
    const dbInstance = collection(database, 'notes')
    const [noteDesc, setNoteDesc] = useState('')
    const [note, setNote] = useState(false)
    const [notesList, setNotesList] = useState([])
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y });
    }

    const saveNote = () => {
        if (noteDesc === "") {
            setNote(false)
            return
        }
        let currentNote = {
            email: session.user.email,
            user: session.user.name,
            noteDesc: noteDesc,
            createdAt: new Date().toDateString()
        }
        notesList.unshift(currentNote)
        setNotesList(notesList)
        addDoc(dbInstance, currentNote)
        setNoteDesc('')
        setNote(false)
    }

    const getNotes = async () => {
        const q = query(dbInstance, where("email", "==", session.user.email))
        const querySnapshot = await getDocs(q)

        let holder = []
        querySnapshot.forEach((doc) => {
                holder.unshift(doc.data())
            })
        setNotesList(holder)
    }

    const deleteNote = (docId) => {
        let noteRef = doc(database, 'notes', docId)
        deleteDoc(noteRef).then(() => {
            getNotes()
        })
    }

    const updateNote = (docId) => {
        let currentNote = {
            email: session.user.email,
            user: session.user.name,
            noteDesc: noteDesc,
            updated: new Date().toDateString()
        }
        let noteRef = doc(database, 'notes', docId)
        updateDoc(noteRef, currentNote).then(() => {
            getNotes()
        })
    }

    useEffect(() => {
        getNotes()
    }, [])

    return <div className={styles.notesPageConatiner}>
        <Navbar note={note} setNote={setNote} />
        <div className={styles.notesPage}>
            {session && (<div>
                <h1> <span className={styles.helloText}>Hello, </span> {session.user.name.split(' ')[0]}</h1>

                <div className={styles.notesSection}>

                    {note && <div className={styles.notetextareaSection}>
                        <div className={styles.noteDescContainer}>
                            <textarea
                                autoFocus={true}
                                onBlur={(ev) => {
                                    ev.preventDefault()
                                    saveNote()
                                }}
                                className={styles.noteCard}
                                onChange={(e) => setNoteDesc(e.target.value)}
                                onKeyPress={(ev) => {
                                    if (ev.key === "Enter") {
                                        ev.preventDefault()
                                        saveNote()
                                    }
                                }}

                            />
                        </div>
                    </div>
                    }

                    {notesList.map((noteItem) => {
                        return (<Draggable key={noteItem.noteDesc}
                            onDrag={(e, data) => trackPos(data)}
                            onStop={(e) => {

                            }}>
                            <div
                                onClick={() => {
                                }}
                                className={styles.noteCard}
                                onKeyPress={(ev) => {
                                    if (ev.key === "Enter") {
                                        ev.preventDefault()
                                        getNotes()
                                    }
                                }
                                }
                            >
                                <p className={styles.noteD}>{noteItem.noteDesc}</p>

                            </div>
                        </Draggable>/*  : <div key={noteItem.noteDesc} className={styles.notetextareaSection}>
                            <div className={styles.noteDescContainer}>
                                <textarea
                                    autoFocus={true}
                                    onBlur={(ev) => {
                                        ev.preventDefault()
                                        //saveNote()
                                    }}
                                    className={styles.noteCard}
                                    onChange={(e) => setNoteDesc(e.target.value)}
                                    onKeyPress={(ev) => {
                                        if (ev.key === "Enter") {
                                            ev.preventDefault()
                                            updateNote(noteItem.id)
                                        }
                                    }}

                                />
                            </div>
                        </div> */
                        )
                    })}
                </div>


            </div>)}

        </div>
    </div>
}