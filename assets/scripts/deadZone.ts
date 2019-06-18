const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(other, self){
        if(other.node.group == "player"){
            cc.find("Canvas/sound").emit("playDeadSound");
                cc.find("Canvas/game").emit("dead");
        }
    }
}
