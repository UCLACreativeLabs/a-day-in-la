var s = Snap("#santamonica");

var w = window.innerWidth;
var h = window.innerHeight;
var mid = { x: Math.round(w/2), y: Math.round(h/2) };
var pad = 1;
var scale = 1.2;


var santamonica = Snap.load("assets/scene1.svg", function ( loadedFragment ) {
  s.append( loadedFragment );

  var svg = document.getElementById('santamonica');
  svg.style.width = w + 'px';
  svg.style.height = h + 'px';
  svg.style.transformOrigin = '50% 50%';

  window.addEventListener('mousemove', function(e) {
    let dx = e.pageX - mid.x;
    let dy = e.pageY - mid.y;

    let newX = -1 * Math.min((w / 10) * (dx / mid.x) * pad, w/10);
    let newY = -1 * Math.min((h / 10) * (dy / mid.y) * pad, h/10);

    // svg.style.transform = "translate(" + percX + "%," + percY + "%)";
    svg.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${newX}, ${newY})`




    // if (e.pageX < (mid.x - pad)) {
    //   console.log('translating');
    //   let currX = 0;
    //   currX = -100;
    //   let currY = -100;
    //   (function(currX) {
    //     svg.style.transform = "translate(" + currX + "px," + currY + "px)";
    //
    //   })(currX, currY);
    //
    // }

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
