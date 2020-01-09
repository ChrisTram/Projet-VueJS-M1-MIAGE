<template>
  <div>
    <md-badge :md-content="choiceNb" md-position="bottom">
      <md-button class="md-raised md-primary" @click="showNavigation = true">
        <md-icon>shopping_cart</md-icon>
      </md-button>
    </md-badge>

    <div>
      <md-button
        class="md-raised md-primary"
        @click="
          toggleMenu = !toggleMenu;
          togglePlats = false;
        "
        >Nos Menus</md-button
      >
      <md-button
        class="md-raised md-primary"
        @click="
          togglePlats = !togglePlats;
          toggleMenu = false;
        "
        >A la Carte</md-button
      >
      <restaurant-menu
        v-show="toggleMenu & !togglePlats"
        :plats="randomPlats"
        :cuisine="cuisine"
        @updateCart="updateCartFromMenu"
        @incBadge="increaseBadge"
        ref="menu"
      ></restaurant-menu>
    </div>

    <restaurant-plats
      v-show="togglePlats & !toggleMenu"
      :randomPlats="randomPlats"
      @updateCart="updateCartFromPlat"
      @incBadge="increaseBadge"
      @addPlatToMenus="addPlatToMenu"
      @delPlat="deletePlat"
      ref="plat"
    ></restaurant-plats>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <restaurant-panier
        @decBadge="decreaseBadge"
        @resetBadge="resetBadgeToZero"
        @updateCartMenus="updateCartFromMenu"
        @updateCartPlats="updateCartFromPlat"
        @delCart="deleteCart"
        ref="panier"
      ></restaurant-panier>
    </md-drawer>
  </div>
</template>

<script>
import data from "@/data/plats";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantPlats from "./RestaurantPlats";
import RestaurantPanier from "./RestaurantPanier";

export default {
  name: "restaurant-plat",
  components: {
    RestaurantMenu,
    RestaurantPlats,
    RestaurantPanier
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
      toggleMenu: true,
      togglePlats: false,
      choiceNb: 0,
      toCart: [],
      showNavigation: false
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
    },
    updateCartFromMenu(value) {
      this.toCart = value;
      this.$refs.panier.updateCartMenus(value);
    },
    updateCartFromPlat(value) {
      this.toCart = value;
      this.$refs.panier.updateCartPlats(value);
    },
    resetBadgeToZero() {
      this.choiceNb = 0;
    },
    decreaseBadge() {
      this.choiceNb--;
    },
    increaseBadge() {
      this.choiceNb++;
    },
    deleteCart() {
      this.toCart = [];
      this.$refs.plat.deleteCart();
      this.$refs.menu.deleteCart();
    },
    addPlatToMenu(obj) {
      console.log("plat " + obj.plat);
      console.log("branche : " + obj.num);
      switch (obj.num) {
        case 0:
          this.randomPlats.horsdoeuvres.push(obj.plat);
          break;
        case 1:
          this.randomPlats.plats.push(obj.plat);
          break;
        case 2:
          this.randomPlats.desserts.push(obj.plat);
          break;
      }
    },
    deletePlat(obj) {
      switch (obj.num) {
        case 0:
          this.randomPlats.horsdoeuvres.splice(obj.index, 1);
          break;
        case 1:
          this.randomPlats.plats.splice(obj.index, 1);
          break;
        case 2:
          this.randomPlats.desserts.splice(obj.index, 1);
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
