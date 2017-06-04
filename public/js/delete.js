$(function(){
    $('#DeleteIt').find('button').eq(0).click(function(){
       var  IsDelete = confirm('是否确定删除？');
       if (IsDelete){
          $.ajax({
              type: 'post',
              dataType: 'json',
              success:function(result){
                var code = result.code;
                switch (code){
                  case 0:
                      $('.WarningHold').find('i').removeClass().addClass('fa fa-check');
                      $('.WarningHold').find('div').removeClass().addClass('alert alert-success')
                  break;
                  default:
                      $('.WarningHold').find('i').removeClass().addClass('fa fa-close');
                      $('.WarningHold').find('div').removeClass().addClass('alert alert-danger')
                  break;
                }
                $('.WarningHold').find('span').html(result.message);
             }
          })
       }
    })
})