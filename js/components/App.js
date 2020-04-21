import Page from "./Page.js";
import AddrSearch from "./AddrSearch.js";
import {
  loadFromLocalStorage,
  storeToLocalStorage,
  addEvent,
  detectThemeMode,
} from "../utils/Services/functions.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";
import Slide from "../utils/Services/Slide.js";
import scrollEvent from "../utils/Services/ScrollEvent.js";
import SharePage from "./SharePage.js";

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
      onClickShare: () => {
        this.showpageEvent();
      },
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

    //SharePage
    this.$sharePage = new SharePage({ $target: this.$target, visible: false });

    this.slide.init();
    // detectThemeMode();
  }; //End Init()

  this.showpageEvent = () => {
    this.$sharePage.setState({ visible: true });
    window.onclick = (e) => {
      const _target = e.target;
      if (_target === document.querySelector(".sharePage")) {
        const wrapper = document.querySelector(".content-wrapper");
        wrapper.classList.toggle("zoomOut");
        wrapper.classList.toggle("zoomIn");
        setTimeout(() => {
          this.$sharePage.setState({ visible: false });
        }, 500);
        window.onclick = null;
      }
    };
  };

  this.addNewPage = ({ locationData, addressString }) => {
    // const index = this.$pageWrapper.childNodes.length;
    const newPage = new Page({
      $target: this.$pageWrapper,
      index: this.$pageWrapper.childNodes.length,
      locationData,
      addressString,
      onClickShare: () => {
        this.showpageEvent();
      },
    });
    this.slide.init();
    this.$pages = [...this.$pages, newPage];
  };

  window.onresize = _.debounce(() => {
    const width = document.querySelector(".page").offsetWidth;
    this.$pageWrapper.style.left = -(this.index * width) + "px";
    this.slide.init();
  }, 100);

  init();
  detectThemeMode();
  console.log("App is Start");
}

export default App;
