"use strict";

app.service("TeamService", function($http, $q, FIREBASE_CONFIG, AuthService) {

    const createNewTeamObject = (team, user) => {
        return {
            "coachId" : user,
            "name" : team.name,
            "league" : team.league,
            "season" : team.season
        };
    };

    const getTeamByCoachId = (coachUID) => {
        let teams = [];
        return $q ((resolve, reject) =>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/teams.json?orderBy="coachId"&equalTo="${coachUID}"`).then((result) => {
                let fbTeams = result.data;
                Object.keys(fbTeams).forEach((key) => {
                    fbTeams[key].id = key;
                    teams.push(fbTeams[key]);
                });
                resolve(teams);
            }).catch((err) => {
                reject(err);
            });
        });
    };

    const postNewTeam = (newTeam) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/teams.json`, JSON.stringify(newTeam));
    };

    return {createNewTeamObject, getTeamByCoachId, postNewTeam};

});