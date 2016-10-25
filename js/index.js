var myApp = new Framework7();
var $$ = Dom7;
var map;
var mapLayer;
var glPoint;
var currentPointX = -8244776.525;
var currentPointY = 512845.78;
var modeManual = false;

gotoMain();
myApp.addView('.view-main');


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
    dojo.connect(map, "onClick", function (evt) {
        if (modeManual) {
            modeManual = false;
            currentPointX = evt.mapPoint.x;
            currentPointY = evt.mapPoint.y;
            var currentPoint = new esri.geometry.Point(currentPointX, currentPointY, { wkid: 102100 });
            glPoint.clear();
            glPoint.add(new esri.Graphic(currentPoint,
                    new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 15,
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#FF0000"), 2),
                    new dojo.Color("#FF0000")),
                    null, null));
            map.centerAt(currentPoint);
        }
    });
    mapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
    map.addLayer(mapLayer);
    glPoint = new esri.layers.GraphicsLayer();
    glPoint.setRenderer(new esri.renderer.SimpleRenderer(
            new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([255, 0, 0, 0.75]), 2),
            new dojo.Color([255, 0, 0, 0.75]))));
    map.addLayer(glPoint, 0);
    updateSize();
    initLocationGPS();
}

function initLocationGPS() {
    try {
 
        navigator.geolocation.getCurrentPosition(function (position) {
            var pointWSG84 = esri.geometry.geographicToWebMercator(new esri.geometry.Point(position.coords.longitude, position.coords.latitude, { wkid: 3857 }));
            currentPointX = pointWSG84.x;
            currentPointY = pointWSG84.y;
            var currentPoint = new esri.geometry.Point(currentPointX, currentPointY, { wkid: 102100 });
            glPoint.clear();
            glPoint.add(new esri.Graphic(currentPoint,
                    new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 15,
                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("#FF0000"), 2),
                    new dojo.Color("#FF0000")),
                    null, null));
            map.centerAt(currentPoint);
        },
            function (error) {
                alert(error);
            },
            { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 });
    } catch (err) {
        alert(err);
    }
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

function setLocation() {
    modeManual = true;
    glPoint.clear();
};

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
};

function addPhotos() {
    $("#photolist").append("<img src='icon.png' />");
};

function clearPhotos() {
    $("#photolist").html("");
};

function submitReport() {

};

function isPhoneGapExclusive() {
    try {
        return (cordova || PhoneGap || phonegap);
    } catch (err) {
        return false;
    }
}