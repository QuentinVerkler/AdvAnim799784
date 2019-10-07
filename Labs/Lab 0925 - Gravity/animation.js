window.onload = init;
var cnv;
var ctx;
var ball = [];
var numballs = 4;
var orbiters = 8;
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
		var hunter = false;
		if(a % 2 === 0){hunter = true}
		ball[a] = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+10, orbiters, hunter, 200, a, numballs);
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
