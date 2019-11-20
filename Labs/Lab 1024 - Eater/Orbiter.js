//Orbiter: a class that makes orbiter objects

//class constructor
function Orbiter(radius, angle, angleV, orbitRadius, range, body){
  this.radius = radius;
  this.angle = angle;
  this.angleV = angleV;
  this.orbitRadius = orbitRadius;
  //this is the body the orbiter belongs to
  this.body = body
  this.range = range;
  this.ballHunting = null;
  this.isHunting = false;
  this.loc = new JSVector(this.body.loc.x + this.orbitRadius*Math.cos(this.angle), this.body.loc.y + this.orbitRadius*Math.sin(this.angle));
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
Orbiter.prototype.render = function(){
  //ctx.lineWidth = '.5';
  ctx.strokStyle = 'rgb(171, 10, 10)';
  ctx.fillStyle = 'rgb(171, 10, 10)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.fill();
  ctx.stroke();
  ctx.linewidth = '.5';
  ctx.moveTo(this.body.loc.x, this.body.loc.y);
  ctx.lineTo(this.loc.x, this.loc.y);
  ctx.stroke();
  ctx.closePath();
}


//actual update function: work in progress
Orbiter.prototype.update = function(){
  //++++hunting part++++
  //if the ball does not have a target, it will look for a target
  if(this.body.preyHunting === null){
    for(let i = prey.length - 1; i >= 0; i--){
      if(prey[i].isHunted === false && this.body.loc.distance(prey[i].loc) < this.range && this.body.isHunting === false){
        this.body.preyHunting = prey[i];
        this.body.isHunting = true;
        this.isHunting = true;
        this.ballHunting = prey[i];
        prey[i].isHunted = true;
        prey[i].hunter = this.body;
        break;
      }
    }
  }


  //part that sends oribter out to get prey
  if(this.isHunting){
    //if the prey is too far away, will drop target
    if(this.body.loc.distance(this.ballHunting.loc) > this.range + this.radius + 20){
      this.body.preyHunting = null;
      this.body.isHunting = false;
      this.isHunting = false;
      this.ballHunting.isHunted = false;
      this.ballHunting = null;
    }else{
      if(this.loc.distance(this.ballHunting.loc) > this.radius){
        this.hunt();
      }else{
        if(this.loc.distance(this.body.loc) > this.radius){
          this.ballHunting.lifeSpan -= 1;
          this.return();
          this.ballHunting.loc = this.loc.copy();
        }else{
          this.loc = this.body.loc.copy();
          this.ballHunting.loc = this.loc.copy();
          this.ballHunting.lifeSpan -= 2;
        }
      }
      if(this.ballHunting.lifeSpan <= 0){
        this.body.preyHunting = null;
        this.body.isHunting = false;
        this.isHunting = false;
        this.ballHunting = null;
      }
      this.angle += this.angleV
  }

  }else{
    //+++++++++actuall animation part+++++++
    this.loc.x = this.body.loc.x + this.orbitRadius*Math.cos(this.angle);
    this.loc.y = this.body.loc.y + this.orbitRadius*Math.sin(this.angle);
    this.angle += this.angleV;
  }

}

//++++++++++++++++++++++++++++++++ Orbiter functions ++++++++++++++++++++++++++++++

//makes orbiter return to ball
Orbiter.prototype.return = function(thisPrey){
  var speed;
  speed = JSVector.subGetNew(this.body.loc, this.loc);
  speed.normalize();
  speed.multiply(5);
  this.loc.add(speed);
}


//this goes out to the ball
Orbiter.prototype.hunt = function(){
  var speed;
  speed = JSVector.subGetNew(this.ballHunting.loc, this.loc);
  speed.normalize();
  speed.multiply(5);
  this.loc.add(speed);
}
