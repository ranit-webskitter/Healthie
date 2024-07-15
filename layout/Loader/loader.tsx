import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div
      className={styles.loaderContainer}
    >
      <div className={styles.loader}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.loadingTextContainer}>
        {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((char, index) => (
          <span key={index} className={styles.loadingText} style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;