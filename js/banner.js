/**
 * Created by think on 2017/12/11.
 */
//compute REM
$(function(){
    if(navigator.userAgent.match(/MicroMessenger/i)){
        var weixinShareLogo = '';		
        $('body').prepend('<div style="overflow:hidden; width:0px; height:0; margin:0 auto; position:absolute; top:-800px;">
             <img src="'+ weixinShareLogo +'"></div>')	
         };
        });


!function () {
    var desW=640,
        winW=document.documentElement.clientWidth,
        ratio=winW/desW,
        oMain=document.querySelector(".banner");
    if(winW>desW){
        oMain.style.margin='0 auto';
        oMain.style.width=desW+'px';
        return;
    }
    document.documentElement.style.fontSize=ratio*100+'px';
}();
//页面中如果使用了Touch move 事件，需要把浏览器默认事件阻止掉
// $(document).on('touchstart touchmove touchend',function (ev) {
//     ev.preventDefault();
// })
//banner
var bannerRender=(function () {
    var minL=0,maxL=0;
    var winW=document.documentElement.clientWidth;
    var $banner=$('.banner'),
         $wrapper=$banner.children('.wrapper'),
         $slideList=$wrapper.children('.slide'),
         $imgList=$slideList.find('img'),
         $tip=$('.tip'),
          $liList=$tip.find('li'),
          autoTimer=null;

         function liIndex(step) {
             // $liList.each(function (index,item) {
             //     if(index===step){
             //         $(item).css('background','blue');
             //     }else {
             //         $(item).css('background','');
             //     }
             // })
             $liList.each(function (index,item) {
                 if(index===step){
                     $(item).addClass("bg");
                 }else {
                     $(item).removeClass("bg");
                 }
             })

         }
       var step=1,count=0,followTimer=null;
         liIndex(step-1);
       function isSwipe(strX,strY,endX,endY) {
           return Math.abs(endX-strX)>30||Math.abs(endY-strY)>30;
       }
       function swipeDir(strX,strY,endX,endY) {
           return Math.abs(endX-strX)>=Math.abs(endY-strY)?(endX-strX>0?'right':'left'):(endY-strY>0?'up':'down');
       }
       //TouchStart
    function dragStart(ev) {

        var point=ev.touches[0];

        $wrapper.attr({
            strL:parseFloat($wrapper.css('left')),
            strX:point.clientX,
            strY:point.clientY,
            isMove:false,
            dir:null,
            changeX:null
        })

    }
    //touch move
   function dragIng(ev) {
       var point=ev.touches[0];
       var endX=point.clientX,
           endY=point.clientY,
           strX=parseFloat($wrapper.attr('strX')),
           strY=parseFloat($wrapper.attr('strY')),
           strL=parseFloat($wrapper.attr('strL')),
           changeX=endX-strX;
       //swipe and the direction of swiping
       var isMove=isSwipe(strX,strY,endX,endY),
             dir=swipeDir(strX,strY,endX,endY);
            if(isMove && /left|right/i.test(dir) ){
                $wrapper.attr({
                    isMove:isMove,
                    dir:dir,
                    changeX:changeX
                });
                var curL=strL+changeX;
                curL=curL>maxL?maxL:(curL<minL?minL:curL);
                $wrapper[0].style.webkitTransitionDuration='0s';
                $wrapper.css('left',curL+'px');
            }

   }
   //touch end
   function dragEnd(ev) {
       var isMove=$wrapper.attr('isMove'),
            dir=$wrapper.attr('dir'),
             changeX=parseFloat($wrapper.attr('changeX'));
       if(isMove && /left|right/i.test(dir) ){
           if(Math.abs(changeX)>=winW/2){
               if(dir==='left'){
                   step++;
               }else{
                   step--;
               }

           }

           $wrapper[0].style.webkitTransitionDuration='.3s';
           $wrapper.css('left',-winW*step);
           lazyImg();
           liIndex(step-1);

           //动画运动过程中监听一个定时器，动画运动完成，判断是否运动到边界
           //如果运动到达边界，立刻回到真实位置
           window.clearTimeout(followTimer);
           followTimer=window.setTimeout(function () {
               window.clearTimeout(followTimer);
               if(step===0){
                   $wrapper[0].style.webkitTransitionDuration='0s';
                   $wrapper.css('left',-winW*(count-2));
                   step=count-2;
                   lazyImg();
                   liIndex(step-1);
               }
               if(step===count-1){
                   $wrapper[0].style.webkitTransitionDuration='0s';
                   $wrapper.css('left',-winW);
                   step=1;
                   lazyImg();
                   liIndex(step-1);
               }
           },300)
       }
   }

    function init() {
           count=$slideList.length;
            //init css style
        minL=-($slideList.length-1)*winW;
        $wrapper.css('width',$slideList.length*winW);
        $slideList.css('width',winW);
        lazyImg();
        //swipe on slide
        $banner.on('touchstart',dragStart).on('touchmove',dragIng).on('touchend',dragEnd);



    }
    //图片延迟加载 当前活动快与相邻的活动块进行加载
    function lazyImg() {
        var $cur=$slideList.eq(step),
              $tar=$cur.add($cur.prev()).add($cur.next());

        $tar.each(function (index,item) {

            var $img=$(item).children('img');
            if($img.attr('isLoad')==='true'){
                //attr 获取或存储的属性值都是一个字符串
                return;
            }
            var oImg=new Image;
            oImg.src=$img.attr('data-src');
            oImg.onload=function () {
                $img.attr({
                    src:this.src,
                    isLoad:true
                }).css('display','block');
               oImg=null;
            }
        })

    }
    return{
        init:init
    }
})();
bannerRender.init();
