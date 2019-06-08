
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionExit(other, self){
        this.node.getParent().emit("startGame");
    }

    onCollisionEnter(other, self){
        cc.find("Canvas/controlLayer").active = true;
    }

}
