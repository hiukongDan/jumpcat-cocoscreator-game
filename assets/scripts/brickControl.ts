const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pfb_brick:cc.Prefab = null;

    bricks:cc.Node[] = [];

    start () {
        
    }


}
