//CurrentWeather index.js
import Section from "./Section.js";
import { addEvent } from "../../utils/Services/functions.js";
import TimeStamp from "../../utils/Services/TimeStamp.js";
import { CLOCK_MODE } from "../../utils/Services/constants.js";

class CurrentWeather {
  constructor({ $target, data, addressString, onReload }) {
    //$target = page
    this.$target = $target;
    this.data = data;
    this.addressString = addressString;
    this.onReload = onReload;

    //섹션 컴포넌트 생성
    const $wrapper = document.createElement("section");
    $wrapper.className = "CurrentWeather__wrapper";
    this.$wrapper = $wrapper;

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
    this.$wrapper.appendChild(this.$header);
    this.$wrapper.appendChild(this.$nav);

    //섹션 컴포넌트 생성
    this.$section = new Section({
      $target: this.$wrapper,
      data: null
    });

    this.$target.appendChild(this.$wrapper);

    new TimeStamp({ $target: this.$timeStamp, mode: CLOCK_MODE.CURRENT });
    this.$location.innerHTML = this.addressString;

    //이벤트 생성
    this.bindEvents();
  }

  render = () => {
    this.$section.setState(this.data);
    this.$location.innerHTML = this.addressString;
  };

  setState = ({ newData }) => {
    const SKY = newData.nowData.filter(el => el.category === "SKY");
    const T1H = newData.nowData.filter(el => el.category === "T1H");
    const REH = newData.nowData.filter(el => el.category === "REH");
    const RN1 = newData.nowData.filter(el => el.category === "RN1");

    const TMX = newData.vilData.filter(el => el.category === "TMX");
    const TMN = newData.vilData.filter(el => el.category === "TMN");

    const d = new Date();
    const todayDate = d.getDate();
    const dateEnd = parseInt(TMX[0].fcstDate.substring(6));

    this.data["nowData"] = {
      SKY: SKY[0],
      T1H: T1H[0],
      REH: REH[0],
      RN1: RN1[0]
    };

    if (!this.data.vilData || todayDate === dateEnd) {
      this.data["vilData"] = {
        TMX: TMX[0],
        TMN: TMN[0]
      };
    }
    this.addressString = newData.addressString;
    this.render();
  };

  bindEvents = () => {
    addEvent("click", this.$reloadBtn, e => {
      console.log("Reload Data");
      const index = this.$target.dataset.index;
      this.onReload(index);
    });

    addEvent("click", this.$shareBtn, e => {
      console.log("share");
    });

    addEvent("click", this.$plusBtn, e => {
      const $addSearch = document.querySelector(".AddrSearch ");
      $addSearch.classList.add("active");
    });
  };
}

export default CurrentWeather;
