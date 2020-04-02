class AddrSearch {
  constructor({ $target }) {
    this.$target = $target;

    const $AddrSearch = document.createElement("div");
    this.$AddrSearch = $AddrSearch;
    this.$AddrSearch.className = "AddrSearch";

    const $title = document.createElement("h4");
    this.$title = $title;
    this.$title.innerHTML = "검색하세요";

    const $ul = document.createElement("ul");
    this.$ul = $ul;
    this.$ul.className = "addrSearch-list";

    this.$AddrSearch.appendChild(this.$title);
    this.$AddrSearch.appendChild(this.$ul);

    this.$target.appendChild(this.$AddrSearch);
  }
}

export default AddrSearch;
