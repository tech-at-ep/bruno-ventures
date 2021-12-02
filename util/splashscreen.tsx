import React from 'react';
import styles from '../styles/Splash.module.css';

interface SplashScreenProps {
    fading: boolean;
}

function SplashScreen({fading} : SplashScreenProps) {
  return (
    <div className={fading ?  `${styles.splash_screen} ${styles.hidden}` : styles.splash_screen}>
      <img style={{maxHeight: '20vh'}}src='brunoventureslogo.png' />
      <div className={styles.loading_dot}>.</div>
    </div>
  );
}

export default SplashScreen;