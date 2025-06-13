<template>
  <main>
    <section class="landing">
      <header>
        <nav>
          <ul>
            <li><button>Sign In</button></li>
            <li><button>Sign Out</button></li>
          </ul>
        </nav>
      </header>
      <div class="sky">
        
        <svg class="cloud1" width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="
            M50 60
            Q40 30, 70 30
            Q80 10, 110 30
            Q140 10, 160 40
            Q180 40, 180 70
            Q160 90, 120 90
            Q100 110, 80 90
            Q40 90, 50 60
          " fill="#ffffff" stroke="#888" stroke-width="2"/>
        </svg>

        <svg class="cloud2" width="150" height="100" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70
                  Q30,40 60,40
                  Q70,10 100,30
                  Q130,20 130,60
                  Q130,80 100,80
                  Q80,90 60,80
                  Q50,90 40,70Z"
                fill="#ffffff" stroke="#444" stroke-width="1"/>
        </svg>

        <svg class="cloud3" width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
          <path d="
            M60 90
            Q50 60 80 50
            Q90 20 130 40
            Q160 20 170 60
            Q190 70 180 100
            Q160 110 130 110
            Q100 130 80 110
            Q60 110 60 90Z"
            fill="#ffffff" stroke="#555" stroke-width="2"/>
        </svg>

        <svg class="cloud4" width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M60,80
                  C50,60 70,40 90,50
                  C100,20 140,20 150,50
                  C170,50 180,70 170,90
                  C160,110 120,110 100,100
                  C80,110 60,100 60,80Z"
                fill="#ffffff" stroke="#888" stroke-width="2"/>
        </svg>



      </div>
      
      <!-- <div class="iem1"></div>
      <div class="iem2"></div>
      <div class="iem3"></div> -->
      <div class="grass"></div>
    </section>

    <section class="about">
      hello
      <!-- <div class="iem1"></div>
      <div class="iem2"></div>
      <div class="iem3"></div> -->
    </section>
  </main>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

main{
  padding: 0px;
  margin: 0px;
  
  background-color: antiquewhite;
  width: 100%;
  height: 100%;
}
.landing {
  padding: 0px;
  margin: 0px;
    background: linear-gradient(180deg, #a8f5ff 0%, #d8feff 100%);
  height: 100vh;
  width: 100%;
}

.about {
  padding: 0px;
  margin: 0px;
  background-color: blue;
  height: 100vh;
  width: 100%;
}
header{
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 5%;
 
  
}
header nav ul{
  display: flex;
  justify-content: flex-end;
  gap: 0px;
}
header nav ul li{
  
  list-style: none;
 
}
header nav ul li button{
  background-color: #1ad0d0;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  height: 100%;
  transition: 500ms;
  border-radius: 5px;
}
header nav ul li button:hover{
  background-color: #15aaaa;
  transition: 500ms;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.landing {
  background-color: aqua;
  height: 100vh;
  width: 100%;
  position: relative; /* Add this */
}
.landing .grass {
  position: absolute;   /* Change to absolute */
  bottom: 0;            /* Anchor to bottom */
  left: 0;
  height: 35%;
  width: 100%;
  background-color: #a8e15e;
}

.landing .sky {
  position: relative;
  width: 100%;
  height: 100%;
}

.landing .sky svg {
  position: absolute;
}

.landing .sky .cloud1 {
  opacity: 0;
  left: 10%;
  top: 10%;
  animation: cloudanimation 10s linear infinite;
}

.landing .sky .cloud2 {
  opacity: 0;
  top: 30%;
  animation: cloudanimation 10s linear 2s infinite;
}
.landing .sky .cloud3 {
  opacity: 0;
  top: 20%;
  animation: cloudanimation 10s linear 4s infinite;
}
.landing .sky .cloud4 {
  opacity: 0;
  top: 40%;
  animation: cloudanimation 10s linear 3s infinite;
}

/* And so on for each cloud */


  @keyframes cloudanimation {
    0% {
      opacity: 1;
      margin-left: 74%;
    }
    90%{
      opacity: 0.8;
    }
    100% {
      margin-left: -30%;
      opacity: 0;
     
    }
    
  }

</style>
