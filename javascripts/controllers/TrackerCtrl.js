"use strict";

app.controller("TrackerCtrl", function($location, $routeParams, $scope, GameService, GameStatService){
   
    // This controller is leveraged for active tracking

    const getStat = (statId) => {
        $scope.stat = {};
        GameStatService.getStatByStatId($routeParams.statId).then((results) => {
            $scope.stat = results.data;
            getGame(results.data.gameId);
    
        });
    };
    
    getStat();
        
    const getGame = (gameId) => {
        $scope.game = {};
        GameService.getGameByGameId(gameId).then((results) => {
            $scope.game = results.data;
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