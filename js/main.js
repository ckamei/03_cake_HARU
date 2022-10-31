Vue.filter("number_format", function (val) {
  //数値をカンマ入りにするフィルター
  return val.toLocaleString();
});

let app = new Vue({
  el: "#app",
  data: {
    // 表示中の商品数
    // 「並び替え」の選択値（0:初期値、5:5000円、6:6000円、7:7000円）
    sortOrder: 0,
    // 商品リスト
    products: [],
  },
  created: async function () {
    const res = await fetch("js/cakeMenu.json");
    const items = await res.json();
    this.products = items;
  },
  computed: {
    filteredList: function () {
      let newList = [];
      for (let i = 0; i < this.products.length; i++) {
        let isShow = true;
        if (this.sortOrder === 5 && this.products[i].price > 5000) {
          isShow = false;
        } else if (this.sortOrder === 6 && this.products[i].price > 6000) {
          isShow = false;
        } else if (this.sortOrder === 7 && this.products[i].price > 7000) {
          isShow = false;
        }
        if (isShow) {
          newList.push(this.products[i]);
        }
      }
      return newList;
    },
  },
});
