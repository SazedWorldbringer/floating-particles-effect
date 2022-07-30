const canvas = document.getElementById("canvas1");
const ctx = document.getContext("2d"); // 2 dimensional rendering context
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

// create constructor function
function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}
