<script>
import greenbg from './components/greenbg.vue';
import api from '@/axios';
import header1 from './components/header.vue';
export default{
    components: {
        greenbg,
        header1
    },
    data(){
        return{
            username:'',
            profile:'',
            lrn:'',
        }
    },
    mounted(){
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
                // console.log('Student ID:', response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            return;
        }
    }
}
</script>
<template>
    <greenbg></greenbg>
    <body>
        <!-- <h1>History</h1> -->
        <header1 :info="{name:username, profile:profile, lrn:lrn}"/>
    </body>
    <!-- <h1>History</h1> -->
</template>
<style scoped>
body{
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    /* margin: 0;
    /* padding: 0; */
     font-family: 'BubbleBody Neue','Poppins', sans-serif; 
    /* background-color: #f0f0f0; */
    /* background-color: #e8f5e9; */
    /* min-height: 100vh; */
}
</style>