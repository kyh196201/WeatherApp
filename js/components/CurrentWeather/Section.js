import { SKY_STATE, weatherCases } from "../../utils/Services/constants.js";

class Section {
  constructor({ $target, data }) {
    this.$target = $target;
    this.data = data;
    //DailyWeather Section
    const $section = document.createElement("section");
    $section.className = "CurrentWeather__section";
    this.$section = $section;

    //Ul
    const $ul = document.createElement("ul");
    $ul.className = "CurrentWeather__list";
    this.$ul = $ul;

    //ul Items
    const $currentInfo = document.createElement("li");
    $currentInfo.className = "CurrentWeather__info";
    this.$currentInfo = $currentInfo;
    this.$currentInfo.innerHTML = "로드중입니다...";

    const $currentGreet = document.createElement("li");
    $currentGreet.className = "CurrentWeather__greet";
    this.$currentGreet = $currentGreet;

    this.$ul.appendChild(this.$currentInfo);
    this.$ul.appendChild(this.$currentGreet);

    this.$section.appendChild(this.$ul);
    this.$target.appendChild(this.$section);
  }

  render = () => {
    const d = new Date();
    const hours = d.getHours();

    const randNum = Math.floor(Math.random() * 2);
    const isRain = this.nowData.RN1.fcstValue > 0;
    const isSnow = isRain && this.nowData.PTY.fcstValue === 3;
    const isDayTime = hours > 6 && hours < 20;
    const iconTimeSelector = isDayTime ? 0 : 1;
    let skyState = SKY_STATE[this.nowData.SKY.fcstValue].value;

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

    const icon = `<span class="Current__icon"><i class="wi ${weatherVar.icon[iconTimeSelector]}" style="color:${weatherVar.color[iconTimeSelector]}"></i></span>`;
    const sky = `<span class="Current__skyState">${weatherVar.title}</span>`;
    const currentTemp = `<span class="Current__currentTemp">${this.nowData.T1H.fcstValue}&ordm;</span>`;
    const minMaxTemp = `<span class="Current__minMaxTemp">${this.vilData.TMX.fcstValue}&ordm;/${this.vilData.TMN.fcstValue}&ordm;</span>`;
    const wet = `<span class="Current__wet">${this.nowData.REH.fcstValue}%</span>`;
    this.$currentInfo.innerHTML = icon + sky + currentTemp + minMaxTemp + wet;
    this.$currentGreet.innerHTML = weatherCases[skyState].subTitle[randNum];
  };

  setState = (newData) => {
    this.nowData = newData.nowData;
    this.vilData = newData.vilData;
    console.log(this.nowData, this.vilData);
    this.render();
  };
}

export default Section;
