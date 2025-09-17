<script>
import api from '@/axios';
import socket from '@/socket';
import greenbg from './components/greenbg.vue';
export default {
    name: 'dashboard3',
    components: {
        greenbg
    },
    data(){
        return{
            source: [
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                // {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
            ],
            currentInGrade5: 0,
            currentInGrade6: 0,
            currentInGrade7: 0,
            splaceCount:0,
            isMobile:null,
            lessons:[],
            cluster:false,
            uploadedLessons: [],
            name:'',
            lrn:'',
            profilepic:'',
            id:'',
            ongoing:false,
            title:'',
            volume:0,
            started:false,
            audiosrc: "/musics/lobbym.mp3",
            muted: false,

        }
    },
    methods: {
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
                    this.ongoing = true;
                }else{
                    this.ongoing = false;
                }
                this.ongoing = true;
            }catch(err){
                console.error('Error fetching quiz data:', err);
            }
        },
        // SeeNav() {
        //     this.isNavVisible = !this.isNavVisible;
        // },
        // handleResize() {
        //     this.isNavVisible = window.matchMedia('(min-width: 623px)').matches;
        // },
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
        get3(source) {
            return source.slice(0, this.splaceCount);
        },
        async getLessonList(){
            try{
                const res = await api.get('/dlesson/list');
                this.uploadedLessonsList();
                this.lessons = res.data;
                // console.log(res.data);
            }catch(err){
                console.log(err);
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
        sortgrade5(){
            const Array = this.lessons.filter(lesson => lesson.gradeLevel === 'Grade 5');
            return Array;
        },
        sortgrade6(){
            const Array = this.lessons.filter(lesson => lesson.gradeLevel === 'Grade 6');
            return Array;
        },
        randompics(){
            const pics = [
                '/characterUI/book2penguin.png',
                '/characterUI/bookcrock.png',
                '/characterUI/bookduck.png',
                '/characterUI/penguin.png',
                // '/characterUI/deer.png'
            ];
            const randomIndex = Math.floor(Math.random() * pics.length);
            return pics[randomIndex];
        },
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
                // await this.uploadedLessonsList();
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
    },
    mounted(){
        this.getdata();
        this.getLessonList();
        // console.log(socket.listeners('room-created').length);
        socket.removeAllListeners();
        document.body.addEventListener("click", this.unlockAudio, { once: true });

        socket.on('room-created', (data) => {
            this.ongiong = true; // Set ongoing status based on room creation
            console.log('Lobby data received:', data);
            // Handle lobby data here
        });
        socket.on('mode-deleted',(data) => {
            this.ongoing = false; // Reset ongoing status when mode is deleted
            console.log('Mode deleted:', data);
        });
        if(localStorage.getItem('volume')){
            this.volume = parseFloat( localStorage.getItem('volume') );
        }
        this.isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
        if(this.isMobile){
            this.splaceCount = 2;
        } else {
            this.splaceCount = 4;
        }
    },
    watch: {
        isMobile(newValue) {
            if (newValue) {
                this.splaceCount = 2;
            } else {
                this.splaceCount = 4;
            }
        }
    }
}
</script>
<template>
    <greenbg />
    <body>
        <header>
            <img class="logo" src="/images/logonobg.png" alt="">
            <div class="con-info">
                <img class="character" src="/characters/berry.png" alt="">
                <div class="info">
                    <p class="name">{{ name }}</p>
                    <p class="lrn">LRN: {{ lrn }}</p>
                </div>
                <font-awesome-icon class="menu-icon" icon="fa-solid fa-bars" />
            </div>
        </header>
        <main>
            <button class="main-button">
                <img class="button-icon-left" src="/gif/whalebtn.gif" alt="">
                <div class="txt">
                    <p>Quiz</p>
                    <small class="ongiong" v-if="ongoing">Join Now</small>
                </div>
                <!-- <p>Quiz</p> -->
                <img class="button-icon-right" src="/gif/turtlebtn.gif" alt="">
            </button>
            <!-- <p class="title-lessons">LESSON:</p> -->
            <p class="grade-title">Lessons</p>
            <div class="lesson-cons">
                <div v-if="uploadedLessons.length > 0" class="lessons" v-for="(value, index) in uploadedLessons" :key="index" @click="lessonData(value._id)">
                    <img class="lesson-pic" :src="randompics()" alt="">
                    <div class="con-title">
                        <p class="lesson-title">{{value.title}}</p>
                    </div>
                    <!-- <p>{{value.desc}}</p> -->
                </div>
                <div class="no-lessons" v-else>
                    <p>No uploaded lessons yet.</p>
                </div>
            </div>
            <p class="grade-title">Grade 5</p>
            <div class="lesson-cons">
                <div class="lessons" v-for="(value, index) in sortgrade5()" :key="index" @click="lessonData(value._id)">
                    <img class="lesson-pic" :src="randompics()" alt="">
                    <div class="con-title">
                        <p class="lesson-title">{{value.title}}</p>
                    </div>
                    <!-- <p>{{value.desc}}</p> -->
                </div>
            </div>
            <p class="grade-title">Grade 6</p>
            <div class="lesson-cons">
                <div class="lessons" v-for="(value, index) in sortgrade6()" :key="index" @click="lessonData(value._id)">
                    <img class="lesson-pic" :src="randompics()" alt="">
                    <div class="con-title">
                        <p class="lesson-title">{{value.title}}</p>
                    </div>
                    
                    
                    <!-- <p>{{value.desc}}</p> -->
                </div>
            </div>
        </main>
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
    
</template>
<style scoped>
.txt p{
    margin: 0;
    padding: 0;
}
.txt{
    text-align: center;
}
.grade-title{
    font-size: 20px;
    font-weight: 600;
    margin-top: 50px ;
    margin-bottom: 10px;
    /* align-self: flex-start; */
   
}
.no-lessons{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
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
.con-title{
    position: relative;
    top: -70px;
    z-index: 1;
    border-radius: 26px;

    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: flex-end;
    /* background-color: red; */
    padding: 0 5px;
    background-color: #cfe2f0;
    min-height: 150px;
    max-height: 150px;
    /* max-width: 130px; */
}
.lesson-title{
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 50px;
}
.con-title:hover {
    background-color: #e0eef8;

    cursor: pointer;
}

.lessons:has(.con-title:hover),.lessons:has(.lesson-pic:hover) {
    z-index: 3;
    transition: all 0.3s ease-in-out;
    transform: scale(1.05);
}
.lessons{
    z-index: 3;

    margin-top: 20px;
    margin-bottom: 20px;

    border-radius: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    transition: all 0.3s ease-in-out;
     max-height: 150px;
    min-width: 160px; 
    max-width: 180px;
}
.lesson-pic{
    position: relative;
    z-index: 2;

    top: 20px;
    height: 170px;
    /* width: 80px; */
}
.lesson-cons{
    /* padding: 10px; */
 
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    gap: 1em;
    height: fit-content;
    width: 90%;
    /* background-color: white; */
    margin-bottom: 10px;
    margin-top: 10px;
}
.title-lessons{
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0 10px 0;
    align-self: flex-start;
    margin-left: 20px;
}
.main-button p{
    position: relative;
    z-index: 1;
    /* top: -20px; */
    left: -60px;
    font-size: 24px;
    font-weight: 600;
}
.ongiong{
    /* position: relative; */
    /* font-size: 1px; */
    /* top: 5%; */
    /* bottom: 30px;
    left: 40px; */
    font-weight: 700;
    color: rgb(221, 57, 57);
}
.button-icon-right{
    margin-right: 0;
    position: relative;
    /* width: 100px; */
    z-index: 1;
    top: -30px;
    right: 50px;
    /* background-color: #00d1ff; */
}
.button-icon-left{
    transform: scaleX(-1);
    margin-left: 0;
    position: relative;
    z-index: 1;
    top: -50px;
    left: -50px;
}
.button-icon-left, .button-icon-right{
    /* margin-left: auto; */
    /* position: relative; */
    /* background-color: black; */
    /* top: -50px;
    right: -10px; */
    height: 200px;
    margin-bottom: 10px;
}
.main-button{
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;
    width: 90%;
    height: 100px;
    border: none;
    border-radius: 30px;
    background-color: #00d1ff;
    color: white;
    cursor: pointer;
}
main{
    padding-top: 40px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: white; */
    /* justify-content: center; */
    align-items: center;
    /* background-color: #f0f0f0; */
    flex-grow: 1;
    
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
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
    margin-left: auto;
    font-size: 20px;
    margin-right: 10px;
    /* color: #4CAF50; */
    cursor: pointer;
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
    max-width: 100%;
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    padding-right: 10px;
    /* padding-left: 10px; */
    /* background-color: #4CAF50; */
}
.character {
    border-radius: 50%;
    height: 50px;
    /* border: 2px solid white; */
}
.logo {
    height: 60px;
    margin-left: 10px;
}
.dashboard3 {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
}
body {
    overflow-x: hidden;
    scrollbar-width: thin;
    height: 100%;
    width: 100%;
    position: absolute;
    /* font-family: Arial, sans-serif; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    margin: 0;
    padding: 0;
}
@media screen and (min-width: 1024px) {
    main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
    }
    .lesson-pic{
        height: 230px;
    }
    .con-title{
        min-height: 180px;
        max-height: 200px;
        width: 100%;
    }
    .lesson-title{
        max-width: 80pc;
    }
    .lessons{
        margin-top: 100px;
        min-width:fit-content; 
        max-width: 230px
    }
    .main-button p{
        font-size: 24px;
        font-weight: 600;
    }
    .button-icon-right{
        margin-right: 0;
        position: relative;
        z-index: 1;
        top: -50px;
        right: -30px;
    }
    .button-icon-left{
        transform: scaleX(-1);
        margin-left: 0;
        position: relative;
        z-index: 1;
        top: -50px;
        left: -30px;
    }
    .button-icon-left, .button-icon-right{
        /* margin-left: auto; */
        /* position: relative; */
        /* background-color: black; */
        /* top: -50px;
        right: -10px; */
        height: 200px;
        margin-bottom: 10px;
    }
    .main-button{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        font-size: 16px;
        width: 90%;
        height: 100px;
        border: none;
        border-radius: 30px;
        background-color: #00d1ff;
        color: white;
        cursor: pointer;
    }
    .lesson-cons{
        height: fit-content;
        grid-template-columns: repeat(4, 1fr);
    }
    .grade-title{
        font-size: 30px;
        font-weight: 600;
        margin-top: 100px ;
        margin-bottom: 10px;
        /* align-self: flex-start; */
    
    }
}
</style>