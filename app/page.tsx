import Link from 'next/link';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';

import { getStations } from '@/lib/data-service';

export default async function Home() {
  const stations = await getStations();

  return (
    <main className={styles.main}>
      {/* Background decoration */}
      <div className={styles.blob}></div>
      <div className={styles.blob2}></div>

      <Navbar />

      <section className={styles.hero}>
        <div className={styles.badge}>Next-Gen Travel</div>
        <h1 className={styles.title}>
          Your Journey Begins <span className={styles.highlight}>Here</span>
        </h1>
        <p className={styles.subtitle}>
          Experience the future of rail travel. Fast, comfortable, and seamless booking tailored just for you.
        </p>

        <form action="/search" method="GET" className={`glass-panel ${styles.searchWidget}`}>
          <div className={styles.searchRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="from">From</label>
              <select name="from" id="from" className="input-field" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <option value="all" style={{ color: 'black' }}>🌍 All Stations</option>
                {stations.map((st: any) => (
                  <option key={st.id} value={st.id} style={{ color: 'black' }}>{st.name} ({st.city})</option>
                ))}
              </select>
            </div>
            <div className={styles.swapBtn}>⇄</div>
            <div className={styles.inputGroup}>
              <label htmlFor="to">To</label>
              <select name="to" id="to" className="input-field" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <option value="all" style={{ color: 'black' }}>🌍 All Destinations</option>
                {stations.map((st: any) => (
                  <option key={st.id} value={st.id} style={{ color: 'black' }}>{st.name} ({st.city})</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.searchRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="date">Date (Optional)</label>
              <input type="date" name="date" id="date" className="input-field" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="passengers">Passengers</label>
              <select name="passengers" id="passengers" className="input-field" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <option value="1" style={{ color: 'black' }}>1 Adult</option>
                <option value="2" style={{ color: 'black' }}>2 Adults</option>
                <option value="family" style={{ color: 'black' }}>Family</option>
              </select>
            </div>
            <button type="submit" className={`btn-primary ${styles.searchBtn}`}>Search Trains</button>
          </div>
        </form>
      </section>
    </main>
  );
}
