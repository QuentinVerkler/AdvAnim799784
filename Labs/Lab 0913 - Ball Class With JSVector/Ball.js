//BallClass: A class to make balls

//class constructor
function BallClass(x, y, vx, vy, ax, ay, radius){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;

}

BallClass.prototype.render = function(){
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.lineWidth = '10';
  ctx.fillStyle = 'rgb(255,105,180)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

BallClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.loc.add(this.vel);
}

BallClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
}

BallClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > window.innerWidth){
    this.vel.x = -this.vel.x;
    //this.acc.x = -this.acc.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > window.innerHeight){
    this.vel.y = -this.vel.y;
    //this.acc.y = -this.acc.y;
  }

}
