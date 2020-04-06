import Page from "./Page.js";
import AddrSearch from "./AddrSearch.js";
import {
  loadFromLocalStorage,
  storeToLocalStorage
} from "../utils/Services/functions.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";

function App({ $target }) {
  this.$target = null;
  this.$pages = [];

  const init = async () => {
    this.$target = $target;
    this.pageData = loadFromLocalStorage("pageData");
    console.log(this.pageData);

    const $pageContainer = document.createElement("div");
    this.$pageContainer = $pageContainer;
    this.$pageContainer.className = "Page-Container";

    this.$target.appendChild(this.$pageContainer);

    //first Page
    const firstPage = new Page({
      $target: this.$pageContainer,
      index: this.$pageContainer.childNodes.length,
      locationData: null,
      addressString: null
    });
    this.$pages = [...this.$pages, firstPage];

    //data load from ls and create another pages
    if (this.pageData !== null) {
      this.pageData.forEach(data => {
        this.addNewPage({
          locationData: data.locationData,
          addressString: data.addressString
        });
      });
    }

    this.$addrSearch = new AddrSearch({
      $target: this.$target,
      onClick: this.addNewPage
    });
  };

  this.addNewPage = ({ locationData, addressString }) => {
    storeToLocalStorage({ locationData, addressString });
    const newPage = new Page({
      $target: this.$pageContainer,
      index: this.$pageContainer.childNodes.length,
      locationData,
      addressString
    });
    this.$pages = [...this.$pages, newPage];
  };

  init();
  console.log("App is Start");
}

export default App;
