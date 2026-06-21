import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, PlayCircle } from 'lucide-react'
import GradientButton from '../ui/GradientButton.jsx'
import RetrievalVisual from './RetrievalVisual.jsx'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="dot-grid relative overflow-hidden px-6 pb-20 pt-20 sm:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono uppercase tracking-wider text-text-secondary">
            Retrieval-grounded answers
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl">
            Your documents, <span className="text-gradient">ready to answer.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
            Upload university regulations, syllabus, notes, and curriculum documents. Ask
            questions and receive AI-powered answers instantly — grounded in what you uploaded,
            not a guess.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <GradientButton size="lg" icon={ArrowUpRight} iconPosition="right" onClick={() => navigate('/upload')}>
              Upload PDF
            </GradientButton>
            <a href="#demo">
              <GradientButton size="lg" variant="secondary" icon={PlayCircle}>
                View demo
              </GradientButton>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-text-secondary">
            <span className="font-mono">Llama 3.1 8B</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="font-mono">FAISS retrieval</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="font-mono">Session isolated</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <RetrievalVisual />
        </motion.div>
      </div>
    </section>
  )
}
