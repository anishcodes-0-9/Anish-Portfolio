# 🏠 Interactive 3D Portfolio — Three.js + AI Assistant

An **interactive 3D developer portfolio** built with **Three.js**, where visitors explore a virtual room and interact with objects to learn about my **projects, work experience, and skills**.

Instead of navigating a traditional website, users **interact with objects inside a 3D room**. Each object triggers a different feature such as opening panels, launching mini-games, changing the environment, or chatting with an **AI assistant powered by OpenAI**.

---

# 🎯 Project Objective

This project demonstrates a combination of:

- **3D development**
- **interactive UI design**
- **frontend engineering**
- **backend architecture**
- **AI integration**

The goal was to create a **memorable and immersive portfolio experience** rather than a static webpage.

---

# 🧱 Tech Stack

## **Frontend**

- **Three.js**
- **JavaScript (ES Modules)**
- **Vite**
- **Custom UI panel system**
- **Raycasting interaction system**

## **Backend**

- **Node.js**
- **Express**
- **OpenAI API**
- **Secure API proxy**

## **3D Modeling**

- **Blender**

---

# 🧭 Interactive Room Features

The portfolio is presented as a **3D room environment** where every major object is interactive.

Users can **hover and click objects** to trigger different actions.

---

# 🖱️ Object Interactions

## 🖥️ **Left Monitor — Projects**

Clicking the **left monitor** opens a side panel displaying:

- Personal projects
- Technical experiments
- Engineering implementations

### Interaction Flow

```
Click Monitor_Left
↓
InteractionSystem detects object
↓
UIManager opens "projects" panel
```

---

## 🖥️ **Right Monitor — Work History**

Clicking the **right monitor** opens a side panel showing:

- Professional work history
- Previous roles
- Responsibilities
- Career experience

---

## ⚽ **Football — Mini Game**

Clicking the football opens an interactive **football mini-game**.

### Features

- Physics based movement
- Score tracking
- Interactive gameplay

### Interaction Flow

```
Click Football
↓
UIManager opens footballGame modal
↓
GameManager handles game logic
```

---

## 🌇 **Window — Environment Lighting**

Clicking the window cycles through different **times of day**.

### Environment States

1. **Morning**
2. **Noon**
3. **Evening**
4. **Night**

### Interaction Flow

```
Click Window
↓
EnvironmentSystem.cycleTimeOfDay()
↓
LightingManager updates scene lighting
```

This dynamically changes the room lighting and mood.

---

## 🦇 **Batman Logo — Cinematic Mode**

Clicking the Batman logo activates a **cinematic lighting mode**.

### Effects

- Darkened environment
- Dramatic lighting
- Cinematic atmosphere

### Interaction Flow

```
Click BatmanLogo
↓
GameManager.activateBatmanMode()
↓
Lighting system switches theme
```

Clicking again disables cinematic mode.

---

## 🤖 **Alexa Device — AI Portfolio Assistant**

Clicking the Alexa device opens an **AI chatbot modal**.

The chatbot answers questions about:

- Projects
- Skills
- Tech stack
- Work experience
- Contact information

### AI Request Flow

```
User types message
↓
Frontend sends POST request
↓
Node backend proxy
↓
OpenAI API
↓
Response returned to chat UI
```

The backend ensures the **OpenAI API key is never exposed to the browser**.

---

# 🧠 AI System Architecture

```
Three.js Frontend
↓
POST /api/chat
↓
Node.js Express Server
↓
OpenAI API
↓
AI Response
↓
Chat UI Updates
```

The assistant uses a **system prompt containing portfolio knowledge** so it only answers questions related to the portfolio.

---

## 🧩 Application Architecture

```
Three.js Scene
│
├── InteractionSystem
│ Handles raycasting and object click detection
│
├── PortfolioRoom
│ Loads the GLB room model
│ Tags interactive objects
│
├── UIManager
│ Controls UI panels and modals
│
├── Panels
│ ├── Projects Panel
│ ├── Work Panel
│ ├── Football Game Panel
│ └── AI Chat Panel
│
└── Backend
Node.js + Express API
OpenAI integration

```

---

## 📁 Project Structure

```
Anish-Portfolio
│
├── backend
│   ├── server.js
│   ├── chatRoute.js
│   ├── package.json
│   └── .env
│
├── public
│   ├── audio
│   └── textures
│
├── src
│   ├── assets
│   │   └── models
│   │
│   ├── core
│   │   ├── Camera.js
│   │   ├── Controls.js
│   │   ├── Renderer.js
│   │   └── Experience.js
│   │
│   ├── systems
│   │   ├── InteractionSystem.js
│   │   ├── GameManager.js
│   │   ├── EnvironmentSystem.js
│   │   ├── LightManager.js
│   │   └── TimeManager.js
│   │
│   ├── ui
│   │   ├── UIManager.js
│   │   ├── registerPanels.js
│   │   └── panels
│   │       ├── projectsPanel.js
│   │       ├── workPanel.js
│   │       ├── footballGamePanel.js
│   │       └── aiChatPanel.js
│   │
│   ├── world
│   │   └── PortfolioRoom.js
│   │
│   └── main.js
│
├── index.html
├── vite.config.js
└── package.json
```

---

# ⚙️ How to Run the Project

## **1️⃣ Clone the Repository**

git clone https://github.com/anishcodes-0-9/Anish-Portfolio.git

---

## **2️⃣ Install Frontend Dependencies**

npm install

---

## **3️⃣ Install Backend Dependencies**

cd backend
npm install

---

## **4️⃣ Add OpenAI API Key**

Create a `.env` file inside the backend folder:

OPENAI_API_KEY=your_api_key_here

---

## **5️⃣ Start Backend Server**

cd backend
npm start

Server runs on: http://localhost:3001

---

## **6️⃣ Start Frontend**

Open a new terminal: npm run dev

then Visit: http://localhost:5173

---

# 🎨 3D Modeling Workflow

The entire environment was designed in **Blender**.

### Workflow

```
Blender Model
↓
Export GLB
↓
Load with GLTFLoader
↓
Three.js Scene
↓
Material + lighting adjustments in code
```

---

# ✨ Key Engineering Highlights

This project demonstrates:

- **Custom raycasting interaction system**
- **Modular UI architecture**
- **Interactive 3D environment**
- **Dynamic lighting system**
- **Mini-game integration**
- **Secure AI backend integration**
- **Full stack architecture**

---

# 🚀 Future Improvements

Planned upgrades include:

- Alexa **voice responses**
- **AI explanation of GitHub repositories**
- **Resume unlock puzzle**
- **Real-time lighting based on user local time**
- Additional interactive room elements

---

# 📬 Contact

---

**https://github.com/anishcodes-0-9**

**www.linkedin.com/in/anishkrishnan09**

---

---

# ⭐ Final Note

This portfolio was built to **reimagine what a developer portfolio can be**.

Instead of reading about my work on a webpage, visitors **explore a world where every object tells a story**.

# Feature to work on

**1** ## Future Feature Note – 3D Hover Interaction System

**Goal**

Improve the usability of the 3D room by giving users visual feedback when they move their cursor over interactive objects.

Right now objects only respond on click, which means users must guess what is clickable. The hover interaction system will make the experience more intuitive and game-like.

---

**Feature Description**

When the mouse **hovers over interactive objects**, the object should:

1. **Slightly highlight or glow** to indicate it is interactive
2. Display a **small tooltip near the cursor or above the object**
3. Show a short action description of what clicking will do

Example interactions:

- **Keyboard → "View Personal Projects"**
- **Right Monitor → "Work Experience"**
- **Left Monitor → "Projects Panel"**
- **Alexa Device → "Open AI Assistant"**
- **Phone → "Contact Anish"**
- **Window → "Change Time of Day"**
- **Batman Logo → "Toggle Theme"**

---

**Implementation Approach**

The feature will extend the existing **InteractionSystem raycasting logic**.

Steps:

1. Use the existing **raycaster that detects clicked objects**.
2. Track the **currently hovered object** every frame.
3. If the hovered object changes:
   - Apply a **highlight material or emissive effect**.
   - Display a **tooltip UI element** with the action label.

4. Remove highlight and hide tooltip when the cursor leaves the object.

---

**Technical Components**

The system will likely require:

- Hover detection inside `InteractionSystem.js`
- A small
