<template>
  <div id="chart" ref="chart"></div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
  name: 'antvChart',
  data() {
    return {
      chartProp: {
        container: 'chart'
      }
    };
  },
  methods: {
    initChart() {
      const cloChart = new Chart({
        container: this.chartProp.container,
        autoFit: false,
        width: 600,
        height: 300
      });

      cloChart.data([]).line().scale('Data', {
        min: 0,
        max: 100,
        type: 'timecat'
      });
      cloChart.scale('yData', {
        min: 0,
        max: 100,
        type: 'log'
      });

      return cloChart
    }
  },
  mounted() {
    this.initChart().render()
  }
};
</script>

<style scoped>
</style>
