let s = Snap("#santamonica");

const w = window.innerWidth;
const h = window.innerHeight;
const mid = { x: Math.round(w/2), y: Math.round(h/2) };
const pad = 1;
const scale = 1;
const parallax_factor = 0.4;


var santamonica = Snap.load("assets/scene1.svg", function ( loadedFragment ) {
  s.append( loadedFragment );

  var svg = document.getElementById('santamonica');
  svg.style.width = w + 'px';
  svg.style.height = h + 'px';
  svg.style.transformOrigin = '50% 50%';

  let bg = svg.getElementById('back');
  let mg = svg.getElementById('mid');
  let fg = svg.getElementById('front');

  window.addEventListener('mousemove', function(e) {
    let dx = e.pageX - mid.x;
    let dy = e.pageY - mid.y;

    let newX = -1 * Math.min((w / 10) * (dx / mid.x) * pad, w/10);
    let newY = -1 * Math.min((h / 20) * (dy / mid.y) * pad, h/20);

    [fg, mg, bg].forEach(function(layer) {
      layer.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${newX}, ${newY})`;
      newX *= parallax_factor;
      newY *= parallax_factor;
    })

    // let newX = -1 * Math.min((w / 10) * (dx / mid.x) * pad, w/10);
    // let newY = -1 * Math.min((h / 20) * (dy / mid.y) * pad, h/20);

    // svg.style.transform = "translate(" + percX + "%," + percY + "%)";
    // svg.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${newX}, ${newY})`



  });

  // var mask = s.rect(400,150,600,400).attr({ stroke: 'silver', 'strokeWidth': 40, fill: 'silver', id: 'mask' });
  // s.attr({ mask: mask });

  // animate{
  //   waves: {
  //     trigger: "default", "click", "hover"
  //     animation: surferAnimation()
  //     easein:
  //     easeout:
  //     hotspot: x: , y: // or target
  //   }
  // }

  // function surferAnimation() {
  //
  // }
  //
  // s.append(g);
  // g.hover( hoverover, hoverout );
  // g.text(300,100, 'hover over me');
});
