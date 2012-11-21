
function BaseTile() {

	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.w = 0;
	this.h = 0;
	this.r = 0;
	this.type = null;
	this.elem = null;
	this.parent = null;

	this.imgPath = '';
	this.imgNames = [];
	this.images = [];
	this.activeImgIndex = null;

	this.exits = [];
	this.gold = 0;

	this.degree = Math.PI / 180;
	this.rotStep = 90;
	this.timoutId = null;


	this.init = function(options)
	{
		this.x = options.x;
		this.y = options.y;
		this.w = options.tileWidth;
		this.h = options.tileHeight;
		this.r = options.tileRotation;
		this.gold = options.gold;
		this.type = options.type;
		this.parent = options.parent;
		this.imgPath = options.imgPath;

		this.preLoadImages();

		var canvasElem = $('<canvas>');
		this.offsetX = Math.ceil((Math.sqrt(this.w * this.w * 2) - this.w) / 2);
		this.offsetY = Math.ceil((Math.sqrt(this.h * this.h * 2) - this.h) / 2);
		canvasElem.attr({
			width: this.w + 2 * this.offsetX,
			height: this.h + 2 * this.offsetY,
			id: options.id
		});
		canvasElem.css({
			position: 'absolute',
			left: (this.x - this.offsetX) + 'px',
			top: (this.y - this.offsetY) + 'px'
		});

		this.elem = canvasElem;
		this.parent.append(canvasElem);
	};

	this.preLoadImages = function()
	{
		for(var i = 0; i < this.imgNames.length; i++) {
			var imgObj = new Image();
			imgObj.width = this.w;
			imgObj.height = this.h;
			imgObj.src = this.imgPath + this.imgNames[i];
			this.images.push(imgObj);
		}
		this.activeImgIndex = 0;
	}

	this.rotate = function(steps)
	{
		this.r = (this.r + steps) % 4;
		this.redrawTile();
	}

	this.redrawTile = function()
	{
		var cc = this.elem[0].getContext("2d");
		cc.save();
		cc.clearRect(0, 0, this.elem[0].width, this.elem[0].height);

        cc.translate(this.elem[0].width / 2, this.elem[0].height / 2);

        cc.rotate(this.degree * this.r * this.rotStep);
		cc.translate(-this.elem[0].width / 2, -this.elem[0].height / 2);
        cc.drawImage(this.images[this.activeImgIndex], this.offsetX, this.offsetY);
		cc.restore();
	}

	this.hitTile = function(rotatedSide)
	{
		var side = this.translateRotatedSideToSide(rotatedSide);
		this.setActiveImg(side);

		var exits = this.exits[side];
		var rotatedExits = [];
		var rotatedExit;

		if (exits != undefined) {
			for (var i = 0; i < exits.length; i++) {
				rotatedExit = this.translateSideToRotatedSide(exits[i]);

				rotatedExits[i] = rotatedExit;
			}
		}

		return rotatedExits;
	}

    this.removeElement = function()
    {
        this.elem.remove();
    }

	this.translateRotatedSideToSide = function(rotatedSide)
	{
		return (4 + rotatedSide - this.r) % 4;
	}

	this.translateSideToRotatedSide = function(side)
	{
		return (side + this.r) % 4;
	}
};

function CrossTile(options) {

	this.construct = function(options)
	{
		this.exits[0] = [2];
		this.exits[1] = [3];
		this.exits[2] = [0];
		this.exits[3] = [1];
		this.imgNames = ['cross.png', 'cross_lr.png', 'cross_tb.png', 'cross_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 0 || entrySide == 2) {
			this.activeImgIndex = (this.activeImgIndex == 2) ? 3 : 1;
		} else if (entrySide == 1 || entrySide == 3) {
			this.activeImgIndex = (this.activeImgIndex == 1) ? 3 : 2;
		}
	}

	this.construct(options);
};
CrossTile.prototype = new BaseTile();


function BendTile(options) {

	this.construct = function(options)
	{
		this.exits[0] = [3];
		this.exits[3] = [0];
		this.imgNames = ['bend.png', 'bend_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 0 || entrySide == 3) {
			this.activeImgIndex = 1;
		}
	}

	this.construct(options);
};
BendTile.prototype = new BaseTile();

function StraightTile(options) {

	this.construct = function(options)
	{
		this.exits[1] = [3];
		this.exits[3] = [1];
		this.imgNames = ['straight.png', 'straight_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 1 || entrySide == 3) {
			this.activeImgIndex = 1;
		}
	}

	this.construct(options);
};
StraightTile.prototype = new BaseTile();

function TShapeTile(options) {

	this.construct = function(options)
	{
		this.exits[3] = [0, 2];
		this.imgNames = ['tshape.png', 'tshape_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 3) {
			this.activeImgIndex = 1;
		}
	}

	this.construct(options);
};
TShapeTile.prototype = new BaseTile();

function BlankTile(options) {

	this.construct = function(options)
	{
		this.exits = [];
		this.imgNames = ['blank.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
        this.activeImgIndex = 0;
	}

	this.construct(options);
};
BlankTile.prototype = new BaseTile();


function BombTile(options) {

	this.construct = function(options)
	{
		this.exits = [];
		this.imgNames = ['bomb.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
        this.activeImgIndex = 0;
	}

	this.construct(options);
};
BombTile.prototype = new BaseTile();