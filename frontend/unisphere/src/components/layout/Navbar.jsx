import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import GradientButton from '../ui/GradientButton.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled ? 'border-border bg-bg/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="UniSphere home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <GradientButton size="md" icon={ArrowUpRight} iconPosition="right" onClick={() => navigate('/upload')}>
            Upload PDF
          </GradientButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-primary"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border bg-bg md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
              <GradientButton
                size="md"
                icon={ArrowUpRight}
                iconPosition="right"
                onClick={() => {
                  setMobileOpen(false)
                  navigate('/upload')
                }}
              >
                Upload PDF
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
