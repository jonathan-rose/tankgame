import 'phaser';
import config from './config/config';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';

class Game extends Phaser.Game {
    constructor () {
        super(config);
        this.scene.add('Preloader', PreloaderScene);
        this.scene.add('Game', GameScene);

        this.scene.start('Preloader');
    }
}

window.game = new Game();