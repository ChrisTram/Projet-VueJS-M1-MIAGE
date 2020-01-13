<template>
  <div>
    <h2>La presse nous recommande !</h2>

    <h1></h1>
    <table style="margin-left:auto;margin-right:auto;">
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
    evals: Array
  },
  data: function() {
    return {};
  },

  filters: {
    datify(value) {
      let re = new RegExp("([\\d]{2})-([\\d]{2})-([\\d]{2})");
      let corresp = re.exec(value);
      let day = corresp[3];
      let month = corresp[2];
      let year = corresp[1];
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>