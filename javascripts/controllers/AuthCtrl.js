'use strict';

app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthService){
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) =>{
      $rootScope.navbar = true;
      $scope.$apply(() =>{
        $location.path("/teamDashboard");
      });
    }).catch((err) =>{
      console.log("error in authenticateGoogle", err);
    });
  };
});