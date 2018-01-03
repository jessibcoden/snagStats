"use strict";

app.controller("GameEditCtrl", function($location, $routeParams, $scope, $window, AuthService, GameService, GameStatService, TeamService, TeamStatService){

    $scope.game = {};
    
// When signing up as Coach, user can add game(s):
    $scope.saveAndAddAnotherGame = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
        GameService.postNewGame(newGame).then((result) => {
            let gameId = result.data.name;
            createGameStat(gameId);
            $scope.game = {};
        }).catch((err) => {
            console.log("error in saveAndAddAnotherGame", err);
            });
    };

    $scope.saveAndClose = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
        GameService.postNewGame(newGame).then((result) => {
            let gameId = result.data.name;
            createGameStat(gameId);
            $location.url(`/teams/${$routeParams.teamId}/dashboard`);
        }).catch((err) => {
        console.log("error in saveAndClose", err);
        });
    };

    const createGameStat = (game) => {
        TeamStatService.getTeamStatTypesByTeamId($routeParams.teamId).then(teamStats => {
            teamStats.forEach(stat => {
                GameStatService.createNewGameStatObject(stat, game);
            });
        });
    };

    $scope.resolveGame = (game) => {
        GameService.getGameByGameId($routeParams.gameId).then((result) => {
            result.data.outcome = game.outcome;
            result.data.teamScore = game.teamScore;
            result.data.oppositionScore = game.oppositionScore;
            GameService.updateGame(result.data, $routeParams.gameId).then(() => {
                $location.url(`/teams/${result.data.teamId}/dashboard`);
            });
        });
    };

    const gameHasId = (game) => {
        GameService.getGameByGameId($routeParams.gameId).then((result) => {
            let fbGame = result.data;
            if (fbGame === null) {
                $scope.gameID = false;
            } else if (fbGame.teamId){
                $scope.gameID = true;
            }
           $scope.game = fbGame;
        });
    };

    $scope.deleteGame = (game) => {
        GameService.getGameByGameId($routeParams.gameId).then((result) => {
            GameService.deleteGame($routeParams.gameId).then(() => {
                $location.url(`/teams/${result.data.teamId}/dashboard`);
            });
        });
    };

    $scope.editGame = (game) => {
        GameService.getGameByGameId($routeParams.gameId).then((result) => {
            result.data.opposition = game.opposition;
            result.data.location = game.location;
            result.data.date = game.date;
            result.data.time = game.time;
            GameService.updateGame(result.data, $routeParams.gameId).then(() => {
                $location.url(`/teams/${result.data.teamId}/dashboard`);
            });
        });
    };

    $window.onload = gameHasId($routeParams.gameId);     

});