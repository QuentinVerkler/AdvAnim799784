//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, x, y, orbitRadius, ballLoc, deltaR, max, min){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.loc = new JSVector(x, y);
  this.orbitRadius = orbitRadius;
  this.ballLoc = ballLoc;
  this.deltaR = deltaR;
  this.max = max;
  this.min = min;
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

Orbiter.prototype.update = function(){
    this.loc.x = this.ballLoc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = this.ballLoc.y + this.orbitRadius*Math.sin(this.angle);
    this.angle += this.angleV;
    this.check();
    this.orbitRadius += this.deltaR
}

Orbiter.prototype.check = function(){
  if(this.orbitRadius > this.max || this.min > this.orbitRadius){
    this.deltaR = this.deltaR * -1;
  }
}
