import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {
        // Units
        this.load.image('Tank', 'assets/tank.png');
        

        // Tilemap Assets
        this.load.image("tiles1_png", "assets/tilemap/tiles1.png");
        this.load.tilemapTiledJSON("tiles1_json", "assets/tilemap/tiles1.json")

        this.load.on('complete', function () {
            this.ready();
        }.bind(this));
    }

    ready () {
        console.log("Ready");
        this.scene.start('GameScene');
    }
}