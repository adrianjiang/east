








E.print = require('../plugin/debug/debug.js');


E.print.silence();//关闭对浏览器报错的捕捉

E.debug = true;


if(E.get_devices() == 'mobile'){

	E.log = function(o){
		this.print.log(o);
	}
	E.error = function(o){
		this.print.error(o);
	}
	// E.warn = function(){

	// }
	// E.success = function(){
		
	// }
}








