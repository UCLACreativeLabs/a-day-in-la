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
	}

	$("#svg").click(function (e) {
		var matinv = path.transform().globalMatrix.invert(),
			x = e.offsetX,
			y = e.offsetY;

		closest = Snap.closestPoint(path, matinv.x(x,y), matinv.y(x,y));
		if (closest.distance < 5) {
			createMilestone(path, closest.length, milestones, reanimate);
		}
	});

	reanimate();
}

function createMilestone(path, length, milestones, reanimateFn) {
	var pt = path.getPointAtLength(length),
		elem = path.parent().circle(pt.x, pt.y, 5);

	milestones.push(length);
	milestones.sort((a,b) => a-b);
	elem.insertAfter(path);
	elem.click((e) => {
		milestones.splice(milestones.indexOf(length), 1);
		elem.remove();
		e.preventDefault();
		e.stopPropagation();
		reanimateFn();
	});
	reanimateFn();
}
