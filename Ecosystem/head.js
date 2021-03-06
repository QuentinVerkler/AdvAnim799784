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
  var width = 3*(r/4);
  this.tail[0] = new TailClass(this, this, 3*r/5, r/2, opacity, width);
  for(let i = 1; i < numTail; i++){

    this.tail[i] = new TailClass(this, this.tail[i-1], this.tail[i-1].length, this.tail[i-1].length, opacity, width);
  }
  this.maxSpeed = 5;
  this.maxForce = .3;
  this.range = 300;
  this.preyHunting = null;
  this.isPreyBall = false;
  this.eatRest = 0;
  this.running = false;
  this.isDead = false;
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
  this.eatRest -= 1;
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
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
  this.checkSuicide();
  if(!this.running){
    this.hunt();
  }
  if(this.tail.length <= 0){
    this.isDead = true;
  }
}

//++++++++++++++++++++++++++++++++ head specific functions ++++++++++++++++++++++++
HeadClass.prototype.hunt = function(){
  if(this.preyHunting === null && this.eatRest <= 0){
    for(let i = 0; i < ballHunters.length; i++){
      if(this.loc.distance(ballHunters[i].loc) < this.range){
        this.preyHunting = ballHunters[i];
        break;
      }
    }
  }
  if(this.preyHunting != null){
      if(this.loc.distance(this.preyHunting.loc) > this.range + this.radius + 20){
        this.preyHunting = null;
      }else{
        this.attractTo();
        this.preyHunting.repulse(this.loc, .04);
        if(this.loc.distance(this.preyHunting.loc) < this.radius + this.preyHunting.radius){
          collisionLocX = this.loc.x;
          collisionLocY = this.loc.y;

          var collisionEvent = new Event("poop");
          window.dispatchEvent(collisionEvent);

          //resets snake's hunting vars
          this.preyHunting.isDead = true;
          this.preyHunting = null;
          this.eatRest = 600;

          //makes death sound
          var ballDeath = document.getElementById("ballDeath");
          ballDeath.play();

          //adds to tail
          var front = this.tail.length-1;
          this.tail.push(new TailClass(this, this.tail[front], this.tail[front].length, this.tail[front].length, 1, 3*(this.radius/4)));
        }
      }
    }
  }


//makes head attracted to ball (temp function may scrap)
HeadClass.prototype.attractTo = function (){
  var speed;
  speed = JSVector.subGetNew(this.preyHunting.loc, this.loc);
  speed.normalize();
  speed.multiply(6);
  this.loc.add(speed);
}

//repulses this snake
HeadClass.prototype.repulse = function(loc, mag){
  var force;
  force = JSVector.subGetNew(this.loc, loc);
  force.normalize();
  force.multiply(mag);
  this.acc.add(force);
}

HeadClass.prototype.addForce = function(force){
  this.acc.add(force);
}

//removes last segment of tail
HeadClass.prototype.removeEnd = function(){
  this.tail.splice(this.tail.length - 1, 1);
}

//checks if a suicide creature is near and runs away if it is
HeadClass.prototype.checkSuicide = function(){
  for(let i = suicideSquad.length-1; i >= 0; i--){
    var distance = this.loc.distance(suicideSquad[i].loc);
    if(distance <= 200){
      this.repulse(suicideSquad[i].loc, .09);
    }
    if(distance <= this.radius + 5){
      this.isDead = true;
      suicideSquad[i].isDead = true;
    }
  }
}
