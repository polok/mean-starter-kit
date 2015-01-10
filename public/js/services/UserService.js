angular.module('UserService', []).factory('User', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('api/users');
        },

        create: function (userData) {
            return $http.post('api/users', userData);
        },

        delete: function (userId) {
            return $http.delete('api/users/' + userId);
        }
    };
}]);