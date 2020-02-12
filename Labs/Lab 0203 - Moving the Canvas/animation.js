window.onload = init;
var cnv;
var ctx;
var balls = [];
var miniCnv;
var miniCtx;

//keyboard event
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
  miniCnv.style.border = "solid black 2x"
  miniCnv.style.backgroundColor = 'rgba(0,44,55, .5)';
  miniCtx.translate(100, 100);


	balls[0] = new BallClass(-100, -100, Math.random() * 10 - 5, Math.random() * 10 - 5, 0, 0, 28);
  balls[1] = new BallClass(100, -100, Math.random() * 10 - 5, Math.random() * 10 - 5, 0, 0, 28);
  balls[2] = new BallClass(-100, 100, Math.random() * 10 - 5, Math.random() * 10 - 5, 0, 0, 28);
  balls[3] = new BallClass(100, 100, Math.random() * 10 - 5, Math.random() * 10 - 5, 0, 0, 28);
	balls[4] = new BallClass(500, 300, Math.random() * 10 - 5, Math.random() * 10 - 5, 0, 0, 29);

	animate();
}

var distXMoved = 0;
var distYMoved = 0;

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(-4000, -4000, 8000, 8000);
  miniCtx.clearRect(-100, -100, 200, 200);

  // miniCtx.save();
	//
  // miniCtx.translate(distXMoved,distYMoved);
  miniCtx.strokStyle = 'rgba(0, 0, 0, 1)'
  miniCtx.lineWidth = '.5';
  miniCtx.beginPath();
  miniCtx.rect(-5 + distXMoved, -5 + distYMoved, 10, 10);
  miniCtx.stroke();

  // miniCtx.restore();

	for(let a = 0; a < balls.length; a++){
		balls[a].run();

	}
}

//eventListener functions
function move(event){
  if(event.key === "ArrowUp"){
    ctx.translate(0, 50);
    // miniCtx.translate(0, 50/40);
    distYMoved -= 50/40;
  }
  if(event.key === "ArrowDown"){
    ctx.translate(0, -50);
    // miniCtx.translate(0, -50/40);
    distYMoved += 50/40;
  }
  if(event.key === "ArrowLeft"){
    ctx.translate(50, 0);
    // miniCtx.translate(50/40, 0);
    distXMoved -= 50/40;
  }
  if(event.key === "ArrowRight"){
    ctx.translate(-50, 0);
    // miniCtx.translate(-50/40, 0);
    distXMoved += 50/40;
  }
}