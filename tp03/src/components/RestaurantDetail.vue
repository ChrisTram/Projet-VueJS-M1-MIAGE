<template>
  <div>
    <h1>Detail du restaurant d'id = {{id}}</h1>
    <h1></h1>
    <RestaurantMap :coords="coords"></RestaurantMap>
    <restaurant-evaluation :evals="evals"></restaurant-evaluation>
  </div>
</template>
<script>
import RestaurantMap from "";
export default {
  name: "RestaurantDetail",
  components: {
    RestaurantMap
  },
  props: {
    restaurant: Object
  },
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
    this.coords = this.restaurant.grade;
    this.evals = this.restaurant.evals;
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
