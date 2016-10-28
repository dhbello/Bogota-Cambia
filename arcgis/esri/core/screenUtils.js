// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define([],function(){var c=/^(\d+(\.\d+)?)\s*((px)|(pt))?$/i,b={DPI:96,pt2px:function(a){return a/72*b.DPI},px2pt:function(a){return 72*a/b.DPI},toPt:function(a){if("string"===typeof a)if(c.test(a)){a=a.match(c);var d=Number(a[1]);a="px"===(a[3]&&a[3].toLowerCase())?b.px2pt(d):d}else console.warn("screenUtils.toPt: input not recognized!"),a=null;return a}};return b});