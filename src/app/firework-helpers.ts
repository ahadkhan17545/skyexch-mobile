export function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  export function calculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x,
      yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
  
  // create firework
  export function Firework(sx, sy, tx, ty) {
    // actual coordinates
    this.x = sx;
    this.y = sy;
    // starting coordinates
    this.sx = sx;
    this.sy = sy;
    // target coordinates
    this.tx = tx;
    this.ty = ty;
    // distance from starting point to target
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;
    // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 500;
    // populate initial coordinate collection with the current coordinates
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(50, 70);
    // circle target indicator radius
    this.targetRadius = 1;
  }
  
  // create particle
  export function Particle(x, y, hue) {
    this.x = x;
    this.y = y;
    // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    // set a random angle in all possible directions, in radians
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);
    // friction will slow the particle down
    this.friction = 0.95;
    // gravity will be applied and pull the particle down
    this.gravity = 1;
    // set the hue to a random number +-50 of the overall hue variable
    this.hue = random(hue - 50, hue + 50);
    this.brightness = random(50, 80);
    this.alpha = 1;
    // set how fast the particle fades out
    this.decay = random(0.015, 0.03);
  }
  
  // create particle group/explosion
  export function createParticles(x, y, hue, particle) {
    // increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
    var particleCount = 30;
    while (particleCount--) {
      particle.push(new Particle(x, y, hue));
    }
  }
  