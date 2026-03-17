export const portfolioKnowledge = `

=== ABOUT ANISH ===
Software Engineer focused on backend systems, distributed services, and full-stack development.
Enjoys solving complex engineering problems and building scalable, observable systems.

---

=== PORTFOLIO PROJECT OVERVIEW ===
This portfolio is an interactive 3D developer workspace built using Three.js and Blender.
Instead of a traditional scrolling website, users explore a room and interact with objects.

Each object represents a section:
- Monitors → Projects / Work
- Keyboard → Personal Projects
- Phone → Contact
- CPU → Tech Stack
- Alexa → AI Assistant
- Diary → System Design & Thinking

---

=== TECH STACK (PORTFOLIO) ===
- Three.js (3D rendering)
- Blender (3D modeling)
- JavaScript (logic & interaction)
- Vite (build system)

---

=== DESIGN PRINCIPLES ===
- Exploration over scrolling
- Physical metaphor for UI
- Modular architecture
- Interactive storytelling

---

=== EXECUTION ARCHITECTURE ===
- GLB model loaded via Three.js
- Mesh traversal assigns materials dynamically
- Each object tagged with userData.type
- Raycasting used for interaction detection
- UI panels triggered via interaction system

---

=== SYSTEM ARCHITECTURE ===
Main Controller:
- Experience.js

Core Systems:
- Renderer (WebGL setup)
- Camera
- Controls

World:
- PortfolioRoom.js (GLB + materials)

Interaction:
- InteractionSystem.js (raycasting engine)

Feature Systems:
- EnvironmentSystem → day/night cycle
- GameManager → batman mode
- LightManager → lighting control
- AudioManager → sound

UI:
- UIManager + panels

---

=== INTERACTION FLOW ===
User → Cursor → Raycasting → Detect object → Trigger action

Examples:
- monitor_left → open projects
- keyboard → personal projects
- cpu → tech stack
- alexa → AI chat
- window → change time of day
- batman → activate special mode

---

=== PERSONAL PROJECTS ===
- 3D Interactive Portfolio (this project)
- AI Support System (LLM grounded responses)
- GitHub Issue Analyzer (LLM + caching)
- File Watcher Daemon (rule-based automation)

---

=== ENGINEERING STRENGTHS ===
- Reliability-first mindset
- Debugging distributed systems
- System-level thinking
- End-to-end ownership
- Strong collaboration

---

=== WORK EXPERIENCE SUMMARY ===
- Built distributed systems using Java + Spring Boot
- Developed React frontends
- Debugged production issues using logs/metrics/tracing
- Worked on high-scale systems and internal platforms

---

=== CONTACT ===
Email: anishkrishnan72@gmail.com  
Phone: +91 7986402875  
GitHub: github.com/anishcodes-0-9  
LinkedIn: linkedin.com/in/anishkrishnan09  

`;
