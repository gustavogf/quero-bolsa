var app = angular.module('app',['angular-iosui']);

app.controller('AppCtrl', function ($scope, $http) {

    $scope.mapRadius = 10;

    // if HTML DOM Element that contains the map is found...
    if (document.getElementById('map-canvas')){

        // Coordinates to center the map
        var myLatlng = new google.maps.LatLng(-23.220697,-45.891254);

        // Other options for the map, pretty much selfexplanatory
        var mapOptions = {
            zoom: 8,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Attach a map to the DOM Element, with the defined settings
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        var marker=new google.maps.Marker({
            position:myLatlng,
        });

        marker.setMap(map);

        var circle = new google.maps.Circle({
            center:myLatlng,
            radius:10000,
            strokeColor:"#0000FF",
            strokeOpacity:0.8,
            strokeWeight:2,
            fillColor:"#0000FF",
            fillOpacity:0.1,
            map: map
        });

    }

    $scope.changeRadius = function () {
        circle.setRadius($scope.mapRadius*1000);
    };

    $scope.cursos = [];

    $http.get('api/cursos.json').success(function (data) {
        $scope.cursos = data.cursos;
    });

    $scope.sortKey = 'nome';
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };

    $scope.filter = {};

    $scope.limparCampos = function () {
        $scope.filter.nome = "";
        $scope.filter.id = "";
        $scope.filter.cidade = "";
        $scope.select = {
            'universidade':'Escolha uma universidade',
            'modalidade':'Escolha a modalidade',
            'turno':'Escolha o turno',
            'grau':'Escolha o grau'
        };
    };
    
    $scope.limparCampos();

    $scope.selectUniversidade = function () {
        if($scope.select.universidade != 'Escolha uma universidade'){
            $scope.filter.universidade = $scope.select.universidade;
        }
        else{
            $scope.filter.universidade = "";
        }
    };

    $scope.selectModalidade = function () {
        if($scope.select.modalidade != 'Escolha a modalidade'){
            $scope.filter.modalidade = $scope.select.modalidade;
        }
        else{
            $scope.filter.modalidade = "";
        }
    };

    $scope.selectTurno = function () {
        if($scope.select.turno != 'Escolha o turno'){
            $scope.filter.turno= $scope.select.turno;
        }
        else{
            $scope.filter.turno = "";
        }
    };

    $scope.selectGrau = function () {
        if($scope.select.grau != 'Escolha o grau'){
            $scope.filter.grau= $scope.select.grau;
        }
        else{
            $scope.filter.grau = "";
        }
    };


});
