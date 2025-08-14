<template>
    <body>
        <navBarStudent></navBarStudent>
        <main>
            Settings
            <button @click="logout()">log out</button>
        </main>
        
    </body>
    
</template>
<script>
import api from '@/axios';
import navBarStudent from './components/navBarStudent.vue';
export default {
    components:{
        navBarStudent
    },
    data(){
        return{

        }
    },
    methods:{
        async logout(){
            try{
                const res = await api.post('/api/logout');
                this.$router.push('/')
                alert(res.data.message);
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
body{
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    background-color: #f0f0f0;
}
</style>