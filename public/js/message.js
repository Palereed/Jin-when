// 留言回复
var Answer = document.getElementsByClassName('Answer');
for( var i = 0;i<Answer.length;i++){
	Answer[i].onclick = function(){
	    var MessageNow = this.parentNode.nextSibling; 
	        PickUp = this.getElementsByTagName('i')[0];
        // 判断是否为空文本
        while ( MessageNow && MessageNow.nodeType != 1 ){
	    	MessageNow = MessageNow.nextSibling;
	    }  
	    //留言回复表单
	    var AnswerForm = MessageNow.getElementsByClassName('AnswerForm')[0],
	        ShowForm = AnswerForm.getElementsByTagName('span')[0],
	        TheForm = AnswerForm.getElementsByTagName('form')[0];
	        ShowForm.onclick = function(){
	        if (ShowForm.className.indexOf('active') > 0){
	           ShowForm.className = 'Answerit';
               TheForm.style.display = 'none';
               ShowForm.innerHTML = '我要回复';
	        } else {
               ShowForm.className += ' active';
               TheForm.style.display = 'block';
               ShowForm.innerHTML = '稍后回复';
	          }
	     }
        //留言回复展示
	    if ( MessageNow.className.indexOf('active') > 0){
	    	MessageNow.className = 'AllAnswer';
	    	MessageNow.style.display = 'none';
	    	PickUp.innerHTML = Num;
	    	//关闭回复表单
	    	if (ShowForm.className.indexOf('active') > 0){
	    		ShowForm.onclick();}
	    } else {
	    	MessageNow.className += ' active';
	    	MessageNow.style.display = 'block';
	    	Num = PickUp.innerHTML;  //保存回复数量值
	    	PickUp.innerHTML = '收起';
	    }
	}
}

// 头像选择  
var ShowImg = document.getElementById('ShowImg'),
    ImgChoose = document.getElementById('ImgChoose'),
    WhichImg = ImgChoose.getElementsByTagName('img'),
    IsChoose = true;
    ShowImg.onclick = function(){
	   if(IsChoose){
		  ImgChoose.style.display = 'block';
		  IsChoose = false;
	   } else {
		  ImgChoose.style.display = 'none';
		  IsChoose = true;
	    }
    }
    for (var j=0 ;j<WhichImg.length;j++){
	  WhichImg[j].onclick = function(){
		  var Imgsrc = this.getAttribute('src');
		  ShowImg.setAttribute('src',Imgsrc);
		  ImgChoose.style.display = 'none';
		  IsChoose = true;
	}
}