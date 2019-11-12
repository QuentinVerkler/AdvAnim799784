window.onload = init;
var cnv;
var ctx;
var bird;
var flock = [];
var flockSize = 20;

function init(){
	//get canvas
	cnv = document.getElementById('cnv');
	//set dimensions
	cnv.width = window.innerWidth - 100;
	cnv.height = window.innerHeight;
	cnv.style.border = 'solid black 2x';
	cnv.style.backgroundColor = 'rgba(255, 163, 5, .5)';
	//get context
	ctx = cnv.getContext('2d');

	for(let i = 0; i < flockSize; i++){
		flock[i] = new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, flock, 10, .5)
	}

	//bird = new BirdClass(400, 200, -3, -3, 0, 0, 10, .5);

  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	//bird.run();
	for(let i = 0; i < flock.length; i++){
		flock[i].run();
	}
}
