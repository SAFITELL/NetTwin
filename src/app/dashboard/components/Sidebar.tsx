// Production of Samuel.M.K also know as T756-Tech
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './components.module.css';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Digital Twin', href: '/dashboard/twin', icon: '🗺️' },
        { name: 'AI Operations', href: '/dashboard/ai-ops', icon: '🧠' },
        { name: 'Predictions', href: '/dashboard/predictions', icon: '⚡' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: '📊' },
        { name: 'Energy Planner', href: '/dashboard/energy', icon: '🔋' },
        { name: 'Network Planning', href: '/dashboard/planning', icon: '📡' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoArea}>
                <div className={styles.logoIcon}></div>
                <span className={styles.logoText}>NetTwin AI</span>
            </div>

            <div className={styles.navGroup}>
                <div className={styles.navLabel}>Workspaces</div>
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className={styles.navGroupBottom}>
                <div className={styles.navLabel}>System</div>
                <nav className={styles.nav}>
                    <Link
                        href="/dashboard/settings"
                        className={`${styles.navItem} ${pathname === '/dashboard/settings' ? styles.active : ''}`}
                    >
                        <span className={styles.navIcon}>⚙️</span>
                        Settings
                    </Link>
                </nav>
            </div>
        </aside>
    );
}
