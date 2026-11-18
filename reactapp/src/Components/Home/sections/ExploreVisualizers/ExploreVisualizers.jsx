import { Link } from "react-router-dom";
import {
  FaDatabase,
  FaSortAmountDown,
  FaLink,
  FaLayerGroup,
  FaMicrochip,
  FaArrowRight,
  FaTable,
  FaProjectDiagram,
  FaStream,
  FaCodeBranch,
} from "react-icons/fa";
import AnimatedIcon from "../../../common/AnimatedIcon";
import styles from "./ExploreVisualizers.module.css";

const VISUALIZER_CATEGORIES = [
  {
    id: "1D-Arrays",
    title: "1D Arrays",
    description:
      "Explore linear arrays through element creation, traversal, insertion, deletion, searching, and updating. Understand contiguous memory allocation and index-based access.",
    icon: <FaDatabase />,
    route:
      "/programming/data-structure/array/one-dimensional-array/creation-array?page=operationpage",
  },
  {
    id: "2D-Arrays",
    title: "2D Arrays",
    description:
      "Visualize multidimensional arrays using rows and columns. Explore element access, traversal, insertion, and memory representation through row-major and column-major ordering.",
    icon: <FaTable />,
    route:
      "/programming/data-structure/array/two-dimensional-array/create-array-2d?page=operationpage",
  },
  {
    id: "sorting",
    title: "Sorting Algorithms",
    description:
      "Understand how sorting algorithms organize data through step-by-step visualizations of Bubble, Selection, Insertion, Quick, and Merge Sort, including comparisons and element swaps.",
    icon: <FaSortAmountDown />,
    route:
      "/programming/algorithms/sorting/bubble-sort?page=operationpage",
  },
  {
    id: "singly-linked-lists",
    title: "Singly Linked Lists",
    description:
      "Explore dynamically connected nodes using data and next pointers. Visualize node creation, insertion, deletion, traversal, searching, and reversal operations.",
    icon: <FaLink />,
    route:
      "/programming/data-structure/linked-list/singly-linked-list/create-sll?page=operationpage",
  },
  {
    id: "doubly-linked-lists",
    title: "Doubly Linked Lists",
    description:
      "Understand bidirectional node connections through previous and next pointers. Visualize insertion, deletion, forward and backward traversal, and list reversal.",
    icon: <FaCodeBranch />,
    route:
      "/programming/data-structure/linked-list/doubly-linked-list/create-dll?page=operationpage",
  },
  {
    id: "stack",
    title: "Stacks",
    description:
      "Explore the Last In, First Out (LIFO) principle through Push, Pop, Peek, and traversal operations. Understand how elements are added and removed from the top of a stack.",
    icon: <FaLayerGroup />,
    route:
      "/programming/data-structure/stack/custom-stack?page=operationpage",
  },
  {
    id: "queue",
    title: "Queues",
    description:
      "Explore the First In, First Out (FIFO) principle through Enqueue, Dequeue, Front, and Rear operations. Understand how elements enter from the rear and leave from the front.",
    icon: <FaStream />,
    route:
      "/programming/data-structure/queue/custom?page=operationpage",
  },
  {
    id: "hash-table",
    title: "Hash Tables",
    description:
      "Understand key-value storage using hash functions and indexing. Visualize hash computation, insertion, searching, deletion, and collision handling through closed addressing.",
    icon: <FaProjectDiagram />,
    route:
      "/programming/data-structure/hash-table/closed-addressing-ht?page=operationpage",
  },
  {
    id: "bit-ops",
    title: "Bit Operations",
    description:
      "Explore binary number representation and low-level bit manipulation. Visualize AND, OR, XOR, NOT, left shift, right shift, and bit masking operations.",
    icon: <FaMicrochip />,
    route:
      "/programming/basics/bit-operators/number-to-binary?page=operationpage",
  },
];

export default function ExploreVisualizers() {
  return (
    <section className={styles.section} aria-labelledby="visualizers-title">
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <h2 id="visualizers-title" className={styles.sectionTitle}>
            Explore Our Visualizers
          </h2>

          <p className={styles.sectionSubtitle}>
            Explore fundamental data structures, algorithms, and programming
            concepts through interactive visualizations powered by the
            CodePerspective visualization engine.
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

              <p className={styles.cardDescription}>
                {cat.description}
              </p>

              <span className={styles.cardAction}>
                <span>Explore concepts</span>
                <FaArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
