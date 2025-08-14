<template>
    <nav v-show="isNavVisible">
            <img class="logo" src="/images/logo.jpg" alt="">
            <ul>
                <li class="item1" @click="this.$router.push({name:'studentDashboard'})">Home</li>
                <li class="item2" >Profile</li>
                <li class="item3">History</li>
                <li class="item4" @click="this.$router.push({name:'student-setting'})">Settings</li>
            </ul>
        </nav>
</template>
<script>
export default {
    name: 'NavBarStudent',
    data() {
        return {
            isNavVisible: true,
        };
    },
    methods: {
        SeeNav() {
            this.isNavVisible = !this.isNavVisible;
        },
    },
};
</script>
<style scoped>
nav {
    
    min-width: 250px;
    max-width: 250px;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}
nav ul {
    margin-top: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
nav ul li{
    border-radius: 30px;
    cursor: pointer;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: #4fc4f7;
    font-weight: bold;
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
    transition: 0.3s;
}
nav ul li:hover{
    transition: 0.3s;
    background-color: #4fc4f7;
    color: white;
}
.logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
}
@media screen and (max-width: 623px){
    nav {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .logo {
        width: 80%;
        margin-top: 10px;
    }
}
</style>