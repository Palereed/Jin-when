window.onload = function () {
  var RecordModule = document.getElementsByClassName('RecordModule'),
    TimeEvent = document.getElementsByClassName('TimeEvent')[0],
    Total = 0,
    heightarr = new Array();
  // 将各独白高度push进数组
  for (var i = 0; i < RecordModule.length; i++) {
    Total += RecordModule[i].offsetHeight;
    heightarr.push(RecordModule[i].offsetHeight)
  }
  TimeEvent.style.height = Total - 2 + 'px';
  var numarr = new Array();
  // 递归累加,将各次结果push进数组,并返回数组
  function Add() {
    var result = 0;
    i = 0;
    while (i < heightarr.length - 1) {
      result += heightarr[i];
      numarr.push(result)
      i++;
    }
    return numarr;
  }
  Add();
  // 分配时间轴事件位置
  for (var j = 1; j < RecordModule.length; j++) {
    RecordModule[j].style.top = numarr[j - 1] + 'px';
  }
}
// 时间轴响应式挪动
window.onresize = function () {
  window.onload();
}