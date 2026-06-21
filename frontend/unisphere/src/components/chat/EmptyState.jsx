import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  'Summarize the key points of this document',
  'What are the program educational objectives?',
  'List the important topics for exams',
  'Explain this in simpler terms',
]

export default function EmptyState({ fileName, onSuggestion }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))]"
      >
        <Sparkles size={22} className="text-white" />
      </motion.div>
      <h2 className="mt-5 font-display text-xl font-semibold text-text-primary">
        Ask anything about {fileName || 'your document'}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        Answers are generated only from the content of the file you uploaded.
      </p>

      <div className="mt-7 grid w-full max-w-md gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-left text-sm text-text-secondary transition-colors hover:border-primary/50 hover:text-text-primary"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
