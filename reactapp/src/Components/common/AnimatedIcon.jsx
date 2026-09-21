import React from 'react'
import styles from './AnimatedIcon.module.css'

/**
 * AnimatedIcon
 * Wraps an icon with a continuous, elegant subtle ripple/pulse ring animation.
 * The icon itself remains crisp and stable while the outer ring expands and fades.
 *
 * @param {React.ReactNode} children - The icon element (e.g. from react-icons)
 * @param {string} [className] - Additional class name for container
 * @param {string} [size] - 'sm' | 'md' | 'lg' (default: 'md')
 * @param {string} [variant] - 'accent' | 'inset' | 'surface' | 'glass'
 * @param {string} [ariaHidden] - default 'true'
 */
export default function AnimatedIcon({
  children,
  className = '',
  size = 'md',
  variant = 'inset',
  ariaHidden = 'true',
  style = {},
}) {
  const sizeClass = styles[`size_${size}`] || styles.size_md
  const variantClass = styles[`variant_${variant}`] || styles.variant_inset

  return (
    <div
      className={`${styles.rippleWrapper} ${sizeClass} ${variantClass} ${className}`}
      style={style}
      aria-hidden={ariaHidden}
    >
      <span className={styles.rippleRing} aria-hidden="true" />
      <span className={styles.iconContent}>{children}</span>
    </div>
  )
}
