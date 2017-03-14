// var SantaMonica = new Scene();
// SantaMonica.loadScene('assets/SantaMonica.svg');

var animationsList = {
	CoasterCart: {
		trigger: "default",
		animation: coasterAnimation
	}
};

Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
	var elproto = Element.prototype;
	elproto.animateAlongPath = function (path, el, start, duration, easing) {
		var callback = this;
		el.transform('t0,0');
		var len = Snap.path.getTotalLength(path),
			elBB = el.getBBox(),
			elCenter = {
				x: elBB.x + (elBB.width / 2),
				y: elBB.y + (elBB.height / 2),
			};
		Snap
			.animate(start, len, function (value) {
				var movePoint = Snap.path.getPointAtLength(path, value);
				el.transform('t'+ (movePoint.x - elCenter.x) + ',' + (movePoint.y - elCenter.y));
			}, duration, easing, function(){
				callback.animateAlongPath(path, el, start, duration, easing);
			});
	};
});

// mouseover, click, default
var animationController = new AnimationController();
animationController.Animate(animationsList);
function coasterAnimation(elem) {
	var coastercart = Snap.select("#CoasterCart"),
		pathData = document.getElementById("CoasterTrack").getAttribute("d");
	console.log(pathData);
	elem.children[0].classList += "coaster";
	coastercart.animateAlongPath(pathData, coastercart, 0, 10000, mina.linear());
}
