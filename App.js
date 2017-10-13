var app = angular.module("rio", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/error");

    $stateProvider.state('error', {
        url: '/error',
        templateUrl: 'error.html'
    })
    .state('atracoes', {
        url: '/atracoes',
        templateUrl: 'pages/attractions.html'
    })
    .state('banheiros', {
        url: '/banheiros',
        templateUrl: 'pages/bathrooms.html'
    })
    .state('praias', {
        url: '/praias',
        templateUrl: 'pages/beachs.html'
    })
    .state('bombeiros', {
        url: '/bombeiros',
        templateUrl: 'pages/firefighters.html'
    })
    .state('games', {
        url: '/games',
        templateUrl: 'pages/games.html'
    })
    .state('hospital', {
        url: '/hospital',
        templateUrl: 'pages/health.html'
    })
    .state('hotel', {
        url: '/hotel',
        templateUrl: 'pages/hotel.html'
    })
    .state('delegacias', {
        url: '/delegacias',
        templateUrl: 'pages/police.html'
    })
    .state('restaurantes', {
        url: '/restaurantes',
        templateUrl: 'pages/restaurants.html'
    })
    .state('escolas', {
        url: '/escolas',
        templateUrl: 'pages/schools.html'
    })

});

app.controller("indexCtrl", function ($scope, $http) {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back').fadeIn();
        } else {
            $('#back').fadeOut();
        }
    });

    $('#back').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $http.get("turista-rio/banheiros.js").then(function (response) {
        $scope.banheiros = response.data;
    });
    $http.get("turista-rio/bombeiros.js").then(function (response) {
        $scope.bombeiros = response.data;
    });
    $http.get("turista-rio/delegacias.js").then(function (response) {
        $scope.delegacias = response.data;
    });
    $http.get("turista-rio/escolas.js").then(function (response) {
        $scope.escolas = response.data;
    });
    $http.get("turista-rio/hoteis.js").then(function (response) {
        $scope.hoteis = response.data;
    });
    $http.get("turista-rio/jogos-olimpicos.js").then(function (response) {
        $scope.jogosOlimpicos = response.data;
    });
    $http.get("turista-rio/pontos-turisticos.js").then(function (response) {
        $scope.pontos = response.data;
    });
    $http.get("turista-rio/postos-saude.js").then(function (response) {
        $scope.postos = response.data;
    });
    $http.get("turista-rio/praias.js").then(function (response) {
        $scope.praias = response.data;
    });
    $http.get("turista-rio/restaurantes.js").then(function (response) {
        $scope.restaurantes = response.data;
    });

    //mapa na tela

    var opcMapa = {
        zoom: 15,
        center: new google.maps.LatLng(-22.907819,-43.1770271),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), opcMapa);

    //marcadores no mapa

    $scope.propMapa = function (lat, lng) {
        return {
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    $scope.city = function (lat, lng) {
        return new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    }
    $scope.addMarcadorListener = function (mapa, marcador, iw) {
        google.maps.event.addListener(marcador, 'mousedown', function () {
            iw.open(mapa, marcador);
        });
        google.maps.event.addListener(marcador, 'mouseup', function () {
            iw.close(mapa, marcador);
        });
    }
    $scope.infoWindow = function (marcador) {
        var w = new google.maps.InfoWindow({
            content: marcador.Name
        });
        return w;
    }


    $scope.mapa = function (id, endereco) {
        var gm = new google.maps.Map(document.getElementById(id),
            $scope.propMapa(endereco.geoResult.point.lat, endereco.geoResult.point.lng));
        return gm;
    }

    $scope.marcador = function (endereco) {
        var m = new google.maps.Marker({
            Name: endereco.name,
            position: $scope.city(endereco.geoResult.point.lat, endereco.geoResult.point.lng)
        });
        return m;
    }

    $scope.criaMapa = function (id, endereco) {
        console.log(endereco);

        var mapa = $scope.mapa(id, endereco);
        var marcador = $scope.marcador(endereco);
        marcador.setMap(mapa);
        var iw = $scope.infoWindow(marcador);
        $scope.addMarcadorListener(mapa, marcador, iw);
    }

});


