$(function () {
  //注册
  $('#Register').find('button').click(function () {
    $.ajax({
      type: 'post',
      url: '/api/visiter/register',
      data: {
        visitname: $('#Register').find('[name="visitname"]').val(),
        visitmark: $('#Register').find('[name="visitmark"]').val(),
        visitpass: $('#Register').find('[name="visitpass"]').val(),
        visitimg: $('#Register').find('img').attr("src"),
        visitsafe: $('#Register').find('[name="visitsafe"]').val()
      },
      dataType: 'json',
      success: function (result) {
        var code = result.code;
        switch (code) {
          case 0:
            $('.RegisterBtn').find('i').removeClass().addClass('fa fa-check');
            $('.RegisterBtn').find('div').removeClass().addClass('alert alert-success');
            setTimeout(function () {
              $('#Register').hide();
              $('#Land').show();
            }, 1000);
            break;
          default:
            $('.RegisterBtn').find('i').removeClass().addClass('fa fa-close');
            $('.RegisterBtn').find('div').removeClass().addClass('alert alert-danger');
            break;
        }
        $('.RegisterBtn').find('span').html(result.message);
      }
    })
  })
  //登陆
  $('#Land').find('button').eq(0).click(function () {
    $.ajax({
      type: 'post',
      url: '/api/visiter/land',
      data: {
        visitname: $('#Land').find('[name="visitname"]').val(),
        visitpass: $('#Land').find('[name="visitpass"]').val()
      },
      dataType: 'json',
      success: function (result) {
        var code = result.code;
        switch (code) {
          case 0:
            $('.LandBtn').find('i').removeClass().addClass('fa fa-check');
            $('.LandBtn').find('div').removeClass().addClass('alert alert-success');
            $('.LandInfo').find('span').html(result.visitInfo.visitmark);
            $('.LandInfo').find('img').attr('src', result.visitInfo.visitimg);
            window.location.reload();
            break;
          default:
            $('.LandBtn').find('i').removeClass().addClass('fa fa-close');
            $('.LandBtn').find('div').removeClass().addClass('alert alert-danger');
            break;
        }
        $('.LandBtn').find('span').html(result.message);
      }
    })
  })
  //进入注册界面
  $('#Land').find('button').eq(1).click(function () {
    $('#Land').hide();
    $('#Register').show();
  })
  //进入登陆界面
  $('#Landout').click(function () {
    $('.LandInfo').find('.OnLand').click()
  });
  $('#Landon').click(function () {
    $('.LandInfo').find('.OnLand').click()
  });
  $('.LandInfo').find('.OnLand').click(function () {
    var IsLand = $('.OnLand').find('img').attr('src');
    // 如果未登陆
    if (IsLand == null) {
      $('#Register').hide();
      $('#Land').show();
    } else {
      var IsLandout = confirm('是否注销用户？');
      if (IsLandout) {
        $.ajax({
          url: '/api/visiter/landout',
          success: function (result) {
            if (result.code == 0)
              window.location.reload();
          }
        })
      }
    }
  });
})