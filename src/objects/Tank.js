import 'phaser';

export default class Tank extends Phaser.GameObjects.PathFollower {
    constructor(scene, x, y) {
        super(scene, new Phaser.Curves.Path(), x, y, "Tank");
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.setOrigin(0,0);

        this.speed = 50;
        this.targetCoords = new Phaser.Math.Vector2(x, y);
        this.path = new Phaser.Curves.Path(0, 0);
        this.pathLength = 0;
        this.pathTime = 0;

        this.setInteractive();
        this.scene.add.existing(this);
    }

    move (x, y) {
        this.setTargetCoords(x, y);
        this.makePath();
        this.startFollow({
            positionOnPath: true,
            rotateToPath: true,
            ease: 'Linear',
            duration: this.pathTime
        });
    }

    setLocation (x, y) {
        this.x = x;
        this.y = y;
    }

    setTargetCoords (x, y) {
        this.targetCoords.set(x, y);
    }

    setPathTime () {
        this.pathLength = this.path.getLength();
        this.pathTime = (this.pathLength / this.speed) * 100;
    }

    makePath () {
        let path = new Phaser.Curves.Line([
            this.x, 
            this.y, 
            this.targetCoords.x, 
            this.targetCoords.y
        ]);
        this.setPath(path);
        this.setPathTime();
    }

    rotate () {
        
    }
}