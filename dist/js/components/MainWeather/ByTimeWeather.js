"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../../utils/Services/functions.js");

var _constants = require("../../utils/Services/constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ByTimeWeather = function ByTimeWeather(_ref) {
  var _this = this;

  var $target = _ref.$target,
      data = _ref.data;

  _classCallCheck(this, ByTimeWeather);

  this.render = function () {
    var contString = "";

    for (var i = 0; i < _this.data.length; i++) {
      var _length = _this.data[i].length;

      for (var j = 0; j < _length; j++) {
        var hours = _this.data[i][j][0].fcstTime.substr(0, 2);

        var isDayTime = hours > 6 && hours < 20;
        var iconTimeSelector = isDayTime ? 0 : 1;

        var skyValue = _this.data[i][j].find(function (it) {
          return it.category === "SKY";
        });

        var skyFcstValue = skyValue !== undefined ? skyValue.fcstValue : "undefined";

        var popValue = _this.data[i][j].find(function (it) {
          return it.category === "POP";
        });

        var popFcstValue = popValue !== undefined ? popValue.fcstValue : "undefined";

        var ptyValue = _this.data[i][j].find(function (it) {
          return it.category === "PTY";
        });

        var ptyFcstValue = ptyValue !== undefined ? ptyValue.fcstValue : "undefined";

        var tempValue = _this.data[i][j].find(function (it) {
          return it.category === "T3H";
        });

        var tempFcstValue = tempValue !== undefined ? tempValue.fcstValue : "undefined";
        var skyState = _constants.SKY_STATE[skyFcstValue].value;
        var isRain = ptyFcstValue === "1" || ptyFcstValue === "4";
        var isSnow = ptyFcstValue === "2" || ptyFcstValue === "3";

        if (Array.isArray(skyState)) {
          if (isSnow) {
            skyState = "Snow";
          } else if (isRain) {
            skyState = "Rain";
          } else {
            skyState = "Cloudy";
          }
        }

        var weatherVar = _constants.weatherCases[skyState];
        var timeString = "<li>".concat(parseInt(hours), "\uC2DC</li>");
        var iconString = "<li><i class=\"wi ".concat(weatherVar.icon[iconTimeSelector], "\" style=\"color:").concat(weatherVar.color[iconTimeSelector], "\"></i></li>");
        var rainPercentString = popFcstValue !== "0" ? "<li>".concat(popFcstValue, "%</li>") : "<li style=\"visibility:hidden\">".concat(popFcstValue, "%</li>");
        var tempString = "<li>".concat(tempFcstValue, "&ordm;</li>");
        var htmlString = timeString + iconString + rainPercentString + tempString;
        contString = contString + "<ul>".concat(htmlString, "</ul>");
      }
    }

    _this.$field.innerHTML = contString;
  };

  this.setState = function (_ref2) {
    var newData = _ref2.newData;
    _this.data = newData;
    console.log(_this.data);

    _this.render();
  };

  this.bindEvent = function () {
    var slider = _this.$field;
    var isDown = false;
    var startX;
    var scrollLeft;

    var slideStart = function slideStart(e) {
      isDown = true;
      slider.classList.add("active");
      var clickX = e.pageX;

      if (e.type === "touchstart") {
        clickX = e.touches[0].clientX;
      }

      startX = clickX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    var slideEnd = function slideEnd(e) {
      isDown = false;
      slider.classList.remove("active");
    };

    var slideAction = function slideAction(e) {
      if (!isDown) return;
      e.preventDefault();
      var clickX = e.pageX;

      if (e.type === "touchmove") {
        clickX = e.touches[0].clientX;
      }

      var x = clickX - slider.offsetLeft;
      var walk = (x - startX) * 2; //scroll-fast

      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    };

    (0, _functions.addEvent)("mousedown", _this.$target, function (e) {
      e.stopPropagation();
    });
    (0, _functions.addEvent)("touchstart", _this.$target, function (e) {
      e.stopPropagation();
    });
    (0, _functions.addEvent)("mousedown", slider, function (e) {
      e.stopPropagation();
      slideStart(e);
    });
    (0, _functions.addEvent)("mouseleave", slider, function (e) {
      e.stopPropagation();
      slideEnd(e);
    });
    (0, _functions.addEvent)("mouseup", slider, function (e) {
      e.stopPropagation();
      slideEnd(e);
    });
    (0, _functions.addEvent)("mousemove", slider, function (e) {
      e.stopPropagation();
      slideAction(e);
    });
    (0, _functions.addEvent)("touchstart", slider, function (e) {
      e.stopPropagation();
      slideStart(e);
    });
    (0, _functions.addEvent)("touchmove", slider, function (e) {
      e.stopPropagation();
      slideAction(e);
    });
    (0, _functions.addEvent)("touchend", slider, function (e) {
      e.stopPropagation();
      slideEnd(e);
    });
  };

  this.$target = $target;
  this.data = data;
  var $body = document.createElement("div");
  $body.className = "byTimeWeather";
  this.$body = $body;
  var $title = document.createElement("h3");
  $title.className = "byTimeWeather__title";
  this.$title = $title;
  this.$title.innerHTML = "시간대별 날씨";
  var $wrapper = document.createElement("div");
  $wrapper.className = "byTimeWeather__wrapper";
  this.$wrapper = $wrapper;
  var $field = document.createElement("div");
  $field.className = "byTimeWeather__field";
  this.$field = $field;
  this.$wrapper.appendChild(this.$field);
  this.$body.appendChild(this.$title);
  this.$body.appendChild(this.$wrapper);
  this.$target.appendChild(this.$body);
  this.bindEvent();
};

var _default = ByTimeWeather;
exports["default"] = _default;