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
    restitution: 0.99,
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
    x: 350,
    y: 236,
    styles: {
      src: "assets/images/head-icon.png",
      width: 237,
      height: 337
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

  let timer = 0;
  let clicked = false;

  // add things to the world
  document.getElementById("myscreen").addEventListener("click", function() {
    world.add([Physics.behavior("constant-acceleration")]);
    document.getElementById("myimg").src = "./assets/images/head-shot.jpg";
    myhead.state.vel.y = -0.2;
    myhead.state.vel.x = 0.4;
    clicked = true;
    console.log(myhead.state);
  });

  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function(time) {
    world.step(time);
    if (clicked === true) {
      if (timer === 3) {
        world.add(
          Physics.body("circle", {
            x: myhead.state.pos.x,
            y: myhead.state.pos.y + 150,
            vx: 0,
            radius: Math.floor(Math.random() * 10 + 2),
            styles: {
              fillStyle: "#bf0000",
              angleIndicator: "#bf0000"
            }
          })
        );
      }
      if (timer === 6) {
        world.add(
          Physics.body("circle", {
            x: myhead.state.pos.x,
            y: myhead.state.pos.y + 150,
            vx: 0,
            radius: Math.floor(Math.random() * 10 + 2),
            styles: {
              fillStyle: "#800000",
              angleIndicator: "#800000"
            }
          })
        );
        timer = 0;
      }
      timer++;
    }
  });
});
