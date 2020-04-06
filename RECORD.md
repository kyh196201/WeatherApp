\*\*)
해결과제에 대한 명확한 이해 -> 복잡함을 단순하게 분해 => 자료를 정리하고 구분 => 순서에 맡게 행위 배열

1. 요구사항 : 날씨 어플리케이션 중 첫번째 화면

2. 복잡함을 단순하게 분해 :

1) 화면 구성을 어떻게 할 것인가.

=> 마크업 관련

=> 어떤 이미지를 활용?

=> 어떻게 마크업?!

2. 어떤 데이터를 필요로 하고, 어떤 API를 활용 ?

=> 최저, 최고 기온 === 동네 예보 02시 기준 데이터

=> 현재 기온 === 현재기상실황 최근 데이터

=> 시간 정보

=> 위치 정보 , 좌표 및 현재 동네 이름

3.

1. 화면 먼저 구성, 시멘틱한 방법으로

2. 컴포넌트를 어떻게 구성할지

3. 시간 표현

4. 데이터 받아오기

5. 데이터 표현

4) 상세 HOW??

1. App div,

03/20~

\*\*전체적인 구성
\*) App->Container -> Page -> 각컴포넌트들

0. 어떻게 각 API를 호출할지!! 시간에 따라 호출해야 하기때문 기준을 찾아야한다.

1. App 아래에 Container 까지는 미리 마크업 해놓는다
   \*\*App에서 관리해야할 데이터 : Page의 숫자,

1. 가장 상위 컴포넌트는 'Page'로 한다. 새로운 위치에대한 정보가 생성될때마다 이
   Page를 생성한다.
   => Append()
   \*\*첫번째 페이지는 자동적으로 생성, 이 페이지에서 관리해야할 데이터 : 현재 위치정보,
   \*\*첫번재 페이지랑 나머지 페이지를 구분해야한다.

1. 각 Page는 3개의 섹션으로 이루어진다

1. 즉, 3개의 섹션을 컴포넌트화 해야한다.

   \*\*로딩 페이지는 어떻게하지?!-> 컴포넌트화?!

   4.1 CurrentWeather
   4.2 두번째 섹션(시간대별, 주간)
   4.3 테마 섹션
   \*\* Location 검색 팝업창

   4.4 Page가 생성해야할 데이터
   => Date 객체, 최저/최고 온도(여기서 하는게 효율적일거같음)
   => Date객체로 base_date를 계산?! == 현재시간에 가장 가까운 시간대.
   => 현재 위치 좌표, \*\*현재 주소 정보
   => 현재 위치좌표 -> gridXY를 통해 데이터 가져오고, 검색시에 지역 코드 API활용
   => \*\*한번 모든 데이터를 Page에서 생성하는 식으로 해보자.

   4.5 전달해야할 데이터
   => 현재 위치 좌표(각 컴포넌트에), 주소값(CurrentWeather의 Location에), \*\*API를 통해 전달받은 데이터
   => Date 객체

   4.6 Page에서 API를 호출해서 전달받은 값을 각 컴포넌트에 전달?? OR
   각 컴포넌트에서 API를 호출?! \*\*\*\*우선 Page에서 생성하는 방식!

   4.7 시간 지날때마다 자동 업데이트는 어려울거같음
   => 새로고침 버튼 만들고, 마지막 업데이트 시간 기록.
   => 이때 새로 데이터를 불러서 각 컴포넌트에 전달 후 렌더링.
   => 새로고침은 nav 즉 헤더 두번재 자리에 넣어보자

1. 가장 아래에는 Location 팝업이 위치한다. => 이것도 섹션화?!
   5.1 Location 팝업을 통해 장소를 검색하고 이 장소결과를
   CurrentWeather에 전달해야한다. => 좌표를 전달할까!? [X] => 지역 코드를 검색해서 API를 호출한다!
   5.2 이 장소 결과에 따라서 새로운 Page를 생성해야한다.
   => 그러면 Page마다 데이터에 장소를 전달해야한다.(좌표정보)
   => 그러면 전달받은 좌표정보로 각 Page마다 Page 내의
   => 컴포넌트에 좌표 정보를 전달 날씨를 조회.
   =>

////////////////////////////////////////////////////////////////////////////

우선 CurrentWeather 부터 작업

1.  CurrentWeather 는 두개의 섹션(header,main)으로 구성

2.  입력 데이터 : \*\*\$target, \*\* API를 통해 받은 날씨 데이터(최고/최저, 현재 기상정보), \*\*현재 주소 정보
    2.1 \$target = Page

3.  init 함수를 생성/실행

4.  init함수 ={
    //헤더 부분

    1.  헤더 엘리먼트를 생성
        1.1 Header의 className은 CurrentWeather\_\_header
    2.  각 컴포넌트 생성 + 이벤트? 및 이벤트 리스너 생성.

        2.1 timeStamp()
        2.1.1 전달 데이터 : \$target(header태그),
        ==> 그냥 시계 컴포넌트를 생성해보자 /전달 데이터로 섹션 위치를 전달받아 표현 형태를 달리하는 방식?!
        2.1.2 className = CurrentWeather\_\_timeStamp

        2.2 Location()

            2.2.1 전달 데이터 : \$target(header 태그), location 객체
            2.2.2 차라리 컴포넌트 말고 그냥 div를 생성할까?! 그래서 innerHTML안에 주소정보만 넣어주도록.
            2.2.3 className = CurrentWeather__location

    3.  \$현재날씨 엘리먼트(컴포넌트) 생성 (CurrentWeatherMain?)

    4.  \$현재 날씨에 컴포넌트 렌더링

    4.1 날씨 표현 부분

    \*\*\*\*\*우선 날씨 데이터를 받아오자!!

    4.1.1 현재온도는 초단기예보/초단기 실황 API 데이터 사용
    => 맑음 이런것도 알아야함

    4.1.2 최고/최저 온도는 동네 예보 02시 데이터 사용
    => 이것은 미리 저장해놓자. 매일 갱신 => Page에서 갱신을 따로하자 여기선 렌더링만!

    4.1.3 아이콘 관련
    => 맑음 이런걸 저장해놓고 클래스값 호출

    4.1.4 각 컴포넌트 내에서 엘리먼트 생성하고 append하는 방식?!

5.  $target에 $header, \$날씨 append

}

/////////////////////
03/22

1. 시계 만들기 [O]

   1.1 어떻게?!
   : new Date()를 통해 현재 시간을 입력받고, 표현 형식을 정한다.
   : 그리고 setInterval을 통해 1초마다 표현 함수를 호출해서 시간을 바꿔준다.
   : Mode 라는 Flag 변수를 통해 currentWeather 꺼인지 그 다래꺼인지 확인
   \*\*Mode : c = Current/d = daily

2. 위치 정보 NAV BAR 만들기 [O]
   2.1 어떻게?!
   2.1.1 Nav 태그 생성
   2.1.2 그 안에 두개의 DIV 생성
   => ClassName = currentWeather**location, currentWeather**buttons
   2.1.3 render 함수를 통해 받아온 locationString을 location안에 넣어준다. [O]
   2.1.4 Button들에 이벤트 리스너 생성

3. 현재 주소 구하기
   3.1 geoLocation을 통해 현재 위치 좌표 가져오기 [O]
   \*\*\* 3.1.1 async를 위해 init함수 새로 생성
   \*\*\* 3.1.2 Promise를 사용해 coords값을 return
   3.1.3 예외처리
   \*\*\*async함수 내에 try,catch구문!!
   3.2 gridXY 좌표 변환기 사용 [O]
   3.3 그 값을통해 역추적해서 주소구하기..?

4. 좌표값을 통해 날씨 데이터 불러오기
   4.1 base_time 을 정해야 한다!!

5. Page에 data-index를 추가해줌.
   => App에서 new Page()로 호출할때, 인자로 Container의 childNOdes의 length를 통해 자동으로 index가 증가하게 함

\*공부할것

1. geoLocation 과 같은 API를 어떻게 호출할지 async? fetch?

2. nodeList

03/23

1. currentWeather 섹션 생성 [O]
   1.1 입력받을 데이터 $target($page), 최고/최저 온도, 현재 온도
   1.2 섹션 생성
   1.3 각 흰색 칸들은 div로 구성

2. geolocation을 통해 좌표값 생성, 그것을 gridXY로 변경(In Page)
   2.1 geoLocation을 통해 현재 위치 좌표 가져오기 [O]
   \*\*\* 2.1.1 async를 위해 init함수 새로 생성
   \*\*\* 2.1.2 Promise를 사용해 getPosition을 통해 가져온 coords값을 return
   2.1.3 예외처리
   \*\*\*async함수 내에 try,catch구문!!
   2.2 gridXY 좌표 변환기 사용 [O]
   2.3 그 값을통해 역추적해서 주소구하기..?

3) 격좌표?! 값을 통해서 날씨 정보 호출, 전달
   3.0 \*\*\*Base_Time 구하기!!
   3.1 전달받은 좌표를 통해 API 호출
   3.2 어떤 API? 1) 초단기 실황
   3.2.1 HOW?!
   3.2.1.1 ex) 1:39분의 경우 basetime = 0000
   ex) 1:40분의 경우 basetime = 0100
   if) 00:39 분의 경우 전날 2300의 데이터를 가져와야하고,
   if) 1월1일 00:39분의 경우 작년 12월 31일의 2300의 데이터를 가져와야한다.
   \*\*page의 init함수에서 날짜 및 좌표 정보들을 설정하고, data를 불러와야한다.
   \*\*그리고 page의 render에서 불러온 데이터를 다른 컴포넌트에 전달!
   \*\* 초단기실황 api함수 제작

   0. 데이트 객체, 좌표값을 전달한다
   1. 전달받은 데이트 객체로 시간을 계산해 basetime,basedate를 계산
   1. api를 호출하고 받은 데이터를 리턴한다.

03/24

1. Page에서 현재 온도/ 최저/최고 온도, 현재 위치 생성 후 CurrentWeather에 데이터를 넘겨준다.

data 구조 :
data = {
nowData,
vilData,
weeklyData,
locationString
}

    1.1 Page의 init에서 받아온 response를 통해 예외처리를 한다.
    1.2 예외처리를 위해 response의 header,body를 분리.
    1.3 header의 'resultCode'를 통해 예외처리를한다.
    1.4 예외처리 완료 후 response.body에서 현재 온도값을 파싱해야한다.
    => 커스텀 에러를 이용해 처리했다!!
    1.5 filter 사용해보기 배열안에 내가 원하는 값을 가진 놈?을 찾아야한다.(category = 'T1H')인 객체 찾기. => 성공! [O]
    1.5.1 습도도 가져오기 코드 REH
    1.6 이제 다른 데이터도 불러와서 객체화하여 currentWeather에 전달!

2. 이번에는 최저/최고 온도불러오기!
   2.0 최초 어플 작동시에는 sky, tmn,tmx를 다불러와야하지만, 새로고침 버튼 클릭시에는 sky값만 가져오면된다. => numOfRows를 줄여서 해결

   \*\*\* 그렇다면 currentWeather.setstate에도 reload했는지 알려주면 되지 않을가?!
   ==> 이렇게 해서 어떤 데이터를 갱신할지 결정
   => 렌더링할때는 그냥 통 데이터를 모두 렌더링

2.1 필요한 데이터 : SKT (하늘 상태), TMN(아침 최저기온), TMX(낮 최고기온)

2.2 우선 baseTime을 정해야한다.
2.2.1 HOW?
2.2.2 동네 예보는 2,5,8,11 ... 3시간 단위..
2.2.3 api 활용가능 시간은 ex) 02:10분이므로 02:09분까지는 전날 23:00의 데이터를 활용해야한다.
2.2.4 그렇다면 가장가까운 3시간전? baseTime을 구해야한다.
2.2.5 현재 시간을 체크, 2,5,8... 이 아니면, 3으로 나눈 나머지가 2, 가장 가까운 시간을 구한다
2.2.6 만약 2,5,8..중에 하나라면 분이 10분을 넘는지 확인
2.2.7 10분을 넘으면 그시간 그대로 요청
2.2.8 10분을 안넘으면 그전 시간으로 요청
2.2.9 제대로 baseTime을 가져오는지 테스트
ex ) date: new Date("1/1/2020 05:09:00") 등등을 전달해본다.

2.3 date,좌표를 입력받는다.

2.4 baseTime을 구한다.
2.4.1 \*\*이때, 전날 23시 데이터를 통해 데이터를 구해야지 최저,최고온도를 알 수 있다.
2.4.2 따라서 타임 세팅을 전날 23시 데이터를 가져와야한다.
2.4.3 하지만 sky같은 경우는 새로고침 때마다 가져와야하므로, 새로고침 했는지 알수있는 flag변수를 설정한다.(isReload?)
2.4.4 isReload = true이면 baseDate를 현재값 기준으로하고, 가져오는 데이터수를 10개만 가져온다.
2.4.5 isReload = false이면 전날 23시 데이터. 즉, 최초 init함수가 실행될때이다. 가져오는 데이터를 50개로한다.

2.5 api를 요청한다.

2.6 요청결과에따라 예외처리를 한다.
2.6.1 response의 header와 body를 분리한다
2.6.2 header를 통해 예외처리,
2.6.3 body를 통해 원하는 데이터 파싱
2.6.4 문제점
\*\*SKY값이 여러개라서 그중에 하나만 가져와야한다,
==> find를 통해 첫번째 값을 가져옴
==> 나중에 고쳐야함\*\*\*\*

2.7 결과를 전달하고
2.8 page는 그 데이터를 저장한다.

2.9 그리고 컴포넌트에 전달한다.
2.9.1 어떻게 데이터화하여 전달하지?!
2.9.2 전달할 데이터 :
=> 현재온도, 최고/최저온도, 습도, SKY
2.9.3 전달할 데이터를 어떤 방식으로 묶어서 전달?!

2.9.4 우선 page에서 필터링하지말고, nowData,vilData모두 currentWeather에 전달해보자.
2.9.5 currentWeather의 setState는 Data,isReload
isReload = t/f => 이것을 통해 어떤값을 렌더링할지 정한다.

Page의 데이터 :
{
동네예보,
현재예보,
주간예보//,
현재 위치

}

Data = {
nowData : [],
vilData : []
}

2.10 그리고 컴포넌트는 그것을 렌더링한다.

3. currentWeather의 setState를 통해 각 컴포넌트를 렌더링한다.
   3.1 currentWeather.setState -> section.setState호출 [O]

4. 새로고침 해보자 [X]

   4.1 새로고침을 누르면
   4.1.1 page index가 0이면 좌표값 부터다시받아오고, 아니면 날씨데이터만 받아온다.
   4.1.2 좌표값을 다시받아오고 그것을 통해 날씨를 다시받아오는데, 이때
   4.1.3 최고/최저온도는 받아오지않는다. 즉, sky랑 현재 온도, 습도값만 받아온다.

**\*\*\*\***\***\*\*\*\***
\*\* 오늘 배운 것

1. async await 안에서는 try catch로 예외처리를 한다
2. fetch의 결과인 response의 status값을 switch를 통해 예외처리하는 방법, 그리고 여기서 throw 한 에러를 catch문에서 받는다.
3. 그리고 여기서 또 throw하면 바깥의 catch(e)에서 받을 수 있다.
4. date.setDate()를 통한 지난 날짜 구하기
   :<https://blog.leocat.kr/notes/2017/07/24/javascript-add-days>
5. flag 변수 활용하기

/////////////////////

03/25

할일

1. 함수 수정, 현재 page에서 데이터를 통째로 가지고있는게 맞나?
   아니면 필터링한 데이터를 가지고 그 데이터를 각 컴포넌트에 뿌려줘야하나?
   ====> Page에서 필요한 데이터만 저장하고 그 데이터를 전달하도록 수정해보자.
   현재는 모든 데이터를 다가지고있음(로드된데이터)

   1.1 현재 너무 불필요한 데이터를 가지고온다.
   => 최초 가지고온 동네 데이터에서 데이터값을 파싱?!
   1.2 아이콘은 SKY, R06, S06을 조합해서 만들자

2) 새로고침 만들기 [X]

3) 주간 데이터 받아오기 [O]
   3.1 시간대별 날씨 => 동네 예보를 쓰면 될거같다.
   3.1.1 우선 동네 예보를 받아오고, 현재 시간 기준.
   3.2 주간 날씨 => 주간날씨 데이터 사용

4) 주소값 받아오기 => 어려울 경우 그냥 geolocation값 활용

1. 어떻게 불러오고 저장할까?!
   1.1 필요한 데이터가 뭔데?!
   = 처음 어플리케이션을 로딩할경우 :
   현재실황(T1H,REH), 동네예보(TMN, TMX,SKY,R06,S06,예보시간,예보날짜,강수확률)

   1.2 동네 예보의 경우, totalCount > numOfRows
   totalCount를 모두 불러와서 다른 파일에 저장해놓을수있다.
   그러면 필요할때 파일을 불러온다.
   1.3 동네예보를 어떻게 불러올까?!
   1.3.1 우선 num : 30, total_Count 계산 ex) totalCount = 205
   1.3.1.1 총 불러올 횟수 = Math.ceil(totalCount/num) = loopCount = page
   1.3.1.2 for(i=1; i<=loopCount;i++){
   api 요청
   이안에서 필요한 데이터 파싱해서 배열에 저장해놓자.
   filter를 통해서 필요한 값들을 배열에 저장?!
   }
   1.3.3 불러온 데이터를 배열에 저장해보자

   \*\*\* loadData를 분리하자!!
   why???데이터 하나를 불러오는걸 완료하고 또 다른 데이터를 불러오므로 효율이떨어짐 따라서 필요할때 동시에 데이터들을 불러와야한다.
   Promise.all을 사용해보자. [O]
   링크 : <https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel>

//////////////////////////

수정한것

1. filter = 조건이 true가 되는 엘리먼트들을 필터링한다
   이때, 엘리먼트의 해당 키값의 value에 따라 필터링하고 싶었는데, 조건들을 SAMPLE이라는 배열에 저장해놓고, 해당 키값의 value가 SAMPLE이라는 배열 안에 존재하는지 확인하여 있으면 true를 반환하는 includes함수를 통해 해결했다.

2. 그리고 loadData함수를 제거하고, 각 데이터를 불러오는 함수를 따로 호출했다.

3. 최초 init함수 실행시 vilData의 데이터개수를 그냥 200개로 설정.
   => 페이징 기법을 어떻게해야할지 모르겠다.

4. 각 불러온 데이터들에서 원하는 값만을 추출해서 page내의 data 객체에 저장하도록 설정.

5. Promise.all [O]

6. API변경 : 초단기실황 -> 초단기 예보
   따라서 초단기예보에서 ,T1H, SKY, REH, R1N을 불러온다.
   => baseTime변경
   => 초기 동네예보에서는 최고/최저온도만 불러온다.

7. getVailData 변경

   7.1 변경안
   : 최초에 TMN,TMX값만 가져온다 시간 기준 : 전날 23시
   =>NUMOFROWS : 50
   : 그리고 최초 어플 실행시에도 현재시간을 기준으로 데이터 가져와야함
   => 3시간온도, 강수확률, 강수량 등등..
   =>NUMOFROWS : 200
   => isInit이라는 Flag변수를 생성,
   => isInit = true일시 초기화이므로, 23시데이터, 50개
   => isInit = Flase일시 새로고침 및 시간대날씨데이터
   => 200개, 현재시간 기준 데이터
   => POP,R06,S06,T3H,SKY,

   7.2 3개를 동시에 promise.all로 가져올수 있나?
   => 가능!

8. 문제점 찾은거 : page의 nowDate를 각 api, setbase가 참조해서 date의 값이 변경된다. getVilWeather의 date.setdate()부분때문인듯
   =>따라서 참조한 date값을 새로운 변수에 담아서 사용하자.[X]
   그냥 api내에서 새 date객체를 만드는 방식으로! [O]

////////////////////////

03/26

오늘 할것

1. 두번째 섹션 만들기 : 섹션은 그냥 엘리먼트로 만들고, 안에있는
   시간대별, 주간 날씨를 표시하는 부분을 엘리먼트로 만든다.
   1.1 header-timestamp [O]
   1.2 header-location [O]
   1.3 시간대별 날씨 구조잡기

2. byTimeData를 가져오는 데는 성공했으나 이것을 어떻게 렌더링할지 생각해보자
   => fcstTime을 기준으로 데이터를 묶을수있나?!

---

\*오늘 수정한 것

1. CurrentWeather와 같은 섹션안에 전체를 묶는 Wrapper 섹션 생성 후 거기에 컴포넌트들을 append하는 방식으로 수정

=> 엘리먼트 명은 \$wrapper

2. App 하위의 Container의 클래스명을 App-conatiner로 수정

---

////////////////////

03/27

오늘 수정한 것

1. 시간대별 데이터 정렬까지 성공

2.

---

오늘 할 것

1. 시간대별날씨 컴포넌트 만들고, 렌더링하기

2. groupBy()함수 연습하기

---

오늘 배운 것

1. str.substr()

2. Object.keys(), Object.values()

3. array.reduce(), array.filter(), array.map()

////////////////////

03/28

오늘 한 것

1. Page -> MainWeather -> ByTimeWeather.js 중에서

2. ByTimeWeather.js에 데이터 렌더링 까지 성공

---

내일 할 것

1. ByTimeWeather.js에 데이터 렌더링된 데이터 구조 다시 잡기, 좀더 자세히 표시
   => 아이콘도 해야한다
   => 첫번째 시간이 현재 2시 35분인데 06시 부터 데이터가 나온다. 따라서 baseTime을 3시간 전으로 해야하나?!
   => 개선 방안 : 처음에 Page의 init에서 로드한 현재 온도(초단기예보)의 데이터를 이용해서 지금(현재)에 해당하는 부분을 렌더링 하면 되지 않을까?!
2. 주간 데이터 및 지역 코드 불러오기 도전해보자

///////////////////////

04/02

오늘 한것

1. api.js에서 geVilDate함수 수정. 시간 기준을 2시 11분으로 하여 2시 11분 이전에는 전날의 2시 데이터를 가져오고, 이후에는
   오늘의 2시 데이터를 가져오도록 설정했다.

2. byTimeData에 데이터 표시시 '지금' 이랑 현재 온도 표시 --> 실패..?
   => 문제점 : 현재온도에는 POP이 없다.

3. 중기육상예보조회 이용해서 7일간의 데이터 보여주기
   => 오늘 ~ + 6일

//////

내일 할것

1. 주소 선택하는 화면 만들기

2. 주소선택 마지막 값의 x,y,lat,lon 값 가져오기

3. 주간예보는 openweather을 사용해보자.

4.

////

04/03

수정할 것

1. 첫번째 page에 coord, gridXy를 app.js에서 전달하는 방식으로 수정해보자
   => 두번재 페이지를 생성할때 매개변수로 좌표를 전달할 수 있도록, [O]

2. 새로고침 버튼 클릭시 app.js에 있는 함수 호출 및 app.js의 기본 좌표 변경.

3. new Page 함수를 통해서 만들었는데 이부분 고민 필요,,

4. 최초 표시되는 주소를 page생성할때 전달해야하는가? [X] => 전달받은 좌표를 구글 api를 활용해 주소값을 받아온다.

5. addSearch 컴포넌트를 제일위로 올리자, 새 페이지가 추가될때 위치가 애매함 [O]

6. 구글 api사용해서 lat,lng값으로 주소를불러온다 -> 이를 page의 setState에 전달해서 각 페이지에 뿌려준다.
   6.1 어떻게 렌더링할지, 어떻게 주소값을 스트링형태로 가져올지 고민 [O] 스트링형태로 받아옴.
   6.2 지역코드??!

7. this.\$currentWeather에 data : null => data:{}로 수정했다.
   currentWeather의 index.js에서 받아온 데이터를
   this.data에 동적으로 추가해야하는데
   초기에 null로되어있었기 때문에 this.data[''] = {}이런식으로
   추가할때 'Uncaught TypeError: Cannot set property 'value' of null'가 발생했다.
   말그대로 null에 값을 넣을수 없다는뜻!
   그래서 빈 객체로 바꿔줬다!

8) currentWeather index.js의 setState 변경
   isInit 삭제, 가져온 데이터에서 TMX,TMN은 잘 결정해서 수정해야하는데, 가져온 데이터의 첫번째 값의 fcstDate의 날짜(끝 2글자)가 현재 날짜와 같으면 교체! 다르면 기각

9. 어떻게하면 fetch 속도를 올릴수있을까.. 고민

10. 디자인 필요

////

04/04

오늘 할 것

1. 로드 화면 추가 async, await이용 [O]

2. addSearch 데이터 가져오는 것을 화면이 클릭되었을시로 변경

3. 전체적인 design

---

시도중

1. 로드 화면 만들기 :
   1.1 컴포넌트화? 아니면 그냥 함수화?!
   => 미리 생성해놓고 함수하자.
   1.2 img width동적으로 결정?! X => 미디어쿼리 사용!
   1.3 로딩화면 function 생성
   => true-> display block ,false->display none으로동작하도록 [O]

2. 추가하기 버튼 클릭시 addsearch화면 나오도록
   display -> visibility = hidden으로 변경
   두개의 차이점 : <http://webberstudy.com/html-css/css-2/display-and-visibility-property/> [O]

3. AddSearch 컴포넌트에 닫기버튼 추가 [O]

4. 문제점 발견 -> addSearch를 통해 도시를 선택하고 다시 추가하기 버튼을 통해 addSearch에 들어가면 마지막 level3의 데이터들이 남아있다.
   => getData의 구조를 변화하고,
   처음에 level 1의데이터를 initialData로 받아놨다가,
   도시를 선택하면 다시 this.data를 initialData로 바꿔서 render하도록 변경해보자
   4.1 우선 getdata안의 setState삭제.

   [X]

5. 문제점 2 => gridXY를 변경해서 displayLocation을하면 정확도가 너무떨어진다따라서 gridXY말고 lat,lon값을 전달해야한다.
   [O] 데이터 구조 변경 성공, gridXY 변경하는 함수에서 애초에 x,y,lat,lng가 나오므로
   전체적으로 locationData를 만들어서 전송함.

---

해결할 것

1. addSearch 마지막 렌더링된 값 남아잇는것 해결하기 [O]

2. page를 새로 생성하면 이걸 저장했다가 다시 불러오는 것.
   => 해당 좌표만 있으면 계속 생성할 수 있지 않을까?!!

////

04/06

\*\*\*오늘 안것

1. const func = params=>{

} params로 매개변수를 설정하면
func({ a,b}) 처럼 객체형식으로 인자를 전달해야한다.

오늘 한 것

1. css 디자인

2. addSearch 마지막 렌더링된 값 남아잇는것 해결하기
   => this.getDataAfterLoad();의 위치를 변경하는 것으로 해결
   => 마지막 레벨3의 버튼이 클릭되면, setState전에 type = Wide로 변경해줘야한다. [O]

3. page를 새로 생성하면 이걸 저장했다가 다시 불러오는 것.
   => 해당 좌표만 있으면 계속 생성할 수 있지 않을까?!! [O]
   => 페이지를 생성할때, 사용된 locationData를 로컬스토리지에 저장해놓자. [O]
   => 그것보다 어떻게 page들을 관리할까!?
   page라는 배열을 생성해놓고 생성된 page들을 그 page에 push?하는건어떨까
   => 그러면 생성시에는 push [O]
   => 삭제시에는 해당되는 페이지의 index를 찾아서 삭제. \*\*\*
   => localStorage pageData 에 page의 index도 저장하자 = X
   => 새로 추가할때 addressString을 찾아서 중복을 방지해보자\*\*\*

4. 새 페이지를 생성할때 클릭해서 얻은 도시이름을 전달할까?
   구글 지도api를 통해 지역이름을 구하니 오차가 심하다. [o]

5. Page.js loadData() 생성 -> isAddress에 따라 동작
   => 첫 페이지가 생성될때 작동한다. addNewPage로 생성되는 다른 페이지들은
   addressString을 전달받으므로 작동안함
6. locationString -> addressString으로 변수명 변경

7. App의 getPosition을 Page에서 동작하도록
   => 첫 페이지를 불러올때 null값을 인자로 전달해서
   page의 init 내에서 getPosition을 하도록

8. 첫 페이지는 ls에 저장 X

9. page.js에 this.\$pages 생성해서 페이지들을 모두관리.
   => 추가되는 페이지 계쏙 추가 이뮤터블방식

10. addrSearch에서 마지막 버튼 클릭시 addressString을 전달하도록

11. addrSearch 마지막 값 문제 해결

\*\*\*내일 할 것

1. 로딩화면 하나 더 추가

2. 도시 이름들 데이터를 저장해놓고 상위 버튼을 클릭하면 해당 데이터를 불러오기.
   => previousData = ?

3. 새 page추가할때, 중복 방지해보기 ls에서 addressString을 참조해보자

4. css 디자인

5. 새로고침 , 공유하기

6. 아이콘, 인삿말,

문제점

1. localStorage에 저장된 page를 불러올때 로딩화면이 끝나고 생성된다
   => 어차피 한화면에 한페이지씩만 보여지므로 상관없나?!

///////

---

참고할 자료 :

위치주소 : https://elecs.tistory.com/21?category=636509,
지역코드 : https://elecs.tistory.com/22
날짜 정하기 : https://blog.leocat.kr/notes/2017/07/24/javascript-add-days
데이터가져오기 : https://glow153.tistory.com/12?category=759016

/////////////////////

필요한 함수

참고1 : https://glow153.tistory.com/10?category=759016
참고2 : https://ming9mon.tistory.com/83?category=856743
참고3 : http://www.ministory.net/xe/?mid=it_story&category=6555&page=1&document_srl=228756

1. 기상청 지역 코드 API 좌표값 가져오기

2. JSON 파싱?!

3. latlon -> gridXY 변환 [O]

4. CORS?! 문제 해결하긴함 : https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors

5. 가장 가까운 시간 구하기. [O]

6. 컴포넌트 파일들을 어떻게 구별하는지 및 파일들을 어떻게 정리?! 하는지

///////

수정 사항? 개선 필요 사항

1. fetch API 폴리필 작성

2. 예외처리 좀더 다듬기

3. 데이터를 가져오는 시간이 너무 느리다
   3.1 가져오는 데이터의 숫자를 줄여야하나?!
   ==> 우선 Promise.all을 사용해서 동시에 데이터 받아오는 방식 [세모]

4. currentWeather section이름 수정, class Section 이름 수정필요
