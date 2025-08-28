<template>
    <body>
        <div class="con">
            <br>
            <img class="profile" src="/characters/takos.png" alt="">
            <p>Name</p>
        </div>
        <div class="btncon">
            <button @click="goDashboard"><font-awesome-icon icon="fa-solid fa-house"  /> Dash Board</button>
            <button @click="goSettings"><font-awesome-icon icon="fa-solid fa-gear" /> Settings</button>
            <button><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> Log out</button>
        </div>
        
    </body>
    
</template>
<script>
export default{
    methods:{
        goDashboard(){
            this.$router.push('/ds');
        },
        goSettings(){
            this.$router.push('/ts');
        }
    }
}
</script>
<style scoped>
.btncon{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.con p{
    font-weight: 700;
}
.con{
    /* height: 100px; */
    background-color: rgb(233, 233, 233);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.con img{
    border-radius: 50%;
    height:  70px;
    width: 70px;
}
body{
    padding: 20px;
    border-radius: 5px;
    position: fixed;
    max-height: fit-content;
    max-width: 200px;
    margin: 10px;
    margin-top: 65px;
    z-index: 10000;
    background-color: white;
    display: flex;
    flex-direction: column;
}
button{
    border: none;
    border-top: rgb(233, 233, 233) 2px solid;
    width: calc(100% - 10px);
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
    font-size: large;
    color: rgb(100, 100, 100);
    /* width: 200px; */
    background-color: white;
    text-align: left;
}
button:hover{
    transform: scale(1.01);
    background-color: rgb(245, 245, 245);
}
</style>