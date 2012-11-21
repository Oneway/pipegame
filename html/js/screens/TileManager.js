
var TileManager= function(gameManager, options) {

    this.gameManager = null;
    this.options = null;
    this.parent = null;

	this.tiles = [];
	this.curLevel = null;
	this.tileDescPattern = /(bl|b|c|s|t)(_r([r0-3]))?(_g([0-1]))?/;
    this.types = {
        c: 'Cross',
        b: 'Bend',
        t: 'T-shape',
        s: 'Straight',
        bl: 'Blank',
        bo: 'Bomb'
    };

    this.construct = function(gameManager, options)
    {
        this.gameManager = gameManager;
        this.options = options;
        this.parent = $('#playfield');
        this.parent.tm = this;
    }

	this.clearTiles = function()
	{
		this.tiles = [];
	}


	this.createTile = function(options)
	{
		var newTile;

		for (var i in this.options) {
			if (options[i] == undefined) {
				options[i] = this.options[i];
			}
		}
		switch(options.type) {
			case 'c':
				newTile = new CrossTile(options);
				break;
			case 's':
				newTile = new StraightTile(options);
				break;
			case 'b':
				newTile = new BendTile(options);
				break;
			case 't':
				newTile = new TShapeTile(options);
				break;
            case 'bl':
				newTile = new BlankTile(options);
				break;
			default:
				return null;

		}

		return newTile;

	}

	this.loadLevel = function(levelDef)
	{
		this.initField(levelDef);
		this.clearTiles();
		this.curLevel = levelDef;
		var rows = levelDef.board.length;
		var cols = levelDef.board[0].length;

		for (var i = 0; i < cols; i++) {
			for (var j = 0; j < rows; j++) {
				var x = i * this.options.tileWidth + this.options.offsetX;
				var y = j * this.options.tileHeight + this.options.offsetY;
				var tileDesc = levelDef.board[j][i];
				var matches = tileDesc.match(this.tileDescPattern);
				if (matches[0] == undefined) {
					continue;
				}

				var type = matches[1];
				var r = (matches[3] != undefined) ? parseInt(matches[3]) : 'r';

				var gold = (matches[5] != undefined) ? parseInt(matches[5]) : 0;

				var tileOptions = {
					x: x,
					y: y,
					id: 'tile_' + j + '_' + i,
					type: type,
					tileRotation: (r == 'r') ? Math.floor(Math.random() * 4) : r,
					gold: gold,
                    parent: this.parent
				};

				var tile = this.createTile(tileOptions);
				this.tiles.push({
					tile: tile,
					coordX: i,
					coordY: j,
					x1: x,
					x2: x + options.tileWidth,
					y1: y,
					y2: y + options.tileHeight
				});
			}
		}
        makeUnselectable(this.parent);
		this.redrawBoard();
		this.parent.click({self: this}, this.handleClick);
	}

	this.initField = function(levelDef)
	{
        this.parent.find('canvas').remove();
        this.parent.find('img').remove();
        this.parent.find('div[class^=exit]').remove();

        this.parent.unbind('click');
        this.tile = [];
		var cols = levelDef.board[0].length;
		var rows = levelDef.board.length;

		var fieldWidth = levelDef.board[0].length * this.options.tileWidth + this.options.offsetX * 2;
		var fieldHeight = levelDef.board.length * this.options.tileHeight + this.options.offsetY * 2;
		this.parent.css({
			width: fieldWidth + 'px',
			height: fieldHeight + 'px'
		});

		for (var i = 0; i < levelDef.starts.length; i++) {
			var imgElem = $('<img>');
			imgElem.attr({
				src: 'img/valve.png',
				'class': 'valveImage'
			});
			imgElem.css({
				left: this.options.startOffsetX + this.options.offsetX + levelDef.starts[i][0] * this.options.tileWidth + 'px',
				top: this.options.startOffsetY + this.options.offsetY + levelDef.starts[i][1] * this.options.tileHeight + 'px'
			});

			this.parent.append(imgElem);
		}

		for (var i = 0; i < levelDef.finishes.length; i++) {

			var exitPos = '';
			if (levelDef.finishes[i][0] < 0) {
				exitPos = 'exitLeft';
			} else if (levelDef.finishes[i][1] < 0) {
				exitPos = 'exitTop';
			} else if (levelDef.finishes[i][0] >= cols) {
				exitPos = 'exitRight';
			} else {
				exitPos = 'exitBottom'
			}

			var finishElem = $('<div>');
			finishElem.attr('class', 'exit ' + exitPos);
			finishElem.css({
				left: this.options.offsetX + levelDef.finishes[i][0] * this.options.tileWidth + 'px',
				top: this.options.offsetY + levelDef.finishes[i][1] * this.options.tileHeight + 'px'
			});

			this.parent.append(finishElem);
		}
	}

	this.handleClick = function(e)
	{
        if (e.ctrlKey) {
            return;
        }
		tm = e.data.self;
		var elemPos = findDomElemPosistion(this);
		var x = e.pageX - elemPos[0];
		var y = e.pageY - elemPos[1];

		for(var i = 0; i < tm.tiles.length; i++) {

			var tileDef = tm.tiles[i];
			if (
				x >= tileDef.x1 && x <= tileDef.x2
				&& y>= tileDef.y1 && y <= tileDef.y2
			) {
				tileDef.tile.rotate(1);
				break;
			}

		}
		tm.redrawBoard();
	}

	this.getStarts = function()
	{
		return this.curLevel.starts;
	}

	this.redrawBoard = function()
	{
		var starts = [];
		for (var i = 0; i < this.curLevel.starts.length; i++){
			starts[i] = [];
			starts[i][0] = this.curLevel.starts[i][0];
			starts[i][1] = this.curLevel.starts[i][1];
			starts[i][2] = this.curLevel.starts[i][2];
		}
		var finishes = [];
		for (var i = 0; i < this.curLevel.finishes.length; i++){
			finishes[i] = [];
			finishes[i][0] = this.curLevel.finishes[i][0];
			finishes[i][1] = this.curLevel.finishes[i][1];
		}
		var gold = 0;
		var rows = this.curLevel.board.length;
		var cols = this.curLevel.board[0].length;
		// curPos is an array with 3 items:
		// 0: xCooordinate
		// 1: yCoordinate
		// 2: EntrySide
		var curPos = null;

		// reset all tile images to default
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].tile.setActiveImg(null);
		}

		while (starts.length > 0) {

			if (curPos == null) {
				curPos = this.getNextCoordinate(starts.shift());
			}

			var tile = this.getTileAt(curPos[0], curPos[1]);

			while (tile != null) {

				// get exit direction(s) from current tile
				var exits = tile.hitTile(curPos[2]);

				// If multiple exits (split), use one and store the other as an extra start
				if (exits.length > 0) {

					gold += tile.gold;

					curPos[2] = exits.shift();

					for (var i = 0; i < exits.length; i++) {
						starts.push([curPos[0], curPos[1], exits[i]]);
					}

					// Get next coordinate based on curPos and exit side
					curPos = this.getNextCoordinate(curPos);
					// Get tile for next loop.
					tile = this.getTileAt(curPos[0], curPos[1]);

				} else {
					tile = null;
				}
			}

			// No tile found, so we've run off the board. See if we hit a finish
			// If it is a finish exit, remove it from the list.
			for (var i = 0; i < finishes.length; i++) {
				if (curPos[0] == finishes[i][0] && curPos[1] == finishes[i][1]) {
					finishes.splice(i, 1);
					break;
				}
			}

			// Check if there are any remaining finishes (0 = win condition)
			if (finishes.length == 0) {
				break;
			}

			// If we're still here, this trail is a dead end.
			curPos = null;
		};

		// Redraw all tiles
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].tile.redrawTile();
		}

		// Check for win
		if (this.curLevel.finishes.length > 0 && finishes.length == 0) {

            var eventInfo = {
                levelId: 0,
                gold: gold
            };

            var goldDifference = gold - this.curLevel.gold;
            var text = 'By completing this level, you have/nensured yourself of the /nfact that you,'
                     + 'sir, are indeed, awesome!!/n/nOh, and you found ' + gold + ' gold as well.'
                     + '/n/n Since you previously found '
                     + ((this.curLevel.gold == 0) ? 'no' : this.curLevel.gold) + ' gold on this level '
                     + goldDifference + ' gold has been added to your account.';

            var lm = this.gameManager.levelManager;
            var againButton = {type: 'again', click: lm.onLevelClick, eventData: {self: lm, levelNo: this.curLevel.levelNo}};
            var nextButton = {type: 'next', click: lm.onLevelClick, eventData: {self: lm, levelNo: this.curLevel.levelNo + 1}};
            this.gameManager.screenManager.showDialog(
                'win',
                text,
                [
                    againButton,
                    nextButton
                ]
            );
            this.gameManager.triggerEvent('levelCompleted', eventInfo);
		}

	}

	this.getNextCoordinate = function(curPos)
	{
		switch(curPos[2]) {
			case 0:
				curPos[0]--;
				break;
			case 1:
				curPos[1]--;
				break;
			case 2:
				curPos[0]++;
				break;
			case 3:
				curPos[1]++;
				break;
		}
		// Flip side (a tile's right side, touched with the left side of the tile to the right)
		curPos[2] = this.getOtherSide(curPos[2]);

		return curPos;
	}

	this.getTileAt = function(coordX, coordY)
	{
		for (var i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i].coordX == coordX && this.tiles[i].coordY == coordY) {
				return this.tiles[i].tile;
			}
		}
		return null;
	}

	this.getOtherSide = function(sideNum) {
		return (sideNum + 2) % 4;
	}

    this.construct(gameManager, options);
};