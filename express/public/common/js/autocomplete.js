// 自动搜索框填充
/**
** @ time 2015-10-09
**/

function strToJSON(str) {
	var json = {};
	if (str) {
		json = $.parseJSON(str);
	}
	return json;
}
var AutoComplete = function() {
	var dcfg = {
		type: 'drug',
		url: '/cms/suggest',
		paramName: 'keyword',
		handle_dom: 'drug-list',
		result_url: '/cms/drug/'
	};
	// 去重
	var arr_unique = function(arr) {
		var result = [], o_hash = {};
		for(var i = 0, elem; (elem = arr[i]) != null; i++){
			if(!o_hash[elem]) {
				result.push(elem);
				o_hash[elem] = true;
			}
		}
		return result;
	};
	// 渲染
	var render_drugitem = function(arr) {
		$('.drug-item').remove();
		if(arr && arr.length){
			$.each(arr,function(i, n){
				var liD = $('<li>',{'class': 'drug-item'}),
						spanD = $('<span>',{text: n}),
						aD = $('<a>',{'class': 'remove-item', 'href': 'javascript:;', 'data-index': i});
				liD.append(spanD).append(aD).appendTo('.drug-box>ul');
				$('.drug-box .nodrug').css('display','none');
			});
			$('.drug-num').text(arr.length);
		}else{
			$('.drug-box .nodrug').css('display','block');
			$('.drug-num').text(0);
		}
		$('.remove-item').on('click',function(){
			var drugarr = $('.drug-box').data('drugArr'),
					rindex = $(this).attr('data-index');
			drugarr.splice(rindex,1);
			render_drugitem(drugarr);
		});
		$('.drug-box').data('drugArr',arr);
	};
	return {
		init: function(cfg) {
			$.extend(dcfg,cfg);
			$('.keyword').autocomplete({
				serviceUrl: dcfg.url,
				paramName: dcfg.paramName,
				transformResult: function(response) {
					var json_rsp = strToJSON(response);
					var obj = $.map(json_rsp,function(n){
						return {value:n};
					});
					return { suggestions:obj};
				},
				onSelect: function(suggestion) {
					if(dcfg.type == 'drug'){
						window.location.href = dcfg.result_url+suggestion.value;
					}else if(dcfg.type == 'info'){

					}else if(dcfg.type == 'interaction'){
						$('.keyword').val('');
						var drugarr = $('.drug-box').data('drugArr') || [];
						if(drugarr.length<5){
							drugarr.push(suggestion.value);
							drugarr = arr_unique(drugarr);
							render_drugitem(drugarr);
						}else{
							$('.tip-more').show().delay(5000).fadeOut();
						}
					}
        }
			});
		}
	}
}();
