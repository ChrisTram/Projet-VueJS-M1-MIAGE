<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{nom}}</h1>
    <Restaurants></Restaurants>
  </div>
</template>

<script>
import Restaurants from "./components/Restaurants.vue";
export default {
  name: "app",
  components: {
    Restaurants
  },
  data: function() {
    return {
      nom: "Dex"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
