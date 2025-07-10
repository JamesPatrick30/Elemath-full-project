<template>
    <main>
        <div class="con-q">
            <nav>
                <ul>
                    <li><button class="nav-btn" @click="navClick('Settings')" :class="btnActive.setting? 'activeBtn' : 'not-active'">Settings</button></li>
                    <li><button class="nav-btn" @click="navClick('Question')" :class="btnActive.Question? 'activeBtn' : 'not-active'" >Question</button></li>
                    <li><button class="nav-btn" @click="navClick('file')" :class="btnActive.file? 'activeBtn' : 'not-active'">Upload file</button></li>
                </ul>
            </nav>
            <div class="con-settings" v-if="btnActive.setting">
                1
            </div>
            <div class="con-Questions" v-if="btnActive.Question">
                <select name="" id="" v-model="questionOption" >
                    <option value="Generate">Generate</option>
                    <option value="Costumize">Costumize</option>
                </select>


                <div class="con-generate" v-if="questionOption === 'Generate'">
                    <select class="t-o-q" v-model="questionGenerateSetting.type"  >
                        <option disabled value="">-- Select a type --</option>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="Costumize">Costumize</option>
                    </select>
                    <select name="Topic" class="t-o-q" v-model="questionGenerateSetting.topic" >
                        <option disabled value="">-- Select a Math Topic --</option>
                        <!-- Grade 5 Topics -->
                        <option disabled>Grade 5 Topics</option>
                        <option value="Place Value and Rounding">Place Value and Rounding</option>
                        <option value="Multiplying and Dividing Fractions">Multiplying and Dividing Fractions</option>
                        <option value="Operations on Decimals">Operations on Decimals</option>
                        <option value="Measurement (Length, Mass, Capacity)">Measurement (Length, Mass, Capacity)</option>
                        <option value="Volume and Surface Area of Solids">Volume and Surface Area of Solids</option>
                        <option value="Simple and Compound Interest">Simple and Compound Interest</option>
                        <option value="Interpreting Data and Graphs">Interpreting Data and Graphs</option>
                        <option value="Angles and Triangles">Angles and Triangles</option>

                        <!-- Grade 6 Topics -->
                        <option disabled>Grade 6 Topics</option>
                        <option value="Ratio and Proportion">Ratio and Proportion</option>
                        <option value="Percent and Its Applications">Percent and Its Applications</option>
                        <option value="Algebraic Expressions">Algebraic Expressions</option>
                        <option value="Patterns and Number Sequences">Patterns and Number Sequences</option>
                        <option value="Geometry of Solids">Geometry of Solids</option>
                        <option value="Statistics and Probability">Statistics and Probability</option>
                        <option value="Speed, Distance, and Time">Speed, Distance, and Time</option>
                        <option value="Problem Solving with Multi-step Word Problems">Problem Solving with Multi-step Word Problems</option>
                    </select>
                    <button class="generate-btn">Generate!</button>
                </div>
                <div v-if="questionOption === 'Costumize'">Costumize</div>
            </div>
            <div class="con-file" v-if="btnActive.file">
                3
            </div>
        </div>
      <div class="con-lobby">
        <nav>
            <ul>
                <li><button @click="navLobby('players')" :class="btnLobby.playes? 'activeBtn' : 'not-active'">Players</button></li>
                <li><button @click="navLobby('questions')" :class="btnLobby.Question? 'activeBtn' : 'not-active'" >Question</button></li>
                
            </ul>
        </nav>
        <div v-if="btnLobby.playes" class="con-p">
            <h3>Players : {{ players.length }}</h3>
            <div class="con-w-p" >
                <div class="players"v-for="(player, index) in players" :key="index" :draggable="true">{{ player.name }}</div>
                 
                
            </div>
            
        </div>
        <div v-if="btnLobby.Question" class="con-qs">
            questions
        </div>
      </div>
    </main>
    
</template>
<script>
export default{
    data(){
        return{
            btnActive:{setting:true,Question:false,file:false},
            btnLobby:{playes:false,Question:true},
            questionOption:'Costumize',

            players : [
                { name: 'James Patrick', lrn: '864178547844' },
                { name: 'Alyssa Mae', lrn: '712345678901' },
                { name: 'Marco Antonio', lrn: '623498713250' },
                { name: 'Elaine Grace', lrn: '912378452167' },
                { name: 'Jared Anthony', lrn: '834512967340' },
                { name: 'Sophia Heart', lrn: '789431258610' },
                { name: 'Liam Gabriel', lrn: '675849123045' },
                { name: 'Chloe Anne', lrn: '702134958712' },
                { name: 'Daniel Reyes', lrn: '834159762380' },
                { name: 'Isabella Cruz', lrn: '912367845912' },
                { name: 'Nathaniel Kyle', lrn: '691237845981' },
                { name: 'Mikaela Joy', lrn: '710298345712' },
                { name: 'Adrian Blake', lrn: '843215967124' },
                { name: 'Bianca Rose', lrn: '764839125601' },
                { name: 'Ethan Cruz', lrn: '875312964178' },
                { name: 'Alexa Faith', lrn: '793415289031' },
                { name: 'Zachary Neil', lrn: '681235794601' },
                { name: 'Jasmine Rae', lrn: '904378214678' },
                { name: 'Caleb Shawn', lrn: '823745190623' },
                { name: 'Nicole Bea', lrn: '745931280147' },
                ].sort((a, b) => a.name.localeCompare(b.name)),
            
            questionGenerateSetting:{type:'',topic:''}
        }
    },
    methods:{
        navClick(btn){
            this.btnActive.setting = false;
            this.btnActive.Question = false;
            this.btnActive.file = false;

            switch(btn){
                case 'Settings':
                    this.btnActive.setting = true;
                break;
                case 'Question':
                    this.btnActive.Question = true;
                break;
                case 'file':
                    this.btnActive.file = true;
                break;
            }
        },
        navLobby(btn){
            this.btnLobby.Question = false;
            this.btnLobby.playes=false;

            switch(btn){
                case 'players':
                    this.btnLobby.playes = true;
                break;
                case 'questions':
                    this.btnLobby.Question=true;
                break;
            }
        }
    }
}
</script>
<style scoped>
.generate-btn{
    border: none;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background-color: #82d7f5;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s linear;
}
.generate-btn:hover{
    background-color: #6ea6bb;
    transform: scale(1.1);
    transition: 0.3s linear;
}
.t-o-q{
    width: 50%;
}
.player{
    border-collapse: collapse;
    margin-top: 3px;
    background-color: white;
    height: 50px;
    padding: 1px;
    border-radius: 5px;
}
.con-p{
    height: inherit;
}
.players{
    border-radius: 10px;
    padding: 5px;
    height: 50px;
    background-color: white;
    margin-bottom: 5px;

    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    font-weight: bold;
    text-align:start;
    align-items: center;
    justify-items: center;
    transition: background-color 0.4s ease, transform 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

}
.players:hover{
  background-color: rgb(219, 219, 219);
  transform: translateY(-2px); /* optional lift effect */
}
.con-w-p,.con-qs {
    
    height: inherit;
    overflow-y: auto;
    scrollbar-width: none;
}
.con-generate{
    display: flex;
    flex-direction: column;
    padding: 20px;

    width: 100%;
    padding: 20px;
    gap: 10px;
}
select{
    height: 40px;
    width: 150px;
    font-size: 17px;

    border-radius: 10px;
    scroll-behavior: smooth;
    color: white;
    outline: none;
    border: none;
    background-color: #91eea5;
}
option{
    background-color: #b8ebc3;
    outline: none;
    border: none;
}
.con-settings,
.con-Questions,
.con-file{

    height: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;

}
.nav-btn{
    color: white;
}
.activeBtn{
    border-bottom: 3px solid black;
}
nav ul{
    display: flex;
}
li{
    list-style: none;
}
li button{
    border: none;
    background: none;
}
main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/bg.png'); /* Use public/ folder path */
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: -1;
}
main{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
}
.con-q,.con-lobby{
    height: 90%;
    width: 500px;
    padding: 20px;
    border-radius: 20px;
    background-color: #a7ddea;

    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
</style>