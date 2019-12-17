<template>
<div>
  <div id="restaurants">
    <table>
        <tr>
            <th>Nom</th>
            <th>Cuisine </th>
        </tr>
        <tbody>
            <tr v-for="(r,index) in restaurants" v-on:click="supprimerRestaurant(index)" v-bind:style="{backgroundColor:getColor(index)}"
                v-bind:class="{bordureRouge:(index === 2)}"
                v-bind:key="index"
                >
                <td>{{r.name}}</td>
                <td> {{r.cuisine}}</td>
            </tr>
        </tbody>
    </table>
  </div>

  
  <div>
    <div>
      <small>Flat</small>
      <md-button>Default</md-button>
      <md-button :md-ripple="false">Ripple Off</md-button>
      <md-button class="md-primary">Primary</md-button>
      <md-button class="md-accent">Accent</md-button>
      <md-button disabled>Disabled</md-button>
    </div>

    <div>
      <small>Raised</small>
      <md-button class="md-raised">Default</md-button>
      <md-button class="md-raised" :md-ripple="false">Ripple Off</md-button>
      <md-button class="md-raised md-primary">Primary</md-button>
      <md-button class="md-raised md-accent">Accent</md-button>
      <md-button class="md-raised" disabled>Disabled</md-button>
    </div>

    <div>
      <small>Dense</small>
      <md-button class="md-dense md-primary">Flat</md-button>
      <md-button class="md-dense md-raised md-primary">Raised</md-button>
    </div>
  </div>
    </div>

</template>

<script>
import Restaurant from './components/HelloWorld.vue'

export default {
  name: 'Restaurant',
    data: {
            restaurants: [],
            nbRestaurants:0,
            nom: '',
            cuisine: '',
            apiBaseURL:"http://localhost:8080/api/restaurants",
            page:0,
            pagesize:10,
            nomRecherche:"",
            apiURL : "http://localhost:8080/api/restaurants"
        },
  props: {
    msg: String
  },
  
        mounted() {
            console.log("AVANT AFFICHAGE");
            this.getDataFromServer();
        },
        methods: {
            // async obligatoire si utilisation de await, pas la peine sinon
            async getDataFromServer() {
                // On va chercher les données sur le serveur
                /*
                fetch(this.apiBaseURL)
                .then(responseEnJson => {
                    console.log("J'ai eu une réponse JSON du serveur ");
                    return responseEnJson.json();
                }).then(reponseJS => {
                    //console.log(reponseJS.data[0].name);
                    // on initialise le modele des restaurants
                    // avec les data reçues
                    this.restaurants = reponseJS.data;
                }).catch(err => {
                    console.log(err.msg);
                });
                */

                // Avec await
                let url = this.apiBaseURL 
                + "?page=" + this.page
                + "&pagesize=" + this.pagesize
                + "&name=" + this.nomRecherche;

                try {
                    let reponseJSON = await fetch(url);
                    let reponseJS = await reponseJSON.json();
                    this.restaurants = reponseJS.data;
                    this.nbRestaurants = reponseJS.count;
                } catch(err) {
                    console.log("Erreur dans les fetchs GET " + err.msg);
                }  
            },
            async supprimerRestaurant(id) {
                try {
                    let reponseJSON = await fetch(this.apiBaseURL + "/" + id, {
                        method:"DELETE"
                    });
                    let reponseJS = await reponseJSON.json();
                    console.log("Restaurant supprime : " + reponseJS.msg);
                    this.getDataFromServer(); // on rafraichit l'affichage
                } catch(err) {
                    console.log("Erreur dans le fetchs DELETE " + err.msg);
                }
            },
            async ajouterRestaurant(event) {
                // eviter le comportement par defaut
                event.preventDefault();

                let donneesFormulaire = new FormData();
                donneesFormulaire.append("nom", this.nom);
                donneesFormulaire.append("cuisine", this.cuisine);

                let reponseJSON = await fetch(this.apiBaseURL, {
                    method:"POST",
                    body:donneesFormulaire
                })
                let reponseJS = await reponseJSON.json();
                console.log(reponseJS.msg);

                this.nom = "";
                this.cuisine = "";

                this.getDataFromServer(); // on rafraichit
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            },
            pageSuivante() {
                console.log("page suivante");
                this.page++;
                this.getDataFromServer();
            },
            pagePrecedente() {
                console.log("page precedente");
                this.page--;
                this.getDataFromServer();
            }
        }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
