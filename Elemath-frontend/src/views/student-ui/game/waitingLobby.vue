<script>
import socket from '@/socket';
import api from '@/axios';
export default {
    name: 'waitingLobby',
    data() {
        return {
            students: [],
            showInfo: false,
            infoName: 'Patrick',
            infoLrn: '976976986546',
            classId:this.$route.query.i,
            name: '',
            lrn: '',
            profilepic: '',
            id:''
        }
    },
    methods: {
        showInfofunction(student) {
            this.showInfo = true;
            this.infoName = student.name;
            this.infoLrn = student.lrn;
        },
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.name = response.data.name || 'John Doe';
                this.lrn = response.data.lrn || '1234567890';
                this.profilepic = response.data.profile; // Default profile picture
                this.id = response.data.classId._id; // Assuming the student ID is returned
                // console.log('Student ID:', this.id);
                socket.connect();
                socket.emit('join-room', { roomId: this.classId,name:this.name,lrn:this.lrn,profile:this.profilepic });
                await this.ListforQuiz();
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        },
        async ListforQuiz(){
            try{
                if(!this.id){
                    alert('No class ID found. Please check your data.'+this.id);
                    return;
                }
                const res = await api.get('/get/mode/list',{
                    params: {
                        id: this.id
                    }
                });
                this.students = res.data.list;
            }catch(err){
                console.error('Error fetching quiz data:', err);
            }
        },
    },
    mounted(){
        this.getdata();
        socket.removeAllListeners();
        socket.on('mode-deleted', (data) => {
            this.$router.push({ name: 'dash2' });
        });
        socket.on('player-joined', (data) => {
            this.students.push(data);
            console.log('New student joined:', data);
        });
        socket.on('game-start',(data)=>{
            this.$router.push({ name: 'testarea',query: { data } });
        });
    }
}
</script>
<template>

    <main>
        <header>
            <h1>Waiting for other players to join...</h1>
            <p>Once all players are ready, the game will start.</p>
        </header>
        <div class="contaner">
            <div class="player" v-for="student in students" :key="student.lrn" @click="showInfofunction(student)" >
             
                    <p>{{ student.player }}</p>
                
                

            </div>
        </div>
    </main>
    <div class="con-info" v-if="showInfo">
        <div class="info">
            <div class="con-pic">
                <img class="info-img" src="/images/teach.png" alt="">
            </div>
            <h1>{{ infoName }}</h1>
            <p>Lrn : {{ infoLrn }}</p>
            <button @click="showInfo = false">Close</button>
        </div>
    </div>
</template>
<style scoped>
.info-img{
    width: auto;
    height: 260px;
    border-radius: 50%;
    margin-bottom: 20px;
}
.con-pic{
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
}
header h1,
header p{
    margin: 0;
    color: white;
    text-align: center;
}
.info h1,
.info p{
    margin: 0;
}
.info{
    background-color: white;
    text-align: center;
    color: #4fc4f7;
    font-size: 20px;
    font-weight: 600;
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 20px;
    border-radius: 20px;
}
.info button {
    background-color: #4fc4f7;
    width: 100px;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    position: relative;
    align-self: self-end;
}
.con-info{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}
.player{
    width: 200px;
    height: 100px;
    background-color: #f5d170;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: large;
    font-weight: 700;
    transition: 0.3s;
}
.player:hover{
    background-color: #f5c170;
    transform: scale(1.05);
    cursor: pointer;
    transition: 0.3s;
}
.contaner{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 90%;
    overflow: scroll;
    scrollbar-width: thin;
    scrollbar-color: #4fc4f7 transparent;
}
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    
}
main::before {
    z-index: -1;
    background-image: url('/images/bg.png');
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}
header{
    
    width: 90%;
    height: 70px;
    background-color: #4fc4f7;
    color: white;
    display: flex;
    gap: 0.1em;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
}
@media screen and (max-width: 768px) {
    header {
        width: 95%;
    }
    header h1,
    header p {
        font-size: 1em;
    }
    .contaner {
        grid-template-columns: 1fr 1fr 1fr;
        text-align: center;
        height: 90%;
        overflow: scroll;
    }
    .player {
        width: 90%;
        margin: 10px auto;
    }
    .info {
        width: 70%;
        height: auto;
        padding: 20px;
    }
    
}
</style>