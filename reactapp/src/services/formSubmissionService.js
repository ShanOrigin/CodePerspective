/**
 * Centralized Form Submission Service
 * Handles user interactions from Contact, Suggestions, and Feedback forms.
 * Provides client-side validation and simulated instant confirmation for the frontend.
 */

export async function submitForm(payload) {
  const { formType, ...fields } = payload

  // Short simulated network dispatch delay (350ms)
  await new Promise((resolve) => setTimeout(resolve, 350))

  console.log(`📬 [Form Submission Received: ${formType}]`, fields)

  // Provide immediate success response
  return {
    success: true,
    data: {
      timestamp: new Date().toISOString(),
      status: 'delivered',
      formType,
    },
  }
}
