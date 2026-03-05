import styles from './page.module.css';

export default function StationsManagement() {
    return (
        <div>
            <div className="admin-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 className="admin-header" style={{ marginBottom: 0 }}>Station Management</h1>
                    <button className="admin-btn">+ Add New Station</button>
                </div>
            </div>

            <div className="admin-card">
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search stations..."
                        className={styles.searchInput}
                    />
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Station Name</th>
                                <th>City</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ST-RYD</td>
                                <td>Riyadh Central</td>
                                <td>Riyadh</td>
                                <td><span className={styles.badgeActive}>Active</span></td>
                                <td>
                                    <button className={styles.actionBtn}>Edit</button>
                                    <button className={styles.actionBtnDelete}>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#ST-JED</td>
                                <td>Jeddah Gateway</td>
                                <td>Jeddah</td>
                                <td><span className={styles.badgeActive}>Active</span></td>
                                <td>
                                    <button className={styles.actionBtn}>Edit</button>
                                    <button className={styles.actionBtnDelete}>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>#ST-DMM</td>
                                <td>Dammam East</td>
                                <td>Dammam</td>
                                <td><span className={styles.badgeMaintenance}>Maintenance</span></td>
                                <td>
                                    <button className={styles.actionBtn}>Edit</button>
                                    <button className={styles.actionBtnDelete}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
