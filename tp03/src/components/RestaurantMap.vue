<template>
  <div>
    <h1>latitude : {{ lat }} longitude : {{ long }}</h1>
    <div class="mapouter">
      <div v-html="url" class="gmap_canvas"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "restaurant-map",
  props: {
    coords : Array,
  },
  watch: {
    map: {
      immediate: true,
      handler() {
        this.lat = this.coords[1];
        this.long = this.coords[0];
        this.url = `<iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=${this.lat},${this.long}&z=15&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
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
      url: ""
    };
  },
  methods: {
    getCoord() {
      this.lat = this.coord[0];
      this.long = this.coord[1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
