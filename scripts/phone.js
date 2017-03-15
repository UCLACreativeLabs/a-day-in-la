var phoneCont = document.getElementsByClassName('phoneCont')[0];
var main = document.getElementById("scene");
var music = document.getElementById("music");

var SM = phoneCont.getElementById('SantaMonica_1_');
var HB = phoneCont.getElementById('Hollywood_2_');
var CF = phoneCont.getElementById('Cafe_2_');
var BAR = phoneCont.getElementById('Bar_2_');

var nextSceneHash = {
	'assets/cafe.svg' : {
		"name" : "",
		"parallax" : true
	},
	'assets/HollywoodScene.svg' : {
		"name" : "Hollywood",
		"parallax" : false
	},
	'assets/bar.svg' : {
		"name" : "",
		"parallax" : true
	},
	'assets/SantaMonica.svg' : {
		"name" : "SantaMonica",
		"parallax": true
	}
}

var nextTrans;
var nextScene;
var curScene = 'LYFT';

phoneCont.addEventListener('click', expandPhone);

function loadjscssfile(filename, filetype){
  if (filetype=="js"){ //if filename is a external JavaScript file
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}

function removejscssfile(filename, filetype){
	var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
	var allsuspects=document.getElementsByTagName(targetelement)
	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
		allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
	}
}

function clickEventCF(e){
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/coffee trans.svg';
	nextScene = 'assets/cafe.svg';
	music.src = 'assets/cafemusic.mp3';
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
	e.stopPropagation();
	shrinkPhone();
	nextTrans = 'assets/star.svg';
	nextScene = 'assets/HollywoodScene.svg';
	music.src = 'assets/hollywoodmusic.mp3';
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
	nextScene = 'assets/SantaMonica.svg';
	music.src = 'assets/santamonicamusic.mp3'
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
	music.src = 'assets/barmusic.mp3';
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
	let oldScripts = Array.prototype.slice.apply(document.querySelectorAll('script')).filter(s => (s.src != undefined && s.src.search('scenes') > -1))
	if (oldScripts.length > 0) { oldScripts.forEach(s => s.parentNode.removeChild(s)); }

	let oldStyles = Array.prototype.slice.apply(document.querySelectorAll('link')).filter(s => (s.href != undefined && s.href.search('scenes') > -1))
	if (oldStyles.length > 0) { oldStyles.forEach(l => l.parentNode.removeChild(l)); }

	let cont = scene1.scene.node;
	let curScene = cont.getElementsByTagName('svg')[0]; //the only svg element in #scene should be the current svg
	let curTrans = document.getElementById('transition');
	cont.removeChild(curScene);
	let sceneInfo = nextSceneHash[nextScene];

	scene1.loadScene(scenePath, sceneInfo.parallax);
	loadjscssfile("./css/scenes/" + sceneInfo.name + ".css", "css");
	loadjscssfile("./scripts/scenes/" + sceneInfo.name + ".js", "js");
}

function shrinkPhone(){
	phoneCont.classList.remove('expanded');
	phoneCont.classList.add('shrunk');
	main.removeEventListener('click', shrinkPhone);

	SM.removeEventListener('click', clickEventSM);
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
