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
    <header>
        <button @click="back">back</button>
    </header>
    <main>
        <div v-html="htmlLesson" v-if="htmlLesson"></div>
        <loading v-else></loading>
    </main>
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;

}
header{
    background-color: #70cbff;
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
main{
    padding: 20px;
    background-color: #c9ebff;
    display: flex;
    justify-content: center;
    align-self: center;
}
main div{
    max-width: 800px;

}
</style>