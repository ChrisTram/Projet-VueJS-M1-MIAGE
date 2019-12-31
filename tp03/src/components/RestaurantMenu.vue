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
    }
  }
};
</script>