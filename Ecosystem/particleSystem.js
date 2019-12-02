//a class that makes particle systems

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function ParticleSystem(x, y, size, vx, vy, color, life){
  this.loc = new JSVector(x,y);
  this.particles = [];
  //color must be hsl
  this.color = color;
  for(int i = 0; i < size; i++){
    this.particles[i] = new Particle(x, y, vx, vy, life, color);
  }
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
ParticleSystem.prototype.run = function(){
  for(let i = this.particles.length; i >= 0; i--){
    if(this.particles[i].life <= 0){
      this.particles.splice(i, 1);
    }else{
      this.particles[i].run();
    }
  }
}