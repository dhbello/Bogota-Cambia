// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["dojo/_base/lang"],function(c){var b=function(a){a?this.set(a):(this.mode=null,this.offset=0,this.featureExpression=null)};b.prototype.set=function(a){this.mode=a.mode;this.offset=a.offset;this.featureExpression=a.featureExpression?c.clone(a.featureExpression):null};b.MODES={ABSOLUTE_HEIGHT:"absolute-height",RELATIVE_TO_GROUND:"relative-to-ground",ON_THE_GROUND:"on-the-ground"};return b});