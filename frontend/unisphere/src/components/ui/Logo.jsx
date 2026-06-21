/**
 * UniSphere signature mark: a document outline with a small orbiting node,
 * representing a single passage being retrieved and surfaced as an answer.
 * Reused at different sizes across the navbar, sidebar, and footer.
 */
export default function Logo({ size = 28, withWordmark = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect x="5" y="3" width="18" height="24" rx="3" stroke="var(--color-primary)" strokeWidth="2" />
        <line x1="9" y1="10" x2="17" y2="10" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="14" x2="15" y2="14" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <circle cx="24" cy="21" r="5.5" fill="var(--color-accent)" />
        <path d="M22 21l1.4 1.4L26.2 19.4" stroke="var(--color-surface)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {withWordmark && (
        <span className="font-display font-semibold text-[1.2rem] tracking-tight text-text-primary">
          UniSphere
        </span>
      )}
    </span>
  )
}
