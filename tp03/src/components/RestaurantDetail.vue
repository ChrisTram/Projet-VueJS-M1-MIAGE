<template>
  <div v-if="typeof this.restaurant.address !== 'undefined'">
    <md-switch v-model="modeAdmin" @change="changeModeAdmin()">Mode Admin</md-switch>
    <div class="md-display-2">Bienvenue chez {{restaurant.name}}</div>
    <md-button class="md-raised md-primary" @click="showInfos = true">Infos</md-button>

    <md-drawer class="md-right" :md-active.sync="showInfos">
      <restaurant-map :borough="borough" :address="address"></restaurant-map>
      <restaurant-evaluation :evals="grades"></restaurant-evaluation>
    </md-drawer>
    <restaurant-plat :cuisine="cuisine"></restaurant-plat>
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
  watch: {
    mode: {
      immediate: true,
      render() {
        this.modeAdmin = this.$root.$data.getMode();
      }
    }
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
      showInfos: false,
      modeAdmin: false
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
    },
    changeModeAdmin() {
      this.$root.$data.changeMode();
      console.log(this.$root.$data.modeAdmin);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
