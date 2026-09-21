import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaDatabase,
  FaSortAmountDown,
  FaCodeBranch,
  FaLink,
  FaLayerGroup,
  FaMicrochip,
  FaArrowRight,
} from 'react-icons/fa'
import AnimatedIcon from '../../../common/AnimatedIcon'
import styles from './ExploreVisualizers.module.css'

const VISUALIZER_CATEGORIES = [
  {
    id: 'ds',
    title: 'Data Structures',
    description:
      'Interact with Arrays, Trees, Graphs, and Hash Tables. Inspect node connections and memory arrangements.',
    icon: <FaDatabase />,
    route: '/programming/data-structure/array/one-dimensional-array?page=typespage',
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description:
      'Observe comparative sorting step-by-step: Bubble, Selection, Insertion, Quick, and Merge Sort in motion.',
    icon: <FaSortAmountDown />,
    route: '/programming/alorithms/sorting/bubble-sort?page=operationpage',
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    description:
      'Demystify conditionals, loops, nested branches, and recursion paths with synchronous highlighted execution.',
    icon: <FaCodeBranch />,
    route: '/programming/basics/control-flows/if-statement?page=operationpage',
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description:
      'Watch pointer updates during head insertion, deletion, traversal, and reversal across Singly & Doubly lists.',
    icon: <FaLink />,
    route: '/programming/data-structure/linked-list/singly-linked-list/create-sll?page=operationpage',
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    description:
      'Trace LIFO and FIFO execution mechanics with interactive Push, Pop, Enqueue, and Dequeue operations.',
    icon: <FaLayerGroup />,
    route: '/programming/data-structure/stack/stack-push?page=operationpage',
  },
  {
    id: 'bit-ops',
    title: 'Bit Operations',
    description:
      'Examine bit manipulations: binary conversions, masks, bitwise AND, OR, XOR, and bit shift operators.',
    icon: <FaMicrochip />,
    route: '/programming/basics/bit-operators/number-to-binary?page=operationpage',
  },
]

export default function ExploreVisualizers() {
  return (
    <section className={styles.section} aria-labelledby="visualizers-title">
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <h2 id="visualizers-title" className={styles.sectionTitle}>
            Explore Our Visualizers
          </h2>
          <p className={styles.sectionSubtitle}>
            Dive into core programming foundations and algorithmic operations supported directly
            in the CodePerspective visualization engine.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {VISUALIZER_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.route}
              className={styles.card}
              aria-label={`Explore ${cat.title}`}
            >
              <div className={styles.iconWrapper}>
                <AnimatedIcon size="md" variant="inset">
                  {cat.icon}
                </AnimatedIcon>
              </div>
              <h3 className={styles.cardTitle}>{cat.title}</h3>
              <p className={styles.cardDescription}>{cat.description}</p>
              <span className={styles.cardAction}>
                <span>Explore concepts</span>
                <FaArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
