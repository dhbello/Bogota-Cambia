// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["../core/declare","../core/lang","../symbols/support/jsonUtils","./Renderer"],function(b,c,d,e){var a=b(e,{declaredClass:"esri.renderer.SimpleRenderer",properties:{description:{value:null,json:{writable:!0}},label:{value:null,json:{writable:!0}},symbol:{value:null,json:{read:d.read,write:function(a,b,c){b.symbol=d.write(a,{},c)},writeNull:!0}},type:"simple"},getSymbol:function(a){return this.symbol},clone:function(){return new a({description:this.description,label:this.label,symbol:this.symbol&&
this.symbol.clone(),visualVariables:c.clone(this.visualVariables)})}});return a});