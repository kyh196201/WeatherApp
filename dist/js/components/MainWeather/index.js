"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../../utils/Services/functions.js");

var _TimeStamp = _interopRequireDefault(require("../../utils/Services/TimeStamp.js"));

var _constants = require("../../utils/Services/constants.js");

var _ByTimeWeather = _interopRequireDefault(require("./ByTimeWeather.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainWeather = function MainWeather(_ref) {
  var _this = this;

  var $target = _ref.$target,
      data = _ref.data,
      addressString = _ref.addressString;

  _classCallCheck(this, MainWeather);

  this.setState = function (_ref2) {
    var newData = _ref2.newData;
    _this.data = newData;
    _this.addressString = newData.addressString;

    _this.render();
  };

  this.render = function () {
    _this.$locationInfo.innerHTML = _this.addressString; //하위 컴포넌트들의 setState()호출

    _this.$byTimeWeather.setState({
      newData: _this.data.byTimeData
    });
  };

  this.bindEvent = function () {
    var toggleCheckBox = document.querySelector(".checkbox");
    (0, _functions.addEvent)("change", toggleCheckBox, function (e) {
      e.stopPropagation();
      var _target = e.target;
      var checked = e.target.checked;

      if (checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  };

  this.$target = $target;
  this.data = data;
  this.addressString = addressString;
  var classTitle = "MainWeather"; //상수화

  var $wrapper = document.createElement("section");
  $wrapper.className = "".concat(classTitle, "__wrapper");
  this.$wrapper = $wrapper;
  var $header = document.createElement("header");
  $header.className = "".concat(classTitle, "__header");
  this.$header = $header;
  var $timeStamp = document.createElement("div");
  $timeStamp.className = "".concat(classTitle, "__timeStamp");
  this.$timeStamp = $timeStamp;
  var $locationInfo = document.createElement("div");
  $locationInfo.className = "".concat(classTitle, "__locationInfo");
  this.$locationInfo = $locationInfo;
  var $section = document.createElement("section");
  $section.className = "".concat(classTitle, "__section");
  this.$section = $section;
  var $toggleBtn = document.createElement("div");
  $toggleBtn.className = "themeToggleBtn";
  this.$toggleBtn = $toggleBtn;
  this.$toggleBtn.innerHTML = _constants.TOGGLE_STRING;
  this.$target.appendChild(this.$wrapper);
  this.$wrapper.appendChild(this.$header);
  this.$wrapper.appendChild(this.$section);
  this.$wrapper.appendChild(this.$toggleBtn);
  this.$header.appendChild(this.$timeStamp);
  this.$header.appendChild(this.$locationInfo);
  new _TimeStamp["default"]({
    $target: this.$timeStamp,
    mode: _constants.CLOCK_MODE.MAIN
  });
  this.$byTimeWeather = new _ByTimeWeather["default"]({
    $target: this.$section,
    data: null
  });
  this.$locationInfo.innerHTML = this.addressString;
  this.bindEvent();
};

var _default = MainWeather;
exports["default"] = _default;