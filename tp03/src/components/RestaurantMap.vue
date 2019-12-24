<template>
  <div>
    <div class="mapouter">
      <div class="gmap_canvas">
        <iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src="{{url}}"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantMap",
  props: {},
  computed: {
    // computed data, permet de définir des data "calculées"
    coord() {
      // on y accèdera par {{id}} dans le template, et par this.id
      // dans le code
      return this.$route.params.address.coord;
    }
  },
  data: function() {
    return {
      url: "",
      lat: 0.0,
      long: 0.0
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    console.log(
      "On va chercher les détails du restaurant id = " + this.$route.params.id
    );
    console.log("ID = " + this.id);
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant
    },
    createURL() {
      return `https://maps.google.com/maps?q=${lat}&${long}&z=13&ie=UTF8&iwloc=&output=embed`;
    },
    getCoord() {
      this.lat = this.coord[0];
      this.long = this.coord[1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mapouter {
  position: relative;
  text-align: right;
  height: 500px;
  width: 600px;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 500px;
  width: 600px;
}
</style>
