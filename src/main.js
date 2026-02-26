import { Experience } from "./core/Experience.js";
import "./styles/ui.css";

const app = new Experience();
app.init();

// 🔎 Temporary debug exposure
window.app = app;
