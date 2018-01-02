"use strict";

app.controller("GameStatCtrl", function($location, $routeParams, $scope, GameStatService, GameService){

    $scope.gameStats = [];

    const getGameStats = (gameId) => {
        GameStatService.getGameStatsByGameId($routeParams.gameId).then((results) => {
            console.log('results', results);
            $scope.gameStats = results;
        });
    };

    getGameStats();

    $scope.game = {};
    
    const getGame = () => {
        GameService.getGameByGameId($routeParams.gameId).then((results) => {
            $scope.game = results.data;
        });
    };

    getGame();

    $scope.goToTeamDashboard = (teamId) => {
        $location.url(`/teams/${teamId}/dashboard`);
    };

    $scope.trackNow = (statId) => {
        $location.url(`/games/stat/${statId}/track`);
    };

});
