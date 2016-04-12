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
     


     $scope.showAddForm=function(){
     	clearAllFields();
     	$scope.editFormShow = false;

     	$scope.addFormShow = true;
     	$scope.contactShow = false;
     }

     $scope.editForm = function(c){
     	$scope.editFormShow = true;
     	$scope.id = c.$id;
     	$scope.name = c.name;
     	console.log($scope.id);
     	$scope.email = c.email;
     	if(c.company){$scope.company = c.company;}else{$scope.company = "";}
     	if (c.mobile_phone) {$scope.mobile_phone = c.mobile_phone;}else{$scope.mobile_phone = "";}
     	if(c.work_phone){$scope.work_phone = c.work_phone;} else{$scope.work_phone = "";}
     	if(c.home_phone){$scope.home_phone = c.home_phone;} else{$scope.home_phone = "";}
     	if(c.street_address){$scope.street_address = c.street_address;}else{$scope.street_address = "";}
     	if(c.city){$scope.city = c.city;} else{$scope.city = "";}
     	if(c.state){$scope.state = c.state;} else {$scope.state = "";}
     	if(c.zipcode){$scope.zipcode = c.zipcode;} else{$scope.zipcode = "";}
     }

     $scope.updateContact = function(){
        var id = $scope.id;
        var record = $scope.contacts.$getRecord(id);

        console.log(record);
        record.name = $scope.name;
        record.email = $scope.email;
        record.company = $scope.company;
        record.phones[0] = $scope.home_phone;
        record.phones[1] = $scope.work_phone;
        record.phones[2] = $scope.mobile_phone;
        record.address[0] = $scope.street_address;
        record.address[1] = $scope.city;
        record.address[2] = $scope.state;
        record.address[3] = $scope.zipcode;

         $scope.contacts.$save(record);

         clearAllFields();
          $scope.msg = "Contact Updated Successfully";
          $scope.editFormShow = false;

     }

     $scope.hide = function(){
     	$scope.addFormShow = false;
     	$scope.contactShow = false;
     	$scope.editFormShow = false;
     }

     $scope.showContact = function(c){
     	$scope.cname = c.name;
     	$scope.cemail = c.email;
     	$scope.ccompany = c.company;
     	$scope.cwork_phone = c.phones[1];
     	$scope.cmobile_phone = c.phones[2];
     	$scope.chome_phone = c.phones[0];
     	$scope.cstreet_address = c.address[0];
     	$scope.ccity = c.address[1];
     	$scope.cstate = c.address[2];
     	$scope.czipcode = c.address[3];
     	$scope.contactShow = true;
     }

     $scope.addContact = function(){
     	var name = $scope.name;
     	var email = $scope.email;
     	if($scope.company){var company = $scope.company;} else{var company = "";}
     	if($scope.work_phone){var work_phone = $scope.work_phone;} else{var work_phone = "";}
     	if($scope.mobile_phone){var mobile_phone = $scope.mobile_phone;} else{var mobile_phone = "";}
     	if($scope.home_phone){var home_phone = $scope.home_phone;} else{var home_phone = "";}
     	if($scope.street_address){var street_address = $scope.street_address;} else{var street_address = "";}
     	if($scope.city){var city = $scope.city;} else{var city = "";}
     	if($scope.state){var state = $scope.state;} else{var state = "";}
     	if($scope.zipcode){var zipcode = $scope.zipcode;} else{var zipcode = "";}

     	$scope.contacts.$add({
             name: name,
             email: email,
             company :company,
             phones:[home_phone,work_phone,mobile_phone],
             address:[street_address,city,state,zipcode]




     		}).then(function(ref){
             var id = ref.key();
             console.log(id);
             });


     	 clearAllFields();

     	 $scope.addFormShow  = false;
     	 $scope.msg = "Contact Added Successfully";

     };

    

     function clearAllFields(){
     	$scope.name ="";
     	$scope.email = "";
     	$scope.company = "";
     	$scope.mobile_phone = "";
     	$scope.work_phone = "";
     	$scope.home_phone = "";
     	$scope.street_address = "";
     	$scope.city = "";
     	$scope.zipcode = "";
     	$scope.state = "";
     };

     
   $scope.deleteContact = function(c){
   	$scope.contacts.$remove(c);
   	$scope.msg = "Contact Deleted Successfully"
   }
   
   $scope.close=function(){
    $scope.msg="";
    $scope.closeAlert = false;
   }
}]);