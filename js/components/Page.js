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

class Page {
  //***문제점 발견 : 새로 생성되는 Page일 경우, coords값을 전달해줘야한다. 또는 gridXY값
  constructor({ $target, index }) {
    this.data = null;
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
      newData: {
        nowDataItem: newData.nowDataItem,
        vilDataItem: newData.vilDataItem
      },
      isReload,
      locationString: newData.locationString
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

      ////loadData에 isReload를 넣어볼까?!
      const newData = await this.loadData({ isReload: false });
      //여기서 필요한 데이터만 꺼내서 저장해보자!
      console.log(newData);
      this.setState({ newData, isReload: false });
    } catch (e) {
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

  //isReload값을 받아와서 각 함수에 전달
  //vilData를 호출할때 사용
  //주소값 로드하는 함수도 추가해야함
  loadData = async ({ isReload }) => {
    try {
      //초단기실황
      const nowData = await getNowWeather({
        date: this.nowDate,
        gridXY: this.rs
      });

      //초단기실황 예외처리 /resultCode에 따라서
      if (nowData.response.header.resultCode !== "00") {
        const err = new Error();
        err.message = `${nowDataHeader.resultCode},${nowDataHeader.resultMsg}`;
        throw err;
      }

      const nowDataItem = nowData.response.body.items.item;

      //동네 예보
      //init함수내에서는 최초 어플이 실행되므로
      //isReload : false를 할당
      //isReload = true일경우, 10개의 데이터만 파싱
      //false일 경우 50개의 데이터
      const vilData = await getVilWeather({
        date: this.nowDate,
        gridXY: this.rs,
        isReload
      });

      //동네예보 예외처리
      if (vilData.response.header.resultCode !== "00") {
        const err = new Error();
        err.message = `${vilDataHeader.resultCode},${vilDataHeader.resultMsg}`;
        throw err;
      }

      const vilDataItem = vilData.response.body.items.item;

      //주간 데이터 가져오기

      //위치 주소 가져오기
      //통째로 데이터전달, 각 컴포넌트에서 필요한 데이터를 필터링하도록하자
      //이 부분 고민.. 여기서 필터링해서 보낼지 아니면 그냥 데이터를 통으로 보낼지!
      return {
        nowDataItem,
        vilDataItem,
        weeklyData: null,
        locationString: "로드된 주소값"
      };
    } catch (e) {
      throw e;
    }
  };
}

export default Page;
