angular.module("kB")
.controller('ArticlesCtrl', ['$scope','$http', function($scope,$http){

	$http.get('/articles').then(function(data){
		$scope.articles = data.data;
	});

}])

.controller('ArticlesCategoryCtrl', ['$scope','$http','$routeParams', function($scope,$http,$routeParams){

	$http.get('/articles/category/'+$routeParams.category).then(function(data){
		$scope.cat_articles = data.data;
		$scope.category = $routeParams.category;
	});

}])

.controller('ArticleDetailsCtrl', ['$scope','$http','$routeParams','$location', function($scope,$http,$routeParams,$location){

	$http.get('/articles/'+$routeParams.id).then(function(data){
		$scope.article = data.data;
	});

	$scope.removeArticle = function(){
		$http.delete('/articles/' + $routeParams.id).then(function(data){
			console.log(data);
		});

		$location.path('/articles');
	};


}])

.controller('ArticleCreateCtrl', ['$scope','$http', '$routeParams', '$location', 
									function($scope, $http, $routeParams, $location){

	$http.get('/categories').then(function(data){
		$scope.categories = data.data;
	});

	$scope.addArticle = function(){
		var data = {
			title: $scope.title,
			body: $scope.body,
			category: $scope.category
		}

		$http.post('/articles', data).then(function(data, status) {
			console.log(status);
		});

		$location.path('/articles');
	};
}])

.controller('ArticleEditCtrl', ['$scope','$http', '$routeParams', '$location', 
									function($scope, $http, $routeParams, $location){
	$http.get('/categories').then(function(data){
		$scope.categories = data.data;
	});

	$http.get('/articles/' + $routeParams.id).then(function(data){
		$scope.article = data.data;
	});

	$scope.updateArticle = function(){
		var data = {
			id: $routeParams.id,
			title: $scope.article.title,
			body: $scope.article.body,
			category: $scope.article.category
		}

		$http.put('/articles', data).then(function(data, status) {
			console.log(status);
		});

		$location.path('/articles');
	};
}]);


;