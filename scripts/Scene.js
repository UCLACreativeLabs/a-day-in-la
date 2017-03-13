function Scene() {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const MID = { x: Math.round(WIDTH/2), y: Math.round(HEIGHT/2) };
  const PAD = 1;
  const SCALE = 1;
  const PARALLAX_FACTOR = 0.4;

  this.scene = Snap('#scene');
  let svg = document.getElementById('scene');

  svg.style.width = WIDTH + 'px';
  svg.style.height = HEIGHT + 'px';
  svg.style.transformOrigin = '50% 50%';

  this.loadScene = function(path) {
    Snap.load(path, function ( loadedFragment ) {
      this.scene.append( loadedFragment );

      // cursor init
      let loadedScene = Snap(this.scene.select('svg'));
      let cursor = loadedScene.circle(150,150,8);
      cursor.addClass("cursor");
      cursor.attr({
        fill: "#ddd",
        stroke: "#ddd",
        strokeWidth: 4,
        opacity: 0.8
      });

      function animateExpand() {
        cursor.animate({r: 13},
          800,
          animateShrink
        );
      }

      function animateShrink() {
        cursor.animate({r: 8},
          800,
          animateExpand
        )
      }

      animateExpand();

      let bg = svg.getElementById('back');
      let mg = svg.getElementById('mid');
      let fg = svg.getElementById('front');

      window.addEventListener('mousemove', function(e) {
        let dx = e.pageX - MID.x;
        let dy = e.pageY - MID.y;

        let newX = -1 * Math.min((WIDTH / 10) * (dx / MID.x) * PAD, WIDTH/10);
        let newY = 0 * Math.min((HEIGHT / 20) * (dy / MID.y) * PAD, HEIGHT/20);

        [fg, mg, bg].forEach(function(layer) {
          layer.style.transform = `matrix(${SCALE}, 0, 0, ${SCALE}, ${newX}, ${newY})`;
          newX *= PARALLAX_FACTOR;
          newY *= PARALLAX_FACTOR;
        })

        console.log(e);

        // move cursor
        cursor.attr({
          cx: e.clientX,
          cy: e.clientY
        });

      });

      window.addEventListener('mousedown', function() {
        cursor.animate({
          opacity: 0,
            r: 20
        }, 800, function() {
          cursor.attr({
            opacity: 0.8,
              r: 10
          })
        });
      });


    }.bind(this));
  }



}
