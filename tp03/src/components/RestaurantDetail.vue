<template>
  <div>
    <h1>Detail du restaurant d'id = {{restaurant._id}}</h1>
    <div>
      <router-link :to="{name :'restaurantEvaluation', params:{evals:restaurant.grades}}">Evaluation</router-link>
    </div>
    <div>
      <router-link :to="{name :'restaurantMap', params:{coords:restaurant.address.coord}}">Map</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "restaurant-detail",
  props: {},
  watch: {
    restaurant: {
      immediate: true,
      handler() {
        this.coords = this.restaurant.address.coord;
        this.grades = this.restaurant.grades;
      }
    }
  },
  computed: {
    // computed data, permet de définir des data "calculées"
    restaurant() {
      return this.$route.params.restaurant;
    }
  },
  data() {
    return {
      coords: Array,
      grades: Array
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
