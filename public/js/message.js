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
if (document.getElementById('ShowImg')){
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
}
$(function(){
	//留言
        $('#Leave').find('button').click(function(){
          $.ajax({
            type: 'post',
            url: '/api/visiter/message',
            data: {
                  content :$('#Leave').find('[name="content"]').val(),
              },
              dataType: 'json',
              success:function(result){
                var code = result.code;
                $('#Leave').find('[name="content"]').val('');
                switch (code){
                  case 0:
                     $('.LeaveBtn').find('i').removeClass().addClass('fa fa-check');
                     $('.LeaveBtn').find('div').removeClass().addClass('alert alert-success');
                     window.location.reload();
                  break;
                  default:
                      $('.LeaveBtn').find('i').removeClass().addClass('fa fa-close');
                      $('.LeaveBtn').find('div').removeClass().addClass('alert alert-danger');
                  break;
                }
                $('.LeaveBtn').find('span').html(result.message);
              }
          })
        })
        //留言回复
        $('.AnswerForm').find('button').click(function(){
            $(this).parents('form').addClass('WarnWhich');
            $.ajax({
            type: 'post',
            url: '/api/message/answer',
            data: {
                  content :$(this).parents('form').find('[name="content"]').val(),
                  messageId :$(this).parents('form').find('[name="messageId"]').val(),
              },
            dataType: 'json',
            success:function(result){
                var code = result.code;
                switch (code){
                  case 0:
                      $('.WarnWhich').find('.WarningHold').find('i').removeClass().addClass('fa fa-check');
                      $('.WarnWhich').find('.WarningHold').find('div').removeClass().addClass('alert alert-success');
                  break;
                  default:
                      $('.WarnWhich').find('.WarningHold').find('i').removeClass().addClass('fa fa-close');
                      $('.WarnWhich').find('.WarningHold').find('div').removeClass().addClass('alert alert-danger');
                  break;
                }
                $('.WarnWhich').find('.WarningHold').find('span').html(result.message);
                $('.WarnWhich').find('textarea').val('');
                renderAnswer(result.data);
                setTimeout(function(){
                    $('.WarnWhich').find('.WarningHold').find('i').removeClass();
                    $('.WarnWhich').find('.WarningHold').find('div').removeClass();
                    $('.WarnWhich').find('.WarningHold').find('span').html('');
                    $('.WarnWhich').removeClass();
                 }, 1000);
             }
          })
        })
        function renderAnswer(answer){
            var html = $('.WarnWhich').parents('.AllAnswer').children('.AnswerHold').html();
            var date = new Date(+new Date(answer.answerTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');   
            html += `<div class="AnswerContain">
                          <div class="ImgContain">
                             <img src="${answer.visiterImg}" class="LetterImg">
                          </div>
                          <div class="LetterContain">
                             <div class="VisitInfo">
                               <span class="VisitName"><a href="#">${decodeURI(answer.visiter)}</a></span> 
                               <span class="TimeContain">回复于 
                                  <b class="VisitTime">${date}</b>
                               </span>
                             </div>
                             <div class="LetterReal">
                               <p>${answer.content}</p>
                             </div>
                          </div>
                          <div class="clearfix"></div>
                      </div>`
            $('.WarnWhich').parents('.AllAnswer').children('.AnswerHold').html(html)
     }
})