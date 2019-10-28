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
  this.ballHunting = null;
  this.isHunting = false;
  this.eatTime = 30;

}

//instance functions
Orbiter.prototype.render = function(){
  //ctx.lineWidth = '.5';
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

//simple return: will return at 1 pixel per call
Orbiter.prototype.return1 = function(){
  this.orbitRadius -= 1;
}

Orbiter.prototype.hunt = function(thisPrey, distance){
  //this.angleV = 0;
  while(this.orbitRadius < distance){
    this.orbitRadius += 1;
  }
}

Orbiter.prototype.update = function(){
    //this.check();// checks
    this.loc.x = this.ballLoc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = this.ballLoc.y + this.orbitRadius*Math.sin(this.angle);
    this.angle += this.angleV;
    for(let b = prey.length - 1; b >= 0; b--){
      //if the ball isn't hunting, it will look for a ball
      if(ball[this.place].preyHunting === null){
        if(((prey[b].isHunted === false)) && ball[this.place].loc.distance(prey[b].loc) < this.range && ball[this.place].isHunting === false){

          ball[this.place].preyHunting = prey[b];
          ball[this.place].isHunting = true;
          this.isHunting = true;
          ball[this.place].stopRotation();
          this.ballHunting = prey[b];
          prey[b].isHunted = true;
          prey[b].lifeSpan -= 1;
        }

      }

    }
    if(ball[this.place].preyHunting != null && ball[this.place].loc.distance(ball[this.place].preyHunting.loc) < this.range && this.isHunting){
      this.hunt(ball[this.place].preyHunting, this.loc.distance(ball[this.place].preyHunting.loc));
      //while the prey is still too far away, it will continue to return
      if(this.orbitRadius <= this.planetRadius + this.radius){
        ball[this.place].preyHunting.lifeSpan -= 1;
        //this makes it take time to be eaten
        if(ball[this.place].preyHunting.lifeSpan <= 0){
          ball[this.place].preyHunting.isDead = true;
        }else{
          ball[this.place].preyHunting.vel = ball[this.place].vel;
          ball[this.place].preyHunting.acc = ball[this.place].acc;
        }
        //once the prey is in range, it will stop returning
      }else{
        this.return1();
        ball[this.place].preyHunting.loc = this.loc;
        ball[this.place].preyHunting.lifeSpan -= 1;
        //this makes it take time to be eaten
        if(ball[this.place].preyHunting.lifeSpan <= 0){
          ball[this.place].preyHunting.isDead = true;
          ball[this.place].wasSpliced = true;
        }
      }
    } else{
      //this.return(ball[this.place].preyHunting);
      ball[this.place].startRotation();
    }
  if(ball[this.place].wasSpliced === true){
    ball[this.place].preyHunting = null;
    ball[this.place].wasSpliced = false;
  }
}


Orbiter.prototype.huntReturn = function(loc, mag){
  var speed;
  speed = JSVector.subGetNew(loc, this.loc);
  speed.normalize();
  speed.multiply(mag);
  this.loc.add(speed);
}
