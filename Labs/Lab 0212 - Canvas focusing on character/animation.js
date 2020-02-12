window.onload = init;
var cnv;
var ctx;
var ball;
var miniCnv;
var miniCtx;
var scale = 20;

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


	ball = new BallClass(0, 0, 28);

	animate();
}

var distXMoved = 0;
var distYMoved = 0;

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(-2000, -2000, 4000, 4000);
  miniCtx.clearRect(-2000/scale, -2000/scale, 4000/scale, 4000/scale);

  // miniCtx.save();
	//
  // miniCtx.translate(distXMoved,distYMoved);
  miniCtx.strokStyle = 'rgba(0, 0, 0, 1)'
  miniCtx.lineWidth = '.5';
  miniCtx.beginPath();
  miniCtx.rect(-10 + distXMoved, -10 + distYMoved, 20, 20);
  miniCtx.stroke();

  // miniCtx.restore();

		ball.run();

}

//eventListener functions
function move(event){
  if(event.key === "ArrowUp"){
    ball.loc.y += 10;
    distYMoved -= 10/scale;
  }
  if(event.key === "ArrowDown"){
    ball.loc.y -= 10;
    distYMoved += 10/scale;
  }
  if(event.key === "ArrowLeft"){
    ball.loc.x += 10;
    distXMoved -= 10/scale;
  }
  if(event.key === "ArrowRight"){
    ball.loc.y -= 10;
    distXMoved += 10/scale;
  }
}
