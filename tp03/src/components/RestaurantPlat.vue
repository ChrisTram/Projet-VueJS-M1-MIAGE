<template>
  <div>
    <h1>{{ cuisine }}</h1>
    <h1>HORS D'OEUVRES</h1>
    <table style="margin-left:auto;margin-right:auto;">
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Description</th>
        <th>Photo</th>
      </tr>
      <tbody>
        <tr v-for="(p, index) in randomPlats.horsdoeuvres" :key="index">
          <td>{{ p[0] }}</td>
          <td>{{ p[4] }}</td>
          <td>{{ p[2] }}</td>
          <td>
            <img :src="createURL(p[3])" />
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <h1>PLATS</h1>
    <table style="margin-left:auto;margin-right:auto;">
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Description</th>
        <th>Photo</th>
      </tr>
      <tbody>
        <tr v-for="(p, index) in randomPlats.plats" :key="index">
          <td>{{ p[0] }}</td>
          <td>{{ p[4] }}</td>
          <td>{{ p[2] }}</td>
          <td>
            <img :src="createURL(p[3])" />
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <h1>DESSERTS</h1>
    <table style="margin-left:auto;margin-right:auto;">
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Description</th>
        <th>Photo</th>
      </tr>
      <tbody>
        <tr v-for="(p, index) in randomPlats.desserts" :key="index">
          <td>{{ p[0] }}</td>
          <td>{{ p[4] }}</td>
          <td>{{ p[2] }}</td>
          <td>
            <img :src="createURL(p[3])" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import data from "@/data/plats";
export default {
  name: "restaurant-plat",
  components: {},
  props: {
    cuisine: String
  },
  watch: {
    plats: {
      immediate: true,
      handler() {
        this.plats = this.data.data;
        this.randomPlats = this.selectRandomPlats(this.plats);
      }
    }
  },
  data() {
    return {
      data,
      plats: {},
      randomPlats: {},
      menus: {}
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE PLAT!");
  },
  methods: {
    createMenus() {},
    selectRandomPlats(tab) {
      let shuffledPlats = this.shuffle(tab);
      let randomPlats = {
        horsdoeuvres: [],
        plats: [],
        desserts: []
      };
      for (let i = 0; i < shuffledPlats.length; i++) {
        console.log(shuffledPlats[i]);
        if (
          randomPlats.horsdoeuvres.length >= 10 &&
          randomPlats.plats.length >= 10 &&
          randomPlats.desserts.length >= 10
        )
          break;
        if (
          shuffledPlats[i][1] == "hors d'oeuvre" &&
          randomPlats.horsdoeuvres.length < 10
        )
          randomPlats.horsdoeuvres.push(shuffledPlats[i]);
        else if (shuffledPlats[i][1] == "plat" && randomPlats.plats.length < 10)
          randomPlats.plats.push(shuffledPlats[i]);
        else if (randomPlats.desserts.length < 10)
          randomPlats.desserts.push(shuffledPlats[i]);
      }
      console.log(randomPlats);
      this.associateRandPhotoNumber(randomPlats);
      return randomPlats;
    },
    shuffle(tab) {
      for (let i = 0; i < tab.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (tab.length - i));
        let temp = tab[j];
        tab[j] = tab[i];
        tab[i] = temp;
      }
      return tab;
    },
    createURL(num) {
      return `https://www.restaurants.christramier.fr/resources/${num}.jpg`;
    },
    associateRandPhotoNumber(obj) {
      let randHD = this.shuffle(Array.from(Array(10), (e, i) => i + 1));
      let randPlats = this.shuffle(Array.from(Array(10), (e, i) => i + 11));
      let randDesserts = this.shuffle(Array.from(Array(10), (e, i) => i + 21));
      for (let i = 0; i < randHD.length; i++) {
        obj.horsdoeuvres[i][3] = randHD[i];
      }
      for (let i = 0; i < randPlats.length; i++) {
        obj.plats[i][3] = randPlats[i];
      }
      for (let i = 0; i < randDesserts.length; i++) {
        obj.desserts[i][3] = randDesserts[i];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
