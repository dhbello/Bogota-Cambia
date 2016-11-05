var myApp = new Framework7({
    fastClicks: false
});
var $$ = Dom7;

var map;
var view;
var mapLayer;
var marker;
var glPoint;
var glPointG;
var currentPoint;
var currentUser;
var imageCache;

var modeManual = false;
var initRegistro;
var photoURLS = new Array();
var msgtitle = "Bogot&aacute; Cambia";
var cambioStr = "Cambio de Uso"
var baseMapUrl = "http://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Base/MapServer";
var _url_photo = 'https://dinamica-147714.appspot.com/Imagen';
var _url_msg = 'https://20161105t160625-dot-dinamica-147714.appspot.com/Registro?';
var _url_user = 'https://20161105t160625-dot-dinamica-147714.appspot.com/UsuarioRegistro?';
var _url_balance = 'https://20161105t160625-dot-dinamica-147714.appspot.com/UsuarioBalance?';

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
    if (isPhoneGapExclusive()) {
        if ((navigator.connection.type == 0) || (navigator.connection.type == 'none')) {
            sendAlert('Esta aplicación requiere conexión a internet.');
            $("#bienvenida-toolbar").hide();
        }
    }
    initMap();
    $('#ftipo').on('change', function () {
        if (this.value == cambioStr) {
            $("#detalleTipo").show();
        } else {
            $("#detalleTipo").hide();
        }
    });
}

function initMap() {
    try {
        dojo.require("esri.map");
        dojo.require("esri.layers.MapImageLayer");
        dojo.require("esri.layers.MapImage");
        dojo.require("esri.graphic");
        dojo.require("esri.symbols.PictureMarkerSymbol");
        dojo.addOnLoad(initMap2);
    } catch (err) {

    };
}

function initMap2() {
    map = new esri.Map("map", {
        zoom: 10,
        center: new esri.geometry.Point(-74.0668084, 4.600885262127369, { wkid: 4686 }),
        autoresize: false
    });
    dojo.connect(map, "onClick", function (evt) {
        setLocationPoint(evt);
    });
    marker = new esri.symbol.PictureMarkerSymbol();
    marker.setHeight(44);
    marker.setWidth(28);
    marker.setUrl("css/Location_Icon.png");

    mapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/Mapa_Base/MapServer/");
    map.addLayer(mapLayer);
    glPoint = new esri.layers.GraphicsLayer();
    map.addLayer(glPoint, 0);
    updateSize();
    initLocationGPS();
}

function initLocationGPS() {
    try {

        navigator.geolocation.getCurrentPosition(function (position) {
            currentPointX = position.coords.longitude;
            currentPointY = position.coords.latitude;
            var currentPoint = new esri.geometry.Point(currentPointX, currentPointY, { wkid: 4686 });
            glPoint.clear();
            glPoint.add(new esri.Graphic(currentPoint, marker), null, null);
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

function setLocation() {
    modeManual = true;
    glPoint.clear();
};

function setLocationPoint(evt) {
    if (modeManual) {
        modeManual = false;
        currentPointX = evt.mapPoint.x;
        currentPointY = evt.mapPoint.y;
        var currentPoint = new esri.geometry.Point(currentPointX, currentPointY, { wkid: 4686 });
        glPoint.clear();
        glPoint.add(new esri.Graphic(currentPoint, marker), null, null);
        map.centerAt(currentPoint);
    }
}

function hideAll() {
    $("#mapDiv").css("left", "-2000px");
    $("#mapDiv").css("position", "absolute");
    $("#map-toolbar").hide();
    $("#speed-dial").hide();

    $("#reporteDiv").hide();
    $("#reporte-toolbar").hide();
    $("#bienvenidaDiv").hide();
    $("#bienvenida-toolbar").hide();
    $("#registroDiv").hide();
    $("#registro-toolbar").hide();
    $("#terminosDiv").hide();
    $("#terminos-toolbar").hide();
    $("#catalogoDiv").hide();
    $("#catalogo-toolbar").hide();
};

function gotoNext() {
    hideAll();
    if (currentUser == null) {
        gotoRegistro();
    } else {
        gotoMap();
        updateUser();
    };
};

function submitRegistro() {
    if (initRegistro) {
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

        myApp.showPreloader("Validando usuario, por favor, espere.");
        $.ajax({
            url: _url_user + "email=" + encodeURIComponent($("#fcorreo").val().toLowerCase()),
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                myApp.hidePreloader();
                if (response.status == "true") {
                    currentUser = $("#fcorreo").val().toLowerCase();
                    window.localStorage.setItem("user", currentUser);
                    gotoMap();
                    updateUser();
                } else {
                    initRegistro = false;
                    $("#registroNuevo").show();
                };
            },
            error: function () {
                myApp.hidePreloader();
                setTimeout(function () {
                    sendAlert('No se pudo validar el usuario, por favor, intente m&aacute;s tarde.');
                }, 2000);
            }
        });
    } else {
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
            sendAlert('Debe aceptar los terminos de uso.');
            return;
        }
        $.ajax({
            url: _url_user + "email=" + encodeURIComponent($("#fcorreo").val().toLowerCase()) +
                "&nombres=" + encodeURIComponent($("#fnombres").val()) + "&apellidos=" + encodeURIComponent($("#fapellidos").val()),
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                myApp.hidePreloader();
                if (response.status == "true") {
                    currentUser = $("#fcorreo").val().toLowerCase();
                    window.localStorage.setItem("user", currentUser);
                    gotoMap();
                    updateUser();
                } else {
                    setTimeout(function () {
                        sendAlert('No se pudo registrar el usuario, por favor, intente m&aacute;s tarde.');
                    }, 2000);
                };
            },
            error: function () {
                myApp.hidePreloader();
                setTimeout(function () {
                    sendAlert('No se pudo registrar el usuario, por favor, intente m&aacute;s tarde.');
                }, 2000);

            }
        });
    };
};

function gotoMain() {
    hideAll();
    $("#bienvenidaDiv").show();
    $("#bienvenida-toolbar").show();
}

function gotoMap() {
    hideAll();
    $("#mapDiv").css("left", "0px");
    $("#mapDiv").css("position", "");
    $("#map-toolbar").show();
    $("#speed-dial").show();
    updateSize();
};

function gotoReporte() {
    hideAll();
    $("#reporteDiv").show();
    $("#reporte-toolbar").show();

    photoURLS = new Array();
    $('#photolist').html("");
    $('#ftipo').val("");
    $("#detalleTipo").hide();
};

function gotoRegistro() {
    initRegistro = true;
    hideAll();
    $("#registroDiv").show();
    $("#registro-toolbar").show();
}

function gotoRegistroAgain() {
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

function dial() {
    if ($("#speed-dial").hasClass('speed-dial-opened')) {
        $('#speed-dial').removeClass('speed-dial-opened');
    } else {
        $('#speed-dial').addClass('speed-dial-opened');
    }
};

function addPhotos(sourceType) {
    if (photoURLS.length == 3) {
        sendAlert("Solo puede cargar hasta tres fotos por reporte.");
        return;
    };

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
    imageCache = imageURI;
    ft.upload(imageURI, _url_photo, uploadSuccessFT, uploadFail, options);
}

function captureFail(imageURI) {
    sendAlert("Error en la captura de la imagen");
}

function uploadSuccessFT(response) {
    myApp.hidePreloader();
    setTimeout(function () {
        sendAlert("Foto cargada exitosamente.");
    }, 2000);
    var objResponse;
    objResponse = response.response;
    photoURLS.push(objResponse);
    $('#photolist').append('<img class="image_thumb" src="' + imageCache + '" />');
};

function uploadFail(error) {
    myApp.hidePreloader();
    setTimeout(function () {
        sendAlert("No se pudo cargar la foto, por favor, intente m&aacute;s tarde.");
    }, 2000);
};

function clearPhotos() {
    photoURLS = new Array();
    $("#photolist").html("");
};

function submitReport() {
    if (photoURLS.length == 0) {
        sendAlert('Debe incluir por lo menos una foto.');
        return;
    }

    if ($("#ftipo").val() == null) {
        sendAlert('Debe seleccionar un tipo de reporte.');
        return;
    }

    myApp.showPreloader("Enviando reporte, por favor, espere.");

    var photoMSG = '';
    if (photoURLS.length > 0) {
        for (var i = 0; i < photoURLS.length; i++) {
            photoMSG = photoMSG + '&foto=' + encodeURIComponent(photoURLS[i]);
        }
    };

    var tipoText;
    if ($('#ftipo')[0].value == cambioStr) {
        tipoText = $('#ftipo')[0].value + " - " + $('#ftipodetalle')[0].value;
    } else {
        tipoText = $('#ftipo')[0].value;
    }

    var msgURL = _url_msg + "email=" + encodeURIComponent(currentUser)
                          + "&tipoRegistro=" + tipoText + "&latitud=" + currentPointX + "&longitud=" + currentPointY + photoMSG;
    $.ajax({
        url: msgURL,
        type: 'GET',
        success: function () {                
            myApp.hidePreloader();
            setTimeout(function () {
                sendAlert('Reporte enviado exitosamente.');
            }, 2000);
            updateUser();
        },
        error: function () {
            myApp.hidePreloader();
            setTimeout(function () {
                sendAlert('No se pudo enviar el reporte, por favor, intente m&aacute;s tarde.');
            }, 2000);
        }
    });

    gotoMap();
};

function updateUser() {
    $("#user_email").html(currentUser);
    $.ajax({
        url: _url_balance + "email=" + encodeURIComponent(currentUser),
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status == "true") {
                $("#user_name").html(response.nombres + " " + response.apellidos);
                $("#ptTotales").html(response.puntos);
            };
        },
        error: function () {

        }
    });
};

function logout() {
    myApp.closePanel('right');
    currentUser = null;
    window.localStorage.removeItem("user");
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