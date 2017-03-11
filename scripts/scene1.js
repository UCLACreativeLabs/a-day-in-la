let scene1 = new Scene();
scene1.loadScene('assets/lyftScene.svg');

var animationsList = {
    sky: {
    trigger: "default",
    animation: skyAnimation,
  },

  cityscape1: {
    trigger: "default",
    animation: cityscapeAnimation,
  },
};

// mouseover, click, default
var animationController = new AnimationController();
animationController.Animate(animationsList);

//define CustomAnimations here
function skyAnimation(elem) {
  elem.style.transition = '10s ease all';
  elem.style.transform = 'translate(50vh)';
}

function cityscapeAnimation(elem) {
  elem.style.transition = '10s ease all';
  elem.style.transform = 'translate(100vh)';
}
