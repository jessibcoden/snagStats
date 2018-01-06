"use strict";

app.service("TeamStatService", function($http, $routeParams, $q, FIREBASE_CONFIG) {

    const createNewTeamStatTypeObject = (teamStatTypes, team) => {
        let selectedTeamStatTypes = [];
        for (let prop in teamStatTypes) {
            let selectedStat =  {
                "teamId" : team,
                "statTypeId" : prop
            };
            selectedTeamStatTypes.push(selectedStat);
        }
        return selectedTeamStatTypes;
    };

    const getTeamStatTypesByTeamId = (teamID) => {
        let teamStatTypes = [];
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/teamStatTypes.json?orderBy="teamId"&equalTo="${teamID}"`).then((result) => {
            let fbTeamStatTypes = result.data;
            Object.keys(fbTeamStatTypes).forEach((key) => {
                fbTeamStatTypes[key].id = key;
                teamStatTypes.push(fbTeamStatTypes[key]);
            });
            return teamStatTypes;
        });
    };


    const getStatTypesByTeamStatTypeId = (teamStatTypeId) => {
        let statTypes = [];
        return $q ((resolve, reject) =>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/statTypes.json?orderBy="id"&equalTo="${teamStatTypeId}"`).then((result) => {
                console.log('result', result);
                let fbStatTypes = result.data;
                Object.keys(fbStatTypes).forEach((key) => {
                    fbStatTypes[key].id = key;
                    statTypes.push(fbStatTypes[key]);
                });
                resolve(statTypes);
            }).catch((err) => {
                reject(err);
            });
        });
    };

    const getAllStatTypes = () => {
        let statTypes = [];
        return $q ((resolve, reject) =>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/statTypes.json`).then((result) => {
                let fbStatTypes = result.data;
                Object.keys(fbStatTypes).forEach((key) => {
                    fbStatTypes[key].id = key;
                    statTypes.push(fbStatTypes[key]);
                });
                resolve(statTypes);
            }).catch((err) => {
                reject(err);
            });
        });
    };

    const postTeamStatType = (newGame => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/teamStatTypes.json`, JSON.stringify(newGame));
    });

    return {createNewTeamStatTypeObject, getAllStatTypes, getTeamStatTypesByTeamId, getStatTypesByTeamStatTypeId, postTeamStatType};
});  
