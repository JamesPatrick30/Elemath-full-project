<script>
import greenbg from './components/greenbg.vue';
import newnav from './components/newnav.vue';
export default{
    components:{
        greenbg,
        newnav
    },
    data(){
        return{
            navshow:false
        }
    },
    methods:{
        switchNav(){
            this.navshow = !this.navshow;
        }
    }
}
</script>
<template>
    <greenbg></greenbg>
    <body>
        <header>
            <img class="profile" src="/characters/takos.png" alt="" @click="switchNav">
            <div class="textcon">
                <p class="welcome">Welcome Back!</p>
                <p class="name">james</p>
            </div>
        </header>
        <div class="con">
            <div class="box">
                <div class="text">
                    <h3>Basic Info</h3>
                    <p>It’s the profile card of the system — the simple facts that identify you or the app.</p>
                </div>
                <img src="/images/Profile icon.png" alt="">
            </div>
            <div class="box">
                <div class="text">
                    <h3>Profile</h3>
                    <p>It’s basically your identity card inside the app</p>
                </div>
                <img src="/images/Profile icon.png" alt="">

            </div>
            <div class="box">
                <div class="text">
                    <h3>Music</h3>
                </div>
                

            </div>
        </div>
    </body>
    <newnav v-show="navshow"></newnav>
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
header{
    padding: 10px;
    /* border-radius: 10px; */
    width: fit-content;
    display: flex;
    /* background-color: white; */
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