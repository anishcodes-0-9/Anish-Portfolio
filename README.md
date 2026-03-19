# 🏠 Anish Portfolio — Interactive 3D Developer Portfolio

> **A fully immersive 3D room you explore — not a webpage you scroll.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://anish-portfolio-gamma-steel.vercel.app/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

---

## 📖 Overview

Instead of navigating a traditional website, visitors step into a **3D virtual room** and interact with objects to discover projects, experience, skills, and more. Every object in the room has a purpose — click the monitor to see projects, ask the AI assistant questions, kick the football, or toggle cinematic mode with the Batman logo.

This project demonstrates full-stack engineering, 3D development, interactive UI design, and AI integration — all wrapped in an experience meant to be memorable.

**[→ Try it live](https://anish-portfolio-gamma-steel.vercel.app/)**

---

## 🎯 Motivation

Most developer portfolios are static pages. The goal here was to ask: _what if a portfolio was a place you could explore?_

This project was built to:

- Demonstrate depth across frontend, backend, and 3D development
- Create a genuinely engaging first impression
- Show AI integration in a natural, contextual way
- Push beyond what a typical portfolio is expected to look like

---

## ✨ Interactive Objects & Features

Every object in the room is clickable. Here's what each one does:

| Object                | Action                                                    |
| --------------------- | --------------------------------------------------------- |
| 🖥 Left Monitor       | Opens **Projects** panel                                  |
| 🖥 Right Monitor      | Opens **Work Experience** panel                           |
| ⌨️ Keyboard           | Opens **Personal Projects**                               |
| 🖱 Mouse              | Opens **Resume**                                          |
| 📞 Phone              | Opens **Contact Me**                                      |
| 📔 Diary (Left Page)  | Opens **My Notes**                                        |
| 📔 Diary (Right Page) | Opens **System Flow**                                     |
| 🔦 Lamp               | Toggles **room lights** on/off                            |
| 🤖 Alexa              | Opens **AI Portfolio Assistant** chat                     |
| 🧠 CPU                | Opens **Skills** panel                                    |
| 🪑 Chair              | Toggles **Work Mode**                                     |
| 🏋️ Left Dumbbell      | Opens **Certifications**                                  |
| 🏋️ Right Dumbbell     | Opens **My Strengths**                                    |
| 🙋 Photo              | Opens **About Me**                                        |
| 🦇 Batman Logo        | Toggles **Cinematic/Dark Mode**                           |
| 🪟 Window             | Cycles **time of day** (Morning → Noon → Evening → Night) |
| ⚽ Football           | Launches **Football Mini Game**                           |

---

## 🧱 Tech Stack

### Frontend

| Technology                   | Role                                 |
| ---------------------------- | ------------------------------------ |
| **Three.js**                 | 3D scene rendering, camera, lighting |
| **JavaScript (ES Modules)**  | Application logic                    |
| **Vite**                     | Dev server and bundler               |
| **GSAP / Custom Animations** | UI transitions and panel animations  |
| **Custom Raycasting System** | Mouse-to-3D object interaction       |
| **Custom UI Panel System**   | Modular panel and modal management   |

### Backend

| Technology     | Role                                   |
| -------------- | -------------------------------------- |
| **Node.js**    | Server runtime                         |
| **Express**    | HTTP routing                           |
| **OpenAI API** | AI assistant responses                 |
| **dotenv**     | Secure environment variable management |

### 3D Assets

| Technology              | Role                            |
| ----------------------- | ------------------------------- |
| **Blender**             | Full room environment modelling |
| **GLB / GLTF**          | 3D model export format          |
| **Three.js GLTFLoader** | Loading models into the scene   |

### Deployment

| Technology         | Role                               |
| ------------------ | ---------------------------------- |
| **Vercel**         | Frontend hosting                   |
| **Node.js server** | Backend API (self-hosted or cloud) |

---

## 🗂 Project Structure

```
Anish-Portfolio/
│
├── backend/
│   ├── server.js          # Express server entry point
│   ├── chatRoute.js       # /api/chat endpoint — OpenAI proxy
│   ├── package.json
│   └── .env               # OPENAI_API_KEY (never committed)
│
├── public/
│   ├── audio/             # Ambient or interaction sounds
│   └── textures/          # Static texture assets
│
├── src/
│   ├── assets/
│   │   └── models/        # GLB room model and props
│   │
│   ├── core/
│   │   ├── Experience.js  # Root class — bootstraps everything
│   │   ├── Camera.js      # Camera setup and controls
│   │   ├── Controls.js    # OrbitControls or custom navigation
│   │   └── Renderer.js    # WebGL renderer configuration
│   │
│   ├── systems/
│   │   ├── InteractionSystem.js   # Raycasting, hover & click detection
│   │   ├── GameManager.js         # Football game + Batman mode logic
│   │   ├── EnvironmentSystem.js   # Time-of-day cycling
│   │   ├── LightManager.js        # Dynamic lighting updates
│   │   └── TimeManager.js         # Delta time and animation loop
│   │
│   ├── ui/
│   │   ├── UIManager.js           # Panel orchestration
│   │   ├── registerPanels.js      # Registers all panel definitions
│   │   └── panels/
│   │       ├── projectsPanel.js
│   │       ├── workPanel.js
│   │       ├── footballGamePanel.js
│   │       └── aiChatPanel.js
│   │
│   ├── world/
│   │   └── PortfolioRoom.js       # Loads GLB, tags interactive objects
│   │
│   └── main.js                    # Application entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔄 Application Architecture & Data Flow

### Scene Initialization

```
main.js
  └── Experience.js (root)
        ├── Renderer.js         → Creates WebGL renderer
        ├── Camera.js           → Sets up perspective camera
        ├── Controls.js         → Attaches user navigation
        ├── PortfolioRoom.js    → Loads GLB model via GLTFLoader
        │     └── Tags interactive mesh objects by name
        ├── InteractionSystem.js → Attaches raycaster to canvas
        ├── UIManager.js        → Initialises panel registry
        └── TimeManager.js      → Starts render loop (requestAnimationFrame)
```

### Interaction Flow (Click)

```
User clicks on canvas
  └── InteractionSystem.js
        └── Raycaster casts ray from camera through mouse position
              └── Intersects tagged mesh?
                    YES → Looks up object name in interaction map
                          └── UIManager.openPanel(panelId)
                                └── Relevant panel renders into DOM
```

### AI Chat Flow

```
User types message in AI panel
  └── aiChatPanel.js
        └── POST /api/chat  { message: "..." }
              └── chatRoute.js (Express)
                    └── OpenAI API (GPT model)
                          └── System prompt with portfolio context
                                └── Response returned to chat UI
```

The system prompt constrains the model to only answer questions related to the portfolio — preventing off-topic usage and keeping the assistant in character.

### Environment / Lighting Flow

```
User clicks Window
  └── InteractionSystem detects "Window" mesh
        └── EnvironmentSystem.cycleTimeOfDay()
              └── LightManager.applyPreset(timeOfDay)
                    └── Updates DirectionalLight, AmbientLight, sky color
```

### Batman Cinematic Mode

```
User clicks BatmanLogo
  └── GameManager.activateBatmanMode()
        └── LightManager switches to cinematic preset
              → Reduces ambient light
              → Adds dramatic directional spotlight
        └── Click again → restores previous lighting state
```

---

## 🤖 AI Assistant Architecture

The AI assistant is powered by OpenAI but proxied through the backend to keep the API key off the client.

```
Browser (aiChatPanel.js)
    │
    │  POST /api/chat
    │  { "message": "What projects have you built?" }
    ▼
Node.js Express Server (chatRoute.js)
    │
    │  OpenAI API request
    │  with system prompt containing portfolio knowledge
    ▼
OpenAI GPT Model
    │
    ▼
Response text → Back to browser → Rendered in chat UI
```

**Why proxy through the backend?**
Calling OpenAI directly from the browser would expose the API key in network requests. The Express proxy keeps the key in a `.env` file server-side and adds a layer to rate-limit or validate requests if needed.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm
- An OpenAI API key

### 1. Clone the Repository

```bash
git clone https://github.com/anishcodes-0-9/Anish-Portfolio.git
cd Anish-Portfolio
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
OPENAI_API_KEY=your_api_key_here
```

> ⚠️ Never commit this file. It is already in `.gitignore`.

### 5. Start the Backend Server

```bash
cd backend
npm start
# Server runs at http://localhost:3001
```

### 6. Start the Frontend Dev Server

Open a new terminal from the project root:

```bash
npm run dev
# App runs at http://localhost:5173
```

---

## 🎨 3D Modelling Workflow

The entire room environment — furniture, props, and all interactive objects — was modelled from scratch in Blender.

```
Blender (.blend)
  └── Model & UV unwrap all objects
        └── Assign materials and bake lighting (optional)
              └── Export as .glb (binary GLTF)
                    └── Load with GLTFLoader in Three.js
                          └── Traverse scene graph
                                └── Tag meshes by name for interaction
                                      └── Fine-tune materials & lighting in code
```

**Why GLB over OBJ or FBX?**
GLB packages geometry, materials, and textures into a single binary file, making it ideal for web delivery — smaller transfer size and simpler loading compared to multi-file formats.

---

## ⚖️ Design Tradeoffs

### 3D Room vs Traditional Layout

- **Pro:** Memorable and differentiated — visitors engage longer
- **Con:** Higher initial load time for model assets; not SEO-friendly; requires WebGL support
- **Mitigation:** Vite asset optimisation, compressed GLB exports, graceful fallback messaging for unsupported devices

### Custom Raycasting vs Physics Library

- **Pro:** Full control, zero overhead from a physics engine for purely visual interactions
- **Con:** More manual work to add complex behaviours (e.g., object dragging)
- **Mitigation:** Raycasting is well-suited here since most interactions are click-to-open, not physics-driven (the football game is isolated)

### OpenAI Proxy Backend vs Direct API Call

- **Pro:** API key never exposed in the browser; centralised place for rate limiting and logging
- **Con:** Additional infrastructure to maintain and deploy separately
- **Mitigation:** The backend is lightweight (single route) and can be deployed to any Node.js host alongside the frontend

### Single GLB Model vs Modular Asset Loading

- **Pro:** One network request, simpler scene graph management
- **Con:** Larger initial load; harder to swap individual assets at runtime
- **Mitigation:** Acceptable tradeoff for a portfolio — load happens once per visit

### Modular Panel System vs Inline HTML

- **Pro:** Each panel is independently defined and registered; easy to add new interactions without touching core logic
- **Con:** Minor indirection when debugging (need to trace panel ID through registry)
- **Mitigation:** Clear naming conventions and centralised `registerPanels.js` file

---

## 🔑 Key Engineering Highlights

- **Custom raycasting interaction system** — handles hover state, click detection, and cursor feedback across all tagged 3D objects without a physics engine
- **Modular UI panel architecture** — panels are self-contained and registered declaratively; adding a new interactive object requires minimal changes to core systems
- **Dynamic lighting system** — four time-of-day presets (Morning, Noon, Evening, Night) update ambient and directional lights at runtime, changing room mood without reloading assets
- **Secure AI proxy** — OpenAI API key lives server-side; the frontend never touches credentials
- **Full-stack architecture** — Vite-powered frontend and Express backend share a clean API contract at `/api/chat`
- **Blender-to-Three.js pipeline** — custom naming conventions on Blender meshes map directly to interaction IDs in code, keeping the 3D asset and application logic in sync

---

## 🚀 Planned Improvements

-
- [ ] **AI GitHub repository explainer** — AI reads and summarises pinned repos dynamically
- [ ] **Resume unlock puzzle** — interactive puzzle that reveals the resume as a reward
- [ ] **Loading screen with progress bar** — feedback during GLB model fetch

---

## 📬 Contact

| Platform       | Link                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------- |
| GitHub         | [github.com/anishcodes-0-9](https://github.com/anishcodes-0-9)                            |
| LinkedIn       | [linkedin.com/in/anishkrishnan09](https://www.linkedin.com/in/anishkrishnan09)            |
| Live Portfolio | [anish-portfolio-gamma-steel.vercel.app](https://anish-portfolio-gamma-steel.vercel.app/) |

---

## 📄 License

This project is personal portfolio work. Feel free to draw inspiration, but please do not clone and deploy as your own portfolio without significant modification.

---

_Built to reimagine what a developer portfolio can be — not a page to read, but a room to explore._
