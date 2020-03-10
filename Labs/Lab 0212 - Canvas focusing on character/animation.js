window.onload = init;
var cnv;
var ctx;
var ball;
var balls = [];
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


	ball = new BallClass(0, 0, 0, 0, 0, 0, 28);

	balls[0] = new BallClass(-100, -100, 0, 0, 0, 0, 28);
  balls[1] = new BallClass(100, -100, 0, 0, 0, 0, 28);
  balls[2] = new BallClass(-100, 100, 0, 0, 0, 0, 28);
  balls[3] = new BallClass(100, 100, 0, 0, 0, 0, 28);
	balls[4] = new BallClass(500, 300, 0, 0, 0, 0, 29);

	animate();
}

var distXMoved = 0;
var distYMoved = 0;

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(-2000, -2000, 4000, 4000);
  miniCtx.clearRect(-2000/scale, -2000/scale, 4000/scale, 4000/scale);

	// slide();

	//ctx.translate(distXMoved, distYMoved);

	// ctx.translate(ball.loc.x, ball.loc.y);

	trans();

  // miniCtx.strokStyle = 'rgba(0, 0, 0, 1)'
  // miniCtx.lineWidth = '.5';
  // miniCtx.beginPath();
  // miniCtx.rect(-20 + distXMoved/scale, -20 + distYMoved/scale, 40, 40);
  // miniCtx.stroke();

	ball.run();

	for(let a = 0; a < balls.length; a++){
		balls[a].run();

	}

}

// translate the screen over the player
function trans(){
	let distVector = JSVector.subGetNew(ball.loc, ball.home);
	ctx.translate(-distVector.x, -distVector.y);

	miniCtx.strokStyle = 'rgba(0, 0, 0, 1)'
	miniCtx.lineWidth = '.5';
	miniCtx.beginPath();
	miniCtx.rect(-20 + distVector.x/scale, -20 + distVector.y/scale, 40, 40);
	miniCtx.stroke();

}

//slide variables
var valueX = 0;
var valueY = 0;

//glide move function, is old
function slide(){
	valueX = valueX/1.05;
	valueY = valueY/1.05;
	ctx.translate(valueX, valueY);
	ball.loc.x -= valueX;
	ball.loc.y -= valueY;
	distXMoved -= valueX;
	distYMoved -= valueY;
}


//eventListener functions
function move(event){
	let dist = 5;
  if(event.key === "ArrowUp"){
		// valueY += dist;
		ball.vel.add(new JSVector(0, -.25));
  }
  if(event.key === "ArrowDown"){
		// valueY -= dist;
		ball.vel.add(new JSVector(0, .25));
  }
  if(event.key === "ArrowLeft"){
		// valueX += dist;
		ball.vel.add(new JSVector(-.25, 0));
  }
  if(event.key === "ArrowRight"){
		// valueX -= dist;
		ball.vel.add(new JSVector(.25, 0));
  }
}
