<template>
  <div>
    <md-table md-card :key="componentKey">
      <md-table-toolbar>
        <h1 class="md-title">Hors d'oeuvres</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head v-show="modeAdmin"></md-table-head>
      </md-table-row>
      <md-table-row v-for="(p, index) in randomPlats.horsdoeuvres" :key="index">
        <md-table-cell md-label="Nom">{{ p[0] }}</md-table-cell>
        <md-table-cell md-label="Prix">{{ p[4] }}</md-table-cell>
        <md-table-cell>{{ p[2] }}</md-table-cell>
        <md-table-cell>
          <img width="200" heigh="100" :src="createURL(p[3])" />
        </md-table-cell>
        <md-table-cell>
          <md-button @click="addPlatToCart(p, index)">
            <md-icon>shopping_cart</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-show="modeAdmin">
          <md-button @click="deletePlat(0, index)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <br />
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Plats</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head v-show="modeAdmin"></md-table-head>
      </md-table-row>
      <md-table-row v-for="(p, index) in randomPlats.plats" :key="index">
        <md-table-cell>{{ p[0] }}</md-table-cell>
        <md-table-cell>{{ p[4] }}</md-table-cell>
        <md-table-cell>{{ p[2] }}</md-table-cell>
        <md-table-cell>
          <img width="200" heigh="100" :src="createURL(p[3])" />
        </md-table-cell>
        <md-table-cell>
          <md-button @click="addPlatToCart(p, index)">
            <md-icon>shopping_cart</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-show="modeAdmin">
          <md-button @click="deletePlat(1, index)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <br />
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Desserts</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
        <md-table-head></md-table-head>
        <md-table-head v-show="modeAdmin"></md-table-head>
      </md-table-row>
      <md-table-row v-for="(p, index) in randomPlats.desserts" :key="index">
        <md-table-cell>{{ p[0] }}</md-table-cell>
        <md-table-cell>{{ p[4] }}</md-table-cell>
        <md-table-cell>{{ p[2] }}</md-table-cell>
        <md-table-cell>
          <img width="200" heigh="100" :src="createURL(p[3])" />
        </md-table-cell>
        <md-table-cell>
          <md-button @click="addPlatToCart(p), showSnackbar=true">
            <md-icon>shopping_cart</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-show="modeAdmin">
          <md-button @click="deletePlat(2, index)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-snackbar
      :md-position="position"
      :md-duration="duration"
      :md-active.sync="showSnackbar"
      v-model="showSnackbar"
    >
      <span>Plat ajouté au panier</span>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: "restaurant-plats",
  components: {},
  props: {
    randomPlats: Object
  },
  computed: {
    mode() {
      return this.$root.$data.getMode();
    }
  },
  watch: {
    cart: {
      immediate: true,
      handler() {
        this.toCart = [];
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
      toCart: [],
      showSnackbar: false,
      position: "center",
      duration: 4000,
      modeAdmin: false,
      componentKey: 0
    };
  },
  methods: {
    createURL(num) {
      return `https://www.restaurants.christramier.fr/resources/${num}.jpg`;
    },
    addPlatToCart(p) {
      this.toCart.push(p);
      console.log(this.toCart);
      console.log("adding plat to cart");
      this.$emit("updateCart", this.toCart);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    deletePlat(n, index) {
      switch (n) {
        case 0:
          this.randomPlats.horsdoeuvres.splice(index, 1);
          break;
        case 1:
          this.randomPlats.plats.splice(index, 1);
          break;
        case 2:
          this.randomPlats.desserts.splice(index, 1);
          break;
      }
      this.forceRerender();
    }
  }
};
</script>