"use strict";

app.controller("GameEditCtrl", function($location, $routeParams, $scope, $window, AuthService, GameService, GameStatService, TeamService, TeamStatService){

    $scope.game = {};
    
// When signing up as Coach, user can add game(s):
    $scope.saveAndAddAnotherGame = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
        GameService.postNewGame(newGame).then((result) => {
            let gameId = result.data.name;
            createGameStat(gameId);
            $scope.game.id = false;
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
        console.log('game', game);
        GameService.getGameByGameId($routeParams.gameId).then((result) => {
            let fbGame = result.data;
            if (fbGame === null) {
                $scope.gameID = false;
            } else if (fbGame.teamId){
                $scope.gameID = true;
            }
        console.log('fbGame', fbGame);
        
           $scope.game = fbGame;
           console.log('$scope.game', $scope.game);
        });
    };

   gameHasId($routeParams.gameId);     
   

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


});