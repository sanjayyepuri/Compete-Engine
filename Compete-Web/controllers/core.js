var CompeteEngine = angular.module('CompeteEngine',[]);

function mainController($scope, $http) {
  $scope.formData = {};
  $http.get('http://localhost:8080/api/admin/competitor')
    .success(function(data){
      $scope.competitors = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  $scope.createCompetitor = function() {
    $http.post('http://localhost:8080/api/admin/competitor', $scope.formData)
      .success(function(data){
        $scope.formData = {};
        console.log(data);
        $scope.refresh();
      })
      .error(function(data){
        console.log('Error: '+ data);
      });
  }
  $scope.deleteCompetitor = function(id) {
    $http.delete('http://localhost:8080/api/admin/competitor/' + id)
      .success(function(data){
        console.log(data);
        $scope.refresh();
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
  }

  $scope.refresh = function(){
    $http.get('http://localhost:8080/api/admin/competitor')
      .success(function(data){
        $scope.competitors = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }
}
