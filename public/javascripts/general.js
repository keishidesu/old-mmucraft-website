var device_width;
var device_height;

$(window).on('load', function(event) {
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});
	device_width = $(window).width();
	device_height = $(window).height();
	//Mobile background
	if (device_width <= 768) {
		$('body').css("background-size", "auto " + (device_height+64) + "px");
	}
});