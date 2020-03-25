import { setBase } from "../Services/functions.js";

const CORS = "https://cors-anywhere.herokuapp.com";
const END_POINT = "http://apis.data.go.kr/1360000/VilageFcstInfoService";
const API_KEY =
  "FrXPuaL0ls5tHLK%2F2oPRuCoxI6cYNM93hPWcE6Ta0%2B4gZ6BNNCbirWsBEpoJd6tCieQmHFMdYco1fAxaVe0nyg%3D%3D";

//초단기실황 api
//입력받을 데이터, baseDate, baseTime, 좌표

const getNowWeather = async ({ date, gridXY }) => {
  //Date를 통해 basetime, basedate계산
  const mode = "current";
  const baseData = setBase({ mode, date });
  try {
    const response = await fetch(
      `${CORS}/${END_POINT}/getUltraSrtNcst?serviceKey=${API_KEY}&numOfRows=30&pageNo=1&dataType=JSON&base_date=${baseData.baseDate}&base_time=${baseData.baseTime}&nx=${gridXY.x}&ny=${gridXY.y}`
    );

    const resStatus = response.status;
    switch (resStatus) {
      case 200:
        return await response.json();
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
//isReload를 통해 새로고침인지 최초 어플 실행인지 구분하여 가져오는
//데이터의 개수 및 baseTime을 조정
const getVilWeather = async ({ date, gridXY, isReload }) => {
  let baseData = null;
  let numOfRows = 0;

  //새로고침 시에는 현재 시간을 기준으로 데이터를 가져온다,
  //numOfRows를 10, SKY만을 파싱
  if (isReload) {
    const mode = "vilage";
    baseData = setBase({ mode, date });
    numOfRows = 10;
  }
  // 최초 어플리케이션이 실행될 경우 또는 매시 새벽 2시에 전날 23시 데이터를 기준으로
  // 최저/ 최고 온도 , SKY 지수를 가져온다.
  //numOfRows를 50
  else {
    date.setDate(date.getDate() - 1);
    const todayDate = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    numOfRows = 50;
    baseData = {
      baseDate: `${year}${month < 10 ? `0${month}` : month}${
        todayDate < 10 ? `0${todayDate}` : todayDate
      }`,
      baseTime: "2300"
    };
  }

  try {
    const response = await fetch(
      `${CORS}/${END_POINT}/getVilageFcst?serviceKey=${API_KEY}&numOfRows=${numOfRows}&pageNo=1&dataType=JSON&base_date=${baseData.baseDate}&base_time=${baseData.baseTime}&nx=${gridXY.x}&ny=${gridXY.y}`
    );

    const resStatus = response.status;
    switch (resStatus) {
      case 200:
        return await response.json();
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

export { getNowWeather, getVilWeather };
