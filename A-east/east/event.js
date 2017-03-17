




E.event = {};


E.event.touch= function(dom, start, move, end){
	if(dom instanceof $)dom = dom[0];//如果是jquery对象则转成原生对象

	var width = box.offsetWidth;
	var height = box.offsetHeight;

	var distance = 70;//如果瞬移距离超过这个值，则认为已经跳出了范围
	var gap = 10;


	function bind_pc(){
		console.log('绑定pc端事件')

		var _switch = false;
		var ifEnd = false;
		var buff_point = {};

		var start_x = 0;
		var start_y = 0;


		dom.onmousedown = function(e){
			
			_switch = true;
			ifEnd = false;

			var x = e.x;
			var y = e.y;
			start_x = x;
			start_y = y;
			buff_point = {x:x,y:y}
			start({
				x: x,
				y: y,
				startX: start_x,
				startY: start_y

			});
			e.preventDefault();
			return false;
		}
		
		dom.onmousemove = function(e){
			if(!_switch)return;//如果没有按下鼠标 不算touch事件
			var x = e.x;
			var y = e.y;
			if(parseInt(buff_point.x - x) > distance | parseInt(buff_point.y - y) > distance){//瞬移距离太大
				_switch = false;
				ifEnd = true;
				end({
					x: x,
					y: y,
					startX: start_x,
					startY: start_y
				});
				return false;	
			}
			if(x < gap | y < gap | x > width - gap | y > height - gap){
				_switch = false;
				ifEnd = true;

				end({
					x: x,
					y: y,
					startX: start_x,
					startY: start_y
				});
				return false;
			}

			buff_point = {x:x,y:y}
			move({
				x: x,
				y: y,
				startX: start_x,
				startY: start_y

			});
			e.preventDefault();

			return false;
		}
		dom.onmouseup = function(e){
			_switch = false;
			if(ifEnd)return false
			var x = e.x;
			var y = e.y;
			end({
				x: x,
				y: y,
				startX: start_x,
				startY: start_y

			});
			return false;
		}
	}
	function bind_mobile(){
		E.log('绑定移动端事件')
		// dom.touchstart = function(e){
		// 	event.preventDefault();
		// 	start(e);
		// }
		
		// dom.touchmove = function(e){
		// 	event.preventDefault();
		// 	move(e);
		// }
		// dom.touchend = function(e){
		// 	end(e);
		// }
		var _switch = false;
		var ifEnd = false;
		var buff_point = {};

		var start_x = 0;
		var start_y = 0;
		dom.addEventListener('touchstart', function(e) {
			_switch = true;
			ifEnd = false;

			var x = e.touches[0].clientX;
			var y = e.touches[0].clientY;
			start_x = x;
			start_y = y;
			buff_point = {x:x,y:y}
			start({
				x: x,
				y: y,
				startX: start_x,
				startY: start_y

			});
			e.preventDefault();
			return false;
		}, false);
		dom.addEventListener('touchmove', function(e) {
			if(!_switch)return;//如果没有按下鼠标 不算touch事件
			var x = e.touches[0].clientX;
			var y = e.touches[0].clientY;
			if(parseInt(buff_point.x - x) > distance | parseInt(buff_point.y - y) > distance){//瞬移距离太大
				_switch = false;
				ifEnd = true;
				end({
					x: x,
					y: y,
					startX: start_x,
					startY: start_y
				});
				return false;	
			}
			if(x < gap | y < gap | x > width - gap | y > height - gap){
				_switch = false;
				ifEnd = true;

				end({
					x: x,
					y: y,
					startX: start_x,
					startY: start_y
				});
				return false;
			}

			buff_point = {x:x,y:y}
			move({
				x: x,
				y: y,
				startX: start_x,
				startY: start_y

			});
			e.preventDefault();

			return false;
		    
		}, false);
		dom.addEventListener('touchend', function(e) {

			_switch = false;
			if(ifEnd)return false
			var x = buff_point.x;
			var y = buff_point.y;
			end({
				x: x,
				y: y,
				startX: start_x,
				startY: start_y

			});
			return false;
		    
		}, false);

	}
	if(E.get_devices() == 'pc')bind_pc();
	if(E.get_devices() == 'mobile')bind_mobile();
}


























