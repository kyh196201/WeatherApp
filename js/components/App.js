import CurrentWeather from "./CurrentWeather/index.js";
import Page from "./Page.js";

function App({ $target }) {
  this.$target = null;

  const init = () => {
    this.$target = $target;

    const $container = document.createElement("div");
    this.$container = $container;
    this.$container.className = "App-Container";

    //Put Components into $container
    this.$page = new Page({
      $target: this.$container,
      index: this.$container.childNodes.length
    });

    this.$target.appendChild(this.$container);
  };

  init();
}

export default App;
