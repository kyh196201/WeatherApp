"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../../utils/Services/constants.js");

var _functions = require("../../utils/Services/functions.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Section = function Section(_ref) {
  var _this = this;

  var $target = _ref.$target,
      data = _ref.data;

  _classCallCheck(this, Section);

  this.render = function () {
    var d = new Date();
    var hours = d.getHours();
    var randNum = Math.floor(Math.random() * 2);
    var isRain = _this.nowData.RN1.fcstValue > 0;
    var isSnow = isRain && _this.nowData.PTY.fcstValue === 3;
    var isDayTime = hours > 6 && hours < 20;
    var iconTimeSelector = isDayTime ? 0 : 1;
    var skyState = _constants.SKY_STATE[_this.nowData.SKY.fcstValue].value;

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
    var icon = "<span class=\"Current__icon\"><i class=\"wi ".concat(weatherVar.icon[iconTimeSelector], "\" style=\"color:").concat(weatherVar.color[iconTimeSelector], "\"></i></span>");
    var sky = "<span class=\"Current__skyState\">".concat(weatherVar.title, "</span>");
    var currentTemp = "<span class=\"Current__currentTemp\">".concat(_this.nowData.T1H.fcstValue, "&ordm;</span>");
    var minMaxTemp = "<span class=\"Current__minMaxTemp\">".concat(_this.vilData.TMX.fcstValue, "&ordm;/").concat(_this.vilData.TMN.fcstValue, "&ordm;</span>");
    var wet = "<span class=\"Current__wet\">".concat(_this.nowData.REH.fcstValue, "%</span>");
    _this.$currentInfo.innerHTML = icon + sky + currentTemp + minMaxTemp + wet;
    _this.$currentGreet.innerHTML = _constants.weatherCases[skyState].subTitle[randNum];
  };

  this.setState = function (newData) {
    _this.nowData = newData.nowData;
    _this.vilData = newData.vilData;
    console.log(_this.nowData, _this.vilData);

    _this.render();
  };

  this.bindEvents = function () {
    (0, _functions.addEvent)("click", _this.$currentInfo, function (e) {
      e.stopPropagation();
      var target = document.querySelector(".MainWeather__wrapper");
      target.scrollIntoView();
    });
    (0, _functions.addEvent)("touchend", _this.$currentInfo, function (e) {
      e.stopPropagation();
      var target = document.querySelector(".MainWeather__wrapper");
      target.scrollIntoView();
    });
  };

  this.$target = $target;
  this.data = data; //DailyWeather Section

  var $section = document.createElement("section");
  $section.className = "CurrentWeather__section";
  this.$section = $section; //Ul

  var $ul = document.createElement("ul");
  $ul.className = "CurrentWeather__list";
  this.$ul = $ul; //ul Items

  var $currentInfo = document.createElement("li");
  $currentInfo.className = "CurrentWeather__info";
  this.$currentInfo = $currentInfo;
  this.$currentInfo.innerHTML = "정보를 불러오는 중입니다.";
  var $currentGreet = document.createElement("li");
  $currentGreet.className = "CurrentWeather__greet";
  this.$currentGreet = $currentGreet;
  this.$ul.appendChild(this.$currentInfo);
  this.$ul.appendChild(this.$currentGreet);
  this.$section.appendChild(this.$ul);
  this.$target.appendChild(this.$section);
  this.bindEvents();
};

var _default = Section;
exports["default"] = _default;