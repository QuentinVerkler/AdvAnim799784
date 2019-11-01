//TailClass: a class that makes tails attatched to HeadClass

//constructor
function TailClass(head, inFront, length, distance){
  //the three primary vectors
  this.loc = new JSVector(head.loc.x, head.loc.y + length);
  //knows the head
  this.head = head;
  //knows what's in front
  this.front = inFront;
  //dimensions of tail
  this.length = length
  //this is the distance between this segment and the head
  this.distance = distance;
}

//animation functions
TailClass.prototype.render = function(){
  ctx.strokeStyle = 'rgba(44, 138, 23, .7)';
  ctx.lineWidth = '5';
  ctx.fillStyle = 'rgba(11, 41, 212, .7)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.head.vel.getDirection() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(this.front.distance, 0);
  ctx.lineTo(this.front.distance, 0);
  ctx.lineTo(this.distance, this.length);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

TailClass.prototype.update = function(){
  this.follow();
  this.loc.x = this.head.loc.x + -this.distance * Math.cos(this.head.vel.getDirection());
  this.loc.y = this.head.loc.y + -this.distance * Math.sin(this.head.vel.getDirection());
}

TailClass.prototype.run = function(){
  this.update();
  this.render();
}

//Tail specific functions
TailClass.prototype.follow = function(){
  //if(this.loc.distance(this.front.loc) > this.distance){
    var change;
    change = JSVector.subGetNew(this.head.loc, this.loc);
    // change.normalize();
    // change.multiply(1);
  //}
}
