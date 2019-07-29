window.onload=function(){
    // 轮播图
    var box=document.getElementsByClassName("pic-pro")[0];
    var ulPic=box.getElementsByClassName("ulPic")[0];
    var picLis=ulPic.children;
    var newLi=picLis[0].cloneNode(true);
    var olCircle=box.getElementsByClassName("circle")[0];
    var circleLis=olCircle.children;
    ulPic.appendChild(newLi);
    var arrowLeft=box.getElementsByClassName("arrow-left")[0];
    var arrowRight=box.getElementsByClassName("arrow-right")[0];
    
    
    // 添加定时器
    var key=0;
    var square=0;
    var timer=null;
    timer=setInterval(autoPlay,4000);
    function autoPlay(){
        key++;
        square++;
        if(key>circleLis.length){
            key=1;
            ulPic.style.left=0;
        }
        animate(ulPic,-key*picLis[0].offsetWidth);
        square=square>circleLis.length-1?0:square;
        for(var i=0;i<circleLis.length;i++){
            circleLis[i].className='';
        }
        circleLis[square].className='current';
    }
    // 鼠标放在圆点上，轮播图片
    for(var i=0;i<circleLis.length;i++){
        circleLis[i].index=i;
        circleLis[i].addEventListener("click",function(){
            for(var j=0;j<circleLis.length;j++){
                circleLis[j].className='';
            }
            this.className='current';
            animate(ulPic,-this.index*picLis[0].offsetWidth);
            key=square=this.index;
        })
        circleLis[i].addEventListener("mouseover",function(){
            for(var j=0;j<circleLis.length;j++){
                circleLis[j].className='';
            }
            circleLis[square].className='current';
            this.className='current';
        })
    }
    // 鼠标移开开启定时器，鼠标放上去开启定时器
    box.onmouseover=function(){
        clearInterval(timer);
    }
    box.onmouseout=function(){
        timer=setInterval(autoPlay,3000);
    }
    // 左右按钮点击
    arrowLeft.addEventListener("click",function(){
        key--;
        square--;
        if(key<0){
            key=circleLis.length-1;
            ulPic.style.left=-circleLis.length*picLis[0].offsetWidth+"px";
        }
        animate(ulPic,-key*picLis[0].offsetWidth);
        if(square<0){
            square=circleLis.length-1;
        }
        for(var i=0;i<circleLis.length;i++){
            circleLis[i].className='';
        }
        circleLis[square].className='current';
    })
    arrowRight.addEventListener("click",function(){
        autoPlay();
    })
}