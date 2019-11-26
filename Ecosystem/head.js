//HeadClass: class for head of snake

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function HeadClass(x, y, vx, vy, ax, ay, r, numTail){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = r;
  this.tail = [];
    //problem: distance from head to first tail is too short with just radius; *2 is temporary solution
  var opacity = 1;
  var width = 3*(r/4)
  this.tail[0] = new TailClass(this, this, 3*r/5, r/2, opacity, width);
  for(let i = 1; i < numTail; i++){
    //opacity -= (1/numTail);
    //width -= (3*(r/4)/numTail)
    this.tail[i] = new TailClass(this, this.tail[i-1], this.tail[i-1].length, this.tail[i-1].length, opacity, width);
  }
  this.maxSpeed = 5;
  this.maxForce = .3;
  this.range = 300;
  this.preyHunting = null;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
HeadClass.prototype.render = function(){

  ctx.strokStyle = 'rgba(11, 41, 212, 0)';
  ctx.lineWidth = '0';
  ctx.fillStyle = 'rgb(35, 99, 43)';

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.fill();
}

HeadClass.prototype.check = function(){
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

HeadClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(this.speed);
  this.loc.add(this.vel);
  this.acc.setMagnitude(0);
}

HeadClass.prototype.run = function(balls){
  this.check();
  this.update();
  this.render();
  for(let i = 0; i < this.tail.length; i++){
    this.tail[i].run();
  }
  this.hunt(balls);
}

//++++++++++++++++++++++++++++++++ head specific functions ++++++++++++++++++++++++
HeadClass.prototype.hunt = function(balls){
  for(int i = 0; i < ballHunters.length; i++){
    if(this.loc.distance(balls[i].loc) < this.range){
      this.preyHunting = balls[i];
    }
  }
  if(this.preyHunting != null){
    this.attractTo();
    if(this.loc.distance(this.preyHunting.loc) < this.radius + this.preyHunting.radius){
      collisionLocX = this.loc.x;
      collisionLocY = this.loc.y;

      var collisionEvent = new Event("collide");
      window.dispatchEvent(collisionEvent);

      this.preyHunting.isDead = true;
      this.preyHunting = null;
    }
  }
}


//makes head attracted to ball (temp function may scrap)
HeadClass.prototype.attractTo = function (){
  var speed;
  speed = JSVector.subGetNew(this.preyHunting.loc, this.loc);
  speed.normalize();
  speed.multiply(15);
  this.loc.add(speed);
}

HeadClass.prototype.addForce = function(force){
  this.acc.add(force);
}
