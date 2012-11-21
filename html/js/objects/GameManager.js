 var GameManager = function()
 {
	this.screenManager = null;
	this.stateManager = null;
    this.achievementManager = null;
    this.tileManager = null;

	this.levelManager = null;

	this.eventListeners = {};


	this.init = function(options)
	{
		// create all manager objects here and inject self.
		this.screenManager = new ScreenManager($('#offScreenHolder'), $('#game'), options.screenManager);
        this.stateManager = new StateManager();
        this.achievementManager = new AchievementManager(this);
        this.levelManager = new LevelManager(options.levels, this);
        this.tileManager = new TileManager(this, options.tileManager);



        var mainManager = new MainManager(this);
        var shopManager = new ShopManager(this);
		var splashManager = new SplashManager(options['splashManager'], this);
        var levelEditorManager = new LevelEditorManager(this, options.tileManager);
		splashManager.init();
	}

	this.getScreenManager = function() { return this.getScreenManager;}
	this.getStateManager = function() { return this.stateManager;}


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


 };