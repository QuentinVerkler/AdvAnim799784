//BallHunterClass: makes ball hunters that hunt birds

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function BallHunterClass(x, y, vx, vy, ax, ay, radius, numOrbiters, range, maxSpeed, maxForce){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;
  this.orbiter = [];
  this.range = range;
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;
  //hunting vars
  this.isHunting = false;
  this.preyHunting = null;
  this.wasSpliced = false;
  for(let a = 0; a < numOrbiters; a++){
    this.orbiter[a] = new Orbiter(5, (2*Math.PI/numOrbiters) * a, .03, radius, range, this);
  }
  //prey vars
  this.isDead = false;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
BallHunterClass.prototype.render = function(){
  //hunters are green
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.fillStyle = 'hsl(14, 61%, 41%)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

BallHunterClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeeds);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

BallHunterClass.prototype.check = function(){
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }else if (this.loc.y > cnv.height - 40) {
    desire = new JSVector(this.vel.x, -this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }
}

BallHunterClass.prototype.run = function(){
  this.check();
  this.update();
  this.render();
  for(let a = 0; a < this.orbiter.length; a++){
    this.orbiter[a].update();
    this.orbiter[a].render();
  }
  this.checkSuicide();
}

//++++++++++++++++++++++++++++++++ Ball specific functions ++++++++++++++++++++++++
//attracts this ball to a location
BallHunterClass.prototype.attract = function(loc, mag){
  var force;
  force = JSVector.subGetNew(loc, this.loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

//repells this ball from a location
BallHunterClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

BallHunterClass.prototype.addForce = function(force){
  this.acc.add(force);
}

//checks if a suicide creature is near and runs away if it is
BallHunterClass.prototype.checkSuicide = function(){
  for(let i = suicideSquad.length-1; i >= 0; i--){
    var distance = this.loc.distance(suicideSquad[i].loc);
    if(distance <= 200){
      this.repulse(suicideSquad[i].loc, .09);
    }
    if(distance <= this.radius + 5){
      this.isDead = true;
      suicideSquad[i].isDead = true;
    }
  }
}
