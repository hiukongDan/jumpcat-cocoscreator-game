const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionExit(other, self){
        if(other.node.position.y > 0)
            this.node.parent.emit("moveLayer");
    }

    onCollisionEnter(other, self){
        // clear jump count
        other.node.getComponent("playerControl").jumpCount = 0;
        // enable user input
        cc.find("Canvas/controlLayer").active = true;
    }
}
