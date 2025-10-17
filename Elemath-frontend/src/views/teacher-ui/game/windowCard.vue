<script>
import socket from '@/socket';
import api from '@/axios';
import greenbg from '@/views/student-ui/components/greenbg.vue';
export default {
    name: "WindowCard",
    components: {
        greenbg
    },
    data() {
        return {
            players: [],
            id: null,
            count: null,
            time: null,
            // questions: [],
            difficulty: 'easy',
            operation: 'addition'
        }
    },
    methods: {
        async getmodedata(){
                // Removed debug alert

            try {
                const res = await api.get(`/get/mode/data`,{params: { id: this.id } });
        
                // console.log('Mode data fetched:', res.data);
                this.players = res.data.modeData;
            } catch (err) {
                console.error('Error fetching mode data:', err);
            }
        },
        async startGame() {
            if(!this.time){
                alert('⚠️ Time limit not set. Please configure a timer before starting.');
                return;
            }
            if(!this.count || !this.time ){
                alert('⚠️ Number of questions not set. Please configure the number of questions before starting.');
                return;
            }
            if(this.players.length == 0){
                alert('⚠️ No players joined yet. Waiting for players...');
                return;
            }
            try {
                const res = await api.get('/quiz', {
                    params: {
                        difficulty: this.difficulty,
                        operation: this.operation,
                        count: this.count
                    }
                });

                // ✅ Use res.data (the payload), not the whole response
                console.log(res.data.data);

                socket.emit('game-start', {
                    roomId: this.id,
                    questions: res.data.data,   // <- fixed
                    time: this.time
                });

                this.$router.push({ name:'leaderboard', query: { i: this.id } });
            } catch (err) {
                console.log(err);
                alert('Error fetching questions. Please try again.');
                return;
            }
        },

        
        async backBtn(){
            try{
                const res = await api.post('/delete/mode',{id:this.id});

                // alert(res.data.message);
                this.$router.push('/th');
            }catch(err){
                console.log(err);
            }
            
        }
    },
    created() {
        this.id = this.$route.query.i;
    },
    mounted() {
        this.getmodedata();
        socket.connect();
        socket.removeAllListeners();

        socket.emit('create-room', { roomId: this.id });
        socket.on('room-created', (data) => {
            // console.log('Room created:', data);
            // alert('Room created successfully! '+data.message);
            // Handle room creation confirmation here
        });
        socket.on('player-joined', (data) => {
            console.log('Player joined:', data);
            this.players.push({ player: data.player, lrn: data.lrn, profile: data.profile });
        });
    }
}
</script>
<template>
    <greenbg/>
    <body>
        <main>
            <button class="btn-back" v-on:click="backBtn()">Back</button>
            <div class="con">
                <div class="setting-con">
                    <h1>Window Card</h1>
                    <div class="settings">
                        <label for="time">Time:</label>
                        <input class="input-s" type="number" id="time" v-model="time" placeholder="Minutes"/>
                        <label for="questionNumber">Questions</label>
                        <input class="input-s" type="number" id="questionNumber" v-model="count" placeholder="Number of Questions"/>
                        <label for="difficulty">Difficulty:</label>
                        <select class="input-s" id="difficulty" v-model="difficulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Moderate</option>
                            <option value="hard">Hard</option>
                        </select>
                        <label for="operation">Operations</label>
                        <select class="input-s" name="operation" id="operation" v-model="operation">
                            <option value="addition">Addition</option>
                            <option value="subtraction">Subtraction</option>
                            <option value="multiplication">Multiplication</option>
                            <option value="division">Division</option>
                        </select>
                    </div>
                </div>
                <div class="players-con">
                    <div class="player"><h2>Players</h2></div>
                    <div class="player" v-for="(value, index) in players" :key="index">{{ value.player }}</div>
                </div>
            </div>
        </main>
        <div class="btn-start" @click="startGame">start</div>
    </body>
</template>
<style scoped>
.btn-start{
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #41b8d5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 800;
    font-size: 16px;

    transition: 0.2s;
}
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.input-s{
    outline: none;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #a8e15e;
    padding: 5px;
    margin: 10px 0;
}
.settings{
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.player:hover{
    transform: scale(1.02);
}
.player{
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06),
                0 4px 8px rgba(16, 24, 40, 0.08),
                0 12px 20px rgba(16, 24, 40, 0.08);
}
.players-con{
    padding-bottom: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    /* background-color: red; */
}
main{
    width: 100%;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
}
.setting-con{
    box-shadow:
        0 1px 2px rgba(16, 24, 40, 0.06),
        0 4px 8px rgba(16, 24, 40, 0.08),
        0 12px 20px rgba(16, 24, 40, 0.08);
    border-radius: 10px;
    margin-top: 20px;
    background-color: white;
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.con{
    /* background-color: white; */
    height: 100%;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}
.btn-back:hover,
.btn-start:hover{
    transform: scale(1.1);
    transition: 0.2s;
}
.btn-back{
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #41b8d5;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    transition: 0.2s;
}
.btn-add{
    width: 120px;
    height: 40px;
    background-color:#96faa2 ;
    border: none;
    color:white;
    font-weight: 800;
    border-radius: 20px;

    position:relative;
    justify-self: end;
    align-self: flex-end;
    cursor: pointer;
}
@media screen and (max-width: 768px) {
    .con {
        width: 90%;
    }
}
</style>