window.onload = init;
var cnv;
var ctx;
var balls = [];
// var keyboard = new KeyboardEvent();

//eventListeners
window.addEventListener("up", up);
window.addEventListener("left", left);
window.addEventListener("right", right);
window.addEventListener("down", down);

//keyboard events
window.addEventListener("keydown", function(event)){
  if(event.keyCode === 37){
    var keyEvent = new Event("left");
    window.dispatchEvent(keyEvent);
  }else if(event.keyCode === 38){
    var keyEvent = new Event("up");
    window.dispatchEvent(keyEvent);
  }else if(event.keyCode === 39){
    var keyEvent = new Event("right");
    window.dispatchEvent(keyEvent);
  }else if(event.keyCode === 40){
    var keyEvent = new Event("down");
    window.dispatchEvent(keyEvent);
  }
}

function init(){
	//get canvas
	cnv = document.getElementById('cnv');
	//set dimensions
	cnv.width = window.innerWidth;
	cnv.height = window.innerHeight;
	cnv.style.border = 'solid black 2x';
	cnv.style.backgroundColor = 'rgba(0,44,55, .5)';

  //get context
	ctx = cnv.getContext('2d');
  //move canvas so origin is in middle
  ctx.translate(cnv.width/2, cnv.height/2);

	ball[0] = new BallClass(-100, -100, 0, 0, 0, 0, 30);
  ball[1] = new BallClass(100, -100, 0, 0, 0, 0, 30);
  ball[2] = new BallClass(-100, 100, 0, 0, 0, 0, 30);
  ball[3] = new BallClass(100, 100, 0, 0, 0, 0, 30);

	animate();
}



function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	for(let a = 0; a < balls.length; a++){
		ball[a].run();
	}

  // if(keyboard.key = 38){
  //   var collisionEvent = new Event("up");
  //   window.dispatchEvent(collisionEvent);
  // }
}

//eventListener functions
function up(collisionEvent){
  ctx.translate(0, -1);
}

function left(collisionEvent){
  ctx.translate(-1, 0);
}

function right(collisionEvent){
  ctx.translate(1, 0);
}

function down(collisionEvent){
  ctx.translate(0, 1);
}
