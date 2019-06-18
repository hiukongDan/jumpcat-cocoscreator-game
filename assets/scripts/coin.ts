const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(other, self){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playCoinSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        cc.find("Canvas/game").emit("increaseCoin");
        this.node.destroy();
    }
}
