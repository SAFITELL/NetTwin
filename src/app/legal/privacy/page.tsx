// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "../legal.module.css";
import Header from "../../../components/Header";

export default function PrivacyPolicyPage() {
    return (
        <main className={styles.main}>
            {/* Minimal Header for Legal Pages */}
            <Header />

            <article className={styles.article}>
                <div className={styles.breadcrumb}>
                    <Link href="/">Home</Link> &gt; <span>Privacy Policy</span>
                </div>

                <div className={styles.documentHeader}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last Updated: March 1, 2026</p>
                </div>

                <div className={styles.documentContent}>
                    <p className={styles.lead}>
                        This Privacy Policy ("Policy") explains how NextTwin ("we," "us," or "our")
                        collects, uses, discloses, and safeguards your information when you access or use
                        the NetTwin AI platform, associated API services, and website (collectively, the "Services").
                    </p>

                    <p>
                        NetTwin AI provides enterprise-grade autonomous telecom network optimization services.
                        Given the critical nature of the infrastructure data we process, we map our privacy
                        practices strictly to international data protection standards, including the GDPR, CCPA,
                        and telecom-specific regulatory frameworks.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>We collect information that identifies, relates to, describes, or is reasonably capable of being associated with you or your organization ("Personal Data").</p>

                    <h3>1.1 Customer Data (Network & Telemetry)</h3>
                    <p>When you utilize the NetTwin AI Digital Twin or Simulation Engines, you may transmit network topology data, hardware configurations, node locations (such as GIS coordinates of base stations), and aggregated traffic metrics. <strong>This data is considered Customer Confidential Information.</strong> NetTwin processes this solely to provide the Services (e.g., executing AIOps recommendations) and does not use it to enrich external models without explicit consent.</p>

                    <h3>1.2 Account & Profile Information</h3>
                    <p>To access the Services, we require your name, corporate email address, organizational role, billing information, and secure authentication metadata (e.g., hashed passwords, OAuth tokens).</p>

                    <h3>1.3 Automatically Collected Information</h3>
                    <p>We automatically collect logistical data when you access the platform, including:</p>
                    <ul>
                        <li><strong>Usage Data:</strong> Pages accessed, API call volume, simulation concurrency, and interaction with AI interventions.</li>
                        <li><strong>Device & Connection Data:</strong> IP addresses, browser types, and timestamp logs for security auditing.</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>NetTwin uses your Personal and Customer Data strictly for the following operational purposes:</p>
                    <ul>
                        <li><strong>To Provide the Services:</strong> Executing network simulations, generating Mistral AI-driven optimization strategies, and running the digital twin dashboard.</li>
                        <li><strong>Security & Auditing:</strong> Monitoring for unauthorized access, ensuring SLA compliance, and preventing API abuse.</li>
                        <li><strong>Service Improvement:</strong> Aggregating <em>anonymized</em> telemetry (never revealing specific network topography) to improve the baseline performance of our prediction models.</li>
                        <li><strong>Billing:</strong> Processing subscription payments and managing account tiers.</li>
                    </ul>

                    <h2>3. Data Sharing & Third-Party Processors</h2>
                    <p>We do not sell your data. We only share information with authorized sub-processors necessary to deliver the Services:</p>
                    <ul>
                        <li><strong>Cloud Infrastructure:</strong> Hosted securely via enterprise cloud providers (e.g., AWS, GCP) operating in ISO 27001 compliant regions.</li>
                        <li><strong>AI Model Providers:</strong> When utilizing the AI reasoning engine, structured (and scrubbed) network state arrays are securely transmitted to large language model providers (e.g., Mistral AI) via encrypted API calls. We explicitly configure our vendor agreements to opt-out of data training.</li>
                        <li><strong>Legal Compliance:</strong> We may disclose data if required by a valid subpoena, court order, or binding telecom regulatory mandate in your operating jurisdiction.</li>
                    </ul>

                    <h2>4. Data Retention & Security</h2>
                    <p>We implement bank-grade encryption (AES-256 at rest, TLS 1.3 in transit) for all network topography schemas. Account data is retained as long as the account is active. Upon written request of termination, Customer Data is hard-deleted from primary databases within 30 days, and from encrypted air-gapped backups within 90 days.</p>

                    <h2>5. Your Rights (GDPR / CCPA)</h2>
                    <p>Depending on your jurisdiction, you have the right to:</p>
                    <ul>
                        <li>Access the Personal Data we hold about you.</li>
                        <li>Request correction of inaccurate data.</li>
                        <li>Request erasure of your Personal Data (the "Right to be Forgotten"), subject to active contract obligations.</li>
                        <li>Opt-out of marketing communications.</li>
                    </ul>
                    <p>To exercise these rights, the designated Data Protection Officer for your organization must contact us at <a href="mailto:privacy@safitell.example.com">privacy@safitell.example.com</a>.</p>

                    <h2>6. Contact Us</h2>
                    <p>If you have questions regarding this Privacy Policy or our security architecture, please contact our legal team:</p>
                    <p>
                        <strong>NetTwin Legal Dept.</strong><br />
                        Email: legal@safitell.example.com<br />
                    </p>
                </div>
            </article>
        </main>
    );
}
