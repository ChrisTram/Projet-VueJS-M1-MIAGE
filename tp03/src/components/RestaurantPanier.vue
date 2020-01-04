<template>
  <div>
    <restaurant-render-panier :toCart="toCart"></restaurant-render-panier>
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
        this.total = this.calculTotal();
        this.toCart = {
          plats: this.toCartPlats,
          menus: this.toCartMenus,
          total: this.total
        };
      }
    }
  },
  data() {
    return {
      toCart: {},
      total: 0,
      plats: {},
      menus: {}
    };
  },
  methods: {
    calculTotal() {
      let totalPlats = this.toCartPlats.reduce((a, b) => a[4] + b[4], 0);
      let totalMenus = this.toCartMenus.reduce((a, b) => a.prix + b.prix, 0);
      return totalPlats + totalMenus;
    }
  }
};
</script>