
function findDomElemPosistion(domElem) {
	var curleft = curtop = 0;
	if (domElem.offsetParent) {
		do {
		curleft += domElem.offsetLeft;
		curtop += domElem.offsetTop;
		} while (domElem = domElem.offsetParent);
	}
	return [curleft,curtop];
};
var options = {
	tileManager: {
		tileWidth: 40,
		tileHeight: 40,
        tileRotation: 0,
		imgPath: 'img/pipes/',
		offsetX: 40,
		offsetY: 40,
		startOffsetX: -7,
		startOffsetY: -9
	},
	splashManager: {
		// Divided so the resource loader can load the splash resources first
		// and show this screen while the rest loads.
		splash: [
			'img/splash/oneway_games.png',
			'img/splash/title.png'
		],
		other: [
			'img/exits.png',
			'img/playfield.png',
			'img/valve.png',
            'img/level_button.png',
			'img/dialogs/dialog_background.png',
			'img/dialogs/dialog_buttons.png',
			'img/dialogs/dialog_titles.png',
			'img/pipes/bend.png',
			'img/pipes/bend_full.png',
			'img/pipes/cross.png',
			'img/pipes/cross_full.png',
			'img/pipes/cross_lr.png',
			'img/pipes/cross_tb.png',
			'img/pipes/straight.png',
			'img/pipes/straight_full.png',
			'img/pipes/tshape.png',
			'img/pipes/tshape_full.png'
		]
	},
	levels: [
		{
			name: 'Test level',
			starts: [
				[(-1), 0, 2]
				//[2, 8, 1]
			],
			finishes: [
				[2, -1]
				//[3, 8]
			],
			board: [
				['s_r0_g1','b','s','b','b'],
				['t','c_g1','c','c','c'],
				['b','b','b','b','t'],
				['c','c','s','c','c'],
				['b','b','b','b','b'],
				['c','c','t','c','c'],
				['b','b','b','b','b'],
				['c','t','c','c','s']
			],
			gold: 0,
            availableGold: 2,
			finished: false
		},
        {
            name: 'level 2',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },
        {
            name: 'level 3',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 4',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 5',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 6',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 7',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 8',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 9',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 10',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 11',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 12',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 13',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 14',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 15',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 16',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 17',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 18',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        },{
            name: 'level 19',
            starts: [],
            finishes: [],
            board: [],
            gold: 0,
            availableGold: 4,
            finished: false
        }

	]
};

$(window).load(options, init);

function init(event)
{
    var options = event.data;
	var gameManager = new GameManager();
	gameManager.init(options);
};
var Scrollbars = function(scrollableElem, holderElem)
{
	this.scrollableElem = null;
	this.holderElem = null;
	this.scrollWheelDistance = 50;
	this.scrollbarsHtml = '<div class="scrollbars"><div class="scrollButton topButton"></div><div class="slider"></div><div class="scrollButton bottomButton"></div></div>';

	this.construct = function(scrollableElem, holderElem)
	{
		this.scrollableElem = (scrollableElem instanceof jQuery) ? scrollableElem : $(scrollableElem);
		this.holderElem = (holderElem instanceof jQuery) ? holderElem : $(holderElem);
	}

	this.createScrollbar = function()
	{
		// Get all relevant elements
		// Do we really need scrollbars?
		var maxAbsScrollAmount = this.scrollableElem.height() - this.holderElem.height();
		if (maxAbsScrollAmount <= 0) {
			return;
		}
		this.holderElem.append($(this.scrollbarsHtml));

		var scrollbarElem = this.holderElem.find('.scrollbars');
		var scrollButtonElem = scrollbarElem.find('.topButton');
		var sliderElem = scrollbarElem.find('.slider');

		var percVisible = this.holderElem.height() / this.scrollableElem.height();
		var scrollbarHeight = scrollbarElem.innerHeight();
		var buttonHeight = scrollButtonElem.innerHeight();

		sliderElem.css('height', Math.round((scrollbarHeight - (2 * buttonHeight)) * percVisible));

		var sliderHeight = sliderElem.innerHeight();
		var scrollbarHeight = scrollbarElem.innerHeight();
		var availSlideHeight = scrollbarHeight - (2 * buttonHeight) - sliderHeight;
		var sliderTopMinY = parseInt(sliderElem.css('top'));
		var sliderTopMaxY = buttonHeight + availSlideHeight;

		this.makeUnselectable(this.holderElem);

		var eventData = {
			self: this,
			mouseDown: false,
			mouseDownY: null,

			availSlideHeight: availSlideHeight,
			sliderTopAtStart: null,
			sliderTopMinY: sliderTopMinY,
			sliderTopMaxY: sliderTopMaxY,
			sliderElem: sliderElem,
			maxAbsScrollAmount: maxAbsScrollAmount
		};

		sliderElem.mousedown(eventData, this.onSliderMouseDown);
		$('body').mouseup(eventData, this.onSliderMouseUp);
		this.scrollableElem.mousewheel(eventData, this.onScrollWheel);
	}

	this.setScrollbarsHtml = function(html)
	{
		this.scrollbarsHtml = html;
	}

	this.setScrollWheelDistance = function(distance)
	{
		this.scrollWheelDistance = distance;
	}

	this.makeUnselectable = function(elem)
	{
		elem.attr('unselectable', 'on');
		elem.addClass('unselectable');
		var kids = elem.children();
		for (var i = 0; i < kids.length; i++) {
			this.makeUnselectable($(kids[i]));
		}
	}

	this.onSliderMouseDown = function(e)
	{
		var self = e.data.self;
		e.data.mouseDown = true;
		e.data.mouseDownY = e.pageY;
		e.data.sliderTopAtStart = parseInt($(this).css('top'));

		$('body').mousemove(e.data, self.followMouse);
	}

	this.onSliderMouseUp = function(e)
	{
		if (e.data.mouseDown) {
			e.data.mouseDown = false;
			e.data.mouseDownY = null;
			e.data.sliderTopAtStart = null;

			$('body').off('mousemove');
		}
	}

	this.followMouse = function(e)
	{
		var deltaY = e.pageY - e.data.mouseDownY;
		var newTop = e.data.sliderTopAtStart + deltaY;
		if (newTop < e.data.sliderTopMinY) {
			newTop = e.data.sliderTopMinY;
		} else if (newTop > e.data.sliderTopMaxY) {
			newTop = e.data.sliderTopMaxY;
		}

		var scrollPerc = (newTop - e.data.sliderTopMinY) / e.data.availSlideHeight;
		var scrollAmount = e.data.maxAbsScrollAmount * scrollPerc;

		e.data.sliderElem.css('top', newTop);
		e.data.self.scrollableElem.css('top', (scrollAmount * -1));
	}

	this.onScrollWheel = function(e, delta, deltaX, deltaY) {
		var scrollAmount = e.data.self.scrollWheelDistance * deltaY;
		var newTop = parseInt(e.data.self.scrollableElem.css('top')) + scrollAmount;

		if (newTop < (e.data.maxAbsScrollAmount * -1) ) {
			newTop = e.data.maxAbsScrollAmount * -1;
		} else if (newTop > 0) {
			newTop = 0;
		}

		var scrollPerc = Math.abs(newTop) / e.data.maxAbsScrollAmount;
		var scrollerTop = e.data.sliderTopMinY + (e.data.availSlideHeight * scrollPerc);
		e.data.self.scrollableElem.css('top', newTop);
		e.data.sliderElem.css('top', scrollerTop);

		e.stopPropagation();
		e.preventDefault();
	}

	this.construct(scrollableElem, holderElem);
};
/*
Screen manager handles the creation, presistance and switching of HTML fragments needed for each screen in a project.

- persisstence of hidden structures, to be 're-enabled' later.
-



*/

var ScreenManager = function(offScreenElem, holderElem, options, gameManager)
{
	this.curScreen = null;
    this.prevScreen = null;
	this.holderElem = null;
	this.offScreenElem = null;
	this.gameManager = null;

    this.achievementStack = [];
    this.achievementShowing = false;

	this.construct = function(offScreenElem, holderElem, options, gameManager)
	{
		this.holderElem = holderElem;
		this.offScreenElem = offScreenElem;
		this.options = options;
		this.gameManager = gameManager;
	}


	this.showScreen = function(screenName)
    {
		var screenElem = $('#' + screenName);
        if (screenElem.length == 0 || screenElem.is(this.curScreen)) {
            return;
        }
        if (! screenElem.is(this.curScreen) && ! screenElem.is(this.prevScreen)) {
            screenElem.detach();
        }
        screenElem.css('zIndex', 2);

        // Replace with entry animation of sorts
        this.holderElem.append(screenElem);

        if (this.prevScreen != null && ! screenElem.is(this.prevScreen)) {
            this.prevScreen.detach();
            this.offScreenElem.append(this.prevScreen);
        }

        if (this.curScreen != null) {
            this.prevScreen = this.curScreen;
            this.prevScreen.css('zIndex', 1);
        }

        this.curScreen = screenElem;

		return screenElem;
	}

    this.closeCurrentScreen = function()
    {
        this.curScreen.detach();
        this.offScreenElem.append(this.curScreen);

        if (this.prevScreen != null) {
            this.curScreen = this.prevScreen;
            this.curScreen.css('zIndex', 2);
            this.prevScreen = null;
        } else {
            this.curScreen = null;
        }
    }

	this.showDialog = function() {

	}

    this.addAchievementNotification = function(title, img)
    {
        this.achievementStack.push({
            title: title,
            img: img
        });
        if (! this.achievementShowing) {
            this.achievementShowing = true;
            this.handleAchievementNotifications();
        }
    }

    this.handleAchievementNotifications = function()
    {
        $('achievementNotification').detach();

        if (this.achievementStack.length > 0) {
            var achievement = this.achievementStack.shift();
            var achievementElem = this.offscreenElem.find('#achievementNotification').clone();
            achievementElem.attr('id', 'achievementNotification');
            achievementElem.find('.achievementNotificationTitle').text(achievement.title);

            this.holderElem.append(achievementElem);
            var self = this;

            // OOOH DIRTY!!!!
            achievementElem.animate(
                {bottom: "0px"},
                1000,
                "swing"
                ,
                function() {
                    window.setTimeout(
                        function() {
                            $(achievementElem).animate(
                                {bottom: '-80px'},
                                1000,
                                'swing',
                                function() {
                                    self.handleAchievementNotifications();
                                }
                            );
                        }, 1000
                    );
                }
            );
        } else {
            this.achievementShowing = false;
        }
    }























	this.construct(offScreenElem, holderElem, options, gameManager);
};
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

		var splashManager = new SplashManager(options['splashManager'], this);
		splashManager.init();
        var mainManager = new MainManager(this);
        var shopManager = new ShopManager(this);
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


 };/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },

    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(data, fn) {
		if (fn == null) {
			fn = data;
			data = null;
		}
		return fn ? this.bind("mousewheel", data, fn) : this.trigger("mousewheel");
    },
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";

    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;

    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }

    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);var StateManager = function()
{
	this.levelsState = [];
	this.hasCoinDetector = false;
	this.hasPipeSwitcher = false;
	this.hasFinishMover = false;
	this.hasStartCreator = false;
    this.achievements = {};

	this.storageMethod = 'localStorage';
	this.storageKey = 'pipeSaveGame';

    // properties that are calculated from known data
    this.totalGold = 0;
    this.levelsCompleted = 0;

	this.construct = function()
	{
		this.resetState();
		if ('localStorage' in window && window['localStorage'] !== null) {
			this.storageMethod = 'localStorage';
		} else {
			document.cookie = 'testcookie=';
			if (document.cookie.indexOf('testcookie') > -1) {
				this.storageMethod = 'cookie';
			} else {
				this.storageMethod = 'none';
			}
		}
        this.loadState();
	}

	this.resetState = function()
	{
		this.levelsState = [];
		this.hasCoinDetector = false;
		this.hasPipeSwitcher = false;
		this.hasFinishMover = false;
		this.hasStartCreator = false;
	}

	this.setLevelState = function(levelNo, completed, gold)
	{
		this.levelsState[levelNo] = {
			level: levelNo,
			completed: completed,
			gold: gold
		};
        this.updateStats();
	}

    this.setAchievement = function(name, value) {this.achievements[name] = value;}
	this.setHasCoinDetector = function(value) {this.hasCoinDetector = value;}
	this.setHasPipeSwitcher = function(value) {this.hasPipeSwitcher = value;}
	this.setHasFinishMover = function(value) {this.hasFinishMover = value;}
	this.setHasStartCreator = function(value) {this.hasStartCreator = value;}

	this.getLevelState = function(levelNo)
	{
		if (this.levelsState[levelNo] != undefined) {
			return this.levelState[levelNo];
		} else {
			return {
				level: levelNo,
				completed: false,
				gold: 0
			};
		}
	}
    this.getAchievement = function(name)
    {
        return (this.achievements[name] != undefined) ? this.achievements[name] : null;
    }
	this.getLevelsState = function() {return this.levelsState;}
	this.getHasCoinDetector = function() {return this.hasCoinDetector;}
	this.getHasPipeSwitcher = function() {return this.hasPipeSwitcher;}
	this.getHasFinishMover = function() {return this.hasFinishMover;}
	this.getHasStartCreator = function() {return this.hasStartCreator;}

    this.updateStats = function()
    {
        var totalGold = 0;
        var levelsCompleted = 0;
        for (var i = 0; i < this.levelsState.length; i++) {
            totalGold += this.levelsState[i].gold;
            if (this.levelsState[i].finished) {
                levelsCompleted++;
            }
        }

        this.totalGold = totalGold;
        this.levelsCompleted = levelsCompleted;
    }

	this.saveState = function()
	{
		if (this.storageMethod == 'none') {
			return false;
		}

		var stateObj = {
			levelsState: this.levelsState,
            achievements: this.achievements,
			hasCoinDetector: this.hasCoinDetector,
			hasPipeSwitcher: this.hasPipeSwitcher,
			hasFinishMover: this.hasFinishMover,
			hasStartCreator: this.hasStartCreator
		}
		var stateStr = JSON.stringify(stateObj);

		switch(this.storageMethod) {
			case 'localStorage':
				localStorage[this.storageKey] = stateStr;

				break;
			case 'cookie':
				var dt = new Date();
				dt.setTime(dt.getTime() + 1000*60*60*24*365);
				document.cookie = key + '=' + stateStr + '; expires' + dt.toGMTString() + '; path=/';
				break;
		}

		return true;
	}

	this.loadState = function()
	{
		if (this.storageMethod == 'none') {
			return false;
		}

		var stateStr = '{}';
		switch (this.storageMethod) {
			case 'localStorage':
				stateStr = localStorage[this.storageKey];
				break;
			case 'cookie':
				var nameEQ = this.storageKey + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) {
						stateStr = c.substring(nameEQ.length,c.length);
					}
				}
				break;
		}

		try {
			var stateObj = JSON.parse(stateStr);
		} catch(err) {
			return false;
		}

		this.resetState();

		for (var i in stateObj) {
			if (i == 'levelsState' && typeof stateObj[i] == 'object') {
				var levelsArray = stateObj[i];
				var values = {
					gold: 0,
					completed: false
				};
				for (var k = 0; k < levelsArray.length; k++) {
					for (var j in levelsArray[k]) {
						var save = false;
						switch (j) {
							case 'level':
								var levelNo = parseInt(levelsArray[k][j]);
								if (levelNo > 0) {
									values.level = levelNo;
								}
								save = true;
								break;
							case 'gold':
								var gold = parseInt(levelsArray[k][j]);
								values.gold = gold;
								break;
							case 'completed':
								values.completed = (levelsArray[k][j].toString() == 'true') ? true : false;
						}

						if (save) {
							this.levelsState[levelsArray[k].level] = values;
						}
					}
				}
            } else if (i == 'achievements') {
                this.achievements = stateObj[i];
            } else if (this[i] != undefined) {
				this[i] = (stateObj[i].toString() == 'true') ? true : false;
			}
		}
        this.updateStats();
		return true;
	}

	this.construct();
};/**
 * PixelLab Resource Loader
 * Loads resources while providing progress updates.
 */

function PxLoader(settings) {

    // merge settings with defaults
    settings = settings || {};

    // how frequently we poll resources for progress
    if (settings.statusInterval == null) {
        settings.statusInterval = 5000; // every 5 seconds by default
    }

    // delay before logging since last progress change
    if (settings.loggingDelay == null) {
        settings.loggingDelay = 20 * 1000; // log stragglers after 20 secs
    }

    // stop waiting if no progress has been made in the moving time window
    if (settings.noProgressTimeout == null) {
        settings.noProgressTimeout = Infinity; // do not stop waiting by default
    }

    var entries = [],
        // holds resources to be loaded with their status
        progressListeners = [],
        timeStarted, progressChanged = +new Date;

    /**
     * The status of a resource
     * @enum {number}
     */
    var ResourceState = {
        QUEUED: 0,
        WAITING: 1,
        LOADED: 2,
        ERROR: 3,
        TIMEOUT: 4
    };

    // places non-array values into an array.
    var ensureArray = function(val) {
        if (val == null) {
            return [];
        }

        if (Array.isArray(val)) {
            return val;
        }

        return [val];
    };

    // add an entry to the list of resources to be loaded
    this.add = function(resource) {

        // ensure tags are in an object
        resource.tags = new PxLoaderTags(resource.tags);

        // ensure priority is set
        if (resource.priority == null) {
            resource.priority = Infinity;
        }

        entries.push({
            resource: resource,
            status: ResourceState.QUEUED
        });
    };

    this.addProgressListener = function(callback, tags) {
        progressListeners.push({
            callback: callback,
            tags: new PxLoaderTags(tags)
        });
    };

    this.addCompletionListener = function(callback, tags) {
        progressListeners.push({
            tags: new PxLoaderTags(tags),
            callback: function(e) {
                if (e.completedCount === e.totalCount) {
                    callback();
                }
            }
        });
    };

    // creates a comparison function for resources
    var getResourceSort = function(orderedTags) {

        // helper to get the top tag's order for a resource
        orderedTags = ensureArray(orderedTags);
        var getTagOrder = function(entry) {
            var resource = entry.resource,
                bestIndex = Infinity;
            for (var i = 0; i < resource.tags.length; i++) {
                for (var j = 0; j < Math.min(orderedTags.length, bestIndex); j++) {
                    if (resource.tags[i] == orderedTags[j] && j < bestIndex) {
                        bestIndex = j;
                        if (bestIndex === 0) break;
                    }
                    if (bestIndex === 0) break;
                }
            }
            return bestIndex;
        };
        return function(a, b) {
            // check tag order first
            var aOrder = getTagOrder(a),
                bOrder = getTagOrder(b);
            if (aOrder < bOrder) return -1;
            if (aOrder > bOrder) return 1;

            // now check priority
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
            return 0;
        }
    };

    this.start = function(orderedTags) {
        timeStarted = +new Date;

        // first order the resources
        var compareResources = getResourceSort(orderedTags);
        entries.sort(compareResources);

        // trigger requests for each resource
        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i];
            entry.status = ResourceState.WAITING;
            entry.resource.start(this);
        }

        // do an initial status check soon since items may be loaded from the cache
        setTimeout(statusCheck, 100);
    };

    var statusCheck = function() {
        var checkAgain = false,
            noProgressTime = (+new Date) - progressChanged,
            timedOut = (noProgressTime >= settings.noProgressTimeout),
            shouldLog = (noProgressTime >= settings.loggingDelay);

        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i];
            if (entry.status !== ResourceState.WAITING) {
                continue;
            }

            // see if the resource has loaded
            if (entry.resource.checkStatus) {
                entry.resource.checkStatus();
            }

            // if still waiting, mark as timed out or make sure we check again
            if (entry.status === ResourceState.WAITING) {
                if (timedOut) {
                    entry.resource.onTimeout();
                } else {
                    checkAgain = true;
                }
            }
        }

        // log any resources that are still pending
        if (shouldLog && checkAgain) {
            log();
        }

        if (checkAgain) {
            setTimeout(statusCheck, settings.statusInterval);
        }
    };

    this.isBusy = function() {
        for (var i = 0, len = entries.length; i < len; i++) {
            if (entries[i].status === ResourceState.QUEUED || entries[i].status === ResourceState.WAITING) {
                return true;
            }
        }
        return false;
    };

    var onProgress = function(resource, statusType) {
        // find the entry for the resource
        var entry = null;
        for (var i = 0, len = entries.length; i < len; i++) {
            if (entries[i].resource === resource) {
                entry = entries[i];
                break;
            }
        }

        // we have already updated the status of the resource
        if (entry == null || entry.status !== ResourceState.WAITING) {
            return;
        }
        entry.status = statusType;
        progressChanged = +new Date;

        var numResourceTags = resource.tags.length;

        // fire callbacks for interested listeners
        for (var i = 0, numListeners = progressListeners.length; i < numListeners; i++) {
            var listener = progressListeners[i],
                shouldCall;

            if (listener.tags.length === 0) {
                // no tags specified so always tell the listener
                shouldCall = true;
            } else {
                // listener only wants to hear about certain tags
                shouldCall = resource.tags.contains(listener.tags);
            }

            if (shouldCall) {
                sendProgress(entry, listener);
            }
        }
    };

    this.onLoad = function(resource) {
        onProgress(resource, ResourceState.LOADED);
    };
    this.onError = function(resource) {
        onProgress(resource, ResourceState.ERROR);
    };
    this.onTimeout = function(resource) {
        onProgress(resource, ResourceState.TIMEOUT);
    };

    // sends a progress report to a listener
    var sendProgress = function(updatedEntry, listener) {
        // find stats for all the resources the caller is interested in
        var completed = 0,
            total = 0;
        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i],
                includeResource = false;

            if (listener.tags.length === 0) {
                // no tags specified so always tell the listener
                includeResource = true;
            } else {
                includeResource = entry.resource.tags.contains(listener.tags);
            }

            if (includeResource) {
                total++;
                if (entry.status === ResourceState.LOADED || entry.status === ResourceState.ERROR || entry.status === ResourceState.TIMEOUT) {
                    completed++;
                }
            }
        }

        listener.callback({
            // info about the resource that changed
            resource: updatedEntry.resource,

            // should we expose StatusType instead?
            loaded: (updatedEntry.status === ResourceState.LOADED),
            error: (updatedEntry.status === ResourceState.ERROR),
            timeout: (updatedEntry.status === ResourceState.TIMEOUT),

            // updated stats for all resources
            completedCount: completed,
            totalCount: total
        });
    };

    // prints the status of each resource to the console
    var log = this.log = function(showAll) {
        if (!window.console) {
            return;
        }

        var elapsedSeconds = Math.round((+new Date - timeStarted) / 1000);
        window.console.log('PxLoader elapsed: ' + elapsedSeconds + ' sec');

        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i];
            if (!showAll && entry.status !== ResourceState.WAITING) {
                continue;
            }

            var message = 'PxLoader: #' + i + ' ' + entry.resource.getName();
            switch(entry.status) {
                case ResourceState.QUEUED:
                    message += ' (Not Started)';
                    break;
                case ResourceState.WAITING:
                    message += ' (Waiting)';
                    break;
                case ResourceState.LOADED:
                    message += ' (Loaded)';
                    break;
                case ResourceState.ERROR:
                    message += ' (Error)';
                    break;
                case ResourceState.TIMEOUT:
                    message += ' (Timeout)';
                    break;
            }

            if (entry.resource.tags.length > 0) {
                message += ' Tags: [' + entry.resource.tags.join(',') + ']';
            }

            window.console.log(message);
        }
    };
};

// Tag object to handle tag intersection; once created not meant to be changed
// Performance rationale: http://jsperf.com/lists-indexof-vs-in-operator/3

function PxLoaderTags(values) {

    this.array = [];
    this.object = {};
    this.value = null; // single value
    this.length = 0;

    if (values !== null && values !== undefined) {
        if (Array.isArray(values)) {
            this.array = values;
        } else if (typeof values === 'object') {
            for (var key in values) {
                this.array.push(key);
            }
        } else {
            this.array.push(values);
            this.value = values;
        }

        this.length = this.array.length;

        // convert array values to object with truthy values, used by contains function below
        for (var i = 0; i < this.length; i++) {
            this.object[this.array[i]] = true;
        }
    }

    // compare this object with another; return true if they share at least one value
    this.contains = function(other) {
        if (this.length === 0 || other.length === 0) {
            return false;
        } else if (this.length === 1 && this.value !== null) {
            if (other.length === 1) {
                return this.value === other.value;
            } else {
                return other.object.hasOwnProperty(this.value);
            }
        } else if (other.length < this.length) {
            return other.contains(this); // better to loop through the smaller object
        } else {
            for (var key in this.object) {
                if (other.object[key]) {
                    return true;
                }
            }
            return false;
        }
    }
};

// shims to ensure we have newer Array utility methods
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) == '[object Array]';
    };
};// @depends PxLoader.js
/**
 * PxLoader plugin to load images
 */

function PxLoaderImage(url, tags, priority) {
    var self = this,
        loader = null;

    this.img = new Image();
    this.tags = tags;
    this.priority = priority;

    var onReadyStateChange = function() {
        if (self.img.readyState == 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    var onLoad = function() {
        removeEventHandlers();
        loader.onLoad(self);
    };

    var onError = function() {
        removeEventHandlers();
        loader.onError(self);
    };

    var removeEventHandlers = function() {
        self.unbind('load', onLoad);
        self.unbind('readystatechange', onReadyStateChange);
        self.unbind('error', onError);
    };

    this.start = function(pxLoader) {
        // we need the loader ref so we can notify upon completion
        loader = pxLoader;

        // NOTE: Must add event listeners before the src is set. We
        // also need to use the readystatechange because sometimes
        // load doesn't fire when an image is in the cache.
        self.bind('load', onLoad);
        self.bind('readystatechange', onReadyStateChange);
        self.bind('error', onError);

        self.img.src = url;
    };

    // called by PxLoader to check status of image (fallback in case
    // the event listeners are not triggered).
    this.checkStatus = function() {
        if (self.img.complete) {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    // called by PxLoader when it is no longer waiting
    this.onTimeout = function() {
        removeEventHandlers();
        if (self.img.complete) {
            loader.onLoad(self);
        } else {
            loader.onTimeout(self);
        }
    };

    // returns a name for the resource that can be used in logging
    this.getName = function() {
        return url;
    };

    // cross-browser event binding
    this.bind = function(eventName, eventHandler) {
        if (self.img.addEventListener) {
            self.img.addEventListener(eventName, eventHandler, false);
        } else if (self.img.attachEvent) {
            self.img.attachEvent('on' + eventName, eventHandler);
        }
    };

    // cross-browser event un-binding
    this.unbind = function(eventName, eventHandler) {
        if (self.img.removeEventListener) {
            self.img.removeEventListener(eventName, eventHandler, false);
        } else if (self.img.detachEvent) {
            self.img.detachEvent('on' + eventName, eventHandler);
        }
    };

};

// add a convenience method to PxLoader for adding an image
PxLoader.prototype.addImage = function(url, tags, priority) {
    var imageLoader = new PxLoaderImage(url, tags, priority);
    this.add(imageLoader);

    // return the img element to the caller
    return imageLoader.img;
};
function BaseTile() {

	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.w = 0;
	this.h = 0;
	this.r = 0;
	this.type = null;
	this.elem = null;
	this.parent = null;

	this.imgPath = '';
	this.imgNames = [];
	this.images = [];
	this.activeImgIndex = null;

	this.exits = [];
	this.gold = 0;

	this.degree = Math.PI / 180;
	this.rotStep = 90;
	this.timoutId = null;


	this.init = function(options)
	{
		this.x = options.x;
		this.y = options.y;
		this.w = options.tileWidth;
		this.h = options.tileHeight;
		this.r = options.tileRotation;
		this.gold = options.gold;
		this.type = options.type;
		this.parent = options.parent;
		this.imgPath = options.imgPath;

		this.preLoadImages();

		var canvasElem = $('<canvas>');
		this.offsetX = Math.ceil((Math.sqrt(this.w * this.w * 2) - this.w) / 2);
		this.offsetY = Math.ceil((Math.sqrt(this.h * this.h * 2) - this.h) / 2);
		canvasElem.attr({
			width: this.w + 2 * this.offsetX,
			height: this.h + 2 * this.offsetY,
			id: options.id
		});
		canvasElem.css({
			position: 'absolute',
			left: (this.x - this.offsetX) + 'px',
			top: (this.y - this.offsetY) + 'px'
		});

		this.elem = canvasElem;
		this.parent.append(canvasElem);
	};

	this.preLoadImages = function()
	{
		for(var i = 0; i < this.imgNames.length; i++) {
			var imgObj = new Image();
			imgObj.width = this.w;
			imgObj.height = this.h;
			imgObj.src = this.imgPath + this.imgNames[i];
			this.images.push(imgObj);
		}
		this.activeImgIndex = 0;
	}

	this.rotate = function(steps)
	{
		this.r = (this.r + steps) % 4;
		this.redrawTile();
	}

	this.redrawTile = function()
	{
		var cc = this.elem[0].getContext("2d");
		cc.save();
		cc.clearRect(0, 0, this.elem[0].width, this.elem[0].height);

        cc.translate(this.elem[0].width / 2, this.elem[0].height / 2);

        cc.rotate(this.degree * this.r * this.rotStep);
		cc.translate(-this.elem[0].width / 2, -this.elem[0].height / 2);
        cc.drawImage(this.images[this.activeImgIndex], this.offsetX, this.offsetY);
		cc.restore();
	}

	this.hitTile = function(rotatedSide)
	{
		var side = this.translateRotatedSideToSide(rotatedSide);
		this.setActiveImg(side);

		var exits = this.exits[side];
		var rotatedExits = [];
		var rotatedExit;

		if (exits != undefined) {
			for (var i = 0; i < exits.length; i++) {
				rotatedExit = this.translateSideToRotatedSide(exits[i]);

				rotatedExits[i] = rotatedExit;
			}
		}

		return rotatedExits;
	}

	this.translateRotatedSideToSide = function(rotatedSide)
	{
		return (4 + rotatedSide - this.r) % 4;
	}

	this.translateSideToRotatedSide = function(side)
	{
		return (side + this.r) % 4;
	}
};

function CrossTile(options) {

	this.construct = function(options)
	{
		this.exits[0] = [2];
		this.exits[1] = [3];
		this.exits[2] = [0];
		this.exits[3] = [1];
		this.imgNames = ['cross.png', 'cross_lr.png', 'cross_tb.png', 'cross_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 0 || entrySide == 2) {
			this.activeImgIndex = (this.activeImgIndex == 2) ? 3 : 1;
		} else if (entrySide == 1 || entrySide == 3) {
			this.activeImgIndex = (this.activeImgIndex == 1) ? 3 : 2;
		}
	}

	this.construct(options);
};
CrossTile.prototype = new BaseTile();


function BendTile(options) {

	this.construct = function(options)
	{
		this.exits[0] = [3];
		this.exits[3] = [0];
		this.imgNames = ['bend.png', 'bend_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 0 || entrySide == 3) {
			this.activeImgIndex = 1;
		}
	}

	this.construct(options);
};
BendTile.prototype = new BaseTile();

function StraightTile(options) {

	this.construct = function(options)
	{
		this.exits[1] = [3];
		this.exits[3] = [1];
		this.imgNames = ['straight.png', 'straight_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 1 || entrySide == 3) {
			this.activeImgIndex = 1;
		}
	}

	this.construct(options);
};
StraightTile.prototype = new BaseTile();

function TShapeTile(options) {

	this.construct = function(options)
	{
		this.exits[3] = [0, 2];
		this.imgNames = ['tshape.png', 'tshape_full.png'];
		this.init(options);
	}

	this.setActiveImg = function(entrySide)
	{
		if (entrySide == null) {
			this.activeImgIndex = 0;
		}

		if (entrySide == 3) {
			this.activeImgIndex = 1;
		}
	}

	this.construct(options);
};
TShapeTile.prototype = new BaseTile();

var ShopManager = function(gameManager)
{
    this.gameManager = null

    this.construct = function(gameManager)
    {
        this.gameManager = gameManager;
        var self = this;

        $('#shop .dialogButton:has(.buttonPrev)').click(function() {
            self.gameManager.screenManager.closeCurrentScreen();
        });
    }

    this.onPrevClick = function(e)
    {



    }

    this.construct(gameManager);
}


var MainManager = function(gameManager)
{
    this.gameManager = null

    this.construct = function(gameManager)
    {
        this.gameManager = gameManager;

        var mainElem = $('#main');
        var self = this;

        mainElem.find('.dialogButton:has(.buttonPlay)').click(function(e) {
            self.gameManager.screenManager.showScreen('playfield');
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
    }

    this.construct(gameManager);
};
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
var LevelManager = function(levels, gameManager)
{
	this.construct = function(levels, gameManager)
	{
		this.levels = levels;
		this.gameManager = gameManager;
        this.levelHtml = '<div class="levelButton"><canvas class="levelNo" width="110" height="46"></canvas><div class="levelGold"></div></div>';

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
        for (var i = 0; i < this.levels.length; i++) {
            if (this.levels[i].finished) {
                return i;
            }
        }
    }

    this.redrawLevels = function()
    {
        var levelSelectElem = $('#level .levelSelect');
        levelSelectElem.empty();

        for (var i = 0; i < this.levels.length; i++) {

            var levelNo = i + 1;
            var levelElem = $(this.levelHtml);

//            levelElem.find('.levelNo').text(levelNo);
            levelElem.find('.levelGold').text(this.levels[i].gold + '/' + this.levels[i].availableGold);
            var canvasJQ = levelElem.find('canvas.levelNo');
            var canvas = canvasJQ[0];
            var centerX = Math.round(canvas.width / 2);
            var centerY = Math.round(canvas.height / 2);

            var cc = canvas.getContext('2d');
            cc.font = 'normal 48px redCircle';
            cc.fillStyle = 'rgba(255,255,255,255)';
            cc.lineWidth = 4;
            cc.strokeStyle = 'rgba(51,51,51,255)';
            cc.textAlign = 'center';
            cc.textBaseline = 'middle';

            cc.fillText(levelNo, centerX, centerY);
            cc.strokeText(levelNo, centerX, centerY);

            levelElem.click({self: this, levelId: i}, this.onLevelClick);

            levelSelectElem.append(levelElem);
        }
    }

    this.onLevelClick = function(e)
    {
        levelId = e.data.levelId;
        var self = e.data.self;
        self.gameManager.tileManager.loadLevel(self.levels[levelId]);
        self.gameManager.screenManager.showScreen('playfield');
    }

	this.construct(levels, gameManager);
};
// TODO: Save and load options with StateManager
// TODO: Add

var OptionsManager = function(gameManager)
{
    this.gameManager = null;

    this.soundVolume = 75;
    this.musicVolume = 75;

    this.construct = function(gameManager)
    {

        this.gameManager = gameManager;



    }


    this.construct(gameManager);
}


var TileManager= function(gameManager, options) {

    this.gameManager = null;
    this.options = null;

	this.tiles = [];
	this.typeKeys = {
		'b': 'bend',
		'c': 'cross',
		's': 'straight',
		't': 'tshape'
	};
	this.curLevel = null;
	this.tileDescPattern = /([bcst])(_r([r0-3]))?(_g([0-1]))?/;

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


	this.createTile = function(type, options)
	{
		var newTile;

		for (var i in this.options) {
			if (options[i] == undefined) {
				options[i] = this.options[i];
			}
		}

		switch(type) {
			case 'cross':
				newTile = new CrossTile(options);
				break;
			case 'straight':
				newTile = new StraightTile(options);
				break;
			case 'bend':
				newTile = new BendTile(options);
				break;
			case 'tshape':
				newTile = new TShapeTile(options);
				break;
			default:
				return null;

		}

		return newTile;

	}

	this.loadLevel = function(levelDef)
	{
		this.initField(levelDef);
		this.curLevel = levelDef;
		this.clearTiles();
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

				var type = this.typeKeys[matches[1]];
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

				var tile = this.createTile(type, tileOptions);
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
		this.redrawBoard();
		this.parent.click({self: this}, this.handleClick);
	}

	this.initField = function(levelDef)
	{
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

		do {

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
					finishes.shift();
					break;
				}
			}

			// Check if there are any remaining finishes (0 = win condition)
			if (finishes.length == 0) {
				break;
			}

			// If we're still here, this trail is a dead end.
			curPos = null;
		} while (starts.length > 0);

		// Redraw all tiles
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].tile.redrawTile();
		}

		// Check for win
		if (finishes.length == 0) {
			alert('winner! You found ' + gold + ' gold!');
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