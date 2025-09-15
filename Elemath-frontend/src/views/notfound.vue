<template>
    <greenbg />
  <div class="not-found">
    <h1 class="error-code"><span>4</span><span>0</span><span>4</span></h1>
    <p class="error-message">Page Not Found</p>
    <button @click="$router.push('/')">Go to Home</button>
  </div>
</template>

<script>
import greenbg from './student-ui/components/greenbg.vue';
export default {
  name: 'NotFound',
  components: {
    greenbg
  }
}
</script>

<style scoped>
.error-code span:nth-child(1) {
  color: #ff6b6b; /* Highlight color for the first '4' */
  animation: le 2s infinite;
  animation-delay: 1s;
}
.error-code span:nth-child(2) {
  color: #ff6b6b; /* Highlight color for the second '0' */
  animation: le 2s infinite;
  animation-delay: 0.2s;
}
.error-code span:nth-child(3) {
  color: #ff6b6b; /* Highlight color for the third '4' */
  animation: le 2s infinite;
  animation-delay: 1s;
}
@keyframes le {
    0% {
        transform: translateY(-10px);
    }
    50% {
         transform: translateY(10px);
         opacity: 0.5;
    }
    100% {
         transform: translateY(-10px);
    }
}
* {
  font-family: 'BubbleBody Neue', 'Poppins', sans-serif;
}
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  /* background-color: #f8f9fa; */
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #ff6b6b; /* nice red highlight */
  margin: 0;
}

.error-message {
  font-size: 1.5rem;
  margin: 10px 0 20px;
  color: #444;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}
</style>
