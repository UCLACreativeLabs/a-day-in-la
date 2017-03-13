// this file turns every path you call animateAlongPath() on into an interactive path,
// where you can click along the path to create milestones and see how the behavior changes.
// Every time the array of milestones changes the array is printed to console, so it can
// be copied and hard-coded in.

var oldAnimateAlongPathFn = animateAlongPath;
animateAlongPath = function(path, el, start, duration, milestones, easing, callback) {
	var anim = null,
		args = [...arguments],
		milestones = milestones || [];
	args[4] = milestones;

	function reanimate() {
		anim && anim.stop();
		el.transform(''); // initial transformation should be 0
		anim = oldAnimateAlongPathFn(...args);
		console.log(milestones);
	}

	function removeMilestone(length) {
		milestones.splice(milestones.indexOf(length), 1);
		reanimate();
	}

	milestones.forEach(len => createMilestoneNode(path, len, removeMilestone.bind(len)));

	$("#svg").click(function (e) {
		var matinv = path.transform().globalMatrix.invert(),
			x = e.offsetX,
			y = e.offsetY;

		closest = Snap.closestPoint(path, matinv.x(x,y), matinv.y(x,y));
		if (closest.distance < 5) {
			milestones.push(closest.length);
			milestones.sort((a,b) => a-b);
			createMilestoneNode(path, closest.length, removeMilestone.bind(closest.length));
			reanimate();
		}
	});

	reanimate();
}

function createMilestoneNode(path, length, removeFn) {
	var pt = path.getPointAtLength(length),
		elem = path.parent().circle(pt.x, pt.y, 5);

	elem.insertAfter(path);
	elem.click((e) => {
		elem.remove();
		e.preventDefault();
		e.stopPropagation();
		removeFn();
	});
}
