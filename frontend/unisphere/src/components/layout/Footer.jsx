import Logo from '../ui/Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <Logo size={24} />
        <p className="text-sm text-text-secondary">
          Built for students. Answers are generated from your own uploaded documents.
        </p>
        <p className="text-sm text-text-secondary">© {new Date().getFullYear()} UniSphere</p>
      </div>
    </footer>
  )
}
