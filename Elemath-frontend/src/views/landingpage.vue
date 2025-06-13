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
        <p class="claude">1+1=2</p>
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

main{
 
  background-color: antiquewhite;
  width: 100%;
  height: 100%;
}
.landing {
    background: linear-gradient(180deg, #a8f5ff 0%, #d8feff 100%);
  height: 100vh;
  width: 100%;
}

.about {
  background-color: blue;
  height: 100vh;
  width: 100%;
}
header{
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
  
  width: 100%;
  justify-content: right;
  background-color: #a8f5ff;
}
.landing .sky .claude {
  position: relative;
  font-size: 3rem;
  color: #333;
  text-align: left;
  animation: slideIn 10s ease-in-out infinite; 
}
@keyframes slideIn {
  from {
      background-color: transparent;
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>
