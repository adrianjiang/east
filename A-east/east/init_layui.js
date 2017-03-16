



// E.include(E.get('CND') + E.get('layui_css'),function(){
// 	E.success('layui_css加载成功')
// })
// E.include(E.get('CND') + E.get('layui_js'),function(){
// 	E.success('layui_js加载成功')

// 	layui.use(['layer', 'form'], function(){
// 		//在这里加载模块文件
		
// 	  // var layer = layui.layer
// 	  // ,form = layui.form();
		
// 		E._layer = layui.layer;	  
// 	  	E._form = layui.form;
// 	  // layer.msg('Hello World');

// 	  	var fn = E._layer_callback;
// 		for(var i = 0; i < fn.length; i++){
// 			fn[i]();
// 		}
// 	});	

// 	// init();
	


// })

if(window.layui){
	layui.use(['layer', 'form'], function(){
		//在这里加载模块文件
		
	  // var layer = layui.layer
	  // ,form = layui.form();
		
		E._layer = layui.layer;	  
	  	E._form = layui.form();
	  // layer.msg('Hello World');

	  	var fn = E._layer_callback;
		for(var i = 0; i < fn.length; i++){
			fn[i]();
		}
	});	

	init();
}
	
E._layer_callback = [];

// function init(){
// 	E.alert = function(title, content){
// 		this._layer.open({
// 			title: title,
// 			content: content
// 		});     
// 	}
// 	E.msg = function(string){
// 		return this._layer.msg(string);
// 	}
// }

function init(){
	E.alert = function(title, content){

		if(!this._layer){
			this._layer_callback.push(function(){
				E.alert(title,content);
			});
			return;	
		}
		return this._layer.open({
			title: title,
			content: content
		});     
	}

	E.msg = function(string){
		if(!this._layer){
			this._layer_callback.push(function(){
				E.msg(string);
			});	
			return;
		}
		return this._layer.msg(string);
	}

}




