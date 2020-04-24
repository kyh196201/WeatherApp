import Page from "./Page.js";
import AddrSearch from "./AddrSearch.js";
import {
  loadFromLocalStorage,
  storeToLocalStorage,
  addEvent,
  detectThemeMode,
  detectWebMode,
} from "../utils/Services/functions.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";
import Slide from "../utils/Services/Slide.js";
import scrollEvent from "../utils/Services/ScrollEvent.js";
import SharePage from "./SharePage.js";
import PageNavigator from "./PageNavigator.js";

function App({ $target }) {
  this.$target = null;
  this.$pages = [];

  //for mobile
  this.pageIndex = 0;

  const init = async () => {
    this.$target = $target;
    this.pageData = loadFromLocalStorage("pageData");

    //web or pc
    this.env = detectWebMode();

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
      onChange: this.onChangePage,
    });

    //SharePage
    this.$sharePage = new SharePage({ $target: this.$target, visible: false });

    //PageNavigator
    // this.pageNavigator = new PageNavigator({
    //   $target: this.$target,
    //   onClick: this.onNavigatePage,
    // });

    this.slide.init();

    window.onresize = _.debounce(() => {
      const width = document.querySelector(".page").offsetWidth;
      this.$pageWrapper.style.left = -(this.index * width) + "px";
      this.slide.init();
    }, 100);
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

  this.onChangePage = (index) => {
    const { $pageWrapper } = this;
    const slideSize = document.querySelectorAll(".page")[0].offsetWidth;
    $pageWrapper.classList.add("shifting");
    $pageWrapper.style.left = -(slideSize * index) + "px";
    this.pageIndex = index;
  };

  this.onNavigatePage = (e) => {
    const slideSize = document.querySelectorAll(".page")[0].offsetWidth;
    const rightBtn = document.querySelector(".rightSlideBtn");
    const leftBtn = document.querySelector(".leftSlideBtn");
    const { $pageWrapper } = this;
    const parent = e.target.closest("button");

    console.log(this.pageIndex);

    if (parent === rightBtn) {
      this.pageIndex = this.pageIndex + 1;
      $pageWrapper.classList.add("shifting");
      $pageWrapper.style.left = $pageWrapper.offsetLeft - slideSize + "px";

      if (this.pageIndex === this.$pages.length - 1) {
        rightBtn.classList.remove("active");
        leftBtn.classList.add("active");
      } else {
        if (!leftBtn.classList.contains("active")) {
          leftBtn.classList.add("active");
        }
      }
    } else if (parent === leftBtn) {
      this.pageIndex = this.pageIndex - 1;
      $pageWrapper.classList.add("shifting");
      $pageWrapper.style.left = $pageWrapper.offsetLeft + slideSize + "px";
      if (this.pageIndex === 0) {
        leftBtn.classList.remove("active");
        rightBtn.classList.add("active");
      } else {
        if (!rightBtn.classList.contains("active")) {
          rightBtn.classList.add("active");
        }
      }
    }
  };

  init();
  detectThemeMode();
  console.log("App is Start");
}

export default App;
