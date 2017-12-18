"use strict";

app.controller("GameHistoryCtrl", function($scope, $location, $routeParams, AuthService, GameService, TeamService, TrackerService){

    $scope.game = {};
    
        const getTeam = () => {
            TeamService.getTeamByTeamId($routeParams.teamId).then((results) => {
                $scope.team = results.data;
            });
        };
    
        getTeam();
    
        const displayPastGames = (teamId) => {
            GameService.getGamesByTeamId($routeParams.teamId).then((results) => {
                results.forEach((result) => {
                    result.status = checkStatus(result);
                });
                $scope.games = results;
            }).catch((err) => {
                console.log("error in displayPastGames");
                });
        };
    
        displayPastGames($routeParams.teamId); 
    
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
    
        $scope.goToTeamDashboard = (team) => {
            $location.url(`/teams/${$routeParams.teamId}/dashboard`);
        };

});