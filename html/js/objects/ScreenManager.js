
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

    this.buttonHtml = '<div class="dialogButton"><div class="dialogButtonText"></div></div>';
    this.buttonMargins = [
        {first: 125, rest: 0},
        {first: 27, rest: 40}
    ];

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

	this.showDialog = function(title, text, buttons)
    {
        var dialogElem = $('#dialog');
        var dialogTitle = dialogElem.find('#dialogTitle');
        var dialogText = dialogElem.find('#dialogText');
        var dialogButtons = dialogElem.find('#dialogButtons');
        // Clean up dialog screen from previous use
        dialogTitle.removeClass();
        dialogText.empty();
        dialogButtons.empty();

        // Set dialog title
        var className = 'dialogTitle' + (
            (title == 'win')
                ? (title + (Math.floor((Math.random() * 5)) + 1)).ucFirst()
                : title.ucFirst()
        );
        dialogTitle.addClass(className);

        // Set dialog text
        text = text.replace(/\/n\/n/g, '</p><p>').replace(/\/n/g, '<br>');
        dialogText.append(text);

        // Set dialog buttons
        var first = true;
        var buttonMargins = this.buttonMargins[buttons.length - 1];
        for (var i = 0; i < buttons.length; i++) {

            var buttonDef = buttons[i];
            var buttonElem = $(this.buttonHtml);
            if (first) {
                buttonElem.addClass('dialogButtonFirst');
                buttonElem.css('marginLeft', buttonMargins.first + 'px');
            } else {
                buttonElem.css('marginLeft', buttonMargins.rest + 'px');
            }
            buttonElem.find('.dialogButtonText').addClass('button' + buttonDef.type.ucFirst());
            buttonElem.click(buttonDef.eventData, buttonDef.click);
            dialogButtons.append(buttonElem);
            first = false;
        }

        dialogElem.detach();
        this.holderElem.append(dialogElem);
	}

    this.hideDialog = function()
    {
        var dialogElem = $('#dialog');
        dialogElem.detach();
        this.offScreenElem.append(dialogElem);
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