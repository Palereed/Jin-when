// 钟表
window.onload=function(){
      var clock=document.getElementById("clock"),
          drawit=clock.getContext("2d"),
          initialx=100,   //表盘坐标
          initialy=100,  
          radius=90,     //表盘半径
          hlength=radius-45,//时针长度
          mlength=radius-30,
          slength=radius-15;
       setInterval(function (){
           drawit.clearRect(0,0,200,200)
      //表盘代码。
           drawit.beginPath();
           drawit.arc(initialx,initialy,radius,0,Math.PI*2);
           //填充颜色必须定义在绘制图像之前,在其后面定义则会影响不到。fillStyle与strokeStyle。
           drawit.strokeStyle="#3b3b3b";
           //环形渐变
           var colorslow=drawit.createRadialGradient(initialx,initialy,radius,initialx,initialy,radius+5);
           colorslow.addColorStop(0,"#3b3b3b");
           colorslow.addColorStop(1,"white"); //渐变颜色设置。
           drawit.fillStyle=colorslow;
           drawit.fillRect(0,0,200,200);
           drawit.stroke();
      //刻度代码。角度是自己决定的。自己决定哪里为0度,再结合三角函数来进行运算。这里是以右为0度。
           drawit.beginPath();
           for(i=0;i<360;i+=30){
               var kx=initialx+radius*Math.cos(Math.PI*2*i/360); //三角函数只识别弧度,2pi*角度/360。
               var ky=initialy+radius*Math.sin(Math.PI*2*i/360); //随着角度的变化,正负也会改变,这就是三角函数的优势。
               var endx=kx-8*Math.cos(Math.PI*2*i/360); //角度最开始是从最底部,逆时针开始的。
               var endy=ky-8*Math.sin(Math.PI*2*i/360);
               drawit.moveTo(kx,ky);
               drawit.lineTo(endx,endy);
            }
            for(i=0;i<360;i+=6){
               var kx=initialx+radius*Math.cos(Math.PI*2*i/360); 
               var ky=initialy+radius*Math.sin(Math.PI*2*i/360); 
               var endx=kx-3*Math.cos(Math.PI*2*i/360); 
               var endy=ky-3*Math.sin(Math.PI*2*i/360);
               drawit.moveTo(kx,ky);
               drawit.lineTo(endx,endy);
                }
	          drawit.strokeStyle="white";
	          drawit.lineWidth="2";
	          drawit.lineCap="round"; //端点增加修饰。round弧度 square方形 butt默认
	          drawit.stroke();
            //指针中心。
	          drawit.beginPath();
	          drawit.arc(initialx,initialy,12,0,Math.PI*2,true);
	          drawit.fillStyle="white";
	          drawit.fill();
             //时针。  这里是以向上为0度。这样就不用减角度了。
             drawit.beginPath();
             var now=new Date();
             var h=Math.abs(now.getHours()+now.getMinutes()/60)*30;
             var hx=initialx+hlength*Math.sin(Math.PI*2*h/360);
             var hy=initialy-hlength*Math.cos(Math.PI*2*h/360);
             drawit.moveTo(initialx,initialy);
             drawit.lineTo(hx,hy);
             drawit.lineWidth=6;
             drawit.stroke();
             //分针
             drawit.beginPath();
             var m=now.getMinutes()*6;
             var mx=initialx+mlength*Math.sin(Math.PI*2*m/360);
             var my=initialy-mlength*Math.cos(Math.PI*2*m/360);
             drawit.moveTo(initialx,initialy);
             drawit.lineTo(mx,my);
             drawit.lineWidth=6;
             drawit.stroke();
             //秒针
             drawit.beginPath();
             drawit.arc(initialx,initialy,5,0,Math.PI*2,true);
             drawit.fillStyle="red";
             drawit.fill();
             drawit.beginPath();
             var s=now.getSeconds()*6;
             var sx=initialx+slength*Math.sin(Math.PI*2*s/360);
             var sy=initialy-slength*Math.cos(Math.PI*2*s/360);
             drawit.moveTo(initialx,initialy);
             drawit.lineTo(sx,sy);
             drawit.lineWidth=5;
             drawit.strokeStyle="red";
             drawit.stroke();},500)}