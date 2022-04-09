<template>
  <canvas ref="canvasRef" />
  <div ref="svgRef"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
let canvasRef = ref();
let svgRef = ref();
function createCanvas() {
  const yy = canvasRef.value;

  // create drawing area
  const xx = yy.getContext("2d");

  // paint a line
  xx.beginPath();
  xx.strokeStyle = "red"; // specify color
  xx.moveTo(0, 0); // move pen to
  xx.lineTo(50, 50); // draw line to here
  xx.stroke(); // actually draw it

  // paint a arc
  xx.beginPath();
  xx.strokeStyle = "blue";
  xx.arc(50, 50, 30, 0, 2 * Math.PI, true); // x, y, radius, angle 1, angle 2, counter-clockwise
  xx.stroke();

  // paint a text
  xx.fillText("canvas", 0, 90);

  // paint a rectangle
  xx.fillStyle = "cyan"; // specify color
  xx.fillRect(50, 25, 15, 10); // x, y, width, height
}
function createSvg() {
  const svg_box = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  const mypath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mypath.setAttribute("d", "M 0 0 L 50 50");
  mypath.setAttribute("style", "stroke:red");

  const mycir = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  mycir.setAttribute("cx", "50");
  mycir.setAttribute("cy", "50");
  mycir.setAttribute("r", "30");
  mycir.setAttribute("style", "stroke:blue;fill:none;");

  const myrect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  myrect.setAttribute("x", "50");
  myrect.setAttribute("y", "25");
  myrect.setAttribute("width", "15");
  myrect.setAttribute("height", "10");
  myrect.setAttribute("style", "fill:cyan;");

  const mytext = document.createElementNS("http://www.w3.org/2000/svg", "text");
  mytext.setAttribute("x", "0");
  mytext.setAttribute("y", "90");
  mytext.appendChild(document.createTextNode("svg"));

  svg_box.appendChild(mypath);
  svg_box.appendChild(mycir);
  svg_box.appendChild(myrect);
  svg_box.appendChild(mytext);

  // attach to document
  svgRef.value.appendChild(svg_box);
}
onMounted(() => {
  createCanvas();
  createSvg();
});
</script>
