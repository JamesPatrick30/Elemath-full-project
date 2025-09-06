<script>
import api from '@/axios';
import { Pie } from 'vue-chartjs'
import socket from '@/socket';
import navbar from './components/navbar.vue';
import loading from './components/loading.vue';
export default {
    components: {
        Pie,
        navbar,
        loading,
    },
    data() {
        return {
            students: [
                { name: 'james', lrn: '875465423' }
            ],
            pieData: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                    {
                        label: 'Sample Pie',
                        data: [10, 20, 30],
                        backgroundColor: ['#fbaaa6', '#2d8bba', '#e7bb41'],
                    }
                ]
            },
            pieseries: [10, 20, 15],
            pieoption: {
                labels: ['asf', 'uj0', 'ouh']
            },
            lessons: [
                { topic: 'Whole Numbers', grade: 5 },
                { topic: 'Fractions', grade: 5 },
                { topic: 'Decimals', grade: 5 },
                { topic: 'Ratio and Proportion', grade: 5 },
                { topic: 'Percent', grade: 5 },
                { topic: 'Measurement (Length, Mass, Capacity)', grade: 5 },
                { topic: 'Geometry (Polygons, Perimeter, Area)', grade: 5 },
                { topic: 'Patterns and Algebra', grade: 5 },
                { topic: 'Statistics and Probability', grade: 5 },

                { topic: 'Integers', grade: 6 },
                { topic: 'Fractions and Decimals (Operations)', grade: 6 },
                { topic: 'Ratio, Proportion, and Percent', grade: 6 },
                { topic: 'Measurement (Area, Volume, Surface Area)', grade: 6 },
                { topic: 'Geometry (Angles, Circles, Solids)', grade: 6 },
                { topic: 'Patterns and Algebra (Simple Equations)', grade: 6 },
                { topic: 'Statistics and Probability (Graphs, Data Analysis)', grade: 6 }
            ],
            user:null,
            characters:[
                { name: 'robot', image: '/characters/robot.png' },
                { name: 'berry', image : '/characters/berry.png' },
                { name: 'blood', image: '/characters/blood.png' },
                { name: 'dragon', image: '/characters/dragon.png' },
                { name: 'Ele', image: '/characters/Ele.png' },
                { name: 'froggy', image: '/characters/froggy.png'},
                { name: 'green', image: '/characters/green.png'},
                { name: 'grey', image: '/characters/grey.png'},
                { name: 'kiss', image: '/characters/kiss.png'},
                { name: 'lazy', image: '/characters/lazy.png'},
                { name: 'longneck', image: '/characters/longneck.png'},
                { name: 'pickel', image: '/characters/pickel.png'},
                { name: 'rat', image: '/characters/rat.png'},
                { name: 'robot', image: '/characters/robot.png'},
                { name: 'slow', image: '/characters/slow.png'},
                { name: 'takos', image: '/characters/takos.png'},
                { name: 'think', image: '/characters/think.png'},
                { name: 'yellow', image: '/characters/yellow.png'},
               ],
               currentProfile: '',
               picCharacterb:false,
               titleQ:'',
               cluster:false,
               loadingB:true,
               lessonSwitch:false,
               lesson:''
        };
    },
    methods: {
        downloadPDF(){
            const element = document.querySelector('.lesson-content');
            if (!element) {
            alert('No lesson content to download');
            return;
            }
            
            // You'll need to install html2pdf library: npm install html2pdf.js
            import('html2pdf.js').then(html2pdf => {
            const options = {
                margin: 10,
                filename: `lesson-${Date.now()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf.default().from(element).set(options).save();
            }).catch(err => {
            console.error('Error loading html2pdf:', err);
            alert('PDF download feature is not available');
            });
        },
        clusterOn(title){
            this.titleQ = title;
            this.cluster = true; 
        },
        async createMode(id,mode){
            try{
                const res = await api.post('/create/mode',{
                    id:id,
                    mode:mode
                });
                alert(res.data.message);
                if(mode === 'WINDOWCARD MODE'){
                    this.$router.push({name:'window-card',query: { i: id }});
                    return;
                }else{
                    this.$router.push({name:'question-ui',query: { i: id }});
                }
                
            }catch(err){
                console.log(err);
                alert(err.response.data.message);
            }
        },
        async lessonData(id){
            try{
                const res = await api.get('/dlesson/get',{
                    params:{
                        lessonId:id
                    }
                });
                this.lesson = res.data.htmlLesson;
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        async getLessonList(){
            try{
                const res = await api.get('/dlesson/list');
                this.lessons = res.data;
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.getLessonList();
                this.user = res.data;
                this.loadingB = false;
                if( this.user.class.length == 0 ){
                    this.$router.push('/tc');
                }
                this.currentProfile = this.user.profile;
                console.log('Data fetched successfully:', res.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to fetch data. Please try again later.');
                }
            }
        },
        async refreshtoken(){
            try {
                const res = await api.post('/refresh-token');
                this.user = res.data;
                console.log('Token refreshed successfully:', res.data);
                await this.getData();
            } catch (err) {
                console.error('Error refreshing token:', err);
                if(err.response && err.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to refresh token. Please try again later.');
                }
            }
        },
        picCharacter(){
            this.picCharacterb = true;
            console.log('click');
        },
        changeProfile(img){
            this.currentProfile=img;
            console.log(img)
        },
        async saveProfile(){
            const btn = document.getElementsByClassName('btn-saveProfile');
            btn.disabled = true;



            try{
                const res = await api.post('/teacher/changeProfile',{
                    profile:this.currentProfile
                })
                alert('save!');
                await this.getData();
                console.log(res.data.message);
                this.picCharacterb = false;
                // const con = document.getElementsByClassName('profile-outer')[0];
                // con.style.display = 'none'; // or 'block', 'flex', etc.
                btn.disabled = false;
            }catch(err){
                console.log('Error is :' + err)
            }
        },
        sortgrade5(){
            const Array = this.lessons.filter(lesson => lesson.gradeLevel === 'Grade 5' || lesson.grade === 5);
            return Array;
        },
        sortgrade6(){
            const Array = this.lessons.filter(lesson => lesson.gradeLevel === 'Grade 6' || lesson.grade === 6);
            return Array;
        },
        formattedContent(content) {
            return content || '';
        },
    },
    mounted() {
        this.getData();
        socket.on('lobby', (data) => {
            console.log('Lobby data received:', data);
            // Handle lobby data here
        });
        socket.on("connection", () => {
            alert("Connected to server");
            console.log("Connected:", socket.id);
        });
        // this.refreshtoken();
        // this.trimdb();
    }
};

</script>
<template>
    <div class="profile-outer" v-if="lessonSwitch" >
        <div class="lesson-con">
            <nav class="lesson-nav">
                <button @click="lessonSwitch = false">Back</button>
                <button @click="downloadPDF" class="btn-download">Download as PDF</button>

                <!-- <button @click="createMode()">Create Lesson</button> -->
            </nav>
            <div class="lesson-content" v-html="formattedContent(lesson)"></div>
            
        </div>
        
    </div>
    <div class="profile-outer" v-if="cluster" >
        <div class="class-con">
            <button @click="cluster = false"><font-awesome-icon :icon="['fas', 'xmark']" size="lg"/></button>

            <h2>{{ titleQ }}</h2>
            <!-- TODO:FIX THE List -->
             <div class="con-class">
                <div class="class-s" v-for="classes in user?.class" :key="classes.Class_id" @click="createMode(classes.Class_id,titleQ)">
                    
                    <h1>
                        {{ classes.Class_name }}
                    </h1>
                </div>
             </div>
        </div>
    </div>
    <div class="profile-outer"  v-if="picCharacterb == true">
        <div class="profile-con" >
            <div class="profile">
                <img :src="currentProfile" alt="">
                <div class="btn-profile-con">
                    <button @click="saveProfile()" class="btn-saveProfile">Save</button>
                    <button @click="picCharacterb = false" class="btn-cancelProfile">Cancel</button>
                </div>
                
            </div>
            <div class="characters">
                <div class="character" @click="changeProfile(user?.googleprofile)" >
                    <img :src="user?.googleprofile" alt="">
                </div>
                <div class="character" v-for="character in characters" :key="character.image" @click="changeProfile(character.image)">
                    <img :src="character.image" alt="">
                </div>
            </div>
        </div>
    </div>
    <body v-if="!loadingB">
        <navbar class="navbar"/>
        <main>
            
            <header>
                <div class="image-contaner" @click="picCharacter()"> 
                        <!-- <img :src="user.profile" alt=""> -->
                        <img :src="user?.profile" alt="profile">
                    </div>
                    
                    <div class="text-area">
                        <p class="user-name">welcome back. {{ user?.username }}</p>
                        <p class="user-id">ID : {{ user?._id }}</p>
                    </div>
            </header>
            <div class="mode-con">
                <div class="mode mode-1" @click="clusterOn('QUIZ MODE')">
                    <h1>Quiz</h1>
                    <img src="../pic/undraw_quiz_zvhe.svg" alt="">
                </div>
                <div class="mode mode-2" @click="clusterOn('WINDOWCARD MODE')">
                    <h1>Window Card</h1>
                    <img src="../pic/undraw_math_ldpv.svg" alt="">
                </div>
            </div>
            <div class="leson-con">
                <div class="title">
                    <h1>Lessons</h1>
                </div>
                <h3>Grade 5</h3>
                <div class="lesson-list">
                    
                    <div class="lesson" v-for="(value,index) in sortgrade5()" :key="index" @click="lessonData(value._id); lessonSwitch = true;">
                        <img src="/images/BOOK.png" alt="">
                         <h4>{{value.title}}</h4>
                    </div>
                </div>
                <h3>Grade 6</h3>
                <div class="lesson-list">
                    
                    <div class="lesson" v-for="(value,index) in sortgrade6()" :key="index" @click="lessonData(value._id); lessonSwitch = true;">
                        <img src="/images/BOOK.png" alt="">
                         <h4>{{value.title}}</h4>
                    </div>
                </div>
                <br><br>
            </div>
        </main>
        
    </body>
    <loading v-else></loading>
</template>
<style scoped>
.lesson-content{
    padding: 10px;

}
.lesson-con{
    border-radius: 13px;
    scrollbar-width: thin;
    padding: 10px;
    background-color: rgb(235, 235, 235);
    overflow: auto;
    height: 80%;
    width: 80%;
}
.lesson-nav button{
    margin-left: 10px;
    cursor: pointer;
    width: 150px;
    height: 40px;
    background-color: #f17751;
    color: white;
    font-weight: 800;
    border-radius: 10px;
    border: none;
    font-size: 15px;
}
.lesson-nav{
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
}
.navbar{
    position: fixed;
    left: 0;
}
.lesson img{
    height: 100px;
}
.lesson:hover{
    background-color: #f17751;
    transform: scale(1.02);
}
.mode-1 img,.mode-2 img{
    height: 180px;
    margin-left: auto;
    display: block;
}
.mode-2{
    background-color: #64b7f6;
}
.mode-1{
    background-color: #96c470;
}
.mode:hover{
    transform: scale(1.02);
}
.mode{
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);

    color: white;
    padding: 10px;
    height: 100%;
    width: 100%;
    border-radius: 17px;
    display: flex;
    /* background-color: #2a713d; */
}
.mode-con{
    margin: 10px;
    height: 190px;
    width: 90%;
    display: flex;
    gap: 10px;
}
.lesson-list{
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}
.leson-con{
    width: 90%;
    height: fit-content;
}
.text-area{
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    /* background-color: #a8f5ff; */
}
.text-area .user-id{
    color: white;
    margin: 0;
    font-weight: 500;
}
.user-name{
    color: white;
    margin: 0;
    font-weight: 700;
}
header{
    margin-top: 10px;
    border-radius: 17px;
    height: fit-content;
    padding: 10px;
    width: 90%;
    background-color: #fbaaa6;
    display: flex;
    gap: 10px;
}
.class-con .con-class .class-s h1{
    color: white;
}
.class-con .con-class .class-s{
    cursor: pointer;
    border-radius: 10px;
    min-height: 200px;
    width: 450px;
    background: linear-gradient(90deg, #58a6ff 0%, #a8f5ff 100%);
    margin-bottom: 10px;
    margin-top: 10px;
    transition: 0.1s linear;
}
.class-con .con-class .class-s:hover{
    background: linear-gradient(90deg, #58a6ff 40%, #a8f5ff 100%);
    transform: scale(1.05);
    transition: 0.1s linear;
}
.class-con .con-class{
    list-style: none;
    gap: 10px;
    justify-self: end;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;

    height: calc(100% - 30px);
    width:100%;
    overflow: auto;
    scrollbar-width: none;
    /* background-color: #2a713d; */
}
.class-con button:hover{
    color: red;
}
.class-con button{
    height: fit-content;
    width: fit-content;
    border: none;
    background-color: transparent;
    align-self: flex-end;
    /* margin-right: 5px;s */
    left: auto;
    color: rgb(253, 89, 89);
}
.class-con{
    height: calc(100% - 100px);
    width: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: center;
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.btn-profile-con{
    display: flex;
    gap: 10px;
}
.btn-cancelProfile{
    cursor: pointer;
    width: 100px;
    height: 40px;
    background-color: rgb(255, 90, 90);
    color: white;
    font-weight: 800;
    border-radius: 10px;
    border: none;
    font-size: 15px;
}
.btn-saveProfile{
    cursor: pointer;
    width: 100px;
    height: 40px;
    background-color: greenyellow;
    color: white;
    font-weight: 800;
    border-radius: 10px;
    border: none;
    font-size: 15px;
}
.characters{
    margin-left: 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    min-height: 300px;
    width: fit-content;
    border-left: 1px solid #707070;
    
    
}
.characters .character img{
    border-radius: 50%;
    height: 50px;
    margin-left: 1em;
    transition: 0.3s;
    cursor: pointer;
}
.characters .character img:hover{
    transform: scale(1.2);
    transition: 0.3s;
}
.profile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.profile img{
    border-radius: 50%;
    height: 200px;
    padding: 50px;
}
.profile-outer .profile-con{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #282828;
    border-radius: 20px;
    min-height: 300px;
    min-width: 300px;
    position: relative;
    padding: 20px;
    z-index: 1000;
}
.profile-outer{

    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 3;
}
.logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
}
.con-ch{

    display: flex;
    text-align: center;
    justify-content: center;
    align-items: end;
}
.pie{
    display: flex;
    align-items: center;
    justify-content: center;

    height: 200px;
    width: 200px;
    
}
.statistic{

    padding: 10px;
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.table-scroll {
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #2d8bba #e0f7fa;
}

/* For Chrome, Edge, and Safari */
.table-scroll::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
    background: #e0f7fa;
}

.table-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #2d8bba 40%, #a8f5ff 100%);
    border-radius: 10px;
    border: 2px solid #e0f7fa;
}

.table-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #2d8bba 60%, #fbaaa6 100%);
}

.list{
    overflow: hidden;
    background-color: #a8f5ff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.teach{
    /* z-index: 1; */
    position: relative;
    left: 110px;
    bottom: 100px;
    height: 250px;
    width: auto;
}
#mode{
    height: 200px;
}
#mode:hover{
    background:100%;
    cursor: pointer;
    transition: 0.1s linear;
}
.image-contaner{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: end;
    background-color: white;
    border-radius: 50%;

    height: fit-content;
    width: fit-content;
}
.image-contaner img{
    border-radius: 50%;
    height: 80px;
}
.header{
    display: flex;
    justify-content: baseline;
    align-items: center;

    gap: 20px;
    color: white;
    padding: 20px;
    background-color: #fbaaa6;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.lesson{
    color: white;
    background-color: #dc7556;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* box-shadow: 0 4px 12px rgba(0,0,0,0.2); */
    text-align: center;
    transition: 0.1s linear;
}
.challenge{
    color: white;
    background-color: #e7bb41;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.quiz{
    color: white;
    background-color: #2a713d;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.windowcard{
    color: white;
    padding: 10px;
    background-color: #2d8bba;
    border-radius: 20px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}

.body .con-b{
    height: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        'quizmode windowcard'
        'challenge lesson';
    gap: 1em;
}
#item{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.con-m{
    height: 90%;
    width: 95%;
    background-color: rgb(235, 235, 235);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 2fr 2.5fr;
    grid-template-areas: 
        'header header list'
        'body body list'
        'body body statistic';
    gap: 1em;
}
body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
    /* align-items: end; */
    justify-content: end;
    overflow-x: hidden;
}
main{
    /* max-width: 250px; */
    height: fit-content;
    width: calc(100% - 250px);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

</style>