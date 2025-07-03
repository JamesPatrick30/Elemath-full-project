<template>
    <body class="body">
        <nav>
            <ul>
                <li class="item1">Home</li>
                <li class="item2">Profile</li>
                <li class="item3">History</li>
                <li class="item4">Settings</li>
            </ul>
        </nav>
        <main>
            <div class="contaner">
                <div class="item1" id="item"></div>
                <div class="item2" id="item"></div>
                <div class="item3" id="item" ></div>
                <div class="item4" id="item"></div>
            </div>
            
        </main>
    </body>
</template>
<style scoped>
.body{
    height: 100vh;
    width: 100%;
    background-color: #c25252;
    display: flex;
    flex-direction: row;
}
nav{
    height: 100%;
    background-color: antiquewhite;
    width: 15%;
}
main{
    height: 100%;
    width: 100%;
    background-color: aliceblue;
    display: flex;
    align-items: center;
    justify-content: center;
}
.contaner{
    height: 90%;
    width: 90%;
    display: grid;
    grid-template-rows: 20% 70%;
    grid-template-columns: 2fr 3fr;
    grid-area: 
        'item1 item2'
        'item3 item4';
        gap: 30px;
}
#item{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
}
</style>