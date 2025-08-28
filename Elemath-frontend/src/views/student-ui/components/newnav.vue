<template>
    <body>
        <div class="con">
            <img class="profile" src="/characters/takos.png" alt="">
            <p>Name</p>
        </div>
        <button>Dash Board</button>
        <button>Settings</button>
    </body>
    
</template>
<style scoped>
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
    position: fixed;
    height: fit-content;
    width: 200px;
    z-index: 10000;
    background-color: white;
    display: flex;
    flex-direction: column;
}
button{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
    font-size: large;
    border: none;
    width: 200px;
    background-color: white;
}
</style>