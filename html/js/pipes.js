
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
            'img/pipes/pipes_sprite.png'
		]
	},
	levels: [
        {
            name: "1: Basics: Staight ahead",
            author: "Oneway",
            levelNo: 1,
            starts: [
                [-1,0,2]
            ],
            finishes: [
                [2,0]
            ],
            board: [
                ["s_r0_g0","s_r0_g0"]
            ],
            availableGold:0,
            gold:0,
            finished: false
        },
        {
            name: "2: Basics: The bends",
            author: "Oneway",
            levelNo: 2,
            starts: [
                [-1,0,2]
            ],
            finishes: [
                [-1,1]
            ],
            board: [
                ["s_r0_g0","b_rr_g0"],
                ["s_rr_g0","b_rr_g0"]
            ],
            availableGold:0,
            gold:0,
            finished: false
        },
        {
            name: "3: Basics: The crossroads",
            author: "Oneway",
            levelNo: 3,
            starts: [
                [-1,0,2]
            ],
            finishes: [
                [0,-1]
            ],
            board: [
                ["c_r2_g0","b_r1_g0"],
                ["b_rr_g0","b_r1_g0"]
            ],
            availableGold:0,
            gold:0,
            finished: false
        },
        {
            name: "4: Basics: Only finishes count",
            author: "Oneway",
            levelNo: 4,
            starts: [
                [-1,0,2],
                [-1,1,2]
            ],
            finishes: [
                [4,1]
            ],
            board: [
                ["s_r0_g0","s_rr_g0","s_rr_g0","b_rr_g0"],
                ["s_rr_g0","s_rr_g0","s_rr_g0","b_rr_g0"]
            ],
            availableGold:0,
            gold:0,
            finished: false
        },
		{
            name: '5: Basics: Straights, bends and crosses',
            levelNo: 5,
			starts: [
				[(-1), 0, 2]
			],
			finishes: [
				[2, -1]
			],
			board: [
				['s_r0','b_rr','s_rr'],
				['b_rr','c_rr','b_rr'],
				['b_rr','b_rr','bl_rr']
			],
			gold: 0,
            availableGold: 0,
			finished: false
		},
        {
			name: '6: Basics: Splits only have one entry',
            levelNo: 6,
			starts: [
				[1,-1,3]
			],
			finishes: [
				[-1,0],
                [3,0]
			],
			board: [
				["b_rr_g0","s_r1_g0","b_rr_g0"],
                ["b_rr_g0","t_rr_g0","b_rr_g0"]
			],
			gold: 0,
            availableGold: 0,
			finished: false
		},
        {
			name: '7: Basics: Joins only have one exit',
            levelNo: 7,
			starts: [
				[1,-1,3]
			],
			finishes: [
				[1,2]
			],
			board: [
				["b_rr_g0","t_r1_g0","b_rr_g0"],
                ["b_rr_g0","tj_rr_g0","b_rr_g0"]
			],
			gold: 0,
            availableGold: 0,
			finished: false
		},
        {
			name: '8: Basics: Beware of the bombs!',
            levelNo: 8,
			starts: [
				[-1,0,2]
			],
			finishes: [
				[3,3]
			],
			board: [
				["b_r1_g0","bo_rr_g0","bo_rr_g0"],
                ["b_rr_g0","b_rr_g0","bo_rr_g0"],
                ["bo_rr_g0","b_rr_g0","b_rr_g0"],
                ["bo_rr_g0","bo_rr_g0","b_rr_g0"]
			],
			gold: 0,
            availableGold: 0,
			finished: false
		},
        {
			name: '9: Basics: Multiple solutions',
            levelNo: 9,
			starts: [
				[-1,1,2]
			],
			finishes: [
				[-1,2]
			],
			board: [
				["b_rr_g0","b_rr_g0","b_rr_g0"],
                ["b_r2_g0","b_rr_g0","b_rr_g0"],
                ["b_rr_g0","b_rr_g0","b_rr_g0"],
                ["b_rr_g0","b_rr_g0","b_rr_g0"]
			],
			gold: 0,
            availableGold: 0,
			finished: false
		},
        {
            name:"10: Basics: Find gold coins",
            levelNo: 10,
            starts: [
				[-1,1,2]
			],
			finishes: [
				[-1,2]
			],
			board: [
				["b_rr_g0","b_rr_g1","b_rr_g0"],
                ["b_r2_g0","b_rr_g0","b_rr_g0"],
                ["b_rr_g0","b_rr_g0","b_rr_g0"],
                ["b_rr_g0","b_rr_g1","b_rr_g0"]
			],
            availableGold:2,
            gold:0,
            finished:false
        }
	]
};

$(window).load(options, init);

function init(event)
{
    var options = event.data;
	var gameManager = new GameManager(options);
};
