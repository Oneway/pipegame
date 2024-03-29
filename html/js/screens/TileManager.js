
var TileManager= function(gameManager, options) {

    this.gameManager = null;
    this.options = null;
    this.parent = null;

	this.tiles = [];
	this.curLevel = null;
	this.tileDescPattern = /(bl|bo|b|c|s|tj|t)(_r([r0-3]))?(_g([0-1]))?/;
    this.types = {
        c: 'Cross',
        b: 'Bend',
        t: 'T-shape split',
        tj: 'T-shape join',
        s: 'Straight',
        bl: 'Blank',
        bo: 'Bomb'
    };
    this.gameEndCallbacks = [];
    this.useDialogs = true;
    this.tilesSpriteObj = null

    this.construct = function(gameManager, options)
    {
        this.gameManager = gameManager;
        this.options = options;
        this.parent = $('#playfield');
        this.parent.tm = this;
        this.tilesSpriteObj = new Image();
        this.tilesSpriteObj.src = options.imgPath + 'pipes_sprite.png';
        this.options.imgObj = this.tilesSpriteObj;

        var self = this;
        $('#pipeGame').find('.dialogButton:has(.buttonMenu)').click(function(e) {
            self.gameManager.screenManager.showScreen('main');
        });
    }

    this.setUseDialogs = function(value)
    {
        this.useDialogs = value;
    }

    this.addGameEndCallback = function(callback)
    {
        this.gameEndCallbacks.push(callback);
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
            case 'tj':
				newTile = new TShapeJoinTile(options);
				break;
            case 'bl':
				newTile = new BlankTile(options);
				break;
            case 'bo':
                newTile = new BombTile(options);
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
				var r = (matches[3] != undefined && matches[3] != 'r') ? parseInt(matches[3]) : 'r';
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

        $('#pipeGame #levelTitle').text(levelDef.name);

        makeUnselectable(this.parent);
		this.redrawBoard();
		this.parent.click({self: this}, this.handleClick);
	}

	this.initField = function(levelDef)
	{
        this.redrawStartsAndFinishes(levelDef.starts, levelDef.finishes);
        this.parent.find('canvas').remove();
        this.parent.find('img').remove();

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


	}

    this.redrawStartsAndFinishes = function(starts, finishes)
    {
        this.parent.find('div.finish').remove();
        this.parent.find('div.start').remove();

        for (var i = 0; i < starts.length; i++) {
			var startElem = $('<div class="start">S</div>');

			startElem.css({
				left: this.options.offsetX + starts[i][0] * this.options.tileWidth + 'px',
				top: this.options.offsetY + starts[i][1] * this.options.tileHeight + 'px'
			});

			this.parent.append(startElem);
		}

		for (var i = 0; i < finishes.length; i++) {

			var finishElem = $('<div class="finish">F</div>');
			finishElem.css({
				left: this.options.offsetX + finishes[i][0] * this.options.tileWidth + 'px',
				top: this.options.offsetY + finishes[i][1] * this.options.tileHeight + 'px'
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
        this.redrawStartsAndFinishes(this.curLevel.starts, this.curLevel.finishes);
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
        var bombHit = false;
        var levelWon = false;
		// curPos is an array with 3 items:
		// 0: xCooordinate
		// 1: yCoordinate
		// 2: EntrySide
		var curPos = null;

		// reset all tile images to default
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].tile.setActiveImgCoords(null);
		}

		while (starts.length > 0 && finishes.length > 0) {

			if (curPos == null) {
				curPos = this.getNextCoordinate(starts.shift());
			}

			var tile = this.getTileAt(curPos[0], curPos[1]);

			while (tile != null) {

                if (tile.type == 'bo') {
                    bombHit = true;
                    break;
                }

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
                levelWon = true;
				break;
			}

			// If we're still here, this trail is a dead end.
			curPos = null;
		};

		// Redraw all tiles
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].tile.redrawTile();
		}

		// Check for bomb or win
        if (bombHit && this.useDialogs) {

            var goldDifference = gold - this.curLevel.gold;
            var text = 'Seems like you hit a bomb there, buddy./n'
                     + 'If you do insist on defusing them, please remember to cut the blue wire first, okay?/n'
                     + '/n/n No seriously, don\'t do that next time. It nearly gave me a heart attack.';

            var lm = this.gameManager.levelManager;
            var againButton = {type: 'again', click: lm.onLevelClick, eventData: {self: lm, levelNo: this.curLevel.levelNo}};
            this.gameManager.screenManager.showDialog(
                'bomb',
                text,
                [
                    againButton
                ]
            );
            this.gameManager.triggerEvent('bombHit', {});
        } else if (this.curLevel.finishes.length > 0 && finishes.length == 0 && this.useDialogs) {

            var eventInfo = {
                levelId: 0,
                gold: gold
            };

            var goldDifference = gold - this.curLevel.gold;
            var text = 'By completing this level, you have/nensured yourself of the /nfact that you,'
                     + 'sir, are indeed, awesome!!/n/nOh, and you found ' + gold + ' gold as well.'
                     + '/n/n Since you previously found '
                     + ((this.curLevel.gold == 0) ? 'no' : this.curLevel.gold) + ' gold on this level, '
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


        for (var i = 0; i < this.gameEndCallbacks.length; i++) {
            this.gameEndCallbacks[i][0].call(this.gameEndCallbacks[i][1], levelWon);
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