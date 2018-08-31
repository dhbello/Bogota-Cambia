//>>built
define("esri/layers/rasterFormats/LercCodec",[],function(){var L={defaultNoDataValue:-3.4027999387901484E38,decode:function(e,p){var y;p=p||{};var c=p.inputOffset||0,g=p.encodedMaskData||null===p.encodedMaskData,a={},b=new Uint8Array(e,c,10);a.fileIdentifierString=String.fromCharCode.apply(null,b);if("CntZImage"!=a.fileIdentifierString.trim())throw"Unexpected file identifier string: "+a.fileIdentifierString;c+=10;b=new DataView(e,c,24);a.fileVersion=b.getInt32(0,!0);a.imageType=b.getInt32(4,!0);a.height=
b.getUint32(8,!0);a.width=b.getUint32(12,!0);a.maxZError=b.getFloat64(16,!0);c+=24;if(!g)if(b=new DataView(e,c,16),a.mask={},a.mask.numBlocksY=b.getUint32(0,!0),a.mask.numBlocksX=b.getUint32(4,!0),a.mask.numBytes=b.getUint32(8,!0),a.mask.maxValue=b.getFloat32(12,!0),c+=16,0<a.mask.numBytes){var g=new Uint8Array(Math.ceil(a.width*a.height/8)),b=new DataView(e,c,a.mask.numBytes),k=b.getInt16(0,!0),v=2,w=0;do{if(0<k)for(;k--;)g[w++]=b.getUint8(v++);else for(var z=b.getUint8(v++),k=-k;k--;)g[w++]=z;k=
b.getInt16(v,!0);v+=2}while(v<a.mask.numBytes);if(-32768!==k||w<g.length)throw"Unexpected end of mask RLE encoding";a.mask.bitset=g;c+=a.mask.numBytes}else 0===(a.mask.numBytes|a.mask.numBlocksY|a.mask.maxValue)&&(g=new Uint8Array(Math.ceil(a.width*a.height/8)),a.mask.bitset=g);b=new DataView(e,c,16);a.pixels={};a.pixels.numBlocksY=b.getUint32(0,!0);a.pixels.numBlocksX=b.getUint32(4,!0);a.pixels.numBytes=b.getUint32(8,!0);a.pixels.maxValue=b.getFloat32(12,!0);c+=16;g=a.pixels.numBlocksX;b=a.pixels.numBlocksY;
g+=0<a.width%g?1:0;k=b+(0<a.height%b?1:0);a.pixels.blocks=Array(g*k);for(w=v=0;w<k;w++)for(z=0;z<g;z++){var h=0,b=new DataView(e,c,Math.min(10,e.byteLength-c)),f={};a.pixels.blocks[v++]=f;var d=b.getUint8(0);h++;f.encoding=d&63;if(3<f.encoding)throw"Invalid block encoding ("+f.encoding+")";if(2===f.encoding)c++;else{if(0!==d&&2!==d){d>>=6;f.offsetType=d;if(2===d)f.offset=b.getInt8(1),h++;else if(1===d)f.offset=b.getInt16(1,!0),h+=2;else if(0===d)f.offset=b.getFloat32(1,!0),h+=4;else throw"Invalid block offset type";
if(1===f.encoding)if(d=b.getUint8(h),h++,f.bitsPerPixel=d&63,d>>=6,f.numValidPixelsType=d,2===d)f.numValidPixels=b.getUint8(h),h++;else if(1===d)f.numValidPixels=b.getUint16(h,!0),h+=2;else if(0===d)f.numValidPixels=b.getUint32(h,!0),h+=4;else throw"Invalid valid pixel count type";}c+=h;if(3!=f.encoding)if(0===f.encoding){d=(a.pixels.numBytes-1)/4;if(d!==Math.floor(d))throw"uncompressed block has invalid length";b=new ArrayBuffer(4*d);h=new Uint8Array(b);h.set(new Uint8Array(e,c,4*d));b=new Float32Array(b);
f.rawData=b;c+=4*d}else 1===f.encoding&&(d=Math.ceil(f.numValidPixels*f.bitsPerPixel/8),b=Math.ceil(d/4),b=new ArrayBuffer(4*b),h=new Uint8Array(b),h.set(new Uint8Array(e,c,d)),f.stuffedData=new Uint32Array(b),c+=d)}}a.eofOffset=c;var c=null!=p.noDataValue?p.noDataValue:L.defaultNoDataValue,k=p.encodedMaskData,F=p.returnMask,v=0,w=a.pixels.numBlocksX,z=a.pixels.numBlocksY,f=Math.floor(a.width/w),h=Math.floor(a.height/z),d=2*a.maxZError,g=Number.MAX_VALUE,x,k=k||(a.mask?a.mask.bitset:null),r,b=new (p.pixelType||
Float32Array)(a.width*a.height);F&&k&&(r=new Uint8Array(a.width*a.height));for(var F=new Float32Array(f*h),s,t,G=0;G<=z;G++){var H=G!==z?h:a.height%z;if(0!==H)for(var I=0;I<=w;I++){var D=I!==w?f:a.width%w;if(0!==D){var l=G*a.width*h+I*f,J=a.width-D,q=a.pixels.blocks[v],m,n;if(2>q.encoding){if(0===q.encoding)m=q.rawData;else{m=q.stuffedData;n=q.bitsPerPixel;x=q.numValidPixels;s=q.offset;t=d;var O=F,M=a.pixels.maxValue,K=(1<<n)-1,N=0,B=void 0,u=0,C=void 0,E=void 0,P=Math.ceil((M-s)/t),B=4*m.length-
Math.ceil(n*x/8);m[m.length-1]<<=8*B;for(B=0;B<x;B++)0===u&&(E=m[N++],u=32),u>=n?(C=E>>>u-n&K,u-=n):(u=n-u,C=(E&K)<<u&K,E=m[N++],u=32-u,C+=E>>>u),O[B]=C<P?s+C*t:M;m=F}n=0}else y=2===q.encoding?0:q.offset;var A;if(k)for(t=0;t<H;t++){l&7&&(A=k[l>>3],A<<=l&7);for(s=0;s<D;s++)l&7||(A=k[l>>3]),A&128?(r&&(r[l]=1),x=2>q.encoding?m[n++]:y,g=g>x?x:g,b[l++]=x):(r&&(r[l]=0),b[l++]=c),A<<=1;l+=J}else if(2>q.encoding)for(t=0;t<H;t++){for(s=0;s<D;s++)x=m[n++],g=g>x?x:g,b[l++]=x;l+=J}else{g=g>y?y:g;for(t=0;t<H;t++){for(s=
0;s<D;s++)b[l++]=y;l+=J}}if(1===q.encoding&&n!==q.numValidPixels)throw"Block and Mask do not match";v++}}}y=r;r={width:a.width,height:a.height,pixelData:b,minValue:g,maxValue:a.pixels.maxValue,noDataValue:c};y&&(r.maskData=y);p.returnEncodedMask&&a.mask&&(r.encodedMaskData=a.mask.bitset?a.mask.bitset:null);if(p.returnFileInfo&&(r.fileInfo=Q(a),p.computeUsedBitDepths)){y=r.fileInfo;A=a.pixels.numBlocksX*a.pixels.numBlocksY;m={};for(n=0;n<A;n++)c=a.pixels.blocks[n],0===c.encoding?m.float32=!0:1===c.encoding?
m[c.bitsPerPixel]=!0:m[0]=!0;a=Object.keys(m);y.bitDepths=a}return r}},Q=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,
noDataValue:this.noDataValue}}};return L});