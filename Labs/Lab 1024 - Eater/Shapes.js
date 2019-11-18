//BallClass: A class to make balls

//class constructor
function BallClass(x, y, vx, vy, ax, ay, radius, place, numOrbiters, range, numPrey){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;
  this.orbiter = [];
  this.place = place;
  this.range = range;
  this.numPrey = numPrey;
  this.isHunting = false;
  this.preyHunting = null;
  this.wasSpliced = false;
  for(let a = 0; a < numOrbiters; a++){
    this.orbiter[a] = new Orbiter(4, (2*Math.PI/numOrbiters) * a, .03, radius, this.loc, 1, 240, true, range, this);
  }
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
BallClass.prototype.render = function(){
  //hunters are green
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.fillStyle = 'rgb(94, 235, 52)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

BallClass.prototype.update = function(){
  if(this.isHunting){
    this.hunt(this.preyHunting.loc, 1);
  }
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
}

BallClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > cnv.width){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > cnv.height){
    this.vel.y = -this.vel.y;
  }
}

BallClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
  for(let a = 0; a < this.orbiter.length; a++){
    this.orbiter[a].update();
    this.orbiter[a].render();
  }
  this.acc.setMagnitude(0);
}

//++++++++++++++++++++++++++++++++ Tail specific functions ++++++++++++++++++++++++
//attracts this ball to a location
BallClass.prototype.attract = function(loc, mag){
  var force;
  force = JSVector.subGetNew(loc, this.loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

//repells this ball from a location
BallClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

//may get rid of; supposed to attract ball to prey
BallClass.prototype.hunt = function(loc, mag){
  var speed;
  speed = JSVector.subGetNew(loc, this.loc);
  speed.normalize();
  speed.multiply(mag);
  this.loc.add(speed);
}

BallClass.prototype.stopRotation = function(){
  for(let a = 0; a < this.orbiter.length; a++){
    this.orbiter[a].angleV = 0;
  }
}

BallClass.prototype.startRotation = function(){
  for(let a = 0; a < this.orbiter.length; a++){
    this.orbiter[a].angleV = this.orbiter[a].oGAngleV;
  }
}

// //checks if this ball is equal to another ball
// BallClass.prototype.isEqual = function(other){
//   return this.loc.x === other.loc.x && this.loc.y === other.loc.y && this.vel.x === other.vel.x && this.vel.y = other.vel.y && this.radius = other.radius && this.isHunting = other.isHunting
// }
//+++++++++++++++END CLASS+++++++++++++++++++++++++++++++++++++++++
