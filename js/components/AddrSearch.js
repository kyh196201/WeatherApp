import { getCity } from "../utils/Services/api.js";
import { TYPESLIST } from "../utils/Services/constants.js";
import { addEvent, loading } from "../utils/Services/functions.js";

class AddrSearch {
  constructor({ $target, onClick }) {
    this.$target = $target;
    this.onClick = onClick;
    this.initialData = null;
    this.data = null;
    this.TYPE = TYPESLIST.w;
    this.WIDE_CODE = "";
    this.CITY_CODE = "";

    const $AddrSearch = document.createElement("div");
    this.$AddrSearch = $AddrSearch;
    this.$AddrSearch.className = "AddrSearch";

    const $title = document.createElement("h4");
    this.$title = $title;
    this.$title.innerHTML = "검색하세요";

    const $closeBtn = document.createElement("button");
    this.$closeBtn = $closeBtn;
    this.$closeBtn.innerHTML = "X";
    this.$closeBtn.className = "AddrSearch-close";

    const $ul = document.createElement("ul");
    this.$ul = $ul;
    this.$ul.className = "AddrSearch-list";

    this.$AddrSearch.appendChild(this.$title);
    this.$AddrSearch.appendChild(this.$closeBtn);
    this.$AddrSearch.appendChild(this.$ul);

    this.$target.appendChild(this.$AddrSearch);

    try {
      this.getData().then(data => {
        this.initialData = data;
        this.setState(data);
      });
    } catch (e) {
      console.error(e);
    }

    addEvent("click", this.$closeBtn, e => {
      this.$AddrSearch.classList.remove("active");
    });

    this.$ul.addEventListener("click", e => {
      if (e.target.nodeName !== "BUTTON") {
        return;
      }
      const target = e.target;
      const level = e.target.dataset.level;
      const code = e.target.dataset.code;
      if (target.dataset.goto) {
        const GOTO = target.dataset.goto;
        this.TYPE = GOTO;
        if (GOTO === TYPESLIST.w) {
          this.CITY_CODE = "";
          this.WIDE_CODE = "";
        } else {
          this.CITY_CODE = "";
        }
      } else {
        switch (level) {
          case "1":
            this.TYPE = TYPESLIST.c;
            this.WIDE_CODE = code;
            break;
          case "2":
            this.TYPE = TYPESLIST.d;
            this.CITY_CODE = code;
            break;
          case "3":
            const locationData = {
              x: target.dataset.x,
              y: target.dataset.y,
              lat: target.dataset.lat,
              lng: target.dataset.lng
            };
            console.log(locationData);
            this.$AddrSearch.classList.remove("active");
            this.setState(this.initialData);
            this.onClick({ locationData });
            break;
          default:
            break;
        }
      }
      this.getDataAfterLoad();
    });
  }

  render = () => {
    let upperString = "";
    if (this.TYPE === TYPESLIST.c) {
      upperString = `<li class="addr-item"><button class="addr-button" data-goto=${TYPESLIST.w}>상위</button></li>`;
    } else if (this.TYPE === TYPESLIST.d) {
      upperString = `<li class="addr-item"><button class="addr-button" data-goto=${TYPESLIST.c}>상위</button></li>`;
    }
    const htmlString = this.data
      .map(item => {
        return `<li class="addr-item"><button class="addr-button" data-code=${item.code} data-level=${item.level} data-x=${item.x} data-y=${item.y} data-lat=${item.lat} data-lng=${item.lon} data-name=${item.name}>${item.name}</button></li>`;
      })
      .join("");
    this.$ul.innerHTML = upperString + htmlString;
  };

  setState = newData => {
    this.data = newData;
    this.render();
  };

  getDataAfterLoad = async () => {
    loading(true);
    const newData = await this.getData();
    this.setState(newData);
    loading(false);
  };

  getData = async () => {
    return await getCity({
      type: this.TYPE,
      wideCode: this.WIDE_CODE,
      cityCode: this.CITY_CODE
    });
  };
}

export default AddrSearch;
