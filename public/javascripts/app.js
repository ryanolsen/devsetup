var timezIn = angular.module('timezIn', []);

timezIn.directive('fileModel', ['$parse', function($parse){
	return {
		restrict:'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			console.log('model', model);

			element.bind('change', function() {
				scope.$apply(function(){
					console.log(scope, element[0].files[0]);
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}])

.factory('fileUpload', ['$http', function($http) {
	return {
		uploadFileToUrl: function(file, uploadUrl) {
			var fd = new FormData();
			fd.append('file', file);

			$http.post(uploadUrl, fd, {
				transformRequest:angular.identity,
				headers:{'Content-Type': undefined }
			})
			.success(function(){})
			.error(function(){});
		}
	}
}])

.controller('createTimezIn', ['$scope', '$http', 'fileUpload', function($scope, $http, fileUpload){
	$scope.uploadFile = function(){
		var file = $scope.myFile;
		var uploadUrl = '/upload';
		fileUpload.uploadFileToUrl(file, uploadUrl);
	}
}]);