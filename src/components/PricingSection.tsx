// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "./PricingSection.module.css";

export default function PricingSection() {
    return (
        <section className={styles.pricingSection} id="pricing">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}>Fair Pricing</div>
                    <h2 className={styles.title}>Infrastructure intelligence that scales.</h2>
                    <p className={styles.subtitle}>
                        We charge based on the active scale of your digital twin, not arbitrary user seats. Predictable OPEX designed to fit your IT budget.
                    </p>
                </div>

                <div className={styles.pricingTableContainer}>
                    <div className={styles.pricingGrid}>
                        {/* Features Column (Hidden on mobile) */}
                        <div className={`${styles.column} ${styles.featureColumn}`}>
                            <div className={styles.cellHeader}></div>
                            <div className={styles.cellRow}>Maximum Base Stations</div>
                            <div className={styles.cellRow}>Simulation Resolution</div>
                            <div className={styles.cellRow}>AI Reasoner Requests</div>
                            <div className={styles.cellRow}>Energy Smart-Sleep</div>
                            <div className={styles.cellRow}>Autonomous Execution</div>
                            <div className={styles.cellRow}>Support Level</div>
                        </div>

                        {/* Plan 1: Pilot */}
                        <div className={styles.column}>
                            <div className={styles.cellHeader}>
                                <h3>Pilot</h3>
                                <div className={styles.price}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>499</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                                <p className={styles.planDesc}>For regional ISPs and municipal networks.</p>
                                <Link href="/auth/register" className={styles.planBtn}>Start Free Trial</Link>
                            </div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Max Base Stations:</span>Up to 100</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Simulation Resolution:</span>15-minute intervals</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>AI Reasoner Requests:</span>10,000 / mo</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Energy Smart-Sleep:</span><span className={styles.checkIcon}>✓</span></div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Autonomous Execution:</span><span className={styles.xIcon}>—</span></div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Support:</span>Community + Email</div>
                        </div>

                        {/* Plan 2: Regional Core */}
                        <div className={`${styles.column} ${styles.popularColumn}`}>
                            <div className={styles.popularBadge}>Most Popular</div>
                            <div className={styles.cellHeader}>
                                <h3>Regional Core</h3>
                                <div className={styles.price}>
                                    <span className={styles.currency}>$</span>
                                    <span className={styles.amount}>1,999</span>
                                    <span className={styles.period}>/mo</span>
                                </div>
                                <p className={styles.planDesc}>For national MVNOs and mid-size operators.</p>
                                <Link href="/auth/register" className={`${styles.planBtn} ${styles.primaryBtn}`}>Start Free Trial</Link>
                            </div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Max Base Stations:</span>Up to 1,000</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Simulation Resolution:</span>5-minute intervals</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>AI Reasoner Requests:</span>100,000 / mo</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Energy Smart-Sleep:</span><span className={styles.checkIcon}>✓</span></div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Autonomous Execution:</span><span className={styles.checkIcon}>✓</span></div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Support:</span>24/7 Priority SLA</div>
                        </div>

                        {/* Plan 3: Enterprise */}
                        <div className={styles.column}>
                            <div className={styles.cellHeader}>
                                <h3>Enterprise</h3>
                                <div className={styles.price}>
                                    <span className={styles.customPrice}>Custom</span>
                                </div>
                                <p className={styles.planDesc}>For Tier 1 global operators and critical infrastructure.</p>
                                <Link href="/contact" className={styles.planBtn}>Contact Sales</Link>
                            </div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Max Base Stations:</span>Unlimited</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Simulation Resolution:</span>Sub-second streaming</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>AI Reasoner Requests:</span>Unlimited / Dedicated</div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Energy Smart-Sleep:</span><span className={styles.checkIcon}>✓</span></div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Autonomous Execution:</span><span className={styles.checkIcon}>✓</span></div>
                            <div className={styles.cellRow}><span className={styles.mobileLabel}>Support:</span>Dedicated TAM + On-prem</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
