const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    pause(){
        if (!cc.director.isPaused())
            cc.director.pause();
    }

    resume(){
        if(cc.director.isPaused())
            cc.director.resume();
    }

    home(){
        cc.find("Canvas/game").emit("home");
    }

    restart(){
        cc.find("Canvas/game").emit("restart");
    }

}
