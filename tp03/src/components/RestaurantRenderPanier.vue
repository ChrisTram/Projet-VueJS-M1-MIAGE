<template>
  <div>
    <h1>Panier</h1>
      <button v-on:click="showCard()">Greet</button>

    <h1>{{ toCartObj }}</h1>
  </div>

  
</template>
<script>
export default {
  nom: "restaurant-render-panier",
  props: {
    toCartObj: Object
  },
  watch: {
    immediate: true,
    render() {
      this.toCart = this.toCartObj;
    }
  },
  data() {
    return {
      toCart: {}
    };
  },
    methods: {
    showCard() {
      console.log(this.toCartObj);
    }
  }
};
</script>