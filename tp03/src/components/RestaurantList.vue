<template>
  <div>
    <restaurant-detail></restaurant-detail>
    <restaurant-evaluation v-bind:evals="evals"></restaurant-evaluation>
    <!-- Envoie les évaluations au fils -->
    <restaurant-map v-bind:coords="coords"></restaurant-map>
    <!-- Envoie les coordonnées au fils -->
  </div>
</template>

<script>
import RestaurantMap from "./";
import RestaurantDetail from "./";
import RestaurantEvaluation from "./";
export default {
  name: "restaurant-list",
  components: {
    RestaurantMap,
    RestaurantDetail,
    RestaurantEvaluation
  },
  props: {},
  computed: {
    // computed data, permet de définir des data "calculées"
    id: function() {
      // on y accèdera par {{id}} dans le template, et par this.id
      // dans le code
      return this.$route.params.id;
    }
  },
  data: function() {
    return {
      coords: [],
      evals: []
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    console.log(
      "On va chercher les détails du restaurant id = " + this.$route.params.id
    );
    console.log("ID = " + this.id);
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
