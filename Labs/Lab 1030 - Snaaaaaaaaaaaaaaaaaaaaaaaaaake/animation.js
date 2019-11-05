window.onload = init;
var cnv;
var ctx;
var snake;
var bed = [];
var numSnake = 50;

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

	snake = new HeadClass(300, 300, 2, 2, 0, 0, 10, 5);

	for(let a = 0; a < numSnake; a++){
		bed[a] = new HeadClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*8-4, Math.random()*6-3, 0, 0, Math.random() * 10 + 5, 7);
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
