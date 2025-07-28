<template>
    <body>
        <navbar />
    <main>
        <header>
            <h3>analytics-page</h3>
        </header>
        <div class="con">
            <div class="analytics-page" style="grid-area:linechart;">
                <apexChart
                type="line"
                :series="LineChart.series"
                :options="LineChart.options"
                />
            </div>
            <div class="item1" style="grid-area:piechart;">
                <apexChart
                type="pie"
                :series="PieChart.series"
                :options="PieChart.options"
                />
            </div>
            <div class="item2"style="grid-area:barchart;">
                <apexChart
                type="bar"
                :series="barChart.series"
                :options="barChart.options"
                />
            </div>
            <div class="item3"style="grid-area:list;"></div>
        </div>
      
    </main>
    </body>
    
</template>

<script>

import navbar from './components/navbar.vue';

export default {
  components: {
    navbar
  },
  data() {
    return {
      LineChart: {
        series: [
          {
            name: "Quiz",
            data: [80, 70, 90, 77, 85, 92]
          }
        ],
        options: {
          xaxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          }
        }
      },
      barChart: {
        series: [
          {
            name: "Quiz",
            data: [80, 70, 90, 77, 85, 92]
          }
        ],
        options: {
          xaxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },
          plotOptions:{
            bar:{
                horizontal:true
            }
          }
        }
      },
      PieChart:{
        series:[10,27],
        options:{
            labels:['failed','pass'],
            colors:['#FF0000','#00FF00'],
        }
      }
    };
  }
};
</script>

<style scoped>
.item2{
    background-color: brown;
}
.analytics-page,.item1,.item2.item3{
    background-color: aqua;
}
.con{
    background-color: blueviolet;
    height: inherit;
    width: inherit;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    gap: 1em;
    grid-template-areas: 
    'linechart linechart piechart'
    'barchart list list';
}
body{
    height: 100vh;
    width: 100vw;
    display: flex;
}
main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 90%;
}
.analytics-page {
  padding: 20px;
}
</style>
