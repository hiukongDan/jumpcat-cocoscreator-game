const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(other, self){
        cc.find("Canvas/sound").emit("playCoinSound");
        cc.find("Canvas/game").emit("increaseCoin");
        this.node.destroy();
    }
}
