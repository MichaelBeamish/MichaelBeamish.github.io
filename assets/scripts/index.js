Physics(function(world) {
  // bounds of the window
  var viewportBounds = Physics.aabb(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    ),
    edgeBounce,
    renderer;

  // create a renderer
  renderer = Physics.renderer("canvas", {
    el: "myscreen",
    meta: false, // don't display meta data
    styles: {
      // set colors for the circle bodies
      circle: {
        strokeStyle: "hsla(60, 37%, 17%, 1)",
        lineWidth: 1,
        fillStyle: "hsla(60, 37%, 57%, 0.8)",
        angleIndicator: "hsla(60, 37%, 17%, 0.4)"
      }
    }
  });

  // add the renderer
  world.add(renderer);
  // render on each step
  world.on("step", function() {
    world.render();
  });

  // constrain objects to these bounds
  edgeBounce = Physics.behavior("edge-collision-detection", {
    aabb: viewportBounds,
    restitution: 0.2,
    cof: 0.1
  });

  // resize events
  window.addEventListener(
    "resize",
    function() {
      // as of 0.7.0 the renderer will auto resize... so we just take the values from the renderer
      viewportBounds = Physics.aabb(0, 0, renderer.width, renderer.height);
      // update the boundaries
      edgeBounce.setAABB(viewportBounds);
    },
    true
  );

  let myhead = Physics.body("rectangle", {
    x: renderer.width * 0.083,
    y: renderer.height * 0.108,
    styles: {
      src: "assets/images/head-icon.png",
      width: 119,
      height: 169
    }
  });
  world.add(myhead);

  // add some fun interaction
  var attractor = Physics.behavior("attractor", {
    order: 0,
    strength: 0.002
  });
  world.on({
    "interact:poke": function(pos) {
      world.wakeUpAll();
      attractor.position(pos);
      world.add(attractor);
    },
    "interact:move": function(pos) {
      attractor.position(pos);
    },
    "interact:release": function() {
      world.wakeUpAll();
      world.remove(attractor);
    }
  });

  world.add([
    Physics.behavior("interactive", { el: renderer.container }),
    Physics.behavior("body-impulse-response"),
    edgeBounce
  ]);

  // add things to the world
  document.getElementById("myscreen").addEventListener("click", function() {
    world.add([Physics.behavior("constant-acceleration")]);
    document.getElementById("myimg").src = "./assets/images/head-shot.jpg";
    myhead.state.vel.y = -0.2;
    myhead.state.vel.x = 0.4;
  });

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function(time) {
    world.step(time);
  });
});
