<template>
  <div></div>
</template>

<script>
export default {
  name: "restaurant-detail",
  props: {},
  computed: {},
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
  methods: {
    getDataFromServer() {
      // ici on fait un fetch pour récupérer le détail du restaurant
    }
  }
};
</script>

<style scoped>
</style>
