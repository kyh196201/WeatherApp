//각 지역별 정보를 담는 페이지
//App > Container > Page > 각 컴포넌트들
/*Page데이터 구상
data  = {
  nowData,
  vilData,
  weeklyData,
  locationString
}
=> localStorage에저장//또는 DB
*/

import CurrentWeather from "../components/CurrentWeather/index.js";
import MainWeather from "../components/MainWeather/index.js";
import dfs_xy_conv from "../utils/Services/gridLatLon.js";
import {
  getNowWeather,
  getVilWeather,
  displayLocation
} from "../utils/Services/api.js";
import { FILTERING } from "../utils/Services/constants.js";
import {
  setBase,
  groupBy,
  getPosition,
  loading
} from "../utils/Services/functions.js";

class Page {
  //***문제점 발견 : 새로 생성되는 Page일 경우, coords값을 전달해줘야한다. 또는 gridXY값
  constructor({ $target, index, locationData }) {
    this.data = {
      nowData: [],
      vilData: []
    };
    this.$target = $target;
    this.nowDate = new Date();
    this.index = index;
    this.locationData = locationData;
    console.log(this.locationData);

    //grid, target예외처리 null일시

    const $page = document.createElement("div");
    $page.className = "page";
    $page.id = `page${index}`;
    $page.dataset.index = index;
    this.$page = $page;

    this.$currentWeather = new CurrentWeather({
      $target: this.$page,
      data: {},
      locationString: "서울, 쌍문3동"
    });

    this.$mainWeather = new MainWeather({
      $target: this.$page,
      data: null,
      locationString: "쌍문 3동"
    });

    this.$target.appendChild(this.$page);

    this.init();
  }

  render = () => {};

  setState = ({ newData }) => {
    this.data = newData;
    this.$currentWeather.setState({
      newData: {
        nowData: newData.nowData,
        vilData: newData.vilData,
        locationString: newData.locationString
      }
    });
    this.$mainWeather.setState({
      newData: {
        byTimeData: newData.byTimeData,
        weeklyData: null,
        locationString: newData.locationString
      }
    });
  };

  //async를 사용하기위해 init을 만들었다!
  //constructor은 리턴값이 객체이므로 async와 함게사용할 수 없다
  //왜냐하면 async는 리턴값이 프로미스이기때문
  init = async () => {
    try {
      loading(true);
      let finalResult = await Promise.all([
        (async () => {
          let newData = [];
          const nowWeatherData = await getNowWeather({
            x: this.locationData.x,
            y: this.locationData.y
          });
          nowWeatherData.response.body.items.item
            .filter(data => FILTERING.CURRENT.includes(data.category))
            .forEach(el => {
              newData.push({
                category: el.category,
                fcstDate: el.fcstDate,
                fcstTime: el.fcstTime,
                fcstValue: el.fcstValue
              });
            });
          return newData;
        })(),
        (async () => {
          const newData = [];
          const vilWeatherData = await getVilWeather({
            x: this.locationData.x,
            y: this.locationData.y,
            isInit: true
          });
          vilWeatherData.response.body.items.item
            .filter(data => FILTERING.VILAGE.includes(data.category))
            .forEach(el => {
              newData.push({
                category: el.category,
                fcstDate: el.fcstDate,
                fcstTime: el.fcstTime,
                fcstValue: el.fcstValue
              });
            });
          return newData;
        })(),
        (async () => {
          const byTimeData = await getVilWeather({
            x: this.locationData.x,
            y: this.locationData.y,
            isInit: false
          });
          const groupedByDate = groupBy(
            byTimeData.response.body.items.item,
            "fcstDate"
          );
          const groupedByTime = Object.values(groupedByDate).map(el => {
            return Object.values(groupBy(el, "fcstTime"));
          });
          return groupedByTime;
        })(),
        (async () => {
          const location = await displayLocation({
            lat: this.locationData.lat,
            lng: this.locationData.lng
          });
          return location.results
            .filter(item => {
              return item.types.includes("postal_code");
            })[0]
            .formatted_address.substring(5);
        })()
      ]);

      const newData = {
        nowData: finalResult[0],
        vilData: finalResult[1],
        byTimeData: finalResult[2],
        locationString: finalResult[3]
      };
      console.log(newData);
      this.setState({ newData });
      loading(false);
    } catch (e) {
      console.dir(e);
      console.error(`에러 발생! 메시지 : ${e.message}`);
    }
  };
}

export default Page;
