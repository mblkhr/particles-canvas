// Get refences to the elements and the context
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Control ui
let playing = true;
let animationSpeed = 3;
const controls = document.querySelector('.controls');
const playButton = document.getElementById('playAnim');
const pauseButton = document.getElementById('pauseAnim');
const speedSlider = document.getElementById('speedAnim');
const hideControls = document.getElementById('hideControls');
const showControls = document.querySelector('.showControls');

showControls.onclick = () => {
  console.log('showing controls');
  controls.classList.remove('hidden');
  showControls.classList.add('hidden');
}

hideControls.onclick = () => {
  console.log('hiding controls');
  console.log(controls.style);
  controls.classList.add('hidden');
  showControls.classList.remove('hidden');
}

window.addEventListener('keypress', (e) => {
  if(e.key == 'c')
    document.querySelector(".controls").style.display = '';
})

speedSlider.value = animationSpeed;
playButton.onclick = () => playing = true;
pauseButton.onclick = () => playing = false;
speedSlider.onchange = () => {
  animationSpeed = speedSlider.value;
  console.log(animationSpeed)
}
// speedSlider.ondrag((e) => {
//   animationSpeed = e.value;
// })


console.log('the script is running');
console.log(ctx);

// assign the heigh and the width variables of the canvas to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = []; // Array will store particles

// Mouse object to store mouse information
let mouse = {
  x: null,
  y: null, 
  radius: (canvas.height / 80) * (canvas.width / 80)
}

// Attach an event listener to the window for the mouse movement
// event which has access to a mouse event object
window.addEventListener('mousemove', (e) => {
  // Update mouse information
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// @param (start) the start color
// @param (end) the end colour
const random_hex_color_code = (start, end) => { 
  let n = ((Math.random() * (end - start) + start)).toString(16); 
  return '#' + n.slice(0, 6); 
};

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.ox = x;
    this.oy = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = random_hex_color_code(0xffffaa, 0xffffff); 
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false,);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Bound checking
    if(this.x > canvas.width || this.x < 0) {
      this.dirX *= -1; // invert the value to go the other way
    }

    if(this.y > canvas.height || this.y < 0) {
      this.dirY *= -1;
    }

    // Update position with direction values
    this.x += this.dirX * animationSpeed;
    this.y += this.dirY * animationSpeed;

    // // Check collision with cursor radius
    // let dx = mouse.x - this.x;
    // let dy = mouse.y - this.y;
    // let pow = Math.pow;
    // let distance = Math.sqrt(pow(dx, 2) + pow(dx, 2));
    // if (distance < mouse.radius + this.size) {
    //   this.x -= dx;
    //   this.y -= dy;
    // }
    // else {
    //   this.x = this.ox;
    //   this.y = this.oy;
    // }

  }

}


const init = () => {
  console.log('initialising...');
  // isRootLoc();
  particleArray = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 50; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dirX = Math.random() * 2 - 1;
    let dirY = Math.random() * 2 - 1;
    let size = Math.random() * 7 + 1; // From 1 t0 8
    // not passing in color for now
    particleArray[i] = new Particle(x, y, dirX, dirY, size, null);
    particleArray[i].draw(); // Draw the particles
  }
}

const isRootLoc = () => {
  if (window.location == 'http://127.0.0.1:5500/') {
    console.log('you are at root loc');
  }
  else {
    console.log('you are not at root');
  }
  console.log(`you are at ${window.location}`)
  console.log(window.locationbar);
} 

const animate = () => {
  requestAnimationFrame(animate);
  if(playing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particleArray) {
      particle.update();
      particle.draw();
    }
  }
}

// init();
animate();

window.addEventListener('keypress', () => {
  init();
});

window.addEventListener('resize', () => {
  // assign the heigh and the width variables of the canvas to fill the screen
  console.log('resizing...');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // init();
});
