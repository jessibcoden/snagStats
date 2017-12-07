'use strict';

app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthService, TrackerService){
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) =>{
      $rootScope.userLoggedIn = true;
      $scope.$apply(() =>{
        $location.path("/teamDashboard");
      });
    }).catch((err) =>{
      console.log("error in authenticateGoogle", err);
    });
  };

  $scope.newCoachAuthenticate = () => {
    AuthService.authenticateGoogle().then((result) =>{
      $rootScope.userLoggedIn = true;
      result.user.isCoach = true;
      result.user.teamId = "";
      const newTracker = TrackerService.createTrackerObject(result.user);
      TrackerService.postNewTracker(newTracker).then((result) => {
        $location.path("/teams/new");
      });
    }).catch((err) =>{
      console.log("error in authenticateGoogle", err);
    });
  };

  $scope.newTrackerAuthenticate = () => {
    AuthService.authenticateGoogle().then((result) =>{
      $rootScope.userLoggedIn = true;
      result.user.isCoach = false;
      result.user.teamId = "";
      const newTracker = TrackerService.createTrackerObject(result.user);
      TrackerService.postNewTracker(newTracker).then((result) => {
        console.log('result', result);
        $location.path(`/trackers/${result.data.name}/edit`);
      });
    }).catch((err) =>{
      console.log("error in authenticateGoogle", err);
    });
  };


});