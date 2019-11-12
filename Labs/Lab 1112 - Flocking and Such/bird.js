//bird class: makes different flocks

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function BirdClass(x, y, vx, vy, ax, ay, flock, maxSpeed, maxForce){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.flock = flock;
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
BirdClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(136, 3, 252)';
  ctx.fillStyle = 'rgb(156, 23, 14)';

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

BirdClass.prototype.update = function(){
  this.separation();
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
}

BirdClass.prototype.check = function(){
  var desire;
  if(this.loc.x < 25){
    desire = new JSVector(this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }else if(this.loc.x > cnv.width - 25){
    desire = new JSVector(-this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }
  if(this.loc.y < 25){
    desire = new JSVector(this.vel.x, this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }else if (this.loc.y > cnv.height - 25) {
    desire = new JSVector(this.vel.x, -this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }
}

BirdClass.prototype.run = function(){
  this.check();
  this.update();
  this.render();

  this.acc.setMagnitude(0);
}

//++++++++++++++++++++++++++++++++ Bird functions +++++++++++++++++++++++++++++++++
BirdClass.prototype.addForce = function(force){
  this.acc.add(force);
}

BirdClass.prototype.separation = function(){
  var sum = new JSVector(0, 0);
  var count = 0;
  for(let i = 0; i < flock.length; i++){
    var distance = this.loc.distance(flock[i].loc)
    if(distance > 0 && distance < 25){
      var diff = JSVector.subGetNew(this.loc, flock[i].loc);
      diff.normalize();
      diff.divide(distance);
      sum.add(diff);
      count++
    }
  }

  if(count > 0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed);
    var steer = new JSVector(sum, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }
}
