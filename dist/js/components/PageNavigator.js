"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function PageNavigator(_ref) {
  var _this = this;

  var $target = _ref.$target,
      onClick = _ref.onClick;

  var init = function init() {
    _this.$target = $target;
    _this.onClick = onClick;
    var $leftBtn = document.createElement("button");
    $leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    $leftBtn.className = "leftSlideBtn";
    var $rightBtn = document.createElement("button");
    $rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    $rightBtn.className = "rightSlideBtn";
    _this.$leftBtn = $leftBtn;
    _this.$rightBtn = $rightBtn;

    _this.$target.appendChild(_this.$leftBtn);

    _this.$target.appendChild(_this.$rightBtn);

    bindEvent();
  };

  this.render = function () {
    // this.$leftBtn.classList.add("active");
    _this.$rightBtn.classList.add("active");
  };

  var bindEvent = function bindEvent() {
    _this.$leftBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      _this.onClick(e);

      console.log(e.target);
    });

    _this.$rightBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      _this.onClick(e);

      console.log(e.target);
    });
  };

  init();
}

var _default = PageNavigator;
exports["default"] = _default;