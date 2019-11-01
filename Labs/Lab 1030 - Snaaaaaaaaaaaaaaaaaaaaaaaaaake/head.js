//HeadClass: class for head of snake

//constructor
function HeadClass(x, y, vx, vy, ax, ay, r, numTail){
  this.loc = new JSVector(x, y);
  this.vel = new JSVector(vx, vy);
  this.acc = new JSVector(ax, ay);
  this.radius = r;
  this.tail = [];
  //problem: distance from head to first tail is too short with just radius; *2 is temporary solution
  this.tail[0] = new TailClass(this, 10, r*2);
  var distance = this.tail[0].height;
  for(let i = 1; i < numTail; i++){
    this.tail[i] = new TailClass(this, this.tail[i-1], this.tail[i-1].length, distance);
    distance += this.tail[i-1].height;
  }
}

//animation functions
HeadClass.prototype.render = function(){
  ctx.strokStyle = 'rgba(11, 41, 212, 0)';
  ctx.fillStyle = 'rgb(184, 15, 15)';

  ctx.beginPath();
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
