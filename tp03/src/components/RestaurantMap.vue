<template>
  <div>
    <div class="mapouter">
      <div class="gmap_canvas">{{url}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "restaurant-map",
  props: {},
  computed: {
    // computed data, permet de définir des data "calculées"
    coords() {
      return this.$route.params.coord;
    }
  },
  mounted: {
    url() {
      return `<iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=${this.coords[0]},${
        this.coords[1]
      }&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>`;
    }
  },
  data() {
    return {
      lat: this.coords[0],
      long: this.props.coords[1]
    };
  },
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant
    },
    createURL() {
      return `https://maps.google.com/maps?q=${this.lat},${this.long}&z=13&ie=UTF8&iwloc=&output=embed`;
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
