var myApp = new Framework7({
    fastClicks: false
});
var $$ = Dom7;

var map;
var popup;
var popup_init = false;
var mapLayer;
var placaLayer;
var loteLayer;
var glPoint;

var mapDetalle;
var mapLayer2;
var loteLayer2;
var glPoint2;
var renderer;

var alturasLayer;
var usosLayer;

var view;
var previousScreen;

var currentPointId;
var currentLote;
var currentLoteId;
var currentLoteX;
var currentLoteY;

var marker;
var market2;
var currentPoint;
var currentUser;
var currentToken;
var cacheReportes = {};

var photoURLS = new Array();
var msgtitle = "Bogot&aacute; Cambia";
var cambioStr = "Cambio de Uso"

var baseMapUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/mapa_base_4686/MapServer";
var baseMapUrl2 = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/mapa_hibrido_4686/MapServer";

var placaLayerUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Referencia/MapServer/34";
var loteLayerUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Referencia/MapServer/38";
var alturasLayerUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/estadisticas/Altura/MapServer/6";
var usosLayerUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/estadisticas/Uso/MapServer/6";

var queryConstruccionUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Referencia/MapServer/39";
var queryUsoUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Referencia/MapServer/52";
var queryPlacaUrl = "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Referencia/MapServer/34";

var _url = 'http://13.92.62.227:8080/bogotaCambia';

gotoMain();

if (isPhoneGapExclusive()) {
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener('resize', updateSize);
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
    currentUser = window.localStorage.getItem("user");
    currentToken = window.localStorage.getItem("token");
    if (isPhoneGapExclusive()) {
        if ((navigator.connection.type == 0) || (navigator.connection.type == 'none')) {
            sendAlert('Esta aplicaci&oacute;n requiere conexi&oacute;n a internet.');
            $("#bienvenida-toolbar").hide();
        }
    }
    initMap();
}

function initMap() {
    try {
        require(
            [
                "esri/map",
                "esri/basemaps",
                "esri/layers/ArcGISTiledMapServiceLayer",
                "esri/layers/ArcGISDynamicMapServiceLayer",
                "esri/layers/FeatureLayer",
                "esri/layers/GraphicsLayer",
                "esri/symbols/PictureMarkerSymbol",
                "esri/geometry/geometryEngine",
                "esri/geometry/Point",
                "esri/geometry/Polyline",
                "esri/graphic",
                "esri/geometry/scaleUtils",
                "esri/geometry/webMercatorUtils",
                "esri/Color",
                "esri/renderers/SimpleRenderer",
                "esri/renderers/UniqueValueRenderer",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/symbols/TextSymbol",
                "esri/symbols/Font",
                "esri/InfoTemplate",
                "esri/dijit/PopupMobile",
                "dojo/dom-construct",
                "esri/tasks/query",
                "esri/tasks/QueryTask",
                "esri/dijit/Legend"
            ], function (
                __Map,
                __esriBasemaps,
                __ArcGISTiledMapServiceLayer,
                __ArcGISDynamicMapServiceLayer,
                __FeatureLayer,
                __GraphicsLayer,
                __PictureMarkerSymbol,
                __geometryEngine,
                __Point,
                __Polyline,
                __Graphic,
                __scaleUtils,
                __webMercatorUtils,
                __Color,
                __SimpleRenderer,
                __UniqueValueRenderer,
                __SimpleMarkerSymbol,
                __SimpleLineSymbol,
                __SimpleFillSymbol, 
                __TextSymbol,
                __Font,
                __InfoTemplate,
                __PopupMobile,
                __dom_construct,
                __query,
                __QueryTask,
                __Legend) {
                _Map = __Map;
                _esriBasemaps = __esriBasemaps;
                _ArcGISTiledMapServiceLayer = __ArcGISTiledMapServiceLayer;
                _ArcGISDynamicMapServiceLayer = __ArcGISDynamicMapServiceLayer;
                _FeatureLayer = __FeatureLayer;
                _GraphicsLayer = __GraphicsLayer;
                _PictureMarkerSymbol = __PictureMarkerSymbol;
                _geometryEngine = __geometryEngine;
                _Point = __Point;
                _Polyline = __Polyline;
                _Graphic = __Graphic;
                _scaleUtils = __scaleUtils;
                _webMercatorUtils = __webMercatorUtils;
                _Color = __Color;
                _SimpleRenderer = __SimpleRenderer;
                _UniqueValueRenderer = __UniqueValueRenderer;
                _SimpleMarkerSymbol = __SimpleMarkerSymbol;
                _SimpleLineSymbol = __SimpleLineSymbol;
                _SimpleFillSymbol = __SimpleFillSymbol;
                _TextSymbol = __TextSymbol;
                _Font = __Font;
                _InfoTemplate = __InfoTemplate;
                _PopupMobile = __PopupMobile;
                _dom_construct = __dom_construct;
                _query = __query;
                _QueryTask = __QueryTask;
                _Legend = __Legend;
                initMap2();
            });
    } catch (err) {

    };
}

function initMap2() {
    _esriBasemaps.referencia = {
        baseMapLayers: [
            {url: baseMapUrl}
        ],
        title: "referencia"
    };

    _esriBasemaps.hibrido = {
        baseMapLayers: [
            {url: baseMapUrl2}
        ],
        title: "hibrido"
    };


    popup = new _PopupMobile(null, _dom_construct.create("div"));
    popup.on("show", function () {
        if (popup_init == false) {
            popup_init = true;
            $(".arrow").click(function () {
                if (popup.getSelectedFeature() != null) {
                    currentLote = popup.getSelectedFeature().attributes["LOTCODIGO"];                    
                    currentLoteId = popup.getSelectedFeature().attributes["OBJECTID"];
                    currentLoteX = popup.getSelectedFeature().geometry.getCentroid().x;
                    currentLoteY = popup.getSelectedFeature().geometry.getCentroid().y;
                    currentPointId = cacheReportes[currentLote];
                    if (currentPointId == null) {
                        gotoReporte(false);
                    } else {
                        gotoReporte(true);
                    }
                }
            });
        }
    });
    map = new _Map("map", {
        zoom: 9,
        minZoom: 7,
        basemap: "referencia",
        spatialReference: { wkid: 4686  },
        center: new _Point(-74.0817810139777, 4.62585823130184, { wkid: 4686 }),
        autoresize: false,
        slider: false,
        showLabels: true,
        infoWindow: popup
    });
    mapDetalle = new _Map("mapDetalle", {
        zoom: 9,
        minZoom: 7,
        basemap: "referencia",
        spatialReference: { wkid: 4686 },
        center: new _Point(-74.0817810139777, 4.62585823130184, { wkid: 4686 }),
        autoresize: false,
        slider: false,
        showLabels: true
    });

    map.on("extent-change", function (evt) {
        updatePoints();
    });

    marker = new _PictureMarkerSymbol();
    marker.setHeight(44);
    marker.setWidth(28);
    marker.setUrl("css/Location_Icon.png");
    marker2 = new _PictureMarkerSymbol();
    marker2.setHeight(44);
    marker2.setWidth(28);
    marker2.setUrl("css/Location_Icon_2.png");

    var defaultSymbol = new _SimpleFillSymbol(_SimpleFillSymbol.STYLE_SOLID,
        new _SimpleLineSymbol(_SimpleLineSymbol.STYLE_SOLID,
        new _Color([0, 173, 238]), 2), new _Color([0, 173, 238, 0])
        );


    loteLayer2 = new _FeatureLayer(loteLayerUrl, {
        mode: _FeatureLayer.MODE_AUTO,
        outFields: ["*"],
        symbol: defaultSymbol
    });
    renderer = new _UniqueValueRenderer(defaultSymbol, "LOTCODIGO");
    loteLayer2.setRenderer(renderer);

    glPoint2 = new _GraphicsLayer();
    mapDetalle.addLayers([loteLayer2, glPoint2]);

    var infoTemplate = new _InfoTemplate();
    infoTemplate.setTitle(getTextContent);

    loteLayer = new _FeatureLayer(loteLayerUrl, {
        mode: _FeatureLayer.MODE_AUTO,
        outFields: ["*"],
        symbol: defaultSymbol,
        infoTemplate: infoTemplate
    });
    loteLayer.setRenderer(renderer);

    alturasLayer = new _FeatureLayer(alturasLayerUrl, {
        id: "Alturas",
        mode: _FeatureLayer.MODE_AUTO,
        outFields: ["*"],
        opacity: 0
    });
    usosLayer = new _FeatureLayer(usosLayerUrl, {
        id: "Usos",
        mode: _FeatureLayer.MODE_AUTO,
        outFields: ["*"],
        opacity: 0
    });

    placaLayer = new _FeatureLayer(placaLayerUrl, {
        mode: _FeatureLayer.MODE_AUTO,
        outFields: ["PDoTexto"]
    });
    placaLayer2 = new _ArcGISDynamicMapServiceLayer("http://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Referencia/MapServer/");

    glPoint = new _GraphicsLayer();
    //map.addLayers([placaLayer, placaLayer2, loteLayer, glPoint]);
    map.addLayers([placaLayer, alturasLayer, usosLayer, loteLayer, glPoint]);

    updateSize();
    initLocationGPS();
}

function getTextContent(graphic) {
    return "Lote: " + graphic.attributes["LOTCODIGO"];
}

function initLocationGPS() {
    myApp.addNotification({
        message: 'Obteniendo ubicaci&oacute;n por GPS',
        hold: 1000
    });
    try {

        navigator.geolocation.getCurrentPosition(function (position) {
            currentPointX = position.coords.longitude;
            currentPointY = position.coords.latitude;
            currentPoint = new _Point(currentPointX, currentPointY, { wkid: 4686 });
            glPoint.clear();
            glPoint.add(new _Graphic(currentPoint, marker2), null, null);
            map.centerAt(currentPoint);
        },
            function (error) {

            },
            { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 });
    } catch (err) {

    }
}

function updateSize() {
    var the_height = window.innerHeight - $("#header").height();
    $("#map").height(the_height);
    if (map) {
        map.resize();
        map.reposition();
    };
};

function gotoSettings() {
    myApp.actions([[
         {
             text: 'Mapa Base',
             label: true
         },
        {
            text: 'Referencia',
            onClick: function () {
                map.setBasemap("referencia");
                mapDetalle.setBasemap("referencia");
            }
        },
        {
            text: 'Hibrido',
            onClick: function () {
                map.setBasemap("hibrido");
                mapDetalle.setBasemap("hibrido");
            }
        }
    ], [
        {
            text: 'Informacion adicional',
            label: true
        },
        {
            text: 'Alturas',
            onClick: function () {
                alturasLayer.setOpacity(0.5);
                usosLayer.setOpacity(0);
                $("#alturaTable").show();
                $("#usosTable").hide();
                $("#reporteTable").hide();
            }
        },
        {
            text: 'Usos',
            onClick: function () {
                alturasLayer.setOpacity(0);
                usosLayer.setOpacity(0.5);
                $("#alturaTable").hide();
                $("#usosTable").show();
                $("#reporteTable").hide();
            }
        },
        {
            text: 'No mostrar',
            onClick: function () {
                alturasLayer.setOpacity(0);
                usosLayer.setOpacity(0);
                $("#alturaTable").hide();
                $("#usosTable").hide();
                $("#reporteTable").show();
            }
        }
    ], [
        {
            text: 'Cerrar',
            color: 'red'
        }
    ]]);
};

function hideAll() {
    $("#mapDiv").css("left", "-6000px");
    $("#mapDiv").css("position", "absolute");
    $("#map-toolbar").hide();
    $("#map-footer-toolbar").hide();
    $("#gpsBtn").hide();

    $("#reporteDiv").hide();
    $("#reporte-toolbar").hide();
    $("#bienvenidaDiv").hide();
    $("#bienvenida-toolbar").hide();
    $("#registroDiv").hide();
    $("#registro-toolbar").hide();
    $("#registro2Div").hide();
    $("#registro2-toolbar").hide();
    $("#terminosDiv").hide();
    $("#terminos-toolbar").hide();
    $("#catalogoDiv").hide();
    $("#catalogo-toolbar").hide();
    $("#tutorialDiv").hide();
    $("#tutorial-toolbar").hide();
    $("#catalogoDetailDiv").hide();
    $("#catalogo-detail-toolbar").hide();
    $("#registrosDetailDiv").hide();
    $("#registros-detail-toolbar").hide();
};

function gotoNext() {
    hideAll();
    if (window.localStorage.getItem("first") == null) {
        gotoTutorial();
    } else {
        if (currentUser == null) {
            gotoRegistro();
        } else {
            gotoMap();
            updateUser();
            updatePoints();
        };
    };
};

function gotoNextTutorial() {
    hideAll();
    if (window.localStorage.getItem("first") == null) {
        window.localStorage.setItem("first", true);
    };
    if (currentUser == null) {
        gotoRegistro();
    } else {
        gotoMap();
        updateUser();
        updatePoints();
    };
};

function gotoTutorial() {
    hideAll();
    $("#tutorialDiv").show();
    $("#tutorial-toolbar").show();
    myApp.swiper($('.swiper-container'), { pagination: '.swiper-pagination' });
    window.localStorage.setItem("tutorial", true);
};

function gotoRegistro2() {
    $("#fnombres").val("");
    $("#fapellidos").val("");
    $("#fcorreo").val("");
    $("#fpassword").val("");
    hideAll();
    $("#registro2Div").show();
    $("#registro2-toolbar").show();
}

function gotoRegistro2Again() {
    hideAll();
    $("#registro2Div").show();
    $("#registro2-toolbar").show();
}


function submitRegistro() {

    $.validity.start();
    $("#fcorreo").require();
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar su direcci&oacute;n de correo.');
        return;
    };

    $.validity.start();
    $("#fcorreo").match("email");
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar un correo electr&oacute;nico v&aacute;lido.');
        return;
    };

    $.validity.start();
    $("#fpassword").require();
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar una contrase&ntilde;a.');
        return;
    };

    if ($("#fpassword").val().length < 6) {
        sendAlert('La contrase&ntilde;a debe tener 6 o m&aacute;s caracteres.');
        return;
    }

    $.validity.start();
    $("#fnombres").require();
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar su nombre.');
        return;
    };

    $.validity.start();
    $("#fapellidos").require();
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar su apellido.');
        return;
    };

    if ($("#terminosCheck").prop('checked') == false) {
        sendAlert('Debe aceptar los t&eacute;rminos de uso.');
        return;
    }

    myApp.showPreloader("Por favor, espere.");
    $.ajax({
        url: _url, 
        type: 'POST',
        data: {
            action: "registerUser",
            user: $("#fcorreo").val().toLowerCase(),
            password: $("#fpassword").val(),
            name: $("#fnombres").val(),
            surname: $("#fapellidos").val()
        },
        dataType: 'json',
        success: function (response) {
            myApp.hidePreloader();
            if (response.status == "OK") {
                setTimeout(function () {
                    sendAlert('Registro exitoso.');
                }, 1500);
                currentUser = $("#fcorreo").val().toLowerCase();
                window.localStorage.setItem("user", currentUser);
                currentToken = response.token;
                window.localStorage.setItem("token", currentToken);
                gotoMap();
                updateUser();
                updatePoints();
            } else {
                setTimeout(function () {
                    sendAlert('No se pudo registrar el usuario, por favor, intente m&aacute;s tarde.');
                }, 1500);
            };
        },
        error: function () {
            myApp.hidePreloader();
            setTimeout(function () {
                sendAlert('No se pudo registrar el usuario, por favor, intente m&aacute;s tarde.');
            }, 1500);

        }
    });
};

function login() {
    $.validity.start();
    $("#logincorreo").require();
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar su direcci&oacute;n de correo.');
        return;
    };

    $.validity.start();
    $("#logincorreo").match("email");
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar un correo electr&oacute;nico v&aacute;lido.');
        return;
    };

    $.validity.start();
    $("#loginpassword").require();
    if ($.validity.end().errors > 0) {
        sendAlert('Debe ingresar una contrase&ntilde;a.');
        return;
    };
    
    myApp.showPreloader("Por favor, espere.");
    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "authUser",
            user: $("#logincorreo").val().toLowerCase(),
            password: $("#loginpassword").val()
        },
        dataType: 'json',
        success: function (response) {
            myApp.hidePreloader();
            if (response.status == "OK") {
                currentUser = $("#logincorreo").val().toLowerCase();
                window.localStorage.setItem("user", currentUser);
                currentToken = response.token;
                window.localStorage.setItem("token", currentToken);
                gotoMap();
                updateUser();
                updatePoints();
            } else {
                setTimeout(function () {
                    sendAlert('Usuario o contrase&ntilde;a invalido.');
                }, 1500);
            };
        },
        error: function () {
            myApp.hidePreloader();
            setTimeout(function () {
                sendAlert('No se pudo iniciar sesion, por favor, intente m&aacute;s tarde.');
            }, 1500);

        }
    });
}

function gotoMain() {
    hideAll();
    $("#bienvenidaDiv").show();
    $("#bienvenida-toolbar").show();
}

function gotoMap() {
    previousScreen = "mapa";
    hideAll();
    $("#mapDiv").css("left", "0px");
    $("#mapDiv").css("position", "");
    $("#map-toolbar").show();
    $("#gpsBtn").show();
    $("#map-footer-toolbar").show();
    updateSize();

    if (window.localStorage.getItem("tutorial") == null) {
        gotoTutorial();
    };
    try {
        glPoint.clear();
    } catch (err) {

    }

};

function gotoReporteListado(pointId) {    
    currentPointId = pointId;
    currentLote = null;
    gotoReporte(true);
};

function volverReporte() {
    if (previousScreen == "mapa") {
        gotoMap();
    }
    if (previousScreen == "listado") {
        gotoRegistrosDetail();
    }
}

function gotoReporte(readOnly) {
    $("#reporteLike").hide();
    $("#btnReporteLike").hide();
    $("#btnReporteDislike").hide();

    if (currentPointId == null) {
        $("#pointCurrentUse").empty();
        $('#pointCurrentUse').append($('<option>', { value: 'Comercial', text: 'Comercial' }));
        $('#pointCurrentUse').append($('<option>', { value: 'Industrial', text: 'Industrial' }));
        $('#pointCurrentUse').append($('<option>', { value: 'Dotacional', text: 'Dotacional' }));
        $('#pointCurrentUse').append($('<option>', { value: 'Residencial', text: 'Residencial' }));
        $('#pointCurrentUse').append($('<option>', { value: 'Recreacional', text: 'Recreacional' }));
        $('#pointCurrentUse').append($('<option>', { value: 'Otro', text: 'Otro' }));
        $("#pointCurrentUse").val("");
        cargarDatos(false);

        $("#pointNotes").val("");
        $("#pointStoreyNumber").val("");        
        $("#pointChangeType").val("");

        hideAll();
        currentPoint = new _Point(currentLoteX, currentLoteY, { wkid: 4686 });
        $("#reporteDiv").show();
        $("#reporte-toolbar").show();

        glPoint2.clear();
        glPoint2.add(new _Graphic(currentPoint, marker), null, null);
        mapDetalle.centerAndZoom(currentPoint, 9);

        $("#photoAreaReporte").show();
        $("#TextAreaReporte").show();
        photoURLS = new Array();
        $('#photolist').html("");
        $("#btnSubmitReport").show();
        $("#pointChangeType").prop("disabled", false);
        $("#pointCurrentUse").prop("disabled", false);
        $("#pointStoreyNumber").prop("disabled", false);
    } else {
        cargarPunto();
    }
};

function cargarPunto() {
    myApp.showPreloader("Por favor, espere.");
    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "getPointDetails",
            user: currentUser,
            token: currentToken,
            pointID: currentPointId
        },
        dataType: 'json',
        success: function (response) {
            myApp.hidePreloader();
            if (response.status == "OK") {
                
                hideAll();
                $("#pointChangeType").val(response.changeType);

                $("#pointCurrentUse").empty();
                $('#pointCurrentUse').append($('<option>', { value: response.currentUse, text: response.currentUse }));
                $("#pointCurrentUse").val(response.currentUse);
                $("#pointStoreyNumber").val(response.storeyNumber);                
                $("#pointChangeType").prop("disabled", true);
                $("#pointCurrentUse").prop("disabled", true);
                $("#pointStoreyNumber").prop("disabled", true);

                $("#reporteLike").show();
                $("#reporteLikeCounter").html(response.likes);
                if (response.likes >= 0) {
                    $("#reporteLikeCounterTxt").html("<i class='fa fa-thumbs-o-up'></i>");                    
                } else {
                    $("#reporteLikeCounterTxt").html("<i class='fa fa-thumbs-o-down'></i>");
                }
                if (response.likeEnabled) {
                    $("#btnReporteLike").show();
                    $("#btnReporteDislike").show();
                } else {
                    $("#btnReporteLike").hide();
                    $("#btnReporteDislike").hide();
                }

                currentLoteY = response.lat;
                currentLoteX = response.lon;
                currentLote = response.lotID;
                currentPoint = new _Point(currentLoteX, currentLoteY, { wkid: 4686 });

                $("#reporteDiv").show();
                $("#reporte-toolbar").show();
                $("#photoAreaReporte").hide();
                $("#TextAreaReporte").hide();
                $('#photolist').html("");
                $("#btnSubmitReport").hide();

                glPoint2.clear();
                glPoint2.add(new _Graphic(currentPoint, marker), null, null);
                mapDetalle.centerAndZoom(currentPoint, 9);
                cargarDatos(true);
            } else {
               
            };
        },
        error: function () {
            myApp.hidePreloader();            

        }
    });
}

function cargarDatos(readOnly) {
    $("#codigoLote").html(currentLote);
    $("#placaLote").html("");
    $("#usoLote").html("");
    $("#alturaLote").html("");

    var queryConstruccion = new _QueryTask(queryConstruccionUrl);
    var _queryConstruccion = new _query();
    _queryConstruccion.outFields = ["*"];
    _queryConstruccion.returnGeometry = false;
    _queryConstruccion.where = "LOTECODIGO = '" + currentLote + "'";
    queryConstruccion.execute(_queryConstruccion, function (relatedRecords) {
        var fset = relatedRecords.features;
        var valor = 0;
        var sHTML = "";
        for (var i = 0; i < fset.length; i++) {
            try {
                if (parseInt(fset[i].attributes["CONNPISOS"]) > valor) {
                    valor = parseInt(fset[i].attributes["CONNPISOS"]);
                };
            } catch (err) {

            }
        }
        if (valor == 0) {
            sHTML = "No disponible";
        } else {
            sHTML = valor;
        }
        $("#alturaLote").html(sHTML);
    });

    var queryUso = new _QueryTask(queryUsoUrl);
    var _queryUso = new _query();
    _queryUso.outFields = ["*"];
    _queryUso.returnGeometry = false;
    _queryUso.where = "USOCLOTE = '" + currentLote + "'";
    queryUso.execute(_queryUso, function (relatedRecords) {
        var fset = relatedRecords.features;
        var usosConsolidados = [];
        for (var i = 0; i < fset.length; i++) {
            try {
                var temp = translate_usos(fset[i].attributes["USOTUSO"]);
                if (usosConsolidados.indexOf(temp) == -1) {
                    usosConsolidados.push(temp);
                }
            } catch (err) {

            }
        }

        var sHTML = "";
        for (var i = 0; i < usosConsolidados.length; i++) {
            try {
                sHTML = sHTML + (usosConsolidados[i]) + "<br />";
            } catch (err) {

            }
        }
        if (sHTML.length == 0) {
            sHTML = "No disponible\n";
        }

        if ((usosConsolidados.length > 1) && (!readOnly)) {
            $("#pointCurrentUse").empty();
            for (var i = 0; i < usosConsolidados.length; i++) {
                try {
                    $('#pointCurrentUse').append($('<option>', { value: 'De ' + usosConsolidados[i] + ' a Comercial', text: 'De ' + usosConsolidados[i] + ' a Comercial' }));
                    $('#pointCurrentUse').append($('<option>', { value: 'De ' + usosConsolidados[i] + ' a Industrial', text: 'De ' + usosConsolidados[i] + ' a Industrial' }));
                    $('#pointCurrentUse').append($('<option>', { value: 'De ' + usosConsolidados[i] + ' a Dotacional', text: 'De ' + usosConsolidados[i] + ' a Dotacional' }));
                    $('#pointCurrentUse').append($('<option>', { value: 'De ' + usosConsolidados[i] + ' a Residencial', text: 'De ' + usosConsolidados[i] + ' a Residencial' }));
                    $('#pointCurrentUse').append($('<option>', { value: 'De ' + usosConsolidados[i] + ' a Recreacional', text: 'De ' + usosConsolidados[i] + ' a Recreacional' }));
                    $('#pointCurrentUse').append($('<option>', { value: 'De ' + usosConsolidados[i] + ' a Otro', text: 'De ' + usosConsolidados[i] + ' a Otro' }));
                } catch (err) {

                }
            }            
            $("#pointCurrentUse").val("");
        }
        

        sHTML = sHTML.substring(0, sHTML.length - 1);
        $("#usoLote").html(sHTML);
    });

    var queryPlaca = new _QueryTask(queryPlacaUrl);
    var _queryPlaca = new _query();
    _queryPlaca.outFields = ["*"];
    _queryPlaca.returnGeometry = false;
    _queryPlaca.where = "PDOCLOTE = '" + currentLote + "'";
    queryPlaca.execute(_queryPlaca, function (relatedRecords) {
        var fset = relatedRecords.features;
        var sHTML = "";
        for (var i = 0; i < fset.length; i++) {
            try {
                sHTML = sHTML + fset[i].attributes["PDOTEXTO"] + "<br/>";
            } catch (err) {

            }
        }
        if (sHTML.length == 0) {
            sHTML = "No disponible<br/>";
        }
        sHTML = sHTML.substring(0, sHTML.length - 5);
        $("#placaLote").html(sHTML);
    });

};

function translate_usos(value) {
    var val = parseInt(value);
    for (var i = 0; i < usos_homologacion.length; i++) {
        if (usos_homologacion[i].value == value) {
            return usos_homologacion[i].consolidado;
        }
    }
}

function registroLike(signo) {
    $("#reporteLike").hide();
    $("#btnReporteLike").hide();
    $("#btnReporteDislike").hide();    

    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "setLikeToPoint",
            user: currentUser,
            token: currentToken,
            pointID: currentPointId,
            setLike: signo
        },
        dataType: 'json',
        success: function (response) {
            if (response.status == "OK") {

            };
        },
        error: function () {
            

        }
    });
}

function gotoRegistro() {
    hideAll();
    $("#registroDiv").show();
    $("#registro-toolbar").show();
}

function gotoTerminos() {
    hideAll();
    $("#terminosDiv").show();
    $("#terminos-toolbar").show();
}

function gotoCatalogo() {
    hideAll();
    myApp.closePanel('right');
    $("#catalogoDiv").show();
    $("#catalogo-toolbar").show();
}

function gotoComentario() {
    $("#txtComentario").val("");
    $(".star").removeClass("star_active");
    myApp.popup('#comentariosDiv');
}

function starClick(value) {
    var stars = $(".star");
    $(".star").removeClass("star_active");
    for (var i = 0; i < stars.length; i++) {
        if (parseInt($(stars[i]).attr("data-value")) <= value) {
            $(stars[i]).addClass("star_active");
        }
    }
}

function enviarComentario() {
    myApp.closeModal('#comentariosDiv');
    var value = 0;
    var stars = $(".star_active");
    for (var i = 0; i < stars.length; i++) {
        if (parseInt($(stars[i]).attr("data-value")) > value) {
            value = parseInt($(stars[i]).attr("data-value"));
        }        
    }

    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "rateApp",
            user: currentUser,
            token: currentToken,
            score: value,
            comment: $("#txtComentario").val()
        },
        dataType: 'json',
        success: function (response) {
            if (response.status == "OK") {

            };
        },
        error: function () {


        }
    });
}

function cancelarComentario() {
    myApp.closeModal('#comentariosDiv');
}

function gotoRegistrosDetail() {
    previousScreen = "listado";
    hideAll();
    myApp.closePanel('right');
    $("#registrosDetailDiv").show();
    $("#registros-detail-toolbar").show();
}

function gotoCatalogoDetail() {
    hideAll();
    myApp.closePanel('right');
    $("#catalogoDetailDiv").show();
    $("#catalogo-detail-toolbar").show();
}

function addPhotos(sourceType) {
    if (photoURLS.length == 3) {
        sendAlert("Solo puede cargar hasta tres fotos por reporte.");
        return;
    };

    navigator.camera.getPicture(captureSuccess, captureFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        quality: 50,
        targetHeight: 1024,
        targetWidth: 1024,
        encodingType: Camera.EncodingType.JPEG
    });
};

function captureSuccess(imageData) {
    photoURLS.push("data:image/jpeg;base64," + imageData);
    $('#photolist').append('<img class="image_thumb" src="data:image/jpeg;base64,' + imageData + '" />');
}

function captureFail(imageURI) {
    sendAlert("Error en la captura de la imagen");
}

function clearPhotos() {
    photoURLS = new Array();
    $("#photolist").html("");
};

function submitReport() {
    if (photoURLS.length == 0) {
        sendAlert('Debe incluir por lo menos una foto.');
        return;
    }

    if (($("#pointChangeType").val() == null) || ($("#pointChangeType").val() == "")) {
        sendAlert('Debe seleccionar un tipo de cambio.');
        return;
    }

    if (($("#pointCurrentUse").val() == null) || ($("#pointCurrentUse").val() == "")) {
        sendAlert('Debe seleccionar un tipo de uso.');
        return;
    }

    if (($("#pointStoreyNumber").val() == null) || ($("#pointStoreyNumber").val() == "")) {
        sendAlert('Debe seleccionar el n&uacute;mero de pisos.');
        return;
    }

    myApp.showPreloader("Enviando reporte, por favor, espere.");

    var photoMSG = [];
    if (photoURLS.length > 0) {
        for (var i = 0; i < photoURLS.length; i++) {
            photoMSG.push({ url : photoURLS[i] });
        }
    };
        
    var p = {};
    p.lat = currentLoteY;
    p.lon = currentLoteX;
    p.lotID = currentLote;
    p.changeType = $("#pointChangeType").val();
    p.currentUse = $("#pointCurrentUse").val();
    p.storeyNumber = $("#pointStoreyNumber").val();
    p.notes = $("#pointNotes").val();
    p.pictures = photoMSG;

    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "registerPoint",
            user: currentUser,
            token: currentToken,
            point: p
        },
        dataType: 'json',
        success: function (response) {
            myApp.hidePreloader();
            if (response.status == "OK") {
                myApp.hidePreloader();
                setTimeout(function () {
                    sendAlert('&#161;Muchas gracias por reportar un nuevo cambio en Bogot&aacute;&#33; Tu participaci&oacute;n nos aporta valiosa informaci&oacute;n para construir ciudad.');
                }, 1500);
                gotoMap();
                myApp.openPanel('right');
                updateUser();
                updatePoints();
            } else {
                setTimeout(function () {
                    sendAlert('No se pudo registrar el cambio, por favor, intente m&aacute;s tarde.');
                }, 1500);
            };
        },
        error: function () {
            myApp.hidePreloader();
            setTimeout(function () {
                sendAlert('No se pudo registrar el cambio, por favor, intente m&aacute;s tarde.');
            }, 1500);

        }
    });

};

function updatePoints() {
    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "getPointsByExtent",
            user: currentUser,
            token: currentToken,
            extent: [[map.extent.xmin, map.extent.ymin], [map.extent.xmax, map.extent.ymax]]
        },
        dataType: 'json',
        success: function (response) {
            if (response.status == "OK") {
                for (var i = 0; i < response.points.length; i++) {
                    cacheReportes[response.points[i].lotID] = response.points[i].pointID;
                    renderer.addValue(response.points[i].lotID, new _SimpleFillSymbol().setColor(new _Color([255, 0, 0, 0.5])));
                }
                loteLayer.refresh();
                loteLayer2.refresh();
            } else {

            };
        },
        error: function () {

        }
    });
};

function updateUser() {
    $("#user_email").html(currentUser);
    $("#registrosList").html("");

    $.ajax({
        url: _url,
        type: 'POST',
        data: {
            action: "getUserDetails",
            user: currentUser,
            token: currentToken
        },
        dataType: 'json',
        success: function (response) {
            myApp.hidePreloader();
            if (response.status == "OK") {
                $("#user_name").html(response.name);
                $("#ptTotales").html(response.scoreBalance);
                $("#rgTotales").html(response.points.length);
                for (var i = 0; i < response.points.length; i++) {
                    var sHTML = "";
                    sHTML = sHTML + "<li>";
                    sHTML = sHTML + "<a href='#' class='item-link item-content' onclick='gotoReporteListado(\"" + response.points[i].pointID + "\");'>";
                    sHTML = sHTML + "<div class='item-inner'>";
                    sHTML = sHTML + "<div class='item-title-row'>";
                    sHTML = sHTML + "<div class='item-title'>Lote " + response.points[i].lotID + "</div>";
                    sHTML = sHTML + "<div class='item-after'>" + response.points[i].likes + "</div>";
                    sHTML = sHTML + "</div>";
                    sHTML = sHTML + "<div class='item-subtitle'>" + response.points[i].timestamp + "</div>";
                    sHTML = sHTML + "</div>";
                    sHTML = sHTML + "</a>";
                    sHTML = sHTML + "</li>";
                    $("#registrosList").append(sHTML);
                }
            } else {
               
            };
        },
        error: function () {

        }
    });

};

function logout() {
    myApp.closePanel('right');
    currentUser = null;
    currentToken = null;
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tutorial");
    gotoMain();
};

function sendAlert(text) {
    myApp.alert(text, msgtitle);
}


function isPhoneGapExclusive() {
    try {
        return (cordova || PhoneGap || phonegap);
    } catch (err) {
        return false;
    }
}