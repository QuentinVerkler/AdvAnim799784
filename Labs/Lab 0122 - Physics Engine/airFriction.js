window.addEventListener('load', setup);

function setup(){
  // module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create(),
    world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1000,
      height: 1000,
      showVelocity: true,
      showAngleIndicator: true,
      showCollisions: true,
      background: '#111'
    }
});

// run the renderer
Render.run(render);

//create Runner
// var runner = Runner.create();
// Runner.run(runner, engine);

//mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: .2,
          render: {
            visible: false
          }
        }
    });

World.add(world, mouseConstraint);

//color
var purpleColor = '#751575';

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80,
  {density: .4, restitution: .6, frictionAir: .05, friction: .05,});
var boxB = Bodies.rectangle(450, 50, 80, 80,
  {density: .2, frictionAir: .03});
var circA = Bodies.circle(280, 150, 50,
  {density: .6, restitution: .9, frictionAir: .03, friction: 1}, 800);
var ground1 = Bodies.rectangle(300, 410, 810, 60,
  { isStatic: true, angle: Math.PI * .09 });
var ground2 = Bodies.rectangle(750, 750, 500, 60,
  { isStatic: true, angle: -Math.PI * .05 });
var ground3 = Bodies.rectangle(380, 800, 200, 40,
  { isStatic: true, angle: Math.PI * .5 });
var circB = Bodies.circle(380, 640, 60,
  {
    render: {
      fillStyle: purpleColor
    }
  });


// add all of the bodies to the world
World.add(world, [boxA, boxB, circA, circB, ground1, ground2, ground3]);

//add additional Bodies
World.add(world, Matter.Bodies.trapezoid(800, 300, 80, 50, Math.PI/5,
  {density: .8, restitution: .8, frictionAir: .1, friction: .35}
));

World.add(world, Matter.Bodies.polygon(700, 350, 5, 70,
  {density: .3, frictionAir: .08, friction: .4}
));

//adds rope
World.add(world, Constraint.create({
  pointA: {x: 380, y: 470},
  bodyB: circB
}));

World.add(world, Constraint.create({
  pointA: {x: 300, y: 150},
  bodyB: boxB
}));

// run the engine
Engine.run(engine);

}
