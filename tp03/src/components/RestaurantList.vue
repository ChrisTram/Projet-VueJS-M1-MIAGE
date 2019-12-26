
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <restaurant-detail />
    <table>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
      </tr>
      <tbody>
        <tr
          v-for="(r, index) in restaurants"
          v-on:click="supprimerRestaurant(index)"
          v-bind:style="{ backgroundColor: getColor(index) }"
          v-bind:class="{ bordureRouge: index === 2 }"
          v-bind:key="index"
        >
          <restaurant-evaluation :evals="r.grades" />
          <restaurant-map :coords="r.coord" />
        </tr>
      </tbody>
    </table>
    <!--
    <md-field md-clearable class="md-toolbar-section-end">
      <md-input
        placeholder="Search by name..."
        v-model="nomRecherche"
        @input="getDataFromServer()"
      />
    </md-field>

    <md-table-empty-state
      md-label="No users found"
      :md-description="`No user found for this '${nomRecherche}' query. Try a different search term or create a new user.`"
    ></md-table-empty-state>

    <md-table-row slot="md-table-row" slot-scope="{ item }">
      <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
      <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
      <md-table-cell md-label="Details">
        <router-link :to="'restaurant/'+item._id">Details</router-link>
      </md-table-cell>
    </md-table-row>
    -->
  </div>
</template>

<script>
import RestaurantMap from "";
import RestaurantDetail from "";
import RestaurantEvaluation from "";
export default {
  name: "restaurant-list",
  components: {
    RestaurantMap,
    RestaurantDetail,
    RestaurantEvaluation
  },
  props: {
    msg: String
  },
  computed: {},
  data: function() {
    return {
      coords: [],
      evals: [],
      restaurants: [],
      nbRestaurants: 0,
      nom: "",
      cuisine: "",
      apiBaseURL: "http://localhost:8081/api/restaurants",
      page: 0,
      pagesize: 10,
      nomRecherche: "",
      apiURL: "http://localhost:8081/api/restaurants"
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    this.getDataFromServer();
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer des
      // restaurants sur le serveur.
      let url =
        this.apiURL +
        "?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nomRecherche;

      fetch(url)
        .then(reponseJSON => {
          return reponseJSON.json();
        })
        .then(reponseJS => {
          // ici on a la réponse sous la forme
          // d'un objet JS
          this.restaurants = reponseJS.data;
          this.nbRestaurants = reponseJS.count;
          this.nbPagesDeResultats = Math.floor(
            this.nbRestaurants / this.pagesize
          );
        });
    },
    supprimerRestaurant(index) {
      this.restaurants.splice(index, 1);
    },
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();

      this.restaurants.push({
        nom: this.nom,
        cuisine: this.cuisine
      });
      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
    pageSuivante() {
      console.log("Page suivante");
      this.page++;
      this.getDataFromServer();
    },
    pagePrecedente() {
      console.log("Page precedente");
      this.page--;
      this.getDataFromServer();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>