<template>
  <div>
    <h1>New York City</h1>
    <h2>
      {{ address.building }} {{ address.street }} {{ address.zipcode }}
      {{ borough }}
    </h2>
    <div class="mapouter">
      <div
        v-html="url"
        class="gmap_canvas"
        @scroll="zooming"
        :key="keyComponent"
      ></div>
      <md-button
        class="md-raised md-primary"
        @click="zooming(true)"
        v-bind:disabled="zoom >= 18"
      >
        <md-icon>add</md-icon>
      </md-button>
      <md-button
        class="md-raised md-primary"
        @click="zooming(false)"
        v-bind:disabled="zoom <= 13"
      >
        <md-icon>remove</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantMap",
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
      }
    }
  },
  computed: {
    url() {
      return `<iframe
          width="800"
          height="700"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=${this.lat},${this.long}&z=${this.zoom}&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="yes"
          marginheight="0"
          marginwidth="0"
        ></iframe>`;
    }
  },
  data() {
    return {
      lat: 0.0,
      long: 0.0,
      keyComponent: 0,
      zoom: 15,
      min: 10,
      max: 20
    };
  },
  methods: {
    zooming(value) {
      if (this.zoom <= this.max && this.zoom >= this.min) {
        if (value) ++this.zoom;
        else --this.zoom;
        this.forceRerender();
      }
    },
    forceRerender() {
      this.keyComponent++;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
