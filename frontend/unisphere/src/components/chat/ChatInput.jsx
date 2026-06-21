import { useRef } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) onSend()
    }
  }

  return (
    <div className="border-t border-border bg-bg px-4 py-4 sm:px-8">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-border bg-surface p-2 pl-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask a question about your document…"
          className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
        />
        <button
          onClick={onSend}
          disabled={disabled || !value.trim()}
          aria-label="Send question"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white transition-opacity disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-text-secondary">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  )
}
