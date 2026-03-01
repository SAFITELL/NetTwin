// Production of Samuel.M.K also know as T756-Tech
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NetTwin AI | Network Intelligence Platform",
    description: "Autonomous telecom network optimization and congestion prediction powered by Mistral AI.",
};

import Footer from "../components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Footer />
            </body>
        </html>
    );
}
