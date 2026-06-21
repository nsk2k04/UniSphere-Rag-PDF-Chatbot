import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const SessionContext = createContext(undefined)
const SESSION_KEY = 'unisphere-session'

function loadStoredSession() {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function SessionProvider({ children }) {
  const [session, setSessionState] = useState(loadStoredSession)

  useEffect(() => {
    if (session) {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      window.sessionStorage.removeItem(SESSION_KEY)
    }
  }, [session])

  const startSession = useCallback(({ sessionId, fileName }) => {
    setSessionState({
      sessionId,
      fileName,
      uploadedAt: new Date().toISOString(),
      messages: [],
    })
  }, [])

  const addMessage = useCallback((message) => {
    setSessionState((prev) => {
      if (!prev) return prev
      return { ...prev, messages: [...prev.messages, message] }
    })
  }, [])

  const updateLastMessage = useCallback((updates) => {
    setSessionState((prev) => {
      if (!prev || prev.messages.length === 0) return prev
      const messages = [...prev.messages]
      messages[messages.length - 1] = { ...messages[messages.length - 1], ...updates }
      return { ...prev, messages }
    })
  }, [])

  const clearSession = useCallback(() => {
    setSessionState(null)
  }, [])

  return (
    <SessionContext.Provider
      value={{ session, startSession, addMessage, updateLastMessage, clearSession }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within a SessionProvider')
  return ctx
}
