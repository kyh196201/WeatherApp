import { addEvent } from "../../utils/Services/functions.js";
import TimeStamp from "../../utils/Services/TimeStamp.js";
import { CLOCK_MODE } from "../../utils/Services/constants.js";
import ByTimeWeather from "./ByTimeWeather.js";

class MainWeather {
  constructor({ $target, data, locationString }) {
    this.$target = $target;
    this.data = data;
    this.locationString = locationString;
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

    this.$target.appendChild(this.$wrapper);
    this.$wrapper.appendChild(this.$header);
    this.$wrapper.appendChild(this.$section);
    this.$header.appendChild(this.$timeStamp);
    this.$header.appendChild(this.$locationInfo);

    new TimeStamp({ $target: this.$timeStamp, mode: CLOCK_MODE.MAIN });
    this.$byTimeWeather = new ByTimeWeather({
      $target: this.$section,
      data: null
    });
    this.$locationInfo.innerHTML = this.locationString;
  }

  setState = ({ newData, locationString }) => {
    this.data = newData;
    this.locationString = locationString;
    this.render();
  };

  render = () => {
    this.$locationInfo.innerHTML = this.locationString;
    //하위 컴포넌트들의 setState()호출
    this.$byTimeWeather.setState({ newData: this.data.byTimeData });
  };
}

export default MainWeather;
