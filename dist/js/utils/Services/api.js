"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayLocation = exports.getCity = exports.getVilWeather = exports.getNowWeather = void 0;

var _functions = require("./functions.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CORS = "https://cors-anywhere.herokuapp.com";
var END_POINT = "http://apis.data.go.kr/1360000";
var SERVICE = {
  VILAGE: "VilageFcstInfoService",
  MID: "MidFcstInfoService"
};
var API_KEY = "FrXPuaL0ls5tHLK%2F2oPRuCoxI6cYNM93hPWcE6Ta0%2B4gZ6BNNCbirWsBEpoJd6tCieQmHFMdYco1fAxaVe0nyg%3D%3D";
var G_API_KEY = "AIzaSyAXE7WzKYeqyDL5V78FdrnriYQ7ukR04Bw"; //초단기실황 api
//입력받을 데이터, baseDate, baseTime, 좌표

var getNowWeather = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
    var date, mode, baseData, NUMOFROWS, response, resStatus, result, err;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Date를 통해 basetime, basedate계산
            date = new Date();
            mode = "current";
            baseData = (0, _functions.setBase)({
              mode: mode,
              date: date
            });
            NUMOFROWS = 50;
            _context.prev = 4;
            _context.next = 7;
            return fetch("".concat(CORS, "/").concat(END_POINT, "/").concat(SERVICE.VILAGE, "/getUltraSrtFcst?serviceKey=").concat(API_KEY, "&numOfRows=").concat(NUMOFROWS, "&pageNo=1&dataType=JSON&base_date=").concat(baseData.baseDate, "&base_time=").concat(baseData.baseTime, "&nx=").concat(params.x, "&ny=").concat(params.y));

          case 7:
            response = _context.sent;
            resStatus = response.status;
            _context.t0 = resStatus;
            _context.next = _context.t0 === 200 ? 12 : _context.t0 === 400 ? 21 : _context.t0 === 500 ? 23 : 25;
            break;

          case 12:
            _context.next = 14;
            return response.json();

          case 14:
            result = _context.sent;

            if (!(result.response.header.resultCode !== "00")) {
              _context.next = 19;
              break;
            }

            err = new Error();
            err.message = "".concat(result.response.header.resultCode, ",").concat(result.response.header.resultMsg);
            throw err;

          case 19:
            return _context.abrupt("return", result);

          case 21:
            throw new Error("Error Occured = ".concat(resStatus));

          case 23:
            throw new Error("Internal Server Error Occured = ".concat(resStatus));

          case 25:
            throw new Error("unhandled");

          case 27:
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t1 = _context["catch"](4);
            throw _context.t1;

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 29]]);
  }));

  return function getNowWeather(_x) {
    return _ref.apply(this, arguments);
  };
}(); //동네예보 API
//데이터의 개수 및 baseTime을 조정


exports.getNowWeather = getNowWeather;

var getVilWeather = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
    var baseData, NUMOFROWS, date, hours, minutes, todayDate, month, year, mode, response, resStatus, result, err;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseData = null;
            NUMOFROWS = 0;
            date = new Date();
            hours = date.getHours();
            minutes = date.getMinutes();

            if (params.isInit) {
              //새벽 2시 이전
              if (hours < 2) {
                date.setDate(date.getDate() - 1);
              }

              todayDate = date.getDate();
              month = date.getMonth() + 1;
              year = date.getFullYear();
              NUMOFROWS = 200;
              baseData = {
                baseDate: "".concat(year).concat(month < 10 ? "0".concat(month) : month).concat(todayDate < 10 ? "0".concat(todayDate) : todayDate),
                baseTime: "0200"
              };
            } else {
              mode = "vilage";
              baseData = (0, _functions.setBase)({
                mode: mode,
                date: date
              });
              NUMOFROWS = 200;
            }

            _context2.prev = 6;
            _context2.next = 9;
            return fetch("".concat(CORS, "/").concat(END_POINT, "/").concat(SERVICE.VILAGE, "/getVilageFcst?serviceKey=").concat(API_KEY, "&numOfRows=").concat(NUMOFROWS, "&pageNo=1&dataType=JSON&base_date=").concat(baseData.baseDate, "&base_time=").concat(baseData.baseTime, "&nx=").concat(params.x, "&ny=").concat(params.y));

          case 9:
            response = _context2.sent;
            resStatus = response.status;
            _context2.t0 = resStatus;
            _context2.next = _context2.t0 === 200 ? 14 : _context2.t0 === 400 ? 23 : _context2.t0 === 500 ? 25 : 27;
            break;

          case 14:
            _context2.next = 16;
            return response.json();

          case 16:
            result = _context2.sent;

            if (!(result.response.header.resultCode !== "00")) {
              _context2.next = 21;
              break;
            }

            err = new Error();
            err.message = "".concat(result.response.header.resultCode, ",").concat(result.response.header.resultMsg);
            throw err;

          case 21:
            return _context2.abrupt("return", result);

          case 23:
            throw new Error("Error Occured = ".concat(resStatus));

          case 25:
            throw new Error("Internal Server Error Occured = ".concat(resStatus));

          case 27:
            throw new Error("unhandled");

          case 29:
            _context2.next = 34;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t1 = _context2["catch"](6);
            throw _context2.t1;

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 31]]);
  }));

  return function getVilWeather(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getVilWeather = getVilWeather;

var displayLocation = function displayLocation(params) {
  var URL = "".concat(CORS, "/https://maps.googleapis.com/maps/api/geocode/json?latlng=").concat(params.lat, ",").concat(params.lng, "&sensor=true&key=AIzaSyAXE7WzKYeqyDL5V78FdrnriYQ7ukR04Bw");
  return fetch(URL).then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Reponse Error");
    }
  });
};

exports.displayLocation = displayLocation;

var getCity = function getCity(_ref3) {
  var type = _ref3.type,
      wideCode = _ref3.wideCode,
      cityCode = _ref3.cityCode;
  var URL = "".concat(CORS, "/https://www.weather.go.kr/w/rest/zone/dong.do?type=").concat(type, "&wideCode=").concat(wideCode, "&cityCode=").concat(cityCode);
  return fetch(URL).then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Response Error");
    }
  });
};

exports.getCity = getCity;