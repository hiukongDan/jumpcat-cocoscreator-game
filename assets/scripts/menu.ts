const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    pause(){
        cc.find("Canvas/sound").emit("playClickSound");
        if (!cc.director.isPaused())
            cc.director.pause();
    }

    resume(){
        cc.find("Canvas/sound").emit("playClickSound");
        if(cc.director.isPaused())
            cc.director.resume();
    }

    home(){
        cc.find("Canvas/sound").emit("playClickSound");
        cc.find("Canvas/game").emit("home");
    }

    restart(){
        cc.find("Canvas/sound").emit("playClickSound");
        cc.find("Canvas/game").emit("restart");
    }

}
