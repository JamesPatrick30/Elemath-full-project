<template>
    <body>
        <navbar/>
        <main>
            <h1 class="title">Class</h1>
            <header>
                <select name="class" id="" class="selectClass">
                    <option value="">asdsd</option>
                    <option value="">asdsd</option>
                    <option value="">asdsd</option>
                </select>
            </header>
        </main>
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
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.title{
    margin-left: 10px;
}
body {
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100vw;
    display: flex;
}
main {
    
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  
}
header{
    height: 70px;
    width: 100%;
    display: flex;
    gap: 2em;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.selectClass{
    border-radius: 5px;
    margin-left: 10px;
    height: 50px;
    width: 100px;
    padding: 10px;
    border: none;
}
.selectClass:focus{
    outline: none;
}
</style>