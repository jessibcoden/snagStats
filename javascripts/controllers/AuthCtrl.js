'use strict';

app.controller("AuthCtrl", function ($location, $rootScope, $scope, AuthService, TrackerService) {

  // On Login, if returning user, direct to Team Dashboard:
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) => {

      TrackerService.getSingleTracker(AuthService.getCurrentUid()).then((user) => {
        console.log('user', user);
        let teamId = user.teamId;
        $location.path(`/teams/${teamId}/dashboard`);
      });

    }).catch((err) => {
      console.log("error in authenticateGoogle", err);
    });
  };

  // On Sign up as Coach, direct user to Create a Team:
  $scope.newCoachAuthenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      $rootScope.userLoggedIn = true;
      result.user.isCoach = true;
      result.user.teamId = "";
      result.user.name = result.user.displayName;
      const newTracker = TrackerService.createTrackerObject(result.user);
      TrackerService.postNewTracker(newTracker).then((result) => {
        $location.path("/teams/new");
      });
    }).catch((err) => {
      console.log("error in authenticateGoogle", err);
    });
  };

  // On Sign up as Tracker, direct user to Coach Search:
  $scope.newTrackerAuthenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      $rootScope.userLoggedIn = true;
      result.user.isCoach = false;
      result.user.teamId = "";
      const newTracker = TrackerService.createTrackerObject(result.user);
      TrackerService.postNewTracker(newTracker).then((result) => {
        $location.path(`/trackers/${result.data.name}/edit`);
      });
    }).catch((err) => {
      console.log("error in authenticateGoogle", err);
    });
  };


});