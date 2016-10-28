// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ./Symbol3D ../core/accessorSupport/decorators".split(" "),function(h,k,e,c,f,g,b){return function(d){function a(a){d.call(this);this.type="point-symbol-3d"}e(a,d);a.prototype.clone=function(){return new a({symbolLayers:f.clone(this.symbolLayers)})};c([b.property()],a.prototype,"type",void 0);c([b.shared(["Icon","Object","Text"])],a.prototype,"_allowedLayerTypes",void 0);return a=c([b.subclass("esri.symbols.PointSymbol3D")],
a)}(b.declared(g))});