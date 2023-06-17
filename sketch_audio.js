let song;
let amplitude;
let particles = [];
let flowfield;
const scl = 20;
const cols = Math.floor(window.innerWidth / scl);
const rows = Math.floor(window.innerHeight / scl);

function preload() {
  song = loadSound('moon.flac');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // calc amplitude
  amplitude = new p5.Amplitude();
  flowfield = new Array(cols * rows);

  // create particles
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }

  song.play();
}

function draw() {
  background(0, 10); // add transparency to create tracers

  // get the current audio, and displace particles based on volumnme
  let level = amplitude.getLevel();
  let displacement = map(level, 0, 1, -100, 100);


  // generate flow field
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff) * TWO_PI * 4;

      // calc angle based on perlin noise
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += 0.1;
      stroke(0, 50);
    }
    yoff += 0.1;
  }


  // adjust num of particles based on aduio levels
  let particleCount = map(level, 0, 1, 200, 1000);

  if (particles.length < particleCount) {
    for (let i = 0; i < particleCount - particles.length; i++) {
      particles.push(new Particle());
    }
  } else if (particles.length > particleCount) {
    particles.splice(particleCount);
  }

  // update particles
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.follow(flowfield);
    particle.update();
    particle.edges();
    particle.show(displacement);
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
    this.color = color(random(255), random(255), random(255)); // Random initial color
    this.alpha = 255; // Initial alpha value
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show(displacement) {
    let interpValue = map(this.pos.y + displacement, 0, height, 0, 1);
    let currentColor = lerpColor(color(0, 0, 255), color(148, 0, 211), interpValue);
    this.color = lerpColor(this.color, currentColor, 0.05); // Smoothly transition colors
    this.alpha -= 1; // Fade out over time

    stroke(this.color, this.alpha);
    strokeWeight(2); // Increase particle thickness
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
