 var GameManager = function(options)
 {
	this.screenManager = null;
	this.stateManager = null;
    this.achievementManager = null;
    this.tileManager = null;

	this.levelManager = null;

	this.eventListeners = {};
    this.options = {};


    this.construct = function(options)
    {
        this.options = options;
		this.screenManager = new ScreenManager($('#offScreenHolder'), $('#game'), this.options.screenManager);
        this.registerEventListener('gameLoaded', {object: this, method: this.init})
		var splashManager = new SplashManager(options['splashManager'], this);
		splashManager.init();
    }

	this.init = function(options)
	{
		// create all manager objects here and inject self.
        this.stateManager = new StateManager();
        this.achievementManager = new AchievementManager(this);
        this.levelManager = new LevelManager(this.options.levels, this);
        this.tileManager = new TileManager(this, this.options.tileManager);

        var mainManager = new MainManager(this);
        var shopManager = new ShopManager(this);
        var levelEditorManager = new LevelEditorManager(this, this.options.tileManager);
	}

	this.getScreenManager = function() {return this.getScreenManager;}
	this.getStateManager = function() {return this.stateManager;}


	this.registerEventListener = function(name, callback) {
        if (typeof callback != 'object'
            || typeof callback.object != 'object'
            || typeof callback.method != 'function'
        ) {
            return false;
        }

		if (this.eventListeners[name] == undefined) {
			this.eventListeners[name] = [];
		}

		this.eventListeners[name].push(callback);

		return true;
	}

	this.triggerEvent = function(name, eventInfo)
	{
		if (this.eventListeners[name] != undefined) {
			for (var i = 0; i < this.eventListeners[name].length; i++) {
                var callback = this.eventListeners[name][i];
                callback.method.call(callback.object, eventInfo);
			}
		}
	}

    this.construct(options);
 };