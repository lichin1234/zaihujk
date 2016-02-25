//
/**
 * @date 2015-12-22
 **/
var index = function() {
  // 弹出框显示
  var tooltipInit = function () {
    $('.weixin').tooltipster({
			animation: 'swing',
			position: 'right',
			maxWidth: 100,
			contentAsHTML: true,
			content: $('<img src="http://img.zaihujk.com/common/wx_code.png" style="width:100%"/>'),
			// autoClose: false,
			theme: 'my-custom-theme-tooltipster'
		});
  };
  return {
    init: function() {
      tooltipInit();
    }
  }
}();
