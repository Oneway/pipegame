
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
    this.entryMemory = null;
	this.activeImgCoords = [0,0];
    this.imageSpriteObj = null;

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

        this.imageSpriteObj = new Image();
        this.imageSpriteObj.src = '/img/pipes/pipes_sprite.png';

		this.elem = canvasElem;
		this.parent.append(canvasElem);
	};

	this.rotate = function(steps)
	{
		this.r = (this.r + steps) % 4;
	}

	this.redrawTile = function()
	{
		var cc = this.elem[0].getContext("2d");
		cc.save();
		cc.clearRect(0, 0, this.elem[0].width, this.elem[0].height);

        cc.translate(this.elem[0].width / 2, this.elem[0].height / 2);

        cc.rotate(this.degree * this.r * this.rotStep);
		cc.translate(-this.elem[0].width / 2, -this.elem[0].height / 2);
        cc.drawImage(
            this.imageSpriteObj,
            this.activeImgCoords[0] * this.w,
            this.activeImgCoords[1] * this.h,
            this.w,
            this.h,
            this.offsetX,
            this.offsetY,
            this.w,
            this.h
        );
		cc.restore();

        this.entryMemory = null;
        this.activeImgCoords = null;
	}

	this.hitTile = function(rotatedSide)
	{
		var side = this.translateRotatedSideToSide(rotatedSide);
		this.setActiveImgCoords(side);

		var exits = this.getExitsFromEntry(side);
		var rotatedExits = [];
		var rotatedExit;

		if (exits != undefined && exits != null) {
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
		this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgCoords = [0,1];
		} else if (entrySide == 0 || entrySide == 2) {
			this.activeImgCoords = (this.activeImgCoords[0] == 2) ? [3,1] : [1,1];
		} else if (entrySide == 1 || entrySide == 3) {
			this.activeImgCoords = (this.activeImgCoords[0] == 1) ? [3,1] : [2,1];
		} else {
            this.activeImgCoords = [0,1];
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
		this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgCoords = [0,2];
		} else if (entrySide == 0 || entrySide == 3) {
			this.activeImgCoords = [1,2];
		} else if (this.activeImgCoords == null) {
            this.activeImgCoords = [0,2];
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
		this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgCoords = [0,0];
		} else if (entrySide == 1 || entrySide == 3) {
			this.activeImgCoords = [1,0];
		} else if (this.activeImgCoords == null) {
            this.activeImgCoords = [0,0];
        }
	}

	this.construct(options);
};
StraightTile.prototype = new BaseTile();

function TShapeTile(options) {

	this.construct = function(options)
	{
		this.exits[3] = [0, 2];
		this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgCoords = [0,3];
		} else if (entrySide == 3) {
			this.activeImgCoords = [1,3];
		} else if (this.activeImgCoords == null) {
            this.activeImgCoords = [0,3];
        }
	}

	this.construct(options);
};
TShapeTile.prototype = new BaseTile();


function TShapeJoinTile(options) {

	this.construct = function(options)
	{
     	this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        if (this.entryMemory == null && (entry == 0 || entry == 2)) {
            this.entryMemory = entry;
        } else if (
            (this.entryMemory == 0 && entry == 2)
            || (this.entryMemory == 2 && entry == 0)
        ){
            return [3];
        }
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgCoords = [0,4];
		} else if (
            (this.entryMemory == 0 && entrySide == 2)
            || (this.entryMemory == 2 && entrySide == 0)
        ) {
			this.activeImgCoords = [1,4];
		} else  if (this.activeImgCoords == null){
            this.activeImgCoords = [0,4];
        }
	}

	this.construct(options);
};
TShapeJoinTile.prototype = new BaseTile();


function BlankTile(options) {

	this.construct = function(options)
	{
		this.exits = [];
		this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
        this.activeImgCoords = [3,0];
	}

	this.construct(options);
};
BlankTile.prototype = new BaseTile();


function BombTile(options) {

	this.construct = function(options)
	{
		this.exits = [];
		this.init(options);
	}

    this.getExitsFromEntry = function(entry)
    {
        return this.exits[entry];
    }

	this.setActiveImgCoords = function(entrySide)
	{
        this.activeImgCoords = [2,0];
	}

	this.construct(options);
};
BombTile.prototype = new BaseTile();