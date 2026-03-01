// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "./page.module.css";
import FeaturesSection from "../components/FeaturesSection";
import Header from "../components/Header";

export default function Home() {
    return (
        <main className={styles.main}>
            <Header />

            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Autonomous Network<br />Intelligence</h1>
                    <p className={styles.description}>
                        Predict telecom congestion before it happens. An AI-powered digital twin
                        that simulates, analyzes, and automatically optimizes your network infrastructure using Mistral AI.
                    </p>
                    <div className={styles.heroActions}>
                        <Link href="/auth/register" className={styles.primaryBtn}>Start Free Trial</Link>
                        <Link href="#demo" className={styles.secondaryBtn}>View Live Demo</Link>
                    </div>
                </div>

                {/* Placeholder for animated network visualization */}
                <div className={styles.heroVisual}>
                    <div className={styles.mockDashboard}>
                        <div className={styles.mockHeader}>
                            <div className={styles.mockDots}>
                                <span></span><span></span><span></span>
                            </div>
                            <div className={styles.mockTabs}>
                                <div className={styles.mockTabActive}>Twin</div>
                                <div className={styles.mockTab}>AI Ops</div>
                            </div>
                        </div>
                        <div className={styles.mockBody}>
                            <div className={styles.mockSidebar}>
                                <div className={styles.mockNavLine}></div>
                                <div className={styles.mockNavLine}></div>
                                <div className={styles.mockNavLine}></div>
                                <div className={styles.mockNavLine}></div>
                            </div>
                            <div className={styles.mockContent}>
                                <div className={styles.mockMap}>
                                    {/* Mock Network Nodes */}
                                    <div className={`${styles.node} ${styles.n1}`}></div>
                                    <div className={`${styles.node} ${styles.n2}`}></div>
                                    <div className={`${styles.node} ${styles.n3}`}></div>
                                    <div className={`${styles.node} ${styles.n4} ${styles.nAlert}`}>
                                        <div className={styles.pulse}></div>
                                    </div>
                                    <div className={`${styles.node} ${styles.n5}`}></div>

                                    {/* Mock Connection Lines */}
                                    <svg className={styles.mockSvg}>
                                        <line x1="20%" y1="30%" x2="50%" y2="50%" className={styles.mockLine} />
                                        <line x1="80%" y1="20%" x2="50%" y2="50%" className={styles.mockLine} />
                                        <line x1="30%" y1="70%" x2="50%" y2="50%" className={styles.mockLine} />
                                        <line x1="70%" y1="80%" x2="50%" y2="50%" className={`${styles.mockLine} ${styles.lAlert}`} />
                                    </svg>
                                </div>
                                <div className={styles.mockMetrics}>
                                    <div className={styles.metricCard}>
                                        <div className={styles.mTitle}></div>
                                        <div className={styles.mValue}></div>
                                    </div>
                                    <div className={styles.metricCard}>
                                        <div className={styles.mTitle}></div>
                                        <div className={styles.mValue}></div>
                                    </div>
                                    <div className={styles.metricCard}>
                                        <div className={styles.mTitle}></div>
                                        <div className={styles.mValueAlert}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesSection />
        </main>
    );
}
