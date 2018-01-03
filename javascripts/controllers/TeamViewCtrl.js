"use strict";

app.controller("TeamViewCtrl", function($location, $routeParams, $scope, $window, GameService, TeamService, AuthService, TrackerService){

    $scope.game = {};

    const getTeam = () => {
        TeamService.getTeamByTeamId($routeParams.teamId).then((results) => {
            $scope.team = results.data;
        });
    };

    getTeam();

    const trackerIsCoach = (tracker) => {
        let trackerId = AuthService.getCurrentUid();
        TrackerService.getSingleTracker(trackerId).then((result) => {
            if (result.isCoach === true) {
                $scope.coachView = true;
            }else {
                $scope.coachView = false;
            }
        });
    };

    trackerIsCoach();

    const displayGameSchedule = (teamId) => {
        GameService.getGamesByTeamId($routeParams.teamId).then((results) => {
            results.forEach((result) => {
                result.status = checkStatus(result);
                result.trackable = checkTrackability(result);
            });
            $scope.games = results;
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

    const checkTrackability = (game) => {
        const gameDate = new Date(game.date);
        const today = new Date();
        today.setHours(0,0,0,0);
        const tonight = new Date();
        tonight.setHours(23,59,59,0);
        if (gameDate >= today && gameDate <= tonight) {
            return "true";
        }else {
            return "false";
        }
    };


    $scope.finalizeGame = (game) => {
        $location.url(`/games/${game.id}/final`);
    };

    $scope.editGame = (game) => {
        $location.url(`/games/${game.id}/edit`);
    };

    $scope.addGame = (game) => {
        $location.url(`/teams/${$routeParams.teamId}/games/new`);
    };

    $scope.viewPastGames = (team) => {
        $location.url(`/teams/${$routeParams.teamId}/games/past`);
    };

    $scope.trackGame = (game) => {
        $location.url(`/games/${game}/stat/select`);
    };


});