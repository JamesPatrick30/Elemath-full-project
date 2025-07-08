<template>
    <body>
        <nav>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        </nav>
        <main>
            <div class="con-m">
            <div class="header" style="grid-area: header;">
                <div class="image-contaner">
                    <img src="/images/frog2.png" alt="">
                </div>
                
                <div class="text-area">
                    <h3>welcome back. james</h3>
                    <h5>ID : 664232443</h5>
                </div>
                
            </div>
            <div class="body"  style="grid-area: body;">
                <div class="con-b">
                    <div id="mode" class="quiz" style="grid-area: quizmode;">
                        <h1>QUIZ MODE</h1>
                    </div>
                    <div id="mode" class="windowcard" style="grid-area: windowcard;">
                        <h1>windowcard</h1>
                        <img class="teach" src="/images/teach.png" alt="">
                    </div>
                    <div id="mode" class="challenge" style="grid-area: challenge;">3</div>
                    <div id="mode" class="lesson" style="grid-area: lesson;">6</div>
                </div>
                
            </div>
            <div id="item" style="grid-area: list;"></div>
            <div id="item" style="grid-area: statistic;"></div>
        </div>
        </main>
        
    </body>
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.teach{
    position: relative;
    left: 150px;
    bottom: 100px;
    height: 250px;
    width: auto;
}
#mode{
    height: 200px;
}
#mode:hover{
    background:100%;
    cursor: pointer;
    transition: 0.1s linear;
}
.image-contaner{
    display: flex;
    align-items: center;
    justify-content: end;
    background-color: white;
    border-radius: 50%;

    height: fit-content;
    width: fit-content;
}
.image-contaner img{
    border-radius: 50%;
    height: 100px;
}
.header{
    display: flex;
    justify-content: baseline;
    align-items: center;

    gap: 20px;
    color: white;
    padding: 20px;
    background-color: #fbaaa6;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.lesson{
    background-color: #dc7556;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.challenge{
    background-color: #e7bb41;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.quiz{
    color: white;
    background-color: #2a713d;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}
.windowcard{
    padding: 20px;
    background-color: #2d8bba;
    border-radius: 20px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

    transition: 0.1s linear;
}

.body .con-b{
    height: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        'quizmode windowcard'
        'challenge lesson';
    gap: 1em;
}
#item{
    background-color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-radius: 20px;
}
.con-m{
    height: 90%;
    width: 95%;
    background-color: rgb(235, 235, 235);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 2fr 2.5fr;
    grid-template-areas: 
        'header header list'
        'body body list'
        'body body statistic';
    gap: 1em;
}
body{
    background-color: rgb(235, 235, 235);
    height: 100vh;
    width: 100%;
    display: flex;
}
main{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
nav{
    height: 100%;
    width: 250px;
    background-color: aqua;
}
</style>