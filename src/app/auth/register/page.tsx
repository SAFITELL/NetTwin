// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "../auth.module.css";

export default function Register() {
    return (
        <main className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}></div>
                    <span>NetTwin AI</span>
                </div>

                <h1 className={styles.title}>Create your account</h1>
                <p className={styles.subtitle}>Start optimizing your telecom network today.</p>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="orgName">Organization Name</label>
                        <input type="text" id="orgName" placeholder="e.g. Vodafone" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Work Email</label>
                        <input type="email" id="email" placeholder="name@company.com" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required />
                        <span className={styles.helpText}>Must be at least 8 characters.</span>
                    </div>

                    <p className={styles.legalDisclaimer}>
                        By creating an account, you agree to our <Link href="/legal/terms">Terms of Service</Link> and <Link href="/legal/privacy">Privacy Policy</Link>.
                    </p>

                    <button type="submit" className={styles.submitBtn}>Create account</button>
                </form>

                <p className={styles.footerText}>
                    Already have an account? <Link href="/auth/login">Sign in</Link>
                </p>
            </div>
        </main>
    );
}
