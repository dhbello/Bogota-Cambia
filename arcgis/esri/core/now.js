// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["dojo/_base/window"],function(e){var b=e.global;return function(){var c,a=b.performance||{},d=a.now||a.webkitNow||a.msNow||a.oNow||a.mozNow;if(void 0!==d)return function(){return d.call(a)};c=b.performance&&b.performance.timing&&b.performance.timing.navigationStart?b.performance.timing.navigationStart:Date.now();return function(){return Date.now()-c}}()});