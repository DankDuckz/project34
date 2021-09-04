class Part {
    constructor(x,y,w,h) {
        var part_options = {
            restituion:0
        }
        this.w = w
        this.h = h
        this.body = Bodies.rectangle(x,y,w,h,part_options)
        World.add(world,this.body)

    }

    display() {
        fill("brown")
        var pos = this.body.position
        rect(pos.x,pos.y,this.w,this.h)
    }

    
}