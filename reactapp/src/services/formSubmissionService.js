/**
 * Centralized Form Submission Service
 * Handles Contact, Suggestion, and Feedback forms.
 * Sends validated form data to Google Apps Script.
 */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyqfjkICMqbdfsZDZAJqC5DgNaEqLgRgsDIsWihGHuFiVX_Hfi8GWdU936wgUd_orVldA/exec";


/**
 * Form-specific validation schemas.
 */
const FORM_SCHEMAS = {
  contact: {
    required: ["name", "email", "subject", "message"],
    optional: [],
    maxLengths: {
      name: 100,
      email: 254,
      subject: 200,
      message: 5000,
    },
  },

  suggestion: {
    required: [
      "name",
      "email",
      "suggestionTitle",
      "category",
      "description",
    ],
    optional: [],
    maxLengths: {
      name: 100,
      email: 254,
      suggestionTitle: 200,
      category: 100,
      description: 5000,
    },
  },

  feedback: {
    required: [
      "name",
      "email",
      "page",
      "feedbackType",
      "details",
    ],
    optional: ["stepsToReproduce"],
    maxLengths: {
      name: 100,
      email: 254,
      page: 200,
      feedbackType: 100,
      details: 5000,
      stepsToReproduce: 5000,
    },
  },
};


/**
 * Validate and normalize form data.
 */
function validateFormData(formData) {
  if (!formData || typeof formData !== "object") {
    return {
      valid: false,
      error: "Invalid form data.",
    };
  }

  const formType = String(formData.formType || "")
    .trim()
    .toLowerCase();

  const schema = FORM_SCHEMAS[formType];

  if (!schema) {
    return {
      valid: false,
      error: "Invalid form type.",
    };
  }

  const normalizedData = {
    formType,
  };

  // Validate required fields.
  for (const field of schema.required) {
    const value = formData[field];

    if (typeof value !== "string" || !value.trim()) {
      return {
        valid: false,
        error: `${field} is required.`,
      };
    }

    normalizedData[field] = value.trim();
  }

  // Process optional fields.
  for (const field of schema.optional) {
    const value = formData[field];

    if (value !== undefined && value !== null &&
        typeof value !== "string") {
      return {
        valid: false,
        error: `${field} must be a string.`,
      };
    }

    normalizedData[field] =
      typeof value === "string" ? value.trim() : "";
  }

  // Validate field lengths.
  for (const [field, maxLength] of Object.entries(
    schema.maxLengths
  )) {
    if (normalizedData[field].length > maxLength) {
      return {
        valid: false,
        error: `${field} exceeds the maximum length of ${maxLength}.`,
      };
    }
  }

  // Validate email.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(normalizedData.email)) {
    return {
      valid: false,
      error: "Please enter a valid email address.",
    };
  }

  return {
    valid: true,
    data: normalizedData,
  };
}


/**
 * Submit form data to Google Apps Script.
 */
export async function submitForm(formData) {

  // 1. Validate the submitted form.
  const validation = validateFormData(formData);

  if (!validation.valid) {
    console.warn("Form validation failed:", validation.error);

    return {
      success: false,
      error: validation.error,
    };
  }

  const payload = validation.data;

  // 2. Submit to Google Apps Script.
  try {
    console.info(
      `Submitting ${payload.formType} form to Google Apps Script...`
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // no-cors returns an opaque response.
    // Its HTTP status and response body cannot be inspected.
    console.info(
      `${payload.formType} submission request completed.`,
      {
        responseType: response.type,
      }
    );

    return {
      success: true,
      data: {
        formType: payload.formType,
        status: "request_sent",
        message: "Submission request sent. Email delivery is not yet verified.",
        timestamp: new Date().toISOString(),
      },
    };

  } catch (error) {
    console.error(
      `${payload.formType} submission network error:`,
      error
    );

    return {
      success: false,
      error: "Unable to connect to the submission service. Please try again.",
    };
  }
}
