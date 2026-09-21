import React from 'react'
import { FaMousePointer, FaCode, FaCheckCircle } from 'react-icons/fa'
import AnimatedIcon from '../../../common/AnimatedIcon'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    number: '01',
    title: 'Select a Topic',
    description:
      'Choose from data structures, sorting routines, linked lists, or bitwise operations in the navigation catalog.',
    icon: <FaMousePointer />,
  },
  {
    number: '02',
    title: 'Interact & See',
    description:
      'Trigger insertions, steps, or searches. Watch pointers, memory blocks, and algorithmic passes update dynamically.',
    icon: <FaCode />,
  },
  {
    number: '03',
    title: 'Master the Concept',
    description:
      'Connect abstract syntax to tangible runtime behavior, reinforcing mental models with live visual feedback.',
    icon: <FaCheckCircle />,
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-it-works-title">
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <h2 id="how-it-works-title" className={styles.sectionTitle}>
            How It Works
          </h2>
          <p className={styles.sectionSubtitle}>
            A streamlined, interactive pathway designed to build intuition for complex algorithmic logic.
          </p>
        </div>

        <div className={styles.pipeline}>
          {STEPS.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className={styles.stepCard}>
                <span className={styles.stepBadge}>STEP {step.number}</span>
                <div className={styles.iconContainer}>
                  <AnimatedIcon size="lg" variant="inset">
                    {step.icon}
                  </AnimatedIcon>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {index < STEPS.length - 1 && (
                <div className={styles.connectorWrapper} aria-hidden="true">
                  <div className={styles.connectorLine}>
                    <div className={styles.connectorDot} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
