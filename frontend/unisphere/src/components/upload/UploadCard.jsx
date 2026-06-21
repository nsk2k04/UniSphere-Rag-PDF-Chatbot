import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import GradientButton from '../ui/GradientButton.jsx'
import { uploadPdf } from '../../api/client.js'
import { useSession } from '../../context/SessionContext.jsx'

const MAX_SIZE_MB = 30

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function UploadCard() {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | uploading | success | error
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { startSession } = useSession()

  const validateAndSetFile = useCallback((selected) => {
    if (!selected) return
    if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
      setStatus('error')
      setErrorMessage('Only PDF files are supported.')
      return
    }
    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setStatus('error')
      setErrorMessage(`File is larger than ${MAX_SIZE_MB} MB.`)
      return
    }
    setFile(selected)
    setStatus('idle')
    setErrorMessage('')
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      validateAndSetFile(e.dataTransfer.files?.[0])
    },
    [validateAndSetFile]
  )

  const handleUpload = async () => {
if (!file) {
//console.log('NO FILE SELECTED')
return
}

//console.log('UPLOAD STARTED')
//console.log('FILE:', file.name)

setStatus('uploading')
setProgress(0)
setErrorMessage('')

try {
const data = await uploadPdf(file, {
onProgress: (percent) => {
//console.log('UPLOAD PROGRESS:', percent)
setProgress(percent)
},
})

//console.log('UPLOAD SUCCESS')
//console.log('BACKEND RESPONSE:', data)

startSession({
  sessionId: data.session_id,
  fileName: data.filename || file.name,
})

//console.log('SESSION CREATED')

setStatus('success')

//console.log('NAVIGATING TO CHAT PAGE')

setTimeout(() => {
  navigate('/chat')
}, 900)

} catch (err) {
console.error('UPLOAD FAILED')
console.error(err)

setStatus('error')

setErrorMessage(
  err?.response?.data?.detail ||
  err?.message ||
  'Processing is taking longer than expected. Please try again.'
)

}
}
const reset = () => {
  setFile(null)
  setStatus('idle')
  setProgress(0)
  setErrorMessage('')

  if (inputRef.current) {
    inputRef.current.value = ''
  }
}
  return (
    <div className="mx-auto w-full max-w-xl">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(e) => validateAndSetFile(e.target.files?.[0])}
      />

      {!file && (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-16 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-primary/50'
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))]">
            <UploadCloud size={24} className="text-white" />
          </div>
          <p className="mt-5 font-display text-lg font-semibold text-text-primary">
            Drag and drop your PDF here
          </p>
          <p className="mt-1.5 text-sm text-text-secondary">
            or click to browse — regulations, syllabus, notes, or handbooks
          </p>
          <p className="mt-4 text-xs font-mono text-text-secondary">PDF only · up to {MAX_SIZE_MB}MB</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg">
                  <FileText size={20} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">{file.name}</p>
                  <p className="text-xs text-text-secondary">{formatSize(file.size)}</p>
                </div>
              </div>
              {status !== 'uploading' && status !== 'success' && (
                <button
                  onClick={reset}
                  aria-label="Remove file"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-bg hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {status === 'uploading' && (
              <div className="mt-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent))]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-text-secondary">
                  <Loader2 size={12} className="animate-spin" />
                  Processing document — {progress}%
                </p>
              </div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-500"
              >
                <CheckCircle2 size={18} />
                Ready — opening chat…
              </motion.div>
            )}

            {status === 'idle' && (
              <GradientButton size="md" className="mt-5 w-full" onClick={handleUpload}>
                Upload &amp; start chat
              </GradientButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'error' && errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex items-start gap-2 overflow-hidden rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-500"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
