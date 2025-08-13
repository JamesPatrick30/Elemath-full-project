<template>
    <body>
        <navBarStudent></navBarStudent>
        Settings
    </body>
    
</template>
<script>
import navBarStudent from './components/navBarStudent.vue';
export default {
    components:{
        navBarStudent
    },
    data(){
        return{

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