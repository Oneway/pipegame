
var LevelEditorManager = function(gameManager, options)
{
    this.gameManager = null
    this.options = null;
    this.tileManager = null;
    this.playfield = null;
    this.curTile = null;
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
        tm.parent = this.playField;
        tm.loadLevel(this.defaultLevel);
        this.tileManager = tm;

        this.playField.click({self: this}, this.handleClick);
        this.playField.find('#moreRows').click({self: this, type: 'rows', op: 'more'}, this.changeSize);
        this.playField.find('#lessRows').click({self: this, type: 'rows', op: 'less'}, this.changeSize);
        this.playField.find('#moreCols').click({self: this, type: 'cols', op: 'more'}, this.changeSize);
        this.playField.find('#lessCols').click({self: this, type: 'cols', op: 'less'}, this.changeSize);
        $('#tileInfo select#tileType').change({self: this}, this.changeTileType);
        $('#tileInfo input#tileGold').change({self: this}, this.changeTileGold);
        $('#tileInfo').click(function(e) {e.preventDefault(); e.stopPropagation();});
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
            $('#editor #selectedTile').css('display', 'none');
        }
        this.outputLevel();
    }

    this.updateBorderInfo = function()
    {

    }

    this.outputLevel = function()
    {
        var tm = this.tileManager;
        var availableGold = 0;
        var board = [];
        for (var i = 0; i < this.curHeight; i++) {
            board[i] = [];
            for (var j = 0; j < this.curWidth; j++) {
                var tile = this.findTileByGridCoords(j, i);
                var tileGold = tile.tile.gold;
                var tileStr = tile.tile.type + '_r' + tile.tile.r + '_g' + tileGold;
                board[i][j] = tileStr;
                availableGold += tileGold;
            }
        }

        var levelDef = {
            name: '',
            starts: tm.curLevel.starts,
            finishes: tm.curLevel.finishes,
            board: board,
            availableGold: availableGold,
            gold: 0,
            finished: false
        };

        console.log(JSON.stringify(levelDef));
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

    this.construct(gameManager, options);
}


