var s = Snap("#santamonica");

var santamonica = Snap.load("assets/scene1.svg", function ( loadedFragment ) {
  s.append( loadedFragment );

  // var mask = s.rect(400,150,600,400).attr({ stroke: 'silver', 'strokeWidth': 40, fill: 'silver', id: 'mask' });
  // var g = s.group(loadedFragment);
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
