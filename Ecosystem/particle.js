//ParticleClass: makes individual particles

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function ParticleClass(x, y, vx, vy, life, color, r, poison){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.radius = r;
  this.life = life;
  this.color = color;
  this.isPoison = poison
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
  if(this.isPoison){
    this.checkPoison();
  }
  this.update();
  this.render();
}

//+++++++++++++++++++++++++++++ ParticleClass specific functions ++++++++++++++++++
ParticleClass.prototype.checkPoison = function(){
  for(let i = 0; i < bed.length; i++){
    if(this.loc.distance(bed[i].loc) <= bed[i].radius){
      this.life = 0;
      bed[i].removeEnd();
    }
  }
}
