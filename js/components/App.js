import Page from "./Page.js";
import AddrSearch from "./AddrSearch.js";
import {
  loadFromLocalStorage,
  storeToLocalStorage,
  addEvent,
} from "../utils/Services/functions.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";
import Slide from "../utils/Services/Slide.js";
import ScrollEvent from "../utils/Services/ScrollEvent.js";
import scrollEvent from "../utils/Services/ScrollEvent.js";

function App({ $target }) {
  this.$target = null;
  this.$pages = [];

  const init = async () => {
    this.$target = $target;
    this.pageData = loadFromLocalStorage("pageData");

    const $pageContainer = document.createElement("div");
    this.$pageContainer = $pageContainer;
    this.$pageContainer.id = "Page-Container";

    const $pageWrapper = document.createElement("div");
    this.$pageWrapper = $pageWrapper;
    this.$pageWrapper.id = "Page-Wrapper";

    this.$target.appendChild(this.$pageContainer);
    this.$pageContainer.appendChild(this.$pageWrapper);

    //Add scroll Event
    scrollEvent({ $element: this.$pageContainer, initial: false });

    this.slide = new Slide({
      wrapper: this.$pageContainer,
      items: this.$pageWrapper,
    });

    //first Page
    const firstPage = new Page({
      $target: this.$pageWrapper,
      index: this.$pageWrapper.childNodes.length,
      locationData: null,
      addressString: null,
    });
    this.$pages = [...this.$pages, firstPage];

    //data load from ls and create another pages
    if (this.pageData !== null) {
      this.pageData.forEach((data) => {
        this.addNewPage({
          locationData: data.locationData,
          addressString: data.addressString,
        });
      });
    }

    this.$addrSearch = new AddrSearch({
      $target: this.$target,
      onClick: this.addNewPage,
    });

    this.slide.init();
  };

  this.addNewPage = ({ locationData, addressString }) => {
    const index = this.$pageWrapper.childNodes.length;
    const newPage = new Page({
      $target: this.$pageWrapper,
      index: this.$pageWrapper.childNodes.length,
      locationData,
      addressString,
    });
    this.slide.init();
    this.$pages = [...this.$pages, newPage];
  };

  window.onresize = _.debounce(() => {
    console.log("resized");
    const width = document.querySelector(".page").offsetWidth;
    this.$pageWrapper.style.left = -(this.index * width) + "px";
    this.slide.init();
    scrollEvent({ $element: this.$pageContainer, initial: true });
  }, 100);

  init();
  console.log("App is Start");
}

export default App;
