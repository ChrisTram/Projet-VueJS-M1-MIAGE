<template>
  <div>
    <h1>Panier</h1>
    <h1>{{ toCart }}</h1>
  </div>
</template>
<script>
export default {
  nom: "restaurant-render-panier",
  props: {
    toCart: Object
  },
  data() {
    return {
      cart: {}
    };
  }
};
</script>