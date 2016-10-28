// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["require","exports","./IdGen"],function(g,h,b){return function(){function a(c,b,d,e,f){this.id=a._idGen.gen(c.getId());this.geometry=c;this.materials=b;this.transformation=d;this.instanceParameters=e;this.origin=f}a.prototype.getId=function(){return this.id};a._idGen=new b;return a}()});