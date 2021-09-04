class Base {
    constructor(x,y,w,h) {
        var base_options = {
            isStatic:true,
            restitution:0
        }
        this.w = w
        this.h = h
        this.body = Bodies.rectangle(x,y,w,h,base_options)
        World.add(world,this.body)

    }

    display() {
        fill("gray")
        var pos = this.body.position
        rect(pos.x,pos.y,this.w,this.h)
    }

    
}