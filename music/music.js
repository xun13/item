var prevSong   =  {}, 
    nextSong   =  {},                
    player     = $("#player").get(0),
    songCount  = $("#song-count"),
    songLength = $("#song-length"),
    songBar    = $("#song-bar"),
    musicLog   = $(".music")[0];

getPosition();
getNewSong();
player.volume = 0.1;
 /**初始化得到位置**/
function getPosition(){
    var left = $(".music").offset().left+"px";
	var top = $(".music").offset().top+$(".music").get(0).offsetHeight+"px";
	$(".music-main").css("top",top);
	$(".music-main").css("left",left);
	
}

 /**得到新歌曲**/
function getNewSong(){
	prevSong = nextSong;
	$.ajax({
		  url:'http://api.jirengu.com/fm/getSong.php',
		  success:function(data){
		    nextSong = JSON.parse(data).song[0];
		    $("#player").attr("src",nextSong.url);	   
		    $(".music-back").css("background-image","url("+nextSong.picture+")"); 	 
		    $("#music-artist").text(nextSong.artist);
  	        $("#music-title").text(nextSong.title);
		  }
	    });	   
}

/**准备完毕播放音乐**/
player.oncanplay=function(){
	player.play();
	$("#changeState").attr("class","fa fa-pause-circle");
};

/**显示音频长度**/
player.ondurationchange = function(){
   songLength.text(transTimeToStr(player.duration));  
}

/**显示音频播放进度**/
player.ontimeupdate = function(){
  songCount.text(transTimeToStr(player.currentTime));
  var playLength = (200*player.currentTime/player.duration).toFixed(2)+"px";
  songBar.width(playLength);
}

/**播放结束播放下一首**/
player.onended=function(){
  getNewSong();
}

/**得到上一首歌**/
function getPrevSong(){
      $("#player").attr("src",prevSong.url);	   
	  $(".music-back").css("background-image","url("+prevSong.picture+")"); 
      $("#music-artist").text(prevSong.artist);
  	  $("#music-title").text(prevSong.title);
}

/**切换播放和暂停状态**/
function toggleStatus(){
	if (player.paused){
       player.play();
       $("#changeState").attr("class","fa fa-pause-circle");
	}else{
       player.pause();
       $("#changeState").attr("class","fa fa-play-circle");
	}
}

/**改变时间秒格式到字符串格式**/
function transTimeToStr(time){
   var mintue = Math.floor(time/60);
       if (mintue<10)
       	mintue = 0 + String(mintue);
       var second = Math.floor(time%60);
       if (second<10)
       	second = 0 + String(second);
       return mintue+":"+second;
}

/**点击进度条改变播放进度**/
$(".music-bar").click(function(e){
  var clientWidth = e.clientX-songBar.offset().left;
  songBar.width(clientWidth);
  var clientLength = (clientWidth*player.duration/200).toFixed(2);
  player.currentTime = clientLength;
})

/**改变音量**/
$(".music-volume-bar").click(function(e){
  var clientWidth = 100-e.clientY+$(".music-volume-bar").offset().top;
  $(".volume-bar").width(clientWidth);
  var clientLength = (clientWidth/100).toFixed(2);
  player.volume = clientLength;
  $(".music-volume-bar").hide();
})

/**显示/隐藏音量条**/
$("#music-volume").mouseenter(function(){
	$(".music-volume-bar").show();
});


/**显示音乐框**/
$(".music").click(function(){
	$(".music-main").slideToggle();
})

/**拖动音乐控件改变位置**/
musicLog.ondragend=function(e){
  var x = e.clientX;
  var y = e.clientY;
  musicLog.style.left = x +"px";
  musicLog.style.top = y+"px" ;
  getPosition();
}