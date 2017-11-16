var char1,char2;//char1为人挑选的角色，char2为机器挑选的角色
var arr = [[0,0,0],
           [0,0,0],
           [0,0,0]];//记录结果
$("button").click(function(){
  char1 = $(this).val();
  char2 = $(this).prev().val()||$(this).next().val();
  $("p").text("你的角色为"+char1);
})
$("input").click(function(){ 
  if (char1)
 { 
   $(this).val(char1); 
  var ind = $(this).index();
  arr[Math.floor(ind/3)][ind%3]=10; 
	 var obj = pick(arr);
   var out = find(obj);
	 var i = Number(out.substring(0,1));	
	 var j = Number(out.substring(2));
	 arr[i][j]=1;
	 $("input").eq(i*3+j).val(char2);
 } 
 else
   alert("请挑选角色");
})
function pick(arr){ 
var obj = {};
  function count(arr,spot){
    var i =spot[0];
    var j= spot[1];
    obj[spot]=[arr[i][0]+arr[i][1]+arr[i][2]];
    obj[spot].push(arr[0][j]+arr[1][j]+arr[2][j]);
    if (i==j)
       obj[spot].push(arr[0][0]+arr[1][1]+arr[2][2]);
    if (i==2-j)
      obj[spot].push(arr[0][2]+arr[1][1]+arr[2][0]);
  }
for (var i=0;i<3;i++){
  for (var j=0;j<3;j++){
    if (!arr[i][j])
      {
        arr[i][j]=1;
        count(arr,[i,j]);
        arr[i][j]=0;
      } 
  }
}
	return obj;
}
function find(obj){
  var i=0;
    var max =0 ;
  for (var x in obj)
    {
      var cnt = sum(obj[x]);
      if (x.substring(0,1)==x.substring(2))
        cnt += 0.5;
      if (x.substring(0,1)==2-x.substring(2))
        cnt += 0.5;
      if (max<cnt){
        i=x;
        max=cnt;
      } 
   } 
  return i;    
  }
function sum (a){
  var arr=[3,21,2]; 
  var cnt=0;
  for (var i in a){
    if (a[i]==3)
      cnt +=3;
    if (a[i]==21)
      cnt +=2;
    if (a[i]==2)
      cnt +=1;
  }
  return cnt;  
}