export class AudioManager {
  constructor() {
    this.sounds = new Map();
  }

  register(name, audio) {
    this.sounds.set(name, audio);
  }

  play(name) {
    console.log("Play sound:", name);
  }

  stop(name) {
    console.log("Stop sound:", name);
  }
}
