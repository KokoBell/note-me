import Link from "next/link"
import { FaHome, FaPlus } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import styles from '/styles/Navbar.module.css'


export default function Navbar() {

    return <div >
        <ul className={styles.Navigation}>
            <li className={styles.navItem}>
                <button className={styles.navButton}>
                    <FaHome />
                </button>
            </li>
            <li className={styles.navItem}>
                <button className={styles.navButton}>
                    <FaPlus />
                </button>

            </li>
            <li className={styles.navItem}>
                <button className={styles.navButton}>
                    <FiLogOut />
                </button>
            </li>
        </ul>
    </div>
}