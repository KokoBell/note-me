import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Note Me</title>
        <meta name="description" content="NoteMe app designed by " />
        <meta name="viewport" content="width=device-width, initial-scale="></meta>
        <link rel="icon" href="/favicon.ico" />
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
              height={65}
              width={297}
              alt={"NoteMe logo image"}>

            </Image>
          </div>

          <div className={styles.googleButton}>
            
          </div>

          <div className={styles.joinSection}>

          </div>

          <div className={styles.codeInput}>

          </div>

          <div className={styles.joinButton}>

          </div>

        </div>

      </div>
    </>
  )
}
