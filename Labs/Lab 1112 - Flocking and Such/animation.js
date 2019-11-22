window.onload = init;
var cnv;
var ctx;
var bird;
var flock = [];
var flock2 = [];
var flock3 = []
var flockSize = 80;

function init(){
	//get canvas
	cnv = document.getElementById('cnv');
	//set dimensions
	cnv.width = 880;
	cnv.height = 1050;
	cnv.style.border = 'solid black 4x';
	cnv.style.backgroundColor = 'rgba(156, 5, 22, .5)';
	//get context
	ctx = cnv.getContext('2d');

	//separation sliders
	document.getElementById("sep").min = .000001;
	document.getElementById("sep").max = 100;
	document.getElementById("sep").step = "any";

	//Alignment sliders
	document.getElementById("align").min = .000001;
	document.getElementById("align").max = 100;
	document.getElementById("align").step = "any";

	//Cohesion sliders
	document.getElementById("coh").min = .000001;
	document.getElementById("coh").max = 100;
	document.getElementById("coh").step = "any";

	for(let i = 0; i < flockSize; i++){
		flock[i] = new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, flock, 5, .3, 2);
		flock2[i] = new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, flock2, 8, .5, 1);
		flock3[i] = new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, flock3, 11, .5, 5);
	}

	//bird = new BirdClass(400, 200, -3, -3, 0, 0, 10, .5);

  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	//slider vars
	var sep = document.getElementById("sep").value;
	var align = document.getElementById("align").value;
	var coh = document.getElementById("coh").value;
	//bird.run();
	for(let i = 0; i < flock.length; i++){
		flock[i].sepDist = sep;
		flock[i].alignDist = align;
		flock[i].cohDist = coh;
		flock[i].run();
		flock2[i].sepDist = sep;
		flock2[i].alignDist = align;
		flock2[i].cohDist = coh;
		flock2[i].run();
		flock3[i].sepDist = sep;
		flock3[i].alignDist = align;
		flock3[i].cohDist = coh;
		flock3[i].run();
	}
}
