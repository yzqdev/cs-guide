<template>
  <div class="box">
    <div ref="svgRef"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

let svgRef = ref();

onMounted(() => {
  const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  // set width and height
  svg1.setAttribute("width", "100");
  svg1.setAttribute("height", "100");

  // create a circle
  const cir1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  cir1.setAttribute("cx", "80");
  cir1.setAttribute("cy", "80");
  cir1.setAttribute("r", "30");
  cir1.setAttribute("fill", "red");

  // attach it to the container
  svg1.appendChild(cir1);
  console.log(svgRef);
  svgRef.value.appendChild(svg1);
});
</script>
<style>
.box span {
  color: red;
}
</style>
