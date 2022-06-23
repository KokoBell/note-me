import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import GoogleProvider from "next-auth/providers/google";
import styles from '../styles/Home.module.css'
import { FaGoogle } from 'react-icons/fa'
import { FiLogIn } from 'react-icons/fi'

export default function Home() {

  return (
    <>
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
            <img
              src="/images/logo.png"
              height={60}
              width={290}
              alt={"NoteMe logo image"}>

            </img>
          </div>

          <div className={styles.googleButton}>

            <div>
              <button className={styles.joinWithGoogle} onClick={() => { signIn( "google" , { callbackUrl: "http://localhost:3000/notes" }) }}>
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
            <form onSubmit={() => { }} >
              <div className={styles.codeInput}>
                <label hidden />
                <input type="text" name="secretCode" id="secretCode" placeholder="Type your secret codename" />
              </div>


              <div className={styles.joinButton}>
                <Link href='/'>
                  <button className={styles.joinAnonymous} onClick={() => { console.log('Joining anonymously') }}>
                    <FiLogIn className={styles.FiLogIn} /> &nbsp;
                    Join anonymously
                  </button>
                </Link>
              </div>

            </form>
          </div>


        </div>

      </div>
    </>
  )
}

