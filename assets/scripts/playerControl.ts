const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    anim:cc.Animation = null;
    rigidbody:cc.RigidBody = null;
    sprite:cc.Sprite = null;
    phyBoxCollider:cc.PhysicsBoxCollider = null;

    isGround:boolean = false;

    @property
    jumpVerticalMultiplier:number = 1.0;

    @property
    jumpHorizontalMultiplier:number = 1.0;

    @property
    powerMultiplier:number = 1.0;

    @property
    isLinearSpeed:boolean = true;

    @property(cc.SpriteFrame)
    pose_ready:cc.SpriteFrame = null;
    @property
    pose_ready_width:number = 0.0;
    @property
    pose_ready_height:number = 0.0;

    @property(cc.SpriteFrame)
    pose_jump:cc.SpriteFrame = null;
    @property
    pose_jump_width:number = 0.0;
    @property
    pose_jump_height:number = 0.0;

    @property(cc.SpriteFrame)
    pose_idle:cc.SpriteFrame = null;
    @property
    pose_idle_width:number = 0.0;
    @property
    pose_idle_height:number = 0.0;

    @property
    jumpAvailable:number = 2;
    jumpCount:number;

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.sprite = this.node.getComponent(cc.Sprite);
        this.phyBoxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
        this.jumpCount = 0;
    }  

    onDisable(){
        this.node.off('jump');
        this.node.off('ready');
        this.node.off('idle');
    }

    onEnable(){
        this.node.on('jump', this.jump,this);
        this.node.on('ready', this.ready, this);
        this.node.on('idle', this.idle, this);
    }


    jump(direction:cc.Vec2, power:number){
        this.jumpCount++;
        // stop animation
        this.anim.stop();

        // resize stuff
        this.sprite.spriteFrame = this.pose_jump;
        this.node.setContentSize(this.pose_jump_width, this.pose_jump_height);
        this.node.color = new cc.Color(255,255,255);

        // jump
        let hor = direction.x * power * this.jumpHorizontalMultiplier * this.powerMultiplier;
        let ver = direction.y * power * this.jumpVerticalMultiplier * this.powerMultiplier;
        if(this.isLinearSpeed)
            this.rigidbody.linearVelocity = cc.v2(hor,ver);
        else
            this.rigidbody.applyForceToCenter(cc.v2(hor,ver), true);
        
        this.isGround = false;
    }

    ready(direction){
        // stop idle animation
        this.anim.stop();
        // resize stuff
        this.sprite.spriteFrame = this.pose_ready;
        this.node.setContentSize(this.pose_ready_width, this.pose_ready_height);
        this.node.color = new cc.Color(255,255,255);

        if(direction.x >= 0)
            this.node.scaleX = -1;
        else
            this.node.scaleX = 1;
    }

    idle(){
        this.sprite.spriteFrame = this.pose_idle;
        this.node.setContentSize(this.pose_idle_width, this.pose_idle_height);
        this.node.color = new cc.Color(255,255,255);
        this.anim.play('idle');
    }

    poisoned(){
        this.sprite.spriteFrame = this.pose_idle;
        this.node.setContentSize(this.pose_idle_width, this.pose_idle_height);
        this.anim.play('poisoned');
    }

    onCollisionEnter(other, self){
        this.isGround = true;
        if(other.node.name == 'poison'){
            this.poisoned();
        }
        else
            this.idle();
    }

    onCollisionStay(other, self){
        if(this.isGround == false){
            this.isGround = true;
            if(other.node.name == 'poison'){
                this.poisoned();
            }
            else
                this.idle();
        }
    }

    onCollisionExit(other,self){
        this.anim.stop();
        // resize stuff
        this.sprite.spriteFrame = this.pose_jump;
        this.node.setContentSize(this.pose_jump_width, this.pose_jump_height);
        this.node.color = new cc.Color(255,255,255);
    }

    initialize(){
        this.jumpCount = 0;
        this.isGround = false;
    }

    update(dt){
        if(this.jumpCount >= 2){
            cc.find("Canvas/controlLayer").active = false;
        }
    }

    decreaseLife(){
        cc.find("Canvas/game").emit("decreaseLife");
    }

    setActive(){
        this.node.active = true;
    }
}
