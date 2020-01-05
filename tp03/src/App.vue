<template>
  <div id="app">
    <md-button class="md-raised md-primary">
      <router-link style="color:white" to="/restaurants">Liste des restaurants</router-link>
    </md-button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: function() {
    return {
      nom: "buffa"
    };
  },
  mounted() {
    console.log("avant affichage");
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
