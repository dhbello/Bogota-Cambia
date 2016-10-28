// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.
//>>built
define(["./TilingScheme","../support/aaBoundingRect"],function(c,b){var a={LayerClass:{MAP:0,ELEVATION:1,LAYER_CLASS_COUNT:2},TileUpdateTypes:{NONE:0,SPLIT:1,VSPLITMERGE:2,MERGE:4,DECODE_LERC:8,UPDATE_GEOMETRY:16,UPDATE_TEXTURE:32},TILE_LOADING_DEBUGLOG:!1,MAX_ROOT_TILES:64,MAX_TILE_TESSELATION:512,ELEVATION_NODATA_VALUE:3.40282347E38/10,ELEVATION_DESIRED_RESOLUTION_LEVEL:4,TILEMAP_SIZE_EXP:5};a.TILEMAP_SIZE=1<<a.TILEMAP_SIZE_EXP;a.WEBMERCATOR_WORLD_EXTENT=b.create([0,0,0,0]);c.WebMercatorAuxiliarySphere.getExtent(0,
0,0,a.WEBMERCATOR_WORLD_EXTENT);a.GEOGRAPHIC_WORLD_EXTENT=b.create([-180,-90,180,90]);return a});