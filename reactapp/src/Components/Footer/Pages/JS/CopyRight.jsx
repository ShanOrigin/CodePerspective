import React from 'react'
import styles from '../CSS/Copyright.module.css'

export default function Copyright() {
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.copyrightPage}>
      <article className={styles.documentCard}>
        <header className={styles.docHeader}>
          <span className={styles.legalBadge}>Legal Notice</span>
          <h1 className={styles.pageTitle}>Copyright &amp; Terms of Use</h1>
          <p className={styles.lastUpdated}>Last Updated: January 2026</p>
        </header>

        <div className={styles.docBody}>
          <section className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>1. General Terms &amp; Scope</h2>
            <p>
              Welcome to <strong>CodePerspective</strong>. By accessing or using the CodePerspective
              platform, website, and interactive visualization tools, you acknowledge that you have read,
              understood, and agree to be bound by the terms and conditions set forth herein.
            </p>
            <p>
              CodePerspective is developed as an interactive educational environment dedicated to
              demystifying computer science algorithms and data structures through real-time state visualization.
            </p>
          </section>

          <section className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>2. Intellectual Property Rights</h2>
            <p>
              All software, source code, interactive visual models, SVG graphics, algorithms,
              user interface components, documentation, and design assets on this platform
              are the proprietary intellectual property of CodePerspective and its creator,
              Shantanu Suryawanshi, protected by applicable copyright, trademark, and international
              intellectual property treaties.
            </p>
            <p>
              All rights not expressly granted under these Terms are reserved by CodePerspective.
            </p>
          </section>

          <section className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>3. Educational Fair Use License</h2>
            <p>
              Permission is granted to individuals, educators, and students to access, view, and interact
              with the CodePerspective visualizations for personal, non-commercial, and classroom educational
              purposes, subject to the following restrictions:
            </p>
            <ul className={styles.bulletList}>
              <li>You may not modify, distribute, or create derivative works from the visual algorithms without explicit prior written authorization.</li>
              <li>You may not mirror, scrape, or systematically extract the visualization engine for commercial training or distribution.</li>
              <li>You may not remove, obscure, or alter any copyright, author attribution, or proprietary notices from any part of the platform.</li>
              <li>You may not reverse-engineer or decompile underlying proprietary visualization routines.</li>
            </ul>
          </section>

          <section className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>4. Accuracy &amp; Technical Disclaimer</h2>
            <p>
              The visualizations, runtime step sequences, and educational descriptions provided by
              CodePerspective are offered &ldquo;as is&rdquo; without warranties of any kind, either express
              or implied. While every effort is made to maintain algorithmic correctness and adherence to
              established computer science standards, CodePerspective does not guarantee error-free
              or uninterrupted simulation execution.
            </p>
          </section>

          <section className={styles.sectionBlock}>
            <h2 className={styles.sectionHeading}>5. Copyright Notice &amp; Inquiries</h2>
            <p>
              Copyright &copy; {currentYear} <strong>CodePerspective</strong>. All Rights Reserved.
            </p>
            <p className={styles.contactNotice}>
              For intellectual property permissions, educational licensing, or academic citations, please contact:
              <br />
              <a href="mailto:shantanusuryawanshi3.14@gmail.com" className={styles.legalLink}>
                shantanusuryawanshi3.14@gmail.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
