import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, UploadCloud } from 'lucide-react'
import ChatSidebar from '../components/chat/ChatSidebar.jsx'
import ChatMessage from '../components/chat/ChatMessage.jsx'
import ChatInput from '../components/chat/ChatInput.jsx'
import EmptyState from '../components/chat/EmptyState.jsx'
import GradientButton from '../components/ui/GradientButton.jsx'
import Logo from '../components/ui/Logo.jsx'
import { askQuestion } from '../api/client.js'
import { useSession } from '../context/SessionContext.jsx'

export default function ChatPage() {
  const { session, addMessage, updateLastMessage, clearSession } = useSession()
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [session?.messages?.length, sending])

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-6 text-center text-text-primary">
        <Logo size={32} />
        <p className="max-w-sm text-sm text-text-secondary">
          No active document session yet. Upload a PDF to start a conversation with it.
        </p>
        <GradientButton icon={UploadCloud} onClick={() => navigate('/upload')}>
          Upload a PDF
        </GradientButton>
      </div>
    )
  }

  const handleNewChat = () => {
    clearSession()
    navigate('/upload')
  }

  const handleSend = async (overrideText) => {
    const question = (overrideText ?? input).trim()
    if (!question || sending) return

    setInput('')
    addMessage({ role: 'user', content: question, timestamp: new Date().toISOString() })
    addMessage({ role: 'assistant', content: '', loading: true })
    setSending(true)

    try {
      const data = await askQuestion(session.sessionId, question)
      updateLastMessage({ content: data.answer, loading: false, timestamp: new Date().toISOString() })
    } catch (err) {
      updateLastMessage({
        content:
          err?.response?.data?.detail ||
          'Could not reach the UniSphere backend for an answer. Please try again.',
        loading: false,
        error: true,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-text-primary">
      <ChatSidebar
        fileName={session.fileName}
        sessionId={session.sessionId}
        onNewChat={handleNewChat}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-3 border-b border-border px-4 py-3 md:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary"
          >
            <Menu size={16} />
          </button>
          <Link to="/">
            <Logo size={22} />
          </Link>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          {session.messages.length === 0 ? (
            <EmptyState fileName={session.fileName} onSuggestion={(s) => handleSend(s)} />
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              {session.messages.map((message, i) => (
                <ChatMessage key={i} message={message} />
              ))}
            </div>
          )}
        </div>

        <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} disabled={sending} />
      </div>
    </div>
  )
}
