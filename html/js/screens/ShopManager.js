
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

