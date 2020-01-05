<template>
  <div>
    <div v-if="typeof this.toCart !== 'undefined'">
      <h1>Panier</h1>
      <h1>{{ toCart }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  nom: "restaurant-panier",

  props: {
  },
  watch: {
    total: {
      immediate: true,
      handler() {
        //this.toCartMenus = [];
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
      console.log("CalculTotal");
      let totalPlats = this.toCartPlats.reduce((a, b) => a[4] + b[4], 0);
      let totalMenus = this.toCartMenus.reduce((a, b) => a.prix + b.prix, 0);
      return totalPlats + totalMenus;
    },
    updateCartMenus(value) {
      console.log("Update du panier");
      console.log(value);
      let totalMenus = value.reduce((a, b) => a + b.prix, 0);
      this.toCart.totalMenus = totalMenus;
      this.toCart.menus = value;
      this.updateCart();
    },
    updateCartPlats(value) {
      console.log("Update du panier");
      let totalPlats = value.reduce((a, b) => a + b[4], 0);
      this.toCart.totalPlats = totalPlats;
      this.toCart.plats = value;
      this.updateCart();
    },
    updateCart() {

    }
  }
};
</script>