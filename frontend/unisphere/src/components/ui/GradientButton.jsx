import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const variants = {
  primary:
    'text-white shadow-glow bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] hover:brightness-110',
  secondary:
    'bg-surface text-text-primary border border-border hover:border-primary/60 hover:bg-bg',
  ghost: 'text-text-secondary hover:text-text-primary',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

/**
 * Shared CTA button used across landing, upload, and chat surfaces.
 * `as="link"` consumers should pass an onClick / Link wrapper externally.
 */
const GradientButton = forwardRef(function GradientButton(
  { children, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'left', className = '', ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium font-body transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} strokeWidth={2} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} strokeWidth={2} />}
    </motion.button>
  )
})

export default GradientButton
