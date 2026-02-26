export class TimeManager {
  constructor() {
    this.mode = this.detectTimeMode();
  }

  detectTimeMode() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 16) return "noon";
    if (hour >= 16 && hour < 19) return "evening";
    return "night";
  }

  getMode() {
    return this.mode;
  }
}
