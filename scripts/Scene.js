function initCursor() {
  let cursor = document.createElement('div');
  cursor.classList.add('cursor');


  let body = document.querySelector('body');
  body.insertBefore(cursor, body.firstChild);

  let step = 0.001;
  let scale = 1.0;
  var pulse = setInterval(function() {
    if ((scale <= 1.0 && step < 0) || (scale >= 1.4 && step > 0)) {
      step *= -1;
    }
    scale += step;
    cursor.style.transform = 'scale(' + scale + ')';
  }, 2)

  window.addEventListener('mousemove', function(e) {
    // move cursor
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
  })

  window.addEventListener('mousedown', function(e) {
    clearInterval(pulse);
    let count = 0;
    let currScale = scale;
    let opacity = 1.0;
    let vanish = setInterval(function() {
      if (count >= 400) {
        cursor.style.transform = `scale(${scale})`;
        cursor.style.opacity = 1.0;

        pulse = setInterval(function() {
          if ((scale <= 1.0 && step < 0) || (scale >= 1.4 && step > 0)) {
            step *= -1;
          }
          scale += step;
          cursor.style.transform = 'scale(' + scale + ')';
        }, 2);

        clearInterval(vanish);
        return;
      }
      currScale += 0.5/200;

      opacity -= 1/200;

      cursor.style.transform = `scale(${currScale})`;
      cursor.style.opacity = opacity;

      count++;
    }, 1)
  });

}

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

  this.loadTrans = function(path){
    Snap.load(path, function (loadedFragment){
      document.body.appendChild(loadedFragment.node);
    }.bind(this));
  }

  this.loadScene = function(path, parallax) {
    Snap.load(path, function ( loadedFragment ) {
      this.scene.append( loadedFragment );

      let bg = svg.getElementById('back');
      let mg = svg.getElementById('mid');
      let fg = svg.getElementById('front');

      window.addEventListener('mousemove', function(e) {
        if (parallax) {
          let dx = e.pageX - MID.x;
          let dy = e.pageY - MID.y;

          let newX = -1 * Math.min((WIDTH / 10) * (dx / MID.x) * PAD, WIDTH/10);
          let newY = 0 * Math.min((HEIGHT / 20) * (dy / MID.y) * PAD, HEIGHT/20);

          [fg, mg, bg].forEach(function(layer) {
            layer.style.transform = `matrix(${SCALE}, 0, 0, ${SCALE}, ${newX}, ${newY})`;
            newX *= PARALLAX_FACTOR;
            newY *= PARALLAX_FACTOR;
          })
        }
      });


    }.bind(this));
  }



}
