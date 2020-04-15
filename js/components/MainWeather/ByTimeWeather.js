import { addEvent } from "../../utils/Services/functions.js";
import { SKY_STATE, weatherCases } from "../../utils/Services/constants.js";

class ByTimeWeather {
  constructor({ $target, data }) {
    this.$target = $target;
    this.data = data;

    const $body = document.createElement("div");
    $body.className = "byTimeWeather";
    this.$body = $body;

    const $title = document.createElement("h3");
    $title.className = "byTimeWeather__title";
    this.$title = $title;
    this.$title.innerHTML = "시간대별 날씨";

    const $wrapper = document.createElement("div");
    $wrapper.className = "byTimeWeather__wrapper";
    this.$wrapper = $wrapper;

    const $field = document.createElement("div");
    $field.className = "byTimeWeather__field";
    this.$field = $field;

    this.$wrapper.appendChild(this.$field);
    this.$body.appendChild(this.$title);
    this.$body.appendChild(this.$wrapper);
    this.$target.appendChild(this.$body);

    this.bindEvent();
  }

  render = () => {
    let contString = "";
    for (let i = 0; i < this.data.length; i++) {
      const _length = this.data[i].length;
      for (let j = 0; j < _length; j++) {
        const hours = this.data[i][j][0].fcstTime.substr(0, 2);
        const isDayTime = hours > 6 && hours < 20;
        const iconTimeSelector = isDayTime ? 0 : 1;
        const skyValue = this.data[i][j].find((it) => it.category === "SKY")
          .fcstValue;

        const popValue = this.data[i][j].find((it) => it.category === "POP")
          .fcstValue;

        const ptyValue = this.data[i][j].find((it) => it.category === "PTY")
          .fcstValue;

        const tempValue = this.data[i][j].find((it) => it.category === "T3H")
          .fcstValue;

        let skyState = SKY_STATE[skyValue].value;
        const isRain = ptyValue === "1" || ptyValue === "4";
        const isSnow = ptyValue === "2" || ptyValue === "3";

        if (Array.isArray(skyState)) {
          if (isSnow) {
            skyState = "Snow";
          } else if (isRain) {
            skyState = "Rain";
          } else {
            skyState = "Cloudy";
          }
        }

        const weatherVar = weatherCases[skyState];

        const timeString = `<li>${parseInt(hours)}시</li>`;
        const iconString = `<li><i class="wi ${weatherVar.icon[iconTimeSelector]}" style="color:${weatherVar.color[iconTimeSelector]}"></i></li>`;
        const rainPercentString =
          popValue !== "0"
            ? `<li>${popValue}%</li>`
            : `<li style="visibility:hidden">${popValue}%</li>`;
        const tempString = `<li>${tempValue}&ordm;</li>`;
        const htmlString =
          timeString + iconString + rainPercentString + tempString;
        contString = contString + `<ul>${htmlString}</ul>`;
      }
    }
    this.$field.innerHTML = contString;
  };

  setState = ({ newData }) => {
    this.data = newData;
    console.log(this.data);
    this.render();
  };

  bindEvent = () => {
    const slider = this.$field;
    let isDown = false;
    let startX;
    let scrollLeft;

    const slideStart = (e) => {
      isDown = true;
      slider.classList.add("active");
      let clickX = e.pageX;
      if (e.type === "touchstart") {
        clickX = e.touches[0].clientX;
      }
      startX = clickX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const slideEnd = (e) => {
      isDown = false;
      slider.classList.remove("active");
    };

    const slideAction = (e) => {
      if (!isDown) return;
      e.preventDefault();
      let clickX = e.pageX;
      if (e.type === "touchmove") {
        clickX = e.touches[0].clientX;
      }
      const x = clickX - slider.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    };

    addEvent("mousedown", this.$body, (e) => {
      e.stopPropagation();
    });

    addEvent("mousedown", slider, (e) => {
      e.stopPropagation();
      slideStart(e);
    });

    addEvent("mouseleave", slider, (e) => {
      e.stopPropagation();
      slideEnd(e);
    });

    addEvent("mouseup", slider, (e) => {
      e.stopPropagation();
      slideEnd(e);
    });

    addEvent("mousemove", slider, (e) => {
      e.stopPropagation();
      slideAction(e);
    });

    addEvent("touchstart", slider, (e) => {
      e.stopPropagation();
      slideStart(e);
    });

    addEvent("touchmove", slider, (e) => {
      e.stopPropagation();
      slideAction(e);
    });

    addEvent("touchend", slider, (e) => {
      e.stopPropagation();
      slideEnd(e);
    });
  };
}

export default ByTimeWeather;
