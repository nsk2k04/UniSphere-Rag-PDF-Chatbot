import { motion } from 'framer-motion'
import { Sparkles, User, AlertCircle } from 'lucide-react'
import { SkeletonChatBubble } from '../ui/Skeleton.jsx'

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  if (message.loading) {
    return <SkeletonChatBubble align="left" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-bg border border-border text-text-secondary'
            : 'bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white'
        }`}
      >
        {isUser ? <User size={15} /> : <Sparkles size={15} />}
      </div>

      <div className={`flex max-w-[75%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white'
              : message.error
              ? 'border border-red-500/30 bg-red-500/5 text-red-500'
              : 'border border-border bg-surface text-text-primary'
          }`}
        >
          {message.error && (
            <span className="mb-1 flex items-center gap-1.5 text-xs font-medium">
              <AlertCircle size={13} /> Couldn’t get an answer
            </span>
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {message.timestamp && (
          <span className="mt-1 px-1 text-[11px] text-text-secondary">{formatTime(message.timestamp)}</span>
        )}
      </div>
    </motion.div>
  )
}
