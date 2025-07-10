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
                    <select name="" id="" v-model="questionOption" >
                    <option value="Generate">Generate</option>
                    <option value="Costumize">Costumize</option>
                </select>
                <select name="" id="" v-model="questionOption" >
                    <option value="Generate">Generate</option>
                    <option value="Costumize">Costumize</option>
                </select>
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
                <div class="players"v-for="(player, index) in players" :key="index">{{ player.name }}</div>
                 
                
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
                ].sort((a, b) => a.name.localeCompare(b.name))
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
button{
    border: none;
    background: none;
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
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
</style>