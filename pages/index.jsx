import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react"
import styles from '../styles/Home.module.css'
import { FaGoogle } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'
import NotesPage from '../components/notes'
import SecretNotesPage from '../components/secretNotes'
import { useState, useRef } from 'react'
import { database } from "../firebaseConfig"
import { addDoc, collection } from 'firebase/firestore'

let updateOutside = false;

export default function Home() {
  const { data: session, status } = useSession()
  const [secretSession, setSecretSession] = useState('')
  const [secret, setSecret] = useState(false)

  if (status === "loading") {
    return <p>Signing in...</p>
  }

  function HomePage() {
    const dbInstance = collection(database, 'secretCodes')
    const inputRef = useRef(null)

    async function userSignIn() {
      await signIn('google', { callBackUrl: "/" })
    }

    return (<>
      <Head>
        <title>Note Me</title>
        <meta name="description" content="NoteMe app designed by " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/guy.png" />
      </Head>

      <div className={styles.container}>

        <div className={styles.leftSide}>

          <div className={styles.heroImage}>
            <Image
              src="/images/guy.png"
              height={211}
              width={260}
              alt={"Person relaxing while drinking coffee and using their laptop"}>
            </Image>
          </div>

          <div className={styles.textGroup}>

            <h1>
              Keep life simple
            </h1>

            <p>
              Store all your notes in a simple and <br /> intuitive app that helps you enjoy what <br /> is most important in life.
            </p>

          </div>

        </div>

        <div className={styles.rightSide}>

          <div className={styles.logoImage}>
            <Image
              src="/images/logo.png"
              height={60}
              width={290}
              alt={"NoteMe logo image"}>
            </Image>
          </div>

          <div className={styles.googleButton}>

            <div>
              <button className={styles.joinWithGoogle} onClick={() => userSignIn()}>
                <FaGoogle /> &nbsp;
                Join with Google
              </button>
            </div>

          </div>

          <div className={styles.joinSection}>
            <p>-------</p>
            &nbsp; &nbsp;
            <p>or join anonymously</p>
            &nbsp; &nbsp;
            <p>-------</p>
          </div>

          <div className={styles.anonymousSection}>
            <div className={styles.codeInput}>
              <label hidden />
              <input
                ref={inputRef}
                type="text"
                name="secretCode"
                id="secretCode"
                placeholder="Type your secret codename"
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault()
                    setSecretSession(inputRef.current.value)
                    setSecret(true)
                    addDoc(dbInstance, { "code": secretSession })
                  }
                }} />
            </div>


            <div className={styles.joinButton}>
              <button className={styles.joinAnonymous} onClick={(e) => {

                setSecretSession(inputRef.current.value)
                setSecret(true)
                addDoc(dbInstance, { "code": secretSession })
              }}
              >
                <FiLogIn className={styles.FiLogIn} /> &nbsp;
                Join anonymously
              </button>
            </div>
          </div>
        </div>
      </div>
    </>)
  }

  return (<>
    {session ? <NotesPage /> : (secret ? <SecretNotesPage secret={secret} code={secretSession} /> : <HomePage />)}
  </>
  )
}