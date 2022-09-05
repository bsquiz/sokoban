const GameDimension = {
    ROWS: 10,
    COLS: 10
}
const Tile = {
    BLOCKED: 'b',
    CLEARED: 'c',
    BOX: 'x',
    GOAL: 'g',
    EMPTY: ' ',
    PLAYER: 'p',
    WALL_BOTTOM: 'w',
    WALL_TOP: 't'
}
const Direction = {
    UP: 0,
    DOWN: 180 * Math.PI / 180,
    LEFT: 270 * Math.PI / 180,
    RIGHT: 90 * Math.PI / 180
}
const KeyDirection = {}
KeyDirection.ArrowDown = Direction.DOWN;
KeyDirection.ArrowUp = Direction.UP;
KeyDirection.ArrowLeft = Direction.LEFT;
KeyDirection.ArrowRight = Direction.RIGHT;

const makeTile = function makeTile(x, y, type) {
    return {
        x, y, width: 1, height: 1,
        isGoal: type === Tile.GOAL, // goal type can be overwritten during play so save a reference
        type,
        isWall() {
            return type === Tile.BLOCKED || type === Tile.WALL_TOP || type === Tile.WALL_BOTTOM;
        },
        isPassable() {
            return (this.type === Tile.EMPTY || this.type === Tile.BOX
                || this.type === Tile.GOAL) && type.type !== Tile.CLEARED
        }
    }
}

const getNextTile = function getNextTile(tiles, startX, startY, direction) {
    let tile;

    if (direction === Direction.UP) {
        tile = tiles[startY - 1][startX];
    } else if (direction === Direction.DOWN) {
        tile = tiles[startY + 1][startX];
    } else if (direction === Direction.LEFT) {
        tile = tiles[startY][startX - 1];
    } else if (direction === Direction.RIGHT) {
        tile = tiles[startY][startX + 1];
    }

    return tile;
}

const canMovePlayer = function canMovePlayer(tiles, player) {
    const { x, y, direction } = player;
    let nextTile = getNextTile(tiles, x, y, direction);

    if (!nextTile.isPassable()) return false;

    if (nextTile.type === Tile.BOX) {
        const tileToMoveTo = getNextTile(tiles, nextTile.x, nextTile.y, direction);

        return tileToMoveTo.isPassable();
    }

    return true;
}

const updateBoard = function updateBoard(tiles, player) {
    const { x, y, direction } = player;
    let nextTile = getNextTile(tiles, x, y, direction);
    let playerTile = tiles[y][x];

    if (nextTile.isPassable()) {
        if (nextTile.type === Tile.BOX) {
            const tileToMoveTo = getNextTile(tiles, nextTile.x, nextTile.y, direction);

            if (tileToMoveTo.type === Tile.GOAL) {
                tileToMoveTo.type = Tile.CLEARED;
            } else if (tileToMoveTo.isPassable()) {
                tileToMoveTo.type = Tile.BOX;
            }

        }

        nextTile.type = Tile.PLAYER;

        if (playerTile.isGoal) {
            playerTile.type = Tile.GOAL;
        } else {
            playerTile.type = Tile.EMPTY;
        }
    }
}

const updateKeys = function updateKeys(keyCode) {
    if (!Object.keys(KeyDirection).includes(keyCode)) return;

    sokoban.player.direction = KeyDirection[keyCode];

    if (!canMovePlayer(sokoban.levels[sokoban.currentLevel].tiles, sokoban.player)) return;

    if (keyCode === 'ArrowDown') {
        sokoban.player.newY = sokoban.player.y + 1;
    }
    if (keyCode === 'ArrowUp') {
        sokoban.player.newY = sokoban.player.y - 1;
    }
    if (keyCode === 'ArrowLeft') {
        sokoban.player.newX = sokoban.player.x - 1;
    }
    if (keyCode === 'ArrowRight') {
        sokoban.player.newX = sokoban.player.x + 1;
    }

    sokoban.update();
    display.draw(sokoban);
}

const sokoban = {
    levels: [],
    levelsMap: [],
    currentLevel: 0,
    player: {
        x: 0,
        y: 0,
        newX: 0,
        newY: 0,
        direction: Direction.DOWN
    },
    clearedGoals: 0,
    totalGoals: 0,
    loadLevel(levelNumber) {
        const tiles = [];

        this.levels[levelNumber].tiles = [];
        this.currentLevel = levelNumber;
        this.clearedGoals = 0;
        this.totalGoals = 0;

        for (let i=0; i< GameDimension.ROWS; i++) {
            const row = [];

            for (let j=0; j<GameDimension.COLS; j++) {
                const type = this.levelsMap[levelNumber][i][j];
                const tile = makeTile(j, i, type);

                if (type === Tile.GOAL) this.totalGoals++;
                if (type === Tile.PLAYER) {
                    this.player.x = this.player.newX = j;
                    this.player.y = this.player.newY = i;
                }
                row.push(tile);
            }
            tiles.push(row);
        }

        this.levels[levelNumber].tiles = tiles;
        this.currentLevel = levelNumber;

        display.reset();
        display.drawWalls(this);
        display.draw(this);
    },
    init(levelsMap) {
        this.levelsMap = levelsMap;
        display.init();
        display.addLevelSelect(this);
        display.addResetButton(this);

        const loadingInterval = window.setInterval(() => {
            if (display.isLoaded()) {
                this.loadLevel(0);
                document.addEventListener('keyup', e => updateKeys(e.key));
                window.clearInterval(loadingInterval);
            }
        }, 100);

        for (let i=0; i<this.levelsMap.length; i++) {
            this.levels[i] = {
                tiles: [],
                isCleared: false
            };
        }
    },
    update() {
        const tiles = this.levels[this.currentLevel].tiles;

        updateBoard(tiles, this.player);
        this.clearedGoals = tiles.flat().filter(tile => tile.type === Tile.CLEARED).length;
        if (this.clearedGoals === this.totalGoals && !this.levels[this.currentLevel].isCleared) {
            this.levels[this.currentLevel].isCleared = true;
            display.winLevel(this.currentLevel);
        }

        this.player.x = this.player.newX;
        this.player.y = this.player.newY;
    }
}

sokoban.init(levels);
