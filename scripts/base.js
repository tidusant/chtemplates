var isReload=true;
function sysRedirect(redirecturl){
	window.location=redirecturl;
}
function sysSubmitCart(info,fn){
	//return "address empty";
	//return "phone empty";
	alert(JSON.stringify(info));
	fn({status:"1",error:"phone emtpy"});
	//return "name empty";
}
function sysAddCart(slug,num){
	$.ajax({
	  type: "POST",
	  url: '/addcart/'+slug+'/'+num,
	  //data: num,
	  success: function(){	  	
	  	if(isReload)
		  location.reload();
	  },
	  //dataType: dataType
	});
}
function sysRemoveCart(slug){
	$.ajax({
	  type: "POST",
	  url: '/removecart/'+slug,
	  //data: num,
	  success: function(){
	  	if(isReload)
		  location.reload();
	  },
	  //dataType: dataType
	});
}
function sysClearCart(){
	$.ajax({
	  type: "POST",
	  url: '/clearcart',
	  //data: num,
	  success: function(){
	  	
	  },
	  //dataType: dataType
	});
}
function sysCartCount() {
	var cc=0;
	$.ajax({
	  type: "POST",
	  url: '/cartcount',
	  async:false,
	  //data: num,
	  success: function(data){
	  	cc=data;
	  },
	  //dataType: dataType
	});
	return cc;
}
function numberFormat(n,denum,de,fixnum,fix) {
	n=(""+n).replace(/[^0-9]/g,"");	
	if(de==undefined||de==''||de==null){
		de=",";
	}

	if(fix==undefined||fix==''||fix==null)fix=de=="."?",":".";
	if(fixnum!=undefined&&fixnum!=''&&fixnum!=null&&fixnum!=0){
		n=(1*n).toFixed(fixnum);
		if(fix!=undefined&&fix!="."){
			n=(""+n).replace(/\./g,fix);
		}
	}else{
		fixnum=-1;
	}
	
	if(denum!=undefined&&denum!=''&&denum!=null&&denum>de.length){
		return n.replace(/./g, function(c, i, a) {	
		    return i && i<(a.length-(fixnum+1)) && c !== fix && ((a.length - i-(fixnum+1)) % denum === 0) ? de + c : c;
		});
	}else{
		return n;
	}
}

//for paging data
function pagerender(pager,page){
	if(page=="prev"){
		if(pager.curpage==1)return;
		page=pager.curpage-1;
	}else if(page=="next"){
		if(pager.curpage==pager.pagecount)return;
		page=pager.curpage+1;
	}
	if(isNaN(page))page=1;
	if(page<1)page=1;
	if(page>pager.pagecount)page=pager.pagecount;
	//=============== render data
	//remove all item
	pager.content.find("[pageitem]").remove();
	//render item
	for(var i=(page-1)*pager.size;i<page*pager.size;i++){
		if(i>=pager.total)break;
		console.log(pager);
		pager.content.find(".pageitemscontent").append(pager.datas[i].html);
	}
	
	//active class for button
	pager.curpage=page;
	pager.content.find(".paging .page-link").removeClass("active");
	pager.content.find(".paging .page-link[pagenum="+pager.curpage+"]").addClass("active");

}
$( document ).ready(function() {
	
	$.each($("[pagesize]"),function(pagerindex,pagecontent){
		var pager={};
		var $pagecontent=$(pagecontent);
		pager.size=$pagecontent.attr("pagesize");
		pager.total=$pagecontent.find("[pageitem]").length;
		
		pager.pagecount=Math.ceil(pager.total/pager.size);
		console.log(pager.total);
		if(pager.pagecount<=1){
			$pagecontent.find(".paging").hide();
			$pagecontent.find(".pageitemscontent").show();
			return;
		}
		pager.curpage=1;
		pager.content=$pagecontent;
		pager.datas=[];
		$.each($pagecontent.find("[pageitem]"),function(itemindex,itemcontent){
			var itemdata={};
			itemdata.html=itemcontent;
			$.each($(itemcontent).find("[pagedata]"),function(i,datacontent){
				var $datacontent=$(datacontent);
				itemdata[$datacontent.attr("pagedata")]=$datacontent.attr("data");
			});
			pager.datas.push(itemdata);
		});
		//render page num
		var pageitem=$pagecontent.find(".paging .pagenum");
		//console.log(pageitem);
		if(pageitem.length>0){
			var $pageitem=$(pageitem[0]);
			pagenum=$pageitem.find(".page-link");
			if(pagenum.length>0){
				pagenum[0].innerHTML=1;
				pagenum[0].setAttribute("pagenum",1);
				for(var i=2;i<=pager.pagecount;i++){
					var $newpageitem=$pageitem.clone();
					$newpageitem.find(".page-link")[0].innerHTML=i;
					$newpageitem.find(".page-link")[0].setAttribute("pagenum",i);
					$newpageitem.insertAfter($pageitem);
					$pageitem=$newpageitem;
				}
			}
		}
		//event
		$.each($pagecontent.find(".paging .page-link"),function(i,pageitem){
			$(pageitem).on("click",function(){				
				if($(this).hasClass("active"))return;
				pagerender(pager,$(this).attr("pagenum"));
			});
		});
		//trigger first page
		pagerender(pager,1);
		pager.content.find(".pageitemscontent").show();
	});
});