"use strict";

app.controller("TrackerCtrl", function($location, $routeParams, $scope, GameService, GameStatService){
    

    const getStat = (statId) => {
        $scope.stat = {};
        GameStatService.getStatByStatId($routeParams.statId).then((results) => {
            console.log('results', results);
            $scope.stat = results.data;
            console.log('$scope.stat', $scope.stat);
            getGame(results.data.gameId);
    
        });
    };
    
    getStat();
        
    const getGame = (gameId) => {
        $scope.game = {};
        GameService.getGameByGameId(gameId).then((results) => {
            $scope.game = results.data;
            console.log('$scope.game', $scope.game);
        });
    };

    $scope.statPlusOne = (stat) => {
        stat.total = stat.total + 1;
        GameStatService.updateStat($routeParams.statId, stat);

    };

    $scope.statMinusOne = (stat) => {
        stat.total = stat.total - 1;
        GameStatService.updateStat($routeParams.statId, stat);
    };
    
    $scope.goToTeamDashboard = (teamId) => {
        $location.url(`/teams/${teamId}/dashboard`);
    };
    
});