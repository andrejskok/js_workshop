jQuery(document).ready(function($)
{
	$('select').each(function()
	{
		/**
		 *  create the definition lists from the select elements
		 */
		var source = $(this),
			selected = source.find("option[selected]"),
			options = $("option", source),
			dropdown_id = 'dropdown-' + source.attr('name'),
			dropdown;

		source.hide();
		source.after('<dl id="'+ dropdown_id +'" class="dropdown"></dl>');

		dropdown = $('#'+dropdown_id);
		dropdown.append(
			'<dt><a href="#">' + (selected.text() || '&nbsp;') +
			'<span class="value">' + selected.val() +
			'</span></a></dt>'
		);
		dropdown.append('<dd><ul></ul></dd>');

		options.each(function()
		{
			if ( $(this).val() )
			{
				dropdown.find('dd ul').append(
					'<li><a href="#">' +
				    $(this).text() + '<span class="value">' +
				    $(this).val() + '</span></a></li>'
				);
			}
		});


		/**
		 * toggle the dropdown when clicked on it
		 */
		dropdown.find('dt a').click(function()
		{
			$(".dropdown dd ul").hide();
			dropdown.find('dd ul').toggle();
			return false;
		});


		/**
		 * selects the clicked value in the actual select element
		 */
		dropdown.find('dd ul li a').click(function()
		{
			var text = $(this).html(),
				name = dropdown.attr('id').split('dropdown-')[1],
				source = $('select[name="'+name+'"]');

			dropdown.find('dt a').html(text);
			dropdown.find('dd ul').hide();

			source.val( $(this).find("span.value").html() );
		});
	});


	/**
	 * hide dropdowns when clicked on document
	 */
	$(document).bind('click', function(e)
	{
		var $clicked = $(e.target);

		if ( !$clicked.parents().hasClass("dropdown") )
		{
			$(".dropdown dd ul").hide();
		}
	});
});