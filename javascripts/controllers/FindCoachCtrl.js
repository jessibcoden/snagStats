"use strict";

app.controller("FindCoachCtrl", function($location, $scope, AuthService, TeamService, TrackerService){


    $scope.findMyCoach = (query) => {
        TrackerService.getTrackerByEmail(query).then((coach) => {
            displayTeamByCoach(coach);
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
                $location.url(`/teams/${teamId}/dashboard`);
            });
        });
    };
    

});