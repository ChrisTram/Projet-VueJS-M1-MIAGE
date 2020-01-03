<template>
  <div>
    <h1>{{ toCartPlats }}</h1>
    <h1>{{ toCartMenus }}</h1>
  </div>
</template>
<script>
export default {
  nom: "restaurant-panier",
  props: {
    toCartPlats: Array,
    toCartMenus: Array
  }
};
</script>