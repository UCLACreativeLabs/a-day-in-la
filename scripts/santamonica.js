var s = Snap("#santamonica");

var santamonica = Snap.load("assets/samo.svg", function ( loadedFragment ) {
  s.append( loadedFragment );

  var mask = s.rect(400,150,600,400).attr({ stroke: 'silver', 'strokeWidth': 40, fill: 'silver', id: 'mask' });
  // var g = s.group(loadedFragment);
  s.attr({ mask: mask });
  //
  // s.append(g);
  // g.hover( hoverover, hoverout );
  // g.text(300,100, 'hover over me');
});
