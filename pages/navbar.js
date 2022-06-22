import Link from "next/link"
import { FaHome, FaPlus } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import styles from '/styles/Navbar.module.css'


export default function Navbar() {

    return <div >
        <ul className={styles.Navigation}>
            <li className={styles.navButton}>
                <FaHome />
            </li>
            <li className={styles.navButton}>

                <FaPlus />

            </li>
            <li className={styles.lastButton}>
                <FiLogOut />
            </li>
        </ul>
    </div>
}