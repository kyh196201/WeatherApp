"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Slide;

var _functions = require("./functions.js");

function Slide(_ref) {
  var _this = this;

  var wrapper = _ref.wrapper,
      items = _ref.items;
  //wrapper : this.$pageContainer
  //items : this.$pageWrapper
  var posX1 = 0;
  var posX2 = 0;
  var posInitial, posFinal;
  var threshold = 100;
  var slidesLength = null;
  var slideSize = null;
  var allowShift = true;
  this.index = 0;
  this.$slides = null;
  var isDown = false;

  this.init = function () {
    console.log(_this.index);
    _this.$slides = items.getElementsByClassName("page"); //slide 노드 배열

    slidesLength = _this.$slides.length; //slide 개수

    slideSize = items.getElementsByClassName("page")[0].offsetWidth; //slide의 너비

    items.style.left = -(_this.index * slideSize) + "px";
  };

  var dragStart = function dragStart(e) {
    isDown = true;
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX; //최초 클릭 위치
    }
  };

  var dragAction = function dragAction(e) {
    if (!isDown) {
      return;
    }

    e = e || window.event;

    if (e.type == "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    items.style.left = items.offsetLeft - posX2 + "px";

    if (items.offsetLeft >= slideSize / 2 || items.offsetLeft <= slideSize * slidesLength - slideSize / 2) {
      if (e.type == "touchmove") {
        var touchendEvent;

        try {
          touchendEvent = new Event("touchend", {
            bubbles: true,
            cancelable: true
          });
        } catch (error) {
          console.warn("using outdated browser... switching to old method");
          touchendEvent = document.createEvent("TouchEvent");
          touchendEvent.initEvent("touchend", true, true); //type, bubbles, cancelable
        }

        setTimeout(function () {
          items.dispatchEvent(touchendEvent);
        }, 250);
      } else {
        var mouseupEvent;

        try {
          mouseupEvent = new Event("mouseup", {
            bubbles: true,
            cancelable: true
          });
        } catch (error) {
          console.warn("using outdated browser... switching to old method");
          mouseupEvent = document.createEvent("MouseEvent");
          mouseupEvent.initEvent("mouseup", true, true); //type, bubbles, cancelable
        }

        setTimeout(function () {
          items.dispatchEvent(mouseupEvent);
        }, 250);
      }
    }
  };

  var dragEnd = function dragEnd(e) {
    posFinal = items.offsetLeft;

    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }

    isDown = false;
  };

  var shiftSlide = function shiftSlide(dir, action) {
    items.classList.add("shifting");

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }

      if (dir == 1) {
        if (_this.index == slidesLength - 1) {
          items.style.left = posInitial + "px";
        } else {
          items.style.left = posInitial - slideSize + "px";
          _this.index++;
        }
      } else if (dir == -1) {
        if (_this.index == 0) {
          items.style.left = posInitial + "px";
        } else {
          items.style.left = posInitial + slideSize + "px";
          _this.index--;
        }
      }
    }

    allowShift = false;
  };

  function checkIndex() {
    items.classList.remove("shifting"); // if (this.index == -1) {
    //   items.style.left = -(slidesLength * slideSize) + "px";
    //   this.index = slidesLength - 1;
    // }
    // if (this.index == slidesLength) {
    //   items.style.left = -(1 * slideSize) + "px";
    //   this.index = 0;
    // }

    allowShift = true;
  } // Mouse and Touch events


  (0, _functions.addEvent)("mousedown", items, function (e) {
    console.log(e.type);
    var _target = e.target;
    console.log(_target);
    if (_target.classList.contains("checkbox")) return;
    dragStart(e);
  });
  (0, _functions.addEvent)("mouseup", items, function (e) {
    console.log(e.type);
    var _target = e.target;
    console.log(_target);
    if (_target.classList.contains("checkbox")) return;
    dragEnd(e);
  });
  (0, _functions.addEvent)("mousemove", items, function (e) {
    if (!isDown) {
      return false;
    }

    var _target = e.target;
    console.log(_target);
    if (_target.classList.contains("checkbox")) return;
    console.log(e.type);
    dragAction(e);
  }); // // Touch events
  // addEvent("touchstart", items, (e) => {
  //   const _target = e.target;
  //   console.log(_target);
  //   if (_target.classList.contains("checkbox")) return;
  //   dragStart(e);
  // });
  // addEvent("touchmove", items, (e) => {
  //   if (!isDown) {
  //     return false;
  //   }
  //   console.log(e.type);
  //   const _target = e.target;
  //   console.log(_target);
  //   if (_target.classList.contains("checkbox")) return;
  //   dragAction(e);
  // });
  // addEvent("touchend", items, (e) => {
  //   console.log(e.type);
  //   const _target = e.target;
  //   console.log(_target);
  //   if (_target.classList.contains("checkbox")) return;
  //   dragEnd(e);
  // });
  // Transition events

  (0, _functions.addEvent)("transitionend", items, function (e) {
    checkIndex();
  });
}