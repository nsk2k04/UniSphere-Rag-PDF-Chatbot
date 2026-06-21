import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Plus, X, Hash } from 'lucide-react'
import Logo from '../ui/Logo.jsx'
import ThemeToggle from '../layout/ThemeToggle.jsx'

function SidebarContent({ fileName, sessionId, onNewChat }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" aria-label="UniSphere home">
          <Logo size={24} />
        </Link>
        <ThemeToggle />
      </div>

      <div className="px-5">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary hover:border-primary/50"
        >
          <Plus size={16} />
          New chat
        </button>
      </div>

      <div className="mt-6 px-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
          Active document
        </p>
        <div className="mt-2 flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3">
          <FileText size={16} className="mt-0.5 shrink-0 text-primary" />
          <span className="truncate text-sm text-text-primary" title={fileName}>
            {fileName || 'No document'}
          </span>
        </div>

        {sessionId && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-surface p-3">
            <Hash size={14} className="shrink-0 text-text-secondary" />
            <span className="truncate font-mono text-xs text-text-secondary" title={sessionId}>
              {sessionId}
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto px-5 py-5">
        <p className="text-[11px] leading-relaxed text-text-secondary">
          Answers are grounded in this document only and may not cover everything in it.
        </p>
      </div>
    </div>
  )
}

export default function ChatSidebar({ fileName, sessionId, onNewChat, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border bg-surface/40 md:block">
        <SidebarContent fileName={fileName} sessionId={sessionId} onNewChat={onNewChat} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-bg md:hidden"
            >
              <button
                onClick={onCloseMobile}
                aria-label="Close sidebar"
                className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-secondary"
              >
                <X size={15} />
              </button>
              <SidebarContent fileName={fileName} sessionId={sessionId} onNewChat={onNewChat} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
