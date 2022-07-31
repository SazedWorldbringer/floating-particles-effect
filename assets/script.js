const canvas = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext("2d"); // 2 dimensional rendering context
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;
const colors = [
  "#cdb4db",
  "#ffc8dd",
  "#ffafcc",
  "#bde0fe",
  "#a2d2ff",
  "#3a86ff",
  "#8338ec",
  "#ff006e",
  "#fb5607",
  "#ffbe0b",
];

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

// add update method to particle prototype
Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
};
// if the particle has reached the edge of the screen, switch it's direction
// draw a particle after checking

// create particle array
function init() {
  particleArray = [];
  for (let i = 0; i < 100; i++) {
    let size = Math.random() * 50; // a random number between 0 and 50(default between 0 and 20)
    let x = Math.random() * (innerWidth - size * 2); // a random number between 0 and canvas width
    let y = Math.random() * (innerHeight - size * 2); // a random number between 0 and canvas height
    let directionX = Math.random() * 2; // a random number between 0 and 2(default between -0.2 and -0.2)
    let directionY = Math.random() * 2; // a random number between 0 and 2(default between -0.2 and -0.2)
    let color = colors[Math.floor(Math.random() * colors.length)];

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}
// initializes particles and passes random values to each particle,
// then pushes the particle to particleArray

// animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

// clear a canvas in each frame with ctx.clearRect(),
// otherwise the particles will leave trail.
// it will delete the entire canvas over and over,
// so it's ready for an update to occur.
// then, the for loop will traverse over the particleArray,
// and run the update method for each particle.
// the update method checks if the particle has reached the edge of the screen,
// if it has, the particle's direction is reversed,
// if it hasn't, the particle is drawn

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
// without this eventlistener, the screen stretches when you resize the window
// whenever the window is resized, canvas.width and canvas.height are updated with
// the new innerWidth and innerHeight, and init function is called again
