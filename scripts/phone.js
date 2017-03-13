var phoneCont = document.getElementsByClassName('phoneCont')[0];
var main = document.getElementById("scene");

var SM = phoneCont.getElementById('SantaMonica_1_');
var HB = phoneCont.getElementById('Hollywood_2_');
var CF = phoneCont.getElementById('Cafe_2_');
var BAR = phoneCont.getElementById('Bar_2_');

phoneCont.addEventListener('click', expandPhone);

function clickEvent(e){
	e.stopPropagation();
	shrinkPhone();
	moveUpWaves();
}

function shrinkPhone(){
	phoneCont.classList.remove('expanded');
	phoneCont.classList.add('shrunk');
	main.removeEventListener('click', shrinkPhone);
	SM.removeEventListener('click', clickEvent);
}

function expandPhone(){
	phoneCont.classList.add('expanded');
	phoneCont.classList.remove('shrunk');
	main.addEventListener('click', shrinkPhone);

	SM.addEventListener('click', clickEvent);
	SM.addEventListener('click', );

	// HB.addEventListener('click', function(e){
	// 	loadNext('assets/scene1.svg');
	// 	e.stopPropagation();
	// 	}
	// , true);

	CF.addEventListener('click', function(e){
		e.stopPropagation(); 
		shrinkPhone();
		

			//call only after moveUpWaves() is done
		// let cont = scene1.scene.node;
		// let curScene = cont.getElementsByTagName('svg')[0]; //the only svg element in #scene should be the current svg
		// let curTrans = document.getElementById('transition');
		// console.log(curScene);
		// cont.removeChild(curScene);
		// document.body.removeChild(curTrans);
		// scene1.loadScene('assets/scene1.svg');
		// scene1.loadTrans('assets/waves.svg'); 
	});


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