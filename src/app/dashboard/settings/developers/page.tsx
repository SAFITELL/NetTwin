// Production of Samuel.M.K also know as T756-Tech
"use client";

import React, { useEffect, useState } from "react";
import styles from "./developers.module.css";

// Assuming we have a global Header/Sidebar for the dashboard, but for this specific page we focus on the content
// If the layout file provides the sidebar, this page just renders the main content area.

interface ApiKey {
    id: String;
    name: String;
    key: String;
    isActive: Boolean;
    createdAt: string;
    lastUsed?: string; // Optional if not tracked yet
}

export default function DevelopersSettingsPage() {
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);

    // Fetch existing keys on load
    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/v1/keys");
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to fetch keys");
            }
            const data = await res.json();
            setKeys(data.keys || []);
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Could not connect to database. Did you run 'npx prisma db push'?");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateKey = async () => {
        setGenerating(true);
        try {
            const res = await fetch("/api/v1/keys", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Production API Key" })
            });

            if (!res.ok) throw new Error("Failed to generate key");

            // Refresh the table
            await fetchKeys();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Developer Settings</h1>
                <p className={styles.subtitle}>Manage API connections and access tokens for your telecom environment.</p>
            </div>

            {error && (
                <div className={styles.errorState}>
                    <strong>API Connection Error:</strong> {error}
                    <br /><br />
                    <small>Note: If you have not created your PostgreSQL database yet, this table cannot load real data.</small>
                </div>
            )}

            <div className={styles.grid}>
                {/* Left Side: Outbound Connections (Telco OSS) */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Outbound Connection (OSS Integration)
                    </div>
                    <p className={styles.subtitle} style={{ marginBottom: "2rem" }}>
                        Configure the credentials required for NetTwin to securely pull telemetry from your Element Management System (EMS).
                    </p>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Provider URL</label>
                        <input type="text" className={styles.input} placeholder="https://api.ericsson-ems.internal/v1" disabled />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Client ID</label>
                        <input type="text" className={styles.input} placeholder="Integration Client ID" disabled />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Client Secret</label>
                        <input type="password" className={styles.input} placeholder="••••••••••••••••" disabled />
                    </div>

                    <button className={styles.button} disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
                        Save Connection Status
                    </button>
                    <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#8892b0" }}>
                        * Outbound saving is disabled until environment setup is complete.
                    </p>
                </div>

                {/* Right Side: Inbound APIs (Generate Keys) */}
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        Your NetTwin API Keys
                        <button
                            className={styles.buttonOutline}
                            onClick={handleGenerateKey}
                            disabled={generating || !!error} // Disable if DB is broken
                        >
                            {generating ? "Generating..." : "+ Generate New Key"}
                        </button>
                    </div>

                    <div className={styles.tableContainer}>
                        {loading ? (
                            <div className={styles.emptyState}>Loading keys...</div>
                        ) : keys.length === 0 && !error ? (
                            <div className={styles.emptyState}>
                                No API keys generated yet. Click above to create one.
                            </div>
                        ) : keys.length > 0 ? (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Name</th>
                                        <th className={styles.th}>Token</th>
                                        <th className={styles.th}>Created</th>
                                        <th className={styles.th}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {keys.map((k, i) => (
                                        <tr key={i} className={styles.tableRow}>
                                            <td className={styles.td} style={{ fontWeight: 500 }}>{k.name}</td>
                                            <td className={styles.td}>
                                                <span className={styles.codeCell}>{k.key.substring(0, 12)}...</span>
                                            </td>
                                            <td className={styles.td} style={{ color: "#8892b0" }}>
                                                {new Date(k.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className={styles.td}>
                                                {k.isActive ? (
                                                    <span className={styles.statusActive}>
                                                        <span className={styles.statusIndicatorActive}></span> Active
                                                    </span>
                                                ) : (
                                                    <span style={{ color: "#8892b0", fontSize: "0.8rem" }}>Revoked</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
