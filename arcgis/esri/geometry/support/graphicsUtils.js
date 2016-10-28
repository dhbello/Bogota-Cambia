// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["dojo/_base/array","../Extent"],function(f,h){return{graphicsExtent:function(d){var a=d[0].geometry,b=a.extent,c,e,g=d.length;null===b&&(b=new h(a.x,a.y,a.x,a.y,a.spatialReference));for(e=1;e<g;e++)c=(a=d[e].geometry).extent,null===c&&(c=new h(a.x,a.y,a.x,a.y,a.spatialReference)),b=b.clone().union(c);return 0>b.width&&0>b.height?null:b},getGeometries:function(d){return f.map(d,function(a){return a.geometry})},_encodeGraphics:function(d,a){var b=[],c,e,g;f.forEach(d,function(d,f){c=d.toJSON();
e={};c.geometry&&(g=a&&a[f],e.geometry=g&&g.toJSON()||c.geometry);c.attributes&&(e.attributes=c.attributes);b[f]=e});return b}}});