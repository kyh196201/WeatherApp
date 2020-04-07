import Page from "./Page.js";
import AddrSearch from "./AddrSearch.js";
import {
  loadFromLocalStorage,
  storeToLocalStorage,
} from "../utils/Services/functions.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";

function App({ $target }) {
  this.$target = null;
  this.$pages = [];
  this.index = 0; //for slide

  const init = async () => {
    this.$target = $target;
    this.pageData = loadFromLocalStorage("pageData");
    console.log(this.pageData);

    const $pageContainer = document.createElement("div");
    this.$pageContainer = $pageContainer;
    this.$pageContainer.id = "Page-Container";

    const $pageWrapper = document.createElement("div");
    this.$pageWrapper = $pageWrapper;
    this.$pageWrapper.id = "Page-Wrapper";

    this.$target.appendChild(this.$pageContainer);
    this.$pageContainer.appendChild(this.$pageWrapper);

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
  };

  this.addNewPage = ({ locationData, addressString }) => {
    const index = this.$pageWrapper.childNodes.length;
    const newPage = new Page({
      $target: this.$pageWrapper,
      index: this.$pageWrapper.childNodes.length,
      locationData,
      addressString,
    });
    this.slide({
      wrapper: this.$pageContainer,
      items: this.$pageWrapper,
    });
    this.$pages = [...this.$pages, newPage];
  };

  window.onresize = () => {
    //쓰로틀 기법 사용해야 할듯...
    console.log(this.index);
    const width = document.querySelector(".page").offsetWidth;
    this.$pageWrapper.style.left = -(this.index * width) + "px";
    this.slide({
      wrapper: this.$pageContainer,
      items: this.$pageWrapper,
    });
  };

  this.slide = ({ wrapper, items }) => {
    var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName("page"), //slide 노드 배열
      slidesLength = slides.length, //slide 개수
      slideSize = items.getElementsByClassName("page")[0].offsetWidth, //slide의 너비
      firstSlide = slides[0], //첫번째 슬라이드
      lastSlide = slides[slidesLength - 1], //마지막 슬라이드
      // index = this.index,
      allowShift = true;
    // wrapper.classList.add('loaded')

    const dragStart = (e) => {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;

      if (e.type == "touchstart") {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    };

    const dragAction = (e) => {
      e = e || window.event;
      if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = items.offsetLeft - posX2 + "px";
    };

    const dragEnd = (e) => {
      posFinal = items.offsetLeft;
      if (posFinal - posInitial < -threshold) {
        shiftSlide.bind(this)(1, "drag");
      } else if (posFinal - posInitial > threshold) {
        shiftSlide.bind(this)(-1, "drag");
      } else {
        items.style.left = posInitial + "px";
      }

      document.onmouseup = null;
      document.onmousemove = null;
    };

    const shiftSlide = (dir, action) => {
      items.classList.add("shifting");

      if (allowShift) {
        if (!action) {
          posInitial = items.offsetLeft;
        }

        if (dir == 1) {
          if (this.index == slidesLength - 1) {
            items.style.left = posInitial + "px";
          } else {
            items.style.left = posInitial - slideSize + "px";
            this.index++;
          }
        } else if (dir == -1) {
          if (this.index == 0) {
            items.style.left = posInitial + "px";
          } else {
            items.style.left = posInitial + slideSize + "px";
            this.index--;
          }
        }
      }

      allowShift = false;
      console.log(this.index);
    };

    function checkIndex() {
      items.classList.remove("shifting");
      // if (index == -1) {
      //   items.style.left = -(slidesLength * slideSize) + "px";
      //   index = slidesLength - 1;
      // }

      // if (index == slidesLength) {
      //   items.style.left = -(1 * slideSize) + "px";
      //   index = 0;
      // }
      allowShift = true;
    }

    // Mouse and Touch events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);

    // Transition events
    items.addEventListener("transitionend", checkIndex);
  };

  init();
  this.slide({
    wrapper: this.$pageContainer,
    items: this.$pageWrapper,
  });
  console.log("App is Start");
}

export default App;
