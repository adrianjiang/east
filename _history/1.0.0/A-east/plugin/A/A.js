

//网页可见区域宽： document.body.clientWidth
//网页可见区域高： document.body.clientHeight
//网页可见区域宽： document.body.offsetWidth (包括边线的宽)
//网页可见区域高： document.body.offsetHeight (包括边线的高)
//网页正文全文宽： document.body.scrollWidth
//网页正文全文高： document.body.scrollHeight
//网页被卷去的高： document.body.scrollTop
//网页被卷去的左： document.body.scrollLeft
//网页正文部分上： window.screenTop
//网页正文部分左： window.screenLeft
//屏幕分辨率的高： window.screen.height
//屏幕分辨率的宽： window.screen.width
//屏幕可用工作区高度： window.screen.availHeight
//屏幕可用工作区宽度： window.screen.availWidth


// define(function(require){

console.log('**********','load AW-basic success');


var A = window.A || {};
window.A = A;

A.getWidth = function(){
	return window.screen.availWidth;
}
A.getHeight = function(){
	return window.screen.availHeight;
}
// A._setting = {
// 	system : {
// 		// 'API'		: 'http://skssapp.7east.cn/api!',
// 		// 'URL_API'	: 'http://skssapp.7east.cn/api!',
// 		// 'URL_RN'	: 'skssapp.7east.cn',//杩斿洖鍦板潃      
		
// 	//	'PATH_A'	: get_path('setting.js'),//_A_鍖呰矾寰�
// 		// 'PATH_P'	: '$UI/east',//椤圭洰璺緞
		
// 		// 'PN_Hammer_js'	: 'plugin/Hammer/Hammer.min.js',
// 		// 'PN_layer_mobile_js'	: 'plugin/layer_mobile/layer.js',
// 		// 'PN_layer_mobile_css'	: 'plugin/layer_mobile/layer.css',
// 		// 'PN_swiper_js'	: 'plugin/Swiper/swiper.min.js',
// 		// 'PN_swiper_css'	: 'plugin/Swiper/swiper.css'
		
// 	},
// 	custom : {
// 		'PATH_require' : "A-east/", 
// 	}

// };



//	window._A_ = {};
//	window.A = _A_;

//寮曞叆css鎴杍s鏂囦欢
A.include = function(type, url){
	switch(type){
		case 'css':
			var link	= document.createElement("link");
			link.rel	= "stylesheet";
			link.type	= "text/css";
			link.href	= url;
			document.getElementsByTagName("head")[0].appendChild(link);

			break;
		case 'js':
		    var oScript		= document.createElement("script"); 
		    oScript.type	= "text/javascript"; 
		    oScript.src		= url; 
		    document.getElementsByTagName("body")[0].appendChild(oScript); 

			break;
	}
};

/*
 *  鍔ㄦ�佸紩鍏ss鏍峰紡
 * 
 * 渚嬶細
 * 	var styles = "#div{background-color: #FF3300; color:#FFFFFF }";
 *	_A_.include_style(styles, "newstyle");
 * 
 * */
A.include_style = function(styles, styleId){
	//濡傛灉宸插瓨鍦ㄨ鏍峰紡锛岀洿鎺ヨ繑鍥�
	if (document.getElementById(styleId)) {
		console.log('璇tyle宸茶鍔犺浇锛屼笉鍏佽瑕嗙洊');
        return;
    }
    var style = document.createElement("style");
    style.id = styleId;
    //杩欓噷鏈�濂界粰ie璁剧疆涓嬮潰鐨勫睘鎬�
    /*if (isIE()) {
	style.type = "text/css";
	style.media = "screen"
	}*/
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    if (style.styleSheet) { //for ie
        style.styleSheet.cssText = styles;
    } else { //for w3c
        style.appendChild(document.createTextNode(styles));
    }
};

//鑾峰彇鎴栧瓨鍌�
A.localStorage = function(){
	
	var num = arguments.length;
	/*
	 * A.localStorage(name)
	 * */
	if(num == 1){//璇诲彇
		
		var name = arguments[0];
		try{
		    return localStorage.getItem(name);
	    }catch(err){
   	 	    return mylocalStorge.getItem(name);
	    }
	}
	/*
	 * A.localStorage(name,value)
	 * */
	if(num == 2){//鍐欏叆
		var name = arguments[0];
		var value = arguments[1];
		localStorage.setItem(name, value);
	}
};

A.require = function(name){
	if(require){
		try{
			require(name);
			console.log('鍔犺浇鎴愬姛',name);
		}catch(err){
			console.error('鏈壘鍒版枃浠�',name);
		}
	}
};


// A.ajax = function(){
// 	var num = arguments.length;
	
// }

A.get = function(name){
	var data = this._setting;
	var s = data.system[name];
	if(typeof s == 'undefined'){//瀛樺湪
		return data.custom[name];
	}else{
		return s; 
	}
}

A.set = function(name,value){
	var data = this._setting;
	var s = data.system[name];
	if(typeof s != 'undefined'){//瀛樺湪
		console.error('宸插瓨鍦ㄥ悓鍚嶇郴缁熷彉閲�');
		return s; 
	}else{
		data.custom[name] = value;
	}
}




A.ajax = function(api,data,success,error){
	var url = this.get('API');
	$.ajax({
	    "type"		: "get",
	    "url"		: url + api,
	    "dataType"	: "jsonp",
	    "data"		: data,
	    "success" 	: function(result) {
	    	// console.log(result);

	    	success(result);
	    },
	    "error" : function(xhr,txt){
	    	console.log(xhr,txt);
	    	// if(error){
	    	// 	error(xhr,txt);
	    	// }
	    }
	});
}

/*
 * rely on Hammer
 * support event type
 * - swipeleft - swiperight - swipeup - swipedown - tap - press
 * */
A.bind = function(dom, eventName, fn){
	var hammertime = new Hammer(dom);
	switch(eventName){
		case 'swipeleft':break;
		case 'swiperight':break;
		case 'swipeup':
			hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL});
			break;
		case 'swipedown':
			hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL});
			break;
		case 'tap':break;
		case 'press':break;
		// case 'pinch'://捏合事件
		// 	hammertime.add(new Hammer.Pinch());
		// 	break;
		// case 'rotate'://手指旋转
		// 	hammertime.add(new Hammer.Rotate());
		// 	break;
		case 'pinchin'://捏合事件
			hammertime.add(new Hammer.Pinch());
			break;
		case 'pinchout'://手指分开事件
			hammertime.add(new Hammer.Pinch());
			break;
	}
	hammertime.on(eventName, function (e) {
		fn(e);
    });
}

/*
 * get the devices information
 * */
A.get_devices = function(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
//  document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // _A_.devices = 'phone';
        return 'phone';
    } else {
        // _A_.devices = 'pc';
        return 'pc';
    }       
}

/*
 * get a unique code 
 * */
A.random_id = function(){//时间   + 1 + 4位随机码
	var id = '' + new Date().getTime() + parseInt((1 + Math.random())*10000);
	return id;
}



A.random_color = function() {
    var colors = ('blue red green orange pink').split(' ');
    return colors[ Math.floor( Math.random()*colors.length ) ]
}
/*
 get new Swiper - swiper : a plugin with carousel
 * option	object
 * */
A.new_swiper = function(option){
	
	var _data	= option.a_data || [];//轮播图总数
	var _box	= $(option.a_box) || $('body');//盒子对象
	var _swiperClass	= option.a_swiperClass	|| 'swiper-container';
	var _paginationIf	= true;//是否需要分页器
	if(option.a_paginationIf === false){_paginationIf = false;}
	
//		var _buttonIf		= option.a_buttonIf || false;//是否需要按钮
	
	var _paginationClass= option.a_paginationClass || 'Aswiper-pagination-center';//分页器样式
	var _buttonClass	= option.a_buttonClass || '';//按钮样式
	var _autoplay		= option.a_autoplay		||false;//是否自动播放
	/*
	 creat dom
	 * */
	var html = '';
	html += '<div class="Aswiper-container">';
	html += '<div class="swiper-wrapper">';
//		console.log('循环',_data);
	for(var i = 0; i < _data.length; i++){
		var buff = _data[i];
		var type	= buff.type || 'text';//imger text
		var path	= buff.path || '';//imger
		var text	= buff.text || 'none';//text
		var className	= buff.class|| '';//class
		var css		= buff.css	|| '';//css
		
		var textClass	= buff.textClass;
		
		
		if(typeof css == 'object'){
			console.error('!!!!!','参数css应为字符串');
		}
//			console.log('buff',buff);
		html += '<div class="swiper-slide ' + className + '" style="' + css + '" data-id="' + buff.id + '">';
		
		
		switch(type){
			case 'text':
				html += '<div class="'+ textClass + '">' + text + '</div>';			
			break;
			case 'img':
//					console.log('加照片',buff);
				html += '<img class="img" src="' + buff.img + '">';
			break;
		}
		html += '</div>';
	}
	html += '</div>';		
	
	var content = $(html);
	
	
	var paginationId = 'css_' + A.random_id();
	if(_paginationIf){//是否需要分页器
		html += '<div class="Aswiper-pagination-center ' + paginationId + '"></div>';
	}
	html += '</div>';
	
	var swiperDom = $(html);
	_box.append(swiperDom);
	
	/*-----------------------------*/
	option.initialSlide = 0;
//		option.pagination = '.' + _paginationClass;
	if(_paginationIf){//是否需要分页器
		option.pagination = '.' + paginationId;
	}
	
	option.paginationClickable = true;
	option.loop = true;
	
	if(_autoplay){//是否自动播放
		option.autoplay = 5000;
		option.autoplayDisableOnInteraction = false;
	}
	
	/*------------------------------*/
	
	var mySwiper = new Swiper(swiperDom[0],option);
	return mySwiper;
}
A.swiper = A.new_swiper;

//get the path of the js file
A.get_path = function(){
	var js=document.scripts;
//		console.log(js);
	var jsPath;
	for(var i=0;i<js.length;i++){
		if(js[i].src.indexOf("setting.js")>-1){
			jsPath=js[i].src.substring(0,js[i].src.lastIndexOf("/")+1);
		}
	}
	
//		console.log('jspath',jsPath);
	return jsPath;
}


A.layer = function(){
	var a1 = arguments[0];
	
	if(typeof a1 == 'string'){//使用封装方法
		
		switch(a1){
			case 'close':
				layer.closeAll();
				break;
			case 'load':
				layer.open({
					type: 2,
					shadeClose: false,
					time: 10
				});
				break;
			case 'alert':
				var info = arguments[1];
				layer.open({
				    content: info,
				    shadeClose: false,
				    btn: '确定'
				});
				break;
			default:
				layer.open({
					content: a1,
					skin: 'msg',
					time: 2 //2秒后自动关闭
			  });
		}
	}
	if(typeof a1 == 'object'){
		layer.open(a1);
	}
	
	
}
	
	
A.get_byxid = function(xid){
	return $('*[xid="' + xid + '"]');
}	
	
	
	
A.getDom = function(id){
	return document.getElementById(id);
}
A.new_pipe = function(num){
	var rn = {
		length: num,
		data: [],
		pop: function(){
			var data = this.data;
			if(data.length > 0){
				return data.pop();				
			}else{
				return false;
			}
		},
		push: function(o){
			var data = this.data;
			data.push(o);
			if(data.length >= this.length){
				data.splice(0,1);
			}
		},
		last: function(){
			var data = this.data;
			var l = data.length;
			if(l > 0){
				return data[l - 1]
			}else{
				return false;
			}
		},
		first: function(){
			var data = this.data;
			var l = data.length;
			if(l > 0){
				return data[0];
			}else{
				return false;
			}
		},
		clear: function(){
			this.data = [];
		},
		getLength: function(){
			return this.data.length;
		}
	}
	return rn;
}
// 复制对象
A.clone = function(myObj){ 
	if(typeof(myObj) != 'object') return myObj; 
	if(myObj == null) return myObj; 
	var myNewObj = new Object(); 
	for(var i in myObj) 
		myNewObj[i] = A.clone(myObj[i]); 
	return myNewObj; 
} 
	
	// return A;
// });

//拿到本地上传文件的路径
A.getObjectURL = function(file) {
 	var url = null ;
 	if (window.createObjectURL!=undefined) { // basic
 		url = window.createObjectURL(file) ;
 	} else if (window.URL!=undefined) { // mozilla(firefox)
 		url = window.URL.createObjectURL(file) ;
 	} else if (window.webkitURL!=undefined) { // webkit or chrome
 		url = window.webkitURL.createObjectURL(file) ;
 	}
 	return url ;
}