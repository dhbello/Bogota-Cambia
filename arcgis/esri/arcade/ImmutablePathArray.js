//>>built
define("esri/arcade/ImmutablePathArray",["require","exports","../core/tsSupport/extendsHelper","./ImmutableArray","./ImmutablePointArray"],function(g,h,c,d,e){return function(f){function b(a,b,c,d,e){f.call(this,a);this._lazyPath=[];this._hasM=this._hasZ=!1;this._hasZ=c;this._hasM=d;this._spRef=b;this._cacheId=e}c(b,f);b.prototype.get=function(a){if(void 0===this._lazyPath[a]){var b=this._elements[a];if(void 0===b)return;this._lazyPath[a]=new e(b,this._spRef,this._hasZ,this._hasM,this._cacheId,a)}return this._lazyPath[a]};
b.prototype.equalityTest=function(a){return a===this?!0:null===a||!1===a instanceof b?!1:a.getUniqueHash()===this.getUniqueHash()};b.prototype.getUniqueHash=function(){return this._cacheId.toString()};return b}(d)});