import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Background decoration */}
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>

      <nav className={styles.nav}>
        <div className={styles.logo}>TrackLine</div>
        <div className={styles.navLinks}>
          <a href="#">Destinations</a>
          <a href="#">Schedules</a>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Sign In</button>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.badge}>Next-Gen Travel</div>
        <h1 className={styles.title}>
          Your Journey Begins <span className={styles.highlight}>Here</span>
        </h1>
        <p className={styles.subtitle}>
          Experience the future of rail travel. Fast, comfortable, and seamless booking tailored just for you.
        </p>

        <div className={`glass-panel ${styles.searchWidget}`}>
          <div className={styles.searchRow}>
            <div className={styles.inputGroup}>
              <label>From</label>
              <input type="text" className="input-field" placeholder="Departure City" />
            </div>
            <div className={styles.swapBtn}>⇄</div>
            <div className={styles.inputGroup}>
              <label>To</label>
              <input type="text" className="input-field" placeholder="Arrival City" />
            </div>
          </div>
          <div className={styles.searchRow}>
            <div className={styles.inputGroup}>
              <label>Date</label>
              <input type="date" className="input-field" />
            </div>
            <div className={styles.inputGroup}>
              <label>Passengers</label>
              <select className="input-field">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>Family</option>
              </select>
            </div>
            <button className={`btn-primary ${styles.searchBtn}`}>Search Trains</button>
          </div>
        </div>
      </section>
    </main>
  );
}
