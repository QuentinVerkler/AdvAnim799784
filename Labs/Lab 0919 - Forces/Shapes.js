//BallClass: A class to make balls

//class constructor
function BallClass(x, y, vx, vy, ax, ay, radius){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;

}

//funtions
BallClass.prototype.render = function(){
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255,105,180)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

BallClass.prototype.applyForce = function(attract, loc){
  this.acc.setMagnitude(0);
  var force;
  if(attract){
    force = JSVector.subGetNew(loc, this.loc);
  }
  else {
    force = JSVector.subGetNew(this.loc, loc);
  }
  force.normalize();
  force.multiply(.5);
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
}

BallClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > window.innerWidth){
    this.vel.x = -this.vel.x;
    //this.acc.x = -this.acc.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > window.innerHeight){
    this.vel.y = -this.vel.y;
    //this.acc.y = -this.acc.y;
  }

}

//TriClass: A class to make triangles

//class constructor
function TriClass(x1, y1, x2, y2, x3, y3, vx, vy, ax, ay){
  this.p1 = new JSVector(x1, y1);
  this.p2 = new JSVector(x2, y2);
  this.p3 = new JSVector(x3, y3);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
}

//functions
TriClass.prototype.render = function(){
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255,105,180)';

  ctx.beginPath();
  ctx.moveTo(this.p1.x, this.p1.y);
  ctx.lineTo(this.p2.x, this.p2.y);
  ctx.lineTo(this.p3.x, this.p3.y);
  ctx.stroke();
  ctx.fill();
}

TriClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.p1.add(this.vel);
  this.p2.add(this.vel);
  this.p3.add(this.vel);
}

TriClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
}

//not working
TriClass.prototype.check = function(){
  if(this.p1.x < 0 || this.p1.x > window.innerWidth || this.p2.x < 0 || this.p2.x > window.innerWidth || this.p3.x < 0 || this.p3.x > window.innerWidth){
    this.vel.x = -this.vel.x;
    //this.acc.x = -this.acc.x;
  }
  if(this.p1.y < 0 || this.p1.y > window.innerHeight || this.p2.y < 0 || this.p2.y > window.innerHeight || this.p3.y < 0 || this.p3.y > window.innerHeight){
    this.vel.y = -this.vel.y;
    //this.acc.y = -this.acc.y;
  }

}
