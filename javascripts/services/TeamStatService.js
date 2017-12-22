"use strict";

app.service("TeamStatService", function($http, $q, FIREBASE_CONFIG) {

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

    return {createNewTeamStatTypeObject, getAllStatTypes, postTeamStatType};

});



