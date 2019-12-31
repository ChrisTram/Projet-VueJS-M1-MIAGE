<template>
  <div>
    <restaurant-menu :plats="randomPlats" :cuisine="cuisine"></restaurant-menu>
    <br />
    <h1>{{ cuisine }}</h1>
    
    <md-table md-card>
            <md-table-toolbar>
        <h1 class="md-title">Hors d'oeuvres</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
      </md-table-row>
        <md-table-row v-for="(p, index) in randomPlats.horsdoeuvres" :key="index">
          <md-table-cell md-label="Nom">{{ p[0] }}</md-table-cell>
          <md-table-cell md-label="Prix">{{ p[4] }}</md-table-cell>
          <md-table-cell>{{ p[2] }}</md-table-cell>
          <md-table-cell>
            <img width="400" heigh="200" :src="createURL(p[3])" />
          </md-table-cell>
        </md-table-row>
    </md-table>

    <br />
    <md-table md-card>
            <md-table-toolbar>
        <h1 class="md-title">Plats</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
      </md-table-row>
        <md-table-row v-for="(p, index) in randomPlats.plats" :key="index">
          <md-table-cell>{{ p[0] }}</md-table-cell>
          <md-table-cell>{{ p[4] }}</md-table-cell>
          <md-table-cell>{{ p[2] }}</md-table-cell>
          <md-table-cell>
            <img width="400" heigh="200" :src="createURL(p[3])" />
          </md-table-cell>
        </md-table-row>
    </md-table>
    <br />
    <md-table md-card >
            <md-table-toolbar>
        <h1 class="md-title">Desserts</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
      </md-table-row>
        <md-table-row v-for="(p, index) in randomPlats.desserts" :key="index">
          <md-table-cell>{{ p[0] }}</md-table-cell>
          <md-table-cell>{{ p[4] }}</md-table-cell>
          <md-table-cell>{{ p[2] }}</md-table-cell>
          <md-table-cell>
            <img width="400" heigh="200" :src="createURL(p[3])" />
          </md-table-cell>
        </md-table-row>
    </md-table>
  </div>
</template>


<script>
import data from "@/data/plats";
import RestaurantMenu from "./RestaurantMenu";
export default {
  name: "restaurant-plat",
  components: {
    RestaurantMenu
  },
  props: {
    cuisine: String
  },
  watch: {
    plats: {
      immediate: true,
      handler() {
        this.plats = this.data.data;
        this.randomPlats = this.selectRandomPlats(this.plats, 10);
        this.associateRandPhotoNumber(this.randomPlats, 10);
      }
    }
  },
  data() {
    return {
      data,
      plats: {},
      randomPlats: {},
      menus: []
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE PLAT!");
  },
  methods: {
    selectRandomPlats(tab, n) {
      let shuffledPlats = this.shuffle(tab);
      let randomPlats = {
        horsdoeuvres: [],
        plats: [],
        desserts: []
      };
      for (let i = 0; i < shuffledPlats.length; i++) {
        if (
          randomPlats.horsdoeuvres.length >= n &&
          randomPlats.plats.length >= n &&
          randomPlats.desserts.length >= n
        )
          break;
        if (
          shuffledPlats[i][1] == "hors d'oeuvre" &&
          randomPlats.horsdoeuvres.length < n
        )
          randomPlats.horsdoeuvres.push(shuffledPlats[i]);
        else if (shuffledPlats[i][1] == "plat" && randomPlats.plats.length < n)
          randomPlats.plats.push(shuffledPlats[i]);
        else if (randomPlats.desserts.length < n)
          randomPlats.desserts.push(shuffledPlats[i]);
      }

      return randomPlats;
    },
    shuffle(tab) {
      for (let i = 0; i < tab.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (tab.length - i));
        [tab[i], tab[j]] = [tab[j], tab[i]];
      }
      return tab;
    },
    createURL(num) {
      return `https://www.restaurants.christramier.fr/resources/${num}.jpg`;
    },
    associateRandPhotoNumber(obj, n) {
      let randHD = this.shuffle(Array.from(Array(n), (e, i) => i + 1));
      let randPlats = this.shuffle(Array.from(Array(n), (e, i) => i + n + 1));
      let randDesserts = this.shuffle(
        Array.from(Array(n), (e, i) => i + 2 * n + 1)
      );
      for (let i = 0; i < n; i++) {
        obj.horsdoeuvres[i][3] = randHD[i];
        obj.plats[i][3] = randPlats[i];
        obj.desserts[i][3] = randDesserts[i];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
