"use strict";

app.service("GameStatService", function($http, FIREBASE_CONFIG) {

    const createNewGameStatObject = (teamSelectedStats, gameId) => {
        let selectedStat =  {
            "gameId" : gameId,
            "statTypeId" : teamSelectedStats.statTypeId, 
            "playerId" : "",
            "total" : 0
        };

        $http.post(`${FIREBASE_CONFIG.databaseURL}/stats.json`, JSON.stringify(selectedStat));
    };

    const getGameStatsByGameId = (gameId) => {
        let gameStats = [];
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/stats.json?orderBy="gameId"&equalTo="${gameId}"`).then((result) => {
            let fbgameStats = result.data;
            Object.keys(fbgameStats).forEach((key) => {
                fbgameStats[key].id = key;
                gameStats.push(fbgameStats[key]);
            });
            return gameStats;
        });
    };

    const getStatByStatId = (statId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/stats/${statId}.json`);
    };

    const updateStat = (statId, stat) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/stats/${statId}.json`, JSON.stringify(stat));
    };

    return {createNewGameStatObject, getGameStatsByGameId, getStatByStatId, updateStat};

});