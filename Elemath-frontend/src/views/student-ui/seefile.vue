<script>
import api from '@/axios';
import loading from '../teacher-ui/components/loading.vue';
export default {
    name: 'seefile',
    components:{
        loading
    },
    data(){
        return {
            htmlLesson:'',
            audiosrc: "/musics/reviewmusic.mp3",
            volume:0.1,
            setting:true
        }
    },
    methods: {
        async lessonData(){
            try{
                const id = this.$route.query.lessonId;
                const res = await api.get('/dlesson/get',{
                    params:{
                        lessonId:id
                    }
                });
                this.htmlLesson = res.data.htmlLesson;
                // this.fileselectedID = id;
                // this.title = res.data.title;
                // this.lessonfile = res.data.file;
                // this.cluster = true;
                // this.summarize = res.data.summary;
                // console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        back(){
            this.$router.go(-1);
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
        settingf(){
            this.setting = !this.setting;
        },
    },
    mounted(){
        this.lessonData();
        document.body.addEventListener("click", this.unlockAudio, { once: true });
    }
}
</script>
<template>
    
    <audio
        ref="player"
        :src="audiosrc"
        autoplay
        loop
        muted
        ></audio>
    <body>
        <header>
            <button @click="back">back</button>
            <button @click="settingf">Settings</button>

        </header>
        <div class="bubbles">
            <img  src="/gif/bubbles.gif" alt="">
            <img  src="/gif/bubbles.gif" alt="">
            <img  src="/gif/bubbles.gif" alt="">
        </div>
        
        <img class="coral1" src="/gif/coral1.gif" alt="">
        <img class="coral2" src="/gif/coral2.gif" alt="">
    </body>
    <div class="file" v-html="htmlLesson" v-if="htmlLesson"></div>
        <loading v-else></loading>

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
                    <!-- <button @click="mutevol()"><font-awesome-icon icon="fa-solid fa-volume-high" size="xl" v-if="!mute"/> <font-awesome-icon icon="fa-solid fa-volume-xmark" size="xl" v-if="mute"/></button> -->
            </div>
        </div>
            
    </div>
</template>
<style scoped>
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
    background-color: #c1ff72;
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
/* for desktop */
@media screen and (min-width: 768px) {
    .coral1, .coral2{
        width: 250px;
    }
    .bubbles{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    
}
@media screen and (max-width: 767px) {
    .coral1, .coral2{
        width: 200px;
    }
    
}
/* @media screen and (min-width: 1024px) {
    .coral1{
        width: 2500px;
    }
    
} */
.bubbles{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    /* width: 300px; */
    height: auto;
    z-index: 1;
}
.coral2{
    position: fixed;
    bottom: 0;
    right: 0;
    /* width: 150px; */
    height: auto;
    z-index: 1;
}
.coral1{
    position: fixed;
    bottom: 0;
    left: 0;
    /* width: 150px; */
    height: auto;
    z-index: 1;
}
.file :deep(h2) {
    font-size: 24px;
}
.file :deep(p) {
    font-size: 14px;
}
.file :deep(h2, h3, h4, h5, h6) {
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
}
.file{
    width: 80%;
    max-width: 800px;
    position: absolute;
    top: 80px;
    background-color: rgba(193, 255, 114, 0.8);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 100px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    left: 50%;
    transform: translateX(-50%);
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
header{
    height: 30px;
    padding: 5px;
    background-color: #46bbff;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px;
    border-radius: 10px;
    border: black 2px solid;

    /* height: 20px; */
}
header button{
    border: black 2px solid;

    border-radius: 10px;
    font-size: 16px;
    padding: 4px;
    font-size: 15px;
    cursor: pointer;
    font-weight: bold;
    background-color: #7ed957;
    color: white;
    position: relative;
    z-index: 2;
}
body{
    position: fixed;
    background-color:#70cbff;
    /* padding: 20px; */
    /* background-color:#30b0fa; */
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 100%;
    min-height: 100vh;
}

</style>