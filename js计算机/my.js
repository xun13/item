$("button").click(function(){
  var value = $(this).val()
  if (value!=="ac"&&value!=="ce"&&value!=="=")
    {
      value=$("input").val()+value;
      $("input").val(value)
    }
  if (value=="ac")
     $("input").val("")
  if (value=="ce")
    {
      value=$("input").val();
      value = value.substring(0,value.length-1);
       $("input").val(value)
    }
  if (value=="=")
    {
      
    }
})