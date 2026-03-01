// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "../auth.module.css";

export default function Login() {
    return (
        <main className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}></div>
                    <span>NetTwin AI</span>
                </div>

                <h1 className={styles.title}>Welcome back</h1>
                <p className={styles.subtitle}>Enter your credentials to access the NOC.</p>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" placeholder="name@company.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.labelRow}>
                            <label htmlFor="password">Password</label>
                            <Link href="/auth/forgot" className={styles.forgotLink}>Forgot password?</Link>
                        </div>
                        <input type="password" id="password" required />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Sign in</button>
                </form>

                <p className={styles.footerText}>
                    Don't have an account? <Link href="/auth/register">Sign up</Link>
                </p>
            </div>
        </main>
    );
}
