"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOGGLE_STRING = exports.weatherCases = exports.SKY_STATE = exports.TYPESLIST = exports.FILTERING = exports.CLOCK_MODE = exports.DAYS = void 0;
var DAYS = ["일", "월", "화", "수", "목", "금", "토"];
exports.DAYS = DAYS;
var CLOCK_MODE = {
  CURRENT: "C",
  MAIN: "M"
};
exports.CLOCK_MODE = CLOCK_MODE;
var FILTERING = {
  CURRENT: ["T1H", "SKY", "RN1", "REH", "PTY"],
  VILAGE: ["TMN", "TMX"],
  BYTIME: ["POP", "R06", "S06", "T3H", "SKY"]
};
exports.FILTERING = FILTERING;
var TYPESLIST = {
  w: "WIDE",
  c: "CITY",
  d: "DONG"
};
exports.TYPESLIST = TYPESLIST;
var SKY_STATE = {
  1: {
    value: "Clear"
  },
  3: {
    value: "Cloudy"
  },
  4: {
    value: ["Rain", "Snow"]
  }
};
exports.SKY_STATE = SKY_STATE;
var weatherCases = {
  Clear: {
    title: "맑음",
    subTitle: ["화창한 날씨에요!", "나들이 가기 좋은 날씨에요!"],
    icon: ["wi-day-sunny", "wi-night-clear"],
    color: ["#DB1313", "#03215C"]
  },
  Rain: {
    title: "흐림",
    subTitle: ["우산을 챙기세요!", "비가 옵니다!!"],
    icon: ["wi-day-rain", "wi-night-alt-rain"],
    color: ["#1356DB", "#03215C"]
  },
  Snow: {
    title: "눈이 와요",
    subTitle: ["눈싸움 할까요?!", "우산을 챙기세요!!"],
    icon: ["wi-day-snow", "wi-night-alt-snow-wind"],
    color: ["#1356DB", "#03215C"]
  },
  Cloudy: {
    title: "구름 많음",
    subTitle: ["오늘은 집에있고 싶어요", "나들이 가면 안될거같아요"],
    icon: ["wi-day-cloudy", "wi-night-alt-cloudy"],
    color: ["#1356DB", "#03215C"]
  }
};
exports.weatherCases = weatherCases;
var TOGGLE_STRING = "<div class=\"button r\" id=\"button-1\">\n                          <input type=\"checkbox\" class=\"checkbox\" />\n                          <div class=\"knobs\"></div>\n                          <div class=\"layer\"></div>\n                      </div>";
exports.TOGGLE_STRING = TOGGLE_STRING;