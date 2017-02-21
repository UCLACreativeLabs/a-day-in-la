var s = Snap("#santamonica");

var santamonica = Snap.load("assets/sm.svg", function ( loadedFragment ) {
  s.append( loadedFragment );

  // var mask = s.rect(400,150,600,400).attr({ stroke: 'silver', 'strokeWidth': 40, fill: 'silver', id: 'mask' });
  // var g = s.group(loadedFragment);
  // s.attr({ mask: mask });
  // function DayFramework() {
    // function Animate(svgJson) {
    //   console.log(svgJson);
    //   for(var element in svgJson) {
    //     var item = document.getElementById(element);

    //     var docElement = document.getElementById(element);

    //     if(svgJson[element].trigger == "default") {
    //       window.setTimeout(function(){
    //         svgJson[element].animation(docElement);
    //       }, 100);
    //     }

    //     item.addEventListener(svgJson[element].trigger, function(){
    //       svgJson[element].animation(docElement);
    //     });
    //   }
    // };
  // };

  var animationsList = {
    ferriswheel: {
      trigger: "default",
      animation: ferrisAnimation,
    }
  }

  // mouseover, click, default
  var animationController = new AnimationController();
  animationController.Animate(animationsList);

  function ferrisAnimation(elem) {
    elem.style.transition = '10s ease all';
    elem.style.transform = 'rotate(360deg)';
    var nodes = elem.childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'g') {
            nodes[i].style.transform = 'rotate(-360deg)';
         }
    }
  }
  // var easingOptions = {
  //   poly: ,
  //   quad: ,
  //   simple:
  // };

  // 

  // function surferAnimation() {
  //
  // }
  //
  // s.append(g);
  // g.hover( hoverover, hoverout );
  // g.text(300,100, 'hover over me');
});
