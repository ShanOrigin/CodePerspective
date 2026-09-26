import React, { useState } from 'react'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa'
import AnimatedIcon from '../../../common/AnimatedIcon'
import { submitForm } from '../../../../services/formSubmissionService'
import styles from '../CSS/ContactUs.module.css'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please fill in all required fields.' })
      return
    }

    setStatus({ state: 'loading', message: 'Sending message...' })

    const result = await submitForm({
      formType: 'contact',
      ...formData,
    })

    if (result.success) {
      setStatus({
        state: 'success',
        message: 'Thank you! Your message has been delivered to our team.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus({
        state: 'error',
        message: result.error || 'Failed to deliver message. Please try again or email us directly.',
      })
    }
  }

  return (
    <div className={styles.contactPage}>
      <header className={styles.headerArea}>
        <span className={styles.categoryBadge}>Get In Touch</span>
        <h1 className={styles.pageTitle}>Contact Our Team</h1>
        <p className={styles.pageSubtitle}>
          Have a question about an algorithm visualization, a technical inquiry, or feedback?
          Reach out directly or send us a message below.
        </p>
      </header>

      <div className={styles.contactGrid}>
        {/* Left Side: Contact Information Cards */}
        <div className={styles.infoColumn}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoHeading}>Direct Channels</h2>
            <p className={styles.infoDesc}>
              We are based in Pune, India and actively maintain the CodePerspective visualizers.
            </p>

            <ul className={styles.channelList}>
              <li>
                <a href="mailto:shantanusuryawanshi3.14@gmail.com" className={styles.channelLink}>
                  <AnimatedIcon size="md" variant="inset">
                    <FaEnvelope />
                  </AnimatedIcon>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>Email Address</span>
                    <span className={styles.channelValue}>shantanusuryawanshi3.14@gmail.com</span>
                  </div>
                </a>
              </li>

              <li>
                <a href="tel:9965963535" className={styles.channelLink}>
                  <AnimatedIcon size="md" variant="inset">
                    <FaPhoneAlt />
                  </AnimatedIcon>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>Phone / WhatsApp</span>
                    <span className={styles.channelValue}>+91 9965963535</span>
                  </div>
                </a>
              </li>

              <li>
                <div className={styles.channelLink}>
                  <AnimatedIcon size="md" variant="inset">
                    <FaMapMarkerAlt />
                  </AnimatedIcon>
                  <div className={styles.channelDetails}>
                    <span className={styles.channelLabel}>Location</span>
                    <span className={styles.channelValue}>Pune, India 411003</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Professional Contact Form */}
        <div className={styles.formColumn}>
          <div className={styles.formCard}>
            <h2 className={styles.formHeading}>Send a Message</h2>

            {status.state === 'success' && (
              <div className={styles.successBanner} role="alert">
                <FaCheck className={styles.bannerIcon} />
                <span>{status.message}</span>
              </div>
            )}

            {status.state === 'error' && (
              <div className={styles.errorBanner} role="alert">
                <FaExclamationCircle className={styles.bannerIcon} />
                <span>{status.message}</span>
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Full Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Rivera"
                  className={styles.input}
                  required
                  disabled={status.state === 'loading'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={styles.input}
                  required
                  disabled={status.state === 'loading'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-subject" className={styles.label}>
                  Subject <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Question on Dijkstra step execution"
                  className={styles.input}
                  required
                  disabled={status.state === 'loading'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-message" className={styles.label}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={styles.textarea}
                  required
                  disabled={status.state === 'loading'}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status.state === 'loading'}
              >
                {status.state === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className={styles.btnIcon} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
