// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["dojo/_base/window","dojo/sniff","./now"],function(c,a,g){var d=c.global;c=a("ff");var e=a("ie"),h=a("webkit");a=a("opera");var f=Date.now(),b=d.requestAnimationFrame;b||(b=d[(h&&"webkit"||c&&"moz"||a&&"o"||e&&"ms")+"RequestAnimationFrame"])||(b=function(a){var b=Date.now(),c=Math.max(0,16-(b-f)),e=d.setTimeout(function(){a(g())},c);f=b+c;return e});return b});