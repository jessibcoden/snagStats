"use strict";

app.controller("StatsViewCtrl", function($location, $routeParams, $scope, GameService, GameStatService, TeamService){

    $scope.pastGames = [];
    $scope.gameStats = [];
    
    const getTeam = () => {
        TeamService.getTeamByTeamId($routeParams.teamId).then((results) => {
            $scope.team = results.data;
        });
    };
    
    getTeam();

    const displayGameSchedule = (teamId) => {
        GameService.getGamesByTeamId($routeParams.teamId).then((results) => {
            results.forEach((result) => {
                result.status = checkStatus(result);
                if (result.status === "past") {
                    $scope.pastGames.push(result);
                }
            });
            $scope.pastGames.forEach((game) => {
                GameStatService.getGameStatsByGameId(game.id).then((stats) => {
                    stats.forEach((stat) => {
                        $scope.gameStats.push(stat);
                    });
                });
            });
        }).catch((err) => {
            console.log("error in displayGameSchedule");
            });
    };

    displayGameSchedule($routeParams.teamId); 

    const checkStatus = (game) => {
        const gameSched = new Date(game.date);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (gameSched >= today) {
            return "upcoming";
        }else if (gameSched < today && game.outcome !== ""){
            return "past";
        }else if (gameSched < today && game.outcome === "") {
            return "pending";
        }
    };

    $scope.goToTeamDashboard = (teamId) => {
        $location.url(`/teams/${$routeParams.teamId}/dashboard`);
    };

});
