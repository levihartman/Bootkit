/* Bootkit by Levi hartman.
Version 1.1.1. All Rights saved. 
Must Read LICENSE.txt Before Using. */

//Elements Selector Function
function $(e) {
	    //if The selector is document, return another object
    	if (e == document) {
    	a = {};
	    a.ready = function(fn) {document.addEventListener('DOMContentLoaded', fn)};
	}
	else {
	a = {
		text: document.querySelector(e).innerText,
		html: document.querySelector(e).innerHTML,
		hide: function() {document.querySelector(e).style.display = "none"},
		show: function() {document.querySelector(e).style.display = ''},
		on: function(o,f) {
				document.querySelector(e).addEventListener(o, f);
		},
		fadeIn: function(el) {
        var opacity = 0;
        el.style.opacity = 0;
        el.style.filter = '';
        var last = +new Date();
        var tick = function() {
        opacity += (new Date() - last) / 400;
        el.style.opacity = opacity;
        el.style.filter = 'alpha(opacity=' + (100 * opacity)|0 + ')';
        last = +new Date();
        if (opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
        };
        tick();
        },
		addClass: function() {
		    if (e.classList)
                e.classList.add(className);
            else
                e.className += ' ' + className;
		},
		empty: function() {e.innerHTML = ''},
		toggle: function toggle(d) {
			if (!d) {
				var dis = "block";
			}
			else {
				var dis = d;
			}
	        el = document.querySelector(e);
	        if (el.style.display != "none") {
		        el.style.display = "none";
	        }
	        else {
		        el.style.display = dis;
	        }
        },
		remove: function() {
			var a1 = document.querySelector(e);
            a1.parentNode.removeChild(a1);
		}
	}
	}
	return a;
}
$.cookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
$.createCookie = function(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
$.deleteCookie = function(c) {
	$.createCookie(c,"",-1);
}

$.encodeQueryString = function(obj) {
  return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&')
}
$.convert={};$.user={};$.fn={};
$.post=function(url, callback,data,error) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(this.responseText);
		}
	};
	xmlhttp.onerror = error;
	xmlhttp.open("POST",url.toString(),true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send($.encodeQueryString(data));
	xmlhttp = null;
};
$.get = function(url, c) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState==4 && this.status == 200) {
            c(this.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
document.lock = function(t) {
			setInterval(function() {
				if (document.querySelector('html').innerHTML != t) {
					document.querySelector('html').innerHTML = t;
				}
			},100)
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
$.msg = function(msg) {
    var a = document.createElement('DIV');
    var b = document.createTextNode(msg);
    a.appendChild(b);
    a.id = "bootkit-msg";
    document.body.appendChild(a);
    var x = document.getElementById("bootkit-msg");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
$.includeHTML = function() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          elmnt.innerHTML = this.responseText;
          elmnt.removeAttribute("include");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  }
}
$.includeHTML();
$.rightclickDisabled = function() {
if (window.Event) document.captureEvents(Event.MOUSEUP);function nocontextmenu() {event.cancelBubble = true; event.returnValue = false;return false;}function norightclick(e) {if (window.Event){if (e.which == 2 || e.which == 3)return false;}else if (event.button == 2 || event.button == 3) {event.cancelBubble = true
event.returnValue = false;return false;}}document.oncontextmenu = nocontextmenu;document.onmousedown = norightclick; }
$.download = function(mime,filename,data) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:'+mime+';charset=utf-8,' + encodeURIComponent(data));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
//Tools
$.convert.text_to_binary = function(txt) {
			var bin,a,b;
			len = txt.length;
			if (len==0) return;
			bin='';
			for(i=0; i<len; i++) {
				a = txt.charCodeAt(i);
				b = a.toString(2);
				if (b.length<8) b='0'+b;
				if (b.length<8) b='0'+b;
				if (b.length<8) b='0'+b;
				bin += b;
			}
			return bin;
}
$.convert.binary_to_text = function(bin) {
			bin = bin.match(/[0-1]{1,8}/g);
			if (!bin) return;
			len = bin.length;
			if (len==0) return;
			txt='';
			for(i=0; i<len; i++) {
				b = bin[i];
				code = parseInt(b,2);
				t = String.fromCharCode(code);
				txt += t;
			}
			return txt;
}
$.convert.text_to_hex = function(txt) {
			len = txt.length;
			if (len==0) return;
			hex='';
			for(i=0; i<len; i++) {
				a = txt.charCodeAt(i);
				h = a.toString(16);
				if( h.length==1 ) h='0'+h;
				hex += h;
			}
			return hex.toUpperCase();
}
$.convert.hex_to_text = function(hex) {
			hex = hex.match(/[0-9A-Fa-f]{2}/g);
			len = hex.length;
			if( len==0 ) return;
			txt='';
			for(i=0; i<len; i++) {
				h = hex[i];
				code = parseInt(h,16);
				t = String.fromCharCode(code);
				txt += t;
			}
			return txt;
}
$.convert.image = function(event, img, fileElem) {
		var width,height;
		img = document.querySelector(img);
		fileElem = document.querySelector(fileElem);
		fileElem = fileElem.files[0];
		var reader = new FileReader();
		reader.onload = function(event) {
			img.src = event.target.result;
			img.onload = function(event) {
			img.title = fileElem.name;
			width = img.width;
			height = img.height;
			if( img.width>200 )
			img.width=200;
		    };
   		};
		reader.readAsDataURL(fileElem);	
			img.onload = function(event) {
				width = img.width;
				height = img.height;
			};
		return img.src
}
$.checkPassword = function(pass) {
    var score = 0;
    if (!pass)
        return score;

    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}
$.lock = function (n, r) {
	Object.defineProperty("window", n, {
    value: r,
    writable : false,
    enumerable : true,
    configurable : false
    });
}
/*
**User Agent By Levi Hartman
**All Rights Saved
*/
//User Agent
$.fn.userAgent = function() {
$.user.adBlock = function () {
var adBlockEnabled = false;
var testAd = document.createElement('div');
testAd.innerHTML = '&nbsp;';
testAd.className = 'adsbox';
document.body.appendChild(testAd);
  if (testAd.offsetHeight === 0) {
    adBlockEnabled = true;
  }
  testAd.remove();
  return adBlockEnabled;
}
var nVer=navigator.appVersion.toLowerCase();var nAgt=navigator.userAgent.toLowerCase();;var browserName=navigator.appName.toLowerCase();var fullVersion=''+parseFloat(navigator.appVersion);var majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;if((verOffset=nAgt.indexOf("opr/"))!=-1) {browserName="Opera";fullVersion=nAgt.substring(verOffset+4);}else if ((verOffset=nAgt.indexOf("opera"))!=-1) {browserName = "Opera";fullVersion = nAgt.substring(verOffset+6);if ((verOffset=nAgt.indexOf("version"))!=-1)fullVersion = nAgt.substring(verOffset+8);}else if ((verOffset=nAgt.indexOf("msie"))!=-1) {browserName = "Internet Explorer";fullVersion = nAgt.substring(verOffset+5);}else if ((verOffset=nAgt.indexOf("chrome"))!=-1) {browserName = "Chrome";fullVersion = nAgt.substring(verOffset+7);}else if ((verOffset=nAgt.indexOf("safari"))!=-1) {browserName = "Safari";fullVersion = nAgt.substring(verOffset+7);if ((verOffset=nAgt.indexOf("version"))!=-1)fullVersion = nAgt.substring(verOffset+8);}else if ((verOffset=nAgt.indexOf("firefox"))!=-1) {browserName = "Firefox";fullVersion = nAgt.substring(verOffset+8);}else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {browserName = nAgt.substring(nameOffset,verOffset);fullVersion=nAgt.substring(verOffset+1);if (browserName.toLowerCase()==browserName.toUpperCase()) {browserName = navigator.appName;}}if ((ix=fullVersion.indexOf(";"))!=-1)fullVersion=fullVersion.substring(0,ix);if ((ix=fullVersion.indexOf(" "))!=-1)fullVersion=fullVersion.substring(0,ix);majorVersion = parseInt(''+fullVersion,10);if (isNaN(majorVersion)) {fullVersion  = ''+parseFloat(navigator.appVersion);majorVersion =parseInt(navigator.appVersion,10);}if ((verOffset=nAgt.indexOf("edge"))!=-1) {browserName="Edge";}if((verOffset=nAgt.indexOf("fxios"))!=-1) {browserName="Firefox"}var ua = window.navigator.userAgent.toLowerCase();var OS="Unknown";if (ua.indexOf("windows nt 10.0")!= -1) OS="Windows 10";if (ua.indexOf("windows nt 6.3") != -1) OS="Windows 8.1";if (ua.indexOf("windows nt 6.2") != -1) OS="Windows 8";if (ua.indexOf("windows nt 6.1") != -1) OS="Windows 7";if (ua.indexOf("windows nt 6.0") != -1) OS="Windows Vista";if (ua.indexOf("windows nt 5.2") != -1) OS="Windows Server 2003";if (ua.indexOf("windows nt 5.1") != -1) OS="Windows XP";if (ua.indexOf("windows nt 5.0") != -1) OS="Windows 2000";if (ua.indexOf("win 9x 4.90") != -1) OS="Windows ME";if (ua.indexOf("android") != -1) OS="Android";if (ua.indexOf("iphone") != -1) OS="iphone/ios";if (ua.indexOf("ipad") != -1) OS="ipad/ios";if (ua.indexOf("ipod") != -1) OS="ipod/ios";if (ua.indexOf("mac") != -1) OS="mac/ios";if (ua.indexOf("x11")!= -1) OS="Unix";if (ua.indexOf("linux")!= -1) OS="Linux"; if (ua.indexOf("windows phone")!=-1) {OS="Windows Phone";}if(ua.indexOf("xbox")!=-1) {OS="Xbox"}if (ua.indexOf("android")!=-1) {if (ua.indexOf("android") < ua.indexOf("linux")) {OS="Android";}}if (ua.indexOf("android")!=-1 && ua.indexOf("linux")!=-1) {OS="Android";}if (ua.indexOf('iphone') != -1) {if (ua.indexOf('iphone') < ua.indexOf('mac')) {OS="iPhone/iOS";}}if (ua.indexOf('ipad') != -1) {if (ua.indexOf('ipad') < ua.indexOf("mac")) {OS="iPad/iOS";}}if (ua.indexOf("bb10")!=-1) {OS="BlackBerry 10";}
var systemType = "Unknown";if (ua.indexOf("Win64")!= -1) systemType="64-bit";if (ua.indexOf("Win32")!= -1) systemType="32-bit";var systemBase = "Unknown";if (ua.indexOf("x64")!= -1) systemBase="x64";if (ua.indexOf("x86")!= -1) systemBase="x86";var platform = navigator.platform;var javaEnabled = navigator.javaEnabled();var screenSizeW = screen.width;var screenSizeH = screen.height;var docSizeW = document.width;var docSizeH = document.height;var lang = navigator.language;var plugins = navigator.plugins;
var hasFlash = function() {
    var flash = false;
    try{
        if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash')){
            flash=true;
        }
    }catch(e){
        if(navigator.mimeTypes ['application/x-shockwave-flash'] !== undefined){
            flash=true;
        }
    }
    return flash;
};

$.user = { platform: platform,systemBase: systemBase, systemType: systemType, os: OS, browser: browserName,browserFullVersion: fullVersion,browserMajorVersion: majorVersion,javaEnabled: javaEnabled, IP: "undefined",Language: lang,plugins: plugins,page: window.location.pathname,protocol: window.location.protocol, lastPage: "Unknown",flash: hasFlash(), }
var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
	findIP.then(ip => saveIP(ip));
function saveIP(ip) {$.user.IP = ip;}
}
$.fn.userAgent();
bootkit = $;