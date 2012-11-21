
var LevelManager = function(levels, gameManager)
{
	this.construct = function(levels, gameManager)
	{
		this.levels = levels;
		this.gameManager = gameManager;
        this.gameManager.registerEventListener('levelCompleted', {object: this, method: this.onLevelCompleted});
        this.levelHtml = '<div class="levelButton"><div class="levelNo"></div><div class="levelGold"></div></div>';

        this.redrawLevels();

        var self = this;
        var sb = new Scrollbars($('#level .levelSelect'), $('#level .levelHolder'));

        sb.setScrollWheelDistance(50);
		sb.createScrollbar();

        $('#level').find('.dialogButton:has(.buttonMain)').click(function(e) {
            self.gameManager.screenManager.showScreen('main');
        });
	}

    this.getFirstUnfinishedLevel = function()
    {
        return 0;
        for (var i = 0; i < this.levels.length; i++) {
            if (this.levels[i].finished) {
                return i;
            }
        }
        return i;
    }

    this.redrawLevels = function()
    {
        var levelSelectElem = $('#level .levelSelect');
        var sm = this.gameManager.stateManager;
        levelSelectElem.empty();

        for (var i = 0; i < this.levels.length; i++) {

            var levelNo = this.levels[i].levelNo;
            var levelElem = $(this.levelHtml);
//            levelElem.find('.levelNo').text(levelNo);
            levelElem.find('.levelGold').text(sm.getLevelState(i).gold + '/' + this.levels[i].availableGold);
            var levelNoElem = levelElem.find('div.levelNo').text(levelNo);
            levelElem.click({self: this, levelNo: levelNo}, this.onLevelClick);

            levelSelectElem.append(levelElem);
        }
    }

    this.onLevelClick = function(e)
    {
        var levelNo = e.data.levelNo;
        var self = e.data.self;
        var levelId = levelNo - 1;
        var sm = self.gameManager.screenManager;
        self.gameManager.screenManager.hideDialog();
        if (self.levels[levelId]) {
            self.gameManager.tileManager.loadLevel(self.levels[levelNo - 1]);
            sm.showScreen('pipeGame');
        } else {
            sm.showScreen('level')
        }

    }

    this.onLevelCompleted = function(eventInfo)
    {
        var sm = this.gameManager.stateManager;
        sm.setLevelState(eventInfo.levelId, true, eventInfo.gold);
        sm.saveState();
        if (this.levels[eventInfo.levelId].gold < eventInfo.gold) {
            this.levels[eventInfo.levelId].gold = eventInfo.gold;
        }
    }

	this.construct(levels, gameManager);
};