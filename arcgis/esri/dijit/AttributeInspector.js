//>>built
require({cache:{"url:esri/dijit/templates/AttributeInspector.html":'\x3cdiv class\x3d"esriAttributeInspector"\x3e\r\n    \x3cdiv class\x3d"atiLayerName" dojoAttachPoint\x3d"layerName"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"atiAttributes" dojoAttachPoint\x3d"attributeTable"\x3e\x3c/div\x3e\r\n    \x3cdiv dojoAttachPoint\x3d"attachmentEditor"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"atiEditorTrackingInfo" dojoAttachPoint\x3d"editorTrackingInfoDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"atiButtons" dojoAttachPoint\x3d"editButtons"\x3e\r\n        \x3cbutton  dojoType\x3d"dijit.form.Button" class\x3d"atiButton atiDeleteButton"  dojoAttachPoint\x3d"deleteBtn" dojoAttachEvent\x3d"onClick: onDeleteBtn" showLabel\x3d"true" type\x3d"button"\x3e${NLS_deleteFeature}\x3c/button\x3e\r\n        \x3cdiv class\x3d"atiNavButtons" dojoAttachPoint\x3d"navButtons"\x3e\r\n            \x3cdiv class\x3d"atiNavMessage" dojoAttachPoint\x3d"navMessage"\x3e\x3c/div\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiFirstIcon" dojoAttachPoint\x3d"firstFeatureButton" dojoAttachEvent\x3d"onClick: onFirstFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_first}\x3c/button\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiPrevIcon" dojoAttachPoint\x3d"prevFeatureButton" dojoAttachEvent\x3d"onClick: onPreviousFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_previous}\x3c/button\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiNextIcon" dojoAttachPoint\x3d"nextFeatureButton" dojoAttachEvent\x3d"onClick: onNextFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_next}\x3c/button\x3e\r\n            \x3cbutton  dojoType\x3d"dijit.form.Button" iconClass\x3d"atiButton atiLastIcon" dojoAttachPoint\x3d"lastFeatureButton" dojoAttachEvent\x3d"onClick: onLastFeature" showLabel\x3d"false" type\x3d"button"\x3e${NLS_last}\x3c/button\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/AttributeInspector","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/sniff dojo/_base/kernel dojo/has dojo/dom-style dojo/dom-construct ../kernel ../lang ../domUtils ../layers/InheritedDomain ../layers/FeatureLayer dojo/i18n!../nls/jsapi dojo/fx dojox/gfx dijit/_Widget dijit/_Templated dijit/Editor dijit/_editor/plugins/LinkDialog dijit/_editor/plugins/TextColor ./_EventedWidget ./editing/AttachmentEditor ./editing/Util ../tasks/query dijit/form/DateTextBox dijit/form/TextBox dijit/form/NumberTextBox dijit/form/FilteringSelect dijit/form/NumberSpinner dijit/form/Button dijit/form/SimpleTextarea dijit/form/ValidationTextBox dijit/form/TimeTextBox dijit/Tooltip dojo/data/ItemFileReadStore dojox/date/islamic dojox/date/islamic/Date dojox/date/islamic/locale dojo/text!./templates/AttributeInspector.html".split(" "),
function(y,g,f,r,R,z,A,q,k,B,p,s,t,C,D,S,T,E,F,G,U,V,H,I,u,W,J,v,K,w,L,X,M,x,N,O,P,Y,Z,$,Q){var n=y([H,E,F],{declaredClass:"esri.dijit.AttributeInspector",widgetsInTemplate:!0,templateString:Q,onUpdate:function(){},onDelete:function(){},onAttributeChange:function(){},onNext:function(){},onReset:function(){},onCancel:function(){},_navMessage:"( ${idx} ${of} ${numFeatures} )",_currentAttributeFieldName:null,_aiConnects:[],_selection:[],_toolTips:[],_numFeatures:0,_featureIdx:0,_currentLInfo:null,_currentFeature:null,
_rollbackInfo:null,_eventMap:{update:!0,"delete":["feature"],"attribute-change":["feature","fieldName","fieldValue"],next:["feature"],reset:!0,cancel:!0},constructor:function(a,b){g.mixin(this,D.widgets.attributeInspector);a=a||{};!a.featureLayer&&!a.layerInfos&&console.error("esri.AttributeInspector: please provide correct parameter in the constructor");this._datePackage=this._getDatePackage(a);this._layerInfos=a.layerInfos||[{featureLayer:a.featureLayer,options:a.options||[]}];this._layerInfos=
f.filter(this._layerInfos,function(a){return!a.disableAttributeUpdate});this._hideNavButtons=a.hideNavButtons||!1},postCreate:function(){if(f.every(this._layerInfos,function(a){return a.featureLayer.loaded}))this._initLayerInfos(),this._createAttachmentEditor(),this.onFirstFeature();else{var a=this._layerInfos.length;f.forEach(this._layerInfos,function(b){b=b.featureLayer;if(b.loaded)a--;else var c=r.connect(b,"onLoad",this,function(b){r.disconnect(c);c=null;a--;a||(this._initLayerInfos(),this._createAttachmentEditor(),
this.onFirstFeature())})},this)}},destroy:function(){this._destroyAttributeTable();f.forEach(this._aiConnects,r.disconnect);delete this._aiConnects;this._attachmentEditor&&(this._attachmentEditor.destroy(),delete this._attachmentEditor);delete this._layerInfos;this._selection=this._currentFeature=this._currentLInfo=this._attributes=this._layerInfos=null;this.inherited(arguments)},refresh:function(){this._updateSelection()},first:function(){this.onFirstFeature()},last:function(){this.onLastFeature()},
next:function(){this.onNextFeature()},previous:function(){this.onPreviousFeature()},showFeature:function(a,b){b&&(this._createOnlyFirstTime=!0);this._updateSelection([a],b);this._updateUI()},onLayerSelectionChange:function(a,b,c){this._createOnlyFirstTime=!1;this._featureIdx=c===C.SELECTION_NEW?0:this._featureIdx;this._updateSelection();this._updateUI()},onLayerSelectionClear:function(){this._selection&&!(0>=this._selection.length)&&(this._featureIdx=this._numFeatures=0,this._selection=[],this._currentLInfo=
this._currentFeature=null,this._updateUI())},onLayerUpdateEnd:function(a,b,c,d){},onLayerError:function(a,b,c,d){},onLayerEditsError:function(a,b,c,d){},onLayerEditsComplete:function(a,b,c,d){d=d||[];if(d.length){var e=this._selection,m=a.featureLayer.objectIdField;f.forEach(d,g.hitch(this,function(a){f.some(e,g.hitch(this,function(b,c){if(b.attributes[m]!==a.objectId)return!1;this._selection.splice(c,1);return!0}))}))}b=b||[];b.length&&(this._selection=u.findFeatures(b,a.featureLayer),this._featureIdx=
0);d=this._numFeatures=this._selection?this._selection.length:0;if(b.length){if(b=d?this._selection[this._featureIdx]:null)d=b.getLayer().getEditCapabilities(),(!d.canCreate||d.canUpdate)&&this._showFeature(b);this._updateUI()}c=c||[];if(c.length){var l=this._rollbackInfo;f.forEach(c,function(b){var d=u.findFeatures(c,a.featureLayer)[0];if(!b.success&&d.attributes[a.featureLayer.objectIdField]===b.objectId&&l){b=l.graphic.attributes[l.field.name];var e=f.filter(this._currentLInfo.fieldInfos,function(a){return a.fieldName===
l.field.name},this)[0].dijit;d.attributes[l.field.name]=b;this._setValue(e,b)}},this)}this._rollbackInfo=null},onFieldValueChange:function(a,b){var c=a.field,d=a.dijit,e=this._currentFeature,m=this._currentLInfo,l=c.name;if(""!==d.displayedValue&&"undefined"===typeof b&&!d.isValid())this._setValue(d,e.attributes[c.name]);else if(""!==d.displayedValue&&d.displayedValue!==b&&d.isValid&&!d.isValid())this._setValue(d,e.attributes[c.name]);else{b="undefined"===typeof b?null:b;if("esriFieldTypeDate"===
c.type){if(d instanceof Array){var h=d[0].getValue(),d=d[1].getValue();b=h&&d?new Date(h.getFullYear(),h.getMonth(),h.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()):h||d||null}else b=d.getValue();b=b&&b.getTime?b.getTime():b&&b.toGregorian?b.toGregorian().getTime():b}if(this._currentFeature.attributes[c.name]!==b){if(l===m.typeIdField){var g=this._findFirst(m.types,"id",b);f.forEach(m.fieldInfos,function(a){if((c=a.field)&&c.name!==m.typeIdField)a=a.dijit,this._setFieldDomain(a,
g,c)&&a&&(this._setValue(a,e.attributes[c.name]+""),!1===a.isValid()&&this._setValue(a,null))},this)}this.onAttributeChange(e,l,b)}}},onDeleteBtn:function(a){this._deleteFeature()},onNextFeature:function(a){this._onNextFeature(1)},onPreviousFeature:function(a){this._onNextFeature(-1)},onFirstFeature:function(a){this._onNextFeature(-1*this._featureIdx)},onLastFeature:function(a){this._onNextFeature(this._numFeatures-1-this._featureIdx)},_initLayerInfos:function(){var a=this._layerInfos;this._editorTrackingInfos=
{};f.forEach(a,this._initLayerInfo,this)},_initLayerInfo:function(a){var b=a.featureLayer,c,d;this._userIds={};d=b.id;b.credential&&(this._userIds[d]=b.credential.userId);a.userId&&(this._userIds[d]=a.userId);this._connect(b,"onSelectionComplete",g.hitch(this,"onLayerSelectionChange",a));this._connect(b,"onSelectionClear",g.hitch(this,"onLayerSelectionClear",a));this._connect(b,"onEditsComplete",g.hitch(this,"onLayerEditsComplete",a));this._connect(b,"error",g.hitch(this,"onLayerError",a));this._connect(b,
"onUpdateEnd",g.hitch(this,"onLayerUpdateEnd",a));a.showAttachments=b.hasAttachments?p.isDefined(a.showAttachments)?a.showAttachments:!0:!1;a.hideFields=a.hideFields||[];a.htmlFields=a.htmlFields||[];a.isEditable=b.isEditable()?p.isDefined(a.isEditable)?a.isEditable:!0:!1;a.typeIdField=b.typeIdField;a.layerId=b.id;a.types=b.types;b.globalIdField&&(c=this._findFirst(a.fieldInfos,"fieldName",b.globalIdField),!c&&!a.showGlobalID&&a.hideFields.push(b.globalIdField));d=this._findFirst(a.fieldInfos,"fieldName",
b.objectIdField);!d&&!a.showObjectID&&a.hideFields.push(b.objectIdField);var e=this._getFields(a.featureLayer);if(e){var m=a.fieldInfos||[],m=f.map(m,function(a){return g.mixin({},a)});m.length?a.fieldInfos=f.filter(f.map(m,g.hitch(this,function(b){var c=b.stringFieldOption||(this._isInFields(b.fieldName,a.htmlFields)?n.STRING_FIELD_OPTION_RICHTEXT:n.STRING_FIELD_OPTION_TEXTBOX);return g.mixin(b,{field:this._findFirst(e,"name",b.fieldName),stringFieldOption:c})})),"return item.field;"):(e=f.filter(e,
g.hitch(this,function(b){return!this._isInFields(b.name,a.hideFields)})),a.fieldInfos=f.map(e,g.hitch(this,function(b){var c=this._isInFields(b.name,a.htmlFields)?n.STRING_FIELD_OPTION_RICHTEXT:n.STRING_FIELD_OPTION_TEXTBOX;return{fieldName:b.name,field:b,stringFieldOption:c}})));a.showGlobalID&&!c&&m.push(this._findFirst(e,"name",b.globalIdField));a.showObjectID&&!d&&m.push(this._findFirst(e,"name",b.objectIdField));c=[];b.editFieldsInfo&&(b.editFieldsInfo.creatorField&&c.push(b.editFieldsInfo.creatorField),
b.editFieldsInfo.creationDateField&&c.push(b.editFieldsInfo.creationDateField),b.editFieldsInfo.editorField&&c.push(b.editFieldsInfo.editorField),b.editFieldsInfo.editDateField&&c.push(b.editFieldsInfo.editDateField));this._editorTrackingInfos[b.id]=c}},_createAttachmentEditor:function(){this._attachmentEditor=null;var a=f.filter(this._layerInfos,function(a){return a.showAttachments});a&&a.length&&(this._attachmentEditor=new I({"class":"atiAttachmentEditor"},this.attachmentEditor),this._attachmentEditor.startup())},
_setCurrentLInfo:function(a){var b=this._currentLInfo?this._currentLInfo.featureLayer:null,c=a.featureLayer;if(b&&(b.id===c.id&&!b.ownershipBasedAccessControlForFeatures)&&(b=c.getEditCapabilities(),!b.canCreate||b.canUpdate))return;this._currentLInfo=a;this._createTable()},_updateSelection:function(a,b){this._selection=a||[];f.forEach(this._layerInfos,this._getSelection,this);var c=this._selection.length;this._numFeatures=this._selection.length;this._showFeature(c?this._selection[this._featureIdx]:
null,b)},_getSelection:function(a){a=a.featureLayer.getSelectedFeatures();this._selection=this._selection.concat(a)},_updateUI:function(){var a=this._numFeatures,b=this._currentLInfo;this.layerName.innerHTML=!b||0===a?this.NLS_noFeaturesSelected:b.featureLayer?b.featureLayer.name:"";q.set(this.attributeTable,"display",a?"":"none");q.set(this.editButtons,"display",a?"":"none");q.set(this.navButtons,"display",!this._hideNavButtons&&1<a?"":"none");this.navMessage.innerHTML=p.substitute({idx:this._featureIdx+
1,of:this.NLS_of,numFeatures:this._numFeatures},this._navMessage);this._attachmentEditor&&q.set(this._attachmentEditor.domNode,"display",b&&b.showAttachments&&a?"":"none");q.set(this.deleteBtn.domNode,"display",!(b&&!1===b.showDeleteButton)&&this._canDelete?"":"none");this.domNode.parentNode&&0<this.domNode.parentNode.scrollTop&&(this.domNode.parentNode.scrollTop=0)},_onNextFeature:function(a){this._featureIdx+=a;0>this._featureIdx?this._featureIdx=this._numFeatures-1:this._featureIdx>=this._numFeatures&&
(this._featureIdx=0);a=this._selection.length?this._selection[this._featureIdx]:null;this._showFeature(a);this._updateUI();this.onNext(a)},_deleteFeature:function(){this.onDelete(this._currentFeature)},_showFeature:function(a,b){if(a){this._currentFeature=a;var c=b?b:a.getLayer(),d=c.getEditCapabilities({feature:a,userId:this._userIds[c.id]});this._canUpdate=d.canUpdate;this._canDelete=d.canDelete;if(d=this._getLInfoFromFeatureLayer(c)){this._setCurrentLInfo(d);var e=a.attributes,m=this._findFirst(d.types,
"id",e[d.typeIdField]),l=null;f.forEach(d.fieldInfos,function(a){l=a.field;var b=[];a.dijit&&1<a.dijit.length?f.forEach(a.dijit,function(a){b.push(a)}):b.push(a.dijit);f.forEach(b,g.hitch(this,function(a){if(a){var b=this._setFieldDomain(a,m,l),c=e[l.name],c=c&&b&&b.codedValues&&b.codedValues.length?b.codedValues[c]?b.codedValues[c].name:c:c;p.isDefined(c)||(c="");"dijit.form.DateTextBox"===a.declaredClass||"dijit.form.TimeTextBox"===a.declaredClass?c=""===c?null:new Date(c):"dijit.form.FilteringSelect"===
a.declaredClass&&(a._lastValueReported=null,c=e[l.name]+"");try{this._setValue(a,c),"dijit.form.FilteringSelect"===a.declaredClass&&!1===a.isValid()&&this._setValue(a,null)}catch(d){a.set("displayedValue",this.NLS_errorInvalid,!1)}}}))},this);this._attachmentEditor&&d.showAttachments&&this._attachmentEditor.showAttachments(this._currentFeature,c);(c=c.getEditSummary(a))?(this.editorTrackingInfoDiv.innerHTML=c,s.show(this.editorTrackingInfoDiv)):s.hide(this.editorTrackingInfoDiv)}}},_setFieldDomain:function(a,
b,c){if(!a)return null;var d=c.domain;b&&b.domains&&b.domains[c.name]&&!1===b.domains[c.name]instanceof t&&(d=b.domains[c.name]);if(!d)return null;d.codedValues&&0<d.codedValues.length?(a.set("store",this._toStore(f.map(d.codedValues,function(a){return{id:a.code+="",name:a.name}}))),this._setValue(a,d.codedValues[0].code)):(a.constraints={min:p.isDefined(d.minValue)?d.minValue:Number.MIN_VALUE,max:p.isDefined(d.maxValue)?d.maxValue:Number.MAX_VALUE},this._setValue(a,a.constraints.min));return d},
_setValue:function(a,b){a.set&&(a._onChangeActive=!1,a.set("value",b,!0),a._onChangeActive=!0)},_getFields:function(a){var b=a._getOutFields();if(!b)return null;a=a.fields;return"*"==b?a:f.filter(f.map(b,g.hitch(this,"_findFirst",a,"name")),p.isDefined)},_isInFields:function(a,b){return!a||!b&&!b.length?!1:f.some(b,function(b){return b.toLowerCase()===a.toLowerCase()})},_findFirst:function(a,b,c){return(a=f.filter(a,function(a){return a.hasOwnProperty(b)&&a[b]===c}))&&a.length?a[0]:null},_getLInfoFromFeatureLayer:function(a){return this._findFirst(this._layerInfos,
"layerId",a?a.id:null)},_createTable:function(){this._destroyAttributeTable();this.attributeTable.innerHTML="";this._attributes=k.create("table",{cellspacing:"0",cellpadding:"0"},this.attributeTable);var a=k.create("tbody",null,this._attributes),b=this._currentLInfo,c=this._findFirst(b.types,"id",this._currentFeature.attributes[b.typeIdField]);f.forEach(b.fieldInfos,g.hitch(this,"_createField",c,a),this);this._createOnlyFirstTime=!1},_createField:function(a,b,c){var d=this._currentLInfo,e=c.field,
f=!1,l=null,h;if(!this._isInFields(e.name,d.hideFields)&&!this._isInFields(e.name,this._editorTrackingInfos[d.featureLayer.id])){b=k.create("tr",null,b);k.create("td",{innerHTML:c.label||e.alias||e.name,"class":"atiLabel"},b).setAttribute("data-fieldname",e.name);b=k.create("td",null,b);if(c.customField)k.place(c.customField.domNode||c.customField,k.create("div",null,b),"first"),h=c.customField;else if(!1===d.isEditable||!1===e.editable||!1===c.isEditable||"esriFieldTypeOID"===e.type||"esriFieldTypeGlobalID"===
e.type||!this._canUpdate&&!this._createOnlyFirstTime)f=!0;!h&&d.typeIdField&&e.name.toLowerCase()==d.typeIdField.toLowerCase()?h=this._createTypeField(e,c,b):h||(h=this._createDomainField(e,c,a,b));if(!h)switch(e.type){case "esriFieldTypeString":h=this._createStringField(e,c,b);break;case "esriFieldTypeDate":h=this._createDateField(e,c,b);c.format&&c.format.time&&(l=this._createTimeField(e,c,b));break;case "esriFieldTypeInteger":case "esriFieldTypeSmallInteger":h=this._createIntField(e,c,b);break;
case "esriFieldTypeSingle":case "esriFieldTypeDouble":h=this._createFltField(e,c,b);break;default:h=this._createStringField(e,c,b)}c.tooltip&&c.tooltip.length&&this._toolTips.push(new O({connectId:[h.id],label:c.tooltip}));h.onChange=g.hitch(this,"onFieldValueChange",c);h.set("disabled",f);l?(c.dijit=[h,l],l.onChange=g.hitch(this,"onFieldValueChange",c),l.set("disabled",f)):c.dijit=h}},_createTypeField:function(a,b,c){return(b=a.domain)&&"range"===b.type&&b.minValue===b.maxValue?new v({"class":"atiField"},
k.create("div",null,c)):new w({"class":"atiField",name:a.alias||a.name,required:!a.nullable||!1,store:this._toStore(f.map(this._currentLInfo.types,function(a){return{id:a.id,name:a.name}})),searchAttr:"name"},k.create("div",null,c))},_createDomainField:function(a,b,c,d){b=a.domain;c&&c.domains&&c.domains[a.name]&&!1===c.domains[a.name]instanceof t&&(b=c.domains[a.name]);return!b?null:b.codedValues?new w({"class":"atiField",name:a.alias||a.name,searchAttr:"name",required:!a.nullable||!1},k.create("div",
null,d)):new L({"class":"atiField"},k.create("div",null,d))},_createStringField:function(a,b,c){var d={"class":"atiField",trim:!0,maxLength:a.length};return b.stringFieldOption===n.STRING_FIELD_OPTION_TEXTAREA?(d["class"]+=" atiTextAreaField",new M(d,k.create("div",null,c))):b.stringFieldOption===n.STRING_FIELD_OPTION_RICHTEXT?(d["class"]+=" atiRichTextField",d.height="100%",d.width="100%",d.plugins=b.richTextPlugins||"bold italic underline foreColor hiliteColor | justifyLeft justifyCenter justifyRight justifyFull | insertOrderedList insertUnorderedList indent outdent | createLink".split(" "),
a=new G(d,k.create("div",null,c)),a.startup(),a):!a.nullable||!b.field||!b.field.nullable?new x({required:!0},k.create("div",null,c)):new v(d,k.create("div",null,c))},_createTimeField:function(a,b,c){a={"class":"atiField",trim:!0,constraints:{formatLength:"medium"}};this._datePackage&&(a.datePackage=this._datePackage);return new N(a,k.create("div",null,c))},_createDateField:function(a,b,c){a={"class":"atiField",trim:!0};this._datePackage&&(a.datePackage=this._datePackage);return new J(a,k.create("div",
null,c))},_createIntField:function(a,b,c){return new K({"class":"atiField",constraints:"esriFieldTypeSmallInteger"===a.type?{min:-32768,max:32767,places:0}:{places:0},invalidMessage:this.NLS_validationInt,trim:!0},k.create("div",null,c))},_createFltField:function(a,b,c){var d=/\de[-+]?\d/i,e=/[0-9]\d{0,2}(\.\d{3})*(,\d+)?$/i;return new x({validator:function(a,b){this._maskValidSubsetError=!1;this._hasBeenBlurred=!0;return""===a||null===a?!0:d.test(a)?!0:e.test(a)?("min"in b?0<=this.compare(a,b.min):
1)&&("max"in b?0>=this.compare(a,b.max):1)?!0:!1:!1},"class":"atiField",trim:!0,constraints:{places:"0,40",min:-Infinity,max:Infinity,exponent:!0},invalidMessage:this.NLS_validationFlt},k.create("div",null,c))},_toStore:function(a){return new P({data:{identifier:"id",label:"name",items:a}})},_connect:function(a,b,c){this._aiConnects.push(r.connect(a,b,c))},_getDatePackage:function(a){return null===a.datePackage?null:a.datePackage?a.datePackage:"ar"===z.locale?"dojox.date.islamic":null},_destroyAttributeTable:function(){f.forEach(this._layerInfos,
function(a){f.forEach(a.fieldInfos,function(a){var c=a.dijit;if(c){c._onChangeHandle=null;if(a.customField)return;c instanceof Array?f.forEach(c,g.hitch(this,function(a){a.destroyRecursive?a.destroyRecursive():a.destroy&&a.destroy();a._onChangeHandle=null})):c.destroyRecursive?c.destroyRecursive():c.destroy&&c.destroy()}a.dijit=null},this)},this);f.forEach(this._toolTips,function(a){a.destroy()});this._toolTips=[];this._attributes&&k.destroy(this._attributes)}});g.mixin(n,{STRING_FIELD_OPTION_RICHTEXT:"richtext",
STRING_FIELD_OPTION_TEXTAREA:"textarea",STRING_FIELD_OPTION_TEXTBOX:"textbox"});A("extend-esri")&&g.setObject("dijit.AttributeInspector",n,B);return n});