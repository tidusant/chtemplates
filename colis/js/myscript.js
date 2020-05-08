function Myscript() {
	var cartcount=0;
	this.init = function() {
		cartcount=sysCartCount();
		if(cartcount==0){
			$(".menucarthover").css("display","none");
		}
		$('#header__icon').click(function(e){	
			window.scroll(0,0);
			$('body').toggleClass('with--sidebar');
		});  
		$('#mainmenu').hover(function(e){
			$('#plugin_menuCat').attr('style','');	
		});
		this.initFunc();
	};

	this.initFunc=function(){
		$('.senumcit').off("change");
		$('.senumcit').on("change",function(e){					
			changeCart($(this).attr("data-id"),$(this));
		});

		$('.btnrmcit').off("click");
		$('.btnrmcit').on("click",function(e){					
			removeCart($(this).attr("data-id"));
		});

		$('.btnAddCart').off("click");
		$('.btnAddCart').on("click",function(e){		

			isReload=false;
			sysAddCart($(this).attr("data"),1);
			$(this).removeClass("buttonG");
			$(this).addClass("buttonGr");
			$(this).text("XEM GIỎ HÀNG");
			$(this).off("click");
			$(this).on("click",function(){
				sysRedirect(siteurl +'cart/');
			});

			var newitem=$("#plugin-dataCart #itemsample").clone();
			newitem.removeAttr("id");
			newitem.find("#NOICart").text(1);
			newitem.find(".carttitle").text($(this).attr("data-name"));
			newitem.find(".carttitle").attr("href",siteurl+$(this).attr("data")+"/");
			newitem.find(".cartimg img").attr("src",Imageurl+$(this).attr("data-avt"));
			newitem.find(".cartimg").attr("href",siteurl+$(this).attr("data")+"/");
			newitem.find(".cartimg").attr("title",$(this).attr("data-name"));
			newitem.css("display","block");
			newitem.addClass("itemincart");
			newitem.addClass("cartitem_"+$(this).attr("data"));
			newitem.insertBefore("#plugin-dataCart #itemsample");

			var total=1*numberFormat($("#plugin-dataCart #cartsum").html());
			$("#plugin-dataCart #cartsum").html(numberFormat(total+~~($(this).attr("data-price")),3,"."));
			
			$(".notifyCount .notifymessage").html(~~($(".notifyCount .notifymessage").html())+1);

			$(".menucarthover").css("display","block");
		}); 

		$('.btnViewCart').off("click");
		$('.btnViewCart').on("click",function(e){		
			sysRedirect(siteurl +'cart/');
		});

		$('#btnSubmitCart').off("click");
		$('#btnSubmitCart').on("click",function(e){		

			var address=document.getElementById('address');
			var name=document.getElementById('name');
			var phone=document.getElementById('phone-submit');
			var note=document.getElementById('note-submit');

			if(address.value.length==0 || address.value.trim()==""){
				alert('Vui lòng nhập địa chỉ để shop có thể giao hàng cho bạn!');	
				address.focus();	
				return;
			}
			else if(name.value.length==0 ||name.value.trim()==""){
				alert('Vui lòng nhập tên người nhận hàng!');
				name.focus();
				return;
			}
			else if(phone.value.length==0 || phone.value.trim()==""){
				alert('Vui lòng nhập số điện thoại để shipper có thể liên lạc giao hàng!');
				phone.focus();
				return;
			}
			else if(!validatePhone(phone.value)){
				alert('Số điện thoại không hợp lệ');
				phone.focus();
				return;
			}
			var submitinfo={address:address.value,name:name.value,phone:phone.value,note:note.value};
			
			sysSubmitCart(submitinfo,function(data){
				if(data.status=="1"){
					$('#contactform').hide();
					$('#thankyou').show();					
					clearCart();


				}else{
					var error=data["error"];
					if(error=="address empty"){
						alert('Vui lòng nhập địa chỉ để shop có thể giao hàng cho bạn!');
					}else if(error=="name empty"){
						alert('Vui lòng nhập tên người nhận hàng!');
					}else if(error=="phone empty"){
						alert('Vui lòng nhập số điện thoại để shipper có thể liên lạc giao hàng!');
					}else if(error=="phone notvalid"){
						alert('Số điện thoại không hợp lệ');
					}else if(error!=""){
						alert(error);
					}
				}	
			});
			

		});
	};
	function validatePhone(phone) {    
	    var newphone=phone.replace(/[^0-9]/g, "");
	    if(newphone.length!=phone.length)return false;
	    if(phone=="" || !phone)return false;
	    return (phone.substr(0,2)+""=="09" && phone.length==10) || (phone.substr(0,2)+""=="01" && phone.length==11);
	}

	function removeCart(slug){
		var items=$(".cartitem_"+slug);
		var item=items[1];
		var itemprice=~~$(item).attr("data-num")*~~$(item).attr("data-price");
		
		var total=1*numberFormat($("#plugin-dataCart #cartsum").html());
		total=total-itemprice;
		var carttotal=total;
		var itemcount=~~$(".notifyCount .notifymessage").html();
		var itemremovecount=~~$(item).attr("data-num");
		var cartshipfee={{shipfee}};
		if(total>={{freeship}}){
			cartshipfee=0;
		}		
		$("#plugin-dataCart #cartsum").html(numberFormat(total,3,"."));
		$(".carttemptotal").html($("#plugin-dataCart #cartsum").html());	
		$(".notifyCount .notifymessage").html(itemcount-itemremovecount);

		if(itemcount-itemremovecount<=0){
			cartshipfee=0;
			$(".menucarthover").css("display","none");
		}
		carttotal=total+cartshipfee;
		$(".shipfee").html(numberFormat(cartshipfee,3,"."));
		$(".carttotal").html(numberFormat(carttotal,3,"."));

		isReload=false;
		sysRemoveCart(slug);
		items.remove();		
	}

	function clearCart(){
		$(".notifyCount .notifymessage").html(0);
		$("#plugin-dataCart #cartsum").html("0");
		$('.itemincart').remove();
		$(".menucarthover").css("display","none");
		sysClearCart();
	}

	function changeCart(slug,obj){
		var $itemparent=$(obj).parent().parent();
		
		var price=$itemparent.attr("data-price");		
		var olditemprice=price*$itemparent.attr("data-num");
		var newitemprice=price*$(obj).val();

		var total=1*numberFormat($("#plugin-dataCart #cartsum").html());
		total=total-olditemprice+newitemprice;
		var carttotal=total;
		var cartshipfee={{shipfee}};
		if(total>={{freeship}}){
			cartshipfee=0;
		}
		carttotal=total+cartshipfee;
		$(".shipfee").html(numberFormat(cartshipfee,3,"."));
		$(".carttotal").html(numberFormat(carttotal,3,"."));

		$itemparent.find("#itemprice").html(numberFormat(newitemprice,3,"."));
		$("#plugin-dataCart #cartsum").html(numberFormat(total,3,"."));
		$(".carttemptotal").html($("#plugin-dataCart #cartsum").html());	
		$(".notifyCount .notifymessage").html(~~($(".notifyCount .notifymessage").html()-$itemparent.attr("data-num")+~~$(obj).val()));
		
		$(".cartitem_"+slug).attr("data-num",$(obj).val());	
		$(".cartitem_"+slug+" span#NOICart").html($itemparent.attr("data-num"));
		$('.senumcit[data-id="'+slug+'"]').val($(obj).val());
		isReload=false;
		sysAddCart(slug,$(obj).val());
	}
}
var msc = new Myscript();
