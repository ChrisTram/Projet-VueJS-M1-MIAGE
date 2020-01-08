<template>
  <div :key="componentKey">
    <div
      v-for="(menu, index) in menus"
      :key="`${index}-${menu[0]}`"
      class="viewport md-elevation-9"
    >
      <md-toolbar :md-elevation="1">
        <span class="md-title">Menu {{ cuisines[index] }}</span>
      </md-toolbar>
      <md-list class="md-double-line">
        <md-subheader>Hors d'oeuvres</md-subheader>

        <md-list-item v-for="(m, i) in menu.horsdoeuvres" :key="`${i}-${m[0]}`">
          <md-icon class="md-primary">restaurant</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>
          <input
            type="radio"
            :id="`${index}${i}`"
            :value="`${index}${i}`"
            v-model="checked.horsdoeuvres"
            @change="checking(`${index}${i}`)"
          />
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Plat</md-subheader>
        <md-list-item v-for="(m, i) in menu.plats" :key="`${i}-${m[0]}`">
          <md-icon class="md-primary">restaurant_menu</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>
          <input
            type="radio"
            :id="`${index}${i}`"
            :value="`${index}${i}`"
            v-model="checked.plats"
            @change="checking(`${index}${i}`)"
          />
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Dessert</md-subheader>
        <md-list-item v-for="(m, i) in menu.desserts" :key="`${i}-${m[0]}`">
          <md-icon class="md-primary">ac_unit</md-icon>

          <div class="md-list-item-text">
            <span>{{ m[0] }}</span>
            <span>Délicieux !</span>
          </div>
          <input
            type="radio"
            :id="`${index}${i}`"
            :value="`${index}${i}`"
            v-model="checked.desserts"
            @change="checking(`${index}${i}`)"
          />
        </md-list-item>
        <md-divider></md-divider>
        <md-subheader>Prix total</md-subheader>
        {{ getMenuPrice(menu) + "€"}}
        <md-button @click="addMenuToCart(menu, index)">
          <md-icon style="color:blue">add_shopping_cart</md-icon>
        </md-button>
        <md-content>
          <md-dialog :md-active.sync="activeMenu" ref="dialogForm">
            <md-dialog-title>Ajouter un menu</md-dialog-title>
            <md-dialog-content>
              <label for="hd">Choix des hors d'oeuvres</label>
              <md-select v-model="newMenu.horsdoeuvres" name="hd" id="hd" multiple>
                <md-option
                  v-for="(item, i) in listPlats.horsdoeuvres"
                  :value="item"
                  :key="i"
                >{{item[0]}}</md-option>
              </md-select>
              <label for="pl">Choix des plats</label>
              <md-select v-model="newMenu.plats" name="pl" id="pl" multiple>
                <md-option v-for="(item, i) in listPlats.plats" :value="item" :key="i">{{item[0]}}</md-option>
              </md-select>
              <label for="ds">Choix des desserts</label>
              <md-select v-model="newMenu.desserts" name="ds" id="ds" multiple>
                <md-option
                  v-for="(item, i) in listPlats.desserts"
                  :value="item"
                  :key="i"
                >{{item[0]}}</md-option>
              </md-select>
              <md-dialog-actions class="md-align-center">
                <md-button class="md-primary md-raised" @click="closeForm(), addMenu()">Soumettre</md-button>
              </md-dialog-actions>
            </md-dialog-content>
          </md-dialog>
          <md-button class="md-primary" v-show="modeAdmin" @click="activeMenu=true">
            Ajouter menu
            <md-icon>add_circle_outline</md-icon>
          </md-button>
        </md-content>
        <md-content>
          <md-button class="md-primary" v-show="modeAdmin" @click="deleteMenu(index)">
            Supprimer menu
            <md-icon style="color:red">remove_circle_outline</md-icon>
          </md-button>
        </md-content>
      </md-list>
      <md-snackbar
        :md-position="position"
        :md-duration="duration"
        :md-active.sync="showSnackbar"
        v-model="showSnackbar"
      >
        <span>Menu ajouté au panier</span>
      </md-snackbar>
    </div>
  </div>
</template>


<script>
export default {
  name: "restaurant-menu",
  components: {},
  props: {
    plats: Object,
    cuisine: String
  },
  computed: {
    mode() {
      return this.$root.$data.getMode();
    }
  },
  watch: {
    plats: {
      immediate: true,
      handler() {
        this.toCart = [];
        this.menus = this.createMenus(this.plats, 3);
        this.cuisines = [this.cuisine, "Authentique", "Classique"];
        this.listPlats = {
          horsdoeuvres: [...this.plats.horsdoeuvres],
          plats: [...this.plats.plats],
          desserts: [...this.plats.desserts]
        };
      }
    },
    mode: {
      immediate: true,
      handler() {
        this.modeAdmin = this.$root.$data.getMode();
        this.forceRerender();
      }
    }
  },
  data() {
    return {
      value: "",
      cuisines: [],
      toCart: [],
      checked: { horsdoeuvres: [], plats: [], desserts: [] },
      showSnackbar: false,
      position: "center",
      duration: 4000,
      modeAdmin: this.$root.$data.getMode(),
      componentKey: 0,
      listPlats: {},
      newMenu: { horsdoeuvres: {}, plats: {}, desserts: {} },
      activeMenu: false
    };
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
      let total = (totalHD + totalPlats + totalDesserts) / 3;
      return (total - (total * 10) / 100).toFixed(2);
    },
    shuffle(tab) {
      for (let i = 0; i < tab.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (tab.length - i));
        [tab[i], tab[j]] = [tab[j], tab[i]];
      }
      return tab;
    },
    checking() {
      /* console.log(this.checked);
      if (this.checked.horsdoeuvres.length & this.checked.desserts.length)
        if (this.checked.horsdoeuvres[0] != this.checked.desserts[0]) {
          this.checked = { horsdoeuvres: [], plats: [], desserts: [] };
        }
      if (this.checked.horsdoeuvres.length & this.checked.plats.length)
        if (this.checked.horsdoeuvres[0] != this.checked.plats[0]) {
          this.checked = { horsdoeuvres: [], plats: [], desserts: [] };
        }
      if (this.checked.desserts.length & this.checked.plats.length)
        if (this.checked.desserts[0] != this.checked.plats[0]) {
          this.checked = { horsdoeuvres: [], plats: [], desserts: [] };
        } */
    },
    addMenuToCart(menu, index) {
      console.log("adding to cart");
      console.log(this.checked.horsdoeuvres);
      console.log(this.checked.desserts);
      console.log(this.checked.plats);
      if (
        this.checked.horsdoeuvres.length &&
        this.checked.plats.length &&
        this.checked.desserts.length
      ) {
        if (
          this.checked.horsdoeuvres[0] == this.checked.plats[0] &&
          this.checked.desserts[0] == this.checked.plats[0]
        ) {
          let addedMenuToCart = {
            name: this.cuisines[index],
            horsdoeuvre: [menu.horsdoeuvres[this.checked.horsdoeuvres[1]]],
            dessert: [menu.desserts[this.checked.desserts[1]]],
            plat: [menu.plats[this.checked.plats[1]]],
            prix: parseFloat(this.getMenuPrice(menu))
          };
          this.toCart.push(addedMenuToCart);
          console.log("On emit depuis depuis menu :");
          console.log(this.toCart);

          this.$emit("updateCart", this.toCart);
          this.$emit("incBadge", null);
          this.showS();
        }
      }
    },
    showS() {
      this.showSnackbar = !this.showSnackbar;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    deleteMenu(index) {
      this.menus.splice(index, 1);
      this.forceRerender();
    },
    deleteCart() {
      this.toCart = [];
      console.log("resetCartMenu " + this.toCart);
    },
    addMenu() {
      console.log(this.newMenu);
      this.menus.push(this.newMenu);
      this.newMenu = { horsdoeuvres: {}, plats: {}, desserts: {} };
      this.forceRerender();
    },
    closeForm() {
      this.activeMenu = false;
      this.forceRerender();
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
  margin-bottom: 20px;
}
</style>
