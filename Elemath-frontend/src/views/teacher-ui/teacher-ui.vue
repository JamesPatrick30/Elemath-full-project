<script>
import { Pie } from 'vue-chartjs'
export default{
    components:{
        Pie
    },
    data(){
        return{
            students:[
                {name:'james',lrn:'875465423'},
                {name:'sophia',lrn:'875465424'},
                {name:'liam',lrn:'875465425'},
                {name:'olivia',lrn:'875465426'},
                {name:'noah',lrn:'875465427'},
                {name:'emma',lrn:'875465428'},
                {name:'lucas',lrn:'875465429'},
                {name:'ava',lrn:'875465430'},
                {name:'elijah',lrn:'875465431'},
                {name:'mia',lrn:'875465432'},
                {name:'logan',lrn:'875465433'},
                {name:'amelia',lrn:'875465434'},
                {name:'ethan',lrn:'875465435'},
                {name:'charlotte',lrn:'875465436'},
                {name:'mason',lrn:'875465437'},
                {name:'harper',lrn:'875465438'},
                {name:'jacob',lrn:'875465439'},
                {name:'evelyn',lrn:'875465440'},
                {name:'michael',lrn:'875465441'},
                {name:'abigail',lrn:'875465442'},
              

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
            }
        }
    }
}
</script>
<template>
    <body>
        <nav>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </nav>
        <main>
            <div class="con-m">
            <div class="header" style="grid-area: header;">
                <div class="image-contaner">
                    <img src="/images/frog2.png" alt="">
                </div>
                
                <div class="text-area">
                    <h3>welcome back. james</h3>
                    <h5>ID : 664232443</h5>
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
                 <Pie class="pie" :data="pieData" />
            </div>
        </div>
        </main>
        
    </body>
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.pie{
    height: 200px;
}
.statistic{
    height: 300px;
    margin: auto;
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
    background-color: #a8f5ff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.teach{
    position: relative;
    left: 150px;
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
    background-color: #dc7556;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.challenge{
    background-color: #e7bb41;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.quiz{
    color: white;
    background-color: #2a713d;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.windowcard{
    padding: 20px;
    background-color: #2d8bba;
    border-radius: 20px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}

.body .con-b{
    height: 90%;
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
    width: 100%;
    display: flex;
}
main{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
nav{
    height: 100%;
    width: 250px;
    background-color: aqua;
}
</style>