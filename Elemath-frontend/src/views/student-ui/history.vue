<script>
import greenbg from './components/greenbg.vue';
import api from '@/axios';
import header1 from './components/header.vue';
export default{
    components: {
        greenbg,
        header1
    },
    data(){
        return{
            username:'',
            profile:'',
            lrn:'',
            histories:[],
            modeClicked:null,
            rev:[],
            cluster:false,
        }
    },
    mounted(){
        this.getdata();
    },
    methods:{
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.username = response.data.name || 'John Doe';
                this.profile = response.data.profile;
                this.lrn = response.data.lrn || '123456789012';
                await this.getHistory();
                // console.log('Student ID:', response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        },
        async getHistory(){
            try {
                const response = await api.get('/student/history'); // Adjust the endpoint as needed
                // console.log(response.data);
                // this.source = [];
                // this.source = response.data.history || [];
                console.log('Grades:', response.data);
                this.histories = response.data.quizzes || [];
            } catch (error) {
                console.error('Error fetching student history:', error);
            }
            return;
        },
        showQuestion(question,mode){
            console.log(question );
            this.cluster = true;
            this.modeClicked = mode;
            this.rev = question;
        },
        colorpic(realans,value){
            if(realans == value) return '#8ee71a';
            return '#ff4444';
        },
        getwindowcard(question){
            // this.$router.push('/twc');
            return JSON.parse(question);
        }
    }
}
</script>
<template>
    <greenbg></greenbg>
    <div class="cluster" v-if="cluster" @click.self="cluster = false">
        <div class="con-cluster"> 
            <header>
                <button @click="cluster = false"><font-awesome-icon :icon="['fas', 'xmark']" size="lg" color="red"/></button>
            </header>
            <div class="question-con">
                <div class="rev" v-for="(c,index) in rev" :key="index" :class="c.correct? 'correct' : 'wrong'">
                    <p v-if="modeClicked == 'QUIZ MODE'" class="question">{{c.question  }}</p>
                    <p v-else class="question">{{ getwindowcard(c?.question ).q1}} {{ getwindowcard(c?.question).operation }} {{ getwindowcard(c?.question ).q2 }} = ?</p>

                    <div class="con-option" v-if="c?.choices.length > 0">
                        <div class="option" v-for="(value,index) in c.choices" :key="index" :style="{color:colorpic(c.answer,value)}">
                            <p >{{ value }}</p>
                        </div>
                    </div>
                    <div v-else>
                        <!-- <p :class="c.correct ? 'correct-answer' : 'wrong-answer'">{{ c.playerAnswer }}</p> -->
                        <p class="correct-answer" v-if="!c.correct ">Answer: {{ c.answer }}</p>
                    </div>
                    
                    <!-- <p v-if="c.q.explanation">Explanation: {{ c.explanation }}</p> -->
                </div>
            </div>
        </div>
    </div>
    <body>
        <!-- <h1>History</h1> -->
        <header1 :info="{name:username, profile:profile, lrn:lrn}"/>
        <div class="history-con">
            <div class="no-history" v-if="histories.length == 0">
                <h3>No history available</h3>
            </div>
            <div class="history" v-for="(quiz, index) in histories" :key="index" @click="showQuestion(quiz.questions, quiz.quizMode)">
                <div><strong>Preview</strong><p class="quiz-mode" :style="{ fontSize: quiz.quizMode == 'WINDOWCARD MODE' ? '12px' : '16px' }">{{ quiz.quizMode }}</p></div>
                <hr>
                <div><strong>Date</strong><p> {{ quiz.quizname }}</p></div>
                <hr>
                <div><strong>Score:</strong><p> {{ quiz.score }}/{{ quiz.total }}</p></div>
                <!-- <p><strong>Date Taken:</strong> {{ new Date(quiz.quizname).toLocaleDateString() }}</p> -->
                
                <!-- <hr v-if="index < histories.length - 1" /> -->
            </div>
        </div>
    </body>
    
    <!-- <h1>History</h1> -->
</template>
<style scoped>
.question{
    font-weight: 600;
    margin-bottom: 10px;
}
.option p {
    font-weight: 600;
    /* background-color: #8ee71a; */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.quiz-mode{
    font-weight: 500;
    text-decoration: underline;
}
.no-history{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.correct-answer{
    color: #76b81f;
}
.rev{
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
}
.con-cluster header button{
    background-color: transparent;
    border: none;
}
.con-cluster header{
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
}
.con-cluster{
    display: flex;
    flex-direction: column;
    width: 80%;
    max-height: 90vh;
    overflow-y: auto;
    /* height: 70%; */
    scrollbar-width: thin;

    padding: 20px;
    background-color: rgb(199, 199, 199);
    border-radius: 10px;

}
.cluster{
    position: fixed;
    z-index: 1000;
    height: 100vh;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}
.history div{
    /* background-color: #422929; */
    min-width: calc(100% / 3);
    text-align: center;
}
.history:hover{
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    transition: all 0.3s ease;
}
.history{
    cursor: pointer;
    display: flex;
    /* justify-content: space-between; */
    background-color: white;
    width: 85%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
}
.history-con{
    /* height: 100px; */
    width: 100%;
    padding-bottom: 50px;
    
}
body{
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    /* margin: 0;
    /* padding: 0; */
     font-family: 'BubbleBody Neue','Poppins', sans-serif; 
    /* background-color: #f0f0f0; */
    /* background-color: #e8f5e9; */
    /* min-height: 100vh; */
}
@media screen and (min-width: 1024px) {
    .history{
        /* flex-direction: column; */
        text-align: center;
    }
    .history div{
        margin-bottom: 10px;
    }
    
}
</style>