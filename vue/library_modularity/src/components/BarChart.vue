<template>
  <div style="width: 400px; height: 400px;">
    <canvas ref="barChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
export default {
  props: ["datasets"],
  mounted() {
    var ctx = this.$refs.barChart;
    var myChart = new this.$_Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: this.datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    console.log(myChart);
  },
};
</script>
