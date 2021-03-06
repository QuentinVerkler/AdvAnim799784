window.onload = init;
var cnv;
var ctx;
var ball;
var balls = [];
var miniCnv;
var miniCtx;
var scale = 20;


//keyboard event
// window.addEventListener("keydown", move);
var keydown = false;

window.addEventListener("keydown", move);

function move(event){
	if(!keydown){
		ball.halt = false;
		keydown = true;
		if(event.key === "ArrowUp"){
			ball.acc.add(new JSVector(0,-1));
			ball.acc.setDirection(-Math.PI/2);
		}

		if(event.key === "ArrowDown"){
			ball.acc.add(new JSVector(0,1));
			ball.acc.setDirection(Math.PI/2);
		}

		if(event.key === "ArrowLeft"){
			ball.acc.add(new JSVector(-1,0));
			ball.acc.setDirection(Math.PI);
		}

		if(event.key === "ArrowRight"){
			ball.acc.add(new JSVector(1,0));
			ball.acc.setDirection(0);
		}

	}
}

window.addEventListener("keyup", function(){
	keydown = false;
	ball.halt = true;
});

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

	ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
	ctx.lineWidth = '3';
	ctx.beginPath();
	ctx.rect(-2000, -2000, 4000, 4000);

	//ctx.translate(distXMoved, distYMoved);

	trans();

	ball.run();

	ctx.translate(-ball.vel.x, -ball.vel.y);

	for(let a = 0; a < balls.length; a++){
		balls[a].run();

	}

}

// translate the screen over the player
function trans(){
	let distVector = JSVector.subGetNew(ball.loc, ball.home);

	miniCtx.strokStyle = 'rgba(0, 0, 0, 1)'
	miniCtx.lineWidth = '.5';
	miniCtx.beginPath();
	miniCtx.rect(-20 + distVector.x/scale, -20 + distVector.y/scale, 40, 40);
	miniCtx.stroke();

}
