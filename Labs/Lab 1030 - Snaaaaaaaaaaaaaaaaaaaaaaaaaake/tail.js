//TailClass: a class that makes tails attatched to HeadClass

//constructor
function TailClass(inFront, lengthOfFront){
  //problem: loc coming up as NaN
  this.loc = new JSVector(inFront.loc.x, inFront.loc.y + lengthOfFront);
  this.vel = new JSVector(inFront.vel.x, inFront.vel.y);
  this.acc = new JSVector(inFront.acc.x, inFront.acc.y);
  this.front = inFront;
  this.length = 20;
}

//animation functions
TailClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(11, 41, 212)';
  ctx.fillStyle = 'rgb(11, 41, 212)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(5, 0);
  ctx.lineTo(5,0);
  ctx.lineTo(5,20);
  ctx.lineTo(-5,20);
  ctx.lineTo(-5,0);
  ctx.lineTo(5,0);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

TailClass.prototype.update = function(){
  // May delete this later
  // this.acc = this.front.acc;
  // this.vel.add(this.front.acc.x, this.front.acc.y);
  this.loc.add(this.front.vel.x, this.front.vel.y);
}

TailClass.prototype.run = function(){
  this.update();
  this.render();
}
