
if(document.getElementById('likecontent'))
  document.getElementById('likecontent').style.display='none';
checkcart();
var ccontent='';
function checkcart(){

  try{
    /*check code*/
    var cid=getCookie('cid');
    
    var c,x = Math.floor((Math.random() * 9) + 1);
    var detailurl="cidinfo";
    detailurl=e(detailurl).replace(/=/g,"")+makeid(x);
    var result1 = [];
    var result2 = [];
    for (i = detailurl.length-1; i >=0; i--) {
        if(i%x==0)result1.push(detailurl.charAt(i));
        else result2.push(detailurl.charAt(i));
    }
    var ekey=result1.join("");
    detailurl=ekey+result2.join("");  
    x=e(x).replace(/[=\/]/g,"");
    var l=Math.floor(detailurl.length/2);
    detailurl=c=detailurl.substring(0,l)+x+detailurl.substring(l);

    var data='{"code":"'+getCookie("cid")+'"}';
    x = Math.floor((Math.random() * 5) + 1);  
    data=e(data).replace(/=/g,"")+makeid(x);
    result1 = [];
    result2 = [];
    for (i = data.length-1; i >=0; i--) {
        if(i%x==0)result1.push(data.charAt(i));
        else result2.push(data.charAt(i));
    }
    ekey=result1.join("");
    data=ekey+result2.join("");  
    x=e(x).replace(/[=\/]/g,"");
    l=Math.floor(data.length/2);
    data=data.substring(0,l)+x+data.substring(l);

    
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

          setCookie('cid',cid,ccontent['remain']);
          
          
          
        }
        else{
          setCookie('cid','',-1);          
          
        }
        renderCart();
      }
    }); 
   
  }
  catch(ex){
    
    setTimeout(checkcart,500);
  }
}

function renderCart(){  
    
    var cartsContainer=$('#carts');
    var emptycart=cartsContainer.html();
    var cart=getCart();
    var isValidCart=false;
    
    if(cart.cics.length==0){
      $('#cartempty').show();
      cartsContainer.hide();
      return;
    }    
    $('#cartempty').hide();
    var mobilecart='<div class="mobilecart">';
    var carthtml='<table style="width: 100%;" cellspacing="0" cellpadding="0" border="0" class="cartcontainer"><tbody><tr><th width="53%" align="left" scope="col">Sản phẩm</th><th width="20%" align="center" scope="col">Số lượng</th><th width="12%" align="center" scope="col">Đơn giá</th><th width="15%" align="center" scope="col">Thành tiền</th></tr>';
    var carterror=getCookie('carterror');
    if(carterror){
      setCookie('carterror','',-1);
      if(carterror=='expired'){      
        carthtml+='<div id="carterror">Thành thật xin lỗi bạn '+getCookie('cna')+', chương trình khuyến mãi của shop đã hết hạn.<br/> Mời bạn kiểm tra lại giỏ hàng một lần nữa.<br />Xin cảm ơn bạn đã ủng hộ shop.</div>';  
      }
      else if(carterror=='oldused'){      
        carthtml+='<div id="carterror">Thành thật xin lỗi bạn '+getCookie('cna')+', chương trình khuyến mãi chỉ áp dụng 1 lần cho mỗi khách hàng.<br/> Mời bạn kiểm tra lại giỏ hàng một lần nữa.<br />Xin cảm ơn bạn đã ủng hộ shop.</div>';  
      }
      else if(carterror=='newuser'){      
        carthtml+='<div id="carterror">Thành thật xin lỗi bạn '+getCookie('cna')+', chương trình khuyến mãi chỉ áp dụng cho khách thân thiết.<br/> Mời bạn kiểm tra lại giỏ hàng một lần nữa.<br />Xin cảm ơn bạn đã ủng hộ shop.</div>';  
      }
    }
    

    var total=0;
    
    var discount=0;
    var discounttype='%';
    var shipfee=25;
    var checknew=0;
    var checkold=0;
    var totalprice=0;
    var totalItem=0;

    cart.cins.forEach(function(item,i){
      totalItem+=item*1;
    });

    for(i=0;i<cart.cics.length;i++){   
      totalprice+=prods[cart.cics[i]].price*cart.cins[i];
    }
    
    cart.cics.forEach(function(code,index){
      
      var item=$.extend(true, {}, prods[code]);

      item.num=cart.cins[index];
      item.code=code;
      if(item.num>=0){   
          var newitem={};     
          var discountprods=[];
          var discountprodindex=[];
          var orderbonus=[];
          var needchecknew=0;
          var needcheckold=0;
          
          if(ccontent && ccontent.discountprods[item.code]){
            var giam=0;
            var disprods=ccontent.discountprods[item.code];
            for(i=0;i<disprods.length;i++){
              condrs=checkCond(disprods.conditions,totalprice,totalItem);
              condsatis=condrs[0];
              needchecknew=condrs[1];
              needcheckold=condrs[2];

              if(condsatis){
                disprod=disprods[i];
                if(disprod.discounttype=='%'){
                  giam=Math.ceil(item.price*disprod.discount/100);                  
                }
                else if(disprod.discounttype=='k'){
                  giam=disprod.discount;                  
                }
                
                if(disprod.num<item.num){
                  newitem=$.extend(true, {}, item);
                  newitem.num=disprod.num;
                  newitem.max=disprod.num;
                  newitem.price-=giam;
                  newitem.isnew=true;

                  item.num=item.num-disprod.num;
                  item.max=item.max-disprod.num;
                  newitem.name+=" (giảm "+disprod.discount+disprod.discounttype+")";
                }
                else{
                  item.name+=" (giảm "+disprod.discount+disprod.discounttype+")";
                  item.price-=giam;
                }
                totalprice-=giam*item.num;
                checknew=needchecknew;
                checkold=needcheckold;
                break;
              }  
            }
          }
          

          
          if(newitem.isnew){
            tmp=renderItem(newitem,index);
            carthtml+=tmp[0];
            mobilecart+=tmp[1];
          }
          tmp=renderItem(item,index);
          carthtml+=tmp[0];
          mobilecart+=tmp[1];
          isValidCart=true;

      }
    });

    if(ccontent && ccontent.freeprods){
      for(i=0;i<ccontent.freeprods.length;i++){
        newitem=ccontent.freeprods[i];
        
        condrs=checkCond(newitem.conditions,totalprice,totalItem);
        condsatis=condrs[0];
        checknew=condrs[1];
        checkold=condrs[2];       
        
        if(condsatis){
          if(newitem.name=='ship'){
            shipfee=0;
          }
          else if(prods[newitem.name]){
            newitem.slug=prods[newitem.name].slug;
            newitem.name=prods[newitem.name].name+' (quà tặng)';            
            tmp=renderItem(newitem,-1);
            carthtml+=tmp[0];
            mobilecart+=tmp[1];            
          }
          
        }
      }
    }
    
    if(ccontent && ccontent.notice){
      /*carthtml+='<div id="carterror" style="text-align:left">'+ccontent.notice+'</div>';    */
    }    
    

    carthtml+='<tr class="cartfooter cartfooter1"><td  colspan="2"></td><td style="text-align:right">Tạm tính:</td>';
    carthtml+='<td style="text-align:right;">'+numberWithCommas(totalprice*1000)+'đ</td></tr>';
    mobilecart+='<div class="pricerow" ><span style="float:left">Tạm tính:</span><span class="" style="float:right;width:auto;">'+numberWithCommas(totalprice*1000)+'đ</span><div class="clear"></div></div>';
    
    if(ccontent && ccontent.orderbonus){
      for(i=0;i<ccontent.orderbonus.length;i++){
        bonus=ccontent.orderbonus[i];
        
        condrs=checkCond(newitem.conditions,totalprice,totalItem);
        condsatis=condrs[0];
        checknew=condrs[1];
        checkold=condrs[2];
        
        if(condsatis){
          carthtml+='<tr class="cartfooter cartfooter2"><td  colspan="2"></td><td style="text-align:right">Khuyến mãi:</td>';
          carthtml+='<td style="text-align:right;color:#f00;font-weight:bold;">'+numberWithCommas(bonus.discount)+bonus.discounttype+'</td></tr>';
          mobilecart+='<div class="pricerow" style="margin-top:0px"><span style="float:left">Khuyến mãi:</span><span class="" style="float:right;width:auto;">'+numberWithCommas(bonus.discount)+bonus.discounttype+'</span><div class="clear"></div></div>';
          if(bonus.discounttype=='%')totalprice-=totalprice*bonus.discount/100;
          else if(bonus.discounttype=='k')totalprice-=bonus.discount;
        }
      }      
    }
    if(totalprice>=1000){
      shipfee=0;
    }
    carthtml+='<tr class="cartfooter cartfooter2"><td  colspan="2"></td><td style="text-align:right">Phí ship:</td>';
    carthtml+='<td style="text-align:right;">'+numberWithCommas(shipfee*1000)+'đ</td></tr>';
    mobilecart+='<div class="pricerow" style="margin-top:0px"><span style="float:left">Phí ship:</span><span class="" style="float:right;width:auto;">'+numberWithCommas(shipfee*1000)+'đ</span><div class="clear"></div></div>';
    carthtml+='<tr class="cartfooter cartfooter3"><td  colspan="2"></td><td style="text-align:right">Tổng cộng:</td>';
    carthtml+='<td class="totalprice" style="text-align:right;">'+numberWithCommas((totalprice+shipfee)*1000)+'đ</td></tr>';
    mobilecart+='<div class="pricerow" style="margin-top:0px"><span class="" style="float:left">Tổng cộng:</span><span class="totalprice" style="float:right;width:auto;">'+numberWithCommas((totalprice+shipfee)*1000)+'đ</span><div class="clear"></div></div>';


    carthtml+='</table>';
    mobilecart+='</div>';


    carthtml+='<div class="clear" style="margin-top:20px"> </div>';
    carthtml+='<div id="cart_buttons" style="text-align:center;"><a href="'+siteurl+'"><button class="button buttonR" >Xem thêm</button></a>';
    carthtml+='<a href="'+siteurl+'submit-order/"><button class="button buttonG" >Thanh Toán</button></a></div>';
      
    
    if(isValidCart){
      cartsContainer.html(mobilecart+carthtml);
      setCookie('lal','true',3);
      setCookie('cn',checknew);
      setCookie('co',checkold);
      cart.cics.forEach(function(moditem,modindex){
        
        $(document).on('click','.removeitem'+moditem,function(){
            removeCart(moditem);
            renderCart();
            renderPopupCart();
        });
        $('.senum'+moditem).on('change',function(event){
            modCart(moditem,this.value);
            renderCart();
            renderPopupCart();
        });
        
      });    
      
      /*$('#carts img').css({'width':'40px','position':'relative'});*/
    }
  }

  function checkCond(conds,totalprice,totalItem){
    condsatis=1;
    checknew=0;
    checkold=0;
    if(!conds || conds.length==0)return [condsatis,checknew,checkold];
    conds.forEach(function(cond,condi){
      if(cond.obj=="customer"){
        if(cond.action=="use")                  
          checknew=1;                
        else if(cond.action=="old")                                
          checkold=1;                  
      }
      else if(cond.obj=="order"){
        if(cond.action=="totalprice"){                    
          if(totalprice<cond.value)
            condsatis=0;
        }
        else if(cond.action=="numOfProd"){                    
          if(totalItem<cond.value)
            condsatis=0;
        }
      }  
    });
    return [condsatis,checknew,checkold];


  }

  function renderItem(item,index){
    
    var carthtml='<tr>';
    var mobilecart='<div class="item" >';
    carthtml+='<td valign="left">';
    if(item.slug!='' && item.slug!=undefined){
      carthtml+='<a href="'+siteurl+item.slug+'/"> <span> <img class="noresize" width="40" style="float:left;margin-right:5px;margin-bottom:5px;width:40px !important;" src="'+siteurl+item.slug+'/'+item.slug+'50.jpg" /></span>'+item.name+'</a>';
      mobilecart+='<a class="carttitle" href="'+siteurl+item.slug+'/" >'+item.name+'</a>';
      mobilecart+='<a class="cartimg" href="'+siteurl+item.slug+'/"><img alt="'+item.name+'" src="'+siteurl+item.slug+'/'+item.slug+'50.jpg" /></a>';
    }
    else{
      carthtml+='<img class="noresize" width="40" style="float:left;margin-right:5px;margin-bottom:5px;width:40px !important;" src="'+siteurl+item.slug+'/'+item.slug+'50.jpg" /><strong>'+item.name+'</strong>';
      mobilecart+=item.name+'<img alt="'+item.name+'" src="'+siteurl+item.slug+'/'+item.slug+'50.jpg">';
    }
    carthtml+='</td>';
    mobilecart+='<div class="info"><span class="nop">';
    carthtml+='<td align="center">';

    if(index>=0 && !item.isnew){
      var selecthtml='<select class="senum'+item.code+'">';
      for(i=1;i<10||i<item.num;i++){
        select='';
        if(item.num==i)
          select='selected';
        selecthtml+='<option value="'+i+'" '+select+'>'+i+'</option>';
      }
      selecthtml+='</select>';
      carthtml+=selecthtml;
      mobilecart+=selecthtml;
    }


    carthtml+='<a href="javascript:;" class="removeitem'+item.code+'"><i class="demo-icon icon-cancel-circled2"   style="color: #f00;font-size: 20px;"></i></a>';
    carthtml+='</td>';
    carthtml+='<td align="center">';
    carthtml+='<strong>'+numberWithCommas(item.price*1000)+'đ</strong>';
    carthtml+='</td>';
    mobilecart+='</span><strong>x '+numberWithCommas(item.price*1000)+'đ</strong>';
    mobilecart+='<a href="javascript:;" class="removeitem'+item.code+'"><i class="demo-icon icon-cancel-circled2"   style="color: #f00;font-size: 20px;"></i></a>';
    mobilecart+='</div>';
    mobilecart+='<div class="clear"></div></div>';
    carthtml+='<td align="right">';
    carthtml+='<strong>'+numberWithCommas(item.price*item.num*1000)+'đ</strong>';
    carthtml+='</td>';
   
    return [carthtml,mobilecart];
  }
  function orderRemoveCart(code){
    removeCart(code);
    renderCart();
    renderPopupCart();
  }