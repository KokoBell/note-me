import { FaHome, FaPlus } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import styles from '/styles/Navbar.module.css'
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function Navbar({ note, setNote, page, setPage, setSecret }) {
    
    return <ul className={styles.Navigation}>
        <div className={styles.navLogo} onClick={() => {
            setNote(false)
            setPage('home')
        }}>
            <Image
                height={48}
                width={48}
                src="/icons/smallLogo.svg"
                alt="NoterWeb small logo"
            />
        </div>
        <div className={styles.miniNav}>
            <li className={styles.navItem}>
                <button
                    className={page === 'home' ? styles.navButtonActive : styles.navButton}
                    onClick={() => {
                        setNote(false)
                        setPage('home')
                    }}>
                    <FaHome />
                </button>
            </li>
            <li className={styles.navItem}>
                <button className={page === 'plus' && note ? styles.navButtonActive : styles.navButton} onClick={() => {
                    setPage('plus')
                    setNote(!note)
                    if(note){
                        setPage('home')
                    }
                }}>
                    <FaPlus />
                </button>
            </li>
        </div>
        <div className={styles.logoutButton}>
            <li className={styles.navItem}>
                <button className={styles.navButton} onClick={() => {
                    signOut({ callbackUrl: '/' })
                }}>
                    <FiLogOut />
                </button>
            </li>
        </div>
    </ul>
}