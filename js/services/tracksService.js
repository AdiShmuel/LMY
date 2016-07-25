(function(){
    "use strict";
    function tracksService($http){
        var self = this;
        self.getFirstTracks = function(searchText){
            var page_size = 6;
            return  SC.get('/tracks', { q: searchText, limit: page_size, linked_partitioning: 1 });
        };

        self.getNext = function(nextRef){
            return $http.get(nextRef);
        }

        self.playMusic = function(trackID){
            return SC.stream('/tracks/' + trackID);
        }

    }

    angular.module('lmyApp').service('tracksService', ['$http', tracksService]);
})();
