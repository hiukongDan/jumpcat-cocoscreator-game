const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    touch:cc.Touch = null;  // restore touch info for later usage
    power:Number = 0.0;     // restore power produced by player
    arrow:cc.Node = null;
    direction:cc.Vec2 = null;
    
    @property([cc.Color])
    public colorPoints: cc.Color[] = [];

    @property([cc.Float])
    public powerPoints:Number[] = [];

    @property(cc.Prefab)
    pfb_arrow:cc.Prefab = null;

    @property(cc.Node)
    player:cc.Node = null;

    

    onLoad () {
    }

    start () {

    }

    onEnable(){
        this.touchSwitchOn();
    }

    onDisable(){
        this.touchSwitchOff();
    }

    touchSwitchOn(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    touchSwitchOff(){
        this.node.off(cc.Node.EventType.TOUCH_START);
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL);
    }

    onTouchStart(event:cc.Event.EventTouch){
        this.touch = event.touch;

        this.arrow = cc.instantiate(this.pfb_arrow);
        this.arrow.parent = this.node;
        this.arrow.position = this.node.convertToNodeSpaceAR(this.touch.getLocation());

    }

    onTouchMove(event){
        let currentPos = this.touch.getLocation();
        let startPos = this.touch.getStartLocation();
        this.power = Math.floor(Math.sqrt((startPos.x-currentPos.x)*(startPos.x-currentPos.x)+
            (startPos.y-currentPos.y) * (startPos.y-currentPos.y)));
        if(this.power > this.powerPoints[this.powerPoints.length-1])
            this.power = this.powerPoints[this.powerPoints.length-1];

        
        
        // interpolating colors

        // arrow color
        let color:cc.Color;
        for(let i = 1; i < this.powerPoints.length; i++){
            if(this.power < this.powerPoints[i]){
                 let a = this.colorPoints[i-1].getA() + (this.colorPoints[i].getA() - this.colorPoints[i-1].getA()) 
                     * ((this.power - this.powerPoints[i-1])/(this.powerPoints[i] - this.powerPoints[i-1]));
                 let g = this.colorPoints[i-1].getG() + (this.colorPoints[i].getG() - this.colorPoints[i-1].getG()) 
                     * ((this.power - this.powerPoints[i-1])/(this.powerPoints[i] - this.powerPoints[i-1]));
                 let b = this.colorPoints[i-1].getB() + (this.colorPoints[i].getB() - this.colorPoints[i-1].getB()) 
                     * ((this.power - this.powerPoints[i-1])/(this.powerPoints[i] - this.powerPoints[i-1]));
                color = new cc.Color(a,g,b);
                break;
            }
            color = this.colorPoints[i];
        }
        
        let head = this.arrow.getChildByName("head");
        let body = this.arrow.getChildByName("body");

        head.color = color;
        body.color = color;

        // change arrow direction
        this.direction = cc.v2(startPos.x-currentPos.x, startPos.y-currentPos.y);
        this.direction.normalizeSelf();

        let rotation = -(Math.atan2(this.direction.y, this.direction.x) * 180 / Math.PI) + 90;  // arrow initially points to right

        this.arrow.rotation = rotation;

        // change arrow length
        this.arrow.getChildByName("body").scaleY = 1 + (this.power / this.powerPoints[this.powerPoints.length-1] * 1.5);
        
        this.player.emit('ready', this.direction);
    }

    onTouchEnd(event){
        if(this.arrow)
            this.arrow.destroy();

        // inform player to jump
        this.player.emit('jump',this.direction, this.power);
    }

    onTouchCancel(event){
        if(this.arrow)
            this.arrow.destroy();
        this.player.emit('idle');
    }
}
