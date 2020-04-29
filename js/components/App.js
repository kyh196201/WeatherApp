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
    this.$pageContainer.classList.add("swiper-container");

    const $pageWrapper = document.createElement("div");
    this.$pageWrapper = $pageWrapper;
    this.$pageWrapper.id = "Page-Wrapper";
    this.$pageWrapper.classList.add("swiper-wrapper");

    // 새로 추가한 내용

    const $prevBtn = document.createElement("div");
    $prevBtn.className = "swiper-button-prev";
    this.$prevBtn = $prevBtn;

    const $nextBtn = document.createElement("div");
    $nextBtn.className = "swiper-button-next";
    this.$nextBtn = $nextBtn;

    // 새로 추가한 내용

    this.$target.appendChild(this.$pageContainer);
    this.$pageContainer.appendChild(this.$pageWrapper);
    this.$pageContainer.appendChild(this.$prevBtn);
    this.$pageContainer.appendChild(this.$nextBtn);

    this.mySlider = new Swiper(".swiper-container", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
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
    console.log(this.$pages);

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
    this.$pages = [...this.$pages, newPage];
    this.mySlider.update();
  };

  init();
  detectThemeMode();
  console.log("App is Start");
}

export default App;
