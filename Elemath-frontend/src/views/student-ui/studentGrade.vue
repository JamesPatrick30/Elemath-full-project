<script>
import api from '@/axios';
import header1 from './components/header.vue';
import greenbg from './components/greenbg.vue';
export default{
    name: 'studentGrade',
    components: {
        greenbg,
        header1
    },
    data(){
        return{
            username:'',
            profile:'',
            lrn:'',
            audiosrc:'/musics/lobbym.mp3',
            volume:0,
        }
    },
    mounted(){
        const player = this.$refs.player;
        player.volume = this.volume;

        player.play();
        player.muted = false;
        if(localStorage.getItem('volume')){
            this.volume = parseFloat( localStorage.getItem('volume') );
        }
        this.getdata();
    },
    methods:{
        async getdata(){
            try {
                const response = await api.get('/get/student/data'); // Adjust the endpoint as needed
                // console.log(response.data);
                this.username = response.data.name || 'John Doe';
                this.profile = response.data.profile;
                this.lrn = response.data.lrn || '123456789012';
                console.log('Student ID:', response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        },
        updateVolume() {
            this.$refs.player.volume = this.volume;
            localStorage.setItem('volume', this.volume);
        },
    }
}
</script>
<template>
    <greenbg />
   
    <body>
        <audio ref="player" :src="audiosrc" loop></audio>
        <header1 :info="{name:username,profile:profile,lrn:lrn}" ></header1>
        <main>
            <!-- <div class="container">
                <h1>Grade</h1>
            </div> -->
        </main>
    </body>
</template>
<style scoped>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Poppins', sans-serif;
  /* background-color: #f0f4f8; */
}
</style>