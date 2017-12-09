"use strict";

app.service("TeamService", function($http, $q, $window, FIREBASE_CONFIG, AuthService) {

    const createNewTeamObject = (team, user) => {
        return {
            "coachId" : user,
            "name" : team.name,
            "league" : team.league,
            "season" : team.season
        };
    };



    const getTeamByCoachId = (coachId) => {
        const coach = AuthService.getCurrentUid();
        return  $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/teams.json?orderBy="coachId"&equalTo="${coach}"`).then((results) => {

                // let fbContacts = results.data;
                // Object.keys(fbContacts).forEach((key) => {
                //     fbContacts[key].id = key; 
                //     if(fbContacts[key].favorite){
                //         contacts.push(fbContacts[key]);
                //     }
                //     resolve(contacts);
                // });
            }).catch((err) => {
                reject("error in getFavorites in getTeamByCoachId in TeamService", err);
            });
        });       
    };


    // const getTeamByCoachId = (coachId) => {
    //     return $q((resolve, reject) => {
    //         $http.get(`${FIREBASE_CONFIG.databaseURL}/teams.json?orderBy="coachId"&equalTo="${coachId}"`).then((result) => {
    //            console.log('result', result); 
    //         });
    //     });
    // };

    const postNewTeam = (newTeam) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/teams.json`, JSON.stringify(newTeam));
    };

    return {createNewTeamObject, getTeamByCoachId, postNewTeam};
});