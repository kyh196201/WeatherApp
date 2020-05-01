"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Section = _interopRequireDefault(require("./Section.js"));

var _functions = require("../../utils/Services/functions.js");

var _TimeStamp = _interopRequireDefault(require("../../utils/Services/TimeStamp.js"));

var _constants = require("../../utils/Services/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrentWeather = function CurrentWeather(_ref) {
  var _this = this;

  var $target = _ref.$target,
      data = _ref.data,
      addressString = _ref.addressString,
      onReload = _ref.onReload,
      onClickShare = _ref.onClickShare;

  _classCallCheck(this, CurrentWeather);

  this.render = function () {
    _this.$section.setState(_this.data);

    _this.$location.innerHTML = "<i class=\"fas fa-location-arrow\"></i>" + _this.addressString;
  };

  this.setState = function (_ref2) {
    var newData = _ref2.newData;
    var SKY = newData.nowData.filter(function (el) {
      return el.category === "SKY";
    });
    var T1H = newData.nowData.filter(function (el) {
      return el.category === "T1H";
    });
    var REH = newData.nowData.filter(function (el) {
      return el.category === "REH";
    });
    var RN1 = newData.nowData.filter(function (el) {
      return el.category === "RN1";
    });
    var PTY = newData.nowData.filter(function (el) {
      return el.category === "PTY";
    });
    var TMX = newData.vilData.filter(function (el) {
      return el.category === "TMX";
    });
    var TMN = newData.vilData.filter(function (el) {
      return el.category === "TMN";
    });
    var d = new Date();
    var todayDate = d.getDate();
    var dateEnd = parseInt(TMX[0].fcstDate.substring(6));
    _this.data["nowData"] = {
      SKY: SKY[0],
      T1H: T1H[0],
      REH: REH[0],
      RN1: RN1[0],
      PTY: PTY[0]
    };

    if (!_this.data.vilData || todayDate === dateEnd) {
      _this.data["vilData"] = {
        TMX: TMX[0],
        TMN: TMN[0]
      };
    }

    _this.addressString = newData.addressString;

    _this.render();
  };

  this.bindEvents = function () {
    (0, _functions.addEvent)("click", _this.$reloadBtn, function (e) {
      var index = _this.$target.dataset.index;

      _this.onReload(index);
    });
    (0, _functions.addEvent)("touchend", _this.$reloadBtn, function (e) {
      var index = _this.$target.dataset.index;

      _this.onReload(index);
    });
    (0, _functions.addEvent)("mousedown", _this.$shareBtn, function (e) {
      console.log(e.type);
      e.stopPropagation();

      _this.onClickShare();
    });
    (0, _functions.addEvent)("click", _this.$plusBtn, function (e) {
      var $addSearch = document.querySelector(".AddrSearch ");
      $addSearch.classList.add("active");
    });
    (0, _functions.addEvent)("touchend", _this.$plusBtn, function (e) {
      var $addSearch = document.querySelector(".AddrSearch ");
      $addSearch.classList.add("active");
    });
    (0, _functions.addEvent)("click", _this.$scrollDownBtn, function (e) {
      e.preventDefault();
      var target = document.querySelector(".MainWeather__wrapper");
      target.scrollIntoView();
    });
    (0, _functions.addEvent)("touchend", _this.$scrollDownBtn, function (e) {
      var target = document.querySelector(".MainWeather__wrapper");
      target.scrollIntoView();
    });
  };

  //$target = page
  this.$target = $target;
  this.data = data;
  this.addressString = addressString;
  this.onReload = onReload;
  this.onClickShare = onClickShare; //섹션 컴포넌트 생성

  var $wrapper = document.createElement("section");
  $wrapper.className = "CurrentWeather__wrapper";
  this.$wrapper = $wrapper; //헤더 컴포넌트 생성

  var $header = document.createElement("header");
  $header.className = "CurrentWeather__header";
  this.$header = $header; //타임스탬프 컴포넌트 생성

  var $timeStamp = document.createElement("div");
  $timeStamp.className = "CurrentWeather__timeStamp";
  this.$timeStamp = $timeStamp;
  this.$header.appendChild(this.$timeStamp); //NAV 컴포넌트 생성

  var $nav = document.createElement("nav");
  $nav.className = "CurrentWeather__nav";
  this.$nav = $nav;
  var $location = document.createElement("div");
  $location.className = "CurrentWeather__location";
  this.$location = $location;
  var $buttons = document.createElement("div");
  $buttons.className = "CurrentWeather__buttons";
  this.$buttons = $buttons;
  var $reloadBtn = document.createElement("a");
  $reloadBtn.innerHTML = "<i class=\"fas fa-retweet\"></i>";
  $reloadBtn.className = "reloadBtn";
  this.$reloadBtn = $reloadBtn;
  var $shareBtn = document.createElement("a");
  $shareBtn.innerHTML = "<i class=\"fas fa-share-square\"></i>";
  $shareBtn.className = "shareBtn";
  this.$shareBtn = $shareBtn;
  var $plusBtn = document.createElement("a");
  $plusBtn.innerHTML = "<i class=\"fas fa-plus\"></i>";
  $plusBtn.className = "plusBtn";
  this.$plusBtn = $plusBtn;
  this.$buttons.appendChild(this.$reloadBtn);
  this.$buttons.appendChild(this.$shareBtn);
  this.$buttons.appendChild(this.$plusBtn);
  this.$nav.appendChild(this.$location);
  this.$nav.appendChild(this.$buttons); //어펜드

  this.$wrapper.appendChild(this.$header);
  this.$wrapper.appendChild(this.$nav); // this.$wrapper.appendChild(this.$toggleContainer);
  //섹션 컴포넌트 생성

  this.$section = new _Section["default"]({
    $target: this.$wrapper,
    data: null
  });
  var $scrollDownBtn = document.createElement("div");
  $scrollDownBtn.innerHTML = '<a href="#"><i class="fas fa-sort-down"></i></a>';
  $scrollDownBtn.className = "CurrentWeather__scrollDownBtn";
  this.$scrollDownBtn = $scrollDownBtn;
  this.$wrapper.appendChild(this.$scrollDownBtn);
  this.$target.appendChild(this.$wrapper);
  new _TimeStamp["default"]({
    $target: this.$timeStamp,
    mode: _constants.CLOCK_MODE.CURRENT
  });
  this.$location.innerHTML = this.addressString; //이벤트 생성

  this.bindEvents();
};

var _default = CurrentWeather;
exports["default"] = _default;