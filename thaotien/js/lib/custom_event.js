function custom_event(){
	
}
function showNotice(){
	if(getCookie('cid').length>0){
		var c,x = Math.floor((Math.random() * 9) + 1);
	    var detailurl="cidnotice";
	    detailurl=c=encDat2(detailurl,9);

	    var data='{"code":"'+getCookie("cid")+'"}';
	    data=encDat2(data,5);

	    
	    $.ajax({
	      url: apiurl+detailurl, 
	      type: "POST",
	      data: data,
	      dataType:"text",
	      error: function (request, status, error) {
	          if(request.status==404){
	            console.log(error);               
	          }
	      },
	      success:function(data){
	        if(data!=""){
	          data=data.replace(c,'');        	          
	          ccontent=JSON.parse(window.atob(data));
	          if(ccontent.notice && ccontent.notice!=""){
	          	$('#thongtinkhuyenmaicontent').html(ccontent.notice);
	          	$('#thongtinkhuyenmai').show();
	          }
	          
	        }
	        else{
	          setCookie('cid','',-1);	                    
	          setCookie('cc','',-1);
	          renderPrice('');
	        }
	      }
	    }); 
	}
}
function doRenderPrice(){
	if(getCookie('cid').length>0 && getCookie('cc').length==0){
		var c,x = Math.floor((Math.random() * 9) + 1);
	    var detailurl="cidgetprods";
	    detailurl=c=encDat2(detailurl,9);
	    

	    var data='{"code":"'+getCookie("cid")+'"}';
	    data=encDat2(data,5);

	    
	    $.ajax({
	      url: apiurl+detailurl, 
	      type: "POST",
	      data: data,
	      dataType:"text",
	      error: function (request, status, error) {
	          if(request.status==404){
	            console.log(error);               
	          }
	      },
	      success:function(data){
	        if(data!=""){
	          data=data.replace(c,'');        
	          
	          ccontent=JSON.parse(window.atob(data));  	          	          
	          setCookie('cc',ccontent.discountprods,ccontent['remain']);
	          setCookie('cid',getCookie('cid'),ccontent['remain']);	          
	          renderPrice(ccontent.discountprods);
	        }
	        else{
	          setCookie('cid','',-1);	                    
	          setCookie('cc','',-1);
	          renderPrice('');
	        }
	      }
	    }); 
	}
	else if(getCookie('cc').length>0){		
		renderPrice(getCookie('cc')); 
	}
	else{
		renderPrice(''); 	
	}
	renderBtnAddCart();
}

function renderPrice(ccontentstr){	
	var ccontent={};
	if(ccontentstr.length>0){

		ccontent.discountprods={};
		do{
			var code=ccontentstr.substring(0,3);
			ccontentstr=ccontentstr.substring(3);

			var value='';
			var nextchar=ccontentstr.substring(0,1);
			ccontentstr=ccontentstr.substring(1);
			while(nextchar%1===0){
				value+=nextchar+'';
				nextchar=ccontentstr.substring(0,1);
				ccontentstr=ccontentstr.substring(1);
			}
			ccontent.discountprods[code]={};
			ccontent.discountprods[code].value=value;
			ccontent.discountprods[code].type=nextchar;
		}
		while (ccontentstr.length>0);
	}
	
		
		if(ccontent && ccontent.discountprods){			
			Object.keys(ccontent.discountprods).forEach(function(item,index){
				renderPriceHtml('prod',item,ccontent);				
				if(MyAjax.pagetype=='detail'){
					renderPriceHtml('mprod',item,ccontent);
					showNotice();
				}
			});
		}
}
function renderPriceHtml(divid,item,ccontent){
	var priceEl=document.getElementById(divid+item);
	if(priceEl){
		var dis=ccontent.discountprods[item];
		var oldprice=priceEl.getAttribute("pvalue");
		var price=oldprice;
		if(dis.type=="k")price=price-dis.value;
		else price=price-price*dis.value/100;
		var html='<div class="percent">'+dis.value+'<span class="percentsign">'+dis.type+'</span></div><i class="demo-icon icon-down discounticon" ></i>';
		html+='<div class="priceinfo"><span class="oldprice">'+numberWithCommas(oldprice*1000)+'đ</span><br ><span class="price" >'+numberWithCommas(price*1000)+'đ</span></div>';
		priceEl.innerHTML=html;
		priceEl.setAttribute("class","prodprice2");
	}
}
function renderBtnAddCart(){
	$('.btnBuyNow').on('click',function(e){	
		var code=$(this).attr('id').substr(-3);	
		addCart(code);
		renderPopupCart();
		parseRouting(siteurl+'order/');
		window.scrollTo(0, 0);
			
	});
	$('.btnViewCart').on('click',function(e){			
		parseRouting(siteurl+'order/');
		window.scrollTo(0, 0);
	});


	
	$('.btnAddCart').on('click',function(e){	
		var cart=getCart();	
		var code=$(this).attr('id').substr(-3);	
		
		if(cart.cics.indexOf(code)>-1){
			parseRouting(siteurl+'order/');
			window.scrollTo(0, 0);
		}
		else{
			addCart(code);
			renderPopupCart();
			renderBtnAddCart()
			$(this).removeClass('buttonG');
			$(this).addClass('buttonGr');
			$(this).html('XEM GIỎ HÀNG');
			$('#btn3prod'+code).html('MUA THÊM');
			$('#btn4prod'+code).html('MUA THÊM');
		}		
	});

	var cart=getCart();    
    if(cart.cics.length>0){
    	cart.cics.forEach(function(item,index){
    		$('#btn2prod'+item).removeClass('buttonG');
			$('#btn2prod'+item).addClass('buttonGr');
    		$('#btn2prod'+item).html('XEM GIỎ HÀNG');

    		$('#btn3prod'+item).html('MUA THÊM');
    		$('#btn4prod'+item).html('MUA THÊM');
			
		});
    }    
}