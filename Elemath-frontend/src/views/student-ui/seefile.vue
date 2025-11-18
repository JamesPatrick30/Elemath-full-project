<script>
import api from '@/axios';
import loading from '../teacher-ui/components/loading.vue';
export default {
    name: 'seefile',
    data(){
        return {
            htmlLesson:''
        }
    },
    methods: {
        async lessonData(){
            try{
                const id = this.$route.query.lessonId;
                const res = await api.get('/dlesson/get',{
                    params:{
                        lessonId:id
                    }
                });
                this.htmlLesson = res.data.htmlLesson;
                // this.fileselectedID = id;
                // this.title = res.data.title;
                // this.lessonfile = res.data.file;
                // this.cluster = true;
                // this.summarize = res.data.summary;
                // console.log(res.data);
            }catch(err){
                console.log(err);
            }
        },
        back(){
            this.$router.go(-1);
        }
    },
    mounted(){
        this.lessonData();
    }
}
</script>
<template>
    
    
    <body>
        <header>
            <button @click="back">back</button>
        </header>
    </body>
    <div class="file" v-html="htmlLesson" v-if="htmlLesson"></div>
        <loading v-else></loading>
</template>
<style scoped>
.file{
    width: 70%;
    background-color:#c9ebff;
    padding: 20px;
    position: absolute;
    top: 100px;
    /* bottom: 100px; */
    left: 50%;
    transform: translateX(-50%);
}
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
header{
    background-color: #70cbff;
    width: 100%;
    /* height: 20px; */
}
header button{
    background: none;
    border: none;
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: white;
}
body{
    position: fixed;
    /* padding: 20px; */
    background-color:#30b0fa;
    width: 100%;
    min-height: 100vh;

}

</style>