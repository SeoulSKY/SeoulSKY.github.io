const z=0,Y=2;const W=1,X=2;const j=0,Z=9,q=15,J=16,Q=22,$=37,tt=43,et=76,nt=83,st=97,it=100,_t=103,ot=109;class C{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}}class l{constructor(e,i,c,s){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(e.buffer,e.byteOffset+i,c),this._littleEndian=s,this._offset=0}_nextUint8(){const e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){const e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){const e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){const e=this._dataView.getUint32(this._offset,this._littleEndian),i=this._dataView.getUint32(this._offset+4,this._littleEndian),c=e+2**32*i;return this._offset+=8,c}_nextInt32(){const e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,i=0){const c=this._offset;let s=0;for(;this._dataView.getUint8(this._offset)!==i&&s<e;)s++,this._offset++;return s<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+c,s)}}const _=[171,75,84,88,32,50,48,187,13,10,26,10];function g(n){return typeof TextDecoder<"u"?new TextDecoder().decode(n):Buffer.from(n).toString("utf8")}function rt(n){const e=new Uint8Array(n.buffer,n.byteOffset,_.length);if(e[0]!==_[0]||e[1]!==_[1]||e[2]!==_[2]||e[3]!==_[3]||e[4]!==_[4]||e[5]!==_[5]||e[6]!==_[6]||e[7]!==_[7]||e[8]!==_[8]||e[9]!==_[9]||e[10]!==_[10]||e[11]!==_[11])throw new Error("Missing KTX 2.0 identifier.");const i=new C,c=17*Uint32Array.BYTES_PER_ELEMENT,s=new l(n,_.length,c,!0);i.vkFormat=s._nextUint32(),i.typeSize=s._nextUint32(),i.pixelWidth=s._nextUint32(),i.pixelHeight=s._nextUint32(),i.pixelDepth=s._nextUint32(),i.layerCount=s._nextUint32(),i.faceCount=s._nextUint32();const x=s._nextUint32();i.supercompressionScheme=s._nextUint32();const B=s._nextUint32(),K=s._nextUint32(),L=s._nextUint32(),U=s._nextUint32(),d=s._nextUint64(),O=s._nextUint64(),b=x*3*8,R=new l(n,_.length+c,b,!0);for(let r=0;r<x;r++)i.levels.push({levelData:new Uint8Array(n.buffer,n.byteOffset+R._nextUint64(),R._nextUint64()),uncompressedByteLength:R._nextUint64()});const t=new l(n,B,K,!0),h={vendorId:t._skip(4)._nextUint16(),descriptorType:t._nextUint16(),versionNumber:t._nextUint16(),descriptorBlockSize:t._nextUint16(),colorModel:t._nextUint8(),colorPrimaries:t._nextUint8(),transferFunction:t._nextUint8(),flags:t._nextUint8(),texelBlockDimension:[t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8()],bytesPlane:[t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8()],samples:[]},I=6,m=4,w=(h.descriptorBlockSize/4-I)/m;for(let r=0;r<w;r++){const f={bitOffset:t._nextUint16(),bitLength:t._nextUint8(),channelType:t._nextUint8(),samplePosition:[t._nextUint8(),t._nextUint8(),t._nextUint8(),t._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};f.channelType&64?(f.sampleLower=t._nextInt32(),f.sampleUpper=t._nextInt32()):(f.sampleLower=t._nextUint32(),f.sampleUpper=t._nextUint32()),h.samples[r]=f}i.dataFormatDescriptor.length=0,i.dataFormatDescriptor.push(h);const a=new l(n,L,U,!0);for(;a._offset<U;){const r=a._nextUint32(),f=a._scan(r),T=g(f),E=a._scan(r-f.byteLength);i.keyValue[T]=T.match(/^ktx/i)?g(E):E,a._offset%4&&a._skip(4-a._offset%4)}if(O<=0)return i;const o=new l(n,d,O,!0),V=o._nextUint16(),M=o._nextUint16(),p=o._nextUint32(),u=o._nextUint32(),y=o._nextUint32(),H=o._nextUint32(),D=[];for(let r=0;r<x;r++)D.push({imageFlags:o._nextUint32(),rgbSliceByteOffset:o._nextUint32(),rgbSliceByteLength:o._nextUint32(),alphaSliceByteOffset:o._nextUint32(),alphaSliceByteLength:o._nextUint32()});const A=d+o._offset,F=A+p,S=F+u,N=S+y,P=new Uint8Array(n.buffer,n.byteOffset+A,p),v=new Uint8Array(n.buffer,n.byteOffset+F,u),k=new Uint8Array(n.buffer,n.byteOffset+S,y),G=new Uint8Array(n.buffer,n.byteOffset+N,H);return i.globalData={endpointCount:V,selectorCount:M,imageDescs:D,endpointsData:P,selectorsData:v,tablesData:k,extendedData:G},i}export{X as K,j as V,W as a,z as b,Y as c,ot as d,st as e,$ as f,tt as g,_t as h,nt as i,J as j,Q as k,it as l,et as m,q as n,Z as o,rt as r};
