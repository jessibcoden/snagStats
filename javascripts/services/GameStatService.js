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

    return {createNewGameStatObject};

});