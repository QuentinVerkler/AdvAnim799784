//a class that makes particle systems

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function ParticleSystem(x, y, size, color, r, poison){
  this.particles = [];
  //color must be hsl
  this.color = color;
  for(let i = 0; i < size; i++){
    this.particles[i] = new ParticleClass(x, y, Math.random()*4-2, Math.random()*4-2, Math.random()*150+200, color, r, poison);
  }
  this.isDone = false;
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
ParticleSystem.prototype.run = function(){
  if(this.particles.length <= 0){
    this.isDone = true;
  }else{
    for(let i = this.particles.length - 1; i >= 0; i--){
      if(this.particles[i].life <= 0){
        this.particles.splice(i, 1);
      }else{
        this.particles[i].run();
      }
    }
  }
}
