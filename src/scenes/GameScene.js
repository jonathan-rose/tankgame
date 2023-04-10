import 'phaser';
import Tank from '../objects/Tank';

export default class MyGame extends Phaser.Scene {
    constructor ()
    {
        super('GameScene');
    }
     
    create ()
    {
        this.tank = new Tank(this, 100, 100);
    }

    update () {
        let input = this.input;

        input.on('pointerdown', function () {
            this.tank.move(input.x, input.y);
        }, this)

    }
};