<script>
import ApexChart from "vue3-apexcharts"
import api from '@/axios';
import greenbg from "../components/greenbg.vue";
export default {
    name: "TestArea",
    components: { ApexChart,greenbg },
    data() {
        return {
            quizMode:'',
            persent: 100,
            story:'',
            question:'',
            colors: ['#5bb450','#3b8132','#e8e337','#e69b00','#e70000','#820000'],
            color:'',
            timer: null,
            timeLeft: 10, // Example: 60 seconds
            totaltime: 10,
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
            options: [
                "A. The line shows an overall increase from January to June.",
                "B. The line shows no change across months.",
                "C. The line decreases from January to June.",
                "D. The line peaks in February."
            ],
            topic:'Understanding Bar and Line Graphs',
            id:'',
            table:null,
            tabletype:'',
            inputanswer:'',
            mute: false,
            setting:false,
            audiosrc: "/musics/ingame.mp3",
            volume: 0.5,
            resvolume:0,
            typeOfTest:'',
            btnsubmit:false
        }
    },
    methods: {
        startTimer() {
            // alert(`time ${this.timeLeft} seconds per question`);
            this.unlockAudio();
            this.timer = setInterval(() => {
                if (this.timeLeft > -1) {
                    this.timeLeft--;
                    this.persent = (this.timeLeft / this.totalTime) * 100;
                    if(this.persent > 83){
                        this.color = this.colors[0];
                    }else if (this.persent > 67){
                        this.color = this.colors[1];
                    }else if (this.persent > 51){
                        this.color = this.colors[2];
                    }else if (this.persent > 35){
                        this.color = this.colors[3];
                    }else if (this.persent > 19){
                        this.color = this.colors[4];
                    }else{
                        this.color = this.colors[5];
                    }
                    // ⏱ Save progress on every tick
                    if(this.timeLeft == 0){
                        if(this.btnsubmit){
                            return;
                        }
                        // this.getIDres('');

                        clearInterval(this.timer);
                        localStorage.removeItem('timeLeftingame');
                        this.timesup();
                    }
                    
                } else {
                    

                clearInterval(this.timer);
                }
            }, 1000);
        },
        async timesup(){
            try{
                const res = await api.post('/game/mode/timeup');
                this.$router.push('/rev');

            }catch(err){
                console.log(err);
            }
        },
        async getIDres(answer){
            try{
                if( this.btnsubmit){
                    return;
                }
                clearInterval(this.timer);
                this.btnsubmit = true;
                console.log('Answer sent: '+answer);
                const res =await api.post('/get/mode/question',
                    {answer:answer}
                );
                if(res.data.done){
                    this.$router.push('/rev');
                    localStorage.removeItem('timeLeftingame');
                    return;
                }
                this.inputanswer = '';
                this.get1st();

                // window.location.reload();
                // this.get1st();

                // console.log('Id : '+res.data.id);
                // this.id = res.data.id;
            }catch(err){
                console.log(err);
            }
        },
        async get1st(){
            try{
                const res =await api.get('/get/mode/question/1st');
                const data = res.data.question;
                // this.id = res.data.id;
                if(data.done){
                    this.$router.push('/rev');

                }
                this.quizMode = res.data.quizMode;
                console.log('Quiz mode: '+this.quizMode);
                this.topic = data.topic;
                this.question=data.question;
                this.options = data?.options;
                this.story = data?.story;
                this.timeLeft = (res.data.time.minutes * 60) + res.data.time.seconds;
                if(!this.timeLeft){
                    this.timeLeft = res.data.time * 60;
                }
                this.totalTime = this.timeLeft;
                this.table = data?.table;
                this.tabletype = data?.tabletype;
                this.typeOfTest = data?.type;
                this.btnsubmit = false;
                console.log(data);
                // alert(`time ${this.timeLeft} minutes ${this.timeLeft} sec per question`);
                const time2 = localStorage.getItem('timeLeftingame');
                // console.log(this.table);
                // console.log("time : "+time2);
                if(time2 != 0 && time2 != null){
                    // console.log("time : "+time2);
                    this.timeLeft = time2;
                }
                // this.timeLeft = res.data.time * 60;
                this.startTimer();
                
                
            }catch(err){
                console.log(err);
            }
        },
        mutevol(){
            this.mute = !this.mute;
            if(this.mute){
                this.resvolume = this.volume;
                this.volume = 0;
                this.$refs.player.volume = 0;
            }else{
                this.volume = this.resvolume;
                this.$refs.player.volume = this.volume;
            }
        },
        settingf(){
            this.setting = !this.setting;
        },
        updateVolume() {
            this.$refs.player.volume = this.volume;
        },
        
        unlockAudio() {
            const player = this.$refs.player;
            player.muted = false;
            player.volume = this.volume;
            player.play().catch(err => console.warn("Still blocked:", err));
        },
        handleBeforeUnload(event) {
            localStorage.setItem('timeLeftingame', this.timeLeft);
            clearInterval(this.timer);
        },
        secondsToTime(secs) {
            const minutes = Math.floor(secs / 60);
            const seconds = secs % 60;
            return { minutes, seconds };
        },
    },
    mounted() {
        // this.getIDres();
        this.get1st();
        document.body.addEventListener("click", this.unlockAudio, { once: true });
        // document.body.addEventListener("click", this.unlockAudio, { once: true });
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    },
}
</script>
<template>

    <greenbg></greenbg>
    <div class="clouds">
        <img src="/gif/clouds.gif" alt="">
        <img src="/gif/clouds.gif" alt="">
        <img src="/gif/clouds.gif" alt="">

    </div>
    
    <body>
    <audio
        ref="player"
        :src="audiosrc"
        autoplay
        loop
        muted
        ></audio>

<!-- 
        <header>
                    
            <p> {{ topic }}</p>
            
        </header>  -->
        <!-- <div class="timer" :style="{width: persent+ '%',backgroundColor: color } "></div> -->
        <!-- <p class="time-left">{{ timeLeft }}s</p> -->
         <div class="top-setting-and-time-con">
            <div class="timer-con">
                <!-- <div class="timer" :style="{width: persent+ '%',backgroundColor: color } "></div> -->
                <p class="timer-top">{{ secondsToTime(timeLeft).minutes }}m {{ secondsToTime(timeLeft).seconds }}s</p>
            </div>

            <button class="setting" @click="settingf()"><font-awesome-icon icon="fa-solid fa-gear" size="2xl" /></button>
            
         </div>
        
        
        <main>
            
            <!-- <div class="bar-chart" > -->
                <div class="test-area" v-if="quizMode !== 'WINDOWCARD MODE'">
                    <apexChart
                        type="line"
                        v-if="tabletype == 'Line'"
               
                        class="charts"
                        :series="table?.LineChart.series"
                        :options="table?.LineChart.options"
                    />
                  <!-- </div> -->
                  <!-- <div v-if="tabletype == 'Bar'" class="charts"> -->
                    <apexChart
                        type="bar"
                        v-if="tabletype == 'Bar'"
                        class="charts"
                        :series="table?.BarChart.series"
                        :options="table?.BarChart.options"
                        
                    />
                    
                  <!-- </div> -->
                  <!-- <div > -->
                    <apexChart
                        type="pie"
                        v-if="tabletype == 'Pie'"
                        class="charts"
                        :series="table?.PieChart.series"
                        :options="table?.PieChart.options"
                        />
                  <!-- </div> -->
                        <div v-if="tabletype == 'Table'">
                            <table  class="custom-table">
                                <thead>
                                <tr>
                                    <th v-for="(header, hIndex) in table?.head" :key="hIndex">
                                    {{ header }}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(row, rIndex) in table?.body" :key="rIndex">
                                    <td v-for="(cell, cIndex) in row" :key="cIndex">
                                    {{ cell }}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <!-- <table v-if="table" class="custom-table">
                                <thead>
                                <tr>
                                    <th v-for="(header, hIndex) in table.Table.head" :key="hIndex">
                                    {{ header }}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(row, rIndex) in table.Table.body" :key="rIndex">
                                    <td v-for="(cell, cIndex) in row" :key="cIndex">
                                    {{ cell }}
                                    </td>
                                </tr>
                                </tbody>
                            </table> -->
                        </div>
                    <div
                        :class="tabletype ? 'question timer-border' : 'question-notable timer-border'"
                        :style="{
                            background: `conic-gradient(${color || '#7577ff'} ${persent}%, rgba(0,0,0,0) ${persent}%)`,
                            padding: '6px',
                            borderRadius: '12px'
                        }"
                    >
                        <div
    
                            style="transition: all 1s linear; background:white; border-radius:8px; padding:12px; min-width:280px; min-height:80px; transition: transform 300ms ease, box-shadow 300ms ease, opacity 300ms ease; will-change: transform, opacity; animation: firsttime 0.35s ease;"
                        >
                            <p v-if="story">{{ story }}</p>
                            <p>{{ question }}</p>
                        </div>
                    </div>
                    <div class="answer-con">
                        <div class="option" v-if="typeOfTest === 'multiple-choice'">
                            <button class="option-c" v-for="(choice,index) in options" :key="index" @click="getIDres(choice)">{{ choice }}</button>
                        </div>
                        <div class="true-false" v-else-if="(typeOfTest==='true-false') ">
                            <div class="true-false-c" @click="getIDres('true')" :class="btnsubmit ? 'disabled' : ''" :disabled="btnsubmit">True</div>
                            <div class="true-false-c" @click="getIDres('false')" :class="btnsubmit ? 'disabled' : ''" :disabled="btnsubmit">False</div>
                        </div>
                        <div v-else class="input-text">

                            <!-- <input v-if="quizMode === 'WINDOWCARD MODE'" type="number" :disabled="btnsubmit" v-model="inputanswer" autofocus > -->
                            <input type="text" :disabled="btnsubmit" v-model="inputanswer" autofocus >
                            <button @click="getIDres(inputanswer)" :class="btnsubmit ? 'disabled' : ''" :disabled="btnsubmit">Submit</button>
                        </div>
                        
                    </div>
                </div>
                <div class="test-area" v-else>
                    <div
                    style="display: flex; justify-content: center; align-items: center;"
                        :style="{
                            background: `conic-gradient(${color || '#7577ff'} ${persent}%, rgba(0,0,0,0) ${persent}%)`,
                            padding: '6px',
                            borderRadius: '10px',
                            transition: 'all 1s linear'
                        }"
                    >
                        <div class="card" style="background: white; border-radius: 8px; padding: 12px;">
                            <h2>Window Card Mode</h2>
                            <div class="q">
                                <p>{{ question.q1 }}</p>
                                <p>{{ question.operation }} {{ question.q2 }}</p>
                                <p></p>
                            </div>
                            <div class="input-text">
                                <input type="number" @keyup.enter="getIDres(inputanswer)" v-model="inputanswer" placeholder="Put your answer here." autofocus :disabled="btnsubmit">
                                <button @click="getIDres(inputanswer)" :class="btnsubmit ? 'disabled' : ''" :disabled="btnsubmit">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                    
        </main>
    </body>
    <div class="cluster-con" v-if="setting">
        <div class="cluster">
            <div class="header">
                <button @click="settingf()"><font-awesome-icon :icon="['fas', 'xmark']" size="lg" color="red"/></button>
            </div>
            <div class="body">
                <h3>MUSIC </h3>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                v-model="volume"
                @input="updateVolume"
                />
                <button @click="mutevol()"><font-awesome-icon icon="fa-solid fa-volume-high" size="xl" v-if="!mute"/> <font-awesome-icon icon="fa-solid fa-volume-xmark" size="xl" v-if="mute"/></button>
        </div>
            </div>
            
    </div>
</template>
<style scoped>
.top-setting-and-time-con{
    align-self: flex-end;

    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    /* width: 100%; */
    padding: 10px;
    box-sizing: border-box;

    gap: 1em;
    /* justify-self: flex-end; */
}
.timer-con p{
    margin: 0;
    font-weight: 700;
    color: white;
}
.timer-con{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: white;
    text-align: center;
    height: 35px;
    width: 100px;
    border-radius: 10px;
    background-color: #7577ff;
}
.clouds img{
    width: 100%;
    height: auto;
}
.clouds{
    width: 100%;
    overflow: hidden;
    display: flex;
    position: absolute;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    z-index: -1;
}
.timer-border{
    /* border: #7577ff 5px solid; */
    transition: all 1s linear;
    /* border-radius: 12px; */
}
.disabled{
    opacity: 0.6;
}
.time-left{
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: 700;
    color: white;
}
.q p{
    margin: 0;
}
.q{
    text-align: end;
    font-size: 40px;
    font-weight: 800;
    margin-top: auto;
    justify-self: center;
}
.card .input-text{
    justify-self: flex-end;
    margin-top: auto;
}
.input-text input::placeholder{
    color:white;
}
.test-area{
    /* background-color: #3f51b5; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 90%;
    height: 500px;
    background-color: white;
    /* border: #7577ff 5px solid; */
    padding: 10px;
}
.true-false{
    display: flex;
    flex-direction: column;
    gap:1em;
}
.setting{
    background-color: rgb(112, 112, 255);
    color: white;
    padding: 5px;
    border: none;
    border-radius: 10px;
}
.body button{
    background-color: transparent;
    border: none;
}
.cluster .header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.cluster .header button {
    background-color: transparent;
    border: none;
    margin: 0;
    align-self: flex-end;
}
.body{
    display: flex;

    justify-content: center;
    align-items: center;
}
.cluster{
    display: flex;
        flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 100px;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
}
.cluster-con{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0,0.1);
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.95rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.custom-table th {
  background: #3f51b5;
  color: white;
  padding: 10px;
  text-align: left;
}

.custom-table td {
  padding: 10px;
  border-top: 1px solid #ddd;
}

.custom-table tr:nth-child(even) {
  background: #f9f9f9;
}

.answer-con .input-text input:focus,.card .input-text input:focus{
    outline: white;
    
}
.answer-con .input-text input ,.card .input-text input{
    text-align: center;
    font-weight: 700;
    background-color:#8385eb;
    color: white;
    border: white 2px solid;
}
.answer-con .input-text input, .answer-con .input-text button,
.card .input-text input, .card .input-text button{
    height: 40px;
    border-radius: 10px;
}
.answer-con .input-text button,.card .input-text button{
    background-color:#8385eb;
    font-weight: 600;
    color: white;
    border: none;
    transition: 0.3s linear;
}
.answer-con .input-text button:hover,.card .input-text button:hover{
    transform: scale(1.03);
    transition: 0.3s linear;
    background-color:#7577ff;
}
.answer-con .input-text button:active,.card .input-text button:active{
    transform: scale(1);
    transition: 0.3s linear;
    background-color: rgb(62, 51, 218);
}
.answer-con .input-text, .card .input-text{
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.answer-con {
    position: fixed;
    bottom: 10px;
    left: 50%;          /* move left edge to middle of viewport */
    transform: translateX(-50%); /* shift element back by half its width */
    height: 30%;
    width: 90%;
}
header p {
    margin: 0;
    font-weight: 800;
    color: white;
}
.question-notable p{
    font-weight: 700;
    font-size: 20px;
    color:rgb(62, 51, 218) ;
}
.question p{
    font-weight: 600;
    font-size: 13px;
    color:rgb(62, 51, 218) ;
}
.question,.question-notable{
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}
body{
    /* background-image: url('/images/bg.png'); */
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
}
main{
    width: 80%;
    height: 100vh;
    /* background-color: white; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* box-shadow: 0 0 10px rgba(0,0,0,0.1); */
}
.charts {
    /* align-self: baseline; */
    position: absolute;
    top: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;      /* Set chart width */
    height: 200px;     /* Set chart height */
    /* justify-self: baseline; */
    
    background-color: #f9f9f9; /* Optional background */
    border-radius: 10px;       /* Rounded corners */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional shadow */
}
header{
    width: 100%;
    height: 7%;
    text-align: center;
    display: flex;
    flex-direction: column;
    /* padding: 20px; */
    background-color:#8385eb;
}
.timer{
    position: relative;
    bottom: 0;
    height: 5px;
    transition: all 1s linear;
}
.option {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns, width fits content */
    gap: 20px; /* space between buttons */
    justify-content: center; /* center the whole grid horizontally */
    align-items: center;     /* optional, center vertically if row height is taller */
    width: 100%;             /* full container width */
}
.true-false-c{
    color: white;
    display: flex;
    align-items: center;
    background-color: rgb(112, 112, 255);
    justify-content: center;
    height: 50px;
    border-radius: 5px;

}
.true-false-c:hover{
    transform: scale(1.02);
    transition: 0.2s linear;
}
.option-c {
    color: white;
    background-color: rgb(112, 112, 255);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s linear;
    animation: firsttime 0.3s 0.3s linear;
}
@keyframes firsttime {
    from{
        transform: scale(1.2);
    }
    to{
        transform: scale(1);

    }
}
.option-c:hover{
    transform: scale(1.1);
    transition: 0.3s linear;
}
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
@media screen and (min-width: 600px) and (max-width: 1023px){
    .option-c{
        height: 100px;
    }
}
@media screen and (min-width: 1024px){
    .option-c{
        height: 70px;
        font-size: 15px;
    }
    .charts{
        height: 250px;
        width: 400px;
    }
    .question{
        font-size: 25px;
    }
    .true-false{
        align-items: center;
    }
    .true-false-c{
        width: 500px;
    }
    .card{
        width: 400px;
    }
}
</style>
