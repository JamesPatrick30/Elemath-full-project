<script>
import latestnav from './latestnav.vue';
export default{
    components:{
        latestnav
    },
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            isNav: false
        }
    },
    methods:{
        toggleNav(){
            this.isNav = !this.isNav;
            // this.$emit('click', this.isNav);
        }
    }
}
</script>
<template>
    <header>
            <img class="logo" src="/images/logonobg.png" alt="">
            <div class="con-info">
                <img class="character" :src="info.profile" alt="">
                <div class="info">
                    <p class="name">{{ info.name }}</p>
                    <p class="lrn">LRN: {{ info.lrn }}</p>
                </div>
                <font-awesome-icon @click="toggleNav" class="menu-icon" icon="fa-solid fa-bars" />
            </div>
            <latestnav v-if="isNav" />
        </header>
        
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.info{
    margin-left: 10px;
}
.lrn{
    font-weight: 500;
    font-size: 14px;
}
.name{
    font-weight: 600;
    font-size: 18px;
}
.lrn, .name{
    margin: 0;
    padding: 0;
}
.menu-icon{
z-index: 100;
    margin-left: auto;
    font-size: 20px;
    margin-right: 10px;
    /* color: #4CAF50; */
    cursor: pointer;
}
.con-info{
    display: flex;
    /* justify-items: center; */
    align-items: center;
    border-radius: 20px;
    margin-left: auto;
    width: calc(100% - 90px);
    background-color: white;
    font-size: 20px;
    padding: 5px;
}
header {
    z-index: 100;
    max-width: 100%;
    min-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    padding-right: 10px;
    /* padding-left: 10px; */
    /* background-color: #4CAF50; */
}
.character {
    border-radius: 50%;
    height: 50px;
    /* border: 2px solid white; */
}
.logo {
    height: 60px;
    margin-left: 10px;
}
</style>