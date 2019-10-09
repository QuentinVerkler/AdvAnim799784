//BallClass: A class to make balls

//class constructor
function BallClass(x, y, vx, vy, ax, ay, radius, numOrbiters, hunter, range, place, numballs){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;
  this.orbiter = [];
  this.hunter = hunter;
  this.range = range;
  this.numballs = numballs;
  this.place = place;
  for(let a = 0; a < numOrbiters; a++){
    this.orbiter[a] = new Orbiter(5, (2*Math.PI/numOrbiters) * a, .03, 120, this.loc, 1, 240, radius, place, hunter, range, numballs);
  }
}

// instance funtions
BallClass.prototype.render = function(){
  if(this.hunter === true){
    //hunters are green
    ctx.strokStyle = 'rgb(255,105,180)';
    ctx.fillStyle = 'rgb(94, 235, 52)';
  }else{
    ctx.strokStyle = 'rgb(255, 204, 204)';
    ctx.fillStyle = 'rgb(255, 204, 204)';
  }

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

BallClass.prototype.attract = function(loc, mag){
  var force;
  force = JSVector.subGetNew(loc, this.loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

BallClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

BallClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
}

BallClass.prototype.hunt = function(loc, mag){
  var speed;
  speed = JSVector.subGetNew(loc, this.loc);
  speed.normalize();
  speed.multiply(mag);
  this.loc.add(speed);
}

BallClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
  for(let a = 0; a < this.orbiter.length; a++){
    this.orbiter[a].update();
    if(this.hunter === true){
      for(let b = 0; b < this.numballs; b++){
        if(ball[b].hunter === false && this.loc.distance(ball[b].loc) < this.range && this.place != b){
          this.orbiter[a].hunt(ball[b], this.loc.distance(ball[b].loc) - this.radius - ball[b].radius + this.orbiter[a].radius);
          if(this.loc.distance(ball[b].loc) > this.radius + ball[b].radius){
            ball[b].hunt(this.loc, .5);
          }else{
            ball[b].vel = this.vel;
            ball[b].acc = this.acc;
          }
          b = this.numballs;
        }else{
          this.orbiter[a].return(ball[b]);
        }
      }
    }
    this.orbiter[a].render();
  }
  this.acc.setMagnitude(0);
}

BallClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > window.innerHeight){
    this.vel.y = -this.vel.y;
  }
}

//+++++++++++++++END CLASS+++++++++++++++++++++++++++++++++++++++++
