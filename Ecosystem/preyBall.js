//a class for balls who are hunted by snakes but will protect themselves

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function PreyBall(x, y, vx, vy, ax, ay, r, maxSpeed, maxForce){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = r;
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;

  //prey functions
  this.isHunted = false;
  this.hunter = null;
  this.decoys = null;
  this.decoySpawn = 0;
  this.isDead = false;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
PreyBall.prototype.render = function(){
  ctx.strokeStyle = 'hsl(326, 50%, 35%)';
  if(this.isHunted){
    ctx.fillStyle = 'hsl(120, 40%, 67%)';
  }else{
    ctx.fillStyle = 'hsl(326, 50%, 35%)';
  }

  //drawing part
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

PreyBall.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

PreyBall.prototype.check = function(){
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * .8);
    this.addForce(steer);
  }else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * .8);
    this.addForce(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * .8);
    this.addForce(steer);
  }else if (this.loc.y > cnv.height - 40) {
    desire = new JSVector(this.vel.x, -this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * .8);
    this.addForce(steer);
  }
}

PreyBall.prototype.run = function(){
  this.check();
  this.update();
  this.render();
  if(this.isHunted){
    this.defense();
  }else{
    this.decoys = null;
  }
  this.checkSuicide();
}

//++++++++++++++++++++++++++++++++ PreyBall functions +++++++++++++++++++++++++++++
PreyBall.prototype.defense = function(){
  if(this.decoys === null){
    this.decoys = new ParticleSystem(this.loc.x, this.loc.y, 15, 'hsl(265, 61%, 21%)', Math.random()*2 + 2, true);
    particleSystems.push(this.decoys);
  }else{
    if(this.decoySpawn === 15){
      this.decoys.particles.push(new ParticleClass(this.loc.x, this.loc.y, Math.random()*4-2, Math.random()*4-2, Math.random()*150+200, 'hsl(265, 61%, 21%)', Math.random()*2 + 2, true));
      this.decoySpawn = 0;
    }else{
      this.decoySpawn += 1;
    }
  }
}

PreyBall.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

PreyBall.prototype.addForce = function(force){
  this.acc.add(force);
}

//checks if a suicide creature is near and runs away if it is
PreyBall.prototype.checkSuicide = function(){
  for(let i = suicideSquad.length-1; i >= 0; i--){
    var distance = this.loc.distance(suicideSquad[i].loc);
    if(distance <= 200){
      suicideSquad[i].repulse(this.loc, .1);
    }
    if(distance <= this.radius + 5){
      this.isDead = true;
      suicideSquad[i].isDead = true;
    }
  }
}
