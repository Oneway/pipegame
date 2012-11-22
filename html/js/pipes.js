
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
			'img/splash/oneway_games.png'
		],
		other: [
			'img/arrows.png',
            'img/pipes/blank.png',
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
			name: 'Straights, bends and crosses',
            levelNo: 1,
			starts: [
				[(-1), 0, 2]
			],
			finishes: [
				[2, -1]
				//[3, 8]
			],
			board: [
				['s_r1','b_r0','s_r1'],
				['b_r3','c_r1','b_r1'],
				['b_r2','b_r1','c_r1']
			],
			gold: 0,
            availableGold: 2,
			finished: false
		},
        {
			name: 'Splits only have one entry!',
            levelNo: 2,
			starts: [
				[-1, 0, 2]
			],
			finishes: [
				[3, 0],
				[3, 1]
			],
			board: [
				['s_r0','b_r0','b_r3'],
				['b_r3','t_r2','c_r1'],
				['b_r2','s_r1','b_r1']

			],
			gold: 0,
            availableGold: 2,
			finished: false
		},
        {
			name: 'Not all tile are used',
            levelNo: 3,
			starts: [
				[0, 3, 1]
			],
			finishes: [
				[0, -1],
				[2, -1]
			],
			board: [
				['s_r0','bl_r0','s_r3'],
				['b_r3','t_r2','b_r1'],
				['b_r2','b_r1','bl_r1']

			],
			gold: 0,
            availableGold: 2,
			finished: false
		},
        {
			name: 'Only finishes count',
            levelNo: 4,
			starts: [
				[2, -1, 3],
                [-1, 3, 2]
			],
			finishes: [
				[-1, 1],
				[4, 0],
                [2, 4],
				[3, 4]
			],
			board: [
				['b','b','b','t'],
				['t','c','s','c'],
				['c','s','b','t'],
                ['b','t','t','c']

			],
			gold: 0,
            availableGold: 2,
			finished: false
		},
        {
            name:"Split and join",
            levelNo: 5,
            starts: [
                [-1,1,2]
            ],
            finishes: [
                [4,1]
            ],
            board:[
                ["bo_r1_g0","b_r3_g0","b_r0_g0","bl_r0_g0"],
                ["s_r1_g0","t_r1_g0","tj_r3_g0","s_r0_g0"],
                ["bl_r1_g0","b_r2_g0","b_r1_g0","bl_r0_g0"]
            ],
            availableGold:0,
            gold:0,
            finished:false
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
