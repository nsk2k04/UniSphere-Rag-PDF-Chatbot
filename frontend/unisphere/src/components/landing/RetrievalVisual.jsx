import { motion } from 'framer-motion'
import { FileText, Sparkles } from 'lucide-react'

const FRAGMENTS = [
  { label: 'Regulation 7.4', top: '4%', left: '2%', delay: 0, anim: 'animate-float-slow' },
  { label: 'PEO 1 — Objective', top: '8%', right: '0%', delay: 0.4, anim: 'animate-float-slower' },
  { label: 'CO3 · Syllabus', bottom: '10%', left: '0%', delay: 0.8, anim: 'animate-float' },
  { label: 'Handbook §2.1', bottom: '2%', right: '4%', delay: 1.2, anim: 'animate-float-slow' },
]

/**
 * Signature visual: scattered passages from a student's uploaded document
 * drift inward and resolve into a single grounded answer — the hero's thesis,
 * rendered as motion rather than told as a headline.
 */
export default function RetrievalVisual() {
  return (
    <div id="demo" className="relative mx-auto h-[360px] w-full max-w-xl scroll-mt-24 sm:h-[420px]">
      {/* connecting lines, drawn behind the cards */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none">
        {[
          [60, 60],
          [340, 70],
          [50, 330],
          [350, 340],
        ].map(([x, y], i) => (
          <line
            key={i}
            x1={x}
            y1={y}
            x2="200"
            y2="200"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeDasharray="5 6"
            className="animate-pulse-line"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>

      {FRAGMENTS.map((f, i) => (
        <motion.div
          key={f.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 * i, duration: 0.5 }}
          style={{ position: 'absolute', top: f.top, left: f.left, right: f.right, bottom: f.bottom }}
          className={`${f.anim} flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[11px] font-mono text-text-secondary shadow-card`}
        >
          <FileText size={12} className="shrink-0 text-primary" />
          {f.label}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute left-1/2 top-1/2 w-[78%] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-4 shadow-glow sm:w-[70%]"
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-text-secondary">
          <Sparkles size={14} className="text-accent" />
          Answer
        </div>
        <p className="text-sm leading-relaxed text-text-primary">
          PEO1 focuses on graduates applying core engineering knowledge to solve real-world
          problems, as defined in Regulation 7.4 and Curriculum CO3.
        </p>
      </motion.div>
    </div>
  )
}
