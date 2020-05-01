import { addEvent } from "../../utils/Services/functions.js";
import TimeStamp from "../../utils/Services/TimeStamp.js";
import { CLOCK_MODE, TOGGLE_STRING } from "../../utils/Services/constants.js";
import ByTimeWeather from "./ByTimeWeather.js";

class MainWeather {
  constructor({ $target, data, addressString }) {
    this.$target = $target;
    this.data = data;
    this.addressString = addressString;
    const classTitle = "MainWeather"; //상수화

    const $wrapper = document.createElement("section");
    $wrapper.className = `${classTitle}__wrapper`;
    this.$wrapper = $wrapper;

    const $header = document.createElement("header");
    $header.className = `${classTitle}__header`;
    this.$header = $header;

    const $timeStamp = document.createElement("div");
    $timeStamp.className = `${classTitle}__timeStamp`;
    this.$timeStamp = $timeStamp;

    const $locationInfo = document.createElement("div");
    $locationInfo.className = `${classTitle}__locationInfo`;
    this.$locationInfo = $locationInfo;

    const $section = document.createElement("section");
    $section.className = `${classTitle}__section`;
    this.$section = $section;

    const $toggleBtn = document.createElement("div");
    $toggleBtn.className = "themeToggleBtn";
    this.$toggleBtn = $toggleBtn;
    this.$toggleBtn.innerHTML = TOGGLE_STRING;

    this.$target.appendChild(this.$wrapper);
    this.$wrapper.appendChild(this.$header);
    this.$wrapper.appendChild(this.$section);
    this.$wrapper.appendChild(this.$toggleBtn);
    this.$header.appendChild(this.$timeStamp);
    this.$header.appendChild(this.$locationInfo);

    new TimeStamp({ $target: this.$timeStamp, mode: CLOCK_MODE.MAIN });

    this.$byTimeWeather = new ByTimeWeather({
      $target: this.$section,
      data: null,
    });

    this.$locationInfo.innerHTML = this.addressString;

    this.bindEvent();
  }

  setState = ({ newData }) => {
    this.data = newData;
    this.addressString = newData.addressString;
    this.render();
  };

  render = () => {
    this.$locationInfo.innerHTML = this.addressString;

    //하위 컴포넌트들의 setState()호출
    this.$byTimeWeather.setState({ newData: this.data.byTimeData });
  };

  bindEvent = () => {
    const toggleCheckBox = document.querySelector(".checkbox");
    addEvent("change", toggleCheckBox, (e) => {
      e.stopPropagation();
      const _target = e.target;
      const checked = e.target.checked;
      if (checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  };
}

export default MainWeather;
