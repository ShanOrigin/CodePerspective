import React from 'react'
import styles from '../CSS/Home1.module.css'
import {
  FaDatabase,
  FaProjectDiagram,
  FaCodeBranch,
  FaPlayCircle,
  FaMousePointer,
  FaCode,
  FaCheckCircle,
  FaQuoteLeft,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLaptopCode,
} from 'react-icons/fa'

import homedemo from '../../Images/homedemo.jpg'

const Home = () => {
  return (
    <main className={styles.homePage}>
      {/* Hero Section (Enhanced) */}
      <section className={styles.hero}>
        {/* Background Animation Element */}
        <div className={styles.animatedBackground}>
          {/* These spans will be styled into animated lines/particles */}
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Visualize. <span className={styles.highlight}>Learn.</span> Master.
          </h1>
          <p className={styles.heroSubtitle}>
            Code Perspective turns complex programming concepts into simple,
            interactive visualizations. Stop guessing, start seeing.
          </p>
          <button className={styles.ctaButton}>
            <FaPlayCircle /> Start Visualizing
          </button>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingNode} style={{ '--i': 1 }}>
            Data
          </div>
          <div className={styles.floatingNode} style={{ '--i': 2 }}>
            Array
          </div>
          <div className={styles.floatingNode} style={{ '--i': 3 }}>
            Tree
          </div>
          <div className={styles.floatingNode} style={{ '--i': 4 }}>
            Hash
          </div>
          <div className={styles.floatingNode} style={{ '--i': 5 }}>
            Graph
          </div>
        </div>
      </section>

      {/* Features Section (Original) */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Explore Our Visualizers</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FaDatabase className={styles.featureIcon} />
            <h3>Data Structures</h3>
            <p>
              Interact with Arrays, Linked Lists, Trees, Graphs, and more. See
              how they're built and manipulated.
            </p>
          </div>
          <div className={styles.featureCard}>
            <FaProjectDiagram className={styles.featureIcon} />
            <h3>Algorithms</h3>
            <p>
              Watch sorting, searching, and pathfinding algorithms execute
              step-by-step. Understand the logic visually.
            </p>
          </div>
          <div className={styles.featureCard}>
            <FaCodeBranch className={styles.featureIcon} />
            <h3>Control Flow</h3>
            <p>
              Demystify loops, conditionals, and recursion. See the exact path
              your code takes in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: How It Works --- */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaMousePointer />
            </div>
            <h3>1. Select a Topic</h3>
            <p>
              Choose from dozens of data structures and algorithms, from simple
              arrays to complex graph traversals.
            </p>
          </div>
          <div className={styles.timelineConnector}></div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaCode />
            </div>
            <h3>2. Interact & See</h3>
            <p>
              Add nodes, run sorting algorithms, or search for values. Watch the
              visualization change with every step you take.
            </p>
          </div>
          <div className={styles.timelineConnector}></div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineIcon}>
              <FaCheckCircle />
            </div>
            <h3>3. Master the Concept</h3>
            <p>
              See the underlying pseudocode highlight in real-time. Solidify
              your understanding by seeing the logic.
            </p>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: Testimonials --- */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>Trusted by Learners Worldwide</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.quote}>
              "The graph visualizer finally made Dijkstra's algorithm click for
              me. I aced my exam!"
            </p>
            <div className={styles.author}>
              <FaUserGraduate className={styles.authorIcon} />
              <div className={styles.authorInfo}>
                <h4>Alex M.</h4>
                <p>CS Student</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.quote}>
              "I use this in my classroom. It's the best tool I've found to
              explain complex data structures to my students."
            </p>
            <div className={styles.author}>
              <FaChalkboardTeacher className={styles.authorIcon} />
              <div className={styles.authorInfo}>
                <h4>Dr. Sarah Chen</h4>
                <p>University Professor</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <p className={styles.quote}>
              "As a self-taught developer, understanding recursion was a
              nightmare. The visual call stack was a game-changer."
            </p>
            <div className={styles.author}>
              <FaLaptopCode className={styles.authorIcon} />
              <div className={styles.authorInfo}>
                <h4>David K.</h4>
                <p>Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section (Original) */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to See Code in a New Light?</h2>
          <p>
            Dive into our services and start your visualization journey today.
            It's free!
          </p>
          <button className={styles.ctaButtonSecondary}>
            Explore Services
          </button>
        </div>
        <div className={styles.ctaImage}>
          <img src={homedemo} alt="Abstract Code" />
        </div>
      </section>
    </main>
  )
}

export default Home

/*
import React from 'react'
import styles from '../CSS/home0.module.css'
import {
  FaDatabase,
  FaProjectDiagram,
  FaCodeBranch,
  FaPlayCircle,
} from 'react-icons/fa'


*/
export const home = () => {
  return (
    <main className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Visualize. <span className={styles.highlight}>Learn.</span> Master.
          </h1>
          <p className={styles.heroSubtitle}>
            Code Perspective turns complex programming concepts into simple,
            interactive visualizations. Stop guessing, start seeing.
          </p>
          <button className={styles.ctaButton}>
            <FaPlayCircle /> Start Visualizing
          </button>
        </div>
        <div className={styles.heroVisual}>
          {/* This div will be the animated graphic */}
          <div className={styles.floatingNode} style={{ '--i': 1 }}>
            Data
          </div>
          <div className={styles.floatingNode} style={{ '--i': 2 }}>
            Array
          </div>
          <div className={styles.floatingNode} style={{ '--i': 3 }}>
            Tree
          </div>
          <div className={styles.floatingNode} style={{ '--i': 4 }}>
            Hash
          </div>
          <div className={styles.floatingNode} style={{ '--i': 5 }}>
            Graph
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Explore Our Visualizers</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FaDatabase className={styles.featureIcon} />
            <h3>Data Structures</h3>
            <p>
              Interact with Arrays, Linked Lists, Trees, Graphs, and more. See
              how they're built and manipulated.
            </p>
          </div>
          <div className={styles.featureCard}>
            <FaProjectDiagram className={styles.featureIcon} />
            <h3>Algorithms</h3>
            <p>
              Watch sorting, searching, and pathfinding algorithms execute
              step-by-step. Understand the logic visually.
            </p>
          </div>
          <div className={styles.featureCard}>
            <FaCodeBranch className={styles.featureIcon} />
            <h3>Control Flow</h3>
            <p>
              Demystify loops, conditionals, and recursion. See the exact path
              your code takes in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to See Code in a New Light?</h2>
          <p>
            Dive into our services and start your visualization journey today.
            It's free!
          </p>
          <button className={styles.ctaButtonSecondary}>
            Explore Services
          </button>
        </div>
        <div className={styles.ctaImage}>
          <img
            src="https://source.unsplash.com/random/600x400/?abstract,code"
            alt="Abstract Code"
          />
        </div>
      </section>
    </main>
  )
}
