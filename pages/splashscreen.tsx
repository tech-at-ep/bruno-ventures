import React, {Component} from 'react';
import styles from '../styles/Splash.module.css'

function SplashScreen() {
  return (
    <div className={styles.splash_scren}>
      Wait a moment while we load your app.
      <div className={styles.loading_dot}>.</div>
    </div>
  );
}

export default SplashScreen;