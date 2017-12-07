"use strict";

app.service("TrackerService", function($http, FIREBASE_CONFIG) {

    const createTrackerObject = (user) => {
        return {
            "uid" : user.uid,
            "name" : user.displayName,
            "email": user.email,
            "isCoach": user.isCoach,
            "teamId": user.teamId
        };
    };

    const postNewTracker = (newTracker) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/trackers.json`, JSON.stringify(newTracker));
    };

    return {createTrackerObject, postNewTracker};
});