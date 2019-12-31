<template>
  <div v-if="typeof this.restaurant.address !== 'undefined'">
    <h1>Bienvenue chez {{restaurant.name}}</h1>
    <h1 @click="toggleMap = !toggleMap">Nous trouver</h1>
    <restaurant-map v-show="toggleMap" :borough="borough" :address="address"></restaurant-map>
    <h1 @click="toggleEval = !toggleEval">Nos évaluations</h1>
    <restaurant-evaluation v-show="toggleEval" :evals="grades"></restaurant-evaluation>
    <h1 @click="togglePlat = !togglePlat">Nos Plats</h1>
    <restaurant-plat v-show="togglePlat" :cuisine="cuisine"></restaurant-plat>
  </div>
</template>
<script>
import RestaurantMap from "./RestaurantMap.vue";
import RestaurantEvaluation from "./RestaurantEvaluation.vue";
import RestaurantPlat from "./RestaurantPlat.vue";
export default {
  name: "restaurant-detail",
  components: {
    RestaurantMap,
    RestaurantEvaluation,
    RestaurantPlat
  },
  computed: {
    grades() {
      return this.restaurant.grades;
    },
    cuisine() {
      return this.restaurant.cuisine;
    },
    borough() {
      return this.restaurant.borough;
    },
    address() {
      return this.restaurant.address;
    }
  },
  props: {},
  data() {
    return {
      apiURL: "http://localhost:8081/api/restaurants",
      restaurant: {},
      togglePlat: false,
      toggleMap: false,
      toggleEval: false
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE DETAIL!");
    console.log(
      "On va chercher les détails du restaurant nommé = " +
        this.$route.params.id
    );
    this.getDataFromServer();
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer détails du serveur
      let url = this.apiURL + "/" + this.$route.params.id;

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
