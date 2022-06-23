import { FiLogOut } from "react-icons/fi"
import { useSession, signOut } from "next-auth/react"
import { database } from "../firebaseConfig"
import { collection, addDoc } from "firebase/firestore"
import styles from "/styles/Notes.module.css"
import { useState } from "react"
import Navbar from "./navbar"

export default function NotesPage() {
    const { data: session } = useSession()
    const dbInstance = collection(database, 'notes')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDesc, setNoteDesc] = useState('')
    const [note, setNote] = useState(false)

    const saveNote = () => {
        addDoc(dbInstance, {
            user: session.user.name,
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
    }

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
                            onPointerEnter={saveNote}
                        />
                    </div>
                </div>
                }


            </div>)}

        </div>
    </div>
}