const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];

let mouseDown = false;

addEventListener('mousedown', () => {
    mouseDown = true;
});

addEventListener('mouseup', () => {
    mouseDown = false;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

//Objects
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

Object.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
}

Object.prototype.update = function () {
    this.draw();
}

//Implementation
let particles;
function init() {
    particles = [];

    for (let i = 0; i < 600; i++) {
        const canvasWidth = canvas.width + 500;
        const canvasHeight = canvas.height + 500;
        const x = (Math.random() * canvasWidth) - canvasWidth / 2;
        const y = (Math.random() * canvasHeight) - canvasHeight / 2;
        const radius = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, radius, color));
    }
}

//Animation loop
let radians = 0;
let alpha = 1;

function animate() {
    requestAnimationFrame(animate);

    c.fillStyle = `rgba(10,10,10,${alpha})`;
    c.fillRect(0, 0, canvas.width, canvas.height);


    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);
    c.rotate(radians);
    particles.forEach(particle => {
        particle.update();
    });
    c.restore();

    radians += 0.005;

    if (mouseDown && alpha >= 0.1) {
        alpha -= 0.1;
    } else if (!mouseDown && alpha < 1) {
        alpha += 0.01;
    }
}

init();
animate();
