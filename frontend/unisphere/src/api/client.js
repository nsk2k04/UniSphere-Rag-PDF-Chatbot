import axios from 'axios'

// Base URL of the FastAPI backend. Configure via .env (VITE_API_BASE_URL).
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://unisphere-backend-production.up.railway.app'

export const apiClient = axios.create({
  baseURL,
  timeout: 300000,
})

/**
 * Uploads a PDF to the backend.
 * Backend contract: POST /upload-pdf -> { session_id, filename, status }
 */
export async function uploadPdf(file, { onProgress } = {}) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post('/upload-pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total))x
      }
    },
  })

  return response.data
}

/**
 * Asks a question against a given session's document.
 * Backend contract: GET /chat?session_id=...&question=... -> { session_id, question, answer }
 */
export async function askQuestion(sessionId, question) {
  const response = await apiClient.get('/chat', {
    params: { session_id: sessionId, question },
  })
  return response.data
}

/**
 * Simple health check against GET /
 */
export async function pingBackend() {
  const response = await apiClient.get('/')
  return response.data
}
