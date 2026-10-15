<h1 align="center">
  <br/>
  <img src="https://img.shields.io/badge/PersPective-Algorithm%20Visualizer-6366f1?style=for-the-badge&logo=react&logoColor=white" alt="PersPective Banner"/>
  <br/><br/>
  CodePerspective &mdash; <em>PersPective</em>
</h1>

<p align="center">
  <strong>An interactive, browser-based algorithm &amp; data structure visualizer built with React + Raphael.js</strong>
  <br/>
  <em>See code come alive — frame by frame, step by step.</em>
</p>

<p align="center">
  <a href="https://shanorigin.github.io/CodePerspective/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-6366f1?style=for-the-badge&logo=github-pages&logoColor=white" alt="Live Demo"/>
  </a>
  &nbsp;
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react" alt="React 18"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite" alt="Vite"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Raphael.js-2.3-E34F26?style=flat-square" alt="Raphael"/>
  &nbsp;
  <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License"/>
</p>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Live Features](#-live-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Visualized Topics](#-visualized-topics)
- [Architecture Overview](#-architecture-overview)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🚀 About the Project

**CodePerspective** (branded as *PersPective*) is an open-source, client-side web application that turns abstract computer science concepts into living, animated visualizations.

Instead of staring at static pseudocode, users can:

- **Click a single button** to watch an algorithm animate step-by-step on an SVG canvas powered by Raphael.js
- **Switch between languages** — C, C++, Python, Java, JavaScript, and C# — in an embedded read-only Ace editor
- **Toggle dark / light mode**, with theme preference persisted across sessions via `localStorage`
- **Search** any topic instantly from the navbar
- **Navigate** a clean sidebar listing every operation in the selected category

The project is entirely frontend — no server, no database — just a static React SPA that deploys directly to GitHub Pages.

---

## ✨ Live Features

| Feature | Description |
|---|---|
| 🎞️ **Step-by-step animations** | SVG-canvas animations built with Raphael.js, triggered on demand |
| 💻 **Multi-language code viewer** | Ace editor with C, C++, Python, Java, JavaScript, C# tabs (Swiper carousel) |
| 🌙 **Dark / Light mode** | System-aware toggle, persisted in `localStorage` |
| 🔍 **Live search** | Instant full-text search across all operations in the navbar |
| 📋 **Operation sidebar** | Categorized list of all operations; highlights the active route |
| 📱 **Mobile responsive** | Drawer-based navigation on small screens; full sidebar on desktop |
| ⚡ **Smooth route transitions** | 280 ms fade loader between page navigations |
| 🎨 **Animated hero section** | Typed character animation with dynamic HSL gradient cycling |
| 🏠 **Landing page** | Hero, How It Works (3-step pipeline), and Explore Visualizers showcase |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Animation Engine** | [Raphael.js 2.3](http://dmitrybaranovskiy.github.io/raphael/) |
| **Code Editor** | [React-Ace](https://github.com/securingsincity/react-ace) (Ace Editor) |
| **Carousel** | [Swiper.js 11](https://swiperjs.com/) |
| **Icons** | [React Icons 5](https://react-icons.github.io/react-icons/) |
| **CSS** | Vanilla CSS + CSS Modules |
| **Fonts** | [Nunito](https://fonts.google.com/specimen/Nunito) via Google Fonts |
| **Icon Library** | Font Awesome 6 (CDN) |
| **Linting** | ESLint 9 + Prettier |
| **Deployment** | GitHub Pages (`docs/` folder) |

---

## 📁 Project Structure

```
CodePerspective/
├── reactapp/                         # Main React application (Vite)
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── Animation/                # All Raphael.js animation modules
│   │   │   └── Programming/
│   │   │       ├── DSA/
│   │   │       │   ├── Array/        # 1D, 2D, 3D arrays + sorting algorithms
│   │   │       │   ├── LinkedList/   # Singly & Doubly Linked List
│   │   │       │   ├── Stack/
│   │   │       │   ├── Queue/
│   │   │       │   ├── HashTable/
│   │   │       │   ├── Graphs/
│   │   │       │   └── Trees/
│   │   │       ├── BitOperators/     # Binary operation animations
│   │   │       ├── Basics/
│   │   │       ├── ControlFlows/     # (planned)
│   │   │       └── Strings/          # (planned)
│   │   │
│   │   ├── Components/
│   │   │   ├── Header/               # Navbar, live search, theme toggle, offcanvas
│   │   │   ├── Footer/               # Contact info, social links, nav links
│   │   │   ├── Home/                 # Landing page
│   │   │   │   └── sections/
│   │   │   │       ├── Hero/         # Typed animation + live visualizer preview
│   │   │   │       ├── HowItWorks/   # 3-step feature pipeline
│   │   │   │       ├── Showcase/
│   │   │   │       └── ExploreVisualizers/
│   │   │   ├── Main/                 # Visualization page shell
│   │   │   │   ├── Controller.jsx    # Route validation & page type dispatcher
│   │   │   │   ├── Navigation.jsx    # Router outlet
│   │   │   │   └── Pages/JS/
│   │   │   │       ├── OperationPage.jsx    # Layout: sidebar + canvas
│   │   │   │       ├── OperationSidebar.jsx # Per-category operation list
│   │   │   │       └── PagesSubComponent/
│   │   │   │           ├── Animation.jsx    # Canvas + code editor wiring
│   │   │   │           └── CodeEditor.jsx   # Ace editor with multi-lang swiper
│   │   │   ├── common/               # Shared: AnimatedIcon, PageTransitionLoader
│   │   │   ├── __initAnimation__.jsx # Animation lifecycle manager
│   │   │   └── __navigationData__.jsx
│   │   │
│   │   ├── Contexts/
│   │   │   ├── ThemeContext.jsx           # Dark / Light mode context
│   │   │   ├── navigationDataContext.jsx  # Navigation tree + URL generator (canonical)
│   │   │   └── urls.jsx                  # Legacy URL context shim
│   │   │
│   │   ├── Hooks/
│   │   │   ├── useAnimation.jsx       # Lazily loads animation module by name
│   │   │   ├── useNavigationData.jsx  # Consumes navigation data context
│   │   │   └── useUrls.jsx            # Consumes URL context
│   │   │
│   │   ├── services/
│   │   │   └── formSubmissionService.js  # Contact / feedback form handler
│   │   │
│   │   ├── styles/                   # Global CSS tokens & utilities
│   │   ├── App.jsx                   # Root component (theme, router, layout)
│   │   └── main.jsx                  # Vite entry point
│   │
│   ├── index.html                    # HTML shell (Nunito font, Font Awesome CDN)
│   ├── vite.config.js                # base: /CodePerspective/, outDir: docs/
│   └── package.json
│
├── .env.example                      # SMTP email config template
├── eslint.config.mjs                 # Root ESLint config
├── package.json                      # Root npm scripts (proxies to reactapp/)
└── LICENSE                           # MIT License
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x *(a `yarn.lock` is also present if you prefer Yarn)*

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ShanOrigin/CodePerspective.git
cd CodePerspective

# 2. Install React app dependencies
cd reactapp
npm install
cd ..
```

### Running Locally

```bash
# From the project root
npm run dev
```

The Vite dev server starts at **`http://localhost:5173`** (also accessible on your LAN IP).

> **Tip:** The app uses `basename="/the-code-perspective/"` in development.  
> If the root URL shows a blank page, navigate to `http://localhost:5173/the-code-perspective/`.

### Building for Production

```bash
npm run build
```

The optimized output lands in `reactapp/docs/` — this is the directory served by **GitHub Pages** on the `main` branch.

Preview the build locally:

```bash
npm run preview
```

---

## 🗂️ Visualized Topics

### Currently Implemented

#### Data Structures

| Category | Operations |
|---|---|
| **1D Array** | Creation, Linear Search, Binary Search, Insertion, Deletion, Merge, Concatenate, Split, Reverse |
| **2D Array** | Create, Transpose, Search, Addition, Subtraction, Multiplication |
| **Singly Linked List** | Create, Traverse, Insert at Head / Between / Tail, Delete at Head / Between / Tail, Reverse |
| **Doubly Linked List** | Create, Traverse, Insert at Head / Between / Tail, Delete at Head / Between / Tail |
| **Stack** | Push, Pop, Custom Stack |
| **Queue** | Enqueue, Dequeue, Custom Queue |
| **Hash Table** | Closed Addressing (Chaining), Open Addressing |

#### Sorting Algorithms

| Category | Operations |
|---|---|
| **Sorting** | Bubble Sort, Insertion Sort, Selection Sort, Quick Sort, Shell Sort, Count Sort, Radix Sort |

#### Bit Operators

| Category | Operations |
|---|---|
| **Bit Operators** | Number to Binary, Binary to Number, Binary AND |

### Planned / In Progress

- Binary OR, NOT, XOR, Left Shift, Right Shift
- Control Flows (loops, conditionals, branching)
- String manipulation operations
- Trees & Graphs traversal

---

## 🏗️ Architecture Overview

```
User visits /programming/data-structure/array/linear-search
        |
        v
  Controller.jsx
  +------------------------------------------------------+
  |  Validates URL against urlsContext list               |
  |  Dispatches to OperationPage or TypesPage             |
  +------------------------------------------------------+
        |
        v
  OperationPage.jsx  (sidebar + main content area)
  +------------------------------------------------------+
  |  OperationSidebar  -- all ops in the current category |
  |  Animation.jsx     -- mounts canvas + code editor     |
  |    +-- InitAnimation.jsx  (Raphael.js lifecycle)      |
  |    +-- CodeEditor.jsx     (Ace + multi-lang Swiper)   |
  +------------------------------------------------------+

On "Start Animation" click:
  slug -> PascalCase key -> lazy-import JS module
       -> run Raphael.js on #Animation-Canvas
       -> 10 s cooldown timer
       -> cleanup on route change / unmount
```

**State management** is intentionally minimal:

| Context | Purpose |
|---|---|
| `ThemeContext` | Global dark / light mode toggle |
| `navigationDataContext` | Canonical navigation tree + URL builder |
| `urlsContext` | Flat URL list used by route validator |

No Redux or Zustand — `Context + useState` is sufficient at this scale.

---

## 🔐 Environment Variables

The `.env.example` documents SMTP credentials for a contact-form email backend. These are **optional** — the frontend currently uses a simulated form submission service.

```bash
cp .env.example .env   # fill in your credentials
```

| Variable | Description | Example |
|---|---|---|
| `MAIL_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_SECURE` | Use SSL (`true` for port 465) | `false` |
| `MAIL_USER` | SMTP username / email address | `you@gmail.com` |
| `MAIL_PASS` | SMTP password or App Password | `xxxx xxxx xxxx xxxx` |
| `MAIL_TO` | Recipient for form submissions | `you@gmail.com` |

> **Warning:** The `.env` file is git-ignored and must never be committed.

---

## 🤝 Contributing

Contributions are welcome and appreciated!

```bash
# Fork the repo, then:
git checkout -b feature/my-new-animation

# Add your animation module under:
# reactapp/src/Animation/Programming/<Category>/<OperationName>.js

# Register the operation in navigationDataContext.jsx with enabled: true

git commit -m "feat: add MyNewOperation animation"
git push origin feature/my-new-animation
# Open a Pull Request
```

### Animation Module Contract

Each animation file must export a default async function:

```js
export default async function AnimaterFunction(id, AnimationFunction, name, type) {
  // Draw on #Animation-Canvas using Raphael.js
}
```

Routing, sidebar listing, live search indexing, and URL generation are all **automatic** — just register the operation in `navigationDataContext.jsx`.

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full text.

---

## 👤 Author

**Shantanu Manik Suryawanshi**

- 📧 [shantanusuryawanshi3.14@gmail.com](mailto:shantanusuryawanshi3.14@gmail.com)
- 📍 Pune, India 411003

---

<p align="center">
  Made with ❤️ and lots of SVG paths &nbsp;•&nbsp; © 2024 Shantanu Manik Suryawanshi
</p>
