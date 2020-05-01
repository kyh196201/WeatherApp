"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("./constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeStamp = function TimeStamp(_ref) {
  var _this = this;

  var $target = _ref.$target,
      mode = _ref.mode;

  _classCallCheck(this, TimeStamp);

  this.render = function () {
    var d = new Date();
    var month = d.getMonth() + 1;
    var date = d.getDate();

    var day = _constants.DAYS[d.getDay()];

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var AMPM = hours > 12 ? "PM" : "AM";
    var dString = "";
    var dateString = "".concat(month, "\uC6D4 ").concat(date, "\uC77C");
    var timeString = "".concat(hours > 12 ? hours - 12 : hours, ":").concat(minutes < 10 ? "0".concat(minutes) : minutes, ":").concat(seconds, " ").concat(AMPM);

    if (_this.mode === _constants.CLOCK_MODE.CURRENT) {
      dString = dateString + "(".concat(day, ") ") + timeString;
    } else if (_this.mode === _constants.CLOCK_MODE.MAIN) {
      dString = "<div>".concat(dateString, "</div><div>").concat(timeString, "</div>");
    }

    _this.$target.innerHTML = dString;
  };

  this.$target = $target;
  this.mode = mode;
  this.render();
  var clock = setInterval(this.render, 1000);
};

var _default = TimeStamp;
exports["default"] = _default;