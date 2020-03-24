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

    const $currentGreet = document.createElement("li");
    $currentGreet.className = "CurrentWeather__greet";
    this.$currentGreet = $currentGreet;

    this.$ul.appendChild(this.$currentInfo);
    this.$ul.appendChild(this.$currentGreet);

    this.$section.appendChild(this.$ul);
    this.$target.appendChild(this.$section);
  }

  render = () => {
    this.$currentInfo.innerHTML = `맑음 : ${this.data.SKY}, 현재 온도 : ${this.data.T1H}, 최고 : ${this.data.TMX}, 최저 : ${this.data.TMN}, 습도 : ${this.data.REH}`;
    this.$currentGreet.innerHTML = "Greet value will be here";
  };

  setState = newData => {
    this.data = newData;
    console.log(newData);
    this.render();
  };
}

export default Section;
