let scene1 = new Scene();
scene1.loadScene('assets/hollywood.svg');

var animationsList = {
 /* 
  car1: {
  	trigger: "default",
  	animation: car1Animation
  },

  Van: {
    trigger: "default",
    animation: vanAnimation

  },

  car2: {
  	trigger: "default",
  	animation: car2Animation

  },
*/
  car1: {
  	trigger: "mouseover",
  	animation: () => console.log("test"),
  }

}

setTimeout(() => {
	var c1 = $('#sky')[0];
	console.log(c1);
	c1.addEventListener("mouseover", (e) => console.log(e));
	$('#sky').mouseenter((e) => console.log(e));
}, 1000);

// mouseover, click, default

var animationController = new AnimationController();
animationController.Animate(animationsList);

//define CustomAnimations here
// function vanAnimation(elem) {
//   elem.style.transition = '12s ease all ';
//   elem.style.transform = 'translateX(-150vh)';
// }

// function car1Animation(elem) {
//   elem.style.transition = '20s ease all';
//   elem.style.transform = 'translate(-300vh)';
// }

// function car2Animation(elem) {
//   elem.style.transition = '20s ease all';
//   elem.style.transform = 'translate(-300vh)';
// }








