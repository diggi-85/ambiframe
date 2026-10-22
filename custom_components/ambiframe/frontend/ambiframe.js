var Vl=Object.create;var ga=Object.defineProperty;var Gl=Object.getOwnPropertyDescriptor;var jl=Object.getOwnPropertyNames;var ql=Object.getPrototypeOf,Yl=Object.prototype.hasOwnProperty;var Zl=(t,i,e)=>i in t?ga(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e;var Ql=(t,i)=>()=>{try{return i||t((i={exports:{}}).exports,i),i.exports}catch(e){throw i=0,e}};var Jl=(t,i,e,n)=>{if(i&&typeof i=="object"||typeof i=="function")for(let a of jl(i))!Yl.call(t,a)&&a!==e&&ga(t,a,{get:()=>i[a],enumerable:!(n=Gl(i,a))||n.enumerable});return t};var Gs=(t,i,e)=>(e=t!=null?Vl(ql(t)):{},Jl(i||!t||!t.__esModule?ga(e,"default",{value:t,enumerable:!0}):e,t));var Fe=(t,i,e)=>Zl(t,typeof i!="symbol"?i+"":i,e);var ja=Ql((Jr,Xr)=>{var Qr=(function(){var t=function(A,P){var $=236,L=17,x=A,D=e[P],w=null,y=0,z=null,C=[],T={},q=function(E,_){y=x*4+17,w=(function(k){for(var M=new Array(k),N=0;N<k;N+=1){M[N]=new Array(k);for(var B=0;B<k;B+=1)M[N][B]=null}return M})(y),Z(0,0),Z(y-7,0),Z(0,y-7),ge(),pe(),Ze(E,_),x>=7&&Ie(E),z==null&&(z=Kl(x,D,C)),Qe(z,_)},Z=function(E,_){for(var k=-1;k<=7;k+=1)if(!(E+k<=-1||y<=E+k))for(var M=-1;M<=7;M+=1)_+M<=-1||y<=_+M||(0<=k&&k<=6&&(M==0||M==6)||0<=M&&M<=6&&(k==0||k==6)||2<=k&&k<=4&&2<=M&&M<=4?w[E+k][_+M]=!0:w[E+k][_+M]=!1)},ae=function(){for(var E=0,_=0,k=0;k<8;k+=1){q(!0,k);var M=a.getLostPoint(T);(k==0||E>M)&&(E=M,_=k)}return _},pe=function(){for(var E=8;E<y-8;E+=1)w[E][6]==null&&(w[E][6]=E%2==0);for(var _=8;_<y-8;_+=1)w[6][_]==null&&(w[6][_]=_%2==0)},ge=function(){for(var E=a.getPatternPosition(x),_=0;_<E.length;_+=1)for(var k=0;k<E.length;k+=1){var M=E[_],N=E[k];if(w[M][N]==null)for(var B=-2;B<=2;B+=1)for(var j=-2;j<=2;j+=1)B==-2||B==2||j==-2||j==2||B==0&&j==0?w[M+B][N+j]=!0:w[M+B][N+j]=!1}},Ie=function(E){for(var _=a.getBCHTypeNumber(x),k=0;k<18;k+=1){var M=!E&&(_>>k&1)==1;w[Math.floor(k/3)][k%3+y-8-3]=M}for(var k=0;k<18;k+=1){var M=!E&&(_>>k&1)==1;w[k%3+y-8-3][Math.floor(k/3)]=M}},Ze=function(E,_){for(var k=D<<3|_,M=a.getBCHTypeInfo(k),N=0;N<15;N+=1){var B=!E&&(M>>N&1)==1;N<6?w[N][8]=B:N<8?w[N+1][8]=B:w[y-15+N][8]=B}for(var N=0;N<15;N+=1){var B=!E&&(M>>N&1)==1;N<8?w[8][y-N-1]=B:N<9?w[8][15-N-1+1]=B:w[8][15-N-1]=B}w[y-8][8]=!E},Qe=function(E,_){for(var k=-1,M=y-1,N=7,B=0,j=a.getMaskFunction(_),V=y-1;V>0;V-=2)for(V==6&&(V-=1);;){for(var de=0;de<2;de+=1)if(w[M][V-de]==null){var me=!1;B<E.length&&(me=(E[B]>>>N&1)==1);var Y=j(M,V-de);Y&&(me=!me),w[M][V-de]=me,N-=1,N==-1&&(B+=1,N=7)}if(M+=k,M<0||y<=M){M-=k,k=-k;break}}},zt=function(E,_){for(var k=0,M=0,N=0,B=new Array(_.length),j=new Array(_.length),V=0;V<_.length;V+=1){var de=_[V].dataCount,me=_[V].totalCount-de;M=Math.max(M,de),N=Math.max(N,me),B[V]=new Array(de);for(var Y=0;Y<B[V].length;Y+=1)B[V][Y]=255&E.getBuffer()[Y+k];k+=de;var Pe=a.getErrorCorrectPolynomial(me),Oe=r(B[V],Pe.getLength()-1),Ks=Oe.mod(Pe);j[V]=new Array(Pe.getLength()-1);for(var Y=0;Y<j[V].length;Y+=1){var Us=Y+Ks.getLength()-j[V].length;j[V][Y]=Us>=0?Ks.getAt(Us):0}}for(var Vs=0,Y=0;Y<_.length;Y+=1)Vs+=_[Y].totalCount;for(var fa=new Array(Vs),qi=0,Y=0;Y<M;Y+=1)for(var V=0;V<_.length;V+=1)Y<B[V].length&&(fa[qi]=B[V][Y],qi+=1);for(var Y=0;Y<N;Y+=1)for(var V=0;V<_.length;V+=1)Y<j[V].length&&(fa[qi]=j[V][Y],qi+=1);return fa},Kl=function(E,_,k){for(var M=o.getRSBlocks(E,_),N=l(),B=0;B<k.length;B+=1){var j=k[B];N.put(j.getMode(),4),N.put(j.getLength(),a.getLengthInBits(j.getMode(),E)),j.write(N)}for(var V=0,B=0;B<M.length;B+=1)V+=M[B].dataCount;if(N.getLengthInBits()>V*8)throw"code length overflow. ("+N.getLengthInBits()+">"+V*8+")";for(N.getLengthInBits()+4<=V*8&&N.put(0,4);N.getLengthInBits()%8!=0;)N.putBit(!1);for(;!(N.getLengthInBits()>=V*8||(N.put($,8),N.getLengthInBits()>=V*8));)N.put(L,8);return zt(N,M)};T.addData=function(E,_){_=_||"Byte";var k=null;switch(_){case"Numeric":k=c(E);break;case"Alphanumeric":k=h(E);break;case"Byte":k=u(E);break;case"Kanji":k=f(E);break;default:throw"mode:"+_}C.push(k),z=null},T.isDark=function(E,_){if(E<0||y<=E||_<0||y<=_)throw E+","+_;return w[E][_]},T.getModuleCount=function(){return y},T.make=function(){if(x<1){for(var E=1;E<40;E++){for(var _=o.getRSBlocks(E,D),k=l(),M=0;M<C.length;M++){var N=C[M];k.put(N.getMode(),4),k.put(N.getLength(),a.getLengthInBits(N.getMode(),E)),N.write(k)}for(var B=0,M=0;M<_.length;M++)B+=_[M].dataCount;if(k.getLengthInBits()<=B*8)break}x=E}q(!1,ae())},T.createTableTag=function(E,_){E=E||2,_=typeof _>"u"?E*4:_;var k="";k+='<table style="',k+=" border-width: 0px; border-style: none;",k+=" border-collapse: collapse;",k+=" padding: 0px; margin: "+_+"px;",k+='">',k+="<tbody>";for(var M=0;M<T.getModuleCount();M+=1){k+="<tr>";for(var N=0;N<T.getModuleCount();N+=1)k+='<td style="',k+=" border-width: 0px; border-style: none;",k+=" border-collapse: collapse;",k+=" padding: 0px; margin: 0px;",k+=" width: "+E+"px;",k+=" height: "+E+"px;",k+=" background-color: ",k+=T.isDark(M,N)?"#000000":"#ffffff",k+=";",k+='"/>';k+="</tr>"}return k+="</tbody>",k+="</table>",k},T.createSvgTag=function(E,_,k,M){var N={};typeof arguments[0]=="object"&&(N=arguments[0],E=N.cellSize,_=N.margin,k=N.alt,M=N.title),E=E||2,_=typeof _>"u"?E*4:_,k=typeof k=="string"?{text:k}:k||{},k.text=k.text||null,k.id=k.text?k.id||"qrcode-description":null,M=typeof M=="string"?{text:M}:M||{},M.text=M.text||null,M.id=M.text?M.id||"qrcode-title":null;var B=T.getModuleCount()*E+_*2,j,V,de,me,Y="",Pe;for(Pe="l"+E+",0 0,"+E+" -"+E+",0 0,-"+E+"z ",Y+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',Y+=N.scalable?"":' width="'+B+'px" height="'+B+'px"',Y+=' viewBox="0 0 '+B+" "+B+'" ',Y+=' preserveAspectRatio="xMinYMin meet"',Y+=M.text||k.text?' role="img" aria-labelledby="'+It([M.id,k.id].join(" ").trim())+'"':"",Y+=">",Y+=M.text?'<title id="'+It(M.id)+'">'+It(M.text)+"</title>":"",Y+=k.text?'<description id="'+It(k.id)+'">'+It(k.text)+"</description>":"",Y+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',Y+='<path d="',de=0;de<T.getModuleCount();de+=1)for(me=de*E+_,j=0;j<T.getModuleCount();j+=1)T.isDark(de,j)&&(V=j*E+_,Y+="M"+V+","+me+Pe);return Y+='" stroke="transparent" fill="black"/>',Y+="</svg>",Y},T.createDataURL=function(E,_){E=E||2,_=typeof _>"u"?E*4:_;var k=T.getModuleCount()*E+_*2,M=_,N=k-_;return I(k,k,function(B,j){if(M<=B&&B<N&&M<=j&&j<N){var V=Math.floor((B-M)/E),de=Math.floor((j-M)/E);return T.isDark(de,V)?0:1}else return 1})},T.createImgTag=function(E,_,k){E=E||2,_=typeof _>"u"?E*4:_;var M=T.getModuleCount()*E+_*2,N="";return N+="<img",N+=' src="',N+=T.createDataURL(E,_),N+='"',N+=' width="',N+=M,N+='"',N+=' height="',N+=M,N+='"',k&&(N+=' alt="',N+=It(k),N+='"'),N+="/>",N};var It=function(E){for(var _="",k=0;k<E.length;k+=1){var M=E.charAt(k);switch(M){case"<":_+="&lt;";break;case">":_+="&gt;";break;case"&":_+="&amp;";break;case'"':_+="&quot;";break;default:_+=M;break}}return _},Ul=function(E){var _=1;E=typeof E>"u"?_*2:E;var k=T.getModuleCount()*_+E*2,M=E,N=k-E,B,j,V,de,me,Y={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},Pe={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},Oe="";for(B=0;B<k;B+=2){for(V=Math.floor((B-M)/_),de=Math.floor((B+1-M)/_),j=0;j<k;j+=1)me="\u2588",M<=j&&j<N&&M<=B&&B<N&&T.isDark(V,Math.floor((j-M)/_))&&(me=" "),M<=j&&j<N&&M<=B+1&&B+1<N&&T.isDark(de,Math.floor((j-M)/_))?me+=" ":me+="\u2588",Oe+=E<1&&B+1>=N?Pe[me]:Y[me];Oe+=`
`}return k%2&&E>0?Oe.substring(0,Oe.length-k-1)+Array(k+1).join("\u2580"):Oe.substring(0,Oe.length-1)};return T.createASCII=function(E,_){if(E=E||1,E<2)return Ul(_);E-=1,_=typeof _>"u"?E*2:_;var k=T.getModuleCount()*E+_*2,M=_,N=k-_,B,j,V,de,me=Array(E+1).join("\u2588\u2588"),Y=Array(E+1).join("  "),Pe="",Oe="";for(B=0;B<k;B+=1){for(V=Math.floor((B-M)/E),Oe="",j=0;j<k;j+=1)de=1,M<=j&&j<N&&M<=B&&B<N&&T.isDark(V,Math.floor((j-M)/E))&&(de=0),Oe+=de?me:Y;for(V=0;V<E;V+=1)Pe+=Oe+`
`}return Pe.substring(0,Pe.length-1)},T.renderTo2dContext=function(E,_){_=_||2;for(var k=T.getModuleCount(),M=0;M<k;M++)for(var N=0;N<k;N++)E.fillStyle=T.isDark(M,N)?"black":"white",E.fillRect(M*_,N*_,_,_)},T};t.stringToBytesFuncs={default:function(A){for(var P=[],$=0;$<A.length;$+=1){var L=A.charCodeAt($);P.push(L&255)}return P}},t.stringToBytes=t.stringToBytesFuncs.default,t.createStringToBytes=function(A,P){var $=(function(){for(var x=v(A),D=function(){var pe=x.read();if(pe==-1)throw"eof";return pe},w=0,y={};;){var z=x.read();if(z==-1)break;var C=D(),T=D(),q=D(),Z=String.fromCharCode(z<<8|C),ae=T<<8|q;y[Z]=ae,w+=1}if(w!=P)throw w+" != "+P;return y})(),L=63;return function(x){for(var D=[],w=0;w<x.length;w+=1){var y=x.charCodeAt(w);if(y<128)D.push(y);else{var z=$[x.charAt(w)];typeof z=="number"?(z&255)==z?D.push(z):(D.push(z>>>8),D.push(z&255)):D.push(L)}}return D}};var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a=(function(){var A=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],P=1335,$=7973,L=21522,x={},D=function(w){for(var y=0;w!=0;)y+=1,w>>>=1;return y};return x.getBCHTypeInfo=function(w){for(var y=w<<10;D(y)-D(P)>=0;)y^=P<<D(y)-D(P);return(w<<10|y)^L},x.getBCHTypeNumber=function(w){for(var y=w<<12;D(y)-D($)>=0;)y^=$<<D(y)-D($);return w<<12|y},x.getPatternPosition=function(w){return A[w-1]},x.getMaskFunction=function(w){switch(w){case n.PATTERN000:return function(y,z){return(y+z)%2==0};case n.PATTERN001:return function(y,z){return y%2==0};case n.PATTERN010:return function(y,z){return z%3==0};case n.PATTERN011:return function(y,z){return(y+z)%3==0};case n.PATTERN100:return function(y,z){return(Math.floor(y/2)+Math.floor(z/3))%2==0};case n.PATTERN101:return function(y,z){return y*z%2+y*z%3==0};case n.PATTERN110:return function(y,z){return(y*z%2+y*z%3)%2==0};case n.PATTERN111:return function(y,z){return(y*z%3+(y+z)%2)%2==0};default:throw"bad maskPattern:"+w}},x.getErrorCorrectPolynomial=function(w){for(var y=r([1],0),z=0;z<w;z+=1)y=y.multiply(r([1,s.gexp(z)],0));return y},x.getLengthInBits=function(w,y){if(1<=y&&y<10)switch(w){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:return 8;case i.MODE_KANJI:return 8;default:throw"mode:"+w}else if(y<27)switch(w){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw"mode:"+w}else if(y<41)switch(w){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw"mode:"+w}else throw"type:"+y},x.getLostPoint=function(w){for(var y=w.getModuleCount(),z=0,C=0;C<y;C+=1)for(var T=0;T<y;T+=1){for(var q=0,Z=w.isDark(C,T),ae=-1;ae<=1;ae+=1)if(!(C+ae<0||y<=C+ae))for(var pe=-1;pe<=1;pe+=1)T+pe<0||y<=T+pe||ae==0&&pe==0||Z==w.isDark(C+ae,T+pe)&&(q+=1);q>5&&(z+=3+q-5)}for(var C=0;C<y-1;C+=1)for(var T=0;T<y-1;T+=1){var ge=0;w.isDark(C,T)&&(ge+=1),w.isDark(C+1,T)&&(ge+=1),w.isDark(C,T+1)&&(ge+=1),w.isDark(C+1,T+1)&&(ge+=1),(ge==0||ge==4)&&(z+=3)}for(var C=0;C<y;C+=1)for(var T=0;T<y-6;T+=1)w.isDark(C,T)&&!w.isDark(C,T+1)&&w.isDark(C,T+2)&&w.isDark(C,T+3)&&w.isDark(C,T+4)&&!w.isDark(C,T+5)&&w.isDark(C,T+6)&&(z+=40);for(var T=0;T<y;T+=1)for(var C=0;C<y-6;C+=1)w.isDark(C,T)&&!w.isDark(C+1,T)&&w.isDark(C+2,T)&&w.isDark(C+3,T)&&w.isDark(C+4,T)&&!w.isDark(C+5,T)&&w.isDark(C+6,T)&&(z+=40);for(var Ie=0,T=0;T<y;T+=1)for(var C=0;C<y;C+=1)w.isDark(C,T)&&(Ie+=1);var Ze=Math.abs(100*Ie/y/y-50)/5;return z+=Ze*10,z},x})(),s=(function(){for(var A=new Array(256),P=new Array(256),$=0;$<8;$+=1)A[$]=1<<$;for(var $=8;$<256;$+=1)A[$]=A[$-4]^A[$-5]^A[$-6]^A[$-8];for(var $=0;$<255;$+=1)P[A[$]]=$;var L={};return L.glog=function(x){if(x<1)throw"glog("+x+")";return P[x]},L.gexp=function(x){for(;x<0;)x+=255;for(;x>=256;)x-=255;return A[x]},L})();function r(A,P){if(typeof A.length>"u")throw A.length+"/"+P;var $=(function(){for(var x=0;x<A.length&&A[x]==0;)x+=1;for(var D=new Array(A.length-x+P),w=0;w<A.length-x;w+=1)D[w]=A[w+x];return D})(),L={};return L.getAt=function(x){return $[x]},L.getLength=function(){return $.length},L.multiply=function(x){for(var D=new Array(L.getLength()+x.getLength()-1),w=0;w<L.getLength();w+=1)for(var y=0;y<x.getLength();y+=1)D[w+y]^=s.gexp(s.glog(L.getAt(w))+s.glog(x.getAt(y)));return r(D,0)},L.mod=function(x){if(L.getLength()-x.getLength()<0)return L;for(var D=s.glog(L.getAt(0))-s.glog(x.getAt(0)),w=new Array(L.getLength()),y=0;y<L.getLength();y+=1)w[y]=L.getAt(y);for(var y=0;y<x.getLength();y+=1)w[y]^=s.gexp(s.glog(x.getAt(y))+D);return r(w,0).mod(x)},L}var o=(function(){var A=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],P=function(x,D){var w={};return w.totalCount=x,w.dataCount=D,w},$={},L=function(x,D){switch(D){case e.L:return A[(x-1)*4+0];case e.M:return A[(x-1)*4+1];case e.Q:return A[(x-1)*4+2];case e.H:return A[(x-1)*4+3];default:return}};return $.getRSBlocks=function(x,D){var w=L(x,D);if(typeof w>"u")throw"bad rs block @ typeNumber:"+x+"/errorCorrectionLevel:"+D;for(var y=w.length/3,z=[],C=0;C<y;C+=1)for(var T=w[C*3+0],q=w[C*3+1],Z=w[C*3+2],ae=0;ae<T;ae+=1)z.push(P(q,Z));return z},$})(),l=function(){var A=[],P=0,$={};return $.getBuffer=function(){return A},$.getAt=function(L){var x=Math.floor(L/8);return(A[x]>>>7-L%8&1)==1},$.put=function(L,x){for(var D=0;D<x;D+=1)$.putBit((L>>>x-D-1&1)==1)},$.getLengthInBits=function(){return P},$.putBit=function(L){var x=Math.floor(P/8);A.length<=x&&A.push(0),L&&(A[x]|=128>>>P%8),P+=1},$},c=function(A){var P=i.MODE_NUMBER,$=A,L={};L.getMode=function(){return P},L.getLength=function(w){return $.length},L.write=function(w){for(var y=$,z=0;z+2<y.length;)w.put(x(y.substring(z,z+3)),10),z+=3;z<y.length&&(y.length-z==1?w.put(x(y.substring(z,z+1)),4):y.length-z==2&&w.put(x(y.substring(z,z+2)),7))};var x=function(w){for(var y=0,z=0;z<w.length;z+=1)y=y*10+D(w.charAt(z));return y},D=function(w){if("0"<=w&&w<="9")return w.charCodeAt(0)-48;throw"illegal char :"+w};return L},h=function(A){var P=i.MODE_ALPHA_NUM,$=A,L={};L.getMode=function(){return P},L.getLength=function(D){return $.length},L.write=function(D){for(var w=$,y=0;y+1<w.length;)D.put(x(w.charAt(y))*45+x(w.charAt(y+1)),11),y+=2;y<w.length&&D.put(x(w.charAt(y)),6)};var x=function(D){if("0"<=D&&D<="9")return D.charCodeAt(0)-48;if("A"<=D&&D<="Z")return D.charCodeAt(0)-65+10;switch(D){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+D}};return L},u=function(A){var P=i.MODE_8BIT_BYTE,$=A,L=t.stringToBytes(A),x={};return x.getMode=function(){return P},x.getLength=function(D){return L.length},x.write=function(D){for(var w=0;w<L.length;w+=1)D.put(L[w],8)},x},f=function(A){var P=i.MODE_KANJI,$=A,L=t.stringToBytesFuncs.SJIS;if(!L)throw"sjis not supported.";(function(w,y){var z=L(w);if(z.length!=2||(z[0]<<8|z[1])!=y)throw"sjis not supported."})("\u53CB",38726);var x=L(A),D={};return D.getMode=function(){return P},D.getLength=function(w){return~~(x.length/2)},D.write=function(w){for(var y=x,z=0;z+1<y.length;){var C=(255&y[z])<<8|255&y[z+1];if(33088<=C&&C<=40956)C-=33088;else if(57408<=C&&C<=60351)C-=49472;else throw"illegal char at "+(z+1)+"/"+C;C=(C>>>8&255)*192+(C&255),w.put(C,13),z+=2}if(z<y.length)throw"illegal char at "+(z+1)},D},b=function(){var A=[],P={};return P.writeByte=function($){A.push($&255)},P.writeShort=function($){P.writeByte($),P.writeByte($>>>8)},P.writeBytes=function($,L,x){L=L||0,x=x||$.length;for(var D=0;D<x;D+=1)P.writeByte($[D+L])},P.writeString=function($){for(var L=0;L<$.length;L+=1)P.writeByte($.charCodeAt(L))},P.toByteArray=function(){return A},P.toString=function(){var $="";$+="[";for(var L=0;L<A.length;L+=1)L>0&&($+=","),$+=A[L];return $+="]",$},P},g=function(){var A=0,P=0,$=0,L="",x={},D=function(y){L+=String.fromCharCode(w(y&63))},w=function(y){if(!(y<0)){if(y<26)return 65+y;if(y<52)return 97+(y-26);if(y<62)return 48+(y-52);if(y==62)return 43;if(y==63)return 47}throw"n:"+y};return x.writeByte=function(y){for(A=A<<8|y&255,P+=8,$+=1;P>=6;)D(A>>>P-6),P-=6},x.flush=function(){if(P>0&&(D(A<<6-P),A=0,P=0),$%3!=0)for(var y=3-$%3,z=0;z<y;z+=1)L+="="},x.toString=function(){return L},x},v=function(A){var P=A,$=0,L=0,x=0,D={};D.read=function(){for(;x<8;){if($>=P.length){if(x==0)return-1;throw"unexpected end of file./"+x}var y=P.charAt($);if($+=1,y=="=")return x=0,-1;if(y.match(/^\s$/))continue;L=L<<6|w(y.charCodeAt(0)),x+=6}var z=L>>>x-8&255;return x-=8,z};var w=function(y){if(65<=y&&y<=90)return y-65;if(97<=y&&y<=122)return y-97+26;if(48<=y&&y<=57)return y-48+52;if(y==43)return 62;if(y==47)return 63;throw"c:"+y};return D},S=function(A,P){var $=A,L=P,x=new Array(A*P),D={};D.setPixel=function(C,T,q){x[T*$+C]=q},D.write=function(C){C.writeString("GIF87a"),C.writeShort($),C.writeShort(L),C.writeByte(128),C.writeByte(0),C.writeByte(0),C.writeByte(0),C.writeByte(0),C.writeByte(0),C.writeByte(255),C.writeByte(255),C.writeByte(255),C.writeString(","),C.writeShort(0),C.writeShort(0),C.writeShort($),C.writeShort(L),C.writeByte(0);var T=2,q=y(T);C.writeByte(T);for(var Z=0;q.length-Z>255;)C.writeByte(255),C.writeBytes(q,Z,255),Z+=255;C.writeByte(q.length-Z),C.writeBytes(q,Z,q.length-Z),C.writeByte(0),C.writeString(";")};var w=function(C){var T=C,q=0,Z=0,ae={};return ae.write=function(pe,ge){if(pe>>>ge)throw"length over";for(;q+ge>=8;)T.writeByte(255&(pe<<q|Z)),ge-=8-q,pe>>>=8-q,Z=0,q=0;Z=pe<<q|Z,q=q+ge},ae.flush=function(){q>0&&T.writeByte(Z)},ae},y=function(C){for(var T=1<<C,q=(1<<C)+1,Z=C+1,ae=z(),pe=0;pe<T;pe+=1)ae.add(String.fromCharCode(pe));ae.add(String.fromCharCode(T)),ae.add(String.fromCharCode(q));var ge=b(),Ie=w(ge);Ie.write(T,Z);var Ze=0,Qe=String.fromCharCode(x[Ze]);for(Ze+=1;Ze<x.length;){var zt=String.fromCharCode(x[Ze]);Ze+=1,ae.contains(Qe+zt)?Qe=Qe+zt:(Ie.write(ae.indexOf(Qe),Z),ae.size()<4095&&(ae.size()==1<<Z&&(Z+=1),ae.add(Qe+zt)),Qe=zt)}return Ie.write(ae.indexOf(Qe),Z),Ie.write(q,Z),Ie.flush(),ge.toByteArray()},z=function(){var C={},T=0,q={};return q.add=function(Z){if(q.contains(Z))throw"dup key:"+Z;C[Z]=T,T+=1},q.size=function(){return T},q.indexOf=function(Z){return C[Z]},q.contains=function(Z){return typeof C[Z]<"u"},q};return D},I=function(A,P,$){for(var L=S(A,P),x=0;x<P;x+=1)for(var D=0;D<A;D+=1)L.setPixel(D,x,$(D,x));var w=b();L.write(w);for(var y=g(),z=w.toByteArray(),C=0;C<z.length;C+=1)y.writeByte(z[C]);return y.flush(),"data:image/gif;base64,"+y};return t})();(function(){Qr.stringToBytesFuncs["UTF-8"]=function(t){function i(e){for(var n=[],a=0;a<e.length;a++){var s=e.charCodeAt(a);s<128?n.push(s):s<2048?n.push(192|s>>6,128|s&63):s<55296||s>=57344?n.push(224|s>>12,128|s>>6&63,128|s&63):(a++,s=65536+((s&1023)<<10|e.charCodeAt(a)&1023),n.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63))}return n}return i(t)}})();(function(t){typeof define=="function"&&define.amd?define([],t):typeof Jr=="object"&&(Xr.exports=t())})(function(){return Qr})});var js=[{id:"fraunces",name:"Fraunces",kind:"serif",pkg:"@fontsource-variable/fraunces",file:"fraunces-latin-full-normal.woff2",weight:"100 900"},{id:"newsreader",name:"Newsreader",kind:"serif",pkg:"@fontsource-variable/newsreader",file:"newsreader-latin-opsz-normal.woff2",weight:"200 800"},{id:"instrument",name:"Instrument Serif",kind:"serif",pkg:"@fontsource/instrument-serif",file:"instrument-serif-latin-400-normal.woff2",weight:"400"},{id:"playfair",name:"Playfair Display",kind:"serif",pkg:"@fontsource-variable/playfair-display",file:"playfair-display-latin-wght-normal.woff2",weight:"400 900"},{id:"cormorant",name:"Cormorant Garamond",kind:"serif",pkg:"@fontsource-variable/cormorant-garamond",file:"cormorant-garamond-latin-wght-normal.woff2",weight:"300 700"},{id:"inter",name:"Inter",kind:"sans",pkg:"@fontsource-variable/inter",file:"inter-latin-opsz-normal.woff2",weight:"100 900"},{id:"geist",name:"Geist",kind:"sans",pkg:"@fontsource-variable/geist",file:"geist-latin-wght-normal.woff2",weight:"100 900"},{id:"manrope",name:"Manrope",kind:"sans",pkg:"@fontsource-variable/manrope",file:"manrope-latin-wght-normal.woff2",weight:"200 800"},{id:"outfit",name:"Outfit",kind:"sans",pkg:"@fontsource-variable/outfit",file:"outfit-latin-wght-normal.woff2",weight:"100 900"},{id:"jakarta",name:"Plus Jakarta Sans",kind:"sans",pkg:"@fontsource-variable/plus-jakarta-sans",file:"plus-jakarta-sans-latin-wght-normal.woff2",weight:"200 800"},{id:"space-grotesk",name:"Space Grotesk",kind:"sans",pkg:"@fontsource-variable/space-grotesk",file:"space-grotesk-latin-wght-normal.woff2",weight:"300 700"},{id:"nunito",name:"Nunito (rund)",kind:"sans",pkg:"@fontsource-variable/nunito",file:"nunito-latin-wght-normal.woff2",weight:"200 1000"}];var Yi=js,ed={serif:'Georgia, "Times New Roman", serif',sans:'system-ui, -apple-system, "Segoe UI", sans-serif'},qs=t=>`Ambiframe ${t.name.replace(/ \(.*\)$/,"")}`,Be=t=>{let i=Yi.find(e=>e.id===t);return i?`"${qs(i)}", ${ed[i.kind]}`:""},Ys=()=>{if(document.getElementById("ambiframe-fonts"))return;let t=document.createElement("style");t.id="ambiframe-fonts",t.textContent=Yi.map(i=>{let e=new URL(`./fonts/${i.file}`,import.meta.url).href,n=i.weight.includes(" ")?"woff2-variations":"woff2";return`@font-face { font-family: "${qs(i)}"; font-style: normal; font-display: swap; font-weight: ${i.weight}; src: url("${e}") format("${n}"); }`}).join(`
`),document.head.appendChild(t)};var Zs={"% Luftfeuchte":"% humidity","* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten":"* = on every change \u2013 e.g. for buttons and event.* entities","- label: Strom\n  rows:\n    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}\n    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}":`- label: Power
  rows:
    - {name: Flat, entity: sensor.\u2026, price: 0.37}
    - {name: Dryer, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`,'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }':'.cell[data-widget="clock"] { filter: drop-shadow(0 4px 20px #0008) }',"0 = Livebild":"0 = live picture","1 Licht an":"1 light on","12 / Vollbild 15":"12 / fullscreen 15","168 = eine Woche, 720 = 30 Tage":"168 = one week, 720 = 30 days",":host { --af-accent: #e0a060 }":":host { --af-accent: #e0a060 }",ab:"from","Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin.":"From the last trigger; while a sensor is on, the page stays anyway.","ab Wert":"from value","ab {n}":"from {n}",Abbrechen:"Cancel",Abendstimmung:"Evening mood",Abholung:"Collection","Abholung {when}":"Collection {when}","Abklingzeit (s)":"Cooldown (s)","Achse bis":"Axis to","Achse von":"Axis from",Akku:"Battery","Akku %":"Battery %",Aktion:"Action","Aktion (domain.dienst)":"Action (domain.service)","Aktion/Skript ausf\xFChren":"Run action/script",Aktiv:"Active","Aktuellen Stil speichern":"Save current style","Aktuellen Wert zeigen":"Show current value","Aktueller Preis":"Current price","Aktueller Raum":"Current room",Akzent:"Accent","Akzent (Gold)":"Accent (gold)",Akzentfarbe:"Accent colour","Alarm (eindringlich, wiederholt)":"Alarm (urgent, repeats)","Alle Bewegungs-/Pr\xE4senzmelder":"All motion/presence sensors","Alle Fenster- und T\xFCrsensoren":"All window and door sensors","Alle von \u2026 (und)":"All of \u2026 (and)","Alles ruhig":"All quiet","Als eigene Seitenvorlage speichern":"Save as your own page template","Als eigene Vorlage speichern":"Save as your own template","Als Karte":"As a card","Als Vorlage":"As template","Als YAML kopieren":"Copy as YAML","Am g\xFCnstigsten":"Cheapest","am {day}":"on {day}",An:"On",an:"on","An/Aus":"On/off",Angehalten:"Paused",Angesteckt:"Plugged in",Animation:"Animation",Antippen:"Tap",Anwenden:"Apply","Anzeige (Ring)":"Gauge (ring)","Anzeige, Editor und KI-Zusammenfassung":"Display, editor and AI summary",Anzeigefehler:"display error",Art:"Type",Attribut:"Attribute","Attribut (optional)":"Attribute (optional)","Auch nachts":"Also at night","Auch pausiert zeigen":"Also show when paused","Auf dem Ger\xE4t \xF6ffnen":"Open on the device",Auftrag:"Job","Auftrag/Druck":"Job/print",Aurora:"Aurora",Aus:"Off",aus:"off","aus Home Assistant eingeschaltet":"switched on from Home Assistant",Ausl\u00F6ser:"Trigger",Ausnehmen:"Exclude",Ausrichtung:"Orientation",Auto:"Car",automatisch:"automatic","Automatisch (nach Ger\xE4t, auch beim Drehen)":"Automatic (by device, also when rotated)","automatisch (wie der HA-Benutzer)":"automatic (like the HA user)","Automatisch anordnen":"Arrange automatically","Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an":"Stacked automatically \u2013 moving creates your own layout","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang":"Automatic \u2013 light by day, dark after sunset","automatisch: Gemini":"automatic: Gemini",Balken:"Bars",Bedienmodus:"Control mode","ABC News (AU)":"ABC News (AU)","ABC News (US)":"ABC News (US)","Al Jazeera (EN)":"Al Jazeera (EN)",Australia:"Australia","BBC News (UK)":"BBC News (UK)","BBC World (UK)":"BBC World (UK)","Bilder und Bildunterschriften der Bing-Bilder des Tages":"Pictures and captions of Bing's pictures of the day","Bing-Region":"Bing region",Brasil:"Brazil","CBC News (CA)":"CBC News (CA)",Canada:"Canada","DW (EN)":"DW (EN)",Deutschland:"Germany","Deutschlandfunk (DE)":"Deutschlandfunk (DE)","Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.":"An \u201Carticle of the day\u201D only exists in these languages.",Espa\u00F1a:"Spain","FAZ (DE)":"FAZ (DE)",France:"France","Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln.":"In the video stream (AirPlay, camera) the ticker is always off \u2013 it would freeze or stutter there.",India:"India",Italia:"Italy","NPR (US)":"NPR (US)","Nachrichten-Laufband":"News ticker",Nederland:"Netherlands","New York Times (US)":"New York Times (US)","ORF (AT)":"ORF (AT)","SPIEGEL (DE)":"SPIEGEL (DE)","SRF News (CH)":"SRF News (CH)",Schweiz:"Switzerland","Sky News (UK)":"Sky News (UK)",Svenska:"Svenska","S\xFCddeutsche Zeitung (DE)":"S\xFCddeutsche Zeitung (DE)","The Guardian (UK)":"The Guardian (UK)","United Kingdom":"United Kingdom","Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.":"Pick a suggestion (e.g. bbc, guardian, tagesschau) or enter the address of any RSS/Atom feed. Empty = sources in the display language.","Wikipedia-Sprache":"Wikipedia language","Wikiquote \xB7 Deutsch, Zitat der Woche":"Wikiquote \xB7 German, quote of the week","ZDFheute (DE)":"ZDFheute (DE)","ZEIT ONLINE (DE)":"ZEIT ONLINE (DE)","ZenQuotes \xB7 English, quote of the day":"ZenQuotes \xB7 English, quote of the day","automatisch (aus beim Fernseher)":"automatic (off on TVs)","bbc, tagesschau \u2026 oder https://\u2026":"bbc, tagesschau \u2026 or https://\u2026","heise online (DE)":"heise online (DE)","n-tv (DE)":"n-tv (DE)","tagesschau (DE)":"tagesschau (DE)","wie die Anzeige":"as the display","wie die Sprache von Home Assistant":"by Home Assistant's language",\u00D6sterreich:"Austria","wie alle":"as all",Automatisch:"Automatic",Hell:"Light",Dunkel:"Dark","Zitat der Woche":"Quote of the week",Zitat:"Quote","Zitat: auf Deutsch das Zitat der Woche (Wikiquote), auf Englisch das Zitat des Tages (ZenQuotes)":"Quote: in German the quote of the week (Wikiquote), in English the quote of the day (ZenQuotes)","+ Neu":"+ New",Quer:"Landscape",Hoch:"Portrait","Eigene Farben zur\xFCcksetzen":"Reset custom colours","Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.":"No events yet \u2013 \u201C+ New\u201D above.","1 Hinweis":"1 note","Bing-Bilder des Tages auch zwischen die eigenen Fotos":"Bing pictures of the day also between your own photos","nein \u2013 nur, wenn nichts Eigenes da ist":"no \u2013 only when there are no own photos","Bing-Bilder untermischen":"Mix in Bing pictures","Jetzt: {what} bis {time}":"Now: {what} until {time}","Termine der n\xE4chsten \u2026 Stunden":"Appointments within the next \u2026 hours","N\xE4chster Termin":"Next appointment","Guten Morgen":"Good morning","Leer = die ersten Kalender automatisch":"Empty = first calendars automatically","Guten Abend":"Good evening","Guten Tag":"Good afternoon","Keine Abholung":"No collection","Regenrisiko {n} %":"Chance of rain {n} %","Regen ab etwa {time} Uhr":"Rain from about {time}","Wetter heute":"Weather today","Heute keine Termine":"No appointments today","Termine heute":"Today's appointments","Tagesvorschau am Morgen":"Morning day preview",Tagesvorschau:"Day preview","Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV":"Adds the \u201COn TV\u201D switch \u2013 sends the display to the Apple TV via AirPlay","Fernseher (Apple TV)":"TV (Apple TV)","Fenster zu! Es regnet":"Close the windows! It's raining","Nur zeigen, wenn":"Only show when","z. B. Fenster \u2013 die offenen werden genannt":"e.g. windows \u2013 the open ones are named","Nur wenn eine davon an ist":"Only when one of these is on","Endzeit statt Restzeit":"End time instead of time left","z. B. aktueller Raum des Saugers":"e.g. the vacuum's current room",Zusatz:"Extra","on, run, running \u2026":"on, run, running \u2026",l\u00E4uft:"playing","Es regnet":"It's raining","noch {time}":"{time} left","Restzeit oder Endzeit":"Time left or end time","Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde":"Empty = usual \u201Crunning\u201D states","L\xE4uft bei Zustand":"Running when state is","Zeigen bei Zustand":"Show when state is","Wiedergabe (z. B. Apple TV)":"Playback (e.g. Apple TV)","Ger\xE4t l\xE4uft \u2013 mit Restzeit":"Device running \u2013 with time left","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)":"Notice \u2013 only when true (e.g. rain)","L\xE4uft gerade (ganze Seite)":"Now playing (full page)","Ganze Seite mit gro\xDFem Cover":"Full page with large cover",Kompakt:"Compact","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)":"Amrum \u2013 Nebel, view over the Wadden Sea and the Halligen (image)","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)":"Feldberg, Black Forest \u2013 Todtnauer H\xFCtte (image)","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)":"Bostalsee, Saarland \u2013 west shore with marina (image)",Saugkarte:"Cleaning map","Leer = Karte des Saugers automatisch":"Empty = the vacuum's own map","Gro\xDFe Karte darunter":"Large map below",Ausblenden:"Hide","Neben jedem Sauger":"Next to each vacuum","Kleine Karten":"Small maps","Tagesinhalt (Wikipedia, Zitat)":"Daily content (Wikipedia, quote)","Wikipedia-Artikel des Tages":"Wikipedia article of the day","Zitat des Tages":"Quote of the day","Artikel des Tages \xB7 Wikipedia":"Today's featured article \xB7 Wikipedia","Mit Bild":"With picture","Ohne Bild":"Without picture",Inhalt:"Content",Anzahl:"Count","Energiez\xE4hler (kWh)":"Energy meter (kWh)","Gr\xF6\xDFte Verbraucher":"Top consumers","Gr\xF6\xDFte Verbraucher heute":"Top consumers today","Heute noch kein Verbrauch gemessen":"No consumption measured today yet","Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant":"Empty = the individual devices from the Home Assistant energy dashboard","Wird berechnet \u2026":"Calculating \u2026","Richtung umkehren":"Reverse direction","Wenn der Antrieb offen und zu andersherum meldet":"If the motor reports open and closed the other way round",ausgefahren:"extended",eingefahren:"retracted","Gilt f\xFCr":"Applies to","Alle Displays":"All displays","F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.":"Designing \u201C{name}\u201D: what you set here applies only to this display. Empty = as for all displays.","Stil wie alle Displays":"Style as all displays","Alle Abweichungen dieses Displays zur\xFCcksetzen":"Reset all differences of this display","wie alle Displays":"as all displays","Mit Stil-Vorschau gestalten":"Design with style preview","4K und Full HD (zwei Kameras)":"4K and Full HD (two cameras)","Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Cameras \u201CAmbiframe {name} Video stream\u201D (4K) and \u201C\u2026 Video stream Full HD\u201D \u2013 in a dashboard, in Apple Home (HomeKit Bridge) or via \u201Ccamera.play_stream\u201D on the Apple TV.",Aufl\u00F6sung:"Resolution","Full HD (1920 \xD7 1080)":"Full HD (1920 \xD7 1080)","F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C.":"For OLED screens: the picture shifts imperceptibly by a few pixels every few minutes so nothing burns in. Best combined with \u201Cdark\u201D.","Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Camera \u201CAmbiframe {name} Video stream\u201D \u2013 in a dashboard, in Apple Home (HomeKit Bridge) or via \u201Ccamera.play_stream\u201D on the Apple TV.","Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut.":"Creates the camera \u201CVideo stream\u201D \u2013 e.g. for Apple TV (AirPlay), Apple Home or TVs without a modern browser. Needs the \u201CPuppet\u201D add-on. It only renders while someone is watching.","Neues Bild alle (s)":"New picture every (s)","Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000":"Only needed if Puppet is not found, e.g. http://homeassistant.local:10000","OLED-Schutz":"OLED protection","Puppet-Adresse":"Puppet address",Videostream:"Video stream","4K (3840 \xD7 2160)":"4K (3840 \xD7 2160)","Alles gut":"All good","Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.":"All fine: all entities present, devices connected, photos available.","Das iCloud-Album liefert keine Fotos":"The iCloud album returns no photos","Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)":"The photo frame has no photos (folder and album empty, Bing off)","Der Fotoordner ist leer oder fehlt":"The photo folder is empty or missing","Display \u201E{name}\u201C":"Display \u201C{name}\u201D","Display \u201E{name}\u201C meldet sich nicht":"Display \u201C{name}\u201D is not responding","Display \u201E{name}\u201C meldet sich seit {n} h nicht":"Display \u201C{name}\u201D has not responded for {n} h","Display \u201E{name}\u201C war noch nie verbunden":"Display \u201C{name}\u201D has never connected","Ereignis \u201E{name}\u201C":"Event \u201C{name}\u201D","Fotos werden gez\xE4hlt \u2026":"Counting photos \u2026",Gesundheitscheck:"Health check","Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos":"Health check: missing entities, devices, photos","KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant":"AI summary is on, but there is no AI (ai_task) in Home Assistant","Seite \u201E{name}\u201C":"Page \u201C{name}\u201D","Seite \u201E{name}\u201C wird nirgends gezeigt":"Page \u201C{name}\u201D is not shown anywhere","{n} Hinweise":"{n} notes","{id} gibt es nicht (mehr) \u2013 {where}":"{id} does not exist (anymore) \u2013 {where}","{id} ist nicht verf\xFCgbar \u2013 {where}":"{id} is unavailable \u2013 {where}","\u201E{name}\u201C hat noch eine \xE4ltere Version":"\u201C{name}\u201D still has an older version","\u201E{name}\u201C ist im Notfallmodus: {reason}":"\u201C{name}\u201D is in safe mode: {reason}","1 Stunde stumm":"Mute 1 hour",Anhalten:"Pause",Dunkler:"Darker","Eine Stunde stumm":"Muted for an hour",Heller:"Brighter","Helligkeit {n} %":"Brightness {n} %",Schlie\u00DFen:"Close",Schnellmen\u00FC:"Quick menu","T\xF6ne an":"Sounds on","T\xF6ne wieder an":"Sounds back on","Weiter abspielen":"Resume","Alle Batterien in Ordnung":"All batteries fine","Ger\xE4te und schwache Batterien":"Devices and low batteries","Nur Ger\xE4te":"Devices only","Nur schwache Batterien":"Low batteries only",Zeigen:"Show","+ {n} weitere":"+ {n} more",Akkus:"Batteries",Akkustand:"Battery level","Batterie wechseln":"Replace battery","Ger\xE4te (immer zeigen)":"Devices (always show)","H\xF6chstens Zeilen Zubeh\xF6r":"Max. rows of accessories","Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App":"Empty = all phones, tablets and watches from the HA app automatically","Zubeh\xF6r zeigen unter (%)":"Show accessories below (%)","Zubeh\xF6r: alle Batterien in Ordnung":"Accessories: all batteries fine",schwach:"low","Pfeile zum Bl\xE4ttern":"Arrows to browse","Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen":"Subtle at the bottom left and right: previous and next page without leaving Ambiframe","Vorherige Seite":"Previous page","N\xE4chste Seite":"Next page","Karte unten rechts (kurz beim Liedwechsel)":"Card bottom right (briefly on track change)","Vollbild (kurz beim Liedwechsel)":"Full screen (briefly on track change)","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft":"Mini card \u2013 stays while something is playing","Eigenes QR-Bild":"Own QR image","Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)":"Instead of network name and password, a ready-made QR image, e.g. from your router (link or data:image/\u2026)","Adresse kopieren":"Copy address","Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.":"Everything at a glance: photos, weather, appointments, bins, household and energy. Tap to open the dashboard.","Ambiframe als Bildschirmschoner":"Ambiframe as screensaver","Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.":"Ambiframe always runs; tapping shows the HA dashboard, then it returns by itself.",Anh\u00F6ren:"Listen","Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild":"Motion at the door \u2192 camera picture-in-picture","Bing-Bilder, wenn Ordner und Album leer sind":"Bing images when folder and album are empty","Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.":"The profile picks suitable pages, controls, sounds and look. You can adjust everything afterwards.","Dashboard \xFCber Ambiframe":"Dashboard over Ambiframe","Dieses Display mit allen Einstellungen kopieren":"Copy this display with all settings","Display \u201E{name}\u201C mit {n} Seiten":"Display \u201C{name}\u201D with {n} pages","Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist":"A calm picture \u2013 that only speaks when something happens",Fernseher:"TV","Fertig \u2013 speichern":"Done \u2013 save","Fertig!":"Done!",Flur:"Hallway","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren.":"Photos app \u2192 share album \u2192 turn on \u201CPublic Website\u201D \u2192 copy link.","Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt.":"Fully Kiosk found: Ambiframe sets the start page and screensaver itself and restarts the tablet if it hangs.","Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.":"Fully shows the dashboard; after a minute without touch Ambiframe appears. Doorbell and camera bring it to the front at once.","F\xFCr den Bilderrahmen. Ordner und Album werden gemischt; ohne beides zeigt Ambiframe die Bing-Bilder des Tages.":"For the photo frame. Folder and album are mixed; without both Ambiframe shows Bing's images of the day.","Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.":"Found in your Home Assistant. Sounds are subtle and match the design \u2013 press \u25B6 to listen.","Ger\xE4t fertig \u2192 Hinweis und Erinnerung":"Appliance finished \u2192 notice and reminder","Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.":"Large photo frame: photos, webcams, weather, news. Dark and calm (gentle on OLED), no controls or sound.","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C anlegen und Fotos hochladen.":"HA \u2192 Media \u2192 Local media \u2192 create folder \u201Cambiframe\u201D and upload photos.","In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.":"In a few steps you set up your first display: where it hangs, what it shows, what it reacts to. Everything can be changed later in the editor.","Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.":"No controls \u2013 e.g. for the TV.","Klingel \u2192 Vollbild mit Kamera":"Doorbell \u2192 full screen with camera",Kopie:"copy","Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.":"At a glance when passing by: clock, weather, bins and who is home \u2013 large text.",K\u00FCche:"Kitchen","Leiser als die Klingel, nachts (22\u20137 Uhr) stumm.":"Quieter than the doorbell, silent at night (10 pm\u20137 am).","Neue Seiten dazu":"Add new pages","Nur anzeigen":"Display only","Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.":"Calm and dark: clock, photos, weather. Only the doorbell speaks up \u2013 quiet in the evening, silent at night.",Schlafzimmer:"Bedroom","So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.":"Set up the device: open this address in the browser of the tablet or TV (in Fully as start URL) and log in to Home Assistant once.","Sp\xFClmaschine fertig":"Dishwasher finished","Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.":"Tip: with Fully Kiosk (and its HA integration) Ambiframe sets up the tablet itself.","Trockner fertig":"Dryer finished","Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.":"Preselected by profile. The photo frame alternates with the info pages.","Was soll das Display zeigen?":"What should the display show?",Weiter:"Next","Willkommen bei Ambiframe":"Welcome to Ambiframe","Wo h\xE4ngt das Display?":"Where does the display hang?","Woher kommen die Fotos?":"Where do the photos come from?","Worauf soll es reagieren?":"What should it react to?",Zur\u00FCck:"Back","ohne Ton":"no sound","{n} neue Ereignisse":"{n} new events",\u00DCberspringen:"Skip","Eigenes CSS (nur dieses Display)":"Custom CSS (this display only)","Eigenes Design":"Own design","Erg\xE4nzt das CSS aus dem Design.":"Added to the CSS from the design.","Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben":"No sounds on this display \u2013 overlays still appear","Leer = wie Design":"Empty = as design","Nur was hier eingetragen ist, weicht vom Design ab \u2013 leer hei\xDFt \u201Ewie Design\u201C.":"Only what is set here differs from the design \u2013 empty means \u201Cas design\u201D.","Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets":"Scales the volume of events; in Fully the tablet's media volume",Stumm:"Mute",T\u00F6ne:"Sounds","Z. B. media-source://media_source/local/kueche":"E.g. media-source://media_source/local/kitchen",Bedienung:"Controls","Dashboard \xFCber Ambiframe (Antippen)":"Dashboard over Ambiframe (tap)","Dashboard in Fully, Ambiframe als Bildschirmschoner":"Dashboard in Fully, Ambiframe as screensaver","Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.":"Screensaver: Fully shows the dashboard; after the idle time Ambiframe appears. Doorbell and camera bring Ambiframe to the front at once. Fully is set up automatically.","Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint":"Time without touch until Ambiframe returns",bedingt:"conditional",Bedingung:"Condition","Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).":"Conditions, appearance and tap actions are available in \u201CAdvanced\u201D mode (top right).","Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben":"The next one each time the page appears \u2013 replaces camera and link above","Beim Antippen":"On tap","Beim langen Dr\xFCcken":"On long press",beliebig:"any",Bereit:"Ready","Besuche heute":"visits today",Bewegung:"Motion","Bewegung erkannt":"Motion detected","Bewegung \u2192 Bild-im-Bild":"Motion \u2192 picture-in-picture","Bewegung \u2192 Seite":"Motion \u2192 page","Bewegung \u2192 Seite zeigen":"Motion \u2192 show page",Bewertung:"Rating",Bew\u00F6lkt:"Cloudy",Bezeichnung:"Label",Bild:"Image","Bild neu laden (s)":"Reload image (s)","Bild nicht ladbar":"Image could not be loaded","Bild-im-Bild":"Picture-in-picture","Bild-im-Bild (Bewegung)":"Picture-in-picture (motion)","Bild-Link":"Image link","Bild-Link oder Entit\xE4t w\xE4hlen":"Choose an image link or entity",Bilderrahmen:"Photo frame","Bildschirm aus":"Screen off",Bildunterschrift:"Caption","Bing-Bilder":"Bing images",bis:"until","Bis {hi}\xB0, nachts {lo}\xB0":"Up to {hi}\xB0, {lo}\xB0 at night","bis {when}":"until {when}","Bleibt danach als kleine Erinnerung oben rechts.":"Afterwards stays as a small reminder at the top right.","Bleibt vorerst nass":"Staying wet for now",Breite:"Width",Cover:"Cover","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)":"Cuxhaven-Duhnen \u2013 beach and mudflats (YouTube live picture)","Danach erst wieder zeigen \u2013 gegen Dauerfeuer.":"Only show again after this \u2013 against constant triggering.","Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg":"May be a template, e.g. /local/{{ states('input_select.motif') }}.jpg","Darf eine Vorlage sein.":"May be a template.","Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert.":"May contain templates, e.g. {{ states('sensor.outside') }} \xB0C \u2013 updated live.",Darstellung:"Appearance",Dashboard:"Dashboard","Daten (YAML, optional)":"Data (YAML, optional)",Datum:"Date",Dauer:"Duration","Dauer (s)":"Duration (s)","Dauer in Sekunden (leer = Seitendauer)":"Duration in seconds (empty = page duration)","Davor zeigt die Bilanz den Vortag":"Before that, the summary shows the previous day","Deckkraft (%)":"Opacity (%)",Design:"Design","Details (HA-Dialog)":"Details (HA dialog)",deutlich:"strong",Deutsch:"Deutsch",dezent:"subtle","Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)":"Load the version from before the last save into the editor (then \u201CSave\u201D)","Die Wahl wird auf diesem Ger\xE4t gespeichert.":"The choice is saved on this device.","Diesen Eintrag nur zeigen, wenn \u2026":"Only show this entry when \u2026","Klangschale (tief, schwebend)":"Singing bowl (deep, shimmering)","Marimba (zwei Holzt\xF6ne)":"Marimba (two wooden notes)","Glas (klares Ding-Dong)":"Glass (clear ding-dong)","Kalimba (drei gezupfte T\xF6ne)":"Kalimba (three plucked notes)","Windspiel (zart)":"Wind chime (delicate)","Hinweis (sehr leise, kurz)":"Hint (very quiet, short)","Ding-Dong":"Ding-dong",Display:"Display",Displays:"Displays",dunkel:"dark","dunkel: nach Sonnenuntergang w\xE4rmer":"dark: warmer after sunset",Duplizieren:"Duplicate",d\u00E4mmrig:"dusky",Eckenradius:"Corner radius","Eckenradius (px)":"Corner radius (px)","Eckenradius der Karten (px)":"Card corner radius (px)",Editorial:"Editorial","Eigene Farbe":"Custom colour","Eigene Farben \xB7 Dunkel":"Custom colours \xB7 dark","Eigene Farben \xB7 Hell":"Custom colours \xB7 light","Eigene Stile":"Your styles","Eigene Vorlagen":"Your templates","Eigene Vorlagen:":"Your templates:","Eigenes CSS (alle Displays)":"Custom CSS (all displays)","Eigenes CSS (nur diese Seite)":"Custom CSS (this page only)","Ein Balken je":"One bar per","Ein/aus schalten":"Toggle on/off","Eine von mehreren ist":"One of several is","eine von {n} = {state}":"one of {n} = {state}","Eine Zeile":"One line","Eine Zeile (dezent)":"One line (subtle)",Einfach:"Simple","Einfach: nur das N\xF6tige \xB7 Erweitert: alle M\xF6glichkeiten":"Simple: just the essentials \xB7 Advanced: everything",eingebaut:"built-in",Einheit:"Unit","Einmal tippen f\xFCr Vollbild":"Tap once for fullscreen",Einpassen:"Fit",Einstellungen:"Settings",Eintrag:"Entry","empfindliche Gruppen":"sensitive groups",Endzeit:"End time","Energie jetzt":"Energy now","Energie-Bilanz":"Energy summary",English:"English",entfernen:"remove",Entit\u00E4t:"Entity","Entit\xE4t hinzuf\xFCgen":"Add entity","Entit\xE4t hinzuf\xFCgen \u2026":"Add entity \u2026","Entit\xE4t w\xE4hlen":"Choose an entity",Entit\u00E4ten:"Entities","Ereignis \u201E{name}\u201C l\xF6schen?":"Delete event \u201C{name}\u201D?",Ereignisse:"Events","Erf\xFCllt bei true, on, Zahl \u2260 0":"True for true, on, number \u2260 0",Erinnerungstext:"Reminder text",Erledigt:"Done","Erstellen um":"Create at",erstes:"first",Erweitert:"Advanced",Erzeugung:"Production","Erzeugung (W)":"Production (W)","Es gibt noch keine vorherige Fassung.":"There is no previous version yet.","Es klingelt":"Someone\u2019s at the door","Es regnet gerade":"It\u2019s raining",Exportieren:"Export",Extrem:"Extreme",Familie:"Family",Farbe:"Colour","Farbe ab Wert":"Colour from value",Farben:"Colours",Fehlgeschlagen:"Failed","Fehlgeschlagen: {error}":"Failed: {error}",Fenster:"Window","Fenster offen":"Window open","Fertig um":"Done at","fertig um {time}":"done at {time}","fertig {time}":"done {time}",feucht:"humid","Flie\xDFender Verlauf":"Flowing gradient",Flie\u00DFtext:"Body text",Fl\u00E4che:"Area","Fl\xE4che, Rand und Radius des Stils":"Surface, border and radius of the style",Form:"Shape","Form & CSS":"Shape & CSS",Format:"Format","Formatierung (Markdown)":"Formatting (Markdown)","Fortschritt %":"Progress %","Fortschritt (%)":"Progress (%)",Foto:"Photo",Fotoordner:"Photo folder",Fotos:"Photos","Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt.":"Photos app \u2192 share album \u2192 turn on \u201CPublic Website\u201D \u2192 copy link. Mixed with the folder.",Freundlich:"Friendly",Fu\u00DFnote:"Footnote","F\xE4hrt zur\xFCck":"Returning","F\xFCllen (zuschneiden)":"Fill (crop)","f\xFCllt das Feld":"fills the field","F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie":"For the \u201CPause\u201D switch in HA; 0 = never","F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen.":"For advanced users: applies in the display; colours and spacing via --af-\u2026 variables.",'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.':'For advanced users: applies within the page; widgets can be targeted via .cell[data-widget="id"].',"F\xFCr Tor, T\xFCrschloss & Co.":"For gates, door locks & co.","Ganz zeigen":"Show whole",ganztags:"all day","gar nicht zeigen":"don\u2019t show at all",Ged\u00E4mpft:"Muted","Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen.":"Gemini (ai_task) summarises weather, appointments, bins, power, car and house.","Gemini schreibt \u2026":"Gemini is writing \u2026",gerade:"just now","gerade eben":"just now","Gerade ist kein Ger\xE4t mit diesem Display verbunden":"No device is connected to this display right now","Gerade l\xE4uft nichts":"Nothing playing right now",Ger\u00E4t:"Device","Ger\xE4t fertig":"Appliance done","Ger\xE4t fertig \u2192 Hinweis":"Appliance done \u2192 notice",Ger\u00E4te:"Appliances",Gespeichert:"Saved","Gespeichert \u2013 alle Displays zeigen es sofort.":"Saved \u2013 all displays show it right away.","gestern {time}":"yesterday {time}","Gestern, {date}":"Yesterday, {date}",Gewitter:"Thunderstorm","Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben":"Glass surfaces with light edges over soft colours","Glocke (kurz, hell)":"Bell (short, bright)",Gold:"Gold","Gong (warm, tief)":"Gong (warm, deep)",Gro\u00DF:"Large","gro\xDF (+15 %)":"large (+15 %)","Gro\xDFbild mit Schlagzeile":"Large picture with headline","Gruppen (YAML)":"Groups (YAML)","Gruppen zeigen jedes Lied nur einmal":"Groups show each song only once",Gr\u00F6\u00DFe:"Size","Gr\xF6\xDFe (%)":"Size (%)",gut:"good","Gut (gr\xFCn)":"Good (green)","Guten Morgen (KI-Zusammenfassung)":"Good morning (AI summary)","G\xE4ste-WLAN":"Guest Wi-Fi",g\u00FCnstig:"cheap","G\xFCnstigstes Fenster (h)":"Cheapest window (h)","HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C":"HA \u2192 Media \u2192 Local media \u2192 folder \u201Cambiframe\u201D","HA-Dashboard \xF6ffnen":"Open HA dashboard","HA-Karte":"HA card",Hagel:"Hail",Halbkreis:"Half circle","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)":"Hamburg \u2013 Michel with harbour panorama (YouTube live picture)","Hamburg \u2013 Stadt (Livebild von YouTube)":"Hamburg \u2013 city (YouTube live picture)","Handy-Kamera auf den Code halten":"Point your phone camera at the code",Haustier:"Pet",Haust\u00FCr:"Front door","heizt auf {temp}\xB0":"heating to {temp}\xB0",Heizung:"Heating","Helfer umschalten":"Toggle helper",hell:"bright","Hell / Tinte":"Light / ink","Hell/Dunkel":"Light/dark","Hell/Dunkel & Schrift":"Light/dark & fonts","Helligkeit (Lux)":"Brightness (lux)","Hervorheben ab Tagen":"Highlight from days","Herzogstand \u2013 Kochel- und Walchensee (Bild)":"Herzogstand \u2013 Kochelsee and Walchensee (image)",Heute:"Today",heute:"today","Heute ab (Uhr)":"Today from (time)","heute Abend":"tonight","Heute Abend & morgen":"Tonight & tomorrow","Heute Abend rausstellen":"Put out tonight","Heute bis jetzt":"Today so far","Heute Nachmittag":"This afternoon","Heute {lo}\xB0 bis {hi}\xB0":"Today {lo}\xB0 to {hi}\xB0",Hintergrund:"Background",Hinweis:"Notice","Hinweis + Erinnerung (Ger\xE4te)":"Notice + reminder (appliances)",hoch:"high","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)":"high (muted text stronger)",Hochformat:"Portrait","https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)":"https://\u2026 (image, MJPEG, .m3u8 or YouTube)",H\u00F6chstens:"At most","H\xF6chstens (s)":"At most (s)","H\xF6chstens Eintr\xE4ge":"At most entries",H\u00F6he:"Height","iCloud-Album":"iCloud album",Icon:"Icon","Immer dunkel":"Always dark","Immer hell":"Always light","Immer hoch":"Always portrait","Immer quer":"Always landscape","Import fehlgeschlagen: {error}":"Import failed: {error}",Importieren:"Import","Importierte Seite":"Imported page","In den Editor \xFCbernehmen":"Apply to editor","in den letzten \u2026 Minuten":"in the last \u2026 minutes","In der Ruhezeit":"During quiet hours","In der Station":"Docked","in {n} Tagen":"in {n} days","Info mit Kopfzeile":"Info with header",Infozeile:"Info line","Innen {temp}\xB0":"Inside {temp}\xB0","Innenabstand (px)":"Padding (px)",Innentemperatur:"Inside temperature","Ist M\xFCllkalender":"Is a bin calendar",Ja:"Yes",ja:"yes","Jede Karte aus dem Dashboard, z. B. type: entities \u2026":"Any card from the dashboard, e.g. type: entities \u2026","jede \xC4nderung (Tasten, event.*)":"any change (buttons, event.*)",jetzt:"now","Jetzt (gro\xDF)":"Now (large)","Jetzt erstellen":"Create now",Kalender:"Calendar","Kalt unter":"Cold below","Kalt unter \xB0C":"Cold below \xB0C",Kamera:"Camera","Kamera / Webcam":"Camera / webcam","Kamera als Hintergrund":"Camera as background",Karte:"Card","Karte (YAML)":"Card (YAML)","Karte mit 4 Stunden":"Card with 4 hours","Karte nicht ladbar: {error}":"Card could not be loaded: {error}","Karte unten rechts":"Card bottom right","Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)":"Card \u201C{type}\u201D (only visible in Home Assistant)",Karten:"Cards","Karten-Deckkraft (%)":"Card opacity (%)","kein Ausl\xF6ser":"no trigger","Kein Display konfiguriert":"No display configured","Kein Display.":"No display.","Kein Regen bis {h} Uhr":"No rain until {h}:00","kein Stil gefunden":"no style found","kein Ton":"no sound",keine:"none","Keine Bewegung in letzter Zeit":"No recent motion","Keine Karte konfiguriert":"No card configured","Keine Preisdaten":"No price data","keine Seite":"no page","Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).":"No page recognised (\u201Cwidgets\u201D missing).","keine Seite sichtbar":"no page visible","Keine Termine in den n\xE4chsten Tagen":"No appointments in the next few days","Keine von \u2026 (nicht)":"None of \u2026 (not)","Keine Warnungen":"No warnings","Keiner gew\xE4hlt = alle":"None selected = all","KI-Zusammenfassung":"AI summary",Klar:"Clear","klein (Kopfzeile)":"small (header)","Klein unten rechts, z. B. \u201ECuxhaven\u201C":"Small at the bottom right, e.g. \u201CCuxhaven\u201D","Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung":"Smaller text (labels, lists, details) \u2013 for reading from a distance","Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.":"Click into the field for the built-in sounds \u2013 or a link (/local/sound.mp3). On the tablet via Fully.",Klingel:"Doorbell","Klingel \u2192 Vollbild":"Doorbell \u2192 fullscreen","Knapp, nur Fakten":"Brief, facts only",Kontrast:"Contrast",Kopieren:"Copy","Kopieren (\u2318C)":"Copy (\u2318C)",Kosten:"Cost","Kosten-Sensor":"Cost sensor","K\xFChl (blau)":"Cool (blue)","K\xFCrzlich ge\xE4ndert":"Recently changed",Ladeleistung:"Charging power",Ladelimit:"Charge limit","Ladelimit {n} %":"Charge limit {n} %",langsam:"slow",Laufband:"Ticker","Laufende Ger\xE4te":"Running appliances","Lautst\xE4rke (%)":"Volume (%)","Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch":"Empty = all bin sensors (\u2026_days) automatically","Leer = automatisch suchen":"Empty = search automatically","Leer = Farbe des Stils":"Empty = style colour","Leere Seite":"Empty page",Leise:"Quiet",Leistung:"Power","Leistung (W)":"Power (W)","Letzte Tage":"Last days","Licht umschalten":"Toggle light","Lichter an":"Lights on",Lichtschimmer:"Shimmer",Linie:"Line",links:"left","Liquid Glass":"Liquid Glass",Liste:"List","Liste mit Vorschaubildern":"List with thumbnails",Live:"Live","Lovelace-Karte (YAML)":"Lovelace card (YAML)",Luftfeuchte:"Humidity","Luftfeuchte (Raum)":"Humidity (room)","Luftqualit\xE4t (AQI)":"Air quality (AQI)",L\u00E4dt:"Charging","L\xE4dt in der Station":"Charging in the dock","L\xE4dt \u2026":"Loading \u2026","L\xE4uft gerade":"Now playing","L\xE4uft-Entit\xE4t":"Running entity",L\u00F6schen:"Delete",Maximum:"Maximum","mdi:\u2026 oder washer, car, bell \u2026":"mdi:\u2026 or washer, car, bell \u2026","Mehrere Webcams im Wechsel":"Several webcams in turn",Melder:"Sensor",Meldungen:"Items","Mindestens (s)":"At least (s)","Mindestens eine Person (person.*) ist \u201Ehome\u201C.":"At least one person (person.*) is \u201Chome\u201D.","Mindestens eine von \u2026 (oder)":"At least one of \u2026 (or)",Minimal:"Minimal",Minimum:"Minimum",mittel:"medium",mittig:"centre","Mo., 12. Okt.":"Mon, 12 Oct",Modus:"Mode","Montag, 12. Oktober":"Monday, 12 October",Morgen:"Tomorrow",morgen:"tomorrow","Morgen anzeigen":"Show tomorrow",Musik:"Music","Musik \u2192 Cover":"Music \u2192 cover","Musik-Cover":"Music cover","Musik-Cover (bei Liedwechsel)":"Music cover (on song change)",m\u00E4\u00DFig:"moderate",M\u00FCll:"Bins","M\xFCll zeigen ab Tagen":"Show bins from days",M\u00FCllabfuhr:"Bin collection",M\u00FCllkalender:"Bin calendar",M\u00FClltonnen:"Bins","M\xFClltonnen (im Wechsel)":"Bins (rotating)","M\xFCnchen \u2013 Panorama (Bild)":"Munich \u2013 panorama (image)","n-tv":"n-tv","Nach dem Ende so lange nicht erneut zeigen.":"Don\u2019t show again for this long after it ends.","nach oben":"move up","nach unten":"move down",Nachkommastellen:"Decimals","Nachlauf (s)":"Hold after (s)",Nachrichten:"News","Nachrichten werden geladen \u2026":"Loading news \u2026",Nacht:"Night","Nacht (gedimmt)":"Night (dimmed)","Nacht, wenn an":"Night when on",Nachtseite:"Night page",Name:"Name","Name der Seitenvorlage":"Page template name","Name der Vorlage":"Template name","Name des Auftrags":"Job name","Name des Players":"Player name","Name, z. B. Herbst":"Name, e.g. Autumn",Nebel:"Fog",nein:"no","Netzname (SSID)":"Network name (SSID)","Netzname und Passwort im Editor eintragen.":"Enter network name and password in the editor.","Neu laden":"Reload","Neu laden alle (s)":"Reload every (s)","Neue Seite":"New page","Neues Display":"New display","Neustart nach (s)":"Restart after (s)","Neustart-Taste":"Restart button",nicht:"not","nicht in Wiedergabe":"not in playlist","nicht zeigen":"don\u2019t show","Nichts l\xE4uft gerade":"Nothing running right now","Nichts offen, nichts l\xE4uft":"Nothing open, nothing running",nie:"never",niedrig:"low",Noch:"Remaining","Noch keine Daten im Zeitraum":"No data in this period yet","Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.":"No styles of your own yet \u2013 set up style, colours and fonts and save them here.","Noch keine Seite \u2013 oben \u201E+ Neu\u201C.":"No page yet \u2013 \u201C+ New\u201D above.","Noch keine Statistik im Zeitraum":"No statistics in this period yet","Noch keine Werte f\xFCr diesen Tag.":"No values for this day yet.","Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.":"No summary yet \u2013 it is created at the set times.","noch {n} kWh":"{n} kWh to go","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)":"Norderney \u2013 harbour and Wadden Sea (YouTube live picture)",Normal:"Normal",normal:"normal","normal (ruhig)":"normal (calm)",Notfallmodus:"Safe mode","Nur anzeigen wenn \u2026":"Only show when \u2026","Nur auf Display \u2026":"Only on display \u2026","nur auf {names}":"only on {names}","Nur diese Ereignistypen":"Only these event types","nur Hochformat":"portrait only","Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets.":"Browser only \u2013 Fully uses the tablet\u2019s media volume.","Nur im Hoch-/Querformat":"Only in portrait/landscape","Nur offene listen":"List only open ones","nur Querformat":"landscape only","Nur wenn au\xDFerdem \u2026":"Only if also \u2026","Nur wenn in Tagen":"Only if within days","Nur wenn jemand zu Hause ist":"Only when someone is home","Nur zeigen bis Tage":"Only show up to days","Nur zu bestimmten Zeiten oder Bedingungen zeigen":"Only show at certain times or conditions","N\xE4chste Stunden":"Next hours","N\xE4chste Tage":"Next days",oben:"top","Obergrenze, auch wenn ein Melder dauerhaft an bleibt.":"Upper limit, even if a sensor stays on.",oder:"or",Offen:"Open",offen:"open","Offene Fenster & T\xFCren":"Open windows & doors","Ohne Rahmen":"Without frame","ohne Ton zeigen":"show without sound","Optional \u2013 sonst aus dem Tibber-Verlauf.":"Optional \u2013 otherwise from the Tibber history.","Ort / Zusatz":"Place / extra","Ort zeigen":"Show place",Ortsangabe:"Location",Ortsname:"Place name",Passwort:"Password","Passwort zus\xE4tzlich als Text":"Also show password as text","Pause endet nach (min)":"Pause ends after (min)",Pausiert:"Paused",pausiert:"paused","per Link (?safe=1)":"via link (?safe=1)",Person:"Person","Person, image.*, Kamera, Medienplayer \u2026":"Person, image.*, camera, media player \u2026",Personen:"People",Player:"Player",Polly:"Polly","Pop-up mit HA-Karte":"Pop-up with HA card","Prognose heute (kWh)":"Forecast today (kWh)","Prognose heute {n} kWh":"Forecast today {n} kWh","Prognose Rest (kWh)":"Forecast remaining (kWh)",Quelle:"Source",Quellen:"Sources",Querformat:"Landscape",Rahmen:"Frame",Raum:"Room",Rausstellen:"Put out",rechts:"right",Regen:"Rain","Regen ab %":"Rain from %","Regen ab {h} Uhr":"Rain from {h}:00","Regen an/aus":"Rain on/off","Regen-Vorschau":"Rain preview",Regensensor:"Rain sensor",Regnet:"Raining",Reichweite:"Range","Renesse \u2013 Strand (Livebild von YouTube)":"Renesse \u2013 beach (YouTube live picture)",Restzeit:"Time remaining",Ring:"Ring",Rollladen:"Blind","Rollladen/Tor umschalten":"Toggle blind/gate",Rolll\u00E4den:"Blinds","Ruhezeit ab":"Quiet hours from","Ruhezeit bis":"Quiet hours until",Ruhig:"Calm","Ruhig flie\xDFende Farben wie Nordlicht":"Gently flowing colours like northern lights",R\u00E4ume:"Rooms","R\xFCckg\xE4ngig (\u2318Z)":"Undo (\u2318Z)",Sauger:"Vacuum",Saugroboter:"Robot vacuum",Saugt:"Cleaning",Schicht:"Layer","Schichten gesamt":"Total layers",Schieben:"Slide",Schlicht:"Plain","Schlie\xDFt nach (s)":"Closes after (s)",Schloss:"Lock",Schnee:"Snow",Schneeregen:"Sleet",Schrift:"Font","Schrift des Stils":"Style font","Schrift Text":"Text font","Schrift Uhr & Titel":"Clock & title font",Schriftfarbe:"Text colour",Schriftgr\u00F6\u00DFe:"Font size","Schriftgr\xF6\xDFe Punkte (px)":"Bullet font size (px)","Schwebende Partikel":"Floating particles","Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie":"Swiss style: clear type, high contrast, typography only","sehr gro\xDF (+30 %)":"very large (+30 %)","sehr hoch":"very high","Sehr ruhig; nachts aus. Pro Seite \xE4nderbar.":"Very calm; off at night. Can be changed per page.","seit {time}":"since {time}",Seite:"Page","Seite importieren \u2026":"Import page \u2026","Seite in die Wiedergabe":"Page to playlist","Seite unten als YAML \u2013 zum Kopieren markieren.":"Page below as YAML \u2013 select it to copy.","Seite zeigen":"Show page","Seite zeigen (z. B. bei Bewegung)":"Show page (e.g. on motion)","Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.":"Page \u201C{name}\u201D copied as YAML \u2013 paste it elsewhere with \u201C+ New \u2192 Import page\u201D or \u2318V.","Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.":"Page \u201C{name}\u201D created \u2013 adjust page IDs in actions if needed.","Seite \u201E{name}\u201C l\xF6schen?":"Delete page \u201C{name}\u201D?",Seiten:"Pages","Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.":"Page template \u201C{name}\u201D saved \u2013 under \u201C+ New\u201D.","Seitenvorlage \u201E{name}\u201C l\xF6schen?":"Delete page template \u201C{name}\u201D?",Seitenwechsel:"Page change",Sekunden:"Seconds","Selbst ausw\xE4hlen":"Choose myself",Senkrecht:"Vertical",Sensor:"Sensor","Serifen-Uhr, warmes Wei\xDF, Bambus":"Serif clock, warm white, bamboo",Sichtbarkeit:"Visibility","Skript starten":"Run script","So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist.":"How long the display stays after the trigger is off again.",Sonnig:"Sunny",sonnig:"sunny",Spalte:"Column",Spalten:"Columns",Speichern:"Save","Speichert \u2026":"Saving \u2026",Sprache:"Language",Standard:"Default",Standbild:"Still image","Standbild neu laden (s)":"Reload still image (s)",StandBy:"StandBy","StandBy-Stil, schlicht, Salbei":"StandBy style, plain, sage",Standort:"Location",Starkregen:"Heavy rain","startet immer wieder neu":"keeps restarting","Startkonfiguration anzeigen":"Show starter configuration",Status:"Status","Steht drau\xDFen":"Out","Steht zuhause":"Parked at home",Stil:"Style","Stil als YAML in die Zwischenablage kopiert.":"Style copied to the clipboard as YAML.","Stil unten als YAML \u2013 zum Kopieren markieren.":"Style below as YAML \u2013 select it to copy.","Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Style applied \u2013 make it permanent with \u201CSave\u201D.","Stil-Farbe":"Style colour","Stil-Schrift":"Style font",Strompreis:"Electricity price","Strompreis heute":"Electricity price today","Stufe hinzuf\xFCgen":"Add step",Stunde:"Hour",Stunden:"Hours","Stunden-Kurve":"Hourly curve",St\u00E4rke:"Strength",St\u00F6rung:"Error","Szene aktivieren":"Activate scene",Tag:"Day",Tage:"Days","Tage bis Abholung":"Days until collection","Tage voraus":"Days ahead","Tage-Sensor":"Days sensor",Tagesbilanz:"Daily summary",tagesschau:"tagesschau","tagesschau oder https://\u2026":"tagesschau or https://\u2026","tagesschau, ntv, spiegel \u2013 oder die Adresse eines RSS-Feeds":"tagesschau, ntv, spiegel \u2013 or the address of an RSS feed",Teil:"Part",Teile:"Parts","Teils bew\xF6lkt":"Partly cloudy",Temperatur:"Temperature",Temperaturen:"Temperatures",Tempo:"Speed","Tempo (px/s)":"Speed (px/s)",Termin:"Appointment","Termin in den n\xE4chsten Tagen":"Appointment in the next days",Termine:"Appointments",Testen:"Test",teuer:"expensive",Text:"Text","Text & Vorlage":"Text & template","Text aus Entit\xE4t":"Text from entity","Text danach":"Text afterwards","Text ohne Warnung":"Text without warning","Text wenn alles ruhig":"Text when all is quiet","Text wenn nichts l\xE4uft":"Text when nothing is running",Textgr\u00F6\u00DFe:"Text size","Tibber-Zuhause":"Tibber home","Tipp: Ein Widget anklicken, um es zu bearbeiten.":"Tip: click a widget to edit it.","Tippen zum Schlie\xDFen":"Tap to close",Titel:"Title","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)":"Todtnau in the Black Forest \u2013 village and Hasenhorn (image)",Ton:"Sound",Tonne:"Bin",Tonnen:"Bins","Tonnen der n\xE4chsten \u2026 Tage":"Bins of the next \u2026 days",Trocken:"Dry",trocken:"dry","Trocken ab etwa {h} Uhr":"Dry from about {h}:00",Uhr:"Clock","Uhrzeit von \u2013 bis":"Time from \u2013 to","Uhrzeit {from}\u2013{to}":"Time {from}\u2013{to}","Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.":"Times separated by commas; each is one request to the AI.",Umwelt:"Environment",und:"and",ungesund:"unhealthy",unten:"bottom",unter:"below",Unterwegs:"Away",Unterzeile:"Subline",Unwetter:"Severe weather","UV-Index":"UV index",Verbrauch:"Consumption",Verlauf:"History","Verlauf (Tage)":"History (days)","Verlauf nicht verf\xFCgbar":"History not available","Verlauf wird geladen \u2026":"Loading history \u2026",Verriegelt:"Locked",Verschl\u00FCsselung:"Encryption","Verstecktes Netz":"Hidden network",Verwerfen:"Discard","Voll um":"Full at","voll um {time}":"full at {time}",Vollbild:"Fullscreen","Vollbild (Klingel, Alarm)":"Fullscreen (doorbell, alarm)","von Zustand":"from state","von {n} geschlossen":"of {n} closed","vor {n} h":"{n} h ago","vor {n} min":"{n} min ago","Vorher nachfragen":"Ask first","Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.":"Previous version loaded \u2013 restore it with \u201CApply to editor\u201D and \u201CSave\u201D.","Vorherige Fassung laden":"Load previous version",Vorlage:"Template","Vorlage (Jinja)":"Template (Jinja)","Vorlage l\xF6schen":"Delete template","Vorlage nicht verf\xFCgbar":"Template not available","Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.":"Template \u201C{name}\u201D saved \u2013 under \u201CYour templates\u201D.","Vorlage \u201E{name}\u201C l\xF6schen?":"Delete template \u201C{name}\u201D?",Vorschau:"Preview","Vorschau (schnell)":"Preview (fast)",Waagerecht:"Horizontal","Ambiframe ist nicht erreichbar: {error}":"Ambiframe is not reachable: {error}","Ambiframe nicht erreichbar":"Ambiframe not reachable","Ambiframe \xB7 Notfallmodus":"Ambiframe \xB7 safe mode","Wann?":"When?","Warm \xFCber \xB0C":"Warm above \xB0C","Warn-Sensoren":"Warning sensors",Warnung:"Warning","Warnung (rot)":"Warning (red)","Warnung \u2192 Vollbild":"Warning \u2192 fullscreen",Warnungen:"Warnings","Waschmaschine fertig":"Washing machine done",Webcam:"Webcam","Webcam hinzuf\xFCgen":"Add webcam","Webcam-Link":"Webcam link","Wechsel nach (s)":"Change after (s)","Weich (Unsch\xE4rfe)":"Soft (blur)","Weiter geht's":"Resuming","Weitere Ausl\xF6ser":"More triggers","Weitere Werte":"More values","Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein":"White and gold \u2013 dark on black, light on ivory","Welches Display ist das?":"Which display is this?","Wendelstein Ost (Bild, alle 10 min)":"Wendelstein east (image, every 10 min)","Wenn Ordner und Album leer sind":"If folder and album are empty",Wert:"Value","Wert wird blau, wenn er darunter liegt.":"Value turns blue when below.","Werte-Liste":"Value list",Wetter:"Weather","Wetter-Entit\xE4t fehlt":"Weather entity missing","Widget hinzuf\xFCgen:":"Add widget:","Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"Widget copied \u2013 paste it on a page with \u2318V or \u201CPaste\u201D.","Widget kopiert.":"Widget copied.","wie der Stil":"like the style","wie Design":"like design","Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien":"Like a magazine: large serifs, paper, fine lines","wie oben":"as above","wie Stil":"like style",Wiedergabe:"Playback","Wiedergabe anhalten/fortsetzen":"Pause/resume playback","Wiedergabe/Pause":"Play/pause",Wiedergabeliste:"Playlist","Wiederholen (\u21E7\u2318Z)":"Redo (\u21E7\u2318Z)",Wind:"Wind",Windig:"Windy","Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C.":"Pressed when the display stops reporting \u2013 e.g. Fully \u201CLoad start URL\u201D.","Wird geladen \u2026":"Loading \u2026","Wird heute abgeholt":"Collected today","WLAN-QR-Code":"Wi-Fi QR code","WPA/WPA2/WPA3":"WPA/WPA2/WPA3","W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel":"Show again during playback; empty or 0 = only on song change","W\xE4sche fertig":"Laundry done","YAML ist nicht lesbar: {error}":"YAML cannot be read: {error}","z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck":"e.g. litter box visits, resets daily","z. B. KI-Analyse der Kamera":"e.g. AI analysis of the camera","z. B. KI-Beschreibung oder Warn-\xDCberschrift":"e.g. AI description or warning headline","z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt":"e.g. several motion sensors \u2013 one is enough","z. B. type: entities, entities: [light.kueche]":"e.g. type: entities, entities: [light.kitchen]","Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst.":"E.g. time 05:00\u201311:00 for a morning page. The page\u2019s own condition applies as well.","z. B. \u201EGeocoded Location\u201C der Companion-App":"e.g. \u201CGeocoded Location\u201D of the companion app","Zahl \xFCber/unter":"Number above/below",Zeile:"Row",Zeilen:"Rows","Zeitraum (min)":"Period (min)","Zeitraum (Stunden)":"Period (hours)","Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.":"Dragging or arrow keys move all of them together. \u21E7/\u2318-click removes one, Esc clears the selection.","Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig":"Drag to move \xB7 dot bottom right to resize \xB7 arrow keys move, with \u21E7 resize \xB7 \u21E7/\u2318-click selects several \xB7 \u2318C/\u2318V copy and paste \xB7 \u232B deletes \xB7 \u2318D duplicates \xB7 \u2318Z undo","Ziel-Entit\xE4t":"Target entity",Zoom:"Zoom",zu:"closed","zu feucht":"too humid","zu Zustand":"to state","zu Zustand (optional)":"to state (optional)","Zugspitze (Bild, alle 10 min)":"Zugspitze (image, every 10 min)",Zuhause:"Home","Zuletzt fertig {when}":"Last finished {when}","zuletzt {time}":"last {time}","Zur\xFCck nach (s)":"Return after (s)","Zur\xFCck zu Ambiframe":"Back to Ambiframe",Zusammenfassung:"Summary",Zusatzwert:"Extra value","Zusatzwert Name":"Extra value name",Zustand:"State","Zustand ist":"State is","Zustand ist nicht":"State is not","Zwischendurch alle (min)":"In between every (min)",z\u00E4hlen:"count","Z\xE4hler \u201Eheute\u201C":"\u201CToday\u201D counter","{day} Abend":"{day} evening","{entity} ge\xE4ndert ({n} min)":"{entity} changed ({n} min)","{entity} in {n} Tagen":"{entity} in {n} days","{h} Uhr":"{h}:00","{name} l\xE4uft":"{name} running","{name} offen":"{name} open","{name} \u2013 wirklich?":"{name} \u2013 really?","{n} % aus eigener Sonne":"{n} % from own solar","{n} % Wahrscheinlichkeit":"{n} % probability","{n} Lichter an":"{n} lights on","{n} Widgets":"{n} widgets","{n} Widgets ausgew\xE4hlt":"{n} widgets selected","{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.":"{n} widgets copied \u2013 paste them on a page with \u2318V or \u201CPaste\u201D.","{n} Widgets kopiert.":"{n} widgets copied.","{time} Uhr":"{time}","\xE4ltere Version":"older version","\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld":"Public camera instead of HA camera \u2013 suggestions by clicking into the field",\u00D6ffnen:"Open","\xD8 {n} pro Tag":"\xD8 {n} per day",\u00FCber:"above",\u00DCberblenden:"Crossfade",\u00DCberblick:"Overview",\u00DCbergang:"Transition","\xDCbergang (s)":"Transition (s)",\u00FCbermorgen:"day after tomorrow",\u00DCbernehmen:"Apply","\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.":"Applied \u2013 make it permanent with \u201CSave\u201D.",\u00DCberschrift:"Heading","\xDCberschrift klein":"Small heading","\u2013 w\xE4hlen \u2013":"\u2013 choose \u2013","\u2026 aus Attribut":"\u2026 from attribute","\u2026 oder Bild einer Entit\xE4t":"\u2026 or picture of an entity","\u2026 oder Webcam-Link":"\u2026 or webcam link"};var Zi="de",Qi=()=>Zi,Pt=(t,i)=>t==="de"||t==="en"?t:(i||(typeof navigator<"u"?navigator.language:"")||"de").toLowerCase().startsWith("de")?"de":"en",Ot=t=>{Zi=t},te=()=>Zi==="de"?"de-DE":"en-GB",d=(t,i)=>{let e=Zi==="en"?Zs[t]??t:t;return i?e.replace(/\{(\w+)\}/g,(n,a)=>String(i[a]??"")):e};var Ji=globalThis,Xi=Ji.ShadowRoot&&(Ji.ShadyCSS===void 0||Ji.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ba=Symbol(),Qs=new WeakMap,li=class{constructor(i,e,n){if(this._$cssResult$=!0,n!==ba)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Xi&&i===void 0){let n=e!==void 0&&e.length===1;n&&(i=Qs.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),n&&Qs.set(e,i))}return i}toString(){return this.cssText}},di=t=>new li(typeof t=="string"?t:t+"",void 0,ba),O=(t,...i)=>{let e=t.length===1?t[0]:i.reduce((n,a,s)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[s+1],t[0]);return new li(e,t,ba)},Js=(t,i)=>{if(Xi)t.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let n=document.createElement("style"),a=Ji.litNonce;a!==void 0&&n.setAttribute("nonce",a),n.textContent=e.cssText,t.appendChild(n)}},va=Xi?t=>t:t=>t instanceof CSSStyleSheet?(i=>{let e="";for(let n of i.cssRules)e+=n.cssText;return di(e)})(t):t;var{is:td,defineProperty:id,getOwnPropertyDescriptor:nd,getOwnPropertyNames:ad,getOwnPropertySymbols:sd,getPrototypeOf:rd}=Object,en=globalThis,Xs=en.trustedTypes,od=Xs?Xs.emptyScript:"",ld=en.reactiveElementPolyfillSupport,ci=(t,i)=>t,ya={toAttribute(t,i){switch(i){case Boolean:t=t?od:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=t!==null;break;case Number:e=t===null?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch{e=null}}return e}},tr=(t,i)=>!td(t,i),er={attribute:!0,type:String,converter:ya,reflect:!1,useDefault:!1,hasChanged:tr};Symbol.metadata??=Symbol("metadata"),en.litPropertyMetadata??=new WeakMap;var Je=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=er){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let n=Symbol(),a=this.getPropertyDescriptor(i,n,e);a!==void 0&&id(this.prototype,i,a)}}static getPropertyDescriptor(i,e,n){let{get:a,set:s}=nd(this.prototype,i)??{get(){return this[e]},set(r){this[e]=r}};return{get:a,set(r){let o=a?.call(this);s?.call(this,r),this.requestUpdate(i,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??er}static _$Ei(){if(this.hasOwnProperty(ci("elementProperties")))return;let i=rd(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(ci("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ci("properties"))){let e=this.properties,n=[...ad(e),...sd(e)];for(let a of n)this.createProperty(a,e[a])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[n,a]of e)this.elementProperties.set(n,a)}this._$Eh=new Map;for(let[e,n]of this.elementProperties){let a=this._$Eu(e,n);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let n=new Set(i.flat(1/0).reverse());for(let a of n)e.unshift(va(a))}else i!==void 0&&e.push(va(i));return e}static _$Eu(i,e){let n=e.attribute;return n===!1?void 0:typeof n=="string"?n:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let n of e.keys())this.hasOwnProperty(n)&&(i.set(n,this[n]),delete this[n]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Js(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,n){this._$AK(i,n)}_$ET(i,e){let n=this.constructor.elementProperties.get(i),a=this.constructor._$Eu(i,n);if(a!==void 0&&n.reflect===!0){let s=(n.converter?.toAttribute!==void 0?n.converter:ya).toAttribute(e,n.type);this._$Em=i,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(i,e){let n=this.constructor,a=n._$Eh.get(i);if(a!==void 0&&this._$Em!==a){let s=n.getPropertyOptions(a),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ya;this._$Em=a;let o=r.fromAttribute(e,s.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(i,e,n,a=!1,s){if(i!==void 0){let r=this.constructor;if(a===!1&&(s=this[i]),n??=r.getPropertyOptions(i),!((n.hasChanged??tr)(s,e)||n.useDefault&&n.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(r._$Eu(i,n))))return;this.C(i,e,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:n,reflect:a,wrapped:s},r){n&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,r??e??this[i]),s!==!0||r!==void 0)||(this._$AL.has(i)||(this.hasUpdated||n||(e=void 0),this._$AL.set(i,e)),a===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[a,s]of n){let{wrapped:r}=s,o=this[a];r!==!0||this._$AL.has(a)||o===void 0||this.C(a,void 0,s,o)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(e)):this._$EM()}catch(n){throw i=!1,this._$EM(),n}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(i){}firstUpdated(i){}};Je.elementStyles=[],Je.shadowRootOptions={mode:"open"},Je[ci("elementProperties")]=new Map,Je[ci("finalized")]=new Map,ld?.({ReactiveElement:Je}),(en.reactiveElementVersions??=[]).push("2.1.2");var xa=globalThis,ir=t=>t,tn=xa.trustedTypes,nr=tn?tn.createPolicy("lit-html",{createHTML:t=>t}):void 0,ka="$lit$",Xe=`lit$${Math.random().toFixed(9).slice(2)}$`,$a="?"+Xe,dd=`<${$a}>`,yt=document,hi=()=>yt.createComment(""),ui=t=>t===null||typeof t!="object"&&typeof t!="function",Sa=Array.isArray,dr=t=>Sa(t)||typeof t?.[Symbol.iterator]=="function",wa=`[ 	
\f\r]`,pi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ar=/-->/g,sr=/>/g,bt=RegExp(`>|${wa}(?:([^\\s"'>=/]+)(${wa}*=${wa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rr=/'/g,or=/"/g,cr=/^(?:script|style|textarea|title)$/i,Ta=t=>(i,...e)=>({_$litType$:t,strings:i,values:e}),p=Ta(1),$e=Ta(2),pr=Ta(3),Ue=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),lr=new WeakMap,vt=yt.createTreeWalker(yt,129);function hr(t,i){if(!Sa(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return nr!==void 0?nr.createHTML(i):i}var ur=(t,i)=>{let e=t.length-1,n=[],a,s=i===2?"<svg>":i===3?"<math>":"",r=pi;for(let o=0;o<e;o++){let l=t[o],c,h,u=-1,f=0;for(;f<l.length&&(r.lastIndex=f,h=r.exec(l),h!==null);)f=r.lastIndex,r===pi?h[1]==="!--"?r=ar:h[1]!==void 0?r=sr:h[2]!==void 0?(cr.test(h[2])&&(a=RegExp("</"+h[2],"g")),r=bt):h[3]!==void 0&&(r=bt):r===bt?h[0]===">"?(r=a??pi,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,c=h[1],r=h[3]===void 0?bt:h[3]==='"'?or:rr):r===or||r===rr?r=bt:r===ar||r===sr?r=pi:(r=bt,a=void 0);let b=r===bt&&t[o+1].startsWith("/>")?" ":"";s+=r===pi?l+dd:u>=0?(n.push(c),l.slice(0,u)+ka+l.slice(u)+Xe+b):l+Xe+(u===-2?o:b)}return[hr(t,s+(t[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),n]},mi=class t{constructor({strings:i,_$litType$:e},n){let a;this.parts=[];let s=0,r=0,o=i.length-1,l=this.parts,[c,h]=ur(i,e);if(this.el=t.createElement(c,n),vt.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=vt.nextNode())!==null&&l.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(ka)){let f=h[r++],b=a.getAttribute(u).split(Xe),g=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:g[2],strings:b,ctor:g[1]==="."?an:g[1]==="?"?sn:g[1]==="@"?rn:xt}),a.removeAttribute(u)}else u.startsWith(Xe)&&(l.push({type:6,index:s}),a.removeAttribute(u));if(cr.test(a.tagName)){let u=a.textContent.split(Xe),f=u.length-1;if(f>0){a.textContent=tn?tn.emptyScript:"";for(let b=0;b<f;b++)a.append(u[b],hi()),vt.nextNode(),l.push({type:2,index:++s});a.append(u[f],hi())}}}else if(a.nodeType===8)if(a.data===$a)l.push({type:2,index:s});else{let u=-1;for(;(u=a.data.indexOf(Xe,u+1))!==-1;)l.push({type:7,index:s}),u+=Xe.length-1}s++}}static createElement(i,e){let n=yt.createElement("template");return n.innerHTML=i,n}};function wt(t,i,e=t,n){if(i===Ue)return i;let a=n!==void 0?e._$Co?.[n]:e._$Cl,s=ui(i)?void 0:i._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(t),a._$AT(t,e,n)),n!==void 0?(e._$Co??=[])[n]=a:e._$Cl=a),a!==void 0&&(i=wt(t,a._$AS(t,i.values),a,n)),i}var nn=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:n}=this._$AD,a=(i?.creationScope??yt).importNode(e,!0);vt.currentNode=a;let s=vt.nextNode(),r=0,o=0,l=n[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new Ft(s,s.nextSibling,this,i):l.type===1?c=new l.ctor(s,l.name,l.strings,this,i):l.type===6&&(c=new on(s,this,i)),this._$AV.push(c),l=n[++o]}r!==l?.index&&(s=vt.nextNode(),r++)}return vt.currentNode=yt,a}p(i){let e=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(i,n,e),e+=n.strings.length-2):n._$AI(i[e])),e++}},Ft=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,n,a){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=n,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=wt(this,i,e),ui(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==Ue&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):dr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&ui(this._$AH)?this._$AA.nextSibling.data=i:this.T(yt.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:n}=i,a=typeof n=="number"?this._$AC(i):(n.el===void 0&&(n.el=mi.createElement(hr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===a)this._$AH.p(e);else{let s=new nn(a,this),r=s.u(this.options);s.p(e),this.T(r),this._$AH=s}}_$AC(i){let e=lr.get(i.strings);return e===void 0&&lr.set(i.strings,e=new mi(i)),e}k(i){Sa(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,n,a=0;for(let s of i)a===e.length?e.push(n=new t(this.O(hi()),this.O(hi()),this,this.options)):n=e[a],n._$AI(s),a++;a<e.length&&(this._$AR(n&&n._$AB.nextSibling,a),e.length=a)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let n=ir(i).nextSibling;ir(i).remove(),i=n}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},xt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,n,a,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=a,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=m}_$AI(i,e=this,n,a){let s=this.strings,r=!1;if(s===void 0)i=wt(this,i,e,0),r=!ui(i)||i!==this._$AH&&i!==Ue,r&&(this._$AH=i);else{let o=i,l,c;for(i=s[0],l=0;l<s.length-1;l++)c=wt(this,o[n+l],e,l),c===Ue&&(c=this._$AH[l]),r||=!ui(c)||c!==this._$AH[l],c===m?i=m:i!==m&&(i+=(c??"")+s[l+1]),this._$AH[l]=c}r&&!a&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},an=class extends xt{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},sn=class extends xt{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},rn=class extends xt{constructor(i,e,n,a,s){super(i,e,n,a,s),this.type=5}_$AI(i,e=this){if((i=wt(this,i,e,0)??m)===Ue)return;let n=this._$AH,a=i===m&&n!==m||i.capture!==n.capture||i.once!==n.once||i.passive!==n.passive,s=i!==m&&(n===m||a);a&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},on=class{constructor(i,e,n){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(i){wt(this,i)}},mr={M:ka,P:Xe,A:$a,C:1,L:ur,R:nn,D:dr,V:wt,I:Ft,H:xt,N:sn,U:rn,B:an,F:on},cd=xa.litHtmlPolyfillSupport;cd?.(mi,Ft),(xa.litHtmlVersions??=[]).push("3.3.3");var fr=(t,i,e)=>{let n=e?.renderBefore??i,a=n._$litPart$;if(a===void 0){let s=e?.renderBefore??null;n._$litPart$=a=new Ft(i.insertBefore(hi(),s),s,void 0,e??{})}return a._$AI(t),a};var Aa=globalThis,se=class extends Je{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=fr(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ue}};se._$litElement$=!0,se.finalized=!0,Aa.litElementHydrateSupport?.({LitElement:se});var pd=Aa.litElementPolyfillSupport;pd?.({LitElement:se});(Aa.litElementVersions??=[]).push("4.2.2");var ln={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ot=t=>(...i)=>({_$litDirective$:t,values:i}),rt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,n){this._$Ct=i,this._$AM=e,this._$Ci=n}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var kt=class extends rt{constructor(i){if(super(i),this.it=m,i.type!==ln.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(i){if(i===m||i==null)return this._t=void 0,this.it=i;if(i===Ue)return i;if(typeof i!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(i===this.it)return this._t;this.it=i;let e=[i];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};kt.directiveName="unsafeHTML",kt.resultType=1;var dm=ot(kt);var fi=class extends kt{};fi.directiveName="unsafeSVG",fi.resultType=2;var Bt=ot(fi);var hd="M7.2 18.5h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 18.5z",dn="M7.2 14.8h9.6a3.9 3.9 0 0 0 .5-7.77 5.3 5.3 0 0 0-10.2 1.37A3.2 3.2 0 0 0 7.2 14.8z",gr='<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M4 7.5h16M7 5.3h.01M9.5 5.3h.01"/><circle cx="12" cy="14" r="4.2"/>',gi={sun:'<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5"/>',moon:'<path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z"/>',cloud:`<path d="${hd}"/>`,partly:'<path d="M8 3.2v1.3M3.2 8h1.3M4.6 4.6l.9.9M11.4 4.6l-.9.9M5.4 10.6A3 3 0 1 1 10.9 6.9"/><path d="M9.2 19.5h8.3a3.4 3.4 0 0 0 .4-6.78 4.6 4.6 0 0 0-8.9 1.2 2.8 2.8 0 0 0 .2 5.58z"/>',rain:`<path d="${dn}"/><path d="M8.6 17.6l-1 2.4M12.6 17.6l-1 2.4M16.6 17.6l-1 2.4"/>`,pour:`<path d="${dn}"/><path d="M8.2 17.4l-1.4 3.4M11.4 17.4l-1.4 3.4M14.6 17.4l-1.4 3.4M17.8 17.4l-1.4 3.4"/>`,snow:`<path d="${dn}"/><path d="M8.5 18.2h.01M12 19.8h.01M15.5 18.2h.01M10.2 21.4h.01M13.8 21.4h.01" stroke-width="2.2"/>`,fog:'<path d="M4 8.5h16M6.5 12.5h11M4 16.5h16"/>',bolt:`<path d="${dn}"/><path d="M12.8 15.6l-2.2 3.3h3l-2.2 3.3"/>`,wind:'<path d="M3 8.5h10.5A2.5 2.5 0 1 0 11 6M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5M3 16.5h7"/>',washer:gr,dryer:gr+'<path d="M9.6 14.4c.8-.9 1.6-.9 2.4 0s1.6.9 2.4 0"/>',bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z"/><path d="M10 20.5a2.1 2.1 0 0 0 4 0"/>',window:'<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 3v18M5 12h14"/>',door:'<path d="M6 21V3.5h12V21M4 21h16"/><path d="M14.5 12.5h.01" stroke-width="2.2"/>',bulb:'<path d="M9.5 17.5h5M10.3 20.5h3.4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z"/>',bin:'<path d="M4.5 6.5h15M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14M10 10.5v6M14 10.5v6"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.7"/>',cam:'<path d="M3.5 7.5h3l1.8-2.5h7.4l1.8 2.5h3v12h-17z"/><circle cx="12" cy="13" r="3.6"/>',thermo:'<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>',drop:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',plug:'<path d="M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0zM12 16.5V21"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',back:'<path d="M15 6l-6 6 6 6"/>',forward:'<path d="M9 6l6 6-6 6"/>',shutter:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7.5h16M4 11h16M4 14.5h16M4 18h16"/>',shutter_open:'<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><path d="M4 7h16"/>',awning:'<path d="M3 5h18"/><path d="M4.5 5v2.5h15V5"/>',awning_out:'<path d="M3 4.5h18l-2.5 8h-13z"/><path d="M5.5 12.5q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0q1.6 2 3.25 0"/>',pause:'<path d="M9 5.5v13M15 5.5v13"/>',play:'<path d="M8 5.5l11 6.5-11 6.5z"/>',mute:'<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',speaker:'<path d="M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5z"/><path d="M16 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',reload:'<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',tablet:'<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M11 18h2"/>',watch:'<rect x="7" y="6.5" width="10" height="11" rx="2.6"/><path d="M9 6.5l.6-3.5h4.8l.6 3.5M9 17.5l.6 3.5h4.8l.6-3.5"/>',battery:'<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3"/><path d="M6 10.5v3" stroke-width="2.2"/>',car:'<path d="M4 15.5V12l1.8-4.2A2 2 0 0 1 7.6 6.5h8.8a2 2 0 0 1 1.8 1.3L20 12v3.5"/><path d="M3 15.5h18v2.3a.7.7 0 0 1-.7.7H18.6M5.4 18.5H3.7a.7.7 0 0 1-.7-.7v-2.3"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/><path d="M4.6 11.8h14.8"/>',robot:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.6 8.6a6.8 6.8 0 0 1 10.8 0"/>',person:'<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6"/>',home:'<path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',solar:'<path d="M3.5 18l2-8h13l2 8z"/><path d="M4.6 14h14.8M9.2 10l-.9 8M14.8 10l.9 8"/><path d="M12 2.8v2.4M7.4 4.3l1.1 1.6M16.6 4.3l-1.1 1.6"/>',charge:'<path d="M13 3L6 13.5h5L10 21l7-10.5h-5z"/>',leaf:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z"/><path d="M5 19c3-4 6-6.5 9-8"/>',warning:'<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.3h.01"/>',pin:'<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',euro:'<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.6a4 4 0 1 0 0 6.8M7.5 11h6M7.5 13.2h6"/>',motion:'<path d="M12 12h.01" stroke-width="2.4"/><path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',unlock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 7.7-1.5"/>',gauge:'<path d="M4.5 17a8 8 0 1 1 15 0"/><path d="M12 13l3.5-4"/>',leak:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',music:'<path d="M9 17.5V5.5l10-2v12"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/><path d="M9 9.5l10-2"/>',page:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9h17M9 9v10.5"/>',tv:'<rect x="2.5" y="4.5" width="19" height="12.5" rx="1.8"/><path d="M8.5 20.5h7M12 17v3.5"/>',sparkle:'<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',cat:'<path d="M5 9.5V4l4 3h6l4-3v5.5c0 5-3.1 9.5-7 9.5s-7-4.5-7-9.5z"/><path d="M9.5 12h.01M14.5 12h.01" stroke-width="2.2"/><path d="M10.8 15c.7.5 1.7.5 2.4 0"/>',printer:'<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M4 8h16M8 13.5h8M10 16.5h4M12 8v3.5"/>',wifi:'<path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0"/><path d="M12 19.5h.01" stroke-width="2.4"/>'},ie=(t,i="")=>$e`<svg class="ic ${i}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Bt(gi[t??""]??gi.info)}</svg>`,Ea={sunny:["sun","Sonnig"],"clear-night":["moon","Klar"],partlycloudy:["partly","Teils bew\xF6lkt"],cloudy:["cloud","Bew\xF6lkt"],rainy:["rain","Regen"],pouring:["pour","Starkregen"],snowy:["snow","Schnee"],"snowy-rainy":["snow","Schneeregen"],hail:["snow","Hagel"],fog:["fog","Nebel"],lightning:["bolt","Gewitter"],"lightning-rainy":["bolt","Gewitter"],windy:["wind","Windig"],"windy-variant":["wind","Windig"],exceptional:["bolt","Unwetter"]},Le=t=>Ea[t??""]?.[0]??"cloud",je=t=>Ea[t??""]?d(Ea[t??""][1]):t??"\u2013",Rt={"mdi:washing-machine":"washer","mdi:tumble-dryer":"dryer","mdi:bell":"bell","mdi:doorbell":"bell","mdi:window-open":"window","mdi:door-open":"door","mdi:lightbulb":"bulb","mdi:trash-can":"bin","mdi:thermometer":"thermo","mdi:water-percent":"drop","mdi:calendar":"calendar","mdi:cctv":"cam","mdi:car":"car","mdi:car-electric":"car","mdi:robot-vacuum":"robot","mdi:account":"person","mdi:home":"home","mdi:solar-power":"solar","mdi:solar-panel":"solar","mdi:lightning-bolt":"charge","mdi:flash":"charge","mdi:leaf":"leaf","mdi:alert":"warning","mdi:map-marker":"pin","mdi:currency-eur":"euro","mdi:motion-sensor":"motion","mdi:lock":"lock","mdi:lock-open":"unlock","mdi:water-alert":"leak","mdi:weather-sunny":"sun","mdi:weather-rainy":"rain","mdi:air-filter":"leaf","mdi:brightness-5":"sun","mdi:music":"music","mdi:cat":"cat","mdi:printer-3d":"printer","mdi:wifi":"wifi","mdi:music-note":"music","mdi:speaker":"music"},G=(t,i="")=>t?gi[t]?ie(t,i):Rt[t]?ie(Rt[t],i):t.includes(":")&&customElements.get("ha-icon")?p`<ha-icon class="ic ${i}" icon=${t} style="--mdc-icon-size:1em;width:1em;height:1em;display:inline-flex"></ha-icon>`:ie(void 0,i):ie(void 0,i);var ud=/(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`|\[mdi:[a-z0-9-]+\])/g,Ht=t=>t.split(ud).filter(i=>i!=="").map(i=>/^(\*\*|__).+\1$/.test(i)?p`<strong>${i.slice(2,-2)}</strong>`:/^`.+`$/.test(i)?p`<code>${i.slice(1,-1)}</code>`:/^\[mdi:[a-z0-9-]+\]$/.test(i)?G(i.slice(1,-1),"md-ic"):/^([*_]).+\1$/.test(i)?p`<em>${i.slice(1,-1)}</em>`:i),br=t=>{let i=[],e=()=>i[i.length-1];for(let n of t.replace(/\r/g,"").split(`
`)){let a=n.trimEnd(),s;if(!a.trim())i.push({kind:"p",lines:[]});else if(s=a.match(/^(#{1,3})\s+(.*)$/))i.push({kind:"h",level:s[1].length,text:s[2]});else if(/^\s*(---+|\*\*\*+)\s*$/.test(a))i.push({kind:"hr"});else if(s=a.match(/^\s*[-*•]\s+(.*)$/)){let r=e();r?.kind==="ul"?r.items.push(s[1]):i.push({kind:"ul",items:[s[1]]})}else if(s=a.match(/^\s*\d+[.)]\s+(.*)$/)){let r=e();r?.kind==="ol"?r.items.push(s[1]):i.push({kind:"ol",items:[s[1]]})}else{let r=e();r?.kind==="p"?r.lines.push(a):i.push({kind:"p",lines:[a]})}}return p`<div class="md">
    ${i.map(n=>{switch(n.kind){case"h":return n.level===1?p`<h1 class="display">${Ht(n.text)}</h1>`:n.level===2?p`<h2 class="display">${Ht(n.text)}</h2>`:p`<h3>${Ht(n.text)}</h3>`;case"hr":return p`<hr />`;case"ul":return p`<ul>
            ${n.items.map(a=>p`<li>${Ht(a)}</li>`)}
          </ul>`;case"ol":return p`<ol>
            ${n.items.map(a=>p`<li>${Ht(a)}</li>`)}
          </ol>`;default:return n.lines.length?p`<p>${n.lines.map((a,s)=>p`${s?p`<br />`:m}${Ht(a)}`)}</p>`:m}})}
  </div>`},vr=O`
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
`;var md=Be("fraunces"),_a=Be("inter"),lt={bg:"#0a0d0b","bg-art":"none",ink:"#ede7db","ink-2":"rgba(237, 231, 219, 0.66)","ink-3":"rgba(237, 231, 219, 0.4)",line:"rgba(237, 231, 219, 0.1)",surface:"rgba(237, 231, 219, 0.045)",accent:"#d6a865","accent-soft":"rgba(214, 168, 101, 0.14)",cold:"#9dbad6",alert:"#ef8b63",good:"#9cc5a1",panel:"rgba(18, 21, 19, 0.92)",chip:"rgba(10, 13, 11, 0.62)",shadow:"0 30px 80px rgba(0, 0, 0, 0.55)",veil:"rgba(6, 9, 7, 0.52)",colon:"inherit","colon-opacity":"0.55",mist:"rgba(255, 255, 255, 0.07)"},$t={bg:"#f2ede3","bg-art":"none",ink:"#1e1b16","ink-2":"rgba(30, 27, 22, 0.64)","ink-3":"rgba(30, 27, 22, 0.42)",line:"rgba(30, 27, 22, 0.11)",surface:"rgba(255, 255, 255, 0.55)",accent:"#9a7334","accent-soft":"rgba(154, 115, 52, 0.13)",cold:"#3d6a8f",alert:"#c0552f",good:"#4f8a5b",panel:"rgba(250, 247, 240, 0.95)",chip:"rgba(250, 247, 240, 0.8)",shadow:"0 30px 80px rgba(60, 45, 20, 0.16)",veil:"rgba(242, 237, 227, 0.55)",colon:"inherit","colon-opacity":"0.5",mist:"rgba(120, 100, 70, 0.07)"},dt={display:md,sans:_a,"clock-weight":"300","clock-track":"-0.02em"},yr={card:"transparent","card-border":"0 solid transparent","card-radius":"0","card-pad":"26px 0 0"},cn=(t,i,e)=>`radial-gradient(60% 70% at 12% 18%, ${t}, transparent 62%), radial-gradient(55% 65% at 88% 26%, ${i}, transparent 62%), radial-gradient(75% 70% at 58% 100%, ${e}, transparent 64%)`,La=[{id:"ruhig",name:"Ruhig",hint:"Serifen-Uhr, warmes Wei\xDF, Bambus",ambient:"none",shared:dt,dark:lt,light:$t},{id:"klar",name:"Klar",hint:"StandBy-Stil, schlicht, Salbei",ambient:"none",shared:{...dt,display:_a,"clock-weight":"200","clock-track":"-0.05em"},dark:{...lt,accent:"#a8cab5","accent-soft":"rgba(168, 202, 181, 0.14)"},light:{...$t,bg:"#f3f4f1",ink:"#141714","ink-2":"rgba(20, 23, 20, 0.64)","ink-3":"rgba(20, 23, 20, 0.42)",line:"rgba(20, 23, 20, 0.1)",surface:"rgba(255, 255, 255, 0.7)",accent:"#4f7d63","accent-soft":"rgba(79, 125, 99, 0.13)",panel:"rgba(250, 251, 249, 0.95)",chip:"rgba(250, 251, 249, 0.8)",shadow:"0 30px 80px rgba(20, 30, 20, 0.14)",veil:"rgba(243, 244, 241, 0.55)"}},{id:"gold",name:"Gold",hint:"Wei\xDF und Gold \u2013 dunkel auf Schwarz, hell auf Elfenbein",ambient:"none",shared:dt,dark:{...lt,bg:"#09090a",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.68)","ink-3":"rgba(255, 255, 255, 0.42)",line:"rgba(255, 255, 255, 0.1)",surface:"rgba(255, 255, 255, 0.045)",accent:"#d9b45f","accent-soft":"rgba(217, 180, 95, 0.15)",cold:"#a9c4dc",colon:"var(--af-accent)","colon-opacity":"1"},light:{...$t,bg:"#f6f3ec",ink:"#16130f","ink-2":"rgba(22, 19, 15, 0.64)","ink-3":"rgba(22, 19, 15, 0.42)",line:"rgba(22, 19, 15, 0.11)",surface:"rgba(255, 255, 255, 0.7)",accent:"#a8803a","accent-soft":"rgba(168, 128, 58, 0.13)",cold:"#3f6f9c",panel:"rgba(255, 255, 255, 0.94)",chip:"rgba(255, 255, 255, 0.78)",shadow:"0 30px 80px rgba(60, 45, 20, 0.18)",veil:"rgba(246, 243, 236, 0.55)",colon:"var(--af-accent)","colon-opacity":"1"}},{id:"glass",name:"Liquid Glass",hint:"Glasfl\xE4chen mit Lichtkante \xFCber weichen Farben",ambient:"flow",shared:{...dt,display:_a,"clock-weight":"300","clock-track":"-0.04em","card-radius":"34px"},dark:{...lt,bg:"#0b1020","bg-art":cn("rgba(90, 120, 255, 0.5)","rgba(255, 120, 175, 0.38)","rgba(60, 210, 195, 0.36)"),"flow-1":"rgba(90, 120, 255, 0.55)","flow-2":"rgba(255, 120, 175, 0.42)","flow-3":"rgba(60, 210, 195, 0.4)",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.74)","ink-3":"rgba(255, 255, 255, 0.5)",line:"rgba(255, 255, 255, 0.16)",surface:"rgba(255, 255, 255, 0.08)",accent:"#9fd4ff","accent-soft":"rgba(159, 212, 255, 0.16)",cold:"#a8c8ff",good:"#8fe3b0",alert:"#ff9f7a",card:"linear-gradient(140deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.05) 55%, rgba(255, 255, 255, 0.1))","card-border":"1px solid rgba(255, 255, 255, 0.24)","card-filter":"blur(24px) saturate(1.8)","card-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.08), 0 20px 50px rgba(0, 0, 30, 0.3)",panel:"rgba(28, 32, 58, 0.7)",chip:"rgba(255, 255, 255, 0.14)",veil:"rgba(10, 14, 30, 0.4)",shadow:"0 30px 80px rgba(0, 0, 30, 0.5)",mist:"rgba(255, 255, 255, 0.09)"},light:{...$t,bg:"#e9edf7","bg-art":cn("rgba(150, 140, 255, 0.5)","rgba(255, 175, 150, 0.5)","rgba(120, 215, 205, 0.45)"),"flow-1":"rgba(150, 140, 255, 0.55)","flow-2":"rgba(255, 175, 150, 0.55)","flow-3":"rgba(120, 215, 205, 0.5)",ink:"#0f1320","ink-2":"rgba(15, 19, 32, 0.66)","ink-3":"rgba(15, 19, 32, 0.44)",line:"rgba(15, 19, 32, 0.09)",surface:"rgba(255, 255, 255, 0.5)",accent:"#2f6fe0","accent-soft":"rgba(47, 111, 224, 0.12)",cold:"#2f6fe0",good:"#2f8a5b",alert:"#d0552f",card:"linear-gradient(140deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.4) 55%, rgba(255, 255, 255, 0.58))","card-border":"1px solid rgba(255, 255, 255, 0.85)","card-filter":"blur(24px) saturate(1.6)","card-shadow":"inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 18px 44px rgba(40, 50, 100, 0.14)",panel:"rgba(255, 255, 255, 0.75)",chip:"rgba(255, 255, 255, 0.62)",veil:"rgba(233, 237, 247, 0.45)",shadow:"0 30px 80px rgba(40, 50, 100, 0.18)",mist:"rgba(255, 255, 255, 0.55)"}},{id:"aurora",name:"Aurora",hint:"Ruhig flie\xDFende Farben wie Nordlicht",ambient:"flow",shared:{...dt,display:Be("outfit"),"clock-weight":"200","clock-track":"-0.03em"},dark:{...lt,bg:"#060a14","bg-art":cn("rgba(60, 220, 170, 0.36)","rgba(130, 90, 255, 0.36)","rgba(40, 120, 255, 0.3)"),"flow-1":"rgba(60, 220, 170, 0.42)","flow-2":"rgba(130, 90, 255, 0.4)","flow-3":"rgba(40, 120, 255, 0.34)",ink:"#eef3f7","ink-2":"rgba(238, 243, 247, 0.7)","ink-3":"rgba(238, 243, 247, 0.45)",line:"rgba(238, 243, 247, 0.12)",surface:"rgba(238, 243, 247, 0.06)",accent:"#7fe0c4","accent-soft":"rgba(127, 224, 196, 0.14)",cold:"#8fb8ff",card:"rgba(255, 255, 255, 0.06)","card-border":"1px solid rgba(255, 255, 255, 0.1)","card-filter":"blur(18px) saturate(1.4)",panel:"rgba(12, 18, 32, 0.85)",chip:"rgba(12, 18, 32, 0.6)",veil:"rgba(6, 10, 20, 0.5)"},light:{...$t,bg:"#f7f3ef","bg-art":cn("rgba(255, 185, 140, 0.5)","rgba(200, 165, 255, 0.45)","rgba(140, 225, 205, 0.42)"),"flow-1":"rgba(255, 185, 140, 0.55)","flow-2":"rgba(200, 165, 255, 0.5)","flow-3":"rgba(140, 225, 205, 0.45)",ink:"#1b1820","ink-2":"rgba(27, 24, 32, 0.64)","ink-3":"rgba(27, 24, 32, 0.42)",line:"rgba(27, 24, 32, 0.09)",surface:"rgba(255, 255, 255, 0.45)",accent:"#7457d6","accent-soft":"rgba(116, 87, 214, 0.12)",cold:"#4a7fd6",card:"rgba(255, 255, 255, 0.45)","card-border":"1px solid rgba(255, 255, 255, 0.75)","card-filter":"blur(18px) saturate(1.3)",panel:"rgba(255, 252, 249, 0.85)",chip:"rgba(255, 252, 249, 0.65)",veil:"rgba(247, 243, 239, 0.5)",mist:"rgba(255, 255, 255, 0.5)"}},{id:"editorial",name:"Editorial",hint:"Wie ein Magazin: gro\xDFe Serifen, Papier, feine Linien",ambient:"none",shared:{...dt,...yr,display:Be("instrument"),"clock-weight":"400","clock-track":"-0.01em","card-rule":"1.5px solid currentColor"},dark:{...lt,bg:"#141311",ink:"#ece5d8","ink-2":"rgba(236, 229, 216, 0.68)","ink-3":"rgba(236, 229, 216, 0.44)",line:"rgba(236, 229, 216, 0.16)",surface:"rgba(236, 229, 216, 0.05)",accent:"#e08d63","accent-soft":"rgba(224, 141, 99, 0.14)",panel:"rgba(24, 23, 20, 0.95)",chip:"rgba(20, 19, 17, 0.7)",veil:"rgba(10, 9, 8, 0.55)"},light:{...$t,bg:"#f3eee4",ink:"#1c1915","ink-2":"rgba(28, 25, 21, 0.7)","ink-3":"rgba(28, 25, 21, 0.48)",line:"rgba(28, 25, 21, 0.16)",surface:"rgba(28, 25, 21, 0.05)",accent:"#a8432a","accent-soft":"rgba(168, 67, 42, 0.1)",cold:"#2f5d8a",alert:"#b8401f",good:"#3f7a4b",panel:"rgba(246, 242, 234, 0.97)",chip:"rgba(246, 242, 234, 0.85)",veil:"rgba(243, 238, 228, 0.6)",shadow:"0 30px 80px rgba(40, 30, 20, 0.14)"}},{id:"minimal",name:"Minimal",hint:"Schweizer Stil: klare Schrift, hoher Kontrast, nur Typografie",ambient:"none",shared:{...dt,...yr,display:Be("geist"),sans:Be("geist"),"clock-weight":"400","clock-track":"-0.055em","card-rule":"1px solid color-mix(in srgb, currentColor 22%, transparent)"},dark:{...lt,bg:"#000000",ink:"#ffffff","ink-2":"rgba(255, 255, 255, 0.6)","ink-3":"rgba(255, 255, 255, 0.38)",line:"rgba(255, 255, 255, 0.14)",surface:"rgba(255, 255, 255, 0.06)",accent:"#ff5a36","accent-soft":"rgba(255, 90, 54, 0.14)",cold:"#7fb2ff",panel:"rgba(16, 16, 16, 0.96)",chip:"rgba(0, 0, 0, 0.7)",veil:"rgba(0, 0, 0, 0.55)",colon:"var(--af-accent)","colon-opacity":"1"},light:{...$t,bg:"#f6f6f4",ink:"#0b0b0b","ink-2":"rgba(11, 11, 11, 0.6)","ink-3":"rgba(11, 11, 11, 0.4)",line:"rgba(11, 11, 11, 0.12)",surface:"rgba(11, 11, 11, 0.05)",accent:"#e8401c","accent-soft":"rgba(232, 64, 28, 0.1)",cold:"#2f6fe0",panel:"rgba(250, 250, 248, 0.97)",chip:"rgba(250, 250, 248, 0.85)",veil:"rgba(246, 246, 244, 0.6)",shadow:"0 30px 80px rgba(0, 0, 0, 0.12)",colon:"var(--af-accent)","colon-opacity":"1"}}],ct=La.map(({id:t,name:i,hint:e,ambient:n})=>({id:t,name:i,hint:e,ambient:n})),wr=t=>t==="weissgold"?{theme:"gold",light:!0}:{theme:La.some(i=>i.id===t)?t:"ruhig",light:!1},Ca=t=>Object.entries(t).map(([i,e])=>`--af-${i}: ${e};`).join(`
    `),fd=La.map(t=>`
  :host([theme="${t.id}"]) {
    ${Ca({...t.shared,...t.dark})}
  }
  :host([theme="${t.id}"][mode="light"]) {
    ${Ca({...t.shared,...t.light})}
  }`).join(`
`),xr=[O`
    :host {
      --af-ease: cubic-bezier(0.22, 0.8, 0.24, 1);
      --af-ease-io: cubic-bezier(0.65, 0, 0.35, 1);
      --af-ease-soft: cubic-bezier(0.45, 0, 0.25, 1);
    }
  `,di(`:host { ${Ca({...dt,...lt})} }`),di(fd),O`
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
  `],kr=O`
  .onphoto {
    --af-ink: #ffffff;
    --af-ink-2: rgba(255, 255, 255, var(--af-c2, 0.78));
    --af-ink-3: rgba(255, 255, 255, var(--af-c3, 0.55));
    --af-line: rgba(255, 255, 255, 0.16);
    --af-surface: rgba(10, 10, 10, 0.28);
    --af-cold: #b8d0e6;
  }
`,$r=O`
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
`,U=O`
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
`,pt=O`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: var(--af-valign, flex-start);
    align-items: var(--af-align, flex-start);
    text-align: var(--af-text-align, left);
  }
`;var Sr=t=>typeof t=="string"&&(t.includes("{{")||t.includes("{%")),Wt=new Map,Tr=(t,i,e)=>{let n=Wt.get(i);if(!n){let s={listeners:new Set};n=s,Wt.set(i,s);let r=o=>{s.last=o,s.listeners.forEach(l=>l(o))};s.unsub=t.connection.subscribeMessage(o=>r(o.error!==void 0?{error:o.error}:{value:o.result}),{type:"ambiframe/template/subscribe",template:i}).catch(o=>{Wt.get(i)===s&&Wt.delete(i),r({error:o?.message??d("Vorlage nicht verf\xFCgbar")})})}let a=n;return clearTimeout(a.closeTimer),a.listeners.add(e),a.last&&e(a.last),()=>{a.listeners.delete(e),!a.listeners.size&&(a.closeTimer=window.setTimeout(()=>{a.listeners.size||Wt.get(i)!==a||(Wt.delete(i),a.unsub?.then(s=>s?.()))},3e3))}},Ar=t=>t==null?"":typeof t=="number"?t.toLocaleString(te(),{useGrouping:!1,maximumFractionDigits:10}):typeof t=="boolean"?t?d("ja"):d("nein"):Array.isArray(t)?t.map(Ar).join(", "):typeof t=="object"?JSON.stringify(t):String(t),gd=t=>{if(typeof t=="boolean")return t;if(typeof t=="number")return t!==0;let i=String(t??"").trim().toLowerCase();if(["true","on","yes","ja","home","open"].includes(i))return!0;let e=Number(i);return i!==""&&Number.isFinite(e)?e!==0:!1},St=class{constructor(i){this.host=i;i.addController(this)}set(i,e){if(!i||!Sr(e)){this.key&&this.clear();return}e!==this.key&&(this.clear(),this.key=e,this.stop=Tr(i,e,n=>{this.result=n,this.host.requestUpdate()}))}text(i){if(!Sr(i))return i==null?"":String(i);if(this.result)return this.result.error!==void 0?`\u26A0 ${this.result.error}`:Ar(this.result.value)}clear(){this.stop?.(),this.stop=void 0,this.key=void 0,this.result=void 0}hostConnected(){this.host.requestUpdate()}hostDisconnected(){this.clear()}},pn=new EventTarget,bi=new Map,Er=(t,i)=>(bi.has(i)||(bi.set(i,!1),Tr(t,i,e=>{let n=e.error===void 0&&gd(e.value);bi.get(i)!==n&&(bi.set(i,n),pn.dispatchEvent(new Event("change")))})),bi.get(i)??!1);var R=(t,i=1)=>{let e=typeof t=="number"?t:parseFloat(String(t));return Number.isFinite(e)?e.toLocaleString(te(),{minimumFractionDigits:i,maximumFractionDigits:i}):"\u2013"},Q=t=>t.toLocaleTimeString(te(),{hour:"2-digit",minute:"2-digit"}),Lr=(t,i="long")=>i==="long"?t.toLocaleDateString(te(),{weekday:"long",day:"numeric",month:"long"}):t.toLocaleDateString(te(),{weekday:"short",day:"numeric",month:"short"}),vi=t=>t.toLocaleDateString(te(),{weekday:"short"}).replace(".",""),Kt=t=>{let i=new Date(t);return i.setHours(0,0,0,0),i},le=t=>Math.round((Kt(t).getTime()-Kt(new Date).getTime())/864e5),Re=t=>[d("heute"),d("morgen"),d("\xFCbermorgen")][le(t)]??t.toLocaleDateString(te(),{weekday:"long"}),yi=t=>{let i=Math.max(1,Math.round(t/6e4));return i<60?`${i} min`:`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")} h`},Mr=t=>typeof t=="number"?["N","NO","O","SO","S","SW","W","NW"][Math.round(t/45)%8]:String(t??""),re=t=>{if(!t)return null;let i=new Date(String(t).replace(" ","T"));return Number.isNaN(i.getTime())?null:i},H=(t,i)=>i?t?.states[i]:void 0,be=(t,i,e)=>{let n=H(t,i);if(n)return e?n.attributes?.[e]:n.state},ce=(t,i,e)=>{let n=parseFloat(String(be(t,i,e)));return Number.isFinite(n)?n:null},Se=(t,i)=>H(t,i)?.attributes.friendly_name??i??"";var wi=(t,i)=>{let e=t.entities?.[i],n=e?.area_id??(e?.device_id?t.devices?.[e.device_id]?.area_id:void 0);return n?t.areas?.[n]?.name:void 0},_r=t=>{let i=t?.match(/^(\d{1,2}):(\d{2})$/);return i?Number(i[1])*60+Number(i[2]):null};function et(t,i,e){switch(i.condition){case"and":return(i.conditions??[]).every(n=>et(t,n,e));case"or":return(i.conditions??[]).some(n=>et(t,n,e));case"not":return!(i.conditions??[]).some(n=>et(t,n,e));case"display":return!e?.display||!i.displays?.length||i.displays.includes(e.display);case"orientation":return!e?.orientation||e.orientation===i.orientation;case"template":return!!t&&!!i.value_template&&Er(t,i.value_template);case"changed":{let n=H(t,i.entity);if(!n)return!1;let a=i.state===void 0||i.state===""?null:(Array.isArray(i.state)?i.state:[i.state]).map(String);return a&&!a.includes(n.state)?!1:Date.now()-new Date(n.last_changed).getTime()<=(Number(i.minutes)||10)*6e4}}if(i.condition==="time"){let n=new Date().getHours()*60+new Date().getMinutes(),a=_r(i.after),s=_r(i.before);return a!==null&&s!==null&&a>s?n>=a||n<s:(a===null||n>=a)&&(s===null||n<s)}if(!t)return!0;switch(i.condition){case"state":case"not_state":{let n=String(be(t,i.entity,i.attribute)),a=(Array.isArray(i.state)?i.state:[i.state]).map(String).includes(n);return i.condition==="state"?a:!a}case"numeric":{let n=ce(t,i.entity,i.attribute);return n===null?!1:(i.above===void 0||n>i.above)&&(i.below===void 0||n<i.below)}case"any_state":{let n=(Array.isArray(i.state)?i.state:[i.state]).map(String);return(i.entities??[]).some(a=>n.includes(String(t.states[a]?.state)))}case"within_days":{let n=re(be(t,i.entity,i.attribute??(i.entity.startsWith("calendar.")?"start_time":void 0)));if(!n)return!1;let a=le(n);return a>=0&&a<=i.days}default:return!0}}var ht=(t,i,e)=>!i?.length||i.every(n=>et(t,n,e)),Na=(t,i,e)=>{if(!i)return null;let n=re(be(t,i,i.startsWith("calendar.")?"start_time":void 0));if(!n)return null;let a=le(n);return a>=0&&a<=e?n:null},tt=t=>{if(!t)return"";let i=typeof t=="string"?new Date(t):t,e=Math.round((Date.now()-i.getTime())/6e4);return e<1?d("gerade"):e<60?d("vor {n} min",{n:e}):e<720?d("vor {n} h",{n:Math.round(e/60)}):le(i)===-1?d("gestern {time}",{time:Q(i)}):i.toLocaleDateString(te(),{weekday:"short",day:"numeric",month:"short"})},Da=(t,i)=>i?i==="home"?d("Zuhause"):i==="not_home"?d("Unterwegs"):Object.values(t?.states??{}).find(n=>n.entity_id.startsWith("zone.")&&(n.attributes.friendly_name===i||n.entity_id===`zone.${i}`))?.attributes.friendly_name??i:"\u2013",za=(t,i,e,n)=>{let a=r=>r*Math.PI/180,s=Math.sin(a(e-t)/2)**2+Math.cos(a(t))*Math.cos(a(e))*Math.sin(a(n-i)/2)**2;return 6371*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))},hn=(t,i)=>{let e=H(t,i);if(!e)return null;let n=parseFloat(e.state);if(Number.isFinite(n)&&/^\d+(\.\d+)?$/.test(e.state.trim()))return n;let a=e.state.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);if(a)return le(new Date(Number(a[3]),Number(a[2])-1,Number(a[1])));let r=Object.keys(e.attributes).filter(o=>/^\d{4}-\d{2}-\d{2}$/.test(o)).sort().map(o=>re(o)).find(o=>o&&le(o)>=0);return r?le(r):null},un=(t,i)=>{let e=[...t.children].find(n=>n.classList.contains("af-custom"));if(!i?.trim()){e?.remove();return}e||(e=document.createElement("style"),e.className="af-custom",t.appendChild(e)),e.textContent!==i&&(e.textContent=i)},Cr=t=>!!t&&typeof t=="object"&&!Array.isArray(t),Ma=(t,i)=>{if(!i)return t;let e={...t};for(let[n,a]of Object.entries(i))a==null||a===""||(e[n]=Cr(a)&&Cr(e[n])?Ma(e[n],a):a);return e},xi=(t,i)=>{let e=t?.displays.find(a=>a.id===i);if(!t||!e||!e.design&&!e.photos)return t;let n=Ma(t.design,e.design);return e.design?.css&&t.design.css&&(n.css=`${t.design.css}
${e.design.css}`),{...t,design:n,photos:Ma(t.photos,e.photos)}},bd=/\s*(battery level|batteriestand|batterie|battery|akku)\s*$/i,vd=/^(low|niedrig|schwach|critical|kritisch)$/i,yd=t=>/watch/i.test(t)?"watch":/ipad|tablet|tab[ _]/i.test(t)?"tablet":/iphone|phone|pixel|galaxy/i.test(t)?"phone":"other",Ia=(t,i={})=>{let e=t?.states??{},n=Number(i.threshold??21),a=new Set(i.exclude??[]),s=u=>String(e[u]?.attributes.friendly_name??u).replace(bd,"").trim(),r=(i.devices??[]).map(u=>typeof u=="string"?{entity:u}:u).filter(u=>u.entity),o=Object.keys(e).filter(u=>u.startsWith("sensor.")&&u.endsWith("_battery_level")&&e[u.replace(/_level$/,"_state")]).map(u=>({entity:u,name:void 0})),l=(r.length?r:o).filter(u=>e[u.entity]&&!a.has(u.entity)).map(u=>{let f=e[u.entity],b=parseFloat(f.state),g=e[u.entity.replace(/_level$/,"_state")]?.state??"",v=u.name||s(u.entity);return{id:u.entity,name:v,level:Number.isFinite(b)?b:null,charging:/^(charging|full|lädt|voll)$/i.test(g)||f.attributes.is_charging===!0,kind:yd(`${u.entity} ${v}`)}}),c=new Set(l.flatMap(u=>[u.id,u.id.replace(/_level$/,"_state")])),h=[];for(let[u,f]of Object.entries(e)){if(c.has(u)||a.has(u)||f.attributes.device_class!=="battery"||f.state==="unavailable"||f.state==="unknown")continue;if(u.startsWith("binary_sensor.")){f.state==="on"&&h.push({id:u,name:s(u),level:null,charging:!1,kind:"other"});continue}if(!u.startsWith("sensor."))continue;let b=parseFloat(f.state);(Number.isFinite(b)?f.attributes.unit_of_measurement==="%"&&b<n:vd.test(f.state))&&h.push({id:u,name:s(u),level:Number.isFinite(b)?b:null,charging:!1,kind:"other"})}return h.sort((u,f)=>(u.level??-1)-(f.level??-1)),{devices:l,low:h}};var wd=[[.65,1],[.45,.94],[.35,.88],[.3,.82]],ne=class extends se{constructor(){super(...arguments);this.options={}}watched(){return[]}updated(e){super.updated?.(e),this.fitToBox()}fitToBox(){if(this.style.removeProperty("--af-dense"),this.style.removeProperty("--af-fs"),!this.clientHeight||this.scrollHeight<=this.clientHeight+2)return;let e=parseFloat(getComputedStyle(this).getPropertyValue("--af-fs"))||1;for(let[n,a]of wd)if(this.style.setProperty("--af-dense",String(n)),this.style.setProperty("--af-fs",String(e*a)),this.scrollHeight<=this.clientHeight+2)return}shouldUpdate(e){if(e.size===1&&e.has("hass")){let n=e.get("hass");return!n||!this.hass?!0:this.watched().some(a=>a&&n.states[a]!==this.hass.states[a])}return!0}};ne.properties={hass:{attribute:!1},options:{attribute:!1},ctx:{attribute:!1}},ne.styles=U;var J=class extends ne{connectedCallback(){super.connectedCallback();let i=()=>{let e=6e4-Date.now()%6e4+50;this.tickTimer=window.setTimeout(()=>{this.requestUpdate(),i()},e)};i()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.tickTimer)}},F=(t,i)=>{customElements.get(t)||customElements.define(t,i)};var xd={ink:"var(--af-ink)",muted:"var(--af-ink-2)",faint:"var(--af-ink-3)",accent:"var(--af-accent)"},Pa=(t,i)=>xd[String(t)]??(t?String(t):i),mn=class extends J{connectedCallback(){super.connectedCallback(),this.options.seconds&&(this.secTimer=window.setInterval(()=>this.requestUpdate(),1e3))}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.secTimer)}render(){let i=new Date,[e,n]=Q(i).split(":"),a=this.options.size==="small",s=this.options.font==="sans"||a?"":"display",r=this.options.seconds?p`<span class="col">:</span>${String(i.getSeconds()).padStart(2,"0")}`:m;return p`<div class="clock num ${s} ${a?"small":""}" style="color:${Pa(this.options.color,"")}">
      ${e}<span class="col">:</span>${n}${r}
    </div>`}};mn.styles=[U,pt,O`
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
    `];var fn=class extends J{render(){let i=new Date;if(this.options.style==="card")return p`<div class="card" style="width:100%">
        <div class="label">${i.toLocaleDateString(te(),{weekday:"long"})}</div>
        <div class="day display num">${i.getDate()}</div>
        <div class="month">${i.toLocaleDateString(te(),{month:"long",year:"numeric"})}</div>
      </div>`;let e=Number(this.options.size)||26,n=this.options.color?"":"var(--af-ink-2)";return p`<div class="date" style="font-size:${e}px;color:${Pa(this.options.color,n)}">
      ${Lr(i,this.options.format==="short"?"short":"long")}
    </div>`}};fn.styles=[U,pt,O`
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
    `];var Nr={label:"font-size: calc(16px * var(--af-fs, 1));letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:var(--af-ink-3)",title:"font-size:44px;line-height:1.05",body:"font-size: calc(21px * var(--af-fs, 1));line-height:1.45;color:var(--af-ink-2)",big:"font-size:84px;line-height:1"},gn=class extends ne{constructor(){super(...arguments);this.tpl=new St(this)}willUpdate(){this.tpl.set(this.hass,this.options.text)}render(){let e=this.options,n=Nr[e.style]??Nr.body,a=[e.size?`font-size:${Number(e.size)}px`:"",e.color?`color:${Pa(e.color,"")}`:""].join(";"),s=e.font==="display"||e.style==="title"||e.style==="big"?"display":"",r=this.tpl.text(e.text);if(r===void 0)return p`<div class="wait" style="${n};${a}">…</div>`;let o=e.icon?p`${G(e.icon)} `:m;return e.markdown?p`<div style="${n};${a};width:100%">${o}${br(r)}</div>`:p`<div class="${s}" style="${n};${a};white-space:pre-line">${o}${r}</div>`}};gn.styles=[U,pt,vr,O`
      .md {
        width: 100%;
      }
      .wait {
        opacity: 0.35;
      }
    `];F("af-clock",mn);F("af-date",fn);F("af-text",gn);var Dr={accent:"var(--af-accent)",cold:"var(--af-cold)",good:"var(--af-good)",alert:"var(--af-alert)",ink:"var(--af-ink)",muted:"var(--af-ink-2)"},zr=["accent","cold","good","alert","muted"],Ir=(t,i=0)=>Dr[String(t)]??(t?String(t):Dr[zr[i%zr.length]]),kd=new Set(["on","home","open","true","playing","heat","cool","detected"]),$d=new Set(["off","not_home","closed","false","idle","paused","standby","clear"]),Oa=t=>{let i=parseFloat(t);return Number.isFinite(i)?i:kd.has(t)?1:$d.has(t)?0:null},Tt=(t,i)=>{let n=(i===void 0||i===""?void 0:Number(i))??(Number.isInteger(t)||Math.abs(t)>=100?0:Math.abs(t)>=1?1:2);return t.toLocaleString(te(),{minimumFractionDigits:n,maximumFractionDigits:n})},Fa=t=>t?.attributes.unit_of_measurement??"",He=36e5,Sd=(t,i,e)=>{if(t.length<=i)return t;let n=t[0][0],a=t[t.length-1][0]-n||1,s=new Map;for(let[r,o]of t){let l=Math.min(i-1,Math.floor((r-n)/a*i)),c=s.get(l);c?e?s.set(l,[c[0],o,1]):s.set(l,[c[0],c[1]+o,c[2]+1]):s.set(l,[r,o,1])}return[...s.values()].map(([r,o,l])=>[r,o/l])},ki=class ki extends ne{constructor(){super(...arguments);this.series=[];this.loadedKey="";this.loading=!1;this.failed="";this.gid=ki.gid++}get ids(){let e=this.options;return(Array.isArray(e.entities)?e.entities:e.entity?[{entity:e.entity}]:[]).map(a=>typeof a=="string"?{entity:a}:a).filter(a=>!!a?.entity)}get hours(){return Math.max(1,Number(this.options.hours)||24)}get period(){return this.options.period??(this.hours>72?"day":"hour")}watched(){return this.ids.map(e=>e.entity)}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.load()},5*6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer),this.loadedKey=""}willUpdate(){let e=JSON.stringify([this.ids,this.hours,this.options.kind,this.period]);this.hass&&e!==this.loadedKey&&(this.loadedKey=e,this.load())}async load(){let e=this.hass,n=this.ids;if(!e||!n.length||this.loading)return;this.loading=!0;let a=this.options.kind??"line",s=new Date(Date.now()-this.hours*He);try{let r={},o={};if(a==="bar"||this.hours>72){let l=a==="bar"?this.period:this.hours>336?"day":"hour",c=l==="day"?Kt(s):new Date(Math.floor(s.getTime()/He)*He),h=await e.callWS({type:"recorder/statistics_during_period",statistic_ids:n.map(u=>u.entity),period:l,start_time:c.toISOString(),types:a==="bar"?["change","mean"]:["mean","state"]});for(let u of n)r[u.entity]=(h[u.entity]??[]).map(f=>[f.start,Number(a==="bar"?f.change??f.mean:f.mean??f.state)]).filter(([,f])=>Number.isFinite(f))}else{let l=await e.callWS({type:"history/history_during_period",start_time:s.toISOString(),entity_ids:n.map(c=>c.entity),minimal_response:!0,no_attributes:!0,significant_changes_only:!1});for(let c of n){let h=l[c.entity]??[];o[c.entity]=!/^(sensor|input_number|number)\./.test(c.entity),r[c.entity]=h.map(u=>[Math.max(s.getTime(),(u.lc??u.lu??0)*1e3),Oa(u.s)]).filter(u=>u[1]!==null)}}this.series=n.map((l,c)=>({id:l.entity,name:l.name??Se(e,l.entity),color:Ir(l.color,c),step:!!o[l.entity],points:a==="bar"?r[l.entity]:Sd(r[l.entity],360,!!o[l.entity])})),this.failed=""}catch(r){this.failed=r?.message??d("Verlauf nicht verf\xFCgbar")}finally{this.loading=!1,this.requestUpdate()}}current(e){let n=H(this.hass,e);return n?Oa(n.state):null}domain(e,n){let a=this.options,s=Math.min(...e),r=Math.max(...e);n&&(s=Math.min(0,s)),(!Number.isFinite(s)||!Number.isFinite(r))&&([s,r]=[0,1]),r-s<1e-9&&([s,r]=[s-1,r+1]);let o=n?0:(r-s)*.1,l=c=>c!==void 0&&c!==""&&Number.isFinite(Number(c));return[l(a.min)?Number(a.min):s-o,l(a.max)?Number(a.max):r+o]}renderLines(e){let n=e-this.hours*He,a=this.options.kind==="area",s=this.series.map(g=>{let v=this.current(g.id),S=v!==null&&this.hours<=72?[...g.points,[e,v]]:g.points;return{...g,pts:S}}),r=s.flatMap(g=>g.pts.map(([,v])=>v));if(!r.length)return p`<div class="calm">${d("Noch keine Daten im Zeitraum")}</div>`;let[o,l]=this.domain(r,!1),c=g=>(Math.min(e,Math.max(n,g))-n)/(e-n)*1e3,h=g=>300-(Math.min(l,Math.max(o,g))-o)/(l-o)*300,u=s.map((g,v)=>{if(!g.pts.length)return m;let S="";g.pts.forEach(([P,$],L)=>{let x=c(P).toFixed(1),D=h($).toFixed(1);L===0?S+=`M${x},${D}`:g.step?S+=`H${x}V${D}`:S+=`L${x},${D}`}),c(g.pts[g.pts.length-1][0])<1e3&&(S+="H1000");let I=c(g.pts[0][0]).toFixed(1),A=a||g.step?$e`<path class="fill" d="${S}V300H${I}Z" fill="url(#g${this.gid}-${v})"></path>`:m;return $e`<defs><linearGradient id="g${this.gid}-${v}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${g.color}" stop-opacity="0.3"></stop>
          <stop offset="1" stop-color="${g.color}" stop-opacity="0"></stop></linearGradient></defs>
        ${A}<path d="${S}" style="stroke:${g.color}"></path>`}),f=this.options.unit??Fa(H(this.hass,this.series[0]?.id)),b=this.options.decimals;return p`<div class="plot">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
          <line class="grid" x1="0" x2="1000" y1="0" y2="0"></line>
          <line class="grid" x1="0" x2="1000" y1="150" y2="150"></line>
          <line class="grid" x1="0" x2="1000" y1="300" y2="300"></line>
          ${u}
        </svg>
        <span class="ylab num" style="top:0;transform:translateY(-130%)">${Tt(l,b)} ${f}</span>
        <span class="ylab num" style="top:100%;transform:translateY(-130%)">${Tt(o,b)} ${f}</span>
      </div>
      ${this.renderTimeAxis(n,e)}`}renderTimeAxis(e,n){let a=n-e,s=[1,2,3,6,12,24,48,168].map(u=>u*He),r=s.find(u=>a/u<=5)??s[s.length-1],o=[],l=new Date().getTimezoneOffset()*6e4,c=r>=24*He?Kt(new Date(e+r)).getTime():Math.ceil((e-l)/r)*r+l;for(let u=c;u<n-r*.3;u+=r)u>e+r*.15&&o.push(u);let h=u=>r>=24*He?vi(new Date(u)):Q(new Date(u));return p`<div class="x">
      ${o.map(u=>p`<span style="left:${(u-e)/a*100}%">${h(u)}</span>`)}
    </div>`}renderBars(){let e=this.period,n=e==="day"?24*He:He,a=Date.now(),s=e==="day"?Math.max(1,Math.round(this.hours/24)):this.hours,r=Array.from({length:s},(b,g)=>e==="day"?Kt(new Date(a-(s-1-g)*864e5)).getTime():Math.floor(a/He)*He-(s-1-g)*He),o=(b,g)=>b.points.find(([v])=>Math.abs(v-g)<n/2)?.[1],l=this.series.flatMap(b=>r.map(g=>o(b,g)??0));if(!l.some(b=>b!==0))return p`<div class="calm">${d("Noch keine Statistik im Zeitraum")}</div>`;let[c,h]=this.domain(l,!0),u=s>30?2:s>14?4:8,f=(b,g)=>{let v=new Date(b);return e==="day"?s<=14||g%Math.ceil(s/10)===0?s<=8?vi(v):`${v.getDate()}.`:"":v.getHours()%(s>12?6:3)===0?`${v.getHours()}`:""};return p`<div class="plot" style="--gap:${u}px">
        <div class="bars">
          ${r.map((b,g)=>p`<div class="slot">
              ${this.series.map(v=>{let S=o(v,b),I=S===void 0?0:(Math.max(c,S)-c)/(h-c)*100;return p`<div class="bar ${g===s-1?"dim":""}" style="height:${I}%;background:${v.color}"></div>`})}
            </div>`)}
        </div>
      </div>
      <div class="x slots" style="--gap:${u}px">${r.map((b,g)=>p`<span>${f(b,g)}</span>`)}</div>`}render(){let e=this.options,n=this.ids,a;n.length?this.failed?a=p`<div class="calm">${this.failed}</div>`:this.series.length?a=e.kind==="bar"?this.renderBars():this.renderLines(Date.now()):a=p`<div class="calm">${d("Verlauf wird geladen \u2026")}</div>`:a=p`<div class="calm">${d("Entit\xE4t w\xE4hlen")}</div>`;let s=H(this.hass,n[0]?.entity),r=s?Oa(s.state):null,o=e.value!==!1&&n.length===1&&r!==null&&e.kind!=="bar",l=n.length>1?p`<div class="legend">
            ${this.series.map(h=>{let u=this.current(h.id);return p`<span><i style="background:${h.color}"></i>${h.name}${u!==null&&e.value!==!1?p` <b class="num">${Tt(u,e.decimals)}</b>`:m}</span>`})}
          </div>`:m,c=o||n.length>1||e.label?p`<div class="head">
            <div>
              ${e.label?p`<div class="label">${e.label}</div>`:m}
              ${o?p`<div class="now display num">${Tt(r,e.decimals)}<small>${e.unit??Fa(s)}</small></div>`:m}
            </div>
            ${l}
          </div>`:m;return p`<div class="wrap ${e.style==="card"?"card":""}">${c}${a}</div>`}};ki.styles=[U,O`
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
    `],ki.gid=0;var Ba=ki,bn=class extends ne{watched(){return[this.options.entity]}render(){let i=this.options,e=H(this.hass,i.entity),n=i.attribute?e?.attributes[i.attribute]:e?.state,a=parseFloat(String(n)),s=Number(i.min??0),r=Number(i.max??100),o=Number.isFinite(a),l=o?Math.min(100,Math.max(0,(a-s)/(r-s||1)*100)):0,c=(Array.isArray(i.severity)?i.severity:[]).filter(I=>I&&I.from!==""&&Number.isFinite(Number(I.from))).sort((I,A)=>Number(I.from)-Number(A.from)),h=o?c.filter(I=>a>=Number(I.from)).pop():void 0,u=Ir(h?.color??i.color??"accent"),f=i.kind==="half",b=f?"M 16 100 A 84 84 0 0 1 184 100":"M 100 16 A 84 84 0 1 1 99.99 16",g=i.unit??(i.attribute?"":Fa(e)),v=i.name??(e?Se(this.hass,i.entity):""),S=v?p`<div class="name">${i.icon?G(i.icon):m}${v}</div>`:m;return p`<div class="wrap ${f?"half":""} ${i.style==="card"?"card":""}">
      <div class="dial">
        <svg viewBox=${f?"0 0 200 108":"0 0 200 200"} preserveAspectRatio="xMidYMid meet">
          <path class="track" d=${b} pathLength="100" stroke-width="12"></path>
          <path class="val" d=${b} pathLength="100" stroke-width="12" style="stroke:${u};stroke-dasharray:${l} 100;${l?"":"opacity:0"}"></path>
        </svg>
        <div class="center">
          <div class="v display num">${o?Tt(a,i.decimals):"\u2013"}${g?p`<small>${g}</small>`:m}</div>
          ${f?m:S}
        </div>
      </div>
      ${f?p`<div class="range"><span class="num">${Tt(s,0)}</span><span class="num">${Tt(r,0)}</span></div>
            ${S}`:m}
    </div>`}};bn.styles=[U,O`
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
    `];var vn=class extends ne{constructor(){super(...arguments);this.urlTpl=new St(this);this.capTpl=new St(this);this.tick=0;this.resolved=new Map;this.failed=!1}shouldUpdate(e){if(e.size===1&&e.has("hass")&&this.options.entity&&!this.options.url){let n=e.get("hass"),a=this.options.entity;return n?.states[a]?.attributes.entity_picture!==this.hass?.states[a]?.attributes.entity_picture}return super.shouldUpdate(e)}connectedCallback(){super.connectedCallback(),this.restartTimer()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}restartTimer(){clearInterval(this.timer);let e=Number(this.options.refresh)||0;e>0&&(this.timer=window.setInterval(()=>{this.tick++,this.requestUpdate()},Math.max(5,e)*1e3))}willUpdate(e){e.has("options")&&this.restartTimer(),this.urlTpl.set(this.hass,this.options.url),this.capTpl.set(this.hass,this.options.caption),this.pick()}async pick(){let e=this.options,n;if(e.url?(n=this.urlTpl.text(e.url)?.trim(),n?.startsWith("\u26A0")&&(n=void 0)):e.entity&&(n=H(this.hass,e.entity)?.attributes.entity_picture),!n){this.wanted=void 0;return}if(n.startsWith("media-source://")){let r=this.resolved.get(n);if(r&&Date.now()-r.at<45*6e4)n=r.url;else if(this.hass){let o=n;try{let l=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:o,expires:3600});this.resolved.set(o,{url:l.url,at:Date.now()}),n=l.url}catch{this.failed=!0,this.requestUpdate();return}}}let a=this.tick&&!n.includes("authSig")?`${n}${n.includes("?")?"&":"?"}_wb=${this.tick}`:n;if(a===this.wanted)return;this.wanted=a;let s=new Image;s.onload=()=>{this.wanted===a&&(this.shown=a,this.failed=!1,this.requestUpdate())},s.onerror=()=>{this.wanted===a&&(this.failed=!this.shown,this.requestUpdate())},s.src=a}render(){let e=this.options,n=e.caption?this.capTpl.text(e.caption):"";this.style.setProperty("--fit",e.fit==="contain"?"contain":"cover"),this.style.setProperty("--r",`${Number(e.radius??28)}px`);let a=!e.url&&!e.entity?d("Bild-Link oder Entit\xE4t w\xE4hlen"):this.failed?d("Bild nicht ladbar"):"";return p`${this.shown?p`<img src=${this.shown} alt="" @error=${s=>s.target.style.visibility="hidden"} />`:p`<div class="ph">${a}</div>`}
    ${n?p`<div class="cap">${n}</div>`:m}`}};vn.styles=[U,O`
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
    `];F("af-chart",Ba);F("af-gauge",bn);F("af-image",vn);var Td=10*6e4,Ra=new Map,Pr=()=>new Date().toDateString(),Ad=(t,i,e)=>{let n=[i,e.language??"",e.source??""].join("|"),a=Ra.get(n);if(a?.pending)return a.pending;if(a&&a.day===Pr()&&(a.data||Date.now()-a.at<Td))return Promise.resolve(a.data);let s=t.callWS({type:"ambiframe/daily",kind:i,...e}).catch(()=>null).then(r=>{let o=r??a?.data??null;return Ra.set(n,{day:r?Pr():a?.day??"",at:Date.now(),data:o}),o});return Ra.set(n,{day:a?.day??"",at:a?.at??0,data:a?.data??null,pending:s}),s},$i=class extends ne{constructor(){super(...arguments);this.data=null;this.loaded=!1}get kind(){return this.options.kind==="quote"?"quote":"article"}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.load()},60*6e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.timer)}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.loaded}willUpdate(e){this.hass&&(!this.loaded||e.has("options"))&&(this.loaded=!0,this.load())}async load(){if(!this.hass)return;let e=this.options,n=await Ad(this.hass,this.kind,this.kind==="quote"?{source:e.source||void 0}:{language:e.language||void 0});(n||!this.data)&&(this.data=n),this.requestUpdate()}label(e){return this.options.label===!1?m:p`<div class="label">${this.options.label??e}</div>`}render(){let e=this.data;if(!e)return p`<div class="calm">${this.loaded?d("Wird geladen \u2026"):""}</div>`;if(this.kind==="quote"){let a=e.text.length>220?34:e.text.length>120?40:46;return p`<div class="quote" style="--q:${a}px">
        ${this.label(e.period==="week"?d("Zitat der Woche"):d("Zitat des Tages"))}
        <div class="mark display">“</div>
        <div class="q display">${e.text}</div>
        ${e.author?p`<div class="who">${e.author}</div>`:m}
      </div>`}let n=this.options.image===!1?"":e.image;return p`<div class="art">
      <div class="body">
        ${this.label(d("Artikel des Tages \xB7 Wikipedia"))}
        <div class="title display">${e.title}</div>
        <div class="text">${e.text}</div>
      </div>
      ${n?p`<div class="pic" style="background-image:url('${n}')"></div>`:m}
    </div>`}};$i.properties={...ne.properties,data:{state:!0}},$i.styles=[U,O`
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
    `];F("af-daily",$i);var Me={at:0,homes:{}},Ed=t=>(Me.loading||(Me.loading=t.callWS({type:"ambiframe/tibber/prices"}).then(i=>{Me.homes=Object.fromEntries(Object.entries(i.homes??{}).map(([e,n])=>[e,n.map(a=>({start:new Date(a.start),price:a.price}))])),Me.error=void 0}).catch(i=>{Me.error=i?.message??String(i)}).finally(()=>{Me.at=Date.now(),Me.loading=void 0})),Me.loading),yn=(t,i=1)=>`${R(t*100,i)} ct`,Ha=t=>t==null?"\u2013":Math.abs(t)>=1e3?`${R(t/1e3,1)} kW`:`${R(t,0)} W`,_d=t=>{let i=new Map;for(let e of t){let n=new Date(e.start);n.setMinutes(0,0,0);let a=i.get(n.getTime())??[];a.push(e.price),i.set(n.getTime(),a)}return[...i.entries()].sort((e,n)=>e[0]-n[0]).map(([e,n])=>({start:new Date(e),price:n.reduce((a,s)=>a+s,0)/n.length}))},Cd=(t,i)=>{let e=Date.now()-36e5,n=t.filter(s=>s.start.getTime()>=e),a=null;for(let s=0;s+i<=n.length;s++){let r=n.slice(s,s+i),o=r.reduce((l,c)=>l+c.price,0)/i;(!a||o<a.avg)&&(a={start:r[0].start,end:new Date(r[i-1].start.getTime()+36e5),avg:o})}return a},wn=class extends J{constructor(){super(...arguments);this.size={w:0,h:0};this.resize=new ResizeObserver(()=>{this.size={w:this.offsetWidth,h:this.offsetHeight},this.requestUpdate()})}connectedCallback(){super.connectedCallback(),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resize.disconnect()}shouldUpdate(){return!0}render(){let e=this.options;this.hass&&Date.now()-Me.at>15*6e4&&Ed(this.hass).then(()=>this.requestUpdate());let n=Me.homes,a=n[e.home]??Object.values(n)[0]??[],s=p`<div class="label">${e.label??d("Strompreis heute")}</div>`;if(!a.length)return p`${s}<div class="muted" style="margin-top:16px">${Me.error??(Me.at?d("Keine Preisdaten"):d("L\xE4dt \u2026"))}</div>`;let r=new Date;r.setHours(0,0,0,0);let o=r.getTime()+2*864e5,l=_d(a.filter(T=>T.start.getTime()>=r.getTime()&&T.start.getTime()<o)),c=l.filter(T=>T.start.getTime()<r.getTime()+864e5),h=e.tomorrow===!1?c:l,u=[...a].reverse().find(T=>T.start.getTime()<=Date.now()),f=e.entity?ce(this.hass,e.entity)??u?.price:u?.price,b=[...c].map(T=>T.price).sort((T,q)=>T-q),g=T=>b[Math.floor((b.length-1)*T)],v=f==null?"":f<=g(1/3)?"good":f>=g(2/3)?"bad":"",S=d({good:"g\xFCnstig",bad:"teuer","":"normal"}[v]),I=b[0],A=b[b.length-1],P=b.reduce((T,q)=>T+q,0)/b.length,$=Cd(l,Number(e.window??2)),L=this.size.w||600,x=Math.max(90,Math.min(380,(this.size.h||360)-240)),D=Math.min(...h.map(T=>T.price))*.92,w=Math.max(...h.map(T=>T.price)),y=L/h.length,z=new Date;z.setMinutes(0,0,0);let C=h.map((T,q)=>{let Z=Math.max(3,(T.price-D)/(w-D||1)*(x-22)),ae=T.start.getTime()<z.getTime(),pe=T.start.getTime()===z.getTime(),ge=pe?"var(--af-ink)":T.price<=g(1/3)?"var(--af-good)":T.price>=g(2/3)?"var(--af-accent)":"var(--af-ink-3)",Ie=T.start.getHours()%6===0?$e`<text class="t3" x=${q*y+y/2} y=${x} text-anchor="middle">${T.start.getHours()===0&&q>0?d("morgen"):`${T.start.getHours()}`}</text>`:m;return $e`<rect x=${q*y+1.5} y=${x-20-Z} width=${Math.max(2,y-3)} height=${Z} rx="2" fill=${ge} opacity=${ae?.3:pe?1:.75}></rect>${Ie}`});return p`${s}
      <div class="top">
        <div class="now display num">${f!=null?R(f*100,1):"\u2013"}<small>ct/kWh</small></div>
        <div>
          <div class="level ${v}">${S}</div>
          <div class="facts num">Ø ${yn(P)} · ${yn(I)} – ${yn(A)}</div>
        </div>
      </div>
      ${$?p`<div class="best">${G("charge")}<span>${d("Am g\xFCnstigsten")} <b class="num">${Q($.start)}–${Q($.end)}</b> · Ø ${yn($.avg)}</span></div>`:m}
      <svg width=${L} height=${x} viewBox="0 0 ${L} ${x}">${C}</svg>
      ${e.note?p`<div class="note">${e.note}</div>`:m}`}};wn.styles=[U,O`
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
    `];var xn=class extends J{watched(){let i=this.options;return[...(i.production??[]).map(e=>e.entity),i.consumption?.entity,i.forecast,i.forecast_remaining,i.extra]}render(){let i=this.options,n=(i.production??[]).map(h=>({name:h.name??H(this.hass,h.entity)?.attributes.friendly_name??h.entity,w:ce(this.hass,h.entity)})),a=n.reduce((h,u)=>h+(u.w??0),0),s=i.consumption?.entity?ce(this.hass,i.consumption.entity):null,r=s?Math.min(100,a/s*100):null,o=i.forecast?ce(this.hass,i.forecast):null,l=i.forecast_remaining?ce(this.hass,i.forecast_remaining):null,c=i.extra?H(this.hass,i.extra):void 0;return p`<div class="label">${i.label??d("Energie jetzt")}</div>
      <div class="row">
        <div>
          <div class="k">${G("solar")}${i.production_label??d("Erzeugung")}</div>
          <div class="v display num">${Ha(a)}</div>
          <div class="src num">${n.map(h=>p`${h.name} ${Ha(h.w)}<br />`)}</div>
        </div>
        ${i.consumption?.entity?p`<div>
              <div class="k">${G("home")}${i.consumption.name??d("Verbrauch")}</div>
              <div class="v display num">${Ha(s)}</div>
              ${o!=null?p`<div class="src num">${d("Prognose heute {n} kWh",{n:R(o,1)})}${l!=null?p`<br />${d("noch {n} kWh",{n:R(l,1)})}`:m}</div>`:m}
            </div>`:m}
      </div>
      ${r!=null?p`<div class="bar"><i style="width:${r}%"></i></div>
            <div class="share num">
              <span>${d("{n} % aus eigener Sonne",{n:R(r,0)})}</span>
              <span>${c?`${i.extra_name??c.attributes.friendly_name??""} ${R(be(this.hass,i.extra),0)} ${c.attributes.unit_of_measurement??""}`:""}</span>
            </div>`:m}`}};xn.styles=[U,O`
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
    `];F("af-price",wn);F("af-power",xn);var{I:Ld}=mr,Or=t=>t;var Fr=()=>document.createComment(""),Ut=(t,i,e)=>{let n=t._$AA.parentNode,a=i===void 0?t._$AB:i._$AA;if(e===void 0){let s=n.insertBefore(Fr(),a),r=n.insertBefore(Fr(),a);e=new Ld(s,r,t,t.options)}else{let s=e._$AB.nextSibling,r=e._$AM,o=r!==t;if(o){let l;e._$AQ?.(t),e._$AM=t,e._$AP!==void 0&&(l=t._$AU)!==r._$AU&&e._$AP(l)}if(s!==a||o){let l=e._$AA;for(;l!==s;){let c=Or(l).nextSibling;Or(n).insertBefore(l,a),l=c}}}return e},ut=(t,i,e=t)=>(t._$AI(i,e),t),Md={},kn=(t,i=Md)=>t._$AH=i,Br=t=>t._$AH,$n=t=>{t._$AR(),t._$AA.remove()};var We=ot(class extends rt{constructor(){super(...arguments),this.key=m}render(t,i){return this.key=t,i}update(t,[i,e]){return i!==this.key&&(kn(t),this.key=i),e}});var Rr=(t,i,e)=>{let n=new Map;for(let a=i;a<=e;a++)n.set(t[a],a);return n},Vt=ot(class extends rt{constructor(t){if(super(t),t.type!==ln.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,i,e){let n;e===void 0?e=i:i!==void 0&&(n=i);let a=[],s=[],r=0;for(let o of t)a[r]=n?n(o,r):r,s[r]=e(o,r),r++;return{values:s,keys:a}}render(t,i,e){return this.dt(t,i,e).values}update(t,[i,e,n]){let a=Br(t),{values:s,keys:r}=this.dt(i,e,n);if(!Array.isArray(a))return this.ut=r,s;let o=this.ut??=[],l=[],c,h,u=0,f=a.length-1,b=0,g=s.length-1;for(;u<=f&&b<=g;)if(a[u]===null)u++;else if(a[f]===null)f--;else if(o[u]===r[b])l[b]=ut(a[u],s[b]),u++,b++;else if(o[f]===r[g])l[g]=ut(a[f],s[g]),f--,g--;else if(o[u]===r[g])l[g]=ut(a[u],s[g]),Ut(t,l[g+1],a[u]),u++,g--;else if(o[f]===r[b])l[b]=ut(a[f],s[b]),Ut(t,a[u],a[f]),f--,b++;else if(c===void 0&&(c=Rr(r,b,g),h=Rr(o,u,f)),c.has(o[u]))if(c.has(o[f])){let v=h.get(r[b]),S=v!==void 0?a[v]:null;if(S===null){let I=Ut(t,a[u]);ut(I,s[b]),l[b]=I}else l[b]=ut(S,s[b]),Ut(t,a[u],S),a[v]=null;b++}else $n(a[f]),f--;else $n(a[u]),u++;for(;b<=g;){let v=Ut(t,l[g+1]);ut(v,s[b]),l[b++]=v}for(;u<=f;){let v=a[u++];v!==null&&$n(v)}return this.ut=r,kn(t,l),Ue}});var Sn=class extends EventTarget{constructor(){super(...arguments);this.data=new Map;this.subs=new Map}setHass(e){this.hass=e}get(e,n){if(!e)return;let a=`${e}|${n}`;if(!this.subs.has(a)&&this.hass){let s=this.hass.connection.subscribeMessage(r=>{this.data.set(a,r.forecast??[]),this.dispatchEvent(new Event("change"))},{type:"weather/subscribe_forecast",entity_id:e,forecast_type:n}).catch(()=>{});this.subs.set(a,s)}return this.data.get(a)}dispose(){for(let e of this.subs.values())e.then(n=>n?.());this.subs.clear()}},Nd=t=>{for(let i=t.length-1;i>0;i--){let e=Math.floor(Math.random()*(i+1));[t[i],t[e]]=[t[e],t[i]]}return t},Dd=6*36e5,Tn=class{constructor(i,e){this.getHass=i;this.getConfig=e;this.items=[];this.index=-1;this.loadedAt=0}reload(){this.loading=void 0}async load(){let i=this.getHass(),e=this.getConfig();if(!i||!e)return;let n=[];if(e.folder)try{n=((await i.callWS({type:"media_source/browse_media",media_content_id:e.folder})).children??[]).filter(s=>s.media_class==="image"||/\.(jpe?g|png|webp|avif)$/i.test(s.title)).map(s=>({mediaId:s.media_content_id,credit:""}))}catch{}if(e.icloud)try{let a=await i.callWS({type:"ambiframe/photos/icloud",url:e.icloud});n=[...n,...a.map(s=>({url:s.url,credit:s.credit}))]}catch{}if(e.bing&&(!n.length||e.bing_mix))try{let a=(await i.callWS({type:"ambiframe/photos/bing"})).map(s=>({url:s.url,credit:s.credit}));n=[...n,...a]}catch{}this.items=Nd(n),this.index=-1,this.loadedAt=Date.now()}async next(){let i=this.getConfig()?.icloud?3e5:Dd;if((!this.loading||Date.now()-this.loadedAt>i)&&(this.loading=this.load()),await this.loading,!this.items.length)return null;this.index=(this.index+1)%this.items.length;let e=this.items[this.index],n=this.getConfig()?.credit?e.credit:"";if(e.url)return{url:e.url,credit:n};let a=this.getHass();if(!a||!e.mediaId)return null;try{return{url:(await a.callWS({type:"media_source/resolve_media",media_content_id:e.mediaId,expires:3600})).url,credit:n}}catch{return null}}},Wa=new Map,An=(t,i,e=2)=>{let n=`${[...i].sort().join(",")}|${e}`,a=Wa.get(n);if(a?.pending)return a.pending;if(a&&Date.now()-a.at<10*6e4)return Promise.resolve(a.events);let s=t.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:i},service_data:{duration:{days:e}},return_response:!0}).then(r=>Object.entries(r.response??{}).flatMap(([o,l])=>l.events.map(c=>({...c,calendar:o}))).sort((o,l)=>new Date(o.start).getTime()-new Date(l.start).getTime())).catch(()=>a?.events??[]).then(r=>(Wa.set(n,{at:Date.now(),events:r}),r));return Wa.set(n,{at:a?.at??0,events:a?.events??[],pending:s}),s},it=t=>!t.start.includes("T"),En=t=>new Promise(i=>{let e=new Image;e.onload=()=>i(!0),e.onerror=()=>i(!1),e.src=t});var Ve=t=>ie(t?Rt[t]??t:void 0),Wr=t=>t==="\xB0C"||t==="\xB0F"?"\xB0":t?` ${t}`:"",Kr=O`
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
`,_n=class extends ne{watched(){let i=this.options;return[i.entity,i.sub?.entity,...(i.secondary??[]).map(e=>e.entity)]}formatted(i,e,n=1,a){let s=H(this.hass,i),r=be(this.hass,i,e),o=parseFloat(String(r)),l=a??(e?"":s?.attributes.unit_of_measurement);return Number.isFinite(o)?`${R(o,n)}${Wr(l)}`:String(r??"\u2013")}render(){let i=this.options,e=i.decimals??1,n=this.formatted(i.entity,i.attribute,e,i.unit),a=i.name??Se(this.hass,i.entity),s=(l,c)=>{let h=ce(this.hass,l,c);return i.cold!=null&&h!=null&&h<Number(i.cold)};if(i.style!=="card")return p`<div class="plain">
        <div class="name">${i.icon?p`${Ve(i.icon)} `:m}${a}</div>
        <div class="big display num ${s(i.entity,i.attribute)?"cold":""}">${n}</div>
      </div>`;let r=i.sub?.entity?`${this.formatted(i.sub.entity,i.sub.attribute,0,"")} ${i.sub.suffix??""}`:"",o=i.secondary??[];return p`<div class="card" style="width:100%">
      <div class="label">${i.label??""}</div>
      <div class="bigic">${Ve(i.icon??"thermo")}</div>
      <div class="big display num ${s(i.entity,i.attribute)?"cold":""}">${n}</div>
      <div class="cond">${a}</div>
      ${r?p`<div class="sub num">${r}</div>`:m}
      ${o.length?p`<div class="split">
            ${o.map(l=>p`<div class="r num ${s(l.entity,l.attribute)?"cold":""}">
                <span>${l.name??Se(this.hass,l.entity)}</span><span>${this.formatted(l.entity,l.attribute,l.decimals??1)}</span>
              </div>`)}
          </div>`:m}
    </div>`}};_n.styles=[U,pt,Kr,O`
      .plain .name {
        font-size: calc(19px * var(--af-fs, 1));
        color: var(--af-ink-2);
      }
      .plain .big {
        font-size: 88px;
        line-height: 1;
        margin-top: 12px;
      }
    `];var Cn=class extends ne{rooms(){return this.options.rooms??[]}watched(){return this.rooms().flatMap(i=>[i.temperature,i.humidity,i.climate,...i.windows??[]])}render(){let i=Number(this.options.cold??16),e=Number(this.options.warm??26),n=Number(this.options.columns??3);return p`<div class="grid" style="grid-template-columns:repeat(${n},1fr)">
      ${this.rooms().map(a=>{let s=a.temperature?.startsWith("climate."),r=ce(this.hass,a.temperature,s?"current_temperature":void 0),o=ce(this.hass,a.humidity),l=(a.windows??[]).some(f=>H(this.hass,f)?.state==="on"),c=H(this.hass,a.climate??(s?a.temperature:void 0)),h=l?d("Fenster offen"):"";!h&&c?.attributes.hvac_action==="heating"&&(h=d("heizt auf {temp}\xB0",{temp:R(c.attributes.temperature,0)})),!h&&o!=null&&(h=`${R(o,0)} %`);let u=r==null?"":r<i?"cold":r>e?"warm":"";return p`<div class="${u}">
          <div class="n">${a.name}</div>
          <div class="v display num">${R(r,1)}°</div>
          <div class="s num">${h||p`&nbsp;`}</div>
        </div>`})}
    </div>`}};Cn.styles=[U,O`
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
    `];var zd=new Set(["window","door","garage_door","opening"]),Id=(t,i)=>{let e=t.states[i]?.attributes;return Array.isArray(e?.entity_id)||!!e?.is_hue_group},Ln=class extends J{shouldUpdate(){return!0}items(){let i=this.hass;if(!i)return[];let e=this.options,n=[],a=Date.now();if(e.windows==="auto")for(let r of Object.values(i.states))r.entity_id.startsWith("binary_sensor.")&&r.state==="on"&&zd.has(r.attributes.device_class)&&n.push({icon:r.attributes.device_class==="window"?"window":"door",title:`${r.attributes.friendly_name??r.entity_id} offen`,sub:wi(i,r.entity_id)??""});else if(Array.isArray(e.windows))for(let r of e.windows)H(i,r.entity)?.state==="on"&&n.push({icon:"window",title:d("{name} offen",{name:r.name??Se(i,r.entity)}),sub:r.room??wi(i,r.entity)??""});for(let r of e.appliances??[]){let o=H(i,r.entity);o&&o.state===(r.on??"on")&&n.push({icon:r.icon??"washer",title:d("{name} l\xE4uft",{name:r.name??Se(i,r.entity)}),sub:d("seit {time}",{time:yi(a-new Date(o.last_changed).getTime())})})}if(e.lights==="auto"){let r=Object.values(i.states).filter(o=>o.entity_id.startsWith("light.")&&o.state==="on"&&!Id(i,o.entity_id));if(r.length){let o=r.map(l=>l.attributes.friendly_name??l.entity_id);n.push({icon:"bulb",title:r.length===1?d("1 Licht an"):d("{n} Lichter an",{n:r.length}),sub:o.slice(0,3).join(", ")+(o.length>3?" \u2026":"")})}}let s=Na(i,e.waste,Number(e.waste_days??2));s&&e.waste&&n.push({icon:"bin",title:String(be(i,e.waste,"message")??d("M\xFCll")),sub:d("Abholung {when}",{when:Re(s)})});for(let r of e.extra??[])H(i,r.entity)?.state===(r.state??"on")&&n.push({icon:r.icon??"info",title:r.text??Se(i,r.entity),sub:""});return n.length||n.push({icon:"check",title:e.calm_title??d("Alles ruhig"),sub:e.calm_text??d("Nichts offen, nichts l\xE4uft")}),n.slice(0,Number(e.max??5))}render(){return p`${this.options.label===!1?m:p`<div class="label">${this.options.label??"Gerade"}</div>`}
      ${this.items().map(i=>p`<div class="item">${Ve(i.icon)}<div><div class="a">${i.title}</div>${i.sub?p`<div class="b">${i.sub}</div>`:m}</div></div>`)}`}};Ln.styles=[U,O`
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
    `];var Mn=class extends J{watched(){return[this.options.entity]}render(){let i=this.options,e=H(this.hass,i.entity),n=re(e?.attributes.start_time);if(!e||!n)return m;if(i.days!=null&&(le(n)<0||le(n)>Number(i.days)))return m;let a=i.waste??/waste|abfall|muell|müll|trash/i.test(i.entity??""),s=String(e.attributes.message??""),r=`${Re(n)}${e.attributes.all_day?"":`, ${d("{time} Uhr",{time:Q(n)})}`}`;if(i.variant==="line")return p`<div class="line">${Ve(i.icon??(a?"bin":"calendar"))}<span>${s} ${r}</span></div>`;let o=le(n)<=1?d("heute Abend"):d("{day} Abend",{day:Re(new Date(n.getTime()-864e5))});return p`<div class="card" style="width:100%">
      <div class="label">${i.label??(a?d("M\xFCll"):d("Termin"))}</div>
      <div class="bigic">${Ve(i.icon??(a?"bin":"calendar"))}</div>
      <div class="big display" style="font-size:72px;margin-top:28px">${s}</div>
      <div class="cond">${a?d("Abholung"):""} ${r}</div>
      <div class="sub">${n.toLocaleDateString(te(),{weekday:"long",day:"numeric",month:"long"})}</div>
      ${a?p`<div class="split"><div class="r"><span>${d("Rausstellen")}</span><span>${o}</span></div></div>`:m}
    </div>`}};Mn.styles=[U,pt,Kr,O`.line { font-size: calc(21px * var(--af-fs, 1)); color: var(--af-ink-2); display:flex; gap:10px; align-items:center } .line .ic { color: var(--af-accent); font-size: 22px }`];var Ur=t=>Object.keys(t?.states??{}).filter(i=>i.startsWith("sensor.")&&/waste|abfall|muell|müll|tonne/i.test(i)&&/_(tage|days)$/.test(i)).map(i=>({entity:i,name:i.replace(/^sensor\.(waste_collection_schedule_)?/,"").replace(/_(tage|days)$/,"").split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")})),Ka=(t,i)=>{let e=i.bins?.length?i.bins:Ur(t),n=new Map;for(let a of e){let s=hn(t,a.entity);if(s==null||s<0||s>Number(i.days??7))continue;let r=a.name||Se(t,a.entity);n.set(s,[...n.get(s)??[],{name:r,color:a.color}])}return[...n.entries()].sort((a,s)=>a[0]-s[0]).map(([a,s])=>({days:a,bins:s}))},Ua=t=>{if(t<=2)return[d("heute"),d("morgen"),d("\xFCbermorgen")][t];if(t>=7)return d("in {n} Tagen",{n:t});let i=new Date;return i.setDate(i.getDate()+t),d("am {day}",{day:i.toLocaleDateString(te(),{weekday:"long"})})},Vr=t=>(t??[]).flatMap(i=>[i.entity??"",...Vr(i.conditions)]).filter(Boolean),Hr=520,Pd=["on","run","running","printing","prepare","pause","paused","delayedstart","cleaning"],Od=(t,i)=>{let e=H(t,i);if(!e||["unknown","unavailable",""].includes(e.state))return null;if(e.attributes.device_class==="timestamp"||/^\d{4}-\d{2}-\d{2}T/.test(e.state)){let s=re(e.state),r=s?s.getTime()-Date.now():0;return r>0?r:null}let n=parseFloat(e.state);if(!Number.isFinite(n)||n<=0)return null;let a=String(e.attributes.unit_of_measurement??"min");return n*(a==="h"?36e5:a==="s"?1e3:6e4)},Nn=class extends J{constructor(){super(...arguments);this.turn=0;this.shown=!1;this.events=[];this.eventsKey="";this.lastParts=new Map;this.leaving=new Map;this.rects=new Map}connectedCallback(){super.connectedCallback(),this.turnTimer=window.setInterval(()=>{(this.options.items??[]).some(e=>e.type==="waste")&&(this.turn++,this.requestUpdate())},6e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.turnTimer)}updated(e){super.updated(e);for(let n of this.renderRoot.querySelectorAll(".part")){let a=n.dataset.key?this.rects.get(n.dataset.key):void 0;if(a&&this.shown&&!n.classList.contains("out")){let r=n.getBoundingClientRect(),o=a.left-r.left,l=a.top-r.top;(Math.abs(o)>1||Math.abs(l)>1)&&n.animate([{transform:`translate(${o}px, ${l}px)`},{transform:"none"}],{duration:700,easing:"cubic-bezier(0.22, 0.8, 0.24, 1)"})}let s=(n.textContent??"").replace(/\s+/g," ").trim();this.shown&&n.dataset.text!==s&&!n.querySelector(".rot")&&!n.classList.contains("out")&&(n.classList.remove("in"),n.offsetWidth,n.classList.add("in")),n.dataset.text=s}this.shown=!0}watched(){return(this.options.items??[]).flatMap(e=>[e.entity,e.remaining,e.progress,e.detail,...e.entities??[],...(e.list??[]).map(n=>n.entity),...Vr(e.show_if),...e.type==="waste"?(e.bins?.length?e.bins:Ur(this.hass)).map(n=>n.entity):[]])}agenda(e){let n=e.entities?.length?e.entities:Object.keys(this.hass?.states??{}).filter(b=>b.startsWith("calendar.")).slice(0,3),a=n.join(",");this.hass&&n.length&&An(this.hass,n,2).then(b=>{(b!==this.events||a!==this.eventsKey)&&(this.events=b,this.eventsKey=a,this.requestUpdate())});let s=Date.now(),r=s+Number(e.hours??24)*36e5,o=this.events.filter(b=>{let g=re(b.start)?.getTime()??0;return(re(b.end)?.getTime()??0)>s&&g<r&&!(it(b)&&le(new Date(g))<0)}),l=o.find(b=>!it(b))??o[0];if(!l)return null;let c=re(l.start),h=re(l.end),u=Re(c).replace(/^./,b=>b.toUpperCase()),f=it(l)?`${u}: ${l.summary}`:c.getTime()<=s?d("Jetzt: {what} bis {time}",{what:l.summary,time:Q(h)}):`${u} ${Q(c)} ${l.summary}`;return p`${Ve(e.icon??"calendar")}<span>${f}</span>`}willUpdate(e){super.willUpdate?.(e),this.rects.clear();for(let n of this.renderRoot?.querySelectorAll?.(".part")??[])n.dataset.key&&this.rects.set(n.dataset.key,n.getBoundingClientRect())}render(){let n=(this.options.items??[]).map(r=>r.show_if?.length&&!r.show_if.every(o=>et(this.hass,o))?null:r).map(r=>{if(!r)return null;let o=H(this.hass,r.entity);switch(r.type){case"weather":return o?p`${ie(Le(o.state))}<span class="num">${R(o.attributes.temperature,0)}°</span><span>${je(o.state)}</span>`:null;case"calendar":{let l=Na(this.hass,r.entity,Number(r.days??2));return l?p`<span>${o?.attributes.message??""} ${Re(l)}</span>`:null}case"entity":{if(!o)return null;let l=parseFloat(o.state),c=Number.isFinite(l)?`${R(l,1)}${Wr(o.attributes.unit_of_measurement)}`:o.state;return p`${r.icon?Ve(r.icon):m}<span>${r.name?`${r.name} `:""}${c}</span>`}case"text":return r.text?p`<span>${r.text}</span>`:null;case"agenda":return this.agenda(r);case"status":{if(!o||o.state!==String(r.state??"on"))return null;let l=(r.list??[]).filter(h=>H(this.hass,h.entity)?.state==="on");if(r.list?.length&&!l.length)return null;let c=l.map(h=>h.name??Se(this.hass,h.entity)).join(", ");return p`${Ve(r.icon??"info")}<span>${r.text??r.name??Se(this.hass,r.entity)}${c?` \xB7 ${c}`:""}</span>`}case"device":{let l=r.state?r.state.split(",").map(b=>b.trim()):Pd;if(!o||!l.includes(o.state))return null;let c=ce(this.hass,r.progress),h=Od(this.hass,r.remaining),u=be(this.hass,r.detail),f=[r.name??Se(this.hass,r.entity),u&&!["unknown","unavailable"].includes(String(u))?String(u):"",c!=null?`${R(c,0)} %`:"",h!=null?r.show_end?d("fertig {time}",{time:Q(new Date(Date.now()+h))}):d("noch {time}",{time:yi(h)}):"",o.state.startsWith("pause")?d("pausiert"):""].filter(Boolean);return p`${Ve(r.icon??"washer")}<span>${f.join(" \xB7 ")}</span>`}case"media":{let c=(r.entities?.length?r.entities:r.entity?[r.entity]:[]).map(b=>H(this.hass,b)).find(b=>b?.state==="playing");if(!c)return null;let h=c.attributes,u=[h.media_title,h.media_series_title??h.media_artist].filter(Boolean).join(" \u2013 ");if(!u)return null;let f=`${u}${h.app_name?` (${h.app_name})`:""}`;return p`${Ve(r.icon??"tv")}<span>${r.name??String(h.friendly_name??"").replace(/\s+/g," ")}: ${f}</span>`}case"waste":{let l=Ka(this.hass,r);if(!l.length)return null;let c=l[this.turn%l.length],h=c.bins.map(f=>f.name),u=h.length>1?`${h.slice(0,-1).join(", ")} ${d("und")} ${h.at(-1)}`:h[0];return We(`${c.days}|${u}`,p`<span class="rot">${Ve(r.icon??"bin")}${c.bins.some(f=>f.color)?c.bins.map(f=>p`<i class="bin" style="background:${f.color??"var(--af-ink-3)"}"></i>`):m}<span>${u} ${Ua(c.days)}</span></span>`)}default:return null}}),a=Date.now();n.forEach((r,o)=>{let l=String(o);r?(this.lastParts.set(l,r),this.leaving.delete(l)):this.lastParts.has(l)&&this.shown&&!this.leaving.has(l)&&(this.leaving.set(l,{tpl:this.lastParts.get(l),until:a+Hr}),this.lastParts.delete(l),window.setTimeout(()=>this.requestUpdate(),Hr+20))});for(let[r,o]of this.leaving)o.until<=a&&this.leaving.delete(r);let s=n.map((r,o)=>{let l=String(o),c=this.leaving.get(l);return r?{key:l,tpl:r,out:!1}:c?{key:l,tpl:c.tpl,out:!0}:null}).filter(r=>!!r);return p`<div class="line">
      ${Vt(s,r=>r.key,(r,o)=>p`<span class="part ${r.out?"out":""}" data-key=${r.key}>${o?p`<span class="dot"></span>`:m}${r.tpl}</span>`)}
    </div>`}};Nn.styles=[U,pt,O`
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
    `];F("af-value",_n);F("af-rooms",Cn);F("af-status",Ln);F("af-calendar",Mn);F("af-infoline",Nn);var jt=O`
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
`,Va=t=>t?.state==="on",zn=class extends J{watched(){let i=this.options;return[i.battery,i.range,i.charging,i.plugged,i.charger_power,i.time_full,i.location,i.lock,i.limit,i.inside_temp]}render(){let i=this.options,e=this.hass,n=ce(e,i.battery),a=ce(e,i.range),s=ce(e,i.limit),r=H(e,i.location),o=Va(H(e,i.charging)),l=Va(H(e,i.plugged)),c=ce(e,i.charger_power),h=re(be(e,i.time_full)),u=H(e,i.lock),f=ce(e,i.inside_temp),b=Da(e,r?.state),g=H(e,"zone.home");if(r&&r.state!=="home"&&g&&r.attributes.latitude!=null){let S=za(g.attributes.latitude,g.attributes.longitude,r.attributes.latitude,r.attributes.longitude);b=`${b} \xB7 ${R(S,S<10?1:0)} km`}let v=o?p`${G("charge")}${d("L\xE4dt")}${c?` \xB7 ${R(c,1)} kW`:""}${h?` \xB7 ${d("voll um {time}",{time:Q(h)})}`:""}`:l?p`${G("plug")}${d("Angesteckt")}`:p`${G("car")}${r?.state==="home"?d("Steht zuhause"):d("Unterwegs")}`;return p`<div class="head">
        <div class="label">${i.name??d("Auto")}</div>
        ${r?p`<div class="place">${G("pin")}${b}</div>`:m}
      </div>
      <div class="car">${G("car")}</div>
      <div class="main">
        <div class="pct display num">${R(n,0)}<small>%</small></div>
        ${a!=null?p`<div class="km display num">${R(a,0)}<small>km</small></div>`:m}
      </div>
      <div class="battery">
        <i style="width:${Math.max(0,Math.min(100,n??0))}%"></i>
        ${s!=null&&s<100?p`<b style="left:${s}%"></b>`:m}
      </div>
      <div class="status">${v}</div>
      <div class="facts num">
        ${u?p`<span>${G(u.state==="locked"?"lock":"unlock")}${u.state==="locked"?d("Verriegelt"):d("Offen")}</span>`:m}
        ${f!=null?p`<span>${G("thermo")}${d("Innen {temp}\xB0",{temp:R(f,0)})}</span>`:m}
        ${s!=null?p`<span>${d("Ladelimit {n} %",{n:R(s,0)})}</span>`:m}
      </div>`}};zn.styles=[U,O`
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
    `];var In=class extends J{watched(){return(this.options.persons??[]).flatMap(i=>[i.entity,i.location])}render(){let i=this.hass,e=H(i,"zone.home"),n=this.options.persons??[];return p`${this.options.label===!1?m:p`<div class="label">${this.options.label??d("Familie")}</div>`}
      ${n.map(a=>{let s=H(i,a.entity);if(!s)return m;let r=a.name??s.attributes.friendly_name??a.entity,o=s.attributes.entity_picture,l=H(i,a.location),c=Da(i,s.state);if(s.state!=="home"){let h=l?.attributes["Sub Locality"]||l?.attributes.Locality;if(h&&s.state==="not_home"&&(c=h),e&&s.attributes.latitude!=null){let u=za(e.attributes.latitude,e.attributes.longitude,s.attributes.latitude,s.attributes.longitude);u>=.3&&(c=`${c} \xB7 ${R(u,u<10?1:0)} km`)}}return p`<div class="row">
          <div class="avatar ${s.state==="home"?"home":""}" style=${o?`background-image:url('${o}')`:""}>${o?"":r.slice(0,1)}</div>
          <div class="grow">
            <div class="a">${r}</div>
            <div class="b">${G(s.state==="home"?"home":"pin")}${c}<span class="since">· ${tt(s.last_changed)}</span></div>
          </div>
        </div>`})}`}};In.styles=[U,jt,O`
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
    `];var Gr={cleaning:"Saugt",docked:"In der Station",returning:"F\xE4hrt zur\xFCck",paused:"Pausiert",idle:"Bereit",error:"St\xF6rung"},Gt=(t,i,e)=>{let n=i.split(".")[1];return e.map(a=>`sensor.${n}_${a}`).find(a=>t?.states[a])},Fd=(t,i)=>{let e=t?.entities,n=e?.[i]?.device_id,a=n?Object.values(e??{}).filter(r=>r.device_id===n&&r.entity_id.startsWith("image.")).map(r=>r.entity_id):[],s=i.split(".")[1];return a.find(r=>/map|karte/.test(r))??a[0]??[`image.${s}_map_0`,`image.${s}_map`].find(r=>t?.states[r])},Pn=class extends J{vacuums(){return(this.options.vacuums??[]).map(i=>({...i,battery:i.battery??Gt(this.hass,i.entity,["batterie","battery"]),status:i.status??Gt(this.hass,i.entity,["status"]),room:i.room??Gt(this.hass,i.entity,["aktueller_raum","current_room"]),progress:i.progress??Gt(this.hass,i.entity,["reinigungsfortschritt","cleaning_progress"]),last_end:i.last_end??Gt(this.hass,i.entity,["letztes_reinigungsende","last_clean_end"]),area:i.area??Gt(this.hass,i.entity,["reinigungsbereich","cleaning_area"]),map:this.options.maps===!1||i.map===!1?void 0:i.map??Fd(this.hass,i.entity)}))}watched(){return this.vacuums().flatMap(i=>[i.entity,i.battery,i.status,i.room,i.progress,i.last_end,i.area,i.map||void 0]).concat(this.options.map)}render(){let i=this.hass,e=this.vacuums(),n=H(i,this.options.map);return p`${this.options.label===!1?m:p`<div class="label">${this.options.label??d("Saugroboter")}</div>`}
      ${e.map(a=>{let s=H(i,a.entity);if(!s)return m;let r=be(i,a.status),o=s.state==="cleaning"||s.state==="returning",l=Gr[s.state]?d(Gr[s.state]):s.state;s.state==="docked"&&r==="charging"&&(l=d("L\xE4dt in der Station"));let c=ce(i,a.battery),h=be(i,a.room),u=ce(i,a.progress),f=re(be(i,a.last_end)),b=ce(i,a.area),g=a.map?H(i,a.map)?.attributes.entity_picture:void 0,v=o?`${h??""}${u?` \xB7 ${R(u,0)} %`:""}`:f?`${d("Zuletzt fertig {when}",{when:`${Re(f)} ${Q(f)}`})}${b?` \xB7 ${R(b,0)} m\xB2`:""}`:"";return p`<div class="row">
          <div class="badge ${o?"active":""}">${G("robot")}</div>
          <div class="grow">
            <div class="a">${a.name??s.attributes.friendly_name??a.entity}</div>
            <div class="b">${l}${v?` \xB7 ${v}`:""}</div>
            ${o&&u!=null?p`<div class="meter progress"><i style="width:${u}%"></i></div>`:m}
          </div>
          ${c!=null?p`<div class="end"><div class="val num">${R(c,0)} %</div><div class="meter"><i style="width:${c}%"></i></div></div>`:m}
          ${g?p`<div class="mini" style="background-image:url('${g}')"></div>`:m}
        </div>`})}
      ${n?.attributes.entity_picture?p`<div class="map"><img src=${n.attributes.entity_picture} alt="Karte" @error=${a=>a.target.style.visibility="hidden"} /></div>`:m}`}};Pn.styles=[U,jt,O`
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
    `];var jr={bio:"#8a6a3d",gelb:"#e3c03a",papier:"#4a86c5",grau:"#8d9196",rest:"#8d9196"},On=class extends J{watched(){return(this.options.bins??[]).flatMap(i=>[i.entity,i.out])}render(){let i=this.options,e=Number(i.highlight??1),n=(i.bins??[]).map(a=>({...a,days:hn(this.hass,a.entity)})).filter(a=>a.days!=null&&a.days>=0).sort((a,s)=>(a.days??99)-(s.days??99)).slice(0,Number(i.max??4));return p`${i.label===!1?m:p`<div class="label">${i.label??d("M\xFCllabfuhr")}</div>`}
      ${n.map(a=>{let s=a.days,r=new Date;r.setDate(r.getDate()+s);let o=a.color??jr[Object.keys(jr).find(c=>a.name.toLowerCase().includes(c))??"rest"],l=s<=2?Re(r):d("in {n} Tagen",{n:R(s,0)});return p`<div class="row ${s<=e?"soon":""}">
          <div class="bin" style="background:${o}"></div>
          <div class="grow">
            <div class="a">${a.name}</div>
            ${a.out&&this.hass?.states[a.out]?.state==="on"?p`<div class="b" style="color:var(--af-good)">${d("Steht drau\xDFen")} ✓</div>`:s===1?p`<div class="b">${d("Heute Abend rausstellen")}</div>`:s===0?p`<div class="b">${d("Wird heute abgeholt")}</div>`:m}
          </div>
          <div class="end"><div class="val">${l}</div><div class="b num">${r.toLocaleDateString(te(),{weekday:"short",day:"numeric",month:"numeric"})}</div></div>
        </div>`})}`}};On.styles=[U,jt,O`
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
    `];var Bd=new Set(["motion","occupancy","presence"]),Rd=/\s*(bewegungsmelder|bewegungssensor|bewegung|anwesenheitssensor|belegung|occupancy|presence|motion)\s*\d*/gi,Fn=class extends J{shouldUpdate(){return!0}sensors(){let i=this.hass;if(!i)return[];let e=this.options,n=new Set(e.exclude??[]);return(Array.isArray(e.entities)?e.entities:Object.keys(i.states).filter(s=>s.startsWith("binary_sensor.")&&Bd.has(i.states[s].attributes.device_class))).filter(s=>!n.has(s)).map(s=>i.states[s]).filter(Boolean)}render(){let i=this.hass,e=this.options,n=Number(e.within??120)*6e4,a=this.sensors().map(o=>({name:i&&wi(i,o.entity_id)||Se(i,o.entity_id).replace(Rd,"").trim()||o.entity_id,on:o.state==="on",at:new Date(o.last_changed)})).filter(o=>o.on||Date.now()-o.at.getTime()<n).sort((o,l)=>Number(l.on)-Number(o.on)||l.at.getTime()-o.at.getTime()),s=new Set,r=a.filter(o=>s.has(o.name)?!1:(s.add(o.name),!0)).slice(0,Number(e.max??3));return e.variant==="list"?p`${e.label===!1?m:p`<div class="label">${e.label??d("Bewegung")}</div>`}
        ${r.length?r.map(o=>p`<div class="row">${G("motion")}<div class="grow"><div class="a">${o.name}</div></div><div class="end b ${o.on?"now":""}">${o.on?d("jetzt"):tt(o.at)}</div></div>`):p`<div class="b">${d("Keine Bewegung in letzter Zeit")}</div>`}`:r.length?p`<div class="line">
      ${G("motion")}
      ${r.map((o,l)=>p`${l?p`<span>·</span>`:m}<b>${o.name}</b><span class=${o.on?"now":""}>${o.on?d("jetzt"):tt(o.at)}</span>`)}
    </div>`:e.hide_empty===!1?p`<div class="line">${G("motion")}${d("Ruhig")}</div>`:m}};Fn.styles=[U,jt,O`
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
    `];var Dn=(t,i)=>{for(let[n,a,s]of i)if(t<=n)return[a,s];let e=i[i.length-1];return[e[1],e[2]]},Hd=(t,i)=>{switch(t.format){case"aqi":return Dn(i,[[50,"gut","good"],[100,"m\xE4\xDFig","warn"],[150,"empfindliche Gruppen","bad"],[1/0,"ungesund","bad"]]);case"uv":return Dn(i,[[2,"niedrig","good"],[5,"m\xE4\xDFig","warn"],[7,"hoch","bad"],[1/0,"sehr hoch","bad"]]);case"lux":return Dn(i,[[10,"dunkel",""],[300,"d\xE4mmrig",""],[5e3,"hell",""],[1/0,"sonnig","warn"]]);case"humidity":return Dn(i,[[34,"trocken","warn"],[60,"gut","good"],[65,"feucht",""],[1/0,"zu feucht","warn"]]);default:return["",""]}},Bn=class extends J{watched(){return(this.options.rows??[]).map(i=>i.entity)}render(){let i=this.options.rows??[];return p`${this.options.label===!1?m:p`<div class="label">${this.options.label??d("Umwelt")}</div>`}
      ${i.map(e=>{let n=H(this.hass,e.entity);if(!n)return m;let a=be(this.hass,e.entity,e.attribute),s,r=["",""];if(e.format==="rain"||e.format==="onoff"||n.entity_id.startsWith("binary_sensor.")){let o=a==="on";s=o?e.on_text??(e.format==="rain"?d("Regnet"):d("An")):e.off_text??(e.format==="rain"?d("Trocken"):d("Aus")),r=o?["",e.format==="rain"?"warn":""]:["",""]}else{let o=parseFloat(String(a)),l=e.unit??(e.attribute?"":n.attributes.unit_of_measurement??"");s=Number.isFinite(o)?`${R(o,e.decimals??(Math.abs(o)>=100?0:1))}${l?` ${l}`:""}`:String(a??"\u2013"),Number.isFinite(o)&&(r=Hd(e,o))}return p`<div class="row">
          ${G(e.icon??"info")}
          <div class="grow"><div class="a">${e.name??n.attributes.friendly_name??e.entity}</div></div>
          <div class="end"><div class="val num ${r[0]?"":r[1]}">${s}</div>${r[0]?p`<div class="q ${r[1]}">${d(r[0])}</div>`:m}</div>
        </div>`})}`}};Bn.styles=[U,jt,O`
      .q {
        font-size: calc(16px * var(--af-fs, 1));
        margin-top: 4px;
      }
    `];var Wd={minor:["Hinweis","warn"],moderate:["Warnung","warn"],severe:["Unwetter","bad"],extreme:["Extrem","bad"]},Rn=class extends J{watched(){return this.options.entities??[]}render(){let i=(this.options.entities??[]).map(e=>H(this.hass,e)).filter(e=>Va(e));return p`${this.options.label===!1?m:p`<div class="label">${this.options.label??d("Warnungen")}</div>`}
      ${i.length?i.map(e=>{let n=e.attributes,[a,s]=Wd[String(n.severity??"").toLowerCase()]??["Warnung","warn"],r=d(a),o=re(n.expires);return p`<div class="row">
              <span class=${s}>${G("warning")}</span>
              <div class="grow">
                <div class="a">${n.headline??n.friendly_name}</div>
                <div class="b ${s}">${r}${o?` \xB7 ${d("bis {when}",{when:`${Re(o)} ${Q(o)}`})}`:""}</div>
                ${n.description?p`<div class="desc">${n.description}</div>`:m}
              </div>
            </div>`}):p`<div class="calm">${G("check")}${this.options.calm_text??d("Keine Warnungen")}</div>`}`}};Rn.styles=[U,jt,O`
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
    `];F("af-car",zn);F("af-persons",In);F("af-vacuum",Pn);F("af-waste",On);F("af-activity",Fn);F("af-list",Bn);F("af-warnings",Rn);var qr,Kd=(t,i)=>customElements.get("ha-camera-stream")?Promise.resolve(!0):window.loadCardHelpers?(qr??=(async()=>{try{let n=await(await window.loadCardHelpers()).createCardElement({type:"picture-entity",entity:i,camera_view:"live",show_name:!1,show_state:!1});n.hass=t,n.style.cssText="position:fixed;left:-9999px;width:10px;height:10px;opacity:0;pointer-events:none",document.body.appendChild(n);let a=await Promise.race([customElements.whenDefined("ha-camera-stream").then(()=>!0),new Promise(s=>setTimeout(()=>s(!1),8e3))]);return n.remove(),a}catch{return!1}})(),qr):Promise.resolve(!1),Yr=t=>{let i=t.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([\w-]{11})/);if(i)return{kind:"youtube",id:i[1]};let e=t.match(/youtube\.com\/channel\/(UC[\w-]+)/);return e?{kind:"youtube",id:`live_stream?channel=${e[1]}`}:/\.m3u8(\?|$)/i.test(t)?{kind:"hls"}:/mjpe?g|video\.cgi|faststream|nphMotionJpeg/i.test(t)?{kind:"mjpeg"}:{kind:"image"}},Ga=t=>{let i=Yr(t);return i.kind==="image"?[t]:i.kind==="youtube"&&i.id&&!i.id.startsWith("live_stream")?[`https://i.ytimg.com/vi/${i.id}/maxresdefault_live.jpg`,`https://i.ytimg.com/vi/${i.id}/hqdefault_live.jpg`]:null},Kn=[["https://www.youtube.com/watch?v=w3zcgctSvFA","Norderney \u2013 Hafen und Wattenmeer (Livebild von YouTube)"],["https://www.youtube.com/watch?v=OmyDLXvaus4","Hamburg \u2013 Michel mit Hafenpanorama (Livebild von YouTube)"],["https://www.youtube.com/watch?v=JwEoLt8NXU8","Hamburg \u2013 Stadt (Livebild von YouTube)"],["https://www.youtube.com/watch?v=SZp1Q6LX7Wk","Cuxhaven-Duhnen \u2013 Strand und Watt (Livebild von YouTube)"],["https://www.youtube.com/watch?v=EH6GNSEvmQE","Renesse \u2013 Strand (Livebild von YouTube)"],["https://webcam.datacreate.de/hasenhorn/webcam-hasenhorn.jpg","Todtnau im Schwarzwald \u2013 Ort und Hasenhorn (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1615294555/original.jpg","Amrum \u2013 Nebel, Blick aufs Wattenmeer und die Halligen (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1279200146/original.jpg","Feldberg im Schwarzwald \u2013 Todtnauer H\xFCtte (Bild)"],["https://imgproxy.windy.com/_/full/plain/current/1595461776/original.jpg","Bostalsee im Saarland \u2013 Westufer mit Segelhafen (Bild)"],["https://www.foto-webcam.eu/webcam/zugspitze/current/1200.jpg","Zugspitze (Bild, alle 10 min)"],["https://www.foto-webcam.eu/webcam/wendelstein-ost/current/1200.jpg","Wendelstein Ost (Bild, alle 10 min)"],["https://www.foto-webcam.eu/webcam/herzogstand/current/1200.jpg","Herzogstand \u2013 Kochel- und Walchensee (Bild)"],["https://www.foto-webcam.eu/webcam/muenchen/current/1200.jpg","M\xFCnchen \u2013 Panorama (Bild)"]],Si=class extends se{constructor(){super(...arguments);this.mode="live";this.osd="";this.refresh=0;this.native=!1;this.broken=!1;this.onBroken=()=>{this.isConnected&&(this.broken=!0,this.src=void 0,clearTimeout(this.retryTimer),this.retryTimer=window.setTimeout(()=>this.broken=!1,2e4))};this.onLoaded=()=>{this.broken&&(this.broken=!1)}}willUpdate(e){if(e.has("entity")&&(this.src=void 0),e.has("url")&&(this.shown=void 0,this.url&&Ga(this.url)&&this.loadWebcamImage()),e.has("refresh")||e.has("url")){clearInterval(this.refreshTimer);let n=this.url?this.refresh||60:this.refresh;n>0&&(this.refreshTimer=window.setInterval(()=>{this.url?this.loadWebcamImage():(this.src=void 0,this.requestUpdate())},n*1e3))}this.hass&&this.entity&&!this.url&&this.mode==="live"&&!this.native&&Kd(this.hass,this.entity).then(n=>{n&&!this.native&&(this.native=!0)})}loadWebcamImage(e=this.url?Ga(this.url):null){let n=this.url;if(!n||!e?.length)return;let[a,...s]=e,r=`${a}${a.includes("?")?"&":"?"}_=${Math.floor(Date.now()/1e3)}`,o=new Image;o.onload=()=>{this.url===n&&(this.shown=r)},o.onerror=()=>{this.url===n&&s.length&&this.loadWebcamImage(s)},o.src=r}renderWebcam(e){if(Ga(e))return this.shown?p`<img src=${this.shown} alt="" />`:p`<div class="ph"><span>${this.osd}</span></div>`;let n=Yr(e);switch(n.kind){case"youtube":{let a=n.id.startsWith("live_stream"),s="autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0&iv_load_policy=3",r=a?`https://www.youtube-nocookie.com/embed/${n.id}&${s}`:`https://www.youtube-nocookie.com/embed/${n.id}?${s}&loop=1&playlist=${n.id}`;return p`<iframe src=${r} allow="autoplay; encrypted-media" title="Webcam"></iframe>`}case"hls":return p`<video src=${e} autoplay muted playsinline loop></video>`;case"mjpeg":return this.broken?this.renderBroken():p`<img src=${e} alt="" @error=${this.onBroken} />`;default:return this.shown?p`<img src=${this.shown} alt="" />`:p`<div class="ph"><span>${this.osd}</span></div>`}}renderBroken(){return p`<div class="ph"><span>${this.osd}</span></div>`}render(){if(this.url)return this.renderWebcam(this.url);let e=H(this.hass,this.entity);if(this.broken)return this.renderBroken();if(e&&this.entity?.startsWith("image.")){let a=e.attributes.entity_picture;return a?p`<img src=${a} alt="" style="object-fit:contain;background:var(--af-surface)" @error=${this.onBroken} @load=${this.onLoaded} />`:p`<div class="ph"><span>${this.osd}</span></div>`}if(!e)return p`<div class="ph"><span>${this.osd}</span></div>`;if(this.mode==="live"&&this.native)return p`<ha-camera-stream .hass=${this.hass} .stateObj=${e} .muted=${!0} .controls=${!1} .fitMode=${"cover"} allow-exoplayer></ha-camera-stream>`;let n=e.attributes.access_token;if(!this.src&&n){let a=this.mode==="live"?"camera_proxy_stream":"camera_proxy";this.src=`/api/${a}/${this.entity}?token=${n}${this.mode==="snapshot"?`&t=${Date.now()}`:""}`}return this.src?p`<img src=${this.src} alt="" @error=${this.onBroken} @load=${this.onLoaded} />`:p`<div class="ph"><span>${this.osd}</span></div>`}disconnectedCallback(){super.disconnectedCallback(),this.renderRoot.querySelector("img")?.setAttribute("src","data:,"),clearInterval(this.refreshTimer),clearTimeout(this.retryTimer),this.src=void 0}};Si.properties={hass:{attribute:!1},entity:{},url:{},mode:{},osd:{},refresh:{type:Number},native:{state:!0},shown:{state:!0},broken:{state:!0}},Si.styles=O`
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
  `;var Hn=class extends ne{shouldUpdate(){return!0}render(){let i=this.options.radius??28,e=this.options,n=e.text?this.hass?.states[e.text]:void 0,a=n?.state,s=n&&a&&a!=="unknown"&&a!=="unavailable"?this.hass?.formatEntityState?.(n)??a:void 0;return p`<af-camera-view style="--af-radius:${i}px" .hass=${this.hass} .entity=${e.url?void 0:e.entity} .url=${e.url}
        .mode=${e.mode??"live"} .refresh=${Number(e.refresh??0)} .osd=${e.url?"WEBCAM":"KAMERA"}></af-camera-view>
      ${e.title||s?p`<div class="cap">${e.title?p`<b>${e.title}</b>`:""}${s?p`<span>${s}</span>`:""}</div>`:""}`}};Hn.styles=[U,O`
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
    `];var Wn=class extends ne{constructor(){super(...arguments);this.cardKey="";this.error=""}shouldUpdate(){return!0}updated(){let e=JSON.stringify(this.options.card??null);e!==this.cardKey&&(this.cardKey=e,this.createCard()),this.card&&this.hass&&(this.card.hass=this.hass)}async createCard(){let e=this.options.card;if(this.card=void 0,this.error="",!e?.type)this.error=d("Keine Karte konfiguriert");else if(!window.loadCardHelpers)this.error=d("Karte \u201E{type}\u201C (nur in Home Assistant sichtbar)",{type:String(e.type)});else try{let n=await window.loadCardHelpers();this.card=await n.createCardElement(e),this.card.hass=this.hass}catch(n){this.error=d("Karte nicht ladbar: {error}",{error:String(n)})}this.requestUpdate()}render(){return this.card??(this.error?p`<div class="hint">${this.error}</div>`:m)}};Wn.styles=[U,O`
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
    `];F("af-camera-view",Si);F("af-camera",Hn);F("af-card",Wn);var qt=O`
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
`,Un=class extends J{constructor(){super(...arguments);this.events=[];this.loadedAt=0;this.loading=!1}shouldUpdate(){return!0}async load(){let e=this.options.calendars??[];if(!(!this.hass||!e.length||this.loading)){this.loading=!0;try{let n=await this.hass.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:e},service_data:{duration:{days:Number(this.options.days??7)}},return_response:!0});this.events=Object.entries(n.response??{}).flatMap(([a,s])=>s.events.map(r=>({...r,calendar:a}))).sort((a,s)=>(re(a.start)?.getTime()??0)-(re(s.start)?.getTime()??0))}catch{this.events=[]}finally{this.loadedAt=Date.now(),this.loading=!1,this.requestUpdate()}}}render(){Date.now()-this.loadedAt>10*6e4&&this.load();let e=this.options,n=Date.now(),a=this.events.filter(o=>(re(o.end)?.getTime()??0)>n).slice(0,Number(e.max??6)),s=e.label===!1?m:p`<div class="label">${e.label??d("Termine")}</div>`;if(!a.length)return p`${s}<div class="calm">${G("check")}${this.loadedAt?e.empty_text??d("Keine Termine in den n\xE4chsten Tagen"):d("L\xE4dt \u2026")}</div>`;let r="";return p`${s}
      ${a.map(o=>{let l=re(o.start),c=!o.start.includes("T"),h=l.toDateString(),u=h!==r?p`<div class="day">${le(l)<=2?Re(l):l.toLocaleDateString(te(),{weekday:"long",day:"numeric",month:"long"})}</div>`:m;return r=h,p`${u}
          <div class="row">
            <div class="time num ${c?"allday":""}">${c?d("ganztags"):Q(l)}</div>
            <div class="grow">
              <div class="a">${o.summary}</div>
              ${e.location!==!1&&o.location?p`<div class="b">${o.location.split(",")[0]}</div>`:m}
            </div>
          </div>`})}`}};Un.styles=[U,qt,O`
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
    `];var Ud=t=>{let i=Number(t.attributes.media_position);if(!Number.isFinite(i))return;let e=t.attributes.media_position_updated_at;return t.state==="playing"&&e&&(i+=(Date.now()-new Date(e).getTime())/1e3),i},Zr=t=>{let i=Math.max(0,Math.round(t)),e=Math.floor(i/3600),n=Math.floor(i%3600/60),a=String(i%60).padStart(2,"0");return e?`${e}:${String(n).padStart(2,"0")}:${a}`:`${n}:${a}`},Vn=class extends J{disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.secTimer)}shouldUpdate(){return!0}tickEverySecond(i){i&&!this.secTimer&&(this.secTimer=window.setInterval(()=>this.requestUpdate(),1e3)),!i&&this.secTimer&&(clearInterval(this.secTimer),this.secTimer=void 0)}renderFull(i){let e=i.attributes,n=e.entity_picture,a=Number(e.media_duration),s=Ud(i),r=a>0&&s!=null,o=r?Math.min(1,Math.max(0,s/a)):0,l=[e.friendly_name,i.state==="paused"?d("pausiert"):""].filter(Boolean).join(" \xB7 ");return p`<div class="full">
      <div class="art">
        ${n?p`<div class="glow" style="background-image:url('${n}')"></div>`:m}
        <div class="pic" style=${n?`background-image:url('${n}')`:""}>${n?"":G("mdi:music")}</div>
      </div>
      <div class="text">
        ${this.options.label===!1?m:p`<div class="label">${this.options.label??d("L\xE4uft gerade")}${l?` \xB7 ${l}`:""}</div>`}
        <div class="title display">${e.media_title??e.app_name??d("Musik")}</div>
        ${e.media_artist?p`<div class="artist">${e.media_artist}</div>`:m}
        ${e.media_album_name?p`<div class="album">${e.media_album_name}</div>`:m}
        ${r?p`<div class="prog">
              <div class="bar"><i style="transform:scaleX(${o})"></i></div>
              <div class="times num"><span>${Zr(s)}</span><span>−${Zr(a-s)}</span></div>
            </div>`:m}
      </div>
    </div>`}render(){let i=this.options,e=(i.entities??[]).map(o=>H(this.hass,o)).filter(o=>!!o),n=e.find(o=>o.state==="playing")??(i.show_paused?e.find(o=>o.state==="paused"):void 0);if(this.tickEverySecond(i.variant==="full"&&n?.state==="playing"),n&&i.variant==="full")return this.renderFull(n);let a=i.label===!1?m:p`<div class="label">${i.label??d("L\xE4uft gerade")}</div>`;if(!n)return p`${a}<div class="calm">${G("check")}${i.empty_text??d("Gerade l\xE4uft nichts")}</div>`;let s=n.attributes,r=s.entity_picture;return p`${a}
      <div class="wrap">
        <div class="cover" style=${r?`background-image:url('${r}')`:""}>${r?"":G("mdi:music")}</div>
        <div class="grow">
          <div class="title display">${s.media_title??s.app_name??d("Musik")}</div>
          ${s.media_artist?p`<div class="artist">${s.media_artist}</div>`:m}
          <div class="where"><i></i>${s.friendly_name}${n.state==="paused"?` \xB7 ${d("pausiert")}`:""}${s.source?` \xB7 ${s.source}`:""}</div>
        </div>
      </div>`}};Vn.styles=[U,qt,O`
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
    `];var Gn=class extends J{watched(){return(this.options.items??[]).flatMap(i=>[i.running,i.power,i.progress,i.end,i.cost])}render(){let i=this.options,e=this.hass,n=(i.items??[]).filter(s=>H(e,s.running)?.state==="on"),a=i.label===!1?m:p`<div class="label">${i.label??d("Ger\xE4te")}</div>`;return n.length?p`${a}
      ${n.map(s=>{let r=re(H(e,s.running)?.last_changed),o=ce(e,s.power),l=ce(e,s.progress),c=re(be(e,s.end)),h=ce(e,s.cost),u=[r?d("seit {time}",{time:Q(r)}):"",c?d("fertig {time}",{time:Q(c)}):"",o!=null?`${R(o,0)} W`:"",h!=null&&h>0?`${R(h,2)} \u20AC`:""].filter(Boolean);return p`<div class="row">
          ${G(s.icon??"washer")}
          <div class="grow">
            <div class="a">${s.name}</div>
            <div class="b num">${u.join(" \xB7 ")}</div>
            ${l!=null?p`<div class="meter"><i style="width:${l}%"></i></div>`:m}
          </div>
          ${l!=null?p`<div class="end num">${R(l,0)} %</div>`:m}
        </div>`})}`:p`${a}<div class="calm">${G("check")}${i.empty_text??d("Nichts l\xE4uft gerade")}</div>`}};Gn.styles=[U,qt];var jn=class extends J{watched(){return(this.options.covers??[]).map(i=>i.entity)}render(){let i=this.options,e=(i.covers??[]).map(l=>({...l,s:H(this.hass,l.entity)})).filter(l=>l.s),n=l=>{let c=l.s,h=typeof c.attributes.current_position=="number"?c.attributes.current_position:c.state==="closed"||c.state==="closing"?0:c.state==="open"||c.state==="opening"?100:null;return h!=null&&l.invert&&(h=100-h),h},a=l=>l.s.attributes.device_class==="awning",s=e.filter(l=>!a(l)),r=s.filter(l=>(n(l)??100)<10).length,o=i.only_open?e.filter(l=>(n(l)??100)>=10):e;return p`${i.label===!1?m:p`<div class="label">${i.label??d("Rolll\xE4den")}</div>`}
      ${s.length?p`<div class="sum display num">${r}<small>${d("von {n} geschlossen",{n:s.length})}</small></div>`:m}
      ${o.map(l=>{let c=n(l),h=a(l),u=c!=null&&c<=2,f=h?c!=null&&c>2?"awning_out":"awning":u?"shutter":"shutter_open",b=c==null?"\u2013":h?c<=2?d("eingefahren"):c>=98?d("ausgefahren"):`${R(c,0)} %`:c>=98?d("offen"):c<=2?d("zu"):`${R(c,0)} %`;return p`<div class="row ${u?"shut":""}">
          ${G(f)}
          <div class="grow">
            <div class="a">${l.name??l.s.attributes.friendly_name}</div>
            ${c!=null&&c>2&&c<98?p`<div class="pos"><i style="width:${h?c:100-c}%"></i></div>`:m}
          </div>
          <div class="end num">${b}</div>
        </div>`})}`}};jn.styles=[U,qt,O`
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
    `];var qn=class extends J{watched(){let{devices:i,low:e}=Ia(this.hass,this.options);return[...i.flatMap(n=>[n.id,n.id.replace(/_level$/,"_state")]),...e.map(n=>n.id)]}row(i,e){let n=Number(this.options.threshold??21),a=i.level!=null&&i.level<n;return p`<div class="row ${e?"lowrow":""}">
      ${G(e||i.kind==="other"?"battery":i.kind)}
      <div class="grow">
        <div class="a">${i.name}${i.charging?G("bolt","bolt"):m}</div>
        ${i.level!=null&&!e?p`<div class="meter"><i class=${i.charging?"charging":a?"low":""} style="width:${Math.max(2,Math.min(100,i.level))}%"></i></div>`:m}
      </div>
      <div class="end pct num">${i.level!=null?`${R(i.level,0)} %`:d("schwach")}</div>
    </div>`}render(){let i=this.options,{devices:e,low:n}=Ia(this.hass,i),a=i.part??"both",s=Number(i.max??(a==="low"?7:5)),r=a==="low"?d("Batterie wechseln"):d("Akkus"),o=i.label===!1?m:p`<div class="label">${i.label??r}</div>`,l=n.length?p`${a==="both"?p`<div class="sub">${d("Batterie wechseln")}</div>`:m}
          ${n.slice(0,s).map(c=>this.row(c,!0))}
          ${n.length>s?p`<div class="more">${d("+ {n} weitere",{n:n.length-s})}</div>`:m}`:p`<div class="calm">${G("check")}${a==="low"?d("Alle Batterien in Ordnung"):d("Zubeh\xF6r: alle Batterien in Ordnung")}</div>`;return p`${o} ${a!=="low"?e.map(c=>this.row(c,!1)):m} ${a!=="devices"?l:m}`}};qn.styles=[U,qt,O`
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
    `];var Yn=class extends J{constructor(){super(...arguments);this.rows=[];this.loaded=!1;this.key=""}willUpdate(){let e=`${new Date().toDateString()}|${Math.floor(Date.now()/6e5)}|${JSON.stringify([this.options.devices,this.options.exclude])}`;this.hass&&e!==this.key&&(this.key=e,this.load())}async devices(){let e=(this.options.devices??[]).filter(n=>n.entity);if(e.length)return e.map(n=>({id:n.entity,name:n.name}));try{return((await this.hass.callWS({type:"energy/get_prefs"})).device_consumption??[]).map(a=>({id:a.stat_consumption,name:a.name}))}catch{return[]}}async load(){let e=new Set(this.options.exclude??[]),n=(await this.devices()).filter(s=>!e.has(s.id)),a=await Promise.all(n.map(async s=>{try{let r=await this.hass.callWS({type:"recorder/statistic_during_period",statistic_id:s.id,calendar:{period:"day"},types:["change"]}),o=typeof r.change=="number"?r.change:NaN,l=String(H(this.hass,s.id)?.attributes.unit_of_measurement??"kWh");if(l==="Wh"&&(o/=1e3),l==="MWh"&&(o*=1e3),!Number.isFinite(o)||o<=0)return null;let c=s.name||String(H(this.hass,s.id)?.attributes.friendly_name??s.id).replace(/\s*(energie|energy|energieverbrauch|verbrauch)$/i,"");return{id:s.id,name:c,kwh:o}}catch{return null}}));this.rows=a.filter(s=>!!s).sort((s,r)=>r.kwh-s.kwh),this.loaded=!0,this.requestUpdate()}render(){let e=this.options,n=this.rows.slice(0,Number(e.count??3)),a=n[0]?.kwh??1,s=e.label===!1?m:p`<div class="label">${e.label??d("Gr\xF6\xDFte Verbraucher heute")}</div>`;return n.length?p`${s}
      ${n.map((r,o)=>p`<div class="row">
          <div class="rank num">${o+1}</div>
          <div class="grow">
            <div class="a">${r.name}</div>
            <div class="meter"><i style="width:${Math.max(3,r.kwh/a*100)}%"></i></div>
          </div>
          <div class="end pct num">${R(r.kwh,r.kwh<10?2:1)} kWh</div>
        </div>`)}`:p`${s}<div class="calm">${G("plug")}${this.loaded?d("Heute noch kein Verbrauch gemessen"):d("Wird berechnet \u2026")}</div>`}};Yn.styles=[U,qt,O`
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
    `];F("af-agenda",Un);F("af-consumers",Yn);F("af-batteries",qn);F("af-media",Vn);F("af-appliances",Gn);F("af-covers",jn);var to=Gs(ja(),1);var Ti=(t=new Date)=>new Date(t.getFullYear(),t.getMonth(),t.getDate()),Vd=t=>t.toLocaleDateString(te(),{weekday:"short"}).replace(".",""),Ai=class extends J{constructor(){super(...arguments);this.times=[];this.history=[];this.loadedFor="";this.loadedAt=0}watched(){return[this.options.visits]}willUpdate(){let e=H(this.hass,this.options.visits)?.state??"";this.hass&&this.options.visits&&(e!==this.loadedFor||Date.now()-this.loadedAt>30*6e4)&&(this.loadedFor=e,this.loadedAt=Date.now(),this.load())}async load(){let e=this.hass,n=this.options.visits,a=Number(this.options.days??7);try{let r=(await e.callWS({type:"history/history_during_period",start_time:Ti().toISOString(),entity_ids:[n],minimal_response:!0,no_attributes:!0}))[n]??[],o=[],l=NaN;for(let c of r){let h=parseFloat(c.s),u=(c.lc??c.lu??0)*1e3;Number.isFinite(h)&&Number.isFinite(l)&&h>l&&u&&o.push(new Date(u)),Number.isFinite(h)&&(l=h)}this.times=o}catch{}try{let s=Ti(new Date(Date.now()-(a-1)*864e5)),r=await e.callWS({type:"recorder/statistics_during_period",statistic_ids:[n],period:"day",start_time:s.toISOString(),types:["change"]});this.history=(r[n]??[]).map(o=>({day:new Date(o.start),count:Math.max(0,Math.round(o.change??0))}))}catch{this.history=[]}}render(){let e=this.options,n=H(this.hass,e.visits),a=n?Math.round(parseFloat(n.state)):NaN,s=this.times.at(-1),r=u=>Ti(u).getTime()===Ti().getTime(),o=this.history.map(u=>r(u.day)&&Number.isFinite(a)?{...u,count:a}:u),l=Math.max(1,...o.map(u=>u.count)),c=o.filter(u=>!r(u.day)),h=c.length?c.reduce((u,f)=>u+f.count,0)/c.length:NaN;return p`<div class="wrap">
      <div class="left">
        <div class="head">${G(e.icon??"cat")}<span>${e.name??d("Haustier")}</span></div>
        <div class="big display num">${Number.isFinite(a)?a:"\u2013"}<span style="font-size:.4em">×</span></div>
        <div class="unit">${e.unit??d("Besuche heute")}</div>
        ${s?p`<div class="last">${d("zuletzt {time}",{time:Q(s)})} · ${tt(s)}</div>`:m}
        ${this.times.length?p`<div class="times">${this.times.map(u=>p`<span class="num">${Q(u)}</span>`)}</div>`:m}
      </div>
      ${o.length>1?p`<div class="chart">
            <div class="label">${e.label??d("Letzte Tage")}</div>
            <div class="bars">
              ${o.map(u=>p`<div class="bar ${r(u.day)?"today":""}">
                  <b class="num">${u.count}</b>
                  <i style="height:${Math.max(4,u.count/l*150)}px"></i>
                  <span>${Vd(u.day)}</span>
                </div>`)}
            </div>
            ${Number.isFinite(h)?p`<div class="avg">${d("\xD8 {n} pro Tag",{n:R(h,1)})}</div>`:m}
          </div>`:m}
    </div>`}};Ai.properties={...ne.properties,times:{state:!0},history:{state:!0}},Ai.styles=[U,O`
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
    `];var Ei=class extends J{constructor(){super(...arguments);this.values={};this.key=""}get offset(){return new Date().getHours()<Number(this.options.switch_hour??18)?-1:0}willUpdate(){let e=`${Ti().getTime()}|${this.offset}|${Math.floor(Date.now()/9e5)}|${JSON.stringify(this.options.groups??[])}`;this.hass&&e!==this.key&&(this.key=e,this.load())}async stat(e,n){try{let s=(await this.hass.callWS({type:"recorder/statistic_during_period",statistic_id:e,calendar:{period:"day",offset:this.offset},types:[n]}))[n];return typeof s=="number"&&Number.isFinite(s)?s:null}catch{return null}}async load(){let e=(this.options.groups??[]).flatMap(a=>a.rows??[]),n=await Promise.all(e.map(async a=>{let s=await this.stat(a.entity,a.type??"change"),r=a.cost?await this.stat(a.cost,"change"):s!=null&&a.price!=null?s*a.price:null;return[`${a.entity}|${a.cost??""}`,{value:s,cost:r}]}));this.values=Object.fromEntries(n)}unitOf(e){return e.unit??H(this.hass,e.entity)?.attributes.unit_of_measurement??""}render(){let e=this.options,n=new Date(Date.now()+this.offset*864e5),a=this.offset<0?d("Gestern, {date}",{date:n.toLocaleDateString(te(),{weekday:"long",day:"numeric",month:"long"})}):d("Heute bis jetzt"),s=(e.groups??[]).map(r=>({...r,rows:(r.rows??[]).filter(o=>{let l=this.values[`${o.entity}|${o.cost??""}`];return l&&l.value!=null&&!(o.hide_zero&&Math.abs(l.value)<.05)})})).filter(r=>r.rows.length);return p`<div class="label">${e.label??d("Energie-Bilanz")} · ${a}</div>
      ${s.length?p`<div class="groups">
            ${s.map(r=>p`<div class="group">
                <div class="label">${r.label}</div>
                ${r.rows.map(o=>{let l=this.values[`${o.entity}|${o.cost??""}`],c=this.unitOf(o),h=l.value,u=o.decimals??(Math.abs(h)>=100?0:Math.abs(h)>=10?1:2);return p`<div class="row">
                    ${G(o.icon??"charge")}
                    <span class="name">${o.name}</span>
                    <span class="val display num"
                      >${R(h,u)}<small>${c}</small>${l.cost!=null&&l.cost>.004?p`<span class="cost">${R(l.cost,2)} €</span>`:m}</span
                    >
                  </div>`})}
              </div>`)}
          </div>`:p`<div class="calm">${d("Noch keine Werte f\xFCr diesen Tag.")}</div>`}`}};Ei.properties={...ne.properties,values:{state:!0}},Ei.styles=[U,O`
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
    `];var eo=t=>t.replace(/([\\;,:"])/g,"\\$1"),Zn=class extends ne{render(){let i=this.options,e=i.label===!1?m:p`<div class="label">${i.label??d("G\xE4ste-WLAN")}</div>`;if(i.image)return p`<div class="wrap">
        ${e}
        <div class="tile"><div class="qrimg" role="img" aria-label="QR-Code" style=${`background-image:url("${String(i.image).replace(/"/g,"%22")}")`}></div></div>
        ${i.ssid?p`<div class="ssid display">${i.ssid}</div>`:m}
        <div class="hint">${i.hint??d("Handy-Kamera auf den Code halten")}</div>
      </div>`;if(!i.ssid)return p`<div class="wrap">${e}<div class="hint">${d("Netzname und Passwort im Editor eintragen.")}</div></div>`;let n=i.encryption??(i.password?"WPA":"nopass"),a=`WIFI:T:${n};S:${eo(String(i.ssid))};${n==="nopass"?"":`P:${eo(String(i.password??""))};`}${i.hidden?"H:true;":""};`,s=(0,to.default)(0,"M");s.addData(a,"Byte"),s.make();let r=s.getModuleCount(),o="";for(let l=0;l<r;l++)for(let c=0;c<r;c++)s.isDark(l,c)&&(o+=`M${c} ${l}h1v1h-1z`);return p`<div class="wrap">
      ${e}
      <div class="tile">${$e`<svg viewBox="0 0 ${r} ${r}" shape-rendering="crispEdges" aria-label="QR-Code"><path d=${o} fill="#000"/></svg>`}</div>
      <div class="ssid display">${i.ssid}</div>
      ${i.show_password&&i.password?p`<div class="pass num">${d("Passwort")}: ${i.password}</div>`:m}
      <div class="hint">${i.hint??d("Handy-Kamera auf den Code halten")}</div>
    </div>`}};Zn.styles=[U,O`
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
    `];var Gd=(t,i)=>{let e=H(t,i),n=e?parseFloat(e.state):NaN;if(!e||!Number.isFinite(n))return null;let a=String(e.attributes.unit_of_measurement??"min");return a==="h"?n*60:a==="s"?n/60:a==="d"?n*1440:n},jd=t=>t>=60?`${Math.floor(t/60)}:${String(Math.round(t%60)).padStart(2,"0")} h`:`${Math.round(t)} min`,Qn=class extends J{watched(){let i=this.options;return[i.title,i.progress,i.remaining,i.end,i.layer,i.layers,i.status,...(i.temps??[]).map(e=>e.entity)]}render(){let i=this.options,e=l=>{let c=H(this.hass,l);return c&&c.state!=="unknown"&&c.state!=="unavailable"?c.state:void 0},n=parseFloat(e(i.progress)??""),a=Gd(this.hass,i.remaining),s=e(i.end),r=s?new Date(s):null,o=[];a!=null&&a>0&&o.push([d("Noch"),jd(a)]),r&&!isNaN(r.getTime())&&o.push([d("Fertig um"),Q(r)]),e(i.layer)&&e(i.layers)&&o.push([d("Schicht"),`${e(i.layer)} / ${e(i.layers)}`]);for(let l of i.temps??[]){let c=parseFloat(e(l.entity)??"");Number.isFinite(c)&&o.push([l.name,`${R(c,0)}\xB0`])}return e(i.status)&&o.push([d("Status"),String(e(i.status))]),p`<div class="label">${i.label??d("Auftrag")}</div>
      ${e(i.title)?p`<div class="title display">${e(i.title)}</div>`:m}
      ${Number.isFinite(n)?p`<div class="pct display num">${R(n,0)}<small>%</small></div>
            <div class="bar"><i style="width:${Math.max(0,Math.min(100,n))}%"></i></div>`:m}
      <div class="rows">${o.map(([l,c])=>p`<div class="r"><span>${l}</span><span class="num">${c}</span></div>`)}</div>`}};Qn.styles=[U,O`
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
    `];F("af-pet",Ai);F("af-balance",Ei);F("af-qr",Zn);F("af-job",Qn);var Za=[["tagesschau","tagesschau (DE)"],["ntv","n-tv (DE)"],["spiegel","SPIEGEL (DE)"],["zdf","ZDFheute (DE)"],["dlf","Deutschlandfunk (DE)"],["zeit","ZEIT ONLINE (DE)"],["faz","FAZ (DE)"],["sz","S\xFCddeutsche Zeitung (DE)"],["heise","heise online (DE)"],["orf","ORF (AT)"],["srf","SRF News (CH)"],["bbc","BBC News (UK)"],["bbc_world","BBC World (UK)"],["guardian","The Guardian (UK)"],["sky","Sky News (UK)"],["npr","NPR (US)"],["nyt","New York Times (US)"],["abc_us","ABC News (US)"],["cbc","CBC News (CA)"],["abc_au","ABC News (AU)"],["aljazeera","Al Jazeera (EN)"],["dw_en","DW (EN)"]],Yt=()=>Qi()==="de"?["tagesschau","ntv","spiegel"]:["bbc","guardian","npr"],Ya=10*6e4,qa=new Map,qd=(t,i)=>{let e=i.join("|"),n=qa.get(e);if(n?.pending)return n.pending;if(n&&Date.now()-n.at<Ya)return Promise.resolve(n.items);let a=t.callWS({type:"ambiframe/news",feeds:i,limit:30}).then(s=>s.items??[]).catch(()=>n?.items??[]).then(s=>(qa.set(e,{at:s.length?Date.now():Date.now()-Ya+6e4,items:s}),s));return qa.set(e,{at:n?.at??0,items:n?.items??[],pending:a}),a},Yd=t=>new Promise(i=>{if(!t)return i();let e=new Image;e.onload=e.onerror=()=>i(),e.src=t}),_i=class extends ne{constructor(){super(...arguments);this.items=[];this.idx=0;this.prevImage="";this.feedsKey=""}get feeds(){let e=(Array.isArray(this.options.feeds)?this.options.feeds:[]).map(n=>typeof n=="string"?n:n?.value).filter(n=>!!n);return e.length?e:Yt()}get heroItems(){let e=this.items.filter(n=>n.image);return(e.length?e:this.items).slice(0,Number(this.options.max??8))}connectedCallback(){super.connectedCallback(),this.refreshTimer=window.setInterval(()=>{this.load()},Ya+5e3)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.refreshTimer),clearTimeout(this.rotateTimer)}shouldUpdate(e){return!(e.size===1&&e.has("hass"))||!this.items.length}willUpdate(e){let n=this.feeds.join("|");this.hass&&(n!==this.feedsKey||e.has("options"))&&(this.feedsKey=n,this.load())}async load(){if(!this.hass)return;let e=await qd(this.hass,this.feeds);!e.length&&this.items.length||(this.items=e,this.idx>=this.heroItems.length&&(this.idx=0),(this.options.variant??"hero")==="hero"&&this.schedule())}schedule(){clearTimeout(this.rotateTimer);let e=Math.max(5,Number(this.options.interval??14));this.rotateTimer=window.setTimeout(()=>{this.advance()},e*1e3)}async advance(){let e=this.heroItems;if(e.length>1){let n=(this.idx+1)%e.length;await Yd(e[n].image),this.prevImage=e[this.idx]?.image??"",this.idx=n}this.schedule()}updated(){let e=this.renderRoot.querySelector(".track");if(e){let n=e.scrollWidth/2,a=Number(this.options.speed??45);n>0&&(e.style.animationDuration=`${Math.round(n/a)}s`)}}render(){let e=this.options.variant??"hero";if(!this.items.length)return p`<div class="calm">${this.options.empty_text??d("Nachrichten werden geladen \u2026")}</div>`;if(e==="ticker"){if(this.ctx?.ticker===!1)return m;let o=this.items.slice(0,Number(this.options.max??12)).map(l=>p`<span><b>${l.source}</b>${l.title}</span><span class="sep">•</span>`);return p`<div class="tick"><div class="track">${o}${o}</div></div>`}if(e==="list"){let r=this.items.slice(0,Number(this.options.max??4));return p`${this.options.label===!1?m:p`<div class="label">${this.options.label??d("Nachrichten")}</div>`}
        <div class="rows">
          ${r.map(o=>p`<div class="row">
              ${o.image?p`<div class="thumb" style="background-image:url('${o.image}')"></div>`:m}
              <div>
                <div class="rt">${o.title}</div>
                <div class="rm">${o.source}${o.published?` \xB7 ${tt(o.published)}`:""}</div>
              </div>
            </div>`)}
        </div>`}let n=this.heroItems,a=n[this.idx]??n[0],s=Math.max(5,Number(this.options.interval??14));return p`<div class="hero">
      ${this.prevImage?p`<div class="img" style="background-image:url('${this.prevImage}')"></div>`:m}
      ${a.image?We(a.image,p`<div class="img cur" style="background-image:url('${a.image}');--t:${s+2}s"></div>`):m}
      <div class="grad"></div>
      ${We(a.title,p`<div class="txt">
          <div class="meta"><b>${a.source}</b>${a.published?` \xB7 ${tt(a.published)}`:""}</div>
          <div class="title display">${a.title}</div>
          ${a.summary?p`<div class="sum">${a.summary}</div>`:m}
        </div>`)}
      ${n.length>1?p`<div class="dots">${n.map((r,o)=>p`<i class=${o===this.idx?"on":""}></i>`)}</div>`:m}
    </div>`}};_i.properties={...ne.properties,items:{state:!0},idx:{state:!0}},_i.styles=[U,O`
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
    `];F("af-news",_i);var Zd={morning:"Heute",midday:"Heute Nachmittag",evening:"Heute Abend & morgen"},Qa,Ja=new Set,io,Qd=t=>{io??=t.connection.subscribeMessage(i=>{Qa=i.summary,Ja.forEach(e=>e())},{type:"ambiframe/summary/subscribe"}).catch(()=>{io=void 0})},Jn=class extends ne{constructor(){super(...arguments);this.onUpdate=()=>this.requestUpdate()}connectedCallback(){super.connectedCallback(),Ja.add(this.onUpdate)}disconnectedCallback(){super.disconnectedCallback(),Ja.delete(this.onUpdate)}shouldUpdate(){return!0}willUpdate(){this.hass&&Qd(this.hass)}render(){let e=this.options,n=Qa,a=e.label===!1?m:p`<div class="label">${e.label??(n?d(Zd[n.period]??"Heute"):d("\xDCberblick"))}</div>`,s=n?p`${n.headline?p`<div class="headline display">${n.headline}</div>`:m}
          <ul style=${e.size?`--size:${Number(e.size)}px`:""}>
            ${n.points.map((r,o)=>p`<li style="animation-delay:${.15+o*.12}s"><i></i><span>${r}</span></li>`)}
          </ul>
          <div class="meta">${ie("info")}<span>${d("KI-Zusammenfassung")} · ${Q(new Date(n.generated_at))}</span></div>`:p`<div class="calm">${Qa===void 0?d("Wird geladen \u2026"):d("Noch keine Zusammenfassung \u2013 sie entsteht zu den eingestellten Zeiten.")}</div>`;return p`<div class="wrap ${e.style==="card"?"card":""}">${a}${s}</div>`}};Jn.styles=[U,O`
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
    `];F("af-summary",Jn);var Ci=class extends J{constructor(){super(...arguments);this.events=[];this.onForecast=()=>this.requestUpdate()}get calendars(){let e=this.options.calendars??[];return e.length?e:Object.keys(this.hass?.states??{}).filter(n=>n.startsWith("calendar.")).slice(0,3)}get weather(){return this.options.weather??Object.keys(this.hass?.states??{}).find(e=>e.startsWith("weather."))}disconnectedCallback(){super.disconnectedCallback(),this.listening?.removeEventListener("change",this.onForecast),this.listening=void 0}shouldUpdate(e){return e.has("ctx")||e.has("options")||e.has("events")||super.shouldUpdate(e)}watched(){return[this.weather,...(this.options.bins??[]).map(e=>e.entity)]}willUpdate(){let e=this.ctx?.forecasts;e&&this.listening!==e&&(this.listening?.removeEventListener("change",this.onForecast),e.addEventListener("change",this.onForecast),this.listening=e),this.hass&&this.calendars.length&&An(this.hass,this.calendars,2).then(n=>{n!==this.events&&(this.events=n)})}renderEvents(){let e=Date.now(),n=this.events.filter(s=>{let r=re(s.start),o=re(s.end);return!r||!o?!1:it(s)?le(r)<=0&&o.getTime()>e:le(r)===0}),a=this.events.find(s=>{let r=re(s.start);return!!r&&le(r)===1});return p`<div class="col">
      <div class="ct">${ie("calendar")}${d("Termine heute")}</div>
      ${n.length?n.slice(0,5).map(s=>{let r=!it(s)&&(re(s.end)?.getTime()??0)<e;return p`<div class="ev ${r?"past":""}">
              <span class="when num">${it(s)?d("ganztags"):Q(re(s.start))}</span><span class="what">${s.summary}</span>
            </div>`}):p`<div class="calm">${d("Heute keine Termine")}</div>`}
      ${a?p`<div class="note">${d("Morgen")}: ${it(a)?"":`${Q(re(a.start))} `}${a.summary}</div>`:m}
    </div>`}renderWeather(){let e=H(this.hass,this.weather);if(!e)return m;let n=this.ctx?.forecasts.get(this.weather,"daily")??[],a=this.ctx?.forecasts.get(this.weather,"hourly")??[],s=n.find(c=>le(new Date(c.datetime))===0)??n[0],r=s?.condition??e.state,o=a.find(c=>{let h=new Date(c.datetime);return le(h)===0&&h.getTime()>Date.now()-36e5&&(c.precipitation_probability??0)>=50}),l=s?.precipitation_probability;return p`<div class="col">
      <div class="ct">${ie("sun")}${d("Wetter heute")}</div>
      <div class="wx">
        ${ie(Le(r))}
        <div>
          <div class="hi display num">${R(s?.temperature??e.attributes.temperature,0)}°</div>
          ${s?.templow!=null?p`<div class="lo num">${R(s.templow,0)}°</div>`:m}
        </div>
      </div>
      <div class="cond">${je(r)}</div>
      <div class="note">
        ${o?d("Regen ab etwa {time} Uhr",{time:Q(new Date(o.datetime))}):l!=null&&l>=30?d("Regenrisiko {n} %",{n:R(l,0)}):d("Trocken")}
      </div>
    </div>`}renderWaste(){let e=Ka(this.hass,{bins:this.options.bins,days:2});return p`<div class="col">
      <div class="ct">${ie("bin")}${d("M\xFCll")}</div>
      ${e.length?e.flatMap(n=>n.bins.map(a=>p`<div class="bin ${n.days<=1?"soon":""}">
                <i style="background:${a.color??"var(--af-ink-3)"}"></i><span>${a.name}</span><span class="d">${Ua(n.days)}</span>
              </div>`)):p`<div class="calm">${d("Keine Abholung")}</div>`}
      ${e.some(n=>n.days===1)?p`<div class="note">${d("Heute Abend rausstellen")}</div>`:m}
    </div>`}render(){let e=new Date,n=e.getHours(),a=n<11?d("Guten Morgen"):n<18?d("Guten Tag"):d("Guten Abend");return p`${this.options.label===!1?m:p`<div class="head display">${this.options.label??a}</div>
            <div class="sub">${e.toLocaleDateString(te(),{weekday:"long",day:"numeric",month:"long"})}</div>`}
      <div class="cols">${this.renderEvents()} ${this.renderWeather()} ${this.renderWaste()}</div>`}};Ci.properties={...J.properties,events:{state:!0}},Ci.styles=[U,O`
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
    `];F("af-today",Ci);var Jd=t=>{let i=Date.now()-18e5;return(t??[]).map(e=>({t:new Date(e.datetime),temp:Number(e.temperature),cond:e.condition,pp:e.precipitation_probability??0})).filter(e=>e.t.getTime()>i&&Number.isFinite(e.temp))},Xd=t=>(t??[]).map(i=>({t:new Date(i.datetime),hi:Number(i.temperature),lo:Number(i.templow??i.temperature),cond:i.condition,pp:i.precipitation_probability??0})).filter(i=>le(i.t)>=0),Xn=class extends ne{constructor(){super(...arguments);this.size={w:0,h:0};this.onForecast=()=>this.requestUpdate()}watched(){return[this.options.entity]}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(()=>{let e=this.offsetWidth,n=this.offsetHeight;(e!==this.size.w||n!==this.size.h)&&(this.size={w:e,h:n},this.options.variant==="hourly"&&this.requestUpdate())}),this.resize.observe(this),this.listen()}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.listeningTo?.forecasts.removeEventListener("change",this.onForecast),this.listeningTo=void 0}updated(e){e.has("ctx")&&this.listen()}listen(){this.listeningTo!==this.ctx&&(this.listeningTo?.forecasts.removeEventListener("change",this.onForecast),this.ctx?.forecasts.addEventListener("change",this.onForecast),this.listeningTo=this.ctx)}shouldUpdate(e){return e.has("ctx")||e.has("options")||super.shouldUpdate(e)}hours(){return Jd(this.ctx?.forecasts.get(this.options.entity,"hourly"))}days(){return Xd(this.ctx?.forecasts.get(this.options.entity,"daily"))}render(){let e=H(this.hass,this.options.entity);if(!e)return p`<div class="faint">${d("Wetter-Entit\xE4t fehlt")}</div>`;let n=e.attributes;switch(this.options.variant??"now"){case"line":return p`<div class="line">${ie(Le(e.state))}<span class="num">${R(n.temperature,0)}°</span><span>${je(e.state)}</span></div>`;case"card":return this.renderCard(e.state,n);case"hourly":return this.renderHourly();case"rain":return this.renderRain();case"daily":return this.renderDaily();default:{let a=this.days().find(s=>le(s.t)===0);return p`<div class="now">
          ${ie(Le(e.state))}
          <div class="temp display num">${R(n.temperature,0)}°</div>
          <div class="cond">${je(e.state)}</div>
          ${a?p`<div class="range num">${d("Heute {lo}\xB0 bis {hi}\xB0",{lo:R(a.lo,0),hi:R(a.hi,0)})}</div>`:m}
          <div class="meta num">
            ${d("Wind")} ${R(n.wind_speed,0)} ${n.wind_speed_unit??"km/h"} ${Mr(n.wind_bearing)}<br />
            ${d("Luftfeuchte")} ${R(n.humidity,0)} %${n.uv_index!=null?` \xB7 UV ${R(n.uv_index,0)}`:""}
          </div>
        </div>`}}}renderCard(e,n){let a=this.days().find(r=>le(r.t)===0),s=this.hours().filter((r,o)=>o%3===0).slice(0,4);return p`<div class="card">
      <div class="label">${this.options.name??n.friendly_name??""}</div>
      <div class="bigic">${ie(Le(e))}</div>
      <div class="big display num">${R(n.temperature,0)}°</div>
      <div class="cond">${je(e)}</div>
      ${a?p`<div class="sub num">${d("Bis {hi}\xB0, nachts {lo}\xB0",{hi:R(a.hi,0),lo:R(a.lo,0)})}</div>`:m}
      ${s.length?p`<div class="mini">
            ${s.map(r=>p`<div><div class="h num">${d("{h} Uhr",{h:r.t.getHours()})}</div>${ie(Le(r.cond))}<div class="v num">${R(r.temp,0)}°</div></div>`)}
          </div>`:m}
    </div>`}renderHourly(){let e=this.hours().slice(0,Number(this.options.hours)||12),n=this.size.w||668,a=Math.max(140,Math.min(220,(this.size.h||254)-40)),s=p`<div class="label">${this.options.label??d("N\xE4chste Stunden")}</div>`;if(e.length<2)return s;let r=76,o=a-34,l=e.map(S=>S.temp),c=Math.min(...l)-1,h=Math.max(...l)+1,u=S=>24+S*(n-48)/(e.length-1),f=S=>r+(o-r)*(1-(S-c)/(h-c||1)),b=`M${u(0)},${f(l[0])}`;for(let S=0;S<e.length-1;S++){let I=(u(S)+u(S+1))/2;b+=` C${I},${f(l[S])} ${I},${f(l[S+1])} ${u(S+1)},${f(l[S+1])}`}let g=`${b} L${u(e.length-1)},${o+10} L${u(0)},${o+10} Z`,v=e.length>8?2:1;return p`${s}
      <svg class="chart" width=${n} height=${a} viewBox="0 0 ${n} ${a}">
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="var(--af-accent)" stop-opacity=".22" />
            <stop offset="1" stop-color="var(--af-accent)" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d=${g} fill="url(#wg)" />
        <path d=${b} fill="none" stroke="var(--af-accent)" stroke-width="2.4" stroke-linecap="round" />
        ${e.map((S,I)=>{if(I%v)return m;let A=u(I),P=f(S.temp);return $e`
            <g class="gi" transform="translate(${A-13},0) scale(1.08)" fill="none" stroke="currentColor" stroke-width="1.4"
              stroke-linecap="round" stroke-linejoin="round">${Bt(gi[Le(S.cond)])}</g>
            ${S.pp>=30?$e`<text class="tc" x=${A} y="46" text-anchor="middle">${R(S.pp,0)} %</text>`:m}
            <text class="t1" x=${A} y=${P-14} text-anchor="middle">${R(S.temp,0)}°</text>
            <circle cx=${A} cy=${P} r="3.5" fill="var(--af-bg)" stroke="var(--af-accent)" stroke-width="2" />
            <text class="t3" x=${A} y=${a-6} text-anchor="middle">${d("{h} Uhr",{h:S.t.getHours()})}</text>`})}
      </svg>`}renderRain(){let e=this.options,n=e.rain_sensor?this.hass?.states[e.rain_sensor]?.state==="on":!1,a=Number(e.threshold??40),s=this.hours().slice(0,Number(e.hours??12)),r=f=>f.pp>=a||["rainy","pouring","lightning-rainy","snowy-rainy"].includes(f.cond??""),o=s.find(r),l=n?s.find(f=>!r(f)):void 0,c=s[s.length-1],h,u="";return n?(h=d("Es regnet gerade"),u=l?d("Trocken ab etwa {h} Uhr",{h:l.t.getHours()}):d("Bleibt vorerst nass")):o?(h=d("Regen ab {h} Uhr",{h:o.t.getHours()}),u=d("{n} % Wahrscheinlichkeit",{n:R(o.pp,0)})):(h=d("Trocken"),u=c?d("Kein Regen bis {h} Uhr",{h:c.t.getHours()}):""),p`<div class="line" style="align-items:flex-start">
      <span style="font-size:30px;color:var(--af-accent)">${ie(n||o?"rain":"sun")}</span>
      <div><div style="font-size: calc(24px * var(--af-fs, 1));color:var(--af-ink)">${h}</div><div style="font-size: calc(17px * var(--af-fs, 1));color:var(--af-ink-3);margin-top:6px">${u}</div></div>
    </div>`}renderDaily(){let e=this.days().filter(o=>le(o.t)>=1).slice(0,Number(this.options.days)||5),n=p`<div class="label">${this.options.label??d("N\xE4chste Tage")}</div>`;if(!e.length)return n;let a=Math.min(...e.map(o=>o.lo)),s=Math.max(...e.map(o=>o.hi)),r=o=>(o-a)/(s-a||1)*100;return p`${n}
      <div class="days">
        ${e.map(o=>p`<div class="day num">
            <span>${le(o.t)===1?d("Morgen"):vi(o.t)}</span>
            ${ie(Le(o.cond))}
            <span class="pp">${o.pp>=20?`${R(o.pp,0)} %`:""}</span>
            <span class="lo">${R(o.lo,0)}°</span>
            <span class="bar"><i style="left:${r(o.lo)}%;right:${100-r(o.hi)}%"></i></span>
            <span>${R(o.hi,0)}°</span>
          </div>`)}
      </div>`}};Xn.styles=[U,O`
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
    `];F("af-weather",Xn);var Ke={clock:{tag:"af-clock",name:"Uhr",icon:"mdi:clock-outline",size:[6,2]},date:{tag:"af-date",name:"Datum",icon:"mdi:calendar-today",size:[6,1]},text:{tag:"af-text",name:"Text & Vorlage",icon:"mdi:format-text",size:[4,1]},chart:{tag:"af-chart",name:"Verlauf",icon:"mdi:chart-line",size:[6,3]},gauge:{tag:"af-gauge",name:"Anzeige (Ring)",icon:"mdi:gauge",size:[3,3]},image:{tag:"af-image",name:"Bild",icon:"mdi:image-outline",size:[4,4]},weather:{tag:"af-weather",name:"Wetter",icon:"mdi:weather-partly-cloudy",size:[4,6]},value:{tag:"af-value",name:"Wert",icon:"mdi:numeric",size:[3,2]},rooms:{tag:"af-rooms",name:"R\xE4ume",icon:"mdi:home-thermometer-outline",size:[8,6]},status:{tag:"af-status",name:"Status",icon:"mdi:list-status",size:[4,6]},calendar:{tag:"af-calendar",name:"Kalender",icon:"mdi:calendar",size:[4,6]},infoline:{tag:"af-infoline",name:"Infozeile",icon:"mdi:dots-horizontal",size:[8,1]},camera:{tag:"af-camera",name:"Kamera",icon:"mdi:cctv",size:[6,4]},price:{tag:"af-price",name:"Strompreis",icon:"mdi:currency-eur",size:[8,6]},power:{tag:"af-power",name:"Energie jetzt",icon:"mdi:solar-power",size:[6,4]},car:{tag:"af-car",name:"Auto",icon:"mdi:car-electric",size:[5,7]},persons:{tag:"af-persons",name:"Personen",icon:"mdi:account",size:[5,4]},vacuum:{tag:"af-vacuum",name:"Saugroboter",icon:"mdi:robot-vacuum",size:[6,4]},waste:{tag:"af-waste",name:"M\xFClltonnen",icon:"mdi:trash-can",size:[5,5]},activity:{tag:"af-activity",name:"Bewegung",icon:"mdi:motion-sensor",size:[7,1]},list:{tag:"af-list",name:"Werte-Liste",icon:"mdi:format-list-bulleted",size:[5,6]},warnings:{tag:"af-warnings",name:"Warnungen",icon:"mdi:alert",size:[6,3]},agenda:{tag:"af-agenda",name:"Termine",icon:"mdi:calendar",size:[6,6]},media:{tag:"af-media",name:"L\xE4uft gerade",icon:"mdi:music",size:[6,3]},appliances:{tag:"af-appliances",name:"Ger\xE4te",icon:"mdi:washing-machine",size:[6,4]},batteries:{tag:"af-batteries",name:"Akkus",icon:"mdi:battery-heart-variant",size:[6,7]},consumers:{tag:"af-consumers",name:"Gr\xF6\xDFte Verbraucher",icon:"mdi:podium",size:[6,3]},covers:{tag:"af-covers",name:"Rolll\xE4den",icon:"mdi:window-shutter",size:[5,7]},summary:{tag:"af-summary",name:"KI-Zusammenfassung",icon:"mdi:creation-outline",size:[7,7]},pet:{tag:"af-pet",name:"Haustier",icon:"mdi:cat",size:[12,8]},balance:{tag:"af-balance",name:"Tagesbilanz",icon:"mdi:chart-box-outline",size:[12,8]},qr:{tag:"af-qr",name:"WLAN-QR-Code",icon:"mdi:qrcode",size:[6,7]},job:{tag:"af-job",name:"Auftrag/Druck",icon:"mdi:printer-3d",size:[4,6]},news:{tag:"af-news",name:"Nachrichten",icon:"mdi:newspaper-variant-outline",size:[12,7]},daily:{tag:"af-daily",name:"Tagesinhalt (Wikipedia, Zitat)",icon:"mdi:book-open-page-variant-outline",size:[12,8]},today:{tag:"af-today",name:"Tagesvorschau",icon:"mdi:calendar-today-outline",size:[12,7]},card:{tag:"af-card",name:"HA-Karte",icon:"mdi:card-outline",size:[4,4]}};var ao=Symbol.for(""),ec=t=>{if(t?.r===ao)return t?._$litStatic$},so=t=>({_$litStatic$:t,r:ao});var no=new Map,Xa=t=>(i,...e)=>{let n=e.length,a,s,r=[],o=[],l,c=0,h=!1;for(;c<n;){for(l=i[c];c<n&&(s=e[c],(a=ec(s))!==void 0);)l+=a+i[++c],h=!0;c!==n&&o.push(s),r.push(l),c++}if(c===n&&r.push(i[n]),h){let u=r.join("$$lit$$");(i=no.get(u))===void 0&&(r.raw=r,no.set(u,i=r)),e=o}return t(i,...e)},ro=Xa(p),jg=Xa($e),qg=Xa(pr);var oo=t=>()=>{t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296},co=(t,i,e)=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${i} ${e}' numOctaves='3' seed='${t}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.2 0 0 0 -0.85'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`)}")`,tc=co(7,.0035,.009),ic=co(23,.005,.012),lo=()=>matchMedia("(prefers-reduced-motion: reduce)").matches,Li=class extends se{constructor(){super(...arguments);this.type="none";this.strength=1;this.speed="slow";this.small=!1;this.raf=0;this.particles=[];this.color="255,255,255";this.colorAt=0;this.last=0;this.onVisibility=()=>{cancelAnimationFrame(this.raf),!document.hidden&&this.type==="particles"&&!lo()&&(this.raf=requestAnimationFrame(this.frame))};this.frame=e=>{if(this.raf=requestAnimationFrame(this.frame),e-this.last<33)return;let n=this.last?Math.min(3,(e-this.last)/33):1;this.last=e;let a=this.speed==="normal"?1.8:1,s=this.canvas;if(s){for(let r of this.particles)r.x+=(r.vx+Math.sin(e/4e3+r.ph)*.05)*n*a,r.y+=r.vy*n*a,r.y<-10&&(r.y=s.height+10),r.x<-10&&(r.x=s.width+10),r.x>s.width+10&&(r.x=-10);this.draw(e)}}}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisibility)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisibility),cancelAnimationFrame(this.raf),this.resize?.disconnect()}updated(e){if(this.type!=="particles"){cancelAnimationFrame(this.raf);return}(e.has("type")||e.has("strength")||e.has("small"))&&this.setupParticles()}get canvas(){return this.renderRoot.querySelector("canvas")}setupParticles(){let e=this.canvas;if(!e)return;this.resize?.disconnect(),this.resize=new ResizeObserver(()=>this.sizeCanvas()),this.resize.observe(this),this.sizeCanvas();let n=oo(11),a=this.small?16:[30,48,72][this.strength-1],s=e.width,r=e.height,o=s/1280;this.particles=Array.from({length:a},()=>({x:n()*s,y:n()*r,r:(.6+n()*n()*2.2)*o*1.4,vx:(n()-.5)*.12*o,vy:-(.08+n()*.22)*o,a:.12+n()*.38,ph:n()*Math.PI*2,tw:.2+n()*.6})),cancelAnimationFrame(this.raf),lo()?this.draw(0):this.raf=requestAnimationFrame(this.frame)}sizeCanvas(){let e=this.canvas;if(!e)return;let n=Math.min(1.5,window.devicePixelRatio||1),a=Math.round(this.offsetWidth*n),s=Math.round(this.offsetHeight*n);if(a&&s&&(e.width!==a||e.height!==s)){let r=e.width?a/e.width:1,o=e.height?s/e.height:1;e.width=a,e.height=s;for(let l of this.particles)l.x*=r,l.y*=o}}draw(e){let n=this.canvas,a=n?.getContext("2d");if(!n||!a)return;if(!e||e-this.colorAt>1e3){this.colorAt=e;let r=getComputedStyle(this).getPropertyValue("--af-ink").trim(),o=r.match(/^#([0-9a-f]{6})$/i);o?this.color=[0,2,4].map(l=>parseInt(o[1].slice(l,l+2),16)).join(","):r.startsWith("rgb")&&(this.color=r.replace(/rgba?\(|\)/g,"").split(",").slice(0,3).join(","))}a.clearRect(0,0,n.width,n.height);let s=[.8,1,1.2][this.strength-1];for(let r of this.particles){let o=r.a*s*(.6+.4*Math.sin(e/1e3*r.tw+r.ph));a.fillStyle=`rgba(${this.color},${Math.max(0,Math.min(1,o))})`,a.beginPath(),a.arc(r.x,r.y,r.r,0,Math.PI*2),a.fill()}}renderBokeh(){let e=oo(5),n=this.small?6:[8,12,16][this.strength-1],a=[.45,.6,.75][this.strength-1];return p`<div class="layer bokeh">
      ${Array.from({length:n},(s,r)=>{let o=60+e()*180,l=r%3===0?"var(--af-ink)":"var(--af-accent)",c=[`left:${e()*100-8}%`,`top:${e()*100-8}%`,`width:${o}px`,`--c:color-mix(in srgb, ${l} ${r%3===0?14:26}%, transparent)`,`--d:${22+e()*26}s`,`--delay:${-e()*40}s`,`--o:${a*(.5+e()*.5)}`,`--dx:${(e()-.5)*80}px`,`--dy:${(e()-.5)*60}px`].join(";");return p`<i style=${c}></i>`})}
    </div>`}render(){let e=this.speed==="normal"?.55:1,n=[.6,.85,1][this.strength-1],a=`--k:${e};opacity:${n}`;switch(this.type){case"particles":return p`<canvas></canvas>`;case"flow":return p`<div class="layer flow" style=${a}><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;case"bokeh":return p`<div class="layer" style="--k:${e}">${this.renderBokeh()}</div>`;case"mist":return p`<div class="layer mist" style="${a};--m1:${tc};--m2:${ic}"><div class="layer m1"></div><div class="layer m2"></div></div>`;default:return m}}};Li.properties={type:{},strength:{type:Number},speed:{},small:{type:Boolean}},Li.styles=O`
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
  `;F("af-ambient",Li);var fe={landscape:{w:1280,h:800,padX:56,padY:48,gap:16,cols:12,rows:8},portrait:{w:800,h:1280,padX:40,padY:56,gap:16,cols:8,rows:12}},po=(t,i)=>{let e=fe[t];if(!i||!Number.isFinite(i))return e;let n=e.w/e.h,[a,s]=t==="landscape"?[1.25,2.2]:[.45,.8],r=Math.min(s,Math.max(a,i));return r>n?{...e,w:Math.round(e.h*r)}:{...e,h:Math.round(e.w/r)}},Zt=(t,i)=>{let e=(t.w-2*t.padX-(t.cols-1)*t.gap)/t.cols,n=(t.h-2*t.padY-(t.rows-1)*t.gap)/t.rows;return{left:t.padX+i.x*(e+t.gap),top:t.padY+i.y*(n+t.gap),width:i.w*e+(i.w-1)*t.gap,height:i.h*n+(i.h-1)*t.gap}},nc=t=>{let i=fe.portrait;if(!t.length)return{};let e=[...t].sort((v,S)=>v.y-S.y||v.x-S.x),n=[],a=-1;for(let v of e)n.length&&v.y<a?(n[n.length-1].push(v),a=Math.max(a,v.y+v.h)):(n.push([v]),a=v.y+v.h);let s=[];for(let v of n){let S=Math.min(...v.map(A=>A.y)),I=Math.max(...v.map(A=>A.y+A.h))-S;if(I<=2&&v.length>1){let A=0,P=[...v].sort(($,L)=>$.x-L.x).map($=>{let L=Math.max(2,Math.round($.w*i.cols/12)),x=Math.max(A,Math.min(i.cols-L,Math.round($.x*i.cols/12)));return A=x+L,{widget:$,x,dy:$.y-S,w:L,h:$.h}});if(A<=i.cols){s.push({items:P,h:I,flex:!1});continue}}for(let A of[...v].sort((P,$)=>P.x-$.x||P.y-$.y))s.push({items:[{widget:A,x:0,dy:0,w:i.cols,h:A.h}],h:A.h,flex:A.h>1})}if(s.reduce((v,S)=>v+S.h,0)>i.rows){let v=s.filter($=>!$.flex).reduce(($,L)=>$+L.h,0),S=s.filter($=>$.flex),I=S.reduce(($,L)=>$+L.h,0),A=Math.max(S.length,i.rows-v);for(let $ of S)$.h=Math.max(1,Math.floor($.h*A/I));let P=i.rows-s.reduce(($,L)=>$+L.h,0);for(let $ of[...S].sort((L,x)=>x.h-L.h)){if(P<=0)break;$.h++,P--}for(let $ of s)for(let L of $.items)L.h=Math.min(L.h,$.h-L.dy)}let o=Math.min(...t.map(v=>v.y)),l=8-Math.max(...t.map(v=>v.y+v.h)),c=i.rows-s.reduce((v,S)=>v+S.h,0),h=s.filter(v=>v.flex);if(c>0&&o+l===0&&h.length){let v=h.reduce((I,A)=>I+A.h,0),S=c;for(let I of h){let A=Math.floor(c*I.h/v);I.h+=A,S-=A}for(let I of[...h].sort((A,P)=>P.h-A.h)){if(S<=0)break;I.h++,S--}for(let I of h)for(let A of I.items)A.h=I.h}let u=s.reduce((v,S)=>v+S.h,0),f=Math.max(0,i.rows-u),b=o+l>0?Math.round(f*o/(o+l)):0,g={};for(let v of s){for(let S of v.items){let I=b+S.dy;I<i.rows&&(g[S.widget.id]={x:S.x,y:I,w:S.w,h:Math.max(1,Math.min(S.h,i.rows-I))})}b+=v.h}return g},At=(t,i)=>{if(i==="landscape")return Object.fromEntries(t.map(n=>[n.id,{x:n.x,y:n.y,w:n.w,h:n.h}]));let e=t.some(n=>!n.portrait)?nc(t):{};return Object.fromEntries(t.map(n=>[n.id,n.portrait??e[n.id]]).filter(n=>!!n[1]))};var ho={start:"flex-start",center:"center",end:"flex-end"},ac={start:"left",center:"center",end:"right"},uo=new Map,Mi=class extends se{constructor(){super(...arguments);this.photo=null;this.grid=fe.landscape;this.orientation="landscape";this.refresh=()=>this.requestUpdate();this.held=!1}act(e,n){let a=e[n];a&&this.dispatchEvent(new CustomEvent("af-action",{detail:{action:a,widget:e},bubbles:!0,composed:!0}))}onDown(e){this.held=!1,clearTimeout(this.holdTimer),e.hold_action&&(this.holdTimer=window.setTimeout(()=>{this.held=!0,this.act(e,"hold_action")},600))}onClick(e,n){clearTimeout(this.holdTimer),this.held?(this.held=!1,e.stopPropagation()):n.tap_action&&(e.stopPropagation(),this.act(n,"tap_action"))}connectedCallback(){super.connectedCallback(),pn.addEventListener("change",this.refresh),this.tick=window.setInterval(()=>{this.page?.widgets?.some(e=>e.show_if?.length)&&this.requestUpdate()},3e4)}disconnectedCallback(){super.disconnectedCallback(),pn.removeEventListener("change",this.refresh),clearInterval(this.tick)}renderWidget(e,n){let a=Ke[e.type],s=Zt(this.grid,n),r=e.options??{},o=Be(r.typeface),l=e.look??{},c=(g,v)=>`color-mix(in srgb, ${g} ${v}%, transparent)`,h=[`left:${s.left}px;top:${s.top}px;width:${s.width}px;height:${s.height}px`,o?`--af-display:${o};--af-sans:${o}`:"",`--af-align:${ho[r.align]??"flex-start"}`,`--af-valign:${ho[r.valign]??"flex-start"}`,`--af-text-align:${ac[r.align]??"left"}`,l.accent?`--af-accent:${l.accent};--af-accent-soft:${c(l.accent,14)}`:"",l.ink?`--af-ink:${l.ink};--af-ink-2:${c(l.ink,66)};--af-ink-3:${c(l.ink,40)};color:${l.ink}`:"",l.opacity!=null?`opacity:${Math.max(0,Math.min(100,Number(l.opacity)))/100}`:"",l.padding!=null?`padding:${Number(l.padding)}px`:""].filter(Boolean).join(";");if(!a)return p`<div class="cell" style=${h}><div class="unknown">Unbekanntes Widget „${e.type}“</div></div>`;let u=so(a.tag),f=["cell",e.tap_action||e.hold_action?"act":"",l.card?"boxed":""].filter(Boolean).join(" "),b=l.size&&Number(l.size)!==100?`zoom:${Number(l.size)/100}`:"";return p`<div
      class=${f}
      style=${h}
      data-widget=${e.id}
      @pointerdown=${()=>this.onDown(e)}
      @pointerup=${()=>clearTimeout(this.holdTimer)}
      @pointerleave=${()=>clearTimeout(this.holdTimer)}
      @click=${g=>this.onClick(g,e)}
    >
      ${ro`<${u} style=${b} .hass=${this.hass} .options=${r} .ctx=${this.ctx}></${u}>`}
    </div>`}updated(){un(this.renderRoot,this.page?.css)}cameraSource(e){let n=e.background??{type:"none"},a=(n.sources??[]).filter(r=>r?.url);if(!a.length)return{entity:n.entity,url:n.url,refresh:n.refresh,name:n.name};if(this.camPick?.page!==e.id){let r=((uo.get(e.id)??-1)+1)%a.length;uo.set(e.id,r),this.camPick={page:e.id,index:r}}let s=a[this.camPick.index%a.length];return{url:s.url,refresh:s.refresh??n.refresh,name:s.name}}render(){let e=this.page;if(!e)return m;let n=e.background??{type:"none"},a={display:this.ctx?.displayId,orientation:this.orientation},s=(e.widgets??[]).filter(g=>ht(this.hass,g.show_if,a)),r=At(e.widgets??[],this.orientation),o=e.palette==="night",l=this.ctx?.ambient,c=o?"none":n.ambient??l?.type??"none",h=n.type==="color"&&n.color,u=n.type==="photo"||n.type==="camera",f=this.cameraSource(e),b=[o?"night":"",u?"onphoto":"",o||h||u||c==="flow"?"flat":""].join(" ");return p`<div class="root ${b}" style=${h?`background-color:${n.color}`:""}>
      ${n.type==="photo"&&this.photo?p`<div class="photo" style="background-image:url('${this.photo.url}')"></div>
            <div class="shade"></div>
            ${this.photo.credit?p`<div class="credit">${this.photo.credit}</div>`:m}`:m}
      ${n.type==="camera"&&(f.entity||f.url)?p`<af-camera-view
              class="bgcam"
              .hass=${this.hass}
              .entity=${f.url?void 0:f.entity}
              .url=${f.url}
              .mode=${f.refresh===0?"live":"snapshot"}
              .refresh=${f.refresh??20}
              .osd=${"KAMERA"}
            ></af-camera-view>
            <div class="shade cam"></div>
            ${f.name?p`<div class="credit">${f.name}</div>`:m}`:m}
      ${c!=="none"?p`<af-ambient .type=${c} .strength=${l?.strength??1} .speed=${l?.speed??"slow"} .small=${!!this.ctx?.preview}></af-ambient>`:m}
      ${Vt(s.filter(g=>r[g.id]),g=>g.id,g=>this.renderWidget(g,r[g.id]))}
    </div>`}};Mi.properties={hass:{attribute:!1},page:{attribute:!1},ctx:{attribute:!1},photo:{attribute:!1},grid:{attribute:!1},orientation:{attribute:!1}},Mi.styles=[$r,kr,O`
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
    `];F("af-page",Mi);var sc=new Set(["unavailable","unknown"]),mo=(t,i,e)=>{if(!i||!e||i.state===e.state||t.from&&i.state!==t.from)return!1;if(t.to!=="*")return e.state===t.to;if(sc.has(e.state)||i.state==="unavailable")return!1;if(e.entity_id.startsWith("event.")){let n=Date.parse(e.state);if(!Number.isFinite(n)||Date.now()-n>12e4||t.event_types?.length&&!t.event_types.includes(String(e.attributes.event_type)))return!1}return!0};var Ni=[["klangschale","Klangschale (tief, schwebend)"],["marimba","Marimba (zwei Holzt\xF6ne)"],["glas","Glas (klares Ding-Dong)"],["kalimba","Kalimba (drei gezupfte T\xF6ne)"],["windspiel","Windspiel (zart)"],["hinweis","Hinweis (sehr leise, kurz)"],["gong","Gong (warm, tief)"],["dingdong","Ding-Dong"],["glocke","Glocke (kurz, hell)"],["alarm","Alarm (eindringlich, wiederholt)"]],rc=new Set(Ni.map(([t])=>t)),oc=t=>rc.has(t)?new URL(`./sounds/${t}.wav`,import.meta.url).href:new URL(t,location.href).href,lc=3,Qt,Di=(t,i=70)=>{let e=oc(t),n=window.fully;if(n?.playSound){try{n.setAudioVolume?.(Math.max(0,Math.min(100,Math.round(i))),lc)}catch{}n.playSound(e,!1);return}Qt?.pause(),Qt=new Audio(e),Qt.volume=Math.max(0,Math.min(1,i/100)),Qt.play().catch(()=>{})},fo=()=>{window.fully?.stopSound?.(),Qt?.pause(),Qt=void 0};var go=["pointerdown","touchstart","wheel","keydown"],ea,es=()=>location.pathname+location.search,bo=t=>{history.pushState(null,"",t),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};function vo(t,i){ea?.stop();let e=es(),n=i,a=document.createElement("button");a.type="button",a.setAttribute("style",["position:fixed","left:50%","bottom:calc(16px + env(safe-area-inset-bottom, 0px))","transform:translateX(-50%)","z-index:2147483647","border:0","border-radius:999px","padding:10px 18px","font:500 15px/1.2 system-ui,-apple-system,sans-serif","color:#fff","background:rgba(20,20,20,.78)","-webkit-backdrop-filter:blur(12px)","backdrop-filter:blur(12px)","box-shadow:0 6px 24px rgba(0,0,0,.25)","cursor:pointer"].join(";"));let s=()=>{a.textContent=`\u2190 ${d("Zur\xFCck zu Ambiframe")} \xB7 ${n} s`},r=()=>{n=i,s()},o=()=>{clearInterval(h);for(let u of go)window.removeEventListener(u,r,!0);window.removeEventListener("location-changed",c),window.removeEventListener("popstate",c),a.remove(),ea?.stop===o&&(ea=void 0)},l=()=>{o(),es()!==e&&bo(e)},c=()=>{es()===e&&o()},h=window.setInterval(()=>{n-=1,n<=0?l():s()},1e3);a.addEventListener("click",u=>{u.stopPropagation(),l()});for(let u of go)window.addEventListener(u,r,{capture:!0,passive:!0});window.addEventListener("location-changed",c),window.addEventListener("popstate",c),ea={stop:o},s(),document.body.appendChild(a),bo(t)}var yo={type:"fade",duration:2.4},Et=t=>[...new Set([t.entity,...t.entities??[]].filter(i=>!!i))],mt=t=>{let i=t?.state==="playing"?t.attributes.media_title:void 0;return i?`${i}|${t.attributes.media_artist??""}`:""},dc=t=>({entity_id:t,state:"playing",attributes:{friendly_name:"K\xFCche",media_title:"Harvest Moon",media_artist:"Neil Young",media_album_name:"Harvest Moon",media_duration:303,media_position:74,media_position_updated_at:new Date().toISOString()},last_changed:new Date().toISOString(),last_updated:new Date().toISOString()}),wo=t=>`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,"0")}`,cc={id:"__nacht",name:"Nacht",duration:60,background:{type:"none"},palette:"night",widgets:[{id:"uhr",type:"clock",x:3,y:3,w:6,h:2,options:{align:"center",valign:"end"}},{id:"datum",type:"date",x:3,y:5,w:6,h:1,options:{align:"center"}}]},pc=t=>{try{return localStorage.getItem(t)}catch{return null}},xo=(t,i)=>{try{localStorage.setItem(t,i)}catch{}},hc=30,_e=t=>ie(t?Rt[t]??t:void 0),ts=()=>window.fully,uc=()=>{try{ts()?.turnScreenOn?.()}catch{}},zi=class extends se{constructor(){super(...arguments);this.streamMode=!1;this.shift=[0,0];this.shiftStep=0;this.effFor="";this.preview=!1;this.fixedPage=null;this.speed=1;this.theme="ruhig";this.mode="dark";this.orient="landscape";this.grid=fe.landscape;this.evening=!1;this.dimming=!1;this.paused=!1;this.layers=[];this.chips=[];this.controlOpen=!1;this.menu=!1;this.swallowTap=!1;this.muteUntil=Number(pc("ambiframe-mute-until")??0);this.controlLeft=0;this.scale=1;this.night=!1;this.started=!1;this.idx=-1;this.seq=0;this.layerSeq=0;this.lastMediaKey="";this.lastMediaAt=0;this.mediaShown=new Map;this.lastFired=new Map;this.forecasts=new Sn;this.photos=new Tn(()=>this.hass,()=>this.config?.photos);this.onAction=async e=>{let{action:n}=e.detail,a=this.hass,s=r=>r?a?.states[r]?.attributes.friendly_name??r:"";if(this.preview){this.showToast(`${d("Vorschau")}: ${n.action}${n.entity?` \xB7 ${s(n.entity)}`:n.page?` \xB7 ${n.page}`:""}`);return}if(!(n.confirm&&!await this.confirmFirst(typeof n.confirm=="string"?n.confirm:d("{name} \u2013 wirklich?",{name:s(n.entity)||d("Aktion")}))))try{switch(n.action){case"toggle":if(!n.entity||!a)return;await a.callService("homeassistant","toggle",{entity_id:n.entity}),this.showToast(`${s(n.entity)} umgeschaltet`);break;case"perform":{let[r,o]=(n.perform??"").split(".");if(!r||!o||!a)return;await a.callService(r,o,{...n.data??{},...n.entity?{entity_id:n.entity}:{}}),this.showToast(n.title??(s(n.entity)||d("Erledigt")));break}case"more_info":n.entity&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:n.entity},bubbles:!0,composed:!0}));break;case"page":n.page&&this.showPage(n.page);break;case"popup":clearTimeout(this.popupTimer),this.popup={action:n,seq:++this.seq},this.popupTimer=window.setTimeout(()=>this.closePopup(),(n.timeout??30)*1e3);break;case"pause":if(!a||!this.display)return;await a.callWS({type:"ambiframe/display/pause",display_id:this.display.id,paused:!this.paused}),this.showToast(this.paused?d("Weiter geht's"):d("Angehalten"));break;case"dashboard":this.openControl();break}}catch(r){this.showToast(d("Fehlgeschlagen: {error}",{error:String(r?.message??r)}),!0)}};this.touchControl=()=>{this.controlOpen&&(this.controlLeft=this.display?.control.idle??60,clearInterval(this.controlTimer),this.controlTimer=window.setInterval(()=>{this.controlLeft-=1,this.controlLeft<=0&&this.closeControl()},1e3))};this.onPress=e=>{clearTimeout(this.pressTimer),!(!this.touchable||this.menu||this.alarm||this.controlOpen||this.popup||this.ask||e.composedPath().some(a=>a.classList&&["act","nav","mmini","mcard","pip","chip","ov"].some(s=>a.classList.contains(s))))&&(this.pressAt={x:e.clientX,y:e.clientY},this.pressTimer=window.setTimeout(()=>{this.swallowTap=!0,this.openMenu()},700))};this.onPressMove=e=>{this.pressAt&&Math.hypot(e.clientX-this.pressAt.x,e.clientY-this.pressAt.y)>12&&clearTimeout(this.pressTimer)};this.onPressEnd=()=>{clearTimeout(this.pressTimer),this.pressAt=void 0}}get config(){return this.effConfig}set config(e){if(e===this.rawConfig)return;let n=this.effConfig;this.rawConfig=e,this.effConfig=xi(e,this.displayId),this.effFor=`${this.displayId}`,this.requestUpdate("config",n)}get display(){return this.config?.displays.find(e=>e.id===this.displayId)??this.config?.displays[0]}pageById(e){return this.config?.pages.find(n=>n.id===e)}connectedCallback(){super.connectedCallback(),/Home ?Assistant\//.test(navigator.userAgent)&&this.setAttribute("app",""),this.resize=new ResizeObserver(()=>this.measure()),this.resize.observe(this),this.mediaPoll=window.setInterval(()=>this.mediaTick(),15e3),this.miniTicker=window.setInterval(()=>{this.nowPlaying()&&this.requestUpdate()},5e3),this.started&&this.restart()}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect();for(let e of[this.menuTimer,this.pressTimer,this.rotationTimer,this.alarmTimer,this.pipTimer,this.noticeTimer,this.takeoverTimer,this.mediaTimer,this.mediaQueue,this.popupTimer,this.toastTimer])clearTimeout(e);for(let e of[this.shiftTimer,this.controlTimer,this.mediaTicker,this.mediaPoll,this.miniTicker,this.ringTimer])clearInterval(e)}measure(){let e=this.offsetWidth,n=this.offsetHeight;if(!e||!n)return;let a=e/n,s=this.forceOrientation??this.display?.orientation,r=s==="portrait"||s==="landscape"?s:a<1?"portrait":"landscape",o=po(r,a),l=Math.min(e/o.w,n/o.h);r!==this.orient&&(this.orient=r),(o.w!==this.grid.w||o.h!==this.grid.h)&&(this.grid=o),l>0&&Math.abs(l-this.scale)>5e-4&&(this.scale=l)}willUpdate(e){if(e.has("displayId")&&this.effFor!==`${this.displayId}`&&(e.has("config")||e.set("config",this.effConfig),this.effConfig=xi(this.rawConfig,this.displayId),this.effFor=`${this.displayId}`),Ot(Pt(this.config?.design.language,this.hass?.language)),(e.has("config")||e.has("forceOrientation")||e.has("displayId"))&&this.measure(),e.has("hass")){this.forecasts.setHass(this.hass);let l=e.get("hass");l&&this.hass&&this.started&&this.processChanges(l,this.hass)}let n=this.display,a=this.config?.design,s=wr(n?.theme??a?.theme);if(this.theme=s.theme,e.has("config")||e.has("preview")||e.has("displayId")||e.has("streamMode")){let l=a?.ambient,c={type:l?.type??ct.find(u=>u.id===s.theme)?.ambient??"none",strength:l?.strength??1,speed:l?.speed??"slow"},h=!this.streamMode&&(n?.ticker??n?.profile!=="tv");this.ctx=this.config?{forecasts:this.forecasts,config:this.config,preview:this.preview,ambient:c,displayId:n?.id,ticker:h}:void 0,e.has("config")&&this.photos.reload()}this.applyMode(s.light),this.updateShift();let r=n?.night?.entity,o=!!r&&this.hass?.states[r]?.state==="on";if(!this.started&&this.hass&&this.config&&n)this.started=!0,this.night=o,this.restart();else if(this.started&&this.fixedPage&&e.has("config")&&!e.has("fixedPage")&&o===this.night){let l=this.pageById(this.fixedPage);l&&(this.layers=this.layers.map(c=>c.leaving?c:{...c,page:l}))}else this.started&&(o!==this.night||e.has("config")||e.has("fixedPage")||e.has("displayId"))&&(this.night=o,this.restart())}applyMode(e){let n=this.config?.design,a=this.hass?.states["sun.sun"]?.state==="below_horizon",s=this.display?.mode??n?.mode??(e?"light":"auto"),r=this.modeOverride??(s==="auto"?a?"dark":"light":s),o=n?.evening!=="off"&&a&&r==="dark";if(r===this.mode){this.modeTimer||(this.evening=o);return}if(!this.started||this.preview){clearTimeout(this.modeTimer),this.modeTimer=void 0,this.dimming=!1,this.mode=r,this.evening=o;return}this.modeTimer||(this.dimming=!0,this.modeTimer=window.setTimeout(()=>{this.modeTimer=void 0,this.dimming=!1,this.requestUpdate(),this.mode=r,this.evening=o},1600))}updated(){let e=this.config?.design,n=(c,h)=>h?this.style.setProperty(c,h):this.style.removeProperty(c),a=e?.colors?.[this.mode]??{},s=(c,h)=>c?`color-mix(in srgb, ${c} ${h}%, transparent)`:void 0,r=this.display?.text_size??e?.text_size??"normal";n("--af-fs",r==="large"?"1.15":r==="xlarge"?"1.3":void 0);let o=(this.display?.contrast??e?.contrast)==="high";n("--af-c2",o?"0.9":void 0),n("--af-c3",o?"0.72":void 0);let l=a.ink??(o?"var(--af-ink)":void 0);n("--af-accent",a.accent??e?.accent),n("--af-accent-soft",s(a.accent??e?.accent,14)),n("--af-bg",a.bg),n("--af-bg-art",a.bg?"none":void 0),n("--af-ink",a.ink),n("--af-ink-2",s(l,o?86:66)),n("--af-ink-3",s(l,o?66:40)),n("--af-line",s(l,o?20:12)),n("--af-surface",s(a.ink,5)),n("--af-card",a.card?s(a.card,Number(a.card_opacity??100)):void 0),n("--af-good",a.good),n("--af-alert",a.alert),n("--af-cold",a.cold),n("--af-card-radius",e?.radius!=null?`${e.radius}px`:void 0),n("--af-display",Be(e?.fonts?.display)),n("--af-sans",Be(e?.fonts?.text)),un(this.renderRoot,e?.css)}transitionFor(e){let n={...yo,...this.config?.design.transition,...this.display?.transition,...e.transition},a=Math.max(.2,Math.min(10,Number(n.duration)||yo.duration));return{type:n.type??"fade",duration:this.preview?Math.min(.5,a):a}}restart(){clearTimeout(this.takeoverTimer),this.takeover=void 0,this.idx=-1,this.next()}next(){this.step(1)}prev(){this.step(-1)}browse(e){this.step(e,hc)}step(e,n){clearTimeout(this.rotationTimer);let a=this.display;if(!a||this.takeover)return;if(this.fixedPage){let o=this.pageById(this.fixedPage);o&&this.show(o);return}if(this.night){this.show(this.pageById(a.night?.page)??cc);return}let s=a.playlist,r={display:a.id,orientation:this.orient};for(let o=0;o<s.length;o++){this.idx=(((this.idx<0&&e<0?0:this.idx)+e)%s.length+s.length)%s.length;let l=s[this.idx],c=this.pageById(l.page);if(c&&ht(this.hass,l.show_if,r)&&ht(this.hass,c.show_if,r)){this.show(c),this.paused?this.pausedPage=c.id:this.rotationTimer=window.setTimeout(()=>this.next(),(n??l.duration??c.duration??30)*1e3*this.speed);return}}this.rotationTimer=window.setTimeout(()=>this.next(),6e4)}get currentPageId(){return this.layers.filter(e=>!e.leaving).at(-1)?.page.id}get busy(){return!!(this.alarm||this.pip||this.notice||this.takeover||this.media||this.controlOpen||this.popup||this.ask)}showPage(e){let n=this.pageById(e);if(!n)return;clearTimeout(this.rotationTimer),clearTimeout(this.takeoverTimer),this.takeover=void 0;let a=this.display?.playlist??[],s=a.findIndex(r=>r.page===e);s>=0&&(this.idx=s),this.show(n),this.paused?this.pausedPage=e:this.rotationTimer=window.setTimeout(()=>this.next(),((s>=0?a[s].duration:void 0)??n.duration??30)*1e3*this.speed)}setPaused(e){if(e===this.paused)return;if(this.paused=e,this.requestUpdate(),clearTimeout(this.rotationTimer),e){this.pausedPage=this.currentPageId;return}if(this.pausedPage=void 0,this.takeover||this.night||this.fixedPage)return;let n=this.pageById(this.currentPageId);this.rotationTimer=window.setTimeout(()=>this.next(),(n?.duration??30)*1e3*this.speed)}async show(e){let n=++this.layerSeq,a=null;if(e.background?.type==="photo"&&(a=await this.photos.next(),a&&!await En(a.url)&&(this.photos.reload(),a=await this.photos.next(),a&&!await En(a.url)&&(a=null))),n!==this.layerSeq)return;let s=this.transitionFor(e);this.layers=[...this.layers.filter(r=>!r.leaving).map(r=>({...r,leaving:!0,trans:s})),{key:n,page:e,photo:a,leaving:!1,trans:s}],window.setTimeout(()=>{this.layers=this.layers.filter(r=>!r.leaving||r.key>n)},s.duration*1e3+150),this.dispatchEvent(new CustomEvent("af-page",{detail:e.id,bubbles:!0,composed:!0}))}eventsForDisplay(){let e=this.display;return!e||!this.config?[]:this.config.events.filter(n=>n.enabled!==!1&&(e.events==="all"||e.events.includes(n.id))&&(!n.displays||n.displays.includes(e.id)))}processChanges(e,n){if(this.fixedPage)return;for(let s of this.eventsForDisplay())for(let r of Et(s)){let o=e.states[r],l=n.states[r];if(s.kind==="media"){let c=mt(l);c&&c!==mt(o)&&this.fire(s,o,l);continue}if(!(!o||!l||o.state===l.state)){if(mo(s,o,l)){this.fire(s,o,l);continue}s.to!=="*"&&(s.kind==="info"&&s.from&&l.state===s.from&&this.removeChip(s.id),this.alarm?.ev.id===s.id&&l.state!==s.to&&this.holdAlarm(),this.takeover?.ev.id===s.id&&l.state!==s.to&&this.checkTakeover())}}let a=this.pip?.ev.text;if(this.pip&&a&&n.states[a]!==e.states[a]){let s=this.eventText(this.pip.ev,n);s&&(this.pip={...this.pip,text:s})}}fire(e,n,a){if(e.only_home&&!Object.values(this.hass?.states??{}).some(o=>o.entity_id.startsWith("person.")&&o.state==="home")||!ht(this.hass,e.show_if,{display:this.display?.id,orientation:this.orient}))return;let s=this.inQuiet(e);if(s&&e.quiet_action==="skip")return;let r=e.at_night??e.kind==="alarm";if(this.night&&!r){e.kind==="info"&&this.addChip(e,new Date);return}if(e.sound&&e.kind!=="media"&&!s&&!this.displayMuted()&&this.ring(e),e.kind==="media"){a&&e.style!=="mini"&&this.queueMedia(e,a.entity_id);return}if(e.kind==="alarm")this.openAlarm(e);else if(e.kind==="live"){let o=this.pip?.ev.id===e.id,l=this.lastFired.get(e.id)??0;if(!o&&e.cooldown&&Date.now()-l<e.cooldown*1e3)return;this.lastFired.set(e.id,Date.now()),this.openPip(e)}else if(e.kind==="page"){if(!this.openTakeover(e))return}else{let o=a?new Date(a.last_changed):new Date,l=n&&a?o.getTime()-new Date(n.last_changed).getTime():void 0,c=e.cost?parseFloat(this.hass?.states[e.cost]?.state??""):NaN;this.openNotice(e,o,l,Number.isFinite(c)&&c>0?c:null)}uc()}eventText(e,n=this.hass){if(!e.text)return"";let a=n?.states[e.text],s=e.text_attribute?a?.attributes[e.text_attribute]:a?.state;return s==null||s==="unknown"||s==="unavailable"?"":String(s)}inQuiet(e){return!!(e.quiet?.after||e.quiet?.before)&&et(this.hass,{condition:"time",after:e.quiet.after,before:e.quiet.before})}displayMuted(){if(Date.now()<this.muteUntil)return!0;let e=this.display?.sound;return e?e.mute?!0:!!(e.quiet?.after||e.quiet?.before)&&et(this.hass,{condition:"time",after:e.quiet.after,before:e.quiet.before}):!1}volumeFor(e){return(e.volume??70)*(this.display?.sound?.volume??100)/100}ring(e){if(clearInterval(this.ringTimer),Di(e.sound,this.volumeFor(e)),e.sound!=="alarm"||e.kind!=="alarm")return;let n=Date.now()+12e4;this.ringTimer=window.setInterval(()=>{if(this.alarm?.ev.id!==e.id||Date.now()>n){clearInterval(this.ringTimer);return}Di(e.sound,this.volumeFor(e))},4e3)}testEvent(e){let n=this.config?.events.find(a=>a.id===e);if(n)if(n.sound&&n.kind!=="media"&&this.ring(n),n.kind==="info")this.openNotice(n,new Date,102*6e4,.63);else if(n.kind==="live")this.openPip(n);else if(n.kind==="page")this.openTakeover(n,!0);else if(n.kind==="media"){let a=Et(n).find(s=>mt(this.hass?.states[s]));this.openMedia(n,a??Et(n)[0]??"media_player.demo",{force:!0,demo:!a})}else this.openAlarm(n)}secs(e){return Math.max(3,e*this.speed)}openAlarm(e){this.closePip(),this.closeMedia();let n=this.secs(e.max??120);this.alarm={ev:e,at:new Date,secs:n,seq:++this.seq},clearTimeout(this.alarmTimer),this.alarmTimer=window.setTimeout(()=>this.closeAlarm(),n*1e3)}holdAlarm(){if(!this.alarm)return;let e=this.secs(this.alarm.ev.hold_after??30);this.alarm={...this.alarm,secs:e,seq:++this.seq},clearTimeout(this.alarmTimer),this.alarmTimer=window.setTimeout(()=>this.closeAlarm(),e*1e3)}closeAlarm(){clearTimeout(this.alarmTimer),this.alarm?.ev.sound==="alarm"&&(clearInterval(this.ringTimer),fo()),this.alarm=void 0}openPip(e){if(this.alarm)return;this.media?.style==="card"&&this.closeMedia();let n=this.secs(e.duration??30),a=this.pip?.ev.id===e.id?this.pip.text:e.text_attribute&&this.eventText(e)||d("Bewegung erkannt");this.pip={ev:e,at:new Date,secs:n,seq:++this.seq,text:a},clearTimeout(this.pipTimer),this.pipTimer=window.setTimeout(()=>this.closePip(),n*1e3)}closePip(){clearTimeout(this.pipTimer),this.pip=void 0}openNotice(e,n,a,s){let r=this.secs(e.duration??60);this.notice={ev:e,at:n,secs:r,seq:++this.seq,duration:a,cost:s},clearTimeout(this.noticeTimer),this.noticeTimer=window.setTimeout(()=>{this.addChip(e,n),this.closeNotice()},r*1e3)}closeNotice(){clearTimeout(this.noticeTimer),this.notice=void 0}openTakeover(e,n=!1){let a=this.pageById(e.page);if(!a)return!1;let s=Date.now(),r=this.takeover?.ev.id===e.id;return!r&&!n&&e.cooldown&&s-(this.lastFired.get(e.id)??0)<e.cooldown*1e3*this.speed?!1:(clearTimeout(this.rotationTimer),this.takeover={ev:e,firstAt:r?this.takeover.firstAt:s,lastAt:s,test:n},this.layers.find(o=>!o.leaving)?.page.id!==a.id&&this.show(a),this.checkTakeover(),!0)}checkTakeover(){let e=this.takeover;if(clearTimeout(this.takeoverTimer),!e)return;let{ev:n}=e,a=Date.now(),s=c=>c*1e3*this.speed,r=e.firstAt+s(n.max??600),o=e.test?[]:Et(n).map(c=>this.hass?.states[c]).filter(c=>!!c),l;if(o.some(c=>c.state===n.to))l=r;else{let c=Math.max(e.lastAt,...o.map(h=>new Date(h.last_changed).getTime()));l=Math.min(r,Math.max(e.lastAt+s(n.duration??60),c+s(n.hold_after??0)))}l-a<50?this.closeTakeover():this.takeoverTimer=window.setTimeout(()=>this.checkTakeover(),l-a)}closeTakeover(){let e=this.takeover;if(!e)return;clearTimeout(this.takeoverTimer),this.lastFired.set(e.ev.id,Date.now()),this.takeover=void 0;let n=this.paused?this.pageById(this.pausedPage):void 0;n?this.show(n):this.next()}queueMedia(e,n){clearTimeout(this.mediaQueue),this.mediaQueue=window.setTimeout(()=>{this.openMedia(e,n)},1500)}async openMedia(e,n,a={}){if(!a.force&&(this.alarm||this.notice||this.controlOpen))return;let s=e.style==="fullscreen"?"fullscreen":"card";if(s==="card"&&this.pip&&!a.force)return;let r=a.demo?dc(n):void 0,o=mt(this.hass?.states[n]);!r&&o&&(n=Et(e).find(f=>mt(this.hass?.states[f])===o)??n);let l=r??this.hass?.states[n],c=mt(l);if(!c||!a.force&&c===this.lastMediaKey&&Date.now()-this.lastMediaAt<45e3)return;this.lastMediaKey=c,this.lastMediaAt=Date.now(),this.mediaShown.set(e.id,Date.now());let h=l.attributes.entity_picture;if(h&&await Promise.race([En(h),new Promise(f=>setTimeout(f,4e3))]),!a.force&&mt(this.hass?.states[n])!==c)return;let u=this.secs(e.duration??(s==="fullscreen"?15:12));this.media={ev:e,at:new Date,secs:u,seq:++this.seq,entity:n,style:s,key:c,demo:r},clearTimeout(this.mediaTimer),this.mediaTimer=window.setTimeout(()=>this.closeMedia(),u*1e3),clearInterval(this.mediaTicker),this.mediaTicker=window.setInterval(()=>this.requestUpdate(),1e3)}closeMedia(){clearTimeout(this.mediaTimer),clearInterval(this.mediaTicker),this.media=void 0}mediaTick(){if(!(!this.started||this.fixedPage))for(let e of this.eventsForDisplay()){if(e.kind!=="media"||!e.interval||e.style==="mini")continue;let n=Et(e).map(a=>this.hass?.states[a]).find(a=>mt(a));n&&Date.now()-(this.mediaShown.get(e.id)??0)>=e.interval*6e4*this.speed&&(this.lastMediaKey="",this.fire(e,void 0,n))}}addChip(e,n){this.chips=[...this.chips.filter(a=>a.id!==e.id),{id:e.id,icon:e.icon,text:e.chip??e.title,at:n}]}removeChip(e){this.chips=this.chips.filter(n=>n.id!==e)}showToast(e,n=!1){clearTimeout(this.toastTimer),this.toast={text:e,seq:++this.seq,bad:n},this.toastTimer=window.setTimeout(()=>this.toast=void 0,2600)}confirmFirst(e){return new Promise(n=>{let a=window.setTimeout(()=>s(!1),15e3),s=r=>{clearTimeout(a),this.ask=void 0,n(r)};this.ask={text:e,answer:s}})}closePopup(){clearTimeout(this.popupTimer),this.popup=void 0}renderPopup(){let e=this.popup;return e?p`<div class="ov popup">
      <div class="pbox">
        ${e.action.title?p`<div class="ptitle display">${e.action.title}</div>`:m}
        <af-card .hass=${this.hass} .options=${{card:e.action.card}}></af-card>
      </div>
    </div>`:m}renderAsk(){let e=this.ask;return e?p`<div class="ov notice ask">
      <div class="box">
        <h2 class="display">${e.text}</h2>
        <div class="choices">
          <button class="no" @click=${n=>(n.stopPropagation(),e.answer(!1))}>${d("Abbrechen")}</button>
          <button class="yes" @click=${n=>(n.stopPropagation(),e.answer(!0))}>${d("Ja")}</button>
        </div>
      </div>
    </div>`:m}renderToast(){let e=this.toast;return e?We(e.seq,p`<div class="toast ${e.bad?"bad":""}">${_e(e.bad?"warning":"check")}<span>${e.text}</span></div>`):m}openControl(){let e=this.display?.control;if(!(this.preview||!e?.enabled)){if(this.hasAttribute("app")){vo(e.dashboard??"/lovelace/0",e.idle??60);return}this.closeMedia(),this.controlOpen=!0,this.touchControl()}}closeControl(){clearInterval(this.controlTimer),this.controlOpen=!1}onFrameLoad(e){try{let n=e.target.contentWindow;for(let a of["pointerdown","touchstart","wheel","keydown"])n?.addEventListener(a,this.touchControl,{passive:!0})}catch{}}onTap(e){if(this.swallowTap){this.swallowTap=!1;return}let n=e.composedPath();if(this.menu){n.some(o=>o.classList?.contains("qmenu"))||this.closeMenu();return}let a=o=>n.some(l=>l.classList?.contains(o)),s=n.find(o=>o.classList?.contains("chip"));if(s)return this.removeChip(s.dataset.id??"");if(this.ask)return;if(this.popup){a("pbox")||this.closePopup();return}if(this.alarm)return this.closeAlarm();if(this.notice)return this.closeNotice();if(this.media&&(this.media.style==="fullscreen"||a("mcard")))return this.closeMedia();if(a("pip"))return this.closePip();let r=n.find(o=>o.classList?.contains("mmini"));if(r?.dataset.entity){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r.dataset.entity},bubbles:!0,composed:!0}));return}if(this.display?.control?.mode==="screensaver"&&ts()?.stopScreensaver)return ts().stopScreensaver();this.controlOpen||this.openControl()}renderTimer(e,n){return We(e.seq,p`<div class="timer"><i style="background:${n};animation-duration:${e.secs}s"></i></div>`)}renderAlarm(){let e=this.alarm;return e?p`<div class="ov alarm">
      ${e.ev.camera?p`<af-camera-view .hass=${this.hass} .entity=${e.ev.camera} .osd=${`DEMO \xB7 ${e.ev.where.toUpperCase()}`}></af-camera-view>
            <div class="shade"></div>
            <div class="live"><i></i>${d("Live")}${e.ev.where?` \xB7 ${e.ev.where}`:""}</div>`:p`<div class="plain"></div>`}
      <div class="msg">
        <div class="bell">${_e(e.ev.icon??"bell")}</div>
        <div><h1 class="display">${e.ev.title}</h1><p class="num">${[e.ev.where,Q(e.at)].filter(Boolean).join(" \xB7 ")}</p></div>
      </div>
      <div class="hint">${d("Tippen zum Schlie\xDFen")}</div>
      ${this.renderTimer(e,"var(--af-alert)")}
    </div>`:m}renderPip(){let e=this.pip;return e?p`<div class="pip">
      <div class="v">
        <af-camera-view .hass=${this.hass} .entity=${e.ev.camera} .osd=${`DEMO \xB7 ${e.ev.title.toUpperCase()}`}></af-camera-view>
        <div class="live small"><i></i>${d("Live")}</div>
      </div>
      <div class="m">
        <div class="r">${_e(e.ev.icon??"cam")}<span>${e.ev.title}</span><span class="tm num">${Q(e.at)}</span></div>
        <div class="q">${e.text===d("Bewegung erkannt")?e.text:`\u201E${e.text}\u201C`}</div>
      </div>
      ${this.renderTimer(e,"var(--af-accent)")}
    </div>`:m}renderNotice(){let e=this.notice;if(!e)return m;let n=[];return e.duration&&e.duration>6e4&&n.push([d("Dauer"),yi(e.duration)]),e.cost!=null&&n.push([d("Kosten"),`${R(e.cost,2)} \u20AC`]),p`<div class="ov notice">
      <div class="box">
        <div class="icw">${_e(e.ev.icon??"info")}</div>
        <h2 class="display">${e.ev.title}</h2>
        <div class="sub">${this.eventText(e.ev)||[e.ev.where,e.ev.kind==="info"&&e.ev.from?d("fertig um {time}",{time:Q(e.at)}):d("seit {time}",{time:Q(e.at)})].filter(Boolean).join(" \xB7 ")}</div>
        ${n.length?p`<div class="stats">${n.map(([a,s])=>p`<div><div class="k">${a}</div><div class="val display num">${s}</div></div>`)}</div>`:m}
        <div class="pill">${d("Erledigt")}</div>
        <div class="fine">${d("Bleibt danach als kleine Erinnerung oben rechts.")}</div>
      </div>
    </div>`}renderMedia(){let e=this.media;if(!e)return m;let n=e.demo??this.hass?.states[e.entity],a=n?.attributes??{},s=a.entity_picture,r=e.ev.where||a.friendly_name||"",o=Number(a.media_duration),l=Number(a.media_position);n?.state==="playing"&&a.media_position_updated_at&&(l+=(Date.now()-new Date(a.media_position_updated_at).getTime())/1e3);let c=o>0&&Number.isFinite(l)?p`<div class="prog">
            <div class="bar"><i style="transform:scaleX(${Math.min(1,Math.max(0,l/o))})"></i></div>
            <div class="times num"><span>${wo(Math.min(l,o))}</span><span>${wo(o)}</span></div>
          </div>`:m,h=We(s??e.key,p`<div class="art" style=${s?`background-image:url('${s}')`:""}>${s?m:_e("music")}</div>`),u=We(e.key,p`<div class="mtext">
        <div class="mlabel">${_e("music")}<span>${n?.state==="paused"?"Pausiert":"L\xE4uft gerade"}${r?` \xB7 ${r}`:""}</span></div>
        <div class="mtitle display">${a.media_title??""}</div>
        ${a.media_artist?p`<div class="martist">${a.media_artist}</div>`:m}
        ${e.style==="fullscreen"&&a.media_album_name&&a.media_album_name!==a.media_title?p`<div class="malbum">${a.media_album_name}</div>`:m}
        ${c}
      </div>`);return e.style==="fullscreen"?p`<div class="ov mfull">
        <div class="mbg ${s?"":"none"}" style=${s?`background-image:url('${s}')`:""}></div>
        <div class="mveil"></div>
        <div class="mwrap">${h}${u}</div>
      </div>`:p`<div class="mcard">${h}${u}</div>`}nowPlaying(){if(!(this.fixedPage&&!this.preview))for(let e of this.eventsForDisplay()){if(e.kind!=="media"||e.style!=="mini"||this.night&&!e.at_night)continue;let n=Et(e).map(o=>this.hass?.states[o]).filter(o=>!!o?.attributes.media_title),a=n.find(o=>o.state==="playing"),s=n.find(o=>o.state==="paused"&&Date.now()-new Date(o.last_changed).getTime()<12e4),r=a??s;if(r)return{ev:e,s:r}}}renderMini(){if(this.media||this.alarm||this.pip||this.takeover||this.controlOpen)return m;if(this.pageById(this.currentPageId)?.widgets.some(u=>u.type==="media"))return m;let e=this.nowPlaying();if(!e)return m;let{ev:n,s:a}=e,s=a.attributes,r=s.entity_picture,o=n.where||s.friendly_name||"",l=Number(s.media_duration),c=Number(s.media_position);a.state==="playing"&&s.media_position_updated_at&&(c+=(Date.now()-new Date(s.media_position_updated_at).getTime())/1e3);let h=`${s.media_title}|${s.media_artist??""}`;return p`<div class="mmini ${a.state}" data-entity=${a.entity_id}>
      ${We(h,p`<div class="art" style=${r?`background-image:url('${r}')`:""}>${r?m:_e("music")}</div>`)}
      ${We(h,p`<div class="mtext">
          <div class="mlabel">${_e("music")}<span>${a.state==="paused"?d("Pausiert"):d("L\xE4uft gerade")}${o?` \xB7 ${o}`:""}</span></div>
          <div class="mtitle display">${s.media_title??""}</div>
          ${s.media_artist?p`<div class="martist">${s.media_artist}</div>`:m}
          ${l>0&&Number.isFinite(c)?p`<div class="bar"><i style="transform:scaleX(${Math.min(1,Math.max(0,c/l))})"></i></div>`:m}
        </div>`)}
    </div>`}get touchable(){return!this.preview&&!this.streamMode&&this.display?.control?.enabled!==!1}updateShift(){if(!(!!this.display?.oled&&!this.preview)){clearInterval(this.shiftTimer),this.shiftTimer=void 0,(this.shift[0]||this.shift[1])&&(this.shift=[0,0]);return}if(this.shiftTimer)return;let n=()=>{this.shiftStep=(this.shiftStep+1)%8;let a=this.shiftStep/8*2*Math.PI;this.shift=[Math.round(Math.cos(a)*6),Math.round(Math.sin(a)*6)]};n(),this.shiftTimer=window.setInterval(n,18e4)}openMenu(){this.menu=!0,this.touchMenu()}touchMenu(){clearTimeout(this.menuTimer),this.menuTimer=window.setTimeout(()=>this.closeMenu(),1e4)}closeMenu(){clearTimeout(this.menuTimer),this.menu=!1}fully(){return window.fully}async menuAction(e){this.touchMenu();let n=this.fully();switch(e){case"pause":this.hass&&this.display&&(await this.hass.callWS({type:"ambiframe/display/pause",display_id:this.display.id,paused:!this.paused}).catch(()=>{}),this.showToast(this.paused?d("Weiter geht's"):d("Angehalten")));break;case"next":this.browse(1);break;case"mute":{let a=Date.now()<this.muteUntil;this.muteUntil=a?0:Date.now()+36e5,xo("ambiframe-mute-until",String(this.muteUntil)),this.showToast(a?d("T\xF6ne wieder an"):d("Eine Stunde stumm")),this.requestUpdate();break}case"brighter":case"darker":{let a=Number(n?.getScreenBrightness?.()??150),s=Math.max(5,Math.min(255,Math.round(a+(e==="brighter"?40:-40))));n?.setScreenBrightness?.(s),this.showToast(d("Helligkeit {n} %",{n:Math.round(s/255*100)}));break}case"screen":this.closeMenu(),n?.turnScreenOff?.(!0);break;case"dashboard":this.closeMenu(),this.openControl();break;case"reload":xo("ambiframe-planned-reload",String(Date.now())),location.reload();break}}renderMenu(){if(!this.menu)return m;let e=this.fully(),n=Date.now()<this.muteUntil,a=[["pause",this.paused?"play":"pause",this.paused?d("Weiter abspielen"):d("Anhalten"),!0],["next","forward",d("N\xE4chste Seite"),!0],["mute",n?"speaker":"mute",n?d("T\xF6ne an"):d("1 Stunde stumm"),!0],["darker","moon",d("Dunkler"),!!e?.setScreenBrightness],["brighter","sun",d("Heller"),!!e?.setScreenBrightness],["screen","moon",d("Bildschirm aus"),!!e?.turnScreenOff],["dashboard","home",d("Dashboard"),this.display?.control?.enabled!==!1],["reload","reload",d("Neu laden"),!0]];return p`<div class="qmenu" role="dialog" aria-label=${d("Schnellmen\xFC")}>
      <div class="qhead">
        <span>${this.display?.name??"Ambiframe"}</span>
        <button class="qclose" aria-label=${d("Schlie\xDFen")} @click=${s=>(s.stopPropagation(),this.closeMenu())}>${_e("close")}</button>
      </div>
      <div class="qgrid">
        ${a.filter(([,,,s])=>s).map(([s,r,o])=>p`<button class=${s==="mute"&&n||s==="pause"&&this.paused?"on":""} @click=${l=>(l.stopPropagation(),void this.menuAction(s))}>
              ${_e(r)}<span>${o}</span>
            </button>`)}
      </div>
    </div>`}renderNav(){let e=this.display;if(!(e?.nav??e?.control?.enabled!==!1)||this.streamMode||this.preview||this.fixedPage||this.night||this.takeover)return m;if(this.alarm||this.controlOpen||this.popup||this.ask||this.media?.style==="fullscreen")return m;let a=(s,r)=>{s.stopPropagation(),this.browse(r)};return p`<button class="nav prev" aria-label=${d("Vorherige Seite")} @click=${s=>a(s,-1)}>${_e("back")}</button>
      <button class="nav next" aria-label=${d("N\xE4chste Seite")} @click=${s=>a(s,1)}>${_e("forward")}</button>`}renderControl(){if(!this.controlOpen)return m;let e=!!(this.alarm||this.notice||this.pip);return p`<div class="ov control ${e?"covered":""}">
      <iframe src=${this.display?.control.dashboard??"/lovelace/0"} title="Home Assistant" @load=${this.onFrameLoad}></iframe>
      <div class="back" @click=${()=>this.closeControl()}>${_e("back")}${d("Zur\xFCck zu Ambiframe")} <span class="num">· ${this.controlLeft} s</span></div>
    </div>`}render(){if(!this.config||!this.display)return p`<div class="empty">${d("Kein Display konfiguriert")}</div>`;let e=this.grid;return p`<div
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
      ${Vt(this.layers,n=>n.key,n=>p`<af-page
            class="layer t-${n.trans.type} ${n.leaving?"out":""}"
            style="--t:${n.trans.duration}s"
            .hass=${this.hass}
            .page=${n.page}
            .ctx=${this.ctx}
            .photo=${n.photo}
            .grid=${e}
            .orientation=${this.orient}
          ></af-page>`)}
      ${this.chips.length&&!this.alarm?p`<div class="chips">
            ${this.chips.map(n=>p`<div class="chip" data-id=${n.id}>${_e(n.icon)}<span>${n.text}</span><span class="faint num">${Q(n.at)}</span></div>`)}
          </div>`:m}
      ${this.renderMini()} ${this.renderMedia()} ${this.renderPip()} ${this.renderPopup()} ${this.renderNotice()} ${this.renderAlarm()}
      ${this.renderAsk()} ${this.renderToast()} ${this.renderNav()} ${this.renderMenu()}
    </div>
    ${this.renderControl()}`}};zi.properties={hass:{attribute:!1},config:{attribute:!1,noAccessor:!0},displayId:{attribute:"display-id"},streamMode:{type:Boolean,attribute:"stream-mode"},shift:{state:!0},preview:{type:Boolean},fixedPage:{attribute:!1},speed:{type:Number},theme:{reflect:!0},mode:{reflect:!0},modeOverride:{attribute:!1},orient:{reflect:!0},forceOrientation:{attribute:!1},grid:{state:!0},evening:{type:Boolean,reflect:!0},dimming:{state:!0},layers:{state:!0},alarm:{state:!0},pip:{state:!0},notice:{state:!0},media:{state:!0},chips:{state:!0},controlOpen:{state:!0},controlLeft:{state:!0},popup:{state:!0},ask:{state:!0},menu:{state:!0},toast:{state:!0},scale:{state:!0},night:{state:!0}},zi.styles=[xr,O`
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
    `];F("af-display",zi);var Ii=class extends se{constructor(){super(...arguments);this.reason="";this.weather=""}connectedCallback(){super.connectedCallback();let e=()=>{this.requestUpdate(),this.timer=window.setTimeout(e,6e4-Date.now()%6e4+50)};e()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer)}render(){let e=new Date,n=te(),a=this.weather||Object.keys(this.hass?.states??{}).find(o=>o.startsWith("weather.")),s=a?this.hass?.states[a]:void 0,r=Number(s?.attributes.temperature);return p`<div class="clock">${e.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})}</div>
      <div class="date">${e.toLocaleDateString(n,{weekday:"long",day:"numeric",month:"long"})}</div>
      ${s&&s.state!=="unavailable"?p`<div class="weather">
            ${ie(Le(s.state))}<span>${Number.isFinite(r)?`${Math.round(r)}\xB0`:""} ${je(s.state)}</span>
          </div>`:m}
      <div class="note">${ie("info")}<span>${d("Ambiframe \xB7 Notfallmodus")}${this.reason?` \u2013 ${d(this.reason)}`:""}</span></div>`}};Ii.properties={hass:{attribute:!1},reason:{},weather:{}},Ii.styles=O`
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
  `;F("af-safe",Ii);var is="2026-10-22T05:18:52.149Z",mc=3e4,fc=5,gc=2*6e4,bc=4,vc=10*6e4,yc=15*6e4,wc=9e4,ko=(()=>{let t=new URLSearchParams(location.search),i=location.pathname.split("/").filter(Boolean).slice(1).map(decodeURIComponent);return{display:t.get("display")??i[0]??null,stream:t.has("stream")||i[1]==="stream"}})(),qe={get:t=>{try{return localStorage.getItem(t)??localStorage.getItem(t.replace(/^ambiframe-/,"wandbild-"))}catch{return null}},set:(t,i)=>{try{localStorage.setItem(t,i)}catch{}}},$o=(()=>{let t=qe.get("ambiframe-client");return t||(t=globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,qe.set("ambiframe-client",t)),t})(),xc=()=>{try{return window.fully?.getDeviceId?.()||null}catch{return null}},kc=()=>{let t=navigator.userAgent,i=window.fully;if(i){let s="";try{s=i.getDeviceName?.()??""}catch{}return s?`Fully Kiosk \xB7 ${s}`:"Fully Kiosk"}let e=/iPad/.test(t)||/Macintosh/.test(t)&&navigator.maxTouchPoints>1;if(/Home ?Assistant\//.test(t))return e?"HA-App \xB7 iPad":/iPhone/.test(t)?"HA-App \xB7 iPhone":"HA-App";let n=e?"iPad":/iPhone/.test(t)?"iPhone":/Android/.test(t)?"Android":/Mac/.test(t)?"Mac":/Windows/.test(t)?"Windows":"Browser",a=/Edg\//.test(t)?"Edge":/Firefox\//.test(t)?"Firefox":/Chrome\//.test(t)?"Chrome":/Safari\//.test(t)?"Safari":"";return a?`${n} \xB7 ${a}`:n},ns=()=>{let t=document,i=t.fullscreenEnabled??t.webkitFullscreenEnabled??!1,e=t.fullscreenElement??t.webkitFullscreenElement,n=matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,a="fully"in window||/Home Assistant\//.test(navigator.userAgent);return i&&!e&&!n&&!a},Pi=class extends se{constructor(){super(...arguments);this.error="";this.hint=!1;this.displayId="";this.swallowClick=!1;this.connectedTo="";this.paused=!1;this.autoSafe="";this.forcedSafe=!1;this.pendingEvent="";this.urlSafe=new URLSearchParams(location.search).has("safe");this.streamMode=ko.stream;this.configText="";this.errors=[];this.noPageSince=0;this.onError=e=>{let n="reason"in e?e.reason:e.error,a=`${"filename"in e?e.filename:""} ${n?.stack??""}`;if(!/ambiframe/i.test(a))return;let s=Date.now();this.errors=[...this.errors.filter(r=>s-r<gc),s],this.errors.length>=fc&&!this.safeReason&&this.enterSafe("Anzeigefehler")};this.watchPage=()=>{if(this.safeReason||!this.config||!this.displayId||document.hidden){this.noPageSince=0;return}if(this.disp?.currentPageId){this.noPageSince=0;return}this.noPageSince||=Date.now(),Date.now()-this.noPageSince>wc&&this.enterSafe("keine Seite sichtbar",5*6e4)};this.onPointerDown=e=>{if(ns()){if(!this.displayId){this.goFullscreen();return}e.stopPropagation(),this.swallowClick=!0,this.goFullscreen()}};this.onClick=e=>{this.swallowClick&&(this.swallowClick=!1,e.stopPropagation())};this.onFullscreenChange=()=>{this.hint=ns()};this.onPage=()=>{this.report()};this.onVisibility=()=>{this.report()}}get safeReason(){return this.urlSafe?"per Link (?safe=1)":this.forcedSafe?"aus Home Assistant eingeschaltet":this.autoSafe}enterSafe(e,n=yc){this.autoSafe||(this.autoSafe=e,this.report(),clearTimeout(this.safeTimer),this.safeTimer=window.setTimeout(()=>this.leaveSafe(),n))}leaveSafe(){clearTimeout(this.safeTimer),this.autoSafe="",this.errors=[],this.noPageSince=0,this.report()}checkStartLoop(){let e=Date.now(),n=Number(qe.get("ambiframe-planned-reload")??0);if(qe.set("ambiframe-planned-reload","0"),e-n<2*6e4)return;let a=[];try{a=JSON.parse(qe.get("ambiframe-starts")??"[]")}catch{a=[]}a=[...a.filter(s=>typeof s=="number"&&e-s<vc),e],qe.set("ambiframe-starts",JSON.stringify(a)),a.length>=bc&&this.enterSafe("startet immer wieder neu")}get disp(){return this.renderRoot.querySelector("af-display")}connectedCallback(){super.connectedCallback(),this.hint=!this.streamMode&&ns(),this.addEventListener("pointerdown",this.onPointerDown,{capture:!0}),this.addEventListener("click",this.onClick,{capture:!0}),this.addEventListener("af-page",this.onPage),document.addEventListener("fullscreenchange",this.onFullscreenChange),document.addEventListener("webkitfullscreenchange",this.onFullscreenChange),document.addEventListener("visibilitychange",this.onVisibility),window.addEventListener("error",this.onError),window.addEventListener("unhandledrejection",this.onError),this.watchTimer=window.setInterval(this.watchPage,15e3),this.streamMode||this.checkStartLoop()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this.onPointerDown,{capture:!0}),this.removeEventListener("click",this.onClick,{capture:!0}),this.removeEventListener("af-page",this.onPage),document.removeEventListener("fullscreenchange",this.onFullscreenChange),document.removeEventListener("webkitfullscreenchange",this.onFullscreenChange),document.removeEventListener("visibilitychange",this.onVisibility),window.removeEventListener("error",this.onError),window.removeEventListener("unhandledrejection",this.onError),clearInterval(this.watchTimer),clearTimeout(this.safeTimer),this.unsub?.then(e=>e?.()),this.unsub=void 0,this.disconnectDisplay(),clearTimeout(this.reloadTimer)}goFullscreen(){let e=document.documentElement;try{let n=e.requestFullscreen?.bind(e)??e.webkitRequestFullscreen?.bind(e);Promise.resolve(n?.()).catch(()=>{})}catch{}}resolveDisplay(e){let n=e.displays.map(r=>r.id),a=this.display||ko.display;if(a&&n.includes(a))return a;let s=qe.get("ambiframe-display");return!a&&s&&n.includes(s)?s:n.length!==1?"":(qe.set("ambiframe-display",n[0]),n[0])}choose(e){qe.set("ambiframe-display",e);let n=new URL(location.href);n.searchParams.set("display",e),history.replaceState(history.state,"",n),this.displayId=e}updated(){this.hass&&!this.unsub&&(this.unsub=this.hass.connection.subscribeMessage(e=>{let n=JSON.stringify(e.config);n!==this.configText&&(this.configText=n,this.config=e.config);let a=this.resolveDisplay(e.config);a!==this.displayId&&(this.displayId=a),this.autoSafe==="Ambiframe nicht erreichbar"&&this.leaveSafe()},{type:"ambiframe/config/subscribe"}).catch(e=>{console.warn("Ambiframe nicht erreichbar:",e?.message??e),this.enterSafe("Ambiframe nicht erreichbar",6e4),window.setTimeout(()=>{this.unsub=void 0,this.requestUpdate()},6e4)})),this.hass&&this.displayId!==this.connectedTo&&this.connectDisplay(),this.disp?.setPaused(this.paused),this.firePending()}firePending(){let e=this.pendingEvent&&this.config?.events.find(n=>n.id===this.pendingEvent);!this.disp||!e||(this.pendingEvent="",this.disp.fire(e))}connectDisplay(){this.disconnectDisplay();let e=this.displayId;this.connectedTo=e,!(!this.hass||!e)&&(this.connection=this.hass.connection.subscribeMessage(n=>this.onCommand(n),{type:"ambiframe/display/connect",display_id:e,client_id:$o,name:this.streamMode?d("Videostream"):kc(),version:is,fully:xc(),origin:location.origin}).catch(()=>{}),this.heartbeat=window.setInterval(()=>{this.report()},mc))}disconnectDisplay(){clearInterval(this.heartbeat),this.connection?.then(e=>e?.()),this.connection=void 0,this.connectedTo=""}async report(){if(!(!this.hass||!this.connectedTo))try{let e=await this.hass.callWS({type:"ambiframe/display/report",display_id:this.connectedTo,client_id:$o,page:this.disp?.currentPageId??null,hidden:document.hidden,version:is,safe:this.safeReason||null});this.checkVersion(e?.version)}catch{}}onCommand(e){let n=this.disp;switch(e.command){case"hello":this.forcedSafe=!!e.safe,this.paused=!!e.paused,n?.setPaused(this.paused),this.checkVersion(e.version),this.report();break;case"show_page":n?.showPage(e.page);break;case"next":n?.next();break;case"pause":case"resume":this.paused=e.command==="pause",n?.setPaused(this.paused);break;case"reload":this.reloadWhenIdle();break;case"event":this.pendingEvent=e.id,this.firePending();break;case"safe":this.forcedSafe=e.on,e.on||this.leaveSafe(),this.report();break}}checkVersion(e){if(!(!e||e===is)){try{if(sessionStorage.getItem("ambiframe-reloaded-for")===e)return;sessionStorage.setItem("ambiframe-reloaded-for",e)}catch{}this.reloadWhenIdle()}}reloadWhenIdle(){if(clearTimeout(this.reloadTimer),document.hidden&&!this.streamMode){let a=()=>{document.hidden||(document.removeEventListener("visibilitychange",a),this.reloadWhenIdle())};document.addEventListener("visibilitychange",a);return}if(this.disp?.busy){this.reloadTimer=window.setTimeout(()=>this.reloadWhenIdle(),1e4);return}let e=fetch(import.meta.url,{cache:"reload"}).catch(()=>{}),n=new Promise(a=>setTimeout(a,8e3));Promise.race([e,n]).then(()=>{qe.set("ambiframe-planned-reload",String(Date.now())),location.reload()})}get safeWeather(){for(let e of this.config?.pages??[]){let n=e.widgets?.find(a=>a.type==="weather"&&a.options?.entity);if(n)return String(n.options.entity)}return""}render(){return Ot(Pt(xi(this.config,this.displayId)?.design.language,this.hass?.language)),this.safeReason?p`<af-safe .hass=${this.hass} .reason=${this.safeReason} .weather=${this.safeWeather}></af-safe>`:this.error?p`<div class="error">${this.error}</div>`:this.config&&!this.displayId?p`<div class="pick">
        <h1>${d("Welches Display ist das?")}</h1>
        <p>${d("Die Wahl wird auf diesem Ger\xE4t gespeichert.")}</p>
        <div class="list">${this.config.displays.map(e=>p`<button @click=${()=>this.choose(e.id)}>${e.name}</button>`)}</div>
      </div>`:p`${this.hint?p`<div class="hint">${d("Einmal tippen f\xFCr Vollbild")}</div>`:m}
      <af-display .hass=${this.hass} .config=${this.config} display-id=${this.displayId} ?stream-mode=${this.streamMode}></af-display>`}};Pi.properties={hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},display:{attribute:!1},config:{state:!0},error:{state:!0},hint:{state:!0},displayId:{state:!0},autoSafe:{state:!0},forcedSafe:{state:!0}},Pi.styles=O`
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
  `;F("ambiframe-display-panel",Pi);var X=Symbol("NOT_RESOLVED");function ke(t,i){return{tagName:t,nodeKind:"scalar",implicit:i.implicit??!1,matchByTagPrefix:i.matchByTagPrefix??!1,implicitFirstChars:i.implicitFirstChars??null,resolve:i.resolve,identify:i.identify,represent:i.represent??(e=>String(e)),representTagName:i.representTagName??(()=>t)}}function ws(t,i){let e=i.finalize===void 0;return{tagName:t,nodeKind:"sequence",implicit:!1,matchByTagPrefix:i.matchByTagPrefix??!1,create:i.create,addItem:i.addItem,finalize:i.finalize??(n=>n),carrierIsResult:e,identify:i.identify,represent:i.represent??(n=>n),representTagName:i.representTagName??(()=>t)}}function ra(t,i){let e=i.finalize===void 0;return{tagName:t,nodeKind:"mapping",implicit:!1,matchByTagPrefix:i.matchByTagPrefix??!1,create:i.create,addPair:i.addPair,has:i.has,keys:i.keys,get:i.get,finalize:i.finalize??(n=>n),carrierIsResult:e,identify:i.identify,represent:i.represent??(n=>n),representTagName:i.representTagName??(()=>t)}}var $c=ke("tag:yaml.org,2002:str",{resolve:t=>t,identify:t=>typeof t=="string"}),Sc=["","~","null","Null","NULL"],Tc=ke("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:t=>Sc.indexOf(t)!==-1?null:X,identify:t=>t===null,represent:()=>"null"}),Ac=ke("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(t,i)=>t==="null"||i&&t===""?null:X,identify:t=>t===null,represent:()=>"null"}),Ec=["","~","null","Null","NULL"],_c=ke("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:t=>Ec.indexOf(t)!==-1?null:X,identify:t=>t===null,represent:()=>"null"}),Cc=["true","True","TRUE"],Lc=["false","False","FALSE"],Mc=ke("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:t=>Cc.indexOf(t)!==-1?!0:Lc.indexOf(t)!==-1?!1:X,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),Nc=["true"],Dc=["false"],zc=ke("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:t=>Nc.indexOf(t)!==-1?!0:Dc.indexOf(t)!==-1?!1:X,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),Ic=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],Pc=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Oc=ke("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:t=>Ic.indexOf(t)!==-1?!0:Pc.indexOf(t)!==-1?!1:X,identify:t=>Object.prototype.toString.call(t)==="[object Boolean]",represent:t=>t?"true":"false"}),Fc=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Bc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Rc(t){let i=t,e=1;return(i[0]==="-"||i[0]==="+")&&(i[0]==="-"&&(e=-1),i=i.slice(1)),i.startsWith("0b")?e*parseInt(i.slice(2),2):i.startsWith("0o")?e*parseInt(i.slice(2),8):i.startsWith("0x")?e*parseInt(i.slice(2),16):e*parseInt(i,10)}function Hc(t,i){if(i){if(!Bc.test(t))return X}else if(!Fc.test(t))return X;let e=Rc(t);return Number.isFinite(e)?e:X}var Ro=ke("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Hc,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),Wc=new RegExp("^-?(?:0|[1-9][0-9]*)$"),Kc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Uc(t){let i=t,e=1;return(i[0]==="-"||i[0]==="+")&&(i[0]==="-"&&(e=-1),i=i.slice(1)),i.startsWith("0b")?e*parseInt(i.slice(2),2):i.startsWith("0o")?e*parseInt(i.slice(2),8):i.startsWith("0x")?e*parseInt(i.slice(2),16):e*parseInt(i,10)}function Vc(t,i){if(i){if(!Kc.test(t))return X}else if(!Wc.test(t))return X;let e=Uc(t);return Number.isFinite(e)?e:X}var Gc=ke("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Vc,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),jc=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function qc(t){let i=t.replace(/_/g,""),e=1;if((i[0]==="-"||i[0]==="+")&&(i[0]==="-"&&(e=-1),i=i.slice(1)),i.startsWith("0b"))return e*parseInt(i.slice(2),2);if(i.startsWith("0x"))return e*parseInt(i.slice(2),16);if(i.includes(":")){let n=0;for(let a of i.split(":"))n=n*60+Number(a);return e*n}return i!=="0"&&i[0]==="0"?e*parseInt(i,8):e*parseInt(i,10)}function Yc(t){if(!jc.test(t))return X;let i=qc(t);return Number.isFinite(i)?i:X}var cs=ke("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Yc,identify:t=>Number.isInteger(t)&&!Object.is(t,-0)&&t.toString(10).indexOf("e")<0,represent:t=>t.toString(10)}),Zc=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Qc=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Jc(t){if(!Zc.test(t))return X;let i=t.toLowerCase(),e=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;let n=e*parseFloat(i);return Number.isFinite(n)||Qc.test(t)?n:X}function Xc(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let i=t.toString(10);return/^[-+]?[0-9]+e/.test(i)?i.replace("e",".e"):i}var Ho=ke("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Jc,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:Xc}),ep=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),tp=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function ip(t,i){if(i){if(!tp.test(t))return X;let n=t.toLowerCase(),a=n[0]==="-"?-1:1;if("+-".includes(n[0])&&(n=n.slice(1)),n===".inf")return a===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(n===".nan")return NaN;let s=a*parseFloat(n);return Number.isFinite(s)?s:X}if(!ep.test(t))return X;let e=Number(t);return Number.isFinite(e)?e:X}function np(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let i=t.toString(10);return/^[-+]?[0-9]+e/.test(i)?i.replace("e",".e"):i}var ap=ke("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:ip,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:np}),sp=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),rp=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function op(t){if(!sp.test(t))return X;let i=t.toLowerCase().replace(/_/g,""),e=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return e===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;let n=0;if(i.includes(":")){for(let a of i.split(":"))n=n*60+Number(a);n*=e}else n=e*parseFloat(i);return Number.isFinite(n)||rp.test(t)?n:X}function lp(t){if(isNaN(t))return".nan";if(t===Number.POSITIVE_INFINITY)return".inf";if(t===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(t,-0))return"-0.0";let i=t.toString(10);return/^[-+]?[0-9]+e/.test(i)?i.replace("e",".e"):i}var ps=ke("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:op,identify:t=>typeof t=="number"&&(!Number.isInteger(t)||Object.is(t,-0)||t.toString(10).indexOf("e")>=0),represent:lp}),dp=ke("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(t,i)=>t==="<<"||i&&t===""?"<<":X,identify:()=>!1}),cp=/^[A-Za-z0-9+/]*={0,2}$/;function pp(t){let i=t.replace(/\s/g,"");if(i.length%4!==0||!cp.test(i))return X;let e=atob(i),n=new Uint8Array(e.length);for(let a=0;a<e.length;a++)n[a]=e.charCodeAt(a);return n}function hp(t){let i="";for(let e=0;e<t.length;e++)i+=String.fromCharCode(t[e]);return btoa(i)}var up=ke("tag:yaml.org,2002:binary",{resolve:pp,identify:t=>Object.prototype.toString.call(t)==="[object Uint8Array]",represent:hp}),mp=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),fp=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function So(t,i,e,n=0,a=0,s=0,r=0){let o=new Date(Date.UTC(t,i,e,n,a,s,r));return o.setUTCFullYear(t,i,e),o}function gp(t){let i=mp.exec(t);if(i===null&&(i=fp.exec(t)),i===null)return X;let e=+i[1],n=+i[2]-1,a=+i[3];if(!i[4]){let h=So(e,n,a);return h.getUTCFullYear()!==e||h.getUTCMonth()!==n||h.getUTCDate()!==a?X:h}let s=+i[4],r=+i[5],o=+i[6],l=0;if(s>23||r>59||o>59)return X;if(i[7]){let h=i[7].slice(0,3);for(;h.length<3;)h+="0";l=+h}let c=So(e,n,a,s,r,o,l);if(c.getUTCFullYear()!==e||c.getUTCMonth()!==n||c.getUTCDate()!==a)return X;if(i[9]){let h=+i[10],u=+(i[11]||0);if(h>23||u>59)return X;let f=(h*60+u)*6e4;c.setTime(c.getTime()-(i[9]==="-"?-f:f))}return c}var bp=ke("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:gp,identify:t=>t instanceof Date,represent:t=>t.toISOString()}),vp=ws("tag:yaml.org,2002:seq",{create:()=>[],addItem:(t,i)=>{t.push(i)},identify:Array.isArray});function oa(t){if(t===null||typeof t!="object"||Array.isArray(t))return!1;let i=Object.getPrototypeOf(t);return i===null||i===Object.prototype}function hs(t,i){let e={};for(let n of i)t[n]!==void 0&&(e[n]=t[n]);return e}var yp=ws("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(t,i)=>{let e;if(i instanceof Map){if(i.size!==1)return"cannot resolve an ordered map item";e=i.keys().next().value}else if(oa(i)){let n=Object.keys(i);if(n.length!==1)return"cannot resolve an ordered map item";e=n[0]}else return"cannot resolve an ordered map item";return t.seen.has(e)?"duplicate key in ordered map":(t.seen.add(e),t.list.push(i),"")},finalize:t=>t.list,identify:()=>!1}),wp=ws("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(t,i)=>{if(i instanceof Map)return i.size!==1?"cannot resolve a pairs item":(t.push(i.entries().next().value),"");if(Object.prototype.toString.call(i)!=="[object Object]")return"cannot resolve a pairs item";let e=i,n=Object.keys(e);return n.length!==1?"cannot resolve a pairs item":(t.push([n[0],e[n[0]]]),"")},identify:()=>!1}),xp=ra("tag:yaml.org,2002:map",{create:()=>({}),identify:oa,represent:t=>{let i=new Map;for(let e of Object.keys(t))i.set(e,t[e]);return i},addPair:(t,i,e)=>{if(i!==null&&typeof i=="object")return"object-based map does not support complex keys";let n=String(i);return n==="__proto__"?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,""},has:(t,i)=>i!==null&&typeof i=="object"?!1:Object.prototype.hasOwnProperty.call(t,String(i)),keys:t=>Object.keys(t),get:(t,i)=>{let e=String(i);return Object.prototype.hasOwnProperty.call(t,e)?t[e]:null}}),kp=ra("tag:yaml.org,2002:set",{create:()=>new Set,identify:t=>t instanceof Set,represent:t=>{let i=new Map;for(let e of t)i.set(e,null);return i},addPair:(t,i,e)=>e!==null?"cannot resolve a set item":(t.add(i),""),has:(t,i)=>t.has(i),keys:t=>t.keys(),get:()=>null});function $p(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Sp(){return{scalar:[],sequence:[],mapping:[]}}function Tp(t){let i=[];for(let e of t){let n=i.length;for(let a=0;a<i.length;a++){let s=i[a];if(s.nodeKind===e.nodeKind&&s.tagName===e.tagName&&s.matchByTagPrefix===e.matchByTagPrefix){n=a;break}}i[n]=e}return i}var la=class Wo{constructor(i){Fe(this,"tags");Fe(this,"implicitScalarTags");Fe(this,"implicitScalarByFirstChar");Fe(this,"implicitScalarAnyFirstChar");Fe(this,"defaultScalarTag");Fe(this,"defaultSequenceTag");Fe(this,"defaultMappingTag");Fe(this,"exact");Fe(this,"prefix");let e=Tp(i),n=[],a=$p(),s=Sp();for(let h of e){if(h.nodeKind==="scalar"&&h.implicit){if(h.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");n.push(h)}switch(h.nodeKind){case"scalar":h.matchByTagPrefix?s.scalar.push(h):a.scalar[h.tagName]=h;break;case"sequence":h.matchByTagPrefix?s.sequence.push(h):a.sequence[h.tagName]=h;break;case"mapping":h.matchByTagPrefix?s.mapping.push(h):a.mapping[h.tagName]=h;break}}let r=n.filter(h=>h.implicitFirstChars===null),o=new Set;for(let h of n)if(h.implicitFirstChars!==null)for(let u of h.implicitFirstChars)o.add(u);let l=new Map;for(let h of o)l.set(h,n.filter(u=>u.implicitFirstChars===null||u.implicitFirstChars.indexOf(h)!==-1));let c=a.scalar["tag:yaml.org,2002:str"];if(!c)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=e,this.implicitScalarTags=n,this.implicitScalarByFirstChar=l,this.implicitScalarAnyFirstChar=r,this.defaultScalarTag=c,this.defaultSequenceTag=a.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=a.mapping["tag:yaml.org,2002:map"],this.exact=a,this.prefix=s}lookupScalarTag(i){let e=this.exact.scalar[i];if(e)return e;for(let n of this.prefix.scalar)if(i.startsWith(n.tagName))return n}lookupSequenceTag(i){let e=this.exact.sequence[i];if(e)return e;for(let n of this.prefix.sequence)if(i.startsWith(n.tagName))return n}lookupMappingTag(i){let e=this.exact.mapping[i];if(e)return e;for(let n of this.prefix.mapping)if(i.startsWith(n.tagName))return n}resolveImplicitScalarTag(i){let e=this.implicitScalarByFirstChar.get(i.charAt(0))??this.implicitScalarAnyFirstChar;for(let a of e){let s=a.resolve(i,!1,a.tagName);if(s!==X)return{value:s,tag:a}}let n=this.defaultScalarTag;return{value:n.resolve(i,!1,n.tagName),tag:n}}withTags(...i){let e=[];for(let n of i)e=e.concat(n);return new Wo([...this.tags,...e])}},xs=new la([$c,vp,xp]),jb=new la([...xs.tags,Ac,zc,Gc,ap]),Ap=new la([...xs.tags,Tc,Mc,Ro,Ho]),Ep=new la([...xs.tags,_c,Oc,cs,ps,bp,dp,up,yp,wp,kp]),_p=Ep.withTags({...cs,resolve:(t,i,e)=>{let n=cs.resolve(t,i,e);return n===X?Ro.resolve(t,i,e):n}},{...ps,resolve:(t,i,e)=>{let n=ps.resolve(t,i,e);return n===X?Ho.resolve(t,i,e):n}}),qb=ra("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(t,i,e)=>(t.set(i,e),""),has:(t,i)=>t.has(i),keys:t=>t.keys(),get:(t,i)=>t.get(i),identify:t=>t instanceof Map||oa(t),represent:t=>{if(t instanceof Map)return t;let i=new Map,e=t;for(let n of Object.keys(e))i.set(n,e[n]);return i}});function To(t){if(Array.isArray(t)){let i=Array.prototype.slice.call(t);for(let e=0;e<i.length;e++){if(Array.isArray(i[e]))return null;typeof i[e]=="object"&&Object.prototype.toString.call(i[e])==="[object Object]"&&(i[e]="[object Object]")}return String(i)}return typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"?"[object Object]":String(t)}var Yb=ra("tag:yaml.org,2002:map",{create:()=>({}),identify:oa,represent:t=>{let i=new Map;for(let e of Object.keys(t))i.set(e,t[e]);return i},addPair:(t,i,e)=>{let n=To(i);return n===null?"nested arrays are not supported inside keys":(n==="__proto__"?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,"")},has:(t,i)=>{let e=To(i);return e!==null&&Object.prototype.hasOwnProperty.call(t,e)},keys:t=>Object.keys(t),get:(t,i)=>{let e=String(i);return Object.prototype.hasOwnProperty.call(t,e)?t[e]:null}}),Cp={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function as(t,i,e,n,a){let s="",r="",o=Math.floor(a/2)-1;return n-i>o&&(s=" ... ",i=n-o+s.length),e-n>o&&(r=" ...",e=n+o-r.length),{str:s+t.slice(i,e).replace(/\t/g,"\u2192")+r,pos:n-i+s.length}}function ss(t,i){return" ".repeat(Math.max(i-t.length,0))+t}function Lp(t,i){if(!t.buffer)return null;let e={...Cp,...i},n=/\r?\n|\r|\0/g,a=[0],s=[],r,o=-1;for(;r=n.exec(t.buffer);)s.push(r.index),a.push(r.index+r[0].length),t.position<=r.index&&o<0&&(o=a.length-2);o<0&&(o=a.length-1);let l="",c=Math.min(t.line+e.linesAfter,s.length).toString().length,h=e.maxLength-(e.indent+c+3);for(let f=1;f<=e.linesBefore&&!(o-f<0);f++){let b=as(t.buffer,a[o-f],s[o-f],t.position-(a[o]-a[o-f]),h);l=`${" ".repeat(e.indent)}${ss((t.line-f+1).toString(),c)} | ${b.str}
${l}`}let u=as(t.buffer,a[o],s[o],t.position,h);l+=`${" ".repeat(e.indent)}${ss((t.line+1).toString(),c)} | ${u.str}
`,l+=`${"-".repeat(e.indent+c+3+u.pos)}^
`;for(let f=1;f<=e.linesAfter&&!(o+f>=s.length);f++){let b=as(t.buffer,a[o+f],s[o+f],t.position-(a[o]-a[o+f]),h);l+=`${" ".repeat(e.indent)}${ss((t.line+f+1).toString(),c)} | ${b.str}
`}return l.replace(/\n$/,"")}function Ao(t,i){let e="";return t.mark?(t.mark.name&&(e+=`in "${t.mark.name}" `),e+=`(${t.mark.line+1}:${t.mark.column+1})`,!i&&t.mark.snippet&&(e+=`

${t.mark.snippet}`),`${t.reason} ${e}`):t.reason}var ft=class Ko extends Error{constructor(e,n){super();Fe(this,"reason");Fe(this,"mark");this.name="YAMLException",this.reason=e,this.mark=n,this.message=Ao(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${Ao(this,e)}`}static throwAt(e,n,a,s=""){let r=0,o=0;for(let c=0;c<n;c++){let h=e.charCodeAt(c);h===10?(r++,o=c+1):h===13&&(r++,e.charCodeAt(c+1)===10&&c++,o=c+1)}let l={name:s,buffer:e,position:n,line:r,column:n-o};throw l.snippet=Lp(l),new Ko(a,l)}},he={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},K={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},Ce={BLOCK:1,FLOW:2},Ne={CLIP:1,STRIP:2,KEEP:3},Mp=-1;function Eo(t){switch(t){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Uo=new Array(256),Vo=new Array(256);for(let t=0;t<256;t++)Uo[t]=Eo(t)?1:0,Vo[t]=Eo(t);function Np(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}function Dp(t){return t>=48&&t<=57?t-48:(t|32)-97+10}function zp(t){return t===120?2:t===117?4:8}function ia(t,i,e){let n=0;for(;i<e;){let a=t.charCodeAt(i);if(a===10)n++,i++;else if(a===13)n++,i++,t.charCodeAt(i)===10&&i++;else if(a===32||a===9)i++;else break}return{position:i,breaks:n}}function ks(t){return t===1?" ":`
`.repeat(t-1)}function Ip(t,i,e){let n="",a=i,s=i,r=i;for(;a<e;){let o=t.charCodeAt(a);if(o===10||o===13){n+=t.slice(s,r);let l=ia(t,a,e);n+=ks(l.breaks),a=s=r=l.position}else a++,o!==32&&o!==9&&(r=a)}return n+t.slice(s,r)}function Pp(t,i,e){let n="",a=i,s=i,r=i;for(;a<e;){let o=t.charCodeAt(a);if(o===39)n+=t.slice(s,a)+"'",a+=2,s=r=a;else if(o===10||o===13){n+=t.slice(s,r);let l=ia(t,a,e);n+=ks(l.breaks),a=s=r=l.position}else a++,o!==32&&o!==9&&(r=a)}return n+t.slice(s,e)}function Op(t,i,e){let n="",a=i,s=i,r=i;for(;a<e;){let o=t.charCodeAt(a);if(o===92){n+=t.slice(s,a),a++;let l=t.charCodeAt(a);if(l===10||l===13)a=ia(t,a,e).position;else if(l<256&&Uo[l])n+=Vo[l],a++;else{let c=zp(l),h=0;for(;c>0;c--){a++;let u=Dp(t.charCodeAt(a));h=(h<<4)+u}n+=Np(h),a++}s=r=a}else if(o===10||o===13){n+=t.slice(s,r);let l=ia(t,a,e);n+=ks(l.breaks),a=s=r=l.position}else a++,o!==32&&o!==9&&(r=a)}return n+t.slice(s,e)}function _o(t,i,e,n,a,s){let r=n<0?0:n,o=t.slice(i,e).replace(/\r\n?/g,`
`),l=o===""?[]:(o.endsWith(`
`)?o.slice(0,-1):o).split(`
`),c="",h=!1,u=0,f=!1;for(let b of l){let g=0;for(;g<r&&b.charCodeAt(g)===32;)g++;if(n<0||g>=b.length){u++;continue}let v=b.slice(r),S=v.charCodeAt(0);s?S===32||S===9?(f=!0,c+=`
`.repeat(h?1+u:u)):f?(f=!1,c+=`
`.repeat(u+1)):u===0?h&&(c+=" "):c+=`
`.repeat(u):c+=`
`.repeat(h?1+u:u),c+=v,h=!0,u=0}return a===Ne.KEEP?c+=`
`.repeat(h?1+u:u):a!==Ne.STRIP&&h&&(c+=`
`),c}function Fp(t,i){if(i.valueStart===Mp)return"";let{valueStart:e,valueEnd:n}=i;if(i.fast)return t.slice(e,n);switch(i.style){case K.SINGLE_QUOTED:return Pp(t,e,n);case K.DOUBLE_QUOTED:return Op(t,e,n);case K.LITERAL_BLOCK:return _o(t,e,n,i.indent,i.chomping,!1);case K.FOLDED_BLOCK:return _o(t,e,n,i.indent,i.chomping,!0);default:return Ip(t,e,n)}}var Bp=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"});function rs(t){return encodeURI(t).replace(/!/g,"%21")}function Go(t,i){if(t.startsWith("!<")&&t.endsWith(">"))return decodeURIComponent(t.slice(2,-1));let e=t.indexOf("!",1),n=e===-1?"!":t.slice(0,e+1),a=i?.[n]??Bp[n]??n;return decodeURIComponent(a)+decodeURIComponent(t.slice(n.length))}function jo(t){let i=t;return i.charCodeAt(0)===33?(i=i.slice(1),`!${rs(i)}`):i.slice(0,18)==="tag:yaml.org,2002:"?`!!${rs(i.slice(18))}`:`!<${rs(i)}>`}var Jt=-1,Rp="tag:yaml.org,2002:merge",$s={filename:"",schema:Ap,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Hp(t){return"tagStart"in t&&t.tagStart!==Jt?t.tagStart:"anchorStart"in t&&t.anchorStart!==Jt?t.anchorStart:"valueStart"in t&&t.valueStart!==Jt?t.valueStart:"start"in t?t.start:0}function ye(t,i){ft.throwAt(t.source,t.position,i,t.filename)}function qo(t,i,e,n){try{return e.finalize(n)}catch(a){if(a instanceof ft)throw a;ft.throwAt(t.source,i,a instanceof Error?a.message:String(a),t.filename)}}function Wp(t,i){let e=Fp(t.source,i),n=i.tagStart===Jt?"":t.source.slice(i.tagStart,i.tagEnd),a=t.schema.defaultScalarTag;if(n!==""){if(n==="!")return{value:e,tag:a};let s=Go(n,t.tagHandlers),r=t.schema.lookupScalarTag(s);if(r){let l=r.resolve(e,!0,s);return l===X&&ye(t,`cannot resolve a node with !<${s}> explicit tag`),{value:l,tag:r}}let o=t.schema.lookupMappingTag(s)??t.schema.lookupSequenceTag(s);if(o){e!==""&&ye(t,`cannot resolve a node with !<${s}> explicit tag`);let l=o.create(s);return{value:o.carrierIsResult?l:qo(t,t.position,o,l),tag:o}}ye(t,`unknown scalar tag !<${s}>`)}return i.style===K.PLAIN?t.schema.resolveImplicitScalarTag(e):{value:a.resolve(e,!1,a.tagName),tag:a}}function Co(t,i,e){let n=i.tagStart===Jt?"":t.source.slice(i.tagStart,i.tagEnd);return n===""||n==="!"?e:Go(n,t.tagHandlers)}function Yo(t){return t.nodeKind==="mapping"}function Lo(t){t.totalMergeKeys++,t.maxTotalMergeKeys!==-1&&t.totalMergeKeys>t.maxTotalMergeKeys&&ye(t,`merge keys exceeded maxTotalMergeKeys (${t.maxTotalMergeKeys})`)}function Mo(t,i,e,n){Lo(t);for(let a of n.keys(e)){if(Lo(t),i.tag.has(i.value,a))continue;let s=i.tag.addPair(i.value,a,n.get(e,a));s&&ye(t,s),i.overridable??=new Set,i.overridable.add(a)}}function Kp(t,i,e,n){if(t.position=i.keyPosition,Yo(n))Mo(t,i,e,n);else if(n.nodeKind==="sequence"&&Array.isArray(e)){e.length>100&&ye(t,"abnormal merge sequence size");for(let a of e){let s=t.nodeTags.get(a);s||ye(t,"cannot merge mappings; the provided source object is unacceptable"),Mo(t,i,a,s)}}else ye(t,"cannot merge mappings; the provided source object is unacceptable")}function Up(t,i,e,n,a){if(t.position=i.keyPosition,i.keyIsMerge){Kp(t,i,n,a);return}!t.json&&i.tag.has(i.value,e)&&!i.overridable?.has(e)&&ye(t,"duplicated mapping key");let s=i.tag.addPair(i.value,e,n);s&&ye(t,s),i.overridable?.delete(e)}function os(t,i,e){let n=t.frames[t.frames.length-1];if(n.kind==="document")n.value=i,n.hasValue=!0;else if(n.kind==="sequence"){Yo(e)&&t.nodeTags.set(i,e);let a=n.tag.addItem(n.value,i,n.index++);a&&ye(t,a)}else if(n.hasKey){let a=n.key;n.key=void 0,n.hasKey=!1,Up(t,n,a,i,e)}else n.key=i,n.keyPosition=t.position,n.hasKey=!0,n.keyIsMerge=e.tagName===Rp}function ls(t,i,e,n,a){if(i.anchorStart!==Jt){let s={value:e,tag:n,isValueFinal:a};return t.anchors.set(t.source.slice(i.anchorStart,i.anchorEnd),s),s}return null}function Vp(t,i){let e={...$s,...i,events:t,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;e.eventIndex<e.events.length;){let n=e.events[e.eventIndex++];switch(e.position=Hp(n),n.type){case he.DOCUMENT:e.anchors=new Map,e.nodeTags=new Map,e.aliasCount=0,e.tagHandlers=Object.create(null);for(let a of n.directives)a.kind==="tag"&&(e.tagHandlers[a.handle]=a.prefix);e.frames.push({kind:"document",position:e.position,value:void 0,hasValue:!1});break;case he.SCALAR:{let{value:a,tag:s}=Wp(e,n);ls(e,n,a,s,!0),os(e,a,s);break}case he.SEQUENCE:{let a=Co(e,n,"tag:yaml.org,2002:seq"),s=e.schema.lookupSequenceTag(a);s||ye(e,`unknown sequence tag !<${a}>`);let r=s.create(a),o=ls(e,n,r,s,s.carrierIsResult);e.frames.push({kind:"sequence",position:e.position,value:r,tag:s,anchor:o,index:0});break}case he.MAPPING:{let a=Co(e,n,"tag:yaml.org,2002:map"),s=e.schema.lookupMappingTag(a);s||ye(e,`unknown mapping tag !<${a}>`);let r=s.create(a),o=ls(e,n,r,s,s.carrierIsResult);e.frames.push({kind:"mapping",position:e.position,value:r,tag:s,anchor:o,key:void 0,keyPosition:e.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case he.ALIAS:{e.maxAliases!==-1&&++e.aliasCount>e.maxAliases&&ye(e,`aliases exceeded maxAliases (${e.maxAliases})`);let a=e.source.slice(n.anchorStart,n.anchorEnd),s=e.anchors.get(a);s||ye(e,`unidentified alias "${a}"`),s.isValueFinal||ye(e,`recursive alias "${a}" is not supported for tag ${s.tag.tagName} because it uses finalize()`),os(e,s.value,s.tag);break}case he.POP:{let a=e.frames.pop();if(a.kind==="mapping"&&a.hasKey&&(e.position=a.keyPosition,ye(e,"incomplete mapping pair in event stream")),a.kind==="document")e.documents.push(a.value);else{let s=a.tag.carrierIsResult?a.value:qo(e,a.position,a.tag,a.value);a.anchor&&(a.anchor.value=s,a.anchor.isValueFinal=!0),os(e,s,a.tag)}break}}}return e.documents}var ee=-1,Zo=Object.prototype.hasOwnProperty,ii=1,Qo=2,Jo=3,na=4,Gp=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,jp=/[,\[\]{}]/,Xo=/^(?:!|!!|![0-9A-Za-z-]+!)$/,us=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,el=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,qp=new RegExp(`^(?:${us})*$`),Yp=new RegExp(`^(?:${el})+$`),Zp=new RegExp(`^(?:!(?:${us})*|${el}(?:${us})*)$`),Ss={filename:"",maxDepth:100};function Qp(t,i,e){t.events.push({type:he.DOCUMENT,explicitStart:i,explicitEnd:e,directives:t.directives})}function tl(t,i,e,n,a,s,r){t.events.push({type:he.SEQUENCE,start:i,anchorStart:e,anchorEnd:n,tagStart:a,tagEnd:s,style:r})}function il(t,i,e,n,a,s,r){t.events.push({type:he.MAPPING,start:i,anchorStart:e,anchorEnd:n,tagStart:a,tagEnd:s,style:r})}function No(t,i){t.events.splice(i.eventsLength,0,{type:he.MAPPING,start:i.position,anchorStart:ee,anchorEnd:ee,tagStart:ee,tagEnd:ee,style:Ce.FLOW})}function si(t,i,e,n,a,s,r,o,l=Ne.CLIP,c=-1,h=!1){t.events.push({type:he.SCALAR,valueStart:i,valueEnd:e,anchorStart:n,anchorEnd:a,tagStart:s,tagEnd:r,style:o,chomping:l,indent:c,fast:h})}function Jp(t,i,e){t.events.push({type:he.ALIAS,anchorStart:i,anchorEnd:e})}function Xt(t){t.events.push({type:he.POP})}function Te(t){si(t,ee,ee,ee,ee,ee,ee,K.PLAIN)}function Do(){return{anchorStart:ee,anchorEnd:ee,tagStart:ee,tagEnd:ee}}function ei(t){return{position:t.position,line:t.line,lineStart:t.lineStart,lineIndent:t.lineIndent,firstTabInLine:t.firstTabInLine,eventsLength:t.events.length}}function ti(t,i){t.position=i.position,t.line=i.line,t.lineStart=i.lineStart,t.lineIndent=i.lineIndent,t.firstTabInLine=i.firstTabInLine,t.events.length=i.eventsLength}function W(t,i){ft.throwAt(t.input.slice(0,t.length),t.position,i,t.filename)}function ve(t){return t===10||t===13}function ri(t){return t===9||t===32}function Ge(t){return ri(t)||ve(t)}function nt(t){return t===0||Ge(t)}function Ct(t){return t===44||t===91||t===93||t===123||t===125}function Xp(t){return t>=48&&t<=57?t-48:-1}function eh(t){if(t>=48&&t<=57)return t-48;let i=t|32;return i>=97&&i<=102?i-97+10:-1}function th(t){return t===120?2:t===117?4:t===85?8:0}function ih(t){return t===48||t===97||t===98||t===116||t===9||t===110||t===118||t===102||t===114||t===101||t===32||t===34||t===47||t===92||t===78||t===95||t===76||t===80}function aa(t){t.input.charCodeAt(t.position)===10?t.position++:(t.position++,t.input.charCodeAt(t.position)===10&&t.position++),t.line++,t.lineStart=t.position,t.lineIndent=0,t.firstTabInLine=-1}function xe(t,i){let e=0,n=t.input.charCodeAt(t.position),a=t.position===t.lineStart||Ge(t.input.charCodeAt(t.position-1));for(;n!==0;){for(;ri(n);)a=!0,n===9&&t.firstTabInLine===-1&&(t.firstTabInLine=t.position),n=t.input.charCodeAt(++t.position);if(i&&a&&n===35)do n=t.input.charCodeAt(++t.position);while(!ve(n)&&n!==0);if(!ve(n))break;for(aa(t),e++,a=!0,n=t.input.charCodeAt(t.position);n===32;)t.lineIndent++,n=t.input.charCodeAt(++t.position)}return e}function ni(t,i=t.position){let e=t.input.charCodeAt(i);if((e===45||e===46)&&e===t.input.charCodeAt(i+1)&&e===t.input.charCodeAt(i+2)){let n=t.input.charCodeAt(i+3);return n===0||Ge(n)}return!1}function nl(t){t.position===t.lineStart&&t.input.charCodeAt(t.position)===65279&&(t.position++,t.lineStart=t.position)}function Ts(t){if(t.position!==t.lineStart)return!1;if(ni(t))return!0;if(t.input.charCodeAt(t.position)!==65279)return!1;let i=ei(t);nl(t),xe(t,!0);let e=t.input.charCodeAt(t.position),n=t.position===t.lineStart&&(e===37||e===45&&ni(t));return ti(t,i),n}function zo(t){let i=t.input.charCodeAt(t.position);for(;i!==0&&!ve(i);)i=t.input.charCodeAt(++t.position)}function al(t,i,e){Gp.test(t.input.slice(i,e))&&W(t,"the stream contains non-printable characters")}function nh(t,i,e){if(t.input.charCodeAt(t.position)!==33)return!1;i.tagStart!==ee&&W(t,"duplication of a tag property");let n=t.position,a=!1,s=!1,r="!",o=t.input.charCodeAt(++t.position);o===60?(a=!0,o=t.input.charCodeAt(++t.position)):o===33&&(s=!0,r="!!",o=t.input.charCodeAt(++t.position));let l=t.position,c;if(a){for(;o!==0&&o!==62;)o=t.input.charCodeAt(++t.position);o!==62&&W(t,"unexpected end of the stream within a verbatim tag"),c=t.input.slice(l,t.position),t.position++}else{for(;o!==0&&!Ge(o)&&!(e&&Ct(o));)o===33&&(s?W(t,"tag suffix cannot contain exclamation marks"):(r=t.input.slice(l-1,t.position+1),Xo.test(r)||W(t,"named tag handle cannot contain such characters"),s=!0,l=t.position+1)),o=t.input.charCodeAt(++t.position);c=t.input.slice(l,t.position),jp.test(c)&&W(t,"tag suffix cannot contain flow indicator characters")}return c&&!(a?qp.test(c):Yp.test(c))&&W(t,`tag name cannot contain such characters: ${c}`),!a&&r!=="!"&&r!=="!!"&&!Zo.call(t.tagHandlers,r)&&W(t,`undeclared tag handle "${r}"`),i.tagStart=n,i.tagEnd=t.position,!0}function ah(t,i){if(t.input.charCodeAt(t.position)!==38)return!1;i.anchorStart!==ee&&W(t,"duplication of an anchor property"),t.position++;let e=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position))&&!Ct(t.input.charCodeAt(t.position));)t.position++;return t.position===e&&W(t,"name of an anchor node must contain at least one character"),i.anchorStart=e,i.anchorEnd=t.position,!0}function sh(t,i){if(t.input.charCodeAt(t.position)!==42)return!1;(i.anchorStart!==ee||i.tagStart!==ee)&&W(t,"alias node should not have any properties"),t.position++;let e=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position))&&!Ct(t.input.charCodeAt(t.position));)t.position++;return t.position===e&&W(t,"name of an alias node must contain at least one character"),Jp(t,e,t.position),!0}function ms(t,i){xe(t,!1),t.lineIndent<i&&W(t,"deficient indentation")}function rh(t,i,e){if(t.input.charCodeAt(t.position)!==39)return!1;t.position++;let n=t.position,a=!0;for(;t.input.charCodeAt(t.position)!==0;){let s=t.input.charCodeAt(t.position);if(s===39){if(t.input.charCodeAt(t.position+1)===39){a=!1,t.position+=2;continue}let r=t.position;return t.position++,si(t,n,r,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,K.SINGLE_QUOTED,Ne.CLIP,-1,a),!0}ve(s)?(a=!1,ms(t,i)):t.position===t.lineStart&&ni(t)?W(t,"unexpected end of the document within a single quoted scalar"):s!==9&&s<32?W(t,"expected valid JSON character"):t.position++}W(t,"unexpected end of the stream within a single quoted scalar")}function oh(t,i,e){if(t.input.charCodeAt(t.position)!==34)return!1;t.position++;let n=t.position,a=!0;for(;t.input.charCodeAt(t.position)!==0;){let s=t.input.charCodeAt(t.position);if(s===34){let r=t.position;return t.position++,si(t,n,r,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,K.DOUBLE_QUOTED,Ne.CLIP,-1,a),!0}if(s===92){a=!1;let r=t.input.charCodeAt(++t.position);if(ve(r))ms(t,i);else if(ih(r))t.position++;else{let o=th(r);for(o===0&&W(t,"unknown escape sequence");o-- >0;)t.position++,eh(t.input.charCodeAt(t.position))<0&&W(t,"expected hexadecimal character");t.position++}}else ve(s)?(a=!1,ms(t,i)):t.position===t.lineStart&&ni(t)?W(t,"unexpected end of the document within a double quoted scalar"):s!==9&&s<32?W(t,"expected valid JSON character"):t.position++}W(t,"unexpected end of the stream within a double quoted scalar")}function lh(t,i,e){let n=t.input.charCodeAt(t.position),a=Ne.CLIP,s=-1,r=!1;if(n!==124&&n!==62)return!1;let o=n===124?K.LITERAL_BLOCK:K.FOLDED_BLOCK;for(t.position++;t.input.charCodeAt(t.position)!==0;){let b=t.input.charCodeAt(t.position),g=Xp(b);if(b===43||b===45)a!==Ne.CLIP&&W(t,"repeat of a chomping mode identifier"),a=b===43?Ne.KEEP:Ne.STRIP,t.position++;else if(g>=0)g===0&&W(t,"bad explicit indentation width of a block scalar; it cannot be less than one"),r&&W(t,"repeat of an indentation width identifier"),s=i+g-1,r=!0,t.position++;else break}let l=!1;for(;ri(t.input.charCodeAt(t.position));)l=!0,t.position++;l&&t.input.charCodeAt(t.position)===35&&zo(t),ve(t.input.charCodeAt(t.position))?aa(t):t.input.charCodeAt(t.position)!==0&&W(t,"a line break is expected");let c=r?s:-1,h=0,u=t.position,f=t.position;for(;t.input.charCodeAt(t.position)!==0;){let b=t.position,g=0;for(;t.input.charCodeAt(b+g)===32;)g++;let v=t.input.charCodeAt(b+g);if(v===0){c>=0?g>c&&(f=b+g):g>0&&(f=b+g);break}if(Ts(t))break;if(!r&&c===-1&&ve(v)&&(h=Math.max(h,g)),!r&&c===-1&&!ve(v)&&(v===9&&g<i&&(t.position=b+g,W(t,"tab characters must not be used in indentation")),g>=i&&g<h&&(t.position=b+g,W(t,"bad indentation of a mapping entry"))),c===-1&&v!==0&&!ve(v)&&g<i){t.lineIndent=g,t.position=b+g;break}!r&&v!==0&&!ve(v)&&c===-1&&(c=g);let S=c===-1?i+1:c;if(v!==0&&!ve(v)&&g<S){t.lineIndent=g,t.position=b+g;break}zo(t),f=t.position,ve(t.input.charCodeAt(t.position))&&(aa(t),f=t.position)}return al(t,u,f),si(t,u,f,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,o,a,c),!0}function dh(t,i){let e=t.input.charCodeAt(t.position),n=i===ii;if(e===0||Ge(e)||e===35||e===38||e===42||e===33||e===124||e===62||e===39||e===34||e===37||e===64||e===96||n&&Ct(e))return!1;if(e===63||e===45){let a=t.input.charCodeAt(t.position+1);if(nt(a)||n&&Ct(a))return!1}return!0}function ch(t,i,e,n){if(!dh(t,e))return!1;let a=t.position,s=t.position,r=t.input.charCodeAt(t.position),o=e===ii,l=!1;for(;r!==0&&!Ts(t);){if(r===58){let c=t.input.charCodeAt(t.position+1);if(nt(c)||o&&Ct(c))break}else if(r===35){if(Ge(t.input.charCodeAt(t.position-1)))break}else{if(o&&Ct(r))break;if(ve(r)){let c=t.position,h=t.line,u=t.lineStart,f=t.lineIndent;if(xe(t,!1),t.lineIndent>=i){l=!0,r=t.input.charCodeAt(t.position);continue}t.position=c,t.line=h,t.lineStart=u,t.lineIndent=f;break}}ri(r)||(s=t.position+1),r=t.input.charCodeAt(++t.position)}return s===a?!1:(al(t,a,s),si(t,a,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,K.PLAIN,Ne.CLIP,-1,!l),!0)}function Oi(t,i){let e=t.line;xe(t,!0),(t.line>e&&t.lineIndent<i||t.firstTabInLine!==-1&&t.lineIndent<i)&&W(t,"deficient indentation")}function ph(t,i,e){let n=t.input.charCodeAt(t.position),a=n===123,s=t.position,r=!0;if(n!==91&&n!==123)return!1;let o=a?125:93;for(a?il(t,s,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,Ce.FLOW):tl(t,s,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,Ce.FLOW),t.position++;t.input.charCodeAt(t.position)!==0;){Oi(t,i);let l=t.input.charCodeAt(t.position);if(l===o)return t.position++,Xt(t),!0;r?l===44&&W(t,"expected the node content, but found ','"):W(t,"missed comma between flow collection entries");let c=!1,h=!1;l===63&&Ge(t.input.charCodeAt(t.position+1))&&(c=h=!0,t.position+=1,Oi(t,i));let u=t.line,f=ei(t),b=ai(t,i,ii,!1,!0);Oi(t,i),l=t.input.charCodeAt(t.position),(a||h||t.line===u)&&l===58?(c=!0,t.position++,Oi(t,i),a||No(t,f),b||Te(t),ai(t,i,ii,!1,!0)||Te(t),Oi(t,i),a||Xt(t)):a&&c?(b||Te(t),Te(t)):a?Te(t):c&&(No(t,f),b||Te(t),Te(t),Xt(t)),l=t.input.charCodeAt(t.position),l===44?(r=!0,t.position++):r=!1}W(t,"unexpected end of the stream within a flow collection")}function Io(t,i,e){if(t.firstTabInLine!==-1||t.input.charCodeAt(t.position)!==45||!nt(t.input.charCodeAt(t.position+1)))return!1;for(tl(t,t.position,e.anchorStart,e.anchorEnd,e.tagStart,e.tagEnd,Ce.BLOCK);t.input.charCodeAt(t.position)===45&&nt(t.input.charCodeAt(t.position+1));){t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,W(t,"tab characters must not be used in indentation"));let n=t.line;t.position++;let a=xe(t,!0)>0;if(t.firstTabInLine!==-1&&t.input.charCodeAt(t.position)===45&&nt(t.input.charCodeAt(t.position+1))&&W(t,"bad indentation of a sequence entry"),a&&t.lineIndent<=i?Te(t):ai(t,i,Jo,!1,!0),xe(t,!0),t.lineIndent<i||t.position>=t.length)break;t.lineIndent>i&&W(t,"bad indentation of a sequence entry"),t.line===n&&t.input.charCodeAt(t.position)===45&&nt(t.input.charCodeAt(t.position+1))&&W(t,"bad indentation of a sequence entry")}return Xt(t),!0}function ds(t,i,e,n){let a=!1,s=!1,r=!1,o=!1;if(t.firstTabInLine!==-1)return!1;let l=t.input.charCodeAt(t.position);for(;l!==0;){!a&&t.firstTabInLine!==-1&&(t.position=t.firstTabInLine,W(t,"tab characters must not be used in indentation"));let c=t.input.charCodeAt(t.position+1),h=t.line;if((l===63||l===58)&&nt(c))r||(il(t,t.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,Ce.BLOCK),r=!0),l===63?(a&&Te(t),s=!0,a=!0):(a||(Te(t),s=!0),a=!1),t.position+=1,o=!0;else{a&&(Te(t),a=!1);let u=ei(t);if(!ai(t,e,Qo,!1,!0))break;if(t.line===h){for(l=t.input.charCodeAt(t.position);ri(l);)l=t.input.charCodeAt(++t.position);if(l===58)l=t.input.charCodeAt(++t.position),nt(l)||W(t,"a whitespace character is expected after the key-value separator within a block mapping"),r||(t.events.splice(u.eventsLength,0,{type:he.MAPPING,start:u.position,anchorStart:n.anchorStart,anchorEnd:n.anchorEnd,tagStart:n.tagStart,tagEnd:n.tagEnd,style:Ce.BLOCK}),r=!0),s=!0,a=!1,o=!1;else if(s)W(t,"expected ':' after a mapping key");else return n.anchorStart!==ee||n.tagStart!==ee?(ti(t,u),!1):!0}else if(s)W(t,"can not read a block mapping entry; a multiline key may not be an implicit key");else return n.anchorStart!==ee||n.tagStart!==ee?(ti(t,u),!1):!0}if(ai(t,i,na,!0,o)&&(o=!1),a||o&&(Te(t),o=!1),xe(t,!0),l=t.input.charCodeAt(t.position),(t.line===h||t.lineIndent>i)&&l!==0)W(t,"bad indentation of a mapping entry");else if(t.lineIndent<i)break}return s?(a&&Te(t),r&&Xt(t),!0):!1}function ai(t,i,e,n,a,s=!0){t.depth>=t.maxDepth&&W(t,`nesting exceeded maxDepth (${t.maxDepth})`),t.depth++;let r=1,o=!1,l=!1,c=null,h=Do(),u=e===na||e===Jo,f=u,b=u;if(n&&xe(t,!0)&&(o=!0,t.lineIndent>i?r=1:t.lineIndent===i?r=0:r=-1),r===1)for(;;){let g=t.input.charCodeAt(t.position),v=ei(t);if(o&&r!==1&&(g===33||g===38))break;if(o&&b&&(h.tagStart!==ee||h.anchorStart!==ee)&&(g===33||g===38)){let S=ei(t),I=i+1;if(ds(t,t.position-t.lineStart,I,h)&&t.events[S.eventsLength]?.type===he.MAPPING)return t.depth--,!0;ti(t,S)}if(o&&(g===33&&h.tagStart!==ee||g===38&&h.anchorStart!==ee)||!nh(t,h,e===ii)&&!ah(t,h))break;c===null&&(c=v),xe(t,!0)?(o=!0,f=b,t.lineIndent>i?r=1:t.lineIndent===i?r=0:r=-1):f=!1}if(f&&(f=o||a),r===1||e===na){let g=e===ii||e===Qo?i:i+1,v=t.position-t.lineStart;if(r===1)if(f&&(Io(t,v,h)||ds(t,v,g,h))||ph(t,g,h))l=!0;else{let S=t.input.charCodeAt(t.position);if(c!==null&&s&&b&&!f&&S!==124&&S!==62){let I=ei(t),A=c.position-c.lineStart;ti(t,c),ds(t,A,g,Do())&&t.events[I.eventsLength]?.type===he.MAPPING?l=!0:ti(t,I)}!l&&(u&&lh(t,g,h)||rh(t,g,h)||oh(t,g,h)||sh(t,h)||ch(t,g,e,h))&&(l=!0)}else r===0&&(l=f&&Io(t,v,h))}return u=u&&!l,!l&&(h.anchorStart!==ee||h.tagStart!==ee||u)&&(si(t,ee,ee,h.anchorStart,h.anchorEnd,h.tagStart,h.tagEnd,K.PLAIN),l=!0),t.depth--,l||h.anchorStart!==ee||h.tagStart!==ee}function hh(t){if(t.lineIndent>0||t.input.charCodeAt(t.position)!==37)return!1;t.position++;let i=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position));)t.position++;let e=t.input.slice(i,t.position),n=[];for(e.length===0&&W(t,"directive name must not be less than one character in length");t.input.charCodeAt(t.position)!==0&&!ve(t.input.charCodeAt(t.position));){for(;ri(t.input.charCodeAt(t.position));)t.position++;if(t.input.charCodeAt(t.position)===35||ve(t.input.charCodeAt(t.position))||t.input.charCodeAt(t.position)===0)break;let a=t.position;for(;t.input.charCodeAt(t.position)!==0&&!Ge(t.input.charCodeAt(t.position));)t.position++;n.push(t.input.slice(a,t.position))}if(ve(t.input.charCodeAt(t.position))&&aa(t),e==="YAML"){t.directives.some(s=>s.kind==="yaml")&&W(t,"duplication of %YAML directive"),n.length!==1&&W(t,"YAML directive accepts exactly one argument");let a=/^([0-9]+)\.([0-9]+)$/.exec(n[0]);a===null&&W(t,"ill-formed argument of the YAML directive"),parseInt(a[1],10)!==1&&W(t,"unacceptable YAML version of the document"),t.directives.push({kind:"yaml",version:n[0]})}else if(e==="TAG"){n.length!==2&&W(t,"TAG directive accepts exactly two arguments");let[a,s]=n;Xo.test(a)||W(t,"ill-formed tag handle (first argument) of the TAG directive"),Zo.call(t.tagHandlers,a)&&W(t,`there is a previously declared suffix for "${a}" tag handle`),Zp.test(s)||W(t,"ill-formed tag prefix (second argument) of the TAG directive"),t.tagHandlers[a]=s,t.directives.push({kind:"tag",handle:a,prefix:s})}return!0}function uh(t){t.directives=[],t.tagHandlers=Object.create(null);let i=!1;for(xe(t,!0);hh(t);)i=!0,xe(t,!0);let e=!1,n=!1,a=!0;if(t.lineIndent===0&&t.input.charCodeAt(t.position)===45&&t.input.charCodeAt(t.position+1)===45&&t.input.charCodeAt(t.position+2)===45&&nt(t.input.charCodeAt(t.position+3))){e=!0;let o=t.line;t.position+=3,xe(t,!0),a=t.line>o}else i&&W(t,"directives end mark is expected");let s=t.events.length;if(!e&&t.position===t.lineStart&&t.input.charCodeAt(t.position)===46&&ni(t)){t.position+=3,xe(t,!0);return}if(Qp(t,e,!1),ai(t,t.lineIndent-1,na,!1,a,a)||Te(t),xe(t,!0),t.position===t.lineStart&&ni(t)&&(n=t.input.charCodeAt(t.position)===46,n)){let o=t.line;t.position+=3,xe(t,!0),t.line===o&&t.position<t.length&&W(t,"end of the stream or a document separator is expected")}let r=t.events[s];r?.type===he.DOCUMENT&&(r.explicitEnd=n),Xt(t),!n&&t.position<t.length&&!Ts(t)&&W(t,"end of the stream or a document separator is expected")}function mh(t,i){let e=t.length,n={...Ss,...i,input:`${t}\0`,length:e,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},a=t.indexOf("\0");for(a!==-1&&ft.throwAt(t,a,"null byte is not allowed in input",n.filename);n.position<n.length&&(nl(n),xe(n,!0),!(n.position>=n.length));){let s=n.position;uh(n),n.position===s&&W(n,"can not read a document")}return n.events}var fh={...Ss,...$s};function gh(t,i={}){let e={...fh,...i},n=String(t),a=Object.keys(Ss),s=Object.keys($s);return Vp(mh(n,hs(e,a)),{...hs(e,s),source:n})}function Lt(t,i){let e=gh(t,i);if(e.length===0)throw new ft("expected a document, but the input is empty");if(e.length===1)return e[0];throw new ft("expected a single document in the stream, but found more")}var _t=Symbol("INVALID");function bh(t){let i=new Set([t.defaultScalarTag,t.defaultSequenceTag,t.defaultMappingTag].filter(s=>s!==void 0)),e=t.implicitScalarTags,n=t.tags.filter(s=>!(s.nodeKind==="scalar"&&s.implicit)&&!i.has(s)),a=t.tags.filter(s=>i.has(s));return[...e.map(s=>({tag:s,implicitTag:!0})),...n.map(s=>({tag:s,implicitTag:!1})),...a.map(s=>({tag:s,implicitTag:!0}))]}function vh(t,i){for(let e=0,n=t.representTypes.length;e<n;e+=1){let{tag:a,implicitTag:s}=t.representTypes[e];if(a.identify(i)){let r;return a.matchByTagPrefix?r=a.representTagName(i):r=a.tagName,{tag:a,tagName:r,implicitTag:s}}}return null}function Bi(t,i){if(!t.noRefs&&i!==null&&typeof i=="object"){let c=t.refs.get(i);if(c)return c.anchor===void 0&&(c.anchor=`ref_${t.refCounter++}`),{kind:"alias",anchor:c.anchor}}let e=vh(t,i);if(!e){if(i===void 0||t.skipInvalid)return _t;throw new ft(`unacceptable kind of an object to dump ${Object.prototype.toString.call(i)}`)}let{tag:n,tagName:a,implicitTag:s}=e,r=s?a:jo(a);if(n.nodeKind==="scalar")return{kind:"scalar",tag:r,tagged:!s,style:K.PLAIN,value:n.represent(i)};if(n.nodeKind==="sequence"){let c=n.represent(i),h={kind:"sequence",tag:r,tagged:!s,style:Ce.BLOCK,items:[]};t.noRefs||t.refs.set(i,h);for(let u=0,f=c.length;u<f;u+=1){let b=Bi(t,c[u]);b===_t&&c[u]===void 0&&(b=Bi(t,null)),b!==_t&&h.items.push(b)}return h}let o=n.represent(i),l={kind:"mapping",tag:r,tagged:!s,style:Ce.BLOCK,items:[]};t.noRefs||t.refs.set(i,l);for(let[c,h]of o){let u=Bi(t,c);if(u===_t)continue;let f=Bi(t,h);f!==_t&&l.items.push({key:u,value:f})}return l}function yh(t,i,e={}){let n=Bi({representTypes:bh(i),noRefs:e.noRefs??!1,skipInvalid:e.skipInvalid??!1,refs:new Map,refCounter:0},t);return[{contents:n===_t?null:n,directives:[]}]}var wh=Symbol("visit:break"),sl=Symbol("visit:skip");function ta(t,i,e){let n=i(t,e);if(n===wh)return!0;if(n===sl)return!1;let a=e.depth+1;switch(t.kind){case"sequence":for(let s of t.items)if(ta(s,i,{depth:a,parent:t,isKey:!1}))return!0;break;case"mapping":for(let{key:s,value:r}of t.items)if(ta(s,i,{depth:a,parent:t,isKey:!0})||ta(r,i,{depth:a,parent:t,isKey:!1}))return!0;break}return!1}function Po(t,i){for(let e of t)if(e.contents&&ta(e.contents,i,{depth:0,parent:null,isKey:!1}))return}function da(t,i){return(t&1<<i)!==0}var Oo={applyQuoteFlowKeysOption:xh,doubleQuoteForInvisibles:kh,doubleQuoteWhitespaceOnly:$h,applyForceQuotesOption:Sh,tryLongOrMultilineAsBlock:Th,quoteInvalidPlain:Ah,fallbackToDoubleQuoted:Eh};function rl(t){return t.presenterOptions.quoteStyle==="single"&&da(t.allowedStylesMask,K.SINGLE_QUOTED)?K.SINGLE_QUOTED:K.DOUBLE_QUOTED}function xh(t){t.presenterOptions.quoteFlowKeys&&(!t.isKey||!t.flowOnly||t.style!==K.PLAIN||(t.style=K.DOUBLE_QUOTED))}function kh(t){t.style===K.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(t.node.value)&&(t.style=K.DOUBLE_QUOTED)}function $h(t){t.style===K.PLAIN&&/^\s+$/.test(t.node.value)&&(t.style=K.DOUBLE_QUOTED)}function Sh(t){t.presenterOptions.forceQuotes&&(t.isKey||t.style!==K.PLAIN||t.node.tag===t.presenterOptions.schema.defaultScalarTag.tagName&&(t.style=t.node.value.includes(`
`)?K.DOUBLE_QUOTED:rl(t)))}function Th(t){if(t.style!==K.PLAIN||t.isKey)return;let i=t.node.value,e=i.indexOf(`
`)!==-1;if(!da(t.allowedStylesMask,K.LITERAL_BLOCK)){e&&(t.style=K.DOUBLE_QUOTED);return}let n=t.presenterOptions.lineWidth;if(n===-1){e&&(t.style=K.LITERAL_BLOCK);return}let a=Math.max(Math.min(n,40),n-t.shiftOfContent),s=0,r=!1;for(;s<=i.length;){let o=i.length,l=i.indexOf(`
`,s);l!==-1&&(o=l);let c=i.slice(s,o);if(c.length>a&&c[0]!==" "&&/ [^ \t]/.test(c)&&(r=!0),l===-1)break;s=l+1}r?t.style=K.FOLDED_BLOCK:e&&(t.style=K.LITERAL_BLOCK)}function Ah(t){t.style===K.PLAIN&&!da(t.allowedStylesMask,K.PLAIN)&&(t.style=rl(t))}function Eh(t){da(t.allowedStylesMask,t.style)||(t.style=K.DOUBLE_QUOTED)}function Fi(t,i){return t|1<<i}var _h="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",Ch="[\\n\\r]",Lh="\\uFEFF",As="[ \\t]",ol=`(?:(?!(?:${Ch}|${Lh}))${_h})`,ca=`(?:(?!${As})${ol})`,ll="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",dl="[-?:,\\[\\]{}#&*!|>'\"%@`]",Mh="[,\\[\\]{}]",fs=ca,gs=`(?:(?!${Mh})${ca})`,Nh=`(?:(?:(?!${dl})${ca})|[?:-](?=${fs}))`,Dh=`(?:(?:(?!${dl})${ca})|[?:-](?=${gs}))`,cl=`(?:(?:(?![:#])${fs})|:(?=${fs}))#*`,pl=`(?:(?:(?![:#])${gs})|:(?=${gs}))#*`,hl=`(?:${As}*${cl})*`,ul=`(?:${As}*${pl})*`,ml=`${Nh}#*${hl}`,fl=`${Dh}#*${ul}`,zh=ml,Ih=fl,Ph=`\\n+${cl}${hl}`,Oh=`\\n+${pl}${ul}`,Fh=`${ml}(?:${Ph})*`,Bh=`${fl}(?:${Oh})*`,Rh=new RegExp(`^(?:${Fh})$`,"u"),Hh=new RegExp(`^(?:${Bh})$`,"u"),Wh=new RegExp(`^(?:${zh})$`,"u"),Kh=new RegExp(`^(?:${Ih})$`,"u"),Uh=new RegExp(`^(?:${ll})*$`,"u"),Vh=new RegExp(`^(?:${ll}|\\n)*$`,"u"),Gh=new RegExp(`^(?:${ol}|\\n)*$`,"u"),jh=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/,Es=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;function qh(t){let i=t.node.value;if(i!==""){if(!(t.isKey?t.flowOnly?Kh:Wh:t.flowOnly?Hh:Rh).test(i)||t.shiftOfFirstLine===0&&jh.test(i))return!1;if(t.shiftOfContent===0){let n=i.indexOf(`
`);if(n!==-1){let a=i.slice(n+1);if(Es.test(a))return!1}}}let e=t.presenterOptions.schema.resolveImplicitScalarTag(i).tag.tagName;return!(!t.node.tagged&&e!==t.node.tag||!t.node.tagged&&i==="="&&e===t.presenterOptions.schema.defaultScalarTag.tagName)}function Yh(t){let i=t.node.value;if(!(t.isKey?Uh:Vh).test(i)||/[ \t]\n|\n[ \t]/.test(i))return!1;if(!t.isKey&&t.shiftOfContent===0){let e=i.indexOf(`
`);if(e!==-1&&Es.test(i.slice(e+1)))return!1}return!0}function Zh(t){if(t.flowOnly||!Gh.test(t.node.value))return!1;let i=t.shiftOfContent-t.shiftOfParent;return!(i<1||i>9&&/^\n* /.test(t.node.value)||t.shiftOfContent===0&&Es.test(t.node.value))}function Qh(t){let i=Fi(0,K.DOUBLE_QUOTED);qh(t)&&(i=Fi(i,K.PLAIN)),Yh(t)&&(i=Fi(i,K.SINGLE_QUOTED)),Zh(t)&&(i=Fi(Fi(i,K.LITERAL_BLOCK),K.FOLDED_BLOCK)),t.allowedStylesMask=i}function Jh(t){switch(t.style){case K.PLAIN:return Xh(t);case K.SINGLE_QUOTED:return eu(t);case K.LITERAL_BLOCK:return tu(t);case K.FOLDED_BLOCK:return iu(t);case K.DOUBLE_QUOTED:return nu(t)}}function Xh(t){return gl(t.node.value,t.shiftOfContent)}function eu(t){return`'${gl(t.node.value,t.shiftOfContent).replace(/'/g,"''")}'`}function tu(t){let i=t.node.value;return"|"+vl(i,t.shiftOfParent,t.shiftOfContent)+yl(bl(i,t.shiftOfContent))}function iu(t){let i=t.node.value,e=t.presenterOptions.lineWidth,n=1/0;return e!==-1&&(n=Math.max(Math.min(e,40),e-t.shiftOfContent)),">"+vl(i,t.shiftOfParent,t.shiftOfContent)+yl(bl(su(i,n),t.shiftOfContent))}function nu(t){return`"${lu(t.node.value)}"`}function gl(t,i){let e=t.indexOf(`
`);if(e===-1)return t;let n=" ".repeat(i),a=t.slice(0,e),s=/(\n+)([^\n]*)/g;s.lastIndex=e;let r;for(;r=s.exec(t);){let o=r[1].length,l=r[2];a+=`
`.repeat(o+1)+n+l}return a}function bl(t,i){let e=" ".repeat(i),n=0,a="",s=t.length;for(;n<s;){let r,o=t.indexOf(`
`,n);o===-1?(r=t.slice(n),n=s):(r=t.slice(n,o+1),n=o+1),r.length&&r!==`
`&&(a+=e),a+=r}return a}function au(t){return/^\n* /.test(t)}function vl(t,i,e){let n=au(t)?String(e-i):"",a=t[t.length-1]===`
`;return`${n}${a&&(t[t.length-2]===`
`||t===`
`)?"+":a?"":"-"}
`}function yl(t){return t[t.length-1]===`
`?t.slice(0,-1):t}function bs(t){return t===" "||t==="	"}function Fo(t,i){if(t===""||bs(t[0]))return t;let e=/ [^ \t]/g,n,a=0,s,r=0,o=0,l="";for(;n=e.exec(t);)o=n.index,o-a>i&&(s=r>a?r:o,l+=`
${t.slice(a,s)}`,a=s+1),r=o;return l+=`
`,t.length-a>i&&r>a?l+=`${t.slice(a,r)}
${t.slice(r+1)}`:l+=t.slice(a),l.slice(1)}function su(t,i){let e=/(\n+)([^\n]*)/g,n=t.indexOf(`
`);n===-1&&(n=t.length),e.lastIndex=n;let a=Fo(t.slice(0,n),i),s=t[0]===`
`||bs(t[0]),r,o;for(;o=e.exec(t);){let l=o[1],c=o[2];r=c!==""&&bs(c[0]),a+=l+(!s&&!r&&c!==""?`
`:"")+Fo(c,i),s=r}return a}var ru=/["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;function ou(t){switch(t){case"\0":return"\\0";case"\x07":return"\\a";case"\b":return"\\b";case"	":return"\\t";case`
`:return"\\n";case"\v":return"\\v";case"\f":return"\\f";case"\r":return"\\r";case"\x1B":return"\\e";case'"':return'\\"';case"\\":return"\\\\";case"\x85":return"\\N";case"\xA0":return"\\_";case"\u2028":return"\\L";case"\u2029":return"\\P"}let i=t.charCodeAt(0),e=i.toString(16).toUpperCase();return i<=255?`\\x${"0".repeat(2-e.length)}${e}`:`\\u${"0".repeat(4-e.length)}${e}`}function lu(t){return t.replace(ru,ou)}var sa=10,_s={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(Oo).map(t=>Reflect.get(Oo,t)),tagBeforeAnchor:!1};function du(t){return t.tagged?t.tag:jo(t.tag)}function cu(t){let i={..._s,...t};return i.flowSkipColonSpace&&(i.quoteFlowKeys=!0),{...i,defaultScalarTagName:i.schema.defaultScalarTag.tagName,openEnded:!1}}function vs(t,i){return`
${" ".repeat(t.indent*i)}`}function pu(t,i,e,n,a,s){return{node:i,parent:e,level:n,isKey:a,flowOnly:s,shiftOfParent:n===0?-1:t.indent*(n-1),shiftOfContent:t.indent*Math.max(1,n),shiftOfFirstLine:n===0?0:t.indent*n,presenterOptions:t,allowedStylesMask:0,style:i.style}}function hu(t,i,e){let n="";for(let s=0,r=e.items.length;s<r;s+=1){let o=at(t,i,e.items[s],e,{}).text;s>0&&(n+=`,${t.flowSkipCommaSpace?"":" "}`),n+=o}let a=t.flowBracketPadding&&e.items.length>0?" ":"";return`[${a}${n}${a}]`}function Bo(t,i,e,n){let a="";for(let s=0,r=e.items.length;s<r;s+=1){let o=at(t,i+1,e.items[s],e,{block:!0,compact:t.seqInlineFirst,isblockseq:!0}).text;(!n||a!=="")&&(a+=vs(t,i)),o===""||sa===o.charCodeAt(0)?a+="-":a+="- ",a+=o}return a}function uu(t,i,e){let n="";for(let{key:s,value:r}of e.items){let o="";n!==""&&(o+=`,${t.flowSkipCommaSpace?"":" "}`);let l=at(t,i,s,e,{iskey:!0}),c=l.text,h=at(t,i,r,e,{}).text,u=t.flowSkipColonSpace||h===""?"":" ",f=s.kind==="scalar"&&l.noBody&&(s.tagged||s.anchor!==void 0),b=s.kind==="alias"||f?" ":"";o+=`${c}${b}:${u}${h}`,n+=o}let a=t.flowBracketPadding&&n!==""?" ":"";return`{${a}${n}${a}}`}function mu(t,i,e,n){let a="";for(let s=0,r=e.items.length;s<r;s+=1){let o="";(!n||a!=="")&&(o+=vs(t,i));let{key:l,value:c}=e.items[s],h=(l.kind==="mapping"||l.kind==="sequence")&&l.style===Ce.BLOCK&&l.items.length!==0||l.kind==="scalar"&&(l.style===K.LITERAL_BLOCK||l.style===K.FOLDED_BLOCK),u=h?at(t,i+1,l,e,{block:!0,compact:!0,isblockseq:!ys(t,l,i+1)}):at(t,i+1,l,e,{block:!0,compact:!0,iskey:!0}),f=u.text,b=l.kind==="scalar"&&l.value.indexOf(`
`)!==-1,g=f.length>1024&&/^[\s\S]{1025}/u.test(f),v=h||b||g;v&&(f&&sa===f.charCodeAt(0)?o+="?":o+="? "),o+=f,v&&(o+=vs(t,i));let S=at(t,i+1,c,e,{block:!0,compact:v,isblockseq:v&&!ys(t,c,i+1)}).text,I=l.kind==="scalar"&&u.noBody&&(l.tagged||l.anchor!==void 0),A=!v&&(l.kind==="alias"||I)?" ":"";S===""||sa===S.charCodeAt(0)?o+=`${A}:`:o+=`${A}: `,o+=S,a+=o}return a}function ys(t,i,e){return i.kind==="alias"?!0:i.tagged||i.anchor!==void 0||t.indent<2&&e>0}function at(t,i,e,n,a){if(e.kind==="alias")return t.openEnded=!1,{text:`*${e.anchor}`,noBody:!1};let{block:s=!1,iskey:r=!1,isblockseq:o=!1}=a,l=a.compact??!1,c=e.anchor!==void 0;ys(t,e,i)&&(l=!1);let h,u=e.tagged,f=s&&(e.kind==="mapping"||e.kind==="sequence")&&e.style===Ce.BLOCK&&e.items.length!==0;if(e.kind==="mapping")f?h=mu(t,i,e,l):h=uu(t,i,e);else if(e.kind==="sequence")f?t.seqNoIndent&&!o&&i>0?h=Bo(t,i-1,e,l):h=Bo(t,i,e,l):h=hu(t,i,e);else{let v=pu(t,e,n,i,r,!s);Qh(v);for(let S of t.scalarStyleRules)S(v);h=Jh(v),t.openEnded=(v.style===K.LITERAL_BLOCK||v.style===K.FOLDED_BLOCK)&&(e.value===`
`||e.value.endsWith(`

`)),u=e.tagged||h===""&&v.flowOnly&&n?.kind==="sequence"&&!c||v.style!==K.PLAIN&&e.tag!==t.defaultScalarTagName}(e.kind==="mapping"||e.kind==="sequence")&&!f&&(t.openEnded=!1),f&&l&&i>0&&t.indent>2&&(h=`${" ".repeat(t.indent-2)}${h}`);let b=h==="",g=h;if(u||c){let v=[],S=u?du(e):null,I=c?`&${e.anchor}`:null;t.tagBeforeAnchor?(S!==null&&v.push(S),I!==null&&v.push(I)):(I!==null&&v.push(I),S!==null&&v.push(S));let A=h===""||h.charCodeAt(0)===sa?"":" ";g=`${v.join(" ")}${A}${h}`}return{text:g,noBody:b}}function fu(t){return(t.kind==="sequence"||t.kind==="mapping")&&t.style===Ce.BLOCK&&t.items.length!==0&&!t.tagged&&t.anchor===void 0}function gu(t){let i="";for(let e of t.directives){if(e.kind==="yaml"){i+=`%YAML ${e.version}
`;continue}let{handle:n,prefix:a}=e;i+=`%TAG ${n} ${a}
`}return i}function bu(t,i){let e=cu(i),n="",a=!1;for(let s=0;s<t.length;s+=1){let r=t[s];e.openEnded=!1;let o=gu(r),l=o!=="",c=r.explicitStart||l||s>0&&!a;if(n+=o,r.contents===null)c&&(n+=`---
`);else if(c){let h=at(e,0,r.contents,null,{block:!0,compact:!0}).text,u=h===""?"":l||fu(r.contents)?`
`:" ";n+=`---${u}${h}
`}else n+=at(e,0,r.contents,null,{block:!0,compact:!0}).text+`
`;a=r.explicitEnd||e.openEnded,a&&(n+=`...
`)}return n}var vu={..._s,schema:_p,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};function yu(t,i){let e=String(t),n=String(i);return e<n?-1:e>n?1:0}function gt(t,i={}){let e={...vu,...i},n=yh(t,e.schema,{noRefs:e.noRefs,skipInvalid:e.skipInvalid});if(e.flowLevel>=0&&Po(n,(a,s)=>{if(!(s.depth<e.flowLevel))return(a.kind==="sequence"||a.kind==="mapping")&&(a.style=Ce.FLOW),sl}),e.sortKeys){let a=e.sortKeys===!0?yu:e.sortKeys;Po(n,s=>{s.kind==="mapping"&&s.items.sort((r,o)=>a(r.key.kind==="scalar"?r.key.value:"",o.key.kind==="scalar"?o.key.value:""))})}return e.transform(n),bu(n,{...hs(e,Object.keys(_s)),schema:e.schema})}var Zb=he.DOCUMENT,Qb=he.SEQUENCE,Jb=he.MAPPING,Xb=he.SCALAR,ev=he.ALIAS,tv=he.POP,iv=K.PLAIN,nv=K.SINGLE_QUOTED,av=K.DOUBLE_QUOTED,sv=K.LITERAL_BLOCK,rv=K.FOLDED_BLOCK,ov=Ce.BLOCK,lv=Ce.FLOW,dv=Ne.CLIP,cv=Ne.STRIP,pv=Ne.KEEP;var Ri=class extends se{constructor(){super(...arguments);this.pageId="";this.displayId="";this.selected=null;this.selection=[];this.orientation="landscape";this.grid=!0;this.scale=.5;this.resize=new ResizeObserver(()=>this.measure())}get stage(){return fe[this.orientation]}measure(){let e=this.stage,n=Math.max(320,window.innerHeight-220),a=Math.min(this.offsetWidth/e.w,n/e.h);a>0&&Math.abs(a-this.scale)>.001&&(this.scale=a)}willUpdate(e){e.has("orientation")&&this.measure()}connectedCallback(){super.connectedCallback(),this.resize.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resize.disconnect()}emit(e,n){this.dispatchEvent(new CustomEvent(e,{detail:n}))}down(e,n,a,s,r){if(e.stopPropagation(),e.preventDefault(),s==="move"&&(e.shiftKey||e.metaKey||e.ctrlKey)){this.emit("select",{id:n.id,toggle:!0});return}let o=s==="move"&&this.selection.length>1&&this.selection.includes(n.id)?this.selection:[n.id];this.emit("select",{id:n.id,keep:o.length>1});let l=o.filter(c=>r[c]).map(c=>({id:c,pos:{...r[c]}}));this.drag={id:n.id,mode:s,x0:e.clientX,y0:e.clientY,orig:{...a},group:l},e.currentTarget.setPointerCapture(e.pointerId)}move(e){let n=this.drag;if(!n)return;let a=this.stage,s=Math.round((e.clientX-n.x0)/this.scale/((a.w-2*a.padX+a.gap)/a.cols)),r=Math.round((e.clientY-n.y0)/this.scale/((a.h-2*a.padY+a.gap)/a.rows)),o=n.orig;if(n.mode==="resize"){let u={x:o.x,y:o.y,w:Math.min(Math.max(1,o.w+s),a.cols-o.x),h:Math.min(Math.max(1,o.h+r),a.rows-o.y)};this.emit("move",{moves:[{id:n.id,...u}],done:!1});return}let l=n.group.map(u=>u.pos),c=Math.min(Math.max(s,-Math.min(...l.map(u=>u.x))),Math.min(...l.map(u=>a.cols-u.x-u.w))),h=Math.min(Math.max(r,-Math.min(...l.map(u=>u.y))),Math.min(...l.map(u=>a.rows-u.y-u.h)));this.emit("move",{moves:n.group.map(({id:u,pos:f})=>({id:u,x:f.x+c,y:f.y+h,w:f.w,h:f.h})),done:!1})}guides(e){let n=this.drag;if(!n)return{v:[],h:[]};let a=this.stage,s=new Set(n.group.map(f=>f.id)),r=f=>{let b=Zt(a,f);return{v:[b.left,b.left+b.width/2,b.left+b.width],h:[b.top,b.top+b.height/2,b.top+b.height]}},o=Object.entries(e).filter(([f])=>s.has(f)).map(([,f])=>r(f)),l=Object.entries(e).filter(([f])=>!s.has(f)).map(([,f])=>r(f)),c=(f,b)=>f.filter(g=>b.some(v=>Math.abs(g-v)<.5)),h=new Set,u=new Set;for(let f of o)for(let b of l)c(f.v,b.v).forEach(g=>h.add(g)),c(f.h,b.h).forEach(g=>u.add(g));return{v:[...h],h:[...u]}}up(){this.drag&&(this.emit("move",{moves:[],done:!0}),this.drag=void 0)}render(){let e=this.config?.pages.find(l=>l.id===this.pageId),n=this.scale,a=this.stage,s=At(e?.widgets??[],this.orientation),r=this.guides(s),o=this.selection.length>1;return p`<div class="frame" style="width:${a.w*n}px;height:${a.h*n}px">
      <af-display
        preview
        .hass=${this.hass}
        .config=${this.config}
        display-id=${this.displayId}
        .fixedPage=${this.pageId}
        .forceOrientation=${this.orientation}
      ></af-display>
      <div class="edit" @pointerdown=${()=>this.emit("select",{id:null})} @pointermove=${this.move} @pointerup=${this.up} @pointercancel=${this.up}>
        ${this.grid?Array.from({length:a.cols*a.rows},(l,c)=>{let h=Zt(a,{x:c%a.cols,y:Math.floor(c/a.cols),w:1,h:1});return p`<i class="cell" style="left:${h.left*n}px;top:${h.top*n}px;width:${h.width*n}px;height:${h.height*n}px"></i>`}):m}
        ${(e?.widgets??[]).map(l=>{let c=s[l.id];if(!c)return m;let h=Zt(a,c),u=this.selected===l.id||this.selection.includes(l.id),f=!ht(this.hass,l.show_if,{display:this.displayId,orientation:this.orientation});return p`<div
            class="box ${u?"sel":""} ${f?"hidden":""}"
            style="left:${h.left*n}px;top:${h.top*n}px;width:${h.width*n}px;height:${h.height*n}px"
            @pointerdown=${b=>this.down(b,l,c,"move",s)}
          >
            <span class="tag">${d(Ke[l.type]?.name??l.type)}${f?` \xB7 ${d("bedingt")}`:""}</span>
            ${u&&!o?p`<span class="handle" @pointerdown=${b=>this.down(b,l,c,"resize",s)}></span>`:m}
          </div>`})}
        ${r.v.map(l=>p`<i class="guide v" style="left:${l*n}px"></i>`)}
        ${r.h.map(l=>p`<i class="guide h" style="top:${l*n}px"></i>`)}
      </div>
    </div>`}};Ri.properties={hass:{attribute:!1},config:{attribute:!1},pageId:{attribute:!1},displayId:{attribute:!1},selected:{attribute:!1},selection:{attribute:!1},orientation:{attribute:!1},scale:{state:!0},grid:{type:Boolean}},Ri.styles=O`
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
  `;F("af-canvas",Ri);var wu=new Set(["attribute","text_attribute","decimals","unit","min","max","cold","warm","refresh","radius","speed","interval","cooldown","hold_after","period","timeout","volume","event_types","quiet_action","show_if","css","typeface","from","sub","secondary","transition","watchdog","pause_minutes","ambient"]),xu=t=>t.advanced??wu.has(t.key.split(".").pop()??""),Mt={displays:[],pages:[]},ku=(t,i)=>i.split(".").reduce((e,n)=>e?.[n],t),xl=(t,i,e)=>{let[n,...a]=i.split("."),s={...t??{}};return a.length?(s[n]=xl(s[n]??{},a.join("."),e),Object.keys(s[n]).length||delete s[n]):e===void 0||e===""?delete s[n]:s[n]=e,s},wl,$u=()=>{if(customElements.get("ha-entity-picker"))return Promise.resolve(!0);let t=window;return t.loadCardHelpers?(wl??=(async()=>{try{return await(await(await t.loadCardHelpers()).createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),await Promise.race([customElements.whenDefined("ha-entity-picker"),new Promise(n=>setTimeout(n,4e3))]),!!customElements.get("ha-entity-picker")}catch{return!1}})(),wl):Promise.resolve(!1)},Su=["state","not_state","numeric","within_days","changed"],Tu=[{key:"condition",label:"Art",type:"select",options:[["state","Zustand ist"],["not_state","Zustand ist nicht"],["numeric","Zahl \xFCber/unter"],["changed","K\xFCrzlich ge\xE4ndert"],["within_days","Termin in den n\xE4chsten Tagen"],["any_state","Eine von mehreren ist"],["time","Uhrzeit von \u2013 bis"],["or","Mindestens eine von \u2026 (oder)"],["and","Alle von \u2026 (und)"],["not","Keine von \u2026 (nicht)"],["template","Vorlage (Jinja)"],["display","Nur auf Display \u2026"],["orientation","Nur im Hoch-/Querformat"]]},{key:"after",label:"ab",type:"text",placeholder:"05:00",when:t=>t.condition==="time"},{key:"before",label:"bis",type:"text",placeholder:"11:00",when:t=>t.condition==="time"},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>Su.includes(t.condition)},{key:"entities",label:"Entit\xE4ten",type:"entities",when:t=>t.condition==="any_state"},{key:"state",label:"Zustand",type:"text",placeholder:"on",when:t=>["state","not_state","any_state"].includes(t.condition)},{key:"minutes",label:"in den letzten \u2026 Minuten",type:"number",min:1,placeholder:"10",when:t=>t.condition==="changed"},{key:"state",label:"zu Zustand (optional)",type:"text",placeholder:"beliebig",when:t=>t.condition==="changed"},{key:"attribute",label:"Attribut (optional)",type:"text",when:t=>["state","not_state","numeric","within_days"].includes(t.condition)},{key:"above",label:"\xFCber",type:"number",when:t=>t.condition==="numeric"},{key:"below",label:"unter",type:"number",when:t=>t.condition==="numeric"},{key:"days",label:"Tage",type:"number",min:0,when:t=>t.condition==="within_days"},{key:"value_template",label:"Vorlage",type:"textarea",placeholder:"{{ is_state('person.alex', 'home') and now().hour >= 18 }}",help:"Erf\xFCllt bei true, on, Zahl \u2260 0",when:t=>t.condition==="template"},{key:"displays",label:"Displays",type:"multi",options:()=>Mt.displays,when:t=>t.condition==="display"},{key:"orientation",label:"Format",type:"select",options:[["landscape","Querformat"],["portrait","Hochformat"]],when:t=>t.condition==="orientation"},{key:"conditions",label:"",type:"conditions",when:t=>["and","or","not"].includes(t.condition)}],Cs=t=>{let i=e=>Array.isArray(e)?e.join("/"):String(e??"");switch(t.condition){case"state":return`${t.entity??"\u2026"} = ${i(t.state)}`;case"not_state":return`${t.entity??"\u2026"} \u2260 ${i(t.state)}`;case"numeric":return`${t.entity??"\u2026"}${t.above!==void 0?` > ${t.above}`:""}${t.below!==void 0?` < ${t.below}`:""}`;case"changed":return d("{entity} ge\xE4ndert ({n} min)",{entity:t.entity??"\u2026",n:t.minutes??10});case"within_days":return d("{entity} in {n} Tagen",{entity:t.entity??"\u2026",n:t.days??0});case"any_state":return d("eine von {n} = {state}",{n:(t.entities??[]).length,state:i(t.state)});case"time":return d("Uhrzeit {from}\u2013{to}",{from:t.after??"\u2026",to:t.before??"\u2026"});case"or":case"and":case"not":return`${d({or:"oder",and:"und",not:"nicht"}[t.condition])} (${(t.conditions??[]).length})`;case"template":return d("Vorlage");case"display":return d("nur auf {names}",{names:(t.displays??[]).map(e=>Mt.displays.find(([n])=>n===e)?.[1]??e).join(", ")||"\u2026"});case"orientation":return t.orientation==="portrait"?d("nur Hochformat"):d("nur Querformat");default:return d("Bedingung")}},Hi=class extends se{constructor(){super();this.fields=[];this.value={};this.advanced=!0;this.pickers=!!customElements.get("ha-entity-picker");this.addEventListener("value-changed",e=>{e.composedPath()[0]!==this&&e.stopImmediatePropagation()})}connectedCallback(){super.connectedCallback(),this.pickers||$u().then(e=>this.pickers=e)}emit(e){this.value=e,this.dispatchEvent(new CustomEvent("value-changed",{detail:{value:e}}))}set(e,n){this.emit(xl(this.value,e,n))}entityInput(e,n,a,s=""){if(this.pickers&&this.hass)return p`<ha-entity-picker
        .hass=${this.hass}
        .value=${e??""}
        .includeDomains=${n}
        allow-custom-entity
        @value-changed=${l=>a(l.detail.value||void 0)}
      ></ha-entity-picker>`;let r=`ents-${(n??["alle"]).join("-")}`,o=e?this.hass?.states[e]?.attributes.friendly_name:void 0;return p`<input
        list=${r}
        .value=${e??""}
        placeholder=${s||(n?`${n.join(", ")}.\u2026`:"entity_id")}
        @change=${l=>a(l.target.value.trim()||void 0)}
      />${o?p`<div class="hint">${o}</div>`:m}`}datalists(){if(this.pickers||!this.hass)return[];let e=new Set;(s=>s.forEach(r=>{(r.type==="entity"||r.type==="entities"||r.type==="autolist")&&e.add(("domains"in r&&r.domains||["alle"]).join("-")),r.type==="conditions"&&e.add("alle")}))(this.fields);let a=Object.keys(this.hass.states).sort();return[...e].map(s=>{let r=s==="alle"?null:s.split("-"),o=r?a.filter(l=>r.includes(l.split(".")[0])):a;return p`<datalist id=${`ents-${s}`}>${o.map(l=>p`<option value=${l}>${this.hass.states[l].attributes.friendly_name??""}</option>`)}</datalist>`})}renderList(e,n,a){let s=(r,o)=>{let l=[...n],[c]=l.splice(r,1);l.splice(r+o,0,c),a(l)};return p`<div class="list">
      ${n.map((r,o)=>p`<div class="item">
          <div class="item-head">
            <span>${d(e.itemLabel?.(r,o)??`#${o+1}`)}</span>
            <span class="tools">
              <button title=${d("nach oben")} ?disabled=${o===0} @click=${()=>s(o,-1)}>↑</button>
              <button title=${d("nach unten")} ?disabled=${o===n.length-1} @click=${()=>s(o,1)}>↓</button>
              <button title=${d("entfernen")} @click=${()=>a(n.filter((l,c)=>c!==o))}>✕</button>
            </span>
          </div>
          <af-form
            .hass=${this.hass}
            .advanced=${this.advanced}
            .fields=${e.fields}
            .value=${r??{}}
            @value-changed=${l=>a(n.map((c,h)=>h===o?l.detail.value:c))}
          ></af-form>
        </div>`)}
      <button class="add" @click=${()=>a([...n,e.newItem?.()??{}])}>+ ${d(e.addLabel??"Hinzuf\xFCgen")}</button>
    </div>`}renderField(e){if(e.when&&!e.when(this.value))return m;if(!this.advanced&&xu(e))return m;let n=ku(this.value,e.key),a;switch(e.type){case"text":{let r=e.suggestions?.length?`sug-${e.key.replace(/\W/g,"-")}`:void 0;a=p`<input
            .value=${n??""}
            list=${r??m}
            placeholder=${d(e.placeholder??"")}
            @input=${o=>this.set(e.key,o.target.value||void 0)}
          />${r?p`<datalist id=${r}>${e.suggestions.map(([o,l])=>p`<option value=${o}>${d(l)}</option>`)}</datalist>`:m}`;break}case"textarea":a=p`<textarea rows="3" .value=${n??""} @input=${r=>this.set(e.key,r.target.value||void 0)}></textarea>`;break;case"number":a=p`<input
          type="number"
          .value=${n??""}
          min=${e.min??""}
          max=${e.max??""}
          step=${e.step??"any"}
          placeholder=${d(e.placeholder??"")}
          @input=${r=>{let o=r.target.value;this.set(e.key,o===""?void 0:Number(o))}}
        />`;break;case"boolean":a=p`<label class="switch"
          ><input type="checkbox" .checked=${n??e.default??!1} @change=${r=>this.set(e.key,r.target.checked)} /><span></span
        ></label>`;break;case"select":{let r=typeof e.options=="function"?e.options(this.value):e.options;a=p`<select
          @change=${o=>{let l=o.target.selectedIndex;this.set(e.key,r[l][0])}}
        >
          ${r.map(([o,l])=>p`<option ?selected=${n===o||n===void 0&&o===void 0}>${d(l)}</option>`)}
        </select>`;break}case"icon":a=customElements.get("ha-icon-picker")&&this.hass?p`<ha-icon-picker .hass=${this.hass} .value=${n??""} @value-changed=${r=>this.set(e.key,r.detail.value||void 0)}></ha-icon-picker>`:p`<div class="with-icon">
              <span class="preview">${G(n)}</span>
              <input .value=${n??""} placeholder=${d("mdi:\u2026 oder washer, car, bell \u2026")} @change=${r=>this.set(e.key,r.target.value||void 0)} />
            </div>`;break;case"color":a=p`<div class="with-icon">
          <input type="color" .value=${/^#[0-9a-f]{6}$/i.test(n??"")?n:"#d9b45f"} @input=${r=>this.set(e.key,r.target.value)} />
          <input .value=${n??""} placeholder=${d("Standard")} @change=${r=>this.set(e.key,r.target.value||void 0)} />
        </div>`;break;case"entity":a=this.entityInput(n,e.domains,r=>this.set(e.key,r),e.placeholder);break;case"entities":{let r=Array.isArray(n)?n:[];a=p`<div class="chips">
            ${r.map(o=>p`<span class="chip">${this.hass?.states[o]?.attributes.friendly_name??o}<button @click=${()=>this.set(e.key,r.filter(l=>l!==o))}>✕</button></span>`)}
          </div>
          ${this.entityInput(void 0,e.domains,o=>o&&!r.includes(o)&&this.set(e.key,[...r,o]),d("Entit\xE4t hinzuf\xFCgen \u2026"))}`;break}case"multi":{let r=Array.isArray(n)?n:[];a=p`<div class="chips">
          ${e.options(this.value,this.hass).map(([o,l])=>p`<button
              class="pick ${r.includes(o)?"on":""}"
              @click=${()=>this.set(e.key,r.includes(o)?r.filter(c=>c!==o):[...r,o])}
            >
              ${l}
            </button>`)}
        </div>`;break}case"list":a=this.renderList(e,Array.isArray(n)?n:[],r=>this.set(e.key,r));break;case"object":a=p`<div class="nested">
          <af-form .hass=${this.hass} .advanced=${this.advanced} .fields=${e.fields} .value=${n??{}} @value-changed=${r=>this.set(e.key,Object.keys(r.detail.value).length?r.detail.value:void 0)}></af-form>
        </div>`;break;case"autolist":{let r=n==="auto",o=n===void 0||n===!1||n===e.offValue,l=r?"auto":o?"off":"list";a=p`<select
            @change=${c=>{let h=c.target.value;this.set(e.key,h==="auto"?"auto":h==="off"?e.offValue??void 0:[])}}
          >
            <option value="auto" ?selected=${l==="auto"}>${d(e.autoLabel??"Automatisch")}</option>
            <option value="list" ?selected=${l==="list"}>${d("Selbst ausw\xE4hlen")}</option>
            <option value="off" ?selected=${l==="off"}>${d("Aus")}</option>
          </select>
          ${l==="list"?e.fields?this.renderList({key:e.key,label:e.label,type:"list",fields:e.fields,itemLabel:c=>c.name??c.entity??d("Eintrag")},n,c=>this.set(e.key,c)):p`<af-form
                  .hass=${this.hass}
                  .fields=${[{key:"list",label:"",type:"entities",domains:e.domains}]}
                  .value=${{list:n}}
                  @value-changed=${c=>this.set(e.key,c.detail.value.list??[])}
                ></af-form>`:m}`;break}case"yaml":a=p`<textarea
          class="code"
          rows="8"
          .value=${n===void 0?"":gt(n,{lineWidth:100})}
          @change=${r=>{let o=r.target;try{this.set(e.key,o.value.trim()?Lt(o.value):void 0),o.setCustomValidity("")}catch(l){o.setCustomValidity(String(l)),o.reportValidity()}}}
        ></textarea>`;break;case"conditions":a=this.renderList({key:e.key,label:e.label,type:"list",fields:Tu,addLabel:"Bedingung",itemLabel:r=>Cs(r),newItem:()=>({condition:"state",state:"on"})},Array.isArray(n)?n:[],r=>this.set(e.key,r.length?r:void 0));break}let s=["list","object","autolist","yaml","conditions","textarea","entities"].includes(e.type);return p`<div class="field ${s?"wide":""}">
      ${e.label?p`<label class="lbl">${d(e.label)}</label>`:m}
      <div class="ctl">${a}</div>
      ${e.help?p`<div class="help">${d(e.help)}</div>`:m}
    </div>`}render(){return p`${this.datalists()}${this.fields.map(e=>this.renderField(e))}`}};Hi.properties={hass:{attribute:!1},fields:{attribute:!1},value:{attribute:!1},pickers:{state:!0},advanced:{type:Boolean}},Hi.styles=O`
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
  `;F("af-form",Hi);var Hl=Gs(ja(),1);var Ae=(t,...i)=>t.widgets.some(e=>i.includes(e.type)),pa=(t,i)=>i.test(t.id)||i.test(t.name),kl={photo:t=>t.background.type==="photo",camera:t=>t.background.type==="camera",standby:t=>t.background.type==="none"&&Ae(t,"clock")&&Ae(t,"date")&&Ae(t,"weather","value")&&!Ae(t,"summary"),morning:t=>Ae(t,"summary"),weather:t=>Ae(t,"weather")&&!Ae(t,"summary")&&!Ae(t,"date")&&(pa(t,/wetter|weather/i)||!Ae(t,"clock")),agenda:t=>Ae(t,"agenda","calendar")&&!pa(t,/m[üu]ll|waste|bins/i),waste:t=>Ae(t,"waste")||pa(t,/m[üu]ll|waste|bins/i),home:t=>Ae(t,"rooms","status","covers"),persons:t=>Ae(t,"persons","car"),energy:t=>Ae(t,"power","price","balance"),news:t=>Ae(t,"news"),night:t=>pa(t,/^nacht$|^night$/i)},ha=[{id:"kitchen",name:"K\xFCche",hint:"Alles im Blick: Fotos, Wetter, Termine, M\xFCll, Haushalt und Energie. Antippen \xF6ffnet das Dashboard.",icon:"home",pages:["photo","morning","standby","agenda","weather","waste","home","energy","news","persons"],display:{orientation:"auto",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:60},sound:{volume:80,quiet:{after:"22:00",before:"07:00"}}}},{id:"hallway",name:"Flur",hint:"Kurz im Vorbeigehen: Uhr, Wetter, M\xFCll und wer zu Hause ist \u2013 gro\xDFe Schrift.",icon:"door",pages:["standby","photo","waste","persons","weather"],display:{orientation:"auto",text_size:"large",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:30},sound:{volume:60,quiet:{after:"22:00",before:"07:00"}}}},{id:"bedroom",name:"Schlafzimmer",hint:"Ruhig und dunkel: Uhr, Fotos, Wetter. Nur die Klingel meldet sich, abends leise, nachts stumm.",icon:"moon",pages:["standby","photo","weather"],eventKinds:["alarm"],display:{mode:"dark",control:{enabled:!0,mode:"embedded",dashboard:"/lovelace/0",idle:30},sound:{volume:35,quiet:{after:"21:00",before:"08:00"}},design:{ambient:{type:"none"}}}},{id:"tv",name:"Fernseher",hint:"Gro\xDFer Bilderrahmen: Fotos, Webcams, Wetter, Nachrichten. Dunkel und ruhig (schont OLED), ohne Bedienung und Ton.",icon:"tv",pages:["photo","camera","weather","news","standby"],eventKinds:["alarm","live"],display:{orientation:"landscape",mode:"dark",text_size:"large",control:{enabled:!1,dashboard:"/lovelace/0",idle:60},sound:{mute:!0},oled:!0,design:{ambient:{type:"none"}}}}],Ls=(t,i)=>{let e=new Set,n=o=>{let l=kl[o],c=l&&i.find(h=>!e.has(h.id)&&l(h));return c&&e.add(c.id),c},a=t.pages.includes("photo")?n("photo"):void 0,s=t.pages.filter(o=>o!=="photo").map(n).filter(o=>!!o),r=[];return a&&r.push(a.id),s.forEach((o,l)=>{r.push(o.id),a&&l%2===1&&l<s.length-1&&r.push(a.id)}),!r.length&&i[0]&&r.push(i[0].id),r.map(o=>({page:o}))},$l=(t,i,e,n)=>{let a=i.pages.find(r=>kl.night(r)),s=t.eventKinds?i.events.filter(r=>t.eventKinds.includes(r.kind)).map(r=>r.id):"all";return{id:e,name:n,profile:t.id,playlist:Ls(t,i.pages),night:a?{page:a.id}:{},control:{enabled:!0,dashboard:"/lovelace/0",idle:60},events:s,...structuredClone(t.display)}};var Ms={key:"color",label:"Farbe",type:"select",options:[[void 0,"Standard"],["ink","Hell / Tinte"],["muted","Ged\xE4mpft"],["faint","Leise"],["accent","Akzent (Gold)"]]},oe={key:"label",label:"\xDCberschrift",type:"text"},Ns={key:"color",label:"Farbe",type:"select",options:[[void 0,"automatisch"],["accent","Akzent"],["cold","K\xFChl (blau)"],["good","Gut (gr\xFCn)"],["alert","Warnung (rot)"],["ink","Hell / Tinte"],["muted","Ged\xE4mpft"]]},Sl={key:"style",label:"Rahmen",type:"select",options:[[void 0,"Schlicht"],["card","Karte"]]},Al={clock:[{key:"size",label:"Gr\xF6\xDFe",type:"select",options:[[void 0,"f\xFCllt das Feld"],["small","klein (Kopfzeile)"]]},{key:"font",label:"Schrift",type:"select",options:[[void 0,"Stil-Schrift"],["sans","Schlicht"]]},{key:"seconds",label:"Sekunden",type:"boolean"},Ms],date:[{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Zeile"],["card","Karte"]]},{key:"format",label:"Format",type:"select",options:[[void 0,"Montag, 12. Oktober"],["short","Mo., 12. Okt."]]},{key:"size",label:"Schriftgr\xF6\xDFe",type:"number",min:10,max:120,placeholder:"26"},Ms],text:[{key:"text",label:"Text",type:"textarea",help:"Darf Vorlagen enthalten, z. B. {{ states('sensor.aussen') }} \xB0C \u2013 wird live aktualisiert."},{key:"markdown",label:"Formatierung (Markdown)",type:"boolean",help:"# Titel, - Liste, **fett**, *Akzent*, [mdi:icon], --- Linie"},{key:"style",label:"Stil",type:"select",options:[[void 0,"Flie\xDFtext"],["label","\xDCberschrift klein"],["title","Titel"],["big","Gro\xDF"]]},{key:"size",label:"Schriftgr\xF6\xDFe",type:"number",min:10,max:200},{key:"icon",label:"Icon",type:"icon"},Ms],chart:[oe,{key:"entities",label:"Entit\xE4ten",type:"list",addLabel:"Entit\xE4t hinzuf\xFCgen",itemLabel:t=>t.name||t.entity||"Entit\xE4t",newItem:()=>({}),fields:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"name",label:"Name",type:"text",placeholder:"automatisch"},Ns]},{key:"kind",label:"Darstellung",type:"select",options:[[void 0,"Linie"],["area","Fl\xE4che"],["bar","Balken"]]},{key:"hours",label:"Zeitraum (Stunden)",type:"number",min:1,placeholder:"24",help:"168 = eine Woche, 720 = 30 Tage"},{key:"period",label:"Ein Balken je",type:"select",options:[[void 0,"automatisch"],["hour","Stunde"],["day","Tag"]],when:t=>t.kind==="bar"},{key:"value",label:"Aktuellen Wert zeigen",type:"boolean",default:!0,when:t=>t.kind!=="bar"},{key:"min",label:"Achse von",type:"number",placeholder:"automatisch"},{key:"max",label:"Achse bis",type:"number",placeholder:"automatisch"},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},Sl],gauge:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"name",label:"Name",type:"text",placeholder:"automatisch"},{key:"icon",label:"Icon",type:"icon"},{key:"kind",label:"Form",type:"select",options:[[void 0,"Ring"],["half","Halbkreis"]]},{key:"min",label:"Minimum",type:"number",placeholder:"0",advanced:!1},{key:"max",label:"Maximum",type:"number",placeholder:"100",advanced:!1},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},Ns,{key:"severity",label:"Farbe ab Wert",type:"list",addLabel:"Stufe hinzuf\xFCgen",itemLabel:t=>d("ab {n}",{n:t.from??"?"}),newItem:()=>({from:0,color:"good"}),fields:[{key:"from",label:"ab Wert",type:"number"},Ns]},Sl],image:[{key:"url",label:"Bild-Link",type:"text",placeholder:"https://\u2026, /local/bild.jpg oder media-source://\u2026",help:"Darf eine Vorlage sein, z. B. /local/{{ states('input_select.motiv') }}.jpg"},{key:"entity",label:"\u2026 oder Bild einer Entit\xE4t",type:"entity",when:t=>!t.url,help:"Person, image.*, Kamera, Medienplayer \u2026"},{key:"fit",label:"Einpassen",type:"select",options:[[void 0,"F\xFCllen (zuschneiden)"],["contain","Ganz zeigen"]]},{key:"refresh",label:"Neu laden alle (s)",type:"number",min:0,placeholder:"nie"},{key:"caption",label:"Bildunterschrift",type:"text",help:"Darf eine Vorlage sein."},{key:"radius",label:"Eckenradius (px)",type:"number",min:0,placeholder:"28"}],weather:[{key:"entity",label:"Wetter",type:"entity",domains:["weather"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Jetzt (gro\xDF)"],["card","Karte mit 4 Stunden"],["hourly","Stunden-Kurve"],["daily","N\xE4chste Tage"],["rain","Regen-Vorschau"],["line","Eine Zeile"]]},{key:"name",label:"Ortsname",type:"text",when:t=>t.variant==="card"},{key:"hours",label:"Stunden",type:"number",min:2,max:48,when:t=>t.variant==="hourly"||t.variant==="rain"},{key:"days",label:"Tage",type:"number",min:1,max:7,when:t=>t.variant==="daily"},{key:"rain_sensor",label:"Regensensor",type:"entity",domains:["binary_sensor"],when:t=>t.variant==="rain"},{key:"threshold",label:"Regen ab %",type:"number",min:0,max:100,when:t=>t.variant==="rain"},{...oe,when:t=>t.variant==="hourly"||t.variant==="daily"}],value:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"name",label:"Name",type:"text"},{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Schlicht"],["card","Karte"]]},{...oe,when:t=>t.style==="card"},{key:"icon",label:"Icon",type:"icon"},{key:"unit",label:"Einheit",type:"text",placeholder:"automatisch"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4},{key:"cold",label:"Kalt unter",type:"number",help:"Wert wird blau, wenn er darunter liegt."},{key:"sub",label:"Unterzeile",type:"object",when:t=>t.style==="card",fields:[{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"suffix",label:"Text danach",type:"text",placeholder:"% Luftfeuchte"}]},{key:"secondary",label:"Weitere Werte",type:"list",when:t=>t.style==="card",addLabel:"Wert",itemLabel:t=>t.name??t.entity??"Wert",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4}]}],rooms:[{key:"rooms",label:"R\xE4ume",type:"list",addLabel:"Raum",itemLabel:t=>t.name??"Raum",fields:[{key:"name",label:"Name",type:"text"},{key:"temperature",label:"Temperatur",type:"entity",domains:["sensor","climate"]},{key:"humidity",label:"Luftfeuchte",type:"entity",domains:["sensor"]},{key:"climate",label:"Heizung",type:"entity",domains:["climate"]},{key:"windows",label:"Fenster",type:"entities",domains:["binary_sensor"]}]},{key:"cold",label:"Kalt unter \xB0C",type:"number",placeholder:"16"},{key:"warm",label:"Warm \xFCber \xB0C",type:"number",placeholder:"26"},{key:"columns",label:"Spalten",type:"number",min:1,max:6,placeholder:"3"}],status:[oe,{key:"windows",label:"Offene Fenster & T\xFCren",type:"autolist",autoLabel:"Alle Fenster- und T\xFCrsensoren",fields:[{key:"entity",label:"Sensor",type:"entity",domains:["binary_sensor"]},{key:"name",label:"Name",type:"text"},{key:"room",label:"Raum",type:"text"}]},{key:"appliances",label:"Laufende Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",fields:[{key:"entity",label:"L\xE4uft-Entit\xE4t",type:"entity"},{key:"name",label:"Name",type:"text"},{key:"icon",label:"Icon",type:"icon"}]},{key:"lights",label:"Lichter an",type:"select",options:[["auto","z\xE4hlen"],[void 0,"nicht zeigen"]]},{key:"waste",label:"M\xFCllkalender",type:"entity",domains:["calendar"]},{key:"waste_days",label:"M\xFCll zeigen ab Tagen",type:"number",min:0,max:7,placeholder:"2"},{key:"max",label:"H\xF6chstens Eintr\xE4ge",type:"number",min:1,max:10,placeholder:"5"},{key:"calm_title",label:"Text wenn alles ruhig",type:"text",placeholder:"Alles ruhig"}],calendar:[{key:"entity",label:"Kalender",type:"entity",domains:["calendar"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Karte"],["line","Zeile"]]},{key:"waste",label:"Ist M\xFCllkalender",type:"boolean"},{key:"days",label:"Nur zeigen bis Tage",type:"number",min:0},oe,{key:"icon",label:"Icon",type:"icon"}],infoline:[{key:"items",label:"Teile",type:"list",addLabel:"Teil",itemLabel:t=>t.name??t.text??{weather:"Wetter",calendar:"Termin",entity:"Wert",text:"Text",waste:"M\xFClltonnen",status:"Hinweis",device:"Ger\xE4t",media:"Wiedergabe",agenda:"N\xE4chster Termin"}[t.type]??"Teil",newItem:()=>({type:"entity"}),fields:[{key:"type",label:"Art",type:"select",options:[["weather","Wetter"],["calendar","Termin"],["waste","M\xFClltonnen (im Wechsel)"],["entity","Wert"],["text","Text"],["status","Hinweis \u2013 nur wenn zutreffend (z. B. Regen)"],["device","Ger\xE4t l\xE4uft \u2013 mit Restzeit"],["media","Wiedergabe (z. B. Apple TV)"],["agenda","N\xE4chster Termin"]]},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>!["text","waste","media"].includes(t.type)},{key:"entities",label:"Player",type:"entities",domains:["media_player"],when:t=>t.type==="media"},{key:"entities",label:"Kalender",type:"entities",domains:["calendar"],help:"Leer = die ersten Kalender automatisch",when:t=>t.type==="agenda"},{key:"hours",label:"Termine der n\xE4chsten \u2026 Stunden",type:"number",min:1,max:72,placeholder:"24",when:t=>t.type==="agenda"},{key:"state",label:"Zeigen bei Zustand",type:"text",placeholder:"on",when:t=>t.type==="status"},{key:"state",label:"L\xE4uft bei Zustand",type:"text",placeholder:"on, run, running \u2026",help:"Leer = \xFCbliche \u201El\xE4uft\u201C-Zust\xE4nde",when:t=>t.type==="device"},{key:"text",label:"Text",type:"text",placeholder:"Es regnet",when:t=>t.type==="status"},{key:"remaining",label:"Restzeit oder Endzeit",type:"entity",domains:["sensor"],when:t=>t.type==="device"},{key:"progress",label:"Fortschritt %",type:"entity",domains:["sensor"],when:t=>t.type==="device"},{key:"detail",label:"Zusatz",type:"entity",help:"z. B. aktueller Raum des Saugers",when:t=>t.type==="device"},{key:"show_end",label:"Endzeit statt Restzeit",type:"boolean",when:t=>t.type==="device"},{key:"list",label:"Nur wenn eine davon an ist",type:"list",addLabel:"Entit\xE4t",help:"z. B. Fenster \u2013 die offenen werden genannt",itemLabel:t=>t.name??t.entity??"Entit\xE4t",newItem:()=>({}),fields:[{key:"entity",label:"Entit\xE4t",type:"entity",domains:["binary_sensor","input_boolean","switch"]},{key:"name",label:"Name",type:"text"}],when:t=>t.type==="status"},{key:"show_if",label:"Nur zeigen, wenn",type:"conditions"},{key:"days",label:"Nur wenn in Tagen",type:"number",when:t=>t.type==="calendar"},{key:"days",label:"Tonnen der n\xE4chsten \u2026 Tage",type:"number",min:0,placeholder:"7",when:t=>t.type==="waste"},{key:"bins",label:"Tonnen",type:"list",addLabel:"Tonne",help:"Leer = alle M\xFCll-Sensoren (\u2026_tage) automatisch",itemLabel:t=>t.name??t.entity??"Tonne",newItem:()=>({}),fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Tage-Sensor",type:"entity",domains:["sensor"]},{key:"color",label:"Farbe",type:"color"}],when:t=>t.type==="waste"},{key:"name",label:"Name",type:"text",when:t=>["entity","device","media"].includes(t.type)},{key:"icon",label:"Icon",type:"icon",when:t=>["entity","status","device","media","agenda"].includes(t.type)},{key:"text",label:"Text",type:"text",when:t=>t.type==="text"}]}],camera:[{key:"entity",label:"Kamera",type:"entity",domains:["camera","image"],when:t=>!t.url},{key:"url",label:"\u2026 oder Webcam-Link",type:"text",placeholder:"https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)",suggestions:Kn,help:"\xD6ffentliche Kamera statt HA-Kamera \u2013 Vorschl\xE4ge per Klick ins Feld"},{key:"mode",label:"Modus",type:"select",options:[[void 0,"Live"],["snapshot","Standbild"]],when:t=>!t.url},{key:"refresh",label:"Standbild neu laden (s)",type:"number",min:0,when:t=>!t.url&&t.mode==="snapshot"},{key:"refresh",label:"Bild neu laden (s)",type:"number",min:10,placeholder:"60",when:t=>!!t.url},{key:"title",label:"Bildunterschrift",type:"text"},{key:"text",label:"Text aus Entit\xE4t",type:"entity",help:"z. B. KI-Analyse der Kamera"},{key:"radius",label:"Eckenradius",type:"number",min:0,max:60,placeholder:"28"}],pet:[{key:"name",label:"Name",type:"text",placeholder:"Polly"},{key:"visits",label:"Z\xE4hler \u201Eheute\u201C",type:"entity",domains:["sensor","counter"],help:"z. B. Katzenklo-Besuche, setzt sich t\xE4glich zur\xFCck"},{key:"unit",label:"Bezeichnung",type:"text",placeholder:"Besuche heute"},{key:"days",label:"Verlauf (Tage)",type:"number",min:0,max:31,placeholder:"7"},{key:"icon",label:"Icon",type:"icon"},oe],balance:[{key:"switch_hour",label:"Heute ab (Uhr)",type:"number",min:0,max:24,placeholder:"18",help:"Davor zeigt die Bilanz den Vortag"},{key:"groups",label:"Gruppen (YAML)",type:"yaml",help:`- label: Strom
  rows:
    - {name: Wohnung, entity: sensor.\u2026, price: 0.37}
    - {name: Trockner, entity: sensor.\u2026, cost: sensor.\u2026, hide_zero: true}`},oe],qr:[{key:"ssid",label:"Netzname (SSID)",type:"text"},{key:"password",label:"Passwort",type:"text"},{key:"encryption",label:"Verschl\xFCsselung",type:"select",options:[[void 0,"WPA/WPA2/WPA3"],["WEP","WEP"],["nopass","Offen"]]},{key:"hidden",label:"Verstecktes Netz",type:"boolean"},{key:"show_password",label:"Passwort zus\xE4tzlich als Text",type:"boolean"},{key:"hint",label:"Hinweis",type:"text",placeholder:"Handy-Kamera auf den Code halten"},{key:"image",label:"Eigenes QR-Bild",type:"text",placeholder:"/local/gaeste-wlan.png",help:"Statt Netzname und Passwort ein fertiges QR-Bild, z. B. aus der Fritzbox (Link oder data:image/\u2026)",advanced:!0},oe],job:[oe,{key:"title",label:"Name des Auftrags",type:"entity"},{key:"progress",label:"Fortschritt (%)",type:"entity",domains:["sensor"]},{key:"remaining",label:"Restzeit",type:"entity",domains:["sensor"]},{key:"end",label:"Endzeit",type:"entity",domains:["sensor"]},{key:"layer",label:"Schicht",type:"entity",domains:["sensor"]},{key:"layers",label:"Schichten gesamt",type:"entity",domains:["sensor"]},{key:"status",label:"Status",type:"entity"},{key:"temps",label:"Temperaturen",type:"list",addLabel:"Temperatur",itemLabel:t=>t.name??"Temperatur",newItem:()=>({}),fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity",domains:["sensor"]}]}],summary:[{key:"style",label:"Darstellung",type:"select",options:[[void 0,"Ohne Rahmen"],["card","Karte"]]},{key:"size",label:"Schriftgr\xF6\xDFe Punkte (px)",type:"number",min:14,max:40,placeholder:"22"},oe],news:[{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Gro\xDFbild mit Schlagzeile"],["list","Liste mit Vorschaubildern"],["ticker","Laufband"]]},{key:"feeds",label:"Quellen",type:"list",addLabel:"Quelle",help:"Vorschlag w\xE4hlen (z. B. bbc, guardian, tagesschau) oder die Adresse eines beliebigen RSS-/Atom-Feeds eintragen. Leer = Quellen in der Sprache der Anzeige.",itemLabel:t=>Za.find(([i])=>i===t.value)?.[1]??t.value??"Quelle",newItem:()=>({value:Yt()[0]}),fields:[{key:"value",label:"Quelle",type:"text",suggestions:Za,placeholder:"bbc, tagesschau \u2026 oder https://\u2026"}]},{key:"interval",label:"Wechsel nach (s)",type:"number",min:5,placeholder:"14",when:t=>!t.variant},{key:"max",label:"Meldungen",type:"number",min:1,max:30,placeholder:"8"},{key:"speed",label:"Tempo (px/s)",type:"number",min:10,max:200,placeholder:"45",when:t=>t.variant==="ticker"},oe],today:[{key:"calendars",label:"Kalender",type:"entities",domains:["calendar"],help:"Leer = die ersten Kalender automatisch"},{key:"weather",label:"Wetter",type:"entity",domains:["weather"]},oe],daily:[{key:"kind",label:"Inhalt",type:"select",options:[[void 0,"Wikipedia-Artikel des Tages"],["quote","Zitat"]]},{key:"language",label:"Wikipedia-Sprache",type:"select",options:[[void 0,"wie die Anzeige"],["de","Deutsch"],["en","English"],["sv","Svenska"]],help:"Einen \u201EArtikel des Tages\u201C gibt es nur in diesen Sprachen.",when:t=>t.kind!=="quote"},{key:"source",label:"Quelle",type:"select",options:[[void 0,"wie die Anzeige"],["wikiquote","Wikiquote \xB7 Deutsch, Zitat der Woche"],["zenquotes","ZenQuotes \xB7 English, quote of the day"]],when:t=>t.kind==="quote"},{key:"image",label:"Bild",type:"select",options:[[void 0,"Mit Bild"],[!1,"Ohne Bild"]],when:t=>t.kind!=="quote"},oe],card:[{key:"card",label:"Lovelace-Karte (YAML)",type:"yaml",help:"Jede Karte aus dem Dashboard, z. B. type: entities \u2026"}],price:[oe,{key:"entity",label:"Aktueller Preis",type:"entity",domains:["sensor"],help:"Optional \u2013 sonst aus dem Tibber-Verlauf."},{key:"home",label:"Tibber-Zuhause",type:"text",placeholder:"erstes"},{key:"window",label:"G\xFCnstigstes Fenster (h)",type:"number",min:1,max:6,placeholder:"2"},{key:"tomorrow",label:"Morgen anzeigen",type:"boolean",default:!0},{key:"note",label:"Fu\xDFnote",type:"text"}],power:[oe,{key:"production",label:"Erzeugung (W)",type:"list",addLabel:"Quelle",itemLabel:t=>t.name??t.entity??"Quelle",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Leistung",type:"entity",domains:["sensor"]}]},{key:"consumption",label:"Verbrauch",type:"object",fields:[{key:"name",label:"Name",type:"text",placeholder:"Verbrauch"},{key:"entity",label:"Leistung (W)",type:"entity",domains:["sensor"]}]},{key:"forecast",label:"Prognose heute (kWh)",type:"entity",domains:["sensor"]},{key:"forecast_remaining",label:"Prognose Rest (kWh)",type:"entity",domains:["sensor"]},{key:"extra",label:"Zusatzwert",type:"entity",domains:["sensor"]},{key:"extra_name",label:"Zusatzwert Name",type:"text"}],car:[{key:"name",label:"Name",type:"text"},{key:"battery",label:"Akku %",type:"entity",domains:["sensor"]},{key:"range",label:"Reichweite",type:"entity",domains:["sensor"]},{key:"location",label:"Standort",type:"entity",domains:["device_tracker","person"]},{key:"charging",label:"L\xE4dt",type:"entity",domains:["binary_sensor"]},{key:"plugged",label:"Angesteckt",type:"entity",domains:["binary_sensor"]},{key:"charger_power",label:"Ladeleistung",type:"entity",domains:["sensor"]},{key:"time_full",label:"Voll um",type:"entity",domains:["sensor"]},{key:"lock",label:"Schloss",type:"entity",domains:["lock"]},{key:"limit",label:"Ladelimit",type:"entity",domains:["number","sensor"]},{key:"inside_temp",label:"Innentemperatur",type:"entity",domains:["sensor"]}],persons:[oe,{key:"persons",label:"Personen",type:"list",addLabel:"Person",itemLabel:t=>t.name??t.entity??"Person",fields:[{key:"entity",label:"Person",type:"entity",domains:["person","device_tracker"]},{key:"name",label:"Name",type:"text"},{key:"location",label:"Ortsangabe",type:"entity",domains:["sensor"],help:"z. B. \u201EGeocoded Location\u201C der Companion-App"}]}],vacuum:[oe,{key:"vacuums",label:"Sauger",type:"list",addLabel:"Sauger",itemLabel:t=>t.name??t.entity??"Sauger",fields:[{key:"entity",label:"Sauger",type:"entity",domains:["vacuum"]},{key:"name",label:"Name",type:"text"},{key:"battery",label:"Akku",type:"entity",domains:["sensor"],help:"Leer = automatisch suchen"},{key:"room",label:"Aktueller Raum",type:"entity",domains:["sensor"]},{key:"map",label:"Saugkarte",type:"entity",domains:["image","camera"],help:"Leer = Karte des Saugers automatisch"}]},{key:"maps",label:"Kleine Karten",type:"select",options:[[void 0,"Neben jedem Sauger"],[!1,"Ausblenden"]]},{key:"map",label:"Gro\xDFe Karte darunter",type:"entity",domains:["image","camera"]}],waste:[oe,{key:"bins",label:"Tonnen",type:"list",addLabel:"Tonne",itemLabel:t=>t.name??"Tonne",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Tage bis Abholung",type:"entity",domains:["sensor"]},{key:"color",label:"Farbe",type:"color"},{key:"out",label:"Steht drau\xDFen",type:"entity",domains:["input_boolean","binary_sensor"]}]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:8,placeholder:"4"},{key:"highlight",label:"Hervorheben ab Tagen",type:"number",min:0,max:7,placeholder:"1"}],activity:[{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Eine Zeile (dezent)"],["list","Liste"]]},{key:"entities",label:"Melder",type:"autolist",autoLabel:"Alle Bewegungs-/Pr\xE4senzmelder",domains:["binary_sensor"],offValue:"auto"},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["binary_sensor"]},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:8,placeholder:"3"},{key:"within",label:"Zeitraum (min)",type:"number",min:5,placeholder:"120"},{...oe,when:t=>t.variant==="list"}],list:[oe,{key:"rows",label:"Zeilen",type:"list",addLabel:"Zeile",itemLabel:t=>t.name??t.entity??"Zeile",fields:[{key:"name",label:"Name",type:"text"},{key:"entity",label:"Entit\xE4t",type:"entity"},{key:"attribute",label:"Attribut",type:"text"},{key:"icon",label:"Icon",type:"icon"},{key:"format",label:"Bewertung",type:"select",options:[[void 0,"keine"],["aqi","Luftqualit\xE4t (AQI)"],["uv","UV-Index"],["lux","Helligkeit (Lux)"],["humidity","Luftfeuchte (Raum)"],["rain","Regen an/aus"],["onoff","An/Aus"]]},{key:"unit",label:"Einheit",type:"text"},{key:"decimals",label:"Nachkommastellen",type:"number",min:0,max:4}]}],agenda:[oe,{key:"calendars",label:"Kalender",type:"entities",domains:["calendar"]},{key:"days",label:"Tage voraus",type:"number",min:1,max:31,placeholder:"7"},{key:"max",label:"H\xF6chstens",type:"number",min:1,max:12,placeholder:"6"},{key:"location",label:"Ort zeigen",type:"boolean",default:!0}],media:[oe,{key:"entities",label:"Player",type:"entities",domains:["media_player"]},{key:"variant",label:"Darstellung",type:"select",options:[[void 0,"Kompakt"],["full","Ganze Seite mit gro\xDFem Cover"]]},{key:"show_paused",label:"Auch pausiert zeigen",type:"boolean"}],appliances:[oe,{key:"items",label:"Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??"Ger\xE4t",fields:[{key:"name",label:"Name",type:"text"},{key:"running",label:"L\xE4uft-Entit\xE4t",type:"entity"},{key:"icon",label:"Icon",type:"icon"},{key:"power",label:"Leistung",type:"entity",domains:["sensor"]},{key:"progress",label:"Fortschritt %",type:"entity",domains:["sensor"]},{key:"end",label:"Endzeit",type:"entity",domains:["sensor"]},{key:"cost",label:"Kosten",type:"entity",domains:["sensor"]}]},{key:"empty_text",label:"Text wenn nichts l\xE4uft",type:"text",placeholder:"Nichts l\xE4uft gerade"}],consumers:[oe,{key:"count",label:"Anzahl",type:"number",min:1,max:10,placeholder:"3"},{key:"devices",label:"Ger\xE4te",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",help:"Leer = die Einzelger\xE4te aus dem Energie-Dashboard von Home Assistant",fields:[{key:"entity",label:"Energiez\xE4hler (kWh)",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"}],advanced:!0},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["sensor"],advanced:!0}],batteries:[oe,{key:"part",label:"Zeigen",type:"select",options:[[void 0,"Ger\xE4te und schwache Batterien"],["devices","Nur Ger\xE4te"],["low","Nur schwache Batterien"]]},{key:"devices",label:"Ger\xE4te (immer zeigen)",type:"list",addLabel:"Ger\xE4t",itemLabel:t=>t.name??t.entity??"Ger\xE4t",help:"Leer = automatisch alle Handys, Tablets und Uhren aus der HA-App",fields:[{key:"entity",label:"Akkustand",type:"entity",domains:["sensor"]},{key:"name",label:"Name",type:"text"}]},{key:"threshold",label:"Zubeh\xF6r zeigen unter (%)",type:"number",min:1,max:100,placeholder:"21"},{key:"max",label:"H\xF6chstens Zeilen Zubeh\xF6r",type:"number",min:1,max:12,placeholder:"5",advanced:!0},{key:"exclude",label:"Ausnehmen",type:"entities",domains:["sensor","binary_sensor"],advanced:!0}],covers:[oe,{key:"covers",label:"Rolll\xE4den",type:"list",addLabel:"Rollladen",itemLabel:t=>t.name??t.entity??"Rollladen",fields:[{key:"entity",label:"Rollladen",type:"entity",domains:["cover"]},{key:"name",label:"Name",type:"text"},{key:"invert",label:"Richtung umkehren",type:"boolean",help:"Wenn der Antrieb offen und zu andersherum meldet"}]},{key:"only_open",label:"Nur offene listen",type:"boolean"}],warnings:[oe,{key:"entities",label:"Warn-Sensoren",type:"entities",domains:["binary_sensor"]},{key:"calm_text",label:"Text ohne Warnung",type:"text",placeholder:"Keine Warnungen"}]},Ki=[[void 0,"Schrift des Stils"],...Yi.map(t=>[t.id,`${t.name} \xB7 ${t.kind==="serif"?"Serife":"ohne Serife"}`])],El=[["auto","Automatisch \u2013 hell bei Tag, dunkel nach Sonnenuntergang"],["light","Immer hell"],["dark","Immer dunkel"]],Ds=[["none","Aus"],["particles","Schwebende Partikel"],["flow","Flie\xDFender Verlauf"],["bokeh","Lichtschimmer"],["mist","Nebel"]],zs=[["fade","\xDCberblenden"],["blur","Weich (Unsch\xE4rfe)"],["slide","Schieben"],["zoom","Zoom"]],Tl=[{key:"action",label:"Aktion",type:"select",options:[[void 0,"keine"],["toggle","Ein/aus schalten"],["more_info","Details (HA-Dialog)"],["perform","Aktion/Skript ausf\xFChren"],["page","Seite zeigen"],["popup","Pop-up mit HA-Karte"],["pause","Wiedergabe anhalten/fortsetzen"],["dashboard","HA-Dashboard \xF6ffnen"]]},{key:"entity",label:"Entit\xE4t",type:"entity",when:t=>["toggle","more_info"].includes(t.action)},{key:"perform",label:"Aktion (domain.dienst)",type:"text",placeholder:"script.turn_on",suggestions:[["script.turn_on","Skript starten"],["scene.turn_on","Szene aktivieren"],["light.toggle","Licht umschalten"],["cover.toggle","Rollladen/Tor umschalten"],["media_player.media_play_pause","Wiedergabe/Pause"],["input_boolean.toggle","Helfer umschalten"]],when:t=>t.action==="perform"},{key:"entity",label:"Ziel-Entit\xE4t",type:"entity",when:t=>t.action==="perform"},{key:"data",label:"Daten (YAML, optional)",type:"yaml",when:t=>t.action==="perform"},{key:"page",label:"Seite",type:"select",options:()=>Mt.pages,when:t=>t.action==="page"},{key:"title",label:"Titel",type:"text",when:t=>t.action==="popup"},{key:"card",label:"Karte (YAML)",type:"yaml",help:"z. B. type: entities, entities: [light.kueche]",when:t=>t.action==="popup"},{key:"timeout",label:"Schlie\xDFt nach (s)",type:"number",min:5,max:600,placeholder:"30",when:t=>t.action==="popup"},{key:"confirm",label:"Vorher nachfragen",type:"boolean",help:"F\xFCr Tor, T\xFCrschloss & Co.",when:t=>["toggle","perform"].includes(t.action)}],_l=[{key:"look.card",label:"Als Karte",type:"boolean",help:"Fl\xE4che, Rand und Radius des Stils"},{key:"look.accent",label:"Akzentfarbe",type:"color"},{key:"look.ink",label:"Schriftfarbe",type:"color"},{key:"look.size",label:"Gr\xF6\xDFe (%)",type:"number",min:50,max:200,step:5,placeholder:"100"},{key:"look.opacity",label:"Deckkraft (%)",type:"number",min:10,max:100,step:5,placeholder:"100"},{key:"look.padding",label:"Innenabstand (px)",type:"number",min:0,max:80,placeholder:"0"}],Ui=t=>[{key:`design.colors.${t}.bg`,label:"Hintergrund",type:"color"},{key:`design.colors.${t}.ink`,label:"Schrift",type:"color"},{key:`design.colors.${t}.accent`,label:"Akzent",type:"color"},{key:`design.colors.${t}.card`,label:"Karten",type:"color"},{key:`design.colors.${t}.card_opacity`,label:"Karten-Deckkraft (%)",type:"number",min:0,max:100,placeholder:"100"},{key:`design.colors.${t}.good`,label:"Gut (gr\xFCn)",type:"color"},{key:`design.colors.${t}.alert`,label:"Warnung (rot)",type:"color"},{key:`design.colors.${t}.cold`,label:"K\xFChl (blau)",type:"color"}],Is=[{key:"design.radius",label:"Eckenradius der Karten (px)",type:"number",min:0,max:80,placeholder:"wie Stil"},{key:"design.css",label:"Eigenes CSS (alle Displays)",type:"textarea",placeholder:":host { --af-accent: #e0a060 }",help:"F\xFCr Fortgeschrittene: gilt im Display; Farben und Abst\xE4nde \xFCber --af-\u2026-Variablen."}],Cl=[{key:"tap_action",label:"Beim Antippen",type:"object",fields:Tl},{key:"hold_action",label:"Beim langen Dr\xFCcken",type:"object",fields:Tl}],Ll=[{key:"align",label:"Waagerecht",type:"select",options:[[void 0,"links"],["center","mittig"],["end","rechts"]]},{key:"valign",label:"Senkrecht",type:"select",options:[[void 0,"oben"],["center","mittig"],["end","unten"]]},{key:"typeface",label:"Schrift",type:"select",options:[[void 0,"wie Design"],...Ki.slice(1)]}],Ml=[{key:"name",label:"Name",type:"text"},{key:"duration",label:"Dauer (s)",type:"number",min:3},{key:"background.type",label:"Hintergrund",type:"select",options:[["none","Stil-Farbe"],["photo","Foto"],["camera","Kamera / Webcam"],["color","Eigene Farbe"]]},{key:"background.color",label:"Farbe",type:"color",when:t=>t.background?.type==="color"},{key:"background.entity",label:"Kamera",type:"entity",domains:["camera"],when:t=>t.background?.type==="camera"&&!t.background?.url},{key:"background.url",label:"\u2026 oder Webcam-Link",type:"text",placeholder:"https://\u2026",suggestions:Kn,when:t=>t.background?.type==="camera"},{key:"background.refresh",label:"Bild neu laden (s)",type:"number",min:0,placeholder:"20",help:"0 = Livebild",when:t=>t.background?.type==="camera"},{key:"background.name",label:"Ortsname",type:"text",help:"Klein unten rechts, z. B. \u201ECuxhaven\u201C",when:t=>t.background?.type==="camera"&&!t.background?.sources?.length},{key:"background.sources",label:"Mehrere Webcams im Wechsel",type:"list",addLabel:"Webcam hinzuf\xFCgen",help:"Bei jedem Erscheinen der Seite die n\xE4chste \u2013 ersetzt Kamera und Link oben",itemLabel:t=>t.name||t.url||"Webcam",newItem:()=>({}),when:t=>t.background?.type==="camera",fields:[{key:"url",label:"Webcam-Link",type:"text",placeholder:"https://\u2026 (Bild, MJPEG, .m3u8 oder YouTube)",suggestions:Kn},{key:"name",label:"Ortsname",type:"text"},{key:"refresh",label:"Bild neu laden (s)",type:"number",min:0,placeholder:"wie oben"}]},{key:"palette",label:"Farben",type:"select",options:[["normal","Normal"],["night","Nacht (gedimmt)"]]},{key:"background.ambient",label:"Animation",type:"select",options:[[void 0,"wie Design"],...Ds],when:t=>t.palette!=="night"},{key:"transition.type",label:"\xDCbergang",type:"select",options:[[void 0,"wie Design"],...zs],advanced:!0},{key:"transition.duration",label:"\xDCbergang (s)",type:"number",min:.2,max:10,step:.1,placeholder:"wie Design",advanced:!0},{key:"show_if",label:"Nur anzeigen wenn \u2026",type:"conditions"},{key:"css",label:"Eigenes CSS (nur diese Seite)",type:"textarea",placeholder:'.cell[data-widget="uhr"] { filter: drop-shadow(0 4px 20px #0008) }',help:'F\xFCr Fortgeschrittene: gilt innerhalb der Seite; Widgets sind \xFCber .cell[data-widget="id"] erreichbar.'}],Ps=[{id:"alarm",name:"Vollbild (Klingel, Alarm)",short:"Vollbild",icon:"bell"},{id:"live",name:"Bild-im-Bild (Bewegung)",short:"Bild-im-Bild",icon:"cam"},{id:"info",name:"Hinweis + Erinnerung (Ger\xE4te)",short:"Hinweis",icon:"info"},{id:"page",name:"Seite zeigen (z. B. bei Bewegung)",short:"Seite",icon:"page"},{id:"media",name:"Musik-Cover (bei Liedwechsel)",short:"Musik-Cover",icon:"music"}],Wi=t=>["alarm","live","info"].includes(t.kind),we=(...t)=>i=>t.includes(i.kind),Nl=t=>[{key:"name",label:"Name",type:"text"},{key:"enabled",label:"Aktiv",type:"boolean",default:!0},{key:"kind",label:"Darstellung",type:"select",options:Ps.map(i=>[i.id,i.name])},{key:"entity",label:"Ausl\xF6ser",type:"entity",when:i=>i.kind!=="media"},{key:"entities",label:"Weitere Ausl\xF6ser",type:"entities",when:we("page"),help:"z. B. mehrere Bewegungsmelder \u2013 einer gen\xFCgt"},{key:"entities",label:"Player",type:"entities",domains:["media_player"],when:we("media"),help:"Gruppen zeigen jedes Lied nur einmal"},{key:"from",label:"von Zustand",type:"text",placeholder:"beliebig",when:i=>i.kind!=="media"},{key:"to",label:"zu Zustand",type:"text",placeholder:"on",suggestions:[["on","an"],["*","jede \xC4nderung (Tasten, event.*)"]],help:"* = bei jeder \xC4nderung \u2013 z. B. f\xFCr Tasten und event.*-Entit\xE4ten",when:i=>i.kind!=="media"},{key:"event_types",label:"Nur diese Ereignistypen",type:"multi",options:(i,e)=>(e?.states[i.entity]?.attributes.event_types??[]).map(n=>[n,n]),help:"Keiner gew\xE4hlt = alle",when:i=>i.to==="*"&&String(i.entity??"").startsWith("event.")},{key:"page",label:"Seite",type:"select",options:[[void 0,"\u2013 w\xE4hlen \u2013"],...t.pages.map(i=>[i.id,i.name])],when:we("page")},{key:"style",label:"Cover",type:"select",options:[[void 0,"Karte unten rechts (kurz beim Liedwechsel)"],["fullscreen","Vollbild (kurz beim Liedwechsel)"],["mini","Mini-Karte \u2013 bleibt, solange etwas l\xE4uft"]],when:we("media")},{key:"interval",label:"Zwischendurch alle (min)",type:"number",min:0,when:i=>i.kind==="media"&&i.style!=="mini",help:"W\xE4hrend der Wiedergabe erneut zeigen; leer oder 0 = nur beim Liedwechsel"},{key:"camera",label:"Kamera",type:"entity",domains:["camera"],when:we("alarm","live")},{key:"title",label:"Titel",type:"text",when:Wi},{key:"where",label:"Ort / Zusatz",type:"text",when:Wi},{key:"where",label:"Raum",type:"text",when:we("media"),placeholder:"Name des Players"},{key:"icon",label:"Icon",type:"icon",when:Wi},{key:"text",label:"Text aus Entit\xE4t",type:"entity",when:Wi,help:"z. B. KI-Beschreibung oder Warn-\xDCberschrift"},{key:"text_attribute",label:"\u2026 aus Attribut",type:"text",when:i=>Wi(i)&&!!i.text},{key:"cost",label:"Kosten-Sensor",type:"entity",domains:["sensor"],when:we("info")},{key:"chip",label:"Erinnerungstext",type:"text",when:we("info")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"30",when:we("live")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"60",when:we("info")},{key:"duration",label:"Dauer (s)",type:"number",min:3,placeholder:"12 / Vollbild 15",when:we("media")},{key:"duration",label:"Mindestens (s)",type:"number",min:3,placeholder:"60",when:we("page"),help:"Ab dem letzten Ausl\xF6sen; solange ein Melder an ist, bleibt die Seite ohnehin."},{key:"max",label:"H\xF6chstens (s)",type:"number",min:3,when:we("alarm")},{key:"max",label:"H\xF6chstens (s)",type:"number",min:3,placeholder:"600",when:we("page"),help:"Obergrenze, auch wenn ein Melder dauerhaft an bleibt."},{key:"hold_after",label:"Nachlauf (s)",type:"number",min:0,when:we("alarm","page"),help:"So lange bleibt die Anzeige, nachdem der Ausl\xF6ser wieder aus ist."},{key:"cooldown",label:"Abklingzeit (s)",type:"number",min:0,when:we("live"),help:"Danach erst wieder zeigen \u2013 gegen Dauerfeuer."},{key:"cooldown",label:"Abklingzeit (s)",type:"number",min:0,when:we("page"),help:"Nach dem Ende so lange nicht erneut zeigen."},{key:"at_night",label:"Auch nachts",type:"boolean"},{key:"sound",label:"Ton",type:"text",placeholder:"kein Ton",suggestions:Ni,help:"Klick ins Feld f\xFCr die mitgelieferten T\xF6ne \u2013 oder ein Link (/local/ton.mp3). Auf dem Tablet \xFCber Fully.",when:i=>i.kind!=="media"},{key:"volume",label:"Lautst\xE4rke (%)",type:"number",min:5,max:100,placeholder:"70",when:i=>!!i.sound&&i.kind!=="media",help:"Nur im Browser \u2013 Fully nutzt die Medienlautst\xE4rke des Tablets."},{key:"quiet.after",label:"Ruhezeit ab",type:"text",placeholder:"22:00"},{key:"quiet.before",label:"Ruhezeit bis",type:"text",placeholder:"07:00"},{key:"quiet_action",label:"In der Ruhezeit",type:"select",options:[[void 0,"ohne Ton zeigen"],["skip","gar nicht zeigen"]],when:i=>!!(i.quiet?.after||i.quiet?.before)},{key:"only_home",label:"Nur wenn jemand zu Hause ist",type:"boolean",help:"Mindestens eine Person (person.*) ist \u201Ehome\u201C."},{key:"show_if",label:"Nur wenn au\xDFerdem \u2026",type:"conditions"}],Dl=t=>[{key:"name",label:"Name",type:"text"},{key:"theme",label:"Stil",type:"select",options:[[void 0,"wie Design"],...ct.map(i=>[i.id,i.name])]},{key:"mode",label:"Hell/Dunkel",type:"select",options:[[void 0,"wie Design"],...El]},{key:"orientation",label:"Ausrichtung",type:"select",options:[[void 0,"Automatisch (nach Ger\xE4t, auch beim Drehen)"],["landscape","Immer quer"],["portrait","Immer hoch"]]},{key:"transition.type",label:"\xDCbergang",type:"select",options:[[void 0,"wie Design"],...zs],advanced:!0},{key:"transition.duration",label:"\xDCbergang (s)",type:"number",min:.2,max:10,step:.1,placeholder:"wie Design",advanced:!0},{key:"night.entity",label:"Nacht, wenn an",type:"entity",domains:["input_boolean","binary_sensor","switch","schedule"]},{key:"night.page",label:"Nachtseite",type:"select",options:[[void 0,"eingebaut"],...t.pages.map(i=>[i.id,i.name])]},{key:"control.enabled",label:"Bedienmodus",type:"boolean",default:!0},{key:"nav",label:"Pfeile zum Bl\xE4ttern",type:"boolean",default:!0,help:"Dezent unten links und rechts: vorherige und n\xE4chste Seite, ohne Ambiframe zu verlassen",when:i=>i.control?.enabled!==!1},{key:"control.mode",label:"Bedienung",type:"select",options:[[void 0,"Dashboard \xFCber Ambiframe (Antippen)"],["screensaver","Dashboard in Fully, Ambiframe als Bildschirmschoner"]],help:"Bildschirmschoner: Fully zeigt das Dashboard, nach der Wartezeit ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen Ambiframe sofort nach vorn. Fully wird automatisch umgestellt.",when:i=>i.control?.enabled!==!1},{key:"control.dashboard",label:"Dashboard",type:"text",placeholder:"/lovelace/0",when:i=>i.control?.enabled!==!1},{key:"control.idle",label:"Zur\xFCck nach (s)",type:"number",min:10,help:"Ohne Ber\xFChrung so lange, bis Ambiframe wieder erscheint",when:i=>i.control?.enabled!==!1},{key:"pause_minutes",label:"Pause endet nach (min)",type:"number",min:0,placeholder:"60",help:"F\xFCr den Schalter \u201EPause\u201C in HA; 0 = nie"},{key:"watchdog.button",label:"Neustart-Taste",type:"entity",domains:["button","input_button"],help:"Wird gedr\xFCckt, wenn sich das Display nicht mehr meldet \u2013 z. B. Fully \u201EStart-URL laden\u201C."},{key:"watchdog.after",label:"Neustart nach (s)",type:"number",min:60,placeholder:"120",when:i=>!!i.watchdog?.button},{key:"oled",label:"OLED-Schutz",type:"boolean",help:"F\xFCr OLED-Bildschirme: Die Anzeige wandert alle paar Minuten unmerklich um wenige Pixel, damit nichts einbrennt. Am besten zusammen mit \u201Edunkel\u201C."},{key:"ticker",label:"Nachrichten-Laufband",type:"select",options:[[void 0,"automatisch (aus beim Fernseher)"],[!0,"an"],[!1,"aus"]],help:"Im Videostream (AirPlay, Kamera) ist das Laufband immer aus \u2013 dort w\xFCrde es stehen bleiben oder ruckeln."},{key:"text_size",label:"Textgr\xF6\xDFe",type:"select",options:[[void 0,"wie Design"],["normal","normal"],["large","gro\xDF (+15 %)"],["xlarge","sehr gro\xDF (+30 %)"]]},{key:"contrast",label:"Kontrast",type:"select",options:[[void 0,"wie Design"],["normal","normal"],["high","hoch"]]}],zl=[{key:"design.accent",label:"Akzentfarbe",type:"color",help:"Leer = wie Design"},{key:"design.fonts.display",label:"Schrift Uhr & Titel",type:"select",options:[[void 0,"wie Design"],...Ki.slice(1)]},{key:"design.fonts.text",label:"Schrift Text",type:"select",options:[[void 0,"wie Design"],...Ki.slice(1)]},{key:"design.ambient.type",label:"Animation",type:"select",options:[[void 0,"wie Design"],...Ds]},{key:"design.evening",label:"Abendstimmung",type:"select",options:[[void 0,"wie Design"],["sun","dunkel: nach Sonnenuntergang w\xE4rmer"],["off","aus"]]},{key:"design.language",label:"Sprache",type:"select",options:[[void 0,"wie Design"],["auto","automatisch (wie der HA-Benutzer)"],["de","Deutsch"],["en","English"]]},{key:"design.radius",label:"Eckenradius der Karten (px)",type:"number",min:0,max:80,placeholder:"wie Design",advanced:!0},{key:"design.css",label:"Eigenes CSS (nur dieses Display)",type:"textarea",placeholder:":host { --af-accent: #e0a060 }",help:"Erg\xE4nzt das CSS aus dem Design.",advanced:!0}],Il=[{key:"stream.enabled",label:"Videostream",type:"boolean",help:"Legt die Kamera \u201EVideostream\u201C an \u2013 z. B. f\xFCr Apple TV (AirPlay), Apple Home oder Fernseher ohne modernen Browser. Braucht das Add-on \u201EPuppet\u201C. Gerechnet wird nur, solange jemand zuschaut."},{key:"stream.resolution",label:"Aufl\xF6sung",type:"select",options:[[void 0,"4K (3840 \xD7 2160)"],["1080p","Full HD (1920 \xD7 1080)"],["both","4K und Full HD (zwei Kameras)"]],when:t=>!!t.stream?.enabled},{key:"stream.tv",label:"Fernseher (Apple TV)",type:"entity",domains:["media_player"],help:"Legt den Schalter \u201EAuf dem Fernseher\u201C an \u2013 schickt das Display per AirPlay aufs Apple TV",when:t=>!!t.stream?.enabled},{key:"stream.interval",label:"Neues Bild alle (s)",type:"number",min:.2,max:60,step:.1,placeholder:"0.2",when:t=>!!t.stream?.enabled,advanced:!0},{key:"stream.renderer",label:"Puppet-Adresse",type:"text",placeholder:"automatisch",help:"Nur n\xF6tig, wenn Puppet nicht gefunden wird, z. B. http://homeassistant.local:10000",when:t=>!!t.stream?.enabled,advanced:!0}],Pl=[{key:"sound.mute",label:"Stumm",type:"boolean",help:"Keine T\xF6ne auf diesem Display \u2013 Einblendungen bleiben"},{key:"sound.volume",label:"Lautst\xE4rke (%)",type:"number",min:0,max:100,placeholder:"100",help:"Skaliert die Lautst\xE4rke der Ereignisse; in Fully die Medienlautst\xE4rke des Tablets",when:t=>!t.sound?.mute},{key:"sound.quiet.after",label:"Ruhezeit ab",type:"text",placeholder:"22:00",when:t=>!t.sound?.mute},{key:"sound.quiet.before",label:"Ruhezeit bis",type:"text",placeholder:"07:00",when:t=>!t.sound?.mute}],Os=[{key:"photos.folder",label:"Fotoordner",type:"text",placeholder:"wie Design",help:"Z. B. media-source://media_source/local/kueche"},{key:"photos.icloud",label:"iCloud-Album",type:"text",placeholder:"wie Design"},{key:"photos.bing",label:"Bing-Bilder",type:"select",options:[[void 0,"wie Design"],[!0,"ja"],[!1,"nein"]]},{key:"photos.bing_mix",label:"Bing-Bilder untermischen",type:"select",options:[[void 0,"wie Design"],[!0,"ja"],[!1,"nein \u2013 nur, wenn nichts Eigenes da ist"]]}],Fs=[{key:"design.language",label:"Sprache",type:"select",options:[[void 0,"automatisch (wie der HA-Benutzer)"],["de","Deutsch"],["en","English"]],help:"Anzeige, Editor und KI-Zusammenfassung"},{key:"design.mode",label:"Hell/Dunkel",type:"select",options:El},{key:"design.fonts.display",label:"Schrift Uhr & Titel",type:"select",options:Ki},{key:"design.fonts.text",label:"Schrift Text",type:"select",options:Ki},{key:"design.accent",label:"Akzentfarbe",type:"color",help:"Leer = Farbe des Stils"},{key:"design.text_size",label:"Textgr\xF6\xDFe",type:"select",options:[[void 0,"normal"],["large","gro\xDF (+15 %)"],["xlarge","sehr gro\xDF (+30 %)"]],help:"Kleinere Texte (Beschriftungen, Listen, Details) \u2013 f\xFCr Lesen aus der Entfernung"},{key:"design.contrast",label:"Kontrast",type:"select",options:[[void 0,"normal (ruhig)"],["high","hoch (ged\xE4mpfte Schrift kr\xE4ftiger)"]]},{key:"design.evening",label:"Abendstimmung",type:"select",options:[["sun","dunkel: nach Sonnenuntergang w\xE4rmer"],["off","aus"]]}],Ol=[{key:"summary.enabled",label:"Zusammenfassung",type:"boolean",help:"Gemini (ai_task) fasst Wetter, Termine, M\xFCll, Strom, Auto und Haus zusammen."},{key:"summary.times",label:"Erstellen um",type:"text",placeholder:"05:30, 12:00, 17:30",help:"Uhrzeiten mit Komma; jede ist eine Anfrage an die KI.",when:t=>!!t.summary?.enabled},{key:"summary.style",label:"Stil",type:"select",options:[[void 0,"Knapp, nur Fakten"],["friendly","Freundlich"]],when:t=>!!t.summary?.enabled},{key:"summary.ai_task",label:"KI",type:"entity",domains:["ai_task"],placeholder:"automatisch: Gemini",when:t=>!!t.summary?.enabled}],Bs=[{key:"design.ambient.type",label:"Animation",type:"select",options:[[void 0,"wie der Stil"],...Ds],help:"Sehr ruhig; nachts aus. Pro Seite \xE4nderbar."},{key:"design.ambient.strength",label:"St\xE4rke",type:"select",options:[[void 0,"dezent"],[2,"mittel"],[3,"deutlich"]],advanced:!0},{key:"design.ambient.speed",label:"Tempo",type:"select",options:[[void 0,"langsam"],["normal","normal"]],advanced:!0},{key:"design.transition.type",label:"Seitenwechsel",type:"select",options:[[void 0,"\xDCberblenden"],...zs.slice(1)]},{key:"design.transition.duration",label:"Dauer (s)",type:"number",min:.2,max:10,step:.1,placeholder:"2.4",advanced:!0}],Fl=[{key:"photos.folder",label:"Fotoordner",type:"text",help:"HA \u2192 Medien \u2192 Lokale Medien \u2192 Ordner \u201Eambiframe\u201C"},{key:"photos.icloud",label:"iCloud-Album",type:"text",placeholder:"https://photos.icloud.com/shared/album/\u2026",help:"Fotos-App \u2192 Album teilen \u2192 \u201E\xD6ffentliche Website\u201C an \u2192 Link kopieren. Wird mit dem Ordner gemischt."},{key:"photos.bing",label:"Bing-Bilder",type:"boolean",help:"Wenn Ordner und Album leer sind"},{key:"photos.bing_mix",label:"Bing-Bilder untermischen",type:"boolean",help:"Bing-Bilder des Tages auch zwischen die eigenen Fotos",when:t=>t.photos?.bing!==!1},{key:"photos.bing_market",label:"Bing-Region",type:"select",options:[[void 0,"wie die Sprache von Home Assistant"],["de-DE","Deutschland"],["de-AT","\xD6sterreich"],["de-CH","Schweiz"],["en-US","USA"],["en-GB","United Kingdom"],["en-CA","Canada"],["en-AU","Australia"],["en-IN","India"],["fr-FR","France"],["es-ES","Espa\xF1a"],["it-IT","Italia"],["nl-NL","Nederland"],["ja-JP","\u65E5\u672C"],["zh-CN","\u4E2D\u56FD"],["pt-BR","Brasil"]],help:"Bilder und Bildunterschriften der Bing-Bilder des Tages",when:t=>t.photos?.bing!==!1,advanced:!0},{key:"photos.credit",label:"Bildunterschrift",type:"boolean"}],De=(t,i)=>Object.keys(t?.states??{}).find(e=>e.startsWith(`${i}.`)),Ye=(t,i)=>Object.keys(t?.states??{}).filter(e=>e.startsWith(`${i}.`)),Bl=(t,i)=>{switch(t){case"weather":return{entity:De(i,"weather"),variant:"card"};case"camera":return{entity:De(i,"camera")};case"calendar":return{entity:De(i,"calendar")};case"text":return{text:d("Text"),style:"title"};case"status":return{windows:"auto",lights:"auto"};case"chart":{let e=Ye(i,"sensor").find(n=>i?.states[n]?.attributes.device_class==="temperature");return{entities:e?[{entity:e}]:[]}}case"gauge":{let e=Ye(i,"sensor").find(n=>i?.states[n]?.attributes.unit_of_measurement==="%");return e?{entity:e}:{}}case"persons":return{persons:Ye(i,"person").map(e=>({entity:e}))};case"vacuum":return{vacuums:Ye(i,"vacuum").map(e=>({entity:e}))};case"activity":return{entities:"auto"};case"agenda":return{calendars:Ye(i,"calendar").slice(0,1)};case"media":return{entities:Ye(i,"media_player")};case"covers":return{covers:Ye(i,"cover").map(e=>({entity:e}))};case"infoline":return{items:[{type:"weather",entity:De(i,"weather")}]};case"news":return{feeds:Yt()};case"card":return{card:{type:"entities",entities:[]}};default:return{}}},oi=t=>t.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss").replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"neu",ze=(t,i)=>{let e=new Set(i);if(!e.has(t))return t;let n=2;for(;e.has(`${t}_${n}`);)n++;return`${t}_${n}`},ue=(t,i,e,n,a,s,r={})=>({id:t,type:i,x:e,y:n,w:a,h:s,options:r}),Nt=[{id:"leer",name:"Leere Seite",build:()=>({duration:30,background:{type:"none"},palette:"normal",widgets:[]})},{id:"foto",name:"Bilderrahmen",build:t=>({duration:90,background:{type:"photo"},palette:"normal",widgets:[ue("uhr","clock",0,4,6,2,{valign:"end"}),ue("datum","date",0,6,7,1),ue("zeile","infoline",0,7,8,1,{items:[{type:"weather",entity:De(t,"weather")}]})]})},{id:"standby",name:"StandBy",build:t=>({duration:60,background:{type:"none"},palette:"normal",widgets:[ue("uhr","clock",0,2,7,3,{valign:"end"}),ue("datum","date",0,5,7,1,{color:"accent",size:28}),ue("karte","weather",8,1,4,6,{entity:De(t,"weather"),variant:"card"})]})},{id:"morgen",name:"Guten Morgen (KI-Zusammenfassung)",build:t=>({duration:45,background:{type:"none"},palette:"normal",show_if:[{condition:"time",after:"05:00",before:"11:00"}],widgets:[ue("uhr","clock",9,0,3,1,{size:"small",align:"end"}),ue("ueberblick","summary",0,0,8,8),ue("wetter","weather",8,1,4,6,{entity:De(t,"weather"),variant:"card"}),ue("datum","date",8,7,4,1,{align:"end"})]})},{id:"news",name:"Nachrichten",build:()=>({duration:60,background:{type:"none"},palette:"normal",widgets:[ue("aufmacher","news",0,0,12,7,{feeds:Yt(),interval:12}),ue("laufband","news",0,7,12,1,{feeds:Yt(),variant:"ticker"})]})},{id:"tagesvorschau",name:"Tagesvorschau am Morgen",build:t=>({duration:30,background:{type:"none"},palette:"normal",show_if:[{condition:"time",after:"05:00",before:"11:00"}],widgets:[ue("vorschau","today",0,0,12,7,{calendars:Ye(t,"calendar").slice(0,2),weather:De(t,"weather")}),ue("zeile","infoline",0,7,12,1,{items:[{type:"weather",entity:De(t,"weather")}]})]})},{id:"musik",name:"L\xE4uft gerade (ganze Seite)",build:t=>{let i=Ye(t,"media_player");return{duration:30,background:{type:"none"},palette:"normal",show_if:[{condition:"or",conditions:i.map(e=>({condition:"state",entity:e,state:"playing"}))}],widgets:[ue("musik","media",0,0,12,8,{entities:i,variant:"full"})]}}},{id:"artikel",name:"Wikipedia-Artikel des Tages",build:()=>({duration:25,background:{type:"none"},palette:"normal",widgets:[ue("artikel","daily",0,0,12,8)]})},{id:"zitat",name:"Zitat",build:()=>({duration:20,background:{type:"none"},palette:"normal",widgets:[ue("zitat","daily",0,0,12,8,{kind:"quote"})]})},{id:"kamera",name:"Kamera als Hintergrund",build:t=>({duration:30,background:{type:"camera",entity:De(t,"camera"),refresh:20},palette:"normal",widgets:[ue("uhr","clock",0,4,6,2,{valign:"end"}),ue("datum","date",0,6,7,1),ue("zeile","infoline",0,7,10,1,{items:[{type:"weather",entity:De(t,"weather")},{type:"waste"}]})]})},{id:"info",name:"Info mit Kopfzeile",build:()=>({duration:20,background:{type:"none"},palette:"normal",widgets:[ue("titel","text",0,0,6,1,{text:d("Titel"),style:"label"}),ue("uhr","clock",9,0,3,1,{size:"small",align:"end"})]})}],Au=t=>Object.values(t?.states??{}).find(i=>i.entity_id.startsWith("binary_sensor.")&&["motion","occupancy","presence"].includes(i.attributes.device_class))?.entity_id,Eu=t=>{let i=e=>{let n=t?.states[e];return n?.state==="playing"?0:n?.state==="paused"?1:n?.attributes.media_title?2:3};return Ye(t,"media_player").sort((e,n)=>i(e)-i(n)).slice(0,3)},ua=[{id:"klingel",name:"Klingel \u2192 Vollbild",build:t=>({name:d("Klingel"),enabled:!0,entity:"",to:"on",kind:"alarm",camera:De(t,"camera"),title:d("Es klingelt"),where:d("Haust\xFCr"),max:120,hold_after:30})},{id:"bewegung",name:"Bewegung \u2192 Bild-im-Bild",build:t=>({name:d("Bewegung"),enabled:!0,entity:"",to:"on",kind:"live",camera:De(t,"camera"),title:d("Bewegung"),where:"",duration:30,cooldown:120})},{id:"geraet",name:"Ger\xE4t fertig \u2192 Hinweis",build:()=>({name:d("Ger\xE4t fertig"),enabled:!0,entity:"",from:"on",to:"off",kind:"info",icon:"washer",title:d("Waschmaschine fertig"),where:"",chip:d("W\xE4sche fertig")})},{id:"warnung",name:"Warnung \u2192 Vollbild",build:()=>({name:d("Warnung"),enabled:!0,entity:"",to:"on",kind:"info",icon:"warning",title:d("Warnung"),where:"",text_attribute:"headline",at_night:!0,duration:120})},{id:"seite",name:"Bewegung \u2192 Seite zeigen",build:(t,i)=>({name:d("Bewegung \u2192 Seite"),enabled:!0,entity:Au(t),to:"on",kind:"page",page:i?.pages[0]?.id,title:"",where:"",duration:60})},{id:"musik",name:"Musik \u2192 Cover",build:t=>({name:d("Musik"),enabled:!0,kind:"media",entities:Eu(t),title:"",where:""})}];var _u=["welcome","place","content","events","photos","device","done"],Cu=["place","content","device","done"],Lu=["news","morgen","kamera"],Mu=t=>structuredClone(t),st=(t,i)=>Object.keys(t?.states??{}).filter(e=>e.startsWith(`${i}.`)),Vi=(t,i)=>String(t?.states[i]?.attributes.friendly_name??i),Dt=(t,i,e)=>e.test(i)||e.test(Vi(t,i)),Rl=/klingel|doorbell|ding|besucher|visitor|ring/i,Rs=/t[üu]r|door|front|eingang|haus|entrance/i,Nu=/wasch|washer|washing|trockner|dryer|sp[üu]l|dishwash/i,Gi=class extends se{constructor(){super(...arguments);this.mode="first";this.step=0;this.profileId="kitchen";this.name="";this.pages=new Set;this.extras=new Set;this.language="auto";this.theme="ruhig";this.doorbell={on:!1,entity:"",camera:"",sound:"klangschale"};this.motion={on:!1,entity:"",camera:"",sound:"hinweis"};this.appliances=new Set;this.photos={folder:"",icloud:"",bing:!0};this.control="embedded";this.dashboard="/lovelace/0";this.prepared=!1}get steps(){return this.mode==="first"?_u:Cu}get profile(){return ha.find(e=>e.id===this.profileId)??ha[0]}willUpdate(){if(this.prepared||!this.config)return;this.prepared=!0;let e=this.config;this.language=e.design.language??"auto",this.theme=e.design.theme,this.photos={folder:e.photos.folder??"",icloud:e.photos.icloud??"",bing:e.photos.bing!==!1},this.dashboard=e.displays[0]?.control?.dashboard??"/lovelace/0",this.pickProfile(this.profileId),this.detectEvents()}doorbellCandidates(){let e=this.hass;return[...st(e,"binary_sensor"),...st(e,"event")].filter(n=>Dt(e,n,Rl)||e?.states[n]?.attributes.device_class==="doorbell")}motionCandidates(){let e=this.hass,n=st(e,"binary_sensor").filter(a=>["motion","occupancy","presence"].includes(e?.states[a]?.attributes.device_class)||Dt(e,a,/bewegung|motion/i));return[...n.filter(a=>Dt(e,a,Rs)),...n.filter(a=>!Dt(e,a,Rs))]}applianceCandidates(){let e=this.hass;return[...st(e,"input_boolean"),...st(e,"binary_sensor")].filter(n=>Dt(e,n,Nu))}detectEvents(){let e=this.config?.events??[],n=new Set(e.flatMap(h=>[h.entity,...h.entities??[]])),a=st(this.hass,"camera"),s=a.find(h=>Dt(this.hass,h,Rs))??a[0]??"",r=e.find(h=>h.kind==="alarm"&&h.entity&&Dt(this.hass,h.entity,Rl)),o=e.find(h=>h.kind==="live"),l=r?.entity??this.doorbellCandidates()[0]??"",c=o?.entity??this.motionCandidates()[0]??"";this.doorbell={...this.doorbell,on:!!l&&!r,entity:l,camera:r?.camera??s},this.motion={...this.motion,on:!!c&&!o,entity:c,camera:o?.camera??s},this.appliances=new Set(this.applianceCandidates().filter(h=>!n.has(h)))}pickProfile(e){let n=d(this.profile.name);this.profileId=e;let a=this.profile;(!this.name||this.name===n)&&(this.name=d(a.name)),this.pages=new Set(Ls(a,this.config?.pages??[]).map(o=>o.page));let s=a.display.control;this.control=s?.enabled===!1?"off":s?.mode??"embedded";let r={news:"news",morgen:"morning",kamera:"camera"};this.extras=new Set(this.offeredTemplates().filter(o=>a.pages.includes(r[o])))}offeredTemplates(){let e=this.config?.pages??[],n={news:e.some(a=>a.widgets.some(s=>s.type==="news")),morgen:e.some(a=>a.widgets.some(s=>s.type==="summary")),kamera:e.some(a=>a.background.type==="camera")||!st(this.hass,"camera").length};return Lu.filter(a=>!n[a])}build(){let e=Mu(this.config);this.mode==="first"&&(e.design.theme=this.theme,this.language==="auto"?delete e.design.language:e.design.language=this.language,e.photos={...e.photos,folder:this.photos.folder.trim(),bing:this.photos.bing},this.photos.icloud.trim()?e.photos.icloud=this.photos.icloud.trim():delete e.photos.icloud,this.addEvents(e));let n=[];for(let b of this.extras){let g=Nt.find(S=>S.id===b);if(!g)continue;let v=ze(b,e.pages.map(S=>S.id));e.pages.push({id:v,name:d(g.name),...g.build(this.hass)}),n.push(v)}let a=this.profile,s=this.name.trim()||d(a.name),r=this.mode==="first"?e.displays[0]:void 0,o=r?r.id:ze(oi(s)||"display",e.displays.map(b=>b.id)),l=$l(a,e,o,s),c=l.playlist.map(b=>b.page).filter(b=>this.pages.has(b)),h=e.pages.map(b=>b.id).filter(b=>this.pages.has(b)&&!c.includes(b)),u=[...c,...h,...n];l.playlist=(u.length?u:[e.pages[0].id]).map(b=>({page:b})),l.control=this.control==="off"?{enabled:!1,dashboard:this.dashboard,idle:60}:{...l.control,enabled:!0,mode:this.control,dashboard:this.dashboard};let f=this.fullyButton();return f&&(l.watchdog={button:f,after:120}),r?e.displays[0]={...r,...l,night:l.night.page?l.night:r.night}:e.displays.push(l),e.setup_complete=!0,{config:e,displayId:o}}addEvents(e){let n=()=>e.events.map(o=>o.id),a=(o,l)=>{let c=ua.find(h=>h.id===o);e.events.push({...c.build(this.hass,e),...l,id:ze(o,n())})},s=this.doorbell;if(s.on&&s.entity){let o=s.entity.startsWith("event.");a("klingel",{entity:s.entity,to:o?"*":"on",camera:s.camera||void 0,sound:s.sound||void 0,volume:80})}let r=this.motion;r.on&&r.entity&&a("bewegung",{entity:r.entity,camera:r.camera||void 0,sound:r.sound||void 0,volume:30,quiet:{after:"22:00",before:"07:00"},quiet_action:"mute"});for(let o of this.appliances){let l=o+Vi(this.hass,o),c=/trockner|dryer/i.test(l),h=/sp[üu]l|dishwash/i.test(l);a("geraet",{name:Vi(this.hass,o),entity:o,title:c?d("Trockner fertig"):h?d("Sp\xFClmaschine fertig"):d("Waschmaschine fertig"),chip:c?d("Trockner fertig"):h?d("Sp\xFClmaschine fertig"):d("W\xE4sche fertig"),icon:c?"dryer":"washer",sound:"glas",volume:50,quiet:{after:"22:00",before:"07:00"},quiet_action:"mute"})}}fullyButton(){if(this.control==="off")return;let e=new Set((this.config?.displays??[]).filter((a,s)=>!(this.mode==="first"&&s===0)).map(a=>a.watchdog?.button)),n=st(this.hass,"button").filter(a=>/start_?url/i.test(a)&&!e.has(a));return n.length===1?n[0]:void 0}finish(){this.dispatchEvent(new CustomEvent("wizard-done",{detail:this.build(),bubbles:!0,composed:!0}))}close(){this.dispatchEvent(new CustomEvent("wizard-close",{bubbles:!0,composed:!0}))}render(){if(!this.config)return m;let e=this.steps,n=e[this.step],a=this.step===e.length-1;return p`<div class="card" role="dialog" aria-modal="true">
      <header>
        <div class="title">${ie("sparkle","ic")}${this.mode==="first"?d("Willkommen bei Ambiframe"):d("Neues Display")}</div>
        <div class="dots">${e.map((s,r)=>p`<i class=${r===this.step?"on":r<this.step?"done":""}></i>`)}</div>
      </header>
      <main>${this.renderStep(n)}</main>
      <footer>
        <button class="ghost" @click=${()=>this.close()}>${this.mode==="first"?d("\xDCberspringen"):d("Abbrechen")}</button>
        <span class="grow"></span>
        ${this.step>0?p`<button @click=${()=>this.step--}>${d("Zur\xFCck")}</button>`:m}
        ${a?p`<button class="primary" @click=${()=>this.finish()}>${d("Fertig \u2013 speichern")}</button>`:p`<button class="primary" ?disabled=${n==="place"&&!this.name.trim()} @click=${()=>this.step++}>${d("Weiter")}</button>`}
      </footer>
    </div>`}renderStep(e){switch(e){case"welcome":return this.renderWelcome();case"place":return this.renderPlace();case"content":return this.renderContent();case"events":return this.renderEvents();case"photos":return this.renderPhotos();case"device":return this.renderDevice();default:return this.renderDone()}}renderWelcome(){let e=[["auto",d("automatisch (wie der HA-Benutzer)")],["de","Deutsch"],["en","English"]];return p`<h2>${d("Ein ruhiges Bild \u2013 das nur spricht, wenn etwas ist")}</h2>
      <p class="lead">
        ${d("In wenigen Schritten richtest du dein erstes Display ein: wo es h\xE4ngt, was es zeigt, worauf es reagiert. Alles l\xE4sst sich sp\xE4ter im Editor \xE4ndern.")}
      </p>
      <label class="field"
        ><span>${d("Sprache")}</span>
        <select @change=${n=>this.language=n.target.value}>
          ${e.map(([n,a])=>p`<option value=${n} ?selected=${this.language===n}>${a}</option>`)}
        </select></label
      >
      <h3>${d("Stil")}</h3>
      <div class="grid">
        ${ct.map(n=>p`<button class="choice ${this.theme===n.id?"on":""}" @click=${()=>this.theme=n.id}>
            <b>${d(n.name)}</b><span>${d(n.hint)}</span>
          </button>`)}
      </div>`}renderPlace(){return p`<h2>${d("Wo h\xE4ngt das Display?")}</h2>
      <p class="lead">${d("Das Profil w\xE4hlt passende Seiten, Bedienung, T\xF6ne und Aussehen. Du kannst danach alles anpassen.")}</p>
      <div class="grid">
        ${ha.map(e=>p`<button class="choice ${this.profileId===e.id?"on":""}" @click=${()=>this.pickProfile(e.id)}>
            <b>${ie(e.icon,"ic")}${d(e.name)}</b><span>${d(e.hint)}</span>
          </button>`)}
      </div>
      <label class="field"
        ><span>${d("Name")}</span><input .value=${this.name} @input=${e=>this.name=e.target.value}
      /></label>`}toggled(e,n){let a=new Set(e);return a.has(n)?a.delete(n):a.add(n),a}renderContent(){let e=this.offeredTemplates();return p`<h2>${d("Was soll das Display zeigen?")}</h2>
      <p class="lead">${d("Vorausgew\xE4hlt nach Profil. Der Bilderrahmen wechselt sich mit den Info-Seiten ab.")}</p>
      <div class="checks">
        ${this.config.pages.map(n=>p`<label class="check"
            ><input type="checkbox" .checked=${this.pages.has(n.id)} @change=${()=>this.pages=this.toggled(this.pages,n.id)} /><span
              >${n.name}</span
            ></label
          >`)}
      </div>
      ${e.length?p`<h3>${d("Neue Seiten dazu")}</h3>
            <div class="checks">
              ${e.map(n=>p`<label class="check"
                  ><input type="checkbox" .checked=${this.extras.has(n)} @change=${()=>this.extras=this.toggled(this.extras,n)} /><span
                    >${d(Nt.find(a=>a.id===n).name)}</span
                  ></label
                >`)}
            </div>`:m}`}entitySelect(e,n,a){return p`<select @change=${s=>a(s.target.value)}>
      <option value="" ?selected=${!e}>${d("keine")}</option>
      ${n.map(s=>p`<option value=${s} ?selected=${s===e}>${Vi(this.hass,s)}</option>`)}
    </select>`}soundSelect(e,n,a){return p`<span class="sound">
      <select @change=${s=>n(s.target.value)}>
        <option value="" ?selected=${!e}>${d("ohne Ton")}</option>
        ${Ni.filter(([s])=>s!=="alarm").map(([s,r])=>p`<option value=${s} ?selected=${s===e}>${d(r)}</option>`)}
      </select>
      <button class="small" ?disabled=${!e} title=${d("Anh\xF6ren")} @click=${()=>e&&Di(e,a)}>▶</button>
    </span>`}renderEvent(e,n,a,s,r,o,l){return p`<div class="event ${a.on?"":"off"}">
      <label class="switch"
        ><input type="checkbox" .checked=${a.on} @change=${()=>s({...a,on:!a.on})} /><b>${ie(e,"ic")}${n}</b></label
      >
      <div class="rows">
        <label><span>${d("Ausl\xF6ser")}</span>${this.entitySelect(a.entity,r,c=>s({...a,entity:c}))}</label>
        <label><span>${d("Kamera")}</span>${this.entitySelect(a.camera,st(this.hass,"camera"),c=>s({...a,camera:c}))}</label>
        <label><span>${d("Ton")}</span>${this.soundSelect(a.sound,c=>s({...a,sound:c}),o)}</label>
      </div>
      ${l?p`<p class="hint">${l}</p>`:m}
    </div>`}renderEvents(){let e=this.applianceCandidates();return p`<h2>${d("Worauf soll es reagieren?")}</h2>
      <p class="lead">${d("Gefunden in deinem Home Assistant. T\xF6ne sind dezent und passen zum Design \u2013 zum Anh\xF6ren \u25B6 dr\xFCcken.")}</p>
      ${this.renderEvent("bell",d("Klingel \u2192 Vollbild mit Kamera"),this.doorbell,n=>this.doorbell=n,this.doorbellCandidates(),80)}
      ${this.renderEvent("motion",d("Bewegung an der T\xFCr \u2192 Kamera als Bild-im-Bild"),this.motion,n=>this.motion=n,this.motionCandidates(),30,d("Leiser als die Klingel, nachts (22\u20137 Uhr) stumm."))}
      ${e.length?p`<div class="event">
            <b>${ie("washer","ic")}${d("Ger\xE4t fertig \u2192 Hinweis und Erinnerung")}</b>
            <div class="checks">
              ${e.map(n=>p`<label class="check"
                  ><input type="checkbox" .checked=${this.appliances.has(n)} @change=${()=>this.appliances=this.toggled(this.appliances,n)} /><span
                    >${Vi(this.hass,n)}</span
                  ></label
                >`)}
            </div>
          </div>`:m}`}renderPhotos(){let e=this.photos;return p`<h2>${d("Woher kommen die Fotos?")}</h2>
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
      >`}renderDevice(){let e=[["embedded",d("Dashboard \xFCber Ambiframe"),d("Ambiframe l\xE4uft immer; Antippen blendet das HA-Dashboard ein, danach geht es von selbst zur\xFCck.")],["screensaver",d("Ambiframe als Bildschirmschoner"),d("Fully zeigt das Dashboard; nach einer Minute ohne Ber\xFChrung erscheint Ambiframe. Klingel und Kamera holen es sofort nach vorn.")],["off",d("Nur anzeigen"),d("Keine Bedienung \u2013 z. B. f\xFCr den Fernseher.")]];return p`<h2>${d("Bedienung")}</h2>
      <div class="grid">
        ${e.map(([n,a,s])=>p`<button class="choice ${this.control===n?"on":""}" @click=${()=>this.control=n}>
            <b>${a}</b><span>${s}</span>
          </button>`)}
      </div>
      ${this.control!=="off"?p`<label class="field"
            ><span>${d("Dashboard")}</span><input .value=${this.dashboard} @input=${n=>this.dashboard=n.target.value}
          /></label>`:m}
      <p class="hint">
        ${this.fullyButton()?d("Fully Kiosk gefunden: Ambiframe stellt Start-Seite und Bildschirmschoner selbst ein und startet das Tablet neu, falls es h\xE4ngt."):d("Tipp: Mit Fully Kiosk (und dessen HA-Integration) stellt Ambiframe das Tablet selbst ein.")}
      </p>`}renderDone(){let{config:e,displayId:n}=this.build(),a=e.displays.find(c=>c.id===n),s=`${location.origin}/ambiframe-display?display=${encodeURIComponent(n)}`,r=(0,Hl.default)(0,"M");r.addData(s),r.make();let o=e.events.length-this.config.events.length,l=this.control==="off"?d("Nur anzeigen"):this.control==="screensaver"?d("Ambiframe als Bildschirmschoner"):d("Dashboard \xFCber Ambiframe");return p`<h2>${d("Fertig!")}</h2>
      <p class="lead">
        ${d("So richtest du das Ger\xE4t ein: diese Adresse im Browser des Tablets oder Fernsehers \xF6ffnen (bei Fully als Start-URL) und einmal bei Home Assistant anmelden.")}
      </p>
      <div class="done">
        <div class="qr">${Bt(r.createSvgTag({cellSize:4,margin:2,scalable:!0}))}</div>
        <div>
          <code>${s}</code>
          <p><button class="small" @click=${()=>navigator.clipboard?.writeText(s)}>${d("Adresse kopieren")}</button></p>
          <ul>
            <li>${d("Display \u201E{name}\u201C mit {n} Seiten",{name:a.name,n:a.playlist.length})}</li>
            ${o>0?p`<li>${d("{n} neue Ereignisse",{n:o})}</li>`:m}
            <li>${l}</li>
          </ul>
        </div>
      </div>`}};Gi.properties={hass:{attribute:!1},config:{attribute:!1},mode:{},step:{state:!0},profileId:{state:!0},name:{state:!0},pages:{state:!0},extras:{state:!0},language:{state:!0},theme:{state:!0},doorbell:{state:!0},motion:{state:!0},appliances:{state:!0},photos:{state:!0},control:{state:!0},dashboard:{state:!0}},Gi.styles=O`
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
  `;F("af-wizard",Gi);var Du=new Set("sensor binary_sensor weather camera calendar light switch media_player person device_tracker input_boolean input_number input_select input_text input_datetime input_button cover climate vacuum fan lock button event image todo zone sun alarm_control_panel automation script scene select number update ai_task water_heater humidifier siren valve lawn_mower text time date schedule counter timer group remote".split(" ")),zu=/^([a-z_]+)\.[a-z0-9_]+$/,Hs=(t,i=new Set)=>{if(typeof t=="string"){let e=zu.exec(t);e&&Du.has(e[1])&&i.add(t)}else if(Array.isArray(t))for(let e of t)Hs(e,i);else if(t&&typeof t=="object")for(let e of Object.values(t))Hs(e,i);return i},Iu=15,Ws=(t,i,e={},n,a)=>{let s=[],r=i?.states??{},o=Object.keys(r).length>0,l=new Map,c=(g,v,S)=>{if(o)for(let I of Hs(g)){let A=r[I],P=A?A.state==="unavailable"?"warn":void 0:"error";if(!P)continue;let $=l.get(I)??{level:P,wheres:[],go:S};$.wheres.includes(v)||$.wheres.push(v),l.set(I,$)}};for(let g of t.pages){c([g.show_if,g.background],d("Seite \u201E{name}\u201C",{name:g.name}),{tab:"seiten",pageId:g.id});for(let v of g.widgets)c([v.options,v.show_if,v.tap_action,v.hold_action],d("Seite \u201E{name}\u201C",{name:g.name}),{tab:"seiten",pageId:g.id,widgetId:v.id})}for(let g of t.events)g.enabled!==!1&&c(g,d("Ereignis \u201E{name}\u201C",{name:g.name||g.title||g.id}),{tab:"ereignisse",eventId:g.id});for(let g of t.displays)c([g.night,g.watchdog,g.playlist],d("Display \u201E{name}\u201C",{name:g.name}),{tab:"wiedergabe",displayId:g.id});c(t.summary,d("KI-Zusammenfassung"),{tab:"design"});for(let[g,v]of l){let S=v.wheres.length>2?`${v.wheres.slice(0,2).join(", ")} \u2026`:v.wheres.join(", ");s.push({level:v.level,text:v.level==="error"?d("{id} gibt es nicht (mehr) \u2013 {where}",{id:g,where:S}):d("{id} ist nicht verf\xFCgbar \u2013 {where}",{id:g,where:S}),go:v.go})}let h=Date.now();for(let g of t.displays){let v=e[g.id],S={tab:"wiedergabe",displayId:g.id};if(!v||!v.online&&!v.last_seen){s.push({level:"info",text:d("Display \u201E{name}\u201C war noch nie verbunden",{name:g.name}),go:S});continue}if(!v.online&&v.last_seen&&h-new Date(v.last_seen).getTime()>Iu*6e4){let I=Math.round((h-new Date(v.last_seen).getTime())/36e5);s.push({level:"warn",text:I>=1?d("Display \u201E{name}\u201C meldet sich seit {n} h nicht",{name:g.name,n:I}):d("Display \u201E{name}\u201C meldet sich nicht",{name:g.name}),go:S})}for(let I of v.clients)I.safe?s.push({level:"warn",text:d("\u201E{name}\u201C ist im Notfallmodus: {reason}",{name:I.name,reason:d(I.safe)}),go:S}):a&&I.version&&I.version!==a&&s.push({level:"info",text:d("\u201E{name}\u201C hat noch eine \xE4ltere Version",{name:I.name}),go:S})}let u=new Set;for(let g of t.displays){for(let v of g.playlist)u.add(v.page);g.night?.page&&u.add(g.night.page)}for(let g of t.events)g.page&&u.add(g.page);for(let g of t.pages)for(let v of g.widgets)for(let S of[v.tap_action,v.hold_action])S?.page&&u.add(S.page);for(let g of t.pages)u.has(g.id)||s.push({level:"info",text:d("Seite \u201E{name}\u201C wird nirgends gezeigt",{name:g.name}),go:{tab:"seiten",pageId:g.id}});t.pages.some(g=>g.background.type==="photo"&&u.has(g.id))&&n&&(!((n.folder??0)+(n.icloud??0))&&!t.photos.bing?s.push({level:"error",text:d("Der Bilderrahmen hat keine Fotos (Ordner und Album leer, Bing aus)"),go:{tab:"design"}}):t.photos.folder&&n.folder===0&&s.push({level:"warn",text:d("Der Fotoordner ist leer oder fehlt"),go:{tab:"design"}}),t.photos.icloud&&n.icloud===0&&s.push({level:"warn",text:d("Das iCloud-Album liefert keine Fotos"),go:{tab:"design"}})),t.summary?.enabled&&o&&!t.summary.ai_task&&!Object.keys(r).some(g=>g.startsWith("ai_task."))&&s.push({level:"warn",text:d("KI-Zusammenfassung ist an, aber es gibt keine KI (ai_task) in Home Assistant"),go:{tab:"design"}});let b={error:0,warn:1,info:2};return s.sort((g,v)=>b[g.level]-b[v.level])};var Ee=t=>JSON.parse(JSON.stringify(t)),Wl=t=>{if(!(t==null||t==="")){if(Array.isArray(t))return t;if(typeof t=="object"){let i={};for(let[e,n]of Object.entries(t)){let a=Wl(n);a!==void 0&&(i[e]=a)}return Object.keys(i).length?i:void 0}return t}},Pu=t=>t.map(i=>i.type==="select"&&Array.isArray(i.options)?{...i,options:[[void 0,"wie alle Displays"],...i.options.filter(([e])=>e!==void 0)]}:i.type==="number"||i.type==="text"||i.type==="textarea"?{...i,placeholder:"wie alle Displays"}:i),ma=t=>gt(t,{lineWidth:120,noRefs:!0}),ji=class extends se{constructor(){super(...arguments);this.narrow=!1;this.tab="seiten";this.plOpen=new Set;this.multi=[];this.clip=null;this.pageImport=null;this.designScope="";this.healthOpen=!1;this.wizard="";this.wizardSkipped=!1;this.advanced=(()=>{try{return(localStorage.getItem("ambiframe-editor-advanced")??localStorage.getItem("wandbild-editor-advanced"))==="1"}catch{return!1}})();this.importText=null;this.presetName="";this.pageId="";this.widgetId=null;this.eventId="";this.displayId="";this.message=null;this.saving=!1;this.yaml="";this.menu="";this.layout="landscape";this.summaryBusy=!1;this.summaryNote="";this.history=[];this.future=[];this.coalesceKey="";this.devices={};this.onCopy=e=>{if(e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]")||this.tab!=="seiten"||!this.selection.length)return;let a=this.selectedWidgets();e.preventDefault(),e.clipboardData?.setData("text/plain",gt({ambiframe_widgets:a},{lineWidth:120})),this.clip=a,this.message={kind:"ok",text:a.length===1?d("Widget kopiert."):d("{n} Widgets kopiert.",{n:a.length})}};this.onPaste=e=>{if(e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]")||this.tab!=="seiten")return;let a=e.clipboardData?.getData("text/plain")??"";this.pasteText(a)&&e.preventDefault()};this.onKey=e=>{let n=e.composedPath()[0]?.matches?.("input, textarea, select, [contenteditable]"),a=e.metaKey||e.ctrlKey;if(a&&e.key.toLowerCase()==="s")e.preventDefault(),this.save();else if(a&&e.key.toLowerCase()==="z"&&!n)e.preventDefault(),e.shiftKey?this.redo():this.undo();else if(!n&&this.tab==="seiten"&&this.widgetId){let s={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(e.key==="Delete"||e.key==="Backspace")e.preventDefault(),this.removeWidget();else if(e.key==="Escape")this.widgetId=null,this.multi=[];else if(s[e.key]){e.preventDefault();let[r,o]=s[e.key],l=fe[this.layout],h=(this.page?.widgets??[]).filter(u=>this.selection.includes(u.id)).map(u=>({id:u.id,pos:this.posOf(u)}));if(!h.length)return;if(e.shiftKey){let u=h[0].pos,f={...u,w:Math.min(Math.max(1,u.w+r),l.cols-u.x),h:Math.min(Math.max(1,u.h+o),l.rows-u.y)};this.updatePage(b=>this.setPos(b,h[0].id,f),"keys")}else h.every(({pos:f})=>f.x+r>=0&&f.x+f.w+r<=l.cols&&f.y+o>=0&&f.y+f.h+o<=l.rows)&&this.updatePage(f=>h.forEach(({id:b,pos:g})=>this.setPos(f,b,{...g,x:g.x+r,y:g.y+o})),"keys")}else a&&e.key.toLowerCase()==="d"&&(e.preventDefault(),this.duplicateWidget())}}}setAdvanced(e){this.advanced=e;try{localStorage.setItem("ambiframe-editor-advanced",e?"1":"0")}catch{}!e&&this.tab==="yaml"&&(this.tab="seiten")}updated(){this.hass&&!this.unsub&&(this.unsub=this.hass.connection.subscribeMessage(e=>this.onConfig(e.config),{type:"ambiframe/config/subscribe"}).catch(e=>{this.message={kind:"error",text:d("Ambiframe ist nicht erreichbar: {error}",{error:String(e?.message??e)})}})),this.tab==="wiedergabe"&&!this.devicesTimer&&this.hass?(this.loadDevices(),this.devicesTimer=window.setInterval(()=>{this.loadDevices()},1e4)):this.tab!=="wiedergabe"&&this.devicesTimer&&(clearInterval(this.devicesTimer),this.devicesTimer=void 0)}async generateSummary(){this.summaryBusy=!0,this.summaryNote="";try{let e=await this.hass.callWS({type:"ambiframe/summary/generate"});this.summaryNote=`Fertig: \u201E${e.headline}\u201C`}catch(e){this.summaryNote=e.message??d("Fehlgeschlagen")}finally{this.summaryBusy=!1}}async loadDevices(){try{this.devices=await this.hass?.callWS({type:"ambiframe/displays/status"})??{}}catch{}}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey),window.addEventListener("copy",this.onCopy),window.addEventListener("paste",this.onPaste)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),window.removeEventListener("copy",this.onCopy),window.removeEventListener("paste",this.onPaste),this.unsub?.then(e=>e?.()),this.unsub=void 0,clearInterval(this.devicesTimer),this.devicesTimer=void 0}onConfig(e){let n=this.dirty;this.saved=e,(!n||!this.draft)&&(this.draft=Ee(e),this.history=[],this.future=[]),this.ensureSelection()}ensureSelection(){let e=this.draft;if(!e)return;e.pages.some(a=>a.id===this.pageId)||(this.pageId=e.pages[0]?.id??""),e.displays.some(a=>a.id===this.displayId)||(this.displayId=e.displays[0]?.id??""),e.events.some(a=>a.id===this.eventId)||(this.eventId=e.events[0]?.id??"");let n=e.pages.find(a=>a.id===this.pageId);this.widgetId&&!n?.widgets.some(a=>a.id===this.widgetId)&&(this.widgetId=null)}get dirty(){return!!this.draft&&!!this.saved&&JSON.stringify(this.draft)!==JSON.stringify(this.saved)}mutate(e,n=""){if(!this.draft)return;(!n||n!==this.coalesceKey)&&(this.history.push(JSON.stringify(this.draft)),this.history.length>100&&this.history.shift(),this.future=[]),this.coalesceKey=n;let a=Ee(this.draft);e(a),this.draft=a,this.message=null,this.ensureSelection()}undo(){let e=this.history.pop();!e||!this.draft||(this.future.push(JSON.stringify(this.draft)),this.draft=JSON.parse(e),this.coalesceKey="",this.ensureSelection())}redo(){let e=this.future.pop();!e||!this.draft||(this.history.push(JSON.stringify(this.draft)),this.draft=JSON.parse(e),this.coalesceKey="",this.ensureSelection())}async save(){if(!(!this.hass||!this.draft)){this.saving=!0;try{await this.hass.callWS({type:"ambiframe/config/save",config:this.draft,language:Qi()}),this.saved=Ee(this.draft),this.message={kind:"ok",text:d("Gespeichert \u2013 alle Displays zeigen es sofort.")}}catch(e){this.message={kind:"error",text:e.message??String(e)}}finally{this.saving=!1}}}discard(){this.saved&&(this.mutate(e=>Object.assign(e,Ee(this.saved))),this.message=null)}willUpdate(e){(e.has("pageId")||e.has("layout"))&&(this.multi=[])}get selection(){let e=new Set(this.page?.widgets.map(n=>n.id));return this.widgetId?[this.widgetId,...this.multi.filter(n=>n!==this.widgetId&&e.has(n))]:[]}onSelect(e){let{id:n,toggle:a,keep:s}=e.detail,r=this.selection;if(!n)this.widgetId=null,this.multi=[];else if(a)if(r.includes(n)){let o=r.filter(l=>l!==n);this.widgetId=o[0]??null,this.multi=o.slice(1)}else this.widgetId?this.multi=[...this.multi,n]:this.widgetId=n;else s&&r.includes(n)?(this.widgetId=n,this.multi=r.filter(o=>o!==n)):(this.widgetId=n,this.multi=[])}selectedWidgets(){let e=this.selection;return Ee((this.page?.widgets??[]).filter(n=>e.includes(n.id)))}async copyWidgets(e=this.selectedWidgets()){if(e.length){this.clip=e;try{await navigator.clipboard.writeText(gt({ambiframe_widgets:e},{lineWidth:120}))}catch{}this.message={kind:"ok",text:e.length===1?d("Widget kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen."):d("{n} Widgets kopiert \u2013 mit \u2318V oder \u201EEinf\xFCgen\u201C auf einer Seite einsetzen.",{n:e.length})}}}pasteWidgets(e){let n=this.page;if(!n||!e.length)return;let a=n.widgets.map(l=>l.id),s=[],r=e.every(l=>n.widgets.some(c=>c.x===l.x&&c.y===l.y&&c.type===l.type)),o=n.widgets.some(l=>l.portrait);this.updatePage(l=>{for(let c of e){if(!c?.type||!Ke[c.type])continue;let h=Ee(c);h.id=ze(h.id||h.type,[...a,...s]),s.push(h.id),h.w=Math.min(Math.max(1,h.w??2),12),h.h=Math.min(Math.max(1,h.h??1),8),h.x=Math.min(Math.max(0,(h.x??0)+(r?1:0)),12-h.w),h.y=Math.min(Math.max(0,(h.y??0)+(r?1:0)),8-h.h),h.options??={},o?h.portrait||(h.portrait={x:0,y:Math.max(0,fe.portrait.rows-Math.min(h.h,fe.portrait.rows)),w:fe.portrait.cols,h:Math.min(h.h,fe.portrait.rows)}):delete h.portrait,l.widgets.push(h)}}),this.widgetId=s[0]??null,this.multi=s.slice(1)}pasteText(e){let n;try{n=Lt(e)}catch{return!1}return Array.isArray(n?.ambiframe_widgets)?(this.pasteWidgets(n.ambiframe_widgets),!0):n?.ambiframe_page&&typeof n.ambiframe_page=="object"?(this.importPage(n.ambiframe_page),!0):!1}saveWidgetTemplate(){let e=this.selectedWidgets();if(!e.length)return;let n=prompt(d("Name der Vorlage"),e.length===1?d(Ke[e[0].type]?.name??e[0].type):d("{n} Widgets",{n:e.length}));n?.trim()&&(this.mutate(a=>{let s=(a.templates??={}).widgets??=[],r=s.find(o=>o.name===n.trim());r?r.widgets=e:s.push({name:n.trim(),widgets:e})}),this.message={kind:"ok",text:d("Vorlage \u201E{name}\u201C gespeichert \u2013 unter \u201EEigene Vorlagen\u201C.",{name:n.trim()})})}savePageTemplate(){let e=this.page;if(!e)return;let n=prompt(d("Name der Seitenvorlage"),e.name);if(!n?.trim())return;let{id:a,name:s,...r}=Ee(e);this.mutate(o=>{let l=(o.templates??={}).pages??=[],c=l.find(h=>h.name===n.trim());c?c.page=r:l.push({name:n.trim(),page:r})}),this.menu="",this.message={kind:"ok",text:d("Seitenvorlage \u201E{name}\u201C gespeichert \u2013 unter \u201E+ Neu\u201C.",{name:n.trim()})}}async exportPage(){let e=this.page;if(!e)return;let n=gt({ambiframe_page:e},{lineWidth:120});try{await navigator.clipboard.writeText(n),this.message={kind:"ok",text:d("Seite \u201E{name}\u201C als YAML kopiert \u2013 woanders mit \u201E+ Neu \u2192 Seite importieren\u201C oder \u2318V einsetzen.",{name:e.name})}}catch{this.pageImport=n,this.message={kind:"ok",text:d("Seite unten als YAML \u2013 zum Kopieren markieren.")}}}importPage(e,n){if(!Array.isArray(e.widgets)){this.message={kind:"error",text:d("Keine Seite erkannt (es fehlen \u201Ewidgets\u201C).")};return}let a=n??e.name??d("Importierte Seite"),s=ze(oi(a),this.draft?.pages.map(o=>o.id)??[]),r={duration:30,background:{type:"none"},palette:"normal",...Ee(e),id:s,name:a};this.mutate(o=>{o.pages.push(r),(o.displays.find(c=>c.id===this.displayId)??o.displays[0])?.playlist.push({page:s})}),this.pageId=s,this.widgetId=null,this.menu="",this.pageImport=null,this.message={kind:"ok",text:d("Seite \u201E{name}\u201C angelegt \u2013 Seiten-IDs in Aktionen ggf. anpassen.",{name:a})}}get page(){return this.draft?.pages.find(e=>e.id===this.pageId)}get widget(){return this.page?.widgets.find(e=>e.id===this.widgetId)}updatePage(e,n=""){let a=this.pageId;this.mutate(s=>{let r=s.pages.find(o=>o.id===a);r&&e(r)},n)}posOf(e){return this.layout==="landscape"?{x:e.x,y:e.y,w:e.w,h:e.h}:At(this.page?.widgets??[],"portrait")[e.id]??{x:0,y:0,w:fe.portrait.cols,h:1}}setPos(e,n,a){let s=e.widgets.find(r=>r.id===n);if(s){if(this.layout==="landscape"){Object.assign(s,a);return}if(e.widgets.some(r=>!r.portrait)){let r=At(e.widgets,"portrait");for(let o of e.widgets)o.portrait??=r[o.id]??{x:0,y:fe.portrait.rows-1,w:fe.portrait.cols,h:1}}s.portrait={...a}}}updateWidget(e,n=""){let a=this.widgetId;this.updatePage(s=>{let r=s.widgets.find(o=>o.id===a);r&&e(r)},n)}addPage(e){let n=Nt.find(r=>r.id===e)??Nt[0],a=n.id==="leer"?d("Neue Seite"):d(n.name),s=ze(oi(a),this.draft?.pages.map(r=>r.id)??[]);this.mutate(r=>{r.pages.push({id:s,name:a,...n.build(this.hass)}),(r.displays.find(l=>l.id===this.displayId)??r.displays[0])?.playlist.push({page:s})}),this.pageId=s,this.widgetId=null,this.menu=""}duplicatePage(){let e=this.page;if(!e)return;let n=ze(`${e.id}_kopie`,this.draft?.pages.map(a=>a.id)??[]);this.mutate(a=>a.pages.push({...Ee(e),id:n,name:`${e.name} (Kopie)`})),this.pageId=n}removePage(){let e=this.page;!e||!confirm(d("Seite \u201E{name}\u201C l\xF6schen?",{name:e.name}))||(this.mutate(n=>{n.pages=n.pages.filter(a=>a.id!==e.id);for(let a of n.displays)a.playlist=a.playlist.filter(s=>s.page!==e.id),a.night?.page===e.id&&delete a.night.page}),this.widgetId=null)}addWidget(e){let n=this.page;if(!n)return;let[a,s]=Ke[e].size,r=ze(e,n.widgets.map(c=>c.id)),o=(c,h)=>n.widgets.some(u=>c<u.x+u.w&&c+a>u.x&&h<u.y+u.h&&h+s>u.y),l={x:0,y:0};e:for(let c=0;c+s<=8;c++)for(let h=0;h+a<=12;h++)if(!o(h,c)){l={x:h,y:c};break e}this.updatePage(c=>{let h={id:r,type:e,...l,w:a,h:s,options:Bl(e,this.hass)};if(c.widgets.some(u=>u.portrait)){let u=fe.portrait,f=Math.min(u.cols,Math.max(2,Math.round(a*u.cols/12))),b=(v,S)=>c.widgets.some(I=>I.portrait&&v<I.portrait.x+I.portrait.w&&v+f>I.portrait.x&&S<I.portrait.y+I.portrait.h&&S+s>I.portrait.y),g={x:0,y:Math.max(0,u.rows-s)};e:for(let v=0;v+s<=u.rows;v++)for(let S=0;S+f<=u.cols;S++)if(!b(S,v)){g={x:S,y:v};break e}h.portrait={...g,w:f,h:Math.min(s,u.rows)}}c.widgets.push(h)}),this.widgetId=r,this.menu=""}duplicateWidget(){let e=this.selectedWidgets();if(!e.length)return;let n=this.page?.widgets.map(s=>s.id)??[],a=[];this.updatePage(s=>{for(let r of e){let o=ze(r.id,[...n,...a]);a.push(o);let l={...Ee(r),id:o,x:Math.min(r.x+1,12-r.w),y:Math.min(r.y+1,8-r.h)};r.portrait&&(l.portrait={...r.portrait,x:Math.min(r.portrait.x+1,8-r.portrait.w),y:Math.min(r.portrait.y+1,12-r.portrait.h)}),s.widgets.push(l)}}),this.widgetId=a[0]??null,this.multi=a.slice(1)}removeWidget(){let e=this.selection;e.length&&(this.updatePage(n=>n.widgets=n.widgets.filter(a=>!e.includes(a.id))),this.widgetId=null,this.multi=[])}onMove(e){let{moves:n,done:a}=e.detail;if(a){this.coalesceKey="";return}let s=n.filter(r=>{let o=this.page?.widgets.find(c=>c.id===r.id);if(!o)return!1;let l=this.posOf(o);return l.x!==r.x||l.y!==r.y||l.w!==r.w||l.h!==r.h});s.length&&this.updatePage(r=>s.forEach(({id:o,...l})=>this.setPos(r,o,l)),`drag-${n[0]?.id}-${this.layout}`)}form(e,n,a,s){return p`<af-form
      .hass=${this.hass}
      .advanced=${this.advanced}
      .fields=${e}
      .value=${n}
      @value-changed=${r=>{!r.detail?.value||typeof r.detail.value!="object"||Array.isArray(r.detail.value)||(a(r.detail.value),this.coalesceKey=s)}}
    ></af-form>`}renderPages(){let e=this.draft,n=e.displays.find(r=>r.id===this.displayId),a=new Set(n?.playlist.map(r=>r.page)),s=this.widget;return p`<div class="pages">
      <aside class="list">
        <div class="head">
          <span>${d("Seiten")}</span>
          <span class="rel">
            <button class="small" @click=${()=>this.menu=this.menu==="page"?"":"page"}>${d("+ Neu")}</button>
            ${this.menu==="page"?p`<div class="menu">
                  ${Nt.map(r=>p`<button @click=${()=>this.addPage(r.id)}>${d(r.name)}</button>`)}
                  ${e.templates?.pages?.length?p`<div class="sep">${d("Eigene Vorlagen")}</div>
                        ${e.templates.pages.map((r,o)=>p`<div class="menu-row">
                            <button @click=${()=>this.importPage(r.page,r.name)}>${r.name}</button>
                            <button
                              class="x"
                              title=${d("Vorlage l\xF6schen")}
                              @click=${()=>confirm(d("Seitenvorlage \u201E{name}\u201C l\xF6schen?",{name:r.name}))&&this.mutate(l=>l.templates.pages.splice(o,1))}
                            >
                              ✕
                            </button>
                          </div>`)}`:m}
                  <div class="sep"></div>
                  <button @click=${()=>(this.pageImport="",this.menu="")}>${d("Seite importieren \u2026")}</button>
                </div>`:m}
          </span>
        </div>
        ${this.pageImport!==null?p`<div class="import-box">
              <textarea
                class="code import"
                rows="8"
                placeholder="ambiframe_page: …"
                .value=${this.pageImport}
                @input=${r=>this.pageImport=r.target.value}
              ></textarea>
              <span>
                <button
                  class="small"
                  @click=${()=>{try{let r=Lt(this.pageImport??"");this.importPage(r?.ambiframe_page??r)}catch(r){this.message={kind:"error",text:d("Import fehlgeschlagen: {error}",{error:String(r?.message??r)})}}}}
                >
                  ${d("Importieren")}
                </button>
                <button class="small" @click=${()=>this.pageImport=null}>${d("Abbrechen")}</button>
              </span>
            </div>`:m}
        <div class="entries">
        ${e.pages.map(r=>p`<button class="entry ${r.id===this.pageId?"on":""}" @click=${()=>(this.pageId=r.id,this.widgetId=null)}>
            <span class="name">${r.name}</span>
            <span class="meta"
              >${[r.background?.type==="photo"?d("Foto"):"",r.palette==="night"?d("Nacht"):"",r.show_if?.length?d("bedingt"):"",a.has(r.id)?"":d("nicht in Wiedergabe")].filter(Boolean).join(" \xB7 ")||`${r.duration} s`}</span
            >
          </button>`)}
        </div>
      </aside>
      <section class="stage">
        <div class="row-head">
          <span class="seg">
            ${["landscape","portrait"].map(r=>p`<button class="small ${this.layout===r?"on":""}" @click=${()=>this.layout=r}>${r==="landscape"?d("Quer"):d("Hoch")}</button>`)}
          </span>
          ${this.layout==="portrait"?this.page?.widgets.some(r=>r.portrait)?p`<span class="hint"
                  >Eigene Hochformat-Anordnung ·
                  <button class="small" @click=${()=>this.updatePage(r=>r.widgets.forEach(o=>delete o.portrait))}>${d("Automatisch anordnen")}</button></span
                >`:p`<span class="hint">${d("Automatisch gestapelt \u2013 verschieben legt eine eigene Anordnung an")}</span>`:m}
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
          ${Object.entries(Ke).filter(([r])=>this.advanced||r!=="card").map(([r,o])=>p`<button class="chip" @click=${()=>this.addWidget(r)}>${G(o.icon)} ${d(o.name)}</button>`)}
        </div>
        ${e.templates?.widgets?.length||this.clip?p`<div class="palette">
              <span class="hint">${d("Eigene Vorlagen:")}</span>
              ${this.clip?p`<button class="chip accent" @click=${()=>this.pasteWidgets(this.clip)}>
                    Einfügen (${this.clip.length===1?Ke[this.clip[0].type]?.name??this.clip[0].type:`${this.clip.length} Widgets`})
                  </button>`:m}
              ${(e.templates?.widgets??[]).map((r,o)=>p`<span class="chip tpl">
                  <button @click=${()=>this.pasteWidgets(r.widgets)}>${r.name}</button>
                  <button
                    class="x"
                    title=${d("Vorlage l\xF6schen")}
                    @click=${()=>confirm(d("Vorlage \u201E{name}\u201C l\xF6schen?",{name:r.name}))&&this.mutate(l=>l.templates.widgets.splice(o,1))}
                  >
                    ✕
                  </button>
                </span>`)}
            </div>`:m}
        <div class="hint keys">${d("Ziehen zum Verschieben \xB7 Punkt unten rechts zum Vergr\xF6\xDFern \xB7 Pfeiltasten verschieben, mit \u21E7 Gr\xF6\xDFe \xB7 \u21E7/\u2318-Klick w\xE4hlt mehrere \xB7 \u2318C/\u2318V kopiert und f\xFCgt ein \xB7 \u232B l\xF6scht \xB7 \u2318D dupliziert \xB7 \u2318Z r\xFCckg\xE4ngig")}</div>
      </section>
      <aside class="inspector">
        ${this.selection.length>1?p`<div class="head">
                <span>${d("{n} Widgets ausgew\xE4hlt",{n:this.selection.length})}</span>
              </div>
              <p class="actions-row">
                <button class="small" @click=${()=>{this.copyWidgets()}}>${d("Kopieren")}</button>
                <button class="small" @click=${this.duplicateWidget}>${d("Duplizieren")}</button>
                <button class="small" @click=${this.saveWidgetTemplate}>${d("Als Vorlage")}</button>
                <button class="small danger" @click=${this.removeWidget}>${d("L\xF6schen")}</button>
              </p>
              <p class="hint">${d("Ziehen oder Pfeiltasten verschieben alle gemeinsam. \u21E7/\u2318-Klick nimmt eins heraus, Esc hebt die Auswahl auf.")}</p>`:s?p`<div class="head">
                <span>${G(Ke[s.type]?.icon)} ${d(Ke[s.type]?.name??s.type)}</span>
                <span>
                  ${this.advanced?p`<button class="small" @click=${()=>{this.copyWidgets()}} title=${d("Kopieren (\u2318C)")}>${d("Kopieren")}</button>
                        <button class="small" @click=${this.saveWidgetTemplate} title=${d("Als eigene Vorlage speichern")}>${d("Vorlage")}</button>`:m}
                  <button class="small" @click=${this.duplicateWidget} title=${d("Duplizieren")}>${d("Duplizieren")}</button>
                  <button class="small danger" @click=${this.removeWidget} title=${d("L\xF6schen")}>${d("L\xF6schen")}</button>
                </span>
              </div>
              <div class="pos" ?hidden=${!this.advanced}>
                ${["x","y","w","h"].map(r=>{let o=fe[this.layout],l=this.posOf(s);return p`<label
                    >${d({x:"Spalte",y:"Zeile",w:"Breite",h:"H\xF6he"}[r])}
                    <input
                      type="number"
                      min=${r==="w"||r==="h"?1:0}
                      max=${r==="x"||r==="w"?o.cols:o.rows}
                      .value=${String(l[r])}
                      @input=${c=>{let h=Number(c.target.value);Number.isFinite(h)&&this.updatePage(u=>this.setPos(u,s.id,{...l,[r]:h}),`pos-${r}-${this.layout}`)}}
                  /></label>`})}
              </div>
              ${this.form(Ll,s.options,r=>this.updateWidget(o=>o.options=r,`opt-${s.id}`),`opt-${s.id}`)}
              <h4>${d("Einstellungen")}</h4>
              ${this.form(Al[s.type]??[],s.options,r=>this.updateWidget(o=>o.options=r,`opt-${s.id}`),`opt-${s.id}`)}
              ${this.advanced?p`<h4>${d("Sichtbarkeit")}</h4>
              ${this.form([{key:"show_if",label:"Nur anzeigen wenn \u2026",type:"conditions"}],{show_if:s.show_if},r=>this.updateWidget(o=>o.show_if=r.show_if??[],`if-${s.id}`),`if-${s.id}`)}
              <h4>${d("Darstellung")}</h4>
              ${this.form(_l,{look:s.look},r=>this.updateWidget(o=>{r.look&&Object.keys(r.look).length?o.look=r.look:delete o.look},`look-${s.id}`),`look-${s.id}`)}
              <h4>${d("Antippen")}</h4>
              ${this.form(Cl,{tap_action:s.tap_action,hold_action:s.hold_action},r=>this.updateWidget(o=>{for(let l of["tap_action","hold_action"])r[l]?.action?o[l]=r[l]:delete o[l]},`act-${s.id}`),`act-${s.id}`)}`:p`<p class="hint">${d("Bedingungen, Darstellung und Aktionen beim Antippen gibt es im Modus \u201EErweitert\u201C (oben rechts).")}</p>`}`:this.page?p`<div class="head">
                  <span>${d("Seite")}</span>
                  <span>
                    ${this.advanced?p`<button class="small" @click=${()=>{this.exportPage()}} title=${d("Als YAML kopieren")}>${d("Exportieren")}</button>
                          <button class="small" @click=${this.savePageTemplate} title=${d("Als eigene Seitenvorlage speichern")}>${d("Vorlage")}</button>`:m}
                    <button class="small" @click=${this.duplicatePage}>${d("Duplizieren")}</button>
                    <button class="small danger" @click=${this.removePage}>${d("L\xF6schen")}</button>
                  </span>
                </div>
                ${this.form(Ml,this.page,r=>this.updatePage(o=>Object.assign(o,r,{widgets:o.widgets,id:o.id}),`page-${this.pageId}`),`page-${this.pageId}`)}
                <p class="hint">${d("Tipp: Ein Widget anklicken, um es zu bearbeiten.")}</p>`:p`<p class="hint">${d("Noch keine Seite \u2013 oben \u201E+ Neu\u201C.")}</p>`}
      </aside>
    </div>`}renderDevices(e){let n=this.devices[e],a=r=>this.draft?.pages.find(o=>o.id===r)?.name??r??"\u2013",s=r=>{if(!r)return d("nie");let o=Math.round((Date.now()-new Date(r).getTime())/1e3);return o<60?d("gerade eben"):o<3600?d("vor {n} min",{n:Math.round(o/60)}):d("vor {n} h",{n:Math.round(o/3600)})};return n?.clients.length?p`<div class="devices">
      ${n.clients.map(r=>p`<div class="device">
          <span class="dot ${r.hidden?"sleep":"on"}"></span>
          <span class="dname">${r.name}</span>
          <span class="dmeta"
            >${r.safe?`${d("Notfallmodus")} (${d(r.safe)})`:r.hidden?d("Bildschirm aus"):a(r.page)} · ${s(r.last_seen)}${r.version&&r.version!=="2026-10-22T05:18:52.149Z"?` \xB7 ${d("\xE4ltere Version")}`:""}</span
          >
        </div>`)}
      ${n.paused?p`<p class="hint">${d("Pausiert")}${n.until?` ${d("bis {when}",{when:new Date(n.until).toLocaleTimeString(te(),{hour:"2-digit",minute:"2-digit"})})}`:""}.</p>`:m}
    </div>`:p`<p class="hint">${d("Gerade ist kein Ger\xE4t mit diesem Display verbunden")}${n?.last_seen?` (${d("zuletzt {time}",{time:s(n.last_seen)})})`:""}.</p>`}renderPlayback(){let e=this.draft,n=e.displays.find(l=>l.id===this.displayId);if(!n)return p`<p class="hint">${d("Kein Display.")}</p>`;let a=e.displays.indexOf(n),s=(l,c="")=>this.mutate(h=>l(h.displays[a]),c),r=(l,c)=>s(h=>{let[u]=h.playlist.splice(l,1);h.playlist.splice(l+c,0,u)}),o=`${location.origin}/ambiframe-display?display=${encodeURIComponent(n.id)}`;return p`<div class="two">
      <section>
        <div class="row-head">
          ${e.displays.length>1?p`<select @change=${l=>this.displayId=l.target.value}>
                ${e.displays.map(l=>p`<option value=${l.id} ?selected=${l.id===this.displayId}>${l.name}</option>`)}
              </select>`:p`<h3>${n.name}</h3>`}
          <button class="small" @click=${()=>this.wizard="display"}>+ ${d("Display")}</button>
          <button
            class="small"
            ?hidden=${!this.advanced}
            title=${d("Dieses Display mit allen Einstellungen kopieren")}
            @click=${()=>{let l=ze("display",e.displays.map(c=>c.id));this.mutate(c=>c.displays.push({...Ee(n),id:l,name:`${n.name} (${d("Kopie")})`})),this.displayId=l}}
          >
            ${d("Kopieren")}
          </button>
        </div>
        <h4>${d("Wiedergabeliste")}</h4>
        <div class="playlist">
          ${n.playlist.map((l,c)=>p`<div class="pl">
              <span class="num">${c+1}</span>
              <select @change=${h=>s(u=>u.playlist[c].page=h.target.value)}>
                ${e.pages.map(h=>p`<option value=${h.id} ?selected=${h.id===l.page}>${h.name}</option>`)}
              </select>
              <input
                type="number"
                min="3"
                placeholder=${String(e.pages.find(h=>h.id===l.page)?.duration??30)}
                .value=${l.duration!=null?String(l.duration):""}
                title=${d("Dauer in Sekunden (leer = Seitendauer)")}
                @input=${h=>{let u=h.target.value;s(f=>{u?f.playlist[c].duration=Number(u):delete f.playlist[c].duration},`pl-${c}`)}}
              />
              <span class="tools">
                <button
                  ?hidden=${!this.advanced&&!l.show_if?.length}
                  class="small ${l.show_if?.length?"cond":""}"
                  title=${l.show_if?.length?l.show_if.map(h=>Cs(h)).join(" \xB7 "):d("Nur zu bestimmten Zeiten oder Bedingungen zeigen")}
                  @click=${()=>{let h=new Set(this.plOpen);h.has(c)?h.delete(c):h.add(c),this.plOpen=h}}
                >
                  ${l.show_if?.length?d("bedingt"):d("Wann?")}
                </button>
                <button class="small" ?disabled=${c===0} @click=${()=>r(c,-1)}>↑</button>
                <button class="small" ?disabled=${c===n.playlist.length-1} @click=${()=>r(c,1)}>↓</button>
                <button class="small" ?disabled=${n.playlist.length===1} @click=${()=>s(h=>h.playlist.splice(c,1))}>✕</button>
              </span>
            </div>
            ${this.plOpen.has(c)?p`<div class="pl-cond">
                  ${this.form([{key:"show_if",label:"Diesen Eintrag nur zeigen, wenn \u2026",type:"conditions",help:"Z. B. Uhrzeit 05:00\u201311:00 f\xFCr eine Morgen-Seite. Zus\xE4tzlich gilt die Bedingung der Seite selbst."}],{show_if:l.show_if},h=>s(u=>{h.show_if?.length?u.playlist[c].show_if=h.show_if:delete u.playlist[c].show_if},`pl-if-${n.id}-${c}`),`pl-if-${n.id}-${c}`)}
                </div>`:m}`)}
          <button class="small dashed" @click=${()=>s(l=>l.playlist.push({page:e.pages[0]?.id??""}))}>+ ${d("Seite in die Wiedergabe")}</button>
        </div>
        <h4>${d("Display")}</h4>
        ${this.form(Dl(e),n,l=>s(c=>Object.assign(c,l,{id:c.id,playlist:c.playlist}),`disp-${n.id}`),`disp-${n.id}`)}
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
        ${this.form(zl,n,l=>s(c=>Object.assign(c,{design:l.design}),`disp-design-${n.id}`),`disp-design-${n.id}`)}
        <h4>${d("T\xF6ne")}</h4>
        ${this.form(Pl,n,l=>s(c=>Object.assign(c,{sound:l.sound}),`disp-sound-${n.id}`),`disp-sound-${n.id}`)}
        <h4>${d("Videostream")}</h4>
        ${this.form(Il,n,l=>s(c=>Object.assign(c,{stream:l.stream}),`disp-stream-${n.id}`),`disp-stream-${n.id}`)}
        ${n.stream?.enabled?p`<p class="hint">${d(n.stream.resolution==="both"?"Kameras \u201EAmbiframe {name} Videostream\u201C (4K) und \u201E\u2026 Videostream Full HD\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.":"Kamera \u201EAmbiframe {name} Videostream\u201C \u2013 im Dashboard, in Apple Home (HomeKit-Bridge) oder per \u201Ecamera.play_stream\u201C auf dem Apple TV.",{name:n.name})}</p>`:m}
        <h4>${d("Fotos")}</h4>
        ${this.form(Os,n,l=>s(c=>Object.assign(c,{photos:l.photos}),`disp-photos-${n.id}`),`disp-photos-${n.id}`)}
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
    </div>`}renderEvents(){let e=this.draft,n=e.events.find(s=>s.id===this.eventId),a=n?e.events.indexOf(n):-1;return p`<div class="two">
      <section>
        <div class="row-head">
          <h3>${d("Ereignisse")}</h3>
          <span class="rel">
            <button class="small" @click=${()=>this.menu=this.menu==="event"?"":"event"}>${d("+ Neu")}</button>
            ${this.menu==="event"?p`<div class="menu">
                  ${ua.map(s=>p`<button
                      @click=${()=>{let r=ze(oi(d(s.name).split(" ")[0]),e.events.map(o=>o.id));this.mutate(o=>o.events.push({id:r,...s.build(this.hass,o)})),this.eventId=r,this.menu=""}}
                    >
                      ${d(s.name)}
                    </button>`)}
                </div>`:m}
          </span>
        </div>
        ${e.events.map(s=>{let r=Ps.find(c=>c.id===s.kind),o=[s.entity,...s.entities??[]].filter(Boolean),l=s.kind==="page"?` \u2192 ${e.pages.find(c=>c.id===s.page)?.name??d("keine Seite")}`:"";return p`<button class="entry ${s.id===this.eventId?"on":""} ${s.enabled===!1?"off":""}" @click=${()=>this.eventId=s.id}>
            <span class="name">${G(s.icon??r?.icon)} ${s.name??s.title}</span>
            <span class="meta"
              >${r?d(r.short):s.kind}${l} · ${o[0]??d("kein Ausl\xF6ser")}${o.length>1?` +${o.length-1}`:""}${s.enabled===!1?` \xB7 ${d("aus")}`:""}</span
            >
          </button>`})}
        <h4>${d("Testen")}</h4>
        <div class="preview small"><af-display preview .hass=${this.hass} .config=${e} display-id=${this.displayId}></af-display></div>
      </section>
      <section>
        ${n?p`<div class="row-head">
                <h3>${n.name??n.title}</h3>
                <span>
                  <button class="small" @click=${()=>this.renderRoot.querySelector(".preview.small af-display")?.testEvent(n.id)}>▶ Testen</button>
                  <button class="small danger" @click=${()=>confirm(d("Ereignis \u201E{name}\u201C l\xF6schen?",{name:n.name??n.title}))&&this.mutate(s=>s.events.splice(a,1))}>${d("L\xF6schen")}</button>
                </span>
              </div>
              ${this.form(Nl(e),n,s=>this.mutate(r=>r.events[a]={...s,id:n.id},`ev-${n.id}`),`ev-${n.id}`)}`:p`<p class="hint">${d("Noch keine Ereignisse \u2013 oben \u201E+ Neu\u201C.")}</p>`}
      </section>
    </div>`}renderDesign(){let e=this.draft,n=this.designScope?e.displays.find(a=>a.id===this.designScope):void 0;return this.designScope&&!n&&(this.designScope=""),n?this.renderDisplayDesign(n):this.renderAllDesign()}renderDesignScope(){let e=this.draft;return e.displays.length<2&&!this.designScope?m:p`<div class="scope">
      <span class="hint">${d("Gilt f\xFCr")}</span>
      <span class="seg">
        <button class="small ${this.designScope?"":"on"}" @click=${()=>this.designScope=""}>${d("Alle Displays")}</button>
        ${e.displays.map(n=>p`<button class="small ${this.designScope===n.id?"on":""}" @click=${()=>this.designScope=n.id}>${n.name}</button>`)}
      </span>
    </div>`}renderThemeCards(e,n,a,s){let r=this.draft,o=r.displays[0]?.playlist.map(l=>r.pages.find(c=>c.id===l.page)).find(l=>l&&l.background?.type!=="photo")?.id??r.pages[0]?.id;return p`<div class="row-head">
        <h3>${d("Stil")}</h3>
        <span class="seg" title=${d("Hell/Dunkel")}>
          ${[...s.inherit?[[void 0,"wie alle"]]:[],["auto","Automatisch"],["light","Hell"],["dark","Dunkel"]].map(([l,c])=>p`<button class="small ${s.value===l?"on":""}" @click=${()=>s.set(l)}>${d(c)}</button>`)}
        </span>
      </div>
      <div class="themes">
        ${ct.map(l=>{let{cfg:c,id:h}=a(l.id);return p`<button class="theme ${e===l.id?"on":""}" @click=${()=>n(l.id)}>
            <div class="mini">
              <af-display preview .hass=${this.hass} .config=${c} display-id=${h??""} .fixedPage=${o}></af-display>
            </div>
            <div class="tname">${d(l.name)}</div>
            <div class="hint">${d(l.hint)}</div>
          </button>`})}
      </div>`}renderDisplayDesign(e){let n=this.draft,a=n.displays.indexOf(e),s={design:{...Ee(e.design??{}),mode:e.mode,text_size:e.text_size,contrast:e.contrast,transition:e.transition},photos:Ee(e.photos??{})},r=l=>this.mutate(c=>{let h=c.displays[a],{mode:u,text_size:f,contrast:b,transition:g,theme:v,...S}=l.design??{},I=(A,P)=>{let $=Wl(P);$===void 0?delete h[A]:h[A]=$};I("mode",u),I("text_size",f),I("contrast",b),I("transition",g),I("design",S),l.photos&&I("photos",l.photos)},`design-${e.id}`),o=Pu;return p`${this.renderDesignScope()}
      <p class="hint">${d("F\xFCr \u201E{name}\u201C gestalten: Was hier eingestellt ist, gilt nur f\xFCr dieses Display. Leer = wie bei allen Displays.",{name:e.name})}</p>
      ${this.renderThemeCards(e.theme??n.design.theme,l=>this.mutate(c=>c.displays[a].theme=l),l=>({cfg:{...n,displays:n.displays.map(c=>c.id===e.id?{...c,theme:l}:c)},id:e.id}),{value:e.mode,inherit:!0,set:l=>this.mutate(c=>{l===void 0?delete c.displays[a].mode:c.displays[a].mode=l})})}
      ${e.theme?p`<p class="hint"><button class="small" @click=${()=>this.mutate(l=>delete l.displays[a].theme)}>${d("Stil wie alle Displays")}</button></p>`:m}
      <div class="cols">
        <section class="narrow">
          <h3>${d("Hell/Dunkel & Schrift")}</h3>
          ${this.form(o(Fs),s,r,`ddesign-look-${e.id}`)}
        </section>
        ${this.advanced?p`<section class="narrow">
                <h3>${d("Eigene Farben \xB7 Dunkel")}</h3>
                ${this.form(Ui("dark"),s,r,`ddesign-dark-${e.id}`)}
              </section>
              <section class="narrow">
                <h3>${d("Eigene Farben \xB7 Hell")}</h3>
                ${this.form(Ui("light"),s,r,`ddesign-light-${e.id}`)}
              </section>
              <section class="narrow">
                <h3>${d("Form & CSS")}</h3>
                ${this.form(o(Is),s,r,`ddesign-shape-${e.id}`)}
              </section>`:m}
        <section class="narrow">
          <h3>${d("Bewegung")}</h3>
          ${this.form(o(Bs),s,r,`ddesign-motion-${e.id}`)}
        </section>
        <section class="narrow">
          <h3>${d("Fotos")}</h3>
          ${this.form(Os,s,r,`ddesign-photos-${e.id}`)}
        </section>
      </div>
      <p class="hint">
        <button
          class="small"
          @click=${()=>this.mutate(l=>{let c=l.displays[a];for(let h of["theme","mode","text_size","contrast","transition","design","photos"])delete c[h]})}
        >
          ${d("Alle Abweichungen dieses Displays zur\xFCcksetzen")}
        </button>
      </p>`}renderAllDesign(){let e=this.draft,n=a=>this.mutate(s=>Object.assign(s,{design:a.design??s.design,photos:a.photos??s.photos}),"design");return p`${this.renderDesignScope()}
      ${this.renderThemeCards(e.design.theme,a=>this.mutate(s=>s.design.theme=a),a=>({cfg:{...e,design:{...e.design,theme:a}}}),{value:e.design.mode??"auto",set:a=>this.mutate(s=>s.design.mode=a??"auto")})}
      <div class="cols">
        <section class="narrow">
          <h3>${d("Hell/Dunkel & Schrift")}</h3>
          ${this.form(Fs,e,n,"design-look")}
        </section>
        ${this.advanced?p`<section class="narrow">
          <h3>${d("Eigene Farben \xB7 Dunkel")}</h3>
          ${this.form(Ui("dark"),e,n,"design-colors-dark")}
        </section>
        <section class="narrow">
          <h3>${d("Eigene Farben \xB7 Hell")}</h3>
          ${this.form(Ui("light"),e,n,"design-colors-light")}
          ${e.design.colors?p`<p class="hint"><button class="small" @click=${()=>this.mutate(a=>delete a.design.colors)}>${d("Eigene Farben zur\xFCcksetzen")}</button></p>`:m}
        </section>
        <section class="narrow">
          <h3>${d("Form & CSS")}</h3>
          ${this.form(Is,e,n,"design-shape")}
        </section>
        <section class="narrow">
          <h3>${d("Eigene Stile")}</h3>
          ${this.renderPresets()}
        </section>`:m}
        <section class="narrow">
          <h3>${d("Bewegung")}</h3>
          ${this.form(Bs,e,n,"design-motion")}
        </section>
        <section class="narrow">
          <h3>${d("Fotos")}</h3>
          ${this.form(Fl,e,a=>this.mutate(s=>Object.assign(s,{photos:a.photos??s.photos}),"design"),"design-photos")}
        </section>
        <section class="narrow">
          <h3>${d("KI-Zusammenfassung")}</h3>
          ${this.form(Ol,e,a=>this.mutate(s=>Object.assign(s,{summary:a.summary}),"design"),"design-summary")}
          ${e.summary?.enabled?p`<p class="hint">
                <button class="small" ?disabled=${this.summaryBusy} @click=${()=>{this.generateSummary()}}>
                  ${this.summaryBusy?d("Gemini schreibt \u2026"):d("Jetzt erstellen")}
                </button>
                ${this.summaryNote}
              </p>`:m}
        </section>
      </div>`}renderPresets(){let e=this.draft,n=e.design.presets??[],a=()=>{let{presets:r,...o}=Ee(e.design);return o},s=r=>this.mutate(o=>{let{presets:l,...c}=r;o.design={...Ee(c),presets:o.design.presets}});return p`${n.length?p`<div class="presets">
            ${n.map((r,o)=>p`<div class="preset">
                <span>${r.name}</span>
                <button class="small" @click=${()=>s(r.design)}>${d("Anwenden")}</button>
                <button class="small" title=${d("L\xF6schen")} @click=${()=>this.mutate(l=>l.design.presets.splice(o,1))}>✕</button>
              </div>`)}
          </div>`:p`<p class="hint">${d("Noch keine eigenen Stile \u2013 stelle Stil, Farben und Schriften ein und speichere sie hier.")}</p>`}
      <div class="preset-new">
        <input placeholder=${d("Name, z. B. Herbst")} .value=${this.presetName} @input=${r=>this.presetName=r.target.value} />
        <button
          class="small"
          ?disabled=${!this.presetName.trim()}
          @click=${()=>{let r=this.presetName.trim();this.mutate(o=>{let l=o.design.presets??=[],c=l.find(h=>h.name===r);c?c.design=a():l.push({name:r,design:a()})}),this.presetName=""}}
        >
          ${d("Aktuellen Stil speichern")}
        </button>
      </div>
      <p class="hint">
        <button
          class="small"
          @click=${async()=>{let r=gt({ambiframe_style:a()},{lineWidth:120});try{await navigator.clipboard.writeText(r),this.message={kind:"ok",text:d("Stil als YAML in die Zwischenablage kopiert.")}}catch{this.importText=r,this.message={kind:"ok",text:d("Stil unten als YAML \u2013 zum Kopieren markieren.")}}}}
        >
          ${d("Exportieren")}
        </button>
        <button class="small" @click=${()=>this.importText=this.importText===null?"":null}>Importieren …</button>
      </p>
      ${this.importText!==null?p`<textarea
              class="code import"
              rows="8"
              placeholder="ambiframe_style: …"
              .value=${this.importText}
              @input=${r=>this.importText=r.target.value}
            ></textarea>
            <p class="hint">
              <button
                class="small"
                @click=${()=>{try{let r=Lt(this.importText??""),o=r?.ambiframe_style??r?.design??r;if(!o||typeof o!="object"||Array.isArray(o))throw new Error(d("kein Stil gefunden"));s(o),this.importText=null,this.message={kind:"ok",text:d("Stil \xFCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.")}}catch(r){this.message={kind:"error",text:d("Import fehlgeschlagen: {error}",{error:String(r?.message??r)})}}}}
              >
                ${d("\xDCbernehmen")}
              </button>
            </p>`:m}`}renderYaml(){return!this.yaml&&this.draft&&(this.yaml=ma(this.draft)),p`<div class="yaml">
      <textarea spellcheck="false" .value=${this.yaml} @input=${e=>this.yaml=e.target.value}></textarea>
      <div class="actions">
        <button
          class="primary"
          @click=${()=>{try{let e=Lt(this.yaml);this.mutate(n=>Object.assign(n,e)),this.message={kind:"ok",text:d("\xDCbernommen \u2013 mit \u201ESpeichern\u201C dauerhaft machen.")}}catch(e){this.message={kind:"error",text:d("YAML ist nicht lesbar: {error}",{error:e.message})}}}}
        >
          ${d("In den Editor \xFCbernehmen")}
        </button>
        <button @click=${()=>this.yaml=ma(this.draft)}>${d("Neu laden")}</button>
        <span class="spacer"></span>
        <button
          @click=${async()=>{let e=await this.hass?.callWS({type:"ambiframe/config/default"});e&&(this.yaml=ma(e))}}
        >
          ${d("Startkonfiguration anzeigen")}
        </button>
        <button
          title=${d("Die Fassung vor dem letzten Speichern in den Editor holen (danach \u201ESpeichern\u201C)")}
          @click=${async()=>{let e=await this.hass?.callWS({type:"ambiframe/config/previous"}).catch(()=>null);if(!e){this.message={kind:"error",text:d("Es gibt noch keine vorherige Fassung.")};return}this.yaml=ma(e),this.message={kind:"ok",text:d("Vorherige Fassung geladen \u2013 mit \u201EIn den Editor \xFCbernehmen\u201C und \u201ESpeichern\u201C wiederherstellen.")}}}
        >
          ${d("Vorherige Fassung laden")}
        </button>
      </div>
    </div>`}async checkPhotos(){let e=this.hass,n=this.draft?.photos;if(!e||!n)return;let a=null,s=null;if(n.folder)try{a=((await e.callWS({type:"media_source/browse_media",media_content_id:n.folder})).children??[]).filter(o=>o.media_class==="image"||/\.(jpe?g|png|webp|avif)$/i.test(o.title)).length}catch{a=0}if(n.icloud)try{s=(await e.callWS({type:"ambiframe/photos/icloud",url:n.icloud})).length}catch{s=0}this.photoHealth={folder:a,icloud:s}}goTo(e){e&&(this.healthOpen=!1,this.tab=e.tab,e.pageId&&(this.pageId=e.pageId),this.widgetId=e.widgetId??(e.pageId?null:this.widgetId),e.eventId&&(this.eventId=e.eventId),e.displayId&&(this.displayId=e.displayId))}renderHealthButton(){if(!this.draft)return m;let e=Ws(this.draft,this.hass,this.devices,this.photoHealth,"2026-10-22T05:18:52.149Z"),n=e.filter(s=>s.level!=="info").length,a=e.some(s=>s.level==="error");return p`<button
      class="health ${a?"bad":n?"warn":"ok"}"
      title=${d("Gesundheitscheck: fehlende Entit\xE4ten, Ger\xE4te, Fotos")}
      @click=${()=>{this.healthOpen=!this.healthOpen,this.healthOpen&&this.checkPhotos()}}
    >
      ${G(n?"warning":"check")}<span>${n?n===1?d("1 Hinweis"):d("{n} Hinweise",{n}):d("Alles gut")}</span>
    </button>`}renderHealth(){if(!this.healthOpen||!this.draft)return m;let e=Ws(this.draft,this.hass,this.devices,this.photoHealth,"2026-10-22T05:18:52.149Z"),n={error:"warning",warn:"info",info:"info"};return p`<div class="healthpanel">
      <div class="hhead">
        <h3>${d("Gesundheitscheck")}</h3>
        <button class="icon" title=${d("Schlie\xDFen")} @click=${()=>this.healthOpen=!1}>✕</button>
      </div>
      ${e.length?p`<ul>
            ${e.map(a=>p`<li class=${a.level}>
                ${G(n[a.level])}<span class="htext">${a.text}</span>
                ${a.go?p`<button class="small" @click=${()=>this.goTo(a.go)}>${d("Zeigen")}</button>`:m}
              </li>`)}
          </ul>`:p`<p class="hint">${G("check")} ${d("Alles in Ordnung: alle Entit\xE4ten da, Ger\xE4te verbunden, Fotos vorhanden.")}</p>`}
      ${this.photoHealth===void 0?p`<p class="hint">${d("Fotos werden gez\xE4hlt \u2026")}</p>`:m}
    </div>`}renderWizard(){let e=this.draft,n=this.wizard||(e?.setup_complete===!1&&!this.wizardSkipped?"first":"");return!e||!n?m:p`<af-wizard
      .hass=${this.hass}
      .config=${e}
      mode=${n}
      @wizard-done=${a=>{this.mutate(s=>Object.assign(s,a.detail.config)),this.displayId=a.detail.displayId,this.tab="wiedergabe",this.wizard="",this.save()}}
      @wizard-close=${()=>{this.wizard="",n==="first"&&(this.wizardSkipped=!0,this.mutate(a=>a.setup_complete=!0),this.save())}}
    ></af-wizard>`}render(){Ot(Pt(this.draft?.design.language,this.hass?.language)),this.draft&&(Mt.displays=this.draft.displays.map(a=>[a.id,a.name]),Mt.pages=this.draft.pages.map(a=>[a.id,a.name]));let n=[["seiten","Seiten"],["wiedergabe","Wiedergabe"],["ereignisse","Ereignisse"],["design","Design"],["yaml","YAML"]].filter(([a])=>this.advanced||a!=="yaml");return p`
      <div class="toolbar">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Ambiframe</div>
        <nav>
          ${n.map(([a,s])=>p`<button
              class="tab ${this.tab===a?"on":""}"
              @click=${()=>{this.tab=a,this.menu="",a==="yaml"&&(this.yaml="")}}
            >
              ${d(s)}
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
      ${this.message?p`<div class="msg ${this.message.kind}" @click=${()=>this.message=null}>${this.message.text}</div>`:m}
      ${this.dirty||this.saving?p`<div class="savebar">
            <button ?disabled=${!this.dirty} @click=${this.discard}>${d("Verwerfen")}</button>
            <button class="primary" ?disabled=${!this.dirty||this.saving} @click=${this.save}>${this.saving?d("Speichert \u2026"):d("Speichern")}</button>
          </div>`:m}
      ${this.renderWizard()} ${this.renderHealth()}
      <main>
        ${this.draft?this.tab==="seiten"?this.renderPages():this.tab==="wiedergabe"?this.renderPlayback():this.tab==="ereignisse"?this.renderEvents():this.tab==="design"?this.renderDesign():this.renderYaml():p`<p class="hint">${d("L\xE4dt \u2026")}</p>`}
      </main>
    `}};ji.properties={hass:{attribute:!1},narrow:{attribute:!1},route:{attribute:!1},panel:{attribute:!1},saved:{state:!0},draft:{state:!0},tab:{state:!0},pageId:{state:!0},widgetId:{state:!0},eventId:{state:!0},displayId:{state:!0},message:{state:!0},saving:{state:!0},yaml:{state:!0},menu:{state:!0},summaryBusy:{state:!0},summaryNote:{state:!0},devices:{state:!0},layout:{state:!0},plOpen:{state:!0},multi:{state:!0},clip:{state:!0},pageImport:{state:!0},advanced:{state:!0},importText:{state:!0},presetName:{state:!0},wizard:{state:!0},healthOpen:{state:!0},designScope:{state:!0},photoHealth:{state:!0}},ji.styles=O`
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
  `;F("ambiframe-panel",ji);Ys();
