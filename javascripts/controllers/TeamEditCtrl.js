"use strict";

app.controller("TeamEditCtrl", function($location, $scope, AuthService, TeamService, TrackerService){

// When signing up as Coach, user must first Create a Team
    $scope.createNewTeam = (team) => {
        const user = AuthService.getCurrentUid();
        let newTeam = TeamService.createNewTeamObject(team, user);
        TeamService.postNewTeam(newTeam).then((result) => {
            TrackerService.getSingleTracker(user).then((tracker) => {
                tracker.teamId = result.data.name;
                const editedTracker = TrackerService.createTrackerObject(tracker);
                TrackerService.updateTracker(editedTracker, tracker.id).then(() => {
                    $location.url(`/teams/${result.data.name}/games/new`);
                });
            });
        }).catch((err) => {
        console.log("error in createNewTeam", err);
        });
    };

});