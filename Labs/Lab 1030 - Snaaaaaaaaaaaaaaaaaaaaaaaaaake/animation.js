window.onload = init;
var cnv;
var ctx;
var snake;
var bed = [];
var numSnake = 30;

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

	snake = new HeadClass(300, 300, 0, 0, 0, 0, 15, 5);

	for(let a = 0; a < numSnake; a++){
		bed[a] = new HeadClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*10-5, Math.random()*10-5, 0, 0, Math.random() * 10 + 7, 15);
	}

  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	//snake.run();
	for(let a = 0; a < bed.length; a++){
		bed[a].run();
	}
}
