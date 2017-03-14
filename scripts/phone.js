var phoneCont = document.getElementsByClassName('phoneCont')[0];
var main = document.getElementById("scene");

var SM = phoneCont.getElementById('SantaMonica_1_');
var HB = phoneCont.getElementById('Hollywood_2_');
var CF = phoneCont.getElementById('Cafe_2_');
var BAR = phoneCont.getElementById('Bar_2_');


var nextTrans;
var nextScene;
var curScene = 'LYFT';

phoneCont.addEventListener('click', expandPhone);

function clickEventCF(e){
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/coffee trans.svg';
	nextScene = 'assets/cafe.svg';
	if (curScene == SM)
		moveUpWaves();
	else if (curScene == HB){
		let star = Snap("#star");
		star.attr({transform: "s 12 12"});
		scene1.scene.attr({mask: star});
		shrinkStar();
		setTimeout(function(){transitionTo('assets/cafe.svg'); expandStar();}, 500);
	}
	else if (curScene == CF){
		return;
	}
	else if (curScene == BAR){
		slideBottles();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	else if (curScene == "LYFT"){
		drive();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	curScene = CF;
}

function clickEventHB(e){
	console.log('clicked hb');
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/star.svg';
	nextScene = 'assets/HollywoodScene.svg';
	if (curScene == SM)
		moveUpWaves();
	else if (curScene == HB)
		return;
	else if (curScene == CF){
		expandCoffee();
		setTimeout(function(){transitionTo(nextScene); shrinkCoffee();}, 500);
	}
	else if (curScene == BAR){
		slideBottles();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	else if (curScene == "LYFT"){
		drive();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	curScene = HB;
}

function clickEventSM(e){
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/waves.svg';
	nextScene = 'assets/scene1.svg';
	if (curScene == SM)
		return;
	else if (curScene == HB){
		let star = Snap("#star");
		star.attr({transform: "s 12 12"});
		scene1.scene.attr({mask: star});
		shrinkStar();
		setTimeout(function(){transitionTo('assets/scene1.svg'); expandStar();}, 500);
	}
	else if (curScene == CF){
		expandCoffee();
		setTimeout(function(){transitionTo(nextScene); shrinkCoffee();}, 700);
	}
	else if (curScene == BAR){
		slideBottles();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	else if (curScene == "LYFT"){
		drive();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	curScene = SM;
}

function clickEventBAR(e){
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/bottles.svg';
	nextScene = 'assets/bar.svg';
	if (curScene == SM){
		moveUpWaves();
	}
	else if (curScene == HB){
		let star = Snap("#star");
		star.attr({transform: "s 12 12"});
		scene1.scene.attr({mask: star});
		shrinkStar();
		setTimeout(function(){transitionTo(nextScene); expandStar();}, 500);
	}
	else if (curScene == CF){
		expandCoffee();
		setTimeout(function(){transitionTo(nextScene); shrinkCoffee();}, 700);
	}
	else if (curScene == BAR)
		return;
	else if (curScene == "LYFT"){
		drive();
		setTimeout(function(){transitionTo(nextScene);}, 1500);
	}
	curScene = BAR;
}
function transitionTo(scenePath){ //doesnt handle trans svg, handled in animation func
	console.log(scenePath);
	let cont = scene1.scene.node;
		let curScene = cont.getElementsByTagName('svg')[0]; //the only svg element in #scene should be the current svg
		let curTrans = document.getElementById('transition');
		console.log(curScene);
		cont.removeChild(curScene);
		scene1.loadScene(scenePath);
}

function shrinkPhone(){
	phoneCont.classList.remove('expanded');
	phoneCont.classList.add('shrunk');
	main.removeEventListener('click', shrinkPhone);
	
	CF.removeEventListener('click', clickEventCF);
	HB.removeEventListener('click', clickEventHB);
	BAR.removeEventListener('click', clickEventBAR);
}

function expandPhone(){
	phoneCont.classList.add('expanded');
	phoneCont.classList.remove('shrunk');
	main.addEventListener('click', shrinkPhone);

	SM.addEventListener('click', clickEventSM);
	CF.addEventListener('click', clickEventCF);
	HB.addEventListener('click', clickEventHB);
	BAR.addEventListener('click', clickEventBAR);

}
