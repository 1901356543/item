export default class CountDown {
  constructor(timeRemained, everyTime, inTheEnd) {
    this.timeRemained = timeRemained;
    this.everyTime = everyTime;
    this.inTheEnd = inTheEnd;
  }

  startCountDown(period = 1000) {
    this.timer = setInterval(() => {
      if (this.timeRemained <= 0) {
        this.inTheEnd();
        clearInterval(this.timer);
        return;
      }
      this.everyTime(this.timeRemained);
      this.timeRemained -= period;
    }, 1000);
    return this.timer;
  }
}
