import { setBase } from "./functions.js";

const CORS = "https://cors-anywhere.herokuapp.com";
const END_POINT = "http://apis.data.go.kr/1360000";
const SERVICE = {
  VILAGE: "VilageFcstInfoService",
  MID: "MidFcstInfoService",
};
const API_KEY =
  "FrXPuaL0ls5tHLK%2F2oPRuCoxI6cYNM93hPWcE6Ta0%2B4gZ6BNNCbirWsBEpoJd6tCieQmHFMdYco1fAxaVe0nyg%3D%3D";

const G_API_KEY = "AIzaSyAXE7WzKYeqyDL5V78FdrnriYQ7ukR04Bw";

//초단기실황 api
//입력받을 데이터, baseDate, baseTime, 좌표

const getNowWeather = async (params) => {
  //Date를 통해 basetime, basedate계산
  const date = new Date();
  const mode = "current";
  const baseData = setBase({ mode, date });
  const NUMOFROWS = 50;
  try {
    const response = await fetch(
      `${CORS}/${END_POINT}/${SERVICE.VILAGE}/getUltraSrtFcst?serviceKey=${API_KEY}&numOfRows=${NUMOFROWS}&pageNo=1&dataType=JSON&base_date=${baseData.baseDate}&base_time=${baseData.baseTime}&nx=${params.x}&ny=${params.y}`
    );

    const resStatus = response.status;
    switch (resStatus) {
      case 200:
        const result = await response.json();
        if (result.response.header.resultCode !== "00") {
          const err = new Error();
          err.message = `${result.response.header.resultCode},${result.response.header.resultMsg}`;
          throw err;
        }
        return result;
        break;
      case 400:
        throw new Error(`Error Occured = ${resStatus}`);
        break;
      case 500:
        throw new Error(`Internal Server Error Occured = ${resStatus}`);
        break;
      default:
        throw new Error("unhandled");
        break;
    }
  } catch (err) {
    // throw new Error(err);
    throw err;
  }
};

//동네예보 API
//데이터의 개수 및 baseTime을 조정
const getVilWeather = async (params) => {
  let baseData = null;
  let NUMOFROWS = 0;

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (params.isInit) {
    //새벽 2시 이전
    if (hours < 2) {
      date.setDate(date.getDate() - 1);
    }
    const todayDate = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    NUMOFROWS = 200;
    baseData = {
      baseDate: `${year}${month < 10 ? `0${month}` : month}${
        todayDate < 10 ? `0${todayDate}` : todayDate
      }`,
      baseTime: "0200",
    };
  } else {
    const mode = "vilage";
    baseData = setBase({ mode, date });
    NUMOFROWS = 200;
  }

  try {
    const response = await fetch(
      `${CORS}/${END_POINT}/${SERVICE.VILAGE}/getVilageFcst?serviceKey=${API_KEY}&numOfRows=${NUMOFROWS}&pageNo=1&dataType=JSON&base_date=${baseData.baseDate}&base_time=${baseData.baseTime}&nx=${params.x}&ny=${params.y}`
    );

    const resStatus = response.status;
    switch (resStatus) {
      case 200:
        const result = await response.json();
        if (result.response.header.resultCode !== "00") {
          const err = new Error();
          err.message = `${result.response.header.resultCode},${result.response.header.resultMsg}`;
          throw err;
        }
        return result;
        break;
      case 400:
        throw new Error(`Error Occured = ${resStatus}`);
        break;
      case 500:
        throw new Error(`Internal Server Error Occured = ${resStatus}`);
        break;
      default:
        throw new Error("unhandled");
        break;
    }
  } catch (err) {
    throw err;
  }
};

const displayLocation = (params) => {
  const URL = `${CORS}/https://maps.googleapis.com/maps/api/geocode/json?latlng=${params.lat},${params.lng}&sensor=true&key=AIzaSyAXE7WzKYeqyDL5V78FdrnriYQ7ukR04Bw`;
  return fetch(URL).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Reponse Error");
    }
  });
};

const getCity = ({ type, wideCode, cityCode }) => {
  const URL = `${CORS}/https://www.weather.go.kr/w/rest/zone/dong.do?type=${type}&wideCode=${wideCode}&cityCode=${cityCode}`;
  return fetch(URL).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Response Error");
    }
  });
};

export { getNowWeather, getVilWeather, getCity, displayLocation };
