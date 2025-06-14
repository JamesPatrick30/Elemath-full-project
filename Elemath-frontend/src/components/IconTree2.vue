<template>
  <div class="tree">
      <svg viewBox="0 0 150 300" class="tree-svg">

    <!-- Your SVG tree -->
    <path d="M75 250 C 40 250, 10 210, 20 150 C 20 80, 50 20, 75 20 C 100 20, 130 80, 130 150 C 140 210, 110 250, 75 250 Z"
      fill="#ff9898" stroke="#ff9898" stroke-width="2"/>
    <ellipse cx="75" cy="290" rx="25" ry="10" fill="#A2C662"/>
    <line x1="75" y1="40" x2="75" y2="290" stroke="#D0905A" stroke-width="4" stroke-linecap="round"/>
    <path d="M75 200 C75 180, 60 170, 60 150" stroke="#D0905A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M75 140 C75 120, 90 110, 90 90" stroke="#D0905A" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>
  </div>

</template>

<script setup>
// No logic needed if it's just static SVG
</script>
<style>

.tree{
  z-index: 2;
  animation: treeMovement 5s linear infinite;
}
@keyframes treeMovement {
  0% {
    transform: rotate(-3deg) skewX(-1deg);
  }
  50% {
    transform: rotate(0deg) skewX(0deg);
  }
  100% {
    transform: rotate(-3deg) skewX(-1deg);
  }
  
}
</style>