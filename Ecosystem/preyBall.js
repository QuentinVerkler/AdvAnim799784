//a class for balls who are hunted by snakes but will protect themselves

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function PreyBall(x, y, vx, vy, ax, ay, r, maxSpeed, maxForce){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = r;
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;

  //prey functions
  this.isHunted = false;
  this.hunter = null;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
PreyBall.prototype.render = function(){
  ctx.strokeStyle = 'hsl(326, 50%, 35%)';
  if(this.isHunted){
    ctx.fillStyle = 'hsl(120, 40%, 67%)';
  }else{
    ctx.fillStyle = 'hsl(326, 50%, 35%)';
  }

  //drawing part
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

PreyBall.prototype.update = function(){
  if(this.isHunted){
    this.repulse(this.hunter.loc, .03);
  }
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

PreyBall.prototype.check = function(){
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }else if (this.loc.y > cnv.height - 40) {
    desire = new JSVector(this.vel.x, -this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce * 1.1);
    this.addForce(steer);
  }
}

PreyBall.prototype.run = function(){
  this.check();
  this.update();
  this.render();
}

//++++++++++++++++++++++++++++++++ PreyBall functions +++++++++++++++++++++++++++++
BirdClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}
