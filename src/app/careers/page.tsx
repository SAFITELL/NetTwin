// Production of Samuel.M.K also know as T756-Tech
"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./careers.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function CareersPage() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");
        // Simulate an API call
        setTimeout(() => {
            setFormStatus("success");
            // In a real app, you would send this to your backend or a service like Formspree
        }, 1500);
    };

    return (
        <main className={styles.main}>
            {/* Header Navigation */}
            <Header />

            <article className={styles.article}>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <div className={styles.badge}>Join NetTwin</div>
                    <h1 className={styles.title}>Build the intelligence behind global infrastructure.</h1>
                    <p className={styles.lead}>
                        We are moving telecom networks from reactive maintenance to AI-driven autonomy.
                        Join NetTwin and help build the digital twin that runs the physical world.
                    </p>
                </section>

                <div className={styles.contentGrid}>
                    {/* Left Column: Culture & Stack */}
                    <div className={styles.cultureSection}>
                        <div className={styles.sectionBlock}>
                            <h2>Mission Critical Engineering</h2>
                            <p>
                                At NetTwin, we are building systems that directly interface with critical
                                national infrastructure. Our autonomous reasoning engines process live telemetry
                                from edge nodes to optimize power distribution, dynamically route traffic during
                                congestion events, and ensure maximum uptime for emergency services and commercial
                                bandwidth routing.
                            </p>
                        </div>

                        {/* Tech stack removed per user request */}
                        <div className={styles.sectionBlock}>
                            <h2>Engineering Principles</h2>
                            <ul className={styles.valueList}>
                                <li>
                                    <strong>Zero-Downtime Architecture</strong>
                                    We design for absolute resilience. Telecommunications infrastructure operates 24/7/365, and our software must match that standard.
                                </li>
                                <li>
                                    <strong>Deterministic Execution</strong>
                                    While we leverage advanced AI reasoning models, our intervention pipelines are built with strict guardrails, rollback mechanisms, and deterministic execution paths.
                                </li>
                                <li>
                                    <strong>Data Perimeter Security</strong>
                                    We treat network topology and telemetry as sovereign data. Security, encryption, and strict access controls are foundational to everything we write.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className={styles.formSection} id="apply">
                        <div className={styles.formCard}>
                            <h2>General Application</h2>
                            <p className={styles.formSubtitle}>
                                We are always looking for exceptional builders. Even if we don't have a specific role listed,
                                drop your details below and our engineering team will review it.
                            </p>

                            {formStatus === "success" ? (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>✓</div>
                                    <h3>Application Received</h3>
                                    <p>Thank you for your interest in NetTwin. Our team will review your profile and reach out if there's a strong fit.</p>
                                    <button onClick={() => setFormStatus("idle")} className={styles.resetBtn}>Submit another application</button>
                                </div>
                            ) : (
                                <form className={styles.applicationForm} onSubmit={handleSubmit}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="fullName">Full Name</label>
                                        <input type="text" id="fullName" required placeholder="Jane Doe" />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" required placeholder="jane@example.com" />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="role">What is your primary discipline?</label>
                                        <select id="role" required defaultValue="">
                                            <option value="" disabled>Select an option...</option>
                                            <option value="systems">Systems & Reliability Engineering</option>
                                            <option value="infrastructure">Telecom Infrastructure Architecture</option>
                                            <option value="ai">AI / Machine Reasoning</option>
                                            <option value="security">Information & Network Security</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="portfolio">LinkedIn or GitHub URL</label>
                                        <input type="url" id="portfolio" required placeholder="https://github.com/..." />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="why">Why NetTwin?</label>
                                        <textarea id="why" rows={4} required placeholder="Detail your experience with critical infrastructure or autonomous systems..."></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={formStatus === "submitting"}
                                    >
                                        {formStatus === "submitting" ? "Submitting..." : "Submit Application"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
