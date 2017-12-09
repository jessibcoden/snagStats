"use strict";

app.controller("GameEditCtrl", function($location, $routeParams, $scope, AuthService, GameService, TeamService){

// When signing up as Coach, user can add game(s):

    $scope.saveAndAddAnotherGame = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
        console.log('newGame', newGame);
        
        
            GameService.postNewGame(newGame).then((result) => {
                $scope.games = result;
            }).catch((err) => {
                console.log("error in saveAndAddAnotherGame", err);
                });
            $location.url("/games/new");

        $scope.project = null;
    };

    $scope.saveAndClose = (game) => {
        const user = AuthService.getCurrentUid();
        let newGame = GameService.createNewGameObject(game, user);
        GameService.postNewGame(newGame).then((result) => {
            $scope.games = result;
            $location.url("/team/dashboard");
        }).catch((err) => {
        console.log("error in saveAndClose", err);
        });
    };

});