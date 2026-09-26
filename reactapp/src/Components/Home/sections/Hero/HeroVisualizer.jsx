import React, { useState, useEffect } from 'react'

const NODES = {
  S: { id: 'S', label: 'S', x: 60, y: 140, title: 'Start' },
  A: { id: 'A', label: 'A', x: 160, y: 65, title: 'Node A' },
  B: { id: 'B', label: 'B', x: 170, y: 215, title: 'Node B' },
  C: { id: 'C', label: 'C', x: 280, y: 55, title: 'Node C' },
  D: { id: 'D', label: 'D', x: 290, y: 195, title: 'Node D' },
  E: { id: 'E', label: 'E', x: 380, y: 100, title: 'Node E' },
  T: { id: 'T', label: 'T', x: 440, y: 190, title: 'Target' },
}

const EDGES = [
  { id: 'S-A', from: 'S', to: 'A', weight: 4 },
  { id: 'S-B', from: 'S', to: 'B', weight: 2 },
  { id: 'A-C', from: 'A', to: 'C', weight: 5 },
  { id: 'A-D', from: 'A', to: 'D', weight: 8 },
  { id: 'B-D', from: 'B', to: 'D', weight: 3 },
  { id: 'C-E', from: 'C', to: 'E', weight: 2 },
  { id: 'D-E', from: 'D', to: 'E', weight: 4 },
  { id: 'D-T', from: 'D', to: 'T', weight: 6 },
  { id: 'E-T', from: 'E', to: 'T', weight: 2 },
]

const STAGES = [
  {
    step: 0,
    text: 'Init: dist(S)=0, PriorityQueue: [S(0)]',
    activeNodes: ['S'],
    visitedNodes: [],
    activeEdges: [],
    pathEdges: [],
    distances: { S: 0, A: '∞', B: '∞', C: '∞', D: '∞', E: '∞', T: '∞' },
  },
  {
    step: 1,
    text: 'Relaxing neighbors from S: A(4), B(2)',
    activeNodes: ['S', 'A', 'B'],
    visitedNodes: ['S'],
    activeEdges: ['S-A', 'S-B'],
    pathEdges: [],
    distances: { S: 0, A: 4, B: 2, C: '∞', D: '∞', E: '∞', T: '∞' },
  },
  {
    step: 2,
    text: 'Extract min: Node B (dist 2) visited',
    activeNodes: ['B'],
    visitedNodes: ['S', 'B'],
    activeEdges: [],
    pathEdges: [],
    distances: { S: 0, A: 4, B: 2, C: '∞', D: '∞', E: '∞', T: '∞' },
  },
  {
    step: 3,
    text: 'Relaxing from B: D updated to 2 + 3 = 5',
    activeNodes: ['B', 'D'],
    visitedNodes: ['S', 'B'],
    activeEdges: ['B-D'],
    pathEdges: [],
    distances: { S: 0, A: 4, B: 2, C: '∞', D: 5, E: '∞', T: '∞' },
  },
  {
    step: 4,
    text: 'Extract min: Node A (dist 4). Relaxing C(9)',
    activeNodes: ['A', 'C'],
    visitedNodes: ['S', 'B', 'A'],
    activeEdges: ['A-C'],
    pathEdges: [],
    distances: { S: 0, A: 4, B: 2, C: 9, D: 5, E: '∞', T: '∞' },
  },
  {
    step: 5,
    text: 'Extract min: Node D (dist 5). Relaxing T(11)',
    activeNodes: ['D', 'T'],
    visitedNodes: ['S', 'B', 'A', 'D'],
    activeEdges: ['D-T', 'D-E'],
    pathEdges: [],
    distances: { S: 0, A: 4, B: 2, C: 9, D: 5, E: 9, T: 11 },
  },
  {
    step: 6,
    text: 'Target T reached with minimal cost = 11!',
    activeNodes: ['T'],
    visitedNodes: ['S', 'B', 'A', 'D', 'E', 'T'],
    activeEdges: [],
    pathEdges: ['S-B', 'B-D', 'D-T'],
    distances: { S: 0, A: 4, B: 2, C: 9, D: 5, E: 9, T: 11 },
  },
  {
    step: 7,
    text: 'Optimal Path: S → B → D → T (Cost: 11)',
    activeNodes: ['S', 'B', 'D', 'T'],
    visitedNodes: ['S', 'B', 'A', 'D', 'E', 'T'],
    activeEdges: [],
    pathEdges: ['S-B', 'B-D', 'D-T'],
    distances: { S: 0, A: 4, B: 2, C: 9, D: 5, E: 9, T: 11 },
  },
]

export default function HeroVisualizer({ onLogUpdate }) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)

  useEffect(() => {
    const stage = STAGES[currentStageIndex]
    if (onLogUpdate) {
      onLogUpdate(stage.text)
    }

    const isLastStage = currentStageIndex === STAGES.length - 1
    const delay = isLastStage ? 3800 : 1600

    const timer = setTimeout(() => {
      setCurrentStageIndex((prev) => (prev + 1) % STAGES.length)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentStageIndex, onLogUpdate])

  const stage = STAGES[currentStageIndex]

  return (
    <svg
      viewBox="0 0 500 280"
      className="graphSvg"
      aria-label="Dijkstra Algorithm Visualization"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Edges */}
      {EDGES.map((edge) => {
        const u = NODES[edge.from]
        const v = NODES[edge.to]
        const isPath = stage.pathEdges.includes(edge.id)
        const isActive = stage.activeEdges.includes(edge.id)

        let strokeColor = 'var(--color-border)'
        let strokeWidth = 2
        let filter = ''

        if (isPath) {
          strokeColor = 'var(--color-accent)'
          strokeWidth = 3.5
          filter = 'url(#glow)'
        } else if (isActive) {
          strokeColor = 'var(--color-accent-secondary)'
          strokeWidth = 2.5
        }

        const midX = (u.x + v.x) / 2
        const midY = (u.y + v.y) / 2

        return (
          <g key={edge.id}>
            <line
              x1={u.x}
              y1={u.y}
              x2={v.x}
              y2={v.y}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={isActive ? '4 3' : 'none'}
              filter={filter}
              style={{ transition: 'all 0.4s ease' }}
            />
            {/* Edge Weight Badge */}
            <circle
              cx={midX}
              cy={midY}
              r={9}
              fill="var(--color-surface)"
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={midX}
              y={midY + 3.5}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="var(--color-text-muted)"
            >
              {edge.weight}
            </text>
          </g>
        )
      })}

      {/* Nodes */}
      {Object.values(NODES).map((node) => {
        const isPath = stage.pathEdges.some(
          (edgeId) => edgeId.startsWith(node.id) || edgeId.endsWith(node.id)
        )
        const isActive = stage.activeNodes.includes(node.id)
        const isVisited = stage.visitedNodes.includes(node.id)
        const dist = stage.distances[node.id]

        let nodeFill = 'var(--color-surface)'
        let nodeStroke = 'var(--color-border)'
        let textColor = 'var(--color-text-primary)'
        let strokeWidth = 2
        let filter = 'url(#nodeShadow)'

        if (isPath) {
          nodeFill = 'var(--color-accent)'
          nodeStroke = '#ffffff'
          textColor = '#ffffff'
          strokeWidth = 3
          filter = 'url(#glow)'
        } else if (isActive) {
          nodeFill = 'var(--color-surface-raised)'
          nodeStroke = 'var(--color-accent)'
          textColor = 'var(--color-accent)'
          strokeWidth = 2.5
        } else if (isVisited) {
          nodeFill = 'var(--color-surface-inset)'
          nodeStroke = 'var(--color-accent-secondary)'
          textColor = 'var(--color-text-secondary)'
        }

        return (
          <g key={node.id} style={{ transition: 'all 0.4s ease' }}>
            {/* Outer ring for active node */}
            {isActive && (
              <circle
                cx={node.x}
                cy={node.y}
                r={24}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                opacity={0.5}
                strokeDasharray="3 3"
              />
            )}

            {/* Main Node Circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={18}
              fill={nodeFill}
              stroke={nodeStroke}
              strokeWidth={strokeWidth}
              filter={filter}
            />

            {/* Node Identifier */}
            <text
              x={node.x}
              y={node.y + 4.5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill={textColor}
            >
              {node.label}
            </text>

            {/* Distance pill below node */}
            <g transform={`translate(${node.x}, ${node.y + 26})`}>
              <rect
                x={-16}
                y={-8}
                width={32}
                height={15}
                rx={7.5}
                fill="var(--color-surface-inset)"
                stroke="var(--color-border)"
                strokeWidth={0.8}
              />
              <text
                x={0}
                y={3}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fill="var(--color-text-muted)"
              >
                {dist}
              </text>
            </g>
          </g>
        )
      })}
    </svg>
  )
}
