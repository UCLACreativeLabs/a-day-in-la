var s = Snap("#santamonica");

var w = window.innerWidth;
var h = window.innerHeight;
var mid = { x: Math.round(w/2), y: Math.round(h/2) };
var pad = 200;


var santamonica = Snap.load("assets/scene1.svg", function ( loadedFragment ) {
  s.append( loadedFragment );

  var svg = document.getElementById('santamonica');

  window.addEventListener('mousemove', function(e) {
    if (e.pageX < (mid.x - pad)) {
      let currX = 0;
      (function(currX) {
        setInterval(
          function() {
            currX -= 10;
            svg.style.transform = "translateX(" + currX + "px)";

          }, 200
        )

      })(currX);

    }

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
