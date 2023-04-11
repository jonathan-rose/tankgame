import 'phaser';
import Tank from '../objects/Tank';

export default class GameScene extends Phaser.Scene {
    constructor ()
    {
        super('GameScene');
    }
     
    create ()
    {
        // Tilemap grid setup
        // Use JSON from PreloaderScene
        const tileMap = this.make.tilemap({
            key: "tiles1_json", 
            tileWidth: 32, 
            tileHeight: 32,
            width: 32,
            height: 32
        });
        
        const tileset = tileMap.addTilesetImage("tiles1", "tiles1_png");

        // Tilemap layer setup
        // First parameter of createLayer()
        // should be name of layer in Tiled
        const groundLayer = tileMap.createLayer("base", tileset, 0, 0);

        // Units
        this.tank = new Tank(this, 100, 100);
    }

    update () {
        let input = this.input;

        input.on('pointerdown', function () {
            this.tank.move(input.x, input.y);
        }, this)

    }
};