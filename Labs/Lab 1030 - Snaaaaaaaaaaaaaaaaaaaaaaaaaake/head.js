//HeadClass: class for head of snake

//constructor
function HeadClass(x, y, vx, vy, ax, ay, r, numTail){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = r;
  this.tail = [];
  this.tail[0] = new TailClass(this, 10, 20, r*2);
  for(let i = 1; i < numTail; i++){
    this.tail[i] = new TailClass(this.tail[i-1], this.tail[i-1].width, this.tail[i-1].height, this.tail[i-1].height);
  }
}

//animation functions
HeadClass.prototype.render = function(){
  //hunters are green
  ctx.strokStyle = 'rgb(11, 41, 212)';
  ctx.fillStyle = 'rgb(11, 41, 212)';

  ctx.beginPath()
  ctx.arc(this.loc.x, this.loc.y, this.radius, 2*Math.PI, 0, false);
  ctx.stroke();
  ctx.fill();
}

HeadClass.prototype.check = function(){
  if(this.loc.x < this.radius || this.loc.x + this.radius > window.innerWidth){
    this.vel.x = -this.vel.x;
  }
  if(this.loc.y < this.radius || this.loc.y + this.radius > window.innerHeight){
    this.vel.y = -this.vel.y;
  }
}

HeadClass.prototype.update = function(){
  this.vel.add(this.acc);
  this.vel.limit(15);
  this.loc.add(this.vel);
}

HeadClass.prototype.run = function(){
  this.update();
  this.render();
  this.check();
  for(let i = 0; i < this.tail.length; i++){
    this.tail[i].run();
  }
  this.acc.setMagnitude(0);
}
