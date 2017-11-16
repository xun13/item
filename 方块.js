var arr=["#96B97D","#5CB85C","#7033CC","#946ECC","#FF0059","#808080"]
var clear = false;
function tik(){
  var a =[];
  $("input").css("background-color","#FFA600")
  while (a.length!==3){
    var num = Math.floor(Math.random()*9);
    if (a.indexOf(num)==-1)
      a.push(num);
  } 
 for (var i=0;i<3;i++){  
   var b=Math.floor(Math.random()*6);
   $("input").eq(a[i]).css("background-color",arr[b])
  }
 
 t=setTimeout("tik()",1000);  
}
  $("button#start").click(function(){
    if (clear==false)
      tik()
      clear=true;
})
$("button#end").click(function(){
  clearTimeout(t)
  clear=false
  $("input").css("background-color","#FFA600")
})