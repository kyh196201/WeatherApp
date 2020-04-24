function PageNavigator({ $target, onClick }) {
  const init = () => {
    this.$target = $target;
    this.onClick = onClick;
    const $leftBtn = document.createElement("button");
    $leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    $leftBtn.className = "leftSlideBtn";

    const $rightBtn = document.createElement("button");
    $rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    $rightBtn.className = "rightSlideBtn";

    this.$leftBtn = $leftBtn;
    this.$rightBtn = $rightBtn;

    this.$target.appendChild(this.$leftBtn);
    this.$target.appendChild(this.$rightBtn);

    bindEvent();
  };

  this.render = () => {
    // this.$leftBtn.classList.add("active");
    this.$rightBtn.classList.add("active");
  };

  const bindEvent = () => {
    this.$leftBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.onClick(e);
      console.log(e.target);
    });
    this.$rightBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.onClick(e);
      console.log(e.target);
    });
  };

  init();
}

export default PageNavigator;
