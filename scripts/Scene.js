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

      let cursor = document.createElement('div');
      cursor.classList.add('cursor');


      let body = document.querySelector('body');
      body.insertBefore(cursor, body.firstChild);

      let size = 21;
      let step = 0.04;
      let pulse = setInterval(function() {
        if ((size <= 20 && step < 0) || (size >= 30 && step > 0)) {
          step *= -1;
        }
        size += step;
        cursor.style.width = size + 'px';
        cursor.style.height = size + 'px';

      }, 2)

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



        // move cursor
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
      });

      window.addEventListener('mousedown', function() {
        clearInterval(pulse);
        let count = 0;
        let currSize = size;
        let opacity = 1.0;
        let vanish = setInterval(function() {
          if (count >= 400) {
            cursor.style.width = size + 'px';
            cursor.style.height = size + 'px';
            cursor.style.opacity = 1.0;

            pulse = setInterval(function() {
              if ((size <= 20 && step < 0) || (size >= 30 && step > 0)) {
                step *= -1;
              }
              size += step;
              cursor.style.width = size + 'px';
              cursor.style.height = size + 'px';

            }, 2);

            clearInterval(vanish);
            return;
          }
          currSize += 20/200;

          opacity -= 1/200;

          cursor.style.width = currSize + 'px';
          cursor.style.height = currSize + 'px';
          cursor.style.opacity = opacity;

          count++;
        }, 1)
      });


    }.bind(this));
  }



}
