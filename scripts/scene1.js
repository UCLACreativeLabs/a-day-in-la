let scene1 = new Scene();
scene1.loadScene('assets/hollywood.svg');

var animationsList = {
  Van: {
    trigger: "default",
    animation: vanAnimation,
  }
}

// mouseover, click, default
var animationController = new AnimationController();
animationController.Animate(animationsList);

//define CustomAnimations here
function vanAnimation(elem) {
  elem.style.transition = '10s ease all';
  elem.style.transform = 'translate(-100vh)';
}
