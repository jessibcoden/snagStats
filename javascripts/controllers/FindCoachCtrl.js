"use strict";

app.controller("FindCoachCtrl", function($location, $rootScope, $scope, AuthService, TeamService, TrackerService){

    $scope.coach = null;
    
    $scope.findMyCoach = (query) => {
        TrackerService.getTrackerByEmail(query).then((coach) => {
            if (coach === undefined) {
                $scope.coach = false;
            }else {
            displayTeamByCoach(coach);
            }
        }).catch((err) => {
            console.log("error in findMyCoach", err);
            });
    };

    const displayTeamByCoach = (coach) => {
        $scope.teams = [];
        TeamService.getTeamByCoachId(coach.uid).then((results) => {
            $scope.teams = results;
        });
    };

    $scope.selectTeam = (teamId) => {
        const user = AuthService.getCurrentUid();
        TrackerService.getSingleTracker(user).then((tracker) => {
            tracker.teamId = teamId;
            const editedTracker = TrackerService.createTrackerObject(tracker);
            TrackerService.updateTracker(editedTracker, tracker.id).then(() => {
                $rootScope.userHasTeam = true;
                $location.url(`/teams/${teamId}/dashboard`);
            });
        });
    };

});