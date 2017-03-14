




E._setting = {
    system : {

    },
    custom : {

    }
};


E.ajax = function(){
/*
	- api 		<string>  	接口名
	- data 		<object>	对象
	- success	<function>	数据请求成功回调函数
*/

	if(arguments.length == 2){
		A.ajax(arguments[0] + '', {}, function(cb){
			if(cb.state == 1){
				arguments[1](cb.data);				
			}else{
				console.warn('数据请求失败');
			}

		});
	}
	if(arguments.length == 3){
		A.ajax(arguments[0] + '', arguments[1], function(cb){
			if(cb.state == 1){
				arguments[2](cb.data);				
			}else{
				console.warn('数据请求失败');
			}
		});
	}
}	

/*

E.set('API','');

E.ajax('login',{},function(){})

*/
//失败回调函数
E.ajax_error = function(){}
E.ajax = function(api,data,success){
	var api = arguments[0];
	var data = {};
	var success = function(){};

	if(typeof arguments[1] == 'function'){//如果第二个参数是函数
		var success = arguments[1];
	}
	if(typeof arguments[1] == 'object'){
		data = arguments[1];
		success = arguments[2];
	}
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
	    	if(this.ajax_error){
	    		this.ajax_error(xhr,txt);
	    	}
	    }
	});
}

//获取浏览器窗口宽度
E.width = function(){
	return document.documentElement.clientWidth;
}
//获取浏览器窗口高度
E.height = function(){
	return document.documentElement.clientHeight;
}
//动态引入js或css文件
/*
	E.include('name.css')
	E.include('name.js')	

*/
E.include = function(url){

	var buff = url.split('.');
	var type = buff[buff.length - 1];
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
		default :
			console.warn('!!!!!','E.include','请传入正确的文件名',url);
	}
};

/*
 *  动态写入样式
 * 
 *  demo
 * 	var styles = "#div{background-color: #FF3300; color:#FFFFFF }";
 *	_A_.include_style(styles, "newstyle");
 * |
 * _A_.include_style(styles);
 *
 * */
E.include_style = function(styles, styleId){
	if (document.getElementById(styleId)) {
		console.log('璇tyle宸茶鍔犺浇锛屼笉鍏佽瑕嗙洊');
        return;
    }
    var style = document.createElement("style");
    if(!styleId)this.random_id();
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

/*
 * creat a unique code 
 * */
E.random_id = function(){//时间   + 1 + 4位随机码
	var id = '' + new Date().getTime() + parseInt((1 + Math.random())*10000);
	return id;
}
E.random = function(){
	return E.random_id();
}
E.random_color = function() {
    var colors = ('blue red green orange pink').split(' ');
    return colors[ Math.floor( Math.random()*colors.length ) ]
}


E.get_path = function(){
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


//管道
E.pipe = function(num){
	if(!num) num = 10;
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

// 深度克隆对象
E.clone = function(myObj){ 
	if(typeof(myObj) != 'object') return myObj; 
	if(myObj == null) return myObj; 
	var myNewObj = new Object(); 
	for(var i in myObj) 
		myNewObj[i] = A.clone(myObj[i]); 
	return myNewObj; 
} 


//拿到本地上传文件的路径
/*
input.onchange = function(){
	E.getObjectURL(this.files[0])
}

*/
E.getObjectURL = function(file) {
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


E.warn = function(name,title,canshu){
	console.warn('**********', name, title, canshu);
}