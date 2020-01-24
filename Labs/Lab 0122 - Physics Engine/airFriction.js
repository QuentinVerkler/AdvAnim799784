window.addEventListener('load', setup);

function setup(){
  // module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
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
      showCollisions: true
    }
});

// run the renderer
Render.run(render);

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
  {density: .1, frictionAir: .07, friction: .01});
var boxB = Bodies.rectangle(450, 50, 80, 80,
  {density: .2, frictionAir: .03, friction: .7});
var circA = Bodies.circle(320, 150, 60, 1, 50, 10,
  {density: .4, frictionAir: .05, friction: .9});
var ground1 = Bodies.rectangle(300, 410, 810, 60,
  { isStatic: true, angle: Math.PI * .09 });
var ground2 = Bodies.rectangle(700, 750, 400, 60,
  { isStatic: true, angle: -Math.PI * .05 });
var ground3 = Bodies.rectangle(380, 800, 200, 40,
  { isStatic: true, angle: Math.PI * .5 });
var circB = Bodies.circle(380, 600, 90, 1, 500, 20,
  {
    render: {
      fillStyle: purpleColor
    }
  });

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, circA, circB, ground1, ground2, ground3]);

// run the engine
Engine.run(engine);

}
