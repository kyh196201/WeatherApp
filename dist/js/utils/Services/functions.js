"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEvent = addEvent;
exports.setBase = setBase;
exports.groupBy = groupBy;
exports.loading = loading;
exports.detectThemeMode = detectThemeMode;
exports.detectWebMode = detectWebMode;
exports.loadFromLocalStorage = exports.storeToLocalStorage = exports.getPosition = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function addEvent(evnt, $elem, func) {
  if ($elem.addEventListener) // W3C DOM
    $elem.addEventListener(evnt, func, false);else if ($elem.attachEvent) {
    // IE DOM
    $elem.attachEvent("on" + evnt, func);
  } else {
    // No much to do
    $elem["on" + evnt] = func;
  }
} //래퍼런스 : https://kkiuk.tistory.com/212


var getPosition = function getPosition(options) {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        resolve(pos.coords);
      }, function () {
        reject(new Error("Request is failed"));
      });
    } else {
      reject(new Error("Geolocation is not exist"));
    }
  });
}; //날짜 계산 함수


exports.getPosition = getPosition;

function setBase(_ref) {
  var mode = _ref.mode,
      date = _ref.date;
  var baseTime = null;
  var baseDate = null;
  var d = date;
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var todayDate = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();

  if (mode === "current") {
    if (minute < 46) {
      hour = hour - 1;

      if (hour < 0) {
        //시간이 0시 일 경우 전날 23시의 데이터를 가져와야한다.
        d.setDate(todayDate - 1);
        year = d.getFullYear();
        month = d.getMonth() + 1;
        todayDate = d.getDate();
        hour = 23;
      }
    }

    minute = 30;
  } //동네예보 baseTime set
  else if (mode === "vilage") {
      if (hour % 3 === 2) {
        //시간이 2,5,8,중에 하나이지만 10분이 안지났을 경우
        if (minute <= 10) {
          hour = hour - 3; //시간이 2시 이전 일경우 전날 23시의 데이터를 받아와야한다.

          if (hour < 0) {
            d.setDate(todayDate - 1);
            year = d.getFullYear();
            month = d.getMonth() + 1;
            todayDate = d.getDate();
            hour = 23;
          }
        }
      } //시간이 2,5,8.. 중에 하나가 아닐경우
      else {
          hour = hour - (hour + 1) % 3;

          if (hour < 0) {
            d.setDate(todayDate - 1);
            year = d.getFullYear();
            month = d.getMonth() + 1;
            todayDate = d.getDate();
            hour = 23;
          }
        }

      minute = 0;
    }

  baseDate = "".concat(year).concat(month < 10 ? "0".concat(month) : month).concat(todayDate < 10 ? "0".concat(todayDate) : todayDate);
  baseTime = "".concat(hour < 10 ? "0".concat(hour) : hour, "00");
  var result = {
    baseDate: baseDate,
    baseTime: baseTime
  };
  return result;
}

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property]; //정렬이 안된 원인 0900 = string, 1200 = int 타입이라서 문제 발생

    var parsedKey = parseInt(key);

    if (!acc[parsedKey]) {
      acc[parsedKey] = [];
    } // delete obj[property]; //이 함수가 진행될때 마다 해당 property에 해당하는 값을 지운다.


    acc[parsedKey].push(obj);
    return acc;
  }, {});
}

function loading(isLoading) {
  var loader = document.getElementById("loader");

  if (isLoading) {
    loader.classList.add("active");
  } else {
    loader.classList.remove("active");
  }
}

var loadFromLocalStorage = function loadFromLocalStorage(key) {
  var data = localStorage.getItem(key);
  return JSON.parse(data);
};

exports.loadFromLocalStorage = loadFromLocalStorage;

var storeToLocalStorage = function storeToLocalStorage(params) {
  var pageData = loadFromLocalStorage("pageData");

  if (pageData === null) {
    var newData = new Array();
    newData.push({
      locationData: params.locationData,
      addressString: params.addressString,
      index: params.index
    });
    localStorage.setItem("pageData", JSON.stringify(newData));
  } else {
    var _newData = [].concat(_toConsumableArray(pageData), [{
      locationData: params.locationData,
      addressString: params.addressString,
      index: params.index
    }]);

    localStorage.setItem("pageData", JSON.stringify(_newData));
  }
};

exports.storeToLocalStorage = storeToLocalStorage;

function detectThemeMode() {
  var toggleCheckBox = document.querySelector(".checkbox");
  console.log("detecting...");
  var theme = "light"; //default

  var storageTheme = localStorage.getItem("theme");

  if (storageTheme) {
    theme = storageTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    toggleCheckBox.checked = true;
  } else {
    toggleCheckBox.checked = false;
  }
}

function detectWebMode() {
  var filter = "win16|win32|win64|macintel|mac|"; // PC일 경우 가능한 값

  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      console.log("모바일에서 접속하셨습니다");
      return "mobile";
    } else {
      return "pc";
    }
  }
}