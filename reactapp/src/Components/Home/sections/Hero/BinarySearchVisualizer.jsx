import React, { useState, useEffect } from 'react'

const ARRAY_DATA = [
  { val: 4, label: '0' },
  { val: 9, label: '1' },
  { val: 15, label: '2' },
  { val: 23, label: '3' },
  { val: 38, label: '4' },
  { val: 42, label: '5' },
  { val: 56, label: '6' },
  { val: 67, label: '7' },
  { val: 81, label: '8' },
  { val: 94, label: '9' },
]

const TARGET = 42

const STAGES = [
  {
    step: 0,
    low: 0,
    high: 9,
    mid: null,
    found: false,
    log: 'Starting Binary Search for target value: 42',
  },
  {
    step: 1,
    low: 0,
    high: 9,
    mid: 4,
    found: false,
    log: 'Check mid index 4 (val: 38) < 42. Discard left half.',
  },
  {
    step: 2,
    low: 5,
    high: 9,
    mid: null,
    found: false,
    log: 'Update search window: low=5, high=9',
  },
  {
    step: 3,
    low: 5,
    high: 9,
    mid: 7,
    found: false,
    log: 'Check mid index 7 (val: 67) > 42. Discard right half.',
  },
  {
    step: 4,
    low: 5,
    high: 6,
    mid: null,
    found: false,
    log: 'Update search window: low=5, high=6',
  },
  {
    step: 5,
    low: 5,
    high: 6,
    mid: 5,
    found: true,
    log: 'Mid index 5 matches target 42! Element found in O(log n).',
  },
  {
    step: 6,
    low: 5,
    high: 5,
    mid: 5,
    found: true,
    log: 'Target element 42 confirmed at index 5. Search complete.',
  },
]

export default function BinarySearchVisualizer({ onLogUpdate }) {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  const currentStage = STAGES[stageIndex]

  useEffect(() => {
    if (onLogUpdate) {
      onLogUpdate(currentStage.log)
    }
  }, [stageIndex, onLogUpdate, currentStage.log])

  const itemWidth = 46
  const itemGap = 8
  const startX = 25
  const baselineY = 120

  return (
    <svg
      viewBox="0 0 580 260"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-label="Binary search visualizer interactive graph"
    >
      <defs>
        <linearGradient id="bsActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="bsFoundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="bsMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="bsGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Target indicator banner */}
      <g transform="translate(25, 25)">
        <rect
          x="0"
          y="0"
          width="170"
          height="32"
          rx="8"
          fill="var(--color-surface-inset)"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        <text
          x="12"
          y="20"
          fill="var(--color-text-secondary)"
          fontSize="12"
          fontWeight="600"
          fontFamily="inherit"
        >
          Target: <tspan fill="var(--color-accent)" fontWeight="800">42</tspan>
        </text>
        <text
          x="105"
          y="20"
          fill="var(--color-text-muted)"
          fontSize="11"
          fontWeight="500"
          fontFamily="inherit"
        >
          (O(log n))
        </text>
      </g>

      {/* Search window indicator bar */}
      {currentStage.low !== null && currentStage.high !== null && (
        <rect
          x={startX + currentStage.low * (itemWidth + itemGap) - 4}
          y={baselineY - 10}
          width={(currentStage.high - currentStage.low + 1) * (itemWidth + itemGap) - itemGap + 8}
          height={68}
          rx="12"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.45"
          style={{ transition: 'all 0.4s ease' }}
        />
      )}

      {/* Array elements */}
      {ARRAY_DATA.map((item, idx) => {
        const x = startX + idx * (itemWidth + itemGap)
        const y = baselineY
        const isInRange = idx >= currentStage.low && idx <= currentStage.high
        const isMid = idx === currentStage.mid
        const isFound = currentStage.found && idx === currentStage.mid

        let rectFill = 'var(--color-surface)'
        let strokeColor = 'var(--color-border)'
        let strokeWidth = 1
        let textColor = 'var(--color-text-primary)'
        let scale = 1

        if (isFound) {
          rectFill = 'url(#bsFoundGrad)'
          strokeColor = '#10b981'
          textColor = '#ffffff'
          scale = 1.08
        } else if (isMid) {
          rectFill = 'url(#bsMidGrad)'
          strokeColor = '#f59e0b'
          textColor = '#ffffff'
          scale = 1.05
        } else if (isInRange) {
          rectFill = 'var(--color-surface-raised)'
          strokeColor = 'var(--color-accent)'
          textColor = 'var(--color-text-primary)'
        } else {
          rectFill = 'var(--color-surface-inset)'
          strokeColor = 'var(--color-border)'
          textColor = 'var(--color-text-muted)'
        }

        return (
          <g
            key={idx}
            transform={`translate(${x + itemWidth / 2}, ${y + 24}) scale(${scale}) translate(-${x + itemWidth / 2}, -${y + 24})`}
            style={{ transition: 'all 0.35s ease', opacity: isInRange ? 1 : 0.4 }}
          >
            {/* Box */}
            <rect
              x={x}
              y={y}
              width={itemWidth}
              height={48}
              rx="8"
              fill={rectFill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              filter={isFound ? 'url(#bsGlow)' : undefined}
            />
            {/* Value */}
            <text
              x={x + itemWidth / 2}
              y={y + 29}
              textAnchor="middle"
              fill={textColor}
              fontSize="15"
              fontWeight="700"
              fontFamily="Fira Code, monospace"
            >
              {item.val}
            </text>
            {/* Index label */}
            <text
              x={x + itemWidth / 2}
              y={y + 64}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="11"
              fontWeight="500"
              fontFamily="Fira Code, monospace"
            >
              [{idx}]
            </text>
          </g>
        )
      })}

      {/* Pointers: Low, High, Mid */}
      {currentStage.low !== null && (
        <g
          transform={`translate(${startX + currentStage.low * (itemWidth + itemGap) + itemWidth / 2}, ${baselineY - 14})`}
          style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <text
            x="0"
            y="-10"
            textAnchor="middle"
            fill="var(--color-accent)"
            fontSize="11"
            fontWeight="800"
            fontFamily="inherit"
          >
            L
          </text>
          <path d="M-4,-4 L0,2 L4,-4 Z" fill="var(--color-accent)" />
        </g>
      )}

      {currentStage.high !== null && (
        <g
          transform={`translate(${startX + currentStage.high * (itemWidth + itemGap) + itemWidth / 2}, ${baselineY - 14})`}
          style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <text
            x="0"
            y="-10"
            textAnchor="middle"
            fill="var(--color-accent-secondary)"
            fontSize="11"
            fontWeight="800"
            fontFamily="inherit"
          >
            H
          </text>
          <path d="M-4,-4 L0,2 L4,-4 Z" fill="var(--color-accent-secondary)" />
        </g>
      )}

      {currentStage.mid !== null && (
        <g
          transform={`translate(${startX + currentStage.mid * (itemWidth + itemGap) + itemWidth / 2}, ${baselineY + 84})`}
          style={{ transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <path d="M-4,4 L0,-2 L4,4 Z" fill="#f59e0b" />
          <text
            x="0"
            y="18"
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="11"
            fontWeight="800"
            fontFamily="inherit"
          >
            MID
          </text>
        </g>
      )}
    </svg>
  )
}
