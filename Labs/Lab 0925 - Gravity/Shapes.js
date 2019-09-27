//BallClass: A class to make balls

//class constructor
function BallClass(x, y, vx, vy, ax, ay, radius, numOrbiters){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;
  this.orbiter = [];
  for(let a = 0; a < numOrbiters; a++){
    this.orbiter[a] = new Orbiter(10, (2*Math.PI/numOrbiters) * a, .05, 0, 0, 120, this.loc, 1, 240, radius);
  }

}

// instance funtions
BallClass.prototype.render = function(){
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(94, 235, 52)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

BallClass.prototype.attract = function(loc, mag){
  var force;
  force = JSVector.subGetNew(loc, this.loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

BallClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

BallClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
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

BallClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > window.innerHeight){
    this.vel.y = -this.vel.y;
  }

}

//+++++++++++++++END CLASS+++++++++++++++++++++++++++++++++++++++++
