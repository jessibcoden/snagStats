"use strict";

app.controller("TeamViewCtrl", function($location, $routeParams, $scope, $window, GameService, TeamService){

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
            });
            $scope.games = results;
        }).catch((err) => {
            console.log("error in displayGameSchedule");
            });
    };

    const checkStatus = (game) => {
        const gameSched = new Date(game.date);
        const today = new Date();
        if (gameSched > today) {
            return "upcoming";
        }else if (gameSched < today && game.outcome !== ""){
            return "past";
        }else if (gameSched < today && game.outcome === "") {
            return "pending";
        }
    };

    $scope.finalizeGame = (game) => {
        $location.url(`/games/${game.id}/final`);
    };

    $window.onload = displayGameSchedule($routeParams.teamId); 
    
});