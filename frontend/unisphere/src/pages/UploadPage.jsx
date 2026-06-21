import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import UploadCard from '../components/upload/UploadCard.jsx'

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text-primary">
      <Navbar />
      <main className="dot-grid flex flex-1 items-center px-6 py-20">
        <div className="mx-auto w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              Step 1 of 2
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Upload a document to start
            </h1>
            <p className="mt-3 text-sm text-text-secondary">
              Your file is parsed, chunked, and embedded into its own isolated session.
            </p>
          </motion.div>
          <UploadCard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
