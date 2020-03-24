import { DAYS, CLOCK_MODE } from "./constants.js";

class TimeStamp {
  constructor({ $target, mode }) {
    this.$target = $target;
    this.mode = mode;

    this.render();
    const clock = setInterval(this.render, 1000);
  }

  render = () => {
    const d = new Date();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const day = DAYS[d.getDay()];
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const AMPM = hours > 12 ? "PM" : "AM";
    let dString = "";
    if (this.mode === CLOCK_MODE.CURRENT) {
      dString = `${month}월 ${date}일 (${day})  ${
        hours > 12 ? hours - 12 : hours
      }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds} ${AMPM}`;
    } else {
      dString = "tick in daily";
    }

    this.$target.innerHTML = dString;
  };
}

export default TimeStamp;
