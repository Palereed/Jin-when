var EventUtil={
   //事件绑定
   addHandler:function(element ,event ,handler){
        if(element.addEventListener){
        	element.addEventListener( event ,handler ,false);
        }else if(element.attechEvent){
        	element.attachEvent('on' + event ,handler);
        } else{
       	  element["on"+type]=handler;
        }
      },
   //事件解绑
   removeHandler:function(element , type , handler){
		if(element.removeEventListener){
			element.removeEventListener(type , handler , false)
		} else if(element.detachEvent){
			element.detachEvent( "on" + type , handler);
		} else{
			element["on" + type] = null;
		}
	}
}

var LeftBar = document.getElementById('LeftBar'),
    TheNav = document.getElementsByClassName('TheNav')[0],
    BarPicture = document.getElementsByClassName('OwnPicture')[0],
    TitleLogn = document.getElementsByClassName('TitleLogn')[0],
    MainBody = document.getElementsByClassName('MainBody')[0],
    Islock = document.getElementsByClassName('Islock')[0],
    IsFixBar = document.getElementById('IsFixBar'),
    ShowSelfbtn = document.getElementById('ShowSelfbtn'),
    SelfIntrdct = document.getElementsByClassName('SelfIntrdct')[0],
    ShowMenubtn = SelfIntrdct.getElementsByTagName('img')[0];
    CloseBar = function(){
	    LeftBar.style.cssText='width:0px;transition:width .5s;';
	    TheNav.style.cssText='transform:translateX(-280px);transition:transform .5s;';
	    BarPicture.style.cssText='transform:translateX(-280px);transition:transform .5s;';
	    TitleLogn.style.cssText='transform:translateX(-280px);transition:transform .5s;';
	    MainBody.style.cssText='transform:translateX(0px);transition:transform .5s;';
	} 
	OpenBar  = function(){
	    LeftBar.style.cssText='width:280px;transition:width .5s;';
	    TheNav.style.cssText='transform:translateX(0px);transition:transform .5s;';
	    BarPicture.style.cssText='transform:translateX(0px);transition:transform .5s;';
	    TitleLogn.style.cssText='transform:translateX(0px);transition:transform .5s;';
	    MainBody.style.cssText='transform:translateX(140px);transition:transform .5s;';
	}
	Move = function (e){
		var target = e.relatedTarget ? e.relatedTarget : e.toElement;  
	    while( target && target != this ) target = target.parentNode;  
	    if( target != this ){  
	        CloseBar();
	   }  
	}
	// 导航栏
	var a = true;
	EventUtil.addHandler(IsFixBar,"click",function (){     //解除菜单栏隐藏事件
		if (!a){
			EventUtil.removeHandler(LeftBar,"mouseout",Move);
			Islock.style.cssText = 'transform:rotateY(180deg) translateX(3px);transition:transform .3s;';
			a = true;
		}  else {
			EventUtil.addHandler(LeftBar,"mouseout",Move);
			Islock.style.cssText = 'transform:rotateY(0deg) translateX(0px);transition:transform .3s;';
			a = false;}
	})
	EventUtil.addHandler(window,"mousemove",function (e){
		MouseX = e.clientX;
		if(MouseX < 50){
			OpenBar();
		}
	})
	// 自我介绍
	ShowSelf = function(){
		TheNav.style.cssText='transform:translateY(150%);opacity:0;';
		SelfIntrdct.style.cssText='transform:translateY(-320px);opacity:1;transition-delay:.5s;transition:.5s;';
	}   
	ShowMenu = function(){
		TheNav.style.cssText='transform:translateY(0);opacity:1;transition:.5s;';
		SelfIntrdct.style.cssText='transform:translateY(320px);opacity:0;';
	}
	EventUtil.addHandler(ShowSelfbtn,"click",function (){
		 ShowSelf();
	})
	EventUtil.addHandler(ShowMenubtn,"click",function (){
		 ShowMenu();
	}) 

EventUtil.addHandler(window,"resize",function (){ 
    var Windowidth = document.body.clientWidth;
    var BarWidth = LeftBar.clientWidth;
    if (Windowidth > 1180 && BarWidth == 280){
         MainBody.style.cssText= 'transform:translateX(140px);transition:transform 0s;';
     }
})