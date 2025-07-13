<template>
    <div class="body">
        <nav>
            <img class="logo" src="/images/logo.jpg" alt="">
            <ul>
                <li>Dashboard</li>
                <li>Create Class</li>
                <li>Manage Classes</li>
                <li>Settings</li>
            </ul>
        </nav>
        <main>
            <div class="header">
                <h3>Welcome back, James</h3>
            </div>
            <div class="contaner">
                <button>+</button>
            </div>
        </main>
    </div>
</template>
<style scoped>
*{
    font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.logo{
    height: auto;
    width: 100%;
    margin-top: 0%;
    margin-bottom: 10px;
}
.body {
    display: flex;
    height: 100vh;
    width: 100vw;
}
main {
    flex: 1;
    display: flex;
    flex-direction: column;

    background-color: aliceblue;
}
nav {
    
    width: 20%;
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
.contaner{
    height: 90%;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.contaner button{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #4fc4f7;

    color: white;
    font-size: 30px;
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
    transition: 0.3s;
}
.contaner button:hover{
    background-color: #67c6e9;
    transform: scale(1.1);
    transition: 0.3s;
}
#item{
    background-color: white;
    box-shadow: 0 6px 16px rgba(0, 0, 3, 0.15);
    border-radius: 20px;
}
.header{
    height: 10%;
    width: 100%;
    display: flex;
    text-align: center;
    position:relative;
    margin-top: 0%;

    color: #4fc4f7;
}
.header h3{
    margin-left: 30px;
}
</style>