import { addEvent } from "./functions.js";

function scrollEvent({ $element, initial }) {
  const element = $element;
  const isWindow = element === window;

  let lastPos = 0;

  addEvent(
    "scroll",
    element,
    _.debounce(() => {
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
}

export default scrollEvent;
