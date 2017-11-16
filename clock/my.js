var time =null,gameOn=false;
$("button").click(function(){
  var input = $(this).siblings("input");  
  var value = parseInt(input.val())+parseInt($(this).val()); 
  input.val(value);
})
$(".clock").click(function(){ 
	if (!gameOn)
  {
		if ($(".content").children("p").text()=="BREAK")
     var clock = parseInt($("#break").val());
  else
     var clock = parseInt($("#session").val());
	 start(clock);}
	else
	{
		gameOn=false;
		clearInterval(time);
	}
})
function start(clock){
    $(".mask").height("0%");
  var mintue = clock;
  var second = 0;
  time = setInterval(function(){
    if (second||mintue){
      if (second==0)
        {
          second = 60;
          mintue--;
        }
        second--;
      if (mintue==0)
        {
          $(".mask").height("+=5px");
        }
      var value = mintue+":"+tik(second);
      $(".content").children("input").val(value);
        }
        else
        {
          clearInterval(time);
          $(".mask").height("0%");
          if (clock==$("#session").val())
		   {             $(".content").children("p").text("BREAK");
             start(parseInt($("#break").val()));
           }
        else
		   {             $(".content").children("p").text("SESSION");
             start(parseInt($("#session").val()));	}
        }
  },1000)
		gameOn = true;
}
function tik(i){
  if (i<10)
   i = "0"+i;
  return i;
}