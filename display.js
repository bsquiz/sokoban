const display = {
    $all: new Image(),
    $canvas: document.getElementById('canvas'),
    $wallCanvas: document.getElementById('wallCanvas'),
    $levelSelectDropdown: document.getElementById('levelSelectDropdown'),
    context: {},
    wallContext: {},
    scale: 50,
    totalImages: 1,
    imagesLoaded: 0,
    isLoaded() {
        return this.imagesLoaded === this.totalImages;
    },
    init() {
        this.$canvas.width = this.$wallCanvas.width = GameDimension.COLS * display.scale;
        this.$canvas.height = this.$wallCanvas.height = GameDimension.ROWS * display.scale;
        this.context = this.$canvas.getContext('2d');
        this.wallContext = this.$wallCanvas.getContext('2d');
        this.$all.src = 'img/all.png';

        this.$all.addEventListener('load', e => this.imagesLoaded++);
    },
    addResetButton(game) {
        document.getElementById('levelReset').addEventListener(
            'click', () => game.loadLevel(game.currentLevel)
        );
    },
    addLevelSelect(game) {
        const levels = game.levelsMap;

        levels.forEach((level, index) => {
            const butt = document.createElement('option');

            butt.innerHTML = `level ${index}`;
            butt.id = `level_${index}`
            butt.setAttribute('data-level', index);

            this.$levelSelectDropdown.appendChild(butt);
        });

        this.$levelSelectDropdown.addEventListener('change', e => {
            const index = parseInt(e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute('data-level'));

            game.loadLevel(index);
        });
    },
    reset() {
        document.getElementById('cleared').classList.add('d-none');
    },
    winLevel(levelNumber) {
        document.getElementById('cleared').classList.remove('d-none');
        document.getElementById(`level_${levelNumber}`).innerHTML += ' &starf;';
    },
    drawWalls(game) {
        const { levels, currentLevel } = game;
        const { tiles } = levels[currentLevel];
        this.wallContext.clearRect(0, 0,GameDimension.COLS * this.scale, GameDimension.ROWS * this.scale);

        tiles.forEach(row => {
            row.forEach(tile => {
                const { type, x, y } = tile;

                if (tile.isWall()) {
                    let sx = 0;
                    let sy = 0;
                    switch (type) {
                        case Tile.BLOCKED:
                            sy = 1
                            break;
                        case Tile.WALL_BOTTOM:
                            sy = 1
                            sx = 1;
                            break;
                        case Tile.WALL_TOP:
                            sy = 1
                            sx = 2;
                            break;
                        default:
                            break;
                    }
                    this.wallContext.drawImage(
                        this.$all, sx * this.scale, sy * this.scale,
                        this.scale, this.scale,
                        x * this.scale, y * this.scale,
                        this.scale, this.scale
                    )
                }
            });
        });
    },
    draw(game) {
        const { levels, currentLevel, player } = game;
        const { tiles } = levels[currentLevel];

        this.context.clearRect(0, 0,GameDimension.COLS * this.scale, GameDimension.ROWS * this.scale);

        tiles.forEach(row => {
            row.forEach(tile => {
                const { x, y, type } = tile;

                if (type !== Tile.EMPTY && !tile.isWall()) {
                    let sx = 0;
                    let sy = 0;

                    if (tile.isGoal) {
                        this.context.drawImage(
                            this.$all, sx * this.scale, sy * this.scale,
                            this.scale, this.scale,
                            x * this.scale, y * this.scale,
                            this.scale, this.scale
                        )
                    }

                    switch (type) {
                        case Tile.CLEARED:
                            sx = 1;
                            break;
                        case Tile.BOX:
                            sy = 2;
                            break;
                        case Tile.PLAYER:
                            const { direction } = player;
                            sy = 3;
                            if (direction === Direction.RIGHT) {
                                sx = 1;
                            } else if (direction === Direction.DOWN) {
                                sx = 2;
                            } else if (direction === Direction.LEFT) {
                                sx = 3;
                            }
                            break;
                        default:
                            break;
                    }
                    this.context.drawImage(
                        this.$all, sx * this.scale, sy * this.scale,
                        this.scale, this.scale,
                        x * this.scale, y * this.scale,
                        this.scale, this.scale
                    )
                }
            });
        })
    }
}
