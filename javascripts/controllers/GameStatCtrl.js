"use strict";

app.controller("GameStatCtrl", function($location, $routeParams, $scope, GameStatService, GameService){

    // This controller is leveraged for trackers to select a stat to track

    $scope.gameStats = [];

    const getGameStats = (gameId) => {
        GameStatService.getGameStatsByGameId($routeParams.gameId).then((results) => {
            $scope.gameStats = results;
        });
    };

    getGameStats();

    $scope.game = {};
    
    const getGame = () => {
        GameService.getGameByGameId($routeParams.gameId).then((results) => {
            $scope.game = results.data;
            console.log('$scope.game', $scope.game);
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
