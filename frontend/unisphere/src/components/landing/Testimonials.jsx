import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Naveen Kumar',
    role: ' Information Technology Student',
    rating: 5,
    review:
      'UniSphere helped me quickly understand university regulations and syllabus documents. Instead of searching through hundreds of pages, I simply asked questions and received instant answers.',
  },
  {
    name: 'Priya Sharma',
    role: 'Electronics Engineering Student',
    rating: 5,
    review:
      'The PDF chat feature is extremely useful before exams. I can instantly find course outcomes, objectives, and important topics from large curriculum documents.',
  },
  {
    name: 'Arjun Menon',
    role: 'Computer Science Student',
    rating: 5,
    review:
      'The semantic search is impressive. UniSphere retrieves the exact information from academic PDFs and provides accurate responses.',
  },
  {
    name: 'Kavya R',
    role: 'Placement Preparation Student',
    rating: 5,
    review:
      'UniSphere saves a lot of time when working with regulations, notes, and university handbooks. The interface is clean and easy to use.',
  },
]

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-border'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              Student feedback
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Trusted by students preparing for exams and placements
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-3">
            <div>
              <div className="font-display text-2xl font-semibold text-text-primary">4.9 / 5</div>
              <div className="text-xs text-text-secondary">Average rating</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-semibold text-text-primary">500+</div>
              <div className="text-xs text-text-secondary">Students</div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
              className="rounded-2xl border border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_72%,transparent)] p-6 shadow-card backdrop-blur-md"
            >
              <StarRow rating={r.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-text-primary">
                "{r.review}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] font-display text-sm font-semibold text-white">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{r.name}</div>
                  <div className="text-xs text-text-secondary">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
