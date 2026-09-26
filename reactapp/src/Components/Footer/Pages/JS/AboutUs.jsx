import React from 'react'
import {
  FaEye,
  FaLightbulb,
  FaCogs,
  FaChartLine,
  FaGraduationCap,
  FaShieldAlt,
  FaTerminal,
  FaUserCheck,
} from 'react-icons/fa'
import AnimatedIcon from '../../../common/AnimatedIcon'
import styles from '../CSS/AboutUs.module.css'

export default function AboutUs() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className={styles.badgeWrapper}>
          <span className={styles.heroBadge}>Educational Engineering</span>
        </div>
        <h1 className={styles.pageTitle}>
          Making Code Execution Intuitive &amp; Visual
        </h1>
        <p className={styles.heroLead}>
          CodePerspective is an interactive visual computing environment designed to bridge
          the gap between abstract syntax and runtime realities. We transform invisible memory
          allocations, pointer manipulations, and control branches into clear, deterministic
          visual simulations.
        </p>
      </section>

      {/* Purpose & Problem */}
      <section className={styles.purposeSection}>
        <div className={styles.twoColumnGrid}>
          <div className={styles.columnCard}>
            <div className={styles.cardHeader}>
              <AnimatedIcon size="md" variant="inset">
                <FaEye />
              </AnimatedIcon>
              <h2 className={styles.sectionTitle}>The Invisible Barrier</h2>
            </div>
            <p className={styles.cardBody}>
              When students and developers learn algorithms, they are typically forced to construct
              complex mental models of invisible state changes. Pointers traverse nodes in memory,
              call stacks push and unwind, and recursive branches divide unseen. When mental
              models fail, programming becomes an exercise in confusing trial and error.
            </p>
          </div>

          <div className={styles.columnCard}>
            <div className={styles.cardHeader}>
              <AnimatedIcon size="md" variant="inset">
                <FaLightbulb />
              </AnimatedIcon>
              <h2 className={styles.sectionTitle}>Our Solution</h2>
            </div>
            <p className={styles.cardBody}>
              We believe that if you can see a data structure mutate in real time, comprehension
              becomes natural. CodePerspective turns abstract algorithmic rules into high-fidelity
              visual feedback. Every pointer update, element swap, and branch decision is rendered
              at human pace, reinforcing true architectural understanding.
            </p>
          </div>
        </div>
      </section>

      {/* What We Build - Core Pillars */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What We Build</h2>
          <p className={styles.sectionSubtitle}>
            Three foundational pillars empower learners to explore concepts with full clarity.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillarItem}>
            <div className={styles.pillarIcon}>
              <AnimatedIcon size="lg" variant="inset">
                <FaCogs />
              </AnimatedIcon>
            </div>
            <h3 className={styles.pillarTitle}>State-Level Transparency</h3>
            <p className={styles.pillarText}>
              Every memory cell, array index, and node reference is explicitly exposed during execution.
              Nothing happens behind the scenes.
            </p>
          </div>

          <div className={styles.pillarItem}>
            <div className={styles.pillarIcon}>
              <AnimatedIcon size="lg" variant="inset">
                <FaTerminal />
              </AnimatedIcon>
            </div>
            <h3 className={styles.pillarTitle}>Synchronous Code Linking</h3>
            <p className={styles.pillarText}>
              Visual steps map directly to source code lines. As a line executes, its memory impact
              is immediately reflected in the visualizer graph.
            </p>
          </div>

          <div className={styles.pillarItem}>
            <div className={styles.pillarIcon}>
              <AnimatedIcon size="lg" variant="inset">
                <FaChartLine />
              </AnimatedIcon>
            </div>
            <h3 className={styles.pillarTitle}>Temporal Inspection</h3>
            <p className={styles.pillarText}>
              Control playback velocity, pause at critical pivot points, and observe edge-case
              behaviors that static textbooks cannot convey.
            </p>
          </div>
        </div>
      </section>

      {/* Technical & Educational Philosophy */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyBanner}>
          <div className={styles.philosophyContent}>
            <h2 className={styles.sectionTitle}>Our Educational Philosophy</h2>
            <blockquote className={styles.philosophyQuote}>
              &ldquo;True mastery of computer science does not come from memorizing code syntax.
              It comes from internalizing how data moves through space and time.&rdquo;
            </blockquote>
            <p className={styles.philosophyText}>
              We avoid flashy gimmicks in favor of clean, accurate technical representation.
              Whether dissecting Dijkstra&apos;s priority queue updates, tree balance factors in AVL trees,
              or bit shifts in binary arithmetic, our visual representations prioritize clarity, precision,
              and educational integrity above all else.
            </p>
          </div>
        </div>
      </section>

      {/* Project Leadership & Creator Note */}
      <section className={styles.founderSection}>
        <div className={styles.founderCard}>
          <div className={styles.founderIconBadge}>
            <AnimatedIcon size="lg" variant="inset">
              <FaUserCheck />
            </AnimatedIcon>
          </div>
          <div className={styles.founderInfo}>
            <span className={styles.founderRole}>Project Creator &amp; Architect</span>
            <h3 className={styles.founderName}>Shantanu Suryawanshi</h3>
            <p className={styles.founderBio}>
              CodePerspective was conceived and developed by Shantanu Suryawanshi to address the
              steep learning curve encountered by computer science students. Built on the belief
              that open, high-quality visual tools can democratize technical education, the project
              continues to evolve with interactive modules across foundational data structures,
              algorithms, and runtime analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
