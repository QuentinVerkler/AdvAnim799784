window.onload = init;
var cnv;
var ctx;
var ball = [];
var prey = [];
var numballs = 4;
var orbiters = 8;
var numPrey = 12;
var attractor;
var repulser;
//var ball;

function init(){
	//get canvas
	cnv = document.getElementById('cnv');
	//set dimensions
	cnv.width = 1000;
	cnv.height = 1000;
	cnv.style.border = 'solid black 2x';
	cnv.style.backgroundColor = 'rgba(255, 163, 5, .5)';
	//get context
	ctx = cnv.getContext('2d');

  for(let a = 0; a < numballs; a++){
			ball[a] = new BallClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()*20+15, orbiters, 200);
		}

	for(let a = 0; a < numPrey; a++){
			prey[a] = new PreyClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, a);
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

	for(let a = prey.length -1; a >= 0; a--){
			if (prey[a] === null) {

			}else if(prey[a].lifeSpan <= 0){
				prey.splice(a, 1);
			}else{
				prey[a].run();
			}
	}
	if(prey.length < numPrey){
		
	}

}
