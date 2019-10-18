

function PreyClass(x, y, vx, vy, ax, ay, radius, numOrbiters, place, numballs){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;
  this.orbiter = [];
  this.numballs = numballs;
  this.place = place;
  this.isHunted = false;
  this.hunter = false;

}

//animate fucntions
PreyClass.prototype.render = function(){
  //   ctx.strokStyle = 'rgb(255, 204, 204)';
  //   ctx.fillStyle = 'rgb(255, 204, 204)';
  //
  // ctx.beginPath()
  // ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  // ctx.stroke();
  // ctx.fill();
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

PreyClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();

  this.acc.setMagnitude(0);
}

PreyClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > window.innerHeight){
    this.vel.y = -this.vel.y;
  }
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
