<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App {{name}}"/>
    <Restaurant>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Restaurant from './components/Restaurant.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Restaurant
  },

  data: function() {
    return {
      name: "Msg",
      name2: "Msg2"
    };
  },
  
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
