//CurrentWeather index.js
import Section from "./Section.js";
import { addEvent } from "../../utils/Services/functions.js";
import TimeStamp from "../../utils/Services/TimeStamp.js";
import { CLOCK_MODE } from "../../utils/Services/constants.js";

class CurrentWeather {
  constructor({ $target, data, locationString }) {
    //$target = page
    this.$target = $target;
    this.data = data;
    this.locationString = locationString;

    //헤더 컴포넌트 생성
    const $header = document.createElement("header");
    $header.className = "CurrentWeather__header";
    this.$header = $header;

    //타임스탬프 컴포넌트 생성
    const $timeStamp = document.createElement("div");
    $timeStamp.className = "CurrentWeather__timeStamp";
    this.$timeStamp = $timeStamp;

    this.$header.appendChild(this.$timeStamp);

    //NAV 컴포넌트 생성
    const $nav = document.createElement("nav");
    $nav.className = "CurrentWeather__nav";
    this.$nav = $nav;

    const $location = document.createElement("div");
    $location.className = "CurrentWeather__location";
    this.$location = $location;

    const $buttons = document.createElement("div");
    $buttons.className = "CurrentWeather__buttons";
    this.$buttons = $buttons;

    const $reloadBtn = document.createElement("button");
    $reloadBtn.innerHTML = "새로고침";
    $reloadBtn.className = "reloadBtn";
    this.$reloadBtn = $reloadBtn;

    const $shareBtn = document.createElement("button");
    $shareBtn.innerHTML = "공유하기";
    $shareBtn.className = "shareBtn";
    this.$shareBtn = $shareBtn;

    const $plusBtn = document.createElement("button");
    $plusBtn.innerHTML = "추가하기";
    $plusBtn.className = "plusBtn";
    this.$plusBtn = $plusBtn;

    this.$buttons.appendChild(this.$reloadBtn);
    this.$buttons.appendChild(this.$shareBtn);
    this.$buttons.appendChild(this.$plusBtn);

    this.$nav.appendChild(this.$location);
    this.$nav.appendChild(this.$buttons);

    //어펜드
    this.$target.appendChild(this.$header);
    this.$target.appendChild(this.$nav);

    //섹션 컴포넌트 생성
    this.$section = new Section({
      $target: this.$target,
      data: null
    });

    new TimeStamp({ $target: this.$timeStamp, mode: CLOCK_MODE.CURRENT });
    this.$location.innerHTML = this.locationString;

    //이벤트 생성
    this.bindEvents();
  }

  render = () => {
    this.$section.setState(this.data);
    this.$location.innerHTML = this.locationString;

    console.log("최초 어플 작동");
  };

  //setState에서 page에서 전달된 isReload(flag)값을 통해 전달/갱신할 값을 선별한다.
  //reload = false의 경우, 모든 데이터 갱신
  //true의 경우 SKY, T1H, REH값만 갱신
  setState = ({ newData, isReload, locationString }) => {
    const nowDataItem = newData.nowDataItem;
    const vilDataItem = newData.vilDataItem;

    //최초 어플 실행의 경우 모든 데이터를 표시해야하므로
    //모든 데이터 할당
    //데이터를 새 데이터로 교체 렌더링 함수시작
    if (!isReload) {
      const REH = nowDataItem.find(data => data.category === "REH").obsrValue;
      const T1H = nowDataItem.find(data => data.category === "T1H").obsrValue;
      const TMN = vilDataItem.find(data => data.category === "TMN").fcstValue;
      const TMX = vilDataItem.find(data => data.category === "TMX").fcstValue;
      const SKY = vilDataItem.find(data => data.category === "SKY").fcstValue;

      const newGetData = {
        REH,
        T1H,
        TMN,
        TMX,
        SKY
      };

      this.data = newGetData;
    }
    //선택 데이터만 할당
    //나머지데이터는 기존의 데이터를 그대로 유지
    //데이터를 새 데이터로 교체 렌더링 함수 시작
    else {
      const REH = nowDataItem.find(data => data.category === "REH").obsrValue;
      const T1H = nowDataItem.find(data => data.category === "T1H").obsrValue;
      const SKY = vilDataItem.find(data => data.category === "SKY").fcstValue;

      const newGetData = {
        REH,
        T1H,
        TMN: this.data.TMN,
        TMX: this.data.TMN,
        SKY
      };

      this.data = newGetData;
      console.log("새로고침 시");
    }
    this.locationString = locationString;
    this.render();
  };

  bindEvents = () => {
    addEvent("click", this.$reloadBtn, e => {
      console.log("reload");
      //새로고침 버튼도 Page의 인덱스가 0일경우에는 좌표부터 다시불러와야하고,
      //다른 페이지일 경우 데이터만 새로 불러온다.
    });

    addEvent("click", this.$shareBtn, e => {
      console.log("share");
    });

    addEvent("click", this.$plusBtn, e => {
      console.log("plus");
    });
  };
}

export default CurrentWeather;
