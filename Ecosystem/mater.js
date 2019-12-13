//MaterClass: a class that makes maters

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function Mater(x, y, vx, vy, ax, ay, flock, size){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.flock = flock;
  this.maxSpeed = 5;
  this.maxForce = .2;
  //flock variables
  this.alignDist = .0001;
  this.cohDist = .0001;
  this.sepDist = .0001;
  //mater specific variables
  this.lifeSpan = 500;
  this.isHunted = false;
  this.hunter = null;
  this.mater = null;
  this.size = size;
  this.mateRest = Math.random()*240 + 60;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
Mater.prototype.render = function(){
  //makes it bigger if not full adult
  if(this.size < 1){
    this.size += .00125;
  }
  ctx.lineWidth = '.0001'
  ctx.strokeStyle = 'hsl(235, 100%, 50%)';
  if(!this.isHunted){
    ctx.fillStyle = 'hsl(235, 100%, 50%)';
  }else{
    ctx.fillStyle = 'hsl(88, 50%, 41%)';
  }

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);
  ctx.rotate(this.vel.getDirection() - Math.PI/2);

  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.lineTo(3, 0);
  ctx.lineTo(0, -5);
  ctx.lineTo(-3, 0);
  ctx.lineTo(0, 5);
  ctx.closePath();

  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

Mater.prototype.update = function(){
  if(this.isHunted && this.lifeSpan >= 500){
    this.repulse(this.hunter.loc, .03);
  }
  if(this.mater === null){
    this.steerForces();
  }
  if(this.hunter != null && this.hunter.isDead){
    this.hunter = false;
    this.isHunted = false;
  }
  this.mateRest -= 1;
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

Mater.prototype.check = function(){
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

Mater.prototype.run = function(){
  this.check();
  this.update();
  this.render();
  this.mate();

}


//++++++++++++++++++++++++++++++++ Mater functions ++++++++++++++++++++++++++++++++
Mater.prototype.steerForces = function(){
  this.separation();
  this.alignment();
  this.cohesion();
}

//adds force to acc
Mater.prototype.addForce = function(force){
  this.acc.add(force);
}

//mating function: will attract this mater and target mater, then make babies
Mater.prototype.mate = function(){
  if(this.mater === null && !this.isHunted && this.mateRest <= 0 && this.flock.length <= 100){
    for(let i = 0; i < this.flock.length; i++){
      if(this.loc.distance(this.flock[i].loc) <= 150 && this.loc.distance(this.flock[i].loc) > 0 && !this.flock[i].isHunted && this.flock[i].mateRest <= 0){
        this.mater = this.flock[i];
        this.mater.mater = this;
      }
    }
  }else if(this.mater != null && (this.lifeSpan <= 0 || this.isHunted || this.mater.isHunt)){
    this.mater.mater = null;
    this.mater = null;
  }else if(this.mater != null){
    if(this.loc.distance(this.mater.loc) >= 8){
      this.attractTo();
      this.mater.attractTo();

      //draws line between the maters
      ctx.beginPath();
      ctx.linewidth = '1';
      ctx.moveTo(this.loc.x, this.loc.y);
      ctx.lineTo(this.mater.loc.x, this.mater.loc.y);
      ctx.stroke();
      ctx.closePath();
    }else{
      //makes particleSystem when they mate
      collisionLocX = this.loc.x;
      collisionLocY = this.loc.y;

      var collisionEvent = new Event("madeBabies");
      window.dispatchEvent(collisionEvent);

      //resets everything and gives cooldown period for mating
      this.mateRest = 400;
      this.mater.mateRest = 400;
      this.flock.push(new Mater(this.loc.x, this.loc.y, Math.random()*6-3, Math.random()*6-3, 0, 0, this.flock, .5));
      this.mater.mater = null;
      this.mater = null;
    }
  }
}

//attractTo; draws this mater to target mater
Mater.prototype.attractTo = function(){
  if(this.mater != null){
    var speed;
    speed = JSVector.subGetNew(this.mater.loc, this.loc);
    speed.normalize();
    speed.multiply(1);
    speed.limit(this.maxForce);
    this.loc.add(speed);
  }
}

//separation function
Mater.prototype.separation = function(){
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

//alignment function
Mater.prototype.alignment = function(){
  var sum = new JSVector(0, 0);
  var count = 0;
  for(let i = 0; i < this.flock.length; i++){
    var distance = this.loc.distance(this.flock[i].loc);
    if(distance > 0 && distance < this.alignDist){
      sum.add(this.flock[i].vel);
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

//special seek function for cohesion
Mater.prototype.seekCoh = function(v1){
  var desired = JSVector.subGetNew(v1, this.loc);
  desired.normalize();
  desired.multiply(this.maxSpeed);
  var steer = JSVector.subGetNew(desired, this.vel);
  steer.limit(this.maxForce/8);
  this.addForce(steer);
}

//cohesion function
Mater.prototype.cohesion = function(){
  var sum = new JSVector(0, 0);
  var count = 0;
  for(let i = 0; i < this.flock.length; i++){
    var distance = this.loc.distance(this.flock[i].loc);
    if(distance > 0 && distance < this.cohDist){
      sum.add(this.flock[i].loc);
      count++;
    }
  }
  if(count > 0){
    sum.divide(count);
    this.seekCoh(sum);
  }
}

//this function will repulse bird if ballprey too close
Mater.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}
