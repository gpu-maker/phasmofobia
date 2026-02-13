export class Player{

constructor(spawn){
this.x=spawn.x;
this.y=spawn.y;
this.dir=0;

this.speed=3;
this.health=100;
this.sanity=100;
this.battery=100;
this.flashlight=true;
}

update(dt,input){

if(input.down("w")){
this.x+=Math.cos(this.dir)*this.speed*dt;
this.y+=Math.sin(this.dir)*this.speed*dt;
}

if(input.down("s")){
this.x-=Math.cos(this.dir)*this.speed*dt;
this.y-=Math.sin(this.dir)*this.speed*dt;
}

if(input.down("a")) this.dir-=2*dt;
if(input.down("d")) this.dir+=2*dt;

if(this.flashlight)
this.battery=Math.max(0,this.battery-dt*2);
}
}
