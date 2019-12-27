<template>
  <div>
    <h1>{{ borough }}</h1>
    <h1>{{ address }}</h1>
    <div class="mapouter">
      <div v-html="url" class="gmap_canvas" @scroll="zooming"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "restaurant-map",
  props: {
    coords: Array,
    borough: String,
    address: Object
  },
  watch: {
    map: {
      immediate: true,
      handler() {
        this.lat = this.address.coord[1];
        this.long = this.address.coord[0];
        this.url = `<iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=${this.lat},${this.long}&z=${this.zoom}&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="yes"
          marginheight="0"
          marginwidth="0"
        ></iframe>`;
      }
    }
  },
  data() {
    return {
      lat: 0.0,
      long: 0.0,
      url: "",
      zoom: 15
    };
  },
  methods: {
    zooming() {
      console.log("zooming");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
