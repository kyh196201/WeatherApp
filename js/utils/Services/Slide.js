export default function Slide({ wrapper, items }) {
  let posX1 = 0;
  let posX2 = 0;
  let posInitial, posFinal;
  let threshold = 100;
  let slidesLength = null;
  let slideSize = null;
  let allowShift = true;
  this.index = 0;
  this.$slides = null;

  this.init = () => {
    this.$slides = items.getElementsByClassName("page"); //slide 노드 배열
    slidesLength = this.$slides.length; //slide 개수
    slideSize = items.getElementsByClassName("page")[0].offsetWidth; //slide의 너비
    items.style.left = -(this.index * slideSize) + "px";
  };

  const dragStart = (e) => {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      console.log("touchstart");
      posX1 = e.touches[0].clientX;
    } else {
      console.log("mouseup");
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  };

  const dragAction = (e) => {
    e = e || window.event;
    if (e.type == "touchmove") {
      console.log("touchmove");
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
    if (
      items.offsetLeft >= slideSize / 2 ||
      items.offsetLeft <= slideSize * slidesLength - slideSize / 2
    ) {
      if (e.type == "touchmove") {
        let touchendEvent;
        try {
          touchendEvent = new Event("touchend", {
            bubbles: true,
            cancelable: true,
          });
        } catch (error) {
          console.warn("using outdated browser... switching to old method");
          touchendEvent = document.createEvent("TouchEvent");
          touchendEvent.initEvent("touchend", true, true); //type, bubbles, cancelable
        }
        setTimeout(() => {
          items.dispatchEvent(touchendEvent);
        }, 250);
      } else {
        let mouseupEvent;
        try {
          mouseupEvent = new Event("mouseup", {
            bubbles: true,
            cancelable: true,
          });
        } catch (error) {
          console.warn("using outdated browser... switching to old method");
          mouseupEvent = document.createEvent("MouseEvent");
          mouseupEvent.initEvent("mouseup", true, true); //type, bubbles, cancelable
        }
        setTimeout(() => {
          items.dispatchEvent(mouseupEvent);
        }, 250);
      }
    }
  };

  const dragEnd = (e) => {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide.bind(this)(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide.bind(this)(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  };

  const shiftSlide = (dir, action) => {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        if (this.index == slidesLength - 1) {
          items.style.left = posInitial + "px";
        } else {
          items.style.left = posInitial - slideSize + "px";
          this.index++;
        }
      } else if (dir == -1) {
        if (this.index == 0) {
          items.style.left = posInitial + "px";
        } else {
          items.style.left = posInitial + slideSize + "px";
          this.index--;
        }
      }
    }

    allowShift = false;
  };

  function checkIndex() {
    items.classList.remove("shifting");
    if (this.index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      this.index = slidesLength - 1;
    }

    if (this.index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      this.index = 0;
    }
    allowShift = true;
  }

  // Mouse and Touch events
  items.onmousedown = (e) => {
    dragStart(e);
  };

  // Touch events
  items.addEventListener("touchstart", (e) => {
    dragStart(e);
  });
  items.addEventListener("touchend", (e) => {
    dragEnd(e);
  });
  items.addEventListener("touchmove", (e) => {
    dragAction(e);
  });

  // Transition events
  items.addEventListener("transitionend", checkIndex.bind(this));
}
