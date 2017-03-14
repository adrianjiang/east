  


require('./east-load');





console.log('**********','load east success');



var E = window.E || {};
window.E = E;

if(!E.ajax){
	console.log('ajax模块初始化');
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
}



E.get_tokenid = function(){
	return A.localStorage("local_user_tokenid");
}
E.get_userid = function(){
	return A.localStorage("local_user_tokenid");
}

E.exit = function(){
	A.localStorage("local_user_tokenid",'');
	A.localStorage("local_user_name",'');
	// localStorage.setItem("local_user_tokenid", '');
	// localStorage.setItem("local_user_name", '');
	// localStorage.setItem("local_user_pass", '');
}
E.saveUser = function(name,tokenid){
	A.localStorage("local_user_tokenid",tokenid);
	A.localStorage("local_user_name",name);
}	
	

E.require_ec = function(name){
    var url = name + '/' + name;
    var page_html = require(`../EComponent/${url}.html`);
    var page_css = require(`../EComponent/${url}.css`);
    var page_js = require(`../EComponent/${url}.js`);

    if(page_js){
	    var url_img = name + '/' + 'img' + '/';
	    if(page_js.img){
		    page_js.img.forEach(function (img) {
			    // require(`url?limit=10000000!../page/${url_img}${img}`);
			    require(`../EComponent/${url_img}${img}`);
			});	    	
	    }
    }
    return {
        html   : page_html,
        css    : page_css,
        js     : page_js
    }
}

E.ec = function(box,ecName,option){
	var ec = this.require_ec(ecName);
	box.empty();
	var dom = $(ec.html);
    box.append(dom);
	ec.js.init(dom,option);	
	return dom;
}

E.require_page = function(name){
    var url = name + '/' + name;
    var page_html = require(`../page/${url}.html`);
    var page_css = require(`../page/${url}.css`);
    var page_js = require(`../page/${url}.js`);

    if(page_js){
	    if(page_js.img){
	    	var url_img = name + '/' + 'img' + '/';
		    page_js.img.forEach(function (img) {
			    // require(`url?limit=10000000!../page/${url_img}${img}`);
			    require(`../page/${url_img}${img}`);
			});	    	
	    }

	    if(page_js.files){
		    var url_files = name + '/';
		    page_js.files.forEach(function (file) {
		    	console.log('加载自定义文件',file)
			    // require(`url?limit=10000000!../page/${url_img}${img}`);
			    require(`../page/${url_files}${file}`);
			});	    	
	    }
    }
    return {
        html   : page_html,
        css    : page_css,
        js     : page_js
    }
}


E._pageHistory = A.new_pipe(10);

E.clear_ph = function(){
	this._pageHistory.clear();
}
E.page_pop = function(){
	var data = this._pageHistory;
	data.pop();
	var last = data.pop();
	if(last){
		E.page(last.box,last.name,last.option);
	}
}
E.page_push = function(o){
	// var type = o.type;
	// var name = o.name;
	// var box = o.box;
	this._pageHistory.push(o);
}
/**
 * 跳转到其他页面
 *
 * 可设置跳转效果
 *
 * @param    {string}  pageName     地址
 * @param    {string}  loadType         商品数组

 *
 * @date     2017-02-04
 * @author   adrian
 */
E.goto = function(pageName,option){
	var box = $('body');
	this.page(box,pageName,option);

	
}
E.page = function(box,pageName,option){
	// this.page_push({
	// 	box: box,
	// 	name: pageName,
	// 	option: option
	// });

	var page = this.require_page(pageName);
	box.empty();
	var dom = $(page.html);
    box.append(dom);
	page.js.init(box,option);
	return dom;
}
	
E.openEC = function(pageName,option){
	var page = this.require_ec(pageName);

	// var _option = option;
	var thisPage = false;
	var pageii = layer.open({
		type: 1,
		content: page.html,
		anim: 'up',
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;',
		success: function(e){
			if(!option){
				option = {};
			}
			option.thisPage = thisPage;

			page.js.init($(e),option);

		}
	});
	pageii = thisPage;
}
E.openPage = function(pageName,option){
	var page = this.require_page(pageName);

	// var _option = option;
	var thisPage = false;
	var pageii = layer.open({
		type: 1,
		content: page.html,
		anim: 'up',
		style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;',
		success: function(e){
			if(!option){
				option = {};
			}
			option.thisPage = thisPage;

			page.js.init($(e),option);

		}
	});
	pageii = thisPage;
}


E.close = function(index){
	if(index){
		layer.close(index);
	}else{
		layer.closeAll('page');
	}
}




E.init_jquery = function(){
	$.fn.search = function(name,value){
		var str = '*[' + name + '=' + '"' + value + '"' + ']';
		return this.find(str);
	}
	//寻找  page-box  等于value的元素
	$.fn.find_pb = function(value){
		var str = '*[page-box=' + '"' + value + '"' + ']';
		return this.find(str);
	}
}
E.init_event = function(){
	$.fn.tap = function(fn){
		var self = this;
		var dom = this[0];

		A.bind(dom, 'tap', function(){fn(self);});
		return this;
	}
	$.fn.press = function(fn){
		var self = this;
		var dom = this[0];

		A.bind(dom, 'press', function(){fn(self);});
		return this;
	}
	$.fn.swipeleft = function(fn){
		var self = this;
		var dom = this[0];

		A.bind(dom, 'swipeleft', function(){fn(self);});
		return this;
	}
	$.fn.swiperight = function(fn){
		var self = this;
		var dom = this[0];
		A.bind(dom, 'swiperight', function(){fn(self);});
		return this;
	}
	$.fn.swipeup = function(fn){
		var self = this;
		var dom = this[0];
		A.bind(dom, 'swipeup', function(){fn(self);});
		return this;
	}
	$.fn.swipedown = function(fn){
		var self = this;
		var dom = this[0];
		A.bind(dom, 'swipedown', function(){fn(self);});
		return this;
	}
	// $.fn.rotate = function(fn){
	// 	var self = this;
	// 	var dom = this[0];
	// 	A.bind(dom, 'rotate', function(){fn(self);});
	// 	return this;
	// }
	// $.fn.pinch = function(fn){
	// 	var self = this;
	// 	var dom = this[0];
	// 	A.bind(dom, 'pinch', function(){fn(self);});
	// 	return this;
	// }
	$.fn.pinchin = function(fn){
		var self = this;
		var dom = this[0];
		A.bind(dom, 'pinchin', function(){fn(self);});
		return this;
	}
	$.fn.pinchout = function(fn){
		var self = this;
		var dom = this[0];
		A.bind(dom, 'pinchout', function(){fn(self);});
		return this;
	}
}
E.init = function(){
	// this.load_img();
	this.init_event();
	this.init_jquery();
}

E.init();



E.swipeScrollbar = function($box){
	var html = '<div class="swiper-scrollbar"></div>';
	$box.append($(html));
	$box.find('.swiper-slide').css({height: 'auto'});
	
	var swipe = new Swiper($box[0],{
		scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
	})
	return swipe;
}

E.set_href = function(o){
	if(!o)o = {};
	var loc = document.location.href.split('#');
	var href = loc[0];

	href += '#';
	for(var i in o){
		href += i;
		href += '=';
		href += o[i];
		href += '&';
	}

	document.location.href = href;
	return href;
}

E.page_argument  = function(name){//解析页面参数
	var a1 = document.location.href.split('#')[1];
	if(!a1)return;
	var a2 = a1.split('&');
	if(!a2)return;
	var a3 = {};
	for(var i = 0; i < a2.length; i++){
		var buff = a2[i];
		if(buff){
			var arr = buff.split('=');
			a3[arr[0]] = arr[1];		
		}
	}
	if(name){
		return a3[name];
	}else{
		return a3;
	}
}
E.href_argument = function(href){//用于e-href
	var a1 = 'page=' + href;
	if(!a1)return;
	var a2 = a1.split('&');
	if(!a2)return;
	var a3 = {};
	for(var i = 0; i < a2.length; i++){
		var buff = a2[i];
		if(buff){
			var arr = buff.split('=');
			a3[arr[0]] = arr[1];		
		}
	}
	return a3;
}





/*------------------------------------------------------
登入部分
-------------------------------------------------------*/

 
E.login = function(name,pass,fn){
	E.ajax('login',{
			user: name,
			pass: pass
		},function(cb){
			if(cb.state == 0){//登入失败
				return;
			}
			if(cb.state == 3){//密码错误

			}
			E.saveUser(name,cb.uid);//保存用户信息
			fn();
		})
}

 








