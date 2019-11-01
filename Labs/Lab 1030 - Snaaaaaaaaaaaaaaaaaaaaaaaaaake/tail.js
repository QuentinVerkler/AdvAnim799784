//TailClass: a class that makes tails attatched to HeadClass

//constructor
function TailClass(inFront, width, height, distance){
  this.loc = new JSVector(inFront.loc.x, inFront.loc.y + height);
  this.vel = new JSVector(inFront.vel.x, inFront.vel.y);
  this.acc = new JSVector(inFront.acc.x, inFront.acc.y);
  //knows what object is infront. doesn't matter if it's a head or tail
  this.front = inFront;
  this.width = width;
  this.height = height;
  //this is the distance between this segment and whatever it is in front
  this.distance = distance;
}

//animation functions
TailClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(106, 255, 0)';
  ctx.fillStyle = 'rgb(11, 41, 212)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(this.width/2, 0);
  ctx.lineTo(this.width/2, 0);
  ctx.lineTo(this.width/2, this.height/2);
  ctx.lineTo(-this.width/2,this.height/2);
  ctx.lineTo(-this.width/2,-this.height/2);
  ctx.lineTo(this.width/2,-this.height/2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

TailClass.prototype.update = function(){
  this.acc = this.front.acc.copy();
  this.vel = this.front.vel.copy();
  this.loc.x = this.front.loc.x + -this.distance * Math.cos(this.vel.getDirection());
  this.loc.y = this.front.loc.y + -this.distance * Math.sin(this.vel.getDirection());
}

TailClass.prototype.run = function(){
  this.update();
  this.render();
}

//Tail specific functions
TailClass.prototype.follow = function(loc, mag){
  var force;
  force = JSVector.subGetNew(loc, this.loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}