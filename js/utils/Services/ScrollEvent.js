import { addEvent } from "./functions.js";

function ScrollEvent({ $element }) {
  let lastPos = 0;

  this.init = () => {
    const element = $element;
    const isWindow = element === window;
    this.bindEvent();
  };

  this.init();

  this.bindEvent = () => {
    addEvent(
      "scroll",
      element,
      _.debounce((e) => {
        e.stopPropagation();
        const newPos = element.scrollY || element.scrollTop;
        if (lastPos < newPos) {
          //down
          console.log("go down");
          const elHeight = isWindow ? window.innerHeight : element.offsetHeight;
          if (lastPos < elHeight) {
            console.log(elHeight);
            const target = document.querySelector(".MainWeather__wrapper");
            target.scrollIntoView();
            lastPos = target.scrollTop;
          }
        } else {
          //Up
          console.log("go up");
        }
        lastPos = newPos <= 0 ? 0 : newPos;
      }, 150)
    );
  };
}

export default ScrollEvent;
