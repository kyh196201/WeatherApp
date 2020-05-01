"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("./functions.js");

function ScrollEvent(_ref) {
  var _this = this;

  var $element = _ref.$element;
  var lastPos = 0;

  this.init = function () {
    var element = $element;
    var isWindow = element === window;

    _this.bindEvent();
  };

  this.init();

  this.bindEvent = function () {
    (0, _functions.addEvent)("scroll", element, _.debounce(function (e) {
      e.stopPropagation();
      var newPos = element.scrollY || element.scrollTop;

      if (lastPos < newPos) {
        //down
        console.log("go down");
        var elHeight = isWindow ? window.innerHeight : element.offsetHeight;

        if (lastPos < elHeight) {
          console.log(elHeight);
          var target = document.querySelector(".MainWeather__wrapper");
          target.scrollIntoView();
          lastPos = target.scrollTop;
        }
      } else {
        //Up
        console.log("go up");
      }

      lastPos = newPos <= 0 ? 0 : newPos;
    }, 150));
  };
}

var _default = ScrollEvent;
exports["default"] = _default;