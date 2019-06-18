const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pfb_brick:cc.Prefab = null;

    @property(cc.Prefab)
    pfb_poison:cc.Prefab = null;

    @property(cc.Prefab)
    pfb_breakable:cc.Prefab = null;

    @property(cc.Prefab)
    pfb_life:cc.Prefab = null;

    @property(cc.Prefab)
    pfb_coin:cc.Prefab = null;

    // distance between bricks
    @property
    distanceInterval:number = 0.0;

    @property
    startPointLeft:cc.Vec2 = cc.v2(0);

    @property
    startPointRight:cc.Vec2 = cc.v2(0);

    @property
    brickOffset:number = 0.0;

    @property
    brickSpawnRate:number = 4.0;

    @property
    poisonSpawnRate:number = 1.0;

    @property
    breakableSpawnRate:number = 1.0;

    @property
    brickMoveDuration:number = 10;

    @property
    coinSpawnRate:number = 0.2;

    @property
    lifeSpawnRate:number = 0.1;

    // about brick spawning
    totalRate:number = 0;


    bricks:cc.Node[] = [];

    // spawning position
    isLeft:boolean = false;

    onLoad(){
        this.totalRate = this.brickSpawnRate + this.breakableSpawnRate + this.poisonSpawnRate;
        this.isLeft = false;

        this.node.on("moveLayer", this.moveLayer, this);
    }

    start(){
        this.initialize();
        console.log(`bricks size: ${this.bricks.length}`)
    }


    onDestroy(){

    }

    // brick offsets controling brick spawning position
    getBrickOffset(){
        return Math.random() * (this.brickOffset*2) - this.brickOffset;
    }

    getBrick(){
        let type = Math.random() * this.totalRate;
        console.log(`${type}`);
        let node:cc.Node = null;

        if(type < this.poisonSpawnRate){
            node = cc.instantiate(this.pfb_poison);
        }
        else if(type < this.breakableSpawnRate + this.poisonSpawnRate){
            node = cc.instantiate(this.pfb_breakable)
        }
        else{
            node = cc.instantiate(this.pfb_brick);
        }
        return node;
    }

    genNewBrick(){
        let brick = this.getBrick();
        if(this.isLeft){
            brick.position = this.startPointLeft;
        }
        else{
            brick.position = this.startPointRight;
        }
        this.isLeft = !this.isLeft;
        brick.parent = this.node;
        this.bricks.push(brick);
    }

    genLife(){
        if(this.bricks.length <= 0)
            return;

        let lastBrick = this.bricks[this.bricks.length-1];
        let life = cc.instantiate(this.pfb_life);
        life.parent = lastBrick;
        life.position = cc.v2(0, 70);
    }

    genCoin(){
        if(this.bricks.length <= 0)
            return;

        let lastBrick = this.bricks[this.bricks.length-1];
        let coin = cc.instantiate(this.pfb_coin);
        coin.parent = lastBrick;
        coin.position = cc.v2(0,70);
    }

    genBonus(){
        let random = Math.random();
        if(random < this.coinSpawnRate)
            this.genCoin();
        else if(random < this.coinSpawnRate+this.lifeSpawnRate)
            this.genLife();
    }
    

    initialize(){
        this.isLeft = false;
        if(this.bricks[0] != null){
            this.bricks.forEach(function(brick){
                brick.parent = null;
                brick.destroy();
            })
            delete this.bricks;
            this.bricks = [];
        }

        // first brick
        let position = cc.v2(this.startPointRight.x+this.getBrickOffset(), this.startPointRight.y - 2*this.distanceInterval);
        let randomBrick = this.getBrick();
        randomBrick.parent = this.node;
        randomBrick.position = position;
        this.bricks.push(randomBrick);

        // second brick
        randomBrick = this.getBrick();
        randomBrick.position = cc.v2(this.startPointLeft.x+this.getBrickOffset(), this.startPointLeft.y-this.distanceInterval);
        randomBrick.parent = this.node;
        this.bricks.push(randomBrick);
    }

    moveBricks(){
        for (let brick of this.bricks){
            brick.runAction(cc.moveBy(this.brickMoveDuration, cc.v2(0, -this.distanceInterval)).easing(cc.easeCubicActionOut()));
        }
    }

    deleteOldBrick(){
        if(this.bricks.length > 0 && this.bricks[0].position.y < -800){
            this.bricks[0].destroy();
            this.bricks.shift();
        }
    }


    moveLayer(){
        this.genNewBrick();
        this.deleteOldBrick();
        this.genBonus();
        this.moveBricks();
    }
}
