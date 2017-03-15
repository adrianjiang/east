

/*
图像有损压缩

option

- file

E.img_compression({
	file: files[0],  //不可为空
	type: 'jpg',//默认为png
	maxWidth: 1000,//
	maxHeight: 1000, //
	minWidth: 100,
	minHeight: 100,
})


return {
	data:
	type:
	width
	height
	scale://缩放比例
}
*/



E.img_compression = function(option){

	var img = option.img,  //不可为空
		type = option.type || 'jpg',//默认为png
		maxWidth = option.maxWidth || 1000,//
		maxHeight = option.maxHeight || 1000, //
		minWidth = option.minWidth || 150,
		minHeight = option.minHeight || 150;

	// console.log('E.getObjectURL(file)',E.getObjectURL(file));
	// console.log('file',file);
	// var img = new Image();
	// img.src = this.getObjectURL(file);	
	
	if(!img){
		console.warn('E.img_compression','img不可为空',img);
	}

	var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    var img_w = img.width;//图片真实宽度
    var img_h = img.height;//

    var ratio = img_w / img_h;//宽高比
    var ratio_min = minWidth / minHeight;//最小设定值得宽高比

    var canvas_w = 0;
    var canvas_h = 0;
    
    if((img_w < minWidth | img_h < minHeight) & (img_w < maxWidth & img_h < maxHeight)){//宽高小于 最小宽高
    	if(ratio > ratio_min | (img_w < minWidth & img_h > minHeight)){//比设定的要胖  或
    		canvas_w = minWidth;
    		canvas_h = canvas_w / ratio;
    	}else{//比设定的要瘦
    		canvas_h = minHeight;
    		canvas_w = canvas_h * ratio;
    	}
    }
    // if(img_w < minWidth & img_h > minHeight){//宽度小  高度适中
    // 	canvas_w = minWidth;
    // 	canvas_h = canvas_w / ratio;
    // }
    // if(img_w > minWidth & img_h < minHeight){//宽度适中  高度小
    // 	canvas_h = minHeight;
    // 	canvas_w = canvas_h * ratio;
    // }

    if(img_w > minWidth & img_h > minHeight & img_w < maxWidth & img_h < maxHeight){
    	canvas_w = img_w;
    	canvas_h = img_h;
    }

    if(img_w > maxWidth | img_h > maxHeight){
    	if(ratio > ratio_min){//胖
    		canvas_w = maxWidth;
    		canvas_h = canvas_w / ratio;
    	}else{//瘦
    		canvas_h = maxHeight;
    		canvas_w = canvas_h * ratio;
    	}	
    }

    var scale = canvas_w / img_w;


    canvas.width = canvas_w;
    canvas.height = canvas_h;
    /*
    canvas起始坐标x 
    canvas起始坐标y 
        需要 截取的图片的宽
        需要 截取的图片的高
        需要截取的图片的起始坐标x
        需要截取的图片的起始坐标y
        在canvas中显示的宽
        在canvas中显示的高

    */
   //高宽比
   
  //  console.log('图片宽度',imgDom.width(),imgDom.height())
    // console.log( img_x, img_y, 0, 0, dw, dh)
    context.drawImage(img, 0, 0, img_w, img_h, 0, 0, canvas_w, canvas_h);

    var type_str = 'png';
    if(type == 'png')type_str = 'png';
    if(type == 'jpg' || type == 'jpeg')type_str = 'jpeg'
    
    var imageData = canvas.toDataURL('image/' + type_str);

	return {
		data: imageData,
		type: type_str,
		origin_w: img_w,
		origin_h: img_h,
		width: canvas_w,
		height: canvas_h,
		scale: scale  //缩放比例
	}
	// var newImg = new Image();
 //    newImg.src = imageData;

	// console.log('裁剪后的大小',imageData.length);
	// $('body')[0].appendChild(newImg);
}


















