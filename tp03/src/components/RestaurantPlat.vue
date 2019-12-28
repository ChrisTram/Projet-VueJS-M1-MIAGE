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
import data from "../../data/plats";
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
          randomPlats.plats.length >= 15 &&
          randomPlats.desserts.length >= 5
        )
          break;
        if (
          shuffledPlats[i][1] == "hors d'oeuvre" &&
          randomPlats.horsdoeuvres.length < 10
        )
          randomPlats.horsdoeuvres.push(shuffledPlats[i]);
        else if (shuffledPlats[i][1] == "plat" && randomPlats.plats.length < 15)
          randomPlats.plats.push(shuffledPlats[i]);
        else if (randomPlats.desserts.length < 5)
          randomPlats.desserts.push(shuffledPlats[i]);
      }
      console.log(randomPlats);
      return randomPlats;
    },
    shuffle(tab) {
      for (var i = 0; i < tab.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (tab.length - i));
        var temp = tab[j];
        tab[j] = tab[i];
        tab[i] = temp;
      }
      return tab;
    },
    createURL(num) {
      return `https://baconmockup.com/${num}/200/`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
