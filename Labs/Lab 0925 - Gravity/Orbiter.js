//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, orbitRadius, ballLoc, deltaR, max, min, place, hunter, range, numballs){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.oGAngleV = angleV;
  this.loc = new JSVector(0, 0);
  this.orbitRadius = min;
  this.ballLoc = ballLoc;
  this.deltaR = deltaR;
  this.max = max;
  this.planetRadius = min;
  this.place = place;
  this.hunter = hunter;
  this.range = range;
  this.numPrey = numballs;
  this.ballHunting = -1;
  this.isHunting = false;
  this.eatTime = 30;
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

Orbiter.prototype.return = function(thisPrey){
  // this.angleV = this.oGAngleV;
  if(this.orbitRadius > this.planetRadius + this.radius){
    this.orbitRadius -= thisPrey.vel.getMagnitude();
  }
}

Orbiter.prototype.return1 = function(){
  this.orbitRadius -= 1;
}

Orbiter.prototype.hunt = function(thisBall, distance){
  //this.angleV = 0;
  while(this.orbitRadius < distance){
    this.orbitRadius += 1;
  }
}

Orbiter.prototype.update = function(){
    this.check();
    this.loc.x = this.ballLoc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = this.ballLoc.y + this.orbitRadius*Math.sin(this.angle);
    this.angle += this.angleV;
    for(let b = this.numPrey - 1; b >= 0; b--){
      var hunted = prey[b];
      //section to look for prey. If one is in range, will hunt
      if((prey[b].isHunted === false || b === this.ballHunting) && ball[this.place].isHunting === false && this.loc.distance(prey[b].loc) < this.range && this.place != b){
        ball[this.place].isHunting = true;
        ball[this.place].stopRotation();
        this.ballHunting = b;
        prey[b].isHunted = true;
        this.hunt(prey[b], this.loc.distance(prey[b].loc));
        //while the prey is still too far away, it will continue to return
        if(this.orbitRadius === this.planetRadius + this.radius){
          //this makes it take time to be eaten
          this.eatTime -= 1;
          if(this.eatTime <= 0){
            prey[b].isDead = true;
          }else{
            prey[b].vel = ball[this.place].vel;
            prey[b].acc = ball[this.place].acc;
          }
        //once the prey is in range, it will stop returning
        }else{
          prey[b].loc = this.loc;
          this.return1();
        }
        break;
      }else{
        this.eatTime = 30;
        this.return(prey[b]);
        ball[this.place].startRotation();
      }
    }
  }

Orbiter.prototype.check = function(){
  if(this.orbitRadius > this.max || this.min > this.orbitRadius){
    this.deltaR = this.deltaR * -1;
  }
}

Orbiter.prototype.huntReturn = function(loc, mag){
  var speed;
  speed = JSVector.subGetNew(loc, this.loc);
  speed.normalize();
  speed.multiply(mag);
  this.loc.add(speed);
}
