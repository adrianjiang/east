

console.log('**********','load setting success');

require("./ajax-data");
window.debug = require('./plugin/debug/debug.js');


debug.silence();//关闭对浏览器报错的捕捉

E.debug = true;
/*
调试ajax函数
*/

E.ajax_real = function(){
	/*
		- api 		<string>  	接口名
		- data 		<object>	对象
		- success	<function>	数据请求成功回调函数
	*/
		// console.log('ajax请求',arguments);

		var urlname = arguments[0];
		if(!arguments[2]){//没有提交参数
			var callback = arguments[1] || function(){};
			A.ajax(arguments[0] + '', {}, function(cb){
				if(E.debug)
				console.log('*************** ajax',urlname,cb);

				if(cb.state == 1){
					// console.log(a)
					// arguments[1](cb.data);
					callback(cb.data);

				}else{
					console.warn('数据请求失败');
				}

			});
		}else{
			var callback = arguments[2] || function(){};

			A.ajax(arguments[0] + '', arguments[1], function(cb){
				if(E.debug)
				console.log('***** ajax请求成功',urlname,cb);

				if(cb.state == 1){
					callback(cb.data);				
				}else{
					console.warn('数据请求失败');
				}
			});
		}
		// if(arguments.length == 3){
			
		// }
	}	

E.ajax = function(){
	// console.log('ajax',arguments[1]);
	// console.log('ajax调试模式',arguments)
	var data = this._ajax_data[arguments[0]];
	if(!data){//如果没有假数据就用真数据
		this.ajax_real(arguments[0],arguments[1],arguments[2]);
		return;//如果有假数据就返回
	}

	if(arguments.length == 2){
		var data = this._ajax_data[arguments[0]];
		var callback = arguments[1] || function(){};
		setTimeout(function(){
			callback(data);
		},100);
	}
	if(arguments.length == 3){
		var data = this._ajax_data[arguments[0]];
		var callback = arguments[2] || function(){};
		setTimeout(function(){
			callback(data);
		},100);
	}
}





// //初始化桌面工具
// E.init_desktopTool = function(){
// 	var debug
// }

































