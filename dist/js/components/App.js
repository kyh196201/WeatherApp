"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Page = _interopRequireDefault(require("./Page.js"));

var _AddrSearch = _interopRequireDefault(require("./AddrSearch.js"));

var _functions = require("../utils/Services/functions.js");

var _gridLatLon = _interopRequireDefault(require("../utils/Services/gridLatLon.js"));

var _Slide = _interopRequireDefault(require("../utils/Services/Slide.js"));

var _ScrollEvent = _interopRequireDefault(require("../utils/Services/ScrollEvent.js"));

var _SharePage = _interopRequireDefault(require("./SharePage.js"));

var _PageNavigator = _interopRequireDefault(require("./PageNavigator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function App(_ref) {
  var _this = this;

  var $target = _ref.$target;
  this.$target = null;
  this.$pages = []; //for mobile

  this.pageIndex = 0;

  var init = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var $pageContainer, $pageWrapper, $prevBtn, $nextBtn, firstPage;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$target = $target;
              _this.pageData = (0, _functions.loadFromLocalStorage)("pageData"); //web or pc

              _this.env = (0, _functions.detectWebMode)();
              $pageContainer = document.createElement("div");
              _this.$pageContainer = $pageContainer;
              _this.$pageContainer.id = "Page-Container";

              _this.$pageContainer.classList.add("swiper-container");

              $pageWrapper = document.createElement("div");
              _this.$pageWrapper = $pageWrapper;
              _this.$pageWrapper.id = "Page-Wrapper";

              _this.$pageWrapper.classList.add("swiper-wrapper"); // 새로 추가한 내용


              $prevBtn = document.createElement("div");
              $prevBtn.className = "swiper-button-prev";
              _this.$prevBtn = $prevBtn;
              $nextBtn = document.createElement("div");
              $nextBtn.className = "swiper-button-next";
              _this.$nextBtn = $nextBtn; // 새로 추가한 내용

              _this.$target.appendChild(_this.$pageContainer);

              _this.$pageContainer.appendChild(_this.$pageWrapper);

              _this.$pageContainer.appendChild(_this.$prevBtn);

              _this.$pageContainer.appendChild(_this.$nextBtn);

              _this.mySlider = new Swiper(".swiper-container", {
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev"
                }
              }); //first Page

              firstPage = new _Page["default"]({
                $target: _this.$pageWrapper,
                index: _this.$pageWrapper.childNodes.length,
                locationData: null,
                addressString: null,
                onClickShare: function onClickShare() {
                  _this.showpageEvent();
                }
              });
              _this.$pages = [].concat(_toConsumableArray(_this.$pages), [firstPage]);
              console.log(_this.$pages); //data load from ls and create another pages

              if (_this.pageData !== null) {
                _this.pageData.forEach(function (data) {
                  _this.addNewPage({
                    locationData: data.locationData,
                    addressString: data.addressString
                  });
                });
              }

              _this.$addrSearch = new _AddrSearch["default"]({
                $target: _this.$target,
                onClick: _this.addNewPage,
                onChange: _this.onChangePage
              }); //SharePage

              _this.$sharePage = new _SharePage["default"]({
                $target: _this.$target,
                visible: false
              });

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function init() {
      return _ref2.apply(this, arguments);
    };
  }(); //End Init()


  this.showpageEvent = function () {
    _this.$sharePage.setState({
      visible: true
    });

    window.onclick = function (e) {
      var _target = e.target;

      if (_target === document.querySelector(".sharePage")) {
        var wrapper = document.querySelector(".content-wrapper");
        wrapper.classList.toggle("zoomOut");
        wrapper.classList.toggle("zoomIn");
        setTimeout(function () {
          _this.$sharePage.setState({
            visible: false
          });
        }, 500);
        window.onclick = null;
      }
    };
  };

  this.addNewPage = function (_ref3) {
    var locationData = _ref3.locationData,
        addressString = _ref3.addressString;
    // const index = this.$pageWrapper.childNodes.length;
    var newPage = new _Page["default"]({
      $target: _this.$pageWrapper,
      index: _this.$pageWrapper.childNodes.length,
      locationData: locationData,
      addressString: addressString,
      onClickShare: function onClickShare() {
        _this.showpageEvent();
      }
    });
    _this.$pages = [].concat(_toConsumableArray(_this.$pages), [newPage]);

    _this.mySlider.update();
  };

  init();
  (0, _functions.detectThemeMode)();
  console.log("App is Start");
}

var _default = App;
exports["default"] = _default;