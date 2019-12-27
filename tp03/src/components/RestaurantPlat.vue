<template>
  <div>{{ cuisine }}</div>
</template>


<script>
import plats from "../../data/plats";
export default {
  name: "restaurant-plat",
  components: {},
  computed: {},
  props: {
    cuisine: String
  },
  data() {
    return {
      plats,
      randomPlats: [],
      menus: {}
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE PLAT!");
  },
  methods: {
    createMenus() {},
    selectRandomPlats() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
