<template>
  <div>
    <md-table md-card :key="componentKey">
      <md-table-toolbar>
        <h1 class="md-title">Hors d'oeuvres</h1>
        <md-dialog :md-active.sync="activeHD" ref="dialogForm">
          <md-dialog-title>Ajouter un hors d'oeuvre</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Nom</label>
              <md-input v-model="form.nom" required></md-input>
            </md-field>
            <md-field>
              <label>Prix</label>
              <span class="md-prefix">€</span>
              <md-input v-model="form.prix" type="float" required></md-input>
            </md-field>
            <md-field>
              <label>Description</label>
              <md-textarea v-model="form.description"></md-textarea>
            </md-field>
            <md-field>
              <label>URL Image</label>
              <md-input v-model="form.url"></md-input>
            </md-field>
            <md-dialog-actions class="md-align-center">
              <md-button
                class="md-primary md-raised"
                @click="closeForm(), addPlat(0)"
                >Soumettre</md-button
              >
            </md-dialog-actions>
          </md-dialog-content>
        </md-dialog>

        <md-button
          class="md-primary md-raised"
          v-show="modeAdmin"
          @click="resetForm(), (activeHD = true)"
        >
          <md-icon>add_circle_outline</md-icon>&nbsp;Ajouter un hors d'oeuvre
        </md-button>
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
            <md-icon style="color:blue">add_shopping_cart</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-show="modeAdmin">
          <md-button @click="deletePlat(0, index)">
            <md-icon style="color:red">remove_circle_outline</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <br />
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Plats</h1>
        <md-dialog :md-active.sync="activePlat" ref="dialogForm2">
          <md-dialog-title>Ajouter un plat</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Nom</label>
              <md-input v-model="form.nom" required></md-input>
            </md-field>
            <md-field>
              <label>Prix</label>
              <span class="md-prefix">€</span>
              <md-input v-model="form.prix" type="float" required></md-input>
            </md-field>
            <md-field>
              <label>Description</label>
              <md-textarea v-model="form.description"></md-textarea>
            </md-field>
            <md-field>
              <label>URL Image</label>
              <md-input v-model="form.url"></md-input>
            </md-field>
            <md-dialog-actions class="md-align-center">
              <md-button
                class="md-primary md-raised"
                @click="closeForm(), addPlat(1)"
                >Soumettre</md-button
              >
            </md-dialog-actions>
          </md-dialog-content>
        </md-dialog>
        <md-button
          class="md-primary md-raised"
          v-show="modeAdmin"
          @click="resetForm(), (activePlat = true)"
        >
          <md-icon>add_circle_outline</md-icon>&nbsp;Ajouter un plat
        </md-button>
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
            <md-icon style="color:blue">add_shopping_cart</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-show="modeAdmin">
          <md-button @click="deletePlat(1, index)">
            <md-icon style="color:red">remove_circle_outline</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <br />
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Desserts</h1>
        <md-dialog :md-active.sync="activeDessert" ref="dialogForm">
          <md-dialog-title>Ajouter un dessert</md-dialog-title>
          <md-dialog-content>
            <md-field>
              <label>Nom</label>
              <md-input v-model="form.nom" required></md-input>
            </md-field>
            <md-field>
              <label>Prix</label>
              <span class="md-prefix">€</span>
              <md-input v-model="form.prix" type="float" required></md-input>
            </md-field>
            <md-field>
              <label>Description</label>
              <md-textarea v-model="form.description"></md-textarea>
            </md-field>
            <md-field>
              <label>URL Image</label>
              <md-input v-model="form.url"></md-input>
            </md-field>
            <md-dialog-actions class="md-align-center">
              <md-button
                class="md-primary md-raised"
                @click="closeForm(), addPlat(2)"
                >Soumettre</md-button
              >
            </md-dialog-actions>
          </md-dialog-content>
        </md-dialog>
        <md-button
          class="md-primary md-raised"
          v-show="modeAdmin"
          @click="resetForm(), (activeDessert = true)"
        >
          <md-icon>add_circle_outline</md-icon>&nbsp;Ajouter un dessert
        </md-button>
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
          <md-button @click="addPlatToCart(p), (showSnackbar = true)">
            <md-icon style="color:blue">add_shopping_cart</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell v-show="modeAdmin">
          <md-button @click="deletePlat(2, index)">
            <md-icon style="color:red">remove_circle_outline</md-icon>
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
      componentKey: 0,
      activeHD: false,
      activePlat: false,
      activeDessert: false,
      form: { nom: "", description: "", prix: 0.0, url: "", type: "" }
    };
  },
  methods: {
    createURL(num) {
      if (!isNaN(num))
        return `https://www.restaurants.christramier.fr/resources/${num}.jpg`;
      return num;
    },
    addPlatToCart(p) {
      this.toCart.push(p);
      this.$emit("updateCart", this.toCart);
      this.$emit("incBadge", null);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    deletePlat(n, index) {
      let objPlat = { index: index, num: n };
      this.$emit("delPlat", objPlat);
      this.forceRerender();
    },
    addPlat(n) {
      this.form.prix = this.form.prix.toString().replace(".", ",");
      let plat = [];
      switch (n) {
        case 0:
          plat = [
            this.form.nom,
            "hors d'oeuvre",
            this.form.description,
            this.form.url,
            this.form.prix + "€"
          ];
          this.addPlatToMenus(plat, 0);
          break;
        case 1:
          plat = [
            this.form.nom,
            "plat",
            this.form.description,
            this.form.url,
            this.form.prix + "€"
          ];
          this.addPlatToMenus(plat, 1);
          break;
        case 2:
          plat = [
            this.form.nom,
            "dessert",
            this.form.description,
            this.form.url,
            this.form.prix + "€"
          ];
          this.addPlatToMenus(plat, 2);
          break;
      }
      this.resetForm();
      this.forceRerender();
    },
    closeForm() {
      this.activeHD = false;
      this.activePlat = false;
      this.activeDessert = false;
    },
    resetForm() {
      this.form = { nom: "", description: "", prix: 0.0, url: "", type: "" };
    },
    deleteCart() {
      this.toCart = [];
    },
    addPlatToMenus(plat, n) {
      let objPlat = { num: n, plat: plat };
      this.$emit("addPlatToMenus", objPlat);
    }
  }
};
</script>
<style>
.md-table-head {
  text-align: center;
}
</style>
