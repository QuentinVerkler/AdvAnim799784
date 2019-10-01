//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, x, y, orbitRadius, ballLoc, deltaR, max, min, place, hunter, range, numballs){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.loc = new JSVector(x, y);
  this.orbitRadius = min;
  this.ballLoc = ballLoc;
  this.deltaR = deltaR;
  this.max = max;
  this.min = min;
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

Orbiter.prototype.hunt = function(ball){
  this.orbitRadius = this.loc.distance(ball.loc);
  this.orbitRadius = this.min;
  ball.loc.x = this.loc.x + this.radius;
  ball.loc.y = this.loc.y + this.radius;
}

Orbiter.prototype.update = function(){
    this.check();
    this.loc.x = this.ballLoc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = this.ballLoc.y + this.orbitRadius*Math.sin(this.angle);
    this.angle += this.angleV;
    for(let a = 0; a < numballs; a++){
      if(!ball[a].hunter && ball[this.place].loc.distance(ball[a].loc) < this.range && this.balNum != a){
        this.hunt(ball[a]);
        a = numballs;
      }
    }
}

Orbiter.prototype.check = function(){
  if(this.orbitRadius > this.max || this.min > this.orbitRadius){
    this.deltaR = this.deltaR * -1;
  }
}
