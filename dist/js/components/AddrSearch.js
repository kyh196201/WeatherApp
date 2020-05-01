"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../utils/Services/api.js");

var _constants = require("../utils/Services/constants.js");

var _functions = require("../utils/Services/functions.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddrSearch = function AddrSearch(_ref) {
  var _this = this;

  var $target = _ref.$target,
      onClick = _ref.onClick,
      onChange = _ref.onChange;

  _classCallCheck(this, AddrSearch);

  this.render = function () {
    var upperString = "";

    if (_this.TYPE === _constants.TYPESLIST.c) {
      upperString = "<li class=\"addr-item\"><button class=\"addr-button\" data-goto=".concat(_constants.TYPESLIST.w, ">\uC0C1\uC704</button></li>");
    } else if (_this.TYPE === _constants.TYPESLIST.d) {
      upperString = "<li class=\"addr-item\"><button class=\"addr-button\" data-goto=".concat(_constants.TYPESLIST.c, ">\uC0C1\uC704</button></li>");
    }

    var htmlString = _this.data.map(function (item) {
      return "<li class=\"addr-item\"><button class=\"addr-button\" data-code=".concat(item.code, " data-level=").concat(item.level, " data-x=").concat(item.x, " data-y=").concat(item.y, " data-lat=").concat(item.lat, " data-lng=").concat(item.lon, " data-name=").concat(item.name, ">").concat(item.name, "</button></li>");
    }).join("");

    _this.$ul.innerHTML = upperString + htmlString;
  };

  this.setState = function (newData) {
    _this.data = newData;

    _this.render();
  };

  this.getDataAfterLoad = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var newData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _functions.loading)(true);
            _context.next = 3;
            return _this.getData();

          case 3:
            newData = _context.sent;

            _this.setState(newData);

            (0, _functions.loading)(false);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  this.getData = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _api.getCity)({
              type: _this.TYPE,
              wideCode: _this.WIDE_CODE,
              cityCode: _this.CITY_CODE
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  this.findInLocalStorage = function (addressString) {
    var pageData = (0, _functions.loadFromLocalStorage)("pageData");

    if (pageData === null) {
      return NaN;
    }

    var foundData = pageData.filter(function (e) {
      return e.addressString === addressString;
    });

    if (foundData.length === 1) {
      return foundData[0].index;
    }

    return NaN;
  };

  this.$target = $target;
  this.onClick = onClick;
  this.onChange = onChange;
  this.initialData = null;
  this.data = null;
  this.TYPE = _constants.TYPESLIST.w;
  this.WIDE_CODE = "";
  this.CITY_CODE = "";
  this.address = [];
  var $AddrSearch = document.createElement("div");
  this.$AddrSearch = $AddrSearch;
  this.$AddrSearch.className = "AddrSearch";
  var $title = document.createElement("h4");
  this.$title = $title;
  this.$title.innerHTML = "지역검색";
  var $closeBtn = document.createElement("button");
  this.$closeBtn = $closeBtn;
  this.$closeBtn.innerHTML = "<i class=\"fas fa-times\"></i>";
  this.$closeBtn.className = "AddrSearch-close";
  var $ul = document.createElement("ul");
  this.$ul = $ul;
  this.$ul.className = "AddrSearch-list";
  this.$AddrSearch.appendChild(this.$title);
  this.$AddrSearch.appendChild(this.$closeBtn);
  this.$AddrSearch.appendChild(this.$ul);
  this.$target.appendChild(this.$AddrSearch);

  try {
    this.getData().then(function (data) {
      _this.initialData = data;

      _this.setState(data);
    });
  } catch (e) {
    console.error(e);
  }

  (0, _functions.addEvent)("click", this.$closeBtn, function (e) {
    _this.$AddrSearch.classList.remove("active");
  });
  this.$ul.addEventListener("click", function (e) {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }

    var target = e.target;
    var level = target.dataset.level;
    var code = target.dataset.code;
    var name = target.dataset.name;

    if (target.dataset["goto"]) {
      var GOTO = target.dataset["goto"];
      _this.TYPE = GOTO;

      if (GOTO === _constants.TYPESLIST.w) {
        _this.CITY_CODE = "";
        _this.WIDE_CODE = "";
      } else {
        _this.CITY_CODE = "";
      }

      _this.getDataAfterLoad();
    } else {
      switch (level) {
        case "1":
          _this.address = [].concat(_toConsumableArray(_this.address), [name]);
          _this.TYPE = _constants.TYPESLIST.c;
          _this.WIDE_CODE = code;

          _this.getDataAfterLoad();

          break;

        case "2":
          _this.address = [].concat(_toConsumableArray(_this.address), [name]);
          _this.TYPE = _constants.TYPESLIST.d;
          _this.CITY_CODE = code;

          _this.getDataAfterLoad();

          break;

        case "3":
          _this.address = [].concat(_toConsumableArray(_this.address), [name]);

          var addressString = _this.address.join(" ");

          var locationData = {
            x: target.dataset.x,
            y: target.dataset.y,
            lat: target.dataset.lat,
            lng: target.dataset.lng
          };

          var pageIndex = _this.findInLocalStorage(addressString);

          if (isNaN(pageIndex)) {
            var index = document.getElementById("Page-Wrapper").childNodes.length;
            (0, _functions.storeToLocalStorage)({
              locationData: locationData,
              addressString: addressString,
              index: index
            });

            _this.onClick({
              locationData: locationData,
              addressString: addressString
            });
          } else {
            //화면 해당 페이지로 전환
            // this.onChange(pageIndex);
            alert("page가 이미 있습니다.");
          }

          _this.$AddrSearch.classList.remove("active");

          _this.TYPE = _constants.TYPESLIST.w; //상위 버튼 남아있는 것을 없애기 위해

          _this.CITY_CODE = "";
          _this.WIDE_CODE = "";

          _this.setState(_this.initialData);

          _this.address = [];
          break;

        default:
          break;
      }
    }
  });
};

var _default = AddrSearch;
exports["default"] = _default;