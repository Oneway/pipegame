
var LevelEditorManager = function(gameManager, options)
{
    this.gameManager = null
    this.options = null;
    this.tileManager = null;
    this.playfield = null;
    this.curTile = null;
    this.curBorderTile = null;
    this.validLevel = false;
    this.defaultLevel = {
        name: 'Level title',
        starts: [],
        finishes: [],
        board: [
            ['b_r0','b_r0','b_r0','b_r0'],
            ['b_r0','b_r0','b_r0','b_r0'],
            ['b_r0','b_r0','b_r0','b_r0'],
            ['b_r0','b_r0','b_r0','b_r0']
        ],
        availableGold: 0
    }
    this.minHeight = 2;
    this.maxWidth = 10;
    this.curWidth = 0;
    this.minWidth = 2;
    this.maxHeight = 10;
    this.curHeight= 0;

    this.construct = function(gameManager, options)
    {
        this.gameManager = gameManager;
        this.options = options;
        this.curHeight = this.defaultLevel.board.length;
        this.curWidth = this.defaultLevel.board[0].length;

        this.playField = $('#editor #editorPlayField');
        tm = new TileManager(this.gameManager, this.options);
        tm.setUseDialogs(false);
        tm.addGameEndCallback([this.setLevelState, this]);
        tm.parent = this.playField;
        tm.loadLevel(this.defaultLevel);
        this.tileManager = tm;

        this.playField.click({self: this}, this.handleClick);
        this.playField.find('#moreRows').click({self: this, type: 'rows', op: 'more'}, this.changeSize);
        this.playField.find('#lessRows').click({self: this, type: 'rows', op: 'less'}, this.changeSize);
        this.playField.find('#moreCols').click({self: this, type: 'cols', op: 'more'}, this.changeSize);
        this.playField.find('#lessCols').click({self: this, type: 'cols', op: 'less'}, this.changeSize);
        $('#tileInfo select#tileType').change({self: this}, this.changeTileType);
        $('#borderTileInfo select#tileBorderType').change({self: this}, this.changeBorderTileType);
        $('#tileInfo input#tileGold').change({self: this}, this.changeTileGold);
        $('#tileInfo').click(function(e) {e.preventDefault();e.stopPropagation();});
        $('#borderTileInfo').click(function(e) {e.preventDefault();e.stopPropagation();});
        $('#editor div.buttonSubmit').click({self: this}, this.outputLevel);
        var self = this;
        $('#editor').find('.dialogButton:has(.buttonMenu)').click(function(e) {
            self.gameManager.screenManager.showScreen('main');
        });
    }

    this.setLevelState = function(value)
    {
        this.validLevel = value;
    }

    this.handleClick = function(e)
    {
        var self = e.data.self;
        var elemPos = findDomElemPosistion(this);
		var x = e.pageX - elemPos[0];
		var y = e.pageY - elemPos[1];
        var tileX = Math.floor((x - self.options.offsetX) / self.options.tileWidth);
        var tileY = Math.floor((y - self.options.offsetY) / self.options.tileHeight);
        var tiles = self.tileManager.tiles;
        var tileDef = null;

        for(var i = 0; i < tiles.length; i++) {
			if (tileX == tiles[i].coordX && tileY == tiles[i].coordY) {
				tileDef = tiles[i];
				break;
			}
		}

        if (! e.ctrlKey) {
            if (self.curTile != tileDef) {
                self.curTile = null;
            }
        } else if (self.curTile === tileDef) {
            self.curTile = null;
        } else {
            self.curTile = tileDef;
        }

        if (tileDef == null && e.ctrlKey && x >= 0 && y >= 0) {

            var exit = self.isValidBorderTile(tileX, tileY);

            var borderTile = {
                coordX: tileX,
                coordY: tileY,
                exit: exit,
                type: self.getBorderTileType(tileX, tileY)
            };

            if (self.curBorderTile == null && exit) {
                self.curBorderTile = borderTile;
            } else {
                self.curBorderTile = null;
            }
        } else {
            self.curBorderTile = null;
        }

        self.updateBorderInfo();
        self.updateTileInfo();
    }

    this.changeSize = function(e)
    {
        var self = e.data.self;
        var type = e.data.type;
        var op = e.data.op;

        if (type == 'rows' && op == 'more' && self.curHeight < self.maxHeight) {
            var j = self.curHeight;
            self.curHeight++;
            for (var i = 0; i < self.curWidth; i++) {
                var x = i * self.options.tileWidth + self.options.offsetX;
				var y = j * self.options.tileHeight + self.options.offsetY;
                var tileOptions = {
					x: x,
					y: y,
					id: 'tile_' + j + '_' + i,
					type: 's',
					tileRotation: 0,
					gold: 0,
                    parent: self.playField
				};

				var tile = self.tileManager.createTile(tileOptions);
				self.tileManager.tiles.push({
					tile: tile,
					coordX: i,
					coordY: j,
					x1: x,
					x2: x + self.options.tileWidth,
					y1: y,
					y2: y + self.options.tileHeight
				});
            }
        } else if (type == 'rows' && op == 'less' && self.curHeight > self.minHeight) {
            self.curHeight--;
            for (var i = self.tileManager.tiles.length - 1; i >= 0; i--) {
                var tile = self.tileManager.tiles[i];
                if (tile.coordY >= self.curHeight) {
                    tile.tile.removeElement();
                    self.tileManager.tiles.splice(i, 1);
                }
            }
        } else if (type == 'cols' && op == 'more' && self.curWidth < self.maxWidth) {
            var j = self.curWidth;
            self.curWidth++;
            for (var i = 0; i < self.curHeight; i++) {
                var x = j * self.options.tileWidth + self.options.offsetX;
				var y = i * self.options.tileHeight + self.options.offsetY;
                var tileOptions = {
					x: x,
					y: y,
					id: 'tile_' + i + '_' + j,
					type: 's',
					tileRotation: 0,
					gold: 0,
                    parent: self.playField
				};

				var tile = self.tileManager.createTile(tileOptions);
				self.tileManager.tiles.push({
					tile: tile,
					coordX: j,
					coordY: i,
					x1: x,
					x2: x + self.options.tileWidth,
					y1: y,
					y2: y + self.options.tileHeight
				});
            }
        } else if (type == 'cols' && op == 'less' && self.curWidth > self.minWidth) {
            self.curWidth--;
            for (var i = self.tileManager.tiles.length - 1; i >= 0; i--) {
                var tile = self.tileManager.tiles[i];
                if (tile.coordX >= self.curWidth) {
                    tile.tile.removeElement();
                    self.tileManager.tiles.splice(i, 1);
                }
            }
        }

        makeUnselectable(self.playField);
        self.playField.css('width', self.options.tileWidth * self.curWidth + self.options.offsetX * 2);
        self.playField.css('height', self.options.tileHeight * self.curHeight + self.options.offsetY * 2);
    }

    this.changeTileType = function(e)
    {
        var self = e.data.self;
        var tiles = self.tileManager.tiles;
        var found = false;

        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].coordX == self.curTile.coordX && tiles[i].coordY == self.curTile.coordY) {
                found = true;
                break;
            }
        }

        if (found) {
            self.curTile.tile.removeElement();
            var coordX = self.curTile.coordX;
            var coordY = self.curTile.coordY;
            var x = coordX * self.options.tileWidth + self.options.offsetX;
            var y = coordY * self.options.tileWidth + self.options.offsetY;

            var tileOptions = {
                x: x,
                y: y,
                id: 'tile_' + coordY + '_' + coordX,
                type: $(this).val(),
                tileRotation: self.curTile.tile.r,
                gold: self.curTile.tile.gold,
                parent: self.playField
            };

            var tile = self.tileManager.createTile(tileOptions);
            var tileDef = {
                tile: tile,
                coordX: coordX,
                coordY: coordY,
                x1: x,
                x2: x + self.options.tileWidth,
                y1: y,
                y2: y + self.options.tileHeight
            };
            tile.redrawTile();
            self.tileManager.tiles.splice(i, 1, tileDef);
            self.curTile = tileDef;
        }
    }

    this.changeBorderTileType = function(e)
    {
        var self = e.data.self;
        var newType = $(this).val();
        var curTile = self.curBorderTile;
        var tileManager = self.tileManager;
        var newTile = [curTile.coordX, curTile.coordY];

        if (newType == 'start') {
            newTile[2] = curTile.exit;
        }

        // remove the old start/finish
        if (curTile.type == 'start') {
            var starts = tileManager.curLevel.starts;
            for (var i = 0; i < starts.length; i++) {
                if (starts[i][0] == curTile.coordX && starts[i][1] == curTile.coordY) {
                    starts.splice(i, 1);
                    break;
                }
            }
        } else if (curTile.type == 'finish') {
            var finishes = tileManager.curLevel.finishes;
            for (var i = 0; i < finishes.length; i++) {
                if (finishes[i][0] == curTile.coordX && finishes[i][1] == curTile.coordY) {
                    finishes.splice(i, 1);
                    break;
                }
            }
        }

        // Insert the new one
        if (newType == 'start') {
            tileManager.curLevel.starts.push(newTile);
        } else if (newType == 'finish') {
            tileManager.curLevel.finishes.push(newTile);
        }

        self.curBorderTile.type = newType;
        self.validLevel = tileManager.redrawBoard();
    }

    this.changeTileGold = function(e)
    {
        var self = e.data.self;
        self.curTile.tile.gold = parseInt(this.value);
    }

    this.updateTileInfo = function()
    {
        if (this.curTile != null) {

            var infoX = this.options.offsetX + this.options.tileWidth * (this.curTile.coordX + 1.5);
            var infoY = (($('#editor #tileInfo').outerHeight() - this.options.tileHeight) / -2)
                      + this.options.offsetY + this.options.tileHeight * this.curTile.coordY;

            var selX = this.options.offsetX + this.options.tileWidth * this.curTile.coordX;
            var selY = this.options.offsetY + this.options.tileHeight * this.curTile.coordY;

            $('#editor #tileInfo').css({
                display: 'block',
                left: infoX + 'px',
                top: infoY + 'px'
            });
            $('#editor #selectedTile').css({
                display: 'block',
                width: this.options.tileWidth - 4,
                height: this.options.tileHeight - 4,
                left: selX,
                top: selY
            });
            $('#editor #tileX').text(this.curTile.coordX);
            $('#editor #tileY').text(this.curTile.coordY);
            $('#editor #tileR').text(this.curTile.tile.r);
            $('#editor #tileGold').attr('value', this.curTile.tile.gold);
            $('#editor #tileType').val(this.curTile.tile.type);

        } else {
            $('#editor #tileInfo').css('display', 'none');
            if (this.curBorderTile == null) {
                $('#editor #selectedTile').css('display', 'none');
            }
        }
    }

    this.updateBorderInfo = function()
    {

        if (this.curBorderTile != null) {

            var infoX = this.options.offsetX + this.options.tileWidth * (this.curBorderTile.coordX + 1.5);
            var infoY = (($('#editor #borderTileInfo').outerHeight() - this.options.tileHeight) / -2)
                      + this.options.offsetY + this.options.tileHeight * this.curBorderTile.coordY;

            var selX = this.options.offsetX + this.options.tileWidth * this.curBorderTile.coordX;
            var selY = this.options.offsetY + this.options.tileHeight * this.curBorderTile.coordY;

            $('#editor #borderTileInfo').css({
                display: 'block',
                left: infoX + 'px',
                top: infoY + 'px'
            });
            $('#editor #selectedTile').css({
                display: 'block',
                width: this.options.tileWidth - 4,
                height: this.options.tileHeight - 4,
                left: selX,
                top: selY
            });
            $('#editor #tileBorderType').val(this.curBorderTile.type);

        } else {
            $('#editor #borderTileInfo').css('display', 'none');
            if (this.curTile == null) {
                $('#editor #selectedTile').css('display', 'none');
            }
        }
    }

    this.outputLevel = function(e)
    {
        var self = e.data.self;

        if (! self.validLevel) {
            alert('Please make sure the level is in a solved state before submitting');
            return;
        }

        var tm = self.tileManager;
        var availableGold = 0;
        var board = [];
        for (var i = 0; i < self.curHeight; i++) {
            board[i] = [];
            for (var j = 0; j < self.curWidth; j++) {
                var tile = self.findTileByGridCoords(j, i);
                var tileGold = tile.tile.gold;
                var tileStr = tile.tile.type + '_r' + tile.tile.r + '_g' + tileGold;
                board[i][j] = tileStr;
                availableGold += tileGold;
            }
        }

        var levelDef = {
            name: '',
            author: $('#levelAuthor').attr('value'),
            starts: tm.curLevel.starts,
            finishes: tm.curLevel.finishes,
            board: board,
            availableGold: availableGold,
            gold: 0,
            finished: false
        };
console.log(JSON.stringify(levelDef));

        $.ajax({
            url: 'maillevel.php',
            data: {leveldef: JSON.stringify(levelDef)},
            type: 'POST'
        });
    }

    this.findTileByGridCoords = function(x, y)
    {
        var tiles = this.tileManager.tiles;
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].coordX == x && tiles[i].coordY == y) {
                return tiles[i];
            }
        }
        return false;
    }

    this.getBorderTileType = function(coordX, coordY)
    {
        var starts = this.tileManager.curLevel.starts;
        var finishes = this.tileManager.curLevel.finishes;

        for (var i = 0; i < starts.length; i++) {
            if (starts[i][0] == coordX && starts[i][1] == coordY) {
                return 'start';
            }
        }
        for (var i = 0; i < finishes.length; i++) {
            if (finishes[i][0] == coordX && finishes[i][1] == coordY) {
                return 'finish';
            }
        }

        return 'none';
    }

    this.isValidBorderTile = function(x, y)
    {
        if (x == -1 && y > -1 && y < this.curHeight) { // Left side
            return 2;
        } else if (x == this.curWidth && y > -1 && y < this.curHeight) { // Right side
            return 4;
        } else if (x > -1 && x < this.curWidth && y == -1) { // Top side
            return 3;
        } else if (x > -1 && x < this.curWidth && y == this.curHeight) { // Bottom side
            return 1;
        }
        return false;
    }

    this.construct(gameManager, options);
}


