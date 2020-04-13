const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const CLOCK_MODE = {
  CURRENT: "C",
  MAIN: "M",
};

const FILTERING = {
  CURRENT: ["T1H", "SKY", "RN1", "REH", "PTY"],
  VILAGE: ["TMN", "TMX"],
  BYTIME: ["POP", "R06", "S06", "T3H", "SKY"],
};

const TYPESLIST = {
  w: "WIDE",
  c: "CITY",
  d: "DONG",
};

const SKY_STATE = {
  1: {
    value: "Clear",
  },
  3: {
    value: "Cloudy",
  },
  4: {
    value: ["Rain", "Snow"],
  },
};

const weatherCases = {
  Clear: {
    title: "맑음",
    subTitle: ["화창한 날씨에요!", "나들이 가기 좋은 날씨에요!"],
    icon: ["wi-day-sunny", "wi-night-clear"],
  },
  Rain: {
    title: "흐림",
    subTitle: ["우산을 챙기세요!", "비가 옵니다!!"],
    icon: ["wi-day-rain", "wi-night-alt-rain"],
  },
  Snow: {
    title: "눈이 와요",
    subTitle: ["눈싸움 할까요?!", "우산을 챙기세요!!"],
    icon: ["wi-day-snow", "wi-night-alt-snow-wind"],
  },
  Cloudy: {
    title: "구름 많음",
    subTitle: ["오늘은 집에있고 싶어요", "나들이 가면 안될거같아요"],
    icon: ["wi-day-cloudy", "wi-night-alt-cloudy"],
  },
};

export { DAYS, CLOCK_MODE, FILTERING, TYPESLIST, SKY_STATE, weatherCases };
