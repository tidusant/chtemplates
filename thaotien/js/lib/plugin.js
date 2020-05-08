function renderPlugin(){
	loadHome();
	
	//loadMenuCat();

}

/*============================HomeData plugin=================================*/

function loadHome(){
	console.log(MyAjax.posturl);
	console.log(siteurl);
	if(MyAjax.posturl==siteurl)	{		
		var url=siteurl+e64('plugins').replace(/[=\/]/g,'')+'/'+e64('homeData'+document.documentElement.lang).replace(/[=\/]/g,'');
		loadPluginData(url,'homeData');
	}
	
}
function loadhomeData(data){
	 
	 var courses=data['content'][0].data.courses;	 
	 var services=data['content'][0].data.services;	 
	 var videos=data['content'][0].data.videos;	 
	 var renderData={0:{data:{courses:courses,videos:videos,services:services},name:'data'}};	
	 var html=renderHtml(renderData,data['html']);	 
	 console.log(renderData);
	 console.log($("#plugin-homeData"));
	 $("#plugin-homeData").html(html);
	 //loadNewsHome();
	 //loadBest();
}
/*============================bestData plugin=================================*/

function loadNewsHome(){
	if(MyAjax.posturl==siteurl)	{		
		var url=siteurl+e64('plugins').replace(/[=\/]/g,'')+'/'+e64('newsHomeData'+document.documentElement.lang).replace(/[=\/]/g,'');
		loadPluginData(url,'newsHomeData');
	}
	
}
function loadnewsHomeData(data){
	 var items=shuffle(data['content'][0].data.posts);
	 items=items.slice(0,8);
	 
	 var renderData={0:{data:{posts:items},name:'data'}};
	 var html=renderHtml(renderData,data['html']);
	 $("#plugin-newsHomeData").html(html);

	 loadAllLink(1);
	 
}
/*============================menuCat plugin=================================*/
function loadMenuCat(){
	var url=siteurl+e64('plugins').replace(/[=\/]/g,'')+'/'+e64('menuCat'+document.documentElement.lang).replace(/[=\/]/g,'');
	loadPluginData(url,'menuCat');
}

function loadmenuCatData(data){	
	var items=data['content'][0].data.cats;	 	 
	 var renderData={0:{data:{cats:items},name:'data'}};	
	 var html=renderHtml(renderData,data['html']);	 
	 $("#plugin_menuCat").html(html);
	 loadDataCart();
}	

/*============================menuCat plugin=================================*/
function loadDataCart(){
	var url=siteurl+e64('plugins').replace(/[=\/]/g,'')+'/'+e64('dataCart'+document.documentElement.lang).replace(/[=\/]/g,'');
	loadPluginData(url,'dataCart');
}
var prods=[];
var cartTemplate='';
function loaddataCartData(data){	
	prods=data['content'][0].data.posts;
	cartTemplate=data['html'];
}	


/*============================main function to get plugin template and data=================================*/
function loadPluginData(url,pluginname){	
	
	if(hist_data[url]==undefined){
		$.ajax({
		    url: url+"?v="+sitev,  
		    type: "GET",
		    data: '',
		    dataType:"text",
		    error: function (request, status, error) {
		        if(request.status==404){
		        	console.log('load '+pluginname+' fail');
		        	
		        }
		    },
			success:function(data){
				mydata=JSON.parse(JXG.decompress(data));
				 //for fb info			 		
				 hist_data[url]=mydata;
				 
				 eval('load'+pluginname+'(mydata);');
				
				
			}
		 });
	}
	else{
		 eval('load'+pluginname+'(hist_data[url]);');
	}
}

