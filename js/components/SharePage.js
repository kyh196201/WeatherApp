class SharePage {
  constructor({ $target, visible }) {
    this.$target = $target; //App.js
    this.visible = visible;

    const $sharePage = document.createElement("div");
    $sharePage.className = "sharePage";
    this.$sharePage = $sharePage;
    this.$target.appendChild(this.$sharePage);

    this.render();
  }

  render = () => {
    if (this.visible) {
      this.$sharePage.innerHTML = `
        <div class="content-wrapper">
        <h3 class="modal__title">공유하기</h3>
        <div class="modal__desc">
          <span>현대카드 웨더와 날씨 정보를</span>
          <span>공유 해주세요</span>
        </div>
        <div class="modal__content">
          <div>
            <a href=""
              ><img src="./images/facebook-icon.png" alt="" /><span
                >페이스북</span
              ></a
            >
          </div>
          <div>
            <a href=""
              ><img src="./images/facebook-icon.png" alt="" /><span
                >페이스북</span
              ></a
            >
          </div>
          <div>
            <a href=""
              ><img src="./images/facebook-icon.png" alt="" /><span
                >페이스북</span
              ></a
            >
          </div>
          <div>
            <a href=""
              ><img src="./images/facebook-icon.png" alt="" /><span
                >페이스북</span
              ></a
            >
          </div>
        </div>
      </div>
        `;
      this.$sharePage.style.display = "block";
    } else {
      this.$sharePage.style.display = "none";
    }
  };

  setState = ({ visible }) => {
    this.visible = visible;
    this.render();
  };
}

export default SharePage;
