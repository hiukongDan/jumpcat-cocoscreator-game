const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(other, self){
        if(other.node.group == "player"){
<<<<<<< HEAD
            cc.find("Canvas/sound").emit("playDeadSound");
                cc.find("Canvas/game").emit("dead");
=======
            cc.find("Canvas/game").emit("dead");
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        }
    }
}
