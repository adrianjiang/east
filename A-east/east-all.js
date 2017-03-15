
window.E = window.E || {};


//插件
window.jQuery = require('./plugin/jquery/jquery-3.1.1.min.js');
window.$ = jQuery
require('./plugin/bootstrap/bootstrap.css');

// require('./plugin/layui/layui.js');
// require('./plugin/layui/css/layui.css');



require('./east/base.js');
require('./east/base.less');
// require('./east/base.css');



require('./east/image.js');


require('./east/init_layui.js');



E.success('east-all.js加载成功');

