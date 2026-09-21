import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import AnimatedIcon from '../common/AnimatedIcon'
import styles from './Footer.module.css'
import FootLinks from './SubComponents/FootLinks'
import SocialMediaIcons from './SubComponents/SocialMediaIcons'

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Contact Info */}
        <div className={styles.contactGrid}>
          <a href="tel:9965963535" className={styles.contactItem}>
            <AnimatedIcon size="md" variant="inset">
              <FaPhoneAlt />
            </AnimatedIcon>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Contact</span>
              <span className={styles.contactValue}>9965963535</span>
            </div>
          </a>

          <a href="mailto:shantanusuryawanshi3.14@gmail.com" className={styles.contactItem}>
            <AnimatedIcon size="md" variant="inset">
              <FaEnvelope />
            </AnimatedIcon>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>shantanusuryawanshi3.14@gmail.com</span>
            </div>
          </a>

          <div className={styles.contactItem}>
            <AnimatedIcon size="md" variant="inset">
              <FaMapMarkerAlt />
            </AnimatedIcon>
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Address</span>
              <span className={styles.contactValue}>Pune, India 411003</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={styles.linksNav} aria-label="Footer Navigation">
          <ul className={styles.linksList}>
            <FootLinks linkItemClass={styles.linkItem} />
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className={styles.socialSection}>
          <SocialMediaIcons buttonClass={styles.socialButton} />
        </div>

        {/* Copyright */}
        <div className={styles.copyrightBar}>
          © {new Date().getFullYear()} PersPective. Visualizing algorithms &amp; code. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
