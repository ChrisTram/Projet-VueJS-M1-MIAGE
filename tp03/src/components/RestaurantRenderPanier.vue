<template>
  <div v-if="typeof this.toCartObj !== 'undefined'">
    <h1>Panier</h1>
    <h1>{{ toCartObj }}</h1>
  </div>
</template>
<script>
export default {
  nom: "restaurant-render-panier",
  props: {
    toCartObj: Object
  },
  data() {
    return {
      cart: {}
    };
  }
};
</script>