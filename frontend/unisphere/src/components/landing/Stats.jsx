import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { value: 1000, suffix: '+', label: 'Documents Processed' },
  { value: 5000, suffix: '+', label: 'Questions Answered' },
  { value: 95, suffix: '%', label: 'Answer Accuracy' },
  { value: '24/7', suffix: '', label: 'AI Assistance', static: true },
]

function AnimatedCounter({ target, suffix, isStatic }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(isStatic ? target : 0)

  useEffect(() => {
    if (!inView || isStatic) return
    const duration = 1200
    const start = performance.now()

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, isStatic])

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-text-primary sm:text-5xl">
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="border-y border-border bg-surface/40 px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} isStatic={stat.static} />
            <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
