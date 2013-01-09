/*
 * Page Slider: A jQuery plugin to make cool looking sliding panels
 * Version 0.42.108
 * 
 * @URL https://github.com/formigone/pageslider
 */
var PageSlider = function(sliderEl) {
	var slider = sliderEl;
	var panels = $(".pageSliderPanel");
	var scrollDelay = 250;
	var panelStyleName = ".pageSliderPanel";
	var miniPanelStyleName = "pageSliderMiniPanel";
	
	// Element ID that identifies a panel, excluding its integer value
	var panelIndexName = "panel_num_";

	$(window).bind("hashchange", gotoHash);
	$(window).bind("resize", normalizePanels);
	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	function normalizePanels() {
		var margin = parseInt($(".pageSliderPanel").css("marginRight")) + parseInt($(".pageSliderPanel").css("marginLeft"));
		$(".pageSliderPanel").outerWidth($(window).outerWidth(true) - margin);
		$(slider).innerWidth(($(panels[0]).outerWidth() + margin) * panels.length);
		setTimeout(function() {
			gotoHash(0);
		}, 10);
	}

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	function scrollPanel(e) {
		e.preventDefault();

		var target = $(this).parents(panelStyleName).next();
		if ($(this).attr("data-intent") == "scroll-previous")
			target = $(this).parents(panelStyleName).prev(panelStyleName);

		// In case the next panel is nested inside some other element instead of being a direct sibling
		else if ($(target[0]).attr("id").indexOf(panelIndexName) < 0)
			target = $(this).parents(panelStyleName).next().find(panelStyleName).first();

		if ($(target)[0] != undefined)
			updateHash(target);
	}

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	function updateHash(target) {
		var id = $(target).attr("id").replace(panelIndexName, "");
		window.location.hash = "#page_" + id;
		goto(target);
	}

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	function goto(target, speed) {
		if (speed == null)
			speed = scrollDelay;

		$(slider).animate({"left": -($(target).position().left)}, speed);
	}

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	function gotoHash (speed) {
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

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	this.setScrollDelay = function(delay) {
		scrollDelay = delay;
	};

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	this.setPanelName = function(indexName) {
		panelIndexName = indexName;
	};
	
	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	this.getPanelName = function() {
		return panelIndexName;
	};
	
	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	this.goto = function(pageNum) {
		window.location.hash = "#page_" + pageNum;
	};

	// --------------------------------------------------------
	//
	// --------------------------------------------------------
	this.run = function() {
		normalizePanels();
		gotoHash(0);
	};
	
	$("*[data-intent='scroll-next'], *[data-intent='scroll-previous']").live("click", scrollPanel);
};

