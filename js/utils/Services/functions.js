function addEvent(evnt, $elem, func) {
  if ($elem.addEventListener)
    // W3C DOM
    $elem.addEventListener(evnt, func, false);
  else if ($elem.attachEvent) {
    // IE DOM
    $elem.attachEvent("on" + evnt, func);
  } else {
    // No much to do
    $elem["on" + evnt] = func;
  }
}

//날짜 계산 함수
function setBase({ mode, date }) {
  let baseTime = null;
  let baseDate = null;

  const d = date;
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let todayDate = d.getDate();
  let hour = d.getHours();
  let minute = d.getMinutes();

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
  }
  //동네예보 baseTime set
  else if (mode === "vilage") {
    if (hour % 3 === 2) {
      //시간이 2,5,8,중에 하나이지만 10분이 안지났을 경우
      if (minute <= 10) {
        hour = hour - 3;
        //시간이 2시 일경우 전날 23시의 데이터를 받아와야한다.
        if (hour < 0) {
          d.setDate(todayDate - 1);
          year = d.getFullYear();
          month = d.getMonth() + 1;
          todayDate = d.getDate();
          hour = 23;
        }
      }
    }
    //시간이 2,5,8.. 중에 하나가 아닐경우
    else {
      hour = hour - ((hour + 1) % 3);
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
  baseDate = `${year}${month < 10 ? `0${month}` : month}${
    todayDate < 10 ? `0${todayDate}` : todayDate
  }`;
  baseTime = `${hour < 10 ? `0${hour}` : hour}${
    minute < 10 ? `0${minute}` : minute
  }`;

  const result = {
    baseDate,
    baseTime
  };
  return result;
}

export { addEvent, setBase };
