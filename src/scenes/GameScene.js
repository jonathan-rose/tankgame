import 'phaser';
import Tank from '../objects/Tank';
import EasyStar from 'easystarjs';

var finder;
var tileMap;
var tiles;

export default class GameScene extends Phaser.Scene {
    constructor ()
    {
        super('GameScene');
    }
     
    create ()
    {
        // Tilemap grid setup
        // Use JSON from PreloaderScene
        tileMap = this.make.tilemap({
            key: "tiles1_json", 
            tileWidth: 32, 
            tileHeight: 32,
            width: 32,
            height: 32
        });

        // Load tilemap image file
        tiles = tileMap.addTilesetImage("tiles1", "tiles1_png");
        
        // Tilemap layer setup
        // First parameter of createLayer()
        // should be name of layer in Tiled
        const groundLayer = tileMap.createLayer("base", tiles, 0, 0);

        // EasyStar.js pathfinding
        finder = new EasyStar.js();
        
        const grid = this.tileMapToArray(tileMap);
        finder.setGrid(grid);

        const acceptableTiles = this.findAcceptableTiles(tileMap);
        finder.setAcceptableTiles(acceptableTiles);

        // Units
        this.tank = new Tank(this, 100, 400);

        // Pathfinding via Easystar
        this.input.on('pointerup', this.handleClick);

        // Generate a Phaser curve and move to it
        //
        // this.input.on('pointerup', function () {
        //     this.tank.move(this.input.x, this.input.y);
        // }, this);
    }

    update () {

    }

    getTileID (x, y) {
        let tile = tileMap.getTileAt(x, y);
        return tile.index;
    }

    handleClick (pointer) {
        let camera = this.cameras.main;
        let tank = this.scene.tank;

        var x = camera.scrollX + pointer.x;
        var y = camera.scrollY + pointer.y;
        var toX = Math.floor(x/32);
        var toY = Math.floor(y/32);
        var fromX = Math.floor(tank.x/32);
        var fromY = Math.floor(tank.y/32);
        
        finder.findPath(fromX, fromY, toX, toY, function (path) {
            console.log(path);
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                this.moveTank(path);
            }
        }.bind(this.scene));
        
        finder.calculate();
    };

    moveTank (path) {
        var tweens = [];
        for(var i = 0; i < path.length-1; i++) {
            var ex = path[i+1].x;
            var ey = path[i+1].y;
            tweens.push({
                targets: this.tank,
                x: {value: ex*tileMap.tileWidth, duration: 200},
                y: {value: ey*tileMap.tileHeight, duration: 200}
            });
        }

        this.scene.scene.tweens.timeline({
            tweens: tweens
        });
    }

    tileMapToArray (tileMap) {
        const grid = [];
            for(let y =0; y < tileMap.height; y++) {
                let col = [];
                for(let x = 0; x <tileMap.width; x ++){
                    col.push(this.getTileID(x, y));
                }
                grid.push(col);
            }

            return grid;
    }

    findAcceptableTiles (tileMap) {
        const tileset = tileMap.tilesets[0];
        const properties = tileset.tileProperties;
        const acceptableTiles = [];

        for(let i = tileset.firstgid-1; i < tiles.total; i++) {
            if(!properties.hasOwnProperty(i)) {
                acceptableTiles.push(i+1);
                continue;
            }
            if(!properties[i].collide) acceptableTiles.push(i+1);
            if(properties[i].cost) finder.setTileCost(i+1, properties[i].cost);
        }

        return acceptableTiles;
    }
};