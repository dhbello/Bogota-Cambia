// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ./Symbol3D ../core/accessorSupport/decorators".split(" "),function(h,k,e,c,f,g,b){return function(d){function a(a){d.call(this);this.type="mesh-symbol-3d"}e(a,d);a.prototype.clone=function(){return new a({symbolLayers:f.clone(this.symbolLayers)})};c([b.property()],a.prototype,"type",void 0);c([b.shared(["Fill"])],a.prototype,"_allowedLayerTypes",void 0);return a=c([b.subclass("esri.symbols.MeshSymbol3D")],
a)}(b.declared(g))});