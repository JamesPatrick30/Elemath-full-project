<script>
import TreeComponent from '@/components/svg/IconTree1.vue';
import TreeComponent2 from '@/components/svg/IconTree2.vue';
import socket from '@/socket';
import api from '@/axios';
export default{
    components:{
        TreeComponent,
        TreeComponent2
    },
    data(){
        return{
            Colors: [
                '#FF5733',
                '#33FF57',
                '#3357FF',
                '#F1C40F',
                '#8E44AD',
                '#1ABC9C',
                '#E67E22',
                '#2ECC71',
                '#E74C3C',
                '#3498DB'
            ],
            players: [],
            roomId:this.$route.query.i,
            stillPlaying:0
        }
    },
    methods:{
        async getdata(){
            try{
                const res = await api.get('/get/mode/player/done',{
                    params:{
                        id:this.roomId
                    }
                });
                this.players = res.data.players.sort((a, b) => b.score - a.score);
                this.stillPlaying = res.data.playing;
                if(this.stillPlaying.length == 0){
                    try{
                        const res = await api.post('/mode/done');
                        alert(res.data.message);
                    }catch(err){
                        console.log(err);
                    }
                }
            }catch(err){
                console.log(err);
            }
        }
    },
    mounted(){
        this.getdata();
        socket.connect();
        socket.removeAllListeners();
        socket.on('player-done',(data)=>{
            this.getdata();
            // alert('done player');
            // console.log(data);
            // this.players.push(data);

        })
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
        <h1 class="title">Leader Board</h1>
        <div class="top-player">
            <div id="top">
                
                <div class="top2">
                    <img src="/characters/fly.png" alt="">
                    <p>Sanchez James Patrick L</p>
                    <div class="medal" id="medal2"><h1>2</h1></div>
                </div>
            </div>
            <div id="top">
                
                <div class="top1">
                    <img src="/characters/fly.png" alt="">
                    <p>Sanchez James Patrick L</p>
                    <div class="medal" id="medal1"><h1>1</h1></div>
                </div>
            </div>
            <div id="top">

                <div class="top3">
                    <img src="/characters/fly.png" alt="">
                    <p>Sanchez James Patrick L</p>
                    <div class="medal" id="medal3"><h1>3</h1></div>
                </div>
            </div>
        </div>
        <div class="playerstat">
                <div class="playerIn">
                    <p>✅ {{ players.length }} players done</p>
                </div>
                <div class="playerIn" id="playersep">
                    <p>🎮 {{ stillPlaying.length }} still playing</p>
                </div>
            </div>
        <div class="playes-con">
            
            <div class="player">
                <div class="name">
                    <p>Name</p>
                </div>
                <div class="score">
                    <p>Score</p>
                </div>
                <div class="time">
                    <p>Time</p>
                </div>
            </div>
            <div class="player" v-for="(player,index) in players" :key="index">
                <div class="name">
                    <p>{{ player.player }}</p>
                </div>
                <div class="score">
                    <p>{{ player.score }}</p>
                </div>
                <div class="time">
                    <p>{{ player.time }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
#playersep{
    /* background: #73a533; */

    border-left: #73a533 2px solid;
}
.playerstat{
    width: 60%;
    transition: 0.2s linear;
    margin-bottom: 10px;
    height: 70px;
    /* width: 100%; */
    display: flex;
    /* background-color: #412070; */
    background: #5e8130;

    border-radius: 20px;
}
.playerIn{
    height: 100%;
    width: 100%;
    text-align: center;
    align-content: center;
}
.playerIn p{
    color: white;
    font-weight: 800;
}
.title{
    color: white;
}
.name{
    display: flex;
    justify-content: center;
    align-items: center;
}
.score ,.time{
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.name p,.score p,.time p{
    color: white;
    font-weight: 800;
    font-size: large;
}
.name{
    width: 80%;
    height: 100%;
}
.score{
    width: 10%;
    height: 100%;
}
.time{
    width: 10%;
    height: 100%;
}
.player:hover{
    transform: scale(1.02);
    transition: 0.2s linear;
    /* background-color: #532e86; */
    background: #73a533;


}
.player{
    transition: 0.2s linear;
    margin-bottom: 10px;
    height: 70px;
    width: 100%;
    display: flex;
    /* background-color: #412070; */
    background: #5e8130;

    border-radius: 20px;
}
.playes-con{
    width: 60%;
    height: fit-content;
    /* background-color: #412070; */
}
#medal3{
    background-color: #a97142;
}
#medal2{
    background-color: #ced4da;
}
#medal1{
    background-color: #c9980b;
}
.medal h1{
    margin: 0;
    color: white;
}
.medal{
    height: 70px;
    width: 70px;
    position:relative;
    top: 30px;
    text-align: center;
    border-radius: 50%;
    
    display: flex;
    align-items: center;
    justify-content: center;
}
.top1{
    background-color: #412070;
    border: #c9980b 5px solid;
}
.top2{
    margin: 50px;
    /* height: 150px;
    margin-top: 10px; */
    border: #ced4da 5px solid;
}
.top3{
    margin: 100px;

    /* height: 100px;
    margin-top: 10px; */
    border: #a97142 5px solid;
}
.top1,.top2,.top3{
    /* background-color: #412070; */
    background: #895737;


    /* margin-top: 10px; */
    height: 240px;
    /* border: #c9980b 5px solid; */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px 10px 30% 30%;
    width: calc(100% - 20%);
}
#top p{
    color: white;
    font-weight: 800;
}
#top img{

    width: calc(100% - 30%);
    height: auto;
    border-radius: 50%;
}
#top{
    width: calc(100% / 3);
    height: 100%;
    /* border: rgb(252, 4, 4) 1px solid; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}
.top-player{
    width: 40%;
    height: 500px;
    display: flex;
}

main{
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    scrollbar-width: thin;
    /* scrollbar-width: none; */
    /* background-color: black; */
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
@media (max-width: 600px){
    .top-player{
        width: 100%;
    }
}
</style>