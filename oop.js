 ;(function($){
	
    var Tab =function(tab){
   	var _this_ = this;
   	 this.tab = tab;
   	    this.config = {
                    "triggertype":"click",
                    "effect":"default",
                     "invoke":1,
                     "auto":false
                   };
    
    if (this.getConfig()){
    	$.extend(this.config,this.getConfig());
    	
    }
       this.tabItems = this.tab.find("div.tab-nav li");
       this.contentItems = this.tab.find("div.items div");
       var config = this.config;
       
       if (config.triggertype=="click"){
       	this.tabItems.bind("click",function(){
       		_this_.invoke($(this));
       	});
       }
       else {
       	this.tabItems.mousemove(function(){
           _this_.invoke($(this));
       	})
       }
       if (config.auto){
       	this.timer = null;
        this.loop = 0;
           this.autoPlay(config.auto);
          }
       if (config.invoke>1){
       	this.invoke(this.tabItems.eq(config.invoke-1));
       }
        this.tab.hover(function(){
        	window.clearInterval(_this_.timer);
        },
        function(){
        	_this_.autoPlay(config.auto);
        })
   	};

   	Tab.prototype={

       getConfig:function(){
       	var config = this.tab.attr("data-config");
       	if (config&&config!=""){
       		return $.parseJSON(config);
       	}
       	else
       	{
       		return null;
       	}
      },

      invoke:function(currentTab){
      	var _this_ = this;
      	var index = currentTab.index();
      	var effect = this.config.effect;
      	currentTab.addClass('active').siblings().removeClass('active');
      	if (effect=="default")      
        {
        	this.contentItems.eq(index).addClass('current').siblings().removeClass('current');
        }
	    else
	    {
	      this.contentItems.eq(index).fadeIn().siblings().fadeOut();
	      }
        this.loop = index;
    },
    autoPlay:function(time){
    	var _this_=this;
    	var tabItems = this.tabItems;
    	var config = this.config;
    	var length = tabItems.length;
        this.timer = window.setInterval(function(){
        	if (_this_.loop>=length)
        		_this_.loop=0;
            tabItems.eq(_this_.loop).trigger(config.triggertype);
            _this_.loop++;
        },time);
    }

   	}
   	//init函数
   	Tab.init =function(tabs){
   		var _this_=this;
   		tabs.each(function() {
   			new _this_($(this));
   		});
   	}
   	//注册成jQuery方案
   $.fn.extend({
      tab:function(){
      	this.each(function(){
      		new Tab($(this));
      	});
      	return this;
      }

   });
   
  window.Tab = Tab;
 })(jQuery);