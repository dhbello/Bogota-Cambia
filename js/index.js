var myApp = new Framework7();
var $$ = Dom7;
var map;
var view;
var mapLayer;
var glPoint;
var modeManual = false;
var photoURLS = new Array();
var msgtitle = "Dinamica Urbana"
var baseMapUrl = "http://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Base/MapServer";
                  
var _url_photo = 'http://idecabogota.appspot.com/upload_test.jsp';

myApp.addView('.view-main');
gotoMain();

if (isPhoneGapExclusive()) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    $(document).ready(function () {
        init();        
    });
};

function onDeviceReady() {
    $(document).ready(function () {
        init();        
    });
}

function init() {
    if (isPhoneGapExclusive()) {
        if ((navigator.connection.type == 0) || (navigator.connection.type == 'none')) {
            myApp.alert('Esta aplicación requiere conexión a internet.', msgtitle);
            $("#bienvenida-toolbar").hide();
        }
    }
    initMap();
}

function initMap() {

        require([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/TileLayer",
          "esri/layers/GraphicsLayer",
          "esri/symbols/SimpleLineSymbol",
          "dojo/dom",
          "dojo/domReady!"
            ], function(
          Map,
          MapView,
          TileLayer,
          GraphicsLayer,
          SimpleLineSymbol,
          dom
        ) {

                mapLayer = new TileLayer({
                    url: baseMapUrl
                });

                glPoint = new GraphicsLayer();

                map = new Map({
                    layers: [mapLayer, glPoint]
                });

                view = new MapView({
                    container: "map",
                    map: map
                });

                view.on("click", function (evt) {
                    alert(1);
                });
                initLocationGPS();
        });
}

function initMap2() {
    
    map.addLayer(glPoint, 0);        
    updateSize();

    window.document.dojoClick = false;
    dojo.connect(map, "onMouseDown", function (evt) {
        alert(0);
        setLocationPoint(evt);
    });
    dojo.connect(map, "onClick", function (evt) {
        alert(2);
        setLocationPoint(evt);
    });
    dojo.connect(mapLayer, "onClick", function (evt) {
        alert(3);
        setLocationPoint(evt);
    });
    dojo.connect(glPoint, "onClick", function (evt) {
        alert(4);
        setLocationPoint(evt);
    });

    initLocationGPS();
}

function initLocationGPS() {
    try {
 
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentPoint = new esri.geometry.Point(position.coords.longitude, position.coords.latitude, { wkid: 4686 });
            glPoint.clear();
            glPoint.add(new esri.Graphic(currentPoint,
                    new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 15,
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#FF0000"), 2),
                    new dojo.Color("#FF0000")),
                    null, null));
            map.centerAt(currentPoint);
        },
            function (error) {
                
            },
            { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 });
    } catch (err) {
        
    }
}

function updateSize() {
    var the_height = window.innerHeight - $("#header").height() - $("#footer").height() - 10;
    $("#map").height(the_height);
    if (map) {
        map.resize();
        map.reposition();
    };
};

function setLocation() {
    modeManual = true;
    glPoint.clear();
};

function setLocationPoint(evt) {
    if (modeManual) {
        modeManual = false;
        var currentPoint = new esri.geometry.Point(evt.mapPoint.x, evt.mapPoint.y, { wkid: 4686 });
        glPoint.clear();
        glPoint.add(new esri.Graphic(currentPoint,
                new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 15,
                new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#FF0000"), 2),
                new dojo.Color("#FF0000")),
                null, null));
        map.centerAt(currentPoint);
    }
}

function gotoMain(){
    $("#mapDiv").css("left", "-2000px");
    $("#mapDiv").css("position", "absolute");
    $("#map-toolbar").hide();
    $("#map-header").hide();

    $("#reporteDiv").hide();
    $("#reporte-toolbar").hide();

    $("#bienvenidaDiv").show();
    $("#bienvenida-toolbar").show();
}

function gotoMap(){
     $("#mapDiv").css("left", "0px");
     $("#mapDiv").css("position", "");
     $("#map-toolbar").show();
     $("#map-header").show();

     $("#bienvenidaDiv").hide();
     $("#bienvenida-toolbar").hide();
          
     $("#reporteDiv").hide();
     $("#reporte-toolbar").hide();

     updateSize();
};

function gotoReporte() {
    $("#mapDiv").css("left", "-2000px");
    $("#mapDiv").css("position", "absolute");
    $("#map-toolbar").hide();
    $("#map-header").hide();

    $("#bienvenidaDiv").hide();
    $("#bienvenida-toolbar").hide();

    $("#reporteDiv").show();
    $("#reporte-toolbar").show();

    photoURLS = new Array();
};

function addPhotos(sourceType) {
    navigator.camera.getPicture(captureSuccess, captureFail, {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        encodingType: Camera.EncodingType.JPEG
    });
};

function captureSuccess(imageURI) {
    myApp.showPreloader("Cargando foto, por favor, espere.");

    var fail, ft, options, params, win;
    options = new FileUploadOptions();
    options.fileKey = "nva_imagen";
    options.fileName = "imagen_" + new Date().getTime() + ".jpg";
    ft = new FileTransfer();
    ft.upload(imageURI, _url_photo, uploadSuccessFT, uploadFail, options);
}

function captureFail(imageURI) {
    myApp.alert("Error en la captura de la imagen", msgtitle);
}

function uploadSuccessFT(response) {
    myApp.hidePreloader();

    var objResponse;
    objResponse = JSON.parse(response.response);
    if (objResponse.message == null) {
        myApp.alert("Foto cargada exitosamente. (" + objResponse.url + ")", msgtitle);
        photoURLS.push(objResponse.url);
        $('#photolist').append('<img src="' + objResponse.url + '" />');
    } else {
        myApp.alert('No se pudo cargar la foto. Raz&oacute;n: ' + objResponse.message, msgtitle);
    }
};

function uploadFail(error) {
    myApp.hidePreloader();
    myApp.alert("No se pudo cargar la foto, por favor, intente m&aacute;s tarde." + JSON.stringify(error), msgtitle);
};

function clearPhotos() {
    photoURLS = new Array();
    $("#photolist").html("");
};

function submitReport() {
    $.validity.start();
    $("#fnombre").require();
    $("#fcorreo").require();
    $("#ftipo").require();
    $("#fdescripcion").require();
    if ($.validity.end().errors > 0) {
        myApp.alert('Debe completar todos los campos para enviar un reporte.', msgtitle);
        return;
    };

    $.validity.start();
    $("#fcorreo").match("email");
    if ($.validity.end().errors > 0) {
        myApp.alert('Debe ingresar un correo electr&oacute;nico v&aacute;lido.', msgtitle);
        return;
    };

    myApp.showPreloader("Enviando reporte, por favor, espere.");
/*
    $.ajax({
        url: msgURL,
        type: 'GET',
        success: function () {
            */
            myApp.hidePreloader();
            myApp.alert('Reporte enviado exitosamente.', msgtitle);
    /*
        },
        error: function () {
            myApp.hidePreloader();
            myApp.alert('No se pudo enviar el reporte, por favor, intente m&aacute;s tarde.', msgtitle);
        }
    });
*/
    gotoMap();
};

function isPhoneGapExclusive() {
    try {
        return (cordova || PhoneGap || phonegap);
    } catch (err) {
        return false;
    }
}