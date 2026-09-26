import React from 'react'
import { FaCogs, FaLightbulb, FaLaptopCode } from 'react-icons/fa'
import AnimatedIcon from '../../../common/AnimatedIcon'
import styles from './Showcase.module.css'
import homedemo from '../../../Header/Images/homedemo.jpg'

export default function Showcase() {
  return (
    <section className={styles.section} aria-labelledby="showcase-title">
      <div className={styles.container}>
        {/* Left Information */}
        <div className={styles.contentLeft}>
          <h2 id="showcase-title" className={styles.sectionTitle}>
            Ready to See Code in a New Light?
          </h2>
          <p className={styles.sectionDescription}>
            CodePerspective bridges the gap between abstract computer science theory and
            real-time program execution. By rendering internal states visually, complex logic
            becomes intuitive, engaging, and directly comprehensible.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <AnimatedIcon size="sm" variant="inset">
                <FaLightbulb />
              </AnimatedIcon>
              <div className={styles.featureText}>
                <span className={styles.featureHeading}>Interactive Mental Models</span>
                <span className={styles.featureDetail}>
                  Eliminate guesswork by watching pointers shift, nodes link, and arrays resize
                  step-by-step during runtime execution.
                </span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <AnimatedIcon size="sm" variant="inset">
                <FaCogs />
              </AnimatedIcon>
              <div className={styles.featureText}>
                <span className={styles.featureHeading}>Algorithmic Transparency</span>
                <span className={styles.featureDetail}>
                  Observe comparative passes and partition boundaries in sorting algorithms
                  operating at human speed with real-time feedback.
                </span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <AnimatedIcon size="sm" variant="inset">
                <FaLaptopCode />
              </AnimatedIcon>
              <div className={styles.featureText}>
                <span className={styles.featureHeading}>Broad Curriculum Coverage</span>
                <span className={styles.featureDetail}>
                  Explore foundational data structures, control flow branching, linked structures,
                  and low-level bit operations in a single unified workbench.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.imageRight}>
          <div className={styles.imageFrame}>
            <img
              src={homedemo}
              alt="CodePerspective Visual Programming Platform"
              className={styles.showcaseImage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
