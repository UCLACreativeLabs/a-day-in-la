// function renderTips(tips) {
// 	tips.forEach( function(key, value, index) {
// 		var container = document.getElementById("tipsContainer");


// 	});

// 	//show tips with timeouts

// }

// function destroyTips(tips) {
// 	//hide tips with timeouts
// 	tips.forEach( function(key, value, index) {
// 		var container = document.getElementById("tipsContainer");


// 	});
// }




function initTips() {
	var opacity = 0;
	window.addEventListener('keypress', function(e) {
		opacity = 1 - opacity;
		document.getElementsByClassName('tipsContainerParent')[0].style.opacity = opacity;

	})
}
