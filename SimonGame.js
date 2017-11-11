var c=["green_active","red_active","yellow_active","blue_active"];
var time=null,arr=[],len;
$("button").click(function(){
   len =1;
  start();
})
$(".item").click(function(){
  var test = $(this).index();
  $("audio")[test].play();
  if (test==arr[0]&&arr.length==1)
    {
      len++;
      start();
    }
  else
    {
      if (test==arr[0])
        arr.shift();
      else
       { 
          $("p").text("xxx");       
         setTimeout(function(){
           start()
         },500);        
       }
    }
})
function start(){
  $("p").text(len)
  var i=0;
  arr=[];
  for (var j=0;j<len;j++){
    arr.push(Math.floor(Math.random()*4));   
  }
  time=setInterval(function(){
    if (i<arr.length){
      shine(arr[i]);
      i++;
    }
    else
      clearInterval(time);
  },1000)
}
function shine(ind){//闪烁
  $(".item").eq(ind).addClass(c[ind]);
  $("audio")[ind].play();
  setTimeout(function(){
    $(".item").eq(ind).removeClass(c[ind]);
  },300)
}
