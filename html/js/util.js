



function findDomElemPosistion(domElem) {
	var curleft = curtop = 0;
	if (domElem.offsetParent) {
		do {
		curleft += domElem.offsetLeft;
		curtop += domElem.offsetTop;
		} while (domElem = domElem.offsetParent);
	}
	return [curleft,curtop];
};

function makeUnselectable(elem)
{
    elem.attr('unselectable', 'on');
    elem.addClass('unselectable');
    var kids = elem.children();
    for (var i = 0; i < kids.length; i++) {
        makeUnselectable($(kids[i]));
    }
}

String.prototype.ucFirst = function()
{
    return this.charAt(0).toUpperCase() + this.substr(1);
}