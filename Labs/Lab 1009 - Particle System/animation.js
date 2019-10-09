window.onload = init;
var cnv;
var ctx;
var ship;

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

	ship = new ShipClass(200, 200, 0, 0, 0, 0);

  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	ship.run();
}
