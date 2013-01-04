/*
 * Page Slider: A jQuery plugin to make cool looking sliding panels
 * Version 0.42.108
 * 
 * @URL https://github.com/formigone/pageslider
 */
var PageSlider = function(sliderEl) {
	var slider = sliderEl;
	var panels = $(".pageSliderPanel");
	var width = $(slider).innerWidth();
	var margin = parseInt($(".pageSliderPanel").css("marginLeft")) + parseInt($(".pageSliderPanel").css("marginRight"));
	var scrollDelay = 250;
	var panelStyleName = ".pageSliderPanel";
	var miniPanelStyleName = "pageSliderMiniPanel";
	
	// Element ID that identifies a panel, excluding its integer value
	var panelIndexName = "panel_num_";

	$(panelStyleName).outerWidth(width - margin);

	$(slider).innerWidth(($(panels[0]).outerWidth() + margin) * panels.length);

	function scrollPanel() {
	
		var target = $(this).parent(panelStyleName).next();
	
		if ($(this).attr("data-intent") == "scroll-previous")
			target = $(this).parent(panelStyleName).prev();

		if ($(target)[0] != undefined)
			updateHash(target);
	}
	
	function fixHeight(target) {
		$(panelStyleName).addClass(miniPanelStyleName);
		$(target).removeClass(miniPanelStyleName);
	}

	function updateHash(target) {
		var id = $(target).attr("id").replace(panelIndexName, "");
		window.location.hash = "#page_" + id;
		goto(target);
	}

	function goto(target, speed) {
		if (speed == null)
			speed = scrollDelay;

		fixHeight(target);
		$(slider).animate({"left": -($(target).position().left)}, speed);
	}

	this.gotoHash = function(speed) {
		if (speed == null)
			speed = scrollDelay;

		var hash = window.location.hash.replace("#", "");
		var id = hash.replace("page_", "");
		
		var target = $("#" + panelIndexName + id);

		if ($(target)[0] != undefined) {
			goto(target, speed);
		} else {
			goto($(panelStyleName)[0]);
		}
	};

	this.setScrollDelay = function(delay) {
		scrollDelay = delay;
	};

	this.setPanelName = function(indexName) {
		panelIndexName = indexName;
	};

	this.run = function() {
		this.gotoHash(0);
	};

	$("button[data-intent='scroll-next'], button[data-intent='scroll-previous']").live("click", scrollPanel);
};