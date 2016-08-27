var app = angular.module('app',['angular-iosui']);

app.controller('AppCtrl', function ($scope, $http) {

    $scope.mapRadius = 10;
    

    // CRIANDO MAPA, MARCADOR E CÍRCULO
    if (document.getElementById('map-canvas')){
        var myLatlng = new google.maps.LatLng(-23.220697,-45.891254);
        var mapOptions = {
            zoom: 8,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
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

    // FUNÇÃO PARA ALTERAR O RAIO DO CÍRCULO CHAMADA PELO SLIDER
    $scope.changeRadius = function () {
        circle.setRadius($scope.mapRadius*1000);
    };

    $scope.cursos = [];

    //CHAMADA AJAX PARA ARQUIVO JSON COM LISTA DE CURSOS
    $http.get('api/cursos.json').success(function (data) {
        $scope.cursos = data.cursos;
    });

    //FUNÇÃO PARA ORDENAÇÃO DE COLUNAS NA TABELA
    $scope.sortKey = 'nome';
    $scope.sort = function(keyname){
        $scope.sortKey = keyname; 
        $scope.reverse = !$scope.reverse;
    };

    $scope.filter = {};

    // FUNÇÃO PARA LIMPAR TODOS CAMPOS DO FORMULÁRIO
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


    // FUNÇÕES PARA TRATAR A SELEÇÃO DE UNIVERSIDADE, MODALIDADE, TURNO E GRAU PARA FILTRAR A TABELA

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
