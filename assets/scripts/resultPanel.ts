const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad(){
        let tmp = this.node.parent.parent;
        this.node.on(cc.Node.EventType.TOUCH_END, function(){
            cc.find("Canvas/game").emit("restart");
            tmp.destroy();
        }, this);
    }
}
