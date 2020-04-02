import Page from "./Page.js";

function App({ $target }) {
  this.$target = null;

  const init = () => {
    this.$target = $target;

    const $appContainer = document.createElement("div");
    this.$appContainer = $appContainer;
    this.$appContainer.className = "App-Container";

    //Put Components into $container
    this.$page = new Page({
      $target: this.$appContainer,
      index: this.$appContainer.childNodes.length
    });

    this.$target.appendChild(this.$appContainer);
  };

  init();
}

export default App;
