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
      });
    }.bind(this));
  }



}
