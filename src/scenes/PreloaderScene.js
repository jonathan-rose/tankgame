import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload () {     
        this.load.image('Tank', 'assets/tank.png');

        this.load.on('complete', function () {
            this.ready();
        }.bind(this));
    }

    ready () {
        console.log("Ready");
        this.scene.start('GameScene');
    }
}