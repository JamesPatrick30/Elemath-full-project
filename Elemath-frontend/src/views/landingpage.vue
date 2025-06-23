<template>
  <main>
    <div class="horizontal-scroll">
      <section class="landing">
            <header>
              <h1>Ele<span style="color: #7789fe;">math</span> </h1>
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
            <div class="tagline-contaner">
              <h3>
                Ready to power up your brain? <br>
                Let’s play and learn!
              </h3> 
              <p class="sentence">
                Join exciting math challenges, explore fun worlds, and sharpen your skills with every question. Elemath makes learning math an adventure you’ll love!
              </p>
              <nav>
                <ul>
                  <li><button>Sign In</button></li>
                  <li><button>Sign Out</button></li>
                </ul>
              </nav>
            </div>
            
            <div class="grass">
              <div class="tree-container">
               
                  <TreeComponent class="tree tree1"/>

                  <TreeComponent2 class="tree tree2" />

                  <TreeComponent class="tree tree3" />

                  <TreeComponent class="tree tree4" />

                  <TreeComponent class="tree tree5" />

                  <TreeComponent2 class="tree tree6" />

                  <TreeComponent2 class="tree7" style="
                    position: absolute;
                    top: 30%;
                    left: 80%;
                    width: 70px;
                    height: 200px;
                  "/>

                  <TreeComponent class="tree tree8" />

                  <TreeComponent2 class="tree tree9" style="
                    position: absolute;
                    top: 15%;
                    left: 60%;
                    width: 70px;
                    height: 200px;
                  "/>
                  <div class="moving-number">
                    1
                  </div>
              </div>
            </div>
            <div class="background-blue"></div>
          </section>

          <section class="about">
           <!-- <TreeComponent class="tree tree10"/> -->
            
           <div class="sand-background">
                <sandbackground />
              </div>
            
            <div class="about-contaner">
              <div class="item1">
                <img :src="gameimage" alt="">
                <img :src="gameimage2" alt="">
                <img :src="gameimage3" alt="">
              </div>
              <div class="item2">
                <h1>About Elemath </h1>
                <p>
                  Elemath is a web-based quiz game tailored for Grade 5 and 6 students, aligned with the DepEd’s Matatag Curriculum. It focuses on math practice through <span class="highlight">interactive quizzes and performance tracking — not teaching.</span> 
                  <br><br>
                  The system is designed for <span>quiz engagement, student growth monitoring, and classroom integration,</span> making math practice simple, structured, and enjoyable.

                </p>
              </div>
            </div>
            <TreeComponent2 class="tree tree10" />
            <TreeComponent2 class="tree tree11" />
            <TreeComponent class="tree tree12" />
            <TreeComponent class="tree tree13" />
          </section>
          <section class="info">
            <h1>Who is Elemath for ?</h1>
            <div class="info-contaner">
              <item1></item1>
              <item2></item2>
            </div>
              <div class="beach-background">
                <beachbackground  />
              </div>
          </section>
          <section class="key-features"></section>
    </div>
    
  </main>
</template>

<script>
import TreeComponent from '@/components/svg/IconTree1.vue';
import TreeComponent2 from '@/components/svg/IconTree2.vue';
import sandbackground from '@/components/svg/sandbackground.vue';
import beachbackground from '@/components/svg/bluebackground.vue';
import cloud from '@/components/svg/cloud.vue';
import gameimage from '/images/1.png';
import gameimage2 from '/images/2.png';
import gameimage3 from '/images/3.png';
export default {
  name: "SimpleTree",
  components: {
    TreeComponent,
    TreeComponent2,
    sandbackground,
    beachbackground,
    cloud
  },
  data() {
    return {
      gameimage: gameimage,
      gameimage2: gameimage2,
      gameimage3: gameimage3
    };
  },
}

</script>

<style scoped>
@font-face {
  font-family: 'BubbleBody Neue';
  src: url('fonts/BubbleBodyNeue.woff2') format('woff2'),
       url('fonts/BubbleBodyNeue.woff') format('woff'),
       url('fonts/BubbleBodyNeue.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

*{
  margin: 0;
  padding: 0;
}
.about-contaner,.info-contaner {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 2 columns of equal width */
  z-index: 10;
}


.about-contaner .item1{
  display: flex;
  padding: 20px;
  flex-wrap: wrap; /* allow items to wrap */
  justify-content: center; /* center items horizontally */
  gap:10px; /* space between images */
}
.about-contaner .item2 p{
  z-index: 10;
  padding: 20px;
  text-align: left;
  color: #464c84;
  font-weight: bold;
  font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.about-contaner .item2 h1{
  padding: 20px;
  text-align: center;
  color: #464c84;
  font-weight: bold;
  font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.about-contaner .item2 p span {
  font-weight: 900;
  color: #30387c;
  font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.info h1{
  color: #30387c;
  font-family: 'BubbleBody Neue','Poppins',sans-serif;
  font-weight: bold;
  font-size: 35px;
}
img{
  height: 250px;
  width: auto;
  box-shadow: #464c84 0px 0px 10px;
  transform: rotate(40deg);
}
.background-blue {
  position: absolute;
  bottom: 0;
  height: 400px;
  width: 100%;
  background-color: #80deff;
  border-radius: 50% 50% 0 0 ;
  overflow: hidden;
  z-index: 0;
  transform: scaleX(1.5);
  left: 20%;
}
body, html {
  height: 100%;
  width: 100%;
  overflow: hidden; /* prevent vertical scroll */
}

main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.landing {
  background: linear-gradient(180deg, #a8f5ff 0%, #d8feff 100%);
  height: 100vh;
  width: 100%;
}

.info {
  background-color: #ffff99;
  height: 100vh;
  width: 100%;
  justify-items: center;
}
.key-features {
  background-color: #4fc4f7;
  height: 100vh;
  width: 100%;
}
header{
  width: 100%;
  height: 5%;
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
  z-index: 1; /* Ensure it is above the background */
}

.landing .sky {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
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
  animation: cloudanimation 10s linear 6s infinite;
}
.landing .sky .cloud3 {
  opacity: 0;
  top: 20%;
  animation: cloudanimation 10s linear 5s infinite;
}
.landing .sky .cloud4 {
  opacity: 0;
  top: 40%;
  z-index: 1;
  animation: cloudanimation 10s linear 3s infinite;
}

/* And so on for each cloud */


  @keyframes cloudanimation {
    0% {
      opacity: 0;
      margin-left: 74%;
    }
    10% {
      opacity: 1;
      
    }
    90%{
      opacity: 0.8;
    }
    100% {
      margin-left: -30%;
      opacity: 0;
     
    }
    
  }
.about {
  overflow: hidden;
  background-color: #a8e15e;
  height: 100vh;
  width: 100%;
}
.tagline-contaner {
  position: absolute;
  top: 20%;
  left: 5%;
  color: #464c84;
  z-index: 2;
  font-size: 30px;
  font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.tagline-contaner nav ul{
  display: flex;
  justify-content: center;
  gap: 0px;
}
.tagline-contaner nav ul li{
  list-style: none;
}
.tagline-contaner nav ul li button{
  background-color: #1ad0d0;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  height: 100%;
  transition: 500ms;
  border-radius: 20px;
  padding: 10px;
  font-size: 22px;
  margin: 10px;
  width: 150px;
  font-family: 'BubbleBody Neue','Poppins', sans-serif;
}
.tagline-contaner nav ul li button:hover{
  background-color: #15aaaa;
  transition: 500ms;
}
header h1 {
  margin-left: 10px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 20px;
  color: #feec77;
  font-family: 'BubbleBody Neue', 'Poppins',sans-serif;
}



@keyframes treeMovement {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    
  transform: skewX(20deg);

  }
  
}
.tree1{

  position: absolute;
  top: 20%;
  left: 40%;
  width: 70px;
  height: 200px;
                  
}
.tree2{
  position: absolute;
  top: 5%;
  left: 20%;
  width: 70px;
  height: 200px;
}
.tree3{
  position: absolute;
  top: -10%;
  left: 70%;
  width: 70px;
  height: 200px;
}
.tree4{
  position: absolute;
  top: -20%;
  left: 90%;
  width: 70px;
  height: 200px;
}
.tree5{
  position: absolute;
  top: -30%;
  left: 70%;
  width: 70px;
  height: 200px;
  z-index: 1;
}
.tree6{
  position: absolute;
  top: -35%;
  left: 50%;
  width: 70px;
  height: 200px;
}
.tree8{
  position: absolute;
  top: 0%;
  left: 50%;
  width: 70px;
  height: 200px;
}
.tree10{
  position: absolute;
  top: 100%;
  left: 10%;
  width: 70px;
  height: 200px;
  z-index: 0;
}
.tree11{
  position: absolute;
  top: 175%;
  left: 50%;
  width: 70px;
  height: 200px;

}
.tree12{
  position: absolute;
  top: 170%;
  left: 90%;
  width: 70px;
  height: 200px;
  z-index: 0;
}
.tree13{
  position: absolute;
  top: 95%;
  left: 80%;
  width: 70px;
  height: 200px;
  z-index: 1;
}
.beach-background{
  top: 89%;
  position: relative;
}
.sand-background{
  top: 93%;
  position: relative; 
}
.moving-number {
  font-size: 3rem;
  font-weight: 800;
  color: #4a7c59;
  display: inline-block;

  /* allow scaling */
  transform-origin: center;
  
  /* animate bending */
  animation: bendText 5s infinite linear;
}

@keyframes bendText {
  0% {
    transform: rotate(-3deg) skewX(-1deg);
  }
  50% {
    transform: rotate(0deg) skewX(0deg);
  }
  100% {
    transform: rotate(3deg) skewX(1deg);
  }
}

@media screen and (min-width: 768px) {
  .tagline-contaner {
    top: 30%;
    left: 10%;
    font-size: 40px;
  }
  header h1 {
    font-size: 30px;
    font-weight: bold;
  }
  .tagline-contaner nav ul li button {
    width: 200px;
    font-size: 26px;
  }
}
@media screen and (min-width: 1024px) {
  /* Large desktop specific styles */
  .tagline-contaner {
    width: 50%;
    top: 40%;
    left: 10%;
    font-size: 35px;
  }
  .tagline-contaner nav ul {
    justify-content: right;
  }
  .tagline-contaner nav ul li button {
    width: 200px;
    font-size: 20px;
    
  }
  .tree1{
    position: absolute;
    top: 10%;
    left: 95%;
    width: 70px;
    height: 200px;
    z-index: 5;
  }
  .tree2{
    position: absolute;
    top: 5%;
    left: 50%;
    width: 70px;
    height: 200px;
  }
  .tree3{
    position: absolute;
    top: -10%;
    left: 80%;
    width: 70px;
    height: 200px;
  }
  .tree4{
    position: absolute;
    top: -20%;
    left: 90%;
    width: 70px;
    height: 200px;
  }
  .tree5{
    position: absolute;
    top: -30%;
    left: 70%;
    width: 70px;
    height: 200px;
    z-index: 1;
  }
  .tree6{
    position: absolute;
    top: -35%;
    left: 60%;
    width: 70px;
    height: 200px;
  }
  .tree8{
    position: absolute;
    top: 0%;
    left: 75%;
    width: 70px;
    height: 200px;
  }
    .landing .sky .cloud1 {
    opacity: 0;
    left: 10%;
    top: 10%;
    animation: cloudanimation 20s linear infinite;
  }

  .landing .sky .cloud2 {
    opacity: 0;
    top: 30%;
    animation: cloudanimation 17s linear 6s infinite;
  }
  .landing .sky .cloud3 {
    opacity: 0;
    top: 20%;
    animation: cloudanimation 17s linear 5s infinite;
  }
  .landing .sky .cloud4 {
    opacity: 0;
    top: 40%;
    z-index: 1;
    animation: cloudanimation 17s linear 7s infinite;
  }
  @keyframes cloudanimation {
    0% {
      opacity: 0;
      margin-left: 100%;
    }
    10% {
      opacity: 1;
      
    }
    90%{
      opacity: 0.8;
    }
    100% {
      margin-left: -30%;
      opacity: 0;
     
    }
    
  }
 .sand-background {
    top: 90%;
    position: relative;
  }
  .background-blue {
    position: absolute;
    bottom: 0;
    height: 400px;
    width: 100%;
    background-color: #80deff;
    border-radius: 50% 50% 0 0 ;
    overflow: hidden;
    z-index: 0;
    transform: scaleX(0.8);
    left: 30%;
  }
  .about-contaner,.info-contaner{
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns of equal width */
  }
  .tree10{
    position: absolute;
    top: 110%;
    left: 20%;
    width: 70px;
    height: 200px;
  }



}
</style>
