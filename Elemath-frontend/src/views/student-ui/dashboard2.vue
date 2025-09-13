<script>
import socket from '@/socket';
import api from '@/axios';
import newnav from './components/newnav.vue';
export default{
    components:{
        newnav
    },
    data(){
        return{
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
            started:false,
            navshow:false,
            id:'',
            cluster:false,
            ongiong: false, // This should be set based on your logic
            profilepic:'',
            title:'Cluster Mode',
            summarize:'Cluster Mode is On',
            name: '', // Replace with actual data
            lrn: '', // Replace with actual data
            uploadedLessons: [],
            cancelPractice:false,
            lessonfile:'',
            fileId:'',
            loadquiz:false,
            audiosrc: "/musics/lobbym.mp3",
            muted: false,
            volume: 0.5,
            controller:null,
            // setting:false,
            isNavVisible: window.matchMedia('(min-width: 623px)').matches // Responsive nav visibility
        }
    },
    methods:{
        async lessonData(id){
            try{
                this.fileId = id;
                const res = await api.get('/dlesson/get',{
                    params:{
                        lessonId:id
                    }
                });
                this.title = res.data.title;
                this.lessonfile = res.data.file;
                this.cluster = true;
                this.summarize = res.data.summary;
                // console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        sortgrade5(){
            const Array = this.lessons.filter(lesson => lesson.gradeLevel === 'Grade 5');
            return Array;
        },
        sortgrade6(){
            const Array = this.lessons.filter(lesson => lesson.gradeLevel === 'Grade 6');
            return Array;
        },
        switchNav(){
            this.navshow = !this.navshow;
        },
        JoinBtn(){
            this.lookforQuiz();
            if(this.started){
                alert('the quiz started');
                return;
            }
            if(this.ongiong){
                this.$router.push({ name: 'waiting-lobby',query: { i: this.id } });
            }else{
                alert('No ongoing quiz available.');
            }
        },
        async uploadedLessonsList(){
            try{
                const res = await api.get('/dlesson/uploadedlessons');
                this.uploadedLessons = res.data;
                // console.log('uploaded lessons : '+res.data);
            }catch(err){
                console.log(err);
            }
        },
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.getLessonList();
                this.name = response.data.name || 'John Doe';
                this.lrn = response.data.lrn || '1234567890';
                this.profilepic = response.data.profile; // Default profile picture
                this.id = response.data.classId._id; // Assuming the student ID is returned
                // console.log('Student ID:', this.id);
                await this.lookforQuiz();
                await this.uploadedLessonsList();
                socket.connect();
            } catch (error) {
                console.error('Error fetching student data:', error);
                if(error.response && error.response.status === 401) {
                    this.$router.push('/');
                } else {
                    alert('Failed to fetch data. Please try again later.');
                }
            }
        },
        async lookforQuiz(){
            try{
                
                const res = await api.get('/get/mode',{
                    params: {
                        id: this.id
                    }
                });

                if(res.data.started === true){
                    this.started = true;
                }else{
                    this.started = false;
                }
                if(res.data.quiz === true){
                    this.ongiong = true;
                }else{
                    this.ongiong = false;
                }
            }catch(err){
                console.error('Error fetching quiz data:', err);
            }
        },
        SeeNav() {
            this.isNavVisible = !this.isNavVisible;
        },
        handleResize() {
            this.isNavVisible = window.matchMedia('(min-width: 623px)').matches;
        },
        async getLessonList(){
            try{
                const res = await api.get('/dlesson/list');
                this.lessons = res.data;
                // console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        async getQuestions(){
            try{
                const res12 = await api.post('/create-question',{
                    fileId:this.fileId,
                    num_questions:10,
                    language:'English',
                    difficulty:'easy',
                    question_type:'multiple-choice'
                },
            {
            signal: this.controller.signal
          });
                return res12.data.quiz;
                // console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        async playQuiz(){
            this.cancelPractice = false;
            this.loadquiz = true;
            try{
                // const res12 = await api.post('/create-question',{
                //     fileId:this.fileId,
                //     num_questions:10,
                //     language:'English',
                //     difficulty:'easy',
                //     question_type:'multiple-choice'
                // });
                let res12 = null;
                do{
                    res12 = await this.getQuestions();
                    if(this.cancelPractice){
                        this.loadquiz = false;
                        return;
                    }
                    
                }while(this.loadquiz && (!res12 || res12.length === 0|| res12.some(q => !q.question || !q.options || q.options.length < 2 || !q.answer)));
                // console.log(res12.data);
                if(this.cancelPractice){
                    this.loadquiz = false;
                    return;
                }
                const res = await api.post('/create/mode/practice', {
                    quiz: res12
                });
                this.$router.push({ name: 'practicemode' });
                // alert(res.data.message);
                // this.cluster = false;
                // this.ongiong = true;
                // this.$router.push({ name: 'waiting-lobby',query: { i: this.id } });
            }catch(err){
                console.log(err);
            }
            this.loadquiz = false;
            
        },
        unlockAudio() {
            const player = this.$refs.player;
            player.muted = false;
            player.volume = this.volume;
            player.play().catch(err => console.warn("Still blocked:", err));
        },
        cancelRequest() {
            if (this.controller) {
                this.controller.abort();
                this.controller = null;
                this.cancelPractice = true;
                this.loadquiz = false;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.getdata();
        this.lookforQuiz();
        console.log(socket.listeners('room-created').length);
        socket.removeAllListeners();
        document.body.addEventListener("click", this.unlockAudio, { once: true });

        socket.on('room-created', (data) => {
            this.ongiong = true; // Set ongoing status based on room creation
            console.log('Lobby data received:', data);
            // Handle lobby data here
        });
        socket.on('mode-deleted',(data) => {
            this.ongiong = false; // Reset ongoing status when mode is deleted
            console.log('Mode deleted:', data);
        });
        if(localStorage.getItem('volume')){
            this.volume = parseFloat( localStorage.getItem('volume') );
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>
<template>
        <audio ref="player" :src="audiosrc" loop autoplay muted></audio>

    
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
    
    <body>
        <header>
            <img class="profile" :src="profilepic" alt="" @click="switchNav">
            <div class="textcon">
                <p class="welcome">Welcome Back!</p>
                <p class="name">{{ name }}</p>
            </div>
        </header>
        <main>
            <div class="con-main">
                <div class="join" @click="JoinBtn()">
                    <div class="text-area-join" >
                        <p class="jointxt">Join</p>
                        <p class="ongiong" v-if="ongiong">Join Now</p>

                    </div>
                    <img src="/images/LESSON2.png" alt="">
                </div>
                <!-- <div class="awards"></div> -->
            </div>
            <p class="title">Lessons</p>
            <p class="small-title">Uploaded Files</p>
            <div class="lesson-con">
                <div class="no-lessons" v-if="uploadedLessons.length === 0">
                    <p>No uploaded lessons available.</p>
                </div>
                <div v-else class="lesson" v-for="(value,index) in uploadedLessons" :key="index" @click="lessonData(value._id)">
                    <img src="/images/BOOK.png" alt="">
                        <p>{{value.title}}</p>
                </div>
            </div>
            <p class="small-title">Grade 5</p>
            <div class="lesson-con">
                <div class="lesson" v-for="(value,index) in sortgrade5()" :key="index" @click="lessonData(value._id)">
                    <img src="/images/BOOK.png" alt="">
                        <p>{{value.title}}</p>
                </div>
            </div>
            <p class="small-title">Grade 6</p>

            <div class="lesson-con">
                <div class="lesson" v-for="(value,index) in sortgrade6()" :key="index" @click="lessonData(value._id)">
                    <img src="/images/BOOK.png" alt="">
                        <p>{{value.title}}</p>
                </div>
            </div>
        </main>
        <br>
        <br>
    </body>
    <div class="cluster-con" v-if="cluster">
        <div class="cluster" >
            <header>
                <button @click="cluster = false"><font-awesome-icon :icon="['fas', 'xmark']" size="lg" color="red"/></button>
                <p>{{ title }}</p>
            </header>
            <p>{{ summarize }}</p>
            <button class="play-quiz-btn" @click="playQuiz()">Practice Test</button>
        </div>
    </div>
    <div class="cluster-con" v-if="loadquiz">
        <div class="load-con">
            <div>
                <img src="/gif/loadingbox.gif" alt="Loading..." />
                <p>Loading Quiz...</p>
            </div>
            <button @click="cancelRequest()">Cancel</button>
        </div>
    </div>
    <newnav :info="{name:name,profile:profilepic}" v-show="navshow"></newnav>

</template>
<style scoped>
.load-con img{
    height: 100px;
    width: 100px;
}
.load-con button{
    border: #ff4444 1px solid;
    background-color: #ff4444;
    color: white;
    height: 40px;
    width: 100px;
    /* border: none; */
    font-weight: 800;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
}
.load-con div p{
    color: #4CAF50;

    font-weight: 700;
    font-size: 20px;
    text-align: center;
    animation: alternate 4s infinite;
}
@keyframes alternate {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
.load-con div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.load-con{
    padding: 10px;
    background-color: white;
    border-radius: 10px;
     display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.no-lessons{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    color: gray;
    font-weight: 600;
}
.play-quiz-btn:hover{
    color: #4CAF50;
    border: #4CAF50 1px solid;
    background-color: white;
    transition: all 0.3s ease;

}
.play-quiz-btn{
    border: #4CAF50 1px solid;
    background-color: #4CAF50;
    color: white;
    /* border: none; */
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
}
.cluster header p{
    font-size: 15px;
    font-weight: 800;
    margin: 0;
    padding: 0;
    text-align: center;
    color: black;}
.cluster header button{
    background-color: transparent;
    border: none;
    left: auto;
    align-self: flex-end;
}
.cluster header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 10px;
    width: 90%;
    color: black;
    border-radius: 10px;
}
.cluster{
    background-color: rgb(241, 241, 241);
    width: 300px;
    padding: 10px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}
.cluster-con{
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: rgba(90, 90, 90, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
newnav{
    width: 200px;
}
.ongiong{
    position: relative;
    font-size: 20px;
    /* top: 5%; */
    bottom: 30px;
    left: 40px;
    font-weight: 700;
    color: rgb(221, 57, 57);
}
.join .text-area-join .jointxt{
    position: relative;
    font-size: 50px;
    top: 5%;
    left: 40px;
    font-weight: 700;
    color: rgb(255, 255, 255);
}
.join .text-area-join{
    text-align: center;
}
.join img{
    height: 180px;
    position:relative;
    left: 20%;
    top: -20px;
    
}
.lesson img{
    height: 100px;
}
.lesson:hover{
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    /* transform: scale(1.05); */
      background-color: rgb(240, 240, 240);

    transition: all 0.3s ease;
}
.lesson p{
    color: black;
    height: 100px;
    overflow: hidden;
    font-weight: 600;
}
.small-title{
    font-size: 15px ;
    font-weight: 800;
}
.title{
    align-self: baseline;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 800;
}
.lesson-con {
  width: 95%;
  height: 220px;

  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scrollbar-width: thin;
  scroll-snap-type: x mandatory; /* enables snap */
  -webkit-overflow-scrolling: touch; /* smoother on mobile */
}

.lesson {
    cursor: pointer;
  flex: 0 0 150px; /* fixed width slide */
  height: 200px;
  background-color: white;
  margin-right: 10px;
  scroll-snap-align: start; /* snap to start of container */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  font-size: 20px;
  text-align: center;
  overflow: hidden;
}
body{
    position: absolute;
    z-index: 1900;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    scrollbar-width: thin;
}
main{
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}
.awards{
    border-radius: 40px;
    background-color: azure;
}
.join{
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    display: flex;
    border-radius: 40px;
    height: 100%;
    background-color: #53e1fd;
}
.con-main{
    margin-top: 10px;
    width: 95%;
    height: 200px;
    /* height: fit-content; */
    /* display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px; */
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
    color: rgb(110, 110, 110);
}
.name{
    /* margin: 0; */
    
    font-weight: 700;
    font-size: 15px;
    /* color: white; */
}
.profile{
    height: 50px;
    border-radius: 50%;
}
header{
    padding: 10px;
    /* border-radius: 10px; */
    width: fit-content;
    display: flex;
    /* background-color: white; */
}

.background{
    position: fixed;
    z-index: -1;
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
    .con-main{
        height: 360px;
    }
    .join img{
        height: 320px;

        /* left:-10px; */
        right: -10px;

    }
    .join .text-area-join .jointxt{
        font-size: 70px;
        left: 100px;
    }
}
@media screen and (min-width: 1024px){
    .con-main{
        height: 300px;
    }
    .join img{
        height: 300px;
        /* justify-self: end; */
        left:65%;
        /* right: 0 */
    }
    .join .text-area-join .jointxt{
        font-size: 70px;
        left: 100px;
    }
    .title{
        font-size: 45px;
    }
    .small-title{
        font-size: 30px;
    }
    .lesson{
        flex: 0 0 250px; /* fixed width slide */
        height: 300px;
        font-size: 23px;
    }
    .lesson img{
        height: 150px;
    }
    .lesson-con{
        height: 314px;
    }
    .cluster header p{
        font-size: 20px;
        font-weight: 800;
        margin: 0;
        padding: 0;
        text-align: center;
        color: black;
    }
    .cluster{
        width: 400px;
        padding: 20px;
    }
}
</style>