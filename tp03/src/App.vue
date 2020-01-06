<template>
  <div id="app" class="page-container">
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
}

  .page-container {
    height: 100%;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

  html, body, #app, #app>div {
  height: 100%
}

</style>
