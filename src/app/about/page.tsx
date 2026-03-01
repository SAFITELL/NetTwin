// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "./about.module.css";
import Header from "../../components/Header";

export default function AboutPage() {
    return (
        <main className={styles.main}>
            {/* Standard Header Navigation */}
            <Header />

            <article className={styles.article}>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <div className={styles.badge}>About NetTwin</div>
                    <h1 className={styles.title}>The Autonomous Nervous System for Global Telecommunications.</h1>
                    <p className={styles.lead}>
                        Founded by Samuel M.K., NetTwin is building NetTwin AI to fundamentally shift how
                        telecom infrastructure operates—moving the industry from reactive maintenance
                        to predictive, AI-driven autonomy.
                    </p>
                </section>

                {/* The Core Problem */}
                <section className={styles.contentSection}>
                    <div className={styles.sectionGrid}>
                        <div className={styles.gridHeader}>
                            <h2>The Core Problem</h2>
                            <div className={styles.divider}></div>
                        </div>
                        <div className={styles.gridContent}>
                            <p className={styles.paragraph}>
                                Telecom networks are living organisms. Traffic surges during football matches,
                                mobile money transactions spike at month-end, and mass streaming floods cell towers at night.
                            </p>
                            <p className={styles.paragraph}>
                                Today, network optimization remains overwhelmingly reactive. Engineers respond <em>after</em> congestion happens.
                                This wait-and-see approach causes dropped calls, slower data speeds, packet loss, and immense energy waste.
                            </p>
                            <div className={styles.callout}>
                                <strong>The 5G Reality:</strong> As 5G expands and 6G approaches, network complexity grows exponentially.
                                Manual human tuning simply does not scale. Telecom operators require autonomous, predictive intelligence.
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Solution */}
                <section className={styles.contentSection}>
                    <div className={styles.sectionGrid}>
                        <div className={styles.gridHeader}>
                            <h2>Our Solution</h2>
                            <div className={styles.divider}></div>
                        </div>
                        <div className={styles.gridContent}>
                            <p className={styles.paragraph}>
                                NetTwin AI by NetTwin is a lightweight, AI-powered digital twin of a telecom network.
                                It combines real-time synthetic simulation with deep network intelligence to predict
                                and prevent failure before it impacts the end-user.
                            </p>
                            <ul className={styles.featureList}>
                                <li>
                                    <div className={styles.featureIcon}>1</div>
                                    <div>
                                        <strong>Synthetic Network Simulation</strong>
                                        <p>A digital replica creating virtual cell towers, tracing user traffic flows, and modeling historical load patterns to recreate the physical network state.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.featureIcon}>2</div>
                                    <div>
                                        <strong>AI Network Intelligence</strong>
                                        <p>Advanced machine reasoning layered on top of structural network metrics to output actionable load redistribution and power-saving strategies.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.featureIcon}>3</div>
                                    <div>
                                        <strong>Preventive Visualization</strong>
                                        <p>An interactive operations dashboard that flags congestion heatmaps and instantly surfaces recommended interventions for engineering review.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Why It Matters */}
                <section className={styles.contentSection}>
                    <div className={styles.sectionGrid}>
                        <div className={styles.gridHeader}>
                            <h2>Why This Matters</h2>
                            <div className={styles.divider}></div>
                        </div>
                        <div className={styles.gridContent}>
                            <p className={styles.paragraph}>
                                Telecom networks are the critical infrastructure of the modern era. In emerging markets specifically,
                                mobile money, education, and healthcare all depend entirely on absolute network stability.
                            </p>
                            <p className={styles.paragraph}>
                                Even a 5% improvement in congestion prevention translates directly to higher Quality of Service (QoS),
                                lowered operational costs, and vastly improved energy efficiency.
                            </p>
                            <p className={styles.paragraphHighlight}>
                                Autonomous networks are the future. NetTwin is leading the charge to demonstrate how
                                human-readable machine reasoning will become the standard for telecom control systems.
                            </p>
                        </div>
                    </div>
                </section>
            </article>

            <section className={styles.ctaSection}>
                <h2>Ready to transform your network?</h2>
                <div className={styles.actions}>
                    <Link href="/auth/register" className={styles.primaryBtn}>Start your free trial</Link>
                    <Link href="/contact" className={styles.secondaryBtn}>Contact Sales</Link>
                </div>
            </section>
        </main>
    );
}
