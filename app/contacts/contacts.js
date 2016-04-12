angular.module('mycontacts.contacts',['ngRoute','firebase'])

.config(['$routeProvider',function($routeProvider){
  $routeProvider.
     when('/contacts',{
       templateUrl:'contacts/contacts.html',
       controller:'ContactsCtrl'

     });
}])

.controller('ContactsCtrl',['$scope','$http','$firebaseArray',function($scope,$http,$firebaseArray){
     
     var ref = new Firebase('https://sricontacts.firebaseio.com/contacts');

     $scope.contacts = $firebaseArray(ref);

     


}]);