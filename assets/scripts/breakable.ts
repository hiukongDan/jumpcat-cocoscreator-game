const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    stageNumbers:number = 0;

    @property([cc.SpriteFrame])
    public stages:cc.SpriteFrame[] = [];

    currentStage:number = 0;
    sprite:cc.Sprite = null;

    start(){
        this.currentStage = 0;
        this.sprite = this.node.getComponent(cc.Sprite);
    }

    onCollisionEnter(other, self){
        this.currentStage = this.currentStage+1;
        if(this.currentStage >= this.stageNumbers){
            other.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
            this.node.destroy();
        }
        else{
            this.sprite.spriteFrame = this.stages[this.currentStage];
        }
    }   
}
