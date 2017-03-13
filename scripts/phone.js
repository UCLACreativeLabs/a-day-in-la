var phoneCont = document.getElementsByClassName('phoneCont')[0];
var main = document.getElementById("scene");

var SM = phoneCont.getElementById('SantaMonica_1_');
var HB = phoneCont.getElementById('Hollywood_2_');
var CF = phoneCont.getElementById('Cafe_2_');
var BAR = phoneCont.getElementById('Bar_2_');

var nextTrans = 'assets/coffee trans.svg';
var nextScene = 'assets/cafe.svg';
var curScene = HB;

phoneCont.addEventListener('click', expandPhone);

function clickEventCF(e){
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/coffee trans.svg';
	nextScene = 'assets/cafe.svg';
	if (curScene == SM)
		moveUpWaves();
	else if (curScene == HB){
		shrinkStar();
		setTimeout(function(){transitionTo('assets/cafe.svg'); expandStar();}, 500);
	}
}

function clickEventHB(e){
	console.log('clicked hb');
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/star.svg';
	nextScene = 'assets/HollywoodScene.svg';
	let star = Snap("#star");
	star.attr({transform: "s 12 12"});
	scene1.scene.attr({mask: star}); 
	if (curScene == SM)
		moveUpWaves();
	else if (curScene == HB)
		return;
}

function clickEventSM(e){
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/waves.svg';
	nextScene = 'assets/HollywoodScene.svg';
	
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
}

function expandPhone(){
	phoneCont.classList.add('expanded');
	phoneCont.classList.remove('shrunk');
	main.addEventListener('click', shrinkPhone);

	CF.addEventListener('click', clickEventCF);

	// HB.addEventListener('click', function(e){
	// 	loadNext('assets/scene1.svg');
	// 	e.stopPropagation();
	// 	}
	// , true);
	HB.addEventListener('click', clickEventHB);


	// BAR.addEventListener('click', function(e){
	// 	loadNext('assets/scene1.svg');
	// 	e.stopPropagation();
	// 	},
	// true);
}

function loadJS(path){
	var script = document.createElement('script');
	script.src = path;
	document.body.appendChild(script);
}