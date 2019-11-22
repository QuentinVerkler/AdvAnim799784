window.onload = init;

//canvas and context variables
var cnv;
var ctx;

//creature arrays
var flock = [];
var ballHunters = [];

// makes canvas and defines the vars
function init(){
  //gets canvas
  cnv = document.getElementById('cnv');
  //sets dimensions
  cnv.width = 1000;
  cnv.height = 950;
  cnv.style.border = 'solid black 2x';
  cnv.style.backgroundColor = 'rgba(82, 147, 49, .5)';

  //++++sliders for flocks++++
  //separation slider
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

	//get context
	ctx = cnv.getContext('2d');

  //creature loaders
  addFlock(20, flock);

  addHuntingGroup(3, ballHunters);

  animate();
}


//animation function
function animate(){
  requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	//slider vars
	var sep = document.getElementById("sep").value;
	var align = document.getElementById("align").value;
	var coh = document.getElementById("coh").value;

  //flock animation
  for(let i = flock.length-1; i > 0; i--){
    if(flock[i] === null){

    }else if(flock[i].lifespan <= 0){
      flock.splice(i, 1);
    }else{
      flock[i].sepDist = sep;
      flock[i].alignDist = align;
      flock[i].cohDist = coh;
      flock[i].run();
    }
  }

  //ballHunters animation
  for(let i = ballHunters.length-1; i > 0; i--){
    ballHunters[i].run(flock);
  }

}

//+++++++flock functions+++++++
//creates flocks
function addFlock(size, group){
  for(let i = 0; i < size; i++){
    group[i] = new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, group, 5, .3);
  }
}

//adds a bird to flock
function addBird(group){
  thing.push(new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, group, 5, .3));
}

//+++++++ballHunter functions+++++++
function addHuntingGroup(size, group){
  for(let i = 0; i < size; i++){
    group[i] = new BallHunterClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()*15+12, Math.ceil(Math.random()*6), 200, 5, .3)
  }
}
