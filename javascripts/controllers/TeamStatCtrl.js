"use strict";

app.controller("TeamStatCtrl", function($location, $scope, $routeParams, $window, GameService, TeamService, TeamStatService){

    const getTeam = () => {
        TeamService.getTeamByTeamId($routeParams.teamId).then((results) => {
            $scope.team = results.data;
        });
    };

    getTeam();

    $scope.statTypes = [];
    const getStatTypes = () => {
        TeamStatService.getAllStatTypes().then((results) => {
            $scope.statTypes = results;
        });
    };

    getStatTypes();

    $scope.teamStatType = {};

    $scope.addSelectedStatsToTeam = () => {
        let newTeamStatTypes = TeamStatService.createNewTeamStatTypeObject($scope.teamStatType, $routeParams.teamId);
        newTeamStatTypes.forEach((newTeamStatType) => {
            TeamStatService.postTeamStatType(newTeamStatType);
            });
        $location.url(`/teams/${$routeParams.teamId}/games/new`);
    };

    const calculateTeamStats = (teamId) => {
        let gameScores = [];
        let gamesPlayed = [];
        let gamesWon = [];
        let gamesLost = [];
        
        let team = TeamService.getTeamByTeamId($routeParams.teamId);
        GameService.getGamesByTeamId($routeParams.teamId).then((results) => {
            results.forEach((result) => {
                if (result.outcome !== ""){
                    gamesPlayed.push(result);
                    gameScores.push(result.teamScore);
                } if (result.outcome === "Loss") {
                    gamesLost.push(result);
                } if (result.outcome === "Win") {
                    gamesWon.push(result);
                }
            });


            let totalPoints = gameScores.map(Number);
            let sum = totalPoints.reduce((a, b) => a + b, 0);

            let avgPtsPerGame = sum/gamesPlayed.length;


            $scope.team.pointsScored = sum;
            $scope.team.gamesPlayed = gamesPlayed.length;
            $scope.team.gamesLost = gamesLost.length;
            $scope.team.gamesWon = gamesWon.length;
            $scope.team.avgPointsScored = avgPtsPerGame.toFixed(0);

        }).catch((err) => {
            console.log("error in calculateTeamStats in TeamStatCtrl", err);
            });
    };
      
    calculateTeamStats($routeParams.teamId);     

});
