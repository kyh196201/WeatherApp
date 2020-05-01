"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _functions = require("../utils/Services/functions.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SharePage = function SharePage(_ref) {
  var $target = _ref.$target,
      visible = _ref.visible;

  _classCallCheck(this, SharePage);

  _initialiseProps.call(this);

  this.$target = $target; //App.js

  this.visible = visible;
  var $sharePage = document.createElement("div");
  $sharePage.className = "sharePage";
  this.$sharePage = $sharePage;
  this.$target.appendChild(this.$sharePage);
  (0, _functions.addEvent)("click", this.$sharePage, function (e) {
    var _target = e.target.closest("a");

    if (_target) {
      e.preventDefault();

      if (window.confirm("공유하시겠습니까?!")) {
        return;
      }

      return;
    }
  });
  this.render();
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.render = function () {
    if (_this.visible) {
      _this.$sharePage.innerHTML = "\n      <div class=\"content-wrapper zoomOut\">\n        <h3 class=\"modal__title\">\uACF5\uC720\uD558\uAE30</h3>\n        <div class=\"modal__desc\">\n          <span>\uD604\uB300\uCE74\uB4DC \uC6E8\uB354\uC640 \uB0A0\uC528 \uC815\uBCF4\uB97C</span>\n          <span>\uACF5\uC720 \uD574\uC8FC\uC138\uC694</span>\n        </div>\n        <div class=\"modal__content\">\n          <div>\n            <a href=\"\"\n              ><img src=\"./images/icons/facebook-icon.png\" alt=\"\" /><span\n                >\uD398\uC774\uC2A4\uBD81</span\n              ></a\n            >\n          </div>\n          <div>\n            <a href=\"\"\n              ><img src=\"./images/icons/Kakao.png\" alt=\"\" /><span\n                >\uCE74\uCE74\uC624</span\n              ></a\n            >\n          </div>\n          <div>\n            <a href=\"\"\n              ><img src=\"./images/icons/twitter-icon.png\" alt=\"\" /><span\n                >\uD2B8\uC704\uD130</span\n              ></a\n            >\n          </div>\n          <div>\n            <a href=\"\"\n              ><img src=\"./images/icons/Logos-Instagram-icon.png\" alt=\"\" /><span\n                >\uC778\uC2A4\uD0C0\uADF8\uB7A8</span\n              ></a\n            >\n          </div>\n        </div>\n        <button class=\"modal__closeBtn\"><i class=\"fas fa-times\"></i></button>\n      </div>\n        ";
      var wrapper = document.querySelector(".content-wrapper");
      var closeBtn = document.querySelector(".modal__closeBtn");
      wrapper.classList.toggle("zoomOut");
      wrapper.classList.toggle("zoomIn");
      _this.$sharePage.style.display = "block";

      closeBtn.onclick = function (e) {
        wrapper.classList.toggle("zoomOut");
        wrapper.classList.toggle("zoomIn");
        setTimeout(function () {
          _this.$sharePage.style.display = "none";
        }, 500);
        window.onclick = null;
      };
    } else {
      _this.$sharePage.style.display = "none";
    }
  };

  this.setState = function (_ref2) {
    var visible = _ref2.visible;
    _this.visible = visible;

    _this.render();
  };
};

var _default = SharePage;
exports["default"] = _default;