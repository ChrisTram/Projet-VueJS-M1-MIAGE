<template>
  <div>
    <restaurant-render-panier :toCartObj="toCart"></restaurant-render-panier>
  </div>
</template>
<script>
import RestaurantRenderPanier from "./RestaurantRenderPanier";
export default {
  nom: "restaurant-panier",
  components: {
    RestaurantRenderPanier
  },
  props: {
    toCartPlats: Array,
    toCartMenus: Array
  },
  watch: {
    total: {
      handler() {
        this.updateCart();
      }
    }
  },
  data() {
    return {
      toCart: {
        plats: [],
        menus: [],
        totalPlats: 0,
        totalMenus: 0
      },
      total: 0
    };
  },
  methods: {
    calculTotal() {
      let totalPlats = this.toCartPlats.reduce((a, b) => a[4] + b[4], 0);
      let totalMenus = this.toCartMenus.reduce((a, b) => a.prix + b.prix, 0);
      return totalPlats + totalMenus;
    },
    updateCart() {
      if (typeof this.toCartPlats != undefined) {
        let totalPlats = this.toCartPlats.reduce((a, b) => a[4] + b[4], 0);
        this.toCart.totalPlats = totalPlats;
        this.toCart.plats = this.toCartPlats;
      }
      if (typeof this.toCartMenus != undefined) {
        let totalMenus = this.toCartMenus.reduce((a, b) => a.prix + b.prix, 0);
        this.toCart.totalMenus = totalMenus;
        this.toCart.menus = this.toCartMenus;
      }
    }
  }
};
</script>