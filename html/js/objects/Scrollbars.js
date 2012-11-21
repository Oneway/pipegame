var Scrollbars = function(scrollableElem, holderElem)
{
	this.scrollableElem = null;
	this.holderElem = null;
	this.scrollWheelDistance = 50;
	this.scrollbarsHtml = '<div class="scrollbars"><div class="scrollButton topButton"></div><div class="slider"></div><div class="scrollButton bottomButton"></div></div>';

	this.construct = function(scrollableElem, holderElem)
	{
		this.scrollableElem = (scrollableElem instanceof jQuery) ? scrollableElem : $(scrollableElem);
		this.holderElem = (holderElem instanceof jQuery) ? holderElem : $(holderElem);
	}

	this.createScrollbar = function()
	{
		// Get all relevant elements
		// Do we really need scrollbars?
		var maxAbsScrollAmount = this.scrollableElem.height() - this.holderElem.height();
		if (maxAbsScrollAmount <= 0) {
			return;
		}
		this.holderElem.append($(this.scrollbarsHtml));

		var scrollbarElem = this.holderElem.find('.scrollbars');
		var scrollButtonElem = scrollbarElem.find('.topButton');
		var sliderElem = scrollbarElem.find('.slider');

		var percVisible = this.holderElem.height() / this.scrollableElem.height();
		var scrollbarHeight = scrollbarElem.innerHeight();
		var buttonHeight = scrollButtonElem.innerHeight();

		sliderElem.css('height', Math.round((scrollbarHeight - (2 * buttonHeight)) * percVisible));

		var sliderHeight = sliderElem.innerHeight();
		var scrollbarHeight = scrollbarElem.innerHeight();
		var availSlideHeight = scrollbarHeight - (2 * buttonHeight) - sliderHeight;
		var sliderTopMinY = parseInt(sliderElem.css('top'));
		var sliderTopMaxY = buttonHeight + availSlideHeight;

		makeUnselectable(this.holderElem);

		var eventData = {
			self: this,
			mouseDown: false,
			mouseDownY: null,

			availSlideHeight: availSlideHeight,
			sliderTopAtStart: null,
			sliderTopMinY: sliderTopMinY,
			sliderTopMaxY: sliderTopMaxY,
			sliderElem: sliderElem,
			maxAbsScrollAmount: maxAbsScrollAmount
		};

		sliderElem.mousedown(eventData, this.onSliderMouseDown);
		$('body').mouseup(eventData, this.onSliderMouseUp);
		this.scrollableElem.mousewheel(eventData, this.onScrollWheel);
	}

	this.setScrollbarsHtml = function(html)
	{
		this.scrollbarsHtml = html;
	}

	this.setScrollWheelDistance = function(distance)
	{
		this.scrollWheelDistance = distance;
	}

	this.onSliderMouseDown = function(e)
	{
		var self = e.data.self;
		e.data.mouseDown = true;
		e.data.mouseDownY = e.pageY;
		e.data.sliderTopAtStart = parseInt($(this).css('top'));

		$('body').mousemove(e.data, self.followMouse);
	}

	this.onSliderMouseUp = function(e)
	{
		if (e.data.mouseDown) {
			e.data.mouseDown = false;
			e.data.mouseDownY = null;
			e.data.sliderTopAtStart = null;

			$('body').off('mousemove');
		}
	}

	this.followMouse = function(e)
	{
		var deltaY = e.pageY - e.data.mouseDownY;
		var newTop = e.data.sliderTopAtStart + deltaY;
		if (newTop < e.data.sliderTopMinY) {
			newTop = e.data.sliderTopMinY;
		} else if (newTop > e.data.sliderTopMaxY) {
			newTop = e.data.sliderTopMaxY;
		}

		var scrollPerc = (newTop - e.data.sliderTopMinY) / e.data.availSlideHeight;
		var scrollAmount = e.data.maxAbsScrollAmount * scrollPerc;

		e.data.sliderElem.css('top', newTop);
		e.data.self.scrollableElem.css('top', (scrollAmount * -1));
	}

	this.onScrollWheel = function(e, delta, deltaX, deltaY) {
		var scrollAmount = e.data.self.scrollWheelDistance * deltaY;
		var newTop = parseInt(e.data.self.scrollableElem.css('top')) + scrollAmount;

		if (newTop < (e.data.maxAbsScrollAmount * -1) ) {
			newTop = e.data.maxAbsScrollAmount * -1;
		} else if (newTop > 0) {
			newTop = 0;
		}

		var scrollPerc = Math.abs(newTop) / e.data.maxAbsScrollAmount;
		var scrollerTop = e.data.sliderTopMinY + (e.data.availSlideHeight * scrollPerc);
		e.data.self.scrollableElem.css('top', newTop);
		e.data.sliderElem.css('top', scrollerTop);

		e.stopPropagation();
		e.preventDefault();
	}

	this.construct(scrollableElem, holderElem);
};