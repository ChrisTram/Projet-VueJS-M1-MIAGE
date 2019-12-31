<template>
  <div>
    <h1>Menu {{ cuisine }}</h1>
    <table style="margin-left:auto;margin-right:auto;">
      <tr></tr>
      <tbody>
        <tr>
          <b>Hors d'Oeuvres</b>
        </tr>
        <tr v-for="(m, index) in menus[0].horsdoeuvres" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
        <tr>
          <b>Plats</b>
        </tr>
        <tr v-for="(m, index) in menus[0].plats" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
        <tr>
          <b>Desserts</b>
        </tr>
        <tr v-for="(m, index) in menus[0].desserts" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <h1>
      <b>Menu Classique</b>
    </h1>
    <table style="margin-left:auto;margin-right:auto;">
      <tr></tr>
      <tbody>
        <tr>
          <b>Hors d'Oeuvres</b>
        </tr>
        <tr v-for="(m, index) in menus[1].horsdoeuvres" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
        <tr>
          <b>Plats</b>
        </tr>
        <tr v-for="(m, index) in menus[1].plats" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
        <tr>
          <b>Desserts</b>
        </tr>
        <tr v-for="(m, index) in menus[1].desserts" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <h1>Menu Alternatif</h1>
    <table style="margin-left:auto;margin-right:auto;">
      <tr></tr>
      <tbody>
        <tr>
          <b>Hors d'Oeuvres</b>
        </tr>
        <tr v-for="(m, index) in menus[2].horsdoeuvres" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
        <tr>
          <b>Plats</b>
        </tr>
        <tr v-for="(m, index) in menus[2].plats" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
        <tr>
          <b>Desserts</b>
        </tr>
        <tr v-for="(m, index) in menus[2].desserts" :key="`${index}-${m[0]}`">
          <td>{{ m[0] }}</td>
          <td>{{ m[4] }}</td>
        </tr>
      </tbody>
    </table>
    <br />
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
            <img width="400" heigh="200" :src="createURL(p[3])" />
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
            <img width="400" heigh="200" :src="createURL(p[3])" />
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
            <img width="400" heigh="200" :src="createURL(p[3])" />
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
        this.randomPlats = this.selectRandomPlats(this.plats, 10);
        this.associateRandPhotoNumber(this.randomPlats, 10);
        this.menus = this.createMenus(this.randomPlats, 3);
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
    createMenus(obj, n) {
      let menus = [];
      for (let i = 0; i < n; i++) {
        let menu = { horsdoeuvres: {}, plats: {}, desserts: {} };
        let arrLen = obj.horsdoeuvres.length;
        let randNum = Array.from(Array(arrLen), (e, i) => i).slice(0, 3);
        let hd = [...randNum].map(i => obj.horsdoeuvres[randNum[i]]);
        let plats = [...randNum].map(i => obj.plats[randNum[i]]);
        let desserts = [...randNum].map(i => obj.desserts[randNum[i]]);
        menu.horsdoeuvres = hd;
        menu.plats = plats;
        menu.desserts = desserts;
        menus.push(menu);
      }
      console.log(menus);
      return menus;
    },
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
