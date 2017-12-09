"use strict";

app.service("TrackerService", function($http, $q,  FIREBASE_CONFIG) {

    const createTrackerObject = (user) => {
        return {
            "uid" : user.uid,
            "name" : user.name,
            "email": user.email,
            "isCoach": user.isCoach,
            "teamId": user.teamId
        };
    };

    const getSingleTracker = (uid) => {
        return $q ((resolve, reject) =>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/trackers.json?orderBy="uid"&equalTo="${uid}"`).then((result) => {
                let key = Object.keys(result.data)[0];
                result.data[key].id = key;
                resolve(result.data[key]);
            }).catch((err) => {
                reject(err);
            });
        });
      };

    const postNewTracker = (newTracker) => {
        return $http.post(`${FIREBASE_CONFIG.databaseURL}/trackers.json`, JSON.stringify(newTracker));
    };

    const updateTracker = (tracker, trackerId) => {
        return $http.put(`${FIREBASE_CONFIG.databaseURL}/trackers/${trackerId}.json`, JSON.stringify(tracker));
        
    };

    return {createTrackerObject, getSingleTracker, postNewTracker, updateTracker};
});