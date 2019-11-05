//TailClass: a class that makes tails attatched to HeadClass

//constructor
function TailClass(head, inFront, length, distance){
  //the three primary vectors
  this.loc = new JSVector(head.loc.x, head.loc.y + length);
  //knows the head
  this.head = head;
  //knows what's in front
  this.front = inFront;
  //dimension of tail
  this.length = length
  //this is the distance between this segment and the head
  this.distance = distance;
}

//animation functions
TailClass.prototype.render = function(){
  ctx.strokeStyle = 'rgba(44, 138, 23, .7)';
  ctx.lineWidth = '7';
  ctx.fillStyle = 'rgba(11, 41, 212, .7)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.getAngle() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, -this.length);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

//currenctlty not working
TailClass.prototype.update = function(){
  //this makes the snake rigid
  //this.loc.x = this.head.loc.x + -this.distance * Math.cos(this.head.vel.getDirection());
  //this.loc.y = this.head.loc.y + -this.distance * Math.sin(this.head.vel.getDirection());
  //this makes the tail not fully rotate, still rigid
  this.loc.x = this.front.loc.x - this.length * Math.cos(this.front.loc.getDirection());
  this.loc.y = this.front.loc.y - this.length * Math.sin(this.front.loc.getDirection());
}

TailClass.prototype.run = function(){
  this.update();
  this.render();
}

//Tail specific functions

//gets angle between this tail and front
TailClass.prototype.getAngle = function(){
  var vector = JSVector.subGetNew(this.loc, this.front.loc);
  return vector.getDirection();
}

//gets vector between front and this
TailClass.prototype.getVectorBetween = function(){
  return JSVector.subGetNew(this.front.loc, this.loc);
}

//this is old function that may be scrapped
TailClass.prototype.follow = function(){
  //if(this.loc.distance(this.front.loc) > this.distance){
    var change;
    change = JSVector.subGetNew(this.head.loc, this.loc);
    // change.normalize();
    // change.multiply(1);
  //}
}