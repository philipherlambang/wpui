(function($) {
	function pageIsSelectmenuDialog(page) {
		var isDialog = false;
		var id = page && page.attr('id');

		$('.filterable-select').each(function() {
			if ($(this).attr('id') + '-dialog' === id) {
				isDialog = true;
				return false;
			}
		});

		return isDialog;
	}

	$.mobile.document.on('selectmenucreate', '.filterable-select', function(event) {
		var input;
		var selectmenu = $(event.target);
		var list = $('#' + selectmenu.attr('id') + '-menu');
		var form = list.jqmData('filter-form');

		if (!form) {
			input = $('<input data-type="search"></input>');
			form = $('<form></form>').append(input);

			input.textinput();

			list.before(form).jqmData('filter-form', form);
			form.jqmData('listview', list);
		}

		selectmenu.filterable({ input: input, children: '> option[value]' }).on('filterablefilter', function() {
			selectmenu.selectmenu('refresh');
		});

	}).on('pagecontainerbeforeshow', function(event, data) {
		var listview;
		var form;

		if (!pageIsSelectmenuDialog(data.toPage)) {
			return;
		}

		listview = data.toPage.find('ul');
		form = listview.jqmData('filter-form');

		data.toPage.jqmData('listview', listview);

		listview.before(form);

	}).on('pagecontainerhide', function(event, data) {
		var listview;
		var form;

		if (!pageIsSelectmenuDialog(data.toPage)) {
			return;
		}

		listview = data.prevPage.jqmData('listview');
		form = listview.jqmData('filter-form');

		listview.before(form);
	});

})(jQuery);

$(document).on('pagecontainercreate', function() {
	$(window).load(function() {
		$('.def-thumb').masonry({
			itemSelector: '.item'
		});
	});
});
