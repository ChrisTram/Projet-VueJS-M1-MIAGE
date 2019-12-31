<template>
  <div style="margin-left:auto;margin-right:auto; width:40%;">
    <h1>Menu {{ cuisine }}</h1>
    <md-table md-sort="name" md-sort-order="asc" md-card>
      <md-table-row></md-table-row>
      <tbody>
        <md-table-row>
          <b>Hors d'Oeuvres</b>
        </md-table-row>

        <md-table-row v-for="(m, index) in menus[0].horsdoeuvres" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Plats</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[0].plats" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Desserts</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[0].desserts" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Prix</b>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{ getMenuPrice(menus[0]) }}</md-table-cell>
        </md-table-row>
      </tbody>
    </md-table>
    <br />
    <h1>
      <b>Menu Classique</b>
    </h1>
    <md-table style="margin-left:auto;margin-right:auto;">
      <md-table-row></md-table-row>
      <tbody>
        <md-table-row>
          <b>Hors d'Oeuvres</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[1].horsdoeuvres" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Plats</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[1].plats" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Desserts</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[1].desserts" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Prix</b>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{ getMenuPrice(menus[1]) }}</md-table-cell>
        </md-table-row>
      </tbody>
    </md-table>
    <br />
    <h1>Menu Alternatif</h1>
    <md-table style="margin-left:auto;margin-right:auto;">
      <md-table-row></md-table-row>
      <tbody>
        <md-table-row>
          <b>Hors d'Oeuvres</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[2].horsdoeuvres" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Plats</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[2].plats" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Desserts</b>
        </md-table-row>
        <md-table-row v-for="(m, index) in menus[2].desserts" :key="`${index}-${m[0]}`">
          <md-table-cell>{{ m[0] }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <b>Prix</b>
        </md-table-row>
        <md-table-row>
          <md-table-cell>{{ getMenuPrice(menus[2]) }}</md-table-cell>
        </md-table-row>
      </tbody>
    </md-table>
  </div>
</template>


<script>
export default {
  name: "restaurant-menu",
  props: {
    plats: Object,
    cuisine: String
  },
  watch: {
    plats: {
      immediate: true,
      handler() {
        this.menus = this.createMenus(this.plats, 3);
      }
    }
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
      return menus;
    },
    getMenuPrice(menu) {
      let totalHD = menu.horsdoeuvres.reduce(
        (e, i) => e + parseFloat(i[4].slice(0, -1).replace(",", ".")),
        0
      );
      let totalPlats = menu.plats.reduce(
        (e, i) => e + parseFloat(i[4].slice(0, -1).replace(",", ".")),
        0
      );
      let totalDesserts = menu.desserts.reduce(
        (e, i) => e + parseFloat(i[4].slice(0, -1).replace(",", ".")),
        0
      );
      let total = totalHD + totalPlats + totalDesserts;
      return total - (total * 10) / 100 + "€";
    }
  }
};
</script>