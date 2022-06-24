import { useSession } from "next-auth/react"
import { database } from "../firebaseConfig"
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"
import styles from "/styles/Notes.module.css"
import { useState, useEffect } from "react"
import Navbar from "./navbar"
import Draggable from 'react-draggable'

export default function NotesPage() {
    const { data: session } = useSession()
    const dbInstance = collection(database, 'notes')
    const [noteDesc, setNoteDesc] = useState('')
    const [note, setNote] = useState(false)
    const [notesList, setNotesList] = useState([])
    const [del, setDel] = useState(false)

    const saveNote = () => {
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

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesList(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }))
            })
    }

    const deleteNote = (docId) => {
        let noteRef = doc(database, 'notes', docId)
        deleteDoc(noteRef).then(() => {
            setDel(false)
            getNotes()
        })
    }

    useEffect(() => {
        getNotes()
    },[])

    return <div className={styles.notesPageConatiner}>
        <Navbar note={note} setNote={setNote} />
        <div className={styles.notesPage}>
            {session && (<div>
                <h1> <span className={styles.helloText}>Hello, </span> {session.user.name.split(' ')[0]}</h1>

                <div className={styles.notesSection}>

                    {note && <div className={styles.notetextareaSection}>
                        <div className={styles.noteDescContainer}>
                            <textarea
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
                        return (
                            <Draggable key={noteItem.noteDesc}>
                                <div
                                    onClick={() => {
                                        setDel(true)
                                        deleteNote(noteItem.id)
                                    }}
                                    className={del ? styles.del : styles.noteCard}
                                    onKeyPress={(ev) => {
                                        if (ev.key === "Enter") {
                                            ev.preventDefault()
                                            getNotes()
                                        }
                                    }
                                    }
                                >
                                    <p>{noteItem.noteDesc}</p>
                                </div>
                            </Draggable>
                        )
                    })}
                </div>


            </div>)}

        </div>
    </div>
}