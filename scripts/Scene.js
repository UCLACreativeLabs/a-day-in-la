function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

function initCursor() {
  let cursor = document.createElement('div');
  cursor.classList.add('cursor');

  let body = document.querySelector('body');
  body.insertBefore(cursor, body.firstChild);

  window.addEventListener('mousemove', function(e) {
    // move cursor
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
  })

  let handleClick = throttle(function(e) {
    cursor.style.animationName = "none";
    let count = 0;
    let currScale = 1.0;
    let opacity = 0.6;
    let vanish = setInterval(function() {
      if (count >= 400) {
        cursor.style.transform = 'scale(1.0)';
        cursor.style.opacity = 0.6;

        cursor.style.animationName = "cursor";

        clearInterval(vanish);
        return;
      }
      currScale += 0.5/200;

      opacity -= 0.6/200;

      cursor.style.transform = `scale(${currScale})`;
      cursor.style.opacity = opacity;

      count++;
    }, 1)

  }, 1200);

  window.addEventListener('mousedown', handleClick);

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

  this.loadScene = function(path, parallax, firstScene = false) {
    Snap.load(path, function ( loadedFragment ) {
      this.scene.append( loadedFragment );

      if (firstScene) {
        //call this function in eventHandler with correct argument
        angular.element(document.getElementById('tipsController')).scope().test('corgi');

        let startScene = document.getElementById('start-scene');

        document.getElementById('Start').addEventListener('click', function() {
          startScene.parentNode.removeChild(startScene);
          scene1.loadScene('assets/lyftScene.svg', false);
          scene1.loadTrans('assets/car.svg');
          document.getElementById('phoneContainer').style.display = "block";
        })
      }

      let bg = svg.getElementById('back');
      let mg = svg.getElementById('mid');
      let fg = svg.getElementById('front');

      if (!bg || !mg || !fg) {
        return;
      }

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
