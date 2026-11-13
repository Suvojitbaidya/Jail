"use client";
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './404.module.css';

const Custom404 = () => {
  const cameraRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Camera follow mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (cameraRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        cameraRef.current.style.setProperty('--x', `${x * 100}%`);
        cameraRef.current.style.setProperty('--y', `${y * 100}%`);
      }
    };

    // Laser scan animation
    const laserScan = () => {
      if (laserRef.current) {
        laserRef.current.style.animation = 'none';
        void laserRef.current.offsetWidth; // Trigger reflow
        laserRef.current.style.animation = 'laserScan 3s linear infinite';
      }
      setTimeout(laserScan, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    laserScan();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Target Not Found - Security System</title>
      </Head>
      
      <div className={styles.securityContainer}>
        {/* Security Camera Feed Effect */}
        <div className={styles.cameraFeed} ref={cameraRef}>
          <div className={styles.cameraLens}></div>
          <div className={styles.laserScanner} ref={laserRef}></div>
          
          {/* Grid overlay */}
          <div className={styles.gridOverlay}></div>
          
          {/* Animated warning text */}
          <div className={styles.warningContainer}>
            <div className={styles.warningText}>TARGET NOT FOUND</div>
            <div className={styles.errorCode}>404</div>
            <div className={styles.subText}>SECURITY BREACH DETECTED</div>
          </div>
          
          {/* Flashing warning lights */}
          <div className={styles.warningLight}></div>
          
          {/* Security footage artifacts */}
          <div className={styles.footageArtifact1}></div>
          <div className={styles.footageArtifact2}></div>
          <div className={styles.footageArtifact3}></div>
          
          {/* Camera UI elements */}
          <div className={styles.cameraTime}>23:59:45</div>
          <div className={styles.cameraLocation}>BLOCK D - CELL 404</div>
          <div className={styles.cameraStatus}>REC • 1080p • AI TRACKING</div>
          
          {/* Return button */}
          <div className={styles.buttonContainer}>
            <Link href="/" className={styles.returnButton}>
              <span className={styles.buttonIcon}>⟳</span>
              REINITIALIZE TRACKING
            </Link>
          </div>
        </div>
        
        {/* Static noise overlay */}
        <div className={styles.staticNoise}></div>
      </div>
    </>
  );
};

export default Custom404;