"use strict";

app.controller("GameEditCtrl", function($location, $routeParams, $scope, AuthService, GameService, TeamService){


// When signing up as Coach, user can add game(s):
    $scope.saveAndAddAnotherGame = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
            GameService.postNewGame(newGame).then((result) => {
                console.log('result', result);
                $scope.game = {};
            }).catch((err) => {
                console.log("error in saveAndAddAnotherGame", err);
                });
    };

    $scope.saveAndClose = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
        GameService.postNewGame(newGame).then((result) => {
            $location.url(`/teams/${$routeParams.teamId}/dashboard`);
        }).catch((err) => {
        console.log("error in saveAndClose", err);
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

});