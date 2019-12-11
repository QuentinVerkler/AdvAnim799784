//SuicideClass: makes creatures who explode if any ball or snake gets near it

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function SuicideClass(x, y, vx, vy, ax, ay){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.maxSpeed = 5;
  this.maxForce = .2;
  //suicide variables
  this.creatureNear = null;
  this.isDead = false;
  this.doSplice = false;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
SuicideClass.prototype.render = function(){
  ctx.strokeStyle = 'hsl(0, 100%, 71%)';
  ctx.fillStyle = 'hsl(0, 100%, 71%)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(7, 0);
  ctx.lineTo(7, -7);
  ctx.lineTo(0, -10);
  ctx.lineTo(-7, -7);
  ctx.lineTo(-7, 0);
  ctx.lineTo(0, 10);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

SuicideClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

SuicideClass.prototype.check = function(){
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

SuicideClass.prototype.run = function(){
  this.check();
  this.update();
  this.render();
  this.checkDead();
}

//+++++++++++++++++++++++++++++ SuicideClass functions ++++++++++++++++++++++++++++
SuicideClass.prototype.addForce = function(force){
  this.acc.add(force);
}

SuicideClass.prototype.checkDead = function(){
  if(this.isDead){
    collisionLocX = this.loc.x;
    collisionLocY = this.loc.y;

    var collisionEvent = new Event("explode");
    window.dispatchEvent(collisionEvent);

    //plays a sound
    var deathSound = document.getElementById("suicideDeath");

    deathSound.play();

    this.doSplice = true;
  }
}


//repells this ball from a location
SuicideClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}
