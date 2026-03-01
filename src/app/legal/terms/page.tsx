// Production of Samuel.M.K also know as T756-Tech
import Link from "next/link";
import styles from "../legal.module.css";
import Header from "../../../components/Header";

export default function TermsOfServicePage() {
    return (
        <main className={styles.main}>
            {/* Minimal Header for Legal Pages */}
            <Header />

            <article className={styles.article}>
                <div className={styles.breadcrumb}>
                    <Link href="/">Home</Link> &gt; <span>Terms of Service</span>
                </div>

                <div className={styles.documentHeader}>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.lastUpdated}>Effective Date: March 1, 2026</p>
                </div>

                <div className={styles.documentContent}>
                    <p className={styles.lead}>
                        These Terms of Service ("Terms") constitute a legally binding agreement between you
                        (whether personally or on behalf of an entity, "Customer") and NetTwin ("Company," "we," "us," or "our"),
                        governing your access to and use of the NetTwin AI platform.
                    </p>

                    <div className={styles.callout}>
                        <strong>IMPORTANT NOTICE:</strong> By registering for an account, accessing the API, or using the
                        NetTwin AI simulation engine, you unconditionally agree to be bound by these Terms.
                        If you are accepting these Terms on behalf of an enterprise telecom operator, you represent
                        and warrant that you have the legal authority to bind that entity.
                    </div>

                    <h2>1. Provision of Services</h2>
                    <h3>1.1 The NetTwin AI Platform</h3>
                    <p>Subject to these Terms and payment of applicable fees, NetTwin grants Customer a non-exclusive, non-transferable, revocable license to access the NetTwin AI web application, digital twin dashboards, and the simulation API strictly for internal business operations related to telecom network optimization.</p>

                    <h3>1.2 Service Availability & SLAs</h3>
                    <p>We strive for 99.9% uptime for core dashboard and telemetry ingestion services. However, AI-driven recommendation latency (Layer 2 reasoning via external LLM APIs) is subject to upstream provider availability and is excluded from strict SLA guarantees unless specifically outlined in an Enterprise Master Service Agreement (MSA).</p>

                    <h2>2. Customer Responsibilities</h2>
                    <h3>2.1 Account Security</h3>
                    <p>Customer is responsible for safeguarding authentication credentials and API keys. Any actions executed via your organization's API keys (including executing autonomous network interventions) are strictly your liability.</p>

                    <h3>2.2 Acceptable Use</h3>
                    <p>Customer agrees NOT to:</p>
                    <ul>
                        <li>Reverse engineer, decompile, or attempt to extract the source code of the simulation engine.</li>
                        <li>Use the platform to intentionally simulate distributed denial of service (DDoS) attacks for malicious mapping purposes.</li>
                        <li>Resell, sublicense, or offer the NetTwin AI dashboard as a white-labeled service to third parties without written authorization.</li>
                        <li>Upload highly sensitive Personal Identifiable Information (PII) of end-users (e.g., individual subscriber phone numbers or plain-text SMS data) into the platform. The system is designed to ingest aggregated, anonymized telemetry (e.g., "Tower A utilization").</li>
                    </ul>

                    <h2>3. Intellectual Property</h2>
                    <h3>3.1 NetTwin IP</h3>
                    <p>All rights, title, and interest in the NetTwin AI platform, including backend algorithms, UI/UX designs, prediction models, and the NetTwin brand, remain the exclusive property of NetTwin. No IP rights are transferred under these Terms.</p>

                    <h3>3.2 Customer Data</h3>
                    <p>Customer retains all ownership rights to the specific network topology data, configurations, and historical metrics uploaded to the platform. Customer grants NetTwin a limited, secure license to process this data solely to provide the Services.</p>

                    <h2>4. Disclaimers & Limitation of Liability</h2>
                    <h3>4.1 "AS-IS" Simulation Disclaimer</h3>
                    <p>THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. While NetTwin AI utilizes advanced statistical and AI reasoning models to simulate and predict network congestion, it is a decision-support tool. NetTwin DOES NOT GUARANTEE THAT IMPLEMENTING AI RECOMMENDATIONS WILL PREVENT ALL OUTAGES OR HARDWARE FAILURES.</p>

                    <h3>4.2 Infrastructure Execution Liability</h3>
                    <p><strong>CRITICAL WARNING:</strong> If Customer configures NetTwin AI to execute autonomous routing changes, power-sleep toggles, or load-balancing directly on physical hardware (via API webhooks), CUSTOMER ASSUMES ALL RISK. NetTwin shall not be liable for accidental network downtime, dropped commercial traffic, or hardware damage resulting from automated AI interventions.</p>

                    <h3>4.3 Liability Cap</h3>
                    <p>To the maximum extent permitted by law, NetTwin’s total aggregate liability arising from these Terms shall not exceed the total amount paid by the Customer for the Services during the twelve (12) months immediately preceding the claim.</p>

                    <h2>5. Termination</h2>
                    <p>Either party may terminate this agreement for cause with 30 days' written notice if the other party materially breaches these Terms. Upon termination, all licenses granted immediately cease, and NetTwin will securely purge Customer Data as outlined in our Privacy Policy.</p>

                    <h2>6. Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which NetTwin is headquartered, excluding its conflict of law provisions. Any disputes will be subject to exclusive arbitration.</p>
                </div>
            </article>
        </main>
    );
}
