window.onload = init;
var cnv;
var ctx;
var ship;
var ps = [];


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

	//ps = new ParticleSystem(300, 300, 0, 0, 0, 0, 15)
	//ship = new ShipClass(200, 200, 0, 0, 0, 0, 255);
	cnv.addEventListener("click", makeNewSystem);
  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	//ship.run();
	for(let a = 0; a < ps.length; a++){
		ps[a].run();
	}

}

function makeNewSystem(e){
		var x = e.offsetX;
		var y = e.offsetY;
		ps.push(new ParticleSystem(x, y, 0, 0, 0, 0, 10));
}
