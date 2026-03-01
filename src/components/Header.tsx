// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <div className={styles.logoIcon}></div>
                <span>NetTwin AI</span>
            </Link>
            <nav className={styles.nav}>
                <Link href="/about">About Us</Link>

                <Link href="/pricing">Pricing</Link>
                <Link href="/auth/login" className={styles.loginBtn}>Sign In</Link>
                <Link href="/auth/register" className={styles.ctaBtn}>Get Started</Link>
            </nav>
        </header>
    );
}
