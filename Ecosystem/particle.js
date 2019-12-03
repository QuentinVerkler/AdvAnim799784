//ParticleClass: makes individual particles

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function ParticleClass(x, y, vx, vy, life, color){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = Math.random()*4 + 4;
  this.life = life;
  this.color = color;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
ParticleClass.prototype.render = function(){
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.fill();
}

ParticleClass.prototype.update = function(){
  this.loc.add(this.vel);
  this.life -= 2;
}

ParticleClass.prototype.run = function(){
  this.update();
  this.render();
}
