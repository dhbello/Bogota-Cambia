//>>built
define("esri/dijit/metadata/types/arcgis/base/PortalItemTransformer","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../arcgis/portal/PortalItemTransformer ../../../base/etc/docUtil".split(" "),function(c,d,g,h,k,f){c=c([k],{postCreate:function(){this.inherited(arguments)},checkVisibility:function(e,c){this.inherited(arguments);var b;if("/metadata/dataIdInfo/resConst/Consts/useLimit"===c)f.findElementChoice(e,!0);else if(0===c.indexOf("/metadata/dataIdInfo/dataExt/geoEle/GeoBndBox/"))try{f.findElementChoice(e,
!0),b=e.parentXNode.parentElement.parentElement.parentElement,b.toggleContent&&b.toggleContent(!0)}catch(a){console.error(a)}else if("/metadata/distInfo/distTranOps/onLineSrc/linkage"===c)try{b=e.parentXNode.parentElement,b.toggleContent&&b.toggleContent(!0),b.parentElement.multiplicityHeader&&b.parentElement.multiplicityHeader.toggleContent&&b.parentElement.multiplicityHeader.toggleContent(!0),b.parentElement.parentElement.toggleContent&&b.parentElement.parentElement.toggleContent(!0)}catch(d){console.error(d)}},
populateTransformationInfo:function(c,d,b){this.inherited(arguments);var a=b;a.id.path="/metadata/mdFileID";a.title.path="/metadata/dataIdInfo/idCitation/resTitle";a.snippet.path="/metadata/dataIdInfo/idPurp";a.description.path="/metadata/dataIdInfo/idAbs";a.tags.path="/metadata/dataIdInfo/searchKeys/keyword";a.accessInformation.path="/metadata/dataIdInfo/idCredit";a.licenseInfo.path="/metadata/dataIdInfo/resConst/Consts/useLimit";a.url.path="/metadata/distInfo/distTranOps/onLineSrc/linkage";a.extent.xmin.path=
"/metadata/dataIdInfo/dataExt/geoEle/GeoBndBox/westBL";a.extent.ymin.path="/metadata/dataIdInfo/dataExt/geoEle/GeoBndBox/southBL";a.extent.xmax.path="/metadata/dataIdInfo/dataExt/geoEle/GeoBndBox/eastBL";a.extent.ymax.path="/metadata/dataIdInfo/dataExt/geoEle/GeoBndBox/northBL"}});g("extend-esri")&&d.setObject("dijit.metadata.types.arcgis.base.PortalItemTransformer",c,h);return c});