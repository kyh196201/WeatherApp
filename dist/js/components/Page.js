"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./CurrentWeather/index.js"));

var _index2 = _interopRequireDefault(require("./MainWeather/index.js"));

var _gridLatLon = _interopRequireDefault(require("../utils/Services/gridLatLon.js"));

var _api = require("../utils/Services/api.js");

var _constants = require("../utils/Services/constants.js");

var _functions = require("../utils/Services/functions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page = function Page(_ref) {
  var $target = _ref.$target,
      index = _ref.index,
      locationData = _ref.locationData,
      addressString = _ref.addressString,
      onClickShare = _ref.onClickShare;

  _classCallCheck(this, Page);

  _initialiseProps.call(this);

  this.data = null;
  this.$target = $target;
  this.nowDate = new Date();
  this.index = index;
  this.locationData = locationData;
  this.addressString = addressString || "";
  var $page = document.createElement("div");
  $page.classList.add("page"); // 새로 추가

  $page.classList.add("swiper-slide"); // 새로 추가

  $page.id = "page".concat(index);
  $page.dataset.index = index;
  this.$page = $page;
  this.$target.appendChild(this.$page);
  this.$currentWeather = new _index["default"]({
    $target: this.$page,
    data: {},
    addressString: this.addressString,
    onReload: this.reloadData,
    onClickShare: onClickShare
  });
  this.$mainWeather = new _index2["default"]({
    $target: this.$page,
    data: null,
    addressString: this.addressString
  });
  this.init();
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.render = function () {
    _this.$currentWeather.setState({
      newData: {
        nowData: _this.data.nowData,
        vilData: _this.data.vilData,
        addressString: _this.data.addressString
      }
    });

    _this.$mainWeather.setState({
      newData: {
        byTimeData: _this.data.byTimeData,
        weeklyData: null,
        addressString: _this.data.addressString
      }
    });
  };

  this.setState = function (_ref2) {
    var loadedData = _ref2.loadedData;
    var newData = {
      nowData: loadedData[0],
      vilData: loadedData[1],
      byTimeData: loadedData[2],
      addressString: _this.addressString || loadedData[3]
    };
    console.log(newData);
    _this.data = newData;

    _this.render();
  };

  this.init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var latlng, loadedData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            (0, _functions.loading)(true);

            if (_this.locationData) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return (0, _functions.getPosition)(null);

          case 5:
            latlng = _context.sent;
            _this.locationData = (0, _gridLatLon["default"])("toXY", latlng.latitude, latlng.longitude);

          case 7:
            _context.next = 9;
            return _this.loadData({
              isAddress: _this.addressString.length !== 0
            });

          case 9:
            loadedData = _context.sent;

            _this.setState({
              loadedData: loadedData
            });

            (0, _functions.loading)(false);
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.dir(_context.t0);
            console.error("\uC5D0\uB7EC \uBC1C\uC0DD! \uBA54\uC2DC\uC9C0 : ".concat(_context.t0.message));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  this.loadData = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref4) {
      var isAddress;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              isAddress = _ref4.isAddress;

              if (!isAddress) {
                _context9.next = 7;
                break;
              }

              _context9.next = 4;
              return Promise.all([_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var newData, nowWeatherData;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        newData = [];
                        _context2.next = 3;
                        return (0, _api.getNowWeather)({
                          x: _this.locationData.x,
                          y: _this.locationData.y
                        });

                      case 3:
                        nowWeatherData = _context2.sent;
                        nowWeatherData.response.body.items.item.filter(function (data) {
                          return _constants.FILTERING.CURRENT.includes(data.category);
                        }).forEach(function (el) {
                          newData.push({
                            category: el.category,
                            fcstDate: el.fcstDate,
                            fcstTime: el.fcstTime,
                            fcstValue: el.fcstValue
                          });
                        });
                        return _context2.abrupt("return", newData);

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }))(), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var newData, vilWeatherData;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        newData = [];
                        _context3.next = 3;
                        return (0, _api.getVilWeather)({
                          x: _this.locationData.x,
                          y: _this.locationData.y,
                          isInit: true
                        });

                      case 3:
                        vilWeatherData = _context3.sent;
                        vilWeatherData.response.body.items.item.filter(function (data) {
                          return _constants.FILTERING.VILAGE.includes(data.category);
                        }).forEach(function (el) {
                          newData.push({
                            category: el.category,
                            fcstDate: el.fcstDate,
                            fcstTime: el.fcstTime,
                            fcstValue: el.fcstValue
                          });
                        });
                        return _context3.abrupt("return", newData);

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }))(), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var byTimeData, groupedByDate, groupedByTime;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return (0, _api.getVilWeather)({
                          x: _this.locationData.x,
                          y: _this.locationData.y,
                          isInit: false
                        });

                      case 2:
                        byTimeData = _context4.sent;
                        groupedByDate = (0, _functions.groupBy)(byTimeData.response.body.items.item, "fcstDate");
                        groupedByTime = Object.values(groupedByDate).map(function (el) {
                          return Object.values((0, _functions.groupBy)(el, "fcstTime"));
                        });
                        return _context4.abrupt("return", groupedByTime);

                      case 6:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }))()]);

            case 4:
              return _context9.abrupt("return", _context9.sent);

            case 7:
              _context9.next = 9;
              return Promise.all([_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var newData, nowWeatherData;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        newData = [];
                        _context5.next = 3;
                        return (0, _api.getNowWeather)({
                          x: _this.locationData.x,
                          y: _this.locationData.y
                        });

                      case 3:
                        nowWeatherData = _context5.sent;
                        nowWeatherData.response.body.items.item.filter(function (data) {
                          return _constants.FILTERING.CURRENT.includes(data.category);
                        }).forEach(function (el) {
                          newData.push({
                            category: el.category,
                            fcstDate: el.fcstDate,
                            fcstTime: el.fcstTime,
                            fcstValue: el.fcstValue
                          });
                        });
                        return _context5.abrupt("return", newData);

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }))(), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var newData, vilWeatherData;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        newData = [];
                        _context6.next = 3;
                        return (0, _api.getVilWeather)({
                          x: _this.locationData.x,
                          y: _this.locationData.y,
                          isInit: true
                        });

                      case 3:
                        vilWeatherData = _context6.sent;
                        vilWeatherData.response.body.items.item.filter(function (data) {
                          return _constants.FILTERING.VILAGE.includes(data.category);
                        }).forEach(function (el) {
                          newData.push({
                            category: el.category,
                            fcstDate: el.fcstDate,
                            fcstTime: el.fcstTime,
                            fcstValue: el.fcstValue
                          });
                        });
                        return _context6.abrupt("return", newData);

                      case 6:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }))(), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var byTimeData, groupedByDate, groupedByTime;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return (0, _api.getVilWeather)({
                          x: _this.locationData.x,
                          y: _this.locationData.y,
                          isInit: false
                        });

                      case 2:
                        byTimeData = _context7.sent;
                        groupedByDate = (0, _functions.groupBy)(byTimeData.response.body.items.item, "fcstDate");
                        groupedByTime = Object.values(groupedByDate).map(function (el) {
                          return Object.values((0, _functions.groupBy)(el, "fcstTime"));
                        });
                        return _context7.abrupt("return", groupedByTime);

                      case 6:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }))(), _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var location;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return (0, _api.displayLocation)({
                          lat: _this.locationData.lat,
                          lng: _this.locationData.lng
                        });

                      case 2:
                        location = _context8.sent;
                        return _context8.abrupt("return", location.results.filter(function (item) {
                          return item.types.includes("postal_code");
                        })[0].formatted_address.substring(5));

                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }))()]);

            case 9:
              return _context9.abrupt("return", _context9.sent);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.reloadData = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(index) {
      var latlng, loadedData;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              (0, _functions.loading)(true);

              if (!(index === 0)) {
                _context10.next = 7;
                break;
              }

              _context10.next = 4;
              return (0, _functions.getPosition)(null);

            case 4:
              latlng = _context10.sent;
              _this.locationData = (0, _gridLatLon["default"])("toXY", latlng.latitude, latlng.longitude);
              _this.addressString = "";

            case 7:
              _context10.next = 9;
              return _this.loadData({
                isAddress: _this.addressString.length !== 0
              });

            case 9:
              loadedData = _context10.sent;

              _this.setState({
                loadedData: loadedData
              });

              (0, _functions.loading)(false);

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x2) {
      return _ref13.apply(this, arguments);
    };
  }();
};

var _default = Page;
exports["default"] = _default;