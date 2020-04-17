//CurrentWeather index.js
import Section from "./Section.js";
import { addEvent } from "../../utils/Services/functions.js";
import TimeStamp from "../../utils/Services/TimeStamp.js";
import { CLOCK_MODE } from "../../utils/Services/constants.js";

class CurrentWeather {
  constructor({ $target, data, addressString, onReload, onShowShare }) {
    //$target = page
    this.$target = $target;
    this.data = data;
    this.addressString = addressString;
    this.onReload = onReload;
    this.onShowShare = onShowShare;

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

    const $reloadBtn = document.createElement("a");
    $reloadBtn.innerHTML = `<i class="fas fa-retweet"></i>`;
    $reloadBtn.className = "reloadBtn";
    this.$reloadBtn = $reloadBtn;

    const $shareBtn = document.createElement("a");
    $shareBtn.innerHTML = `<i class="fas fa-share-square"></i>`;
    $shareBtn.className = "shareBtn";
    this.$shareBtn = $shareBtn;

    const $plusBtn = document.createElement("a");
    $plusBtn.innerHTML = `<i class="fas fa-plus"></i>`;
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
      data: null,
    });

    const $scrollDownBtn = document.createElement("div");
    $scrollDownBtn.innerHTML =
      '<a href="#"><i class="fas fa-sort-down"></i></a>';
    $scrollDownBtn.className = "CurrentWeather__scrollDownBtn";
    this.$scrollDownBtn = $scrollDownBtn;

    this.$wrapper.appendChild(this.$scrollDownBtn);

    this.$target.appendChild(this.$wrapper);

    new TimeStamp({ $target: this.$timeStamp, mode: CLOCK_MODE.CURRENT });
    this.$location.innerHTML = this.addressString;

    //이벤트 생성
    this.bindEvents();
  }

  render = () => {
    this.$section.setState(this.data);
    this.$location.innerHTML =
      `<i class="fas fa-location-arrow"></i>` + this.addressString;
  };

  setState = ({ newData }) => {
    const SKY = newData.nowData.filter((el) => el.category === "SKY");
    const T1H = newData.nowData.filter((el) => el.category === "T1H");
    const REH = newData.nowData.filter((el) => el.category === "REH");
    const RN1 = newData.nowData.filter((el) => el.category === "RN1");
    const PTY = newData.nowData.filter((el) => el.category === "PTY");

    const TMX = newData.vilData.filter((el) => el.category === "TMX");
    const TMN = newData.vilData.filter((el) => el.category === "TMN");

    const d = new Date();
    const todayDate = d.getDate();
    const dateEnd = parseInt(TMX[0].fcstDate.substring(6));

    this.data["nowData"] = {
      SKY: SKY[0],
      T1H: T1H[0],
      REH: REH[0],
      RN1: RN1[0],
      PTY: PTY[0],
    };

    if (!this.data.vilData || todayDate === dateEnd) {
      this.data["vilData"] = {
        TMX: TMX[0],
        TMN: TMN[0],
      };
    }
    this.addressString = newData.addressString;
    this.render();
  };

  bindEvents = () => {
    addEvent("click", this.$reloadBtn, (e) => {
      console.log("Reload Data");
      const index = this.$target.dataset.index;
      this.onReload(index);
    });

    addEvent("touchend", this.$reloadBtn, (e) => {
      console.log("Reload Data");
      const index = this.$target.dataset.index;
      this.onReload(index);
    });

    addEvent("mousedown", this.$shareBtn, (e) => {
      e.stopPropagation();
      this.onShowShare();
      console.log("share");
    });
    addEvent("touchend", this.$shareBtn, (e) => {
      e.stopPropagation();
      this.onShowShare();
      console.log("share");
    });

    addEvent("click", this.$plusBtn, (e) => {
      const $addSearch = document.querySelector(".AddrSearch ");
      $addSearch.classList.add("active");
    });
    addEvent("touchend", this.$plusBtn, (e) => {
      const $addSearch = document.querySelector(".AddrSearch ");
      $addSearch.classList.add("active");
    });

    addEvent("click", this.$scrollDownBtn, (e) => {
      e.preventDefault();
      const target = document.querySelector(".MainWeather__wrapper");
      target.scrollIntoView();
    });

    addEvent("touchend", this.$scrollDownBtn, (e) => {
      const target = document.querySelector(".MainWeather__wrapper");
      target.scrollIntoView();
    });
  };
}

export default CurrentWeather;
