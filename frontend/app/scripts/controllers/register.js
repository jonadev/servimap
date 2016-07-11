'use strict';

angular.module('dutymap')
    .controller('RegisterCtrl', ['$scope', '$http', 'UserResources', 'NotificationService', '$location', 'WorkResources',
    function ($scope, $http, UserResources, NotificationService, $location, WorkResources) {

        $scope.onlyNumbers= /^\d+$/;
        $scope.document=/^(\d{8})$/;
        $scope.onlyChar=/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        $scope.charAndNumbers=/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
        $scope.passwordRegex=/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        $scope.provider={};
       $scope.work = {};

        $scope.userRegister=false;
        $scope.userProveedor=false;
        $scope.createWork = false;

        $scope.saveUser = function(){
            var user = {'name':$scope.provider.name,
                        'surname': $scope.provider.surname,
                        'username': $scope.provider.username,
                        'email': $scope.provider.email,
                        'phone': $scope.provider.telephone,
                        'street': $scope.provider.street,
                        'number': $scope.provider.number,
                        'idDistrict': $scope.provider.district.id,
                        'password': $scope.provider.password,
                        'type': $scope.userRegister ? 'comprador' : 'proveedor'};

            UserResources.save(user, function(response){
                if(user.type == 'proveedor') {
                  NotificationService.success('Se ha registrado correctamente. Ingrese los datos de su servicio.');
                  $scope.work.idUser = response.idUser;
                  $scope.createWork = true;
                }else{
                NotificationService.success('Se ha registrado correctamente. Inicie sesión.');
                  $location.url('/login')
                }
            }, function(error){
                NotificationService.error(error);
            });
        };

        $scope.zonas = [{id:1 ,name: '20 de Junio'},
          {id:2 ,name: 'Aldo Bonzi'},
          {id:3 ,name: 'Ciudad Evita'},
          {id:4 ,name: 'González Catán'},
          {id:5 ,name: 'Gregorio de Laferrere'},
          {id:6 ,name: 'Isidro Casanova'},
          {id:7 ,name: 'La Tablada'},
          {id:8 ,name: 'Lomas del Mirador'},
          {id:9 ,name: 'Rafael Castillo'},
          {id:10 ,name: 'Ramos Mejía'},
          {id:11 ,name: 'San Justo'},
          {id:12 ,name: 'Tapiales'},
          {id:13 ,name: 'Villa Luzuriaga'},
          {id:14 ,name: 'Villa Madero'},
          {id:15 ,name: 'Virrey del Pino'}];


        $scope.categories = [
          {id: 1, name: 'Hogar'},
          {id: 2, name: 'Educación'},
          {id: 3, name: 'Salud'},
          {id: 4, name: 'Estética'},
          {id: 5, name: 'Entretenimiento'},
          {id: 6, name: 'Profesional'},
          {id: 7, name: 'Técnico'},
          {id: 8, name: 'Automotriz'},
          {id: 9, name: 'Otros'}
        ];

        $scope.userType = function(type) {
            $scope.filter = type;
        };

        $('#pass, #cpass').on('keyup', function () {
            if ($('#pass').val() == $('#cpass').val()) {
                $scope.providerForm.passwordConfirmation.$setValidity('noMatchea', true);
            }
            else
                $scope.providerForm.passwordConfirmation.$setValidity('noMatchea', false);
        });

        $scope.tipoUsuario=function(){
            $scope.userRegister=true;
            $scope.userProveedor=false;
        };

        $scope.tipoProveedor=function(){
            $scope.userRegister=false;
            $scope.userProveedor=true;
        };

        $scope.back = function(){
          $scope.userRegister=false;
          $scope.userProveedor=false;
        }

        $scope.saveWork = function(){
            var newWork = {
              'name':$scope.work.name,
              'idUser': $scope.work.idUser,
              'description': $scope.work.description,
              'idCategory': $scope.work.category.id,
              'price': $scope.work.price,
              'street': $scope.work.street,
              'number': $scope.work.number,
              'idDistrict': $scope.work.district.id};

            WorkResources.save(newWork, function(){
              NotificationService.success('Ha creado un servicio correctamente.');
              $location.url('/login')
            }, function(error){
              NotificationService.error(error);
            });
        }
    }]);


