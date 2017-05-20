$(function(){
  // 转载信息框
  $('input[name=AddInfo]').click(function(){
      if ($(this).prop('id')=='Reprint'){
        $('.ReprintInfo').slideDown(300);
      } else {
        $('.ReprintInfo').slideUp(300);
      }
    })
  // 导航栏
  function WebTatal(){
      if ($('#WebTatalBtn').prop('className').indexOf('Onslide')>0){
          $('#WebTatalBtn').removeClass('Onslide');
       }
  }
  function Slide(id, par ,pari){
      var Islide = $(id).prop('className').indexOf('active');
             if( Islide > 0){
                $(id).removeClass('active');
                $(par).removeClass('Onslide');
                $(pari).removeClass('SlideDown').addClass('SlideUp');
                $(id).slideToggle(300);
              } else {
                $('.NavContain').find('.Onslide').click();
                $(id).addClass('active');
                $(par).addClass('Onslide');
                $(pari).addClass('SlideDown').removeClass('SlideUp');
                $(id).slideToggle(300);
          }
  }
  $('.NavContain li').click(function(){
        switch ($(this).prop('id')){
           case 'ArticleBtn':
             WebTatal();
             Slide('#Article', '#ArticleBtn', '#ArticleBtn i');
           break;
           case 'RecordBtn':
             WebTatal();
             Slide('#Record', '#RecordBtn', '#RecordBtn i');
           break;
           case 'MessageBtn':
             WebTatal();
             Slide('#Message', '#MessageBtn', '#MessageBtn i');
           break;
           case 'WebTatalBtn':
            $('.NavContain').find('.Onslide').click();
            $('#WebTatalBtn').addClass('Onslide');
           break;
        }
    })
  // 各模块加载
  function FormLoad(cls, id){
  	$(cls).fadeIn(300).siblings().fadeOut(0);
    var inner =  '<i>/</i>' + $(id).children('a').html();
    if (cls.indexOf('Article') > 0){
    	$('.TopFind span').eq(1).html('<i>/</i>文章管理').removeClass('OnIndex');
    	$('.TopFind span').eq(2).html(inner).addClass('OnIndex');
    } else if (cls.indexOf('Record') > 0){
      $('.TopFind span').eq(1).html('<i>/</i>独白管理').removeClass('OnIndex');
    	$('.TopFind span').eq(2).html(inner).addClass('OnIndex');
    } else if (cls.indexOf('Message') > 0){
      $('.TopFind span').eq(1).html('<i>/</i>留言管理').removeClass('OnIndex');
    	$('.TopFind span').eq(2).html(inner).addClass('OnIndex');
    } else {
    	$('.TopFind span').eq(1).html('<i>/</i>网站管理').addClass('OnIndex');
    	$('.TopFind span').eq(2).html(' ');
    }
  }
  $('.FormBtn').click(function(){
      var SetMin = $(window).height()-60;
      $('.MainContain').css({
        minHeight:SetMin,
      })
     switch ($(this).prop('id')){
        case 'ArticleReleaseBtn':
            FormLoad('.ArticleRelease' , '#ArticleReleaseBtn');
        break;
        case 'ArticleListBtn':
            FormLoad('.ArticleList' , '#ArticleListBtn');
        break;
        case 'RecordReleaseBtn':
            FormLoad('.RecordRelease' , '#RecordReleaseBtn');
        break;
        case 'RecordListBtn':
            FormLoad('.RecordList' , '#RecordListBtn');
        break;
        case 'MessageListBtn':
            FormLoad('.MessageList' , '#MessageListBtn');
        break;
        case 'WebTatalBtn':
            FormLoad('.WebTatal' , '#WebTatalBtn');
        break;
     }
  }) 
  $('#WebTatalBtn').click();
})
