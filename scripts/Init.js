function init() {
  let s = Snap('#scene');
  let cursor = s.circle(150,150,8);
  s.addClass("cursor");
  cursor.attr({
    fill: "#ddd",
    stroke: "#ddd",
    strokeWidth: 2,
    opacity: 0.8
  });

  function animateExpand() {
    cursor.animate({r: 13},
      800,
      animateShrink
    );
  }

  function animateShrink() {
    cursor.animate({r: 8},
      800,
      animateExpand
    )
  }

  animateExpand();

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("scene").onmousemove = function(evt) {
        //console.log(evt.clientX + ", " + evt.clientY);
        cursor.attr({
            cx: evt.clientX,
            cy: evt.clientY
        });
    };
    
    document.getElementById("scene").onmousedown = function() {
      cursor.animate({
        opacity: 0,
          r: 20
      }, 800, function() {
        cursor.attr({
          opacity: 0.8,
            r: 10
        })
      });
    };
  });
}
