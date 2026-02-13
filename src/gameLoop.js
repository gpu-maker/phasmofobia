export class GameLoop{

constructor(update){
this.update=update;
this.last=0;
}

start(){
requestAnimationFrame(this.frame.bind(this));
}

frame(t){
const dt=(t-this.last)/1000;
this.last=t;
this.update(dt);
requestAnimationFrame(this.frame.bind(this));
}
}
