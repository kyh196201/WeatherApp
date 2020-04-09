import { SKY_STATE } from "../../utils/Services/constants.js";

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
    // this.$currentInfo.innerHTML = `${
    //   SKY_STATE[this.nowData.SKY.fcstValue].name
    // }, 현재 온도 : ${this.nowData.T1H.fcstValue}, 최고 : ${
    //   this.vilData.TMX.fcstValue
    // }, 최저 : ${this.vilData.TMN.fcstValue}, 습도 : ${
    //   this.nowData.REH.fcstValue
    // }`;
    this.$currentGreet.innerHTML = "Greet value will be here";

    const icon = `<span class="Current__icon"></span>`;
    const skyState = `<span class="Current__skyState">${
      SKY_STATE[this.nowData.SKY.fcstValue].name
    }</span>`;
    const currentTemp = `<span class="Current__currentTemp">${this.nowData.T1H.fcstValue}	&ordm;</span>`;
    const minMaxTemp = `<span class="Current__minMaxTemp">${this.vilData.TMX.fcstValue}&ordm;/${this.vilData.TMN.fcstValue}&ordm;</span>`;
    const wet = `<span class="Current__wet">${this.nowData.REH.fcstValue}%</span>`;
    this.$currentInfo.innerHTML =
      icon + skyState + currentTemp + minMaxTemp + wet;
  };

  setState = (newData) => {
    this.nowData = newData.nowData;
    this.vilData = newData.vilData;
    console.log(this.nowData, this.vilData);
    this.render();
  };
}

export default Section;
