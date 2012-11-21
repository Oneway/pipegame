
var MainManager = function(gameManager)
{
    this.gameManager = null

    this.construct = function(gameManager)
    {
        this.gameManager = gameManager;

        var mainElem = $('#main');
        var self = this;

        mainElem.find('.dialogButton:has(.buttonPlay)').click(function(e) {
            var gm = self.gameManager;
            var levelId = gameManager.levelManager.getFirstUnfinishedLevel();
            gm.tileManager.loadLevel(gm.levelManager.levels[levelId]);
            gm.screenManager.showScreen('pipeGame');
        });
        mainElem.find('.dialogButton:has(.buttonLevels)').click(function(e) {
            self.gameManager.screenManager.showScreen('level');
        });
        mainElem.find('.dialogButton:has(.buttonShop)').click(function(e) {
            self.gameManager.screenManager.showScreen('shop');
        });
        mainElem.find('.dialogButton:has(.buttonOptions)').click(function(e) {
            self.gameManager.screenManager.showScreen('options');
        });

        mainElem.find('.dialogButton:has(.buttonEditor)').click(function(e) {
            self.gameManager.screenManager.showScreen('editor');
        });

    }

    this.construct(gameManager);
};
