<template>
  <div class="con-info-btn" @click="clusterlowestTopic = true" v-if="this.lowestTopic.length > 0">
    <font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="2xl" style="color: #FFD43B;" />
  </div>
  <div class="headUp-cluster-con" v-if="clusterlowestTopic">
    <div class="headUp-cluster">
      <button class="close" @click="clusterlowestTopic = false"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>
      <header>[⚠️] Heads up! </header>
      <hr></hr>

      <p>Many students struggled with <span class="topics-low" v-for="(value,index) in lowestTopic" :key="index"> {{ value }}<span v-if="index != (lowestTopic.length - 1)">, </span></span>. The average score was lower than other topics, so teachers are encouraged to discuss and study the lesson further, and provide more practice, reviews, and short tests to help students improve.</p>
    </div>
  </div>
  <div class="analytics-page">
    <navbar />
    <main>
      <header>
        <h1 class="header-text">Analytics Dashboard</h1>
        <select name="" id="" class="classes" @change="selectINs(selectedClassId)" v-model="selectedClassId">
          <option v-for="value in class" :key="value.Class_id" :value="value.Class_id">{{ value.Class_name }}</option>

        </select>
      </header>
      <div class="con">
        <div class="item0">
          <h4 class="analysis-title">Recent Quiz Performance</h4>
          <apexChart
            v-if="LineChart"
            type="line"
            height="230"
            :series="LineChart.series"
            :options="LineChart.options"
          />
          <div class="filler" v-else>
            <p>No quiz performance data yet</p>
          </div>
          <p class="linechart-p"><span>Notes: </span>This graph shows students’ recent quiz scores as percentages, highlighting trends in performance over time.</p>

        </div>
        <div class="item1">
          <h4 class="analysis-title">Pass vs. Fail Pie Chart</h4>
          <div class="pie-con">
            <apexChart
              v-if="PieChart"
              type="pie"
              height="200"
              :series="PieChart.series"
              :options="PieChart.options"
            />
            <div class="filler" v-else>
              <p>No quiz performance data yet</p>
            </div>
          <p class="linechart-p">This table shows the number of students who passed and failed, 
          providing a clear overview of overall performance.</p>
          </div>
          
        </div>
        <div class="item2">
          <h4 class="analysis-title">Top Students</h4>
          <apexChart
            type="bar"
            v-if="barChart"
            width="100%"
            height="307"
            :series="barChart.series"
            :options="barChart.options"
          />
          <div class="filler" v-else>
            <p>No quiz performance data yet</p>
          </div>
          <p class="linechart-p"><span>Notes: </span>This chart highlights the top-performing students based on their recent quiz scores.</p>
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
            Lowest Scoring Topics
          </h4>
          <apexChart
            v-if="LowTopicBarChart"
            type="bar"
            width="100%"
            height="357"
            :series="LowTopicBarChart?.series"
            :options="LowTopicBarChart?.options"
          />
          <div class="filler" v-else>
            <p>No quiz performance data yet</p>
          </div>
          <div>
            <p class="linechart-p"><span>Notes: </span>This chart identifies the average of students' scores in various topics, helping teachers focus on areas that need improvement.</p>
          </div>
        </div>
        <div class="item5">
          <h4 class="analysis-title">
            Improvement
          </h4>
          <div class="pie-con">
            <!-- <apexChart
              type="pie"
              height="200"
              width="100%"
              :series="improvementChart?.series"
              :options="improvementChart?.options"
            /> -->
            <div  v-if="improvementChart?.series.some(v => v > 0)">
              <apexChart
                v-if="improvementChart"
                type="pie"
                height="210"
                :series="improvementChart.series"
                :options="improvementChart.options"
              />
            </div>
            <div v-else>
              <p>No improvement data yet.</p>
            </div>
            <p class="linechart-p"><span>Notes: </span> This section shows the overall progress of the students
 by comparing their previous scores to their latest results.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import ApexChart from "vue3-apexcharts"
import api from '@/axios'
export default {
  components: { navbar, ApexChart },
  data() {
    return {
      students:[],
      selectedClassId: null,
      LineChart: {
        series: [
          // { name: "Quiz", data: [80, 70, 90, 77, 85, 92] }
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
        
      },
      PieChart: {
        series: [],
        options: {
          labels: ["Failed", "Pass"],
          colors: ["#FF5252", "#4CAF50"],
          legend: { position: "right" }
        }
      },
      improvementChart: {
        series: [],
        options: {
        //    labels: ["Improved", "No Change", "Declined"],
        //    colors: ["#28a745", "#ffc107", "#dc3545"],
        //   legend: { position: "right" }
        }
      },
      classInput:null,
      selectedClassId:null,
      class:null,
      LowTopicBarChart:null,
      classIN:'',
      lowestTopic:[],
      clusterlowestTopic:false
    }
  },
  methods:{
    // async chart(){

    // },
    async selectINs(classsss){
      // this.classIN = classsss;

      // await this.getClassData(classsss);
      this.$router.push({name:'Analytics',query:{c:classsss}});
      setTimeout(() => {
        window.location.reload();
      }, 100);
      // this.reloadthePage();
    },

    reloadthePage(){
      window.location.reload();
    },
    async getInreload(){
      
      const c = this.$route.query.c;

      if(!c) return ;
      this.selectedClassId = c;
      // window.location.reload();
      await this.getAllQuarter(c);
      
    },
    async getAllQuarter(classId){
            try{
              if(!classId){
                return alert('nodata')
              }
              // console.log(classId);
                const res = await api.get('/chart',{
                    params:{classId:classId}
                });

                // this.LineChart = null;
                // this.barChart = null;
                // this.improvementChart = null;
                // this.PieChart = null;
                // this.LowTopicBarChart = null;
                this.LineChart = res.data.LineChart;
                // this.barChart.options = null;
                this.barChart = res.data.BarChart;
                // console.log(this.barChart);

                this.improvementChart = res.data.ImprovementChart;
                this.PieChart = res.data.PieChart;
                let lowestTopicTemp = res.data.LowTopicBarChart;  

                const chart = lowestTopicTemp;

                // Ensure structure exists
                chart.options = chart.options || {};
                chart.options.plotOptions = chart.options.plotOptions || {};
                chart.options.plotOptions.bar = chart.options.plotOptions.bar || {};
                chart.options.plotOptions.bar.distributed = true;

                // Generate dynamic bar colors
                chart.options.colors = chart.series[0].data.map(value => {
                  if (value < 30) return '#D32F2F';   // red-dark
                  if (value < 50) return '#FF5722';   // red
                  return '#4CAF50';                  // green
                });

                this.LowTopicBarChart = chart;


                console.log(this.LowTopicBarChart);
                for (const [index, value] of this.LowTopicBarChart?.series[0].data.entries()) {
                  // console.log('value '+ value);
                  if(value < 30){

                    this.lowestTopic.push(this.LowTopicBarChart?.options?.xaxis.categories[index]);
                  }
                }
                // console.log('lowest topic '+ JSON.stringify( this.lowestTopic));
                if(this.lowestTopic.length > 0){
                  this.clusterlowestTopic = true;
                }
                // if(this.LowTopicBarChart?.series[0].data[0] < 30){
                  
                // }
                
                // console.log('res get all record id '+ JSON.stringify(this.improvementChart));
            }catch(err){
              this.LineChart = null;
                this.barChart = null;
                this.improvementChart = null;
                this.PieChart = null;
                this.LowTopicBarChart = null;
                alert('No quiz record yet!');
                console.log(err);
            }
        },
    async getData() {
        try {
            const res = await api.get('/get/grade/class');
            this.class = res.data.data;
            // console.log('classes ? '+JSON.stringify( this.class));
            // Automatically select the first class if available
            if (this.class && this.class.length > 0) {

                console.log('classes'+ JSON.stringify(this.class));
                const firstClass = this.class[0];

                if(!this.selectedClassId){
                  this.selectedClassId = firstClass.Class_id;
                  this.classInput = firstClass;
                  this.getAllQuarter(this.selectedClassId);
                }
                
            }else{
                alert('No class yet!');
                this.$router.push('/tc');
            }


            // console.log('Data fetched successfully:', res.data);
        } catch (err) {
            // console.error('Error fetching data:', err);
            
            if (err.response?.status === 401) {
                this.$router.push('/');
            } else {
                const msg = err.response?.data?.message || 'Failed to fetch data. Please try again later.';
                alert(msg);
            }
        }
    },
    async getClassData(classIn) {
            try {
      // window.location.reload();

              // this.classIN = classIn;
            console.log('class id : ' + classIn);
            const res = await api.post('/get/classData', { classId: classIn });

            if (res.data.length <= 0) {
                alert('No student in this class yet!');
                this.$router.push({ name: 'createClass', query: { i: classIn } });
                return;
            }

            // Sort students by name
            // this.students = res.data.sort((a, b) => a.name.localeCompare(b.name));
            this.reload = false;

            // After fetching students, get their quiz data
            // this.reloadthePage();

            
            await this.getAllQuarter(classIn);
            // this.reloadthePage();
            // // Build dataset
            // this.dataset = this.students.map(student => {
            //     // Find all quiz scores for this student
            //     const quizScores = this.quizs.flatMap(quiz => {
            //     const matched = quiz.students.find(s => s.lrn === student.lrn);
            //     if (matched) {
            //         return [{
            //         quizId: quiz.quizId,
            //         quizName: quiz.quizname,
            //         score: matched.score
            //         }];
            //     }
            //     return [];
            //     });

            //     return {
            //     lrn: student.lrn,
            //     name: student.name,
            //     quizs: quizScores
            //     };
            // });

            console.log('Structured dataset:', this.dataset);

            } catch (err) {
            console.error('Error fetching class data:', err);
            alert('Failed to load class data. Please try again later.');
            }
        },
  },
  mounted(){
    
    this.getData();
    this.getInreload();

  }
}
</script>

<style scoped>
.linechart-p span{
  font-weight: bold;
  color: rgb(255, 89, 89);
}
.linechart-p{
  text-align: center;
  font-size: 12px;
  color: #555;
}
.con-info-btn{
  border-radius: 50%;

  background-color: #a6a6a6;
  height: 60px;
  width: 60px;
  position: fixed;
  top: auto;
  bottom: 20px;
  left:auto;
  right: 20px;
  z-index: 200;

  display: flex;
  align-items: center;
  justify-content: center;
}
.con-info-btn:hover{
  cursor: pointer;
  background-color: #818181;
}
.topics-low{
  font-weight: bold;
  color: #ff5722;
}
.close:hover{
  color: darkred;
}
.close{
  color: red;
  cursor: pointer;
  align-self:flex-end;
  border: none;
  background-color: transparent;
}
.headUp-cluster p{
  font-size: 14px;
  color: #555;
  text-align: center;
}
.headUp-cluster header{
  font-size: 18px;
  font-weight: bold;
  color: #ff9800;
  margin-bottom: 5px;
}
.headUp-cluster hr{
  border: none;
  border-top: 1px solid #eee;
  color: #888;
  width: 90%;
  margin: 10px 0;
}
.headUp-cluster{
  background-color: #ffffff;
  max-width: 400px;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.headUp-cluster-con{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  /* box-shadow: 0 2px 8px rgba(0,0,0,0.1); */
}
.filler{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header-text{
    color: #41b8d5;
    margin-left: 19px;
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
  overflow: auto;
  scrollbar-width: none;
  /* padding: 20px; */
}
header {
  margin-bottom: 20px;
}
</style>
