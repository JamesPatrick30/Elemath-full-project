<template>
    <body>
        <navbar/>
    </body>
    
</template>
<script>
import api from '@/axios';
import navbar from './components/navbar.vue';
import loading from './components/loading.vue';
export default {
    components: {
        navbar,
        loading
    },
    data() {
        return {
            classlength: 0,
            user: null,
            infoName: '',
            infoMiddleName: '',
            infoLastName: '',
        };
    },
}
</script>
<style>
body {
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100%;
    display: flex;
}
</style>