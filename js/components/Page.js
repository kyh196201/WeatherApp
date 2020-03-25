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
import dfs_xy_conv from "../utils/Services/gridLatLon.js";
import { getNowWeather, getVilWeather } from "../utils/Services/api.js";
import { FILTERING } from "../utils/Services/constants.js";
import { setBase } from "../utils/Services/functions.js";

class Page {
  //***문제점 발견 : 새로 생성되는 Page일 경우, coords값을 전달해줘야한다. 또는 gridXY값
  constructor({ $target, index }) {
    this.data = {
      nowData: [],
      vilData: []
    };
    this.$target = $target; //Container
    this.nowDate = new Date();
    this.coords = null;
    this.rs = null;

    const $page = document.createElement("div");
    $page.className = "page";
    $page.id = `page${index}`;
    $page.dataset.index = index;
    this.$page = $page;

    this.$currentWeather = new CurrentWeather({
      $target: this.$page,
      data: null,
      locationString: "서울, 쌍문3동"
    });

    this.$target.appendChild(this.$page);

    //좌표, 시간값 설정
    this.init();
  }

  render = () => {};

  //setState에도 isReload값을 통해 분기하도록 나중에 바꾸자
  //새로고침 되었을시,
  //새로고침이아니라 최초 어플 실행시
  //* 여기서 데이터를 선별해서 보내볼가?!
  //currentWeather에서 reH등등을 관리한것을 여기서해보자
  setState = ({ newData, isReload }) => {
    this.data = newData;
    this.$currentWeather.setState({
      newData,
      isReload,
      locationString: "로드된 주소값"
    });
  };

  //async를 사용하기위해 init을 만들었다!
  //constructor은 리턴값이 객체이므로 async와 함게사용할 수 없다
  //왜냐하면 async는 리턴값이 프로미스이기때문
  init = async () => {
    //***문제점 발견2 : 새로 생성된 Page의 경우 x,y값이 있으므로 굳이 coord를 가져올 필요가없다.
    try {
      //geoLocation을 통해 lat,lon 좌표를 불러온다.
      this.coords = await this.getPosition(null);

      //lat,lon -> grid
      this.rs = dfs_xy_conv(
        "toXY",
        this.coords.latitude,
        this.coords.longitude
      );

      let finalResult = await Promise.all([
        (async () => {
          let newData = [];
          const nowWeatherData = await getNowWeather({
            gridXY: this.rs
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
            gridXY: this.rs,
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
        })()
      ]);

      const dailyData = await getVilWeather({
        date: this.nowDate,
        gridXY: this.rs,
        isInit: false
      });
      console.log(dailyData);

      const newData = {
        nowData: finalResult[0],
        vilData: finalResult[1]
      };
      this.setState({ newData, isReload: false });
    } catch (e) {
      console.dir(e);
      console.error(`에러 발생! 메시지 : ${e.message}`);
    }
  };

  //래퍼런스 : https://kkiuk.tistory.com/212
  getPosition = options => {
    return new Promise(function(resolve, reject) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos.coords);
          },
          () => {
            reject(new Error("Request is failed"));
          }
        );
      } else {
        reject(new Error("Geolocation is not exist"));
      }
    });
  };
}

export default Page;
