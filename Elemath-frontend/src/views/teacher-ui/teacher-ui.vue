<script>
import api from '@/axios';
import { Pie } from 'vue-chartjs'
import VueApexCharts from 'vue3-apexcharts';
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
               currentProfile: ''
        };
    },
    methods: {
        async getData() {
            try {
                const res = await api.get('/data/teacher');
                this.user = res.data;
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
            const con = document.getElementsByClassName('profile-outer')[0];
            con.style.display = 'flex'; // or 'block', 'flex', etc.
            this.currentProfile = this.user.profile
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
                const con = document.getElementsByClassName('profile-outer')[0];
                con.style.display = 'none'; // or 'block', 'flex', etc.
                btn.disabled = false;
            }catch(err){
                console.log('Error is :' + err)
            }
        },
        // async trimdb(){
        //     try{
        //         const res = await api.post('/admin/trim-students');
        //         alert(res.data.message);
        //     }catch(err){
        //         console.log(err);
        //     }
        // }
    },
    mounted() {
        
        this.refreshtoken();
        // this.trimdb();
    }
};

</script>
<template>
    <div class="profile-outer">
        <div class="profile-con">
            <div class="profile">
                <img :src="currentProfile" alt="">
                <button @click="saveProfile()" class="btn-saveProfile">Save</button>
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
    <body v-if="user">
        <navbar />
        <main>
            <div class="con-m">
                <div class="header" style="grid-area: header;">
                    <div class="image-contaner" @click="picCharacter()">
                        <!-- <img :src="user.profile" alt=""> -->
                         <img :src="user?.profile" alt="profile">
                    </div>
                    
                    <div class="text-area">
                        <h3>welcome back. {{ user?.username }}</h3>
                        <h5>ID : {{ user?._id }}</h5>
                    </div>
                    
                </div>
                <div class="body"  style="grid-area: body;">
                    <div class="con-b">
                        <div id="mode" class="quiz" style="grid-area: quizmode;">
                            <h1>QUIZ MODE</h1>
                        </div>
                        <div id="mode" class="windowcard" style="grid-area: windowcard;">
                            <h1>Window Card</h1>
                            <img class="teach" src="/images/teach.png" alt="">
                        </div>
                        <div id="mode" class="challenge" style="grid-area: challenge;">
                            <h1>Challenge Mode</h1>
                        </div>
                        <div id="mode" class="lesson" style="grid-area: lesson;">
                            <h1>Lessons</h1>
                        </div>
                    </div>
                    
                </div>
                <div class="list" style="grid-area: list;">
                    <h1>Students</h1>
                    <div class="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>LRN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="student in students" :key="student.lrn">
                                    <td>{{ student.name }}</td>
                                    <td>{{ student.lrn }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="statistic" style="grid-area: statistic;">
                <h3>Class Chart</h3>
                <div class="con-ch">
                    <apexChart
                        class="pie"
                        type="pie"
                        :series="pieseries"
                        :options="pieoption"
                        width="300"
                        height="300"
                    />
                </div>
                    
                </div>
        </div>
        </main>
        
    </body>
    <loading v-else></loading>
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.btn-saveProfile{
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

    display: none;
    height: 100vh;
    width: 100vw;
    
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
    height: 100px;
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
}
main{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>