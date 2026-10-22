var kd=Object.create;var Da=Object.defineProperty;var xd=Object.getOwnPropertyDescriptor;var Sd=Object.getOwnPropertyNames;var $d=Object.getPrototypeOf,Ad=Object.prototype.hasOwnProperty;var Td=(t,n,e)=>n in t?Da(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var Ed=(t,n)=>()=>{try{return n||t((n={exports:{}}).exports,n),n.exports}catch(e){throw n=0,e}};var zd=(t,n,e,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of Sd(n))!Ad.call(t,a)&&a!==e&&Da(t,a,{get:()=>n[a],enumerable:!(i=xd(n,a))||i.enumerable});return t};var cs=(t,n,e)=>(e=t!=null?kd($d(t)):{},zd(n||!t||!t.__esModule?Da(e,"default",{value:t,enumerable:!0}):e,t));var Be=(t,n,e)=>Td(t,typeof n!="symbol"?n+"":n,e);var dr=Ed((yo,wo)=>{var vo=(function(){var t=function(T,F){var S=236,_=17,k=T,M=e[F],w=null,y=0,P=null,L=[],A={},q=function(E,z){y=k*4+17,w=(function(x){for(var D=new Array(x),N=0;N<x;N+=1){D[N]=new Array(x);for(var H=0;H<x;H+=1)D[N][H]=null}return D})(y),Q(0,0),Q(y-7,0),Q(0,y-7),be(),ue(),Qe(E,z),k>=7&&Pe(E),P==null&&(P=yd(k,M,L)),Je(P,z)},Q=function(E,z){for(var x=-1;x<=7;x+=1)if(!(E+x<=-1||y<=E+x))for(var D=-1;D<=7;D+=1)z+D<=-1||y<=z+D||(0<=x&&x<=6&&(D==0||D==6)||0<=D&&D<=6&&(x==0||x==6)||2<=x&&x<=4&&2<=D&&D<=4?w[E+x][z+D]=!0:w[E+x][z+D]=!1)},se=function(){for(var E=0,z=0,x=0;x<8;x+=1){q(!0,x);var D=a.getLostPoint(A);(x==0||E>D)&&(E=D,z=x)}return z},ue=function(){for(var E=8;E<y-8;E+=1)w[E][6]==null&&(w[E][6]=E%2==0);for(var z=8;z<y-8;z+=1)w[6][z]==null&&(w[6][z]=z%2==0)},be=function(){for(var E=a.getPatternPosition(k),z=0;z<E.length;z+=1)for(var x=0;x<E.length;x+=1){var D=E[z],N=E[x];if(w[D][N]==null)for(var H=-2;H<=2;H+=1)for(var U=-2;U<=2;U+=1)H==-2||H==2||U==-2||U==2||H==0&&U==0?w[D+H][N+U]=!0:w[D+H][N+U]=!1}},Pe=function(E){for(var z=a.getBCHTypeNumber(k),x=0;x<18;x+=1){var D=!E&&(z>>x&1)==1;w[Math.floor(x/3)][x%3+y-8-3]=D}for(var x=0;x<18;x+=1){var D=!E&&(z>>x&1)==1;w[x%3+y-8-3][Math.floor(x/3)]=D}},Qe=function(E,z){for(var x=M<<3|z,D=a.getBCHTypeInfo(x),N=0;N<15;N+=1){var H=!E&&(D>>N&1)==1;N<6?w[N][8]=H:N<8?w[N+1][8]=H:w[y-15+N][8]=H}for(var N=0;N<15;N+=1){var H=!E&&(D>>N&1)==1;N<8?w[8][y-N-1]=H:N<9?w[8][15-N-1+1]=H:w[8][15-N-1]=H}w[y-8][8]=!E},Je=function(E,z){for(var x=-1,D=y-1,N=7,H=0,U=a.getMaskFunction(z),j=y-1;j>0;j-=2)for(j==6&&(j-=1);;){for(var de=0;de<2;de+=1)if(w[D][j-de]==null){var ge=!1;H<E.length&&(ge=(E[H]>>>N&1)==1);var Z=U(D,j-de);Z&&(ge=!ge),w[D][j-de]=ge,N-=1,N==-1&&(H+=1,N=7)}if(D+=x,D<0||y<=D){D-=x,x=-x;break}}},Ft=function(E,z){for(var x=0,D=0,N=0,H=new Array(z.length),U=new Array(z.length),j=0;j<z.length;j+=1){var de=z[j].dataCount,ge=z[j].totalCount-de;D=Math.max(D,de),N=Math.max(N,ge),H[j]=new Array(de);for(var Z=0;Z<H[j].length;Z+=1)H[j][Z]=255&E.getBuffer()[Z+x];x+=de;var Ie=a.getErrorCorrectPolynomial(ge),Fe=s(H[j],Ie.getLength()-1),os=Fe.mod(Ie);U[j]=new Array(Ie.getLength()-1);for(var Z=0;Z<U[j].length;Z+=1){var ls=Z+os.getLength()-U[j].length;U[j][Z]=ls>=0?os.getAt(ls):0}}for(var ds=0,Z=0;Z<z.length;Z+=1)ds+=z[Z].totalCount;for(var _a=new Array(ds),ni=0,Z=0;Z<D;Z+=1)for(var j=0;j<z.length;j+=1)Z<H[j].length&&(_a[ni]=H[j][Z],ni+=1);for(var Z=0;Z<N;Z+=1)for(var j=0;j<z.length;j+=1)Z<U[j].length&&(_a[ni]=U[j][Z],ni+=1);return _a},yd=function(E,z,x){for(var D=o.getRSBlocks(E,z),N=l(),H=0;H<x.length;H+=1){var U=x[H];N.put(U.getMode(),4),N.put(U.getLength(),a.getLengthInBits(U.getMode(),E)),U.write(N)}for(var j=0,H=0;H<D.length;H+=1)j+=D[H].dataCount;if(N.getLengthInBits()>j*8)throw"code length overflow. ("+N.getLengthInBits()+">"+j*8+")";for(N.getLengthInBits()+4<=j*8&&N.put(0,4);N.getLengthInBits()%8!=0;)N.putBit(!1);for(;!(N.getLengthInBits()>=j*8||(N.put(S,8),N.getLengthInBits()>=j*8));)N.put(_,8);return Ft(N,D)};A.addData=function(E,z){z=z||"Byte";var x=null;switch(z){case"Numeric":x=c(E);break;case"Alphanumeric":x=h(E);break;case"Byte":x=p(E);break;case"Kanji":x=g(E);break;default:throw"mode:"+z}L.push(x),P=null},A.isDark=function(E,z){if(E<0||y<=E||z<0||y<=z)throw E+","+z;return w[E][z]},A.getModuleCount=function(){return y},A.make=function(){if(k<1){for(var E=1;E<40;E++){for(var z=o.getRSBlocks(E,M),x=l(),D=0;D<L.length;D++){var N=L[D];x.put(N.getMode(),4),x.put(N.getLength(),a.getLengthInBits(N.getMode(),E)),N.write(x)}for(var H=0,D=0;D<z.length;D++)H+=z[D].dataCount;if(x.getLengthInBits()<=H*8)break}k=E}q(!1,se())},A.createTableTag=function(E,z){E=E||2,z=typeof z>"u"?E*4:z;var x="";x+='<table style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: "+z+"px;",x+='">',x+="<tbody>";for(var D=0;D<A.getModuleCount();D+=1){x+="<tr>";for(var N=0;N<A.getModuleCount();N+=1)x+='<td style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: 0px;",x+=" width: "+E+"px;",x+=" height: "+E+"px;",x+=" background-color: ",x+=A.isDark(D,N)?"#000000":"#ffffff",x+=";",x+='"/>';x+="</tr>"}return x+="</tbody>",x+="</table>",x},A.createSvgTag=function(E,z,x,D){var N={};typeof arguments[0]=="object"&&(N=arguments[0],E=N.cellSize,z=N.margin,x=N.alt,D=N.title),E=E||2,z=typeof z>"u"?E*4:z,x=typeof x=="string"?{text:x}:x||{},x.text=x.text||null,x.id=x.text?x.id||"qrcode-description":null,D=typeof D=="string"?{text:D}:D||{},D.text=D.text||null,D.id=D.text?D.id||"qrcode-title":null;var H=A.getModuleCount()*E+z*2,U,j,de,ge,Z="",Ie;for(Ie="l"+E+",0 0,"+E+" -"+E+",0 0,-"+E+"z ",Z+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',Z+=N.scalable?"":' width="'+H+'px" height="'+H+'px"',Z+=' viewBox="0 0 '+H+" "+H+'" ',Z+=' preserveAspectRatio="xMinYMin meet"',Z+=D.text||x.text?' role="img" aria-labelledby="'+Bt([D.id,x.id].join(" ").trim())+'"':"",Z+=">",Z+=D.text?'<title id="'+Bt(D.id)+'">'+Bt(D.text)+"</title>":"",Z+=x.text?'<description id="'+Bt(x.id)+'">'+Bt(x.text)+"</description>":"",Z+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',Z+='<path d="',de=0;de<A.getModuleCount();de+=1)for(ge=de*E+z,U=0;U<A.getModuleCount();U+=1)A.isDark(de,U)&&(j=U*E+z,Z+="M"+j+","+ge+Ie);return Z+='" stroke="transparent" fill="black"/>',Z+="</svg>",Z},A.createDataURL=function(E,z){E=E||2,z=typeof z>"u"?E*4:z;var x=A.getModuleCount()*E+z*2,D=z,N=x-z;return I(x,x,function(H,U){if(D<=H&&H<N&&D<=U&&U<N){var j=Math.floor((H-D)/E),de=Math.floor((U-D)/E);return A.isDark(de,j)?0:1}else return 1})},A.createImgTag=function(E,z,x){E=E||2,z=typeof z>"u"?E*4:z;var D=A.getModuleCount()*E+z*2,N="";return N+="<img",N+=' src="',N+=A.createDataURL(E,z),N+='"',N+=' width="',N+=D,N+='"',N+=' height="',N+=D,N+='"',x&&(N+=' alt="',N+=Bt(x),N+='"'),N+="/>",N};var Bt=function(E){for(var z="",x=0;x<E.length;x+=1){var D=E.charAt(x);switch(D){case"<":z+="&lt;";break;case">":z+="&gt;";break;case"&":z+="&amp;";break;case'"':z+="&quot;";break;default:z+=D;break}}return z},wd=function(E){var z=1;E=typeof E>"u"?z*2:E;var x=A.getModuleCount()*z+E*2,D=E,N=x-E,H,U,j,de,ge,Z={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},Ie={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},Fe="";for(H=0;H<x;H+=2){for(j=Math.floor((H-D)/z),de=Math.floor((H+1-D)/z),U=0;U<x;U+=1)ge="\u2588",D<=U&&U<N&&D<=H&&H<N&&A.isDark(j,Math.floor((U-D)/z))&&(ge=" "),D<=U&&U<N&&D<=H+1&&H+1<N&&A.isDark(de,Math.floor((U-D)/z))?ge+=" ":ge+="\u2588",Fe+=E<1&&H+1>=N?Ie[ge]:Z[ge];Fe+=`
`}return x%2&&E>0?Fe.substring(0,Fe.length-x-1)+Array(x+1).join("\u2580"):Fe.substring(0,Fe.length-1)};return A.createASCII=function(E,z){if(E=E||1,E<2)return wd(z);E-=1,z=typeof z>"u"?E*2:z;var x=A.getModuleCount()*E+z*2,D=z,N=x-z,H,U,j,de,ge=Array(E+1).join("\u2588\u2588"),Z=Array(E+1).join("  "),Ie="",Fe="";for(H=0;H<x;H+=1){for(j=Math.floor((H-D)/E),Fe="",U=0;U<x;U+=1)de=1,D<=U&&U<N&&D<=H&&H<N&&A.isDark(j,Math.floor((U-D)/E))&&(de=0),Fe+=de?ge:Z;for(j=0;j<E;j+=1)Ie+=Fe+`
`}return Ie.substring(0,Ie.length-1)},A.renderTo2dContext=function(E,z){z=z||2;for(var x=A.getModuleCount(),D=0;D<x;D++)for(var N=0;N<x;N++)E.fillStyle=A.isDark(D,N)?"black":"white",E.fillRect(D*z,N*z,z,z)},A};t.stringToBytesFuncs={default:function(T){for(var F=[],S=0;S<T.length;S+=1){var _=T.charCodeAt(S);F.push(_&255)}return F}},t.stringToBytes=t.stringToBytesFuncs.default,t.createStringToBytes=function(T,F){var S=(function(){for(var k=v(T),M=function(){var ue=k.read();if(ue==-1)throw"eof";return ue},w=0,y={};;){var P=k.read();if(P==-1)break;var L=M(),A=M(),q=M(),Q=String.fromCharCode(P<<8|L),se=A<<8|q;y[Q]=se,w+=1}if(w!=F)throw w+" != "+F;return y})(),_=63;return function(k){for(var M=[],w=0;w<k.length;w+=1){var y=k.charCodeAt(w);if(y<128)M.push(y);else{var P=S[k.charAt(w)];typeof P=="number"?(P&255)==P?M.push(P):(M.push(P>>>8),M.push(P&255)):M.push(_)}}return M}};var n={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},i={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a=(function(){var T=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],F=1335,S=7973,_=21522,k={},M=function(w){for(var y=0;w!=0;)y+=1,w>>>=1;return y};return k.getBCHTypeInfo=function(w){for(var y=w<<10;M(y)-M(F)>=0;)y^=F<<M(y)-M(F);return(w<<10|y)^_},k.getBCHTypeNumber=function(w){for(var y=w<<12;M(y)-M(S)>=0;)y^=S<<M(y)-M(S);return w<<12|y},k.getPatternPosition=function(w){return T[w-1]},k.getMaskFunction=function(w){switch(w){case i.PATTERN000:return function(y,P){return(y+P)%2==0};case i.PATTERN001:return function(y,P){return y%2==0};case i.PATTERN010:return function(y,P){return P%3==0};case i.PATTERN011:return function(y,P){return(y+P)%3==0};case i.PATTERN100:return function(y,P){return(Math.floor(y/2)+Math.floor(P/3))%2==0};case i.PATTERN101:return function(y,P){return y*P%2+y*P%3==0};case i.PATTERN110:return function(y,P){return(y*P%2+y*P%3)%2==0};case i.PATTERN111:return function(y,P){return(y*P%3+(y+P)%2)%2==0};default:throw"bad maskPattern:"+w}},k.getErrorCorrectPolynomial=function(w){for(var y=s([1],0),P=0;P<w;P+=1)y=y.multiply(s([1,r.gexp(P)],0));return y},k.getLengthInBits=function(w,y){if(1<=y&&y<10)switch(w){case n.MODE_NUMBER:return 10;case n.MODE_ALPHA_NUM:return 9;case n.MODE_8BIT_BYTE:return 8;case n.MODE_KANJI:return 8;default:throw"mode:"+w}else if(y<27)switch(w){case n.MODE_NUMBER:return 12;case n.MODE_ALPHA_NUM:return 11;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 10;default:throw"mode:"+w}else if(y<41)switch(w){case n.MODE_NUMBER:return 14;case n.MODE_ALPHA_NUM:return 13;case n.MODE_8BIT_BYTE:return 16;case n.MODE_KANJI:return 12;default:throw"mode:"+w}else throw"type:"+y},k.getLostPoint=function(w){for(var y=w.getModuleCount(),P=0,L=0;L<y;L+=1)for(var A=0;A<y;A+=1){for(var q=0,Q=w.isDark(L,A),se=-1;se<=1;se+=1)if(!(L+se<0||y<=L+se))for(var ue=-1;ue<=1;ue+=1)A+ue<0||y<=A+ue||se==0&&ue==0||Q==w.isDark(L+se,A+ue)&&(q+=1);q>5&&(P+=3+q-5)}for(var L=0;L<y-1;L+=1)for(var A=0;A<y-1;A+=1){var be=0;w.isDark(L,A)&&(be+=1),w.isDark(L+1,A)&&(be+=1),w.isDark(L,A+1)&&(be+=1),w.isDark(L+1,A+1)&&(be+=1),(be==0||be==4)&&(P+=3)}for(var L=0;L<y;L+=1)for(var A=0;A<y-6;A+=1)w.isDark(L,A)&&!w.isDark(L,A+1)&&w.isDark(L,A+2)&&w.isDark(L,A+3)&&w.isDark(L,A+4)&&!w.isDark(L,A+5)&&w.isDark(L,A+6)&&(P+=40);for(var A=0;A<y;A+=1)for(var L=0;L<y-6;L+=1)w.isDark(L,A)&&!w.isDark(L+1,A)&&w.isDark(L+2,A)&&w.isDark(L+3,A)&&w.isDark(L+4,A)&&!w.isDark(L+5,A)&&w.isDark(L+6,A)&&(P+=40);for(var Pe=0,A=0;A<y;A+=1)for(var L=0;L<y;L+=1)w.isDark(L,A)&&(Pe+=1);var Qe=Math.abs(100*Pe/y/y-50)/5;return P+=Qe*10,P},k})(),r=(function(){for(var T=new Array(256),F=new Array(256),S=0;S<8;S+=1)T[S]=1<<S;for(var S=8;S<256;S+=1)T[S]=T[S-4]^T[S-5]^T[S-6]^T[S-8];for(var S=0;S<255;S+=1)F[T[S]]=S;var _={};return _.glog=function(k){if(k<1)throw"glog("+k+")";return F[k]},_.gexp=function(k){for(;k<0;)k+=255;for(;k>=256;)k-=255;return T[k]},_})();function s(T,F){if(typeof T.length>"u")throw T.length+"/"+F;var S=(function(){for(var k=0;k<T.length&&T[k]==0;)k+=1;for(var M=new Array(T.length-k+F),w=0;w<T.length-k;w+=1)M[w]=T[w+k];return M})(),_={};return _.getAt=function(k){return S[k]},_.getLength=function(){return S.length},_.multiply=function(k){for(var M=new Array(_.getLength()+k.getLength()-1),w=0;w<_.getLength();w+=1)for(var y=0;y<k.getLength();y+=1)M[w+y]^=r.gexp(r.glog(_.getAt(w))+r.glog(k.getAt(y)));return s(M,0)},_.mod=function(k){if(_.getLength()-k.getLength()<0)return _;for(var M=r.glog(_.getAt(0))-r.glog(k.getAt(0)),w=new Array(_.getLength()),y=0;y<_.getLength();y+=1)w[y]=_.getAt(y);for(var y=0;y<k.getLength();y+=1)w[y]^=r.gexp(r.glog(k.getAt(y))+M);return s(w,0).mod(k)},_}var o=(function(){var T=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],F=function(k,M){var w={};return w.totalCount=k,w.dataCount=M,w},S={},_=function(k,M){switch(M){case e.L:return T[(k-1)*4+0];case e.M:return T[(k-1)*4+1];case e.Q:return T[(k-1)*4+2];case e.H:return T[(k-1)*4+3];default:return}};return S.getRSBlocks=function(k,M){var w=_(k,M);if(typeof w>"u")throw"bad rs block @ typeNumber:"+k+"/errorCorrectionLevel:"+M;for(var y=w.length/3,P=[],L=0;L<y;L+=1)for(var A=w[L*3+0],q=w[L*3+1],Q=w[L*3+2],se=0;se<A;se+=1)P.push(F(q,Q));return P},S})(),l=function(){var T=[],F=0,S={};return S.getBuffer=function(){return T},S.getAt=function(_){var k=Math.floor(_/8);return(T[k]>>>7-_%8&1)==1},S.put=function(_,k){for(var M=0;M<k;M+=1)S.putBit((_>>>k-M-1&1)==1)},S.getLengthInBits=function(){return F},S.putBit=function(_){var k=Math.floor(F/8);T.length<=k&&T.push(0),_&&(T[k]|=128>>>F%8),F+=1},S},c=function(T){var F=n.MODE_NUMBER,S=T,_={};_.getMode=function(){return F},_.getLength=function(w){return S.length},_.write=function(w){for(var y=S,P=0;P+2<y.length;)w.put(k(y.substring(P,P+3)),10),P+=3;P<y.length&&(y.length-P==1?w.put(k(y.substring(P,P+1)),4):y.length-P==2&&w.put(k(y.substring(P,P+2)),7))};var k=function(w){for(var y=0,P=0;P<w.length;P+=1)y=y*10+M(w.charAt(P));return y},M=function(w){if("0"<=w&&w<="9")return w.charCodeAt(0)-48;throw"illegal char :"+w};return _},h=function(T){var F=n.MODE_ALPHA_NUM,S=T,_={};_.getMode=function(){return F},_.getLength=function(M){return S.length},_.write=function(M){for(var w=S,y=0;y+1<w.length;)M.put(k(w.charAt(y))*45+k(w.charAt(y+1)),11),y+=2;y<w.length&&M.put(k(w.charAt(y)),6)};var k=function(M){if("0"<=M&&M<="9")return M.charCodeAt(0)-48;if("A"<=M&&M<="Z")return M.charCodeAt(0)-65+10;switch(M){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+M}};return _},p=function(T){var F=n.MODE_8BIT_BYTE,S=T,_=t.stringToBytes(T),k={};return k.getMode=function(){return F},k.getLength=function(M){return _.length},k.write=function(M){for(var w=0;w<_.length;w+=1)M.put(_[w],8)},k},g=function(T){var F=n.MODE_KANJI,S=T,_=t.stringToBytesFuncs.SJIS;if(!_)throw"sjis not supported.";(function(w,y){var P=_(w);if(P.length!=2||(P[0]<<8|P[1])!=y)throw"sjis not supported."})("\u53CB",38726);var k=_(T),M={};return M.getMode=function(){return F},M.getLength=function(w){return~~(k.length/2)},M.write=function(w){for(var y=k,P=0;P+1<y.length;){var L=(255&y[P])<<8|255&y[P+1];if(33088<=L&&L<=40956)L-=33088;else if(57408<=L&&L<=60351)L-=49472;else throw"illegal char at "+(P+1)+"/"+L;L=(L>>>8&255)*192+(L&255),w.put(L,13),P+=2}if(P<y.length)throw"illegal char at "+(P+1)},M},b=function(){var T=[],F={};return F.writeByte=function(S){T.push(S&255)},F.writeShort=function(S){F.writeByte(S),F.writeByte(S>>>8)},F.writeBytes=function(S,_,k){_=_||0,k=k||S.length;for(var M=0;M<k;M+=1)F.writeByte(S[M+_])},F.writeString=function(S){for(var _=0;_<S.length;_+=1)F.writeByte(S.charCodeAt(_))},F.toByteArray=function(){return T},F.toString=function(){var S="";S+="[";for(var _=0;_<T.length;_+=1)_>0&&(S+=","),S+=T[_];return S+="]",S},F},f=function(){var T=0,F=0,S=0,_="",k={},M=function(y){_+=String.fromCharCode(w(y&63))},w=function(y){if(!(y<0)){if(y<26)return 65+y;if(y<52)return 97+(y-26);if(y<62)return 48+(y-52);if(y==62)return 43;if(y==63)return 47}throw"n:"+y};return k.writeByte=function(y){for(T=T<<8|y&255,F+=8,S+=1;F>=6;)M(T>>>F-6),F-=6},k.flush=function(){if(F>0&&(M(T<<6-F),T=0,F=0),S%3!=0)for(var y=3-S%3,P=0;P<y;P+=1)_+="="},k.toString=function(){return _},k},v=function(T){var F=T,S=0,_=0,k=0,M={};M.read=function(){for(;k<8;){if(S>=F.length){if(k==0)return-1;throw"unexpected end of file./"+k}var y=F.charAt(S);if(S+=1,y=="=")return k=0,-1;if(y.match(/^\s$/))continue;_=_<<6|w(y.charCodeAt(0)),k+=6}var P=_>>>k-8&255;return k-=8,P};var w=function(y){if(65<=y&&y<=90)return y-65;if(97<=y&&y<=122)return y-97+26;if(48<=y&&y<=57)return y-48+52;if(y==43)return 62;if(y==47)return 63;throw"c:"+y};return M},$=function(T,F){var S=T,_=F,k=new Array(T*F),M={};M.setPixel=function(L,A,q){k[A*S+L]=q},M.write=function(L){L.writeString("GIF87a"),L.writeShort(S),L.writeShort(_),L.writeByte(128),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(0),L.writeByte(255),L.writeByte(255),L.writeByte(255),L.writeString(","),L.writeShort(0),L.writeShort(0),L.writeShort(S),L.writeShort(_),L.writeByte(0);var A=2,q=y(A);L.writeByte(A);for(var Q=0;q.length-Q>255;)L.writeByte(255),L.writeBytes(q,Q,255),Q+=255;L.writeByte(q.length-Q),L.writeBytes(q,Q,q.length-Q),L.writeByte(0),L.writeString(";")};var w=function(L){var A=L,q=0,Q=0,se={};return se.write=function(ue,be){if(ue>>>be)throw"length over";for(;q+be>=8;)A.writeByte(255&(ue<<q|Q)),be-=8-q,ue>>>=8-q,Q=0,q=0;Q=ue<<q|Q,q=q+be},se.flush=function(){q>0&&A.writeByte(Q)},se},y=function(L){for(var A=1<<L,q=(1<<L)+1,Q=L+1,se=P(),ue=0;ue<A;ue+=1)se.add(String.fromCharCode(ue));se.add(String.fromCharCode(A)),se.add(String.fromCharCode(q));var be=b(),Pe=w(be);Pe.write(A,Q);var Qe=0,Je=String.fromCharCode(k[Qe]);for(Qe+=1;Qe<k.length;){var Ft=String.fromCharCode(k[Qe]);Qe+=1,se.contains(Je+Ft)?Je=Je+Ft:(Pe.write(se.indexOf(Je),Q),se.size()<4095&&(se.size()==1<<Q&&(Q+=1),se.add(Je+Ft)),Je=Ft)}return Pe.write(se.indexOf(Je),Q),Pe.write(q,Q),Pe.flush(),be.toByteArray()},P=function(){var L={},A=0,q={};return q.add=function(Q){if(q.contains(Q))throw"dup key:"+Q;L[Q]=A,A+=1},q.size=function(){return A},q.indexOf=function(Q){return L[Q]},q.contains=function(Q){return typeof L[Q]<"u"},q};return M},I=function(T,F,S){for(var _=$(T,F),k=0;k<F;k+=1)for(var M=0;M<T;M+=1)_.setPixel(M,k,S(M,k));var w=b();_.write(w);for(var y=f(),P=w.toByteArray(),L=0;L<P.length;L+=1)y.writeByte(P[L]);return y.flush(),"data:image/gif;base64,"+y};return t})();(function(){vo.stringToBytesFuncs["UTF-8"]=function(t){function n(e){for(var i=[],a=0;a<e.length;a++){var r=e.charCodeAt(a);r<128?i.push(r):r<2048?i.push(192|r>>6,128|r&63):r<55296||r>=57344?i.push(224|r>>12,128|r>>6&63,128|r&63):(a++,r=65536+((r&1023)<<10|e.charCodeAt(a)&1023),i.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63))}return i}return n(t)}})();(function(t){typeof define=="function"&&define.amd?define([],t):typeof yo=="object"&&(wo.exports=t())})(function(){return vo})});var us=[{id:"fraunces",name:"Fraunces",kind:"serif",pkg:"@fontsource-variable/fraunces",file:"fraunces-latin-full-normal.woff2",weight:"100 900"},{id:"newsreader",name:"Newsreader",kind:"serif",pkg:"@fontsource-variable/newsreader",file:"newsreader-latin-opsz-normal.woff2",weight:"200 800"},{id:"instrument",name:"Instrument Serif",kind:"serif",pkg:"@fontsource/instrument-serif",file:"instrument-serif-latin-400-normal.woff2",weight:"400"},{id:"playfair",name:"Playfair Display",kind:"serif",pkg:"@fontsource-variable/playfair-display",file:"playfair-display-latin-wght-normal.woff2",weight:"400 900"},{id:"cormorant",name:"Cormorant Garamond",kind:"serif",pkg:"@fontsource-variable/cormorant-garamond",file:"cormorant-garamond-latin-wght-normal.woff2",weight:"300 700"},{id:"inter",name:"Inter",kind:"sans",pkg:"@fontsource-variable/inter",file:"inter-latin-opsz-normal.woff2",weight:"100 900"},{id:"geist",name:"Geist",kind:"sans",pkg:"@fontsource-variable/geist",file:"geist-latin-wght-normal.woff2",weight:"100 900"},{id:"manrope",name:"Manrope",kind:"sans",pkg:"@fontsource-variable/manrope",file:"manrope-latin-wght-normal.woff2",weight:"200 800"},{id:"outfit",name:"Outfit",kind:"sans",pkg:"@fontsource-variable/outfit",file:"outfit-latin-wght-normal.woff2",weight:"100 900"},{id:"jakarta",name:"Plus Jakarta Sans",kind:"sans",pkg:"@fontsource-variable/plus-jakarta-sans",file:"plus-jakarta-sans-latin-wght-normal.woff2",weight:"200 800"},{id:"space-grotesk",name:"Space Grotesk",kind:"sans",pkg:"@fontsource-variable/space-grotesk",file:"space-grotesk-latin-wght-normal.woff2",weight:"300 700"},{id:"nunito",name:"Nunito (rund)",kind:"sans",pkg:"@fontsource-variable/nunito",file:"nunito-latin-wght-normal.woff2",weight:"200 1000"}];var ii=us,_d={serif:'Georgia, "Times New Roman", serif',sans:'system-ui, -apple-system, "Segoe UI", sans-serif'},hs=t=>`Ambiframe ${t.name.replace(/ \(.*\)$/,"")}`,He=t=>{let n=ii.find(e=>e.id===t);return n?`"${hs(n)}", ${_d[n.kind]}`:""},ps=()=>{if(document.getElementById("ambiframe-fonts"))return;let t=document.createElement("style");t.id="ambiframe-fonts",t.textContent=ii.map(n=>{let e=new URL(`./fonts/${n.file}`,import.meta.url).href,i=n.weight.includes(" ")?"woff2-variations":"woff2";return`@font-face { font-family: "${hs(n)}"; font-style: normal; font-display: swap; font-weight: ${n.weight}; src: url("${e}") format("${i}"); }`}).join(`
`),document.head.appendChild(t)};var Na={"% Luftfeuchte":"% humidity","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = on every change \u2013 e.g. for buttons and event.* entities","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = live picture","1 Licht an":"1 light on","12 / Vollbild 15":"12 / fullscreen 15","168 = eine Woche, 720 = 30 Tage":"168 = one week, 720 = 30 days",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"from","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"From the last trigger; while a sensor is on, the page stays anyway.","ab Wert":"from value","ab {n}":"from {n}",Abbrechen:"Cancel",Abendstimmung:"Evening mood",Abholung:"Collection","Abholung {when}":"Collection {when}","Abklingzeit (s)":"Cooldown (s)","Achse bis":"Axis to","Achse von":"Axis from",Akku:"Battery","Akku %":"Battery %",Aktion:"Action","Aktion (domain.dienst)":"Action (domain.service)","Aktion/Skript ausf\xFChren":"Run action/script",Aktiv:"Active","Aktuellen Stil speichern":"Save current style","Aktuellen Wert zeigen":"Show current value","Aktueller Preis":"Current price","Aktueller Raum":"Current room",Akzent:"Accent","Akzent (Gold)":"Accent (gold)",Akzentfarbe:"Accent colour","Alarm (eindringlich, wiederholt)":"Alarm (urgent, repeats)","Alle Bewegungs-/Pr\xE4senzmelder":"All motion/presence sensors","Alle Fenster- und T\xFCrsensoren":"All window and door sensors","Alle von \u2026 (und)":"All of \u2026 (and)","Alles ruhig":"All quiet","Als eigene Seitenvorlage speichern":"Save as your own page template","Als eigene Vorlage speichern":"Save as your own template","Als Karte":"As a card","Als Vorlage":"As template","Als YAML kopieren":"Copy as YAML","Am g\xFCnstigsten":"Cheapest","am {day}":"on {day}",An:"On",an:"on","An/Aus":"On/off",Angehalten:"Paused",Angesteckt:"Plugged in",Animation:"Animation",Antippen:"Tap",Anwenden:"Apply","Anzeige (Ring)":"Gauge (ring)","Anzeige, Editor und KI-Zusammenfassung":"Display, editor and AI summary",Anzeigefehler:"display error",Art:"Type",Attribut:"Attribute","Attribut (optional)":"Attribute (optional)","Auch nachts":"Also at night","Auch pausiert zeigen":"Also show when paused","Auf dem Ger\xE4t \xF6ffnen":"Open on the device",Auftrag:"Job","Auftrag/Druck":"Job/print",Aurora:"Aurora",Aus:"Off",aus:"off","aus Home Assistant eingeschaltet":"switched on from Home Assistant",Ausl\u00F6ser:"Trigger",Ausnehmen:"Exclude",Ausrichtung:"Orientation",Auto:"Car",automatisch:"automatic","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatic (by device, also when rotated)","automatisch (wie der HA-Benutzer)":"automatic (like the HA user)","Automatisch anordnen":"Arrange automatically","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Stacked automatically \u2013 moving creates your own layout","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatic \u2013 light by day, dark after sunset","automatisch: Gemini":"automatic: Gemini",Balken:"Bars",Bedienmodus:"Control mode","1 Woche":"1 week","12 Stunden":"12 hours","2 Tage":"2 days","24 Stunden":"24 hours","6 Stunden":"6 hours",Gestern:"Yesterday","Keine Mitteilungen":"No notifications",Mitteilungen:"Notifications","Mitteilungen ({n})":"Notifications ({n})",Mitteilungszentrale:"Notification centre","Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C.":"History of events \u2013 in the quick menu (long press) under \u201CNotifications\u201D.","Verlauf leeren":"Clear history","Verlauf reicht zur\xFCck":"History covers","0 = bei Pause sofort ausblenden":"0 = hide immediately when paused","1 Stunde":"1 hour","1 Tag":"1 day","15 Minuten":"15 minutes","2 Erinnerungen":"2 reminders","2 Stunden":"2 hours","3 Erinnerungen":"3 reminders","30 Minuten":"30 minutes","4 Erinnerungen":"4 reminders","4 Stunden":"4 hours","5 Erinnerungen":"5 reminders","8 Stunden":"8 hours","Alle entfernen":"Clear all","Ausblenden nach (s)":"Hide after (s)","Cover zeigen":"Show cover",Ecke:"Corner","Erinnerung oben rechts":"Reminder top right","Erinnerungen oben rechts":"Reminders top right","Fortschritt zeigen":"Show progress","Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft.":"Per track: hide after this many seconds, show again on the next track. Empty = as long as something is playing.","Nach Pause noch (s)":"Keep after pause (s)","Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht.":"After the notice a small reminder stays in the top right \u2013 permanently, for a while or not at all.","Stapeln ab":"Stack from","Weg, wenn das Ger\xE4t wieder startet":"Clear when the device starts again","Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf.":"Like notifications on iOS: a stack with a count, tap to expand.","Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt.":"E.g. the washing machine starts again \u2013 then the old reminder is done.","Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis":"E.g. \u201CLaundry done\u201D after a notice","bleibt, bis man sie antippt":"stays until tapped",dauerhaft:"permanent",gro\u00DF:"large","keine Erinnerung":"no reminder",klein:"small","nie stapeln":"never stack","oben links":"top left","oben rechts":"top right","ohne (nur Text und Cover)":"none (text and cover only)","unten links":"bottom left","unten rechts":"bottom right","+ Ton hinzuf\xFCgen":"+ Add sound","Abstand (s)":"Interval (s)","Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.":"Upload an audio file in HA under Media \u2192 Local media and pick it here \u2013 or enter a link. The sound can then be chosen for every event.","Eigene T\xF6ne":"Custom sounds","Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.":"Click into the field for custom and built-in sounds \u2013 or enter a link (/local/sound.mp3, media-source://\u2026). Add custom sounds on the left under \u201CCustom sounds\u201D.","Mein Ton":"My sound",Wiederholen:"Repeat","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)":"until tapped or closed (max. 2 min)","eigener Ton":"custom sound",einmal:"once","einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)":"once (the \u201CAlarm\u201D sound repeats on full-screen alarms until tapped)","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australia","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Pictures and captions of Bing's pictures of the day","Bing-Region":"Bing region",Brasil:"Brazil","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Germany","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"An \u201Carticle of the day\u201D only exists in these languages.",Espa\u00F1a:"Spain","FAZ (DE)":"FAZ (DE)",France:"France","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"In the video stream (AirPlay, camera) the ticker is always off \u2013 it would freeze or stutter there.",India:"India",Italia:"Italy","NPR (US)":"NPR (US)","Nachrichten-Laufband":"News ticker",Nederland:"Netherlands","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Switzerland","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"United Kingdom","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Pick a suggestion (e.g. bbc, guardian, tagesschau) or enter the address of any RSS/Atom feed. Empty = sources in the display language.","Wikipedia-Sprache":"Wikipedia language","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 German, quote of the week","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 English, quote of the day","automatisch (aus beim Fernseher)":"automatic (off on TVs)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 or https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"as the display","wie die Sprache von Home Assistant":"by Home Assistant's language",\u00D6sterreich:"Austria","wie alle":"as all",Automatisch:"Automatic",Hell:"Light",Dunkel:"Dark","Zitat der Woche":"Quote of the week",Zitat:"Quote","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Quote: in German the quote of the week (Wikiquote), in English the quote of the day (ZenQuotes)","+ Neu":"+ New",Quer:"Landscape",Hoch:"Portrait","Eigene Farben zur\xFCcksetzen":"Reset custom colours","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"No events yet \u2013 \u201C+ New\u201D above.","1 Hinweis":"1 note","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Bing pictures of the day also between your own photos","nein \u2013 nur, wenn nichts Eigenes da ist":"no \u2013 only when there are no own photos","Bing-Bilder untermischen":"Mix in Bing pictures","Jetzt: {what} bis {time}":"Now: {what} until {time}","Termine der n\xE4chsten \u2026 Stunden":"Appointments within the next \u2026 hours","N\xE4chster Termin":"Next appointment","Guten Morgen":"Good morning","Leer = die ersten Kalender automatisch":"Empty = first calendars automatically","Guten Abend":"Good evening","Guten Tag":"Good afternoon","Keine Abholung":"No collection","Regenrisiko {n} %":"Chance of rain {n} %","Regen ab etwa {time} Uhr":"Rain from about {time}","Wetter heute":"Weather today","Heute keine Termine":"No appointments today","Termine heute":"Today's appointments","Tagesvorschau am Morgen":"Morning day preview",Tagesvorschau:"Day preview","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Adds the \u201COn TV\u201D switch \u2013 sends the display to the Apple TV via AirPlay","Fernseher (Apple TV)":"TV (Apple TV)","Fenster zu! Es regnet":"Close the windows! It's raining","Nur zeigen, wenn":"Only show when","z. B. Fenster \u2013 die offenen werden genannt":"e.g. windows \u2013 the open ones are named","Nur wenn eine davon an ist":"Only when one of these is on","Endzeit statt Restzeit":"End time instead of time left","z. B. aktueller Raum des Saugers":"e.g. the vacuum's current room",Zusatz:"Extra","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"playing","Es regnet":"It's raining","noch {time}":"{time} left","Restzeit oder Endzeit":"Time left or end time","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Empty = usual \u201Crunning\u201D states","L\xE4uft bei Zustand":"Running when state is","Zeigen bei Zustand":"Show when state is","Wiedergabe (z. B. Apple TV)":"Playback (e.g. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Device running \u2013 with time left","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Notice \u2013 only when true (e.g. rain)","L\xE4uft gerade (ganze Seite)":"Now playing (full page)","Ganze Seite mit gro\xDFem Cover":"Full page with large cover",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, view over the Wadden Sea and the Halligen (image)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, Black Forest \u2013 Todtnauer H\xFCtte (image)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Saarland \u2013 west shore with marina (image)",Saugkarte:"Cleaning map","Leer = Karte des Saugers automatisch":"Empty = the vacuum's own map","Gro\xDFe Karte darunter":"Large map below",Ausblenden:"Hide","Neben jedem Sauger":"Next to each vacuum","Kleine Karten":"Small maps","Tagesinhalt (Wikipedia, Zitat)":"Daily content (Wikipedia, quote)","Wikipedia-Artikel des Tages":"Wikipedia article of the day","Zitat des Tages":"Quote of the day","Artikel des Tages \xB7 Wikipedia":"Today's featured article \xB7 Wikipedia","Mit Bild":"With picture","Ohne Bild":"Without picture",Inhalt:"Content",Anzahl:"Count","Energiez\xE4hler (kWh)":"Energy meter (kWh)","Gr\xF6\xDFte Verbraucher":"Top consumers","Gr\xF6\xDFte Verbraucher heute":"Top consumers today","Heute noch kein Verbrauch gemessen":"No consumption measured today yet","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Empty = the individual devices from the Home Assistant energy dashboard","Wird berechnet \u2026":"Calculating \u2026","Richtung umkehren":"Reverse direction","Wenn der Antrieb offen und zu andersherum meldet":"If the motor reports open and closed the other way round",ausgefahren:"extended",eingefahren:"retracted","Gilt f\xFCr":"Applies to","Alle Displays":"All displays","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"Designing \u201C{name}\u201D: what you set here applies only to this display. Empty = as for all displays.","Stil wie alle Displays":"Style as all displays","Alle Abweichungen dieses Displays zur\xFCcksetzen":"Reset all differences of this display","wie alle Displays":"as all displays","Mit Stil-Vorschau gestalten":"Design with style preview","4K und Full HD (zwei Kameras)":"4K and Full HD (two cameras)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cameras \u201CAmbiframe {name} Video stream\u201D (4K) and \u201C\u2026 Video stream Full HD\u201D \u2013 in a dashboard, in Apple Home (HomeKit Bridge) or via \u201Ccamera.play_stream\u201D on the Apple TV.",Aufl\u00F6sung:"Resolution","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"For OLED screens: the picture shifts imperceptibly by a few pixels every few minutes so nothing burns in. Best combined with \u201Cdark\u201D.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera \u201CAmbiframe {name} Video stream\u201D \u2013 in a dashboard, in Apple Home (HomeKit Bridge) or via \u201Ccamera.play_stream\u201D on the Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Creates the camera \u201CVideo stream\u201D \u2013 e.g. for Apple TV (AirPlay), Apple Home or TVs without a modern browser. Needs the \u201CPuppet\u201D add-on. It only renders while someone is watching.","Neues Bild alle (s)":"New picture every (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Only needed if Puppet is not found, e.g. http://homeassistant.local:10000","OLED-Schutz":"OLED protection","Puppet-Adresse":"Puppet address",Videostream:"Video stream","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"All good","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"All fine: all entities present, devices connected, photos available.","Das iCloud-Album liefert keine Fotos":"The iCloud album returns no photos","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"The photo frame has no photos (folder and album empty, Bing off)","Der Fotoordner ist leer oder fehlt":"The photo folder is empty or missing","Display \u201E{name}\u201C":"Display \u201C{name}\u201D","Display \u201E{name}\u201C meldet sich nicht":"Display \u201C{name}\u201D is not responding","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"Display \u201C{name}\u201D has not responded for {n} h","Display \u201E{name}\u201C war noch nie verbunden":"Display \u201C{name}\u201D has never connected","Ereignis \u201E{name}\u201C":"Event \u201C{name}\u201D","Fotos werden gez\xE4hlt \u2026":"Counting photos \u2026",Gesundheitscheck:"Health check","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"Health check: missing entities, devices, photos","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"AI summary is on, but there is no AI (ai_task) in Home Assistant","Seite \u201E{name}\u201C":"Page \u201C{name}\u201D","Seite \u201E{name}\u201C wird nirgends gezeigt":"Page \u201C{name}\u201D is not shown anywhere","{n} Hinweise":"{n} notes","{id} gibt es nicht (mehr) \u2013 {where}":"{id} does not exist (anymore) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} is unavailable \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\u201C{name}\u201D still has an older version","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\u201C{name}\u201D is in safe mode: {reason}","1 Stunde stumm":"Mute 1 hour",Anhalten:"Pause",Dunkler:"Darker","Eine Stunde stumm":"Muted for an hour",Heller:"Brighter","Helligkeit {n} %":"Brightness {n} %",Schlie\u00DFen:"Close",Schnellmen\u00FC:"Quick menu","T\xF6ne an":"Sounds on","T\xF6ne wieder an":"Sounds back on","Weiter abspielen":"Resume","Alle Batterien in Ordnung":"All batteries fine","Ger\xE4te und schwache Batterien":"Devices and low batteries","Nur Ger\xE4te":"Devices only","Nur schwache Batterien":"Low batteries only",Zeigen:"Show","+ {n} weitere":"+ {n} more",Akkus:"Batteries",Akkustand:"Battery level","Batterie wechseln":"Replace battery","Ger\xE4te (immer zeigen)":"Devices (always show)","H\xF6chstens Zeilen Zubeh\xF6r":"Max. rows of accessories","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Empty = all phones, tablets and watches from the HA app automatically","Zubeh\xF6r zeigen unter (%)":"Show accessories below (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessories: all batteries fine",schwach:"low","Pfeile zum Bl\xE4ttern":"Arrows to browse","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Subtle at the bottom left and right: previous and next page without leaving Ambiframe","Vorherige Seite":"Previous page","N\xE4chste Seite":"Next page","Karte unten rechts (kurz beim Liedwechsel)":"Card bottom right (briefly on track change)","Vollbild (kurz beim Liedwechsel)":"Full screen (briefly on track change)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Mini card \u2013 stays while something is playing","Eigenes QR-Bild":"Own QR image","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"Instead of network name and password, a ready-made QR image, e.g. from your router (link or data:image/\u2026)","Adresse kopieren":"Copy address","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Everything at a glance: photos, weather, appointments, bins, household and energy. Tap to open the dashboard.","Ambiframe als Bildschirmschoner":"Ambiframe as screensaver","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe always runs; tapping shows the HA dashboard, then it returns by itself.",Anh\u00F6ren:"Listen","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Motion at the door \u2192 camera picture-in-picture","Bing-Bilder, wenn Ordner und Album leer sind":"Bing images when folder and album are empty","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"The profile picks suitable pages, controls, sounds and look. You can adjust everything afterwards.","Dashboard \xFCber Ambiframe":"Dashboard over Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Copy this display with all settings","Display \u201E{name}\u201C mit {n} Seiten":"Display \u201C{name}\u201D with {n} pages","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"A calm picture \u2013 that only speaks when something happens",Fernseher:"TV","Fertig \u2013 speichern":"Done \u2013 save","Fertig!":"Done!",Flur:"Hallway","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"Photos app \u2192 share album \u2192 turn on \u201CPublic Website\u201D \u2192 copy link.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk found: Ambiframe sets the start page and screensaver itself and restarts the tablet if it hangs.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully shows the dashboard; after a minute without touch Ambiframe appears. Doorbell and camera bring it to the front at once.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"For the photo frame. Folder and album are mixed; without both Ambiframe shows Bing's images of the day.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Found in your Home Assistant. Sounds are subtle and match the design \u2013 press \u25B6 to listen.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Appliance finished \u2192 notice and reminder","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Large photo frame: photos, webcams, weather, news. Dark and calm (gentle on OLED), no controls or sound.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 Media \u2192 Local media \u2192 create folder \u201Cambiframe\u201D and upload photos.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"In a few steps you set up your first display: where it hangs, what it shows, what it reacts to. Everything can be changed later in the editor.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"No controls \u2013 e.g. for the TV.","Klingel \u2192 Vollbild mit Kamera":"Doorbell \u2192 full screen with camera",Kopie:"copy","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"At a glance when passing by: clock, weather, bins and who is home \u2013 large text.",K\u00FCche:"Kitchen","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Quieter than the doorbell, silent at night (10 pm\u20137 am).","Neue Seiten dazu":"Add new pages","Nur anzeigen":"Display only","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Calm and dark: clock, photos, weather. Only the doorbell speaks up \u2013 quiet in the evening, silent at night.",Schlafzimmer:"Bedroom","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Set up the device: open this address in the browser of the tablet or TV (in Fully as start URL) and log in to Home Assistant once.","Sp\xFClmaschine fertig":"Dishwasher finished","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Tip: with Fully Kiosk (and its HA integration) Ambiframe sets up the tablet itself.","Trockner fertig":"Dryer finished","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Preselected by profile. The photo frame alternates with the info pages.","Was soll das Display zeigen?":"What should the display show?",Weiter:"Next","Willkommen bei Ambiframe":"Welcome to Ambiframe","Wo h\xE4ngt das Display?":"Where does the display hang?","Woher kommen die Fotos?":"Where do the photos come from?","Worauf soll es reagieren?":"What should it react to?",Zur\u00FCck:"Back","ohne Ton":"no sound","{n} neue Ereignisse":"{n} new events",\u00DCberspringen:"Skip","Eigenes CSS (nur dieses Display)":"Custom CSS (this display only)","Eigenes Design":"Own design","Erg\xE4nzt das CSS aus dem Design.":"Added to the CSS from the design.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"No sounds on this display \u2013 overlays still appear","Leer = wie Design":"Empty = as design","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Only what is set here differs from the design \u2013 empty means \u201Cas design\u201D.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Scales the volume of events; in Fully the tablet's media volume",Stumm:"Mute",T\u00F6ne:"Sounds","Z. B. media-source://media_source/local/kueche":"E.g. media-source://media_source/local/kitchen",Bedienung:"Controls","Dashboard \xFCber Ambiframe (Antippen)":"Dashboard over Ambiframe (tap)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Dashboard in Fully, Ambiframe as screensaver","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"Screensaver: Fully shows the dashboard; after the idle time Ambiframe appears. Doorbell and camera bring Ambiframe to the front at once. Fully is set up automatically.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"Time without touch until Ambiframe returns",bedingt:"conditional",Bedingung:"Condition","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Conditions, appearance and tap actions are available in \u201CAdvanced\u201D mode (top right).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"The next one each time the page appears \u2013 replaces camera and link above","Beim Antippen":"On tap","Beim langen Dr\xFCcken":"On long press",beliebig:"any",Bereit:"Ready","Besuche heute":"visits today",Bewegung:"Motion","Bewegung erkannt":"Motion detected","Bewegung \u2192 Bild-im-Bild":"Motion \u2192 picture-in-picture","Bewegung \u2192 Seite":"Motion \u2192 page","Bewegung \u2192 Seite zeigen":"Motion \u2192 show page",Bewertung:"Rating",Bew\u00F6lkt:"Cloudy",Bezeichnung:"Label",Bild:"Image","Bild neu laden (s)":"Reload image (s)","Bild nicht ladbar":"Image could not be loaded","Bild-im-Bild":"Picture-in-picture","Bild-im-Bild (Bewegung)":"Picture-in-picture (motion)","Bild-Link":"Image link","Bild-Link oder Entit\xE4t w\xE4hlen":"Choose an image link or entity",Bilderrahmen:"Photo frame","Bildschirm aus":"Screen off",Bildunterschrift:"Caption","Bing-Bilder":"Bing images",bis:"until","Bis {hi}\xB0, nachts {lo}\xB0":"Up to {hi}\xB0, {lo}\xB0 at night","bis {when}":"until {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Afterwards stays as a small reminder at the top right.","Bleibt vorerst nass":"Staying wet for now",Breite:"Width",Cover:"Cover","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 beach and mudflats (YouTube live picture)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Only show again after this \u2013 against constant triggering.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"May be a template, e.g. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"May be a template.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"May contain templates, e.g. {{ states('sensor.outside') }} \xB0C \u2013 updated live.",Darstellung:"Appearance",Dashboard:"Dashboard","Daten (YAML, optional)":"Data (YAML, optional)",Datum:"Date",Dauer:"Duration","Dauer (s)":"Duration (s)","Dauer in Sekunden (leer = Seitendauer)":"Duration in seconds (empty = page duration)","Davor zeigt die Bilanz den Vortag":"Before that, the summary shows the previous day","Deckkraft (%)":"Opacity (%)",Design:"Design","Details (HA-Dialog)":"Details (HA dialog)",deutlich:"strong",Deutsch:"Deutsch",dezent:"subtle","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"Load the version from before the last save into the editor (then \u201CSave\u201D)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"The choice is saved on this device.","Diesen Eintrag nur zeigen, wenn \u2026":"Only show this entry when \u2026","Klangschale (tief, schwebend)":"Singing bowl (deep, shimmering)","Marimba (zwei Holzt\xF6ne)":"Marimba (two wooden notes)","Glas (klares Ding-Dong)":"Glass (clear ding-dong)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (three plucked notes)","Windspiel (zart)":"Wind chime (delicate)","Hinweis (sehr leise, kurz)":"Hint (very quiet, short)","Ding-Dong":"Ding-dong",Display:"Display",Displays:"Displays",dunkel:"dark","dunkel: nach Sonnenuntergang w\xE4rmer":"dark: warmer after sunset",Duplizieren:"Duplicate",d\u00E4mmrig:"dusky",Eckenradius:"Corner radius","Eckenradius (px)":"Corner radius (px)","Eckenradius der Karten (px)":"Card corner radius (px)",Editorial:"Editorial","Eigene Farbe":"Custom colour","Eigene Farben \xB7 Dunkel":"Custom colours \xB7 dark","Eigene Farben \xB7 Hell":"Custom colours \xB7 light","Eigene Stile":"Your styles","Eigene Vorlagen":"Your templates","Eigene Vorlagen:":"Your templates:","Eigenes CSS (alle Displays)":"Custom CSS (all displays)","Eigenes CSS (nur diese Seite)":"Custom CSS (this page only)","Ein Balken je":"One bar per","Ein/aus schalten":"Toggle on/off","Eine von mehreren ist":"One of several is","eine von {n} = {state}":"one of {n} = {state}","Eine Zeile":"One line","Eine Zeile (dezent)":"One line (subtle)",Einfach:"Simple","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Simple: just the essentials \xB7 Advanced: everything",eingebaut:"built-in",Einheit:"Unit","Einmal tippen f\xFCr Vollbild":"Tap once for fullscreen",Einpassen:"Fit",Einstellungen:"Settings",Eintrag:"Entry","empfindliche Gruppen":"sensitive groups",Endzeit:"End time","Energie jetzt":"Energy now","Energie-Bilanz":"Energy summary",English:"English",entfernen:"remove",Entit\u00E4t:"Entity","Entit\xE4t hinzuf\xFCgen":"Add entity","Entit\xE4t hinzuf\xFCgen \u2026":"Add entity \u2026","Entit\xE4t w\xE4hlen":"Choose an entity",Entit\u00E4ten:"Entities","Ereignis \u201E{name}\u201C l\xF6schen?":"Delete event \u201C{name}\u201D?",Ereignisse:"Events","Erf\xFCllt bei true, on, Zahl \u2260 0":"True for true, on, number \u2260 0",Erinnerungstext:"Reminder text",Erledigt:"Done","Erstellen um":"Create at",erstes:"first",Erweitert:"Advanced",Erzeugung:"Production","Erzeugung (W)":"Production (W)","Es gibt noch keine vorherige Fassung.":"There is no previous version yet.","Es klingelt":"Someone\u2019s at the door","Es regnet gerade":"It\u2019s raining",Exportieren:"Export",Extrem:"Extreme",Familie:"Family",Farbe:"Colour","Farbe ab Wert":"Colour from value",Farben:"Colours",Fehlgeschlagen:"Failed","Fehlgeschlagen: {error}":"Failed: {error}",Fenster:"Window","Fenster offen":"Window open","Fertig um":"Done at","fertig um {time}":"done at {time}","fertig {time}":"done {time}",feucht:"humid","Flie\xDFender Verlauf":"Flowing gradient",Flie\u00DFtext:"Body text",Fl\u00E4che:"Area","Fl\xE4che, Rand und Radius des Stils":"Surface, border and radius of the style",Form:"Shape","Form & CSS":"Shape & CSS",Format:"Format","Formatierung (Markdown)":"Formatting (Markdown)","Fortschritt %":"Progress %","Fortschritt (%)":"Progress (%)",Foto:"Photo",Fotoordner:"Photo folder",Fotos:"Photos","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"Photos app \u2192 share album \u2192 turn on \u201CPublic Website\u201D \u2192 copy link. Mixed with the folder.",Freundlich:"Friendly",Fu\u00DFnote:"Footnote","F\xE4hrt zur\xFCck":"Returning","F\xFCllen (zuschneiden)":"Fill (crop)","f\xFCllt das Feld":"fills the field","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"For the \u201CPause\u201D switch in HA; 0 = never","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"For advanced users: applies in the display; colours and spacing via --af-\u2026 variables.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':'For advanced users: applies within the page; widgets can be targeted via .cell[data-widget="id"].',"F\xFCr Tor, T\xFCrschloss & Co.":"For gates, door locks & co.","Ganz zeigen":"Show whole",ganztags:"all day","gar nicht zeigen":"don\u2019t show at all",Ged\u00E4mpft:"Muted","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) summarises weather, appointments, bins, power, car and house.","Gemini schreibt \u2026":"Gemini is writing \u2026",gerade:"just now","gerade eben":"just now","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"No device is connected to this display right now","Gerade l\xE4uft nichts":"Nothing playing right now",Ger\u00E4t:"Device","Ger\xE4t fertig":"Appliance done","Ger\xE4t fertig \u2192 Hinweis":"Appliance done \u2192 notice",Ger\u00E4te:"Appliances",Gespeichert:"Saved","Gespeichert \u2013 alle Displays zeigen es sofort.":"Saved \u2013 all displays show it right away.","gestern {time}":"yesterday {time}","Gestern, {date}":"Yesterday, {date}",Gewitter:"Thunderstorm","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Glass surfaces with light edges over soft colours","Glocke (kurz, hell)":"Bell (short, bright)",Gold:"Gold","Gong (warm, tief)":"Gong (warm, deep)",Gro\u00DF:"Large","gro\xDF (+15 %)":"large (+15 %)","Gro\xDFbild mit Schlagzeile":"Large picture with headline","Gruppen (YAML)":"Groups (YAML)","Gruppen zeigen jedes Lied nur einmal":"Groups show each song only once",Gr\u00F6\u00DFe:"Size","Gr\xF6\xDFe (%)":"Size (%)",gut:"good","Gut (gr\xFCn)":"Good (green)","Guten Morgen (KI-Zusammenfassung)":"Good morning (AI summary)","G\xE4ste-WLAN":"Guest Wi-Fi",g\u00FCnstig:"cheap","G\xFCnstigstes Fenster (h)":"Cheapest window (h)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 Media \u2192 Local media \u2192 folder \u201Cambiframe\u201D","HA-Dashboard \xF6ffnen":"Open HA dashboard","HA-Karte":"HA card",Hagel:"Hail",Halbkreis:"Half circle","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hamburg \u2013 Michel with harbour panorama (YouTube live picture)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hamburg \u2013 city (YouTube live picture)","Handy-Kamera auf den Code halten":"Point your phone camera at the code",Haustier:"Pet",Haust\u00FCr:"Front door","heizt auf {temp}\xB0":"heating to {temp}\xB0",Heizung:"Heating","Helfer umschalten":"Toggle helper",hell:"bright","Hell / Tinte":"Light / ink","Hell/Dunkel":"Light/dark","Hell/Dunkel & Schrift":"Light/dark & fonts","Helligkeit (Lux)":"Brightness (lux)","Hervorheben ab Tagen":"Highlight from days","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee and Walchensee (image)",Heute:"Today",heute:"today","Heute ab (Uhr)":"Today from (time)","heute Abend":"tonight","Heute Abend & morgen":"Tonight & tomorrow","Heute Abend rausstellen":"Put out tonight","Heute bis jetzt":"Today so far","Heute Nachmittag":"This afternoon","Heute {lo}\xB0 bis {hi}\xB0":"Today {lo}\xB0 to {hi}\xB0",Hintergrund:"Background",Hinweis:"Notice","Hinweis + Erinnerung (Ger\xE4te)":"Notice + reminder (appliances)",hoch:"high","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"high (muted text stronger)",Hochformat:"Portrait","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (image, MJPEG, .m3u8 or YouTube)",H\u00F6chstens:"At most","H\xF6chstens (s)":"At most (s)","H\xF6chstens Eintr\xE4ge":"At most entries",H\u00F6he:"Height","iCloud-Album":"iCloud album",Icon:"Icon","Immer dunkel":"Always dark","Immer hell":"Always light","Immer hoch":"Always portrait","Immer quer":"Always landscape","Import fehlgeschlagen: {error}":"Import failed: {error}",Importieren:"Import","Importierte Seite":"Imported page","In den Editor \xFCbernehmen":"Apply to editor","in den letzten \u2026 Minuten":"in the last \u2026 minutes","In der Ruhezeit":"During quiet hours","In der Station":"Docked","in {n} Tagen":"in {n} days","Info mit Kopfzeile":"Info with header",Infozeile:"Info line","Innen {temp}\xB0":"Inside {temp}\xB0","Innenabstand (px)":"Padding (px)",Innentemperatur:"Inside temperature","Ist M\xFCllkalender":"Is a bin calendar",Ja:"Yes",ja:"yes","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"Any card from the dashboard, e.g. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"any change (buttons, event.*)",jetzt:"now","Jetzt (gro\xDF)":"Now (large)","Jetzt erstellen":"Create now",Kalender:"Calendar","Kalt unter":"Cold below","Kalt unter \xB0C":"Cold below \xB0C",Kamera:"Camera","Kamera / Webcam":"Camera / webcam","Kamera als Hintergrund":"Camera as background",Karte:"Card","Karte (YAML)":"Card (YAML)","Karte mit 4 Stunden":"Card with 4 hours","Karte nicht ladbar: {error}":"Card could not be loaded: {error}","Karte unten rechts":"Card bottom right","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Card \u201C{type}\u201D (only visible in Home Assistant)",Karten:"Cards","Karten-Deckkraft (%)":"Card opacity (%)","kein Ausl\xF6ser":"no trigger","Kein Display konfiguriert":"No display configured","Kein Display.":"No display.","Kein Regen bis {h} Uhr":"No rain until {h}:00","kein Stil gefunden":"no style found","kein Ton":"no sound",keine:"none","Keine Bewegung in letzter Zeit":"No recent motion","Keine Karte konfiguriert":"No card configured","Keine Preisdaten":"No price data","keine Seite":"no page","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"No page recognised (\u201Cwidgets\u201D missing).","keine Seite sichtbar":"no page visible","Keine Termine in den n\xE4chsten Tagen":"No appointments in the next few days","Keine von \u2026 (nicht)":"None of \u2026 (not)","Keine Warnungen":"No warnings","Keiner gew\xE4hlt = alle":"None selected = all","KI-Zusammenfassung":"AI summary",Klar:"Clear","klein (Kopfzeile)":"small (header)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Small at the bottom right, e.g. \u201CCuxhaven\u201D","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Smaller text (labels, lists, details) \u2013 for reading from a distance","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Click into the field for the built-in sounds \u2013 or a link (/local/sound.mp3). On the tablet via Fully.",Klingel:"Doorbell","Klingel \u2192 Vollbild":"Doorbell \u2192 fullscreen","Knapp, nur Fakten":"Brief, facts only",Kontrast:"Contrast",Kopieren:"Copy","Kopieren (\u2318C)":"Copy (\u2318C)",Kosten:"Cost","Kosten-Sensor":"Cost sensor","K\xFChl (blau)":"Cool (blue)","K\xFCrzlich ge\xE4ndert":"Recently changed",Ladeleistung:"Charging power",Ladelimit:"Charge limit","Ladelimit {n} %":"Charge limit {n} %",langsam:"slow",Laufband:"Ticker","Laufende Ger\xE4te":"Running appliances","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Empty = all bin sensors (\u2026_days) automatically","Leer = automatisch suchen":"Empty = search automatically","Leer = Farbe des Stils":"Empty = style colour","Leere Seite":"Empty page",Leise:"Quiet",Leistung:"Power","Leistung (W)":"Power (W)","Letzte Tage":"Last days","Licht umschalten":"Toggle light","Lichter an":"Lights on",Lichtschimmer:"Shimmer",Linie:"Line",links:"left","Liquid Glass":"Liquid Glass",Liste:"List","Liste mit Vorschaubildern":"List with thumbnails",Live:"Live","Lovelace-Karte (YAML)":"Lovelace card (YAML)",Luftfeuchte:"Humidity","Luftfeuchte (Raum)":"Humidity (room)","Luftqualit\xE4t (AQI)":"Air quality (AQI)",L\u00E4dt:"Charging","L\xE4dt in der Station":"Charging in the dock","L\xE4dt \u2026":"Loading \u2026","L\xE4uft gerade":"Now playing","L\xE4uft-Entit\xE4t":"Running entity",L\u00F6schen:"Delete",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 or washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Several webcams in turn",Melder:"Sensor",Meldungen:"Items","Mindestens (s)":"At least (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"At least one person (person.*) is \u201Chome\u201D.","Mindestens eine von \u2026 (oder)":"At least one of \u2026 (or)",Minimal:"Minimal",Minimum:"Minimum",mittel:"medium",mittig:"centre","Mo., 12. Okt.":"Mon, 12 Oct",Modus:"Mode","Montag, 12. Oktober":"Monday, 12 October",Morgen:"Tomorrow",morgen:"tomorrow","Morgen anzeigen":"Show tomorrow",Musik:"Music","Musik \u2192 Cover":"Music \u2192 cover","Musik-Cover":"Music cover","Musik-Cover (bei Liedwechsel)":"Music cover (on song change)",m\u00E4\u00DFig:"moderate",M\u00FCll:"Bins","M\xFCll zeigen ab Tagen":"Show bins from days",M\u00FCllabfuhr:"Bin collection",M\u00FCllkalender:"Bin calendar",M\u00FClltonnen:"Bins","M\xFClltonnen (im Wechsel)":"Bins (rotating)","M\xFCnchen \u2013 Panorama (Bild)":"Munich \u2013 panorama (image)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Don\u2019t show again for this long after it ends.","nach oben":"move up","nach unten":"move down",Nachkommastellen:"Decimals","Nachlauf (s)":"Hold after (s)",Nachrichten:"News","Nachrichten werden geladen \u2026":"Loading news \u2026",Nacht:"Night","Nacht (gedimmt)":"Night (dimmed)","Nacht, wenn an":"Night when on",Nachtseite:"Night page",Name:"Name","Name der Seitenvorlage":"Page template name","Name der Vorlage":"Template name","Name des Auftrags":"Job name","Name des Players":"Player name","Name, z. B. Herbst":"Name, e.g. Autumn",Nebel:"Fog",nein:"no","Netzname (SSID)":"Network name (SSID)","Netzname und Passwort im Editor eintragen.":"Enter network name and password in the editor.","Neu laden":"Reload","Neu laden alle (s)":"Reload every (s)","Neue Seite":"New page","Neues Display":"New display","Neustart nach (s)":"Restart after (s)","Neustart-Taste":"Restart button",nicht:"not","nicht in Wiedergabe":"not in playlist","nicht zeigen":"don\u2019t show","Nichts l\xE4uft gerade":"Nothing running right now","Nichts offen, nichts l\xE4uft":"Nothing open, nothing running",nie:"never",niedrig:"low",Noch:"Remaining","Noch keine Daten im Zeitraum":"No data in this period yet","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"No styles of your own yet \u2013 set up style, colours and fonts and save them here.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"No page yet \u2013 \u201C+ New\u201D above.","Noch keine Statistik im Zeitraum":"No statistics in this period yet","Noch keine Werte f\xFCr diesen Tag.":"No values for this day yet.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"No summary yet \u2013 it is created at the set times.","noch {n} kWh":"{n} kWh to go","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 harbour and Wadden Sea (YouTube live picture)",Normal:"Normal",normal:"normal","normal (ruhig)":"normal (calm)",Notfallmodus:"Safe mode","Nur anzeigen wenn \u2026":"Only show when \u2026","Nur auf Display \u2026":"Only on display \u2026","nur auf {names}":"only on {names}","Nur diese Ereignistypen":"Only these event types","nur Hochformat":"portrait only","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Browser only \u2013 Fully uses the tablet\u2019s media volume.","Nur im Hoch-/Querformat":"Only in portrait/landscape","Nur offene listen":"List only open ones","nur Querformat":"landscape only","Nur wenn au\xDFerdem \u2026":"Only if also \u2026","Nur wenn in Tagen":"Only if within days","Nur wenn jemand zu Hause ist":"Only when someone is home","Nur zeigen bis Tage":"Only show up to days","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Only show at certain times or conditions","N\xE4chste Stunden":"Next hours","N\xE4chste Tage":"Next days",oben:"top","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Upper limit, even if a sensor stays on.",oder:"or",Offen:"Open",offen:"open","Offene Fenster & T\xFCren":"Open windows & doors","Ohne Rahmen":"Without frame","ohne Ton zeigen":"show without sound","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Optional \u2013 otherwise from the Tibber history.","Ort / Zusatz":"Place / extra","Ort zeigen":"Show place",Ortsangabe:"Location",Ortsname:"Place name",Passwort:"Password","Passwort zus\xE4tzlich als Text":"Also show password as text","Pause endet nach (min)":"Pause ends after (min)",Pausiert:"Paused",pausiert:"paused","per Link (?safe=1)":"via link (?safe=1)",Person:"Person","Person, image.*, Kamera, Medienplayer \u2026":"Person, image.*, camera, media player \u2026",Personen:"People",Player:"Player",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up with HA card","Prognose heute (kWh)":"Forecast today (kWh)","Prognose heute {n} kWh":"Forecast today {n} kWh","Prognose Rest (kWh)":"Forecast remaining (kWh)",Quelle:"Source",Quellen:"Sources",Querformat:"Landscape",Rahmen:"Frame",Raum:"Room",Rausstellen:"Put out",rechts:"right",Regen:"Rain","Regen ab %":"Rain from %","Regen ab {h} Uhr":"Rain from {h}:00","Regen an/aus":"Rain on/off","Regen-Vorschau":"Rain preview",Regensensor:"Rain sensor",Regnet:"Raining",Reichweite:"Range","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 beach (YouTube live picture)",Restzeit:"Time remaining",Ring:"Ring",Rollladen:"Blind","Rollladen/Tor umschalten":"Toggle blind/gate",Rolll\u00E4den:"Blinds","Ruhezeit ab":"Quiet hours from","Ruhezeit bis":"Quiet hours until",Ruhig:"Calm","Ruhig flie\xDFende Farben wie Nordlicht":"Gently flowing colours like northern lights",R\u00E4ume:"Rooms","R\xFCckg\xE4ngig (\u2318Z)":"Undo (\u2318Z)",Sauger:"Vacuum",Saugroboter:"Robot vacuum",Saugt:"Cleaning",Schicht:"Layer","Schichten gesamt":"Total layers",Schieben:"Slide",Schlicht:"Plain","Schlie\xDFt nach (s)":"Closes after (s)",Schloss:"Lock",Schnee:"Snow",Schneeregen:"Sleet",Schrift:"Font","Schrift des Stils":"Style font","Schrift Text":"Text font","Schrift Uhr & Titel":"Clock & title font",Schriftfarbe:"Text colour",Schriftgr\u00F6\u00DFe:"Font size","Schriftgr\xF6\xDFe Punkte (px)":"Bullet font size (px)","Schwebende Partikel":"Floating particles","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Swiss style: clear type, high contrast, typography only","sehr gro\xDF (+30 %)":"very large (+30 %)","sehr hoch":"very high","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Very calm; off at night. Can be changed per page.","seit {time}":"since {time}",Seite:"Page","Seite importieren \u2026":"Import page \u2026","Seite in die Wiedergabe":"Page to playlist","Seite unten als YAML \u2013 zum Kopieren markieren.":"Page below as YAML \u2013 select it to copy.","Seite zeigen":"Show page","Seite zeigen (z. B. bei Bewegung)":"Show page (e.g. on motion)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Page \u201C{name}\u201D copied as YAML \u2013 paste it elsewhere with \u201C+ New \u2192 Import page\u201D or \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Page \u201C{name}\u201D created \u2013 adjust page IDs in actions if needed.","Seite \u201E{name}\u201C l\xF6schen?":"Delete page \u201C{name}\u201D?",Seiten:"Pages","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Page template \u201C{name}\u201D saved \u2013 under \u201C+ New\u201D.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Delete page template \u201C{name}\u201D?",Seitenwechsel:"Page change",Sekunden:"Seconds","Selbst ausw\xE4hlen":"Choose myself",Senkrecht:"Vertical",Sensor:"Sensor","Serifen-Uhr, warmes Wei\xDF, Bambus":"Serif clock, warm white, bamboo",Sichtbarkeit:"Visibility","Skript starten":"Run script","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"How long the display stays after the trigger is off again.",Sonnig:"Sunny",sonnig:"sunny",Spalte:"Column",Spalten:"Columns",Speichern:"Save","Speichert \u2026":"Saving \u2026",Sprache:"Language",Standard:"Default",Standbild:"Still image","Standbild neu laden (s)":"Reload still image (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"StandBy style, plain, sage",Standort:"Location",Starkregen:"Heavy rain","startet immer wieder neu":"keeps restarting","Startkonfiguration anzeigen":"Show starter configuration",Status:"Status","Steht drau\xDFen":"Out","Steht zuhause":"Parked at home",Stil:"Style","Stil als YAML in die Zwischenablage kopiert.":"Style copied to the clipboard as YAML.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Style below as YAML \u2013 select it to copy.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Style applied \u2013 make it permanent with \u201CSave\u201D.","Stil-Farbe":"Style colour","Stil-Schrift":"Style font",Strompreis:"Electricity price","Strompreis heute":"Electricity price today","Stufe hinzuf\xFCgen":"Add step",Stunde:"Hour",Stunden:"Hours","Stunden-Kurve":"Hourly curve",St\u00E4rke:"Strength",St\u00F6rung:"Error","Szene aktivieren":"Activate scene",Tag:"Day",Tage:"Days","Tage bis Abholung":"Days until collection","Tage voraus":"Days ahead","Tage-Sensor":"Days sensor",Tagesbilanz:"Daily summary",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau or https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 or the address of an RSS feed",Teil:"Part",Teile:"Parts","Teils bew\xF6lkt":"Partly cloudy",Temperatur:"Temperature",Temperaturen:"Temperatures",Tempo:"Speed","Tempo (px/s)":"Speed (px/s)",Termin:"Appointment","Termin in den n\xE4chsten Tagen":"Appointment in the next days",Termine:"Appointments",Testen:"Test",teuer:"expensive",Text:"Text","Text & Vorlage":"Text & template","Text aus Entit\xE4t":"Text from entity","Text danach":"Text afterwards","Text ohne Warnung":"Text without warning","Text wenn alles ruhig":"Text when all is quiet","Text wenn nichts l\xE4uft":"Text when nothing is running",Textgr\u00F6\u00DFe:"Text size","Tibber-Zuhause":"Tibber home","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Tip: click a widget to edit it.","Tippen zum Schlie\xDFen":"Tap to close",Titel:"Title","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau in the Black Forest \u2013 village and Hasenhorn (image)",Ton:"Sound",Tonne:"Bin",Tonnen:"Bins","Tonnen der n\xE4chsten \u2026 Tage":"Bins of the next \u2026 days",Trocken:"Dry",trocken:"dry","Trocken ab etwa {h} Uhr":"Dry from about {h}:00",Uhr:"Clock","Uhrzeit von \u2013 bis":"Time from \u2013 to","Uhrzeit {from}\u2013{to}":"Time {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Times separated by commas; each is one request to the AI.",Umwelt:"Environment",und:"and",ungesund:"unhealthy",unten:"bottom",unter:"below",Unterwegs:"Away",Unterzeile:"Subline",Unwetter:"Severe weather","UV-Index":"UV index",Verbrauch:"Consumption",Verlauf:"History","Verlauf (Tage)":"History (days)","Verlauf nicht verf\xFCgbar":"History not available","Verlauf wird geladen \u2026":"Loading history \u2026",Verriegelt:"Locked",Verschl\u00FCsselung:"Encryption","Verstecktes Netz":"Hidden network",Verwerfen:"Discard","Voll um":"Full at","voll um {time}":"full at {time}",Vollbild:"Fullscreen","Vollbild (Klingel, Alarm)":"Fullscreen (doorbell, alarm)","von Zustand":"from state","von {n} geschlossen":"of {n} closed","vor {n} h":"{n} h ago","vor {n} min":"{n} min ago","Vorher nachfragen":"Ask first","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Previous version loaded \u2013 restore it with \u201CApply to editor\u201D and \u201CSave\u201D.","Vorherige Fassung laden":"Load previous version",Vorlage:"Template","Vorlage (Jinja)":"Template (Jinja)","Vorlage l\xF6schen":"Delete template","Vorlage nicht verf\xFCgbar":"Template not available","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Template \u201C{name}\u201D saved \u2013 under \u201CYour templates\u201D.","Vorlage \u201E{name}\u201C l\xF6schen?":"Delete template \u201C{name}\u201D?",Vorschau:"Preview","Vorschau (schnell)":"Preview (fast)",Waagerecht:"Horizontal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe is not reachable: {error}","Ambiframe nicht erreichbar":"Ambiframe not reachable","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 safe mode","Wann?":"When?","Warm \xFCber \xB0C":"Warm above \xB0C","Warn-Sensoren":"Warning sensors",Warnung:"Warning","Warnung (rot)":"Warning (red)","Warnung \u2192 Vollbild":"Warning \u2192 fullscreen",Warnungen:"Warnings","Waschmaschine fertig":"Washing machine done",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Add webcam","Webcam-Link":"Webcam link","Wechsel nach (s)":"Change after (s)","Weich (Unsch\xE4rfe)":"Soft (blur)","Weiter geht's":"Resuming","Weitere Ausl\xF6ser":"More triggers","Weitere Werte":"More values","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"White and gold \u2013 dark on black, light on ivory","Welches Display ist das?":"Which display is this?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein east (image, every 10 min)","Wenn Ordner und Album leer sind":"If folder and album are empty",Wert:"Value","Wert wird blau, wenn er darunter liegt.":"Value turns blue when below.","Werte-Liste":"Value list",Wetter:"Weather","Wetter-Entit\xE4t fehlt":"Weather entity missing","Widget hinzuf\xFCgen:":"Add widget:","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget copied \u2013 paste it on a page with \u2318V or \u201CPaste\u201D.","Widget kopiert.":"Widget copied.","wie der Stil":"like the style","wie Design":"like design","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Like a magazine: large serifs, paper, fine lines","wie oben":"as above","wie Stil":"like style",Wiedergabe:"Playback","Wiedergabe anhalten/fortsetzen":"Pause/resume playback","Wiedergabe/Pause":"Play/pause",Wiedergabeliste:"Playlist","Wiederholen (\u21E7\u2318Z)":"Redo (\u21E7\u2318Z)",Wind:"Wind",Windig:"Windy","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Pressed when the display stops reporting \u2013 e.g. Fully \u201CLoad start URL\u201D.","Wird geladen \u2026":"Loading \u2026","Wird heute abgeholt":"Collected today","WLAN-QR-Code":"Wi-Fi QR code","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"Show again during playback; empty or 0 = only on song change","W\xE4sche fertig":"Laundry done","YAML ist nicht lesbar: {error}":"YAML cannot be read: {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"e.g. litter box visits, resets daily","z. B. KI-Analyse der Kamera":"e.g. AI analysis of the camera","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"e.g. AI description or warning headline","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"e.g. several motion sensors \u2013 one is enough","z. B. type: entities, entities: [light.kueche]":"e.g. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"E.g. time 05:00\u201311:00 for a morning page. The page\u2019s own condition applies as well.","z. B. \u201EGeocoded Location\u201C der Companion-App":"e.g. \u201CGeocoded Location\u201D of the companion app","Zahl \xFCber/unter":"Number above/below",Zeile:"Row",Zeilen:"Rows","Zeitraum (min)":"Period (min)","Zeitraum (Stunden)":"Period (hours)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Dragging or arrow keys move all of them together. \u21E7/\u2318-click removes one, Esc clears the selection.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Drag to move \xB7 dot bottom right to resize \xB7 arrow keys move, with \u21E7 resize \xB7 \u21E7/\u2318-click selects several \xB7 \u2318C/\u2318V copy and paste \xB7 \u232B deletes \xB7 \u2318D duplicates \xB7 \u2318Z undo","Ziel-Entit\xE4t":"Target entity",Zoom:"Zoom",zu:"closed","zu feucht":"too humid","zu Zustand":"to state","zu Zustand (optional)":"to state (optional)","Zugspitze (Bild, alle 10 min)":"Zugspitze (image, every 10 min)",Zuhause:"Home","Zuletzt fertig {when}":"Last finished {when}","zuletzt {time}":"last {time}","Zur\xFCck nach (s)":"Return after (s)","Zur\xFCck zu Ambiframe":"Back to Ambiframe",Zusammenfassung:"Summary",Zusatzwert:"Extra value","Zusatzwert Name":"Extra value name",Zustand:"State","Zustand ist":"State is","Zustand ist nicht":"State is not","Zwischendurch alle (min)":"In between every (min)",z\u00E4hlen:"count","Z\xE4hler \u201Eheute\u201C":"\u201CToday\u201D counter","{day} Abend":"{day} evening","{entity} ge\xE4ndert ({n} min)":"{entity} changed ({n} min)","{entity} in {n} Tagen":"{entity} in {n} days","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} running","{name} offen":"{name} open","{name} \u2013 wirklich?":"{name} \u2013 really?","{n} % aus eigener Sonne":"{n} % from own solar","{n} % Wahrscheinlichkeit":"{n} % probability","{n} Lichter an":"{n} lights on","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets selected","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets copied \u2013 paste them on a page with \u2318V or \u201CPaste\u201D.","{n} Widgets kopiert.":"{n} widgets copied.","{time} Uhr":"{time}","\xE4ltere Version":"older version","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Public camera instead of HA camera \u2013 suggestions by clicking into the field",\u00D6ffnen:"Open","\xD8 {n} pro Tag":"\xD8 {n} per day",\u00FCber:"above",\u00DCberblenden:"Crossfade",\u00DCberblick:"Overview",\u00DCbergang:"Transition","\xDCbergang (s)":"Transition (s)",\u00FCbermorgen:"day after tomorrow",\u00DCbernehmen:"Apply","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Applied \u2013 make it permanent with \u201CSave\u201D.",\u00DCberschrift:"Heading","\xDCberschrift klein":"Small heading","\u2013 w\xE4hlen \u2013":"\u2013 choose \u2013","\u2026 aus Attribut":"\u2026 from attribute","\u2026 oder Bild einer Entit\xE4t":"\u2026 or picture of an entity","\u2026 oder Webcam-Link":"\u2026 or webcam link",Fran\u00E7ais:"Fran\xE7ais","Le Figaro (FR)":"Le Figaro (FR)","Le Monde (FR)":"Le Monde (FR)","NOS (NL)":"NOS (NL)","NU.nl (NL)":"NU.nl (NL)",Nederlands:"Nederlands","RFI (FR)":"RFI (FR)","VRT NWS (BE)":"VRT NWS (BE)","franceinfo (FR)":"franceinfo (FR)","{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.":"{names}: own light/dark setting \u2013 it applies there.","F\xFCr alle \xFCbernehmen":"Apply to all","{names}: eigener Stil \u2013 dort gilt dieser.":"{names}: own style \u2013 it applies there.","Kamera wird verbunden \u2026":"Connecting camera \u2026",Abdunkeln:"Darken","normal \u2013 Text gut lesbar":"normal \u2013 text easy to read",leicht:"light",kr\u00E4ftig:"strong","aus \u2013 Originalbild":"off \u2013 original picture","Dunkler Verlauf unten links, damit Uhr und Text auf hellen Bildern lesbar bleiben.":"Dark gradient at the bottom left so the clock and text stay readable on bright pictures.","0\u20133 (DWD)":"0\u20133 (DWD)",Abfahrten:"Departures","Abfahrten, die nicht mehr erreichbar sind, ausblenden":"Hide departures you can no longer catch","Alles im gr\xFCnen Bereich":"All good","Attribut mit der Liste":"Attribute with the list","Ausblenden nach (Stunden)":"Hide after (hours)","Bildwechsel (ms)":"Frame interval (ms)",Countdown:"Countdown","Datum-Helfer, Zeitstempel oder Kalender (n\xE4chster Termin)":"Date helper, timestamp or calendar (next event)","Eigene Karte (Adresse)":"Custom map (URL)",Ereignis:"Event",Farbig:"Colourful","Feinstaub PM10":"Particulates PM10","Feinstaub PM2,5":"Particulates PM2.5","Fu\xDFweg (Minuten)":"Walk to stop (minutes)","Gleis zeigen":"Show platform","Gleis {n}":"Platform {n}","Kein Ort \u2013 Zuhause in HA eintragen oder Breite/L\xE4nge angeben.":"No location \u2013 set your home in HA or enter latitude/longitude.","Kein Timer gefunden \u2013 in HA unter Helfer einen Timer anlegen.":"No timer found \u2013 create one in HA under Helpers.","Kein Timer l\xE4uft":"No timer running","Keine Abfahrten":"No departures","Keine Nachrichten":"No messages","Keine Pollen- oder Luftsensoren gefunden.":"No pollen or air quality sensors found.","Keinen \xD6PNV-Sensor gefunden \u2013 unter Sensoren eintragen.":"No public transport sensor found \u2013 add one under Sensors.","Kn\xF6pfe zum Starten, durch Komma getrennt \u2013 leer lassen f\xFCr keine":"Start buttons, comma separated \u2013 leave empty for none",Land:"Country","Leer = Textspeicher mit \u201Epinnwand\u201C, \u201Enachricht\u201C oder \u201Enotiz\u201C im Namen":"Empty = text helpers with \u201Cboard\u201D, \u201Cmessage\u201D or \u201Cnote\u201D in their name","Leer = alle Timer aus HA (Helfer \u2192 Timer)":"Empty = all timers in HA (Helpers \u2192 Timer)",Luftqualit\u00E4tsindex:"Air quality index",L\u00E4nge:"Longitude",Nah:"Close","Nichts geplant":"Nothing planned","Nur Mond":"Moon only","Nur Sonne":"Sun only","Nur diese Linien":"Only these lines","Nur erh\xF6hte Werte":"Only elevated levels","Oder unten eine Entit\xE4t w\xE4hlen":"Or choose an entity below",Ozon:"Ozone",Pinnwand:"Notice board",Pollen:"Pollen","Pollen & Luft":"Pollen & air","Pollen-Skala":"Pollen scale",Regenradar:"Rain radar",Region:"Region","Ruhende Timer zeigen":"Show idle timers","Schnellstart (Minuten)":"Quick start (minutes)","Schnellstart startet":"Quick start uses","Schriftgr\xF6\xDFe (px)":"Font size (px)",Sensoren:"Sensors","Sonne & Mond":"Sun & moon","Sonne und Mond":"Sun and moon",Stickstoffdioxid:"Nitrogen dioxide",Symbol:"Icon","Tage bis":"days until","Text ohne Nachricht":"Text when empty",Timer:"Timer",Umgebung:"Area",Urlaub:"Holiday","Vergangene zeigen":"Show past","Vollmond {when}":"Full moon {when}","Von einer \xD6PNV-Integration (z. B. HAFAS, DB, Wiener Linien) \u2013 leer = automatisch":"From a public transport integration (e.g. HAFAS, DB, Wiener Linien) \u2013 empty = automatic",bereit:"ready","erster Timer":"first timer","noch {n} Tage":"{n} days to go","noch {n} Wochen":"{n} weeks to go","vor {n} Tagen":"{n} days ago","wie gestern":"same as yesterday","{h} h {m} min Tageslicht":"{h} h {m} min of daylight","{n} % beleuchtet":"{n}% illuminated","{n} min":"{n} min","{n} min zu gestern":"{n} min vs. yesterday",Neumond:"New moon","Zunehmende Sichel":"Waxing crescent","Erstes Viertel":"First quarter","Zunehmender Mond":"Waxing gibbous",Vollmond:"Full moon","Abnehmender Mond":"Waning gibbous","Letztes Viertel":"Last quarter","Abnehmende Sichel":"Waning crescent",gering:"low",schlecht:"poor","sehr schlecht":"very poor","Benachrichtigung in Home Assistant, wenn sich das Display so lange nicht meldet \u2013 verschwindet von selbst, sobald es wieder da ist. Ausgeschalteter Bildschirm z\xE4hlt nicht.":"Notification in Home Assistant when the display hasn\u2019t checked in for this long \u2013 disappears by itself once it\u2019s back. A screen that\u2019s switched off doesn\u2019t count.","Melden, wenn offline (Minuten)":"Notify when offline (minutes)","Nur aktuell":"Current only",Zeitraum:"Time span"};var ms={"% Luftfeuchte":"% d'humidit\xE9","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = \xE0 chaque changement \u2013 p. ex. pour les boutons et les entit\xE9s event.*","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = image en direct","1 Licht an":"1 lumi\xE8re allum\xE9e","12 / Vollbild 15":"12 / plein \xE9cran 15","168 = eine Woche, 720 = 30 Tage":"168 = une semaine, 720 = 30 jours",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"\xE0 partir de","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"Depuis le dernier d\xE9clenchement ; tant qu'un capteur est actif, la page reste de toute fa\xE7on.","ab Wert":"\xE0 partir de la valeur","ab {n}":"\xE0 partir de {n}",Abbrechen:"Annuler",Abendstimmung:"Ambiance du soir",Abholung:"Collecte","Abholung {when}":"Collecte {when}","Abklingzeit (s)":"D\xE9lai de r\xE9pit (s)","Achse bis":"Axe jusqu'\xE0","Achse von":"Axe \xE0 partir de",Akku:"Batterie","Akku %":"Batterie %",Aktion:"Action","Aktion (domain.dienst)":"Action (domain.service)","Aktion/Skript ausf\xFChren":"Ex\xE9cuter une action/un script",Aktiv:"Actif","Aktuellen Stil speichern":"Enregistrer le style actuel","Aktuellen Wert zeigen":"Afficher la valeur actuelle","Aktueller Preis":"Prix actuel","Aktueller Raum":"Pi\xE8ce actuelle",Akzent:"Accent","Akzent (Gold)":"Accent (or)",Akzentfarbe:"Couleur d'accent","Alarm (eindringlich, wiederholt)":"Alarme (insistante, r\xE9p\xE9t\xE9e)","Alle Bewegungs-/Pr\xE4senzmelder":"Tous les d\xE9tecteurs de mouvement/pr\xE9sence","Alle Fenster- und T\xFCrsensoren":"Tous les capteurs de fen\xEAtres et de portes","Alle von \u2026 (und)":"Tous \u2026 (et)","Alles ruhig":"Tout est calme","Als eigene Seitenvorlage speichern":"Enregistrer comme mod\xE8le de page","Als eigene Vorlage speichern":"Enregistrer comme mod\xE8le","Als Karte":"En carte","Als Vorlage":"Comme mod\xE8le","Als YAML kopieren":"Copier en YAML","Am g\xFCnstigsten":"Le moins cher","am {day}":"{day}",An:"Allum\xE9",an:"allum\xE9","An/Aus":"Marche/arr\xEAt",Angehalten:"En pause",Angesteckt:"Branch\xE9",Animation:"Animation",Antippen:"Toucher",Anwenden:"Appliquer","Anzeige (Ring)":"Jauge (anneau)","Anzeige, Editor und KI-Zusammenfassung":"Affichage, \xE9diteur et r\xE9sum\xE9 IA",Anzeigefehler:"erreur d'affichage",Art:"Type",Attribut:"Attribut","Attribut (optional)":"Attribut (facultatif)","Auch nachts":"Aussi la nuit","Auch pausiert zeigen":"Afficher aussi en pause","Auf dem Ger\xE4t \xF6ffnen":"Ouvrir sur l'appareil",Auftrag:"T\xE2che","Auftrag/Druck":"T\xE2che/impression",Aurora:"Aurora",Aus:"\xC9teint",aus:"\xE9teint","aus Home Assistant eingeschaltet":"activ\xE9 depuis Home Assistant",Ausl\u00F6ser:"D\xE9clencheur",Ausnehmen:"Exclure",Ausrichtung:"Orientation",Auto:"Voiture",automatisch:"automatique","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatique (selon l'appareil, aussi en rotation)","automatisch (wie der HA-Benutzer)":"automatique (comme l'utilisateur HA)","Automatisch anordnen":"Disposer automatiquement","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Empil\xE9 automatiquement \u2013 d\xE9placer cr\xE9e votre propre disposition","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatique \u2013 clair le jour, sombre apr\xE8s le coucher du soleil","automatisch: Gemini":"automatique : Gemini",Balken:"Barres",Bedienmodus:"Mode commande","1 Woche":"1 semaine","12 Stunden":"12 heures","2 Tage":"2 jours","24 Stunden":"24 heures","6 Stunden":"6 heures",Gestern:"Hier","Keine Mitteilungen":"Aucune notification",Mitteilungen:"Notifications","Mitteilungen ({n})":"Notifications ({n})",Mitteilungszentrale:"Centre de notifications","Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C.":"Historique des \xE9v\xE9nements \u2013 dans le menu rapide (appui long) sous \xAB Notifications \xBB.","Verlauf leeren":"Effacer l'historique","Verlauf reicht zur\xFCck":"Historique sur","0 = bei Pause sofort ausblenden":"0 = masquer imm\xE9diatement en pause","1 Stunde":"1 heure","1 Tag":"1 jour","15 Minuten":"15 minutes","2 Erinnerungen":"2 rappels","2 Stunden":"2 heures","3 Erinnerungen":"3 rappels","30 Minuten":"30 minutes","4 Erinnerungen":"4 rappels","4 Stunden":"4 heures","5 Erinnerungen":"5 rappels","8 Stunden":"8 heures","Alle entfernen":"Tout effacer","Ausblenden nach (s)":"Masquer apr\xE8s (s)","Cover zeigen":"Afficher la pochette",Ecke:"Coin","Erinnerung oben rechts":"Rappel en haut \xE0 droite","Erinnerungen oben rechts":"Rappels en haut \xE0 droite","Fortschritt zeigen":"Afficher la progression","Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft.":"Par titre : masquer apr\xE8s ce nombre de secondes, r\xE9afficher au titre suivant. Vide = tant que quelque chose joue.","Nach Pause noch (s)":"Encore apr\xE8s la pause (s)","Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht.":"Apr\xE8s la notification, un petit rappel reste en haut \xE0 droite \u2013 en permanence, un moment ou pas du tout.","Stapeln ab":"Empiler \xE0 partir de","Weg, wenn das Ger\xE4t wieder startet":"Dispara\xEEt quand l'appareil red\xE9marre","Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf.":"Comme les notifications sur iOS : une pile avec un nombre, touchez pour la d\xE9plier.","Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt.":"P. ex. le lave-linge red\xE9marre \u2013 l'ancien rappel est alors r\xE9gl\xE9.","Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis":"P. ex. \xAB Lessive termin\xE9e \xBB apr\xE8s une notification","bleibt, bis man sie antippt":"reste jusqu'\xE0 ce qu'on le touche",dauerhaft:"permanent",gro\u00DF:"grand","keine Erinnerung":"pas de rappel",klein:"petit","nie stapeln":"ne jamais empiler","oben links":"en haut \xE0 gauche","oben rechts":"en haut \xE0 droite","ohne (nur Text und Cover)":"aucun (texte et pochette uniquement)","unten links":"en bas \xE0 gauche","unten rechts":"en bas \xE0 droite","+ Ton hinzuf\xFCgen":"+ Ajouter un son","Abstand (s)":"Intervalle (s)","Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.":"T\xE9l\xE9versez un fichier audio dans HA sous M\xE9dias \u2192 M\xE9dias locaux et choisissez-le ici \u2013 ou saisissez un lien. Le son est ensuite disponible pour chaque \xE9v\xE9nement.","Eigene T\xF6ne":"Sons personnels","Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.":"Cliquez dans le champ pour les sons personnels et int\xE9gr\xE9s \u2013 ou saisissez un lien (/local/son.mp3, media-source://\u2026). Ajoutez vos sons \xE0 gauche sous \xAB Sons personnels \xBB.","Mein Ton":"Mon son",Wiederholen:"R\xE9p\xE9ter","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)":"jusqu'\xE0 ce qu'on touche ou ferme (2 min max.)","eigener Ton":"son personnel",einmal:"une fois","einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)":"une fois (le son \xAB Alarme \xBB se r\xE9p\xE8te en plein \xE9cran jusqu'\xE0 ce qu'on le touche)","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australie","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Images et l\xE9gendes des images Bing du jour","Bing-Region":"R\xE9gion Bing",Brasil:"Br\xE9sil","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Allemagne","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"Un \xAB article du jour \xBB n'existe que dans ces langues.",Espa\u00F1a:"Espagne","FAZ (DE)":"FAZ (DE)",France:"France","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"Dans le flux vid\xE9o (AirPlay, cam\xE9ra), le bandeau d\xE9filant est toujours d\xE9sactiv\xE9 \u2013 il s'y figerait ou saccaderait.",India:"Inde",Italia:"Italie","NPR (US)":"NPR (US)","Nachrichten-Laufband":"Bandeau d'actualit\xE9s",Nederland:"Pays-Bas","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Suisse","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"Royaume-Uni","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Choisissez une suggestion (p. ex. bbc, guardian, tagesschau) ou saisissez l'adresse de n'importe quel flux RSS/Atom. Vide = sources dans la langue de l'affichage.","Wikipedia-Sprache":"Langue de Wikip\xE9dia","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 allemand, citation de la semaine","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 anglais, citation du jour","automatisch (aus beim Fernseher)":"automatique (d\xE9sactiv\xE9 sur les t\xE9l\xE9viseurs)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 ou https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"comme l'affichage","wie die Sprache von Home Assistant":"selon la langue de Home Assistant",\u00D6sterreich:"Autriche","wie alle":"comme tous",Automatisch:"Automatique",Hell:"Clair",Dunkel:"Sombre","Zitat der Woche":"Citation de la semaine",Zitat:"Citation","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Citation : en allemand la citation de la semaine (Wikiquote), en anglais la citation du jour (ZenQuotes)","+ Neu":"+ Nouveau",Quer:"Paysage",Hoch:"Portrait","Eigene Farben zur\xFCcksetzen":"R\xE9initialiser les couleurs personnelles","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"Pas encore d'\xE9v\xE9nements \u2013 \xAB + Nouveau \xBB ci-dessus.","1 Hinweis":"1 remarque","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Images Bing du jour aussi entre vos propres photos","nein \u2013 nur, wenn nichts Eigenes da ist":"non \u2013 seulement s'il n'y a pas de photos personnelles","Bing-Bilder untermischen":"M\xE9langer les images Bing","Jetzt: {what} bis {time}":"Maintenant : {what} jusqu'\xE0 {time}","Termine der n\xE4chsten \u2026 Stunden":"Rendez-vous dans les \u2026 prochaines heures","N\xE4chster Termin":"Prochain rendez-vous","Guten Morgen":"Bonjour","Leer = die ersten Kalender automatisch":"Vide = premiers calendriers automatiquement","Guten Abend":"Bonsoir","Guten Tag":"Bon apr\xE8s-midi","Keine Abholung":"Pas de collecte","Regenrisiko {n} %":"Risque de pluie {n} %","Regen ab etwa {time} Uhr":"Pluie \xE0 partir de {time} environ","Wetter heute":"M\xE9t\xE9o du jour","Heute keine Termine":"Pas de rendez-vous aujourd'hui","Termine heute":"Rendez-vous du jour","Tagesvorschau am Morgen":"Aper\xE7u de la journ\xE9e le matin",Tagesvorschau:"Aper\xE7u de la journ\xE9e","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Cr\xE9e l'interrupteur \xAB Sur la t\xE9l\xE9vision \xBB \u2013 envoie l'affichage \xE0 l'Apple TV via AirPlay","Fernseher (Apple TV)":"T\xE9l\xE9vision (Apple TV)","Fenster zu! Es regnet":"Fermez les fen\xEAtres ! Il pleut","Nur zeigen, wenn":"Afficher seulement si","z. B. Fenster \u2013 die offenen werden genannt":"p. ex. fen\xEAtres \u2013 les fen\xEAtres ouvertes sont nomm\xE9es","Nur wenn eine davon an ist":"Seulement si l'un d'eux est actif","Endzeit statt Restzeit":"Heure de fin au lieu du temps restant","z. B. aktueller Raum des Saugers":"p. ex. la pi\xE8ce actuelle de l'aspirateur robot",Zusatz:"Compl\xE9ment","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"en lecture","Es regnet":"Il pleut","noch {time}":"encore {time}","Restzeit oder Endzeit":"Temps restant ou heure de fin","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Vide = \xE9tats \xAB en marche \xBB habituels","L\xE4uft bei Zustand":"En marche quand l'\xE9tat est","Zeigen bei Zustand":"Afficher quand l'\xE9tat est","Wiedergabe (z. B. Apple TV)":"Lecture (p. ex. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Appareil en marche \u2013 avec temps restant","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Avertissement \u2013 seulement si vrai (p. ex. pluie)","L\xE4uft gerade (ganze Seite)":"En cours de lecture (page enti\xE8re)","Ganze Seite mit gro\xDFem Cover":"Page enti\xE8re avec grande pochette",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, vue sur la mer des Wadden et les Halligen (image)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, For\xEAt-Noire \u2013 Todtnauer H\xFCtte (image)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Sarre \u2013 rive ouest avec port de plaisance (image)",Saugkarte:"Carte de nettoyage","Leer = Karte des Saugers automatisch":"Vide = carte propre de l'aspirateur","Gro\xDFe Karte darunter":"Grande carte en dessous",Ausblenden:"Masquer","Neben jedem Sauger":"\xC0 c\xF4t\xE9 de chaque aspirateur","Kleine Karten":"Petites cartes","Tagesinhalt (Wikipedia, Zitat)":"Contenu du jour (Wikip\xE9dia, citation)","Wikipedia-Artikel des Tages":"Article Wikip\xE9dia du jour","Zitat des Tages":"Citation du jour","Artikel des Tages \xB7 Wikipedia":"Article du jour \xB7 Wikip\xE9dia","Mit Bild":"Avec image","Ohne Bild":"Sans image",Inhalt:"Contenu",Anzahl:"Nombre","Energiez\xE4hler (kWh)":"Compteur d'\xE9nergie (kWh)","Gr\xF6\xDFte Verbraucher":"Plus gros consommateurs","Gr\xF6\xDFte Verbraucher heute":"Plus gros consommateurs aujourd'hui","Heute noch kein Verbrauch gemessen":"Aucune consommation mesur\xE9e aujourd'hui","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Vide = les appareils du tableau de bord \xE9nergie de Home Assistant","Wird berechnet \u2026":"Calcul en cours \u2026","Richtung umkehren":"Inverser le sens","Wenn der Antrieb offen und zu andersherum meldet":"Si le moteur indique ouvert et ferm\xE9 \xE0 l'envers",ausgefahren:"d\xE9ploy\xE9",eingefahren:"rentr\xE9","Gilt f\xFCr":"S'applique \xE0","Alle Displays":"Tous les affichages","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"Personnaliser \xAB {name} \xBB : ce que vous r\xE9glez ici ne s'applique qu'\xE0 cet affichage. Vide = comme pour tous les affichages.","Stil wie alle Displays":"Style comme tous les affichages","Alle Abweichungen dieses Displays zur\xFCcksetzen":"R\xE9initialiser toutes les diff\xE9rences de cet affichage","wie alle Displays":"comme tous les affichages","Mit Stil-Vorschau gestalten":"Design avec aper\xE7u du style","4K und Full HD (zwei Kameras)":"4K et Full HD (deux cam\xE9ras)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cam\xE9ras \xAB Ambiframe {name} Flux vid\xE9o \xBB (4K) et \xAB \u2026 Flux vid\xE9o Full HD \xBB \u2013 dans un tableau de bord, dans Apple Maison (HomeKit Bridge) ou via \xAB camera.play_stream \xBB sur l'Apple TV.",Aufl\u00F6sung:"R\xE9solution","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"Pour les \xE9crans OLED : l'image se d\xE9cale imperceptiblement de quelques pixels toutes les quelques minutes pour \xE9viter le marquage. Id\xE9al avec \xAB sombre \xBB.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cam\xE9ra \xAB Ambiframe {name} Flux vid\xE9o \xBB \u2013 dans un tableau de bord, dans Apple Maison (HomeKit Bridge) ou via \xAB camera.play_stream \xBB sur l'Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Cr\xE9e la cam\xE9ra \xAB Flux vid\xE9o \xBB \u2013 p. ex. pour Apple TV (AirPlay), Apple Maison ou des t\xE9l\xE9viseurs sans navigateur moderne. N\xE9cessite le module compl\xE9mentaire \xAB Puppet \xBB. Le rendu n'a lieu que lorsque quelqu'un regarde.","Neues Bild alle (s)":"Nouvelle image toutes les (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Seulement si Puppet n'est pas trouv\xE9, p. ex. http://homeassistant.local:10000","OLED-Schutz":"Protection OLED","Puppet-Adresse":"Adresse de Puppet",Videostream:"Flux vid\xE9o","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"Tout va bien","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"Tout va bien : toutes les entit\xE9s pr\xE9sentes, appareils connect\xE9s, photos disponibles.","Das iCloud-Album liefert keine Fotos":"L'album iCloud ne fournit aucune photo","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"Le cadre photo n'a aucune photo (dossier et album vides, Bing d\xE9sactiv\xE9)","Der Fotoordner ist leer oder fehlt":"Le dossier photos est vide ou introuvable","Display \u201E{name}\u201C":"Affichage \xAB {name} \xBB","Display \u201E{name}\u201C meldet sich nicht":"L'affichage \xAB {name} \xBB ne r\xE9pond pas","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"L'affichage \xAB {name} \xBB ne r\xE9pond plus depuis {n} h","Display \u201E{name}\u201C war noch nie verbunden":"L'affichage \xAB {name} \xBB ne s'est jamais connect\xE9","Ereignis \u201E{name}\u201C":"\xC9v\xE9nement \xAB {name} \xBB","Fotos werden gez\xE4hlt \u2026":"Comptage des photos \u2026",Gesundheitscheck:"V\xE9rification","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"V\xE9rification : entit\xE9s, appareils, photos manquants","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"Le r\xE9sum\xE9 IA est activ\xE9, mais il n'y a pas d'IA (ai_task) dans Home Assistant","Seite \u201E{name}\u201C":"Page \xAB {name} \xBB","Seite \u201E{name}\u201C wird nirgends gezeigt":"La page \xAB {name} \xBB n'est affich\xE9e nulle part","{n} Hinweise":"{n} remarques","{id} gibt es nicht (mehr) \u2013 {where}":"{id} n'existe pas (plus) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} est indisponible \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\xAB {name} \xBB a encore une ancienne version","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\xAB {name} \xBB est en mode secours : {reason}","1 Stunde stumm":"Muet 1 heure",Anhalten:"Pause",Dunkler:"Plus sombre","Eine Stunde stumm":"Muet pendant une heure",Heller:"Plus clair","Helligkeit {n} %":"Luminosit\xE9 {n} %",Schlie\u00DFen:"Fermer",Schnellmen\u00FC:"Menu rapide","T\xF6ne an":"Son activ\xE9","T\xF6ne wieder an":"Son de nouveau activ\xE9","Weiter abspielen":"Reprendre","Alle Batterien in Ordnung":"Toutes les batteries vont bien","Ger\xE4te und schwache Batterien":"Appareils et batteries faibles","Nur Ger\xE4te":"Appareils uniquement","Nur schwache Batterien":"Batteries faibles uniquement",Zeigen:"Afficher","+ {n} weitere":"+ {n} de plus",Akkus:"Batteries",Akkustand:"Niveau de batterie","Batterie wechseln":"Remplacer la batterie","Ger\xE4te (immer zeigen)":"Appareils (toujours afficher)","H\xF6chstens Zeilen Zubeh\xF6r":"Lignes d'accessoires max.","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Vide = tous les t\xE9l\xE9phones, tablettes et montres de l'application HA automatiquement","Zubeh\xF6r zeigen unter (%)":"Afficher les accessoires sous (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessoires : toutes les batteries vont bien",schwach:"faible","Pfeile zum Bl\xE4ttern":"Fl\xE8ches pour feuilleter","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Discr\xE8tes en bas \xE0 gauche et \xE0 droite : page pr\xE9c\xE9dente et suivante sans quitter Ambiframe","Vorherige Seite":"Page pr\xE9c\xE9dente","N\xE4chste Seite":"Page suivante","Karte unten rechts (kurz beim Liedwechsel)":"Carte en bas \xE0 droite (bri\xE8vement au changement de titre)","Vollbild (kurz beim Liedwechsel)":"Plein \xE9cran (bri\xE8vement au changement de titre)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Mini-carte \u2013 reste tant que quelque chose joue","Eigenes QR-Bild":"Image QR personnelle","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"Au lieu du nom de r\xE9seau et du mot de passe, une image QR toute pr\xEAte, p. ex. de votre box (lien ou data:image/\u2026)","Adresse kopieren":"Copier l'adresse","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Tout d'un coup d'\u0153il : photos, m\xE9t\xE9o, rendez-vous, poubelles, maison et \xE9nergie. Toucher ouvre le tableau de bord.","Ambiframe als Bildschirmschoner":"Ambiframe comme \xE9conomiseur d'\xE9cran","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe tourne toujours ; toucher affiche le tableau de bord HA, puis il revient tout seul.",Anh\u00F6ren:"\xC9couter","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Mouvement \xE0 la porte \u2192 cam\xE9ra en incrustation","Bing-Bilder, wenn Ordner und Album leer sind":"Images Bing si le dossier et l'album sont vides","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"Le profil choisit les pages, la commande, les sons et l'apparence adapt\xE9s. Tout reste modifiable ensuite.","Dashboard \xFCber Ambiframe":"Tableau de bord par-dessus Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Copier cet affichage avec tous les r\xE9glages","Display \u201E{name}\u201C mit {n} Seiten":"Affichage \xAB {name} \xBB avec {n} pages","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"Une image calme \u2013 qui ne parle que lorsqu'il se passe quelque chose",Fernseher:"T\xE9l\xE9vision","Fertig \u2013 speichern":"Termin\xE9 \u2013 enregistrer","Fertig!":"Termin\xE9 !",Flur:"Couloir","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"App Photos \u2192 partager l'album \u2192 activer \xAB Site web public \xBB \u2192 copier le lien.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk trouv\xE9 : Ambiframe r\xE8gle lui-m\xEAme la page de d\xE9marrage et l'\xE9conomiseur d'\xE9cran et red\xE9marre la tablette si elle se bloque.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully affiche le tableau de bord ; apr\xE8s une minute sans contact, Ambiframe appara\xEEt. La sonnette et la cam\xE9ra le font passer au premier plan imm\xE9diatement.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"Pour le cadre photo. Le dossier et l'album sont m\xE9lang\xE9s ; sans les deux, Ambiframe affiche les images Bing du jour.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Trouv\xE9 dans votre Home Assistant. Les sons sont discrets et assortis au design \u2013 appuyez sur \u25B6 pour \xE9couter.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Appareil termin\xE9 \u2192 avertissement et rappel","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Grand cadre photo : photos, webcams, m\xE9t\xE9o, actualit\xE9s. Sombre et calme (m\xE9nage l'OLED), sans commande ni son.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 M\xE9dias \u2192 M\xE9dias locaux \u2192 cr\xE9er le dossier \xAB ambiframe \xBB et t\xE9l\xE9verser des photos.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"En quelques \xE9tapes, vous configurez votre premier affichage : o\xF9 il est accroch\xE9, ce qu'il montre, \xE0 quoi il r\xE9agit. Tout reste modifiable plus tard dans l'\xE9diteur.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"Sans commande \u2013 p. ex. pour la t\xE9l\xE9vision.","Klingel \u2192 Vollbild mit Kamera":"Sonnette \u2192 plein \xE9cran avec cam\xE9ra",Kopie:"copie","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"D'un coup d'\u0153il en passant : horloge, m\xE9t\xE9o, poubelles et qui est \xE0 la maison \u2013 grand texte.",K\u00FCche:"Cuisine","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Plus doux que la sonnette, silencieux la nuit (22 h\u20137 h).","Neue Seiten dazu":"Ajouter de nouvelles pages","Nur anzeigen":"Affichage seul","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Calme et sombre : horloge, photos, m\xE9t\xE9o. Seule la sonnette se fait entendre \u2013 doucement le soir, en silence la nuit.",Schlafzimmer:"Chambre","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Configurer l'appareil : ouvrez cette adresse dans le navigateur de la tablette ou de la t\xE9l\xE9vision (dans Fully comme URL de d\xE9marrage) et connectez-vous une fois \xE0 Home Assistant.","Sp\xFClmaschine fertig":"Lave-vaisselle termin\xE9","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Astuce : avec Fully Kiosk (et son int\xE9gration HA), Ambiframe configure la tablette lui-m\xEAme.","Trockner fertig":"S\xE8che-linge termin\xE9","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Pr\xE9s\xE9lectionn\xE9 selon le profil. Le cadre photo alterne avec les pages d'information.","Was soll das Display zeigen?":"Que doit montrer l'affichage ?",Weiter:"Suivant","Willkommen bei Ambiframe":"Bienvenue dans Ambiframe","Wo h\xE4ngt das Display?":"O\xF9 l'affichage est-il accroch\xE9 ?","Woher kommen die Fotos?":"D'o\xF9 viennent les photos ?","Worauf soll es reagieren?":"\xC0 quoi doit-il r\xE9agir ?",Zur\u00FCck:"Retour","ohne Ton":"pas de son","{n} neue Ereignisse":"{n} nouveaux \xE9v\xE9nements",\u00DCberspringen:"Passer","Eigenes CSS (nur dieses Display)":"CSS personnel (cet affichage uniquement)","Eigenes Design":"Design personnel","Erg\xE4nzt das CSS aus dem Design.":"S'ajoute au CSS du design.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"Pas de sons sur cet affichage \u2013 les incrustations restent","Leer = wie Design":"Vide = comme le design","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Seul ce qui est r\xE9gl\xE9 ici diff\xE8re du design \u2013 vide signifie \xAB comme le design \xBB.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Adapte le volume des \xE9v\xE9nements ; dans Fully, le volume multim\xE9dia de la tablette",Stumm:"Muet",T\u00F6ne:"Sons","Z. B. media-source://media_source/local/kueche":"P. ex. media-source://media_source/local/cuisine",Bedienung:"Commande","Dashboard \xFCber Ambiframe (Antippen)":"Tableau de bord par-dessus Ambiframe (toucher)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Tableau de bord dans Fully, Ambiframe comme \xE9conomiseur d'\xE9cran","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"\xC9conomiseur d'\xE9cran : Fully affiche le tableau de bord ; apr\xE8s le d\xE9lai d'inactivit\xE9, Ambiframe appara\xEEt. La sonnette et la cam\xE9ra font passer Ambiframe au premier plan imm\xE9diatement. Fully est configur\xE9 automatiquement.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"D\xE9lai sans contact avant le retour d'Ambiframe",bedingt:"conditionnel",Bedingung:"Condition","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Les conditions, l'apparence et les actions au toucher se trouvent dans le mode \xAB Avanc\xE9 \xBB (en haut \xE0 droite).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"La suivante \xE0 chaque apparition de la page \u2013 remplace la cam\xE9ra et le lien ci-dessus","Beim Antippen":"Au toucher","Beim langen Dr\xFCcken":"\xC0 l'appui long",beliebig:"quelconque",Bereit:"Pr\xEAt","Besuche heute":"visites aujourd'hui",Bewegung:"Mouvement","Bewegung erkannt":"Mouvement d\xE9tect\xE9","Bewegung \u2192 Bild-im-Bild":"Mouvement \u2192 incrustation","Bewegung \u2192 Seite":"Mouvement \u2192 page","Bewegung \u2192 Seite zeigen":"Mouvement \u2192 afficher une page",Bewertung:"\xC9valuation",Bew\u00F6lkt:"Nuageux",Bezeichnung:"Libell\xE9",Bild:"Image","Bild neu laden (s)":"Recharger l'image (s)","Bild nicht ladbar":"L'image n'a pas pu \xEAtre charg\xE9e","Bild-im-Bild":"Incrustation","Bild-im-Bild (Bewegung)":"Incrustation (mouvement)","Bild-Link":"Lien de l'image","Bild-Link oder Entit\xE4t w\xE4hlen":"Choisissez un lien d'image ou une entit\xE9",Bilderrahmen:"Cadre photo","Bildschirm aus":"\xC9teindre l'\xE9cran",Bildunterschrift:"L\xE9gende","Bing-Bilder":"Images Bing",bis:"jusqu'\xE0","Bis {hi}\xB0, nachts {lo}\xB0":"Jusqu'\xE0 {hi}\xB0, {lo}\xB0 la nuit","bis {when}":"jusqu'\xE0 {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Reste ensuite comme petit rappel en haut \xE0 droite.","Bleibt vorerst nass":"Reste humide pour l'instant",Breite:"Largeur",Cover:"Pochette","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 plage et estran (image en direct YouTube)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Ne r\xE9afficher qu'ensuite \u2013 contre les d\xE9clenchements continus.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"Peut \xEAtre un mod\xE8le, p. ex. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"Peut \xEAtre un mod\xE8le.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"Peut contenir des mod\xE8les, p. ex. {{ states('sensor.outside') }} \xB0C \u2013 mis \xE0 jour en direct.",Darstellung:"Apparence",Dashboard:"Tableau de bord","Daten (YAML, optional)":"Donn\xE9es (YAML, facultatif)",Datum:"Date",Dauer:"Dur\xE9e","Dauer (s)":"Dur\xE9e (s)","Dauer in Sekunden (leer = Seitendauer)":"Dur\xE9e en secondes (vide = dur\xE9e de la page)","Davor zeigt die Bilanz den Vortag":"Avant, le r\xE9sum\xE9 montre la veille","Deckkraft (%)":"Opacit\xE9 (%)",Design:"Design","Details (HA-Dialog)":"D\xE9tails (dialogue HA)",deutlich:"marqu\xE9",Deutsch:"Deutsch",dezent:"discret","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"Charger dans l'\xE9diteur la version d'avant le dernier enregistrement (puis \xAB Enregistrer \xBB)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"Le choix est m\xE9moris\xE9 sur cet appareil.","Diesen Eintrag nur zeigen, wenn \u2026":"N'afficher cette entr\xE9e que si \u2026","Klangschale (tief, schwebend)":"Bol chantant (grave, vibrant)","Marimba (zwei Holzt\xF6ne)":"Marimba (deux notes bois\xE9es)","Glas (klares Ding-Dong)":"Verre (ding-dong clair)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (trois notes pinc\xE9es)","Windspiel (zart)":"Carillon \xE0 vent (d\xE9licat)","Hinweis (sehr leise, kurz)":"Indication (tr\xE8s douce, courte)","Ding-Dong":"Ding-dong",Display:"Affichage",Displays:"Affichages",dunkel:"sombre","dunkel: nach Sonnenuntergang w\xE4rmer":"sombre : plus chaud apr\xE8s le coucher du soleil",Duplizieren:"Dupliquer",d\u00E4mmrig:"sombre",Eckenradius:"Rayon des coins","Eckenradius (px)":"Rayon des coins (px)","Eckenradius der Karten (px)":"Rayon des coins des cartes (px)",Editorial:"Editorial","Eigene Farbe":"Couleur personnelle","Eigene Farben \xB7 Dunkel":"Couleurs personnelles \xB7 sombre","Eigene Farben \xB7 Hell":"Couleurs personnelles \xB7 clair","Eigene Stile":"Styles personnels","Eigene Vorlagen":"Mod\xE8les personnels","Eigene Vorlagen:":"Mod\xE8les personnels :","Eigenes CSS (alle Displays)":"CSS personnel (tous les affichages)","Eigenes CSS (nur diese Seite)":"CSS personnel (cette page uniquement)","Ein Balken je":"Une barre par","Ein/aus schalten":"Allumer/\xE9teindre","Eine von mehreren ist":"L'un de plusieurs est","eine von {n} = {state}":"l'un de {n} = {state}","Eine Zeile":"Une ligne","Eine Zeile (dezent)":"Une ligne (discr\xE8te)",Einfach:"Simple","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Simple : l'essentiel \xB7 Avanc\xE9 : tout",eingebaut:"int\xE9gr\xE9",Einheit:"Unit\xE9","Einmal tippen f\xFCr Vollbild":"Toucher une fois pour le plein \xE9cran",Einpassen:"Ajuster",Einstellungen:"R\xE9glages",Eintrag:"Entr\xE9e","empfindliche Gruppen":"groupes sensibles",Endzeit:"Heure de fin","Energie jetzt":"\xC9nergie maintenant","Energie-Bilanz":"Bilan \xE9nerg\xE9tique",English:"English",entfernen:"supprimer",Entit\u00E4t:"Entit\xE9","Entit\xE4t hinzuf\xFCgen":"Ajouter une entit\xE9","Entit\xE4t hinzuf\xFCgen \u2026":"Ajouter une entit\xE9 \u2026","Entit\xE4t w\xE4hlen":"Choisissez une entit\xE9",Entit\u00E4ten:"Entit\xE9s","Ereignis \u201E{name}\u201C l\xF6schen?":"Supprimer l'\xE9v\xE9nement \xAB {name} \xBB ?",Ereignisse:"\xC9v\xE9nements","Erf\xFCllt bei true, on, Zahl \u2260 0":"Vrai pour true, on, nombre \u2260 0",Erinnerungstext:"Texte du rappel",Erledigt:"Termin\xE9","Erstellen um":"Cr\xE9er \xE0",erstes:"premier",Erweitert:"Avanc\xE9",Erzeugung:"Production","Erzeugung (W)":"Production (W)","Es gibt noch keine vorherige Fassung.":"Il n'y a pas encore de version pr\xE9c\xE9dente.","Es klingelt":"On sonne","Es regnet gerade":"Il pleut",Exportieren:"Exporter",Extrem:"Extr\xEAme",Familie:"Famille",Farbe:"Couleur","Farbe ab Wert":"Couleur selon la valeur",Farben:"Couleurs",Fehlgeschlagen:"\xC9chec","Fehlgeschlagen: {error}":"\xC9chec : {error}",Fenster:"Fen\xEAtre","Fenster offen":"Fen\xEAtre ouverte","Fertig um":"Termin\xE9 \xE0","fertig um {time}":"termin\xE9 \xE0 {time}","fertig {time}":"termin\xE9 {time}",feucht:"humide","Flie\xDFender Verlauf":"D\xE9grad\xE9 fluide",Flie\u00DFtext:"Texte courant",Fl\u00E4che:"Aire","Fl\xE4che, Rand und Radius des Stils":"Surface, bordure et rayon du style",Form:"Forme","Form & CSS":"Forme & CSS",Format:"Format","Formatierung (Markdown)":"Mise en forme (Markdown)","Fortschritt %":"Progression %","Fortschritt (%)":"Progression (%)",Foto:"Photo",Fotoordner:"Dossier photos",Fotos:"Photos","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"App Photos \u2192 partager l'album \u2192 activer \xAB Site web public \xBB \u2192 copier le lien. M\xE9lang\xE9 avec le dossier.",Freundlich:"Amical",Fu\u00DFnote:"Note de bas","F\xE4hrt zur\xFCck":"Retourne","F\xFCllen (zuschneiden)":"Remplir (rogner)","f\xFCllt das Feld":"remplit le champ","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"Pour l'interrupteur \xAB Pause \xBB dans HA ; 0 = jamais","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"Pour utilisateurs avanc\xE9s : s'applique dans l'affichage ; couleurs et espacements via les variables --af-\u2026.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':`Pour utilisateurs avanc\xE9s : s'applique dans la page ; les widgets se ciblent via .cell[data-widget="id"].`,"F\xFCr Tor, T\xFCrschloss & Co.":"Pour portails, serrures & co.","Ganz zeigen":"Afficher en entier",ganztags:"toute la journ\xE9e","gar nicht zeigen":"ne pas afficher du tout",Ged\u00E4mpft:"Muet","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) r\xE9sume la m\xE9t\xE9o, les rendez-vous, les poubelles, l'\xE9lectricit\xE9, la voiture et la maison.","Gemini schreibt \u2026":"Gemini \xE9crit \u2026",gerade:"\xE0 l'instant","gerade eben":"\xE0 l'instant","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"Aucun appareil n'est connect\xE9 \xE0 cet affichage pour le moment","Gerade l\xE4uft nichts":"Rien ne joue en ce moment",Ger\u00E4t:"Appareil","Ger\xE4t fertig":"Appareil termin\xE9","Ger\xE4t fertig \u2192 Hinweis":"Appareil termin\xE9 \u2192 avertissement",Ger\u00E4te:"Appareils",Gespeichert:"Enregistr\xE9","Gespeichert \u2013 alle Displays zeigen es sofort.":"Enregistr\xE9 \u2013 tous les affichages le montrent imm\xE9diatement.","gestern {time}":"hier {time}","Gestern, {date}":"Hier, {date}",Gewitter:"Orage","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Surfaces de verre \xE0 bord lumineux sur des couleurs douces","Glocke (kurz, hell)":"Cloche (courte, claire)",Gold:"Or","Gong (warm, tief)":"Gong (chaud, grave)",Gro\u00DF:"Grand","gro\xDF (+15 %)":"grand (+15 %)","Gro\xDFbild mit Schlagzeile":"Grande image avec titre","Gruppen (YAML)":"Groupes (YAML)","Gruppen zeigen jedes Lied nur einmal":"Les groupes n'affichent chaque titre qu'une fois",Gr\u00F6\u00DFe:"Taille","Gr\xF6\xDFe (%)":"Taille (%)",gut:"bon","Gut (gr\xFCn)":"Bon (vert)","Guten Morgen (KI-Zusammenfassung)":"Bonjour (r\xE9sum\xE9 IA)","G\xE4ste-WLAN":"Wi-Fi invit\xE9s",g\u00FCnstig:"bon march\xE9","G\xFCnstigstes Fenster (h)":"Fen\xEAtre la moins ch\xE8re (h)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 M\xE9dias \u2192 M\xE9dias locaux \u2192 dossier \xAB ambiframe \xBB","HA-Dashboard \xF6ffnen":"Ouvrir le tableau de bord HA","HA-Karte":"Carte HA",Hagel:"Gr\xEAle",Halbkreis:"Demi-cercle","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hambourg \u2013 Michel avec panorama du port (image en direct YouTube)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hambourg \u2013 ville (image en direct YouTube)","Handy-Kamera auf den Code halten":"Visez le code avec l'appareil photo du t\xE9l\xE9phone",Haustier:"Animal",Haust\u00FCr:"Porte d'entr\xE9e","heizt auf {temp}\xB0":"chauffe \xE0 {temp}\xB0",Heizung:"Chauffage","Helfer umschalten":"Basculer l'entr\xE9e",hell:"clair","Hell / Tinte":"Clair / encre","Hell/Dunkel":"Clair/sombre","Hell/Dunkel & Schrift":"Clair/sombre & polices","Helligkeit (Lux)":"Luminosit\xE9 (lux)","Hervorheben ab Tagen":"Mettre en \xE9vidence \xE0 partir de jours","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee et Walchensee (image)",Heute:"Aujourd'hui",heute:"aujourd'hui","Heute ab (Uhr)":"Aujourd'hui \xE0 partir de (heure)","heute Abend":"ce soir","Heute Abend & morgen":"Ce soir & demain","Heute Abend rausstellen":"\xC0 sortir ce soir","Heute bis jetzt":"Aujourd'hui jusqu'ici","Heute Nachmittag":"Cet apr\xE8s-midi","Heute {lo}\xB0 bis {hi}\xB0":"Aujourd'hui {lo}\xB0 \xE0 {hi}\xB0",Hintergrund:"Arri\xE8re-plan",Hinweis:"Avertissement","Hinweis + Erinnerung (Ger\xE4te)":"Avertissement + rappel (appareils)",hoch:"\xE9lev\xE9","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"\xE9lev\xE9 (texte att\xE9nu\xE9 plus marqu\xE9)",Hochformat:"Portrait","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (image, MJPEG, .m3u8 ou YouTube)",H\u00F6chstens:"Au plus","H\xF6chstens (s)":"Au plus (s)","H\xF6chstens Eintr\xE4ge":"Entr\xE9es au plus",H\u00F6he:"Hauteur","iCloud-Album":"Album iCloud",Icon:"Ic\xF4ne","Immer dunkel":"Toujours sombre","Immer hell":"Toujours clair","Immer hoch":"Toujours portrait","Immer quer":"Toujours paysage","Import fehlgeschlagen: {error}":"\xC9chec de l'import : {error}",Importieren:"Importer","Importierte Seite":"Page import\xE9e","In den Editor \xFCbernehmen":"Reprendre dans l'\xE9diteur","in den letzten \u2026 Minuten":"dans les \u2026 derni\xE8res minutes","In der Ruhezeit":"Pendant les heures calmes","In der Station":"Sur la base","in {n} Tagen":"dans {n} jours","Info mit Kopfzeile":"Info avec titre",Infozeile:"Ligne d'info","Innen {temp}\xB0":"Int\xE9rieur {temp}\xB0","Innenabstand (px)":"Marge int\xE9rieure (px)",Innentemperatur:"Temp\xE9rature int\xE9rieure","Ist M\xFCllkalender":"Est un calendrier des poubelles",Ja:"Oui",ja:"oui","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"N'importe quelle carte du tableau de bord, p. ex. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"tout changement (boutons, event.*)",jetzt:"maintenant","Jetzt (gro\xDF)":"Maintenant (grand)","Jetzt erstellen":"Cr\xE9er maintenant",Kalender:"Calendrier","Kalt unter":"Froid en dessous de","Kalt unter \xB0C":"Froid en dessous de \xB0C",Kamera:"Cam\xE9ra","Kamera / Webcam":"Cam\xE9ra / webcam","Kamera als Hintergrund":"Cam\xE9ra en arri\xE8re-plan",Karte:"Carte","Karte (YAML)":"Carte (YAML)","Karte mit 4 Stunden":"Carte sur 4 heures","Karte nicht ladbar: {error}":"La carte n'a pas pu \xEAtre charg\xE9e : {error}","Karte unten rechts":"Carte en bas \xE0 droite","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Carte \xAB {type} \xBB (visible seulement dans Home Assistant)",Karten:"Cartes","Karten-Deckkraft (%)":"Opacit\xE9 des cartes (%)","kein Ausl\xF6ser":"aucun d\xE9clencheur","Kein Display konfiguriert":"Aucun affichage configur\xE9","Kein Display.":"Aucun affichage.","Kein Regen bis {h} Uhr":"Pas de pluie avant {h}:00","kein Stil gefunden":"aucun style trouv\xE9","kein Ton":"pas de son",keine:"aucun","Keine Bewegung in letzter Zeit":"Pas de mouvement r\xE9cent","Keine Karte konfiguriert":"Aucune carte configur\xE9e","Keine Preisdaten":"Pas de donn\xE9es de prix","keine Seite":"aucune page","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"Aucune page reconnue (\xAB widgets \xBB manquant).","keine Seite sichtbar":"aucune page visible","Keine Termine in den n\xE4chsten Tagen":"Pas de rendez-vous dans les prochains jours","Keine von \u2026 (nicht)":"Aucun de \u2026 (non)","Keine Warnungen":"Aucune alerte","Keiner gew\xE4hlt = alle":"Aucun choisi = tous","KI-Zusammenfassung":"R\xE9sum\xE9 IA",Klar:"Effacer","klein (Kopfzeile)":"petit (en-t\xEAte)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Petit en bas \xE0 droite, p. ex. \xAB Cuxhaven \xBB","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Textes plus petits (libell\xE9s, listes, d\xE9tails) \u2013 pour lire de loin","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Cliquez dans le champ pour les sons int\xE9gr\xE9s \u2013 ou un lien (/local/son.mp3). Sur la tablette via Fully.",Klingel:"Sonnette","Klingel \u2192 Vollbild":"Sonnette \u2192 plein \xE9cran","Knapp, nur Fakten":"Bref, uniquement les faits",Kontrast:"Contraste",Kopieren:"Copier","Kopieren (\u2318C)":"Copier (\u2318C)",Kosten:"Co\xFBt","Kosten-Sensor":"Capteur de co\xFBt","K\xFChl (blau)":"Frais (bleu)","K\xFCrzlich ge\xE4ndert":"Modifi\xE9 r\xE9cemment",Ladeleistung:"Puissance de charge",Ladelimit:"Limite de charge","Ladelimit {n} %":"Limite de charge {n} %",langsam:"lent",Laufband:"Bandeau d\xE9filant","Laufende Ger\xE4te":"Appareils en marche","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Vide = tous les capteurs de poubelles (\u2026_days) automatiquement","Leer = automatisch suchen":"Vide = rechercher automatiquement","Leer = Farbe des Stils":"Vide = couleur du style","Leere Seite":"Page vide",Leise:"Doux",Leistung:"Puissance","Leistung (W)":"Puissance (W)","Letzte Tage":"Derniers jours","Licht umschalten":"Allumer/\xE9teindre la lumi\xE8re","Lichter an":"Lumi\xE8res allum\xE9es",Lichtschimmer:"Reflet",Linie:"Ligne",links:"gauche","Liquid Glass":"Liquid Glass",Liste:"Liste","Liste mit Vorschaubildern":"Liste avec vignettes",Live:"En direct","Lovelace-Karte (YAML)":"Carte Lovelace (YAML)",Luftfeuchte:"Humidit\xE9","Luftfeuchte (Raum)":"Humidit\xE9 (pi\xE8ce)","Luftqualit\xE4t (AQI)":"Qualit\xE9 de l'air (AQI)",L\u00E4dt:"En charge","L\xE4dt in der Station":"En charge sur la base","L\xE4dt \u2026":"Chargement \u2026","L\xE4uft gerade":"En cours de lecture","L\xE4uft-Entit\xE4t":"Entit\xE9 en marche",L\u00F6schen:"Supprimer",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 ou washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Plusieurs webcams \xE0 tour de r\xF4le",Melder:"Capteur",Meldungen:"Messages","Mindestens (s)":"Au moins (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"Au moins une personne (person.*) est \xAB \xE0 la maison \xBB.","Mindestens eine von \u2026 (oder)":"Au moins un de \u2026 (ou)",Minimal:"Minimal",Minimum:"Minimum",mittel:"moyen",mittig:"centre","Mo., 12. Okt.":"lun. 12 oct.",Modus:"Mode","Montag, 12. Oktober":"lundi 12 octobre",Morgen:"Demain",morgen:"demain","Morgen anzeigen":"Afficher demain",Musik:"Musique","Musik \u2192 Cover":"Musique \u2192 pochette","Musik-Cover":"Pochette musicale","Musik-Cover (bei Liedwechsel)":"Pochette musicale (au changement de titre)",m\u00E4\u00DFig:"mod\xE9r\xE9",M\u00FCll:"Poubelles","M\xFCll zeigen ab Tagen":"Afficher les poubelles \xE0 partir de jours",M\u00FCllabfuhr:"Collecte des d\xE9chets",M\u00FCllkalender:"Calendrier des poubelles",M\u00FClltonnen:"Poubelles","M\xFClltonnen (im Wechsel)":"Poubelles (en alternance)","M\xFCnchen \u2013 Panorama (Bild)":"Munich \u2013 panorama (image)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Ne pas r\xE9afficher pendant ce temps apr\xE8s la fin.","nach oben":"monter","nach unten":"descendre",Nachkommastellen:"D\xE9cimales","Nachlauf (s)":"Maintien apr\xE8s (s)",Nachrichten:"Actualit\xE9s","Nachrichten werden geladen \u2026":"Chargement des actualit\xE9s \u2026",Nacht:"Nuit","Nacht (gedimmt)":"Nuit (att\xE9nu\xE9e)","Nacht, wenn an":"Nuit quand activ\xE9",Nachtseite:"Page de nuit",Name:"Nom","Name der Seitenvorlage":"Nom du mod\xE8le de page","Name der Vorlage":"Nom du mod\xE8le","Name des Auftrags":"Nom de la t\xE2che","Name des Players":"Nom du lecteur","Name, z. B. Herbst":"Nom, p. ex. Automne",Nebel:"Brouillard",nein:"non","Netzname (SSID)":"Nom du r\xE9seau (SSID)","Netzname und Passwort im Editor eintragen.":"Saisissez le nom du r\xE9seau et le mot de passe dans l'\xE9diteur.","Neu laden":"Recharger","Neu laden alle (s)":"Recharger toutes les (s)","Neue Seite":"Nouvelle page","Neues Display":"Nouvel affichage","Neustart nach (s)":"Red\xE9marrer apr\xE8s (s)","Neustart-Taste":"Bouton de red\xE9marrage",nicht:"non","nicht in Wiedergabe":"pas dans la liste de lecture","nicht zeigen":"ne pas afficher","Nichts l\xE4uft gerade":"Rien ne tourne en ce moment","Nichts offen, nichts l\xE4uft":"Rien d'ouvert, rien en marche",nie:"jamais",niedrig:"bas",Noch:"Reste","Noch keine Daten im Zeitraum":"Pas encore de donn\xE9es sur cette p\xE9riode","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"Pas encore de styles personnels \u2013 r\xE9glez style, couleurs et polices et enregistrez-les ici.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"Pas encore de page \u2013 \xAB + Nouveau \xBB ci-dessus.","Noch keine Statistik im Zeitraum":"Pas encore de statistiques sur cette p\xE9riode","Noch keine Werte f\xFCr diesen Tag.":"Pas encore de valeurs pour ce jour.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"Pas encore de r\xE9sum\xE9 \u2013 il est cr\xE9\xE9 aux heures d\xE9finies.","noch {n} kWh":"encore {n} kWh","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 port et mer des Wadden (image en direct YouTube)",Normal:"Normal",normal:"normal","normal (ruhig)":"normal (calme)",Notfallmodus:"Mode secours","Nur anzeigen wenn \u2026":"Afficher seulement si \u2026","Nur auf Display \u2026":"Seulement sur l'affichage \u2026","nur auf {names}":"seulement sur {names}","Nur diese Ereignistypen":"Seulement ces types d'\xE9v\xE9nements","nur Hochformat":"portrait uniquement","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Navigateur uniquement \u2013 Fully utilise le volume multim\xE9dia de la tablette.","Nur im Hoch-/Querformat":"Seulement en portrait/paysage","Nur offene listen":"Ne citer que ceux ouverts","nur Querformat":"paysage uniquement","Nur wenn au\xDFerdem \u2026":"Seulement si aussi \u2026","Nur wenn in Tagen":"Seulement si dans les jours","Nur wenn jemand zu Hause ist":"Seulement si quelqu'un est \xE0 la maison","Nur zeigen bis Tage":"Afficher seulement jusqu'\xE0 jours","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Afficher seulement \xE0 certaines heures ou conditions","N\xE4chste Stunden":"Prochaines heures","N\xE4chste Tage":"Prochains jours",oben:"haut","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Limite sup\xE9rieure, m\xEAme si un capteur reste actif.",oder:"ou",Offen:"Ouvert",offen:"ouvert","Offene Fenster & T\xFCren":"Fen\xEAtres & portes ouvertes","Ohne Rahmen":"Sans cadre","ohne Ton zeigen":"afficher sans son","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Facultatif \u2013 sinon d'apr\xE8s l'historique Tibber.","Ort / Zusatz":"Lieu / compl\xE9ment","Ort zeigen":"Afficher le lieu",Ortsangabe:"Emplacement",Ortsname:"Nom du lieu",Passwort:"Mot de passe","Passwort zus\xE4tzlich als Text":"Afficher aussi le mot de passe en texte","Pause endet nach (min)":"La pause se termine apr\xE8s (min)",Pausiert:"En pause",pausiert:"en pause","per Link (?safe=1)":"via un lien (?safe=1)",Person:"Personne","Person, image.*, Kamera, Medienplayer \u2026":"Personne, image.*, cam\xE9ra, lecteur multim\xE9dia \u2026",Personen:"Personnes",Player:"Lecteur",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up avec carte HA","Prognose heute (kWh)":"Pr\xE9vision aujourd'hui (kWh)","Prognose heute {n} kWh":"Pr\xE9vision aujourd'hui {n} kWh","Prognose Rest (kWh)":"Pr\xE9vision restante (kWh)",Quelle:"Source",Quellen:"Sources",Querformat:"Paysage",Rahmen:"Cadre",Raum:"Pi\xE8ce",Rausstellen:"Sortir",rechts:"droite",Regen:"Pluie","Regen ab %":"Pluie \xE0 partir de %","Regen ab {h} Uhr":"Pluie \xE0 partir de {h}:00","Regen an/aus":"Pluie oui/non","Regen-Vorschau":"Pr\xE9vision de pluie",Regensensor:"Capteur de pluie",Regnet:"Il pleut",Reichweite:"Autonomie","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 plage (image en direct YouTube)",Restzeit:"Temps restant",Ring:"Anneau",Rollladen:"Volet","Rollladen/Tor umschalten":"Basculer volet/portail",Rolll\u00E4den:"Volets","Ruhezeit ab":"Heures calmes \xE0 partir de","Ruhezeit bis":"Heures calmes jusqu'\xE0",Ruhig:"Calme","Ruhig flie\xDFende Farben wie Nordlicht":"Couleurs fluides et calmes comme une aurore bor\xE9ale",R\u00E4ume:"Pi\xE8ces","R\xFCckg\xE4ngig (\u2318Z)":"Annuler (\u2318Z)",Sauger:"Aspirateur",Saugroboter:"Aspirateur robot",Saugt:"Aspire",Schicht:"Couche","Schichten gesamt":"Couches au total",Schieben:"Glisser",Schlicht:"Sobre","Schlie\xDFt nach (s)":"Se ferme apr\xE8s (s)",Schloss:"Serrure",Schnee:"Neige",Schneeregen:"Neige fondue",Schrift:"Police","Schrift des Stils":"Police du style","Schrift Text":"Police du texte","Schrift Uhr & Titel":"Police de l'horloge & des titres",Schriftfarbe:"Couleur du texte",Schriftgr\u00F6\u00DFe:"Taille du texte","Schriftgr\xF6\xDFe Punkte (px)":"Taille des puces (px)","Schwebende Partikel":"Particules flottantes","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Style suisse : \xE9criture nette, contraste \xE9lev\xE9, uniquement typographique","sehr gro\xDF (+30 %)":"tr\xE8s grand (+30 %)","sehr hoch":"tr\xE8s \xE9lev\xE9","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Tr\xE8s calme ; d\xE9sactiv\xE9 la nuit. Modifiable par page.","seit {time}":"depuis {time}",Seite:"Page","Seite importieren \u2026":"Importer une page \u2026","Seite in die Wiedergabe":"Page dans la liste de lecture","Seite unten als YAML \u2013 zum Kopieren markieren.":"Page ci-dessous en YAML \u2013 s\xE9lectionnez pour copier.","Seite zeigen":"Afficher une page","Seite zeigen (z. B. bei Bewegung)":"Afficher une page (p. ex. sur mouvement)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Page \xAB {name} \xBB copi\xE9e en YAML \u2013 collez-la ailleurs avec \xAB + Nouveau \u2192 Importer une page \xBB ou \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Page \xAB {name} \xBB cr\xE9\xE9e \u2013 adaptez les ID de page dans les actions si n\xE9cessaire.","Seite \u201E{name}\u201C l\xF6schen?":"Supprimer la page \xAB {name} \xBB ?",Seiten:"Pages","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Mod\xE8le de page \xAB {name} \xBB enregistr\xE9 \u2013 sous \xAB + Nouveau \xBB.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Supprimer le mod\xE8le de page \xAB {name} \xBB ?",Seitenwechsel:"Changement de page",Sekunden:"Secondes","Selbst ausw\xE4hlen":"Choisir moi-m\xEAme",Senkrecht:"Vertical",Sensor:"Capteur","Serifen-Uhr, warmes Wei\xDF, Bambus":"Horloge \xE0 empattements, blanc chaud, bambou",Sichtbarkeit:"Visibilit\xE9","Skript starten":"Ex\xE9cuter un script","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"Dur\xE9e pendant laquelle l'affichage reste apr\xE8s la fin du d\xE9clencheur.",Sonnig:"Ensoleill\xE9",sonnig:"ensoleill\xE9",Spalte:"Colonne",Spalten:"Colonnes",Speichern:"Enregistrer","Speichert \u2026":"Enregistrement \u2026",Sprache:"Langue",Standard:"Par d\xE9faut",Standbild:"Image fixe","Standbild neu laden (s)":"Recharger l'image fixe (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"Style StandBy, sobre, sauge",Standort:"Emplacement",Starkregen:"Forte pluie","startet immer wieder neu":"red\xE9marre sans cesse","Startkonfiguration anzeigen":"Afficher la configuration de d\xE9part",Status:"\xC9tat","Steht drau\xDFen":"Absent","Steht zuhause":"Gar\xE9 \xE0 la maison",Stil:"Style","Stil als YAML in die Zwischenablage kopiert.":"Style copi\xE9 dans le presse-papiers en YAML.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Style ci-dessous en YAML \u2013 s\xE9lectionnez pour copier.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Style appliqu\xE9 \u2013 rendez-le d\xE9finitif avec \xAB Enregistrer \xBB.","Stil-Farbe":"Couleur du style","Stil-Schrift":"Police du style",Strompreis:"Prix de l'\xE9lectricit\xE9","Strompreis heute":"Prix de l'\xE9lectricit\xE9 aujourd'hui","Stufe hinzuf\xFCgen":"Ajouter un palier",Stunde:"Heure",Stunden:"Heures","Stunden-Kurve":"Courbe horaire",St\u00E4rke:"Intensit\xE9",St\u00F6rung:"Panne","Szene aktivieren":"Activer la sc\xE8ne",Tag:"Jour",Tage:"Jours","Tage bis Abholung":"Jours avant la collecte","Tage voraus":"Jours \xE0 l'avance","Tage-Sensor":"Capteur de jours",Tagesbilanz:"Bilan du jour",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau ou https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 ou l'adresse d'un flux RSS",Teil:"Partie",Teile:"Parties","Teils bew\xF6lkt":"Partiellement nuageux",Temperatur:"Temp\xE9rature",Temperaturen:"Temp\xE9ratures",Tempo:"Vitesse","Tempo (px/s)":"Vitesse (px/s)",Termin:"Rendez-vous","Termin in den n\xE4chsten Tagen":"Rendez-vous dans les prochains jours",Termine:"Rendez-vous",Testen:"Tester",teuer:"cher",Text:"Texte","Text & Vorlage":"Texte & mod\xE8le","Text aus Entit\xE4t":"Texte d'une entit\xE9","Text danach":"Texte apr\xE8s","Text ohne Warnung":"Texte sans alerte","Text wenn alles ruhig":"Texte quand tout est calme","Text wenn nichts l\xE4uft":"Texte quand rien ne tourne",Textgr\u00F6\u00DFe:"Taille du texte","Tibber-Zuhause":"Logement Tibber","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Astuce : cliquez sur un widget pour le modifier.","Tippen zum Schlie\xDFen":"Toucher pour fermer",Titel:"Titre","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau en For\xEAt-Noire \u2013 village et Hasenhorn (image)",Ton:"Son",Tonne:"Poubelle",Tonnen:"Poubelles","Tonnen der n\xE4chsten \u2026 Tage":"Poubelles des \u2026 prochains jours",Trocken:"Sec",trocken:"sec","Trocken ab etwa {h} Uhr":"Sec \xE0 partir de {h}:00 environ",Uhr:"Horloge","Uhrzeit von \u2013 bis":"Heure de \u2013 \xE0","Uhrzeit {from}\u2013{to}":"Heure {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Heures s\xE9par\xE9es par des virgules ; chacune est une requ\xEAte \xE0 l'IA.",Umwelt:"Environnement",und:"et",ungesund:"malsain",unten:"bas",unter:"en dessous",Unterwegs:"En route",Unterzeile:"Sous-ligne",Unwetter:"Intemp\xE9ries","UV-Index":"Indice UV",Verbrauch:"Consommation",Verlauf:"Historique","Verlauf (Tage)":"Historique (jours)","Verlauf nicht verf\xFCgbar":"Historique indisponible","Verlauf wird geladen \u2026":"Chargement de l'historique \u2026",Verriegelt:"Verrouill\xE9",Verschl\u00FCsselung:"Chiffrement","Verstecktes Netz":"R\xE9seau masqu\xE9",Verwerfen:"Annuler les modifications","Voll um":"Plein \xE0","voll um {time}":"plein \xE0 {time}",Vollbild:"Plein \xE9cran","Vollbild (Klingel, Alarm)":"Plein \xE9cran (sonnette, alarme)","von Zustand":"depuis l'\xE9tat","von {n} geschlossen":"sur {n} ferm\xE9s","vor {n} h":"il y a {n} h","vor {n} min":"il y a {n} min","Vorher nachfragen":"Demander d'abord","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Version pr\xE9c\xE9dente charg\xE9e \u2013 restaurez-la avec \xAB Reprendre dans l'\xE9diteur \xBB et \xAB Enregistrer \xBB.","Vorherige Fassung laden":"Charger la version pr\xE9c\xE9dente",Vorlage:"Mod\xE8le","Vorlage (Jinja)":"Mod\xE8le (Jinja)","Vorlage l\xF6schen":"Supprimer le mod\xE8le","Vorlage nicht verf\xFCgbar":"Mod\xE8le indisponible","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Mod\xE8le \xAB {name} \xBB enregistr\xE9 \u2013 sous \xAB Mod\xE8les personnels \xBB.","Vorlage \u201E{name}\u201C l\xF6schen?":"Supprimer le mod\xE8le \xAB {name} \xBB ?",Vorschau:"Aper\xE7u","Vorschau (schnell)":"Aper\xE7u (rapide)",Waagerecht:"Horizontal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe n'est pas joignable : {error}","Ambiframe nicht erreichbar":"Ambiframe injoignable","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 mode secours","Wann?":"Quand ?","Warm \xFCber \xB0C":"Chaud au-dessus de \xB0C","Warn-Sensoren":"Capteurs d'alerte",Warnung:"Alerte","Warnung (rot)":"Alerte (rouge)","Warnung \u2192 Vollbild":"Alerte \u2192 plein \xE9cran",Warnungen:"Alertes","Waschmaschine fertig":"Lave-linge termin\xE9",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Ajouter une webcam","Webcam-Link":"Lien de la webcam","Wechsel nach (s)":"Changer apr\xE8s (s)","Weich (Unsch\xE4rfe)":"Doux (flou)","Weiter geht's":"Reprend","Weitere Ausl\xF6ser":"Autres d\xE9clencheurs","Weitere Werte":"Autres valeurs","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"Blanc et or \u2013 sombre sur noir, clair sur ivoire","Welches Display ist das?":"Quel affichage est-ce ?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein est (image, toutes les 10 min)","Wenn Ordner und Album leer sind":"Si le dossier et l'album sont vides",Wert:"Valeur","Wert wird blau, wenn er darunter liegt.":"La valeur devient bleue en dessous.","Werte-Liste":"Liste de valeurs",Wetter:"M\xE9t\xE9o","Wetter-Entit\xE4t fehlt":"Entit\xE9 m\xE9t\xE9o manquante","Widget hinzuf\xFCgen:":"Ajouter un widget :","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget copi\xE9 \u2013 collez-le sur une page avec \u2318V ou \xAB Coller \xBB.","Widget kopiert.":"Widget copi\xE9.","wie der Stil":"comme le style","wie Design":"comme le design","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Comme un magazine : grands empattements, papier, lignes fines","wie oben":"comme ci-dessus","wie Stil":"comme le style",Wiedergabe:"Lecture","Wiedergabe anhalten/fortsetzen":"Mettre en pause/reprendre la lecture","Wiedergabe/Pause":"Lecture/pause",Wiedergabeliste:"Liste de lecture","Wiederholen (\u21E7\u2318Z)":"R\xE9tablir (\u21E7\u2318Z)",Wind:"Vent",Windig:"Venteux","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Press\xE9 quand l'affichage ne se signale plus \u2013 p. ex. Fully \xAB Charger l'URL de d\xE9marrage \xBB.","Wird geladen \u2026":"Chargement \u2026","Wird heute abgeholt":"Collect\xE9 aujourd'hui","WLAN-QR-Code":"Code QR Wi-Fi","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"R\xE9afficher pendant la lecture ; vide ou 0 = seulement au changement de titre","W\xE4sche fertig":"Lessive termin\xE9e","YAML ist nicht lesbar: {error}":"YAML illisible : {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"p. ex. visites de la liti\xE8re, remis \xE0 z\xE9ro chaque jour","z. B. KI-Analyse der Kamera":"p. ex. analyse IA de la cam\xE9ra","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"p. ex. description IA ou titre d'alerte","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"p. ex. plusieurs d\xE9tecteurs de mouvement \u2013 un seul suffit","z. B. type: entities, entities: [light.kueche]":"p. ex. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"P. ex. heure 05:00\u201311:00 pour une page du matin. La condition propre de la page s'applique aussi.","z. B. \u201EGeocoded Location\u201C der Companion-App":"p. ex. \xAB Geocoded Location \xBB de l'application compagnon","Zahl \xFCber/unter":"Nombre au-dessus/en dessous",Zeile:"Ligne",Zeilen:"Lignes","Zeitraum (min)":"P\xE9riode (min)","Zeitraum (Stunden)":"P\xE9riode (heures)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Glisser ou les touches fl\xE9ch\xE9es d\xE9placent tout ensemble. \u21E7/\u2318-clic en retire un, \xC9chap annule la s\xE9lection.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Glisser pour d\xE9placer \xB7 point en bas \xE0 droite pour redimensionner \xB7 fl\xE8ches pour d\xE9placer, avec \u21E7 la taille \xB7 \u21E7/\u2318-clic s\xE9lectionne plusieurs \xB7 \u2318C/\u2318V copier-coller \xB7 \u232B supprime \xB7 \u2318D duplique \xB7 \u2318Z annule","Ziel-Entit\xE4t":"Entit\xE9 cible",Zoom:"Zoom",zu:"ferm\xE9","zu feucht":"trop humide","zu Zustand":"vers l'\xE9tat","zu Zustand (optional)":"vers l'\xE9tat (facultatif)","Zugspitze (Bild, alle 10 min)":"Zugspitze (image, toutes les 10 min)",Zuhause:"Maison","Zuletzt fertig {when}":"Derni\xE8re fin {when}","zuletzt {time}":"dernier {time}","Zur\xFCck nach (s)":"Retour apr\xE8s (s)","Zur\xFCck zu Ambiframe":"Retour \xE0 Ambiframe",Zusammenfassung:"R\xE9sum\xE9",Zusatzwert:"Valeur suppl\xE9mentaire","Zusatzwert Name":"Nom de la valeur suppl\xE9mentaire",Zustand:"\xC9tat","Zustand ist":"L'\xE9tat est","Zustand ist nicht":"L'\xE9tat n'est pas","Zwischendurch alle (min)":"Entre-temps toutes les (min)",z\u00E4hlen:"compter","Z\xE4hler \u201Eheute\u201C":"Compteur \xAB aujourd'hui \xBB","{day} Abend":"{day} soir","{entity} ge\xE4ndert ({n} min)":"{entity} modifi\xE9 ({n} min)","{entity} in {n} Tagen":"{entity} dans {n} jours","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} en marche","{name} offen":"{name} ouvert","{name} \u2013 wirklich?":"{name} \u2013 vraiment ?","{n} % aus eigener Sonne":"{n} % d'\xE9nergie solaire propre","{n} % Wahrscheinlichkeit":"{n} % de probabilit\xE9","{n} Lichter an":"{n} lumi\xE8res allum\xE9es","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets s\xE9lectionn\xE9s","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets copi\xE9s \u2013 collez-les sur une page avec \u2318V ou \xAB Coller \xBB.","{n} Widgets kopiert.":"{n} widgets copi\xE9s.","{time} Uhr":"{time}","\xE4ltere Version":"ancienne version","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Cam\xE9ra publique au lieu d'une cam\xE9ra HA \u2013 suggestions en cliquant dans le champ",\u00D6ffnen:"Ouvrir","\xD8 {n} pro Tag":"\xD8 {n} par jour",\u00FCber:"haut",\u00DCberblenden:"Fondu",\u00DCberblick:"Vue d'ensemble",\u00DCbergang:"Transition","\xDCbergang (s)":"Transition (s)",\u00FCbermorgen:"apr\xE8s-demain",\u00DCbernehmen:"Reprendre","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Repris \u2013 rendez-le d\xE9finitif avec \xAB Enregistrer \xBB.",\u00DCberschrift:"Titre","\xDCberschrift klein":"Petit titre","\u2013 w\xE4hlen \u2013":"\u2013 choisir \u2013","\u2026 aus Attribut":"\u2026 d'un attribut","\u2026 oder Bild einer Entit\xE4t":"\u2026 ou image d'une entit\xE9","\u2026 oder Webcam-Link":"\u2026 ou lien de webcam",Fran\u00E7ais:"Fran\xE7ais","Le Figaro (FR)":"Le Figaro (FR)","Le Monde (FR)":"Le Monde (FR)","NOS (NL)":"NOS (NL)","NU.nl (NL)":"NU.nl (NL)",Nederlands:"Nederlands","RFI (FR)":"RFI (FR)","VRT NWS (BE)":"VRT NWS (BE)","franceinfo (FR)":"franceinfo (FR)","{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.":"{names} : r\xE9glage clair/sombre propre \u2013 il s'applique l\xE0.","F\xFCr alle \xFCbernehmen":"Appliquer \xE0 tous","{names}: eigener Stil \u2013 dort gilt dieser.":"{names} : style propre \u2013 il s'applique l\xE0.","Kamera wird verbunden \u2026":"Connexion \xE0 la cam\xE9ra \u2026",Abdunkeln:"Assombrir","normal \u2013 Text gut lesbar":"normal \u2013 texte bien lisible",leicht:"l\xE9ger",kr\u00E4ftig:"fort","aus \u2013 Originalbild":"d\xE9sactiv\xE9 \u2013 image d'origine","Dunkler Verlauf unten links, damit Uhr und Text auf hellen Bildern lesbar bleiben.":"D\xE9grad\xE9 sombre en bas \xE0 gauche pour que l'horloge et le texte restent lisibles sur les images claires.","0\u20133 (DWD)":"0\u20133 (DWD)",Abfahrten:"D\xE9parts","Abfahrten, die nicht mehr erreichbar sind, ausblenden":"Masquer les d\xE9parts qu\u2019on ne peut plus attraper","Alles im gr\xFCnen Bereich":"Tout va bien","Attribut mit der Liste":"Attribut contenant la liste","Ausblenden nach (Stunden)":"Masquer apr\xE8s (heures)","Bildwechsel (ms)":"Intervalle d\u2019image (ms)",Countdown:"Compte \xE0 rebours","Datum-Helfer, Zeitstempel oder Kalender (n\xE4chster Termin)":"Assistant date, horodatage ou calendrier (prochain \xE9v\xE9nement)","Eigene Karte (Adresse)":"Carte personnalis\xE9e (adresse)",Ereignis:"\xC9v\xE9nement",Farbig:"En couleur","Feinstaub PM10":"Particules PM10","Feinstaub PM2,5":"Particules PM2,5","Fu\xDFweg (Minuten)":"Trajet \xE0 pied (minutes)","Gleis zeigen":"Afficher le quai","Gleis {n}":"Quai {n}","Kein Ort \u2013 Zuhause in HA eintragen oder Breite/L\xE4nge angeben.":"Aucun lieu \u2013 d\xE9finissez votre domicile dans HA ou indiquez latitude/longitude.","Kein Timer gefunden \u2013 in HA unter Helfer einen Timer anlegen.":"Aucun minuteur \u2013 cr\xE9ez-en un dans HA sous Entr\xE9es.","Kein Timer l\xE4uft":"Aucun minuteur en cours","Keine Abfahrten":"Aucun d\xE9part","Keine Nachrichten":"Aucun message","Keine Pollen- oder Luftsensoren gefunden.":"Aucun capteur de pollen ou de qualit\xE9 de l\u2019air trouv\xE9.","Keinen \xD6PNV-Sensor gefunden \u2013 unter Sensoren eintragen.":"Aucun capteur de transports trouv\xE9 \u2013 ajoutez-en un sous Capteurs.","Kn\xF6pfe zum Starten, durch Komma getrennt \u2013 leer lassen f\xFCr keine":"Boutons de d\xE9marrage, s\xE9par\xE9s par des virgules \u2013 vide pour aucun",Land:"Pays","Leer = Textspeicher mit \u201Epinnwand\u201C, \u201Enachricht\u201C oder \u201Enotiz\u201C im Namen":"Vide = textes dont le nom contient \xAB board \xBB, \xAB message \xBB ou \xAB note \xBB","Leer = alle Timer aus HA (Helfer \u2192 Timer)":"Vide = tous les minuteurs de HA (Entr\xE9es \u2192 Minuteur)",Luftqualit\u00E4tsindex:"Indice de qualit\xE9 de l\u2019air",L\u00E4nge:"Longitude",Nah:"Proche","Nichts geplant":"Rien de pr\xE9vu","Nur Mond":"Lune seulement","Nur Sonne":"Soleil seulement","Nur diese Linien":"Seulement ces lignes","Nur erh\xF6hte Werte":"Seulement les niveaux \xE9lev\xE9s","Oder unten eine Entit\xE4t w\xE4hlen":"Ou choisissez une entit\xE9 ci-dessous",Ozon:"Ozone",Pinnwand:"Tableau d\u2019affichage",Pollen:"Pollen","Pollen & Luft":"Pollen & air","Pollen-Skala":"\xC9chelle de pollen",Regenradar:"Radar de pluie",Region:"R\xE9gion","Ruhende Timer zeigen":"Afficher les minuteurs inactifs","Schnellstart (Minuten)":"D\xE9marrage rapide (minutes)","Schnellstart startet":"Le d\xE9marrage rapide utilise","Schriftgr\xF6\xDFe (px)":"Taille du texte (px)",Sensoren:"Capteurs","Sonne & Mond":"Soleil & lune","Sonne und Mond":"Soleil et lune",Stickstoffdioxid:"Dioxyde d\u2019azote",Symbol:"Ic\xF4ne","Tage bis":"jours avant","Text ohne Nachricht":"Texte sans message",Timer:"Minuteur",Umgebung:"Alentours",Urlaub:"Vacances","Vergangene zeigen":"Afficher les pass\xE9s","Vollmond {when}":"Pleine lune {when}","Von einer \xD6PNV-Integration (z. B. HAFAS, DB, Wiener Linien) \u2013 leer = automatisch":"D\u2019une int\xE9gration de transports (p. ex. HAFAS, SNCF, DB) \u2013 vide = automatique",bereit:"pr\xEAt","erster Timer":"premier minuteur","noch {n} Tage":"encore {n} jours","noch {n} Wochen":"encore {n} semaines","vor {n} Tagen":"il y a {n} jours","wie gestern":"comme hier","{h} h {m} min Tageslicht":"{h} h {m} min de jour","{n} % beleuchtet":"{n} % \xE9clair\xE9e","{n} min":"{n} min","{n} min zu gestern":"{n} min par rapport \xE0 hier",Neumond:"Nouvelle lune","Zunehmende Sichel":"Premier croissant","Erstes Viertel":"Premier quartier","Zunehmender Mond":"Gibbeuse croissante",Vollmond:"Pleine lune","Abnehmender Mond":"Gibbeuse d\xE9croissante","Letztes Viertel":"Dernier quartier","Abnehmende Sichel":"Dernier croissant",gering:"faible",schlecht:"mauvaise","sehr schlecht":"tr\xE8s mauvaise","Benachrichtigung in Home Assistant, wenn sich das Display so lange nicht meldet \u2013 verschwindet von selbst, sobald es wieder da ist. Ausgeschalteter Bildschirm z\xE4hlt nicht.":"Notification dans Home Assistant si l\u2019\xE9cran ne se manifeste pas pendant ce temps \u2013 elle dispara\xEEt d\u2019elle-m\xEAme \xE0 son retour. Un \xE9cran \xE9teint ne compte pas.","Melden, wenn offline (Minuten)":"Pr\xE9venir si hors ligne (minutes)","Nur aktuell":"Actuel seulement",Zeitraum:"P\xE9riode"};var gs={"% Luftfeuchte":"% luchtvochtigheid","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = bij elke wijziging \u2013 bijv. voor knoppen en event.*-entiteiten","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = livebeeld","1 Licht an":"1 lamp aan","12 / Vollbild 15":"12 / volledig scherm 15","168 = eine Woche, 720 = 30 Tage":"168 = \xE9\xE9n week, 720 = 30 dagen",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"vanaf","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"Vanaf de laatste trigger; zolang een sensor aan staat, blijft de pagina sowieso.","ab Wert":"vanaf waarde","ab {n}":"vanaf {n}",Abbrechen:"Annuleren",Abendstimmung:"Avondsfeer",Abholung:"Ophaling","Abholung {when}":"Ophaling {when}","Abklingzeit (s)":"Afkoeltijd (s)","Achse bis":"As tot","Achse von":"As vanaf",Akku:"Batterij","Akku %":"Batterij %",Aktion:"Actie","Aktion (domain.dienst)":"Actie (domain.service)","Aktion/Skript ausf\xFChren":"Actie/script uitvoeren",Aktiv:"Actief","Aktuellen Stil speichern":"Huidige stijl opslaan","Aktuellen Wert zeigen":"Huidige waarde tonen","Aktueller Preis":"Huidige prijs","Aktueller Raum":"Huidige ruimte",Akzent:"Accent","Akzent (Gold)":"Accent (goud)",Akzentfarbe:"Accentkleur","Alarm (eindringlich, wiederholt)":"Alarm (dringend, herhaalt)","Alle Bewegungs-/Pr\xE4senzmelder":"Alle bewegings-/aanwezigheidssensoren","Alle Fenster- und T\xFCrsensoren":"Alle raam- en deursensoren","Alle von \u2026 (und)":"Allemaal \u2026 (en)","Alles ruhig":"Alles rustig","Als eigene Seitenvorlage speichern":"Opslaan als eigen paginasjabloon","Als eigene Vorlage speichern":"Opslaan als eigen sjabloon","Als Karte":"Als kaart","Als Vorlage":"Als sjabloon","Als YAML kopieren":"Kopi\xEBren als YAML","Am g\xFCnstigsten":"Goedkoopst","am {day}":"op {day}",An:"Aan",an:"aan","An/Aus":"Aan/uit",Angehalten:"Gepauzeerd",Angesteckt:"Ingeplugd",Animation:"Animatie",Antippen:"Tikken",Anwenden:"Toepassen","Anzeige (Ring)":"Meter (ring)","Anzeige, Editor und KI-Zusammenfassung":"Weergave, editor en AI-samenvatting",Anzeigefehler:"weergavefout",Art:"Soort",Attribut:"Attribuut","Attribut (optional)":"Attribuut (optioneel)","Auch nachts":"Ook 's nachts","Auch pausiert zeigen":"Ook tonen bij pauze","Auf dem Ger\xE4t \xF6ffnen":"Openen op het apparaat",Auftrag:"Opdracht","Auftrag/Druck":"Opdracht/print",Aurora:"Aurora",Aus:"Uit",aus:"uit","aus Home Assistant eingeschaltet":"ingeschakeld vanuit Home Assistant",Ausl\u00F6ser:"Trigger",Ausnehmen:"Uitsluiten",Ausrichtung:"Ori\xEBntatie",Auto:"Auto",automatisch:"automatisch","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatisch (per apparaat, ook bij draaien)","automatisch (wie der HA-Benutzer)":"automatisch (zoals de HA-gebruiker)","Automatisch anordnen":"Automatisch indelen","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Automatisch onder elkaar \u2013 verschuiven maakt een eigen indeling","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatisch \u2013 licht overdag, donker na zonsondergang","automatisch: Gemini":"automatisch: Gemini",Balken:"Balken",Bedienmodus:"Bedieningsmodus","1 Woche":"1 week","12 Stunden":"12 uur","2 Tage":"2 dagen","24 Stunden":"24 uur","6 Stunden":"6 uur",Gestern:"Gisteren","Keine Mitteilungen":"Geen meldingen",Mitteilungen:"Meldingen","Mitteilungen ({n})":"Meldingen ({n})",Mitteilungszentrale:"Meldingencentrum","Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C.":"Overzicht van gebeurtenissen \u2013 in het snelmenu (lang indrukken) onder \u201EMeldingen\u201D.","Verlauf leeren":"Overzicht wissen","Verlauf reicht zur\xFCck":"Overzicht reikt terug","0 = bei Pause sofort ausblenden":"0 = bij pauze direct verbergen","1 Stunde":"1 uur","1 Tag":"1 dag","15 Minuten":"15 minuten","2 Erinnerungen":"2 herinneringen","2 Stunden":"2 uur","3 Erinnerungen":"3 herinneringen","30 Minuten":"30 minuten","4 Erinnerungen":"4 herinneringen","4 Stunden":"4 uur","5 Erinnerungen":"5 herinneringen","8 Stunden":"8 uur","Alle entfernen":"Alles wissen","Ausblenden nach (s)":"Verbergen na (s)","Cover zeigen":"Hoes tonen",Ecke:"Hoek","Erinnerung oben rechts":"Herinnering rechtsboven","Erinnerungen oben rechts":"Herinneringen rechtsboven","Fortschritt zeigen":"Voortgang tonen","Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft.":"Per nummer: na zoveel seconden verbergen, bij het volgende nummer weer tonen. Leeg = zolang er iets speelt.","Nach Pause noch (s)":"Na pauze nog (s)","Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht.":"Na de melding blijft rechtsboven een kleine herinnering staan \u2013 blijvend, een tijdje of helemaal niet.","Stapeln ab":"Stapelen vanaf","Weg, wenn das Ger\xE4t wieder startet":"Weg als het apparaat weer start","Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf.":"Zoals meldingen op iOS: een stapel met een getal, tik om uit te klappen.","Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt.":"Bijv. de wasmachine start weer \u2013 dan is de oude herinnering afgehandeld.","Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis":"Bijv. \u201EWas klaar\u201D na een melding","bleibt, bis man sie antippt":"blijft tot erop getikt wordt",dauerhaft:"blijvend",gro\u00DF:"groot","keine Erinnerung":"geen herinnering",klein:"klein","nie stapeln":"nooit stapelen","oben links":"linksboven","oben rechts":"rechtsboven","ohne (nur Text und Cover)":"geen (alleen tekst en hoes)","unten links":"linksonder","unten rechts":"rechtsonder","+ Ton hinzuf\xFCgen":"+ Geluid toevoegen","Abstand (s)":"Tussenpoos (s)","Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.":"Upload een audiobestand in HA onder Media \u2192 Lokale media en kies het hier \u2013 of vul een link in. Daarna is het geluid bij elke gebeurtenis te kiezen.","Eigene T\xF6ne":"Eigen geluiden","Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.":"Klik in het veld voor eigen en meegeleverde geluiden \u2013 of vul een link in (/local/geluid.mp3, media-source://\u2026). Eigen geluiden leg je links aan onder \u201EEigen geluiden\u201D.","Mein Ton":"Mijn geluid",Wiederholen:"Herhalen","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)":"tot erop getikt of gesloten wordt (max. 2 min)","eigener Ton":"eigen geluid",einmal:"\xE9\xE9n keer","einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)":"\xE9\xE9n keer (het geluid \u201EAlarm\u201D herhaalt bij een alarm op volledig scherm tot erop getikt wordt)","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australi\xEB","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Afbeeldingen en bijschriften van de Bing-afbeeldingen van de dag","Bing-Region":"Bing-regio",Brasil:"Brazili\xEB","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Duitsland","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"Een \u201Eartikel van de dag\u201D bestaat alleen in deze talen.",Espa\u00F1a:"Spanje","FAZ (DE)":"FAZ (DE)",France:"Frankrijk","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"In de videostream (AirPlay, camera) staat de nieuwsticker altijd uit \u2013 daar zou hij stilstaan of haperen.",India:"India",Italia:"Itali\xEB","NPR (US)":"NPR (US)","Nachrichten-Laufband":"Nieuwsticker",Nederland:"Nederland","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Zwitserland","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"Verenigd Koninkrijk","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Kies een suggestie (bijv. bbc, guardian, tagesschau) of vul het adres van een willekeurige RSS-/Atom-feed in. Leeg = bronnen in de taal van de weergave.","Wikipedia-Sprache":"Wikipedia-taal","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 Duits, citaat van de week","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 Engels, citaat van de dag","automatisch (aus beim Fernseher)":"automatisch (uit op tv's)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 of https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"zoals de weergave","wie die Sprache von Home Assistant":"volgens de taal van Home Assistant",\u00D6sterreich:"Oostenrijk","wie alle":"zoals alle",Automatisch:"Automatisch",Hell:"Licht",Dunkel:"Donker","Zitat der Woche":"Citaat van de week",Zitat:"Citaat","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Citaat: in het Duits het citaat van de week (Wikiquote), in het Engels het citaat van de dag (ZenQuotes)","+ Neu":"+ Nieuw",Quer:"Liggend",Hoch:"Staand","Eigene Farben zur\xFCcksetzen":"Eigen kleuren resetten","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"Nog geen gebeurtenissen \u2013 \u201E+ Nieuw\u201D hierboven.","1 Hinweis":"1 opmerking","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Bing-afbeeldingen van de dag ook tussen je eigen foto's","nein \u2013 nur, wenn nichts Eigenes da ist":"nee \u2013 alleen als er geen eigen foto's zijn","Bing-Bilder untermischen":"Bing-afbeeldingen ertussen mengen","Jetzt: {what} bis {time}":"Nu: {what} tot {time}","Termine der n\xE4chsten \u2026 Stunden":"Afspraken in de komende \u2026 uur","N\xE4chster Termin":"Volgende afspraak","Guten Morgen":"Goedemorgen","Leer = die ersten Kalender automatisch":"Leeg = eerste agenda's automatisch","Guten Abend":"Goedenavond","Guten Tag":"Goedemiddag","Keine Abholung":"Geen ophaling","Regenrisiko {n} %":"Kans op regen {n} %","Regen ab etwa {time} Uhr":"Regen vanaf ongeveer {time}","Wetter heute":"Weer vandaag","Heute keine Termine":"Vandaag geen afspraken","Termine heute":"Afspraken vandaag","Tagesvorschau am Morgen":"Dagvoorbeeld 's ochtends",Tagesvorschau:"Dagvoorbeeld","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Maakt de schakelaar \u201EOp de tv\u201D aan \u2013 stuurt de weergave via AirPlay naar de Apple TV","Fernseher (Apple TV)":"Tv (Apple TV)","Fenster zu! Es regnet":"Ramen dicht! Het regent","Nur zeigen, wenn":"Alleen tonen als","z. B. Fenster \u2013 die offenen werden genannt":"bijv. ramen \u2013 de open ramen worden genoemd","Nur wenn eine davon an ist":"Alleen als een van deze aan staat","Endzeit statt Restzeit":"Eindtijd in plaats van resterende tijd","z. B. aktueller Raum des Saugers":"bijv. de huidige ruimte van de robotstofzuiger",Zusatz:"Toevoeging","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"speelt","Es regnet":"Het regent","noch {time}":"nog {time}","Restzeit oder Endzeit":"Resterende tijd of eindtijd","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Leeg = gebruikelijke \u201Eloopt\u201D-toestanden","L\xE4uft bei Zustand":"Loopt bij toestand","Zeigen bei Zustand":"Tonen bij toestand","Wiedergabe (z. B. Apple TV)":"Weergave (bijv. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Apparaat loopt \u2013 met resterende tijd","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Melding \u2013 alleen als waar (bijv. regen)","L\xE4uft gerade (ganze Seite)":"Speelt nu (hele pagina)","Ganze Seite mit gro\xDFem Cover":"Hele pagina met grote hoes",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, uitzicht over de Waddenzee en de Halligen (afbeelding)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, Zwarte Woud \u2013 Todtnauer H\xFCtte (afbeelding)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Saarland \u2013 westoever met jachthaven (afbeelding)",Saugkarte:"Schoonmaakkaart","Leer = Karte des Saugers automatisch":"Leeg = eigen kaart van de stofzuiger","Gro\xDFe Karte darunter":"Grote kaart eronder",Ausblenden:"Verbergen","Neben jedem Sauger":"Naast elke stofzuiger","Kleine Karten":"Kleine kaarten","Tagesinhalt (Wikipedia, Zitat)":"Dagelijkse inhoud (Wikipedia, citaat)","Wikipedia-Artikel des Tages":"Wikipedia-artikel van de dag","Zitat des Tages":"Citaat van de dag","Artikel des Tages \xB7 Wikipedia":"Artikel van de dag \xB7 Wikipedia","Mit Bild":"Met afbeelding","Ohne Bild":"Zonder afbeelding",Inhalt:"Inhoud",Anzahl:"Aantal","Energiez\xE4hler (kWh)":"Energiemeter (kWh)","Gr\xF6\xDFte Verbraucher":"Grootste verbruikers","Gr\xF6\xDFte Verbraucher heute":"Grootste verbruikers vandaag","Heute noch kein Verbrauch gemessen":"Vandaag nog geen verbruik gemeten","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Leeg = de afzonderlijke apparaten uit het energiedashboard van Home Assistant","Wird berechnet \u2026":"Wordt berekend \u2026","Richtung umkehren":"Richting omkeren","Wenn der Antrieb offen und zu andersherum meldet":"Als de motor open en dicht andersom meldt",ausgefahren:"uitgeschoven",eingefahren:"ingeschoven","Gilt f\xFCr":"Geldt voor","Alle Displays":"Alle weergaven","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"\u201E{name}\u201D vormgeven: wat je hier instelt, geldt alleen voor deze weergave. Leeg = zoals bij alle weergaven.","Stil wie alle Displays":"Stijl zoals alle weergaven","Alle Abweichungen dieses Displays zur\xFCcksetzen":"Alle afwijkingen van deze weergave resetten","wie alle Displays":"zoals alle weergaven","Mit Stil-Vorschau gestalten":"Vormgeving met stijlvoorbeeld","4K und Full HD (zwei Kameras)":"4K en Full HD (twee camera's)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera's \u201EAmbiframe {name} Videostream\u201D (4K) en \u201E\u2026 Videostream Full HD\u201D \u2013 in een dashboard, in Apple Woning (HomeKit Bridge) of via \u201Ecamera.play_stream\u201D op de Apple TV.",Aufl\u00F6sung:"Resolutie","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"Voor oled-schermen: het beeld verschuift om de paar minuten onmerkbaar een paar pixels, zodat niets inbrandt. Het best samen met \u201Edonker\u201D.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera \u201EAmbiframe {name} Videostream\u201D \u2013 in een dashboard, in Apple Woning (HomeKit Bridge) of via \u201Ecamera.play_stream\u201D op de Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Maakt de camera \u201EVideostream\u201D aan \u2013 bijv. voor Apple TV (AirPlay), Apple Woning of tv's zonder moderne browser. Vereist de add-on \u201EPuppet\u201D. Er wordt alleen gerenderd zolang iemand kijkt.","Neues Bild alle (s)":"Nieuw beeld elke (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Alleen nodig als Puppet niet gevonden wordt, bijv. http://homeassistant.local:10000","OLED-Schutz":"Oled-bescherming","Puppet-Adresse":"Puppet-adres",Videostream:"Videostream","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"Alles in orde","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"Alles in orde: alle entiteiten aanwezig, apparaten verbonden, foto's beschikbaar.","Das iCloud-Album liefert keine Fotos":"Het iCloud-album levert geen foto's","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"De fotolijst heeft geen foto's (map en album leeg, Bing uit)","Der Fotoordner ist leer oder fehlt":"De fotomap is leeg of ontbreekt","Display \u201E{name}\u201C":"Weergave \u201E{name}\u201D","Display \u201E{name}\u201C meldet sich nicht":"Weergave \u201E{name}\u201D reageert niet","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"Weergave \u201E{name}\u201D reageert al {n} uur niet","Display \u201E{name}\u201C war noch nie verbunden":"Weergave \u201E{name}\u201D is nog nooit verbonden geweest","Ereignis \u201E{name}\u201C":"Gebeurtenis \u201E{name}\u201D","Fotos werden gez\xE4hlt \u2026":"Foto's tellen \u2026",Gesundheitscheck:"Controle","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"Controle: ontbrekende entiteiten, apparaten, foto's","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"AI-samenvatting staat aan, maar er is geen AI (ai_task) in Home Assistant","Seite \u201E{name}\u201C":"Pagina \u201E{name}\u201D","Seite \u201E{name}\u201C wird nirgends gezeigt":"Pagina \u201E{name}\u201D wordt nergens getoond","{n} Hinweise":"{n} opmerkingen","{id} gibt es nicht (mehr) \u2013 {where}":"{id} bestaat niet (meer) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} is niet beschikbaar \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\u201E{name}\u201D heeft nog een oudere versie","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\u201E{name}\u201D staat in de noodmodus: {reason}","1 Stunde stumm":"1 uur stil",Anhalten:"Pauzeren",Dunkler:"Donkerder","Eine Stunde stumm":"Een uur stil",Heller:"Lichter","Helligkeit {n} %":"Helderheid {n} %",Schlie\u00DFen:"Sluiten",Schnellmen\u00FC:"Snelmenu","T\xF6ne an":"Geluid aan","T\xF6ne wieder an":"Geluid weer aan","Weiter abspielen":"Verder","Alle Batterien in Ordnung":"Alle batterijen in orde","Ger\xE4te und schwache Batterien":"Apparaten en lege batterijen","Nur Ger\xE4te":"Alleen apparaten","Nur schwache Batterien":"Alleen lege batterijen",Zeigen:"Tonen","+ {n} weitere":"+ nog {n}",Akkus:"Batterijen",Akkustand:"Batterijniveau","Batterie wechseln":"Batterij vervangen","Ger\xE4te (immer zeigen)":"Apparaten (altijd tonen)","H\xF6chstens Zeilen Zubeh\xF6r":"Max. regels accessoires","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Leeg = alle telefoons, tablets en horloges uit de HA-app automatisch","Zubeh\xF6r zeigen unter (%)":"Accessoires tonen onder (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessoires: alle batterijen in orde",schwach:"laag","Pfeile zum Bl\xE4ttern":"Pijlen om te bladeren","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Subtiel linksonder en rechtsonder: vorige en volgende pagina zonder Ambiframe te verlaten","Vorherige Seite":"Vorige pagina","N\xE4chste Seite":"Volgende pagina","Karte unten rechts (kurz beim Liedwechsel)":"Kaart rechtsonder (kort bij nummerwissel)","Vollbild (kurz beim Liedwechsel)":"Volledig scherm (kort bij nummerwissel)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Minikaart \u2013 blijft zolang er iets speelt","Eigenes QR-Bild":"Eigen QR-afbeelding","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"In plaats van netwerknaam en wachtwoord een kant-en-klare QR-afbeelding, bijv. uit je router (link of data:image/\u2026)","Adresse kopieren":"Adres kopi\xEBren","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Alles in \xE9\xE9n oogopslag: foto's, weer, afspraken, afval, huishouden en energie. Tikken opent het dashboard.","Ambiframe als Bildschirmschoner":"Ambiframe als schermbeveiliging","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe loopt altijd; tikken toont het HA-dashboard, daarna keert het vanzelf terug.",Anh\u00F6ren:"Beluisteren","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Beweging aan de deur \u2192 camera als beeld-in-beeld","Bing-Bilder, wenn Ordner und Album leer sind":"Bing-afbeeldingen als map en album leeg zijn","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"Het profiel kiest passende pagina's, bediening, geluiden en uiterlijk. Alles is achteraf aan te passen.","Dashboard \xFCber Ambiframe":"Dashboard over Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Deze weergave kopi\xEBren met alle instellingen","Display \u201E{name}\u201C mit {n} Seiten":"Weergave \u201E{name}\u201D met {n} pagina's","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"Een rustig beeld \u2013 dat alleen iets zegt als er iets gebeurt",Fernseher:"Tv","Fertig \u2013 speichern":"Klaar \u2013 opslaan","Fertig!":"Klaar!",Flur:"Gang","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"Foto's-app \u2192 album delen \u2192 \u201EOpenbare website\u201D aanzetten \u2192 link kopi\xEBren.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk gevonden: Ambiframe stelt de startpagina en schermbeveiliging zelf in en herstart de tablet als hij vastloopt.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully toont het dashboard; na een minuut zonder aanraking verschijnt Ambiframe. Deurbel en camera halen het direct naar voren.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"Voor de fotolijst. Map en album worden gemengd; zonder beide toont Ambiframe de Bing-afbeeldingen van de dag.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Gevonden in je Home Assistant. Geluiden zijn subtiel en passen bij de vormgeving \u2013 druk op \u25B6 om te luisteren.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Apparaat klaar \u2192 melding en herinnering","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Grote fotolijst: foto's, webcams, weer, nieuws. Donker en rustig (spaart oled), zonder bediening en geluid.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 Media \u2192 Lokale media \u2192 map \u201Eambiframe\u201D aanmaken en foto's uploaden.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"In een paar stappen richt je je eerste weergave in: waar het hangt, wat het toont, waarop het reageert. Alles is later in de editor aan te passen.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"Geen bediening \u2013 bijv. voor de tv.","Klingel \u2192 Vollbild mit Kamera":"Deurbel \u2192 volledig scherm met camera",Kopie:"kopie","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"In \xE9\xE9n oogopslag bij het langslopen: klok, weer, afval en wie er thuis is \u2013 grote tekst.",K\u00FCche:"Keuken","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Zachter dan de deurbel, 's nachts stil (22\u20137 uur).","Neue Seiten dazu":"Nieuwe pagina's toevoegen","Nur anzeigen":"Alleen weergave","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Rustig en donker: klok, foto's, weer. Alleen de deurbel laat van zich horen \u2013 's avonds zacht, 's nachts stil.",Schlafzimmer:"Slaapkamer","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Apparaat instellen: open dit adres in de browser van de tablet of tv (in Fully als start-URL) en meld je \xE9\xE9n keer aan bij Home Assistant.","Sp\xFClmaschine fertig":"Vaatwasser klaar","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Tip: met Fully Kiosk (en de HA-integratie ervan) richt Ambiframe de tablet zelf in.","Trockner fertig":"Droger klaar","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Voorgeselecteerd per profiel. De fotolijst wisselt af met de infopagina's.","Was soll das Display zeigen?":"Wat moet de weergave tonen?",Weiter:"Verder","Willkommen bei Ambiframe":"Welkom bij Ambiframe","Wo h\xE4ngt das Display?":"Waar hangt de weergave?","Woher kommen die Fotos?":"Waar komen de foto's vandaan?","Worauf soll es reagieren?":"Waarop moet het reageren?",Zur\u00FCck:"Terug","ohne Ton":"geen geluid","{n} neue Ereignisse":"{n} nieuwe gebeurtenissen",\u00DCberspringen:"Overslaan","Eigenes CSS (nur dieses Display)":"Eigen CSS (alleen deze weergave)","Eigenes Design":"Eigen vormgeving","Erg\xE4nzt das CSS aus dem Design.":"Wordt toegevoegd aan de CSS uit de vormgeving.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"Geen geluiden op deze weergave \u2013 meldingen blijven","Leer = wie Design":"Leeg = zoals vormgeving","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Alleen wat hier ingesteld is, wijkt af van de vormgeving \u2013 leeg betekent \u201Ezoals vormgeving\u201D.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Schaalt het volume van gebeurtenissen; in Fully het mediavolume van de tablet",Stumm:"Stil",T\u00F6ne:"Geluiden","Z. B. media-source://media_source/local/kueche":"Bijv. media-source://media_source/local/keuken",Bedienung:"Bediening","Dashboard \xFCber Ambiframe (Antippen)":"Dashboard over Ambiframe (tikken)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Dashboard in Fully, Ambiframe als schermbeveiliging","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"Schermbeveiliging: Fully toont het dashboard; na de wachttijd verschijnt Ambiframe. Deurbel en camera halen Ambiframe direct naar voren. Fully wordt automatisch ingericht.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"Tijd zonder aanraking tot Ambiframe terugkeert",bedingt:"voorwaardelijk",Bedingung:"Voorwaarde","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Voorwaarden, uiterlijk en tikacties staan in de modus \u201EUitgebreid\u201D (rechtsboven).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"Telkens de volgende als de pagina verschijnt \u2013 vervangt camera en link hierboven","Beim Antippen":"Bij tikken","Beim langen Dr\xFCcken":"Bij lang indrukken",beliebig:"willekeurig",Bereit:"Klaar","Besuche heute":"bezoeken vandaag",Bewegung:"Beweging","Bewegung erkannt":"Beweging gedetecteerd","Bewegung \u2192 Bild-im-Bild":"Beweging \u2192 beeld-in-beeld","Bewegung \u2192 Seite":"Beweging \u2192 pagina","Bewegung \u2192 Seite zeigen":"Beweging \u2192 pagina tonen",Bewertung:"Beoordeling",Bew\u00F6lkt:"Bewolkt",Bezeichnung:"Label",Bild:"Afbeelding","Bild neu laden (s)":"Afbeelding opnieuw laden (s)","Bild nicht ladbar":"Afbeelding kon niet worden geladen","Bild-im-Bild":"Beeld-in-beeld","Bild-im-Bild (Bewegung)":"Beeld-in-beeld (beweging)","Bild-Link":"Afbeeldingslink","Bild-Link oder Entit\xE4t w\xE4hlen":"Kies een afbeeldingslink of entiteit",Bilderrahmen:"Fotolijst","Bildschirm aus":"Scherm uit",Bildunterschrift:"Bijschrift","Bing-Bilder":"Bing-afbeeldingen",bis:"tot","Bis {hi}\xB0, nachts {lo}\xB0":"Tot {hi}\xB0, 's nachts {lo}\xB0","bis {when}":"tot {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Blijft daarna als kleine herinnering rechtsboven staan.","Bleibt vorerst nass":"Blijft voorlopig nat",Breite:"Breedte",Cover:"Hoes","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 strand en wad (YouTube-livebeeld)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Pas daarna weer tonen \u2013 tegen aanhoudend triggeren.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"Mag een sjabloon zijn, bijv. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"Mag een sjabloon zijn.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"Mag sjablonen bevatten, bijv. {{ states('sensor.outside') }} \xB0C \u2013 wordt live bijgewerkt.",Darstellung:"Uiterlijk",Dashboard:"Dashboard","Daten (YAML, optional)":"Gegevens (YAML, optioneel)",Datum:"Datum",Dauer:"Duur","Dauer (s)":"Duur (s)","Dauer in Sekunden (leer = Seitendauer)":"Duur in seconden (leeg = paginaduur)","Davor zeigt die Bilanz den Vortag":"Daarvoor toont de samenvatting de vorige dag","Deckkraft (%)":"Dekking (%)",Design:"Vormgeving","Details (HA-Dialog)":"Details (HA-dialoog)",deutlich:"sterk",Deutsch:"Deutsch",dezent:"subtiel","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"De versie van v\xF3\xF3r de laatste keer opslaan in de editor laden (daarna \u201EOpslaan\u201D)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"De keuze wordt op dit apparaat onthouden.","Diesen Eintrag nur zeigen, wenn \u2026":"Dit item alleen tonen als \u2026","Klangschale (tief, schwebend)":"Klankschaal (diep, zwevend)","Marimba (zwei Holzt\xF6ne)":"Marimba (twee houten tonen)","Glas (klares Ding-Dong)":"Glas (heldere ding-dong)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (drie getokkelde tonen)","Windspiel (zart)":"Windgong (teer)","Hinweis (sehr leise, kurz)":"Hint (heel zacht, kort)","Ding-Dong":"Ding-dong",Display:"Weergave",Displays:"Weergaven",dunkel:"donker","dunkel: nach Sonnenuntergang w\xE4rmer":"donker: na zonsondergang warmer",Duplizieren:"Dupliceren",d\u00E4mmrig:"schemerig",Eckenradius:"Hoekradius","Eckenradius (px)":"Hoekradius (px)","Eckenradius der Karten (px)":"Hoekradius kaarten (px)",Editorial:"Editorial","Eigene Farbe":"Eigen kleur","Eigene Farben \xB7 Dunkel":"Eigen kleuren \xB7 donker","Eigene Farben \xB7 Hell":"Eigen kleuren \xB7 licht","Eigene Stile":"Eigen stijlen","Eigene Vorlagen":"Eigen sjablonen","Eigene Vorlagen:":"Eigen sjablonen:","Eigenes CSS (alle Displays)":"Eigen CSS (alle weergaven)","Eigenes CSS (nur diese Seite)":"Eigen CSS (alleen deze pagina)","Ein Balken je":"E\xE9n balk per","Ein/aus schalten":"Aan/uit schakelen","Eine von mehreren ist":"Een van meerdere is","eine von {n} = {state}":"een van {n} = {state}","Eine Zeile":"E\xE9n regel","Eine Zeile (dezent)":"E\xE9n regel (subtiel)",Einfach:"Eenvoudig","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Eenvoudig: alleen het belangrijkste \xB7 Uitgebreid: alles",eingebaut:"meegeleverd",Einheit:"Eenheid","Einmal tippen f\xFCr Vollbild":"E\xE9n keer tikken voor volledig scherm",Einpassen:"Passend maken",Einstellungen:"Instellingen",Eintrag:"Item","empfindliche Gruppen":"gevoelige groepen",Endzeit:"Eindtijd","Energie jetzt":"Energie nu","Energie-Bilanz":"Energieoverzicht",English:"English",entfernen:"verwijderen",Entit\u00E4t:"Entiteit","Entit\xE4t hinzuf\xFCgen":"Entiteit toevoegen","Entit\xE4t hinzuf\xFCgen \u2026":"Entiteit toevoegen \u2026","Entit\xE4t w\xE4hlen":"Kies een entiteit",Entit\u00E4ten:"Entiteiten","Ereignis \u201E{name}\u201C l\xF6schen?":"Gebeurtenis \u201E{name}\u201D verwijderen?",Ereignisse:"Gebeurtenissen","Erf\xFCllt bei true, on, Zahl \u2260 0":"Waar bij true, on, getal \u2260 0",Erinnerungstext:"Herinneringstekst",Erledigt:"Klaar","Erstellen um":"Maken om",erstes:"eerste",Erweitert:"Uitgebreid",Erzeugung:"Opwekking","Erzeugung (W)":"Opwekking (W)","Es gibt noch keine vorherige Fassung.":"Er is nog geen vorige versie.","Es klingelt":"Er wordt aangebeld","Es regnet gerade":"Het regent",Exportieren:"Exporteren",Extrem:"Extreem",Familie:"Gezin",Farbe:"Kleur","Farbe ab Wert":"Kleur volgens waarde",Farben:"Kleuren",Fehlgeschlagen:"Mislukt","Fehlgeschlagen: {error}":"Mislukt: {error}",Fenster:"Raam","Fenster offen":"Raam open","Fertig um":"Klaar om","fertig um {time}":"klaar om {time}","fertig {time}":"klaar {time}",feucht:"vochtig","Flie\xDFender Verlauf":"Vloeiend verloop",Flie\u00DFtext:"Lopende tekst",Fl\u00E4che:"Vlak","Fl\xE4che, Rand und Radius des Stils":"Vlak, rand en radius van de stijl",Form:"Vorm","Form & CSS":"Vorm & CSS",Format:"Formaat","Formatierung (Markdown)":"Opmaak (Markdown)","Fortschritt %":"Voortgang %","Fortschritt (%)":"Voortgang (%)",Foto:"Foto",Fotoordner:"Fotomap",Fotos:"Foto's","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"Foto's-app \u2192 album delen \u2192 \u201EOpenbare website\u201D aanzetten \u2192 link kopi\xEBren. Wordt gemengd met de map.",Freundlich:"Vriendelijk",Fu\u00DFnote:"Voetregel","F\xE4hrt zur\xFCck":"Keert terug","F\xFCllen (zuschneiden)":"Vullen (bijsnijden)","f\xFCllt das Feld":"vult het veld","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"Voor de schakelaar \u201EPauze\u201D in HA; 0 = nooit","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"Voor gevorderden: geldt in de weergave; kleuren en afstanden via --af-\u2026-variabelen.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':'Voor gevorderden: geldt binnen de pagina; widgets zijn aan te spreken via .cell[data-widget="id"].',"F\xFCr Tor, T\xFCrschloss & Co.":"Voor poorten, deursloten & co.","Ganz zeigen":"Helemaal tonen",ganztags:"hele dag","gar nicht zeigen":"helemaal niet tonen",Ged\u00E4mpft:"Stil","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) vat weer, afspraken, afval, stroom, auto en huis samen.","Gemini schreibt \u2026":"Gemini schrijft \u2026",gerade:"zojuist","gerade eben":"zojuist","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"Er is nu geen apparaat met deze weergave verbonden","Gerade l\xE4uft nichts":"Er speelt nu niets",Ger\u00E4t:"Apparaat","Ger\xE4t fertig":"Apparaat klaar","Ger\xE4t fertig \u2192 Hinweis":"Apparaat klaar \u2192 melding",Ger\u00E4te:"Apparaten",Gespeichert:"Opgeslagen","Gespeichert \u2013 alle Displays zeigen es sofort.":"Opgeslagen \u2013 alle weergaven tonen het direct.","gestern {time}":"gisteren {time}","Gestern, {date}":"Gisteren, {date}",Gewitter:"Onweer","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Glasvlakken met lichtrand boven zachte kleuren","Glocke (kurz, hell)":"Bel (kort, helder)",Gold:"Goud","Gong (warm, tief)":"Gong (warm, diep)",Gro\u00DF:"Groot","gro\xDF (+15 %)":"groot (+15 %)","Gro\xDFbild mit Schlagzeile":"Groot beeld met kop","Gruppen (YAML)":"Groepen (YAML)","Gruppen zeigen jedes Lied nur einmal":"Groepen tonen elk nummer maar \xE9\xE9n keer",Gr\u00F6\u00DFe:"Grootte","Gr\xF6\xDFe (%)":"Grootte (%)",gut:"goed","Gut (gr\xFCn)":"Goed (groen)","Guten Morgen (KI-Zusammenfassung)":"Goedemorgen (AI-samenvatting)","G\xE4ste-WLAN":"Gastwifi",g\u00FCnstig:"goedkoop","G\xFCnstigstes Fenster (h)":"Goedkoopste venster (u)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 Media \u2192 Lokale media \u2192 map \u201Eambiframe\u201D","HA-Dashboard \xF6ffnen":"HA-dashboard openen","HA-Karte":"HA-kaart",Hagel:"Hagel",Halbkreis:"Halve cirkel","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hamburg \u2013 Michel met havenpanorama (YouTube-livebeeld)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hamburg \u2013 stad (YouTube-livebeeld)","Handy-Kamera auf den Code halten":"Richt de camera van je telefoon op de code",Haustier:"Huisdier",Haust\u00FCr:"Voordeur","heizt auf {temp}\xB0":"verwarmt naar {temp}\xB0",Heizung:"Verwarming","Helfer umschalten":"Helper schakelen",hell:"licht","Hell / Tinte":"Licht / inkt","Hell/Dunkel":"Licht/donker","Hell/Dunkel & Schrift":"Licht/donker & lettertypen","Helligkeit (Lux)":"Helderheid (lux)","Hervorheben ab Tagen":"Markeren vanaf dagen","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee en Walchensee (afbeelding)",Heute:"Vandaag",heute:"vandaag","Heute ab (Uhr)":"Vandaag vanaf (tijd)","heute Abend":"vanavond","Heute Abend & morgen":"Vanavond & morgen","Heute Abend rausstellen":"Vanavond buitenzetten","Heute bis jetzt":"Vandaag tot nu toe","Heute Nachmittag":"Vanmiddag","Heute {lo}\xB0 bis {hi}\xB0":"Vandaag {lo}\xB0 tot {hi}\xB0",Hintergrund:"Achtergrond",Hinweis:"Melding","Hinweis + Erinnerung (Ger\xE4te)":"Melding + herinnering (apparaten)",hoch:"hoog","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"hoog (gedempte tekst sterker)",Hochformat:"Staand","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (afbeelding, MJPEG, .m3u8 of YouTube)",H\u00F6chstens:"Hoogstens","H\xF6chstens (s)":"Hoogstens (s)","H\xF6chstens Eintr\xE4ge":"Hoogstens items",H\u00F6he:"Hoogte","iCloud-Album":"iCloud-album",Icon:"Pictogram","Immer dunkel":"Altijd donker","Immer hell":"Altijd licht","Immer hoch":"Altijd staand","Immer quer":"Altijd liggend","Import fehlgeschlagen: {error}":"Importeren mislukt: {error}",Importieren:"Importeren","Importierte Seite":"Ge\xEFmporteerde pagina","In den Editor \xFCbernehmen":"In de editor overnemen","in den letzten \u2026 Minuten":"in de laatste \u2026 minuten","In der Ruhezeit":"Tijdens rusttijd","In der Station":"In het dock","in {n} Tagen":"over {n} dagen","Info mit Kopfzeile":"Info met kop",Infozeile:"Inforegel","Innen {temp}\xB0":"Binnen {temp}\xB0","Innenabstand (px)":"Binnenmarge (px)",Innentemperatur:"Binnentemperatuur","Ist M\xFCllkalender":"Is een afvalkalender",Ja:"Ja",ja:"ja","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"Elke kaart uit het dashboard, bijv. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"elke wijziging (knoppen, event.*)",jetzt:"nu","Jetzt (gro\xDF)":"Nu (groot)","Jetzt erstellen":"Nu maken",Kalender:"Agenda","Kalt unter":"Koud onder","Kalt unter \xB0C":"Koud onder \xB0C",Kamera:"Camera","Kamera / Webcam":"Camera / webcam","Kamera als Hintergrund":"Camera als achtergrond",Karte:"Kaart","Karte (YAML)":"Kaart (YAML)","Karte mit 4 Stunden":"Kaart met 4 uur","Karte nicht ladbar: {error}":"Kaart kon niet worden geladen: {error}","Karte unten rechts":"Kaart rechtsonder","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Kaart \u201E{type}\u201D (alleen zichtbaar in Home Assistant)",Karten:"Kaarten","Karten-Deckkraft (%)":"Dekking kaarten (%)","kein Ausl\xF6ser":"geen trigger","Kein Display konfiguriert":"Geen weergave ingesteld","Kein Display.":"Geen weergave.","Kein Regen bis {h} Uhr":"Geen regen tot {h}:00","kein Stil gefunden":"geen stijl gevonden","kein Ton":"geen geluid",keine:"geen","Keine Bewegung in letzter Zeit":"Geen recente beweging","Keine Karte konfiguriert":"Geen kaart ingesteld","Keine Preisdaten":"Geen prijsgegevens","keine Seite":"geen pagina","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"Geen pagina herkend (\u201Ewidgets\u201D ontbreekt).","keine Seite sichtbar":"geen pagina zichtbaar","Keine Termine in den n\xE4chsten Tagen":"Geen afspraken in de komende dagen","Keine von \u2026 (nicht)":"Geen van \u2026 (niet)","Keine Warnungen":"Geen waarschuwingen","Keiner gew\xE4hlt = alle":"Niets gekozen = alle","KI-Zusammenfassung":"AI-samenvatting",Klar:"Wissen","klein (Kopfzeile)":"klein (koptekst)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Klein rechtsonder, bijv. \u201ECuxhaven\u201D","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Kleinere teksten (labels, lijsten, details) \u2013 om op afstand te lezen","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Klik in het veld voor de meegeleverde geluiden \u2013 of een link (/local/geluid.mp3). Op de tablet via Fully.",Klingel:"Deurbel","Klingel \u2192 Vollbild":"Deurbel \u2192 volledig scherm","Knapp, nur Fakten":"Kort, alleen feiten",Kontrast:"Contrast",Kopieren:"Kopi\xEBren","Kopieren (\u2318C)":"Kopi\xEBren (\u2318C)",Kosten:"Kosten","Kosten-Sensor":"Kostensensor","K\xFChl (blau)":"Koel (blauw)","K\xFCrzlich ge\xE4ndert":"Onlangs gewijzigd",Ladeleistung:"Laadvermogen",Ladelimit:"Laadlimiet","Ladelimit {n} %":"Laadlimiet {n} %",langsam:"langzaam",Laufband:"Nieuwsticker","Laufende Ger\xE4te":"Lopende apparaten","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Leeg = alle afvalsensoren (\u2026_days) automatisch","Leer = automatisch suchen":"Leeg = automatisch zoeken","Leer = Farbe des Stils":"Leeg = kleur van de stijl","Leere Seite":"Lege pagina",Leise:"Zacht",Leistung:"Vermogen","Leistung (W)":"Vermogen (W)","Letzte Tage":"Laatste dagen","Licht umschalten":"Licht schakelen","Lichter an":"Lampen aan",Lichtschimmer:"Lichtglans",Linie:"Lijn",links:"links","Liquid Glass":"Liquid Glass",Liste:"Lijst","Liste mit Vorschaubildern":"Lijst met miniaturen",Live:"Live","Lovelace-Karte (YAML)":"Lovelace-kaart (YAML)",Luftfeuchte:"Luchtvochtigheid","Luftfeuchte (Raum)":"Luchtvochtigheid (ruimte)","Luftqualit\xE4t (AQI)":"Luchtkwaliteit (AQI)",L\u00E4dt:"Laadt","L\xE4dt in der Station":"Laadt in het dock","L\xE4dt \u2026":"Laden \u2026","L\xE4uft gerade":"Speelt nu","L\xE4uft-Entit\xE4t":"Lopende entiteit",L\u00F6schen:"Verwijderen",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 of washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Meerdere webcams om de beurt",Melder:"Sensor",Meldungen:"Berichten","Mindestens (s)":"Minstens (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"Minstens \xE9\xE9n persoon (person.*) is \u201Ethuis\u201D.","Mindestens eine von \u2026 (oder)":"Minstens \xE9\xE9n van \u2026 (of)",Minimal:"Minimal",Minimum:"Minimum",mittel:"gemiddeld",mittig:"midden","Mo., 12. Okt.":"ma 12 okt",Modus:"Modus","Montag, 12. Oktober":"maandag 12 oktober",Morgen:"Morgen",morgen:"morgen","Morgen anzeigen":"Morgen tonen",Musik:"Muziek","Musik \u2192 Cover":"Muziek \u2192 hoes","Musik-Cover":"Muziekhoes","Musik-Cover (bei Liedwechsel)":"Muziekhoes (bij nummerwissel)",m\u00E4\u00DFig:"matig",M\u00FCll:"Afval","M\xFCll zeigen ab Tagen":"Afval tonen vanaf dagen",M\u00FCllabfuhr:"Afvalophaling",M\u00FCllkalender:"Afvalkalender",M\u00FClltonnen:"Afvalbakken","M\xFClltonnen (im Wechsel)":"Afvalbakken (wisselend)","M\xFCnchen \u2013 Panorama (Bild)":"M\xFCnchen \u2013 panorama (afbeelding)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Na afloop zo lang niet opnieuw tonen.","nach oben":"omhoog","nach unten":"omlaag",Nachkommastellen:"Decimalen","Nachlauf (s)":"Nalooptijd (s)",Nachrichten:"Nieuws","Nachrichten werden geladen \u2026":"Nieuws wordt geladen \u2026",Nacht:"Nacht","Nacht (gedimmt)":"Nacht (gedimd)","Nacht, wenn an":"Nacht als aan",Nachtseite:"Nachtpagina",Name:"Naam","Name der Seitenvorlage":"Naam van paginasjabloon","Name der Vorlage":"Naam van sjabloon","Name des Auftrags":"Naam van opdracht","Name des Players":"Naam van speler","Name, z. B. Herbst":"Naam, bijv. Herfst",Nebel:"Mist",nein:"nee","Netzname (SSID)":"Netwerknaam (SSID)","Netzname und Passwort im Editor eintragen.":"Vul netwerknaam en wachtwoord in de editor in.","Neu laden":"Opnieuw laden","Neu laden alle (s)":"Opnieuw laden elke (s)","Neue Seite":"Nieuwe pagina","Neues Display":"Nieuwe weergave","Neustart nach (s)":"Herstart na (s)","Neustart-Taste":"Herstartknop",nicht:"niet","nicht in Wiedergabe":"niet in afspeellijst","nicht zeigen":"niet tonen","Nichts l\xE4uft gerade":"Er loopt nu niets","Nichts offen, nichts l\xE4uft":"Niets open, niets actief",nie:"nooit",niedrig:"laag",Noch:"Nog","Noch keine Daten im Zeitraum":"Nog geen gegevens in deze periode","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"Nog geen eigen stijlen \u2013 stel stijl, kleuren en lettertypen in en sla ze hier op.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"Nog geen pagina \u2013 \u201E+ Nieuw\u201D hierboven.","Noch keine Statistik im Zeitraum":"Nog geen statistiek in deze periode","Noch keine Werte f\xFCr diesen Tag.":"Nog geen waarden voor deze dag.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"Nog geen samenvatting \u2013 die wordt op de ingestelde tijden gemaakt.","noch {n} kWh":"nog {n} kWh","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 haven en Waddenzee (YouTube-livebeeld)",Normal:"Normaal",normal:"normaal","normal (ruhig)":"normaal (rustig)",Notfallmodus:"Noodmodus","Nur anzeigen wenn \u2026":"Alleen tonen als \u2026","Nur auf Display \u2026":"Alleen op weergave \u2026","nur auf {names}":"alleen op {names}","Nur diese Ereignistypen":"Alleen deze gebeurtenistypen","nur Hochformat":"alleen staand","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Alleen in de browser \u2013 Fully gebruikt het mediavolume van de tablet.","Nur im Hoch-/Querformat":"Alleen staand/liggend","Nur offene listen":"Alleen open items noemen","nur Querformat":"alleen liggend","Nur wenn au\xDFerdem \u2026":"Alleen als ook \u2026","Nur wenn in Tagen":"Alleen als binnen dagen","Nur wenn jemand zu Hause ist":"Alleen als er iemand thuis is","Nur zeigen bis Tage":"Alleen tonen tot dagen","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Alleen op bepaalde tijden of voorwaarden tonen","N\xE4chste Stunden":"Komende uren","N\xE4chste Tage":"Komende dagen",oben:"boven","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Bovengrens, ook als een sensor aan blijft.",oder:"of",Offen:"Open",offen:"open","Offene Fenster & T\xFCren":"Open ramen & deuren","Ohne Rahmen":"Zonder kader","ohne Ton zeigen":"zonder geluid tonen","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Optioneel \u2013 anders uit de Tibber-geschiedenis.","Ort / Zusatz":"Plaats / toevoeging","Ort zeigen":"Plaats tonen",Ortsangabe:"Locatie",Ortsname:"Plaatsnaam",Passwort:"Wachtwoord","Passwort zus\xE4tzlich als Text":"Wachtwoord ook als tekst tonen","Pause endet nach (min)":"Pauze eindigt na (min)",Pausiert:"Gepauzeerd",pausiert:"gepauzeerd","per Link (?safe=1)":"via link (?safe=1)",Person:"Persoon","Person, image.*, Kamera, Medienplayer \u2026":"Persoon, image.*, camera, mediaspeler \u2026",Personen:"Personen",Player:"Speler",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up met HA-kaart","Prognose heute (kWh)":"Voorspelling vandaag (kWh)","Prognose heute {n} kWh":"Voorspelling vandaag {n} kWh","Prognose Rest (kWh)":"Voorspelling resterend (kWh)",Quelle:"Bron",Quellen:"Bronnen",Querformat:"Liggend",Rahmen:"Kader",Raum:"Ruimte",Rausstellen:"Buitenzetten",rechts:"rechts",Regen:"Regen","Regen ab %":"Regen vanaf %","Regen ab {h} Uhr":"Regen vanaf {h}:00","Regen an/aus":"Regen aan/uit","Regen-Vorschau":"Regenvoorspelling",Regensensor:"Regensensor",Regnet:"Het regent",Reichweite:"Bereik","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 strand (YouTube-livebeeld)",Restzeit:"Resterende tijd",Ring:"Ring",Rollladen:"Rolluik","Rollladen/Tor umschalten":"Rolluik/poort schakelen",Rolll\u00E4den:"Rolluiken","Ruhezeit ab":"Rusttijd vanaf","Ruhezeit bis":"Rusttijd tot",Ruhig:"Rustig","Ruhig flie\xDFende Farben wie Nordlicht":"Rustig vloeiende kleuren zoals noorderlicht",R\u00E4ume:"Ruimtes","R\xFCckg\xE4ngig (\u2318Z)":"Ongedaan maken (\u2318Z)",Sauger:"Stofzuiger",Saugroboter:"Robotstofzuiger",Saugt:"Zuigt",Schicht:"Laag","Schichten gesamt":"Lagen totaal",Schieben:"Schuiven",Schlicht:"Eenvoudig","Schlie\xDFt nach (s)":"Sluit na (s)",Schloss:"Slot",Schnee:"Sneeuw",Schneeregen:"Natte sneeuw",Schrift:"Lettertype","Schrift des Stils":"Lettertype van de stijl","Schrift Text":"Lettertype tekst","Schrift Uhr & Titel":"Lettertype klok & titel",Schriftfarbe:"Tekstkleur",Schriftgr\u00F6\u00DFe:"Tekstgrootte","Schriftgr\xF6\xDFe Punkte (px)":"Tekstgrootte opsomming (px)","Schwebende Partikel":"Zwevende deeltjes","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Zwitserse stijl: heldere letters, hoog contrast, alleen typografie","sehr gro\xDF (+30 %)":"heel groot (+30 %)","sehr hoch":"heel hoog","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Heel rustig; 's nachts uit. Per pagina aan te passen.","seit {time}":"sinds {time}",Seite:"Pagina","Seite importieren \u2026":"Pagina importeren \u2026","Seite in die Wiedergabe":"Pagina naar afspeellijst","Seite unten als YAML \u2013 zum Kopieren markieren.":"Pagina hieronder als YAML \u2013 selecteer om te kopi\xEBren.","Seite zeigen":"Pagina tonen","Seite zeigen (z. B. bei Bewegung)":"Pagina tonen (bijv. bij beweging)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Pagina \u201E{name}\u201D als YAML gekopieerd \u2013 elders plakken met \u201E+ Nieuw \u2192 Pagina importeren\u201D of \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Pagina \u201E{name}\u201D aangemaakt \u2013 pagina-ID's in acties zo nodig aanpassen.","Seite \u201E{name}\u201C l\xF6schen?":"Pagina \u201E{name}\u201D verwijderen?",Seiten:"Pagina's","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Paginasjabloon \u201E{name}\u201D opgeslagen \u2013 onder \u201E+ Nieuw\u201D.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Paginasjabloon \u201E{name}\u201D verwijderen?",Seitenwechsel:"Paginawissel",Sekunden:"Seconden","Selbst ausw\xE4hlen":"Zelf kiezen",Senkrecht:"Verticaal",Sensor:"Sensor","Serifen-Uhr, warmes Wei\xDF, Bambus":"Schreefklok, warm wit, bamboe",Sichtbarkeit:"Zichtbaarheid","Skript starten":"Script uitvoeren","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"Zo lang blijft de weergave staan nadat de trigger weer uit is.",Sonnig:"Zonnig",sonnig:"zonnig",Spalte:"Kolom",Spalten:"Kolommen",Speichern:"Opslaan","Speichert \u2026":"Opslaan \u2026",Sprache:"Taal",Standard:"Standaard",Standbild:"Stilstaand beeld","Standbild neu laden (s)":"Stilstaand beeld opnieuw laden (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"StandBy-stijl, eenvoudig, salie",Standort:"Locatie",Starkregen:"Zware regen","startet immer wieder neu":"start steeds opnieuw","Startkonfiguration anzeigen":"Startconfiguratie tonen",Status:"Status","Steht drau\xDFen":"Weg","Steht zuhause":"Thuis geparkeerd",Stil:"Stijl","Stil als YAML in die Zwischenablage kopiert.":"Stijl als YAML naar het klembord gekopieerd.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Stijl hieronder als YAML \u2013 selecteer om te kopi\xEBren.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Stijl toegepast \u2013 maak het blijvend met \u201EOpslaan\u201D.","Stil-Farbe":"Kleur van de stijl","Stil-Schrift":"Lettertype van de stijl",Strompreis:"Stroomprijs","Strompreis heute":"Stroomprijs vandaag","Stufe hinzuf\xFCgen":"Stap toevoegen",Stunde:"Uur",Stunden:"Uren","Stunden-Kurve":"Uurverloop",St\u00E4rke:"Sterkte",St\u00F6rung:"Storing","Szene aktivieren":"Sc\xE8ne activeren",Tag:"Dag",Tage:"Dagen","Tage bis Abholung":"Dagen tot ophaling","Tage voraus":"Dagen vooruit","Tage-Sensor":"Dagensensor",Tagesbilanz:"Dagoverzicht",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau of https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 of het adres van een RSS-feed",Teil:"Deel",Teile:"Delen","Teils bew\xF6lkt":"Half bewolkt",Temperatur:"Temperatuur",Temperaturen:"Temperaturen",Tempo:"Snelheid","Tempo (px/s)":"Snelheid (px/s)",Termin:"Afspraak","Termin in den n\xE4chsten Tagen":"Afspraak in de komende dagen",Termine:"Afspraken",Testen:"Testen",teuer:"duur",Text:"Tekst","Text & Vorlage":"Tekst & sjabloon","Text aus Entit\xE4t":"Tekst uit entiteit","Text danach":"Tekst erna","Text ohne Warnung":"Tekst zonder waarschuwing","Text wenn alles ruhig":"Tekst als alles rustig is","Text wenn nichts l\xE4uft":"Tekst als er niets loopt",Textgr\u00F6\u00DFe:"Tekstgrootte","Tibber-Zuhause":"Tibber-woning","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Tip: klik op een widget om hem te bewerken.","Tippen zum Schlie\xDFen":"Tik om te sluiten",Titel:"Titel","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau in het Zwarte Woud \u2013 dorp en Hasenhorn (afbeelding)",Ton:"Geluid",Tonne:"Afvalbak",Tonnen:"Afvalbakken","Tonnen der n\xE4chsten \u2026 Tage":"Afvalbakken van de komende \u2026 dagen",Trocken:"Droog",trocken:"droog","Trocken ab etwa {h} Uhr":"Droog vanaf ongeveer {h}:00",Uhr:"Klok","Uhrzeit von \u2013 bis":"Tijd van \u2013 tot","Uhrzeit {from}\u2013{to}":"Tijd {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Tijden gescheiden door komma's; elke tijd is \xE9\xE9n vraag aan de AI.",Umwelt:"Omgeving",und:"en",ungesund:"ongezond",unten:"onder",unter:"onder",Unterwegs:"Onderweg",Unterzeile:"Onderregel",Unwetter:"Noodweer","UV-Index":"UV-index",Verbrauch:"Verbruik",Verlauf:"Verloop","Verlauf (Tage)":"Verloop (dagen)","Verlauf nicht verf\xFCgbar":"Verloop niet beschikbaar","Verlauf wird geladen \u2026":"Verloop wordt geladen \u2026",Verriegelt:"Vergrendeld",Verschl\u00FCsselung:"Versleuteling","Verstecktes Netz":"Verborgen netwerk",Verwerfen:"Verwerpen","Voll um":"Vol om","voll um {time}":"vol om {time}",Vollbild:"Volledig scherm","Vollbild (Klingel, Alarm)":"Volledig scherm (deurbel, alarm)","von Zustand":"van toestand","von {n} geschlossen":"van {n} dicht","vor {n} h":"{n} uur geleden","vor {n} min":"{n} min geleden","Vorher nachfragen":"Eerst vragen","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Vorige versie geladen \u2013 herstel met \u201EIn de editor overnemen\u201D en \u201EOpslaan\u201D.","Vorherige Fassung laden":"Vorige versie laden",Vorlage:"Sjabloon","Vorlage (Jinja)":"Sjabloon (Jinja)","Vorlage l\xF6schen":"Sjabloon verwijderen","Vorlage nicht verf\xFCgbar":"Sjabloon niet beschikbaar","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Sjabloon \u201E{name}\u201D opgeslagen \u2013 onder \u201EEigen sjablonen\u201D.","Vorlage \u201E{name}\u201C l\xF6schen?":"Sjabloon \u201E{name}\u201D verwijderen?",Vorschau:"Voorbeeld","Vorschau (schnell)":"Voorbeeld (snel)",Waagerecht:"Horizontaal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe is niet bereikbaar: {error}","Ambiframe nicht erreichbar":"Ambiframe niet bereikbaar","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 noodmodus","Wann?":"Wanneer?","Warm \xFCber \xB0C":"Warm boven \xB0C","Warn-Sensoren":"Waarschuwingssensoren",Warnung:"Waarschuwing","Warnung (rot)":"Waarschuwing (rood)","Warnung \u2192 Vollbild":"Waarschuwing \u2192 volledig scherm",Warnungen:"Waarschuwingen","Waschmaschine fertig":"Wasmachine klaar",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Webcam toevoegen","Webcam-Link":"Webcamlink","Wechsel nach (s)":"Wissel na (s)","Weich (Unsch\xE4rfe)":"Zacht (vervagen)","Weiter geht's":"Gaat verder","Weitere Ausl\xF6ser":"Meer triggers","Weitere Werte":"Meer waarden","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"Wit en goud \u2013 donker op zwart, licht op ivoor","Welches Display ist das?":"Welke weergave is dit?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein oost (afbeelding, elke 10 min)","Wenn Ordner und Album leer sind":"Als map en album leeg zijn",Wert:"Waarde","Wert wird blau, wenn er darunter liegt.":"Waarde wordt blauw als ze eronder ligt.","Werte-Liste":"Waardenlijst",Wetter:"Weer","Wetter-Entit\xE4t fehlt":"Weerentiteit ontbreekt","Widget hinzuf\xFCgen:":"Widget toevoegen:","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget gekopieerd \u2013 plak op een pagina met \u2318V of \u201EPlakken\u201D.","Widget kopiert.":"Widget gekopieerd.","wie der Stil":"zoals de stijl","wie Design":"zoals vormgeving","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Zoals een tijdschrift: grote schreven, papier, fijne lijnen","wie oben":"zoals boven","wie Stil":"zoals stijl",Wiedergabe:"Weergave","Wiedergabe anhalten/fortsetzen":"Weergave pauzeren/hervatten","Wiedergabe/Pause":"Afspelen/pauzeren",Wiedergabeliste:"Afspeellijst","Wiederholen (\u21E7\u2318Z)":"Opnieuw (\u21E7\u2318Z)",Wind:"Wind",Windig:"Winderig","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Wordt ingedrukt als de weergave zich niet meer meldt \u2013 bijv. Fully \u201EStart-URL laden\u201D.","Wird geladen \u2026":"Wordt geladen \u2026","Wird heute abgeholt":"Vandaag opgehaald","WLAN-QR-Code":"Wifi-QR-code","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"Tijdens het afspelen opnieuw tonen; leeg of 0 = alleen bij nummerwissel","W\xE4sche fertig":"Was klaar","YAML ist nicht lesbar: {error}":"YAML niet leesbaar: {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"bijv. bezoeken aan de kattenbak, dagelijks gereset","z. B. KI-Analyse der Kamera":"bijv. AI-analyse van de camera","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"bijv. AI-beschrijving of waarschuwingskop","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"bijv. meerdere bewegingsmelders \u2013 \xE9\xE9n is genoeg","z. B. type: entities, entities: [light.kueche]":"bijv. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"Bijv. tijd 05:00\u201311:00 voor een ochtendpagina. De eigen voorwaarde van de pagina geldt ook.","z. B. \u201EGeocoded Location\u201C der Companion-App":"bijv. \u201EGeocoded Location\u201D van de companion-app","Zahl \xFCber/unter":"Getal boven/onder",Zeile:"Regel",Zeilen:"Regels","Zeitraum (min)":"Periode (min)","Zeitraum (Stunden)":"Periode (uren)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Slepen of pijltjestoetsen verplaatsen alles samen. \u21E7/\u2318-klik haalt er \xE9\xE9n uit, Esc heft de selectie op.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Slepen om te verplaatsen \xB7 punt rechtsonder om te vergroten \xB7 pijltjestoetsen verplaatsen, met \u21E7 grootte \xB7 \u21E7/\u2318-klik kiest meerdere \xB7 \u2318C/\u2318V kopi\xEBren en plakken \xB7 \u232B verwijdert \xB7 \u2318D dupliceert \xB7 \u2318Z ongedaan maken","Ziel-Entit\xE4t":"Doelentiteit",Zoom:"Zoom",zu:"dicht","zu feucht":"te vochtig","zu Zustand":"naar toestand","zu Zustand (optional)":"naar toestand (optioneel)","Zugspitze (Bild, alle 10 min)":"Zugspitze (afbeelding, elke 10 min)",Zuhause:"Thuis","Zuletzt fertig {when}":"Laatst klaar {when}","zuletzt {time}":"laatst {time}","Zur\xFCck nach (s)":"Terug na (s)","Zur\xFCck zu Ambiframe":"Terug naar Ambiframe",Zusammenfassung:"Samenvatting",Zusatzwert:"Extra waarde","Zusatzwert Name":"Naam extra waarde",Zustand:"Toestand","Zustand ist":"Toestand is","Zustand ist nicht":"Toestand is niet","Zwischendurch alle (min)":"Tussendoor elke (min)",z\u00E4hlen:"tellen","Z\xE4hler \u201Eheute\u201C":"Teller \u201Evandaag\u201D","{day} Abend":"{day} avond","{entity} ge\xE4ndert ({n} min)":"{entity} gewijzigd ({n} min)","{entity} in {n} Tagen":"{entity} over {n} dagen","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} loopt","{name} offen":"{name} open","{name} \u2013 wirklich?":"{name} \u2013 echt?","{n} % aus eigener Sonne":"{n} % uit eigen zonnestroom","{n} % Wahrscheinlichkeit":"{n} % kans","{n} Lichter an":"{n} lampen aan","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets gekozen","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets gekopieerd \u2013 plak op een pagina met \u2318V of \u201EPlakken\u201D.","{n} Widgets kopiert.":"{n} widgets gekopieerd.","{time} Uhr":"{time}","\xE4ltere Version":"oudere versie","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Openbare camera in plaats van HA-camera \u2013 suggesties door in het veld te klikken",\u00D6ffnen:"Openen","\xD8 {n} pro Tag":"\xD8 {n} per dag",\u00FCber:"boven",\u00DCberblenden:"Overvloeien",\u00DCberblick:"Overzicht",\u00DCbergang:"Overgang","\xDCbergang (s)":"Overgang (s)",\u00FCbermorgen:"overmorgen",\u00DCbernehmen:"Overnemen","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Overgenomen \u2013 maak het blijvend met \u201EOpslaan\u201D.",\u00DCberschrift:"Kop","\xDCberschrift klein":"Kleine kop","\u2013 w\xE4hlen \u2013":"\u2013 kiezen \u2013","\u2026 aus Attribut":"\u2026 uit attribuut","\u2026 oder Bild einer Entit\xE4t":"\u2026 of afbeelding van een entiteit","\u2026 oder Webcam-Link":"\u2026 of webcamlink",Fran\u00E7ais:"Fran\xE7ais","Le Figaro (FR)":"Le Figaro (FR)","Le Monde (FR)":"Le Monde (FR)","NOS (NL)":"NOS (NL)","NU.nl (NL)":"NU.nl (NL)",Nederlands:"Nederlands","RFI (FR)":"RFI (FR)","VRT NWS (BE)":"VRT NWS (BE)","franceinfo (FR)":"franceinfo (FR)","{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.":"{names}: eigen instelling voor licht/donker \u2013 die geldt daar.","F\xFCr alle \xFCbernehmen":"Voor alle overnemen","{names}: eigener Stil \u2013 dort gilt dieser.":"{names}: eigen stijl \u2013 die geldt daar.","Kamera wird verbunden \u2026":"Camera wordt verbonden \u2026",Abdunkeln:"Verduisteren","normal \u2013 Text gut lesbar":"normaal \u2013 tekst goed leesbaar",leicht:"licht",kr\u00E4ftig:"sterk","aus \u2013 Originalbild":"uit \u2013 origineel beeld","Dunkler Verlauf unten links, damit Uhr und Text auf hellen Bildern lesbar bleiben.":"Donker verloop linksonder, zodat klok en tekst op lichte beelden leesbaar blijven.","0\u20133 (DWD)":"0\u20133 (DWD)",Abfahrten:"Vertrektijden","Abfahrten, die nicht mehr erreichbar sind, ausblenden":"Vertrekken verbergen die je niet meer haalt","Alles im gr\xFCnen Bereich":"Alles in orde","Attribut mit der Liste":"Attribuut met de lijst","Ausblenden nach (Stunden)":"Verbergen na (uur)","Bildwechsel (ms)":"Beeldwissel (ms)",Countdown:"Aftellen","Datum-Helfer, Zeitstempel oder Kalender (n\xE4chster Termin)":"Datumhelper, tijdstempel of agenda (volgende afspraak)","Eigene Karte (Adresse)":"Eigen kaart (adres)",Ereignis:"Gebeurtenis",Farbig:"Kleurrijk","Feinstaub PM10":"Fijnstof PM10","Feinstaub PM2,5":"Fijnstof PM2,5","Fu\xDFweg (Minuten)":"Looptijd (minuten)","Gleis zeigen":"Spoor tonen","Gleis {n}":"Spoor {n}","Kein Ort \u2013 Zuhause in HA eintragen oder Breite/L\xE4nge angeben.":"Geen locatie \u2013 stel je thuis in HA in of geef breedte/lengte op.","Kein Timer gefunden \u2013 in HA unter Helfer einen Timer anlegen.":"Geen timer gevonden \u2013 maak er een aan in HA onder Helpers.","Kein Timer l\xE4uft":"Geen timer actief","Keine Abfahrten":"Geen vertrekken","Keine Nachrichten":"Geen berichten","Keine Pollen- oder Luftsensoren gefunden.":"Geen pollen- of luchtkwaliteitssensoren gevonden.","Keinen \xD6PNV-Sensor gefunden \u2013 unter Sensoren eintragen.":"Geen ov-sensor gevonden \u2013 voeg er een toe onder Sensoren.","Kn\xF6pfe zum Starten, durch Komma getrennt \u2013 leer lassen f\xFCr keine":"Startknoppen, gescheiden door komma\u2019s \u2013 leeg laten voor geen",Land:"Land","Leer = Textspeicher mit \u201Epinnwand\u201C, \u201Enachricht\u201C oder \u201Enotiz\u201C im Namen":"Leeg = teksthelpers met \u201Eboard\u201D, \u201Emessage\u201D of \u201Enote\u201D in de naam","Leer = alle Timer aus HA (Helfer \u2192 Timer)":"Leeg = alle timers in HA (Helpers \u2192 Timer)",Luftqualit\u00E4tsindex:"Luchtkwaliteitsindex",L\u00E4nge:"Lengtegraad",Nah:"Dichtbij","Nichts geplant":"Niets gepland","Nur Mond":"Alleen maan","Nur Sonne":"Alleen zon","Nur diese Linien":"Alleen deze lijnen","Nur erh\xF6hte Werte":"Alleen verhoogde waarden","Oder unten eine Entit\xE4t w\xE4hlen":"Of kies hieronder een entiteit",Ozon:"Ozon",Pinnwand:"Prikbord",Pollen:"Pollen","Pollen & Luft":"Pollen & lucht","Pollen-Skala":"Pollenschaal",Regenradar:"Buienradar",Region:"Regio","Ruhende Timer zeigen":"Inactieve timers tonen","Schnellstart (Minuten)":"Snelstart (minuten)","Schnellstart startet":"Snelstart gebruikt","Schriftgr\xF6\xDFe (px)":"Lettergrootte (px)",Sensoren:"Sensoren","Sonne & Mond":"Zon & maan","Sonne und Mond":"Zon en maan",Stickstoffdioxid:"Stikstofdioxide",Symbol:"Pictogram","Tage bis":"dagen tot","Text ohne Nachricht":"Tekst zonder bericht",Timer:"Timer",Umgebung:"Omgeving",Urlaub:"Vakantie","Vergangene zeigen":"Voorbije tonen","Vollmond {when}":"Volle maan {when}","Von einer \xD6PNV-Integration (z. B. HAFAS, DB, Wiener Linien) \u2013 leer = automatisch":"Van een ov-integratie (bijv. HAFAS, NS, DB) \u2013 leeg = automatisch",bereit:"klaar","erster Timer":"eerste timer","noch {n} Tage":"nog {n} dagen","noch {n} Wochen":"nog {n} weken","vor {n} Tagen":"{n} dagen geleden","wie gestern":"gelijk aan gisteren","{h} h {m} min Tageslicht":"{h} u {m} min daglicht","{n} % beleuchtet":"{n}% verlicht","{n} min":"{n} min","{n} min zu gestern":"{n} min t.o.v. gisteren",Neumond:"Nieuwe maan","Zunehmende Sichel":"Wassende sikkel","Erstes Viertel":"Eerste kwartier","Zunehmender Mond":"Wassende maan",Vollmond:"Volle maan","Abnehmender Mond":"Afnemende maan","Letztes Viertel":"Laatste kwartier","Abnehmende Sichel":"Afnemende sikkel",gering:"laag",schlecht:"slecht","sehr schlecht":"zeer slecht","Benachrichtigung in Home Assistant, wenn sich das Display so lange nicht meldet \u2013 verschwindet von selbst, sobald es wieder da ist. Ausgeschalteter Bildschirm z\xE4hlt nicht.":"Melding in Home Assistant als het display zich zo lang niet meldt \u2013 verdwijnt vanzelf zodra het terug is. Een uitgeschakeld scherm telt niet.","Melden, wenn offline (Minuten)":"Melden bij offline (minuten)","Nur aktuell":"Alleen actueel",Zeitraum:"Periode"};var Dd=["de","en","nl","fr"],Nd={en:Na,nl:gs,fr:ms},Md={de:"de-DE",en:"en-GB",nl:"nl-NL",fr:"fr-FR"},mn="de",ai=()=>mn,fs=t=>!!t&&Dd.includes(t),Ht=(t,n)=>{if(fs(t))return t;let e=(n||(typeof navigator<"u"?navigator.language:"")||"de").toLowerCase().split("-")[0];return fs(e)?e:"en"},Ot=t=>{mn=t},ee=()=>Md[mn],d=(t,n)=>{let e=mn==="de"?t:Nd[mn][t]??Na[t]??t;return n?e.replace(/\{(\w+)\}/g,(i,a)=>String(n[a]??"")):e};var ri=globalThis,si=ri.ShadowRoot&&(ri.ShadyCSS===void 0||ri.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ma=Symbol(),bs=new WeakMap,gn=class{constructor(n,e,i){if(this._$cssResult$=!0,i!==Ma)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=n,this.t=e}get styleSheet(){let n=this.o,e=this.t;if(si&&n===void 0){let i=e!==void 0&&e.length===1;i&&(n=bs.get(e)),n===void 0&&((this.o=n=new CSSStyleSheet).replaceSync(this.cssText),i&&bs.set(e,n))}return n}toString(){return this.cssText}},fn=t=>new gn(typeof t=="string"?t:t+"",void 0,Ma),C=(t,...n)=>{let e=t.length===1?t[0]:n.reduce((i,a,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[r+1],t[0]);return new gn(e,t,Ma)},vs=(t,n)=>{if(si)t.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of n){let i=document.createElement("style"),a=ri.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=e.cssText,t.appendChild(i)}},Ca=si?t=>t:t=>t instanceof CSSStyleSheet?(n=>{let e="";for(let i of n.cssRules)e+=i.cssText;return fn(e)})(t):t;var{is:Cd,defineProperty:Pd,getOwnPropertyDescriptor:Id,getOwnPropertyNames:Fd,getOwnPropertySymbols:Bd,getPrototypeOf:Hd}=Object,oi=globalThis,ys=oi.trustedTypes,Od=ys?ys.emptyScript:"",Wd=oi.reactiveElementPolyfillSupport,bn=(t,n)=>t,Pa={toAttribute(t,n){switch(n){case Boolean:t=t?Od:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,n){let e=t;switch(n){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch{e=null}}return e}},ks=(t,n)=>!Cd(t,n),ws={attribute:!0,type:String,converter:Pa,reflect:!1,useDefault:!1,hasChanged:ks};Symbol.metadata??=Symbol("metadata"),oi.litPropertyMetadata??=new WeakMap;var Xe=class extends HTMLElement{static addInitializer(n){this._$Ei(),(this.l??=[]).push(n)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(n,e=ws){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(n)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(n,e),!e.noAccessor){let i=Symbol(),a=this.getPropertyDescriptor(n,i,e);a!==void 0&&Pd(this.prototype,n,a)}}static getPropertyDescriptor(n,e,i){let{get:a,set:r}=Id(this.prototype,n)??{get(){return this[e]},set(s){this[e]=s}};return{get:a,set(s){let o=a?.call(this);r?.call(this,s),this.requestUpdate(n,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(n){return this.elementProperties.get(n)??ws}static _$Ei(){if(this.hasOwnProperty(bn("elementProperties")))return;let n=Hd(this);n.finalize(),n.l!==void 0&&(this.l=[...n.l]),this.elementProperties=new Map(n.elementProperties)}static finalize(){if(this.hasOwnProperty(bn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(bn("properties"))){let e=this.properties,i=[...Fd(e),...Bd(e)];for(let a of i)this.createProperty(a,e[a])}let n=this[Symbol.metadata];if(n!==null){let e=litPropertyMetadata.get(n);if(e!==void 0)for(let[i,a]of e)this.elementProperties.set(i,a)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let a=this._$Eu(e,i);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(n){let e=[];if(Array.isArray(n)){let i=new Set(n.flat(1/0).reverse());for(let a of i)e.unshift(Ca(a))}else n!==void 0&&e.push(Ca(n));return e}static _$Eu(n,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof n=="string"?n.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(n=>n(this))}addController(n){(this._$EO??=new Set).add(n),this.renderRoot!==void 0&&this.isConnected&&n.hostConnected?.()}removeController(n){this._$EO?.delete(n)}_$E_(){let n=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(n.set(i,this[i]),delete this[i]);n.size>0&&(this._$Ep=n)}createRenderRoot(){let n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vs(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(n=>n.hostConnected?.())}enableUpdating(n){}disconnectedCallback(){this._$EO?.forEach(n=>n.hostDisconnected?.())}attributeChangedCallback(n,e,i){this._$AK(n,i)}_$ET(n,e){let i=this.constructor.elementProperties.get(n),a=this.constructor._$Eu(n,i);if(a!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:Pa).toAttribute(e,i.type);this._$Em=n,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(n,e){let i=this.constructor,a=i._$Eh.get(n);if(a!==void 0&&this._$Em!==a){let r=i.getPropertyOptions(a),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Pa;this._$Em=a;let o=s.fromAttribute(e,r.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(n,e,i,a=!1,r){if(n!==void 0){let s=this.constructor;if(a===!1&&(r=this[n]),i??=s.getPropertyOptions(n),!((i.hasChanged??ks)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(n)&&!this.hasAttribute(s._$Eu(n,i))))return;this.C(n,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(n,e,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??=new Map).has(n)&&(this._$Ej.set(n,s??e??this[n]),r!==!0||s!==void 0)||(this._$AL.has(n)||(this.hasUpdated||i||(e=void 0),this._$AL.set(n,e)),a===!0&&this._$Em!==n&&(this._$Eq??=new Set).add(n))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let n=this.scheduleUpdate();return n!=null&&await n,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,r]of i){let{wrapped:s}=r,o=this[a];s!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,r,o)}}let n=!1,e=this._$AL;try{n=this.shouldUpdate(e),n?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw n=!1,this._$EM(),i}n&&this._$AE(e)}willUpdate(n){}_$AE(n){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(n)),this.updated(n)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(n){return!0}update(n){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(n){}firstUpdated(n){}};Xe.elementStyles=[],Xe.shadowRootOptions={mode:"open"},Xe[bn("elementProperties")]=new Map,Xe[bn("finalized")]=new Map,Wd?.({ReactiveElement:Xe}),(oi.reactiveElementVersions??=[]).push("2.1.2");var Fa=globalThis,xs=t=>t,li=Fa.trustedTypes,Ss=li?li.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ba="$lit$",et=`lit$${Math.random().toFixed(9).slice(2)}$`,Ha="?"+et,Rd=`<${Ha}>`,wt=document,yn=()=>wt.createComment(""),wn=t=>t===null||typeof t!="object"&&typeof t!="function",Oa=Array.isArray,Ls=t=>Oa(t)||typeof t?.[Symbol.iterator]=="function",Ia=`[ 	
\f\r]`,vn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$s=/-->/g,As=/>/g,vt=RegExp(`>|${Ia}(?:([^\\s"'>=/]+)(${Ia}*=${Ia}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ts=/'/g,Es=/"/g,_s=/^(?:script|style|textarea|title)$/i,Wa=t=>(n,...e)=>({_$litType$:t,strings:n,values:e}),u=Wa(1),Ae=Wa(2),Ds=Wa(3),Ve=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),zs=new WeakMap,yt=wt.createTreeWalker(wt,129);function Ns(t,n){if(!Oa(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ss!==void 0?Ss.createHTML(n):n}var Ms=(t,n)=>{let e=t.length-1,i=[],a,r=n===2?"<svg>":n===3?"<math>":"",s=vn;for(let o=0;o<e;o++){let l=t[o],c,h,p=-1,g=0;for(;g<l.length&&(s.lastIndex=g,h=s.exec(l),h!==null);)g=s.lastIndex,s===vn?h[1]==="!--"?s=$s:h[1]!==void 0?s=As:h[2]!==void 0?(_s.test(h[2])&&(a=RegExp("</"+h[2],"g")),s=vt):h[3]!==void 0&&(s=vt):s===vt?h[0]===">"?(s=a??vn,p=-1):h[1]===void 0?p=-2:(p=s.lastIndex-h[2].length,c=h[1],s=h[3]===void 0?vt:h[3]==='"'?Es:Ts):s===Es||s===Ts?s=vt:s===$s||s===As?s=vn:(s=vt,a=void 0);let b=s===vt&&t[o+1].startsWith("/>")?" ":"";r+=s===vn?l+Rd:p>=0?(i.push(c),l.slice(0,p)+Ba+l.slice(p)+et+b):l+et+(p===-2?o:b)}return[Ns(t,r+(t[e]||"<?>")+(n===2?"</svg>":n===3?"</math>":"")),i]},kn=class t{constructor({strings:n,_$litType$:e},i){let a;this.parts=[];let r=0,s=0,o=n.length-1,l=this.parts,[c,h]=Ms(n,e);if(this.el=t.createElement(c,i),yt.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=yt.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let p of a.getAttributeNames())if(p.endsWith(Ba)){let g=h[s++],b=a.getAttribute(p).split(et),f=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:f[2],strings:b,ctor:f[1]==="."?ci:f[1]==="?"?ui:f[1]==="@"?hi:xt}),a.removeAttribute(p)}else p.startsWith(et)&&(l.push({type:6,index:r}),a.removeAttribute(p));if(_s.test(a.tagName)){let p=a.textContent.split(et),g=p.length-1;if(g>0){a.textContent=li?li.emptyScript:"";for(let b=0;b<g;b++)a.append(p[b],yn()),yt.nextNode(),l.push({type:2,index:++r});a.append(p[g],yn())}}}else if(a.nodeType===8)if(a.data===Ha)l.push({type:2,index:r});else{let p=-1;for(;(p=a.data.indexOf(et,p+1))!==-1;)l.push({type:7,index:r}),p+=et.length-1}r++}}static createElement(n,e){let i=wt.createElement("template");return i.innerHTML=n,i}};function kt(t,n,e=t,i){if(n===Ve)return n;let a=i!==void 0?e._$Co?.[i]:e._$Cl,r=wn(n)?void 0:n._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(t),a._$AT(t,e,i)),i!==void 0?(e._$Co??=[])[i]=a:e._$Cl=a),a!==void 0&&(n=kt(t,a._$AS(t,n.values),a,i)),n}var di=class{constructor(n,e){this._$AV=[],this._$AN=void 0,this._$AD=n,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(n){let{el:{content:e},parts:i}=this._$AD,a=(n?.creationScope??wt).importNode(e,!0);yt.currentNode=a;let r=yt.nextNode(),s=0,o=0,l=i[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new Wt(r,r.nextSibling,this,n):l.type===1?c=new l.ctor(r,l.name,l.strings,this,n):l.type===6&&(c=new pi(r,this,n)),this._$AV.push(c),l=i[++o]}s!==l?.index&&(r=yt.nextNode(),s++)}return yt.currentNode=wt,a}p(n){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(n,i,e),e+=i.strings.length-2):i._$AI(n[e])),e++}},Wt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(n,e,i,a){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=n,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let n=this._$AA.parentNode,e=this._$AM;return e!==void 0&&n?.nodeType===11&&(n=e.parentNode),n}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(n,e=this){n=kt(this,n,e),wn(n)?n===m||n==null||n===""?(this._$AH!==m&&this._$AR(),this._$AH=m):n!==this._$AH&&n!==Ve&&this._(n):n._$litType$!==void 0?this.$(n):n.nodeType!==void 0?this.T(n):Ls(n)?this.k(n):this._(n)}O(n){return this._$AA.parentNode.insertBefore(n,this._$AB)}T(n){this._$AH!==n&&(this._$AR(),this._$AH=this.O(n))}_(n){this._$AH!==m&&wn(this._$AH)?this._$AA.nextSibling.data=n:this.T(wt.createTextNode(n)),this._$AH=n}$(n){let{values:e,_$litType$:i}=n,a=typeof i=="number"?this._$AC(n):(i.el===void 0&&(i.el=kn.createElement(Ns(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{let r=new di(a,this),s=r.u(this.options);r.p(e),this.T(s),this._$AH=r}}_$AC(n){let e=zs.get(n.strings);return e===void 0&&zs.set(n.strings,e=new kn(n)),e}k(n){Oa(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,a=0;for(let r of n)a===e.length?e.push(i=new t(this.O(yn()),this.O(yn()),this,this.options)):i=e[a],i._$AI(r),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(n=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);n!==this._$AB;){let i=xs(n).nextSibling;xs(n).remove(),n=i}}setConnected(n){this._$AM===void 0&&(this._$Cv=n,this._$AP?.(n))}},xt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(n,e,i,a,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=n,this.name=e,this._$AM=a,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(n,e=this,i,a){let r=this.strings,s=!1;if(r===void 0)n=kt(this,n,e,0),s=!wn(n)||n!==this._$AH&&n!==Ve,s&&(this._$AH=n);else{let o=n,l,c;for(n=r[0],l=0;l<r.length-1;l++)c=kt(this,o[i+l],e,l),c===Ve&&(c=this._$AH[l]),s||=!wn(c)||c!==this._$AH[l],c===m?n=m:n!==m&&(n+=(c??"")+r[l+1]),this._$AH[l]=c}s&&!a&&this.j(n)}j(n){n===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,n??"")}},ci=class extends xt{constructor(){super(...arguments),this.type=3}j(n){this.element[this.name]=n===m?void 0:n}},ui=class extends xt{constructor(){super(...arguments),this.type=4}j(n){this.element.toggleAttribute(this.name,!!n&&n!==m)}},hi=class extends xt{constructor(n,e,i,a,r){super(n,e,i,a,r),this.type=5}_$AI(n,e=this){if((n=kt(this,n,e,0)??m)===Ve)return;let i=this._$AH,a=n===m&&i!==m||n.capture!==i.capture||n.once!==i.once||n.passive!==i.passive,r=n!==m&&(i===m||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,n),this._$AH=n}handleEvent(n){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,n):this._$AH.handleEvent(n)}},pi=class{constructor(n,e,i){this.element=n,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(n){kt(this,n)}},Cs={M:Ba,P:et,A:Ha,C:1,L:Ms,R:di,D:Ls,V:kt,I:Wt,H:xt,N:ui,U:hi,B:ci,F:pi},Kd=Fa.litHtmlPolyfillSupport;Kd?.(kn,Wt),(Fa.litHtmlVersions??=[]).push("3.3.3");var Ps=(t,n,e)=>{let i=e?.renderBefore??n,a=i._$litPart$;if(a===void 0){let r=e?.renderBefore??null;i._$litPart$=a=new Wt(n.insertBefore(yn(),r),r,void 0,e??{})}return a._$AI(t),a};var Ra=globalThis,oe=class extends Xe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let n=super.createRenderRoot();return this.renderOptions.renderBefore??=n.firstChild,n}update(n){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(n),this._$Do=Ps(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ve}};oe._$litElement$=!0,oe.finalized=!0,Ra.litElementHydrateSupport?.({LitElement:oe});var Vd=Ra.litElementPolyfillSupport;Vd?.({LitElement:oe});(Ra.litElementVersions??=[]).push("4.2.2");var mi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},dt=t=>(...n)=>({_$litDirective$:t,values:n}),lt=class{constructor(n){}get _$AU(){return this._$AM._$AU}_$AT(n,e,i){this._$Ct=n,this._$AM=e,this._$Ci=i}_$AS(n,e){return this.update(n,e)}update(n,e){return this.render(...e)}};var St=class extends lt{constructor(n){if(super(n),this.it=m,n.type!==mi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(n){if(n===m||n==null)return this._t=void 0,this.it=n;if(n===Ve)return n;if(typeof n!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(n===this.it)return this._t;this.it=n;let e=[n];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};St.directiveName="unsafeHTML",St.resultType=1;var lg=dt(St);var xn=class extends St{};xn.directiveName="unsafeSVG",xn.resultType=2;var Rt=dt(xn);var jd="M7.2 18.5h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 18.5z",gi="M7.2 14.8h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 14.8z",Is='<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M4 7.5h16M7 5.3h.01M9.5 5.3h.01"/><circle cx="12" cy="14" r="4.2"/>',Sn={sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5"/>',moon:'<path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z"/>',cloud:`<path d="${jd}"/>`,partly:'<path d="M8 3.2v1.3M3.2 8h1.3M4.6 4.6l.9.9M11.4 4.6l-.9.9M5.4 10.6A3 3 0 1 1 10.9 6.9"/><path d="M9.2 19.5h8.3a3.4 3.4 0 0 0 .4-6.78 4.6 4.6 0 0 0-8.9 1.2 2.8 2.8 0 0 0 .2 5.58z"/>',rain:`<path d="${gi}"/><path d="M8.6 17.6l-1 2.4M12.6 17.6l-1 2.4M16.6 17.6l-1 2.4"/>`,pour:`<path d="${gi}"/><path d="M8.2 17.4l-1.4 3.4M11.4 17.4l-1.4 3.4M14.6 17.4l-1.4 3.4M17.8 17.4l-1.4 3.4"/>`,snow:`<path d="${gi}"/><path d="M8.5 18.2h.01M12 19.8h.01M15.5 18.2h.01M10.2 21.4h.01M13.8 21.4h.01" stroke-width="2.2"/>`,fog:'<path d="M4 8.5h16M6.5 12.5h11M4 16.5h16"/>',bolt:`<path d="${gi}"/><path d="M12.8 15.6l-2.2 3.3h3l-2.2 3.3"/>`,wind:'<path d="M3 8.5h10.5A2.5 2.5 0 1 0 11 6M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5M3 16.5h7"/>',washer:Is,dryer:Is+'<path d="M9.6 14.4c.8-.9 1.6-.9 2.4 0s1.6.9 2.4 0"/>',bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.5a2.1 2.1 0 0 0 4 0"/>',window:'<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 3v18M5 12h14"/>',door:'<path d="M6 21V3.5h12V21M4 21h16"/><path d="M14.5 12.5h.01" stroke-width="2.2"/>',bulb:'<path d="M9.5 17.5h5M10.3 20.5h3.4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',bin:'<path d="M4.5 6.5h15M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14M10 10.5v6M14 10.5v6"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.7"/>',cam:'<path d="M3.5 7.5h3l1.8-2.5h7.4l1.8 2.5h3v12h-17z"/><circle cx="12" cy="13" r="3.6"/>',thermo:'<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>',drop:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',plug:'<path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0zM12 16.5V21"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',back:'<path d="M15 6l-6 6 6 6"/>',forward:'<path d="M9 6l6 6-6 6"/>',shutter:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7.5h16M4 11h16M4 14.5h16M4 18h16"/>',shutter_open:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7h16"/>',awning:'<path d="M3 5h18"/><path d="M4.5 5v2.5h15V5"/>',awning_out:'<path d="M3 4.5h18l-2.5 8h-13z"/><path d="M5.5 12.5q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0"/>',pause:'<path d="M9 5.5v13M15 5.5v13"/>',play:'<path d="M8 5.5l11 6.5-11 6.5z"/>',mute:'<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',speaker:'<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',reload:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',tablet:'<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M11 18h2"/>',watch:'<rect x="7" y="6.5" width="10" height="11" rx="2.6"/><path d="M9 6.5l.6-3.5h4.8l.6 3.5M9 17.5l.6 3.5h4.8l.6-3.5"/>',battery:'<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3"/><path d="M6 10.5v3" stroke-width="2.2"/>',car:'<path d="M4 15.5V12l1.8-4.2A2 2 0 0 1 7.6 6.5h8.8a2 2 0 0 1 1.8 1.3L20 12v3.5"/><path d="M3 15.5h18v2.3a.7.7 0 0 1-.7.7H18.6M5.4 18.5H3.7a.7.7 0 0 1-.7-.7v-2.3"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/><path d="M4.6 11.8h14.8"/>',robot:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.6 8.6a6.8 6.8 0 0 1 10.8 0"/>',person:'<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>',home:'<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',solar:'<path d="M3.5 18l2-8h13l2 8z"/><path d="M4.6 14h14.8M9.2 10l-.9 8M14.8 10l.9 8"/><path d="M12 2.8v2.4M7.4 4.3l1.1 1.6M16.6 4.3l-1.1 1.6"/>',charge:'<path d="M13 3L6 13.5h5L10 21l7-10.5h-5z"/>',leaf:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-4 6-6.5 9-8"/>',warning:'<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.3h.01"/>',pin:'<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',euro:'<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.6a4 4 0 1 0 0 6.8M7.5 11h6M7.5 13.2h6"/>',motion:'<path d="M12 12h.01" stroke-width="2.4"/><path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',unlock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 7.7-1.5"/>',gauge:'<path d="M4.5 17a8 8 0 1 1 15 0"/><path d="M12 13l3.5-4"/>',leak:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',music:'<path d="M9 17.5V5.5l10-2v12"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/><path d="M9 9.5l10-2"/>',page:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9h17M9 9v10.5"/>',tv:'<rect x="2.5" y="4.5" width="19" height="12.5" rx="1.8"/><path d="M8.5 20.5h7M12 17v3.5"/>',sparkle:'<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',cat:'<path d="M5 9.5V4l4 3h6l4-3v5.5c0 5-3.1 9.5-7 9.5s-7-4.5-7-9.5z"/><path d="M9.5 12h.01M14.5 12h.01" stroke-width="2.2"/><path d="M10.8 15c.7.5 1.7.5 2.4 0"/>',printer:'<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M4 8h16M8 13.5h8M10 16.5h4M12 8v3.5"/>',wifi:'<path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0"/><path d="M12 19.5h.01" stroke-width="2.4"/>',timer:'<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M9.5 3h5M12 3v2.5M18.5 6.5l1.5-1.5"/>',train:'<rect x="5.5" y="3" width="13" height="14" rx="3"/><path d="M5.5 10.5h13M9 14h.01M15 14h.01M8.5 17l-2 3.5M15.5 17l2 3.5"/>',flower:'<circle cx="12" cy="9" r="2.2"/><path d="M12 6.8c0-2.4 1.2-3.8 2.4-3.8s1.6 1.6.6 3.4M14.2 9c2.4 0 3.8 1.2 3.8 2.4s-1.6 1.6-3.4.6M12 11.2c0 2.4-1.2 3.8-2.4 3.8S8 13.4 9 11.6M9.8 9C7.4 9 6 7.8 6 6.6s1.6-1.6 3.4-.6M12 11.5V21M12 17c1.5-2 3.5-2.5 5-2"/>'},X=(t,n="")=>Ae`<svg class="ic ${n}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Rt(Sn[t??""]??Sn.info)}</svg>`,Ka={sunny:["sun","Sonnig"],"clear-night":["moon","Klar"],partlycloudy:["partly","Teils bew\xF6lkt"],cloudy:["cloud","Bew\xF6lkt"],rainy:["rain","Regen"],pouring:["pour","Starkregen"],snowy:["snow","Schnee"],"snowy-rainy":["snow","Schneeregen"],hail:["snow","Hagel"],fog:["fog","Nebel"],lightning:["bolt","Gewitter"],"lightning-rainy":["bolt","Gewitter"],windy:["wind","Windig"],"windy-variant":["wind","Windig"],exceptional:["bolt","Unwetter"]},De=t=>Ka[t??""]?.[0]??"cloud",qe=t=>Ka[t??""]?d(Ka[t??""][1]):t??"\u2013",Kt={"mdi:washing-machine":"washer","mdi:tumble-dryer":"dryer","mdi:bell":"bell","mdi:timer-outline":"timer","mdi:timer-sand":"timer","mdi:train":"train","mdi:bus":"train","mdi:flower-pollen":"flower","mdi:flower":"flower","mdi:pin-outline":"pin","mdi:calendar-clock":"calendar","mdi:radar":"rain","mdi:weather-sunset":"sun","mdi:doorbell":"bell","mdi:window-open":"window","mdi:door-open":"door","mdi:lightbulb":"bulb","mdi:trash-can":"bin","mdi:thermometer":"thermo","mdi:water-percent":"drop","mdi:calendar":"calendar","mdi:cctv":"cam","mdi:car":"car","mdi:car-electric":"car","mdi:robot-vacuum":"robot","mdi:account":"person","mdi:home":"home","mdi:solar-power":"solar","mdi:solar-panel":"solar","mdi:lightning-bolt":"charge","mdi:flash":"charge","mdi:leaf":"leaf","mdi:alert":"warning","mdi:map-marker":"pin","mdi:currency-eur":"euro","mdi:motion-sensor":"motion","mdi:lock":"lock","mdi:lock-open":"unlock","mdi:water-alert":"leak","mdi:weather-sunny":"sun","mdi:weather-rainy":"rain","mdi:air-filter":"leaf","mdi:brightness-5":"sun","mdi:music":"music","mdi:cat":"cat","mdi:printer-3d":"printer","mdi:wifi":"wifi","mdi:music-note":"music","mdi:speaker":"music"},G=(t,n="")=>t?Sn[t]?X(t,n):Kt[t]?X(Kt[t],n):t.includes(":")&&customElements.get("ha-icon")?u`<ha-icon class="ic ${n}" icon=${t} style="--mdc-icon-size:1em;width:1em;height:1em;display:inline-flex"></ha-icon>`:X(void 0,n):X(void 0,n);var Gd=/(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`|\[mdi:[a-z0-9-]+\])/g,Vt=t=>t.split(Gd).filter(n=>n!=="").map(n=>/^(\*\*|__).+\1$/.test(n)?u`<strong>${n.slice(2,-2)}</strong>`:/^`.+`$/.test(n)?u`<code>${n.slice(1,-1)}</code>`:/^\[mdi:[a-z0-9-]+\]$/.test(n)?G(n.slice(1,-1),"md-ic"):/^([*_]).+\1$/.test(n)?u`<em>${n.slice(1,-1)}</em>`:n),Fs=t=>{let n=[],e=()=>n[n.length-1];for(let i of t.replace(/\r/g,"").split(`
`)){let a=i.trimEnd(),r;if(!a.trim())n.push({kind:"p",lines:[]});else if(r=a.match(/^(#{1,3})\s+(.*)$/))n.push({kind:"h",level:r[1].length,text:r[2]});else if(/^\s*(---+|\*\*\*+)\s*$/.test(a))n.push({kind:"hr"});else if(r=a.match(/^\s*[-*•]\s+(.*)$/)){let s=e();s?.kind==="ul"?s.items.push(r[1]):n.push({kind:"ul",items:[r[1]]})}else if(r=a.match(/^\s*\d+[.)]\s+(.*)$/)){let s=e();s?.kind==="ol"?s.items.push(r[1]):n.push({kind:"ol",items:[r[1]]})}else{let s=e();s?.kind==="p"?s.lines.push(a):n.push({kind:"p",lines:[a]})}}return u`<div class="md">
    ${n.map(i=>{switch(i.kind){case"h":return i.level===1?u`<h1 class="display">${Vt(i.text)}</h1>`:i.level===2?u`<h2 class="display">${Vt(i.text)}</h2>`:u`<h3>${Vt(i.text)}</h3>`;case"hr":return u`<hr />`;case"ul":return u`<ul>
            ${i.items.map(a=>u`<li>${Vt(a)}</li>`)}
          </ul>`;case"ol":return u`<ol>
            ${i.items.map(a=>u`<li>${Vt(a)}</li>`)}
          </ol>`;default:return i.lines.length?u`<p>${i.lines.map((a,r)=>u`${r?u`<br />`:m}${Vt(a)}`)}</p>`:m}})}
  </div>`},Bs=C`
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
`;var Ud=He("fraunces"),Va=He("inter"),ct={bg:"#0a0d0b","bg-art":"none",ink:"#ede7db","ink-2":"rgba(237, 231, 219, 0.66)","ink-3":"rgba(237, 231, 219, 0.4)",line:"rgba(237, 231, 219, 0.1)",surface:"rgba(237, 231, 219, 0.045)",accent:"#d6a865","accent-soft":"rgba(214, 168, 101, 0.14)",cold:"#9dbad6",alert:"#ef8b63",good:"#9cc5a1",panel:"rgba(18, 21, 19, 0.92)",chip:"rgba(10, 13, 11, 0.62)",shadow:"0 30px 80px rgba(0, 0, 0, 0.55)",veil:"rgba(6, 9, 7, 0.52)",colon:"inherit","colon-opacity":"0.55",mist:"rgba(255, 255, 255, 0.07)"},$t={bg:"#f2ede3","bg-art":"none",ink:"#1e1b16","ink-2":"rgba(30, 27, 22, 0.64)","ink-3":"rgba(30, 27, 22, 0.42)",line:"rgba(30, 27, 22, 0.11)",surface:"rgba(255, 255, 255, 0.55)",accent:"#9a7334","accent-soft":"rgba(154, 115, 52, 0.13)",cold:"#3d6a8f",alert:"#c0552f",good:"#4f8a5b",panel:"rgba(250, 247, 240, 0.95)",chip:"rgba(250, 247, 240, 0.8)",shadow:"0 30px 80px rgba(60, 45, 20, 0.16)",veil:"rgba(242, 237, 227, 0.55)",colon:"inherit","colon-opacity":"0.5",mist:"rgba(120, 100, 70, 0.07)"},ut={display:Ud,sans:Va,"clock-weight":"300","clock-track":"-0.02em"},Hs={card:"transparent","card-border":"0 solid transparent","card-radius":"0","card-pad":"26px 0 0"},fi=(t,n,e)=>`radial-gradient(60% 70% at 12% 18%, ${t}, transparent 62%), radial-gradient(55% 65% at 88% 26%, ${n}, transparent 62%), radial-gradient(75% 70% at 58% 100%, ${e}, transparent 64%)`,Ga=[{id:"ruhig",name:"Ruhig",hint:"Serifen-Uhr, warmes Wei\xDF, Bambus",ambient:"none",shared:ut,dark:ct,light:$t},{id:"klar",name:"Klar",hint:"StandBy-Stil, schlicht, Salbei",ambient:"none",shared:{...ut,display:Va,"clock-weight":"200","clock-track":"-0.05em"},dark:{...ct,accent:"#a8cab5","accent-soft":"rgba(168, 202, 181, 0.14)"},light:{...$t,bg:"#f3f4f1",ink:"#141714","ink-2":"rgba(20, 23, 20, 0.64)","ink-3":"rgba(20, 23, 20, 0.42)",line:"rgba(20, 23, 20, 0.1)",surface:"rgba(255, 255, 255, 0.7)",accent:"#4f7d63","accent-soft":"rgba(79, 125, 99, 0.13)",panel:"rgba(250, 251, 249, 0.95)",chip:"rgba(250, 251, 249, 0.8)",shadow:"0 30px 80px rgba(20, 30, 20, 0.14)",veil:"rgba(243, 244, 241, 0.55)"}},{id:"gold",name:"Gold",hint:"Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein",ambient:"none",shared:ut,dark:{...ct,bg:"#09090a",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.68)","ink-3":"rgba(255, 255, 255, 0.42)",line:"rgba(255, 255, 255, 0.1)",surface:"rgba(255, 255, 255, 0.045)",accent:"#d9b45f","accent-soft":"rgba(217, 180, 95, 0.15)",cold:"#a9c4dc",colon:"var(--af-accent)","colon-opacity":"1"},light:{...$t,bg:"#f6f3ec",ink:"#16130f","ink-2":"rgba(22, 19, 15, 0.64)","ink-3":"rgba(22, 19, 15, 0.42)",line:"rgba(22, 19, 15, 0.11)",surface:"rgba(255, 255, 255, 0.7)",accent:"#a8803a","accent-soft":"rgba(168, 128, 58, 0.13)",cold:"#3f6f9c",panel:"rgba(255, 255, 255, 0.94)",chip:"rgba(255, 255, 255, 0.78)",shadow:"0 30px 80px rgba(60, 45, 20, 0.18)",veil:"rgba(246, 243, 236, 0.55)",colon:"var(--af-accent)","colon-opacity":"1"}},{id:"glass",name:"Liquid Glass",hint:"Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben",ambient:"flow",shared:{...ut,display:Va,"clock-weight":"300","clock-track":"-0.04em","card-radius":"34px"},dark:{...ct,bg:"#0b1020","bg-art":fi("rgba(90, 120, 255, 0.5)","rgba(255, 120, 175, 0.38)","rgba(60, 210, 195, 0.36)"),"flow-1":"rgba(90, 120, 255, 0.55)","flow-2":"rgba(255, 120, 175, 0.42)","flow-3":"rgba(60, 210, 195, 0.4)",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.74)","ink-3":"rgba(255, 255, 255, 0.5)",line:"rgba(255, 255, 255, 0.16)",surface:"rgba(255, 255, 255, 0.08)",accent:"#9fd4ff","accent-soft":"rgba(159, 212, 255, 0.16)",cold:"#a8c8ff",good:"#8fe3b0",alert:"#ff9f7a",card:"linear-gradient(140deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05) 55%, rgba(255, 255, 255, 0.1))","card-border":"1px solid rgba(255, 255, 255, 0.24)","card-filter":"blur(24px) saturate(1.8)","card-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0, 0, 30, 0.3)",panel:"rgba(28, 32, 58, 0.7)",chip:"rgba(255, 255, 255, 0.14)",veil:"rgba(10, 14, 30, 0.4)",shadow:"0 30px 80px rgba(0, 0, 30, 0.5)",mist:"rgba(255, 255, 255, 0.09)"},light:{...$t,bg:"#e9edf7","bg-art":fi("rgba(150, 140, 255, 0.5)","rgba(255, 175, 150, 0.5)","rgba(120, 215, 205, 0.45)"),"flow-1":"rgba(150, 140, 255, 0.55)","flow-2":"rgba(255, 175, 150, 0.55)","flow-3":"rgba(120, 215, 205, 0.5)",ink:"#0f1320","ink-2":"rgba(15, 19, 32, 0.66)","ink-3":"rgba(15, 19, 32, 0.44)",line:"rgba(15, 19, 32, 0.09)",surface:"rgba(255, 255, 255, 0.5)",accent:"#2f6fe0","accent-soft":"rgba(47, 111, 224, 0.12)",cold:"#2f6fe0",good:"#2f8a5b",alert:"#d0552f",card:"linear-gradient(140deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.4) 55%, rgba(255, 255, 255, 0.58))","card-border":"1px solid rgba(255, 255, 255, 0.85)","card-filter":"blur(24px) saturate(1.6)","card-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 18px 44px rgba(40, 50, 100, 0.14)",panel:"rgba(255, 255, 255, 0.75)",chip:"rgba(255, 255, 255, 0.62)",veil:"rgba(233, 237, 247, 0.45)",shadow:"0 30px 80px rgba(40, 50, 100, 0.18)",mist:"rgba(255, 255, 255, 0.55)"}},{id:"aurora",name:"Aurora",hint:"Ruhig flie\xDFende Farben wie Nordlicht",ambient:"flow",shared:{...ut,display:He("outfit"),"clock-weight":"200","clock-track":"-0.03em"},dark:{...ct,bg:"#060a14","bg-art":fi("rgba(60, 220, 170, 0.36)","rgba(130, 90, 255, 0.36)","rgba(40, 120, 255, 0.3)"),"flow-1":"rgba(60, 220, 170, 0.42)","flow-2":"rgba(130, 90, 255, 0.4)","flow-3":"rgba(40, 120, 255, 0.34)",ink:"#eef3f7","ink-2":"rgba(238, 243, 247, 0.7)","ink-3":"rgba(238, 243, 247, 0.45)",line:"rgba(238, 243, 247, 0.12)",surface:"rgba(238, 243, 247, 0.06)",accent:"#7fe0c4","accent-soft":"rgba(127, 224, 196, 0.14)",cold:"#8fb8ff",card:"rgba(255, 255, 255, 0.06)","card-border":"1px solid rgba(255, 255, 255, 0.1)","card-filter":"blur(18px) saturate(1.4)",panel:"rgba(12, 18, 32, 0.85)",chip:"rgba(12, 18, 32, 0.6)",veil:"rgba(6, 10, 20, 0.5)"},light:{...$t,bg:"#f7f3ef","bg-art":fi("rgba(255, 185, 140, 0.5)","rgba(200, 165, 255, 0.45)","rgba(140, 225, 205, 0.42)"),"flow-1":"rgba(255, 185, 140, 0.55)","flow-2":"rgba(200, 165, 255, 0.5)","flow-3":"rgba(140, 225, 205, 0.45)",ink:"#1b1820","ink-2":"rgba(27, 24, 32, 0.64)","ink-3":"rgba(27, 24, 32, 0.42)",line:"rgba(27, 24, 32, 0.09)",surface:"rgba(255, 255, 255, 0.45)",accent:"#7457d6","accent-soft":"rgba(116, 87, 214, 0.12)",cold:"#4a7fd6",card:"rgba(255, 255, 255, 0.45)","card-border":"1px solid rgba(255, 255, 255, 0.75)","card-filter":"blur(18px) saturate(1.3)",panel:"rgba(255, 252, 249, 0.85)",chip:"rgba(255, 252, 249, 0.65)",veil:"rgba(247, 243, 239, 0.5)",mist:"rgba(255, 255, 255, 0.5)"}},{id:"editorial",name:"Editorial",hint:"Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien",ambient:"none",shared:{...ut,...Hs,display:He("instrument"),"clock-weight":"400","clock-track":"-0.01em","card-rule":"1.5px solid currentColor"},dark:{...ct,bg:"#141311",ink:"#ece5d8","ink-2":"rgba(236, 229, 216, 0.68)","ink-3":"rgba(236, 229, 216, 0.44)",line:"rgba(236, 229, 216, 0.16)",surface:"rgba(236, 229, 216, 0.05)",accent:"#e08d63","accent-soft":"rgba(224, 141, 99, 0.14)",panel:"rgba(24, 23, 20, 0.95)",chip:"rgba(20, 19, 17, 0.7)",veil:"rgba(10, 9, 8, 0.55)"},light:{...$t,bg:"#f3eee4",ink:"#1c1915","ink-2":"rgba(28, 25, 21, 0.7)","ink-3":"rgba(28, 25, 21, 0.48)",line:"rgba(28, 25, 21, 0.16)",surface:"rgba(28, 25, 21, 0.05)",accent:"#a8432a","accent-soft":"rgba(168, 67, 42, 0.1)",cold:"#2f5d8a",alert:"#b8401f",good:"#3f7a4b",panel:"rgba(246, 242, 234, 0.97)",chip:"rgba(246, 242, 234, 0.85)",veil:"rgba(243, 238, 228, 0.6)",shadow:"0 30px 80px rgba(40, 30, 20, 0.14)"}},{id:"minimal",name:"Minimal",hint:"Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie",ambient:"none",shared:{...ut,...Hs,display:He("geist"),sans:He("geist"),"clock-weight":"400","clock-track":"-0.055em","card-rule":"1px solid color-mix(in srgb, currentColor 22%, transparent)"},dark:{...ct,bg:"#000000",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.6)","ink-3":"rgba(255, 255, 255, 0.38)",line:"rgba(255, 255, 255, 0.14)",surface:"rgba(255, 255, 255, 0.06)",accent:"#ff5a36","accent-soft":"rgba(255, 90, 54, 0.14)",cold:"#7fb2ff",panel:"rgba(16, 16, 16, 0.96)",chip:"rgba(0, 0, 0, 0.7)",veil:"rgba(0, 0, 0, 0.55)",colon:"var(--af-accent)","colon-opacity":"1"},light:{...$t,bg:"#f6f6f4",ink:"#0b0b0b","ink-2":"rgba(11, 11, 11, 0.6)","ink-3":"rgba(11, 11, 11, 0.4)",line:"rgba(11, 11, 11, 0.12)",surface:"rgba(11, 11, 11, 0.05)",accent:"#e8401c","accent-soft":"rgba(232, 64, 28, 0.1)",cold:"#2f6fe0",panel:"rgba(250, 250, 248, 0.97)",chip:"rgba(250, 250, 248, 0.85)",veil:"rgba(246, 246, 244, 0.6)",shadow:"0 30px 80px rgba(0, 0, 0, 0.12)",colon:"var(--af-accent)","colon-opacity":"1"}}],ht=Ga.map(({id:t,name:n,hint:e,ambient:i})=>({id:t,name:n,hint:e,ambient:i})),Os=t=>t==="weissgold"?{theme:"gold",light:!0}:{theme:Ga.some(n=>n.id===t)?t:"ruhig",light:!1},ja=t=>Object.entries(t).map(([n,e])=>`--af-${n}: ${e};`).join(`
    `),qd=Ga.map(t=>`
  :host([theme="${t.id}"]) {
    ${ja({...t.shared,...t.dark})}
  }
  :host([theme="${t.id}"][mode="light"]) {
    ${ja({...t.shared,...t.light})}
  }`).join(`
`),Ws=[C`
    :host {
      --af-ease: cubic-bezier(0.22, 0.8, 0.24, 1);
      --af-ease-io: cubic-bezier(0.65, 0, 0.35, 1);
      --af-ease-soft: cubic-bezier(0.45, 0, 0.25, 1);
    }
  `,fn(`:host { ${ja({...ut,...ct})} }`),fn(qd),C`
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
  `],Rs=C`
  .onphoto {
    --af-ink: #ffffff;
    --af-ink-2: rgba(255, 255, 255, var(--af-c2, 0.78));
    --af-ink-3: rgba(255, 255, 255, var(--af-c3, 0.55));
    --af-line: rgba(255, 255, 255, 0.16);
    --af-surface: rgba(10, 10, 10, 0.28);
    --af-cold: #b8d0e6;
  }
`,Ks=C`
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
`,W=C`
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
`,pt=C`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: var(--af-valign, flex-start);
    align-items: var(--af-align, flex-start);
    text-align: var(--af-text-align, left);
  }
`;var Vs=t=>typeof t=="string"&&(t.includes("{{")||t.includes("{%")),jt=new Map,js=(t,n,e)=>{let i=jt.get(n);if(!i){let r={listeners:new Set};i=r,jt.set(n,r);let s=o=>{r.last=o,r.listeners.forEach(l=>l(o))};r.unsub=t.connection.subscribeMessage(o=>s(o.error!==void 0?{error:o.error}:{value:o.result}),{type:"ambiframe/template/subscribe",template:n}).catch(o=>{jt.get(n)===r&&jt.delete(n),s({error:o?.message??d("Vorlage nicht verf\xFCgbar")})})}let a=i;return clearTimeout(a.closeTimer),a.listeners.add(e),a.last&&e(a.last),()=>{a.listeners.delete(e),!a.listeners.size&&(a.closeTimer=window.setTimeout(()=>{a.listeners.size||jt.get(n)!==a||(jt.delete(n),a.unsub?.then(r=>r?.()))},3e3))}},Gs=t=>t==null?"":typeof t=="number"?t.toLocaleString(ee(),{useGrouping:!1,maximumFractionDigits:10}):typeof t=="boolean"?t?d("ja"):d("nein"):Array.isArray(t)?t.map(Gs).join(", "):typeof t=="object"?JSON.stringify(t):String(t),Zd=t=>{if(typeof t=="boolean")return t;if(typeof t=="number")return t!==0;let n=String(t??"").trim().toLowerCase();if(["true","on","yes","ja","home","open"].includes(n))return!0;let e=Number(n);return n!==""&&Number.isFinite(e)?e!==0:!1},At=class{constructor(n){this.host=n;n.addController(this)}set(n,e){if(!n||!Vs(e)){this.key&&this.clear();return}e!==this.key&&(this.clear(),this.key=e,this.stop=js(n,e,i=>{this.result=i,this.host.requestUpdate()}))}text(n){if(!Vs(n))return n==null?"":String(n);if(this.result)return this.result.error!==void 0?`\u26A0 ${this.result.error}`:Gs(this.result.value)}clear(){this.stop?.(),this.stop=void 0,this.key=void 0,this.result=void 0}hostConnected(){this.host.requestUpdate()}hostDisconnected(){this.clear()}},bi=new EventTarget,$n=new Map,Us=(t,n)=>($n.has(n)||($n.set(n,!1),js(t,n,e=>{let i=e.error===void 0&&Zd(e.value);$n.get(n)!==i&&($n.set(n,i),bi.dispatchEvent(new Event("change")))})),$n.get(n)??!1);var O=(t,n=1)=>{let e=typeof t=="number"?t:parseFloat(String(t));return Number.isFinite(e)?e.toLocaleString(ee(),{minimumFractionDigits:n,maximumFractionDigits:n}):"\u2013"},Y=t=>t.toLocaleTimeString(ee(),{hour:"2-digit",minute:"2-digit"}),Ys=(t,n="long")=>n==="long"?t.toLocaleDateString(ee(),{weekday:"long",day:"numeric",month:"long"}):t.toLocaleDateString(ee(),{weekday:"short",day:"numeric",month:"short"}),An=t=>t.toLocaleDateString(ee(),{weekday:"short"}).replace(".",""),Gt=t=>{let n=new Date(t);return n.setHours(0,0,0,0),n},le=t=>Math.round((Gt(t).getTime()-Gt(new Date).getTime())/864e5),Oe=t=>[d("heute"),d("morgen"),d("\xFCbermorgen")][le(t)]??t.toLocaleDateString(ee(),{weekday:"long"}),Tn=t=>{let n=Math.max(1,Math.round(t/6e4));return n<60?`${n} min`:`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")} h`},Qs=t=>typeof t=="number"?["N","NO","O","SO","S","SW","W","NW"][Math.round(t/45)%8]:String(t??""),te=t=>{if(!t)return null;let n=new Date(String(t).replace(" ","T"));return Number.isNaN(n.getTime())?null:n},R=(t,n)=>n?t?.states[n]:void 0,ve=(t,n,e)=>{let i=R(t,n);if(i)return e?i.attributes?.[e]:i.state},ce=(t,n,e)=>{let i=parseFloat(String(ve(t,n,e)));return Number.isFinite(i)?i:null},me=(t,n)=>R(t,n)?.attributes.friendly_name??n??"";var En=(t,n)=>{let e=t.entities?.[n],i=e?.area_id??(e?.device_id?t.devices?.[e.device_id]?.area_id:void 0);return i?t.areas?.[i]?.name:void 0},qs=t=>{let n=t?.match(/^(\d{1,2}):(\d{2})$/);return n?Number(n[1])*60+Number(n[2]):null};function tt(t,n,e){switch(n.condition){case"and":return(n.conditions??[]).every(i=>tt(t,i,e));case"or":return(n.conditions??[]).some(i=>tt(t,i,e));case"not":return!(n.conditions??[]).some(i=>tt(t,i,e));case"display":return!e?.display||!n.displays?.length||n.displays.includes(e.display);case"orientation":return!e?.orientation||e.orientation===n.orientation;case"template":return!!t&&!!n.value_template&&Us(t,n.value_template);case"changed":{let i=R(t,n.entity);if(!i)return!1;let a=n.state===void 0||n.state===""?null:(Array.isArray(n.state)?n.state:[n.state]).map(String);return a&&!a.includes(i.state)?!1:Date.now()-new Date(i.last_changed).getTime()<=(Number(n.minutes)||10)*6e4}}if(n.condition==="time"){let i=new Date().getHours()*60+new Date().getMinutes(),a=qs(n.after),r=qs(n.before);return a!==null&&r!==null&&a>r?i>=a||i<r:(a===null||i>=a)&&(r===null||i<r)}if(!t)return!0;switch(n.condition){case"state":case"not_state":{let i=String(ve(t,n.entity,n.attribute)),a=(Array.isArray(n.state)?n.state:[n.state]).map(String).includes(i);return n.condition==="state"?a:!a}case"numeric":{let i=ce(t,n.entity,n.attribute);return i===null?!1:(n.above===void 0||i>n.above)&&(n.below===void 0||i<n.below)}case"any_state":{let i=(Array.isArray(n.state)?n.state:[n.state]).map(String);return(n.entities??[]).some(a=>i.includes(String(t.states[a]?.state)))}case"within_days":{let i=te(ve(t,n.entity,n.attribute??(n.entity.startsWith("calendar.")?"start_time":void 0)));if(!i)return!1;let a=le(i);return a>=0&&a<=n.days}default:return!0}}var nt=(t,n,e)=>!n?.length||n.every(i=>tt(t,i,e)),qa=(t,n,e)=>{if(!n)return null;let i=te(ve(t,n,n.startsWith("calendar.")?"start_time":void 0));if(!i)return null;let a=le(i);return a>=0&&a<=e?i:null},je=t=>{if(!t)return"";let n=typeof t=="string"?new Date(t):t,e=Math.round((Date.now()-n.getTime())/6e4);return e<1?d("gerade"):e<60?d("vor {n} min",{n:e}):e<720?d("vor {n} h",{n:Math.round(e/60)}):le(n)===-1?d("gestern {time}",{time:Y(n)}):n.toLocaleDateString(ee(),{weekday:"short",day:"numeric",month:"short"})},Za=(t,n)=>n?n==="home"?d("Zuhause"):n==="not_home"?d("Unterwegs"):Object.values(t?.states??{}).find(i=>i.entity_id.startsWith("zone.")&&(i.attributes.friendly_name===n||i.entity_id===`zone.${n}`))?.attributes.friendly_name??n:"\u2013",Ya=(t,n,e,i)=>{let a=s=>s*Math.PI/180,r=Math.sin(a(e-t)/2)**2+Math.cos(a(t))*Math.cos(a(e))*Math.sin(a(i-n)/2)**2;return 6371*2*Math.atan2(Math.sqrt(r),Math.sqrt(1-r))},vi=(t,n)=>{let e=R(t,n);if(!e)return null;let i=parseFloat(e.state);if(Number.isFinite(i)&&/^\d+(\.\d+)?$/.test(e.state.trim()))return i;let a=e.state.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);if(a)return le(new Date(Number(a[3]),Number(a[2])-1,Number(a[1])));let s=Object.keys(e.attributes).filter(o=>/^\d{4}-\d{2}-\d{2}$/.test(o)).sort().map(o=>te(o)).find(o=>o&&le(o)>=0);return s?le(s):null},yi=(t,n)=>{let e=[...t.children].find(i=>i.classList.contains("af-custom"));if(!n?.trim()){e?.remove();return}e||(e=document.createElement("style"),e.className="af-custom",t.appendChild(e)),e.textContent!==n&&(e.textContent=n)},Zs=t=>!!t&&typeof t=="object"&&!Array.isArray(t),Ua=(t,n)=>{if(!n)return t;let e={...t};for(let[i,a]of Object.entries(n))a==null||a===""||(e[i]=Zs(a)&&Zs(e[i])?Ua(e[i],a):a);return e},zn=(t,n)=>{let e=t?.displays.find(a=>a.id===n);if(!t||!e||!e.design&&!e.photos)return t;let i=Ua(t.design,e.design);return e.design?.css&&t.design.css&&(i.css=`${t.design.css}
${e.design.css}`),{...t,design:i,photos:Ua(t.photos,e.photos)}},Yd=/\s*(battery level|batteriestand|batterie|battery|akku)\s*$/i,Qd=/^(low|niedrig|schwach|critical|kritisch)$/i,Jd=t=>/watch/i.test(t)?"watch":/ipad|tablet|tab[ _]/i.test(t)?"tablet":/iphone|phone|pixel|galaxy/i.test(t)?"phone":"other",Qa=(t,n={})=>{let e=t?.states??{},i=Number(n.threshold??21),a=new Set(n.exclude??[]),r=p=>String(e[p]?.attributes.friendly_name??p).replace(Yd,"").trim(),s=(n.devices??[]).map(p=>typeof p=="string"?{entity:p}:p).filter(p=>p.entity),o=Object.keys(e).filter(p=>p.startsWith("sensor.")&&p.endsWith("_battery_level")&&e[p.replace(/_level$/,"_state")]).map(p=>({entity:p,name:void 0})),l=(s.length?s:o).filter(p=>e[p.entity]&&!a.has(p.entity)).map(p=>{let g=e[p.entity],b=parseFloat(g.state),f=e[p.entity.replace(/_level$/,"_state")]?.state??"",v=p.name||r(p.entity);return{id:p.entity,name:v,level:Number.isFinite(b)?b:null,charging:/^(charging|full|lädt|voll)$/i.test(f)||g.attributes.is_charging===!0,kind:Jd(`${p.entity} ${v}`)}}),c=new Set(l.flatMap(p=>[p.id,p.id.replace(/_level$/,"_state")])),h=[];for(let[p,g]of Object.entries(e)){if(c.has(p)||a.has(p)||g.attributes.device_class!=="battery"||g.state==="unavailable"||g.state==="unknown")continue;if(p.startsWith("binary_sensor.")){g.state==="on"&&h.push({id:p,name:r(p),level:null,charging:!1,kind:"other"});continue}if(!p.startsWith("sensor."))continue;let b=parseFloat(g.state);(Number.isFinite(b)?g.attributes.unit_of_measurement==="%"&&b<i:Qd.test(g.state))&&h.push({id:p,name:r(p),level:Number.isFinite(b)?b:null,charging:!1,kind:"other"})}return h.sort((p,g)=>(p.level??-1)-(g.level??-1)),{devices:l,low:h}};var Xd=[[.65,1],[.45,.94],[.35,.88],[.3,.82]],J=class extends oe{constructor(){super(...arguments);this.options={}}watched(){return[]}updated(e){super.updated?.(e),this.fitToBox()}fitToBox(){if(this.style.removeProperty("--af-dense"),this.style.removeProperty("--af-fs"),!this.clientHeight||this.scrollHeight<=this.clientHeight+2)return;let e=parseFloat(getComputedStyle(this).getPropertyValue("--af-fs"))||1;for(let[i,a]of Xd)if(this.style.setProperty("--af-dense",String(i)),this.style.setProperty("--af-fs",String(e*a)),this.scrollHeight<=this.clientHeight+2)return}shouldUpdate(e){if(e.size===1&&e.has("hass")){let i=e.get("hass");return!i||!this.hass?!0:this.watched().some(a=>a&&i.states[a]!==this.hass.states[a])}return!0}};J.properties={hass:{attribute:!1},options:{attribute:!1},ctx:{attribute:!1}},J.styles=W;var ne=class extends J{connectedCallback(){super.connectedCallback();let n=()=>{let e=6e4-Date.now()%6e4+50;this.tickTimer=window.setTimeout(()=>{this.requestUpdate(),n()},e)};n()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.tickTimer)}},B=(t,n)=>{customElements.get(t)||customElements.define(t,n)};var ec={ink:"var(--af-ink)",muted:"var(--af-ink-2)",faint:"var(--af-ink-3)",accent:"var(--af-accent)"},Ja=(t,n)=>ec[String(t)]??(t?String(t):n),wi=class extends ne{connectedCallback(){super.connectedCallback(),this.options.seconds&&(this.secTimer=window.setInterval(()=>this.requestUpdate(),1e3))}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.secTimer)}render(){let n=new Date,[e,i]=Y(n).split(":"),a=this.options.size==="small",r=this.options.font==="sans"||a?"":"display",s=this.options.seconds?u`<span class="col">:</span>${String(n.getSeconds()).padStart(2,"0")}`:m;return u`<div class="clock num ${r} ${a?"small":""}" style="color:${Ja(this.options.color,"")}">
      ${e}<span class="col">:</span>${i}${s}
    </div>`}};wi.styles=[W,pt,C`
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
    `];var ki=class extends ne{render(){let n=new Date;if(this.options.style==="card")return u`<div class="card" style="width:100%">
        <div class="label">${n.toLocaleDateString(ee(),{weekday:"long"})}</div>
        <div class="day display num">${n.getDate()}</div>
        <div class="month">${n.toLocaleDateString(ee(),{month:"long",year:"numeric"})}</div>
      </div>`;let e=Number(this.options.size)||26,i=this.options.color?"":"var(--af-ink-2)";return u`<div class="date" style="font-size:${e}px;color:${Ja(this.options.color,i)}">
      ${Ys(n,this.options.format==="short"?"short":"long")}
    </div>`}};ki.styles=[W,pt,C`
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
    `];var Js={label:"font-size: calc(16px * var(--af-fs, 1));letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:var(--af-ink-3)",title:"font-size:44px;line-height:1.05",body:"font-size: calc(21px * var(--af-fs, 1));line-height:1.45;color:var(--af-ink-2)",big:"font-size:84px;line-height:1"},xi=class extends J{constructor(){super(...arguments);this.tpl=new At(this)}willUpdate(){this.tpl.set(this.hass,this.options.text)}render(){let e=this.options,i=Js[e.style]??Js.body,a=[e.size?`font-size:${Number(e.size)}px`:"",e.color?`color:${Ja(e.color,"")}`:""].join(";"),r=e.font==="display"||e.style==="title"||e.style==="big"?"display":"",s=this.tpl.text(e.text);if(s===void 0)return u`<div class="wait" style="${i};${a}">…</div>`;let o=e.icon?u`${G(e.icon)} `:m;return e.markdown?u`<div style="${i};${a};width:100%">${o}${Fs(s)}</div>`:u`<div class="${r}" style="${i};${a};white-space:pre-line">${o}${s}</div>`}};xi.styles=[W,pt,Bs,C`
      .md {
        width: 100%;
      }
      .wait {
        opacity: 0.35;
      }
    `];B("af-clock",wi);B("af-date",ki);B("af-text",xi);var Xs={accent:"var(--af-accent)",cold:"var(--af-cold)",good:"var(--af-good)",alert:"var(--af-alert)",ink:"var(--af-ink)",muted:"var(--af-ink-2)"},eo=["accent","cold","good","alert","muted"],to=(t,n=0)=>Xs[String(t)]??(t?String(t):Xs[eo[n%eo.length]]),tc=new Set(["on","home","open","true","playing","heat","cool","detected"]),nc=new Set(["off","not_home","closed","false","idle","paused","standby","clear"]),Xa=t=>{let n=parseFloat(t);return Number.isFinite(n)?n:tc.has(t)?1:nc.has(t)?0:null},Tt=(t,n)=>{let i=(n===void 0||n===""?void 0:Number(n))??(Number.isInteger(t)||Math.abs(t)>=100?0:Math.abs(t)>=1?1:2);return t.toLocaleString(ee(),{minimumFractionDigits:i,maximumFractionDigits:i})},er=t=>t?.attributes.unit_of_measurement??"",We=36e5,ic=(t,n,e)=>{if(t.length<=n)return t;let i=t[0][0],a=t[t.length-1][0]-i||1,r=new Map;for(let[s,o]of t){let l=Math.min(n-1,Math.floor((s-i)/a*n)),c=r.get(l);c?e?r.set(l,[c[0],o,1]):r.set(l,[c[0],c[1]+o,c[2]+1]):r.set(l,[s,o,1])}return[...r.values()].map(([s,o,l])=>[s,o/l])},Ln=class Ln extends J{constructor(){super(...arguments);this.series=[];this.loadedKey="";this.loading=!1;this.failed="";this.gid=Ln.gid++}get ids(){let e=this.options;return(Array.isArray(e.entities)?e.entities:e.entity?[{entity:e.entity}]:[]).map(a=>typeof a=="string"?{entity:a}:a).filter(a=>!!a?.entity)}get hours(){return Math.max(1,Number(this.options.hours)||24)}get period(){return this.options.period??(this.hours>72?"day":"hour")}watched(){return this.ids.map(e=>e.entity)}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.load()},5*6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer),this.loadedKey=""}willUpdate(){let e=JSON.stringify([this.ids,this.hours,this.options.kind,this.period]);this.hass&&e!==this.loadedKey&&(this.loadedKey=e,this.load())}async load(){let e=this.hass,i=this.ids;if(!e||!i.length||this.loading)return;this.loading=!0;let a=this.options.kind??"line",r=new Date(Date.now()-this.hours*We);try{let s={},o={};if(a==="bar"||this.hours>72){let l=a==="bar"?this.period:this.hours>336?"day":"hour",c=l==="day"?Gt(r):new Date(Math.floor(r.getTime()/We)*We),h=await e.callWS({type:"recorder/statistics_during_period",statistic_ids:i.map(p=>p.entity),period:l,start_time:c.toISOString(),types:a==="bar"?["change","mean"]:["mean","state"]});for(let p of i)s[p.entity]=(h[p.entity]??[]).map(g=>[g.start,Number(a==="bar"?g.change??g.mean:g.mean??g.state)]).filter(([,g])=>Number.isFinite(g))}else{let l=await e.callWS({type:"history/history_during_period",start_time:r.toISOString(),entity_ids:i.map(c=>c.entity),minimal_response:!0,no_attributes:!0,significant_changes_only:!1});for(let c of i){let h=l[c.entity]??[];o[c.entity]=!/^(sensor|input_number|number)\./.test(c.entity),s[c.entity]=h.map(p=>[Math.max(r.getTime(),(p.lc??p.lu??0)*1e3),Xa(p.s)]).filter(p=>p[1]!==null)}}this.series=i.map((l,c)=>({id:l.entity,name:l.name??me(e,l.entity),color:to(l.color,c),step:!!o[l.entity],points:a==="bar"?s[l.entity]:ic(s[l.entity],360,!!o[l.entity])})),this.failed=""}catch(s){this.failed=s?.message??d("Verlauf nicht verf\xFCgbar")}finally{this.loading=!1,this.requestUpdate()}}current(e){let i=R(this.hass,e);return i?Xa(i.state):null}domain(e,i){let a=this.options,r=Math.min(...e),s=Math.max(...e);i&&(r=Math.min(0,r)),(!Number.isFinite(r)||!Number.isFinite(s))&&([r,s]=[0,1]),s-r<1e-9&&([r,s]=[r-1,s+1]);let o=i?0:(s-r)*.1,l=c=>c!==void 0&&c!==""&&Number.isFinite(Number(c));return[l(a.min)?Number(a.min):r-o,l(a.max)?Number(a.max):s+o]}renderLines(e){let i=e-this.hours*We,a=this.options.kind==="area",r=this.series.map(f=>{let v=this.current(f.id),$=v!==null&&this.hours<=72?[...f.points,[e,v]]:f.points;return{...f,pts:$}}),s=r.flatMap(f=>f.pts.map(([,v])=>v));if(!s.length)return u`<div class="calm">${d("Noch keine Daten im Zeitraum")}</div>`;let[o,l]=this.domain(s,!1),c=f=>(Math.min(e,Math.max(i,f))-i)/(e-i)*1e3,h=f=>300-(Math.min(l,Math.max(o,f))-o)/(l-o)*300,p=r.map((f,v)=>{if(!f.pts.length)return m;let $="";f.pts.forEach(([F,S],_)=>{let k=c(F).toFixed(1),M=h(S).toFixed(1);_===0?$+=`M${k},${M}`:f.step?$+=`H${k}V${M}`:$+=`L${k},${M}`}),c(f.pts[f.pts.length-1][0])<1e3&&($+="H1000");let I=c(f.pts[0][0]).toFixed(1),T=a||f.step?Ae`<path class="fill" d="${$}V300H${I}Z" fill="url(#g${this.gid}-${v})"></path>`:m;return Ae`<defs><linearGradient id="g${this.gid}-${v}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${f.color}" stop-opacity="0.3"></stop>
          <stop offset="1" stop-color="${f.color}" stop-opacity="0"></stop></linearGradient></defs>
        ${T}<path d="${$}" style="stroke:${f.color}"></path>`}),g=this.options.unit??er(R(this.hass,this.series[0]?.id)),b=this.options.decimals;return u`<div class="plot">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
          <line class="grid" x1="0" x2="1000" y1="0" y2="0"></line>
          <line class="grid" x1="0" x2="1000" y1="150" y2="150"></line>
          <line class="grid" x1="0" x2="1000" y1="300" y2="300"></line>
          ${p}
        </svg>
        <span class="ylab num" style="top:0;transform:translateY(-130%)">${Tt(l,b)} ${g}</span>
        <span class="ylab num" style="top:100%;transform:translateY(-130%)">${Tt(o,b)} ${g}</span>
      </div>
      ${this.renderTimeAxis(i,e)}`}renderTimeAxis(e,i){let a=i-e,r=[1,2,3,6,12,24,48,168].map(p=>p*We),s=r.find(p=>a/p<=5)??r[r.length-1],o=[],l=new Date().getTimezoneOffset()*6e4,c=s>=24*We?Gt(new Date(e+s)).getTime():Math.ceil((e-l)/s)*s+l;for(let p=c;p<i-s*.3;p+=s)p>e+s*.15&&o.push(p);let h=p=>s>=24*We?An(new Date(p)):Y(new Date(p));return u`<div class="x">
      ${o.map(p=>u`<span style="left:${(p-e)/a*100}%">${h(p)}</span>`)}
    </div>`}renderBars(){let e=this.period,i=e==="day"?24*We:We,a=Date.now(),r=e==="day"?Math.max(1,Math.round(this.hours/24)):this.hours,s=Array.from({length:r},(b,f)=>e==="day"?Gt(new Date(a-(r-1-f)*864e5)).getTime():Math.floor(a/We)*We-(r-1-f)*We),o=(b,f)=>b.points.find(([v])=>Math.abs(v-f)<i/2)?.[1],l=this.series.flatMap(b=>s.map(f=>o(b,f)??0));if(!l.some(b=>b!==0))return u`<div class="calm">${d("Noch keine Statistik im Zeitraum")}</div>`;let[c,h]=this.domain(l,!0),p=r>30?2:r>14?4:8,g=(b,f)=>{let v=new Date(b);return e==="day"?r<=14||f%Math.ceil(r/10)===0?r<=8?An(v):`${v.getDate()}.`:"":v.getHours()%(r>12?6:3)===0?`${v.getHours()}`:""};return u`<div class="plot" style="--gap:${p}px">
        <div class="bars">
          ${s.map((b,f)=>u`<div class="slot">
              ${this.series.map(v=>{let $=o(v,b),I=$===void 0?0:(Math.max(c,$)-c)/(h-c)*100;return u`<div class="bar ${f===r-1?"dim":""}" style="height:${I}%;background:${v.color}"></div>`})}
            </div>`)}
        </div>
      </div>
      <div class="x slots" style="--gap:${p}px">${s.map((b,f)=>u`<span>${g(b,f)}</span>`)}</div>`}render(){let e=this.options,i=this.ids,a;i.length?this.failed?a=u`<div class="calm">${this.failed}</div>`:this.series.length?a=e.kind==="bar"?this.renderBars():this.renderLines(Date.now()):a=u`<div class="calm">${d("Verlauf wird geladen \u2026")}</div>`:a=u`<div class="calm">${d("Entit\xE4t w\xE4hlen")}</div>`;let r=R(this.hass,i[0]?.entity),s=r?Xa(r.state):null,o=e.value!==!1&&i.length===1&&s!==null&&e.kind!=="bar",l=i.length>1?u`<div class="legend">
            ${this.series.map(h=>{let p=this.current(h.id);return u`<span><i style="background:${h.color}"></i>${h.name}${p!==null&&e.value!==!1?u` <b class="num">${Tt(p,e.decimals)}</b>`:m}</span>`})}
          </div>`:m,c=o||i.length>1||e.label?u`<div class="head">
            <div>
              ${e.label?u`<div class="label">${e.label}</div>`:m}
              ${o?u`<div class="now display num">${Tt(s,e.decimals)}<small>${e.unit??er(r)}</small></div>`:m}
            </div>
            ${l}
          </div>`:m;return u`<div class="wrap ${e.style==="card"?"card":""}">${c}${a}</div>`}};Ln.styles=[W,C`
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
    `],Ln.gid=0;var tr=Ln,Si=class extends J{watched(){return[this.options.entity]}render(){let n=this.options,e=R(this.hass,n.entity),i=n.attribute?e?.attributes[n.attribute]:e?.state,a=parseFloat(String(i)),r=Number(n.min??0),s=Number(n.max??100),o=Number.isFinite(a),l=o?Math.min(100,Math.max(0,(a-r)/(s-r||1)*100)):0,c=(Array.isArray(n.severity)?n.severity:[]).filter(I=>I&&I.from!==""&&Number.isFinite(Number(I.from))).sort((I,T)=>Number(I.from)-Number(T.from)),h=o?c.filter(I=>a>=Number(I.from)).pop():void 0,p=to(h?.color??n.color??"accent"),g=n.kind==="half",b=g?"M 16 100 A 84 84 0 0 1 184 100":"M 100 16 A 84 84 0 1 1 99.99 16",f=n.unit??(n.attribute?"":er(e)),v=n.name??(e?me(this.hass,n.entity):""),$=v?u`<div class="name">${n.icon?G(n.icon):m}${v}</div>`:m;return u`<div class="wrap ${g?"half":""} ${n.style==="card"?"card":""}">
      <div class="dial">
        <svg viewBox=${g?"0 0 200 108":"0 0 200 200"} preserveAspectRatio="xMidYMid meet">
          <path class="track" d=${b} pathLength="100" stroke-width="12"></path>
          <path class="val" d=${b} pathLength="100" stroke-width="12" style="stroke:${p};stroke-dasharray:${l} 100;${l?"":"opacity:0"}"></path>
        </svg>
        <div class="center">
          <div class="v display num">${o?Tt(a,n.decimals):"\u2013"}${f?u`<small>${f}</small>`:m}</div>
          ${g?m:$}
        </div>
      </div>
      ${g?u`<div class="range"><span class="num">${Tt(r,0)}</span><span class="num">${Tt(s,0)}</span></div>
            ${$}`:m}
    </div>`}};Si.styles=[W,C`
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
    `];var $i=class extends J{constructor(){super(...arguments);this.urlTpl=new At(this);this.capTpl=new At(this);this.tick=0;this.resolved=new Map;this.failed=!1}shouldUpdate(e){if(e.size===1&&e.has("hass")&&this.options.entity&&!this.options.url){let i=e.get("hass"),a=this.options.entity;return i?.states[a]?.attributes.entity_picture!==this.hass?.states[a]?.attributes.entity_picture}return super.shouldUpdate(e)}connectedCallback(){super.connectedCallback(),this.restartTimer()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}restartTimer(){clearInterval(this.timer);let e=Number(this.options.refresh)||0;e>0&&(this.timer=window.setInterval(()=>{this.tick++,this.requestUpdate()},Math.max(5,e)*1e3))}willUpdate(e){e.has("options")&&this.restartTimer(),this.urlTpl.set(this.hass,this.options.url),this.capTpl.set(this.hass,this.options.caption),this.pick()}async pick(){let e=this.options,i;if(e.url?(i=this.urlTpl.text(e.url)?.trim(),i?.startsWith("\u26A0")&&(i=void 0)):e.entity&&(i=R(this.hass,e.entity)?.attributes.entity_picture),!i){this.wanted=void 0;return}if(i.startsWith("media-source://")){let s=this.resolved.get(i);if(s&&Date.now()-s.at<45*6e4)i=s.url;else if(this.hass){let o=i;try{let l=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:o,expires:3600});this.resolved.set(o,{url:l.url,at:Date.now()}),i=l.url}catch{this.failed=!0,this.requestUpdate();return}}}let a=this.tick&&!i.includes("authSig")?`${i}${i.includes("?")?"&":"?"}_wb=${this.tick}`:i;if(a===this.wanted)return;this.wanted=a;let r=new Image;r.onload=()=>{this.wanted===a&&(this.shown=a,this.failed=!1,this.requestUpdate())},r.onerror=()=>{this.wanted===a&&(this.failed=!this.shown,this.requestUpdate())},r.src=a}render(){let e=this.options,i=e.caption?this.capTpl.text(e.caption):"";this.style.setProperty("--fit",e.fit==="contain"?"contain":"cover"),this.style.setProperty("--r",`${Number(e.radius??28)}px`);let a=!e.url&&!e.entity?d("Bild-Link oder Entit\xE4t w\xE4hlen"):this.failed?d("Bild nicht ladbar"):"";return u`${this.shown?u`<img src=${this.shown} alt="" @error=${r=>r.target.style.visibility="hidden"} />`:u`<div class="ph">${a}</div>`}
    ${i?u`<div class="cap">${i}</div>`:m}`}};$i.styles=[W,C`
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
    `];B("af-chart",tr);B("af-gauge",Si);B("af-image",$i);var ac=10*6e4,nr=new Map,no=()=>new Date().toDateString(),rc=(t,n,e)=>{let i=[n,e.language??"",e.source??""].join("|"),a=nr.get(i);if(a?.pending)return a.pending;if(a&&a.day===no()&&(a.data||Date.now()-a.at<ac))return Promise.resolve(a.data);let r=t.callWS({type:"ambiframe/daily",kind:n,...e}).catch(()=>null).then(s=>{let o=s??a?.data??null;return nr.set(i,{day:s?no():a?.day??"",at:Date.now(),data:o}),o});return nr.set(i,{day:a?.day??"",at:a?.at??0,data:a?.data??null,pending:r}),r},_n=class extends J{constructor(){super(...arguments);this.data=null;this.loaded=!1}get kind(){return this.options.kind==="quote"?"quote":"article"}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.load()},60*6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.loaded}willUpdate(e){this.hass&&(!this.loaded||e.has("options"))&&(this.loaded=!0,this.load())}async load(){if(!this.hass)return;let e=this.options,i=await rc(this.hass,this.kind,this.kind==="quote"?{source:e.source||void 0}:{language:e.language||void 0});(i||!this.data)&&(this.data=i),this.requestUpdate()}label(e){return this.options.label===!1?m:u`<div class="label">${this.options.label??e}</div>`}render(){let e=this.data;if(!e)return u`<div class="calm">${this.loaded?d("Wird geladen \u2026"):""}</div>`;if(this.kind==="quote"){let a=e.text.length>220?34:e.text.length>120?40:46;return u`<div class="quote" style="--q:${a}px">
        ${this.label(e.period==="week"?d("Zitat der Woche"):d("Zitat des Tages"))}
        <div class="mark display">“</div>
        <div class="q display">${e.text}</div>
        ${e.author?u`<div class="who">${e.author}</div>`:m}
      </div>`}let i=this.options.image===!1?"":e.image;return u`<div class="art">
      <div class="body">
        ${this.label(d("Artikel des Tages \xB7 Wikipedia"))}
        <div class="title display">${e.title}</div>
        <div class="text">${e.text}</div>
      </div>
      ${i?u`<div class="pic" style="background-image:url('${i}')"></div>`:m}
    </div>`}};_n.properties={...J.properties,data:{state:!0}},_n.styles=[W,C`
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
    `];B("af-daily",_n);var Ne={at:0,homes:{}},sc=t=>(Ne.loading||(Ne.loading=t.callWS({type:"ambiframe/tibber/prices"}).then(n=>{Ne.homes=Object.fromEntries(Object.entries(n.homes??{}).map(([e,i])=>[e,i.map(a=>({start:new Date(a.start),price:a.price}))])),Ne.error=void 0}).catch(n=>{Ne.error=n?.message??String(n)}).finally(()=>{Ne.at=Date.now(),Ne.loading=void 0})),Ne.loading),Ai=(t,n=1)=>`${O(t*100,n)} ct`,ir=t=>t==null?"\u2013":Math.abs(t)>=1e3?`${O(t/1e3,1)} kW`:`${O(t,0)} W`,oc=t=>{let n=new Map;for(let e of t){let i=new Date(e.start);i.setMinutes(0,0,0);let a=n.get(i.getTime())??[];a.push(e.price),n.set(i.getTime(),a)}return[...n.entries()].sort((e,i)=>e[0]-i[0]).map(([e,i])=>({start:new Date(e),price:i.reduce((a,r)=>a+r,0)/i.length}))},lc=(t,n)=>{let e=Date.now()-36e5,i=t.filter(r=>r.start.getTime()>=e),a=null;for(let r=0;r+n<=i.length;r++){let s=i.slice(r,r+n),o=s.reduce((l,c)=>l+c.price,0)/n;(!a||o<a.avg)&&(a={start:s[0].start,end:new Date(s[n-1].start.getTime()+36e5),avg:o})}return a},Ti=class extends ne{constructor(){super(...arguments);this.size={w:0,h:0};this.resize=new ResizeObserver(()=>{this.size={w:this.offsetWidth,h:this.offsetHeight},this.requestUpdate()})}connectedCallback(){super.connectedCallback(),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resize.disconnect()}shouldUpdate(){return!0}render(){let e=this.options;this.hass&&Date.now()-Ne.at>15*6e4&&sc(this.hass).then(()=>this.requestUpdate());let i=Ne.homes,a=i[e.home]??Object.values(i)[0]??[],r=u`<div class="label">${e.label??d("Strompreis heute")}</div>`;if(!a.length)return u`${r}<div class="muted" style="margin-top:16px">${Ne.error??(Ne.at?d("Keine Preisdaten"):d("L\xE4dt \u2026"))}</div>`;let s=new Date;s.setHours(0,0,0,0);let o=s.getTime()+2*864e5,l=oc(a.filter(A=>A.start.getTime()>=s.getTime()&&A.start.getTime()<o)),c=l.filter(A=>A.start.getTime()<s.getTime()+864e5),h=e.tomorrow===!1?c:l,p=[...a].reverse().find(A=>A.start.getTime()<=Date.now()),g=e.entity?ce(this.hass,e.entity)??p?.price:p?.price,b=[...c].map(A=>A.price).sort((A,q)=>A-q),f=A=>b[Math.floor((b.length-1)*A)],v=g==null?"":g<=f(1/3)?"good":g>=f(2/3)?"bad":"",$=d({good:"g\xFCnstig",bad:"teuer","":"normal"}[v]),I=b[0],T=b[b.length-1],F=b.reduce((A,q)=>A+q,0)/b.length,S=lc(l,Number(e.window??2)),_=this.size.w||600,k=Math.max(90,Math.min(380,(this.size.h||360)-240)),M=Math.min(...h.map(A=>A.price))*.92,w=Math.max(...h.map(A=>A.price)),y=_/h.length,P=new Date;P.setMinutes(0,0,0);let L=h.map((A,q)=>{let Q=Math.max(3,(A.price-M)/(w-M||1)*(k-22)),se=A.start.getTime()<P.getTime(),ue=A.start.getTime()===P.getTime(),be=ue?"var(--af-ink)":A.price<=f(1/3)?"var(--af-good)":A.price>=f(2/3)?"var(--af-accent)":"var(--af-ink-3)",Pe=A.start.getHours()%6===0?Ae`<text class="t3" x=${q*y+y/2} y=${k} text-anchor="middle">${A.start.getHours()===0&&q>0?d("morgen"):`${A.start.getHours()}`}</text>`:m;return Ae`<rect x=${q*y+1.5} y=${k-20-Q} width=${Math.max(2,y-3)} height=${Q} rx="2" fill=${be} opacity=${se?.3:ue?1:.75}></rect>${Pe}`});return u`${r}
      <div class="top">
        <div class="now display num">${g!=null?O(g*100,1):"\u2013"}<small>ct/kWh</small></div>
        <div>
          <div class="level ${v}">${$}</div>
          <div class="facts num">Ø ${Ai(F)} · ${Ai(I)} – ${Ai(T)}</div>
        </div>
      </div>
      ${S?u`<div class="best">${G("charge")}<span>${d("Am g\xFCnstigsten")} <b class="num">${Y(S.start)}–${Y(S.end)}</b> · Ø ${Ai(S.avg)}</span></div>`:m}
      <svg width=${_} height=${k} viewBox="0 0 ${_} ${k}">${L}</svg>
      ${e.note?u`<div class="note">${e.note}</div>`:m}`}};Ti.styles=[W,C`
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
    `];var Ei=class extends ne{watched(){let n=this.options;return[...(n.production??[]).map(e=>e.entity),n.consumption?.entity,n.forecast,n.forecast_remaining,n.extra]}render(){let n=this.options,i=(n.production??[]).map(h=>({name:h.name??R(this.hass,h.entity)?.attributes.friendly_name??h.entity,w:ce(this.hass,h.entity)})),a=i.reduce((h,p)=>h+(p.w??0),0),r=n.consumption?.entity?ce(this.hass,n.consumption.entity):null,s=r?Math.min(100,a/r*100):null,o=n.forecast?ce(this.hass,n.forecast):null,l=n.forecast_remaining?ce(this.hass,n.forecast_remaining):null,c=n.extra?R(this.hass,n.extra):void 0;return u`<div class="label">${n.label??d("Energie jetzt")}</div>
      <div class="row">
        <div>
          <div class="k">${G("solar")}${n.production_label??d("Erzeugung")}</div>
          <div class="v display num">${ir(a)}</div>
          <div class="src num">${i.map(h=>u`${h.name} ${ir(h.w)}<br />`)}</div>
        </div>
        ${n.consumption?.entity?u`<div>
              <div class="k">${G("home")}${n.consumption.name??d("Verbrauch")}</div>
              <div class="v display num">${ir(r)}</div>
              ${o!=null?u`<div class="src num">${d("Prognose heute {n} kWh",{n:O(o,1)})}${l!=null?u`<br />${d("noch {n} kWh",{n:O(l,1)})}`:m}</div>`:m}
            </div>`:m}
      </div>
      ${s!=null?u`<div class="bar"><i style="width:${s}%"></i></div>
            <div class="share num">
              <span>${d("{n} % aus eigener Sonne",{n:O(s,0)})}</span>
              <span>${c?`${n.extra_name??c.attributes.friendly_name??""} ${O(ve(this.hass,n.extra),0)} ${c.attributes.unit_of_measurement??""}`:""}</span>
            </div>`:m}`}};Ei.styles=[W,C`
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
    `];B("af-price",Ti);B("af-power",Ei);var{I:dc}=Cs,io=t=>t;var ao=()=>document.createComment(""),Ut=(t,n,e)=>{let i=t._$AA.parentNode,a=n===void 0?t._$AB:n._$AA;if(e===void 0){let r=i.insertBefore(ao(),a),s=i.insertBefore(ao(),a);e=new dc(r,s,t,t.options)}else{let r=e._$AB.nextSibling,s=e._$AM,o=s!==t;if(o){let l;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(l=t._$AU)!==s._$AU&&e._$AP(l)}if(r!==a||o){let l=e._$AA;for(;l!==r;){let c=io(l).nextSibling;io(i).insertBefore(l,a),l=c}}}return e},mt=(t,n,e=t)=>(t._$AI(n,e),t),cc={},zi=(t,n=cc)=>t._$AH=n,ro=t=>t._$AH,Li=t=>{t._$AR(),t._$AA.remove()};var Re=dt(class extends lt{constructor(){super(...arguments),this.key=m}render(t,n){return this.key=t,n}update(t,[n,e]){return n!==this.key&&(zi(t),this.key=n),e}});var so=(t,n,e)=>{let i=new Map;for(let a=n;a<=e;a++)i.set(t[a],a);return i},qt=dt(class extends lt{constructor(t){if(super(t),t.type!==mi.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,n,e){let i;e===void 0?e=n:n!==void 0&&(i=n);let a=[],r=[],s=0;for(let o of t)a[s]=i?i(o,s):s,r[s]=e(o,s),s++;return{values:r,keys:a}}render(t,n,e){return this.dt(t,n,e).values}update(t,[n,e,i]){let a=ro(t),{values:r,keys:s}=this.dt(n,e,i);if(!Array.isArray(a))return this.ut=s,r;let o=this.ut??=[],l=[],c,h,p=0,g=a.length-1,b=0,f=r.length-1;for(;p<=g&&b<=f;)if(a[p]===null)p++;else if(a[g]===null)g--;else if(o[p]===s[b])l[b]=mt(a[p],r[b]),p++,b++;else if(o[g]===s[f])l[f]=mt(a[g],r[f]),g--,f--;else if(o[p]===s[f])l[f]=mt(a[p],r[f]),Ut(t,l[f+1],a[p]),p++,f--;else if(o[g]===s[b])l[b]=mt(a[g],r[b]),Ut(t,a[p],a[g]),g--,b++;else if(c===void 0&&(c=so(s,b,f),h=so(o,p,g)),c.has(o[p]))if(c.has(o[g])){let v=h.get(s[b]),$=v!==void 0?a[v]:null;if($===null){let I=Ut(t,a[p]);mt(I,r[b]),l[b]=I}else l[b]=mt($,r[b]),Ut(t,a[p],$),a[v]=null;b++}else Li(a[g]),g--;else Li(a[p]),p++;for(;b<=f;){let v=Ut(t,l[f+1]);mt(v,r[b]),l[b++]=v}for(;p<=g;){let v=a[p++];v!==null&&Li(v)}return this.ut=s,zi(t,l),Ve}});var _i=class extends EventTarget{constructor(){super(...arguments);this.data=new Map;this.subs=new Map}setHass(e){this.hass=e}get(e,i){if(!e)return;let a=`${e}|${i}`;if(!this.subs.has(a)&&this.hass){let r=this.hass.connection.subscribeMessage(s=>{this.data.set(a,s.forecast??[]),this.dispatchEvent(new Event("change"))},{type:"weather/subscribe_forecast",entity_id:e,forecast_type:i}).catch(()=>{});this.subs.set(a,r)}return this.data.get(a)}dispose(){for(let e of this.subs.values())e.then(i=>i?.());this.subs.clear()}},uc=t=>{for(let n=t.length-1;n>0;n--){let e=Math.floor(Math.random()*(n+1));[t[n],t[e]]=[t[e],t[n]]}return t},hc=6*36e5,Di=class{constructor(n,e){this.getHass=n;this.getConfig=e;this.items=[];this.index=-1;this.loadedAt=0}reload(){this.loading=void 0}async load(){let n=this.getHass(),e=this.getConfig();if(!n||!e)return;let i=[];if(e.folder)try{i=((await n.callWS({type:"media_source/browse_media",media_content_id:e.folder})).children??[]).filter(r=>r.media_class==="image"||/\.(jpe?g|png|webp|avif)$/i.test(r.title)).map(r=>({mediaId:r.media_content_id,credit:""}))}catch{}if(e.icloud)try{let a=await n.callWS({type:"ambiframe/photos/icloud",url:e.icloud});i=[...i,...a.map(r=>({url:r.url,credit:r.credit}))]}catch{}if(e.bing&&(!i.length||e.bing_mix))try{let a=(await n.callWS({type:"ambiframe/photos/bing"})).map(r=>({url:r.url,credit:r.credit}));i=[...i,...a]}catch{}this.items=uc(i),this.index=-1,this.loadedAt=Date.now()}async next(){let n=this.getConfig()?.icloud?3e5:hc;if((!this.loading||Date.now()-this.loadedAt>n)&&(this.loading=this.load()),await this.loading,!this.items.length)return null;this.index=(this.index+1)%this.items.length;let e=this.items[this.index],i=this.getConfig()?.credit?e.credit:"";if(e.url)return{url:e.url,credit:i};let a=this.getHass();if(!a||!e.mediaId)return null;try{return{url:(await a.callWS({type:"media_source/resolve_media",media_content_id:e.mediaId,expires:3600})).url,credit:i}}catch{return null}}},ar=new Map,Ni=(t,n,e=2)=>{let i=`${[...n].sort().join(",")}|${e}`,a=ar.get(i);if(a?.pending)return a.pending;if(a&&Date.now()-a.at<10*6e4)return Promise.resolve(a.events);let r=t.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:n},service_data:{duration:{days:e}},return_response:!0}).then(s=>Object.entries(s.response??{}).flatMap(([o,l])=>l.events.map(c=>({...c,calendar:o}))).sort((o,l)=>new Date(o.start).getTime()-new Date(l.start).getTime())).catch(()=>a?.events??[]).then(s=>(ar.set(i,{at:Date.now(),events:s}),s));return ar.set(i,{at:a?.at??0,events:a?.events??[],pending:r}),r},it=t=>!t.start.includes("T"),Mi=t=>new Promise(n=>{let e=new Image;e.onload=()=>n(!0),e.onerror=()=>n(!1),e.src=t});var Ge=t=>X(t?Kt[t]??t:void 0),lo=t=>t==="\xB0C"||t==="\xB0F"?"\xB0":t?` ${t}`:"",co=C`
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
`,Ci=class extends J{watched(){let n=this.options;return[n.entity,n.sub?.entity,...(n.secondary??[]).map(e=>e.entity)]}formatted(n,e,i=1,a){let r=R(this.hass,n),s=ve(this.hass,n,e),o=parseFloat(String(s)),l=a??(e?"":r?.attributes.unit_of_measurement);return Number.isFinite(o)?`${O(o,i)}${lo(l)}`:String(s??"\u2013")}render(){let n=this.options,e=n.decimals??1,i=this.formatted(n.entity,n.attribute,e,n.unit),a=n.name??me(this.hass,n.entity),r=(l,c)=>{let h=ce(this.hass,l,c);return n.cold!=null&&h!=null&&h<Number(n.cold)};if(n.style!=="card")return u`<div class="plain">
        <div class="name">${n.icon?u`${Ge(n.icon)} `:m}${a}</div>
        <div class="big display num ${r(n.entity,n.attribute)?"cold":""}">${i}</div>
      </div>`;let s=n.sub?.entity?`${this.formatted(n.sub.entity,n.sub.attribute,0,"")} ${n.sub.suffix??""}`:"",o=n.secondary??[];return u`<div class="card" style="width:100%">
      <div class="label">${n.label??""}</div>
      <div class="bigic">${Ge(n.icon??"thermo")}</div>
      <div class="big display num ${r(n.entity,n.attribute)?"cold":""}">${i}</div>
      <div class="cond">${a}</div>
      ${s?u`<div class="sub num">${s}</div>`:m}
      ${o.length?u`<div class="split">
            ${o.map(l=>u`<div class="r num ${r(l.entity,l.attribute)?"cold":""}">
                <span>${l.name??me(this.hass,l.entity)}</span><span>${this.formatted(l.entity,l.attribute,l.decimals??1)}</span>
              </div>`)}
          </div>`:m}
    </div>`}};Ci.styles=[W,pt,co,C`
      .plain .name {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .plain .big {
        font-size: 88px;
        line-height: 1;
        margin-top: 12px;
      }
    `];var Pi=class extends J{rooms(){return this.options.rooms??[]}watched(){return this.rooms().flatMap(n=>[n.temperature,n.humidity,n.climate,...n.windows??[]])}render(){let n=Number(this.options.cold??16),e=Number(this.options.warm??26),i=Number(this.options.columns??3);return u`<div class="grid" style="grid-template-columns:repeat(${i},1fr)">
      ${this.rooms().map(a=>{let r=a.temperature?.startsWith("climate."),s=ce(this.hass,a.temperature,r?"current_temperature":void 0),o=ce(this.hass,a.humidity),l=(a.windows??[]).some(g=>R(this.hass,g)?.state==="on"),c=R(this.hass,a.climate??(r?a.temperature:void 0)),h=l?d("Fenster offen"):"";!h&&c?.attributes.hvac_action==="heating"&&(h=d("heizt auf {temp}\xB0",{temp:O(c.attributes.temperature,0)})),!h&&o!=null&&(h=`${O(o,0)} %`);let p=s==null?"":s<n?"cold":s>e?"warm":"";return u`<div class="${p}">
          <div class="n">${a.name}</div>
          <div class="v display num">${O(s,1)}°</div>
          <div class="s num">${h||u`&nbsp;`}</div>
        </div>`})}
    </div>`}};Pi.styles=[W,C`
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
    `];var pc=new Set(["window","door","garage_door","opening"]),mc=(t,n)=>{let e=t.states[n]?.attributes;return Array.isArray(e?.entity_id)||!!e?.is_hue_group},Ii=class extends ne{shouldUpdate(){return!0}items(){let n=this.hass;if(!n)return[];let e=this.options,i=[],a=Date.now();if(e.windows==="auto")for(let s of Object.values(n.states))s.entity_id.startsWith("binary_sensor.")&&s.state==="on"&&pc.has(s.attributes.device_class)&&i.push({icon:s.attributes.device_class==="window"?"window":"door",title:`${s.attributes.friendly_name??s.entity_id} offen`,sub:En(n,s.entity_id)??""});else if(Array.isArray(e.windows))for(let s of e.windows)R(n,s.entity)?.state==="on"&&i.push({icon:"window",title:d("{name} offen",{name:s.name??me(n,s.entity)}),sub:s.room??En(n,s.entity)??""});for(let s of e.appliances??[]){let o=R(n,s.entity);o&&o.state===(s.on??"on")&&i.push({icon:s.icon??"washer",title:d("{name} l\xE4uft",{name:s.name??me(n,s.entity)}),sub:d("seit {time}",{time:Tn(a-new Date(o.last_changed).getTime())})})}if(e.lights==="auto"){let s=Object.values(n.states).filter(o=>o.entity_id.startsWith("light.")&&o.state==="on"&&!mc(n,o.entity_id));if(s.length){let o=s.map(l=>l.attributes.friendly_name??l.entity_id);i.push({icon:"bulb",title:s.length===1?d("1 Licht an"):d("{n} Lichter an",{n:s.length}),sub:o.slice(0,3).join(", ")+(o.length>3?" \u2026":"")})}}let r=qa(n,e.waste,Number(e.waste_days??2));r&&e.waste&&i.push({icon:"bin",title:String(ve(n,e.waste,"message")??d("M\xFCll")),sub:d("Abholung {when}",{when:Oe(r)})});for(let s of e.extra??[])R(n,s.entity)?.state===(s.state??"on")&&i.push({icon:s.icon??"info",title:s.text??me(n,s.entity),sub:""});return i.length||i.push({icon:"check",title:e.calm_title??d("Alles ruhig"),sub:e.calm_text??d("Nichts offen, nichts l\xE4uft")}),i.slice(0,Number(e.max??5))}render(){return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??"Gerade"}</div>`}
      ${this.items().map(n=>u`<div class="item">${Ge(n.icon)}<div><div class="a">${n.title}</div>${n.sub?u`<div class="b">${n.sub}</div>`:m}</div></div>`)}`}};Ii.styles=[W,C`
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
    `];var Fi=class extends ne{watched(){return[this.options.entity]}render(){let n=this.options,e=R(this.hass,n.entity),i=te(e?.attributes.start_time);if(!e||!i)return m;if(n.days!=null&&(le(i)<0||le(i)>Number(n.days)))return m;let a=n.waste??/waste|abfall|muell|müll|trash/i.test(n.entity??""),r=String(e.attributes.message??""),s=`${Oe(i)}${e.attributes.all_day?"":`, ${d("{time} Uhr",{time:Y(i)})}`}`;if(n.variant==="line")return u`<div class="line">${Ge(n.icon??(a?"bin":"calendar"))}<span>${r} ${s}</span></div>`;let o=le(i)<=1?d("heute Abend"):d("{day} Abend",{day:Oe(new Date(i.getTime()-864e5))});return u`<div class="card" style="width:100%">
      <div class="label">${n.label??(a?d("M\xFCll"):d("Termin"))}</div>
      <div class="bigic">${Ge(n.icon??(a?"bin":"calendar"))}</div>
      <div class="big display" style="font-size:72px;margin-top:28px">${r}</div>
      <div class="cond">${a?d("Abholung"):""} ${s}</div>
      <div class="sub">${i.toLocaleDateString(ee(),{weekday:"long",day:"numeric",month:"long"})}</div>
      ${a?u`<div class="split"><div class="r"><span>${d("Rausstellen")}</span><span>${o}</span></div></div>`:m}
    </div>`}};Fi.styles=[W,pt,co,C`.line { font-size: calc(21px * var(--af-fs, 1)); color: var(--af-ink-2); display:flex; gap:10px; align-items:center } .line .ic { color: var(--af-accent); font-size: 22px }`];var uo=t=>Object.keys(t?.states??{}).filter(n=>n.startsWith("sensor.")&&/waste|abfall|muell|müll|tonne/i.test(n)&&/_(tage|days)$/.test(n)).map(n=>({entity:n,name:n.replace(/^sensor\.(waste_collection_schedule_)?/,"").replace(/_(tage|days)$/,"").split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")})),rr=(t,n)=>{let e=n.bins?.length?n.bins:uo(t),i=new Map;for(let a of e){let r=vi(t,a.entity);if(r==null||r<0||r>Number(n.days??7))continue;let s=a.name||me(t,a.entity);i.set(r,[...i.get(r)??[],{name:s,color:a.color}])}return[...i.entries()].sort((a,r)=>a[0]-r[0]).map(([a,r])=>({days:a,bins:r}))},sr=t=>{if(t<=2)return[d("heute"),d("morgen"),d("\xFCbermorgen")][t];if(t>=7)return d("in {n} Tagen",{n:t});let n=new Date;return n.setDate(n.getDate()+t),d("am {day}",{day:n.toLocaleDateString(ee(),{weekday:"long"})})},ho=t=>(t??[]).flatMap(n=>[n.entity??"",...ho(n.conditions)]).filter(Boolean),oo=520,gc=["on","run","running","printing","prepare","pause","paused","delayedstart","cleaning"],fc=(t,n)=>{let e=R(t,n);if(!e||["unknown","unavailable",""].includes(e.state))return null;if(e.attributes.device_class==="timestamp"||/^\d{4}-\d{2}-\d{2}T/.test(e.state)){let r=te(e.state),s=r?r.getTime()-Date.now():0;return s>0?s:null}let i=parseFloat(e.state);if(!Number.isFinite(i)||i<=0)return null;let a=String(e.attributes.unit_of_measurement??"min");return i*(a==="h"?36e5:a==="s"?1e3:6e4)},Bi=class extends ne{constructor(){super(...arguments);this.turn=0;this.shown=!1;this.events=[];this.eventsKey="";this.lastParts=new Map;this.leaving=new Map;this.rects=new Map}connectedCallback(){super.connectedCallback(),this.turnTimer=window.setInterval(()=>{(this.options.items??[]).some(e=>e.type==="waste")&&(this.turn++,this.requestUpdate())},6e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.turnTimer)}updated(e){super.updated(e);for(let i of this.renderRoot.querySelectorAll(".part")){let a=i.dataset.key?this.rects.get(i.dataset.key):void 0;if(a&&this.shown&&!i.classList.contains("out")){let s=i.getBoundingClientRect(),o=a.left-s.left,l=a.top-s.top;(Math.abs(o)>1||Math.abs(l)>1)&&i.animate([{transform:`translate(${o}px, ${l}px)`},{transform:"none"}],{duration:700,easing:"cubic-bezier(0.22, 0.8, 0.24, 1)"})}let r=(i.textContent??"").replace(/\s+/g," ").trim();this.shown&&i.dataset.text!==r&&!i.querySelector(".rot")&&!i.classList.contains("out")&&(i.classList.remove("in"),i.offsetWidth,i.classList.add("in")),i.dataset.text=r}this.shown=!0}watched(){return(this.options.items??[]).flatMap(e=>[e.entity,e.remaining,e.progress,e.detail,...e.entities??[],...(e.list??[]).map(i=>i.entity),...ho(e.show_if),...e.type==="waste"?(e.bins?.length?e.bins:uo(this.hass)).map(i=>i.entity):[]])}agenda(e){let i=e.entities?.length?e.entities:Object.keys(this.hass?.states??{}).filter(b=>b.startsWith("calendar.")).slice(0,3),a=i.join(",");this.hass&&i.length&&Ni(this.hass,i,2).then(b=>{(b!==this.events||a!==this.eventsKey)&&(this.events=b,this.eventsKey=a,this.requestUpdate())});let r=Date.now(),s=r+Number(e.hours??24)*36e5,o=this.events.filter(b=>{let f=te(b.start)?.getTime()??0;return(te(b.end)?.getTime()??0)>r&&f<s&&!(it(b)&&le(new Date(f))<0)}),l=o.find(b=>!it(b))??o[0];if(!l)return null;let c=te(l.start),h=te(l.end),p=Oe(c).replace(/^./,b=>b.toUpperCase()),g=it(l)?`${p}: ${l.summary}`:c.getTime()<=r?d("Jetzt: {what} bis {time}",{what:l.summary,time:Y(h)}):`${p} ${Y(c)} ${l.summary}`;return u`${Ge(e.icon??"calendar")}<span>${g}</span>`}willUpdate(e){super.willUpdate?.(e),this.rects.clear();for(let i of this.renderRoot?.querySelectorAll?.(".part")??[])i.dataset.key&&this.rects.set(i.dataset.key,i.getBoundingClientRect())}render(){let i=(this.options.items??[]).map(s=>s.show_if?.length&&!s.show_if.every(o=>tt(this.hass,o))?null:s).map(s=>{if(!s)return null;let o=R(this.hass,s.entity);switch(s.type){case"weather":return o?u`${X(De(o.state))}<span class="num">${O(o.attributes.temperature,0)}°</span><span>${qe(o.state)}</span>`:null;case"calendar":{let l=qa(this.hass,s.entity,Number(s.days??2));return l?u`<span>${o?.attributes.message??""} ${Oe(l)}</span>`:null}case"entity":{if(!o)return null;let l=parseFloat(o.state),c=Number.isFinite(l)?`${O(l,1)}${lo(o.attributes.unit_of_measurement)}`:o.state;return u`${s.icon?Ge(s.icon):m}<span>${s.name?`${s.name} `:""}${c}</span>`}case"text":return s.text?u`<span>${s.text}</span>`:null;case"agenda":return this.agenda(s);case"status":{if(!o||o.state!==String(s.state??"on"))return null;let l=(s.list??[]).filter(h=>R(this.hass,h.entity)?.state==="on");if(s.list?.length&&!l.length)return null;let c=l.map(h=>h.name??me(this.hass,h.entity)).join(", ");return u`${Ge(s.icon??"info")}<span>${s.text??s.name??me(this.hass,s.entity)}${c?` \xB7 ${c}`:""}</span>`}case"device":{let l=s.state?s.state.split(",").map(b=>b.trim()):gc;if(!o||!l.includes(o.state))return null;let c=ce(this.hass,s.progress),h=fc(this.hass,s.remaining),p=ve(this.hass,s.detail),g=[s.name??me(this.hass,s.entity),p&&!["unknown","unavailable"].includes(String(p))?String(p):"",c!=null?`${O(c,0)} %`:"",h!=null?s.show_end?d("fertig {time}",{time:Y(new Date(Date.now()+h))}):d("noch {time}",{time:Tn(h)}):"",o.state.startsWith("pause")?d("pausiert"):""].filter(Boolean);return u`${Ge(s.icon??"washer")}<span>${g.join(" \xB7 ")}</span>`}case"media":{let c=(s.entities?.length?s.entities:s.entity?[s.entity]:[]).map(b=>R(this.hass,b)).find(b=>b?.state==="playing");if(!c)return null;let h=c.attributes,p=[h.media_title,h.media_series_title??h.media_artist].filter(Boolean).join(" \u2013 ");if(!p)return null;let g=`${p}${h.app_name?` (${h.app_name})`:""}`;return u`${Ge(s.icon??"tv")}<span>${s.name??String(h.friendly_name??"").replace(/\s+/g," ")}: ${g}</span>`}case"waste":{let l=rr(this.hass,s);if(!l.length)return null;let c=l[this.turn%l.length],h=c.bins.map(g=>g.name),p=h.length>1?`${h.slice(0,-1).join(", ")} ${d("und")} ${h.at(-1)}`:h[0];return Re(`${c.days}|${p}`,u`<span class="rot">${Ge(s.icon??"bin")}${c.bins.some(g=>g.color)?c.bins.map(g=>u`<i class="bin" style="background:${g.color??"var(--af-ink-3)"}"></i>`):m}<span>${p} ${sr(c.days)}</span></span>`)}default:return null}}),a=Date.now();i.forEach((s,o)=>{let l=String(o);s?(this.lastParts.set(l,s),this.leaving.delete(l)):this.lastParts.has(l)&&this.shown&&!this.leaving.has(l)&&(this.leaving.set(l,{tpl:this.lastParts.get(l),until:a+oo}),this.lastParts.delete(l),window.setTimeout(()=>this.requestUpdate(),oo+20))});for(let[s,o]of this.leaving)o.until<=a&&this.leaving.delete(s);let r=i.map((s,o)=>{let l=String(o),c=this.leaving.get(l);return s?{key:l,tpl:s,out:!1}:c?{key:l,tpl:c.tpl,out:!0}:null}).filter(s=>!!s);return u`<div class="line">
      ${qt(r,s=>s.key,(s,o)=>u`<span class="part ${s.out?"out":""}" data-key=${s.key}>${o?u`<span class="dot"></span>`:m}${s.tpl}</span>`)}
    </div>`}};Bi.styles=[W,pt,C`
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
    `];B("af-value",Ci);B("af-rooms",Pi);B("af-status",Ii);B("af-calendar",Fi);B("af-infoline",Bi);var Yt=C`
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
`,or=t=>t?.state==="on",Oi=class extends ne{watched(){let n=this.options;return[n.battery,n.range,n.charging,n.plugged,n.charger_power,n.time_full,n.location,n.lock,n.limit,n.inside_temp]}render(){let n=this.options,e=this.hass,i=ce(e,n.battery),a=ce(e,n.range),r=ce(e,n.limit),s=R(e,n.location),o=or(R(e,n.charging)),l=or(R(e,n.plugged)),c=ce(e,n.charger_power),h=te(ve(e,n.time_full)),p=R(e,n.lock),g=ce(e,n.inside_temp),b=Za(e,s?.state),f=R(e,"zone.home");if(s&&s.state!=="home"&&f&&s.attributes.latitude!=null){let $=Ya(f.attributes.latitude,f.attributes.longitude,s.attributes.latitude,s.attributes.longitude);b=`${b} \xB7 ${O($,$<10?1:0)} km`}let v=o?u`${G("charge")}${d("L\xE4dt")}${c?` \xB7 ${O(c,1)} kW`:""}${h?` \xB7 ${d("voll um {time}",{time:Y(h)})}`:""}`:l?u`${G("plug")}${d("Angesteckt")}`:u`${G("car")}${s?.state==="home"?d("Steht zuhause"):d("Unterwegs")}`;return u`<div class="head">
        <div class="label">${n.name??d("Auto")}</div>
        ${s?u`<div class="place">${G("pin")}${b}</div>`:m}
      </div>
      <div class="car">${G("car")}</div>
      <div class="main">
        <div class="pct display num">${O(i,0)}<small>%</small></div>
        ${a!=null?u`<div class="km display num">${O(a,0)}<small>km</small></div>`:m}
      </div>
      <div class="battery">
        <i style="width:${Math.max(0,Math.min(100,i??0))}%"></i>
        ${r!=null&&r<100?u`<b style="left:${r}%"></b>`:m}
      </div>
      <div class="status">${v}</div>
      <div class="facts num">
        ${p?u`<span>${G(p.state==="locked"?"lock":"unlock")}${p.state==="locked"?d("Verriegelt"):d("Offen")}</span>`:m}
        ${g!=null?u`<span>${G("thermo")}${d("Innen {temp}\xB0",{temp:O(g,0)})}</span>`:m}
        ${r!=null?u`<span>${d("Ladelimit {n} %",{n:O(r,0)})}</span>`:m}
      </div>`}};Oi.styles=[W,C`
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
    `];var Wi=class extends ne{watched(){return(this.options.persons??[]).flatMap(n=>[n.entity,n.location])}render(){let n=this.hass,e=R(n,"zone.home"),i=this.options.persons??[];return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Familie")}</div>`}
      ${i.map(a=>{let r=R(n,a.entity);if(!r)return m;let s=a.name??r.attributes.friendly_name??a.entity,o=r.attributes.entity_picture,l=R(n,a.location),c=Za(n,r.state);if(r.state!=="home"){let h=l?.attributes["Sub Locality"]||l?.attributes.Locality;if(h&&r.state==="not_home"&&(c=h),e&&r.attributes.latitude!=null){let p=Ya(e.attributes.latitude,e.attributes.longitude,r.attributes.latitude,r.attributes.longitude);p>=.3&&(c=`${c} \xB7 ${O(p,p<10?1:0)} km`)}}return u`<div class="row">
          <div class="avatar ${r.state==="home"?"home":""}" style=${o?`background-image:url('${o}')`:""}>${o?"":s.slice(0,1)}</div>
          <div class="grow">
            <div class="a">${s}</div>
            <div class="b">${G(r.state==="home"?"home":"pin")}${c}<span class="since">· ${je(r.last_changed)}</span></div>
          </div>
        </div>`})}`}};Wi.styles=[W,Yt,C`
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
    `];var po={cleaning:"Saugt",docked:"In der Station",returning:"F\xE4hrt zur\xFCck",paused:"Pausiert",idle:"Bereit",error:"St\xF6rung"},Zt=(t,n,e)=>{let i=n.split(".")[1];return e.map(a=>`sensor.${i}_${a}`).find(a=>t?.states[a])},bc=(t,n)=>{let e=t?.entities,i=e?.[n]?.device_id,a=i?Object.values(e??{}).filter(s=>s.device_id===i&&s.entity_id.startsWith("image.")).map(s=>s.entity_id):[],r=n.split(".")[1];return a.find(s=>/map|karte/.test(s))??a[0]??[`image.${r}_map_0`,`image.${r}_map`].find(s=>t?.states[s])},Ri=class extends ne{vacuums(){return(this.options.vacuums??[]).map(n=>({...n,battery:n.battery??Zt(this.hass,n.entity,["batterie","battery"]),status:n.status??Zt(this.hass,n.entity,["status"]),room:n.room??Zt(this.hass,n.entity,["aktueller_raum","current_room"]),progress:n.progress??Zt(this.hass,n.entity,["reinigungsfortschritt","cleaning_progress"]),last_end:n.last_end??Zt(this.hass,n.entity,["letztes_reinigungsende","last_clean_end"]),area:n.area??Zt(this.hass,n.entity,["reinigungsbereich","cleaning_area"]),map:this.options.maps===!1||n.map===!1?void 0:n.map??bc(this.hass,n.entity)}))}watched(){return this.vacuums().flatMap(n=>[n.entity,n.battery,n.status,n.room,n.progress,n.last_end,n.area,n.map||void 0]).concat(this.options.map)}render(){let n=this.hass,e=this.vacuums(),i=R(n,this.options.map);return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Saugroboter")}</div>`}
      ${e.map(a=>{let r=R(n,a.entity);if(!r)return m;let s=ve(n,a.status),o=r.state==="cleaning"||r.state==="returning",l=po[r.state]?d(po[r.state]):r.state;r.state==="docked"&&s==="charging"&&(l=d("L\xE4dt in der Station"));let c=ce(n,a.battery),h=ve(n,a.room),p=ce(n,a.progress),g=te(ve(n,a.last_end)),b=ce(n,a.area),f=a.map?R(n,a.map)?.attributes.entity_picture:void 0,v=o?`${h??""}${p?` \xB7 ${O(p,0)} %`:""}`:g?`${d("Zuletzt fertig {when}",{when:`${Oe(g)} ${Y(g)}`})}${b?` \xB7 ${O(b,0)} m\xB2`:""}`:"";return u`<div class="row">
          <div class="badge ${o?"active":""}">${G("robot")}</div>
          <div class="grow">
            <div class="a">${a.name??r.attributes.friendly_name??a.entity}</div>
            <div class="b">${l}${v?` \xB7 ${v}`:""}</div>
            ${o&&p!=null?u`<div class="meter progress"><i style="width:${p}%"></i></div>`:m}
          </div>
          ${c!=null?u`<div class="end"><div class="val num">${O(c,0)} %</div><div class="meter"><i style="width:${c}%"></i></div></div>`:m}
          ${f?u`<div class="mini" style="background-image:url('${f}')"></div>`:m}
        </div>`})}
      ${i?.attributes.entity_picture?u`<div class="map"><img src=${i.attributes.entity_picture} alt="Karte" @error=${a=>a.target.style.visibility="hidden"} /></div>`:m}`}};Ri.styles=[W,Yt,C`
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
    `];var mo={bio:"#8a6a3d",gelb:"#e3c03a",papier:"#4a86c5",grau:"#8d9196",rest:"#8d9196"},Ki=class extends ne{watched(){return(this.options.bins??[]).flatMap(n=>[n.entity,n.out])}render(){let n=this.options,e=Number(n.highlight??1),i=(n.bins??[]).map(a=>({...a,days:vi(this.hass,a.entity)})).filter(a=>a.days!=null&&a.days>=0).sort((a,r)=>(a.days??99)-(r.days??99)).slice(0,Number(n.max??4));return u`${n.label===!1?m:u`<div class="label">${n.label??d("M\xFCllabfuhr")}</div>`}
      ${i.map(a=>{let r=a.days,s=new Date;s.setDate(s.getDate()+r);let o=a.color??mo[Object.keys(mo).find(c=>a.name.toLowerCase().includes(c))??"rest"],l=r<=2?Oe(s):d("in {n} Tagen",{n:O(r,0)});return u`<div class="row ${r<=e?"soon":""}">
          <div class="bin" style="background:${o}"></div>
          <div class="grow">
            <div class="a">${a.name}</div>
            ${a.out&&this.hass?.states[a.out]?.state==="on"?u`<div class="b" style="color:var(--af-good)">${d("Steht drau\xDFen")} ✓</div>`:r===1?u`<div class="b">${d("Heute Abend rausstellen")}</div>`:r===0?u`<div class="b">${d("Wird heute abgeholt")}</div>`:m}
          </div>
          <div class="end"><div class="val">${l}</div><div class="b num">${s.toLocaleDateString(ee(),{weekday:"short",day:"numeric",month:"numeric"})}</div></div>
        </div>`})}`}};Ki.styles=[W,Yt,C`
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
    `];var vc=new Set(["motion","occupancy","presence"]),yc=/\s*(bewegungsmelder|bewegungssensor|bewegung|anwesenheitssensor|belegung|occupancy|presence|motion)\s*\d*/gi,Vi=class extends ne{shouldUpdate(){return!0}sensors(){let n=this.hass;if(!n)return[];let e=this.options,i=new Set(e.exclude??[]);return(Array.isArray(e.entities)?e.entities:Object.keys(n.states).filter(r=>r.startsWith("binary_sensor.")&&vc.has(n.states[r].attributes.device_class))).filter(r=>!i.has(r)).map(r=>n.states[r]).filter(Boolean)}render(){let n=this.hass,e=this.options,i=Number(e.within??120)*6e4,a=this.sensors().map(o=>({name:n&&En(n,o.entity_id)||me(n,o.entity_id).replace(yc,"").trim()||o.entity_id,on:o.state==="on",at:new Date(o.last_changed)})).filter(o=>o.on||Date.now()-o.at.getTime()<i).sort((o,l)=>Number(l.on)-Number(o.on)||l.at.getTime()-o.at.getTime()),r=new Set,s=a.filter(o=>r.has(o.name)?!1:(r.add(o.name),!0)).slice(0,Number(e.max??3));return e.variant==="list"?u`${e.label===!1?m:u`<div class="label">${e.label??d("Bewegung")}</div>`}
        ${s.length?s.map(o=>u`<div class="row">${G("motion")}<div class="grow"><div class="a">${o.name}</div></div><div class="end b ${o.on?"now":""}">${o.on?d("jetzt"):je(o.at)}</div></div>`):u`<div class="b">${d("Keine Bewegung in letzter Zeit")}</div>`}`:s.length?u`<div class="line">
      ${G("motion")}
      ${s.map((o,l)=>u`${l?u`<span>·</span>`:m}<b>${o.name}</b><span class=${o.on?"now":""}>${o.on?d("jetzt"):je(o.at)}</span>`)}
    </div>`:e.hide_empty===!1?u`<div class="line">${G("motion")}${d("Ruhig")}</div>`:m}};Vi.styles=[W,Yt,C`
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
    `];var Hi=(t,n)=>{for(let[i,a,r]of n)if(t<=i)return[a,r];let e=n[n.length-1];return[e[1],e[2]]},wc=(t,n)=>{switch(t.format){case"aqi":return Hi(n,[[50,"gut","good"],[100,"m\xE4\xDFig","warn"],[150,"empfindliche Gruppen","bad"],[1/0,"ungesund","bad"]]);case"uv":return Hi(n,[[2,"niedrig","good"],[5,"m\xE4\xDFig","warn"],[7,"hoch","bad"],[1/0,"sehr hoch","bad"]]);case"lux":return Hi(n,[[10,"dunkel",""],[300,"d\xE4mmrig",""],[5e3,"hell",""],[1/0,"sonnig","warn"]]);case"humidity":return Hi(n,[[34,"trocken","warn"],[60,"gut","good"],[65,"feucht",""],[1/0,"zu feucht","warn"]]);default:return["",""]}},ji=class extends ne{watched(){return(this.options.rows??[]).map(n=>n.entity)}render(){let n=this.options.rows??[];return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Umwelt")}</div>`}
      ${n.map(e=>{let i=R(this.hass,e.entity);if(!i)return m;let a=ve(this.hass,e.entity,e.attribute),r,s=["",""];if(e.format==="rain"||e.format==="onoff"||i.entity_id.startsWith("binary_sensor.")){let o=a==="on";r=o?e.on_text??(e.format==="rain"?d("Regnet"):d("An")):e.off_text??(e.format==="rain"?d("Trocken"):d("Aus")),s=o?["",e.format==="rain"?"warn":""]:["",""]}else{let o=parseFloat(String(a)),l=e.unit??(e.attribute?"":i.attributes.unit_of_measurement??"");r=Number.isFinite(o)?`${O(o,e.decimals??(Math.abs(o)>=100?0:1))}${l?` ${l}`:""}`:String(a??"\u2013"),Number.isFinite(o)&&(s=wc(e,o))}return u`<div class="row">
          ${G(e.icon??"info")}
          <div class="grow"><div class="a">${e.name??i.attributes.friendly_name??e.entity}</div></div>
          <div class="end"><div class="val num ${s[0]?"":s[1]}">${r}</div>${s[0]?u`<div class="q ${s[1]}">${d(s[0])}</div>`:m}</div>
        </div>`})}`}};ji.styles=[W,Yt,C`
      .q {
        font-size: calc(16px * var(--af-fs, 1));
        margin-top: 4px;
      }
    `];var kc={minor:["Hinweis","warn"],moderate:["Warnung","warn"],severe:["Unwetter","bad"],extreme:["Extrem","bad"]},Gi=class extends ne{watched(){return this.options.entities??[]}render(){let n=(this.options.entities??[]).map(e=>R(this.hass,e)).filter(e=>or(e));return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Warnungen")}</div>`}
      ${n.length?n.map(e=>{let i=e.attributes,[a,r]=kc[String(i.severity??"").toLowerCase()]??["Warnung","warn"],s=d(a),o=te(i.expires);return u`<div class="row">
              <span class=${r}>${G("warning")}</span>
              <div class="grow">
                <div class="a">${i.headline??i.friendly_name}</div>
                <div class="b ${r}">${s}${o?` \xB7 ${d("bis {when}",{when:`${Oe(o)} ${Y(o)}`})}`:""}</div>
                ${i.description?u`<div class="desc">${i.description}</div>`:m}
              </div>
            </div>`}):u`<div class="calm">${G("check")}${this.options.calm_text??d("Keine Warnungen")}</div>`}`}};Gi.styles=[W,Yt,C`
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
    `];B("af-car",Oi);B("af-persons",Wi);B("af-vacuum",Ri);B("af-waste",Ki);B("af-activity",Vi);B("af-list",ji);B("af-warnings",Gi);var go,xc=(t,n)=>customElements.get("ha-camera-stream")?Promise.resolve(!0):window.loadCardHelpers?(go??=(async()=>{try{let i=await(await window.loadCardHelpers()).createCardElement({type:"picture-entity",entity:n,camera_view:"live",show_name:!1,show_state:!1});i.hass=t,i.style.cssText="position:fixed;left:-9999px;width:10px;height:10px;opacity:0;pointer-events:none",document.body.appendChild(i);let a=await Promise.race([customElements.whenDefined("ha-camera-stream").then(()=>!0),new Promise(r=>setTimeout(()=>r(!1),8e3))]);return i.remove(),a}catch{return!1}})(),go):Promise.resolve(!1),fo=t=>{let n=t.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([\w-]{11})/);if(n)return{kind:"youtube",id:n[1]};let e=t.match(/youtube\.com\/channel\/(UC[\w-]+)/);return e?{kind:"youtube",id:`live_stream?channel=${e[1]}`}:/\.m3u8(\?|$)/i.test(t)?{kind:"hls"}:/mjpe?g|video\.cgi|faststream|nphMotionJpeg/i.test(t)?{kind:"mjpeg"}:{kind:"image"}},lr=t=>{let n=fo(t);return n.kind==="image"?[t]:n.kind==="youtube"&&n.id&&!n.id.startsWith("live_stream")?[`https://i.ytimg.com/vi/${n.id}/maxresdefault_live.jpg`,`https://i.ytimg.com/vi/${n.id}/hqdefault_live.jpg`]:null},Zi=[["https://www.youtube.com/watch?v=w3zcgctSvFA","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)"],["https://www.youtube.com/watch?v=OmyDLXvaus4","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)"],["https://www.youtube.com/watch?v=JwEoLt8NXU8","Hamburg \u2013 Stadt (Livebild von YouTube)"],["https://www.youtube.com/watch?v=SZp1Q6LX7Wk","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)"],["https://www.youtube.com/watch?v=EH6GNSEvmQE","Renesse \u2013 Strand (Livebild von YouTube)"],["https://webcam.datacreate.de/hasenhorn/webcam-hasenhorn.jpg","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1615294555/original.jpg","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1279200146/original.jpg","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1595461776/original.jpg","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)"],["https://www.foto-webcam.eu/webcam/zugspitze/current/1200.jpg","Zugspitze (Bild, alle 10 min)"],["https://www.foto-webcam.eu/webcam/wendelstein-ost/current/1200.jpg","Wendelstein Ost (Bild, alle 10 min)"],["https://www.foto-webcam.eu/webcam/herzogstand/current/1200.jpg","Herzogstand \u2013 Kochel- und Walchensee (Bild)"],["https://www.foto-webcam.eu/webcam/muenchen/current/1200.jpg","M\xFCnchen \u2013 Panorama (Bild)"]],Dn=class extends oe{constructor(){super(...arguments);this.mode="live";this.osd="";this.refresh=0;this.native=!1;this.nativeFailed=!1;this.broken=!1;this.onBroken=()=>{this.isConnected&&(this.broken=!0,this.src=void 0,clearTimeout(this.retryTimer),this.retryTimer=window.setTimeout(()=>this.broken=!1,2e4))};this.onLoaded=()=>{this.broken&&(this.broken=!1)}}willUpdate(e){if(e.has("entity")&&(this.src=void 0),e.has("url")&&(this.shown=void 0,this.url&&lr(this.url)&&this.loadWebcamImage()),e.has("refresh")||e.has("url")){clearInterval(this.refreshTimer);let i=this.url?this.refresh||60:this.refresh;i>0&&(this.refreshTimer=window.setInterval(()=>{this.url?this.loadWebcamImage():(this.src=void 0,this.requestUpdate())},i*1e3))}this.hass&&this.entity&&!this.url&&this.mode==="live"&&!this.native&&!this.nativeFailed&&(customElements.get("ha-camera-stream")?this.native=!0:xc(this.hass,this.entity).then(i=>{i?this.native=!0:this.nativeFailed=!0,this.requestUpdate()}))}loadWebcamImage(e=this.url?lr(this.url):null){let i=this.url;if(!i||!e?.length)return;let[a,...r]=e,s=`${a}${a.includes("?")?"&":"?"}_=${Math.floor(Date.now()/1e3)}`,o=new Image;o.onload=()=>{this.url===i&&(this.shown=s)},o.onerror=()=>{this.url===i&&r.length&&this.loadWebcamImage(r)},o.src=s}renderWebcam(e){if(lr(e))return this.shown?u`<img src=${this.shown} alt="" />`:u`<div class="ph"><span>${this.osd}</span></div>`;let i=fo(e);switch(i.kind){case"youtube":{let a=i.id.startsWith("live_stream"),r="autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3",s=a?`https://www.youtube-nocookie.com/embed/${i.id}&${r}`:`https://www.youtube-nocookie.com/embed/${i.id}?${r}&loop=1&playlist=${i.id}`;return u`<iframe src=${s} allow="autoplay; encrypted-media" title="Webcam"></iframe>`}case"hls":return u`<video src=${e} autoplay muted playsinline loop></video>`;case"mjpeg":return this.broken?this.renderBroken():u`<img src=${e} alt="" @error=${this.onBroken} />`;default:return this.shown?u`<img src=${this.shown} alt="" />`:u`<div class="ph"><span>${this.osd}</span></div>`}}renderBroken(){return u`<div class="ph"><span>${this.osd}</span></div>`}render(){if(this.url)return this.renderWebcam(this.url);let e=R(this.hass,this.entity);if(this.broken)return this.renderBroken();if(e&&this.entity?.startsWith("image.")){let a=e.attributes.entity_picture;return a?u`<img src=${a} alt="" style="object-fit:contain;background:var(--af-surface)" @error=${this.onBroken} @load=${this.onLoaded} />`:u`<div class="ph"><span>${this.osd}</span></div>`}if(!e)return u`<div class="ph"><span>${this.osd}</span></div>`;if(this.mode==="live"&&this.native)return u`<ha-camera-stream .hass=${this.hass} .stateObj=${e} .muted=${!0} .controls=${!1} .fitMode=${"cover"} allow-exoplayer></ha-camera-stream>`;if(this.mode==="live"&&!this.nativeFailed)return u`<div class="ph"><span>${this.osd||d("Kamera wird verbunden \u2026")}</span></div>`;let i=e.attributes.access_token;if(!this.src&&i){let a=this.mode==="live"?"camera_proxy_stream":"camera_proxy";this.src=`/api/${a}/${this.entity}?token=${i}${this.mode==="snapshot"?`&t=${Date.now()}`:""}`}return this.src?u`<img src=${this.src} alt="" @error=${this.onBroken} @load=${this.onLoaded} />`:u`<div class="ph"><span>${this.osd}</span></div>`}disconnectedCallback(){super.disconnectedCallback(),this.renderRoot.querySelector("img")?.setAttribute("src","data:,"),clearInterval(this.refreshTimer),clearTimeout(this.retryTimer),this.src=void 0}};Dn.properties={hass:{attribute:!1},entity:{},url:{},mode:{},osd:{},refresh:{type:Number},native:{state:!0},shown:{state:!0},broken:{state:!0}},Dn.styles=C`
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
  `;var Ui=class extends J{shouldUpdate(){return!0}render(){let n=this.options.radius??28,e=this.options,i=e.text?this.hass?.states[e.text]:void 0,a=i?.state,r=i&&a&&a!=="unknown"&&a!=="unavailable"?this.hass?.formatEntityState?.(i)??a:void 0;return u`<af-camera-view style="--af-radius:${n}px" .hass=${this.hass} .entity=${e.url?void 0:e.entity} .url=${e.url}
        .mode=${e.mode??"live"} .refresh=${Number(e.refresh??0)} .osd=${e.url?"WEBCAM":"KAMERA"}></af-camera-view>
      ${e.title||r?u`<div class="cap">${e.title?u`<b>${e.title}</b>`:""}${r?u`<span>${r}</span>`:""}</div>`:""}`}};Ui.styles=[W,C`
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
    `];var qi=class extends J{constructor(){super(...arguments);this.cardKey="";this.error=""}shouldUpdate(){return!0}updated(){let e=JSON.stringify(this.options.card??null);e!==this.cardKey&&(this.cardKey=e,this.createCard()),this.card&&this.hass&&(this.card.hass=this.hass)}async createCard(){let e=this.options.card;if(this.card=void 0,this.error="",!e?.type)this.error=d("Keine Karte konfiguriert");else if(!window.loadCardHelpers)this.error=d("Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)",{type:String(e.type)});else try{let i=await window.loadCardHelpers();this.card=await i.createCardElement(e),this.card.hass=this.hass}catch(i){this.error=d("Karte nicht ladbar: {error}",{error:String(i)})}this.requestUpdate()}render(){return this.card??(this.error?u`<div class="hint">${this.error}</div>`:m)}};qi.styles=[W,C`
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
    `];B("af-camera-view",Dn);B("af-camera",Ui);B("af-card",qi);var Qt=C`
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
`,Yi=class extends ne{constructor(){super(...arguments);this.events=[];this.loadedAt=0;this.loading=!1}shouldUpdate(){return!0}async load(){let e=this.options.calendars??[];if(!(!this.hass||!e.length||this.loading)){this.loading=!0;try{let i=await this.hass.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:e},service_data:{duration:{days:Number(this.options.days??7)}},return_response:!0});this.events=Object.entries(i.response??{}).flatMap(([a,r])=>r.events.map(s=>({...s,calendar:a}))).sort((a,r)=>(te(a.start)?.getTime()??0)-(te(r.start)?.getTime()??0))}catch{this.events=[]}finally{this.loadedAt=Date.now(),this.loading=!1,this.requestUpdate()}}}render(){Date.now()-this.loadedAt>10*6e4&&this.load();let e=this.options,i=Date.now(),a=this.events.filter(o=>(te(o.end)?.getTime()??0)>i).slice(0,Number(e.max??6)),r=e.label===!1?m:u`<div class="label">${e.label??d("Termine")}</div>`;if(!a.length)return u`${r}<div class="calm">${G("check")}${this.loadedAt?e.empty_text??d("Keine Termine in den n\xE4chsten Tagen"):d("L\xE4dt \u2026")}</div>`;let s="";return u`${r}
      ${a.map(o=>{let l=te(o.start),c=!o.start.includes("T"),h=l.toDateString(),p=h!==s?u`<div class="day">${le(l)<=2?Oe(l):l.toLocaleDateString(ee(),{weekday:"long",day:"numeric",month:"long"})}</div>`:m;return s=h,u`${p}
          <div class="row">
            <div class="time num ${c?"allday":""}">${c?d("ganztags"):Y(l)}</div>
            <div class="grow">
              <div class="a">${o.summary}</div>
              ${e.location!==!1&&o.location?u`<div class="b">${o.location.split(",")[0]}</div>`:m}
            </div>
          </div>`})}`}};Yi.styles=[W,Qt,C`
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
    `];var Sc=t=>{let n=Number(t.attributes.media_position);if(!Number.isFinite(n))return;let e=t.attributes.media_position_updated_at;return t.state==="playing"&&e&&(n+=(Date.now()-new Date(e).getTime())/1e3),n},bo=t=>{let n=Math.max(0,Math.round(t)),e=Math.floor(n/3600),i=Math.floor(n%3600/60),a=String(n%60).padStart(2,"0");return e?`${e}:${String(i).padStart(2,"0")}:${a}`:`${i}:${a}`},Qi=class extends ne{disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.secTimer)}shouldUpdate(){return!0}tickEverySecond(n){n&&!this.secTimer&&(this.secTimer=window.setInterval(()=>this.requestUpdate(),1e3)),!n&&this.secTimer&&(clearInterval(this.secTimer),this.secTimer=void 0)}renderFull(n){let e=n.attributes,i=e.entity_picture,a=Number(e.media_duration),r=Sc(n),s=a>0&&r!=null,o=s?Math.min(1,Math.max(0,r/a)):0,l=[e.friendly_name,n.state==="paused"?d("pausiert"):""].filter(Boolean).join(" \xB7 ");return u`<div class="full">
      <div class="art">
        ${i?u`<div class="glow" style="background-image:url('${i}')"></div>`:m}
        <div class="pic" style=${i?`background-image:url('${i}')`:""}>${i?"":G("mdi:music")}</div>
      </div>
      <div class="text">
        ${this.options.label===!1?m:u`<div class="label">${this.options.label??d("L\xE4uft gerade")}${l?` \xB7 ${l}`:""}</div>`}
        <div class="title display">${e.media_title??e.app_name??d("Musik")}</div>
        ${e.media_artist?u`<div class="artist">${e.media_artist}</div>`:m}
        ${e.media_album_name?u`<div class="album">${e.media_album_name}</div>`:m}
        ${s?u`<div class="prog">
              <div class="bar"><i style="transform:scaleX(${o})"></i></div>
              <div class="times num"><span>${bo(r)}</span><span>−${bo(a-r)}</span></div>
            </div>`:m}
      </div>
    </div>`}render(){let n=this.options,e=(n.entities??[]).map(o=>R(this.hass,o)).filter(o=>!!o),i=e.find(o=>o.state==="playing")??(n.show_paused?e.find(o=>o.state==="paused"):void 0);if(this.tickEverySecond(n.variant==="full"&&i?.state==="playing"),i&&n.variant==="full")return this.renderFull(i);let a=n.label===!1?m:u`<div class="label">${n.label??d("L\xE4uft gerade")}</div>`;if(!i)return u`${a}<div class="calm">${G("check")}${n.empty_text??d("Gerade l\xE4uft nichts")}</div>`;let r=i.attributes,s=r.entity_picture;return u`${a}
      <div class="wrap">
        <div class="cover" style=${s?`background-image:url('${s}')`:""}>${s?"":G("mdi:music")}</div>
        <div class="grow">
          <div class="title display">${r.media_title??r.app_name??d("Musik")}</div>
          ${r.media_artist?u`<div class="artist">${r.media_artist}</div>`:m}
          <div class="where"><i></i>${r.friendly_name}${i.state==="paused"?` \xB7 ${d("pausiert")}`:""}${r.source?` \xB7 ${r.source}`:""}</div>
        </div>
      </div>`}};Qi.styles=[W,Qt,C`
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
    `];var Ji=class extends ne{watched(){return(this.options.items??[]).flatMap(n=>[n.running,n.power,n.progress,n.end,n.cost])}render(){let n=this.options,e=this.hass,i=(n.items??[]).filter(r=>R(e,r.running)?.state==="on"),a=n.label===!1?m:u`<div class="label">${n.label??d("Ger\xE4te")}</div>`;return i.length?u`${a}
      ${i.map(r=>{let s=te(R(e,r.running)?.last_changed),o=ce(e,r.power),l=ce(e,r.progress),c=te(ve(e,r.end)),h=ce(e,r.cost),p=[s?d("seit {time}",{time:Y(s)}):"",c?d("fertig {time}",{time:Y(c)}):"",o!=null?`${O(o,0)} W`:"",h!=null&&h>0?`${O(h,2)} \u20AC`:""].filter(Boolean);return u`<div class="row">
          ${G(r.icon??"washer")}
          <div class="grow">
            <div class="a">${r.name}</div>
            <div class="b num">${p.join(" \xB7 ")}</div>
            ${l!=null?u`<div class="meter"><i style="width:${l}%"></i></div>`:m}
          </div>
          ${l!=null?u`<div class="end num">${O(l,0)} %</div>`:m}
        </div>`})}`:u`${a}<div class="calm">${G("check")}${n.empty_text??d("Nichts l\xE4uft gerade")}</div>`}};Ji.styles=[W,Qt];var Xi=class extends ne{watched(){return(this.options.covers??[]).map(n=>n.entity)}render(){let n=this.options,e=(n.covers??[]).map(l=>({...l,s:R(this.hass,l.entity)})).filter(l=>l.s),i=l=>{let c=l.s,h=typeof c.attributes.current_position=="number"?c.attributes.current_position:c.state==="closed"||c.state==="closing"?0:c.state==="open"||c.state==="opening"?100:null;return h!=null&&l.invert&&(h=100-h),h},a=l=>l.s.attributes.device_class==="awning",r=e.filter(l=>!a(l)),s=r.filter(l=>(i(l)??100)<10).length,o=n.only_open?e.filter(l=>(i(l)??100)>=10):e;return u`${n.label===!1?m:u`<div class="label">${n.label??d("Rolll\xE4den")}</div>`}
      ${r.length?u`<div class="sum display num">${s}<small>${d("von {n} geschlossen",{n:r.length})}</small></div>`:m}
      ${o.map(l=>{let c=i(l),h=a(l),p=c!=null&&c<=2,g=h?c!=null&&c>2?"awning_out":"awning":p?"shutter":"shutter_open",b=c==null?"\u2013":h?c<=2?d("eingefahren"):c>=98?d("ausgefahren"):`${O(c,0)} %`:c>=98?d("offen"):c<=2?d("zu"):`${O(c,0)} %`;return u`<div class="row ${p?"shut":""}">
          ${G(g)}
          <div class="grow">
            <div class="a">${l.name??l.s.attributes.friendly_name}</div>
            ${c!=null&&c>2&&c<98?u`<div class="pos"><i style="width:${h?c:100-c}%"></i></div>`:m}
          </div>
          <div class="end num">${b}</div>
        </div>`})}`}};Xi.styles=[W,Qt,C`
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
    `];var ea=class extends ne{watched(){let{devices:n,low:e}=Qa(this.hass,this.options);return[...n.flatMap(i=>[i.id,i.id.replace(/_level$/,"_state")]),...e.map(i=>i.id)]}row(n,e){let i=Number(this.options.threshold??21),a=n.level!=null&&n.level<i;return u`<div class="row ${e?"lowrow":""}">
      ${G(e||n.kind==="other"?"battery":n.kind)}
      <div class="grow">
        <div class="a">${n.name}${n.charging?G("bolt","bolt"):m}</div>
        ${n.level!=null&&!e?u`<div class="meter"><i class=${n.charging?"charging":a?"low":""} style="width:${Math.max(2,Math.min(100,n.level))}%"></i></div>`:m}
      </div>
      <div class="end pct num">${n.level!=null?`${O(n.level,0)} %`:d("schwach")}</div>
    </div>`}render(){let n=this.options,{devices:e,low:i}=Qa(this.hass,n),a=n.part??"both",r=Number(n.max??(a==="low"?7:5)),s=a==="low"?d("Batterie wechseln"):d("Akkus"),o=n.label===!1?m:u`<div class="label">${n.label??s}</div>`,l=i.length?u`${a==="both"?u`<div class="sub">${d("Batterie wechseln")}</div>`:m}
          ${i.slice(0,r).map(c=>this.row(c,!0))}
          ${i.length>r?u`<div class="more">${d("+ {n} weitere",{n:i.length-r})}</div>`:m}`:u`<div class="calm">${G("check")}${a==="low"?d("Alle Batterien in Ordnung"):d("Zubeh\xF6r: alle Batterien in Ordnung")}</div>`;return u`${o} ${a!=="low"?e.map(c=>this.row(c,!1)):m} ${a!=="devices"?l:m}`}};ea.styles=[W,Qt,C`
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
    `];var ta=class extends ne{constructor(){super(...arguments);this.rows=[];this.loaded=!1;this.key=""}willUpdate(){let e=`${new Date().toDateString()}|${Math.floor(Date.now()/6e5)}|${JSON.stringify([this.options.devices,this.options.exclude])}`;this.hass&&e!==this.key&&(this.key=e,this.load())}async devices(){let e=(this.options.devices??[]).filter(i=>i.entity);if(e.length)return e.map(i=>({id:i.entity,name:i.name}));try{return((await this.hass.callWS({type:"energy/get_prefs"})).device_consumption??[]).map(a=>({id:a.stat_consumption,name:a.name}))}catch{return[]}}async load(){let e=new Set(this.options.exclude??[]),i=(await this.devices()).filter(r=>!e.has(r.id)),a=await Promise.all(i.map(async r=>{try{let s=await this.hass.callWS({type:"recorder/statistic_during_period",statistic_id:r.id,calendar:{period:"day"},types:["change"]}),o=typeof s.change=="number"?s.change:NaN,l=String(R(this.hass,r.id)?.attributes.unit_of_measurement??"kWh");if(l==="Wh"&&(o/=1e3),l==="MWh"&&(o*=1e3),!Number.isFinite(o)||o<=0)return null;let c=r.name||String(R(this.hass,r.id)?.attributes.friendly_name??r.id).replace(/\s*(energie|energy|energieverbrauch|verbrauch)$/i,"");return{id:r.id,name:c,kwh:o}}catch{return null}}));this.rows=a.filter(r=>!!r).sort((r,s)=>s.kwh-r.kwh),this.loaded=!0,this.requestUpdate()}render(){let e=this.options,i=this.rows.slice(0,Number(e.count??3)),a=i[0]?.kwh??1,r=e.label===!1?m:u`<div class="label">${e.label??d("Gr\xF6\xDFte Verbraucher heute")}</div>`;return i.length?u`${r}
      ${i.map((s,o)=>u`<div class="row">
          <div class="rank num">${o+1}</div>
          <div class="grow">
            <div class="a">${s.name}</div>
            <div class="meter"><i style="width:${Math.max(3,s.kwh/a*100)}%"></i></div>
          </div>
          <div class="end pct num">${O(s.kwh,s.kwh<10?2:1)} kWh</div>
        </div>`)}`:u`${r}<div class="calm">${G("plug")}${this.loaded?d("Heute noch kein Verbrauch gemessen"):d("Wird berechnet \u2026")}</div>`}};ta.styles=[W,Qt,C`
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
    `];B("af-agenda",Yi);B("af-consumers",ta);B("af-batteries",ea);B("af-media",Qi);B("af-appliances",Ji);B("af-covers",Xi);var xo=cs(dr(),1);var Nn=(t=new Date)=>new Date(t.getFullYear(),t.getMonth(),t.getDate()),$c=t=>t.toLocaleDateString(ee(),{weekday:"short"}).replace(".",""),Mn=class extends ne{constructor(){super(...arguments);this.times=[];this.history=[];this.loadedFor="";this.loadedAt=0}watched(){return[this.options.visits]}willUpdate(){let e=R(this.hass,this.options.visits)?.state??"";this.hass&&this.options.visits&&(e!==this.loadedFor||Date.now()-this.loadedAt>30*6e4)&&(this.loadedFor=e,this.loadedAt=Date.now(),this.load())}async load(){let e=this.hass,i=this.options.visits,a=Number(this.options.days??7);try{let s=(await e.callWS({type:"history/history_during_period",start_time:Nn().toISOString(),entity_ids:[i],minimal_response:!0,no_attributes:!0}))[i]??[],o=[],l=NaN;for(let c of s){let h=parseFloat(c.s),p=(c.lc??c.lu??0)*1e3;Number.isFinite(h)&&Number.isFinite(l)&&h>l&&p&&o.push(new Date(p)),Number.isFinite(h)&&(l=h)}this.times=o}catch{}try{let r=Nn(new Date(Date.now()-(a-1)*864e5)),s=await e.callWS({type:"recorder/statistics_during_period",statistic_ids:[i],period:"day",start_time:r.toISOString(),types:["change"]});this.history=(s[i]??[]).map(o=>({day:new Date(o.start),count:Math.max(0,Math.round(o.change??0))}))}catch{this.history=[]}}render(){let e=this.options,i=R(this.hass,e.visits),a=i?Math.round(parseFloat(i.state)):NaN,r=this.times.at(-1),s=p=>Nn(p).getTime()===Nn().getTime(),o=this.history.map(p=>s(p.day)&&Number.isFinite(a)?{...p,count:a}:p),l=Math.max(1,...o.map(p=>p.count)),c=o.filter(p=>!s(p.day)),h=c.length?c.reduce((p,g)=>p+g.count,0)/c.length:NaN;return u`<div class="wrap">
      <div class="left">
        <div class="head">${G(e.icon??"cat")}<span>${e.name??d("Haustier")}</span></div>
        <div class="big display num">${Number.isFinite(a)?a:"\u2013"}<span style="font-size:.4em">×</span></div>
        <div class="unit">${e.unit??d("Besuche heute")}</div>
        ${r?u`<div class="last">${d("zuletzt {time}",{time:Y(r)})} · ${je(r)}</div>`:m}
        ${this.times.length?u`<div class="times">${this.times.map(p=>u`<span class="num">${Y(p)}</span>`)}</div>`:m}
      </div>
      ${o.length>1?u`<div class="chart">
            <div class="label">${e.label??d("Letzte Tage")}</div>
            <div class="bars">
              ${o.map(p=>u`<div class="bar ${s(p.day)?"today":""}">
                  <b class="num">${p.count}</b>
                  <i style="height:${Math.max(4,p.count/l*150)}px"></i>
                  <span>${$c(p.day)}</span>
                </div>`)}
            </div>
            ${Number.isFinite(h)?u`<div class="avg">${d("\xD8 {n} pro Tag",{n:O(h,1)})}</div>`:m}
          </div>`:m}
    </div>`}};Mn.properties={...J.properties,times:{state:!0},history:{state:!0}},Mn.styles=[W,C`
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
    `];var Cn=class extends ne{constructor(){super(...arguments);this.values={};this.key=""}get offset(){return new Date().getHours()<Number(this.options.switch_hour??18)?-1:0}willUpdate(){let e=`${Nn().getTime()}|${this.offset}|${Math.floor(Date.now()/9e5)}|${JSON.stringify(this.options.groups??[])}`;this.hass&&e!==this.key&&(this.key=e,this.load())}async stat(e,i){try{let r=(await this.hass.callWS({type:"recorder/statistic_during_period",statistic_id:e,calendar:{period:"day",offset:this.offset},types:[i]}))[i];return typeof r=="number"&&Number.isFinite(r)?r:null}catch{return null}}async load(){let e=(this.options.groups??[]).flatMap(a=>a.rows??[]),i=await Promise.all(e.map(async a=>{let r=await this.stat(a.entity,a.type??"change"),s=a.cost?await this.stat(a.cost,"change"):r!=null&&a.price!=null?r*a.price:null;return[`${a.entity}|${a.cost??""}`,{value:r,cost:s}]}));this.values=Object.fromEntries(i)}unitOf(e){return e.unit??R(this.hass,e.entity)?.attributes.unit_of_measurement??""}render(){let e=this.options,i=new Date(Date.now()+this.offset*864e5),a=this.offset<0?d("Gestern, {date}",{date:i.toLocaleDateString(ee(),{weekday:"long",day:"numeric",month:"long"})}):d("Heute bis jetzt"),r=(e.groups??[]).map(s=>({...s,rows:(s.rows??[]).filter(o=>{let l=this.values[`${o.entity}|${o.cost??""}`];return l&&l.value!=null&&!(o.hide_zero&&Math.abs(l.value)<.05)})})).filter(s=>s.rows.length);return u`<div class="label">${e.label??d("Energie-Bilanz")} · ${a}</div>
      ${r.length?u`<div class="groups">
            ${r.map(s=>u`<div class="group">
                <div class="label">${s.label}</div>
                ${s.rows.map(o=>{let l=this.values[`${o.entity}|${o.cost??""}`],c=this.unitOf(o),h=l.value,p=o.decimals??(Math.abs(h)>=100?0:Math.abs(h)>=10?1:2);return u`<div class="row">
                    ${G(o.icon??"charge")}
                    <span class="name">${o.name}</span>
                    <span class="val display num"
                      >${O(h,p)}<small>${c}</small>${l.cost!=null&&l.cost>.004?u`<span class="cost">${O(l.cost,2)} €</span>`:m}</span
                    >
                  </div>`})}
              </div>`)}
          </div>`:u`<div class="calm">${d("Noch keine Werte f\xFCr diesen Tag.")}</div>`}`}};Cn.properties={...J.properties,values:{state:!0}},Cn.styles=[W,C`
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
    `];var ko=t=>t.replace(/([\\;,:"])/g,"\\$1"),na=class extends J{render(){let n=this.options,e=n.label===!1?m:u`<div class="label">${n.label??d("G\xE4ste-WLAN")}</div>`;if(n.image)return u`<div class="wrap">
        ${e}
        <div class="tile"><div class="qrimg" role="img" aria-label="QR-Code" style=${`background-image:url("${String(n.image).replace(/"/g,"%22")}")`}></div></div>
        ${n.ssid?u`<div class="ssid display">${n.ssid}</div>`:m}
        <div class="hint">${n.hint??d("Handy-Kamera auf den Code halten")}</div>
      </div>`;if(!n.ssid)return u`<div class="wrap">${e}<div class="hint">${d("Netzname und Passwort im Editor eintragen.")}</div></div>`;let i=n.encryption??(n.password?"WPA":"nopass"),a=`WIFI:T:${i};S:${ko(String(n.ssid))};${i==="nopass"?"":`P:${ko(String(n.password??""))};`}${n.hidden?"H:true;":""};`,r=(0,xo.default)(0,"M");r.addData(a,"Byte"),r.make();let s=r.getModuleCount(),o="";for(let l=0;l<s;l++)for(let c=0;c<s;c++)r.isDark(l,c)&&(o+=`M${c} ${l}h1v1h-1z`);return u`<div class="wrap">
      ${e}
      <div class="tile">${Ae`<svg viewBox="0 0 ${s} ${s}" shape-rendering="crispEdges" aria-label="QR-Code"><path d=${o} fill="#000"/></svg>`}</div>
      <div class="ssid display">${n.ssid}</div>
      ${n.show_password&&n.password?u`<div class="pass num">${d("Passwort")}: ${n.password}</div>`:m}
      <div class="hint">${n.hint??d("Handy-Kamera auf den Code halten")}</div>
    </div>`}};na.styles=[W,C`
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
    `];var Ac=(t,n)=>{let e=R(t,n),i=e?parseFloat(e.state):NaN;if(!e||!Number.isFinite(i))return null;let a=String(e.attributes.unit_of_measurement??"min");return a==="h"?i*60:a==="s"?i/60:a==="d"?i*1440:i},Tc=t=>t>=60?`${Math.floor(t/60)}:${String(Math.round(t%60)).padStart(2,"0")} h`:`${Math.round(t)} min`,ia=class extends ne{watched(){let n=this.options;return[n.title,n.progress,n.remaining,n.end,n.layer,n.layers,n.status,...(n.temps??[]).map(e=>e.entity)]}render(){let n=this.options,e=l=>{let c=R(this.hass,l);return c&&c.state!=="unknown"&&c.state!=="unavailable"?c.state:void 0},i=parseFloat(e(n.progress)??""),a=Ac(this.hass,n.remaining),r=e(n.end),s=r?new Date(r):null,o=[];a!=null&&a>0&&o.push([d("Noch"),Tc(a)]),s&&!isNaN(s.getTime())&&o.push([d("Fertig um"),Y(s)]),e(n.layer)&&e(n.layers)&&o.push([d("Schicht"),`${e(n.layer)} / ${e(n.layers)}`]);for(let l of n.temps??[]){let c=parseFloat(e(l.entity)??"");Number.isFinite(c)&&o.push([l.name,`${O(c,0)}\xB0`])}return e(n.status)&&o.push([d("Status"),String(e(n.status))]),u`<div class="label">${n.label??d("Auftrag")}</div>
      ${e(n.title)?u`<div class="title display">${e(n.title)}</div>`:m}
      ${Number.isFinite(i)?u`<div class="pct display num">${O(i,0)}<small>%</small></div>
            <div class="bar"><i style="width:${Math.max(0,Math.min(100,i))}%"></i></div>`:m}
      <div class="rows">${o.map(([l,c])=>u`<div class="r"><span>${l}</span><span class="num">${c}</span></div>`)}</div>`}};ia.styles=[W,C`
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
    `];B("af-pet",Mn);B("af-balance",Cn);B("af-qr",na);B("af-job",ia);var hr=[["tagesschau","tagesschau (DE)"],["ntv","n-tv (DE)"],["spiegel","SPIEGEL (DE)"],["zdf","ZDFheute (DE)"],["dlf","Deutschlandfunk (DE)"],["zeit","ZEIT ONLINE (DE)"],["faz","FAZ (DE)"],["sz","S\xFCddeutsche Zeitung (DE)"],["heise","heise online (DE)"],["orf","ORF (AT)"],["srf","SRF News (CH)"],["bbc","BBC News (UK)"],["bbc_world","BBC World (UK)"],["guardian","The Guardian (UK)"],["sky","Sky News (UK)"],["npr","NPR (US)"],["nyt","New York Times (US)"],["abc_us","ABC News (US)"],["cbc","CBC News (CA)"],["abc_au","ABC News (AU)"],["aljazeera","Al Jazeera (EN)"],["dw_en","DW (EN)"],["nos","NOS (NL)"],["nunl","NU.nl (NL)"],["vrtnws","VRT NWS (BE)"],["lemonde","Le Monde (FR)"],["franceinfo","franceinfo (FR)"],["rfi","RFI (FR)"],["lefigaro","Le Figaro (FR)"]],So={de:["tagesschau","ntv","spiegel"],en:["bbc","guardian","npr"],nl:["nos","nunl","vrtnws"],fr:["lemonde","franceinfo","rfi"]},Jt=()=>So[ai()]??So.en,ur=10*6e4,cr=new Map,Ec=(t,n)=>{let e=n.join("|"),i=cr.get(e);if(i?.pending)return i.pending;if(i&&Date.now()-i.at<ur)return Promise.resolve(i.items);let a=t.callWS({type:"ambiframe/news",feeds:n,limit:30}).then(r=>r.items??[]).catch(()=>i?.items??[]).then(r=>(cr.set(e,{at:r.length?Date.now():Date.now()-ur+6e4,items:r}),r));return cr.set(e,{at:i?.at??0,items:i?.items??[],pending:a}),a},zc=t=>new Promise(n=>{if(!t)return n();let e=new Image;e.onload=e.onerror=()=>n(),e.src=t}),Pn=class extends J{constructor(){super(...arguments);this.items=[];this.idx=0;this.prevImage="";this.feedsKey=""}get feeds(){let e=(Array.isArray(this.options.feeds)?this.options.feeds:[]).map(i=>typeof i=="string"?i:i?.value).filter(i=>!!i);return e.length?e:Jt()}get heroItems(){let e=this.items.filter(i=>i.image);return(e.length?e:this.items).slice(0,Number(this.options.max??8))}connectedCallback(){super.connectedCallback(),this.refreshTimer=window.setInterval(()=>{this.load()},ur+5e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.refreshTimer),clearTimeout(this.rotateTimer)}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.items.length}willUpdate(e){let i=this.feeds.join("|");this.hass&&(i!==this.feedsKey||e.has("options"))&&(this.feedsKey=i,this.load())}async load(){if(!this.hass)return;let e=await Ec(this.hass,this.feeds);!e.length&&this.items.length||(this.items=e,this.idx>=this.heroItems.length&&(this.idx=0),(this.options.variant??"hero")==="hero"&&this.schedule())}schedule(){clearTimeout(this.rotateTimer);let e=Math.max(5,Number(this.options.interval??14));this.rotateTimer=window.setTimeout(()=>{this.advance()},e*1e3)}async advance(){let e=this.heroItems;if(e.length>1){let i=(this.idx+1)%e.length;await zc(e[i].image),this.prevImage=e[this.idx]?.image??"",this.idx=i}this.schedule()}updated(){let e=this.renderRoot.querySelector(".track");if(e){let i=e.scrollWidth/2,a=Number(this.options.speed??45);i>0&&(e.style.animationDuration=`${Math.round(i/a)}s`)}}render(){let e=this.options.variant??"hero";if(!this.items.length)return u`<div class="calm">${this.options.empty_text??d("Nachrichten werden geladen \u2026")}</div>`;if(e==="ticker"){if(this.ctx?.ticker===!1)return m;let o=this.items.slice(0,Number(this.options.max??12)).map(l=>u`<span><b>${l.source}</b>${l.title}</span><span class="sep">•</span>`);return u`<div class="tick"><div class="track">${o}${o}</div></div>`}if(e==="list"){let s=this.items.slice(0,Number(this.options.max??4));return u`${this.options.label===!1?m:u`<div class="label">${this.options.label??d("Nachrichten")}</div>`}
        <div class="rows">
          ${s.map(o=>u`<div class="row">
              ${o.image?u`<div class="thumb" style="background-image:url('${o.image}')"></div>`:m}
              <div>
                <div class="rt">${o.title}</div>
                <div class="rm">${o.source}${o.published?` \xB7 ${je(o.published)}`:""}</div>
              </div>
            </div>`)}
        </div>`}let i=this.heroItems,a=i[this.idx]??i[0],r=Math.max(5,Number(this.options.interval??14));return u`<div class="hero">
      ${this.prevImage?u`<div class="img" style="background-image:url('${this.prevImage}')"></div>`:m}
      ${a.image?Re(a.image,u`<div class="img cur" style="background-image:url('${a.image}');--t:${r+2}s"></div>`):m}
      <div class="grad"></div>
      ${Re(a.title,u`<div class="txt">
          <div class="meta"><b>${a.source}</b>${a.published?` \xB7 ${je(a.published)}`:""}</div>
          <div class="title display">${a.title}</div>
          ${a.summary?u`<div class="sum">${a.summary}</div>`:m}
        </div>`)}
      ${i.length>1?u`<div class="dots">${i.map((s,o)=>u`<i class=${o===this.idx?"on":""}></i>`)}</div>`:m}
    </div>`}};Pn.properties={...J.properties,items:{state:!0},idx:{state:!0}},Pn.styles=[W,C`
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
    `];B("af-news",Pn);var Xt=t=>(Array.isArray(t)?t:typeof t=="string"?t.split(","):[]).map(n=>typeof n=="string"?n:n?.value??n?.entity).filter(n=>!!n&&!!n.trim()).map(n=>n.trim()),ua=(t,n)=>Object.entries(t?.states??{}).filter(([e,i])=>n(e,i)).map(([e])=>e),gt=(t,n)=>t.label===!1?m:u`<div class="label">${t.label??n}</div>`,_o=(t,n)=>{let e=Number(n.latitude??t?.states["zone.home"]?.attributes.latitude),i=Number(n.longitude??t?.states["zone.home"]?.attributes.longitude);return Number.isFinite(e)&&Number.isFinite(i)?{lat:e,lon:i}:null},Lc=t=>{let n=Math.max(0,Math.round(t/1e3)),e=Math.floor(n/3600),i=Math.floor(n%3600/60),a=String(n%60).padStart(2,"0");return e?`${e}:${String(i).padStart(2,"0")}:${a}`:`${i}:${a}`},$o=t=>{let n=String(t??"").split(":").map(Number);return n.some(e=>!Number.isFinite(e))?0:n.reduce((e,i)=>e*60+i,0)*1e3},_c=(t,n=Date.now())=>{if(!t||t.state!=="active"&&t.state!=="paused")return null;if(t.state==="active"){let e=te(t.attributes.finishes_at);return e?Math.max(0,e.getTime()-n):Math.max(0,$o(t.attributes.remaining)-(n-new Date(t.last_changed).getTime()))}return $o(t.attributes.remaining)},ra=class extends J{get timers(){let n=Xt(this.options.entities);return n.length?n:ua(this.hass,e=>e.startsWith("timer."))}watched(){return this.timers}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.ticker),this.ticker=void 0}updated(n){super.updated(n);let e=this.timers.some(i=>this.hass?.states[i]?.state==="active");e&&!this.ticker&&(this.ticker=window.setInterval(()=>this.requestUpdate(),1e3)),!e&&this.ticker&&(clearInterval(this.ticker),this.ticker=void 0)}act(n,e,i,a={}){n.stopPropagation(),this.hass?.callService("timer",e,{entity_id:i,...a})}render(){let n=this.timers,e=Xt(this.options.presets??"5, 10, 15").map(Number).filter(r=>r>0),i=this.options.target??n[0],a=n.map(r=>({id:r,s:this.hass?.states[r],left:_c(this.hass?.states[r])})).filter(r=>r.s&&(r.left!==null||this.options.show_idle));return u`${gt(this.options,d("Timer"))}
      ${a.length?a.map(r=>u`<div class="row ${r.left===null?"idle":r.s.state}">
              ${X("timer")}
              <span class="name">${me(this.hass,r.id)}</span>
              <span class="left display num">${r.left===null?d("bereit"):Lc(r.left)}</span>
              ${r.left===null?m:u`<button class="ctl" title=${r.s.state==="active"?d("Anhalten"):d("Weiter")} @click=${s=>this.act(s,r.s.state==="active"?"pause":"start",r.id)}>
                      ${X(r.s.state==="active"?"pause":"play")}
                    </button>
                    <button class="ctl" title=${d("Abbrechen")} @click=${s=>this.act(s,"cancel",r.id)}>${X("close")}</button>`}
            </div>`):u`<div class="calm">${n.length?d("Kein Timer l\xE4uft"):d("Kein Timer gefunden \u2013 in HA unter Helfer einen Timer anlegen.")}</div>`}
      ${e.length&&i?u`<div class="presets">
            ${e.map(r=>u`<button @click=${s=>this.act(s,"start",i,{duration:`00:${String(r).padStart(2,"0")}:00`})}>
                ${d("{n} min",{n:r})}
              </button>`)}
          </div>`:m}`}};ra.styles=[W,C`
      :host {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: calc(12px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .row .ic {
        font-size: 30px;
        color: var(--af-accent);
      }
      .name {
        flex: 1;
        min-width: 0;
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .left {
        font-size: calc(46px * var(--af-fs, 1));
        line-height: 1;
      }
      .row.paused .left {
        opacity: 0.55;
      }
      .row.idle .left {
        font-size: calc(26px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      button {
        font: inherit;
        color: var(--af-ink);
        background: var(--af-surface, transparent);
        border: 1px solid var(--af-line);
        border-radius: 999px;
        padding: 8px 16px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      button.ctl {
        width: 44px;
        height: 44px;
        padding: 0;
        display: grid;
        place-items: center;
        font-size: 20px;
      }
      .presets {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 4px;
      }
      .presets button {
        font-size: calc(19px * var(--af-fs, 1));
        padding: 10px 20px;
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `];var sa=class extends J{get sources(){let n=Xt(this.options.entities);return n.length?n:ua(this.hass,e=>/^(input_text|text)\..*(pinnwand|board|nachricht|message|notiz|note)/.test(e))}watched(){return this.sources}render(){let n=Number(this.options.expire_hours??0),e=this.sources.map(a=>this.hass?.states[a]).filter(a=>!!a&&!!a.state.trim()&&!["unknown","unavailable"].includes(a.state)).filter(a=>!n||Date.now()-new Date(a.last_changed).getTime()<n*36e5),i=this.options.size?`--size:${Number(this.options.size)}px`:"";return u`${gt(this.options,d("Pinnwand"))}
      ${e.length?e.map(a=>u`<div class="note" style=${i}>
              <div class="text">${a.state}</div>
              <div class="meta">${me(this.hass,a.entity_id)} · ${je(a.last_changed)}</div>
            </div>`):u`<div class="calm">${this.options.empty_text??d("Keine Nachrichten")}</div>`}`}};sa.styles=[W,C`
      :host {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .note {
        padding: 18px 22px;
        border-radius: var(--af-card-radius, 20px);
        background: var(--af-surface);
        border: 1px solid var(--af-line);
      }
      .text {
        font-size: var(--size, calc(30px * var(--af-fs, 1)));
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      .meta {
        margin-top: 8px;
        font-size: calc(15px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `];var Dc=(t,n)=>{if(n.date)return te(n.date.length===10?`${n.date}T00:00:00`:n.date);let e=R(t,n.entity);if(!e)return null;if(n.entity.startsWith("calendar."))return te(e.attributes.start_time);let i=e.attributes;if(i.has_date&&i.year)return new Date(Number(i.year),Number(i.month)-1,Number(i.day),Number(i.hour??0),Number(i.minute??0));let a=e.state.length===10?`${e.state}T00:00:00`:e.state;return te(a)},Ao=t=>t===0?d("heute"):t===1?d("morgen"):t<0?d("vor {n} Tagen",{n:-t}):t>=21?d("noch {n} Wochen",{n:Math.round(t/7)}):d("noch {n} Tage",{n:t}),oa=class extends J{watched(){return(this.options.items??[]).map(n=>n.entity)}render(){let n=(this.options.items??[]).map(e=>{let i=Dc(this.hass,e);return i?{...e,days:le(i),name:e.name||(e.entity?me(this.hass,e.entity):"")}:null}).filter(e=>!!e&&(e.days>=0||!!this.options.show_past)).sort((e,i)=>e.days-i.days).slice(0,Number(this.options.max??5));if(!n.length)return u`${gt(this.options,d("Countdown"))}<div class="calm">${d("Nichts geplant")}</div>`;if(n.length===1){let e=n[0];return u`${gt(this.options,d("Countdown"))}
        <div class="one">
          ${e.days>1?u`<div class="n display num">${e.days}</div><div class="unit">${d("Tage bis")}</div>`:u`<div class="n display">${Ao(e.days)}</div>`}
          <div class="what">${e.icon?X(e.icon):m} ${e.name}</div>
        </div>`}return u`${gt(this.options,d("Countdown"))}
      ${n.map(e=>u`<div class="row"><span class="what">${e.icon?X(e.icon):m} ${e.name}</span><span class="when num">${Ao(e.days)}</span></div>`)}`}};oa.styles=[W,C`
      :host {
        display: flex;
        flex-direction: column;
        gap: 10px;
        container-type: size;
      }
      .one {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .one .n {
        font-size: min(46cqh, 200px);
        line-height: 0.95;
      }
      .one .unit {
        font-size: calc(26px * var(--af-fs, 1));
        color: var(--af-ink-2);
        margin-top: 8px;
      }
      .one .what {
        font-size: calc(30px * var(--af-fs, 1));
        margin-top: 6px;
      }
      .row {
        display: flex;
        align-items: baseline;
        gap: 14px;
        padding: calc(10px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .row .what {
        flex: 1;
        min-width: 0;
      }
      .row .when {
        color: var(--af-accent);
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `];var Et=(t,n)=>{let e=Object.fromEntries(Object.entries(t).map(([i,a])=>[i.toLowerCase(),a]));for(let i of n)if(e[i]!=null&&e[i]!=="")return e[i]},Nc=(t,n)=>{if(typeof t=="number")return new Date(n+t*6e4);let e=String(t??"").trim();if(/^\d{1,2}:\d{2}$/.test(e)){let[i,a]=e.split(":").map(Number),r=new Date(n);return r.setHours(i,a,0,0),r.getTime()<n-6*36e5&&r.setDate(r.getDate()+1),r}return/^\d+$/.test(e)?new Date(n+Number(e)*6e4):te(e)},Mc=["line","name","number","train","route","product"],Cc=["direction","destination","to","final_destination","headsign"],To=["departure","departure_time","time","planned","scheduled","when","minutes"],Pc=["delay","delay_minutes","delay_departure"],Eo=["platform","track","gleis"],Ic=(t,n,e=Date.now())=>{if(!t)return[];let i=t.attributes,a=n?i[n]:Object.values(i).find(s=>Array.isArray(s)&&s.some(o=>o&&typeof o=="object"));return(Array.isArray(a)?a:[{...i,departure:Et(i,To)??t.state}]).map(s=>{let o=Nc(Et(s,To),e);if(!o)return null;let l=Number(Et(s,Pc)??0)||0,c=Et(s,Mc);return{line:String(typeof c=="object"&&c?c.name??"":c??""),destination:String(Et(s,Cc)??""),time:o,delay:l,platform:Et(s,Eo)!=null?String(Et(s,Eo)):void 0}}).filter(s=>!!s)},la=class extends J{connectedCallback(){super.connectedCallback(),this.ticker=window.setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.ticker)}get sources(){let n=Xt(this.options.entities);return n.length?n:ua(this.hass,(e,i)=>Object.values(i.attributes).some(a=>Array.isArray(a)&&a.some(r=>r&&typeof r=="object"&&("departure"in r||"direction"in r))))}watched(){return this.sources}render(){let n=Date.now(),e=Xt(this.options.lines).map(r=>r.toLowerCase()),i=Number(this.options.walk??0)*6e4,a=this.sources.flatMap(r=>Ic(this.hass?.states[r],this.options.attribute,n)).filter(r=>r.time.getTime()+r.delay*6e4>=n+i).filter(r=>!e.length||e.includes(r.line.toLowerCase())).sort((r,s)=>r.time.getTime()+r.delay*6e4-(s.time.getTime()+s.delay*6e4)).slice(0,Number(this.options.max??6));return u`${gt(this.options,d("Abfahrten"))}
      ${a.length?a.map(r=>{let s=Math.round((r.time.getTime()+r.delay*6e4-n)/6e4);return u`<div class="row">
              <span class="line">${r.line||X("train")}</span>
              <span class="dest">${r.destination}${this.options.show_platform&&r.platform?u` <span class="plat">· ${d("Gleis {n}",{n:r.platform})}</span>`:m}</span>
              <span class="in num">${s<=0?d("jetzt"):s<60?d("{n} min",{n:s}):Y(r.time)}${r.delay>0?u`<span class="late">+${r.delay}</span>`:m}</span>
            </div>`}):u`<div class="calm">${this.sources.length?d("Keine Abfahrten"):d("Keinen \xD6PNV-Sensor gefunden \u2013 unter Sensoren eintragen.")}</div>`}`}};la.styles=[W,C`
      :host {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: calc(10px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
        font-size: calc(22px * var(--af-fs, 1));
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .line {
        min-width: 3.2em;
        text-align: center;
        padding: 3px 10px;
        border-radius: 8px;
        background: var(--af-accent);
        color: var(--af-bg, #000);
        font-weight: 600;
        font-size: 0.85em;
      }
      .dest {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .plat {
        color: var(--af-ink-3);
        font-size: 0.8em;
      }
      .in {
        min-width: 4.2em;
        text-align: right;
      }
      .late {
        color: var(--af-warn, #e06c5c);
        font-size: 0.8em;
        margin-left: 6px;
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `];var Fc=(t,n,e)=>{let i=2**e,a=t*Math.PI/180;return{x:(n+180)/360*i,y:(1-Math.log(Math.tan(a)+1/Math.cos(a))/Math.PI)/2*i}},zo="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas",aa={light:{url:`${zo}/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`,credit:"\xA9 Esri, HERE, OpenStreetMap"},dark:{url:`${zo}/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`,credit:"\xA9 Esri, HERE, OpenStreetMap"},osm:{url:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",credit:"\xA9 OpenStreetMap"}},In,Fn=class extends J{constructor(){super(...arguments);this.frame=0;this.frames=[];this.host="";this.loaded=1;this.lastLoad=0}connectedCallback(){super.connectedCallback(),this.load(),this.reload=window.setInterval(()=>{this.load()},10*6e4),this.resize=new ResizeObserver(()=>this.requestUpdate()),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.reload),clearTimeout(this.anim),this.resize?.disconnect()}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.frames.length}get shown(){let e=Math.min(13,Math.max(1,Number(this.options.frames??6)));return this.frames.slice(-e)}async load(){if(!In||Date.now()-In.at>9*6e4)try{let i=await(await fetch("https://api.rainviewer.com/public/weather-maps.json")).json();In={at:Date.now(),host:i.host,frames:i.radar?.past??[]}}catch{return}this.host=In.host,this.frames=In.frames,this.frame=this.shown.length-1,this.lastLoad=Date.now(),this.step()}step(){clearTimeout(this.anim);let e=this.shown.length;if(e<2)return;let i=this.frame>=e-1;this.anim=window.setTimeout(()=>{this.loaded<e&&Date.now()-this.lastLoad>1500&&(this.loaded++,this.lastLoad=Date.now()),this.frame=i?e-Math.min(this.loaded,e):this.frame+1,this.step()},i?2500:Number(this.options.speed??500))}map(){let e=String(this.options.map_url??"");if(e.includes("{z}"))return{url:e,credit:""};let i=String(this.options.map??"auto");if(aa[i])return aa[i];if(i==="voyager")return aa.osm;let a=this;for(;a&&!(a instanceof Element&&a.tagName==="AF-DISPLAY");)a=a.parentNode??a.host??null;return aa[a?.getAttribute("mode")==="light"?"light":"dark"]}render(){let e=_o(this.hass,this.options);if(!e)return u`<div class="calm">${d("Kein Ort \u2013 Zuhause in HA eintragen oder Breite/L\xE4nge angeben.")}</div>`;let i=Math.min(7,Math.max(3,Number(this.options.zoom??7))),a=Fc(e.lat,e.lon,i),r=[],s=(this.clientWidth||512)/512,o=(this.clientHeight||512)/512;for(let b=Math.floor(a.x-s);b<=Math.floor(a.x+s);b++)for(let f=Math.floor(a.y-o);f<=Math.floor(a.y+o);f++)r.push({x:b,y:f,dx:(b-a.x)*256,dy:(f-a.y)*256});let l=b=>`left:calc(50% + ${b.dx}px);top:calc(50% + ${b.dy}px)`,c=this.map(),h=this.shown,p=h[this.frame],g=h.length-Math.min(this.loaded,h.length);return u`<div class="map">
        ${r.map(b=>u`<img alt="" src=${c.url.replace("{z}",String(i)).replace("{x}",String(b.x)).replace("{y}",String(b.y))} style=${l(b)} />`)}
      </div>
      ${h.slice(g).map((b,f)=>u`<div class="rain ${f+g===this.frame?"":"hidden"}">
          ${r.map(v=>u`<img alt="" src="${this.host}${b.path}/256/${i}/${v.x}/${v.y}/2/1_1.png" style=${l(v)} />`)}
        </div>`)}
      <div class="home"></div>
      ${this.options.label===!1?m:u`<div class="info">${this.options.label??d("Regenradar")}${p?u` · <span class="num">${Y(new Date(p.time*1e3))}</span>`:m}</div>`}
      <div class="credit">${c.credit?`${c.credit} \xB7 `:""}RainViewer</div>`}};Fn.properties={...J.properties,frame:{state:!0}},Fn.styles=[W,C`
      :host {
        position: relative;
        overflow: hidden;
        border-radius: var(--af-card-radius, 20px);
        background: var(--af-surface);
      }
      .map {
        position: absolute;
        inset: 0;
      }
      .map img {
        position: absolute;
        width: 256px;
        height: 256px;
        user-select: none;
        pointer-events: none;
      }
      .rain img {
        opacity: 0.8;
      }
      .rain {
        position: absolute;
        inset: 0;
      }
      .rain.hidden {
        visibility: hidden;
      }
      .home {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 12px;
        height: 12px;
        margin: -6px 0 0 -6px;
        border-radius: 50%;
        background: var(--af-accent);
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.25);
      }
      .info {
        position: absolute;
        left: 14px;
        top: 12px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--af-chip);
        font-size: calc(15px * var(--af-fs, 1));
      }
      .credit {
        position: absolute;
        right: 10px;
        bottom: 6px;
        font-size: 10px;
        color: var(--af-ink-3);
      }
      .calm {
        padding: 20px;
        color: var(--af-ink-3);
      }
    `];var Lo=(t,n,e)=>{let i=Math.PI/180,a=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate()),s=Math.round((a-Date.UTC(2e3,0,1,12))/864e5)-e/360,o=(357.5291+.98560028*s)%360,l=1.9148*Math.sin(o*i)+.02*Math.sin(2*o*i)+3e-4*Math.sin(3*o*i),c=(o+l+180+102.9372)%360,h=2451545+s+.0053*Math.sin(o*i)-.0069*Math.sin(2*c*i),p=Math.asin(Math.sin(c*i)*Math.sin(23.4397*i)),g=(Math.sin(-.833*i)-Math.sin(n*i)*Math.sin(p))/(Math.cos(n*i)*Math.cos(p));if(g<-1||g>1)return null;let b=Math.acos(g)/i/360,f=v=>new Date((v-24405875e-1)*864e5);return{rise:f(h-b),set:f(h+b)}},Bc=["Neumond","Zunehmende Sichel","Erstes Viertel","Zunehmender Mond","Vollmond","Abnehmender Mond","Letztes Viertel","Abnehmende Sichel"],Hc=t=>{let n=29.530588853,e=Date.UTC(2e3,0,6,18,14)/864e5,a=((t.getTime()/864e5-e)%n+n)%n/n,r=(1-Math.cos(2*Math.PI*a))/2,s=Bc[Math.round(a*8)%8],o=(.5-a+1)%1*n;return{phase:a,lit:r,name:s,next_full:new Date(t.getTime()+o*864e5)}},Oc=t=>{let n=t<.5,e=Math.cos(2*Math.PI*t),i=(Math.abs(e)*20).toFixed(2),a=n===e>0?0:1;return`M24 4 A20 20 0 0 ${n?1:0} 24 44 A${i} 20 0 0 ${a} 24 4 Z`},da=class extends J{connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.requestUpdate(),36e5)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}shouldUpdate(n){return!(n.size===1&&n.has("hass"))}moonSvg(n,e){return u`<svg class="moon" viewBox="0 0 48 48" style=${e?"transform:scaleX(-1)":""}>
      <circle cx="24" cy="24" r="20" class="dark" />
      <path d=${Oc(n)} fill="var(--af-accent)" opacity="0.9" />
    </svg>`}render(){let n=Xt(this.options.show),e=p=>!n.length||n.includes(p),i=_o(this.hass,this.options),a=new Date,r=i?Lo(a,i.lat,i.lon):null,s=i?Lo(new Date(a.getTime()-864e5),i.lat,i.lon):null,o=p=>p?p.set.getTime()-p.rise.getTime():0,l=Math.round((o(r)-o(s))/6e4),c=o(r),h=Hc(a);return u`${gt(this.options,d("Sonne & Mond"))}
      <div class="grid">
        ${e("sun")&&r?u`<div class="big">
                ${X("sun")}
                <div>
                  <div class="v display num">${Y(r.rise)} – ${Y(r.set)}</div>
                  <div class="s num">
                    ${d("{h} h {m} min Tageslicht",{h:Math.floor(c/36e5),m:Math.round(c%36e5/6e4)})}
                    · ${l===0?d("wie gestern"):d("{n} min zu gestern",{n:`${l>0?"+":"\u2212"}${Math.abs(l)}`})}
                  </div>
                </div>
              </div>`:m}
        ${e("moon")?u`<div class="big">
              ${this.moonSvg(h.phase,(i?.lat??1)<0)}
              <div>
                <div class="v display">${d(h.name)}</div>
                <div class="s num">
                  ${d("{n} % beleuchtet",{n:Math.round(h.lit*100)})} · ${d("Vollmond {when}",{when:h.next_full.toLocaleDateString(ee(),{weekday:"short",day:"numeric",month:"short"})})}
                </div>
              </div>
            </div>`:m}
      </div>`}};da.styles=[W,C`
      :host {
        display: flex;
        flex-direction: column;
        gap: calc(14px * var(--af-dense, 1));
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: calc(18px * var(--af-dense, 1)) 28px;
      }
      .big {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .big .ic {
        font-size: calc(46px * var(--af-fs, 1));
        color: var(--af-accent);
      }
      .v {
        font-size: calc(40px * var(--af-fs, 1));
        line-height: 1.05;
      }
      .s {
        font-size: calc(17px * var(--af-fs, 1));
        color: var(--af-ink-3);
        margin-top: 4px;
      }
      .moon .dark {
        fill: color-mix(in srgb, var(--af-ink) 13%, transparent);
      }
      .moon {
        width: calc(46px * var(--af-fs, 1));
        height: calc(46px * var(--af-fs, 1));
        flex: none;
      }
    `];var Wc=(t,n,e=3)=>{if(!Number.isFinite(n))return-1;let i={pollen:e===5?[.5,2,3.5]:[.25,1.25,2.25],aqi:[50,100,150],pm25:[10,25,50],pm10:[20,50,100],ozone:[60,120,180],no2:[40,100,200]},[a,r,s]=i[t];return n<a?0:n<r?1:n<s?2:3},pr=(t,n)=>{let e=String(n?.attributes.device_class??"");return/pollen|pollenflug/i.test(t)?"pollen":e==="aqi"||/_aqi|luftqualitat|air_quality_index/.test(t)?"aqi":e==="pm25"||/pm2_?5/.test(t)?"pm25":e==="pm10"||/pm10/.test(t)?"pm10":e==="ozone"||/ozon/.test(t)?"ozone":e==="nitrogen_dioxide"||/no2|stickstoffdioxid/.test(t)?"no2":null},Rc=t=>t.charAt(0).toUpperCase()+t.slice(1),Kc=["keine","gering","mittel","hoch"],Vc=["gut","m\xE4\xDFig","schlecht","sehr schlecht"],ca=class extends J{get items(){let e=(this.options.entities??[]).map(i=>typeof i=="string"?{entity:i}:i).filter(i=>!!i?.entity).map(i=>({...i,kind:i.kind??pr(i.entity,this.hass?.states[i.entity])??"aqi"}));return e.length?e:ua(this.hass,(i,a)=>i.startsWith("sensor.")&&!!pr(i,a)&&Number.isFinite(parseFloat(a.state))).map(i=>({entity:i,kind:pr(i,this.hass?.states[i])}))}watched(){return this.items.map(n=>n.entity)}render(){let n=this.items.map(e=>{let i=parseFloat(this.hass?.states[e.entity]?.state??"");return{...e,level:Wc(e.kind,i,Number(e.scale??3))}}).filter(e=>e.level>=0&&(!this.options.only_elevated||e.level>=1)).sort((e,i)=>i.level-e.level).slice(0,Number(this.options.max??8));return u`${gt(this.options,d("Pollen & Luft"))}
      ${n.length?n.map(e=>u`<div class="row">
              <span class="dot l${e.level}"></span>
              <span class="name">${e.name||Rc(me(this.hass,e.entity).replace(/^(Pollenflug|Pollen)\s*/i,""))}</span>
              <span class="lvl">${d((e.kind==="pollen"?Kc:Vc)[e.level])}</span>
            </div>`):u`<div class="calm">${this.items.length?d("Alles im gr\xFCnen Bereich"):d("Keine Pollen- oder Luftsensoren gefunden.")}</div>`}`}};ca.styles=[W,C`
      :host {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: calc(9px * var(--af-dense, 1)) 0;
        border-bottom: 1px solid var(--af-line);
        font-size: calc(21px * var(--af-fs, 1));
      }
      .row:last-of-type {
        border-bottom: 0;
      }
      .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        flex: none;
      }
      .l0 {
        background: var(--af-good, #6fbf73);
      }
      .l1 {
        background: #d8c24a;
      }
      .l2 {
        background: #e39a3c;
      }
      .l3 {
        background: var(--af-warn, #e06c5c);
      }
      .name {
        flex: 1;
        min-width: 0;
      }
      .lvl {
        color: var(--af-ink-2);
        font-size: 0.85em;
      }
      .calm {
        font-size: calc(20px * var(--af-fs, 1));
        color: var(--af-ink-3);
      }
    `];B("af-timer",ra);B("af-board",sa);B("af-countdown",oa);B("af-departures",la);B("af-radar",Fn);B("af-sky",da);B("af-air",ca);var jc={morning:"Heute",midday:"Heute Nachmittag",evening:"Heute Abend & morgen"},mr,gr=new Set,Do,Gc=t=>{Do??=t.connection.subscribeMessage(n=>{mr=n.summary,gr.forEach(e=>e())},{type:"ambiframe/summary/subscribe"}).catch(()=>{Do=void 0})},ha=class extends J{constructor(){super(...arguments);this.onUpdate=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),gr.add(this.onUpdate)}disconnectedCallback(){super.disconnectedCallback(),gr.delete(this.onUpdate)}shouldUpdate(){return!0}willUpdate(){this.hass&&Gc(this.hass)}render(){let e=this.options,i=mr,a=e.label===!1?m:u`<div class="label">${e.label??(i?d(jc[i.period]??"Heute"):d("\xDCberblick"))}</div>`,r=i?u`${i.headline?u`<div class="headline display">${i.headline}</div>`:m}
          <ul style=${e.size?`--size:${Number(e.size)}px`:""}>
            ${i.points.map((s,o)=>u`<li style="animation-delay:${.15+o*.12}s"><i></i><span>${s}</span></li>`)}
          </ul>
          <div class="meta">${X("info")}<span>${d("KI-Zusammenfassung")} · ${Y(new Date(i.generated_at))}</span></div>`:u`<div class="calm">${mr===void 0?d("Wird geladen \u2026"):d("Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.")}</div>`;return u`<div class="wrap ${e.style==="card"?"card":""}">${a}${r}</div>`}};ha.styles=[W,C`
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
    `];B("af-summary",ha);var Bn=class extends ne{constructor(){super(...arguments);this.events=[];this.onForecast=()=>this.requestUpdate()}get calendars(){let e=this.options.calendars??[];return e.length?e:Object.keys(this.hass?.states??{}).filter(i=>i.startsWith("calendar.")).slice(0,3)}get weather(){return this.options.weather??Object.keys(this.hass?.states??{}).find(e=>e.startsWith("weather."))}disconnectedCallback(){super.disconnectedCallback(),this.listening?.removeEventListener("change",this.onForecast),this.listening=void 0}shouldUpdate(e){return e.has("ctx")||e.has("options")||e.has("events")||super.shouldUpdate(e)}watched(){return[this.weather,...(this.options.bins??[]).map(e=>e.entity)]}willUpdate(){let e=this.ctx?.forecasts;e&&this.listening!==e&&(this.listening?.removeEventListener("change",this.onForecast),e.addEventListener("change",this.onForecast),this.listening=e),this.hass&&this.calendars.length&&Ni(this.hass,this.calendars,2).then(i=>{i!==this.events&&(this.events=i)})}renderEvents(){let e=Date.now(),i=this.events.filter(r=>{let s=te(r.start),o=te(r.end);return!s||!o?!1:it(r)?le(s)<=0&&o.getTime()>e:le(s)===0}),a=this.events.find(r=>{let s=te(r.start);return!!s&&le(s)===1});return u`<div class="col">
      <div class="ct">${X("calendar")}${d("Termine heute")}</div>
      ${i.length?i.slice(0,5).map(r=>{let s=!it(r)&&(te(r.end)?.getTime()??0)<e;return u`<div class="ev ${s?"past":""}">
              <span class="when num">${it(r)?d("ganztags"):Y(te(r.start))}</span><span class="what">${r.summary}</span>
            </div>`}):u`<div class="calm">${d("Heute keine Termine")}</div>`}
      ${a?u`<div class="note">${d("Morgen")}: ${it(a)?"":`${Y(te(a.start))} `}${a.summary}</div>`:m}
    </div>`}renderWeather(){let e=R(this.hass,this.weather);if(!e)return m;let i=this.ctx?.forecasts.get(this.weather,"daily")??[],a=this.ctx?.forecasts.get(this.weather,"hourly")??[],r=i.find(c=>le(new Date(c.datetime))===0)??i[0],s=r?.condition??e.state,o=a.find(c=>{let h=new Date(c.datetime);return le(h)===0&&h.getTime()>Date.now()-36e5&&(c.precipitation_probability??0)>=50}),l=r?.precipitation_probability;return u`<div class="col">
      <div class="ct">${X("sun")}${d("Wetter heute")}</div>
      <div class="wx">
        ${X(De(s))}
        <div>
          <div class="hi display num">${O(r?.temperature??e.attributes.temperature,0)}°</div>
          ${r?.templow!=null?u`<div class="lo num">${O(r.templow,0)}°</div>`:m}
        </div>
      </div>
      <div class="cond">${qe(s)}</div>
      <div class="note">
        ${o?d("Regen ab etwa {time} Uhr",{time:Y(new Date(o.datetime))}):l!=null&&l>=30?d("Regenrisiko {n} %",{n:O(l,0)}):d("Trocken")}
      </div>
    </div>`}renderWaste(){let e=rr(this.hass,{bins:this.options.bins,days:2});return u`<div class="col">
      <div class="ct">${X("bin")}${d("M\xFCll")}</div>
      ${e.length?e.flatMap(i=>i.bins.map(a=>u`<div class="bin ${i.days<=1?"soon":""}">
                <i style="background:${a.color??"var(--af-ink-3)"}"></i><span>${a.name}</span><span class="d">${sr(i.days)}</span>
              </div>`)):u`<div class="calm">${d("Keine Abholung")}</div>`}
      ${e.some(i=>i.days===1)?u`<div class="note">${d("Heute Abend rausstellen")}</div>`:m}
    </div>`}render(){let e=new Date,i=e.getHours(),a=i<11?d("Guten Morgen"):i<18?d("Guten Tag"):d("Guten Abend");return u`${this.options.label===!1?m:u`<div class="head display">${this.options.label??a}</div>
            <div class="sub">${e.toLocaleDateString(ee(),{weekday:"long",day:"numeric",month:"long"})}</div>`}
      <div class="cols">${this.renderEvents()} ${this.renderWeather()} ${this.renderWaste()}</div>`}};Bn.properties={...ne.properties,events:{state:!0}},Bn.styles=[W,C`
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
    `];B("af-today",Bn);var Uc=t=>{let n=Date.now()-18e5;return(t??[]).map(e=>({t:new Date(e.datetime),temp:Number(e.temperature),cond:e.condition,pp:e.precipitation_probability??0})).filter(e=>e.t.getTime()>n&&Number.isFinite(e.temp))},qc=t=>(t??[]).map(n=>({t:new Date(n.datetime),hi:Number(n.temperature),lo:Number(n.templow??n.temperature),cond:n.condition,pp:n.precipitation_probability??0})).filter(n=>le(n.t)>=0),pa=class extends J{constructor(){super(...arguments);this.size={w:0,h:0};this.onForecast=()=>this.requestUpdate()}watched(){return[this.options.entity]}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(()=>{let e=this.offsetWidth,i=this.offsetHeight;(e!==this.size.w||i!==this.size.h)&&(this.size={w:e,h:i},this.options.variant==="hourly"&&this.requestUpdate())}),this.resize.observe(this),this.listen()}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.listeningTo?.forecasts.removeEventListener("change",this.onForecast),this.listeningTo=void 0}updated(e){e.has("ctx")&&this.listen()}listen(){this.listeningTo!==this.ctx&&(this.listeningTo?.forecasts.removeEventListener("change",this.onForecast),this.ctx?.forecasts.addEventListener("change",this.onForecast),this.listeningTo=this.ctx)}shouldUpdate(e){return e.has("ctx")||e.has("options")||super.shouldUpdate(e)}hours(){return Uc(this.ctx?.forecasts.get(this.options.entity,"hourly"))}days(){return qc(this.ctx?.forecasts.get(this.options.entity,"daily"))}render(){let e=R(this.hass,this.options.entity);if(!e)return u`<div class="faint">${d("Wetter-Entit\xE4t fehlt")}</div>`;let i=e.attributes;switch(this.options.variant??"now"){case"line":return u`<div class="line">${X(De(e.state))}<span class="num">${O(i.temperature,0)}°</span><span>${qe(e.state)}</span></div>`;case"card":return this.renderCard(e.state,i);case"hourly":return this.renderHourly();case"rain":return this.renderRain();case"daily":return this.renderDaily();default:{let a=this.days().find(r=>le(r.t)===0);return u`<div class="now">
          ${X(De(e.state))}
          <div class="temp display num">${O(i.temperature,0)}°</div>
          <div class="cond">${qe(e.state)}</div>
          ${a?u`<div class="range num">${d("Heute {lo}\xB0 bis {hi}\xB0",{lo:O(a.lo,0),hi:O(a.hi,0)})}</div>`:m}
          <div class="meta num">
            ${d("Wind")} ${O(i.wind_speed,0)} ${i.wind_speed_unit??"km/h"} ${Qs(i.wind_bearing)}<br />
            ${d("Luftfeuchte")} ${O(i.humidity,0)} %${i.uv_index!=null?` \xB7 UV ${O(i.uv_index,0)}`:""}
          </div>
        </div>`}}}renderCard(e,i){let a=this.days().find(s=>le(s.t)===0),r=this.hours().filter((s,o)=>o%3===0).slice(0,4);return u`<div class="card">
      <div class="label">${this.options.name??i.friendly_name??""}</div>
      <div class="bigic">${X(De(e))}</div>
      <div class="big display num">${O(i.temperature,0)}°</div>
      <div class="cond">${qe(e)}</div>
      ${a?u`<div class="sub num">${d("Bis {hi}\xB0, nachts {lo}\xB0",{hi:O(a.hi,0),lo:O(a.lo,0)})}</div>`:m}
      ${r.length?u`<div class="mini">
            ${r.map(s=>u`<div><div class="h num">${d("{h} Uhr",{h:s.t.getHours()})}</div>${X(De(s.cond))}<div class="v num">${O(s.temp,0)}°</div></div>`)}
          </div>`:m}
    </div>`}renderHourly(){let e=this.hours().slice(0,Number(this.options.hours)||12),i=this.size.w||668,a=Math.max(140,Math.min(220,(this.size.h||254)-40)),r=u`<div class="label">${this.options.label??d("N\xE4chste Stunden")}</div>`;if(e.length<2)return r;let s=76,o=a-34,l=e.map($=>$.temp),c=Math.min(...l)-1,h=Math.max(...l)+1,p=$=>24+$*(i-48)/(e.length-1),g=$=>s+(o-s)*(1-($-c)/(h-c||1)),b=`M${p(0)},${g(l[0])}`;for(let $=0;$<e.length-1;$++){let I=(p($)+p($+1))/2;b+=` C${I},${g(l[$])} ${I},${g(l[$+1])} ${p($+1)},${g(l[$+1])}`}let f=`${b} L${p(e.length-1)},${o+10} L${p(0)},${o+10} Z`,v=e.length>8?2:1;return u`${r}
      <svg class="chart" width=${i} height=${a} viewBox="0 0 ${i} ${a}">
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--af-accent)" stop-opacity=".22" />
            <stop offset="1" stop-color="var(--af-accent)" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d=${f} fill="url(#wg)" />
        <path d=${b} fill="none" stroke="var(--af-accent)" stroke-width="2.4" stroke-linecap="round" />
        ${e.map(($,I)=>{if(I%v)return m;let T=p(I),F=g($.temp);return Ae`
            <g class="gi" transform="translate(${T-13},0) scale(1.08)" fill="none" stroke="currentColor" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round">${Rt(Sn[De($.cond)])}</g>
            ${$.pp>=30?Ae`<text class="tc" x=${T} y="46" text-anchor="middle">${O($.pp,0)} %</text>`:m}
            <text class="t1" x=${T} y=${F-14} text-anchor="middle">${O($.temp,0)}°</text>
            <circle cx=${T} cy=${F} r="3.5" fill="var(--af-bg)" stroke="var(--af-accent)" stroke-width="2" />
            <text class="t3" x=${T} y=${a-6} text-anchor="middle">${d("{h} Uhr",{h:$.t.getHours()})}</text>`})}
      </svg>`}renderRain(){let e=this.options,i=e.rain_sensor?this.hass?.states[e.rain_sensor]?.state==="on":!1,a=Number(e.threshold??40),r=this.hours().slice(0,Number(e.hours??12)),s=g=>g.pp>=a||["rainy","pouring","lightning-rainy","snowy-rainy"].includes(g.cond??""),o=r.find(s),l=i?r.find(g=>!s(g)):void 0,c=r[r.length-1],h,p="";return i?(h=d("Es regnet gerade"),p=l?d("Trocken ab etwa {h} Uhr",{h:l.t.getHours()}):d("Bleibt vorerst nass")):o?(h=d("Regen ab {h} Uhr",{h:o.t.getHours()}),p=d("{n} % Wahrscheinlichkeit",{n:O(o.pp,0)})):(h=d("Trocken"),p=c?d("Kein Regen bis {h} Uhr",{h:c.t.getHours()}):""),u`<div class="line" style="align-items:flex-start">
      <span style="font-size:30px;color:var(--af-accent)">${X(i||o?"rain":"sun")}</span>
      <div><div style="font-size: calc(24px * var(--af-fs, 1));color:var(--af-ink)">${h}</div><div style="font-size: calc(17px * var(--af-fs, 1));color:var(--af-ink-3);margin-top:6px">${p}</div></div>
    </div>`}renderDaily(){let e=this.days().filter(o=>le(o.t)>=1).slice(0,Number(this.options.days)||5),i=u`<div class="label">${this.options.label??d("N\xE4chste Tage")}</div>`;if(!e.length)return i;let a=Math.min(...e.map(o=>o.lo)),r=Math.max(...e.map(o=>o.hi)),s=o=>(o-a)/(r-a||1)*100;return u`${i}
      <div class="days">
        ${e.map(o=>u`<div class="day num">
            <span>${le(o.t)===1?d("Morgen"):An(o.t)}</span>
            ${X(De(o.cond))}
            <span class="pp">${o.pp>=20?`${O(o.pp,0)} %`:""}</span>
            <span class="lo">${O(o.lo,0)}°</span>
            <span class="bar"><i style="left:${s(o.lo)}%;right:${100-s(o.hi)}%"></i></span>
            <span>${O(o.hi,0)}°</span>
          </div>`)}
      </div>`}};pa.styles=[W,C`
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
    `];B("af-weather",pa);var Ke={clock:{tag:"af-clock",name:"Uhr",icon:"mdi:clock-outline",size:[6,2]},date:{tag:"af-date",name:"Datum",icon:"mdi:calendar-today",size:[6,1]},text:{tag:"af-text",name:"Text & Vorlage",icon:"mdi:format-text",size:[4,1]},chart:{tag:"af-chart",name:"Verlauf",icon:"mdi:chart-line",size:[6,3]},gauge:{tag:"af-gauge",name:"Anzeige (Ring)",icon:"mdi:gauge",size:[3,3]},image:{tag:"af-image",name:"Bild",icon:"mdi:image-outline",size:[4,4]},weather:{tag:"af-weather",name:"Wetter",icon:"mdi:weather-partly-cloudy",size:[4,6]},value:{tag:"af-value",name:"Wert",icon:"mdi:numeric",size:[3,2]},rooms:{tag:"af-rooms",name:"R\xE4ume",icon:"mdi:home-thermometer-outline",size:[8,6]},status:{tag:"af-status",name:"Status",icon:"mdi:list-status",size:[4,6]},calendar:{tag:"af-calendar",name:"Kalender",icon:"mdi:calendar",size:[4,6]},infoline:{tag:"af-infoline",name:"Infozeile",icon:"mdi:dots-horizontal",size:[8,1]},camera:{tag:"af-camera",name:"Kamera",icon:"mdi:cctv",size:[6,4]},price:{tag:"af-price",name:"Strompreis",icon:"mdi:currency-eur",size:[8,6]},power:{tag:"af-power",name:"Energie jetzt",icon:"mdi:solar-power",size:[6,4]},car:{tag:"af-car",name:"Auto",icon:"mdi:car-electric",size:[5,7]},persons:{tag:"af-persons",name:"Personen",icon:"mdi:account",size:[5,4]},vacuum:{tag:"af-vacuum",name:"Saugroboter",icon:"mdi:robot-vacuum",size:[6,4]},waste:{tag:"af-waste",name:"M\xFClltonnen",icon:"mdi:trash-can",size:[5,5]},activity:{tag:"af-activity",name:"Bewegung",icon:"mdi:motion-sensor",size:[7,1]},list:{tag:"af-list",name:"Werte-Liste",icon:"mdi:format-list-bulleted",size:[5,6]},warnings:{tag:"af-warnings",name:"Warnungen",icon:"mdi:alert",size:[6,3]},agenda:{tag:"af-agenda",name:"Termine",icon:"mdi:calendar",size:[6,6]},media:{tag:"af-media",name:"L\xE4uft gerade",icon:"mdi:music",size:[6,3]},appliances:{tag:"af-appliances",name:"Ger\xE4te",icon:"mdi:washing-machine",size:[6,4]},batteries:{tag:"af-batteries",name:"Akkus",icon:"mdi:battery-heart-variant",size:[6,7]},consumers:{tag:"af-consumers",name:"Gr\xF6\xDFte Verbraucher",icon:"mdi:podium",size:[6,3]},covers:{tag:"af-covers",name:"Rolll\xE4den",icon:"mdi:window-shutter",size:[5,7]},summary:{tag:"af-summary",name:"KI-Zusammenfassung",icon:"mdi:creation-outline",size:[7,7]},pet:{tag:"af-pet",name:"Haustier",icon:"mdi:cat",size:[12,8]},balance:{tag:"af-balance",name:"Tagesbilanz",icon:"mdi:chart-box-outline",size:[12,8]},qr:{tag:"af-qr",name:"WLAN-QR-Code",icon:"mdi:qrcode",size:[6,7]},job:{tag:"af-job",name:"Auftrag/Druck",icon:"mdi:printer-3d",size:[4,6]},news:{tag:"af-news",name:"Nachrichten",icon:"mdi:newspaper-variant-outline",size:[12,7]},daily:{tag:"af-daily",name:"Tagesinhalt (Wikipedia, Zitat)",icon:"mdi:book-open-page-variant-outline",size:[12,8]},today:{tag:"af-today",name:"Tagesvorschau",icon:"mdi:calendar-today-outline",size:[12,7]},timer:{tag:"af-timer",name:"Timer",icon:"mdi:timer-outline",size:[5,4]},board:{tag:"af-board",name:"Pinnwand",icon:"mdi:pin-outline",size:[5,4]},countdown:{tag:"af-countdown",name:"Countdown",icon:"mdi:calendar-clock",size:[4,4]},departures:{tag:"af-departures",name:"Abfahrten",icon:"mdi:train",size:[6,5]},radar:{tag:"af-radar",name:"Regenradar",icon:"mdi:radar",size:[6,6]},sky:{tag:"af-sky",name:"Sonne & Mond",icon:"mdi:weather-sunset",size:[8,2]},air:{tag:"af-air",name:"Pollen & Luft",icon:"mdi:flower-pollen",size:[4,5]},card:{tag:"af-card",name:"HA-Karte",icon:"mdi:card-outline",size:[4,4]}};var Mo=Symbol.for(""),Zc=t=>{if(t?.r===Mo)return t?._$litStatic$},Co=t=>({_$litStatic$:t,r:Mo});var No=new Map,fr=t=>(n,...e)=>{let i=e.length,a,r,s=[],o=[],l,c=0,h=!1;for(;c<i;){for(l=n[c];c<i&&(r=e[c],(a=Zc(r))!==void 0);)l+=a+n[++c],h=!0;c!==i&&o.push(r),s.push(l),c++}if(c===i&&s.push(n[i]),h){let p=s.join("$$lit$$");(n=No.get(p))===void 0&&(s.raw=s,No.set(p,n=s)),e=o}return t(n,...e)},Po=fr(u),ev=fr(Ae),tv=fr(Ds);var Io=t=>()=>{t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296},Bo=(t,n,e)=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${n} ${e}' numOctaves='3' seed='${t}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.2 0 0 0 -0.85'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`)}")`,Yc=Bo(7,.0035,.009),Qc=Bo(23,.005,.012),Fo=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,Hn=class extends oe{constructor(){super(...arguments);this.type="none";this.strength=1;this.speed="slow";this.small=!1;this.raf=0;this.particles=[];this.color="255,255,255";this.colorAt=0;this.last=0;this.onVisibility=()=>{cancelAnimationFrame(this.raf),!document.hidden&&this.type==="particles"&&!Fo()&&(this.raf=requestAnimationFrame(this.frame))};this.frame=e=>{if(this.raf=requestAnimationFrame(this.frame),e-this.last<33)return;let i=this.last?Math.min(3,(e-this.last)/33):1;this.last=e;let a=this.speed==="normal"?1.8:1,r=this.canvas;if(r){for(let s of this.particles)s.x+=(s.vx+Math.sin(e/4e3+s.ph)*.05)*i*a,s.y+=s.vy*i*a,s.y<-10&&(s.y=r.height+10),s.x<-10&&(s.x=r.width+10),s.x>r.width+10&&(s.x=-10);this.draw(e)}}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibility)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibility),cancelAnimationFrame(this.raf),this.resize?.disconnect()}updated(e){if(this.type!=="particles"){cancelAnimationFrame(this.raf);return}(e.has("type")||e.has("strength")||e.has("small"))&&this.setupParticles()}get canvas(){return this.renderRoot.querySelector("canvas")}setupParticles(){let e=this.canvas;if(!e)return;this.resize?.disconnect(),this.resize=new ResizeObserver(()=>this.sizeCanvas()),this.resize.observe(this),this.sizeCanvas();let i=Io(11),a=this.small?16:[30,48,72][this.strength-1],r=e.width,s=e.height,o=r/1280;this.particles=Array.from({length:a},()=>({x:i()*r,y:i()*s,r:(.6+i()*i()*2.2)*o*1.4,vx:(i()-.5)*.12*o,vy:-(.08+i()*.22)*o,a:.12+i()*.38,ph:i()*Math.PI*2,tw:.2+i()*.6})),cancelAnimationFrame(this.raf),Fo()?this.draw(0):this.raf=requestAnimationFrame(this.frame)}sizeCanvas(){let e=this.canvas;if(!e)return;let i=Math.min(1.5,window.devicePixelRatio||1),a=Math.round(this.offsetWidth*i),r=Math.round(this.offsetHeight*i);if(a&&r&&(e.width!==a||e.height!==r)){let s=e.width?a/e.width:1,o=e.height?r/e.height:1;e.width=a,e.height=r;for(let l of this.particles)l.x*=s,l.y*=o}}draw(e){let i=this.canvas,a=i?.getContext("2d");if(!i||!a)return;if(!e||e-this.colorAt>1e3){this.colorAt=e;let s=getComputedStyle(this).getPropertyValue("--af-ink").trim(),o=s.match(/^#([0-9a-f]{6})$/i);o?this.color=[0,2,4].map(l=>parseInt(o[1].slice(l,l+2),16)).join(","):s.startsWith("rgb")&&(this.color=s.replace(/rgba?\(|\)/g,"").split(",").slice(0,3).join(","))}a.clearRect(0,0,i.width,i.height);let r=[.8,1,1.2][this.strength-1];for(let s of this.particles){let o=s.a*r*(.6+.4*Math.sin(e/1e3*s.tw+s.ph));a.fillStyle=`rgba(${this.color},${Math.max(0,Math.min(1,o))})`,a.beginPath(),a.arc(s.x,s.y,s.r,0,Math.PI*2),a.fill()}}renderBokeh(){let e=Io(5),i=this.small?6:[8,12,16][this.strength-1],a=[.45,.6,.75][this.strength-1];return u`<div class="layer bokeh">
      ${Array.from({length:i},(r,s)=>{let o=60+e()*180,l=s%3===0?"var(--af-ink)":"var(--af-accent)",c=[`left:${e()*100-8}%`,`top:${e()*100-8}%`,`width:${o}px`,`--c:color-mix(in srgb, ${l} ${s%3===0?14:26}%, transparent)`,`--d:${22+e()*26}s`,`--delay:${-e()*40}s`,`--o:${a*(.5+e()*.5)}`,`--dx:${(e()-.5)*80}px`,`--dy:${(e()-.5)*60}px`].join(";");return u`<i style=${c}></i>`})}
    </div>`}render(){let e=this.speed==="normal"?.55:1,i=[.6,.85,1][this.strength-1],a=`--k:${e};opacity:${i}`;switch(this.type){case"particles":return u`<canvas></canvas>`;case"flow":return u`<div class="layer flow" style=${a}><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;case"bokeh":return u`<div class="layer" style="--k:${e}">${this.renderBokeh()}</div>`;case"mist":return u`<div class="layer mist" style="${a};--m1:${Yc};--m2:${Qc}"><div class="layer m1"></div><div class="layer m2"></div></div>`;default:return m}}};Hn.properties={type:{},strength:{type:Number},speed:{},small:{type:Boolean}},Hn.styles=C`
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
  `;B("af-ambient",Hn);var fe={landscape:{w:1280,h:800,padX:56,padY:48,gap:16,cols:12,rows:8},portrait:{w:800,h:1280,padX:40,padY:56,gap:16,cols:8,rows:12}},Ho=(t,n)=>{let e=fe[t];if(!n||!Number.isFinite(n))return e;let i=e.w/e.h,[a,r]=t==="landscape"?[1.25,2.2]:[.45,.8],s=Math.min(r,Math.max(a,n));return s>i?{...e,w:Math.round(e.h*s)}:{...e,h:Math.round(e.w/s)}},zt=.5,br=t=>Math.round(t/zt)*zt,en=(t,n)=>{let e=(t.w-2*t.padX-(t.cols-1)*t.gap)/t.cols,i=(t.h-2*t.padY-(t.rows-1)*t.gap)/t.rows;return{left:t.padX+n.x*(e+t.gap),top:t.padY+n.y*(i+t.gap),width:n.w*e+(n.w-1)*t.gap,height:n.h*i+(n.h-1)*t.gap}},Jc=t=>{let n=fe.portrait;if(!t.length)return{};let e=[...t].sort((v,$)=>v.y-$.y||v.x-$.x),i=[],a=-1;for(let v of e)i.length&&v.y<a?(i[i.length-1].push(v),a=Math.max(a,v.y+v.h)):(i.push([v]),a=v.y+v.h);let r=[];for(let v of i){let $=Math.min(...v.map(T=>T.y)),I=Math.max(...v.map(T=>T.y+T.h))-$;if(I<=2&&v.length>1){let T=0,F=[...v].sort((S,_)=>S.x-_.x).map(S=>{let _=Math.max(2,Math.round(S.w*n.cols/12)),k=Math.max(T,Math.min(n.cols-_,Math.round(S.x*n.cols/12)));return T=k+_,{widget:S,x:k,dy:S.y-$,w:_,h:S.h}});if(T<=n.cols){r.push({items:F,h:I,flex:!1});continue}}for(let T of[...v].sort((F,S)=>F.x-S.x||F.y-S.y))r.push({items:[{widget:T,x:0,dy:0,w:n.cols,h:T.h}],h:T.h,flex:T.h>1})}if(r.reduce((v,$)=>v+$.h,0)>n.rows){let v=r.filter(S=>!S.flex).reduce((S,_)=>S+_.h,0),$=r.filter(S=>S.flex),I=$.reduce((S,_)=>S+_.h,0),T=Math.max($.length,n.rows-v);for(let S of $)S.h=Math.max(1,Math.floor(S.h*T/I));let F=n.rows-r.reduce((S,_)=>S+_.h,0);for(let S of[...$].sort((_,k)=>k.h-_.h)){if(F<=0)break;S.h++,F--}for(let S of r)for(let _ of S.items)_.h=Math.min(_.h,S.h-_.dy)}let o=Math.min(...t.map(v=>v.y)),l=8-Math.max(...t.map(v=>v.y+v.h)),c=n.rows-r.reduce((v,$)=>v+$.h,0),h=r.filter(v=>v.flex);if(c>0&&o+l===0&&h.length){let v=h.reduce((I,T)=>I+T.h,0),$=c;for(let I of h){let T=Math.floor(c*I.h/v);I.h+=T,$-=T}for(let I of[...h].sort((T,F)=>F.h-T.h)){if($<=0)break;I.h++,$--}for(let I of h)for(let T of I.items)T.h=I.h}let p=r.reduce((v,$)=>v+$.h,0),g=Math.max(0,n.rows-p),b=o+l>0?Math.round(g*o/(o+l)):0,f={};for(let v of r){for(let $ of v.items){let I=b+$.dy;I<n.rows&&(f[$.widget.id]={x:$.x,y:I,w:$.w,h:Math.max(1,Math.min($.h,n.rows-I))})}b+=v.h}return f},Lt=(t,n)=>{if(n==="landscape")return Object.fromEntries(t.map(i=>[i.id,{x:i.x,y:i.y,w:i.w,h:i.h}]));let e=t.some(i=>!i.portrait)?Jc(t):{};return Object.fromEntries(t.map(i=>[i.id,i.portrait??e[i.id]]).filter(i=>!!i[1]))};var Oo={start:"flex-start",center:"center",end:"flex-end"},Xc={start:"left",center:"center",end:"right"},Wo=new Map,On=class extends oe{constructor(){super(...arguments);this.photo=null;this.grid=fe.landscape;this.orientation="landscape";this.refresh=()=>this.requestUpdate();this.held=!1}act(e,i){let a=e[i];a&&this.dispatchEvent(new CustomEvent("af-action",{detail:{action:a,widget:e},bubbles:!0,composed:!0}))}onDown(e){this.held=!1,clearTimeout(this.holdTimer),e.hold_action&&(this.holdTimer=window.setTimeout(()=>{this.held=!0,this.act(e,"hold_action")},600))}onClick(e,i){clearTimeout(this.holdTimer),this.held?(this.held=!1,e.stopPropagation()):i.tap_action&&(e.stopPropagation(),this.act(i,"tap_action"))}connectedCallback(){super.connectedCallback(),bi.addEventListener("change",this.refresh),this.tick=window.setInterval(()=>{this.page?.widgets?.some(e=>e.show_if?.length)&&this.requestUpdate()},3e4)}disconnectedCallback(){super.disconnectedCallback(),bi.removeEventListener("change",this.refresh),clearInterval(this.tick)}renderWidget(e,i){let a=Ke[e.type],r=en(this.grid,i),s=e.options??{},o=He(s.typeface),l=e.look??{},c=(f,v)=>`color-mix(in srgb, ${f} ${v}%, transparent)`,h=[`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`,o?`--af-display:${o};--af-sans:${o}`:"",`--af-align:${Oo[s.align]??"flex-start"}`,`--af-valign:${Oo[s.valign]??"flex-start"}`,`--af-text-align:${Xc[s.align]??"left"}`,l.accent?`--af-accent:${l.accent};--af-accent-soft:${c(l.accent,14)}`:"",l.ink?`--af-ink:${l.ink};--af-ink-2:${c(l.ink,66)};--af-ink-3:${c(l.ink,40)};color:${l.ink}`:"",l.opacity!=null?`opacity:${Math.max(0,Math.min(100,Number(l.opacity)))/100}`:"",l.padding!=null?`padding:${Number(l.padding)}px`:""].filter(Boolean).join(";");if(!a)return u`<div class="cell" style=${h}><div class="unknown">Unbekanntes Widget „${e.type}“</div></div>`;let p=Co(a.tag),g=["cell",e.tap_action||e.hold_action?"act":"",l.card?"boxed":""].filter(Boolean).join(" "),b=l.size&&Number(l.size)!==100?`zoom:${Number(l.size)/100}`:"";return u`<div
      class=${g}
      style=${h}
      data-widget=${e.id}
      @pointerdown=${()=>this.onDown(e)}
      @pointerup=${()=>clearTimeout(this.holdTimer)}
      @pointerleave=${()=>clearTimeout(this.holdTimer)}
      @click=${f=>this.onClick(f,e)}
    >
      ${Po`<${p} style=${b} .hass=${this.hass} .options=${s} .ctx=${this.ctx}></${p}>`}
    </div>`}updated(){yi(this.renderRoot,this.page?.css)}cameraSource(e){let i=e.background??{type:"none"},a=(i.sources??[]).filter(s=>s?.url);if(!a.length)return{entity:i.entity,url:i.url,refresh:i.refresh,name:i.name};if(this.camPick?.page!==e.id){let s=((Wo.get(e.id)??-1)+1)%a.length;Wo.set(e.id,s),this.camPick={page:e.id,index:s}}let r=a[this.camPick.index%a.length];return{url:r.url,refresh:r.refresh??i.refresh,name:r.name}}render(){let e=this.page;if(!e)return m;let i=e.background??{type:"none"},a={display:this.ctx?.displayId,orientation:this.orientation},r=(e.widgets??[]).filter(f=>nt(this.hass,f.show_if,a)),s=Lt(e.widgets??[],this.orientation),o=e.palette==="night",l=this.ctx?.ambient,c=o?"none":i.ambient??l?.type??"none",h=i.type==="color"&&i.color,p=i.type==="photo"||i.type==="camera",g=this.cameraSource(e),b=[o?"night":"",p?"onphoto":"",o||h||p||c==="flow"?"flat":""].join(" ");return u`<div class="root ${b}" style=${h?`background-color:${i.color}`:""}>
      ${i.type==="photo"&&this.photo?u`<div class="photo" style="background-image:url('${this.photo.url}')"></div>
            ${i.shade==="none"?m:u`<div class="shade ${i.shade??""}"></div>`}
            ${this.photo.credit?u`<div class="credit">${this.photo.credit}</div>`:m}`:m}
      ${i.type==="camera"&&(g.entity||g.url)?u`<af-camera-view
              class="bgcam"
              .hass=${this.hass}
              .entity=${g.url?void 0:g.entity}
              .url=${g.url}
              .mode=${g.refresh===0?"live":"snapshot"}
              .refresh=${g.refresh??20}
              .osd=${"KAMERA"}
            ></af-camera-view>
            ${i.shade==="none"?m:u`<div class="shade cam ${i.shade??""}"></div>`}
            ${g.name?u`<div class="credit">${g.name}</div>`:m}`:m}
      ${c!=="none"?u`<af-ambient .type=${c} .strength=${l?.strength??1} .speed=${l?.speed??"slow"} .small=${!!this.ctx?.preview}></af-ambient>`:m}
      ${qt(r.filter(f=>s[f.id]),f=>f.id,f=>this.renderWidget(f,s[f.id]))}
    </div>`}};On.properties={hass:{attribute:!1},page:{attribute:!1},ctx:{attribute:!1},photo:{attribute:!1},grid:{attribute:!1},orientation:{attribute:!1}},On.styles=[Ks,Rs,C`
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
      /* Abdunkeln pro Seite einstellbar: leicht = halb so stark, kräftig = über die ganze Fläche */
      .shade.light {
        opacity: 0.5;
      }
      .shade.strong::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.25);
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
    `];B("af-page",On);var eu=new Set(["unavailable","unknown"]),Ro=(t,n,e)=>{if(!n||!e||n.state===e.state||t.from&&n.state!==t.from)return!1;if(t.to!=="*")return e.state===t.to;if(eu.has(e.state)||n.state==="unavailable")return!1;if(e.entity_id.startsWith("event.")){let i=Date.parse(e.state);if(!Number.isFinite(i)||Date.now()-i>12e4||t.event_types?.length&&!t.event_types.includes(String(e.attributes.event_type)))return!1}return!0};var Wn=[["klangschale","Klangschale (tief, schwebend)"],["marimba","Marimba (zwei Holzt\xF6ne)"],["glas","Glas (klares Ding-Dong)"],["kalimba","Kalimba (drei gezupfte T\xF6ne)"],["windspiel","Windspiel (zart)"],["hinweis","Hinweis (sehr leise, kurz)"],["gong","Gong (warm, tief)"],["dingdong","Ding-Dong"],["glocke","Glocke (kurz, hell)"],["alarm","Alarm (eindringlich, wiederholt)"]],tu=new Set(Wn.map(([t])=>t)),nu=t=>tu.has(t)?new URL(`./sounds/${t}.wav`,import.meta.url).href:new URL(t,location.href).href,Ko=new Map,iu=async(t,n={})=>{let i=n.library?.find(o=>o.id===t)?.url??t;if(!i.startsWith("media-source://"))return nu(i);let a=Ko.get(i);if(a&&a.until>Date.now())return a.url;if(!n.hass)throw new Error("media-source ohne Home Assistant");let r=await n.hass.callWS({type:"media_source/resolve_media",media_content_id:i,expires:3600}),s=new URL(r.url,location.href).href;return Ko.set(i,{url:s,until:Date.now()+50*6e4}),s},au=3,tn,nn=async(t,n=70,e={})=>{let i;try{i=await iu(t,e)}catch(r){console.warn("Ambiframe: Ton nicht abspielbar:",t,r);return}let a=window.fully;if(a?.playSound){try{a.setAudioVolume?.(Math.max(0,Math.min(100,Math.round(n))),au)}catch{}a.playSound(i,!1);return}tn?.pause(),tn=new Audio(i),tn.volume=Math.max(0,Math.min(1,n/100)),tn.play().catch(()=>{})},Vo=()=>{window.fully?.stopSound?.(),tn?.pause(),tn=void 0};var jo=["pointerdown","touchstart","wheel","keydown"],ma,vr=()=>location.pathname+location.search,Go=t=>{history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};function Uo(t,n){ma?.stop();let e=vr(),i=n,a=document.createElement("button");a.type="button",a.setAttribute("style",["position:fixed","left:50%","bottom:calc(16px + env(safe-area-inset-bottom, 0px))","transform:translateX(-50%)","z-index:2147483647","border:0","border-radius:999px","padding:10px 18px","font:500 15px/1.2 system-ui,-apple-system,sans-serif","color:#fff","background:rgba(20,20,20,.78)","-webkit-backdrop-filter:blur(12px)","backdrop-filter:blur(12px)","box-shadow:0 6px 24px rgba(0,0,0,.25)","cursor:pointer"].join(";"));let r=()=>{a.textContent=`\u2190 ${d("Zur\xFCck zu Ambiframe")} \xB7 ${i} s`},s=()=>{i=n,r()},o=()=>{clearInterval(h);for(let p of jo)window.removeEventListener(p,s,!0);window.removeEventListener("location-changed",c),window.removeEventListener("popstate",c),a.remove(),ma?.stop===o&&(ma=void 0)},l=()=>{o(),vr()!==e&&Go(e)},c=()=>{vr()===e&&o()},h=window.setInterval(()=>{i-=1,i<=0?l():r()},1e3);a.addEventListener("click",p=>{p.stopPropagation(),l()});for(let p of jo)window.addEventListener(p,s,{capture:!0,passive:!0});window.addEventListener("location-changed",c),window.addEventListener("popstate",c),ma={stop:o},r(),document.body.appendChild(a),Go(t)}var qo={type:"fade",duration:2.4},_t=t=>[...new Set([t.entity,...t.entities??[]].filter(n=>!!n))],at=t=>{let n=t?.state==="playing"?t.attributes.media_title:void 0;return n?`${n}|${t.attributes.media_artist??""}`:""},ru=t=>({entity_id:t,state:"playing",attributes:{friendly_name:"K\xFCche",media_title:"Harvest Moon",media_artist:"Neil Young",media_album_name:"Harvest Moon",media_duration:303,media_position:74,media_position_updated_at:new Date().toISOString()},last_changed:new Date().toISOString(),last_updated:new Date().toISOString()}),Zo=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`,su={id:"__nacht",name:"Nacht",duration:60,background:{type:"none"},palette:"night",widgets:[{id:"uhr",type:"clock",x:3,y:3,w:6,h:2,options:{align:"center",valign:"end"}},{id:"datum",type:"date",x:3,y:5,w:6,h:1,options:{align:"center"}}]},Yo=t=>{try{return localStorage.getItem(t)}catch{return null}},ga=(t,n)=>{try{localStorage.setItem(t,n)}catch{}},ou=30,ye=t=>X(t?Kt[t]??t:void 0),yr=()=>window.fully,lu=()=>{try{yr()?.turnScreenOn?.()}catch{}},Rn=class extends oe{constructor(){super(...arguments);this.streamMode=!1;this.shift=[0,0];this.shiftStep=0;this.effFor="";this.preview=!1;this.fixedPage=null;this.speed=1;this.theme="ruhig";this.mode="dark";this.orient="landscape";this.grid=fe.landscape;this.evening=!1;this.dimming=!1;this.paused=!1;this.ringFor="";this.layers=[];this.chips=[];this.chipsOpen=!1;this.history=[];this.historyLoaded="";this.historyOpen=!1;this.miniKey="";this.miniSince=0;this.miniShown=!1;this.controlOpen=!1;this.menu=!1;this.swallowTap=!1;this.muteUntil=Number(Yo("ambiframe-mute-until")??0);this.controlLeft=0;this.scale=1;this.night=!1;this.started=!1;this.idx=-1;this.seq=0;this.layerSeq=0;this.lastMediaKey="";this.lastMediaAt=0;this.mediaShown=new Map;this.lastFired=new Map;this.forecasts=new _i;this.photos=new Di(()=>this.hass,()=>this.config?.photos);this.onAction=async e=>{let{action:i}=e.detail,a=this.hass,r=s=>s?a?.states[s]?.attributes.friendly_name??s:"";if(this.preview){this.showToast(`${d("Vorschau")}: ${i.action}${i.entity?` \xB7 ${r(i.entity)}`:i.page?` \xB7 ${i.page}`:""}`);return}if(!(i.confirm&&!await this.confirmFirst(typeof i.confirm=="string"?i.confirm:d("{name} \u2013 wirklich?",{name:r(i.entity)||d("Aktion")}))))try{switch(i.action){case"toggle":if(!i.entity||!a)return;await a.callService("homeassistant","toggle",{entity_id:i.entity}),this.showToast(`${r(i.entity)} umgeschaltet`);break;case"perform":{let[s,o]=(i.perform??"").split(".");if(!s||!o||!a)return;await a.callService(s,o,{...i.data??{},...i.entity?{entity_id:i.entity}:{}}),this.showToast(i.title??(r(i.entity)||d("Erledigt")));break}case"more_info":i.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i.entity},bubbles:!0,composed:!0}));break;case"page":i.page&&this.showPage(i.page);break;case"popup":clearTimeout(this.popupTimer),this.popup={action:i,seq:++this.seq},this.popupTimer=window.setTimeout(()=>this.closePopup(),(i.timeout??30)*1e3);break;case"pause":if(!a||!this.display)return;await a.callWS({type:"ambiframe/display/pause",display_id:this.display.id,paused:!this.paused}),this.showToast(this.paused?d("Weiter geht's"):d("Angehalten"));break;case"dashboard":this.openControl();break}}catch(s){this.showToast(d("Fehlgeschlagen: {error}",{error:String(s?.message??s)}),!0)}};this.touchControl=()=>{this.controlOpen&&(this.controlLeft=this.display?.control.idle??60,clearInterval(this.controlTimer),this.controlTimer=window.setInterval(()=>{this.controlLeft-=1,this.controlLeft<=0&&this.closeControl()},1e3))};this.onPress=e=>{clearTimeout(this.pressTimer),!(!this.touchable||this.menu||this.alarm||this.controlOpen||this.popup||this.ask||e.composedPath().some(a=>a.classList&&["act","nav","mmini","mcard","pip","chip","ov"].some(r=>a.classList.contains(r))))&&(this.pressAt={x:e.clientX,y:e.clientY},this.pressTimer=window.setTimeout(()=>{this.swallowTap=!0,this.openMenu()},700))};this.onPressMove=e=>{this.pressAt&&Math.hypot(e.clientX-this.pressAt.x,e.clientY-this.pressAt.y)>12&&clearTimeout(this.pressTimer)};this.onPressEnd=()=>{clearTimeout(this.pressTimer),this.pressAt=void 0}}get config(){return this.effConfig}set config(e){if(e===this.rawConfig)return;let i=this.effConfig;this.rawConfig=e,this.effConfig=zn(e,this.displayId),this.effFor=`${this.displayId}`,this.requestUpdate("config",i)}get display(){return this.config?.displays.find(e=>e.id===this.displayId)??this.config?.displays[0]}pageById(e){return this.config?.pages.find(i=>i.id===e)}connectedCallback(){super.connectedCallback(),/Home ?Assistant\//.test(navigator.userAgent)&&this.setAttribute("app",""),this.resize=new ResizeObserver(()=>this.measure()),this.resize.observe(this),this.mediaPoll=window.setInterval(()=>this.mediaTick(),15e3),this.miniTicker=window.setInterval(()=>{(this.nowPlaying()||this.miniShown)&&this.requestUpdate(),this.pruneChips()},5e3),this.started&&this.restart()}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect();for(let e of[this.menuTimer,this.pressTimer,this.rotationTimer,this.alarmTimer,this.pipTimer,this.noticeTimer,this.takeoverTimer,this.mediaTimer,this.mediaQueue,this.popupTimer,this.toastTimer])clearTimeout(e);for(let e of[this.shiftTimer,this.controlTimer,this.mediaTicker,this.mediaPoll,this.miniTicker,this.ringTimer])clearInterval(e)}measure(){let e=this.offsetWidth,i=this.offsetHeight;if(!e||!i)return;let a=e/i,r=this.forceOrientation??this.display?.orientation,s=r==="portrait"||r==="landscape"?r:a<1?"portrait":"landscape",o=Ho(s,a),l=Math.min(e/o.w,i/o.h);s!==this.orient&&(this.orient=s),(o.w!==this.grid.w||o.h!==this.grid.h)&&(this.grid=o),l>0&&Math.abs(l-this.scale)>5e-4&&(this.scale=l)}willUpdate(e){if(e.has("displayId")&&this.effFor!==`${this.displayId}`&&(e.has("config")||e.set("config",this.effConfig),this.effConfig=zn(this.rawConfig,this.displayId),this.effFor=`${this.displayId}`),Ot(Ht(this.config?.design.language,this.hass?.language)),(e.has("config")||e.has("forceOrientation")||e.has("displayId"))&&this.measure(),e.has("hass")){this.forecasts.setHass(this.hass);let l=e.get("hass");l&&this.hass&&this.started&&this.processChanges(l,this.hass)}let i=this.display,a=this.config?.design,r=Os(i?.theme??a?.theme);if(this.theme=r.theme,e.has("config")||e.has("preview")||e.has("displayId")||e.has("streamMode")){let l=a?.ambient,c={type:l?.type??ht.find(p=>p.id===r.theme)?.ambient??"none",strength:l?.strength??1,speed:l?.speed??"slow"},h=!this.streamMode&&(i?.ticker??i?.profile!=="tv");this.ctx=this.config?{forecasts:this.forecasts,config:this.config,preview:this.preview,ambient:c,displayId:i?.id,ticker:h}:void 0,e.has("config")&&this.photos.reload()}this.applyMode(r.light),this.updateShift();let s=i?.night?.entity,o=!!s&&this.hass?.states[s]?.state==="on";if(!this.started&&this.hass&&this.config&&i)this.started=!0,this.night=o,this.restart();else if(this.started&&this.fixedPage&&e.has("config")&&!e.has("fixedPage")&&o===this.night){let l=this.pageById(this.fixedPage);l&&(this.layers=this.layers.map(c=>c.leaving?c:{...c,page:l}))}else this.started&&(o!==this.night||e.has("config")||e.has("fixedPage")||e.has("displayId"))&&(this.night=o,this.restart())}applyMode(e){let i=this.config?.design,a=this.hass?.states["sun.sun"]?.state==="below_horizon",r=this.display?.mode??i?.mode??(e?"light":"auto"),s=this.modeOverride??(r==="auto"?a?"dark":"light":r),o=i?.evening!=="off"&&a&&s==="dark";if(s===this.mode){this.modeTimer||(this.evening=o);return}if(!this.started||this.preview){clearTimeout(this.modeTimer),this.modeTimer=void 0,this.dimming=!1,this.mode=s,this.evening=o;return}this.modeTimer||(this.dimming=!0,this.modeTimer=window.setTimeout(()=>{this.modeTimer=void 0,this.dimming=!1,this.requestUpdate(),this.mode=s,this.evening=o},1600))}updated(){let e=this.config?.design,i=(c,h)=>h?this.style.setProperty(c,h):this.style.removeProperty(c),a=e?.colors?.[this.mode]??{},r=(c,h)=>c?`color-mix(in srgb, ${c} ${h}%, transparent)`:void 0,s=this.display?.text_size??e?.text_size??"normal";i("--af-fs",s==="large"?"1.15":s==="xlarge"?"1.3":void 0);let o=(this.display?.contrast??e?.contrast)==="high";i("--af-c2",o?"0.9":void 0),i("--af-c3",o?"0.72":void 0);let l=a.ink??(o?"var(--af-ink)":void 0);i("--af-accent",a.accent??e?.accent),i("--af-accent-soft",r(a.accent??e?.accent,14)),i("--af-bg",a.bg),i("--af-bg-art",a.bg?"none":void 0),i("--af-ink",a.ink),i("--af-ink-2",r(l,o?86:66)),i("--af-ink-3",r(l,o?66:40)),i("--af-line",r(l,o?20:12)),i("--af-surface",r(a.ink,5)),i("--af-card",a.card?r(a.card,Number(a.card_opacity??100)):void 0),i("--af-good",a.good),i("--af-alert",a.alert),i("--af-cold",a.cold),i("--af-card-radius",e?.radius!=null?`${e.radius}px`:void 0),i("--af-display",He(e?.fonts?.display)),i("--af-sans",He(e?.fonts?.text)),yi(this.renderRoot,e?.css)}transitionFor(e){let i={...qo,...this.config?.design.transition,...this.display?.transition,...e.transition},a=Math.max(.2,Math.min(10,Number(i.duration)||qo.duration));return{type:i.type??"fade",duration:this.preview?Math.min(.5,a):a}}restart(){clearTimeout(this.takeoverTimer),this.takeover=void 0,this.idx=-1,this.next()}next(){this.step(1)}prev(){this.step(-1)}browse(e){this.step(e,ou)}step(e,i){clearTimeout(this.rotationTimer);let a=this.display;if(!a||this.takeover)return;if(this.fixedPage){let o=this.pageById(this.fixedPage);o&&this.show(o);return}if(this.night){this.show(this.pageById(a.night?.page)??su);return}let r=a.playlist,s={display:a.id,orientation:this.orient};for(let o=0;o<r.length;o++){this.idx=(((this.idx<0&&e<0?0:this.idx)+e)%r.length+r.length)%r.length;let l=r[this.idx],c=this.pageById(l.page);if(c&&nt(this.hass,l.show_if,s)&&nt(this.hass,c.show_if,s)){this.show(c),this.paused?this.pausedPage=c.id:this.rotationTimer=window.setTimeout(()=>this.next(),(i??l.duration??c.duration??30)*1e3*this.speed);return}}this.rotationTimer=window.setTimeout(()=>this.next(),6e4)}get currentPageId(){return this.layers.filter(e=>!e.leaving).at(-1)?.page.id}get busy(){return!!(this.alarm||this.pip||this.notice||this.takeover||this.media||this.controlOpen||this.popup||this.ask)}showPage(e){let i=this.pageById(e);if(!i)return;clearTimeout(this.rotationTimer),clearTimeout(this.takeoverTimer),this.takeover=void 0;let a=this.display?.playlist??[],r=a.findIndex(s=>s.page===e);r>=0&&(this.idx=r),this.show(i),this.paused?this.pausedPage=e:this.rotationTimer=window.setTimeout(()=>this.next(),((r>=0?a[r].duration:void 0)??i.duration??30)*1e3*this.speed)}setPaused(e){if(e===this.paused)return;if(this.paused=e,this.requestUpdate(),clearTimeout(this.rotationTimer),e){this.pausedPage=this.currentPageId;return}if(this.pausedPage=void 0,this.takeover||this.night||this.fixedPage)return;let i=this.pageById(this.currentPageId);this.rotationTimer=window.setTimeout(()=>this.next(),(i?.duration??30)*1e3*this.speed)}async show(e){let i=++this.layerSeq,a=null;if(e.background?.type==="photo"&&(a=await this.photos.next(),a&&!await Mi(a.url)&&(this.photos.reload(),a=await this.photos.next(),a&&!await Mi(a.url)&&(a=null))),i!==this.layerSeq)return;let r=this.transitionFor(e);this.layers=[...this.layers.filter(s=>!s.leaving).map(s=>({...s,leaving:!0,trans:r})),{key:i,page:e,photo:a,leaving:!1,trans:r}],window.setTimeout(()=>{this.layers=this.layers.filter(s=>!s.leaving||s.key>i)},r.duration*1e3+150),this.dispatchEvent(new CustomEvent("af-page",{detail:e.id,bubbles:!0,composed:!0}))}eventsForDisplay(){let e=this.display;return!e||!this.config?[]:this.config.events.filter(i=>i.enabled!==!1&&(e.events==="all"||e.events.includes(i.id))&&(!i.displays||i.displays.includes(e.id)))}processChanges(e,i){if(this.fixedPage)return;for(let r of this.eventsForDisplay())for(let s of _t(r)){let o=e.states[s],l=i.states[s];if(r.kind==="media"){let c=at(l);c&&c!==at(o)&&this.fire(r,o,l);continue}if(!(!o||!l||o.state===l.state)){if(Ro(r,o,l)){this.fire(r,o,l);continue}r.to!=="*"&&(r.kind==="info"&&r.from&&l.state===r.from&&r.reminder_clear!==!1&&this.removeChip(r.id),this.alarm?.ev.id===r.id&&l.state!==r.to&&this.holdAlarm(),this.takeover?.ev.id===r.id&&l.state!==r.to&&this.checkTakeover())}}let a=this.pip?.ev.text;if(this.pip&&a&&i.states[a]!==e.states[a]){let r=this.eventText(this.pip.ev,i);r&&(this.pip={...this.pip,text:r})}}fire(e,i,a){if(e.only_home&&!Object.values(this.hass?.states??{}).some(o=>o.entity_id.startsWith("person.")&&o.state==="home")||!nt(this.hass,e.show_if,{display:this.display?.id,orientation:this.orient}))return;let r=this.inQuiet(e);if(r&&e.quiet_action==="skip")return;let s=e.at_night??e.kind==="alarm";if(this.night&&!s){e.kind==="info"&&(this.addChip(e,new Date),this.remember(e));return}if(e.kind!=="media"&&this.remember(e),e.sound&&e.kind!=="media"&&!r&&!this.displayMuted()&&this.ring(e),e.kind==="media"){a&&e.style!=="mini"&&this.queueMedia(e,a.entity_id);return}if(e.kind==="alarm")this.openAlarm(e);else if(e.kind==="live"){let o=this.pip?.ev.id===e.id,l=this.lastFired.get(e.id)??0;if(!o&&e.cooldown&&Date.now()-l<e.cooldown*1e3)return;this.lastFired.set(e.id,Date.now()),this.openPip(e)}else if(e.kind==="page"){if(!this.openTakeover(e))return}else{let o=a?new Date(a.last_changed):new Date,l=i&&a?o.getTime()-new Date(i.last_changed).getTime():void 0,c=e.cost?parseFloat(this.hass?.states[e.cost]?.state??""):NaN;this.openNotice(e,o,l,Number.isFinite(c)&&c>0?c:null)}lu()}eventText(e,i=this.hass){if(!e.text)return"";let a=i?.states[e.text],r=e.text_attribute?a?.attributes[e.text_attribute]:a?.state;return r==null||r==="unknown"||r==="unavailable"?"":String(r)}inQuiet(e){return!!(e.quiet?.after||e.quiet?.before)&&tt(this.hass,{condition:"time",after:e.quiet.after,before:e.quiet.before})}displayMuted(){if(Date.now()<this.muteUntil)return!0;let e=this.display?.sound;return e?e.mute?!0:!!(e.quiet?.after||e.quiet?.before)&&tt(this.hass,{condition:"time",after:e.quiet.after,before:e.quiet.before}):!1}volumeFor(e){return(e.volume??70)*(this.display?.sound?.volume??100)/100}showing(e){return[this.alarm?.ev,this.pip?.ev,this.notice?.ev,this.takeover?.ev].some(i=>i?.id===e.id)}ring(e){clearInterval(this.ringTimer),this.ringFor=e.id;let i=()=>{nn(e.sound,this.volumeFor(e),{hass:this.hass,library:this.config?.sounds})};i();let a=e.sound_repeat??(e.sound==="alarm"&&e.kind==="alarm"?"loop":"once");if(a==="once")return;let r=a==="loop"?1/0:Number(a)-1,s=Date.now()+12e4;this.ringTimer=window.setInterval(()=>{if(r<=0||Date.now()>s||a==="loop"&&!this.showing(e)){clearInterval(this.ringTimer);return}r-=1,i()},(e.sound_interval??4)*1e3)}testEvent(e){let i=this.config?.events.find(a=>a.id===e);if(i)if(i.sound&&i.kind!=="media"&&this.ring(i),i.kind==="info")this.openNotice(i,new Date,102*6e4,.63);else if(i.kind==="live")this.openPip(i);else if(i.kind==="page")this.openTakeover(i,!0);else if(i.kind==="media"){let a=_t(i).find(r=>at(this.hass?.states[r]));this.openMedia(i,a??_t(i)[0]??"media_player.demo",{force:!0,demo:!a})}else this.openAlarm(i)}secs(e){return Math.max(3,e*this.speed)}openAlarm(e){this.closePip(),this.closeMedia();let i=this.secs(e.max??120);this.alarm={ev:e,at:new Date,secs:i,seq:++this.seq},clearTimeout(this.alarmTimer),this.alarmTimer=window.setTimeout(()=>this.closeAlarm(),i*1e3)}holdAlarm(){if(!this.alarm)return;let e=this.secs(this.alarm.ev.hold_after??30);this.alarm={...this.alarm,secs:e,seq:++this.seq},clearTimeout(this.alarmTimer),this.alarmTimer=window.setTimeout(()=>this.closeAlarm(),e*1e3)}closeAlarm(){clearTimeout(this.alarmTimer),this.alarm&&this.ringFor===this.alarm.ev.id&&(this.alarm.ev.sound_repeat??(this.alarm.ev.sound==="alarm"?"loop":"once"))!=="once"&&(clearInterval(this.ringTimer),Vo()),this.alarm=void 0}openPip(e){if(this.alarm)return;this.media?.style==="card"&&this.closeMedia();let i=this.secs(e.duration??30),a=this.pip?.ev.id===e.id?this.pip.text:e.text_attribute&&this.eventText(e)||d("Bewegung erkannt");this.pip={ev:e,at:new Date,secs:i,seq:++this.seq,text:a},clearTimeout(this.pipTimer),this.pipTimer=window.setTimeout(()=>this.closePip(),i*1e3)}closePip(){clearTimeout(this.pipTimer),this.pip=void 0}openNotice(e,i,a,r){let s=this.secs(e.duration??60);this.notice={ev:e,at:i,secs:s,seq:++this.seq,duration:a,cost:r},clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{this.addChip(e,i),this.closeNotice()},s*1e3)}closeNotice(){clearTimeout(this.noticeTimer),this.notice=void 0}openTakeover(e,i=!1){let a=this.pageById(e.page);if(!a)return!1;let r=Date.now(),s=this.takeover?.ev.id===e.id;return!s&&!i&&e.cooldown&&r-(this.lastFired.get(e.id)??0)<e.cooldown*1e3*this.speed?!1:(clearTimeout(this.rotationTimer),this.takeover={ev:e,firstAt:s?this.takeover.firstAt:r,lastAt:r,test:i},this.layers.find(o=>!o.leaving)?.page.id!==a.id&&this.show(a),this.checkTakeover(),!0)}checkTakeover(){let e=this.takeover;if(clearTimeout(this.takeoverTimer),!e)return;let{ev:i}=e,a=Date.now(),r=c=>c*1e3*this.speed,s=e.firstAt+r(i.max??600),o=e.test?[]:_t(i).map(c=>this.hass?.states[c]).filter(c=>!!c),l;if(o.some(c=>c.state===i.to))l=s;else{let c=Math.max(e.lastAt,...o.map(h=>new Date(h.last_changed).getTime()));l=Math.min(s,Math.max(e.lastAt+r(i.duration??60),c+r(i.hold_after??0)))}l-a<50?this.closeTakeover():this.takeoverTimer=window.setTimeout(()=>this.checkTakeover(),l-a)}closeTakeover(){let e=this.takeover;if(!e)return;clearTimeout(this.takeoverTimer),this.lastFired.set(e.ev.id,Date.now()),this.takeover=void 0;let i=this.paused?this.pageById(this.pausedPage):void 0;i?this.show(i):this.next()}queueMedia(e,i){clearTimeout(this.mediaQueue),this.mediaQueue=window.setTimeout(()=>{this.openMedia(e,i)},1500)}async openMedia(e,i,a={}){if(!a.force&&(this.alarm||this.notice||this.controlOpen))return;let r=e.style==="fullscreen"?"fullscreen":"card";if(r==="card"&&this.pip&&!a.force)return;let s=a.demo?ru(i):void 0,o=at(this.hass?.states[i]);!s&&o&&(i=_t(e).find(g=>at(this.hass?.states[g])===o)??i);let l=s??this.hass?.states[i],c=at(l);if(!c||!a.force&&c===this.lastMediaKey&&Date.now()-this.lastMediaAt<45e3)return;this.lastMediaKey=c,this.lastMediaAt=Date.now(),this.mediaShown.set(e.id,Date.now());let h=l.attributes.entity_picture;if(h&&await Promise.race([Mi(h),new Promise(g=>setTimeout(g,4e3))]),!a.force&&at(this.hass?.states[i])!==c)return;let p=this.secs(e.duration??(r==="fullscreen"?15:12));this.media={ev:e,at:new Date,secs:p,seq:++this.seq,entity:i,style:r,key:c,demo:s},clearTimeout(this.mediaTimer),this.mediaTimer=window.setTimeout(()=>this.closeMedia(),p*1e3),clearInterval(this.mediaTicker),this.mediaTicker=window.setInterval(()=>this.requestUpdate(),1e3)}closeMedia(){clearTimeout(this.mediaTimer),clearInterval(this.mediaTicker),this.media=void 0}mediaTick(){if(!(!this.started||this.fixedPage))for(let e of this.eventsForDisplay()){if(e.kind!=="media"||!e.interval||e.style==="mini")continue;let i=_t(e).map(a=>this.hass?.states[a]).find(a=>at(a));i&&Date.now()-(this.mediaShown.get(e.id)??0)>=e.interval*6e4*this.speed&&(this.lastMediaKey="",this.fire(e,void 0,i))}}addChip(e,i){if(e.reminder==="off"||this.display?.reminders===!1)return;let a=typeof e.reminder=="number"?Date.now()+e.reminder*6e4*this.speed:void 0;this.chips=[...this.chips.filter(r=>r.id!==e.id),{id:e.id,icon:e.icon,text:e.chip??e.title,at:i,until:a}]}renderChips(){if(!this.chips.length||this.alarm)return m;let e=r=>u`<div class="chip" data-id=${r.id}>${ye(r.icon)}<span>${r.text}</span><span class="faint num">${Y(r.at)}</span></div>`,i=this.display?.reminders_stack??3,a=[...this.chips].reverse();return!i||this.chips.length<i?u`<div class="chips">${this.chips.map(e)}</div>`:this.chipsOpen?u`<div class="chips open">
      ${a.map(e)}
      <div class="chip clear" data-clear="1">${ye("close")}<span>${d("Alle entfernen")}</span></div>
      ${this.display?.history===!1?m:u`<div class="chip clear" data-history="1">${ye("bell")}<span>${d("Verlauf")}</span></div>`}
    </div>`:u`<div class="chips stack" data-open="1">
        ${e(a[0])}
        <span class="layer l1"></span><span class="layer l2"></span>
        <span class="count num">${this.chips.length}</span>
      </div>`}toggleChips(e){clearTimeout(this.chipsTimer),this.chipsOpen=e,e&&(this.chipsTimer=window.setTimeout(()=>this.chipsOpen=!1,2e4))}get historyKey(){return`ambiframe-history-${this.display?.id??""}`}loadHistory(){if(this.historyLoaded===this.historyKey)return this.history;this.historyLoaded=this.historyKey;try{this.history=JSON.parse(Yo(this.historyKey)??"[]")}catch{this.history=[]}return this.pruneHistory()}pruneHistory(){let e=Date.now()-(this.display?.history_hours??24)*36e5;return this.history=this.history.filter(i=>i.at>=e).slice(-100),this.history}remember(e){if(this.preview||this.display?.history===!1)return;this.loadHistory();let i=e.title||e.name||e.chip||e.id;this.history=[...this.history,{id:e.id,kind:e.kind,icon:e.icon,title:i,where:e.where||void 0,at:Date.now()}],this.pruneHistory(),ga(this.historyKey,JSON.stringify(this.history))}openHistory(e){clearTimeout(this.historyTimer),this.historyOpen=e,this.toggleChips(!1),e&&(this.historyTimer=window.setTimeout(()=>this.historyOpen=!1,6e4))}renderHistory(){if(!this.historyOpen)return m;let e=[...this.loadHistory()].reverse(),i=r=>{let s=new Date(r),o=new Date,l=Math.round((new Date(o.toDateString()).getTime()-new Date(s.toDateString()).getTime())/864e5);return l===0?d("Heute"):l===1?d("Gestern"):s.toLocaleDateString(ee(),{weekday:"long",day:"numeric",month:"long"})},a="";return u`<div class="hcenter" role="dialog" aria-label=${d("Mitteilungen")}>
      <div class="qhead">
        <span>${d("Mitteilungen")}</span>
        <button class="qclose" data-hclose="1" aria-label=${d("Schlie\xDFen")}>${ye("close")}</button>
      </div>
      <div class="hlist">
        ${e.length?e.map(r=>{let s=i(r.at),o=s!==a?u`<div class="hday">${s}</div>`:m;return a=s,u`${o}<div class="hrow">
                  ${ye(r.icon??(r.kind==="alarm"?"bell":r.kind==="live"?"camera":"info"))}
                  <div class="htext"><div>${r.title}</div>${r.where?u`<div class="faint">${r.where}</div>`:m}</div>
                  <span class="faint num">${Y(new Date(r.at))}</span>
                </div>`}):u`<div class="hempty">${d("Keine Mitteilungen")}</div>`}
      </div>
      ${e.length?u`<button class="hclear" data-hclear="1">${d("Verlauf leeren")}</button>`:m}
    </div>`}pruneChips(){let e=Date.now();this.chips.some(i=>i.until&&i.until<=e)&&(this.chips=this.chips.filter(i=>!i.until||i.until>e))}removeChip(e){this.chips=this.chips.filter(i=>i.id!==e)}showToast(e,i=!1){clearTimeout(this.toastTimer),this.toast={text:e,seq:++this.seq,bad:i},this.toastTimer=window.setTimeout(()=>this.toast=void 0,2600)}confirmFirst(e){return new Promise(i=>{let a=window.setTimeout(()=>r(!1),15e3),r=s=>{clearTimeout(a),this.ask=void 0,i(s)};this.ask={text:e,answer:r}})}closePopup(){clearTimeout(this.popupTimer),this.popup=void 0}renderPopup(){let e=this.popup;return e?u`<div class="ov popup">
      <div class="pbox">
        ${e.action.title?u`<div class="ptitle display">${e.action.title}</div>`:m}
        <af-card .hass=${this.hass} .options=${{card:e.action.card}}></af-card>
      </div>
    </div>`:m}renderAsk(){let e=this.ask;return e?u`<div class="ov notice ask">
      <div class="box">
        <h2 class="display">${e.text}</h2>
        <div class="choices">
          <button class="no" @click=${i=>(i.stopPropagation(),e.answer(!1))}>${d("Abbrechen")}</button>
          <button class="yes" @click=${i=>(i.stopPropagation(),e.answer(!0))}>${d("Ja")}</button>
        </div>
      </div>
    </div>`:m}renderToast(){let e=this.toast;return e?Re(e.seq,u`<div class="toast ${e.bad?"bad":""}">${ye(e.bad?"warning":"check")}<span>${e.text}</span></div>`):m}openControl(){let e=this.display?.control;if(!(this.preview||!e?.enabled)){if(this.hasAttribute("app")){Uo(e.dashboard??"/lovelace/0",e.idle??60);return}this.closeMedia(),this.controlOpen=!0,this.touchControl()}}closeControl(){clearInterval(this.controlTimer),this.controlOpen=!1}onFrameLoad(e){try{let i=e.target.contentWindow;for(let a of["pointerdown","touchstart","wheel","keydown"])i?.addEventListener(a,this.touchControl,{passive:!0})}catch{}}onTap(e){if(this.swallowTap){this.swallowTap=!1;return}let i=e.composedPath();if(this.menu){i.some(o=>o.classList?.contains("qmenu"))||this.closeMenu();return}let a=o=>i.some(l=>l.classList?.contains(o));if(this.historyOpen){if(i.some(o=>o.dataset?.hclear)){this.history=[],ga(this.historyKey,"[]"),this.requestUpdate();return}(i.some(o=>o.dataset?.hclose)||!i.some(o=>o.classList?.contains("hcenter")))&&this.openHistory(!1);return}if(i.some(o=>o.dataset?.history))return this.openHistory(!0);if(i.some(o=>o.dataset?.open))return this.toggleChips(!0);if(i.some(o=>o.dataset?.clear))return this.chips=[],this.toggleChips(!1);let r=i.find(o=>o.classList?.contains("chip"));if(r){this.removeChip(r.dataset.id??""),this.chipsOpen&&this.toggleChips(this.chips.length>0);return}if(this.ask)return;if(this.popup){a("pbox")||this.closePopup();return}if(this.alarm)return this.closeAlarm();if(this.notice)return this.closeNotice();if(this.media&&(this.media.style==="fullscreen"||a("mcard")))return this.closeMedia();if(a("pip"))return this.closePip();let s=i.find(o=>o.classList?.contains("mmini"));if(s?.dataset.entity){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:s.dataset.entity},bubbles:!0,composed:!0}));return}if(this.display?.control?.mode==="screensaver"&&yr()?.stopScreensaver)return yr().stopScreensaver();this.controlOpen||this.openControl()}renderTimer(e,i){return Re(e.seq,u`<div class="timer"><i style="background:${i};animation-duration:${e.secs}s"></i></div>`)}renderAlarm(){let e=this.alarm;return e?u`<div class="ov alarm">
      ${e.ev.camera?u`<af-camera-view .hass=${this.hass} .entity=${e.ev.camera} .osd=${`DEMO \xB7 ${e.ev.where.toUpperCase()}`}></af-camera-view>
            <div class="shade"></div>
            <div class="live"><i></i>${d("Live")}${e.ev.where?` \xB7 ${e.ev.where}`:""}</div>`:u`<div class="plain"></div>`}
      <div class="msg">
        <div class="bell">${ye(e.ev.icon??"bell")}</div>
        <div><h1 class="display">${e.ev.title}</h1><p class="num">${[e.ev.where,Y(e.at)].filter(Boolean).join(" \xB7 ")}</p></div>
      </div>
      <div class="hint">${d("Tippen zum Schlie\xDFen")}</div>
      ${this.renderTimer(e,"var(--af-alert)")}
    </div>`:m}renderPip(){let e=this.pip;return e?u`<div class="pip">
      <div class="v">
        <af-camera-view .hass=${this.hass} .entity=${e.ev.camera} .osd=${`DEMO \xB7 ${e.ev.title.toUpperCase()}`}></af-camera-view>
        <div class="live small"><i></i>${d("Live")}</div>
      </div>
      <div class="m">
        <div class="r">${ye(e.ev.icon??"cam")}<span>${e.ev.title}</span><span class="tm num">${Y(e.at)}</span></div>
        <div class="q">${e.text===d("Bewegung erkannt")?e.text:`\u201E${e.text}\u201C`}</div>
      </div>
      ${this.renderTimer(e,"var(--af-accent)")}
    </div>`:m}renderNotice(){let e=this.notice;if(!e)return m;let i=[];return e.duration&&e.duration>6e4&&i.push([d("Dauer"),Tn(e.duration)]),e.cost!=null&&i.push([d("Kosten"),`${O(e.cost,2)} \u20AC`]),u`<div class="ov notice">
      <div class="box">
        <div class="icw">${ye(e.ev.icon??"info")}</div>
        <h2 class="display">${e.ev.title}</h2>
        <div class="sub">${this.eventText(e.ev)||[e.ev.where,e.ev.kind==="info"&&e.ev.from?d("fertig um {time}",{time:Y(e.at)}):d("seit {time}",{time:Y(e.at)})].filter(Boolean).join(" \xB7 ")}</div>
        ${i.length?u`<div class="stats">${i.map(([a,r])=>u`<div><div class="k">${a}</div><div class="val display num">${r}</div></div>`)}</div>`:m}
        <div class="pill">${d("Erledigt")}</div>
        <div class="fine">${d("Bleibt danach als kleine Erinnerung oben rechts.")}</div>
      </div>
    </div>`}renderMedia(){let e=this.media;if(!e)return m;let i=e.demo??this.hass?.states[e.entity],a=i?.attributes??{},r=a.entity_picture,s=e.ev.where||a.friendly_name||"",o=Number(a.media_duration),l=Number(a.media_position);i?.state==="playing"&&a.media_position_updated_at&&(l+=(Date.now()-new Date(a.media_position_updated_at).getTime())/1e3);let c=o>0&&Number.isFinite(l)?u`<div class="prog">
            <div class="bar"><i style="transform:scaleX(${Math.min(1,Math.max(0,l/o))})"></i></div>
            <div class="times num"><span>${Zo(Math.min(l,o))}</span><span>${Zo(o)}</span></div>
          </div>`:m,h=Re(r??e.key,u`<div class="art" style=${r?`background-image:url('${r}')`:""}>${r?m:ye("music")}</div>`),p=Re(e.key,u`<div class="mtext">
        <div class="mlabel">${ye("music")}<span>${i?.state==="paused"?"Pausiert":"L\xE4uft gerade"}${s?` \xB7 ${s}`:""}</span></div>
        <div class="mtitle display">${a.media_title??""}</div>
        ${a.media_artist?u`<div class="martist">${a.media_artist}</div>`:m}
        ${e.style==="fullscreen"&&a.media_album_name&&a.media_album_name!==a.media_title?u`<div class="malbum">${a.media_album_name}</div>`:m}
        ${c}
      </div>`);return e.style==="fullscreen"?u`<div class="ov mfull">
        <div class="mbg ${r?"":"none"}" style=${r?`background-image:url('${r}')`:""}></div>
        <div class="mveil"></div>
        <div class="mwrap">${h}${p}</div>
      </div>`:u`<div class="mcard">${h}${p}</div>`}nowPlaying(){let e=this.findPlaying();return this.miniShown=!!e,e}findPlaying(){if(!(this.fixedPage&&!this.preview))for(let e of this.eventsForDisplay()){if(e.kind!=="media"||e.style!=="mini"||this.night&&!e.at_night||this.inQuiet(e)&&e.quiet_action==="skip"||!nt(this.hass,e.show_if,{display:this.display?.id,orientation:this.orient}))continue;let i=_t(e).map(c=>this.hass?.states[c]).filter(c=>!!c?.attributes.media_title),a=(e.mini_paused??120)*1e3,r=i.find(c=>c.state==="playing"),s=i.find(c=>c.state==="paused"&&Date.now()-new Date(c.last_changed).getTime()<a),o=r??s;if(!o)continue;let l=`${e.id}|${at(o)}`;if(l!==this.miniKey&&(this.miniKey=l,this.miniSince=Date.now()),!(e.mini_duration&&Date.now()-this.miniSince>e.mini_duration*1e3*this.speed))return{ev:e,s:o}}}renderMini(){if(this.media||this.alarm||this.pip||this.takeover||this.controlOpen)return m;if(this.pageById(this.currentPageId)?.widgets.some(g=>g.type==="media"))return m;let e=this.nowPlaying();if(!e)return m;let{ev:i,s:a}=e,r=a.attributes,s=r.entity_picture,o=i.where||r.friendly_name||"",l=Number(r.media_duration),c=Number(r.media_position);a.state==="playing"&&r.media_position_updated_at&&(c+=(Date.now()-new Date(r.media_position_updated_at).getTime())/1e3);let h=`${r.media_title}|${r.media_artist??""}`,p=[`pos-${i.mini_position??"bottom-right"}`,i.mini_size?`size-${i.mini_size}`:"",i.mini_background==="none"?"bare":""].join(" ");return u`<div class="mmini ${a.state} ${p}" data-entity=${a.entity_id}>
      ${i.mini_cover===!1?m:Re(h,u`<div class="art" style=${s?`background-image:url('${s}')`:""}>${s?m:ye("music")}</div>`)}
      ${Re(h,u`<div class="mtext">
          <div class="mlabel">${ye("music")}<span>${a.state==="paused"?d("Pausiert"):d("L\xE4uft gerade")}${o?` \xB7 ${o}`:""}</span></div>
          <div class="mtitle display">${r.media_title??""}</div>
          ${r.media_artist?u`<div class="martist">${r.media_artist}</div>`:m}
          ${i.mini_progress!==!1&&l>0&&Number.isFinite(c)?u`<div class="bar"><i style="transform:scaleX(${Math.min(1,Math.max(0,c/l))})"></i></div>`:m}
        </div>`)}
    </div>`}get touchable(){return!this.preview&&!this.streamMode&&this.display?.control?.enabled!==!1}updateShift(){if(!(!!this.display?.oled&&!this.preview)){clearInterval(this.shiftTimer),this.shiftTimer=void 0,(this.shift[0]||this.shift[1])&&(this.shift=[0,0]);return}if(this.shiftTimer)return;let i=()=>{this.shiftStep=(this.shiftStep+1)%8;let a=this.shiftStep/8*2*Math.PI;this.shift=[Math.round(Math.cos(a)*6),Math.round(Math.sin(a)*6)]};i(),this.shiftTimer=window.setInterval(i,18e4)}openMenu(){this.menu=!0,this.touchMenu()}touchMenu(){clearTimeout(this.menuTimer),this.menuTimer=window.setTimeout(()=>this.closeMenu(),1e4)}closeMenu(){clearTimeout(this.menuTimer),this.menu=!1}fully(){return window.fully}async menuAction(e){this.touchMenu();let i=this.fully();switch(e){case"pause":this.hass&&this.display&&(await this.hass.callWS({type:"ambiframe/display/pause",display_id:this.display.id,paused:!this.paused}).catch(()=>{}),this.showToast(this.paused?d("Weiter geht's"):d("Angehalten")));break;case"next":this.browse(1);break;case"mute":{let a=Date.now()<this.muteUntil;this.muteUntil=a?0:Date.now()+36e5,ga("ambiframe-mute-until",String(this.muteUntil)),this.showToast(a?d("T\xF6ne wieder an"):d("Eine Stunde stumm")),this.requestUpdate();break}case"brighter":case"darker":{let a=Number(i?.getScreenBrightness?.()??150),r=Math.max(5,Math.min(255,Math.round(a+(e==="brighter"?40:-40))));i?.setScreenBrightness?.(r),this.showToast(d("Helligkeit {n} %",{n:Math.round(r/255*100)}));break}case"screen":this.closeMenu(),i?.turnScreenOff?.(!0);break;case"dashboard":this.closeMenu(),this.openControl();break;case"history":this.closeMenu(),this.openHistory(!0);break;case"reload":ga("ambiframe-planned-reload",String(Date.now())),location.reload();break}}renderMenu(){if(!this.menu)return m;let e=this.fully(),i=Date.now()<this.muteUntil,a=[["pause",this.paused?"play":"pause",this.paused?d("Weiter abspielen"):d("Anhalten"),!0],["next","forward",d("N\xE4chste Seite"),!0],["mute",i?"speaker":"mute",i?d("T\xF6ne an"):d("1 Stunde stumm"),!0],["darker","moon",d("Dunkler"),!!e?.setScreenBrightness],["brighter","sun",d("Heller"),!!e?.setScreenBrightness],["screen","moon",d("Bildschirm aus"),!!e?.turnScreenOff],["dashboard","home",d("Dashboard"),this.display?.control?.enabled!==!1],["history","bell",this.loadHistory().length?d("Mitteilungen ({n})",{n:this.history.length}):d("Mitteilungen"),this.display?.history!==!1],["reload","reload",d("Neu laden"),!0]];return u`<div class="qmenu" role="dialog" aria-label=${d("Schnellmen\xFC")}>
      <div class="qhead">
        <span>${this.display?.name??"Ambiframe"}</span>
        <button class="qclose" aria-label=${d("Schlie\xDFen")} @click=${r=>(r.stopPropagation(),this.closeMenu())}>${ye("close")}</button>
      </div>
      <div class="qgrid">
        ${a.filter(([,,,r])=>r).map(([r,s,o])=>u`<button class=${r==="mute"&&i||r==="pause"&&this.paused?"on":""} @click=${l=>(l.stopPropagation(),void this.menuAction(r))}>
              ${ye(s)}<span>${o}</span>
            </button>`)}
      </div>
    </div>`}renderNav(){let e=this.display;if(!(e?.nav??e?.control?.enabled!==!1)||this.streamMode||this.preview||this.fixedPage||this.night||this.takeover)return m;if(this.alarm||this.controlOpen||this.popup||this.ask||this.media?.style==="fullscreen")return m;let a=(r,s)=>{r.stopPropagation(),this.browse(s)};return u`<button class="nav prev" aria-label=${d("Vorherige Seite")} @click=${r=>a(r,-1)}>${ye("back")}</button>
      <button class="nav next" aria-label=${d("N\xE4chste Seite")} @click=${r=>a(r,1)}>${ye("forward")}</button>`}renderControl(){if(!this.controlOpen)return m;let e=!!(this.alarm||this.notice||this.pip);return u`<div class="ov control ${e?"covered":""}">
      <iframe src=${this.display?.control.dashboard??"/lovelace/0"} title="Home Assistant" @load=${this.onFrameLoad}></iframe>
      <div class="back" @click=${()=>this.closeControl()}>${ye("back")}${d("Zur\xFCck zu Ambiframe")} <span class="num">· ${this.controlLeft} s</span></div>
    </div>`}render(){if(!this.config||!this.display)return u`<div class="empty">${d("Kein Display konfiguriert")}</div>`;let e=this.grid;return u`<div
      class="stage ${this.dimming?"dim":""}"
      style="width:${e.w}px;height:${e.h}px;transform:translate(-50%,-50%) scale(${this.scale})${this.display?.oled?`;translate:${this.shift[0]*this.scale}px ${this.shift[1]*this.scale}px;transition:translate 30s linear`:""}"
      @click=${this.onTap}
      @pointerdown=${this.onPress}
      @pointermove=${this.onPressMove}
      @pointerup=${this.onPressEnd}
      @pointercancel=${this.onPressEnd}
      @pointerleave=${this.onPressEnd}
      @contextmenu=${i=>i.preventDefault()}
      @af-action=${this.onAction}
    >
      ${qt(this.layers,i=>i.key,i=>u`<af-page
            class="layer t-${i.trans.type} ${i.leaving?"out":""}"
            style="--t:${i.trans.duration}s"
            .hass=${this.hass}
            .page=${i.page}
            .ctx=${this.ctx}
            .photo=${i.photo}
            .grid=${e}
            .orientation=${this.orient}
          ></af-page>`)}
      ${this.renderChips()}
      ${this.renderMini()} ${this.renderMedia()} ${this.renderPip()} ${this.renderPopup()} ${this.renderNotice()} ${this.renderAlarm()}
      ${this.renderAsk()} ${this.renderToast()} ${this.renderNav()} ${this.renderMenu()} ${this.renderHistory()}
    </div>
    ${this.renderControl()}`}};Rn.properties={hass:{attribute:!1},config:{attribute:!1,noAccessor:!0},displayId:{attribute:"display-id"},streamMode:{type:Boolean,attribute:"stream-mode"},shift:{state:!0},preview:{type:Boolean},fixedPage:{attribute:!1},speed:{type:Number},theme:{reflect:!0},mode:{reflect:!0},modeOverride:{attribute:!1},orient:{reflect:!0},forceOrientation:{attribute:!1},grid:{state:!0},evening:{type:Boolean,reflect:!0},dimming:{state:!0},layers:{state:!0},alarm:{state:!0},pip:{state:!0},notice:{state:!0},media:{state:!0},chips:{state:!0},chipsOpen:{state:!0},historyOpen:{state:!0},controlOpen:{state:!0},controlLeft:{state:!0},popup:{state:!0},ask:{state:!0},menu:{state:!0},toast:{state:!0},scale:{state:!0},night:{state:!0}},Rn.styles=[Ws,C`
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
    `];B("af-display",Rn);var Kn=class extends oe{constructor(){super(...arguments);this.reason="";this.weather=""}connectedCallback(){super.connectedCallback();let e=()=>{this.requestUpdate(),this.timer=window.setTimeout(e,6e4-Date.now()%6e4+50)};e()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer)}render(){let e=new Date,i=ee(),a=this.weather||Object.keys(this.hass?.states??{}).find(o=>o.startsWith("weather.")),r=a?this.hass?.states[a]:void 0,s=Number(r?.attributes.temperature);return u`<div class="clock">${e.toLocaleTimeString(i,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${e.toLocaleDateString(i,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${r&&r.state!=="unavailable"?u`<div class="weather">
            ${X(De(r.state))}<span>${Number.isFinite(s)?`${Math.round(s)}\xB0`:""} ${qe(r.state)}</span>
          </div>`:m}
      <div class="note">${X("info")}<span>${d("Ambiframe \xB7 Notfallmodus")}${this.reason?` \u2013 ${d(this.reason)}`:""}</span></div>`}};Kn.properties={hass:{attribute:!1},reason:{},weather:{}},Kn.styles=C`
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
  `;B("af-safe",Kn);var wr="2026-10-22T10:42:09.968Z",du=3e4,cu=5,uu=2*6e4,hu=4,Qo=!1,pu=10*6e4,mu=15*6e4,gu=9e4,Jo=(()=>{let t=new URLSearchParams(location.search),n=location.pathname.split("/").filter(Boolean).slice(1).map(decodeURIComponent);return{display:t.get("display")??n[0]??null,stream:t.has("stream")||n[1]==="stream"}})(),Ze={get:t=>{try{return localStorage.getItem(t)??localStorage.getItem(t.replace(/^ambiframe-/,"wandbild-"))}catch{return null}},set:(t,n)=>{try{localStorage.setItem(t,n)}catch{}}},Xo=(()=>{let t=Ze.get("ambiframe-client");return t||(t=globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,Ze.set("ambiframe-client",t)),t})(),fu=()=>{try{return window.fully?.getDeviceId?.()||null}catch{return null}},bu=()=>{let t=navigator.userAgent,n=window.fully;if(n){let r="";try{r=n.getDeviceName?.()??""}catch{}return r?`Fully Kiosk \xB7 ${r}`:"Fully Kiosk"}let e=/iPad/.test(t)||/Macintosh/.test(t)&&navigator.maxTouchPoints>1;if(/Home ?Assistant\//.test(t))return e?"HA-App \xB7 iPad":/iPhone/.test(t)?"HA-App \xB7 iPhone":"HA-App";let i=e?"iPad":/iPhone/.test(t)?"iPhone":/Android/.test(t)?"Android":/Mac/.test(t)?"Mac":/Windows/.test(t)?"Windows":"Browser",a=/Edg\//.test(t)?"Edge":/Firefox\//.test(t)?"Firefox":/Chrome\//.test(t)?"Chrome":/Safari\//.test(t)?"Safari":"";return a?`${i} \xB7 ${a}`:i},kr=()=>{let t=document,n=t.fullscreenEnabled??t.webkitFullscreenEnabled??!1,e=t.fullscreenElement??t.webkitFullscreenElement,i=matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,a="fully"in window||/Home Assistant\//.test(navigator.userAgent);return n&&!e&&!i&&!a},Vn=class extends oe{constructor(){super(...arguments);this.error="";this.hint=!1;this.displayId="";this.swallowClick=!1;this.connectedTo="";this.paused=!1;this.autoSafe="";this.forcedSafe=!1;this.pendingEvent="";this.urlSafe=new URLSearchParams(location.search).has("safe");this.streamMode=Jo.stream;this.configText="";this.errors=[];this.noPageSince=0;this.onError=e=>{let i="reason"in e?e.reason:e.error,a=`${"filename"in e?e.filename:""} ${i?.stack??""}`;if(!/ambiframe/i.test(a))return;let r=Date.now();this.errors=[...this.errors.filter(s=>r-s<uu),r],this.errors.length>=cu&&!this.safeReason&&this.enterSafe("Anzeigefehler")};this.watchPage=()=>{if(this.safeReason||!this.config||!this.displayId||document.hidden){this.noPageSince=0;return}if(this.disp?.currentPageId){this.noPageSince=0;return}this.noPageSince||=Date.now(),Date.now()-this.noPageSince>gu&&this.enterSafe("keine Seite sichtbar",5*6e4)};this.onPointerDown=e=>{if(kr()){if(!this.displayId){this.goFullscreen();return}e.stopPropagation(),this.swallowClick=!0,this.goFullscreen()}};this.onClick=e=>{this.swallowClick&&(this.swallowClick=!1,e.stopPropagation())};this.onFullscreenChange=()=>{this.hint=kr()};this.onPage=()=>{this.report()};this.onVisibility=()=>{this.report()}}get safeReason(){return this.urlSafe?"per Link (?safe=1)":this.forcedSafe?"aus Home Assistant eingeschaltet":this.autoSafe}enterSafe(e,i=mu){this.autoSafe||(this.autoSafe=e,this.report(),clearTimeout(this.safeTimer),this.safeTimer=window.setTimeout(()=>this.leaveSafe(),i))}leaveSafe(){clearTimeout(this.safeTimer),this.autoSafe="",this.errors=[],this.noPageSince=0,this.report()}checkStartLoop(){if(Qo)return;Qo=!0;let e=Date.now(),i=Number(Ze.get("ambiframe-planned-reload")??0);if(Ze.set("ambiframe-planned-reload","0"),e-i<2*6e4)return;let a=[];try{a=JSON.parse(Ze.get("ambiframe-starts")??"[]")}catch{a=[]}a=[...a.filter(r=>typeof r=="number"&&e-r<pu),e],Ze.set("ambiframe-starts",JSON.stringify(a)),a.length>=hu&&this.enterSafe("startet immer wieder neu")}get disp(){return this.renderRoot.querySelector("af-display")}connectedCallback(){super.connectedCallback(),this.hint=!this.streamMode&&kr(),this.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),this.addEventListener("click",this.onClick,{capture:!0}),this.addEventListener("af-page",this.onPage),document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),document.addEventListener("visibilitychange",this.onVisibility),window.addEventListener("error",this.onError),window.addEventListener("unhandledrejection",this.onError),this.watchTimer=window.setInterval(this.watchPage,15e3),this.streamMode||this.checkStartLoop()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),this.removeEventListener("click",this.onClick,{capture:!0}),this.removeEventListener("af-page",this.onPage),document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange),document.removeEventListener("visibilitychange",this.onVisibility),window.removeEventListener("error",this.onError),window.removeEventListener("unhandledrejection",this.onError),clearInterval(this.watchTimer),clearTimeout(this.safeTimer),this.unsub?.then(e=>e?.()),this.unsub=void 0,this.disconnectDisplay(),clearTimeout(this.reloadTimer)}goFullscreen(){let e=document.documentElement;try{let i=e.requestFullscreen?.bind(e)??e.webkitRequestFullscreen?.bind(e);Promise.resolve(i?.()).catch(()=>{})}catch{}}resolveDisplay(e){let i=e.displays.map(s=>s.id),a=this.display||Jo.display;if(a&&i.includes(a))return a;let r=Ze.get("ambiframe-display");return!a&&r&&i.includes(r)?r:i.length!==1?"":(Ze.set("ambiframe-display",i[0]),i[0])}choose(e){Ze.set("ambiframe-display",e);let i=new URL(location.href);i.searchParams.set("display",e),history.replaceState(history.state,"",i),this.displayId=e}updated(){this.hass&&!this.unsub&&(this.unsub=this.hass.connection.subscribeMessage(e=>{let i=JSON.stringify(e.config);i!==this.configText&&(this.configText=i,this.config=e.config);let a=this.resolveDisplay(e.config);a!==this.displayId&&(this.displayId=a),this.autoSafe==="Ambiframe nicht erreichbar"&&this.leaveSafe()},{type:"ambiframe/config/subscribe"}).catch(e=>{console.warn("Ambiframe nicht erreichbar:",e?.message??e),this.enterSafe("Ambiframe nicht erreichbar",6e4),window.setTimeout(()=>{this.unsub=void 0,this.requestUpdate()},6e4)})),this.hass&&this.displayId!==this.connectedTo&&this.connectDisplay(),this.disp?.setPaused(this.paused),this.firePending()}firePending(){let e=this.pendingEvent&&this.config?.events.find(i=>i.id===this.pendingEvent);!this.disp||!e||(this.pendingEvent="",this.disp.fire(e))}connectDisplay(){this.disconnectDisplay();let e=this.displayId;this.connectedTo=e,!(!this.hass||!e)&&(this.connection=this.hass.connection.subscribeMessage(i=>this.onCommand(i),{type:"ambiframe/display/connect",display_id:e,client_id:Xo,name:this.streamMode?d("Videostream"):bu(),version:wr,fully:fu(),origin:location.origin}).catch(()=>{}),this.heartbeat=window.setInterval(()=>{this.report()},du))}disconnectDisplay(){clearInterval(this.heartbeat),this.connection?.then(e=>e?.()),this.connection=void 0,this.connectedTo=""}async report(){if(!(!this.hass||!this.connectedTo))try{let e=await this.hass.callWS({type:"ambiframe/display/report",display_id:this.connectedTo,client_id:Xo,page:this.disp?.currentPageId??null,hidden:document.hidden,version:wr,safe:this.safeReason||null});this.checkVersion(e?.version)}catch{}}onCommand(e){let i=this.disp;switch(e.command){case"hello":this.forcedSafe=!!e.safe,this.paused=!!e.paused,i?.setPaused(this.paused),this.checkVersion(e.version),this.report();break;case"show_page":i?.showPage(e.page);break;case"next":i?.next();break;case"pause":case"resume":this.paused=e.command==="pause",i?.setPaused(this.paused);break;case"reload":this.reloadWhenIdle();break;case"event":this.pendingEvent=e.id,this.firePending();break;case"safe":this.forcedSafe=e.on,e.on||this.leaveSafe(),this.report();break}}checkVersion(e){if(!(!e||e===wr)){try{if(sessionStorage.getItem("ambiframe-reloaded-for")===e)return;sessionStorage.setItem("ambiframe-reloaded-for",e)}catch{}this.reloadWhenIdle()}}reloadWhenIdle(){if(clearTimeout(this.reloadTimer),document.hidden&&!this.streamMode){let a=()=>{document.hidden||(document.removeEventListener("visibilitychange",a),this.reloadWhenIdle())};document.addEventListener("visibilitychange",a);return}if(this.disp?.busy){this.reloadTimer=window.setTimeout(()=>this.reloadWhenIdle(),1e4);return}let e=fetch(import.meta.url,{cache:"reload"}).catch(()=>{}),i=new Promise(a=>setTimeout(a,8e3));Promise.race([e,i]).then(()=>{Ze.set("ambiframe-planned-reload",String(Date.now())),location.reload()})}get safeWeather(){for(let e of this.config?.pages??[]){let i=e.widgets?.find(a=>a.type==="weather"&&a.options?.entity);if(i)return String(i.options.entity)}return""}render(){return Ot(Ht(zn(this.config,this.displayId)?.design.language,this.hass?.language)),this.safeReason?u`<af-safe .hass=${this.hass} .reason=${this.safeReason} .weather=${this.safeWeather}></af-safe>`:this.error?u`<div class="error">${this.error}</div>`:this.config&&!this.displayId?u`<div class="pick">
        <h1>${d("Welches Display ist das?")}</h1>
        <p>${d("Die Wahl wird auf diesem Ger\xE4t gespeichert.")}</p>
        <div class="list">${this.config.displays.map(e=>u`<button @click=${()=>this.choose(e.id)}>${e.name}</button>`)}</div>
      </div>`:u`${this.hint?u`<div class="hint">${d("Einmal tippen f\xFCr Vollbild")}</div>`:m}
      <af-display .hass=${this.hass} .config=${this.config} display-id=${this.displayId} ?stream-mode=${this.streamMode}></af-display>`}};Vn.properties={hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},display:{attribute:!1},config:{state:!0},error:{state:!0},hint:{state:!0},displayId:{state:!0},autoSafe:{state:!0},forcedSafe:{state:!0}},Vn.styles=C`
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
  `;B("ambiframe-display-panel",Vn);var ae=Symbol("NOT_RESOLVED");function $e(t,n){return{tagName:t,nodeKind:"scalar",implicit:n.implicit??!1,matchByTagPrefix:n.matchByTagPrefix??!1,implicitFirstChars:n.implicitFirstChars??null,resolve:n.resolve,identify:n.identify,represent:n.represent??(e=>String(e)),representTagName:n.representTagName??(()=>t)}}function Br(t,n){let e=n.finalize===void 0;return{tagName:t,nodeKind:"sequence",implicit:!1,matchByTagPrefix:n.matchByTagPrefix??!1,create:n.create,addItem:n.addItem,finalize:n.finalize??(i=>i),carrierIsResult:e,identify:n.identify,represent:n.represent??(i=>i),representTagName:n.representTagName??(()=>t)}}function ka(t,n){let e=n.finalize===void 0;return{tagName:t,nodeKind:"mapping",implicit:!1,matchByTagPrefix:n.matchByTagPrefix??!1,create:n.create,addPair:n.addPair,has:n.has,keys:n.keys,get:n.get,finalize:n.finalize??(i=>i),carrierIsResult:e,identify:n.identify,represent:n.represent??(i=>i),representTagName:n.representTagName??(()=>t)}}var vu=$e("tag:yaml.org,2002:str",{resolve:t=>t,identify:t=>typeof t=="string"}),yu=["","~","null","Null","NULL"],wu=$e("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:t=>yu.indexOf(t)!==-1?null:ae,identify:t=>t===null,represent:()=>"null"}),ku=$e("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(t,n)=>t==="null"||n&&t===""?null:ae,identify:t=>t===null,represent:()=>"null"}),xu=["","~","null","Null","NULL"],Su=$e("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:t=>xu.indexOf(t)!==-1?null:ae,identify:t=>t===null,represent:()=>"null"}),$u=["true","True","TRUE"],Au=["false","False","FALSE"],Tu=$e("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:t=>$u.indexOf(t)!==-1?!0:Au.indexOf(t)!==-1?!1:ae,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),Eu=["true"],zu=["false"],Lu=$e("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:t=>Eu.indexOf(t)!==-1?!0:zu.indexOf(t)!==-1?!1:ae,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),_u=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],Du=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Nu=$e("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:t=>_u.indexOf(t)!==-1?!0:Du.indexOf(t)!==-1?!1:ae,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),Mu=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Cu=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Pu(t){let n=t,e=1;return(n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(e=-1),n=n.slice(1)),n.startsWith("0b")?e*parseInt(n.slice(2),2):n.startsWith("0o")?e*parseInt(n.slice(2),8):n.startsWith("0x")?e*parseInt(n.slice(2),16):e*parseInt(n,10)}function Iu(t,n){if(n){if(!Cu.test(t))return ae}else if(!Mu.test(t))return ae;let e=Pu(t);return Number.isFinite(e)?e:ae}var fl=$e("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Iu,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),Fu=new RegExp("^-?(?:0|[1-9][0-9]*)$"),Bu=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Hu(t){let n=t,e=1;return(n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(e=-1),n=n.slice(1)),n.startsWith("0b")?e*parseInt(n.slice(2),2):n.startsWith("0o")?e*parseInt(n.slice(2),8):n.startsWith("0x")?e*parseInt(n.slice(2),16):e*parseInt(n,10)}function Ou(t,n){if(n){if(!Bu.test(t))return ae}else if(!Fu.test(t))return ae;let e=Hu(t);return Number.isFinite(e)?e:ae}var Wu=$e("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Ou,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),Ru=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Ku(t){let n=t.replace(/_/g,""),e=1;if((n[0]==="-"||n[0]==="+")&&(n[0]==="-"&&(e=-1),n=n.slice(1)),n.startsWith("0b"))return e*parseInt(n.slice(2),2);if(n.startsWith("0x"))return e*parseInt(n.slice(2),16);if(n.includes(":")){let i=0;for(let a of n.split(":"))i=i*60+Number(a);return e*i}return n!=="0"&&n[0]==="0"?e*parseInt(n,8):e*parseInt(n,10)}function Vu(t){if(!Ru.test(t))return ae;let n=Ku(t);return Number.isFinite(n)?n:ae}var zr=$e("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Vu,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),ju=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Gu=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Uu(t){if(!ju.test(t))return ae;let n=t.toLowerCase(),e=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;let i=e*parseFloat(n);return Number.isFinite(i)||Gu.test(t)?i:ae}function qu(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let n=t.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var bl=$e("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Uu,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:qu}),Zu=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),Yu=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Qu(t,n){if(n){if(!Yu.test(t))return ae;let i=t.toLowerCase(),a=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return a===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;let r=a*parseFloat(i);return Number.isFinite(r)?r:ae}if(!Zu.test(t))return ae;let e=Number(t);return Number.isFinite(e)?e:ae}function Ju(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let n=t.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var Xu=$e("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Qu,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:Ju}),eh=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),th=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function nh(t){if(!eh.test(t))return ae;let n=t.toLowerCase().replace(/_/g,""),e=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;let i=0;if(n.includes(":")){for(let a of n.split(":"))i=i*60+Number(a);i*=e}else i=e*parseFloat(n);return Number.isFinite(i)||th.test(t)?i:ae}function ih(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let n=t.toString(10);return/^[-+]?[0-9]+e/.test(n)?n.replace("e",".e"):n}var Lr=$e("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:nh,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:ih}),ah=$e("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(t,n)=>t==="<<"||n&&t===""?"<<":ae,identify:()=>!1}),rh=/^[A-Za-z0-9+/]*={0,2}$/;function sh(t){let n=t.replace(/\s/g,"");if(n.length%4!==0||!rh.test(n))return ae;let e=atob(n),i=new Uint8Array(e.length);for(let a=0;a<e.length;a++)i[a]=e.charCodeAt(a);return i}function oh(t){let n="";for(let e=0;e<t.length;e++)n+=String.fromCharCode(t[e]);return btoa(n)}var lh=$e("tag:yaml.org,2002:binary",{resolve:sh,identify:t=>Object.prototype.toString.call(t)==="[object Uint8Array]",represent:oh}),dh=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),ch=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function el(t,n,e,i=0,a=0,r=0,s=0){let o=new Date(Date.UTC(t,n,e,i,a,r,s));return o.setUTCFullYear(t,n,e),o}function uh(t){let n=dh.exec(t);if(n===null&&(n=ch.exec(t)),n===null)return ae;let e=+n[1],i=+n[2]-1,a=+n[3];if(!n[4]){let h=el(e,i,a);return h.getUTCFullYear()!==e||h.getUTCMonth()!==i||h.getUTCDate()!==a?ae:h}let r=+n[4],s=+n[5],o=+n[6],l=0;if(r>23||s>59||o>59)return ae;if(n[7]){let h=n[7].slice(0,3);for(;h.length<3;)h+="0";l=+h}let c=el(e,i,a,r,s,o,l);if(c.getUTCFullYear()!==e||c.getUTCMonth()!==i||c.getUTCDate()!==a)return ae;if(n[9]){let h=+n[10],p=+(n[11]||0);if(h>23||p>59)return ae;let g=(h*60+p)*6e4;c.setTime(c.getTime()-(n[9]==="-"?-g:g))}return c}var hh=$e("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:uh,identify:t=>t instanceof Date,represent:t=>t.toISOString()}),ph=Br("tag:yaml.org,2002:seq",{create:()=>[],addItem:(t,n)=>{t.push(n)},identify:Array.isArray});function xa(t){if(t===null||typeof t!="object"||Array.isArray(t))return!1;let n=Object.getPrototypeOf(t);return n===null||n===Object.prototype}function _r(t,n){let e={};for(let i of n)t[i]!==void 0&&(e[i]=t[i]);return e}var mh=Br("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(t,n)=>{let e;if(n instanceof Map){if(n.size!==1)return"cannot resolve an ordered map item";e=n.keys().next().value}else if(xa(n)){let i=Object.keys(n);if(i.length!==1)return"cannot resolve an ordered map item";e=i[0]}else return"cannot resolve an ordered map item";return t.seen.has(e)?"duplicate key in ordered map":(t.seen.add(e),t.list.push(n),"")},finalize:t=>t.list,identify:()=>!1}),gh=Br("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(t,n)=>{if(n instanceof Map)return n.size!==1?"cannot resolve a pairs item":(t.push(n.entries().next().value),"");if(Object.prototype.toString.call(n)!=="[object Object]")return"cannot resolve a pairs item";let e=n,i=Object.keys(e);return i.length!==1?"cannot resolve a pairs item":(t.push([i[0],e[i[0]]]),"")},identify:()=>!1}),fh=ka("tag:yaml.org,2002:map",{create:()=>({}),identify:xa,represent:t=>{let n=new Map;for(let e of Object.keys(t))n.set(e,t[e]);return n},addPair:(t,n,e)=>{if(n!==null&&typeof n=="object")return"object-based map does not support complex keys";let i=String(n);return i==="__proto__"?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,""},has:(t,n)=>n!==null&&typeof n=="object"?!1:Object.prototype.hasOwnProperty.call(t,String(n)),keys:t=>Object.keys(t),get:(t,n)=>{let e=String(n);return Object.prototype.hasOwnProperty.call(t,e)?t[e]:null}}),bh=ka("tag:yaml.org,2002:set",{create:()=>new Set,identify:t=>t instanceof Set,represent:t=>{let n=new Map;for(let e of t)n.set(e,null);return n},addPair:(t,n,e)=>e!==null?"cannot resolve a set item":(t.add(n),""),has:(t,n)=>t.has(n),keys:t=>t.keys(),get:()=>null});function vh(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function yh(){return{scalar:[],sequence:[],mapping:[]}}function wh(t){let n=[];for(let e of t){let i=n.length;for(let a=0;a<n.length;a++){let r=n[a];if(r.nodeKind===e.nodeKind&&r.tagName===e.tagName&&r.matchByTagPrefix===e.matchByTagPrefix){i=a;break}}n[i]=e}return n}var Sa=class vl{constructor(n){Be(this,"tags");Be(this,"implicitScalarTags");Be(this,"implicitScalarByFirstChar");Be(this,"implicitScalarAnyFirstChar");Be(this,"defaultScalarTag");Be(this,"defaultSequenceTag");Be(this,"defaultMappingTag");Be(this,"exact");Be(this,"prefix");let e=wh(n),i=[],a=vh(),r=yh();for(let h of e){if(h.nodeKind==="scalar"&&h.implicit){if(h.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");i.push(h)}switch(h.nodeKind){case"scalar":h.matchByTagPrefix?r.scalar.push(h):a.scalar[h.tagName]=h;break;case"sequence":h.matchByTagPrefix?r.sequence.push(h):a.sequence[h.tagName]=h;break;case"mapping":h.matchByTagPrefix?r.mapping.push(h):a.mapping[h.tagName]=h;break}}let s=i.filter(h=>h.implicitFirstChars===null),o=new Set;for(let h of i)if(h.implicitFirstChars!==null)for(let p of h.implicitFirstChars)o.add(p);let l=new Map;for(let h of o)l.set(h,i.filter(p=>p.implicitFirstChars===null||p.implicitFirstChars.indexOf(h)!==-1));let c=a.scalar["tag:yaml.org,2002:str"];if(!c)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=e,this.implicitScalarTags=i,this.implicitScalarByFirstChar=l,this.implicitScalarAnyFirstChar=s,this.defaultScalarTag=c,this.defaultSequenceTag=a.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=a.mapping["tag:yaml.org,2002:map"],this.exact=a,this.prefix=r}lookupScalarTag(n){let e=this.exact.scalar[n];if(e)return e;for(let i of this.prefix.scalar)if(n.startsWith(i.tagName))return i}lookupSequenceTag(n){let e=this.exact.sequence[n];if(e)return e;for(let i of this.prefix.sequence)if(n.startsWith(i.tagName))return i}lookupMappingTag(n){let e=this.exact.mapping[n];if(e)return e;for(let i of this.prefix.mapping)if(n.startsWith(i.tagName))return i}resolveImplicitScalarTag(n){let e=this.implicitScalarByFirstChar.get(n.charAt(0))??this.implicitScalarAnyFirstChar;for(let a of e){let r=a.resolve(n,!1,a.tagName);if(r!==ae)return{value:r,tag:a}}let i=this.defaultScalarTag;return{value:i.resolve(n,!1,i.tagName),tag:i}}withTags(...n){let e=[];for(let i of n)e=e.concat(i);return new vl([...this.tags,...e])}},Hr=new Sa([vu,ph,fh]),ey=new Sa([...Hr.tags,ku,Lu,Wu,Xu]),kh=new Sa([...Hr.tags,wu,Tu,fl,bl]),xh=new Sa([...Hr.tags,Su,Nu,zr,Lr,hh,ah,lh,mh,gh,bh]),Sh=xh.withTags({...zr,resolve:(t,n,e)=>{let i=zr.resolve(t,n,e);return i===ae?fl.resolve(t,n,e):i}},{...Lr,resolve:(t,n,e)=>{let i=Lr.resolve(t,n,e);return i===ae?bl.resolve(t,n,e):i}}),ty=ka("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(t,n,e)=>(t.set(n,e),""),has:(t,n)=>t.has(n),keys:t=>t.keys(),get:(t,n)=>t.get(n),identify:t=>t instanceof Map||xa(t),represent:t=>{if(t instanceof Map)return t;let n=new Map,e=t;for(let i of Object.keys(e))n.set(i,e[i]);return n}});function tl(t){if(Array.isArray(t)){let n=Array.prototype.slice.call(t);for(let e=0;e<n.length;e++){if(Array.isArray(n[e]))return null;typeof n[e]=="object"&&Object.prototype.toString.call(n[e])==="[object Object]"&&(n[e]="[object Object]")}return String(n)}return typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"?"[object Object]":String(t)}var ny=ka("tag:yaml.org,2002:map",{create:()=>({}),identify:xa,represent:t=>{let n=new Map;for(let e of Object.keys(t))n.set(e,t[e]);return n},addPair:(t,n,e)=>{let i=tl(n);return i===null?"nested arrays are not supported inside keys":(i==="__proto__"?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,"")},has:(t,n)=>{let e=tl(n);return e!==null&&Object.prototype.hasOwnProperty.call(t,e)},keys:t=>Object.keys(t),get:(t,n)=>{let e=String(n);return Object.prototype.hasOwnProperty.call(t,e)?t[e]:null}}),$h={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function xr(t,n,e,i,a){let r="",s="",o=Math.floor(a/2)-1;return i-n>o&&(r=" ... ",n=i-o+r.length),e-i>o&&(s=" ...",e=i+o-s.length),{str:r+t.slice(n,e).replace(/\t/g,"\u2192")+s,pos:i-n+r.length}}function Sr(t,n){return" ".repeat(Math.max(n-t.length,0))+t}function Ah(t,n){if(!t.buffer)return null;let e={...$h,...n},i=/\r?\n|\r|\0/g,a=[0],r=[],s,o=-1;for(;s=i.exec(t.buffer);)r.push(s.index),a.push(s.index+s[0].length),t.position<=s.index&&o<0&&(o=a.length-2);o<0&&(o=a.length-1);let l="",c=Math.min(t.line+e.linesAfter,r.length).toString().length,h=e.maxLength-(e.indent+c+3);for(let g=1;g<=e.linesBefore&&!(o-g<0);g++){let b=xr(t.buffer,a[o-g],r[o-g],t.position-(a[o]-a[o-g]),h);l=`${" ".repeat(e.indent)}${Sr((t.line-g+1).toString(),c)} | ${b.str}
${l}`}let p=xr(t.buffer,a[o],r[o],t.position,h);l+=`${" ".repeat(e.indent)}${Sr((t.line+1).toString(),c)} | ${p.str}
`,l+=`${"-".repeat(e.indent+c+3+p.pos)}^
`;for(let g=1;g<=e.linesAfter&&!(o+g>=r.length);g++){let b=xr(t.buffer,a[o+g],r[o+g],t.position-(a[o]-a[o+g]),h);l+=`${" ".repeat(e.indent)}${Sr((t.line+g+1).toString(),c)} | ${b.str}
`}return l.replace(/\n$/,"")}function nl(t,n){let e="";return t.mark?(t.mark.name&&(e+=`in "${t.mark.name}" `),e+=`(${t.mark.line+1}:${t.mark.column+1})`,!n&&t.mark.snippet&&(e+=`

${t.mark.snippet}`),`${t.reason} ${e}`):t.reason}var ft=class yl extends Error{constructor(e,i){super();Be(this,"reason");Be(this,"mark");this.name="YAMLException",this.reason=e,this.mark=i,this.message=nl(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${nl(this,e)}`}static throwAt(e,i,a,r=""){let s=0,o=0;for(let c=0;c<i;c++){let h=e.charCodeAt(c);h===10?(s++,o=c+1):h===13&&(s++,e.charCodeAt(c+1)===10&&c++,o=c+1)}let l={name:r,buffer:e,position:i,line:s,column:i-o};throw l.snippet=Ah(l),new yl(a,l)}},he={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},V={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},Le={BLOCK:1,FLOW:2},Me={CLIP:1,STRIP:2,KEEP:3},Th=-1;function il(t){switch(t){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var wl=new Array(256),kl=new Array(256);for(let t=0;t<256;t++)wl[t]=il(t)?1:0,kl[t]=il(t);function Eh(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}function zh(t){return t>=48&&t<=57?t-48:(t|32)-97+10}function Lh(t){return t===120?2:t===117?4:8}function ba(t,n,e){let i=0;for(;n<e;){let a=t.charCodeAt(n);if(a===10)i++,n++;else if(a===13)i++,n++,t.charCodeAt(n)===10&&n++;else if(a===32||a===9)n++;else break}return{position:n,breaks:i}}function Or(t){return t===1?" ":`
`.repeat(t-1)}function _h(t,n,e){let i="",a=n,r=n,s=n;for(;a<e;){let o=t.charCodeAt(a);if(o===10||o===13){i+=t.slice(r,s);let l=ba(t,a,e);i+=Or(l.breaks),a=r=s=l.position}else a++,o!==32&&o!==9&&(s=a)}return i+t.slice(r,s)}function Dh(t,n,e){let i="",a=n,r=n,s=n;for(;a<e;){let o=t.charCodeAt(a);if(o===39)i+=t.slice(r,a)+"'",a+=2,r=s=a;else if(o===10||o===13){i+=t.slice(r,s);let l=ba(t,a,e);i+=Or(l.breaks),a=r=s=l.position}else a++,o!==32&&o!==9&&(s=a)}return i+t.slice(r,e)}function Nh(t,n,e){let i="",a=n,r=n,s=n;for(;a<e;){let o=t.charCodeAt(a);if(o===92){i+=t.slice(r,a),a++;let l=t.charCodeAt(a);if(l===10||l===13)a=ba(t,a,e).position;else if(l<256&&wl[l])i+=kl[l],a++;else{let c=Lh(l),h=0;for(;c>0;c--){a++;let p=zh(t.charCodeAt(a));h=(h<<4)+p}i+=Eh(h),a++}r=s=a}else if(o===10||o===13){i+=t.slice(r,s);let l=ba(t,a,e);i+=Or(l.breaks),a=r=s=l.position}else a++,o!==32&&o!==9&&(s=a)}return i+t.slice(r,e)}function al(t,n,e,i,a,r){let s=i<0?0:i,o=t.slice(n,e).replace(/\r\n?/g,`
`),l=o===""?[]:(o.endsWith(`
`)?o.slice(0,-1):o).split(`
`),c="",h=!1,p=0,g=!1;for(let b of l){let f=0;for(;f<s&&b.charCodeAt(f)===32;)f++;if(i<0||f>=b.length){p++;continue}let v=b.slice(s),$=v.charCodeAt(0);r?$===32||$===9?(g=!0,c+=`
`.repeat(h?1+p:p)):g?(g=!1,c+=`
`.repeat(p+1)):p===0?h&&(c+=" "):c+=`
`.repeat(p):c+=`
`.repeat(h?1+p:p),c+=v,h=!0,p=0}return a===Me.KEEP?c+=`
`.repeat(h?1+p:p):a!==Me.STRIP&&h&&(c+=`
`),c}function Mh(t,n){if(n.valueStart===Th)return"";let{valueStart:e,valueEnd:i}=n;if(n.fast)return t.slice(e,i);switch(n.style){case V.SINGLE_QUOTED:return Dh(t,e,i);case V.DOUBLE_QUOTED:return Nh(t,e,i);case V.LITERAL_BLOCK:return al(t,e,i,n.indent,n.chomping,!1);case V.FOLDED_BLOCK:return al(t,e,i,n.indent,n.chomping,!0);default:return _h(t,e,i)}}var Ch=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"});function $r(t){return encodeURI(t).replace(/!/g,"%21")}function xl(t,n){if(t.startsWith("!<")&&t.endsWith(">"))return decodeURIComponent(t.slice(2,-1));let e=t.indexOf("!",1),i=e===-1?"!":t.slice(0,e+1),a=n?.[i]??Ch[i]??i;return decodeURIComponent(a)+decodeURIComponent(t.slice(i.length))}function Sl(t){let n=t;return n.charCodeAt(0)===33?(n=n.slice(1),`!${$r(n)}`):n.slice(0,18)==="tag:yaml.org,2002:"?`!!${$r(n.slice(18))}`:`!<${$r(n)}>`}var an=-1,Ph="tag:yaml.org,2002:merge",Wr={filename:"",schema:kh,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Ih(t){return"tagStart"in t&&t.tagStart!==an?t.tagStart:"anchorStart"in t&&t.anchorStart!==an?t.anchorStart:"valueStart"in t&&t.valueStart!==an?t.valueStart:"start"in t?t.start:0}function ke(t,n){ft.throwAt(t.source,t.position,n,t.filename)}function $l(t,n,e,i){try{return e.finalize(i)}catch(a){if(a instanceof ft)throw a;ft.throwAt(t.source,n,a instanceof Error?a.message:String(a),t.filename)}}function Fh(t,n){let e=Mh(t.source,n),i=n.tagStart===an?"":t.source.slice(n.tagStart,n.tagEnd),a=t.schema.defaultScalarTag;if(i!==""){if(i==="!")return{value:e,tag:a};let r=xl(i,t.tagHandlers),s=t.schema.lookupScalarTag(r);if(s){let l=s.resolve(e,!0,r);return l===ae&&ke(t,`cannot resolve a node with !<${r}> explicit tag`),{value:l,tag:s}}let o=t.schema.lookupMappingTag(r)??t.schema.lookupSequenceTag(r);if(o){e!==""&&ke(t,`cannot resolve a node with !<${r}> explicit tag`);let l=o.create(r);return{value:o.carrierIsResult?l:$l(t,t.position,o,l),tag:o}}ke(t,`unknown scalar tag !<${r}>`)}return n.style===V.PLAIN?t.schema.resolveImplicitScalarTag(e):{value:a.resolve(e,!1,a.tagName),tag:a}}function rl(t,n,e){let i=n.tagStart===an?"":t.source.slice(n.tagStart,n.tagEnd);return i===""||i==="!"?e:xl(i,t.tagHandlers)}function Al(t){return t.nodeKind==="mapping"}function sl(t){t.totalMergeKeys++,t.maxTotalMergeKeys!==-1&&t.totalMergeKeys>t.maxTotalMergeKeys&&ke(t,`merge keys exceeded maxTotalMergeKeys (${t.maxTotalMergeKeys})`)}function ol(t,n,e,i){sl(t);for(let a of i.keys(e)){if(sl(t),n.tag.has(n.value,a))continue;let r=n.tag.addPair(n.value,a,i.get(e,a));r&&ke(t,r),n.overridable??=new Set,n.overridable.add(a)}}function Bh(t,n,e,i){if(t.position=n.keyPosition,Al(i))ol(t,n,e,i);else if(i.nodeKind==="sequence"&&Array.isArray(e)){e.length>100&&ke(t,"abnormal merge sequence size");for(let a of e){let r=t.nodeTags.get(a);r||ke(t,"cannot merge mappings; the provided source object is unacceptable"),ol(t,n,a,r)}}else ke(t,"cannot merge mappings; the provided source object is unacceptable")}function Hh(t,n,e,i,a){if(t.position=n.keyPosition,n.keyIsMerge){Bh(t,n,i,a);return}!t.json&&n.tag.has(n.value,e)&&!n.overridable?.has(e)&&ke(t,"duplicated mapping key");let r=n.tag.addPair(n.value,e,i);r&&ke(t,r),n.overridable?.delete(e)}function Ar(t,n,e){let i=t.frames[t.frames.length-1];if(i.kind==="document")i.value=n,i.hasValue=!0;else if(i.kind==="sequence"){Al(e)&&t.nodeTags.set(n,e);let a=i.tag.addItem(i.value,n,i.index++);a&&ke(t,a)}else if(i.hasKey){let a=i.key;i.key=void 0,i.hasKey=!1,Hh(t,i,a,n,e)}else i.key=n,i.keyPosition=t.position,i.hasKey=!0,i.keyIsMerge=e.tagName===Ph}function Tr(t,n,e,i,a){if(n.anchorStart!==an){let r={value:e,tag:i,isValueFinal:a};return t.anchors.set(t.source.slice(n.anchorStart,n.anchorEnd),r),r}return null}function Oh(t,n){let e={...Wr,...n,events:t,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;e.eventIndex<e.events.length;){let i=e.events[e.eventIndex++];switch(e.position=Ih(i),i.type){case he.DOCUMENT:e.anchors=new Map,e.nodeTags=new Map,e.aliasCount=0,e.tagHandlers=Object.create(null);for(let a of i.directives)a.kind==="tag"&&(e.tagHandlers[a.handle]=a.prefix);e.frames.push({kind:"document",position:e.position,value:void 0,hasValue:!1});break;case he.SCALAR:{let{value:a,tag:r}=Fh(e,i);Tr(e,i,a,r,!0),Ar(e,a,r);break}case he.SEQUENCE:{let a=rl(e,i,"tag:yaml.org,2002:seq"),r=e.schema.lookupSequenceTag(a);r||ke(e,`unknown sequence tag !<${a}>`);let s=r.create(a),o=Tr(e,i,s,r,r.carrierIsResult);e.frames.push({kind:"sequence",position:e.position,value:s,tag:r,anchor:o,index:0});break}case he.MAPPING:{let a=rl(e,i,"tag:yaml.org,2002:map"),r=e.schema.lookupMappingTag(a);r||ke(e,`unknown mapping tag !<${a}>`);let s=r.create(a),o=Tr(e,i,s,r,r.carrierIsResult);e.frames.push({kind:"mapping",position:e.position,value:s,tag:r,anchor:o,key:void 0,keyPosition:e.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case he.ALIAS:{e.maxAliases!==-1&&++e.aliasCount>e.maxAliases&&ke(e,`aliases exceeded maxAliases (${e.maxAliases})`);let a=e.source.slice(i.anchorStart,i.anchorEnd),r=e.anchors.get(a);r||ke(e,`unidentified alias "${a}"`),r.isValueFinal||ke(e,`recursive alias "${a}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),Ar(e,r.value,r.tag);break}case he.POP:{let a=e.frames.pop();if(a.kind==="mapping"&&a.hasKey&&(e.position=a.keyPosition,ke(e,"incomplete mapping pair in event stream")),a.kind==="document")e.documents.push(a.value);else{let r=a.tag.carrierIsResult?a.value:$l(e,a.position,a.tag,a.value);a.anchor&&(a.anchor.value=r,a.anchor.isValueFinal=!0),Ar(e,r,a.tag)}break}}}return e.documents}var re=-1,Tl=Object.prototype.hasOwnProperty,ln=1,El=2,zl=3,va=4,Wh=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Rh=/[,\[\]{}]/,Ll=/^(?:!|!!|![0-9A-Za-z-]+!)$/,Dr=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,_l=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,Kh=new RegExp(`^(?:${Dr})*$`),Vh=new RegExp(`^(?:${_l})+$`),jh=new RegExp(`^(?:!(?:${Dr})*|${_l}(?:${Dr})*)$`),Rr={filename:"",maxDepth:100};function Gh(t,n,e){t.events.push({type:he.DOCUMENT,explicitStart:n,explicitEnd:e,directives:t.directives})}function Dl(t,n,e,i,a,r,s){t.events.push({type:he.SEQUENCE,start:n,anchorStart:e,anchorEnd:i,tagStart:a,tagEnd:r,style:s})}function Nl(t,n,e,i,a,r,s){t.events.push({type:he.MAPPING,start:n,anchorStart:e,anchorEnd:i,tagStart:a,tagEnd:r,style:s})}function ll(t,n){t.events.splice(n.eventsLength,0,{type:he.MAPPING,start:n.position,anchorStart:re,anchorEnd:re,tagStart:re,tagEnd:re,style:Le.FLOW})}function un(t,n,e,i,a,r,s,o,l=Me.CLIP,c=-1,h=!1){t.events.push({type:he.SCALAR,valueStart:n,valueEnd:e,anchorStart:i,anchorEnd:a,tagStart:r,tagEnd:s,style:o,chomping:l,indent:c,fast:h})}function Uh(t,n,e){t.events.push({type:he.ALIAS,anchorStart:n,anchorEnd:e})}function rn(t){t.events.push({type:he.POP})}function Te(t){un(t,re,re,re,re,re,re,V.PLAIN)}function dl(){return{anchorStart:re,anchorEnd:re,tagStart:re,tagEnd:re}}function sn(t){return{position:t.position,line:t.line,lineStart:t.lineStart,lineIndent:t.lineIndent,firstTabInLine:t.firstTabInLine,eventsLength:t.events.length}}function on(t,n){t.position=n.position,t.line=n.line,t.lineStart=n.lineStart,t.lineIndent=n.lineIndent,t.firstTabInLine=n.firstTabInLine,t.events.length=n.eventsLength}function K(t,n){ft.throwAt(t.input.slice(0,t.length),t.position,n,t.filename)}function we(t){return t===10||t===13}function hn(t){return t===9||t===32}function Ue(t){return hn(t)||we(t)}function rt(t){return t===0||Ue(t)}function Nt(t){return t===44||t===91||t===93||t===123||t===125}function qh(t){return t>=48&&t<=57?t-48:-1}function Zh(t){if(t>=48&&t<=57)return t-48;let n=t|32;return n>=97&&n<=102?n-97+10:-1}function Yh(t){return t===120?2:t===117?4:t===85?8:0}function Qh(t){return t===48||t===97||t===98||t===116||t===9||t===110||t===118||t===102||t===114||t===101||t===32||t===34||t===47||t===92||t===78||t===95||t===76||t===80}function ya(t){t.input.charCodeAt(t.position)===10?t.position++:(t.position++,t.input.charCodeAt(t.position)===10&&t.position++),t.line++,t.lineStart=t.position,t.lineIndent=0,t.firstTabInLine=-1}function Se(t,n){let e=0,i=t.input.charCodeAt(t.position),a=t.position===t.lineStart||Ue(t.input.charCodeAt(t.position-1));for(;i!==0;){for(;hn(i);)a=!0,i===9&&t.firstTabInLine===-1&&(t.firstTabInLine=t.position),i=t.input.charCodeAt(++t.position);if(n&&a&&i===35)do i=t.input.charCodeAt(++t.position);while(!we(i)&&i!==0);if(!we(i))break;for(ya(t),e++,a=!0,i=t.input.charCodeAt(t.position);i===32;)t.lineIndent++,i=t.input.charCodeAt(++t.position)}return e}function dn(t,n=t.position){let e=t.input.charCodeAt(n);if((e===45||e===46)&&e===t.input.charCodeAt(n+1)&&e===t.input.charCodeAt(n+2)){let i=t.input.charCodeAt(n+3);return i===0||Ue(i)}return!1}function Ml(t){t.position===t.lineStart&&t.input.charCodeAt(t.position)===65279&&(t.position++,t.lineStart=t.position)}function Kr(t){if(t.position!==t.lineStart)return!1;if(dn(t))return!0;if(t.input.charCodeAt(t.position)!==65279)return!1;let n=sn(t);Ml(t),Se(t,!0);let e=t.input.charCodeAt(t.position),i=t.position===t.lineStart&&(e===37||e===45&&dn(t));return on(t,n),i}function cl(t){let n=t.input.charCodeAt(t.position);for(;n!==0&&!we(n);)n=t.input.charCodeAt(++t.position)}function Cl(t,n,e){Wh.test(t.input.slice(n,e))&&K(t,"the stream contains non-printable characters")}function Jh(t,n,e){if(t.input.charCodeAt(t.position)!==33)return!1;n.tagStart!==re&&K(t,"duplication of a tag property");let i=t.position,a=!1,r=!1,s="!",o=t.input.charCodeAt(++t.position);o===60?(a=!0,o=t.input.charCodeAt(++t.position)):o===33&&(r=!0,s="!!",o=t.input.charCodeAt(++t.position));let l=t.position,c;if(a){for(;o!==0&&o!==62;)o=t.input.charCodeAt(++t.position);o!==62&&K(t,"unexpected end of the stream within a verbatim tag"),c=t.input.slice(l,t.position),t.position++}else{for(;o!==0&&!Ue(o)&&!(e&&Nt(o));)o===33&&(r?K(t,"tag suffix cannot contain exclamation marks"):(s=t.input.slice(l-1,t.position+1),Ll.test(s)||K(t,"named tag handle cannot contain such characters"),r=!0,l=t.position+1)),o=t.input.charCodeAt(++t.position);c=t.input.slice(l,t.position),Rh.test(c)&&K(t,"tag suffix cannot contain flow indicator characters")}return c&&!(a?Kh.test(c):Vh.test(c))&&K(t,`tag name cannot contain such characters: ${c}`),!a&&s!=="!"&&s!=="!!"&&!Tl.call(t.tagHandlers,s)&&K(t,`undeclared tag handle "${s}"`),n.tagStart=i,n.tagEnd=t.position,!0}function Xh(t,n){if(t.input.charCodeAt(t.position)!==38)return!1;n.anchorStart!==re&&K(t,"duplication of an anchor property"),t.position++;let e=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ue(t.input.charCodeAt(t.position))&&!Nt(t.input.charCodeAt(t.position));)t.position++;return t.position===e&&K(t,"name of an anchor node must contain at least one character"),n.anchorStart=e,n.anchorEnd=t.position,!0}function ep(t,n){if(t.input.charCodeAt(t.position)!==42)return!1;(n.anchorStart!==re||n.tagStart!==re)&&K(t,"alias node should not have any properties"),t.position++;let e=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ue(t.input.charCodeAt(t.position))&&!Nt(t.input.charCodeAt(t.position));)t.position++;return t.position===e&&K(t,"name of an alias node must contain at least one character"),Uh(t,e,t.position),!0}function Nr(t,n){Se(t,!1),t.lineIndent<n&&K(t,"deficient indentation")}function tp(t,n,e){if(t.input.charCodeAt(t.position)!==39)return!1;t.position++;let i=t.position,a=!0;for(;t.input.charCodeAt(t.position)!==0;){let r=t.input.charCodeAt(t.position);if(r===39){if(t.input.charCodeAt(t.position+1)===39){a=!1,t.position+=2;continue}let s=t.position;return t.position++,un(t,i,s,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,V.SINGLE_QUOTED,Me.CLIP,-1,a),!0}we(r)?(a=!1,Nr(t,n)):t.position===t.lineStart&&dn(t)?K(t,"unexpected end of the document within a single quoted scalar"):r!==9&&r<32?K(t,"expected valid JSON character"):t.position++}K(t,"unexpected end of the stream within a single quoted scalar")}function np(t,n,e){if(t.input.charCodeAt(t.position)!==34)return!1;t.position++;let i=t.position,a=!0;for(;t.input.charCodeAt(t.position)!==0;){let r=t.input.charCodeAt(t.position);if(r===34){let s=t.position;return t.position++,un(t,i,s,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,V.DOUBLE_QUOTED,Me.CLIP,-1,a),!0}if(r===92){a=!1;let s=t.input.charCodeAt(++t.position);if(we(s))Nr(t,n);else if(Qh(s))t.position++;else{let o=Yh(s);for(o===0&&K(t,"unknown escape sequence");o-- >0;)t.position++,Zh(t.input.charCodeAt(t.position))<0&&K(t,"expected hexadecimal character");t.position++}}else we(r)?(a=!1,Nr(t,n)):t.position===t.lineStart&&dn(t)?K(t,"unexpected end of the document within a double quoted scalar"):r!==9&&r<32?K(t,"expected valid JSON character"):t.position++}K(t,"unexpected end of the stream within a double quoted scalar")}function ip(t,n,e){let i=t.input.charCodeAt(t.position),a=Me.CLIP,r=-1,s=!1;if(i!==124&&i!==62)return!1;let o=i===124?V.LITERAL_BLOCK:V.FOLDED_BLOCK;for(t.position++;t.input.charCodeAt(t.position)!==0;){let b=t.input.charCodeAt(t.position),f=qh(b);if(b===43||b===45)a!==Me.CLIP&&K(t,"repeat of a chomping mode identifier"),a=b===43?Me.KEEP:Me.STRIP,t.position++;else if(f>=0)f===0&&K(t,"bad explicit indentation width of a block scalar; it cannot be less than one"),s&&K(t,"repeat of an indentation width identifier"),r=n+f-1,s=!0,t.position++;else break}let l=!1;for(;hn(t.input.charCodeAt(t.position));)l=!0,t.position++;l&&t.input.charCodeAt(t.position)===35&&cl(t),we(t.input.charCodeAt(t.position))?ya(t):t.input.charCodeAt(t.position)!==0&&K(t,"a line break is expected");let c=s?r:-1,h=0,p=t.position,g=t.position;for(;t.input.charCodeAt(t.position)!==0;){let b=t.position,f=0;for(;t.input.charCodeAt(b+f)===32;)f++;let v=t.input.charCodeAt(b+f);if(v===0){c>=0?f>c&&(g=b+f):f>0&&(g=b+f);break}if(Kr(t))break;if(!s&&c===-1&&we(v)&&(h=Math.max(h,f)),!s&&c===-1&&!we(v)&&(v===9&&f<n&&(t.position=b+f,K(t,"tab characters must not be used in indentation")),f>=n&&f<h&&(t.position=b+f,K(t,"bad indentation of a mapping entry"))),c===-1&&v!==0&&!we(v)&&f<n){t.lineIndent=f,t.position=b+f;break}!s&&v!==0&&!we(v)&&c===-1&&(c=f);let $=c===-1?n+1:c;if(v!==0&&!we(v)&&f<$){t.lineIndent=f,t.position=b+f;break}cl(t),g=t.position,we(t.input.charCodeAt(t.position))&&(ya(t),g=t.position)}return Cl(t,p,g),un(t,p,g,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,o,a,c),!0}function ap(t,n){let e=t.input.charCodeAt(t.position),i=n===ln;if(e===0||Ue(e)||e===35||e===38||e===42||e===33||e===124||e===62||e===39||e===34||e===37||e===64||e===96||i&&Nt(e))return!1;if(e===63||e===45){let a=t.input.charCodeAt(t.position+1);if(rt(a)||i&&Nt(a))return!1}return!0}function rp(t,n,e,i){if(!ap(t,e))return!1;let a=t.position,r=t.position,s=t.input.charCodeAt(t.position),o=e===ln,l=!1;for(;s!==0&&!Kr(t);){if(s===58){let c=t.input.charCodeAt(t.position+1);if(rt(c)||o&&Nt(c))break}else if(s===35){if(Ue(t.input.charCodeAt(t.position-1)))break}else{if(o&&Nt(s))break;if(we(s)){let c=t.position,h=t.line,p=t.lineStart,g=t.lineIndent;if(Se(t,!1),t.lineIndent>=n){l=!0,s=t.input.charCodeAt(t.position);continue}t.position=c,t.line=h,t.lineStart=p,t.lineIndent=g;break}}hn(s)||(r=t.position+1),s=t.input.charCodeAt(++t.position)}return r===a?!1:(Cl(t,a,r),un(t,a,r,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,V.PLAIN,Me.CLIP,-1,!l),!0)}function jn(t,n){let e=t.line;Se(t,!0),(t.line>e&&t.lineIndent<n||t.firstTabInLine!==-1&&t.lineIndent<n)&&K(t,"deficient indentation")}function sp(t,n,e){let i=t.input.charCodeAt(t.position),a=i===123,r=t.position,s=!0;if(i!==91&&i!==123)return!1;let o=a?125:93;for(a?Nl(t,r,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,Le.FLOW):Dl(t,r,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,Le.FLOW),t.position++;t.input.charCodeAt(t.position)!==0;){jn(t,n);let l=t.input.charCodeAt(t.position);if(l===o)return t.position++,rn(t),!0;s?l===44&&K(t,"expected the node content, but found ','"):K(t,"missed comma between flow collection entries");let c=!1,h=!1;l===63&&Ue(t.input.charCodeAt(t.position+1))&&(c=h=!0,t.position+=1,jn(t,n));let p=t.line,g=sn(t),b=cn(t,n,ln,!1,!0);jn(t,n),l=t.input.charCodeAt(t.position),(a||h||t.line===p)&&l===58?(c=!0,t.position++,jn(t,n),a||ll(t,g),b||Te(t),cn(t,n,ln,!1,!0)||Te(t),jn(t,n),a||rn(t)):a&&c?(b||Te(t),Te(t)):a?Te(t):c&&(ll(t,g),b||Te(t),Te(t),rn(t)),l=t.input.charCodeAt(t.position),l===44?(s=!0,t.position++):s=!1}K(t,"unexpected end of the stream within a flow collection")}function ul(t,n,e){if(t.firstTabInLine!==-1||t.input.charCodeAt(t.position)!==45||!rt(t.input.charCodeAt(t.position+1)))return!1;for(Dl(t,t.position,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,Le.BLOCK);t.input.charCodeAt(t.position)===45&&rt(t.input.charCodeAt(t.position+1));){t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,K(t,"tab characters must not be used in indentation"));let i=t.line;t.position++;let a=Se(t,!0)>0;if(t.firstTabInLine!==-1&&t.input.charCodeAt(t.position)===45&&rt(t.input.charCodeAt(t.position+1))&&K(t,"bad indentation of a sequence entry"),a&&t.lineIndent<=n?Te(t):cn(t,n,zl,!1,!0),Se(t,!0),t.lineIndent<n||t.position>=t.length)break;t.lineIndent>n&&K(t,"bad indentation of a sequence entry"),t.line===i&&t.input.charCodeAt(t.position)===45&&rt(t.input.charCodeAt(t.position+1))&&K(t,"bad indentation of a sequence entry")}return rn(t),!0}function Er(t,n,e,i){let a=!1,r=!1,s=!1,o=!1;if(t.firstTabInLine!==-1)return!1;let l=t.input.charCodeAt(t.position);for(;l!==0;){!a&&t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,K(t,"tab characters must not be used in indentation"));let c=t.input.charCodeAt(t.position+1),h=t.line;if((l===63||l===58)&&rt(c))s||(Nl(t,t.position,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,Le.BLOCK),s=!0),l===63?(a&&Te(t),r=!0,a=!0):(a||(Te(t),r=!0),a=!1),t.position+=1,o=!0;else{a&&(Te(t),a=!1);let p=sn(t);if(!cn(t,e,El,!1,!0))break;if(t.line===h){for(l=t.input.charCodeAt(t.position);hn(l);)l=t.input.charCodeAt(++t.position);if(l===58)l=t.input.charCodeAt(++t.position),rt(l)||K(t,"a whitespace character is expected after the key-value separator within a block mapping"),s||(t.events.splice(p.eventsLength,0,{type:he.MAPPING,start:p.position,anchorStart:i.anchorStart,anchorEnd:i.anchorEnd,tagStart:i.tagStart,tagEnd:i.tagEnd,style:Le.BLOCK}),s=!0),r=!0,a=!1,o=!1;else if(r)K(t,"expected ':' after a mapping key");else return i.anchorStart!==re||i.tagStart!==re?(on(t,p),!1):!0}else if(r)K(t,"can not read a block mapping entry; a multiline key may not be an implicit key");else return i.anchorStart!==re||i.tagStart!==re?(on(t,p),!1):!0}if(cn(t,n,va,!0,o)&&(o=!1),a||o&&(Te(t),o=!1),Se(t,!0),l=t.input.charCodeAt(t.position),(t.line===h||t.lineIndent>n)&&l!==0)K(t,"bad indentation of a mapping entry");else if(t.lineIndent<n)break}return r?(a&&Te(t),s&&rn(t),!0):!1}function cn(t,n,e,i,a,r=!0){t.depth>=t.maxDepth&&K(t,`nesting exceeded maxDepth (${t.maxDepth})`),t.depth++;let s=1,o=!1,l=!1,c=null,h=dl(),p=e===va||e===zl,g=p,b=p;if(i&&Se(t,!0)&&(o=!0,t.lineIndent>n?s=1:t.lineIndent===n?s=0:s=-1),s===1)for(;;){let f=t.input.charCodeAt(t.position),v=sn(t);if(o&&s!==1&&(f===33||f===38))break;if(o&&b&&(h.tagStart!==re||h.anchorStart!==re)&&(f===33||f===38)){let $=sn(t),I=n+1;if(Er(t,t.position-t.lineStart,I,h)&&t.events[$.eventsLength]?.type===he.MAPPING)return t.depth--,!0;on(t,$)}if(o&&(f===33&&h.tagStart!==re||f===38&&h.anchorStart!==re)||!Jh(t,h,e===ln)&&!Xh(t,h))break;c===null&&(c=v),Se(t,!0)?(o=!0,g=b,t.lineIndent>n?s=1:t.lineIndent===n?s=0:s=-1):g=!1}if(g&&(g=o||a),s===1||e===va){let f=e===ln||e===El?n:n+1,v=t.position-t.lineStart;if(s===1)if(g&&(ul(t,v,h)||Er(t,v,f,h))||sp(t,f,h))l=!0;else{let $=t.input.charCodeAt(t.position);if(c!==null&&r&&b&&!g&&$!==124&&$!==62){let I=sn(t),T=c.position-c.lineStart;on(t,c),Er(t,T,f,dl())&&t.events[I.eventsLength]?.type===he.MAPPING?l=!0:on(t,I)}!l&&(p&&ip(t,f,h)||tp(t,f,h)||np(t,f,h)||ep(t,h)||rp(t,f,e,h))&&(l=!0)}else s===0&&(l=g&&ul(t,v,h))}return p=p&&!l,!l&&(h.anchorStart!==re||h.tagStart!==re||p)&&(un(t,re,re,h.anchorStart,h.anchorEnd,h.tagStart,h.tagEnd,V.PLAIN),l=!0),t.depth--,l||h.anchorStart!==re||h.tagStart!==re}function op(t){if(t.lineIndent>0||t.input.charCodeAt(t.position)!==37)return!1;t.position++;let n=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ue(t.input.charCodeAt(t.position));)t.position++;let e=t.input.slice(n,t.position),i=[];for(e.length===0&&K(t,"directive name must not be less than one character in length");t.input.charCodeAt(t.position)!==0&&!we(t.input.charCodeAt(t.position));){for(;hn(t.input.charCodeAt(t.position));)t.position++;if(t.input.charCodeAt(t.position)===35||we(t.input.charCodeAt(t.position))||t.input.charCodeAt(t.position)===0)break;let a=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ue(t.input.charCodeAt(t.position));)t.position++;i.push(t.input.slice(a,t.position))}if(we(t.input.charCodeAt(t.position))&&ya(t),e==="YAML"){t.directives.some(r=>r.kind==="yaml")&&K(t,"duplication of %YAML directive"),i.length!==1&&K(t,"YAML directive accepts exactly one argument");let a=/^([0-9]+)\.([0-9]+)$/.exec(i[0]);a===null&&K(t,"ill-formed argument of the YAML directive"),parseInt(a[1],10)!==1&&K(t,"unacceptable YAML version of the document"),t.directives.push({kind:"yaml",version:i[0]})}else if(e==="TAG"){i.length!==2&&K(t,"TAG directive accepts exactly two arguments");let[a,r]=i;Ll.test(a)||K(t,"ill-formed tag handle (first argument) of the TAG directive"),Tl.call(t.tagHandlers,a)&&K(t,`there is a previously declared suffix for "${a}" tag handle`),jh.test(r)||K(t,"ill-formed tag prefix (second argument) of the TAG directive"),t.tagHandlers[a]=r,t.directives.push({kind:"tag",handle:a,prefix:r})}return!0}function lp(t){t.directives=[],t.tagHandlers=Object.create(null);let n=!1;for(Se(t,!0);op(t);)n=!0,Se(t,!0);let e=!1,i=!1,a=!0;if(t.lineIndent===0&&t.input.charCodeAt(t.position)===45&&t.input.charCodeAt(t.position+1)===45&&t.input.charCodeAt(t.position+2)===45&&rt(t.input.charCodeAt(t.position+3))){e=!0;let o=t.line;t.position+=3,Se(t,!0),a=t.line>o}else n&&K(t,"directives end mark is expected");let r=t.events.length;if(!e&&t.position===t.lineStart&&t.input.charCodeAt(t.position)===46&&dn(t)){t.position+=3,Se(t,!0);return}if(Gh(t,e,!1),cn(t,t.lineIndent-1,va,!1,a,a)||Te(t),Se(t,!0),t.position===t.lineStart&&dn(t)&&(i=t.input.charCodeAt(t.position)===46,i)){let o=t.line;t.position+=3,Se(t,!0),t.line===o&&t.position<t.length&&K(t,"end of the stream or a document separator is expected")}let s=t.events[r];s?.type===he.DOCUMENT&&(s.explicitEnd=i),rn(t),!i&&t.position<t.length&&!Kr(t)&&K(t,"end of the stream or a document separator is expected")}function dp(t,n){let e=t.length,i={...Rr,...n,input:`${t}\0`,length:e,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},a=t.indexOf("\0");for(a!==-1&&ft.throwAt(t,a,"null byte is not allowed in input",i.filename);i.position<i.length&&(Ml(i),Se(i,!0),!(i.position>=i.length));){let r=i.position;lp(i),i.position===r&&K(i,"can not read a document")}return i.events}var cp={...Rr,...Wr};function up(t,n={}){let e={...cp,...n},i=String(t),a=Object.keys(Rr),r=Object.keys(Wr);return Oh(dp(i,_r(e,a)),{..._r(e,r),source:i})}function Mt(t,n){let e=up(t,n);if(e.length===0)throw new ft("expected a document, but the input is empty");if(e.length===1)return e[0];throw new ft("expected a single document in the stream, but found more")}var Dt=Symbol("INVALID");function hp(t){let n=new Set([t.defaultScalarTag,t.defaultSequenceTag,t.defaultMappingTag].filter(r=>r!==void 0)),e=t.implicitScalarTags,i=t.tags.filter(r=>!(r.nodeKind==="scalar"&&r.implicit)&&!n.has(r)),a=t.tags.filter(r=>n.has(r));return[...e.map(r=>({tag:r,implicitTag:!0})),...i.map(r=>({tag:r,implicitTag:!1})),...a.map(r=>({tag:r,implicitTag:!0}))]}function pp(t,n){for(let e=0,i=t.representTypes.length;e<i;e+=1){let{tag:a,implicitTag:r}=t.representTypes[e];if(a.identify(n)){let s;return a.matchByTagPrefix?s=a.representTagName(n):s=a.tagName,{tag:a,tagName:s,implicitTag:r}}}return null}function Un(t,n){if(!t.noRefs&&n!==null&&typeof n=="object"){let c=t.refs.get(n);if(c)return c.anchor===void 0&&(c.anchor=`ref_${t.refCounter++}`),{kind:"alias",anchor:c.anchor}}let e=pp(t,n);if(!e){if(n===void 0||t.skipInvalid)return Dt;throw new ft(`unacceptable kind of an object to dump ${Object.prototype.toString.call(n)}`)}let{tag:i,tagName:a,implicitTag:r}=e,s=r?a:Sl(a);if(i.nodeKind==="scalar")return{kind:"scalar",tag:s,tagged:!r,style:V.PLAIN,value:i.represent(n)};if(i.nodeKind==="sequence"){let c=i.represent(n),h={kind:"sequence",tag:s,tagged:!r,style:Le.BLOCK,items:[]};t.noRefs||t.refs.set(n,h);for(let p=0,g=c.length;p<g;p+=1){let b=Un(t,c[p]);b===Dt&&c[p]===void 0&&(b=Un(t,null)),b!==Dt&&h.items.push(b)}return h}let o=i.represent(n),l={kind:"mapping",tag:s,tagged:!r,style:Le.BLOCK,items:[]};t.noRefs||t.refs.set(n,l);for(let[c,h]of o){let p=Un(t,c);if(p===Dt)continue;let g=Un(t,h);g!==Dt&&l.items.push({key:p,value:g})}return l}function mp(t,n,e={}){let i=Un({representTypes:hp(n),noRefs:e.noRefs??!1,skipInvalid:e.skipInvalid??!1,refs:new Map,refCounter:0},t);return[{contents:i===Dt?null:i,directives:[]}]}var gp=Symbol("visit:break"),Pl=Symbol("visit:skip");function fa(t,n,e){let i=n(t,e);if(i===gp)return!0;if(i===Pl)return!1;let a=e.depth+1;switch(t.kind){case"sequence":for(let r of t.items)if(fa(r,n,{depth:a,parent:t,isKey:!1}))return!0;break;case"mapping":for(let{key:r,value:s}of t.items)if(fa(r,n,{depth:a,parent:t,isKey:!0})||fa(s,n,{depth:a,parent:t,isKey:!1}))return!0;break}return!1}function hl(t,n){for(let e of t)if(e.contents&&fa(e.contents,n,{depth:0,parent:null,isKey:!1}))return}function $a(t,n){return(t&1<<n)!==0}var pl={applyQuoteFlowKeysOption:fp,doubleQuoteForInvisibles:bp,doubleQuoteWhitespaceOnly:vp,applyForceQuotesOption:yp,tryLongOrMultilineAsBlock:wp,quoteInvalidPlain:kp,fallbackToDoubleQuoted:xp};function Il(t){return t.presenterOptions.quoteStyle==="single"&&$a(t.allowedStylesMask,V.SINGLE_QUOTED)?V.SINGLE_QUOTED:V.DOUBLE_QUOTED}function fp(t){t.presenterOptions.quoteFlowKeys&&(!t.isKey||!t.flowOnly||t.style!==V.PLAIN||(t.style=V.DOUBLE_QUOTED))}function bp(t){t.style===V.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(t.node.value)&&(t.style=V.DOUBLE_QUOTED)}function vp(t){t.style===V.PLAIN&&/^\s+$/.test(t.node.value)&&(t.style=V.DOUBLE_QUOTED)}function yp(t){t.presenterOptions.forceQuotes&&(t.isKey||t.style!==V.PLAIN||t.node.tag===t.presenterOptions.schema.defaultScalarTag.tagName&&(t.style=t.node.value.includes(`
`)?V.DOUBLE_QUOTED:Il(t)))}function wp(t){if(t.style!==V.PLAIN||t.isKey)return;let n=t.node.value,e=n.indexOf(`
`)!==-1;if(!$a(t.allowedStylesMask,V.LITERAL_BLOCK)){e&&(t.style=V.DOUBLE_QUOTED);return}let i=t.presenterOptions.lineWidth;if(i===-1){e&&(t.style=V.LITERAL_BLOCK);return}let a=Math.max(Math.min(i,40),i-t.shiftOfContent),r=0,s=!1;for(;r<=n.length;){let o=n.length,l=n.indexOf(`
`,r);l!==-1&&(o=l);let c=n.slice(r,o);if(c.length>a&&c[0]!==" "&&/ [^ \t]/.test(c)&&(s=!0),l===-1)break;r=l+1}s?t.style=V.FOLDED_BLOCK:e&&(t.style=V.LITERAL_BLOCK)}function kp(t){t.style===V.PLAIN&&!$a(t.allowedStylesMask,V.PLAIN)&&(t.style=Il(t))}function xp(t){$a(t.allowedStylesMask,t.style)||(t.style=V.DOUBLE_QUOTED)}function Gn(t,n){return t|1<<n}var Sp="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",$p="[\\n\\r]",Ap="\\uFEFF",Vr="[ \\t]",Fl=`(?:(?!(?:${$p}|${Ap}))${Sp})`,Aa=`(?:(?!${Vr})${Fl})`,Bl="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",Hl="[-?:,\\[\\]{}#&*!|>'\"%@`]",Tp="[,\\[\\]{}]",Mr=Aa,Cr=`(?:(?!${Tp})${Aa})`,Ep=`(?:(?:(?!${Hl})${Aa})|[?:-](?=${Mr}))`,zp=`(?:(?:(?!${Hl})${Aa})|[?:-](?=${Cr}))`,Ol=`(?:(?:(?![:#])${Mr})|:(?=${Mr}))#*`,Wl=`(?:(?:(?![:#])${Cr})|:(?=${Cr}))#*`,Rl=`(?:${Vr}*${Ol})*`,Kl=`(?:${Vr}*${Wl})*`,Vl=`${Ep}#*${Rl}`,jl=`${zp}#*${Kl}`,Lp=Vl,_p=jl,Dp=`\\n+${Ol}${Rl}`,Np=`\\n+${Wl}${Kl}`,Mp=`${Vl}(?:${Dp})*`,Cp=`${jl}(?:${Np})*`,Pp=new RegExp(`^(?:${Mp})$`,"u"),Ip=new RegExp(`^(?:${Cp})$`,"u"),Fp=new RegExp(`^(?:${Lp})$`,"u"),Bp=new RegExp(`^(?:${_p})$`,"u"),Hp=new RegExp(`^(?:${Bl})*$`,"u"),Op=new RegExp(`^(?:${Bl}|\\n)*$`,"u"),Wp=new RegExp(`^(?:${Fl}|\\n)*$`,"u"),Rp=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/,jr=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;function Kp(t){let n=t.node.value;if(n!==""){if(!(t.isKey?t.flowOnly?Bp:Fp:t.flowOnly?Ip:Pp).test(n)||t.shiftOfFirstLine===0&&Rp.test(n))return!1;if(t.shiftOfContent===0){let i=n.indexOf(`
`);if(i!==-1){let a=n.slice(i+1);if(jr.test(a))return!1}}}let e=t.presenterOptions.schema.resolveImplicitScalarTag(n).tag.tagName;return!(!t.node.tagged&&e!==t.node.tag||!t.node.tagged&&n==="="&&e===t.presenterOptions.schema.defaultScalarTag.tagName)}function Vp(t){let n=t.node.value;if(!(t.isKey?Hp:Op).test(n)||/[ \t]\n|\n[ \t]/.test(n))return!1;if(!t.isKey&&t.shiftOfContent===0){let e=n.indexOf(`
`);if(e!==-1&&jr.test(n.slice(e+1)))return!1}return!0}function jp(t){if(t.flowOnly||!Wp.test(t.node.value))return!1;let n=t.shiftOfContent-t.shiftOfParent;return!(n<1||n>9&&/^\n* /.test(t.node.value)||t.shiftOfContent===0&&jr.test(t.node.value))}function Gp(t){let n=Gn(0,V.DOUBLE_QUOTED);Kp(t)&&(n=Gn(n,V.PLAIN)),Vp(t)&&(n=Gn(n,V.SINGLE_QUOTED)),jp(t)&&(n=Gn(Gn(n,V.LITERAL_BLOCK),V.FOLDED_BLOCK)),t.allowedStylesMask=n}function Up(t){switch(t.style){case V.PLAIN:return qp(t);case V.SINGLE_QUOTED:return Zp(t);case V.LITERAL_BLOCK:return Yp(t);case V.FOLDED_BLOCK:return Qp(t);case V.DOUBLE_QUOTED:return Jp(t)}}function qp(t){return Gl(t.node.value,t.shiftOfContent)}function Zp(t){return`'${Gl(t.node.value,t.shiftOfContent).replace(/'/g,"''")}'`}function Yp(t){let n=t.node.value;return"|"+ql(n,t.shiftOfParent,t.shiftOfContent)+Zl(Ul(n,t.shiftOfContent))}function Qp(t){let n=t.node.value,e=t.presenterOptions.lineWidth,i=1/0;return e!==-1&&(i=Math.max(Math.min(e,40),e-t.shiftOfContent)),">"+ql(n,t.shiftOfParent,t.shiftOfContent)+Zl(Ul(em(n,i),t.shiftOfContent))}function Jp(t){return`"${im(t.node.value)}"`}function Gl(t,n){let e=t.indexOf(`
`);if(e===-1)return t;let i=" ".repeat(n),a=t.slice(0,e),r=/(\n+)([^\n]*)/g;r.lastIndex=e;let s;for(;s=r.exec(t);){let o=s[1].length,l=s[2];a+=`
`.repeat(o+1)+i+l}return a}function Ul(t,n){let e=" ".repeat(n),i=0,a="",r=t.length;for(;i<r;){let s,o=t.indexOf(`
`,i);o===-1?(s=t.slice(i),i=r):(s=t.slice(i,o+1),i=o+1),s.length&&s!==`
`&&(a+=e),a+=s}return a}function Xp(t){return/^\n* /.test(t)}function ql(t,n,e){let i=Xp(t)?String(e-n):"",a=t[t.length-1]===`
`;return`${i}${a&&(t[t.length-2]===`
`||t===`
`)?"+":a?"":"-"}
`}function Zl(t){return t[t.length-1]===`
`?t.slice(0,-1):t}function Pr(t){return t===" "||t==="	"}function ml(t,n){if(t===""||Pr(t[0]))return t;let e=/ [^ \t]/g,i,a=0,r,s=0,o=0,l="";for(;i=e.exec(t);)o=i.index,o-a>n&&(r=s>a?s:o,l+=`
${t.slice(a,r)}`,a=r+1),s=o;return l+=`
`,t.length-a>n&&s>a?l+=`${t.slice(a,s)}
${t.slice(s+1)}`:l+=t.slice(a),l.slice(1)}function em(t,n){let e=/(\n+)([^\n]*)/g,i=t.indexOf(`
`);i===-1&&(i=t.length),e.lastIndex=i;let a=ml(t.slice(0,i),n),r=t[0]===`
`||Pr(t[0]),s,o;for(;o=e.exec(t);){let l=o[1],c=o[2];s=c!==""&&Pr(c[0]),a+=l+(!r&&!s&&c!==""?`
`:"")+ml(c,n),r=s}return a}var tm=/["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;function nm(t){switch(t){case"\0":return"\\0";case"\x07":return"\\a";case"\b":return"\\b";case"	":return"\\t";case`
`:return"\\n";case"\v":return"\\v";case"\f":return"\\f";case"\r":return"\\r";case"\x1B":return"\\e";case'"':return'\\"';case"\\":return"\\\\";case"\x85":return"\\N";case"\xA0":return"\\_";case"\u2028":return"\\L";case"\u2029":return"\\P"}let n=t.charCodeAt(0),e=n.toString(16).toUpperCase();return n<=255?`\\x${"0".repeat(2-e.length)}${e}`:`\\u${"0".repeat(4-e.length)}${e}`}function im(t){return t.replace(tm,nm)}var wa=10,Gr={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(pl).map(t=>Reflect.get(pl,t)),tagBeforeAnchor:!1};function am(t){return t.tagged?t.tag:Sl(t.tag)}function rm(t){let n={...Gr,...t};return n.flowSkipColonSpace&&(n.quoteFlowKeys=!0),{...n,defaultScalarTagName:n.schema.defaultScalarTag.tagName,openEnded:!1}}function Ir(t,n){return`
${" ".repeat(t.indent*n)}`}function sm(t,n,e,i,a,r){return{node:n,parent:e,level:i,isKey:a,flowOnly:r,shiftOfParent:i===0?-1:t.indent*(i-1),shiftOfContent:t.indent*Math.max(1,i),shiftOfFirstLine:i===0?0:t.indent*i,presenterOptions:t,allowedStylesMask:0,style:n.style}}function om(t,n,e){let i="";for(let r=0,s=e.items.length;r<s;r+=1){let o=st(t,n,e.items[r],e,{}).text;r>0&&(i+=`,${t.flowSkipCommaSpace?"":" "}`),i+=o}let a=t.flowBracketPadding&&e.items.length>0?" ":"";return`[${a}${i}${a}]`}function gl(t,n,e,i){let a="";for(let r=0,s=e.items.length;r<s;r+=1){let o=st(t,n+1,e.items[r],e,{block:!0,compact:t.seqInlineFirst,isblockseq:!0}).text;(!i||a!=="")&&(a+=Ir(t,n)),o===""||wa===o.charCodeAt(0)?a+="-":a+="- ",a+=o}return a}function lm(t,n,e){let i="";for(let{key:r,value:s}of e.items){let o="";i!==""&&(o+=`,${t.flowSkipCommaSpace?"":" "}`);let l=st(t,n,r,e,{iskey:!0}),c=l.text,h=st(t,n,s,e,{}).text,p=t.flowSkipColonSpace||h===""?"":" ",g=r.kind==="scalar"&&l.noBody&&(r.tagged||r.anchor!==void 0),b=r.kind==="alias"||g?" ":"";o+=`${c}${b}:${p}${h}`,i+=o}let a=t.flowBracketPadding&&i!==""?" ":"";return`{${a}${i}${a}}`}function dm(t,n,e,i){let a="";for(let r=0,s=e.items.length;r<s;r+=1){let o="";(!i||a!=="")&&(o+=Ir(t,n));let{key:l,value:c}=e.items[r],h=(l.kind==="mapping"||l.kind==="sequence")&&l.style===Le.BLOCK&&l.items.length!==0||l.kind==="scalar"&&(l.style===V.LITERAL_BLOCK||l.style===V.FOLDED_BLOCK),p=h?st(t,n+1,l,e,{block:!0,compact:!0,isblockseq:!Fr(t,l,n+1)}):st(t,n+1,l,e,{block:!0,compact:!0,iskey:!0}),g=p.text,b=l.kind==="scalar"&&l.value.indexOf(`
`)!==-1,f=g.length>1024&&/^[\s\S]{1025}/u.test(g),v=h||b||f;v&&(g&&wa===g.charCodeAt(0)?o+="?":o+="? "),o+=g,v&&(o+=Ir(t,n));let $=st(t,n+1,c,e,{block:!0,compact:v,isblockseq:v&&!Fr(t,c,n+1)}).text,I=l.kind==="scalar"&&p.noBody&&(l.tagged||l.anchor!==void 0),T=!v&&(l.kind==="alias"||I)?" ":"";$===""||wa===$.charCodeAt(0)?o+=`${T}:`:o+=`${T}: `,o+=$,a+=o}return a}function Fr(t,n,e){return n.kind==="alias"?!0:n.tagged||n.anchor!==void 0||t.indent<2&&e>0}function st(t,n,e,i,a){if(e.kind==="alias")return t.openEnded=!1,{text:`*${e.anchor}`,noBody:!1};let{block:r=!1,iskey:s=!1,isblockseq:o=!1}=a,l=a.compact??!1,c=e.anchor!==void 0;Fr(t,e,n)&&(l=!1);let h,p=e.tagged,g=r&&(e.kind==="mapping"||e.kind==="sequence")&&e.style===Le.BLOCK&&e.items.length!==0;if(e.kind==="mapping")g?h=dm(t,n,e,l):h=lm(t,n,e);else if(e.kind==="sequence")g?t.seqNoIndent&&!o&&n>0?h=gl(t,n-1,e,l):h=gl(t,n,e,l):h=om(t,n,e);else{let v=sm(t,e,i,n,s,!r);Gp(v);for(let $ of t.scalarStyleRules)$(v);h=Up(v),t.openEnded=(v.style===V.LITERAL_BLOCK||v.style===V.FOLDED_BLOCK)&&(e.value===`
`||e.value.endsWith(`

`)),p=e.tagged||h===""&&v.flowOnly&&i?.kind==="sequence"&&!c||v.style!==V.PLAIN&&e.tag!==t.defaultScalarTagName}(e.kind==="mapping"||e.kind==="sequence")&&!g&&(t.openEnded=!1),g&&l&&n>0&&t.indent>2&&(h=`${" ".repeat(t.indent-2)}${h}`);let b=h==="",f=h;if(p||c){let v=[],$=p?am(e):null,I=c?`&${e.anchor}`:null;t.tagBeforeAnchor?($!==null&&v.push($),I!==null&&v.push(I)):(I!==null&&v.push(I),$!==null&&v.push($));let T=h===""||h.charCodeAt(0)===wa?"":" ";f=`${v.join(" ")}${T}${h}`}return{text:f,noBody:b}}function cm(t){return(t.kind==="sequence"||t.kind==="mapping")&&t.style===Le.BLOCK&&t.items.length!==0&&!t.tagged&&t.anchor===void 0}function um(t){let n="";for(let e of t.directives){if(e.kind==="yaml"){n+=`%YAML ${e.version}
`;continue}let{handle:i,prefix:a}=e;n+=`%TAG ${i} ${a}
`}return n}function hm(t,n){let e=rm(n),i="",a=!1;for(let r=0;r<t.length;r+=1){let s=t[r];e.openEnded=!1;let o=um(s),l=o!=="",c=s.explicitStart||l||r>0&&!a;if(i+=o,s.contents===null)c&&(i+=`---
`);else if(c){let h=st(e,0,s.contents,null,{block:!0,compact:!0}).text,p=h===""?"":l||cm(s.contents)?`
`:" ";i+=`---${p}${h}
`}else i+=st(e,0,s.contents,null,{block:!0,compact:!0}).text+`
`;a=s.explicitEnd||e.openEnded,a&&(i+=`...
`)}return i}var pm={...Gr,schema:Sh,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};function mm(t,n){let e=String(t),i=String(n);return e<i?-1:e>i?1:0}function bt(t,n={}){let e={...pm,...n},i=mp(t,e.schema,{noRefs:e.noRefs,skipInvalid:e.skipInvalid});if(e.flowLevel>=0&&hl(i,(a,r)=>{if(!(r.depth<e.flowLevel))return(a.kind==="sequence"||a.kind==="mapping")&&(a.style=Le.FLOW),Pl}),e.sortKeys){let a=e.sortKeys===!0?mm:e.sortKeys;hl(i,r=>{r.kind==="mapping"&&r.items.sort((s,o)=>a(s.key.kind==="scalar"?s.key.value:"",o.key.kind==="scalar"?o.key.value:""))})}return e.transform(i),hm(i,{..._r(e,Object.keys(Gr)),schema:e.schema})}var iy=he.DOCUMENT,ay=he.SEQUENCE,ry=he.MAPPING,sy=he.SCALAR,oy=he.ALIAS,ly=he.POP,dy=V.PLAIN,cy=V.SINGLE_QUOTED,uy=V.DOUBLE_QUOTED,hy=V.LITERAL_BLOCK,py=V.FOLDED_BLOCK,my=Le.BLOCK,gy=Le.FLOW,fy=Me.CLIP,by=Me.STRIP,vy=Me.KEEP;var qn=class extends oe{constructor(){super(...arguments);this.pageId="";this.displayId="";this.selected=null;this.selection=[];this.orientation="landscape";this.grid=!0;this.scale=.5;this.resize=new ResizeObserver(()=>this.measure())}get stage(){return fe[this.orientation]}measure(){let e=this.stage,i=Math.max(320,window.innerHeight-220),a=Math.min(this.offsetWidth/e.w,i/e.h);a>0&&Math.abs(a-this.scale)>.001&&(this.scale=a)}willUpdate(e){e.has("orientation")&&this.measure()}connectedCallback(){super.connectedCallback(),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resize.disconnect()}emit(e,i){this.dispatchEvent(new CustomEvent(e,{detail:i}))}down(e,i,a,r,s){if(e.stopPropagation(),e.preventDefault(),r==="move"&&(e.shiftKey||e.metaKey||e.ctrlKey)){this.emit("select",{id:i.id,toggle:!0});return}let o=r==="move"&&this.selection.length>1&&this.selection.includes(i.id)?this.selection:[i.id];this.emit("select",{id:i.id,keep:o.length>1});let l=o.filter(c=>s[c]).map(c=>({id:c,pos:{...s[c]}}));this.drag={id:i.id,mode:r,x0:e.clientX,y0:e.clientY,orig:{...a},group:l},e.currentTarget.setPointerCapture(e.pointerId)}move(e){let i=this.drag;if(!i)return;let a=this.stage,r=br((e.clientX-i.x0)/this.scale/((a.w-2*a.padX+a.gap)/a.cols)),s=br((e.clientY-i.y0)/this.scale/((a.h-2*a.padY+a.gap)/a.rows)),o=i.orig;if(i.mode==="resize"){let p={x:o.x,y:o.y,w:Math.min(Math.max(zt,o.w+r),a.cols-o.x),h:Math.min(Math.max(zt,o.h+s),a.rows-o.y)};this.emit("move",{moves:[{id:i.id,...p}],done:!1});return}let l=i.group.map(p=>p.pos),c=Math.min(Math.max(r,-Math.min(...l.map(p=>p.x))),Math.min(...l.map(p=>a.cols-p.x-p.w))),h=Math.min(Math.max(s,-Math.min(...l.map(p=>p.y))),Math.min(...l.map(p=>a.rows-p.y-p.h)));this.emit("move",{moves:i.group.map(({id:p,pos:g})=>({id:p,x:g.x+c,y:g.y+h,w:g.w,h:g.h})),done:!1})}guides(e){let i=this.drag;if(!i)return{v:[],h:[]};let a=this.stage,r=new Set(i.group.map(g=>g.id)),s=g=>{let b=en(a,g);return{v:[b.left,b.left+b.width/2,b.left+b.width],h:[b.top,b.top+b.height/2,b.top+b.height]}},o=Object.entries(e).filter(([g])=>r.has(g)).map(([,g])=>s(g)),l=Object.entries(e).filter(([g])=>!r.has(g)).map(([,g])=>s(g)),c=(g,b)=>g.filter(f=>b.some(v=>Math.abs(f-v)<.5)),h=new Set,p=new Set;for(let g of o)for(let b of l)c(g.v,b.v).forEach(f=>h.add(f)),c(g.h,b.h).forEach(f=>p.add(f));return{v:[...h],h:[...p]}}up(){this.drag&&(this.emit("move",{moves:[],done:!0}),this.drag=void 0)}render(){let e=this.config?.pages.find(l=>l.id===this.pageId),i=this.scale,a=this.stage,r=Lt(e?.widgets??[],this.orientation),s=this.guides(r),o=this.selection.length>1;return u`<div class="frame" style="width:${a.w*i}px;height:${a.h*i}px">
      <af-display
        preview
        .hass=${this.hass}
        .config=${this.config}
        display-id=${this.displayId}
        .fixedPage=${this.pageId}
        .forceOrientation=${this.orientation}
      ></af-display>
      <div class="edit" @pointerdown=${()=>this.emit("select",{id:null})} @pointermove=${this.move} @pointerup=${this.up} @pointercancel=${this.up}>
        ${this.grid?Array.from({length:a.cols*a.rows},(l,c)=>{let h=en(a,{x:c%a.cols,y:Math.floor(c/a.cols),w:1,h:1});return u`<i class="cell" style="left:${h.left*i}px;top:${h.top*i}px;width:${h.width*i}px;height:${h.height*i}px"
                ><b class="half v"></b><b class="half h"></b
              ></i>`}):m}
        ${(e?.widgets??[]).map(l=>{let c=r[l.id];if(!c)return m;let h=en(a,c),p=this.selected===l.id||this.selection.includes(l.id),g=!nt(this.hass,l.show_if,{display:this.displayId,orientation:this.orientation});return u`<div
            class="box ${p?"sel":""} ${g?"hidden":""}"
            style="left:${h.left*i}px;top:${h.top*i}px;width:${h.width*i}px;height:${h.height*i}px"
            @pointerdown=${b=>this.down(b,l,c,"move",r)}
          >
            <span class="tag">${d(Ke[l.type]?.name??l.type)}${g?` \xB7 ${d("bedingt")}`:""}</span>
            ${p&&!o?u`<span class="handle" @pointerdown=${b=>this.down(b,l,c,"resize",r)}></span>`:m}
          </div>`})}
        ${s.v.map(l=>u`<i class="guide v" style="left:${l*i}px"></i>`)}
        ${s.h.map(l=>u`<i class="guide h" style="top:${l*i}px"></i>`)}
      </div>
    </div>`}};qn.properties={hass:{attribute:!1},config:{attribute:!1},pageId:{attribute:!1},displayId:{attribute:!1},selected:{attribute:!1},selection:{attribute:!1},orientation:{attribute:!1},scale:{state:!0},grid:{type:Boolean}},qn.styles=C`
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
    /* Halbe Zellen: feine Hilfslinien in der Mitte jeder Zelle */
    .cell .half {
      position: absolute;
      background: rgba(255, 255, 255, 0.04);
    }
    .cell .half.v {
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
    }
    .cell .half.h {
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
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
  `;B("af-canvas",qn);var gm=new Set(["attribute","text_attribute","decimals","unit","min","max","cold","warm","refresh","radius","speed","interval","cooldown","hold_after","period","timeout","volume","event_types","quiet_action","show_if","css","typeface","from","sub","secondary","transition","watchdog","pause_minutes","ambient"]),fm=t=>t.advanced??gm.has(t.key.split(".").pop()??""),Ct={displays:[],pages:[]},bm=(t,n)=>n.split(".").reduce((e,i)=>e?.[i],t),Ql=(t,n,e)=>{let[i,...a]=n.split("."),r={...t??{}};return a.length?(r[i]=Ql(r[i]??{},a.join("."),e),Object.keys(r[i]).length||delete r[i]):e===void 0||e===""?delete r[i]:r[i]=e,r},Yl,vm=()=>{if(customElements.get("ha-entity-picker"))return Promise.resolve(!0);let t=window;return t.loadCardHelpers?(Yl??=(async()=>{try{return await(await(await t.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),await Promise.race([customElements.whenDefined("ha-entity-picker"),new Promise(i=>setTimeout(i,4e3))]),!!customElements.get("ha-entity-picker")}catch{return!1}})(),Yl):Promise.resolve(!1)},ym=["state","not_state","numeric","within_days","changed"],wm=[{key:"condition",label:"Art",type:"select",options:[["state","Zustand ist"],["not_state","Zustand ist nicht"],["numeric","Zahl \xFCber/unter"],["changed","K\xFCrzlich ge\xE4ndert"],["within_days","Termin in den n\xE4chsten Tagen"],["any_state","Eine von mehreren ist"],["time","Uhrzeit von \u2013 bis"],["or","Mindestens eine von \u2026 (oder)"],["and","Alle von \u2026 (und)"],["not","Keine von \u2026 (nicht)"],["template","Vorlage (Jinja)"],["display","Nur auf Display \u2026"],["orientation","Nur im Hoch-/Querformat"]]},{key:"after",label:"ab",type:"text",placeholder:"05:00",when:t=>t.condition==="time"},{key:"before",label:"bis",type:"text",placeholder:"11:00",when:t=>t.condition==="time"},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>ym.includes(t.condition)},{key:"entities",label:"Entit\xE4ten",type:"entities",when:t=>t.condition==="any_state"},{key:"state",label:"Zustand",type:"text",placeholder:"on",when:t=>["state","not_state","any_state"].includes(t.condition)},{key:"minutes",label:"in den letzten \u2026 Minuten",type:"number",min:1,placeholder:"10",when:t=>t.condition==="changed"},{key:"state",label:"zu Zustand (optional)",type:"text",placeholder:"beliebig",when:t=>t.condition==="changed"},{key:"attribute",label:"Attribut (optional)",type:"text",when:t=>["state","not_state","numeric","within_days"].includes(t.condition)},{key:"above",label:"\xFCber",type:"number",when:t=>t.condition==="numeric"},{key:"below",label:"unter",type:"number",when:t=>t.condition==="numeric"},{key:"days",label:"Tage",type:"number",min:0,when:t=>t.condition==="within_days"},{key:"value_template",label:"Vorlage",type:"textarea",placeholder:"{{ is_state('person.alex', 'home') and now().hour >= 18 }}",help:"Erf\xFCllt bei true, on, Zahl \u2260 0",when:t=>t.condition==="template"},{key:"displays",label:"Displays",type:"multi",options:()=>Ct.displays,when:t=>t.condition==="display"},{key:"orientation",label:"Format",type:"select",options:[["landscape","Querformat"],["portrait","Hochformat"]],when:t=>t.condition==="orientation"},{key:"conditions",label:"",type:"conditions",when:t=>["and","or","not"].includes(t.condition)}],Ur=t=>{let n=e=>Array.isArray(e)?e.join("/"):String(e??"");switch(t.condition){case"state":return`${t.entity??"\u2026"} = ${n(t.state)}`;case"not_state":return`${t.entity??"\u2026"} \u2260 ${n(t.state)}`;case"numeric":return`${t.entity??"\u2026"}${t.above!==void 0?` > ${t.above}`:""}${t.below!==void 0?` < ${t.below}`:""}`;case"changed":return d("{entity} ge\xE4ndert ({n} min)",{entity:t.entity??"\u2026",n:t.minutes??10});case"within_days":return d("{entity} in {n} Tagen",{entity:t.entity??"\u2026",n:t.days??0});case"any_state":return d("eine von {n} = {state}",{n:(t.entities??[]).length,state:n(t.state)});case"time":return d("Uhrzeit {from}\u2013{to}",{from:t.after??"\u2026",to:t.before??"\u2026"});case"or":case"and":case"not":return`${d({or:"oder",and:"und",not:"nicht"}[t.condition])} (${(t.conditions??[]).length})`;case"template":return d("Vorlage");case"display":return d("nur auf {names}",{names:(t.displays??[]).map(e=>Ct.displays.find(([i])=>i===e)?.[1]??e).join(", ")||"\u2026"});case"orientation":return t.orientation==="portrait"?d("nur Hochformat"):d("nur Querformat");default:return d("Bedingung")}},Zn=class extends oe{constructor(){super();this.fields=[];this.value={};this.advanced=!0;this.pickers=!!customElements.get("ha-entity-picker");this.addEventListener("value-changed",e=>{e.composedPath()[0]!==this&&e.stopImmediatePropagation()})}connectedCallback(){super.connectedCallback(),this.pickers||vm().then(e=>this.pickers=e)}emit(e){this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e}}))}set(e,i){this.emit(Ql(this.value,e,i))}entityInput(e,i,a,r=""){if(this.pickers&&this.hass)return u`<ha-entity-picker
        .hass=${this.hass}
        .value=${e??""}
        .includeDomains=${i}
        allow-custom-entity
        @value-changed=${l=>a(l.detail.value||void 0)}
      ></ha-entity-picker>`;let s=`ents-${(i??["alle"]).join("-")}`,o=e?this.hass?.states[e]?.attributes.friendly_name:void 0;return u`<input
        list=${s}
        .value=${e??""}
        placeholder=${r||(i?`${i.join(", ")}.\u2026`:"entity_id")}
        @change=${l=>a(l.target.value.trim()||void 0)}
      />${o?u`<div class="hint">${o}</div>`:m}`}datalists(){if(this.pickers||!this.hass)return[];let e=new Set;(r=>r.forEach(s=>{(s.type==="entity"||s.type==="entities"||s.type==="autolist")&&e.add(("domains"in s&&s.domains||["alle"]).join("-")),s.type==="conditions"&&e.add("alle")}))(this.fields);let a=Object.keys(this.hass.states).sort();return[...e].map(r=>{let s=r==="alle"?null:r.split("-"),o=s?a.filter(l=>s.includes(l.split(".")[0])):a;return u`<datalist id=${`ents-${r}`}>${o.map(l=>u`<option value=${l}>${this.hass.states[l].attributes.friendly_name??""}</option>`)}</datalist>`})}renderList(e,i,a){let r=(s,o)=>{let l=[...i],[c]=l.splice(s,1);l.splice(s+o,0,c),a(l)};return u`<div class="list">
      ${i.map((s,o)=>u`<div class="item">
          <div class="item-head">
            <span>${d(e.itemLabel?.(s,o)??`#${o+1}`)}</span>
            <span class="tools">
              <button title=${d("nach oben")} ?disabled=${o===0} @click=${()=>r(o,-1)}>↑</button>
              <button title=${d("nach unten")} ?disabled=${o===i.length-1} @click=${()=>r(o,1)}>↓</button>
              <button title=${d("entfernen")} @click=${()=>a(i.filter((l,c)=>c!==o))}>✕</button>
            </span>
          </div>
          <af-form
            .hass=${this.hass}
            .advanced=${this.advanced}
            .fields=${e.fields}
            .value=${s??{}}
            @value-changed=${l=>a(i.map((c,h)=>h===o?l.detail.value:c))}
          ></af-form>
        </div>`)}
      <button class="add" @click=${()=>a([...i,e.newItem?.()??{}])}>+ ${d(e.addLabel??"Hinzuf\xFCgen")}</button>
    </div>`}renderField(e){if(e.when&&!e.when(this.value))return m;if(!this.advanced&&fm(e))return m;let i=bm(this.value,e.key),a;switch(e.type){case"text":{let s=e.suggestions?.length?`sug-${e.key.replace(/\W/g,"-")}`:void 0;a=u`<input
            .value=${i??""}
            list=${s??m}
            placeholder=${d(e.placeholder??"")}
            @input=${o=>this.set(e.key,o.target.value||void 0)}
          />${s?u`<datalist id=${s}>${e.suggestions.map(([o,l])=>u`<option value=${o}>${d(l)}</option>`)}</datalist>`:m}`;break}case"textarea":a=u`<textarea rows="3" .value=${i??""} @input=${s=>this.set(e.key,s.target.value||void 0)}></textarea>`;break;case"number":a=u`<input
          type="number"
          .value=${i??""}
          min=${e.min??""}
          max=${e.max??""}
          step=${e.step??"any"}
          placeholder=${d(e.placeholder??"")}
          @input=${s=>{let o=s.target.value;this.set(e.key,o===""?void 0:Number(o))}}
        />`;break;case"boolean":a=u`<label class="switch"
          ><input type="checkbox" .checked=${i??e.default??!1} @change=${s=>this.set(e.key,s.target.checked)} /><span></span
        ></label>`;break;case"select":{let s=typeof e.options=="function"?e.options(this.value):e.options;a=u`<select
          @change=${o=>{let l=o.target.selectedIndex;this.set(e.key,s[l][0])}}
        >
          ${s.map(([o,l])=>u`<option ?selected=${i===o||i===void 0&&o===void 0}>${d(l)}</option>`)}
        </select>`;break}case"icon":a=customElements.get("ha-icon-picker")&&this.hass?u`<ha-icon-picker .hass=${this.hass} .value=${i??""} @value-changed=${s=>this.set(e.key,s.detail.value||void 0)}></ha-icon-picker>`:u`<div class="with-icon">
              <span class="preview">${G(i)}</span>
              <input .value=${i??""} placeholder=${d("mdi:\u2026 oder washer, car, bell \u2026")} @change=${s=>this.set(e.key,s.target.value||void 0)} />
            </div>`;break;case"color":a=u`<div class="with-icon">
          <input type="color" .value=${/^#[0-9a-f]{6}$/i.test(i??"")?i:"#d9b45f"} @input=${s=>this.set(e.key,s.target.value)} />
          <input .value=${i??""} placeholder=${d("Standard")} @change=${s=>this.set(e.key,s.target.value||void 0)} />
        </div>`;break;case"entity":a=this.entityInput(i,e.domains,s=>this.set(e.key,s),e.placeholder);break;case"entities":{let s=Array.isArray(i)?i:[];a=u`<div class="chips">
            ${s.map(o=>u`<span class="chip">${this.hass?.states[o]?.attributes.friendly_name??o}<button @click=${()=>this.set(e.key,s.filter(l=>l!==o))}>✕</button></span>`)}
          </div>
          ${this.entityInput(void 0,e.domains,o=>o&&!s.includes(o)&&this.set(e.key,[...s,o]),d("Entit\xE4t hinzuf\xFCgen \u2026"))}`;break}case"multi":{let s=Array.isArray(i)?i:[];a=u`<div class="chips">
          ${e.options(this.value,this.hass).map(([o,l])=>u`<button
              class="pick ${s.includes(o)?"on":""}"
              @click=${()=>this.set(e.key,s.includes(o)?s.filter(c=>c!==o):[...s,o])}
            >
              ${l}
            </button>`)}
        </div>`;break}case"list":a=this.renderList(e,Array.isArray(i)?i:[],s=>this.set(e.key,s));break;case"object":a=u`<div class="nested">
          <af-form .hass=${this.hass} .advanced=${this.advanced} .fields=${e.fields} .value=${i??{}} @value-changed=${s=>this.set(e.key,Object.keys(s.detail.value).length?s.detail.value:void 0)}></af-form>
        </div>`;break;case"autolist":{let s=i==="auto",o=i===void 0||i===!1||i===e.offValue,l=s?"auto":o?"off":"list";a=u`<select
            @change=${c=>{let h=c.target.value;this.set(e.key,h==="auto"?"auto":h==="off"?e.offValue??void 0:[])}}
          >
            <option value="auto" ?selected=${l==="auto"}>${d(e.autoLabel??"Automatisch")}</option>
            <option value="list" ?selected=${l==="list"}>${d("Selbst ausw\xE4hlen")}</option>
            <option value="off" ?selected=${l==="off"}>${d("Aus")}</option>
          </select>
          ${l==="list"?e.fields?this.renderList({key:e.key,label:e.label,type:"list",fields:e.fields,itemLabel:c=>c.name??c.entity??d("Eintrag")},i,c=>this.set(e.key,c)):u`<af-form
                  .hass=${this.hass}
                  .fields=${[{key:"list",label:"",type:"entities",domains:e.domains}]}
                  .value=${{list:i}}
                  @value-changed=${c=>this.set(e.key,c.detail.value.list??[])}
                ></af-form>`:m}`;break}case"yaml":a=u`<textarea
          class="code"
          rows="8"
          .value=${i===void 0?"":bt(i,{lineWidth:100})}
          @change=${s=>{let o=s.target;try{this.set(e.key,o.value.trim()?Mt(o.value):void 0),o.setCustomValidity("")}catch(l){o.setCustomValidity(String(l)),o.reportValidity()}}}
        ></textarea>`;break;case"conditions":a=this.renderList({key:e.key,label:e.label,type:"list",fields:wm,addLabel:"Bedingung",itemLabel:s=>Ur(s),newItem:()=>({condition:"state",state:"on"})},Array.isArray(i)?i:[],s=>this.set(e.key,s.length?s:void 0));break}let r=["list","object","autolist","yaml","conditions","textarea","entities"].includes(e.type);return u`<div class="field ${r?"wide":""}">
      ${e.label?u`<label class="lbl">${d(e.label)}</label>`:m}
      <div class="ctl">${a}</div>
      ${e.help?u`<div class="help">${d(e.help)}</div>`:m}
    </div>`}render(){return u`${this.datalists()}${this.fields.map(e=>this.renderField(e))}`}};Zn.properties={hass:{attribute:!1},fields:{attribute:!1},value:{attribute:!1},pickers:{state:!0},advanced:{type:Boolean}},Zn.styles=C`
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
  `;B("af-form",Zn);var bd=cs(dr(),1);var Ee=(t,...n)=>t.widgets.some(e=>n.includes(e.type)),Ta=(t,n)=>n.test(t.id)||n.test(t.name),Jl={photo:t=>t.background.type==="photo",camera:t=>t.background.type==="camera",standby:t=>t.background.type==="none"&&Ee(t,"clock")&&Ee(t,"date")&&Ee(t,"weather","value")&&!Ee(t,"summary"),morning:t=>Ee(t,"summary"),weather:t=>Ee(t,"weather")&&!Ee(t,"summary")&&!Ee(t,"date")&&(Ta(t,/wetter|weather/i)||!Ee(t,"clock")),agenda:t=>Ee(t,"agenda","calendar")&&!Ta(t,/m[üu]ll|waste|bins/i),waste:t=>Ee(t,"waste")||Ta(t,/m[üu]ll|waste|bins/i),home:t=>Ee(t,"rooms","status","covers"),persons:t=>Ee(t,"persons","car"),energy:t=>Ee(t,"power","price","balance"),news:t=>Ee(t,"news"),night:t=>Ta(t,/^nacht$|^night$/i)},Ea=[{id:"kitchen",name:"K\xFCche",hint:"Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.",icon:"home",pages:["photo","morning","standby","agenda","weather","waste","home","energy","news","persons"],display:{orientation:"auto",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:60},sound:{volume:80,quiet:{after:"22:00",before:"07:00"}}}},{id:"hallway",name:"Flur",hint:"Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.",icon:"door",pages:["standby","photo","waste","persons","weather"],display:{orientation:"auto",text_size:"large",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:30},sound:{volume:60,quiet:{after:"22:00",before:"07:00"}}}},{id:"bedroom",name:"Schlafzimmer",hint:"Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.",icon:"moon",pages:["standby","photo","weather"],eventKinds:["alarm"],display:{mode:"dark",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:30},sound:{volume:35,quiet:{after:"21:00",before:"08:00"}},design:{ambient:{type:"none"}}}},{id:"tv",name:"Fernseher",hint:"Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.",icon:"tv",pages:["photo","camera","weather","news","standby"],eventKinds:["alarm","live"],display:{orientation:"landscape",mode:"dark",text_size:"large",control:{enabled:!1,dashboard:"/lovelace/0",idle:60},sound:{mute:!0},oled:!0,design:{ambient:{type:"none"}}}}],qr=(t,n)=>{let e=new Set,i=o=>{let l=Jl[o],c=l&&n.find(h=>!e.has(h.id)&&l(h));return c&&e.add(c.id),c},a=t.pages.includes("photo")?i("photo"):void 0,r=t.pages.filter(o=>o!=="photo").map(i).filter(o=>!!o),s=[];return a&&s.push(a.id),r.forEach((o,l)=>{s.push(o.id),a&&l%2===1&&l<r.length-1&&s.push(a.id)}),!s.length&&n[0]&&s.push(n[0].id),s.map(o=>({page:o}))},Xl=(t,n,e,i)=>{let a=n.pages.find(s=>Jl.night(s)),r=t.eventKinds?n.events.filter(s=>t.eventKinds.includes(s.kind)).map(s=>s.id):"all";return{id:e,name:i,profile:t.id,playlist:qr(t,n.pages),night:a?{page:a.id}:{},control:{enabled:!0,dashboard:"/lovelace/0",idle:60},events:r,...structuredClone(t.display)}};var Zr={key:"color",label:"Farbe",type:"select",options:[[void 0,"Standard"],["ink","Hell / Tinte"],["muted","Ged\xE4mpft"],["faint","Leise"],["accent","Akzent (Gold)"]]},ie={key:"label",label:"\xDCberschrift",type:"text"},Yr={key:"color",label:"Farbe",type:"select",options:[[void 0,"automatisch"],["accent","Akzent"],["cold","K\xFChl (blau)"],["good","Gut (gr\xFCn)"],["alert","Warnung (rot)"],["ink","Hell / Tinte"],["muted","Ged\xE4mpft"]]},ed={key:"style",label:"Rahmen",type:"select",options:[[void 0,"Schlicht"],["card","Karte"]]},nd={clock:[{key:"size",label:"Gr\xF6\xDFe",type:"select",options:[[void 0,"f\xFCllt das Feld"],["small","klein (Kopfzeile)"]]},{key:"font",label:"Schrift",type:"select",options:[[void 0,"Stil-Schrift"],["sans","Schlicht"]]},{key:"seconds",label:"Sekunden",type:"boolean"},Zr],date:[{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Zeile"],["card","Karte"]]},{key:"format",label:"Format",type:"select",options:[[void 0,"Montag, 12. Oktober"],["short","Mo., 12. Okt."]]},{key:"size",label:"Schriftgr\xF6\xDFe",type:"number",min:10,max:120,placeholder:"26"},Zr],text:[{key:"text",label:"Text",type:"textarea",help:"Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert."},{key:"markdown",label:"Formatierung (Markdown)",type:"boolean",help:"# Titel, - Liste, **fett**, *Akzent*, [mdi:icon], --- Linie"},{key:"style",label:"Stil",type:"select",options:[[void 0,"Flie\xDFtext"],["label","\xDCberschrift klein"],["title","Titel"],["big","Gro\xDF"]]},{key:"size",label:"Schriftgr\xF6\xDFe",type:"number",min:10,max:200},{key:"icon",label:"Icon",type:"icon"},Zr],chart:[ie,{key:"entities",label:"Entit\xE4ten",type:"list",addLabel:"Entit\xE4t hinzuf\xFCgen",itemLabel:t=>t.name||t.entity||"Entit\xE4t",newItem:()=>({}),fields:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"name",label:"Name",type:"text",placeholder:"automatisch"},Yr]},{key:"kind",label:"Darstellung",type:"select",options:[[void 0,"Linie"],["area","Fl\xE4che"],["bar","Balken"]]},{key:"hours",label:"Zeitraum (Stunden)",type:"number",min:1,placeholder:"24",help:"168 = eine Woche, 720 = 30 Tage"},{key:"period",label:"Ein Balken je",type:"select",options:[[void 0,"automatisch"],["hour","Stunde"],["day","Tag"]],when:t=>t.kind==="bar"},{key:"value",label:"Aktuellen Wert zeigen",type:"boolean",default:!0,when:t=>t.kind!=="bar"},{key:"min",label:"Achse von",type:"number",placeholder:"automatisch"},{key:"max",label:"Achse bis",type:"number",placeholder:"automatisch"},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},ed],gauge:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"name",label:"Name",type:"text",placeholder:"automatisch"},{key:"icon",label:"Icon",type:"icon"},{key:"kind",label:"Form",type:"select",options:[[void 0,"Ring"],["half","Halbkreis"]]},{key:"min",label:"Minimum",type:"number",placeholder:"0",advanced:!1},{key:"max",label:"Maximum",type:"number",placeholder:"100",advanced:!1},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},Yr,{key:"severity",label:"Farbe ab Wert",type:"list",addLabel:"Stufe hinzuf\xFCgen",itemLabel:t=>d("ab {n}",{n:t.from??"?"}),newItem:()=>({from:0,color:"good"}),fields:[{key:"from",label:"ab Wert",type:"number"},Yr]},ed],image:[{key:"url",label:"Bild-Link",type:"text",placeholder:"https://\u2026, /local/bild.jpg oder media-source://\u2026",help:"Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg"},{key:"entity",label:"\u2026 oder Bild einer Entit\xE4t",type:"entity",when:t=>!t.url,help:"Person, image.*, Kamera, Medienplayer \u2026"},{key:"fit",label:"Einpassen",type:"select",options:[[void 0,"F\xFCllen (zuschneiden)"],["contain","Ganz zeigen"]]},{key:"refresh",label:"Neu laden alle (s)",type:"number",min:0,placeholder:"nie"},{key:"caption",label:"Bildunterschrift",type:"text",help:"Darf eine Vorlage sein."},{key:"radius",label:"Eckenradius (px)",type:"number",min:0,placeholder:"28"}],weather:[{key:"entity",label:"Wetter",type:"entity",domains:["weather"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Jetzt (gro\xDF)"],["card","Karte mit 4 Stunden"],["hourly","Stunden-Kurve"],["daily","N\xE4chste Tage"],["rain","Regen-Vorschau"],["line","Eine Zeile"]]},{key:"name",label:"Ortsname",type:"text",when:t=>t.variant==="card"},{key:"hours",label:"Stunden",type:"number",min:2,max:48,when:t=>t.variant==="hourly"||t.variant==="rain"},{key:"days",label:"Tage",type:"number",min:1,max:7,when:t=>t.variant==="daily"},{key:"rain_sensor",label:"Regensensor",type:"entity",domains:["binary_sensor"],when:t=>t.variant==="rain"},{key:"threshold",label:"Regen ab %",type:"number",min:0,max:100,when:t=>t.variant==="rain"},{...ie,when:t=>t.variant==="hourly"||t.variant==="daily"}],value:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"name",label:"Name",type:"text"},{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Schlicht"],["card","Karte"]]},{...ie,when:t=>t.style==="card"},{key:"icon",label:"Icon",type:"icon"},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},{key:"cold",label:"Kalt unter",type:"number",help:"Wert wird blau, wenn er darunter liegt."},{key:"sub",label:"Unterzeile",type:"object",when:t=>t.style==="card",fields:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"suffix",label:"Text danach",type:"text",placeholder:"% Luftfeuchte"}]},{key:"secondary",label:"Weitere Werte",type:"list",when:t=>t.style==="card",addLabel:"Wert",itemLabel:t=>t.name??t.entity??"Wert",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4}]}],rooms:[{key:"rooms",label:"R\xE4ume",type:"list",addLabel:"Raum",itemLabel:t=>t.name??"Raum",fields:[{key:"name",label:"Name",type:"text"},{key:"temperature",label:"Temperatur",type:"entity",domains:["sensor","climate"]},{key:"humidity",label:"Luftfeuchte",type:"entity",domains:["sensor"]},{key:"climate",label:"Heizung",type:"entity",domains:["climate"]},{key:"windows",label:"Fenster",type:"entities",domains:["binary_sensor"]}]},{key:"cold",label:"Kalt unter \xB0C",type:"number",placeholder:"16"},{key:"warm",label:"Warm \xFCber \xB0C",type:"number",placeholder:"26"},{key:"columns",label:"Spalten",type:"number",min:1,max:6,placeholder:"3"}],status:[ie,{key:"windows",label:"Offene Fenster & T\xFCren",type:"autolist",autoLabel:"Alle Fenster- und T\xFCrsensoren",fields:[{key:"entity",label:"Sensor",type:"entity",domains:["binary_sensor"]},{key:"name",label:"Name",type:"text"},{key:"room",label:"Raum",type:"text"}]},{key:"appliances",label:"Laufende Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",fields:[{key:"entity",label:"L\xE4uft-Entit\xE4t",type:"entity"},{key:"name",label:"Name",type:"text"},{key:"icon",label:"Icon",type:"icon"}]},{key:"lights",label:"Lichter an",type:"select",options:[["auto","z\xE4hlen"],[void 0,"nicht zeigen"]]},{key:"waste",label:"M\xFCllkalender",type:"entity",domains:["calendar"]},{key:"waste_days",label:"M\xFCll zeigen ab Tagen",type:"number",min:0,max:7,placeholder:"2"},{key:"max",label:"H\xF6chstens Eintr\xE4ge",type:"number",min:1,max:10,placeholder:"5"},{key:"calm_title",label:"Text wenn alles ruhig",type:"text",placeholder:"Alles ruhig"}],calendar:[{key:"entity",label:"Kalender",type:"entity",domains:["calendar"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Karte"],["line","Zeile"]]},{key:"waste",label:"Ist M\xFCllkalender",type:"boolean"},{key:"days",label:"Nur zeigen bis Tage",type:"number",min:0},ie,{key:"icon",label:"Icon",type:"icon"}],infoline:[{key:"items",label:"Teile",type:"list",addLabel:"Teil",itemLabel:t=>t.name??t.text??{weather:"Wetter",calendar:"Termin",entity:"Wert",text:"Text",waste:"M\xFClltonnen",status:"Hinweis",device:"Ger\xE4t",media:"Wiedergabe",agenda:"N\xE4chster Termin"}[t.type]??"Teil",newItem:()=>({type:"entity"}),fields:[{key:"type",label:"Art",type:"select",options:[["weather","Wetter"],["calendar","Termin"],["waste","M\xFClltonnen (im Wechsel)"],["entity","Wert"],["text","Text"],["status","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)"],["device","Ger\xE4t l\xE4uft \u2013 mit Restzeit"],["media","Wiedergabe (z. B. Apple TV)"],["agenda","N\xE4chster Termin"]]},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>!["text","waste","media"].includes(t.type)},{key:"entities",label:"Player",type:"entities",domains:["media_player"],when:t=>t.type==="media"},{key:"entities",label:"Kalender",type:"entities",domains:["calendar"],help:"Leer = die ersten Kalender automatisch",when:t=>t.type==="agenda"},{key:"hours",label:"Termine der n\xE4chsten \u2026 Stunden",type:"number",min:1,max:72,placeholder:"24",when:t=>t.type==="agenda"},{key:"state",label:"Zeigen bei Zustand",type:"text",placeholder:"on",when:t=>t.type==="status"},{key:"state",label:"L\xE4uft bei Zustand",type:"text",placeholder:"on, run, running \u2026",help:"Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde",when:t=>t.type==="device"},{key:"text",label:"Text",type:"text",placeholder:"Es regnet",when:t=>t.type==="status"},{key:"remaining",label:"Restzeit oder Endzeit",type:"entity",domains:["sensor"],when:t=>t.type==="device"},{key:"progress",label:"Fortschritt %",type:"entity",domains:["sensor"],when:t=>t.type==="device"},{key:"detail",label:"Zusatz",type:"entity",help:"z. B. aktueller Raum des Saugers",when:t=>t.type==="device"},{key:"show_end",label:"Endzeit statt Restzeit",type:"boolean",when:t=>t.type==="device"},{key:"list",label:"Nur wenn eine davon an ist",type:"list",addLabel:"Entit\xE4t",help:"z. B. Fenster \u2013 die offenen werden genannt",itemLabel:t=>t.name??t.entity??"Entit\xE4t",newItem:()=>({}),fields:[{key:"entity",label:"Entit\xE4t",type:"entity",domains:["binary_sensor","input_boolean","switch"]},{key:"name",label:"Name",type:"text"}],when:t=>t.type==="status"},{key:"show_if",label:"Nur zeigen, wenn",type:"conditions"},{key:"days",label:"Nur wenn in Tagen",type:"number",when:t=>t.type==="calendar"},{key:"days",label:"Tonnen der n\xE4chsten \u2026 Tage",type:"number",min:0,placeholder:"7",when:t=>t.type==="waste"},{key:"bins",label:"Tonnen",type:"list",addLabel:"Tonne",help:"Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch",itemLabel:t=>t.name??t.entity??"Tonne",newItem:()=>({}),fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Tage-Sensor",type:"entity",domains:["sensor"]},{key:"color",label:"Farbe",type:"color"}],when:t=>t.type==="waste"},{key:"name",label:"Name",type:"text",when:t=>["entity","device","media"].includes(t.type)},{key:"icon",label:"Icon",type:"icon",when:t=>["entity","status","device","media","agenda"].includes(t.type)},{key:"text",label:"Text",type:"text",when:t=>t.type==="text"}]}],camera:[{key:"entity",label:"Kamera",type:"entity",domains:["camera","image"],when:t=>!t.url},{key:"url",label:"\u2026 oder Webcam-Link",type:"text",placeholder:"https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)",suggestions:Zi,help:"\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld"},{key:"mode",label:"Modus",type:"select",options:[[void 0,"Live"],["snapshot","Standbild"]],when:t=>!t.url},{key:"refresh",label:"Standbild neu laden (s)",type:"number",min:0,when:t=>!t.url&&t.mode==="snapshot"},{key:"refresh",label:"Bild neu laden (s)",type:"number",min:10,placeholder:"60",when:t=>!!t.url},{key:"title",label:"Bildunterschrift",type:"text"},{key:"text",label:"Text aus Entit\xE4t",type:"entity",help:"z. B. KI-Analyse der Kamera"},{key:"radius",label:"Eckenradius",type:"number",min:0,max:60,placeholder:"28"}],pet:[{key:"name",label:"Name",type:"text",placeholder:"Polly"},{key:"visits",label:"Z\xE4hler \u201Eheute\u201C",type:"entity",domains:["sensor","counter"],help:"z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck"},{key:"unit",label:"Bezeichnung",type:"text",placeholder:"Besuche heute"},{key:"days",label:"Verlauf (Tage)",type:"number",min:0,max:31,placeholder:"7"},{key:"icon",label:"Icon",type:"icon"},ie],balance:[{key:"switch_hour",label:"Heute ab (Uhr)",type:"number",min:0,max:24,placeholder:"18",help:"Davor zeigt die Bilanz den Vortag"},{key:"groups",label:"Gruppen (YAML)",type:"yaml",help:`- label: Strom
  rows:
    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}
    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`},ie],qr:[{key:"ssid",label:"Netzname (SSID)",type:"text"},{key:"password",label:"Passwort",type:"text"},{key:"encryption",label:"Verschl\xFCsselung",type:"select",options:[[void 0,"WPA/WPA2/WPA3"],["WEP","WEP"],["nopass","Offen"]]},{key:"hidden",label:"Verstecktes Netz",type:"boolean"},{key:"show_password",label:"Passwort zus\xE4tzlich als Text",type:"boolean"},{key:"hint",label:"Hinweis",type:"text",placeholder:"Handy-Kamera auf den Code halten"},{key:"image",label:"Eigenes QR-Bild",type:"text",placeholder:"/local/gaeste-wlan.png",help:"Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)",advanced:!0},ie],job:[ie,{key:"title",label:"Name des Auftrags",type:"entity"},{key:"progress",label:"Fortschritt (%)",type:"entity",domains:["sensor"]},{key:"remaining",label:"Restzeit",type:"entity",domains:["sensor"]},{key:"end",label:"Endzeit",type:"entity",domains:["sensor"]},{key:"layer",label:"Schicht",type:"entity",domains:["sensor"]},{key:"layers",label:"Schichten gesamt",type:"entity",domains:["sensor"]},{key:"status",label:"Status",type:"entity"},{key:"temps",label:"Temperaturen",type:"list",addLabel:"Temperatur",itemLabel:t=>t.name??"Temperatur",newItem:()=>({}),fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity",domains:["sensor"]}]}],summary:[{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Ohne Rahmen"],["card","Karte"]]},{key:"size",label:"Schriftgr\xF6\xDFe Punkte (px)",type:"number",min:14,max:40,placeholder:"22"},ie],news:[{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Gro\xDFbild mit Schlagzeile"],["list","Liste mit Vorschaubildern"],["ticker","Laufband"]]},{key:"feeds",label:"Quellen",type:"list",addLabel:"Quelle",help:"Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.",itemLabel:t=>hr.find(([n])=>n===t.value)?.[1]??t.value??"Quelle",newItem:()=>({value:Jt()[0]}),fields:[{key:"value",label:"Quelle",type:"text",suggestions:hr,placeholder:"bbc, tagesschau \u2026 oder https://\u2026"}]},{key:"interval",label:"Wechsel nach (s)",type:"number",min:5,placeholder:"14",when:t=>!t.variant},{key:"max",label:"Meldungen",type:"number",min:1,max:30,placeholder:"8"},{key:"speed",label:"Tempo (px/s)",type:"number",min:10,max:200,placeholder:"45",when:t=>t.variant==="ticker"},ie],today:[{key:"calendars",label:"Kalender",type:"entities",domains:["calendar"],help:"Leer = die ersten Kalender automatisch"},{key:"weather",label:"Wetter",type:"entity",domains:["weather"]},ie],daily:[{key:"kind",label:"Inhalt",type:"select",options:[[void 0,"Wikipedia-Artikel des Tages"],["quote","Zitat"]]},{key:"language",label:"Wikipedia-Sprache",type:"select",options:[[void 0,"wie die Anzeige"],["de","Deutsch"],["en","English"],["sv","Svenska"]],help:"Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.",when:t=>t.kind!=="quote"},{key:"source",label:"Quelle",type:"select",options:[[void 0,"wie die Anzeige"],["wikiquote","Wikiquote \xB7 Deutsch, Zitat der Woche"],["zenquotes","ZenQuotes \xB7 English, quote of the day"]],when:t=>t.kind==="quote"},{key:"image",label:"Bild",type:"select",options:[[void 0,"Mit Bild"],[!1,"Ohne Bild"]],when:t=>t.kind!=="quote"},ie],timer:[{key:"entities",label:"Timer",type:"entities",domains:["timer"],help:"Leer = alle Timer aus HA (Helfer \u2192 Timer)"},{key:"presets",label:"Schnellstart (Minuten)",type:"text",placeholder:"5, 10, 15",help:"Kn\xF6pfe zum Starten, durch Komma getrennt \u2013 leer lassen f\xFCr keine"},{key:"target",label:"Schnellstart startet",type:"entity",domains:["timer"],placeholder:"erster Timer"},{key:"show_idle",label:"Ruhende Timer zeigen",type:"boolean"},ie],board:[{key:"entities",label:"Nachrichten",type:"entities",domains:["input_text","text","sensor"],help:"Leer = Textspeicher mit \u201Epinnwand\u201C, \u201Enachricht\u201C oder \u201Enotiz\u201C im Namen"},{key:"expire_hours",label:"Ausblenden nach (Stunden)",type:"number",min:0,placeholder:"nie"},{key:"size",label:"Schriftgr\xF6\xDFe (px)",type:"number",min:14,max:120,placeholder:"30"},{key:"empty_text",label:"Text ohne Nachricht",type:"text",placeholder:"Keine Nachrichten"},ie],countdown:[{key:"items",label:"Ereignisse",type:"list",addLabel:"Ereignis",itemLabel:t=>t.name??t.date??t.entity??"Ereignis",fields:[{key:"name",label:"Name",type:"text",placeholder:"Urlaub"},{key:"date",label:"Datum",type:"text",placeholder:"2026-12-24",help:"Oder unten eine Entit\xE4t w\xE4hlen"},{key:"entity",label:"Entit\xE4t",type:"entity",domains:["input_datetime","sensor","calendar"],help:"Datum-Helfer, Zeitstempel oder Kalender (n\xE4chster Termin)"},{key:"icon",label:"Symbol",type:"icon"}]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:12,placeholder:"5"},{key:"show_past",label:"Vergangene zeigen",type:"boolean"},ie],departures:[{key:"entities",label:"Sensoren",type:"entities",domains:["sensor"],help:"Von einer \xD6PNV-Integration (z. B. HAFAS, DB, Wiener Linien) \u2013 leer = automatisch"},{key:"lines",label:"Nur diese Linien",type:"text",placeholder:"S1, 42"},{key:"walk",label:"Fu\xDFweg (Minuten)",type:"number",min:0,max:60,placeholder:"0",help:"Abfahrten, die nicht mehr erreichbar sind, ausblenden"},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:15,placeholder:"6"},{key:"show_platform",label:"Gleis zeigen",type:"boolean"},{key:"attribute",label:"Attribut mit der Liste",type:"text",placeholder:"automatisch"},ie],radar:[{key:"zoom",label:"Zoom",type:"select",options:[[4,"Land"],[5,"Region"],[6,"Umgebung"],[void 0,"Nah"]]},{key:"map",label:"Karte",type:"select",options:[[void 0,"wie die Anzeige"],["light","Hell"],["dark","Dunkel"],["osm","Farbig"]]},{key:"map_url",label:"Eigene Karte (Adresse)",type:"text",placeholder:"https://\u2026/{z}/{x}/{y}.png",advanced:!0},{key:"frames",label:"Zeitraum",type:"select",options:[[1,"Nur aktuell"],[3,"30 Minuten"],[void 0,"1 Stunde"],[13,"2 Stunden"]]},{key:"speed",label:"Bildwechsel (ms)",type:"number",min:150,max:3e3,placeholder:"500"},{key:"latitude",label:"Breite",type:"number",step:.01,placeholder:"Zuhause"},{key:"longitude",label:"L\xE4nge",type:"number",step:.01,placeholder:"Zuhause"},ie],sky:[{key:"show",label:"Zeigen",type:"select",options:[[void 0,"Sonne und Mond"],["sun","Nur Sonne"],["moon","Nur Mond"]]},{key:"latitude",label:"Breite",type:"number",step:.01,placeholder:"Zuhause"},{key:"longitude",label:"L\xE4nge",type:"number",step:.01,placeholder:"Zuhause"},ie],air:[{key:"entities",label:"Sensoren",type:"list",addLabel:"Sensor",itemLabel:t=>t.name??t.entity??"Sensor",fields:[{key:"entity",label:"Sensor",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"},{key:"kind",label:"Art",type:"select",options:[[void 0,"automatisch"],["pollen","Pollen"],["aqi","Luftqualit\xE4tsindex"],["pm25","Feinstaub PM2,5"],["pm10","Feinstaub PM10"],["ozone","Ozon"],["no2","Stickstoffdioxid"]]},{key:"scale",label:"Pollen-Skala",type:"select",options:[[void 0,"0\u20133 (DWD)"],[5,"0\u20135"]]}]},{key:"only_elevated",label:"Nur erh\xF6hte Werte",type:"boolean"},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:15,placeholder:"8"},ie],card:[{key:"card",label:"Lovelace-Karte (YAML)",type:"yaml",help:"Jede Karte aus dem Dashboard, z. B. type: entities \u2026"}],price:[ie,{key:"entity",label:"Aktueller Preis",type:"entity",domains:["sensor"],help:"Optional \u2013 sonst aus dem Tibber-Verlauf."},{key:"home",label:"Tibber-Zuhause",type:"text",placeholder:"erstes"},{key:"window",label:"G\xFCnstigstes Fenster (h)",type:"number",min:1,max:6,placeholder:"2"},{key:"tomorrow",label:"Morgen anzeigen",type:"boolean",default:!0},{key:"note",label:"Fu\xDFnote",type:"text"}],power:[ie,{key:"production",label:"Erzeugung (W)",type:"list",addLabel:"Quelle",itemLabel:t=>t.name??t.entity??"Quelle",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Leistung",type:"entity",domains:["sensor"]}]},{key:"consumption",label:"Verbrauch",type:"object",fields:[{key:"name",label:"Name",type:"text",placeholder:"Verbrauch"},{key:"entity",label:"Leistung (W)",type:"entity",domains:["sensor"]}]},{key:"forecast",label:"Prognose heute (kWh)",type:"entity",domains:["sensor"]},{key:"forecast_remaining",label:"Prognose Rest (kWh)",type:"entity",domains:["sensor"]},{key:"extra",label:"Zusatzwert",type:"entity",domains:["sensor"]},{key:"extra_name",label:"Zusatzwert Name",type:"text"}],car:[{key:"name",label:"Name",type:"text"},{key:"battery",label:"Akku %",type:"entity",domains:["sensor"]},{key:"range",label:"Reichweite",type:"entity",domains:["sensor"]},{key:"location",label:"Standort",type:"entity",domains:["device_tracker","person"]},{key:"charging",label:"L\xE4dt",type:"entity",domains:["binary_sensor"]},{key:"plugged",label:"Angesteckt",type:"entity",domains:["binary_sensor"]},{key:"charger_power",label:"Ladeleistung",type:"entity",domains:["sensor"]},{key:"time_full",label:"Voll um",type:"entity",domains:["sensor"]},{key:"lock",label:"Schloss",type:"entity",domains:["lock"]},{key:"limit",label:"Ladelimit",type:"entity",domains:["number","sensor"]},{key:"inside_temp",label:"Innentemperatur",type:"entity",domains:["sensor"]}],persons:[ie,{key:"persons",label:"Personen",type:"list",addLabel:"Person",itemLabel:t=>t.name??t.entity??"Person",fields:[{key:"entity",label:"Person",type:"entity",domains:["person","device_tracker"]},{key:"name",label:"Name",type:"text"},{key:"location",label:"Ortsangabe",type:"entity",domains:["sensor"],help:"z. B. \u201EGeocoded Location\u201C der Companion-App"}]}],vacuum:[ie,{key:"vacuums",label:"Sauger",type:"list",addLabel:"Sauger",itemLabel:t=>t.name??t.entity??"Sauger",fields:[{key:"entity",label:"Sauger",type:"entity",domains:["vacuum"]},{key:"name",label:"Name",type:"text"},{key:"battery",label:"Akku",type:"entity",domains:["sensor"],help:"Leer = automatisch suchen"},{key:"room",label:"Aktueller Raum",type:"entity",domains:["sensor"]},{key:"map",label:"Saugkarte",type:"entity",domains:["image","camera"],help:"Leer = Karte des Saugers automatisch"}]},{key:"maps",label:"Kleine Karten",type:"select",options:[[void 0,"Neben jedem Sauger"],[!1,"Ausblenden"]]},{key:"map",label:"Gro\xDFe Karte darunter",type:"entity",domains:["image","camera"]}],waste:[ie,{key:"bins",label:"Tonnen",type:"list",addLabel:"Tonne",itemLabel:t=>t.name??"Tonne",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Tage bis Abholung",type:"entity",domains:["sensor"]},{key:"color",label:"Farbe",type:"color"},{key:"out",label:"Steht drau\xDFen",type:"entity",domains:["input_boolean","binary_sensor"]}]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:8,placeholder:"4"},{key:"highlight",label:"Hervorheben ab Tagen",type:"number",min:0,max:7,placeholder:"1"}],activity:[{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Eine Zeile (dezent)"],["list","Liste"]]},{key:"entities",label:"Melder",type:"autolist",autoLabel:"Alle Bewegungs-/Pr\xE4senzmelder",domains:["binary_sensor"],offValue:"auto"},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["binary_sensor"]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:8,placeholder:"3"},{key:"within",label:"Zeitraum (min)",type:"number",min:5,placeholder:"120"},{...ie,when:t=>t.variant==="list"}],list:[ie,{key:"rows",label:"Zeilen",type:"list",addLabel:"Zeile",itemLabel:t=>t.name??t.entity??"Zeile",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"icon",label:"Icon",type:"icon"},{key:"format",label:"Bewertung",type:"select",options:[[void 0,"keine"],["aqi","Luftqualit\xE4t (AQI)"],["uv","UV-Index"],["lux","Helligkeit (Lux)"],["humidity","Luftfeuchte (Raum)"],["rain","Regen an/aus"],["onoff","An/Aus"]]},{key:"unit",label:"Einheit",type:"text"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4}]}],agenda:[ie,{key:"calendars",label:"Kalender",type:"entities",domains:["calendar"]},{key:"days",label:"Tage voraus",type:"number",min:1,max:31,placeholder:"7"},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:12,placeholder:"6"},{key:"location",label:"Ort zeigen",type:"boolean",default:!0}],media:[ie,{key:"entities",label:"Player",type:"entities",domains:["media_player"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Kompakt"],["full","Ganze Seite mit gro\xDFem Cover"]]},{key:"show_paused",label:"Auch pausiert zeigen",type:"boolean"}],appliances:[ie,{key:"items",label:"Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??"Ger\xE4t",fields:[{key:"name",label:"Name",type:"text"},{key:"running",label:"L\xE4uft-Entit\xE4t",type:"entity"},{key:"icon",label:"Icon",type:"icon"},{key:"power",label:"Leistung",type:"entity",domains:["sensor"]},{key:"progress",label:"Fortschritt %",type:"entity",domains:["sensor"]},{key:"end",label:"Endzeit",type:"entity",domains:["sensor"]},{key:"cost",label:"Kosten",type:"entity",domains:["sensor"]}]},{key:"empty_text",label:"Text wenn nichts l\xE4uft",type:"text",placeholder:"Nichts l\xE4uft gerade"}],consumers:[ie,{key:"count",label:"Anzahl",type:"number",min:1,max:10,placeholder:"3"},{key:"devices",label:"Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",help:"Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant",fields:[{key:"entity",label:"Energiez\xE4hler (kWh)",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"}],advanced:!0},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["sensor"],advanced:!0}],batteries:[ie,{key:"part",label:"Zeigen",type:"select",options:[[void 0,"Ger\xE4te und schwache Batterien"],["devices","Nur Ger\xE4te"],["low","Nur schwache Batterien"]]},{key:"devices",label:"Ger\xE4te (immer zeigen)",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",help:"Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App",fields:[{key:"entity",label:"Akkustand",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"}]},{key:"threshold",label:"Zubeh\xF6r zeigen unter (%)",type:"number",min:1,max:100,placeholder:"21"},{key:"max",label:"H\xF6chstens Zeilen Zubeh\xF6r",type:"number",min:1,max:12,placeholder:"5",advanced:!0},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["sensor","binary_sensor"],advanced:!0}],covers:[ie,{key:"covers",label:"Rolll\xE4den",type:"list",addLabel:"Rollladen",itemLabel:t=>t.name??t.entity??"Rollladen",fields:[{key:"entity",label:"Rollladen",type:"entity",domains:["cover"]},{key:"name",label:"Name",type:"text"},{key:"invert",label:"Richtung umkehren",type:"boolean",help:"Wenn der Antrieb offen und zu andersherum meldet"}]},{key:"only_open",label:"Nur offene listen",type:"boolean"}],warnings:[ie,{key:"entities",label:"Warn-Sensoren",type:"entities",domains:["binary_sensor"]},{key:"calm_text",label:"Text ohne Warnung",type:"text",placeholder:"Keine Warnungen"}]},Qn=[[void 0,"Schrift des Stils"],...ii.map(t=>[t.id,`${t.name} \xB7 ${t.kind==="serif"?"Serife":"ohne Serife"}`])],id=[["auto","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang"],["light","Immer hell"],["dark","Immer dunkel"]],Qr=[["none","Aus"],["particles","Schwebende Partikel"],["flow","Flie\xDFender Verlauf"],["bokeh","Lichtschimmer"],["mist","Nebel"]],Jr=[["fade","\xDCberblenden"],["blur","Weich (Unsch\xE4rfe)"],["slide","Schieben"],["zoom","Zoom"]],td=[{key:"action",label:"Aktion",type:"select",options:[[void 0,"keine"],["toggle","Ein/aus schalten"],["more_info","Details (HA-Dialog)"],["perform","Aktion/Skript ausf\xFChren"],["page","Seite zeigen"],["popup","Pop-up mit HA-Karte"],["pause","Wiedergabe anhalten/fortsetzen"],["dashboard","HA-Dashboard \xF6ffnen"]]},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>["toggle","more_info"].includes(t.action)},{key:"perform",label:"Aktion (domain.dienst)",type:"text",placeholder:"script.turn_on",suggestions:[["script.turn_on","Skript starten"],["scene.turn_on","Szene aktivieren"],["light.toggle","Licht umschalten"],["cover.toggle","Rollladen/Tor umschalten"],["media_player.media_play_pause","Wiedergabe/Pause"],["input_boolean.toggle","Helfer umschalten"]],when:t=>t.action==="perform"},{key:"entity",label:"Ziel-Entit\xE4t",type:"entity",when:t=>t.action==="perform"},{key:"data",label:"Daten (YAML, optional)",type:"yaml",when:t=>t.action==="perform"},{key:"page",label:"Seite",type:"select",options:()=>Ct.pages,when:t=>t.action==="page"},{key:"title",label:"Titel",type:"text",when:t=>t.action==="popup"},{key:"card",label:"Karte (YAML)",type:"yaml",help:"z. B. type: entities, entities: [light.kueche]",when:t=>t.action==="popup"},{key:"timeout",label:"Schlie\xDFt nach (s)",type:"number",min:5,max:600,placeholder:"30",when:t=>t.action==="popup"},{key:"confirm",label:"Vorher nachfragen",type:"boolean",help:"F\xFCr Tor, T\xFCrschloss & Co.",when:t=>["toggle","perform"].includes(t.action)}],ad=[{key:"look.card",label:"Als Karte",type:"boolean",help:"Fl\xE4che, Rand und Radius des Stils"},{key:"look.accent",label:"Akzentfarbe",type:"color"},{key:"look.ink",label:"Schriftfarbe",type:"color"},{key:"look.size",label:"Gr\xF6\xDFe (%)",type:"number",min:50,max:200,step:5,placeholder:"100"},{key:"look.opacity",label:"Deckkraft (%)",type:"number",min:10,max:100,step:5,placeholder:"100"},{key:"look.padding",label:"Innenabstand (px)",type:"number",min:0,max:80,placeholder:"0"}],Jn=t=>[{key:`design.colors.${t}.bg`,label:"Hintergrund",type:"color"},{key:`design.colors.${t}.ink`,label:"Schrift",type:"color"},{key:`design.colors.${t}.accent`,label:"Akzent",type:"color"},{key:`design.colors.${t}.card`,label:"Karten",type:"color"},{key:`design.colors.${t}.card_opacity`,label:"Karten-Deckkraft (%)",type:"number",min:0,max:100,placeholder:"100"},{key:`design.colors.${t}.good`,label:"Gut (gr\xFCn)",type:"color"},{key:`design.colors.${t}.alert`,label:"Warnung (rot)",type:"color"},{key:`design.colors.${t}.cold`,label:"K\xFChl (blau)",type:"color"}],Xr=[{key:"design.radius",label:"Eckenradius der Karten (px)",type:"number",min:0,max:80,placeholder:"wie Stil"},{key:"design.css",label:"Eigenes CSS (alle Displays)",type:"textarea",placeholder:":host { --af-accent: #e0a060 }",help:"F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen."}],rd=[{key:"tap_action",label:"Beim Antippen",type:"object",fields:td},{key:"hold_action",label:"Beim langen Dr\xFCcken",type:"object",fields:td}],sd=[{key:"align",label:"Waagerecht",type:"select",options:[[void 0,"links"],["center","mittig"],["end","rechts"]]},{key:"valign",label:"Senkrecht",type:"select",options:[[void 0,"oben"],["center","mittig"],["end","unten"]]},{key:"typeface",label:"Schrift",type:"select",options:[[void 0,"wie Design"],...Qn.slice(1)]}],od=[{key:"name",label:"Name",type:"text"},{key:"duration",label:"Dauer (s)",type:"number",min:3},{key:"background.type",label:"Hintergrund",type:"select",options:[["none","Stil-Farbe"],["photo","Foto"],["camera","Kamera / Webcam"],["color","Eigene Farbe"]]},{key:"background.color",label:"Farbe",type:"color",when:t=>t.background?.type==="color"},{key:"background.entity",label:"Kamera",type:"entity",domains:["camera"],when:t=>t.background?.type==="camera"&&!t.background?.url},{key:"background.url",label:"\u2026 oder Webcam-Link",type:"text",placeholder:"https://\u2026",suggestions:Zi,when:t=>t.background?.type==="camera"},{key:"background.refresh",label:"Bild neu laden (s)",type:"number",min:0,placeholder:"20",help:"0 = Livebild",when:t=>t.background?.type==="camera"},{key:"background.name",label:"Ortsname",type:"text",help:"Klein unten rechts, z. B. \u201ECuxhaven\u201C",when:t=>t.background?.type==="camera"&&!t.background?.sources?.length},{key:"background.sources",label:"Mehrere Webcams im Wechsel",type:"list",addLabel:"Webcam hinzuf\xFCgen",help:"Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben",itemLabel:t=>t.name||t.url||"Webcam",newItem:()=>({}),when:t=>t.background?.type==="camera",fields:[{key:"url",label:"Webcam-Link",type:"text",placeholder:"https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)",suggestions:Zi},{key:"name",label:"Ortsname",type:"text"},{key:"refresh",label:"Bild neu laden (s)",type:"number",min:0,placeholder:"wie oben"}]},{key:"background.shade",label:"Abdunkeln",type:"select",options:[[void 0,"normal \u2013 Text gut lesbar"],["light","leicht"],["strong","kr\xE4ftig"],["none","aus \u2013 Originalbild"]],help:"Dunkler Verlauf unten links, damit Uhr und Text auf hellen Bildern lesbar bleiben.",when:t=>t.background?.type==="photo"||t.background?.type==="camera"},{key:"palette",label:"Farben",type:"select",options:[["normal","Normal"],["night","Nacht (gedimmt)"]]},{key:"background.ambient",label:"Animation",type:"select",options:[[void 0,"wie Design"],...Qr],when:t=>t.palette!=="night"},{key:"transition.type",label:"\xDCbergang",type:"select",options:[[void 0,"wie Design"],...Jr],advanced:!0},{key:"transition.duration",label:"\xDCbergang (s)",type:"number",min:.2,max:10,step:.1,placeholder:"wie Design",advanced:!0},{key:"show_if",label:"Nur anzeigen wenn \u2026",type:"conditions"},{key:"css",label:"Eigenes CSS (nur diese Seite)",type:"textarea",placeholder:'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }',help:'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.'}],es=[{id:"alarm",name:"Vollbild (Klingel, Alarm)",short:"Vollbild",icon:"bell"},{id:"live",name:"Bild-im-Bild (Bewegung)",short:"Bild-im-Bild",icon:"cam"},{id:"info",name:"Hinweis + Erinnerung (Ger\xE4te)",short:"Hinweis",icon:"info"},{id:"page",name:"Seite zeigen (z. B. bei Bewegung)",short:"Seite",icon:"page"},{id:"media",name:"Musik-Cover (bei Liedwechsel)",short:"Musik-Cover",icon:"music"}],Yn=t=>["alarm","live","info"].includes(t.kind),xe=(...t)=>n=>t.includes(n.kind),ld=t=>[{key:"name",label:"Name",type:"text"},{key:"enabled",label:"Aktiv",type:"boolean",default:!0},{key:"kind",label:"Darstellung",type:"select",options:es.map(n=>[n.id,n.name])},{key:"entity",label:"Ausl\xF6ser",type:"entity",when:n=>n.kind!=="media"},{key:"entities",label:"Weitere Ausl\xF6ser",type:"entities",when:xe("page"),help:"z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt"},{key:"entities",label:"Player",type:"entities",domains:["media_player"],when:xe("media"),help:"Gruppen zeigen jedes Lied nur einmal"},{key:"from",label:"von Zustand",type:"text",placeholder:"beliebig",when:n=>n.kind!=="media"},{key:"to",label:"zu Zustand",type:"text",placeholder:"on",suggestions:[["on","an"],["*","jede \xC4nderung (Tasten, event.*)"]],help:"* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten",when:n=>n.kind!=="media"},{key:"event_types",label:"Nur diese Ereignistypen",type:"multi",options:(n,e)=>(e?.states[n.entity]?.attributes.event_types??[]).map(i=>[i,i]),help:"Keiner gew\xE4hlt = alle",when:n=>n.to==="*"&&String(n.entity??"").startsWith("event.")},{key:"page",label:"Seite",type:"select",options:[[void 0,"\u2013 w\xE4hlen \u2013"],...t.pages.map(n=>[n.id,n.name])],when:xe("page")},{key:"style",label:"Cover",type:"select",options:[[void 0,"Karte unten rechts (kurz beim Liedwechsel)"],["fullscreen","Vollbild (kurz beim Liedwechsel)"],["mini","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft"]],when:xe("media")},{key:"mini_duration",label:"Ausblenden nach (s)",type:"number",min:5,placeholder:"dauerhaft",when:n=>n.kind==="media"&&n.style==="mini",help:"Je Titel: nach so vielen Sekunden ausblenden, beim n\xE4chsten Titel wieder zeigen. Leer = solange etwas l\xE4uft."},{key:"mini_paused",label:"Nach Pause noch (s)",type:"number",min:0,placeholder:"120",when:n=>n.kind==="media"&&n.style==="mini",help:"0 = bei Pause sofort ausblenden"},{key:"mini_position",label:"Ecke",type:"select",options:[[void 0,"unten rechts"],["bottom-left","unten links"],["top-right","oben rechts"],["top-left","oben links"]],when:n=>n.kind==="media"&&n.style==="mini"},{key:"mini_size",label:"Gr\xF6\xDFe",type:"select",options:[["small","klein"],[void 0,"normal"],["large","gro\xDF"]],when:n=>n.kind==="media"&&n.style==="mini"},{key:"mini_cover",label:"Cover zeigen",type:"boolean",default:!0,when:n=>n.kind==="media"&&n.style==="mini"},{key:"mini_progress",label:"Fortschritt zeigen",type:"boolean",default:!0,when:n=>n.kind==="media"&&n.style==="mini"},{key:"mini_background",label:"Hintergrund",type:"select",options:[[void 0,"Karte"],["none","ohne (nur Text und Cover)"]],when:n=>n.kind==="media"&&n.style==="mini"},{key:"interval",label:"Zwischendurch alle (min)",type:"number",min:0,when:n=>n.kind==="media"&&n.style!=="mini",help:"W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel"},{key:"camera",label:"Kamera",type:"entity",domains:["camera"],when:xe("alarm","live")},{key:"title",label:"Titel",type:"text",when:Yn},{key:"where",label:"Ort / Zusatz",type:"text",when:Yn},{key:"where",label:"Raum",type:"text",when:xe("media"),placeholder:"Name des Players"},{key:"icon",label:"Icon",type:"icon",when:Yn},{key:"text",label:"Text aus Entit\xE4t",type:"entity",when:Yn,help:"z. B. KI-Beschreibung oder Warn-\xDCberschrift"},{key:"text_attribute",label:"\u2026 aus Attribut",type:"text",when:n=>Yn(n)&&!!n.text},{key:"cost",label:"Kosten-Sensor",type:"entity",domains:["sensor"],when:xe("info")},{key:"reminder",label:"Erinnerung oben rechts",type:"select",options:[[void 0,"bleibt, bis man sie antippt"],["off","keine Erinnerung"],[15,"15 Minuten"],[30,"30 Minuten"],[60,"1 Stunde"],[120,"2 Stunden"],[240,"4 Stunden"],[480,"8 Stunden"],[1440,"1 Tag"]],when:xe("info"),help:"Nach dem Hinweis bleibt eine kleine Erinnerung oben rechts \u2013 dauerhaft, eine Weile oder gar nicht."},{key:"chip",label:"Erinnerungstext",type:"text",when:n=>n.kind==="info"&&n.reminder!=="off"},{key:"reminder_clear",label:"Weg, wenn das Ger\xE4t wieder startet",type:"boolean",default:!0,when:n=>n.kind==="info"&&n.reminder!=="off"&&!!n.from,help:"Z. B. die Waschmaschine l\xE4uft wieder an \u2013 dann ist die alte Erinnerung erledigt."},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"30",when:xe("live")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"60",when:xe("info")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"12 / Vollbild 15",when:xe("media")},{key:"duration",label:"Mindestens (s)",type:"number",min:3,placeholder:"60",when:xe("page"),help:"Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin."},{key:"max",label:"H\xF6chstens (s)",type:"number",min:3,when:xe("alarm")},{key:"max",label:"H\xF6chstens (s)",type:"number",min:3,placeholder:"600",when:xe("page"),help:"Obergrenze, auch wenn ein Melder dauerhaft an bleibt."},{key:"hold_after",label:"Nachlauf (s)",type:"number",min:0,when:xe("alarm","page"),help:"So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist."},{key:"cooldown",label:"Abklingzeit (s)",type:"number",min:0,when:xe("live"),help:"Danach erst wieder zeigen \u2013 gegen Dauerfeuer."},{key:"cooldown",label:"Abklingzeit (s)",type:"number",min:0,when:xe("page"),help:"Nach dem Ende so lange nicht erneut zeigen."},{key:"at_night",label:"Auch nachts",type:"boolean"},{key:"sound",label:"Ton",type:"text",placeholder:"kein Ton",suggestions:[...(t.sounds??[]).map(n=>[n.id,`${n.name} \xB7 ${d("eigener Ton")}`]),...Wn],help:"Klick ins Feld f\xFCr eigene und mitgelieferte T\xF6ne \u2013 oder ein Link (/local/ton.mp3, media-source://\u2026). Eigene T\xF6ne legst du links unter \u201EEigene T\xF6ne\u201C an.",when:n=>n.kind!=="media"},{key:"sound_repeat",label:"Wiederholen",type:"select",options:[[void 0,"einmal (der Ton \u201EAlarm\u201C beim Vollbild bis angetippt)"],["once","einmal"],[2,"2 \xD7"],[3,"3 \xD7"],[5,"5 \xD7"],[10,"10 \xD7"],["loop","bis angetippt bzw. geschlossen (h\xF6chstens 2 min)"]],when:n=>!!n.sound&&n.kind!=="media"},{key:"sound_interval",label:"Abstand (s)",type:"number",min:1,max:60,step:.5,placeholder:"4",when:n=>!!n.sound&&n.kind!=="media"&&!!n.sound_repeat&&n.sound_repeat!=="once"},{key:"volume",label:"Lautst\xE4rke (%)",type:"number",min:5,max:100,placeholder:"70",when:n=>!!n.sound&&n.kind!=="media",help:"Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets."},{key:"quiet.after",label:"Ruhezeit ab",type:"text",placeholder:"22:00"},{key:"quiet.before",label:"Ruhezeit bis",type:"text",placeholder:"07:00"},{key:"quiet_action",label:"In der Ruhezeit",type:"select",options:[[void 0,"ohne Ton zeigen"],["skip","gar nicht zeigen"]],when:n=>!!(n.quiet?.after||n.quiet?.before)},{key:"only_home",label:"Nur wenn jemand zu Hause ist",type:"boolean",help:"Mindestens eine Person (person.*) ist \u201Ehome\u201C."},{key:"show_if",label:"Nur wenn au\xDFerdem \u2026",type:"conditions"}],dd=t=>[{key:"name",label:"Name",type:"text"},{key:"theme",label:"Stil",type:"select",options:[[void 0,"wie Design"],...ht.map(n=>[n.id,n.name])]},{key:"mode",label:"Hell/Dunkel",type:"select",options:[[void 0,"wie Design"],...id]},{key:"orientation",label:"Ausrichtung",type:"select",options:[[void 0,"Automatisch (nach Ger\xE4t, auch beim Drehen)"],["landscape","Immer quer"],["portrait","Immer hoch"]]},{key:"transition.type",label:"\xDCbergang",type:"select",options:[[void 0,"wie Design"],...Jr],advanced:!0},{key:"transition.duration",label:"\xDCbergang (s)",type:"number",min:.2,max:10,step:.1,placeholder:"wie Design",advanced:!0},{key:"night.entity",label:"Nacht, wenn an",type:"entity",domains:["input_boolean","binary_sensor","switch","schedule"]},{key:"night.page",label:"Nachtseite",type:"select",options:[[void 0,"eingebaut"],...t.pages.map(n=>[n.id,n.name])]},{key:"control.enabled",label:"Bedienmodus",type:"boolean",default:!0},{key:"nav",label:"Pfeile zum Bl\xE4ttern",type:"boolean",default:!0,help:"Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen",when:n=>n.control?.enabled!==!1},{key:"control.mode",label:"Bedienung",type:"select",options:[[void 0,"Dashboard \xFCber Ambiframe (Antippen)"],["screensaver","Dashboard in Fully, Ambiframe als Bildschirmschoner"]],help:"Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.",when:n=>n.control?.enabled!==!1},{key:"control.dashboard",label:"Dashboard",type:"text",placeholder:"/lovelace/0",when:n=>n.control?.enabled!==!1},{key:"control.idle",label:"Zur\xFCck nach (s)",type:"number",min:10,help:"Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint",when:n=>n.control?.enabled!==!1},{key:"pause_minutes",label:"Pause endet nach (min)",type:"number",min:0,placeholder:"60",help:"F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie"},{key:"watchdog.button",label:"Neustart-Taste",type:"entity",domains:["button","input_button"],help:"Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C."},{key:"watchdog.after",label:"Neustart nach (s)",type:"number",min:60,placeholder:"120",when:n=>!!n.watchdog?.button},{key:"watchdog.notify",label:"Melden, wenn offline (Minuten)",type:"number",min:0,max:1440,placeholder:"aus",help:"Benachrichtigung in Home Assistant, wenn sich das Display so lange nicht meldet \u2013 verschwindet von selbst, sobald es wieder da ist. Ausgeschalteter Bildschirm z\xE4hlt nicht."},{key:"oled",label:"OLED-Schutz",type:"boolean",help:"F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C."},{key:"reminders",label:"Erinnerungen oben rechts",type:"boolean",default:!0,help:"Z. B. \u201EW\xE4sche fertig\u201C nach einem Hinweis"},{key:"reminders_stack",label:"Stapeln ab",type:"select",options:[[void 0,"3 Erinnerungen"],[2,"2 Erinnerungen"],[4,"4 Erinnerungen"],[5,"5 Erinnerungen"],[0,"nie stapeln"]],when:n=>n.reminders!==!1,help:"Wie Mitteilungen bei iOS: ein Stapel mit Zahl, Antippen klappt ihn auf."},{key:"history",label:"Mitteilungszentrale",type:"boolean",default:!0,help:"Verlauf der Ereignisse \u2013 im Schnellmen\xFC (lange dr\xFCcken) unter \u201EMitteilungen\u201C."},{key:"history_hours",label:"Verlauf reicht zur\xFCck",type:"select",options:[[6,"6 Stunden"],[12,"12 Stunden"],[void 0,"24 Stunden"],[48,"2 Tage"],[168,"1 Woche"]],when:n=>n.history!==!1},{key:"ticker",label:"Nachrichten-Laufband",type:"select",options:[[void 0,"automatisch (aus beim Fernseher)"],[!0,"an"],[!1,"aus"]],help:"Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln."},{key:"text_size",label:"Textgr\xF6\xDFe",type:"select",options:[[void 0,"wie Design"],["normal","normal"],["large","gro\xDF (+15 %)"],["xlarge","sehr gro\xDF (+30 %)"]]},{key:"contrast",label:"Kontrast",type:"select",options:[[void 0,"wie Design"],["normal","normal"],["high","hoch"]]}],cd=[{key:"design.accent",label:"Akzentfarbe",type:"color",help:"Leer = wie Design"},{key:"design.fonts.display",label:"Schrift Uhr & Titel",type:"select",options:[[void 0,"wie Design"],...Qn.slice(1)]},{key:"design.fonts.text",label:"Schrift Text",type:"select",options:[[void 0,"wie Design"],...Qn.slice(1)]},{key:"design.ambient.type",label:"Animation",type:"select",options:[[void 0,"wie Design"],...Qr]},{key:"design.evening",label:"Abendstimmung",type:"select",options:[[void 0,"wie Design"],["sun","dunkel: nach Sonnenuntergang w\xE4rmer"],["off","aus"]]},{key:"design.language",label:"Sprache",type:"select",options:[[void 0,"wie Design"],["auto","automatisch (wie der HA-Benutzer)"],["de","Deutsch"],["en","English"],["nl","Nederlands"],["fr","Fran\xE7ais"]]},{key:"design.radius",label:"Eckenradius der Karten (px)",type:"number",min:0,max:80,placeholder:"wie Design",advanced:!0},{key:"design.css",label:"Eigenes CSS (nur dieses Display)",type:"textarea",placeholder:":host { --af-accent: #e0a060 }",help:"Erg\xE4nzt das CSS aus dem Design.",advanced:!0}],ud=[{key:"stream.enabled",label:"Videostream",type:"boolean",help:"Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut."},{key:"stream.resolution",label:"Aufl\xF6sung",type:"select",options:[[void 0,"4K (3840 \xD7 2160)"],["1080p","Full HD (1920 \xD7 1080)"],["both","4K und Full HD (zwei Kameras)"]],when:t=>!!t.stream?.enabled},{key:"stream.tv",label:"Fernseher (Apple TV)",type:"entity",domains:["media_player"],help:"Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV",when:t=>!!t.stream?.enabled},{key:"stream.interval",label:"Neues Bild alle (s)",type:"number",min:.2,max:60,step:.1,placeholder:"0.2",when:t=>!!t.stream?.enabled,advanced:!0},{key:"stream.renderer",label:"Puppet-Adresse",type:"text",placeholder:"automatisch",help:"Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000",when:t=>!!t.stream?.enabled,advanced:!0}],hd=[{key:"sound.mute",label:"Stumm",type:"boolean",help:"Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben"},{key:"sound.volume",label:"Lautst\xE4rke (%)",type:"number",min:0,max:100,placeholder:"100",help:"Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets",when:t=>!t.sound?.mute},{key:"sound.quiet.after",label:"Ruhezeit ab",type:"text",placeholder:"22:00",when:t=>!t.sound?.mute},{key:"sound.quiet.before",label:"Ruhezeit bis",type:"text",placeholder:"07:00",when:t=>!t.sound?.mute}],ts=[{key:"photos.folder",label:"Fotoordner",type:"text",placeholder:"wie Design",help:"Z. B. media-source://media_source/local/kueche"},{key:"photos.icloud",label:"iCloud-Album",type:"text",placeholder:"wie Design"},{key:"photos.bing",label:"Bing-Bilder",type:"select",options:[[void 0,"wie Design"],[!0,"ja"],[!1,"nein"]]},{key:"photos.bing_mix",label:"Bing-Bilder untermischen",type:"select",options:[[void 0,"wie Design"],[!0,"ja"],[!1,"nein \u2013 nur, wenn nichts Eigenes da ist"]]}],ns=[{key:"design.language",label:"Sprache",type:"select",options:[[void 0,"automatisch (wie der HA-Benutzer)"],["de","Deutsch"],["en","English"],["nl","Nederlands"],["fr","Fran\xE7ais"]],help:"Anzeige, Editor und KI-Zusammenfassung"},{key:"design.mode",label:"Hell/Dunkel",type:"select",options:id},{key:"design.fonts.display",label:"Schrift Uhr & Titel",type:"select",options:Qn},{key:"design.fonts.text",label:"Schrift Text",type:"select",options:Qn},{key:"design.accent",label:"Akzentfarbe",type:"color",help:"Leer = Farbe des Stils"},{key:"design.text_size",label:"Textgr\xF6\xDFe",type:"select",options:[[void 0,"normal"],["large","gro\xDF (+15 %)"],["xlarge","sehr gro\xDF (+30 %)"]],help:"Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung"},{key:"design.contrast",label:"Kontrast",type:"select",options:[[void 0,"normal (ruhig)"],["high","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)"]]},{key:"design.evening",label:"Abendstimmung",type:"select",options:[["sun","dunkel: nach Sonnenuntergang w\xE4rmer"],["off","aus"]]}],pd=[{key:"summary.enabled",label:"Zusammenfassung",type:"boolean",help:"Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen."},{key:"summary.times",label:"Erstellen um",type:"text",placeholder:"05:30, 12:00, 17:30",help:"Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.",when:t=>!!t.summary?.enabled},{key:"summary.style",label:"Stil",type:"select",options:[[void 0,"Knapp, nur Fakten"],["friendly","Freundlich"]],when:t=>!!t.summary?.enabled},{key:"summary.ai_task",label:"KI",type:"entity",domains:["ai_task"],placeholder:"automatisch: Gemini",when:t=>!!t.summary?.enabled}],is=[{key:"design.ambient.type",label:"Animation",type:"select",options:[[void 0,"wie der Stil"],...Qr],help:"Sehr ruhig; nachts aus. Pro Seite \xE4nderbar."},{key:"design.ambient.strength",label:"St\xE4rke",type:"select",options:[[void 0,"dezent"],[2,"mittel"],[3,"deutlich"]],advanced:!0},{key:"design.ambient.speed",label:"Tempo",type:"select",options:[[void 0,"langsam"],["normal","normal"]],advanced:!0},{key:"design.transition.type",label:"Seitenwechsel",type:"select",options:[[void 0,"\xDCberblenden"],...Jr.slice(1)]},{key:"design.transition.duration",label:"Dauer (s)",type:"number",min:.2,max:10,step:.1,placeholder:"2.4",advanced:!0}],md=[{key:"photos.folder",label:"Fotoordner",type:"text",help:"HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C"},{key:"photos.icloud",label:"iCloud-Album",type:"text",placeholder:"https://photos.icloud.com/shared/album/\u2026",help:"Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt."},{key:"photos.bing",label:"Bing-Bilder",type:"boolean",help:"Wenn Ordner und Album leer sind"},{key:"photos.bing_mix",label:"Bing-Bilder untermischen",type:"boolean",help:"Bing-Bilder des Tages auch zwischen die eigenen Fotos",when:t=>t.photos?.bing!==!1},{key:"photos.bing_market",label:"Bing-Region",type:"select",options:[[void 0,"wie die Sprache von Home Assistant"],["de-DE","Deutschland"],["de-AT","\xD6sterreich"],["de-CH","Schweiz"],["en-US","USA"],["en-GB","United Kingdom"],["en-CA","Canada"],["en-AU","Australia"],["en-IN","India"],["fr-FR","France"],["es-ES","Espa\xF1a"],["it-IT","Italia"],["nl-NL","Nederland"],["ja-JP","\u65E5\u672C"],["zh-CN","\u4E2D\u56FD"],["pt-BR","Brasil"]],help:"Bilder und Bildunterschriften der Bing-Bilder des Tages",when:t=>t.photos?.bing!==!1,advanced:!0},{key:"photos.credit",label:"Bildunterschrift",type:"boolean"}],Ce=(t,n)=>Object.keys(t?.states??{}).find(e=>e.startsWith(`${n}.`)),Ye=(t,n)=>Object.keys(t?.states??{}).filter(e=>e.startsWith(`${n}.`)),gd=(t,n)=>{switch(t){case"weather":return{entity:Ce(n,"weather"),variant:"card"};case"camera":return{entity:Ce(n,"camera")};case"calendar":return{entity:Ce(n,"calendar")};case"text":return{text:d("Text"),style:"title"};case"status":return{windows:"auto",lights:"auto"};case"chart":{let e=Ye(n,"sensor").find(i=>n?.states[i]?.attributes.device_class==="temperature");return{entities:e?[{entity:e}]:[]}}case"gauge":{let e=Ye(n,"sensor").find(i=>n?.states[i]?.attributes.unit_of_measurement==="%");return e?{entity:e}:{}}case"persons":return{persons:Ye(n,"person").map(e=>({entity:e}))};case"vacuum":return{vacuums:Ye(n,"vacuum").map(e=>({entity:e}))};case"activity":return{entities:"auto"};case"agenda":return{calendars:Ye(n,"calendar").slice(0,1)};case"media":return{entities:Ye(n,"media_player")};case"covers":return{covers:Ye(n,"cover").map(e=>({entity:e}))};case"infoline":return{items:[{type:"weather",entity:Ce(n,"weather")}]};case"news":return{feeds:Jt()};case"card":return{card:{type:"entities",entities:[]}};default:return{}}},pn=t=>t.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"neu",_e=(t,n)=>{let e=new Set(n);if(!e.has(t))return t;let i=2;for(;e.has(`${t}_${i}`);)i++;return`${t}_${i}`},pe=(t,n,e,i,a,r,s={})=>({id:t,type:n,x:e,y:i,w:a,h:r,options:s}),Pt=[{id:"leer",name:"Leere Seite",build:()=>({duration:30,background:{type:"none"},palette:"normal",widgets:[]})},{id:"foto",name:"Bilderrahmen",build:t=>({duration:90,background:{type:"photo"},palette:"normal",widgets:[pe("uhr","clock",0,4,6,2,{valign:"end"}),pe("datum","date",0,6,7,1),pe("zeile","infoline",0,7,8,1,{items:[{type:"weather",entity:Ce(t,"weather")}]})]})},{id:"standby",name:"StandBy",build:t=>({duration:60,background:{type:"none"},palette:"normal",widgets:[pe("uhr","clock",0,2,7,3,{valign:"end"}),pe("datum","date",0,5,7,1,{color:"accent",size:28}),pe("karte","weather",8,1,4,6,{entity:Ce(t,"weather"),variant:"card"})]})},{id:"morgen",name:"Guten Morgen (KI-Zusammenfassung)",build:t=>({duration:45,background:{type:"none"},palette:"normal",show_if:[{condition:"time",after:"05:00",before:"11:00"}],widgets:[pe("uhr","clock",9,0,3,1,{size:"small",align:"end"}),pe("ueberblick","summary",0,0,8,8),pe("wetter","weather",8,1,4,6,{entity:Ce(t,"weather"),variant:"card"}),pe("datum","date",8,7,4,1,{align:"end"})]})},{id:"news",name:"Nachrichten",build:()=>({duration:60,background:{type:"none"},palette:"normal",widgets:[pe("aufmacher","news",0,0,12,7,{feeds:Jt(),interval:12}),pe("laufband","news",0,7,12,1,{feeds:Jt(),variant:"ticker"})]})},{id:"tagesvorschau",name:"Tagesvorschau am Morgen",build:t=>({duration:30,background:{type:"none"},palette:"normal",show_if:[{condition:"time",after:"05:00",before:"11:00"}],widgets:[pe("vorschau","today",0,0,12,7,{calendars:Ye(t,"calendar").slice(0,2),weather:Ce(t,"weather")}),pe("zeile","infoline",0,7,12,1,{items:[{type:"weather",entity:Ce(t,"weather")}]})]})},{id:"musik",name:"L\xE4uft gerade (ganze Seite)",build:t=>{let n=Ye(t,"media_player");return{duration:30,background:{type:"none"},palette:"normal",show_if:[{condition:"or",conditions:n.map(e=>({condition:"state",entity:e,state:"playing"}))}],widgets:[pe("musik","media",0,0,12,8,{entities:n,variant:"full"})]}}},{id:"artikel",name:"Wikipedia-Artikel des Tages",build:()=>({duration:25,background:{type:"none"},palette:"normal",widgets:[pe("artikel","daily",0,0,12,8)]})},{id:"zitat",name:"Zitat",build:()=>({duration:20,background:{type:"none"},palette:"normal",widgets:[pe("zitat","daily",0,0,12,8,{kind:"quote"})]})},{id:"kamera",name:"Kamera als Hintergrund",build:t=>({duration:30,background:{type:"camera",entity:Ce(t,"camera"),refresh:20},palette:"normal",widgets:[pe("uhr","clock",0,4,6,2,{valign:"end"}),pe("datum","date",0,6,7,1),pe("zeile","infoline",0,7,10,1,{items:[{type:"weather",entity:Ce(t,"weather")},{type:"waste"}]})]})},{id:"info",name:"Info mit Kopfzeile",build:()=>({duration:20,background:{type:"none"},palette:"normal",widgets:[pe("titel","text",0,0,6,1,{text:d("Titel"),style:"label"}),pe("uhr","clock",9,0,3,1,{size:"small",align:"end"})]})}],km=t=>Object.values(t?.states??{}).find(n=>n.entity_id.startsWith("binary_sensor.")&&["motion","occupancy","presence"].includes(n.attributes.device_class))?.entity_id,xm=t=>{let n=e=>{let i=t?.states[e];return i?.state==="playing"?0:i?.state==="paused"?1:i?.attributes.media_title?2:3};return Ye(t,"media_player").sort((e,i)=>n(e)-n(i)).slice(0,3)},za=[{id:"klingel",name:"Klingel \u2192 Vollbild",build:t=>({name:d("Klingel"),enabled:!0,entity:"",to:"on",kind:"alarm",camera:Ce(t,"camera"),title:d("Es klingelt"),where:d("Haust\xFCr"),max:120,hold_after:30})},{id:"bewegung",name:"Bewegung \u2192 Bild-im-Bild",build:t=>({name:d("Bewegung"),enabled:!0,entity:"",to:"on",kind:"live",camera:Ce(t,"camera"),title:d("Bewegung"),where:"",duration:30,cooldown:120})},{id:"geraet",name:"Ger\xE4t fertig \u2192 Hinweis",build:()=>({name:d("Ger\xE4t fertig"),enabled:!0,entity:"",from:"on",to:"off",kind:"info",icon:"washer",title:d("Waschmaschine fertig"),where:"",chip:d("W\xE4sche fertig")})},{id:"warnung",name:"Warnung \u2192 Vollbild",build:()=>({name:d("Warnung"),enabled:!0,entity:"",to:"on",kind:"info",icon:"warning",title:d("Warnung"),where:"",text_attribute:"headline",at_night:!0,duration:120})},{id:"seite",name:"Bewegung \u2192 Seite zeigen",build:(t,n)=>({name:d("Bewegung \u2192 Seite"),enabled:!0,entity:km(t),to:"on",kind:"page",page:n?.pages[0]?.id,title:"",where:"",duration:60})},{id:"musik",name:"Musik \u2192 Cover",build:t=>({name:d("Musik"),enabled:!0,kind:"media",entities:xm(t),title:"",where:""})}];var Sm=["welcome","place","content","events","photos","device","done"],$m=["place","content","device","done"],Am=["news","morgen","kamera"],Tm=t=>structuredClone(t),ot=(t,n)=>Object.keys(t?.states??{}).filter(e=>e.startsWith(`${n}.`)),Xn=(t,n)=>String(t?.states[n]?.attributes.friendly_name??n),It=(t,n,e)=>e.test(n)||e.test(Xn(t,n)),fd=/klingel|doorbell|ding|besucher|visitor|ring/i,as=/t[üu]r|door|front|eingang|haus|entrance/i,Em=/wasch|washer|washing|trockner|dryer|sp[üu]l|dishwash/i,ei=class extends oe{constructor(){super(...arguments);this.mode="first";this.step=0;this.profileId="kitchen";this.name="";this.pages=new Set;this.extras=new Set;this.language="auto";this.theme="ruhig";this.doorbell={on:!1,entity:"",camera:"",sound:"klangschale"};this.motion={on:!1,entity:"",camera:"",sound:"hinweis"};this.appliances=new Set;this.photos={folder:"",icloud:"",bing:!0};this.control="embedded";this.dashboard="/lovelace/0";this.prepared=!1}get steps(){return this.mode==="first"?Sm:$m}get profile(){return Ea.find(e=>e.id===this.profileId)??Ea[0]}willUpdate(){if(this.prepared||!this.config)return;this.prepared=!0;let e=this.config;this.language=e.design.language??"auto",this.theme=e.design.theme,this.photos={folder:e.photos.folder??"",icloud:e.photos.icloud??"",bing:e.photos.bing!==!1},this.dashboard=e.displays[0]?.control?.dashboard??"/lovelace/0",this.pickProfile(this.profileId),this.detectEvents()}doorbellCandidates(){let e=this.hass;return[...ot(e,"binary_sensor"),...ot(e,"event")].filter(i=>It(e,i,fd)||e?.states[i]?.attributes.device_class==="doorbell")}motionCandidates(){let e=this.hass,i=ot(e,"binary_sensor").filter(a=>["motion","occupancy","presence"].includes(e?.states[a]?.attributes.device_class)||It(e,a,/bewegung|motion/i));return[...i.filter(a=>It(e,a,as)),...i.filter(a=>!It(e,a,as))]}applianceCandidates(){let e=this.hass;return[...ot(e,"input_boolean"),...ot(e,"binary_sensor")].filter(i=>It(e,i,Em))}detectEvents(){let e=this.config?.events??[],i=new Set(e.flatMap(h=>[h.entity,...h.entities??[]])),a=ot(this.hass,"camera"),r=a.find(h=>It(this.hass,h,as))??a[0]??"",s=e.find(h=>h.kind==="alarm"&&h.entity&&It(this.hass,h.entity,fd)),o=e.find(h=>h.kind==="live"),l=s?.entity??this.doorbellCandidates()[0]??"",c=o?.entity??this.motionCandidates()[0]??"";this.doorbell={...this.doorbell,on:!!l&&!s,entity:l,camera:s?.camera??r},this.motion={...this.motion,on:!!c&&!o,entity:c,camera:o?.camera??r},this.appliances=new Set(this.applianceCandidates().filter(h=>!i.has(h)))}pickProfile(e){let i=d(this.profile.name);this.profileId=e;let a=this.profile;(!this.name||this.name===i)&&(this.name=d(a.name)),this.pages=new Set(qr(a,this.config?.pages??[]).map(o=>o.page));let r=a.display.control;this.control=r?.enabled===!1?"off":r?.mode??"embedded";let s={news:"news",morgen:"morning",kamera:"camera"};this.extras=new Set(this.offeredTemplates().filter(o=>a.pages.includes(s[o])))}offeredTemplates(){let e=this.config?.pages??[],i={news:e.some(a=>a.widgets.some(r=>r.type==="news")),morgen:e.some(a=>a.widgets.some(r=>r.type==="summary")),kamera:e.some(a=>a.background.type==="camera")||!ot(this.hass,"camera").length};return Am.filter(a=>!i[a])}build(){let e=Tm(this.config);this.mode==="first"&&(e.design.theme=this.theme,this.language==="auto"?delete e.design.language:e.design.language=this.language,e.photos={...e.photos,folder:this.photos.folder.trim(),bing:this.photos.bing},this.photos.icloud.trim()?e.photos.icloud=this.photos.icloud.trim():delete e.photos.icloud,this.addEvents(e));let i=[];for(let b of this.extras){let f=Pt.find($=>$.id===b);if(!f)continue;let v=_e(b,e.pages.map($=>$.id));e.pages.push({id:v,name:d(f.name),...f.build(this.hass)}),i.push(v)}let a=this.profile,r=this.name.trim()||d(a.name),s=this.mode==="first"?e.displays[0]:void 0,o=s?s.id:_e(pn(r)||"display",e.displays.map(b=>b.id)),l=Xl(a,e,o,r),c=l.playlist.map(b=>b.page).filter(b=>this.pages.has(b)),h=e.pages.map(b=>b.id).filter(b=>this.pages.has(b)&&!c.includes(b)),p=[...c,...h,...i];l.playlist=(p.length?p:[e.pages[0].id]).map(b=>({page:b})),l.control=this.control==="off"?{enabled:!1,dashboard:this.dashboard,idle:60}:{...l.control,enabled:!0,mode:this.control,dashboard:this.dashboard};let g=this.fullyButton();return g&&(l.watchdog={button:g,after:120}),s?e.displays[0]={...s,...l,night:l.night.page?l.night:s.night}:e.displays.push(l),e.setup_complete=!0,{config:e,displayId:o}}addEvents(e){let i=()=>e.events.map(o=>o.id),a=(o,l)=>{let c=za.find(h=>h.id===o);e.events.push({...c.build(this.hass,e),...l,id:_e(o,i())})},r=this.doorbell;if(r.on&&r.entity){let o=r.entity.startsWith("event.");a("klingel",{entity:r.entity,to:o?"*":"on",camera:r.camera||void 0,sound:r.sound||void 0,volume:80})}let s=this.motion;s.on&&s.entity&&a("bewegung",{entity:s.entity,camera:s.camera||void 0,sound:s.sound||void 0,volume:30,quiet:{after:"22:00",before:"07:00"},quiet_action:"mute"});for(let o of this.appliances){let l=o+Xn(this.hass,o),c=/trockner|dryer/i.test(l),h=/sp[üu]l|dishwash/i.test(l);a("geraet",{name:Xn(this.hass,o),entity:o,title:c?d("Trockner fertig"):h?d("Sp\xFClmaschine fertig"):d("Waschmaschine fertig"),chip:c?d("Trockner fertig"):h?d("Sp\xFClmaschine fertig"):d("W\xE4sche fertig"),icon:c?"dryer":"washer",sound:"glas",volume:50,quiet:{after:"22:00",before:"07:00"},quiet_action:"mute"})}}fullyButton(){if(this.control==="off")return;let e=new Set((this.config?.displays??[]).filter((a,r)=>!(this.mode==="first"&&r===0)).map(a=>a.watchdog?.button)),i=ot(this.hass,"button").filter(a=>/start_?url/i.test(a)&&!e.has(a));return i.length===1?i[0]:void 0}finish(){this.dispatchEvent(new CustomEvent("wizard-done",{detail:this.build(),bubbles:!0,composed:!0}))}close(){this.dispatchEvent(new CustomEvent("wizard-close",{bubbles:!0,composed:!0}))}render(){if(!this.config)return m;let e=this.steps,i=e[this.step],a=this.step===e.length-1;return u`<div class="card" role="dialog" aria-modal="true">
      <header>
        <div class="title">${X("sparkle","ic")}${this.mode==="first"?d("Willkommen bei Ambiframe"):d("Neues Display")}</div>
        <div class="dots">${e.map((r,s)=>u`<i class=${s===this.step?"on":s<this.step?"done":""}></i>`)}</div>
      </header>
      <main>${this.renderStep(i)}</main>
      <footer>
        <button class="ghost" @click=${()=>this.close()}>${this.mode==="first"?d("\xDCberspringen"):d("Abbrechen")}</button>
        <span class="grow"></span>
        ${this.step>0?u`<button @click=${()=>this.step--}>${d("Zur\xFCck")}</button>`:m}
        ${a?u`<button class="primary" @click=${()=>this.finish()}>${d("Fertig \u2013 speichern")}</button>`:u`<button class="primary" ?disabled=${i==="place"&&!this.name.trim()} @click=${()=>this.step++}>${d("Weiter")}</button>`}
      </footer>
    </div>`}renderStep(e){switch(e){case"welcome":return this.renderWelcome();case"place":return this.renderPlace();case"content":return this.renderContent();case"events":return this.renderEvents();case"photos":return this.renderPhotos();case"device":return this.renderDevice();default:return this.renderDone()}}renderWelcome(){let e=[["auto",d("automatisch (wie der HA-Benutzer)")],["de","Deutsch"],["en","English"],["nl","Nederlands"],["fr","Fran\xE7ais"]];return u`<h2>${d("Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist")}</h2>
      <p class="lead">
        ${d("In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.")}
      </p>
      <label class="field"
        ><span>${d("Sprache")}</span>
        <select @change=${i=>this.language=i.target.value}>
          ${e.map(([i,a])=>u`<option value=${i} ?selected=${this.language===i}>${a}</option>`)}
        </select></label
      >
      <h3>${d("Stil")}</h3>
      <div class="grid">
        ${ht.map(i=>u`<button class="choice ${this.theme===i.id?"on":""}" @click=${()=>this.theme=i.id}>
            <b>${d(i.name)}</b><span>${d(i.hint)}</span>
          </button>`)}
      </div>`}renderPlace(){return u`<h2>${d("Wo h\xE4ngt das Display?")}</h2>
      <p class="lead">${d("Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.")}</p>
      <div class="grid">
        ${Ea.map(e=>u`<button class="choice ${this.profileId===e.id?"on":""}" @click=${()=>this.pickProfile(e.id)}>
            <b>${X(e.icon,"ic")}${d(e.name)}</b><span>${d(e.hint)}</span>
          </button>`)}
      </div>
      <label class="field"
        ><span>${d("Name")}</span><input .value=${this.name} @input=${e=>this.name=e.target.value}
      /></label>`}toggled(e,i){let a=new Set(e);return a.has(i)?a.delete(i):a.add(i),a}renderContent(){let e=this.offeredTemplates();return u`<h2>${d("Was soll das Display zeigen?")}</h2>
      <p class="lead">${d("Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.")}</p>
      <div class="checks">
        ${this.config.pages.map(i=>u`<label class="check"
            ><input type="checkbox" .checked=${this.pages.has(i.id)} @change=${()=>this.pages=this.toggled(this.pages,i.id)} /><span
              >${i.name}</span
            ></label
          >`)}
      </div>
      ${e.length?u`<h3>${d("Neue Seiten dazu")}</h3>
            <div class="checks">
              ${e.map(i=>u`<label class="check"
                  ><input type="checkbox" .checked=${this.extras.has(i)} @change=${()=>this.extras=this.toggled(this.extras,i)} /><span
                    >${d(Pt.find(a=>a.id===i).name)}</span
                  ></label
                >`)}
            </div>`:m}`}entitySelect(e,i,a){return u`<select @change=${r=>a(r.target.value)}>
      <option value="" ?selected=${!e}>${d("keine")}</option>
      ${i.map(r=>u`<option value=${r} ?selected=${r===e}>${Xn(this.hass,r)}</option>`)}
    </select>`}soundSelect(e,i,a){return u`<span class="sound">
      <select @change=${r=>i(r.target.value)}>
        <option value="" ?selected=${!e}>${d("ohne Ton")}</option>
        ${Wn.filter(([r])=>r!=="alarm").map(([r,s])=>u`<option value=${r} ?selected=${r===e}>${d(s)}</option>`)}
      </select>
      <button class="small" ?disabled=${!e} title=${d("Anh\xF6ren")} @click=${()=>e&&nn(e,a)}>▶</button>
    </span>`}renderEvent(e,i,a,r,s,o,l){return u`<div class="event ${a.on?"":"off"}">
      <label class="switch"
        ><input type="checkbox" .checked=${a.on} @change=${()=>r({...a,on:!a.on})} /><b>${X(e,"ic")}${i}</b></label
      >
      <div class="rows">
        <label><span>${d("Ausl\xF6ser")}</span>${this.entitySelect(a.entity,s,c=>r({...a,entity:c}))}</label>
        <label><span>${d("Kamera")}</span>${this.entitySelect(a.camera,ot(this.hass,"camera"),c=>r({...a,camera:c}))}</label>
        <label><span>${d("Ton")}</span>${this.soundSelect(a.sound,c=>r({...a,sound:c}),o)}</label>
      </div>
      ${l?u`<p class="hint">${l}</p>`:m}
    </div>`}renderEvents(){let e=this.applianceCandidates();return u`<h2>${d("Worauf soll es reagieren?")}</h2>
      <p class="lead">${d("Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.")}</p>
      ${this.renderEvent("bell",d("Klingel \u2192 Vollbild mit Kamera"),this.doorbell,i=>this.doorbell=i,this.doorbellCandidates(),80)}
      ${this.renderEvent("motion",d("Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild"),this.motion,i=>this.motion=i,this.motionCandidates(),30,d("Leiser als die Klingel, nachts (22\u20137 Uhr) stumm."))}
      ${e.length?u`<div class="event">
            <b>${X("washer","ic")}${d("Ger\xE4t fertig \u2192 Hinweis und Erinnerung")}</b>
            <div class="checks">
              ${e.map(i=>u`<label class="check"
                  ><input type="checkbox" .checked=${this.appliances.has(i)} @change=${()=>this.appliances=this.toggled(this.appliances,i)} /><span
                    >${Xn(this.hass,i)}</span
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
          @input=${i=>this.photos={...e,folder:i.target.value}}
      /></label>
      <p class="hint">${d("HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.")}</p>
      <label class="field"
        ><span>${d("iCloud-Album")}</span
        ><input
          .value=${e.icloud}
          placeholder="https://photos.icloud.com/shared/album/…"
          @input=${i=>this.photos={...e,icloud:i.target.value}}
      /></label>
      <p class="hint">${d("Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.")}</p>
      <label class="check"
        ><input type="checkbox" .checked=${e.bing} @change=${()=>this.photos={...e,bing:!e.bing}} /><span
          >${d("Bing-Bilder, wenn Ordner und Album leer sind")}</span
        ></label
      >`}renderDevice(){let e=[["embedded",d("Dashboard \xFCber Ambiframe"),d("Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.")],["screensaver",d("Ambiframe als Bildschirmschoner"),d("Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.")],["off",d("Nur anzeigen"),d("Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.")]];return u`<h2>${d("Bedienung")}</h2>
      <div class="grid">
        ${e.map(([i,a,r])=>u`<button class="choice ${this.control===i?"on":""}" @click=${()=>this.control=i}>
            <b>${a}</b><span>${r}</span>
          </button>`)}
      </div>
      ${this.control!=="off"?u`<label class="field"
            ><span>${d("Dashboard")}</span><input .value=${this.dashboard} @input=${i=>this.dashboard=i.target.value}
          /></label>`:m}
      <p class="hint">
        ${this.fullyButton()?d("Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt."):d("Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.")}
      </p>`}renderDone(){let{config:e,displayId:i}=this.build(),a=e.displays.find(c=>c.id===i),r=`${location.origin}/ambiframe-display?display=${encodeURIComponent(i)}`,s=(0,bd.default)(0,"M");s.addData(r),s.make();let o=e.events.length-this.config.events.length,l=this.control==="off"?d("Nur anzeigen"):this.control==="screensaver"?d("Ambiframe als Bildschirmschoner"):d("Dashboard \xFCber Ambiframe");return u`<h2>${d("Fertig!")}</h2>
      <p class="lead">
        ${d("So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.")}
      </p>
      <div class="done">
        <div class="qr">${Rt(s.createSvgTag({cellSize:4,margin:2,scalable:!0}))}</div>
        <div>
          <code>${r}</code>
          <p><button class="small" @click=${()=>navigator.clipboard?.writeText(r)}>${d("Adresse kopieren")}</button></p>
          <ul>
            <li>${d("Display \u201E{name}\u201C mit {n} Seiten",{name:a.name,n:a.playlist.length})}</li>
            ${o>0?u`<li>${d("{n} neue Ereignisse",{n:o})}</li>`:m}
            <li>${l}</li>
          </ul>
        </div>
      </div>`}};ei.properties={hass:{attribute:!1},config:{attribute:!1},mode:{},step:{state:!0},profileId:{state:!0},name:{state:!0},pages:{state:!0},extras:{state:!0},language:{state:!0},theme:{state:!0},doorbell:{state:!0},motion:{state:!0},appliances:{state:!0},photos:{state:!0},control:{state:!0},dashboard:{state:!0}},ei.styles=C`
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
  `;B("af-wizard",ei);var zm=new Set("sensor binary_sensor weather camera calendar light switch media_player person device_tracker input_boolean input_number input_select input_text input_datetime input_button cover climate vacuum fan lock button event image todo zone sun alarm_control_panel automation script scene select number update ai_task water_heater humidifier siren valve lawn_mower text time date schedule counter timer group remote".split(" ")),Lm=/^([a-z_]+)\.[a-z0-9_]+$/,rs=(t,n=new Set)=>{if(typeof t=="string"){let e=Lm.exec(t);e&&zm.has(e[1])&&n.add(t)}else if(Array.isArray(t))for(let e of t)rs(e,n);else if(t&&typeof t=="object")for(let e of Object.values(t))rs(e,n);return n},_m=15,ss=(t,n,e={},i,a)=>{let r=[],s=n?.states??{},o=Object.keys(s).length>0,l=new Map,c=(f,v,$)=>{if(o)for(let I of rs(f)){let T=s[I],F=T?T.state==="unavailable"?"warn":void 0:"error";if(!F)continue;let S=l.get(I)??{level:F,wheres:[],go:$};S.wheres.includes(v)||S.wheres.push(v),l.set(I,S)}};for(let f of t.pages){c([f.show_if,f.background],d("Seite \u201E{name}\u201C",{name:f.name}),{tab:"seiten",pageId:f.id});for(let v of f.widgets)c([v.options,v.show_if,v.tap_action,v.hold_action],d("Seite \u201E{name}\u201C",{name:f.name}),{tab:"seiten",pageId:f.id,widgetId:v.id})}for(let f of t.events)f.enabled!==!1&&c(f,d("Ereignis \u201E{name}\u201C",{name:f.name||f.title||f.id}),{tab:"ereignisse",eventId:f.id});for(let f of t.displays)c([f.night,f.watchdog,f.playlist],d("Display \u201E{name}\u201C",{name:f.name}),{tab:"wiedergabe",displayId:f.id});c(t.summary,d("KI-Zusammenfassung"),{tab:"design"});for(let[f,v]of l){let $=v.wheres.length>2?`${v.wheres.slice(0,2).join(", ")} \u2026`:v.wheres.join(", ");r.push({level:v.level,text:v.level==="error"?d("{id} gibt es nicht (mehr) \u2013 {where}",{id:f,where:$}):d("{id} ist nicht verf\xFCgbar \u2013 {where}",{id:f,where:$}),go:v.go})}let h=Date.now();for(let f of t.displays){let v=e[f.id],$={tab:"wiedergabe",displayId:f.id};if(!v||!v.online&&!v.last_seen){r.push({level:"info",text:d("Display \u201E{name}\u201C war noch nie verbunden",{name:f.name}),go:$});continue}if(!v.online&&v.last_seen&&h-new Date(v.last_seen).getTime()>_m*6e4){let I=Math.round((h-new Date(v.last_seen).getTime())/36e5);r.push({level:"warn",text:I>=1?d("Display \u201E{name}\u201C meldet sich seit {n} h nicht",{name:f.name,n:I}):d("Display \u201E{name}\u201C meldet sich nicht",{name:f.name}),go:$})}for(let I of v.clients)I.safe?r.push({level:"warn",text:d("\u201E{name}\u201C ist im Notfallmodus: {reason}",{name:I.name,reason:d(I.safe)}),go:$}):a&&I.version&&I.version!==a&&r.push({level:"info",text:d("\u201E{name}\u201C hat noch eine \xE4ltere Version",{name:I.name}),go:$})}let p=new Set;for(let f of t.displays){for(let v of f.playlist)p.add(v.page);f.night?.page&&p.add(f.night.page)}for(let f of t.events)f.page&&p.add(f.page);for(let f of t.pages)for(let v of f.widgets)for(let $ of[v.tap_action,v.hold_action])$?.page&&p.add($.page);for(let f of t.pages)p.has(f.id)||r.push({level:"info",text:d("Seite \u201E{name}\u201C wird nirgends gezeigt",{name:f.name}),go:{tab:"seiten",pageId:f.id}});t.pages.some(f=>f.background.type==="photo"&&p.has(f.id))&&i&&(!((i.folder??0)+(i.icloud??0))&&!t.photos.bing?r.push({level:"error",text:d("Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)"),go:{tab:"design"}}):t.photos.folder&&i.folder===0&&r.push({level:"warn",text:d("Der Fotoordner ist leer oder fehlt"),go:{tab:"design"}}),t.photos.icloud&&i.icloud===0&&r.push({level:"warn",text:d("Das iCloud-Album liefert keine Fotos"),go:{tab:"design"}})),t.summary?.enabled&&o&&!t.summary.ai_task&&!Object.keys(s).some(f=>f.startsWith("ai_task."))&&r.push({level:"warn",text:d("KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant"),go:{tab:"design"}});let b={error:0,warn:1,info:2};return r.sort((f,v)=>b[f.level]-b[v.level])};var ze=t=>JSON.parse(JSON.stringify(t)),vd=t=>{if(!(t==null||t==="")){if(Array.isArray(t))return t;if(typeof t=="object"){let n={};for(let[e,i]of Object.entries(t)){let a=vd(i);a!==void 0&&(n[e]=a)}return Object.keys(n).length?n:void 0}return t}},Dm=t=>t.map(n=>n.type==="select"&&Array.isArray(n.options)?{...n,options:[[void 0,"wie alle Displays"],...n.options.filter(([e])=>e!==void 0)]}:n.type==="number"||n.type==="text"||n.type==="textarea"?{...n,placeholder:"wie alle Displays"}:n),La=t=>bt(t,{lineWidth:120,noRefs:!0}),ti=class extends oe{constructor(){super(...arguments);this.narrow=!1;this.tab="seiten";this.plOpen=new Set;this.multi=[];this.clip=null;this.pageImport=null;this.designScope="";this.healthOpen=!1;this.wizard="";this.wizardSkipped=!1;this.advanced=(()=>{try{return(localStorage.getItem("ambiframe-editor-advanced")??localStorage.getItem("wandbild-editor-advanced"))==="1"}catch{return!1}})();this.importText=null;this.presetName="";this.pageId="";this.widgetId=null;this.eventId="";this.displayId="";this.message=null;this.saving=!1;this.yaml="";this.menu="";this.layout="landscape";this.summaryBusy=!1;this.mediaSounds=[];this.mediaSoundsLoading=!1;this.summaryNote="";this.history=[];this.future=[];this.coalesceKey="";this.devices={};this.onCopy=e=>{if(e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]")||this.tab!=="seiten"||!this.selection.length)return;let a=this.selectedWidgets();e.preventDefault(),e.clipboardData?.setData("text/plain",bt({ambiframe_widgets:a},{lineWidth:120})),this.clip=a,this.message={kind:"ok",text:a.length===1?d("Widget kopiert."):d("{n} Widgets kopiert.",{n:a.length})}};this.onPaste=e=>{if(e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]")||this.tab!=="seiten")return;let a=e.clipboardData?.getData("text/plain")??"";this.pasteText(a)&&e.preventDefault()};this.onKey=e=>{let i=e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]"),a=e.metaKey||e.ctrlKey;if(a&&e.key.toLowerCase()==="s")e.preventDefault(),this.save();else if(a&&e.key.toLowerCase()==="z"&&!i)e.preventDefault(),e.shiftKey?this.redo():this.undo();else if(!i&&this.tab==="seiten"&&this.widgetId){let r=zt,s={ArrowLeft:[-r,0],ArrowRight:[r,0],ArrowUp:[0,-r],ArrowDown:[0,r]};if(e.key==="Delete"||e.key==="Backspace")e.preventDefault(),this.removeWidget();else if(e.key==="Escape")this.widgetId=null,this.multi=[];else if(s[e.key]){e.preventDefault();let[o,l]=s[e.key],c=fe[this.layout],p=(this.page?.widgets??[]).filter(g=>this.selection.includes(g.id)).map(g=>({id:g.id,pos:this.posOf(g)}));if(!p.length)return;if(e.shiftKey){let g=p[0].pos,b={...g,w:Math.min(Math.max(r,g.w+o),c.cols-g.x),h:Math.min(Math.max(r,g.h+l),c.rows-g.y)};this.updatePage(f=>this.setPos(f,p[0].id,b),"keys")}else p.every(({pos:b})=>b.x+o>=0&&b.x+b.w+o<=c.cols&&b.y+l>=0&&b.y+b.h+l<=c.rows)&&this.updatePage(b=>p.forEach(({id:f,pos:v})=>this.setPos(b,f,{...v,x:v.x+o,y:v.y+l})),"keys")}else a&&e.key.toLowerCase()==="d"&&(e.preventDefault(),this.duplicateWidget())}}}setAdvanced(e){this.advanced=e;try{localStorage.setItem("ambiframe-editor-advanced",e?"1":"0")}catch{}!e&&this.tab==="yaml"&&(this.tab="seiten")}updated(){this.hass&&!this.unsub&&(this.unsub=this.hass.connection.subscribeMessage(e=>this.onConfig(e.config),{type:"ambiframe/config/subscribe"}).catch(e=>{this.message={kind:"error",text:d("Ambiframe ist nicht erreichbar: {error}",{error:String(e?.message??e)})}})),this.tab==="wiedergabe"&&!this.devicesTimer&&this.hass?(this.loadDevices(),this.devicesTimer=window.setInterval(()=>{this.loadDevices()},1e4)):this.tab!=="wiedergabe"&&this.devicesTimer&&(clearInterval(this.devicesTimer),this.devicesTimer=void 0)}async generateSummary(){this.summaryBusy=!0,this.summaryNote="";try{let e=await this.hass.callWS({type:"ambiframe/summary/generate"});this.summaryNote=`Fertig: \u201E${e.headline}\u201C`}catch(e){this.summaryNote=e.message??d("Fehlgeschlagen")}finally{this.summaryBusy=!1}}async loadDevices(){try{this.devices=await this.hass?.callWS({type:"ambiframe/displays/status"})??{}}catch{}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey),window.addEventListener("copy",this.onCopy),window.addEventListener("paste",this.onPaste)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),window.removeEventListener("copy",this.onCopy),window.removeEventListener("paste",this.onPaste),this.unsub?.then(e=>e?.()),this.unsub=void 0,clearInterval(this.devicesTimer),this.devicesTimer=void 0}onConfig(e){let i=this.dirty;this.saved=e,(!i||!this.draft)&&(this.draft=ze(e),this.history=[],this.future=[]),this.ensureSelection()}ensureSelection(){let e=this.draft;if(!e)return;e.pages.some(a=>a.id===this.pageId)||(this.pageId=e.pages[0]?.id??""),e.displays.some(a=>a.id===this.displayId)||(this.displayId=e.displays[0]?.id??""),e.events.some(a=>a.id===this.eventId)||(this.eventId=e.events[0]?.id??"");let i=e.pages.find(a=>a.id===this.pageId);this.widgetId&&!i?.widgets.some(a=>a.id===this.widgetId)&&(this.widgetId=null)}get dirty(){return!!this.draft&&!!this.saved&&JSON.stringify(this.draft)!==JSON.stringify(this.saved)}mutate(e,i=""){if(!this.draft)return;(!i||i!==this.coalesceKey)&&(this.history.push(JSON.stringify(this.draft)),this.history.length>100&&this.history.shift(),this.future=[]),this.coalesceKey=i;let a=ze(this.draft);e(a),this.draft=a,this.message=null,this.ensureSelection()}undo(){let e=this.history.pop();!e||!this.draft||(this.future.push(JSON.stringify(this.draft)),this.draft=JSON.parse(e),this.coalesceKey="",this.ensureSelection())}redo(){let e=this.future.pop();!e||!this.draft||(this.history.push(JSON.stringify(this.draft)),this.draft=JSON.parse(e),this.coalesceKey="",this.ensureSelection())}async save(){if(!(!this.hass||!this.draft)){this.saving=!0;try{await this.hass.callWS({type:"ambiframe/config/save",config:this.draft,language:ai()}),this.saved=ze(this.draft),this.message={kind:"ok",text:d("Gespeichert \u2013 alle Displays zeigen es sofort.")}}catch(e){this.message={kind:"error",text:e.message??String(e)}}finally{this.saving=!1}}}discard(){this.saved&&(this.mutate(e=>Object.assign(e,ze(this.saved))),this.message=null)}willUpdate(e){(e.has("pageId")||e.has("layout"))&&(this.multi=[])}get selection(){let e=new Set(this.page?.widgets.map(i=>i.id));return this.widgetId?[this.widgetId,...this.multi.filter(i=>i!==this.widgetId&&e.has(i))]:[]}onSelect(e){let{id:i,toggle:a,keep:r}=e.detail,s=this.selection;if(!i)this.widgetId=null,this.multi=[];else if(a)if(s.includes(i)){let o=s.filter(l=>l!==i);this.widgetId=o[0]??null,this.multi=o.slice(1)}else this.widgetId?this.multi=[...this.multi,i]:this.widgetId=i;else r&&s.includes(i)?(this.widgetId=i,this.multi=s.filter(o=>o!==i)):(this.widgetId=i,this.multi=[])}selectedWidgets(){let e=this.selection;return ze((this.page?.widgets??[]).filter(i=>e.includes(i.id)))}async copyWidgets(e=this.selectedWidgets()){if(e.length){this.clip=e;try{await navigator.clipboard.writeText(bt({ambiframe_widgets:e},{lineWidth:120}))}catch{}this.message={kind:"ok",text:e.length===1?d("Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen."):d("{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.",{n:e.length})}}}pasteWidgets(e){let i=this.page;if(!i||!e.length)return;let a=i.widgets.map(l=>l.id),r=[],s=e.every(l=>i.widgets.some(c=>c.x===l.x&&c.y===l.y&&c.type===l.type)),o=i.widgets.some(l=>l.portrait);this.updatePage(l=>{for(let c of e){if(!c?.type||!Ke[c.type])continue;let h=ze(c);h.id=_e(h.id||h.type,[...a,...r]),r.push(h.id),h.w=Math.min(Math.max(1,h.w??2),12),h.h=Math.min(Math.max(1,h.h??1),8),h.x=Math.min(Math.max(0,(h.x??0)+(s?1:0)),12-h.w),h.y=Math.min(Math.max(0,(h.y??0)+(s?1:0)),8-h.h),h.options??={},o?h.portrait||(h.portrait={x:0,y:Math.max(0,fe.portrait.rows-Math.min(h.h,fe.portrait.rows)),w:fe.portrait.cols,h:Math.min(h.h,fe.portrait.rows)}):delete h.portrait,l.widgets.push(h)}}),this.widgetId=r[0]??null,this.multi=r.slice(1)}pasteText(e){let i;try{i=Mt(e)}catch{return!1}return Array.isArray(i?.ambiframe_widgets)?(this.pasteWidgets(i.ambiframe_widgets),!0):i?.ambiframe_page&&typeof i.ambiframe_page=="object"?(this.importPage(i.ambiframe_page),!0):!1}saveWidgetTemplate(){let e=this.selectedWidgets();if(!e.length)return;let i=prompt(d("Name der Vorlage"),e.length===1?d(Ke[e[0].type]?.name??e[0].type):d("{n} Widgets",{n:e.length}));i?.trim()&&(this.mutate(a=>{let r=(a.templates??={}).widgets??=[],s=r.find(o=>o.name===i.trim());s?s.widgets=e:r.push({name:i.trim(),widgets:e})}),this.message={kind:"ok",text:d("Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.",{name:i.trim()})})}savePageTemplate(){let e=this.page;if(!e)return;let i=prompt(d("Name der Seitenvorlage"),e.name);if(!i?.trim())return;let{id:a,name:r,...s}=ze(e);this.mutate(o=>{let l=(o.templates??={}).pages??=[],c=l.find(h=>h.name===i.trim());c?c.page=s:l.push({name:i.trim(),page:s})}),this.menu="",this.message={kind:"ok",text:d("Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.",{name:i.trim()})}}async exportPage(){let e=this.page;if(!e)return;let i=bt({ambiframe_page:e},{lineWidth:120});try{await navigator.clipboard.writeText(i),this.message={kind:"ok",text:d("Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.",{name:e.name})}}catch{this.pageImport=i,this.message={kind:"ok",text:d("Seite unten als YAML \u2013 zum Kopieren markieren.")}}}importPage(e,i){if(!Array.isArray(e.widgets)){this.message={kind:"error",text:d("Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).")};return}let a=i??e.name??d("Importierte Seite"),r=_e(pn(a),this.draft?.pages.map(o=>o.id)??[]),s={duration:30,background:{type:"none"},palette:"normal",...ze(e),id:r,name:a};this.mutate(o=>{o.pages.push(s),(o.displays.find(c=>c.id===this.displayId)??o.displays[0])?.playlist.push({page:r})}),this.pageId=r,this.widgetId=null,this.menu="",this.pageImport=null,this.message={kind:"ok",text:d("Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.",{name:a})}}get page(){return this.draft?.pages.find(e=>e.id===this.pageId)}get widget(){return this.page?.widgets.find(e=>e.id===this.widgetId)}updatePage(e,i=""){let a=this.pageId;this.mutate(r=>{let s=r.pages.find(o=>o.id===a);s&&e(s)},i)}posOf(e){return this.layout==="landscape"?{x:e.x,y:e.y,w:e.w,h:e.h}:Lt(this.page?.widgets??[],"portrait")[e.id]??{x:0,y:0,w:fe.portrait.cols,h:1}}setPos(e,i,a){let r=e.widgets.find(s=>s.id===i);if(r){if(this.layout==="landscape"){Object.assign(r,a);return}if(e.widgets.some(s=>!s.portrait)){let s=Lt(e.widgets,"portrait");for(let o of e.widgets)o.portrait??=s[o.id]??{x:0,y:fe.portrait.rows-1,w:fe.portrait.cols,h:1}}r.portrait={...a}}}updateWidget(e,i=""){let a=this.widgetId;this.updatePage(r=>{let s=r.widgets.find(o=>o.id===a);s&&e(s)},i)}addPage(e){let i=Pt.find(s=>s.id===e)??Pt[0],a=i.id==="leer"?d("Neue Seite"):d(i.name),r=_e(pn(a),this.draft?.pages.map(s=>s.id)??[]);this.mutate(s=>{s.pages.push({id:r,name:a,...i.build(this.hass)}),(s.displays.find(l=>l.id===this.displayId)??s.displays[0])?.playlist.push({page:r})}),this.pageId=r,this.widgetId=null,this.menu=""}duplicatePage(){let e=this.page;if(!e)return;let i=_e(`${e.id}_kopie`,this.draft?.pages.map(a=>a.id)??[]);this.mutate(a=>a.pages.push({...ze(e),id:i,name:`${e.name} (Kopie)`})),this.pageId=i}removePage(){let e=this.page;!e||!confirm(d("Seite \u201E{name}\u201C l\xF6schen?",{name:e.name}))||(this.mutate(i=>{i.pages=i.pages.filter(a=>a.id!==e.id);for(let a of i.displays)a.playlist=a.playlist.filter(r=>r.page!==e.id),a.night?.page===e.id&&delete a.night.page}),this.widgetId=null)}addWidget(e){let i=this.page;if(!i)return;let[a,r]=Ke[e].size,s=_e(e,i.widgets.map(c=>c.id)),o=(c,h)=>i.widgets.some(p=>c<p.x+p.w&&c+a>p.x&&h<p.y+p.h&&h+r>p.y),l={x:0,y:0};e:for(let c=0;c+r<=8;c++)for(let h=0;h+a<=12;h++)if(!o(h,c)){l={x:h,y:c};break e}this.updatePage(c=>{let h={id:s,type:e,...l,w:a,h:r,options:gd(e,this.hass)};if(c.widgets.some(p=>p.portrait)){let p=fe.portrait,g=Math.min(p.cols,Math.max(2,Math.round(a*p.cols/12))),b=(v,$)=>c.widgets.some(I=>I.portrait&&v<I.portrait.x+I.portrait.w&&v+g>I.portrait.x&&$<I.portrait.y+I.portrait.h&&$+r>I.portrait.y),f={x:0,y:Math.max(0,p.rows-r)};e:for(let v=0;v+r<=p.rows;v++)for(let $=0;$+g<=p.cols;$++)if(!b($,v)){f={x:$,y:v};break e}h.portrait={...f,w:g,h:Math.min(r,p.rows)}}c.widgets.push(h)}),this.widgetId=s,this.menu=""}duplicateWidget(){let e=this.selectedWidgets();if(!e.length)return;let i=this.page?.widgets.map(r=>r.id)??[],a=[];this.updatePage(r=>{for(let s of e){let o=_e(s.id,[...i,...a]);a.push(o);let l={...ze(s),id:o,x:Math.min(s.x+1,12-s.w),y:Math.min(s.y+1,8-s.h)};s.portrait&&(l.portrait={...s.portrait,x:Math.min(s.portrait.x+1,8-s.portrait.w),y:Math.min(s.portrait.y+1,12-s.portrait.h)}),r.widgets.push(l)}}),this.widgetId=a[0]??null,this.multi=a.slice(1)}removeWidget(){let e=this.selection;e.length&&(this.updatePage(i=>i.widgets=i.widgets.filter(a=>!e.includes(a.id))),this.widgetId=null,this.multi=[])}onMove(e){let{moves:i,done:a}=e.detail;if(a){this.coalesceKey="";return}let r=i.filter(s=>{let o=this.page?.widgets.find(c=>c.id===s.id);if(!o)return!1;let l=this.posOf(o);return l.x!==s.x||l.y!==s.y||l.w!==s.w||l.h!==s.h});r.length&&this.updatePage(s=>r.forEach(({id:o,...l})=>this.setPos(s,o,l)),`drag-${i[0]?.id}-${this.layout}`)}form(e,i,a,r){return u`<af-form
      .hass=${this.hass}
      .advanced=${this.advanced}
      .fields=${e}
      .value=${i}
      @value-changed=${s=>{!s.detail?.value||typeof s.detail.value!="object"||Array.isArray(s.detail.value)||(a(s.detail.value),this.coalesceKey=r)}}
    ></af-form>`}renderPages(){let e=this.draft,i=e.displays.find(s=>s.id===this.displayId),a=new Set(i?.playlist.map(s=>s.page)),r=this.widget;return u`<div class="pages">
      <aside class="list">
        <div class="head">
          <span>${d("Seiten")}</span>
          <span class="rel">
            <button class="small" @click=${()=>this.menu=this.menu==="page"?"":"page"}>${d("+ Neu")}</button>
            ${this.menu==="page"?u`<div class="menu">
                  ${Pt.map(s=>u`<button @click=${()=>this.addPage(s.id)}>${d(s.name)}</button>`)}
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
                  @click=${()=>{try{let s=Mt(this.pageImport??"");this.importPage(s?.ambiframe_page??s)}catch(s){this.message={kind:"error",text:d("Import fehlgeschlagen: {error}",{error:String(s?.message??s)})}}}}
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
                ${["x","y","w","h"].map(s=>{let o=fe[this.layout],l=this.posOf(r);return u`<label
                    >${d({x:"Spalte",y:"Zeile",w:"Breite",h:"H\xF6he"}[s])}
                    <input
                      type="number"
                      min=${s==="w"||s==="h"?1:0}
                      max=${s==="x"||s==="w"?o.cols:o.rows}
                      .value=${String(l[s])}
                      @input=${c=>{let h=Number(c.target.value);Number.isFinite(h)&&this.updatePage(p=>this.setPos(p,r.id,{...l,[s]:h}),`pos-${s}-${this.layout}`)}}
                  /></label>`})}
              </div>
              ${this.form(sd,r.options,s=>this.updateWidget(o=>o.options=s,`opt-${r.id}`),`opt-${r.id}`)}
              <h4>${d("Einstellungen")}</h4>
              ${this.form(nd[r.type]??[],r.options,s=>this.updateWidget(o=>o.options=s,`opt-${r.id}`),`opt-${r.id}`)}
              ${this.advanced?u`<h4>${d("Sichtbarkeit")}</h4>
              ${this.form([{key:"show_if",label:"Nur anzeigen wenn \u2026",type:"conditions"}],{show_if:r.show_if},s=>this.updateWidget(o=>o.show_if=s.show_if??[],`if-${r.id}`),`if-${r.id}`)}
              <h4>${d("Darstellung")}</h4>
              ${this.form(ad,{look:r.look},s=>this.updateWidget(o=>{s.look&&Object.keys(s.look).length?o.look=s.look:delete o.look},`look-${r.id}`),`look-${r.id}`)}
              <h4>${d("Antippen")}</h4>
              ${this.form(rd,{tap_action:r.tap_action,hold_action:r.hold_action},s=>this.updateWidget(o=>{for(let l of["tap_action","hold_action"])s[l]?.action?o[l]=s[l]:delete o[l]},`act-${r.id}`),`act-${r.id}`)}`:u`<p class="hint">${d("Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).")}</p>`}`:this.page?u`<div class="head">
                  <span>${d("Seite")}</span>
                  <span>
                    ${this.advanced?u`<button class="small" @click=${()=>{this.exportPage()}} title=${d("Als YAML kopieren")}>${d("Exportieren")}</button>
                          <button class="small" @click=${this.savePageTemplate} title=${d("Als eigene Seitenvorlage speichern")}>${d("Vorlage")}</button>`:m}
                    <button class="small" @click=${this.duplicatePage}>${d("Duplizieren")}</button>
                    <button class="small danger" @click=${this.removePage}>${d("L\xF6schen")}</button>
                  </span>
                </div>
                ${this.form(od,this.page,s=>this.updatePage(o=>Object.assign(o,s,{widgets:o.widgets,id:o.id}),`page-${this.pageId}`),`page-${this.pageId}`)}
                <p class="hint">${d("Tipp: Ein Widget anklicken, um es zu bearbeiten.")}</p>`:u`<p class="hint">${d("Noch keine Seite \u2013 oben \u201E+ Neu\u201C.")}</p>`}
      </aside>
    </div>`}renderDevices(e){let i=this.devices[e],a=s=>this.draft?.pages.find(o=>o.id===s)?.name??s??"\u2013",r=s=>{if(!s)return d("nie");let o=Math.round((Date.now()-new Date(s).getTime())/1e3);return o<60?d("gerade eben"):o<3600?d("vor {n} min",{n:Math.round(o/60)}):d("vor {n} h",{n:Math.round(o/3600)})};return i?.clients.length?u`<div class="devices">
      ${i.clients.map(s=>u`<div class="device">
          <span class="dot ${s.hidden?"sleep":"on"}"></span>
          <span class="dname">${s.name}</span>
          <span class="dmeta"
            >${s.safe?`${d("Notfallmodus")} (${d(s.safe)})`:s.hidden?d("Bildschirm aus"):a(s.page)} · ${r(s.last_seen)}${s.version&&s.version!=="2026-10-22T10:42:09.968Z"?` \xB7 ${d("\xE4ltere Version")}`:""}</span
          >
        </div>`)}
      ${i.paused?u`<p class="hint">${d("Pausiert")}${i.until?` ${d("bis {when}",{when:new Date(i.until).toLocaleTimeString(ee(),{hour:"2-digit",minute:"2-digit"})})}`:""}.</p>`:m}
    </div>`:u`<p class="hint">${d("Gerade ist kein Ger\xE4t mit diesem Display verbunden")}${i?.last_seen?` (${d("zuletzt {time}",{time:r(i.last_seen)})})`:""}.</p>`}renderPlayback(){let e=this.draft,i=e.displays.find(l=>l.id===this.displayId);if(!i)return u`<p class="hint">${d("Kein Display.")}</p>`;let a=e.displays.indexOf(i),r=(l,c="")=>this.mutate(h=>l(h.displays[a]),c),s=(l,c)=>r(h=>{let[p]=h.playlist.splice(l,1);h.playlist.splice(l+c,0,p)}),o=`${location.origin}/ambiframe-display?display=${encodeURIComponent(i.id)}`;return u`<div class="two">
      <section>
        <div class="row-head">
          ${e.displays.length>1?u`<select @change=${l=>this.displayId=l.target.value}>
                ${e.displays.map(l=>u`<option value=${l.id} ?selected=${l.id===this.displayId}>${l.name}</option>`)}
              </select>`:u`<h3>${i.name}</h3>`}
          <button class="small" @click=${()=>this.wizard="display"}>+ ${d("Display")}</button>
          <button
            class="small"
            ?hidden=${!this.advanced}
            title=${d("Dieses Display mit allen Einstellungen kopieren")}
            @click=${()=>{let l=_e("display",e.displays.map(c=>c.id));this.mutate(c=>c.displays.push({...ze(i),id:l,name:`${i.name} (${d("Kopie")})`})),this.displayId=l}}
          >
            ${d("Kopieren")}
          </button>
        </div>
        <h4>${d("Wiedergabeliste")}</h4>
        <div class="playlist">
          ${i.playlist.map((l,c)=>u`<div class="pl">
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
                  title=${l.show_if?.length?l.show_if.map(h=>Ur(h)).join(" \xB7 "):d("Nur zu bestimmten Zeiten oder Bedingungen zeigen")}
                  @click=${()=>{let h=new Set(this.plOpen);h.has(c)?h.delete(c):h.add(c),this.plOpen=h}}
                >
                  ${l.show_if?.length?d("bedingt"):d("Wann?")}
                </button>
                <button class="small" ?disabled=${c===0} @click=${()=>s(c,-1)}>↑</button>
                <button class="small" ?disabled=${c===i.playlist.length-1} @click=${()=>s(c,1)}>↓</button>
                <button class="small" ?disabled=${i.playlist.length===1} @click=${()=>r(h=>h.playlist.splice(c,1))}>✕</button>
              </span>
            </div>
            ${this.plOpen.has(c)?u`<div class="pl-cond">
                  ${this.form([{key:"show_if",label:"Diesen Eintrag nur zeigen, wenn \u2026",type:"conditions",help:"Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst."}],{show_if:l.show_if},h=>r(p=>{h.show_if?.length?p.playlist[c].show_if=h.show_if:delete p.playlist[c].show_if},`pl-if-${i.id}-${c}`),`pl-if-${i.id}-${c}`)}
                </div>`:m}`)}
          <button class="small dashed" @click=${()=>r(l=>l.playlist.push({page:e.pages[0]?.id??""}))}>+ ${d("Seite in die Wiedergabe")}</button>
        </div>
        <h4>${d("Display")}</h4>
        ${this.form(dd(e),i,l=>r(c=>Object.assign(c,l,{id:c.id,playlist:c.playlist}),`disp-${i.id}`),`disp-${i.id}`)}
        <h4>${d("Eigenes Design")}</h4>
        <p class="hint">
          ${d("Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.")}
          <button
            class="small"
            @click=${()=>{this.designScope=i.id,this.tab="design"}}
          >
            ${d("Mit Stil-Vorschau gestalten")}
          </button>
        </p>
        ${this.form(cd,i,l=>r(c=>Object.assign(c,{design:l.design}),`disp-design-${i.id}`),`disp-design-${i.id}`)}
        <h4>${d("T\xF6ne")}</h4>
        ${this.form(hd,i,l=>r(c=>Object.assign(c,{sound:l.sound}),`disp-sound-${i.id}`),`disp-sound-${i.id}`)}
        <h4>${d("Videostream")}</h4>
        ${this.form(ud,i,l=>r(c=>Object.assign(c,{stream:l.stream}),`disp-stream-${i.id}`),`disp-stream-${i.id}`)}
        ${i.stream?.enabled?u`<p class="hint">${d(i.stream.resolution==="both"?"Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.",{name:i.name})}</p>`:m}
        <h4>${d("Fotos")}</h4>
        ${this.form(ts,i,l=>r(c=>Object.assign(c,{photos:l.photos}),`disp-photos-${i.id}`),`disp-photos-${i.id}`)}
        <h4>${d("Ger\xE4te")}</h4>
        ${this.renderDevices(i.id)}
        <h4>${d("Auf dem Ger\xE4t \xF6ffnen")}</h4>
        <div class="url">
          <code>${o}</code><button class="small" @click=${()=>navigator.clipboard?.writeText(o)}>Kopieren</button
          ><a class="small button" href=${o} target="_blank">${d("\xD6ffnen")}</a>
        </div>
      </section>
      <section>
        <h4>${d("Vorschau (schnell)")}</h4>
        <div class="preview"><af-display preview .hass=${this.hass} .config=${e} display-id=${i.id} .speed=${.15}></af-display></div>
      </section>
    </div>`}renderEvents(){let e=this.draft,i=e.events.find(r=>r.id===this.eventId),a=i?e.events.indexOf(i):-1;return u`<div class="two">
      <section>
        <div class="row-head">
          <h3>${d("Ereignisse")}</h3>
          <span class="rel">
            <button class="small" @click=${()=>this.menu=this.menu==="event"?"":"event"}>${d("+ Neu")}</button>
            ${this.menu==="event"?u`<div class="menu">
                  ${za.map(r=>u`<button
                      @click=${()=>{let s=_e(pn(d(r.name).split(" ")[0]),e.events.map(o=>o.id));this.mutate(o=>o.events.push({id:s,...r.build(this.hass,o)})),this.eventId=s,this.menu=""}}
                    >
                      ${d(r.name)}
                    </button>`)}
                </div>`:m}
          </span>
        </div>
        ${e.events.map(r=>{let s=es.find(c=>c.id===r.kind),o=[r.entity,...r.entities??[]].filter(Boolean),l=r.kind==="page"?` \u2192 ${e.pages.find(c=>c.id===r.page)?.name??d("keine Seite")}`:"";return u`<button class="entry ${r.id===this.eventId?"on":""} ${r.enabled===!1?"off":""}" @click=${()=>this.eventId=r.id}>
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
        ${i?u`<div class="row-head">
                <h3>${i.name??i.title}</h3>
                <span>
                  <button class="small" @click=${()=>this.renderRoot.querySelector(".preview.small af-display")?.testEvent(i.id)}>▶ Testen</button>
                  <button class="small danger" @click=${()=>confirm(d("Ereignis \u201E{name}\u201C l\xF6schen?",{name:i.name??i.title}))&&this.mutate(r=>r.events.splice(a,1))}>${d("L\xF6schen")}</button>
                </span>
              </div>
              ${this.form(ld(e),i,r=>this.mutate(s=>s.events[a]={...r,id:i.id},`ev-${i.id}`),`ev-${i.id}`)}`:u`<p class="hint">${d("Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.")}</p>`}
      </section>
    </div>`}async loadMediaSounds(){if(!this.hass||this.mediaSoundsLoading)return;this.mediaSoundsLoading=!0;let e=[],i=async(a,r,s)=>{if(e.length>=200)return;let o;try{o=await this.hass.callWS({type:"media_source/browse_media",media_content_id:a})}catch{return}for(let l of o.children??[]){let c=s?`${s}/${l.title}`:l.title;l.can_expand?r<2&&await i(l.media_content_id,r+1,c):(l.media_class==="music"||l.media_content_type?.startsWith("audio/"))&&e.push([l.media_content_id,c])}};await i("media-source://media_source/local",0,""),this.mediaSounds=e}renderSoundLibrary(){let i=this.draft.sounds??[];this.mediaSoundsLoading||this.loadMediaSounds();let a=(r,s,o)=>this.mutate(l=>{l.sounds[r][s]=o},`sound-${i[r].id}-${s}`);return u`<h4>${d("Eigene T\xF6ne")}</h4>
      <p class="hint">${d("Audiodatei in HA unter Medien \u2192 Lokale Medien hochladen und hier ausw\xE4hlen \u2013 oder einen Link eintragen. Danach steht der Ton bei jedem Ereignis zur Wahl.")}</p>
      ${i.map((r,s)=>u`<div class="sound-row">
          <input .value=${r.name} placeholder=${d("Name")} @input=${o=>a(s,"name",o.target.value)} />
          <input
            .value=${r.url}
            list="af-media-sounds"
            placeholder="media-source://…, /local/… ${d("oder")} https://…"
            @input=${o=>a(s,"url",o.target.value.trim())}
          />
          <button class="small" title=${d("Anh\xF6ren")} ?disabled=${!r.url} @click=${()=>{nn(r.id,70,{hass:this.hass,library:i})}}>▶</button>
          <button class="small danger" title=${d("L\xF6schen")} @click=${()=>this.mutate(o=>{o.sounds.splice(s,1)})}>✕</button>
        </div>`)}
      <datalist id="af-media-sounds">${this.mediaSounds.map(([r,s])=>u`<option value=${r}>${s}</option>`)}</datalist>
      <button
        class="small"
        @click=${()=>this.mutate(r=>{let s=r.sounds??=[];s.push({id:_e("ton",s.map(o=>o.id)),name:d("Mein Ton"),url:""})})}
      >
        ${d("+ Ton hinzuf\xFCgen")}
      </button>`}renderDesign(){let e=this.draft,i=this.designScope?e.displays.find(a=>a.id===this.designScope):void 0;return this.designScope&&!i&&(this.designScope=""),i?this.renderDisplayDesign(i):this.renderAllDesign()}renderDesignScope(){let e=this.draft;return e.displays.length<2&&!this.designScope?m:u`<div class="scope">
      <span class="hint">${d("Gilt f\xFCr")}</span>
      <span class="seg">
        <button class="small ${this.designScope?"":"on"}" @click=${()=>this.designScope=""}>${d("Alle Displays")}</button>
        ${e.displays.map(i=>u`<button class="small ${this.designScope===i.id?"on":""}" @click=${()=>this.designScope=i.id}>${i.name}</button>`)}
      </span>
    </div>`}renderThemeCards(e,i,a,r){let s=this.draft,o=Object.keys(this.hass?.states??{}).find(g=>g.startsWith("weather.")),l={id:"__stilvorschau",name:"",duration:60,background:{type:"none"},palette:"normal",show_if:[],widgets:[{id:"uhr",type:"clock",x:0,y:1,w:7,h:3,options:{valign:"end"},show_if:[]},{id:"datum",type:"date",x:0,y:4,w:7,h:1,options:{},show_if:[]},...o?[{id:"wetter",type:"weather",x:8,y:1,w:4,h:6,options:{entity:o,variant:"card"},show_if:[]}]:[]]},c=r.value??s.design.mode??"auto",h=this.hass?.states["sun.sun"]?.state==="below_horizon",p=c==="dark"||c==="auto"&&h?"dark":"light";return u`<div class="row-head">
        <h3>${d("Stil")}</h3>
        <span class="seg" title=${d("Hell/Dunkel")}>
          ${[...r.inherit?[[void 0,"wie alle"]]:[],["auto","Automatisch"],["light","Hell"],["dark","Dunkel"]].map(([g,b])=>u`<button class="small ${r.value===g?"on":""}" @click=${()=>r.set(g)}>${d(b)}</button>`)}
        </span>
      </div>
      ${this.renderModeOverrides(r)}
      <div class="themes">
        ${ht.map(g=>{let{cfg:b,id:f}=a(g.id),v={...b,pages:[...b.pages,l]};return u`<button class="theme ${e===g.id?"on":""}" @click=${()=>i(g.id)}>
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
      </div>`}renderModeOverrides(e){if(e.inherit)return m;let i=this.draft,a=i.displays.filter(o=>o.theme&&o.theme!==i.design.theme),r=i.displays.filter(o=>o.mode&&o.mode!==(i.design.mode??"auto"));if(!a.length&&!r.length)return m;let s=o=>o.map(l=>l.name).join(", ");return u`<p class="hint mode-note">
      ${a.length?u`${d("{names}: eigener Stil \u2013 dort gilt dieser.",{names:s(a)})} `:m}
      ${r.length?u`${d("{names}: eigene Einstellung f\xFCr Hell/Dunkel \u2013 dort gilt diese.",{names:s(r)})} `:m}
      <button
        class="small"
        @click=${()=>this.mutate(o=>{for(let l of o.displays)delete l.theme,delete l.mode})}
      >
        ${d("F\xFCr alle \xFCbernehmen")}
      </button>
    </p>`}renderDisplayDesign(e){let i=this.draft,a=i.displays.indexOf(e),r={design:{...ze(e.design??{}),mode:e.mode,text_size:e.text_size,contrast:e.contrast,transition:e.transition},photos:ze(e.photos??{})},s=l=>this.mutate(c=>{let h=c.displays[a],{mode:p,text_size:g,contrast:b,transition:f,theme:v,...$}=l.design??{},I=(T,F)=>{let S=vd(F);S===void 0?delete h[T]:h[T]=S};I("mode",p),I("text_size",g),I("contrast",b),I("transition",f),I("design",$),l.photos&&I("photos",l.photos)},`design-${e.id}`),o=Dm;return u`${this.renderDesignScope()}
      <p class="hint">${d("F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.",{name:e.name})}</p>
      ${this.renderThemeCards(e.theme??i.design.theme,l=>this.mutate(c=>c.displays[a].theme=l),l=>({cfg:{...i,displays:i.displays.map(c=>c.id===e.id?{...c,theme:l}:c)},id:e.id}),{value:e.mode,inherit:!0,set:l=>this.mutate(c=>{l===void 0?delete c.displays[a].mode:c.displays[a].mode=l})})}
      ${e.theme?u`<p class="hint"><button class="small" @click=${()=>this.mutate(l=>delete l.displays[a].theme)}>${d("Stil wie alle Displays")}</button></p>`:m}
      <div class="cols">
        <section class="narrow">
          <h3>${d("Hell/Dunkel & Schrift")}</h3>
          ${this.form(o(ns),r,s,`ddesign-look-${e.id}`)}
        </section>
        ${this.advanced?u`<section class="narrow">
                <h3>${d("Eigene Farben \xB7 Dunkel")}</h3>
                ${this.form(Jn("dark"),r,s,`ddesign-dark-${e.id}`)}
              </section>
              <section class="narrow">
                <h3>${d("Eigene Farben \xB7 Hell")}</h3>
                ${this.form(Jn("light"),r,s,`ddesign-light-${e.id}`)}
              </section>
              <section class="narrow">
                <h3>${d("Form & CSS")}</h3>
                ${this.form(o(Xr),r,s,`ddesign-shape-${e.id}`)}
              </section>`:m}
        <section class="narrow">
          <h3>${d("Bewegung")}</h3>
          ${this.form(o(is),r,s,`ddesign-motion-${e.id}`)}
        </section>
        <section class="narrow">
          <h3>${d("Fotos")}</h3>
          ${this.form(ts,r,s,`ddesign-photos-${e.id}`)}
        </section>
      </div>
      <p class="hint">
        <button
          class="small"
          @click=${()=>this.mutate(l=>{let c=l.displays[a];for(let h of["theme","mode","text_size","contrast","transition","design","photos"])delete c[h]})}
        >
          ${d("Alle Abweichungen dieses Displays zur\xFCcksetzen")}
        </button>
      </p>`}renderAllDesign(){let e=this.draft,i=a=>this.mutate(r=>Object.assign(r,{design:a.design??r.design,photos:a.photos??r.photos}),"design");return u`${this.renderDesignScope()}
      ${this.renderThemeCards(e.design.theme,a=>this.mutate(r=>r.design.theme=a),a=>{let{theme:r,mode:s,design:o,text_size:l,contrast:c,transition:h,...p}=e.displays[0]??{},g={...p,id:"__stilvorschau",name:"",playlist:[],night:{},events:"all"};return{cfg:{...e,design:{...e.design,theme:a},displays:[...e.displays,g]},id:g.id}},{value:e.design.mode??"auto",set:a=>this.mutate(r=>r.design.mode=a??"auto")})}
      <div class="cols">
        <section class="narrow">
          <h3>${d("Hell/Dunkel & Schrift")}</h3>
          ${this.form(ns,e,i,"design-look")}
        </section>
        ${this.advanced?u`<section class="narrow">
          <h3>${d("Eigene Farben \xB7 Dunkel")}</h3>
          ${this.form(Jn("dark"),e,i,"design-colors-dark")}
        </section>
        <section class="narrow">
          <h3>${d("Eigene Farben \xB7 Hell")}</h3>
          ${this.form(Jn("light"),e,i,"design-colors-light")}
          ${e.design.colors?u`<p class="hint"><button class="small" @click=${()=>this.mutate(a=>delete a.design.colors)}>${d("Eigene Farben zur\xFCcksetzen")}</button></p>`:m}
        </section>
        <section class="narrow">
          <h3>${d("Form & CSS")}</h3>
          ${this.form(Xr,e,i,"design-shape")}
        </section>
        <section class="narrow">
          <h3>${d("Eigene Stile")}</h3>
          ${this.renderPresets()}
        </section>`:m}
        <section class="narrow">
          <h3>${d("Bewegung")}</h3>
          ${this.form(is,e,i,"design-motion")}
        </section>
        <section class="narrow">
          <h3>${d("Fotos")}</h3>
          ${this.form(md,e,a=>this.mutate(r=>Object.assign(r,{photos:a.photos??r.photos}),"design"),"design-photos")}
        </section>
        <section class="narrow">
          <h3>${d("KI-Zusammenfassung")}</h3>
          ${this.form(pd,e,a=>this.mutate(r=>Object.assign(r,{summary:a.summary}),"design"),"design-summary")}
          ${e.summary?.enabled?u`<p class="hint">
                <button class="small" ?disabled=${this.summaryBusy} @click=${()=>{this.generateSummary()}}>
                  ${this.summaryBusy?d("Gemini schreibt \u2026"):d("Jetzt erstellen")}
                </button>
                ${this.summaryNote}
              </p>`:m}
        </section>
      </div>`}renderPresets(){let e=this.draft,i=e.design.presets??[],a=()=>{let{presets:s,...o}=ze(e.design);return o},r=s=>this.mutate(o=>{let{presets:l,...c}=s;o.design={...ze(c),presets:o.design.presets}});return u`${i.length?u`<div class="presets">
            ${i.map((s,o)=>u`<div class="preset">
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
          @click=${async()=>{let s=bt({ambiframe_style:a()},{lineWidth:120});try{await navigator.clipboard.writeText(s),this.message={kind:"ok",text:d("Stil als YAML in die Zwischenablage kopiert.")}}catch{this.importText=s,this.message={kind:"ok",text:d("Stil unten als YAML \u2013 zum Kopieren markieren.")}}}}
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
                @click=${()=>{try{let s=Mt(this.importText??""),o=s?.ambiframe_style??s?.design??s;if(!o||typeof o!="object"||Array.isArray(o))throw new Error(d("kein Stil gefunden"));r(o),this.importText=null,this.message={kind:"ok",text:d("Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.")}}catch(s){this.message={kind:"error",text:d("Import fehlgeschlagen: {error}",{error:String(s?.message??s)})}}}}
              >
                ${d("\xDCbernehmen")}
              </button>
            </p>`:m}`}renderYaml(){return!this.yaml&&this.draft&&(this.yaml=La(this.draft)),u`<div class="yaml">
      <textarea spellcheck="false" .value=${this.yaml} @input=${e=>this.yaml=e.target.value}></textarea>
      <div class="actions">
        <button
          class="primary"
          @click=${()=>{try{let e=Mt(this.yaml);this.mutate(i=>Object.assign(i,e)),this.message={kind:"ok",text:d("\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.")}}catch(e){this.message={kind:"error",text:d("YAML ist nicht lesbar: {error}",{error:e.message})}}}}
        >
          ${d("In den Editor \xFCbernehmen")}
        </button>
        <button @click=${()=>this.yaml=La(this.draft)}>${d("Neu laden")}</button>
        <span class="spacer"></span>
        <button
          @click=${async()=>{let e=await this.hass?.callWS({type:"ambiframe/config/default"});e&&(this.yaml=La(e))}}
        >
          ${d("Startkonfiguration anzeigen")}
        </button>
        <button
          title=${d("Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)")}
          @click=${async()=>{let e=await this.hass?.callWS({type:"ambiframe/config/previous"}).catch(()=>null);if(!e){this.message={kind:"error",text:d("Es gibt noch keine vorherige Fassung.")};return}this.yaml=La(e),this.message={kind:"ok",text:d("Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.")}}}
        >
          ${d("Vorherige Fassung laden")}
        </button>
      </div>
    </div>`}async checkPhotos(){let e=this.hass,i=this.draft?.photos;if(!e||!i)return;let a=null,r=null;if(i.folder)try{a=((await e.callWS({type:"media_source/browse_media",media_content_id:i.folder})).children??[]).filter(o=>o.media_class==="image"||/\.(jpe?g|png|webp|avif)$/i.test(o.title)).length}catch{a=0}if(i.icloud)try{r=(await e.callWS({type:"ambiframe/photos/icloud",url:i.icloud})).length}catch{r=0}this.photoHealth={folder:a,icloud:r}}goTo(e){e&&(this.healthOpen=!1,this.tab=e.tab,e.pageId&&(this.pageId=e.pageId),this.widgetId=e.widgetId??(e.pageId?null:this.widgetId),e.eventId&&(this.eventId=e.eventId),e.displayId&&(this.displayId=e.displayId))}renderHealthButton(){if(!this.draft)return m;let e=ss(this.draft,this.hass,this.devices,this.photoHealth,"2026-10-22T10:42:09.968Z"),i=e.filter(r=>r.level!=="info").length,a=e.some(r=>r.level==="error");return u`<button
      class="health ${a?"bad":i?"warn":"ok"}"
      title=${d("Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos")}
      @click=${()=>{this.healthOpen=!this.healthOpen,this.healthOpen&&this.checkPhotos()}}
    >
      ${G(i?"warning":"check")}<span>${i?i===1?d("1 Hinweis"):d("{n} Hinweise",{n:i}):d("Alles gut")}</span>
    </button>`}renderHealth(){if(!this.healthOpen||!this.draft)return m;let e=ss(this.draft,this.hass,this.devices,this.photoHealth,"2026-10-22T10:42:09.968Z"),i={error:"warning",warn:"info",info:"info"};return u`<div class="healthpanel">
      <div class="hhead">
        <h3>${d("Gesundheitscheck")}</h3>
        <button class="icon" title=${d("Schlie\xDFen")} @click=${()=>this.healthOpen=!1}>✕</button>
      </div>
      ${e.length?u`<ul>
            ${e.map(a=>u`<li class=${a.level}>
                ${G(i[a.level])}<span class="htext">${a.text}</span>
                ${a.go?u`<button class="small" @click=${()=>this.goTo(a.go)}>${d("Zeigen")}</button>`:m}
              </li>`)}
          </ul>`:u`<p class="hint">${G("check")} ${d("Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.")}</p>`}
      ${this.photoHealth===void 0?u`<p class="hint">${d("Fotos werden gez\xE4hlt \u2026")}</p>`:m}
    </div>`}renderWizard(){let e=this.draft,i=this.wizard||(e?.setup_complete===!1&&!this.wizardSkipped?"first":"");return!e||!i?m:u`<af-wizard
      .hass=${this.hass}
      .config=${e}
      mode=${i}
      @wizard-done=${a=>{this.mutate(r=>Object.assign(r,a.detail.config)),this.displayId=a.detail.displayId,this.tab="wiedergabe",this.wizard="",this.save()}}
      @wizard-close=${()=>{this.wizard="",i==="first"&&(this.wizardSkipped=!0,this.mutate(a=>a.setup_complete=!0),this.save())}}
    ></af-wizard>`}render(){Ot(Ht(this.draft?.design.language,this.hass?.language)),this.draft&&(Ct.displays=this.draft.displays.map(a=>[a.id,a.name]),Ct.pages=this.draft.pages.map(a=>[a.id,a.name]));let i=[["seiten","Seiten"],["wiedergabe","Wiedergabe"],["ereignisse","Ereignisse"],["design","Design"],["yaml","YAML"]].filter(([a])=>this.advanced||a!=="yaml");return u`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Ambiframe</div>
        <nav>
          ${i.map(([a,r])=>u`<button
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
    `}};ti.properties={hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},saved:{state:!0},draft:{state:!0},tab:{state:!0},pageId:{state:!0},widgetId:{state:!0},eventId:{state:!0},displayId:{state:!0},message:{state:!0},saving:{state:!0},yaml:{state:!0},menu:{state:!0},summaryBusy:{state:!0},mediaSounds:{state:!0},summaryNote:{state:!0},devices:{state:!0},layout:{state:!0},plOpen:{state:!0},multi:{state:!0},clip:{state:!0},pageImport:{state:!0},advanced:{state:!0},importText:{state:!0},presetName:{state:!0},wizard:{state:!0},healthOpen:{state:!0},designScope:{state:!0},photoHealth:{state:!0}},ti.styles=C`
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
  `;B("ambiframe-panel",ti);ps();
