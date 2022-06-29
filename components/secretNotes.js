import { database } from "../firebaseConfig"
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, where, query } from "firebase/firestore"
import styles from "../styles/SecretNotes.module.css"
import { useState, useEffect } from "react"
import Navbar from "../pages/navbar"
import Draggable from 'react-draggable'

export default function SecretNotesPage({ secret, code }) {
    const dbInstance = collection(database, 'secretNotes')
    const [noteDesc, setNoteDesc] = useState('')
    const [note, setNote] = useState(false)
    const [page, setPage] = useState('home')
    const [notesList, setNotesList] = useState([])

    const saveNote = () => {
        if (noteDesc === "") {
            setNote(false)
            return
        }
        let currentNote = {
            code: code,
            noteDesc: noteDesc,
            createdAt: new Date().toDateString()
        }
        notesList.unshift(currentNote)
        setNotesList(notesList)
        addDoc(dbInstance, currentNote)
        setNoteDesc('')
        setNote(false)
        setPage('home')
    }

    const getNotes = async () => {
        const q = query(dbInstance, where("code", "==", code))
        const querySnapshot = await getDocs(q)

        let holder = []
        querySnapshot.forEach((doc) => {
            holder.unshift(doc.data())
        })
        setNotesList(holder)
    }

    const deleteNote = (docId) => {
        let noteRef = doc(database, 'secretNotes', docId)
        deleteDoc(noteRef).then(() => {
            getNotes()
        })
    }

    const updateNote = (docId) => {
        let currentNote = {
            code: code,
            noteDesc: noteDesc,
            updated: new Date().toDateString()
        }
        let noteRef = doc(database, 'secretNotes', docId)
        updateDoc(noteRef, currentNote).then(() => {
            getNotes()
        })
    }

    useEffect(() => {
        getNotes()
    }, [])

    return <div className={styles.notesPageConatiner}>
        <Navbar note={note} setNote={setNote} page={page} setPage={setPage} />
        <div className={styles.notesPage}>
            {secret && (<div>
                <h1> <span className={styles.helloText}>Codename: </span> {code} </h1>

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

                    {notesList.length != 0 ? notesList.map((noteItem) => {
                        return (<Draggable key={noteItem.noteDesc}
                            onDrag={(e, data) => { }}
                            onStop={(e) => { }}>
                            <div
                                onClick={() => { }}
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
                        </Draggable>
                        )
                    }) : <>
                        {!note && <div className={styles.noNotesCont}>
                            <p className={styles.noNotes}>You have no notes</p>
                            <button className={styles.addNote}
                                onClick={() => {
                                    setNote(true)
                                }}> Add a note </button>
                        </div>}
                    </>
                    }
                </div>
            </div>)}
        </div>
    </div>
}