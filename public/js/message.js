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

//ajax登陆注册功能
$(function(){
	//回复
	$('.AnswerForm').find('button').click(function(){
		var IsLand = $('.LandInfo').find('img').attr('src');
		 // 如果未登陆
		 if( IsLand == '') {
             $('.AnswerBtn').find('i').removeClass().addClass('fa fa-close');
             $('.AnswerBtn').find('div').removeClass().addClass('alert alert-danger');
             $('.AnswerBtn').find('span').html('登陆后回复');
        }
    })
	//留言
	$('#Leave').find('button').click(function(){
		 var IsLand = $('.LandInfo').find('img').attr('src');
		 // 如果未登陆
		 if( IsLand == '') {
             $('.LeaveBtn').find('i').removeClass().addClass('fa fa-close');
             $('.LeaveBtn').find('div').removeClass().addClass('alert alert-danger');
             $('.LeaveBtn').find('span').html('登陆后留言');
             setTimeout(function(){
                $('#Leave').hide();
                $('#Land').show();
             },1000);
		 }
    })
	//注册
	$('#Register').find('button').click(function(){
		$.ajax({
			type: 'post',
			url: '/api/visiter/register',
			data: {
				visitname :$('#Register').find('[name="visitname"]').val(),
		        visitmark :$('#Register').find('[name="visitmark"]').val(),
		        visitpass :$('#Register').find('[name="visitpass"]').val(),
		        visitimg  :$('#Register').find('img').attr("src"),
		        visitsafe :$('#Register').find('[name="visitsafe"]').val()
		    },
		    dataType: 'json',
		    success:function(result){
		    	var code = result.code;
		    	switch (code){
		    		case 0:
		    		   $('.RegisterBtn').find('i').removeClass().addClass('fa fa-check');
                       $('.RegisterBtn').find('div').removeClass().addClass('alert alert-success');
                        setTimeout(function(){
			                $('#Register').hide();
			                $('#Land').show();
			             },1000);
		    		break;
		    		case 1:
		    		   $('.RegisterBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.RegisterBtn').find('div').removeClass().addClass('alert alert-danger')
		    		break;
		    		case 2:
		    		   $('.RegisterBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.RegisterBtn').find('div').removeClass().addClass('alert alert-danger')
		    		break;
		    		case 3:
		    		   $('.RegisterBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.RegisterBtn').find('div').removeClass().addClass('alert alert-danger')
		    		break;
		    		case 4:
		    		   $('.RegisterBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.RegisterBtn').find('div').removeClass().addClass('alert alert-danger')
		    		break;
		    		case 5:
		    		   $('.RegisterBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.RegisterBtn').find('div').removeClass().addClass('alert alert-danger')
		    		break;
		    	}
		    	$('.RegisterBtn').find('span').html(result.message);
		    }
		})
	})
    //登陆
    $('#Land').find('button').eq(0).click(function(){
    	$.ajax({
    		type: 'post',
    		url:'/api/visiter/land',
    		data: {
                visitname :$('#Land').find('[name="visitname"]').val(),
                visitpass :$('#Land').find('[name="visitpass"]').val()
    		},
            dataType: 'json',
            success:function(result){
            var code = result.code;
            switch (code){
		    		case 0:
		    		   $('.LandBtn').find('i').removeClass().addClass('fa fa-check');
                       $('.LandBtn').find('div').removeClass().addClass('alert alert-success');
                       $('.LandInfo').find('span').html(result.visitInfo.visitmark);
                       $('.LandInfo').find('img').attr('src',result.visitInfo.visitimg);
                       setTimeout(function(){
			              $('#Leave').show();
                          $('#Land').hide();
                          $('.AnswerBtn').find('i').removeClass();
			              $('.AnswerBtn').find('div').removeClass();
			              $('.AnswerBtn').find('span').html('');
                          $('.LeaveBtn').find('i').removeClass();
			              $('.LeaveBtn').find('div').removeClass();
			              $('.LeaveBtn').find('span').html('');
			           },1000);
                    break;
		    		case 1:
		    		   $('.LandBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.LandBtn').find('div').removeClass().addClass('alert alert-danger');
		    		break;
		    		case 2:
		    		   $('.LandBtn').find('i').removeClass().addClass('fa fa-close');
                       $('.LandBtn').find('div').removeClass().addClass('alert alert-danger');
		    		break;
                }
		    	$('.LandBtn').find('span').html(result.message);
            }
    	})
    })
    //进入注册界面
    $('#Land').find('button').eq(1).click(function(){
    	$('#Land').hide();
        $('#Register').show();
    })
    //进入登陆界面
    $('.LandInfo').find('.OnLand').click(function(){
    	 var IsLand = $('.LandInfo').find('img').attr('src');
		 // 如果未登陆
		 if( IsLand == '') {
             $('#Leave').hide();
    	     $('#Register').hide();
             $('#Land').show();
        } else {
        	 var  IsLandout = confirm('是否退出当前');
        	 if( IsLandout ){
        	 	$.ajax({
        		url:'/api/visiter/landout',
        		success:function(result){
        			if(result.code == 0)
                    window.location.reload();
                  }
        	    })
        	 }
         }
    });
})