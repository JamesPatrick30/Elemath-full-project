<script>
import greenbg from './components/greenbg.vue';
import newnav from './components/newnav.vue';
import api from '@/axios';
import latestnav from './components/latestnav.vue';
export default{
    components:{
        greenbg,
        newnav,
        latestnav
    },
    data(){
        return{
            navshow:false,
            profile:'',
            username:'',
            audiosrc:'/musics/lobbym.mp3',
            volume:0,
            lrn:''
        }
    },
    methods:{
        switchNav(){
            this.navshow = !this.navshow;
        },
        gotorouter(name){
            if(!name) return alert('this feature is not avalable');
            this.$router.push({name:name});
        },
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.username = response.data.name || 'John Doe';
                this.profile = response.data.profile;
                this.lrn = response.data.lrn || '123456789012';
                console.log('Student ID:', response.data);
                await this.lookforQuiz();
                socket.connect();
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        },
        updateVolume() {
            this.$refs.player.volume = this.volume;
            localStorage.setItem('volume', this.volume);
        },
    },
    mounted(){
        this.getdata();
        const player = this.$refs.player;
        player.volume = this.volume;

        player.play();
        player.muted = false;
        if(localStorage.getItem('volume')){
            this.volume = parseFloat( localStorage.getItem('volume') );
        }
    }
}
</script>
<template>
    <audio ref="player" :src="audiosrc" loop autoplay muted></audio>
    <greenbg></greenbg>
    <body>
        <header>
            <img class="logo" src="/images/logonobg.png" alt="">
            <div class="con-info">
                <img class="character" :src="profile" alt="">
                <div class="info">
                    <p class="name">{{ username }}</p>
                    <p class="lrn">LRN: {{ lrn }}</p>
                </div>
                <font-awesome-icon @click="switchNav()" class="menu-icon" icon="fa-solid fa-bars" />
            </div>
        </header>
        <div class="con">
            <div class="box" @click="gotorouter('basicInfo')">
                <div class="text">
                    <h3>Basic Info</h3>
                    <p>It’s the profile card of the system — the simple facts that identify you or the app.</p>
                </div>
                <img src="/images/proIcon.png" alt="">
            </div>
            <!-- <div class="box">
                <div class="text">
                    <h3>Profile</h3>
                    <p>It’s basically your identity card inside the app</p>
                </div>
                <img src="/images/Profile icon.png" alt="">

            </div> -->
            <div class="box">
                <div class="text">
                    <h3>Music</h3>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        v-model="volume"
                        @input="updateVolume"
                        />
                </div>
                <img src="/images/music icon.png" alt="">
                

            </div>
            <div class="box" @click="gotorouter('reports')">
                <div class="text">
                    <h3>Report a Problem</h3>
                    <p>Found a problem? Let us know so we can fix it!</p>
                </div>
                <img src="/images/reportprob.png" alt="">

            </div>
        </div>
    </body>
    <latestnav v-show="navshow"></latestnav>

</template>
<style scoped>
.box {
    
    position: relative;
}
.box img {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 120px;
}
.text p{
    font-size: 10px;
    width: 130px;
}
.text{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: aqua; */
    margin-left: 10px;
}
.text h3 ,.text p{
    margin: 0;
}
.box:hover{
    transform: scale(1.01);
    transition: 0.2s;
}
.box{
    transition: 0.2s;
    border-radius: 10px;
    width: 90%;
    height: 120px;
    background-color: white;
    display: flex;
}
.con{
    /* background-color: aliceblue; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.welcome,.name{
    margin: 0;
    padding: 0;
    margin-left: 10px;
}
.welcome{
    font-size: 10px;
    color: rgb(122, 122, 122);
}
.name{
    /* margin: 0; */
    
    font-weight: 700;
    font-size: 15px;
}
.profile{
    height: 50px;
    border-radius: 50%;
}
.info{
    margin-left: 10px;
}
.lrn{
    font-weight: 500;
    font-size: 14px;
}
.name{
    font-weight: 600;
    font-size: 18px;
}
.lrn, .name{
    margin: 0;
    padding: 0;
}
.menu-icon{
z-index: 100;
    margin-left: auto;
    font-size: 20px;
    margin-right: 10px;
    /* color: #4CAF50; */
    cursor: pointer;
}
.character {
    border-radius: 50%;
    height: 50px;
    /* border: 2px solid white; */
}
.con-info{
    display: flex;
    /* justify-items: center; */
    align-items: center;
    border-radius: 20px;
    margin-left: auto;
    width: calc(100% - 90px);
    background-color: white;
    font-size: 20px;
    padding: 5px;
}
header {
    z-index: 100;
    max-width: 98%;
    min-width: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    padding-right: 10px;
    /* padding-left: 10px; */
    /* background-color: #4CAF50; */
}
.logo {
    height: 60px;
    margin-left: 10px;
}
body{
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow-y: hidden;
}
@media screen and (min-width: 600px) and (max-width: 1023px){
    .box{
        width: 300px;
        height: 120px;
    }
}
@media screen and (min-width: 1024px){
    .box{
        width: 400px;
        height: 120px;
    }
}
</style>