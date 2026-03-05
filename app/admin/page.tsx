import styles from './page.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="admin-header">Dashboard Overview</h1>

      <div className={styles.statsGrid}>
        <div className="admin-card">
          <div className={styles.statLabel}>Total Bookings</div>
          <div className={styles.statValue}>1,248</div>
          <div className={styles.statTrendPositive}>+12% from last month</div>
        </div>

        <div className="admin-card">
          <div className={styles.statLabel}>Active Trains</div>
          <div className={styles.statValue}>42</div>
          <div className={styles.statTrendNeutral}>No changes</div>
        </div>

        <div className="admin-card">
          <div className={styles.statLabel}>Total Revenue</div>
          <div className={styles.statValue}>$45,200</div>
          <div className={styles.statTrendPositive}>+8.4% from last month</div>
        </div>

        <div className="admin-card">
          <div className={styles.statLabel}>Active Routes</div>
          <div className={styles.statValue}>18</div>
          <div className={styles.statTrendPositive}>+2 new routes</div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className="admin-card">
          <div className={styles.cardHeader}>
            <h2>Recent Bookings</h2>
            <button className="admin-btn">View All</button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#B-92842</td>
                  <td>Ahmed Ali</td>
                  <td>Riyadh → Dammam</td>
                  <td>Mar 15, 2026</td>
                  <td><span className={styles.badgeSuccess}>Confirmed</span></td>
                </tr>
                <tr>
                  <td>#B-92843</td>
                  <td>Sara Khalid</td>
                  <td>Jeddah → Madinah</td>
                  <td>Mar 16, 2026</td>
                  <td><span className={styles.badgePending}>Pending</span></td>
                </tr>
                <tr>
                  <td>#B-92844</td>
                  <td>Omar F.</td>
                  <td>Riyadh → Makkah</td>
                  <td>Mar 18, 2026</td>
                  <td><span className={styles.badgeSuccess}>Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
