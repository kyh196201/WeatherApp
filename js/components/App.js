import Page from "./Page.js";
import AddrSearch from "./AddrSearch.js";
import { getPosition } from "../utils/Services/functions.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";

function App({ $target }) {
  this.$target = null;
  this.locationData = null;

  const init = async () => {
    this.$target = $target;
    const latlng = await getPosition(null);
    this.locationData = dfs_xy_conv("toXY", latlng.latitude, latlng.longitude);
    console.log(this.locationData);

    const $pageContainer = document.createElement("div");
    this.$pageContainer = $pageContainer;
    this.$pageContainer.className = "Page-Container";

    this.$addrSearch = new AddrSearch({
      $target: this.$pageContainer,
      onClick: addNewPage
    });

    //Put Components into $container
    this.$page = new Page({
      $target: this.$pageContainer,
      index: this.$pageContainer.childNodes.length,
      locationData: this.locationData
    });

    this.$target.appendChild(this.$pageContainer);
  };

  init();

  const addNewPage = ({ locationData }) => {
    const newPage = new Page({
      $target: this.$pageContainer,
      index: this.$pageContainer.childNodes.length,
      locationData
    });
  };
}

export default App;
