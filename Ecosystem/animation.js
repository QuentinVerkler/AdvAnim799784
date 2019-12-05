window.onload = init;

//+++++++event listeners+++++++++
window.addEventListener("poop", poop);

//canvas and context variables
var cnv;
var ctx;

//collision locations
var collisionLocX;
var collisionLocY;

//creature arrays
var flock = [];
var ballHunters = [];
var preyBalls = [];
var bed = [];

//particle system array
var particleSystems = [];

//respawn times
var flockRespawnTime = 0;
var hunterRespawnTime = 0;

// makes canvas and defines the vars
function init(){
  //gets canvas
  cnv = document.getElementById('cnv');
  //sets dimensions
  cnv.width = 1800;
  cnv.height = 2000;
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
  //++++end sliders++++

	//get context
	ctx = cnv.getContext('2d');

  //creature loaders
  addFlock(20, flock);

  addHuntingGroup(3, ballHunters);

  addBed(2, bed);

  addPreyGroup(4, preyBalls);

  animate();
}


//animation function
function animate(){
  requestAnimationFrame(animate);
	ctx.clearRect(0,0,cnv.width, cnv.height);

	//slider vars
	var sep = document.getElementById("sep").value;
	var align = document.getElementById("align").value;
	var coh = document.getElementById("coh").value;

  //respawn timer add
  flockRespawnTime += 1;
  hunterRespawnTime += 1;

  //+++++respawn+++++
  //flock respawn
  if(flock.length < 101 && flockRespawnTime >= 300){
    addBird(flock);
    flockRespawnTime = 0;
  }

  //hunter respawn
  if(ballHunters.length < 21 && hunterRespawnTime >= 600){
    addHunter(ballHunters);
    hunterRespawnTime = 0;
  }

  //flock animation
  for(let i = flock.length-1; i >= 0; i--){
    if(flock[i] === null){

    }else if(flock[i].lifeSpan <= 0){
      flock.splice(i, 1);
    }else{
      flock[i].sepDist = sep;
      flock[i].alignDist = align;
      flock[i].cohDist = coh;
      flock[i].run();
    }
  }

  //ballHunters animation
  for(let i = ballHunters.length-1; i >= 0; i--){
    if(ballHunters[i] === null){

    }else if(ballHunters[i].isDead){
      ballHunters.splice(i,1);
    }else {
      ballHunters[i].run(flock);
    }
  }

  //snake animation
  for(let i = bed.length-1; i >= 0; i--){
    bed[i].run();
  }

  //PreyBall animation
  for(let i = preyBalls.length-1; i >= 0; i--){
    preyBalls[i].run()
  }

  //all particle system animations
  for(let i = particleSystems.length-1; i >=0; i--){
    if(particleSystems[i] === null){

    }else if(particleSystems[i].isDone){
      particleSystems.splice(i,1);
    }else{
      particleSystems[i].run();
    }
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
  group.push(new BirdClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, group, 5, .3));
}
//+++++++end flock functions+++++++

//+++++++ballHunter functions+++++++
function addHuntingGroup(size, group){
  for(let i = 0; i < size; i++){
    group[i] = new BallHunterClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()*15+12, Math.ceil(Math.random()*6), 200, 5, .3);
  }
}

//adds hunter to group
function addHunter(group){
  group.push(new BallHunterClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()*15+12, Math.ceil(Math.random()*6), 200, 5, .3));
}
//+++++++end ballHunter functions+++++++

//+++++++snake functions+++++++
function addBed(size, group){
  for(let i = 0; i < size; i++){
    group[i] = new HeadClass(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*10-5, Math.random()*10-5, 0, 0, Math.random()*10+12, 15)
  }
}
//+++++++end snake functions+++++++

//+++++++PreyBall functions+++++++
//fill new preyBall array
function addPreyGroup(size, group){
  for(let i = 0; i < size; i++){
    group[i] = new PreyBall(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()*15+8, 5, .3);
  }
}

//add preyBall
function addPreyBall(group){
  group.push(new PreyBall(Math.random()*cnv.width, Math.random()*cnv.height, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()*15+8, 5, .3));
}
//+++++++end PreyBAll functions+++++++

//+++++++++++++eventListener functions+++++++++++++++++++++++++
function poop(collisionEvent){
  particleSystems.push(new ParticleSystem(collisionLocX, collisionLocY, 10, 'hsl(30, 100%, 29%)', Math.random()*4 + 4, false));
}
