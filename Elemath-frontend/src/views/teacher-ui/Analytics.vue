<template>
  <div class="analytics-page">
    <navbar />
    <main>
      <header>
        <h3 class="header-text">Analytics Dashboard</h3>
        <select name="" id="" class="classes">
          <option value="2">2</option>
          <option value="2">2</option>
        </select>
      </header>
      <div class="con">
        <div class="item0">
          <h4 class="analysis-title">Recent Quiz Performance</h4>
          <apexChart
            type="line"
            height="230"
            :series="LineChart.series"
            :options="LineChart.options"
          />
        </div>
        <div class="item1">
          <h4 class="analysis-title">Pass vs. Fail Pie Chart</h4>
          <div class="pie-con">
            <apexChart
              type="pie"
              height="200"
              :series="PieChart.series"
              :options="PieChart.options"
            />
          </div>
          
        </div>
        <div class="item2">
          <h4 class="analysis-title">Top Students</h4>
          <apexChart
            type="bar"
            height="230"
            :series="barChart.series"
            :options="barChart.options"
          />
        </div>
        <!-- <div class="item3">
          <h4>Top Students</h4>
          <ul>
            <li>Juan Dela Cruz - 95%</li>
            <li>Maria Santos - 92%</li>
            <li>Pedro Reyes - 89%</li>
          </ul>
        </div> -->
        <div class="item4">
          <h4 class="analysis-title">
            Question Difficulty Breakdown
          </h4>
          <apexChart
            type="bar"
            height="230"
            width="280"
            :series="barChart.series"
            :options="barChart.options"
          />
        </div>
        <div class="item5">
          <h4 class="analysis-title">
            Improvement
          </h4>
          <div class="pie-con">
            <apexChart
              type="pie"
              height="210"
              :series="improvementChart.series"
              :options="improvementChart.options"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import ApexChart from "vue3-apexcharts"

export default {
  components: { navbar, ApexChart },
  data() {
    return {
      LineChart: {
        series: [
          { name: "Quiz", data: [80, 70, 90, 77, 85, 92] }
        ],
        options: {
          chart: { background: "#fff" },
          colors: ["#4fc4f7"],
          stroke: { curve: "smooth", width: 3 },
          xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat"] },
          grid: { borderColor: "#e0e0e0" }
        }
      },
      barChart: {
        series: [
          { name: "Quiz", data: [80, 70, 90, 77, 85, 92].sort((a,b ) => b -a) }
        ],
        options: {
          chart: { background: "#fff" },
          colors: ["#FF9800"],
          plotOptions: { bar: { horizontal: true, borderRadius: 5 } },
          xaxis: { categories: ["Patrick","Clariza","Rodel","Kurt","Ivan","Nicole"] }
        }
      },
      PieChart: {
        series: [10, 27],
        options: {
          labels: ["Failed", "Pass"],
          colors: ["#FF5252", "#4CAF50"],
          legend: { position: "right" }
        }
      },
      improvementChart: {
        series: [10, 27,8],
        options: {
           labels: ["Improved", "No Change", "Declined"],
           colors: ["#28a745", "#ffc107", "#dc3545"],
          legend: { position: "right" }
        }
      }
    }
  }
}
</script>

<style scoped>
.classes{
  position: fixed;
  border-radius: 5px;
  top: 5px;
  right: 10px;
  width: 90px;
  height: 40px;
}
header{
  display: flex;
  margin: 0;
}
.pie-con{
  height:100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-text{
  margin: 2px;
  margin-left: 10px;
}
.analysis-title{
  margin: 0;
}
.con {
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em;
  grid-template-areas:
    "linechart linechart piechart"
    "barchart topic latestQuiz";
  width: 97%;
  height: 90%;
}

.item0 { grid-area: linechart; }
.item1 { grid-area: piechart; }
.item2 { grid-area: barchart; }
.item3 { grid-area: list; }
.item4 { grid-area: topic; }
.item5 { grid-area: latestQuiz; }
.item0, .item1, .item2, .item3,.item4,.item5 {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.item3 ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item3 li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.analytics-page {
  height: 100vh;
  width: 100vw;
  background: #f5f7fa;
  display: flex;
  /* flex-direction: column; */
}
main {
  flex: 1;
  /* padding: 20px; */
}
header {
  margin-bottom: 20px;
}
</style>
