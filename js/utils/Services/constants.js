const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const CLOCK_MODE = {
  CURRENT: "C",
  MAIN: "M",
};

const FILTERING = {
  CURRENT: ["T1H", "SKY", "RN1", "REH"],
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
    value: 1,
    name: "맑음",
    icon: {
      day: '<i class="wi wi-day-sunny"></i>',
      night: '<i class="wi wi-night-clear"></i>',
    },
  },
  3: {
    value: 3,
    name: "구름 많음",
    icon: null,
  },
  4: {
    value: 4,
    name: "흐림",
    icon: null,
  },
};

export { DAYS, CLOCK_MODE, FILTERING, TYPESLIST, SKY_STATE };
