import React from 'react';
import styles from './brandLogo.module.css';

export function BrandLogo() {
  return (
    <div className={styles.brandEngineContainer}>
      <div className={styles.brandIconArtifact} aria-hidden="true">
        <div className={styles.brandNodeLeft}></div>
        <div className={styles.brandNodeRight}></div>
      </div>
      <div className={styles.brandTextBlock}>
        <h1 className={styles.brandWordmark}>Project Mirror</h1>
        <p className={styles.brandTagline}>OPEN ECOSYSTEM</p>
      </div>
    </div>
  );
}
