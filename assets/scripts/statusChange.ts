const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    livesLabel:cc.Node = null;

    @property(cc.Node)
    coinsLabel:cc.Node = null;

    lives:number = 3;
    coins: number = 0;


    onLoad () {
        this.lives = 3;
        this.coins = 0;
    }

    start () {

    }

    increaseLife(){
        this.lives = this.lives + 1;
        this.livesLabel.getComponent(cc.Label).string = "" + this.lives;
    }

    decreaseLife(){
        this.lives = this.lives - 1;
<<<<<<< HEAD
        if(this.lives==0)
        cc.find("Canvas/sound").emit("playDead2Sound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        if(this.lives < 0)
            this.lives = 0;
        this.livesLabel.getComponent(cc.Label).string = "" + this.lives;
    }

    increaseCoin(){
        this.coins = this.coins + 1;
        this.coinsLabel.getComponent(cc.Label).string = "" + this.coins;
    }

    decreaseCoin(){
        this.coins = this.coins - 1;
        this.coinsLabel.getComponent(cc.Label).string = "" + this.coins;
    }

    init(){
        this.coinsLabel.getComponent(cc.Label).string = "0";
        this.coins = 0;
        this.livesLabel.getComponent(cc.Label).string = "3";
        this.lives = 3;
    }

    update(){
        if(this.lives == 0){
            cc.find("Canvas/game").emit("dead");
        }
    }

}
