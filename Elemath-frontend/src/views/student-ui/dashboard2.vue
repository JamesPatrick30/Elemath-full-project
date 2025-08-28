<script>
export default{
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
        }
    },
    methods:{
        sortgrade5(){
            const Array = this.lessons.filter(lesson => lesson.grade === 5);
            return Array;
        },
        sortgrade6(){
            const Array = this.lessons.filter(lesson => lesson.grade === 6);
            return Array;
        },
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
    <body>
        <header>
            <img class="profile" src="/characters/takos.png" alt="">
            <div class="textcon">
                <p class="welcome">Welcome Back!</p>
                    <p class="name">james</p>
                
                
            </div>
        </header>
        <main>
            <div class="con-main">
                <div class="join">
                    <div class="text-area-join">
                        <p class="jointxt">Join</p>
                    </div>
                    <img src="/images/LESSON2.png" alt="">
                </div>
                <!-- <div class="awards"></div> -->
            </div>
            <p class="title">Lessons</p>
            <p class="small-title">Grade 5</p>
            <div class="lesson-con">
                <div class="lesson" v-for="(value,index) in sortgrade5()" :key="index" @click="alertnof()">
                    <img src="/images/BOOK.png" alt="">
                        <p>{{value.topic}}</p>
                </div>
            </div>
            <p class="small-title">Grade 6</p>

            <div class="lesson-con">
                <div class="lesson" v-for="(value,index) in sortgrade6()" :key="index" @click="alertnof()">
                    <img src="/images/BOOK.png" alt="">
                        <p>{{value.topic}}</p>
                </div>
            </div>
        </main>
        <br>
        <br>
    </body>
</template>
<style scoped>
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
    /* background-color: rgb(243, 243, 243); */
    overflow-x: hidden;
    /* display: flex;
    flex-direction: column;
    align-items: center; */
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
}
</style>