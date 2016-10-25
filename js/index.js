var myApp = new Framework7();
var $$ = Dom7;
var map;
var mapLayer;

myApp.addView('.view-main');
gotoMain();

if (isPhoneGapExclusive()) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    $(document).ready(function () {
        initMap();
    });
};

function onDeviceReady() {
    if (isPhoneGapExclusive()) {
        if (window.device && parseFloat(window.device.version) >= 7.0) {
            $("#header").css("padding-top", "20px");
            $("body").css("margin-top", "20px");
        }
    }
    $(document).ready(function () {
        initMap();
    });
}


function initMap() {
    try {
        dojo.require("esri.map");
        dojo.require("esri.layers.MapImageLayer");
        dojo.require("esri.layers.MapImage");
        dojo.require("esri.graphic");
        dojo.require("esri.geometry.webMercatorUtils");
        dojo.addOnLoad(initMap2);
    } catch (err) {

    };
}

function initMap2() {
    map = new esri.Map("map", {
        minZoom: 10,
        extent: new esri.geometry.Extent({ xmin: -8245377.08, ymin: 512468.58, xmax: -8244175.97, ymax: 513222.98, spatialReference: { wkid: 102100 } }),
        autoresize: false
    });
    mapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
    map.addLayer(mapLayer);
    updateSize();
}

function updateSize() {
    var the_height = window.innerHeight - $("#header").height() - $("#footer").height() - 10;
    if (isPhoneGapExclusive()) {
        if (window.device && parseFloat(window.device.version) >= 7.0) {
            the_height = the_height - 20;
        }
    }
    $("#map").height(the_height);
    if (map) {
        map.resize();
        map.reposition();
    };
};

function gotoMain(){
    $("#mapDiv").css("left", "-2000px");
    $("#mapDiv").css("position", "absolute");
    $("#map-toolbar").hide();

    $("#reporteDiv").hide();
    $("#reporte-toolbar").hide();

    $("#bienvenidaDiv").show();
    $("#bienvenida-toolbar").show();
}

function gotoMap(){
     $("#mapDiv").css("left", "0px");
     $("#mapDiv").css("position", "");
     $("#map-toolbar").show();

     $("#bienvenidaDiv").hide();
     $("#bienvenida-toolbar").hide();
          
     $("#reporteDiv").hide();
     $("#reporte-toolbar").hide();
};

function gotoReporte() {
    $("#mapDiv").css("left", "-2000px");
    $("#mapDiv").css("position", "absolute");
    $("#map-toolbar").hide();

    $("#bienvenidaDiv").hide();
    $("#bienvenida-toolbar").hide();

    $("#reporteDiv").show();
    $("#reporte-toolbar").show();
};

function isPhoneGapExclusive() {
    try {
        return (cordova || PhoneGap || phonegap);
    } catch (err) {
        return false;
    }
}