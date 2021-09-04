class Helicopter {
    constructor(x,y,w,h) {
        var heli_options = {
            density:1,
            restitution:0,
            isStatic: true
        }
        this.w = w
        this.h = h
        this.body = Bodies.rectangle(x,y,w,h,heli_options)
        World.add(world,this.body)
    }

    display() {
        var pos = this.body.position
        image(helicopterImg,pos.x,pos.y,this.w,this.h)
    }
}