<template>
    <div class="con-btn">
          <button @click="goDashboard"><font-awesome-icon icon="fa-solid fa-house"  /> Dash Board</button>
            <button @click="goGrade"><font-awesome-icon icon="fa-solid fa-graduation-cap" /> Grade</button>
          <button @click="goHistory"><font-awesome-icon icon="fa-solid fa-clock-rotate-left" /> History</button>
            <button @click="goSettings"><font-awesome-icon icon="fa-solid fa-gear" /> Settings</button>
            <button @click="logout()"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> Log out</button>
    </div>
</template>
<script>
import socket from '@/socket';
import api from '@/axios';
export default {
    methods: {
        goHistory(){
            this.$router.push('/history');
            // alert('This feature is coming soon!');
        },
        goGrade(){
            this.$router.push('/ng');
        },
        goDashboard() {
            this.$router.push('/ds');
        },
        goSettings() {
            this.$router.push('/ts');
        },
        async logout() {
            try {
                const res = await api.post('/api/logout');
                if (socket.connected) {
                    socket.disconnect();
                }
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
button:hover{
    background-color: #e0e0e0;
}
button{
    width: 100%;
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
    font-size: 17px;
    color: green;
    /* width: 200px; */
    border: none;
    

    border-bottom: #e0e0e0 solid 1px;
    border-top: #e0e0e0 solid 1px;
    background-color: white;
    text-align: left;
    /* padding: 10px; */
    cursor: pointer;
}
.con-btn{
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    position: absolute;
    top: 50px;
    left: auto;
    right: 0;
    z-index: 10000;
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
</style>