$(function () {
  var SetMin = $(window).height() - 60;
  $('.MainContain').css({
    minHeight: SetMin
  })
  // 转载信息框
  $('input[name=addInfo]').click(function () {
    if ($(this).prop('id') == 'Reprint') {
      $('.ReprintInfo').slideDown(300);
    } else {
      $('.ReprintInfo').slideUp(300);
    }
  })
  // 导航栏
  function Slide(id, par, pari) {
    var Islide = $(id).prop('className').indexOf('active');
    if (Islide > 0) {
      $(id).removeClass('active');
      $(par).removeClass('Onslide');
      $(pari).removeClass('SlideDown').addClass('SlideUp');
      $(id).slideToggle();
    } else {
      $('.NavContain').find('.Onslide').click();
      $(id).addClass('active');
      $(par).addClass('Onslide');
      $(pari).addClass('SlideDown').removeClass('SlideUp');
      $(id).slideToggle();
    }
  }
  $('.NavContain li').click(function () {
    switch ($(this).prop('id')) {
      case 'WebTatalBtn':
        Slide('#WebTatal', '#WebTatalBtn', '#WebTatalBtn i');
        break;
      case 'ArticleBtn':
        Slide('#Article', '#ArticleBtn', '#ArticleBtn i');
        break;
      case 'RecordBtn':
        Slide('#Record', '#RecordBtn', '#RecordBtn i');
        break;
      case 'MessageBtn':
        Slide('#Message', '#MessageBtn', '#MessageBtn i');
        break;
    }
  })
})