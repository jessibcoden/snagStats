'use strict';

app.controller("NavCtrl", function($location, $rootScope, $scope, $window, AuthService){

// When authenticated, user can Logout via button in navbar
  $scope.logoutUser = () => {
    $window.localStorage.clear();
    AuthService.logout();
    $rootScope.userLoggedIn = false;
    $location.path('/auth');
  };
 
});