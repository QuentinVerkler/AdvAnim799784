window.onload = init;
var cnv;
var ctx;
var ball = [];
var numballs = 30;
var orbiters = 12;
var attractor;
var repulser;
//var ball;

function init(){
	//get canvas
	cnv = document.getElementById('cnv');
	//set dimensions
	cnv.width = window.innerWidth;
	cnv.height = window.innerHeight;
	cnv.style.border = 'solid black 2x';
	cnv.style.backgroundColor = 'rgba(255, 163, 5, .5)';
	//get context
	ctx = cnv.getContext('2d');

  for(let a = 0; a < numballs; a++){
		ball[a] = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+10, orbiters);
	}

  //ball = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+20, 8);
  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	//ball.run();

  for(let a = 0; a < numballs; a++){
    ball[a].run();
	}

}
