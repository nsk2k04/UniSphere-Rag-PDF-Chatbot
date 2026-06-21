import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? <Moon size={17} /> : <Sun size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
