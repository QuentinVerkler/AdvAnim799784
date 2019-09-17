window.onload = init;
var cnv;
var ctx;
var ball = [];
var numballs = 15;
//var ball = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, .01, .01, Math.random()* 20+10);


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
	for(let a = 0; a < numballs; a++){
		ball[a] = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, .07, .07, Math.random()* 20+10);
	}

	animate();
}



function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	//ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
	for(let a = 0; a < numballs; a++){
		ball[a].run();
	}

}
