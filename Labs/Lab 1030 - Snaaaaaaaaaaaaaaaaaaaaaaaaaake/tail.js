//TailClass: a class that makes tails attatched to HeadClass

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function TailClass(head, inFront, length, distance, opacity, width){
  //the three primary vectors
  this.loc = new JSVector(inFront.loc.x, inFront.loc.y + distance);
  //knows what's in front
  this.front = inFront;
  //dimension of tail
  this.length = length;
  this.width = width;
  //this gives distance from one in front
  this.distanceFront = this.loc.distance(inFront.loc);
  //makes opacity of tail
  this.opacity = opacity;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
TailClass.prototype.render = function(){
  ctx.strokeStyle = 'rgba(44, 138, 23, ' + this.opacity + ')';
  ctx.lineWidth = this.width * 1.5;
  ctx.lineJoin = 'round';

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

TailClass.prototype.update = function(){
  var angle = this.getAngle();
  this.loc.x = this.front.loc.x - this.distanceFront * 1 * Math.cos(angle);
  this.loc.y = this.front.loc.y - this.distanceFront * 1 * Math.sin(angle);
}

TailClass.prototype.run = function(){
  this.update();
  this.render();
}

//++++++++++++++++++++++++++++++++ Tail specific functions ++++++++++++++++++++++++

//gets angle between this tail and front
TailClass.prototype.getAngle = function(){
  var vector = JSVector.subGetNew(this.front.loc, this.loc);
  return vector.getDirection();
}
