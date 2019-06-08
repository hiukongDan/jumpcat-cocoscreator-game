const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    anim:cc.Animation = null;
    onLoad(){
        this.anim = this.node.getComponent(cc.Animation);
    }

    start(){
        this.node.on("startGame", this.startGame, this);
    }

    onDestroy(){
        this.node.off("startGame");
    }

    startGame(){
        this.anim.play("mainMenuExit");
    }

    enter(){
        this.node.getChildByName("startBrick").getComponent(cc.PhysicsBoxCollider).enabled = true;
        this.node.getChildByName("startBrick").getComponent(cc.BoxCollider).enabled = true;
    }

    exit(){
        this.node.getChildByName("startBrick").getComponent(cc.PhysicsBoxCollider).enabled = false;
        this.node.getChildByName("startBrick").getComponent(cc.BoxCollider).enabled = false;
    }

}
