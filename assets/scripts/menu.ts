const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    pause(){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playClickSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        if (!cc.director.isPaused())
            cc.director.pause();
    }

    resume(){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playClickSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        if(cc.director.isPaused())
            cc.director.resume();
    }

    home(){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playClickSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        cc.find("Canvas/game").emit("home");
    }

    restart(){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playClickSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        cc.find("Canvas/game").emit("restart");
    }

}
