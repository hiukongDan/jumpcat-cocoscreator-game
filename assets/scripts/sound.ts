const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip)
    landAudio: cc.AudioClip=null;

    @property(cc.AudioClip)
    hurtAudio: cc.AudioClip=null;

    @property(cc.AudioClip)
    coinAudio: cc.AudioClip=null;

    @property(cc.AudioClip)
    lifeAudio: cc.AudioClip=null;

    @property(cc.AudioClip)
    clickAudio: cc.AudioClip=null;

    @property(cc.AudioClip)
    deadAudio:cc.AudioClip=null;
    
    @property(cc.AudioClip)
    dead2Audio:cc.AudioClip=null;

    onLoad(){
        this.node.on("playLandSound", this.playLandSound, this);
        this.node.on("playHurtSound", this.playHurtSound, this);
        this.node.on("playCoinSound", this.playCoinSound, this);
        this.node.on("playLifeSound", this.playLifeSound, this);
        this.node.on("playClickSound", this. playClickSound, this);
        this.node.on("playDeadSound", this. playDeadSound, this);
        this.node.on("playDead2Sound", this. playDead2Sound, this);
    }
    playLandSound(){
        cc.audioEngine.playEffect(this.landAudio, false);
    }
    playHurtSound(){
        cc.audioEngine.playEffect(this.hurtAudio, false);
    }
    playCoinSound(){
        cc.audioEngine.playEffect(this.coinAudio, false);
    }
    playLifeSound(){
        cc.audioEngine.playEffect(this.lifeAudio, false);
    }
    playClickSound(){
        cc.audioEngine.playEffect(this.clickAudio, false);
    }
    playDeadSound(){
        
        cc.audioEngine.playEffect(this.deadAudio,false);
    }
    playDead2Sound(){
        cc.audioEngine.playEffect(this.deadAudio,false);
    }

    start () {
        this.playLandSound();
    }

    // update (dt) {}
}
