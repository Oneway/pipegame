var SplashManager = function(resources, gameManager)
{
	this.gameManager = null;
	this.resources = null;

	this.construct = function(resources, gameManager)
	{
		this.resources = resources;
		this.gameManager = gameManager;
	}

	this.init = function()
	{
		var loader = new PxLoader();
		var tags = this.loadResources(loader, this.resources);
		var splashElem = null;
		var sm = this.gameManager.screenManager;
		var self = this;

		loader.addProgressListener(function(e) {
			if (e.totalCount == e.completedCount) {
				splashElem = sm.showScreen('splash', true);
			}
		}, 'splash');

		loader.addProgressListener(function(e) {
			if (splashElem == null) {
				return;
			} else {
				var progress = Math.round((e.completedCount / e.totalCount) * 100);
				if (progress < 100) {
					splashElem.find('.progressPercentage').text(progress + '%');
					splashElem.find('.loadProgressBar').css('width', progress + '%');
				} else {
					var buttonElem = splashElem.find('.dialogButton');
					splashElem.find('.loadProgress').css('display', 'none');
					buttonElem.click({self: self}, self.onPlayButtonClicked);
					buttonElem.css('display', 'block');
                    self.gameManager.triggerEvent('gameLoaded', {});
				}
			}
		}, 'other');

		loader.start(tags);
	}

	this.loadResources = function(loader, resources)
	{
		var tags = [];

		for (var tag in resources) {
			tags.push(tag);
			for (var i = 0; i < resources[tag].length; i++) {
				var source = resources[tag][i];
				loader.add(new PxLoaderImage(source, tag));
			}
		}
		return tags;
	}

	this.onPlayButtonClicked = function(e)
	{
		e.preventDefault();
		var self = e.data.self;
		self.gameManager.screenManager.showScreen('main');
	}

	this.construct(resources, gameManager);
};