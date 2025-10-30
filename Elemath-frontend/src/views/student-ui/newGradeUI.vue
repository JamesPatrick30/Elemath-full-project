<script>
import api from '@/axios';
import header1 from './components/header.vue';
import greenbg from './components/greenbg.vue';
export default {
    name: 'newGraceUI',
    components: {
        header1,
        greenbg
    },
    data() {
        return {
            username: 'Processing...',
            profile: 'Processing...',
            lrn: 'Processing...',
            source: [],
            windowCardgrades: [],
            quizGrades: []
        }
    },
    methods: {
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.username = response.data.name || 'John Doe';
                this.profile = response.data.profile;
                this.lrn = response.data.lrn || '123456789012';
                // console.log('Student ID:', response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        },
        async getGrade(){
            try {
                const response = await api.get('/student/grade'); // Adjust the endpoint as needed
                // console.log(response.data);
                // this.source = [];
                this.source = response.data.grade || [];
                this.windowCardgrades = this.source.filter(item => item.quizMode === 'WINDOWCARD MODE');
                this.quizGrades = this.source.filter(item => item.quizMode === 'QUIZ MODE');

                let quizCounter = 1;
                this.quizGrades = this.quizGrades.map(item => ({
                    quizMode: item.quizMode + ` ${quizCounter++}`,
                    total: item.total,
                    grade: item.score,
                    percentage: item.percentage,
                    dateTaken: item.quizname
                }));
                console.log('Grades:', this.windowCardgrades);

                let windowCardCounter = 1;
                this.windowCardgrades = this.windowCardgrades.map(item => ({
                    quizMode: item.quizMode + ` ${windowCardCounter++}`,
                    total: item.total,
                    grade: item.score,
                    percentage: item.percentage,
                    dateTaken: item.quizname
                }));
                console.log('Grades:', this.windowCardgrades);
                console.log('Grades:', this.quizGrades);
            } catch (error) {
                console.error('Error fetching student grades:', error);
            }
            return;
        },
        calculateAverageGrade() {
            if (this.source.length === 0) return 'N/A';
            const totalGrades = this.source.reduce((sum, item) => sum + item.percentage, 0);
            return (totalGrades / this.source.length).toFixed(2);
        }
    },
    mounted() {
        this.getdata();
        this.getGrade();
    }
}
</script>
<template>
    <!-- <header1></header1> -->
    <greenbg></greenbg>

    <body>
        <header1 :info="{name:username,profile:profile,lrn:lrn}" ></header1>

        <h1>Grades</h1>

        <main>
            <div class="container">
                <header>
                    <p>Windowcard Total:</p>
                </header>
                <div class="container-grades">
                    <div v-for="(item, index) in windowCardgrades" :key="index" class="grade-item" 
                    :style="{backgroundColor: item.percentage >= 75 ? '#d4edda' : '#f8d7da'}">
                        <p class="grade-title">{{ item.quizMode }}</p>
                        <p class="grade-date">{{ item.dateTaken }}</p>
                        <hr>
                        <strong>{{ item.grade }} / {{ item.total }}</strong>
                         <hr>
                        <p class="grade-title" v-if="item.percentage >=75">PASSED</p>
                        <p class="grade-title" v-if="item.percentage < 75">FAILED</p>


                    </div>
                </div>
            </div>

            <div class="container">
                <header>
                    <p>Quiz Total:</p>
                </header>
                <div class="container-grades">
                    <div v-for="(item, index) in quizGrades" :key="index" class="grade-item" 
                    :style="{backgroundColor: item.percentage >= 75 ? '#d4edda' : '#f8d7da'}">
                        <p class="grade-title">{{ item.quizMode }}</p>
                        <p class="grade-date">{{ item.dateTaken }}</p>
                        <hr>
                        <strong>{{ item.grade }} / {{ item.total }}</strong>
                        <hr>
                        <p class="grade-title" v-if="item.percentage >=75">PASSED</p>
                        <p class="grade-title" v-if="item.percentage < 75">FAILED</p>
                        <!-- <hr>
                        <p class="grade-title">{{ item.quizMode }}</p> -->

                    </div>
                </div>
            </div>

            <div class="container-average">
                
                <p>Average Grade:</p>
                <strong>{{ calculateAverageGrade() }}</strong>
            </div>
        </main>
    </body>
</template>
<style scoped>
h1{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
    /* font-size: 30px; */
    color: white;
    /* margin: 20px 0; */
    text-align: center;
}
.container-average strong{
    font-size: 25px;
    color: #333333;
    margin: 8px 0;
}
.container-average{
    width: 200px;
    background-color: white;
    align-items: center;
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    gap: 10px;
}
.grade-item strong{
    font-size: 20px;
    color: #333333;
    margin: 8px 0;
}
.grade-title{
    font-size: 13px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 8px;
}
.grade-date{
    font-size: 10px;
    color: #494949;
    margin-bottom: 8px;
}
.grade-item hr{
    border: none;
    border-top: 1px solid #333333;
    margin: 10px 0;
}
.grade-item{
    user-select: none;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    min-width: 150px;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.container-grades{
    display: flex;
    /* flex-direction: column; */
    overflow: auto;
    scrollbar-width: thin;
    gap: 10px;
    width: 100%;
}
.container header{
    width: 100%;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;

}
.container header p{
    font-size: 15px;
    font-weight: bold;
    color: #333;
    margin: 0;
    padding: 10px 0;
    /* border-bottom: 2px solid #e0e0e0; */
    /* text-align: center; */
}
.container {
    width: 90%;
    background-color: white;
    align-items: center;
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
}
main{
    width: 90%;
    max-width: 800px;
    flex-direction: column;
    align-items: center;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
body{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>