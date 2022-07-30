const canvas = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext("2d"); // 2 dimensional rendering context
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

// add draw method to particle prototype
Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// writing the draw method in the prototype instead of the constructor itself
// is considered a good practice. writing it in the constructor method would
// create a draw method for each instance of the particle method, which will cause
// performance issues

const particle1 = new Particle(100, 100, 1, 1, 20, "black");
particle1.draw();
