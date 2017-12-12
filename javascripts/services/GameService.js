"use strict";

app.service("GameService", function($http, $q, FIREBASE_CONFIG) {

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

    const getGameByGameId = (gameId) => {
        return $http.get(`${FIREBASE_CONFIG.databaseURL}/games/${gameId}.json`);
    };

    const getGamesByTeamId = (teamId) => {
        let games = [];
        return $q ((resolve, reject) =>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/games.json?orderBy="teamId"&equalTo="${teamId}"`).then((result) => {
                let fbGames = result.data;
                Object.keys(fbGames).forEach((key) => {
                    fbGames[key].id = key;
                    games.push(fbGames[key]);
                });
                resolve(games);
            }).catch((err) => {
                reject(err);
            });
        });
    };

    const postNewGame = (newGame => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/games.json`, JSON.stringify(newGame));
    });

    return {createNewGameObject, getGameByGameId, getGamesByTeamId, postNewGame};
});