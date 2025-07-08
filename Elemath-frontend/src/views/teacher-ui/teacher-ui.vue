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
                <h3>welcome back. james</h3>
                <h5>ID : 664232443</h5>
            </div>
            <div class="body"  style="grid-area: body;">
                <div class="con-b">
                    <div class="quiz" style="grid-area: quizmode;">
                        <h1>QUIZ MODE</h1>
                    </div>
                    <div class="windowcard" style="grid-area: windowcard;">4</div>
                    <div class="challenge" style="grid-area: challenge;">3</div>
                    <div class="lesson" style="grid-area: lesson;">6</div>
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
.header{
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
}
.challenge{
    background-color: #e7bb41;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
.quiz{
    background-color: #2a713d;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
.windowcard{
    padding: 20px;
    background-color: #2d8bba;
    border-radius: 20px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
#games{

    border-radius: 20px;
       box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
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