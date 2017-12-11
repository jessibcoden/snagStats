"use strict";

app.controller("FindCoachCtrl", function($scope, TeamService, TrackerService){


    $scope.findMyCoach = (query) => {
        TrackerService.getTrackerByEmail(query).then((coach) => {
            console.log('coach', coach);
            console.log('coach.teamId', coach.teamId);
            displayTeamByCoach(coach);
        }).catch((err) => {
            console.log("error in findMyCoach", err);
            });
    };

    const displayTeamByCoach = (coach) => {
        $scope.teams = [];
        TeamService.getTeamByCoachId(coach.uid).then((results) => {
                $scope.teams = results;
                console.log('$scope.teams', $scope.teams);
        });
    };

});