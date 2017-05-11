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


// function initTips() {
// 	var opacity = 0;
// 	window.addEventListener('keypress', function(e) {
// 		opacity = 1 - opacity;
// 		if (opacity == 1) {
// 			document.getElementsByClassName('tipsContainerParent')[0].style.display = "flex";
// 			window.setTimeout(function() {
// 				document.getElementsByClassName('tipsContainerParent')[0].style.opacity = opacity;
// 			}, 100);
// 		}
// 		else {
// 			document.getElementsByClassName('tipsContainerParent')[0].style.opacity = opacity;
// 			window.setTimeout(function() {
// 				document.getElementsByClassName('tipsContainerParent')[0].style.display = "none";
// 			}, 500);
// 		}
		
// 	})
// }

angular.module('tipsApp', [])
  .controller('TipsController', function($scope) {
    $scope.tipList = {
	santamonica: {
	corgi: {
		tips: [
			{
				title: 'Test 1',
				description: 'description here',
				link: '',
				img: ''
			},
			{
				title: 'Test 2',
				description: 'description here',
				link: '',
				img: ''
			},
			{
				title: 'Test 2',
				description: 'description here',
				link: '',
				img: ''
			},
			{
				title: 'Test 2',
				description: 'description here',
				link: '',
				img: ''
			},
		]
	},

	}
};
 
 	$scope.currentTip = $scope.tipList.santamonica.corgi;

 	$scope.test = function(name) {
 		console.log('lund', name);
 	};

 	console.log($scope.currentTip);
  });