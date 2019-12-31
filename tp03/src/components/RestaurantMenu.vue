<template>
  <div>
    <!-- PREMIER MENU -->
    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Menu {{ cuisine }}</span>
      </md-toolbar>
      <md-list class="md-double-line">
        <md-subheader>Hors d'oeuvres</md-subheader>

        <md-list-item v-for="(m, index) in menus[0].horsdoeuvres" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">restaurant</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Plat</md-subheader>
        <md-list-item v-for="(m, index) in menus[0].plats" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">restaurant_menu</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Dessert</md-subheader>
        <md-list-item v-for="(m, index) in menus[0].desserts" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">ac_unit</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Prix total</md-subheader>
        {{ getMenuPrice(menus[0]) }}
      </md-list>
    </div>
    <!-- DEUXIEME MENU -->
    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Menu Gourmet</span>
      </md-toolbar>
      <md-list class="md-double-line">
        <md-subheader>Hors d'oeuvres</md-subheader>

        <md-list-item v-for="(m, index) in menus[1].horsdoeuvres" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">restaurant</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Plat</md-subheader>
        <md-list-item v-for="(m, index) in menus[1].plats" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">restaurant_menu</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Dessert</md-subheader>
        <md-list-item v-for="(m, index) in menus[1].desserts" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">ac_unit</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Prix total</md-subheader>
        {{ getMenuPrice(menus[1]) }}
      </md-list>
    </div>
    <!-- DEUXIEME MENU -->
    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Menu Alternatif</span>
      </md-toolbar>
      <md-list class="md-double-line">
        <md-subheader>Hors d'oeuvres</md-subheader>

        <md-list-item v-for="(m, index) in menus[2].horsdoeuvres" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">restaurant</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Plat</md-subheader>
        <md-list-item v-for="(m, index) in menus[2].plats" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">restaurant_menu</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Dessert</md-subheader>
        <md-list-item v-for="(m, index) in menus[2].desserts" :key="`${index}-${m[0]}`">
          <md-icon class="md-primary">ac_unit</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>

          <md-button class="md-icon-button md-list-action">{{ m[4] }}</md-button>
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Prix total</md-subheader>
        {{ getMenuPrice(menus[2]) }}
      </md-list>
    </div>
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
        let randNum = this.shuffle([...Array(arrLen).keys()]);
        let hd = [...randNum.slice(0, 3)].map(
          i => obj.horsdoeuvres[randNum[i]]
        );
        let plats = [...randNum.slice(0, 3)].map(i => obj.plats[randNum[i]]);
        let desserts = [...randNum.slice(0, 3)].map(
          i => obj.desserts[randNum[i]]
        );
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
      return (total - (total * 10) / 100).toFixed(2) + "€";
    },
    shuffle(tab) {
      for (let i = 0; i < tab.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (tab.length - i));
        [tab[i], tab[j]] = [tab[j], tab[i]];
      }
      return tab;
    }
  }
};
</script>

<style scoped>
.viewport {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  margin-right: 2%;
}
</style>
