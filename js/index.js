window.onload=function(){
var height=document.getElementsByClassName('bar')[0].offsetHeight;
var jump=document.getElementsByClassName('jump')[0];
var content=document.getElementsByTagName("iframe")[0];
var barBott=document.getElementsByClassName("bar-bot")[0];
var barRed=document.getElementsByClassName("bar-red")[0];

// top键的出现
 window.onscroll=function(){
            if(window.scroll().top>height){
                jump.style.display="block";
            }else{
                jump.style.display="none";
            }
		}
		
// 导航栏点击
var barUl=document.getElementsByClassName("bar-choose")[0];
var barLis=barUl.getElementsByTagName("li");
var barArrow=barUl.getElementsByTagName("i")[0];
for(var i=0;i<barLis.length;i++){
	barLis[i].index=i;
	barLis[i].addEventListener("click",function(){
		animate(barArrow,barLis[this.index].offsetLeft+barLis[this.index].offsetWidth/2);
		if(this.index!=0){
			barBott.style.display="none";
		}
		if(this.index==0){
			barBott.style.display="block";
			barRed.style.height=0;
			content.src="./findmusic.html";
			content.style.height="1739px";
		}else if(this.index==1){
			content.src="./mymusic.html";
			content.style.height="700px";
		}else if(this.index==2){
			content.src="./friend.html";
			content.style.height="700px";
		}
	})
}


// 音乐播放器的锁定
var musicbar=document.querySelector('.musicbar');
var kBlock=musicbar.querySelector('.k-block');
var bool=true;
musicbar.addEventListener('mouseover',function(){
    musicbar.style.bottom=0;
})

kBlock.addEventListener('click',function(){
    if(kBlock.style.backgroundPosition=="-100px -380px"){
        kBlock.style.backgroundPosition="-80px -380px";
        musicbar.style.bottom='-45px'
    }else{
        kBlock.style.backgroundPosition="-100px -380px";
        musicbar.style.bottom=0;
    }
})





// 音乐播放器
var audio=document.getElementById('audio');
var startBtn=document.getElementsByClassName("startBtn")[0];
var currProgress=document.getElementsByClassName("curr-progress")[0];
var switchPro=document.querySelector('.switch');
var currTime=document.querySelector('.curr-time');
var totalTime=document.querySelector('.total-time');
var progress=document.querySelector('.progress');
var play=document.querySelector('.play');
var playitem=document.querySelector('.playitem');

// 通过点击开始播放按键，实现音乐的暂停/播放
   startBtn.onclick=function(){
      if(audio.paused){
          audio.play();
          startBtn.style.backgroundPosition="0 -167px";
      }else{
          audio.pause();
          startBtn.style.backgroundPosition="0 -206px";
      }
   }
   
//    点击移动开关
   progress.addEventListener('mousedown',function(event){
          // 鼠标的位置
      event=event||window.event;
      var pagex=event.pageX||scroll().top+event.clientY;
      // 鼠标在盒子里的位置
      var x=pagex-progress.offsetLeft-play.offsetLeft;
    
      // 改变开关和当前进度条的位置
      switchPro.style.left=-13+x+'px';
      currProgress.style.width=x/progress.offsetWidth*100+'%';
      // 改变当前播放时间
      audio.currentTime=x/progress.offsetWidth*audio.duration;
  
   })


   audio.ontimeupdate=function(){
    //    总时间
	   var Ttime=audio.duration;
	   var mm=Math.floor(Ttime%3600/60);
	   var ss=Math.floor(Ttime%60);
	   mm=mm>10?mm:'0'+mm;
	   ss=ss>10?ss:'0'+ss;
	   totalTime.innerHTML=mm+':'+ss;
 
    //    当前时间
       var Ctime=audio.currentTime;
       var m=Math.floor(Ctime%3600/60);
       var s=Math.floor(Ctime%60);
       m=m>10?m:'0'+m;
       s=s>10?s:'0'+s;
       currTime.innerHTML=m+':'+s;
    
       //    动态改变进度条
       var value=Ctime/Ttime;
       currProgress.style.width=value*100+"%";
       switchPro.style.left=-13+currProgress.offsetWidth+"px";
       if(Ctime==audio.duration){
        startBtn.style.backgroundPosition="0 -206px";
       }
   }


}