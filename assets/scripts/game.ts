const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Node)
    controlLayer:cc.Node = null;

    @property(cc.Node)
    brickLayer:cc.Node = null;

    @property(cc.Node)
    status:cc.Node = null;

    @property(cc.Prefab)
    pfb_resultPabel:cc.Prefab = null;

    @property(cc.Node)
    main:cc.Node = null;

    isDead:boolean = false;

    resultPanel:cc.Node = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.node.on("increaseLife", this.increaseLife, this);
        this.node.on("decreaseLife", this.decreaseLife, this);
        this.node.on("increaseCoin", this.increaseCoin, this);
        this.node.on("dead", this.onDead, this);
        this.node.on("restart", this.restart, this);
        this.node.on("home", this.home, this);
    }

    onStart(){

    }

    onDead(){
        if(this.isDead)
            return;
        this.isDead = true;
        this.player.active = false;
        this.controlLayer.active = false;
        this.showResult();
    }

    increaseLife(){
        this.status.getComponent(cc.Animation).play("increaseLife");
    }

    decreaseLife(){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playHurtSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        this.status.getComponent(cc.Animation).play("decreaseLife");
    }

    increaseCoin(){
        this.status.getComponent(cc.Animation).play("increaseCoin");
    }

    start () {
        // disable input from user
        this.controlLayer.active = false;
        this.isDead = false;
    }

    restart(){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playLandSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        this.isDead = false;
        this.resultPanel = null;
        this.status.getComponent("statusChange").init();
        this.status.active = true;
        this.brickLayer.getComponent("brickLayer").initialize();
        this.player.getComponent("playerControl").initialize();
        this.main.active = false;
        this.player.active = false;
        this.main.active = true;
        this.main.getComponent(cc.Animation).play("mainMenuStart");
        this.player.active = true;
        this.player.getComponent(cc.Animation).play("restart");
        this.controlLayer.active = false;
    }

    showResult(){
        if(this.resultPanel != null)
            return;

        this.resultPanel = cc.instantiate(this.pfb_resultPabel);
        this.resultPanel.parent = this.node.parent;
        this.resultPanel.position = cc.v2(640, 1126);
        this.resultPanel.getChildByName("background").getChildByName("coinNum").getComponent(cc.Label).string = "" +
            this.status.getComponent("statusChange").coins;
        this.resultPanel.getComponent(cc.Animation).play("resultShow");
    }

    home(){
        this.restart();
    }

}
