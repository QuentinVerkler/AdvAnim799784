//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, orbitRadius, ballLoc, deltaR, max, hunter, range, body){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.loc = new JSVector(0, 0);
  this.orbitRadius = orbitRadius;
  this.ballLoc = ballLoc;
  this.max = max;
  this.planetRadius = orbitRadius;
  //this is the body the orbiter belongs to
  this.body = body
  this.range = range;
  this.ballHunting = null;
  this.isHunting = false;

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

//
Orbiter.prototype.return = function(thisPrey){
  if(this.orbitRadius > this.planetRadius + this.radius){
    this.orbitRadius -= thisPrey.vel.getMagnitude();
  }
}

//simple return: will return at 1 pixel per call
Orbiter.prototype.return1 = function(){
  this.orbitRadius -= 1;
}

//this goes out to the ball
Orbiter.prototype.hunt = function(thisPrey, distance){
  //this.angleV = 0;
  while(this.orbitRadius < distance){
    this.orbitRadius += 1;
  }
}

//actual update function: work in progress
Orbiter.prototype.update = function(){
  //actuall animation part
  this.loc.x = this.ballLoc.x + this.orbitRadius*Math.cos(this.angle);
  this.loc.y = this.ballLoc.y + this.orbitRadius*Math.sin(this.angle);
  this.angle += this.angleV;
  //++++hunting part++++
  //if the ball does not have a target, it will look for a target
  if(this.body.preyHunting === null){
    for(let i = prey.length - 1; i >= 0; i--){
      if(prey[i].isHunted === false && this.body.loc.distance(prey[b].loc) < this.range && this.body.isHunting === false){
        this.body.preyHunting = prey[i];
        this.body.isHunting = true;
        this.isHunting = true;
        this.ballHunting = prey[i];
        prey[i].isHunted = true;
      }
    }
  }
  //if the prey gets too far away, the ball will cease isHunting; may scrap
  // if(this.body.preyHunting != null && this.body.loc.distance(prey[b].loc) > this.range + 50){
  //   this.body.preyHunting.isHunted = false;
  //   this.body.preyHunting = null;
  //   this.body.isHunting = false;
  //   this.isHunting = false;
  //   this.ballHunting = null;
  // }
  //if it has a target, ball must be hunting; checks if this orbiter is the one hunting
  if(this.isHunting){

  }


}

//old update function: used as a road map
Orbiter.prototype.update = function(){
    //here the ball should only hunt if the previous statement gave it a target
    if(ball[this.place].preyHunting != null && this.isHunting && ball[this.place].loc.distance(ball[this.place].preyHunting.loc) < this.range){
      this.hunt(ball[this.place].preyHunting, this.loc.distance(ball[this.place].preyHunting.loc));
      //when the prey is in range, it will start eating it
      if(this.orbitRadius <= this.planetRadius + this.radius){
        ball[this.place].preyHunting.lifeSpan -= 1;
        //this makes it take time to be eaten
        if(ball[this.place].preyHunting.lifeSpan <= 0){
          ball[this.place].preyHunting.isDead = true;
          ball[this.place].wasSpliced = true;
        }else{
        //this makes the prey stay with the ball
          ball[this.place].preyHunting.vel = ball[this.place].vel;
          ball[this.place].preyHunting.acc = ball[this.place].acc;
        }
      //else, it will continue bringing the prey back.
      }else{
        this.return1();
        ball[this.place].preyHunting.loc = this.loc;
      }
    }else{
      //if the ball it's hunting isn't in range, the ball will continue returning
      ball[this.place].startRotation();
    }
  if(ball[this.place].wasSpliced === true){
    ball[this.place].preyHunting = null;
    ball[this.place].wasSpliced = false;
    ball[this.place].isHunting = false;
  }
}

//this is an old return function that I am NOT using
Orbiter.prototype.huntReturn = function(loc, mag){
  var speed;
  speed = JSVector.subGetNew(loc, this.loc);
  speed.normalize();
  speed.multiply(mag);
  this.loc.add(speed);
}
