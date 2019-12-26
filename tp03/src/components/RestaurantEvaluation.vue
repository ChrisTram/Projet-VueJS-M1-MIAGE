<template>
  <table>
    <tr>
      <th>Date</th>
      <th>Grade</th>
      <th>Note</th>
    </tr>
    <tbody>
      <tr v-for="(e, index) in evals" v-bind:key="index">
        <td>{{ e.date | datify }}</td>
        <td>{{ e.grade }}</td>
        <td>{{ e.score }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "restaurant-evaluation",
  props: {
    evals: Array
  },
  data: function() {
    return {};
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
