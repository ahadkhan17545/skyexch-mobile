import {
    calculateDistance,
    createParticles,
    Firework,
    Particle
  } from "./firework-helpers";
  
  export {}; // this will make it module
  
  declare global {
    // this is important to access it as global type String
    interface Firework {
      update(
        i: number,
        fireworks: Array<Firework>,
        particles: Array<Particle>
      ): any;
      draw(ctx: any, hue: number): any;
    }
    interface Particle {
      update(i: number, fireworks: Array<Firework>): any;
      draw(ctx: any, hue: number): any;
    }
    interface String {
      capitalizeFirstLetter(): string;
      trimWhiteSpaces(): string;
      capitalizeEachWord(): string;
    }
  }
  
  String.prototype.trimWhiteSpaces = function() {
    return this.split(" ").join("");
  };
  
  String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
  
  String.prototype.capitalizeEachWord = function() {
    var index, word, words, _i, _len;
    words = this.split(" ");
    for (index = _i = 0, _len = words.length; _i < _len; index = ++_i) {
      word = words[index].charAt(0).toUpperCase();
      words[index] = word + words[index].substr(1);
    }
    return words.join(" ");
  };
  // update firework
  Firework.prototype.update = function(
    index,
    fireworks: Array<Firework>,
    particles: Array<Particle>
  ) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
  
    // cycle the circle target indicator radius
    if (this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }
  
    // speed up the firework
    this.speed *= this.acceleration;
  
    // get the current velocities based on angle and speed
    var vx = Math.cos(this.angle) * this.speed,
      vy = Math.sin(this.angle) * this.speed;
    // how far will the firework have traveled with velocities applied?
    this.distanceTraveled = calculateDistance(
      this.sx,
      this.sy,
      this.x + vx,
      this.y + vy
    );
  
    // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
    if (this.distanceTraveled >= this.distanceToTarget) {
      createParticles(this.tx, this.ty, this.hue, particles);
      // remove the firework, use the index passed into the update function to determine which to remove
      fireworks.splice(index, 1);
    } else {
      // target not reached, keep traveling
      this.x += vx;
      this.y += vy;
    }
  };
  
  Firework.prototype.draw = function(ctx, hue) {
    ctx.beginPath();
    // move to the last tracked coordinate in the set, then draw a line to the current x and y
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    );
    ctx.lineWidth = 5;
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
    // ctx.stroke();
  
    ctx.beginPath();
    // draw the target for this firework with a pulsing circle
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
    // ctx.stroke();
  };
  
  // update particle
  Particle.prototype.update = function(index, particles) {
    // remove last item in coordinates array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);
    // slow down the particle
    this.speed *= this.friction;
    // apply velocity
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    // fade out the particle
    this.alpha -= this.decay;
  
    // remove the particle once the alpha is low enough, based on the passed in index
    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  };
  
  Particle.prototype.draw = function(ctx, hue) {
    ctx.beginPath();
    // move to the last tracked coordinates in the set, then draw a line to the current x and y
    ctx.moveTo(
      this.coordinates[this.coordinates.length - 1][0],
      this.coordinates[this.coordinates.length - 1][1]
    );
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle =
      "hsla(" + hue + ", 100%, " + this.brightness + "%, " + this.alpha + ")";
    ctx.stroke();
  };
  