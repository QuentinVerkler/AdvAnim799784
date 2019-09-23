window.onload = init;
var cnv;
var ctx;
var ball = [];
var numballs = 15;
var tri;
var attractor;
var repulser;
//var ball;

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

  for(let a = 0; a < numballs; a++){
		ball[a] = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+10);
	}

  //tri = new TriClass(Math.random()*window.innerWidth/6, Math.random()*window.innerHeight/6, Math.random()*window.innerWidth/6, Math.random()*window.innerHeight/6, Math.random()*window.innerWidth/6, Math.random()*window.innerHeight/6, Math.random()*6-3, Math.random()*6-3, 0, 0);
	tri = new TriClass(100, 100, 200, 100, 150, 200, 0, 0, 0, 0);
	//ball = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+10);
  //attractor = new BallClass(650, 650, 0, 0, 0, 0, 20);
	//attractor = new TriClass(Math.random()*window.innerWidth/6 + 100, Math.random()*window.innerHeight/6 + 100, Math.random()*window.innerWidth/6 + 100, Math.random()*window.innerHeight/6 + 100, Math.random()*window.innerWidth/6 + 100, Math.random()*window.innerHeight/6 + 100, 0, 0, 0, 0);
	attractor = new TriClass(100, 100, 200, 200, 100, 200, 0, 0, 0, 0);
	repulser = new BallClass(300, 300, 0, 0, 0, 0, 20);
  animate();
}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  /*
  if(ball.loc.distance(attractor.loc) < 200){
    ball.applyForce(true, attractor.loc);
  }
  ball.run();


  for(let a = 0; a < numballs; a++){

    if(ball[a].loc.distance(attractor.loc) < 200){
      ball[a].attract(attractor.loc, .2);
    }
		else if(ball[a].loc.distance(repulser.loc) < 200){
      ball[a].repulse(repulser.loc, .25);
    }

    ball[a].run();
	}
  repulser.run();
  attractor.run();
	*/
	if(tri.middle.distance(attractor.middle) < 400){
		tri.attract(attractor, .3);
	}
  tri.run();
	attractor.run();

}
