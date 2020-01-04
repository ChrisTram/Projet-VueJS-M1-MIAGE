<template>
  <div>
    <div v-if="typeof this.toCart !== 'undefined'">
      <h1>Panier</h1>
      <button v-on:click="showCard()">show Card In RestaurantPanier</button>

      <h1>{{ toCart }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  nom: "restaurant-panier",

  props: {
    toCartPlats: Array,
    toCartMenus: Array
  },
  watch: {
    total: {
      handler() {
        //this.updateCart();
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
    updateCartMenus() {
      console.log("Update");
      let totalMenus = this.toCarteMenus.reduce((a, b) => a.prix + b.prix, 0);
      this.toCart.totalMenus += totalMenus;
      this.toCart.menus.push(this.toCartMenus);
    },
    updateCartPlats() {
      console.log("Update");
      let totalPlats = this.toCartPlats.reduce((a, b) => a[4] + b[4], 0);
      this.toCart.totalPlats += totalPlats;
      this.toCart.plats.push(this.toCartPlats);
    },
    showCard() {
      console.log(this.toCart);
    }
  }
};
</script>