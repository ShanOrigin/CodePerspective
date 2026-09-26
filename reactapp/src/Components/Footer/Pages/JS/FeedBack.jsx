import React, { useState } from 'react'
import { FaCommentDots, FaPaperPlane, FaCheck, FaExclamationCircle } from 'react-icons/fa'
import { submitForm } from '../../../../services/formSubmissionService'
import styles from '../CSS/Feedback.module.css'

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    page: '',
    type: '',
    feedback: '',
    stepsToReproduce: '',
    email: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.page.trim() || !formData.type || !formData.feedback.trim()) {
      setStatus({ state: 'error', message: 'Please fill in Name, Page/Visualizer, Feedback Type, and Feedback details.' })
      return
    }

    setStatus({ state: 'loading', message: 'Submitting your feedback...' })

    const result = await submitForm({
      formType: 'feedback',
      ...formData,
    })

    if (result.success) {
      setStatus({
        state: 'success',
        message: 'Thank you for your feedback! Your response helps improve CodePerspective.',
      })
      setFormData({ name: '', page: '', type: '', feedback: '', stepsToReproduce: '', email: '' })
    } else {
      setStatus({
        state: 'error',
        message: result.error || 'Failed to submit feedback. Please try again.',
      })
    }
  }

  return (
    <div className={styles.feedbackPage}>
      <header className={styles.headerArea}>
        <span className={styles.categoryBadge}>User Experience</span>
        <h1 className={styles.pageTitle}>Provide Platform Feedback</h1>
        <p className={styles.pageSubtitle}>
          Encountered a bug? Noticed a visualization glitch? Or have a thought on user experience?
          Your feedback is directly monitored by our developers.
        </p>
      </header>

      <div className={styles.formCard}>
        <div className={styles.cardHeader}>
          <FaCommentDots className={styles.headerIcon} />
          <h2 className={styles.formHeading}>Share Your Feedback</h2>
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
              <label htmlFor="fb-name" className={styles.label}>
                Your Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="fb-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sam Morgan"
                className={styles.input}
                required
                disabled={status.state === 'loading'}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="fb-email" className={styles.label}>
                Email Address <span className={styles.optional}>(Optional)</span>
              </label>
              <input
                type="email"
                id="fb-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="For bug resolution updates"
                className={styles.input}
                disabled={status.state === 'loading'}
              />
            </div>
          </div>

          <div className={styles.twoColumnInputs}>
            <div className={styles.inputGroup}>
              <label htmlFor="fb-page" className={styles.label}>
                Page / Visualizer <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="fb-page"
                name="page"
                value={formData.page}
                onChange={handleChange}
                placeholder="e.g. Quick Sort, Single Linked List, or Navigation"
                className={styles.input}
                required
                disabled={status.state === 'loading'}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="fb-type" className={styles.label}>
                Feedback Type <span className={styles.required}>*</span>
              </label>
              <select
                id="fb-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={styles.select}
                required
                disabled={status.state === 'loading'}
              >
                <option value="">Select type...</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Visual Issue">Visual Glitch / Display Issue</option>
                <option value="Content Issue">Content / Text Issue</option>
                <option value="Performance">Performance / Slowdown</option>
                <option value="Suggestion">Usability Suggestion</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="fb-text" className={styles.label}>
              Feedback Details <span className={styles.required}>*</span>
            </label>
            <textarea
              id="fb-text"
              name="feedback"
              rows="5"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Describe what happened or what could be improved..."
              className={styles.textarea}
              required
              disabled={status.state === 'loading'}
            />
          </div>

          {formData.type === 'Bug Report' && (
            <div className={styles.inputGroup}>
              <label htmlFor="fb-steps" className={styles.label}>
                Steps to Reproduce <span className={styles.optional}>(Helpful for bugs)</span>
              </label>
              <textarea
                id="fb-steps"
                name="stepsToReproduce"
                rows="3"
                value={formData.stepsToReproduce}
                onChange={handleChange}
                placeholder="1. Click on Step button&#10;2. Observe pointer misalignment..."
                className={styles.textarea}
                disabled={status.state === 'loading'}
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={status.state === 'loading'}
          >
            {status.state === 'loading' ? (
              <span>Submitting Feedback...</span>
            ) : (
              <>
                <span>Submit Feedback</span>
                <FaPaperPlane className={styles.btnIcon} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
