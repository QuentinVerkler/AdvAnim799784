//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, orbitRadius, ballLoc, deltaR, max, min, place, hunter, range, numballs){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.oGAngleV = angleV;
  this.loc = new JSVector(0, 0);
  this.orbitRadius = min;
  this.ballLoc = ballLoc;
  this.deltaR = deltaR;
  this.max = max;
  this.planetRadius = min;
  this.place = place;
  this.hunter = hunter;
  this.range = range;
  this.numballs = numballs;
}

//instance functions
Orbiter.prototype.render = function(){
  ctx.lineWidth = '.5';
  ctx.strokStyle = 'rgb(171, 10, 10)';
  ctx.fillStyle = 'rgb(171, 10, 10)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.fill();
  ctx.stroke();
  ctx.linewidth = '.5';
  ctx.moveTo(this.ballLoc.x, this.ballLoc.y);
  ctx.lineTo(this.loc.x, this.loc.y);
  ctx.stroke();
  ctx.closePath();
}

Orbiter.prototype.extend = function(length){
  this.orbiRadius += length;
}

Orbiter.prototype.retract = function(length){
  this.orbitRadius -= length;
}

Orbiter.prototype.return = function(thisBall){
  this.angleV = this.oGAngleV;
  if(this.orbitRadius > this.planetRadius + this.radius){
    this.orbitRadius -= thisBall.vel.getMagnitude();
  }
}

Orbiter.prototype.hunt = function(thisBall, distance){
  this.angleV = 0;
  while(this.orbitRadius < distance){
    this.orbitRadius += 1;
  }
/*
  if(thisBall.loc.distance(ball[this.place].loc) - ball[this.place].radius - thisBall.radius + this.radius > 0){
    this.return();
    thisBall.loc = this.loc.copy();
    thisBall.vel = ball[this.place].vel;
    thisBall.acc = ball[this.place].acc;
  }
  */

}

Orbiter.prototype.update = function(){
    this.check();
    this.loc.x = this.ballLoc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = this.ballLoc.y + this.orbitRadius*Math.sin(this.angle);
    this.angle += this.angleV;
}

Orbiter.prototype.check = function(){
  if(this.orbitRadius > this.max || this.min > this.orbitRadius){
    this.deltaR = this.deltaR * -1;
  }
}
