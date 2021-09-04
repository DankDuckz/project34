class Missile {
    constructor(x,y,w,h) {
        var missile_options = {
            force:{x:width/5000,y:0}
        }
        this.w = w
        this.h = h
        this.body = Bodies.rectangle(x,y,w,h,missile_options)
        World.add(world,this.body)
    }

    display() {
        var pos = this.body.position
        image(missileImg,pos.x,pos.y,this.w,this.h)
    }

    life(index) {
        setTimeout(() => {
            World.remove(world,this.body)
            missiles.splice(index,1)
          },2000)
    }
}