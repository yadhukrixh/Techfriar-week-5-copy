import HomePage from '@/components/UserComponents/HomePage/HomePage';
import styles from './LandingPage.module.css';
import React from 'react'

const LandingPage = () => {
  return (
    <div className={styles.main}>
      {/* calling home page component */}
      <HomePage/>
    </div>
  )
}

export default LandingPage
