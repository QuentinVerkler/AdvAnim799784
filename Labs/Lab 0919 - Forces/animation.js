window.onload = init;
var cnv;
var ctx;
var ball = [];
var numballs = 25;
//var tri;
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
	cnv.style.backgroundColor = 'rgba(0,44,55, .5)';
	//get context
	ctx = cnv.getContext('2d');

  for(let a = 0; a < numballs; a++){
		ball[a] = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+10);
	}

  //tri = new TriClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, .05, .05);
  //ball = new BallClass(Math.random()*window.innerWidth, Math.random()*window.innerHeight, Math.random()*6-3, Math.random()*6-3, 0, 0, Math.random()* 20+10);
  attractor = new BallClass(500, 500, Math.random()*6-3, Math.random()*6-3, 0, 0, 20);
  repulser = new BallClass(400, 400, Math.random()*6-3, Math.random()*6-3, 0, 0, 20);
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
  */

  for(let a = 0; a < numballs; a++){
    /*
    if(ball[a].loc.distance(attractor.loc) < 300){
      ball[a].applyForce(true, attractor.loc);
    }
    */
    if(ball[a].loc.distance(repulser.loc) < 300){
      ball[a].applyForce(false, repulser.loc);
    }
    else{
      ball[a].acc.setMagnitude(0);
    }
    ball[a].run();
	}
  repulser.run();
  attractor.run();
  //tri.run();

}
