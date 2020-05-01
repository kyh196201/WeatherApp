import { addEvent } from "../utils/Services/functions.js";

class SharePage {
  constructor({ $target, visible }) {
    this.$target = $target; //App.js
    this.visible = visible;

    const $sharePage = document.createElement("div");
    $sharePage.className = "sharePage";
    this.$sharePage = $sharePage;
    this.$target.appendChild(this.$sharePage);

    addEvent("click", this.$sharePage, (e) => {
      const _target = e.target.closest("a");
      if (_target) {
        e.preventDefault();
        if (window.confirm("공유하시겠습니까?!")) {
          return;
        }
        return;
      }
    });

    this.render();
  }

  render = () => {
    if (this.visible) {
      this.$sharePage.innerHTML = `
      <div class="content-wrapper zoomOut">
        <h3 class="modal__title">공유하기</h3>
        <div class="modal__desc">
          <span>현대카드 웨더와 날씨 정보를</span>
          <span>공유 해주세요</span>
        </div>
        <div class="modal__content">
          <div>
            <a href=""
              ><img src="./images/icons/facebook-icon.png" alt="" /><span
                >페이스북</span
              ></a
            >
          </div>
          <div>
            <a href=""
              ><img src="./images/icons/Kakao.png" alt="" /><span
                >카카오</span
              ></a
            >
          </div>
          <div>
            <a href=""
              ><img src="./images/icons/twitter-icon.png" alt="" /><span
                >트위터</span
              ></a
            >
          </div>
          <div>
            <a href=""
              ><img src="./images/icons/Logos-Instagram-icon.png" alt="" /><span
                >인스타그램</span
              ></a
            >
          </div>
        </div>
        <button class="modal__closeBtn"><i class="fas fa-times"></i></button>
      </div>
        `;
      const wrapper = document.querySelector(".content-wrapper");
      const closeBtn = document.querySelector(".modal__closeBtn");
      wrapper.classList.toggle("zoomOut");
      wrapper.classList.toggle("zoomIn");
      this.$sharePage.style.display = "block";
      closeBtn.onclick = (e) => {
        wrapper.classList.toggle("zoomOut");
        wrapper.classList.toggle("zoomIn");
        setTimeout(() => {
          this.$sharePage.style.display = "none";
        }, 500);
        window.onclick = null;
      };
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
