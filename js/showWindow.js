$.showWindow = function(options) {
	var params = {
		width: 900,
		height: 550,
		element: '.homestay_list li',
	}
	params = $.extend( params, options )


	var tpl = '<div class="showWindowCover"></div>\
			<div class="showWindow">\
				<a href="JavaScript:;" class="close"></a>\
				<div class="showWindowContent">\
				</div>\
				<a href="JavaScript:;" class="prev"></a>\
				<a href="JavaScript:;" class="next"></a>\
				<a href="JavaScript:;" class="link">立即预定</a>\
			</div>'


	$(document).on('click', params.element, function(){
		var self = $(this);
		var $tpl = $(tpl);
		var id = self.data('id');
		var index = self.index();
		var content = self.find('a').html();

//		content = content.replace( /(.jpg">)|(.png">)|(.gif">)/, function($0){
		//content = content.replace(/(<img.+[^(.jpg">)|^(.png">)|^(.gif">)]+)([.jpg">|.png">|.gif">]+)/, function($0,$1,$2){
		content = content.replace(/(<img.*?)(\.jpg|\.png)/, function($0,$1,$2){
			return $1 + '_showWindow' + $2
		});

		$tpl.find('.showWindowContent').html(content);
		$tpl.find('.link').data('id',id);
		$tpl.find('.prev').data('index',index-1);
		$tpl.find('.next').data('index',index+1);
		$('body').append( $tpl );
		$tpl.fadeIn(500);
	}).on('click', '.showWindow .prev', function(){
		var self = $(this);
		var index = self.data('index');
		index = index < 0 ? $(params.element).length-1 : index;
		var id = $(params.element).eq(index).data('id');
		var content = $(params.element).eq(index).find('a').html();
		//content = content.replace(/(<img.+[^(.jpg">)|^(.png">)|^(.gif">)]+)([.jpg">|.png">|.gif">]+)/, function($0,$1,$2){
		content = content.replace(/(<img.*?)(\.jpg|\.png)/, function($0,$1,$2){
			return $1 + '_showWindow' + $2
		});
		$('.showWindowContent').hide().html(content).fadeIn(500);
		$('.showWindow .link').data('id',id);
		self.data('index', index-1);
	}).on('click', '.showWindow .next', function(){
		var self = $(this);
		var index = self.data('index');
		index = index >= $(params.element).length ? 0 : index;
		var id = $(params.element).eq(index).data('id');
		var content = $(params.element).eq(index).find('a').html();
		//content = content.replace(/(<img.+[^(.jpg">)|^(.png">)|^(.gif">)]+)([.jpg">|.png">|.gif">]+)/, function($0,$1,$2){
		content = content.replace(/(<img.*?)(\.jpg|\.png)/, function($0,$1,$2){
			return $1 + '_showWindow' + $2
		});
		$('.showWindowContent').hide().html(content).fadeIn(500);
		$('.showWindow .link').data('id',id);
		self.data('index', index+1);
	}).on('click', '.showWindow .close', function(){
		var self = $(this);
		$('.showWindow, .showWindowCover').fadeOut(500,function(){
			$('.showWindow, .showWindowCover').remove();
		})
	}).on('click', '.showWindow .link', function(){
		var self = $(this);
		var id = self.data('id');
		alert(id);
	});
}