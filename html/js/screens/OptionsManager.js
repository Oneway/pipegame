
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

