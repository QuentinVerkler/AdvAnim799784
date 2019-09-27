//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, x, y, orbitRadius){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.loc = new JSVector(ball.loc.x + orbitRadius, ball.loc.y + orbitRadius);
  this.orbitRadius = orbitRadius;
}

Orbiter.prototype.rener = function(){
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(171, 10, 10)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

Orbiter.prototype.update = funciton(){
  this.loc.x = ball.loc.x + this.orbitRadius*Math.cos(this.angle);
  this.loc.y = ball.loc.y + this.orbitRadius*Math.sin(this.angle);
  this.angle += this.angleV;
}
