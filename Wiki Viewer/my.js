$(document).ready(function(){
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(25,25,22,0,2*Math.PI);
ctx.strokeStyle="#96B97D";
ctx.lineWidth=3;
ctx.stroke();
  $("input").hide();
$("canvas").mousedown(function(){
  $("canvas").hide();
  $("input").show();
})
  $("input").mouseout(function(){
      if (!$("input").val())
      {
     $("canvas").show();
     $("input").hide();
        $("div#result").empty();
        $("div#content").animate({marginTop:'100px'},"slow");
      }          
  })
   $("input").keydown(function(event){ 
        if (event.which==13)
         search();
  });
   function search(){
    var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=';
    url = url+$("input").val();
    $.ajax({
      url:url,
      dataType:"jsonp",
      jsonp:"callback",
      success:function(result){
        $("div#result").empty();
        var data = result.query.pages; 
        var arr =Object.keys(data); 
        $("div#content").animate({marginTop:'5px'},"slow");
      for (var i=0;i<arr.length;i++){
        var h4 = $("<h4></h4>").text(data[Number(arr[i])].title);
        var p = $("<p></p>").text(data[Number(arr[i])].extract);
         var span = $("<div class='item'></div>").html(h4);
        span.append(p);
        $("div#result").append(span);
       }
       $("div.item").click(function(){
       var  link = "https://en.wikipedia.org/?curid="+arr[$(this).index()];         
          window.open(link);     
        })
      }
    })
  }  
});
