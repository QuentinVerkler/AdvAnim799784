//a class to make particle systems

//constructor
function ParticleSystem(x, y, vx, vy, ax, ay, radius){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;
  this.particles = [];
}

//render functions
ParticleSystem.prototype.render = function(){
  ctx.strokeStyle = 'rgb(136, 3, 252)';
  ctx.fillStyle = 'rgb(245, 66, 66)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

ParticleSystem.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
}

ParticleSystem.prototype.check = function(){
  if(this.loc.x < 0 || this.loc.x > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < 0 || this.loc.y > window.innerHeight){
    this.vel.y = -this.vel.y;
  }
}

ParticleSystem.prototype.run = function(){
  this.update();
  this.render();
  this.check();
  this.particles.push(new ShipClass(this.loc.x, this.loc.y, Math.random()*6 - 3, this.vel.y - Math.random()*7, 0, .05, 255));
  for(let a = this.particles.length - 1; a >= 0; a--){
    if(this.particles[a].isDead()){
      this.particles.splice(a, 1);
    }else{
      this.particles[a].run();
    }
  }
}
