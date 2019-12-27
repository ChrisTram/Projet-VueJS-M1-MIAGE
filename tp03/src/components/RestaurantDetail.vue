<template>
  <div>
    <h1>Detail du restaurant d'id = {{restaurant._id}}</h1>

    <restaurant-map v-if="typeof this.restaurant.address !== 'undefined'" :coords = coords></restaurant-map> 
    <restaurant-evaluation v-if="typeof this.restaurant.address !== 'undefined'" :evals = grades></restaurant-evaluation>  

  </div>
</template>

<script>

import RestaurantMap from "./RestaurantMap.vue";
import RestaurantEvaluation from "./RestaurantEvaluation.vue";
export default {
  name: "restaurant-detail",
  components: {
    RestaurantMap,
    RestaurantEvaluation
  },  
  computed: {
    coords() {
        return this.restaurant.address.coord;
    },
    grades() {
      return this.restaurant.grades;
    }
  },
  props: {},
  data() {
    return {
      apiURL: "http://localhost:8081/api/restaurants",
      restaurant : {}

    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    console.log(
      "On va chercher les détails du restaurant nommé = " + this.$route.params.id
    );
    this.getDataFromServer();

  },
  methods: {
    getDataFromServer() {

      // ici on fait un fetch pour récupérer détails du serveur
      let url =
        this.apiURL +
        "/" +
        this.$route.params.id;

      fetch(url)
        .then(reponseJSON => {
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a la réponse sous la forme
          // d'un objet JS
          console.log("fin du fetch");
          console.log(url);
          console.log(reponseJS.restaurant);
          this.restaurant = reponseJS.restaurant;
        });
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
