export function SkeletonLine({ className = '' }) {
  return <div className={`skeleton animate-shimmer rounded-md ${className}`} />
}

export function SkeletonChatBubble({ align = 'left' }) {
  return (
    <div className={`flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div className="w-2/3 max-w-md space-y-2 rounded-2xl border border-border bg-surface p-4">
        <SkeletonLine className="h-3 w-5/6" />
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-2/3" />
      </div>
    </div>
  )
}
