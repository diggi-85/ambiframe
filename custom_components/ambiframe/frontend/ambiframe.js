var Jl=Object.create;var ba=Object.defineProperty;var Xl=Object.getOwnPropertyDescriptor;var ed=Object.getOwnPropertyNames;var td=Object.getPrototypeOf,id=Object.prototype.hasOwnProperty;var nd=(t,i,e)=>i in t?ba(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var ad=(t,i)=>()=>{try{return i||t((i={exports:{}}).exports,i),i.exports}catch(e){throw i=0,e}};var rd=(t,i,e,n)=>{if(i&&typeof i=="object"||typeof i=="function")for(let a of ed(i))!id.call(t,a)&&a!==e&&ba(t,a,{get:()=>i[a],enumerable:!(n=Xl(i,a))||n.enumerable});return t};var qr=(t,i,e)=>(e=t!=null?Jl(td(t)):{},rd(i||!t||!t.__esModule?ba(e,"default",{value:t,enumerable:!0}):e,t));var Be=(t,i,e)=>nd(t,typeof i!="symbol"?i+"":i,e);var Za=ad((io,no)=>{var to=(function(){var t=function(T,I){var S=236,L=17,k=T,N=e[I],w=null,y=0,M=null,_=[],A={},q=function(E,z){y=k*4+17,w=(function(x){for(var C=new Array(x),D=0;D<x;D+=1){C[D]=new Array(x);for(var O=0;O<x;O+=1)C[D][O]=null}return C})(y),Y(0,0),Y(y-7,0),Y(0,y-7),fe(),ue(),Ye(E,z),k>=7&&Pe(E),M==null&&(M=Yl(k,N,_)),Qe(M,z)},Y=function(E,z){for(var x=-1;x<=7;x+=1)if(!(E+x<=-1||y<=E+x))for(var C=-1;C<=7;C+=1)z+C<=-1||y<=z+C||(0<=x&&x<=6&&(C==0||C==6)||0<=C&&C<=6&&(x==0||x==6)||2<=x&&x<=4&&2<=C&&C<=4?w[E+x][z+C]=!0:w[E+x][z+C]=!1)},ae=function(){for(var E=0,z=0,x=0;x<8;x+=1){q(!0,x);var C=a.getLostPoint(A);(x==0||E>C)&&(E=C,z=x)}return z},ue=function(){for(var E=8;E<y-8;E+=1)w[E][6]==null&&(w[E][6]=E%2==0);for(var z=8;z<y-8;z+=1)w[6][z]==null&&(w[6][z]=z%2==0)},fe=function(){for(var E=a.getPatternPosition(k),z=0;z<E.length;z+=1)for(var x=0;x<E.length;x+=1){var C=E[z],D=E[x];if(w[C][D]==null)for(var O=-2;O<=2;O+=1)for(var U=-2;U<=2;U+=1)O==-2||O==2||U==-2||U==2||O==0&&U==0?w[C+O][D+U]=!0:w[C+O][D+U]=!1}},Pe=function(E){for(var z=a.getBCHTypeNumber(k),x=0;x<18;x+=1){var C=!E&&(z>>x&1)==1;w[Math.floor(x/3)][x%3+y-8-3]=C}for(var x=0;x<18;x+=1){var C=!E&&(z>>x&1)==1;w[x%3+y-8-3][Math.floor(x/3)]=C}},Ye=function(E,z){for(var x=N<<3|z,C=a.getBCHTypeInfo(x),D=0;D<15;D+=1){var O=!E&&(C>>D&1)==1;D<6?w[D][8]=O:D<8?w[D+1][8]=O:w[y-15+D][8]=O}for(var D=0;D<15;D+=1){var O=!E&&(C>>D&1)==1;D<8?w[8][y-D-1]=O:D<9?w[8][15-D-1+1]=O:w[8][15-D-1]=O}w[y-8][8]=!E},Qe=function(E,z){for(var x=-1,C=y-1,D=7,O=0,U=a.getMaskFunction(z),j=y-1;j>0;j-=2)for(j==6&&(j-=1);;){for(var de=0;de<2;de+=1)if(w[C][j-de]==null){var me=!1;O<E.length&&(me=(E[O]>>>D&1)==1);var Z=U(C,j-de);Z&&(me=!me),w[C][j-de]=me,D-=1,D==-1&&(O+=1,D=7)}if(C+=x,C<0||y<=C){C-=x,x=-x;break}}},Mt=function(E,z){for(var x=0,C=0,D=0,O=new Array(z.length),U=new Array(z.length),j=0;j<z.length;j+=1){var de=z[j].dataCount,me=z[j].totalCount-de;C=Math.max(C,de),D=Math.max(D,me),O[j]=new Array(de);for(var Z=0;Z<O[j].length;Z+=1)O[j][Z]=255&E.getBuffer()[Z+x];x+=de;var Ie=a.getErrorCorrectPolynomial(me),Fe=s(O[j],Ie.getLength()-1),jr=Fe.mod(Ie);U[j]=new Array(Ie.getLength()-1);for(var Z=0;Z<U[j].length;Z+=1){var Gr=Z+jr.getLength()-U[j].length;U[j][Z]=Gr>=0?jr.getAt(Gr):0}}for(var Ur=0,Z=0;Z<z.length;Z+=1)Ur+=z[Z].totalCount;for(var fa=new Array(Ur),Zi=0,Z=0;Z<C;Z+=1)for(var j=0;j<z.length;j+=1)Z<O[j].length&&(fa[Zi]=O[j][Z],Zi+=1);for(var Z=0;Z<D;Z+=1)for(var j=0;j<z.length;j+=1)Z<U[j].length&&(fa[Zi]=U[j][Z],Zi+=1);return fa},Yl=function(E,z,x){for(var C=o.getRSBlocks(E,z),D=l(),O=0;O<x.length;O+=1){var U=x[O];D.put(U.getMode(),4),D.put(U.getLength(),a.getLengthInBits(U.getMode(),E)),U.write(D)}for(var j=0,O=0;O<C.length;O+=1)j+=C[O].dataCount;if(D.getLengthInBits()>j*8)throw"code length overflow. ("+D.getLengthInBits()+">"+j*8+")";for(D.getLengthInBits()+4<=j*8&&D.put(0,4);D.getLengthInBits()%8!=0;)D.putBit(!1);for(;!(D.getLengthInBits()>=j*8||(D.put(S,8),D.getLengthInBits()>=j*8));)D.put(L,8);return Mt(D,C)};A.addData=function(E,z){z=z||"Byte";var x=null;switch(z){case"Numeric":x=c(E);break;case"Alphanumeric":x=h(E);break;case"Byte":x=p(E);break;case"Kanji":x=g(E);break;default:throw"mode:"+z}_.push(x),M=null},A.isDark=function(E,z){if(E<0||y<=E||z<0||y<=z)throw E+","+z;return w[E][z]},A.getModuleCount=function(){return y},A.make=function(){if(k<1){for(var E=1;E<40;E++){for(var z=o.getRSBlocks(E,N),x=l(),C=0;C<_.length;C++){var D=_[C];x.put(D.getMode(),4),x.put(D.getLength(),a.getLengthInBits(D.getMode(),E)),D.write(x)}for(var O=0,C=0;C<z.length;C++)O+=z[C].dataCount;if(x.getLengthInBits()<=O*8)break}k=E}q(!1,ae())},A.createTableTag=function(E,z){E=E||2,z=typeof z>"u"?E*4:z;var x="";x+='<table style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: "+z+"px;",x+='">',x+="<tbody>";for(var C=0;C<A.getModuleCount();C+=1){x+="<tr>";for(var D=0;D<A.getModuleCount();D+=1)x+='<td style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: 0px;",x+=" width: "+E+"px;",x+=" height: "+E+"px;",x+=" background-color: ",x+=A.isDark(C,D)?"#000000":"#ffffff",x+=";",x+='"/>';x+="</tr>"}return x+="</tbody>",x+="</table>",x},A.createSvgTag=function(E,z,x,C){var D={};typeof arguments[0]=="object"&&(D=arguments[0],E=D.cellSize,z=D.margin,x=D.alt,C=D.title),E=E||2,z=typeof z>"u"?E*4:z,x=typeof x=="string"?{text:x}:x||{},x.text=x.text||null,x.id=x.text?x.id||"qrcode-description":null,C=typeof C=="string"?{text:C}:C||{},C.text=C.text||null,C.id=C.text?C.id||"qrcode-title":null;var O=A.getModuleCount()*E+z*2,U,j,de,me,Z="",Ie;for(Ie="l"+E+",0 0,"+E+" -"+E+",0 0,-"+E+"z ",Z+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',Z+=D.scalable?"":' width="'+O+'px" height="'+O+'px"',Z+=' viewBox="0 0 '+O+" "+O+'" ',Z+=' preserveAspectRatio="xMinYMin meet"',Z+=C.text||x.text?' role="img" aria-labelledby="'+Pt([C.id,x.id].join(" ").trim())+'"':"",Z+=">",Z+=C.text?'<title id="'+Pt(C.id)+'">'+Pt(C.text)+"</title>":"",Z+=x.text?'<description id="'+Pt(x.id)+'">'+Pt(x.text)+"</description>":"",Z+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',Z+='<path d="',de=0;de<A.getModuleCount();de+=1)for(me=de*E+z,U=0;U<A.getModuleCount();U+=1)A.isDark(de,U)&&(j=U*E+z,Z+="M"+j+","+me+Ie);return Z+='" stroke="transparent" fill="black"/>',Z+="</svg>",Z},A.createDataURL=function(E,z){E=E||2,z=typeof z>"u"?E*4:z;var x=A.getModuleCount()*E+z*2,C=z,D=x-z;return P(x,x,function(O,U){if(C<=O&&O<D&&C<=U&&U<D){var j=Math.floor((O-C)/E),de=Math.floor((U-C)/E);return A.isDark(de,j)?0:1}else return 1})},A.createImgTag=function(E,z,x){E=E||2,z=typeof z>"u"?E*4:z;var C=A.getModuleCount()*E+z*2,D="";return D+="<img",D+=' src="',D+=A.createDataURL(E,z),D+='"',D+=' width="',D+=C,D+='"',D+=' height="',D+=C,D+='"',x&&(D+=' alt="',D+=Pt(x),D+='"'),D+="/>",D};var Pt=function(E){for(var z="",x=0;x<E.length;x+=1){var C=E.charAt(x);switch(C){case"<":z+="&lt;";break;case">":z+="&gt;";break;case"&":z+="&amp;";break;case'"':z+="&quot;";break;default:z+=C;break}}return z},Ql=function(E){var z=1;E=typeof E>"u"?z*2:E;var x=A.getModuleCount()*z+E*2,C=E,D=x-E,O,U,j,de,me,Z={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},Ie={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},Fe="";for(O=0;O<x;O+=2){for(j=Math.floor((O-C)/z),de=Math.floor((O+1-C)/z),U=0;U<x;U+=1)me="\u2588",C<=U&&U<D&&C<=O&&O<D&&A.isDark(j,Math.floor((U-C)/z))&&(me=" "),C<=U&&U<D&&C<=O+1&&O+1<D&&A.isDark(de,Math.floor((U-C)/z))?me+=" ":me+="\u2588",Fe+=E<1&&O+1>=D?Ie[me]:Z[me];Fe+=`
`}return x%2&&E>0?Fe.substring(0,Fe.length-x-1)+Array(x+1).join("\u2580"):Fe.substring(0,Fe.length-1)};return A.createASCII=function(E,z){if(E=E||1,E<2)return Ql(z);E-=1,z=typeof z>"u"?E*2:z;var x=A.getModuleCount()*E+z*2,C=z,D=x-z,O,U,j,de,me=Array(E+1).join("\u2588\u2588"),Z=Array(E+1).join("  "),Ie="",Fe="";for(O=0;O<x;O+=1){for(j=Math.floor((O-C)/E),Fe="",U=0;U<x;U+=1)de=1,C<=U&&U<D&&C<=O&&O<D&&A.isDark(j,Math.floor((U-C)/E))&&(de=0),Fe+=de?me:Z;for(j=0;j<E;j+=1)Ie+=Fe+`
`}return Ie.substring(0,Ie.length-1)},A.renderTo2dContext=function(E,z){z=z||2;for(var x=A.getModuleCount(),C=0;C<x;C++)for(var D=0;D<x;D++)E.fillStyle=A.isDark(C,D)?"black":"white",E.fillRect(C*z,D*z,z,z)},A};t.stringToBytesFuncs={default:function(T){for(var I=[],S=0;S<T.length;S+=1){var L=T.charCodeAt(S);I.push(L&255)}return I}},t.stringToBytes=t.stringToBytesFuncs.default,t.createStringToBytes=function(T,I){var S=(function(){for(var k=v(T),N=function(){var ue=k.read();if(ue==-1)throw"eof";return ue},w=0,y={};;){var M=k.read();if(M==-1)break;var _=N(),A=N(),q=N(),Y=String.fromCharCode(M<<8|_),ae=A<<8|q;y[Y]=ae,w+=1}if(w!=I)throw w+" != "+I;return y})(),L=63;return function(k){for(var N=[],w=0;w<k.length;w+=1){var y=k.charCodeAt(w);if(y<128)N.push(y);else{var M=S[k.charAt(w)];typeof M=="number"?(M&255)==M?N.push(M):(N.push(M>>>8),N.push(M&255)):N.push(L)}}return N}};var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a=(function(){var T=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],I=1335,S=7973,L=21522,k={},N=function(w){for(var y=0;w!=0;)y+=1,w>>>=1;return y};return k.getBCHTypeInfo=function(w){for(var y=w<<10;N(y)-N(I)>=0;)y^=I<<N(y)-N(I);return(w<<10|y)^L},k.getBCHTypeNumber=function(w){for(var y=w<<12;N(y)-N(S)>=0;)y^=S<<N(y)-N(S);return w<<12|y},k.getPatternPosition=function(w){return T[w-1]},k.getMaskFunction=function(w){switch(w){case n.PATTERN000:return function(y,M){return(y+M)%2==0};case n.PATTERN001:return function(y,M){return y%2==0};case n.PATTERN010:return function(y,M){return M%3==0};case n.PATTERN011:return function(y,M){return(y+M)%3==0};case n.PATTERN100:return function(y,M){return(Math.floor(y/2)+Math.floor(M/3))%2==0};case n.PATTERN101:return function(y,M){return y*M%2+y*M%3==0};case n.PATTERN110:return function(y,M){return(y*M%2+y*M%3)%2==0};case n.PATTERN111:return function(y,M){return(y*M%3+(y+M)%2)%2==0};default:throw"bad maskPattern:"+w}},k.getErrorCorrectPolynomial=function(w){for(var y=s([1],0),M=0;M<w;M+=1)y=y.multiply(s([1,r.gexp(M)],0));return y},k.getLengthInBits=function(w,y){if(1<=y&&y<10)switch(w){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:return 8;case i.MODE_KANJI:return 8;default:throw"mode:"+w}else if(y<27)switch(w){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw"mode:"+w}else if(y<41)switch(w){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw"mode:"+w}else throw"type:"+y},k.getLostPoint=function(w){for(var y=w.getModuleCount(),M=0,_=0;_<y;_+=1)for(var A=0;A<y;A+=1){for(var q=0,Y=w.isDark(_,A),ae=-1;ae<=1;ae+=1)if(!(_+ae<0||y<=_+ae))for(var ue=-1;ue<=1;ue+=1)A+ue<0||y<=A+ue||ae==0&&ue==0||Y==w.isDark(_+ae,A+ue)&&(q+=1);q>5&&(M+=3+q-5)}for(var _=0;_<y-1;_+=1)for(var A=0;A<y-1;A+=1){var fe=0;w.isDark(_,A)&&(fe+=1),w.isDark(_+1,A)&&(fe+=1),w.isDark(_,A+1)&&(fe+=1),w.isDark(_+1,A+1)&&(fe+=1),(fe==0||fe==4)&&(M+=3)}for(var _=0;_<y;_+=1)for(var A=0;A<y-6;A+=1)w.isDark(_,A)&&!w.isDark(_,A+1)&&w.isDark(_,A+2)&&w.isDark(_,A+3)&&w.isDark(_,A+4)&&!w.isDark(_,A+5)&&w.isDark(_,A+6)&&(M+=40);for(var A=0;A<y;A+=1)for(var _=0;_<y-6;_+=1)w.isDark(_,A)&&!w.isDark(_+1,A)&&w.isDark(_+2,A)&&w.isDark(_+3,A)&&w.isDark(_+4,A)&&!w.isDark(_+5,A)&&w.isDark(_+6,A)&&(M+=40);for(var Pe=0,A=0;A<y;A+=1)for(var _=0;_<y;_+=1)w.isDark(_,A)&&(Pe+=1);var Ye=Math.abs(100*Pe/y/y-50)/5;return M+=Ye*10,M},k})(),r=(function(){for(var T=new Array(256),I=new Array(256),S=0;S<8;S+=1)T[S]=1<<S;for(var S=8;S<256;S+=1)T[S]=T[S-4]^T[S-5]^T[S-6]^T[S-8];for(var S=0;S<255;S+=1)I[T[S]]=S;var L={};return L.glog=function(k){if(k<1)throw"glog("+k+")";return I[k]},L.gexp=function(k){for(;k<0;)k+=255;for(;k>=256;)k-=255;return T[k]},L})();function s(T,I){if(typeof T.length>"u")throw T.length+"/"+I;var S=(function(){for(var k=0;k<T.length&&T[k]==0;)k+=1;for(var N=new Array(T.length-k+I),w=0;w<T.length-k;w+=1)N[w]=T[w+k];return N})(),L={};return L.getAt=function(k){return S[k]},L.getLength=function(){return S.length},L.multiply=function(k){for(var N=new Array(L.getLength()+k.getLength()-1),w=0;w<L.getLength();w+=1)for(var y=0;y<k.getLength();y+=1)N[w+y]^=r.gexp(r.glog(L.getAt(w))+r.glog(k.getAt(y)));return s(N,0)},L.mod=function(k){if(L.getLength()-k.getLength()<0)return L;for(var N=r.glog(L.getAt(0))-r.glog(k.getAt(0)),w=new Array(L.getLength()),y=0;y<L.getLength();y+=1)w[y]=L.getAt(y);for(var y=0;y<k.getLength();y+=1)w[y]^=r.gexp(r.glog(k.getAt(y))+N);return s(w,0).mod(k)},L}var o=(function(){var T=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],I=function(k,N){var w={};return w.totalCount=k,w.dataCount=N,w},S={},L=function(k,N){switch(N){case e.L:return T[(k-1)*4+0];case e.M:return T[(k-1)*4+1];case e.Q:return T[(k-1)*4+2];case e.H:return T[(k-1)*4+3];default:return}};return S.getRSBlocks=function(k,N){var w=L(k,N);if(typeof w>"u")throw"bad rs block @ typeNumber:"+k+"/errorCorrectionLevel:"+N;for(var y=w.length/3,M=[],_=0;_<y;_+=1)for(var A=w[_*3+0],q=w[_*3+1],Y=w[_*3+2],ae=0;ae<A;ae+=1)M.push(I(q,Y));return M},S})(),l=function(){var T=[],I=0,S={};return S.getBuffer=function(){return T},S.getAt=function(L){var k=Math.floor(L/8);return(T[k]>>>7-L%8&1)==1},S.put=function(L,k){for(var N=0;N<k;N+=1)S.putBit((L>>>k-N-1&1)==1)},S.getLengthInBits=function(){return I},S.putBit=function(L){var k=Math.floor(I/8);T.length<=k&&T.push(0),L&&(T[k]|=128>>>I%8),I+=1},S},c=function(T){var I=i.MODE_NUMBER,S=T,L={};L.getMode=function(){return I},L.getLength=function(w){return S.length},L.write=function(w){for(var y=S,M=0;M+2<y.length;)w.put(k(y.substring(M,M+3)),10),M+=3;M<y.length&&(y.length-M==1?w.put(k(y.substring(M,M+1)),4):y.length-M==2&&w.put(k(y.substring(M,M+2)),7))};var k=function(w){for(var y=0,M=0;M<w.length;M+=1)y=y*10+N(w.charAt(M));return y},N=function(w){if("0"<=w&&w<="9")return w.charCodeAt(0)-48;throw"illegal char :"+w};return L},h=function(T){var I=i.MODE_ALPHA_NUM,S=T,L={};L.getMode=function(){return I},L.getLength=function(N){return S.length},L.write=function(N){for(var w=S,y=0;y+1<w.length;)N.put(k(w.charAt(y))*45+k(w.charAt(y+1)),11),y+=2;y<w.length&&N.put(k(w.charAt(y)),6)};var k=function(N){if("0"<=N&&N<="9")return N.charCodeAt(0)-48;if("A"<=N&&N<="Z")return N.charCodeAt(0)-65+10;switch(N){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+N}};return L},p=function(T){var I=i.MODE_8BIT_BYTE,S=T,L=t.stringToBytes(T),k={};return k.getMode=function(){return I},k.getLength=function(N){return L.length},k.write=function(N){for(var w=0;w<L.length;w+=1)N.put(L[w],8)},k},g=function(T){var I=i.MODE_KANJI,S=T,L=t.stringToBytesFuncs.SJIS;if(!L)throw"sjis not supported.";(function(w,y){var M=L(w);if(M.length!=2||(M[0]<<8|M[1])!=y)throw"sjis not supported."})("\u53CB",38726);var k=L(T),N={};return N.getMode=function(){return I},N.getLength=function(w){return~~(k.length/2)},N.write=function(w){for(var y=k,M=0;M+1<y.length;){var _=(255&y[M])<<8|255&y[M+1];if(33088<=_&&_<=40956)_-=33088;else if(57408<=_&&_<=60351)_-=49472;else throw"illegal char at "+(M+1)+"/"+_;_=(_>>>8&255)*192+(_&255),w.put(_,13),M+=2}if(M<y.length)throw"illegal char at "+(M+1)},N},b=function(){var T=[],I={};return I.writeByte=function(S){T.push(S&255)},I.writeShort=function(S){I.writeByte(S),I.writeByte(S>>>8)},I.writeBytes=function(S,L,k){L=L||0,k=k||S.length;for(var N=0;N<k;N+=1)I.writeByte(S[N+L])},I.writeString=function(S){for(var L=0;L<S.length;L+=1)I.writeByte(S.charCodeAt(L))},I.toByteArray=function(){return T},I.toString=function(){var S="";S+="[";for(var L=0;L<T.length;L+=1)L>0&&(S+=","),S+=T[L];return S+="]",S},I},f=function(){var T=0,I=0,S=0,L="",k={},N=function(y){L+=String.fromCharCode(w(y&63))},w=function(y){if(!(y<0)){if(y<26)return 65+y;if(y<52)return 97+(y-26);if(y<62)return 48+(y-52);if(y==62)return 43;if(y==63)return 47}throw"n:"+y};return k.writeByte=function(y){for(T=T<<8|y&255,I+=8,S+=1;I>=6;)N(T>>>I-6),I-=6},k.flush=function(){if(I>0&&(N(T<<6-I),T=0,I=0),S%3!=0)for(var y=3-S%3,M=0;M<y;M+=1)L+="="},k.toString=function(){return L},k},v=function(T){var I=T,S=0,L=0,k=0,N={};N.read=function(){for(;k<8;){if(S>=I.length){if(k==0)return-1;throw"unexpected end of file./"+k}var y=I.charAt(S);if(S+=1,y=="=")return k=0,-1;if(y.match(/^\s$/))continue;L=L<<6|w(y.charCodeAt(0)),k+=6}var M=L>>>k-8&255;return k-=8,M};var w=function(y){if(65<=y&&y<=90)return y-65;if(97<=y&&y<=122)return y-97+26;if(48<=y&&y<=57)return y-48+52;if(y==43)return 62;if(y==47)return 63;throw"c:"+y};return N},$=function(T,I){var S=T,L=I,k=new Array(T*I),N={};N.setPixel=function(_,A,q){k[A*S+_]=q},N.write=function(_){_.writeString("GIF87a"),_.writeShort(S),_.writeShort(L),_.writeByte(128),_.writeByte(0),_.writeByte(0),_.writeByte(0),_.writeByte(0),_.writeByte(0),_.writeByte(255),_.writeByte(255),_.writeByte(255),_.writeString(","),_.writeShort(0),_.writeShort(0),_.writeShort(S),_.writeShort(L),_.writeByte(0);var A=2,q=y(A);_.writeByte(A);for(var Y=0;q.length-Y>255;)_.writeByte(255),_.writeBytes(q,Y,255),Y+=255;_.writeByte(q.length-Y),_.writeBytes(q,Y,q.length-Y),_.writeByte(0),_.writeString(";")};var w=function(_){var A=_,q=0,Y=0,ae={};return ae.write=function(ue,fe){if(ue>>>fe)throw"length over";for(;q+fe>=8;)A.writeByte(255&(ue<<q|Y)),fe-=8-q,ue>>>=8-q,Y=0,q=0;Y=ue<<q|Y,q=q+fe},ae.flush=function(){q>0&&A.writeByte(Y)},ae},y=function(_){for(var A=1<<_,q=(1<<_)+1,Y=_+1,ae=M(),ue=0;ue<A;ue+=1)ae.add(String.fromCharCode(ue));ae.add(String.fromCharCode(A)),ae.add(String.fromCharCode(q));var fe=b(),Pe=w(fe);Pe.write(A,Y);var Ye=0,Qe=String.fromCharCode(k[Ye]);for(Ye+=1;Ye<k.length;){var Mt=String.fromCharCode(k[Ye]);Ye+=1,ae.contains(Qe+Mt)?Qe=Qe+Mt:(Pe.write(ae.indexOf(Qe),Y),ae.size()<4095&&(ae.size()==1<<Y&&(Y+=1),ae.add(Qe+Mt)),Qe=Mt)}return Pe.write(ae.indexOf(Qe),Y),Pe.write(q,Y),Pe.flush(),fe.toByteArray()},M=function(){var _={},A=0,q={};return q.add=function(Y){if(q.contains(Y))throw"dup key:"+Y;_[Y]=A,A+=1},q.size=function(){return A},q.indexOf=function(Y){return _[Y]},q.contains=function(Y){return typeof _[Y]<"u"},q};return N},P=function(T,I,S){for(var L=$(T,I),k=0;k<I;k+=1)for(var N=0;N<T;N+=1)L.setPixel(N,k,S(N,k));var w=b();L.write(w);for(var y=f(),M=w.toByteArray(),_=0;_<M.length;_+=1)y.writeByte(M[_]);return y.flush(),"data:image/gif;base64,"+y};return t})();(function(){to.stringToBytesFuncs["UTF-8"]=function(t){function i(e){for(var n=[],a=0;a<e.length;a++){var r=e.charCodeAt(a);r<128?n.push(r):r<2048?n.push(192|r>>6,128|r&63):r<55296||r>=57344?n.push(224|r>>12,128|r>>6&63,128|r&63):(a++,r=65536+((r&1023)<<10|e.charCodeAt(a)&1023),n.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63))}return n}return i(t)}})();(function(t){typeof define=="function"&&define.amd?define([],t):typeof io=="object"&&(no.exports=t())})(function(){return to})});var Zr=[{id:"fraunces",name:"Fraunces",kind:"serif",pkg:"@fontsource-variable/fraunces",file:"fraunces-latin-full-normal.woff2",weight:"100 900"},{id:"newsreader",name:"Newsreader",kind:"serif",pkg:"@fontsource-variable/newsreader",file:"newsreader-latin-opsz-normal.woff2",weight:"200 800"},{id:"instrument",name:"Instrument Serif",kind:"serif",pkg:"@fontsource/instrument-serif",file:"instrument-serif-latin-400-normal.woff2",weight:"400"},{id:"playfair",name:"Playfair Display",kind:"serif",pkg:"@fontsource-variable/playfair-display",file:"playfair-display-latin-wght-normal.woff2",weight:"400 900"},{id:"cormorant",name:"Cormorant Garamond",kind:"serif",pkg:"@fontsource-variable/cormorant-garamond",file:"cormorant-garamond-latin-wght-normal.woff2",weight:"300 700"},{id:"inter",name:"Inter",kind:"sans",pkg:"@fontsource-variable/inter",file:"inter-latin-opsz-normal.woff2",weight:"100 900"},{id:"geist",name:"Geist",kind:"sans",pkg:"@fontsource-variable/geist",file:"geist-latin-wght-normal.woff2",weight:"100 900"},{id:"manrope",name:"Manrope",kind:"sans",pkg:"@fontsource-variable/manrope",file:"manrope-latin-wght-normal.woff2",weight:"200 800"},{id:"outfit",name:"Outfit",kind:"sans",pkg:"@fontsource-variable/outfit",file:"outfit-latin-wght-normal.woff2",weight:"100 900"},{id:"jakarta",name:"Plus Jakarta Sans",kind:"sans",pkg:"@fontsource-variable/plus-jakarta-sans",file:"plus-jakarta-sans-latin-wght-normal.woff2",weight:"200 800"},{id:"space-grotesk",name:"Space Grotesk",kind:"sans",pkg:"@fontsource-variable/space-grotesk",file:"space-grotesk-latin-wght-normal.woff2",weight:"300 700"},{id:"nunito",name:"Nunito (rund)",kind:"sans",pkg:"@fontsource-variable/nunito",file:"nunito-latin-wght-normal.woff2",weight:"200 1000"}];var Yi=Zr,od={serif:'Georgia, "Times New Roman", serif',sans:'system-ui, -apple-system, "Segoe UI", sans-serif'},Yr=t=>`Ambiframe ${t.name.replace(/ \(.*\)$/,"")}`,Oe=t=>{let i=Yi.find(e=>e.id===t);return i?`"${Yr(i)}", ${od[i.kind]}`:""},Qr=()=>{if(document.getElementById("ambiframe-fonts"))return;let t=document.createElement("style");t.id="ambiframe-fonts",t.textContent=Yi.map(i=>{let e=new URL(`./fonts/${i.file}`,import.meta.url).href,n=i.weight.includes(" ")?"woff2-variations":"woff2";return`@font-face { font-family: "${Yr(i)}"; font-style: normal; font-display: swap; font-weight: ${i.weight}; src: url("${e}") format("${n}"); }`}).join(`
`),document.head.appendChild(t)};var va={"% Luftfeuchte":"% humidity","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = on every change \u2013 e.g. for buttons and event.* entities","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = live picture","1 Licht an":"1 light on","12 / Vollbild 15":"12 / fullscreen 15","168 = eine Woche, 720 = 30 Tage":"168 = one week, 720 = 30 days",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"from","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"From the last trigger; while a sensor is on, the page stays anyway.","ab Wert":"from value","ab {n}":"from {n}",Abbrechen:"Cancel",Abendstimmung:"Evening mood",Abholung:"Collection","Abholung {when}":"Collection {when}","Abklingzeit (s)":"Cooldown (s)","Achse bis":"Axis to","Achse von":"Axis from",Akku:"Battery","Akku %":"Battery %",Aktion:"Action","Aktion (domain.dienst)":"Action (domain.service)","Aktion/Skript ausf\xFChren":"Run action/script",Aktiv:"Active","Aktuellen Stil speichern":"Save current style","Aktuellen Wert zeigen":"Show current value","Aktueller Preis":"Current price","Aktueller Raum":"Current room",Akzent:"Accent","Akzent (Gold)":"Accent (gold)",Akzentfarbe:"Accent colour","Alarm (eindringlich, wiederholt)":"Alarm (urgent, repeats)","Alle Bewegungs-/Pr\xE4senzmelder":"All motion/presence sensors","Alle Fenster- und T\xFCrsensoren":"All window and door sensors","Alle von \u2026 (und)":"All of \u2026 (and)","Alles ruhig":"All quiet","Als eigene Seitenvorlage speichern":"Save as your own page template","Als eigene Vorlage speichern":"Save as your own template","Als Karte":"As a card","Als Vorlage":"As template","Als YAML kopieren":"Copy as YAML","Am g\xFCnstigsten":"Cheapest","am {day}":"on {day}",An:"On",an:"on","An/Aus":"On/off",Angehalten:"Paused",Angesteckt:"Plugged in",Animation:"Animation",Antippen:"Tap",Anwenden:"Apply","Anzeige (Ring)":"Gauge (ring)","Anzeige, Editor und KI-Zusammenfassung":"Display, editor and AI summary",Anzeigefehler:"display error",Art:"Type",Attribut:"Attribute","Attribut (optional)":"Attribute (optional)","Auch nachts":"Also at night","Auch pausiert zeigen":"Also show when paused","Auf dem Ger\xE4t \xF6ffnen":"Open on the device",Auftrag:"Job","Auftrag/Druck":"Job/print",Aurora:"Aurora",Aus:"Off",aus:"off","aus Home Assistant eingeschaltet":"switched on from Home Assistant",Ausl\u00F6ser:"Trigger",Ausnehmen:"Exclude",Ausrichtung:"Orientation",Auto:"Car",automatisch:"automatic","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatic (by device, also when rotated)","automatisch (wie der HA-Benutzer)":"automatic (like the HA user)","Automatisch anordnen":"Arrange automatically","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Stacked automatically \u2013 moving creates your own layout","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatic \u2013 light by day, dark after sunset","automatisch: Gemini":"automatic: Gemini",Balken:"Bars",Bedienmodus:"Control mode","1 Woche":"1 week","12 Stunden":"12 hours","2 Tage":"2 days","24 Stunden":"24 hours","6 Stunden":"6 hours",Gestern:"Yesterday","Keine Mitteilungen":"No notifications",Mitteilungen:"Notifications","Mitteilungen ({n})":"Notifications ({n})",Mitteilungszentrale:"Notification centre","Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C.":"History of events \u2013 in the quick menu (long press) under \u201CNotifications\u201D.","Verlauf leeren":"Clear history","Verlauf reicht zur\xFCck":"History covers","0 = bei Pause sofort ausblenden":"0 = hide immediately when paused","1 Stunde":"1 hour","1 Tag":"1 day","15 Minuten":"15 minutes","2 Erinnerungen":"2 reminders","2 Stunden":"2 hours","3 Erinnerungen":"3 reminders","30 Minuten":"30 minutes","4 Erinnerungen":"4 reminders","4 Stunden":"4 hours","5 Erinnerungen":"5 reminders","8 Stunden":"8 hours","Alle entfernen":"Clear all","Ausblenden nach (s)":"Hide after (s)","Cover zeigen":"Show cover",Ecke:"Corner","Erinnerung oben rechts":"Reminder top right","Erinnerungen oben rechts":"Reminders top right","Fortschritt zeigen":"Show progress","Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft.":"Per track: hide after this many seconds, show again on the next track. Empty = as long as something is playing.","Nach Pause noch (s)":"Keep after pause (s)","Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht.":"After the notice a small reminder stays in the top right \u2013 permanently, for a while or not at all.","Stapeln ab":"Stack from","Weg, wenn das Ger\xE4t wieder startet":"Clear when the device starts again","Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf.":"Like notifications on iOS: a stack with a count, tap to expand.","Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt.":"E.g. the washing machine starts again \u2013 then the old reminder is done.","Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis":"E.g. \u201CLaundry done\u201D after a notice","bleibt, bis man sie antippt":"stays until tapped",dauerhaft:"permanent",gro\u00DF:"large","keine Erinnerung":"no reminder",klein:"small","nie stapeln":"never stack","oben links":"top left","oben rechts":"top right","ohne (nur Text und Cover)":"none (text and cover only)","unten links":"bottom left","unten rechts":"bottom right","+ Ton hinzuf\xFCgen":"+ Add sound","Abstand (s)":"Interval (s)","Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.":"Upload an audio file in HA under Media \u2192 Local media and pick it here \u2013 or enter a link. The sound can then be chosen for every event.","Eigene T\xF6ne":"Custom sounds","Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.":"Click into the field for custom and built-in sounds \u2013 or enter a link (/local/sound.mp3, media-source://\u2026). Add custom sounds on the left under \u201CCustom sounds\u201D.","Mein Ton":"My sound",Wiederholen:"Repeat","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)":"until tapped or closed (max. 2 min)","eigener Ton":"custom sound",einmal:"once","einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)":"once (the \u201CAlarm\u201D sound repeats on full-screen alarms until tapped)","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australia","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Pictures and captions of Bing's pictures of the day","Bing-Region":"Bing region",Brasil:"Brazil","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Germany","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"An \u201Carticle of the day\u201D only exists in these languages.",Espa\u00F1a:"Spain","FAZ (DE)":"FAZ (DE)",France:"France","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"In the video stream (AirPlay, camera) the ticker is always off \u2013 it would freeze or stutter there.",India:"India",Italia:"Italy","NPR (US)":"NPR (US)","Nachrichten-Laufband":"News ticker",Nederland:"Netherlands","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Switzerland","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"United Kingdom","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Pick a suggestion (e.g. bbc, guardian, tagesschau) or enter the address of any RSS/Atom feed. Empty = sources in the display language.","Wikipedia-Sprache":"Wikipedia language","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 German, quote of the week","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 English, quote of the day","automatisch (aus beim Fernseher)":"automatic (off on TVs)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 or https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"as the display","wie die Sprache von Home Assistant":"by Home Assistant's language",\u00D6sterreich:"Austria","wie alle":"as all",Automatisch:"Automatic",Hell:"Light",Dunkel:"Dark","Zitat der Woche":"Quote of the week",Zitat:"Quote","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Quote: in German the quote of the week (Wikiquote), in English the quote of the day (ZenQuotes)","+ Neu":"+ New",Quer:"Landscape",Hoch:"Portrait","Eigene Farben zur\xFCcksetzen":"Reset custom colours","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"No events yet \u2013 \u201C+ New\u201D above.","1 Hinweis":"1 note","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Bing pictures of the day also between your own photos","nein \u2013 nur, wenn nichts Eigenes da ist":"no \u2013 only when there are no own photos","Bing-Bilder untermischen":"Mix in Bing pictures","Jetzt: {what} bis {time}":"Now: {what} until {time}","Termine der n\xE4chsten \u2026 Stunden":"Appointments within the next \u2026 hours","N\xE4chster Termin":"Next appointment","Guten Morgen":"Good morning","Leer = die ersten Kalender automatisch":"Empty = first calendars automatically","Guten Abend":"Good evening","Guten Tag":"Good afternoon","Keine Abholung":"No collection","Regenrisiko {n} %":"Chance of rain {n} %","Regen ab etwa {time} Uhr":"Rain from about {time}","Wetter heute":"Weather today","Heute keine Termine":"No appointments today","Termine heute":"Today's appointments","Tagesvorschau am Morgen":"Morning day preview",Tagesvorschau:"Day preview","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Adds the \u201COn TV\u201D switch \u2013 sends the display to the Apple TV via AirPlay","Fernseher (Apple TV)":"TV (Apple TV)","Fenster zu! Es regnet":"Close the windows! It's raining","Nur zeigen, wenn":"Only show when","z. B. Fenster \u2013 die offenen werden genannt":"e.g. windows \u2013 the open ones are named","Nur wenn eine davon an ist":"Only when one of these is on","Endzeit statt Restzeit":"End time instead of time left","z. B. aktueller Raum des Saugers":"e.g. the vacuum's current room",Zusatz:"Extra","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"playing","Es regnet":"It's raining","noch {time}":"{time} left","Restzeit oder Endzeit":"Time left or end time","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Empty = usual \u201Crunning\u201D states","L\xE4uft bei Zustand":"Running when state is","Zeigen bei Zustand":"Show when state is","Wiedergabe (z. B. Apple TV)":"Playback (e.g. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Device running \u2013 with time left","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Notice \u2013 only when true (e.g. rain)","L\xE4uft gerade (ganze Seite)":"Now playing (full page)","Ganze Seite mit gro\xDFem Cover":"Full page with large cover",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, view over the Wadden Sea and the Halligen (image)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, Black Forest \u2013 Todtnauer H\xFCtte (image)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Saarland \u2013 west shore with marina (image)",Saugkarte:"Cleaning map","Leer = Karte des Saugers automatisch":"Empty = the vacuum's own map","Gro\xDFe Karte darunter":"Large map below",Ausblenden:"Hide","Neben jedem Sauger":"Next to each vacuum","Kleine Karten":"Small maps","Tagesinhalt (Wikipedia, Zitat)":"Daily content (Wikipedia, quote)","Wikipedia-Artikel des Tages":"Wikipedia article of the day","Zitat des Tages":"Quote of the day","Artikel des Tages \xB7 Wikipedia":"Today's featured article \xB7 Wikipedia","Mit Bild":"With picture","Ohne Bild":"Without picture",Inhalt:"Content",Anzahl:"Count","Energiez\xE4hler (kWh)":"Energy meter (kWh)","Gr\xF6\xDFte Verbraucher":"Top consumers","Gr\xF6\xDFte Verbraucher heute":"Top consumers today","Heute noch kein Verbrauch gemessen":"No consumption measured today yet","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Empty = the individual devices from the Home Assistant energy dashboard","Wird berechnet \u2026":"Calculating \u2026","Richtung umkehren":"Reverse direction","Wenn der Antrieb offen und zu andersherum meldet":"If the motor reports open and closed the other way round",ausgefahren:"extended",eingefahren:"retracted","Gilt f\xFCr":"Applies to","Alle Displays":"All displays","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"Designing \u201C{name}\u201D: what you set here applies only to this display. Empty = as for all displays.","Stil wie alle Displays":"Style as all displays","Alle Abweichungen dieses Displays zur\xFCcksetzen":"Reset all differences of this display","wie alle Displays":"as all displays","Mit Stil-Vorschau gestalten":"Design with style preview","4K und Full HD (zwei Kameras)":"4K and Full HD (two cameras)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cameras \u201CAmbiframe {name} Video stream\u201D (4K) and \u201C\u2026 Video stream Full HD\u201D \u2013 in a dashboard, in Apple Home (HomeKit Bridge) or via \u201Ccamera.play_stream\u201D on the Apple TV.",Aufl\u00F6sung:"Resolution","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"For OLED screens: the picture shifts imperceptibly by a few pixels every few minutes so nothing burns in. Best combined with \u201Cdark\u201D.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera \u201CAmbiframe {name} Video stream\u201D \u2013 in a dashboard, in Apple Home (HomeKit Bridge) or via \u201Ccamera.play_stream\u201D on the Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Creates the camera \u201CVideo stream\u201D \u2013 e.g. for Apple TV (AirPlay), Apple Home or TVs without a modern browser. Needs the \u201CPuppet\u201D add-on. It only renders while someone is watching.","Neues Bild alle (s)":"New picture every (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Only needed if Puppet is not found, e.g. http://homeassistant.local:10000","OLED-Schutz":"OLED protection","Puppet-Adresse":"Puppet address",Videostream:"Video stream","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"All good","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"All fine: all entities present, devices connected, photos available.","Das iCloud-Album liefert keine Fotos":"The iCloud album returns no photos","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"The photo frame has no photos (folder and album empty, Bing off)","Der Fotoordner ist leer oder fehlt":"The photo folder is empty or missing","Display \u201E{name}\u201C":"Display \u201C{name}\u201D","Display \u201E{name}\u201C meldet sich nicht":"Display \u201C{name}\u201D is not responding","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"Display \u201C{name}\u201D has not responded for {n} h","Display \u201E{name}\u201C war noch nie verbunden":"Display \u201C{name}\u201D has never connected","Ereignis \u201E{name}\u201C":"Event \u201C{name}\u201D","Fotos werden gez\xE4hlt \u2026":"Counting photos \u2026",Gesundheitscheck:"Health check","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"Health check: missing entities, devices, photos","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"AI summary is on, but there is no AI (ai_task) in Home Assistant","Seite \u201E{name}\u201C":"Page \u201C{name}\u201D","Seite \u201E{name}\u201C wird nirgends gezeigt":"Page \u201C{name}\u201D is not shown anywhere","{n} Hinweise":"{n} notes","{id} gibt es nicht (mehr) \u2013 {where}":"{id} does not exist (anymore) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} is unavailable \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\u201C{name}\u201D still has an older version","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\u201C{name}\u201D is in safe mode: {reason}","1 Stunde stumm":"Mute 1 hour",Anhalten:"Pause",Dunkler:"Darker","Eine Stunde stumm":"Muted for an hour",Heller:"Brighter","Helligkeit {n} %":"Brightness {n} %",Schlie\u00DFen:"Close",Schnellmen\u00FC:"Quick menu","T\xF6ne an":"Sounds on","T\xF6ne wieder an":"Sounds back on","Weiter abspielen":"Resume","Alle Batterien in Ordnung":"All batteries fine","Ger\xE4te und schwache Batterien":"Devices and low batteries","Nur Ger\xE4te":"Devices only","Nur schwache Batterien":"Low batteries only",Zeigen:"Show","+ {n} weitere":"+ {n} more",Akkus:"Batteries",Akkustand:"Battery level","Batterie wechseln":"Replace battery","Ger\xE4te (immer zeigen)":"Devices (always show)","H\xF6chstens Zeilen Zubeh\xF6r":"Max. rows of accessories","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Empty = all phones, tablets and watches from the HA app automatically","Zubeh\xF6r zeigen unter (%)":"Show accessories below (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessories: all batteries fine",schwach:"low","Pfeile zum Bl\xE4ttern":"Arrows to browse","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Subtle at the bottom left and right: previous and next page without leaving Ambiframe","Vorherige Seite":"Previous page","N\xE4chste Seite":"Next page","Karte unten rechts (kurz beim Liedwechsel)":"Card bottom right (briefly on track change)","Vollbild (kurz beim Liedwechsel)":"Full screen (briefly on track change)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Mini card \u2013 stays while something is playing","Eigenes QR-Bild":"Own QR image","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"Instead of network name and password, a ready-made QR image, e.g. from your router (link or data:image/\u2026)","Adresse kopieren":"Copy address","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Everything at a glance: photos, weather, appointments, bins, household and energy. Tap to open the dashboard.","Ambiframe als Bildschirmschoner":"Ambiframe as screensaver","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe always runs; tapping shows the HA dashboard, then it returns by itself.",Anh\u00F6ren:"Listen","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Motion at the door \u2192 camera picture-in-picture","Bing-Bilder, wenn Ordner und Album leer sind":"Bing images when folder and album are empty","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"The profile picks suitable pages, controls, sounds and look. You can adjust everything afterwards.","Dashboard \xFCber Ambiframe":"Dashboard over Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Copy this display with all settings","Display \u201E{name}\u201C mit {n} Seiten":"Display \u201C{name}\u201D with {n} pages","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"A calm picture \u2013 that only speaks when something happens",Fernseher:"TV","Fertig \u2013 speichern":"Done \u2013 save","Fertig!":"Done!",Flur:"Hallway","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"Photos app \u2192 share album \u2192 turn on \u201CPublic Website\u201D \u2192 copy link.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk found: Ambiframe sets the start page and screensaver itself and restarts the tablet if it hangs.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully shows the dashboard; after a minute without touch Ambiframe appears. Doorbell and camera bring it to the front at once.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"For the photo frame. Folder and album are mixed; without both Ambiframe shows Bing's images of the day.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Found in your Home Assistant. Sounds are subtle and match the design \u2013 press \u25B6 to listen.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Appliance finished \u2192 notice and reminder","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Large photo frame: photos, webcams, weather, news. Dark and calm (gentle on OLED), no controls or sound.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 Media \u2192 Local media \u2192 create folder \u201Cambiframe\u201D and upload photos.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"In a few steps you set up your first display: where it hangs, what it shows, what it reacts to. Everything can be changed later in the editor.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"No controls \u2013 e.g. for the TV.","Klingel \u2192 Vollbild mit Kamera":"Doorbell \u2192 full screen with camera",Kopie:"copy","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"At a glance when passing by: clock, weather, bins and who is home \u2013 large text.",K\u00FCche:"Kitchen","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Quieter than the doorbell, silent at night (10 pm\u20137 am).","Neue Seiten dazu":"Add new pages","Nur anzeigen":"Display only","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Calm and dark: clock, photos, weather. Only the doorbell speaks up \u2013 quiet in the evening, silent at night.",Schlafzimmer:"Bedroom","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Set up the device: open this address in the browser of the tablet or TV (in Fully as start URL) and log in to Home Assistant once.","Sp\xFClmaschine fertig":"Dishwasher finished","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Tip: with Fully Kiosk (and its HA integration) Ambiframe sets up the tablet itself.","Trockner fertig":"Dryer finished","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Preselected by profile. The photo frame alternates with the info pages.","Was soll das Display zeigen?":"What should the display show?",Weiter:"Next","Willkommen bei Ambiframe":"Welcome to Ambiframe","Wo h\xE4ngt das Display?":"Where does the display hang?","Woher kommen die Fotos?":"Where do the photos come from?","Worauf soll es reagieren?":"What should it react to?",Zur\u00FCck:"Back","ohne Ton":"no sound","{n} neue Ereignisse":"{n} new events",\u00DCberspringen:"Skip","Eigenes CSS (nur dieses Display)":"Custom CSS (this display only)","Eigenes Design":"Own design","Erg\xE4nzt das CSS aus dem Design.":"Added to the CSS from the design.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"No sounds on this display \u2013 overlays still appear","Leer = wie Design":"Empty = as design","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Only what is set here differs from the design \u2013 empty means \u201Cas design\u201D.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Scales the volume of events; in Fully the tablet's media volume",Stumm:"Mute",T\u00F6ne:"Sounds","Z. B. media-source://media_source/local/kueche":"E.g. media-source://media_source/local/kitchen",Bedienung:"Controls","Dashboard \xFCber Ambiframe (Antippen)":"Dashboard over Ambiframe (tap)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Dashboard in Fully, Ambiframe as screensaver","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"Screensaver: Fully shows the dashboard; after the idle time Ambiframe appears. Doorbell and camera bring Ambiframe to the front at once. Fully is set up automatically.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"Time without touch until Ambiframe returns",bedingt:"conditional",Bedingung:"Condition","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Conditions, appearance and tap actions are available in \u201CAdvanced\u201D mode (top right).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"The next one each time the page appears \u2013 replaces camera and link above","Beim Antippen":"On tap","Beim langen Dr\xFCcken":"On long press",beliebig:"any",Bereit:"Ready","Besuche heute":"visits today",Bewegung:"Motion","Bewegung erkannt":"Motion detected","Bewegung \u2192 Bild-im-Bild":"Motion \u2192 picture-in-picture","Bewegung \u2192 Seite":"Motion \u2192 page","Bewegung \u2192 Seite zeigen":"Motion \u2192 show page",Bewertung:"Rating",Bew\u00F6lkt:"Cloudy",Bezeichnung:"Label",Bild:"Image","Bild neu laden (s)":"Reload image (s)","Bild nicht ladbar":"Image could not be loaded","Bild-im-Bild":"Picture-in-picture","Bild-im-Bild (Bewegung)":"Picture-in-picture (motion)","Bild-Link":"Image link","Bild-Link oder Entit\xE4t w\xE4hlen":"Choose an image link or entity",Bilderrahmen:"Photo frame","Bildschirm aus":"Screen off",Bildunterschrift:"Caption","Bing-Bilder":"Bing images",bis:"until","Bis {hi}\xB0, nachts {lo}\xB0":"Up to {hi}\xB0, {lo}\xB0 at night","bis {when}":"until {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Afterwards stays as a small reminder at the top right.","Bleibt vorerst nass":"Staying wet for now",Breite:"Width",Cover:"Cover","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 beach and mudflats (YouTube live picture)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Only show again after this \u2013 against constant triggering.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"May be a template, e.g. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"May be a template.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"May contain templates, e.g. {{ states('sensor.outside') }} \xB0C \u2013 updated live.",Darstellung:"Appearance",Dashboard:"Dashboard","Daten (YAML, optional)":"Data (YAML, optional)",Datum:"Date",Dauer:"Duration","Dauer (s)":"Duration (s)","Dauer in Sekunden (leer = Seitendauer)":"Duration in seconds (empty = page duration)","Davor zeigt die Bilanz den Vortag":"Before that, the summary shows the previous day","Deckkraft (%)":"Opacity (%)",Design:"Design","Details (HA-Dialog)":"Details (HA dialog)",deutlich:"strong",Deutsch:"Deutsch",dezent:"subtle","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"Load the version from before the last save into the editor (then \u201CSave\u201D)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"The choice is saved on this device.","Diesen Eintrag nur zeigen, wenn \u2026":"Only show this entry when \u2026","Klangschale (tief, schwebend)":"Singing bowl (deep, shimmering)","Marimba (zwei Holzt\xF6ne)":"Marimba (two wooden notes)","Glas (klares Ding-Dong)":"Glass (clear ding-dong)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (three plucked notes)","Windspiel (zart)":"Wind chime (delicate)","Hinweis (sehr leise, kurz)":"Hint (very quiet, short)","Ding-Dong":"Ding-dong",Display:"Display",Displays:"Displays",dunkel:"dark","dunkel: nach Sonnenuntergang w\xE4rmer":"dark: warmer after sunset",Duplizieren:"Duplicate",d\u00E4mmrig:"dusky",Eckenradius:"Corner radius","Eckenradius (px)":"Corner radius (px)","Eckenradius der Karten (px)":"Card corner radius (px)",Editorial:"Editorial","Eigene Farbe":"Custom colour","Eigene Farben \xB7 Dunkel":"Custom colours \xB7 dark","Eigene Farben \xB7 Hell":"Custom colours \xB7 light","Eigene Stile":"Your styles","Eigene Vorlagen":"Your templates","Eigene Vorlagen:":"Your templates:","Eigenes CSS (alle Displays)":"Custom CSS (all displays)","Eigenes CSS (nur diese Seite)":"Custom CSS (this page only)","Ein Balken je":"One bar per","Ein/aus schalten":"Toggle on/off","Eine von mehreren ist":"One of several is","eine von {n} = {state}":"one of {n} = {state}","Eine Zeile":"One line","Eine Zeile (dezent)":"One line (subtle)",Einfach:"Simple","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Simple: just the essentials \xB7 Advanced: everything",eingebaut:"built-in",Einheit:"Unit","Einmal tippen f\xFCr Vollbild":"Tap once for fullscreen",Einpassen:"Fit",Einstellungen:"Settings",Eintrag:"Entry","empfindliche Gruppen":"sensitive groups",Endzeit:"End time","Energie jetzt":"Energy now","Energie-Bilanz":"Energy summary",English:"English",entfernen:"remove",Entit\u00E4t:"Entity","Entit\xE4t hinzuf\xFCgen":"Add entity","Entit\xE4t hinzuf\xFCgen \u2026":"Add entity \u2026","Entit\xE4t w\xE4hlen":"Choose an entity",Entit\u00E4ten:"Entities","Ereignis \u201E{name}\u201C l\xF6schen?":"Delete event \u201C{name}\u201D?",Ereignisse:"Events","Erf\xFCllt bei true, on, Zahl \u2260 0":"True for true, on, number \u2260 0",Erinnerungstext:"Reminder text",Erledigt:"Done","Erstellen um":"Create at",erstes:"first",Erweitert:"Advanced",Erzeugung:"Production","Erzeugung (W)":"Production (W)","Es gibt noch keine vorherige Fassung.":"There is no previous version yet.","Es klingelt":"Someone\u2019s at the door","Es regnet gerade":"It\u2019s raining",Exportieren:"Export",Extrem:"Extreme",Familie:"Family",Farbe:"Colour","Farbe ab Wert":"Colour from value",Farben:"Colours",Fehlgeschlagen:"Failed","Fehlgeschlagen: {error}":"Failed: {error}",Fenster:"Window","Fenster offen":"Window open","Fertig um":"Done at","fertig um {time}":"done at {time}","fertig {time}":"done {time}",feucht:"humid","Flie\xDFender Verlauf":"Flowing gradient",Flie\u00DFtext:"Body text",Fl\u00E4che:"Area","Fl\xE4che, Rand und Radius des Stils":"Surface, border and radius of the style",Form:"Shape","Form & CSS":"Shape & CSS",Format:"Format","Formatierung (Markdown)":"Formatting (Markdown)","Fortschritt %":"Progress %","Fortschritt (%)":"Progress (%)",Foto:"Photo",Fotoordner:"Photo folder",Fotos:"Photos","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"Photos app \u2192 share album \u2192 turn on \u201CPublic Website\u201D \u2192 copy link. Mixed with the folder.",Freundlich:"Friendly",Fu\u00DFnote:"Footnote","F\xE4hrt zur\xFCck":"Returning","F\xFCllen (zuschneiden)":"Fill (crop)","f\xFCllt das Feld":"fills the field","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"For the \u201CPause\u201D switch in HA; 0 = never","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"For advanced users: applies in the display; colours and spacing via --af-\u2026 variables.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':'For advanced users: applies within the page; widgets can be targeted via .cell[data-widget="id"].',"F\xFCr Tor, T\xFCrschloss & Co.":"For gates, door locks & co.","Ganz zeigen":"Show whole",ganztags:"all day","gar nicht zeigen":"don\u2019t show at all",Ged\u00E4mpft:"Muted","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) summarises weather, appointments, bins, power, car and house.","Gemini schreibt \u2026":"Gemini is writing \u2026",gerade:"just now","gerade eben":"just now","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"No device is connected to this display right now","Gerade l\xE4uft nichts":"Nothing playing right now",Ger\u00E4t:"Device","Ger\xE4t fertig":"Appliance done","Ger\xE4t fertig \u2192 Hinweis":"Appliance done \u2192 notice",Ger\u00E4te:"Appliances",Gespeichert:"Saved","Gespeichert \u2013 alle Displays zeigen es sofort.":"Saved \u2013 all displays show it right away.","gestern {time}":"yesterday {time}","Gestern, {date}":"Yesterday, {date}",Gewitter:"Thunderstorm","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Glass surfaces with light edges over soft colours","Glocke (kurz, hell)":"Bell (short, bright)",Gold:"Gold","Gong (warm, tief)":"Gong (warm, deep)",Gro\u00DF:"Large","gro\xDF (+15 %)":"large (+15 %)","Gro\xDFbild mit Schlagzeile":"Large picture with headline","Gruppen (YAML)":"Groups (YAML)","Gruppen zeigen jedes Lied nur einmal":"Groups show each song only once",Gr\u00F6\u00DFe:"Size","Gr\xF6\xDFe (%)":"Size (%)",gut:"good","Gut (gr\xFCn)":"Good (green)","Guten Morgen (KI-Zusammenfassung)":"Good morning (AI summary)","G\xE4ste-WLAN":"Guest Wi-Fi",g\u00FCnstig:"cheap","G\xFCnstigstes Fenster (h)":"Cheapest window (h)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 Media \u2192 Local media \u2192 folder \u201Cambiframe\u201D","HA-Dashboard \xF6ffnen":"Open HA dashboard","HA-Karte":"HA card",Hagel:"Hail",Halbkreis:"Half circle","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hamburg \u2013 Michel with harbour panorama (YouTube live picture)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hamburg \u2013 city (YouTube live picture)","Handy-Kamera auf den Code halten":"Point your phone camera at the code",Haustier:"Pet",Haust\u00FCr:"Front door","heizt auf {temp}\xB0":"heating to {temp}\xB0",Heizung:"Heating","Helfer umschalten":"Toggle helper",hell:"bright","Hell / Tinte":"Light / ink","Hell/Dunkel":"Light/dark","Hell/Dunkel & Schrift":"Light/dark & fonts","Helligkeit (Lux)":"Brightness (lux)","Hervorheben ab Tagen":"Highlight from days","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee and Walchensee (image)",Heute:"Today",heute:"today","Heute ab (Uhr)":"Today from (time)","heute Abend":"tonight","Heute Abend & morgen":"Tonight & tomorrow","Heute Abend rausstellen":"Put out tonight","Heute bis jetzt":"Today so far","Heute Nachmittag":"This afternoon","Heute {lo}\xB0 bis {hi}\xB0":"Today {lo}\xB0 to {hi}\xB0",Hintergrund:"Background",Hinweis:"Notice","Hinweis + Erinnerung (Ger\xE4te)":"Notice + reminder (appliances)",hoch:"high","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"high (muted text stronger)",Hochformat:"Portrait","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (image, MJPEG, .m3u8 or YouTube)",H\u00F6chstens:"At most","H\xF6chstens (s)":"At most (s)","H\xF6chstens Eintr\xE4ge":"At most entries",H\u00F6he:"Height","iCloud-Album":"iCloud album",Icon:"Icon","Immer dunkel":"Always dark","Immer hell":"Always light","Immer hoch":"Always portrait","Immer quer":"Always landscape","Import fehlgeschlagen: {error}":"Import failed: {error}",Importieren:"Import","Importierte Seite":"Imported page","In den Editor \xFCbernehmen":"Apply to editor","in den letzten \u2026 Minuten":"in the last \u2026 minutes","In der Ruhezeit":"During quiet hours","In der Station":"Docked","in {n} Tagen":"in {n} days","Info mit Kopfzeile":"Info with header",Infozeile:"Info line","Innen {temp}\xB0":"Inside {temp}\xB0","Innenabstand (px)":"Padding (px)",Innentemperatur:"Inside temperature","Ist M\xFCllkalender":"Is a bin calendar",Ja:"Yes",ja:"yes","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"Any card from the dashboard, e.g. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"any change (buttons, event.*)",jetzt:"now","Jetzt (gro\xDF)":"Now (large)","Jetzt erstellen":"Create now",Kalender:"Calendar","Kalt unter":"Cold below","Kalt unter \xB0C":"Cold below \xB0C",Kamera:"Camera","Kamera / Webcam":"Camera / webcam","Kamera als Hintergrund":"Camera as background",Karte:"Card","Karte (YAML)":"Card (YAML)","Karte mit 4 Stunden":"Card with 4 hours","Karte nicht ladbar: {error}":"Card could not be loaded: {error}","Karte unten rechts":"Card bottom right","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Card \u201C{type}\u201D (only visible in Home Assistant)",Karten:"Cards","Karten-Deckkraft (%)":"Card opacity (%)","kein Ausl\xF6ser":"no trigger","Kein Display konfiguriert":"No display configured","Kein Display.":"No display.","Kein Regen bis {h} Uhr":"No rain until {h}:00","kein Stil gefunden":"no style found","kein Ton":"no sound",keine:"none","Keine Bewegung in letzter Zeit":"No recent motion","Keine Karte konfiguriert":"No card configured","Keine Preisdaten":"No price data","keine Seite":"no page","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"No page recognised (\u201Cwidgets\u201D missing).","keine Seite sichtbar":"no page visible","Keine Termine in den n\xE4chsten Tagen":"No appointments in the next few days","Keine von \u2026 (nicht)":"None of \u2026 (not)","Keine Warnungen":"No warnings","Keiner gew\xE4hlt = alle":"None selected = all","KI-Zusammenfassung":"AI summary",Klar:"Clear","klein (Kopfzeile)":"small (header)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Small at the bottom right, e.g. \u201CCuxhaven\u201D","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Smaller text (labels, lists, details) \u2013 for reading from a distance","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Click into the field for the built-in sounds \u2013 or a link (/local/sound.mp3). On the tablet via Fully.",Klingel:"Doorbell","Klingel \u2192 Vollbild":"Doorbell \u2192 fullscreen","Knapp, nur Fakten":"Brief, facts only",Kontrast:"Contrast",Kopieren:"Copy","Kopieren (\u2318C)":"Copy (\u2318C)",Kosten:"Cost","Kosten-Sensor":"Cost sensor","K\xFChl (blau)":"Cool (blue)","K\xFCrzlich ge\xE4ndert":"Recently changed",Ladeleistung:"Charging power",Ladelimit:"Charge limit","Ladelimit {n} %":"Charge limit {n} %",langsam:"slow",Laufband:"Ticker","Laufende Ger\xE4te":"Running appliances","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Empty = all bin sensors (\u2026_days) automatically","Leer = automatisch suchen":"Empty = search automatically","Leer = Farbe des Stils":"Empty = style colour","Leere Seite":"Empty page",Leise:"Quiet",Leistung:"Power","Leistung (W)":"Power (W)","Letzte Tage":"Last days","Licht umschalten":"Toggle light","Lichter an":"Lights on",Lichtschimmer:"Shimmer",Linie:"Line",links:"left","Liquid Glass":"Liquid Glass",Liste:"List","Liste mit Vorschaubildern":"List with thumbnails",Live:"Live","Lovelace-Karte (YAML)":"Lovelace card (YAML)",Luftfeuchte:"Humidity","Luftfeuchte (Raum)":"Humidity (room)","Luftqualit\xE4t (AQI)":"Air quality (AQI)",L\u00E4dt:"Charging","L\xE4dt in der Station":"Charging in the dock","L\xE4dt \u2026":"Loading \u2026","L\xE4uft gerade":"Now playing","L\xE4uft-Entit\xE4t":"Running entity",L\u00F6schen:"Delete",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 or washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Several webcams in turn",Melder:"Sensor",Meldungen:"Items","Mindestens (s)":"At least (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"At least one person (person.*) is \u201Chome\u201D.","Mindestens eine von \u2026 (oder)":"At least one of \u2026 (or)",Minimal:"Minimal",Minimum:"Minimum",mittel:"medium",mittig:"centre","Mo., 12. Okt.":"Mon, 12 Oct",Modus:"Mode","Montag, 12. Oktober":"Monday, 12 October",Morgen:"Tomorrow",morgen:"tomorrow","Morgen anzeigen":"Show tomorrow",Musik:"Music","Musik \u2192 Cover":"Music \u2192 cover","Musik-Cover":"Music cover","Musik-Cover (bei Liedwechsel)":"Music cover (on song change)",m\u00E4\u00DFig:"moderate",M\u00FCll:"Bins","M\xFCll zeigen ab Tagen":"Show bins from days",M\u00FCllabfuhr:"Bin collection",M\u00FCllkalender:"Bin calendar",M\u00FClltonnen:"Bins","M\xFClltonnen (im Wechsel)":"Bins (rotating)","M\xFCnchen \u2013 Panorama (Bild)":"Munich \u2013 panorama (image)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Don\u2019t show again for this long after it ends.","nach oben":"move up","nach unten":"move down",Nachkommastellen:"Decimals","Nachlauf (s)":"Hold after (s)",Nachrichten:"News","Nachrichten werden geladen \u2026":"Loading news \u2026",Nacht:"Night","Nacht (gedimmt)":"Night (dimmed)","Nacht, wenn an":"Night when on",Nachtseite:"Night page",Name:"Name","Name der Seitenvorlage":"Page template name","Name der Vorlage":"Template name","Name des Auftrags":"Job name","Name des Players":"Player name","Name, z. B. Herbst":"Name, e.g. Autumn",Nebel:"Fog",nein:"no","Netzname (SSID)":"Network name (SSID)","Netzname und Passwort im Editor eintragen.":"Enter network name and password in the editor.","Neu laden":"Reload","Neu laden alle (s)":"Reload every (s)","Neue Seite":"New page","Neues Display":"New display","Neustart nach (s)":"Restart after (s)","Neustart-Taste":"Restart button",nicht:"not","nicht in Wiedergabe":"not in playlist","nicht zeigen":"don\u2019t show","Nichts l\xE4uft gerade":"Nothing running right now","Nichts offen, nichts l\xE4uft":"Nothing open, nothing running",nie:"never",niedrig:"low",Noch:"Remaining","Noch keine Daten im Zeitraum":"No data in this period yet","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"No styles of your own yet \u2013 set up style, colours and fonts and save them here.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"No page yet \u2013 \u201C+ New\u201D above.","Noch keine Statistik im Zeitraum":"No statistics in this period yet","Noch keine Werte f\xFCr diesen Tag.":"No values for this day yet.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"No summary yet \u2013 it is created at the set times.","noch {n} kWh":"{n} kWh to go","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 harbour and Wadden Sea (YouTube live picture)",Normal:"Normal",normal:"normal","normal (ruhig)":"normal (calm)",Notfallmodus:"Safe mode","Nur anzeigen wenn \u2026":"Only show when \u2026","Nur auf Display \u2026":"Only on display \u2026","nur auf {names}":"only on {names}","Nur diese Ereignistypen":"Only these event types","nur Hochformat":"portrait only","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Browser only \u2013 Fully uses the tablet\u2019s media volume.","Nur im Hoch-/Querformat":"Only in portrait/landscape","Nur offene listen":"List only open ones","nur Querformat":"landscape only","Nur wenn au\xDFerdem \u2026":"Only if also \u2026","Nur wenn in Tagen":"Only if within days","Nur wenn jemand zu Hause ist":"Only when someone is home","Nur zeigen bis Tage":"Only show up to days","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Only show at certain times or conditions","N\xE4chste Stunden":"Next hours","N\xE4chste Tage":"Next days",oben:"top","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Upper limit, even if a sensor stays on.",oder:"or",Offen:"Open",offen:"open","Offene Fenster & T\xFCren":"Open windows & doors","Ohne Rahmen":"Without frame","ohne Ton zeigen":"show without sound","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Optional \u2013 otherwise from the Tibber history.","Ort / Zusatz":"Place / extra","Ort zeigen":"Show place",Ortsangabe:"Location",Ortsname:"Place name",Passwort:"Password","Passwort zus\xE4tzlich als Text":"Also show password as text","Pause endet nach (min)":"Pause ends after (min)",Pausiert:"Paused",pausiert:"paused","per Link (?safe=1)":"via link (?safe=1)",Person:"Person","Person, image.*, Kamera, Medienplayer \u2026":"Person, image.*, camera, media player \u2026",Personen:"People",Player:"Player",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up with HA card","Prognose heute (kWh)":"Forecast today (kWh)","Prognose heute {n} kWh":"Forecast today {n} kWh","Prognose Rest (kWh)":"Forecast remaining (kWh)",Quelle:"Source",Quellen:"Sources",Querformat:"Landscape",Rahmen:"Frame",Raum:"Room",Rausstellen:"Put out",rechts:"right",Regen:"Rain","Regen ab %":"Rain from %","Regen ab {h} Uhr":"Rain from {h}:00","Regen an/aus":"Rain on/off","Regen-Vorschau":"Rain preview",Regensensor:"Rain sensor",Regnet:"Raining",Reichweite:"Range","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 beach (YouTube live picture)",Restzeit:"Time remaining",Ring:"Ring",Rollladen:"Blind","Rollladen/Tor umschalten":"Toggle blind/gate",Rolll\u00E4den:"Blinds","Ruhezeit ab":"Quiet hours from","Ruhezeit bis":"Quiet hours until",Ruhig:"Calm","Ruhig flie\xDFende Farben wie Nordlicht":"Gently flowing colours like northern lights",R\u00E4ume:"Rooms","R\xFCckg\xE4ngig (\u2318Z)":"Undo (\u2318Z)",Sauger:"Vacuum",Saugroboter:"Robot vacuum",Saugt:"Cleaning",Schicht:"Layer","Schichten gesamt":"Total layers",Schieben:"Slide",Schlicht:"Plain","Schlie\xDFt nach (s)":"Closes after (s)",Schloss:"Lock",Schnee:"Snow",Schneeregen:"Sleet",Schrift:"Font","Schrift des Stils":"Style font","Schrift Text":"Text font","Schrift Uhr & Titel":"Clock & title font",Schriftfarbe:"Text colour",Schriftgr\u00F6\u00DFe:"Font size","Schriftgr\xF6\xDFe Punkte (px)":"Bullet font size (px)","Schwebende Partikel":"Floating particles","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Swiss style: clear type, high contrast, typography only","sehr gro\xDF (+30 %)":"very large (+30 %)","sehr hoch":"very high","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Very calm; off at night. Can be changed per page.","seit {time}":"since {time}",Seite:"Page","Seite importieren \u2026":"Import page \u2026","Seite in die Wiedergabe":"Page to playlist","Seite unten als YAML \u2013 zum Kopieren markieren.":"Page below as YAML \u2013 select it to copy.","Seite zeigen":"Show page","Seite zeigen (z. B. bei Bewegung)":"Show page (e.g. on motion)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Page \u201C{name}\u201D copied as YAML \u2013 paste it elsewhere with \u201C+ New \u2192 Import page\u201D or \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Page \u201C{name}\u201D created \u2013 adjust page IDs in actions if needed.","Seite \u201E{name}\u201C l\xF6schen?":"Delete page \u201C{name}\u201D?",Seiten:"Pages","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Page template \u201C{name}\u201D saved \u2013 under \u201C+ New\u201D.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Delete page template \u201C{name}\u201D?",Seitenwechsel:"Page change",Sekunden:"Seconds","Selbst ausw\xE4hlen":"Choose myself",Senkrecht:"Vertical",Sensor:"Sensor","Serifen-Uhr, warmes Wei\xDF, Bambus":"Serif clock, warm white, bamboo",Sichtbarkeit:"Visibility","Skript starten":"Run script","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"How long the display stays after the trigger is off again.",Sonnig:"Sunny",sonnig:"sunny",Spalte:"Column",Spalten:"Columns",Speichern:"Save","Speichert \u2026":"Saving \u2026",Sprache:"Language",Standard:"Default",Standbild:"Still image","Standbild neu laden (s)":"Reload still image (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"StandBy style, plain, sage",Standort:"Location",Starkregen:"Heavy rain","startet immer wieder neu":"keeps restarting","Startkonfiguration anzeigen":"Show starter configuration",Status:"Status","Steht drau\xDFen":"Out","Steht zuhause":"Parked at home",Stil:"Style","Stil als YAML in die Zwischenablage kopiert.":"Style copied to the clipboard as YAML.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Style below as YAML \u2013 select it to copy.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Style applied \u2013 make it permanent with \u201CSave\u201D.","Stil-Farbe":"Style colour","Stil-Schrift":"Style font",Strompreis:"Electricity price","Strompreis heute":"Electricity price today","Stufe hinzuf\xFCgen":"Add step",Stunde:"Hour",Stunden:"Hours","Stunden-Kurve":"Hourly curve",St\u00E4rke:"Strength",St\u00F6rung:"Error","Szene aktivieren":"Activate scene",Tag:"Day",Tage:"Days","Tage bis Abholung":"Days until collection","Tage voraus":"Days ahead","Tage-Sensor":"Days sensor",Tagesbilanz:"Daily summary",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau or https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 or the address of an RSS feed",Teil:"Part",Teile:"Parts","Teils bew\xF6lkt":"Partly cloudy",Temperatur:"Temperature",Temperaturen:"Temperatures",Tempo:"Speed","Tempo (px/s)":"Speed (px/s)",Termin:"Appointment","Termin in den n\xE4chsten Tagen":"Appointment in the next days",Termine:"Appointments",Testen:"Test",teuer:"expensive",Text:"Text","Text & Vorlage":"Text & template","Text aus Entit\xE4t":"Text from entity","Text danach":"Text afterwards","Text ohne Warnung":"Text without warning","Text wenn alles ruhig":"Text when all is quiet","Text wenn nichts l\xE4uft":"Text when nothing is running",Textgr\u00F6\u00DFe:"Text size","Tibber-Zuhause":"Tibber home","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Tip: click a widget to edit it.","Tippen zum Schlie\xDFen":"Tap to close",Titel:"Title","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau in the Black Forest \u2013 village and Hasenhorn (image)",Ton:"Sound",Tonne:"Bin",Tonnen:"Bins","Tonnen der n\xE4chsten \u2026 Tage":"Bins of the next \u2026 days",Trocken:"Dry",trocken:"dry","Trocken ab etwa {h} Uhr":"Dry from about {h}:00",Uhr:"Clock","Uhrzeit von \u2013 bis":"Time from \u2013 to","Uhrzeit {from}\u2013{to}":"Time {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Times separated by commas; each is one request to the AI.",Umwelt:"Environment",und:"and",ungesund:"unhealthy",unten:"bottom",unter:"below",Unterwegs:"Away",Unterzeile:"Subline",Unwetter:"Severe weather","UV-Index":"UV index",Verbrauch:"Consumption",Verlauf:"History","Verlauf (Tage)":"History (days)","Verlauf nicht verf\xFCgbar":"History not available","Verlauf wird geladen \u2026":"Loading history \u2026",Verriegelt:"Locked",Verschl\u00FCsselung:"Encryption","Verstecktes Netz":"Hidden network",Verwerfen:"Discard","Voll um":"Full at","voll um {time}":"full at {time}",Vollbild:"Fullscreen","Vollbild (Klingel, Alarm)":"Fullscreen (doorbell, alarm)","von Zustand":"from state","von {n} geschlossen":"of {n} closed","vor {n} h":"{n} h ago","vor {n} min":"{n} min ago","Vorher nachfragen":"Ask first","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Previous version loaded \u2013 restore it with \u201CApply to editor\u201D and \u201CSave\u201D.","Vorherige Fassung laden":"Load previous version",Vorlage:"Template","Vorlage (Jinja)":"Template (Jinja)","Vorlage l\xF6schen":"Delete template","Vorlage nicht verf\xFCgbar":"Template not available","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Template \u201C{name}\u201D saved \u2013 under \u201CYour templates\u201D.","Vorlage \u201E{name}\u201C l\xF6schen?":"Delete template \u201C{name}\u201D?",Vorschau:"Preview","Vorschau (schnell)":"Preview (fast)",Waagerecht:"Horizontal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe is not reachable: {error}","Ambiframe nicht erreichbar":"Ambiframe not reachable","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 safe mode","Wann?":"When?","Warm \xFCber \xB0C":"Warm above \xB0C","Warn-Sensoren":"Warning sensors",Warnung:"Warning","Warnung (rot)":"Warning (red)","Warnung \u2192 Vollbild":"Warning \u2192 fullscreen",Warnungen:"Warnings","Waschmaschine fertig":"Washing machine done",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Add webcam","Webcam-Link":"Webcam link","Wechsel nach (s)":"Change after (s)","Weich (Unsch\xE4rfe)":"Soft (blur)","Weiter geht's":"Resuming","Weitere Ausl\xF6ser":"More triggers","Weitere Werte":"More values","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"White and gold \u2013 dark on black, light on ivory","Welches Display ist das?":"Which display is this?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein east (image, every 10 min)","Wenn Ordner und Album leer sind":"If folder and album are empty",Wert:"Value","Wert wird blau, wenn er darunter liegt.":"Value turns blue when below.","Werte-Liste":"Value list",Wetter:"Weather","Wetter-Entit\xE4t fehlt":"Weather entity missing","Widget hinzuf\xFCgen:":"Add widget:","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget copied \u2013 paste it on a page with \u2318V or \u201CPaste\u201D.","Widget kopiert.":"Widget copied.","wie der Stil":"like the style","wie Design":"like design","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Like a magazine: large serifs, paper, fine lines","wie oben":"as above","wie Stil":"like style",Wiedergabe:"Playback","Wiedergabe anhalten/fortsetzen":"Pause/resume playback","Wiedergabe/Pause":"Play/pause",Wiedergabeliste:"Playlist","Wiederholen (\u21E7\u2318Z)":"Redo (\u21E7\u2318Z)",Wind:"Wind",Windig:"Windy","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Pressed when the display stops reporting \u2013 e.g. Fully \u201CLoad start URL\u201D.","Wird geladen \u2026":"Loading \u2026","Wird heute abgeholt":"Collected today","WLAN-QR-Code":"Wi-Fi QR code","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"Show again during playback; empty or 0 = only on song change","W\xE4sche fertig":"Laundry done","YAML ist nicht lesbar: {error}":"YAML cannot be read: {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"e.g. litter box visits, resets daily","z. B. KI-Analyse der Kamera":"e.g. AI analysis of the camera","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"e.g. AI description or warning headline","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"e.g. several motion sensors \u2013 one is enough","z. B. type: entities, entities: [light.kueche]":"e.g. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"E.g. time 05:00\u201311:00 for a morning page. The page\u2019s own condition applies as well.","z. B. \u201EGeocoded Location\u201C der Companion-App":"e.g. \u201CGeocoded Location\u201D of the companion app","Zahl \xFCber/unter":"Number above/below",Zeile:"Row",Zeilen:"Rows","Zeitraum (min)":"Period (min)","Zeitraum (Stunden)":"Period (hours)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Dragging or arrow keys move all of them together. \u21E7/\u2318-click removes one, Esc clears the selection.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Drag to move \xB7 dot bottom right to resize \xB7 arrow keys move, with \u21E7 resize \xB7 \u21E7/\u2318-click selects several \xB7 \u2318C/\u2318V copy and paste \xB7 \u232B deletes \xB7 \u2318D duplicates \xB7 \u2318Z undo","Ziel-Entit\xE4t":"Target entity",Zoom:"Zoom",zu:"closed","zu feucht":"too humid","zu Zustand":"to state","zu Zustand (optional)":"to state (optional)","Zugspitze (Bild, alle 10 min)":"Zugspitze (image, every 10 min)",Zuhause:"Home","Zuletzt fertig {when}":"Last finished {when}","zuletzt {time}":"last {time}","Zur\xFCck nach (s)":"Return after (s)","Zur\xFCck zu Ambiframe":"Back to Ambiframe",Zusammenfassung:"Summary",Zusatzwert:"Extra value","Zusatzwert Name":"Extra value name",Zustand:"State","Zustand ist":"State is","Zustand ist nicht":"State is not","Zwischendurch alle (min)":"In between every (min)",z\u00E4hlen:"count","Z\xE4hler \u201Eheute\u201C":"\u201CToday\u201D counter","{day} Abend":"{day} evening","{entity} ge\xE4ndert ({n} min)":"{entity} changed ({n} min)","{entity} in {n} Tagen":"{entity} in {n} days","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} running","{name} offen":"{name} open","{name} \u2013 wirklich?":"{name} \u2013 really?","{n} % aus eigener Sonne":"{n} % from own solar","{n} % Wahrscheinlichkeit":"{n} % probability","{n} Lichter an":"{n} lights on","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets selected","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets copied \u2013 paste them on a page with \u2318V or \u201CPaste\u201D.","{n} Widgets kopiert.":"{n} widgets copied.","{time} Uhr":"{time}","\xE4ltere Version":"older version","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Public camera instead of HA camera \u2013 suggestions by clicking into the field",\u00D6ffnen:"Open","\xD8 {n} pro Tag":"\xD8 {n} per day",\u00FCber:"above",\u00DCberblenden:"Crossfade",\u00DCberblick:"Overview",\u00DCbergang:"Transition","\xDCbergang (s)":"Transition (s)",\u00FCbermorgen:"day after tomorrow",\u00DCbernehmen:"Apply","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Applied \u2013 make it permanent with \u201CSave\u201D.",\u00DCberschrift:"Heading","\xDCberschrift klein":"Small heading","\u2013 w\xE4hlen \u2013":"\u2013 choose \u2013","\u2026 aus Attribut":"\u2026 from attribute","\u2026 oder Bild einer Entit\xE4t":"\u2026 or picture of an entity","\u2026 oder Webcam-Link":"\u2026 or webcam link",Fran\u00E7ais:"Fran\xE7ais","Le Figaro (FR)":"Le Figaro (FR)","Le Monde (FR)":"Le Monde (FR)","NOS (NL)":"NOS (NL)","NU.nl (NL)":"NU.nl (NL)",Nederlands:"Nederlands","RFI (FR)":"RFI (FR)","VRT NWS (BE)":"VRT NWS (BE)","franceinfo (FR)":"franceinfo (FR)","{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.":"{names}: own light/dark setting \u2013 it applies there.","F\xFCr alle \xFCbernehmen":"Apply to all"};var Jr={"% Luftfeuchte":"% d'humidit\xE9","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = \xE0 chaque changement \u2013 p. ex. pour les boutons et les entit\xE9s event.*","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = image en direct","1 Licht an":"1 lumi\xE8re allum\xE9e","12 / Vollbild 15":"12 / plein \xE9cran 15","168 = eine Woche, 720 = 30 Tage":"168 = une semaine, 720 = 30 jours",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"\xE0 partir de","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"Depuis le dernier d\xE9clenchement ; tant qu'un capteur est actif, la page reste de toute fa\xE7on.","ab Wert":"\xE0 partir de la valeur","ab {n}":"\xE0 partir de {n}",Abbrechen:"Annuler",Abendstimmung:"Ambiance du soir",Abholung:"Collecte","Abholung {when}":"Collecte {when}","Abklingzeit (s)":"D\xE9lai de r\xE9pit (s)","Achse bis":"Axe jusqu'\xE0","Achse von":"Axe \xE0 partir de",Akku:"Batterie","Akku %":"Batterie %",Aktion:"Action","Aktion (domain.dienst)":"Action (domain.service)","Aktion/Skript ausf\xFChren":"Ex\xE9cuter une action/un script",Aktiv:"Actif","Aktuellen Stil speichern":"Enregistrer le style actuel","Aktuellen Wert zeigen":"Afficher la valeur actuelle","Aktueller Preis":"Prix actuel","Aktueller Raum":"Pi\xE8ce actuelle",Akzent:"Accent","Akzent (Gold)":"Accent (or)",Akzentfarbe:"Couleur d'accent","Alarm (eindringlich, wiederholt)":"Alarme (insistante, r\xE9p\xE9t\xE9e)","Alle Bewegungs-/Pr\xE4senzmelder":"Tous les d\xE9tecteurs de mouvement/pr\xE9sence","Alle Fenster- und T\xFCrsensoren":"Tous les capteurs de fen\xEAtres et de portes","Alle von \u2026 (und)":"Tous \u2026 (et)","Alles ruhig":"Tout est calme","Als eigene Seitenvorlage speichern":"Enregistrer comme mod\xE8le de page","Als eigene Vorlage speichern":"Enregistrer comme mod\xE8le","Als Karte":"En carte","Als Vorlage":"Comme mod\xE8le","Als YAML kopieren":"Copier en YAML","Am g\xFCnstigsten":"Le moins cher","am {day}":"{day}",An:"Allum\xE9",an:"allum\xE9","An/Aus":"Marche/arr\xEAt",Angehalten:"En pause",Angesteckt:"Branch\xE9",Animation:"Animation",Antippen:"Toucher",Anwenden:"Appliquer","Anzeige (Ring)":"Jauge (anneau)","Anzeige, Editor und KI-Zusammenfassung":"Affichage, \xE9diteur et r\xE9sum\xE9 IA",Anzeigefehler:"erreur d'affichage",Art:"Type",Attribut:"Attribut","Attribut (optional)":"Attribut (facultatif)","Auch nachts":"Aussi la nuit","Auch pausiert zeigen":"Afficher aussi en pause","Auf dem Ger\xE4t \xF6ffnen":"Ouvrir sur l'appareil",Auftrag:"T\xE2che","Auftrag/Druck":"T\xE2che/impression",Aurora:"Aurora",Aus:"\xC9teint",aus:"\xE9teint","aus Home Assistant eingeschaltet":"activ\xE9 depuis Home Assistant",Ausl\u00F6ser:"D\xE9clencheur",Ausnehmen:"Exclure",Ausrichtung:"Orientation",Auto:"Voiture",automatisch:"automatique","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatique (selon l'appareil, aussi en rotation)","automatisch (wie der HA-Benutzer)":"automatique (comme l'utilisateur HA)","Automatisch anordnen":"Disposer automatiquement","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Empil\xE9 automatiquement \u2013 d\xE9placer cr\xE9e votre propre disposition","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatique \u2013 clair le jour, sombre apr\xE8s le coucher du soleil","automatisch: Gemini":"automatique : Gemini",Balken:"Barres",Bedienmodus:"Mode commande","1 Woche":"1 semaine","12 Stunden":"12 heures","2 Tage":"2 jours","24 Stunden":"24 heures","6 Stunden":"6 heures",Gestern:"Hier","Keine Mitteilungen":"Aucune notification",Mitteilungen:"Notifications","Mitteilungen ({n})":"Notifications ({n})",Mitteilungszentrale:"Centre de notifications","Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C.":"Historique des \xE9v\xE9nements \u2013 dans le menu rapide (appui long) sous \xAB Notifications \xBB.","Verlauf leeren":"Effacer l'historique","Verlauf reicht zur\xFCck":"Historique sur","0 = bei Pause sofort ausblenden":"0 = masquer imm\xE9diatement en pause","1 Stunde":"1 heure","1 Tag":"1 jour","15 Minuten":"15 minutes","2 Erinnerungen":"2 rappels","2 Stunden":"2 heures","3 Erinnerungen":"3 rappels","30 Minuten":"30 minutes","4 Erinnerungen":"4 rappels","4 Stunden":"4 heures","5 Erinnerungen":"5 rappels","8 Stunden":"8 heures","Alle entfernen":"Tout effacer","Ausblenden nach (s)":"Masquer apr\xE8s (s)","Cover zeigen":"Afficher la pochette",Ecke:"Coin","Erinnerung oben rechts":"Rappel en haut \xE0 droite","Erinnerungen oben rechts":"Rappels en haut \xE0 droite","Fortschritt zeigen":"Afficher la progression","Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft.":"Par titre : masquer apr\xE8s ce nombre de secondes, r\xE9afficher au titre suivant. Vide = tant que quelque chose joue.","Nach Pause noch (s)":"Encore apr\xE8s la pause (s)","Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht.":"Apr\xE8s la notification, un petit rappel reste en haut \xE0 droite \u2013 en permanence, un moment ou pas du tout.","Stapeln ab":"Empiler \xE0 partir de","Weg, wenn das Ger\xE4t wieder startet":"Dispara\xEEt quand l'appareil red\xE9marre","Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf.":"Comme les notifications sur iOS : une pile avec un nombre, touchez pour la d\xE9plier.","Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt.":"P. ex. le lave-linge red\xE9marre \u2013 l'ancien rappel est alors r\xE9gl\xE9.","Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis":"P. ex. \xAB Lessive termin\xE9e \xBB apr\xE8s une notification","bleibt, bis man sie antippt":"reste jusqu'\xE0 ce qu'on le touche",dauerhaft:"permanent",gro\u00DF:"grand","keine Erinnerung":"pas de rappel",klein:"petit","nie stapeln":"ne jamais empiler","oben links":"en haut \xE0 gauche","oben rechts":"en haut \xE0 droite","ohne (nur Text und Cover)":"aucun (texte et pochette uniquement)","unten links":"en bas \xE0 gauche","unten rechts":"en bas \xE0 droite","+ Ton hinzuf\xFCgen":"+ Ajouter un son","Abstand (s)":"Intervalle (s)","Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.":"T\xE9l\xE9versez un fichier audio dans HA sous M\xE9dias \u2192 M\xE9dias locaux et choisissez-le ici \u2013 ou saisissez un lien. Le son est ensuite disponible pour chaque \xE9v\xE9nement.","Eigene T\xF6ne":"Sons personnels","Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.":"Cliquez dans le champ pour les sons personnels et int\xE9gr\xE9s \u2013 ou saisissez un lien (/local/son.mp3, media-source://\u2026). Ajoutez vos sons \xE0 gauche sous \xAB Sons personnels \xBB.","Mein Ton":"Mon son",Wiederholen:"R\xE9p\xE9ter","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)":"jusqu'\xE0 ce qu'on touche ou ferme (2 min max.)","eigener Ton":"son personnel",einmal:"une fois","einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)":"une fois (le son \xAB Alarme \xBB se r\xE9p\xE8te en plein \xE9cran jusqu'\xE0 ce qu'on le touche)","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australie","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Images et l\xE9gendes des images Bing du jour","Bing-Region":"R\xE9gion Bing",Brasil:"Br\xE9sil","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Allemagne","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"Un \xAB article du jour \xBB n'existe que dans ces langues.",Espa\u00F1a:"Espagne","FAZ (DE)":"FAZ (DE)",France:"France","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"Dans le flux vid\xE9o (AirPlay, cam\xE9ra), le bandeau d\xE9filant est toujours d\xE9sactiv\xE9 \u2013 il s'y figerait ou saccaderait.",India:"Inde",Italia:"Italie","NPR (US)":"NPR (US)","Nachrichten-Laufband":"Bandeau d'actualit\xE9s",Nederland:"Pays-Bas","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Suisse","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"Royaume-Uni","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Choisissez une suggestion (p. ex. bbc, guardian, tagesschau) ou saisissez l'adresse de n'importe quel flux RSS/Atom. Vide = sources dans la langue de l'affichage.","Wikipedia-Sprache":"Langue de Wikip\xE9dia","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 allemand, citation de la semaine","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 anglais, citation du jour","automatisch (aus beim Fernseher)":"automatique (d\xE9sactiv\xE9 sur les t\xE9l\xE9viseurs)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 ou https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"comme l'affichage","wie die Sprache von Home Assistant":"selon la langue de Home Assistant",\u00D6sterreich:"Autriche","wie alle":"comme tous",Automatisch:"Automatique",Hell:"Clair",Dunkel:"Sombre","Zitat der Woche":"Citation de la semaine",Zitat:"Citation","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Citation : en allemand la citation de la semaine (Wikiquote), en anglais la citation du jour (ZenQuotes)","+ Neu":"+ Nouveau",Quer:"Paysage",Hoch:"Portrait","Eigene Farben zur\xFCcksetzen":"R\xE9initialiser les couleurs personnelles","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"Pas encore d'\xE9v\xE9nements \u2013 \xAB + Nouveau \xBB ci-dessus.","1 Hinweis":"1 remarque","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Images Bing du jour aussi entre vos propres photos","nein \u2013 nur, wenn nichts Eigenes da ist":"non \u2013 seulement s'il n'y a pas de photos personnelles","Bing-Bilder untermischen":"M\xE9langer les images Bing","Jetzt: {what} bis {time}":"Maintenant : {what} jusqu'\xE0 {time}","Termine der n\xE4chsten \u2026 Stunden":"Rendez-vous dans les \u2026 prochaines heures","N\xE4chster Termin":"Prochain rendez-vous","Guten Morgen":"Bonjour","Leer = die ersten Kalender automatisch":"Vide = premiers calendriers automatiquement","Guten Abend":"Bonsoir","Guten Tag":"Bon apr\xE8s-midi","Keine Abholung":"Pas de collecte","Regenrisiko {n} %":"Risque de pluie {n} %","Regen ab etwa {time} Uhr":"Pluie \xE0 partir de {time} environ","Wetter heute":"M\xE9t\xE9o du jour","Heute keine Termine":"Pas de rendez-vous aujourd'hui","Termine heute":"Rendez-vous du jour","Tagesvorschau am Morgen":"Aper\xE7u de la journ\xE9e le matin",Tagesvorschau:"Aper\xE7u de la journ\xE9e","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Cr\xE9e l'interrupteur \xAB Sur la t\xE9l\xE9vision \xBB \u2013 envoie l'affichage \xE0 l'Apple TV via AirPlay","Fernseher (Apple TV)":"T\xE9l\xE9vision (Apple TV)","Fenster zu! Es regnet":"Fermez les fen\xEAtres ! Il pleut","Nur zeigen, wenn":"Afficher seulement si","z. B. Fenster \u2013 die offenen werden genannt":"p. ex. fen\xEAtres \u2013 les fen\xEAtres ouvertes sont nomm\xE9es","Nur wenn eine davon an ist":"Seulement si l'un d'eux est actif","Endzeit statt Restzeit":"Heure de fin au lieu du temps restant","z. B. aktueller Raum des Saugers":"p. ex. la pi\xE8ce actuelle de l'aspirateur robot",Zusatz:"Compl\xE9ment","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"en lecture","Es regnet":"Il pleut","noch {time}":"encore {time}","Restzeit oder Endzeit":"Temps restant ou heure de fin","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Vide = \xE9tats \xAB en marche \xBB habituels","L\xE4uft bei Zustand":"En marche quand l'\xE9tat est","Zeigen bei Zustand":"Afficher quand l'\xE9tat est","Wiedergabe (z. B. Apple TV)":"Lecture (p. ex. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Appareil en marche \u2013 avec temps restant","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Avertissement \u2013 seulement si vrai (p. ex. pluie)","L\xE4uft gerade (ganze Seite)":"En cours de lecture (page enti\xE8re)","Ganze Seite mit gro\xDFem Cover":"Page enti\xE8re avec grande pochette",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, vue sur la mer des Wadden et les Halligen (image)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, For\xEAt-Noire \u2013 Todtnauer H\xFCtte (image)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Sarre \u2013 rive ouest avec port de plaisance (image)",Saugkarte:"Carte de nettoyage","Leer = Karte des Saugers automatisch":"Vide = carte propre de l'aspirateur","Gro\xDFe Karte darunter":"Grande carte en dessous",Ausblenden:"Masquer","Neben jedem Sauger":"\xC0 c\xF4t\xE9 de chaque aspirateur","Kleine Karten":"Petites cartes","Tagesinhalt (Wikipedia, Zitat)":"Contenu du jour (Wikip\xE9dia, citation)","Wikipedia-Artikel des Tages":"Article Wikip\xE9dia du jour","Zitat des Tages":"Citation du jour","Artikel des Tages \xB7 Wikipedia":"Article du jour \xB7 Wikip\xE9dia","Mit Bild":"Avec image","Ohne Bild":"Sans image",Inhalt:"Contenu",Anzahl:"Nombre","Energiez\xE4hler (kWh)":"Compteur d'\xE9nergie (kWh)","Gr\xF6\xDFte Verbraucher":"Plus gros consommateurs","Gr\xF6\xDFte Verbraucher heute":"Plus gros consommateurs aujourd'hui","Heute noch kein Verbrauch gemessen":"Aucune consommation mesur\xE9e aujourd'hui","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Vide = les appareils du tableau de bord \xE9nergie de Home Assistant","Wird berechnet \u2026":"Calcul en cours \u2026","Richtung umkehren":"Inverser le sens","Wenn der Antrieb offen und zu andersherum meldet":"Si le moteur indique ouvert et ferm\xE9 \xE0 l'envers",ausgefahren:"d\xE9ploy\xE9",eingefahren:"rentr\xE9","Gilt f\xFCr":"S'applique \xE0","Alle Displays":"Tous les affichages","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"Personnaliser \xAB {name} \xBB : ce que vous r\xE9glez ici ne s'applique qu'\xE0 cet affichage. Vide = comme pour tous les affichages.","Stil wie alle Displays":"Style comme tous les affichages","Alle Abweichungen dieses Displays zur\xFCcksetzen":"R\xE9initialiser toutes les diff\xE9rences de cet affichage","wie alle Displays":"comme tous les affichages","Mit Stil-Vorschau gestalten":"Design avec aper\xE7u du style","4K und Full HD (zwei Kameras)":"4K et Full HD (deux cam\xE9ras)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cam\xE9ras \xAB Ambiframe {name} Flux vid\xE9o \xBB (4K) et \xAB \u2026 Flux vid\xE9o Full HD \xBB \u2013 dans un tableau de bord, dans Apple Maison (HomeKit Bridge) ou via \xAB camera.play_stream \xBB sur l'Apple TV.",Aufl\u00F6sung:"R\xE9solution","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"Pour les \xE9crans OLED : l'image se d\xE9cale imperceptiblement de quelques pixels toutes les quelques minutes pour \xE9viter le marquage. Id\xE9al avec \xAB sombre \xBB.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cam\xE9ra \xAB Ambiframe {name} Flux vid\xE9o \xBB \u2013 dans un tableau de bord, dans Apple Maison (HomeKit Bridge) ou via \xAB camera.play_stream \xBB sur l'Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Cr\xE9e la cam\xE9ra \xAB Flux vid\xE9o \xBB \u2013 p. ex. pour Apple TV (AirPlay), Apple Maison ou des t\xE9l\xE9viseurs sans navigateur moderne. N\xE9cessite le module compl\xE9mentaire \xAB Puppet \xBB. Le rendu n'a lieu que lorsque quelqu'un regarde.","Neues Bild alle (s)":"Nouvelle image toutes les (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Seulement si Puppet n'est pas trouv\xE9, p. ex. http://homeassistant.local:10000","OLED-Schutz":"Protection OLED","Puppet-Adresse":"Adresse de Puppet",Videostream:"Flux vid\xE9o","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"Tout va bien","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"Tout va bien : toutes les entit\xE9s pr\xE9sentes, appareils connect\xE9s, photos disponibles.","Das iCloud-Album liefert keine Fotos":"L'album iCloud ne fournit aucune photo","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"Le cadre photo n'a aucune photo (dossier et album vides, Bing d\xE9sactiv\xE9)","Der Fotoordner ist leer oder fehlt":"Le dossier photos est vide ou introuvable","Display \u201E{name}\u201C":"Affichage \xAB {name} \xBB","Display \u201E{name}\u201C meldet sich nicht":"L'affichage \xAB {name} \xBB ne r\xE9pond pas","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"L'affichage \xAB {name} \xBB ne r\xE9pond plus depuis {n} h","Display \u201E{name}\u201C war noch nie verbunden":"L'affichage \xAB {name} \xBB ne s'est jamais connect\xE9","Ereignis \u201E{name}\u201C":"\xC9v\xE9nement \xAB {name} \xBB","Fotos werden gez\xE4hlt \u2026":"Comptage des photos \u2026",Gesundheitscheck:"V\xE9rification","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"V\xE9rification : entit\xE9s, appareils, photos manquants","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"Le r\xE9sum\xE9 IA est activ\xE9, mais il n'y a pas d'IA (ai_task) dans Home Assistant","Seite \u201E{name}\u201C":"Page \xAB {name} \xBB","Seite \u201E{name}\u201C wird nirgends gezeigt":"La page \xAB {name} \xBB n'est affich\xE9e nulle part","{n} Hinweise":"{n} remarques","{id} gibt es nicht (mehr) \u2013 {where}":"{id} n'existe pas (plus) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} est indisponible \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\xAB {name} \xBB a encore une ancienne version","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\xAB {name} \xBB est en mode secours : {reason}","1 Stunde stumm":"Muet 1 heure",Anhalten:"Pause",Dunkler:"Plus sombre","Eine Stunde stumm":"Muet pendant une heure",Heller:"Plus clair","Helligkeit {n} %":"Luminosit\xE9 {n} %",Schlie\u00DFen:"Fermer",Schnellmen\u00FC:"Menu rapide","T\xF6ne an":"Son activ\xE9","T\xF6ne wieder an":"Son de nouveau activ\xE9","Weiter abspielen":"Reprendre","Alle Batterien in Ordnung":"Toutes les batteries vont bien","Ger\xE4te und schwache Batterien":"Appareils et batteries faibles","Nur Ger\xE4te":"Appareils uniquement","Nur schwache Batterien":"Batteries faibles uniquement",Zeigen:"Afficher","+ {n} weitere":"+ {n} de plus",Akkus:"Batteries",Akkustand:"Niveau de batterie","Batterie wechseln":"Remplacer la batterie","Ger\xE4te (immer zeigen)":"Appareils (toujours afficher)","H\xF6chstens Zeilen Zubeh\xF6r":"Lignes d'accessoires max.","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Vide = tous les t\xE9l\xE9phones, tablettes et montres de l'application HA automatiquement","Zubeh\xF6r zeigen unter (%)":"Afficher les accessoires sous (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessoires : toutes les batteries vont bien",schwach:"faible","Pfeile zum Bl\xE4ttern":"Fl\xE8ches pour feuilleter","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Discr\xE8tes en bas \xE0 gauche et \xE0 droite : page pr\xE9c\xE9dente et suivante sans quitter Ambiframe","Vorherige Seite":"Page pr\xE9c\xE9dente","N\xE4chste Seite":"Page suivante","Karte unten rechts (kurz beim Liedwechsel)":"Carte en bas \xE0 droite (bri\xE8vement au changement de titre)","Vollbild (kurz beim Liedwechsel)":"Plein \xE9cran (bri\xE8vement au changement de titre)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Mini-carte \u2013 reste tant que quelque chose joue","Eigenes QR-Bild":"Image QR personnelle","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"Au lieu du nom de r\xE9seau et du mot de passe, une image QR toute pr\xEAte, p. ex. de votre box (lien ou data:image/\u2026)","Adresse kopieren":"Copier l'adresse","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Tout d'un coup d'\u0153il : photos, m\xE9t\xE9o, rendez-vous, poubelles, maison et \xE9nergie. Toucher ouvre le tableau de bord.","Ambiframe als Bildschirmschoner":"Ambiframe comme \xE9conomiseur d'\xE9cran","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe tourne toujours ; toucher affiche le tableau de bord HA, puis il revient tout seul.",Anh\u00F6ren:"\xC9couter","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Mouvement \xE0 la porte \u2192 cam\xE9ra en incrustation","Bing-Bilder, wenn Ordner und Album leer sind":"Images Bing si le dossier et l'album sont vides","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"Le profil choisit les pages, la commande, les sons et l'apparence adapt\xE9s. Tout reste modifiable ensuite.","Dashboard \xFCber Ambiframe":"Tableau de bord par-dessus Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Copier cet affichage avec tous les r\xE9glages","Display \u201E{name}\u201C mit {n} Seiten":"Affichage \xAB {name} \xBB avec {n} pages","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"Une image calme \u2013 qui ne parle que lorsqu'il se passe quelque chose",Fernseher:"T\xE9l\xE9vision","Fertig \u2013 speichern":"Termin\xE9 \u2013 enregistrer","Fertig!":"Termin\xE9 !",Flur:"Couloir","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"App Photos \u2192 partager l'album \u2192 activer \xAB Site web public \xBB \u2192 copier le lien.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk trouv\xE9 : Ambiframe r\xE8gle lui-m\xEAme la page de d\xE9marrage et l'\xE9conomiseur d'\xE9cran et red\xE9marre la tablette si elle se bloque.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully affiche le tableau de bord ; apr\xE8s une minute sans contact, Ambiframe appara\xEEt. La sonnette et la cam\xE9ra le font passer au premier plan imm\xE9diatement.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"Pour le cadre photo. Le dossier et l'album sont m\xE9lang\xE9s ; sans les deux, Ambiframe affiche les images Bing du jour.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Trouv\xE9 dans votre Home Assistant. Les sons sont discrets et assortis au design \u2013 appuyez sur \u25B6 pour \xE9couter.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Appareil termin\xE9 \u2192 avertissement et rappel","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Grand cadre photo : photos, webcams, m\xE9t\xE9o, actualit\xE9s. Sombre et calme (m\xE9nage l'OLED), sans commande ni son.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 M\xE9dias \u2192 M\xE9dias locaux \u2192 cr\xE9er le dossier \xAB ambiframe \xBB et t\xE9l\xE9verser des photos.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"En quelques \xE9tapes, vous configurez votre premier affichage : o\xF9 il est accroch\xE9, ce qu'il montre, \xE0 quoi il r\xE9agit. Tout reste modifiable plus tard dans l'\xE9diteur.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"Sans commande \u2013 p. ex. pour la t\xE9l\xE9vision.","Klingel \u2192 Vollbild mit Kamera":"Sonnette \u2192 plein \xE9cran avec cam\xE9ra",Kopie:"copie","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"D'un coup d'\u0153il en passant : horloge, m\xE9t\xE9o, poubelles et qui est \xE0 la maison \u2013 grand texte.",K\u00FCche:"Cuisine","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Plus doux que la sonnette, silencieux la nuit (22 h\u20137 h).","Neue Seiten dazu":"Ajouter de nouvelles pages","Nur anzeigen":"Affichage seul","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Calme et sombre : horloge, photos, m\xE9t\xE9o. Seule la sonnette se fait entendre \u2013 doucement le soir, en silence la nuit.",Schlafzimmer:"Chambre","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Configurer l'appareil : ouvrez cette adresse dans le navigateur de la tablette ou de la t\xE9l\xE9vision (dans Fully comme URL de d\xE9marrage) et connectez-vous une fois \xE0 Home Assistant.","Sp\xFClmaschine fertig":"Lave-vaisselle termin\xE9","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Astuce : avec Fully Kiosk (et son int\xE9gration HA), Ambiframe configure la tablette lui-m\xEAme.","Trockner fertig":"S\xE8che-linge termin\xE9","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Pr\xE9s\xE9lectionn\xE9 selon le profil. Le cadre photo alterne avec les pages d'information.","Was soll das Display zeigen?":"Que doit montrer l'affichage ?",Weiter:"Suivant","Willkommen bei Ambiframe":"Bienvenue dans Ambiframe","Wo h\xE4ngt das Display?":"O\xF9 l'affichage est-il accroch\xE9 ?","Woher kommen die Fotos?":"D'o\xF9 viennent les photos ?","Worauf soll es reagieren?":"\xC0 quoi doit-il r\xE9agir ?",Zur\u00FCck:"Retour","ohne Ton":"pas de son","{n} neue Ereignisse":"{n} nouveaux \xE9v\xE9nements",\u00DCberspringen:"Passer","Eigenes CSS (nur dieses Display)":"CSS personnel (cet affichage uniquement)","Eigenes Design":"Design personnel","Erg\xE4nzt das CSS aus dem Design.":"S'ajoute au CSS du design.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"Pas de sons sur cet affichage \u2013 les incrustations restent","Leer = wie Design":"Vide = comme le design","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Seul ce qui est r\xE9gl\xE9 ici diff\xE8re du design \u2013 vide signifie \xAB comme le design \xBB.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Adapte le volume des \xE9v\xE9nements ; dans Fully, le volume multim\xE9dia de la tablette",Stumm:"Muet",T\u00F6ne:"Sons","Z. B. media-source://media_source/local/kueche":"P. ex. media-source://media_source/local/cuisine",Bedienung:"Commande","Dashboard \xFCber Ambiframe (Antippen)":"Tableau de bord par-dessus Ambiframe (toucher)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Tableau de bord dans Fully, Ambiframe comme \xE9conomiseur d'\xE9cran","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"\xC9conomiseur d'\xE9cran : Fully affiche le tableau de bord ; apr\xE8s le d\xE9lai d'inactivit\xE9, Ambiframe appara\xEEt. La sonnette et la cam\xE9ra font passer Ambiframe au premier plan imm\xE9diatement. Fully est configur\xE9 automatiquement.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"D\xE9lai sans contact avant le retour d'Ambiframe",bedingt:"conditionnel",Bedingung:"Condition","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Les conditions, l'apparence et les actions au toucher se trouvent dans le mode \xAB Avanc\xE9 \xBB (en haut \xE0 droite).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"La suivante \xE0 chaque apparition de la page \u2013 remplace la cam\xE9ra et le lien ci-dessus","Beim Antippen":"Au toucher","Beim langen Dr\xFCcken":"\xC0 l'appui long",beliebig:"quelconque",Bereit:"Pr\xEAt","Besuche heute":"visites aujourd'hui",Bewegung:"Mouvement","Bewegung erkannt":"Mouvement d\xE9tect\xE9","Bewegung \u2192 Bild-im-Bild":"Mouvement \u2192 incrustation","Bewegung \u2192 Seite":"Mouvement \u2192 page","Bewegung \u2192 Seite zeigen":"Mouvement \u2192 afficher une page",Bewertung:"\xC9valuation",Bew\u00F6lkt:"Nuageux",Bezeichnung:"Libell\xE9",Bild:"Image","Bild neu laden (s)":"Recharger l'image (s)","Bild nicht ladbar":"L'image n'a pas pu \xEAtre charg\xE9e","Bild-im-Bild":"Incrustation","Bild-im-Bild (Bewegung)":"Incrustation (mouvement)","Bild-Link":"Lien de l'image","Bild-Link oder Entit\xE4t w\xE4hlen":"Choisissez un lien d'image ou une entit\xE9",Bilderrahmen:"Cadre photo","Bildschirm aus":"\xC9teindre l'\xE9cran",Bildunterschrift:"L\xE9gende","Bing-Bilder":"Images Bing",bis:"jusqu'\xE0","Bis {hi}\xB0, nachts {lo}\xB0":"Jusqu'\xE0 {hi}\xB0, {lo}\xB0 la nuit","bis {when}":"jusqu'\xE0 {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Reste ensuite comme petit rappel en haut \xE0 droite.","Bleibt vorerst nass":"Reste humide pour l'instant",Breite:"Largeur",Cover:"Pochette","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 plage et estran (image en direct YouTube)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Ne r\xE9afficher qu'ensuite \u2013 contre les d\xE9clenchements continus.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"Peut \xEAtre un mod\xE8le, p. ex. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"Peut \xEAtre un mod\xE8le.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"Peut contenir des mod\xE8les, p. ex. {{ states('sensor.outside') }} \xB0C \u2013 mis \xE0 jour en direct.",Darstellung:"Apparence",Dashboard:"Tableau de bord","Daten (YAML, optional)":"Donn\xE9es (YAML, facultatif)",Datum:"Date",Dauer:"Dur\xE9e","Dauer (s)":"Dur\xE9e (s)","Dauer in Sekunden (leer = Seitendauer)":"Dur\xE9e en secondes (vide = dur\xE9e de la page)","Davor zeigt die Bilanz den Vortag":"Avant, le r\xE9sum\xE9 montre la veille","Deckkraft (%)":"Opacit\xE9 (%)",Design:"Design","Details (HA-Dialog)":"D\xE9tails (dialogue HA)",deutlich:"marqu\xE9",Deutsch:"Deutsch",dezent:"discret","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"Charger dans l'\xE9diteur la version d'avant le dernier enregistrement (puis \xAB Enregistrer \xBB)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"Le choix est m\xE9moris\xE9 sur cet appareil.","Diesen Eintrag nur zeigen, wenn \u2026":"N'afficher cette entr\xE9e que si \u2026","Klangschale (tief, schwebend)":"Bol chantant (grave, vibrant)","Marimba (zwei Holzt\xF6ne)":"Marimba (deux notes bois\xE9es)","Glas (klares Ding-Dong)":"Verre (ding-dong clair)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (trois notes pinc\xE9es)","Windspiel (zart)":"Carillon \xE0 vent (d\xE9licat)","Hinweis (sehr leise, kurz)":"Indication (tr\xE8s douce, courte)","Ding-Dong":"Ding-dong",Display:"Affichage",Displays:"Affichages",dunkel:"sombre","dunkel: nach Sonnenuntergang w\xE4rmer":"sombre : plus chaud apr\xE8s le coucher du soleil",Duplizieren:"Dupliquer",d\u00E4mmrig:"sombre",Eckenradius:"Rayon des coins","Eckenradius (px)":"Rayon des coins (px)","Eckenradius der Karten (px)":"Rayon des coins des cartes (px)",Editorial:"Editorial","Eigene Farbe":"Couleur personnelle","Eigene Farben \xB7 Dunkel":"Couleurs personnelles \xB7 sombre","Eigene Farben \xB7 Hell":"Couleurs personnelles \xB7 clair","Eigene Stile":"Styles personnels","Eigene Vorlagen":"Mod\xE8les personnels","Eigene Vorlagen:":"Mod\xE8les personnels :","Eigenes CSS (alle Displays)":"CSS personnel (tous les affichages)","Eigenes CSS (nur diese Seite)":"CSS personnel (cette page uniquement)","Ein Balken je":"Une barre par","Ein/aus schalten":"Allumer/\xE9teindre","Eine von mehreren ist":"L'un de plusieurs est","eine von {n} = {state}":"l'un de {n} = {state}","Eine Zeile":"Une ligne","Eine Zeile (dezent)":"Une ligne (discr\xE8te)",Einfach:"Simple","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Simple : l'essentiel \xB7 Avanc\xE9 : tout",eingebaut:"int\xE9gr\xE9",Einheit:"Unit\xE9","Einmal tippen f\xFCr Vollbild":"Toucher une fois pour le plein \xE9cran",Einpassen:"Ajuster",Einstellungen:"R\xE9glages",Eintrag:"Entr\xE9e","empfindliche Gruppen":"groupes sensibles",Endzeit:"Heure de fin","Energie jetzt":"\xC9nergie maintenant","Energie-Bilanz":"Bilan \xE9nerg\xE9tique",English:"English",entfernen:"supprimer",Entit\u00E4t:"Entit\xE9","Entit\xE4t hinzuf\xFCgen":"Ajouter une entit\xE9","Entit\xE4t hinzuf\xFCgen \u2026":"Ajouter une entit\xE9 \u2026","Entit\xE4t w\xE4hlen":"Choisissez une entit\xE9",Entit\u00E4ten:"Entit\xE9s","Ereignis \u201E{name}\u201C l\xF6schen?":"Supprimer l'\xE9v\xE9nement \xAB {name} \xBB ?",Ereignisse:"\xC9v\xE9nements","Erf\xFCllt bei true, on, Zahl \u2260 0":"Vrai pour true, on, nombre \u2260 0",Erinnerungstext:"Texte du rappel",Erledigt:"Termin\xE9","Erstellen um":"Cr\xE9er \xE0",erstes:"premier",Erweitert:"Avanc\xE9",Erzeugung:"Production","Erzeugung (W)":"Production (W)","Es gibt noch keine vorherige Fassung.":"Il n'y a pas encore de version pr\xE9c\xE9dente.","Es klingelt":"On sonne","Es regnet gerade":"Il pleut",Exportieren:"Exporter",Extrem:"Extr\xEAme",Familie:"Famille",Farbe:"Couleur","Farbe ab Wert":"Couleur selon la valeur",Farben:"Couleurs",Fehlgeschlagen:"\xC9chec","Fehlgeschlagen: {error}":"\xC9chec : {error}",Fenster:"Fen\xEAtre","Fenster offen":"Fen\xEAtre ouverte","Fertig um":"Termin\xE9 \xE0","fertig um {time}":"termin\xE9 \xE0 {time}","fertig {time}":"termin\xE9 {time}",feucht:"humide","Flie\xDFender Verlauf":"D\xE9grad\xE9 fluide",Flie\u00DFtext:"Texte courant",Fl\u00E4che:"Aire","Fl\xE4che, Rand und Radius des Stils":"Surface, bordure et rayon du style",Form:"Forme","Form & CSS":"Forme & CSS",Format:"Format","Formatierung (Markdown)":"Mise en forme (Markdown)","Fortschritt %":"Progression %","Fortschritt (%)":"Progression (%)",Foto:"Photo",Fotoordner:"Dossier photos",Fotos:"Photos","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"App Photos \u2192 partager l'album \u2192 activer \xAB Site web public \xBB \u2192 copier le lien. M\xE9lang\xE9 avec le dossier.",Freundlich:"Amical",Fu\u00DFnote:"Note de bas","F\xE4hrt zur\xFCck":"Retourne","F\xFCllen (zuschneiden)":"Remplir (rogner)","f\xFCllt das Feld":"remplit le champ","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"Pour l'interrupteur \xAB Pause \xBB dans HA ; 0 = jamais","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"Pour utilisateurs avanc\xE9s : s'applique dans l'affichage ; couleurs et espacements via les variables --af-\u2026.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':`Pour utilisateurs avanc\xE9s : s'applique dans la page ; les widgets se ciblent via .cell[data-widget="id"].`,"F\xFCr Tor, T\xFCrschloss & Co.":"Pour portails, serrures & co.","Ganz zeigen":"Afficher en entier",ganztags:"toute la journ\xE9e","gar nicht zeigen":"ne pas afficher du tout",Ged\u00E4mpft:"Muet","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) r\xE9sume la m\xE9t\xE9o, les rendez-vous, les poubelles, l'\xE9lectricit\xE9, la voiture et la maison.","Gemini schreibt \u2026":"Gemini \xE9crit \u2026",gerade:"\xE0 l'instant","gerade eben":"\xE0 l'instant","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"Aucun appareil n'est connect\xE9 \xE0 cet affichage pour le moment","Gerade l\xE4uft nichts":"Rien ne joue en ce moment",Ger\u00E4t:"Appareil","Ger\xE4t fertig":"Appareil termin\xE9","Ger\xE4t fertig \u2192 Hinweis":"Appareil termin\xE9 \u2192 avertissement",Ger\u00E4te:"Appareils",Gespeichert:"Enregistr\xE9","Gespeichert \u2013 alle Displays zeigen es sofort.":"Enregistr\xE9 \u2013 tous les affichages le montrent imm\xE9diatement.","gestern {time}":"hier {time}","Gestern, {date}":"Hier, {date}",Gewitter:"Orage","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Surfaces de verre \xE0 bord lumineux sur des couleurs douces","Glocke (kurz, hell)":"Cloche (courte, claire)",Gold:"Or","Gong (warm, tief)":"Gong (chaud, grave)",Gro\u00DF:"Grand","gro\xDF (+15 %)":"grand (+15 %)","Gro\xDFbild mit Schlagzeile":"Grande image avec titre","Gruppen (YAML)":"Groupes (YAML)","Gruppen zeigen jedes Lied nur einmal":"Les groupes n'affichent chaque titre qu'une fois",Gr\u00F6\u00DFe:"Taille","Gr\xF6\xDFe (%)":"Taille (%)",gut:"bon","Gut (gr\xFCn)":"Bon (vert)","Guten Morgen (KI-Zusammenfassung)":"Bonjour (r\xE9sum\xE9 IA)","G\xE4ste-WLAN":"Wi-Fi invit\xE9s",g\u00FCnstig:"bon march\xE9","G\xFCnstigstes Fenster (h)":"Fen\xEAtre la moins ch\xE8re (h)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 M\xE9dias \u2192 M\xE9dias locaux \u2192 dossier \xAB ambiframe \xBB","HA-Dashboard \xF6ffnen":"Ouvrir le tableau de bord HA","HA-Karte":"Carte HA",Hagel:"Gr\xEAle",Halbkreis:"Demi-cercle","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hambourg \u2013 Michel avec panorama du port (image en direct YouTube)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hambourg \u2013 ville (image en direct YouTube)","Handy-Kamera auf den Code halten":"Visez le code avec l'appareil photo du t\xE9l\xE9phone",Haustier:"Animal",Haust\u00FCr:"Porte d'entr\xE9e","heizt auf {temp}\xB0":"chauffe \xE0 {temp}\xB0",Heizung:"Chauffage","Helfer umschalten":"Basculer l'entr\xE9e",hell:"clair","Hell / Tinte":"Clair / encre","Hell/Dunkel":"Clair/sombre","Hell/Dunkel & Schrift":"Clair/sombre & polices","Helligkeit (Lux)":"Luminosit\xE9 (lux)","Hervorheben ab Tagen":"Mettre en \xE9vidence \xE0 partir de jours","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee et Walchensee (image)",Heute:"Aujourd'hui",heute:"aujourd'hui","Heute ab (Uhr)":"Aujourd'hui \xE0 partir de (heure)","heute Abend":"ce soir","Heute Abend & morgen":"Ce soir & demain","Heute Abend rausstellen":"\xC0 sortir ce soir","Heute bis jetzt":"Aujourd'hui jusqu'ici","Heute Nachmittag":"Cet apr\xE8s-midi","Heute {lo}\xB0 bis {hi}\xB0":"Aujourd'hui {lo}\xB0 \xE0 {hi}\xB0",Hintergrund:"Arri\xE8re-plan",Hinweis:"Avertissement","Hinweis + Erinnerung (Ger\xE4te)":"Avertissement + rappel (appareils)",hoch:"\xE9lev\xE9","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"\xE9lev\xE9 (texte att\xE9nu\xE9 plus marqu\xE9)",Hochformat:"Portrait","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (image, MJPEG, .m3u8 ou YouTube)",H\u00F6chstens:"Au plus","H\xF6chstens (s)":"Au plus (s)","H\xF6chstens Eintr\xE4ge":"Entr\xE9es au plus",H\u00F6he:"Hauteur","iCloud-Album":"Album iCloud",Icon:"Ic\xF4ne","Immer dunkel":"Toujours sombre","Immer hell":"Toujours clair","Immer hoch":"Toujours portrait","Immer quer":"Toujours paysage","Import fehlgeschlagen: {error}":"\xC9chec de l'import : {error}",Importieren:"Importer","Importierte Seite":"Page import\xE9e","In den Editor \xFCbernehmen":"Reprendre dans l'\xE9diteur","in den letzten \u2026 Minuten":"dans les \u2026 derni\xE8res minutes","In der Ruhezeit":"Pendant les heures calmes","In der Station":"Sur la base","in {n} Tagen":"dans {n} jours","Info mit Kopfzeile":"Info avec titre",Infozeile:"Ligne d'info","Innen {temp}\xB0":"Int\xE9rieur {temp}\xB0","Innenabstand (px)":"Marge int\xE9rieure (px)",Innentemperatur:"Temp\xE9rature int\xE9rieure","Ist M\xFCllkalender":"Est un calendrier des poubelles",Ja:"Oui",ja:"oui","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"N'importe quelle carte du tableau de bord, p. ex. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"tout changement (boutons, event.*)",jetzt:"maintenant","Jetzt (gro\xDF)":"Maintenant (grand)","Jetzt erstellen":"Cr\xE9er maintenant",Kalender:"Calendrier","Kalt unter":"Froid en dessous de","Kalt unter \xB0C":"Froid en dessous de \xB0C",Kamera:"Cam\xE9ra","Kamera / Webcam":"Cam\xE9ra / webcam","Kamera als Hintergrund":"Cam\xE9ra en arri\xE8re-plan",Karte:"Carte","Karte (YAML)":"Carte (YAML)","Karte mit 4 Stunden":"Carte sur 4 heures","Karte nicht ladbar: {error}":"La carte n'a pas pu \xEAtre charg\xE9e : {error}","Karte unten rechts":"Carte en bas \xE0 droite","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Carte \xAB {type} \xBB (visible seulement dans Home Assistant)",Karten:"Cartes","Karten-Deckkraft (%)":"Opacit\xE9 des cartes (%)","kein Ausl\xF6ser":"aucun d\xE9clencheur","Kein Display konfiguriert":"Aucun affichage configur\xE9","Kein Display.":"Aucun affichage.","Kein Regen bis {h} Uhr":"Pas de pluie avant {h}:00","kein Stil gefunden":"aucun style trouv\xE9","kein Ton":"pas de son",keine:"aucun","Keine Bewegung in letzter Zeit":"Pas de mouvement r\xE9cent","Keine Karte konfiguriert":"Aucune carte configur\xE9e","Keine Preisdaten":"Pas de donn\xE9es de prix","keine Seite":"aucune page","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"Aucune page reconnue (\xAB widgets \xBB manquant).","keine Seite sichtbar":"aucune page visible","Keine Termine in den n\xE4chsten Tagen":"Pas de rendez-vous dans les prochains jours","Keine von \u2026 (nicht)":"Aucun de \u2026 (non)","Keine Warnungen":"Aucune alerte","Keiner gew\xE4hlt = alle":"Aucun choisi = tous","KI-Zusammenfassung":"R\xE9sum\xE9 IA",Klar:"Effacer","klein (Kopfzeile)":"petit (en-t\xEAte)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Petit en bas \xE0 droite, p. ex. \xAB Cuxhaven \xBB","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Textes plus petits (libell\xE9s, listes, d\xE9tails) \u2013 pour lire de loin","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Cliquez dans le champ pour les sons int\xE9gr\xE9s \u2013 ou un lien (/local/son.mp3). Sur la tablette via Fully.",Klingel:"Sonnette","Klingel \u2192 Vollbild":"Sonnette \u2192 plein \xE9cran","Knapp, nur Fakten":"Bref, uniquement les faits",Kontrast:"Contraste",Kopieren:"Copier","Kopieren (\u2318C)":"Copier (\u2318C)",Kosten:"Co\xFBt","Kosten-Sensor":"Capteur de co\xFBt","K\xFChl (blau)":"Frais (bleu)","K\xFCrzlich ge\xE4ndert":"Modifi\xE9 r\xE9cemment",Ladeleistung:"Puissance de charge",Ladelimit:"Limite de charge","Ladelimit {n} %":"Limite de charge {n} %",langsam:"lent",Laufband:"Bandeau d\xE9filant","Laufende Ger\xE4te":"Appareils en marche","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Vide = tous les capteurs de poubelles (\u2026_days) automatiquement","Leer = automatisch suchen":"Vide = rechercher automatiquement","Leer = Farbe des Stils":"Vide = couleur du style","Leere Seite":"Page vide",Leise:"Doux",Leistung:"Puissance","Leistung (W)":"Puissance (W)","Letzte Tage":"Derniers jours","Licht umschalten":"Allumer/\xE9teindre la lumi\xE8re","Lichter an":"Lumi\xE8res allum\xE9es",Lichtschimmer:"Reflet",Linie:"Ligne",links:"gauche","Liquid Glass":"Liquid Glass",Liste:"Liste","Liste mit Vorschaubildern":"Liste avec vignettes",Live:"En direct","Lovelace-Karte (YAML)":"Carte Lovelace (YAML)",Luftfeuchte:"Humidit\xE9","Luftfeuchte (Raum)":"Humidit\xE9 (pi\xE8ce)","Luftqualit\xE4t (AQI)":"Qualit\xE9 de l'air (AQI)",L\u00E4dt:"En charge","L\xE4dt in der Station":"En charge sur la base","L\xE4dt \u2026":"Chargement \u2026","L\xE4uft gerade":"En cours de lecture","L\xE4uft-Entit\xE4t":"Entit\xE9 en marche",L\u00F6schen:"Supprimer",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 ou washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Plusieurs webcams \xE0 tour de r\xF4le",Melder:"Capteur",Meldungen:"Messages","Mindestens (s)":"Au moins (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"Au moins une personne (person.*) est \xAB \xE0 la maison \xBB.","Mindestens eine von \u2026 (oder)":"Au moins un de \u2026 (ou)",Minimal:"Minimal",Minimum:"Minimum",mittel:"moyen",mittig:"centre","Mo., 12. Okt.":"lun. 12 oct.",Modus:"Mode","Montag, 12. Oktober":"lundi 12 octobre",Morgen:"Demain",morgen:"demain","Morgen anzeigen":"Afficher demain",Musik:"Musique","Musik \u2192 Cover":"Musique \u2192 pochette","Musik-Cover":"Pochette musicale","Musik-Cover (bei Liedwechsel)":"Pochette musicale (au changement de titre)",m\u00E4\u00DFig:"mod\xE9r\xE9",M\u00FCll:"Poubelles","M\xFCll zeigen ab Tagen":"Afficher les poubelles \xE0 partir de jours",M\u00FCllabfuhr:"Collecte des d\xE9chets",M\u00FCllkalender:"Calendrier des poubelles",M\u00FClltonnen:"Poubelles","M\xFClltonnen (im Wechsel)":"Poubelles (en alternance)","M\xFCnchen \u2013 Panorama (Bild)":"Munich \u2013 panorama (image)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Ne pas r\xE9afficher pendant ce temps apr\xE8s la fin.","nach oben":"monter","nach unten":"descendre",Nachkommastellen:"D\xE9cimales","Nachlauf (s)":"Maintien apr\xE8s (s)",Nachrichten:"Actualit\xE9s","Nachrichten werden geladen \u2026":"Chargement des actualit\xE9s \u2026",Nacht:"Nuit","Nacht (gedimmt)":"Nuit (att\xE9nu\xE9e)","Nacht, wenn an":"Nuit quand activ\xE9",Nachtseite:"Page de nuit",Name:"Nom","Name der Seitenvorlage":"Nom du mod\xE8le de page","Name der Vorlage":"Nom du mod\xE8le","Name des Auftrags":"Nom de la t\xE2che","Name des Players":"Nom du lecteur","Name, z. B. Herbst":"Nom, p. ex. Automne",Nebel:"Brouillard",nein:"non","Netzname (SSID)":"Nom du r\xE9seau (SSID)","Netzname und Passwort im Editor eintragen.":"Saisissez le nom du r\xE9seau et le mot de passe dans l'\xE9diteur.","Neu laden":"Recharger","Neu laden alle (s)":"Recharger toutes les (s)","Neue Seite":"Nouvelle page","Neues Display":"Nouvel affichage","Neustart nach (s)":"Red\xE9marrer apr\xE8s (s)","Neustart-Taste":"Bouton de red\xE9marrage",nicht:"non","nicht in Wiedergabe":"pas dans la liste de lecture","nicht zeigen":"ne pas afficher","Nichts l\xE4uft gerade":"Rien ne tourne en ce moment","Nichts offen, nichts l\xE4uft":"Rien d'ouvert, rien en marche",nie:"jamais",niedrig:"bas",Noch:"Reste","Noch keine Daten im Zeitraum":"Pas encore de donn\xE9es sur cette p\xE9riode","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"Pas encore de styles personnels \u2013 r\xE9glez style, couleurs et polices et enregistrez-les ici.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"Pas encore de page \u2013 \xAB + Nouveau \xBB ci-dessus.","Noch keine Statistik im Zeitraum":"Pas encore de statistiques sur cette p\xE9riode","Noch keine Werte f\xFCr diesen Tag.":"Pas encore de valeurs pour ce jour.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"Pas encore de r\xE9sum\xE9 \u2013 il est cr\xE9\xE9 aux heures d\xE9finies.","noch {n} kWh":"encore {n} kWh","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 port et mer des Wadden (image en direct YouTube)",Normal:"Normal",normal:"normal","normal (ruhig)":"normal (calme)",Notfallmodus:"Mode secours","Nur anzeigen wenn \u2026":"Afficher seulement si \u2026","Nur auf Display \u2026":"Seulement sur l'affichage \u2026","nur auf {names}":"seulement sur {names}","Nur diese Ereignistypen":"Seulement ces types d'\xE9v\xE9nements","nur Hochformat":"portrait uniquement","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Navigateur uniquement \u2013 Fully utilise le volume multim\xE9dia de la tablette.","Nur im Hoch-/Querformat":"Seulement en portrait/paysage","Nur offene listen":"Ne citer que ceux ouverts","nur Querformat":"paysage uniquement","Nur wenn au\xDFerdem \u2026":"Seulement si aussi \u2026","Nur wenn in Tagen":"Seulement si dans les jours","Nur wenn jemand zu Hause ist":"Seulement si quelqu'un est \xE0 la maison","Nur zeigen bis Tage":"Afficher seulement jusqu'\xE0 jours","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Afficher seulement \xE0 certaines heures ou conditions","N\xE4chste Stunden":"Prochaines heures","N\xE4chste Tage":"Prochains jours",oben:"haut","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Limite sup\xE9rieure, m\xEAme si un capteur reste actif.",oder:"ou",Offen:"Ouvert",offen:"ouvert","Offene Fenster & T\xFCren":"Fen\xEAtres & portes ouvertes","Ohne Rahmen":"Sans cadre","ohne Ton zeigen":"afficher sans son","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Facultatif \u2013 sinon d'apr\xE8s l'historique Tibber.","Ort / Zusatz":"Lieu / compl\xE9ment","Ort zeigen":"Afficher le lieu",Ortsangabe:"Emplacement",Ortsname:"Nom du lieu",Passwort:"Mot de passe","Passwort zus\xE4tzlich als Text":"Afficher aussi le mot de passe en texte","Pause endet nach (min)":"La pause se termine apr\xE8s (min)",Pausiert:"En pause",pausiert:"en pause","per Link (?safe=1)":"via un lien (?safe=1)",Person:"Personne","Person, image.*, Kamera, Medienplayer \u2026":"Personne, image.*, cam\xE9ra, lecteur multim\xE9dia \u2026",Personen:"Personnes",Player:"Lecteur",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up avec carte HA","Prognose heute (kWh)":"Pr\xE9vision aujourd'hui (kWh)","Prognose heute {n} kWh":"Pr\xE9vision aujourd'hui {n} kWh","Prognose Rest (kWh)":"Pr\xE9vision restante (kWh)",Quelle:"Source",Quellen:"Sources",Querformat:"Paysage",Rahmen:"Cadre",Raum:"Pi\xE8ce",Rausstellen:"Sortir",rechts:"droite",Regen:"Pluie","Regen ab %":"Pluie \xE0 partir de %","Regen ab {h} Uhr":"Pluie \xE0 partir de {h}:00","Regen an/aus":"Pluie oui/non","Regen-Vorschau":"Pr\xE9vision de pluie",Regensensor:"Capteur de pluie",Regnet:"Il pleut",Reichweite:"Autonomie","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 plage (image en direct YouTube)",Restzeit:"Temps restant",Ring:"Anneau",Rollladen:"Volet","Rollladen/Tor umschalten":"Basculer volet/portail",Rolll\u00E4den:"Volets","Ruhezeit ab":"Heures calmes \xE0 partir de","Ruhezeit bis":"Heures calmes jusqu'\xE0",Ruhig:"Calme","Ruhig flie\xDFende Farben wie Nordlicht":"Couleurs fluides et calmes comme une aurore bor\xE9ale",R\u00E4ume:"Pi\xE8ces","R\xFCckg\xE4ngig (\u2318Z)":"Annuler (\u2318Z)",Sauger:"Aspirateur",Saugroboter:"Aspirateur robot",Saugt:"Aspire",Schicht:"Couche","Schichten gesamt":"Couches au total",Schieben:"Glisser",Schlicht:"Sobre","Schlie\xDFt nach (s)":"Se ferme apr\xE8s (s)",Schloss:"Serrure",Schnee:"Neige",Schneeregen:"Neige fondue",Schrift:"Police","Schrift des Stils":"Police du style","Schrift Text":"Police du texte","Schrift Uhr & Titel":"Police de l'horloge & des titres",Schriftfarbe:"Couleur du texte",Schriftgr\u00F6\u00DFe:"Taille du texte","Schriftgr\xF6\xDFe Punkte (px)":"Taille des puces (px)","Schwebende Partikel":"Particules flottantes","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Style suisse : \xE9criture nette, contraste \xE9lev\xE9, uniquement typographique","sehr gro\xDF (+30 %)":"tr\xE8s grand (+30 %)","sehr hoch":"tr\xE8s \xE9lev\xE9","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Tr\xE8s calme ; d\xE9sactiv\xE9 la nuit. Modifiable par page.","seit {time}":"depuis {time}",Seite:"Page","Seite importieren \u2026":"Importer une page \u2026","Seite in die Wiedergabe":"Page dans la liste de lecture","Seite unten als YAML \u2013 zum Kopieren markieren.":"Page ci-dessous en YAML \u2013 s\xE9lectionnez pour copier.","Seite zeigen":"Afficher une page","Seite zeigen (z. B. bei Bewegung)":"Afficher une page (p. ex. sur mouvement)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Page \xAB {name} \xBB copi\xE9e en YAML \u2013 collez-la ailleurs avec \xAB + Nouveau \u2192 Importer une page \xBB ou \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Page \xAB {name} \xBB cr\xE9\xE9e \u2013 adaptez les ID de page dans les actions si n\xE9cessaire.","Seite \u201E{name}\u201C l\xF6schen?":"Supprimer la page \xAB {name} \xBB ?",Seiten:"Pages","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Mod\xE8le de page \xAB {name} \xBB enregistr\xE9 \u2013 sous \xAB + Nouveau \xBB.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Supprimer le mod\xE8le de page \xAB {name} \xBB ?",Seitenwechsel:"Changement de page",Sekunden:"Secondes","Selbst ausw\xE4hlen":"Choisir moi-m\xEAme",Senkrecht:"Vertical",Sensor:"Capteur","Serifen-Uhr, warmes Wei\xDF, Bambus":"Horloge \xE0 empattements, blanc chaud, bambou",Sichtbarkeit:"Visibilit\xE9","Skript starten":"Ex\xE9cuter un script","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"Dur\xE9e pendant laquelle l'affichage reste apr\xE8s la fin du d\xE9clencheur.",Sonnig:"Ensoleill\xE9",sonnig:"ensoleill\xE9",Spalte:"Colonne",Spalten:"Colonnes",Speichern:"Enregistrer","Speichert \u2026":"Enregistrement \u2026",Sprache:"Langue",Standard:"Par d\xE9faut",Standbild:"Image fixe","Standbild neu laden (s)":"Recharger l'image fixe (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"Style StandBy, sobre, sauge",Standort:"Emplacement",Starkregen:"Forte pluie","startet immer wieder neu":"red\xE9marre sans cesse","Startkonfiguration anzeigen":"Afficher la configuration de d\xE9part",Status:"\xC9tat","Steht drau\xDFen":"Absent","Steht zuhause":"Gar\xE9 \xE0 la maison",Stil:"Style","Stil als YAML in die Zwischenablage kopiert.":"Style copi\xE9 dans le presse-papiers en YAML.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Style ci-dessous en YAML \u2013 s\xE9lectionnez pour copier.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Style appliqu\xE9 \u2013 rendez-le d\xE9finitif avec \xAB Enregistrer \xBB.","Stil-Farbe":"Couleur du style","Stil-Schrift":"Police du style",Strompreis:"Prix de l'\xE9lectricit\xE9","Strompreis heute":"Prix de l'\xE9lectricit\xE9 aujourd'hui","Stufe hinzuf\xFCgen":"Ajouter un palier",Stunde:"Heure",Stunden:"Heures","Stunden-Kurve":"Courbe horaire",St\u00E4rke:"Intensit\xE9",St\u00F6rung:"Panne","Szene aktivieren":"Activer la sc\xE8ne",Tag:"Jour",Tage:"Jours","Tage bis Abholung":"Jours avant la collecte","Tage voraus":"Jours \xE0 l'avance","Tage-Sensor":"Capteur de jours",Tagesbilanz:"Bilan du jour",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau ou https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 ou l'adresse d'un flux RSS",Teil:"Partie",Teile:"Parties","Teils bew\xF6lkt":"Partiellement nuageux",Temperatur:"Temp\xE9rature",Temperaturen:"Temp\xE9ratures",Tempo:"Vitesse","Tempo (px/s)":"Vitesse (px/s)",Termin:"Rendez-vous","Termin in den n\xE4chsten Tagen":"Rendez-vous dans les prochains jours",Termine:"Rendez-vous",Testen:"Tester",teuer:"cher",Text:"Texte","Text & Vorlage":"Texte & mod\xE8le","Text aus Entit\xE4t":"Texte d'une entit\xE9","Text danach":"Texte apr\xE8s","Text ohne Warnung":"Texte sans alerte","Text wenn alles ruhig":"Texte quand tout est calme","Text wenn nichts l\xE4uft":"Texte quand rien ne tourne",Textgr\u00F6\u00DFe:"Taille du texte","Tibber-Zuhause":"Logement Tibber","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Astuce : cliquez sur un widget pour le modifier.","Tippen zum Schlie\xDFen":"Toucher pour fermer",Titel:"Titre","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau en For\xEAt-Noire \u2013 village et Hasenhorn (image)",Ton:"Son",Tonne:"Poubelle",Tonnen:"Poubelles","Tonnen der n\xE4chsten \u2026 Tage":"Poubelles des \u2026 prochains jours",Trocken:"Sec",trocken:"sec","Trocken ab etwa {h} Uhr":"Sec \xE0 partir de {h}:00 environ",Uhr:"Horloge","Uhrzeit von \u2013 bis":"Heure de \u2013 \xE0","Uhrzeit {from}\u2013{to}":"Heure {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Heures s\xE9par\xE9es par des virgules ; chacune est une requ\xEAte \xE0 l'IA.",Umwelt:"Environnement",und:"et",ungesund:"malsain",unten:"bas",unter:"en dessous",Unterwegs:"En route",Unterzeile:"Sous-ligne",Unwetter:"Intemp\xE9ries","UV-Index":"Indice UV",Verbrauch:"Consommation",Verlauf:"Historique","Verlauf (Tage)":"Historique (jours)","Verlauf nicht verf\xFCgbar":"Historique indisponible","Verlauf wird geladen \u2026":"Chargement de l'historique \u2026",Verriegelt:"Verrouill\xE9",Verschl\u00FCsselung:"Chiffrement","Verstecktes Netz":"R\xE9seau masqu\xE9",Verwerfen:"Annuler les modifications","Voll um":"Plein \xE0","voll um {time}":"plein \xE0 {time}",Vollbild:"Plein \xE9cran","Vollbild (Klingel, Alarm)":"Plein \xE9cran (sonnette, alarme)","von Zustand":"depuis l'\xE9tat","von {n} geschlossen":"sur {n} ferm\xE9s","vor {n} h":"il y a {n} h","vor {n} min":"il y a {n} min","Vorher nachfragen":"Demander d'abord","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Version pr\xE9c\xE9dente charg\xE9e \u2013 restaurez-la avec \xAB Reprendre dans l'\xE9diteur \xBB et \xAB Enregistrer \xBB.","Vorherige Fassung laden":"Charger la version pr\xE9c\xE9dente",Vorlage:"Mod\xE8le","Vorlage (Jinja)":"Mod\xE8le (Jinja)","Vorlage l\xF6schen":"Supprimer le mod\xE8le","Vorlage nicht verf\xFCgbar":"Mod\xE8le indisponible","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Mod\xE8le \xAB {name} \xBB enregistr\xE9 \u2013 sous \xAB Mod\xE8les personnels \xBB.","Vorlage \u201E{name}\u201C l\xF6schen?":"Supprimer le mod\xE8le \xAB {name} \xBB ?",Vorschau:"Aper\xE7u","Vorschau (schnell)":"Aper\xE7u (rapide)",Waagerecht:"Horizontal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe n'est pas joignable : {error}","Ambiframe nicht erreichbar":"Ambiframe injoignable","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 mode secours","Wann?":"Quand ?","Warm \xFCber \xB0C":"Chaud au-dessus de \xB0C","Warn-Sensoren":"Capteurs d'alerte",Warnung:"Alerte","Warnung (rot)":"Alerte (rouge)","Warnung \u2192 Vollbild":"Alerte \u2192 plein \xE9cran",Warnungen:"Alertes","Waschmaschine fertig":"Lave-linge termin\xE9",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Ajouter une webcam","Webcam-Link":"Lien de la webcam","Wechsel nach (s)":"Changer apr\xE8s (s)","Weich (Unsch\xE4rfe)":"Doux (flou)","Weiter geht's":"Reprend","Weitere Ausl\xF6ser":"Autres d\xE9clencheurs","Weitere Werte":"Autres valeurs","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"Blanc et or \u2013 sombre sur noir, clair sur ivoire","Welches Display ist das?":"Quel affichage est-ce ?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein est (image, toutes les 10 min)","Wenn Ordner und Album leer sind":"Si le dossier et l'album sont vides",Wert:"Valeur","Wert wird blau, wenn er darunter liegt.":"La valeur devient bleue en dessous.","Werte-Liste":"Liste de valeurs",Wetter:"M\xE9t\xE9o","Wetter-Entit\xE4t fehlt":"Entit\xE9 m\xE9t\xE9o manquante","Widget hinzuf\xFCgen:":"Ajouter un widget :","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget copi\xE9 \u2013 collez-le sur une page avec \u2318V ou \xAB Coller \xBB.","Widget kopiert.":"Widget copi\xE9.","wie der Stil":"comme le style","wie Design":"comme le design","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Comme un magazine : grands empattements, papier, lignes fines","wie oben":"comme ci-dessus","wie Stil":"comme le style",Wiedergabe:"Lecture","Wiedergabe anhalten/fortsetzen":"Mettre en pause/reprendre la lecture","Wiedergabe/Pause":"Lecture/pause",Wiedergabeliste:"Liste de lecture","Wiederholen (\u21E7\u2318Z)":"R\xE9tablir (\u21E7\u2318Z)",Wind:"Vent",Windig:"Venteux","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Press\xE9 quand l'affichage ne se signale plus \u2013 p. ex. Fully \xAB Charger l'URL de d\xE9marrage \xBB.","Wird geladen \u2026":"Chargement \u2026","Wird heute abgeholt":"Collect\xE9 aujourd'hui","WLAN-QR-Code":"Code QR Wi-Fi","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"R\xE9afficher pendant la lecture ; vide ou 0 = seulement au changement de titre","W\xE4sche fertig":"Lessive termin\xE9e","YAML ist nicht lesbar: {error}":"YAML illisible : {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"p. ex. visites de la liti\xE8re, remis \xE0 z\xE9ro chaque jour","z. B. KI-Analyse der Kamera":"p. ex. analyse IA de la cam\xE9ra","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"p. ex. description IA ou titre d'alerte","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"p. ex. plusieurs d\xE9tecteurs de mouvement \u2013 un seul suffit","z. B. type: entities, entities: [light.kueche]":"p. ex. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"P. ex. heure 05:00\u201311:00 pour une page du matin. La condition propre de la page s'applique aussi.","z. B. \u201EGeocoded Location\u201C der Companion-App":"p. ex. \xAB Geocoded Location \xBB de l'application compagnon","Zahl \xFCber/unter":"Nombre au-dessus/en dessous",Zeile:"Ligne",Zeilen:"Lignes","Zeitraum (min)":"P\xE9riode (min)","Zeitraum (Stunden)":"P\xE9riode (heures)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Glisser ou les touches fl\xE9ch\xE9es d\xE9placent tout ensemble. \u21E7/\u2318-clic en retire un, \xC9chap annule la s\xE9lection.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Glisser pour d\xE9placer \xB7 point en bas \xE0 droite pour redimensionner \xB7 fl\xE8ches pour d\xE9placer, avec \u21E7 la taille \xB7 \u21E7/\u2318-clic s\xE9lectionne plusieurs \xB7 \u2318C/\u2318V copier-coller \xB7 \u232B supprime \xB7 \u2318D duplique \xB7 \u2318Z annule","Ziel-Entit\xE4t":"Entit\xE9 cible",Zoom:"Zoom",zu:"ferm\xE9","zu feucht":"trop humide","zu Zustand":"vers l'\xE9tat","zu Zustand (optional)":"vers l'\xE9tat (facultatif)","Zugspitze (Bild, alle 10 min)":"Zugspitze (image, toutes les 10 min)",Zuhause:"Maison","Zuletzt fertig {when}":"Derni\xE8re fin {when}","zuletzt {time}":"dernier {time}","Zur\xFCck nach (s)":"Retour apr\xE8s (s)","Zur\xFCck zu Ambiframe":"Retour \xE0 Ambiframe",Zusammenfassung:"R\xE9sum\xE9",Zusatzwert:"Valeur suppl\xE9mentaire","Zusatzwert Name":"Nom de la valeur suppl\xE9mentaire",Zustand:"\xC9tat","Zustand ist":"L'\xE9tat est","Zustand ist nicht":"L'\xE9tat n'est pas","Zwischendurch alle (min)":"Entre-temps toutes les (min)",z\u00E4hlen:"compter","Z\xE4hler \u201Eheute\u201C":"Compteur \xAB aujourd'hui \xBB","{day} Abend":"{day} soir","{entity} ge\xE4ndert ({n} min)":"{entity} modifi\xE9 ({n} min)","{entity} in {n} Tagen":"{entity} dans {n} jours","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} en marche","{name} offen":"{name} ouvert","{name} \u2013 wirklich?":"{name} \u2013 vraiment ?","{n} % aus eigener Sonne":"{n} % d'\xE9nergie solaire propre","{n} % Wahrscheinlichkeit":"{n} % de probabilit\xE9","{n} Lichter an":"{n} lumi\xE8res allum\xE9es","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets s\xE9lectionn\xE9s","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets copi\xE9s \u2013 collez-les sur une page avec \u2318V ou \xAB Coller \xBB.","{n} Widgets kopiert.":"{n} widgets copi\xE9s.","{time} Uhr":"{time}","\xE4ltere Version":"ancienne version","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Cam\xE9ra publique au lieu d'une cam\xE9ra HA \u2013 suggestions en cliquant dans le champ",\u00D6ffnen:"Ouvrir","\xD8 {n} pro Tag":"\xD8 {n} par jour",\u00FCber:"haut",\u00DCberblenden:"Fondu",\u00DCberblick:"Vue d'ensemble",\u00DCbergang:"Transition","\xDCbergang (s)":"Transition (s)",\u00FCbermorgen:"apr\xE8s-demain",\u00DCbernehmen:"Reprendre","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Repris \u2013 rendez-le d\xE9finitif avec \xAB Enregistrer \xBB.",\u00DCberschrift:"Titre","\xDCberschrift klein":"Petit titre","\u2013 w\xE4hlen \u2013":"\u2013 choisir \u2013","\u2026 aus Attribut":"\u2026 d'un attribut","\u2026 oder Bild einer Entit\xE4t":"\u2026 ou image d'une entit\xE9","\u2026 oder Webcam-Link":"\u2026 ou lien de webcam",Fran\u00E7ais:"Fran\xE7ais","Le Figaro (FR)":"Le Figaro (FR)","Le Monde (FR)":"Le Monde (FR)","NOS (NL)":"NOS (NL)","NU.nl (NL)":"NU.nl (NL)",Nederlands:"Nederlands","RFI (FR)":"RFI (FR)","VRT NWS (BE)":"VRT NWS (BE)","franceinfo (FR)":"franceinfo (FR)","{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.":"{names} : r\xE9glage clair/sombre propre \u2013 il s'applique l\xE0.","F\xFCr alle \xFCbernehmen":"Appliquer \xE0 tous"};var Xr={"% Luftfeuchte":"% luchtvochtigheid","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = bij elke wijziging \u2013 bijv. voor knoppen en event.*-entiteiten","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = livebeeld","1 Licht an":"1 lamp aan","12 / Vollbild 15":"12 / volledig scherm 15","168 = eine Woche, 720 = 30 Tage":"168 = \xE9\xE9n week, 720 = 30 dagen",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"vanaf","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"Vanaf de laatste trigger; zolang een sensor aan staat, blijft de pagina sowieso.","ab Wert":"vanaf waarde","ab {n}":"vanaf {n}",Abbrechen:"Annuleren",Abendstimmung:"Avondsfeer",Abholung:"Ophaling","Abholung {when}":"Ophaling {when}","Abklingzeit (s)":"Afkoeltijd (s)","Achse bis":"As tot","Achse von":"As vanaf",Akku:"Batterij","Akku %":"Batterij %",Aktion:"Actie","Aktion (domain.dienst)":"Actie (domain.service)","Aktion/Skript ausf\xFChren":"Actie/script uitvoeren",Aktiv:"Actief","Aktuellen Stil speichern":"Huidige stijl opslaan","Aktuellen Wert zeigen":"Huidige waarde tonen","Aktueller Preis":"Huidige prijs","Aktueller Raum":"Huidige ruimte",Akzent:"Accent","Akzent (Gold)":"Accent (goud)",Akzentfarbe:"Accentkleur","Alarm (eindringlich, wiederholt)":"Alarm (dringend, herhaalt)","Alle Bewegungs-/Pr\xE4senzmelder":"Alle bewegings-/aanwezigheidssensoren","Alle Fenster- und T\xFCrsensoren":"Alle raam- en deursensoren","Alle von \u2026 (und)":"Allemaal \u2026 (en)","Alles ruhig":"Alles rustig","Als eigene Seitenvorlage speichern":"Opslaan als eigen paginasjabloon","Als eigene Vorlage speichern":"Opslaan als eigen sjabloon","Als Karte":"Als kaart","Als Vorlage":"Als sjabloon","Als YAML kopieren":"Kopi\xEBren als YAML","Am g\xFCnstigsten":"Goedkoopst","am {day}":"op {day}",An:"Aan",an:"aan","An/Aus":"Aan/uit",Angehalten:"Gepauzeerd",Angesteckt:"Ingeplugd",Animation:"Animatie",Antippen:"Tikken",Anwenden:"Toepassen","Anzeige (Ring)":"Meter (ring)","Anzeige, Editor und KI-Zusammenfassung":"Weergave, editor en AI-samenvatting",Anzeigefehler:"weergavefout",Art:"Soort",Attribut:"Attribuut","Attribut (optional)":"Attribuut (optioneel)","Auch nachts":"Ook 's nachts","Auch pausiert zeigen":"Ook tonen bij pauze","Auf dem Ger\xE4t \xF6ffnen":"Openen op het apparaat",Auftrag:"Opdracht","Auftrag/Druck":"Opdracht/print",Aurora:"Aurora",Aus:"Uit",aus:"uit","aus Home Assistant eingeschaltet":"ingeschakeld vanuit Home Assistant",Ausl\u00F6ser:"Trigger",Ausnehmen:"Uitsluiten",Ausrichtung:"Ori\xEBntatie",Auto:"Auto",automatisch:"automatisch","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatisch (per apparaat, ook bij draaien)","automatisch (wie der HA-Benutzer)":"automatisch (zoals de HA-gebruiker)","Automatisch anordnen":"Automatisch indelen","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Automatisch onder elkaar \u2013 verschuiven maakt een eigen indeling","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatisch \u2013 licht overdag, donker na zonsondergang","automatisch: Gemini":"automatisch: Gemini",Balken:"Balken",Bedienmodus:"Bedieningsmodus","1 Woche":"1 week","12 Stunden":"12 uur","2 Tage":"2 dagen","24 Stunden":"24 uur","6 Stunden":"6 uur",Gestern:"Gisteren","Keine Mitteilungen":"Geen meldingen",Mitteilungen:"Meldingen","Mitteilungen ({n})":"Meldingen ({n})",Mitteilungszentrale:"Meldingencentrum","Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C.":"Overzicht van gebeurtenissen \u2013 in het snelmenu (lang indrukken) onder \u201EMeldingen\u201D.","Verlauf leeren":"Overzicht wissen","Verlauf reicht zur\xFCck":"Overzicht reikt terug","0 = bei Pause sofort ausblenden":"0 = bij pauze direct verbergen","1 Stunde":"1 uur","1 Tag":"1 dag","15 Minuten":"15 minuten","2 Erinnerungen":"2 herinneringen","2 Stunden":"2 uur","3 Erinnerungen":"3 herinneringen","30 Minuten":"30 minuten","4 Erinnerungen":"4 herinneringen","4 Stunden":"4 uur","5 Erinnerungen":"5 herinneringen","8 Stunden":"8 uur","Alle entfernen":"Alles wissen","Ausblenden nach (s)":"Verbergen na (s)","Cover zeigen":"Hoes tonen",Ecke:"Hoek","Erinnerung oben rechts":"Herinnering rechtsboven","Erinnerungen oben rechts":"Herinneringen rechtsboven","Fortschritt zeigen":"Voortgang tonen","Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft.":"Per nummer: na zoveel seconden verbergen, bij het volgende nummer weer tonen. Leeg = zolang er iets speelt.","Nach Pause noch (s)":"Na pauze nog (s)","Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht.":"Na de melding blijft rechtsboven een kleine herinnering staan \u2013 blijvend, een tijdje of helemaal niet.","Stapeln ab":"Stapelen vanaf","Weg, wenn das Ger\xE4t wieder startet":"Weg als het apparaat weer start","Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf.":"Zoals meldingen op iOS: een stapel met een getal, tik om uit te klappen.","Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt.":"Bijv. de wasmachine start weer \u2013 dan is de oude herinnering afgehandeld.","Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis":"Bijv. \u201EWas klaar\u201D na een melding","bleibt, bis man sie antippt":"blijft tot erop getikt wordt",dauerhaft:"blijvend",gro\u00DF:"groot","keine Erinnerung":"geen herinnering",klein:"klein","nie stapeln":"nooit stapelen","oben links":"linksboven","oben rechts":"rechtsboven","ohne (nur Text und Cover)":"geen (alleen tekst en hoes)","unten links":"linksonder","unten rechts":"rechtsonder","+ Ton hinzuf\xFCgen":"+ Geluid toevoegen","Abstand (s)":"Tussenpoos (s)","Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.":"Upload een audiobestand in HA onder Media \u2192 Lokale media en kies het hier \u2013 of vul een link in. Daarna is het geluid bij elke gebeurtenis te kiezen.","Eigene T\xF6ne":"Eigen geluiden","Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.":"Klik in het veld voor eigen en meegeleverde geluiden \u2013 of vul een link in (/local/geluid.mp3, media-source://\u2026). Eigen geluiden leg je links aan onder \u201EEigen geluiden\u201D.","Mein Ton":"Mijn geluid",Wiederholen:"Herhalen","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)":"tot erop getikt of gesloten wordt (max. 2 min)","eigener Ton":"eigen geluid",einmal:"\xE9\xE9n keer","einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)":"\xE9\xE9n keer (het geluid \u201EAlarm\u201D herhaalt bij een alarm op volledig scherm tot erop getikt wordt)","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australi\xEB","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Afbeeldingen en bijschriften van de Bing-afbeeldingen van de dag","Bing-Region":"Bing-regio",Brasil:"Brazili\xEB","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Duitsland","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"Een \u201Eartikel van de dag\u201D bestaat alleen in deze talen.",Espa\u00F1a:"Spanje","FAZ (DE)":"FAZ (DE)",France:"Frankrijk","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"In de videostream (AirPlay, camera) staat de nieuwsticker altijd uit \u2013 daar zou hij stilstaan of haperen.",India:"India",Italia:"Itali\xEB","NPR (US)":"NPR (US)","Nachrichten-Laufband":"Nieuwsticker",Nederland:"Nederland","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Zwitserland","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"Verenigd Koninkrijk","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Kies een suggestie (bijv. bbc, guardian, tagesschau) of vul het adres van een willekeurige RSS-/Atom-feed in. Leeg = bronnen in de taal van de weergave.","Wikipedia-Sprache":"Wikipedia-taal","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 Duits, citaat van de week","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 Engels, citaat van de dag","automatisch (aus beim Fernseher)":"automatisch (uit op tv's)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 of https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"zoals de weergave","wie die Sprache von Home Assistant":"volgens de taal van Home Assistant",\u00D6sterreich:"Oostenrijk","wie alle":"zoals alle",Automatisch:"Automatisch",Hell:"Licht",Dunkel:"Donker","Zitat der Woche":"Citaat van de week",Zitat:"Citaat","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Citaat: in het Duits het citaat van de week (Wikiquote), in het Engels het citaat van de dag (ZenQuotes)","+ Neu":"+ Nieuw",Quer:"Liggend",Hoch:"Staand","Eigene Farben zur\xFCcksetzen":"Eigen kleuren resetten","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"Nog geen gebeurtenissen \u2013 \u201E+ Nieuw\u201D hierboven.","1 Hinweis":"1 opmerking","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Bing-afbeeldingen van de dag ook tussen je eigen foto's","nein \u2013 nur, wenn nichts Eigenes da ist":"nee \u2013 alleen als er geen eigen foto's zijn","Bing-Bilder untermischen":"Bing-afbeeldingen ertussen mengen","Jetzt: {what} bis {time}":"Nu: {what} tot {time}","Termine der n\xE4chsten \u2026 Stunden":"Afspraken in de komende \u2026 uur","N\xE4chster Termin":"Volgende afspraak","Guten Morgen":"Goedemorgen","Leer = die ersten Kalender automatisch":"Leeg = eerste agenda's automatisch","Guten Abend":"Goedenavond","Guten Tag":"Goedemiddag","Keine Abholung":"Geen ophaling","Regenrisiko {n} %":"Kans op regen {n} %","Regen ab etwa {time} Uhr":"Regen vanaf ongeveer {time}","Wetter heute":"Weer vandaag","Heute keine Termine":"Vandaag geen afspraken","Termine heute":"Afspraken vandaag","Tagesvorschau am Morgen":"Dagvoorbeeld 's ochtends",Tagesvorschau:"Dagvoorbeeld","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Maakt de schakelaar \u201EOp de tv\u201D aan \u2013 stuurt de weergave via AirPlay naar de Apple TV","Fernseher (Apple TV)":"Tv (Apple TV)","Fenster zu! Es regnet":"Ramen dicht! Het regent","Nur zeigen, wenn":"Alleen tonen als","z. B. Fenster \u2013 die offenen werden genannt":"bijv. ramen \u2013 de open ramen worden genoemd","Nur wenn eine davon an ist":"Alleen als een van deze aan staat","Endzeit statt Restzeit":"Eindtijd in plaats van resterende tijd","z. B. aktueller Raum des Saugers":"bijv. de huidige ruimte van de robotstofzuiger",Zusatz:"Toevoeging","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"speelt","Es regnet":"Het regent","noch {time}":"nog {time}","Restzeit oder Endzeit":"Resterende tijd of eindtijd","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Leeg = gebruikelijke \u201Eloopt\u201D-toestanden","L\xE4uft bei Zustand":"Loopt bij toestand","Zeigen bei Zustand":"Tonen bij toestand","Wiedergabe (z. B. Apple TV)":"Weergave (bijv. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Apparaat loopt \u2013 met resterende tijd","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Melding \u2013 alleen als waar (bijv. regen)","L\xE4uft gerade (ganze Seite)":"Speelt nu (hele pagina)","Ganze Seite mit gro\xDFem Cover":"Hele pagina met grote hoes",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, uitzicht over de Waddenzee en de Halligen (afbeelding)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, Zwarte Woud \u2013 Todtnauer H\xFCtte (afbeelding)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Saarland \u2013 westoever met jachthaven (afbeelding)",Saugkarte:"Schoonmaakkaart","Leer = Karte des Saugers automatisch":"Leeg = eigen kaart van de stofzuiger","Gro\xDFe Karte darunter":"Grote kaart eronder",Ausblenden:"Verbergen","Neben jedem Sauger":"Naast elke stofzuiger","Kleine Karten":"Kleine kaarten","Tagesinhalt (Wikipedia, Zitat)":"Dagelijkse inhoud (Wikipedia, citaat)","Wikipedia-Artikel des Tages":"Wikipedia-artikel van de dag","Zitat des Tages":"Citaat van de dag","Artikel des Tages \xB7 Wikipedia":"Artikel van de dag \xB7 Wikipedia","Mit Bild":"Met afbeelding","Ohne Bild":"Zonder afbeelding",Inhalt:"Inhoud",Anzahl:"Aantal","Energiez\xE4hler (kWh)":"Energiemeter (kWh)","Gr\xF6\xDFte Verbraucher":"Grootste verbruikers","Gr\xF6\xDFte Verbraucher heute":"Grootste verbruikers vandaag","Heute noch kein Verbrauch gemessen":"Vandaag nog geen verbruik gemeten","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Leeg = de afzonderlijke apparaten uit het energiedashboard van Home Assistant","Wird berechnet \u2026":"Wordt berekend \u2026","Richtung umkehren":"Richting omkeren","Wenn der Antrieb offen und zu andersherum meldet":"Als de motor open en dicht andersom meldt",ausgefahren:"uitgeschoven",eingefahren:"ingeschoven","Gilt f\xFCr":"Geldt voor","Alle Displays":"Alle weergaven","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"\u201E{name}\u201D vormgeven: wat je hier instelt, geldt alleen voor deze weergave. Leeg = zoals bij alle weergaven.","Stil wie alle Displays":"Stijl zoals alle weergaven","Alle Abweichungen dieses Displays zur\xFCcksetzen":"Alle afwijkingen van deze weergave resetten","wie alle Displays":"zoals alle weergaven","Mit Stil-Vorschau gestalten":"Vormgeving met stijlvoorbeeld","4K und Full HD (zwei Kameras)":"4K en Full HD (twee camera's)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera's \u201EAmbiframe {name} Videostream\u201D (4K) en \u201E\u2026 Videostream Full HD\u201D \u2013 in een dashboard, in Apple Woning (HomeKit Bridge) of via \u201Ecamera.play_stream\u201D op de Apple TV.",Aufl\u00F6sung:"Resolutie","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"Voor oled-schermen: het beeld verschuift om de paar minuten onmerkbaar een paar pixels, zodat niets inbrandt. Het best samen met \u201Edonker\u201D.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera \u201EAmbiframe {name} Videostream\u201D \u2013 in een dashboard, in Apple Woning (HomeKit Bridge) of via \u201Ecamera.play_stream\u201D op de Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Maakt de camera \u201EVideostream\u201D aan \u2013 bijv. voor Apple TV (AirPlay), Apple Woning of tv's zonder moderne browser. Vereist de add-on \u201EPuppet\u201D. Er wordt alleen gerenderd zolang iemand kijkt.","Neues Bild alle (s)":"Nieuw beeld elke (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Alleen nodig als Puppet niet gevonden wordt, bijv. http://homeassistant.local:10000","OLED-Schutz":"Oled-bescherming","Puppet-Adresse":"Puppet-adres",Videostream:"Videostream","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"Alles in orde","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"Alles in orde: alle entiteiten aanwezig, apparaten verbonden, foto's beschikbaar.","Das iCloud-Album liefert keine Fotos":"Het iCloud-album levert geen foto's","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"De fotolijst heeft geen foto's (map en album leeg, Bing uit)","Der Fotoordner ist leer oder fehlt":"De fotomap is leeg of ontbreekt","Display \u201E{name}\u201C":"Weergave \u201E{name}\u201D","Display \u201E{name}\u201C meldet sich nicht":"Weergave \u201E{name}\u201D reageert niet","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"Weergave \u201E{name}\u201D reageert al {n} uur niet","Display \u201E{name}\u201C war noch nie verbunden":"Weergave \u201E{name}\u201D is nog nooit verbonden geweest","Ereignis \u201E{name}\u201C":"Gebeurtenis \u201E{name}\u201D","Fotos werden gez\xE4hlt \u2026":"Foto's tellen \u2026",Gesundheitscheck:"Controle","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"Controle: ontbrekende entiteiten, apparaten, foto's","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"AI-samenvatting staat aan, maar er is geen AI (ai_task) in Home Assistant","Seite \u201E{name}\u201C":"Pagina \u201E{name}\u201D","Seite \u201E{name}\u201C wird nirgends gezeigt":"Pagina \u201E{name}\u201D wordt nergens getoond","{n} Hinweise":"{n} opmerkingen","{id} gibt es nicht (mehr) \u2013 {where}":"{id} bestaat niet (meer) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} is niet beschikbaar \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\u201E{name}\u201D heeft nog een oudere versie","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\u201E{name}\u201D staat in de noodmodus: {reason}","1 Stunde stumm":"1 uur stil",Anhalten:"Pauzeren",Dunkler:"Donkerder","Eine Stunde stumm":"Een uur stil",Heller:"Lichter","Helligkeit {n} %":"Helderheid {n} %",Schlie\u00DFen:"Sluiten",Schnellmen\u00FC:"Snelmenu","T\xF6ne an":"Geluid aan","T\xF6ne wieder an":"Geluid weer aan","Weiter abspielen":"Verder","Alle Batterien in Ordnung":"Alle batterijen in orde","Ger\xE4te und schwache Batterien":"Apparaten en lege batterijen","Nur Ger\xE4te":"Alleen apparaten","Nur schwache Batterien":"Alleen lege batterijen",Zeigen:"Tonen","+ {n} weitere":"+ nog {n}",Akkus:"Batterijen",Akkustand:"Batterijniveau","Batterie wechseln":"Batterij vervangen","Ger\xE4te (immer zeigen)":"Apparaten (altijd tonen)","H\xF6chstens Zeilen Zubeh\xF6r":"Max. regels accessoires","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Leeg = alle telefoons, tablets en horloges uit de HA-app automatisch","Zubeh\xF6r zeigen unter (%)":"Accessoires tonen onder (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessoires: alle batterijen in orde",schwach:"laag","Pfeile zum Bl\xE4ttern":"Pijlen om te bladeren","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Subtiel linksonder en rechtsonder: vorige en volgende pagina zonder Ambiframe te verlaten","Vorherige Seite":"Vorige pagina","N\xE4chste Seite":"Volgende pagina","Karte unten rechts (kurz beim Liedwechsel)":"Kaart rechtsonder (kort bij nummerwissel)","Vollbild (kurz beim Liedwechsel)":"Volledig scherm (kort bij nummerwissel)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Minikaart \u2013 blijft zolang er iets speelt","Eigenes QR-Bild":"Eigen QR-afbeelding","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"In plaats van netwerknaam en wachtwoord een kant-en-klare QR-afbeelding, bijv. uit je router (link of data:image/\u2026)","Adresse kopieren":"Adres kopi\xEBren","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Alles in \xE9\xE9n oogopslag: foto's, weer, afspraken, afval, huishouden en energie. Tikken opent het dashboard.","Ambiframe als Bildschirmschoner":"Ambiframe als schermbeveiliging","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe loopt altijd; tikken toont het HA-dashboard, daarna keert het vanzelf terug.",Anh\u00F6ren:"Beluisteren","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Beweging aan de deur \u2192 camera als beeld-in-beeld","Bing-Bilder, wenn Ordner und Album leer sind":"Bing-afbeeldingen als map en album leeg zijn","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"Het profiel kiest passende pagina's, bediening, geluiden en uiterlijk. Alles is achteraf aan te passen.","Dashboard \xFCber Ambiframe":"Dashboard over Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Deze weergave kopi\xEBren met alle instellingen","Display \u201E{name}\u201C mit {n} Seiten":"Weergave \u201E{name}\u201D met {n} pagina's","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"Een rustig beeld \u2013 dat alleen iets zegt als er iets gebeurt",Fernseher:"Tv","Fertig \u2013 speichern":"Klaar \u2013 opslaan","Fertig!":"Klaar!",Flur:"Gang","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"Foto's-app \u2192 album delen \u2192 \u201EOpenbare website\u201D aanzetten \u2192 link kopi\xEBren.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk gevonden: Ambiframe stelt de startpagina en schermbeveiliging zelf in en herstart de tablet als hij vastloopt.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully toont het dashboard; na een minuut zonder aanraking verschijnt Ambiframe. Deurbel en camera halen het direct naar voren.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"Voor de fotolijst. Map en album worden gemengd; zonder beide toont Ambiframe de Bing-afbeeldingen van de dag.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Gevonden in je Home Assistant. Geluiden zijn subtiel en passen bij de vormgeving \u2013 druk op \u25B6 om te luisteren.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Apparaat klaar \u2192 melding en herinnering","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Grote fotolijst: foto's, webcams, weer, nieuws. Donker en rustig (spaart oled), zonder bediening en geluid.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 Media \u2192 Lokale media \u2192 map \u201Eambiframe\u201D aanmaken en foto's uploaden.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"In een paar stappen richt je je eerste weergave in: waar het hangt, wat het toont, waarop het reageert. Alles is later in de editor aan te passen.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"Geen bediening \u2013 bijv. voor de tv.","Klingel \u2192 Vollbild mit Kamera":"Deurbel \u2192 volledig scherm met camera",Kopie:"kopie","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"In \xE9\xE9n oogopslag bij het langslopen: klok, weer, afval en wie er thuis is \u2013 grote tekst.",K\u00FCche:"Keuken","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Zachter dan de deurbel, 's nachts stil (22\u20137 uur).","Neue Seiten dazu":"Nieuwe pagina's toevoegen","Nur anzeigen":"Alleen weergave","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Rustig en donker: klok, foto's, weer. Alleen de deurbel laat van zich horen \u2013 's avonds zacht, 's nachts stil.",Schlafzimmer:"Slaapkamer","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Apparaat instellen: open dit adres in de browser van de tablet of tv (in Fully als start-URL) en meld je \xE9\xE9n keer aan bij Home Assistant.","Sp\xFClmaschine fertig":"Vaatwasser klaar","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Tip: met Fully Kiosk (en de HA-integratie ervan) richt Ambiframe de tablet zelf in.","Trockner fertig":"Droger klaar","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Voorgeselecteerd per profiel. De fotolijst wisselt af met de infopagina's.","Was soll das Display zeigen?":"Wat moet de weergave tonen?",Weiter:"Verder","Willkommen bei Ambiframe":"Welkom bij Ambiframe","Wo h\xE4ngt das Display?":"Waar hangt de weergave?","Woher kommen die Fotos?":"Waar komen de foto's vandaan?","Worauf soll es reagieren?":"Waarop moet het reageren?",Zur\u00FCck:"Terug","ohne Ton":"geen geluid","{n} neue Ereignisse":"{n} nieuwe gebeurtenissen",\u00DCberspringen:"Overslaan","Eigenes CSS (nur dieses Display)":"Eigen CSS (alleen deze weergave)","Eigenes Design":"Eigen vormgeving","Erg\xE4nzt das CSS aus dem Design.":"Wordt toegevoegd aan de CSS uit de vormgeving.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"Geen geluiden op deze weergave \u2013 meldingen blijven","Leer = wie Design":"Leeg = zoals vormgeving","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Alleen wat hier ingesteld is, wijkt af van de vormgeving \u2013 leeg betekent \u201Ezoals vormgeving\u201D.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Schaalt het volume van gebeurtenissen; in Fully het mediavolume van de tablet",Stumm:"Stil",T\u00F6ne:"Geluiden","Z. B. media-source://media_source/local/kueche":"Bijv. media-source://media_source/local/keuken",Bedienung:"Bediening","Dashboard \xFCber Ambiframe (Antippen)":"Dashboard over Ambiframe (tikken)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Dashboard in Fully, Ambiframe als schermbeveiliging","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"Schermbeveiliging: Fully toont het dashboard; na de wachttijd verschijnt Ambiframe. Deurbel en camera halen Ambiframe direct naar voren. Fully wordt automatisch ingericht.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"Tijd zonder aanraking tot Ambiframe terugkeert",bedingt:"voorwaardelijk",Bedingung:"Voorwaarde","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Voorwaarden, uiterlijk en tikacties staan in de modus \u201EUitgebreid\u201D (rechtsboven).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"Telkens de volgende als de pagina verschijnt \u2013 vervangt camera en link hierboven","Beim Antippen":"Bij tikken","Beim langen Dr\xFCcken":"Bij lang indrukken",beliebig:"willekeurig",Bereit:"Klaar","Besuche heute":"bezoeken vandaag",Bewegung:"Beweging","Bewegung erkannt":"Beweging gedetecteerd","Bewegung \u2192 Bild-im-Bild":"Beweging \u2192 beeld-in-beeld","Bewegung \u2192 Seite":"Beweging \u2192 pagina","Bewegung \u2192 Seite zeigen":"Beweging \u2192 pagina tonen",Bewertung:"Beoordeling",Bew\u00F6lkt:"Bewolkt",Bezeichnung:"Label",Bild:"Afbeelding","Bild neu laden (s)":"Afbeelding opnieuw laden (s)","Bild nicht ladbar":"Afbeelding kon niet worden geladen","Bild-im-Bild":"Beeld-in-beeld","Bild-im-Bild (Bewegung)":"Beeld-in-beeld (beweging)","Bild-Link":"Afbeeldingslink","Bild-Link oder Entit\xE4t w\xE4hlen":"Kies een afbeeldingslink of entiteit",Bilderrahmen:"Fotolijst","Bildschirm aus":"Scherm uit",Bildunterschrift:"Bijschrift","Bing-Bilder":"Bing-afbeeldingen",bis:"tot","Bis {hi}\xB0, nachts {lo}\xB0":"Tot {hi}\xB0, 's nachts {lo}\xB0","bis {when}":"tot {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Blijft daarna als kleine herinnering rechtsboven staan.","Bleibt vorerst nass":"Blijft voorlopig nat",Breite:"Breedte",Cover:"Hoes","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 strand en wad (YouTube-livebeeld)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Pas daarna weer tonen \u2013 tegen aanhoudend triggeren.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"Mag een sjabloon zijn, bijv. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"Mag een sjabloon zijn.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"Mag sjablonen bevatten, bijv. {{ states('sensor.outside') }} \xB0C \u2013 wordt live bijgewerkt.",Darstellung:"Uiterlijk",Dashboard:"Dashboard","Daten (YAML, optional)":"Gegevens (YAML, optioneel)",Datum:"Datum",Dauer:"Duur","Dauer (s)":"Duur (s)","Dauer in Sekunden (leer = Seitendauer)":"Duur in seconden (leeg = paginaduur)","Davor zeigt die Bilanz den Vortag":"Daarvoor toont de samenvatting de vorige dag","Deckkraft (%)":"Dekking (%)",Design:"Vormgeving","Details (HA-Dialog)":"Details (HA-dialoog)",deutlich:"sterk",Deutsch:"Deutsch",dezent:"subtiel","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"De versie van v\xF3\xF3r de laatste keer opslaan in de editor laden (daarna \u201EOpslaan\u201D)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"De keuze wordt op dit apparaat onthouden.","Diesen Eintrag nur zeigen, wenn \u2026":"Dit item alleen tonen als \u2026","Klangschale (tief, schwebend)":"Klankschaal (diep, zwevend)","Marimba (zwei Holzt\xF6ne)":"Marimba (twee houten tonen)","Glas (klares Ding-Dong)":"Glas (heldere ding-dong)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (drie getokkelde tonen)","Windspiel (zart)":"Windgong (teer)","Hinweis (sehr leise, kurz)":"Hint (heel zacht, kort)","Ding-Dong":"Ding-dong",Display:"Weergave",Displays:"Weergaven",dunkel:"donker","dunkel: nach Sonnenuntergang w\xE4rmer":"donker: na zonsondergang warmer",Duplizieren:"Dupliceren",d\u00E4mmrig:"schemerig",Eckenradius:"Hoekradius","Eckenradius (px)":"Hoekradius (px)","Eckenradius der Karten (px)":"Hoekradius kaarten (px)",Editorial:"Editorial","Eigene Farbe":"Eigen kleur","Eigene Farben \xB7 Dunkel":"Eigen kleuren \xB7 donker","Eigene Farben \xB7 Hell":"Eigen kleuren \xB7 licht","Eigene Stile":"Eigen stijlen","Eigene Vorlagen":"Eigen sjablonen","Eigene Vorlagen:":"Eigen sjablonen:","Eigenes CSS (alle Displays)":"Eigen CSS (alle weergaven)","Eigenes CSS (nur diese Seite)":"Eigen CSS (alleen deze pagina)","Ein Balken je":"E\xE9n balk per","Ein/aus schalten":"Aan/uit schakelen","Eine von mehreren ist":"Een van meerdere is","eine von {n} = {state}":"een van {n} = {state}","Eine Zeile":"E\xE9n regel","Eine Zeile (dezent)":"E\xE9n regel (subtiel)",Einfach:"Eenvoudig","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Eenvoudig: alleen het belangrijkste \xB7 Uitgebreid: alles",eingebaut:"meegeleverd",Einheit:"Eenheid","Einmal tippen f\xFCr Vollbild":"E\xE9n keer tikken voor volledig scherm",Einpassen:"Passend maken",Einstellungen:"Instellingen",Eintrag:"Item","empfindliche Gruppen":"gevoelige groepen",Endzeit:"Eindtijd","Energie jetzt":"Energie nu","Energie-Bilanz":"Energieoverzicht",English:"English",entfernen:"verwijderen",Entit\u00E4t:"Entiteit","Entit\xE4t hinzuf\xFCgen":"Entiteit toevoegen","Entit\xE4t hinzuf\xFCgen \u2026":"Entiteit toevoegen \u2026","Entit\xE4t w\xE4hlen":"Kies een entiteit",Entit\u00E4ten:"Entiteiten","Ereignis \u201E{name}\u201C l\xF6schen?":"Gebeurtenis \u201E{name}\u201D verwijderen?",Ereignisse:"Gebeurtenissen","Erf\xFCllt bei true, on, Zahl \u2260 0":"Waar bij true, on, getal \u2260 0",Erinnerungstext:"Herinneringstekst",Erledigt:"Klaar","Erstellen um":"Maken om",erstes:"eerste",Erweitert:"Uitgebreid",Erzeugung:"Opwekking","Erzeugung (W)":"Opwekking (W)","Es gibt noch keine vorherige Fassung.":"Er is nog geen vorige versie.","Es klingelt":"Er wordt aangebeld","Es regnet gerade":"Het regent",Exportieren:"Exporteren",Extrem:"Extreem",Familie:"Gezin",Farbe:"Kleur","Farbe ab Wert":"Kleur volgens waarde",Farben:"Kleuren",Fehlgeschlagen:"Mislukt","Fehlgeschlagen: {error}":"Mislukt: {error}",Fenster:"Raam","Fenster offen":"Raam open","Fertig um":"Klaar om","fertig um {time}":"klaar om {time}","fertig {time}":"klaar {time}",feucht:"vochtig","Flie\xDFender Verlauf":"Vloeiend verloop",Flie\u00DFtext:"Lopende tekst",Fl\u00E4che:"Vlak","Fl\xE4che, Rand und Radius des Stils":"Vlak, rand en radius van de stijl",Form:"Vorm","Form & CSS":"Vorm & CSS",Format:"Formaat","Formatierung (Markdown)":"Opmaak (Markdown)","Fortschritt %":"Voortgang %","Fortschritt (%)":"Voortgang (%)",Foto:"Foto",Fotoordner:"Fotomap",Fotos:"Foto's","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"Foto's-app \u2192 album delen \u2192 \u201EOpenbare website\u201D aanzetten \u2192 link kopi\xEBren. Wordt gemengd met de map.",Freundlich:"Vriendelijk",Fu\u00DFnote:"Voetregel","F\xE4hrt zur\xFCck":"Keert terug","F\xFCllen (zuschneiden)":"Vullen (bijsnijden)","f\xFCllt das Feld":"vult het veld","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"Voor de schakelaar \u201EPauze\u201D in HA; 0 = nooit","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"Voor gevorderden: geldt in de weergave; kleuren en afstanden via --af-\u2026-variabelen.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':'Voor gevorderden: geldt binnen de pagina; widgets zijn aan te spreken via .cell[data-widget="id"].',"F\xFCr Tor, T\xFCrschloss & Co.":"Voor poorten, deursloten & co.","Ganz zeigen":"Helemaal tonen",ganztags:"hele dag","gar nicht zeigen":"helemaal niet tonen",Ged\u00E4mpft:"Stil","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) vat weer, afspraken, afval, stroom, auto en huis samen.","Gemini schreibt \u2026":"Gemini schrijft \u2026",gerade:"zojuist","gerade eben":"zojuist","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"Er is nu geen apparaat met deze weergave verbonden","Gerade l\xE4uft nichts":"Er speelt nu niets",Ger\u00E4t:"Apparaat","Ger\xE4t fertig":"Apparaat klaar","Ger\xE4t fertig \u2192 Hinweis":"Apparaat klaar \u2192 melding",Ger\u00E4te:"Apparaten",Gespeichert:"Opgeslagen","Gespeichert \u2013 alle Displays zeigen es sofort.":"Opgeslagen \u2013 alle weergaven tonen het direct.","gestern {time}":"gisteren {time}","Gestern, {date}":"Gisteren, {date}",Gewitter:"Onweer","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Glasvlakken met lichtrand boven zachte kleuren","Glocke (kurz, hell)":"Bel (kort, helder)",Gold:"Goud","Gong (warm, tief)":"Gong (warm, diep)",Gro\u00DF:"Groot","gro\xDF (+15 %)":"groot (+15 %)","Gro\xDFbild mit Schlagzeile":"Groot beeld met kop","Gruppen (YAML)":"Groepen (YAML)","Gruppen zeigen jedes Lied nur einmal":"Groepen tonen elk nummer maar \xE9\xE9n keer",Gr\u00F6\u00DFe:"Grootte","Gr\xF6\xDFe (%)":"Grootte (%)",gut:"goed","Gut (gr\xFCn)":"Goed (groen)","Guten Morgen (KI-Zusammenfassung)":"Goedemorgen (AI-samenvatting)","G\xE4ste-WLAN":"Gastwifi",g\u00FCnstig:"goedkoop","G\xFCnstigstes Fenster (h)":"Goedkoopste venster (u)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 Media \u2192 Lokale media \u2192 map \u201Eambiframe\u201D","HA-Dashboard \xF6ffnen":"HA-dashboard openen","HA-Karte":"HA-kaart",Hagel:"Hagel",Halbkreis:"Halve cirkel","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hamburg \u2013 Michel met havenpanorama (YouTube-livebeeld)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hamburg \u2013 stad (YouTube-livebeeld)","Handy-Kamera auf den Code halten":"Richt de camera van je telefoon op de code",Haustier:"Huisdier",Haust\u00FCr:"Voordeur","heizt auf {temp}\xB0":"verwarmt naar {temp}\xB0",Heizung:"Verwarming","Helfer umschalten":"Helper schakelen",hell:"licht","Hell / Tinte":"Licht / inkt","Hell/Dunkel":"Licht/donker","Hell/Dunkel & Schrift":"Licht/donker & lettertypen","Helligkeit (Lux)":"Helderheid (lux)","Hervorheben ab Tagen":"Markeren vanaf dagen","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee en Walchensee (afbeelding)",Heute:"Vandaag",heute:"vandaag","Heute ab (Uhr)":"Vandaag vanaf (tijd)","heute Abend":"vanavond","Heute Abend & morgen":"Vanavond & morgen","Heute Abend rausstellen":"Vanavond buitenzetten","Heute bis jetzt":"Vandaag tot nu toe","Heute Nachmittag":"Vanmiddag","Heute {lo}\xB0 bis {hi}\xB0":"Vandaag {lo}\xB0 tot {hi}\xB0",Hintergrund:"Achtergrond",Hinweis:"Melding","Hinweis + Erinnerung (Ger\xE4te)":"Melding + herinnering (apparaten)",hoch:"hoog","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"hoog (gedempte tekst sterker)",Hochformat:"Staand","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (afbeelding, MJPEG, .m3u8 of YouTube)",H\u00F6chstens:"Hoogstens","H\xF6chstens (s)":"Hoogstens (s)","H\xF6chstens Eintr\xE4ge":"Hoogstens items",H\u00F6he:"Hoogte","iCloud-Album":"iCloud-album",Icon:"Pictogram","Immer dunkel":"Altijd donker","Immer hell":"Altijd licht","Immer hoch":"Altijd staand","Immer quer":"Altijd liggend","Import fehlgeschlagen: {error}":"Importeren mislukt: {error}",Importieren:"Importeren","Importierte Seite":"Ge\xEFmporteerde pagina","In den Editor \xFCbernehmen":"In de editor overnemen","in den letzten \u2026 Minuten":"in de laatste \u2026 minuten","In der Ruhezeit":"Tijdens rusttijd","In der Station":"In het dock","in {n} Tagen":"over {n} dagen","Info mit Kopfzeile":"Info met kop",Infozeile:"Inforegel","Innen {temp}\xB0":"Binnen {temp}\xB0","Innenabstand (px)":"Binnenmarge (px)",Innentemperatur:"Binnentemperatuur","Ist M\xFCllkalender":"Is een afvalkalender",Ja:"Ja",ja:"ja","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"Elke kaart uit het dashboard, bijv. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"elke wijziging (knoppen, event.*)",jetzt:"nu","Jetzt (gro\xDF)":"Nu (groot)","Jetzt erstellen":"Nu maken",Kalender:"Agenda","Kalt unter":"Koud onder","Kalt unter \xB0C":"Koud onder \xB0C",Kamera:"Camera","Kamera / Webcam":"Camera / webcam","Kamera als Hintergrund":"Camera als achtergrond",Karte:"Kaart","Karte (YAML)":"Kaart (YAML)","Karte mit 4 Stunden":"Kaart met 4 uur","Karte nicht ladbar: {error}":"Kaart kon niet worden geladen: {error}","Karte unten rechts":"Kaart rechtsonder","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Kaart \u201E{type}\u201D (alleen zichtbaar in Home Assistant)",Karten:"Kaarten","Karten-Deckkraft (%)":"Dekking kaarten (%)","kein Ausl\xF6ser":"geen trigger","Kein Display konfiguriert":"Geen weergave ingesteld","Kein Display.":"Geen weergave.","Kein Regen bis {h} Uhr":"Geen regen tot {h}:00","kein Stil gefunden":"geen stijl gevonden","kein Ton":"geen geluid",keine:"geen","Keine Bewegung in letzter Zeit":"Geen recente beweging","Keine Karte konfiguriert":"Geen kaart ingesteld","Keine Preisdaten":"Geen prijsgegevens","keine Seite":"geen pagina","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"Geen pagina herkend (\u201Ewidgets\u201D ontbreekt).","keine Seite sichtbar":"geen pagina zichtbaar","Keine Termine in den n\xE4chsten Tagen":"Geen afspraken in de komende dagen","Keine von \u2026 (nicht)":"Geen van \u2026 (niet)","Keine Warnungen":"Geen waarschuwingen","Keiner gew\xE4hlt = alle":"Niets gekozen = alle","KI-Zusammenfassung":"AI-samenvatting",Klar:"Wissen","klein (Kopfzeile)":"klein (koptekst)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Klein rechtsonder, bijv. \u201ECuxhaven\u201D","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Kleinere teksten (labels, lijsten, details) \u2013 om op afstand te lezen","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Klik in het veld voor de meegeleverde geluiden \u2013 of een link (/local/geluid.mp3). Op de tablet via Fully.",Klingel:"Deurbel","Klingel \u2192 Vollbild":"Deurbel \u2192 volledig scherm","Knapp, nur Fakten":"Kort, alleen feiten",Kontrast:"Contrast",Kopieren:"Kopi\xEBren","Kopieren (\u2318C)":"Kopi\xEBren (\u2318C)",Kosten:"Kosten","Kosten-Sensor":"Kostensensor","K\xFChl (blau)":"Koel (blauw)","K\xFCrzlich ge\xE4ndert":"Onlangs gewijzigd",Ladeleistung:"Laadvermogen",Ladelimit:"Laadlimiet","Ladelimit {n} %":"Laadlimiet {n} %",langsam:"langzaam",Laufband:"Nieuwsticker","Laufende Ger\xE4te":"Lopende apparaten","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Leeg = alle afvalsensoren (\u2026_days) automatisch","Leer = automatisch suchen":"Leeg = automatisch zoeken","Leer = Farbe des Stils":"Leeg = kleur van de stijl","Leere Seite":"Lege pagina",Leise:"Zacht",Leistung:"Vermogen","Leistung (W)":"Vermogen (W)","Letzte Tage":"Laatste dagen","Licht umschalten":"Licht schakelen","Lichter an":"Lampen aan",Lichtschimmer:"Lichtglans",Linie:"Lijn",links:"links","Liquid Glass":"Liquid Glass",Liste:"Lijst","Liste mit Vorschaubildern":"Lijst met miniaturen",Live:"Live","Lovelace-Karte (YAML)":"Lovelace-kaart (YAML)",Luftfeuchte:"Luchtvochtigheid","Luftfeuchte (Raum)":"Luchtvochtigheid (ruimte)","Luftqualit\xE4t (AQI)":"Luchtkwaliteit (AQI)",L\u00E4dt:"Laadt","L\xE4dt in der Station":"Laadt in het dock","L\xE4dt \u2026":"Laden \u2026","L\xE4uft gerade":"Speelt nu","L\xE4uft-Entit\xE4t":"Lopende entiteit",L\u00F6schen:"Verwijderen",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 of washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Meerdere webcams om de beurt",Melder:"Sensor",Meldungen:"Berichten","Mindestens (s)":"Minstens (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"Minstens \xE9\xE9n persoon (person.*) is \u201Ethuis\u201D.","Mindestens eine von \u2026 (oder)":"Minstens \xE9\xE9n van \u2026 (of)",Minimal:"Minimal",Minimum:"Minimum",mittel:"gemiddeld",mittig:"midden","Mo., 12. Okt.":"ma 12 okt",Modus:"Modus","Montag, 12. Oktober":"maandag 12 oktober",Morgen:"Morgen",morgen:"morgen","Morgen anzeigen":"Morgen tonen",Musik:"Muziek","Musik \u2192 Cover":"Muziek \u2192 hoes","Musik-Cover":"Muziekhoes","Musik-Cover (bei Liedwechsel)":"Muziekhoes (bij nummerwissel)",m\u00E4\u00DFig:"matig",M\u00FCll:"Afval","M\xFCll zeigen ab Tagen":"Afval tonen vanaf dagen",M\u00FCllabfuhr:"Afvalophaling",M\u00FCllkalender:"Afvalkalender",M\u00FClltonnen:"Afvalbakken","M\xFClltonnen (im Wechsel)":"Afvalbakken (wisselend)","M\xFCnchen \u2013 Panorama (Bild)":"M\xFCnchen \u2013 panorama (afbeelding)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Na afloop zo lang niet opnieuw tonen.","nach oben":"omhoog","nach unten":"omlaag",Nachkommastellen:"Decimalen","Nachlauf (s)":"Nalooptijd (s)",Nachrichten:"Nieuws","Nachrichten werden geladen \u2026":"Nieuws wordt geladen \u2026",Nacht:"Nacht","Nacht (gedimmt)":"Nacht (gedimd)","Nacht, wenn an":"Nacht als aan",Nachtseite:"Nachtpagina",Name:"Naam","Name der Seitenvorlage":"Naam van paginasjabloon","Name der Vorlage":"Naam van sjabloon","Name des Auftrags":"Naam van opdracht","Name des Players":"Naam van speler","Name, z. B. Herbst":"Naam, bijv. Herfst",Nebel:"Mist",nein:"nee","Netzname (SSID)":"Netwerknaam (SSID)","Netzname und Passwort im Editor eintragen.":"Vul netwerknaam en wachtwoord in de editor in.","Neu laden":"Opnieuw laden","Neu laden alle (s)":"Opnieuw laden elke (s)","Neue Seite":"Nieuwe pagina","Neues Display":"Nieuwe weergave","Neustart nach (s)":"Herstart na (s)","Neustart-Taste":"Herstartknop",nicht:"niet","nicht in Wiedergabe":"niet in afspeellijst","nicht zeigen":"niet tonen","Nichts l\xE4uft gerade":"Er loopt nu niets","Nichts offen, nichts l\xE4uft":"Niets open, niets actief",nie:"nooit",niedrig:"laag",Noch:"Nog","Noch keine Daten im Zeitraum":"Nog geen gegevens in deze periode","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"Nog geen eigen stijlen \u2013 stel stijl, kleuren en lettertypen in en sla ze hier op.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"Nog geen pagina \u2013 \u201E+ Nieuw\u201D hierboven.","Noch keine Statistik im Zeitraum":"Nog geen statistiek in deze periode","Noch keine Werte f\xFCr diesen Tag.":"Nog geen waarden voor deze dag.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"Nog geen samenvatting \u2013 die wordt op de ingestelde tijden gemaakt.","noch {n} kWh":"nog {n} kWh","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 haven en Waddenzee (YouTube-livebeeld)",Normal:"Normaal",normal:"normaal","normal (ruhig)":"normaal (rustig)",Notfallmodus:"Noodmodus","Nur anzeigen wenn \u2026":"Alleen tonen als \u2026","Nur auf Display \u2026":"Alleen op weergave \u2026","nur auf {names}":"alleen op {names}","Nur diese Ereignistypen":"Alleen deze gebeurtenistypen","nur Hochformat":"alleen staand","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Alleen in de browser \u2013 Fully gebruikt het mediavolume van de tablet.","Nur im Hoch-/Querformat":"Alleen staand/liggend","Nur offene listen":"Alleen open items noemen","nur Querformat":"alleen liggend","Nur wenn au\xDFerdem \u2026":"Alleen als ook \u2026","Nur wenn in Tagen":"Alleen als binnen dagen","Nur wenn jemand zu Hause ist":"Alleen als er iemand thuis is","Nur zeigen bis Tage":"Alleen tonen tot dagen","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Alleen op bepaalde tijden of voorwaarden tonen","N\xE4chste Stunden":"Komende uren","N\xE4chste Tage":"Komende dagen",oben:"boven","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Bovengrens, ook als een sensor aan blijft.",oder:"of",Offen:"Open",offen:"open","Offene Fenster & T\xFCren":"Open ramen & deuren","Ohne Rahmen":"Zonder kader","ohne Ton zeigen":"zonder geluid tonen","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Optioneel \u2013 anders uit de Tibber-geschiedenis.","Ort / Zusatz":"Plaats / toevoeging","Ort zeigen":"Plaats tonen",Ortsangabe:"Locatie",Ortsname:"Plaatsnaam",Passwort:"Wachtwoord","Passwort zus\xE4tzlich als Text":"Wachtwoord ook als tekst tonen","Pause endet nach (min)":"Pauze eindigt na (min)",Pausiert:"Gepauzeerd",pausiert:"gepauzeerd","per Link (?safe=1)":"via link (?safe=1)",Person:"Persoon","Person, image.*, Kamera, Medienplayer \u2026":"Persoon, image.*, camera, mediaspeler \u2026",Personen:"Personen",Player:"Speler",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up met HA-kaart","Prognose heute (kWh)":"Voorspelling vandaag (kWh)","Prognose heute {n} kWh":"Voorspelling vandaag {n} kWh","Prognose Rest (kWh)":"Voorspelling resterend (kWh)",Quelle:"Bron",Quellen:"Bronnen",Querformat:"Liggend",Rahmen:"Kader",Raum:"Ruimte",Rausstellen:"Buitenzetten",rechts:"rechts",Regen:"Regen","Regen ab %":"Regen vanaf %","Regen ab {h} Uhr":"Regen vanaf {h}:00","Regen an/aus":"Regen aan/uit","Regen-Vorschau":"Regenvoorspelling",Regensensor:"Regensensor",Regnet:"Het regent",Reichweite:"Bereik","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 strand (YouTube-livebeeld)",Restzeit:"Resterende tijd",Ring:"Ring",Rollladen:"Rolluik","Rollladen/Tor umschalten":"Rolluik/poort schakelen",Rolll\u00E4den:"Rolluiken","Ruhezeit ab":"Rusttijd vanaf","Ruhezeit bis":"Rusttijd tot",Ruhig:"Rustig","Ruhig flie\xDFende Farben wie Nordlicht":"Rustig vloeiende kleuren zoals noorderlicht",R\u00E4ume:"Ruimtes","R\xFCckg\xE4ngig (\u2318Z)":"Ongedaan maken (\u2318Z)",Sauger:"Stofzuiger",Saugroboter:"Robotstofzuiger",Saugt:"Zuigt",Schicht:"Laag","Schichten gesamt":"Lagen totaal",Schieben:"Schuiven",Schlicht:"Eenvoudig","Schlie\xDFt nach (s)":"Sluit na (s)",Schloss:"Slot",Schnee:"Sneeuw",Schneeregen:"Natte sneeuw",Schrift:"Lettertype","Schrift des Stils":"Lettertype van de stijl","Schrift Text":"Lettertype tekst","Schrift Uhr & Titel":"Lettertype klok & titel",Schriftfarbe:"Tekstkleur",Schriftgr\u00F6\u00DFe:"Tekstgrootte","Schriftgr\xF6\xDFe Punkte (px)":"Tekstgrootte opsomming (px)","Schwebende Partikel":"Zwevende deeltjes","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Zwitserse stijl: heldere letters, hoog contrast, alleen typografie","sehr gro\xDF (+30 %)":"heel groot (+30 %)","sehr hoch":"heel hoog","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Heel rustig; 's nachts uit. Per pagina aan te passen.","seit {time}":"sinds {time}",Seite:"Pagina","Seite importieren \u2026":"Pagina importeren \u2026","Seite in die Wiedergabe":"Pagina naar afspeellijst","Seite unten als YAML \u2013 zum Kopieren markieren.":"Pagina hieronder als YAML \u2013 selecteer om te kopi\xEBren.","Seite zeigen":"Pagina tonen","Seite zeigen (z. B. bei Bewegung)":"Pagina tonen (bijv. bij beweging)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Pagina \u201E{name}\u201D als YAML gekopieerd \u2013 elders plakken met \u201E+ Nieuw \u2192 Pagina importeren\u201D of \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Pagina \u201E{name}\u201D aangemaakt \u2013 pagina-ID's in acties zo nodig aanpassen.","Seite \u201E{name}\u201C l\xF6schen?":"Pagina \u201E{name}\u201D verwijderen?",Seiten:"Pagina's","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Paginasjabloon \u201E{name}\u201D opgeslagen \u2013 onder \u201E+ Nieuw\u201D.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Paginasjabloon \u201E{name}\u201D verwijderen?",Seitenwechsel:"Paginawissel",Sekunden:"Seconden","Selbst ausw\xE4hlen":"Zelf kiezen",Senkrecht:"Verticaal",Sensor:"Sensor","Serifen-Uhr, warmes Wei\xDF, Bambus":"Schreefklok, warm wit, bamboe",Sichtbarkeit:"Zichtbaarheid","Skript starten":"Script uitvoeren","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"Zo lang blijft de weergave staan nadat de trigger weer uit is.",Sonnig:"Zonnig",sonnig:"zonnig",Spalte:"Kolom",Spalten:"Kolommen",Speichern:"Opslaan","Speichert \u2026":"Opslaan \u2026",Sprache:"Taal",Standard:"Standaard",Standbild:"Stilstaand beeld","Standbild neu laden (s)":"Stilstaand beeld opnieuw laden (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"StandBy-stijl, eenvoudig, salie",Standort:"Locatie",Starkregen:"Zware regen","startet immer wieder neu":"start steeds opnieuw","Startkonfiguration anzeigen":"Startconfiguratie tonen",Status:"Status","Steht drau\xDFen":"Weg","Steht zuhause":"Thuis geparkeerd",Stil:"Stijl","Stil als YAML in die Zwischenablage kopiert.":"Stijl als YAML naar het klembord gekopieerd.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Stijl hieronder als YAML \u2013 selecteer om te kopi\xEBren.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Stijl toegepast \u2013 maak het blijvend met \u201EOpslaan\u201D.","Stil-Farbe":"Kleur van de stijl","Stil-Schrift":"Lettertype van de stijl",Strompreis:"Stroomprijs","Strompreis heute":"Stroomprijs vandaag","Stufe hinzuf\xFCgen":"Stap toevoegen",Stunde:"Uur",Stunden:"Uren","Stunden-Kurve":"Uurverloop",St\u00E4rke:"Sterkte",St\u00F6rung:"Storing","Szene aktivieren":"Sc\xE8ne activeren",Tag:"Dag",Tage:"Dagen","Tage bis Abholung":"Dagen tot ophaling","Tage voraus":"Dagen vooruit","Tage-Sensor":"Dagensensor",Tagesbilanz:"Dagoverzicht",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau of https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 of het adres van een RSS-feed",Teil:"Deel",Teile:"Delen","Teils bew\xF6lkt":"Half bewolkt",Temperatur:"Temperatuur",Temperaturen:"Temperaturen",Tempo:"Snelheid","Tempo (px/s)":"Snelheid (px/s)",Termin:"Afspraak","Termin in den n\xE4chsten Tagen":"Afspraak in de komende dagen",Termine:"Afspraken",Testen:"Testen",teuer:"duur",Text:"Tekst","Text & Vorlage":"Tekst & sjabloon","Text aus Entit\xE4t":"Tekst uit entiteit","Text danach":"Tekst erna","Text ohne Warnung":"Tekst zonder waarschuwing","Text wenn alles ruhig":"Tekst als alles rustig is","Text wenn nichts l\xE4uft":"Tekst als er niets loopt",Textgr\u00F6\u00DFe:"Tekstgrootte","Tibber-Zuhause":"Tibber-woning","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Tip: klik op een widget om hem te bewerken.","Tippen zum Schlie\xDFen":"Tik om te sluiten",Titel:"Titel","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau in het Zwarte Woud \u2013 dorp en Hasenhorn (afbeelding)",Ton:"Geluid",Tonne:"Afvalbak",Tonnen:"Afvalbakken","Tonnen der n\xE4chsten \u2026 Tage":"Afvalbakken van de komende \u2026 dagen",Trocken:"Droog",trocken:"droog","Trocken ab etwa {h} Uhr":"Droog vanaf ongeveer {h}:00",Uhr:"Klok","Uhrzeit von \u2013 bis":"Tijd van \u2013 tot","Uhrzeit {from}\u2013{to}":"Tijd {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Tijden gescheiden door komma's; elke tijd is \xE9\xE9n vraag aan de AI.",Umwelt:"Omgeving",und:"en",ungesund:"ongezond",unten:"onder",unter:"onder",Unterwegs:"Onderweg",Unterzeile:"Onderregel",Unwetter:"Noodweer","UV-Index":"UV-index",Verbrauch:"Verbruik",Verlauf:"Verloop","Verlauf (Tage)":"Verloop (dagen)","Verlauf nicht verf\xFCgbar":"Verloop niet beschikbaar","Verlauf wird geladen \u2026":"Verloop wordt geladen \u2026",Verriegelt:"Vergrendeld",Verschl\u00FCsselung:"Versleuteling","Verstecktes Netz":"Verborgen netwerk",Verwerfen:"Verwerpen","Voll um":"Vol om","voll um {time}":"vol om {time}",Vollbild:"Volledig scherm","Vollbild (Klingel, Alarm)":"Volledig scherm (deurbel, alarm)","von Zustand":"van toestand","von {n} geschlossen":"van {n} dicht","vor {n} h":"{n} uur geleden","vor {n} min":"{n} min geleden","Vorher nachfragen":"Eerst vragen","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Vorige versie geladen \u2013 herstel met \u201EIn de editor overnemen\u201D en \u201EOpslaan\u201D.","Vorherige Fassung laden":"Vorige versie laden",Vorlage:"Sjabloon","Vorlage (Jinja)":"Sjabloon (Jinja)","Vorlage l\xF6schen":"Sjabloon verwijderen","Vorlage nicht verf\xFCgbar":"Sjabloon niet beschikbaar","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Sjabloon \u201E{name}\u201D opgeslagen \u2013 onder \u201EEigen sjablonen\u201D.","Vorlage \u201E{name}\u201C l\xF6schen?":"Sjabloon \u201E{name}\u201D verwijderen?",Vorschau:"Voorbeeld","Vorschau (schnell)":"Voorbeeld (snel)",Waagerecht:"Horizontaal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe is niet bereikbaar: {error}","Ambiframe nicht erreichbar":"Ambiframe niet bereikbaar","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 noodmodus","Wann?":"Wanneer?","Warm \xFCber \xB0C":"Warm boven \xB0C","Warn-Sensoren":"Waarschuwingssensoren",Warnung:"Waarschuwing","Warnung (rot)":"Waarschuwing (rood)","Warnung \u2192 Vollbild":"Waarschuwing \u2192 volledig scherm",Warnungen:"Waarschuwingen","Waschmaschine fertig":"Wasmachine klaar",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Webcam toevoegen","Webcam-Link":"Webcamlink","Wechsel nach (s)":"Wissel na (s)","Weich (Unsch\xE4rfe)":"Zacht (vervagen)","Weiter geht's":"Gaat verder","Weitere Ausl\xF6ser":"Meer triggers","Weitere Werte":"Meer waarden","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"Wit en goud \u2013 donker op zwart, licht op ivoor","Welches Display ist das?":"Welke weergave is dit?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein oost (afbeelding, elke 10 min)","Wenn Ordner und Album leer sind":"Als map en album leeg zijn",Wert:"Waarde","Wert wird blau, wenn er darunter liegt.":"Waarde wordt blauw als ze eronder ligt.","Werte-Liste":"Waardenlijst",Wetter:"Weer","Wetter-Entit\xE4t fehlt":"Weerentiteit ontbreekt","Widget hinzuf\xFCgen:":"Widget toevoegen:","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget gekopieerd \u2013 plak op een pagina met \u2318V of \u201EPlakken\u201D.","Widget kopiert.":"Widget gekopieerd.","wie der Stil":"zoals de stijl","wie Design":"zoals vormgeving","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Zoals een tijdschrift: grote schreven, papier, fijne lijnen","wie oben":"zoals boven","wie Stil":"zoals stijl",Wiedergabe:"Weergave","Wiedergabe anhalten/fortsetzen":"Weergave pauzeren/hervatten","Wiedergabe/Pause":"Afspelen/pauzeren",Wiedergabeliste:"Afspeellijst","Wiederholen (\u21E7\u2318Z)":"Opnieuw (\u21E7\u2318Z)",Wind:"Wind",Windig:"Winderig","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Wordt ingedrukt als de weergave zich niet meer meldt \u2013 bijv. Fully \u201EStart-URL laden\u201D.","Wird geladen \u2026":"Wordt geladen \u2026","Wird heute abgeholt":"Vandaag opgehaald","WLAN-QR-Code":"Wifi-QR-code","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"Tijdens het afspelen opnieuw tonen; leeg of 0 = alleen bij nummerwissel","W\xE4sche fertig":"Was klaar","YAML ist nicht lesbar: {error}":"YAML niet leesbaar: {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"bijv. bezoeken aan de kattenbak, dagelijks gereset","z. B. KI-Analyse der Kamera":"bijv. AI-analyse van de camera","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"bijv. AI-beschrijving of waarschuwingskop","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"bijv. meerdere bewegingsmelders \u2013 \xE9\xE9n is genoeg","z. B. type: entities, entities: [light.kueche]":"bijv. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"Bijv. tijd 05:00\u201311:00 voor een ochtendpagina. De eigen voorwaarde van de pagina geldt ook.","z. B. \u201EGeocoded Location\u201C der Companion-App":"bijv. \u201EGeocoded Location\u201D van de companion-app","Zahl \xFCber/unter":"Getal boven/onder",Zeile:"Regel",Zeilen:"Regels","Zeitraum (min)":"Periode (min)","Zeitraum (Stunden)":"Periode (uren)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Slepen of pijltjestoetsen verplaatsen alles samen. \u21E7/\u2318-klik haalt er \xE9\xE9n uit, Esc heft de selectie op.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Slepen om te verplaatsen \xB7 punt rechtsonder om te vergroten \xB7 pijltjestoetsen verplaatsen, met \u21E7 grootte \xB7 \u21E7/\u2318-klik kiest meerdere \xB7 \u2318C/\u2318V kopi\xEBren en plakken \xB7 \u232B verwijdert \xB7 \u2318D dupliceert \xB7 \u2318Z ongedaan maken","Ziel-Entit\xE4t":"Doelentiteit",Zoom:"Zoom",zu:"dicht","zu feucht":"te vochtig","zu Zustand":"naar toestand","zu Zustand (optional)":"naar toestand (optioneel)","Zugspitze (Bild, alle 10 min)":"Zugspitze (afbeelding, elke 10 min)",Zuhause:"Thuis","Zuletzt fertig {when}":"Laatst klaar {when}","zuletzt {time}":"laatst {time}","Zur\xFCck nach (s)":"Terug na (s)","Zur\xFCck zu Ambiframe":"Terug naar Ambiframe",Zusammenfassung:"Samenvatting",Zusatzwert:"Extra waarde","Zusatzwert Name":"Naam extra waarde",Zustand:"Toestand","Zustand ist":"Toestand is","Zustand ist nicht":"Toestand is niet","Zwischendurch alle (min)":"Tussendoor elke (min)",z\u00E4hlen:"tellen","Z\xE4hler \u201Eheute\u201C":"Teller \u201Evandaag\u201D","{day} Abend":"{day} avond","{entity} ge\xE4ndert ({n} min)":"{entity} gewijzigd ({n} min)","{entity} in {n} Tagen":"{entity} over {n} dagen","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} loopt","{name} offen":"{name} open","{name} \u2013 wirklich?":"{name} \u2013 echt?","{n} % aus eigener Sonne":"{n} % uit eigen zonnestroom","{n} % Wahrscheinlichkeit":"{n} % kans","{n} Lichter an":"{n} lampen aan","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets gekozen","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets gekopieerd \u2013 plak op een pagina met \u2318V of \u201EPlakken\u201D.","{n} Widgets kopiert.":"{n} widgets gekopieerd.","{time} Uhr":"{time}","\xE4ltere Version":"oudere versie","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Openbare camera in plaats van HA-camera \u2013 suggesties door in het veld te klikken",\u00D6ffnen:"Openen","\xD8 {n} pro Tag":"\xD8 {n} per dag",\u00FCber:"boven",\u00DCberblenden:"Overvloeien",\u00DCberblick:"Overzicht",\u00DCbergang:"Overgang","\xDCbergang (s)":"Overgang (s)",\u00FCbermorgen:"overmorgen",\u00DCbernehmen:"Overnemen","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Overgenomen \u2013 maak het blijvend met \u201EOpslaan\u201D.",\u00DCberschrift:"Kop","\xDCberschrift klein":"Kleine kop","\u2013 w\xE4hlen \u2013":"\u2013 kiezen \u2013","\u2026 aus Attribut":"\u2026 uit attribuut","\u2026 oder Bild einer Entit\xE4t":"\u2026 of afbeelding van een entiteit","\u2026 oder Webcam-Link":"\u2026 of webcamlink",Fran\u00E7ais:"Fran\xE7ais","Le Figaro (FR)":"Le Figaro (FR)","Le Monde (FR)":"Le Monde (FR)","NOS (NL)":"NOS (NL)","NU.nl (NL)":"NU.nl (NL)",Nederlands:"Nederlands","RFI (FR)":"RFI (FR)","VRT NWS (BE)":"VRT NWS (BE)","franceinfo (FR)":"franceinfo (FR)","{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.":"{names}: eigen instelling voor licht/donker \u2013 die geldt daar.","F\xFCr alle \xFCbernehmen":"Voor alle overnemen"};var ld=["de","en","nl","fr"],dd={en:va,nl:Xr,fr:Jr},cd={de:"de-DE",en:"en-GB",nl:"nl-NL",fr:"fr-FR"},di="de",Qi=()=>di,es=t=>!!t&&ld.includes(t),It=(t,i)=>{if(es(t))return t;let e=(i||(typeof navigator<"u"?navigator.language:"")||"de").toLowerCase().split("-")[0];return es(e)?e:"en"},Ft=t=>{di=t},X=()=>cd[di],d=(t,i)=>{let e=di==="de"?t:dd[di][t]??va[t]??t;return i?e.replace(/\{(\w+)\}/g,(n,a)=>String(i[a]??"")):e};var Ji=globalThis,Xi=Ji.ShadowRoot&&(Ji.ShadyCSS===void 0||Ji.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ya=Symbol(),ts=new WeakMap,ci=class{constructor(i,e,n){if(this._$cssResult$=!0,n!==ya)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Xi&&i===void 0){let n=e!==void 0&&e.length===1;n&&(i=ts.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),n&&ts.set(e,i))}return i}toString(){return this.cssText}},ui=t=>new ci(typeof t=="string"?t:t+"",void 0,ya),F=(t,...i)=>{let e=t.length===1?t[0]:i.reduce((n,a,r)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new ci(e,t,ya)},is=(t,i)=>{if(Xi)t.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let n=document.createElement("style"),a=Ji.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=e.cssText,t.appendChild(n)}},wa=Xi?t=>t:t=>t instanceof CSSStyleSheet?(i=>{let e="";for(let n of i.cssRules)e+=n.cssText;return ui(e)})(t):t;var{is:ud,defineProperty:hd,getOwnPropertyDescriptor:pd,getOwnPropertyNames:md,getOwnPropertySymbols:gd,getPrototypeOf:fd}=Object,en=globalThis,ns=en.trustedTypes,bd=ns?ns.emptyScript:"",vd=en.reactiveElementPolyfillSupport,hi=(t,i)=>t,ka={toAttribute(t,i){switch(i){case Boolean:t=t?bd:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch{e=null}}return e}},rs=(t,i)=>!ud(t,i),as={attribute:!0,type:String,converter:ka,reflect:!1,useDefault:!1,hasChanged:rs};Symbol.metadata??=Symbol("metadata"),en.litPropertyMetadata??=new WeakMap;var Je=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=as){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let n=Symbol(),a=this.getPropertyDescriptor(i,n,e);a!==void 0&&hd(this.prototype,i,a)}}static getPropertyDescriptor(i,e,n){let{get:a,set:r}=pd(this.prototype,i)??{get(){return this[e]},set(s){this[e]=s}};return{get:a,set(s){let o=a?.call(this);r?.call(this,s),this.requestUpdate(i,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??as}static _$Ei(){if(this.hasOwnProperty(hi("elementProperties")))return;let i=fd(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(hi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(hi("properties"))){let e=this.properties,n=[...md(e),...gd(e)];for(let a of n)this.createProperty(a,e[a])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[n,a]of e)this.elementProperties.set(n,a)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let a=this._$Eu(e,n);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let n=new Set(i.flat(1/0).reverse());for(let a of n)e.unshift(wa(a))}else i!==void 0&&e.push(wa(i));return e}static _$Eu(i,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(i.set(n,this[n]),delete this[n]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return is(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,n){this._$AK(i,n)}_$ET(i,e){let n=this.constructor.elementProperties.get(i),a=this.constructor._$Eu(i,n);if(a!==void 0&&n.reflect===!0){let r=(n.converter?.toAttribute!==void 0?n.converter:ka).toAttribute(e,n.type);this._$Em=i,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(i,e){let n=this.constructor,a=n._$Eh.get(i);if(a!==void 0&&this._$Em!==a){let r=n.getPropertyOptions(a),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ka;this._$Em=a;let o=s.fromAttribute(e,r.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(i,e,n,a=!1,r){if(i!==void 0){let s=this.constructor;if(a===!1&&(r=this[i]),n??=s.getPropertyOptions(i),!((n.hasChanged??rs)(r,e)||n.useDefault&&n.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(s._$Eu(i,n))))return;this.C(i,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:n,reflect:a,wrapped:r},s){n&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,s??e??this[i]),r!==!0||s!==void 0)||(this._$AL.has(i)||(this.hasUpdated||n||(e=void 0),this._$AL.set(i,e)),a===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[a,r]of n){let{wrapped:s}=r,o=this[a];s!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,r,o)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw i=!1,this._$EM(),n}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};Je.elementStyles=[],Je.shadowRootOptions={mode:"open"},Je[hi("elementProperties")]=new Map,Je[hi("finalized")]=new Map,vd?.({ReactiveElement:Je}),(en.reactiveElementVersions??=[]).push("2.1.2");var Sa=globalThis,ss=t=>t,tn=Sa.trustedTypes,os=tn?tn.createPolicy("lit-html",{createHTML:t=>t}):void 0,$a="$lit$",Xe=`lit$${Math.random().toFixed(9).slice(2)}$`,Aa="?"+Xe,yd=`<${Aa}>`,yt=document,mi=()=>yt.createComment(""),gi=t=>t===null||typeof t!="object"&&typeof t!="function",Ta=Array.isArray,ps=t=>Ta(t)||typeof t?.[Symbol.iterator]=="function",xa=`[ 	
\f\r]`,pi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ls=/-->/g,ds=/>/g,bt=RegExp(`>|${xa}(?:([^\\s"'>=/]+)(${xa}*=${xa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),cs=/'/g,us=/"/g,ms=/^(?:script|style|textarea|title)$/i,Ea=t=>(i,...e)=>({_$litType$:t,strings:i,values:e}),u=Ea(1),$e=Ea(2),gs=Ea(3),Ve=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),hs=new WeakMap,vt=yt.createTreeWalker(yt,129);function fs(t,i){if(!Ta(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return os!==void 0?os.createHTML(i):i}var bs=(t,i)=>{let e=t.length-1,n=[],a,r=i===2?"<svg>":i===3?"<math>":"",s=pi;for(let o=0;o<e;o++){let l=t[o],c,h,p=-1,g=0;for(;g<l.length&&(s.lastIndex=g,h=s.exec(l),h!==null);)g=s.lastIndex,s===pi?h[1]==="!--"?s=ls:h[1]!==void 0?s=ds:h[2]!==void 0?(ms.test(h[2])&&(a=RegExp("</"+h[2],"g")),s=bt):h[3]!==void 0&&(s=bt):s===bt?h[0]===">"?(s=a??pi,p=-1):h[1]===void 0?p=-2:(p=s.lastIndex-h[2].length,c=h[1],s=h[3]===void 0?bt:h[3]==='"'?us:cs):s===us||s===cs?s=bt:s===ls||s===ds?s=pi:(s=bt,a=void 0);let b=s===bt&&t[o+1].startsWith("/>")?" ":"";r+=s===pi?l+yd:p>=0?(n.push(c),l.slice(0,p)+$a+l.slice(p)+Xe+b):l+Xe+(p===-2?o:b)}return[fs(t,r+(t[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),n]},fi=class t{constructor({strings:i,_$litType$:e},n){let a;this.parts=[];let r=0,s=0,o=i.length-1,l=this.parts,[c,h]=bs(i,e);if(this.el=t.createElement(c,n),vt.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=vt.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith($a)){let g=h[s++],b=a.getAttribute(p).split(Xe),f=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:f[2],strings:b,ctor:f[1]==="."?an:f[1]==="?"?rn:f[1]==="@"?sn:kt}),a.removeAttribute(p)}else p.startsWith(Xe)&&(l.push({type:6,index:r}),a.removeAttribute(p));if(ms.test(a.tagName)){let p=a.textContent.split(Xe),g=p.length-1;if(g>0){a.textContent=tn?tn.emptyScript:"";for(let b=0;b<g;b++)a.append(p[b],mi()),vt.nextNode(),l.push({type:2,index:++r});a.append(p[g],mi())}}}else if(a.nodeType===8)if(a.data===Aa)l.push({type:2,index:r});else{let p=-1;for(;(p=a.data.indexOf(Xe,p+1))!==-1;)l.push({type:7,index:r}),p+=Xe.length-1}r++}}static createElement(i,e){let n=yt.createElement("template");return n.innerHTML=i,n}};function wt(t,i,e=t,n){if(i===Ve)return i;let a=n!==void 0?e._$Co?.[n]:e._$Cl,r=gi(i)?void 0:i._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,e,n)),n!==void 0?(e._$Co??=[])[n]=a:e._$Cl=a),a!==void 0&&(i=wt(t,a._$AS(t,i.values),a,n)),i}var nn=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:n}=this._$AD,a=(i?.creationScope??yt).importNode(e,!0);vt.currentNode=a;let r=vt.nextNode(),s=0,o=0,l=n[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new Bt(r,r.nextSibling,this,i):l.type===1?c=new l.ctor(r,l.name,l.strings,this,i):l.type===6&&(c=new on(r,this,i)),this._$AV.push(c),l=n[++o]}s!==l?.index&&(r=vt.nextNode(),s++)}return vt.currentNode=yt,a}p(i){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(i,n,e),e+=n.strings.length-2):n._$AI(i[e])),e++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,n,a){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=n,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=wt(this,i,e),gi(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==Ve&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):ps(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&gi(this._$AH)?this._$AA.nextSibling.data=i:this.T(yt.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:n}=i,a=typeof n=="number"?this._$AC(i):(n.el===void 0&&(n.el=fi.createElement(fs(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===a)this._$AH.p(e);else{let r=new nn(a,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(i){let e=hs.get(i.strings);return e===void 0&&hs.set(i.strings,e=new fi(i)),e}k(i){Ta(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,a=0;for(let r of i)a===e.length?e.push(n=new t(this.O(mi()),this.O(mi()),this,this.options)):n=e[a],n._$AI(r),a++;a<e.length&&(this._$AR(n&&n._$AB.nextSibling,a),e.length=a)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let n=ss(i).nextSibling;ss(i).remove(),i=n}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},kt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,n,a,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=a,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=m}_$AI(i,e=this,n,a){let r=this.strings,s=!1;if(r===void 0)i=wt(this,i,e,0),s=!gi(i)||i!==this._$AH&&i!==Ve,s&&(this._$AH=i);else{let o=i,l,c;for(i=r[0],l=0;l<r.length-1;l++)c=wt(this,o[n+l],e,l),c===Ve&&(c=this._$AH[l]),s||=!gi(c)||c!==this._$AH[l],c===m?i=m:i!==m&&(i+=(c??"")+r[l+1]),this._$AH[l]=c}s&&!a&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},an=class extends kt{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},rn=class extends kt{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},sn=class extends kt{constructor(i,e,n,a,r){super(i,e,n,a,r),this.type=5}_$AI(i,e=this){if((i=wt(this,i,e,0)??m)===Ve)return;let n=this._$AH,a=i===m&&n!==m||i.capture!==n.capture||i.once!==n.once||i.passive!==n.passive,r=i!==m&&(n===m||a);a&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},on=class{constructor(i,e,n){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(i){wt(this,i)}},vs={M:$a,P:Xe,A:Aa,C:1,L:bs,R:nn,D:ps,V:wt,I:Bt,H:kt,N:rn,U:sn,B:an,F:on},wd=Sa.litHtmlPolyfillSupport;wd?.(fi,Bt),(Sa.litHtmlVersions??=[]).push("3.3.3");var ys=(t,i,e)=>{let n=e?.renderBefore??i,a=n._$litPart$;if(a===void 0){let r=e?.renderBefore??null;n._$litPart$=a=new Bt(i.insertBefore(mi(),r),r,void 0,e??{})}return a._$AI(t),a};var za=globalThis,re=class extends Je{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=ys(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ve}};re._$litElement$=!0,re.finalized=!0,za.litElementHydrateSupport?.({LitElement:re});var kd=za.litElementPolyfillSupport;kd?.({LitElement:re});(za.litElementVersions??=[]).push("4.2.2");var ln={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},dt=t=>(...i)=>({_$litDirective$:t,values:i}),lt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,n){this._$Ct=i,this._$AM=e,this._$Ci=n}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var xt=class extends lt{constructor(i){if(super(i),this.it=m,i.type!==ln.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===m||i==null)return this._t=void 0,this.it=i;if(i===Ve)return i;if(typeof i!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;let e=[i];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};xt.directiveName="unsafeHTML",xt.resultType=1;var Sm=dt(xt);var bi=class extends xt{};bi.directiveName="unsafeSVG",bi.resultType=2;var Ot=dt(bi);var xd="M7.2 18.5h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 18.5z",dn="M7.2 14.8h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 14.8z",ws='<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M4 7.5h16M7 5.3h.01M9.5 5.3h.01"/><circle cx="12" cy="14" r="4.2"/>',vi={sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5"/>',moon:'<path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z"/>',cloud:`<path d="${xd}"/>`,partly:'<path d="M8 3.2v1.3M3.2 8h1.3M4.6 4.6l.9.9M11.4 4.6l-.9.9M5.4 10.6A3 3 0 1 1 10.9 6.9"/><path d="M9.2 19.5h8.3a3.4 3.4 0 0 0 .4-6.78 4.6 4.6 0 0 0-8.9 1.2 2.8 2.8 0 0 0 .2 5.58z"/>',rain:`<path d="${dn}"/><path d="M8.6 17.6l-1 2.4M12.6 17.6l-1 2.4M16.6 17.6l-1 2.4"/>`,pour:`<path d="${dn}"/><path d="M8.2 17.4l-1.4 3.4M11.4 17.4l-1.4 3.4M14.6 17.4l-1.4 3.4M17.8 17.4l-1.4 3.4"/>`,snow:`<path d="${dn}"/><path d="M8.5 18.2h.01M12 19.8h.01M15.5 18.2h.01M10.2 21.4h.01M13.8 21.4h.01" stroke-width="2.2"/>`,fog:'<path d="M4 8.5h16M6.5 12.5h11M4 16.5h16"/>',bolt:`<path d="${dn}"/><path d="M12.8 15.6l-2.2 3.3h3l-2.2 3.3"/>`,wind:'<path d="M3 8.5h10.5A2.5 2.5 0 1 0 11 6M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5M3 16.5h7"/>',washer:ws,dryer:ws+'<path d="M9.6 14.4c.8-.9 1.6-.9 2.4 0s1.6.9 2.4 0"/>',bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.5a2.1 2.1 0 0 0 4 0"/>',window:'<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 3v18M5 12h14"/>',door:'<path d="M6 21V3.5h12V21M4 21h16"/><path d="M14.5 12.5h.01" stroke-width="2.2"/>',bulb:'<path d="M9.5 17.5h5M10.3 20.5h3.4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',bin:'<path d="M4.5 6.5h15M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14M10 10.5v6M14 10.5v6"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.7"/>',cam:'<path d="M3.5 7.5h3l1.8-2.5h7.4l1.8 2.5h3v12h-17z"/><circle cx="12" cy="13" r="3.6"/>',thermo:'<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>',drop:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',plug:'<path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0zM12 16.5V21"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',back:'<path d="M15 6l-6 6 6 6"/>',forward:'<path d="M9 6l6 6-6 6"/>',shutter:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7.5h16M4 11h16M4 14.5h16M4 18h16"/>',shutter_open:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7h16"/>',awning:'<path d="M3 5h18"/><path d="M4.5 5v2.5h15V5"/>',awning_out:'<path d="M3 4.5h18l-2.5 8h-13z"/><path d="M5.5 12.5q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0"/>',pause:'<path d="M9 5.5v13M15 5.5v13"/>',play:'<path d="M8 5.5l11 6.5-11 6.5z"/>',mute:'<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',speaker:'<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',reload:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',tablet:'<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M11 18h2"/>',watch:'<rect x="7" y="6.5" width="10" height="11" rx="2.6"/><path d="M9 6.5l.6-3.5h4.8l.6 3.5M9 17.5l.6 3.5h4.8l.6-3.5"/>',battery:'<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3"/><path d="M6 10.5v3" stroke-width="2.2"/>',car:'<path d="M4 15.5V12l1.8-4.2A2 2 0 0 1 7.6 6.5h8.8a2 2 0 0 1 1.8 1.3L20 12v3.5"/><path d="M3 15.5h18v2.3a.7.7 0 0 1-.7.7H18.6M5.4 18.5H3.7a.7.7 0 0 1-.7-.7v-2.3"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/><path d="M4.6 11.8h14.8"/>',robot:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.6 8.6a6.8 6.8 0 0 1 10.8 0"/>',person:'<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>',home:'<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',solar:'<path d="M3.5 18l2-8h13l2 8z"/><path d="M4.6 14h14.8M9.2 10l-.9 8M14.8 10l.9 8"/><path d="M12 2.8v2.4M7.4 4.3l1.1 1.6M16.6 4.3l-1.1 1.6"/>',charge:'<path d="M13 3L6 13.5h5L10 21l7-10.5h-5z"/>',leaf:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-4 6-6.5 9-8"/>',warning:'<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.3h.01"/>',pin:'<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',euro:'<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.6a4 4 0 1 0 0 6.8M7.5 11h6M7.5 13.2h6"/>',motion:'<path d="M12 12h.01" stroke-width="2.4"/><path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',unlock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 7.7-1.5"/>',gauge:'<path d="M4.5 17a8 8 0 1 1 15 0"/><path d="M12 13l3.5-4"/>',leak:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',music:'<path d="M9 17.5V5.5l10-2v12"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/><path d="M9 9.5l10-2"/>',page:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9h17M9 9v10.5"/>',tv:'<rect x="2.5" y="4.5" width="19" height="12.5" rx="1.8"/><path d="M8.5 20.5h7M12 17v3.5"/>',sparkle:'<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',cat:'<path d="M5 9.5V4l4 3h6l4-3v5.5c0 5-3.1 9.5-7 9.5s-7-4.5-7-9.5z"/><path d="M9.5 12h.01M14.5 12h.01" stroke-width="2.2"/><path d="M10.8 15c.7.5 1.7.5 2.4 0"/>',printer:'<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M4 8h16M8 13.5h8M10 16.5h4M12 8v3.5"/>',wifi:'<path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0"/><path d="M12 19.5h.01" stroke-width="2.4"/>'},ie=(t,i="")=>$e`<svg class="ic ${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ot(vi[t??""]??vi.info)}</svg>`,_a={sunny:["sun","Sonnig"],"clear-night":["moon","Klar"],partlycloudy:["partly","Teils bew\xF6lkt"],cloudy:["cloud","Bew\xF6lkt"],rainy:["rain","Regen"],pouring:["pour","Starkregen"],snowy:["snow","Schnee"],"snowy-rainy":["snow","Schneeregen"],hail:["snow","Hagel"],fog:["fog","Nebel"],lightning:["bolt","Gewitter"],"lightning-rainy":["bolt","Gewitter"],windy:["wind","Windig"],"windy-variant":["wind","Windig"],exceptional:["bolt","Unwetter"]},Ce=t=>_a[t??""]?.[0]??"cloud",Ue=t=>_a[t??""]?d(_a[t??""][1]):t??"\u2013",Wt={"mdi:washing-machine":"washer","mdi:tumble-dryer":"dryer","mdi:bell":"bell","mdi:doorbell":"bell","mdi:window-open":"window","mdi:door-open":"door","mdi:lightbulb":"bulb","mdi:trash-can":"bin","mdi:thermometer":"thermo","mdi:water-percent":"drop","mdi:calendar":"calendar","mdi:cctv":"cam","mdi:car":"car","mdi:car-electric":"car","mdi:robot-vacuum":"robot","mdi:account":"person","mdi:home":"home","mdi:solar-power":"solar","mdi:solar-panel":"solar","mdi:lightning-bolt":"charge","mdi:flash":"charge","mdi:leaf":"leaf","mdi:alert":"warning","mdi:map-marker":"pin","mdi:currency-eur":"euro","mdi:motion-sensor":"motion","mdi:lock":"lock","mdi:lock-open":"unlock","mdi:water-alert":"leak","mdi:weather-sunny":"sun","mdi:weather-rainy":"rain","mdi:air-filter":"leaf","mdi:brightness-5":"sun","mdi:music":"music","mdi:cat":"cat","mdi:printer-3d":"printer","mdi:wifi":"wifi","mdi:music-note":"music","mdi:speaker":"music"},G=(t,i="")=>t?vi[t]?ie(t,i):Wt[t]?ie(Wt[t],i):t.includes(":")&&customElements.get("ha-icon")?u`<ha-icon class="ic ${i}" icon=${t} style="--mdc-icon-size:1em;width:1em;height:1em;display:inline-flex"></ha-icon>`:ie(void 0,i):ie(void 0,i);var Sd=/(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`|\[mdi:[a-z0-9-]+\])/g,Ht=t=>t.split(Sd).filter(i=>i!=="").map(i=>/^(\*\*|__).+\1$/.test(i)?u`<strong>${i.slice(2,-2)}</strong>`:/^`.+`$/.test(i)?u`<code>${i.slice(1,-1)}</code>`:/^\[mdi:[a-z0-9-]+\]$/.test(i)?G(i.slice(1,-1),"md-ic"):/^([*_]).+\1$/.test(i)?u`<em>${i.slice(1,-1)}</em>`:i),ks=t=>{let i=[],e=()=>i[i.length-1];for(let n of t.replace(/\r/g,"").split(`
`)){let a=n.trimEnd(),r;if(!a.trim())i.push({kind:"p",lines:[]});else if(r=a.match(/^(#{1,3})\s+(.*)$/))i.push({kind:"h",level:r[1].length,text:r[2]});else if(/^\s*(---+|\*\*\*+)\s*$/.test(a))i.push({kind:"hr"});else if(r=a.match(/^\s*[-*•]\s+(.*)$/)){let s=e();s?.kind==="ul"?s.items.push(r[1]):i.push({kind:"ul",items:[r[1]]})}else if(r=a.match(/^\s*\d+[.)]\s+(.*)$/)){let s=e();s?.kind==="ol"?s.items.push(r[1]):i.push({kind:"ol",items:[r[1]]})}else{let s=e();s?.kind==="p"?s.lines.push(a):i.push({kind:"p",lines:[a]})}}return u`<div class="md">
    ${i.map(n=>{switch(n.kind){case"h":return n.level===1?u`<h1 class="display">${Ht(n.text)}</h1>`:n.level===2?u`<h2 class="display">${Ht(n.text)}</h2>`:u`<h3>${Ht(n.text)}</h3>`;case"hr":return u`<hr />`;case"ul":return u`<ul>
            ${n.items.map(a=>u`<li>${Ht(a)}</li>`)}
          </ul>`;case"ol":return u`<ol>
            ${n.items.map(a=>u`<li>${Ht(a)}</li>`)}
          </ol>`;default:return n.lines.length?u`<p>${n.lines.map((a,r)=>u`${r?u`<br />`:m}${Ht(a)}`)}</p>`:m}})}
  </div>`},xs=F`
  .md > :first-child {
    margin-top: 0;
  }
  .md > :last-child {
    margin-bottom: 0;
  }
  .md h1 {
    font-size: 2.1em;
    line-height: 1.05;
    margin: 0 0 0.4em;
    font-weight: var(--af-clock-weight);
  }
  .md h2 {
    font-size: 1.5em;
    line-height: 1.1;
    margin: 0.9em 0 0.35em;
    font-weight: var(--af-clock-weight);
  }
  .md h3 {
    font-size: 0.7em;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--af-ink-3);
    margin: 1.2em 0 0.5em;
  }
  .md p {
    margin: 0 0 0.7em;
  }
  .md ul,
  .md ol {
    margin: 0 0 0.7em;
    padding-left: 1.2em;
  }
  .md li {
    margin: 0.25em 0;
  }
  .md li::marker {
    color: var(--af-accent);
  }
  .md strong {
    color: var(--af-ink);
    font-weight: 600;
  }
  .md em {
    color: var(--af-accent);
    font-style: normal;
  }
  .md code {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 0.85em;
    background: var(--af-surface);
    padding: 0.1em 0.35em;
    border-radius: 6px;
  }
  .md hr {
    border: 0;
    border-top: 1px solid var(--af-line);
    margin: 0.9em 0;
  }
  .md .md-ic {
    width: 1.05em;
    height: 1.05em;
    vertical-align: -0.15em;
    color: var(--af-accent);
  }
`;var $d=Oe("fraunces"),La=Oe("inter"),ct={bg:"#0a0d0b","bg-art":"none",ink:"#ede7db","ink-2":"rgba(237, 231, 219, 0.66)","ink-3":"rgba(237, 231, 219, 0.4)",line:"rgba(237, 231, 219, 0.1)",surface:"rgba(237, 231, 219, 0.045)",accent:"#d6a865","accent-soft":"rgba(214, 168, 101, 0.14)",cold:"#9dbad6",alert:"#ef8b63",good:"#9cc5a1",panel:"rgba(18, 21, 19, 0.92)",chip:"rgba(10, 13, 11, 0.62)",shadow:"0 30px 80px rgba(0, 0, 0, 0.55)",veil:"rgba(6, 9, 7, 0.52)",colon:"inherit","colon-opacity":"0.55",mist:"rgba(255, 255, 255, 0.07)"},St={bg:"#f2ede3","bg-art":"none",ink:"#1e1b16","ink-2":"rgba(30, 27, 22, 0.64)","ink-3":"rgba(30, 27, 22, 0.42)",line:"rgba(30, 27, 22, 0.11)",surface:"rgba(255, 255, 255, 0.55)",accent:"#9a7334","accent-soft":"rgba(154, 115, 52, 0.13)",cold:"#3d6a8f",alert:"#c0552f",good:"#4f8a5b",panel:"rgba(250, 247, 240, 0.95)",chip:"rgba(250, 247, 240, 0.8)",shadow:"0 30px 80px rgba(60, 45, 20, 0.16)",veil:"rgba(242, 237, 227, 0.55)",colon:"inherit","colon-opacity":"0.5",mist:"rgba(120, 100, 70, 0.07)"},ut={display:$d,sans:La,"clock-weight":"300","clock-track":"-0.02em"},Ss={card:"transparent","card-border":"0 solid transparent","card-radius":"0","card-pad":"26px 0 0"},cn=(t,i,e)=>`radial-gradient(60% 70% at 12% 18%, ${t}, transparent 62%), radial-gradient(55% 65% at 88% 26%, ${i}, transparent 62%), radial-gradient(75% 70% at 58% 100%, ${e}, transparent 64%)`,Da=[{id:"ruhig",name:"Ruhig",hint:"Serifen-Uhr, warmes Wei\xDF, Bambus",ambient:"none",shared:ut,dark:ct,light:St},{id:"klar",name:"Klar",hint:"StandBy-Stil, schlicht, Salbei",ambient:"none",shared:{...ut,display:La,"clock-weight":"200","clock-track":"-0.05em"},dark:{...ct,accent:"#a8cab5","accent-soft":"rgba(168, 202, 181, 0.14)"},light:{...St,bg:"#f3f4f1",ink:"#141714","ink-2":"rgba(20, 23, 20, 0.64)","ink-3":"rgba(20, 23, 20, 0.42)",line:"rgba(20, 23, 20, 0.1)",surface:"rgba(255, 255, 255, 0.7)",accent:"#4f7d63","accent-soft":"rgba(79, 125, 99, 0.13)",panel:"rgba(250, 251, 249, 0.95)",chip:"rgba(250, 251, 249, 0.8)",shadow:"0 30px 80px rgba(20, 30, 20, 0.14)",veil:"rgba(243, 244, 241, 0.55)"}},{id:"gold",name:"Gold",hint:"Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein",ambient:"none",shared:ut,dark:{...ct,bg:"#09090a",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.68)","ink-3":"rgba(255, 255, 255, 0.42)",line:"rgba(255, 255, 255, 0.1)",surface:"rgba(255, 255, 255, 0.045)",accent:"#d9b45f","accent-soft":"rgba(217, 180, 95, 0.15)",cold:"#a9c4dc",colon:"var(--af-accent)","colon-opacity":"1"},light:{...St,bg:"#f6f3ec",ink:"#16130f","ink-2":"rgba(22, 19, 15, 0.64)","ink-3":"rgba(22, 19, 15, 0.42)",line:"rgba(22, 19, 15, 0.11)",surface:"rgba(255, 255, 255, 0.7)",accent:"#a8803a","accent-soft":"rgba(168, 128, 58, 0.13)",cold:"#3f6f9c",panel:"rgba(255, 255, 255, 0.94)",chip:"rgba(255, 255, 255, 0.78)",shadow:"0 30px 80px rgba(60, 45, 20, 0.18)",veil:"rgba(246, 243, 236, 0.55)",colon:"var(--af-accent)","colon-opacity":"1"}},{id:"glass",name:"Liquid Glass",hint:"Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben",ambient:"flow",shared:{...ut,display:La,"clock-weight":"300","clock-track":"-0.04em","card-radius":"34px"},dark:{...ct,bg:"#0b1020","bg-art":cn("rgba(90, 120, 255, 0.5)","rgba(255, 120, 175, 0.38)","rgba(60, 210, 195, 0.36)"),"flow-1":"rgba(90, 120, 255, 0.55)","flow-2":"rgba(255, 120, 175, 0.42)","flow-3":"rgba(60, 210, 195, 0.4)",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.74)","ink-3":"rgba(255, 255, 255, 0.5)",line:"rgba(255, 255, 255, 0.16)",surface:"rgba(255, 255, 255, 0.08)",accent:"#9fd4ff","accent-soft":"rgba(159, 212, 255, 0.16)",cold:"#a8c8ff",good:"#8fe3b0",alert:"#ff9f7a",card:"linear-gradient(140deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05) 55%, rgba(255, 255, 255, 0.1))","card-border":"1px solid rgba(255, 255, 255, 0.24)","card-filter":"blur(24px) saturate(1.8)","card-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0, 0, 30, 0.3)",panel:"rgba(28, 32, 58, 0.7)",chip:"rgba(255, 255, 255, 0.14)",veil:"rgba(10, 14, 30, 0.4)",shadow:"0 30px 80px rgba(0, 0, 30, 0.5)",mist:"rgba(255, 255, 255, 0.09)"},light:{...St,bg:"#e9edf7","bg-art":cn("rgba(150, 140, 255, 0.5)","rgba(255, 175, 150, 0.5)","rgba(120, 215, 205, 0.45)"),"flow-1":"rgba(150, 140, 255, 0.55)","flow-2":"rgba(255, 175, 150, 0.55)","flow-3":"rgba(120, 215, 205, 0.5)",ink:"#0f1320","ink-2":"rgba(15, 19, 32, 0.66)","ink-3":"rgba(15, 19, 32, 0.44)",line:"rgba(15, 19, 32, 0.09)",surface:"rgba(255, 255, 255, 0.5)",accent:"#2f6fe0","accent-soft":"rgba(47, 111, 224, 0.12)",cold:"#2f6fe0",good:"#2f8a5b",alert:"#d0552f",card:"linear-gradient(140deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.4) 55%, rgba(255, 255, 255, 0.58))","card-border":"1px solid rgba(255, 255, 255, 0.85)","card-filter":"blur(24px) saturate(1.6)","card-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 18px 44px rgba(40, 50, 100, 0.14)",panel:"rgba(255, 255, 255, 0.75)",chip:"rgba(255, 255, 255, 0.62)",veil:"rgba(233, 237, 247, 0.45)",shadow:"0 30px 80px rgba(40, 50, 100, 0.18)",mist:"rgba(255, 255, 255, 0.55)"}},{id:"aurora",name:"Aurora",hint:"Ruhig flie\xDFende Farben wie Nordlicht",ambient:"flow",shared:{...ut,display:Oe("outfit"),"clock-weight":"200","clock-track":"-0.03em"},dark:{...ct,bg:"#060a14","bg-art":cn("rgba(60, 220, 170, 0.36)","rgba(130, 90, 255, 0.36)","rgba(40, 120, 255, 0.3)"),"flow-1":"rgba(60, 220, 170, 0.42)","flow-2":"rgba(130, 90, 255, 0.4)","flow-3":"rgba(40, 120, 255, 0.34)",ink:"#eef3f7","ink-2":"rgba(238, 243, 247, 0.7)","ink-3":"rgba(238, 243, 247, 0.45)",line:"rgba(238, 243, 247, 0.12)",surface:"rgba(238, 243, 247, 0.06)",accent:"#7fe0c4","accent-soft":"rgba(127, 224, 196, 0.14)",cold:"#8fb8ff",card:"rgba(255, 255, 255, 0.06)","card-border":"1px solid rgba(255, 255, 255, 0.1)","card-filter":"blur(18px) saturate(1.4)",panel:"rgba(12, 18, 32, 0.85)",chip:"rgba(12, 18, 32, 0.6)",veil:"rgba(6, 10, 20, 0.5)"},light:{...St,bg:"#f7f3ef","bg-art":cn("rgba(255, 185, 140, 0.5)","rgba(200, 165, 255, 0.45)","rgba(140, 225, 205, 0.42)"),"flow-1":"rgba(255, 185, 140, 0.55)","flow-2":"rgba(200, 165, 255, 0.5)","flow-3":"rgba(140, 225, 205, 0.45)",ink:"#1b1820","ink-2":"rgba(27, 24, 32, 0.64)","ink-3":"rgba(27, 24, 32, 0.42)",line:"rgba(27, 24, 32, 0.09)",surface:"rgba(255, 255, 255, 0.45)",accent:"#7457d6","accent-soft":"rgba(116, 87, 214, 0.12)",cold:"#4a7fd6",card:"rgba(255, 255, 255, 0.45)","card-border":"1px solid rgba(255, 255, 255, 0.75)","card-filter":"blur(18px) saturate(1.3)",panel:"rgba(255, 252, 249, 0.85)",chip:"rgba(255, 252, 249, 0.65)",veil:"rgba(247, 243, 239, 0.5)",mist:"rgba(255, 255, 255, 0.5)"}},{id:"editorial",name:"Editorial",hint:"Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien",ambient:"none",shared:{...ut,...Ss,display:Oe("instrument"),"clock-weight":"400","clock-track":"-0.01em","card-rule":"1.5px solid currentColor"},dark:{...ct,bg:"#141311",ink:"#ece5d8","ink-2":"rgba(236, 229, 216, 0.68)","ink-3":"rgba(236, 229, 216, 0.44)",line:"rgba(236, 229, 216, 0.16)",surface:"rgba(236, 229, 216, 0.05)",accent:"#e08d63","accent-soft":"rgba(224, 141, 99, 0.14)",panel:"rgba(24, 23, 20, 0.95)",chip:"rgba(20, 19, 17, 0.7)",veil:"rgba(10, 9, 8, 0.55)"},light:{...St,bg:"#f3eee4",ink:"#1c1915","ink-2":"rgba(28, 25, 21, 0.7)","ink-3":"rgba(28, 25, 21, 0.48)",line:"rgba(28, 25, 21, 0.16)",surface:"rgba(28, 25, 21, 0.05)",accent:"#a8432a","accent-soft":"rgba(168, 67, 42, 0.1)",cold:"#2f5d8a",alert:"#b8401f",good:"#3f7a4b",panel:"rgba(246, 242, 234, 0.97)",chip:"rgba(246, 242, 234, 0.85)",veil:"rgba(243, 238, 228, 0.6)",shadow:"0 30px 80px rgba(40, 30, 20, 0.14)"}},{id:"minimal",name:"Minimal",hint:"Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie",ambient:"none",shared:{...ut,...Ss,display:Oe("geist"),sans:Oe("geist"),"clock-weight":"400","clock-track":"-0.055em","card-rule":"1px solid color-mix(in srgb, currentColor 22%, transparent)"},dark:{...ct,bg:"#000000",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.6)","ink-3":"rgba(255, 255, 255, 0.38)",line:"rgba(255, 255, 255, 0.14)",surface:"rgba(255, 255, 255, 0.06)",accent:"#ff5a36","accent-soft":"rgba(255, 90, 54, 0.14)",cold:"#7fb2ff",panel:"rgba(16, 16, 16, 0.96)",chip:"rgba(0, 0, 0, 0.7)",veil:"rgba(0, 0, 0, 0.55)",colon:"var(--af-accent)","colon-opacity":"1"},light:{...St,bg:"#f6f6f4",ink:"#0b0b0b","ink-2":"rgba(11, 11, 11, 0.6)","ink-3":"rgba(11, 11, 11, 0.4)",line:"rgba(11, 11, 11, 0.12)",surface:"rgba(11, 11, 11, 0.05)",accent:"#e8401c","accent-soft":"rgba(232, 64, 28, 0.1)",cold:"#2f6fe0",panel:"rgba(250, 250, 248, 0.97)",chip:"rgba(250, 250, 248, 0.85)",veil:"rgba(246, 246, 244, 0.6)",shadow:"0 30px 80px rgba(0, 0, 0, 0.12)",colon:"var(--af-accent)","colon-opacity":"1"}}],ht=Da.map(({id:t,name:i,hint:e,ambient:n})=>({id:t,name:i,hint:e,ambient:n})),$s=t=>t==="weissgold"?{theme:"gold",light:!0}:{theme:Da.some(i=>i.id===t)?t:"ruhig",light:!1},Ca=t=>Object.entries(t).map(([i,e])=>`--af-${i}: ${e};`).join(`
    `),Ad=Da.map(t=>`
  :host([theme="${t.id}"]) {
    ${Ca({...t.shared,...t.dark})}
  }
  :host([theme="${t.id}"][mode="light"]) {
    ${Ca({...t.shared,...t.light})}
  }`).join(`
`),As=[F`
    :host {
      --af-ease: cubic-bezier(0.22, 0.8, 0.24, 1);
      --af-ease-io: cubic-bezier(0.65, 0, 0.35, 1);
      --af-ease-soft: cubic-bezier(0.45, 0, 0.25, 1);
    }
  `,ui(`:host { ${Ca({...ut,...ct})} }`),ui(Ad),F`
    /* Abendstimmung: dunkle Stile werden nach Sonnenuntergang etwas wärmer */
    :host([evening]:not([mode="light"])) {
      --af-ink: #f2e0c8;
      --af-ink-2: rgba(242, 224, 200, 0.64);
      --af-ink-3: rgba(242, 224, 200, 0.38);
    }
    :host([evening][theme="gold"]:not([mode="light"])),
    :host([evening][theme="glass"]:not([mode="light"])),
    :host([evening][theme="minimal"]:not([mode="light"])) {
      --af-ink: #fbf3e4;
      --af-ink-2: rgba(251, 243, 228, 0.68);
      --af-ink-3: rgba(251, 243, 228, 0.42);
    }
  `],Ts=F`
  .onphoto {
    --af-ink: #ffffff;
    --af-ink-2: rgba(255, 255, 255, var(--af-c2, 0.78));
    --af-ink-3: rgba(255, 255, 255, var(--af-c3, 0.55));
    --af-line: rgba(255, 255, 255, 0.16);
    --af-surface: rgba(10, 10, 10, 0.28);
    --af-cold: #b8d0e6;
  }
`,Es=F`
  .night {
    --af-bg-art: none;
    --af-card: rgba(106, 82, 52, 0.06);
    --af-card-filter: none;
    --af-card-shadow: none;
    --af-card-border: 1px solid rgba(106, 82, 52, 0.2);
    --af-bg: #000;
    --af-ink: #6a5234;
    --af-ink-2: #4d3b24;
    --af-ink-3: #3a2c1a;
    --af-accent: #6a5234;
    --af-line: rgba(106, 82, 52, 0.2);
    --af-surface: rgba(106, 82, 52, 0.06);
  }
`,V=F`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color: var(--af-ink);
    font-family: var(--af-sans);
    -webkit-font-smoothing: antialiased;
  }
  .num {
    font-variant-numeric: tabular-nums lining-nums;
  }
  .display {
    font-family: var(--af-display);
    font-weight: var(--af-clock-weight);
    letter-spacing: var(--af-clock-track);
    font-optical-sizing: auto;
  }
  .label {
    font-size: calc(16px * var(--af-fs, 1));
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--af-ink-3);
    font-weight: 500;
  }
  .muted {
    color: var(--af-ink-2);
  }
  .faint {
    color: var(--af-ink-3);
  }
  .ic {
    width: 1em;
    height: 1em;
    flex: none;
    display: inline-block;
    vertical-align: -0.14em;
  }
  /* Karten-Form kommt vom Stil: Fläche, Glas oder nur eine Linie oben */
  .card {
    box-sizing: border-box;
    height: 100%;
    background: var(--af-card, var(--af-surface));
    border: var(--af-card-border, 1px solid var(--af-line));
    border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
    border-radius: var(--af-card-radius, 40px);
    box-shadow: var(--af-card-shadow, none);
    backdrop-filter: var(--af-card-filter, none);
    -webkit-backdrop-filter: var(--af-card-filter, none);
    padding: var(--af-card-pad, 40px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--af-ink-3);
    flex: none;
  }
`,pt=F`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: var(--af-valign, flex-start);
    align-items: var(--af-align, flex-start);
    text-align: var(--af-text-align, left);
  }
`;var zs=t=>typeof t=="string"&&(t.includes("{{")||t.includes("{%")),Rt=new Map,_s=(t,i,e)=>{let n=Rt.get(i);if(!n){let r={listeners:new Set};n=r,Rt.set(i,r);let s=o=>{r.last=o,r.listeners.forEach(l=>l(o))};r.unsub=t.connection.subscribeMessage(o=>s(o.error!==void 0?{error:o.error}:{value:o.result}),{type:"ambiframe/template/subscribe",template:i}).catch(o=>{Rt.get(i)===r&&Rt.delete(i),s({error:o?.message??d("Vorlage nicht verf\xFCgbar")})})}let a=n;return clearTimeout(a.closeTimer),a.listeners.add(e),a.last&&e(a.last),()=>{a.listeners.delete(e),!a.listeners.size&&(a.closeTimer=window.setTimeout(()=>{a.listeners.size||Rt.get(i)!==a||(Rt.delete(i),a.unsub?.then(r=>r?.()))},3e3))}},Ls=t=>t==null?"":typeof t=="number"?t.toLocaleString(X(),{useGrouping:!1,maximumFractionDigits:10}):typeof t=="boolean"?t?d("ja"):d("nein"):Array.isArray(t)?t.map(Ls).join(", "):typeof t=="object"?JSON.stringify(t):String(t),Td=t=>{if(typeof t=="boolean")return t;if(typeof t=="number")return t!==0;let i=String(t??"").trim().toLowerCase();if(["true","on","yes","ja","home","open"].includes(i))return!0;let e=Number(i);return i!==""&&Number.isFinite(e)?e!==0:!1},$t=class{constructor(i){this.host=i;i.addController(this)}set(i,e){if(!i||!zs(e)){this.key&&this.clear();return}e!==this.key&&(this.clear(),this.key=e,this.stop=_s(i,e,n=>{this.result=n,this.host.requestUpdate()}))}text(i){if(!zs(i))return i==null?"":String(i);if(this.result)return this.result.error!==void 0?`\u26A0 ${this.result.error}`:Ls(this.result.value)}clear(){this.stop?.(),this.stop=void 0,this.key=void 0,this.result=void 0}hostConnected(){this.host.requestUpdate()}hostDisconnected(){this.clear()}},un=new EventTarget,yi=new Map,Cs=(t,i)=>(yi.has(i)||(yi.set(i,!1),_s(t,i,e=>{let n=e.error===void 0&&Td(e.value);yi.get(i)!==n&&(yi.set(i,n),un.dispatchEvent(new Event("change")))})),yi.get(i)??!1);var W=(t,i=1)=>{let e=typeof t=="number"?t:parseFloat(String(t));return Number.isFinite(e)?e.toLocaleString(X(),{minimumFractionDigits:i,maximumFractionDigits:i}):"\u2013"},Q=t=>t.toLocaleTimeString(X(),{hour:"2-digit",minute:"2-digit"}),Ms=(t,i="long")=>i==="long"?t.toLocaleDateString(X(),{weekday:"long",day:"numeric",month:"long"}):t.toLocaleDateString(X(),{weekday:"short",day:"numeric",month:"short"}),wi=t=>t.toLocaleDateString(X(),{weekday:"short"}).replace(".",""),Kt=t=>{let i=new Date(t);return i.setHours(0,0,0,0),i},le=t=>Math.round((Kt(t).getTime()-Kt(new Date).getTime())/864e5),We=t=>[d("heute"),d("morgen"),d("\xFCbermorgen")][le(t)]??t.toLocaleDateString(X(),{weekday:"long"}),ki=t=>{let i=Math.max(1,Math.round(t/6e4));return i<60?`${i} min`:`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")} h`},Ps=t=>typeof t=="number"?["N","NO","O","SO","S","SW","W","NW"][Math.round(t/45)%8]:String(t??""),se=t=>{if(!t)return null;let i=new Date(String(t).replace(" ","T"));return Number.isNaN(i.getTime())?null:i},H=(t,i)=>i?t?.states[i]:void 0,be=(t,i,e)=>{let n=H(t,i);if(n)return e?n.attributes?.[e]:n.state},ce=(t,i,e)=>{let n=parseFloat(String(be(t,i,e)));return Number.isFinite(n)?n:null},Ae=(t,i)=>H(t,i)?.attributes.friendly_name??i??"";var xi=(t,i)=>{let e=t.entities?.[i],n=e?.area_id??(e?.device_id?t.devices?.[e.device_id]?.area_id:void 0);return n?t.areas?.[n]?.name:void 0},Ds=t=>{let i=t?.match(/^(\d{1,2}):(\d{2})$/);return i?Number(i[1])*60+Number(i[2]):null};function et(t,i,e){switch(i.condition){case"and":return(i.conditions??[]).every(n=>et(t,n,e));case"or":return(i.conditions??[]).some(n=>et(t,n,e));case"not":return!(i.conditions??[]).some(n=>et(t,n,e));case"display":return!e?.display||!i.displays?.length||i.displays.includes(e.display);case"orientation":return!e?.orientation||e.orientation===i.orientation;case"template":return!!t&&!!i.value_template&&Cs(t,i.value_template);case"changed":{let n=H(t,i.entity);if(!n)return!1;let a=i.state===void 0||i.state===""?null:(Array.isArray(i.state)?i.state:[i.state]).map(String);return a&&!a.includes(n.state)?!1:Date.now()-new Date(n.last_changed).getTime()<=(Number(i.minutes)||10)*6e4}}if(i.condition==="time"){let n=new Date().getHours()*60+new Date().getMinutes(),a=Ds(i.after),r=Ds(i.before);return a!==null&&r!==null&&a>r?n>=a||n<r:(a===null||n>=a)&&(r===null||n<r)}if(!t)return!0;switch(i.condition){case"state":case"not_state":{let n=String(be(t,i.entity,i.attribute)),a=(Array.isArray(i.state)?i.state:[i.state]).map(String).includes(n);return i.condition==="state"?a:!a}case"numeric":{let n=ce(t,i.entity,i.attribute);return n===null?!1:(i.above===void 0||n>i.above)&&(i.below===void 0||n<i.below)}case"any_state":{let n=(Array.isArray(i.state)?i.state:[i.state]).map(String);return(i.entities??[]).some(a=>n.includes(String(t.states[a]?.state)))}case"within_days":{let n=se(be(t,i.entity,i.attribute??(i.entity.startsWith("calendar.")?"start_time":void 0)));if(!n)return!1;let a=le(n);return a>=0&&a<=i.days}default:return!0}}var tt=(t,i,e)=>!i?.length||i.every(n=>et(t,n,e)),Ma=(t,i,e)=>{if(!i)return null;let n=se(be(t,i,i.startsWith("calendar.")?"start_time":void 0));if(!n)return null;let a=le(n);return a>=0&&a<=e?n:null},it=t=>{if(!t)return"";let i=typeof t=="string"?new Date(t):t,e=Math.round((Date.now()-i.getTime())/6e4);return e<1?d("gerade"):e<60?d("vor {n} min",{n:e}):e<720?d("vor {n} h",{n:Math.round(e/60)}):le(i)===-1?d("gestern {time}",{time:Q(i)}):i.toLocaleDateString(X(),{weekday:"short",day:"numeric",month:"short"})},Pa=(t,i)=>i?i==="home"?d("Zuhause"):i==="not_home"?d("Unterwegs"):Object.values(t?.states??{}).find(n=>n.entity_id.startsWith("zone.")&&(n.attributes.friendly_name===i||n.entity_id===`zone.${i}`))?.attributes.friendly_name??i:"\u2013",Ia=(t,i,e,n)=>{let a=s=>s*Math.PI/180,r=Math.sin(a(e-t)/2)**2+Math.cos(a(t))*Math.cos(a(e))*Math.sin(a(n-i)/2)**2;return 6371*2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r))},hn=(t,i)=>{let e=H(t,i);if(!e)return null;let n=parseFloat(e.state);if(Number.isFinite(n)&&/^\d+(\.\d+)?$/.test(e.state.trim()))return n;let a=e.state.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);if(a)return le(new Date(Number(a[3]),Number(a[2])-1,Number(a[1])));let s=Object.keys(e.attributes).filter(o=>/^\d{4}-\d{2}-\d{2}$/.test(o)).sort().map(o=>se(o)).find(o=>o&&le(o)>=0);return s?le(s):null},pn=(t,i)=>{let e=[...t.children].find(n=>n.classList.contains("af-custom"));if(!i?.trim()){e?.remove();return}e||(e=document.createElement("style"),e.className="af-custom",t.appendChild(e)),e.textContent!==i&&(e.textContent=i)},Ns=t=>!!t&&typeof t=="object"&&!Array.isArray(t),Na=(t,i)=>{if(!i)return t;let e={...t};for(let[n,a]of Object.entries(i))a==null||a===""||(e[n]=Ns(a)&&Ns(e[n])?Na(e[n],a):a);return e},Si=(t,i)=>{let e=t?.displays.find(a=>a.id===i);if(!t||!e||!e.design&&!e.photos)return t;let n=Na(t.design,e.design);return e.design?.css&&t.design.css&&(n.css=`${t.design.css}
${e.design.css}`),{...t,design:n,photos:Na(t.photos,e.photos)}},Ed=/\s*(battery level|batteriestand|batterie|battery|akku)\s*$/i,zd=/^(low|niedrig|schwach|critical|kritisch)$/i,_d=t=>/watch/i.test(t)?"watch":/ipad|tablet|tab[ _]/i.test(t)?"tablet":/iphone|phone|pixel|galaxy/i.test(t)?"phone":"other",Fa=(t,i={})=>{let e=t?.states??{},n=Number(i.threshold??21),a=new Set(i.exclude??[]),r=p=>String(e[p]?.attributes.friendly_name??p).replace(Ed,"").trim(),s=(i.devices??[]).map(p=>typeof p=="string"?{entity:p}:p).filter(p=>p.entity),o=Object.keys(e).filter(p=>p.startsWith("sensor.")&&p.endsWith("_battery_level")&&e[p.replace(/_level$/,"_state")]).map(p=>({entity:p,name:void 0})),l=(s.length?s:o).filter(p=>e[p.entity]&&!a.has(p.entity)).map(p=>{let g=e[p.entity],b=parseFloat(g.state),f=e[p.entity.replace(/_level$/,"_state")]?.state??"",v=p.name||r(p.entity);return{id:p.entity,name:v,level:Number.isFinite(b)?b:null,charging:/^(charging|full|lädt|voll)$/i.test(f)||g.attributes.is_charging===!0,kind:_d(`${p.entity} ${v}`)}}),c=new Set(l.flatMap(p=>[p.id,p.id.replace(/_level$/,"_state")])),h=[];for(let[p,g]of Object.entries(e)){if(c.has(p)||a.has(p)||g.attributes.device_class!=="battery"||g.state==="unavailable"||g.state==="unknown")continue;if(p.startsWith("binary_sensor.")){g.state==="on"&&h.push({id:p,name:r(p),level:null,charging:!1,kind:"other"});continue}if(!p.startsWith("sensor."))continue;let b=parseFloat(g.state);(Number.isFinite(b)?g.attributes.unit_of_measurement==="%"&&b<n:zd.test(g.state))&&h.push({id:p,name:r(p),level:Number.isFinite(b)?b:null,charging:!1,kind:"other"})}return h.sort((p,g)=>(p.level??-1)-(g.level??-1)),{devices:l,low:h}};var Ld=[[.65,1],[.45,.94],[.35,.88],[.3,.82]],ne=class extends re{constructor(){super(...arguments);this.options={}}watched(){return[]}updated(e){super.updated?.(e),this.fitToBox()}fitToBox(){if(this.style.removeProperty("--af-dense"),this.style.removeProperty("--af-fs"),!this.clientHeight||this.scrollHeight<=this.clientHeight+2)return;let e=parseFloat(getComputedStyle(this).getPropertyValue("--af-fs"))||1;for(let[n,a]of Ld)if(this.style.setProperty("--af-dense",String(n)),this.style.setProperty("--af-fs",String(e*a)),this.scrollHeight<=this.clientHeight+2)return}shouldUpdate(e){if(e.size===1&&e.has("hass")){let n=e.get("hass");return!n||!this.hass?!0:this.watched().some(a=>a&&n.states[a]!==this.hass.states[a])}return!0}};ne.properties={hass:{attribute:!1},options:{attribute:!1},ctx:{attribute:!1}},ne.styles=V;var J=class extends ne{connectedCallback(){super.connectedCallback();let i=()=>{let e=6e4-Date.now()%6e4+50;this.tickTimer=window.setTimeout(()=>{this.requestUpdate(),i()},e)};i()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.tickTimer)}},B=(t,i)=>{customElements.get(t)||customElements.define(t,i)};var Cd={ink:"var(--af-ink)",muted:"var(--af-ink-2)",faint:"var(--af-ink-3)",accent:"var(--af-accent)"},Ba=(t,i)=>Cd[String(t)]??(t?String(t):i),mn=class extends J{connectedCallback(){super.connectedCallback(),this.options.seconds&&(this.secTimer=window.setInterval(()=>this.requestUpdate(),1e3))}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.secTimer)}render(){let i=new Date,[e,n]=Q(i).split(":"),a=this.options.size==="small",r=this.options.font==="sans"||a?"":"display",s=this.options.seconds?u`<span class="col">:</span>${String(i.getSeconds()).padStart(2,"0")}`:m;return u`<div class="clock num ${r} ${a?"small":""}" style="color:${Ba(this.options.color,"")}">
      ${e}<span class="col">:</span>${n}${s}
    </div>`}};mn.styles=[V,pt,F`
      :host {
        container-type: size;
      }
      .clock {
        line-height: 0.86;
        white-space: nowrap;
        font-size: min(110cqh, 36cqw);
      }
      .clock.small {
        font-size: calc(22px * var(--af-fs, 1));
        line-height: 1;
        color: var(--af-ink-2);
      }
      .col {
        color: var(--af-colon, inherit);
        opacity: var(--af-colon-opacity, 0.55);
        margin: 0 0.02em;
      }
    `];var gn=class extends J{render(){let i=new Date;if(this.options.style==="card")return u`<div class="card" style="width:100%">
        <div class="label">${i.toLocaleDateString(X(),{weekday:"long"})}</div>
        <div class="day display num">${i.getDate()}</div>
        <div class="month">${i.toLocaleDateString(X(),{month:"long",year:"numeric"})}</div>
      </div>`;let e=Number(this.options.size)||26,n=this.options.color?"":"var(--af-ink-2)";return u`<div class="date" style="font-size:${e}px;color:${Ba(this.options.color,n)}">
      ${Ms(i,this.options.format==="short"?"short":"long")}
    </div>`}};gn.styles=[V,pt,F`
      .date {
        line-height: 1.2;
      }
      .card .day {
        font-size: 128px;
        line-height: 0.9;
        margin-top: auto;
      }
      .card .month {
        font-size: 28px;
        margin-top: 16px;
      }
    `];var Is={label:"font-size: calc(16px * var(--af-fs, 1));letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:var(--af-ink-3)",title:"font-size:44px;line-height:1.05",body:"font-size: calc(21px * var(--af-fs, 1));line-height:1.45;color:var(--af-ink-2)",big:"font-size:84px;line-height:1"},fn=class extends ne{constructor(){super(...arguments);this.tpl=new $t(this)}willUpdate(){this.tpl.set(this.hass,this.options.text)}render(){let e=this.options,n=Is[e.style]??Is.body,a=[e.size?`font-size:${Number(e.size)}px`:"",e.color?`color:${Ba(e.color,"")}`:""].join(";"),r=e.font==="display"||e.style==="title"||e.style==="big"?"display":"",s=this.tpl.text(e.text);if(s===void 0)return u`<div class="wait" style="${n};${a}">…</div>`;let o=e.icon?u`${G(e.icon)} `:m;return e.markdown?u`<div style="${n};${a};width:100%">${o}${ks(s)}</div>`:u`<div class="${r}" style="${n};${a};white-space:pre-line">${o}${s}</div>`}};fn.styles=[V,pt,xs,F`
      .md {
        width: 100%;
      }
      .wait {
        opacity: 0.35;
      }
    `];B("af-clock",mn);B("af-date",gn);B("af-text",fn);var Fs={accent:"var(--af-accent)",cold:"var(--af-cold)",good:"var(--af-good)",alert:"var(--af-alert)",ink:"var(--af-ink)",muted:"var(--af-ink-2)"},Bs=["accent","cold","good","alert","muted"],Os=(t,i=0)=>Fs[String(t)]??(t?String(t):Fs[Bs[i%Bs.length]]),Dd=new Set(["on","home","open","true","playing","heat","cool","detected"]),Nd=new Set(["off","not_home","closed","false","idle","paused","standby","clear"]),Oa=t=>{let i=parseFloat(t);return Number.isFinite(i)?i:Dd.has(t)?1:Nd.has(t)?0:null},At=(t,i)=>{let n=(i===void 0||i===""?void 0:Number(i))??(Number.isInteger(t)||Math.abs(t)>=100?0:Math.abs(t)>=1?1:2);return t.toLocaleString(X(),{minimumFractionDigits:n,maximumFractionDigits:n})},Wa=t=>t?.attributes.unit_of_measurement??"",He=36e5,Md=(t,i,e)=>{if(t.length<=i)return t;let n=t[0][0],a=t[t.length-1][0]-n||1,r=new Map;for(let[s,o]of t){let l=Math.min(i-1,Math.floor((s-n)/a*i)),c=r.get(l);c?e?r.set(l,[c[0],o,1]):r.set(l,[c[0],c[1]+o,c[2]+1]):r.set(l,[s,o,1])}return[...r.values()].map(([s,o,l])=>[s,o/l])},$i=class $i extends ne{constructor(){super(...arguments);this.series=[];this.loadedKey="";this.loading=!1;this.failed="";this.gid=$i.gid++}get ids(){let e=this.options;return(Array.isArray(e.entities)?e.entities:e.entity?[{entity:e.entity}]:[]).map(a=>typeof a=="string"?{entity:a}:a).filter(a=>!!a?.entity)}get hours(){return Math.max(1,Number(this.options.hours)||24)}get period(){return this.options.period??(this.hours>72?"day":"hour")}watched(){return this.ids.map(e=>e.entity)}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.load()},5*6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer),this.loadedKey=""}willUpdate(){let e=JSON.stringify([this.ids,this.hours,this.options.kind,this.period]);this.hass&&e!==this.loadedKey&&(this.loadedKey=e,this.load())}async load(){let e=this.hass,n=this.ids;if(!e||!n.length||this.loading)return;this.loading=!0;let a=this.options.kind??"line",r=new Date(Date.now()-this.hours*He);try{let s={},o={};if(a==="bar"||this.hours>72){let l=a==="bar"?this.period:this.hours>336?"day":"hour",c=l==="day"?Kt(r):new Date(Math.floor(r.getTime()/He)*He),h=await e.callWS({type:"recorder/statistics_during_period",statistic_ids:n.map(p=>p.entity),period:l,start_time:c.toISOString(),types:a==="bar"?["change","mean"]:["mean","state"]});for(let p of n)s[p.entity]=(h[p.entity]??[]).map(g=>[g.start,Number(a==="bar"?g.change??g.mean:g.mean??g.state)]).filter(([,g])=>Number.isFinite(g))}else{let l=await e.callWS({type:"history/history_during_period",start_time:r.toISOString(),entity_ids:n.map(c=>c.entity),minimal_response:!0,no_attributes:!0,significant_changes_only:!1});for(let c of n){let h=l[c.entity]??[];o[c.entity]=!/^(sensor|input_number|number)\./.test(c.entity),s[c.entity]=h.map(p=>[Math.max(r.getTime(),(p.lc??p.lu??0)*1e3),Oa(p.s)]).filter(p=>p[1]!==null)}}this.series=n.map((l,c)=>({id:l.entity,name:l.name??Ae(e,l.entity),color:Os(l.color,c),step:!!o[l.entity],points:a==="bar"?s[l.entity]:Md(s[l.entity],360,!!o[l.entity])})),this.failed=""}catch(s){this.failed=s?.message??d("Verlauf nicht verf\xFCgbar")}finally{this.loading=!1,this.requestUpdate()}}current(e){let n=H(this.hass,e);return n?Oa(n.state):null}domain(e,n){let a=this.options,r=Math.min(...e),s=Math.max(...e);n&&(r=Math.min(0,r)),(!Number.isFinite(r)||!Number.isFinite(s))&&([r,s]=[0,1]),s-r<1e-9&&([r,s]=[r-1,s+1]);let o=n?0:(s-r)*.1,l=c=>c!==void 0&&c!==""&&Number.isFinite(Number(c));return[l(a.min)?Number(a.min):r-o,l(a.max)?Number(a.max):s+o]}renderLines(e){let n=e-this.hours*He,a=this.options.kind==="area",r=this.series.map(f=>{let v=this.current(f.id),$=v!==null&&this.hours<=72?[...f.points,[e,v]]:f.points;return{...f,pts:$}}),s=r.flatMap(f=>f.pts.map(([,v])=>v));if(!s.length)return u`<div class="calm">${d("Noch keine Daten im Zeitraum")}</div>`;let[o,l]=this.domain(s,!1),c=f=>(Math.min(e,Math.max(n,f))-n)/(e-n)*1e3,h=f=>300-(Math.min(l,Math.max(o,f))-o)/(l-o)*300,p=r.map((f,v)=>{if(!f.pts.length)return m;let $="";f.pts.forEach(([I,S],L)=>{let k=c(I).toFixed(1),N=h(S).toFixed(1);L===0?$+=`M${k},${N}`:f.step?$+=`H${k}V${N}`:$+=`L${k},${N}`}),c(f.pts[f.pts.length-1][0])<1e3&&($+="H1000");let P=c(f.pts[0][0]).toFixed(1),T=a||f.step?$e`<path class="fill" d="${$}V300H${P}Z" fill="url(#g${this.gid}-${v})"></path>`:m;return $e`<defs><linearGradient id="g${this.gid}-${v}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${f.color}" stop-opacity="0.3"></stop>
          <stop offset="1" stop-color="${f.color}" stop-opacity="0"></stop></linearGradient></defs>
        ${T}<path d="${$}" style="stroke:${f.color}"></path>`}),g=this.options.unit??Wa(H(this.hass,this.series[0]?.id)),b=this.options.decimals;return u`<div class="plot">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
          <line class="grid" x1="0" x2="1000" y1="0" y2="0"></line>
          <line class="grid" x1="0" x2="1000" y1="150" y2="150"></line>
          <line class="grid" x1="0" x2="1000" y1="300" y2="300"></line>
          ${p}
        </svg>
        <span class="ylab num" style="top:0;transform:translateY(-130%)">${At(l,b)} ${g}</span>
        <span class="ylab num" style="top:100%;transform:translateY(-130%)">${At(o,b)} ${g}</span>
      </div>
      ${this.renderTimeAxis(n,e)}`}renderTimeAxis(e,n){let a=n-e,r=[1,2,3,6,12,24,48,168].map(p=>p*He),s=r.find(p=>a/p<=5)??r[r.length-1],o=[],l=new Date().getTimezoneOffset()*6e4,c=s>=24*He?Kt(new Date(e+s)).getTime():Math.ceil((e-l)/s)*s+l;for(let p=c;p<n-s*.3;p+=s)p>e+s*.15&&o.push(p);let h=p=>s>=24*He?wi(new Date(p)):Q(new Date(p));return u`<div class="x">
      ${o.map(p=>u`<span style="left:${(p-e)/a*100}%">${h(p)}</span>`)}
    </div>`}renderBars(){let e=this.period,n=e==="day"?24*He:He,a=Date.now(),r=e==="day"?Math.max(1,Math.round(this.hours/24)):this.hours,s=Array.from({length:r},(b,f)=>e==="day"?Kt(new Date(a-(r-1-f)*864e5)).getTime():Math.floor(a/He)*He-(r-1-f)*He),o=(b,f)=>b.points.find(([v])=>Math.abs(v-f)<n/2)?.[1],l=this.series.flatMap(b=>s.map(f=>o(b,f)??0));if(!l.some(b=>b!==0))return u`<div class="calm">${d("Noch keine Statistik im Zeitraum")}</div>`;let[c,h]=this.domain(l,!0),p=r>30?2:r>14?4:8,g=(b,f)=>{let v=new Date(b);return e==="day"?r<=14||f%Math.ceil(r/10)===0?r<=8?wi(v):`${v.getDate()}.`:"":v.getHours()%(r>12?6:3)===0?`${v.getHours()}`:""};return u`<div class="plot" style="--gap:${p}px">
        <div class="bars">
          ${s.map((b,f)=>u`<div class="slot">
              ${this.series.map(v=>{let $=o(v,b),P=$===void 0?0:(Math.max(c,$)-c)/(h-c)*100;return u`<div class="bar ${f===r-1?"dim":""}" style="height:${P}%;background:${v.color}"></div>`})}
            </div>`)}
        </div>
      </div>
      <div class="x slots" style="--gap:${p}px">${s.map((b,f)=>u`<span>${g(b,f)}</span>`)}</div>`}render(){let e=this.options,n=this.ids,a;n.length?this.failed?a=u`<div class="calm">${this.failed}</div>`:this.series.length?a=e.kind==="bar"?this.renderBars():this.renderLines(Date.now()):a=u`<div class="calm">${d("Verlauf wird geladen \u2026")}</div>`:a=u`<div class="calm">${d("Entit\xE4t w\xE4hlen")}</div>`;let r=H(this.hass,n[0]?.entity),s=r?Oa(r.state):null,o=e.value!==!1&&n.length===1&&s!==null&&e.kind!=="bar",l=n.length>1?u`<div class="legend">
            ${this.series.map(h=>{let p=this.current(h.id);return u`<span><i style="background:${h.color}"></i>${h.name}${p!==null&&e.value!==!1?u` <b class="num">${At(p,e.decimals)}</b>`:m}</span>`})}
          </div>`:m,c=o||n.length>1||e.label?u`<div class="head">
            <div>
              ${e.label?u`<div class="label">${e.label}</div>`:m}
              ${o?u`<div class="now display num">${At(s,e.decimals)}<small>${e.unit??Wa(r)}</small></div>`:m}
            </div>
            ${l}
          </div>`:m;return u`<div class="wrap ${e.style==="card"?"card":""}">${c}${a}</div>`}};$i.styles=[V,F`
      .wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
      }
      .head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
      }
      .now {
        font-size: 46px;
        line-height: 1;
        margin-top: 6px;
      }
      .now small {
        font-size: 0.42em;
        color: var(--af-ink-2);
        margin-left: 4px;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 16px;
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-2);
        justify-content: flex-end;
      }
      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        white-space: nowrap;
      }
      .legend i {
        width: 9px;
        height: 9px;
        border-radius: 50%;
      }
      .legend b {
        font-weight: 500;
        color: var(--af-ink);
      }
      .plot {
        position: relative;
        flex: 1;
        min-height: 40px;
      }
      svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      path {
        vector-effect: non-scaling-stroke;
        fill: none;
        stroke-width: 2.5;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      path.fill {
        stroke: none;
      }
      line.grid {
        stroke: var(--af-line);
        vector-effect: non-scaling-stroke;
        stroke-dasharray: 3 5;
      }
      .ylab {
        position: absolute;
        right: 0;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .bars {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        gap: var(--gap, 6px);
      }
      .slot {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 2px;
      }
      .bar {
        flex: 1;
        max-width: 48px;
        border-radius: 6px 6px 2px 2px;
        min-height: 2px;
        transition: height 0.6s var(--af-ease, ease);
      }
      .bar.dim {
        opacity: 0.55;
      }
      .x {
        position: relative;
        height: 18px;
        margin-top: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .x span {
        position: absolute;
        transform: translateX(-50%);
        white-space: nowrap;
      }
      .x.slots {
        display: flex;
        gap: var(--gap, 6px);
      }
      .x.slots span {
        position: static;
        transform: none;
        flex: 1;
        text-align: center;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(17px * var(--af-fs, 1));
        margin: auto 0;
      }
    `],$i.gid=0;var Ha=$i,bn=class extends ne{watched(){return[this.options.entity]}render(){let i=this.options,e=H(this.hass,i.entity),n=i.attribute?e?.attributes[i.attribute]:e?.state,a=parseFloat(String(n)),r=Number(i.min??0),s=Number(i.max??100),o=Number.isFinite(a),l=o?Math.min(100,Math.max(0,(a-r)/(s-r||1)*100)):0,c=(Array.isArray(i.severity)?i.severity:[]).filter(P=>P&&P.from!==""&&Number.isFinite(Number(P.from))).sort((P,T)=>Number(P.from)-Number(T.from)),h=o?c.filter(P=>a>=Number(P.from)).pop():void 0,p=Os(h?.color??i.color??"accent"),g=i.kind==="half",b=g?"M 16 100 A 84 84 0 0 1 184 100":"M 100 16 A 84 84 0 1 1 99.99 16",f=i.unit??(i.attribute?"":Wa(e)),v=i.name??(e?Ae(this.hass,i.entity):""),$=v?u`<div class="name">${i.icon?G(i.icon):m}${v}</div>`:m;return u`<div class="wrap ${g?"half":""} ${i.style==="card"?"card":""}">
      <div class="dial">
        <svg viewBox=${g?"0 0 200 108":"0 0 200 200"} preserveAspectRatio="xMidYMid meet">
          <path class="track" d=${b} pathLength="100" stroke-width="12"></path>
          <path class="val" d=${b} pathLength="100" stroke-width="12" style="stroke:${p};stroke-dasharray:${l} 100;${l?"":"opacity:0"}"></path>
        </svg>
        <div class="center">
          <div class="v display num">${o?At(a,i.decimals):"\u2013"}${f?u`<small>${f}</small>`:m}</div>
          ${g?m:$}
        </div>
      </div>
      ${g?u`<div class="range"><span class="num">${At(r,0)}</span><span class="num">${At(s,0)}</span></div>
            ${$}`:m}
    </div>`}};bn.styles=[V,F`
      :host {
        container-type: size;
      }
      .wrap {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
      .dial {
        position: relative;
        flex: 1;
        width: 100%;
        min-height: 0;
      }
      .dial > svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .dial path {
        fill: none;
        stroke-linecap: round;
      }
      .track {
        stroke: var(--af-line);
      }
      .val {
        transition: stroke-dasharray 0.9s var(--af-ease, ease), stroke 0.6s;
      }
      .center {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1;
      }
      .half .center {
        justify-content: flex-end;
        padding-bottom: 2%;
      }
      .v {
        font-size: min(20cqmin, 110px);
      }
      .half .v {
        font-size: min(24cqmin, 110px);
      }
      .v small {
        font-size: 0.38em;
        color: var(--af-ink-2);
        margin-left: 3px;
      }
      .name {
        margin-top: 10px;
        font-size: min(7cqmin, 22px);
        color: var(--af-ink-2);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .name .ic {
        width: 1.1em;
        height: 1.1em;
        color: var(--af-accent);
      }
      .range {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        padding: 4px 4% 0;
        box-sizing: border-box;
      }
    `];var vn=class extends ne{constructor(){super(...arguments);this.urlTpl=new $t(this);this.capTpl=new $t(this);this.tick=0;this.resolved=new Map;this.failed=!1}shouldUpdate(e){if(e.size===1&&e.has("hass")&&this.options.entity&&!this.options.url){let n=e.get("hass"),a=this.options.entity;return n?.states[a]?.attributes.entity_picture!==this.hass?.states[a]?.attributes.entity_picture}return super.shouldUpdate(e)}connectedCallback(){super.connectedCallback(),this.restartTimer()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}restartTimer(){clearInterval(this.timer);let e=Number(this.options.refresh)||0;e>0&&(this.timer=window.setInterval(()=>{this.tick++,this.requestUpdate()},Math.max(5,e)*1e3))}willUpdate(e){e.has("options")&&this.restartTimer(),this.urlTpl.set(this.hass,this.options.url),this.capTpl.set(this.hass,this.options.caption),this.pick()}async pick(){let e=this.options,n;if(e.url?(n=this.urlTpl.text(e.url)?.trim(),n?.startsWith("\u26A0")&&(n=void 0)):e.entity&&(n=H(this.hass,e.entity)?.attributes.entity_picture),!n){this.wanted=void 0;return}if(n.startsWith("media-source://")){let s=this.resolved.get(n);if(s&&Date.now()-s.at<45*6e4)n=s.url;else if(this.hass){let o=n;try{let l=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:o,expires:3600});this.resolved.set(o,{url:l.url,at:Date.now()}),n=l.url}catch{this.failed=!0,this.requestUpdate();return}}}let a=this.tick&&!n.includes("authSig")?`${n}${n.includes("?")?"&":"?"}_wb=${this.tick}`:n;if(a===this.wanted)return;this.wanted=a;let r=new Image;r.onload=()=>{this.wanted===a&&(this.shown=a,this.failed=!1,this.requestUpdate())},r.onerror=()=>{this.wanted===a&&(this.failed=!this.shown,this.requestUpdate())},r.src=a}render(){let e=this.options,n=e.caption?this.capTpl.text(e.caption):"";this.style.setProperty("--fit",e.fit==="contain"?"contain":"cover"),this.style.setProperty("--r",`${Number(e.radius??28)}px`);let a=!e.url&&!e.entity?d("Bild-Link oder Entit\xE4t w\xE4hlen"):this.failed?d("Bild nicht ladbar"):"";return u`${this.shown?u`<img src=${this.shown} alt="" @error=${r=>r.target.style.visibility="hidden"} />`:u`<div class="ph">${a}</div>`}
    ${n?u`<div class="cap">${n}</div>`:m}`}};vn.styles=[V,F`
      :host {
        position: relative;
        overflow: hidden;
        border-radius: var(--r, 28px);
      }
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: var(--fit, cover);
        animation: img-in 0.8s var(--af-ease, ease) backwards;
      }
      @keyframes img-in {
        from {
          opacity: 0;
        }
      }
      .ph {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--af-surface);
        color: var(--af-ink-3);
        font-size: calc(16px * var(--af-fs, 1));
        text-align: center;
        padding: 16px;
      }
      .cap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 40px 22px 18px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: #fff;
        font-size: calc(18px * var(--af-fs, 1));
      }
    `];B("af-chart",Ha);B("af-gauge",bn);B("af-image",vn);var Pd=10*6e4,Ra=new Map,Ws=()=>new Date().toDateString(),Id=(t,i,e)=>{let n=[i,e.language??"",e.source??""].join("|"),a=Ra.get(n);if(a?.pending)return a.pending;if(a&&a.day===Ws()&&(a.data||Date.now()-a.at<Pd))return Promise.resolve(a.data);let r=t.callWS({type:"ambiframe/daily",kind:i,...e}).catch(()=>null).then(s=>{let o=s??a?.data??null;return Ra.set(n,{day:s?Ws():a?.day??"",at:Date.now(),data:o}),o});return Ra.set(n,{day:a?.day??"",at:a?.at??0,data:a?.data??null,pending:r}),r},Ai=class extends ne{constructor(){super(...arguments);this.data=null;this.loaded=!1}get kind(){return this.options.kind==="quote"?"quote":"article"}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.load()},60*6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.loaded}willUpdate(e){this.hass&&(!this.loaded||e.has("options"))&&(this.loaded=!0,this.load())}async load(){if(!this.hass)return;let e=this.options,n=await Id(this.hass,this.kind,this.kind==="quote"?{source:e.source||void 0}:{language:e.language||void 0});(n||!this.data)&&(this.data=n),this.requestUpdate()}label(e){return this.options.label===!1?m:u`<div class="label">${this.options.label??e}</div>`}render(){let e=this.data;if(!e)return u`<div class="calm">${this.loaded?d("Wird geladen \u2026"):""}</div>`;if(this.kind==="quote"){let a=e.text.length>220?34:e.text.length>120?40:46;return u`<div class="quote" style="--q:${a}px">
        ${this.label(e.period==="week"?d("Zitat der Woche"):d("Zitat des Tages"))}
        <div class="mark display">“</div>
        <div class="q display">${e.text}</div>
        ${e.author?u`<div class="who">${e.author}</div>`:m}
      </div>`}let n=this.options.image===!1?"":e.image;return u`<div class="art">
      <div class="body">
        ${this.label(d("Artikel des Tages \xB7 Wikipedia"))}
        <div class="title display">${e.title}</div>
        <div class="text">${e.text}</div>
      </div>
      ${n?u`<div class="pic" style="background-image:url('${n}')"></div>`:m}
    </div>`}};Ai.properties={...ne.properties,data:{state:!0}},Ai.styles=[V,F`
      :host {
        position: relative;
      }
      .art {
        display: flex;
        gap: 48px;
        height: 100%;
        align-items: stretch;
      }
      .body {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        animation: daily-in 1s var(--af-ease, ease) backwards;
      }
      .title {
        font-size: calc(54px * var(--af-fs, 1));
        line-height: 1.08;
        margin: 14px 0 22px;
        text-wrap: balance;
      }
      .text {
        font-size: calc(22px * var(--af-fs, 1));
        line-height: 1.55;
        color: var(--af-ink-2);
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .pic {
        flex: 0 0 42%;
        border-radius: var(--af-card-radius, 28px);
        background: var(--af-surface) center / cover no-repeat;
        animation: daily-in 1.4s var(--af-ease-soft, ease) backwards;
      }
      .quote {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 6%;
        animation: daily-in 1.2s var(--af-ease, ease) backwards;
      }
      .mark {
        font-size: calc(120px * var(--af-fs, 1));
        line-height: 0.6;
        height: calc(56px * var(--af-fs, 1));
        color: var(--af-accent);
        opacity: 0.55;
      }
      .q {
        font-size: calc(var(--q, 46px) * var(--af-fs, 1));
        line-height: 1.3;
        text-wrap: balance;
        max-width: 1300px;
        margin-top: 18px;
      }
      .who {
        margin-top: 34px;
        font-size: calc(20px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-2);
      }
      .quote .label {
        margin-bottom: 34px;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
      }
      @keyframes daily-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .body,
        .pic,
        .quote {
          animation: none;
        }
      }
    `];B("af-daily",Ai);var De={at:0,homes:{}},Fd=t=>(De.loading||(De.loading=t.callWS({type:"ambiframe/tibber/prices"}).then(i=>{De.homes=Object.fromEntries(Object.entries(i.homes??{}).map(([e,n])=>[e,n.map(a=>({start:new Date(a.start),price:a.price}))])),De.error=void 0}).catch(i=>{De.error=i?.message??String(i)}).finally(()=>{De.at=Date.now(),De.loading=void 0})),De.loading),yn=(t,i=1)=>`${W(t*100,i)} ct`,Ka=t=>t==null?"\u2013":Math.abs(t)>=1e3?`${W(t/1e3,1)} kW`:`${W(t,0)} W`,Bd=t=>{let i=new Map;for(let e of t){let n=new Date(e.start);n.setMinutes(0,0,0);let a=i.get(n.getTime())??[];a.push(e.price),i.set(n.getTime(),a)}return[...i.entries()].sort((e,n)=>e[0]-n[0]).map(([e,n])=>({start:new Date(e),price:n.reduce((a,r)=>a+r,0)/n.length}))},Od=(t,i)=>{let e=Date.now()-36e5,n=t.filter(r=>r.start.getTime()>=e),a=null;for(let r=0;r+i<=n.length;r++){let s=n.slice(r,r+i),o=s.reduce((l,c)=>l+c.price,0)/i;(!a||o<a.avg)&&(a={start:s[0].start,end:new Date(s[i-1].start.getTime()+36e5),avg:o})}return a},wn=class extends J{constructor(){super(...arguments);this.size={w:0,h:0};this.resize=new ResizeObserver(()=>{this.size={w:this.offsetWidth,h:this.offsetHeight},this.requestUpdate()})}connectedCallback(){super.connectedCallback(),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resize.disconnect()}shouldUpdate(){return!0}render(){let e=this.options;this.hass&&Date.now()-De.at>15*6e4&&Fd(this.hass).then(()=>this.requestUpdate());let n=De.homes,a=n[e.home]??Object.values(n)[0]??[],r=u`<div class="label">${e.label??d("Strompreis heute")}</div>`;if(!a.length)return u`${r}<div class="muted" style="margin-top:16px">${De.error??(De.at?d("Keine Preisdaten"):d("L\xE4dt \u2026"))}</div>`;let s=new Date;s.setHours(0,0,0,0);let o=s.getTime()+2*864e5,l=Bd(a.filter(A=>A.start.getTime()>=s.getTime()&&A.start.getTime()<o)),c=l.filter(A=>A.start.getTime()<s.getTime()+864e5),h=e.tomorrow===!1?c:l,p=[...a].reverse().find(A=>A.start.getTime()<=Date.now()),g=e.entity?ce(this.hass,e.entity)??p?.price:p?.price,b=[...c].map(A=>A.price).sort((A,q)=>A-q),f=A=>b[Math.floor((b.length-1)*A)],v=g==null?"":g<=f(1/3)?"good":g>=f(2/3)?"bad":"",$=d({good:"g\xFCnstig",bad:"teuer","":"normal"}[v]),P=b[0],T=b[b.length-1],I=b.reduce((A,q)=>A+q,0)/b.length,S=Od(l,Number(e.window??2)),L=this.size.w||600,k=Math.max(90,Math.min(380,(this.size.h||360)-240)),N=Math.min(...h.map(A=>A.price))*.92,w=Math.max(...h.map(A=>A.price)),y=L/h.length,M=new Date;M.setMinutes(0,0,0);let _=h.map((A,q)=>{let Y=Math.max(3,(A.price-N)/(w-N||1)*(k-22)),ae=A.start.getTime()<M.getTime(),ue=A.start.getTime()===M.getTime(),fe=ue?"var(--af-ink)":A.price<=f(1/3)?"var(--af-good)":A.price>=f(2/3)?"var(--af-accent)":"var(--af-ink-3)",Pe=A.start.getHours()%6===0?$e`<text class="t3" x=${q*y+y/2} y=${k} text-anchor="middle">${A.start.getHours()===0&&q>0?d("morgen"):`${A.start.getHours()}`}</text>`:m;return $e`<rect x=${q*y+1.5} y=${k-20-Y} width=${Math.max(2,y-3)} height=${Y} rx="2" fill=${fe} opacity=${ae?.3:ue?1:.75}></rect>${Pe}`});return u`${r}
      <div class="top">
        <div class="now display num">${g!=null?W(g*100,1):"\u2013"}<small>ct/kWh</small></div>
        <div>
          <div class="level ${v}">${$}</div>
          <div class="facts num">Ø ${yn(I)} · ${yn(P)} – ${yn(T)}</div>
        </div>
      </div>
      ${S?u`<div class="best">${G("charge")}<span>${d("Am g\xFCnstigsten")} <b class="num">${Q(S.start)}–${Q(S.end)}</b> · Ø ${yn(S.avg)}</span></div>`:m}
      <svg width=${L} height=${k} viewBox="0 0 ${L} ${k}">${_}</svg>
      ${e.note?u`<div class="note">${e.note}</div>`:m}`}};wn.styles=[V,F`
      :host {
        display: flex;
        flex-direction: column;
      }
      .top {
        display: flex;
        align-items: flex-end;
        gap: 40px;
        margin-top: 18px;
      }
      .now {
        font-size: 104px;
        line-height: 0.9;
      }
      .now small {
        font-size: 0.32em;
        margin-left: 0.1em;
        color: var(--af-ink-2);
        font-family: var(--af-sans);
        letter-spacing: 0;
      }
      .level {
        font-size: calc(22px * var(--af-fs, 1));
        margin-bottom: 8px;
      }
      .level.good {
        color: var(--af-good);
      }
      .level.bad {
        color: var(--af-alert);
      }
      .facts {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 6px;
      }
      .best {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(19px * var(--af-fs, 1));
        margin-top: 18px;
        color: var(--af-ink-2);
      }
      .best .ic {
        color: var(--af-accent);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .best b {
        color: var(--af-ink);
        font-weight: 500;
      }
      svg {
        display: block;
        margin-top: auto;
        overflow: visible;
      }
      .t3 {
        fill: var(--af-ink-3);
        font: calc(15px * var(--af-fs, 1)) var(--af-sans);
      }
      .note {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
      }
      .muted {
        color: var(--af-ink-3);
        font-size: calc(17px * var(--af-fs, 1));
      }
    `];var kn=class extends J{watched(){let i=this.options;return[...(i.production??[]).map(e=>e.entity),i.consumption?.entity,i.forecast,i.forecast_remaining,i.extra]}render(){let i=this.options,n=(i.production??[]).map(h=>({name:h.name??H(this.hass,h.entity)?.attributes.friendly_name??h.entity,w:ce(this.hass,h.entity)})),a=n.reduce((h,p)=>h+(p.w??0),0),r=i.consumption?.entity?ce(this.hass,i.consumption.entity):null,s=r?Math.min(100,a/r*100):null,o=i.forecast?ce(this.hass,i.forecast):null,l=i.forecast_remaining?ce(this.hass,i.forecast_remaining):null,c=i.extra?H(this.hass,i.extra):void 0;return u`<div class="label">${i.label??d("Energie jetzt")}</div>
      <div class="row">
        <div>
          <div class="k">${G("solar")}${i.production_label??d("Erzeugung")}</div>
          <div class="v display num">${Ka(a)}</div>
          <div class="src num">${n.map(h=>u`${h.name} ${Ka(h.w)}<br />`)}</div>
        </div>
        ${i.consumption?.entity?u`<div>
              <div class="k">${G("home")}${i.consumption.name??d("Verbrauch")}</div>
              <div class="v display num">${Ka(r)}</div>
              ${o!=null?u`<div class="src num">${d("Prognose heute {n} kWh",{n:W(o,1)})}${l!=null?u`<br />${d("noch {n} kWh",{n:W(l,1)})}`:m}</div>`:m}
            </div>`:m}
      </div>
      ${s!=null?u`<div class="bar"><i style="width:${s}%"></i></div>
            <div class="share num">
              <span>${d("{n} % aus eigener Sonne",{n:W(s,0)})}</span>
              <span>${c?`${i.extra_name??c.attributes.friendly_name??""} ${W(be(this.hass,i.extra),0)} ${c.attributes.unit_of_measurement??""}`:""}</span>
            </div>`:m}`}};kn.styles=[V,F`
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-top: 18px;
      }
      .k {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .k .ic {
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .v {
        font-size: 72px;
        line-height: 1;
        margin-top: 10px;
      }
      .src {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
        line-height: 1.5;
      }
      .bar {
        position: relative;
        height: 8px;
        border-radius: 4px;
        background: var(--af-line);
        margin-top: 26px;
        overflow: hidden;
      }
      .bar i {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 4px;
        background: var(--af-accent);
      }
      .share {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
    `];B("af-price",wn);B("af-power",kn);var{I:Wd}=vs,Hs=t=>t;var Rs=()=>document.createComment(""),Vt=(t,i,e)=>{let n=t._$AA.parentNode,a=i===void 0?t._$AB:i._$AA;if(e===void 0){let r=n.insertBefore(Rs(),a),s=n.insertBefore(Rs(),a);e=new Wd(r,s,t,t.options)}else{let r=e._$AB.nextSibling,s=e._$AM,o=s!==t;if(o){let l;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(l=t._$AU)!==s._$AU&&e._$AP(l)}if(r!==a||o){let l=e._$AA;for(;l!==r;){let c=Hs(l).nextSibling;Hs(n).insertBefore(l,a),l=c}}}return e},mt=(t,i,e=t)=>(t._$AI(i,e),t),Hd={},xn=(t,i=Hd)=>t._$AH=i,Ks=t=>t._$AH,Sn=t=>{t._$AR(),t._$AA.remove()};var Re=dt(class extends lt{constructor(){super(...arguments),this.key=m}render(t,i){return this.key=t,i}update(t,[i,e]){return i!==this.key&&(xn(t),this.key=i),e}});var Vs=(t,i,e)=>{let n=new Map;for(let a=i;a<=e;a++)n.set(t[a],a);return n},jt=dt(class extends lt{constructor(t){if(super(t),t.type!==ln.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,i,e){let n;e===void 0?e=i:i!==void 0&&(n=i);let a=[],r=[],s=0;for(let o of t)a[s]=n?n(o,s):s,r[s]=e(o,s),s++;return{values:r,keys:a}}render(t,i,e){return this.dt(t,i,e).values}update(t,[i,e,n]){let a=Ks(t),{values:r,keys:s}=this.dt(i,e,n);if(!Array.isArray(a))return this.ut=s,r;let o=this.ut??=[],l=[],c,h,p=0,g=a.length-1,b=0,f=r.length-1;for(;p<=g&&b<=f;)if(a[p]===null)p++;else if(a[g]===null)g--;else if(o[p]===s[b])l[b]=mt(a[p],r[b]),p++,b++;else if(o[g]===s[f])l[f]=mt(a[g],r[f]),g--,f--;else if(o[p]===s[f])l[f]=mt(a[p],r[f]),Vt(t,l[f+1],a[p]),p++,f--;else if(o[g]===s[b])l[b]=mt(a[g],r[b]),Vt(t,a[p],a[g]),g--,b++;else if(c===void 0&&(c=Vs(s,b,f),h=Vs(o,p,g)),c.has(o[p]))if(c.has(o[g])){let v=h.get(s[b]),$=v!==void 0?a[v]:null;if($===null){let P=Vt(t,a[p]);mt(P,r[b]),l[b]=P}else l[b]=mt($,r[b]),Vt(t,a[p],$),a[v]=null;b++}else Sn(a[g]),g--;else Sn(a[p]),p++;for(;b<=f;){let v=Vt(t,l[f+1]);mt(v,r[b]),l[b++]=v}for(;p<=g;){let v=a[p++];v!==null&&Sn(v)}return this.ut=s,xn(t,l),Ve}});var $n=class extends EventTarget{constructor(){super(...arguments);this.data=new Map;this.subs=new Map}setHass(e){this.hass=e}get(e,n){if(!e)return;let a=`${e}|${n}`;if(!this.subs.has(a)&&this.hass){let r=this.hass.connection.subscribeMessage(s=>{this.data.set(a,s.forecast??[]),this.dispatchEvent(new Event("change"))},{type:"weather/subscribe_forecast",entity_id:e,forecast_type:n}).catch(()=>{});this.subs.set(a,r)}return this.data.get(a)}dispose(){for(let e of this.subs.values())e.then(n=>n?.());this.subs.clear()}},Rd=t=>{for(let i=t.length-1;i>0;i--){let e=Math.floor(Math.random()*(i+1));[t[i],t[e]]=[t[e],t[i]]}return t},Kd=6*36e5,An=class{constructor(i,e){this.getHass=i;this.getConfig=e;this.items=[];this.index=-1;this.loadedAt=0}reload(){this.loading=void 0}async load(){let i=this.getHass(),e=this.getConfig();if(!i||!e)return;let n=[];if(e.folder)try{n=((await i.callWS({type:"media_source/browse_media",media_content_id:e.folder})).children??[]).filter(r=>r.media_class==="image"||/\.(jpe?g|png|webp|avif)$/i.test(r.title)).map(r=>({mediaId:r.media_content_id,credit:""}))}catch{}if(e.icloud)try{let a=await i.callWS({type:"ambiframe/photos/icloud",url:e.icloud});n=[...n,...a.map(r=>({url:r.url,credit:r.credit}))]}catch{}if(e.bing&&(!n.length||e.bing_mix))try{let a=(await i.callWS({type:"ambiframe/photos/bing"})).map(r=>({url:r.url,credit:r.credit}));n=[...n,...a]}catch{}this.items=Rd(n),this.index=-1,this.loadedAt=Date.now()}async next(){let i=this.getConfig()?.icloud?3e5:Kd;if((!this.loading||Date.now()-this.loadedAt>i)&&(this.loading=this.load()),await this.loading,!this.items.length)return null;this.index=(this.index+1)%this.items.length;let e=this.items[this.index],n=this.getConfig()?.credit?e.credit:"";if(e.url)return{url:e.url,credit:n};let a=this.getHass();if(!a||!e.mediaId)return null;try{return{url:(await a.callWS({type:"media_source/resolve_media",media_content_id:e.mediaId,expires:3600})).url,credit:n}}catch{return null}}},Va=new Map,Tn=(t,i,e=2)=>{let n=`${[...i].sort().join(",")}|${e}`,a=Va.get(n);if(a?.pending)return a.pending;if(a&&Date.now()-a.at<10*6e4)return Promise.resolve(a.events);let r=t.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:i},service_data:{duration:{days:e}},return_response:!0}).then(s=>Object.entries(s.response??{}).flatMap(([o,l])=>l.events.map(c=>({...c,calendar:o}))).sort((o,l)=>new Date(o.start).getTime()-new Date(l.start).getTime())).catch(()=>a?.events??[]).then(s=>(Va.set(n,{at:Date.now(),events:s}),s));return Va.set(n,{at:a?.at??0,events:a?.events??[],pending:r}),r},nt=t=>!t.start.includes("T"),En=t=>new Promise(i=>{let e=new Image;e.onload=()=>i(!0),e.onerror=()=>i(!1),e.src=t});var je=t=>ie(t?Wt[t]??t:void 0),Gs=t=>t==="\xB0C"||t==="\xB0F"?"\xB0":t?` ${t}`:"",Us=F`
  .card .bigic {
    font-size: 60px;
    color: var(--af-accent);
    margin-top: 26px;
  }
  .card .big {
    font-size: 128px;
    line-height: 0.9;
    margin-top: 22px;
  }
  .card .cond {
    font-size: 28px;
    margin-top: 16px;
  }
  .card .sub {
    font-size: calc(19px * var(--af-fs, 1));
    color: var(--af-ink-2);
    margin-top: 8px;
    line-height: 1.4;
  }
  .split {
    margin-top: auto;
    padding-top: 22px;
    border-top: 1px solid var(--af-line);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .split .r {
    display: flex;
    justify-content: space-between;
    font-size: calc(20px * var(--af-fs, 1));
  }
  .split .r span:first-child {
    color: var(--af-ink-2);
  }
  .cold {
    color: var(--af-cold);
  }
`,zn=class extends ne{watched(){let i=this.options;return[i.entity,i.sub?.entity,...(i.secondary??[]).map(e=>e.entity)]}formatted(i,e,n=1,a){let r=H(this.hass,i),s=be(this.hass,i,e),o=parseFloat(String(s)),l=a??(e?"":r?.attributes.unit_of_measurement);return Number.isFinite(o)?`${W(o,n)}${Gs(l)}`:String(s??"\u2013")}render(){let i=this.options,e=i.decimals??1,n=this.formatted(i.entity,i.attribute,e,i.unit),a=i.name??Ae(this.hass,i.entity),r=(l,c)=>{let h=ce(this.hass,l,c);return i.cold!=null&&h!=null&&h<Number(i.cold)};if(i.style!=="card")return u`<div class="plain">
        <div class="name">${i.icon?u`${je(i.icon)} `:m}${a}</div>
        <div class="big display num ${r(i.entity,i.attribute)?"cold":""}">${n}</div>
      </div>`;let s=i.sub?.entity?`${this.formatted(i.sub.entity,i.sub.attribute,0,"")} ${i.sub.suffix??""}`:"",o=i.secondary??[];return u`<div class="card" style="width:100%">
      <div class="label">${i.label??""}</div>
      <div class="bigic">${je(i.icon??"thermo")}</div>
      <div class="big display num ${r(i.entity,i.attribute)?"cold":""}">${n}</div>
      <div class="cond">${a}</div>
      ${s?u`<div class="sub num">${s}</div>`:m}
      ${o.length?u`<div class="split">
            ${o.map(l=>u`<div class="r num ${r(l.entity,l.attribute)?"cold":""}">
                <span>${l.name??Ae(this.hass,l.entity)}</span><span>${this.formatted(l.entity,l.attribute,l.decimals??1)}</span>
              </div>`)}
          </div>`:m}
    </div>`}};zn.styles=[V,pt,Us,F`
      .plain .name {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .plain .big {
        font-size: 88px;
        line-height: 1;
        margin-top: 12px;
      }
    `];var _n=class extends ne{rooms(){return this.options.rooms??[]}watched(){return this.rooms().flatMap(i=>[i.temperature,i.humidity,i.climate,...i.windows??[]])}render(){let i=Number(this.options.cold??16),e=Number(this.options.warm??26),n=Number(this.options.columns??3);return u`<div class="grid" style="grid-template-columns:repeat(${n},1fr)">
      ${this.rooms().map(a=>{let r=a.temperature?.startsWith("climate."),s=ce(this.hass,a.temperature,r?"current_temperature":void 0),o=ce(this.hass,a.humidity),l=(a.windows??[]).some(g=>H(this.hass,g)?.state==="on"),c=H(this.hass,a.climate??(r?a.temperature:void 0)),h=l?d("Fenster offen"):"";!h&&c?.attributes.hvac_action==="heating"&&(h=d("heizt auf {temp}\xB0",{temp:W(c.attributes.temperature,0)})),!h&&o!=null&&(h=`${W(o,0)} %`);let p=s==null?"":s<i?"cold":s>e?"warm":"";return u`<div class="${p}">
          <div class="n">${a.name}</div>
          <div class="v display num">${W(s,1)}°</div>
          <div class="s num">${h||u`&nbsp;`}</div>
        </div>`})}
    </div>`}};_n.styles=[V,F`
      .grid {
        display: grid;
        column-gap: 24px;
        row-gap: 64px;
        padding-top: 40px;
      }
      .n {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .v {
        font-size: 88px;
        line-height: 1;
        margin-top: 14px;
      }
      .s {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
      }
      .cold .v,
      .cold .s {
        color: var(--af-cold);
      }
      .warm .v {
        color: var(--af-alert);
      }
    `];var Vd=new Set(["window","door","garage_door","opening"]),jd=(t,i)=>{let e=t.states[i]?.attributes;return Array.isArray(e?.entity_id)||!!e?.is_hue_group},Ln=class extends J{shouldUpdate(){return!0}items(){let i=this.hass;if(!i)return[];let e=this.options,n=[],a=Date.now();if(e.windows==="auto")for(let s of Object.values(i.states))s.entity_id.startsWith("binary_sensor.")&&s.state==="on"&&Vd.has(s.attributes.device_class)&&n.push({icon:s.attributes.device_class==="window"?"window":"door",title:`${s.attributes.friendly_name??s.entity_id} offen`,sub:xi(i,s.entity_id)??""});else if(Array.isArray(e.windows))for(let s of e.windows)H(i,s.entity)?.state==="on"&&n.push({icon:"window",title:d("{name} offen",{name:s.name??Ae(i,s.entity)}),sub:s.room??xi(i,s.entity)??""});for(let s of e.appliances??[]){let o=H(i,s.entity);o&&o.state===(s.on??"on")&&n.push({icon:s.icon??"washer",title:d("{name} l\xE4uft",{name:s.name??Ae(i,s.entity)}),sub:d("seit {time}",{time:ki(a-new Date(o.last_changed).getTime())})})}if(e.lights==="auto"){let s=Object.values(i.states).filter(o=>o.entity_id.startsWith("light.")&&o.state==="on"&&!jd(i,o.entity_id));if(s.length){let o=s.map(l=>l.attributes.friendly_name??l.entity_id);n.push({icon:"bulb",title:s.length===1?d("1 Licht an"):d("{n} Lichter an",{n:s.length}),sub:o.slice(0,3).join(", ")+(o.length>3?" \u2026":"")})}}let r=Ma(i,e.waste,Number(e.waste_days??2));r&&e.waste&&n.push({icon:"bin",title:String(be(i,e.waste,"message")??d("M\xFCll")),sub:d("Abholung {when}",{when:We(r)})});for(let s of e.extra??[])H(i,s.entity)?.state===(s.state??"on")&&n.push({icon:s.icon??"info",title:s.text??Ae(i,s.entity),sub:""});return n.length||n.push({icon:"check",title:e.calm_title??d("Alles ruhig"),sub:e.calm_text??d("Nichts offen, nichts l\xE4uft")}),n.slice(0,Number(e.max??5))}render(){return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??"Gerade"}</div>`}
      ${this.items().map(i=>u`<div class="item">${je(i.icon)}<div><div class="a">${i.title}</div>${i.sub?u`<div class="b">${i.sub}</div>`:m}</div></div>`)}`}};Ln.styles=[V,F`
      .item {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        padding: calc(18px * var(--af-dense, 1)) 0;
        border-top: 1px solid var(--af-line);
      }
      .item .ic {
        font-size: 26px;
        color: var(--af-accent);
        margin-top: 1px;
      }
      .a {
        font-size: calc(21px * var(--af-fs, 1));
      }
      .b {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 5px;
        line-height: 1.4;
      }
      .label {
        margin-bottom: 14px;
        padding-top: 6px;
      }
    `];var Cn=class extends J{watched(){return[this.options.entity]}render(){let i=this.options,e=H(this.hass,i.entity),n=se(e?.attributes.start_time);if(!e||!n)return m;if(i.days!=null&&(le(n)<0||le(n)>Number(i.days)))return m;let a=i.waste??/waste|abfall|muell|müll|trash/i.test(i.entity??""),r=String(e.attributes.message??""),s=`${We(n)}${e.attributes.all_day?"":`, ${d("{time} Uhr",{time:Q(n)})}`}`;if(i.variant==="line")return u`<div class="line">${je(i.icon??(a?"bin":"calendar"))}<span>${r} ${s}</span></div>`;let o=le(n)<=1?d("heute Abend"):d("{day} Abend",{day:We(new Date(n.getTime()-864e5))});return u`<div class="card" style="width:100%">
      <div class="label">${i.label??(a?d("M\xFCll"):d("Termin"))}</div>
      <div class="bigic">${je(i.icon??(a?"bin":"calendar"))}</div>
      <div class="big display" style="font-size:72px;margin-top:28px">${r}</div>
      <div class="cond">${a?d("Abholung"):""} ${s}</div>
      <div class="sub">${n.toLocaleDateString(X(),{weekday:"long",day:"numeric",month:"long"})}</div>
      ${a?u`<div class="split"><div class="r"><span>${d("Rausstellen")}</span><span>${o}</span></div></div>`:m}
    </div>`}};Cn.styles=[V,pt,Us,F`.line { font-size: calc(21px * var(--af-fs, 1)); color: var(--af-ink-2); display:flex; gap:10px; align-items:center } .line .ic { color: var(--af-accent); font-size: 22px }`];var qs=t=>Object.keys(t?.states??{}).filter(i=>i.startsWith("sensor.")&&/waste|abfall|muell|müll|tonne/i.test(i)&&/_(tage|days)$/.test(i)).map(i=>({entity:i,name:i.replace(/^sensor\.(waste_collection_schedule_)?/,"").replace(/_(tage|days)$/,"").split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")})),ja=(t,i)=>{let e=i.bins?.length?i.bins:qs(t),n=new Map;for(let a of e){let r=hn(t,a.entity);if(r==null||r<0||r>Number(i.days??7))continue;let s=a.name||Ae(t,a.entity);n.set(r,[...n.get(r)??[],{name:s,color:a.color}])}return[...n.entries()].sort((a,r)=>a[0]-r[0]).map(([a,r])=>({days:a,bins:r}))},Ga=t=>{if(t<=2)return[d("heute"),d("morgen"),d("\xFCbermorgen")][t];if(t>=7)return d("in {n} Tagen",{n:t});let i=new Date;return i.setDate(i.getDate()+t),d("am {day}",{day:i.toLocaleDateString(X(),{weekday:"long"})})},Zs=t=>(t??[]).flatMap(i=>[i.entity??"",...Zs(i.conditions)]).filter(Boolean),js=520,Gd=["on","run","running","printing","prepare","pause","paused","delayedstart","cleaning"],Ud=(t,i)=>{let e=H(t,i);if(!e||["unknown","unavailable",""].includes(e.state))return null;if(e.attributes.device_class==="timestamp"||/^\d{4}-\d{2}-\d{2}T/.test(e.state)){let r=se(e.state),s=r?r.getTime()-Date.now():0;return s>0?s:null}let n=parseFloat(e.state);if(!Number.isFinite(n)||n<=0)return null;let a=String(e.attributes.unit_of_measurement??"min");return n*(a==="h"?36e5:a==="s"?1e3:6e4)},Dn=class extends J{constructor(){super(...arguments);this.turn=0;this.shown=!1;this.events=[];this.eventsKey="";this.lastParts=new Map;this.leaving=new Map;this.rects=new Map}connectedCallback(){super.connectedCallback(),this.turnTimer=window.setInterval(()=>{(this.options.items??[]).some(e=>e.type==="waste")&&(this.turn++,this.requestUpdate())},6e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.turnTimer)}updated(e){super.updated(e);for(let n of this.renderRoot.querySelectorAll(".part")){let a=n.dataset.key?this.rects.get(n.dataset.key):void 0;if(a&&this.shown&&!n.classList.contains("out")){let s=n.getBoundingClientRect(),o=a.left-s.left,l=a.top-s.top;(Math.abs(o)>1||Math.abs(l)>1)&&n.animate([{transform:`translate(${o}px, ${l}px)`},{transform:"none"}],{duration:700,easing:"cubic-bezier(0.22, 0.8, 0.24, 1)"})}let r=(n.textContent??"").replace(/\s+/g," ").trim();this.shown&&n.dataset.text!==r&&!n.querySelector(".rot")&&!n.classList.contains("out")&&(n.classList.remove("in"),n.offsetWidth,n.classList.add("in")),n.dataset.text=r}this.shown=!0}watched(){return(this.options.items??[]).flatMap(e=>[e.entity,e.remaining,e.progress,e.detail,...e.entities??[],...(e.list??[]).map(n=>n.entity),...Zs(e.show_if),...e.type==="waste"?(e.bins?.length?e.bins:qs(this.hass)).map(n=>n.entity):[]])}agenda(e){let n=e.entities?.length?e.entities:Object.keys(this.hass?.states??{}).filter(b=>b.startsWith("calendar.")).slice(0,3),a=n.join(",");this.hass&&n.length&&Tn(this.hass,n,2).then(b=>{(b!==this.events||a!==this.eventsKey)&&(this.events=b,this.eventsKey=a,this.requestUpdate())});let r=Date.now(),s=r+Number(e.hours??24)*36e5,o=this.events.filter(b=>{let f=se(b.start)?.getTime()??0;return(se(b.end)?.getTime()??0)>r&&f<s&&!(nt(b)&&le(new Date(f))<0)}),l=o.find(b=>!nt(b))??o[0];if(!l)return null;let c=se(l.start),h=se(l.end),p=We(c).replace(/^./,b=>b.toUpperCase()),g=nt(l)?`${p}: ${l.summary}`:c.getTime()<=r?d("Jetzt: {what} bis {time}",{what:l.summary,time:Q(h)}):`${p} ${Q(c)} ${l.summary}`;return u`${je(e.icon??"calendar")}<span>${g}</span>`}willUpdate(e){super.willUpdate?.(e),this.rects.clear();for(let n of this.renderRoot?.querySelectorAll?.(".part")??[])n.dataset.key&&this.rects.set(n.dataset.key,n.getBoundingClientRect())}render(){let n=(this.options.items??[]).map(s=>s.show_if?.length&&!s.show_if.every(o=>et(this.hass,o))?null:s).map(s=>{if(!s)return null;let o=H(this.hass,s.entity);switch(s.type){case"weather":return o?u`${ie(Ce(o.state))}<span class="num">${W(o.attributes.temperature,0)}°</span><span>${Ue(o.state)}</span>`:null;case"calendar":{let l=Ma(this.hass,s.entity,Number(s.days??2));return l?u`<span>${o?.attributes.message??""} ${We(l)}</span>`:null}case"entity":{if(!o)return null;let l=parseFloat(o.state),c=Number.isFinite(l)?`${W(l,1)}${Gs(o.attributes.unit_of_measurement)}`:o.state;return u`${s.icon?je(s.icon):m}<span>${s.name?`${s.name} `:""}${c}</span>`}case"text":return s.text?u`<span>${s.text}</span>`:null;case"agenda":return this.agenda(s);case"status":{if(!o||o.state!==String(s.state??"on"))return null;let l=(s.list??[]).filter(h=>H(this.hass,h.entity)?.state==="on");if(s.list?.length&&!l.length)return null;let c=l.map(h=>h.name??Ae(this.hass,h.entity)).join(", ");return u`${je(s.icon??"info")}<span>${s.text??s.name??Ae(this.hass,s.entity)}${c?` \xB7 ${c}`:""}</span>`}case"device":{let l=s.state?s.state.split(",").map(b=>b.trim()):Gd;if(!o||!l.includes(o.state))return null;let c=ce(this.hass,s.progress),h=Ud(this.hass,s.remaining),p=be(this.hass,s.detail),g=[s.name??Ae(this.hass,s.entity),p&&!["unknown","unavailable"].includes(String(p))?String(p):"",c!=null?`${W(c,0)} %`:"",h!=null?s.show_end?d("fertig {time}",{time:Q(new Date(Date.now()+h))}):d("noch {time}",{time:ki(h)}):"",o.state.startsWith("pause")?d("pausiert"):""].filter(Boolean);return u`${je(s.icon??"washer")}<span>${g.join(" \xB7 ")}</span>`}case"media":{let c=(s.entities?.length?s.entities:s.entity?[s.entity]:[]).map(b=>H(this.hass,b)).find(b=>b?.state==="playing");if(!c)return null;let h=c.attributes,p=[h.media_title,h.media_series_title??h.media_artist].filter(Boolean).join(" \u2013 ");if(!p)return null;let g=`${p}${h.app_name?` (${h.app_name})`:""}`;return u`${je(s.icon??"tv")}<span>${s.name??String(h.friendly_name??"").replace(/\s+/g," ")}: ${g}</span>`}case"waste":{let l=ja(this.hass,s);if(!l.length)return null;let c=l[this.turn%l.length],h=c.bins.map(g=>g.name),p=h.length>1?`${h.slice(0,-1).join(", ")} ${d("und")} ${h.at(-1)}`:h[0];return Re(`${c.days}|${p}`,u`<span class="rot">${je(s.icon??"bin")}${c.bins.some(g=>g.color)?c.bins.map(g=>u`<i class="bin" style="background:${g.color??"var(--af-ink-3)"}"></i>`):m}<span>${p} ${Ga(c.days)}</span></span>`)}default:return null}}),a=Date.now();n.forEach((s,o)=>{let l=String(o);s?(this.lastParts.set(l,s),this.leaving.delete(l)):this.lastParts.has(l)&&this.shown&&!this.leaving.has(l)&&(this.leaving.set(l,{tpl:this.lastParts.get(l),until:a+js}),this.lastParts.delete(l),window.setTimeout(()=>this.requestUpdate(),js+20))});for(let[s,o]of this.leaving)o.until<=a&&this.leaving.delete(s);let r=n.map((s,o)=>{let l=String(o),c=this.leaving.get(l);return s?{key:l,tpl:s,out:!1}:c?{key:l,tpl:c.tpl,out:!0}:null}).filter(s=>!!s);return u`<div class="line">
      ${jt(r,s=>s.key,(s,o)=>u`<span class="part ${s.out?"out":""}" data-key=${s.key}>${o?u`<span class="dot"></span>`:m}${s.tpl}</span>`)}
    </div>`}};Dn.styles=[V,pt,F`
      .line {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
        text-shadow: 0 2px 28px rgba(0, 0, 0, 0.35);
      }
      .ic {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .part {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        white-space: nowrap;
      }
      .part .dot {
        margin-right: 0;
      }
      /* Verschwindendes Teil blendet aus, danach rücken die anderen weich nach */
      .part.out {
        animation: part-out 0.5s var(--af-ease) both;
      }
      @keyframes part-out {
        to {
          opacity: 0;
          filter: blur(2px);
        }
      }
      /* Neues oder geändertes Teil weich einblenden (z. B. „noch 2:09 h“ → „noch 2:08 h“) */
      .part.in {
        animation: part-in 0.9s var(--af-ease) both;
      }
      @keyframes part-in {
        from {
          opacity: 0;
          transform: translateY(5px);
          filter: blur(2px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .part.in {
          animation: none;
        }
      }
      .rot {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        animation: rot-in 0.8s var(--af-ease) backwards;
      }
      @keyframes rot-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      .bin {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex: none;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25);
      }
    `];B("af-value",zn);B("af-rooms",_n);B("af-status",Ln);B("af-calendar",Cn);B("af-infoline",Dn);var Ut=F`
  .label {
    margin-bottom: calc(14px * var(--af-dense, 1));
  }
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: calc(16px * var(--af-dense, 1)) 0;
    border-top: 1px solid var(--af-line);
  }
  .row:first-of-type {
    border-top: 0;
  }
  .row > .ic,
  .badge {
    font-size: 26px;
    color: var(--af-accent);
    flex: none;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .a {
    font-size: calc(21px * var(--af-fs, 1));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .b {
    font-size: calc(16px * var(--af-fs, 1));
    color: var(--af-ink-3);
    margin-top: 4px;
  }
  .end {
    text-align: right;
    flex: 0 1 auto;
    min-width: 0;
    max-width: 62%;
  }
  .val {
    font-size: calc(24px * var(--af-fs, 1));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .good {
    color: var(--af-good);
  }
  .warn {
    color: var(--af-accent);
  }
  .bad {
    color: var(--af-alert);
  }
  .meter {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--af-line);
    overflow: hidden;
  }
  .meter i {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    background: var(--af-accent);
  }
`,Ua=t=>t?.state==="on",Mn=class extends J{watched(){let i=this.options;return[i.battery,i.range,i.charging,i.plugged,i.charger_power,i.time_full,i.location,i.lock,i.limit,i.inside_temp]}render(){let i=this.options,e=this.hass,n=ce(e,i.battery),a=ce(e,i.range),r=ce(e,i.limit),s=H(e,i.location),o=Ua(H(e,i.charging)),l=Ua(H(e,i.plugged)),c=ce(e,i.charger_power),h=se(be(e,i.time_full)),p=H(e,i.lock),g=ce(e,i.inside_temp),b=Pa(e,s?.state),f=H(e,"zone.home");if(s&&s.state!=="home"&&f&&s.attributes.latitude!=null){let $=Ia(f.attributes.latitude,f.attributes.longitude,s.attributes.latitude,s.attributes.longitude);b=`${b} \xB7 ${W($,$<10?1:0)} km`}let v=o?u`${G("charge")}${d("L\xE4dt")}${c?` \xB7 ${W(c,1)} kW`:""}${h?` \xB7 ${d("voll um {time}",{time:Q(h)})}`:""}`:l?u`${G("plug")}${d("Angesteckt")}`:u`${G("car")}${s?.state==="home"?d("Steht zuhause"):d("Unterwegs")}`;return u`<div class="head">
        <div class="label">${i.name??d("Auto")}</div>
        ${s?u`<div class="place">${G("pin")}${b}</div>`:m}
      </div>
      <div class="car">${G("car")}</div>
      <div class="main">
        <div class="pct display num">${W(n,0)}<small>%</small></div>
        ${a!=null?u`<div class="km display num">${W(a,0)}<small>km</small></div>`:m}
      </div>
      <div class="battery">
        <i style="width:${Math.max(0,Math.min(100,n??0))}%"></i>
        ${r!=null&&r<100?u`<b style="left:${r}%"></b>`:m}
      </div>
      <div class="status">${v}</div>
      <div class="facts num">
        ${p?u`<span>${G(p.state==="locked"?"lock":"unlock")}${p.state==="locked"?d("Verriegelt"):d("Offen")}</span>`:m}
        ${g!=null?u`<span>${G("thermo")}${d("Innen {temp}\xB0",{temp:W(g,0)})}</span>`:m}
        ${r!=null?u`<span>${d("Ladelimit {n} %",{n:W(r,0)})}</span>`:m}
      </div>`}};Mn.styles=[V,F`
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .place {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .place .ic {
        color: var(--af-accent);
      }
      .car {
        font-size: 64px;
        color: var(--af-accent);
        margin-top: 22px;
      }
      .main {
        display: flex;
        align-items: baseline;
        gap: 28px;
        margin-top: 14px;
      }
      .pct {
        font-size: 120px;
        line-height: 0.9;
      }
      .pct small,
      .km small {
        font-size: 0.3em;
        color: var(--af-ink-2);
        font-family: var(--af-sans);
        letter-spacing: 0;
        margin-left: 0.1em;
      }
      .km {
        font-size: 56px;
        line-height: 1;
      }
      .battery {
        position: relative;
        height: 10px;
        border-radius: 5px;
        background: var(--af-line);
        margin-top: 26px;
      }
      .battery i {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        border-radius: 5px;
        background: var(--af-accent);
      }
      .battery b {
        position: absolute;
        top: -5px;
        bottom: -5px;
        width: 2px;
        background: var(--af-ink-2);
      }
      .status {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(20px * var(--af-fs, 1));
        margin-top: 22px;
      }
      .status .ic {
        color: var(--af-accent);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .facts {
        display: flex;
        gap: 22px;
        flex-wrap: wrap;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 14px;
      }
      .facts span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
    `];var Pn=class extends J{watched(){return(this.options.persons??[]).flatMap(i=>[i.entity,i.location])}render(){let i=this.hass,e=H(i,"zone.home"),n=this.options.persons??[];return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Familie")}</div>`}
      ${n.map(a=>{let r=H(i,a.entity);if(!r)return m;let s=a.name??r.attributes.friendly_name??a.entity,o=r.attributes.entity_picture,l=H(i,a.location),c=Pa(i,r.state);if(r.state!=="home"){let h=l?.attributes["Sub Locality"]||l?.attributes.Locality;if(h&&r.state==="not_home"&&(c=h),e&&r.attributes.latitude!=null){let p=Ia(e.attributes.latitude,e.attributes.longitude,r.attributes.latitude,r.attributes.longitude);p>=.3&&(c=`${c} \xB7 ${W(p,p<10?1:0)} km`)}}return u`<div class="row">
          <div class="avatar ${r.state==="home"?"home":""}" style=${o?`background-image:url('${o}')`:""}>${o?"":s.slice(0,1)}</div>
          <div class="grow">
            <div class="a">${s}</div>
            <div class="b">${G(r.state==="home"?"home":"pin")}${c}<span class="since">· ${it(r.last_changed)}</span></div>
          </div>
        </div>`})}`}};Pn.styles=[V,Ut,F`
      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        flex: none;
        background: var(--af-surface) center / cover;
        border: 2px solid var(--af-line);
        display: grid;
        place-items: center;
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .avatar.home {
        border-color: var(--af-accent);
      }
      .a {
        font-size: 26px;
      }
      .b {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: calc(17px * var(--af-fs, 1));
        margin-top: 6px;
        color: var(--af-ink-2);
      }
      .b .ic {
        color: var(--af-accent);
      }
      .since {
        color: var(--af-ink-3);
      }
    `];var Ys={cleaning:"Saugt",docked:"In der Station",returning:"F\xE4hrt zur\xFCck",paused:"Pausiert",idle:"Bereit",error:"St\xF6rung"},Gt=(t,i,e)=>{let n=i.split(".")[1];return e.map(a=>`sensor.${n}_${a}`).find(a=>t?.states[a])},qd=(t,i)=>{let e=t?.entities,n=e?.[i]?.device_id,a=n?Object.values(e??{}).filter(s=>s.device_id===n&&s.entity_id.startsWith("image.")).map(s=>s.entity_id):[],r=i.split(".")[1];return a.find(s=>/map|karte/.test(s))??a[0]??[`image.${r}_map_0`,`image.${r}_map`].find(s=>t?.states[s])},In=class extends J{vacuums(){return(this.options.vacuums??[]).map(i=>({...i,battery:i.battery??Gt(this.hass,i.entity,["batterie","battery"]),status:i.status??Gt(this.hass,i.entity,["status"]),room:i.room??Gt(this.hass,i.entity,["aktueller_raum","current_room"]),progress:i.progress??Gt(this.hass,i.entity,["reinigungsfortschritt","cleaning_progress"]),last_end:i.last_end??Gt(this.hass,i.entity,["letztes_reinigungsende","last_clean_end"]),area:i.area??Gt(this.hass,i.entity,["reinigungsbereich","cleaning_area"]),map:this.options.maps===!1||i.map===!1?void 0:i.map??qd(this.hass,i.entity)}))}watched(){return this.vacuums().flatMap(i=>[i.entity,i.battery,i.status,i.room,i.progress,i.last_end,i.area,i.map||void 0]).concat(this.options.map)}render(){let i=this.hass,e=this.vacuums(),n=H(i,this.options.map);return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Saugroboter")}</div>`}
      ${e.map(a=>{let r=H(i,a.entity);if(!r)return m;let s=be(i,a.status),o=r.state==="cleaning"||r.state==="returning",l=Ys[r.state]?d(Ys[r.state]):r.state;r.state==="docked"&&s==="charging"&&(l=d("L\xE4dt in der Station"));let c=ce(i,a.battery),h=be(i,a.room),p=ce(i,a.progress),g=se(be(i,a.last_end)),b=ce(i,a.area),f=a.map?H(i,a.map)?.attributes.entity_picture:void 0,v=o?`${h??""}${p?` \xB7 ${W(p,0)} %`:""}`:g?`${d("Zuletzt fertig {when}",{when:`${We(g)} ${Q(g)}`})}${b?` \xB7 ${W(b,0)} m\xB2`:""}`:"";return u`<div class="row">
          <div class="badge ${o?"active":""}">${G("robot")}</div>
          <div class="grow">
            <div class="a">${a.name??r.attributes.friendly_name??a.entity}</div>
            <div class="b">${l}${v?` \xB7 ${v}`:""}</div>
            ${o&&p!=null?u`<div class="meter progress"><i style="width:${p}%"></i></div>`:m}
          </div>
          ${c!=null?u`<div class="end"><div class="val num">${W(c,0)} %</div><div class="meter"><i style="width:${c}%"></i></div></div>`:m}
          ${f?u`<div class="mini" style="background-image:url('${f}')"></div>`:m}
        </div>`})}
      ${n?.attributes.entity_picture?u`<div class="map"><img src=${n.attributes.entity_picture} alt="Karte" @error=${a=>a.target.style.visibility="hidden"} /></div>`:m}`}};In.styles=[V,Ut,F`
      .badge {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--af-surface);
        border: 1px solid var(--af-line);
      }
      .badge.active {
        background: var(--af-accent-soft);
        border-color: var(--af-accent);
      }
      .end .val {
        font-size: calc(20px * var(--af-fs, 1));
      }
      .end .meter {
        width: 64px;
        margin: 8px 0 0 auto;
      }
      .progress {
        margin-top: 10px;
      }
      .map {
        margin-top: 18px;
        border-radius: 22px;
        overflow: hidden;
        background: var(--af-surface);
        border: 1px solid var(--af-line);
        height: 220px;
        display: grid;
        place-items: center;
      }
      /* Kleine Karte rechts in der Zeile – Roborock liefert sie mit durchsichtigem Hintergrund */
      .mini {
        flex: none;
        width: calc(150px * var(--af-fs, 1));
        height: calc(96px * var(--af-fs, 1));
        border-radius: 14px;
        background: var(--af-surface) center / contain no-repeat;
        border: 1px solid var(--af-line);
      }
      .map img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    `];var Qs={bio:"#8a6a3d",gelb:"#e3c03a",papier:"#4a86c5",grau:"#8d9196",rest:"#8d9196"},Fn=class extends J{watched(){return(this.options.bins??[]).flatMap(i=>[i.entity,i.out])}render(){let i=this.options,e=Number(i.highlight??1),n=(i.bins??[]).map(a=>({...a,days:hn(this.hass,a.entity)})).filter(a=>a.days!=null&&a.days>=0).sort((a,r)=>(a.days??99)-(r.days??99)).slice(0,Number(i.max??4));return u`${i.label===!1?m:u`<div class="label">${i.label??d("M\xFCllabfuhr")}</div>`}
      ${n.map(a=>{let r=a.days,s=new Date;s.setDate(s.getDate()+r);let o=a.color??Qs[Object.keys(Qs).find(c=>a.name.toLowerCase().includes(c))??"rest"],l=r<=2?We(s):d("in {n} Tagen",{n:W(r,0)});return u`<div class="row ${r<=e?"soon":""}">
          <div class="bin" style="background:${o}"></div>
          <div class="grow">
            <div class="a">${a.name}</div>
            ${a.out&&this.hass?.states[a.out]?.state==="on"?u`<div class="b" style="color:var(--af-good)">${d("Steht drau\xDFen")} ✓</div>`:r===1?u`<div class="b">${d("Heute Abend rausstellen")}</div>`:r===0?u`<div class="b">${d("Wird heute abgeholt")}</div>`:m}
          </div>
          <div class="end"><div class="val">${l}</div><div class="b num">${s.toLocaleDateString(X(),{weekday:"short",day:"numeric",month:"numeric"})}</div></div>
        </div>`})}`}};Fn.styles=[V,Ut,F`
      .bin {
        width: 18px;
        height: 22px;
        border-radius: 4px 4px 6px 6px;
        flex: none;
        position: relative;
      }
      .bin::before {
        content: "";
        position: absolute;
        left: -3px;
        right: -3px;
        top: -5px;
        height: 4px;
        border-radius: 2px;
        background: inherit;
      }
      .soon .a {
        color: var(--af-accent);
      }
      .end .val {
        font-size: calc(20px * var(--af-fs, 1));
      }
      .end .b {
        margin-top: 2px;
      }
    `];var Zd=new Set(["motion","occupancy","presence"]),Yd=/\s*(bewegungsmelder|bewegungssensor|bewegung|anwesenheitssensor|belegung|occupancy|presence|motion)\s*\d*/gi,Bn=class extends J{shouldUpdate(){return!0}sensors(){let i=this.hass;if(!i)return[];let e=this.options,n=new Set(e.exclude??[]);return(Array.isArray(e.entities)?e.entities:Object.keys(i.states).filter(r=>r.startsWith("binary_sensor.")&&Zd.has(i.states[r].attributes.device_class))).filter(r=>!n.has(r)).map(r=>i.states[r]).filter(Boolean)}render(){let i=this.hass,e=this.options,n=Number(e.within??120)*6e4,a=this.sensors().map(o=>({name:i&&xi(i,o.entity_id)||Ae(i,o.entity_id).replace(Yd,"").trim()||o.entity_id,on:o.state==="on",at:new Date(o.last_changed)})).filter(o=>o.on||Date.now()-o.at.getTime()<n).sort((o,l)=>Number(l.on)-Number(o.on)||l.at.getTime()-o.at.getTime()),r=new Set,s=a.filter(o=>r.has(o.name)?!1:(r.add(o.name),!0)).slice(0,Number(e.max??3));return e.variant==="list"?u`${e.label===!1?m:u`<div class="label">${e.label??d("Bewegung")}</div>`}
        ${s.length?s.map(o=>u`<div class="row">${G("motion")}<div class="grow"><div class="a">${o.name}</div></div><div class="end b ${o.on?"now":""}">${o.on?d("jetzt"):it(o.at)}</div></div>`):u`<div class="b">${d("Keine Bewegung in letzter Zeit")}</div>`}`:s.length?u`<div class="line">
      ${G("motion")}
      ${s.map((o,l)=>u`${l?u`<span>·</span>`:m}<b>${o.name}</b><span class=${o.on?"now":""}>${o.on?d("jetzt"):it(o.at)}</span>`)}
    </div>`:e.hide_empty===!1?u`<div class="line">${G("motion")}${d("Ruhig")}</div>`:m}};Bn.styles=[V,Ut,F`
      .line {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .line .ic {
        color: var(--af-accent);
        font-size: calc(18px * var(--af-fs, 1));
      }
      .line b {
        color: var(--af-ink-2);
        font-weight: 400;
      }
      .now {
        color: var(--af-accent);
      }
    `];var Nn=(t,i)=>{for(let[n,a,r]of i)if(t<=n)return[a,r];let e=i[i.length-1];return[e[1],e[2]]},Qd=(t,i)=>{switch(t.format){case"aqi":return Nn(i,[[50,"gut","good"],[100,"m\xE4\xDFig","warn"],[150,"empfindliche Gruppen","bad"],[1/0,"ungesund","bad"]]);case"uv":return Nn(i,[[2,"niedrig","good"],[5,"m\xE4\xDFig","warn"],[7,"hoch","bad"],[1/0,"sehr hoch","bad"]]);case"lux":return Nn(i,[[10,"dunkel",""],[300,"d\xE4mmrig",""],[5e3,"hell",""],[1/0,"sonnig","warn"]]);case"humidity":return Nn(i,[[34,"trocken","warn"],[60,"gut","good"],[65,"feucht",""],[1/0,"zu feucht","warn"]]);default:return["",""]}},On=class extends J{watched(){return(this.options.rows??[]).map(i=>i.entity)}render(){let i=this.options.rows??[];return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Umwelt")}</div>`}
      ${i.map(e=>{let n=H(this.hass,e.entity);if(!n)return m;let a=be(this.hass,e.entity,e.attribute),r,s=["",""];if(e.format==="rain"||e.format==="onoff"||n.entity_id.startsWith("binary_sensor.")){let o=a==="on";r=o?e.on_text??(e.format==="rain"?d("Regnet"):d("An")):e.off_text??(e.format==="rain"?d("Trocken"):d("Aus")),s=o?["",e.format==="rain"?"warn":""]:["",""]}else{let o=parseFloat(String(a)),l=e.unit??(e.attribute?"":n.attributes.unit_of_measurement??"");r=Number.isFinite(o)?`${W(o,e.decimals??(Math.abs(o)>=100?0:1))}${l?` ${l}`:""}`:String(a??"\u2013"),Number.isFinite(o)&&(s=Qd(e,o))}return u`<div class="row">
          ${G(e.icon??"info")}
          <div class="grow"><div class="a">${e.name??n.attributes.friendly_name??e.entity}</div></div>
          <div class="end"><div class="val num ${s[0]?"":s[1]}">${r}</div>${s[0]?u`<div class="q ${s[1]}">${d(s[0])}</div>`:m}</div>
        </div>`})}`}};On.styles=[V,Ut,F`
      .q {
        font-size: calc(16px * var(--af-fs, 1));
        margin-top: 4px;
      }
    `];var Jd={minor:["Hinweis","warn"],moderate:["Warnung","warn"],severe:["Unwetter","bad"],extreme:["Extrem","bad"]},Wn=class extends J{watched(){return this.options.entities??[]}render(){let i=(this.options.entities??[]).map(e=>H(this.hass,e)).filter(e=>Ua(e));return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Warnungen")}</div>`}
      ${i.length?i.map(e=>{let n=e.attributes,[a,r]=Jd[String(n.severity??"").toLowerCase()]??["Warnung","warn"],s=d(a),o=se(n.expires);return u`<div class="row">
              <span class=${r}>${G("warning")}</span>
              <div class="grow">
                <div class="a">${n.headline??n.friendly_name}</div>
                <div class="b ${r}">${s}${o?` \xB7 ${d("bis {when}",{when:`${We(o)} ${Q(o)}`})}`:""}</div>
                ${n.description?u`<div class="desc">${n.description}</div>`:m}
              </div>
            </div>`}):u`<div class="calm">${G("check")}${this.options.calm_text??d("Keine Warnungen")}</div>`}`}};Wn.styles=[V,Ut,F`
      .row {
        align-items: flex-start;
      }
      .desc {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
        line-height: 1.45;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .a {
        white-space: normal;
      }
      .calm {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .calm .ic {
        color: var(--af-good);
        font-size: calc(24px * var(--af-fs, 1));
      }
    `];B("af-car",Mn);B("af-persons",Pn);B("af-vacuum",In);B("af-waste",Fn);B("af-activity",Bn);B("af-list",On);B("af-warnings",Wn);var Js,Xd=(t,i)=>customElements.get("ha-camera-stream")?Promise.resolve(!0):window.loadCardHelpers?(Js??=(async()=>{try{let n=await(await window.loadCardHelpers()).createCardElement({type:"picture-entity",entity:i,camera_view:"live",show_name:!1,show_state:!1});n.hass=t,n.style.cssText="position:fixed;left:-9999px;width:10px;height:10px;opacity:0;pointer-events:none",document.body.appendChild(n);let a=await Promise.race([customElements.whenDefined("ha-camera-stream").then(()=>!0),new Promise(r=>setTimeout(()=>r(!1),8e3))]);return n.remove(),a}catch{return!1}})(),Js):Promise.resolve(!1),Xs=t=>{let i=t.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([\w-]{11})/);if(i)return{kind:"youtube",id:i[1]};let e=t.match(/youtube\.com\/channel\/(UC[\w-]+)/);return e?{kind:"youtube",id:`live_stream?channel=${e[1]}`}:/\.m3u8(\?|$)/i.test(t)?{kind:"hls"}:/mjpe?g|video\.cgi|faststream|nphMotionJpeg/i.test(t)?{kind:"mjpeg"}:{kind:"image"}},qa=t=>{let i=Xs(t);return i.kind==="image"?[t]:i.kind==="youtube"&&i.id&&!i.id.startsWith("live_stream")?[`https://i.ytimg.com/vi/${i.id}/maxresdefault_live.jpg`,`https://i.ytimg.com/vi/${i.id}/hqdefault_live.jpg`]:null},Kn=[["https://www.youtube.com/watch?v=w3zcgctSvFA","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)"],["https://www.youtube.com/watch?v=OmyDLXvaus4","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)"],["https://www.youtube.com/watch?v=JwEoLt8NXU8","Hamburg \u2013 Stadt (Livebild von YouTube)"],["https://www.youtube.com/watch?v=SZp1Q6LX7Wk","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)"],["https://www.youtube.com/watch?v=EH6GNSEvmQE","Renesse \u2013 Strand (Livebild von YouTube)"],["https://webcam.datacreate.de/hasenhorn/webcam-hasenhorn.jpg","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1615294555/original.jpg","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1279200146/original.jpg","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1595461776/original.jpg","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)"],["https://www.foto-webcam.eu/webcam/zugspitze/current/1200.jpg","Zugspitze (Bild, alle 10 min)"],["https://www.foto-webcam.eu/webcam/wendelstein-ost/current/1200.jpg","Wendelstein Ost (Bild, alle 10 min)"],["https://www.foto-webcam.eu/webcam/herzogstand/current/1200.jpg","Herzogstand \u2013 Kochel- und Walchensee (Bild)"],["https://www.foto-webcam.eu/webcam/muenchen/current/1200.jpg","M\xFCnchen \u2013 Panorama (Bild)"]],Ti=class extends re{constructor(){super(...arguments);this.mode="live";this.osd="";this.refresh=0;this.native=!1;this.broken=!1;this.onBroken=()=>{this.isConnected&&(this.broken=!0,this.src=void 0,clearTimeout(this.retryTimer),this.retryTimer=window.setTimeout(()=>this.broken=!1,2e4))};this.onLoaded=()=>{this.broken&&(this.broken=!1)}}willUpdate(e){if(e.has("entity")&&(this.src=void 0),e.has("url")&&(this.shown=void 0,this.url&&qa(this.url)&&this.loadWebcamImage()),e.has("refresh")||e.has("url")){clearInterval(this.refreshTimer);let n=this.url?this.refresh||60:this.refresh;n>0&&(this.refreshTimer=window.setInterval(()=>{this.url?this.loadWebcamImage():(this.src=void 0,this.requestUpdate())},n*1e3))}this.hass&&this.entity&&!this.url&&this.mode==="live"&&!this.native&&Xd(this.hass,this.entity).then(n=>{n&&!this.native&&(this.native=!0)})}loadWebcamImage(e=this.url?qa(this.url):null){let n=this.url;if(!n||!e?.length)return;let[a,...r]=e,s=`${a}${a.includes("?")?"&":"?"}_=${Math.floor(Date.now()/1e3)}`,o=new Image;o.onload=()=>{this.url===n&&(this.shown=s)},o.onerror=()=>{this.url===n&&r.length&&this.loadWebcamImage(r)},o.src=s}renderWebcam(e){if(qa(e))return this.shown?u`<img src=${this.shown} alt="" />`:u`<div class="ph"><span>${this.osd}</span></div>`;let n=Xs(e);switch(n.kind){case"youtube":{let a=n.id.startsWith("live_stream"),r="autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3",s=a?`https://www.youtube-nocookie.com/embed/${n.id}&${r}`:`https://www.youtube-nocookie.com/embed/${n.id}?${r}&loop=1&playlist=${n.id}`;return u`<iframe src=${s} allow="autoplay; encrypted-media" title="Webcam"></iframe>`}case"hls":return u`<video src=${e} autoplay muted playsinline loop></video>`;case"mjpeg":return this.broken?this.renderBroken():u`<img src=${e} alt="" @error=${this.onBroken} />`;default:return this.shown?u`<img src=${this.shown} alt="" />`:u`<div class="ph"><span>${this.osd}</span></div>`}}renderBroken(){return u`<div class="ph"><span>${this.osd}</span></div>`}render(){if(this.url)return this.renderWebcam(this.url);let e=H(this.hass,this.entity);if(this.broken)return this.renderBroken();if(e&&this.entity?.startsWith("image.")){let a=e.attributes.entity_picture;return a?u`<img src=${a} alt="" style="object-fit:contain;background:var(--af-surface)" @error=${this.onBroken} @load=${this.onLoaded} />`:u`<div class="ph"><span>${this.osd}</span></div>`}if(!e)return u`<div class="ph"><span>${this.osd}</span></div>`;if(this.mode==="live"&&this.native)return u`<ha-camera-stream .hass=${this.hass} .stateObj=${e} .muted=${!0} .controls=${!1} .fitMode=${"cover"} allow-exoplayer></ha-camera-stream>`;let n=e.attributes.access_token;if(!this.src&&n){let a=this.mode==="live"?"camera_proxy_stream":"camera_proxy";this.src=`/api/${a}/${this.entity}?token=${n}${this.mode==="snapshot"?`&t=${Date.now()}`:""}`}return this.src?u`<img src=${this.src} alt="" @error=${this.onBroken} @load=${this.onLoaded} />`:u`<div class="ph"><span>${this.osd}</span></div>`}disconnectedCallback(){super.disconnectedCallback(),this.renderRoot.querySelector("img")?.setAttribute("src","data:,"),clearInterval(this.refreshTimer),clearTimeout(this.retryTimer),this.src=void 0}};Ti.properties={hass:{attribute:!1},entity:{},url:{},mode:{},osd:{},refresh:{type:Number},native:{state:!0},shown:{state:!0},broken:{state:!0}},Ti.styles=F`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #000;
    }
    img,
    ha-camera-stream,
    .ph {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    ha-camera-stream {
      --video-max-height: 100%;
    }
    /* YouTube füllt die Fläche wie object-fit: cover */
    :host {
      container-type: size;
    }
    iframe {
      position: absolute;
      left: 50%;
      top: 50%;
      width: max(100cqw, 177.78cqh);
      height: max(100cqh, 56.25cqw);
      transform: translate(-50%, -50%);
      border: 0;
      pointer-events: none;
    }
    video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ph {
      background: radial-gradient(ellipse 34% 50% at 50% 58%, rgba(190, 205, 195, 0.16), transparent 70%),
        linear-gradient(180deg, #1d2522 0%, #131916 55%, #0c100e 100%);
    }
    .ph::before {
      content: "";
      position: absolute;
      left: 41%;
      top: 22%;
      width: 18%;
      height: 62%;
      border-radius: 8px 8px 0 0;
      background: linear-gradient(180deg, #2e3934, #1c2420);
      box-shadow: 0 0 0 12px rgba(255, 255, 255, 0.025), inset 0 0 40px rgba(0, 0, 0, 0.45);
    }
    .ph span {
      position: absolute;
      right: 24px;
      top: 22px;
      font: 500 13px/1 ui-monospace, Menlo, monospace;
      color: rgba(255, 255, 255, 0.55);
      letter-spacing: 0.06em;
    }
  `;var Hn=class extends ne{shouldUpdate(){return!0}render(){let i=this.options.radius??28,e=this.options,n=e.text?this.hass?.states[e.text]:void 0,a=n?.state,r=n&&a&&a!=="unknown"&&a!=="unavailable"?this.hass?.formatEntityState?.(n)??a:void 0;return u`<af-camera-view style="--af-radius:${i}px" .hass=${this.hass} .entity=${e.url?void 0:e.entity} .url=${e.url}
        .mode=${e.mode??"live"} .refresh=${Number(e.refresh??0)} .osd=${e.url?"WEBCAM":"KAMERA"}></af-camera-view>
      ${e.title||r?u`<div class="cap">${e.title?u`<b>${e.title}</b>`:""}${r?u`<span>${r}</span>`:""}</div>`:""}`}};Hn.styles=[V,F`
      :host {
        position: relative;
      }
      af-camera-view {
        border-radius: var(--af-radius, 28px);
      }
      .cap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 40px 22px 18px;
        border-radius: 0 0 var(--af-radius, 28px) var(--af-radius, 28px);
        background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
        color: #fff;
      }
      .cap b {
        display: block;
        font-size: calc(19px * var(--af-fs, 1));
        font-weight: 500;
      }
      .cap span {
        display: block;
        font-size: calc(16px * var(--af-fs, 1));
        opacity: 0.8;
        margin-top: 4px;
      }
    `];var Rn=class extends ne{constructor(){super(...arguments);this.cardKey="";this.error=""}shouldUpdate(){return!0}updated(){let e=JSON.stringify(this.options.card??null);e!==this.cardKey&&(this.cardKey=e,this.createCard()),this.card&&this.hass&&(this.card.hass=this.hass)}async createCard(){let e=this.options.card;if(this.card=void 0,this.error="",!e?.type)this.error=d("Keine Karte konfiguriert");else if(!window.loadCardHelpers)this.error=d("Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)",{type:String(e.type)});else try{let n=await window.loadCardHelpers();this.card=await n.createCardElement(e),this.card.hass=this.hass}catch(n){this.error=d("Karte nicht ladbar: {error}",{error:String(n)})}this.requestUpdate()}render(){return this.card??(this.error?u`<div class="hint">${this.error}</div>`:m)}};Rn.styles=[V,F`
      :host {
        --ha-card-background: var(--af-surface);
        --card-background-color: var(--af-surface);
        --ha-card-border-color: var(--af-line);
        --ha-card-border-radius: 28px;
        --ha-card-box-shadow: none;
        --primary-text-color: var(--af-ink);
        --secondary-text-color: var(--af-ink-2);
        --primary-color: var(--af-accent);
        --state-icon-color: var(--af-accent);
        --divider-color: var(--af-line);
        overflow: hidden;
      }
      .hint {
        color: var(--af-ink-3);
        font-size: calc(16px * var(--af-fs, 1));
      }
    `];B("af-camera-view",Ti);B("af-camera",Hn);B("af-card",Rn);var qt=F`
  .label {
    margin-bottom: 14px;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: calc(14px * var(--af-dense, 1)) 0;
    border-top: 1px solid var(--af-line);
  }
  .row > .ic {
    font-size: 26px;
    color: var(--af-accent);
    flex: none;
  }
  .grow {
    flex: 1;
    min-width: 0;
  }
  .a {
    font-size: calc(21px * var(--af-fs, 1));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .b {
    font-size: calc(16px * var(--af-fs, 1));
    color: var(--af-ink-3);
    margin-top: 4px;
  }
  .end {
    text-align: right;
    flex: none;
    font-size: calc(19px * var(--af-fs, 1));
  }
  .meter {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: var(--af-line);
    overflow: hidden;
    margin-top: 10px;
  }
  .meter i {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    background: var(--af-accent);
  }
  .calm {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: calc(20px * var(--af-fs, 1));
    color: var(--af-ink-2);
  }
  .calm .ic {
    color: var(--af-good);
    font-size: calc(24px * var(--af-fs, 1));
  }
`,Vn=class extends J{constructor(){super(...arguments);this.events=[];this.loadedAt=0;this.loading=!1}shouldUpdate(){return!0}async load(){let e=this.options.calendars??[];if(!(!this.hass||!e.length||this.loading)){this.loading=!0;try{let n=await this.hass.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:e},service_data:{duration:{days:Number(this.options.days??7)}},return_response:!0});this.events=Object.entries(n.response??{}).flatMap(([a,r])=>r.events.map(s=>({...s,calendar:a}))).sort((a,r)=>(se(a.start)?.getTime()??0)-(se(r.start)?.getTime()??0))}catch{this.events=[]}finally{this.loadedAt=Date.now(),this.loading=!1,this.requestUpdate()}}}render(){Date.now()-this.loadedAt>10*6e4&&this.load();let e=this.options,n=Date.now(),a=this.events.filter(o=>(se(o.end)?.getTime()??0)>n).slice(0,Number(e.max??6)),r=e.label===!1?m:u`<div class="label">${e.label??d("Termine")}</div>`;if(!a.length)return u`${r}<div class="calm">${G("check")}${this.loadedAt?e.empty_text??d("Keine Termine in den n\xE4chsten Tagen"):d("L\xE4dt \u2026")}</div>`;let s="";return u`${r}
      ${a.map(o=>{let l=se(o.start),c=!o.start.includes("T"),h=l.toDateString(),p=h!==s?u`<div class="day">${le(l)<=2?We(l):l.toLocaleDateString(X(),{weekday:"long",day:"numeric",month:"long"})}</div>`:m;return s=h,u`${p}
          <div class="row">
            <div class="time num ${c?"allday":""}">${c?d("ganztags"):Q(l)}</div>
            <div class="grow">
              <div class="a">${o.summary}</div>
              ${e.location!==!1&&o.location?u`<div class="b">${o.location.split(",")[0]}</div>`:m}
            </div>
          </div>`})}`}};Vn.styles=[V,qt,F`
      .day {
        font-size: calc(16px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--af-accent);
        margin: 18px 0 2px;
      }
      .day:first-of-type {
        margin-top: 0;
      }
      /* Breit genug für „ganztags“, auch bei großer Schrift */
      .time {
        width: calc(92px * var(--af-fs, 1));
        flex: none;
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        white-space: nowrap;
      }
      .time.allday {
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.02em;
      }
    `];var ec=t=>{let i=Number(t.attributes.media_position);if(!Number.isFinite(i))return;let e=t.attributes.media_position_updated_at;return t.state==="playing"&&e&&(i+=(Date.now()-new Date(e).getTime())/1e3),i},eo=t=>{let i=Math.max(0,Math.round(t)),e=Math.floor(i/3600),n=Math.floor(i%3600/60),a=String(i%60).padStart(2,"0");return e?`${e}:${String(n).padStart(2,"0")}:${a}`:`${n}:${a}`},jn=class extends J{disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.secTimer)}shouldUpdate(){return!0}tickEverySecond(i){i&&!this.secTimer&&(this.secTimer=window.setInterval(()=>this.requestUpdate(),1e3)),!i&&this.secTimer&&(clearInterval(this.secTimer),this.secTimer=void 0)}renderFull(i){let e=i.attributes,n=e.entity_picture,a=Number(e.media_duration),r=ec(i),s=a>0&&r!=null,o=s?Math.min(1,Math.max(0,r/a)):0,l=[e.friendly_name,i.state==="paused"?d("pausiert"):""].filter(Boolean).join(" \xB7 ");return u`<div class="full">
      <div class="art">
        ${n?u`<div class="glow" style="background-image:url('${n}')"></div>`:m}
        <div class="pic" style=${n?`background-image:url('${n}')`:""}>${n?"":G("mdi:music")}</div>
      </div>
      <div class="text">
        ${this.options.label===!1?m:u`<div class="label">${this.options.label??d("L\xE4uft gerade")}${l?` \xB7 ${l}`:""}</div>`}
        <div class="title display">${e.media_title??e.app_name??d("Musik")}</div>
        ${e.media_artist?u`<div class="artist">${e.media_artist}</div>`:m}
        ${e.media_album_name?u`<div class="album">${e.media_album_name}</div>`:m}
        ${s?u`<div class="prog">
              <div class="bar"><i style="transform:scaleX(${o})"></i></div>
              <div class="times num"><span>${eo(r)}</span><span>−${eo(a-r)}</span></div>
            </div>`:m}
      </div>
    </div>`}render(){let i=this.options,e=(i.entities??[]).map(o=>H(this.hass,o)).filter(o=>!!o),n=e.find(o=>o.state==="playing")??(i.show_paused?e.find(o=>o.state==="paused"):void 0);if(this.tickEverySecond(i.variant==="full"&&n?.state==="playing"),n&&i.variant==="full")return this.renderFull(n);let a=i.label===!1?m:u`<div class="label">${i.label??d("L\xE4uft gerade")}</div>`;if(!n)return u`${a}<div class="calm">${G("check")}${i.empty_text??d("Gerade l\xE4uft nichts")}</div>`;let r=n.attributes,s=r.entity_picture;return u`${a}
      <div class="wrap">
        <div class="cover" style=${s?`background-image:url('${s}')`:""}>${s?"":G("mdi:music")}</div>
        <div class="grow">
          <div class="title display">${r.media_title??r.app_name??d("Musik")}</div>
          ${r.media_artist?u`<div class="artist">${r.media_artist}</div>`:m}
          <div class="where"><i></i>${r.friendly_name}${n.state==="paused"?` \xB7 ${d("pausiert")}`:""}${r.source?` \xB7 ${r.source}`:""}</div>
        </div>
      </div>`}};jn.styles=[V,qt,F`
      .wrap {
        display: flex;
        gap: 22px;
        align-items: center;
      }
      .cover {
        width: 120px;
        height: 120px;
        border-radius: 18px;
        flex: none;
        background: var(--af-surface) center / cover;
        border: 1px solid var(--af-line);
        display: grid;
        place-items: center;
        font-size: 44px;
        color: var(--af-accent);
      }
      .title {
        font-size: 30px;
        line-height: 1.15;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artist {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 6px;
      }
      .where {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 10px;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .where i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--af-accent);
      }

      /* Ganze Seite: großes Cover in der Mitte, darunter Titel und Fortschritt – alles zentriert */
      .full {
        height: 100%;
        container-type: size;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 36px;
      }
      .full .art {
        position: relative;
        /* so groß wie möglich und immer quadratisch – im Querformat nach Höhe, im Hochformat nach Breite */
        width: min(64cqh, 88cqw);
        aspect-ratio: 1;
        flex: none;
      }
      .full .glow,
      .full .pic {
        position: absolute;
        inset: 0;
        border-radius: 26px;
        background: var(--af-surface) center / cover;
      }
      .full .glow {
        filter: blur(56px) saturate(1.4);
        opacity: 0.6;
        transform: scale(1.08) translateY(22px);
      }
      .full .pic {
        border: 1px solid var(--af-line);
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        display: grid;
        place-items: center;
        font-size: 120px;
        color: var(--af-accent);
        animation: cover-in 1.2s var(--af-ease, ease) backwards;
      }
      @keyframes cover-in {
        from {
          opacity: 0;
          transform: scale(0.97);
        }
      }
      .full .text {
        width: min(100%, 900px);
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .full .title {
        font-size: calc(46px * var(--af-fs, 1));
        line-height: 1.1;
        margin-top: 10px;
        -webkit-line-clamp: 2;
        text-wrap: balance;
      }
      .full .artist {
        font-size: calc(24px * var(--af-fs, 1));
        margin-top: 8px;
      }
      .full .album {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 4px;
      }
      .full .prog {
        margin-top: 24px;
        width: min(100%, 560px);
      }
      .full .bar {
        height: 4px;
        border-radius: 2px;
        background: var(--af-line);
        overflow: hidden;
      }
      .full .bar i {
        display: block;
        height: 100%;
        background: var(--af-accent);
        transform-origin: left;
        transition: transform 1s linear;
      }
      .full .times {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `];var Gn=class extends J{watched(){return(this.options.items??[]).flatMap(i=>[i.running,i.power,i.progress,i.end,i.cost])}render(){let i=this.options,e=this.hass,n=(i.items??[]).filter(r=>H(e,r.running)?.state==="on"),a=i.label===!1?m:u`<div class="label">${i.label??d("Ger\xE4te")}</div>`;return n.length?u`${a}
      ${n.map(r=>{let s=se(H(e,r.running)?.last_changed),o=ce(e,r.power),l=ce(e,r.progress),c=se(be(e,r.end)),h=ce(e,r.cost),p=[s?d("seit {time}",{time:Q(s)}):"",c?d("fertig {time}",{time:Q(c)}):"",o!=null?`${W(o,0)} W`:"",h!=null&&h>0?`${W(h,2)} \u20AC`:""].filter(Boolean);return u`<div class="row">
          ${G(r.icon??"washer")}
          <div class="grow">
            <div class="a">${r.name}</div>
            <div class="b num">${p.join(" \xB7 ")}</div>
            ${l!=null?u`<div class="meter"><i style="width:${l}%"></i></div>`:m}
          </div>
          ${l!=null?u`<div class="end num">${W(l,0)} %</div>`:m}
        </div>`})}`:u`${a}<div class="calm">${G("check")}${i.empty_text??d("Nichts l\xE4uft gerade")}</div>`}};Gn.styles=[V,qt];var Un=class extends J{watched(){return(this.options.covers??[]).map(i=>i.entity)}render(){let i=this.options,e=(i.covers??[]).map(l=>({...l,s:H(this.hass,l.entity)})).filter(l=>l.s),n=l=>{let c=l.s,h=typeof c.attributes.current_position=="number"?c.attributes.current_position:c.state==="closed"||c.state==="closing"?0:c.state==="open"||c.state==="opening"?100:null;return h!=null&&l.invert&&(h=100-h),h},a=l=>l.s.attributes.device_class==="awning",r=e.filter(l=>!a(l)),s=r.filter(l=>(n(l)??100)<10).length,o=i.only_open?e.filter(l=>(n(l)??100)>=10):e;return u`${i.label===!1?m:u`<div class="label">${i.label??d("Rolll\xE4den")}</div>`}
      ${r.length?u`<div class="sum display num">${s}<small>${d("von {n} geschlossen",{n:r.length})}</small></div>`:m}
      ${o.map(l=>{let c=n(l),h=a(l),p=c!=null&&c<=2,g=h?c!=null&&c>2?"awning_out":"awning":p?"shutter":"shutter_open",b=c==null?"\u2013":h?c<=2?d("eingefahren"):c>=98?d("ausgefahren"):`${W(c,0)} %`:c>=98?d("offen"):c<=2?d("zu"):`${W(c,0)} %`;return u`<div class="row ${p?"shut":""}">
          ${G(g)}
          <div class="grow">
            <div class="a">${l.name??l.s.attributes.friendly_name}</div>
            ${c!=null&&c>2&&c<98?u`<div class="pos"><i style="width:${h?c:100-c}%"></i></div>`:m}
          </div>
          <div class="end num">${b}</div>
        </div>`})}`}};Un.styles=[V,qt,F`
      .sum {
        font-size: 44px;
        line-height: 1;
        margin-bottom: 14px;
      }
      .sum small {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
        font-family: var(--af-sans);
        letter-spacing: 0;
        margin-left: 8px;
      }
      .row {
        padding: calc(10px * var(--af-dense, 1)) 0;
      }
      .a {
        font-size: calc(18px * var(--af-fs, 1));
      }
      .row > .ic {
        font-size: 28px;
        color: var(--af-ink-2);
      }
      .row.shut > .ic {
        color: var(--af-accent);
      }
      .pos {
        height: 3px;
        border-radius: 2px;
        background: var(--af-line);
        margin-top: 7px;
        overflow: hidden;
      }
      .pos i {
        display: block;
        height: 100%;
        background: var(--af-ink-3);
      }
      .end {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-2);
        min-width: calc(74px * var(--af-fs, 1));
        white-space: nowrap;
      }
    `];var qn=class extends J{watched(){let{devices:i,low:e}=Fa(this.hass,this.options);return[...i.flatMap(n=>[n.id,n.id.replace(/_level$/,"_state")]),...e.map(n=>n.id)]}row(i,e){let n=Number(this.options.threshold??21),a=i.level!=null&&i.level<n;return u`<div class="row ${e?"lowrow":""}">
      ${G(e||i.kind==="other"?"battery":i.kind)}
      <div class="grow">
        <div class="a">${i.name}${i.charging?G("bolt","bolt"):m}</div>
        ${i.level!=null&&!e?u`<div class="meter"><i class=${i.charging?"charging":a?"low":""} style="width:${Math.max(2,Math.min(100,i.level))}%"></i></div>`:m}
      </div>
      <div class="end pct num">${i.level!=null?`${W(i.level,0)} %`:d("schwach")}</div>
    </div>`}render(){let i=this.options,{devices:e,low:n}=Fa(this.hass,i),a=i.part??"both",r=Number(i.max??(a==="low"?7:5)),s=a==="low"?d("Batterie wechseln"):d("Akkus"),o=i.label===!1?m:u`<div class="label">${i.label??s}</div>`,l=n.length?u`${a==="both"?u`<div class="sub">${d("Batterie wechseln")}</div>`:m}
          ${n.slice(0,r).map(c=>this.row(c,!0))}
          ${n.length>r?u`<div class="more">${d("+ {n} weitere",{n:n.length-r})}</div>`:m}`:u`<div class="calm">${G("check")}${a==="low"?d("Alle Batterien in Ordnung"):d("Zubeh\xF6r: alle Batterien in Ordnung")}</div>`;return u`${o} ${a!=="low"?e.map(c=>this.row(c,!1)):m} ${a!=="devices"?l:m}`}};qn.styles=[V,qt,F`
      /* Für den Blick aus ein paar Metern: große Zeilen */
      .row {
        padding: calc(18px * var(--af-dense, 1)) 0;
        gap: 20px;
      }
      .row > .ic {
        font-size: 34px;
        color: var(--af-ink-2);
      }
      /* Neutral, nur Laden (grün) und Schwach (Warnfarbe) fallen auf – die Akzentfarbe kann rot sein */
      .meter i {
        background: var(--af-ink-2);
      }
      .a {
        font-size: calc(27px * var(--af-fs, 1));
      }
      .pct {
        font-size: calc(30px * var(--af-fs, 1));
        min-width: 3.2em;
      }
      .meter {
        height: 8px;
        border-radius: 4px;
        margin-top: 12px;
      }
      .row .bolt {
        font-size: 0.8em;
        color: var(--af-good);
        margin-left: 6px;
        vertical-align: -0.08em;
      }
      .meter i.low {
        background: var(--af-alert);
      }
      .meter i.charging {
        background: var(--af-good);
      }
      .sub {
        margin: 18px 0 4px;
        font-size: calc(14px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .lowrow > .ic,
      .lowrow .pct {
        color: var(--af-alert);
      }
      .calm {
        margin-top: 14px;
      }
      .more {
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        padding-top: 8px;
      }
    `];var Zn=class extends J{constructor(){super(...arguments);this.rows=[];this.loaded=!1;this.key=""}willUpdate(){let e=`${new Date().toDateString()}|${Math.floor(Date.now()/6e5)}|${JSON.stringify([this.options.devices,this.options.exclude])}`;this.hass&&e!==this.key&&(this.key=e,this.load())}async devices(){let e=(this.options.devices??[]).filter(n=>n.entity);if(e.length)return e.map(n=>({id:n.entity,name:n.name}));try{return((await this.hass.callWS({type:"energy/get_prefs"})).device_consumption??[]).map(a=>({id:a.stat_consumption,name:a.name}))}catch{return[]}}async load(){let e=new Set(this.options.exclude??[]),n=(await this.devices()).filter(r=>!e.has(r.id)),a=await Promise.all(n.map(async r=>{try{let s=await this.hass.callWS({type:"recorder/statistic_during_period",statistic_id:r.id,calendar:{period:"day"},types:["change"]}),o=typeof s.change=="number"?s.change:NaN,l=String(H(this.hass,r.id)?.attributes.unit_of_measurement??"kWh");if(l==="Wh"&&(o/=1e3),l==="MWh"&&(o*=1e3),!Number.isFinite(o)||o<=0)return null;let c=r.name||String(H(this.hass,r.id)?.attributes.friendly_name??r.id).replace(/\s*(energie|energy|energieverbrauch|verbrauch)$/i,"");return{id:r.id,name:c,kwh:o}}catch{return null}}));this.rows=a.filter(r=>!!r).sort((r,s)=>s.kwh-r.kwh),this.loaded=!0,this.requestUpdate()}render(){let e=this.options,n=this.rows.slice(0,Number(e.count??3)),a=n[0]?.kwh??1,r=e.label===!1?m:u`<div class="label">${e.label??d("Gr\xF6\xDFte Verbraucher heute")}</div>`;return n.length?u`${r}
      ${n.map((s,o)=>u`<div class="row">
          <div class="rank num">${o+1}</div>
          <div class="grow">
            <div class="a">${s.name}</div>
            <div class="meter"><i style="width:${Math.max(3,s.kwh/a*100)}%"></i></div>
          </div>
          <div class="end pct num">${W(s.kwh,s.kwh<10?2:1)} kWh</div>
        </div>`)}`:u`${r}<div class="calm">${G("plug")}${this.loaded?d("Heute noch kein Verbrauch gemessen"):d("Wird berechnet \u2026")}</div>`}};Zn.styles=[V,qt,F`
      .row > .rank {
        width: 1.4em;
        flex: none;
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .pct {
        font-size: calc(22px * var(--af-fs, 1));
      }
      .meter i {
        background: var(--af-accent);
      }
    `];B("af-agenda",Vn);B("af-consumers",Zn);B("af-batteries",qn);B("af-media",jn);B("af-appliances",Gn);B("af-covers",Un);var ro=qr(Za(),1);var Ei=(t=new Date)=>new Date(t.getFullYear(),t.getMonth(),t.getDate()),tc=t=>t.toLocaleDateString(X(),{weekday:"short"}).replace(".",""),zi=class extends J{constructor(){super(...arguments);this.times=[];this.history=[];this.loadedFor="";this.loadedAt=0}watched(){return[this.options.visits]}willUpdate(){let e=H(this.hass,this.options.visits)?.state??"";this.hass&&this.options.visits&&(e!==this.loadedFor||Date.now()-this.loadedAt>30*6e4)&&(this.loadedFor=e,this.loadedAt=Date.now(),this.load())}async load(){let e=this.hass,n=this.options.visits,a=Number(this.options.days??7);try{let s=(await e.callWS({type:"history/history_during_period",start_time:Ei().toISOString(),entity_ids:[n],minimal_response:!0,no_attributes:!0}))[n]??[],o=[],l=NaN;for(let c of s){let h=parseFloat(c.s),p=(c.lc??c.lu??0)*1e3;Number.isFinite(h)&&Number.isFinite(l)&&h>l&&p&&o.push(new Date(p)),Number.isFinite(h)&&(l=h)}this.times=o}catch{}try{let r=Ei(new Date(Date.now()-(a-1)*864e5)),s=await e.callWS({type:"recorder/statistics_during_period",statistic_ids:[n],period:"day",start_time:r.toISOString(),types:["change"]});this.history=(s[n]??[]).map(o=>({day:new Date(o.start),count:Math.max(0,Math.round(o.change??0))}))}catch{this.history=[]}}render(){let e=this.options,n=H(this.hass,e.visits),a=n?Math.round(parseFloat(n.state)):NaN,r=this.times.at(-1),s=p=>Ei(p).getTime()===Ei().getTime(),o=this.history.map(p=>s(p.day)&&Number.isFinite(a)?{...p,count:a}:p),l=Math.max(1,...o.map(p=>p.count)),c=o.filter(p=>!s(p.day)),h=c.length?c.reduce((p,g)=>p+g.count,0)/c.length:NaN;return u`<div class="wrap">
      <div class="left">
        <div class="head">${G(e.icon??"cat")}<span>${e.name??d("Haustier")}</span></div>
        <div class="big display num">${Number.isFinite(a)?a:"\u2013"}<span style="font-size:.4em">×</span></div>
        <div class="unit">${e.unit??d("Besuche heute")}</div>
        ${r?u`<div class="last">${d("zuletzt {time}",{time:Q(r)})} · ${it(r)}</div>`:m}
        ${this.times.length?u`<div class="times">${this.times.map(p=>u`<span class="num">${Q(p)}</span>`)}</div>`:m}
      </div>
      ${o.length>1?u`<div class="chart">
            <div class="label">${e.label??d("Letzte Tage")}</div>
            <div class="bars">
              ${o.map(p=>u`<div class="bar ${s(p.day)?"today":""}">
                  <b class="num">${p.count}</b>
                  <i style="height:${Math.max(4,p.count/l*150)}px"></i>
                  <span>${tc(p.day)}</span>
                </div>`)}
            </div>
            ${Number.isFinite(h)?u`<div class="avg">${d("\xD8 {n} pro Tag",{n:W(h,1)})}</div>`:m}
          </div>`:m}
    </div>`}};zi.properties={...ne.properties,times:{state:!0},history:{state:!0}},zi.styles=[V,F`
      :host {
        container-type: size;
      }
      .wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 40px 72px;
        align-items: flex-end;
        height: 100%;
        align-content: center;
      }
      .left {
        min-width: 340px;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 30px;
      }
      .head .ic {
        font-size: 40px;
        color: var(--af-accent);
      }
      .big {
        font-size: min(46cqh, 240px);
        line-height: 0.9;
        margin-top: 18px;
      }
      .unit {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 10px;
      }
      .last {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
      }
      .times {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 22px;
      }
      .times span {
        padding: 6px 12px;
        border-radius: 999px;
        background: var(--af-surface);
        border: 1px solid var(--af-line);
        font-size: calc(17px * var(--af-fs, 1));
      }
      .chart {
        flex: 1;
        min-width: 360px;
      }
      .bars {
        display: flex;
        align-items: flex-end;
        gap: 14px;
        height: 220px;
        margin-top: 16px;
      }
      .bar {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        height: 100%;
      }
      .bar i {
        width: 100%;
        max-width: 48px;
        border-radius: 10px 10px 4px 4px;
        background: var(--af-accent-soft);
        border: 1px solid var(--af-line);
      }
      .bar.today i {
        background: var(--af-accent);
      }
      .bar b {
        font-weight: 500;
        font-size: calc(18px * var(--af-fs, 1));
      }
      .bar span {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .avg {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 14px;
      }
    `];var _i=class extends J{constructor(){super(...arguments);this.values={};this.key=""}get offset(){return new Date().getHours()<Number(this.options.switch_hour??18)?-1:0}willUpdate(){let e=`${Ei().getTime()}|${this.offset}|${Math.floor(Date.now()/9e5)}|${JSON.stringify(this.options.groups??[])}`;this.hass&&e!==this.key&&(this.key=e,this.load())}async stat(e,n){try{let r=(await this.hass.callWS({type:"recorder/statistic_during_period",statistic_id:e,calendar:{period:"day",offset:this.offset},types:[n]}))[n];return typeof r=="number"&&Number.isFinite(r)?r:null}catch{return null}}async load(){let e=(this.options.groups??[]).flatMap(a=>a.rows??[]),n=await Promise.all(e.map(async a=>{let r=await this.stat(a.entity,a.type??"change"),s=a.cost?await this.stat(a.cost,"change"):r!=null&&a.price!=null?r*a.price:null;return[`${a.entity}|${a.cost??""}`,{value:r,cost:s}]}));this.values=Object.fromEntries(n)}unitOf(e){return e.unit??H(this.hass,e.entity)?.attributes.unit_of_measurement??""}render(){let e=this.options,n=new Date(Date.now()+this.offset*864e5),a=this.offset<0?d("Gestern, {date}",{date:n.toLocaleDateString(X(),{weekday:"long",day:"numeric",month:"long"})}):d("Heute bis jetzt"),r=(e.groups??[]).map(s=>({...s,rows:(s.rows??[]).filter(o=>{let l=this.values[`${o.entity}|${o.cost??""}`];return l&&l.value!=null&&!(o.hide_zero&&Math.abs(l.value)<.05)})})).filter(s=>s.rows.length);return u`<div class="label">${e.label??d("Energie-Bilanz")} · ${a}</div>
      ${r.length?u`<div class="groups">
            ${r.map(s=>u`<div class="group">
                <div class="label">${s.label}</div>
                ${s.rows.map(o=>{let l=this.values[`${o.entity}|${o.cost??""}`],c=this.unitOf(o),h=l.value,p=o.decimals??(Math.abs(h)>=100?0:Math.abs(h)>=10?1:2);return u`<div class="row">
                    ${G(o.icon??"charge")}
                    <span class="name">${o.name}</span>
                    <span class="val display num"
                      >${W(h,p)}<small>${c}</small>${l.cost!=null&&l.cost>.004?u`<span class="cost">${W(l.cost,2)} €</span>`:m}</span
                    >
                  </div>`})}
              </div>`)}
          </div>`:u`<div class="calm">${d("Noch keine Werte f\xFCr diesen Tag.")}</div>`}`}};_i.properties={...ne.properties,values:{state:!0}},_i.styles=[V,F`
      .groups {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 22px;
        margin-top: 22px;
      }
      .group {
        background: var(--af-card, var(--af-surface));
        border: var(--af-card-border, 1px solid var(--af-line));
        border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
        border-radius: var(--af-card-radius, 32px);
        backdrop-filter: var(--af-card-filter, none);
        -webkit-backdrop-filter: var(--af-card-filter, none);
        box-shadow: var(--af-card-shadow, none);
        padding: 26px 30px;
      }
      .row {
        display: flex;
        align-items: baseline;
        gap: 14px;
        margin-top: 18px;
      }
      .row .ic {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-accent);
        align-self: center;
      }
      .name {
        flex: 1;
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .val {
        font-size: 34px;
        text-align: right;
      }
      .val small {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-left: 4px;
      }
      .cost {
        display: block;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 2px;
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
        margin-top: 14px;
      }
    `];var ao=t=>t.replace(/([\\;,:"])/g,"\\$1"),Yn=class extends ne{render(){let i=this.options,e=i.label===!1?m:u`<div class="label">${i.label??d("G\xE4ste-WLAN")}</div>`;if(i.image)return u`<div class="wrap">
        ${e}
        <div class="tile"><div class="qrimg" role="img" aria-label="QR-Code" style=${`background-image:url("${String(i.image).replace(/"/g,"%22")}")`}></div></div>
        ${i.ssid?u`<div class="ssid display">${i.ssid}</div>`:m}
        <div class="hint">${i.hint??d("Handy-Kamera auf den Code halten")}</div>
      </div>`;if(!i.ssid)return u`<div class="wrap">${e}<div class="hint">${d("Netzname und Passwort im Editor eintragen.")}</div></div>`;let n=i.encryption??(i.password?"WPA":"nopass"),a=`WIFI:T:${n};S:${ao(String(i.ssid))};${n==="nopass"?"":`P:${ao(String(i.password??""))};`}${i.hidden?"H:true;":""};`,r=(0,ro.default)(0,"M");r.addData(a,"Byte"),r.make();let s=r.getModuleCount(),o="";for(let l=0;l<s;l++)for(let c=0;c<s;c++)r.isDark(l,c)&&(o+=`M${c} ${l}h1v1h-1z`);return u`<div class="wrap">
      ${e}
      <div class="tile">${$e`<svg viewBox="0 0 ${s} ${s}" shape-rendering="crispEdges" aria-label="QR-Code"><path d=${o} fill="#000"/></svg>`}</div>
      <div class="ssid display">${i.ssid}</div>
      ${i.show_password&&i.password?u`<div class="pass num">${d("Passwort")}: ${i.password}</div>`:m}
      <div class="hint">${i.hint??d("Handy-Kamera auf den Code halten")}</div>
    </div>`}};Yn.styles=[V,F`
      :host {
        container-type: size;
      }
      .wrap {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 22px;
        text-align: center;
      }
      .tile {
        background: #fff;
        border-radius: 28px;
        padding: 22px;
        box-shadow: var(--af-shadow);
      }
      svg,
      .qrimg {
        display: block;
        width: min(62cqh, 80cqw);
        height: min(62cqh, 80cqw);
      }
      /* Fertiges QR-Bild als Hintergrund: bleibt quadratisch, egal wie der Kasten ausfällt */
      .qrimg {
        background: center / contain no-repeat;
        image-rendering: pixelated;
      }
      .ssid {
        font-size: 30px;
      }
      .hint {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .pass {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
    `];var ic=(t,i)=>{let e=H(t,i),n=e?parseFloat(e.state):NaN;if(!e||!Number.isFinite(n))return null;let a=String(e.attributes.unit_of_measurement??"min");return a==="h"?n*60:a==="s"?n/60:a==="d"?n*1440:n},nc=t=>t>=60?`${Math.floor(t/60)}:${String(Math.round(t%60)).padStart(2,"0")} h`:`${Math.round(t)} min`,Qn=class extends J{watched(){let i=this.options;return[i.title,i.progress,i.remaining,i.end,i.layer,i.layers,i.status,...(i.temps??[]).map(e=>e.entity)]}render(){let i=this.options,e=l=>{let c=H(this.hass,l);return c&&c.state!=="unknown"&&c.state!=="unavailable"?c.state:void 0},n=parseFloat(e(i.progress)??""),a=ic(this.hass,i.remaining),r=e(i.end),s=r?new Date(r):null,o=[];a!=null&&a>0&&o.push([d("Noch"),nc(a)]),s&&!isNaN(s.getTime())&&o.push([d("Fertig um"),Q(s)]),e(i.layer)&&e(i.layers)&&o.push([d("Schicht"),`${e(i.layer)} / ${e(i.layers)}`]);for(let l of i.temps??[]){let c=parseFloat(e(l.entity)??"");Number.isFinite(c)&&o.push([l.name,`${W(c,0)}\xB0`])}return e(i.status)&&o.push([d("Status"),String(e(i.status))]),u`<div class="label">${i.label??d("Auftrag")}</div>
      ${e(i.title)?u`<div class="title display">${e(i.title)}</div>`:m}
      ${Number.isFinite(n)?u`<div class="pct display num">${W(n,0)}<small>%</small></div>
            <div class="bar"><i style="width:${Math.max(0,Math.min(100,n))}%"></i></div>`:m}
      <div class="rows">${o.map(([l,c])=>u`<div class="r"><span>${l}</span><span class="num">${c}</span></div>`)}</div>`}};Qn.styles=[V,F`
      .title {
        font-size: 32px;
        line-height: 1.12;
        margin-top: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .pct {
        font-size: 96px;
        line-height: 1;
        margin-top: 22px;
      }
      .pct small {
        font-size: 0.4em;
        color: var(--af-ink-3);
      }
      .bar {
        height: 8px;
        border-radius: 4px;
        background: var(--af-line);
        overflow: hidden;
        margin-top: 16px;
      }
      .bar i {
        display: block;
        height: 100%;
        background: var(--af-accent);
        border-radius: 4px;
        transition: width 1s var(--af-ease, ease);
      }
      .rows {
        margin-top: 22px;
        display: grid;
        gap: 12px;
      }
      .r {
        display: flex;
        justify-content: space-between;
        font-size: calc(19px * var(--af-fs, 1));
      }
      .r span:first-child {
        color: var(--af-ink-3);
      }
    `];B("af-pet",zi);B("af-balance",_i);B("af-qr",Yn);B("af-job",Qn);var Ja=[["tagesschau","tagesschau (DE)"],["ntv","n-tv (DE)"],["spiegel","SPIEGEL (DE)"],["zdf","ZDFheute (DE)"],["dlf","Deutschlandfunk (DE)"],["zeit","ZEIT ONLINE (DE)"],["faz","FAZ (DE)"],["sz","S\xFCddeutsche Zeitung (DE)"],["heise","heise online (DE)"],["orf","ORF (AT)"],["srf","SRF News (CH)"],["bbc","BBC News (UK)"],["bbc_world","BBC World (UK)"],["guardian","The Guardian (UK)"],["sky","Sky News (UK)"],["npr","NPR (US)"],["nyt","New York Times (US)"],["abc_us","ABC News (US)"],["cbc","CBC News (CA)"],["abc_au","ABC News (AU)"],["aljazeera","Al Jazeera (EN)"],["dw_en","DW (EN)"],["nos","NOS (NL)"],["nunl","NU.nl (NL)"],["vrtnws","VRT NWS (BE)"],["lemonde","Le Monde (FR)"],["franceinfo","franceinfo (FR)"],["rfi","RFI (FR)"],["lefigaro","Le Figaro (FR)"]],so={de:["tagesschau","ntv","spiegel"],en:["bbc","guardian","npr"],nl:["nos","nunl","vrtnws"],fr:["lemonde","franceinfo","rfi"]},Zt=()=>so[Qi()]??so.en,Qa=10*6e4,Ya=new Map,ac=(t,i)=>{let e=i.join("|"),n=Ya.get(e);if(n?.pending)return n.pending;if(n&&Date.now()-n.at<Qa)return Promise.resolve(n.items);let a=t.callWS({type:"ambiframe/news",feeds:i,limit:30}).then(r=>r.items??[]).catch(()=>n?.items??[]).then(r=>(Ya.set(e,{at:r.length?Date.now():Date.now()-Qa+6e4,items:r}),r));return Ya.set(e,{at:n?.at??0,items:n?.items??[],pending:a}),a},rc=t=>new Promise(i=>{if(!t)return i();let e=new Image;e.onload=e.onerror=()=>i(),e.src=t}),Li=class extends ne{constructor(){super(...arguments);this.items=[];this.idx=0;this.prevImage="";this.feedsKey=""}get feeds(){let e=(Array.isArray(this.options.feeds)?this.options.feeds:[]).map(n=>typeof n=="string"?n:n?.value).filter(n=>!!n);return e.length?e:Zt()}get heroItems(){let e=this.items.filter(n=>n.image);return(e.length?e:this.items).slice(0,Number(this.options.max??8))}connectedCallback(){super.connectedCallback(),this.refreshTimer=window.setInterval(()=>{this.load()},Qa+5e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.refreshTimer),clearTimeout(this.rotateTimer)}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.items.length}willUpdate(e){let n=this.feeds.join("|");this.hass&&(n!==this.feedsKey||e.has("options"))&&(this.feedsKey=n,this.load())}async load(){if(!this.hass)return;let e=await ac(this.hass,this.feeds);!e.length&&this.items.length||(this.items=e,this.idx>=this.heroItems.length&&(this.idx=0),(this.options.variant??"hero")==="hero"&&this.schedule())}schedule(){clearTimeout(this.rotateTimer);let e=Math.max(5,Number(this.options.interval??14));this.rotateTimer=window.setTimeout(()=>{this.advance()},e*1e3)}async advance(){let e=this.heroItems;if(e.length>1){let n=(this.idx+1)%e.length;await rc(e[n].image),this.prevImage=e[this.idx]?.image??"",this.idx=n}this.schedule()}updated(){let e=this.renderRoot.querySelector(".track");if(e){let n=e.scrollWidth/2,a=Number(this.options.speed??45);n>0&&(e.style.animationDuration=`${Math.round(n/a)}s`)}}render(){let e=this.options.variant??"hero";if(!this.items.length)return u`<div class="calm">${this.options.empty_text??d("Nachrichten werden geladen \u2026")}</div>`;if(e==="ticker"){if(this.ctx?.ticker===!1)return m;let o=this.items.slice(0,Number(this.options.max??12)).map(l=>u`<span><b>${l.source}</b>${l.title}</span><span class="sep">•</span>`);return u`<div class="tick"><div class="track">${o}${o}</div></div>`}if(e==="list"){let s=this.items.slice(0,Number(this.options.max??4));return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Nachrichten")}</div>`}
        <div class="rows">
          ${s.map(o=>u`<div class="row">
              ${o.image?u`<div class="thumb" style="background-image:url('${o.image}')"></div>`:m}
              <div>
                <div class="rt">${o.title}</div>
                <div class="rm">${o.source}${o.published?` \xB7 ${it(o.published)}`:""}</div>
              </div>
            </div>`)}
        </div>`}let n=this.heroItems,a=n[this.idx]??n[0],r=Math.max(5,Number(this.options.interval??14));return u`<div class="hero">
      ${this.prevImage?u`<div class="img" style="background-image:url('${this.prevImage}')"></div>`:m}
      ${a.image?Re(a.image,u`<div class="img cur" style="background-image:url('${a.image}');--t:${r+2}s"></div>`):m}
      <div class="grad"></div>
      ${Re(a.title,u`<div class="txt">
          <div class="meta"><b>${a.source}</b>${a.published?` \xB7 ${it(a.published)}`:""}</div>
          <div class="title display">${a.title}</div>
          ${a.summary?u`<div class="sum">${a.summary}</div>`:m}
        </div>`)}
      ${n.length>1?u`<div class="dots">${n.map((s,o)=>u`<i class=${o===this.idx?"on":""}></i>`)}</div>`:m}
    </div>`}};Li.properties={...ne.properties,items:{state:!0},idx:{state:!0}},Li.styles=[V,F`
      :host {
        position: relative;
      }
      /* Großbild: Foto der Meldung, darüber Quelle, Schlagzeile und Anriss – Schrift immer hell */
      .hero {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: var(--af-card-radius, 28px);
        background: #111;
        --af-ink: #fff;
        --af-ink-2: rgba(255, 255, 255, 0.8);
        --af-ink-3: rgba(255, 255, 255, 0.6);
        color: var(--af-ink);
      }
      .img {
        position: absolute;
        inset: 0;
        background: #1a1a1a center / cover no-repeat;
      }
      .img.cur {
        animation: news-in 1.4s var(--af-ease-soft, ease) backwards, drift var(--t, 16s) linear both;
      }
      @keyframes news-in {
        from {
          opacity: 0;
        }
      }
      @keyframes drift {
        from {
          transform: scale(1.02);
        }
        to {
          transform: scale(1.08);
        }
      }
      .grad {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0.5) 34%, rgba(0, 0, 0, 0) 62%);
      }
      .txt {
        position: absolute;
        left: 44px;
        right: 44px;
        bottom: 40px;
        animation: text-in 1s var(--af-ease, ease) 0.3s backwards;
      }
      @keyframes text-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
      }
      .meta {
        font-size: calc(16px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-3);
        font-weight: 500;
      }
      .meta b {
        color: #fff;
        font-weight: 600;
      }
      .title {
        font-size: 50px;
        line-height: 1.08;
        margin-top: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-wrap: balance;
      }
      .sum {
        font-size: calc(20px * var(--af-fs, 1));
        line-height: 1.45;
        color: var(--af-ink-2);
        margin-top: 14px;
        max-width: 900px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .dots {
        position: absolute;
        right: 44px;
        top: 34px;
        display: flex;
        gap: 6px;
      }
      .dots i {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: rgba(255, 255, 255, 0.35);
        transition: width 0.6s var(--af-ease, ease), background 0.6s;
      }
      .dots i.on {
        width: 22px;
        background: #fff;
      }

      /* Liste */
      .rows {
        display: flex;
        flex-direction: column;
        gap: 18px;
        margin-top: 18px;
      }
      .row {
        display: flex;
        gap: 18px;
        align-items: center;
      }
      .thumb {
        width: 132px;
        height: 84px;
        flex: none;
        border-radius: 12px;
        background: var(--af-surface) center / cover no-repeat;
      }
      .rt {
        font-size: calc(20px * var(--af-fs, 1));
        line-height: 1.25;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .rm {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 4px;
      }

      /* Laufband */
      .tick {
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(to right, transparent, #000 4%, #000 96%, transparent);
        mask-image: linear-gradient(to right, transparent, #000 4%, #000 96%, transparent);
      }
      .track {
        display: flex;
        white-space: nowrap;
        will-change: transform;
        animation: marquee 120s linear infinite;
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .track span {
        padding-right: 22px;
      }
      .track b {
        color: var(--af-accent);
        font-weight: 500;
        margin-right: 10px;
      }
      .track .sep {
        color: var(--af-ink-3);
      }
      @keyframes marquee {
        to {
          transform: translateX(-50%);
        }
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
      }
      @media (prefers-reduced-motion: reduce) {
        .img.cur,
        .track {
          animation: none;
        }
      }
    `];B("af-news",Li);var sc={morning:"Heute",midday:"Heute Nachmittag",evening:"Heute Abend & morgen"},Xa,er=new Set,oo,oc=t=>{oo??=t.connection.subscribeMessage(i=>{Xa=i.summary,er.forEach(e=>e())},{type:"ambiframe/summary/subscribe"}).catch(()=>{oo=void 0})},Jn=class extends ne{constructor(){super(...arguments);this.onUpdate=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),er.add(this.onUpdate)}disconnectedCallback(){super.disconnectedCallback(),er.delete(this.onUpdate)}shouldUpdate(){return!0}willUpdate(){this.hass&&oc(this.hass)}render(){let e=this.options,n=Xa,a=e.label===!1?m:u`<div class="label">${e.label??(n?d(sc[n.period]??"Heute"):d("\xDCberblick"))}</div>`,r=n?u`${n.headline?u`<div class="headline display">${n.headline}</div>`:m}
          <ul style=${e.size?`--size:${Number(e.size)}px`:""}>
            ${n.points.map((s,o)=>u`<li style="animation-delay:${.15+o*.12}s"><i></i><span>${s}</span></li>`)}
          </ul>
          <div class="meta">${ie("info")}<span>${d("KI-Zusammenfassung")} · ${Q(new Date(n.generated_at))}</span></div>`:u`<div class="calm">${Xa===void 0?d("Wird geladen \u2026"):d("Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.")}</div>`;return u`<div class="wrap ${e.style==="card"?"card":""}">${a}${r}</div>`}};Jn.styles=[V,F`
      .wrap {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .headline {
        font-size: 52px;
        line-height: 1.06;
        margin-top: 14px;
        text-wrap: balance;
      }
      ul {
        list-style: none;
        margin: 26px 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      li {
        display: flex;
        gap: 14px;
        align-items: baseline;
        font-size: var(--size, 22px);
        line-height: 1.35;
        color: var(--af-ink-2);
        animation: point-in 0.7s var(--af-ease, ease) backwards;
      }
      li i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--af-accent);
        flex: none;
        transform: translateY(-3px);
      }
      @keyframes point-in {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
      }
      .meta {
        margin-top: auto;
        padding-top: 18px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .meta .ic {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .calm {
        color: var(--af-ink-3);
        font-size: calc(18px * var(--af-fs, 1));
        margin-top: 14px;
      }
    `];B("af-summary",Jn);var Ci=class extends J{constructor(){super(...arguments);this.events=[];this.onForecast=()=>this.requestUpdate()}get calendars(){let e=this.options.calendars??[];return e.length?e:Object.keys(this.hass?.states??{}).filter(n=>n.startsWith("calendar.")).slice(0,3)}get weather(){return this.options.weather??Object.keys(this.hass?.states??{}).find(e=>e.startsWith("weather."))}disconnectedCallback(){super.disconnectedCallback(),this.listening?.removeEventListener("change",this.onForecast),this.listening=void 0}shouldUpdate(e){return e.has("ctx")||e.has("options")||e.has("events")||super.shouldUpdate(e)}watched(){return[this.weather,...(this.options.bins??[]).map(e=>e.entity)]}willUpdate(){let e=this.ctx?.forecasts;e&&this.listening!==e&&(this.listening?.removeEventListener("change",this.onForecast),e.addEventListener("change",this.onForecast),this.listening=e),this.hass&&this.calendars.length&&Tn(this.hass,this.calendars,2).then(n=>{n!==this.events&&(this.events=n)})}renderEvents(){let e=Date.now(),n=this.events.filter(r=>{let s=se(r.start),o=se(r.end);return!s||!o?!1:nt(r)?le(s)<=0&&o.getTime()>e:le(s)===0}),a=this.events.find(r=>{let s=se(r.start);return!!s&&le(s)===1});return u`<div class="col">
      <div class="ct">${ie("calendar")}${d("Termine heute")}</div>
      ${n.length?n.slice(0,5).map(r=>{let s=!nt(r)&&(se(r.end)?.getTime()??0)<e;return u`<div class="ev ${s?"past":""}">
              <span class="when num">${nt(r)?d("ganztags"):Q(se(r.start))}</span><span class="what">${r.summary}</span>
            </div>`}):u`<div class="calm">${d("Heute keine Termine")}</div>`}
      ${a?u`<div class="note">${d("Morgen")}: ${nt(a)?"":`${Q(se(a.start))} `}${a.summary}</div>`:m}
    </div>`}renderWeather(){let e=H(this.hass,this.weather);if(!e)return m;let n=this.ctx?.forecasts.get(this.weather,"daily")??[],a=this.ctx?.forecasts.get(this.weather,"hourly")??[],r=n.find(c=>le(new Date(c.datetime))===0)??n[0],s=r?.condition??e.state,o=a.find(c=>{let h=new Date(c.datetime);return le(h)===0&&h.getTime()>Date.now()-36e5&&(c.precipitation_probability??0)>=50}),l=r?.precipitation_probability;return u`<div class="col">
      <div class="ct">${ie("sun")}${d("Wetter heute")}</div>
      <div class="wx">
        ${ie(Ce(s))}
        <div>
          <div class="hi display num">${W(r?.temperature??e.attributes.temperature,0)}°</div>
          ${r?.templow!=null?u`<div class="lo num">${W(r.templow,0)}°</div>`:m}
        </div>
      </div>
      <div class="cond">${Ue(s)}</div>
      <div class="note">
        ${o?d("Regen ab etwa {time} Uhr",{time:Q(new Date(o.datetime))}):l!=null&&l>=30?d("Regenrisiko {n} %",{n:W(l,0)}):d("Trocken")}
      </div>
    </div>`}renderWaste(){let e=ja(this.hass,{bins:this.options.bins,days:2});return u`<div class="col">
      <div class="ct">${ie("bin")}${d("M\xFCll")}</div>
      ${e.length?e.flatMap(n=>n.bins.map(a=>u`<div class="bin ${n.days<=1?"soon":""}">
                <i style="background:${a.color??"var(--af-ink-3)"}"></i><span>${a.name}</span><span class="d">${Ga(n.days)}</span>
              </div>`)):u`<div class="calm">${d("Keine Abholung")}</div>`}
      ${e.some(n=>n.days===1)?u`<div class="note">${d("Heute Abend rausstellen")}</div>`:m}
    </div>`}render(){let e=new Date,n=e.getHours(),a=n<11?d("Guten Morgen"):n<18?d("Guten Tag"):d("Guten Abend");return u`${this.options.label===!1?m:u`<div class="head display">${this.options.label??a}</div>
            <div class="sub">${e.toLocaleDateString(X(),{weekday:"long",day:"numeric",month:"long"})}</div>`}
      <div class="cols">${this.renderEvents()} ${this.renderWeather()} ${this.renderWaste()}</div>`}};Ci.properties={...J.properties,events:{state:!0}},Ci.styles=[V,F`
      :host {
        display: flex;
        flex-direction: column;
      }
      .head {
        font-size: calc(46px * var(--af-fs, 1));
        line-height: 1.1;
      }
      .sub {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
      }
      .cols {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr;
        gap: 28px;
        margin-top: 34px;
      }
      .col {
        min-width: 0;
        padding: 26px 28px;
        border-radius: var(--af-card-radius, 24px);
        background: var(--af-surface);
        border: 1px solid var(--af-line);
        animation: col-in 0.9s var(--af-ease) backwards;
      }
      .col:nth-child(2) {
        animation-delay: 0.12s;
      }
      .col:nth-child(3) {
        animation-delay: 0.24s;
      }
      @keyframes col-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
      }
      .ct {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--af-accent);
        margin-bottom: 18px;
      }
      .ev {
        display: flex;
        gap: 16px;
        align-items: baseline;
        padding: calc(9px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
      }
      .ev:last-of-type {
        border-bottom: 0;
      }
      .ev .when {
        width: calc(78px * var(--af-fs, 1));
        flex: none;
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .ev .what {
        font-size: calc(22px * var(--af-fs, 1));
        line-height: 1.25;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ev.past {
        opacity: 0.45;
      }
      .note {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 14px;
        line-height: 1.4;
      }
      .calm {
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .wx {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .wx .ic {
        font-size: calc(64px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .wx .hi {
        font-size: calc(56px * var(--af-fs, 1));
        line-height: 1;
      }
      .wx .lo {
        font-size: calc(26px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .cond {
        font-size: calc(21px * var(--af-fs, 1));
        margin-top: 14px;
      }
      .bin {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(22px * var(--af-fs, 1));
        padding: calc(6px * var(--af-dense, 1)) 0;
      }
      .bin i {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        flex: none;
      }
      .bin .d {
        color: var(--af-ink-3);
        margin-left: auto;
        font-size: calc(18px * var(--af-fs, 1));
      }
      .bin.soon .d {
        color: var(--af-accent);
      }
      @media (prefers-reduced-motion: reduce) {
        .col {
          animation: none;
        }
      }
    `];B("af-today",Ci);var lc=t=>{let i=Date.now()-18e5;return(t??[]).map(e=>({t:new Date(e.datetime),temp:Number(e.temperature),cond:e.condition,pp:e.precipitation_probability??0})).filter(e=>e.t.getTime()>i&&Number.isFinite(e.temp))},dc=t=>(t??[]).map(i=>({t:new Date(i.datetime),hi:Number(i.temperature),lo:Number(i.templow??i.temperature),cond:i.condition,pp:i.precipitation_probability??0})).filter(i=>le(i.t)>=0),Xn=class extends ne{constructor(){super(...arguments);this.size={w:0,h:0};this.onForecast=()=>this.requestUpdate()}watched(){return[this.options.entity]}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(()=>{let e=this.offsetWidth,n=this.offsetHeight;(e!==this.size.w||n!==this.size.h)&&(this.size={w:e,h:n},this.options.variant==="hourly"&&this.requestUpdate())}),this.resize.observe(this),this.listen()}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.listeningTo?.forecasts.removeEventListener("change",this.onForecast),this.listeningTo=void 0}updated(e){e.has("ctx")&&this.listen()}listen(){this.listeningTo!==this.ctx&&(this.listeningTo?.forecasts.removeEventListener("change",this.onForecast),this.ctx?.forecasts.addEventListener("change",this.onForecast),this.listeningTo=this.ctx)}shouldUpdate(e){return e.has("ctx")||e.has("options")||super.shouldUpdate(e)}hours(){return lc(this.ctx?.forecasts.get(this.options.entity,"hourly"))}days(){return dc(this.ctx?.forecasts.get(this.options.entity,"daily"))}render(){let e=H(this.hass,this.options.entity);if(!e)return u`<div class="faint">${d("Wetter-Entit\xE4t fehlt")}</div>`;let n=e.attributes;switch(this.options.variant??"now"){case"line":return u`<div class="line">${ie(Ce(e.state))}<span class="num">${W(n.temperature,0)}°</span><span>${Ue(e.state)}</span></div>`;case"card":return this.renderCard(e.state,n);case"hourly":return this.renderHourly();case"rain":return this.renderRain();case"daily":return this.renderDaily();default:{let a=this.days().find(r=>le(r.t)===0);return u`<div class="now">
          ${ie(Ce(e.state))}
          <div class="temp display num">${W(n.temperature,0)}°</div>
          <div class="cond">${Ue(e.state)}</div>
          ${a?u`<div class="range num">${d("Heute {lo}\xB0 bis {hi}\xB0",{lo:W(a.lo,0),hi:W(a.hi,0)})}</div>`:m}
          <div class="meta num">
            ${d("Wind")} ${W(n.wind_speed,0)} ${n.wind_speed_unit??"km/h"} ${Ps(n.wind_bearing)}<br />
            ${d("Luftfeuchte")} ${W(n.humidity,0)} %${n.uv_index!=null?` \xB7 UV ${W(n.uv_index,0)}`:""}
          </div>
        </div>`}}}renderCard(e,n){let a=this.days().find(s=>le(s.t)===0),r=this.hours().filter((s,o)=>o%3===0).slice(0,4);return u`<div class="card">
      <div class="label">${this.options.name??n.friendly_name??""}</div>
      <div class="bigic">${ie(Ce(e))}</div>
      <div class="big display num">${W(n.temperature,0)}°</div>
      <div class="cond">${Ue(e)}</div>
      ${a?u`<div class="sub num">${d("Bis {hi}\xB0, nachts {lo}\xB0",{hi:W(a.hi,0),lo:W(a.lo,0)})}</div>`:m}
      ${r.length?u`<div class="mini">
            ${r.map(s=>u`<div><div class="h num">${d("{h} Uhr",{h:s.t.getHours()})}</div>${ie(Ce(s.cond))}<div class="v num">${W(s.temp,0)}°</div></div>`)}
          </div>`:m}
    </div>`}renderHourly(){let e=this.hours().slice(0,Number(this.options.hours)||12),n=this.size.w||668,a=Math.max(140,Math.min(220,(this.size.h||254)-40)),r=u`<div class="label">${this.options.label??d("N\xE4chste Stunden")}</div>`;if(e.length<2)return r;let s=76,o=a-34,l=e.map($=>$.temp),c=Math.min(...l)-1,h=Math.max(...l)+1,p=$=>24+$*(n-48)/(e.length-1),g=$=>s+(o-s)*(1-($-c)/(h-c||1)),b=`M${p(0)},${g(l[0])}`;for(let $=0;$<e.length-1;$++){let P=(p($)+p($+1))/2;b+=` C${P},${g(l[$])} ${P},${g(l[$+1])} ${p($+1)},${g(l[$+1])}`}let f=`${b} L${p(e.length-1)},${o+10} L${p(0)},${o+10} Z`,v=e.length>8?2:1;return u`${r}
      <svg class="chart" width=${n} height=${a} viewBox="0 0 ${n} ${a}">
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--af-accent)" stop-opacity=".22" />
            <stop offset="1" stop-color="var(--af-accent)" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d=${f} fill="url(#wg)" />
        <path d=${b} fill="none" stroke="var(--af-accent)" stroke-width="2.4" stroke-linecap="round" />
        ${e.map(($,P)=>{if(P%v)return m;let T=p(P),I=g($.temp);return $e`
            <g class="gi" transform="translate(${T-13},0) scale(1.08)" fill="none" stroke="currentColor" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round">${Ot(vi[Ce($.cond)])}</g>
            ${$.pp>=30?$e`<text class="tc" x=${T} y="46" text-anchor="middle">${W($.pp,0)} %</text>`:m}
            <text class="t1" x=${T} y=${I-14} text-anchor="middle">${W($.temp,0)}°</text>
            <circle cx=${T} cy=${I} r="3.5" fill="var(--af-bg)" stroke="var(--af-accent)" stroke-width="2" />
            <text class="t3" x=${T} y=${a-6} text-anchor="middle">${d("{h} Uhr",{h:$.t.getHours()})}</text>`})}
      </svg>`}renderRain(){let e=this.options,n=e.rain_sensor?this.hass?.states[e.rain_sensor]?.state==="on":!1,a=Number(e.threshold??40),r=this.hours().slice(0,Number(e.hours??12)),s=g=>g.pp>=a||["rainy","pouring","lightning-rainy","snowy-rainy"].includes(g.cond??""),o=r.find(s),l=n?r.find(g=>!s(g)):void 0,c=r[r.length-1],h,p="";return n?(h=d("Es regnet gerade"),p=l?d("Trocken ab etwa {h} Uhr",{h:l.t.getHours()}):d("Bleibt vorerst nass")):o?(h=d("Regen ab {h} Uhr",{h:o.t.getHours()}),p=d("{n} % Wahrscheinlichkeit",{n:W(o.pp,0)})):(h=d("Trocken"),p=c?d("Kein Regen bis {h} Uhr",{h:c.t.getHours()}):""),u`<div class="line" style="align-items:flex-start">
      <span style="font-size:30px;color:var(--af-accent)">${ie(n||o?"rain":"sun")}</span>
      <div><div style="font-size: calc(24px * var(--af-fs, 1));color:var(--af-ink)">${h}</div><div style="font-size: calc(17px * var(--af-fs, 1));color:var(--af-ink-3);margin-top:6px">${p}</div></div>
    </div>`}renderDaily(){let e=this.days().filter(o=>le(o.t)>=1).slice(0,Number(this.options.days)||5),n=u`<div class="label">${this.options.label??d("N\xE4chste Tage")}</div>`;if(!e.length)return n;let a=Math.min(...e.map(o=>o.lo)),r=Math.max(...e.map(o=>o.hi)),s=o=>(o-a)/(r-a||1)*100;return u`${n}
      <div class="days">
        ${e.map(o=>u`<div class="day num">
            <span>${le(o.t)===1?d("Morgen"):wi(o.t)}</span>
            ${ie(Ce(o.cond))}
            <span class="pp">${o.pp>=20?`${W(o.pp,0)} %`:""}</span>
            <span class="lo">${W(o.lo,0)}°</span>
            <span class="bar"><i style="left:${s(o.lo)}%;right:${100-s(o.hi)}%"></i></span>
            <span>${W(o.hi,0)}°</span>
          </div>`)}
      </div>`}};Xn.styles=[V,F`
      .now > .ic {
        font-size: 76px;
        color: var(--af-accent);
      }
      .now .temp {
        font-size: 184px;
        line-height: 0.9;
        margin-top: 10px;
      }
      .now .cond {
        font-size: 32px;
        margin-top: 12px;
      }
      .now .range {
        font-size: calc(22px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 12px;
      }
      .now .meta {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 28px;
        line-height: 1.75;
      }
      .card .bigic {
        font-size: 60px;
        color: var(--af-accent);
        margin-top: 26px;
      }
      .card .big {
        font-size: 128px;
        line-height: 0.9;
        margin-top: 22px;
      }
      .card .cond {
        font-size: 28px;
        margin-top: 16px;
      }
      .card .sub {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
      }
      .mini {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        margin-top: auto;
        padding-top: 22px;
        border-top: 1px solid var(--af-line);
        text-align: center;
      }
      .mini .h {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .mini .ic {
        font-size: 26px;
        color: var(--af-ink-2);
        margin: 10px auto;
        display: block;
      }
      .mini .v {
        font-size: calc(20px * var(--af-fs, 1));
      }
      svg.chart {
        display: block;
        overflow: visible;
        margin-top: 12px;
      }
      svg.chart text {
        font-family: var(--af-sans);
        font-variant-numeric: tabular-nums;
      }
      .t1 {
        fill: var(--af-ink);
        font-size: calc(18px * var(--af-fs, 1));
      }
      .t3 {
        fill: var(--af-ink-3);
        font-size: calc(16px * var(--af-fs, 1));
      }
      .tc {
        fill: var(--af-cold);
        font-size: calc(15px * var(--af-fs, 1));
      }
      .gi {
        color: var(--af-ink-2);
      }
      .days {
        margin-top: 14px;
      }
      .day {
        display: grid;
        grid-template-columns: 78px 30px 52px 44px 1fr 44px;
        align-items: center;
        column-gap: 12px;
        height: 50px;
        border-top: 1px solid var(--af-line);
        font-size: calc(20px * var(--af-fs, 1));
      }
      .day .ic {
        font-size: 26px;
        color: var(--af-ink-2);
      }
      .pp {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-cold);
      }
      .lo {
        color: var(--af-ink-3);
        text-align: right;
      }
      .bar {
        position: relative;
        height: 6px;
        border-radius: 3px;
        background: var(--af-line);
      }
      .bar i {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 3px;
        background: linear-gradient(90deg, var(--af-cold), var(--af-accent));
      }
      .line {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .line .ic {
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-accent);
      }
    `];B("af-weather",Xn);var Ke={clock:{tag:"af-clock",name:"Uhr",icon:"mdi:clock-outline",size:[6,2]},date:{tag:"af-date",name:"Datum",icon:"mdi:calendar-today",size:[6,1]},text:{tag:"af-text",name:"Text & Vorlage",icon:"mdi:format-text",size:[4,1]},chart:{tag:"af-chart",name:"Verlauf",icon:"mdi:chart-line",size:[6,3]},gauge:{tag:"af-gauge",name:"Anzeige (Ring)",icon:"mdi:gauge",size:[3,3]},image:{tag:"af-image",name:"Bild",icon:"mdi:image-outline",size:[4,4]},weather:{tag:"af-weather",name:"Wetter",icon:"mdi:weather-partly-cloudy",size:[4,6]},value:{tag:"af-value",name:"Wert",icon:"mdi:numeric",size:[3,2]},rooms:{tag:"af-rooms",name:"R\xE4ume",icon:"mdi:home-thermometer-outline",size:[8,6]},status:{tag:"af-status",name:"Status",icon:"mdi:list-status",size:[4,6]},calendar:{tag:"af-calendar",name:"Kalender",icon:"mdi:calendar",size:[4,6]},infoline:{tag:"af-infoline",name:"Infozeile",icon:"mdi:dots-horizontal",size:[8,1]},camera:{tag:"af-camera",name:"Kamera",icon:"mdi:cctv",size:[6,4]},price:{tag:"af-price",name:"Strompreis",icon:"mdi:currency-eur",size:[8,6]},power:{tag:"af-power",name:"Energie jetzt",icon:"mdi:solar-power",size:[6,4]},car:{tag:"af-car",name:"Auto",icon:"mdi:car-electric",size:[5,7]},persons:{tag:"af-persons",name:"Personen",icon:"mdi:account",size:[5,4]},vacuum:{tag:"af-vacuum",name:"Saugroboter",icon:"mdi:robot-vacuum",size:[6,4]},waste:{tag:"af-waste",name:"M\xFClltonnen",icon:"mdi:trash-can",size:[5,5]},activity:{tag:"af-activity",name:"Bewegung",icon:"mdi:motion-sensor",size:[7,1]},list:{tag:"af-list",name:"Werte-Liste",icon:"mdi:format-list-bulleted",size:[5,6]},warnings:{tag:"af-warnings",name:"Warnungen",icon:"mdi:alert",size:[6,3]},agenda:{tag:"af-agenda",name:"Termine",icon:"mdi:calendar",size:[6,6]},media:{tag:"af-media",name:"L\xE4uft gerade",icon:"mdi:music",size:[6,3]},appliances:{tag:"af-appliances",name:"Ger\xE4te",icon:"mdi:washing-machine",size:[6,4]},batteries:{tag:"af-batteries",name:"Akkus",icon:"mdi:battery-heart-variant",size:[6,7]},consumers:{tag:"af-consumers",name:"Gr\xF6\xDFte Verbraucher",icon:"mdi:podium",size:[6,3]},covers:{tag:"af-covers",name:"Rolll\xE4den",icon:"mdi:window-shutter",size:[5,7]},summary:{tag:"af-summary",name:"KI-Zusammenfassung",icon:"mdi:creation-outline",size:[7,7]},pet:{tag:"af-pet",name:"Haustier",icon:"mdi:cat",size:[12,8]},balance:{tag:"af-balance",name:"Tagesbilanz",icon:"mdi:chart-box-outline",size:[12,8]},qr:{tag:"af-qr",name:"WLAN-QR-Code",icon:"mdi:qrcode",size:[6,7]},job:{tag:"af-job",name:"Auftrag/Druck",icon:"mdi:printer-3d",size:[4,6]},news:{tag:"af-news",name:"Nachrichten",icon:"mdi:newspaper-variant-outline",size:[12,7]},daily:{tag:"af-daily",name:"Tagesinhalt (Wikipedia, Zitat)",icon:"mdi:book-open-page-variant-outline",size:[12,8]},today:{tag:"af-today",name:"Tagesvorschau",icon:"mdi:calendar-today-outline",size:[12,7]},card:{tag:"af-card",name:"HA-Karte",icon:"mdi:card-outline",size:[4,4]}};var co=Symbol.for(""),cc=t=>{if(t?.r===co)return t?._$litStatic$},uo=t=>({_$litStatic$:t,r:co});var lo=new Map,tr=t=>(i,...e)=>{let n=e.length,a,r,s=[],o=[],l,c=0,h=!1;for(;c<n;){for(l=i[c];c<n&&(r=e[c],(a=cc(r))!==void 0);)l+=a+i[++c],h=!0;c!==n&&o.push(r),s.push(l),c++}if(c===n&&s.push(i[n]),h){let p=s.join("$$lit$$");(i=lo.get(p))===void 0&&(s.raw=s,lo.set(p,i=s)),e=o}return t(i,...e)},ho=tr(u),ob=tr($e),lb=tr(gs);var po=t=>()=>{t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296},go=(t,i,e)=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${i} ${e}' numOctaves='3' seed='${t}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.2 0 0 0 -0.85'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`)}")`,uc=go(7,.0035,.009),hc=go(23,.005,.012),mo=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,Di=class extends re{constructor(){super(...arguments);this.type="none";this.strength=1;this.speed="slow";this.small=!1;this.raf=0;this.particles=[];this.color="255,255,255";this.colorAt=0;this.last=0;this.onVisibility=()=>{cancelAnimationFrame(this.raf),!document.hidden&&this.type==="particles"&&!mo()&&(this.raf=requestAnimationFrame(this.frame))};this.frame=e=>{if(this.raf=requestAnimationFrame(this.frame),e-this.last<33)return;let n=this.last?Math.min(3,(e-this.last)/33):1;this.last=e;let a=this.speed==="normal"?1.8:1,r=this.canvas;if(r){for(let s of this.particles)s.x+=(s.vx+Math.sin(e/4e3+s.ph)*.05)*n*a,s.y+=s.vy*n*a,s.y<-10&&(s.y=r.height+10),s.x<-10&&(s.x=r.width+10),s.x>r.width+10&&(s.x=-10);this.draw(e)}}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibility)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibility),cancelAnimationFrame(this.raf),this.resize?.disconnect()}updated(e){if(this.type!=="particles"){cancelAnimationFrame(this.raf);return}(e.has("type")||e.has("strength")||e.has("small"))&&this.setupParticles()}get canvas(){return this.renderRoot.querySelector("canvas")}setupParticles(){let e=this.canvas;if(!e)return;this.resize?.disconnect(),this.resize=new ResizeObserver(()=>this.sizeCanvas()),this.resize.observe(this),this.sizeCanvas();let n=po(11),a=this.small?16:[30,48,72][this.strength-1],r=e.width,s=e.height,o=r/1280;this.particles=Array.from({length:a},()=>({x:n()*r,y:n()*s,r:(.6+n()*n()*2.2)*o*1.4,vx:(n()-.5)*.12*o,vy:-(.08+n()*.22)*o,a:.12+n()*.38,ph:n()*Math.PI*2,tw:.2+n()*.6})),cancelAnimationFrame(this.raf),mo()?this.draw(0):this.raf=requestAnimationFrame(this.frame)}sizeCanvas(){let e=this.canvas;if(!e)return;let n=Math.min(1.5,window.devicePixelRatio||1),a=Math.round(this.offsetWidth*n),r=Math.round(this.offsetHeight*n);if(a&&r&&(e.width!==a||e.height!==r)){let s=e.width?a/e.width:1,o=e.height?r/e.height:1;e.width=a,e.height=r;for(let l of this.particles)l.x*=s,l.y*=o}}draw(e){let n=this.canvas,a=n?.getContext("2d");if(!n||!a)return;if(!e||e-this.colorAt>1e3){this.colorAt=e;let s=getComputedStyle(this).getPropertyValue("--af-ink").trim(),o=s.match(/^#([0-9a-f]{6})$/i);o?this.color=[0,2,4].map(l=>parseInt(o[1].slice(l,l+2),16)).join(","):s.startsWith("rgb")&&(this.color=s.replace(/rgba?\(|\)/g,"").split(",").slice(0,3).join(","))}a.clearRect(0,0,n.width,n.height);let r=[.8,1,1.2][this.strength-1];for(let s of this.particles){let o=s.a*r*(.6+.4*Math.sin(e/1e3*s.tw+s.ph));a.fillStyle=`rgba(${this.color},${Math.max(0,Math.min(1,o))})`,a.beginPath(),a.arc(s.x,s.y,s.r,0,Math.PI*2),a.fill()}}renderBokeh(){let e=po(5),n=this.small?6:[8,12,16][this.strength-1],a=[.45,.6,.75][this.strength-1];return u`<div class="layer bokeh">
      ${Array.from({length:n},(r,s)=>{let o=60+e()*180,l=s%3===0?"var(--af-ink)":"var(--af-accent)",c=[`left:${e()*100-8}%`,`top:${e()*100-8}%`,`width:${o}px`,`--c:color-mix(in srgb, ${l} ${s%3===0?14:26}%, transparent)`,`--d:${22+e()*26}s`,`--delay:${-e()*40}s`,`--o:${a*(.5+e()*.5)}`,`--dx:${(e()-.5)*80}px`,`--dy:${(e()-.5)*60}px`].join(";");return u`<i style=${c}></i>`})}
    </div>`}render(){let e=this.speed==="normal"?.55:1,n=[.6,.85,1][this.strength-1],a=`--k:${e};opacity:${n}`;switch(this.type){case"particles":return u`<canvas></canvas>`;case"flow":return u`<div class="layer flow" style=${a}><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;case"bokeh":return u`<div class="layer" style="--k:${e}">${this.renderBokeh()}</div>`;case"mist":return u`<div class="layer mist" style="${a};--m1:${uc};--m2:${hc}"><div class="layer m1"></div><div class="layer m2"></div></div>`;default:return m}}};Di.properties={type:{},strength:{type:Number},speed:{},small:{type:Boolean}},Di.styles=F`
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      display: block;
    }
    canvas,
    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* Fließender Verlauf: große, weiche Farbflächen wandern über Minuten */
    .flow i {
      position: absolute;
      width: 85%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle at center, var(--c) 0%, transparent 68%);
      will-change: transform;
      animation: var(--n) calc(var(--d) * var(--k)) var(--af-ease-soft, ease-in-out) infinite alternate;
    }
    .flow .b1 {
      --c: var(--af-flow-1, var(--af-accent-soft));
      --d: 70s;
      --n: f1;
      left: -22%;
      top: -34%;
    }
    .flow .b2 {
      --c: var(--af-flow-2, color-mix(in srgb, var(--af-cold) 20%, transparent));
      --d: 86s;
      --n: f2;
      right: -28%;
      top: -12%;
    }
    .flow .b3 {
      --c: var(--af-flow-3, var(--af-accent-soft));
      --d: 98s;
      --n: f3;
      left: 18%;
      bottom: -48%;
    }
    .flow .b4 {
      --c: var(--af-flow-1, color-mix(in srgb, var(--af-cold) 14%, transparent));
      --d: 112s;
      --n: f4;
      right: 6%;
      bottom: -42%;
      width: 60%;
    }
    @keyframes f1 {
      to {
        transform: translate(26%, 20%) scale(1.15);
      }
    }
    @keyframes f2 {
      to {
        transform: translate(-22%, 24%) scale(0.9);
      }
    }
    @keyframes f3 {
      to {
        transform: translate(12%, -20%) scale(1.2);
      }
    }
    @keyframes f4 {
      to {
        transform: translate(-28%, -12%) scale(1.1);
      }
    }

    /* Lichtschimmer: weiche Lichtpunkte blenden langsam auf und ab */
    .bokeh i {
      position: absolute;
      border-radius: 50%;
      aspect-ratio: 1;
      background: radial-gradient(circle, var(--c) 0%, transparent 70%);
      opacity: 0;
      will-change: transform, opacity;
      animation: glow calc(var(--d) * var(--k)) ease-in-out var(--delay) infinite;
    }
    @keyframes glow {
      0%,
      100% {
        opacity: 0;
        transform: translate(0, 0) scale(0.9);
      }
      50% {
        opacity: var(--o);
        transform: translate(var(--dx), var(--dy)) scale(1.05);
      }
    }

    /* Nebel: zwei Schwaden ziehen gegeneinander */
    .mist .layer {
      inset: -8% auto -8% 0;
      width: 200%;
      height: 116%;
      background: var(--af-mist);
      -webkit-mask-size: 50% 100%;
      mask-size: 50% 100%;
      -webkit-mask-repeat: repeat-x;
      mask-repeat: repeat-x;
      will-change: transform;
    }
    .mist .m1 {
      -webkit-mask-image: var(--m1);
      mask-image: var(--m1);
      animation: drift calc(170s * var(--k)) linear infinite;
    }
    .mist .m2 {
      -webkit-mask-image: var(--m2);
      mask-image: var(--m2);
      animation: drift calc(240s * var(--k)) linear infinite reverse;
      opacity: 0.75;
    }
    @keyframes drift {
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .flow i,
      .bokeh i,
      .mist .layer {
        animation: none;
      }
      .bokeh i {
        opacity: calc(var(--o) * 0.6);
      }
    }
  `;B("af-ambient",Di);var ge={landscape:{w:1280,h:800,padX:56,padY:48,gap:16,cols:12,rows:8},portrait:{w:800,h:1280,padX:40,padY:56,gap:16,cols:8,rows:12}},fo=(t,i)=>{let e=ge[t];if(!i||!Number.isFinite(i))return e;let n=e.w/e.h,[a,r]=t==="landscape"?[1.25,2.2]:[.45,.8],s=Math.min(r,Math.max(a,i));return s>n?{...e,w:Math.round(e.h*s)}:{...e,h:Math.round(e.w/s)}},Yt=(t,i)=>{let e=(t.w-2*t.padX-(t.cols-1)*t.gap)/t.cols,n=(t.h-2*t.padY-(t.rows-1)*t.gap)/t.rows;return{left:t.padX+i.x*(e+t.gap),top:t.padY+i.y*(n+t.gap),width:i.w*e+(i.w-1)*t.gap,height:i.h*n+(i.h-1)*t.gap}},pc=t=>{let i=ge.portrait;if(!t.length)return{};let e=[...t].sort((v,$)=>v.y-$.y||v.x-$.x),n=[],a=-1;for(let v of e)n.length&&v.y<a?(n[n.length-1].push(v),a=Math.max(a,v.y+v.h)):(n.push([v]),a=v.y+v.h);let r=[];for(let v of n){let $=Math.min(...v.map(T=>T.y)),P=Math.max(...v.map(T=>T.y+T.h))-$;if(P<=2&&v.length>1){let T=0,I=[...v].sort((S,L)=>S.x-L.x).map(S=>{let L=Math.max(2,Math.round(S.w*i.cols/12)),k=Math.max(T,Math.min(i.cols-L,Math.round(S.x*i.cols/12)));return T=k+L,{widget:S,x:k,dy:S.y-$,w:L,h:S.h}});if(T<=i.cols){r.push({items:I,h:P,flex:!1});continue}}for(let T of[...v].sort((I,S)=>I.x-S.x||I.y-S.y))r.push({items:[{widget:T,x:0,dy:0,w:i.cols,h:T.h}],h:T.h,flex:T.h>1})}if(r.reduce((v,$)=>v+$.h,0)>i.rows){let v=r.filter(S=>!S.flex).reduce((S,L)=>S+L.h,0),$=r.filter(S=>S.flex),P=$.reduce((S,L)=>S+L.h,0),T=Math.max($.length,i.rows-v);for(let S of $)S.h=Math.max(1,Math.floor(S.h*T/P));let I=i.rows-r.reduce((S,L)=>S+L.h,0);for(let S of[...$].sort((L,k)=>k.h-L.h)){if(I<=0)break;S.h++,I--}for(let S of r)for(let L of S.items)L.h=Math.min(L.h,S.h-L.dy)}let o=Math.min(...t.map(v=>v.y)),l=8-Math.max(...t.map(v=>v.y+v.h)),c=i.rows-r.reduce((v,$)=>v+$.h,0),h=r.filter(v=>v.flex);if(c>0&&o+l===0&&h.length){let v=h.reduce((P,T)=>P+T.h,0),$=c;for(let P of h){let T=Math.floor(c*P.h/v);P.h+=T,$-=T}for(let P of[...h].sort((T,I)=>I.h-T.h)){if($<=0)break;P.h++,$--}for(let P of h)for(let T of P.items)T.h=P.h}let p=r.reduce((v,$)=>v+$.h,0),g=Math.max(0,i.rows-p),b=o+l>0?Math.round(g*o/(o+l)):0,f={};for(let v of r){for(let $ of v.items){let P=b+$.dy;P<i.rows&&(f[$.widget.id]={x:$.x,y:P,w:$.w,h:Math.max(1,Math.min($.h,i.rows-P))})}b+=v.h}return f},Tt=(t,i)=>{if(i==="landscape")return Object.fromEntries(t.map(n=>[n.id,{x:n.x,y:n.y,w:n.w,h:n.h}]));let e=t.some(n=>!n.portrait)?pc(t):{};return Object.fromEntries(t.map(n=>[n.id,n.portrait??e[n.id]]).filter(n=>!!n[1]))};var bo={start:"flex-start",center:"center",end:"flex-end"},mc={start:"left",center:"center",end:"right"},vo=new Map,Ni=class extends re{constructor(){super(...arguments);this.photo=null;this.grid=ge.landscape;this.orientation="landscape";this.refresh=()=>this.requestUpdate();this.held=!1}act(e,n){let a=e[n];a&&this.dispatchEvent(new CustomEvent("af-action",{detail:{action:a,widget:e},bubbles:!0,composed:!0}))}onDown(e){this.held=!1,clearTimeout(this.holdTimer),e.hold_action&&(this.holdTimer=window.setTimeout(()=>{this.held=!0,this.act(e,"hold_action")},600))}onClick(e,n){clearTimeout(this.holdTimer),this.held?(this.held=!1,e.stopPropagation()):n.tap_action&&(e.stopPropagation(),this.act(n,"tap_action"))}connectedCallback(){super.connectedCallback(),un.addEventListener("change",this.refresh),this.tick=window.setInterval(()=>{this.page?.widgets?.some(e=>e.show_if?.length)&&this.requestUpdate()},3e4)}disconnectedCallback(){super.disconnectedCallback(),un.removeEventListener("change",this.refresh),clearInterval(this.tick)}renderWidget(e,n){let a=Ke[e.type],r=Yt(this.grid,n),s=e.options??{},o=Oe(s.typeface),l=e.look??{},c=(f,v)=>`color-mix(in srgb, ${f} ${v}%, transparent)`,h=[`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`,o?`--af-display:${o};--af-sans:${o}`:"",`--af-align:${bo[s.align]??"flex-start"}`,`--af-valign:${bo[s.valign]??"flex-start"}`,`--af-text-align:${mc[s.align]??"left"}`,l.accent?`--af-accent:${l.accent};--af-accent-soft:${c(l.accent,14)}`:"",l.ink?`--af-ink:${l.ink};--af-ink-2:${c(l.ink,66)};--af-ink-3:${c(l.ink,40)};color:${l.ink}`:"",l.opacity!=null?`opacity:${Math.max(0,Math.min(100,Number(l.opacity)))/100}`:"",l.padding!=null?`padding:${Number(l.padding)}px`:""].filter(Boolean).join(";");if(!a)return u`<div class="cell" style=${h}><div class="unknown">Unbekanntes Widget „${e.type}“</div></div>`;let p=uo(a.tag),g=["cell",e.tap_action||e.hold_action?"act":"",l.card?"boxed":""].filter(Boolean).join(" "),b=l.size&&Number(l.size)!==100?`zoom:${Number(l.size)/100}`:"";return u`<div
      class=${g}
      style=${h}
      data-widget=${e.id}
      @pointerdown=${()=>this.onDown(e)}
      @pointerup=${()=>clearTimeout(this.holdTimer)}
      @pointerleave=${()=>clearTimeout(this.holdTimer)}
      @click=${f=>this.onClick(f,e)}
    >
      ${ho`<${p} style=${b} .hass=${this.hass} .options=${s} .ctx=${this.ctx}></${p}>`}
    </div>`}updated(){pn(this.renderRoot,this.page?.css)}cameraSource(e){let n=e.background??{type:"none"},a=(n.sources??[]).filter(s=>s?.url);if(!a.length)return{entity:n.entity,url:n.url,refresh:n.refresh,name:n.name};if(this.camPick?.page!==e.id){let s=((vo.get(e.id)??-1)+1)%a.length;vo.set(e.id,s),this.camPick={page:e.id,index:s}}let r=a[this.camPick.index%a.length];return{url:r.url,refresh:r.refresh??n.refresh,name:r.name}}render(){let e=this.page;if(!e)return m;let n=e.background??{type:"none"},a={display:this.ctx?.displayId,orientation:this.orientation},r=(e.widgets??[]).filter(f=>tt(this.hass,f.show_if,a)),s=Tt(e.widgets??[],this.orientation),o=e.palette==="night",l=this.ctx?.ambient,c=o?"none":n.ambient??l?.type??"none",h=n.type==="color"&&n.color,p=n.type==="photo"||n.type==="camera",g=this.cameraSource(e),b=[o?"night":"",p?"onphoto":"",o||h||p||c==="flow"?"flat":""].join(" ");return u`<div class="root ${b}" style=${h?`background-color:${n.color}`:""}>
      ${n.type==="photo"&&this.photo?u`<div class="photo" style="background-image:url('${this.photo.url}')"></div>
            <div class="shade"></div>
            ${this.photo.credit?u`<div class="credit">${this.photo.credit}</div>`:m}`:m}
      ${n.type==="camera"&&(g.entity||g.url)?u`<af-camera-view
              class="bgcam"
              .hass=${this.hass}
              .entity=${g.url?void 0:g.entity}
              .url=${g.url}
              .mode=${g.refresh===0?"live":"snapshot"}
              .refresh=${g.refresh??20}
              .osd=${"KAMERA"}
            ></af-camera-view>
            <div class="shade cam"></div>
            ${g.name?u`<div class="credit">${g.name}</div>`:m}`:m}
      ${c!=="none"?u`<af-ambient .type=${c} .strength=${l?.strength??1} .speed=${l?.speed??"slow"} .small=${!!this.ctx?.preview}></af-ambient>`:m}
      ${jt(r.filter(f=>s[f.id]),f=>f.id,f=>this.renderWidget(f,s[f.id]))}
    </div>`}};Ni.properties={hass:{attribute:!1},page:{attribute:!1},ctx:{attribute:!1},photo:{attribute:!1},grid:{attribute:!1},orientation:{attribute:!1}},Ni.styles=[Es,Ts,F`
      :host {
        position: absolute;
        inset: 0;
        display: block;
      }
      .root {
        position: absolute;
        inset: 0;
        background-color: var(--af-bg);
        /* weiche Farbflächen des Stils (Glas, Aurora) – der fließende Verlauf ersetzt sie */
        background-image: var(--af-bg-art, none);
        color: var(--af-ink);
        overflow: hidden;
      }
      .root.flat {
        background-image: none;
      }
      .photo {
        position: absolute;
        inset: 0;
        background: #050706 center / cover no-repeat;
        animation: kb 70s linear both;
      }
      @keyframes kb {
        from {
          transform: scale(1.02);
        }
        to {
          transform: scale(1.12) translate(-1.2%, -0.8%);
        }
      }
      :host-context([evening]) .photo {
        filter: brightness(0.8) saturate(0.88);
      }
      /* Kamerabilder sind oft hell (Auto, Hauswand) – unten links kräftiger abdunkeln, damit Uhr und Text lesbar bleiben */
      .shade.cam {
        background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.12) 72%, rgba(0, 0, 0, 0) 100%),
          linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 58%);
      }
      .bgcam {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(6, 8, 7, 0.84) 0%, rgba(6, 8, 7, 0.42) 27%, rgba(6, 8, 7, 0) 54%),
          linear-gradient(to right, rgba(6, 8, 7, 0.4) 0%, rgba(6, 8, 7, 0) 48%);
      }
      .credit {
        position: absolute;
        right: 56px;
        bottom: 56px;
        max-width: 380px;
        text-align: right;
        font: calc(15px * var(--af-fs, 1)) / 1.4 var(--af-sans);
        color: var(--af-ink-3);
      }
      .cell {
        position: absolute;
        display: flex;
        box-sizing: border-box;
      }
      .cell > * {
        flex: 1;
        min-width: 0;
      }
      /* Darstellung „als Karte“ – Fläche, Rand und Radius des Stils */
      .cell.boxed {
        background: var(--af-card, var(--af-surface));
        border: var(--af-card-border, 1px solid var(--af-line));
        border-top: var(--af-card-rule, var(--af-card-border, 1px solid var(--af-line)));
        border-radius: var(--af-card-radius, 32px);
        box-shadow: var(--af-card-shadow, none);
        backdrop-filter: var(--af-card-filter, none);
        -webkit-backdrop-filter: var(--af-card-filter, none);
        padding: var(--af-card-pad, 28px);
        overflow: hidden;
      }
      /* Antippbar: kurz eindrücken als Rückmeldung */
      .cell.act {
        cursor: pointer;
        transition: transform 0.25s var(--af-ease, ease), opacity 0.25s;
      }
      .cell.act:active {
        transform: scale(0.985);
        opacity: 0.85;
      }
      .unknown {
        border: 1px dashed var(--af-line);
        border-radius: 12px;
        color: var(--af-ink-3);
        font: 14px var(--af-sans);
        display: grid;
        place-items: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .photo {
          animation: none;
        }
      }
    `];B("af-page",Ni);var gc=new Set(["unavailable","unknown"]),yo=(t,i,e)=>{if(!i||!e||i.state===e.state||t.from&&i.state!==t.from)return!1;if(t.to!=="*")return e.state===t.to;if(gc.has(e.state)||i.state==="unavailable")return!1;if(e.entity_id.startsWith("event.")){let n=Date.parse(e.state);if(!Number.isFinite(n)||Date.now()-n>12e4||t.event_types?.length&&!t.event_types.includes(String(e.attributes.event_type)))return!1}return!0};var Mi=[["klangschale","Klangschale (tief, schwebend)"],["marimba","Marimba (zwei Holzt\xF6ne)"],["glas","Glas (klares Ding-Dong)"],["kalimba","Kalimba (drei gezupfte T\xF6ne)"],["windspiel","Windspiel (zart)"],["hinweis","Hinweis (sehr leise, kurz)"],["gong","Gong (warm, tief)"],["dingdong","Ding-Dong"],["glocke","Glocke (kurz, hell)"],["alarm","Alarm (eindringlich, wiederholt)"]],fc=new Set(Mi.map(([t])=>t)),bc=t=>fc.has(t)?new URL(`./sounds/${t}.wav`,import.meta.url).href:new URL(t,location.href).href,wo=new Map,vc=async(t,i={})=>{let n=i.library?.find(o=>o.id===t)?.url??t;if(!n.startsWith("media-source://"))return bc(n);let a=wo.get(n);if(a&&a.until>Date.now())return a.url;if(!i.hass)throw new Error("media-source ohne Home Assistant");let r=await i.hass.callWS({type:"media_source/resolve_media",media_content_id:n,expires:3600}),s=new URL(r.url,location.href).href;return wo.set(n,{url:s,until:Date.now()+50*6e4}),s},yc=3,Qt,Jt=async(t,i=70,e={})=>{let n;try{n=await vc(t,e)}catch(r){console.warn("Ambiframe: Ton nicht abspielbar:",t,r);return}let a=window.fully;if(a?.playSound){try{a.setAudioVolume?.(Math.max(0,Math.min(100,Math.round(i))),yc)}catch{}a.playSound(n,!1);return}Qt?.pause(),Qt=new Audio(n),Qt.volume=Math.max(0,Math.min(1,i/100)),Qt.play().catch(()=>{})},ko=()=>{window.fully?.stopSound?.(),Qt?.pause(),Qt=void 0};var xo=["pointerdown","touchstart","wheel","keydown"],ea,ir=()=>location.pathname+location.search,So=t=>{history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};function $o(t,i){ea?.stop();let e=ir(),n=i,a=document.createElement("button");a.type="button",a.setAttribute("style",["position:fixed","left:50%","bottom:calc(16px + env(safe-area-inset-bottom, 0px))","transform:translateX(-50%)","z-index:2147483647","border:0","border-radius:999px","padding:10px 18px","font:500 15px/1.2 system-ui,-apple-system,sans-serif","color:#fff","background:rgba(20,20,20,.78)","-webkit-backdrop-filter:blur(12px)","backdrop-filter:blur(12px)","box-shadow:0 6px 24px rgba(0,0,0,.25)","cursor:pointer"].join(";"));let r=()=>{a.textContent=`\u2190 ${d("Zur\xFCck zu Ambiframe")} \xB7 ${n} s`},s=()=>{n=i,r()},o=()=>{clearInterval(h);for(let p of xo)window.removeEventListener(p,s,!0);window.removeEventListener("location-changed",c),window.removeEventListener("popstate",c),a.remove(),ea?.stop===o&&(ea=void 0)},l=()=>{o(),ir()!==e&&So(e)},c=()=>{ir()===e&&o()},h=window.setInterval(()=>{n-=1,n<=0?l():r()},1e3);a.addEventListener("click",p=>{p.stopPropagation(),l()});for(let p of xo)window.addEventListener(p,s,{capture:!0,passive:!0});window.addEventListener("location-changed",c),window.addEventListener("popstate",c),ea={stop:o},r(),document.body.appendChild(a),So(t)}var Ao={type:"fade",duration:2.4},Et=t=>[...new Set([t.entity,...t.entities??[]].filter(i=>!!i))],at=t=>{let i=t?.state==="playing"?t.attributes.media_title:void 0;return i?`${i}|${t.attributes.media_artist??""}`:""},wc=t=>({entity_id:t,state:"playing",attributes:{friendly_name:"K\xFCche",media_title:"Harvest Moon",media_artist:"Neil Young",media_album_name:"Harvest Moon",media_duration:303,media_position:74,media_position_updated_at:new Date().toISOString()},last_changed:new Date().toISOString(),last_updated:new Date().toISOString()}),To=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`,kc={id:"__nacht",name:"Nacht",duration:60,background:{type:"none"},palette:"night",widgets:[{id:"uhr",type:"clock",x:3,y:3,w:6,h:2,options:{align:"center",valign:"end"}},{id:"datum",type:"date",x:3,y:5,w:6,h:1,options:{align:"center"}}]},Eo=t=>{try{return localStorage.getItem(t)}catch{return null}},ta=(t,i)=>{try{localStorage.setItem(t,i)}catch{}},xc=30,ve=t=>ie(t?Wt[t]??t:void 0),nr=()=>window.fully,Sc=()=>{try{nr()?.turnScreenOn?.()}catch{}},Pi=class extends re{constructor(){super(...arguments);this.streamMode=!1;this.shift=[0,0];this.shiftStep=0;this.effFor="";this.preview=!1;this.fixedPage=null;this.speed=1;this.theme="ruhig";this.mode="dark";this.orient="landscape";this.grid=ge.landscape;this.evening=!1;this.dimming=!1;this.paused=!1;this.ringFor="";this.layers=[];this.chips=[];this.chipsOpen=!1;this.history=[];this.historyLoaded="";this.historyOpen=!1;this.miniKey="";this.miniSince=0;this.miniShown=!1;this.controlOpen=!1;this.menu=!1;this.swallowTap=!1;this.muteUntil=Number(Eo("ambiframe-mute-until")??0);this.controlLeft=0;this.scale=1;this.night=!1;this.started=!1;this.idx=-1;this.seq=0;this.layerSeq=0;this.lastMediaKey="";this.lastMediaAt=0;this.mediaShown=new Map;this.lastFired=new Map;this.forecasts=new $n;this.photos=new An(()=>this.hass,()=>this.config?.photos);this.onAction=async e=>{let{action:n}=e.detail,a=this.hass,r=s=>s?a?.states[s]?.attributes.friendly_name??s:"";if(this.preview){this.showToast(`${d("Vorschau")}: ${n.action}${n.entity?` \xB7 ${r(n.entity)}`:n.page?` \xB7 ${n.page}`:""}`);return}if(!(n.confirm&&!await this.confirmFirst(typeof n.confirm=="string"?n.confirm:d("{name} \u2013 wirklich?",{name:r(n.entity)||d("Aktion")}))))try{switch(n.action){case"toggle":if(!n.entity||!a)return;await a.callService("homeassistant","toggle",{entity_id:n.entity}),this.showToast(`${r(n.entity)} umgeschaltet`);break;case"perform":{let[s,o]=(n.perform??"").split(".");if(!s||!o||!a)return;await a.callService(s,o,{...n.data??{},...n.entity?{entity_id:n.entity}:{}}),this.showToast(n.title??(r(n.entity)||d("Erledigt")));break}case"more_info":n.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:n.entity},bubbles:!0,composed:!0}));break;case"page":n.page&&this.showPage(n.page);break;case"popup":clearTimeout(this.popupTimer),this.popup={action:n,seq:++this.seq},this.popupTimer=window.setTimeout(()=>this.closePopup(),(n.timeout??30)*1e3);break;case"pause":if(!a||!this.display)return;await a.callWS({type:"ambiframe/display/pause",display_id:this.display.id,paused:!this.paused}),this.showToast(this.paused?d("Weiter geht's"):d("Angehalten"));break;case"dashboard":this.openControl();break}}catch(s){this.showToast(d("Fehlgeschlagen: {error}",{error:String(s?.message??s)}),!0)}};this.touchControl=()=>{this.controlOpen&&(this.controlLeft=this.display?.control.idle??60,clearInterval(this.controlTimer),this.controlTimer=window.setInterval(()=>{this.controlLeft-=1,this.controlLeft<=0&&this.closeControl()},1e3))};this.onPress=e=>{clearTimeout(this.pressTimer),!(!this.touchable||this.menu||this.alarm||this.controlOpen||this.popup||this.ask||e.composedPath().some(a=>a.classList&&["act","nav","mmini","mcard","pip","chip","ov"].some(r=>a.classList.contains(r))))&&(this.pressAt={x:e.clientX,y:e.clientY},this.pressTimer=window.setTimeout(()=>{this.swallowTap=!0,this.openMenu()},700))};this.onPressMove=e=>{this.pressAt&&Math.hypot(e.clientX-this.pressAt.x,e.clientY-this.pressAt.y)>12&&clearTimeout(this.pressTimer)};this.onPressEnd=()=>{clearTimeout(this.pressTimer),this.pressAt=void 0}}get config(){return this.effConfig}set config(e){if(e===this.rawConfig)return;let n=this.effConfig;this.rawConfig=e,this.effConfig=Si(e,this.displayId),this.effFor=`${this.displayId}`,this.requestUpdate("config",n)}get display(){return this.config?.displays.find(e=>e.id===this.displayId)??this.config?.displays[0]}pageById(e){return this.config?.pages.find(n=>n.id===e)}connectedCallback(){super.connectedCallback(),/Home ?Assistant\//.test(navigator.userAgent)&&this.setAttribute("app",""),this.resize=new ResizeObserver(()=>this.measure()),this.resize.observe(this),this.mediaPoll=window.setInterval(()=>this.mediaTick(),15e3),this.miniTicker=window.setInterval(()=>{(this.nowPlaying()||this.miniShown)&&this.requestUpdate(),this.pruneChips()},5e3),this.started&&this.restart()}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect();for(let e of[this.menuTimer,this.pressTimer,this.rotationTimer,this.alarmTimer,this.pipTimer,this.noticeTimer,this.takeoverTimer,this.mediaTimer,this.mediaQueue,this.popupTimer,this.toastTimer])clearTimeout(e);for(let e of[this.shiftTimer,this.controlTimer,this.mediaTicker,this.mediaPoll,this.miniTicker,this.ringTimer])clearInterval(e)}measure(){let e=this.offsetWidth,n=this.offsetHeight;if(!e||!n)return;let a=e/n,r=this.forceOrientation??this.display?.orientation,s=r==="portrait"||r==="landscape"?r:a<1?"portrait":"landscape",o=fo(s,a),l=Math.min(e/o.w,n/o.h);s!==this.orient&&(this.orient=s),(o.w!==this.grid.w||o.h!==this.grid.h)&&(this.grid=o),l>0&&Math.abs(l-this.scale)>5e-4&&(this.scale=l)}willUpdate(e){if(e.has("displayId")&&this.effFor!==`${this.displayId}`&&(e.has("config")||e.set("config",this.effConfig),this.effConfig=Si(this.rawConfig,this.displayId),this.effFor=`${this.displayId}`),Ft(It(this.config?.design.language,this.hass?.language)),(e.has("config")||e.has("forceOrientation")||e.has("displayId"))&&this.measure(),e.has("hass")){this.forecasts.setHass(this.hass);let l=e.get("hass");l&&this.hass&&this.started&&this.processChanges(l,this.hass)}let n=this.display,a=this.config?.design,r=$s(n?.theme??a?.theme);if(this.theme=r.theme,e.has("config")||e.has("preview")||e.has("displayId")||e.has("streamMode")){let l=a?.ambient,c={type:l?.type??ht.find(p=>p.id===r.theme)?.ambient??"none",strength:l?.strength??1,speed:l?.speed??"slow"},h=!this.streamMode&&(n?.ticker??n?.profile!=="tv");this.ctx=this.config?{forecasts:this.forecasts,config:this.config,preview:this.preview,ambient:c,displayId:n?.id,ticker:h}:void 0,e.has("config")&&this.photos.reload()}this.applyMode(r.light),this.updateShift();let s=n?.night?.entity,o=!!s&&this.hass?.states[s]?.state==="on";if(!this.started&&this.hass&&this.config&&n)this.started=!0,this.night=o,this.restart();else if(this.started&&this.fixedPage&&e.has("config")&&!e.has("fixedPage")&&o===this.night){let l=this.pageById(this.fixedPage);l&&(this.layers=this.layers.map(c=>c.leaving?c:{...c,page:l}))}else this.started&&(o!==this.night||e.has("config")||e.has("fixedPage")||e.has("displayId"))&&(this.night=o,this.restart())}applyMode(e){let n=this.config?.design,a=this.hass?.states["sun.sun"]?.state==="below_horizon",r=this.display?.mode??n?.mode??(e?"light":"auto"),s=this.modeOverride??(r==="auto"?a?"dark":"light":r),o=n?.evening!=="off"&&a&&s==="dark";if(s===this.mode){this.modeTimer||(this.evening=o);return}if(!this.started||this.preview){clearTimeout(this.modeTimer),this.modeTimer=void 0,this.dimming=!1,this.mode=s,this.evening=o;return}this.modeTimer||(this.dimming=!0,this.modeTimer=window.setTimeout(()=>{this.modeTimer=void 0,this.dimming=!1,this.requestUpdate(),this.mode=s,this.evening=o},1600))}updated(){let e=this.config?.design,n=(c,h)=>h?this.style.setProperty(c,h):this.style.removeProperty(c),a=e?.colors?.[this.mode]??{},r=(c,h)=>c?`color-mix(in srgb, ${c} ${h}%, transparent)`:void 0,s=this.display?.text_size??e?.text_size??"normal";n("--af-fs",s==="large"?"1.15":s==="xlarge"?"1.3":void 0);let o=(this.display?.contrast??e?.contrast)==="high";n("--af-c2",o?"0.9":void 0),n("--af-c3",o?"0.72":void 0);let l=a.ink??(o?"var(--af-ink)":void 0);n("--af-accent",a.accent??e?.accent),n("--af-accent-soft",r(a.accent??e?.accent,14)),n("--af-bg",a.bg),n("--af-bg-art",a.bg?"none":void 0),n("--af-ink",a.ink),n("--af-ink-2",r(l,o?86:66)),n("--af-ink-3",r(l,o?66:40)),n("--af-line",r(l,o?20:12)),n("--af-surface",r(a.ink,5)),n("--af-card",a.card?r(a.card,Number(a.card_opacity??100)):void 0),n("--af-good",a.good),n("--af-alert",a.alert),n("--af-cold",a.cold),n("--af-card-radius",e?.radius!=null?`${e.radius}px`:void 0),n("--af-display",Oe(e?.fonts?.display)),n("--af-sans",Oe(e?.fonts?.text)),pn(this.renderRoot,e?.css)}transitionFor(e){let n={...Ao,...this.config?.design.transition,...this.display?.transition,...e.transition},a=Math.max(.2,Math.min(10,Number(n.duration)||Ao.duration));return{type:n.type??"fade",duration:this.preview?Math.min(.5,a):a}}restart(){clearTimeout(this.takeoverTimer),this.takeover=void 0,this.idx=-1,this.next()}next(){this.step(1)}prev(){this.step(-1)}browse(e){this.step(e,xc)}step(e,n){clearTimeout(this.rotationTimer);let a=this.display;if(!a||this.takeover)return;if(this.fixedPage){let o=this.pageById(this.fixedPage);o&&this.show(o);return}if(this.night){this.show(this.pageById(a.night?.page)??kc);return}let r=a.playlist,s={display:a.id,orientation:this.orient};for(let o=0;o<r.length;o++){this.idx=(((this.idx<0&&e<0?0:this.idx)+e)%r.length+r.length)%r.length;let l=r[this.idx],c=this.pageById(l.page);if(c&&tt(this.hass,l.show_if,s)&&tt(this.hass,c.show_if,s)){this.show(c),this.paused?this.pausedPage=c.id:this.rotationTimer=window.setTimeout(()=>this.next(),(n??l.duration??c.duration??30)*1e3*this.speed);return}}this.rotationTimer=window.setTimeout(()=>this.next(),6e4)}get currentPageId(){return this.layers.filter(e=>!e.leaving).at(-1)?.page.id}get busy(){return!!(this.alarm||this.pip||this.notice||this.takeover||this.media||this.controlOpen||this.popup||this.ask)}showPage(e){let n=this.pageById(e);if(!n)return;clearTimeout(this.rotationTimer),clearTimeout(this.takeoverTimer),this.takeover=void 0;let a=this.display?.playlist??[],r=a.findIndex(s=>s.page===e);r>=0&&(this.idx=r),this.show(n),this.paused?this.pausedPage=e:this.rotationTimer=window.setTimeout(()=>this.next(),((r>=0?a[r].duration:void 0)??n.duration??30)*1e3*this.speed)}setPaused(e){if(e===this.paused)return;if(this.paused=e,this.requestUpdate(),clearTimeout(this.rotationTimer),e){this.pausedPage=this.currentPageId;return}if(this.pausedPage=void 0,this.takeover||this.night||this.fixedPage)return;let n=this.pageById(this.currentPageId);this.rotationTimer=window.setTimeout(()=>this.next(),(n?.duration??30)*1e3*this.speed)}async show(e){let n=++this.layerSeq,a=null;if(e.background?.type==="photo"&&(a=await this.photos.next(),a&&!await En(a.url)&&(this.photos.reload(),a=await this.photos.next(),a&&!await En(a.url)&&(a=null))),n!==this.layerSeq)return;let r=this.transitionFor(e);this.layers=[...this.layers.filter(s=>!s.leaving).map(s=>({...s,leaving:!0,trans:r})),{key:n,page:e,photo:a,leaving:!1,trans:r}],window.setTimeout(()=>{this.layers=this.layers.filter(s=>!s.leaving||s.key>n)},r.duration*1e3+150),this.dispatchEvent(new CustomEvent("af-page",{detail:e.id,bubbles:!0,composed:!0}))}eventsForDisplay(){let e=this.display;return!e||!this.config?[]:this.config.events.filter(n=>n.enabled!==!1&&(e.events==="all"||e.events.includes(n.id))&&(!n.displays||n.displays.includes(e.id)))}processChanges(e,n){if(this.fixedPage)return;for(let r of this.eventsForDisplay())for(let s of Et(r)){let o=e.states[s],l=n.states[s];if(r.kind==="media"){let c=at(l);c&&c!==at(o)&&this.fire(r,o,l);continue}if(!(!o||!l||o.state===l.state)){if(yo(r,o,l)){this.fire(r,o,l);continue}r.to!=="*"&&(r.kind==="info"&&r.from&&l.state===r.from&&r.reminder_clear!==!1&&this.removeChip(r.id),this.alarm?.ev.id===r.id&&l.state!==r.to&&this.holdAlarm(),this.takeover?.ev.id===r.id&&l.state!==r.to&&this.checkTakeover())}}let a=this.pip?.ev.text;if(this.pip&&a&&n.states[a]!==e.states[a]){let r=this.eventText(this.pip.ev,n);r&&(this.pip={...this.pip,text:r})}}fire(e,n,a){if(e.only_home&&!Object.values(this.hass?.states??{}).some(o=>o.entity_id.startsWith("person.")&&o.state==="home")||!tt(this.hass,e.show_if,{display:this.display?.id,orientation:this.orient}))return;let r=this.inQuiet(e);if(r&&e.quiet_action==="skip")return;let s=e.at_night??e.kind==="alarm";if(this.night&&!s){e.kind==="info"&&(this.addChip(e,new Date),this.remember(e));return}if(e.kind!=="media"&&this.remember(e),e.sound&&e.kind!=="media"&&!r&&!this.displayMuted()&&this.ring(e),e.kind==="media"){a&&e.style!=="mini"&&this.queueMedia(e,a.entity_id);return}if(e.kind==="alarm")this.openAlarm(e);else if(e.kind==="live"){let o=this.pip?.ev.id===e.id,l=this.lastFired.get(e.id)??0;if(!o&&e.cooldown&&Date.now()-l<e.cooldown*1e3)return;this.lastFired.set(e.id,Date.now()),this.openPip(e)}else if(e.kind==="page"){if(!this.openTakeover(e))return}else{let o=a?new Date(a.last_changed):new Date,l=n&&a?o.getTime()-new Date(n.last_changed).getTime():void 0,c=e.cost?parseFloat(this.hass?.states[e.cost]?.state??""):NaN;this.openNotice(e,o,l,Number.isFinite(c)&&c>0?c:null)}Sc()}eventText(e,n=this.hass){if(!e.text)return"";let a=n?.states[e.text],r=e.text_attribute?a?.attributes[e.text_attribute]:a?.state;return r==null||r==="unknown"||r==="unavailable"?"":String(r)}inQuiet(e){return!!(e.quiet?.after||e.quiet?.before)&&et(this.hass,{condition:"time",after:e.quiet.after,before:e.quiet.before})}displayMuted(){if(Date.now()<this.muteUntil)return!0;let e=this.display?.sound;return e?e.mute?!0:!!(e.quiet?.after||e.quiet?.before)&&et(this.hass,{condition:"time",after:e.quiet.after,before:e.quiet.before}):!1}volumeFor(e){return(e.volume??70)*(this.display?.sound?.volume??100)/100}showing(e){return[this.alarm?.ev,this.pip?.ev,this.notice?.ev,this.takeover?.ev].some(n=>n?.id===e.id)}ring(e){clearInterval(this.ringTimer),this.ringFor=e.id;let n=()=>{Jt(e.sound,this.volumeFor(e),{hass:this.hass,library:this.config?.sounds})};n();let a=e.sound_repeat??(e.sound==="alarm"&&e.kind==="alarm"?"loop":"once");if(a==="once")return;let r=a==="loop"?1/0:Number(a)-1,s=Date.now()+12e4;this.ringTimer=window.setInterval(()=>{if(r<=0||Date.now()>s||a==="loop"&&!this.showing(e)){clearInterval(this.ringTimer);return}r-=1,n()},(e.sound_interval??4)*1e3)}testEvent(e){let n=this.config?.events.find(a=>a.id===e);if(n)if(n.sound&&n.kind!=="media"&&this.ring(n),n.kind==="info")this.openNotice(n,new Date,102*6e4,.63);else if(n.kind==="live")this.openPip(n);else if(n.kind==="page")this.openTakeover(n,!0);else if(n.kind==="media"){let a=Et(n).find(r=>at(this.hass?.states[r]));this.openMedia(n,a??Et(n)[0]??"media_player.demo",{force:!0,demo:!a})}else this.openAlarm(n)}secs(e){return Math.max(3,e*this.speed)}openAlarm(e){this.closePip(),this.closeMedia();let n=this.secs(e.max??120);this.alarm={ev:e,at:new Date,secs:n,seq:++this.seq},clearTimeout(this.alarmTimer),this.alarmTimer=window.setTimeout(()=>this.closeAlarm(),n*1e3)}holdAlarm(){if(!this.alarm)return;let e=this.secs(this.alarm.ev.hold_after??30);this.alarm={...this.alarm,secs:e,seq:++this.seq},clearTimeout(this.alarmTimer),this.alarmTimer=window.setTimeout(()=>this.closeAlarm(),e*1e3)}closeAlarm(){clearTimeout(this.alarmTimer),this.alarm&&this.ringFor===this.alarm.ev.id&&(this.alarm.ev.sound_repeat??(this.alarm.ev.sound==="alarm"?"loop":"once"))!=="once"&&(clearInterval(this.ringTimer),ko()),this.alarm=void 0}openPip(e){if(this.alarm)return;this.media?.style==="card"&&this.closeMedia();let n=this.secs(e.duration??30),a=this.pip?.ev.id===e.id?this.pip.text:e.text_attribute&&this.eventText(e)||d("Bewegung erkannt");this.pip={ev:e,at:new Date,secs:n,seq:++this.seq,text:a},clearTimeout(this.pipTimer),this.pipTimer=window.setTimeout(()=>this.closePip(),n*1e3)}closePip(){clearTimeout(this.pipTimer),this.pip=void 0}openNotice(e,n,a,r){let s=this.secs(e.duration??60);this.notice={ev:e,at:n,secs:s,seq:++this.seq,duration:a,cost:r},clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{this.addChip(e,n),this.closeNotice()},s*1e3)}closeNotice(){clearTimeout(this.noticeTimer),this.notice=void 0}openTakeover(e,n=!1){let a=this.pageById(e.page);if(!a)return!1;let r=Date.now(),s=this.takeover?.ev.id===e.id;return!s&&!n&&e.cooldown&&r-(this.lastFired.get(e.id)??0)<e.cooldown*1e3*this.speed?!1:(clearTimeout(this.rotationTimer),this.takeover={ev:e,firstAt:s?this.takeover.firstAt:r,lastAt:r,test:n},this.layers.find(o=>!o.leaving)?.page.id!==a.id&&this.show(a),this.checkTakeover(),!0)}checkTakeover(){let e=this.takeover;if(clearTimeout(this.takeoverTimer),!e)return;let{ev:n}=e,a=Date.now(),r=c=>c*1e3*this.speed,s=e.firstAt+r(n.max??600),o=e.test?[]:Et(n).map(c=>this.hass?.states[c]).filter(c=>!!c),l;if(o.some(c=>c.state===n.to))l=s;else{let c=Math.max(e.lastAt,...o.map(h=>new Date(h.last_changed).getTime()));l=Math.min(s,Math.max(e.lastAt+r(n.duration??60),c+r(n.hold_after??0)))}l-a<50?this.closeTakeover():this.takeoverTimer=window.setTimeout(()=>this.checkTakeover(),l-a)}closeTakeover(){let e=this.takeover;if(!e)return;clearTimeout(this.takeoverTimer),this.lastFired.set(e.ev.id,Date.now()),this.takeover=void 0;let n=this.paused?this.pageById(this.pausedPage):void 0;n?this.show(n):this.next()}queueMedia(e,n){clearTimeout(this.mediaQueue),this.mediaQueue=window.setTimeout(()=>{this.openMedia(e,n)},1500)}async openMedia(e,n,a={}){if(!a.force&&(this.alarm||this.notice||this.controlOpen))return;let r=e.style==="fullscreen"?"fullscreen":"card";if(r==="card"&&this.pip&&!a.force)return;let s=a.demo?wc(n):void 0,o=at(this.hass?.states[n]);!s&&o&&(n=Et(e).find(g=>at(this.hass?.states[g])===o)??n);let l=s??this.hass?.states[n],c=at(l);if(!c||!a.force&&c===this.lastMediaKey&&Date.now()-this.lastMediaAt<45e3)return;this.lastMediaKey=c,this.lastMediaAt=Date.now(),this.mediaShown.set(e.id,Date.now());let h=l.attributes.entity_picture;if(h&&await Promise.race([En(h),new Promise(g=>setTimeout(g,4e3))]),!a.force&&at(this.hass?.states[n])!==c)return;let p=this.secs(e.duration??(r==="fullscreen"?15:12));this.media={ev:e,at:new Date,secs:p,seq:++this.seq,entity:n,style:r,key:c,demo:s},clearTimeout(this.mediaTimer),this.mediaTimer=window.setTimeout(()=>this.closeMedia(),p*1e3),clearInterval(this.mediaTicker),this.mediaTicker=window.setInterval(()=>this.requestUpdate(),1e3)}closeMedia(){clearTimeout(this.mediaTimer),clearInterval(this.mediaTicker),this.media=void 0}mediaTick(){if(!(!this.started||this.fixedPage))for(let e of this.eventsForDisplay()){if(e.kind!=="media"||!e.interval||e.style==="mini")continue;let n=Et(e).map(a=>this.hass?.states[a]).find(a=>at(a));n&&Date.now()-(this.mediaShown.get(e.id)??0)>=e.interval*6e4*this.speed&&(this.lastMediaKey="",this.fire(e,void 0,n))}}addChip(e,n){if(e.reminder==="off"||this.display?.reminders===!1)return;let a=typeof e.reminder=="number"?Date.now()+e.reminder*6e4*this.speed:void 0;this.chips=[...this.chips.filter(r=>r.id!==e.id),{id:e.id,icon:e.icon,text:e.chip??e.title,at:n,until:a}]}renderChips(){if(!this.chips.length||this.alarm)return m;let e=r=>u`<div class="chip" data-id=${r.id}>${ve(r.icon)}<span>${r.text}</span><span class="faint num">${Q(r.at)}</span></div>`,n=this.display?.reminders_stack??3,a=[...this.chips].reverse();return!n||this.chips.length<n?u`<div class="chips">${this.chips.map(e)}</div>`:this.chipsOpen?u`<div class="chips open">
      ${a.map(e)}
      <div class="chip clear" data-clear="1">${ve("close")}<span>${d("Alle entfernen")}</span></div>
      ${this.display?.history===!1?m:u`<div class="chip clear" data-history="1">${ve("bell")}<span>${d("Verlauf")}</span></div>`}
    </div>`:u`<div class="chips stack" data-open="1">
        ${e(a[0])}
        <span class="layer l1"></span><span class="layer l2"></span>
        <span class="count num">${this.chips.length}</span>
      </div>`}toggleChips(e){clearTimeout(this.chipsTimer),this.chipsOpen=e,e&&(this.chipsTimer=window.setTimeout(()=>this.chipsOpen=!1,2e4))}get historyKey(){return`ambiframe-history-${this.display?.id??""}`}loadHistory(){if(this.historyLoaded===this.historyKey)return this.history;this.historyLoaded=this.historyKey;try{this.history=JSON.parse(Eo(this.historyKey)??"[]")}catch{this.history=[]}return this.pruneHistory()}pruneHistory(){let e=Date.now()-(this.display?.history_hours??24)*36e5;return this.history=this.history.filter(n=>n.at>=e).slice(-100),this.history}remember(e){if(this.preview||this.display?.history===!1)return;this.loadHistory();let n=e.title||e.name||e.chip||e.id;this.history=[...this.history,{id:e.id,kind:e.kind,icon:e.icon,title:n,where:e.where||void 0,at:Date.now()}],this.pruneHistory(),ta(this.historyKey,JSON.stringify(this.history))}openHistory(e){clearTimeout(this.historyTimer),this.historyOpen=e,this.toggleChips(!1),e&&(this.historyTimer=window.setTimeout(()=>this.historyOpen=!1,6e4))}renderHistory(){if(!this.historyOpen)return m;let e=[...this.loadHistory()].reverse(),n=r=>{let s=new Date(r),o=new Date,l=Math.round((new Date(o.toDateString()).getTime()-new Date(s.toDateString()).getTime())/864e5);return l===0?d("Heute"):l===1?d("Gestern"):s.toLocaleDateString(X(),{weekday:"long",day:"numeric",month:"long"})},a="";return u`<div class="hcenter" role="dialog" aria-label=${d("Mitteilungen")}>
      <div class="qhead">
        <span>${d("Mitteilungen")}</span>
        <button class="qclose" data-hclose="1" aria-label=${d("Schlie\xDFen")}>${ve("close")}</button>
      </div>
      <div class="hlist">
        ${e.length?e.map(r=>{let s=n(r.at),o=s!==a?u`<div class="hday">${s}</div>`:m;return a=s,u`${o}<div class="hrow">
                  ${ve(r.icon??(r.kind==="alarm"?"bell":r.kind==="live"?"camera":"info"))}
                  <div class="htext"><div>${r.title}</div>${r.where?u`<div class="faint">${r.where}</div>`:m}</div>
                  <span class="faint num">${Q(new Date(r.at))}</span>
                </div>`}):u`<div class="hempty">${d("Keine Mitteilungen")}</div>`}
      </div>
      ${e.length?u`<button class="hclear" data-hclear="1">${d("Verlauf leeren")}</button>`:m}
    </div>`}pruneChips(){let e=Date.now();this.chips.some(n=>n.until&&n.until<=e)&&(this.chips=this.chips.filter(n=>!n.until||n.until>e))}removeChip(e){this.chips=this.chips.filter(n=>n.id!==e)}showToast(e,n=!1){clearTimeout(this.toastTimer),this.toast={text:e,seq:++this.seq,bad:n},this.toastTimer=window.setTimeout(()=>this.toast=void 0,2600)}confirmFirst(e){return new Promise(n=>{let a=window.setTimeout(()=>r(!1),15e3),r=s=>{clearTimeout(a),this.ask=void 0,n(s)};this.ask={text:e,answer:r}})}closePopup(){clearTimeout(this.popupTimer),this.popup=void 0}renderPopup(){let e=this.popup;return e?u`<div class="ov popup">
      <div class="pbox">
        ${e.action.title?u`<div class="ptitle display">${e.action.title}</div>`:m}
        <af-card .hass=${this.hass} .options=${{card:e.action.card}}></af-card>
      </div>
    </div>`:m}renderAsk(){let e=this.ask;return e?u`<div class="ov notice ask">
      <div class="box">
        <h2 class="display">${e.text}</h2>
        <div class="choices">
          <button class="no" @click=${n=>(n.stopPropagation(),e.answer(!1))}>${d("Abbrechen")}</button>
          <button class="yes" @click=${n=>(n.stopPropagation(),e.answer(!0))}>${d("Ja")}</button>
        </div>
      </div>
    </div>`:m}renderToast(){let e=this.toast;return e?Re(e.seq,u`<div class="toast ${e.bad?"bad":""}">${ve(e.bad?"warning":"check")}<span>${e.text}</span></div>`):m}openControl(){let e=this.display?.control;if(!(this.preview||!e?.enabled)){if(this.hasAttribute("app")){$o(e.dashboard??"/lovelace/0",e.idle??60);return}this.closeMedia(),this.controlOpen=!0,this.touchControl()}}closeControl(){clearInterval(this.controlTimer),this.controlOpen=!1}onFrameLoad(e){try{let n=e.target.contentWindow;for(let a of["pointerdown","touchstart","wheel","keydown"])n?.addEventListener(a,this.touchControl,{passive:!0})}catch{}}onTap(e){if(this.swallowTap){this.swallowTap=!1;return}let n=e.composedPath();if(this.menu){n.some(o=>o.classList?.contains("qmenu"))||this.closeMenu();return}let a=o=>n.some(l=>l.classList?.contains(o));if(this.historyOpen){if(n.some(o=>o.dataset?.hclear)){this.history=[],ta(this.historyKey,"[]"),this.requestUpdate();return}(n.some(o=>o.dataset?.hclose)||!n.some(o=>o.classList?.contains("hcenter")))&&this.openHistory(!1);return}if(n.some(o=>o.dataset?.history))return this.openHistory(!0);if(n.some(o=>o.dataset?.open))return this.toggleChips(!0);if(n.some(o=>o.dataset?.clear))return this.chips=[],this.toggleChips(!1);let r=n.find(o=>o.classList?.contains("chip"));if(r){this.removeChip(r.dataset.id??""),this.chipsOpen&&this.toggleChips(this.chips.length>0);return}if(this.ask)return;if(this.popup){a("pbox")||this.closePopup();return}if(this.alarm)return this.closeAlarm();if(this.notice)return this.closeNotice();if(this.media&&(this.media.style==="fullscreen"||a("mcard")))return this.closeMedia();if(a("pip"))return this.closePip();let s=n.find(o=>o.classList?.contains("mmini"));if(s?.dataset.entity){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:s.dataset.entity},bubbles:!0,composed:!0}));return}if(this.display?.control?.mode==="screensaver"&&nr()?.stopScreensaver)return nr().stopScreensaver();this.controlOpen||this.openControl()}renderTimer(e,n){return Re(e.seq,u`<div class="timer"><i style="background:${n};animation-duration:${e.secs}s"></i></div>`)}renderAlarm(){let e=this.alarm;return e?u`<div class="ov alarm">
      ${e.ev.camera?u`<af-camera-view .hass=${this.hass} .entity=${e.ev.camera} .osd=${`DEMO \xB7 ${e.ev.where.toUpperCase()}`}></af-camera-view>
            <div class="shade"></div>
            <div class="live"><i></i>${d("Live")}${e.ev.where?` \xB7 ${e.ev.where}`:""}</div>`:u`<div class="plain"></div>`}
      <div class="msg">
        <div class="bell">${ve(e.ev.icon??"bell")}</div>
        <div><h1 class="display">${e.ev.title}</h1><p class="num">${[e.ev.where,Q(e.at)].filter(Boolean).join(" \xB7 ")}</p></div>
      </div>
      <div class="hint">${d("Tippen zum Schlie\xDFen")}</div>
      ${this.renderTimer(e,"var(--af-alert)")}
    </div>`:m}renderPip(){let e=this.pip;return e?u`<div class="pip">
      <div class="v">
        <af-camera-view .hass=${this.hass} .entity=${e.ev.camera} .osd=${`DEMO \xB7 ${e.ev.title.toUpperCase()}`}></af-camera-view>
        <div class="live small"><i></i>${d("Live")}</div>
      </div>
      <div class="m">
        <div class="r">${ve(e.ev.icon??"cam")}<span>${e.ev.title}</span><span class="tm num">${Q(e.at)}</span></div>
        <div class="q">${e.text===d("Bewegung erkannt")?e.text:`\u201E${e.text}\u201C`}</div>
      </div>
      ${this.renderTimer(e,"var(--af-accent)")}
    </div>`:m}renderNotice(){let e=this.notice;if(!e)return m;let n=[];return e.duration&&e.duration>6e4&&n.push([d("Dauer"),ki(e.duration)]),e.cost!=null&&n.push([d("Kosten"),`${W(e.cost,2)} \u20AC`]),u`<div class="ov notice">
      <div class="box">
        <div class="icw">${ve(e.ev.icon??"info")}</div>
        <h2 class="display">${e.ev.title}</h2>
        <div class="sub">${this.eventText(e.ev)||[e.ev.where,e.ev.kind==="info"&&e.ev.from?d("fertig um {time}",{time:Q(e.at)}):d("seit {time}",{time:Q(e.at)})].filter(Boolean).join(" \xB7 ")}</div>
        ${n.length?u`<div class="stats">${n.map(([a,r])=>u`<div><div class="k">${a}</div><div class="val display num">${r}</div></div>`)}</div>`:m}
        <div class="pill">${d("Erledigt")}</div>
        <div class="fine">${d("Bleibt danach als kleine Erinnerung oben rechts.")}</div>
      </div>
    </div>`}renderMedia(){let e=this.media;if(!e)return m;let n=e.demo??this.hass?.states[e.entity],a=n?.attributes??{},r=a.entity_picture,s=e.ev.where||a.friendly_name||"",o=Number(a.media_duration),l=Number(a.media_position);n?.state==="playing"&&a.media_position_updated_at&&(l+=(Date.now()-new Date(a.media_position_updated_at).getTime())/1e3);let c=o>0&&Number.isFinite(l)?u`<div class="prog">
            <div class="bar"><i style="transform:scaleX(${Math.min(1,Math.max(0,l/o))})"></i></div>
            <div class="times num"><span>${To(Math.min(l,o))}</span><span>${To(o)}</span></div>
          </div>`:m,h=Re(r??e.key,u`<div class="art" style=${r?`background-image:url('${r}')`:""}>${r?m:ve("music")}</div>`),p=Re(e.key,u`<div class="mtext">
        <div class="mlabel">${ve("music")}<span>${n?.state==="paused"?"Pausiert":"L\xE4uft gerade"}${s?` \xB7 ${s}`:""}</span></div>
        <div class="mtitle display">${a.media_title??""}</div>
        ${a.media_artist?u`<div class="martist">${a.media_artist}</div>`:m}
        ${e.style==="fullscreen"&&a.media_album_name&&a.media_album_name!==a.media_title?u`<div class="malbum">${a.media_album_name}</div>`:m}
        ${c}
      </div>`);return e.style==="fullscreen"?u`<div class="ov mfull">
        <div class="mbg ${r?"":"none"}" style=${r?`background-image:url('${r}')`:""}></div>
        <div class="mveil"></div>
        <div class="mwrap">${h}${p}</div>
      </div>`:u`<div class="mcard">${h}${p}</div>`}nowPlaying(){let e=this.findPlaying();return this.miniShown=!!e,e}findPlaying(){if(!(this.fixedPage&&!this.preview))for(let e of this.eventsForDisplay()){if(e.kind!=="media"||e.style!=="mini"||this.night&&!e.at_night||this.inQuiet(e)&&e.quiet_action==="skip"||!tt(this.hass,e.show_if,{display:this.display?.id,orientation:this.orient}))continue;let n=Et(e).map(c=>this.hass?.states[c]).filter(c=>!!c?.attributes.media_title),a=(e.mini_paused??120)*1e3,r=n.find(c=>c.state==="playing"),s=n.find(c=>c.state==="paused"&&Date.now()-new Date(c.last_changed).getTime()<a),o=r??s;if(!o)continue;let l=`${e.id}|${at(o)}`;if(l!==this.miniKey&&(this.miniKey=l,this.miniSince=Date.now()),!(e.mini_duration&&Date.now()-this.miniSince>e.mini_duration*1e3*this.speed))return{ev:e,s:o}}}renderMini(){if(this.media||this.alarm||this.pip||this.takeover||this.controlOpen)return m;if(this.pageById(this.currentPageId)?.widgets.some(g=>g.type==="media"))return m;let e=this.nowPlaying();if(!e)return m;let{ev:n,s:a}=e,r=a.attributes,s=r.entity_picture,o=n.where||r.friendly_name||"",l=Number(r.media_duration),c=Number(r.media_position);a.state==="playing"&&r.media_position_updated_at&&(c+=(Date.now()-new Date(r.media_position_updated_at).getTime())/1e3);let h=`${r.media_title}|${r.media_artist??""}`,p=[`pos-${n.mini_position??"bottom-right"}`,n.mini_size?`size-${n.mini_size}`:"",n.mini_background==="none"?"bare":""].join(" ");return u`<div class="mmini ${a.state} ${p}" data-entity=${a.entity_id}>
      ${n.mini_cover===!1?m:Re(h,u`<div class="art" style=${s?`background-image:url('${s}')`:""}>${s?m:ve("music")}</div>`)}
      ${Re(h,u`<div class="mtext">
          <div class="mlabel">${ve("music")}<span>${a.state==="paused"?d("Pausiert"):d("L\xE4uft gerade")}${o?` \xB7 ${o}`:""}</span></div>
          <div class="mtitle display">${r.media_title??""}</div>
          ${r.media_artist?u`<div class="martist">${r.media_artist}</div>`:m}
          ${n.mini_progress!==!1&&l>0&&Number.isFinite(c)?u`<div class="bar"><i style="transform:scaleX(${Math.min(1,Math.max(0,c/l))})"></i></div>`:m}
        </div>`)}
    </div>`}get touchable(){return!this.preview&&!this.streamMode&&this.display?.control?.enabled!==!1}updateShift(){if(!(!!this.display?.oled&&!this.preview)){clearInterval(this.shiftTimer),this.shiftTimer=void 0,(this.shift[0]||this.shift[1])&&(this.shift=[0,0]);return}if(this.shiftTimer)return;let n=()=>{this.shiftStep=(this.shiftStep+1)%8;let a=this.shiftStep/8*2*Math.PI;this.shift=[Math.round(Math.cos(a)*6),Math.round(Math.sin(a)*6)]};n(),this.shiftTimer=window.setInterval(n,18e4)}openMenu(){this.menu=!0,this.touchMenu()}touchMenu(){clearTimeout(this.menuTimer),this.menuTimer=window.setTimeout(()=>this.closeMenu(),1e4)}closeMenu(){clearTimeout(this.menuTimer),this.menu=!1}fully(){return window.fully}async menuAction(e){this.touchMenu();let n=this.fully();switch(e){case"pause":this.hass&&this.display&&(await this.hass.callWS({type:"ambiframe/display/pause",display_id:this.display.id,paused:!this.paused}).catch(()=>{}),this.showToast(this.paused?d("Weiter geht's"):d("Angehalten")));break;case"next":this.browse(1);break;case"mute":{let a=Date.now()<this.muteUntil;this.muteUntil=a?0:Date.now()+36e5,ta("ambiframe-mute-until",String(this.muteUntil)),this.showToast(a?d("T\xF6ne wieder an"):d("Eine Stunde stumm")),this.requestUpdate();break}case"brighter":case"darker":{let a=Number(n?.getScreenBrightness?.()??150),r=Math.max(5,Math.min(255,Math.round(a+(e==="brighter"?40:-40))));n?.setScreenBrightness?.(r),this.showToast(d("Helligkeit {n} %",{n:Math.round(r/255*100)}));break}case"screen":this.closeMenu(),n?.turnScreenOff?.(!0);break;case"dashboard":this.closeMenu(),this.openControl();break;case"history":this.closeMenu(),this.openHistory(!0);break;case"reload":ta("ambiframe-planned-reload",String(Date.now())),location.reload();break}}renderMenu(){if(!this.menu)return m;let e=this.fully(),n=Date.now()<this.muteUntil,a=[["pause",this.paused?"play":"pause",this.paused?d("Weiter abspielen"):d("Anhalten"),!0],["next","forward",d("N\xE4chste Seite"),!0],["mute",n?"speaker":"mute",n?d("T\xF6ne an"):d("1 Stunde stumm"),!0],["darker","moon",d("Dunkler"),!!e?.setScreenBrightness],["brighter","sun",d("Heller"),!!e?.setScreenBrightness],["screen","moon",d("Bildschirm aus"),!!e?.turnScreenOff],["dashboard","home",d("Dashboard"),this.display?.control?.enabled!==!1],["history","bell",this.loadHistory().length?d("Mitteilungen ({n})",{n:this.history.length}):d("Mitteilungen"),this.display?.history!==!1],["reload","reload",d("Neu laden"),!0]];return u`<div class="qmenu" role="dialog" aria-label=${d("Schnellmen\xFC")}>
      <div class="qhead">
        <span>${this.display?.name??"Ambiframe"}</span>
        <button class="qclose" aria-label=${d("Schlie\xDFen")} @click=${r=>(r.stopPropagation(),this.closeMenu())}>${ve("close")}</button>
      </div>
      <div class="qgrid">
        ${a.filter(([,,,r])=>r).map(([r,s,o])=>u`<button class=${r==="mute"&&n||r==="pause"&&this.paused?"on":""} @click=${l=>(l.stopPropagation(),void this.menuAction(r))}>
              ${ve(s)}<span>${o}</span>
            </button>`)}
      </div>
    </div>`}renderNav(){let e=this.display;if(!(e?.nav??e?.control?.enabled!==!1)||this.streamMode||this.preview||this.fixedPage||this.night||this.takeover)return m;if(this.alarm||this.controlOpen||this.popup||this.ask||this.media?.style==="fullscreen")return m;let a=(r,s)=>{r.stopPropagation(),this.browse(s)};return u`<button class="nav prev" aria-label=${d("Vorherige Seite")} @click=${r=>a(r,-1)}>${ve("back")}</button>
      <button class="nav next" aria-label=${d("N\xE4chste Seite")} @click=${r=>a(r,1)}>${ve("forward")}</button>`}renderControl(){if(!this.controlOpen)return m;let e=!!(this.alarm||this.notice||this.pip);return u`<div class="ov control ${e?"covered":""}">
      <iframe src=${this.display?.control.dashboard??"/lovelace/0"} title="Home Assistant" @load=${this.onFrameLoad}></iframe>
      <div class="back" @click=${()=>this.closeControl()}>${ve("back")}${d("Zur\xFCck zu Ambiframe")} <span class="num">· ${this.controlLeft} s</span></div>
    </div>`}render(){if(!this.config||!this.display)return u`<div class="empty">${d("Kein Display konfiguriert")}</div>`;let e=this.grid;return u`<div
      class="stage ${this.dimming?"dim":""}"
      style="width:${e.w}px;height:${e.h}px;transform:translate(-50%,-50%) scale(${this.scale})${this.display?.oled?`;translate:${this.shift[0]*this.scale}px ${this.shift[1]*this.scale}px;transition:translate 30s linear`:""}"
      @click=${this.onTap}
      @pointerdown=${this.onPress}
      @pointermove=${this.onPressMove}
      @pointerup=${this.onPressEnd}
      @pointercancel=${this.onPressEnd}
      @pointerleave=${this.onPressEnd}
      @contextmenu=${n=>n.preventDefault()}
      @af-action=${this.onAction}
    >
      ${jt(this.layers,n=>n.key,n=>u`<af-page
            class="layer t-${n.trans.type} ${n.leaving?"out":""}"
            style="--t:${n.trans.duration}s"
            .hass=${this.hass}
            .page=${n.page}
            .ctx=${this.ctx}
            .photo=${n.photo}
            .grid=${e}
            .orientation=${this.orient}
          ></af-page>`)}
      ${this.renderChips()}
      ${this.renderMini()} ${this.renderMedia()} ${this.renderPip()} ${this.renderPopup()} ${this.renderNotice()} ${this.renderAlarm()}
      ${this.renderAsk()} ${this.renderToast()} ${this.renderNav()} ${this.renderMenu()} ${this.renderHistory()}
    </div>
    ${this.renderControl()}`}};Pi.properties={hass:{attribute:!1},config:{attribute:!1,noAccessor:!0},displayId:{attribute:"display-id"},streamMode:{type:Boolean,attribute:"stream-mode"},shift:{state:!0},preview:{type:Boolean},fixedPage:{attribute:!1},speed:{type:Number},theme:{reflect:!0},mode:{reflect:!0},modeOverride:{attribute:!1},orient:{reflect:!0},forceOrientation:{attribute:!1},grid:{state:!0},evening:{type:Boolean,reflect:!0},dimming:{state:!0},layers:{state:!0},alarm:{state:!0},pip:{state:!0},notice:{state:!0},media:{state:!0},chips:{state:!0},chipsOpen:{state:!0},historyOpen:{state:!0},controlOpen:{state:!0},controlLeft:{state:!0},popup:{state:!0},ask:{state:!0},menu:{state:!0},toast:{state:!0},scale:{state:!0},night:{state:!0}},Pi.styles=[As,F`
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* Falls doch Ränder bleiben (extreme Seitenverhältnisse): in der Farbe des Stils statt schwarz */
        background: var(--af-bg);
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        /* Android/Fully: kein automatisches Vergrößern einzelner Textblöcke („Text-Autosizing“) */
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      }
      .empty {
        color: #888;
        font: 16px system-ui;
        padding: 24px;
      }
      .stage {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1280px;
        height: 800px;
        background-color: var(--af-bg);
        color: var(--af-ink);
        font-family: var(--af-sans);
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .display {
        font-family: var(--af-display);
        font-weight: var(--af-clock-weight);
        letter-spacing: var(--af-clock-track);
      }
      .num {
        font-variant-numeric: tabular-nums lining-nums;
      }
      .faint {
        color: var(--af-ink-3);
      }
      .ic {
        width: 1em;
        height: 1em;
        flex: none;
      }
      /* Hell/Dunkel-Wechsel: kurz ausblenden statt hart umschalten */
      .stage {
        transition: opacity 1.5s var(--af-ease-soft);
      }
      .stage.dim {
        opacity: 0;
      }

      /*
       * Seitenwechsel (Dauer --t für den ganzen Wechsel). Die alte Seite geht zuerst, die neue kommt
       * überlappend nach – Texte stehen nie gleichzeitig deutlich übereinander.
       */
      .layer {
        /* backwards: nach dem Einblenden keine eigene GPU-Ebene mehr (Android rastert sie sonst teils falsch skaliert) */
        animation: var(--in) calc(var(--t) * 0.62) var(--af-ease-soft) calc(var(--t) * 0.38) backwards;
      }
      .layer.out {
        animation: var(--out) calc(var(--t) * 0.48) var(--af-ease-soft) both;
      }
      .t-fade {
        --in: fade-in;
        --out: fade-out;
      }
      .t-blur {
        --in: blur-in;
        --out: blur-out;
      }
      .t-slide {
        --in: slide-in;
        --out: slide-out;
      }
      .t-zoom {
        --in: zoom-in;
        --out: zoom-out;
      }
      @keyframes fade-in {
        from {
          opacity: 0;
        }
      }
      @keyframes fade-out {
        to {
          opacity: 0;
        }
      }
      @keyframes blur-in {
        from {
          opacity: 0;
          filter: blur(16px);
          transform: scale(1.012);
        }
      }
      @keyframes blur-out {
        to {
          opacity: 0;
          filter: blur(16px);
        }
      }
      @keyframes slide-in {
        from {
          opacity: 0;
          transform: translateX(4%);
        }
      }
      @keyframes slide-out {
        to {
          opacity: 0;
          transform: translateX(-4%);
        }
      }
      @keyframes zoom-in {
        from {
          opacity: 0;
          transform: scale(0.97);
        }
      }
      @keyframes zoom-out {
        to {
          opacity: 0;
          transform: scale(1.03);
        }
      }

      /* Schnellmenü: ruhige Glaskarte unten in der Mitte, große Ziele für Finger */
      .hcenter {
        position: absolute;
        top: 30px;
        right: 40px;
        bottom: 30px;
        z-index: 58;
        width: min(560px, calc(100% - 80px));
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 18px 20px 20px;
        border-radius: 30px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(28px) saturate(1.2);
        -webkit-backdrop-filter: blur(28px) saturate(1.2);
        animation: pip-in 0.5s var(--af-ease) backwards;
      }
      .hlist {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }
      .hday {
        margin: 14px 4px 6px;
        font-size: calc(14px * var(--af-fs, 1));
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .hrow {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 14px;
        margin-bottom: 8px;
        border-radius: 18px;
        background: var(--af-chip);
        border: 1px solid var(--af-line);
        font-size: calc(18px * var(--af-fs, 1));
      }
      .hrow .ic {
        font-size: 24px;
        color: var(--af-accent);
      }
      .htext {
        flex: 1;
        min-width: 0;
      }
      .htext .faint {
        font-size: 0.8em;
      }
      .hempty {
        padding: 40px 0;
        text-align: center;
        color: var(--af-ink-3);
      }
      .hcenter .hclear,
      .hcenter .qclose {
        font: inherit;
        color: var(--af-ink);
        background: var(--af-surface, transparent);
        border: 1px solid var(--af-line);
        border-radius: 999px;
        cursor: pointer;
      }
      .hcenter .hclear {
        margin-top: 12px;
        padding: 10px;
      }
      .qmenu {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        z-index: 58;
        width: min(860px, calc(100% - 80px));
        box-sizing: border-box;
        padding: 18px 20px 20px;
        border-radius: 30px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(28px) saturate(1.2);
        -webkit-backdrop-filter: blur(28px) saturate(1.2);
        animation: pip-in 0.5s var(--af-ease) backwards;
      }
      .qhead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 4px 12px;
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .qgrid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }
      .qmenu button {
        font: inherit;
        color: var(--af-ink);
        background: var(--af-surface, transparent);
        border: 1px solid var(--af-line);
        border-radius: 18px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .qgrid button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 18px 8px 16px;
        font-size: calc(17px * var(--af-fs, 1));
        transition: transform 0.15s var(--af-ease);
      }
      .qgrid button .ic {
        font-size: 30px;
        color: var(--af-ink-2);
      }
      .qgrid button.on .ic {
        color: var(--af-accent);
      }
      .qgrid button:active {
        transform: scale(0.96);
      }
      .qclose {
        width: 40px;
        height: 40px;
        display: grid;
        place-items: center;
        padding: 0;
        font-size: 20px;
      }
      :host([orient="portrait"]) .qgrid {
        grid-template-columns: repeat(3, 1fr);
      }
      /* Pfeile zum Blättern: klein, halb durchsichtig, im freien Rand der unteren Ecken */
      .nav {
        position: absolute;
        bottom: 6px;
        z-index: 24;
        width: 40px;
        height: 40px;
        padding: 0;
        display: grid;
        place-items: center;
        border-radius: 50%;
        border: 1px solid var(--af-line);
        background: var(--af-panel);
        color: var(--af-ink);
        font-size: 20px;
        opacity: 0.28;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition: opacity 0.4s var(--af-ease), transform 0.2s var(--af-ease);
      }
      /* HA-App (Kiosk-Modus auf iPad/iPhone): in einer Ecke liegt das Zahnrad der App – Pfeile mittig an die Seiten */
      :host([app]) .nav {
        bottom: auto;
        top: calc(50% - 20px);
      }
      .nav.prev {
        left: 6px;
      }
      .nav.next {
        right: 6px;
      }
      .nav:active {
        opacity: 0.9;
        transform: scale(0.94);
      }
      .chips {
        position: absolute;
        top: 30px;
        right: 40px;
        display: flex;
        gap: 10px;
        z-index: 20;
      }
      .chip {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 18px 10px 14px;
        border-radius: 999px;
        background: var(--af-chip);
        border: 1px solid var(--af-line);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        font-size: calc(17px * var(--af-fs, 1));
        animation: chip-in 0.6s var(--af-ease) backwards;
        cursor: pointer;
      }
      .chip .ic {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      /* Stapel wie bei iOS: oberste Erinnerung, darunter angedeutete Karten, Zahl in der Ecke */
      .chips.stack {
        position: absolute;
        cursor: pointer;
      }
      .chips.stack .chip {
        position: relative;
        z-index: 2;
      }
      .chips.stack .layer {
        position: absolute;
        left: 10px;
        right: 10px;
        height: 100%;
        border-radius: 999px;
        background: var(--af-chip);
        border: 1px solid var(--af-line);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }
      .chips.stack .l1 {
        top: 9px;
        z-index: 1;
        opacity: 0.85;
        transform: scale(0.95);
      }
      .chips.stack .l2 {
        top: 17px;
        z-index: 0;
        opacity: 0.6;
        transform: scale(0.88);
      }
      .chips.stack .count {
        position: absolute;
        top: -9px;
        right: -9px;
        z-index: 3;
        min-width: 26px;
        height: 26px;
        padding: 0 7px;
        box-sizing: border-box;
        border-radius: 999px;
        display: grid;
        place-items: center;
        font-size: 14px;
        font-weight: 600;
        color: var(--af-bg, #000);
        background: var(--af-accent);
      }
      .chips.open {
        flex-direction: column;
        align-items: flex-end;
      }
      .chip.clear {
        opacity: 0.8;
      }
      @keyframes chip-in {
        from {
          opacity: 0;
          transform: translateY(-8px) scale(0.96);
        }
      }

      .ov {
        position: absolute;
        inset: 0;
        animation: ov-in 0.35s var(--af-ease) backwards;
      }
      @keyframes ov-in {
        from {
          opacity: 0;
        }
      }
      .live {
        position: absolute;
        left: 40px;
        top: 36px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 16px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.42);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        font-size: calc(16px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 500;
        z-index: 2;
      }
      .live.small {
        left: 16px;
        top: 16px;
        font-size: calc(14px * var(--af-fs, 1));
        padding: 7px 12px;
      }
      .live i {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--af-alert);
        animation: blink 1.6s ease-in-out infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0.25;
        }
      }
      .timer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.08);
        z-index: 2;
      }
      .timer i {
        display: block;
        height: 100%;
        transform-origin: left center;
        animation: shrink linear both;
      }
      @keyframes shrink {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(0);
        }
      }

      .alarm {
        z-index: 40;
        background: #000;
      }
      .alarm af-camera-view {
        position: absolute;
        inset: 0;
        animation: cam-in 0.6s var(--af-ease) backwards;
      }
      @keyframes cam-in {
        from {
          transform: scale(1.05);
        }
      }
      .alarm .plain {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse 70% 60% at 30% 70%, rgba(239, 139, 99, 0.22), transparent 70%), var(--af-bg);
      }
      .alarm .shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0) 48%), linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0) 22%);
      }
      .msg {
        position: absolute;
        left: 64px;
        bottom: 66px;
        display: flex;
        align-items: center;
        gap: 34px;
      }
      .bell {
        position: relative;
        width: 96px;
        height: 96px;
        border-radius: 50%;
        background: var(--af-alert);
        color: #22120b;
        display: grid;
        place-items: center;
        font-size: 46px;
        flex: none;
      }
      .bell::before,
      .bell::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 2px solid var(--af-alert);
        animation: ring 2.4s var(--af-ease) infinite;
      }
      .bell::after {
        animation-delay: 1.2s;
      }
      @keyframes ring {
        from {
          transform: scale(1);
          opacity: 0.75;
        }
        to {
          transform: scale(1.9);
          opacity: 0;
        }
      }
      .alarm h1 {
        margin: 0;
        font-size: 84px;
        line-height: 1;
      }
      .alarm p {
        margin: 12px 0 0;
        font-size: calc(24px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .alarm .hint {
        position: absolute;
        right: 56px;
        bottom: 74px;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }

      .pip {
        position: absolute;
        right: 40px;
        bottom: 40px;
        width: 540px;
        z-index: 27;
        border-radius: 30px;
        overflow: hidden;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        animation: pip-in 0.75s var(--af-ease) backwards;
        cursor: pointer;
      }
      @keyframes pip-in {
        from {
          transform: translateX(calc(100% + 64px));
        }
      }
      .pip .v {
        position: relative;
        height: 304px;
      }
      .pip .m {
        padding: 20px 26px 26px;
      }
      .pip .r {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: calc(22px * var(--af-fs, 1));
        font-weight: 500;
      }
      .pip .r .ic {
        color: var(--af-accent);
        font-size: calc(24px * var(--af-fs, 1));
      }
      .pip .tm {
        margin-left: auto;
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        font-weight: 400;
      }
      .pip .q {
        font-size: calc(18px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
      }

      .notice {
        z-index: 30;
        display: grid;
        place-items: center;
        background: var(--af-veil);
        backdrop-filter: blur(22px) saturate(1.1);
        -webkit-backdrop-filter: blur(22px) saturate(1.1);
      }
      .popup {
        z-index: 25;
        display: grid;
        place-items: center;
        background: var(--af-veil);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }
      .pbox {
        width: min(760px, 86%);
        max-height: 86%;
        overflow: auto;
        padding: 28px;
        border-radius: 36px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        animation: box-in 0.5s var(--af-ease) backwards;
      }
      .ptitle {
        font-size: 34px;
        margin: 4px 4px 18px;
      }
      .ask {
        z-index: 45;
      }
      .ask h2 {
        font-size: 40px;
        overflow-wrap: anywhere;
      }
      .choices {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 34px;
      }
      .choices button {
        font: 500 22px/1 var(--af-sans);
        padding: 18px 40px;
        border-radius: 999px;
        border: 1px solid var(--af-line);
        background: transparent;
        color: var(--af-ink);
        cursor: pointer;
      }
      .choices .yes {
        background: var(--af-accent);
        border-color: transparent;
        color: var(--af-bg);
      }
      .toast {
        position: absolute;
        z-index: 60;
        left: 50%;
        bottom: 34px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-radius: 999px;
        background: var(--af-chip);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid var(--af-line);
        color: var(--af-ink);
        font-size: calc(18px * var(--af-fs, 1));
        white-space: nowrap;
        animation: toast 2.6s var(--af-ease) both;
        pointer-events: none;
      }
      .toast .ic {
        color: var(--af-good);
        font-size: calc(20px * var(--af-fs, 1));
      }
      .toast.bad .ic {
        color: var(--af-alert);
      }
      @keyframes toast {
        0% {
          opacity: 0;
          transform: translate(-50%, 10px);
        }
        12%,
        82% {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, 0);
        }
      }
      .box {
        width: 620px;
        padding: 56px 56px 42px;
        border-radius: 44px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        text-align: center;
        animation: box-in 0.6s var(--af-ease) backwards;
      }
      @keyframes box-in {
        from {
          transform: translateY(18px) scale(0.98);
        }
      }
      .icw {
        width: 112px;
        height: 112px;
        margin: 0 auto;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--af-accent-soft);
        color: var(--af-accent);
        font-size: 56px;
      }
      .box h2 {
        margin: 28px 0 0;
        font-size: 56px;
        line-height: 1.05;
      }
      .box .sub {
        font-size: calc(21px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 12px;
      }
      .stats {
        display: flex;
        justify-content: center;
        gap: 64px;
        margin-top: 34px;
      }
      .stats .k {
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--af-ink-3);
      }
      .stats .val {
        font-size: 34px;
        margin-top: 6px;
      }
      .pill {
        display: inline-block;
        margin-top: 38px;
        padding: 17px 44px;
        border-radius: 999px;
        background: var(--af-ink);
        color: var(--af-bg);
        font-size: calc(19px * var(--af-fs, 1));
        font-weight: 500;
        cursor: pointer;
      }
      .fine {
        font-size: calc(16px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 18px;
      }

      /* Musik-Cover: Karte unten rechts (wie das Kamera-Bild-im-Bild) oder Vollbild */
      .mcard {
        position: absolute;
        right: 40px;
        bottom: 40px;
        width: 620px;
        box-sizing: border-box;
        z-index: 27;
        display: flex;
        align-items: center;
        gap: 26px;
        padding: 22px 30px 22px 22px;
        border-radius: 32px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(24px) saturate(1.2);
        -webkit-backdrop-filter: blur(24px) saturate(1.2);
        animation: pip-in 0.75s var(--af-ease) backwards;
        cursor: pointer;
      }
      .art {
        flex: none;
        width: 176px;
        height: 176px;
        border-radius: 20px;
        background-color: var(--af-surface);
        background-image: radial-gradient(circle at 30% 25%, var(--af-accent-soft), transparent 70%);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid var(--af-line);
        display: grid;
        place-items: center;
        color: var(--af-accent);
        font-size: 64px;
        animation: art-in 0.6s var(--af-ease) backwards;
      }
      @keyframes art-in {
        from {
          opacity: 0;
          transform: scale(0.96);
        }
      }
      /* Mini-Karte: klein, ruhig, bleibt während der Wiedergabe */
      .mmini {
        position: absolute;
        right: 32px;
        bottom: 32px;
        width: 440px;
        box-sizing: border-box;
        z-index: 26;
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 14px 22px 14px 14px;
        border-radius: 24px;
        background: var(--af-panel);
        border: 1px solid var(--af-line);
        box-shadow: var(--af-shadow);
        backdrop-filter: blur(24px) saturate(1.2);
        -webkit-backdrop-filter: blur(24px) saturate(1.2);
        animation: pip-in 0.75s var(--af-ease) backwards;
        cursor: pointer;
        transition: opacity 0.6s var(--af-ease);
      }
      .mmini.paused {
        opacity: 0.7;
      }
      /* Optik pro Ereignis: Ecke, Größe, ohne Hintergrund */
      .mmini.pos-bottom-left {
        right: auto;
        left: 32px;
      }
      .mmini.pos-top-right,
      .mmini.pos-top-left {
        bottom: auto;
        top: 32px;
      }
      .mmini.pos-top-left {
        right: auto;
        left: 32px;
      }
      .mmini.size-small {
        zoom: 0.8;
      }
      .mmini.size-large {
        zoom: 1.3;
      }
      .mmini.bare {
        background: none;
        border-color: transparent;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45);
      }
      .mmini .art {
        width: 84px;
        height: 84px;
        border-radius: 14px;
        font-size: 34px;
      }
      .mmini .mlabel {
        font-size: calc(12px * var(--af-fs, 1));
      }
      .mmini .mtitle {
        font-size: 22px;
        margin-top: 6px;
        -webkit-line-clamp: 1;
      }
      .mmini .martist {
        font-size: calc(15px * var(--af-fs, 1));
        margin-top: 3px;
      }
      .mmini .bar {
        margin-top: 10px;
        height: 3px;
      }
      .mtext {
        flex: 1;
        min-width: 0;
        animation: ov-in 0.5s var(--af-ease) backwards;
      }
      .mlabel {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        letter-spacing: 0.14em;
        text-transform: uppercase;
        font-weight: 500;
        color: var(--af-ink-3);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mlabel .ic {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .mtitle {
        font-size: 32px;
        line-height: 1.12;
        margin-top: 10px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .martist {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .malbum {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 6px;
      }
      .prog {
        margin-top: 18px;
      }
      .bar {
        height: 4px;
        border-radius: 2px;
        background: var(--af-line);
        overflow: hidden;
      }
      .bar i {
        display: block;
        height: 100%;
        background: var(--af-ink);
        border-radius: 2px;
        transform-origin: left center;
        transition: transform 1s linear;
      }
      .times {
        display: flex;
        justify-content: space-between;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 8px;
      }
      .mfull {
        z-index: 25;
        background: #000;
        overflow: hidden;
        cursor: pointer;
        /* Über dem unscharfen Cover ist Schrift immer hell */
        --af-ink: #fff;
        --af-ink-2: rgba(255, 255, 255, 0.78);
        --af-ink-3: rgba(255, 255, 255, 0.55);
        --af-line: rgba(255, 255, 255, 0.2);
        color: var(--af-ink);
      }
      .mbg {
        position: absolute;
        inset: -80px;
        background: center / cover no-repeat;
        filter: blur(70px) saturate(1.5) brightness(0.62);
        transform: scale(1.1);
        animation: kb-slow 40s linear both;
      }
      .mbg.none {
        background: radial-gradient(ellipse 60% 70% at 30% 40%, var(--af-accent), transparent 70%), #111;
        filter: blur(40px) brightness(0.5);
      }
      @keyframes kb-slow {
        to {
          transform: scale(1.25) rotate(2deg);
        }
      }
      .mveil {
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.38));
      }
      .mwrap {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        gap: 76px;
        padding: 0 110px;
      }
      .mfull .art {
        width: 470px;
        height: 470px;
        border-radius: 30px;
        font-size: 150px;
        border: 0;
        box-shadow: 0 40px 110px rgba(0, 0, 0, 0.55);
        animation-duration: 0.9s;
      }
      .mfull .mlabel {
        font-size: calc(16px * var(--af-fs, 1));
      }
      .mfull .mtitle {
        font-size: 66px;
        line-height: 1.04;
        margin-top: 18px;
        -webkit-line-clamp: 3;
      }
      .mfull .martist {
        font-size: 30px;
        margin-top: 14px;
      }
      .mfull .prog {
        margin-top: 44px;
      }
      .mfull .bar {
        height: 5px;
      }
      .mfull .times {
        font-size: calc(16px * var(--af-fs, 1));
        margin-top: 10px;
      }

      .control {
        z-index: 26;
        background: var(--af-bg);
        color: var(--af-ink);
        font-family: var(--af-sans);
      }
      .control.covered {
        visibility: hidden;
      }
      .control iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border: 0;
        background: #111;
      }
      .back {
        position: absolute;
        left: 50%;
        bottom: 22px;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 22px;
        border-radius: 999px;
        background: var(--af-chip);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid var(--af-line);
        font-size: calc(17px * var(--af-fs, 1));
        font-weight: 500;
        cursor: pointer;
      }
      .back span {
        color: var(--af-ink-3);
        font-weight: 400;
      }

      /* Hochformat: Overlays auf die schmale Bühne anpassen */
      :host([orient="portrait"]) .msg {
        left: 48px;
        right: 48px;
        bottom: 120px;
        flex-direction: column;
        align-items: flex-start;
        gap: 26px;
      }
      :host([orient="portrait"]) .alarm h1 {
        font-size: 68px;
      }
      :host([orient="portrait"]) .alarm .hint {
        right: auto;
        left: 48px;
        bottom: 56px;
      }
      :host([orient="portrait"]) .pip,
      :host([orient="portrait"]) .mmini {
        left: 32px;
        right: 32px;
        width: auto;
      }
      :host([orient="portrait"]) .mcard {
        right: 32px;
        left: 32px;
        width: auto;
        bottom: 40px;
      }
      :host([orient="portrait"]) .pip .v {
        height: 420px;
      }
      :host([orient="portrait"]) .box {
        width: auto;
        margin: 0 40px;
      }
      :host([orient="portrait"]) .mwrap {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 56px;
        padding: 0 72px;
      }
      :host([orient="portrait"]) .mfull .art {
        width: 560px;
        height: 560px;
        align-self: center;
      }
      :host([orient="portrait"]) .mtext {
        width: 100%;
      }

      @media (prefers-reduced-motion: reduce) {
        .layer,
        .layer.out,
        .pip,
        .mcard,
        .mbg,
        .art,
        .box,
        .alarm af-camera-view,
        .bell::before,
        .bell::after,
        .live i {
          animation-duration: 0.01s;
        }
      }
    `];B("af-display",Pi);var Ii=class extends re{constructor(){super(...arguments);this.reason="";this.weather=""}connectedCallback(){super.connectedCallback();let e=()=>{this.requestUpdate(),this.timer=window.setTimeout(e,6e4-Date.now()%6e4+50)};e()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer)}render(){let e=new Date,n=X(),a=this.weather||Object.keys(this.hass?.states??{}).find(o=>o.startsWith("weather.")),r=a?this.hass?.states[a]:void 0,s=Number(r?.attributes.temperature);return u`<div class="clock">${e.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${e.toLocaleDateString(n,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${r&&r.state!=="unavailable"?u`<div class="weather">
            ${ie(Ce(r.state))}<span>${Number.isFinite(s)?`${Math.round(s)}\xB0`:""} ${Ue(r.state)}</span>
          </div>`:m}
      <div class="note">${ie("info")}<span>${d("Ambiframe \xB7 Notfallmodus")}${this.reason?` \u2013 ${d(this.reason)}`:""}</span></div>`}};Ii.properties={hass:{attribute:!1},reason:{},weather:{}},Ii.styles=F`
    :host {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
      justify-items: center;
      gap: 2vmin;
      background: #0d0d0c;
      color: #ece6da;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      text-align: center;
      -webkit-font-smoothing: antialiased;
    }
    .clock {
      font-size: 26vmin;
      font-weight: 200;
      line-height: 0.9;
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
    }
    .date {
      font-size: 4.6vmin;
      color: rgba(236, 230, 218, 0.72);
    }
    .weather {
      display: flex;
      align-items: center;
      gap: 2vmin;
      margin-top: 3vmin;
      font-size: 4.6vmin;
      color: rgba(236, 230, 218, 0.85);
    }
    .weather .ic {
      width: 6vmin;
      height: 6vmin;
      color: #d6a865;
    }
    .note {
      position: absolute;
      left: 50%;
      bottom: 3vmin;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: max(14px, 2vmin);
      color: rgba(236, 230, 218, 0.45);
      white-space: nowrap;
    }
    .note .ic {
      width: 1.2em;
      height: 1.2em;
    }
  `;B("af-safe",Ii);var ar="2026-10-22T06:29:09.876Z",$c=3e4,Ac=5,Tc=2*6e4,Ec=4,zo=!1,zc=10*6e4,_c=15*6e4,Lc=9e4,_o=(()=>{let t=new URLSearchParams(location.search),i=location.pathname.split("/").filter(Boolean).slice(1).map(decodeURIComponent);return{display:t.get("display")??i[0]??null,stream:t.has("stream")||i[1]==="stream"}})(),qe={get:t=>{try{return localStorage.getItem(t)??localStorage.getItem(t.replace(/^ambiframe-/,"wandbild-"))}catch{return null}},set:(t,i)=>{try{localStorage.setItem(t,i)}catch{}}},Lo=(()=>{let t=qe.get("ambiframe-client");return t||(t=globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,qe.set("ambiframe-client",t)),t})(),Cc=()=>{try{return window.fully?.getDeviceId?.()||null}catch{return null}},Dc=()=>{let t=navigator.userAgent,i=window.fully;if(i){let r="";try{r=i.getDeviceName?.()??""}catch{}return r?`Fully Kiosk \xB7 ${r}`:"Fully Kiosk"}let e=/iPad/.test(t)||/Macintosh/.test(t)&&navigator.maxTouchPoints>1;if(/Home ?Assistant\//.test(t))return e?"HA-App \xB7 iPad":/iPhone/.test(t)?"HA-App \xB7 iPhone":"HA-App";let n=e?"iPad":/iPhone/.test(t)?"iPhone":/Android/.test(t)?"Android":/Mac/.test(t)?"Mac":/Windows/.test(t)?"Windows":"Browser",a=/Edg\//.test(t)?"Edge":/Firefox\//.test(t)?"Firefox":/Chrome\//.test(t)?"Chrome":/Safari\//.test(t)?"Safari":"";return a?`${n} \xB7 ${a}`:n},rr=()=>{let t=document,i=t.fullscreenEnabled??t.webkitFullscreenEnabled??!1,e=t.fullscreenElement??t.webkitFullscreenElement,n=matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,a="fully"in window||/Home Assistant\//.test(navigator.userAgent);return i&&!e&&!n&&!a},Fi=class extends re{constructor(){super(...arguments);this.error="";this.hint=!1;this.displayId="";this.swallowClick=!1;this.connectedTo="";this.paused=!1;this.autoSafe="";this.forcedSafe=!1;this.pendingEvent="";this.urlSafe=new URLSearchParams(location.search).has("safe");this.streamMode=_o.stream;this.configText="";this.errors=[];this.noPageSince=0;this.onError=e=>{let n="reason"in e?e.reason:e.error,a=`${"filename"in e?e.filename:""} ${n?.stack??""}`;if(!/ambiframe/i.test(a))return;let r=Date.now();this.errors=[...this.errors.filter(s=>r-s<Tc),r],this.errors.length>=Ac&&!this.safeReason&&this.enterSafe("Anzeigefehler")};this.watchPage=()=>{if(this.safeReason||!this.config||!this.displayId||document.hidden){this.noPageSince=0;return}if(this.disp?.currentPageId){this.noPageSince=0;return}this.noPageSince||=Date.now(),Date.now()-this.noPageSince>Lc&&this.enterSafe("keine Seite sichtbar",5*6e4)};this.onPointerDown=e=>{if(rr()){if(!this.displayId){this.goFullscreen();return}e.stopPropagation(),this.swallowClick=!0,this.goFullscreen()}};this.onClick=e=>{this.swallowClick&&(this.swallowClick=!1,e.stopPropagation())};this.onFullscreenChange=()=>{this.hint=rr()};this.onPage=()=>{this.report()};this.onVisibility=()=>{this.report()}}get safeReason(){return this.urlSafe?"per Link (?safe=1)":this.forcedSafe?"aus Home Assistant eingeschaltet":this.autoSafe}enterSafe(e,n=_c){this.autoSafe||(this.autoSafe=e,this.report(),clearTimeout(this.safeTimer),this.safeTimer=window.setTimeout(()=>this.leaveSafe(),n))}leaveSafe(){clearTimeout(this.safeTimer),this.autoSafe="",this.errors=[],this.noPageSince=0,this.report()}checkStartLoop(){if(zo)return;zo=!0;let e=Date.now(),n=Number(qe.get("ambiframe-planned-reload")??0);if(qe.set("ambiframe-planned-reload","0"),e-n<2*6e4)return;let a=[];try{a=JSON.parse(qe.get("ambiframe-starts")??"[]")}catch{a=[]}a=[...a.filter(r=>typeof r=="number"&&e-r<zc),e],qe.set("ambiframe-starts",JSON.stringify(a)),a.length>=Ec&&this.enterSafe("startet immer wieder neu")}get disp(){return this.renderRoot.querySelector("af-display")}connectedCallback(){super.connectedCallback(),this.hint=!this.streamMode&&rr(),this.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),this.addEventListener("click",this.onClick,{capture:!0}),this.addEventListener("af-page",this.onPage),document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),document.addEventListener("visibilitychange",this.onVisibility),window.addEventListener("error",this.onError),window.addEventListener("unhandledrejection",this.onError),this.watchTimer=window.setInterval(this.watchPage,15e3),this.streamMode||this.checkStartLoop()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),this.removeEventListener("click",this.onClick,{capture:!0}),this.removeEventListener("af-page",this.onPage),document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange),document.removeEventListener("visibilitychange",this.onVisibility),window.removeEventListener("error",this.onError),window.removeEventListener("unhandledrejection",this.onError),clearInterval(this.watchTimer),clearTimeout(this.safeTimer),this.unsub?.then(e=>e?.()),this.unsub=void 0,this.disconnectDisplay(),clearTimeout(this.reloadTimer)}goFullscreen(){let e=document.documentElement;try{let n=e.requestFullscreen?.bind(e)??e.webkitRequestFullscreen?.bind(e);Promise.resolve(n?.()).catch(()=>{})}catch{}}resolveDisplay(e){let n=e.displays.map(s=>s.id),a=this.display||_o.display;if(a&&n.includes(a))return a;let r=qe.get("ambiframe-display");return!a&&r&&n.includes(r)?r:n.length!==1?"":(qe.set("ambiframe-display",n[0]),n[0])}choose(e){qe.set("ambiframe-display",e);let n=new URL(location.href);n.searchParams.set("display",e),history.replaceState(history.state,"",n),this.displayId=e}updated(){this.hass&&!this.unsub&&(this.unsub=this.hass.connection.subscribeMessage(e=>{let n=JSON.stringify(e.config);n!==this.configText&&(this.configText=n,this.config=e.config);let a=this.resolveDisplay(e.config);a!==this.displayId&&(this.displayId=a),this.autoSafe==="Ambiframe nicht erreichbar"&&this.leaveSafe()},{type:"ambiframe/config/subscribe"}).catch(e=>{console.warn("Ambiframe nicht erreichbar:",e?.message??e),this.enterSafe("Ambiframe nicht erreichbar",6e4),window.setTimeout(()=>{this.unsub=void 0,this.requestUpdate()},6e4)})),this.hass&&this.displayId!==this.connectedTo&&this.connectDisplay(),this.disp?.setPaused(this.paused),this.firePending()}firePending(){let e=this.pendingEvent&&this.config?.events.find(n=>n.id===this.pendingEvent);!this.disp||!e||(this.pendingEvent="",this.disp.fire(e))}connectDisplay(){this.disconnectDisplay();let e=this.displayId;this.connectedTo=e,!(!this.hass||!e)&&(this.connection=this.hass.connection.subscribeMessage(n=>this.onCommand(n),{type:"ambiframe/display/connect",display_id:e,client_id:Lo,name:this.streamMode?d("Videostream"):Dc(),version:ar,fully:Cc(),origin:location.origin}).catch(()=>{}),this.heartbeat=window.setInterval(()=>{this.report()},$c))}disconnectDisplay(){clearInterval(this.heartbeat),this.connection?.then(e=>e?.()),this.connection=void 0,this.connectedTo=""}async report(){if(!(!this.hass||!this.connectedTo))try{let e=await this.hass.callWS({type:"ambiframe/display/report",display_id:this.connectedTo,client_id:Lo,page:this.disp?.currentPageId??null,hidden:document.hidden,version:ar,safe:this.safeReason||null});this.checkVersion(e?.version)}catch{}}onCommand(e){let n=this.disp;switch(e.command){case"hello":this.forcedSafe=!!e.safe,this.paused=!!e.paused,n?.setPaused(this.paused),this.checkVersion(e.version),this.report();break;case"show_page":n?.showPage(e.page);break;case"next":n?.next();break;case"pause":case"resume":this.paused=e.command==="pause",n?.setPaused(this.paused);break;case"reload":this.reloadWhenIdle();break;case"event":this.pendingEvent=e.id,this.firePending();break;case"safe":this.forcedSafe=e.on,e.on||this.leaveSafe(),this.report();break}}checkVersion(e){if(!(!e||e===ar)){try{if(sessionStorage.getItem("ambiframe-reloaded-for")===e)return;sessionStorage.setItem("ambiframe-reloaded-for",e)}catch{}this.reloadWhenIdle()}}reloadWhenIdle(){if(clearTimeout(this.reloadTimer),document.hidden&&!this.streamMode){let a=()=>{document.hidden||(document.removeEventListener("visibilitychange",a),this.reloadWhenIdle())};document.addEventListener("visibilitychange",a);return}if(this.disp?.busy){this.reloadTimer=window.setTimeout(()=>this.reloadWhenIdle(),1e4);return}let e=fetch(import.meta.url,{cache:"reload"}).catch(()=>{}),n=new Promise(a=>setTimeout(a,8e3));Promise.race([e,n]).then(()=>{qe.set("ambiframe-planned-reload",String(Date.now())),location.reload()})}get safeWeather(){for(let e of this.config?.pages??[]){let n=e.widgets?.find(a=>a.type==="weather"&&a.options?.entity);if(n)return String(n.options.entity)}return""}render(){return Ft(It(Si(this.config,this.displayId)?.design.language,this.hass?.language)),this.safeReason?u`<af-safe .hass=${this.hass} .reason=${this.safeReason} .weather=${this.safeWeather}></af-safe>`:this.error?u`<div class="error">${this.error}</div>`:this.config&&!this.displayId?u`<div class="pick">
        <h1>${d("Welches Display ist das?")}</h1>
        <p>${d("Die Wahl wird auf diesem Ger\xE4t gespeichert.")}</p>
        <div class="list">${this.config.displays.map(e=>u`<button @click=${()=>this.choose(e.id)}>${e.name}</button>`)}</div>
      </div>`:u`${this.hint?u`<div class="hint">${d("Einmal tippen f\xFCr Vollbild")}</div>`:m}
      <af-display .hass=${this.hass} .config=${this.config} display-id=${this.displayId} ?stream-mode=${this.streamMode}></af-display>`}};Fi.properties={hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},display:{attribute:!1},config:{state:!0},error:{state:!0},hint:{state:!0},displayId:{state:!0},autoSafe:{state:!0},forcedSafe:{state:!0}},Fi.styles=F`
    :host {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: block;
      background: #000;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
    af-display {
      width: 100%;
      height: 100%;
    }
    .error {
      color: #ddd;
      font: 18px/1.5 system-ui, sans-serif;
      padding: 48px;
    }
    .hint {
      position: absolute;
      left: 50%;
      top: 22px;
      transform: translateX(-50%);
      z-index: 2;
      padding: 10px 18px;
      border-radius: 999px;
      background: rgba(10, 10, 10, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.82);
      font: 15px system-ui, sans-serif;
      pointer-events: none;
      animation: hint 7s ease both;
    }
    @keyframes hint {
      0%,
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    /* Auswahl beim ersten Öffnen, wenn es mehrere Displays gibt */
    .pick {
      position: absolute;
      inset: 0;
      display: grid;
      place-content: center;
      gap: 28px;
      padding: 32px;
      color: #f2efe8;
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      background: radial-gradient(ellipse 70% 60% at 50% 30%, #1d1c19, #0a0a0a);
    }
    .pick h1 {
      margin: 0;
      font-weight: 300;
      font-size: clamp(28px, 4vw, 44px);
    }
    .pick p {
      margin: 0;
      color: rgba(242, 239, 232, 0.6);
      font-size: 17px;
    }
    .pick .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
    }
    .pick button {
      font: 500 20px system-ui, -apple-system, sans-serif;
      color: inherit;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 20px;
      padding: 22px 34px;
      min-width: 200px;
      cursor: pointer;
    }
  `;B("ambiframe-display-panel",Fi);var ee=Symbol("NOT_RESOLVED");function Se(t,i){return{tagName:t,nodeKind:"scalar",implicit:i.implicit??!1,matchByTagPrefix:i.matchByTagPrefix??!1,implicitFirstChars:i.implicitFirstChars??null,resolve:i.resolve,identify:i.identify,represent:i.represent??(e=>String(e)),representTagName:i.representTagName??(()=>t)}}function xr(t,i){let e=i.finalize===void 0;return{tagName:t,nodeKind:"sequence",implicit:!1,matchByTagPrefix:i.matchByTagPrefix??!1,create:i.create,addItem:i.addItem,finalize:i.finalize??(n=>n),carrierIsResult:e,identify:i.identify,represent:i.represent??(n=>n),representTagName:i.representTagName??(()=>t)}}function oa(t,i){let e=i.finalize===void 0;return{tagName:t,nodeKind:"mapping",implicit:!1,matchByTagPrefix:i.matchByTagPrefix??!1,create:i.create,addPair:i.addPair,has:i.has,keys:i.keys,get:i.get,finalize:i.finalize??(n=>n),carrierIsResult:e,identify:i.identify,represent:i.represent??(n=>n),representTagName:i.representTagName??(()=>t)}}var Nc=Se("tag:yaml.org,2002:str",{resolve:t=>t,identify:t=>typeof t=="string"}),Mc=["","~","null","Null","NULL"],Pc=Se("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:t=>Mc.indexOf(t)!==-1?null:ee,identify:t=>t===null,represent:()=>"null"}),Ic=Se("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(t,i)=>t==="null"||i&&t===""?null:ee,identify:t=>t===null,represent:()=>"null"}),Fc=["","~","null","Null","NULL"],Bc=Se("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:t=>Fc.indexOf(t)!==-1?null:ee,identify:t=>t===null,represent:()=>"null"}),Oc=["true","True","TRUE"],Wc=["false","False","FALSE"],Hc=Se("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:t=>Oc.indexOf(t)!==-1?!0:Wc.indexOf(t)!==-1?!1:ee,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),Rc=["true"],Kc=["false"],Vc=Se("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:t=>Rc.indexOf(t)!==-1?!0:Kc.indexOf(t)!==-1?!1:ee,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),jc=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],Gc=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Uc=Se("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:t=>jc.indexOf(t)!==-1?!0:Gc.indexOf(t)!==-1?!1:ee,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),qc=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Zc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Yc(t){let i=t,e=1;return(i[0]==="-"||i[0]==="+")&&(i[0]==="-"&&(e=-1),i=i.slice(1)),i.startsWith("0b")?e*parseInt(i.slice(2),2):i.startsWith("0o")?e*parseInt(i.slice(2),8):i.startsWith("0x")?e*parseInt(i.slice(2),16):e*parseInt(i,10)}function Qc(t,i){if(i){if(!Zc.test(t))return ee}else if(!qc.test(t))return ee;let e=Yc(t);return Number.isFinite(e)?e:ee}var Uo=Se("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Qc,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),Jc=new RegExp("^-?(?:0|[1-9][0-9]*)$"),Xc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function eu(t){let i=t,e=1;return(i[0]==="-"||i[0]==="+")&&(i[0]==="-"&&(e=-1),i=i.slice(1)),i.startsWith("0b")?e*parseInt(i.slice(2),2):i.startsWith("0o")?e*parseInt(i.slice(2),8):i.startsWith("0x")?e*parseInt(i.slice(2),16):e*parseInt(i,10)}function tu(t,i){if(i){if(!Xc.test(t))return ee}else if(!Jc.test(t))return ee;let e=eu(t);return Number.isFinite(e)?e:ee}var iu=Se("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:tu,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),nu=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function au(t){let i=t.replace(/_/g,""),e=1;if((i[0]==="-"||i[0]==="+")&&(i[0]==="-"&&(e=-1),i=i.slice(1)),i.startsWith("0b"))return e*parseInt(i.slice(2),2);if(i.startsWith("0x"))return e*parseInt(i.slice(2),16);if(i.includes(":")){let n=0;for(let a of i.split(":"))n=n*60+Number(a);return e*n}return i!=="0"&&i[0]==="0"?e*parseInt(i,8):e*parseInt(i,10)}function ru(t){if(!nu.test(t))return ee;let i=au(t);return Number.isFinite(i)?i:ee}var hr=Se("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:ru,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),su=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),ou=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function lu(t){if(!su.test(t))return ee;let i=t.toLowerCase(),e=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;let n=e*parseFloat(i);return Number.isFinite(n)||ou.test(t)?n:ee}function du(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let i=t.toString(10);return/^[-+]?[0-9]+e/.test(i)?i.replace("e",".e"):i}var qo=Se("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:lu,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:du}),cu=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),uu=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function hu(t,i){if(i){if(!uu.test(t))return ee;let n=t.toLowerCase(),a=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return a===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;let r=a*parseFloat(n);return Number.isFinite(r)?r:ee}if(!cu.test(t))return ee;let e=Number(t);return Number.isFinite(e)?e:ee}function pu(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let i=t.toString(10);return/^[-+]?[0-9]+e/.test(i)?i.replace("e",".e"):i}var mu=Se("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:hu,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:pu}),gu=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),fu=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function bu(t){if(!gu.test(t))return ee;let i=t.toLowerCase().replace(/_/g,""),e=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;let n=0;if(i.includes(":")){for(let a of i.split(":"))n=n*60+Number(a);n*=e}else n=e*parseFloat(i);return Number.isFinite(n)||fu.test(t)?n:ee}function vu(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let i=t.toString(10);return/^[-+]?[0-9]+e/.test(i)?i.replace("e",".e"):i}var pr=Se("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:bu,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:vu}),yu=Se("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(t,i)=>t==="<<"||i&&t===""?"<<":ee,identify:()=>!1}),wu=/^[A-Za-z0-9+/]*={0,2}$/;function ku(t){let i=t.replace(/\s/g,"");if(i.length%4!==0||!wu.test(i))return ee;let e=atob(i),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return n}function xu(t){let i="";for(let e=0;e<t.length;e++)i+=String.fromCharCode(t[e]);return btoa(i)}var Su=Se("tag:yaml.org,2002:binary",{resolve:ku,identify:t=>Object.prototype.toString.call(t)==="[object Uint8Array]",represent:xu}),$u=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Au=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Co(t,i,e,n=0,a=0,r=0,s=0){let o=new Date(Date.UTC(t,i,e,n,a,r,s));return o.setUTCFullYear(t,i,e),o}function Tu(t){let i=$u.exec(t);if(i===null&&(i=Au.exec(t)),i===null)return ee;let e=+i[1],n=+i[2]-1,a=+i[3];if(!i[4]){let h=Co(e,n,a);return h.getUTCFullYear()!==e||h.getUTCMonth()!==n||h.getUTCDate()!==a?ee:h}let r=+i[4],s=+i[5],o=+i[6],l=0;if(r>23||s>59||o>59)return ee;if(i[7]){let h=i[7].slice(0,3);for(;h.length<3;)h+="0";l=+h}let c=Co(e,n,a,r,s,o,l);if(c.getUTCFullYear()!==e||c.getUTCMonth()!==n||c.getUTCDate()!==a)return ee;if(i[9]){let h=+i[10],p=+(i[11]||0);if(h>23||p>59)return ee;let g=(h*60+p)*6e4;c.setTime(c.getTime()-(i[9]==="-"?-g:g))}return c}var Eu=Se("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:Tu,identify:t=>t instanceof Date,represent:t=>t.toISOString()}),zu=xr("tag:yaml.org,2002:seq",{create:()=>[],addItem:(t,i)=>{t.push(i)},identify:Array.isArray});function la(t){if(t===null||typeof t!="object"||Array.isArray(t))return!1;let i=Object.getPrototypeOf(t);return i===null||i===Object.prototype}function mr(t,i){let e={};for(let n of i)t[n]!==void 0&&(e[n]=t[n]);return e}var _u=xr("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(t,i)=>{let e;if(i instanceof Map){if(i.size!==1)return"cannot resolve an ordered map item";e=i.keys().next().value}else if(la(i)){let n=Object.keys(i);if(n.length!==1)return"cannot resolve an ordered map item";e=n[0]}else return"cannot resolve an ordered map item";return t.seen.has(e)?"duplicate key in ordered map":(t.seen.add(e),t.list.push(i),"")},finalize:t=>t.list,identify:()=>!1}),Lu=xr("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(t,i)=>{if(i instanceof Map)return i.size!==1?"cannot resolve a pairs item":(t.push(i.entries().next().value),"");if(Object.prototype.toString.call(i)!=="[object Object]")return"cannot resolve a pairs item";let e=i,n=Object.keys(e);return n.length!==1?"cannot resolve a pairs item":(t.push([n[0],e[n[0]]]),"")},identify:()=>!1}),Cu=oa("tag:yaml.org,2002:map",{create:()=>({}),identify:la,represent:t=>{let i=new Map;for(let e of Object.keys(t))i.set(e,t[e]);return i},addPair:(t,i,e)=>{if(i!==null&&typeof i=="object")return"object-based map does not support complex keys";let n=String(i);return n==="__proto__"?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,""},has:(t,i)=>i!==null&&typeof i=="object"?!1:Object.prototype.hasOwnProperty.call(t,String(i)),keys:t=>Object.keys(t),get:(t,i)=>{let e=String(i);return Object.prototype.hasOwnProperty.call(t,e)?t[e]:null}}),Du=oa("tag:yaml.org,2002:set",{create:()=>new Set,identify:t=>t instanceof Set,represent:t=>{let i=new Map;for(let e of t)i.set(e,null);return i},addPair:(t,i,e)=>e!==null?"cannot resolve a set item":(t.add(i),""),has:(t,i)=>t.has(i),keys:t=>t.keys(),get:()=>null});function Nu(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Mu(){return{scalar:[],sequence:[],mapping:[]}}function Pu(t){let i=[];for(let e of t){let n=i.length;for(let a=0;a<i.length;a++){let r=i[a];if(r.nodeKind===e.nodeKind&&r.tagName===e.tagName&&r.matchByTagPrefix===e.matchByTagPrefix){n=a;break}}i[n]=e}return i}var da=class Zo{constructor(i){Be(this,"tags");Be(this,"implicitScalarTags");Be(this,"implicitScalarByFirstChar");Be(this,"implicitScalarAnyFirstChar");Be(this,"defaultScalarTag");Be(this,"defaultSequenceTag");Be(this,"defaultMappingTag");Be(this,"exact");Be(this,"prefix");let e=Pu(i),n=[],a=Nu(),r=Mu();for(let h of e){if(h.nodeKind==="scalar"&&h.implicit){if(h.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");n.push(h)}switch(h.nodeKind){case"scalar":h.matchByTagPrefix?r.scalar.push(h):a.scalar[h.tagName]=h;break;case"sequence":h.matchByTagPrefix?r.sequence.push(h):a.sequence[h.tagName]=h;break;case"mapping":h.matchByTagPrefix?r.mapping.push(h):a.mapping[h.tagName]=h;break}}let s=n.filter(h=>h.implicitFirstChars===null),o=new Set;for(let h of n)if(h.implicitFirstChars!==null)for(let p of h.implicitFirstChars)o.add(p);let l=new Map;for(let h of o)l.set(h,n.filter(p=>p.implicitFirstChars===null||p.implicitFirstChars.indexOf(h)!==-1));let c=a.scalar["tag:yaml.org,2002:str"];if(!c)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=e,this.implicitScalarTags=n,this.implicitScalarByFirstChar=l,this.implicitScalarAnyFirstChar=s,this.defaultScalarTag=c,this.defaultSequenceTag=a.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=a.mapping["tag:yaml.org,2002:map"],this.exact=a,this.prefix=r}lookupScalarTag(i){let e=this.exact.scalar[i];if(e)return e;for(let n of this.prefix.scalar)if(i.startsWith(n.tagName))return n}lookupSequenceTag(i){let e=this.exact.sequence[i];if(e)return e;for(let n of this.prefix.sequence)if(i.startsWith(n.tagName))return n}lookupMappingTag(i){let e=this.exact.mapping[i];if(e)return e;for(let n of this.prefix.mapping)if(i.startsWith(n.tagName))return n}resolveImplicitScalarTag(i){let e=this.implicitScalarByFirstChar.get(i.charAt(0))??this.implicitScalarAnyFirstChar;for(let a of e){let r=a.resolve(i,!1,a.tagName);if(r!==ee)return{value:r,tag:a}}let n=this.defaultScalarTag;return{value:n.resolve(i,!1,n.tagName),tag:n}}withTags(...i){let e=[];for(let n of i)e=e.concat(n);return new Zo([...this.tags,...e])}},Sr=new da([Nc,zu,Cu]),ov=new da([...Sr.tags,Ic,Vc,iu,mu]),Iu=new da([...Sr.tags,Pc,Hc,Uo,qo]),Fu=new da([...Sr.tags,Bc,Uc,hr,pr,Eu,yu,Su,_u,Lu,Du]),Bu=Fu.withTags({...hr,resolve:(t,i,e)=>{let n=hr.resolve(t,i,e);return n===ee?Uo.resolve(t,i,e):n}},{...pr,resolve:(t,i,e)=>{let n=pr.resolve(t,i,e);return n===ee?qo.resolve(t,i,e):n}}),lv=oa("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(t,i,e)=>(t.set(i,e),""),has:(t,i)=>t.has(i),keys:t=>t.keys(),get:(t,i)=>t.get(i),identify:t=>t instanceof Map||la(t),represent:t=>{if(t instanceof Map)return t;let i=new Map,e=t;for(let n of Object.keys(e))i.set(n,e[n]);return i}});function Do(t){if(Array.isArray(t)){let i=Array.prototype.slice.call(t);for(let e=0;e<i.length;e++){if(Array.isArray(i[e]))return null;typeof i[e]=="object"&&Object.prototype.toString.call(i[e])==="[object Object]"&&(i[e]="[object Object]")}return String(i)}return typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"?"[object Object]":String(t)}var dv=oa("tag:yaml.org,2002:map",{create:()=>({}),identify:la,represent:t=>{let i=new Map;for(let e of Object.keys(t))i.set(e,t[e]);return i},addPair:(t,i,e)=>{let n=Do(i);return n===null?"nested arrays are not supported inside keys":(n==="__proto__"?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,"")},has:(t,i)=>{let e=Do(i);return e!==null&&Object.prototype.hasOwnProperty.call(t,e)},keys:t=>Object.keys(t),get:(t,i)=>{let e=String(i);return Object.prototype.hasOwnProperty.call(t,e)?t[e]:null}}),Ou={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function sr(t,i,e,n,a){let r="",s="",o=Math.floor(a/2)-1;return n-i>o&&(r=" ... ",i=n-o+r.length),e-n>o&&(s=" ...",e=n+o-s.length),{str:r+t.slice(i,e).replace(/\t/g,"\u2192")+s,pos:n-i+r.length}}function or(t,i){return" ".repeat(Math.max(i-t.length,0))+t}function Wu(t,i){if(!t.buffer)return null;let e={...Ou,...i},n=/\r?\n|\r|\0/g,a=[0],r=[],s,o=-1;for(;s=n.exec(t.buffer);)r.push(s.index),a.push(s.index+s[0].length),t.position<=s.index&&o<0&&(o=a.length-2);o<0&&(o=a.length-1);let l="",c=Math.min(t.line+e.linesAfter,r.length).toString().length,h=e.maxLength-(e.indent+c+3);for(let g=1;g<=e.linesBefore&&!(o-g<0);g++){let b=sr(t.buffer,a[o-g],r[o-g],t.position-(a[o]-a[o-g]),h);l=`${" ".repeat(e.indent)}${or((t.line-g+1).toString(),c)} | ${b.str}
${l}`}let p=sr(t.buffer,a[o],r[o],t.position,h);l+=`${" ".repeat(e.indent)}${or((t.line+1).toString(),c)} | ${p.str}
`,l+=`${"-".repeat(e.indent+c+3+p.pos)}^
`;for(let g=1;g<=e.linesAfter&&!(o+g>=r.length);g++){let b=sr(t.buffer,a[o+g],r[o+g],t.position-(a[o]-a[o+g]),h);l+=`${" ".repeat(e.indent)}${or((t.line+g+1).toString(),c)} | ${b.str}
`}return l.replace(/\n$/,"")}function No(t,i){let e="";return t.mark?(t.mark.name&&(e+=`in "${t.mark.name}" `),e+=`(${t.mark.line+1}:${t.mark.column+1})`,!i&&t.mark.snippet&&(e+=`

${t.mark.snippet}`),`${t.reason} ${e}`):t.reason}var gt=class Yo extends Error{constructor(e,n){super();Be(this,"reason");Be(this,"mark");this.name="YAMLException",this.reason=e,this.mark=n,this.message=No(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${No(this,e)}`}static throwAt(e,n,a,r=""){let s=0,o=0;for(let c=0;c<n;c++){let h=e.charCodeAt(c);h===10?(s++,o=c+1):h===13&&(s++,e.charCodeAt(c+1)===10&&c++,o=c+1)}let l={name:r,buffer:e,position:n,line:s,column:n-o};throw l.snippet=Wu(l),new Yo(a,l)}},he={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},K={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},_e={BLOCK:1,FLOW:2},Ne={CLIP:1,STRIP:2,KEEP:3},Hu=-1;function Mo(t){switch(t){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Qo=new Array(256),Jo=new Array(256);for(let t=0;t<256;t++)Qo[t]=Mo(t)?1:0,Jo[t]=Mo(t);function Ru(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}function Ku(t){return t>=48&&t<=57?t-48:(t|32)-97+10}function Vu(t){return t===120?2:t===117?4:8}function na(t,i,e){let n=0;for(;i<e;){let a=t.charCodeAt(i);if(a===10)n++,i++;else if(a===13)n++,i++,t.charCodeAt(i)===10&&i++;else if(a===32||a===9)i++;else break}return{position:i,breaks:n}}function $r(t){return t===1?" ":`
`.repeat(t-1)}function ju(t,i,e){let n="",a=i,r=i,s=i;for(;a<e;){let o=t.charCodeAt(a);if(o===10||o===13){n+=t.slice(r,s);let l=na(t,a,e);n+=$r(l.breaks),a=r=s=l.position}else a++,o!==32&&o!==9&&(s=a)}return n+t.slice(r,s)}function Gu(t,i,e){let n="",a=i,r=i,s=i;for(;a<e;){let o=t.charCodeAt(a);if(o===39)n+=t.slice(r,a)+"'",a+=2,r=s=a;else if(o===10||o===13){n+=t.slice(r,s);let l=na(t,a,e);n+=$r(l.breaks),a=r=s=l.position}else a++,o!==32&&o!==9&&(s=a)}return n+t.slice(r,e)}function Uu(t,i,e){let n="",a=i,r=i,s=i;for(;a<e;){let o=t.charCodeAt(a);if(o===92){n+=t.slice(r,a),a++;let l=t.charCodeAt(a);if(l===10||l===13)a=na(t,a,e).position;else if(l<256&&Qo[l])n+=Jo[l],a++;else{let c=Vu(l),h=0;for(;c>0;c--){a++;let p=Ku(t.charCodeAt(a));h=(h<<4)+p}n+=Ru(h),a++}r=s=a}else if(o===10||o===13){n+=t.slice(r,s);let l=na(t,a,e);n+=$r(l.breaks),a=r=s=l.position}else a++,o!==32&&o!==9&&(s=a)}return n+t.slice(r,e)}function Po(t,i,e,n,a,r){let s=n<0?0:n,o=t.slice(i,e).replace(/\r\n?/g,`
`),l=o===""?[]:(o.endsWith(`
`)?o.slice(0,-1):o).split(`
`),c="",h=!1,p=0,g=!1;for(let b of l){let f=0;for(;f<s&&b.charCodeAt(f)===32;)f++;if(n<0||f>=b.length){p++;continue}let v=b.slice(s),$=v.charCodeAt(0);r?$===32||$===9?(g=!0,c+=`
`.repeat(h?1+p:p)):g?(g=!1,c+=`
`.repeat(p+1)):p===0?h&&(c+=" "):c+=`
`.repeat(p):c+=`
`.repeat(h?1+p:p),c+=v,h=!0,p=0}return a===Ne.KEEP?c+=`
`.repeat(h?1+p:p):a!==Ne.STRIP&&h&&(c+=`
`),c}function qu(t,i){if(i.valueStart===Hu)return"";let{valueStart:e,valueEnd:n}=i;if(i.fast)return t.slice(e,n);switch(i.style){case K.SINGLE_QUOTED:return Gu(t,e,n);case K.DOUBLE_QUOTED:return Uu(t,e,n);case K.LITERAL_BLOCK:return Po(t,e,n,i.indent,i.chomping,!1);case K.FOLDED_BLOCK:return Po(t,e,n,i.indent,i.chomping,!0);default:return ju(t,e,n)}}var Zu=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"});function lr(t){return encodeURI(t).replace(/!/g,"%21")}function Xo(t,i){if(t.startsWith("!<")&&t.endsWith(">"))return decodeURIComponent(t.slice(2,-1));let e=t.indexOf("!",1),n=e===-1?"!":t.slice(0,e+1),a=i?.[n]??Zu[n]??n;return decodeURIComponent(a)+decodeURIComponent(t.slice(n.length))}function el(t){let i=t;return i.charCodeAt(0)===33?(i=i.slice(1),`!${lr(i)}`):i.slice(0,18)==="tag:yaml.org,2002:"?`!!${lr(i.slice(18))}`:`!<${lr(i)}>`}var Xt=-1,Yu="tag:yaml.org,2002:merge",Ar={filename:"",schema:Iu,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Qu(t){return"tagStart"in t&&t.tagStart!==Xt?t.tagStart:"anchorStart"in t&&t.anchorStart!==Xt?t.anchorStart:"valueStart"in t&&t.valueStart!==Xt?t.valueStart:"start"in t?t.start:0}function we(t,i){gt.throwAt(t.source,t.position,i,t.filename)}function tl(t,i,e,n){try{return e.finalize(n)}catch(a){if(a instanceof gt)throw a;gt.throwAt(t.source,i,a instanceof Error?a.message:String(a),t.filename)}}function Ju(t,i){let e=qu(t.source,i),n=i.tagStart===Xt?"":t.source.slice(i.tagStart,i.tagEnd),a=t.schema.defaultScalarTag;if(n!==""){if(n==="!")return{value:e,tag:a};let r=Xo(n,t.tagHandlers),s=t.schema.lookupScalarTag(r);if(s){let l=s.resolve(e,!0,r);return l===ee&&we(t,`cannot resolve a node with !<${r}> explicit tag`),{value:l,tag:s}}let o=t.schema.lookupMappingTag(r)??t.schema.lookupSequenceTag(r);if(o){e!==""&&we(t,`cannot resolve a node with !<${r}> explicit tag`);let l=o.create(r);return{value:o.carrierIsResult?l:tl(t,t.position,o,l),tag:o}}we(t,`unknown scalar tag !<${r}>`)}return i.style===K.PLAIN?t.schema.resolveImplicitScalarTag(e):{value:a.resolve(e,!1,a.tagName),tag:a}}function Io(t,i,e){let n=i.tagStart===Xt?"":t.source.slice(i.tagStart,i.tagEnd);return n===""||n==="!"?e:Xo(n,t.tagHandlers)}function il(t){return t.nodeKind==="mapping"}function Fo(t){t.totalMergeKeys++,t.maxTotalMergeKeys!==-1&&t.totalMergeKeys>t.maxTotalMergeKeys&&we(t,`merge keys exceeded maxTotalMergeKeys (${t.maxTotalMergeKeys})`)}function Bo(t,i,e,n){Fo(t);for(let a of n.keys(e)){if(Fo(t),i.tag.has(i.value,a))continue;let r=i.tag.addPair(i.value,a,n.get(e,a));r&&we(t,r),i.overridable??=new Set,i.overridable.add(a)}}function Xu(t,i,e,n){if(t.position=i.keyPosition,il(n))Bo(t,i,e,n);else if(n.nodeKind==="sequence"&&Array.isArray(e)){e.length>100&&we(t,"abnormal merge sequence size");for(let a of e){let r=t.nodeTags.get(a);r||we(t,"cannot merge mappings; the provided source object is unacceptable"),Bo(t,i,a,r)}}else we(t,"cannot merge mappings; the provided source object is unacceptable")}function eh(t,i,e,n,a){if(t.position=i.keyPosition,i.keyIsMerge){Xu(t,i,n,a);return}!t.json&&i.tag.has(i.value,e)&&!i.overridable?.has(e)&&we(t,"duplicated mapping key");let r=i.tag.addPair(i.value,e,n);r&&we(t,r),i.overridable?.delete(e)}function dr(t,i,e){let n=t.frames[t.frames.length-1];if(n.kind==="document")n.value=i,n.hasValue=!0;else if(n.kind==="sequence"){il(e)&&t.nodeTags.set(i,e);let a=n.tag.addItem(n.value,i,n.index++);a&&we(t,a)}else if(n.hasKey){let a=n.key;n.key=void 0,n.hasKey=!1,eh(t,n,a,i,e)}else n.key=i,n.keyPosition=t.position,n.hasKey=!0,n.keyIsMerge=e.tagName===Yu}function cr(t,i,e,n,a){if(i.anchorStart!==Xt){let r={value:e,tag:n,isValueFinal:a};return t.anchors.set(t.source.slice(i.anchorStart,i.anchorEnd),r),r}return null}function th(t,i){let e={...Ar,...i,events:t,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;e.eventIndex<e.events.length;){let n=e.events[e.eventIndex++];switch(e.position=Qu(n),n.type){case he.DOCUMENT:e.anchors=new Map,e.nodeTags=new Map,e.aliasCount=0,e.tagHandlers=Object.create(null);for(let a of n.directives)a.kind==="tag"&&(e.tagHandlers[a.handle]=a.prefix);e.frames.push({kind:"document",position:e.position,value:void 0,hasValue:!1});break;case he.SCALAR:{let{value:a,tag:r}=Ju(e,n);cr(e,n,a,r,!0),dr(e,a,r);break}case he.SEQUENCE:{let a=Io(e,n,"tag:yaml.org,2002:seq"),r=e.schema.lookupSequenceTag(a);r||we(e,`unknown sequence tag !<${a}>`);let s=r.create(a),o=cr(e,n,s,r,r.carrierIsResult);e.frames.push({kind:"sequence",position:e.position,value:s,tag:r,anchor:o,index:0});break}case he.MAPPING:{let a=Io(e,n,"tag:yaml.org,2002:map"),r=e.schema.lookupMappingTag(a);r||we(e,`unknown mapping tag !<${a}>`);let s=r.create(a),o=cr(e,n,s,r,r.carrierIsResult);e.frames.push({kind:"mapping",position:e.position,value:s,tag:r,anchor:o,key:void 0,keyPosition:e.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case he.ALIAS:{e.maxAliases!==-1&&++e.aliasCount>e.maxAliases&&we(e,`aliases exceeded maxAliases (${e.maxAliases})`);let a=e.source.slice(n.anchorStart,n.anchorEnd),r=e.anchors.get(a);r||we(e,`unidentified alias "${a}"`),r.isValueFinal||we(e,`recursive alias "${a}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),dr(e,r.value,r.tag);break}case he.POP:{let a=e.frames.pop();if(a.kind==="mapping"&&a.hasKey&&(e.position=a.keyPosition,we(e,"incomplete mapping pair in event stream")),a.kind==="document")e.documents.push(a.value);else{let r=a.tag.carrierIsResult?a.value:tl(e,a.position,a.tag,a.value);a.anchor&&(a.anchor.value=r,a.anchor.isValueFinal=!0),dr(e,r,a.tag)}break}}}return e.documents}var te=-1,nl=Object.prototype.hasOwnProperty,ni=1,al=2,rl=3,aa=4,ih=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,nh=/[,\[\]{}]/,sl=/^(?:!|!!|![0-9A-Za-z-]+!)$/,gr=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,ol=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,ah=new RegExp(`^(?:${gr})*$`),rh=new RegExp(`^(?:${ol})+$`),sh=new RegExp(`^(?:!(?:${gr})*|${ol}(?:${gr})*)$`),Tr={filename:"",maxDepth:100};function oh(t,i,e){t.events.push({type:he.DOCUMENT,explicitStart:i,explicitEnd:e,directives:t.directives})}function ll(t,i,e,n,a,r,s){t.events.push({type:he.SEQUENCE,start:i,anchorStart:e,anchorEnd:n,tagStart:a,tagEnd:r,style:s})}function dl(t,i,e,n,a,r,s){t.events.push({type:he.MAPPING,start:i,anchorStart:e,anchorEnd:n,tagStart:a,tagEnd:r,style:s})}function Oo(t,i){t.events.splice(i.eventsLength,0,{type:he.MAPPING,start:i.position,anchorStart:te,anchorEnd:te,tagStart:te,tagEnd:te,style:_e.FLOW})}function si(t,i,e,n,a,r,s,o,l=Ne.CLIP,c=-1,h=!1){t.events.push({type:he.SCALAR,valueStart:i,valueEnd:e,anchorStart:n,anchorEnd:a,tagStart:r,tagEnd:s,style:o,chomping:l,indent:c,fast:h})}function lh(t,i,e){t.events.push({type:he.ALIAS,anchorStart:i,anchorEnd:e})}function ei(t){t.events.push({type:he.POP})}function Te(t){si(t,te,te,te,te,te,te,K.PLAIN)}function Wo(){return{anchorStart:te,anchorEnd:te,tagStart:te,tagEnd:te}}function ti(t){return{position:t.position,line:t.line,lineStart:t.lineStart,lineIndent:t.lineIndent,firstTabInLine:t.firstTabInLine,eventsLength:t.events.length}}function ii(t,i){t.position=i.position,t.line=i.line,t.lineStart=i.lineStart,t.lineIndent=i.lineIndent,t.firstTabInLine=i.firstTabInLine,t.events.length=i.eventsLength}function R(t,i){gt.throwAt(t.input.slice(0,t.length),t.position,i,t.filename)}function ye(t){return t===10||t===13}function oi(t){return t===9||t===32}function Ge(t){return oi(t)||ye(t)}function rt(t){return t===0||Ge(t)}function _t(t){return t===44||t===91||t===93||t===123||t===125}function dh(t){return t>=48&&t<=57?t-48:-1}function ch(t){if(t>=48&&t<=57)return t-48;let i=t|32;return i>=97&&i<=102?i-97+10:-1}function uh(t){return t===120?2:t===117?4:t===85?8:0}function hh(t){return t===48||t===97||t===98||t===116||t===9||t===110||t===118||t===102||t===114||t===101||t===32||t===34||t===47||t===92||t===78||t===95||t===76||t===80}function ra(t){t.input.charCodeAt(t.position)===10?t.position++:(t.position++,t.input.charCodeAt(t.position)===10&&t.position++),t.line++,t.lineStart=t.position,t.lineIndent=0,t.firstTabInLine=-1}function xe(t,i){let e=0,n=t.input.charCodeAt(t.position),a=t.position===t.lineStart||Ge(t.input.charCodeAt(t.position-1));for(;n!==0;){for(;oi(n);)a=!0,n===9&&t.firstTabInLine===-1&&(t.firstTabInLine=t.position),n=t.input.charCodeAt(++t.position);if(i&&a&&n===35)do n=t.input.charCodeAt(++t.position);while(!ye(n)&&n!==0);if(!ye(n))break;for(ra(t),e++,a=!0,n=t.input.charCodeAt(t.position);n===32;)t.lineIndent++,n=t.input.charCodeAt(++t.position)}return e}function ai(t,i=t.position){let e=t.input.charCodeAt(i);if((e===45||e===46)&&e===t.input.charCodeAt(i+1)&&e===t.input.charCodeAt(i+2)){let n=t.input.charCodeAt(i+3);return n===0||Ge(n)}return!1}function cl(t){t.position===t.lineStart&&t.input.charCodeAt(t.position)===65279&&(t.position++,t.lineStart=t.position)}function Er(t){if(t.position!==t.lineStart)return!1;if(ai(t))return!0;if(t.input.charCodeAt(t.position)!==65279)return!1;let i=ti(t);cl(t),xe(t,!0);let e=t.input.charCodeAt(t.position),n=t.position===t.lineStart&&(e===37||e===45&&ai(t));return ii(t,i),n}function Ho(t){let i=t.input.charCodeAt(t.position);for(;i!==0&&!ye(i);)i=t.input.charCodeAt(++t.position)}function ul(t,i,e){ih.test(t.input.slice(i,e))&&R(t,"the stream contains non-printable characters")}function ph(t,i,e){if(t.input.charCodeAt(t.position)!==33)return!1;i.tagStart!==te&&R(t,"duplication of a tag property");let n=t.position,a=!1,r=!1,s="!",o=t.input.charCodeAt(++t.position);o===60?(a=!0,o=t.input.charCodeAt(++t.position)):o===33&&(r=!0,s="!!",o=t.input.charCodeAt(++t.position));let l=t.position,c;if(a){for(;o!==0&&o!==62;)o=t.input.charCodeAt(++t.position);o!==62&&R(t,"unexpected end of the stream within a verbatim tag"),c=t.input.slice(l,t.position),t.position++}else{for(;o!==0&&!Ge(o)&&!(e&&_t(o));)o===33&&(r?R(t,"tag suffix cannot contain exclamation marks"):(s=t.input.slice(l-1,t.position+1),sl.test(s)||R(t,"named tag handle cannot contain such characters"),r=!0,l=t.position+1)),o=t.input.charCodeAt(++t.position);c=t.input.slice(l,t.position),nh.test(c)&&R(t,"tag suffix cannot contain flow indicator characters")}return c&&!(a?ah.test(c):rh.test(c))&&R(t,`tag name cannot contain such characters: ${c}`),!a&&s!=="!"&&s!=="!!"&&!nl.call(t.tagHandlers,s)&&R(t,`undeclared tag handle "${s}"`),i.tagStart=n,i.tagEnd=t.position,!0}function mh(t,i){if(t.input.charCodeAt(t.position)!==38)return!1;i.anchorStart!==te&&R(t,"duplication of an anchor property"),t.position++;let e=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position))&&!_t(t.input.charCodeAt(t.position));)t.position++;return t.position===e&&R(t,"name of an anchor node must contain at least one character"),i.anchorStart=e,i.anchorEnd=t.position,!0}function gh(t,i){if(t.input.charCodeAt(t.position)!==42)return!1;(i.anchorStart!==te||i.tagStart!==te)&&R(t,"alias node should not have any properties"),t.position++;let e=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position))&&!_t(t.input.charCodeAt(t.position));)t.position++;return t.position===e&&R(t,"name of an alias node must contain at least one character"),lh(t,e,t.position),!0}function fr(t,i){xe(t,!1),t.lineIndent<i&&R(t,"deficient indentation")}function fh(t,i,e){if(t.input.charCodeAt(t.position)!==39)return!1;t.position++;let n=t.position,a=!0;for(;t.input.charCodeAt(t.position)!==0;){let r=t.input.charCodeAt(t.position);if(r===39){if(t.input.charCodeAt(t.position+1)===39){a=!1,t.position+=2;continue}let s=t.position;return t.position++,si(t,n,s,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,K.SINGLE_QUOTED,Ne.CLIP,-1,a),!0}ye(r)?(a=!1,fr(t,i)):t.position===t.lineStart&&ai(t)?R(t,"unexpected end of the document within a single quoted scalar"):r!==9&&r<32?R(t,"expected valid JSON character"):t.position++}R(t,"unexpected end of the stream within a single quoted scalar")}function bh(t,i,e){if(t.input.charCodeAt(t.position)!==34)return!1;t.position++;let n=t.position,a=!0;for(;t.input.charCodeAt(t.position)!==0;){let r=t.input.charCodeAt(t.position);if(r===34){let s=t.position;return t.position++,si(t,n,s,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,K.DOUBLE_QUOTED,Ne.CLIP,-1,a),!0}if(r===92){a=!1;let s=t.input.charCodeAt(++t.position);if(ye(s))fr(t,i);else if(hh(s))t.position++;else{let o=uh(s);for(o===0&&R(t,"unknown escape sequence");o-- >0;)t.position++,ch(t.input.charCodeAt(t.position))<0&&R(t,"expected hexadecimal character");t.position++}}else ye(r)?(a=!1,fr(t,i)):t.position===t.lineStart&&ai(t)?R(t,"unexpected end of the document within a double quoted scalar"):r!==9&&r<32?R(t,"expected valid JSON character"):t.position++}R(t,"unexpected end of the stream within a double quoted scalar")}function vh(t,i,e){let n=t.input.charCodeAt(t.position),a=Ne.CLIP,r=-1,s=!1;if(n!==124&&n!==62)return!1;let o=n===124?K.LITERAL_BLOCK:K.FOLDED_BLOCK;for(t.position++;t.input.charCodeAt(t.position)!==0;){let b=t.input.charCodeAt(t.position),f=dh(b);if(b===43||b===45)a!==Ne.CLIP&&R(t,"repeat of a chomping mode identifier"),a=b===43?Ne.KEEP:Ne.STRIP,t.position++;else if(f>=0)f===0&&R(t,"bad explicit indentation width of a block scalar; it cannot be less than one"),s&&R(t,"repeat of an indentation width identifier"),r=i+f-1,s=!0,t.position++;else break}let l=!1;for(;oi(t.input.charCodeAt(t.position));)l=!0,t.position++;l&&t.input.charCodeAt(t.position)===35&&Ho(t),ye(t.input.charCodeAt(t.position))?ra(t):t.input.charCodeAt(t.position)!==0&&R(t,"a line break is expected");let c=s?r:-1,h=0,p=t.position,g=t.position;for(;t.input.charCodeAt(t.position)!==0;){let b=t.position,f=0;for(;t.input.charCodeAt(b+f)===32;)f++;let v=t.input.charCodeAt(b+f);if(v===0){c>=0?f>c&&(g=b+f):f>0&&(g=b+f);break}if(Er(t))break;if(!s&&c===-1&&ye(v)&&(h=Math.max(h,f)),!s&&c===-1&&!ye(v)&&(v===9&&f<i&&(t.position=b+f,R(t,"tab characters must not be used in indentation")),f>=i&&f<h&&(t.position=b+f,R(t,"bad indentation of a mapping entry"))),c===-1&&v!==0&&!ye(v)&&f<i){t.lineIndent=f,t.position=b+f;break}!s&&v!==0&&!ye(v)&&c===-1&&(c=f);let $=c===-1?i+1:c;if(v!==0&&!ye(v)&&f<$){t.lineIndent=f,t.position=b+f;break}Ho(t),g=t.position,ye(t.input.charCodeAt(t.position))&&(ra(t),g=t.position)}return ul(t,p,g),si(t,p,g,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,o,a,c),!0}function yh(t,i){let e=t.input.charCodeAt(t.position),n=i===ni;if(e===0||Ge(e)||e===35||e===38||e===42||e===33||e===124||e===62||e===39||e===34||e===37||e===64||e===96||n&&_t(e))return!1;if(e===63||e===45){let a=t.input.charCodeAt(t.position+1);if(rt(a)||n&&_t(a))return!1}return!0}function wh(t,i,e,n){if(!yh(t,e))return!1;let a=t.position,r=t.position,s=t.input.charCodeAt(t.position),o=e===ni,l=!1;for(;s!==0&&!Er(t);){if(s===58){let c=t.input.charCodeAt(t.position+1);if(rt(c)||o&&_t(c))break}else if(s===35){if(Ge(t.input.charCodeAt(t.position-1)))break}else{if(o&&_t(s))break;if(ye(s)){let c=t.position,h=t.line,p=t.lineStart,g=t.lineIndent;if(xe(t,!1),t.lineIndent>=i){l=!0,s=t.input.charCodeAt(t.position);continue}t.position=c,t.line=h,t.lineStart=p,t.lineIndent=g;break}}oi(s)||(r=t.position+1),s=t.input.charCodeAt(++t.position)}return r===a?!1:(ul(t,a,r),si(t,a,r,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,K.PLAIN,Ne.CLIP,-1,!l),!0)}function Bi(t,i){let e=t.line;xe(t,!0),(t.line>e&&t.lineIndent<i||t.firstTabInLine!==-1&&t.lineIndent<i)&&R(t,"deficient indentation")}function kh(t,i,e){let n=t.input.charCodeAt(t.position),a=n===123,r=t.position,s=!0;if(n!==91&&n!==123)return!1;let o=a?125:93;for(a?dl(t,r,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,_e.FLOW):ll(t,r,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,_e.FLOW),t.position++;t.input.charCodeAt(t.position)!==0;){Bi(t,i);let l=t.input.charCodeAt(t.position);if(l===o)return t.position++,ei(t),!0;s?l===44&&R(t,"expected the node content, but found ','"):R(t,"missed comma between flow collection entries");let c=!1,h=!1;l===63&&Ge(t.input.charCodeAt(t.position+1))&&(c=h=!0,t.position+=1,Bi(t,i));let p=t.line,g=ti(t),b=ri(t,i,ni,!1,!0);Bi(t,i),l=t.input.charCodeAt(t.position),(a||h||t.line===p)&&l===58?(c=!0,t.position++,Bi(t,i),a||Oo(t,g),b||Te(t),ri(t,i,ni,!1,!0)||Te(t),Bi(t,i),a||ei(t)):a&&c?(b||Te(t),Te(t)):a?Te(t):c&&(Oo(t,g),b||Te(t),Te(t),ei(t)),l=t.input.charCodeAt(t.position),l===44?(s=!0,t.position++):s=!1}R(t,"unexpected end of the stream within a flow collection")}function Ro(t,i,e){if(t.firstTabInLine!==-1||t.input.charCodeAt(t.position)!==45||!rt(t.input.charCodeAt(t.position+1)))return!1;for(ll(t,t.position,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,_e.BLOCK);t.input.charCodeAt(t.position)===45&&rt(t.input.charCodeAt(t.position+1));){t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,R(t,"tab characters must not be used in indentation"));let n=t.line;t.position++;let a=xe(t,!0)>0;if(t.firstTabInLine!==-1&&t.input.charCodeAt(t.position)===45&&rt(t.input.charCodeAt(t.position+1))&&R(t,"bad indentation of a sequence entry"),a&&t.lineIndent<=i?Te(t):ri(t,i,rl,!1,!0),xe(t,!0),t.lineIndent<i||t.position>=t.length)break;t.lineIndent>i&&R(t,"bad indentation of a sequence entry"),t.line===n&&t.input.charCodeAt(t.position)===45&&rt(t.input.charCodeAt(t.position+1))&&R(t,"bad indentation of a sequence entry")}return ei(t),!0}function ur(t,i,e,n){let a=!1,r=!1,s=!1,o=!1;if(t.firstTabInLine!==-1)return!1;let l=t.input.charCodeAt(t.position);for(;l!==0;){!a&&t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,R(t,"tab characters must not be used in indentation"));let c=t.input.charCodeAt(t.position+1),h=t.line;if((l===63||l===58)&&rt(c))s||(dl(t,t.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,_e.BLOCK),s=!0),l===63?(a&&Te(t),r=!0,a=!0):(a||(Te(t),r=!0),a=!1),t.position+=1,o=!0;else{a&&(Te(t),a=!1);let p=ti(t);if(!ri(t,e,al,!1,!0))break;if(t.line===h){for(l=t.input.charCodeAt(t.position);oi(l);)l=t.input.charCodeAt(++t.position);if(l===58)l=t.input.charCodeAt(++t.position),rt(l)||R(t,"a whitespace character is expected after the key-value separator within a block mapping"),s||(t.events.splice(p.eventsLength,0,{type:he.MAPPING,start:p.position,anchorStart:n.anchorStart,anchorEnd:n.anchorEnd,tagStart:n.tagStart,tagEnd:n.tagEnd,style:_e.BLOCK}),s=!0),r=!0,a=!1,o=!1;else if(r)R(t,"expected ':' after a mapping key");else return n.anchorStart!==te||n.tagStart!==te?(ii(t,p),!1):!0}else if(r)R(t,"can not read a block mapping entry; a multiline key may not be an implicit key");else return n.anchorStart!==te||n.tagStart!==te?(ii(t,p),!1):!0}if(ri(t,i,aa,!0,o)&&(o=!1),a||o&&(Te(t),o=!1),xe(t,!0),l=t.input.charCodeAt(t.position),(t.line===h||t.lineIndent>i)&&l!==0)R(t,"bad indentation of a mapping entry");else if(t.lineIndent<i)break}return r?(a&&Te(t),s&&ei(t),!0):!1}function ri(t,i,e,n,a,r=!0){t.depth>=t.maxDepth&&R(t,`nesting exceeded maxDepth (${t.maxDepth})`),t.depth++;let s=1,o=!1,l=!1,c=null,h=Wo(),p=e===aa||e===rl,g=p,b=p;if(n&&xe(t,!0)&&(o=!0,t.lineIndent>i?s=1:t.lineIndent===i?s=0:s=-1),s===1)for(;;){let f=t.input.charCodeAt(t.position),v=ti(t);if(o&&s!==1&&(f===33||f===38))break;if(o&&b&&(h.tagStart!==te||h.anchorStart!==te)&&(f===33||f===38)){let $=ti(t),P=i+1;if(ur(t,t.position-t.lineStart,P,h)&&t.events[$.eventsLength]?.type===he.MAPPING)return t.depth--,!0;ii(t,$)}if(o&&(f===33&&h.tagStart!==te||f===38&&h.anchorStart!==te)||!ph(t,h,e===ni)&&!mh(t,h))break;c===null&&(c=v),xe(t,!0)?(o=!0,g=b,t.lineIndent>i?s=1:t.lineIndent===i?s=0:s=-1):g=!1}if(g&&(g=o||a),s===1||e===aa){let f=e===ni||e===al?i:i+1,v=t.position-t.lineStart;if(s===1)if(g&&(Ro(t,v,h)||ur(t,v,f,h))||kh(t,f,h))l=!0;else{let $=t.input.charCodeAt(t.position);if(c!==null&&r&&b&&!g&&$!==124&&$!==62){let P=ti(t),T=c.position-c.lineStart;ii(t,c),ur(t,T,f,Wo())&&t.events[P.eventsLength]?.type===he.MAPPING?l=!0:ii(t,P)}!l&&(p&&vh(t,f,h)||fh(t,f,h)||bh(t,f,h)||gh(t,h)||wh(t,f,e,h))&&(l=!0)}else s===0&&(l=g&&Ro(t,v,h))}return p=p&&!l,!l&&(h.anchorStart!==te||h.tagStart!==te||p)&&(si(t,te,te,h.anchorStart,h.anchorEnd,h.tagStart,h.tagEnd,K.PLAIN),l=!0),t.depth--,l||h.anchorStart!==te||h.tagStart!==te}function xh(t){if(t.lineIndent>0||t.input.charCodeAt(t.position)!==37)return!1;t.position++;let i=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position));)t.position++;let e=t.input.slice(i,t.position),n=[];for(e.length===0&&R(t,"directive name must not be less than one character in length");t.input.charCodeAt(t.position)!==0&&!ye(t.input.charCodeAt(t.position));){for(;oi(t.input.charCodeAt(t.position));)t.position++;if(t.input.charCodeAt(t.position)===35||ye(t.input.charCodeAt(t.position))||t.input.charCodeAt(t.position)===0)break;let a=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position));)t.position++;n.push(t.input.slice(a,t.position))}if(ye(t.input.charCodeAt(t.position))&&ra(t),e==="YAML"){t.directives.some(r=>r.kind==="yaml")&&R(t,"duplication of %YAML directive"),n.length!==1&&R(t,"YAML directive accepts exactly one argument");let a=/^([0-9]+)\.([0-9]+)$/.exec(n[0]);a===null&&R(t,"ill-formed argument of the YAML directive"),parseInt(a[1],10)!==1&&R(t,"unacceptable YAML version of the document"),t.directives.push({kind:"yaml",version:n[0]})}else if(e==="TAG"){n.length!==2&&R(t,"TAG directive accepts exactly two arguments");let[a,r]=n;sl.test(a)||R(t,"ill-formed tag handle (first argument) of the TAG directive"),nl.call(t.tagHandlers,a)&&R(t,`there is a previously declared suffix for "${a}" tag handle`),sh.test(r)||R(t,"ill-formed tag prefix (second argument) of the TAG directive"),t.tagHandlers[a]=r,t.directives.push({kind:"tag",handle:a,prefix:r})}return!0}function Sh(t){t.directives=[],t.tagHandlers=Object.create(null);let i=!1;for(xe(t,!0);xh(t);)i=!0,xe(t,!0);let e=!1,n=!1,a=!0;if(t.lineIndent===0&&t.input.charCodeAt(t.position)===45&&t.input.charCodeAt(t.position+1)===45&&t.input.charCodeAt(t.position+2)===45&&rt(t.input.charCodeAt(t.position+3))){e=!0;let o=t.line;t.position+=3,xe(t,!0),a=t.line>o}else i&&R(t,"directives end mark is expected");let r=t.events.length;if(!e&&t.position===t.lineStart&&t.input.charCodeAt(t.position)===46&&ai(t)){t.position+=3,xe(t,!0);return}if(oh(t,e,!1),ri(t,t.lineIndent-1,aa,!1,a,a)||Te(t),xe(t,!0),t.position===t.lineStart&&ai(t)&&(n=t.input.charCodeAt(t.position)===46,n)){let o=t.line;t.position+=3,xe(t,!0),t.line===o&&t.position<t.length&&R(t,"end of the stream or a document separator is expected")}let s=t.events[r];s?.type===he.DOCUMENT&&(s.explicitEnd=n),ei(t),!n&&t.position<t.length&&!Er(t)&&R(t,"end of the stream or a document separator is expected")}function $h(t,i){let e=t.length,n={...Tr,...i,input:`${t}\0`,length:e,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},a=t.indexOf("\0");for(a!==-1&&gt.throwAt(t,a,"null byte is not allowed in input",n.filename);n.position<n.length&&(cl(n),xe(n,!0),!(n.position>=n.length));){let r=n.position;Sh(n),n.position===r&&R(n,"can not read a document")}return n.events}var Ah={...Tr,...Ar};function Th(t,i={}){let e={...Ah,...i},n=String(t),a=Object.keys(Tr),r=Object.keys(Ar);return th($h(n,mr(e,a)),{...mr(e,r),source:n})}function Lt(t,i){let e=Th(t,i);if(e.length===0)throw new gt("expected a document, but the input is empty");if(e.length===1)return e[0];throw new gt("expected a single document in the stream, but found more")}var zt=Symbol("INVALID");function Eh(t){let i=new Set([t.defaultScalarTag,t.defaultSequenceTag,t.defaultMappingTag].filter(r=>r!==void 0)),e=t.implicitScalarTags,n=t.tags.filter(r=>!(r.nodeKind==="scalar"&&r.implicit)&&!i.has(r)),a=t.tags.filter(r=>i.has(r));return[...e.map(r=>({tag:r,implicitTag:!0})),...n.map(r=>({tag:r,implicitTag:!1})),...a.map(r=>({tag:r,implicitTag:!0}))]}function zh(t,i){for(let e=0,n=t.representTypes.length;e<n;e+=1){let{tag:a,implicitTag:r}=t.representTypes[e];if(a.identify(i)){let s;return a.matchByTagPrefix?s=a.representTagName(i):s=a.tagName,{tag:a,tagName:s,implicitTag:r}}}return null}function Wi(t,i){if(!t.noRefs&&i!==null&&typeof i=="object"){let c=t.refs.get(i);if(c)return c.anchor===void 0&&(c.anchor=`ref_${t.refCounter++}`),{kind:"alias",anchor:c.anchor}}let e=zh(t,i);if(!e){if(i===void 0||t.skipInvalid)return zt;throw new gt(`unacceptable kind of an object to dump ${Object.prototype.toString.call(i)}`)}let{tag:n,tagName:a,implicitTag:r}=e,s=r?a:el(a);if(n.nodeKind==="scalar")return{kind:"scalar",tag:s,tagged:!r,style:K.PLAIN,value:n.represent(i)};if(n.nodeKind==="sequence"){let c=n.represent(i),h={kind:"sequence",tag:s,tagged:!r,style:_e.BLOCK,items:[]};t.noRefs||t.refs.set(i,h);for(let p=0,g=c.length;p<g;p+=1){let b=Wi(t,c[p]);b===zt&&c[p]===void 0&&(b=Wi(t,null)),b!==zt&&h.items.push(b)}return h}let o=n.represent(i),l={kind:"mapping",tag:s,tagged:!r,style:_e.BLOCK,items:[]};t.noRefs||t.refs.set(i,l);for(let[c,h]of o){let p=Wi(t,c);if(p===zt)continue;let g=Wi(t,h);g!==zt&&l.items.push({key:p,value:g})}return l}function _h(t,i,e={}){let n=Wi({representTypes:Eh(i),noRefs:e.noRefs??!1,skipInvalid:e.skipInvalid??!1,refs:new Map,refCounter:0},t);return[{contents:n===zt?null:n,directives:[]}]}var Lh=Symbol("visit:break"),hl=Symbol("visit:skip");function ia(t,i,e){let n=i(t,e);if(n===Lh)return!0;if(n===hl)return!1;let a=e.depth+1;switch(t.kind){case"sequence":for(let r of t.items)if(ia(r,i,{depth:a,parent:t,isKey:!1}))return!0;break;case"mapping":for(let{key:r,value:s}of t.items)if(ia(r,i,{depth:a,parent:t,isKey:!0})||ia(s,i,{depth:a,parent:t,isKey:!1}))return!0;break}return!1}function Ko(t,i){for(let e of t)if(e.contents&&ia(e.contents,i,{depth:0,parent:null,isKey:!1}))return}function ca(t,i){return(t&1<<i)!==0}var Vo={applyQuoteFlowKeysOption:Ch,doubleQuoteForInvisibles:Dh,doubleQuoteWhitespaceOnly:Nh,applyForceQuotesOption:Mh,tryLongOrMultilineAsBlock:Ph,quoteInvalidPlain:Ih,fallbackToDoubleQuoted:Fh};function pl(t){return t.presenterOptions.quoteStyle==="single"&&ca(t.allowedStylesMask,K.SINGLE_QUOTED)?K.SINGLE_QUOTED:K.DOUBLE_QUOTED}function Ch(t){t.presenterOptions.quoteFlowKeys&&(!t.isKey||!t.flowOnly||t.style!==K.PLAIN||(t.style=K.DOUBLE_QUOTED))}function Dh(t){t.style===K.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(t.node.value)&&(t.style=K.DOUBLE_QUOTED)}function Nh(t){t.style===K.PLAIN&&/^\s+$/.test(t.node.value)&&(t.style=K.DOUBLE_QUOTED)}function Mh(t){t.presenterOptions.forceQuotes&&(t.isKey||t.style!==K.PLAIN||t.node.tag===t.presenterOptions.schema.defaultScalarTag.tagName&&(t.style=t.node.value.includes(`
`)?K.DOUBLE_QUOTED:pl(t)))}function Ph(t){if(t.style!==K.PLAIN||t.isKey)return;let i=t.node.value,e=i.indexOf(`
`)!==-1;if(!ca(t.allowedStylesMask,K.LITERAL_BLOCK)){e&&(t.style=K.DOUBLE_QUOTED);return}let n=t.presenterOptions.lineWidth;if(n===-1){e&&(t.style=K.LITERAL_BLOCK);return}let a=Math.max(Math.min(n,40),n-t.shiftOfContent),r=0,s=!1;for(;r<=i.length;){let o=i.length,l=i.indexOf(`
`,r);l!==-1&&(o=l);let c=i.slice(r,o);if(c.length>a&&c[0]!==" "&&/ [^ \t]/.test(c)&&(s=!0),l===-1)break;r=l+1}s?t.style=K.FOLDED_BLOCK:e&&(t.style=K.LITERAL_BLOCK)}function Ih(t){t.style===K.PLAIN&&!ca(t.allowedStylesMask,K.PLAIN)&&(t.style=pl(t))}function Fh(t){ca(t.allowedStylesMask,t.style)||(t.style=K.DOUBLE_QUOTED)}function Oi(t,i){return t|1<<i}var Bh="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",Oh="[\\n\\r]",Wh="\\uFEFF",zr="[ \\t]",ml=`(?:(?!(?:${Oh}|${Wh}))${Bh})`,ua=`(?:(?!${zr})${ml})`,gl="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",fl="[-?:,\\[\\]{}#&*!|>'\"%@`]",Hh="[,\\[\\]{}]",br=ua,vr=`(?:(?!${Hh})${ua})`,Rh=`(?:(?:(?!${fl})${ua})|[?:-](?=${br}))`,Kh=`(?:(?:(?!${fl})${ua})|[?:-](?=${vr}))`,bl=`(?:(?:(?![:#])${br})|:(?=${br}))#*`,vl=`(?:(?:(?![:#])${vr})|:(?=${vr}))#*`,yl=`(?:${zr}*${bl})*`,wl=`(?:${zr}*${vl})*`,kl=`${Rh}#*${yl}`,xl=`${Kh}#*${wl}`,Vh=kl,jh=xl,Gh=`\\n+${bl}${yl}`,Uh=`\\n+${vl}${wl}`,qh=`${kl}(?:${Gh})*`,Zh=`${xl}(?:${Uh})*`,Yh=new RegExp(`^(?:${qh})$`,"u"),Qh=new RegExp(`^(?:${Zh})$`,"u"),Jh=new RegExp(`^(?:${Vh})$`,"u"),Xh=new RegExp(`^(?:${jh})$`,"u"),ep=new RegExp(`^(?:${gl})*$`,"u"),tp=new RegExp(`^(?:${gl}|\\n)*$`,"u"),ip=new RegExp(`^(?:${ml}|\\n)*$`,"u"),np=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/,_r=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;function ap(t){let i=t.node.value;if(i!==""){if(!(t.isKey?t.flowOnly?Xh:Jh:t.flowOnly?Qh:Yh).test(i)||t.shiftOfFirstLine===0&&np.test(i))return!1;if(t.shiftOfContent===0){let n=i.indexOf(`
`);if(n!==-1){let a=i.slice(n+1);if(_r.test(a))return!1}}}let e=t.presenterOptions.schema.resolveImplicitScalarTag(i).tag.tagName;return!(!t.node.tagged&&e!==t.node.tag||!t.node.tagged&&i==="="&&e===t.presenterOptions.schema.defaultScalarTag.tagName)}function rp(t){let i=t.node.value;if(!(t.isKey?ep:tp).test(i)||/[ \t]\n|\n[ \t]/.test(i))return!1;if(!t.isKey&&t.shiftOfContent===0){let e=i.indexOf(`
`);if(e!==-1&&_r.test(i.slice(e+1)))return!1}return!0}function sp(t){if(t.flowOnly||!ip.test(t.node.value))return!1;let i=t.shiftOfContent-t.shiftOfParent;return!(i<1||i>9&&/^\n* /.test(t.node.value)||t.shiftOfContent===0&&_r.test(t.node.value))}function op(t){let i=Oi(0,K.DOUBLE_QUOTED);ap(t)&&(i=Oi(i,K.PLAIN)),rp(t)&&(i=Oi(i,K.SINGLE_QUOTED)),sp(t)&&(i=Oi(Oi(i,K.LITERAL_BLOCK),K.FOLDED_BLOCK)),t.allowedStylesMask=i}function lp(t){switch(t.style){case K.PLAIN:return dp(t);case K.SINGLE_QUOTED:return cp(t);case K.LITERAL_BLOCK:return up(t);case K.FOLDED_BLOCK:return hp(t);case K.DOUBLE_QUOTED:return pp(t)}}function dp(t){return Sl(t.node.value,t.shiftOfContent)}function cp(t){return`'${Sl(t.node.value,t.shiftOfContent).replace(/'/g,"''")}'`}function up(t){let i=t.node.value;return"|"+Al(i,t.shiftOfParent,t.shiftOfContent)+Tl($l(i,t.shiftOfContent))}function hp(t){let i=t.node.value,e=t.presenterOptions.lineWidth,n=1/0;return e!==-1&&(n=Math.max(Math.min(e,40),e-t.shiftOfContent)),">"+Al(i,t.shiftOfParent,t.shiftOfContent)+Tl($l(gp(i,n),t.shiftOfContent))}function pp(t){return`"${vp(t.node.value)}"`}function Sl(t,i){let e=t.indexOf(`
`);if(e===-1)return t;let n=" ".repeat(i),a=t.slice(0,e),r=/(\n+)([^\n]*)/g;r.lastIndex=e;let s;for(;s=r.exec(t);){let o=s[1].length,l=s[2];a+=`
`.repeat(o+1)+n+l}return a}function $l(t,i){let e=" ".repeat(i),n=0,a="",r=t.length;for(;n<r;){let s,o=t.indexOf(`
`,n);o===-1?(s=t.slice(n),n=r):(s=t.slice(n,o+1),n=o+1),s.length&&s!==`
`&&(a+=e),a+=s}return a}function mp(t){return/^\n* /.test(t)}function Al(t,i,e){let n=mp(t)?String(e-i):"",a=t[t.length-1]===`
`;return`${n}${a&&(t[t.length-2]===`
`||t===`
`)?"+":a?"":"-"}
`}function Tl(t){return t[t.length-1]===`
`?t.slice(0,-1):t}function yr(t){return t===" "||t==="	"}function jo(t,i){if(t===""||yr(t[0]))return t;let e=/ [^ \t]/g,n,a=0,r,s=0,o=0,l="";for(;n=e.exec(t);)o=n.index,o-a>i&&(r=s>a?s:o,l+=`
${t.slice(a,r)}`,a=r+1),s=o;return l+=`
`,t.length-a>i&&s>a?l+=`${t.slice(a,s)}
${t.slice(s+1)}`:l+=t.slice(a),l.slice(1)}function gp(t,i){let e=/(\n+)([^\n]*)/g,n=t.indexOf(`
`);n===-1&&(n=t.length),e.lastIndex=n;let a=jo(t.slice(0,n),i),r=t[0]===`
`||yr(t[0]),s,o;for(;o=e.exec(t);){let l=o[1],c=o[2];s=c!==""&&yr(c[0]),a+=l+(!r&&!s&&c!==""?`
`:"")+jo(c,i),r=s}return a}var fp=/["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;function bp(t){switch(t){case"\0":return"\\0";case"\x07":return"\\a";case"\b":return"\\b";case"	":return"\\t";case`
`:return"\\n";case"\v":return"\\v";case"\f":return"\\f";case"\r":return"\\r";case"\x1B":return"\\e";case'"':return'\\"';case"\\":return"\\\\";case"\x85":return"\\N";case"\xA0":return"\\_";case"\u2028":return"\\L";case"\u2029":return"\\P"}let i=t.charCodeAt(0),e=i.toString(16).toUpperCase();return i<=255?`\\x${"0".repeat(2-e.length)}${e}`:`\\u${"0".repeat(4-e.length)}${e}`}function vp(t){return t.replace(fp,bp)}var sa=10,Lr={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(Vo).map(t=>Reflect.get(Vo,t)),tagBeforeAnchor:!1};function yp(t){return t.tagged?t.tag:el(t.tag)}function wp(t){let i={...Lr,...t};return i.flowSkipColonSpace&&(i.quoteFlowKeys=!0),{...i,defaultScalarTagName:i.schema.defaultScalarTag.tagName,openEnded:!1}}function wr(t,i){return`
${" ".repeat(t.indent*i)}`}function kp(t,i,e,n,a,r){return{node:i,parent:e,level:n,isKey:a,flowOnly:r,shiftOfParent:n===0?-1:t.indent*(n-1),shiftOfContent:t.indent*Math.max(1,n),shiftOfFirstLine:n===0?0:t.indent*n,presenterOptions:t,allowedStylesMask:0,style:i.style}}function xp(t,i,e){let n="";for(let r=0,s=e.items.length;r<s;r+=1){let o=st(t,i,e.items[r],e,{}).text;r>0&&(n+=`,${t.flowSkipCommaSpace?"":" "}`),n+=o}let a=t.flowBracketPadding&&e.items.length>0?" ":"";return`[${a}${n}${a}]`}function Go(t,i,e,n){let a="";for(let r=0,s=e.items.length;r<s;r+=1){let o=st(t,i+1,e.items[r],e,{block:!0,compact:t.seqInlineFirst,isblockseq:!0}).text;(!n||a!=="")&&(a+=wr(t,i)),o===""||sa===o.charCodeAt(0)?a+="-":a+="- ",a+=o}return a}function Sp(t,i,e){let n="";for(let{key:r,value:s}of e.items){let o="";n!==""&&(o+=`,${t.flowSkipCommaSpace?"":" "}`);let l=st(t,i,r,e,{iskey:!0}),c=l.text,h=st(t,i,s,e,{}).text,p=t.flowSkipColonSpace||h===""?"":" ",g=r.kind==="scalar"&&l.noBody&&(r.tagged||r.anchor!==void 0),b=r.kind==="alias"||g?" ":"";o+=`${c}${b}:${p}${h}`,n+=o}let a=t.flowBracketPadding&&n!==""?" ":"";return`{${a}${n}${a}}`}function $p(t,i,e,n){let a="";for(let r=0,s=e.items.length;r<s;r+=1){let o="";(!n||a!=="")&&(o+=wr(t,i));let{key:l,value:c}=e.items[r],h=(l.kind==="mapping"||l.kind==="sequence")&&l.style===_e.BLOCK&&l.items.length!==0||l.kind==="scalar"&&(l.style===K.LITERAL_BLOCK||l.style===K.FOLDED_BLOCK),p=h?st(t,i+1,l,e,{block:!0,compact:!0,isblockseq:!kr(t,l,i+1)}):st(t,i+1,l,e,{block:!0,compact:!0,iskey:!0}),g=p.text,b=l.kind==="scalar"&&l.value.indexOf(`
`)!==-1,f=g.length>1024&&/^[\s\S]{1025}/u.test(g),v=h||b||f;v&&(g&&sa===g.charCodeAt(0)?o+="?":o+="? "),o+=g,v&&(o+=wr(t,i));let $=st(t,i+1,c,e,{block:!0,compact:v,isblockseq:v&&!kr(t,c,i+1)}).text,P=l.kind==="scalar"&&p.noBody&&(l.tagged||l.anchor!==void 0),T=!v&&(l.kind==="alias"||P)?" ":"";$===""||sa===$.charCodeAt(0)?o+=`${T}:`:o+=`${T}: `,o+=$,a+=o}return a}function kr(t,i,e){return i.kind==="alias"?!0:i.tagged||i.anchor!==void 0||t.indent<2&&e>0}function st(t,i,e,n,a){if(e.kind==="alias")return t.openEnded=!1,{text:`*${e.anchor}`,noBody:!1};let{block:r=!1,iskey:s=!1,isblockseq:o=!1}=a,l=a.compact??!1,c=e.anchor!==void 0;kr(t,e,i)&&(l=!1);let h,p=e.tagged,g=r&&(e.kind==="mapping"||e.kind==="sequence")&&e.style===_e.BLOCK&&e.items.length!==0;if(e.kind==="mapping")g?h=$p(t,i,e,l):h=Sp(t,i,e);else if(e.kind==="sequence")g?t.seqNoIndent&&!o&&i>0?h=Go(t,i-1,e,l):h=Go(t,i,e,l):h=xp(t,i,e);else{let v=kp(t,e,n,i,s,!r);op(v);for(let $ of t.scalarStyleRules)$(v);h=lp(v),t.openEnded=(v.style===K.LITERAL_BLOCK||v.style===K.FOLDED_BLOCK)&&(e.value===`
`||e.value.endsWith(`

`)),p=e.tagged||h===""&&v.flowOnly&&n?.kind==="sequence"&&!c||v.style!==K.PLAIN&&e.tag!==t.defaultScalarTagName}(e.kind==="mapping"||e.kind==="sequence")&&!g&&(t.openEnded=!1),g&&l&&i>0&&t.indent>2&&(h=`${" ".repeat(t.indent-2)}${h}`);let b=h==="",f=h;if(p||c){let v=[],$=p?yp(e):null,P=c?`&${e.anchor}`:null;t.tagBeforeAnchor?($!==null&&v.push($),P!==null&&v.push(P)):(P!==null&&v.push(P),$!==null&&v.push($));let T=h===""||h.charCodeAt(0)===sa?"":" ";f=`${v.join(" ")}${T}${h}`}return{text:f,noBody:b}}function Ap(t){return(t.kind==="sequence"||t.kind==="mapping")&&t.style===_e.BLOCK&&t.items.length!==0&&!t.tagged&&t.anchor===void 0}function Tp(t){let i="";for(let e of t.directives){if(e.kind==="yaml"){i+=`%YAML ${e.version}
`;continue}let{handle:n,prefix:a}=e;i+=`%TAG ${n} ${a}
`}return i}function Ep(t,i){let e=wp(i),n="",a=!1;for(let r=0;r<t.length;r+=1){let s=t[r];e.openEnded=!1;let o=Tp(s),l=o!=="",c=s.explicitStart||l||r>0&&!a;if(n+=o,s.contents===null)c&&(n+=`---
`);else if(c){let h=st(e,0,s.contents,null,{block:!0,compact:!0}).text,p=h===""?"":l||Ap(s.contents)?`
`:" ";n+=`---${p}${h}
`}else n+=st(e,0,s.contents,null,{block:!0,compact:!0}).text+`
`;a=s.explicitEnd||e.openEnded,a&&(n+=`...
`)}return n}var zp={...Lr,schema:Bu,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};function _p(t,i){let e=String(t),n=String(i);return e<n?-1:e>n?1:0}function ft(t,i={}){let e={...zp,...i},n=_h(t,e.schema,{noRefs:e.noRefs,skipInvalid:e.skipInvalid});if(e.flowLevel>=0&&Ko(n,(a,r)=>{if(!(r.depth<e.flowLevel))return(a.kind==="sequence"||a.kind==="mapping")&&(a.style=_e.FLOW),hl}),e.sortKeys){let a=e.sortKeys===!0?_p:e.sortKeys;Ko(n,r=>{r.kind==="mapping"&&r.items.sort((s,o)=>a(s.key.kind==="scalar"?s.key.value:"",o.key.kind==="scalar"?o.key.value:""))})}return e.transform(n),Ep(n,{...mr(e,Object.keys(Lr)),schema:e.schema})}var cv=he.DOCUMENT,uv=he.SEQUENCE,hv=he.MAPPING,pv=he.SCALAR,mv=he.ALIAS,gv=he.POP,fv=K.PLAIN,bv=K.SINGLE_QUOTED,vv=K.DOUBLE_QUOTED,yv=K.LITERAL_BLOCK,wv=K.FOLDED_BLOCK,kv=_e.BLOCK,xv=_e.FLOW,Sv=Ne.CLIP,$v=Ne.STRIP,Av=Ne.KEEP;var Hi=class extends re{constructor(){super(...arguments);this.pageId="";this.displayId="";this.selected=null;this.selection=[];this.orientation="landscape";this.grid=!0;this.scale=.5;this.resize=new ResizeObserver(()=>this.measure())}get stage(){return ge[this.orientation]}measure(){let e=this.stage,n=Math.max(320,window.innerHeight-220),a=Math.min(this.offsetWidth/e.w,n/e.h);a>0&&Math.abs(a-this.scale)>.001&&(this.scale=a)}willUpdate(e){e.has("orientation")&&this.measure()}connectedCallback(){super.connectedCallback(),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resize.disconnect()}emit(e,n){this.dispatchEvent(new CustomEvent(e,{detail:n}))}down(e,n,a,r,s){if(e.stopPropagation(),e.preventDefault(),r==="move"&&(e.shiftKey||e.metaKey||e.ctrlKey)){this.emit("select",{id:n.id,toggle:!0});return}let o=r==="move"&&this.selection.length>1&&this.selection.includes(n.id)?this.selection:[n.id];this.emit("select",{id:n.id,keep:o.length>1});let l=o.filter(c=>s[c]).map(c=>({id:c,pos:{...s[c]}}));this.drag={id:n.id,mode:r,x0:e.clientX,y0:e.clientY,orig:{...a},group:l},e.currentTarget.setPointerCapture(e.pointerId)}move(e){let n=this.drag;if(!n)return;let a=this.stage,r=Math.round((e.clientX-n.x0)/this.scale/((a.w-2*a.padX+a.gap)/a.cols)),s=Math.round((e.clientY-n.y0)/this.scale/((a.h-2*a.padY+a.gap)/a.rows)),o=n.orig;if(n.mode==="resize"){let p={x:o.x,y:o.y,w:Math.min(Math.max(1,o.w+r),a.cols-o.x),h:Math.min(Math.max(1,o.h+s),a.rows-o.y)};this.emit("move",{moves:[{id:n.id,...p}],done:!1});return}let l=n.group.map(p=>p.pos),c=Math.min(Math.max(r,-Math.min(...l.map(p=>p.x))),Math.min(...l.map(p=>a.cols-p.x-p.w))),h=Math.min(Math.max(s,-Math.min(...l.map(p=>p.y))),Math.min(...l.map(p=>a.rows-p.y-p.h)));this.emit("move",{moves:n.group.map(({id:p,pos:g})=>({id:p,x:g.x+c,y:g.y+h,w:g.w,h:g.h})),done:!1})}guides(e){let n=this.drag;if(!n)return{v:[],h:[]};let a=this.stage,r=new Set(n.group.map(g=>g.id)),s=g=>{let b=Yt(a,g);return{v:[b.left,b.left+b.width/2,b.left+b.width],h:[b.top,b.top+b.height/2,b.top+b.height]}},o=Object.entries(e).filter(([g])=>r.has(g)).map(([,g])=>s(g)),l=Object.entries(e).filter(([g])=>!r.has(g)).map(([,g])=>s(g)),c=(g,b)=>g.filter(f=>b.some(v=>Math.abs(f-v)<.5)),h=new Set,p=new Set;for(let g of o)for(let b of l)c(g.v,b.v).forEach(f=>h.add(f)),c(g.h,b.h).forEach(f=>p.add(f));return{v:[...h],h:[...p]}}up(){this.drag&&(this.emit("move",{moves:[],done:!0}),this.drag=void 0)}render(){let e=this.config?.pages.find(l=>l.id===this.pageId),n=this.scale,a=this.stage,r=Tt(e?.widgets??[],this.orientation),s=this.guides(r),o=this.selection.length>1;return u`<div class="frame" style="width:${a.w*n}px;height:${a.h*n}px">
      <af-display
        preview
        .hass=${this.hass}
        .config=${this.config}
        display-id=${this.displayId}
        .fixedPage=${this.pageId}
        .forceOrientation=${this.orientation}
      ></af-display>
      <div class="edit" @pointerdown=${()=>this.emit("select",{id:null})} @pointermove=${this.move} @pointerup=${this.up} @pointercancel=${this.up}>
        ${this.grid?Array.from({length:a.cols*a.rows},(l,c)=>{let h=Yt(a,{x:c%a.cols,y:Math.floor(c/a.cols),w:1,h:1});return u`<i class="cell" style="left:${h.left*n}px;top:${h.top*n}px;width:${h.width*n}px;height:${h.height*n}px"></i>`}):m}
        ${(e?.widgets??[]).map(l=>{let c=r[l.id];if(!c)return m;let h=Yt(a,c),p=this.selected===l.id||this.selection.includes(l.id),g=!tt(this.hass,l.show_if,{display:this.displayId,orientation:this.orientation});return u`<div
            class="box ${p?"sel":""} ${g?"hidden":""}"
            style="left:${h.left*n}px;top:${h.top*n}px;width:${h.width*n}px;height:${h.height*n}px"
            @pointerdown=${b=>this.down(b,l,c,"move",r)}
          >
            <span class="tag">${d(Ke[l.type]?.name??l.type)}${g?` \xB7 ${d("bedingt")}`:""}</span>
            ${p&&!o?u`<span class="handle" @pointerdown=${b=>this.down(b,l,c,"resize",r)}></span>`:m}
          </div>`})}
        ${s.v.map(l=>u`<i class="guide v" style="left:${l*n}px"></i>`)}
        ${s.h.map(l=>u`<i class="guide h" style="top:${l*n}px"></i>`)}
      </div>
    </div>`}};Hi.properties={hass:{attribute:!1},config:{attribute:!1},pageId:{attribute:!1},displayId:{attribute:!1},selected:{attribute:!1},selection:{attribute:!1},orientation:{attribute:!1},scale:{state:!0},grid:{type:Boolean}},Hi.styles=F`
    :host {
      display: block;
      user-select: none;
    }
    .frame {
      position: relative;
      margin: 0 auto;
      border-radius: 14px;
      overflow: hidden;
      background: #000;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
    }
    af-display {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .edit {
      position: absolute;
      inset: 0;
      touch-action: none;
    }
    .cell {
      position: absolute;
      border: 1px dashed rgba(255, 255, 255, 0.07);
      border-radius: 4px;
      pointer-events: none;
    }
    .box {
      position: absolute;
      border: 1px dashed rgba(255, 255, 255, 0.28);
      border-radius: 8px;
      cursor: grab;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .box:hover {
      border-color: rgba(255, 255, 255, 0.6);
    }
    .box.sel {
      border: 2px solid var(--primary-color, #d9b45f);
      background: rgba(217, 180, 95, 0.06);
      cursor: move;
    }
    .box.hidden {
      border-style: dotted;
      background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0 8px, transparent 8px 16px);
    }
    .tag {
      position: absolute;
      left: 6px;
      top: 6px;
      font: 500 11px/1 system-ui, sans-serif;
      color: #fff;
      background: rgba(0, 0, 0, 0.55);
      padding: 4px 7px;
      border-radius: 6px;
      opacity: 0;
      transition: opacity 0.15s;
      pointer-events: none;
      white-space: nowrap;
    }
    .box:hover .tag,
    .box.sel .tag {
      opacity: 1;
    }
    .guide {
      position: absolute;
      pointer-events: none;
      background: #ff4fa3;
      opacity: 0.85;
    }
    .guide.v {
      top: 0;
      bottom: 0;
      width: 1px;
    }
    .guide.h {
      left: 0;
      right: 0;
      height: 1px;
    }
    .handle {
      position: absolute;
      right: -7px;
      bottom: -7px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color, #d9b45f);
      border: 2px solid #fff;
      cursor: nwse-resize;
    }
  `;B("af-canvas",Hi);var Lp=new Set(["attribute","text_attribute","decimals","unit","min","max","cold","warm","refresh","radius","speed","interval","cooldown","hold_after","period","timeout","volume","event_types","quiet_action","show_if","css","typeface","from","sub","secondary","transition","watchdog","pause_minutes","ambient"]),Cp=t=>t.advanced??Lp.has(t.key.split(".").pop()??""),Ct={displays:[],pages:[]},Dp=(t,i)=>i.split(".").reduce((e,n)=>e?.[n],t),zl=(t,i,e)=>{let[n,...a]=i.split("."),r={...t??{}};return a.length?(r[n]=zl(r[n]??{},a.join("."),e),Object.keys(r[n]).length||delete r[n]):e===void 0||e===""?delete r[n]:r[n]=e,r},El,Np=()=>{if(customElements.get("ha-entity-picker"))return Promise.resolve(!0);let t=window;return t.loadCardHelpers?(El??=(async()=>{try{return await(await(await t.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),await Promise.race([customElements.whenDefined("ha-entity-picker"),new Promise(n=>setTimeout(n,4e3))]),!!customElements.get("ha-entity-picker")}catch{return!1}})(),El):Promise.resolve(!1)},Mp=["state","not_state","numeric","within_days","changed"],Pp=[{key:"condition",label:"Art",type:"select",options:[["state","Zustand ist"],["not_state","Zustand ist nicht"],["numeric","Zahl \xFCber/unter"],["changed","K\xFCrzlich ge\xE4ndert"],["within_days","Termin in den n\xE4chsten Tagen"],["any_state","Eine von mehreren ist"],["time","Uhrzeit von \u2013 bis"],["or","Mindestens eine von \u2026 (oder)"],["and","Alle von \u2026 (und)"],["not","Keine von \u2026 (nicht)"],["template","Vorlage (Jinja)"],["display","Nur auf Display \u2026"],["orientation","Nur im Hoch-/Querformat"]]},{key:"after",label:"ab",type:"text",placeholder:"05:00",when:t=>t.condition==="time"},{key:"before",label:"bis",type:"text",placeholder:"11:00",when:t=>t.condition==="time"},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>Mp.includes(t.condition)},{key:"entities",label:"Entit\xE4ten",type:"entities",when:t=>t.condition==="any_state"},{key:"state",label:"Zustand",type:"text",placeholder:"on",when:t=>["state","not_state","any_state"].includes(t.condition)},{key:"minutes",label:"in den letzten \u2026 Minuten",type:"number",min:1,placeholder:"10",when:t=>t.condition==="changed"},{key:"state",label:"zu Zustand (optional)",type:"text",placeholder:"beliebig",when:t=>t.condition==="changed"},{key:"attribute",label:"Attribut (optional)",type:"text",when:t=>["state","not_state","numeric","within_days"].includes(t.condition)},{key:"above",label:"\xFCber",type:"number",when:t=>t.condition==="numeric"},{key:"below",label:"unter",type:"number",when:t=>t.condition==="numeric"},{key:"days",label:"Tage",type:"number",min:0,when:t=>t.condition==="within_days"},{key:"value_template",label:"Vorlage",type:"textarea",placeholder:"{{ is_state('person.alex', 'home') and now().hour >= 18 }}",help:"Erf\xFCllt bei true, on, Zahl \u2260 0",when:t=>t.condition==="template"},{key:"displays",label:"Displays",type:"multi",options:()=>Ct.displays,when:t=>t.condition==="display"},{key:"orientation",label:"Format",type:"select",options:[["landscape","Querformat"],["portrait","Hochformat"]],when:t=>t.condition==="orientation"},{key:"conditions",label:"",type:"conditions",when:t=>["and","or","not"].includes(t.condition)}],Cr=t=>{let i=e=>Array.isArray(e)?e.join("/"):String(e??"");switch(t.condition){case"state":return`${t.entity??"\u2026"} = ${i(t.state)}`;case"not_state":return`${t.entity??"\u2026"} \u2260 ${i(t.state)}`;case"numeric":return`${t.entity??"\u2026"}${t.above!==void 0?` > ${t.above}`:""}${t.below!==void 0?` < ${t.below}`:""}`;case"changed":return d("{entity} ge\xE4ndert ({n} min)",{entity:t.entity??"\u2026",n:t.minutes??10});case"within_days":return d("{entity} in {n} Tagen",{entity:t.entity??"\u2026",n:t.days??0});case"any_state":return d("eine von {n} = {state}",{n:(t.entities??[]).length,state:i(t.state)});case"time":return d("Uhrzeit {from}\u2013{to}",{from:t.after??"\u2026",to:t.before??"\u2026"});case"or":case"and":case"not":return`${d({or:"oder",and:"und",not:"nicht"}[t.condition])} (${(t.conditions??[]).length})`;case"template":return d("Vorlage");case"display":return d("nur auf {names}",{names:(t.displays??[]).map(e=>Ct.displays.find(([n])=>n===e)?.[1]??e).join(", ")||"\u2026"});case"orientation":return t.orientation==="portrait"?d("nur Hochformat"):d("nur Querformat");default:return d("Bedingung")}},Ri=class extends re{constructor(){super();this.fields=[];this.value={};this.advanced=!0;this.pickers=!!customElements.get("ha-entity-picker");this.addEventListener("value-changed",e=>{e.composedPath()[0]!==this&&e.stopImmediatePropagation()})}connectedCallback(){super.connectedCallback(),this.pickers||Np().then(e=>this.pickers=e)}emit(e){this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e}}))}set(e,n){this.emit(zl(this.value,e,n))}entityInput(e,n,a,r=""){if(this.pickers&&this.hass)return u`<ha-entity-picker
        .hass=${this.hass}
        .value=${e??""}
        .includeDomains=${n}
        allow-custom-entity
        @value-changed=${l=>a(l.detail.value||void 0)}
      ></ha-entity-picker>`;let s=`ents-${(n??["alle"]).join("-")}`,o=e?this.hass?.states[e]?.attributes.friendly_name:void 0;return u`<input
        list=${s}
        .value=${e??""}
        placeholder=${r||(n?`${n.join(", ")}.\u2026`:"entity_id")}
        @change=${l=>a(l.target.value.trim()||void 0)}
      />${o?u`<div class="hint">${o}</div>`:m}`}datalists(){if(this.pickers||!this.hass)return[];let e=new Set;(r=>r.forEach(s=>{(s.type==="entity"||s.type==="entities"||s.type==="autolist")&&e.add(("domains"in s&&s.domains||["alle"]).join("-")),s.type==="conditions"&&e.add("alle")}))(this.fields);let a=Object.keys(this.hass.states).sort();return[...e].map(r=>{let s=r==="alle"?null:r.split("-"),o=s?a.filter(l=>s.includes(l.split(".")[0])):a;return u`<datalist id=${`ents-${r}`}>${o.map(l=>u`<option value=${l}>${this.hass.states[l].attributes.friendly_name??""}</option>`)}</datalist>`})}renderList(e,n,a){let r=(s,o)=>{let l=[...n],[c]=l.splice(s,1);l.splice(s+o,0,c),a(l)};return u`<div class="list">
      ${n.map((s,o)=>u`<div class="item">
          <div class="item-head">
            <span>${d(e.itemLabel?.(s,o)??`#${o+1}`)}</span>
            <span class="tools">
              <button title=${d("nach oben")} ?disabled=${o===0} @click=${()=>r(o,-1)}>↑</button>
              <button title=${d("nach unten")} ?disabled=${o===n.length-1} @click=${()=>r(o,1)}>↓</button>
              <button title=${d("entfernen")} @click=${()=>a(n.filter((l,c)=>c!==o))}>✕</button>
            </span>
          </div>
          <af-form
            .hass=${this.hass}
            .advanced=${this.advanced}
            .fields=${e.fields}
            .value=${s??{}}
            @value-changed=${l=>a(n.map((c,h)=>h===o?l.detail.value:c))}
          ></af-form>
        </div>`)}
      <button class="add" @click=${()=>a([...n,e.newItem?.()??{}])}>+ ${d(e.addLabel??"Hinzuf\xFCgen")}</button>
    </div>`}renderField(e){if(e.when&&!e.when(this.value))return m;if(!this.advanced&&Cp(e))return m;let n=Dp(this.value,e.key),a;switch(e.type){case"text":{let s=e.suggestions?.length?`sug-${e.key.replace(/\W/g,"-")}`:void 0;a=u`<input
            .value=${n??""}
            list=${s??m}
            placeholder=${d(e.placeholder??"")}
            @input=${o=>this.set(e.key,o.target.value||void 0)}
          />${s?u`<datalist id=${s}>${e.suggestions.map(([o,l])=>u`<option value=${o}>${d(l)}</option>`)}</datalist>`:m}`;break}case"textarea":a=u`<textarea rows="3" .value=${n??""} @input=${s=>this.set(e.key,s.target.value||void 0)}></textarea>`;break;case"number":a=u`<input
          type="number"
          .value=${n??""}
          min=${e.min??""}
          max=${e.max??""}
          step=${e.step??"any"}
          placeholder=${d(e.placeholder??"")}
          @input=${s=>{let o=s.target.value;this.set(e.key,o===""?void 0:Number(o))}}
        />`;break;case"boolean":a=u`<label class="switch"
          ><input type="checkbox" .checked=${n??e.default??!1} @change=${s=>this.set(e.key,s.target.checked)} /><span></span
        ></label>`;break;case"select":{let s=typeof e.options=="function"?e.options(this.value):e.options;a=u`<select
          @change=${o=>{let l=o.target.selectedIndex;this.set(e.key,s[l][0])}}
        >
          ${s.map(([o,l])=>u`<option ?selected=${n===o||n===void 0&&o===void 0}>${d(l)}</option>`)}
        </select>`;break}case"icon":a=customElements.get("ha-icon-picker")&&this.hass?u`<ha-icon-picker .hass=${this.hass} .value=${n??""} @value-changed=${s=>this.set(e.key,s.detail.value||void 0)}></ha-icon-picker>`:u`<div class="with-icon">
              <span class="preview">${G(n)}</span>
              <input .value=${n??""} placeholder=${d("mdi:\u2026 oder washer, car, bell \u2026")} @change=${s=>this.set(e.key,s.target.value||void 0)} />
            </div>`;break;case"color":a=u`<div class="with-icon">
          <input type="color" .value=${/^#[0-9a-f]{6}$/i.test(n??"")?n:"#d9b45f"} @input=${s=>this.set(e.key,s.target.value)} />
          <input .value=${n??""} placeholder=${d("Standard")} @change=${s=>this.set(e.key,s.target.value||void 0)} />
        </div>`;break;case"entity":a=this.entityInput(n,e.domains,s=>this.set(e.key,s),e.placeholder);break;case"entities":{let s=Array.isArray(n)?n:[];a=u`<div class="chips">
            ${s.map(o=>u`<span class="chip">${this.hass?.states[o]?.attributes.friendly_name??o}<button @click=${()=>this.set(e.key,s.filter(l=>l!==o))}>✕</button></span>`)}
          </div>
          ${this.entityInput(void 0,e.domains,o=>o&&!s.includes(o)&&this.set(e.key,[...s,o]),d("Entit\xE4t hinzuf\xFCgen \u2026"))}`;break}case"multi":{let s=Array.isArray(n)?n:[];a=u`<div class="chips">
          ${e.options(this.value,this.hass).map(([o,l])=>u`<button
              class="pick ${s.includes(o)?"on":""}"
              @click=${()=>this.set(e.key,s.includes(o)?s.filter(c=>c!==o):[...s,o])}
            >
              ${l}
            </button>`)}
        </div>`;break}case"list":a=this.renderList(e,Array.isArray(n)?n:[],s=>this.set(e.key,s));break;case"object":a=u`<div class="nested">
          <af-form .hass=${this.hass} .advanced=${this.advanced} .fields=${e.fields} .value=${n??{}} @value-changed=${s=>this.set(e.key,Object.keys(s.detail.value).length?s.detail.value:void 0)}></af-form>
        </div>`;break;case"autolist":{let s=n==="auto",o=n===void 0||n===!1||n===e.offValue,l=s?"auto":o?"off":"list";a=u`<select
            @change=${c=>{let h=c.target.value;this.set(e.key,h==="auto"?"auto":h==="off"?e.offValue??void 0:[])}}
          >
            <option value="auto" ?selected=${l==="auto"}>${d(e.autoLabel??"Automatisch")}</option>
            <option value="list" ?selected=${l==="list"}>${d("Selbst ausw\xE4hlen")}</option>
            <option value="off" ?selected=${l==="off"}>${d("Aus")}</option>
          </select>
          ${l==="list"?e.fields?this.renderList({key:e.key,label:e.label,type:"list",fields:e.fields,itemLabel:c=>c.name??c.entity??d("Eintrag")},n,c=>this.set(e.key,c)):u`<af-form
                  .hass=${this.hass}
                  .fields=${[{key:"list",label:"",type:"entities",domains:e.domains}]}
                  .value=${{list:n}}
                  @value-changed=${c=>this.set(e.key,c.detail.value.list??[])}
                ></af-form>`:m}`;break}case"yaml":a=u`<textarea
          class="code"
          rows="8"
          .value=${n===void 0?"":ft(n,{lineWidth:100})}
          @change=${s=>{let o=s.target;try{this.set(e.key,o.value.trim()?Lt(o.value):void 0),o.setCustomValidity("")}catch(l){o.setCustomValidity(String(l)),o.reportValidity()}}}
        ></textarea>`;break;case"conditions":a=this.renderList({key:e.key,label:e.label,type:"list",fields:Pp,addLabel:"Bedingung",itemLabel:s=>Cr(s),newItem:()=>({condition:"state",state:"on"})},Array.isArray(n)?n:[],s=>this.set(e.key,s.length?s:void 0));break}let r=["list","object","autolist","yaml","conditions","textarea","entities"].includes(e.type);return u`<div class="field ${r?"wide":""}">
      ${e.label?u`<label class="lbl">${d(e.label)}</label>`:m}
      <div class="ctl">${a}</div>
      ${e.help?u`<div class="help">${d(e.help)}</div>`:m}
    </div>`}render(){return u`${this.datalists()}${this.fields.map(e=>this.renderField(e))}`}};Ri.properties={hass:{attribute:!1},fields:{attribute:!1},value:{attribute:!1},pickers:{state:!0},advanced:{type:Boolean}},Ri.styles=F`
    :host {
      display: block;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .field {
      display: grid;
      grid-template-columns: 128px minmax(0, 1fr);
      gap: 6px 12px;
      align-items: center;
      padding: 6px 0;
    }
    .field.wide {
      grid-template-columns: 1fr;
    }
    .lbl {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .help {
      grid-column: 1 / -1;
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-top: -2px;
    }
    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--af-input, rgba(127, 127, 127, 0.08));
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 8px;
      padding: 7px 9px;
    }
    textarea.code {
      font: 12px/1.45 ui-monospace, Menlo, monospace;
    }
    input[type="color"] {
      width: 44px;
      flex: none;
      padding: 2px;
      height: 34px;
    }
    .with-icon {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .preview {
      font-size: 22px;
      width: 28px;
      display: grid;
      place-items: center;
    }
    .preview .ic {
      width: 1em;
      height: 1em;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 3px;
    }
    ha-entity-picker,
    ha-icon-picker {
      display: block;
      width: 100%;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .switch span {
      position: absolute;
      inset: 0;
      border-radius: 11px;
      background: rgba(127, 127, 127, 0.35);
      transition: background 0.2s;
      cursor: pointer;
    }
    .switch span::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      left: 3px;
      top: 3px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    .switch input:checked + span {
      background: var(--primary-color, #03a9f4);
    }
    .switch input:checked + span::before {
      transform: translateX(18px);
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .item {
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      border-radius: 10px;
      padding: 4px 10px 6px;
    }
    .item-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    .tools button,
    .chip button,
    .add {
      font: inherit;
      font-size: 12px;
      color: var(--primary-text-color);
      background: transparent;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 6px;
      padding: 2px 7px;
      cursor: pointer;
      margin-left: 3px;
    }
    .tools button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .add {
      align-self: flex-start;
      padding: 6px 12px;
      border-style: dashed;
      margin-left: 0;
    }
    .nested {
      border-left: 2px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      padding-left: 10px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    .pick {
      font: inherit;
      font-size: 13px;
      color: var(--primary-text-color);
      background: transparent;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 999px;
      padding: 4px 12px;
      cursor: pointer;
    }
    .pick.on {
      background: var(--primary-color, #03a9f4);
      border-color: transparent;
      color: var(--text-primary-color, #fff);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      border-radius: 999px;
      padding: 3px 4px 3px 10px;
      background: rgba(127, 127, 127, 0.12);
    }
  `;B("af-form",Ri);var ql=qr(Za(),1);var Ee=(t,...i)=>t.widgets.some(e=>i.includes(e.type)),ha=(t,i)=>i.test(t.id)||i.test(t.name),_l={photo:t=>t.background.type==="photo",camera:t=>t.background.type==="camera",standby:t=>t.background.type==="none"&&Ee(t,"clock")&&Ee(t,"date")&&Ee(t,"weather","value")&&!Ee(t,"summary"),morning:t=>Ee(t,"summary"),weather:t=>Ee(t,"weather")&&!Ee(t,"summary")&&!Ee(t,"date")&&(ha(t,/wetter|weather/i)||!Ee(t,"clock")),agenda:t=>Ee(t,"agenda","calendar")&&!ha(t,/m[üu]ll|waste|bins/i),waste:t=>Ee(t,"waste")||ha(t,/m[üu]ll|waste|bins/i),home:t=>Ee(t,"rooms","status","covers"),persons:t=>Ee(t,"persons","car"),energy:t=>Ee(t,"power","price","balance"),news:t=>Ee(t,"news"),night:t=>ha(t,/^nacht$|^night$/i)},pa=[{id:"kitchen",name:"K\xFCche",hint:"Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.",icon:"home",pages:["photo","morning","standby","agenda","weather","waste","home","energy","news","persons"],display:{orientation:"auto",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:60},sound:{volume:80,quiet:{after:"22:00",before:"07:00"}}}},{id:"hallway",name:"Flur",hint:"Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.",icon:"door",pages:["standby","photo","waste","persons","weather"],display:{orientation:"auto",text_size:"large",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:30},sound:{volume:60,quiet:{after:"22:00",before:"07:00"}}}},{id:"bedroom",name:"Schlafzimmer",hint:"Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.",icon:"moon",pages:["standby","photo","weather"],eventKinds:["alarm"],display:{mode:"dark",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:30},sound:{volume:35,quiet:{after:"21:00",before:"08:00"}},design:{ambient:{type:"none"}}}},{id:"tv",name:"Fernseher",hint:"Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.",icon:"tv",pages:["photo","camera","weather","news","standby"],eventKinds:["alarm","live"],display:{orientation:"landscape",mode:"dark",text_size:"large",control:{enabled:!1,dashboard:"/lovelace/0",idle:60},sound:{mute:!0},oled:!0,design:{ambient:{type:"none"}}}}],Dr=(t,i)=>{let e=new Set,n=o=>{let l=_l[o],c=l&&i.find(h=>!e.has(h.id)&&l(h));return c&&e.add(c.id),c},a=t.pages.includes("photo")?n("photo"):void 0,r=t.pages.filter(o=>o!=="photo").map(n).filter(o=>!!o),s=[];return a&&s.push(a.id),r.forEach((o,l)=>{s.push(o.id),a&&l%2===1&&l<r.length-1&&s.push(a.id)}),!s.length&&i[0]&&s.push(i[0].id),s.map(o=>({page:o}))},Ll=(t,i,e,n)=>{let a=i.pages.find(s=>_l.night(s)),r=t.eventKinds?i.events.filter(s=>t.eventKinds.includes(s.kind)).map(s=>s.id):"all";return{id:e,name:n,profile:t.id,playlist:Dr(t,i.pages),night:a?{page:a.id}:{},control:{enabled:!0,dashboard:"/lovelace/0",idle:60},events:r,...structuredClone(t.display)}};var Nr={key:"color",label:"Farbe",type:"select",options:[[void 0,"Standard"],["ink","Hell / Tinte"],["muted","Ged\xE4mpft"],["faint","Leise"],["accent","Akzent (Gold)"]]},oe={key:"label",label:"\xDCberschrift",type:"text"},Mr={key:"color",label:"Farbe",type:"select",options:[[void 0,"automatisch"],["accent","Akzent"],["cold","K\xFChl (blau)"],["good","Gut (gr\xFCn)"],["alert","Warnung (rot)"],["ink","Hell / Tinte"],["muted","Ged\xE4mpft"]]},Cl={key:"style",label:"Rahmen",type:"select",options:[[void 0,"Schlicht"],["card","Karte"]]},Nl={clock:[{key:"size",label:"Gr\xF6\xDFe",type:"select",options:[[void 0,"f\xFCllt das Feld"],["small","klein (Kopfzeile)"]]},{key:"font",label:"Schrift",type:"select",options:[[void 0,"Stil-Schrift"],["sans","Schlicht"]]},{key:"seconds",label:"Sekunden",type:"boolean"},Nr],date:[{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Zeile"],["card","Karte"]]},{key:"format",label:"Format",type:"select",options:[[void 0,"Montag, 12. Oktober"],["short","Mo., 12. Okt."]]},{key:"size",label:"Schriftgr\xF6\xDFe",type:"number",min:10,max:120,placeholder:"26"},Nr],text:[{key:"text",label:"Text",type:"textarea",help:"Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert."},{key:"markdown",label:"Formatierung (Markdown)",type:"boolean",help:"# Titel, - Liste, **fett**, *Akzent*, [mdi:icon], --- Linie"},{key:"style",label:"Stil",type:"select",options:[[void 0,"Flie\xDFtext"],["label","\xDCberschrift klein"],["title","Titel"],["big","Gro\xDF"]]},{key:"size",label:"Schriftgr\xF6\xDFe",type:"number",min:10,max:200},{key:"icon",label:"Icon",type:"icon"},Nr],chart:[oe,{key:"entities",label:"Entit\xE4ten",type:"list",addLabel:"Entit\xE4t hinzuf\xFCgen",itemLabel:t=>t.name||t.entity||"Entit\xE4t",newItem:()=>({}),fields:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"name",label:"Name",type:"text",placeholder:"automatisch"},Mr]},{key:"kind",label:"Darstellung",type:"select",options:[[void 0,"Linie"],["area","Fl\xE4che"],["bar","Balken"]]},{key:"hours",label:"Zeitraum (Stunden)",type:"number",min:1,placeholder:"24",help:"168 = eine Woche, 720 = 30 Tage"},{key:"period",label:"Ein Balken je",type:"select",options:[[void 0,"automatisch"],["hour","Stunde"],["day","Tag"]],when:t=>t.kind==="bar"},{key:"value",label:"Aktuellen Wert zeigen",type:"boolean",default:!0,when:t=>t.kind!=="bar"},{key:"min",label:"Achse von",type:"number",placeholder:"automatisch"},{key:"max",label:"Achse bis",type:"number",placeholder:"automatisch"},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},Cl],gauge:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"name",label:"Name",type:"text",placeholder:"automatisch"},{key:"icon",label:"Icon",type:"icon"},{key:"kind",label:"Form",type:"select",options:[[void 0,"Ring"],["half","Halbkreis"]]},{key:"min",label:"Minimum",type:"number",placeholder:"0",advanced:!1},{key:"max",label:"Maximum",type:"number",placeholder:"100",advanced:!1},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},Mr,{key:"severity",label:"Farbe ab Wert",type:"list",addLabel:"Stufe hinzuf\xFCgen",itemLabel:t=>d("ab {n}",{n:t.from??"?"}),newItem:()=>({from:0,color:"good"}),fields:[{key:"from",label:"ab Wert",type:"number"},Mr]},Cl],image:[{key:"url",label:"Bild-Link",type:"text",placeholder:"https://\u2026, /local/bild.jpg oder media-source://\u2026",help:"Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg"},{key:"entity",label:"\u2026 oder Bild einer Entit\xE4t",type:"entity",when:t=>!t.url,help:"Person, image.*, Kamera, Medienplayer \u2026"},{key:"fit",label:"Einpassen",type:"select",options:[[void 0,"F\xFCllen (zuschneiden)"],["contain","Ganz zeigen"]]},{key:"refresh",label:"Neu laden alle (s)",type:"number",min:0,placeholder:"nie"},{key:"caption",label:"Bildunterschrift",type:"text",help:"Darf eine Vorlage sein."},{key:"radius",label:"Eckenradius (px)",type:"number",min:0,placeholder:"28"}],weather:[{key:"entity",label:"Wetter",type:"entity",domains:["weather"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Jetzt (gro\xDF)"],["card","Karte mit 4 Stunden"],["hourly","Stunden-Kurve"],["daily","N\xE4chste Tage"],["rain","Regen-Vorschau"],["line","Eine Zeile"]]},{key:"name",label:"Ortsname",type:"text",when:t=>t.variant==="card"},{key:"hours",label:"Stunden",type:"number",min:2,max:48,when:t=>t.variant==="hourly"||t.variant==="rain"},{key:"days",label:"Tage",type:"number",min:1,max:7,when:t=>t.variant==="daily"},{key:"rain_sensor",label:"Regensensor",type:"entity",domains:["binary_sensor"],when:t=>t.variant==="rain"},{key:"threshold",label:"Regen ab %",type:"number",min:0,max:100,when:t=>t.variant==="rain"},{...oe,when:t=>t.variant==="hourly"||t.variant==="daily"}],value:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"name",label:"Name",type:"text"},{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Schlicht"],["card","Karte"]]},{...oe,when:t=>t.style==="card"},{key:"icon",label:"Icon",type:"icon"},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},{key:"cold",label:"Kalt unter",type:"number",help:"Wert wird blau, wenn er darunter liegt."},{key:"sub",label:"Unterzeile",type:"object",when:t=>t.style==="card",fields:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"suffix",label:"Text danach",type:"text",placeholder:"% Luftfeuchte"}]},{key:"secondary",label:"Weitere Werte",type:"list",when:t=>t.style==="card",addLabel:"Wert",itemLabel:t=>t.name??t.entity??"Wert",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4}]}],rooms:[{key:"rooms",label:"R\xE4ume",type:"list",addLabel:"Raum",itemLabel:t=>t.name??"Raum",fields:[{key:"name",label:"Name",type:"text"},{key:"temperature",label:"Temperatur",type:"entity",domains:["sensor","climate"]},{key:"humidity",label:"Luftfeuchte",type:"entity",domains:["sensor"]},{key:"climate",label:"Heizung",type:"entity",domains:["climate"]},{key:"windows",label:"Fenster",type:"entities",domains:["binary_sensor"]}]},{key:"cold",label:"Kalt unter \xB0C",type:"number",placeholder:"16"},{key:"warm",label:"Warm \xFCber \xB0C",type:"number",placeholder:"26"},{key:"columns",label:"Spalten",type:"number",min:1,max:6,placeholder:"3"}],status:[oe,{key:"windows",label:"Offene Fenster & T\xFCren",type:"autolist",autoLabel:"Alle Fenster- und T\xFCrsensoren",fields:[{key:"entity",label:"Sensor",type:"entity",domains:["binary_sensor"]},{key:"name",label:"Name",type:"text"},{key:"room",label:"Raum",type:"text"}]},{key:"appliances",label:"Laufende Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",fields:[{key:"entity",label:"L\xE4uft-Entit\xE4t",type:"entity"},{key:"name",label:"Name",type:"text"},{key:"icon",label:"Icon",type:"icon"}]},{key:"lights",label:"Lichter an",type:"select",options:[["auto","z\xE4hlen"],[void 0,"nicht zeigen"]]},{key:"waste",label:"M\xFCllkalender",type:"entity",domains:["calendar"]},{key:"waste_days",label:"M\xFCll zeigen ab Tagen",type:"number",min:0,max:7,placeholder:"2"},{key:"max",label:"H\xF6chstens Eintr\xE4ge",type:"number",min:1,max:10,placeholder:"5"},{key:"calm_title",label:"Text wenn alles ruhig",type:"text",placeholder:"Alles ruhig"}],calendar:[{key:"entity",label:"Kalender",type:"entity",domains:["calendar"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Karte"],["line","Zeile"]]},{key:"waste",label:"Ist M\xFCllkalender",type:"boolean"},{key:"days",label:"Nur zeigen bis Tage",type:"number",min:0},oe,{key:"icon",label:"Icon",type:"icon"}],infoline:[{key:"items",label:"Teile",type:"list",addLabel:"Teil",itemLabel:t=>t.name??t.text??{weather:"Wetter",calendar:"Termin",entity:"Wert",text:"Text",waste:"M\xFClltonnen",status:"Hinweis",device:"Ger\xE4t",media:"Wiedergabe",agenda:"N\xE4chster Termin"}[t.type]??"Teil",newItem:()=>({type:"entity"}),fields:[{key:"type",label:"Art",type:"select",options:[["weather","Wetter"],["calendar","Termin"],["waste","M\xFClltonnen (im Wechsel)"],["entity","Wert"],["text","Text"],["status","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)"],["device","Ger\xE4t l\xE4uft \u2013 mit Restzeit"],["media","Wiedergabe (z. B. Apple TV)"],["agenda","N\xE4chster Termin"]]},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>!["text","waste","media"].includes(t.type)},{key:"entities",label:"Player",type:"entities",domains:["media_player"],when:t=>t.type==="media"},{key:"entities",label:"Kalender",type:"entities",domains:["calendar"],help:"Leer = die ersten Kalender automatisch",when:t=>t.type==="agenda"},{key:"hours",label:"Termine der n\xE4chsten \u2026 Stunden",type:"number",min:1,max:72,placeholder:"24",when:t=>t.type==="agenda"},{key:"state",label:"Zeigen bei Zustand",type:"text",placeholder:"on",when:t=>t.type==="status"},{key:"state",label:"L\xE4uft bei Zustand",type:"text",placeholder:"on, run, running \u2026",help:"Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde",when:t=>t.type==="device"},{key:"text",label:"Text",type:"text",placeholder:"Es regnet",when:t=>t.type==="status"},{key:"remaining",label:"Restzeit oder Endzeit",type:"entity",domains:["sensor"],when:t=>t.type==="device"},{key:"progress",label:"Fortschritt %",type:"entity",domains:["sensor"],when:t=>t.type==="device"},{key:"detail",label:"Zusatz",type:"entity",help:"z. B. aktueller Raum des Saugers",when:t=>t.type==="device"},{key:"show_end",label:"Endzeit statt Restzeit",type:"boolean",when:t=>t.type==="device"},{key:"list",label:"Nur wenn eine davon an ist",type:"list",addLabel:"Entit\xE4t",help:"z. B. Fenster \u2013 die offenen werden genannt",itemLabel:t=>t.name??t.entity??"Entit\xE4t",newItem:()=>({}),fields:[{key:"entity",label:"Entit\xE4t",type:"entity",domains:["binary_sensor","input_boolean","switch"]},{key:"name",label:"Name",type:"text"}],when:t=>t.type==="status"},{key:"show_if",label:"Nur zeigen, wenn",type:"conditions"},{key:"days",label:"Nur wenn in Tagen",type:"number",when:t=>t.type==="calendar"},{key:"days",label:"Tonnen der n\xE4chsten \u2026 Tage",type:"number",min:0,placeholder:"7",when:t=>t.type==="waste"},{key:"bins",label:"Tonnen",type:"list",addLabel:"Tonne",help:"Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch",itemLabel:t=>t.name??t.entity??"Tonne",newItem:()=>({}),fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Tage-Sensor",type:"entity",domains:["sensor"]},{key:"color",label:"Farbe",type:"color"}],when:t=>t.type==="waste"},{key:"name",label:"Name",type:"text",when:t=>["entity","device","media"].includes(t.type)},{key:"icon",label:"Icon",type:"icon",when:t=>["entity","status","device","media","agenda"].includes(t.type)},{key:"text",label:"Text",type:"text",when:t=>t.type==="text"}]}],camera:[{key:"entity",label:"Kamera",type:"entity",domains:["camera","image"],when:t=>!t.url},{key:"url",label:"\u2026 oder Webcam-Link",type:"text",placeholder:"https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)",suggestions:Kn,help:"\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld"},{key:"mode",label:"Modus",type:"select",options:[[void 0,"Live"],["snapshot","Standbild"]],when:t=>!t.url},{key:"refresh",label:"Standbild neu laden (s)",type:"number",min:0,when:t=>!t.url&&t.mode==="snapshot"},{key:"refresh",label:"Bild neu laden (s)",type:"number",min:10,placeholder:"60",when:t=>!!t.url},{key:"title",label:"Bildunterschrift",type:"text"},{key:"text",label:"Text aus Entit\xE4t",type:"entity",help:"z. B. KI-Analyse der Kamera"},{key:"radius",label:"Eckenradius",type:"number",min:0,max:60,placeholder:"28"}],pet:[{key:"name",label:"Name",type:"text",placeholder:"Polly"},{key:"visits",label:"Z\xE4hler \u201Eheute\u201C",type:"entity",domains:["sensor","counter"],help:"z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck"},{key:"unit",label:"Bezeichnung",type:"text",placeholder:"Besuche heute"},{key:"days",label:"Verlauf (Tage)",type:"number",min:0,max:31,placeholder:"7"},{key:"icon",label:"Icon",type:"icon"},oe],balance:[{key:"switch_hour",label:"Heute ab (Uhr)",type:"number",min:0,max:24,placeholder:"18",help:"Davor zeigt die Bilanz den Vortag"},{key:"groups",label:"Gruppen (YAML)",type:"yaml",help:`- label: Strom
  rows:
    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}
    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`},oe],qr:[{key:"ssid",label:"Netzname (SSID)",type:"text"},{key:"password",label:"Passwort",type:"text"},{key:"encryption",label:"Verschl\xFCsselung",type:"select",options:[[void 0,"WPA/WPA2/WPA3"],["WEP","WEP"],["nopass","Offen"]]},{key:"hidden",label:"Verstecktes Netz",type:"boolean"},{key:"show_password",label:"Passwort zus\xE4tzlich als Text",type:"boolean"},{key:"hint",label:"Hinweis",type:"text",placeholder:"Handy-Kamera auf den Code halten"},{key:"image",label:"Eigenes QR-Bild",type:"text",placeholder:"/local/gaeste-wlan.png",help:"Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)",advanced:!0},oe],job:[oe,{key:"title",label:"Name des Auftrags",type:"entity"},{key:"progress",label:"Fortschritt (%)",type:"entity",domains:["sensor"]},{key:"remaining",label:"Restzeit",type:"entity",domains:["sensor"]},{key:"end",label:"Endzeit",type:"entity",domains:["sensor"]},{key:"layer",label:"Schicht",type:"entity",domains:["sensor"]},{key:"layers",label:"Schichten gesamt",type:"entity",domains:["sensor"]},{key:"status",label:"Status",type:"entity"},{key:"temps",label:"Temperaturen",type:"list",addLabel:"Temperatur",itemLabel:t=>t.name??"Temperatur",newItem:()=>({}),fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity",domains:["sensor"]}]}],summary:[{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Ohne Rahmen"],["card","Karte"]]},{key:"size",label:"Schriftgr\xF6\xDFe Punkte (px)",type:"number",min:14,max:40,placeholder:"22"},oe],news:[{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Gro\xDFbild mit Schlagzeile"],["list","Liste mit Vorschaubildern"],["ticker","Laufband"]]},{key:"feeds",label:"Quellen",type:"list",addLabel:"Quelle",help:"Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.",itemLabel:t=>Ja.find(([i])=>i===t.value)?.[1]??t.value??"Quelle",newItem:()=>({value:Zt()[0]}),fields:[{key:"value",label:"Quelle",type:"text",suggestions:Ja,placeholder:"bbc, tagesschau \u2026 oder https://\u2026"}]},{key:"interval",label:"Wechsel nach (s)",type:"number",min:5,placeholder:"14",when:t=>!t.variant},{key:"max",label:"Meldungen",type:"number",min:1,max:30,placeholder:"8"},{key:"speed",label:"Tempo (px/s)",type:"number",min:10,max:200,placeholder:"45",when:t=>t.variant==="ticker"},oe],today:[{key:"calendars",label:"Kalender",type:"entities",domains:["calendar"],help:"Leer = die ersten Kalender automatisch"},{key:"weather",label:"Wetter",type:"entity",domains:["weather"]},oe],daily:[{key:"kind",label:"Inhalt",type:"select",options:[[void 0,"Wikipedia-Artikel des Tages"],["quote","Zitat"]]},{key:"language",label:"Wikipedia-Sprache",type:"select",options:[[void 0,"wie die Anzeige"],["de","Deutsch"],["en","English"],["sv","Svenska"]],help:"Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.",when:t=>t.kind!=="quote"},{key:"source",label:"Quelle",type:"select",options:[[void 0,"wie die Anzeige"],["wikiquote","Wikiquote \xB7 Deutsch, Zitat der Woche"],["zenquotes","ZenQuotes \xB7 English, quote of the day"]],when:t=>t.kind==="quote"},{key:"image",label:"Bild",type:"select",options:[[void 0,"Mit Bild"],[!1,"Ohne Bild"]],when:t=>t.kind!=="quote"},oe],card:[{key:"card",label:"Lovelace-Karte (YAML)",type:"yaml",help:"Jede Karte aus dem Dashboard, z. B. type: entities \u2026"}],price:[oe,{key:"entity",label:"Aktueller Preis",type:"entity",domains:["sensor"],help:"Optional \u2013 sonst aus dem Tibber-Verlauf."},{key:"home",label:"Tibber-Zuhause",type:"text",placeholder:"erstes"},{key:"window",label:"G\xFCnstigstes Fenster (h)",type:"number",min:1,max:6,placeholder:"2"},{key:"tomorrow",label:"Morgen anzeigen",type:"boolean",default:!0},{key:"note",label:"Fu\xDFnote",type:"text"}],power:[oe,{key:"production",label:"Erzeugung (W)",type:"list",addLabel:"Quelle",itemLabel:t=>t.name??t.entity??"Quelle",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Leistung",type:"entity",domains:["sensor"]}]},{key:"consumption",label:"Verbrauch",type:"object",fields:[{key:"name",label:"Name",type:"text",placeholder:"Verbrauch"},{key:"entity",label:"Leistung (W)",type:"entity",domains:["sensor"]}]},{key:"forecast",label:"Prognose heute (kWh)",type:"entity",domains:["sensor"]},{key:"forecast_remaining",label:"Prognose Rest (kWh)",type:"entity",domains:["sensor"]},{key:"extra",label:"Zusatzwert",type:"entity",domains:["sensor"]},{key:"extra_name",label:"Zusatzwert Name",type:"text"}],car:[{key:"name",label:"Name",type:"text"},{key:"battery",label:"Akku %",type:"entity",domains:["sensor"]},{key:"range",label:"Reichweite",type:"entity",domains:["sensor"]},{key:"location",label:"Standort",type:"entity",domains:["device_tracker","person"]},{key:"charging",label:"L\xE4dt",type:"entity",domains:["binary_sensor"]},{key:"plugged",label:"Angesteckt",type:"entity",domains:["binary_sensor"]},{key:"charger_power",label:"Ladeleistung",type:"entity",domains:["sensor"]},{key:"time_full",label:"Voll um",type:"entity",domains:["sensor"]},{key:"lock",label:"Schloss",type:"entity",domains:["lock"]},{key:"limit",label:"Ladelimit",type:"entity",domains:["number","sensor"]},{key:"inside_temp",label:"Innentemperatur",type:"entity",domains:["sensor"]}],persons:[oe,{key:"persons",label:"Personen",type:"list",addLabel:"Person",itemLabel:t=>t.name??t.entity??"Person",fields:[{key:"entity",label:"Person",type:"entity",domains:["person","device_tracker"]},{key:"name",label:"Name",type:"text"},{key:"location",label:"Ortsangabe",type:"entity",domains:["sensor"],help:"z. B. \u201EGeocoded Location\u201C der Companion-App"}]}],vacuum:[oe,{key:"vacuums",label:"Sauger",type:"list",addLabel:"Sauger",itemLabel:t=>t.name??t.entity??"Sauger",fields:[{key:"entity",label:"Sauger",type:"entity",domains:["vacuum"]},{key:"name",label:"Name",type:"text"},{key:"battery",label:"Akku",type:"entity",domains:["sensor"],help:"Leer = automatisch suchen"},{key:"room",label:"Aktueller Raum",type:"entity",domains:["sensor"]},{key:"map",label:"Saugkarte",type:"entity",domains:["image","camera"],help:"Leer = Karte des Saugers automatisch"}]},{key:"maps",label:"Kleine Karten",type:"select",options:[[void 0,"Neben jedem Sauger"],[!1,"Ausblenden"]]},{key:"map",label:"Gro\xDFe Karte darunter",type:"entity",domains:["image","camera"]}],waste:[oe,{key:"bins",label:"Tonnen",type:"list",addLabel:"Tonne",itemLabel:t=>t.name??"Tonne",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Tage bis Abholung",type:"entity",domains:["sensor"]},{key:"color",label:"Farbe",type:"color"},{key:"out",label:"Steht drau\xDFen",type:"entity",domains:["input_boolean","binary_sensor"]}]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:8,placeholder:"4"},{key:"highlight",label:"Hervorheben ab Tagen",type:"number",min:0,max:7,placeholder:"1"}],activity:[{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Eine Zeile (dezent)"],["list","Liste"]]},{key:"entities",label:"Melder",type:"autolist",autoLabel:"Alle Bewegungs-/Pr\xE4senzmelder",domains:["binary_sensor"],offValue:"auto"},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["binary_sensor"]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:8,placeholder:"3"},{key:"within",label:"Zeitraum (min)",type:"number",min:5,placeholder:"120"},{...oe,when:t=>t.variant==="list"}],list:[oe,{key:"rows",label:"Zeilen",type:"list",addLabel:"Zeile",itemLabel:t=>t.name??t.entity??"Zeile",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"icon",label:"Icon",type:"icon"},{key:"format",label:"Bewertung",type:"select",options:[[void 0,"keine"],["aqi","Luftqualit\xE4t (AQI)"],["uv","UV-Index"],["lux","Helligkeit (Lux)"],["humidity","Luftfeuchte (Raum)"],["rain","Regen an/aus"],["onoff","An/Aus"]]},{key:"unit",label:"Einheit",type:"text"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4}]}],agenda:[oe,{key:"calendars",label:"Kalender",type:"entities",domains:["calendar"]},{key:"days",label:"Tage voraus",type:"number",min:1,max:31,placeholder:"7"},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:12,placeholder:"6"},{key:"location",label:"Ort zeigen",type:"boolean",default:!0}],media:[oe,{key:"entities",label:"Player",type:"entities",domains:["media_player"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Kompakt"],["full","Ganze Seite mit gro\xDFem Cover"]]},{key:"show_paused",label:"Auch pausiert zeigen",type:"boolean"}],appliances:[oe,{key:"items",label:"Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??"Ger\xE4t",fields:[{key:"name",label:"Name",type:"text"},{key:"running",label:"L\xE4uft-Entit\xE4t",type:"entity"},{key:"icon",label:"Icon",type:"icon"},{key:"power",label:"Leistung",type:"entity",domains:["sensor"]},{key:"progress",label:"Fortschritt %",type:"entity",domains:["sensor"]},{key:"end",label:"Endzeit",type:"entity",domains:["sensor"]},{key:"cost",label:"Kosten",type:"entity",domains:["sensor"]}]},{key:"empty_text",label:"Text wenn nichts l\xE4uft",type:"text",placeholder:"Nichts l\xE4uft gerade"}],consumers:[oe,{key:"count",label:"Anzahl",type:"number",min:1,max:10,placeholder:"3"},{key:"devices",label:"Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",help:"Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant",fields:[{key:"entity",label:"Energiez\xE4hler (kWh)",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"}],advanced:!0},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["sensor"],advanced:!0}],batteries:[oe,{key:"part",label:"Zeigen",type:"select",options:[[void 0,"Ger\xE4te und schwache Batterien"],["devices","Nur Ger\xE4te"],["low","Nur schwache Batterien"]]},{key:"devices",label:"Ger\xE4te (immer zeigen)",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",help:"Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App",fields:[{key:"entity",label:"Akkustand",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"}]},{key:"threshold",label:"Zubeh\xF6r zeigen unter (%)",type:"number",min:1,max:100,placeholder:"21"},{key:"max",label:"H\xF6chstens Zeilen Zubeh\xF6r",type:"number",min:1,max:12,placeholder:"5",advanced:!0},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["sensor","binary_sensor"],advanced:!0}],covers:[oe,{key:"covers",label:"Rolll\xE4den",type:"list",addLabel:"Rollladen",itemLabel:t=>t.name??t.entity??"Rollladen",fields:[{key:"entity",label:"Rollladen",type:"entity",domains:["cover"]},{key:"name",label:"Name",type:"text"},{key:"invert",label:"Richtung umkehren",type:"boolean",help:"Wenn der Antrieb offen und zu andersherum meldet"}]},{key:"only_open",label:"Nur offene listen",type:"boolean"}],warnings:[oe,{key:"entities",label:"Warn-Sensoren",type:"entities",domains:["binary_sensor"]},{key:"calm_text",label:"Text ohne Warnung",type:"text",placeholder:"Keine Warnungen"}]},Vi=[[void 0,"Schrift des Stils"],...Yi.map(t=>[t.id,`${t.name} \xB7 ${t.kind==="serif"?"Serife":"ohne Serife"}`])],Ml=[["auto","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang"],["light","Immer hell"],["dark","Immer dunkel"]],Pr=[["none","Aus"],["particles","Schwebende Partikel"],["flow","Flie\xDFender Verlauf"],["bokeh","Lichtschimmer"],["mist","Nebel"]],Ir=[["fade","\xDCberblenden"],["blur","Weich (Unsch\xE4rfe)"],["slide","Schieben"],["zoom","Zoom"]],Dl=[{key:"action",label:"Aktion",type:"select",options:[[void 0,"keine"],["toggle","Ein/aus schalten"],["more_info","Details (HA-Dialog)"],["perform","Aktion/Skript ausf\xFChren"],["page","Seite zeigen"],["popup","Pop-up mit HA-Karte"],["pause","Wiedergabe anhalten/fortsetzen"],["dashboard","HA-Dashboard \xF6ffnen"]]},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>["toggle","more_info"].includes(t.action)},{key:"perform",label:"Aktion (domain.dienst)",type:"text",placeholder:"script.turn_on",suggestions:[["script.turn_on","Skript starten"],["scene.turn_on","Szene aktivieren"],["light.toggle","Licht umschalten"],["cover.toggle","Rollladen/Tor umschalten"],["media_player.media_play_pause","Wiedergabe/Pause"],["input_boolean.toggle","Helfer umschalten"]],when:t=>t.action==="perform"},{key:"entity",label:"Ziel-Entit\xE4t",type:"entity",when:t=>t.action==="perform"},{key:"data",label:"Daten (YAML, optional)",type:"yaml",when:t=>t.action==="perform"},{key:"page",label:"Seite",type:"select",options:()=>Ct.pages,when:t=>t.action==="page"},{key:"title",label:"Titel",type:"text",when:t=>t.action==="popup"},{key:"card",label:"Karte (YAML)",type:"yaml",help:"z. B. type: entities, entities: [light.kueche]",when:t=>t.action==="popup"},{key:"timeout",label:"Schlie\xDFt nach (s)",type:"number",min:5,max:600,placeholder:"30",when:t=>t.action==="popup"},{key:"confirm",label:"Vorher nachfragen",type:"boolean",help:"F\xFCr Tor, T\xFCrschloss & Co.",when:t=>["toggle","perform"].includes(t.action)}],Pl=[{key:"look.card",label:"Als Karte",type:"boolean",help:"Fl\xE4che, Rand und Radius des Stils"},{key:"look.accent",label:"Akzentfarbe",type:"color"},{key:"look.ink",label:"Schriftfarbe",type:"color"},{key:"look.size",label:"Gr\xF6\xDFe (%)",type:"number",min:50,max:200,step:5,placeholder:"100"},{key:"look.opacity",label:"Deckkraft (%)",type:"number",min:10,max:100,step:5,placeholder:"100"},{key:"look.padding",label:"Innenabstand (px)",type:"number",min:0,max:80,placeholder:"0"}],ji=t=>[{key:`design.colors.${t}.bg`,label:"Hintergrund",type:"color"},{key:`design.colors.${t}.ink`,label:"Schrift",type:"color"},{key:`design.colors.${t}.accent`,label:"Akzent",type:"color"},{key:`design.colors.${t}.card`,label:"Karten",type:"color"},{key:`design.colors.${t}.card_opacity`,label:"Karten-Deckkraft (%)",type:"number",min:0,max:100,placeholder:"100"},{key:`design.colors.${t}.good`,label:"Gut (gr\xFCn)",type:"color"},{key:`design.colors.${t}.alert`,label:"Warnung (rot)",type:"color"},{key:`design.colors.${t}.cold`,label:"K\xFChl (blau)",type:"color"}],Fr=[{key:"design.radius",label:"Eckenradius der Karten (px)",type:"number",min:0,max:80,placeholder:"wie Stil"},{key:"design.css",label:"Eigenes CSS (alle Displays)",type:"textarea",placeholder:":host { --af-accent: #e0a060 }",help:"F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen."}],Il=[{key:"tap_action",label:"Beim Antippen",type:"object",fields:Dl},{key:"hold_action",label:"Beim langen Dr\xFCcken",type:"object",fields:Dl}],Fl=[{key:"align",label:"Waagerecht",type:"select",options:[[void 0,"links"],["center","mittig"],["end","rechts"]]},{key:"valign",label:"Senkrecht",type:"select",options:[[void 0,"oben"],["center","mittig"],["end","unten"]]},{key:"typeface",label:"Schrift",type:"select",options:[[void 0,"wie Design"],...Vi.slice(1)]}],Bl=[{key:"name",label:"Name",type:"text"},{key:"duration",label:"Dauer (s)",type:"number",min:3},{key:"background.type",label:"Hintergrund",type:"select",options:[["none","Stil-Farbe"],["photo","Foto"],["camera","Kamera / Webcam"],["color","Eigene Farbe"]]},{key:"background.color",label:"Farbe",type:"color",when:t=>t.background?.type==="color"},{key:"background.entity",label:"Kamera",type:"entity",domains:["camera"],when:t=>t.background?.type==="camera"&&!t.background?.url},{key:"background.url",label:"\u2026 oder Webcam-Link",type:"text",placeholder:"https://\u2026",suggestions:Kn,when:t=>t.background?.type==="camera"},{key:"background.refresh",label:"Bild neu laden (s)",type:"number",min:0,placeholder:"20",help:"0 = Livebild",when:t=>t.background?.type==="camera"},{key:"background.name",label:"Ortsname",type:"text",help:"Klein unten rechts, z. B. \u201ECuxhaven\u201C",when:t=>t.background?.type==="camera"&&!t.background?.sources?.length},{key:"background.sources",label:"Mehrere Webcams im Wechsel",type:"list",addLabel:"Webcam hinzuf\xFCgen",help:"Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben",itemLabel:t=>t.name||t.url||"Webcam",newItem:()=>({}),when:t=>t.background?.type==="camera",fields:[{key:"url",label:"Webcam-Link",type:"text",placeholder:"https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)",suggestions:Kn},{key:"name",label:"Ortsname",type:"text"},{key:"refresh",label:"Bild neu laden (s)",type:"number",min:0,placeholder:"wie oben"}]},{key:"palette",label:"Farben",type:"select",options:[["normal","Normal"],["night","Nacht (gedimmt)"]]},{key:"background.ambient",label:"Animation",type:"select",options:[[void 0,"wie Design"],...Pr],when:t=>t.palette!=="night"},{key:"transition.type",label:"\xDCbergang",type:"select",options:[[void 0,"wie Design"],...Ir],advanced:!0},{key:"transition.duration",label:"\xDCbergang (s)",type:"number",min:.2,max:10,step:.1,placeholder:"wie Design",advanced:!0},{key:"show_if",label:"Nur anzeigen wenn \u2026",type:"conditions"},{key:"css",label:"Eigenes CSS (nur diese Seite)",type:"textarea",placeholder:'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }',help:'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.'}],Br=[{id:"alarm",name:"Vollbild (Klingel, Alarm)",short:"Vollbild",icon:"bell"},{id:"live",name:"Bild-im-Bild (Bewegung)",short:"Bild-im-Bild",icon:"cam"},{id:"info",name:"Hinweis + Erinnerung (Ger\xE4te)",short:"Hinweis",icon:"info"},{id:"page",name:"Seite zeigen (z. B. bei Bewegung)",short:"Seite",icon:"page"},{id:"media",name:"Musik-Cover (bei Liedwechsel)",short:"Musik-Cover",icon:"music"}],Ki=t=>["alarm","live","info"].includes(t.kind),ke=(...t)=>i=>t.includes(i.kind),Ol=t=>[{key:"name",label:"Name",type:"text"},{key:"enabled",label:"Aktiv",type:"boolean",default:!0},{key:"kind",label:"Darstellung",type:"select",options:Br.map(i=>[i.id,i.name])},{key:"entity",label:"Ausl\xF6ser",type:"entity",when:i=>i.kind!=="media"},{key:"entities",label:"Weitere Ausl\xF6ser",type:"entities",when:ke("page"),help:"z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt"},{key:"entities",label:"Player",type:"entities",domains:["media_player"],when:ke("media"),help:"Gruppen zeigen jedes Lied nur einmal"},{key:"from",label:"von Zustand",type:"text",placeholder:"beliebig",when:i=>i.kind!=="media"},{key:"to",label:"zu Zustand",type:"text",placeholder:"on",suggestions:[["on","an"],["*","jede \xC4nderung (Tasten, event.*)"]],help:"* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten",when:i=>i.kind!=="media"},{key:"event_types",label:"Nur diese Ereignistypen",type:"multi",options:(i,e)=>(e?.states[i.entity]?.attributes.event_types??[]).map(n=>[n,n]),help:"Keiner gew\xE4hlt = alle",when:i=>i.to==="*"&&String(i.entity??"").startsWith("event.")},{key:"page",label:"Seite",type:"select",options:[[void 0,"\u2013 w\xE4hlen \u2013"],...t.pages.map(i=>[i.id,i.name])],when:ke("page")},{key:"style",label:"Cover",type:"select",options:[[void 0,"Karte unten rechts (kurz beim Liedwechsel)"],["fullscreen","Vollbild (kurz beim Liedwechsel)"],["mini","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft"]],when:ke("media")},{key:"mini_duration",label:"Ausblenden nach (s)",type:"number",min:5,placeholder:"dauerhaft",when:i=>i.kind==="media"&&i.style==="mini",help:"Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft."},{key:"mini_paused",label:"Nach Pause noch (s)",type:"number",min:0,placeholder:"120",when:i=>i.kind==="media"&&i.style==="mini",help:"0 = bei Pause sofort ausblenden"},{key:"mini_position",label:"Ecke",type:"select",options:[[void 0,"unten rechts"],["bottom-left","unten links"],["top-right","oben rechts"],["top-left","oben links"]],when:i=>i.kind==="media"&&i.style==="mini"},{key:"mini_size",label:"Gr\xF6\xDFe",type:"select",options:[["small","klein"],[void 0,"normal"],["large","gro\xDF"]],when:i=>i.kind==="media"&&i.style==="mini"},{key:"mini_cover",label:"Cover zeigen",type:"boolean",default:!0,when:i=>i.kind==="media"&&i.style==="mini"},{key:"mini_progress",label:"Fortschritt zeigen",type:"boolean",default:!0,when:i=>i.kind==="media"&&i.style==="mini"},{key:"mini_background",label:"Hintergrund",type:"select",options:[[void 0,"Karte"],["none","ohne (nur Text und Cover)"]],when:i=>i.kind==="media"&&i.style==="mini"},{key:"interval",label:"Zwischendurch alle (min)",type:"number",min:0,when:i=>i.kind==="media"&&i.style!=="mini",help:"W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel"},{key:"camera",label:"Kamera",type:"entity",domains:["camera"],when:ke("alarm","live")},{key:"title",label:"Titel",type:"text",when:Ki},{key:"where",label:"Ort / Zusatz",type:"text",when:Ki},{key:"where",label:"Raum",type:"text",when:ke("media"),placeholder:"Name des Players"},{key:"icon",label:"Icon",type:"icon",when:Ki},{key:"text",label:"Text aus Entit\xE4t",type:"entity",when:Ki,help:"z. B. KI-Beschreibung oder Warn-\xDCberschrift"},{key:"text_attribute",label:"\u2026 aus Attribut",type:"text",when:i=>Ki(i)&&!!i.text},{key:"cost",label:"Kosten-Sensor",type:"entity",domains:["sensor"],when:ke("info")},{key:"reminder",label:"Erinnerung oben rechts",type:"select",options:[[void 0,"bleibt, bis man sie antippt"],["off","keine Erinnerung"],[15,"15 Minuten"],[30,"30 Minuten"],[60,"1 Stunde"],[120,"2 Stunden"],[240,"4 Stunden"],[480,"8 Stunden"],[1440,"1 Tag"]],when:ke("info"),help:"Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht."},{key:"chip",label:"Erinnerungstext",type:"text",when:i=>i.kind==="info"&&i.reminder!=="off"},{key:"reminder_clear",label:"Weg, wenn das Ger\xE4t wieder startet",type:"boolean",default:!0,when:i=>i.kind==="info"&&i.reminder!=="off"&&!!i.from,help:"Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt."},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"30",when:ke("live")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"60",when:ke("info")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"12 / Vollbild 15",when:ke("media")},{key:"duration",label:"Mindestens (s)",type:"number",min:3,placeholder:"60",when:ke("page"),help:"Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin."},{key:"max",label:"H\xF6chstens (s)",type:"number",min:3,when:ke("alarm")},{key:"max",label:"H\xF6chstens (s)",type:"number",min:3,placeholder:"600",when:ke("page"),help:"Obergrenze, auch wenn ein Melder dauerhaft an bleibt."},{key:"hold_after",label:"Nachlauf (s)",type:"number",min:0,when:ke("alarm","page"),help:"So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist."},{key:"cooldown",label:"Abklingzeit (s)",type:"number",min:0,when:ke("live"),help:"Danach erst wieder zeigen \u2013 gegen Dauerfeuer."},{key:"cooldown",label:"Abklingzeit (s)",type:"number",min:0,when:ke("page"),help:"Nach dem Ende so lange nicht erneut zeigen."},{key:"at_night",label:"Auch nachts",type:"boolean"},{key:"sound",label:"Ton",type:"text",placeholder:"kein Ton",suggestions:[...(t.sounds??[]).map(i=>[i.id,`${i.name} \xB7 ${d("eigener Ton")}`]),...Mi],help:"Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.",when:i=>i.kind!=="media"},{key:"sound_repeat",label:"Wiederholen",type:"select",options:[[void 0,"einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)"],["once","einmal"],[2,"2 \xD7"],[3,"3 \xD7"],[5,"5 \xD7"],[10,"10 \xD7"],["loop","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)"]],when:i=>!!i.sound&&i.kind!=="media"},{key:"sound_interval",label:"Abstand (s)",type:"number",min:1,max:60,step:.5,placeholder:"4",when:i=>!!i.sound&&i.kind!=="media"&&!!i.sound_repeat&&i.sound_repeat!=="once"},{key:"volume",label:"Lautst\xE4rke (%)",type:"number",min:5,max:100,placeholder:"70",when:i=>!!i.sound&&i.kind!=="media",help:"Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets."},{key:"quiet.after",label:"Ruhezeit ab",type:"text",placeholder:"22:00"},{key:"quiet.before",label:"Ruhezeit bis",type:"text",placeholder:"07:00"},{key:"quiet_action",label:"In der Ruhezeit",type:"select",options:[[void 0,"ohne Ton zeigen"],["skip","gar nicht zeigen"]],when:i=>!!(i.quiet?.after||i.quiet?.before)},{key:"only_home",label:"Nur wenn jemand zu Hause ist",type:"boolean",help:"Mindestens eine Person (person.*) ist \u201Ehome\u201C."},{key:"show_if",label:"Nur wenn au\xDFerdem \u2026",type:"conditions"}],Wl=t=>[{key:"name",label:"Name",type:"text"},{key:"theme",label:"Stil",type:"select",options:[[void 0,"wie Design"],...ht.map(i=>[i.id,i.name])]},{key:"mode",label:"Hell/Dunkel",type:"select",options:[[void 0,"wie Design"],...Ml]},{key:"orientation",label:"Ausrichtung",type:"select",options:[[void 0,"Automatisch (nach Ger\xE4t, auch beim Drehen)"],["landscape","Immer quer"],["portrait","Immer hoch"]]},{key:"transition.type",label:"\xDCbergang",type:"select",options:[[void 0,"wie Design"],...Ir],advanced:!0},{key:"transition.duration",label:"\xDCbergang (s)",type:"number",min:.2,max:10,step:.1,placeholder:"wie Design",advanced:!0},{key:"night.entity",label:"Nacht, wenn an",type:"entity",domains:["input_boolean","binary_sensor","switch","schedule"]},{key:"night.page",label:"Nachtseite",type:"select",options:[[void 0,"eingebaut"],...t.pages.map(i=>[i.id,i.name])]},{key:"control.enabled",label:"Bedienmodus",type:"boolean",default:!0},{key:"nav",label:"Pfeile zum Bl\xE4ttern",type:"boolean",default:!0,help:"Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen",when:i=>i.control?.enabled!==!1},{key:"control.mode",label:"Bedienung",type:"select",options:[[void 0,"Dashboard \xFCber Ambiframe (Antippen)"],["screensaver","Dashboard in Fully, Ambiframe als Bildschirmschoner"]],help:"Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.",when:i=>i.control?.enabled!==!1},{key:"control.dashboard",label:"Dashboard",type:"text",placeholder:"/lovelace/0",when:i=>i.control?.enabled!==!1},{key:"control.idle",label:"Zur\xFCck nach (s)",type:"number",min:10,help:"Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint",when:i=>i.control?.enabled!==!1},{key:"pause_minutes",label:"Pause endet nach (min)",type:"number",min:0,placeholder:"60",help:"F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie"},{key:"watchdog.button",label:"Neustart-Taste",type:"entity",domains:["button","input_button"],help:"Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C."},{key:"watchdog.after",label:"Neustart nach (s)",type:"number",min:60,placeholder:"120",when:i=>!!i.watchdog?.button},{key:"oled",label:"OLED-Schutz",type:"boolean",help:"F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C."},{key:"reminders",label:"Erinnerungen oben rechts",type:"boolean",default:!0,help:"Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis"},{key:"reminders_stack",label:"Stapeln ab",type:"select",options:[[void 0,"3 Erinnerungen"],[2,"2 Erinnerungen"],[4,"4 Erinnerungen"],[5,"5 Erinnerungen"],[0,"nie stapeln"]],when:i=>i.reminders!==!1,help:"Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf."},{key:"history",label:"Mitteilungszentrale",type:"boolean",default:!0,help:"Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C."},{key:"history_hours",label:"Verlauf reicht zur\xFCck",type:"select",options:[[6,"6 Stunden"],[12,"12 Stunden"],[void 0,"24 Stunden"],[48,"2 Tage"],[168,"1 Woche"]],when:i=>i.history!==!1},{key:"ticker",label:"Nachrichten-Laufband",type:"select",options:[[void 0,"automatisch (aus beim Fernseher)"],[!0,"an"],[!1,"aus"]],help:"Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln."},{key:"text_size",label:"Textgr\xF6\xDFe",type:"select",options:[[void 0,"wie Design"],["normal","normal"],["large","gro\xDF (+15 %)"],["xlarge","sehr gro\xDF (+30 %)"]]},{key:"contrast",label:"Kontrast",type:"select",options:[[void 0,"wie Design"],["normal","normal"],["high","hoch"]]}],Hl=[{key:"design.accent",label:"Akzentfarbe",type:"color",help:"Leer = wie Design"},{key:"design.fonts.display",label:"Schrift Uhr & Titel",type:"select",options:[[void 0,"wie Design"],...Vi.slice(1)]},{key:"design.fonts.text",label:"Schrift Text",type:"select",options:[[void 0,"wie Design"],...Vi.slice(1)]},{key:"design.ambient.type",label:"Animation",type:"select",options:[[void 0,"wie Design"],...Pr]},{key:"design.evening",label:"Abendstimmung",type:"select",options:[[void 0,"wie Design"],["sun","dunkel: nach Sonnenuntergang w\xE4rmer"],["off","aus"]]},{key:"design.language",label:"Sprache",type:"select",options:[[void 0,"wie Design"],["auto","automatisch (wie der HA-Benutzer)"],["de","Deutsch"],["en","English"],["nl","Nederlands"],["fr","Fran\xE7ais"]]},{key:"design.radius",label:"Eckenradius der Karten (px)",type:"number",min:0,max:80,placeholder:"wie Design",advanced:!0},{key:"design.css",label:"Eigenes CSS (nur dieses Display)",type:"textarea",placeholder:":host { --af-accent: #e0a060 }",help:"Erg\xE4nzt das CSS aus dem Design.",advanced:!0}],Rl=[{key:"stream.enabled",label:"Videostream",type:"boolean",help:"Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut."},{key:"stream.resolution",label:"Aufl\xF6sung",type:"select",options:[[void 0,"4K (3840 \xD7 2160)"],["1080p","Full HD (1920 \xD7 1080)"],["both","4K und Full HD (zwei Kameras)"]],when:t=>!!t.stream?.enabled},{key:"stream.tv",label:"Fernseher (Apple TV)",type:"entity",domains:["media_player"],help:"Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV",when:t=>!!t.stream?.enabled},{key:"stream.interval",label:"Neues Bild alle (s)",type:"number",min:.2,max:60,step:.1,placeholder:"0.2",when:t=>!!t.stream?.enabled,advanced:!0},{key:"stream.renderer",label:"Puppet-Adresse",type:"text",placeholder:"automatisch",help:"Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000",when:t=>!!t.stream?.enabled,advanced:!0}],Kl=[{key:"sound.mute",label:"Stumm",type:"boolean",help:"Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben"},{key:"sound.volume",label:"Lautst\xE4rke (%)",type:"number",min:0,max:100,placeholder:"100",help:"Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets",when:t=>!t.sound?.mute},{key:"sound.quiet.after",label:"Ruhezeit ab",type:"text",placeholder:"22:00",when:t=>!t.sound?.mute},{key:"sound.quiet.before",label:"Ruhezeit bis",type:"text",placeholder:"07:00",when:t=>!t.sound?.mute}],Or=[{key:"photos.folder",label:"Fotoordner",type:"text",placeholder:"wie Design",help:"Z. B. media-source://media_source/local/kueche"},{key:"photos.icloud",label:"iCloud-Album",type:"text",placeholder:"wie Design"},{key:"photos.bing",label:"Bing-Bilder",type:"select",options:[[void 0,"wie Design"],[!0,"ja"],[!1,"nein"]]},{key:"photos.bing_mix",label:"Bing-Bilder untermischen",type:"select",options:[[void 0,"wie Design"],[!0,"ja"],[!1,"nein \u2013 nur, wenn nichts Eigenes da ist"]]}],Wr=[{key:"design.language",label:"Sprache",type:"select",options:[[void 0,"automatisch (wie der HA-Benutzer)"],["de","Deutsch"],["en","English"],["nl","Nederlands"],["fr","Fran\xE7ais"]],help:"Anzeige, Editor und KI-Zusammenfassung"},{key:"design.mode",label:"Hell/Dunkel",type:"select",options:Ml},{key:"design.fonts.display",label:"Schrift Uhr & Titel",type:"select",options:Vi},{key:"design.fonts.text",label:"Schrift Text",type:"select",options:Vi},{key:"design.accent",label:"Akzentfarbe",type:"color",help:"Leer = Farbe des Stils"},{key:"design.text_size",label:"Textgr\xF6\xDFe",type:"select",options:[[void 0,"normal"],["large","gro\xDF (+15 %)"],["xlarge","sehr gro\xDF (+30 %)"]],help:"Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung"},{key:"design.contrast",label:"Kontrast",type:"select",options:[[void 0,"normal (ruhig)"],["high","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)"]]},{key:"design.evening",label:"Abendstimmung",type:"select",options:[["sun","dunkel: nach Sonnenuntergang w\xE4rmer"],["off","aus"]]}],Vl=[{key:"summary.enabled",label:"Zusammenfassung",type:"boolean",help:"Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen."},{key:"summary.times",label:"Erstellen um",type:"text",placeholder:"05:30, 12:00, 17:30",help:"Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.",when:t=>!!t.summary?.enabled},{key:"summary.style",label:"Stil",type:"select",options:[[void 0,"Knapp, nur Fakten"],["friendly","Freundlich"]],when:t=>!!t.summary?.enabled},{key:"summary.ai_task",label:"KI",type:"entity",domains:["ai_task"],placeholder:"automatisch: Gemini",when:t=>!!t.summary?.enabled}],Hr=[{key:"design.ambient.type",label:"Animation",type:"select",options:[[void 0,"wie der Stil"],...Pr],help:"Sehr ruhig; nachts aus. Pro Seite \xE4nderbar."},{key:"design.ambient.strength",label:"St\xE4rke",type:"select",options:[[void 0,"dezent"],[2,"mittel"],[3,"deutlich"]],advanced:!0},{key:"design.ambient.speed",label:"Tempo",type:"select",options:[[void 0,"langsam"],["normal","normal"]],advanced:!0},{key:"design.transition.type",label:"Seitenwechsel",type:"select",options:[[void 0,"\xDCberblenden"],...Ir.slice(1)]},{key:"design.transition.duration",label:"Dauer (s)",type:"number",min:.2,max:10,step:.1,placeholder:"2.4",advanced:!0}],jl=[{key:"photos.folder",label:"Fotoordner",type:"text",help:"HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C"},{key:"photos.icloud",label:"iCloud-Album",type:"text",placeholder:"https://photos.icloud.com/shared/album/\u2026",help:"Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt."},{key:"photos.bing",label:"Bing-Bilder",type:"boolean",help:"Wenn Ordner und Album leer sind"},{key:"photos.bing_mix",label:"Bing-Bilder untermischen",type:"boolean",help:"Bing-Bilder des Tages auch zwischen die eigenen Fotos",when:t=>t.photos?.bing!==!1},{key:"photos.bing_market",label:"Bing-Region",type:"select",options:[[void 0,"wie die Sprache von Home Assistant"],["de-DE","Deutschland"],["de-AT","\xD6sterreich"],["de-CH","Schweiz"],["en-US","USA"],["en-GB","United Kingdom"],["en-CA","Canada"],["en-AU","Australia"],["en-IN","India"],["fr-FR","France"],["es-ES","Espa\xF1a"],["it-IT","Italia"],["nl-NL","Nederland"],["ja-JP","\u65E5\u672C"],["zh-CN","\u4E2D\u56FD"],["pt-BR","Brasil"]],help:"Bilder und Bildunterschriften der Bing-Bilder des Tages",when:t=>t.photos?.bing!==!1,advanced:!0},{key:"photos.credit",label:"Bildunterschrift",type:"boolean"}],Me=(t,i)=>Object.keys(t?.states??{}).find(e=>e.startsWith(`${i}.`)),Ze=(t,i)=>Object.keys(t?.states??{}).filter(e=>e.startsWith(`${i}.`)),Gl=(t,i)=>{switch(t){case"weather":return{entity:Me(i,"weather"),variant:"card"};case"camera":return{entity:Me(i,"camera")};case"calendar":return{entity:Me(i,"calendar")};case"text":return{text:d("Text"),style:"title"};case"status":return{windows:"auto",lights:"auto"};case"chart":{let e=Ze(i,"sensor").find(n=>i?.states[n]?.attributes.device_class==="temperature");return{entities:e?[{entity:e}]:[]}}case"gauge":{let e=Ze(i,"sensor").find(n=>i?.states[n]?.attributes.unit_of_measurement==="%");return e?{entity:e}:{}}case"persons":return{persons:Ze(i,"person").map(e=>({entity:e}))};case"vacuum":return{vacuums:Ze(i,"vacuum").map(e=>({entity:e}))};case"activity":return{entities:"auto"};case"agenda":return{calendars:Ze(i,"calendar").slice(0,1)};case"media":return{entities:Ze(i,"media_player")};case"covers":return{covers:Ze(i,"cover").map(e=>({entity:e}))};case"infoline":return{items:[{type:"weather",entity:Me(i,"weather")}]};case"news":return{feeds:Zt()};case"card":return{card:{type:"entities",entities:[]}};default:return{}}},li=t=>t.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"neu",Le=(t,i)=>{let e=new Set(i);if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`},pe=(t,i,e,n,a,r,s={})=>({id:t,type:i,x:e,y:n,w:a,h:r,options:s}),Dt=[{id:"leer",name:"Leere Seite",build:()=>({duration:30,background:{type:"none"},palette:"normal",widgets:[]})},{id:"foto",name:"Bilderrahmen",build:t=>({duration:90,background:{type:"photo"},palette:"normal",widgets:[pe("uhr","clock",0,4,6,2,{valign:"end"}),pe("datum","date",0,6,7,1),pe("zeile","infoline",0,7,8,1,{items:[{type:"weather",entity:Me(t,"weather")}]})]})},{id:"standby",name:"StandBy",build:t=>({duration:60,background:{type:"none"},palette:"normal",widgets:[pe("uhr","clock",0,2,7,3,{valign:"end"}),pe("datum","date",0,5,7,1,{color:"accent",size:28}),pe("karte","weather",8,1,4,6,{entity:Me(t,"weather"),variant:"card"})]})},{id:"morgen",name:"Guten Morgen (KI-Zusammenfassung)",build:t=>({duration:45,background:{type:"none"},palette:"normal",show_if:[{condition:"time",after:"05:00",before:"11:00"}],widgets:[pe("uhr","clock",9,0,3,1,{size:"small",align:"end"}),pe("ueberblick","summary",0,0,8,8),pe("wetter","weather",8,1,4,6,{entity:Me(t,"weather"),variant:"card"}),pe("datum","date",8,7,4,1,{align:"end"})]})},{id:"news",name:"Nachrichten",build:()=>({duration:60,background:{type:"none"},palette:"normal",widgets:[pe("aufmacher","news",0,0,12,7,{feeds:Zt(),interval:12}),pe("laufband","news",0,7,12,1,{feeds:Zt(),variant:"ticker"})]})},{id:"tagesvorschau",name:"Tagesvorschau am Morgen",build:t=>({duration:30,background:{type:"none"},palette:"normal",show_if:[{condition:"time",after:"05:00",before:"11:00"}],widgets:[pe("vorschau","today",0,0,12,7,{calendars:Ze(t,"calendar").slice(0,2),weather:Me(t,"weather")}),pe("zeile","infoline",0,7,12,1,{items:[{type:"weather",entity:Me(t,"weather")}]})]})},{id:"musik",name:"L\xE4uft gerade (ganze Seite)",build:t=>{let i=Ze(t,"media_player");return{duration:30,background:{type:"none"},palette:"normal",show_if:[{condition:"or",conditions:i.map(e=>({condition:"state",entity:e,state:"playing"}))}],widgets:[pe("musik","media",0,0,12,8,{entities:i,variant:"full"})]}}},{id:"artikel",name:"Wikipedia-Artikel des Tages",build:()=>({duration:25,background:{type:"none"},palette:"normal",widgets:[pe("artikel","daily",0,0,12,8)]})},{id:"zitat",name:"Zitat",build:()=>({duration:20,background:{type:"none"},palette:"normal",widgets:[pe("zitat","daily",0,0,12,8,{kind:"quote"})]})},{id:"kamera",name:"Kamera als Hintergrund",build:t=>({duration:30,background:{type:"camera",entity:Me(t,"camera"),refresh:20},palette:"normal",widgets:[pe("uhr","clock",0,4,6,2,{valign:"end"}),pe("datum","date",0,6,7,1),pe("zeile","infoline",0,7,10,1,{items:[{type:"weather",entity:Me(t,"weather")},{type:"waste"}]})]})},{id:"info",name:"Info mit Kopfzeile",build:()=>({duration:20,background:{type:"none"},palette:"normal",widgets:[pe("titel","text",0,0,6,1,{text:d("Titel"),style:"label"}),pe("uhr","clock",9,0,3,1,{size:"small",align:"end"})]})}],Ip=t=>Object.values(t?.states??{}).find(i=>i.entity_id.startsWith("binary_sensor.")&&["motion","occupancy","presence"].includes(i.attributes.device_class))?.entity_id,Fp=t=>{let i=e=>{let n=t?.states[e];return n?.state==="playing"?0:n?.state==="paused"?1:n?.attributes.media_title?2:3};return Ze(t,"media_player").sort((e,n)=>i(e)-i(n)).slice(0,3)},ma=[{id:"klingel",name:"Klingel \u2192 Vollbild",build:t=>({name:d("Klingel"),enabled:!0,entity:"",to:"on",kind:"alarm",camera:Me(t,"camera"),title:d("Es klingelt"),where:d("Haust\xFCr"),max:120,hold_after:30})},{id:"bewegung",name:"Bewegung \u2192 Bild-im-Bild",build:t=>({name:d("Bewegung"),enabled:!0,entity:"",to:"on",kind:"live",camera:Me(t,"camera"),title:d("Bewegung"),where:"",duration:30,cooldown:120})},{id:"geraet",name:"Ger\xE4t fertig \u2192 Hinweis",build:()=>({name:d("Ger\xE4t fertig"),enabled:!0,entity:"",from:"on",to:"off",kind:"info",icon:"washer",title:d("Waschmaschine fertig"),where:"",chip:d("W\xE4sche fertig")})},{id:"warnung",name:"Warnung \u2192 Vollbild",build:()=>({name:d("Warnung"),enabled:!0,entity:"",to:"on",kind:"info",icon:"warning",title:d("Warnung"),where:"",text_attribute:"headline",at_night:!0,duration:120})},{id:"seite",name:"Bewegung \u2192 Seite zeigen",build:(t,i)=>({name:d("Bewegung \u2192 Seite"),enabled:!0,entity:Ip(t),to:"on",kind:"page",page:i?.pages[0]?.id,title:"",where:"",duration:60})},{id:"musik",name:"Musik \u2192 Cover",build:t=>({name:d("Musik"),enabled:!0,kind:"media",entities:Fp(t),title:"",where:""})}];var Bp=["welcome","place","content","events","photos","device","done"],Op=["place","content","device","done"],Wp=["news","morgen","kamera"],Hp=t=>structuredClone(t),ot=(t,i)=>Object.keys(t?.states??{}).filter(e=>e.startsWith(`${i}.`)),Gi=(t,i)=>String(t?.states[i]?.attributes.friendly_name??i),Nt=(t,i,e)=>e.test(i)||e.test(Gi(t,i)),Ul=/klingel|doorbell|ding|besucher|visitor|ring/i,Rr=/t[üu]r|door|front|eingang|haus|entrance/i,Rp=/wasch|washer|washing|trockner|dryer|sp[üu]l|dishwash/i,Ui=class extends re{constructor(){super(...arguments);this.mode="first";this.step=0;this.profileId="kitchen";this.name="";this.pages=new Set;this.extras=new Set;this.language="auto";this.theme="ruhig";this.doorbell={on:!1,entity:"",camera:"",sound:"klangschale"};this.motion={on:!1,entity:"",camera:"",sound:"hinweis"};this.appliances=new Set;this.photos={folder:"",icloud:"",bing:!0};this.control="embedded";this.dashboard="/lovelace/0";this.prepared=!1}get steps(){return this.mode==="first"?Bp:Op}get profile(){return pa.find(e=>e.id===this.profileId)??pa[0]}willUpdate(){if(this.prepared||!this.config)return;this.prepared=!0;let e=this.config;this.language=e.design.language??"auto",this.theme=e.design.theme,this.photos={folder:e.photos.folder??"",icloud:e.photos.icloud??"",bing:e.photos.bing!==!1},this.dashboard=e.displays[0]?.control?.dashboard??"/lovelace/0",this.pickProfile(this.profileId),this.detectEvents()}doorbellCandidates(){let e=this.hass;return[...ot(e,"binary_sensor"),...ot(e,"event")].filter(n=>Nt(e,n,Ul)||e?.states[n]?.attributes.device_class==="doorbell")}motionCandidates(){let e=this.hass,n=ot(e,"binary_sensor").filter(a=>["motion","occupancy","presence"].includes(e?.states[a]?.attributes.device_class)||Nt(e,a,/bewegung|motion/i));return[...n.filter(a=>Nt(e,a,Rr)),...n.filter(a=>!Nt(e,a,Rr))]}applianceCandidates(){let e=this.hass;return[...ot(e,"input_boolean"),...ot(e,"binary_sensor")].filter(n=>Nt(e,n,Rp))}detectEvents(){let e=this.config?.events??[],n=new Set(e.flatMap(h=>[h.entity,...h.entities??[]])),a=ot(this.hass,"camera"),r=a.find(h=>Nt(this.hass,h,Rr))??a[0]??"",s=e.find(h=>h.kind==="alarm"&&h.entity&&Nt(this.hass,h.entity,Ul)),o=e.find(h=>h.kind==="live"),l=s?.entity??this.doorbellCandidates()[0]??"",c=o?.entity??this.motionCandidates()[0]??"";this.doorbell={...this.doorbell,on:!!l&&!s,entity:l,camera:s?.camera??r},this.motion={...this.motion,on:!!c&&!o,entity:c,camera:o?.camera??r},this.appliances=new Set(this.applianceCandidates().filter(h=>!n.has(h)))}pickProfile(e){let n=d(this.profile.name);this.profileId=e;let a=this.profile;(!this.name||this.name===n)&&(this.name=d(a.name)),this.pages=new Set(Dr(a,this.config?.pages??[]).map(o=>o.page));let r=a.display.control;this.control=r?.enabled===!1?"off":r?.mode??"embedded";let s={news:"news",morgen:"morning",kamera:"camera"};this.extras=new Set(this.offeredTemplates().filter(o=>a.pages.includes(s[o])))}offeredTemplates(){let e=this.config?.pages??[],n={news:e.some(a=>a.widgets.some(r=>r.type==="news")),morgen:e.some(a=>a.widgets.some(r=>r.type==="summary")),kamera:e.some(a=>a.background.type==="camera")||!ot(this.hass,"camera").length};return Wp.filter(a=>!n[a])}build(){let e=Hp(this.config);this.mode==="first"&&(e.design.theme=this.theme,this.language==="auto"?delete e.design.language:e.design.language=this.language,e.photos={...e.photos,folder:this.photos.folder.trim(),bing:this.photos.bing},this.photos.icloud.trim()?e.photos.icloud=this.photos.icloud.trim():delete e.photos.icloud,this.addEvents(e));let n=[];for(let b of this.extras){let f=Dt.find($=>$.id===b);if(!f)continue;let v=Le(b,e.pages.map($=>$.id));e.pages.push({id:v,name:d(f.name),...f.build(this.hass)}),n.push(v)}let a=this.profile,r=this.name.trim()||d(a.name),s=this.mode==="first"?e.displays[0]:void 0,o=s?s.id:Le(li(r)||"display",e.displays.map(b=>b.id)),l=Ll(a,e,o,r),c=l.playlist.map(b=>b.page).filter(b=>this.pages.has(b)),h=e.pages.map(b=>b.id).filter(b=>this.pages.has(b)&&!c.includes(b)),p=[...c,...h,...n];l.playlist=(p.length?p:[e.pages[0].id]).map(b=>({page:b})),l.control=this.control==="off"?{enabled:!1,dashboard:this.dashboard,idle:60}:{...l.control,enabled:!0,mode:this.control,dashboard:this.dashboard};let g=this.fullyButton();return g&&(l.watchdog={button:g,after:120}),s?e.displays[0]={...s,...l,night:l.night.page?l.night:s.night}:e.displays.push(l),e.setup_complete=!0,{config:e,displayId:o}}addEvents(e){let n=()=>e.events.map(o=>o.id),a=(o,l)=>{let c=ma.find(h=>h.id===o);e.events.push({...c.build(this.hass,e),...l,id:Le(o,n())})},r=this.doorbell;if(r.on&&r.entity){let o=r.entity.startsWith("event.");a("klingel",{entity:r.entity,to:o?"*":"on",camera:r.camera||void 0,sound:r.sound||void 0,volume:80})}let s=this.motion;s.on&&s.entity&&a("bewegung",{entity:s.entity,camera:s.camera||void 0,sound:s.sound||void 0,volume:30,quiet:{after:"22:00",before:"07:00"},quiet_action:"mute"});for(let o of this.appliances){let l=o+Gi(this.hass,o),c=/trockner|dryer/i.test(l),h=/sp[üu]l|dishwash/i.test(l);a("geraet",{name:Gi(this.hass,o),entity:o,title:c?d("Trockner fertig"):h?d("Sp\xFClmaschine fertig"):d("Waschmaschine fertig"),chip:c?d("Trockner fertig"):h?d("Sp\xFClmaschine fertig"):d("W\xE4sche fertig"),icon:c?"dryer":"washer",sound:"glas",volume:50,quiet:{after:"22:00",before:"07:00"},quiet_action:"mute"})}}fullyButton(){if(this.control==="off")return;let e=new Set((this.config?.displays??[]).filter((a,r)=>!(this.mode==="first"&&r===0)).map(a=>a.watchdog?.button)),n=ot(this.hass,"button").filter(a=>/start_?url/i.test(a)&&!e.has(a));return n.length===1?n[0]:void 0}finish(){this.dispatchEvent(new CustomEvent("wizard-done",{detail:this.build(),bubbles:!0,composed:!0}))}close(){this.dispatchEvent(new CustomEvent("wizard-close",{bubbles:!0,composed:!0}))}render(){if(!this.config)return m;let e=this.steps,n=e[this.step],a=this.step===e.length-1;return u`<div class="card" role="dialog" aria-modal="true">
      <header>
        <div class="title">${ie("sparkle","ic")}${this.mode==="first"?d("Willkommen bei Ambiframe"):d("Neues Display")}</div>
        <div class="dots">${e.map((r,s)=>u`<i class=${s===this.step?"on":s<this.step?"done":""}></i>`)}</div>
      </header>
      <main>${this.renderStep(n)}</main>
      <footer>
        <button class="ghost" @click=${()=>this.close()}>${this.mode==="first"?d("\xDCberspringen"):d("Abbrechen")}</button>
        <span class="grow"></span>
        ${this.step>0?u`<button @click=${()=>this.step--}>${d("Zur\xFCck")}</button>`:m}
        ${a?u`<button class="primary" @click=${()=>this.finish()}>${d("Fertig \u2013 speichern")}</button>`:u`<button class="primary" ?disabled=${n==="place"&&!this.name.trim()} @click=${()=>this.step++}>${d("Weiter")}</button>`}
      </footer>
    </div>`}renderStep(e){switch(e){case"welcome":return this.renderWelcome();case"place":return this.renderPlace();case"content":return this.renderContent();case"events":return this.renderEvents();case"photos":return this.renderPhotos();case"device":return this.renderDevice();default:return this.renderDone()}}renderWelcome(){let e=[["auto",d("automatisch (wie der HA-Benutzer)")],["de","Deutsch"],["en","English"],["nl","Nederlands"],["fr","Fran\xE7ais"]];return u`<h2>${d("Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist")}</h2>
      <p class="lead">
        ${d("In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.")}
      </p>
      <label class="field"
        ><span>${d("Sprache")}</span>
        <select @change=${n=>this.language=n.target.value}>
          ${e.map(([n,a])=>u`<option value=${n} ?selected=${this.language===n}>${a}</option>`)}
        </select></label
      >
      <h3>${d("Stil")}</h3>
      <div class="grid">
        ${ht.map(n=>u`<button class="choice ${this.theme===n.id?"on":""}" @click=${()=>this.theme=n.id}>
            <b>${d(n.name)}</b><span>${d(n.hint)}</span>
          </button>`)}
      </div>`}renderPlace(){return u`<h2>${d("Wo h\xE4ngt das Display?")}</h2>
      <p class="lead">${d("Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.")}</p>
      <div class="grid">
        ${pa.map(e=>u`<button class="choice ${this.profileId===e.id?"on":""}" @click=${()=>this.pickProfile(e.id)}>
            <b>${ie(e.icon,"ic")}${d(e.name)}</b><span>${d(e.hint)}</span>
          </button>`)}
      </div>
      <label class="field"
        ><span>${d("Name")}</span><input .value=${this.name} @input=${e=>this.name=e.target.value}
      /></label>`}toggled(e,n){let a=new Set(e);return a.has(n)?a.delete(n):a.add(n),a}renderContent(){let e=this.offeredTemplates();return u`<h2>${d("Was soll das Display zeigen?")}</h2>
      <p class="lead">${d("Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.")}</p>
      <div class="checks">
        ${this.config.pages.map(n=>u`<label class="check"
            ><input type="checkbox" .checked=${this.pages.has(n.id)} @change=${()=>this.pages=this.toggled(this.pages,n.id)} /><span
              >${n.name}</span
            ></label
          >`)}
      </div>
      ${e.length?u`<h3>${d("Neue Seiten dazu")}</h3>
            <div class="checks">
              ${e.map(n=>u`<label class="check"
                  ><input type="checkbox" .checked=${this.extras.has(n)} @change=${()=>this.extras=this.toggled(this.extras,n)} /><span
                    >${d(Dt.find(a=>a.id===n).name)}</span
                  ></label
                >`)}
            </div>`:m}`}entitySelect(e,n,a){return u`<select @change=${r=>a(r.target.value)}>
      <option value="" ?selected=${!e}>${d("keine")}</option>
      ${n.map(r=>u`<option value=${r} ?selected=${r===e}>${Gi(this.hass,r)}</option>`)}
    </select>`}soundSelect(e,n,a){return u`<span class="sound">
      <select @change=${r=>n(r.target.value)}>
        <option value="" ?selected=${!e}>${d("ohne Ton")}</option>
        ${Mi.filter(([r])=>r!=="alarm").map(([r,s])=>u`<option value=${r} ?selected=${r===e}>${d(s)}</option>`)}
      </select>
      <button class="small" ?disabled=${!e} title=${d("Anh\xF6ren")} @click=${()=>e&&Jt(e,a)}>▶</button>
    </span>`}renderEvent(e,n,a,r,s,o,l){return u`<div class="event ${a.on?"":"off"}">
      <label class="switch"
        ><input type="checkbox" .checked=${a.on} @change=${()=>r({...a,on:!a.on})} /><b>${ie(e,"ic")}${n}</b></label
      >
      <div class="rows">
        <label><span>${d("Ausl\xF6ser")}</span>${this.entitySelect(a.entity,s,c=>r({...a,entity:c}))}</label>
        <label><span>${d("Kamera")}</span>${this.entitySelect(a.camera,ot(this.hass,"camera"),c=>r({...a,camera:c}))}</label>
        <label><span>${d("Ton")}</span>${this.soundSelect(a.sound,c=>r({...a,sound:c}),o)}</label>
      </div>
      ${l?u`<p class="hint">${l}</p>`:m}
    </div>`}renderEvents(){let e=this.applianceCandidates();return u`<h2>${d("Worauf soll es reagieren?")}</h2>
      <p class="lead">${d("Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.")}</p>
      ${this.renderEvent("bell",d("Klingel \u2192 Vollbild mit Kamera"),this.doorbell,n=>this.doorbell=n,this.doorbellCandidates(),80)}
      ${this.renderEvent("motion",d("Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild"),this.motion,n=>this.motion=n,this.motionCandidates(),30,d("Leiser als die Klingel, nachts (22\u20137 Uhr) stumm."))}
      ${e.length?u`<div class="event">
            <b>${ie("washer","ic")}${d("Ger\xE4t fertig \u2192 Hinweis und Erinnerung")}</b>
            <div class="checks">
              ${e.map(n=>u`<label class="check"
                  ><input type="checkbox" .checked=${this.appliances.has(n)} @change=${()=>this.appliances=this.toggled(this.appliances,n)} /><span
                    >${Gi(this.hass,n)}</span
                  ></label
                >`)}
            </div>
          </div>`:m}`}renderPhotos(){let e=this.photos;return u`<h2>${d("Woher kommen die Fotos?")}</h2>
      <p class="lead">${d("F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.")}</p>
      <label class="field"
        ><span>${d("Fotoordner")}</span
        ><input
          .value=${e.folder}
          placeholder="media-source://media_source/local/ambiframe"
          @input=${n=>this.photos={...e,folder:n.target.value}}
      /></label>
      <p class="hint">${d("HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.")}</p>
      <label class="field"
        ><span>${d("iCloud-Album")}</span
        ><input
          .value=${e.icloud}
          placeholder="https://photos.icloud.com/shared/album/…"
          @input=${n=>this.photos={...e,icloud:n.target.value}}
      /></label>
      <p class="hint">${d("Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.")}</p>
      <label class="check"
        ><input type="checkbox" .checked=${e.bing} @change=${()=>this.photos={...e,bing:!e.bing}} /><span
          >${d("Bing-Bilder, wenn Ordner und Album leer sind")}</span
        ></label
      >`}renderDevice(){let e=[["embedded",d("Dashboard \xFCber Ambiframe"),d("Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.")],["screensaver",d("Ambiframe als Bildschirmschoner"),d("Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.")],["off",d("Nur anzeigen"),d("Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.")]];return u`<h2>${d("Bedienung")}</h2>
      <div class="grid">
        ${e.map(([n,a,r])=>u`<button class="choice ${this.control===n?"on":""}" @click=${()=>this.control=n}>
            <b>${a}</b><span>${r}</span>
          </button>`)}
      </div>
      ${this.control!=="off"?u`<label class="field"
            ><span>${d("Dashboard")}</span><input .value=${this.dashboard} @input=${n=>this.dashboard=n.target.value}
          /></label>`:m}
      <p class="hint">
        ${this.fullyButton()?d("Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt."):d("Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.")}
      </p>`}renderDone(){let{config:e,displayId:n}=this.build(),a=e.displays.find(c=>c.id===n),r=`${location.origin}/ambiframe-display?display=${encodeURIComponent(n)}`,s=(0,ql.default)(0,"M");s.addData(r),s.make();let o=e.events.length-this.config.events.length,l=this.control==="off"?d("Nur anzeigen"):this.control==="screensaver"?d("Ambiframe als Bildschirmschoner"):d("Dashboard \xFCber Ambiframe");return u`<h2>${d("Fertig!")}</h2>
      <p class="lead">
        ${d("So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.")}
      </p>
      <div class="done">
        <div class="qr">${Ot(s.createSvgTag({cellSize:4,margin:2,scalable:!0}))}</div>
        <div>
          <code>${r}</code>
          <p><button class="small" @click=${()=>navigator.clipboard?.writeText(r)}>${d("Adresse kopieren")}</button></p>
          <ul>
            <li>${d("Display \u201E{name}\u201C mit {n} Seiten",{name:a.name,n:a.playlist.length})}</li>
            ${o>0?u`<li>${d("{n} neue Ereignisse",{n:o})}</li>`:m}
            <li>${l}</li>
          </ul>
        </div>
      </div>`}};Ui.properties={hass:{attribute:!1},config:{attribute:!1},mode:{},step:{state:!0},profileId:{state:!0},name:{state:!0},pages:{state:!0},extras:{state:!0},language:{state:!0},theme:{state:!0},doorbell:{state:!0},motion:{state:!0},appliances:{state:!0},photos:{state:!0},control:{state:!0},dashboard:{state:!0}},Ui.styles=F`
    :host {
      position: fixed;
      inset: 0;
      z-index: 20;
      display: grid;
      place-items: center;
      padding: 16px;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(6px);
      color: var(--primary-text-color, #eee);
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
    }
    .card {
      width: min(760px, 100%);
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 18px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
      overflow: hidden;
    }
    header,
    footer {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
    }
    header {
      justify-content: space-between;
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    }
    footer {
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
    }
    .title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .ic {
      width: 18px;
      height: 18px;
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .dots {
      display: flex;
      gap: 6px;
    }
    .dots i {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--divider-color, rgba(127, 127, 127, 0.35));
    }
    .dots i.done {
      background: var(--secondary-text-color, #999);
    }
    .dots i.on {
      background: var(--primary-color, #03a9f4);
    }
    main {
      padding: 6px 20px 18px;
      overflow: auto;
    }
    h2 {
      margin: 14px 0 6px;
      font-size: 21px;
      font-weight: 600;
    }
    h3 {
      margin: 18px 0 8px;
      font-size: 15px;
    }
    .lead,
    .hint {
      color: var(--secondary-text-color, #aaa);
      margin: 0 0 12px;
      line-height: 1.45;
    }
    .hint {
      font-size: 13px;
      margin-top: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
    }
    .choice {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      padding: 12px 14px;
      text-align: left;
      border-radius: 12px;
    }
    .choice b {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
    }
    .choice span {
      color: var(--secondary-text-color, #aaa);
      font-size: 13px;
      line-height: 1.35;
    }
    .choice.on {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: inset 0 0 0 1px var(--primary-color, #03a9f4);
    }
    button,
    select,
    input:not([type="checkbox"]) {
      font: inherit;
      color: inherit;
      background: var(--primary-background-color, #111);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 8px;
      padding: 8px 12px;
      min-width: 0;
    }
    button {
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.ghost {
      background: none;
      border-color: transparent;
      color: var(--secondary-text-color, #aaa);
    }
    button.small {
      padding: 6px 10px;
    }
    .grow {
      flex: 1;
    }
    .field {
      display: grid;
      grid-template-columns: 140px 1fr;
      align-items: center;
      gap: 10px;
      margin: 12px 0 0;
    }
    .field span,
    .rows label span {
      color: var(--secondary-text-color, #aaa);
      font-size: 14px;
    }
    .checks {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 6px 14px;
    }
    .check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
    .event {
      margin: 12px 0;
      padding: 12px 14px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 12px;
    }
    .event b {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .event.off .rows {
      opacity: 0.45;
    }
    .switch {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .rows {
      display: grid;
      gap: 8px;
      margin-top: 10px;
    }
    .rows label {
      display: grid;
      grid-template-columns: 90px 1fr;
      align-items: center;
      gap: 10px;
    }
    .sound {
      display: flex;
      gap: 6px;
    }
    .sound select {
      flex: 1;
    }
    .done {
      display: grid;
      grid-template-columns: 170px 1fr;
      gap: 18px;
      align-items: start;
    }
    .qr {
      background: #fff;
      padding: 8px;
      border-radius: 10px;
    }
    .qr svg {
      display: block;
      width: 100%;
      height: auto;
    }
    code {
      word-break: break-all;
      font-size: 13px;
    }
    ul {
      padding-left: 18px;
      color: var(--secondary-text-color, #aaa);
    }
    @media (max-width: 560px) {
      .field,
      .rows label,
      .done {
        grid-template-columns: 1fr;
      }
      .done .qr {
        width: 160px;
      }
    }
  `;B("af-wizard",Ui);var Kp=new Set("sensor binary_sensor weather camera calendar light switch media_player person device_tracker input_boolean input_number input_select input_text input_datetime input_button cover climate vacuum fan lock button event image todo zone sun alarm_control_panel automation script scene select number update ai_task water_heater humidifier siren valve lawn_mower text time date schedule counter timer group remote".split(" ")),Vp=/^([a-z_]+)\.[a-z0-9_]+$/,Kr=(t,i=new Set)=>{if(typeof t=="string"){let e=Vp.exec(t);e&&Kp.has(e[1])&&i.add(t)}else if(Array.isArray(t))for(let e of t)Kr(e,i);else if(t&&typeof t=="object")for(let e of Object.values(t))Kr(e,i);return i},jp=15,Vr=(t,i,e={},n,a)=>{let r=[],s=i?.states??{},o=Object.keys(s).length>0,l=new Map,c=(f,v,$)=>{if(o)for(let P of Kr(f)){let T=s[P],I=T?T.state==="unavailable"?"warn":void 0:"error";if(!I)continue;let S=l.get(P)??{level:I,wheres:[],go:$};S.wheres.includes(v)||S.wheres.push(v),l.set(P,S)}};for(let f of t.pages){c([f.show_if,f.background],d("Seite \u201E{name}\u201C",{name:f.name}),{tab:"seiten",pageId:f.id});for(let v of f.widgets)c([v.options,v.show_if,v.tap_action,v.hold_action],d("Seite \u201E{name}\u201C",{name:f.name}),{tab:"seiten",pageId:f.id,widgetId:v.id})}for(let f of t.events)f.enabled!==!1&&c(f,d("Ereignis \u201E{name}\u201C",{name:f.name||f.title||f.id}),{tab:"ereignisse",eventId:f.id});for(let f of t.displays)c([f.night,f.watchdog,f.playlist],d("Display \u201E{name}\u201C",{name:f.name}),{tab:"wiedergabe",displayId:f.id});c(t.summary,d("KI-Zusammenfassung"),{tab:"design"});for(let[f,v]of l){let $=v.wheres.length>2?`${v.wheres.slice(0,2).join(", ")} \u2026`:v.wheres.join(", ");r.push({level:v.level,text:v.level==="error"?d("{id} gibt es nicht (mehr) \u2013 {where}",{id:f,where:$}):d("{id} ist nicht verf\xFCgbar \u2013 {where}",{id:f,where:$}),go:v.go})}let h=Date.now();for(let f of t.displays){let v=e[f.id],$={tab:"wiedergabe",displayId:f.id};if(!v||!v.online&&!v.last_seen){r.push({level:"info",text:d("Display \u201E{name}\u201C war noch nie verbunden",{name:f.name}),go:$});continue}if(!v.online&&v.last_seen&&h-new Date(v.last_seen).getTime()>jp*6e4){let P=Math.round((h-new Date(v.last_seen).getTime())/36e5);r.push({level:"warn",text:P>=1?d("Display \u201E{name}\u201C meldet sich seit {n} h nicht",{name:f.name,n:P}):d("Display \u201E{name}\u201C meldet sich nicht",{name:f.name}),go:$})}for(let P of v.clients)P.safe?r.push({level:"warn",text:d("\u201E{name}\u201C ist im Notfallmodus: {reason}",{name:P.name,reason:d(P.safe)}),go:$}):a&&P.version&&P.version!==a&&r.push({level:"info",text:d("\u201E{name}\u201C hat noch eine \xE4ltere Version",{name:P.name}),go:$})}let p=new Set;for(let f of t.displays){for(let v of f.playlist)p.add(v.page);f.night?.page&&p.add(f.night.page)}for(let f of t.events)f.page&&p.add(f.page);for(let f of t.pages)for(let v of f.widgets)for(let $ of[v.tap_action,v.hold_action])$?.page&&p.add($.page);for(let f of t.pages)p.has(f.id)||r.push({level:"info",text:d("Seite \u201E{name}\u201C wird nirgends gezeigt",{name:f.name}),go:{tab:"seiten",pageId:f.id}});t.pages.some(f=>f.background.type==="photo"&&p.has(f.id))&&n&&(!((n.folder??0)+(n.icloud??0))&&!t.photos.bing?r.push({level:"error",text:d("Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)"),go:{tab:"design"}}):t.photos.folder&&n.folder===0&&r.push({level:"warn",text:d("Der Fotoordner ist leer oder fehlt"),go:{tab:"design"}}),t.photos.icloud&&n.icloud===0&&r.push({level:"warn",text:d("Das iCloud-Album liefert keine Fotos"),go:{tab:"design"}})),t.summary?.enabled&&o&&!t.summary.ai_task&&!Object.keys(s).some(f=>f.startsWith("ai_task."))&&r.push({level:"warn",text:d("KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant"),go:{tab:"design"}});let b={error:0,warn:1,info:2};return r.sort((f,v)=>b[f.level]-b[v.level])};var ze=t=>JSON.parse(JSON.stringify(t)),Zl=t=>{if(!(t==null||t==="")){if(Array.isArray(t))return t;if(typeof t=="object"){let i={};for(let[e,n]of Object.entries(t)){let a=Zl(n);a!==void 0&&(i[e]=a)}return Object.keys(i).length?i:void 0}return t}},Gp=t=>t.map(i=>i.type==="select"&&Array.isArray(i.options)?{...i,options:[[void 0,"wie alle Displays"],...i.options.filter(([e])=>e!==void 0)]}:i.type==="number"||i.type==="text"||i.type==="textarea"?{...i,placeholder:"wie alle Displays"}:i),ga=t=>ft(t,{lineWidth:120,noRefs:!0}),qi=class extends re{constructor(){super(...arguments);this.narrow=!1;this.tab="seiten";this.plOpen=new Set;this.multi=[];this.clip=null;this.pageImport=null;this.designScope="";this.healthOpen=!1;this.wizard="";this.wizardSkipped=!1;this.advanced=(()=>{try{return(localStorage.getItem("ambiframe-editor-advanced")??localStorage.getItem("wandbild-editor-advanced"))==="1"}catch{return!1}})();this.importText=null;this.presetName="";this.pageId="";this.widgetId=null;this.eventId="";this.displayId="";this.message=null;this.saving=!1;this.yaml="";this.menu="";this.layout="landscape";this.summaryBusy=!1;this.mediaSounds=[];this.mediaSoundsLoading=!1;this.summaryNote="";this.history=[];this.future=[];this.coalesceKey="";this.devices={};this.onCopy=e=>{if(e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]")||this.tab!=="seiten"||!this.selection.length)return;let a=this.selectedWidgets();e.preventDefault(),e.clipboardData?.setData("text/plain",ft({ambiframe_widgets:a},{lineWidth:120})),this.clip=a,this.message={kind:"ok",text:a.length===1?d("Widget kopiert."):d("{n} Widgets kopiert.",{n:a.length})}};this.onPaste=e=>{if(e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]")||this.tab!=="seiten")return;let a=e.clipboardData?.getData("text/plain")??"";this.pasteText(a)&&e.preventDefault()};this.onKey=e=>{let n=e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]"),a=e.metaKey||e.ctrlKey;if(a&&e.key.toLowerCase()==="s")e.preventDefault(),this.save();else if(a&&e.key.toLowerCase()==="z"&&!n)e.preventDefault(),e.shiftKey?this.redo():this.undo();else if(!n&&this.tab==="seiten"&&this.widgetId){let r={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(e.key==="Delete"||e.key==="Backspace")e.preventDefault(),this.removeWidget();else if(e.key==="Escape")this.widgetId=null,this.multi=[];else if(r[e.key]){e.preventDefault();let[s,o]=r[e.key],l=ge[this.layout],h=(this.page?.widgets??[]).filter(p=>this.selection.includes(p.id)).map(p=>({id:p.id,pos:this.posOf(p)}));if(!h.length)return;if(e.shiftKey){let p=h[0].pos,g={...p,w:Math.min(Math.max(1,p.w+s),l.cols-p.x),h:Math.min(Math.max(1,p.h+o),l.rows-p.y)};this.updatePage(b=>this.setPos(b,h[0].id,g),"keys")}else h.every(({pos:g})=>g.x+s>=0&&g.x+g.w+s<=l.cols&&g.y+o>=0&&g.y+g.h+o<=l.rows)&&this.updatePage(g=>h.forEach(({id:b,pos:f})=>this.setPos(g,b,{...f,x:f.x+s,y:f.y+o})),"keys")}else a&&e.key.toLowerCase()==="d"&&(e.preventDefault(),this.duplicateWidget())}}}setAdvanced(e){this.advanced=e;try{localStorage.setItem("ambiframe-editor-advanced",e?"1":"0")}catch{}!e&&this.tab==="yaml"&&(this.tab="seiten")}updated(){this.hass&&!this.unsub&&(this.unsub=this.hass.connection.subscribeMessage(e=>this.onConfig(e.config),{type:"ambiframe/config/subscribe"}).catch(e=>{this.message={kind:"error",text:d("Ambiframe ist nicht erreichbar: {error}",{error:String(e?.message??e)})}})),this.tab==="wiedergabe"&&!this.devicesTimer&&this.hass?(this.loadDevices(),this.devicesTimer=window.setInterval(()=>{this.loadDevices()},1e4)):this.tab!=="wiedergabe"&&this.devicesTimer&&(clearInterval(this.devicesTimer),this.devicesTimer=void 0)}async generateSummary(){this.summaryBusy=!0,this.summaryNote="";try{let e=await this.hass.callWS({type:"ambiframe/summary/generate"});this.summaryNote=`Fertig: \u201E${e.headline}\u201C`}catch(e){this.summaryNote=e.message??d("Fehlgeschlagen")}finally{this.summaryBusy=!1}}async loadDevices(){try{this.devices=await this.hass?.callWS({type:"ambiframe/displays/status"})??{}}catch{}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey),window.addEventListener("copy",this.onCopy),window.addEventListener("paste",this.onPaste)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),window.removeEventListener("copy",this.onCopy),window.removeEventListener("paste",this.onPaste),this.unsub?.then(e=>e?.()),this.unsub=void 0,clearInterval(this.devicesTimer),this.devicesTimer=void 0}onConfig(e){let n=this.dirty;this.saved=e,(!n||!this.draft)&&(this.draft=ze(e),this.history=[],this.future=[]),this.ensureSelection()}ensureSelection(){let e=this.draft;if(!e)return;e.pages.some(a=>a.id===this.pageId)||(this.pageId=e.pages[0]?.id??""),e.displays.some(a=>a.id===this.displayId)||(this.displayId=e.displays[0]?.id??""),e.events.some(a=>a.id===this.eventId)||(this.eventId=e.events[0]?.id??"");let n=e.pages.find(a=>a.id===this.pageId);this.widgetId&&!n?.widgets.some(a=>a.id===this.widgetId)&&(this.widgetId=null)}get dirty(){return!!this.draft&&!!this.saved&&JSON.stringify(this.draft)!==JSON.stringify(this.saved)}mutate(e,n=""){if(!this.draft)return;(!n||n!==this.coalesceKey)&&(this.history.push(JSON.stringify(this.draft)),this.history.length>100&&this.history.shift(),this.future=[]),this.coalesceKey=n;let a=ze(this.draft);e(a),this.draft=a,this.message=null,this.ensureSelection()}undo(){let e=this.history.pop();!e||!this.draft||(this.future.push(JSON.stringify(this.draft)),this.draft=JSON.parse(e),this.coalesceKey="",this.ensureSelection())}redo(){let e=this.future.pop();!e||!this.draft||(this.history.push(JSON.stringify(this.draft)),this.draft=JSON.parse(e),this.coalesceKey="",this.ensureSelection())}async save(){if(!(!this.hass||!this.draft)){this.saving=!0;try{await this.hass.callWS({type:"ambiframe/config/save",config:this.draft,language:Qi()}),this.saved=ze(this.draft),this.message={kind:"ok",text:d("Gespeichert \u2013 alle Displays zeigen es sofort.")}}catch(e){this.message={kind:"error",text:e.message??String(e)}}finally{this.saving=!1}}}discard(){this.saved&&(this.mutate(e=>Object.assign(e,ze(this.saved))),this.message=null)}willUpdate(e){(e.has("pageId")||e.has("layout"))&&(this.multi=[])}get selection(){let e=new Set(this.page?.widgets.map(n=>n.id));return this.widgetId?[this.widgetId,...this.multi.filter(n=>n!==this.widgetId&&e.has(n))]:[]}onSelect(e){let{id:n,toggle:a,keep:r}=e.detail,s=this.selection;if(!n)this.widgetId=null,this.multi=[];else if(a)if(s.includes(n)){let o=s.filter(l=>l!==n);this.widgetId=o[0]??null,this.multi=o.slice(1)}else this.widgetId?this.multi=[...this.multi,n]:this.widgetId=n;else r&&s.includes(n)?(this.widgetId=n,this.multi=s.filter(o=>o!==n)):(this.widgetId=n,this.multi=[])}selectedWidgets(){let e=this.selection;return ze((this.page?.widgets??[]).filter(n=>e.includes(n.id)))}async copyWidgets(e=this.selectedWidgets()){if(e.length){this.clip=e;try{await navigator.clipboard.writeText(ft({ambiframe_widgets:e},{lineWidth:120}))}catch{}this.message={kind:"ok",text:e.length===1?d("Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen."):d("{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.",{n:e.length})}}}pasteWidgets(e){let n=this.page;if(!n||!e.length)return;let a=n.widgets.map(l=>l.id),r=[],s=e.every(l=>n.widgets.some(c=>c.x===l.x&&c.y===l.y&&c.type===l.type)),o=n.widgets.some(l=>l.portrait);this.updatePage(l=>{for(let c of e){if(!c?.type||!Ke[c.type])continue;let h=ze(c);h.id=Le(h.id||h.type,[...a,...r]),r.push(h.id),h.w=Math.min(Math.max(1,h.w??2),12),h.h=Math.min(Math.max(1,h.h??1),8),h.x=Math.min(Math.max(0,(h.x??0)+(s?1:0)),12-h.w),h.y=Math.min(Math.max(0,(h.y??0)+(s?1:0)),8-h.h),h.options??={},o?h.portrait||(h.portrait={x:0,y:Math.max(0,ge.portrait.rows-Math.min(h.h,ge.portrait.rows)),w:ge.portrait.cols,h:Math.min(h.h,ge.portrait.rows)}):delete h.portrait,l.widgets.push(h)}}),this.widgetId=r[0]??null,this.multi=r.slice(1)}pasteText(e){let n;try{n=Lt(e)}catch{return!1}return Array.isArray(n?.ambiframe_widgets)?(this.pasteWidgets(n.ambiframe_widgets),!0):n?.ambiframe_page&&typeof n.ambiframe_page=="object"?(this.importPage(n.ambiframe_page),!0):!1}saveWidgetTemplate(){let e=this.selectedWidgets();if(!e.length)return;let n=prompt(d("Name der Vorlage"),e.length===1?d(Ke[e[0].type]?.name??e[0].type):d("{n} Widgets",{n:e.length}));n?.trim()&&(this.mutate(a=>{let r=(a.templates??={}).widgets??=[],s=r.find(o=>o.name===n.trim());s?s.widgets=e:r.push({name:n.trim(),widgets:e})}),this.message={kind:"ok",text:d("Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.",{name:n.trim()})})}savePageTemplate(){let e=this.page;if(!e)return;let n=prompt(d("Name der Seitenvorlage"),e.name);if(!n?.trim())return;let{id:a,name:r,...s}=ze(e);this.mutate(o=>{let l=(o.templates??={}).pages??=[],c=l.find(h=>h.name===n.trim());c?c.page=s:l.push({name:n.trim(),page:s})}),this.menu="",this.message={kind:"ok",text:d("Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.",{name:n.trim()})}}async exportPage(){let e=this.page;if(!e)return;let n=ft({ambiframe_page:e},{lineWidth:120});try{await navigator.clipboard.writeText(n),this.message={kind:"ok",text:d("Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.",{name:e.name})}}catch{this.pageImport=n,this.message={kind:"ok",text:d("Seite unten als YAML \u2013 zum Kopieren markieren.")}}}importPage(e,n){if(!Array.isArray(e.widgets)){this.message={kind:"error",text:d("Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).")};return}let a=n??e.name??d("Importierte Seite"),r=Le(li(a),this.draft?.pages.map(o=>o.id)??[]),s={duration:30,background:{type:"none"},palette:"normal",...ze(e),id:r,name:a};this.mutate(o=>{o.pages.push(s),(o.displays.find(c=>c.id===this.displayId)??o.displays[0])?.playlist.push({page:r})}),this.pageId=r,this.widgetId=null,this.menu="",this.pageImport=null,this.message={kind:"ok",text:d("Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.",{name:a})}}get page(){return this.draft?.pages.find(e=>e.id===this.pageId)}get widget(){return this.page?.widgets.find(e=>e.id===this.widgetId)}updatePage(e,n=""){let a=this.pageId;this.mutate(r=>{let s=r.pages.find(o=>o.id===a);s&&e(s)},n)}posOf(e){return this.layout==="landscape"?{x:e.x,y:e.y,w:e.w,h:e.h}:Tt(this.page?.widgets??[],"portrait")[e.id]??{x:0,y:0,w:ge.portrait.cols,h:1}}setPos(e,n,a){let r=e.widgets.find(s=>s.id===n);if(r){if(this.layout==="landscape"){Object.assign(r,a);return}if(e.widgets.some(s=>!s.portrait)){let s=Tt(e.widgets,"portrait");for(let o of e.widgets)o.portrait??=s[o.id]??{x:0,y:ge.portrait.rows-1,w:ge.portrait.cols,h:1}}r.portrait={...a}}}updateWidget(e,n=""){let a=this.widgetId;this.updatePage(r=>{let s=r.widgets.find(o=>o.id===a);s&&e(s)},n)}addPage(e){let n=Dt.find(s=>s.id===e)??Dt[0],a=n.id==="leer"?d("Neue Seite"):d(n.name),r=Le(li(a),this.draft?.pages.map(s=>s.id)??[]);this.mutate(s=>{s.pages.push({id:r,name:a,...n.build(this.hass)}),(s.displays.find(l=>l.id===this.displayId)??s.displays[0])?.playlist.push({page:r})}),this.pageId=r,this.widgetId=null,this.menu=""}duplicatePage(){let e=this.page;if(!e)return;let n=Le(`${e.id}_kopie`,this.draft?.pages.map(a=>a.id)??[]);this.mutate(a=>a.pages.push({...ze(e),id:n,name:`${e.name} (Kopie)`})),this.pageId=n}removePage(){let e=this.page;!e||!confirm(d("Seite \u201E{name}\u201C l\xF6schen?",{name:e.name}))||(this.mutate(n=>{n.pages=n.pages.filter(a=>a.id!==e.id);for(let a of n.displays)a.playlist=a.playlist.filter(r=>r.page!==e.id),a.night?.page===e.id&&delete a.night.page}),this.widgetId=null)}addWidget(e){let n=this.page;if(!n)return;let[a,r]=Ke[e].size,s=Le(e,n.widgets.map(c=>c.id)),o=(c,h)=>n.widgets.some(p=>c<p.x+p.w&&c+a>p.x&&h<p.y+p.h&&h+r>p.y),l={x:0,y:0};e:for(let c=0;c+r<=8;c++)for(let h=0;h+a<=12;h++)if(!o(h,c)){l={x:h,y:c};break e}this.updatePage(c=>{let h={id:s,type:e,...l,w:a,h:r,options:Gl(e,this.hass)};if(c.widgets.some(p=>p.portrait)){let p=ge.portrait,g=Math.min(p.cols,Math.max(2,Math.round(a*p.cols/12))),b=(v,$)=>c.widgets.some(P=>P.portrait&&v<P.portrait.x+P.portrait.w&&v+g>P.portrait.x&&$<P.portrait.y+P.portrait.h&&$+r>P.portrait.y),f={x:0,y:Math.max(0,p.rows-r)};e:for(let v=0;v+r<=p.rows;v++)for(let $=0;$+g<=p.cols;$++)if(!b($,v)){f={x:$,y:v};break e}h.portrait={...f,w:g,h:Math.min(r,p.rows)}}c.widgets.push(h)}),this.widgetId=s,this.menu=""}duplicateWidget(){let e=this.selectedWidgets();if(!e.length)return;let n=this.page?.widgets.map(r=>r.id)??[],a=[];this.updatePage(r=>{for(let s of e){let o=Le(s.id,[...n,...a]);a.push(o);let l={...ze(s),id:o,x:Math.min(s.x+1,12-s.w),y:Math.min(s.y+1,8-s.h)};s.portrait&&(l.portrait={...s.portrait,x:Math.min(s.portrait.x+1,8-s.portrait.w),y:Math.min(s.portrait.y+1,12-s.portrait.h)}),r.widgets.push(l)}}),this.widgetId=a[0]??null,this.multi=a.slice(1)}removeWidget(){let e=this.selection;e.length&&(this.updatePage(n=>n.widgets=n.widgets.filter(a=>!e.includes(a.id))),this.widgetId=null,this.multi=[])}onMove(e){let{moves:n,done:a}=e.detail;if(a){this.coalesceKey="";return}let r=n.filter(s=>{let o=this.page?.widgets.find(c=>c.id===s.id);if(!o)return!1;let l=this.posOf(o);return l.x!==s.x||l.y!==s.y||l.w!==s.w||l.h!==s.h});r.length&&this.updatePage(s=>r.forEach(({id:o,...l})=>this.setPos(s,o,l)),`drag-${n[0]?.id}-${this.layout}`)}form(e,n,a,r){return u`<af-form
      .hass=${this.hass}
      .advanced=${this.advanced}
      .fields=${e}
      .value=${n}
      @value-changed=${s=>{!s.detail?.value||typeof s.detail.value!="object"||Array.isArray(s.detail.value)||(a(s.detail.value),this.coalesceKey=r)}}
    ></af-form>`}renderPages(){let e=this.draft,n=e.displays.find(s=>s.id===this.displayId),a=new Set(n?.playlist.map(s=>s.page)),r=this.widget;return u`<div class="pages">
      <aside class="list">
        <div class="head">
          <span>${d("Seiten")}</span>
          <span class="rel">
            <button class="small" @click=${()=>this.menu=this.menu==="page"?"":"page"}>${d("+ Neu")}</button>
            ${this.menu==="page"?u`<div class="menu">
                  ${Dt.map(s=>u`<button @click=${()=>this.addPage(s.id)}>${d(s.name)}</button>`)}
                  ${e.templates?.pages?.length?u`<div class="sep">${d("Eigene Vorlagen")}</div>
                        ${e.templates.pages.map((s,o)=>u`<div class="menu-row">
                            <button @click=${()=>this.importPage(s.page,s.name)}>${s.name}</button>
                            <button
                              class="x"
                              title=${d("Vorlage l\xF6schen")}
                              @click=${()=>confirm(d("Seitenvorlage \u201E{name}\u201C l\xF6schen?",{name:s.name}))&&this.mutate(l=>l.templates.pages.splice(o,1))}
                            >
                              ✕
                            </button>
                          </div>`)}`:m}
                  <div class="sep"></div>
                  <button @click=${()=>(this.pageImport="",this.menu="")}>${d("Seite importieren \u2026")}</button>
                </div>`:m}
          </span>
        </div>
        ${this.pageImport!==null?u`<div class="import-box">
              <textarea
                class="code import"
                rows="8"
                placeholder="ambiframe_page: …"
                .value=${this.pageImport}
                @input=${s=>this.pageImport=s.target.value}
              ></textarea>
              <span>
                <button
                  class="small"
                  @click=${()=>{try{let s=Lt(this.pageImport??"");this.importPage(s?.ambiframe_page??s)}catch(s){this.message={kind:"error",text:d("Import fehlgeschlagen: {error}",{error:String(s?.message??s)})}}}}
                >
                  ${d("Importieren")}
                </button>
                <button class="small" @click=${()=>this.pageImport=null}>${d("Abbrechen")}</button>
              </span>
            </div>`:m}
        <div class="entries">
        ${e.pages.map(s=>u`<button class="entry ${s.id===this.pageId?"on":""}" @click=${()=>(this.pageId=s.id,this.widgetId=null)}>
            <span class="name">${s.name}</span>
            <span class="meta"
              >${[s.background?.type==="photo"?d("Foto"):"",s.palette==="night"?d("Nacht"):"",s.show_if?.length?d("bedingt"):"",a.has(s.id)?"":d("nicht in Wiedergabe")].filter(Boolean).join(" \xB7 ")||`${s.duration} s`}</span
            >
          </button>`)}
        </div>
      </aside>
      <section class="stage">
        <div class="row-head">
          <span class="seg">
            ${["landscape","portrait"].map(s=>u`<button class="small ${this.layout===s?"on":""}" @click=${()=>this.layout=s}>${s==="landscape"?d("Quer"):d("Hoch")}</button>`)}
          </span>
          ${this.layout==="portrait"?this.page?.widgets.some(s=>s.portrait)?u`<span class="hint"
                  >Eigene Hochformat-Anordnung ·
                  <button class="small" @click=${()=>this.updatePage(s=>s.widgets.forEach(o=>delete o.portrait))}>${d("Automatisch anordnen")}</button></span
                >`:u`<span class="hint">${d("Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an")}</span>`:m}
        </div>
        <af-canvas
          .hass=${this.hass}
          .config=${e}
          .pageId=${this.pageId}
          .displayId=${this.displayId}
          .orientation=${this.layout}
          .selected=${this.widgetId}
          .selection=${this.selection}
          @select=${this.onSelect}
          @move=${this.onMove}
        ></af-canvas>
        <div class="palette">
          <span class="hint">${d("Widget hinzuf\xFCgen:")}</span>
          ${Object.entries(Ke).filter(([s])=>this.advanced||s!=="card").map(([s,o])=>u`<button class="chip" @click=${()=>this.addWidget(s)}>${G(o.icon)} ${d(o.name)}</button>`)}
        </div>
        ${e.templates?.widgets?.length||this.clip?u`<div class="palette">
              <span class="hint">${d("Eigene Vorlagen:")}</span>
              ${this.clip?u`<button class="chip accent" @click=${()=>this.pasteWidgets(this.clip)}>
                    Einfügen (${this.clip.length===1?Ke[this.clip[0].type]?.name??this.clip[0].type:`${this.clip.length} Widgets`})
                  </button>`:m}
              ${(e.templates?.widgets??[]).map((s,o)=>u`<span class="chip tpl">
                  <button @click=${()=>this.pasteWidgets(s.widgets)}>${s.name}</button>
                  <button
                    class="x"
                    title=${d("Vorlage l\xF6schen")}
                    @click=${()=>confirm(d("Vorlage \u201E{name}\u201C l\xF6schen?",{name:s.name}))&&this.mutate(l=>l.templates.widgets.splice(o,1))}
                  >
                    ✕
                  </button>
                </span>`)}
            </div>`:m}
        <div class="hint keys">${d("Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig")}</div>
      </section>
      <aside class="inspector">
        ${this.selection.length>1?u`<div class="head">
                <span>${d("{n} Widgets ausgew\xE4hlt",{n:this.selection.length})}</span>
              </div>
              <p class="actions-row">
                <button class="small" @click=${()=>{this.copyWidgets()}}>${d("Kopieren")}</button>
                <button class="small" @click=${this.duplicateWidget}>${d("Duplizieren")}</button>
                <button class="small" @click=${this.saveWidgetTemplate}>${d("Als Vorlage")}</button>
                <button class="small danger" @click=${this.removeWidget}>${d("L\xF6schen")}</button>
              </p>
              <p class="hint">${d("Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.")}</p>`:r?u`<div class="head">
                <span>${G(Ke[r.type]?.icon)} ${d(Ke[r.type]?.name??r.type)}</span>
                <span>
                  ${this.advanced?u`<button class="small" @click=${()=>{this.copyWidgets()}} title=${d("Kopieren (\u2318C)")}>${d("Kopieren")}</button>
                        <button class="small" @click=${this.saveWidgetTemplate} title=${d("Als eigene Vorlage speichern")}>${d("Vorlage")}</button>`:m}
                  <button class="small" @click=${this.duplicateWidget} title=${d("Duplizieren")}>${d("Duplizieren")}</button>
                  <button class="small danger" @click=${this.removeWidget} title=${d("L\xF6schen")}>${d("L\xF6schen")}</button>
                </span>
              </div>
              <div class="pos" ?hidden=${!this.advanced}>
                ${["x","y","w","h"].map(s=>{let o=ge[this.layout],l=this.posOf(r);return u`<label
                    >${d({x:"Spalte",y:"Zeile",w:"Breite",h:"H\xF6he"}[s])}
                    <input
                      type="number"
                      min=${s==="w"||s==="h"?1:0}
                      max=${s==="x"||s==="w"?o.cols:o.rows}
                      .value=${String(l[s])}
                      @input=${c=>{let h=Number(c.target.value);Number.isFinite(h)&&this.updatePage(p=>this.setPos(p,r.id,{...l,[s]:h}),`pos-${s}-${this.layout}`)}}
                  /></label>`})}
              </div>
              ${this.form(Fl,r.options,s=>this.updateWidget(o=>o.options=s,`opt-${r.id}`),`opt-${r.id}`)}
              <h4>${d("Einstellungen")}</h4>
              ${this.form(Nl[r.type]??[],r.options,s=>this.updateWidget(o=>o.options=s,`opt-${r.id}`),`opt-${r.id}`)}
              ${this.advanced?u`<h4>${d("Sichtbarkeit")}</h4>
              ${this.form([{key:"show_if",label:"Nur anzeigen wenn \u2026",type:"conditions"}],{show_if:r.show_if},s=>this.updateWidget(o=>o.show_if=s.show_if??[],`if-${r.id}`),`if-${r.id}`)}
              <h4>${d("Darstellung")}</h4>
              ${this.form(Pl,{look:r.look},s=>this.updateWidget(o=>{s.look&&Object.keys(s.look).length?o.look=s.look:delete o.look},`look-${r.id}`),`look-${r.id}`)}
              <h4>${d("Antippen")}</h4>
              ${this.form(Il,{tap_action:r.tap_action,hold_action:r.hold_action},s=>this.updateWidget(o=>{for(let l of["tap_action","hold_action"])s[l]?.action?o[l]=s[l]:delete o[l]},`act-${r.id}`),`act-${r.id}`)}`:u`<p class="hint">${d("Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).")}</p>`}`:this.page?u`<div class="head">
                  <span>${d("Seite")}</span>
                  <span>
                    ${this.advanced?u`<button class="small" @click=${()=>{this.exportPage()}} title=${d("Als YAML kopieren")}>${d("Exportieren")}</button>
                          <button class="small" @click=${this.savePageTemplate} title=${d("Als eigene Seitenvorlage speichern")}>${d("Vorlage")}</button>`:m}
                    <button class="small" @click=${this.duplicatePage}>${d("Duplizieren")}</button>
                    <button class="small danger" @click=${this.removePage}>${d("L\xF6schen")}</button>
                  </span>
                </div>
                ${this.form(Bl,this.page,s=>this.updatePage(o=>Object.assign(o,s,{widgets:o.widgets,id:o.id}),`page-${this.pageId}`),`page-${this.pageId}`)}
                <p class="hint">${d("Tipp: Ein Widget anklicken, um es zu bearbeiten.")}</p>`:u`<p class="hint">${d("Noch keine Seite \u2013 oben \u201E+ Neu\u201C.")}</p>`}
      </aside>
    </div>`}renderDevices(e){let n=this.devices[e],a=s=>this.draft?.pages.find(o=>o.id===s)?.name??s??"\u2013",r=s=>{if(!s)return d("nie");let o=Math.round((Date.now()-new Date(s).getTime())/1e3);return o<60?d("gerade eben"):o<3600?d("vor {n} min",{n:Math.round(o/60)}):d("vor {n} h",{n:Math.round(o/3600)})};return n?.clients.length?u`<div class="devices">
      ${n.clients.map(s=>u`<div class="device">
          <span class="dot ${s.hidden?"sleep":"on"}"></span>
          <span class="dname">${s.name}</span>
          <span class="dmeta"
            >${s.safe?`${d("Notfallmodus")} (${d(s.safe)})`:s.hidden?d("Bildschirm aus"):a(s.page)} · ${r(s.last_seen)}${s.version&&s.version!=="2026-10-22T06:29:09.876Z"?` \xB7 ${d("\xE4ltere Version")}`:""}</span
          >
        </div>`)}
      ${n.paused?u`<p class="hint">${d("Pausiert")}${n.until?` ${d("bis {when}",{when:new Date(n.until).toLocaleTimeString(X(),{hour:"2-digit",minute:"2-digit"})})}`:""}.</p>`:m}
    </div>`:u`<p class="hint">${d("Gerade ist kein Ger\xE4t mit diesem Display verbunden")}${n?.last_seen?` (${d("zuletzt {time}",{time:r(n.last_seen)})})`:""}.</p>`}renderPlayback(){let e=this.draft,n=e.displays.find(l=>l.id===this.displayId);if(!n)return u`<p class="hint">${d("Kein Display.")}</p>`;let a=e.displays.indexOf(n),r=(l,c="")=>this.mutate(h=>l(h.displays[a]),c),s=(l,c)=>r(h=>{let[p]=h.playlist.splice(l,1);h.playlist.splice(l+c,0,p)}),o=`${location.origin}/ambiframe-display?display=${encodeURIComponent(n.id)}`;return u`<div class="two">
      <section>
        <div class="row-head">
          ${e.displays.length>1?u`<select @change=${l=>this.displayId=l.target.value}>
                ${e.displays.map(l=>u`<option value=${l.id} ?selected=${l.id===this.displayId}>${l.name}</option>`)}
              </select>`:u`<h3>${n.name}</h3>`}
          <button class="small" @click=${()=>this.wizard="display"}>+ ${d("Display")}</button>
          <button
            class="small"
            ?hidden=${!this.advanced}
            title=${d("Dieses Display mit allen Einstellungen kopieren")}
            @click=${()=>{let l=Le("display",e.displays.map(c=>c.id));this.mutate(c=>c.displays.push({...ze(n),id:l,name:`${n.name} (${d("Kopie")})`})),this.displayId=l}}
          >
            ${d("Kopieren")}
          </button>
        </div>
        <h4>${d("Wiedergabeliste")}</h4>
        <div class="playlist">
          ${n.playlist.map((l,c)=>u`<div class="pl">
              <span class="num">${c+1}</span>
              <select @change=${h=>r(p=>p.playlist[c].page=h.target.value)}>
                ${e.pages.map(h=>u`<option value=${h.id} ?selected=${h.id===l.page}>${h.name}</option>`)}
              </select>
              <input
                type="number"
                min="3"
                placeholder=${String(e.pages.find(h=>h.id===l.page)?.duration??30)}
                .value=${l.duration!=null?String(l.duration):""}
                title=${d("Dauer in Sekunden (leer = Seitendauer)")}
                @input=${h=>{let p=h.target.value;r(g=>{p?g.playlist[c].duration=Number(p):delete g.playlist[c].duration},`pl-${c}`)}}
              />
              <span class="tools">
                <button
                  ?hidden=${!this.advanced&&!l.show_if?.length}
                  class="small ${l.show_if?.length?"cond":""}"
                  title=${l.show_if?.length?l.show_if.map(h=>Cr(h)).join(" \xB7 "):d("Nur zu bestimmten Zeiten oder Bedingungen zeigen")}
                  @click=${()=>{let h=new Set(this.plOpen);h.has(c)?h.delete(c):h.add(c),this.plOpen=h}}
                >
                  ${l.show_if?.length?d("bedingt"):d("Wann?")}
                </button>
                <button class="small" ?disabled=${c===0} @click=${()=>s(c,-1)}>↑</button>
                <button class="small" ?disabled=${c===n.playlist.length-1} @click=${()=>s(c,1)}>↓</button>
                <button class="small" ?disabled=${n.playlist.length===1} @click=${()=>r(h=>h.playlist.splice(c,1))}>✕</button>
              </span>
            </div>
            ${this.plOpen.has(c)?u`<div class="pl-cond">
                  ${this.form([{key:"show_if",label:"Diesen Eintrag nur zeigen, wenn \u2026",type:"conditions",help:"Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst."}],{show_if:l.show_if},h=>r(p=>{h.show_if?.length?p.playlist[c].show_if=h.show_if:delete p.playlist[c].show_if},`pl-if-${n.id}-${c}`),`pl-if-${n.id}-${c}`)}
                </div>`:m}`)}
          <button class="small dashed" @click=${()=>r(l=>l.playlist.push({page:e.pages[0]?.id??""}))}>+ ${d("Seite in die Wiedergabe")}</button>
        </div>
        <h4>${d("Display")}</h4>
        ${this.form(Wl(e),n,l=>r(c=>Object.assign(c,l,{id:c.id,playlist:c.playlist}),`disp-${n.id}`),`disp-${n.id}`)}
        <h4>${d("Eigenes Design")}</h4>
        <p class="hint">
          ${d("Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.")}
          <button
            class="small"
            @click=${()=>{this.designScope=n.id,this.tab="design"}}
          >
            ${d("Mit Stil-Vorschau gestalten")}
          </button>
        </p>
        ${this.form(Hl,n,l=>r(c=>Object.assign(c,{design:l.design}),`disp-design-${n.id}`),`disp-design-${n.id}`)}
        <h4>${d("T\xF6ne")}</h4>
        ${this.form(Kl,n,l=>r(c=>Object.assign(c,{sound:l.sound}),`disp-sound-${n.id}`),`disp-sound-${n.id}`)}
        <h4>${d("Videostream")}</h4>
        ${this.form(Rl,n,l=>r(c=>Object.assign(c,{stream:l.stream}),`disp-stream-${n.id}`),`disp-stream-${n.id}`)}
        ${n.stream?.enabled?u`<p class="hint">${d(n.stream.resolution==="both"?"Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.",{name:n.name})}</p>`:m}
        <h4>${d("Fotos")}</h4>
        ${this.form(Or,n,l=>r(c=>Object.assign(c,{photos:l.photos}),`disp-photos-${n.id}`),`disp-photos-${n.id}`)}
        <h4>${d("Ger\xE4te")}</h4>
        ${this.renderDevices(n.id)}
        <h4>${d("Auf dem Ger\xE4t \xF6ffnen")}</h4>
        <div class="url">
          <code>${o}</code><button class="small" @click=${()=>navigator.clipboard?.writeText(o)}>Kopieren</button
          ><a class="small button" href=${o} target="_blank">${d("\xD6ffnen")}</a>
        </div>
      </section>
      <section>
        <h4>${d("Vorschau (schnell)")}</h4>
        <div class="preview"><af-display preview .hass=${this.hass} .config=${e} display-id=${n.id} .speed=${.15}></af-display></div>
      </section>
    </div>`}renderEvents(){let e=this.draft,n=e.events.find(r=>r.id===this.eventId),a=n?e.events.indexOf(n):-1;return u`<div class="two">
      <section>
        <div class="row-head">
          <h3>${d("Ereignisse")}</h3>
          <span class="rel">
            <button class="small" @click=${()=>this.menu=this.menu==="event"?"":"event"}>${d("+ Neu")}</button>
            ${this.menu==="event"?u`<div class="menu">
                  ${ma.map(r=>u`<button
                      @click=${()=>{let s=Le(li(d(r.name).split(" ")[0]),e.events.map(o=>o.id));this.mutate(o=>o.events.push({id:s,...r.build(this.hass,o)})),this.eventId=s,this.menu=""}}
                    >
                      ${d(r.name)}
                    </button>`)}
                </div>`:m}
          </span>
        </div>
        ${e.events.map(r=>{let s=Br.find(c=>c.id===r.kind),o=[r.entity,...r.entities??[]].filter(Boolean),l=r.kind==="page"?` \u2192 ${e.pages.find(c=>c.id===r.page)?.name??d("keine Seite")}`:"";return u`<button class="entry ${r.id===this.eventId?"on":""} ${r.enabled===!1?"off":""}" @click=${()=>this.eventId=r.id}>
            <span class="name">${G(r.icon??s?.icon)} ${r.name??r.title}</span>
            <span class="meta"
              >${s?d(s.short):r.kind}${l} · ${o[0]??d("kein Ausl\xF6ser")}${o.length>1?` +${o.length-1}`:""}${r.enabled===!1?` \xB7 ${d("aus")}`:""}</span
            >
          </button>`})}
        ${this.renderSoundLibrary()}
        <h4>${d("Testen")}</h4>
        <div class="preview small"><af-display preview .hass=${this.hass} .config=${e} display-id=${this.displayId}></af-display></div>
      </section>
      <section>
        ${n?u`<div class="row-head">
                <h3>${n.name??n.title}</h3>
                <span>
                  <button class="small" @click=${()=>this.renderRoot.querySelector(".preview.small af-display")?.testEvent(n.id)}>▶ Testen</button>
                  <button class="small danger" @click=${()=>confirm(d("Ereignis \u201E{name}\u201C l\xF6schen?",{name:n.name??n.title}))&&this.mutate(r=>r.events.splice(a,1))}>${d("L\xF6schen")}</button>
                </span>
              </div>
              ${this.form(Ol(e),n,r=>this.mutate(s=>s.events[a]={...r,id:n.id},`ev-${n.id}`),`ev-${n.id}`)}`:u`<p class="hint">${d("Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.")}</p>`}
      </section>
    </div>`}async loadMediaSounds(){if(!this.hass||this.mediaSoundsLoading)return;this.mediaSoundsLoading=!0;let e=[],n=async(a,r,s)=>{if(e.length>=200)return;let o;try{o=await this.hass.callWS({type:"media_source/browse_media",media_content_id:a})}catch{return}for(let l of o.children??[]){let c=s?`${s}/${l.title}`:l.title;l.can_expand?r<2&&await n(l.media_content_id,r+1,c):(l.media_class==="music"||l.media_content_type?.startsWith("audio/"))&&e.push([l.media_content_id,c])}};await n("media-source://media_source/local",0,""),this.mediaSounds=e}renderSoundLibrary(){let n=this.draft.sounds??[];this.mediaSoundsLoading||this.loadMediaSounds();let a=(r,s,o)=>this.mutate(l=>{l.sounds[r][s]=o},`sound-${n[r].id}-${s}`);return u`<h4>${d("Eigene T\xF6ne")}</h4>
      <p class="hint">${d("Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.")}</p>
      ${n.map((r,s)=>u`<div class="sound-row">
          <input .value=${r.name} placeholder=${d("Name")} @input=${o=>a(s,"name",o.target.value)} />
          <input
            .value=${r.url}
            list="af-media-sounds"
            placeholder="media-source://…, /local/… ${d("oder")} https://…"
            @input=${o=>a(s,"url",o.target.value.trim())}
          />
          <button class="small" title=${d("Anh\xF6ren")} ?disabled=${!r.url} @click=${()=>{Jt(r.id,70,{hass:this.hass,library:n})}}>▶</button>
          <button class="small danger" title=${d("L\xF6schen")} @click=${()=>this.mutate(o=>{o.sounds.splice(s,1)})}>✕</button>
        </div>`)}
      <datalist id="af-media-sounds">${this.mediaSounds.map(([r,s])=>u`<option value=${r}>${s}</option>`)}</datalist>
      <button
        class="small"
        @click=${()=>this.mutate(r=>{let s=r.sounds??=[];s.push({id:Le("ton",s.map(o=>o.id)),name:d("Mein Ton"),url:""})})}
      >
        ${d("+ Ton hinzuf\xFCgen")}
      </button>`}renderDesign(){let e=this.draft,n=this.designScope?e.displays.find(a=>a.id===this.designScope):void 0;return this.designScope&&!n&&(this.designScope=""),n?this.renderDisplayDesign(n):this.renderAllDesign()}renderDesignScope(){let e=this.draft;return e.displays.length<2&&!this.designScope?m:u`<div class="scope">
      <span class="hint">${d("Gilt f\xFCr")}</span>
      <span class="seg">
        <button class="small ${this.designScope?"":"on"}" @click=${()=>this.designScope=""}>${d("Alle Displays")}</button>
        ${e.displays.map(n=>u`<button class="small ${this.designScope===n.id?"on":""}" @click=${()=>this.designScope=n.id}>${n.name}</button>`)}
      </span>
    </div>`}renderThemeCards(e,n,a,r){let s=this.draft,o=Object.keys(this.hass?.states??{}).find(g=>g.startsWith("weather.")),l={id:"__stilvorschau",name:"",duration:60,background:{type:"none"},palette:"normal",show_if:[],widgets:[{id:"uhr",type:"clock",x:0,y:1,w:7,h:3,options:{valign:"end"},show_if:[]},{id:"datum",type:"date",x:0,y:4,w:7,h:1,options:{},show_if:[]},...o?[{id:"wetter",type:"weather",x:8,y:1,w:4,h:6,options:{entity:o,variant:"card"},show_if:[]}]:[]]},c=r.value??s.design.mode??"auto",h=this.hass?.states["sun.sun"]?.state==="below_horizon",p=c==="dark"||c==="auto"&&h?"dark":"light";return u`<div class="row-head">
        <h3>${d("Stil")}</h3>
        <span class="seg" title=${d("Hell/Dunkel")}>
          ${[...r.inherit?[[void 0,"wie alle"]]:[],["auto","Automatisch"],["light","Hell"],["dark","Dunkel"]].map(([g,b])=>u`<button class="small ${r.value===g?"on":""}" @click=${()=>r.set(g)}>${d(b)}</button>`)}
        </span>
      </div>
      ${this.renderModeOverrides(r)}
      <div class="themes">
        ${ht.map(g=>{let{cfg:b,id:f}=a(g.id),v={...b,pages:[...b.pages,l]};return u`<button class="theme ${e===g.id?"on":""}" @click=${()=>n(g.id)}>
            <div class="mini">
              <af-display
                preview
                .hass=${this.hass}
                .config=${v}
                display-id=${f??""}
                .fixedPage=${l.id}
                .modeOverride=${p}
              ></af-display>
            </div>
            <div class="tname">${d(g.name)}</div>
            <div class="hint">${d(g.hint)}</div>
          </button>`})}
      </div>`}renderModeOverrides(e){if(e.inherit)return m;let n=this.draft,a=n.displays.filter(r=>r.mode&&r.mode!==(n.design.mode??"auto"));return a.length?u`<p class="hint mode-note">
      ${d("{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.",{names:a.map(r=>r.name).join(", ")})}
      <button
        class="small"
        @click=${()=>this.mutate(r=>{for(let s of r.displays)delete s.mode})}
      >
        ${d("F\xFCr alle \xFCbernehmen")}
      </button>
    </p>`:m}renderDisplayDesign(e){let n=this.draft,a=n.displays.indexOf(e),r={design:{...ze(e.design??{}),mode:e.mode,text_size:e.text_size,contrast:e.contrast,transition:e.transition},photos:ze(e.photos??{})},s=l=>this.mutate(c=>{let h=c.displays[a],{mode:p,text_size:g,contrast:b,transition:f,theme:v,...$}=l.design??{},P=(T,I)=>{let S=Zl(I);S===void 0?delete h[T]:h[T]=S};P("mode",p),P("text_size",g),P("contrast",b),P("transition",f),P("design",$),l.photos&&P("photos",l.photos)},`design-${e.id}`),o=Gp;return u`${this.renderDesignScope()}
      <p class="hint">${d("F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.",{name:e.name})}</p>
      ${this.renderThemeCards(e.theme??n.design.theme,l=>this.mutate(c=>c.displays[a].theme=l),l=>({cfg:{...n,displays:n.displays.map(c=>c.id===e.id?{...c,theme:l}:c)},id:e.id}),{value:e.mode,inherit:!0,set:l=>this.mutate(c=>{l===void 0?delete c.displays[a].mode:c.displays[a].mode=l})})}
      ${e.theme?u`<p class="hint"><button class="small" @click=${()=>this.mutate(l=>delete l.displays[a].theme)}>${d("Stil wie alle Displays")}</button></p>`:m}
      <div class="cols">
        <section class="narrow">
          <h3>${d("Hell/Dunkel & Schrift")}</h3>
          ${this.form(o(Wr),r,s,`ddesign-look-${e.id}`)}
        </section>
        ${this.advanced?u`<section class="narrow">
                <h3>${d("Eigene Farben \xB7 Dunkel")}</h3>
                ${this.form(ji("dark"),r,s,`ddesign-dark-${e.id}`)}
              </section>
              <section class="narrow">
                <h3>${d("Eigene Farben \xB7 Hell")}</h3>
                ${this.form(ji("light"),r,s,`ddesign-light-${e.id}`)}
              </section>
              <section class="narrow">
                <h3>${d("Form & CSS")}</h3>
                ${this.form(o(Fr),r,s,`ddesign-shape-${e.id}`)}
              </section>`:m}
        <section class="narrow">
          <h3>${d("Bewegung")}</h3>
          ${this.form(o(Hr),r,s,`ddesign-motion-${e.id}`)}
        </section>
        <section class="narrow">
          <h3>${d("Fotos")}</h3>
          ${this.form(Or,r,s,`ddesign-photos-${e.id}`)}
        </section>
      </div>
      <p class="hint">
        <button
          class="small"
          @click=${()=>this.mutate(l=>{let c=l.displays[a];for(let h of["theme","mode","text_size","contrast","transition","design","photos"])delete c[h]})}
        >
          ${d("Alle Abweichungen dieses Displays zur\xFCcksetzen")}
        </button>
      </p>`}renderAllDesign(){let e=this.draft,n=a=>this.mutate(r=>Object.assign(r,{design:a.design??r.design,photos:a.photos??r.photos}),"design");return u`${this.renderDesignScope()}
      ${this.renderThemeCards(e.design.theme,a=>this.mutate(r=>r.design.theme=a),a=>({cfg:{...e,design:{...e.design,theme:a}}}),{value:e.design.mode??"auto",set:a=>this.mutate(r=>r.design.mode=a??"auto")})}
      <div class="cols">
        <section class="narrow">
          <h3>${d("Hell/Dunkel & Schrift")}</h3>
          ${this.form(Wr,e,n,"design-look")}
        </section>
        ${this.advanced?u`<section class="narrow">
          <h3>${d("Eigene Farben \xB7 Dunkel")}</h3>
          ${this.form(ji("dark"),e,n,"design-colors-dark")}
        </section>
        <section class="narrow">
          <h3>${d("Eigene Farben \xB7 Hell")}</h3>
          ${this.form(ji("light"),e,n,"design-colors-light")}
          ${e.design.colors?u`<p class="hint"><button class="small" @click=${()=>this.mutate(a=>delete a.design.colors)}>${d("Eigene Farben zur\xFCcksetzen")}</button></p>`:m}
        </section>
        <section class="narrow">
          <h3>${d("Form & CSS")}</h3>
          ${this.form(Fr,e,n,"design-shape")}
        </section>
        <section class="narrow">
          <h3>${d("Eigene Stile")}</h3>
          ${this.renderPresets()}
        </section>`:m}
        <section class="narrow">
          <h3>${d("Bewegung")}</h3>
          ${this.form(Hr,e,n,"design-motion")}
        </section>
        <section class="narrow">
          <h3>${d("Fotos")}</h3>
          ${this.form(jl,e,a=>this.mutate(r=>Object.assign(r,{photos:a.photos??r.photos}),"design"),"design-photos")}
        </section>
        <section class="narrow">
          <h3>${d("KI-Zusammenfassung")}</h3>
          ${this.form(Vl,e,a=>this.mutate(r=>Object.assign(r,{summary:a.summary}),"design"),"design-summary")}
          ${e.summary?.enabled?u`<p class="hint">
                <button class="small" ?disabled=${this.summaryBusy} @click=${()=>{this.generateSummary()}}>
                  ${this.summaryBusy?d("Gemini schreibt \u2026"):d("Jetzt erstellen")}
                </button>
                ${this.summaryNote}
              </p>`:m}
        </section>
      </div>`}renderPresets(){let e=this.draft,n=e.design.presets??[],a=()=>{let{presets:s,...o}=ze(e.design);return o},r=s=>this.mutate(o=>{let{presets:l,...c}=s;o.design={...ze(c),presets:o.design.presets}});return u`${n.length?u`<div class="presets">
            ${n.map((s,o)=>u`<div class="preset">
                <span>${s.name}</span>
                <button class="small" @click=${()=>r(s.design)}>${d("Anwenden")}</button>
                <button class="small" title=${d("L\xF6schen")} @click=${()=>this.mutate(l=>l.design.presets.splice(o,1))}>✕</button>
              </div>`)}
          </div>`:u`<p class="hint">${d("Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.")}</p>`}
      <div class="preset-new">
        <input placeholder=${d("Name, z. B. Herbst")} .value=${this.presetName} @input=${s=>this.presetName=s.target.value} />
        <button
          class="small"
          ?disabled=${!this.presetName.trim()}
          @click=${()=>{let s=this.presetName.trim();this.mutate(o=>{let l=o.design.presets??=[],c=l.find(h=>h.name===s);c?c.design=a():l.push({name:s,design:a()})}),this.presetName=""}}
        >
          ${d("Aktuellen Stil speichern")}
        </button>
      </div>
      <p class="hint">
        <button
          class="small"
          @click=${async()=>{let s=ft({ambiframe_style:a()},{lineWidth:120});try{await navigator.clipboard.writeText(s),this.message={kind:"ok",text:d("Stil als YAML in die Zwischenablage kopiert.")}}catch{this.importText=s,this.message={kind:"ok",text:d("Stil unten als YAML \u2013 zum Kopieren markieren.")}}}}
        >
          ${d("Exportieren")}
        </button>
        <button class="small" @click=${()=>this.importText=this.importText===null?"":null}>Importieren …</button>
      </p>
      ${this.importText!==null?u`<textarea
              class="code import"
              rows="8"
              placeholder="ambiframe_style: …"
              .value=${this.importText}
              @input=${s=>this.importText=s.target.value}
            ></textarea>
            <p class="hint">
              <button
                class="small"
                @click=${()=>{try{let s=Lt(this.importText??""),o=s?.ambiframe_style??s?.design??s;if(!o||typeof o!="object"||Array.isArray(o))throw new Error(d("kein Stil gefunden"));r(o),this.importText=null,this.message={kind:"ok",text:d("Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.")}}catch(s){this.message={kind:"error",text:d("Import fehlgeschlagen: {error}",{error:String(s?.message??s)})}}}}
              >
                ${d("\xDCbernehmen")}
              </button>
            </p>`:m}`}renderYaml(){return!this.yaml&&this.draft&&(this.yaml=ga(this.draft)),u`<div class="yaml">
      <textarea spellcheck="false" .value=${this.yaml} @input=${e=>this.yaml=e.target.value}></textarea>
      <div class="actions">
        <button
          class="primary"
          @click=${()=>{try{let e=Lt(this.yaml);this.mutate(n=>Object.assign(n,e)),this.message={kind:"ok",text:d("\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.")}}catch(e){this.message={kind:"error",text:d("YAML ist nicht lesbar: {error}",{error:e.message})}}}}
        >
          ${d("In den Editor \xFCbernehmen")}
        </button>
        <button @click=${()=>this.yaml=ga(this.draft)}>${d("Neu laden")}</button>
        <span class="spacer"></span>
        <button
          @click=${async()=>{let e=await this.hass?.callWS({type:"ambiframe/config/default"});e&&(this.yaml=ga(e))}}
        >
          ${d("Startkonfiguration anzeigen")}
        </button>
        <button
          title=${d("Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)")}
          @click=${async()=>{let e=await this.hass?.callWS({type:"ambiframe/config/previous"}).catch(()=>null);if(!e){this.message={kind:"error",text:d("Es gibt noch keine vorherige Fassung.")};return}this.yaml=ga(e),this.message={kind:"ok",text:d("Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.")}}}
        >
          ${d("Vorherige Fassung laden")}
        </button>
      </div>
    </div>`}async checkPhotos(){let e=this.hass,n=this.draft?.photos;if(!e||!n)return;let a=null,r=null;if(n.folder)try{a=((await e.callWS({type:"media_source/browse_media",media_content_id:n.folder})).children??[]).filter(o=>o.media_class==="image"||/\.(jpe?g|png|webp|avif)$/i.test(o.title)).length}catch{a=0}if(n.icloud)try{r=(await e.callWS({type:"ambiframe/photos/icloud",url:n.icloud})).length}catch{r=0}this.photoHealth={folder:a,icloud:r}}goTo(e){e&&(this.healthOpen=!1,this.tab=e.tab,e.pageId&&(this.pageId=e.pageId),this.widgetId=e.widgetId??(e.pageId?null:this.widgetId),e.eventId&&(this.eventId=e.eventId),e.displayId&&(this.displayId=e.displayId))}renderHealthButton(){if(!this.draft)return m;let e=Vr(this.draft,this.hass,this.devices,this.photoHealth,"2026-10-22T06:29:09.876Z"),n=e.filter(r=>r.level!=="info").length,a=e.some(r=>r.level==="error");return u`<button
      class="health ${a?"bad":n?"warn":"ok"}"
      title=${d("Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos")}
      @click=${()=>{this.healthOpen=!this.healthOpen,this.healthOpen&&this.checkPhotos()}}
    >
      ${G(n?"warning":"check")}<span>${n?n===1?d("1 Hinweis"):d("{n} Hinweise",{n}):d("Alles gut")}</span>
    </button>`}renderHealth(){if(!this.healthOpen||!this.draft)return m;let e=Vr(this.draft,this.hass,this.devices,this.photoHealth,"2026-10-22T06:29:09.876Z"),n={error:"warning",warn:"info",info:"info"};return u`<div class="healthpanel">
      <div class="hhead">
        <h3>${d("Gesundheitscheck")}</h3>
        <button class="icon" title=${d("Schlie\xDFen")} @click=${()=>this.healthOpen=!1}>✕</button>
      </div>
      ${e.length?u`<ul>
            ${e.map(a=>u`<li class=${a.level}>
                ${G(n[a.level])}<span class="htext">${a.text}</span>
                ${a.go?u`<button class="small" @click=${()=>this.goTo(a.go)}>${d("Zeigen")}</button>`:m}
              </li>`)}
          </ul>`:u`<p class="hint">${G("check")} ${d("Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.")}</p>`}
      ${this.photoHealth===void 0?u`<p class="hint">${d("Fotos werden gez\xE4hlt \u2026")}</p>`:m}
    </div>`}renderWizard(){let e=this.draft,n=this.wizard||(e?.setup_complete===!1&&!this.wizardSkipped?"first":"");return!e||!n?m:u`<af-wizard
      .hass=${this.hass}
      .config=${e}
      mode=${n}
      @wizard-done=${a=>{this.mutate(r=>Object.assign(r,a.detail.config)),this.displayId=a.detail.displayId,this.tab="wiedergabe",this.wizard="",this.save()}}
      @wizard-close=${()=>{this.wizard="",n==="first"&&(this.wizardSkipped=!0,this.mutate(a=>a.setup_complete=!0),this.save())}}
    ></af-wizard>`}render(){Ft(It(this.draft?.design.language,this.hass?.language)),this.draft&&(Ct.displays=this.draft.displays.map(a=>[a.id,a.name]),Ct.pages=this.draft.pages.map(a=>[a.id,a.name]));let n=[["seiten","Seiten"],["wiedergabe","Wiedergabe"],["ereignisse","Ereignisse"],["design","Design"],["yaml","YAML"]].filter(([a])=>this.advanced||a!=="yaml");return u`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Ambiframe</div>
        <nav>
          ${n.map(([a,r])=>u`<button
              class="tab ${this.tab===a?"on":""}"
              @click=${()=>{this.tab=a,this.menu="",a==="yaml"&&(this.yaml="")}}
            >
              ${d(r)}
            </button>`)}
        </nav>
        <span class="spacer"></span>
        ${this.renderHealthButton()}
        <span class="seg mode" title=${d("Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten")}>
          <button class="small ${this.advanced?"":"on"}" @click=${()=>this.setAdvanced(!1)}>${d("Einfach")}</button>
          <button class="small ${this.advanced?"on":""}" @click=${()=>this.setAdvanced(!0)}>${d("Erweitert")}</button>
        </span>
        <button class="icon" title=${d("R\xFCckg\xE4ngig (\u2318Z)")} ?disabled=${!this.history.length} @click=${this.undo}>↶</button>
        <button class="icon" title=${d("Wiederholen (\u21E7\u2318Z)")} ?disabled=${!this.future.length} @click=${this.redo}>↷</button>
        <button ?disabled=${!this.dirty} @click=${this.discard}>${d("Verwerfen")}</button>
        <button class="primary" ?disabled=${!this.dirty||this.saving} @click=${this.save}>${this.saving?d("Speichert \u2026"):this.dirty?d("Speichern"):d("Gespeichert")}</button>
      </div>
      ${this.message?u`<div class="msg ${this.message.kind}" @click=${()=>this.message=null}>${this.message.text}</div>`:m}
      ${this.dirty||this.saving?u`<div class="savebar">
            <button ?disabled=${!this.dirty} @click=${this.discard}>${d("Verwerfen")}</button>
            <button class="primary" ?disabled=${!this.dirty||this.saving} @click=${this.save}>${this.saving?d("Speichert \u2026"):d("Speichern")}</button>
          </div>`:m}
      ${this.renderWizard()} ${this.renderHealth()}
      <main>
        ${this.draft?this.tab==="seiten"?this.renderPages():this.tab==="wiedergabe"?this.renderPlayback():this.tab==="ereignisse"?this.renderEvents():this.tab==="design"?this.renderDesign():this.renderYaml():u`<p class="hint">${d("L\xE4dt \u2026")}</p>`}
      </main>
    `}};qi.properties={hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},saved:{state:!0},draft:{state:!0},tab:{state:!0},pageId:{state:!0},widgetId:{state:!0},eventId:{state:!0},displayId:{state:!0},message:{state:!0},saving:{state:!0},yaml:{state:!0},menu:{state:!0},summaryBusy:{state:!0},mediaSounds:{state:!0},summaryNote:{state:!0},devices:{state:!0},layout:{state:!0},plOpen:{state:!0},multi:{state:!0},clip:{state:!0},pageImport:{state:!0},advanced:{state:!0},importText:{state:!0},presetName:{state:!0},wizard:{state:!0},healthOpen:{state:!0},designScope:{state:!0},photoHealth:{state:!0}},qi.styles=F`
    .scope {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin: 0 0 14px;
    }
    .health {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .health .ic {
      width: 16px;
      height: 16px;
    }
    .health.bad {
      color: var(--error-color, #e57373);
      border-color: var(--error-color, #e57373);
    }
    .health.warn {
      color: var(--warning-color, #ffb74d);
    }
    .health.ok .ic {
      color: var(--success-color, #81c784);
    }
    .healthpanel {
      position: fixed;
      z-index: 15;
      top: calc(var(--header-height, 56px) + 8px);
      right: 12px;
      width: min(520px, calc(100vw - 24px));
      max-height: calc(100vh - var(--header-height, 56px) - 32px);
      overflow: auto;
      box-sizing: border-box;
      padding: 14px 16px;
      border-radius: 14px;
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.4);
    }
    .hhead {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .hhead h3 {
      margin: 0;
    }
    .healthpanel ul {
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
    }
    .healthpanel li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 0;
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      font-size: 14px;
    }
    .healthpanel li .ic {
      width: 18px;
      height: 18px;
      flex: none;
    }
    .healthpanel li.error .ic {
      color: var(--error-color, #e57373);
    }
    .healthpanel li.warn .ic {
      color: var(--warning-color, #ffb74d);
    }
    .healthpanel li.info .ic {
      color: var(--secondary-text-color, #999);
    }
    .htext {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    :host {
      display: block;
      min-height: 100vh;
      background: var(--primary-background-color, #111);
      color: var(--primary-text-color, #eee);
      font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
      font-size: 14px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      height: var(--header-height, 56px);
      padding: 0 12px;
      background: var(--app-header-background-color, var(--primary-background-color));
      color: var(--app-header-text-color, var(--primary-text-color));
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      position: sticky;
      top: 0;
      z-index: 5;
    }
    .title {
      font-size: 20px;
      margin-right: 12px;
    }
    nav {
      display: flex;
      gap: 2px;
    }
    .spacer {
      flex: 1;
    }
    button,
    .button,
    select {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 999px;
      padding: 7px 14px;
      cursor: pointer;
      text-decoration: none;
    }
    button:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .tab {
      background: transparent;
      border-color: transparent;
    }
    .tab.on,
    .primary,
    .entry.on,
    .theme.on {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .icon {
      padding: 6px 11px;
      font-size: 16px;
    }
    .small {
      padding: 4px 10px;
      font-size: 13px;
    }
    .danger {
      color: var(--error-color, #e57373);
    }
    .dashed {
      border-style: dashed;
      align-self: flex-start;
    }
    .msg {
      margin: 10px 16px 0;
      padding: 10px 14px;
      border-radius: 10px;
      white-space: pre-wrap;
      cursor: pointer;
    }
    .msg.ok {
      background: rgba(76, 175, 80, 0.15);
    }
    .msg.error {
      background: rgba(244, 67, 54, 0.15);
    }
    main {
      padding: 16px;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    h3 {
      margin: 0 0 10px;
      font-size: 17px;
      font-weight: 500;
    }
    h4 {
      margin: 18px 0 6px;
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .ic {
      width: 1.1em;
      height: 1.1em;
      vertical-align: -0.2em;
    }
    .pages {
      display: grid;
      grid-template-columns: 210px minmax(0, 1fr) 380px;
      gap: 16px;
      align-items: start;
    }
    /* Leiste fürs Handy: Speichern immer erreichbar, unten am Bildschirmrand (nur bei schmalem Bildschirm) */
    .savebar {
      display: none;
    }
    @media (max-width: 760px) {
      :host {
        overflow-x: hidden;
      }
      .toolbar {
        flex-wrap: wrap;
        height: auto;
        row-gap: 6px;
        padding: 8px 10px;
      }
      .title {
        font-size: 18px;
        margin-right: 0;
      }
      /* Reiter in eigener Zeile, seitlich wischbar */
      nav {
        order: 10;
        flex: 1 1 100%;
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      nav::-webkit-scrollbar {
        display: none;
      }
      .tab {
        flex: none;
      }
      /* Oben bleibt nur das Nötigste – Speichern/Verwerfen stehen unten */
      .toolbar > .mode,
      .toolbar > .primary,
      .toolbar > button:not(.icon):not(.primary) {
        display: none;
      }
      main {
        padding: 12px 10px calc(84px + env(safe-area-inset-bottom));
      }
      /* :host davor, weil die Regel für ≤ 1250 px weiter unten steht */
      :host .pages {
        grid-template-columns: minmax(0, 1fr);
      }
      /* Seitenliste als wischbare Zeile – sonst schiebt sie Vorschau und Einstellungen weit nach unten */
      .list .entries {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        scrollbar-width: none;
        padding-bottom: 2px;
      }
      .list .entries::-webkit-scrollbar {
        display: none;
      }
      .list .entry {
        flex: none;
        width: auto;
        max-width: 200px;
        margin-top: 8px;
      }
      .list .entry .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .savebar {
        display: flex;
        gap: 10px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
        background: var(--card-background-color, #1c1c1c);
        border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
        box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.25);
      }
      .savebar button {
        flex: 1;
        padding: 12px;
        font-size: 16px;
      }
    }
    @media (max-width: 1250px) {
      .pages {
        grid-template-columns: 180px minmax(0, 1fr);
      }
      .pages .inspector {
        grid-column: 1 / -1;
      }
    }
    aside,
    section {
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      border-radius: 14px;
      padding: 12px;
    }
    .stage {
      background: transparent;
      border: 0;
      padding: 0;
    }
    .inspector {
      position: sticky;
      top: 72px;
      max-height: calc(100vh - 92px);
      overflow: auto;
    }
    .head,
    .row-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .rel {
      position: relative;
    }
    .menu {
      position: absolute;
      right: 0;
      top: 32px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      border-radius: 12px;
      background: var(--card-background-color, #222);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      min-width: 220px;
    }
    .menu button {
      text-align: left;
      border-radius: 8px;
    }
    .entry {
      display: block;
      width: 100%;
      text-align: left;
      border-radius: 10px;
      margin-top: 6px;
      padding: 8px 10px;
    }
    .entry .name {
      display: block;
      font-weight: 500;
    }
    .entry .meta {
      display: block;
      font-size: 12px;
      opacity: 0.7;
      margin-top: 2px;
      /* lange Entitäten (binary_sensor.…) umbrechen statt über den Rand zu laufen */
      overflow-wrap: anywhere;
    }
    .sound-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto auto;
      gap: 6px;
      margin: 6px 0;
    }
    .sound-row input {
      min-width: 0;
    }
    .entry.off {
      opacity: 0.55;
    }
    .palette {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      margin-top: 12px;
    }
    .chip {
      padding: 5px 11px;
      font-size: 13px;
    }
    .chip.accent {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .chip.tpl {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 0;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 999px;
    }
    .chip.tpl button {
      border: 0;
      background: transparent;
      padding: 5px 4px 5px 11px;
      font-size: 13px;
    }
    .chip.tpl button.x,
    .menu-row .x {
      padding: 5px 9px 5px 4px;
      opacity: 0.55;
    }
    .menu .sep {
      margin: 6px 4px 2px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      padding-top: 8px;
    }
    .menu-row {
      display: flex;
      gap: 2px;
    }
    .menu-row button:first-child {
      flex: 1;
    }
    .import-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 8px 0;
    }
    .actions-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .keys {
      margin-top: 8px;
    }
    .pos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 4px;
    }
    .pos label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .pos input {
      width: 100%;
      box-sizing: border-box;
      margin-top: 3px;
      font: inherit;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      border-radius: 8px;
      padding: 6px 8px;
    }
    .two {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1000px) {
      .two {
        /* minmax(0, …): breite Vorschauen dürfen die Spalte nicht über den Bildschirm hinaus aufblähen */
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .playlist {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pl {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) 80px auto;
      gap: 8px;
      align-items: center;
    }
    .pl-cond {
      margin: 0 0 6px 32px;
      padding: 4px 12px 8px;
      border-left: 2px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    }
    .small.cond {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .pl select,
    .pl input {
      border-radius: 8px;
      padding: 6px 8px;
      font: inherit;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
      width: 100%;
      box-sizing: border-box;
    }
    .num {
      color: var(--secondary-text-color);
      text-align: right;
    }
    .devices {
      display: grid;
      gap: 6px;
      margin-bottom: 8px;
    }
    .device {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
    }
    .device .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .device .dot.on {
      background: #4caf50;
    }
    .device .dot.sleep {
      background: #9e9e9e;
    }
    .device .dname {
      font-weight: 500;
    }
    .device .dmeta {
      color: var(--secondary-text-color, #888);
    }
    .url {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    code {
      font-size: 12px;
      word-break: break-all;
    }
    .preview {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 14px;
      overflow: hidden;
      background: #000;
    }
    .preview af-display,
    .mini af-display {
      position: absolute;
      inset: 0;
    }
    .themes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 14px;
      margin-bottom: 20px;
    }
    .theme {
      border-radius: 16px;
      padding: 10px;
      text-align: left;
    }
    .mini {
      position: relative;
      aspect-ratio: 16 / 10;
      border-radius: 10px;
      overflow: hidden;
      pointer-events: none;
    }
    .tname {
      font-weight: 500;
      margin-top: 8px;
    }
    .cols {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 8px 32px;
      align-items: start;
    }
    .seg {
      display: inline-flex;
      gap: 4px;
    }
    .seg button.on {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: transparent;
    }
    .narrow {
      max-width: 620px;
    }
    .seg.mode {
      margin-right: 8px;
    }
    [hidden] {
      display: none !important;
    }
    .presets {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 10px;
    }
    .preset {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .preset span {
      flex: 1;
      font-weight: 500;
    }
    .preset-new {
      display: flex;
      gap: 6px;
    }
    .preset-new input,
    textarea.import {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 6px 8px;
      font: inherit;
      color: var(--primary-text-color);
      background: rgba(127, 127, 127, 0.08);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    }
    textarea.import {
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      margin-top: 8px;
    }
    .yaml textarea {
      width: 100%;
      box-sizing: border-box;
      min-height: 70vh;
      font: 13px/1.5 ui-monospace, Menlo, monospace;
      color: var(--primary-text-color);
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.2));
      border-radius: 12px;
      padding: 14px;
    }
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
  `;B("ambiframe-panel",qi);Qr();
