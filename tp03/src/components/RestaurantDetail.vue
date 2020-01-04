<template>
  <div v-if="typeof this.restaurant.address !== 'undefined'">
    <div class="md-display-2">Bienvenue chez {{restaurant.name}}</div>
    <md-tabs md-sync-route>
      <md-tab id="tab-findUs" md-label="Nous trouver" @click="toggleMap = !toggleMap" exact></md-tab>
      <md-button class="md-raised md-primary" @click="toggleMap = !toggleMap">Nous trouver</md-button>
      <md-button class="md-raised md-primary" @click="toggleEval = !toggleEval">Nos évaluations</md-button>
      <md-button class="md-raised md-primary" @click="togglePlat = !togglePlat">Nos plats</md-button>
      <md-tab id="tab-plats" md-label="Nos plats">
        <md-list>
          <md-list-item to="/restaurant/details/menus">Nos menus</md-list-item>
          <md-list-item to="/restaurant/details/plats">A la carte</md-list-item>
        </md-list>
      </md-tab>
    </md-tabs>
    <restaurant-map v-show="toggleMap" :borough="borough" :address="address"></restaurant-map>
    <restaurant-evaluation v-show="toggleEval" :evals="grades"></restaurant-evaluation>

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
      togglePlat: true,
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
