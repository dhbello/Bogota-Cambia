// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["../../dojo/Deferred"],function(b){return function(g,c){var a;c||(c=500);var d=new b(function(){a&&clearTimeout(a)}),f=function(){if(!d.isFulfilled()){for(var b=Date.now(),e=!1;!e&&Date.now()-b<c;)e=!0===g();e?d.resolve():a=setTimeout(f,0)}};a=setTimeout(f,0);return d.promise}});