"use strict";

app.service("TeamService", function($http, FIREBASE_CONFIG) {

    const createNewTeamObject = (team, user) => {
        return {
            "coachId" : user,
            "name" : team.name,
            "league" : team.league,
            "season" : team.season
        };
    };

    const postNewTeam = (newTeam) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/teams.json`, JSON.stringify(newTeam));
    };

    return {createNewTeamObject, postNewTeam};
});