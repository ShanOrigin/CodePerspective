import React from 'react'
import styles from './Home.module.css'
import Hero from './sections/Hero/Hero'
import ExploreVisualizers from './sections/ExploreVisualizers/ExploreVisualizers'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import Showcase from './sections/Showcase/Showcase'

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <Hero />
      <ExploreVisualizers />
      <HowItWorks />
      <Showcase />
    </main>
  )
}
