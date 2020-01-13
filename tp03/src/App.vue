<template>
  <div id="app">
    <md-button class="md-raised md-primary">
      <router-link style="color:white" to="/restaurants">Liste des restaurants</router-link>
    </md-button>

    <router-view></router-view>
    <footer>
      <p>© 2019 PROJET MIAGE</p>
    </footer>
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
}

body {
  min-height: 100%;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
  overflow-y: scroll;
}
</style>
