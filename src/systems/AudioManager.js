export class AudioManager {
  constructor() {
    this.sounds = new Map();
  }

  register(name, path, loop = false) {
    const audio = new Audio(path);
    audio.loop = loop;
    audio.preload = "auto";
    this.sounds.set(name, audio);
  }

  play(name) {
    const audio = this.sounds.get(name);

    if (!audio) {
      console.warn("Sound not found:", name);
      return;
    }

    audio.currentTime = 0;
    audio.play();
  }

  stop(name) {
    const audio = this.sounds.get(name);
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }
}
