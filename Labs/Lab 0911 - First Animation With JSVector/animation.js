window.onload = init;
var cnv;
var ctx;

var loc = [[]];
var vel = [[]];
var radius = [];


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
	for(let a = 0; a < 5; a++){
		radius[a] = Math.random() * 20 + 10;
		loc[a] = new JSVector(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
		vel[a] = new JSVector(Math.random() * 6 - 3, Math.random() * 6 - 3);
	}
	animate();
}

/*
var loc, vel, radius;
radius = 30;
loc = new JSVector(Math.random() * (window.innerWidth - 2*radius) + radius, Math.random() * (window.innerHeight - 2*radius) + radius);
vel = new JSVector(Math.random() * 6 - 3, Math.random() * 6 - 3);
*/

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

	ctx.strokeStyle = 'rgb(255,105,180)';
	ctx.lineWidth = '10';
	ctx.fillStyle = 'rgb(255,105,180)';
	for(let a = 0; a < 5; a++){
		ctx.beginPath();
		ctx.arc(loc[a].x, loc[a].y, radius[a], Math.PI*2, 0, false);
		ctx.fill();
		ctx.stroke();
		loc[a].add(vel[a]);

		if(loc[a].x < radius[a] || loc[a].x > window.innerWidth - radius[a]) vel[a].x = -vel[a].x;
		if(loc[a].y < radius[a] || loc[a].y > window.innerHeight - radius[a]) vel[a].y = -vel[a].y;
	}
}
