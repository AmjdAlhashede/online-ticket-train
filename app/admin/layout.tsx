import type { Metadata } from 'next';
import './admin-globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'TrackLine Admin',
  description: 'Control Panel for TrackLine',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>TrackLine Admin</div>
        </div>
        <nav className={styles.sidebarNav}>
          <a href="#" className={styles.navItemActive}>Dashboard</a>
          <a href="#" className={styles.navItem}>Stations</a>
          <a href="#" className={styles.navItem}>Routes</a>
          <a href="#" className={styles.navItem}>Trains</a>
          <a href="#" className={styles.navItem}>Schedules</a>
          <a href="#" className={styles.navItem}>Bookings</a>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarTitle}>Overview</div>
          <div className={styles.adminProfile}>Admin User</div>
        </header>

        {/* Page Content */}
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
