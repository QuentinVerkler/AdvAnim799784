window.onload = init;
var cnv;
var ctx;
var balls = [];
var miniCnv;
var miniCtx;
// var keyboard = new KeyboardEvent();

//keyboard events
window.addEventListener("keydown", move);

function init(){
	//get canvas
	cnv = document.getElementById('cnv');
  //get context
  ctx = cnv.getContext('2d');

	//set dimensions
	cnv.width = 800;
	cnv.height = 800;
	cnv.style.border = 'solid black 2x';
	cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  ctx.translate(400, 400);

  //mini map
  miniCnv = document.getElementById('miniCnv');
  miniCtx = miniCnv.getContext('2d');
  miniCnv.width = 200;
  miniCnv.height = 200;
  miniCnv.style.border = "solid black 1"
  miniCnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  miniCtx.translate(100, 100);


	balls[0] = new BallClass(-100, -100, 0, 0, 0, 0, 28);
  balls[1] = new BallClass(100, -100, 0, 0, 0, 0, 28);
  balls[2] = new BallClass(-100, 100, 0, 0, 0, 0, 28);
  balls[3] = new BallClass(100, 100, 0, 0, 0, 0, 28);

	animate();
}

var distXMoved = 0;
var distYMoved = 0;

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(-4000, -4000, 8000, 8000);
  miniCtx.clearRect(-500, -500, 1000, 1000);

  miniCtx.save();

  miniCtx.translate(distXMoved,distYMoved);
  miniCtx.strokStyle = 'rgba(0, 0, 0, 1)'
  miniCtx.lineWidth = '2';
  miniCtx.beginPath();
  miniCtx.rect(-50, -50, 100, 100);
  miniCtx.stroke();

  miniCtx.restore();

	for(let a = 0; a < balls.length; a++){
		balls[a].run();

	}
}

//eventListener functions
function move(event){
  if(event.key === "ArrowUp"){
    ctx.translate(0, 50);
    miniCtx.translate(0, 50/8);
    distYMoved -= 50/8;
  }
  if(event.key === "ArrowDown"){
    ctx.translate(0, -50);
    miniCtx.translate(0, -50/8);
    distYMoved += 50/8;
  }
  if(event.key === "ArrowLeft"){
    ctx.translate(50, 0);
    miniCtx.translate(50/8, 0);
    distXMoved -= 50/8;
  }
  if(event.key === "ArrowRight"){
    ctx.translate(-50, 0);
    miniCtx.translate(-50/8, 0);
    distXMoved += 50/8;
  }
}
