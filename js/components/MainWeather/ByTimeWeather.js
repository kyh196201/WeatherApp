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

    const $field = document.createElement("div");
    $field.className = "byTimeWeather__field";
    this.$field = $field;

    this.$body.appendChild(this.$title);
    this.$body.appendChild(this.$field);
    this.$target.appendChild(this.$body);
  }

  render = () => {
    let contString = "";
    for (let i = 0; i < this.data.length; i++) {
      const _length = this.data[i].length;
      for (let j = 0; j < _length; j++) {
        const timeString = this.data[i][j][0].fcstTime.substr(0, 2);
        const liString = `
        <li>${parseInt(timeString)}시</li>
        <li>${
          this.data[i][j].find((it) => it.category === "SKY").fcstValue
        }</li>
      <li>${this.data[i][j].find((it) => it.category === "POP").fcstValue}%</li>
      <li>${
        this.data[i][j].find((it) => it.category === "T3H").fcstValue
      }도</li>`;
        contString = contString + `<ul>${liString}</ul>`;
      }
    }
    this.$field.innerHTML = contString;
  };

  setState = ({ newData }) => {
    this.data = newData;
    console.log(this.data);
    this.render();
  };
}

export default ByTimeWeather;
