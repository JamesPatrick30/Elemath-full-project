<template>
  <main>
    <section class="landing">
      <header>
        <nav>
          <ul>
            <li>Sign In</li>
            <li>Sign Out</li>
          </ul>
        </nav>
      </header>
      <!-- <div class="iem1"></div>
      <div class="iem2"></div>
      <div class="iem3"></div> -->
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

body {
  margin: 0;
  padding: 0;
}
.landing {
  background-color: aqua;
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
  background-color: bisque;
  
}
header nav ul{
  display: flex;
  justify-content: flex-end;
  gap: 50px;
}
header nav ul li{
  
  list-style: none;
  padding: 5px;
}
header nav ul li:hover{
  background-color: brown;
  transition: 500ms;
}
</style>
