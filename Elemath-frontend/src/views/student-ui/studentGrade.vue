<script>
import api from '@/axios';
import header1 from './components/header.vue';
import greenbg from './components/greenbg.vue';
import { nextTick } from 'vue';
export default{
    name: 'studentGrade',
    components: {
        greenbg,
        header1
    },
    data(){
        return{
            username:'',
            profile:'',
            lrn:'',
            audiosrc:'/musics/lobbym.mp3',
            volume:0,
            source:[
                {mode:'Module 1', grade:'95%'},
                {mode:'Module 2', grade:'88%'},
                {mode:'Module 3', grade:'92%'},
                {mode:'Module 4', grade:'85%'},
                {mode:'Module 5', grade:'90%'},
                {mode:'Module 6', grade:'87%'},
                {mode:'Module 7', grade:'93%'},
                {mode:'Module 8', grade:'89%'},
                {mode:'Module 9', grade:'94%'},
                {mode:'Module 10', grade:'75%'},
            ],
            index:0,
            isMobile:null,
        }
    },
    mounted(){
        const player = this.$refs.player;
        player.volume = this.volume;

        player.play();
        player.muted = false;
        if(localStorage.getItem('volume')){
            this.volume = parseFloat( localStorage.getItem('volume') );
        }
        this.getdata();
        this.isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
        if(this.isMobile){
            this.index = 0;
        } else {
            this.index = this.source.length > 5 ? this.source.length - 5 : 0;
        }
    },
    watch: {
        isMobile(newValue) {
            if (newValue) {
                this.index = 0;
            } else {
                this.index = this.source.length > 5 ? this.source.length - 5 : 0;
            }
        }
    },
    methods:{
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.username = response.data.name || 'John Doe';
                this.profile = response.data.profile;
                this.lrn = response.data.lrn || '123456789012';
                console.log('Student ID:', response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        },
        updateVolume() {
            this.$refs.player.volume = this.volume;
            localStorage.setItem('volume', this.volume);
        },
        nextTick(){
            if(this.index < this.source.length - 5){
                this.index++;
            }
        },
        prevTick(){
            if(this.index > 0){
                this.index--;
            }
        },
        gradeColor(grade) {
            const numericGrade = parseFloat(grade);
            if (numericGrade >= 90) return '#4caf50'; // Green
            if (numericGrade >= 80) return '#ffeb3b'; // Yellow
            if (numericGrade >= 70) return '#ff9800'; // Orange
            return '#f44336'; // Red
        },
        gradelist(grades){
            if(this.isMobile){
                return grades.slice(this.index, this.index + 5);
            }
            return grades;
        }
    }
}
</script>
<template>
    <greenbg />
   
    <body>
        <audio ref="player" :src="audiosrc" loop></audio>
        <header1 :info="{name:username,profile:profile,lrn:lrn}" ></header1>
        <main>
            <div class="container">
                <button @click="prevTick"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
                <div class="con-grade">
                    <div class="grade-head">
                        <div class="grade" v-for="(item, index) in gradelist(source)" :key="index">
                            <p>{{ item.mode }}</p>
                        </div>
                    </div>
                    <div class="grade-body">
                        <div class="grade" v-for="(item, index) in gradelist(source)" :key="index" :style="{backgroundColor: gradeColor(item.grade)}">
                            <p>{{ item.grade }}</p>
                        </div>
                    </div>
                    <div class="average">
                        <h2>Average Grade: 
                            {{
                                (source.reduce((acc, curr) => acc + parseFloat(curr.grade), 0) / source.length).toFixed(2) + '%'
                            }}
                        </h2>
                    </div>
                </div>
                <button @click="nextTick"><font-awesome-icon icon="fa-solid fa-arrow-right" /></button>

            </div>
            
            <!-- <div class="container">
                <h1>Grade</h1>
            </div> -->
        </main>
    </body>
</template>
<style scoped>
.container button{
    background-color: transparent;
    border: none;
    font-size: 24px;
    width: 37px;
    cursor: pointer;
    user-select: none;
    color: #555;
    transition: color 0.3s;
}
.container{
    display: flex;
    /* flex-direction: column; */
    align-items: center;
        background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.grade{
    font-size: 10px;
    font-weight: 700;
    width: 100%;
    height: 60px;
    text-align: center;
}
.grade-head, .grade-body{
    /* background-color: aqua; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
.con-grade{
    width: 90%;
    height: auto;

    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    /* background-color: white; */
}
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* font-family: 'Poppins', sans-serif; */
  /* background-color: #f0f4f8; */
}
@media screen and (min-width: 1024px) {
    main {
        margin-top: 80px;
    }
    .container button{
        /* display: block; */
        /* background-color: tomato; */
        display: none;
    }
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        max-width: 1200px;
    }
    .grade{
        font-size: 14px;
        /* height: 80px; */
    }
    .con-grade{
        width: 100%;
    }
}
</style>