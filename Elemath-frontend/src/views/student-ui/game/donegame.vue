<script>
import api from '@/axios';
// import { io } from 'socket.io-client';
import socket from '@/socket';
export default{
    data(){
        return{
            rev:[],
            score:0,
            modeDone:false,
        }
        
    },
    methods:{
        async getdata(){
            try{
                const res = await api.get('/get/mode/player/rev');
    
                this.rev = [];

                socket.connect();
                this.rev = res.data.rev;
                this.modeDone = res.data.modeDone;
                this.score = res.data.score;
                console.log(res.data.rev);
                
            }catch(err){
                // console.log(err);
                this.$router.push('/ds');
            }
        },
        colorpic(realans,value,player){
            if(player == value) return '#ff7b00';
            if(realans == value) return '#8ee71a';
            return '#ff4444';
        },
        gotohome(){
            this.$router.push('/ds');
        }
    },
    mounted(){
        this.getdata();
        socket.on('mode-done',(data)=>{
            this.modeDone = data.doneMode;
        });
    }
}
</script>
<template>
    <!-- <div class="background">
        <div class="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> -->
    <main>
        <div class="con-score">
            <div class="analysis">
                <p>Score</p>
                <div class="middle-an">
                    <p class="score">{{ score }}/{{ rev.length }}</p>
                </div>
                

            </div>
            <div class="analysis">
                <p>Accuracy</p>
                <div class="red-con">
                    <div class="green-con" :style="{width: (score/rev.length)*100 + '%', backgroundColor: '#8ee71a'}"></div><div class="indicator">{{ Math.floor((score/rev.length)*100) }}%</div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="con" v-if="modeDone">
            <div class="rev" v-for="(c,index) in rev" :key="index" :class="c.correct? 'correct' : 'wrong'">
                <p v-if="c.q.question?.question" class="question">{{ c.q.question?.question }}</p>
                <p v-else class="question">{{ c.q.question }} </p>

                <div class="con-option" v-if="c.q?.options?.length > 0">
                    <div class="option" v-for="(value,index) in c.q.options" :key="index" :style="{color:colorpic(c.q.answer,value,c.playerAnswer)}">
                        <p>{{ value }}</p>
                    </div>
                </div>
                <div v-else>
                    <p :class="c.correct ? 'correct-answer' : 'wrong-answer'">{{ c.playerAnswer }}</p>
                    <p class="correct-answer" v-if="!c.correct ">Answer: {{ c.q.answer }}</p>
                </div>
                
                <p v-if="c.q.explanation">Explanation: {{ c.q.explanation }}</p>
            </div>
            
        </div>
        <div class="con" v-else>
            <div class="waiting-ui">
                <p class="waiting-text">Waiting for Result</p>
                <img src="/gif/penguin.gif" alt="">
                <p class="waiting-d">Waiting for the  other students who are still answering</p>
            </div>
        </div>
        <!-- <br> -->
        <div class="con">
            <h1 class="score">Score : {{ score }}/{{ rev.length }}</h1>

            <button class="leave" @click="gotohome">Leave</button>
            <br>
        </div>
            
        <br>
        <br>
    </main>
</template>
<style scoped>
.indicator{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: fit-content;
    padding: 4px;
    border-radius: 10px;
    background-color: white;
    font-weight: 700;
    font-size: 17px;
}
.green-con{
    display: flex;
    width: 90%;
    height: 20px;
    background-color: #8ee71a;
    border-radius: 10px 0 0 10px;
}
.red-con{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    height: 20px;
    background-color: red;
    border-radius: 10px;
}
.middle-an .score{
    font-size: 30px;
}
.middle-an{
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: white; */
    height: 30px;
    width: 100%;
    /* padding: 10px; */
    
}
.analysis p{
    font-weight: 700;
    font-size: 17px;
    text-align: left;
    justify-self: left;
}
.analysis{
    display: flex;
    flex-direction: column;
    /* align-items: center; 
    justify-content: center; */
    padding-left: 10px;
    padding-bottom: 10px;
    width: 100%;
    background-color:#c2cdff;
    width: 90%;
    border-radius: 10px;
}
.con-score{
    margin-top: 10px;
    background-color: white;
    display: flex;
    max-width: 700px;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 80%;
    min-height: fit-content;
    padding: 20px;
}
.correct-answer{
    background-color: white;
    color: #8ee71a;
}
.wrong-answer{
    background-color:white ;
    color:#ff4444 ;
}
.correct-answer,.wrong-answer{
    width: 200px;
    padding: 10px;
    text-align: center;
    font-weight: 700;
    border-radius: 10px;
}
.question{
    font-weight: 700;
    font-size: 20px;
    text-align: center;
}
.leave:hover{
    transform: scale(1.02);
}
.leave{
    font-weight: 700;
    font-size: 20px;
    border-radius: 10px;
    width: 120px;
    height: 50px;
    border: none;
    color: white;
    background-color: #d32828;

}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.score{
    font-weight: 700;

    color: black;
}
.correct-option{
    background-color: #8ee71a;
}
.wrong-option{
    background-color: #ff4444;
}
.option{
    color: white;
    background-color: white;
    border-radius: 10px;
    margin: 5px;
    width: 100%;
    height: fit-content;
    text-align: center;
}
.con-option{
    width: 80%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.con{
    width: 100%;
    background-color: #5ce7ff;

    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.waiting-d{
    font-weight: 500;
    font-size: 20px;
}
.waiting-text{
    font-weight: 700;
    font-size: 30px;
}
.waiting-ui p {
    text-align: center;
}
.waiting-ui{
    width: 80%;
    max-width: 700px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: white;
    min-height: 100px;

    border-radius: 10px;
    padding: 10px;
}
.rev{
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    background-color: #c1ff72;
    height: fit-content;
    border-radius: 10px;
    width: 80%;
    max-width: 700px;

    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.wrong{
    border: #ff4444 3px solid;
    /* background-color: #ff4444; */
}
.correct{
    border: #b4ff52 3px solid;
    /* background-color: #b4ff52; */
}
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
    background-color: #5ce7ff;

  /* font-family: 'Poppins', sans-serif; */
  /* background-color: #f0f4f8; */
}
main{
    position: absolute;
    z-index: 3;
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: #5ce7ff;
    align-items: center;
}
.background{
    position: fixed;
    z-index: 1;
    height: 100vh;
    width: 100vw;
    background: #a8e15e;
    display: flex;
    flex-direction: column;
}

.background  .box div{
    
    position: absolute;
    width: 60px;
    height: 60px;
    border: white 3px solid;
    background-color: transparent;
    z-index: 0;
}
/* Generate 10 divs with random positions using nth-child selectors */
.background .box div:nth-child(1) {
    top: 12%;
    left: 18%;
    animation: animation 8s linear infinite;
    /* Assign a custom property for each child to randomize duration
    --i: 0.1; */
}
.background .box div:nth-child(2) {
    top: 25%;
    left: 70%;
    --i: 0.2;
    animation: animation 12s linear infinite;
}
.background .box div:nth-child(3) {
    top: 40%;
    left: 30%;
    --i: 0.3;
    animation: animation 10s linear infinite;
}
.background .box div:nth-child(4) {
    top: 55%;
    left: 80%;
    --i: 0.4;
    animation: animation 13s linear infinite;
}
.background .box div:nth-child(5) {
    top: 65%;
    left: 15%;
    --i: 0.5;
    animation: animation 11.9s linear infinite;
}
.background .box div:nth-child(6) {
    top: 78%;
    left: 60%;
    --i: 0.6;
    animation: animation 12.5s linear infinite;
}
.background .box div:nth-child(7) {
    top: 85%;
    left: 40%;
    --i: 0.7;
    animation: animation 9s linear infinite;
}
.background .box div:nth-child(8) {
    top: 33%;
    left: 55%;
    --i: 0.8;
    animation: animation 10.8s linear infinite;
}
.background .box div:nth-child(9) {
    top: 60%;
    left: 35%;
    --i: 0.9;
    animation: animation 8.7s linear infinite;
}
.background .box div:nth-child(10) {
    top: 20%;
    left: 85%;
    --i: 1.0;
    animation: animation 9.9s linear infinite;
}
@keyframes animation {
    from{
        transform: scale(0) rotate(0)  translateY(0);
        opacity: 1;
    }
    to{
        transform: scale(1.5) rotate(360deg)  translateY(-90px);
        opacity: 0;
    }
}
@media screen and (min-width: 600px) and (max-width: 1023px){
    .leave{
        height: 100px;
        width: 200px;
    }
}
@media screen and (min-width: 1024px){
    .leave{

        height: 80px;
        width: 180px;
    }
}
</style>