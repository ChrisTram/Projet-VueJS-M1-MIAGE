<template>
  <div>
        <h1>La presse nous recommande !</h1>

    <h1></h1>
    <table style = "margin-left:auto;margin-right:auto;" >
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
  props: {
    evals:Array
  },
  data: function() {
    return {};
  },
  mounted() {
    console.log("AVANT AFFICHAGE EVALUATION !");
  },
  filters: {
    datify(value) {
      return value.slice(0, 10);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
