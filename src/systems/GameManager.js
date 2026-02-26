export class GameManager {
  constructor() {
    this.active = false;
  }

  start() {
    this.active = true;
    console.log("Game started");
  }

  stop() {
    this.active = false;
    console.log("Game stopped");
  }

  update() {
    if (!this.active) return;
  }
}
