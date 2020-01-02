<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Hors d'oeuvres</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Prix</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Photo</md-table-head>
        <md-table-head></md-table-head>
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
      </md-table-row>
      <md-table-row v-for="(p, index) in randomPlats.desserts" :key="index">
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
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "restaurant-plats",
  props: {
    randomPlats: Object
  },
  data() {
    return {};
  },
  methods: {
    createURL(num) {
      return `https://www.restaurants.christramier.fr/resources/${num}.jpg`;
    },
    addPlatToCart() {
      console.log("adding plat to cart");
    }
  }
};
</script>