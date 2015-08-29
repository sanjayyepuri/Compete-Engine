var CompeteEngine = angular.module('CompeteEngine',[]);

function mainController($scope, $http) {
  $scope.formData = {};
  $http.get('/api/admin/competitor')
    .success(function(data){
      $scope.competitors = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  $scope.createCompetitor = function() {
    $http.post('/api/admin/competitor', $scope.formData)
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
    $http.delete('/api/admin/competitor/' + id)
      .success(function(data){
        console.log(data);
        $scope.refresh();
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })
  }

  $scope.refresh = function(){
    $http.get('/api/admin/competitor')
      .success(function(data){
        $scope.competitors = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }
}
