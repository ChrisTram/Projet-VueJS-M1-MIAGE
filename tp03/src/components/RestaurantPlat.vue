<template>
  <div>
    <h2 @click="toggleMenu = !toggleMenu">Nos Menus</h2>
    <restaurant-menu v-show="toggleMenu" :plats="randomPlats" :cuisine="cuisine"></restaurant-menu>
    <h2 @click="togglePlats = !togglePlats">Carte</h2>
    <restaurant-plats v-show="togglePlats" :randomPlats="randomPlats"></restaurant-plats>
  </div>
</template>


<script>
import data from "@/data/plats";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantPlats from "./RestaurantPlats";
export default {
  name: "restaurant-plat",
  components: {
    RestaurantMenu,
    RestaurantPlats
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
      menus: [],
      toggleMenu: false,
      togglePlats: false
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
