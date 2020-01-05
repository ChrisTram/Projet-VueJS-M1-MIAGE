<template>
  <div>
    <div v-if="typeof this.toCart !== 'undefined'">
      <h1>Panier</h1>
      <div
        v-for="(menu, index) in toCart.menus"
        :key="`${index}-${menu[0]}`"
        class="viewport md-elevation-9"
      >
        <md-toolbar :md-elevation="1">
          <span class="md-title">Menu</span>
        </md-toolbar>
        <md-list class="md-double-line">
          <md-subheader>Hors d'oeuvres</md-subheader>

          <md-list-item>
            <md-icon class="md-primary">restaurant</md-icon>

            <div class="md-list-item-text">
              <span>{{ menu.horsdoeuvre[0][0] }}</span>
              <span>Délicieux !</span>
            </div>
          </md-list-item>

          <md-divider></md-divider>
          <md-subheader>Plat</md-subheader>
          <md-list-item>
            <md-icon class="md-primary">restaurant_menu</md-icon>

            <div class="md-list-item-text">
              <span>{{ menu.plat[0][0] }}</span>
              <span>Délicieux !</span>
            </div>
          </md-list-item>
          <md-divider></md-divider>
          <md-subheader>Dessert</md-subheader>
          <md-list-item>
            <md-icon class="md-primary">ac_unit</md-icon>

            <div class="md-list-item-text">
              <span>{{ menu.dessert[0][0] }}</span>
              <span>Délicieux !</span>
            </div>
          </md-list-item>
          <md-divider></md-divider>
          <md-subheader>Prix total</md-subheader>
          {{ menu.prix + "€"}}
        </md-list>
      </div>
      <div
        v-for="(plat, index) in toCart.plats"
        :key="`${index}-${plat[0]}`"
        class="viewport md-elevation-9"
      >
        <md-toolbar :md-elevation="1">
          <span class="md-title">Plat</span>
        </md-toolbar>
        <md-list class="md-double-line">
          <md-subheader>A la carte</md-subheader>

          <md-list-item>
            <md-icon class="md-primary">restaurant</md-icon>

            <div class="md-list-item-text">
              <span>{{ plat[0] }}</span>
              <span>Délicieux !</span>
            </div>
          </md-list-item>

          <md-divider></md-divider>
          <md-subheader>Prix</md-subheader>

          <md-list-item>
            <md-icon class="md-primary">restaurant</md-icon>

            <div class="md-list-item-text">
              <span>{{ plat[4] }}</span>
            </div>
          </md-list-item>
        </md-list>
      </div>
      <md-content md-theme="selection-black">
        <p>Total : {{total | fixed}}€</p>
      </md-content>

      <md-button
        class="md-dense md-raised md-primary"
        @click="panierSnackbar=true, passOrder()"
        v-show="toCart.plats.length | toCart.menus.length"
      >Passer la commande</md-button>
      <md-snackbar
        :md-position="position"
        :md-duration="duration"
        :md-active.sync="panierSnackbar"
        v-model="panierSnackbar"
      >
        <span>Commande passée</span>
      </md-snackbar>
    </div>
  </div>
</template>
<script>
export default {
  nom: "restaurant-panier",

  props: {},
  watch: {
    total: {
      immediate: true,
      handler() {
        //this.toCartMenus = [];
      }
    }
  },
  data() {
    return {
      toCart: {
        plats: [],
        menus: [],
        totalPlats: 0,
        totalMenus: 0
      },
      total: 0,
      panierSnackbar: false,
      position: "center",
      duration: 4000
    };
  },
  methods: {
    calculTotal() {
      this.total = this.toCart.totalMenus + this.toCart.totalPlats;
    },
    updateCartMenus(value) {
      console.log("Update du panier");
      console.log(value);
      let totalMenus = value.reduce((a, b) => a + b.prix, 0);
      this.toCart.totalMenus = totalMenus;
      this.toCart.menus = value;
      this.calculTotal();
    },
    updateCartPlats(value) {
      console.log("Update du panier");
      let totalPlats = value.reduce(
        (a, b) => a + parseFloat(b[4].slice(0, -1).replace(",", ".")),
        0
      );
      this.toCart.totalPlats = totalPlats;
      console.log(totalPlats);
      this.toCart.plats = value;
      this.calculTotal();
    },
    passOrder() {
      this.toCart = {
        plats: [],
        menus: [],
        totalPlats: 0,
        totalMenus: 0
      };
      this.total = 0;
      this.$emit("resetBadge", null);
    }
  },
  filters: {
    fixed(value) {
      return value.toFixed(2);
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
