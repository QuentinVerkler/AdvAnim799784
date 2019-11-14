//bird class: makes different flocks

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function BirdClass(x, y, vx, vy, ax, ay, flock, maxSpeed, maxForce){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.flock = flock;
  this.maxSpeed = maxSpeed;
  this.maxForce = maxForce;
  this.alignDist = .0001;
  this.cohDist = .0001;
  this.sepDist = .0001;
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
  this.steerForces();
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

BirdClass.prototype.check = function(){
  var desire;
  if(this.loc.x < 40){
    desire = new JSVector(this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }else if(this.loc.x > cnv.width - 40){
    desire = new JSVector(-this.maxSpeed, this.vel.y);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }
  if(this.loc.y < 40){
    desire = new JSVector(this.vel.x, this.maxSpeed);
    var steer = JSVector.subGetNew(desire, this.vel);
    steer.limit(this.maxForce);
    this.addForce(steer);
  }else if (this.loc.y > cnv.height - 40) {
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

}

//++++++++++++++++++++++++++++++++ Bird functions +++++++++++++++++++++++++++++++++
//this is all of the forces
BirdClass.prototype.steerForces = function(){
  this.separation();
  this.alignment();
  this.cohesion();
}

//adds force to acc
BirdClass.prototype.addForce = function(force){
  this.acc.add(force);
}

BirdClass.prototype.seekCoh = function(v1){
  var desired = JSVector.subGetNew(v1, this.loc);
  desired.normalize();
  desired.multiply(this.maxSpeed);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(this.maxForce/8);
  this.addForce(steer);
}

BirdClass.prototype.separation = function(){
  var sum = new JSVector(0, 0);
  var count = 0;
  for(let i = 0; i < this.flock.length; i++){
    var distance = this.loc.distance(this.flock[i].loc)
    if(distance > 0 && distance < this.sepDist){
      var diff = JSVector.subGetNew(this.loc, this.flock[i].loc);
      diff.normalize();
      diff.divide(distance);
      sum.add(diff);
      count++;
    }
  }

  if(count > 0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed);
    var steer = JSVector.subGetNew(sum, this.vel);
    steer.limit(this.maxForce/2);
    this.addForce(steer);
  }
}

BirdClass.prototype.alignment = function(){
  var sum = new JSVector(0, 0);
  var count = 0;
  for(let i = 0; i < this.flock.length; i++){
    var distance = this.loc.distance(this.flock[i].loc);
    if(distance > 0 && distance < this.alignDist){
      sum.add(flock[i].vel);
      count++;
    }
  }
  if(count > 0){
    sum.divide(count);
    sum.normalize();
    sum.multiply(this.maxSpeed / 2);
    var steer = JSVector.subGetNew(sum, this.vel);
    steer.limit(this.maxForce / 2);
    this.addForce(steer);
  }
}

BirdClass.prototype.cohesion = function(){
  var sum = new JSVector(0, 0);
  var count = 0;
  for(let i = 0; i < this.flock.length; i++){
    var distance = this.loc.distance(this.flock[i].loc);
    if(distance > 0 && distance < this.cohDist){
      sum.add(flock[i].loc);
      count++;
    }
  }
  if(count > 0){
    sum.divide(count);
    this.seekCoh(sum);
  }
}
