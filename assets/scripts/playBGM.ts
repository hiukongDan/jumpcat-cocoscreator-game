const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.AudioClip)
    bgm:cc.AudioClip = null;
    onLoad(){
        this.node.on("playBGM", this.playBGM, this);
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

}
