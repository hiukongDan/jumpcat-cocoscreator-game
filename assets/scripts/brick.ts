const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionExit(other, self){
        if(other.node.position.y > 0)
            this.node.parent.emit("moveLayer");
    }

    onCollisionEnter(other, self){
<<<<<<< HEAD
        cc.find("Canvas/sound").emit("playLandSound");
=======
>>>>>>> 60708b2c2c5a2fd3c8260a91217b007d8c0e1f50
        // clear jump count
        other.node.getComponent("playerControl").jumpCount = 0;
        // enable user input
        cc.find("Canvas/controlLayer").active = true;
    }
}
