
"use client";

import { useApp } from '@/context/AppContext';
import { LayoutDashboard, ShieldAlert, Cpu, Zap, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import styles from './Header.module.css';

export function Header() {
    const { isExecView, setIsExecView, session, resetSession, theme, toggleTheme } = useApp();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div
                    className={styles.logo}
                    onClick={resetSession}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && resetSession()}
                >
                    <div className={styles.iconBox}>
                        <Cpu size={24} className={styles.logoIcon} />
                    </div>
                    <div>
                        <h1>Autonomous AI <span>Bug Bash</span></h1>
                        <p>Next-Gen Quality Governance</p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    <div className={styles.statusBadge}>
                        <div className={`${styles.statusDot} ${session ? styles.active : ''}`} />
                        {session ? 'Session Active' : 'Idle'}
                    </div>

                    <button
                        className={`${styles.execToggle} ${isExecView ? styles.active : ''}`}
                        onClick={() => setIsExecView(!isExecView)}
                    >
                        {isExecView ? <Eye size={18} /> : <EyeOff size={18} />}
                        {isExecView ? 'Executive' : 'Technical'}
                    </button>
                </div>
            </div>
        </header>
    );
}
