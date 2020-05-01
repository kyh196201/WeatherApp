import CurrentWeather from "./CurrentWeather/index.js";
import MainWeather from "./MainWeather/index.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";
import {
  getNowWeather,
  getVilWeather,
  displayLocation,
} from "../utils/Services/api.js";
import { FILTERING } from "../utils/Services/constants.js";
import {
  setBase,
  groupBy,
  getPosition,
  loading,
  addEvent,
  storeToLocalStorage,
  loadFromLocalStorage,
} from "../utils/Services/functions.js";

class Page {
  constructor({ $target, index, locationData, addressString, onClickShare }) {
    this.data = null;
    this.$target = $target;
    this.nowDate = new Date();
    this.index = index;
    this.locationData = locationData;
    this.addressString = addressString || "";

    const $page = document.createElement("div");
    $page.classList.add("page");
    // 새로 추가
    $page.classList.add("swiper-slide");
    // 새로 추가
    $page.id = `page${index}`;
    $page.dataset.index = index;
    this.$page = $page;

    this.$target.appendChild(this.$page);

    this.$currentWeather = new CurrentWeather({
      $target: this.$page,
      data: {},
      addressString: this.addressString,
      onReload: this.reloadData,
      onClickShare,
    });

    this.$mainWeather = new MainWeather({
      $target: this.$page,
      data: null,
      addressString: this.addressString,
    });

    this.init();
  }

  render = () => {
    this.$currentWeather.setState({
      newData: {
        nowData: this.data.nowData,
        vilData: this.data.vilData,
        addressString: this.data.addressString,
      },
    });
    this.$mainWeather.setState({
      newData: {
        byTimeData: this.data.byTimeData,
        weeklyData: null,
        addressString: this.data.addressString,
      },
    });
  };

  setState = ({ loadedData }) => {
    const newData = {
      nowData: loadedData[0],
      vilData: loadedData[1],
      byTimeData: loadedData[2],
      addressString: this.addressString || loadedData[3],
    };
    console.log(newData);
    this.data = newData;
    this.render();
  };

  //async를 사용하기위해 init을 만들었다!
  //constructor은 리턴값이 객체이므로 async와 함게사용할 수 없다
  //왜냐하면 async는 리턴값이 프로미스이기때문
  init = async () => {
    try {
      loading(true);
      if (!this.locationData) {
        const latlng = await getPosition(null);
        this.locationData = dfs_xy_conv(
          "toXY",
          latlng.latitude,
          latlng.longitude
        );
      }

      const loadedData = await this.loadData({
        isAddress: this.addressString.length !== 0,
      });

      this.setState({ loadedData });
      loading(false);
    } catch (e) {
      console.dir(e);
      console.error(`에러 발생! 메시지 : ${e.message}`);
    }
  }; //End init

  //loadData func
  loadData = async ({ isAddress }) => {
    if (isAddress) {
      return await Promise.all([
        (async () => {
          let newData = [];
          const nowWeatherData = await getNowWeather({
            x: this.locationData.x,
            y: this.locationData.y,
          });
          nowWeatherData.response.body.items.item
            .filter((data) => FILTERING.CURRENT.includes(data.category))
            .forEach((el) => {
              newData.push({
                category: el.category,
                fcstDate: el.fcstDate,
                fcstTime: el.fcstTime,
                fcstValue: el.fcstValue,
              });
            });
          return newData;
        })(),
        (async () => {
          const newData = [];
          const vilWeatherData = await getVilWeather({
            x: this.locationData.x,
            y: this.locationData.y,
            isInit: true,
          });
          vilWeatherData.response.body.items.item
            .filter((data) => FILTERING.VILAGE.includes(data.category))
            .forEach((el) => {
              newData.push({
                category: el.category,
                fcstDate: el.fcstDate,
                fcstTime: el.fcstTime,
                fcstValue: el.fcstValue,
              });
            });
          return newData;
        })(),
        (async () => {
          const byTimeData = await getVilWeather({
            x: this.locationData.x,
            y: this.locationData.y,
            isInit: false,
          });
          const groupedByDate = groupBy(
            byTimeData.response.body.items.item,
            "fcstDate"
          );
          const groupedByTime = Object.values(groupedByDate).map((el) => {
            return Object.values(groupBy(el, "fcstTime"));
          });
          return groupedByTime;
        })(),
      ]);
    } else {
      return await Promise.all([
        (async () => {
          let newData = [];
          const nowWeatherData = await getNowWeather({
            x: this.locationData.x,
            y: this.locationData.y,
          });
          nowWeatherData.response.body.items.item
            .filter((data) => FILTERING.CURRENT.includes(data.category))
            .forEach((el) => {
              newData.push({
                category: el.category,
                fcstDate: el.fcstDate,
                fcstTime: el.fcstTime,
                fcstValue: el.fcstValue,
              });
            });
          return newData;
        })(),
        (async () => {
          const newData = [];
          const vilWeatherData = await getVilWeather({
            x: this.locationData.x,
            y: this.locationData.y,
            isInit: true,
          });
          vilWeatherData.response.body.items.item
            .filter((data) => FILTERING.VILAGE.includes(data.category))
            .forEach((el) => {
              newData.push({
                category: el.category,
                fcstDate: el.fcstDate,
                fcstTime: el.fcstTime,
                fcstValue: el.fcstValue,
              });
            });
          return newData;
        })(),
        (async () => {
          const byTimeData = await getVilWeather({
            x: this.locationData.x,
            y: this.locationData.y,
            isInit: false,
          });
          const groupedByDate = groupBy(
            byTimeData.response.body.items.item,
            "fcstDate"
          );
          const groupedByTime = Object.values(groupedByDate).map((el) => {
            return Object.values(groupBy(el, "fcstTime"));
          });
          return groupedByTime;
        })(),
        (async () => {
          const location = await displayLocation({
            lat: this.locationData.lat,
            lng: this.locationData.lng,
          });
          return location.results
            .filter((item) => {
              return item.types.includes("postal_code");
            })[0]
            .formatted_address.substring(5);
        })(),
      ]);
    }
  }; //End loadData()

  reloadData = async (index) => {
    loading(true);
    if (index === 0) {
      const latlng = await getPosition(null);
      this.locationData = dfs_xy_conv(
        "toXY",
        latlng.latitude,
        latlng.longitude
      );
      this.addressString = "";
    }
    const loadedData = await this.loadData({
      isAddress: this.addressString.length !== 0,
    });
    this.setState({ loadedData });
    loading(false);
  };
}

export default Page;
