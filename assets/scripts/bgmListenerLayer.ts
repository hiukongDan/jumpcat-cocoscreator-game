const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    }

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START);
    }

    onTouch(){
        this.node.parent.emit("playBGM");
        this.node.destroy();
    }
}
