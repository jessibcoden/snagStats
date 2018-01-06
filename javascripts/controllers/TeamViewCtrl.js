"use strict";

app.controller("TeamViewCtrl", function($location, $rootScope, $routeParams, $scope, $window, GameService, GameStatService, TeamService, TeamStatService, AuthService, TrackerService){

    $rootScope.userHasTeam = true;
    $scope.game = {};
    $scope.gameStats = [];
    $scope.teamStatTypes = [];
    let pastGames = [];

    const getTeam = () => {
        TeamService.getTeamByTeamId($routeParams.teamId).then((results) => {
            $scope.team = results.data;
            getTeamStatTypes(results);
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
            console.log('results', results);
            results.forEach((result) => {
                result.status = checkStatus(result);

                console.log('result.status', result.status);
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

    // $scope.statTypes = [];

    const getTeamStatTypes = (team) => {
        TeamStatService.getTeamStatTypesByTeamId($routeParams.teamId).then((results) => {
            results.forEach((result) => {
                $scope.teamStatTypes.push(result);
                // getStatTypes(result.statTypeId);
            });
            // console.log('$scope.statTypes', $scope.statTypes);
        });
    };

    // const getStatTypes = (teamStatType) => {
    //     TeamStatService.getStatTypesByTeamStatTypeId(teamStatType.statTypeId).then((type) => {
    //         $scope.statTypes.push(type);
    //     });
    // };

    $scope.deleteGame = (game) => {
        GameService.deleteGame(game.id).then((x) => {
            displayGameSchedule($routeParams.teamId);
        });
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
        $location.url(`/games/${$routeParams.teamId}/insights`);
    };

    $scope.trackGame = (game) => {
        $location.url(`/games/${game}/stat/select`);
    };

    // $scope.viewStat = (teamStatTypes) => {
    //     console.log('hitting event');
    //     $location.url(`/team/insights/${teamStatTypes.statTypeId}/stats`);
    // };
});