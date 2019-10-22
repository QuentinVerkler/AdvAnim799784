

function PreyClass(x, y, vx, vy, ax, ay, place, numballs){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.numballs = numballs;
  this.place = place;
  this.isHunted = false;
  this.hunter = false;
  this.isDead = false;
}

//animate fucntions
PreyClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(136, 3, 252)';
  ctx.fillStyle = 'rgb(3, 232, 252)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(-9, -12);
  ctx.lineTo(0, 15);

  ctx.lineTo(9, -12);


  ctx.lineTo(0, -3);
  ctx.lineTo(-9, -12);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

PreyClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
}

PreyClass.prototype.check = function(){
  if(this.loc.x < 12 || this.loc.x + 12 > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < 12 || this.loc.y + 12 > window.innerHeight){
    this.vel.y = -this.vel.y;
  }
}

PreyClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();

  this.acc.setMagnitude(0);
}

//other functions
PreyClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

PreyClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
}

PreyClass.prototype.hunted = function(loc, mag){
  var speed;
  speed = JSVector.subGetNew(loc, this.loc);
  speed.normalize();
  speed.multiply(mag);
  this.loc.add(speed);
}
