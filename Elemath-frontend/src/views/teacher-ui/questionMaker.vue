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
      </div>
    </main>
    
</template>
<script>
export default{
    data(){
        return{
            btnActive:{setting:true,Question:false,file:false},
            btnLobby:{playes:false,Question:true},
            questionOption:'Costumize'
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