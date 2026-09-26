import React from 'react'
import styles from '../CSS/Services.module.css'
import {
  FaDiceD6,
  FaProjectDiagram,
  FaCodeBranch,
  FaLaptopCode,
  FaBookOpen,
  FaLightbulb,
} from 'react-icons/fa'

const services = [
  {
    icon: <FaDiceD6 />,
    title: 'Data Structure Visualizer',
    description:
      'Interact with Arrays, Linked Lists, Stacks, Queues, Trees (BST, AVL), and Graphs. Add, remove, and search for nodes in real-time.',
  },
  {
    icon: <FaProjectDiagram />,
    title: 'Algorithm Step-Through',
    description:
      'See sorting algorithms (Bubble, Merge, Quick) and pathfinding (Dijkstra, A*) execute line by line. Control the speed and see the logic unfold.',
  },
  {
    icon: <FaCodeBranch />,
    title: 'Control Flow Diagrams',
    description:
      'Understand how "for" loops, "while" loops, and "if/else" statements work. We map the flow of execution visually for any code snippet.',
  },
  {
    icon: <FaBookOpen />,
    title: 'Programming Basics',
    description:
      'New to code? We break down the fundamentals of data types (strings, integers, booleans), variables, and operators in a simple, visual way.',
  },
  {
    icon: <FaLaptopCode />,
    title: 'String Manipulation',
    description:
      'Visualize string methods like slicing, concatenating, searching, and replacing. See how strings are stored and manipulated in memory.',
  },
  {
    icon: <FaLightbulb />,
    title: 'Problem Challenges',
    description:
      'Test your knowledge with our curated list of problems. Use our visualizers to help you build and debug your solution.',
  },
]

const Services = () => {
  return (
    <main className={styles.servicesPage}>
      <h1 className={styles.pageTitle}>What We Offer</h1>
      <p className={styles.pageSubtitle}>
        A complete toolkit to help you visualize and understand the core
        concepts of computer science.
      </p>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Services
