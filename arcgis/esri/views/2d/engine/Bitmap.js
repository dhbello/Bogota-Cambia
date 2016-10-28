// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["./DisplayObject"],function(b){return b.createSubclass({declaredClass:"esri.views.2d.engine.Bitmap",className:"esri-bitmap",source:null,_sourceSetter:function(a){var b=this._get("source");a!==b&&(a.className=this.className,this.surface=a,this.requestRender(),this._set("source",a))}})});