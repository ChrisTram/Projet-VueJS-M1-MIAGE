<template>
  <div>
    <h1></h1>
    <table>
      <tr>
        <th>Date</th>
        <th>Grade</th>
        <th>Note</th>
      </tr>
      <tbody>
        <tr v-for="(e, index) in evals" :key="index">
          <td>{{ e.date | datify }}</td>
          <td>{{ e.grade }}</td>
          <td>{{ e.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "restaurant-evaluation",
  props: {},
  computed: {
    evals() {
      return this.$route.params.evals;
    }
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
  methods: {
    datify(value) {
      return value.slice(0, 8);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
