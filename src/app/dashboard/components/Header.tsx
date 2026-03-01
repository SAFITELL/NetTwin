// Production of Samuel.M.K also know as T756-Tech
'use client';

import { usePathname } from 'next/navigation';
import styles from './components.module.css';

export function Header() {
    const pathname = usePathname();

    // Create breadcrumb from pathname
    const pathParts = pathname.split('/').filter(Boolean);
    const title = pathParts[pathParts.length - 1] || 'Dashboard';
    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1).replace('-', ' ');

    return (
        <header className={styles.header}>
            <div className={styles.breadcrumbs}>
                <span className={styles.breadcrumbMuted}>NetTwin</span>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbActive}>{formattedTitle}</span>
            </div>

            <div className={styles.headerActions}>
                <div className={styles.simStatus}>
                    <span className={styles.statusDot}></span>
                    Simulation Active
                </div>
                <button className={styles.userMenu}>
                    <div className={styles.avatar}>A</div>
                </button>
            </div>
        </header>
    );
}
