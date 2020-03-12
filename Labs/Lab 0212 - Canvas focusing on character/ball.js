//BallClass: A class to make balls

//class constructor
function BallClass(x, y, vx, vy, ax, ay, radius){
  this.loc = new JSVector(x, y);
  this.home = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = radius;

}

BallClass.prototype.render = function(){
  ctx.strokStyle = 'rgb(255,105,180)';
  ctx.lineWidth = '1';
  ctx.fillStyle = 'rgb(255,105,180)';

  ctx.save();

  ctx.translate(this.loc.x, this.loc.y);

  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();

  ctx.restore();

  //minimap view
  miniCtx.strokStyle = 'rgb(255,105,180)';
  miniCtx.lineWidth = '1';
  miniCtx.fillStyle = 'rgb(255,105,180)';

  miniCtx.save();

  miniCtx.translate(this.loc.x/scale, this.loc.y/scale);

  miniCtx.beginPath();
  miniCtx.arc(0 , 0, this.radius/scale, Math.PI * 2, 0, false);
  miniCtx.stroke();
  miniCtx.fill();

  miniCtx.restore();
}

BallClass.prototype.update = function(){
  this.acc.limit(.2);
  this.vel.add(this.acc);
  this.vel.limit(6);
  if(this.vel.getMagnitude() != 0){
    this.stop();
  }
  this.loc.add(this.vel);
  // this.vel.setMagnitude(0);
  // this.vel.setDirection(0);
}

BallClass.prototype.stop = function(){
    let stop = new JSVector(0,0);
    stop.setMagnitude(.1);
    stop.setDirection(this.vel.getDirection() + Math.PI);
    this.acc.add(stop);
}

BallClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
}

BallClass.prototype.check = function(){
  if(this.loc.x < -2000 + this.radius || this.loc.x + this.radius > 2000){
    this.vel.x = -this.vel.x;
    this.acc.x = 0;
  }
  if(this.loc.y < -2000 + this.radius || this.loc.y + this.radius > 2000){
    this.vel.y = -this.vel.y;
    this.acc.y = 0;
  }

}
