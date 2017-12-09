"use strict";

app.controller("GameEditCtrl", function($location, $routeParams, $scope, AuthService, GameService, TeamService){

// When signing up as Coach, user can add game(s):

    $scope.saveAndAddAnotherGame = (game) => {
        let newGame = GameService.createNewGameObject(game, $routeParams.teamId);
            GameService.postNewGame(newGame).then((result) => {
                $scope.game = {};
            }).catch((err) => {
                console.log("error in saveAndAddAnotherGame", err);
                });
    };

    $scope.saveAndClose = (game) => {
        const user = AuthService.getCurrentUid();
        let newGame = GameService.createNewGameObject(game, user);
        GameService.postNewGame(newGame).then((result) => {
            $location.url("/team/dashboard");
        }).catch((err) => {
        console.log("error in saveAndClose", err);
        });
    };

});