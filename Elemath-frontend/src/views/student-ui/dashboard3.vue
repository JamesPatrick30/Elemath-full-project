<script>
import greenbg from './components/greenbg.vue';
export default {
    name: 'dashboard3',
    components: {
        greenbg
    },
    data(){
        return{
            source: [
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
                {pic:'/characterUI/penguin.png', title:' asasdasdasdasd asdasas', desc:'Description'},
            ],
            currentInGrade5: 0,
            currentInGrade6: 0,
            currentInGrade7: 0,
            splaceCount:0,
            isMobile:null
        }
    },
    methods: {
        get3(source) {
            return source.slice(0, this.splaceCount);
        }
    },
    mounted(){
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
                    <p class="name">Student Name</p>
                    <p class="lrn">LRN:</p>
                </div>
                <font-awesome-icon class="menu-icon" icon="fa-solid fa-bars" />
            </div>
        </header>
        <main>
            <button class="main-button">
                <img class="button-icon-left" src="/gif/whalebtn.gif" alt="">
                <p>Quiz</p>
                <img class="button-icon-right" src="/gif/turtlebtn.gif" alt="">
            </button>
            <p class="title-lessons">LESSON:</p>
            <p>lessons</p>
            <div class="lesson-cons">
                <div class="lessons" v-for="(value, index) in get3(source)" :key="index">
                    <img class="lesson-pic" :src="value.pic" alt="">
                    <p class="lesson-title">{{value.title}}</p>
                    <!-- <p>{{value.desc}}</p> -->
                </div>
            </div>
            <p>Grade 5</p>
            <div class="lesson-cons">
                <div class="lessons" v-for="(value, index) in get3(source)" :key="index">
                    <img class="lesson-pic" :src="value.pic" alt="">
                    <p class="lesson-title">{{value.title}}</p>
                    
                    <!-- <p>{{value.desc}}</p> -->
                </div>
            </div>
            <p>Grade 6</p>
            <div class="lesson-cons">
                <div class="lessons" v-for="(value, index) in get3(source)" :key="index">
                    <img class="lesson-pic" :src="value.pic" alt="">
                    <p class="lesson-title">{{value.title}}</p>
                    
                    <!-- <p>{{value.desc}}</p> -->
                </div>
            </div>
        </main>
    </body>
    
</template>
<style scoped>
.lesson-title{
    font-weight: 600;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 80px;
}
.lessons:hover{
    transition: all 0.3s ease-in-out;
    transform: scale(1.05);
    background-color: #a8e15e;
    cursor: pointer;
}
.lessons{
    border-radius: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    transition: all 0.3s ease-in-out;
    min-width: 100px;
    max-width: 100px;
    background-color: #cfe2f0;
}
.lesson-pic{
    height: 80px;
    width: 80px;
}
.lesson-cons{
    /* padding: 10px; */
    overflow-x: auto;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none;  /* For Internet Explorer and Edge */
    border-radius: 18px;
    display: flex;
    /* flex-direction: column; */
    gap: 1em;
    align-items: center;
    justify-content: center;
    width: 97%;
    min-height: 200px;
    max-height: 200px;
    /* padding-left: 10px; */
    background-color: white;
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
}
</style>