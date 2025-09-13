<script>
import api from '@/axios';
export default{
    data(){
        return{
            rev:null,
            score:0
        }
        
    },
    methods:{
        async getdata(){
            try{
                const res = await api.get('/get/mode/player/rev');
                this.rev = res.data.rev;
                this.score = res.data.score;
                console.log(res.data.rev);
            }catch(err){
                console.log(err);
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
    }
}
</script>
<template>
    <div class="background">
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
    </div>
    <main>
        <h1 class="score">Score : {{ score }}/{{ rev.length }}</h1>
        <div class="con">
            <div class="rev" v-for="(c,index) in rev" :key="index" :class="c.correct? 'correct' : 'wrong'">
                <p v-if="c.q.question?.question" class="question">{{ c.q.question?.question }}</p>
                <p v-else class="question">{{ c.q.question }} </p>

                <div class="con-option" v-if="c.q?.options?.length > 0">
                    <div class="option" v-for="(value,index) in c.q.options" :key="index" :style="{backgroundColor:colorpic(c.q.answer,value,c.playerAnswer)}">
                        <p>{{ value }}</p>
                    </div>
                </div>
                <div v-else>
                    <p :class="c.correct ? 'correct-answer' : 'wrong-answer'">{{ c.playerAnswer }}</p>
                    <p class="correct-answer" v-if="!c.correct ">Answer: {{ c.q.answer }}</p>
                </div>
                
                <p v-if="c.q.explanation">Explanation: {{ c.q.explanation }}</p>
            </div>
            <br>
            <button class="leave" @click="gotohome">Leave</button>
            <br>
        </div>
        
        <br>
        <br>
    </main>
</template>
<style scoped>
.correct-answer{
    background-color: #8ee71a;

}
.wrong-answer{
    background-color: #ff4444;
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
    background-color: #37c6e2;

}
.score{
    color: white;
}
.correct-option{
    background-color: #8ee71a;
}
.wrong-option{
    background-color: #ff4444;
}
.option{
    color: white;
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
    width: 80%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.rev{
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    background-color: white;
    height: fit-content;
    border-radius: 10px;
    width: 100%;
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
main{
    position: absolute;
    z-index: 3;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
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