//ShipClass: Makes quad

//Class constructor
function ShipClass(x, y, vx, vy, ax, ay, life){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.life = life;
}

//animation functions
ShipClass.prototype.render = function(){
  ctx.strokeStyle = 'rgb(136, 3, 252)';
  ctx.fillStyle = 'rgb(3, 232, 252)';

  ctx.save();

  ctx.beginPath();
  ctx.moveTo(this.loc.x - 9, this.loc.y - 12);
  ctx.lineTo(this.loc.x, this.loc.y + 15);
  ctx.moveTo(this.loc.x, this.loc.y + 15);
  ctx.lineTo(this.loc.x + 9, this.loc.y - 12);
  ctx.moveTo(this.loc.x, this.loc.y - 6);
  ctx.lineTo(this.loc.x - 9, this.loc.y - 12);
  ctx.moveTo(this.loc.x, this.loc.y - 6);
  ctx.lineTo(this.loc.x + 9, this.loc.y - 12);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

ShipClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
  this.life -= 5;
}

ShipClass.prototype.check = function(){
  if(this.loc.x < 0 || this.loc.x > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < 0 || this.loc.y > window.innerHeight){
    this.vel.y = -this.vel.y;
  }
}

ShipClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
}

//particle functions
ShipClass.prototype.isDead = function(){
  return this.life <= 0;
}
