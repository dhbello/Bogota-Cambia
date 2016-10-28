// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/Deferred"],function(k,g,h){function d(e,c){if(Array.isArray(c)){var f=new h;e(c,function(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];f.resolve(a)});return f.promise}return d(e,[c]).then(function(a){return a[0]})}g.when=d});