<template>
  <div>
    <h1></h1>
  </div>
</template>

<script>
export default {
  name: "RestaurantEvaluation",
  props: {
    evals: Array
  },
  data: function() {
    return {};
  },
  mounted() {
    console.log("AVANT AFFICHAGE !");
    console.log(
      "On va chercher les détails du restaurant id = " + this.$route.params.id
    );
    console.log("ID = " + this.id);
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
