"use strict";

app.service("GameService", function($http, FIREBASE_CONFIG) {

    const createNewGameObject = (game, teamId) => {
        return {
            "date" : game.date,
            "location" : game.location,
            "opposition" : game.opposition,
            "oppositionScore" : "",
            "outcome" : "",
            "teamId" : teamId,
            "teamScore" : "",
            "time" : game.time
        };
    };

    const postNewGame = (newGame => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/games.json`, JSON.stringify(newGame));
    });

    return {createNewGameObject, postNewGame};
});