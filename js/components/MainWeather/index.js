import { addEvent } from "../../utils/Services/functions.js";
import TimeStamp from "../../utils/Services/TimeStamp.js";
import { CLOCK_MODE } from "../../utils/Services/constants.js";

class MainWeather {
  constructor({ $target, data, locationString }) {
    this.$target = $target;
    this.data = data;
    this.locationString = locationString;
    const classTitle = "MainWeather";

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
    this.$locationInfo.innerHTML = this.locationString;
  }
}

export default MainWeather;
