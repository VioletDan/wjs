/**
 * Created by Administrator on 2017/5/16.
 */
'use strict'
//轮播图逻辑
$(function(){
    // 需求：在PC端加载大图，定位居中，在手机端，加载小图，并且让图片的宽度自适应，高度默认
    // （1）获取屏幕的宽度，确定是什么设备，为了体验考虑，将所有的逻辑放到resize事件
    // （2）根据当前的设备，采用哪个src （至于对应问题，用数组去解决）
    // （3）还原图片的css
    // 绑定resize事件
    // 自己定义一个手机的最大宽
    var mobileWidth=768;
    var items=$('.carousel-inner .item');
    var pic=$('.carousel-inner img');
    $(window).resize(function(){
        var screenWidth=$(this).width();
        var isMobile=screenWidth<=mobileWidth;
        //if(isMobile){
        ////    手机上的逻辑，遍历所有的图片，换路径
        //    pic.each(function (index,el) {
        //        //遍历到谁就给谁换图片的路径
        //        var _el=$(el);
        //        var src=_el.data('msrc');
        //        _el.attr('src',src);
        //    })
        //    //还原css属性
        //    pic.css({
        //        'width':'100%',
        //        'height':'auto',
        //        'position':'static',
        //        'transform':'none'
        //    })
        //    //还原item的高度
        //    items.css('height','auto');
        //}else{
        //    pic.each(function (index,el) {
        //        var _el=$(el);
        //        var src=_el.data('psrc');
        //        _el.attr('src',src);
        //    })
        //    //还原PC端的css属性
        //    pic.css({
        //        'width':'auto',
        //        'height':410,//数字不用符号
        //        'position':'absolute',
        //        'transform':'translateX(-50%)'
        //    })
        //    //还原item的高度
        //    items.css('height',410);
        //}

    //    简洁的写法
        pic.each(function (index,el) {
            var _el=$(el);
            var src=_el.data(isMobile?'msrc':'psrc');
            _el.attr('src',src);
        })
        pic.css({
            'width':isMobile?'100%':'auto',
            'height':isMobile?'auto':410,
            'transform':isMobile?'none':'translateX(-50%)',
            'position':isMobile?'static':'absolute'
        })
        items.css('height',isMobile?'auto':410);
    }).trigger('resize');


    //手指滑动逻辑
    var carousel  = $('.carousel');
    var startX=0;
    var startTime=null;//获取当前的时间
    var screenWidth=$(window).width();//获取当前的屏幕宽度
    carousel.on('touchstart', function (e) {
        startX= e.originalEvent.changedTouches[0].clientX;
        startTime=Date.now();
    })
    carousel.on('touchend', function (e) {
        var dTime=Date.now()-startTime;
        var dx=e.originalEvent.changedTouches[0].clientX-startX;
        //判断是否滑动成功
        if(Math.abs(dx)>screenWidth/3 || Math.abs(dx)<30&&dTime<300){
            //滑动成功
            if(dx>0){
                //显示上一张
                carousel.carousel('prev');
            }else{
                carousel.carousel('next');
            }
        }
    })

})

//;(function () {
//    //动态的将li的宽度添加给ul
//    var scroll=document.querySelector('#scroll');
//    //获取到ul下的li
//    var scrollLis=scroll.querySelectorAll('li');
//    var allWidth=0;//用来存放所有li的宽度
//    //遍历所有li 的宽度
//    for(var i=0;i<scrollLis.length;i++){
//        allWidth=allWidth+scrollLis[i].offsetWidth;
//    }
//    console.log(allWidth)
//    scroll.style.width=allWidth+'px';
//})()

//jquery方法
$(function () {
    var scroll=$('#scroll');
    var scrollLis=$('#scroll>li');
    var allWidth=0;
    scrollLis.each(function (index,el) {
        var _el=$(el);
        allWidth+=el.offsetWidth;
    })
    console.log(allWidth);
    scroll.width(allWidth);
})