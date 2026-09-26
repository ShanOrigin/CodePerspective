import React, { useState } from 'react'
import { FaLightbulb, FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa'
import { submitForm } from '../../../../services/formSubmissionService'
import styles from '../CSS/Suggestions.module.css'

export default function Suggestions() {
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    category: '',
    description: '',
    email: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.topic.trim() || !formData.category || !formData.description.trim()) {
      setStatus({ state: 'error', message: 'Please fill in Name, Title, Category, and Description.' })
      return
    }

    setStatus({ state: 'loading', message: 'Submitting your idea...' })

    const result = await submitForm({
      formType: 'suggestion',
      ...formData,
    })

    if (result.success) {
      setStatus({
        state: 'success',
        message: 'Thank you for your suggestion! Our engineering team will review it.',
      })
      setFormData({ name: '', topic: '', category: '', description: '', email: '' })
    } else {
      setStatus({
        state: 'error',
        message: result.error || 'Failed to submit suggestion. Please try again.',
      })
    }
  }

  return (
    <div className={styles.suggestionsPage}>
      <header className={styles.headerArea}>
        <span className={styles.categoryBadge}>Community Roadmap</span>
        <h1 className={styles.pageTitle}>Have a Visualization Idea?</h1>
        <p className={styles.pageSubtitle}>
          What should we visualize next? A specific algorithm? A complex graph structure?
          Share your idea and help shape the future of CodePerspective.
        </p>
      </header>

      <div className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaLightbulb className={styles.headerIcon} />
          <h2 className={styles.formHeading}>Submit New Suggestion</h2>
        </div>

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
          <div className={styles.twoColumnInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="sugg-name" className={styles.label}>
                Your Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="sugg-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jordan Lee"
                className={styles.input}
                required
                disabled={status.state === 'loading'}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="sugg-email" className={styles.label}>
                Email Address <span className={styles.optional}>(Optional)</span>
              </label>
              <input
                type="email"
                id="sugg-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="In case we have follow-up questions"
                className={styles.input}
                disabled={status.state === 'loading'}
              />
            </div>
          </div>

          <div className={styles.twoColumnInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="sugg-topic" className={styles.label}>
                Suggestion Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="sugg-topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g. Red-Black Tree Balancing or A* Pathfinding"
                className={styles.input}
                required
                disabled={status.state === 'loading'}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="sugg-category" className={styles.label}>
                Category <span className={styles.required}>*</span>
              </label>
              <select
                id="sugg-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
                required
                disabled={status.state === 'loading'}
              >
                <option value="">Select a category...</option>
                <option value="Data Structure">Data Structure</option>
                <option value="Algorithm">Algorithm</option>
                <option value="Control Flow">Control Flow</option>
                <option value="Visualization">Visualization</option>
                <option value="Feature">Feature Request</option>
                <option value="UI/UX">UI / UX Improvement</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="sugg-description" className={styles.label}>
              Description &amp; Why It Would Be Helpful <span className={styles.required}>*</span>
            </label>
            <textarea
              id="sugg-description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us what you would like to see visualized and why this concept is challenging to understand without visual aid..."
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
              <span>Submitting Idea...</span>
            ) : (
              <>
                <span>Submit Idea</span>
                <FaPaperPlane className={styles.btnIcon} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
