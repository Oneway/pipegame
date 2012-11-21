var StateManager = function()
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
			return this.levelsState[levelNo];
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
};