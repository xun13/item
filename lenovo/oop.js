;(function($){
  var Tab =function(tab){
  	var _this_ = this;
     this.tab = tab;
     this.tabItems = this.tab.find("li");
     this.btnPrev = this.tab.find("input").eq(0);
     this.btnNext = this.tab.find("input").eq(1);
     this.len = this.tabItems.length;
     this.time = null;
     this.currentInd = -1;
     this.autoPlay();
     this.tabItems.click(function(){
     	_this_.invoke($(this));
     	     })
     this.tab.hover(function(){
        window.clearInterval(_this_.time);
     })
     this.tab.mouseleave(function() {
     	_this_.autoPlay();
     });
     this.btnPrev.click(function(){
     	var ind = _this_.currentInd;
     	var tabItems = _this_.tabItems;
     	if (ind==0)
     		ind = _this_.len;
     	_this_.invoke(tabItems.eq(ind-1));
     	
     });
     this.btnNext.click(function(){
     	var ind = _this_.currentInd;
     	var tabItems = _this_.tabItems;
     	if (ind==_this_.len-1)
     		ind = -1;
     	_this_.invoke(tabItems.eq(ind+1));
     	
     });
  };
  Tab.prototype= {

  	invoke:function(currentTab){
  		this.currentInd = currentTab.index();
  		var ind = currentTab.index()+1;
  		var tabItems = this.tabItems;
  		var img = "url(back"+ind+ ".jpg) no-repeat center center";
  		var tab = this.tab;
  		tab.css("background",img);
        tabItems.eq(ind-1).css("background","white").siblings().css("background","gray");
  	},
  	autoPlay:function(){
  		var _this_=this;
  		var len = this.len;
  		var currentInd = this.currentInd;
  		var tabItems = this.tabItems;
  		this.time = window.setInterval(function(){
  			currentInd++;
  			if (currentInd>=len)
  				currentInd =0; 		 
         _this_.invoke(tabItems.eq(currentInd));         
  		},2500);
  	}

  };
  
  window.Tab = Tab;
})(jQuery);