window.onload = init;
var cnv;
var ctx;

var x = [];
var y = [];
var dx = [];
var dy = [];
var radius = 20;

function init(){
  //get canvas
  cnv = document.getElementById('cnv');
  //set size of canvas
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  cnv.style.border = 'solid black 2x';
  cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  //get context
  ctx = cnv.getContext('2d');
  for(let a = 0; a < 10; a++){
    x[a] = Math.random()*window.innerWidth;
    y[a] = Math.random()*window.innerHeight;
    dx[a] = Math.random()*10-5;
    dy[a] = Math.random()*10-5;
  }
  animate();
}

/*
var x, y, dx, dy, radius;
x = Math.random()*window.innerWidth;
y = Math.random()*window.innerHeight;
dx = Math.random()*10-5;
dy = Math.random()*10-5;
radius = 30;
*/

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

  ctx.strokeStyle = 'rgb(255,105,180)';
  ctx.fillStyle = 'rgb(255,105,180)';
  for(let a = 0; a < 10; a++){
    ctx.beginPath();


    ctx.arc(x[a],y[a],radius, Math.PI*2, 0, false);
    ctx.fill();
    ctx.stroke();

    x[a] += dx[a];
    y[a] +=dy[a];
      if(x[a]> window.innerWidth || x[a] < 0) dx[a] = -dx[a];
      if(y[a]> window.innerHeight || y[a] < 0) dy[a] = -dy[a];
  }
}
