import { useSession } from "next-auth/react"
import { database } from "../firebaseConfig"
import { collection, addDoc, getDocs } from "firebase/firestore"
import styles from "/styles/Notes.module.css"
import { useState, useEffect } from "react"
import Navbar from "./navbar"

export default function NotesPage() {
    const { data: session } = useSession()
    const dbInstance = collection(database, 'notes')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDesc, setNoteDesc] = useState('')
    const [note, setNote] = useState(false)
    const [notesList, setNotesList] = useState([])

    const saveNote = () => {
        addDoc(dbInstance, {
            id: session.user.email,
            user: session.user.name,
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesList(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }))
                console.log(notesList)
            })
    }

    useEffect(() => {
        getNotes();
    }, [])

    return <div className={styles.notesPageConatiner}>
        <Navbar note={note} setNote={setNote} />
        <div className={styles.notesPage}>
            {session && (<div>
                <h1> <span className={styles.helloText}>Hello, </span> {session.user.name.split(' ')[0]}</h1>

                {note && <div>
                    <div className={styles.noteTitleContainer}>
                        <input
                            className={styles.noteTitleInput}
                            placeholder='Enter the title...'
                            onChange={(e) => setNoteTitle(e.target.value)}
                        />
                    </div>


                    <div className={styles.noteDescContainer}>
                        <input
                            className={styles.noteDescInput}
                            placeholder='Enter your note..'
                            onChange={(e) => setNoteDesc(e.target.value)}
                            onKeyPress={(ev) => {
                                if (ev.key === "Enter") {
                                    ev.preventDefault();
                                    console.log(ev.target.value);
                                    saveNote();
                                }
                            }}
                        />
                    </div>
                </div>
                }

                <div className={styles.notesSection}>
                    {notesList.map((note) => {
                        return (
                            <div key={note.titleTitle} className={styles.noteCard} onKeyPress={(ev) => {
                                if (ev.key === "Enter") {
                                    ev.preventDefault();
                                    console.log(ev.target.value);
                                }
                            }}>
                                <h2>{note.noteTitle}</h2>
                                <p>{note.noteDesc}</p>
                            </div>
                        )
                    })}
                </div>


            </div>)}

        </div>
    </div>
}