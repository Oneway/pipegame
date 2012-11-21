
var AchievementManager = function(gameManager)
{
    this.gameManager = null;
    this.stateManager = null;


    this.construct = function(gameManager)
    {
        this.gameManager = gameManager;
        this.stateManager = this.gameManager.stateManager;

        this.gameManager.registerEventListener('gameLoaded', {object: this, method: this.onGameLoaded});
        this.gameManager.registerEventListener('levelCompleted', {object: this, method: this.onLevelCompleted});
        this.gameManager.registerEventListener('goldCollected', {object: this, method: this.onGoldCollected});
//        this.gameManager.registerEventListener('', this.);
//        this.gameManager.registerEventListener('', this.);
//        this.gameManager.registerEventListener('', this.);
//        this.gameManager.registerEventListener('', this.);

    }

    this.onGameLoaded = function(eventInfo)
    {
        if (this.stateManager.getAchievement('gameLoaded') != true) {
            this.gameManager.screenManager.addAchievementNotification('Game is loaded!');
            this.stateManager.setAchievement('gameLoaded', true);
            this.stateManager.saveState();
        }
    }

    this.onLevelCompleted = function(eventInfo)
    {

    }

    this.onGoldCollected = function(eventInfo)
    {

    }


    this.construct(gameManager);
}

