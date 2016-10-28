// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["require","exports","../core/accessorSupport/ensureType","../Ground","../layers/ElevationLayer"],function(g,b,e,d,f){b.groundElevationLayers={"world-elevation":{id:"worldElevation",url:"//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"}};b.ensureType=function(a){var c;"string"===typeof a?a in b.groundElevationLayers?(a=b.groundElevationLayers[a],a=new f({id:a.id,url:a.url}),c=new d({layers:[a]})):console.warn("Unable to find ground definition for: "+a+'. Try "world-elevation"'):
c=e.default(d,a);return c}});