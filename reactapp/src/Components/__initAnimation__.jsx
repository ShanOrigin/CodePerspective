import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAnimation from '../Hooks/useAnimation'

/**
 * InitAnimation — mounts the Raphael canvas animation for a given operation.
 *
 * Lifecycle contract:
 *  • On mount  → reset all refs; ready to accept first Start click.
 *  • On click  → import animation module (once), run it, start 10 s cooldown.
 *  • On route change (location.pathname) → abort running animation,
 *                                          cancel countdown interval, reset state.
 *  • On unmount → same cleanup as route change.
 *
 * @param {{ aniName: string }} props - kebab-case operation name from URL segment
 */
const InitAnimation = ({ aniName }) => {
  const imported = useRef(false)
  const animationRef = useRef(null)
  const countdownRef = useRef(null)
  const isDestroyedRef = useRef(false)

  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const location = useLocation()

  // ─── Helpers ────────────────────────────────────────────────────────────

  /** Clears the running countdown interval and resets cooldown state. */
  const clearCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
  }

  /**
   * Starts a visual countdown that re-enables the button after `seconds`.
   * Guards against state updates after component unmount via isDestroyedRef.
   */
  const startCountdown = (seconds) => {
    clearCountdown()
    setCountdown(seconds)

    countdownRef.current = setInterval(() => {
      if (isDestroyedRef.current) return

      setCountdown(prev => {
        if (prev <= 1) {
          clearCountdown()
          setButtonDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  /** Executes the stored animation function. */
  const startAnimation = async () => {
    if (!animationRef.current || !animationRef.current[0]) return
    const [AnimaterFunction, id, AnimationFunction, name, type] = animationRef.current
    try {
      await AnimaterFunction(id, AnimationFunction, name, type)
    } catch (error) {
      console.error('Error running animation:', error)
    }
  }

  /**
   * Converts a kebab-case operation name into the PascalCase function identifier
   * used in the animation module registry, preserving known all-caps tokens
   * like SLL, DLL, HT, AND, OR, NOT, XOR.
   */
  const formatAnimationName = (name) => {
    const PRESERVE_CAPS = ['SLL', 'DLL', 'HT', 'AND', 'OR', 'NOT', 'XOR']
    return name
      .split(/[-_\s]+/)
      .map(word => {
        const match = PRESERVE_CAPS.find(x => x.toLowerCase() === word.toLowerCase())
        if (match) return match
        return word
          .replace(/(\d)([a-zA-Z])/g, (_, num, ch) => num + ch.toUpperCase())
          .replace(/^([a-zA-Z])/, m => m.toUpperCase())
      })
      .join('')
  }

  /**
   * Main entry point — loads the animation module on first call, then starts
   * the animation and the cooldown button timer.
   */
  const importAnimation = async (name = '') => {
    const exeName = formatAnimationName(name)

    if (!imported.current) {
      try {
        const animations = await useAnimation(exeName)
        if (animations?.length > 0) {
          animationRef.current = animations
          imported.current = true
          setButtonDisabled(true)
          await startAnimation()
          startCountdown(10)
        } else {
          console.warn('No animations found for:', exeName)
        }
      } catch (error) {
        console.error('Error importing animation:', error)
      }
    } else {
      setButtonDisabled(true)
      await startAnimation()
      startCountdown(10)
    }
  }

  // ─── Lifecycle ──────────────────────────────────────────────────────────

  /**
   * Reset on route change (pathname change means a different operation was selected).
   * Also resets on component unmount (same cleanup function via return).
   */
  useEffect(() => {
    isDestroyedRef.current = false

    return () => {
      isDestroyedRef.current = true
      clearCountdown()
      imported.current = false
      animationRef.current = null
      setButtonDisabled(false)
      setCountdown(0)
    }
  }, [location.pathname])

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <>
      <div id="Animation-Canvas" />
      <button
        className="btn-grad"
        id={aniName}
        onClick={() => importAnimation(aniName)}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled
          ? `Please Wait... (${countdown}s)`
          : 'Start Animation'}
      </button>
    </>
  )
}

export default InitAnimation
